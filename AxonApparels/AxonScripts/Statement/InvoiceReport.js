var ordNoDDL = "#";
var MainFDate = 0;
var MOrd = 0;
var Mref = 0;
$(document).ready(function () {
    MainFDate = $("#hdMainFromDate").data('value');
    //$("#txtFromDate").val(moment(new Date()).format('DD/MM/YYYY'));
    //$("#txtToDate").val(moment(new Date()).format('DD/MM/YYYY'));    
    LoadCompanyDDL("#ddlMCompany");
    LoadSupplierDDL("#ddlMSupplier");
    LoadBuyerDDL("#ddlMBuyer");
    LoadEmployeeDDL("#ddlMerchandise,#ddlMerchan");
    LoadBulkOrderNoDDL("#ddlMOrderNo");
    LoadItemGroupDDL("#ddlMItemGroup");
    LoadStyleDDL("#ddlMStyle");
    LoadColorDDL("#ddlMColor");
    LoadItemDDL("#ddlMItem,#ddlMItem1");
    LoadBulkRefNoDDL("#ddlMRefNo");
    LoadSeasonDDL("#ddlMSeason");
    getDate();
    ListPoNo();
    ListSuppDcInv();
});

function LoadReport() {
    debugger;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var SuppID = $('#ddlMSupplier').val();
    var CmpID = $('#ddlMCompany').val();
    var BuyID = $('#ddlMBuyer').val();
    var ClrID = $('#ddlMColor').val();
    var ItmId = $('#ddlMItem').val();
    //var OrdNo = $('#ddlMOrderNo option:selected').text();
    var OrdNo = MOrd;
    //var OrdNo = "";
    //var ONo = $('select#ddlMOrderNo option:selected').val();

    //if (ONo == 0) {
    //    OrdNo == "";
    //}
    //else {

    //    OrdNo = $('select#ddlMOrderNo option:selected').text();
    //}


    var PoNo = "";
    var PNo = $('select#ddlMPurOrdNo option:selected').val();

    if (PNo == 0) {
        PoNo == "";
    }
    else {

        PoNo = $('select#ddlMPurOrdNo option:selected').text();
    }
    var OrdRefNo = Mref;

    //var OrdRefNo = "";
    //var OrRefNo = $('select#ddlMRefNo option:selected').val();

    //if (OrRefNo == 0) {
    //    OrdRefNo == "";
    //}
    //else {

    //    OrdRefNo = $('select#ddlMRefNo option:selected').text();
    //}

    var DcNo = "";
    var DNo = $('select#ddlMDCNo option:selected').val();

    if (DNo == 0) {
        DcNo == "";
    }
    else {

        DcNo = $('select#ddlMDCNo option:selected').text();
    }


    var InvcNo = "";
    var InNO = $('select#ddlMInvoiceNo option:selected').val();

    if (InNO == 0) {
        InvcNo == "";
    }
    else {

        InvcNo = $('select#ddlMInvoiceNo option:selected').text();
    }


    var StyID = $('#ddlMStyle').val();
    //var OrdType = $('#ddlMOrderType').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var OType = $('input[name="otype"]:checked').attr('value');
    var POType = $('input[name="proctype"]:checked').attr('value');

    window.open("../Reports/Stores/InvoiceReport.aspx?CompanyID=" + CmpID + "&SupplierID=" + SuppID + "&BuyerID=" + BuyID + "&ColorID=" + ClrID + "&OrderNo=" + OrdNo + "&StyleID=" + StyID + "&ItemID=" + ItmId + "&FromDate=" + FDate + "&ToDate=" + TDate + "&OType=" + OType + "&POType=" + POType + "&PoNo=" + PoNo + "&OrdRefNo=" + OrdRefNo

        + "&DcNo=" + DcNo + "&InvcNo=" + InvcNo);
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
    $('#txtFromDate').val(MainFDate);
    $('#txtToDate').val(Fdatestring);

}


function LoadOrd() {
    debugger;
    var protype = $('input[name="otype"]:checked').attr('value');
    $("#ddlMRefno").empty();
    if (protype == 'B') {
        LoadBulkOrderNoDDL("#ddlMOrderNo");
        LoadBulkRefNoDDL("#ddlMRefNo");
    }
    if (protype == 'S') {
        LoadSampOrderNoDDL("#ddlMOrderNo");
        LoadSampleRefNoDDL("#ddlMRefNo");

    }
    if (protype == 'A') {
        LoadOrderNoDDL("#ddlMOrderNo");
        LoadRefNoDDL("#ddlMRefNo");

    }
}

function ListPoNo() {
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var LType = $('input[name="MLocal"]:checked').attr('value');
    var OType = $('input[name="otype"]:checked').attr('value');
    var POType = $('input[name="proctype"]:checked').attr('value');
    $.ajax({
        url: "/PurchaseOrderMain/GetPoNo",
        data: JSON.stringify({ LocalImport: LType, Purchase_Type: OType, Purchase_ItemType: POType, FrmDate: FDate, ToDate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        //success: function (json) {
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;


                var podet = {};
                var po = [];


                $.each(obj, function (i, el) {

                    if (!podet[el.pur_ord_no]) {
                        podet[el.pur_ord_no] = true;
                        po.push(el);
                    }


                });

                $("#ddlMPurOrdNo").empty();

                //Po No
                $("#ddlMPurOrdNo").append($('<option/>').val('0').text('--Select PoNo--'));
                $.each(po, function () {
                    $("#ddlMPurOrdNo").append($('<option></option>').val(this.pur_ord_id).text(this.pur_ord_no));
                });


            }
        }

    });
}


function RadioMBClick() {
    debugger;
    ListOrRefNo();
    LoadOrd();
    ListPStyle();
    ListPoNo();
    ListSuppDcInv()

}

function RadioMAClick() {
    debugger;
    LoadOrd();
    ListPStyle();
    ListPoNo();
    ListSuppDcInv()
}

function RadioMLClick() {
    debugger;
    LoadOrd();
    ListPStyle();
    ListPoNo();
    ListSuppDcInv()
}


function ListOrRefNo() {
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var LType = $('input[name="MLocal"]:checked').attr('value');
    var OType = $('input[name="otype"]:checked').attr('value');
    var POType = $('input[name="proctype"]:checked').attr('value');
    $.ajax({
        url: "/PurchaseOrderMain/GetOrderRefNo",
        data: JSON.stringify({ LocalImport: LType, Purchase_Type: OType, Purchase_ItemType: POType, FrmDate: FDate, ToDate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        //success: function (json) {
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;


                var orddet = {};
                var ord = [];
                var refdet = {};
                var ref = [];

                $.each(obj, function (i, el) {

                    if (!orddet[el.OrderNo]) {
                        orddet[el.OrderNo] = true;
                        ord.push(el);
                    }
                    if (!refdet[el.RefNo]) {
                        refdet[el.RefNo] = true;
                        ref.push(el);
                    }


                });

                $(ddlMOrderNo).empty();
                $(ddlMRefNo).empty();


                //OrdNo
                $(ddlMOrderNo).append($('<option/>').val('0').text('--Select OrderNo--'));
                $.each(ord, function () {
                    $(ddlMOrderNo).append($('<option></option>').text(this.OrderNo));

                    // $(buyerDDL).append($('<option></option>').val(this.BuyerId).text(this.BuyerName));
                });
                //RefNo
                $(ddlMRefNo).append($('<option/>').val('0').text('--Select RefNo--'));
                $.each(ref, function () {
                    $(ddlMRefNo).append($('<option></option>').text(this.RefNo));
                });


            }
        }

    });
}


function ListPStyle() {
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var LType = $('input[name="MLocal"]:checked').attr('value');
    var OType = $('input[name="otype"]:checked').attr('value');
    var POType = $('input[name="proctype"]:checked').attr('value');
    $.ajax({
        url: "/PurchaseOrderMain/GetOrderStyle",
        data: JSON.stringify({ LocalImport: LType, Purchase_Type: OType, Purchase_ItemType: POType, FrmDate: FDate, ToDate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        //success: function (json) {
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;

                var stydet = {};
                var sty = [];


                $.each(obj, function (i, el) {

                    if (!stydet[el.StyleId]) {
                        stydet[el.StyleId] = true;
                        sty.push(el);
                    }


                });

                $(ddlMStyle).empty();

                $(ddlMStyle).append($('<option/>').val('0').text('--Select Style--'));
                $.each(sty, function () {
                    $(ddlMStyle).append($('<option></option>').val(this.StyleId).text(this.Style));
                });


            }
        }

    });
}

function LoadOrd() {
    debugger;
    var protype = $('input[name="MOType"]:checked').attr('value');
    //$("#ddlMRefno").empty();
    if (protype == 'B') {
        LoadBulkOrderNoDDL("#ddlMOrderNo");
        //LoadBulkRefNoDDL("#ddlMRefno");
        // ddlmain();
    }
    if (protype == 'S') {
        LoadSampOrderNoDDL("#ddlMOrderNo");
        //LoadSampleRefNoDDL("#ddlMRefno");
        // ddlmain();
    }
    if (protype == 'A') {
        LoadOrderNoDDL("#ddlMOrderNo");
        //LoadRefNoDDL("#ddlMRefno");
        //ddlmain();
    }
}


function ListSuppDcInv() {
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var OrType = $('input[name="otype"]:checked').attr('value');
    var CompId = $('#ddlMCompany').val();
    var SuppId = $('#ddlMSupplier').val();


    var OrdNo = "";
    var ONo = $('select#ddlMOrderNo option:selected').val();

    if (ONo == 0) {
        OrdNo == "";
    }
    else {

        OrdNo = $('select#ddlMOrderNo option:selected').val();
    }

    $.ajax({
        url: "/PurchaseInvoice/GetInvSDcNo",
        data: JSON.stringify({ OType: OrType, company_id: CompId, supplierid: SuppId, OrdNo: OrdNo, FromDate: FDate, ToDate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {
                var data = result.Value;
                $(ddlMDCNo).empty();
                $(ddlMInvoiceNo).empty();
                $(ddlMDCNo).append($('<option/>').val('0').text('--Select Dc No--'));
                $.each(data, function () {
                    $(ddlMDCNo).append($('<option></option>').val(this.pur_invid).text(this.supp_inv_no));
                });
                //invno
                $(ddlMInvoiceNo).append($('<option/>').val('0').text('--Select InvoiceNo--'));
                $.each(data, function () {
                    $(ddlMInvoiceNo).append($('<option></option>').val(this.pur_invid).text(this.invoice_no));
                });


            }
        }

    });
}

function myOrder(Val) {
    debugger;
    var foo = [];
    MOrd = 0;
    $('#ddlMOrderNo :selected').each(function (i, selected) {
        foo[i] = $(selected).val();

        MOrd = MOrd + "," + foo[i];


    });

}
function myRef(Val) {
    debugger;
    var foo = [];
    Mref = 0;
    $('#ddlMRefNo :selected').each(function (i, selected) {
        foo[i] = $(selected).val();

        Mref = Mref + "," + foo[i];


    });

}