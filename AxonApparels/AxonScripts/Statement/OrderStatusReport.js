var MainFDate = 0;
$(document).ready(function () {

    //$("#txtFromDate").val(moment(new Date()).format('DD/MM/YYYY'));
    //$("#txtToDate").val(moment(new Date()).format('DD/MM/YYYY'));    
    MainFDate = $("#hdMainFromDate").data('value');
    LoadCompanyDDL("#ddlMCompany");
    LoadRefNoDDL("#ddlMRefno");
    LoadBuyerDDL("#ddlMBuyer");
    LoadOrderNoDDL("#ddlMOrderNo");
    LoadStyleDDL("#ddlMStyle");
    LoadEmployeeDDL("#ddlMMerch");
   
    getDate();
});

function LoadReport() {
    debugger;
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
    var StyID = $('#ddlMStyle').val();
    var MerchID = $('#ddlMMerch').val();
    if (MerchID == "") {
        MerchID = 0;
    }
    var OrdNo = $('#ddlMOrderNo option:selected').text();   
    var Refno = $('#ddlMRefno option:selected').text();

    window.open("../Reports/Stores/OrderStatusReport.aspx?CompanyID=" + CmpID + "&StyID=" + StyID + "&MerchID=" + MerchID + "&BuyerID=" + BuyID + "&OrderNo=" + OrdNo + "&Refno=" + Refno + "&FromDate=" + FDate + "&ToDate=" + TDate);
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
