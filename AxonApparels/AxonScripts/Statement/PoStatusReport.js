var ordNoDDL = "#";
var MainFDate = 0;
var MOrd = 0;
var Mref = 0;
var ordlist = [];
$(document).ready(function () {

    MainFDate = $("#hdMainFromDate").data('value');
    LoadCompanyDDL("#ddlMCompany");
   // LoadSupplierDDL("#ddlMSupplier");
    LoadBuyerDDL("#ddlMBuyer");
    LoadEmployeeDDL("#ddlMerchandise,#ddlMerchan");
    LoadOrderNoDDL("#ddlMOrderNo");
    LoadRefNoDDL("#ddlMtRefNo");
    LoadItemGroupDDL("#ddlMItemGroup");
    //LoadStyleDDL("#ddlMStyle");
    LoadColorDDL("#ddlMColor");
    LoadItemDDL("#ddlMItem,#ddlMItem1");

    getDate();
    //ListOrRefNo();
    ListPStyle();
    ListPoNo();
    ListSupplierNo();
});

function LoadReport() {
    debugger;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var SuppID = $('#ddlMSupplier').val();
    var CmpID = $('#ddlMCompany').val();
    //var OrdNo = $('#ddlMOrderNo option:selected').text();
    //var RefNo = $('#ddlMRefNo option:selected').text();
    var OrdNo = MOrd;
    var RefNo = Mref;
    //var OrdNo = "";
    //var ONo = $('select#ddlMOrderNo option:selected').val();

    //if (ONo == 0) {
    //    OrdNo == "";
    //}
    //else {

    //    OrdNo = $('select#ddlMOrderNo option:selected').text();
    //}

    //var RefNo = "";
    //var RNo = $('select#ddlMRefNo option:selected').val();

    //if (RNo == 0) {
    //    RefNo == "";
    //}
    //else {

    //    RefNo = $('select#ddlMRefNo option:selected').text();
    //}

    //var PoNo = $('#ddlMPONo option:selected').text();

    var PoNo = "";
    var PNo = $('select#ddlMPONo option:selected').val();

    if (PNo == 0) {
        PoNo == "";
    }
    else {

        PoNo = $('select#ddlMPONo option:selected').text();
    }

    var StyID = $('#ddlMStyle').val();
    var LType = $('input[name="MLocal"]:checked').attr('value');
    var OType = $('input[name="MOType"]:checked').attr('value');
    var POType = $('input[name="PoType"]:checked').attr('value');

    window.open("../Reports/Stores/PoStatusReport.aspx?CompanyID=" + CmpID + "&OrderNo=" + OrdNo + "&RefNo=" + RefNo + "&StyID=" + StyID + "&SuppID=" + SuppID + "&PoNo=" + PoNo + "&FromDate=" + FDate + "&ToDate=" + TDate + "&OType=" + OType + "&POType=" + POType + "&LType=" + LType);
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


function ListOrRefNo() {
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var LType = $('input[name="MLocal"]:checked').attr('value');
    var OType = $('input[name="MOType"]:checked').attr('value');
    var POType = $('input[name="PoType"]:checked').attr('value');
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
                ordlist = result.Value;;

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
                $(ddlMtRefNo).empty();
               

                //OrdNo
                $(ddlMOrderNo).append($('<option/>').val('0').text('--Select OrderNo--'));
                $.each(ord, function () {
                    //$(ddlMtOrderNo).append($('<option></option>').text(this.OrderNo));

                     $(ddlMOrderNo).append($('<option></option>').val(this.BMasId).text(this.OrderNo));
                });
                //RefNo
                $(ddlMtRefNo).append($('<option/>').val('0').text('--Select RefNo--'));
                $.each(ref, function () {
                    //$(ddlMRefNo).append($('<option></option>').text(this.RefNo));
                    $(ddlMtRefNo).append($('<option></option>').val(this.BMasId).text(this.RefNo));
                });
               

            }
        }

    });
}

function ListPStyle() {
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var LType = $('input[name="MLocal"]:checked').attr('value');
    var OType = $('input[name="MOType"]:checked').attr('value');
    var POType = $('input[name="PoType"]:checked').attr('value');
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

function ListSupplierNo() {
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var LType = $('input[name="MLocal"]:checked').attr('value');
    var OType = $('input[name="MOType"]:checked').attr('value');
    var POType = $('input[name="PoType"]:checked').attr('value');
    $.ajax({
        url: "/PurchaseOrderMain/GetSupplier",
        data: JSON.stringify({ LocalImport: LType, Purchase_Type: OType, Purchase_ItemType: POType, FrmDate: FDate, ToDate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        //success: function (json) {
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;

                var supdet = {};
                var sup = [];


                $.each(obj, function (i, el) {

                    if (!supdet[el.SupplierId]) {
                        supdet[el.SupplierId] = true;
                        sup.push(el);
                    }


                });

                $(ddlMSupplier).empty();

                $(ddlMSupplier).append($('<option/>').val('0').text('--Select Supplier--'));
                $.each(sup, function () {
                    $(ddlMSupplier).append($('<option></option>').val(this.SupplierId).text(this.Supplier));
                });
              

            }
        }

    });
}

function ListPoNo() {
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var LType = $('input[name="MLocal"]:checked').attr('value');
    var OType = $('input[name="MOType"]:checked').attr('value');
    var POType = $('input[name="PoType"]:checked').attr('value');
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

                $(ddlMPONo).empty();

                //Po No
                $(ddlMPONo).append($('<option/>').val('0').text('--Select PoNo--'));
                $.each(po, function () {
                    $(ddlMPONo).append($('<option></option>').val(this.pur_ord_id).text(this.pur_ord_no));
                });


            }
        }

    });
}


function RadioMBClick() {          
        ListOrRefNo();
        ListPStyle();
        ListPoNo();
        ListSupplierNo();   

}

function RadioMAClick() {
    ListOrRefNo();
    ListPStyle();
    ListPoNo();
    ListSupplierNo();
}

function RadioMLClick() {
    ListOrRefNo();
    ListPStyle();
    ListPoNo();
    ListSupplierNo();
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
    $('#ddlMtRefNo :selected').each(function (i, selected) {
        foo[i] = $(selected).val();

        Mref = Mref + "," + foo[i];


    });

}
