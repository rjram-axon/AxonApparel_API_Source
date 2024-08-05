var ordNoDDL = "#";
var MainFDate = 0;
$(document).ready(function () {
    debugger;
    MainFDate = $("#hdMainFromDate").data('value');
    LoadCompanyDDL("#ddlMCompany");
    LoadSupplierDDL("#ddlMSupplier");
    LoadStyleDDL("#ddlMStyle");
    LoadColorDDL("#ddlMColor");
    LoadItemDDL("#ddlMItem");
    LoadSizeDDL("#ddlMSize");
    getDate();
});

function LoadReport() {
    debugger;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var SuppID = $('#ddlMSupplier').val();
    var CmpID = $('#ddlMCompany').val();
    var ClrID = $('#ddlMColor').val();
    var StyID = $('#ddlMStyle').val();
    var ItmID = $('#ddlMSize').val();

    window.open("../Reports/Stores/PurReturnReport.aspx?CompanyID=" + CmpID + "&SupplierID=" + SuppID + "&ColorID=" + ClrID + "&StyleID=" + StyID + "&ItemID=" + ItmID + "&FromDate=" + FDate + "&ToDate=" + TDate);
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
