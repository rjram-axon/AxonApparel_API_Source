/// <reference path="CuttingOrderStatementReport.js" />
var ordNoDDL = "#";
$(document).ready(function () {

    //$("#txtFromDate").val(moment(new Date()).format('DD/MM/YYYY'));
    //$("#txtToDate").val(moment(new Date()).format('DD/MM/YYYY'));    
    LoadCompanyDDL("#ddlMCompany");
    LoadCompanyUnitDDL("#ddlMUnit");
    LoadSeasonDDL("#ddlMSeason");
    LoadSupplierDDL("#ddlMProcessor");
    LoadBuyerDDL("#ddlMBuyer");
    LoadRefNoDDL("#ddlMRefno");
    LoadJobNoDDL("#ddlMJobNo");
    LoadProcessDDL("#ddlMProcess");
    LoadShiftDDL("#ddlMshift");
    LoadSizeDDL("#ddlMSize");
    LoadStoreUnitDDL("#ddlMStore");
    //LoadEmployeeDDL("#ddlMerchandise,#ddlMerchan");
    LoadOrderNoDDL("#ddlMOrderNo");
    //LoadItemGroupDDL("#ddlMItemGroup");
    LoadStyleDDL("#ddlMStyle");
    LoadColorDDL("#ddlMColor");
    LoadItemDDL("#ddlMItem");
    getDate();
});

function LoadReport() {
    debugger;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var CmpID = $('#ddlMCompany').val();
    var UnitID = $('#ddlMUnit').val();
    var BuyID = $('#ddlMBuyer').val();
    var OrdNo = $('#ddlMOrderNo option:selected').text();
    var RefNo = $('#ddlMRefno option:selected').text();
    var StyleID = $('#ddlMStyle').val();
    var ProcessorID = $('#ddlMProcessor').val();
    var StoreID = $('#ddlMStore').val();
    var JobOrdNo = $('#ddlMJobNo option:selected').text();
    var ProcessID = $('#ddlMProcess').val();
    var ItemID = $('#ddlMItem').val();
    var SeasonID = $('#ddlMSeason').val();
    var ColorID = $('#ddlMColor').val();
    var SizeID = $('#ddlMSize').val();
    var OrdType = $('input[name="Ordtype"]:checked').attr('value');
    var proctype = $('input[name="proctype"]:checked').attr('value');
    var Itemtype = $('input[name="Itemtype"]:checked').attr('value');

    window.open("../Reports/Production/CommonProdIssueStatReport.aspx");

    //window.open("../Reports/Production/CommonProdIssueStatReport.aspx?CompanyID=" + CmpID + "&UnitId=" + UnitID + "&BuyerID=" + BuyID + "&OrdNo=" + OrdNo + "&RefNo=" + RefNo + "&StyleID=" + StyleID + "&ProcessorId=" + ProcessorID + "&StoreId=" + StoreID
    //     + "&JobOrdNo=" + JobOrdNo + "&ProcessID=" + ProcessID + "&ItemID=" + ItemID + "&SeasonID=" + SeasonID + "&ColorID=" + ColorID + "&SizeID=" + SizeID + "&OrdType=" + OrdType + "&proctype=" + proctype + "&Itemtype=" + Itemtype + "&FromDate=" + FDate + "&ToDate=" + TDate);


    //?CompanyID=" + CmpID + "&SupplierID=" + SuppID + "&BuyerID=" + BuyID + "&ColorID=" + ClrID + "&OrderNo=" + OrdNo + "&StyleID=" + StyID + "&FromDate=" + FDate + "&ToDate=" + TDate;
}

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
    $('#txtFromDate').val(datestring);
    $('#txtToDate').val(Fdatestring);

}