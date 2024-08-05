
var ItemList = [];
var AcomId = 0;
var EItemList = [];
var GIssId = 0;
var Itemrowindex = -1;
var rowindex = -1;
var index = 0;
var GRetId = 0;
var Userid = 0;
var UserName = 0;
var MainFDate = 0;
var Guserid = 0;
var DCompid = 0;

var ChkRefno = true;
var ChkOrdno = true;
var DtChk = false;
var ChkSupplier = true;
var ChkRetNo = true;
var ChkComp = false;
var ChkRef = true;
var LoginUserid = '';
var editmasunitstore = 0;
var CompanyId = 0;
var CItemList = [];
$(document).ready(function () {
    debugger;

    Guserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    DCompid = $("#hdnDCompid").data('value');
    LoginUserid = $("#hdnLoginUserid").data('value');
    LoadCompanyDDL("#ddlACompany,#ddlMCompany");
   // LoadStoreUnitDDL("#ddlAStore");
    LoadSupplierDDL("#ddlASupp");
    //LoadCompanyUnitDDL("#ddlAUnit");

    //
    MainFDate = $("#hdMainFromDate").data('value');
    getDate();

    //Main
    //ListOrderRefNo();
    //ListReference();
    //ListRetNo();
    //ListUnitSup();
    LoadMainGrid();
    //

    var radioValue = $("input[name='DType']:checked").val();
    if (radioValue == "F") {

        LoadCompanyUnitDDL("#ddlLoc,#ddlAUnit");
    }
    $(document).on('keyup', '#txtTQty', function () {
        debugger;
        var table = $('#tblDelRetEntrygrid').DataTable();
        var Bal = table.row($(this).parents('tr')).data()["BalQty"];
        var IssStkId = table.row($(this).parents('tr')).data()["IssueStockID"];
        var Val = $(this).val();
        if (Bal < Val) {
            Val = 0; 
        }
        $.each(EItemList, function () {
            if (this.IssueStockID == IssStkId) {
                this.ReturnQty = Val;
            }
        });
        var table = $('#tblDelRetEntrygrid').DataTable();
        var data = table.rows().data();

        $('input[id=txtTQty]').each(function (ig) {
            if (data[ig].IssueStockID == IssStkId) {
                var row = $(this).closest('tr');
                row.find('#txtTQty').val(Val);

            }
        });
    });
    //$(document).on('keyup', '.calcQty', function () {
    //    debugger;

    //    var table = $('#tblDelRetEntrygrid').DataTable();
        
    //    var IssSTkId = table.row($(this).parents('tr')).data()["IssueStockID"];
    //    var STkId = table.row($(this).parents('tr')).data()["Stockid"];
    //    var IId = table.row($(this).parents('tr')).data()["Itemid"];
    //    var CId = table.row($(this).parents('tr')).data()["Colorid"];
    //    var SId = table.row($(this).parents('tr')).data()["Sizeid"];
    //    var PUId = table.row($(this).parents('tr')).data()["UomId"];
    //    var IssId = table.row($(this).parents('tr')).data()["IssId"];
    //    var Val = $(this).val();  
    //    var TQty = Val;
    //    $.each(EItemList, function () {
    //        if (this.Stockid == STkId && this.IssueStockID == IssSTkId && this.Itemid == IId && this.Colorid == CId && this.Sizeid == SId && this.UomId == PUId && this.IssId == IssId) {
    //            this.ReturnQty = TQty;
    //        }
    //    });
    //  //  loadDelRetItemTable(EItemList);
    //    var table = $('#tblDelRetEntrygrid').DataTable();
    //    var ecdata = table.rows().data();

    //    $('input[id=txtTQty]').each(function (ig) {          
    //        var row = $(this).closest('tr');
    //        for (var h = 0; h < EItemList.length; h++) {
    //            debugger;
    //            if (ecdata[ig].Stockid == EItemList[h].Stockid && ecdata[ig].IssueStockID == EItemList[h].IssueStockID && ecdata[ig].Itemid == EItemList[h].Itemid && ecdata[ig].Colorid == EItemList[h].Colorid && ecdata[ig].Sizeid == EItemList[h].Sizeid && ecdata[ig].UomId == EItemList[h].UomId && ecdata[ig].IssId == EItemList[h].IssId) {
    //                var ReturnQty = EItemList[h].ReturnQty;
    //                row.find('#txtTQty').val(ReturnQty);

    //            }
    //        }

    //    });
    //    var rows = $("#tblDelRetEntrygrid").dataTable().fnGetNodes();
    //    var dtTable = $('#tblDelRetEntrygrid').DataTable();
    //    for (var i = 0; i < rows.length; i++) {
    //        var sn = dtTable.cells({ row: i, column: 17 }).data()[0];
    //        $('input[id=txtTQty]').each(function () {
    //            if (sn == STkId && $(this).val() == Val) {
    //                var row = $(this).closest('tr');
    //                var num = row.find('#txtTQty').val();
    //                row.find('#txtTQty').focus().val('').val(num);
    //                return true;
    //            }
    //        });
    //    }
    //});
    $(document).on('keyup', '.AcccalcQty', function () {
        debugger;

        var table = $('#tblDelRetEntrygrid').DataTable();
        var STkId = table.row($(this).parents('tr')).data()["Stockid"];
        var IId = table.row($(this).parents('tr')).data()["Itemid"];
        var CId = table.row($(this).parents('tr')).data()["Colorid"];
        var SId = table.row($(this).parents('tr')).data()["Sizeid"];
        var PUId = table.row($(this).parents('tr')).data()["UomId"];
        var IssId = table.row($(this).parents('tr')).data()["IssId"];
        var Val = $(this).val();       

        var AcQty = Val;

        $.each(EItemList, function () {
            if (this.Stockid == STkId && this.Itemid == IId && this.Colorid == CId && this.Sizeid == SId && this.UomId == PUId && this.IssId == IssId) {
                this.AcceptedQty = AcQty;
            }
        });
        loadDelRetItemTable(EItemList);
        
        var rows = $("#tblDelRetEntrygrid").dataTable().fnGetNodes();
        var dtTable = $('#tblDelRetEntrygrid').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 17 }).data()[0];
            $('input[id=txtAccQty]').each(function () {
                if (sn == STkId && $(this).val() == Val) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtAccQty').val();
                    row.find('#txtAccQty').focus().val('').val(num);
                    return true;
                }
            });
        }
    });
});


$(document).ready(function () {
    $("#tblDelRetEntrygrid ").dataTable().find("tbody").on('click', 'tr', function () {
        index = (this.rowIndex) - 1;
    });
});

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

    $('#txtDate').val(Fdatestring);
    $('#txtFromDate').val(MainFDate);
    $('#txtToDate').val(Fdatestring);

}
function ClearTextbox() {


    ListAddOrderRefNo();
    ListAddIssNo();
    LoadStorefromcompany();
}




function ListAddOrderRefNo() {

    var AoType = $('input[name="AOType"]:checked').attr('value');
    var AIType = $('input[name="APType"]:checked').attr('value');
    var ApuType = $('input[name="APUnit"]:checked').attr('value');
    var CompId = $('#ddlACompany').val();
    var IssId = $('#ddlAIssueNo').val();


    if (ApuType == "F") {
        var UnitId = $('#ddlAUnit').val();
    } else if (ApuType == "S") {
        var UnitId = $('#ddlASupp').val();
    } else if (ApuType == "T") {
        var UnitId = $('#ddlAStore').val();
    }



    if (AIType == "A") {
        var ITemType = "A";
    } else if (AIType == "Y") {
        var ITemType = "Y";
    } else if (AIType == "L") {
        var ITemType = "";
    }

    var OrdNo = "";
    var ONo = $('select#ddlAOrderNo option:selected').val();



    if (ONo == 0) {
        OrdNo == "";
    }
    else {

        OrdNo = $('select#ddlAOrderNo option:selected').val();
    }

    var RefNo = "";
    var RNo = $('select#ddlARefNo option:selected').val();

    if (RNo == 0) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlARefNo option:selected').val();
    }
    $.ajax({
        url: "/StoresDeliveryReturn/AGetOrdRefNo",
        data: JSON.stringify({ Desunitid: UnitId, OType: AoType, ItemType: ITemType, CompanyId: CompId, Issueid: IssId, Unit_Supplier_self: ApuType }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;

                $(ddlAOrderNo).empty();
                $(ddlARefNo).empty();

                $(ddlAOrderNo).append($('<option/>').val('0').text('--Select OrderNo--'));
                $.each(data, function () {
                    $(ddlAOrderNo).append($('<option></option>').val(this.BMasId).text(this.OrdNo));
                });
                //RefNo
                $(ddlARefNo).append($('<option/>').val('0').text('--Select RefNo--'));
                $.each(data, function () {
                    $(ddlARefNo).append($('<option></option>').text(this.RefNo));
                });


            }
        }

    });
}

function ListAddIssNo() {

    var AoType = $('input[name="AOType"]:checked').attr('value');
    var AIType = $('input[name="APType"]:checked').attr('value');
    var ApuType = $('input[name="APUnit"]:checked').attr('value');
    var CompId = $('#ddlACompany').val();
    // var IssId = $('#ddlAIssueNo').val();


    if (ApuType == "F") {
        var UnitId = $('#ddlAUnit').val();
    } else if (ApuType == "S") {
        var UnitId = $('#ddlASupp').val();
    } else if (ApuType == "T") {
        var UnitId = $('#ddlAStore').val();
    }


    if (AIType == "A") {
        var ITemType = "A";
    } else if (AIType == "Y") {
        var ITemType = "Y";
    } else if (AIType == "L") {
        var ITemType = "";
    }

    var OrdNo = "";
    var ONo = $('select#ddlAOrderNo option:selected').val();



    if (ONo == 0) {
        OrdNo == "";
    }
    else {

        OrdNo = $('select#ddlAOrderNo option:selected').val();
    }

    var RefNo = "";
    var RNo = $('select#ddlARefNo option:selected').val();

    if (RNo == 0) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlARefNo option:selected').val();
    }
    $.ajax({
        url: "/StoresDeliveryReturn/AGetIssNo",
        data: JSON.stringify({ Desunitid: UnitId, OType: AoType, ItemType: ITemType, CompanyId: CompId, Unit_Supplier_self: ApuType, OrdNo: OrdNo, RefNo: RefNo }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;

                $(ddlAIssueNo).empty();

                //IssNo
                $(ddlAIssueNo).append($('<option/>').val('0').text('--Select IssueNo--'));
                $.each(data, function () {
                    $(ddlAIssueNo).append($('<option></option>').val(this.Issueid).text(this.IssueNo));
                });


            }
        }

    });
}

function LoadRetAddDetails() {
    $('#tblDelRetAddgrid').DataTable().destroy();
    LoadRAddItemDetails();
}

function APunType() {
    $('#tblDelRetAddgrid').DataTable().destroy();
    LoadRAddItemDetails();
}
function RadioAPClick() {
    $('#tblDelRetAddgrid').DataTable().destroy();
    LoadRAddItemDetails();
}
function RadioOTClick() {
    $('#tblDelRetAddgrid').DataTable().destroy();
    LoadRAddItemDetails();
}
function LoadRAddItemDetails() {
    debugger;

    var AoType = $('input[name="AOType"]:checked').attr('value');
    var AIType = $('input[name="APType"]:checked').attr('value');
    var ApuType = $('input[name="APUnit"]:checked').attr('value');
    var CompId = $('#ddlACompany').val();
    var IssId = $('#ddlAIssueNo').val();


    if (ApuType == "F") {
        var UnitId = $('#ddlAUnit').val();
    } else if (ApuType == "S") {
        var UnitId = $('#ddlASupp').val();
    } else if (ApuType == "T") {
        var UnitId = $('#ddlAStore').val();
    }


    if (AIType == "A") {
        var ITemType = "A";
    } else if (AIType == "Y") {
        var ITemType = "Y";
    } else if (AIType == "L") {
        var ITemType = "";
    }

    var OrdNo = "";
    var ONo = $('select#ddlAOrderNo option:selected').val();



    if (ONo == 0) {
        OrdNo == "";
    }
    else {

        OrdNo = $('select#ddlAOrderNo option:selected').val();
    }

    var RefNo = "";
    var RNo = $('select#ddlARefNo option:selected').val();

    if (RNo == 0) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlARefNo option:selected').val();
    }

    $.ajax({
        url: "/StoresDeliveryReturn/LoadAddDelRetDetails",
        data: JSON.stringify({ Desunitid: UnitId, OType: AoType, ItemType: ITemType, CompanyId: CompId, Unit_Supplier_self: ApuType, OrdNo: OrdNo, RefNo: RefNo, Issueid: IssId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            ItemList = result;
            loadADItemTable(ItemList);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function loadADItemTable(ItemList) {

    $('#tblDelRetAddgrid').DataTable().destroy();
    debugger;

    $('#tblDelRetAddgrid').DataTable({
        // "order": [[8, "asc"]],
        data: ItemList,
        scrollY: 300,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        columns: [

            { title: "IssId", data: "Issueid", "visible": false },
            { title: "Unit", data: "Unit_Supplier_self" },
            {
                title: "Issue Date", data: "ReturnDate",
                render: function (data) {
                    return (moment(data).format("DD/MM/YYYY"));
                }
            },
            { title: "Issue No", data: "IssueNo" },
             { title: "Reference", data: "Reference" },
             {
                 title: "ACTION", "mDataProp": null,
                // "sDefaultContent": '<div style="display:inline-flex;"><button type="button" data-toggle="tooltip" data-placement="top" title="View Item" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnItemview btn btn-round btn-success"> <i class="fa fa-check"></i> </button></div>'

                 "sDefaultContent": '<button type="button"  type="button" data-toggle="tooltip" data-placement="top" title="Add" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnItemview btn btn-round btn-success"> <i class="fa fa-plus"></i> </button>'
             },
        ]
    });
}

$(document).on('click', '.btnItemview', function () {
    debugger;

    //rowindex = $(this).closest('tr').index();
    //var curentro1 = ItemList.slice(rowindex);
    //var IssId = curentro1[0]['Issueid'];

    var table = $('#tblDelRetAddgrid').DataTable();
    var Issueid = table.row($(this).parents('tr')).data()["Issueid"];

    LoadRetEntryDetails(Issueid);

});
var table, column, compId, Docum;

function GenerateNumber(table, column, compId, Docum) {

    debugger;


    table = "Stores_Issue_ReturnMas",
    column = "ReturnNo",
    compId = AcomId;
    Docum = 'STORES DELIVERY RETURN'


    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $('#txtreturnNo').val(result.Value);
        }
    });
}

function LoadRetEntryDetails(IssId) {

    GIssId = IssId;

    $.ajax({
        url: "/StoresDeliveryReturn/GetRetEntryDetails",
        data: JSON.stringify({ Issueid: IssId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            debugger;
            if (obj != undefined) {
                $('#txtCompany').val(obj[0]["Company"]);
                $('#txtUnit').val(obj[0]["Unit_Supplier_self"]);
                $('#txtIssueNo').val(obj[0]["IssueNo"]);
                $('#txtCompanyId').val(obj[0]["CompanyId"]);
                //StyleRowId = $("#txtStyleRowId").val();
                AcomId = $("#txtCompanyId").val();
                //alert(AcomId);
                GenerateNumber();
                LoadEntryDeliDetItemDetails(IssId);
                $('#myModal').modal('hide');
                $('#myModal1').modal('show');
                $('#Deletebtn').hide();
            }
            else {

            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function ClearRetAddData() {
    $('#ddlAPUnit').val('0');
    $('#ddlAOrderNo').val('0');
    $('#ddlARefNo').val('0');
    $('#ddlAStore').val('0');
    $('#ddlACompany').val('0');

    var tablesize = $('#tblDelRetAddgrid').DataTable();
    tablesize.clear().draw();
    window.location.reload();

}

function LoadEntryDeliDetItemDetails(IssId) {

    debugger;

    $.ajax({
        url: "/StoresDeliveryReturn/LoadStoresDeliItemDetails",
        data: JSON.stringify({ Issueid: IssId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            EItemList = result;
            CItemList = EItemList;
            loadDelRetItemTable(EItemList);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}
function loadDelRetItemTable(EItemList) {

    $('#tblDelRetEntrygrid').DataTable().destroy();
    debugger;

    var table = $('#tblDelRetEntrygrid').DataTable({
        "order": [[1, "asc"]],
        data: EItemList,
        scrollY: 300,
        scrollCollapse: true,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        columns: [


                { title: "ReturnDetid", data: "ReturnDetid", "visible": false },
                { title: "Returnid", data: "Returnid", "visible": false },
                { title: "Job Order", data: "Joborderno" },
                { title: "Item", data: "Item" },
                { title: "Color", data: "Color" },
                { title: "Size", data: "Size" },
                { title: "Issue Qty", data: "IssQty" },
                { title: "Balance Qty", data: "BalQty" },
                {
                    title: "Return Qty", data: "ReturnQty",
                    render: function (data) {

                        return '<input type="text" id="txtTQty" class="calcQty form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                    },
                },
                  {
                      title: "Accepted Qty", data: "AcceptedQty",
                      render: function (data) {

                          return '<input type="text" id="txtAccQty" class="AcccalcQty form-control"  style="width: 50px;text-align: center;" disabled value=' + data + '>';

                      },
                  },
               { title: "Uom", data: "Uom" },
               { title: "Sec Qty", data: "secqty" },
               { title: "Sec Uom", data: "SUom" },
               { title: "IssId", data: "IssId", "visible": false },
               { title: "ItemId", data: "Itemid", "visible": false },
               { title: "ColorId", data: "Colorid", "visible": false },
               { title: "SizeId", data: "Sizeid", "visible": false },
               { title: "StockId", data: "Stockid", "visible": false },
               //{ title: "NewStkAll", data: "ProcessId", "visible": false },
               { title: "RetIsDec", data: "ReIsDec", "visible": false },
               { title: "SecIsDec", data: "SecIsDec", "visible": false },
               { title: "IssStkId", data: "IssueStockID", "visible": false },
        ]
    });

    var table = $('#tblDelRetEntrygrid').DataTable();
    $("#tblDelRetEntrygrid tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblDelRetEntrygrid tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });

}

function calcQty(Val) {
    debugger;

    index;

    var currentrowoftcpi = EItemList.slice(index);


    var STkId = currentrowoftcpi[0].Stockid;
    var IId = currentrowoftcpi[0].Itemid;
    var CId = currentrowoftcpi[0].Colorid;
    var SId = currentrowoftcpi[0].Sizeid;
    var PUId = currentrowoftcpi[0].UomId;
    var IssId = currentrowoftcpi[0].IssId;


    var TQty = Val;


    $.each(EItemList, function () {
        if (this.Stockid == STkId && this.Itemid == IId && this.Colorid == CId && this.Sizeid == SId && this.UomId == PUId && this.IssId == IssId) {
            this.ReturnQty = TQty;


        }
    });



    loadDelRetItemTable(EItemList);
}
function AcccalcQty(Val) {
    debugger;

    index;

    var currentrowoftcpi = EItemList.slice(index);


    var STkId = currentrowoftcpi[0].Stockid;
    var IId = currentrowoftcpi[0].Itemid;
    var CId = currentrowoftcpi[0].Colorid;
    var SId = currentrowoftcpi[0].Sizeid;
    var PUId = currentrowoftcpi[0].UomId;
    var IssId = currentrowoftcpi[0].IssId;


    var AcQty = Val;


    $.each(EItemList, function () {
        if (this.Stockid == STkId && this.Itemid == IId && this.Colorid == CId && this.Sizeid == SId && this.UomId == PUId && this.IssId == IssId) {
            this.AcceptedQty = AcQty;


        }
    });



    loadDelRetItemTable(EItemList);
}

function validate() {
    var isValid = true;


    if ($('#txtreturnNo').val() == "") {
        $('#txtreturnNo').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtreturnNo').css('border-color', 'lightgrey');
    }

    return isValid;
}


function LoadLocation() {
    var LocalType = $('input[name="DType"]:checked').attr('value');


    $('#txtLocAdd').val('');

    if (LocalType == "U") {
        //LoadCompanyUnitDDL("#ddlLoc");
        LoadCompanyUnitDDL("#ddlLoc,#ddlBPUnit");
    } else if (LocalType == "F") {
        //LoadCompanyUnitDDL("#ddlLoc");
        LoadCompanyUnitDDL("#ddlLoc,#ddlBPUnit");
    } else if (LocalType == "S") {
        // LoadStoreUnitDDL("#ddlLoc");
        LoadEmployeeStoreunit();

    } else if (LocalType == "T") {
        LoadSupplierDDL("#ddlLoc");
    }
}

function LoadLocationEdit() {
    var LocalType = $('input[name="DType"]:checked').attr('value');
    $('#txtLocAdd').val('');
    if (LocalType == "U") {
        LoadCompanyUnitDDL("#ddlLoc,#ddlBPUnit");
        if (editmasunitstore > 0) {
            $('#ddlLoc').val(editmasunitstore).trigger('change');
        }

    } else if (LocalType == "F") {
        LoadCompanyUnitDDL("#ddlLoc,#ddlBPUnit");
        if (editmasunitstore > 0) {
            $('#ddlLoc').val(editmasunitstore).trigger('change');
        }

    } else if (LocalType == "S") {
        LoadEmployeeStoreunit();
    } else if (LocalType == "T") {
        LoadSupplierDDL("#ddlLoc");
        if (editmasunitstore > 0) {
            $('#ddlLoc').val(editmasunitstore).trigger('change');
        }
    }
}

function LoadLocAdd() {


    var LocalType = $('input[name="DType"]:checked').attr('value');

    if (LocalType == "F") {
        $('#txtLocAdd').val("");
        var LocID = $('#ddlLoc').val();

        $.ajax({
            url: "/CompanyUnit/GetbyID/" + LocID,
            typr: "GET",

            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                var obj = result.Value;
                if (result.Status == 'SUCCESS') {

                    $('#txtLocAdd').val(obj.Address1 + "," + obj.Address2 + "," + obj.Address3);

                }
            }

        });
    } else if (LocalType == "U") {
        $('#txtLocAdd').val("");
        var LocID = $('#ddlLoc').val();

        $.ajax({
            url: "/CompanyUnit/GetbyID/" + LocID,
            typr: "GET",

            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                var obj = result.Value;
                if (result.Status == 'SUCCESS') {

                    $('#txtLocAdd').val(obj.Address1 + "," + obj.Address2 + "," + obj.Address3);

                }
            }

        });
    } else if (LocalType == "S") {
        $('#txtLocAdd').val("");
        var LocID = $('#ddlLoc').val();

        $.ajax({
            url: "/StoreUnit/GetbyId/" + LocID,
            typr: "GET",

            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                var obj = result.Value;
                if (result.Status == 'SUCCESS') {

                    $('#txtLocAdd').val('');

                }
            }

        });
    } else if (LocalType == "T") {
        $('#txtLocAdd').val("");
        var LocID = $('#ddlLoc').val();

        $.ajax({
            url: "/Supplier/GetbyId/" + LocID,
            typr: "GET",

            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                var obj = result.Value;
                if (result.Status == 'SUCCESS') {

                    $('#txtLocAdd').val(obj.Address1 + "," + obj.Address2 + "," + obj.Address3);

                }
            }

        });
    }
}


function DelyRetsave() {

    debugger;

    var res = validate();
    if (res == false) {
        return false;
    }


    if (EItemList.length == 0) {
        //alert("Please Enter the Item Details..");
        var msg = 'Please Enter the Item Details...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }



    var DSType = $('input[name="DType"]:checked').attr('value');

    debugger;
    var oldReturnNo = $('#txtreturnNo').val();

    table = "Stores_Issue_ReturnMas",
    column = "ReturnNo",
    compId = AcomId;
    Docum = 'STORES DELIVERY RETURN'


    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var newReturnNo = result.Value;
            if (oldReturnNo != newReturnNo) {
                //alert('Return No has been changed...');
                var msg = 'Return Number has been changed...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                $('#txtreturnNo').val(result.Value);
            }
            var objPurSubmit = {

                Issueid: GIssId,
                ReturnNo: $('#txtreturnNo').val(),
                ReturnDate: $('#txtDate').val(),//new Date($('#txtDate').val()),
                Unit_Supplier_self: DSType,
                Desunitid: $('#ddlLoc').val(),
                Remarks: $('#txtRemarks').val(),
                QualityMade: "N",
                CreatedBy: Guserid,
                StoresDeliRDet: EItemList,


            };
            debugger;
            $("#btnAdd").attr("disabled", true);
            LoadingSymb();
            $.ajax({
                url: "/StoresDeliveryReturn/Add",
                data: JSON.stringify(objPurSubmit),
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {
                    if (result.Value == true) {
                        AddUserEntryLog('Procurement', 'Stores Delivery Return', 'ADD', $("#txtreturnNo").val());
                        //alert("Data Saved Sucessfully");
                        //window.location.reload();
                        var msg = 'Data Saved Sucessfully...';
                        var flg = 1;
                        var mod = 0;
                        var url = "";
                        AlartMessage(msg, flg, mod, url);

                        $('#myModal1').modal('hide');
                       
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

function ListOrderRefNo() {
    debugger;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var USType = $('input[name="MDType"]:checked').attr('value');
    var OType = $('input[name="optMOType"]:checked').attr('value');
    var IType = $('input[name="MIType"]:checked').attr('value');
    if (IType == "A") {
        var ITemType = "A";
    } else if (IType == "Y") {
        var ITemType = "Y";
    } else if (IType == "L") {
        var ITemType = "";
    }
    //var CompId = $('#ddlMCompany').val();

    var CompId = $('#ddlMCompany').val();

    if (CompId == null) {
        CompId = DCompid;
    } else {
        CompId = $('#ddlMCompany').val();
    }

    var UnitSuppId = $('#ddlMUnit').val();
    var Refe = $('#ddlMReference').val();
    var RetId = $('#ddlMReturnNo').val();
    //var OrdNo = "";
    //var ONo = $('select#ddlMOrderNo option:selected').val();

    //if (ONo == 0) {
    //    OrdNo == "";
    //}
    //else {

    //    OrdNo = $('select#ddlMOrderNo option:selected').val();
    //}

    //var RefNo = "";
    //var RNo = $('select#ddlMRefNo option:selected').val();

    //if (RNo == 0) {
    //    RefNo == "";
    //}
    //else {

    //    RefNo = $('select#ddlMRefNo option:selected').val();
    //}
    $.ajax({
        url: "/StoresDeliveryReturn/GetMainOrd",
        data: JSON.stringify({ Desunitid: UnitSuppId, OType: OType, ItemType: ITemType, CompanyId: CompId, Unit_Supplier_self: USType, ReturnId: RetId, Reference: Refe }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;

                $(ddlMOrderNo).empty();
                $(ddlMRefNo).empty();
                //Order
                $(ddlMOrderNo).append($('<option/>').val('0').text('--Select OrderNo--'));
                $.each(data, function () {
                    $(ddlMOrderNo).append($('<option></option>').val(this.BMasId).text(this.OrdNo));
                });
                //RefNo
                $(ddlMRefNo).append($('<option/>').val('0').text('--Select RefNo--'));
                $.each(data, function () {
                    $(ddlMRefNo).append($('<option></option>').text(this.RefNo));
                });


            }
        }

    });
}

function ListReference() {
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var USType = $('input[name="MDType"]:checked').attr('value');
    var OType = $('input[name="optMOType"]:checked').attr('value');
    var IType = $('input[name="MIType"]:checked').attr('value');
    //var CompId = $('#ddlMCompany').val();

    var CompId = $('#ddlMCompany').val();

    if (CompId == null) {
        CompId = DCompid;
    } else {
        CompId = $('#ddlMCompany').val();
    }

    if (IType == "A") {
        var ITemType = "A";
    } else if (IType == "Y") {
        var ITemType = "Y";
    } else if (IType == "L") {
        var ITemType = "";
    }
    var UnitSuppId = $('#ddlMUnit').val();
    var RetId = $('#ddlMReturnNo').val();
    var OrdNo = "";
    var ONo = $('select#ddlMOrderNo option:selected').val();

    if (ONo == 0) {
        OrdNo == "";
    }
    else {

        OrdNo = $('select#ddlMOrderNo option:selected').val();
    }

    var RefNo = "";
    var RNo = $('select#ddlMRefNo option:selected').val();

    if (RNo == 0) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlMRefNo option:selected').val();
    }
    $.ajax({
        url: "/StoresDeliveryReturn/GetMainRefer",
        data: JSON.stringify({ Desunitid: UnitSuppId, OType: OType, ItemType: ITemType, CompanyId: CompId, Unit_Supplier_self: USType, ReturnId: RetId, OrdNo: OrdNo, RefNo: RefNo }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;

                $(ddlMReference).empty();
                //Refer
                $(ddlMReference).append($('<option/>').val('0').text('--Select Reference--'));
                $.each(data, function () {
                    $(ddlMReference).append($('<option></option>').val(this.ReturnId).text(this.Reference));
                });



            }
        }

    });
}


function ListRetNo() {
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var USType = $('input[name="MDType"]:checked').attr('value');
    var OType = $('input[name="optMOType"]:checked').attr('value');
    var IType = $('input[name="MIType"]:checked').attr('value');
    //var CompId = $('#ddlMCompany').val();


    var CompId = $('#ddlMCompany').val();

    if (CompId == null) {
        CompId = DCompid;
    } else {
        CompId = $('#ddlMCompany').val();
    }

    if (IType == "A") {
        var ITemType = "A";
    } else if (IType == "Y") {
        var ITemType = "Y";
    } else if (IType == "L") {
        var ITemType = "";
    }
    var UnitSuppId = $('#ddlMUnit').val();
    var Refer = $('#ddlMReference').val();
    var OrdNo = "";
    var ONo = $('select#ddlMOrderNo option:selected').val();

    if (ONo == 0) {
        OrdNo == "";
    }
    else {

        OrdNo = $('select#ddlMOrderNo option:selected').val();
    }

    var RefNo = "";
    var RNo = $('select#ddlMRefNo option:selected').val();

    if (RNo == 0) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlMRefNo option:selected').val();
    }
    $.ajax({
        url: "/StoresDeliveryReturn/GetMainRetNo",
        data: JSON.stringify({ Desunitid: UnitSuppId, OType: OType, ItemType: ITemType, CompanyId: CompId, Unit_Supplier_self: USType, OrdNo: OrdNo, RefNo: RefNo, Reference: Refer }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;

                $(ddlMReturnNo).empty();
                //ReturnNo
                $(ddlMReturnNo).append($('<option/>').val('0').text('--Select ReturnNo--'));
                $.each(data, function () {
                    $(ddlMReturnNo).append($('<option></option>').val(this.ReturnId).text(this.ReturnNo));
                });



            }
        }

    });
}

function ListUnitSup() {
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var USType = $('input[name="MDType"]:checked').attr('value');
    var OType = $('input[name="optMOType"]:checked').attr('value');
    var IType = $('input[name="MIType"]:checked').attr('value');


    if (IType == "A") {
        var ITemType = "A";
    } else if (IType == "Y") {
        var ITemType = "Y";
    } else if (IType == "L") {
        var ITemType = "";
    }
    //var CompId = $('#ddlMCompany').val();



    var CompId = $('#ddlMCompany').val();

    if (CompId == null) {
        CompId = DCompid;
    } else {
        CompId = $('#ddlMCompany').val();
    }

    var RetId = $('#ddlMReturnNo').val();
    var Refer = $('#ddlMReference').val();
    var OrdNo = "";
    var ONo = $('select#ddlMOrderNo option:selected').val();

    if (ONo == 0) {
        OrdNo == "";
    }
    else {

        OrdNo = $('select#ddlMOrderNo option:selected').val();
    }

    var RefNo = "";
    var RNo = $('select#ddlMRefNo option:selected').val();

    if (RNo == 0) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlMRefNo option:selected').val();
    }
    $.ajax({
        url: "/StoresDeliveryReturn/GetMainUSuppNo",
        data: JSON.stringify({ OType: OType, ItemType: ITemType, CompanyId: CompId, Unit_Supplier_self: USType, OrdNo: OrdNo, RefNo: RefNo, Reference: Refer, ReturnId: RetId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;

                $(ddlMUnit).empty();
                //Unit
                $(ddlMUnit).append($('<option/>').val('0').text('--Select Unit/Supplier--'));
                $.each(data, function () {
                    $(ddlMUnit).append($('<option></option>').val(this.Desunitid).text(this.Unit_Supplier_self));
                });



            }
        }

    });
}

function LoadMainGrid() {

    debugger;

    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var USType = $('input[name="MDType"]:checked').attr('value');
    var OType = $('input[name="optMOType"]:checked').attr('value');
    var IType = $('input[name="MIType"]:checked').attr('value');


    if (IType == "A") {
        var ITemType = "A";
    } else if (IType == "Y") {
        var ITemType = "Y";
    } else if (IType == "L") {
        var ITemType = "";
    }
    //var CompId = $('#ddlMCompany').val();

    var CompId = $('#ddlMCompany').val();

    if (CompId == null) {
        CompId = DCompid;
    } else {
        CompId = $('#ddlMCompany').val();
    }


    var RetId = $('#ddlMReturnNo').val();
    //var Refer = $('#ddlMReference').val();
    var UnitSuppId = $('#ddlMUnit').val();
    var OrdNo = "";
    var ONo = $('select#ddlMOrderNo option:selected').val();

    if (ONo == 0) {
        OrdNo == "";
    }
    else {

        OrdNo = $('select#ddlMOrderNo option:selected').val();
    }

    var RefNo = "";
    var RNo = $('select#ddlMRefNo option:selected').val();

    if (RNo == 0) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlMRefNo option:selected').val();
    }

    var Refer = "";
    var Ref = $('select#ddlMReference option:selected').val();

    if (Ref == 0) {
        Refer == "";
    }
    else {

        Refer = $('select#ddlMReference option:selected').val();
    }


    if (ChkComp) {
        OrdNo == "";
        RefNo == "";
        Refer == "";
        RetId = 0;
        UnitSuppId = 0;
    }

    if (DtChk) {
        OrdNo == "";
        RefNo == "";
        Refer == "";
        RetId = 0;
        UnitSuppId = 0;
    }

    $.ajax({
        url: "/StoresDeliveryReturn/GetMainLoad",
        data: JSON.stringify({ Desunitid: UnitSuppId, OType: OType, ItemType: ITemType, CompanyId: CompId, Unit_Supplier_self: USType, ReturnId: RetId, OrdNo: OrdNo, RefNo: RefNo, Reference: Refer }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {

            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");

            if (DtChk) {

                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Refno: dataSet[i][9]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.Refno]) {
                        revdet[el.Refno] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMRefNo').empty();
                $('#ddlMRefNo').append($('<option/>').val('0').text('--Select RefNo--'));
                $.each(rev, function () {
                    $('#ddlMRefNo').append($('<option></option>').val(this.Refno).text(this.Refno));
                });

                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Ordno: dataSet[i][8]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.Ordno]) {
                        revdet[el.Ordno] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMOrderNo').empty();
                $('#ddlMOrderNo').append($('<option/>').val('0').text('--Select OrderNo--'));
                $.each(rev, function () {
                    $('#ddlMOrderNo').append($('<option></option>').val(this.Ordno).text(this.Ordno));
                });

                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Suppid: dataSet[i][6],
                        Supp: dataSet[i][7]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.Suppid]) {
                        revdet[el.Suppid] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMUnit').empty();
                $('#ddlMUnit').append($('<option/>').val('0').text('--Select Unit/Supplier--'));
                $.each(rev, function () {
                    $('#ddlMUnit').append($('<option></option>').val(this.Suppid).text(this.Supp));
                });

                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        retid: dataSet[i][0],
                        ret: dataSet[i][2]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.retid]) {
                        revdet[el.retid] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMReturnNo').empty();
                $('#ddlMReturnNo').append($('<option/>').val('0').text('--Select ReturnNo--'));
                $.each(rev, function () {
                    $('#ddlMReturnNo').append($('<option></option>').val(this.retid).text(this.ret));
                });

                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        ref: dataSet[i][3],

                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.ref]) {
                        revdet[el.ref] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMReference').empty();
                $('#ddlMReference').append($('<option/>').val('0').text('--Select Reference--'));
                $.each(rev, function () {
                    $('#ddlMReference').append($('<option></option>').val(this.ref).text(this.ref));
                });

                return true;
            }

            $('#tblDeliRetmaingrid').DataTable({
                data: dataSet,
                scrollY: 300,
                scrollCollapse: true,
                paging: false,
                fixedColumns: false,
                select: false,
                scrollX: "100%",
                scrollXInner: "100%",
                scroller: false,
                bSort: false,
                columns: [
                         { title: "ReturnId", "visible": false },
                         { title: "Unit/Supplier" },
                         { title: "Return No" },
                         { title: "Date" },
                         { title: "Reference" },
                         { title: "Issue No" },
                          { title: "Desunitid", "visible": false },
                           { title: "Desunit", "visible": false },
                           { title: "OrdNo", "visible": false },
                           { title: "RefNo", "visible": false },
                         { title: "Action" },

                ]

            });
            $(document).ready(function () {
                var table = $('#tblDeliRetmaingrid').DataTable();

                $('#tblDeliRetmaingrid tbody').on('click', 'tr', function () {
                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');
                    }
                    else {
                        table.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');
                    }
                });


            });
            CheckRights("StoresDeliveryReturn");


            if (ChkRefno) {
                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Refno: dataSet[i][9]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.Refno]) {
                        revdet[el.Refno] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMRefNo').empty();
                $('#ddlMRefNo').append($('<option/>').val('0').text('--Select RefNo--'));
                $.each(rev, function () {
                    $('#ddlMRefNo').append($('<option></option>').val(this.Refno).text(this.Refno));
                });

            }


            if (ChkOrdno) {
                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Ordno: dataSet[i][8]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.Ordno]) {
                        revdet[el.Ordno] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMOrderNo').empty();
                $('#ddlMOrderNo').append($('<option/>').val('0').text('--Select OrderNo--'));
                $.each(rev, function () {
                    $('#ddlMOrderNo').append($('<option></option>').val(this.Ordno).text(this.Ordno));
                });

            }


            if (ChkSupplier) {
                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Suppid: dataSet[i][6],
                        Supp: dataSet[i][7]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.Suppid]) {
                        revdet[el.Suppid] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMUnit').empty();
                $('#ddlMUnit').append($('<option/>').val('0').text('--Select Unit/Supplier--'));
                $.each(rev, function () {
                    $('#ddlMUnit').append($('<option></option>').val(this.Suppid).text(this.Supp));
                });

            }

            if (ChkRetNo) {
                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                       retid: dataSet[i][0],
                        ret: dataSet[i][2]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.retid]) {
                        revdet[el.retid] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMReturnNo').empty();
                $('#ddlMReturnNo').append($('<option/>').val('0').text('--Select ReturnNo--'));
                $.each(rev, function () {
                    $('#ddlMReturnNo').append($('<option></option>').val(this.retid).text(this.ret));
                });

            }

            if (ChkRef) {
                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        ref: dataSet[i][4],
                      
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.ref]) {
                        revdet[el.ref] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMReference').empty();
                $('#ddlMReference').append($('<option/>').val('0').text('--Select Reference--'));
                $.each(rev, function () {
                    $('#ddlMReference').append($('<option></option>').val(this.ref).text(this.ref));
                });

            }



        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function List() {
    $('#tblDeliRetmaingrid').DataTable().destroy();
    //ListReference();
    //ListUnitSup();
    //ListRetNo();
    //ListOrderRefNo();
     ChkRefno = true;
     ChkOrdno = true;
     DtChk = false;
     ChkSupplier = true;
     ChkRetNo = true;
     ChkComp = false;
     ChkRef = true;
    LoadMainGrid();
}

function CMainlist() {
 
    $('#tblDeliRetmaingrid').DataTable().destroy();

    //ListReference();
    //ListUnitSup();
    //ListRetNo();
    //ListOrderRefNo();
    ChkRefno = true;
    ChkOrdno = true;
    DtChk = false;
    ChkSupplier = true;
    ChkRetNo = true;
    ChkComp = false;
    ChkRef = true;
    LoadMainGrid();
}

function USMainlist() {
    $('#tblDeliRetmaingrid').DataTable().destroy();

    //ListReference();
    //ListRetNo();
    //ListOrderRefNo();
    ChkRefno = true;
    ChkOrdno = true;
    DtChk = false;
    ChkSupplier = false;
    ChkRetNo = true;
    ChkComp = false;
    ChkRef = true;
    LoadMainGrid();
}
function RefeMainlist() {
    $('#tblDeliRetmaingrid').DataTable().destroy();
    //ListRetNo();
    //ListOrderRefNo();
    //ListUnitSup();
    ChkRefno = false;
    ChkOrdno = true;
    DtChk = false;
    ChkSupplier = false;
    ChkRetNo = true;
    ChkComp = false;
    ChkRef = false;
    LoadMainGrid();
}
function OMainlist() {
    $('#tblDeliRetmaingrid').DataTable().destroy();
    //ListRetNo();
    //ListOrderRefNo();
    //ListReference();
    //ListUnitSup();
    ChkRefno = false;
    ChkOrdno = false;
    DtChk = false;
    ChkSupplier = false;
    ChkRetNo = true;
    ChkComp = false;
    ChkRef = true;
    LoadMainGrid();
}
function RMainlist() {
    $('#tblDeliRetmaingrid').DataTable().destroy();
    //ListOrderRefNo();
    //ListReference();
    //ListUnitSup();
    ChkRefno = false;
    ChkOrdno = false;
    DtChk = false;
    ChkSupplier = false;
    ChkRetNo = false;
    ChkComp = false;
    ChkRef = false;
    LoadMainGrid();
}

function getbyID(Id) {
    debugger;

    LoadEmployeeDDL("#ddlRequestner");
    LoadDepartmentDDL("#ddlDepartment");
    $.ajax({
        url: "/StoresDeliveryReturn/LoadEditDeliRetDetails",
        data: JSON.stringify({ ReturnId: Id }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;

            debugger;
            if (obj != undefined) {
                $('#txtCompanyId').val(obj[0]["CompanyId"]);
                $('#txtCompany').val(obj[0]["Company"]);
                $('#txtDate').val(moment(obj[0]["ReturnDate"]).format('DD/MM/YYYY'));
                $('#txtreturnNo').val(obj[0]["ReturnNo"]);
                $('#txtIssueNo').val(obj[0]["IssueNo"]);
                $('#ddlLoc').val(obj[0]["Desunitid"]);
                $('#txtRemarks').val(obj[0]["Remarks"]);
                $('#txtUnit').val(obj[0]["UnSup"]);

                var DType = obj[0]["Unit_Supplier_self"];
                var OType = obj[0]["OType"];

                GRetId = obj[0]["ReturnId"];

                GIssId = obj[0]["Issueid"];
                var RetNo = obj[0]["ReturnNo"];
                
                LoadDelyRetItemDetailsEdit(RetNo, GIssId, OType);

                //if (DType == "F") {
                //    LoadEditFDes(SuppId);
                //} else if (DType == "U") {
                //    LoadEditFDes(SuppId);
                //} else if (DType == "S") {
                //    LoadEditSDes(SuppId);
                //} else if (DType == "T") {
                //    LoadEditTDes(SuppId);
                //}
                CompanyId = obj[0]["CompanyId"];

                if (DType == "F") {
                    $('#OptSelf').prop('checked', true);
                    editmasunitstore = obj[0]["Desunitid"];
                } else if (DType == "U") {
                    $('#OptUnit').prop('checked', true);
                    editmasunitstore = obj[0]["Desunitid"];
                } else if (DType == "S") {
                } else if (DType == "T") {
                    $('#OptSup').prop('checked', true);
                    editmasunitstore = obj[0]["Desunitid"];
                }
                if (DType == "S") {
                    $('#OptStore').prop('checked', true);
                    editmasunitstore = obj[0]["Desunitid"];
                    LoadEmployeeStoreunit();
                }

            
                //else {
                //    LoadLocation();
                //}
                LoadLocationEdit();
                

                $('#myModal1').modal('show');

                $('#myModal').modal('hide');
                //$('#myModal1').modal('show');
                $('#Updatebtn').show();
                $('#btnAdd').hide();
                $('#Deletebtn').hide();
            }
            else {

            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadEditFDes(SuppId) {
    debugger;
    $.ajax({
        url: "/Supplier/GetbyId/" + SuppId,
        typr: "GET",

        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                $('#txtLocAdd').val(obj.Address1 + "," + obj.Address2 + "," + obj.Address3);

            }
        }

    });
}
function LoadEditUDes(SuppId) {
    debugger;
    $.ajax({
        url: "/CompanyUnit/GetbyID/" + SuppId,
        typr: "GET",

        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                $('#txtLocAdd').val(obj.Address1 + "," + obj.Address2 + "," + obj.Address3);

            }
        }

    });
}

function LoadDelyRetItemDetailsEdit(RetNo, IssId, OType) {
    debugger;

    $.ajax({
        url: "/StoresDeliveryReturn/LoadItemEditDetailsDelRet",
        data: JSON.stringify({ ReturnNo: RetNo, Issueid: IssId, OType: OType }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            EItemList = result;
            CItemList = EItemList;
            loadDelRetItemTable(EItemList);


        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}


function DelyRetUpdate() {

    debugger;

    var res = validate();
    if (res == false) {
        return false;
    }


    if (EItemList.length == 0) {
        //alert("Please Enter the Item Details..");
        var msg = 'Please Enter the Item Details...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }



    var DSType = $('input[name="DType"]:checked').attr('value');

    var objPurSubmit = {

        Issueid: GIssId,
        ReturnId: GRetId,
        ReturnNo: $('#txtreturnNo').val(),
        ReturnDate: $('#txtDate').val(),//new Date($('#txtDate').val()),
        Unit_Supplier_self: DSType,
        Desunitid: $('#ddlLoc').val(),
        Remarks: $('#txtRemarks').val(),
        QualityMade: "N",
        CreatedBy: Guserid,
        StoresDeliRDet: EItemList,


    };
    debugger;
    $("#Updatebtn").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/StoresDeliveryReturn/Update",
        data: JSON.stringify(objPurSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == true) {
                AddUserEntryLog('Procurement', 'Stores Delivery Return', 'UPDATE', $("#txtreturnNo").val());
                //alert("Data Updated Sucessfully");
                //window.location.reload();
                var msg = 'Data Updated Sucessfully...';
                var flg = 1;
                var mod = 0;
                var url = "";
                AlartMessage(msg, flg, mod, url);

                $('#myModal1').modal('hide');
                
            } else {

                window.location.href = "/Error/Index";


            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function getDeleteID(ID) {

    LoadEmployeeDDL("#ddlRequestner");
    LoadDepartmentDDL("#ddlDepartment");
    $.ajax({
        url: "/StoresDeliveryReturn/LoadEditDeliRetDetails",
        data: JSON.stringify({ ReturnId: ID }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            debugger;
            if (obj != undefined) {
                $('#txtCompanyId').val(obj[0]["CompanyId"]);
                $('#txtCompany').val(obj[0]["Company"]);
                $('#txtDate').val(moment(obj[0]["ReturnDate"]).format('DD/MM/YYYY'));
                $('#txtreturnNo').val(obj[0]["ReturnNo"]);
                $('#txtIssueNo').val(obj[0]["IssueNo"]);
                $('#ddlLoc').val(obj[0]["Desunitid"]);
                $('#txtRemarks').val(obj[0]["Remarks"]);
                $('#txtUnit').val(obj[0]["UnSup"]);

                var DType = obj[0]["Unit_supplier_self"];
                var OType = obj[0]["OType"];

                GRetId = obj[0]["ReturnId"];

                GIssId = obj[0]["Issueid"];
                var RetNo = obj[0]["ReturnNo"];

                LoadDelyRetItemDetailsEdit(RetNo, GIssId, OType);

                if (DType == "F") {
                    LoadEditFDes(SuppId);
                } else if (DType == "U") {
                    LoadEditFDes(SuppId);
                } else if (DType == "S") {
                    LoadEditSDes(SuppId);
                } else if (DType == "T") {
                    LoadEditTDes(SuppId);
                }

                $('#myModal1').modal('show');

                $('#myModal').modal('hide');
                //$('#myModal1').modal('show');
                $('#Updatebtn').hide();
                $('#btnAdd').hide();
                $('#Deletebtn').show();
            }
            else {

            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function DelyRetDelete() {
    debugger;

    var res = validate();
    if (res == false) {
        return false;
    }


    if (EItemList.length == 0) {
        //alert("Please Enter the Item Details..");
        var msg = 'Please Enter the Item Details...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }



    var DSType = $('input[name="DType"]:checked').attr('value');

    var objPurSubmit = {

        Issueid: GIssId,
        ReturnId: GRetId,
        ReturnNo: $('#txtreturnNo').val(),
        ReturnDate: $('#txtDate').val(),//new Date($('#txtDate').val()),
        Unit_Supplier_self: DSType,
        Desunitid: $('#ddlLoc').val(),
        Remarks: $('#txtRemarks').val(),
        QualityMade: "N",
        CreatedBy: Guserid,
        StoresDeliRDet: EItemList,


    };
    debugger;
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $("#Deletebtn").attr("disabled", true);
        LoadingSymb();
        $.ajax({
            url: "/StoresDeliveryReturn/Delete",
            data: JSON.stringify(objPurSubmit),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {

                if (result.Value == true) {
                    AddUserEntryLog('Procurement', 'Stores Delivery Return', 'DELETE', $("#txtreturnNo").val());
                    
                    $('#myModal1').modal('hide');
                    //alert("Data Deleted Sucessfully");
                    //window.location.reload();
                    var msg = 'Data Deleted Sucessfully...';
                    var flg = 2;
                    var mod = 0;
                    var url = "";
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
}

function StoresDelRetPrint(ID) {
    debugger;

    var compid = $('#ddlMCompany').val();
    window.open("../ReportInline/Stores/StoresReturnReportInline/StoresReturnReportInline.aspx?MasId=" + ID + "&Companyid=" + compid);
    return true;
}
function LoadEmployeeStoreunit() {
    debugger;
    if (UserName == 'superuser') {
        LoginUserid = 0;
    }

    $.ajax({
        url: "/StoreSetup/GetStoreRights",
        data: JSON.stringify({ Userid: LoginUserid, Storetype: 'M', Companyid: CompanyId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var data = result.Value;
            $(ddlLoc).empty();
            $(ddlLoc).append($('<option/>').val('0').text('--Select Store--'));
            $.each(data, function () {
                $(ddlLoc).append($('<option></option>').val(this.Storeid).text(this.StoreName));
            });
            $(ddlLoc).trigger("select2:updated");
            if (editmasunitstore > 0) {
                $('#ddlLoc').val(editmasunitstore).trigger('change');
            }
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });



}

function LoadStorefromcompany() {
    CompanyId = $('#ddlACompany').val();

    if (UserName == 'superuser') {
        LoginUserid = 0;
    }

    $.ajax({
        url: "/StoreSetup/GetStoreRights",
        data: JSON.stringify({ Userid: LoginUserid, Storetype: 'M', Companyid: CompanyId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var data = result.Value;

            $(ddlAStore).empty();
            $(ddlAStore).append($('<option/>').val('0').text('--Select Store--'));
            $.each(data, function () {
                $(ddlAStore).append($('<option></option>').val(this.Storeid).text(this.StoreName));
            });
            $(ddlAStore).trigger("select2:updated");

            LoadRetAddDetails();

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}


function LoadUserCompanyDDL() {
    debugger;
    httpGet("/Company/GetCompany", onUserCompanySuccess, onUserCompanyFailure);
}

function onUserCompanySuccess(result) {
    if (result.Status == "SUCCESS") {

        var data = result.Value;
        var comp = [];
        $.each(data, function (i) {
            if (data[i].CompanyId == CompanyId) {
                comp.push(data[i]);
            }
        });

        $(ddlBCompany).empty();
        // $(ddlMSCompany).append($('<option/>').val('0').text('--Select Company--'));
        $.each(comp, function () {
            $(ddlBCompany).append($('<option></option>').val(this.CompanyId).text(this.CompanyName));
        });
        $(ddlBCompany).trigger("select2:updated");
    }
    else {
        //alert('Company loading failed');
        var msg = 'Company loading failed...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
    }
}

function onUserCompanyFailure(result) {

    //alert('Company loading failed');
    var msg = 'Company loading failed...';
    var flg = 4;
    var mod = 1;
    var url = "";
    AlartMessage(msg, flg, mod, url);
}
function ModalClose() {
    $('#myModal').modal('toggle')

}