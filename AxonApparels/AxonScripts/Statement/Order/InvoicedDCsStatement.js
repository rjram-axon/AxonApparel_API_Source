var ordNoDDL = "#";
var MainFDate = 0;
var MOrd = 0;
var Mref = 0;
var itemtype = 0;
$(document).ready(function () {

    MainFDate = $("#hdMainFromDate").data('value');
    LoadCompanyDDL("#ddlMCompany");
    LoadCompanyUnitDDL("#ddlUnit");

    LoadBuyerDDL("#ddlMBuyer");
    LoadStyleDDL("#ddlStyle");
    LoadProcessDDL("#ddlProcess");

    //LoadSeasonDDL("#ddlSeason");

    //LoadOrderNoDDL("#ddlManager");
    //LoadRefNoDDL("#ddlMerchandiser");
    LoadOrderNoDDL("#ddlMOrderNo");
    LoadRefNoDDL("#ddlRefNo");
    //LoadManagerDDL("#ddlManager");
    //LoadMerchandiserDDL("#ddlMerchandiser");

    LoadItemGroupDDL("#ddlItemGroup");
    LoadItemDDL("#ddlItem");



    LoadSupplierDDL("#ddlprocessor");
    LoadWorkdivisionDDL("#ddlinnerWorkdivision");

    //debugger;
    Changedropcont();

    //ChangeMaininorext();


    //LoadManager();
    //LoadMerchandiser();

    getDate();



});

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

//function CMainlist() {

//    ChangeMaininorext();
//}

//function ChangeMaininorext() {
//    debugger;

//    var chkwork = $('#optoutint').prop('checked');
//    var chkProces = $('#optoutext').prop('checked');
//    if (chkwork) {
//        $('#Mwork').show();
//        $('#Mprocess').hide();
//    }
//    else if (chkProces) {
//        $('#Mwork').hide();
//        $('#Mprocess').show();
//    }
//}

function Changedropcont() {
    debugger;
    //if ($('#optwrkorder').is(':checked')) { $('#ddlinnerWorkdivision').show(); $('#ddlprocessor').hide(); }
    //else if ($('#optproces').is(':checked')) { $('#ddlinnerWorkdivision').hide(); $('#ddlprocessor').show(); }

    var chkwork = $('#optoutint').prop('checked');
    var chkProces = $('#optoutext').prop('checked');
    if (chkwork) {
        $('#Mwork').show();
        $('#Mprocess').hide();
    }
    else if (chkProces) {
        $('#Mwork').hide();
        $('#Mprocess').show();
    }
}

function myOrder(Val) {
    debugger;
    var foo = [];
    MOrd = 0;
    $('#ddlMOrderNo :selected').each(function (i, selected) {
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

function LoadReport() {
    debugger;

    var Refno;
    var OrdNo;

    var CmpID = $('#ddlMCompany').val();
    var BuyID = $('#ddlMBuyer').val();
    var StyID = $('#ddlStyle').val();

    var process_workdiv_id = 0;

    var unitId = $('#ddlUnit').val();
    var processId = $('#ddlProcess').val();
    var itemgroupid = $('#ddlItemGroup').val();
    var item = $('#ddlItem').val();
    var itemtype = 0;  //$('#ddlItemType').val();

    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    //if ($('#ddlMCompany').val().trim() == 0) {
    //    $('#ddlMCompany').css('border-color', 'Red');
    //    return true;
    //}  

    var statustype = $("input[name='statustype']:checked").val();
    var ordertype = $("input[name='ordertype']:checked").val();
    var DtType = $("input[name='proctype']:checked").val();
    var statustype = $("input[name='statustype']:checked").val();

    if ($('#ddlMCompany').val().trim() == 0) {
        $('#ddlMCompany').siblings(".select2-container").css('border', '1px solid red');
        return true;
    }
    else {
        $('#ddlMCompany').siblings(".select2-container").css('border', '1px lightgrey');
    }

    //if ($('#ddlMOrderNo').val() == 0) {

    //    if (ordertype == "G") {

    //    }
    //    else {
    //        //$('#ddlMOrderNo').css('border-color', 'Red');
    //        $('#ddlMOrderNo').siblings(".select2-container").css('border', '1px solid red');
    //        return true;
    //    }
    //}
    //else {
    //    $('#ddlMOrderNo').siblings(".select2-container").css('border', '1px lightgrey');
    //}

    //if ($('#ddlStyle').val() == 0) {

    //    if (ordertype == "G") {

    //    }
    //    else {
    //        //$('#ddlMOrderNo').css('border-color', 'Red');
    //        $('#ddlStyle').siblings(".select2-container").css('border', '1px solid red');
    //        return true;
    //    }
    //}
    //else {
    //    $('#ddlStyle').siblings(".select2-container").css('border', '1px lightgrey');
    //}

    var chkwork = $('#optoutint').prop('checked');
    var chkProces = $('#optoutext').prop('checked');
    var inorext = 'I';

    if (chkwork) {

        //if ($('#ddlinnerWorkdivision').val().trim() == 0) {
        //    $('#ddlinnerWorkdivision').siblings(".select2-container").css('border', '1px solid red');
        //    return true;
        //}
        //else {
        //    $('#ddlinnerWorkdivision').siblings(".select2-container").css('border', '1px lightgrey');
        //}

        process_workdiv_id = $('#ddlinnerWorkdivision').val();
        inorext = 'I'

    }
    else if (chkProces) {

        //if ($('#ddlprocessor').val().trim() == 0) {
        //    $('#ddlprocessor').siblings(".select2-container").css('border', '1px solid red');
        //    return true;
        //}
        //else {
        //    $('#ddlprocessor').siblings(".select2-container").css('border', '1px lightgrey');
        //}

        process_workdiv_id = $('#ddlprocessor').val();
        inorext = 'E'
    }

    //var OrdNo = $('#ddlMOrderNo option:selected').text();
    //var Refno = $('#ddlRefNo option:selected').text();

    //////myOrder(OrdNo);
    //////myRef(Refno);
    
    if (ordertype == "G") {
        OrdNo = "General";
        Refno = "";
        BuyID = 0;
        StyID = 0;

    }
    else {
        OrdNo = MOrd; //"0," + $('#ddlMOrderNo option:selected').text(); // $('#ddlMOrderNo').val();  //MOrd;
        Refno = Mref;
    }


    // var OrdNo = MOrd;   

    var InvoiceType = $("input[name='Invoicetype']:checked").val();

    //if (statustype = "Pur") {

    //}

    window.open("../Reports/Order/InvoicedDCsStatementReport.aspx?CompId=" + CmpID + "&BuyerID=" + BuyID + "&Refno=" + Refno + "&OrderNo=" + OrdNo + "&StyleID=" + StyID + "&unitId=" + unitId + "&FromDate=" + FDate + "&ToDate=" + TDate + "&processId=" + processId + "&process_workdiv_id=" + process_workdiv_id + "&itemgroupid=" + itemgroupid + "&item=" + item + "&itemtype=" + itemtype + "&InvoiceType=" + InvoiceType + "&statustype=" + statustype + "&ordertype=" + ordertype + "&proctype=" + inorext);

    //window.open("../Reports/Order/OrderInHandReport.aspx");


    /////
    ////
    //var RptTyp = $('input[name="BudPrintPreviewPlanned"]:checked').attr('value');
    //var Curr = $("input[id='Currency']:checked").val();

    //if (Curr != undefined) {
    //    Curr = 1;
    //}
    //else { Curr = 0; }

    //var tot = $("input[id='Total']:checked").val();

    //if (tot != undefined) {
    //    tot = 1;
    //}
    //else { tot = 0; }



    //var statustype = $("input[name='statustype']:checked").val();
    //var DtType = $("input[name='proctype']:checked").val();
    ////var Refno = $('#ddlRefNo option:selected').text();
    ////if (Refno == "--Select Ref No--") {
    ////    Refno = "";
    ////}
    //var Refno = Mref;
    //var OrdNo = MOrd;
    ////var OrdNo = $('#ddlOrderNo option:selected').text();
    ////if (OrdNo == "--Select Order No--") {
    ////    OrdNo = "";
    ////}

    //var OrdType = $('#ddlMOrderType').val();
}