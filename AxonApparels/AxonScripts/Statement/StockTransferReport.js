var ordNoDDL = "#";
var MainFDate = 0;
$(document).ready(function () {

    //$("#txtFromDate").val(moment(new Date()).format('DD/MM/YYYY'));
    //$("#txtToDate").val(moment(new Date()).format('DD/MM/YYYY'));    
    LoadCompanyDDL("#ddlMFromCompany,#ddlMToCompany");
    LoadSupplierDDL("#ddlMSupplier");
    LoadBuyerDDL("#ddlMBuyer");
    LoadEmployeeDDL("#ddlMerchandise,#ddlMerchan");
    LoadOrderNoDDL("#ddlFromOrder,#ddlMToOrder");
    LoadItemGroupDDL("#ddlItemGroup");
    LoadProcessDDL("#ddlMProcess");
    LoadStoreUnitDDL("#ddlToGodown,#ddlFromGodown");
    //LoadColorDDL("#ddlMColor");
    //LoadItemDDL("#ddlMItem,#ddlMItem1");
    MainFDate = $("#hdMainFromDate").data('value');
    getDate();
});

function LoadReport() {
    debugger;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
   
    var FCmpID = $('#ddlMFromCompany').val();
    var TCmpID = $('#ddlMToCompany').val();
    var FOrdNo = $('#ddlFromOrder').val();
    var TOrdNo = $('#ddlMToOrder').val(); 
    var ProcId = $('#ddlMProcess').val();
    var FStrID = $('#ddlFromGodown').val();
    var TStrID = $('#ddlToGodown').val();
    //var IGrp = $('#ddlItemGroup option:selected').text();

    var IGrp = $('select#ddlItemGroup option:selected').val();

    if (IGrp == 0) {
        IGrp = "";
    }
    else {

        IGrp = $('select#ddlItemGroup option:selected').text();
    }

    var protype = $('input[name="proctype"]:checked').attr('value');
    var frmdate = $('#txtFromDate').val();
    var todate = $('#txtToDate').val();
    var ItemGroup = $('input[name="grouptype"]:checked').attr('value');

    window.open("../Reports/Stores/StockTransferReport.aspx?FCmpID=" + FCmpID + "&TCmpID=" + TCmpID + "&FOrdNo=" + FOrdNo + "&TOrdNo=" + TOrdNo + "&ProcId=" + ProcId
             + "&FStrID=" + FStrID + "&TStrID=" + TStrID + "&IGrp=" + IGrp + "&protype=" + protype + "&fdate=" + frmdate + "&tdate=" + todate + "&GroupByView=" + ItemGroup);

}
function getDate() {

    var todaydate = new Date();
    var day = todaydate.getDate();
    var Pmonth = todaydate.getMonth() - 2;
    var Cmonth = todaydate.getMonth() + 1;
    var year = todaydate.getFullYear();
    var datestring = Pmonth + "/" + day + "/" + year;
    var Fdatestring = day + "/" + Cmonth + "/" + year;
    $('#txtFromDate').val(MainFDate);
    $('#txtToDate').val(Fdatestring);

}
