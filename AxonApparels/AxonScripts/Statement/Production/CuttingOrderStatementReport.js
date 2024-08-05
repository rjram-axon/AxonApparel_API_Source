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
    LoadWorkdivisionDDL("#ddlMWorkdivision");
    getDate();
    Changedropcont();
});

function Changedropcont() {
    debugger;
    //if ($('#optwrkorder').is(':checked')) { $('#ddlinnerWorkdivision').show(); $('#ddlprocessor').hide(); }
    //else if ($('#optproces').is(':checked')) { $('#ddlinnerWorkdivision').hide(); $('#ddlprocessor').show(); }

    var chkwork = $('#optwrkorder').prop('checked');
    var chkProces = $('#optproces').prop('checked');
    if (chkwork) {
        $('#innerwork').show();
        $('#innerprocessor').hide();
    }
    else if (chkProces) {
        $('#innerwork').hide();
        $('#innerprocessor').show();
    }
}

function LoadReport() {
    debugger;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var CmpID = $('#ddlMCompany').val();
    var UnitID = $('#ddlMUnit').val();
    var BuyID = $('#ddlMBuyer').val();

    var ONo = $('#ddlMOrderNo option:selected').val();
    if (ONo != 0) {
        var OrdNo = $('#ddlMOrderNo option:selected').text();
    }else{
        var OrdNo = '';
    }

    var RNo = $('#ddlMRefno option:selected').val();
    if (RNo != 0) {
        var RefNo = $('#ddlMRefno option:selected').text();
    } else {
        var RefNo = '';
    }

    var JNo = $('#ddlMJobNo option:selected').val();
    if (JNo != 0) {
        var JobOrdNo = $('#ddlMJobNo option:selected').text();
    } else {
        var JobOrdNo = '';
    }

    
    var StyleID = $('#ddlMStyle').val();
    var ProcessorID = $('#ddlMProcessor').val();
    var StoreID = $('#ddlMStore').val();
    //var JobOrdNo = $('#ddlMJobNo option:selected').text();
    var ProcessID = $('#ddlMProcess').val();
    var ItemID = $('#ddlMItem').val();
    var SeasonID = $('#ddlMSeason').val();
    var ColorID = $('#ddlMColor').val();
    var SizeID = $('#ddlMSize').val();
    var OrdType = $('input[name="Ordtype"]:checked').attr('value');
    var proctype = $('input[name="proctype"]:checked').attr('value');
    var Itemtype = $('input[name="Itemtype"]:checked').attr('value');

    if (proctype == 'W') {
        var ProcessorID = $('#ddlMWorkdivision').val();

    } else if (proctype =='P') {
        var ProcessorID = $('#ddlMProcessor').val();
    }

   // window.open("../Reports/Production/CuttingOrderStatementReport.aspx");

    window.open("../Reports/Production/CuttingOrderStatementReport.aspx?CompanyID=" + CmpID + "&UnitId=" + UnitID + "&BuyerID=" + BuyID + "&OrdNo=" + OrdNo + "&RefNo=" + RefNo + "&StyleID=" + StyleID + "&ProcessorId=" + ProcessorID + "&StoreId=" + StoreID
         + "&JobOrdNo=" + JobOrdNo + "&ProcessID=" + ProcessID + "&ItemID=" + ItemID + "&SeasonID=" + SeasonID + "&ColorID=" + ColorID + "&SizeID=" + SizeID + "&OrdType=" + OrdType + "&proctype=" + proctype + "&Itemtype=" + Itemtype + "&FromDate=" + FDate + "&ToDate=" + TDate);

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