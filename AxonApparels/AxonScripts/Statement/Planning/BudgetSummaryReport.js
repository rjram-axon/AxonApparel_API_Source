var MainFDate = 0;
var MOrd = 0;
var Mref = 0;
$(document).ready(function () {

    MainFDate = $("#hdMainFromDate").data('value');
    LoadCompanyDDL("#ddlMCompany");
    LoadCompanyUnitDDL("#ddlMUnit");   
    LoadBuyerDDL("#ddlMBuyer");    
    LoadOrderNoDDL("#ddlMOrderNo");
    LoadJobNoDDL("#ddlMJobNo");
    LoadStyleDDL("#ddlMStyle");   
    LoadRefNoDDL("#ddlMRefNo");
    getDate();
});


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


function LoadReport() {
    debugger;
    var RptTyp = $('input[name="BudPrintPreviewPlanned"]:checked').attr('value');
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    //var SuppID = $('#ddlMSupplier').val();

    if ($('#ddlMCompany').val().trim() == 0) {
        $('#ddlMCompany').css('border-color', 'Red');
        return true;
    }
    else {
        $('#ddlMCompany').css('border-color', 'lightgrey');
    }
    var CmpID = $('#ddlMCompany').val();
    var BuyID = $('#ddlMBuyer').val();
   
    var Refno = Mref;
    var OrdNo = MOrd;

    //var Refno = $('#ddlMRefNo option:selected').text();
    //if (Refno == "--Select Ref No--") {
    //    Refno = "";
    //}

    //var OrdNo = $('#ddlMOrderNo option:selected').text();
    //if (OrdNo == "--Select Order No--") {
    //    OrdNo = "";
    //}

    var JobOrdNo = $('#ddlMJobNo option:selected').text();
    if (JobOrdNo == "--Select Job No--") {
        JobOrdNo = "";
    }
    var StyID = $('#ddlMStyle').val();
    var desp = 0;

    if ($('#Pending').prop('checked') == true) {
       desp=0;
    }
    if ($('#desptch').prop('checked') == true) {
        desp = 1;
    }
    if ($('#all').prop('checked') == true) {
        desp =2;
    }


    //var type = $('input[name="optwrkord"]:checked').attr('value');

    window.open("../Reports/Planning/BudgetSummaryReport.aspx?fdate=" + FDate + "&tdate=" + TDate + "&Compid=" + CmpID + "&BuyID=" + BuyID + "&Refno=" + Refno + "&OrdNo=" + OrdNo + "&JobOrdNo=" + JobOrdNo + "&StyID=" + StyID + "&Despatch=" + desp + "&RptTyp=" + RptTyp);
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