
var Mode = 0;
var StoAdId = 0;
var ordNoDDL = "#";
var ItemList = [];
var SuItemList = [];
var index = 0;
var Itemrowindex = -1;
var rowindex = -1;
var Userid = 0;
var UserName = 0;
var Guserid = 0;
var GCompid = 0;
var DCompid = 0;
var LoginUserid = '';
var editmasunitstore = 0;
var CompanyId = 0;
$(document).ready(function () {
    debugger;

    Guserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    DCompid = $("#hdnDCompid").data('value');
    var qrStr = window.location.search;
    var spQrStr = qrStr.substring(1);
    var arrQrStr = new Array();
    var arr = spQrStr.split('?');

    for (var i = 0; i < arr.length; i++) {
        var queryvalue = arr[i].split('=');
    }

    StoAdId = queryvalue[1];
    //POrderType = queryvalue[3];
    //SupplierId = queryvalue[9];
    //PurItemType = queryvalue[5];
    Mode = queryvalue[3];
    GCompid = queryvalue[5];
    //GrnMasId = queryvalue[11];




    ////////////////////////////////////////
    if (Mode == 0) {
        //LoadStockAuditItemDetails();
        LoadCompanyDDL("#ddlCompany");
        LoadSupplierDDL("#ddlSupplier");
        LoadBuyerDDL("#ddlBuyer");
        LoadItemDDL("#ddlItem");
        LoadItemGroupDDL("#ddlItemGrp");
      //  LoadStoreUnitDDL("#ddlStore");
        //   LoadOrdNoDDL("#ddlOrderNo");
        LoadOrdDropDetails();
        LoadProcess();
        //LoadDropDetails();
        //LoadSupplier();

        //GenerateNumber();

        //var ItmId = 0;
        //var ClrId = 0;
        //var SzId = 0;
        //var UomId = 0;
        //var Qty = 0;
        //LoadPOrderSaveDetails(PurOrdId, ItmId, ClrId, SzId, UomId, Qty);
        getDate();
        GenerateNumber();
        LoadEmployeeStoreunit();

        var OType = $('input[name="MOType"]:checked').attr('value');

        if (OType == "B") {

            $("#optB").prop("checked", true);
            $("#optS").prop("checked", false);
            $("#optG").prop("checked", false);

        } else if (OType == "G") {

            $("#optB").prop("checked", false);
            $("#optS").prop("checked", false);
            $("#optG").prop("checked", true);

            $('#ddlJoborder').val("");
            $('#ddlOrderNo').val("");
            $('#ddlRefNo').val("");
            $('#ddlStyle').val("");
            $('#ddlBuyer').val("");

            $("#ddlBuyer").prop("disabled", true);
            $("#ddlJoborder").prop("disabled", true);
            $("#ddlOrderNo").prop("disabled", true);
            $("#ddlRefNo").prop("disabled", true);
            $("#ddlStyle").prop("disabled", true);


        }

    }


    if (Mode == 1) {
        $('#Update').show();
        $('#Add').hide();
    } else if (Mode == 0) {
        $('#Add').show();
        $('#Update').hide();
    }
    else if (Mode == 2) {
        $('#Add').hide();
        $('#Update').hide();
        $('#Delete').show();
    }

    if (Mode == 1 || Mode == 2) {

        LoadPurAuditEditDetails(StoAdId);

    }
    $(document).on('keyup', '.calcAmt', function () {
        debugger;

        var table = $('#tblStockAuditdetails').DataTable();
        var SkId = table.row($(this).parents('tr')).data()["Stockid"];
        var IId = table.row($(this).parents('tr')).data()["DItemId"];
        var CId = table.row($(this).parents('tr')).data()["ColorId"];
        var SId = table.row($(this).parents('tr')).data()["SizeId"];
        var PUId = table.row($(this).parents('tr')).data()["uomid"];
        var StkQty = table.row($(this).parents('tr')).data()["StockQty"];
        var ExcessQty = table.row($(this).parents('tr')).data()["Excess_Qty"];
        var Val = $(this).val();

       

       
        var ShrQty = Val;
        //var res = ExQty * ERate;
        var TSAQty = parseFloat(StkQty) - parseFloat(ShrQty);


        if (ExcessQty > 0) {
            $.each(SuItemList, function () {
                if (this.Stockid == SkId && this.DItemId == IId && this.ColorId == CId && this.SizeId == SId && this.uomid == PUId) {
                    this.Shortage_Qty = 0;

                }
            });
            loadSkAuditItemTable(SuItemList);
        } else if (ExcessQty == 0) {

            $.each(SuItemList, function () {
                if (this.Stockid == SkId && this.DItemId == IId && this.ColorId == CId && this.SizeId == SId && this.uomid == PUId) {
                    this.ActQty = TSAQty;
                    this.Shortage_Qty = ShrQty;

                }
            });
            loadSkAuditItemTable(SuItemList);
        }

        var rows = $("#tblStockAuditdetails").dataTable().fnGetNodes();
        var dtTable = $('#tblStockAuditdetails').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 16 }).data()[0];
            $('input[id=txtSQty]').each(function () {
                if (sn == SkId && $(this).val() == Val) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtSQty').val();
                    row.find('#txtSQty').focus().val('').val(num);
                    return true;
                }
            });
        }

    });

    $(document).on('keyup', '.calcExce', function () {
        debugger;

        var table = $('#tblStockAuditdetails').DataTable();
        var SkId = table.row($(this).parents('tr')).data()["Stockid"];
        var IId = table.row($(this).parents('tr')).data()["DItemId"];
        var CId = table.row($(this).parents('tr')).data()["ColorId"];
        var SId = table.row($(this).parents('tr')).data()["SizeId"];
        var PUId = table.row($(this).parents('tr')).data()["uomid"];
        var StkQty = table.row($(this).parents('tr')).data()["StockQty"];
        var ShortQty = table.row($(this).parents('tr')).data()["Shortage_Qty"];
        var Val = $(this).val();
        var excessQty = Val;
        var TSAQty = parseFloat(StkQty) + parseFloat(excessQty);

        if (ShortQty > 0) {
            $.each(SuItemList, function () {
                if (this.Stockid == SkId && this.DItemId == IId && this.ColorId == CId && this.SizeId == SId && this.uomid == PUId) {
                    this.Excess_Qty = 0;

                }
            });
            loadSkAuditItemTable(SuItemList);
        } else if (ShortQty == 0) {

            $.each(SuItemList, function () {
                if (this.Stockid == SkId && this.DItemId == IId && this.ColorId == CId && this.SizeId == SId && this.uomid == PUId) {
                    this.ActQty = TSAQty;
                    this.Excess_Qty = excessQty;

                }
            });
            loadSkAuditItemTable(SuItemList);
        }
        var rows = $("#tblStockAuditdetails").dataTable().fnGetNodes();
        var dtTable = $('#tblStockAuditdetails').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 16 }).data()[0];
            $('input[id=txtExQty]').each(function () {
                if (sn == SkId && $(this).val() == Val) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtExQty').val();
                    row.find('#txtExQty').focus().val('').val(num);
                    return true;
                }
            });
        }

    });
});


function LoadPurAuditEditDetails(StoAdId) {
    LoadCompanyDDL("#ddlCompany");
    LoadSupplierDDL("#ddlSupplier");
    LoadBuyerDDL("#ddlBuyer");
    LoadItemDDL("#ddlItem");
    LoadItemGroupDDL("#ddlItemGrp");
   // LoadStoreUnitDDL("#ddlStore");
    LoadOrderNoDDL("#ddlOrderNo");
    LoadRefNoDDL("#ddlRefNo");
    LoadStyleDDL("#ddlStyle");
    LoadJobNoDDL("#ddlJoborder");
    LoadProcessDDL("#ddlProcess");

    $.ajax({
        url: "/StockAuditEntry/GetAuditEditDetails",
        data: JSON.stringify({ Audit_MasId: StoAdId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            debugger;
            if (obj != undefined) {
            
                $('#txtEntryDate').val(moment(obj.Entry_Date).format('DD/MM/YYYY'));
                $('#txtEntryNo').val(obj[0]["Entry_No"]);
                $('#txtEntryId').val(obj[0]["Audit_MasId"]);
                $('#ddlCompany').val(obj[0]["Companyid"]);
              

                var OType = obj[0]["General"];
                var SType = obj[0]["StockType"];

                if (OType == false) {


                    $("#optB").prop("checked", true);
                    $("#optS").prop("checked", false);
                    $("#optG").prop("checked", false);

                } else if (OType == true) {

                    $("#optB").prop("checked", false);
                    $("#optS").prop("checked", false);
                    $("#optG").prop("checked", true);

                    $('#ddlJoborder').val("");
                    $('#ddlOrderNo').val("");
                    $('#ddlRefNo').val("");
                    $('#ddlStyle').val("");
                    $('#ddlBuyer').val("");

                    $("#ddlBuyer").prop("disabled", true);
                    $("#ddlJoborder").prop("disabled", true);
                    $("#ddlOrderNo").prop("disabled", true);
                    $("#ddlRefNo").prop("disabled", true);
                    $("#ddlStyle").prop("disabled", true);
                 

                }
                editmasunitstore = obj[0]["desunitid"];
                LoadEmployeeStoreunit();

                LoadStockAuditEditItemDetails();
            }
            else {

            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
$(document).ready(function () {
    $("#tblStockAuditdetails ").dataTable().find("tbody").on('click', 'tr', function () {
        index = (this.rowIndex) - 1;
    });
});

//function LoadEntryNo() {
//    GenerateNumber();
//}
function getDate() {
    debugger;
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

    $('#txtEntryDate').val(date);
    $('#txtEntryDate').val(Fdatestring);


}

function LoadorderNo() {
    GenerateNumber();
    LoadEmployeeStoreunit();
}

var table, column, compId, Docum;

function GenerateNumber(table, column, compId, Docum) {

    debugger;

   // var CompId = $("#ddlCompany").val();
     table = "Stock_Audit_mas",
     column = "Entry_No",
    // compId = GCompid,
     Docum = 'STOCK AUDIT',
      compId = $('#ddlCompany').val();

     if (compId == null) {
         compId = DCompid;
     } else {
         compId = $('#ddlCompany').val();
     }
     GCompid = compId;

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

//function LoadOrdNoDDL(OrdNoDDL) {
//    ordNoDDL = OrdNoDDL;
//    httpGet("/BulkOrder/GetOrderNo", onOrdNoSuccess, onOrdNoFailure);
//}
//function onOrdNoSuccess(result) {
//    if (result.Status == "SUCCESS") {
//        var data = result.Value;
//        $(ddlOrderNo).empty();
//        $(ddlOrderNo).append($('<option/>').val('0').text('--Select OrdNo--'));
//        $.each(data, function () {
//            //$(ddlOrderNo).append($('<option></option>').text(this.Order_No));
//            $(ddlOrderNo).append($('<option></option>').val(this.BMasId).text(this.Order_No));
//        });
//    }
//    else {
//        alert('OrderNo loading failed');
//    }
//}

//function onOrdNoFailure(result) {
//    alert('OrderNo loading failed');
//}


function LoadDropDetails() {


    var BMasId = $('#ddlOrderNo').val();
    var JbId = $('#ddlJoborder').val();
    var StyId = $('#ddlStyle').val();
    var RefNo = "";
    var RNo = $('select#ddlRefNo option:selected').val();

    if (RNo == 0) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlRefNo option:selected').val();
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



                //workNo
                $(ddlJoborder).empty();
                $(ddlJoborder).append($('<option/>').val('0').text('--Select JobNo--'));
                $.each(data, function () {
                    $(ddlJoborder).append($('<option></option>').val(this.JobId).text(this.Job_Ord_no));
                });
                //Style
                $(ddlStyle).empty();
                $(ddlStyle).append($('<option/>').val('0').text('--Select Style--'));
                $.each(data, function () {
                    $(ddlStyle).append($('<option></option>').val(this.Styleid).text(this.Style));
                });

                //RefNo
                $(ddlRefNo).empty();
                $(ddlRefNo).append($('<option/>').val('0').text('--Select RefNo--'));
                $.each(data, function () {
                    $(ddlRefNo).append($('<option></option>').text(this.RefNo));
                });
            }

        }

    });

}


function LoadOrdDropDetails() {


    var BMasId = $('#ddlOrderNo').val();
    var JbId = $('#ddlJoborder').val();
    var StyId = $('#ddlStyle').val();
    var RefNo = "";
    var RNo = $('select#ddlRefNo option:selected').val();

    if (RNo == 0) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlRefNo option:selected').val();
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


                //OrdNo
                $(ddlOrderNo).empty();
                $(ddlOrderNo).append($('<option/>').val('0').text('--Select OrdNo--'));
                $.each(data, function () {
                    $(ddlOrderNo).append($('<option></option>').val(this.BMasId).text(this.Buy_Ord_no));
                });
            }



            LoadDropDetails();
        }

    });

}

function LoadProcess() {

    $.ajax({
        url: "/StockAuditEntry/GetProcessNo",
        data: JSON.stringify({}),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;


                //Process
                $(ddlProcess).empty();
                $(ddlProcess).append($('<option/>').val('0').text('--Select Process--'));
                $.each(data, function () {
                    $(ddlProcess).append($('<option></option>').val(this.ProcessId).text(this.Process));
                });
            }

            LoadDropDetails();
        }

    });
}

function Close() {

    window.location.href = "/StockAuditMain/StockAuditMainIndex";
}

function LoadStockAuditItemDetails() {
    debugger;

    var OrdNo = $('select#ddlOrderNo option:selected').val();

    if (OrdNo == 0) {
        //alert("Please Select Order No..");
        var msg = 'Please Select Order Number...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    var RefNo = $('select#ddlRefNo option:selected').val();

    if (RefNo == 0) {
        //alert("Please Select Ref No..");
        var msg = 'Please Select Refer Number...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    var CompId = $('#ddlCompany').val();
    var SupId = $('#ddlSupplier').val();
    var BuyId = $('#ddlBuyer').val();
    var ProcId = $('#ddlProcess').val();
    var ImId = $('#ddlItem').val();
    var JbId = $('#ddlJoborder').val();
    var StyId = $('#ddlStyle').val();
    var IgId = $('#ddlItemGrp').val();
    var StoreId = $('#ddlStore').val();
    var OType = $('input[name="MOType"]:checked').attr('value');
    var SType = $('input[name="SType"]:checked').attr('value');

    var OrdNo = "";
    var ONo = $('select#ddlOrderNo option:selected').val();

    if (ONo == 0) {
        OrdNo == "";
    }
    else {

        OrdNo = $('select#ddlOrderNo option:selected').val();
    }

    var RefNo = "";
    var RNo = $('select#ddlRefNo option:selected').val();

    if (RNo == 0) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlRefNo option:selected').val();
    }

    var JobNo = "";
    var JbNo = $('select#ddlJoborder option:selected').val();

    if (JbNo == 0) {
        JobNo == "";
    }
    else {

        JobNo = $('select#ddlJoborder option:selected').val();
    }


    var SuppType = "";
    var STpe = $('select#ddlSupType option:selected').val();

    if (STpe == 0) {
        SuppType == "";
    }
    else {

        SuppType = $('select#ddlSupType option:selected').val();
    }

    $.ajax({
        url: "/StockAuditEntry/LoadStockAuditItemDetails",
        data: JSON.stringify({ Companyid: CompId, OType: OType, StockType: SType, SupType: SuppType, Itemid: ImId, item_Groupid: IgId, buyerid: BuyId, Supplierid: SupId, StoreId: StoreId, Buy_Ord_no: OrdNo, RefNo: RefNo, Job_Ord_no: JobNo, Styleid: StyId, ProcessId: ProcId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            SuItemList = result;
            loadSkAuditItemTable(SuItemList);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function loadSkAuditItemTable(list) {

    $('#tblStockAuditdetails').DataTable().destroy();
    debugger;

    var table = $('#tblStockAuditdetails').DataTable({
        "order": [[1, "asc"]],
        data: list,
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

             { title: "AuditDetId", data: "Audit_Detid", "visible": false },
            { title: "AuditMasid", data: "AuditMasid", "visible": false },
            { title: "Type", data: "Type" },
            { title: "Item", data: "DItem" },
            { title: "Color", data: "Color" },
            { title: "Size", data: "Size" },
            { title: "Pur Unit", data: "PUnit" },
            { title: "Lot No", data: "LotNo" },
            { title: "Stock Qty", data: "StockQty" },
            {
                title: "Shortage", data: "Shortage_Qty",
                render: function (data) {

                    return '<input type="text" id="txtSQty" class="calcAmt form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                },
            },

            {
                title: "Excess Qty", data: "Excess_Qty",
                render: function (data) {

                    return '<input type="text" id="txtExQty" class="calcExce form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                },
            },

             { title: "Active Qty", data: "ActQty" },

             { title: "ItemId", data: "DItemId", "visible": false },
             { title: "ColorId", data: "ColorId", "visible": false },
             { title: "SizeId", data: "SizeId", "visible": false },
             { title: "PUnitId", data: "uomid", "visible": false },
             { title: "StockId", data: "Stockid", "visible": false },
               { title: "SupplierId", data: "DSupplierId", "visible": false },
                { title: "Alloted", data: "Alloted" },
                 { title: "Supplier", data: "DSupplier" },
                 //{
                 //    title: "ACTION", "mDataProp": null,
                 //    "sDefaultContent": '<div style="display:inline-flex;"><button type="button" data-toggle="tooltip" data-placement="top" title="View Item" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnItemview btn btn-round btn-info"> <i class="fa fa-eye"></i> </button></div>'
                 //},
        ]
    });


    //var totalamnt = 0;
    //for (var e = 0; e < ItemList.length; e++) {
    //    var amount = ItemList[e].received_qty;
    //    totalamnt = totalamnt + parseFloat(amount);

    //}
    //$('#txttotal').val(totalamnt);

    var table = $('#tblStockAuditdetails').DataTable();
    $("#tblStockAuditdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblStockAuditdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });

}

function calcAmt(Val) {
    debugger;

    index;

    var currentrowoftcpi = SuItemList.slice(index);

    var SkId = currentrowoftcpi[0].Stockid;   
    var IId = currentrowoftcpi[0].DItemId;
    var CId = currentrowoftcpi[0].ColorId;
    var SId = currentrowoftcpi[0].SizeId;
    var PUId = currentrowoftcpi[0].uomid;
    var StkQty = currentrowoftcpi[0].StockQty;
    var ExcessQty = currentrowoftcpi[0].Excess_Qty;

    //var ExQty = currentrowoftcpi[0].Shortage_Qty;
    //var Amt = currentrowoftcpi[0].Amt;

    var ShrQty = Val;
    //var res = ExQty * ERate;
    var TSAQty = parseFloat(StkQty) - parseFloat(ShrQty);

    
        //finalresult = res.toFixed(2);
    //$.each(SuItemList, function () {
    //    if (this.Stockid == SkId && this.DItemId == IId && this.ColorId == CId && this.SizeId == SId && this.uomid == PUId) {
    //        this.ActQty = TSAQty;
    //        this.Shortage_Qty = ShrQty;

    //}
    //});



    // loadSkAuditItemTable(SuItemList);



    if (ExcessQty > 0) {
        $.each(SuItemList, function () {
            if (this.Stockid == SkId && this.DItemId == IId && this.ColorId == CId && this.SizeId == SId && this.uomid == PUId) {
                this.Shortage_Qty = 0;

            }
        });
        loadSkAuditItemTable(SuItemList);
    } else if (ExcessQty == 0) {

        $.each(SuItemList, function () {
            if (this.Stockid == SkId && this.DItemId == IId && this.ColorId == CId && this.SizeId == SId && this.uomid == PUId) {
                this.ActQty = TSAQty;
                this.Shortage_Qty = ShrQty;

        }
        });
        loadSkAuditItemTable(SuItemList);
    }


}

function calcExce(Val) {
    debugger;

    index;

    var currentrowoftcpi = SuItemList.slice(index);

    var SkId = currentrowoftcpi[0].Stockid;
    var IId = currentrowoftcpi[0].DItemId;
    var CId = currentrowoftcpi[0].ColorId;
    var SId = currentrowoftcpi[0].SizeId;
    var PUId = currentrowoftcpi[0].uomid;
    var StkQty = currentrowoftcpi[0].StockQty;
    var ShortQty = currentrowoftcpi[0].Shortage_Qty;


    var excessQty = Val;
    var TSAQty = parseFloat(StkQty) + parseFloat(excessQty);

    if (ShortQty > 0)
    {
        $.each(SuItemList, function () {
            if (this.Stockid == SkId && this.DItemId == IId && this.ColorId == CId && this.SizeId == SId && this.uomid == PUId) {              
                this.Excess_Qty = 0;

            }
        });
        loadSkAuditItemTable(SuItemList);
    }else if (ShortQty == 0){
        
        $.each(SuItemList, function () {
            if (this.Stockid == SkId && this.DItemId == IId && this.ColorId == CId && this.SizeId == SId && this.uomid == PUId) {
                this.ActQty = TSAQty;
                this.Excess_Qty = excessQty;

            }
        });
        loadSkAuditItemTable(SuItemList);
    }


   
}


function SMainList() {

 
    $('#tblStockAuditdetails').DataTable().destroy();
    LoadStockAuditItemDetails();
}

function BMainList() {
    var OType = $('input[name="MOType"]:checked').attr('value');

    if (OType == "B") {

        $("#optB").prop("checked", true);
        $("#optS").prop("checked", false);
        $("#optG").prop("checked", false);

        $("#ddlBuyer").prop("disabled", false);
        $("#ddlJoborder").prop("disabled", false);
        $("#ddlOrderNo").prop("disabled", false);
        $("#ddlRefNo").prop("disabled", false);
        $("#ddlStyle").prop("disabled", false);
        LoadOrdDropDetails();
        LoadProcess();
        LoadBuyerDDL("#ddlBuyer");
    } else if (OType == "G") {

        $("#optB").prop("checked", false);
        $("#optS").prop("checked", false);
        $("#optG").prop("checked", true);

        $('#ddlJoborder').val("");
        $('#ddlOrderNo').val("");
        $('#ddlRefNo').val("");
        $('#ddlStyle').val("");
        $('#ddlBuyer').val("");

        $("#ddlBuyer").prop("disabled", true);
        $("#ddlJoborder").prop("disabled", true);
        $("#ddlOrderNo").prop("disabled", true);
        $("#ddlRefNo").prop("disabled", true);
        $("#ddlStyle").prop("disabled", true);


    }
    $('#tblStockAuditdetails').DataTable().destroy();
    LoadStockAuditItemDetails();
}
function SMainList() {
    $('#tblStockAuditdetails').DataTable().destroy();
    LoadStockAuditItemDetails();

}
function GMainList() {
    var OType = $('input[name="MOType"]:checked').attr('value');

    if (OType == "B") {

        $("#optB").prop("checked", true);
        $("#optS").prop("checked", false);
        $("#optG").prop("checked", false);

    } else if (OType == "G") {

        $("#optB").prop("checked", false);
        $("#optS").prop("checked", false);
        $("#optG").prop("checked", true);

        $('#ddlJoborder').val("");
        $('#ddlOrderNo').val("");
        $('#ddlRefNo').val("");
        $('#ddlStyle').val("");
        $('#ddlBuyer').val("");

        $("#ddlBuyer").prop("disabled", true);
        $("#ddlJoborder").prop("disabled", true);
        $("#ddlOrderNo").prop("disabled", true);
        $("#ddlRefNo").prop("disabled", true);
        $("#ddlStyle").prop("disabled", true);

    }
    $('#tblStockAuditdetails').DataTable().destroy();
    LoadStockAuditItemDetails();
}

function save() {

    debugger;

    var res = validate();
    if (res == false) {
        return false;
    }


    if (SuItemList.length == 0) {
        //alert("Please Enter the Item Details..");
        var msg = 'Please Enter the Item Details...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }


    var OType = $('input[name="MOType"]:checked').attr('value');
   
    var OrdNo = "";
    var ONo = $('select#ddlOrderNo option:selected').val();

    if (ONo == 0) {
        OrdNo == "";
    }
    else {

        OrdNo = $('select#ddlOrderNo option:selected').val();
    }

    var RefNo = "";
    var RNo = $('select#ddlRefNo option:selected').val();

    if (RNo == 0) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlRefNo option:selected').val();
    }

    var JobNo = "";
    var JbNo = $('select#ddlJoborder option:selected').val();

    if (JbNo == 0) {
        JobNo == "";
    }
    else {

        JobNo = $('select#ddlJoborder option:selected').val();
    }
    debugger;
    table = "Stock_Audit_mas",
    column = "Entry_No",
    Docum = 'STOCK AUDIT',
    compId = $('#ddlCompany').val();

    if (compId == null) {
        compId = DCompid;
    } else {
        compId = $('#ddlCompany').val();
    }
    GCompid = compId;

    var oldEntryNo = $('#txtEntryNo').val();
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

                Companyid: $('#ddlCompany').val(),
                Entry_No: $('#txtEntryNo').val(),
                Entry_Date: $('#txtEntryDate').val(),//new Date($('#txtEntryDate').val()),
                Supplierid: $('#ddlSupplier').val(),
                buyerid: $('#ddlBuyer').val(),
                item_Groupid: $('#ddlItemGrp').val(),
                Styleid: $('#ddlStyle').val(),
                Remarks: $('#txtremark').val(),
                CreatedBy: Guserid,
                General: OType,
                Buy_Ord_no: OrdNo,
                Job_Ord_no: JobNo,
                StockAdDet: SuItemList

            };
            debugger;
            $("#Add").attr("disabled", true);
            LoadingSymb();
            $.ajax({
                url: "/StockAuditEntry/Add",
                data: JSON.stringify(objPurSubmit),
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {
                    if (result.Value == true) {
                        AddUserEntryLog('Procurement', 'Stock Ausit & Adjustment', 'ADD', $("#txtEntryNo").val());
                        //alert("Data Saved Sucessfully");
                        //window.location.href = "/StockAuditMain/StockAuditMainIndex";
                        var msg = 'Data Saved Sucessfully...';
                        var flg = 1;
                        var mod = 0;
                        var url = "/StockAuditMain/StockAuditMainIndex";
                        AlartMessage(msg, flg, mod, url);
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

    if ($('#ddlCompany').val() == 0) {
        $('#ddlCompany').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlCompany').css('border-color', 'lightgrey');
    }
    
    
    return isValid;
}

function LoadStockAuditEditItemDetails() {
    debugger;




    $.ajax({
        url: "/StockAuditEntry/LoadAudEdititemDetails",
        data: JSON.stringify({ Audit_MasId: StoAdId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            SuItemList = result;
            loadSkAuditEditItemTable(SuItemList);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function loadSkAuditEditItemTable(list) {

    $('#tblStockAuditdetails').DataTable().destroy();
    debugger;

    var table = $('#tblStockAuditdetails').DataTable({
        "order": [[1, "asc"]],
        data: list,
        //scrollY: 100,
        //scrollCollapse: true,
        //paging: false,
        //fixedColumns: false,
        //select: false,
        //scrollX: "100%",
        //scrollXInner: "100%",
        //scroller: false,
        //"bSort": false,
        columns: [

             { title: "AuditDetId", data: "Audit_Detid", "visible": false },
            { title: "AuditMasid", data: "AuditMasid", "visible": false },
            { title: "Type", data: "Type" },
            { title: "Item", data: "DItem" },
            { title: "Color", data: "Color" },
            { title: "Size", data: "Size" },
            { title: "Pur Unit", data: "PUnit" },
            { title: "Lot No", data: "LotNo" },
            { title: "Stock Qty", data: "StockQty" },
            {
                title: "Shortage", data: "Shortage_Qty",
                render: function (data) {

                    return '<input type="text" id="txtSQty" class="calcAmt form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                },
            },

            {
                title: "Excess Qty", data: "Excess_Qty",
                render: function (data) {

                    return '<input type="text" id="txtExQty" class="calcExce form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';

                },
            },

             { title: "Active Qty", data: "ActQty" },

             { title: "ItemId", data: "DItemId", "visible": false },
             { title: "ColorId", data: "ColorId", "visible": false },
             { title: "SizeId", data: "SizeId", "visible": false },
             { title: "PUnitId", data: "uomid", "visible": false },
             { title: "StockId", data: "Stockid", "visible": false },
               { title: "SupplierId", data: "DSupplierId", "visible": false },
                { title: "Alloted", data: "Alloted" },
                 { title: "Supplier", data: "DSupplier" },
                
        ]
    });




    var table = $('#tblStockAuditdetails').DataTable();
    $("#tblStockAuditdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblStockAuditdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });

}

function Update() {

    debugger;

    debugger;

    var res = validate();
    if (res == false) {
        return false;
    }


    if (SuItemList.length == 0) {
        //alert("Please Enter the Item Details..");
        var msg = 'Please Enter the Item Details...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }


    var OType = $('input[name="MOType"]:checked').attr('value');

    var OrdNo = "";
    var ONo = $('select#ddlOrderNo option:selected').val();

    if (ONo == 0) {
        OrdNo == "";
    }
    else {

        OrdNo = $('select#ddlOrderNo option:selected').val();
    }

    var RefNo = "";
    var RNo = $('select#ddlRefNo option:selected').val();

    if (RNo == 0) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlRefNo option:selected').val();
    }

    var JobNo = "";
    var JbNo = $('select#ddlJoborder option:selected').val();

    if (JbNo == 0) {
        JobNo == "";
    }
    else {

        JobNo = $('select#ddlJoborder option:selected').val();
    }

    var objPurSubmit = {

        Companyid: $('#ddlCompany').val(),
        Entry_No: $('#txtEntryNo').val(),
        Entry_Date: $('#txtEntryDate').val(),//new Date($('#txtEntryDate').val()),
        Supplierid: $('#ddlSupplier').val(),
        buyerid: $('#ddlBuyer').val(),
        item_Groupid: $('#ddlItemGrp').val(),
        Styleid: $('#ddlStyle').val(),
        Remarks: $('#txtremark').val(),
        CreatedBy: Guserid,
        General: OType,
        Buy_Ord_no: OrdNo,
        Job_Ord_no: JobNo,
        StockAdDet: SuItemList

    };
    debugger;
    $("#Update").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/StockAuditEntry/Update",
        data: JSON.stringify(objPurSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == true) {
                AddUserEntryLog('Procurement', 'Stock Ausit & Adjustment', 'UPDATE', $("#txtEntryNo").val());
                //alert("Data Updated Sucessfully");
                //window.location.href = "/StockAuditMain/StockAuditMainIndex";
                var msg = 'Data Updated Sucessfully...';
                var flg = 1;
                var mod = 0;
                var url = "/StockAuditMain/StockAuditMainIndex";
                AlartMessage(msg, flg, mod, url);
            } else {

                window.location.href = "/Error/Index";

            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function Delete() {
    debugger;


    var objConPurDelete = {

        Entry_No: $('#txtEntryNo').val()
    };
    $("#Delete").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/StockAuditEntry/Delete",
        data: JSON.stringify(objConPurDelete),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            //alert("Data Deleted Sucessfully");
            //window.location.href = "/StockAuditMain/StockAuditMainIndex";

            if (result.Value == true) {
                AddUserEntryLog('Procurement', 'Stock Ausit & Adjustment', 'DELETE', $("#txtEntryNo").val());
                //alert("Data Deleted Sucessfully");
                //window.location.href = "/StockAuditMain/StockAuditMainIndex";
                var msg = 'Data Deleted Sucessfully...';
                var flg = 2;
                var mod = 0;
                var url = "/StockAuditMain/StockAuditMainIndex";
                AlartMessage(msg, flg, mod, url);
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

function LoadEmployeeStoreunit() {
    debugger;
    if (UserName == 'superuser') {
        LoginUserid = 0;
    }

    $.ajax({
        url: "/StoreSetup/GetStoreRights",
        data: JSON.stringify({ Userid: LoginUserid, Storetype: 'M', Companyid: GCompid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var data = result.Value;
            $(ddlStore).empty();
            $(ddlStore).append($('<option/>').val('0').text('--Select Store--'));
            $.each(data, function () {
                $(ddlStore).append($('<option></option>').val(this.Storeid).text(this.StoreName));
            });
            $(ddlStore).trigger("select2:updated");
            if (editmasunitstore > 0) {
                $('#ddlStore').val(editmasunitstore).trigger('change');
            }
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });



}