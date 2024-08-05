var SItemList = [];
var detdata = [];
var Itemrowindex = -1;
var rowindex = -1;
var index = 0;
var GTrfId = 0;
var Userid = 0;
var UserName = 0;
var MainFDate = 0;
var Guserid = 0;
var DCompid = 0;
var LoginUserid = '';
var editmasFunitstore = 0;
var editmasTunitstore = 0;
var FromCompanyId = 0;
var ToCompanyId = 0;
var Mode = 0;
var validatepgmqty = '';
$(document).ready(function () {
    debugger;
    getDate();
    Guserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    LoginUserid = $("#hdnLoginUserid").data('value');
    //LoadCompanyDDL("#ddlMFromCompany,#ddlMToCompany");
    MainFDate = $("#hdMainFromDate").data('value');
    DCompid = $("#hdnDCompid").data('value');
    validatepgmqty = $("#hdnValidateProgramQtyinTransfery").data('value');
    //LoadOrderNoDDL("#ddlMFromOrderNo,#ddlMToOrderNo");
    //LoadRefNoDDL("#ddlMFromRefNo,#ddlMToRefNo");
    ListOrderRefNo();
    ListTransNo();
    
    //LoadProcessDDL("#ddlMProcess");

 
    LoadCompanyDDL("#ddlFromCompany,#ddlTocompany,#ddlMFromCompany,#ddlMToCompany");
    LoadStyleDDL("#ddlFStyle,#ddlTStyle");
    LoadRefNoDDL("#ddlFRefNo,#ddlTRefNo");
    LoadJobNoDDL("#ddlFWorkNo,#ddlTWorkNo");
    LoadOrderNoDDL("#ddlFOrderNo,#ddlTOrderNo");
    LoadProcessDDL("#ddlMProcess,#ddlProcess");
    //LoadStoreUnitDDL("#ddlFromStore,#ddlTostore");
    LoadItemGroupDDL("#ddlItemGroup,#ddlMItemGroup");

    LoadItemDDL("#ddlItem");
    LoadColorDDL("#ddlColor");
    //    LoadItemGroupDDL("#ddlItemGroup");
    var fill = localStorage.getItem('StockTransferMainFilter');
    if (fill != "null" && fill != null) {
        LoadMainGridFromBack();
    } else {
        LoadMainGrid();
    }
    //LoadMainGrid();
    $(document).on('keyup', '.calcQty', function () {
        debugger;

        var table = $('#tblStockTranItem').DataTable();
        var STkId = table.row($(this).parents('tr')).data()["StockId"];
        var IId = table.row($(this).parents('tr')).data()["ItemId"];
        var CId = table.row($(this).parents('tr')).data()["ColorId"];
        var SId = table.row($(this).parents('tr')).data()["SizeId"];
        var PUId = table.row($(this).parents('tr')).data()["UomId"];
        var OrdBalQty = table.row($(this).parents('tr')).data()["StkQty"]; 
        var PrgQtyBalQty = table.row($(this).parents('tr')).data()["PrgQty"];
        var PrgDetId = table.row($(this).parents('tr')).data()["PrgDetId"];

        var Val = $(this).val();

        var TOType = $('input[name="ToOrder"]:checked').attr('value');

        if (TOType != 'G') {
            if (validatepgmqty == 'True') {
                if (Val > PrgQtyBalQty) {
                    Val = 0;
                    var msg = 'Trans Qty Should Not Greater then Program Qty...';
                    var flg = 4;
                    var mod = 1;
                    var url = "";
                    AlartMessage(msg, flg, mod, url);

                }
            }
        }

        var TQty = Val;


        if (TQty > OrdBalQty) {
            //alert("Trans Qty Should Not Greater then Stock Qty..");
            var msg = 'Trans Qty Should Not Greater then Stock Qty...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            $.each(SItemList, function () {
                if (this.StockId == STkId && this.PrgDetId == PrgDetId) {
                    this.TransQty = 0;
                    TQty = 0;
                }
            });
            var otable = $('#tblStockTranItem').DataTable();
            var odata = otable.rows().data();

            $('input[id=txtTQty]').each(function (ig) {
                if (odata[ig].StockId == STkId && odata[ig].ItemId == IId && odata[ig].ColorId == CId && odata[ig].SizeId == SId && odata[ig].PrgDetId == PrgDetId) {
                    var row = $(this).closest('tr');
                    row.find('#txtTQty').focus().val('').val(TQty);
                }
            });
           // loadSktItemTable(SItemList);
            return true;
        } else {


            $.each(SItemList, function () {
                if (this.StockId == STkId && this.ItemId == IId && this.ColorId == CId && this.SizeId == SId && this.UomId == PUId && this.PrgDetId == PrgDetId) {
                    this.TransQty = TQty;
                }
            });

            var otable = $('#tblStockTranItem').DataTable();
            var odata = otable.rows().data();

            $('input[id=txtTQty]').each(function (ig) {
                if (odata[ig].StockId == STkId && odata[ig].ItemId == IId && odata[ig].ColorId == CId && odata[ig].SizeId == SId && odata[ig].PrgDetId == PrgDetId) {
                    var row = $(this).closest('tr');
                    row.find('#txtTQty').focus().val('').val(TQty);
                }
            });
           // loadSktItemTable(SItemList);
        }

        //var rows = $("#tblStockTranItem").dataTable().fnGetNodes();
        //var dtTable = $('#tblStockTranItem').DataTable();
        //for (var i = 0; i < rows.length; i++) {
        //    var sn = dtTable.cells({ row: i, column: 12 }).data()[0];
        //    $('input[id=txtTQty]').each(function () {
        //        if (sn == STkId && $(this).val() == Val) {
        //            var row = $(this).closest('tr');
        //            var num = row.find('#txtTQty').val();
        //            row.find('#txtTQty').focus().val('').val(num);
        //            return true;
        //        }
        //    });
        //}
    });
    $('#tblStockTranItem').on('click', 'tr', function (e) {

        debugger;
        var table = $('#tblStockTranItem').DataTable();
        var row = $(this).closest('tr');
        var data = $('#tblStockTranItem').dataTable().fnGetData(row);

        $('#Supplierdet').val(data.Supplier);
        $('#Processdet').val(data.Process);
        $('#TransNodet').val(data.TransNo);
        $('#MarkupRatedet').val(data.MrpRate);

    });


    $('#tblMainStockTransfer').on('click', 'tr', function (e) {
        debugger;

        var table = $('#tblMainStockTransfer').DataTable();

        var row = $(this).closest('tr');
        var data = $('#tblMainStockTransfer').dataTable().fnGetData(row);
        var ProcessOrdNo = data[2];
        LoadItemMovements(ProcessOrdNo);
    });

});


function CMainlist() {
  //  $('#tblMainStockTransfer').DataTable().destroy();
    LoadMainGrid();
    ListOrderRefNo();
}

function LoadMainGrid() {

    debugger;

    var FDate = $('#txtMFromDate').val();
    var TDate = $('#txtMToDate').val();
    var ProssId = $('#ddlMProcess').val();
    var IgID = $('#ddlMItemGroup').val();
    var TfrID = $('#ddlMTransferNo').val();
    var FOrdNo = "";
    var FONo = $('#ddlMFromOrderNo').val();
    if (FONo == 0) {
        FOrdNo == "";
    }
    else {

        FOrdNo = $("#ddlMFromOrderNo option:selected").text();
    }


    var TOrdNo = "";
    var TONo = $('#ddlMToOrderNo').val();

    if (TONo == 0) {
        TOrdNo == "";
    }
    else {

        TOrdNo = $("#ddlMToOrderNo option:selected").text();
    }

    var FRefNo = "";
    var FRNo = $('#ddlMFromRefNo').val();

    if (FRNo == 0) {
        FRefNo == "";
    }
    else {

        FRefNo = $('select#ddlMFromRefNo option:selected').val();
    }


    var TRefNo = "";
    var TRNo = $('#ddlMToRefNo').val();

    if (TRNo == 0) {
        TRefNo == "";
    }
    else {

        TRefNo = $('select#ddlMToRefNo option:selected').val();
    }

    var menufilter = FDate + ',' + TDate + ',' + TDate + ',' + FOrdNo + ',' + TOrdNo + ',' + FRefNo + ',' + TRefNo + ',' + IgID + ',' + ProssId + ',' + TfrID ;
    localStorage.setItem('StockTransferMainFilter', menufilter);


    $.ajax({
        url: "/StockTransfer/GetMainLoad",
        data: JSON.stringify({ FromDate: FDate, ToDate: TDate, ToDate: TDate, FOrdNo: FOrdNo, TOrdNo: TOrdNo, FromRef: FRefNo, ToRef: TRefNo, ItemGroupId: IgID, Processid: ProssId, TransferId: TfrID }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {

            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");

            var inputcount = 0;
            $('#tblMainStockTransfer tr').each(function () {
                inputcount++;
            });
            if (inputcount > 0) {
                //$('#tblYarndetails').DataTable().destroy();
                var table = $('#tblMainStockTransfer').DataTable();
                var rows = table.clear().draw();
                $('#tblMainStockTransfer').DataTable().rows.add(dataSet);
                $('#tblMainStockTransfer').DataTable().columns.adjust().draw();
            }else {

                $('#tblMainStockTransfer').DataTable({
                    data: dataSet,
                    scrollY: 300,
                    scrollCollapse: true,
                    paging: false,
                    fixedColumns: false,
                    select: false,
                    scrollX: "100%",
                    scrollXInner: "100%",
                    scroller: false,
                    "bSort": false,
                    columns: [
                             { title: "TransferId", "visible": false },
                             { title: "To Company" },
                             { title: "Trans No" },
                             { title: "Trans Date" },
                             { title: "Type" },
                             { title: "ItemGroup" },
                              { title: "Process" },
                             { title: "Action" },

                    ]

                });
            }
            $(document).ready(function () {
                var table = $('#tblMainStockTransfer').DataTable();

                $('#tblMainStockTransfer tbody').on('click', 'tr', function () {
                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');
                    }
                    else {
                        table.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');
                    }
                });


            });
            
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadMainGridFromBack() {
    debugger;
    var fill = localStorage.getItem('StockTransferMainFilter');
    var fillobj = [];
    fillobj = fill.split(",");

    $('#txtMFromDate').val(fillobj[0]);
    $('#txtMToDate').val(fillobj[1]);

    if (fillobj[3] == "undefined") {
        fillobj[3] = '';
    }
    if (fillobj[4] == "undefined") {
        fillobj[4] = '';
    }
    if (fillobj[5] == "undefined") {
        fillobj[5] = '';
    }
    if (fillobj[6] == "undefined") {
        fillobj[6] = '';
    }
    if (fillobj[7] == "undefined") {
        fillobj[7] = 0;
    }
    if (fillobj[8] == "undefined") {
        fillobj[8] = 0;
    }
    if (fillobj[9] == "undefined") {
        fillobj[9] = 0;
    }
    
    $.ajax({
        url: "/StockTransfer/GetMainLoad",
        data: JSON.stringify({ FromDate: fillobj[0], ToDate: fillobj[1], ToDate: fillobj[2], FOrdNo: fillobj[3], TOrdNo: fillobj[4], FromRef: fillobj[5], ToRef: fillobj[6], ItemGroupId: fillobj[7], Processid: fillobj[8], TransferId: fillobj[9] }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {

            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");

            var inputcount = 0;
            $('#tblMainStockTransfer tr').each(function () {
                inputcount++;
            });
            if (inputcount > 0) {
                //$('#tblYarndetails').DataTable().destroy();
                var table = $('#tblMainStockTransfer').DataTable();
                var rows = table.clear().draw();
                $('#tblMainStockTransfer').DataTable().rows.add(dataSet);
                $('#tblMainStockTransfer').DataTable().columns.adjust().draw();
            } else {

                $('#tblMainStockTransfer').DataTable({
                    data: dataSet,
                    scrollY: 300,
                    scrollCollapse: true,
                    paging: false,
                    fixedColumns: false,
                    select: false,
                    scrollX: "100%",
                    scrollXInner: "100%",
                    scroller: false,
                    "bSort": false,
                    columns: [
                             { title: "TransferId", "visible": false },
                             { title: "To Company" },
                             { title: "Trans No" },
                             { title: "Trans Date" },
                             { title: "Type" },
                             { title: "ItemGroup" },
                              { title: "Process" },
                             { title: "Action" },

                    ]

                });
            }
            $(document).ready(function () {
                var table = $('#tblMainStockTransfer').DataTable();

                $('#tblMainStockTransfer tbody').on('click', 'tr', function () {
                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');
                    }
                    else {
                        table.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');
                    }
                });


            });

        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}


//$(document).ready(function () {
//    $("#tblStockTranItem ").dataTable().find("tbody").on('click', 'tr', function () {
//        index = (this.rowIndex) - 1;
//    });
//});
function ListOrderRefNo() {
    var FDate = $('#txtMFromDate').val();
    var TDate = $('#txtMToDate').val();

    $.ajax({
        url: "/StockTransfer/GetOrd",
        data: JSON.stringify({ FromDate: FDate, ToDate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;

                $(ddlMToOrderNo).empty();
                $(ddlMToRefNo).empty();

                $(ddlMToOrderNo).append($('<option/>').val('0').text('--Select OrderNo--'));
                $.each(data, function () {
                    if (this.TOrdNo != "") {
                        $(ddlMToOrderNo).append($('<option></option>').text(this.TOrdNo));
                    }
                });
                //RefNo
                $(ddlMToRefNo).append($('<option/>').val('0').text('--Select RefNo--'));
                $.each(data, function () {
                    if (this.ToRef != "") {
                        $(ddlMToRefNo).append($('<option></option>').text(this.ToRef));
                    }
                });


                //FromOrd,RFmRef

                $(ddlMFromOrderNo).empty();
                $(ddlMFromRefNo).empty();

                $(ddlMFromOrderNo).append($('<option/>').val('0').text('--Select OrderNo--'));
                $.each(data, function () {
                    if (this.FOrdNo != "") {
                        $(ddlMFromOrderNo).append($('<option></option>').text(this.FOrdNo));
                    }
                });
                //RefNo
                $(ddlMFromRefNo).append($('<option/>').val('0').text('--Select RefNo--'));
                $.each(data, function () {
                    if (this.FromRef != "") {
                        $(ddlMFromRefNo).append($('<option></option>').text(this.FromRef));
                    }
                });


            }
        }

    });
}
function ListTransNo() {
    var FDate = $('#txtMFromDate').val();
    var TDate = $('#txtMToDate').val();
    var ProssId = $('#ddlMProcess').val();
    var IgID = $('#ddlMItemGroup').val();
    var FOrdNo = "";
    var FONo = $("#ddlMFromOrderNo option:selected").text();

    if (FONo == 0) {
        FOrdNo == "";
    }
    else {

        FOrdNo = $("#ddlMFromOrderNo option:selected").text();
    }


    var TOrdNo = "";
    var TONo = $("#ddlMToOrderNo option:selected").text();

    if (TONo == 0) {
        TOrdNo == "";
    }
    else {

        TOrdNo = $("#ddlMToOrderNo option:selected").text();
    }

    var FRefNo = "";
    var FRNo = $('select#ddlMFromRefNo option:selected').val();

    if (FRNo == 0) {
        FRefNo == "";
    }
    else {

        FRefNo = $('select#ddlMFromRefNo option:selected').val();
    }


    var TRefNo = "";
    var TRNo = $('select#ddlMToRefNo option:selected').val();

    if (TRNo == 0) {
        TRefNo == "";
    }
    else {

        TRefNo = $('select#ddlMToRefNo option:selected').val();
    }

    $.ajax({
        url: "/StockTransfer/GetTransNo",
        data: JSON.stringify({ FromDate: FDate, ToDate: TDate, ToDate: TDate, FOrdNo: FOrdNo, TOrdNo: TOrdNo, FromRef: FRefNo, ToRef: TRefNo, ItemGroupId: IgID, Processid: ProssId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;

                //$(ddlMType).empty();
                $(ddlMTransferNo).empty();

                $(ddlMTransferNo).append($('<option/>').val('0').text('--Select TransNo--'));
                $.each(data, function () {
                    $(ddlMTransferNo).append($('<option></option>').val(this.TransferId).text(this.TransNo));
                });
                ////RefNo
                //$(ddlMType).append($('<option/>').val('0').text('--Select TransType--'));
                //$.each(data, function () {
                //    $(ddlMType).append($('<option></option>').text(this.ToRef));
                //});




            }
        }

    });
}
function getDate() {

    var todaydate = new Date();
    var day = todaydate.getDate();
    var Pmonth = todaydate.getMonth() - 2;
    var Cmonth = todaydate.getMonth() + 1;
    var year = todaydate.getFullYear();
    var datestring = Pmonth + "/" + day + "/" + year;
    var Fdatestring = day + "/" + Cmonth + "/" + year;

    var day = new Date(),
        year = ((day.getMonth() - 2) < 0) ? (day.getFullYear() - 1) : day.getFullYear(),
        month = ((day.getMonth() - 2) < 0) ? (12 + (day.getMonth() - 2)) : (day.getMonth() + 1),
        date = month + '/' + day.getDate() + '/' + year;
    $('#txtMFromDate').val(MainFDate);
    $('#txtMToDate').val(Fdatestring);
    $('#txtEntryDate').val(Fdatestring);

}

function ClearTextbox() {
    Mode = 0;
    getDate();
    GenerateNumber();
    FromCompanyId = $('#ddlFromCompany').val();
    ToCompanyId = $('#ddlTocompany').val();
    LoadEmployeeFromStoreunit();
    LoadEmployeeToStoreunit();
    ClearData();
    $("#FromId").find('input,textarea,button,select').attr('disabled', false);
    $("#ToId").find('input,textarea,button,select').attr('disabled', false);
    $('#Update').hide();
    $('#Delete').hide();
    $('#Add').show();
//    LoadOrderNoDDL("#ddlFOrderNo,#ddlTOrderNo");
//    LoadStyleDDL("#ddlFStyle,#ddlTStyle");
//    LoadJobNoDDL("#ddlFWorkNo,#ddlTWorkNo");
//    LoadRefNoDDL("#ddlFRefNo,#ddlTRefNo");
//    LoadColorDDL("#ddlColor");
//    LoadItemGroupDDL("#ddlItemGroup");
//    LoadItemDDL("#ddlItem");
//   // LoadProcessDDL("#ddlProcess");
//    LoadStoreUnitDDL("#ddlFromStore,#ddlTostore");
//    //LoadCompanyDDL("#ddlFromCompany,#ddlTocompany");
}

function Close() {
    $('#myModal').modal('hide');
    ClearData();
}

function ClearData() {
    $('#ddlFOrderNo').val('0');
    $('#ddlTOrderNo').val('0');
    $('#ddlFStyle').val('0');
    $('#ddlTStyle').val('0');
    $('#ddlFWorkNo').val('0');
    $('#ddlTWorkNo').val('0');
    $('#ddlFRefNo').val('0');
    $('#ddlTRefNo').val('0');
    $('#ddlItemGroup').val('0');
    $('#ddlProcess').val('0');
    $('#ddlFromStore').val('0');
    $('#ddlTostore').val('0');
    var tablesize = $('#tblStockTranItem').DataTable();
    tablesize.clear().draw();
}


function chkcmpnyid() {
    GenerateNumber();

    FromCompanyId = $('#ddlFromCompany').val();
    ToCompanyId = $('#ddlTocompany').val();
    if (Mode != 0) {
        LoadEmployeeFromStoreunit();
        LoadEmployeeToStoreunit();
    }
}

var table, column, compId, Docum;

function GenerateNumber(table, column, compId, Docum) {
    debugger;
    if (Mode == 0) {
        table = "stocktranmasnew",
        column = "TransNo",
        //compId = $('#ddlFromCompany').val(),
        Docum = 'STOCK TRANSFER',

        compId = $('#ddlFromCompany').val();

        if (compId == null) {
            compId = DCompid;
        } else {
            compId = $('#ddlFromCompany').val();
        }
        FromCompanyId = compId;


        $.ajax({
            url: "/BulkOrder/GenerateNo",
            data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                debugger;
                $('#txtEntryNo').val(result.Value);
            }
        });
    }
}

function LoadItemDetails() {
    debugger;
    $('#tblStockTranItem').DataTable().destroy();
    var FOrdNo = $('#ddlFOrderNo').val();
    var TOrdNo = $('#ddlTOrderNo').val();
    var FJOrdNo = $('#ddlFWorkNo').val();
    var TJOrdNo = $('#ddlTWorkNo').val();
    var IGrId = $('#ddlItemGroup').val();
    var FStyId = $('#ddlFStyle').val();
    var TStyId = $('#ddlTStyle').val();
    var FStore = $('#ddlFromStore').val();
    var TStore = $('#ddlTostore').val();

    var FOType = $('input[name="FOrder"]:checked').attr('value');
    var TOType = $('input[name="ToOrder"]:checked').attr('value');

    if (FOType != "G") {
        if (FOrdNo == 0) {
            //alert("Please Select From Order No...")
            var msg = 'Please Select From Order Number...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return true;
        }

        if (FJOrdNo == 0) {
            //alert("Please Select From Job No...")
            var msg = 'Please Select From Job Number...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return true;
        }

        //if (IGrId == 0) {
        //    alert("Please Select ItemGroup...")
        //    return true;
        //}
        if (FStyId == 0) {
            //alert("Please Select From Style...")
            var msg = 'Please Select From Style...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return true;
        }
    }

    if (TOType != "G") {
        if (TOrdNo == 0) {
            //alert("Please Select To Order No...")
            var msg = 'Please Select To Order Number...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return true;
        }

        if (TJOrdNo == 0) {
            //alert("Please Select From Job No...")
            var msg = 'Please Select From Job Number...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return true;
        }

        if (TStyId == 0) {
            //alert("Please Select To Style...")
            var msg = 'Please Select To Style...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return true;
        }
    }

    if (TOType == "R") {
        var reqid = $('#ddlReqno option:selected').val();

        if (reqid > 0) {
        } else {
            var msg = 'Please Select Requisition Number..';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return true;
        }

    }


    if ((FStore == TStore) && (TOType == "G" && FOType == "G")) {
        //alert("Store should be different...")
        var msg = 'Store should be different...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    LoadStockTransferItemDetails();


}
//function LoadItemDetails() {
//    $('#tblStockTranItem').DataTable().destroy();
//    var FOrdNo = $('#ddlFOrderNo').val();
//    var TOrdNo = $('#ddlTOrderNo').val();
//    var FJOrdNo = $('#ddlFWorkNo').val();
//    var TJOrdNo = $('#ddlTWorkNo').val();
//    var IGrId = $('#ddlItemGroup').val();
//    var FStyId = $('#ddlFStyle').val();
//    var TStyId = $('#ddlTStyle').val();
//    if (FOrdNo == 0) {
//        alert("Please Select From Order No...")
//        return true;
//    }
//    if (TOrdNo == 0) {
//        alert("Please Select To Order No...")
//        return true;
//    }
//    if (FJOrdNo == 0) {
//        alert("Please Select From Job No...")
//        return true;
//    }
//    if (TJOrdNo == 0) {
//        alert("Please Select From Job No...")
//        return true;
//    }
//    if (IGrId == 0) {
//        alert("Please Select ItemGroup...")
//        return true;
//    }
//    if (FStyId == 0) {
//        alert("Please Select From Style...")
//        return true;
//    }
//    if (TStyId == 0) {
//        alert("Please Select To Style...")
//        return true;
//    }
//    LoadStockTransferItemDetails();
//}

function LoadStockTransferItemDetails() {
    debugger;

    var FCompId = $('#ddlFromCompany').val();
    var TCompId = $('#ddlTocompany').val();
    var ProcId = $('#ddlProcess').val();
    var ImId = $('#ddlItem').val();
    var ClId = $('#ddlColor').val();
    var MilId = $('#ddlMillName').val();
    var FStyId = $('#ddlFStyle').val();
    var TStyId = $('#ddlTStyle').val();
    var IgId = $('#ddlItemGroup').val();
    var FStoreId = $('#ddlFromStore').val();
    var TStoreId = $('#ddlTostore').val();
    var FOType = $('input[name="FOrder"]:checked').attr('value');
    var FSType = $('input[name="FOrderSub"]:checked').attr('value');
    var TOType = $('input[name="ToOrder"]:checked').attr('value');
    var TSType = $('input[name="ToOrderSub"]:checked').attr('value');

    var Reqno = "";
    var rq = $("#ddlReqno option:selected").text();

    if (rq == "" || rq == "--Select Req No--") {
        Reqno == "";
    }
    else {

        Reqno = $("#ddlReqno option:selected").text();
    }

    var FOrdNo = "";
    var FONo = $("#ddlFOrderNo option:selected").text();

    if (FONo == "") {
        FOrdNo == "";
    }
    else {

        FOrdNo = $("#ddlFOrderNo option:selected").text();
    }


    var TOrdNo = "";
    var TONo = $("#ddlTOrderNo option:selected").text();

    if (TONo == "") {
        TOrdNo == "";
    }
    else {

        TOrdNo = $("#ddlTOrderNo option:selected").text();
    }

    var FRefNo = "";
    var FRNo = $('select#ddlFRefNo option:selected').val();

    if (FRNo == 0) {
        FRefNo == "";
    }
    else {

        FRefNo = $('select#ddlFRefNo option:selected').val();
    }


    var TRefNo = "";
    var TRNo = $('select#ddlTRefNo option:selected').val();

    if (TRNo == 0) {
        TRefNo == "";
    }
    else {

        TRefNo = $('select#ddlTRefNo option:selected').val();
    }

    var FJobNo = "";
    var FJbNo = $("#ddlFWorkNo option:selected").text();

    if (FJbNo == "") {
        FJobNo == "";
    }
    else {

        FJobNo = $("#ddlFWorkNo option:selected").text();
    }
    var TJobNo = "";
    var TJbNo = $("#ddlTWorkNo option:selected").text();

    if (TJbNo == "") {
        TJobNo == "";
    }
    else {

        TJobNo = $("#ddlTWorkNo option:selected").text();
    }
    var openprg = $('#chkopenprg').is(":checked");
    var seqno = 1;
    if (openprg) {
         seqno = $("#ddlProgramSeq option:selected").val();
    }

    $.ajax({
        url: "/StockTransfer/LoadStockTrnItemDetails",
        data: JSON.stringify({ FromCompId: FCompId, ToCompId: TCompId, FTransType: FOType, FSTransType: FSType, TTransType: TOType, TSTransType: TSType, ItemId: ImId, ColorId: ClId, ItemGroupId: IgId, FromStoreUnitID: FStoreId, ToStoreUnitID: TStoreId, MillId: MilId, FromStyleid: FStyId, ToStyleid: TStyId, FromRef: FRefNo, ToRef: TRefNo, FOrdNo: FOrdNo, TOrdNo: TOrdNo, FJOrdNo: FJobNo, TJOrdNo: TJobNo, Processid: ProcId, ProcessSeq: seqno, Reqno: Reqno }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            SItemList = result;
            loadSktItemTable(SItemList);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function loadSktItemTable(SItemList) {

    $('#tblStockTranItem').DataTable().destroy();
    debugger;

    var table = $('#tblStockTranItem').DataTable({
        //"order": [[1, "asc"]],
        data: SItemList,
        scrollY: 300,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        "bSort": false,
        columns: [

             { title: "Item", data: "Item", },
            { title: "Color", data: "Color" },
            { title: "Size", data: "Size" },
            { title: "Lot No", data: "LotNo" },
            { title: "Uom", data: "Uom" },
            { title: "Stock Qty", data: "StkQty" },
            { title: "Prg Bal Qty", data: "PrgQty" },
           {
               title: "Transfer Qty", data: "TransQty",
               render: function (data) {

                   return '<input type="text" id="txtTQty" class="calcQty form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';

               },
           },
            { title: "ItemId", data: "ItemId", "visible": false },
             { title: "ColorId", data: "ColorId", "visible": false },
             { title: "SizeId", data: "SizeId", "visible": false },
             { title: "UomId", data: "UomId", "visible": false },
              { title: "StockId", data: "StockId", "visible": false },
              { title: "PrgDetId", data: "PrgDetId", "visible": false },
              { title: "FProcessId", data: "ProcessId", "visible": false },
              { title: "NewStockId", data: "NewStockId", "visible": false },
               { title: "Alloted Qty", data: "AllotedQty" },
               { title: "Edit TransQty", data: "EditTransQty" },
        ]
    });



    var table = $('#tblStockTranItem').DataTable();
    $("#tblStockTranItem tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblStockTranItem tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });

}

function calcQty(Val) {
    debugger;

    index;

    var currentrowoftcpi = SItemList.slice(index);


    var STkId = currentrowoftcpi[0].StockId;
    var IId = currentrowoftcpi[0].ItemId;
    var CId = currentrowoftcpi[0].ColorId;
    var SId = currentrowoftcpi[0].SizeId;
    var PUId = currentrowoftcpi[0].UomId;


    var TQty = Val;


    $.each(SItemList, function () {
        if (this.StockId == STkId && this.ItemId == IId && this.ColorId == CId && this.SizeId == SId && this.UomId == PUId) {
            this.TransQty = TQty;


        }
    });



    loadSktItemTable(SItemList);
}

function LoadFOrdDropDetails() {

    if (Mode != 1) {
        var BMasId = $('#ddlFOrderNo').val();
        var JbId = $('#ddlFWorkNo').val();
        var StyId = $('#ddlFStyle').val();
        var RefNo = "";
        var RNo = $('select#ddlFRefNo option:selected').val();

        if (RNo == 0) {
            RefNo == "";
        }
        else {

            RefNo = $('select#ddlFRefNo option:selected').val();
        }

        $.ajax({
            url: "/StockAuditEntry/GetDropNo",
            data: JSON.stringify({ BMasId: BMasId, JobId: JbId, Styleid: StyId, RefNo: RefNo }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",

            success: function (result) {
                var obj = result.Value;
                if (result.Status == 'SUCCESS') {

                    var data = result.Value;


                    //RefNo
                    $(ddlFRefNo).empty();
                    $(ddlFRefNo).append($('<option/>').val('0').text('--Select RefNo--'));
                    $.each(data, function () {
                        $(ddlFRefNo).append($('<option></option>').text(this.RefNo));
                    });

                    //JobNo
                    $(ddlFWorkNo).empty();
                    $(ddlFWorkNo).append($('<option/>').val('0').text('--Select JobNo--'));
                    $.each(data, function () {
                        $(ddlFWorkNo).append($('<option></option>').val(this.JobId).text(this.Job_Ord_no));
                    });

                    //Style
                    $(ddlFStyle).empty();
                    $(ddlFStyle).append($('<option/>').val('0').text('--Select Style--'));
                    $.each(data, function () {
                        $(ddlFStyle).append($('<option></option>').val(this.Styleid).text(this.Style));
                    });
                }


            }

        });
    }

}

function LoadTOrdDropDetails() {

    if (Mode != 1) {
        var BMasId = $('#ddlTOrderNo').val();
        var JbId = $('#ddlTWorkNo').val();
        var StyId = $('#ddlTStyle').val();
        var RefNo = "";
        var RNo = $('select#ddlTRefNo option:selected').val();

        if (RNo == 0) {
            RefNo == "";
        }
        else {

            RefNo = $('select#ddlTRefNo option:selected').val();
        }

        $.ajax({
            url: "/StockAuditEntry/GetDropNo",
            data: JSON.stringify({ BMasId: BMasId, JobId: JbId, Styleid: StyId, RefNo: RefNo }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",

            success: function (result) {
                var obj = result.Value;
                if (result.Status == 'SUCCESS') {

                    var data = result.Value;


                    //RefNo
                    $(ddlTRefNo).empty();
                    $(ddlTRefNo).append($('<option/>').val('0').text('--Select RefNo--'));
                    $.each(data, function () {
                        $(ddlTRefNo).append($('<option></option>').text(this.RefNo));
                    });

                    //JobNo
                    $(ddlTWorkNo).empty();
                    $(ddlTWorkNo).append($('<option/>').val('0').text('--Select JobNo--'));
                    $.each(data, function () {
                        $(ddlTWorkNo).append($('<option></option>').val(this.JobId).text(this.Job_Ord_no));
                    });

                    //Style
                    $(ddlTStyle).empty();
                    $(ddlTStyle).append($('<option/>').val('0').text('--Select Style--'));
                    $.each(data, function () {
                        $(ddlTStyle).append($('<option></option>').val(this.Styleid).text(this.Style));
                    });
                }


            }

        });
    }

}

function save() {

    debugger;

    var res = validate();
    if (res == false) {
        return false;
    }


    if (SItemList.length == 0) {
        //alert("Please Enter the Item Details..");
        var msg = 'Please Enter the Item Details...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }


    var FOType = $('input[name="FOrder"]:checked').attr('value');
    var TOType = $('input[name="ToOrder"]:checked').attr('value');

    var FOrdNo = "";
    var FONo = $("#ddlFOrderNo option:selected").text();

    if (FONo == "") {
        FOrdNo == "";
    }
    else {

        FOrdNo = $("#ddlFOrderNo option:selected").text();
    }


    var TOrdNo = "";
    var TONo = $("#ddlTOrderNo option:selected").text();

    if (TONo == "") {
        TOrdNo == "";
    }
    else {

        TOrdNo = $("#ddlTOrderNo option:selected").text();
    }

    var FRefNo = "";
    var FRNo = $('select#ddlFRefNo option:selected').val();

    if (FRNo == 0) {
        FRefNo == "";
    }
    else {

        FRefNo = $('select#ddlFRefNo option:selected').val();
    }


    var TRefNo = "";
    var TRNo = $('select#ddlTRefNo option:selected').val();

    if (TRNo == 0) {
        TRefNo == "";
    }
    else {

        TRefNo = $('select#ddlTRefNo option:selected').val();
    }

    var FJobNo = "";
    var FJbNo = $("#ddlFWorkNo option:selected").text();

    if (FJbNo == "" || FJbNo == "--Select Job No--") {
        FJobNo == "";
    }
    else {

        FJobNo = $("#ddlFWorkNo option:selected").text();
    }
    var TJobNo = "";
    var TJbNo = $("#ddlTWorkNo option:selected").text();
  
    if (TJbNo == "" || TJbNo == "--Select Job No--") {
        TJobNo == "";
    }
    else {

        TJobNo = $("#ddlTWorkNo option:selected").text();
    }

    var opchk = [];
    for (var y = 0; y < SItemList.length; y++) {
        if (SItemList[y].TransQty > 0) {
            opchk.push(SItemList[y]);
        }
    }
    if (opchk.length == 0) {
        //alert('Please fill atleast any one qty...');
        var msg = 'Please fill atleast any one quantity...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }
    debugger;
    var oldEntryNo = $('#txtEntryNo').val();

    table = "stocktranmasnew",
    column = "TransNo",
    Docum = 'STOCK TRANSFER',
    compId = $('#ddlFromCompany').val();

    if (compId == null) {
        compId = DCompid;
    } else {
        compId = $('#ddlFromCompany').val();
    }
    FromCompanyId = compId;

    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var newEntryNo = result.Value;
            if (oldEntryNo != newEntryNo) {
                //alert('Entry No has been changed...');
                var msg = 'Entry Number has been changed...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                $('#txtEntryNo').val(result.Value);
            }
            var objPurSubmit = {

                FromCompId: $('#ddlFromCompany').val(),
                ToCompId: $('#ddlTocompany').val(),
                TransNo: $('#txtEntryNo').val(),
                TransDate: $('#txtEntryDate').val(),//new Date($('#txtEntryDate').val()),
                FromStoreUnitID: $('#ddlFromStore').val(),
                ToStoreUnitID: $('#ddlTostore').val(),
                FromStyleid: $('#ddlFStyle').val(),
                ToStyleid: $('#ddlTStyle').val(),
                ItemGroupId: $('#ddlItemGroup').val(),
                Processid: $('#ddlProcess').val(),
                FOrdNo: FOrdNo,
                TOrdNo: TOrdNo,
                FJOrdNo: FJobNo,
                TJOrdNo: TJobNo,
                Remarks: $('#txtRemark').val(),
                CreatedBy: Guserid,
                FTransType: FOType,
                TTransType: TOType,
                StockTransDet: SItemList

            };
            debugger;
            $("#Add").attr("disabled", true);
            LoadingSymb();
            $.ajax({
                url: "/StockTransfer/Add",
                data: JSON.stringify(objPurSubmit),
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {
                    //alert("Data Saved Sucessfully");
                    //$('#myModal').modal('hide');
                    //ClearData();

                    if (result.Value == true) {
                        AddUserEntryLog('Procurement', 'Stock Transfer', 'ADD', $("#txtEntryNo").val());
                        //alert("Data Saved Sucessfully");
                        var msg = 'Data Saved Sucessfully...';
                        var flg = 1;
                        var mod = 0;
                        var url = "";
                        AlartMessage(msg, flg, mod, url);
                        $('#myModal').modal('hide');
                        ClearData();

                    } else {

                        window.location.href = "/Error/Index";

                    }

                },
                error: function (errormessage) {
                    alert(errormessage.responseText);
                }
            });
        }
    });
}


function validate() {
    var isValid = true;

    if ($('#ddlTocompany').val() == 0) {
        //$('#ddlTocompany').css('border-color', 'Red');
        $('#ddlTocompany').siblings(".select2-container").css('border', '1px solid red');

        isValid = false;
    }
    else {
        $('#ddlTocompany').siblings(".select2-container").css('border', '1px solid lightgrey');
    }


    if ($('#ddlFromCompany').val() == 0) {
        //$('#ddlFromCompany').css('border-color', 'Red');
        $('#ddlFromCompany').siblings(".select2-container").css('border', '1px solid red');

        isValid = false;
    }
    else {
        $('#ddlFromCompany').siblings(".select2-container").css('border', '1px solid lightgrey');
    }



    if ($('#ddlTostore').val() == 0) {
        //$('#ddlFromCompany').css('border-color', 'Red');
        $('#ddlTostore').siblings(".select2-container").css('border', '1px solid red');

        isValid = false;
    }
    else {
        $('#ddlTostore').siblings(".select2-container").css('border', '1px solid lightgrey');
    }

    return isValid;
}


function getbyID(Id) {

    GTrfId = Id;
    Mode = 1;

    //LoadCompanyDDL("#ddlFromCompany,#ddlTocompany");
    //LoadItemGroupDDL("#ddlItemGroup");
    //LoadStyleDDL("#ddlFStyle,#ddlTStyle");
    //LoadRefNoDDL("#ddlFRefNo,#ddlTRefNo");
    //LoadJobNoDDL("#ddlFWorkNo,#ddlTWorkNo");
    //LoadOrderNoDDL("#ddlFOrderNo,#ddlTOrderNo");
    //LoadProcessDDL("#ddlProcess");
    $.ajax({
        url: "/StockTransfer/LoadEditTransDetails",
        data: JSON.stringify({ TransferId: Id }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            debugger;
            if (obj != undefined) {
                $('#ddlFromCompany').val(obj[0]["FromCompId"]).trigger('change');
                $('#ddlTocompany').val(obj[0]["ToCompId"]).trigger('change');
                $('#txtEntryNo').val(obj[0]["TransNo"]);
                $('#txtEntryDate').val(moment(obj[0]["txtEntryDate"]).format('DD/MM/YYYY'));
                $('#ddlItemGroup').val(obj[0]["ItemGroupId"]).trigger('change');
                $('#ddlFStyle').val(obj[0]["FromStyleid"]).trigger('change');
                $('#ddlTStyle').val(obj[0]["ToStyleid"]).trigger('change');
                $('#txtRemark').val(obj[0]["Remarks"]);
                $('#ddlFRefNo').val(obj[0]["FBMasId"]).trigger('change');
                $('#ddlTRefNo').val(obj[0]["TBMasId"]).trigger('change');
                $('#ddlFOrderNo').val(obj[0]["FBMasId"]).trigger('change');
                $('#ddlTOrderNo').val(obj[0]["TBMasId"]).trigger('change');
                $('#ddlFWorkNo').val(obj[0]["FJobId"]).trigger('change');
                $('#ddlTWorkNo').val(obj[0]["TJobId"]).trigger('change');
                $('#ddlProcess').val(obj[0]["Processid"]).trigger('change');
                // $('#ddlTostore').val(obj[0]["ToStoreUnitID"]).trigger('change');

                //$('#ddlRequestner').val(obj[0]["FTransType"]);
                //$('#txtVechicalNo').val(obj[0]["GatePassVehicle"]);
                //$('#txtdescription').val(obj[0]["remarks"]);
                //$('#ddlLoc').val(obj[0]["desunitid"]);

                CheckAlloted();
                FromCompanyId = obj[0]["FromCompId"];
                ToCompanyId = obj[0]["ToCompId"];

                editmasFunitstore = obj[0]["FromStoreUnitID"];
                editmasTunitstore = obj[0]["ToStoreUnitID"];

                LoadEmployeeFromStoreunit();
                LoadEmployeeToStoreunit();


                var DType = obj[0]["FTransType"];
                var OType = obj[0]["FTransType"];

                $("#FromId").find('input,textarea,button,select').attr('disabled', 'disabled');
                $("#ToId").find('input,textarea,button,select').attr('disabled', 'disabled');

                if (DType == "BB") {

                    $("#optB").prop("checked", true);
                    $("#optS").prop("checked", false);
                    $("#optG").prop("checked", false);
                    $("#opttosaemord").prop("checked", false);
                    $("#opttogenord").prop("checked", false);
                    $("#opttowrkord").prop("checked", true); 
                    $("#opttosplord").prop("checked", false);
                } else if (OType == "BS") {

                    $("#optB").prop("checked", true);
                    $("#optS").prop("checked", false);
                    $("#optG").prop("checked", false);
                    $("#opttosaemord").prop("checked", true);
                    $("#opttogenord").prop("checked", false);
                    $("#opttowrkord").prop("checked", false);
                    $("#opttosplord").prop("checked", false);

                } else if (OType == "BG") {

                    $("#optB").prop("checked", true);
                    $("#optS").prop("checked", false);
                    $("#optG").prop("checked", false);
                    $("#opttosaemord").prop("checked", false);
                    $("#opttogenord").prop("checked", true);
                    $("#opttowrkord").prop("checked", false);
                    $("#opttosplord").prop("checked", false);

                }
                else if (OType == "SB") {

                    $("#optB").prop("checked", false);
                    $("#optS").prop("checked", true);
                    $("#optG").prop("checked", false);
                    $("#opttosaemord").prop("checked", false);
                    $("#opttogenord").prop("checked", false);
                    $("#opttowrkord").prop("checked", true);
                    $("#opttosplord").prop("checked", false);

                } else if (OType == "SS") {

                    $("#optB").prop("checked", false);
                    $("#optS").prop("checked", true);
                    $("#optG").prop("checked", false);
                    $("#opttosaemord").prop("checked", true);
                    $("#opttogenord").prop("checked", false);
                    $("#opttowrkord").prop("checked", false);
                    $("#opttosplord").prop("checked", false);

                } else if (OType == "SG") {

                    $("#optB").prop("checked", false);
                    $("#optS").prop("checked", true);
                    $("#optG").prop("checked", false);
                    $("#opttosaemord").prop("checked", false);
                    $("#opttogenord").prop("checked", true);
                    $("#opttowrkord").prop("checked", false);
                    $("#opttosplord").prop("checked", false);

                } else if (OType == "GB") {

                    $("#optB").prop("checked", false);
                    $("#optS").prop("checked", false);
                    $("#optG").prop("checked", true);
                    $("#opttosaemord").prop("checked", false);
                    $("#opttogenord").prop("checked", false);
                    $("#opttowrkord").prop("checked", true);
                    $("#opttosplord").prop("checked", false);

                } else if (OType == "GS") {

                    $("#optB").prop("checked", false);
                    $("#optS").prop("checked", false);
                    $("#optG").prop("checked", true);
                    $("#opttosaemord").prop("checked", true);
                    $("#opttogenord").prop("checked", false);
                    $("#opttowrkord").prop("checked", false);
                    $("#opttosplord").prop("checked", false);

                } else if (OType == "GG") {

                    $("#optB").prop("checked", false);
                    $("#optS").prop("checked", false);
                    $("#optG").prop("checked", true);
                    $("#opttosaemord").prop("checked", false);
                    $("#opttogenord").prop("checked", true);
                    $("#opttowrkord").prop("checked", false);
                    $("#opttosplord").prop("checked", false);

                }

                else if (OType == "GR") {

                    $("#optB").prop("checked", false);
                    $("#optS").prop("checked", false);
                    $("#optG").prop("checked", true);
                    $("#opttosaemord").prop("checked", false);
                    $("#opttogenord").prop("checked", false);
                    $("#opttowrkord").prop("checked", false);
                    $("#opttosplord").prop("checked", true);
                    LoadReqno();

                }
                else if (OType == "BR") {

                    $("#optB").prop("checked", true);
                    $("#optS").prop("checked", false);
                    $("#optG").prop("checked", false);
                    $("#opttosaemord").prop("checked", false);
                    $("#opttogenord").prop("checked", false);
                    $("#opttowrkord").prop("checked", false);
                    $("#opttosplord").prop("checked", true);
                    LoadReqno();
                }
                else if (OType == "SR") {

                    $("#optB").prop("checked", false);
                    $("#optS").prop("checked", true);
                    $("#optG").prop("checked", false);
                    $("#opttosaemord").prop("checked", false);
                    $("#opttogenord").prop("checked", false);
                    $("#opttowrkord").prop("checked", false);
                    $("#opttosplord").prop("checked", true);
                    LoadReqno();
                }


                LoadTrfItemDetailsEdit(Id);
                $('#myModal').modal('show');
                $('#Update').show();
                $('#Add').hide();
                $('#Delete').hide();
            }
            else {

            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function LoadTrfItemDetailsEdit(Id) {
    debugger;
    var FCompId = $('#ddlFromCompany').val();
    var TCompId = $('#ddlTocompany').val();
    var ProcId = $('#ddlProcess').val();
    var ImId = $('#ddlItem').val();
    var ClId = $('#ddlColor').val();
    var MilId = $('#ddlMillName').val();
    var FStyId = $('#ddlFStyle').val();
    var TStyId = $('#ddlTStyle').val();
    var IgId = $('#ddlItemGroup').val();
    var FStoreId = $('#ddlFromStore').val();
    var TStoreId = $('#ddlTostore').val();
    var FOType = $('input[name="FOrder"]:checked').attr('value');
    var FSType = $('input[name="FOrderSub"]:checked').attr('value');
    var TOType = $('input[name="ToOrder"]:checked').attr('value');
    var TSType = $('input[name="ToOrderSub"]:checked').attr('value');


    var FOrdNo = "";
    var FONo = $("#ddlFOrderNo option:selected").text();

    if (FONo == "") {
        FOrdNo == "";
    }
    else {

        FOrdNo = $("#ddlFOrderNo option:selected").text();
    }


    var TOrdNo = "";
    var TONo = $("#ddlTOrderNo option:selected").text();

    if (TONo == "") {
        TOrdNo == "";
    }
    else {

        TOrdNo = $("#ddlTOrderNo option:selected").text();
    }

    var FRefNo = "";
    var FRNo = $('select#ddlFRefNo option:selected').val();

    if (FRNo == 0) {
        FRefNo == "";
    }
    else {

        FRefNo = $('select#ddlFRefNo option:selected').val();
    }


    var TRefNo = "";
    var TRNo = $('select#ddlTRefNo option:selected').val();

    if (TRNo == 0) {
        TRefNo == "";
    }
    else {

        TRefNo = $('select#ddlTRefNo option:selected').val();
    }

    var FJobNo = "";
    var FJbNo = $("#ddlFWorkNo option:selected").text();

    if (FJbNo == "") {
        FJobNo == "";
    }
    else {

        FJobNo = $("#ddlFWorkNo option:selected").text();
    }
    var TJobNo = "";
    var TJbNo = $("#ddlTWorkNo option:selected").text();

    if (TJbNo == "") {
        TJobNo == "";
    }
    else {

        TJobNo = $("#ddlTWorkNo option:selected").text();
    }

    $.ajax({
        url: "/StockTransfer/LoadItemEditDetailsTfr",
        data: JSON.stringify({ FromCompId: FCompId, ToCompId: TCompId, FTransType: FOType, FSTransType: FSType, TTransType: TOType, TSTransType: TSType, ItemId: ImId, ColorId: ClId, ItemGroupId: IgId, FromStoreUnitID: FStoreId, ToStoreUnitID: TStoreId, MillId: MilId, FromStyleid: FStyId, ToStyleid: TStyId, FromRef: FRefNo, ToRef: TRefNo, FOrdNo: FOrdNo, TOrdNo: TOrdNo, FJOrdNo: FJobNo, TJOrdNo: TJobNo, Processid: ProcId, TransferId: Id }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            SItemList = result;
            loadSktItemTable(SItemList);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function Update() {

    debugger;

    var res = validate();
    if (res == false) {
        return false;
    }


    if (SItemList.length == 0) {
        //alert("Please Enter the Item Details..");
        var msg = 'Please Enter the Item Details...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }


    var FOType = $('input[name="FOrder"]:checked').attr('value');
    var TOType = $('input[name="ToOrder"]:checked').attr('value');

    var FOrdNo = "";
    var FONo = $("#ddlFOrderNo option:selected").text();

    if (FONo == "") {
        FOrdNo == "";
    }
    else {

        FOrdNo = $("#ddlFOrderNo option:selected").text();
    }


    var TOrdNo = "";
    var TONo = $("#ddlTOrderNo option:selected").text();

    if (TONo == "") {
        TOrdNo == "";
    }
    else {

        TOrdNo = $("#ddlTOrderNo option:selected").text();
    }

    var FRefNo = "";
    var FRNo = $('select#ddlFRefNo option:selected').val();

    if (FRNo == 0) {
        FRefNo == "";
    }
    else {

        FRefNo = $('select#ddlFRefNo option:selected').val();
    }


    var TRefNo = "";
    var TRNo = $('select#ddlTRefNo option:selected').val();

    if (TRNo == 0) {
        TRefNo == "";
    }
    else {

        TRefNo = $('select#ddlTRefNo option:selected').val();
    }

    var FJobNo = "";
    var FJbNo = $("#ddlFWorkNo option:selected").text();

    if (FJbNo == "" || FJbNo == "--Select Job No--") {
        FJobNo == "";
    }
    else {

        FJobNo = $("#ddlFWorkNo option:selected").text();
    }
    var TJobNo = "";
    var TJbNo = $("#ddlTWorkNo option:selected").text();

    if (TJbNo == "" || TJbNo == "--Select Job No--") {
        TJobNo == "";
    }
    else {

        TJobNo = $("#ddlTWorkNo option:selected").text();
    }


    var objPurSubmit = {
        TransferId: GTrfId,
        FromCompId: $('#ddlFromCompany').val(),
        ToCompId: $('#ddlTocompany').val(),
        TransNo: $('#txtEntryNo').val(),
        TransDate: $('#txtEntryDate').val(),//new Date($('#txtEntryDate').val()),
        FromStoreUnitID: $('#ddlFromStore').val(),
        ToStoreUnitID: $('#ddlTostore').val(),
        FromStyleid: $('#ddlFStyle').val(),
        ToStyleid: $('#ddlTStyle').val(),
        ItemGroupId: $('#ddlItemGroup').val(),
        Processid: $('#ddlProcess').val(),
        FOrdNo: FOrdNo,
        TOrdNo: TOrdNo,
        FJOrdNo: FJobNo,
        TJOrdNo: TJobNo,
        Remarks: $('#txtRemark').val(),
        CreatedBy: Guserid,
        FTransType: FOType,
        TTransType: TOType,
        StockTransDet: SItemList

    };
    debugger;
    $("#Update").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/StockTransfer/Update",
        data: JSON.stringify(objPurSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == true) {
                AddUserEntryLog('Procurement', 'Stock Transfer', 'UPDATE', $("#txtEntryNo").val());
                //alert("Data Updated Sucessfully");
                var msg = 'Data Updated Sucessfully...';
                var flg = 1;
                var mod = 0;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                $('#myModal').modal('hide');
                ClearData();

            } else {

                window.location.href = "/Error/Index";

            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

///////////////////////////Delete/////////////////////////////////

function getDeleteID(Id) {

    GTrfId = Id;
    Mode = 2;
    //LoadCompanyDDL("#ddlFromCompany,#ddlTocompany");
    //LoadItemGroupDDL("#ddlItemGroup");
    //LoadStyleDDL("#ddlFStyle,#ddlTStyle");
    //LoadRefNoDDL("#ddlFRefNo,#ddlTRefNo");
    //LoadJobNoDDL("#ddlFWorkNo,#ddlTWorkNo");
    //LoadOrderNoDDL("#ddlFOrderNo,#ddlTOrderNo");
    $.ajax({
        url: "/StockTransfer/LoadEditTransDetails",
        data: JSON.stringify({ TransferId: Id }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            debugger;
            if (obj != undefined) {
                $('#ddlFromCompany').val(obj[0]["FromCompId"]);
                $('#ddlTocompany').val(obj[0]["ToCompId"]);
                $('#txtEntryNo').val(obj[0]["TransNo"]);
                $('#txtEntryDate').val(moment(obj[0]["txtEntryDate"]).format('DD/MM/YYYY'));
                $('#ddlItemGroup').val(obj[0]["ItemGroupId"]);
                $('#ddlFStyle').val(obj[0]["FromStyleid"]);
                $('#ddlTStyle').val(obj[0]["ToStyleid"]);
                $('#txtRemark').val(obj[0]["Remarks"]);
                $('#ddlFRefNo').val(obj[0]["FBMasId"]);
                $('#ddlTRefNo').val(obj[0]["TBMasId"]);
                $('#ddlFOrderNo').val(obj[0]["FBMasId"]);
                $('#ddlTOrderNo').val(obj[0]["TBMasId"]);
                $('#ddlFWorkNo').val(obj[0]["FJobId"]);
                $('#ddlTWorkNo').val(obj[0]["TJobId"]);
                $('#ddlProcess').val(obj[0]["Processid"]);
                $('#ddlTostore').val(obj[0]["ToStoreUnitID"]);

                //$('#ddlRequestner').val(obj[0]["FTransType"]);
                //$('#txtVechicalNo').val(obj[0]["GatePassVehicle"]);
                //$('#txtdescription').val(obj[0]["remarks"]);
                //$('#ddlLoc').val(obj[0]["desunitid"]);

                CheckAlloted();
                var DType = obj[0]["FTransType"];
                var OType = obj[0]["FTransType"];


                $("#FromId").find('input,textarea,button,select').attr('disabled', 'disabled');
                $("#ToId").find('input,textarea,button,select').attr('disabled', 'disabled');

                if (DType == "BB") {

                    $("#optB").prop("checked", true);
                    $("#optS").prop("checked", false);
                    $("#optG").prop("checked", false);
                    $("#opttosaemord").prop("checked", false);
                    $("#opttogenord").prop("checked", false);
                    $("#opttowrkord").prop("checked", true);
                    $("#opttosplord").prop("checked", false);
                } else if (OType == "BS") {

                    $("#optB").prop("checked", true);
                    $("#optS").prop("checked", false);
                    $("#optG").prop("checked", false);
                    $("#opttosaemord").prop("checked", true);
                    $("#opttogenord").prop("checked", false);
                    $("#opttowrkord").prop("checked", false);
                    $("#opttosplord").prop("checked", false);

                } else if (OType == "BG") {

                    $("#optB").prop("checked", true);
                    $("#optS").prop("checked", false);
                    $("#optG").prop("checked", false);
                    $("#opttosaemord").prop("checked", false);
                    $("#opttogenord").prop("checked", true);
                    $("#opttowrkord").prop("checked", false);
                    $("#opttosplord").prop("checked", false);

                }
                else if (OType == "SB") {

                    $("#optB").prop("checked", false);
                    $("#optS").prop("checked", true);
                    $("#optG").prop("checked", false);
                    $("#opttosaemord").prop("checked", false);
                    $("#opttogenord").prop("checked", false);
                    $("#opttowrkord").prop("checked", true);
                    $("#opttosplord").prop("checked", false);

                } else if (OType == "SS") {

                    $("#optB").prop("checked", false);
                    $("#optS").prop("checked", true);
                    $("#optG").prop("checked", false);
                    $("#opttosaemord").prop("checked", true);
                    $("#opttogenord").prop("checked", false);
                    $("#opttowrkord").prop("checked", false);
                    $("#opttosplord").prop("checked", false);

                } else if (OType == "SG") {

                    $("#optB").prop("checked", false);
                    $("#optS").prop("checked", true);
                    $("#optG").prop("checked", false);
                    $("#opttosaemord").prop("checked", false);
                    $("#opttogenord").prop("checked", true);
                    $("#opttowrkord").prop("checked", false);
                    $("#opttosplord").prop("checked", false);

                } else if (OType == "GB") {

                    $("#optB").prop("checked", false);
                    $("#optS").prop("checked", false);
                    $("#optG").prop("checked", true);
                    $("#opttosaemord").prop("checked", false);
                    $("#opttogenord").prop("checked", false);
                    $("#opttowrkord").prop("checked", true);
                    $("#opttosplord").prop("checked", false);

                } else if (OType == "GS") {

                    $("#optB").prop("checked", false);
                    $("#optS").prop("checked", false);
                    $("#optG").prop("checked", true);
                    $("#opttosaemord").prop("checked", true);
                    $("#opttogenord").prop("checked", false);
                    $("#opttowrkord").prop("checked", false);
                    $("#opttosplord").prop("checked", false);

                } else if (OType == "GG") {

                    $("#optB").prop("checked", false);
                    $("#optS").prop("checked", false);
                    $("#optG").prop("checked", true);
                    $("#opttosaemord").prop("checked", false);
                    $("#opttogenord").prop("checked", true);
                    $("#opttowrkord").prop("checked", false);
                    $("#opttosplord").prop("checked", false);

                }
                else if (OType == "GR") {

                    $("#optB").prop("checked", false);
                    $("#optS").prop("checked", false);
                    $("#optG").prop("checked", true);
                    $("#opttosaemord").prop("checked", false);
                    $("#opttogenord").prop("checked", false);
                    $("#opttowrkord").prop("checked", false);
                    $("#opttosplord").prop("checked", true);

                }
                else if (OType == "BR") {

                    $("#optB").prop("checked", true);
                    $("#optS").prop("checked", false);
                    $("#optG").prop("checked", false);
                    $("#opttosaemord").prop("checked", false);
                    $("#opttogenord").prop("checked", false);
                    $("#opttowrkord").prop("checked", false);
                    $("#opttosplord").prop("checked", true);

                }
                else if (OType == "SR") {

                    $("#optB").prop("checked", false);
                    $("#optS").prop("checked", true);
                    $("#optG").prop("checked", false);
                    $("#opttosaemord").prop("checked", false);
                    $("#opttogenord").prop("checked", false);
                    $("#opttowrkord").prop("checked", false);
                    $("#opttosplord").prop("checked", true);

                }


                LoadTrfItemDetailsEdit(Id);
                $('#myModal').modal('show');
                $('#Update').hide();
                $('#Add').hide();
                $('#Delete').show();
                //$("#Delete").attr("disabled", true);
            }
            else {

            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function Delete() {
    debugger;


    var res = validate();
    if (res == false) {
        return false;
    }
    
    //if (SItemList.length == 0) {
    //    //alert("Please Enter the Item Details..");
    //    var msg = 'Please Enter the Item Details...';
    //    var flg = 4;
    //    var mod = 1;
    //    var url = "";
    //    AlartMessage(msg, flg, mod, url);
    //    return true;
    //}


    var FOType = $('input[name="FOrder"]:checked').attr('value');
    var TOType = $('input[name="ToOrder"]:checked').attr('value');

    var FOrdNo = "";
    var FONo = $("#ddlFOrderNo option:selected").text();

    if (FONo == "") {
        FOrdNo == "";
    }
    else {

        FOrdNo = $("#ddlFOrderNo option:selected").text();
    }


    var TOrdNo = "";
    var TONo = $("#ddlTOrderNo option:selected").text();

    if (TONo == "") {
        TOrdNo == "";
    }
    else {

        TOrdNo = $("#ddlTOrderNo option:selected").text();
    }

    var FRefNo = "";
    var FRNo = $('select#ddlFRefNo option:selected').val();

    if (FRNo == 0) {
        FRefNo == "";
    }
    else {

        FRefNo = $('select#ddlFRefNo option:selected').val();
    }


    var TRefNo = "";
    var TRNo = $('select#ddlTRefNo option:selected').val();

    if (TRNo == 0) {
        TRefNo == "";
    }
    else {

        TRefNo = $('select#ddlTRefNo option:selected').val();
    }

    var FJobNo = "";
    var FJbNo = $("#ddlFWorkNo option:selected").text();

    if (FJbNo == "") {
        FJobNo == "";
    }
    else {

        FJobNo = $("#ddlFWorkNo option:selected").text();
    }
    var TJobNo = "";
    var TJbNo = $("#ddlTWorkNo option:selected").text();

    if (TJbNo == "") {
        TJobNo == "";
    }
    else {

        TJobNo = $("#ddlTWorkNo option:selected").text();
    }
    var objConStkDelete = {
        TransferId: GTrfId,
        FromCompId: $('#ddlFromCompany').val(),
        ToCompId: $('#ddlTocompany').val(),
        TransNo: $('#txtEntryNo').val(),
        TransDate: $('#txtEntryDate').val(),//new Date($('#txtEntryDate').val()),
        FromStoreUnitID: $('#ddlFromStore').val(),
        ToStoreUnitID: $('#ddlTostore').val(),
        FromStyleid: $('#ddlFStyle').val(),
        ToStyleid: $('#ddlTStyle').val(),
        ItemGroupId: $('#ddlItemGroup').val(),
        Processid: $('#ddlProcess').val(),
        FOrdNo: FOrdNo,
        TOrdNo: TOrdNo,
        FJOrdNo: FJobNo,
        TJOrdNo: TJobNo,
        Remarks: $('#txtRemark').val(),
        CreatedBy: Guserid,
        FTransType: FOType,
        TTransType: TOType,
        StockTransDet: SItemList
    };
    $("#Delete").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/StockTransfer/Delete",
        data: JSON.stringify(objConStkDelete),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == true) {
                AddUserEntryLog('Procurement', 'Stock Transfer', 'DELETE', $("#txtEntryNo").val());
                //alert("Data Deleted Sucessfully");
                var msg = 'Data Deleted Sucessfully...';
                var flg = 2;
                var mod = 0;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                $('#myModal').modal('hide');
                ClearData();

            } else {

                window.location.href = "/Error/Index";

            }
        },
        error: function (errormessage) {
            debugger;
            alert(errormessage.responseText);
        }
    });

}
///


function StkTransPrint(Id) {
    debugger;
    Rptid = Id;
    $('#myModal2').modal('show');

    docname = "STOCK TRANSFER";
    GenerateReportItem(docname);



    //window.open("../ReportInline/Stores/StockTransfer/StockTransferInlineReport.aspx?Masid=" + Id);
    //return true;
}

function GenerateReportItem(name) {

    $("#sbTwo").empty();
    $.ajax({
        url: "/BulkOrder/GetReportOption",
        data: JSON.stringify({ docname: name }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {

            //document.getElementById('sbTwo');
            var obje = result.Value;
            repobj = obje;
            var obj = $.grep(repobj, function (r) {
                return r.optionid != 13280;
            });


            $.each(obj, function () {
                $("#sbTwo").append($("<option></option>").val(this.optionid).html(this.option));

            });

            i = 0, size = obj.length;
            for (i; i < size; i++) {
                //$("#sbTwo").multiselect("widget").find(":checkbox[value='" + obj[i][optionid] + "']").attr("checked", "checked");
                if (obj[i].optionvalue == true) {
                    $("#sbTwo").find(":checkbox[value='" + obj[i].optionid + "']").attr("checked", true);
                    $("#sbTwo option[value='" + obj[i].optionid + "']").attr("selected", true);
                    //$("#sbTwo").multiselect("refresh");
                }
                else {
                    $("#sbTwo").find(":checkbox[value='" + obj[i].optionid + "']").attr("checked", false);
                    $("#sbTwo option[value='" + obj[i].optionid + "']").attr("selected", false);
                }
            }
        }
    });
}

function SubReport() {

    var arr = [];
    $('#sbTwo :selected').each(function (i, sel) {
        arr.push($(sel).val());
    });
    var res = [];
    var p = [];
    for (var r = 0; r < repobj.length; r++) {
        res.push(repobj[r].optionid);
        p.push(0);
    }
    for (var y = 0; y < arr.length; y++) {
        for (var f = 0; f < res.length; f++) {
            if (arr[y] == res[f]) {
                p[f] = 1;
            }
        }
    }
    var compid = $('#ddlMFromCompany').val();
    window.open("../ReportInline/Stores/StockTransfer/StockTransferInlineReport.aspx?Masid=" + Rptid + "&Companyid=" + compid);

   // window.open("../ReportInline/Stores/StockTransfer/StockTransferInlineReport.aspx?Masid=" + Rptid + "&Remarks=" + p[0] + "&TotalQty=" + p[1] + "&SecQty=" + p[2] + "&Splitup=" + p[3] + "&Gatepass=" + p[4] + "&IssueQty=" + 0 + "&Rate=" + p[6] + "&DeliLoc=" + p[7] + "&ExcessQty=" + p[8] + "&OrdNo=" + p[9] + "&WrkOrdNo=" + p[10] + "&ArtNo=" + p[11] + "&RefNo=" + p[12]);

}

function backtomain() {

    $('#myModal2').modal('hide');
}


function LoadEmployeeFromStoreunit() {
    debugger;
    if (UserName == 'superuser') {
        LoginUserid = 0;
    }

    $.ajax({
        url: "/StoreSetup/GetStoreRights",
        data: JSON.stringify({ Userid: LoginUserid, Storetype: 'M', Companyid: FromCompanyId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        
        success: function (result) {
            debugger;
            var data = result.Value;
            $(ddlFromStore).empty();
            $(ddlFromStore).append($('<option/>').val('0').text('--Select Store--'));
            $.each(data, function () {
                $(ddlFromStore).append($('<option></option>').val(this.Storeid).text(this.StoreName));
            });
            $(ddlFromStore).trigger("select2:updated");
            if (editmasFunitstore > 0) {
                $('#ddlFromStore').val(editmasFunitstore).trigger('change');
            }
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });



}

function LoadEmployeeToStoreunit() {
    debugger;
    if (UserName == 'superuser') {
        LoginUserid = 0;
    }

    $.ajax({
        url: "/StoreSetup/GetStoreRights",
        data: JSON.stringify({ Userid: LoginUserid, Storetype: 'M', Companyid: ToCompanyId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var data = result.Value;
            $(ddlTostore).empty();
            $(ddlTostore).append($('<option/>').val('0').text('--Select Store--'));
            $.each(data, function () {
                $(ddlTostore).append($('<option></option>').val(this.Storeid).text(this.StoreName));
            });
            $(ddlTostore).trigger("select2:updated");
            if (editmasTunitstore > 0) {
                $('#ddlTostore').val(editmasTunitstore).trigger('change');
            }
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });



}

function LoadItemMovements(GrnNo) {
    debugger;

    $.ajax({
        url: "/GRNMain/LoadItemstockMovement/",
        data: JSON.stringify({ GrnNo: GrnNo }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            ItemMovementList = (result.Value);

            loadItemMovementTable(ItemMovementList);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function loadItemMovementTable(ItemMovementList) {
    debugger;
    // $('#tblcompdetails').DataTable().destroy();
    var inputcount = 0;
    $('#tblItemMovementdetails tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tblItemMovementdetails').DataTable().destroy();
    }
    $('#tblItemMovementdetails').empty();

    $('#tblItemMovementdetails').DataTable({

        data: ItemMovementList,
        scrollY: 300,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        "bSort": false,

        columns: [
             //{ title: "Trims SlNo", data: "TrimsSlNo", "visible": false },
            { title: "Trans No", data: "transno" },
            { title: "Item", data: "Item" },
            { title: "Color", data: "Color" },
            { title: "Size", data: "Size" },
            { title: "Order No", data: "OrderNo", visible: false },
            { title: "Quantity", data: "Quantity" },
            { title: "Stock Qty", data: "StockQty" },
            { title: "UOM", data: "Uom" },
            { title: "Issue No", data: "IssueNo" },
            { title: "Date", data: "IssueDate" },
            { title: "IssueQty", data: "IssueQty" },
            { title: "Store Name", data: "StoreName" },
        ]
    });


    $("#tblItemMovementdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblItemMovementdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}

function CheckAlloted() {

    var Recpno = $('#txtEntryNo').val();

    $.ajax({
        url: "/PurchaseQuality/LoadQltyCheckItemEditDetails",
        data: JSON.stringify({ RecNo: Recpno }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            AllotedItemList = result;
            if (AllotedItemList.length > 0) {


                for (var x = 0; x < AllotedItemList.length; x++) {

                    //alert("Stock is alloted for " + AllotedItemList[x].CTransNo + ",Please Check it....")
                    var msg = "Stock is alloted for " + AllotedItemList[x].CTransNo + ",Please Check it...";
                    var flg = 4;
                    var mod = 1;
                    var url = "";
                    AlartMessage(msg, flg, mod, url);
                    $("#Update").attr('disabled', true);
                    $("#Delete").attr('disabled', true);
                    $('#Add').hide();
                    return true;
                }

            } else {
                $("#Update").attr('disabled', false);
                $("#Delete").attr('disabled', false);
            }


        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadSeq() {
    debugger;
    var processid = $('select#ddlProcess option:selected').val();
    var jobno = $('select#ddlTWorkNo option:selected').text();
    if (jobno == "" || jobno == "--Select Job No--") {
        jobno == "";
    }

    if (processid > 0) {
        if (jobno!="")

        $.ajax({
            url: "/StockTransfer/LoadProcessSeq/",
            data: JSON.stringify({ Processid: processid, JobNo: jobno }),
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                debugger;
                var obj = result;
                var revdet = {};
                var rev = [];

                $.each(obj, function (i, el) {

                    if (!revdet[el.ProgramSeqno]) {
                        revdet[el.ProgramSeqno] = true;
                        rev.push(el);
                    }
                });
                $('#ddlProgramSeq').empty();
                $('#ddlProgramSeq').append($('<option/>').val('0').text('--Select Seq No--'));
                $.each(rev, function () {
                    $('#ddlProgramSeq').append($('<option></option>').val(this.ProgramSeqno).text(this.ProgramSeqno));
                });
            }
        });

    }
}


function LoadReqno() {
    debugger;
 
    var TOType = $('input[name="ToOrder"]:checked').attr('value');

    if (TOType == 'R') {
        var jobno = $('select#ddlTWorkNo option:selected').text();
        if (jobno == "" || jobno == "--Select Job No--") {
            jobno == "";
        }

        if (jobno != "")

            $.ajax({
                url: "/StockTransfer/LoadReqno/",
                data: JSON.stringify({ JobNo: jobno, id: GTrfId }),
                type: "POST",
                contentType: "application/json;charset=UTF-8",
                dataType: "json",
                success: function (result) {
                    debugger;
                    var obj = result;
                    var revdet = {};
                    var rev = [];

                    $.each(obj, function (i, el) {

                        if (!revdet[el.ReqId]) {
                            revdet[el.ReqId] = true;
                            rev.push(el);
                        }
                    });

                    if (GTrfId > 0) {
                        $('#ddlReqno').empty();
                        $.each(rev, function () {
                            $('#ddlReqno').append($('<option></option>').val(this.ReqId).text(this.ReqNo));
                        });
                    } else {

                        $('#ddlReqno').empty();
                        $('#ddlReqno').append($('<option/>').val('0').text('--Select Req No--'));
                        $.each(rev, function () {
                            $('#ddlReqno').append($('<option></option>').val(this.ReqId).text(this.ReqNo));
                        });
                    }
                }
            });
    } else {
        $('#ddlReqno').empty();
    }
    
}