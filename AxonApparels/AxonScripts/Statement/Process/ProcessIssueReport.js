﻿var MainFDate = 0;
var MOrd = 0;
var Mref = 0;
$(document).ready(function () {

    //$("#txtFromDate").val(moment(new Date()).format('DD/MM/YYYY'));
    //$("#txtToDate").val(moment(new Date()).format('DD/MM/YYYY'));  
    var protype = $('input[name="OrdType"]:checked').attr('value');
    //$("#ddlMRefno").empty();
    if (protype == 'B') {
        LoadBulkOrderNoDDL("#ddlMOrderno");
        LoadBulkRefNoDDL("#ddlMRefno");
        LoadBulkJobNoDDL("#ddlMJobNo");
    }
    if (protype == 'S') {
        LoadSampOrderNoDDL("#ddlMOrderno");
        LoadSampleRefNoDDL("#ddlMRefno");
        LoadSampleJobNoDDL("#ddlMJobNo");
    }
    if (protype == 'A') {
        LoadOrderNoDDL("#ddlMOrderno");
        LoadRefNoDDL("#ddlMRefno");
        LoadJobNoDDL("#ddlMJobNo");
    }
    LoadCompanyDDL("#ddlMCompany");
    LoadCompanyUnitDDL("#ddlMUnit");
    LoadSupplierDDL("#ddlMSupplier");
    LoadBuyerDDL("#ddlMBuyer");
    LoadSizeDDL("#ddlMSize");
    LoadOrderNoDDL("#ddlMOrderNo");
    LoadProcessDDL("#ddlMProcess");
    LoadStyleDDL("#ddlMStyle");
    LoadColorDDL("#ddlMColor");
    LoadItemDDL("#ddlMItem");
    MainFDate = $("#hdMainFromDate").data('value');
    getDate();
});

function LoadOrd() {
    debugger;
    var protype = $('input[name="OrdType"]:checked').attr('value');
    $("#ddlMRefno").empty();
    if (protype == 'B') {
        LoadBulkOrderNoDDL("#ddlMOrderno");
        LoadBulkRefNoDDL("#ddlMRefno");
        LoadBulkJobNoDDL("#ddlMJobNo");
    }
    if (protype == 'S') {
        LoadSampOrderNoDDL("#ddlMOrderno");
        LoadSampleRefNoDDL("#ddlMRefno");
        LoadSampleJobNoDDL("#ddlMJobNo");
    }
    if (protype == 'A') {
        LoadOrderNoDDL("#ddlMOrderno");
        LoadRefNoDDL("#ddlMRefno");
        LoadJobNoDDL("#ddlMJobNo");
    }
}

//function getDate() {

//    var todaydate = new Date();
//    var day = todaydate.getDate();
//    var Pmonth = todaydate.getMonth() - 2;
//    var Cmonth = todaydate.getMonth() + 1;
//    var year = todaydate.getFullYear();
//    var datestring = Pmonth + "/" + day + "/" + year;
//    var Fdatestring = Cmonth + "/" + day + "/" + year;

//    var day = new Date(),
//        year = ((day.getMonth() - 2) < 0) ? (day.getFullYear() - 1) : day.getFullYear(),
//        month = ((day.getMonth() - 2) < 0) ? (12 + (day.getMonth() - 2)) : (day.getMonth() + 1),
//        date = month + '/' + day.getDate() + '/' + year;
//    $('#txtFromDate').val(datestring);
//    $('#txtToDate').val(Fdatestring);

//}


function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
function getDate() {
    debugger;

    var date = new Date();
    var currentMonth = date.getMonth();
    var currentDate = date.getDate();
    var currentYear = date.getFullYear();
    var d = new Date();
    var Nday = addZero(d.getDate());

    var todaydate = new Date();
    var day = todaydate.getDate();
    var Pmonth = todaydate.getMonth() - 2;
    var Cmonth = todaydate.getMonth() + 1;
    var year = todaydate.getFullYear();
    var datestring = Pmonth + "/" + day + "/" + year;
    var Fdatestring = Nday + "/" + Cmonth + "/" + year;


    var day = new Date(),
        year = ((day.getMonth() - 2) < 0) ? (day.getFullYear() - 1) : day.getFullYear(),
        month = ((day.getMonth() - 2) < 0) ? (12 + (day.getMonth() - 2)) : (day.getMonth() + 1),
        date = month + '/' + day.getDate() + '/' + year;

    //alert(MainFDate + "1getdate");
    $('#txtFromDate').val(MainFDate);
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
   
   // var bid = $('#ddlMOrderNo').val();
    var bid = MOrd;
    var buyer = $('#ddlMBuyer').val();
    var itmid = $('#ddlMItem').val();
    var frmdate = $('#txtFromDate').val();
    var todate = $('#txtToDate').val();
    //var ref = $('#ddlMRefno').val();
    var ref = Mref;
    var clr = $('#ddlMColor').val();
    var size = $('#ddlMSize').val();
    //var supp = $('#ddlMSupplier').val();
    var protype = $('input[name="OrdType"]:checked').attr('value');
    var jobno = $('#ddlMJobNo').val();
    var unit = $('#ddlMUnit').val();
    var procid = $('#ddlMProcess').val();

    //var type = $('input[name="optwrkord"]:checked').attr('value');

    window.open("../Reports/Process/ProcessIssue/ProcessIssueStatementReport.aspx?fdate=" + FDate + "&tdate=" + TDate + "&Compid=" + CmpID
      + "&Masid=" + bid + "&itmid=" + itmid +
    "&Ordtype=" + protype + "&Ref=" + ref + "&Color=" + clr + "&Size=" + size + "&unitid=" + unit + "&jmasid=" + jobno + "&Procid=" + procid);
    //?CompanyID=" + CmpID + "&SupplierID=" + SuppID + "&BuyerID=" + BuyID + "&ColorID=" + ClrID + "&OrderNo=" + OrdNo + "&StyleID=" + StyID + "&FromDate=" + FDate + "&ToDate=" + TDate;
}

function myOrder(Val) {
    debugger;
    var foo = [];
    MOrd = 0;
    $('#ddlMOrderno :selected').each(function (i, selected) {
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