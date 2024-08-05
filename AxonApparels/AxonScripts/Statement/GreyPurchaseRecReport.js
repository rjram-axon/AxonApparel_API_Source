﻿var MainFDate = 0;
$(document).ready(function () {
    LoadBulkOrderNoDDL("#ddlMOrderno");
    LoadBulkRefNoDDL("#ddlMRefno");
    LoadYarnDDL("#ddlMSize");
    LoadFabricDDL("#ddlMFabric");
    LoadSupplierDDL("#ddlMSupplier");
    LoadColorDDL("#ddlMColor");
    //LoadSizeDDL("#ddlMSize");
    MainFDate = $("#hdMainFromDate").data('value');
    getDate();
});

function getDate() {
    debugger;

    var date = new Date();
    var currentMonth = date.getMonth();
    var currentDate = date.getDate();
    var currentYear = date.getFullYear();


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

    //alert(MainFDate + "1getdate");
    $('#txtFromDate').val(MainFDate);
    $('#txtToDate').val(Fdatestring);


}


function LoadOrd() {
    debugger;
    var protype = $('input[name="OrdType"]:checked').attr('value');
    $("#ddlMRefno").empty();
    if (protype == 'B') {
        LoadBulkOrderNoDDL("#ddlMOrderno");
        LoadBulkRefNoDDL("#ddlMRefno");

    }
    if (protype == 'S') {
        LoadSampOrderNoDDL("#ddlMOrderno");
        LoadSampleRefNoDDL("#ddlMRefno");

    }
    if (protype == 'A') {
        LoadOrderNoDDL("#ddlMOrderno");
        LoadRefNoDDL("#ddlMRefno");

    }
}


function LoadReport() {
    debugger;
   

    var bid = $('#ddlMOrderno').val();
    var fabid =  $('#ddlMFabric').val();
    var ynid = $('#ddlMSize').val();
    var frmdate = $('#txtFromDate').val();
    var todate = $('#txtToDate').val();
   
    var ref = $('#ddlMRefno').val();
    var clr = $('#ddlMColor').val();
    var size = $('#ddlMSize').val();
    var supp = $('#ddlMSupplier').val();
    var protype = $('input[name="OrdType"]:checked').attr('value');

    window.open("../Reports/Stores/GreyPurchaseRecRpt.aspx?Masid=" + bid + "&Fabid=" + fabid + "&FromDate=" + todate + "&ToDate=" + todate
     + "&Ordtype=" + protype + "&Ref=" + ref + "&Color=" + clr + "&Size=" + ynid + "&Supplier=" + supp);
}