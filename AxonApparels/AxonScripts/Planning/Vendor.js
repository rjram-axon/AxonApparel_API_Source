
var refNoDDL = "#";
var ordNoDDL = "#";
var venNoDDL = "#";
var QMID = 0;
var MainFDate = 0;
$(document).ready(function () {
    //LoadBuyerDDL("#ddlMBuyer");
    //LoadCompanyDDL("#ddlMCompany");
    MainFDate = $("#hdMainFromDate").data('value');
    
    getDate();
    LoadCompanyDDL("#ddlMCompany");
    LoadSupplierDDL("#ddlMSupplier");
    LoadOrdNoDDL("#ddlOrderNo");
    LoadRefNoDDL("#ddlRefNo");
    LoadVenNoDDL("#ddlEntryNo");
    MainList();
});

function LoadOrdNoDDL(OrdNoDDL) {
    ordNoDDL = OrdNoDDL;
    httpGet("/BulkOrder/GetOrderNo", onOrdNoSuccess, onOrdNoFailure);
}
function LoadRefNoDDL(RefDDLName) {
    refNoDDL = RefDDLName;
    httpGet("/BulkOrder/GetRefNo", onRefNoSuccess, onRefNoFailure);
}
function onRefNoSuccess(result) {
    if (result.Status == "SUCCESS") {
        var data = result.Value;

        var data = result.Value;
        $(refNoDDL).append($('<option/>').val('0').text('--Select Refno--'));
        $.each(data, function () {
            $(refNoDDL).append($('<option></option>').text(this.Ref_No));
        });
    }
    else {
        //alert('RefNo loading failed');
        var msg = 'Refer Number loading failed...';
        var flg = 4;
        var mode = 1;
        var url = "";
        AlartMessage(msg, flg, mode, url);
    }
}

function onRefNoFailure(result) {
    //alert('RefNo loading failed');
    var msg = 'Refer Number loading failed...';
    var flg = 4;
    var mode = 1;
    var url = "";
    AlartMessage(msg, flg, mode, url);
}
function LoadVenNoDDL(venDDLName) {
    venNoDDL = venDDLName;
    httpGet("/Vendor/GetEntryNo", onvenNoSuccess, onvenNoFailure);
}
function onvenNoSuccess(result) {
    if (result.Status == "SUCCESS") {
        var data = result.Value;

        $(venNoDDL).append($('<option/>').val('0').text('--Select EntryNo--'));
        $.each(data, function () {
            $(venNoDDL).append($('<option></option>').text(this.EntryNo));
        });
    }
    else {
        //alert('VenEntryNo loading failed');
        var msg = 'Vendor Entry Number loading failed...';
        var flg = 4;
        var mode = 1;
        var url = "";
        AlartMessage(msg, flg, mode, url);
    }
}

function onvenNoFailure(result) {
    //alert('VenEntryNo loading failed');
    var msg = 'Vendor Entry Number loading failed...';
    var flg = 4;
    var mode = 1;
    var url = "";
    AlartMessage(msg, flg, mode, url);
}
function getDate() {
    var todaydate = new Date();
    var day = todaydate.getDate();
    var Pmonth = todaydate.getMonth() - 2;
    var Cmonth = todaydate.getMonth() + 1;
    var year = todaydate.getFullYear();
    var datestring = Pmonth + "/" + day + "/" + year;
    var Fdatestring = day + "/" + Cmonth + "/" + year;
    $('#txtFromDate').val(MainFDate);
    $('#txtToDate').val(Fdatestring);
}
function onOrdNoSuccess(result) {
    if (result.Status == "SUCCESS") {
        var data = result.Value;

        var data = result.Value;
        $(ordNoDDL).append($('<option/>').val('0').text('--Select OrdNo--'));
        $.each(data, function () {
            $(ordNoDDL).append($('<option></option>').text(this.Order_No));
        });
    }
    else {
        //alert('OrderNo loading failed');
        var msg = 'Order Number loading failed...';
        var flg = 4;
        var mode = 1;
        var url = "";
        AlartMessage(msg, flg, mode, url);
    }
}

function onOrdNoFailure(result) {
    //alert('OrderNo loading failed');
    var msg = 'Order Number loading failed...';
    var flg = 4;
    var mode = 1;
    var url = "";
    AlartMessage(msg, flg, mode, url);
}
function LoadVendorEntry() {
    debugger;

    QMID = 0;
    window.location.href = "/VendorEntry/VendorEntryIndex?QMasId=" + QMID;


    //QMID = QuMasID;
    //window.location.href = "/VendorEntry/VendorEntryIndex?QMasId=" + QMID;
    // window.location.href = "/ProcessSeqMain/ProcessSeqMainIndex?StyleId=" + StyleId;
    //alert('Loading');
}

function MainList() {

    var RefNo = "";
    var RNo = $('select#ddlRefNo option:selected').val();

    if (RNo == 0) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlRefNo option:selected').val();
    }


    var OrdNo = "";
    var ONo = $('select#ddlOrderNo option:selected').val();

    if (ONo == 0) {
        OrdNo == "";
    }
    else {

        OrdNo = $('select#ddlOrderNo option:selected').val();
    }

    var QuotNo = "";
    var QNo = $('select#ddlEntryNo option:selected').val();

    if (QNo == 0) {
        QuotNo == "";
    }
    else {

        QuotNo = $('select#ddlEntryNo option:selected').val();
    }

    var cmpid = $('#ddlMCompany').val();
    var supid = $('#ddlMSupplier').val();
    // var OrdNo = $('#ddlOrderNo').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var otype = $('input[name="Otype"]:checked').attr('value');

    $.ajax({
        url: "/Vendor/ListVenDetailsMain",
        data: JSON.stringify({ Companyid: cmpid, Buy_ord_no: OrdNo, Ref_No: RefNo, EntryNo: QuotNo, Supplierid: supid, frmDate: FDate, ToDate: TDate, otype: otype }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger
            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");
            $('#tVMbody').DataTable({
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
                         { title: "Quoteid", "visible": false },
                         { title: "Supplier" },
                         { title: "Quote No" },
                         { title: "Quote Date" },
                         { title: "Entry No" },
                         { title: "Entry Date" },
                         { title: "BuyOrd General" },
                         { title: "Action" },
                ]

            });

        },

        failure: function (errMsg) {
            debugger
            alert(errMsg);
        }
    });

}


function ListDet() {
    $('#tVMbody').DataTable().destroy();
    LoadMGD();
}
function LoadMGD() {


   
    var RefNo = "";
    var RNo = $('select#ddlRefNo option:selected').val();

    if (RNo == 0) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlRefNo option:selected').val();
    }


    var OrdNo = "";
    var ONo = $('select#ddlOrderNo option:selected').val();

    if (ONo == 0) {
        OrdNo == "";
    }
    else {

        OrdNo = $('select#ddlOrderNo option:selected').val();
    }

    var QuotNo = "";
    var QNo = $('select#ddlEntryNo option:selected').val();

    if (QNo == 0) {
        QuotNo == "";
    }
    else {

        QuotNo = $('select#ddlEntryNo option:selected').val();
    }

    var cmpid = $('#ddlMCompany').val();
    var supid = $('#ddlMSupplier').val();
    // var OrdNo = $('#ddlOrderNo').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var otype = $('input[name="Otype"]:checked').attr('value');

    $.ajax({
        url: "/Vendor/ListVenDetailsMain",
        data: JSON.stringify({ Companyid: cmpid, Buy_ord_no: OrdNo, Ref_No: RefNo, EntryNo: QuotNo, Supplierid: supid, frmDate: FDate, ToDate: TDate, otype: otype }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger
            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");
            $('#tVMbody').DataTable({
                data: dataSet,
                columns: [
                         { title: "Quoteid", "visible": false },
                         { title: "Supplier" },
                         { title: "Quote No" },
                         { title: "Quote Date" },
                         { title: "Entry No" },
                         { title: "Entry Date" },
                         { title: "BuyOrd General" },
                         { title: "Action" },
                ]

            });

        },

        failure: function (errMsg) {
            debugger
            alert(errMsg);
        }
    });

}

function SMainList() {
    $('#tVMbody').DataTable().destroy();

    MainList();
}

function EMainList() {
    $('#tVMbody').DataTable().destroy();

    MainList();
}

function OMainList() {
    $('#tVMbody').DataTable().destroy();

    MainList();
}

function RMainList() {
    $('#tVMbody').DataTable().destroy();

    MainList();
}
function RadioBClick() {
    $("#ddlOrderNo").prop("disabled", true);
    $("#ddlRefNo").prop("disabled", true);
    $('#tVMbody').DataTable().destroy();
    MainList();
}
function RadioGClick() {
    $("#ddlOrderNo").prop("disabled", false);
    $("#ddlRefNo").prop("disabled", false);
    $('#tVMbody').DataTable().destroy();
    MainList();
}


function getbyID(QuMasID) {
    debugger;
    QMID = QuMasID;
    window.location.href = "/VendorEntry/VendorEntryIndex?QMasId=" + QMID;
}
function Delete(QMasID) {
    debugger;



    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/Vendor/Delete/" + QMasID,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                $('#tVMbody').DataTable().destroy();
                MainList();
                window.location.reload(true);
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }




}