var MainFDate = 0;
$(document).ready(function () {
    MainFDate = $("#hdMainFromDate").data('value');

    //$("#txtFromDate").val(moment(new Date()).format('DD/MM/YYYY'));
    //$("#txtToDate").val(moment(new Date()).format('DD/MM/YYYY'));    
    LoadCompanyDDL("#ddlMCompany");
    LoadSupplierDDL("#ddlMSupplier");
    LoadPurOrdNoDDL("#ddlMPurOrderNo");
    LoadGrnNoDDL("#ddlMOrderNo");

    LoadStyleDDL("#ddlStyle");

    getDate();
});

function LoadReport() {
    debugger;

    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var SuppID = $('#ddlMSupplier').val();
    var CmpID = $('#ddlMCompany').val();
    var StyID = $('#ddlStyle').val();
    //var PO = $('#ddlMPurOrderNo option:selected').text();


    var PONo = "";
    var PNo = $('select#ddlMPurOrderNo option:selected').val();

    if (PNo == 0) {
        PONo == "";
    }
    else {

        PONo = $('select#ddlMPurOrderNo option:selected').text();
    }

    //var Grn = $('#ddlMOrderNo option:selected').text();



    var GrnNo = "";
    var GNo = $('select#ddlMOrderNo option:selected').val();

    if (GNo == 0) {
        GrnNo == "";
    }
    else {

        GrnNo = $('select#ddlMOrderNo option:selected').text();
    }

    var ItmNo = "";
    var INo = $('select#ddlitemtype option:selected').val();

    if (INo == 0) {
        ItmNo == "";
    }
    else {

        ItmNo = $('select#ddlitemtype option:selected').text();
    }

    //var ItmType = $('#ddlitemtype option:selected').text();
    //var Suppnam = $('#ddlMSupplier option:selected').text();

    var suppNo = "";
    var sNo = $('select#ddlMSupplier option:selected').val();

    if (sNo == 0) {
        suppNo == "";
    }
    else {

        suppNo = $('select#ddlMSupplier option:selected').text();
    }

    window.open("../Reports/Stores/GoodsReceiptSummary.aspx?GrnNo=" + GrnNo + "&PO=" + PONo + "&StyleID=" + StyID + "&CompId=" + CmpID + "&SuppId=" + SuppID + "&ItemType=" + ItmNo + "&FromDate=" + FDate + "&ToDate=" + TDate + "&suppname=" + suppNo);
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
