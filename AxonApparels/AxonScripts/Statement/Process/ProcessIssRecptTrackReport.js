var MainFDate = 0;
var MOrd = 0;
var Mref = 0;
$(document).ready(function () {
    debugger;
    //$("#txtFromDate").val(moment(new Date()).format('DD/MM/YYYY'));
    //$("#txtToDate").val(moment(new Date()).format('DD/MM/YYYY'));
    LoginUserid = $("#hdnLoginUserid").data('value');
    var protype = $('input[name="OrdType"]:checked').attr('value');
    //$("#ddlMRefno").empty();
    //if (protype == 'B') {
    //    LoadBulkOrderNoDDL("#ddlMOrderNo");
    //    LoadBulkRefNoDDL("#ddlMRefno");

    //}
    //if (protype == 'S') {
    //    LoadSampOrderNoDDL("#ddlMOrderNo");
    //    LoadSampleRefNoDDL("#ddlMRefno");

    //}
    //if (protype == 'A') {
    //    LoadOrderNoDDL("#ddlMOrderNo");
    //    LoadRefNoDDL("#ddlMRefno");

    // }
   // LoadOrd();
    LoadCompanyDDL("#ddlMCompany");
    LoadCompanyUnitDDL("#ddlMUnit");
    LoadSupplierDDL("#ddlSupplier");
    LoadBuyerDDL("#ddlMBuyer");
    LoadEmployeeDDL("#ddlMerchandise,#ddlMerchan");
    LoadBulkOrderNoDDL("#ddlMOrdno");
    LoadProcessDDL("#ddlMProcess");

    // LoadRefNoDDL("#ddlMRefno");
    LoadStyleDDL("#ddlMStyle");
    LoadColorDDL("#ddlMColor");
    LoadItemDDL("#ddlMItem,#ddlMItem1");
    LoadWorkdivisionDDL("#ddlwrkdiv");
    LoadSupplierDDL("#ddlSupplier");
    MainFDate = $("#hdMainFromDate").data('value');
    getDate();
    var protype = $('input[name="optwrkord"]:checked').attr('value');
    if (protype == 'P') {

        $('#supp').show();
        $("#wrkdiv").hide();
    }
    else if (protype == 'W') {
        $('#supp').hide();
        $("#wrkdiv").show();
    }
    LoadOrd();
});

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


function RadioMBClick() {
    var protype = $('input[name="optwrkord"]:checked').attr('value');
    if (protype == 'P') {

        $('#supp').show();
        $("#wrkdiv").hide();
    }
    else if (protype == 'W') {
        $('#supp').hide();
        $("#wrkdiv").show();
    }
}


function LoadReport() {
    debugger;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    var procid = $('#ddlMProcess').val();
    var processorid = $('#ddlSupplier').val();
    var CmpID = $('#ddlMCompany').val();
    var BuyID = $('#ddlMBuyer').val();
    var UnitID = $('#ddlMUnit').val();

    var OrdNo = MOrd;
    //var OrdNo = 0;
    //var ONo = $('select#ddlMOrdno option:selected').val();

    //if (ONo == 0) {
    //    OrdNo == 0;
    //}
    //else {

    //    OrdNo = $('select#ddlMOrdno option:selected').val();
    //}
    var RefNo = Mref;
    //var RefNo = 0;
    //var RNo = $('select#ddlMRefno option:selected').val();

    //if (RNo == 0) {
    //    RefNo == 0;
    //}
    //else {

    //    RefNo = $('select#ddlMRefno option:selected').val();
    //}


    var protype = $('input[name="OrdType"]:checked').attr('value');


    window.open("../Reports/Process/ProcessIssRecTracking/ProcessIssRptTrackingStatement.aspx?fdate=" + FDate + "&tdate=" + TDate + "&Compid=" +
        CmpID + "&processid=" + procid + "&suppid=" + processorid + "&Masid=" + OrdNo + "&Ref=" + RefNo + "&unitid=" + UnitID + "&Buyid=" + BuyID + "&Ordtype=" + protype + "&Userid=" + LoginUserid);
}
function myOrder(Val) {
    debugger;
    var foo = [];
    MOrd = 0;
    $('#ddlMOrderno :selected').each(function (i, selected) {
        foo[i] = $(selected).val();

        MOrd = MOrd + "," + foo[i];


    });

}
function myRef(Val) {
    debugger;
    var foo = [];
    Mref = 0;
    $('#ddlMRefno :selected').each(function (i, selected) {
        foo[i] = $(selected).val();

        Mref = Mref + "," + foo[i];


    });

}
