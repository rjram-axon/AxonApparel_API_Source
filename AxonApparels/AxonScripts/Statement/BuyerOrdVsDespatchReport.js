var MainFDate = 0;
var MOrd = 0;
var Mref = 0;
$(document).ready(function () {

    //$("#txtFromDate").val(moment(new Date()).format('DD/MM/YYYY'));
    //$("#txtToDate").val(moment(new Date()).format('DD/MM/YYYY'));    
    MainFDate = $("#hdMainFromDate").data('value');
    LoadCompanyDDL("#ddlMCompany");
    LoadRefNoDDL("#ddlMRefno");
    LoadBuyerDDL("#ddlMBuyer");  
    LoadOrderNoDDL("#ddlMOrderNo");
    LoadSizeDDL("#ddlMsize");    
    LoadColorDDL("#ddlMColor");
    LoadItemDDL("#ddlMItem");
    getDate();
});

function LoadReport() {
    debugger;
    var RptTyp = $('input[name="BudPrintPreviewPlanned"]:checked').attr('value');
    if ($('#ddlMCompany').val() == 0) {
        $('#ddlMCompany').css('border-color', 'Red');
        return true;
    }
    else {
        $('#ddlMCompany').css('border-color', 'lightgrey');
    }
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();   
    var CmpID = $('#ddlMCompany').val();
    var BuyID = $('#ddlMBuyer').val();
    var ClrID = $('#ddlMColor').val();
    var ItmID = $('#ddlMItem').val();
   // var OrdNo = $('#ddlMOrderNo option:selected').text();
    var SizeID = $('#ddlMsize').val();
    //var Refno = $('#ddlMRefno option:selected').text();


    var OrdNo = MOrd;
    var Refno = Mref;

    window.open("../Reports/Stores/BuyerOrderVsDespatch.aspx?CompanyID=" + CmpID + "&ItmID=" + ItmID + "&SizeID=" + SizeID + "&BuyerID=" + BuyID + "&OrderNo=" + OrdNo + "&ColorID=" + ClrID + "&Refno=" + Refno + "&FromDate=" + FDate + "&ToDate=" + TDate + "&RptTyp=" + RptTyp);
}
function getDate() {

    var todaydate = new Date();
    var day = todaydate.getDate();
    var Pmonth = todaydate.getMonth() - 2;
    var Cmonth = todaydate.getMonth() + 1;
    var year = todaydate.getFullYear();
    var datestring = Pmonth + "/" + day + "/" + year;
    //var Fdatestring = Cmonth + "/" + day + "/" + year;
    var Fdatestring = day + "/" + Cmonth + "/" + year;
    var day = new Date(),
        year = ((day.getMonth() - 2) < 0) ? (day.getFullYear() - 1) : day.getFullYear(),
        month = ((day.getMonth() - 2) < 0) ? (12 + (day.getMonth() - 2)) : (day.getMonth() + 1),
        date = month + '/' + day.getDate() + '/' + year;
    $('#txtFromDate').val(MainFDate);
    $('#txtToDate').val(Fdatestring);

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
    $('#ddlMRefno :selected').each(function (i, selected) {
        foo[i] = $(selected).val();

        Mref = Mref + "," + foo[i];


    });

}