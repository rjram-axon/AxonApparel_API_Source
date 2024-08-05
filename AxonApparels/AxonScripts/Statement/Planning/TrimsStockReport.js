var MainFDate = 0;
$(document).ready(function () {
    LoadBulkOrderNoDDL("#ddlMOrderno");
    LoadYarnDDL("#ddlMYarn");
    LoadFabricDDL("#ddlMFabric");
    LoadBuyerDDL("#ddlMBuyer");
    LoadBulkRefNoDDL("#ddlMRefno");
    LoadItemDDL("#ddlMItem");
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
    if(protype=='B'){
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
   // LoadRef();
}


//function LoadRef() {
//    debugger;
//    var protype = $('input[name="OrdType"]:checked').attr('value');
//    if (protype == 'B') {
//        LoadBulkRefNoDDL("#ddlMOrderno");
//    }
//    if (protype == 'S') {
//        LoadSampleRefNoDDL("#ddlMOrderno");
//    }
//    if (protype == 'A') {
//        LoadRefNoDDL("#ddlMOrderno");
//    }
//}
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
    var ref = $('#ddlMRefno').val();
    var buy = $('#ddlMBuyer').val();
    var itm = $('#ddlMItem').val();
    var frmdate = $('#txtFromDate').val();
    var todate = $('#txtToDate').val();
    var protype = $('input[name="OrdType"]:checked').attr('value');

    window.open("../Reports/Planning/TrimsStockReport.aspx?Masid=" + bid + "&FromDate=" + frmdate + "&ToDate=" + todate +"&Ordtype="+protype +"&Refno="+ref+"&Buyer="+buy+"&Item="+itm);
}