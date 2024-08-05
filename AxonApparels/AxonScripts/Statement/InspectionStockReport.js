var MainFDate = 0;
$(document).ready(function () {
    LoadBulkOrderNoDDL("#ddlMOrderno");
    LoadBulkRefNoDDL("#ddlMRefno");
    LoadYarnDDL("#ddlMYarn");
    LoadFabricDDL("#ddlMFabric");
    LoadColorDDL("#ddlMColor");
    LoadSizeDDL("#ddlMSize");
    MainFDate = $("#hdMainFromDate").data('value');
    getDate();
});
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
function getDate() {
    debugger;

    var date = new Date();
    var currentMonth = date.getMonth();
    var currentDate = date.getDate();
    var currentYear = date.getFullYear();
    var d = new Date();
    var Nday = addZero(d.getDate());

    var todaydate = new Date();
    var day = todaydate.getDate();
    var Pmonth = todaydate.getMonth() - 2;
    var Cmonth = todaydate.getMonth() + 1;
    var year = todaydate.getFullYear();
    var datestring = Pmonth + "/" + day + "/" + year;
    var Fdatestring = Nday + "/" + Cmonth + "/" + year;


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
    //if ($('#ddlMRefno').val() == 0) {
    //    $('#ddlMRefno').css('border-color', 'Red');
    //    return true;
    //}
    //else {
    //    $('#ddlMRefno').css('border-color', 'lightgrey');
    //}

    var bid = $('#ddlMOrderno').val();
    var fabid = $('#ddlMFabric').val();
    var ynid = $('#ddlMYarn').val();
    var frmdate = $('#txtFromDate').val();
    var todate = $('#txtToDate').val();
    var protype = $('input[name="OrdType"]:checked').attr('value');


    var ref = $('#ddlMRefno').val();
    var clrid = $('#ddlMColor').val();
    var szid = $('#ddlMSize').val();

    window.open("../Reports/Stores/InspectionStockReport.aspx?Masid=" + bid + "&Fabid=" + fabid + "&FromDate=" +
        todate + "&ToDate=" + todate + "&Ordtype=" + protype + "&Ref=" + ref + "&Color=" + clrid + "&Size=" + szid);
}