$(document).ready(function () {

    //$("#txtFromDate").val(moment(new Date()).format('DD/MM/YYYY'));
    //$("#txtToDate").val(moment(new Date()).format('DD/MM/YYYY'));    
    LoadCompanyDDL("#ddlMCompany");
    LoadCompanyUnitDDL("#ddlMUnit");
    LoadSupplierDDL("#ddlMSupplier");
    LoadBuyerDDL("#ddlMBuyer");
    LoadEmployeeDDL("#ddlMerchandise,#ddlMerchan");
    LoadOrderNoDDL("#ddlMOrderNo");
    LoadItemGroupDDL("#ddlMItemGroup");
    LoadStyleDDL("#ddlMStyle");
    LoadColorDDL("#ddlMColor");
    LoadItemDDL("#ddlMItem,#ddlMItem1");
    MainFDate = $("#hdMainFromDate").data('value');
    getDate();
});


function getDate() {

    var todaydate = new Date();
    var day = todaydate.getDate();
    var Pmonth = todaydate.getMonth() - 2;
    var Cmonth = todaydate.getMonth() + 1;
    var year = todaydate.getFullYear();
    var datestring = Pmonth + "/" + day + "/" + year;
    var Fdatestring = Cmonth + "/" + day + "/" + year;

    var day = new Date(),
        year = ((day.getMonth() - 2) < 0) ? (day.getFullYear() - 1) : day.getFullYear(),
        month = ((day.getMonth() - 2) < 0) ? (12 + (day.getMonth() - 2)) : (day.getMonth() + 1),
        date = month + '/' + day.getDate() + '/' + year;

    $('#txtFromDate').val(MainFDate);
    //$('#txtFromDate').val(datestring);
    $('#txtToDate').val(Fdatestring);

}


function LoadReport() {
    debugger;
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

    var on = $('#ddlMOrderNo option:selected').val();
    if (on == 0) {
        $('#ddlMOrderNo').css('border-color', 'Red');
        return true;
    }
    else {
        $('#ddlMOrderNo').css('border-color', 'lightgrey');
        var OrdNo = $('#ddlMOrderNo option:selected').text();
    }
    
    window.open("../Reports/Planning/CostingReport.aspx?fdate=" + FDate + "&tdate=" + TDate + "&Compid=" + CmpID + "&OrderNo=" +OrdNo);
}