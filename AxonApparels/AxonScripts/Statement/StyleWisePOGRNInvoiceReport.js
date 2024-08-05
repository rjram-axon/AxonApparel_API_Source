var ordNoDDL = "#";
var MainFDate = 0;

$(document).ready(function () {
    debugger;
    MainFDate = $("#hdMainFromDate").data('value');

    //$("#txtFromDate").val(moment(new Date()).format('DD/MM/YYYY'));
    //$("#txtToDate").val(moment(new Date()).format('DD/MM/YYYY'));    
    LoadCompanyDDL("#ddlMCompany");
    LoadSupplierDDL("#ddlMSupplier");
    LoadBuyerDDL("#ddlMBuyer");
    LoadEmployeeDDL("#ddlMerchandise,#ddlMerchan");
    LoadOrderNoDDL("#ddlMOrderNo");
    LoadItemGroupDDL("#ddlMItemGroup");
    LoadStyleDDL("#ddlStyle");
    LoadRefNoDDL("#ddlRefNo");
    getDate();
});

function LoadReport() {
    debugger;  

    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var SuppID = $('#ddlMSupplier').val();
    var CmpID = $('#ddlMCompany').val();
    var StyID = $('#ddlStyle').val();
    var RefNo = $('#ddlRefNo option:selected').text();
    var OrdNo = $('#ddlMOrderNo option:selected').text();
    var ItmType = $('#ddlitemtype option:selected').text();

    window.open("../Reports/Stores/StyleWisePOGRNInvoice.aspx?OrderNo=" + OrdNo + "&StyleID=" + StyID + "&RefNo=" + RefNo + "&CompId=" + CmpID + "&SuppId=" + SuppID + "&ItemType=" + ItmType + "&FromDate=" + FDate + "&ToDate=" + TDate)
    //?CompanyID=" + CmpID + "&SupplierID=" + SuppID + "&BuyerID=" + BuyID + "&ColorID=" + ClrID + "&OrderNo=" + OrdNo + "&StyleID=" + StyID + "&FromDate=" + FDate + "&ToDate=" + TDate;
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
