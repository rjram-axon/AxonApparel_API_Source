var ordNoDDL = "#";
var MainFDate = 0;
var MOrd = 0;
var Mref = 0;
$(document).ready(function () {

    MainFDate = $("#hdMainFromDate").data('value');
    LoadCompanyDDL("#ddlMCompany");
    LoadSeasonDDL("#ddlSeason");
    LoadBuyerDDL("#ddlMBuyer");    
    LoadOrderNoDDL("#ddlOrderNo");   
    LoadStyleDDL("#ddlStyle");  
    LoadRefNoDDL("#ddlRefNo");
    getDate();

    $(document).on('click', '#Currency', function () {

        var Curr = 1;


    });

});

function LoadReport() {
    debugger;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var SeasonID = $('#ddlSeason').val();
    var CmpID = $('#ddlMCompany').val();
    var BuyID = $('#ddlMBuyer').val();

    if ($('#ddlMCompany').val().trim() == 0) {
        $('#ddlMCompany').css('border-color', 'Red');
        return true;
    }
  
   
    var RptTyp = $('input[name="BudPrintPreviewPlanned"]:checked').attr('value');
    var Curr = $("input[id='Currency']:checked").val();

    if (Curr != undefined)
    {
        Curr = 1;
    }
    else { Curr = 0;}

    var tot = $("input[id='Total']:checked").val();

    if (tot != undefined) {
        tot = 1;
    }
    else { tot = 0; }

   

    var statustype = $("input[name='statustype']:checked").val();
    var DtType = $("input[name='proctype']:checked").val();
    //var Refno = $('#ddlRefNo option:selected').text();
    //if (Refno == "--Select Ref No--") {
    //    Refno = "";
    //}
    var Refno = Mref;
    var OrdNo = MOrd;
    //var OrdNo = $('#ddlOrderNo option:selected').text();
    //if (OrdNo == "--Select Order No--") {
    //    OrdNo = "";
    //}
    var StyID = $('#ddlStyle').val();
    var OrdType = $('#ddlMOrderType').val();

    window.open("../Reports/Order/BuyerOrderReport.aspx?CompanyID=" + CmpID + "&SeasonID=" + SeasonID + "&BuyerID=" + BuyID + "&Refno=" + Refno + "&OrderNo=" + OrdNo + "&StyleID=" + StyID + "&FromDate=" + FDate + "&ToDate=" + TDate + "&Curr=" + Curr + "&Total=" + tot + "&DtType=" + DtType + "&statustype=" + statustype + "&RptTyp=" + RptTyp);
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
function myOrder(Val) {
    debugger;
    var foo = [];
    MOrd = 0;
    $('#ddlOrderNo :selected').each(function (i, selected) {
        foo[i] = $(selected).text();

        MOrd = MOrd + "," + foo[i];


    });

}
function myRef(Val) {

    debugger;
    var foo = [];
    Mref = 0;
    $('#ddlRefNo :selected').each(function (i, selected) {
        foo[i] = $(selected).text();

        Mref = Mref + "," + foo[i];


    });

}