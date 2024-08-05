var RItemList = [];
var RItemListSave = [];
var index = 0;
var Mode = 0;
var PurRetId = 0;
var Userid = 0;
var UserName = 0;
var Guserid = 0;
var DCompid = 0;
var LoginUserid = '';
var editmasunitstore = 0;
var editsubmasunitstore = 0;
var editsubstore = 0;
var CompanyId = 0;
var validatestore = "False";
$(document).ready(function () {
    debugger;
    Guserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    DCompid = $("#hdnDCompid").data('value');
    validatestore = $("#hdnValidateStore").data('value');

    var qrStr = window.location.search;
    var spQrStr = qrStr.substring(1);
    var arrQrStr = new Array();
    var arr = spQrStr.split('?');

    for (var i = 0; i < arr.length; i++) {
        var queryvalue = arr[i].split('=');
    }


    PurRetId = queryvalue[1];
    Mode = queryvalue[3];
    //LoadStoreUnitDDL("#ddlAMainStore");

    if (Mode == 0) {
        LoadCompanyDDL("#ddlCompany,#ddlACompany");
        getDate();

       
        GenerateNumber();
        LoadGrn();
        LoadSupplier();
        editmasunitstore = 0;
        editsubmasunitstore = 0;
        editsubstore = 0;
        LoadEmployeeStoreunit();
        LoadUserCompanyDDL();


        var type = $('input[name="MSType"]:checked').attr('value');
        if (type == 'M') {
            LoadMainStore();
        }
        if (type == 'S') {
            LoadSubStore();
        }
        if (type == 'E') {
            LoadSecStore();
        }

        //LoadStoreSectionDDL("#ddlSecStore");
        //LoadCompanyUnitDDL("#ddlPUnit");
        //LoadWorkdivisionDDL("#ddlWK");


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

        LoadPurRetEditDetails(PurRetId);

    }

    $(document).on('keyup', '.CalcQty', function () {
        debugger;

        var table = $('#tblEntryReturn').DataTable();
        var SKId = table.row($(this).parents('tr')).data()["Stockid"];
        var IId = table.row($(this).parents('tr')).data()["itemid"];
        var CId = table.row($(this).parents('tr')).data()["colorid"];
        var SId = table.row($(this).parents('tr')).data()["sizeid"];
        var PUId = table.row($(this).parents('tr')).data()["uomId"];
        var TransNo = table.row($(this).parents('tr')).data()["transno"];

        var Val = $(this).val();      

        var ratecal = Val;


        $.each(RItemList, function () {
            if (this.Stockid == SKId && this.itemid == IId && this.colorid == CId && this.sizeid == SId && this.uomId == PUId && this.transno == TransNo) {

                this.Return_qty = ratecal;
            }
        });
        loadItemTable(RItemList);

        /////Load Save  Table

        $.each(RItemListSave, function () {
            if (this.Stockid == SKId && this.itemid == IId && this.colorid == CId && this.sizeid == SId && this.uomId == PUId && this.transno == TransNo) {

                this.Return_qty = Val;


            }
        });

        loadItemTableSave(RItemListSave);


        var rows = $("#tblEntryReturn").dataTable().fnGetNodes();
        var dtTable = $('#tblEntryReturn').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 18 }).data()[0];
            $('input[id=txtOQty]').each(function () {
                if (sn == SKId && $(this).val() == Val) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtOQty').val();
                    row.find('#txtOQty').focus().val('').val(num);
                    return true;
                }
            });
        }
    });
});

function LoadEntryNo() {
    GenerateNumber();   
}

$(document).ready(function () {
    $("#tblEntryReturn ").dataTable().find("tbody").on('click', 'tr', function () {
        index = (this.rowIndex) - 1;
    });
});

function MainList() {
    $('#tblEntryReturn').DataTable().destroy();
    LoadGrid();
}

function RadioOClick() {
    $('#tblEntryReturn').DataTable().destroy();
    LoadGrn();

    var OType = $('input[name="OType"]:checked').attr('value');

    if (OType == "O") {


        $("#optO").prop("checked", true);
        $("#optG").prop("checked", false);

    } else if (OType == "G") {

        $("#optO").prop("checked", false);
        $("#optG").prop("checked", true);

        $('#ddlOrderNo').val("");
        $('#ddlWorkOrdNo').val("");
        $('#ddlStyle').val("");

        //$("#optAuto").attr('disabled', true);
        $("#ddlOrderNo").prop("disabled", true);
        $("#ddlWorkOrdNo").prop("disabled", true);
        $("#ddlStyle").prop("disabled", true);
        //$("#txtQty").prop("disabled", true);
        //$("#txtRefNo").prop("disabled", true);
        //$('#ddlOrdNo').val("");
        //$('#ddlBuyer').val("");
        //$('#txtQty').val("");
        //$('#txtRefNo').val("");
        //$("#ddlOrderNo").prop("disabled", true);

    }

}
function getDate() {

    //var todaydate = new Date();
    //var day = todaydate.getDate();
    //var Pmonth = todaydate.getMonth() - 2;
    //var Cmonth = todaydate.getMonth() + 1;
    //var year = todaydate.getFullYear();
    //var datestring = Pmonth + "/" + day + "/" + year;
    //var Fdatestring = day + "/" + Cmonth + "/" + year;

    //var day = new Date(),
    //    year = ((day.getMonth() - 2) < 0) ? (day.getFullYear() - 1) : day.getFullYear(),
    //    month = ((day.getMonth() - 2) < 0) ? (12 + (day.getMonth() - 2)) : (day.getMonth() + 1),
    //    date = month + '/' + day.getDate() + '/' + year;
    //$('#txtEntryDate').val(date);
    //$('#txtDcDate').val(Fdatestring);

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


    $('#txtEntryDate').val(Fdatestring);
    $('#txtDcDate').val(Fdatestring);

}

var table, column, compId, Docum;

function GenerateNumber(table, column, compId, Docum) {
    debugger;


   // var comId = $('#ddlCompany').val();

    table = "Pur_return_mas",
      column = "Return_no",
     // compId = comId,
      Docum = 'PURCHASE RETURNS'

    compId = $('#ddlCompany').val();

    if (compId == null) {
        compId = DCompid;
    } else {
        compId = $('#ddlCompany').val();
    }
    CompanyId = compId;

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

function LoadSupplier() {


    var comId = $('#ddlCompany').val();

    $.ajax({
        url: "/PurchaseReturnAdd/GetSupplierNo",
        data: JSON.stringify({ companyid: comId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;
                $(ddlSupplier).empty();
                $(ddlSupplier).append($('<option/>').val('0').text('--Select Supplier--'));
                $.each(data, function () {
                    $(ddlSupplier).append($('<option></option>').val(this.SupplierId).text(this.Supplier));
                });

            }
        }

    });

}

function LoadPo() {


    var comId = $('#ddlCompany').val();
    var SupId = $('#ddlSupplier').val();


    $.ajax({
        url: "/PurchaseReturnAdd/GetPoNo",
        data: JSON.stringify({ companyid: comId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;
                $(ddlGrnNo).empty();
                $(ddlGrnNo).append($('<option/>').val('0').text('--Select PoNo--'));
                $.each(data, function () {
                    $(ddlGrnNo).append($('<option></option>').val(this.pur_ord_id).text(this.pur_ord_no));
                });



            }
        }

    });

}

function LoadGrn() {


    var comId = $('#ddlCompany').val();
    var SupId = $('#ddlSupplier').val();
    var OType = $('input[name="OType"]:checked').attr('value');
    var EntryType = $('input[name="PURType"]:checked').attr('value');

    $.ajax({
        url: "/PurchaseReturnAdd/GetGrnNo",
        data: JSON.stringify({ companyid: comId, SupplierId: SupId, Purchase_Type: OType, EType: EntryType }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",


        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;
                $(ddlGrnNo).empty();
                $(ddlGrnNo).append($('<option/>').val('0').text('--Select GrnNo--'));
                $.each(data, function () {
                    $(ddlGrnNo).append($('<option></option>').val(this.GrnId).text(this.GrnNo));
                });

            }
            LoadOrderNo();         
          
        }

    });

}

function LoadDcNo() {

    var GrnId = $('#ddlGrnNo').val();

    var OType = $('input[name="OType"]:checked').attr('value');
    $.ajax({
        url: "/PurchaseReturnAdd/GetGrnDcNo",
        data: JSON.stringify({ GrnId: GrnId, Purchase_Type: OType }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;

            $('#txtDc').val(obj[0]["GDcNo"]);
            LoadOrderNo();
            

        }
       
    });

}

//function LoadJobNo() {


//    var comId = $('#ddlCompany').val();
//    var SupId = $('#ddlSupplier').val();
//    var PoId = $('#ddlGrnNo').val();
//    var OType = $('input[name="OType"]:checked').attr('value');
//    var EntryType = $('input[name="PURType"]:checked').attr('value');

//    $.ajax({
//        url: "/PurchaseReturnAdd/GetWorkNo",
//        data: JSON.stringify({ companyid: comId, SupplierId: SupId, Purchase_Type: OType, EType: EntryType, pur_ord_id: PoId }),
//        type: "POST",
//        contentType: "application/json;charset=utf-8",
//        dataType: "json",

//        success: function (result) {
//            var obj = result.Value;
//            if (result.Status == 'SUCCESS') {

//                var data = result.Value;
//                $(ddlWorkOrdNo).empty();
//                $(ddlWorkOrdNo).append($('<option/>').val('0').text('--Select WorkNo--'));
//                $.each(data, function () {
//                    $(ddlWorkOrdNo).append($('<option></option>').val(this.JobNoId).text(this.job_ord_no));
//                });

//            }
           
           
//        }

//    });

//}
function LoadOrderNo() {
    debugger;

    var comId = $('#ddlCompany').val();
    var SupId = $('#ddlSupplier').val();
    var PoId = $('#ddlGrnNo').val();
    var OType = $('input[name="OType"]:checked').attr('value');
    var EntryType = $('input[name="PURType"]:checked').attr('value');

    $.ajax({
        url: "/PurchaseReturnAdd/GetOrderNo",
        data: JSON.stringify({ companyid: comId, SupplierId: SupId, Purchase_Type: OType, EType: EntryType, pur_ord_id: PoId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;
                $(ddlOrderNo).empty();
                $(ddlOrderNo).append($('<option/>').val('0').text('--Select OrderNo--'));
                $.each(data, function () {
                    $(ddlOrderNo).append($('<option></option>').val(this.BMasId).text(this.OrderNo));
                });

            }
            LoadJobNo();
        }

    });

}

function LoadJobNo() {
    debugger;

    var BMasId = $('#ddlOrderNo').val();
    var JbId = 0;
    var StyId = 0;
    var RefNo = "";
    //var RNo = $('select#ddlFRefNo option:selected').val();

    //if (RNo == 0) {
    //    RefNo == "";
    //}
    //else {

    //    RefNo = $('select#ddlFRefNo option:selected').val();
    //}

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


                ////RefNo
                //$(ddlFRefNo).empty();
                //$(ddlFRefNo).append($('<option/>').val('0').text('--Select RefNo--'));
                //$.each(data, function () {
                //    $(ddlFRefNo).append($('<option></option>').text(this.RefNo));
                //});

                //JobNo
                $(ddlWorkOrdNo).empty();
                $(ddlWorkOrdNo).append($('<option/>').val('0').text('--Select JobNo--'));
                $.each(data, function () {
                    $(ddlWorkOrdNo).append($('<option></option>').val(this.JobId).text(this.Job_Ord_no));
                });

                //Style
                $(ddlStyle).empty();
                $(ddlStyle).append($('<option/>').val('0').text('--Select Style--'));
                $.each(data, function () {
                    $(ddlStyle).append($('<option></option>').val(this.Styleid).text(this.Style));
                });
            }


        }

    });

}

function LoadStyleNo() {


    var comId = $('#ddlCompany').val();
    var SupId = $('#ddlSupplier').val();
    var OrderNo = $("#ddlOrderNo option:selected").text();
    var workNo = $("#ddlWorkOrdNo option:selected").text();
    var OType = $('input[name="OType"]:checked').attr('value');
    var EntryType = $('input[name="PURType"]:checked').attr('value');

    $.ajax({
        url: "/PurchaseReturnAdd/GetStyle",
        data: JSON.stringify({ companyid: comId, SupplierId: SupId, Purchase_Type: OType, EType: EntryType, OrderNo: OrderNo, job_ord_no: workNo }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;
                $(ddlStyle).empty();
                $(ddlStyle).append($('<option/>').val('0').text('--Select Style--'));
                $.each(data, function () {
                    $(ddlStyle).append($('<option></option>').val(this.StyleId).text(this.Style));
                });

            }
        }

    });

}

function RadioPURGClick() {

    LoadGrn();
}
function RadioPURPClick() {

    LoadPo();
}

function LoadGrid() {
    debugger;

    var RetId = 0;
    var comId = $('#ddlCompany').val();
    var supId = $('#ddlSupplier').val();
    var strId = $('#ddlAMainStore').val();
    var PurorGrn = $("#ddlGrnNo option:selected").text();

    var OType = $('input[name="OType"]:checked').attr('value');
    var EnType = $('input[name="PURType"]:checked').attr('value');

    $.ajax({
        url: "/PurchaseReturnAdd/LoadRetitemDetails",
        data: JSON.stringify({ CompanyID: comId, SupplierID: supId, storeid: strId, PurOrGrnNo: PurorGrn, Ordtype: OType, EntryType: EnType }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            RItemList = result;
            RItemListSave = result;
            loadItemTable(RItemList);
            loadItemTableSave(RItemListSave);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadEditGrid() {
    debugger;

    var RetId = PurRetId;
    var comId = $('#ddlCompany').val();
    var supId = $('#ddlSupplier').val();
    var strId = $('#ddlAMainStore').val();
    //var PurorGrn = $("#ddlGrnNo option:selected").text();
    var PurorGrn = "";

    var OType = $('input[name="SOType"]:checked').attr('value');
    var EnType = $('input[name="PURType"]:checked').attr('value');

    $.ajax({
        url: "/PurchaseReturnAdd/LoadRetEdititemDetails",
        data: JSON.stringify({ CompanyID: comId, SupplierID: supId, storeid: strId, PurOrGrnNo: PurorGrn, Ordtype: OType, EntryType: EnType, Return_ID: RetId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            RItemList = result;
            RItemListSave = result;
            loadItemTable(RItemList);
            loadItemTableSave(RItemListSave);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function loadItemTable(RItemList) {

    $('#tblEntryReturn').DataTable().destroy();
    debugger;

    var table = $('#tblEntryReturn').DataTable({

        data: RItemList,
        scrollY: 100,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        //"bSort": false,
        columns: [

             { title: "ReturnId", data: "Return_ID", "visible": false },
            { title: "ReturnDetId", data: "Return_DetID", "visible": false },
            { title: "Trans No", data: "transno" },
            { title: "Item", data: "item" },
            { title: "Color", data: "color" },
            { title: "Size", data: "size" },
            { title: "Uom", data: "puom" },
            { title: "Stock Qty", data: "stockQty" },
            {
                title: "Return Qty", data: "Return_qty",
                render: function (data) {

                    return '<input type="text" id="txtOQty" class="CalcQty form-control"  style="width: 50px;text-align: center;"  value=' + data + '  >';

                },
            },
             { title: "Pur Uom", data: "puom" },
              { title: "Sec Qty", data: "SecQty" },
               { title: "ConMode", data: "conmode" },
                { title: "To Pur Uom", data: "ToPurUom" },
                  { title: "Job Ord No", data: "jobno" },
             { title: "ItemId", data: "itemid", "visible": false },
             { title: "ColorId", data: "colorid", "visible": false },
             { title: "SizeId", data: "sizeid", "visible": false },
             { title: "PurUomId", data: "uomId", "visible": false },
             { title: "StockId", data: "Stockid", "visible": false },
             { title: "CompId", data: "compId", "visible": false },
               { title: "UnitId", data: "UnitId", "visible": false },
                 { title: "StoreUnitId", data: "storeunitid", "visible": false },
                    { title: "StockUomId", data: "stockuomid", "visible": false },
                 //{
                 //    title: "ACTION", "mDataProp": null,
                 //    "sDefaultContent": '<div style="display:inline-flex;"><button type="button" data-toggle="tooltip" data-placement="top" title="View Item" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnItemview btn btn-round btn-info"> <i class="fa fa-eye"></i> </button></div>'
                 //},
        ]
    });


}
function loadItemTableSave(RItemListSave) {

    $('#tblEntryReturnSave').DataTable().destroy();
    debugger;

    var table = $('#tblEntryReturnSave').DataTable({

        data: RItemListSave,

        columns: [

             { title: "ReturnId", data: "Return_ID" },
            { title: "ReturnDetId", data: "Return_DetID" },
            { title: "TransNo", data: "transno" },
            { title: "Item", data: "item" },
            { title: "Color", data: "color" },
            { title: "Size", data: "size" },
            { title: "Uom", data: "puom" },
            { title: "StockQty", data: "stockQty" },
            { title: "ReturnQty", data: "Return_qty" },
             { title: "PUom", data: "puom" },
              { title: "SecQty", data: "SecQty" },
               { title: "ConMode", data: "conmode" },
                { title: "ToPurUom", data: "ToPurUom" },
                  { title: "JobOrdNo", data: "jobno" },
             { title: "ItemId", data: "itemid" },
             { title: "ColorId", data: "colorid" },
             { title: "SizeId", data: "sizeid" },
             { title: "PurUomId", data: "uomId" },
             { title: "StockId", data: "Stockid" },
             { title: "CompId", data: "compId" },
               { title: "UnitId", data: "UnitId" },
                 { title: "StoreUnitId", data: "storeunitid" },
                    { title: "StockUomId", data: "stockuomid" },
                 {
                     title: "ACTION", "mDataProp": null,
                     "sDefaultContent": '<div style="display:inline-flex;"><button type="button" data-toggle="tooltip" data-placement="top" title="View Item" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnItemview btn btn-round btn-info"> <i class="fa fa-eye"></i> </button></div>'
                 },
        ]
    });


}

function CalcQty(Val) {

    debugger;



    index;

    var currentrowoftcpi = RItemList.slice(index);

    var SKId = currentrowoftcpi[0].Stockid;
    var IId = currentrowoftcpi[0].itemid;
    var CId = currentrowoftcpi[0].colorid;
    var SId = currentrowoftcpi[0].sizeid;
    var PUId = currentrowoftcpi[0].uomId;
    var TransNo = currentrowoftcpi[0].transno;

    var ratecal = Val;


    $.each(RItemList, function () {
        if (this.Stockid == SKId && this.itemid == IId && this.colorid == CId && this.sizeid == SId && this.uomId == PUId && this.transno == TransNo) {

            this.Return_qty = ratecal;
        }
    });
    loadItemTable(RItemList);

    /////Load Save  Table

    $.each(RItemListSave, function () {
        if (this.Stockid == SKId && this.itemid == IId && this.colorid == CId && this.sizeid == SId && this.uomId == PUId && this.transno == TransNo) {

            this.Return_qty = Val;


        }
    });

    loadItemTableSave(RItemListSave);

}

function Save() {

    debugger;

    var res = validate();
    if (res == false) {
        return false;
    }

    if (RItemList.length == 0) {
        //alert("Please Enter the Item Details..");
        var msg = 'Please Enter the Item Details...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }
    //var comId = $('#ddlCompany').val();
    //var supId = $('#ddlSupplier').val();
    //var strId = $('#ddlAMainStore').val();


    var MSType = $('input[name="MSType"]:checked').attr('value');

    var storeunitid = 0;
    if (MSType == "S") {
        storeunitid = $('#ddlSMainStore').val();
    } else if (MSType == "M") {
        storeunitid = $('#ddlMSMMainStore').val();
    }

    if (storeunitid == 0 && validatestore == "True") {
        //alert('Please select Store..');
        var msg = 'Please select Store...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }


    var OType = $('input[name="OType"]:checked').attr('value');
    var EnType = $('input[name="PURType"]:checked').attr('value');

    debugger;
    var oldReturnNo = $('#txtEntryNo').val();

    table = "Pur_return_mas",
    column = "Return_no",
    Docum = 'PURCHASE RETURNS'
    compId = $('#ddlCompany').val();

    if (compId == null) {
        compId = DCompid;
    } else {
        compId = $('#ddlCompany').val();
    }
    CompanyId = compId;

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
                $('#txtEntryNo').val(result.Value);
            }


            var objPurSubmit = {
                CompanyID: $('#ddlCompany').val(),
                Return_no: $('#txtEntryNo').val(),
                Return_date: $('#txtEntryDate').val(),//new Date($('#txtEntryDate').val()),
                SupplierID: $('#ddlSupplier').val(),
                Remarks: $('#txtRemarks').val(),
                Ordtype: OType,
                storeid: storeunitid,
                PurOrGrn: EnType,
                // PurOrGrnNo: $('#ddlGrnNo').val(),
                PurOrGrnNo: $("#ddlGrnNo option:selected").text(),
                CreatedBy: Guserid,
                PurReturnDet: RItemListSave
            };
            debugger;
            $("#Add").attr("disabled", true);
            LoadingSymb();
            $.ajax({
                url: "/PurchaseReturnAdd/Add",
                data: JSON.stringify(objPurSubmit),
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {
                    if (result.Value == true) {
                        AddUserEntryLog('Procurement', 'Purchase Return', 'ADD', $("#txtEntryNo").val());
                        //alert("Data Saved Sucessfully");
                        //window.location.href = "/PurchaseReturnMain/PurchaseReturnMainIndex";
                        var msg = 'Data Saved Sucessfully...';
                        var flg = 1;
                        var mod = 0;
                        var url = "/PurchaseReturnMain/PurchaseReturnMainIndex";
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


function Close() {

    window.location.href = "/PurchaseReturnMain/PurchaseReturnMainIndex";
}


//Valdidation using jquery
function validate() {
    var isValid = true;

    if ($('#ddlCompany').val() == 0) {
        $('#ddlCompany').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlCompany').css('border-color', 'lightgrey');
    }
    if ($('#ddlSupplier').val() == 0) {
        $('#ddlSupplier').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlSupplier').css('border-color', 'lightgrey');
    }
    if ($('#ddlGrnNo').val() == 0) {
        $('#ddlGrnNo').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlGrnNo').css('border-color', 'lightgrey');
    }
    //if ($('#ddlMSMMainStore').val() == 0) {
    //    $('#ddlMSMMainStore').css('border-color', 'Red');
    //    isValid = false;
    //}
    //else {
    //    $('#ddlMSMMainStore').css('border-color', 'lightgrey');
    //}
    //if ($('#txtDcNo').val() == 0) {
    //    $('#txtDcNo').css('border-color', 'Red');
    //    isValid = false;
    //}
    //else {
    //    $('#txtDcNo').css('border-color', 'lightgrey');
    //}

    return isValid;
}

//////////////////////Edit Case//////////////////////////////////

function LoadPurRetEditDetails(RetMasId) {
    LoadCompanyDDL("#ddlCompany,#ddlACompany");
    LoadOrderNoDDL("#ddlOrderNo");
    LoadSupplierDDL("#ddlSupplier");
    LoadStyleDDL("#ddlStyle");
    LoadJobNoDDL("#ddlWorkOrdNo");
    LoadPurOrdNoDDL("#ddlGrnNo");
    LoadGrnNoDDL("#ddlGrnNo");

    LoadStoreUnitDDL("#ddlAMainStore");

    $.ajax({
        url: "/PurchaseReturnAdd/GetReturnDetails",
        data: JSON.stringify({ Return_ID: RetMasId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            debugger;
            if (obj != undefined) {
                $('#ddlOrderNo').val(obj[0]["Buy_Mas_Id"]).trigger('change');
                $('#ddlSupplier').val(obj[0]["SupplierID"]).trigger('change');
                ////$('#txtDcDate').val(obj[0]["Dc_date"]);
                $('#txtEntryDate').val(moment(obj.Return_date).format('DD/MM/YYYY'));
                $('#txtEntryNo').val(obj[0]["Return_no"]);
                $('#txtEntryId').val(obj[0]["Return_ID"]);
                $('#ddlStyle').val(obj[0]["StyleId"]).trigger('change');
                $('#ddlWorkOrdNo').val(obj[0]["JobNoId"]).trigger('change');
                $('#ddlCompany').val(obj[0]["CompanyID"]).trigger('change');
                $('#ddlACompany').val(obj[0]["CompanyID"]).trigger('change');
                $('#ddlGrnNo').val(obj[0]["PurOrGrnNoId"]).trigger('change');
                $('#ddlAMainStore').val(obj[0]["storeid"]).trigger('change');
           
                var OType = obj[0]["Ordtype"];
                var EType = obj[0]["PurOrGrn"];

                CompanyId = obj[0]["CompanyID"];
                if (OType == "B") {


                    $("#optO").prop("checked", true);
                    $("#optG").prop("checked", false);


                    $("#optW").prop("checked", true);
                    $("#optS").prop("checked", false);
                    $("#optSl").prop("checked", false);

                } else if (OType == "S") {


                    $("#optO").prop("checked", true);
                    $("#optG").prop("checked", false);


                    $("#optW").prop("checked", false);
                    $("#optS").prop("checked", true);
                    $("#optSl").prop("checked", false);

                } else if (OType == "G") {

                    $("#optO").prop("checked", false);
                    $("#optG").prop("checked", true);


                    $('#ddlOrderNo').val("");
                    $('#ddlWorkOrdNo').val("");
                    $('#ddlStyle').val("");

                    //$("#optAuto").attr('disabled', true);
                    $("#ddlOrderNo").prop("disabled", true);
                    $("#ddlWorkOrdNo").prop("disabled", true);
                    $("#ddlStyle").prop("disabled", true);
                    //$("#optAuto").attr('disabled', true);
                    //$("#ddlOrdNo").prop("disabled", true);
                    //$("#ddlBuyer").prop("disabled", true);
                    //$("#txtQty").prop("disabled", true);
                    //$("#txtRefNo").prop("disabled", true);
                    //$('#ddlOrdNo').val("");
                    //$('#ddlBuyer').val("");
                    //$('#txtQty').val("");
                    //$('#txtRefNo').val("");
                    //$("#ddlOrderNo").prop("disabled", true);

                }


                if (obj[0]["Storetype"] == 'SS') {
                    $('#optSS').prop('checked', true);
                    LoadSubStore();
                    editsubmasunitstore = obj[0]["ParentUnitid"];
                    editsubstore = obj[0]["storeid"];
                    editmasunitstore = 0;
                }
                else {
                    $('#optMS').prop('checked', true);
                    LoadMainStore();
                    editmasunitstore = obj[0]["storeid"];
                    editsubmasunitstore = 0;
                    editsubstore = 0;
                }
                LoadEmployeeStoreunit();
                LoadUserCompanyDDL();


                //  $('#txtTaxPer').val(obj[0]["StoreUnitID"]);     



                //if (Mode == 1 || Mode == 2) {
                //    LoadGrnItemDetailsEdit(GrnMasId, SupplierId, CompId);
                //}
                LoadEditGrid();
            }
            else {

            }
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


    if (RItemList.length == 0) {
        //alert("Please Enter the Item Details..");
        var msg = 'Please Enter the Item Details...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    //var comId = $('#ddlCompany').val();
    //var supId = $('#ddlSupplier').val();
    //var strId = $('#ddlAMainStore').val();
    var MSType = $('input[name="MSType"]:checked').attr('value');

    var storeunitid = 0;
    if (MSType == "S") {
        storeunitid = $('#ddlSMainStore').val();
    } else if (MSType == "M") {
        storeunitid = $('#ddlMSMMainStore').val();
    }

    if (storeunitid == 0 && validatestore == "True") {
        //alert('Please select Store..');
        var msg = 'Please select Store...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    var OType = $('input[name="OType"]:checked').attr('value');
    var EnType = $('input[name="PURType"]:checked').attr('value');

    var objPurSubmit = {

        CompanyID: $('#ddlCompany').val(),
        Return_no: $('#txtEntryNo').val(),
        Return_date: $('#txtEntryDate').val(),//new Date($('#txtEntryDate').val()),
        SupplierID: $('#ddlSupplier').val(),
        Remarks: $('#txtRemarks').val(),
        Ordtype: OType,
        storeid: storeunitid,
        PurOrGrn: EnType,
        // PurOrGrnNo: $('#ddlGrnNo').val(),
        PurOrGrnNo: $("#ddlGrnNo option:selected").text(),
        CreatedBy: Guserid,
        Return_ID: PurRetId,
        PurReturnDet: RItemListSave

    };
    debugger;
    $("#Update").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/PurchaseReturnAdd/Update",
        data: JSON.stringify(objPurSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == true) {
                AddUserEntryLog('Procurement', 'Purchase Return', 'UPDATE', $("#txtEntryNo").val());
                //alert("Data Updated Sucessfully");
                //window.location.href = "/PurchaseReturnMain/PurchaseReturnMainIndex";
                var msg = 'Data Updated Sucessfully...';
                var flg = 1;
                var mod = 0;
                var url = "/PurchaseReturnMain/PurchaseReturnMainIndex";
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

    var res = validate();
    if (res == false) {
        return false;
    }


    if (RItemList.length == 0) {
        //alert("Please Enter the Item Details..");
        var msg = 'Please Enter the Item Details...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    //var comId = $('#ddlCompany').val();
    //var supId = $('#ddlSupplier').val();
    //var strId = $('#ddlAMainStore').val();
    var OType = $('input[name="OType"]:checked').attr('value');
    var EnType = $('input[name="PURType"]:checked').attr('value');

    var objPurSubmit = {

        CompanyID: $('#ddlCompany').val(),
        Return_no: $('#txtEntryNo').val(),
        Return_date: $('#txtEntryDate').val(),//new Date($('#txtEntryDate').val()),
        SupplierID: $('#ddlSupplier').val(),
        Remarks: $('#txtRemarks').val(),
        Ordtype: OType,
        storeid: $('#ddlAMainStore').val(),
        PurOrGrn: EnType,
        // PurOrGrnNo: $('#ddlGrnNo').val(),
        PurOrGrnNo: $("#ddlGrnNo option:selected").text(),
        CreatedBy: Guserid,
        Return_ID: PurRetId,
        PurReturnDet: RItemListSave

    };
    debugger;
    $("#Delete").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/PurchaseReturnAdd/Delete",
        data: JSON.stringify(objPurSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
       
            if (result.Value == true) {
                AddUserEntryLog('Procurement', 'Purchase Return', 'DELETE', $("#txtEntryNo").val());
                //alert("Data Deleted Sucessfully");
                //window.location.href = "/PurchaseReturnMain/PurchaseReturnMainIndex";
                var msg = 'Data Deleted Sucessfully...';
                var flg = 2;
                var mod = 0;
                var url = "/PurchaseReturnMain/PurchaseReturnMainIndex";
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


//function LoadFOrdDropDetails() {


//    var BMasId = $('#ddlFOrderNo').val();
//    var JbId = $('#ddlFWorkNo').val();
//    var StyId = $('#ddlFStyle').val();
//    var RefNo = "";
//    var RNo = $('select#ddlFRefNo option:selected').val();

//    if (RNo == 0) {
//        RefNo == "";
//    }
//    else {

//        RefNo = $('select#ddlFRefNo option:selected').val();
//    }

//    $.ajax({
//        url: "/StockAuditEntry/GetDropNo",
//        data: JSON.stringify({ BMasId: BMasId, JobId: JbId, Styleid: StyId, RefNo: RefNo }),
//        type: "POST",
//        contentType: "application/json;charset=utf-8",
//        dataType: "json",

//        success: function (result) {
//            var obj = result.Value;
//            if (result.Status == 'SUCCESS') {

//                var data = result.Value;


//                //RefNo
//                $(ddlFRefNo).empty();
//                $(ddlFRefNo).append($('<option/>').val('0').text('--Select RefNo--'));
//                $.each(data, function () {
//                    $(ddlFRefNo).append($('<option></option>').text(this.RefNo));
//                });

//                //JobNo
//                $(ddlFWorkNo).empty();
//                $(ddlFWorkNo).append($('<option/>').val('0').text('--Select JobNo--'));
//                $.each(data, function () {
//                    $(ddlFWorkNo).append($('<option></option>').val(this.JobId).text(this.Job_Ord_no));
//                });

//                //Style
//                $(ddlFStyle).empty();
//                $(ddlFStyle).append($('<option/>').val('0').text('--Select Style--'));
//                $.each(data, function () {
//                    $(ddlFStyle).append($('<option></option>').val(this.Styleid).text(this.Style));
//                });
//            }


//        }

//    });

//}

function LoadMainStore() {
    $("#SubStoreId").hide();
    $("#SecStoId").hide();
    $("#MainStoreId").show();
    //LoadStoreUnitDDL("#ddlMSMMainStore");
    //LoadCompanyDDL("#ddlMSCompany");
}
function LoadSubStore() {
    $("#SecStoId").hide();
    $("#MainStoreId").hide();
    $("#SubStoreId").show();
    $("#SubStorPrdId").hide();
    //LoadCompanyDDL("#ddlSCompany");
    //LoadStoreUnitDDL("#ddlSMainStore");
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
            $(ddlMSMMainStore).empty();
            $(ddlMSMMainStore).append($('<option/>').val('0').text('--Select Store--'));
            $.each(data, function () {
                $(ddlMSMMainStore).append($('<option></option>').val(this.Storeid).text(this.StoreName));
            });
            $(ddlMSMMainStore).trigger("select2:updated");

            $(ddlSCompany).empty();
            $(ddlSCompany).append($('<option/>').val('0').text('--Select Store--'));
            $.each(data, function () {
                $(ddlSCompany).append($('<option></option>').val(this.Storeid).text(this.StoreName));
            });
            $(ddlSCompany).trigger("select2:updated");

            if (editsubmasunitstore > 0) {
                $('#ddlSCompany').val(editsubmasunitstore).trigger('change');
            }
            if (editmasunitstore > 0) {
                $('#ddlMSMMainStore').val(editmasunitstore).trigger('change');
            }
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

    $.ajax({
        url: "/StoreSetup/GetStoreRights",
        data: JSON.stringify({ Userid: LoginUserid, Storetype: 'B', Companyid: CompanyId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var data = result.Value;
            $(ddlSMainStore).empty();
            $(ddlSMainStore).append($('<option/>').val('0').text('--Select Store--'));
            $.each(data, function () {
                $(ddlSMainStore).append($('<option></option>').val(this.Storeid).text(this.StoreName));
            });
            $(ddlSMainStore).trigger("select2:updated");
            if (editsubstore > 0) {
                $('#ddlSMainStore').val(editsubstore).trigger('change');
            }
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

        $(ddlMSCompany).empty();
        // $(ddlMSCompany).append($('<option/>').val('0').text('--Select Company--'));
        $.each(comp, function () {
            $(ddlMSCompany).append($('<option></option>').val(this.CompanyId).text(this.CompanyName));
        });
        $(ddlMSCompany).trigger("select2:updated");
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

