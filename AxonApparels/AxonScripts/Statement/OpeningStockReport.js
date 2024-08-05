var ordNoDDL = "#";
var MainFDate = 0;
var MOrd = 0;
var Mref = 0;
$(document).ready(function () {

    //$("#txtFromDate").val(moment(new Date()).format('DD/MM/YYYY'));
    //$("#txtToDate").val(moment(new Date()).format('DD/MM/YYYY'));    
    MainFDate = $("#hdMainFromDate").data('value');
    LoadCompanyDDL("#ddlMCompany");
    LoadSupplierDDL("#ddlManufacturer,#ddlMSupplier");
    LoadBuyerDDL("#ddlMBuyer");
    LoadEmployeeDDL("#ddlMerchandise,#ddlMerchan");
    // LoadOrderNoDDL("#ddlMOrderNo");
    LoadItemGroupDDL("#ddlItemGroup");
    LoadStyleDDL("#ddlMStyle");
    LoadColorDDL("#ddlMColor");
    LoadItemDDL("#ddlMItem");
    LoadStoreUnitDDL("#ddlGodown");
    LoadSizeDDL("#ddlSize");
    LoadProcessDDL("#ddlProcess");
    LoadCompanyUnitDDL("#ddlMUnit");
    getDate();
    LoadOrd();
    ListGrnNo();
});

function LoadReport() {
    debugger;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var SuppID = $('#ddlMSupplier').val();
    var CmpID = $('#ddlMCompany').val();
    var ManuID = $('#ddlManufacturer').val();
    var StyID = $('#ddlMStyle').val();
    var ColID = $('#ddlMColor').val();
    var ItmID = $('#ddlMItem').val();

    var OrdNo = MOrd;
    //var OrdNo = "";
    //var ONo = $('select#ddlOrderNo option:selected').val();

    //if (ONo == 0) {
    //    OrdNo == "";
    //}
    //else {

    //    OrdNo = $('select#ddlOrderNo option:selected').text();
    //}


    var ItmGrp = "";
    var ItGrp = $('select#ddlItemGroup option:selected').val();

    if (ItGrp == 0) {
        ItmGrp == "";
    }
    else {

        ItmGrp = $('select#ddlItemGroup option:selected').text();
    }

    var OrdRefNo = Mref;
    //var OrdRefNo = "";
    //var OrRefNo = $('select#ddlRefNo option:selected').val();

    //if (OrRefNo == 0) {
    //    OrdRefNo == "";
    //}
    //else {

    //    OrdRefNo = $('select#ddlRefNo option:selected').text();
    //}
    
    var StorID = $('#ddlGodown').val();
    var OType = $('input[name="proctype"]:checked').attr('value');

    window.open("../Reports/Stores/OpeningStockReport.aspx?CompanyID=" + CmpID + "&SupplierID=" + SuppID + "&ManuID=" + ManuID + "&StyID=" + StyID + "&ColID=" + ColID + "&StyleID=" + StyID + "&ItmID=" + ItmID + "&OrdNo=" + OrdNo + "&ItmGrp=" + ItmGrp + "&OrdRefNo=" + OrdRefNo + "&StorID=" + StorID + "&FromDate=" + FDate

      + "&ToDate=" + TDate + "&OrdType=" + OType);
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
    var protype = $('input[name="proctype"]:checked').attr('value');
    $("#ddlRefNo").empty();
    if (protype == 'B') {
        LoadBulkOrderNoDDL("#ddlOrderNo");
        LoadBulkRefNoDDL("#ddlRefNo");
    }
    if (protype == 'S') {
        LoadSampOrderNoDDL("#ddlOrderNo");
        LoadSampleRefNoDDL("#ddlRefNo");

    }
    if (protype == 'A') {
        LoadOrderNoDDL("#ddlOrderNo");
        LoadRefNoDDL("#ddlRefNo");

    }
}

function RadioMBClick() {
    LoadOrd();
}

function ListGrnNo() {
    //var FDate = $('#txtFromDate').val();
    //var TDate = $('#txtToDate').val();
    //var LType = $('input[name="MLocal"]:checked').attr('value');
    //var OType = $('input[name="otype"]:checked').attr('value');
    //var POType = $('input[name="proctype"]:checked').attr('value');
    $.ajax({
        url: "/GRNMain/GetStkGrnNo",
        data: JSON.stringify({}),
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

                    if (!podet[el.transno]) {
                        podet[el.transno] = true;
                        po.push(el);
                    }


                });

                $("#ddlGRNno").empty();

                //Po No
                $("#ddlGRNno").append($('<option/>').val('0').text('--Select Grn No--'));
                $.each(po, function () {
                    $("#ddlGRNno").append($('<option></option>').text(this.transno));
                });


            }
        }

    });
}
function myOrder(Val) {
    debugger;
    var foo = [];
    MOrd = 0;
    $('#ddlOrderNo :selected').each(function (i, selected) {
        foo[i] = $(selected).val();

        MOrd = MOrd + "," + foo[i];


    });

}
function myRef(Val) {
    debugger;
    var foo = [];
    Mref = 0;
    $('#ddlRefNo :selected').each(function (i, selected) {
        foo[i] = $(selected).val();

        Mref = Mref + "," + foo[i];


    });

}
