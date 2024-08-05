var MOrd = 0;
var Mref = 0;
$(document).ready(function () {
    debugger;

    LoadCompanyDDL("#ddlMCompany"); 
    LoadBuyerDDL("#ddlMBuyer");
    //LoadCompanyUnitDDL("#ddlMUnit");
    //LoadJobNoDDL("#ddlMJobNo");
  //  LoadProcessDDL("#ddlMProcess");   

    //LoadSupplierDDL("#ddlMProcessor");

    //LoadSupplierDDL("#ddlprocessor");
    //LoadWorkdivisionDDL("#ddlinnerWorkdivision");
   
    LoadOrderNoDDL("#ddlMOrderNo");
    LoadRefNoDDL("#ddlMRefno");   
    LoadStyleDDL("#ddlMStyle");   
    LoadItemDDL("#ddlMItem");

    //Changedropcont();
    getDate();
});

//function Changedropcont() {
//    debugger;
//    //if ($('#optwrkorder').is(':checked')) { $('#ddlinnerWorkdivision').show(); $('#ddlprocessor').hide(); }
//    //else if ($('#optproces').is(':checked')) { $('#ddlinnerWorkdivision').hide(); $('#ddlprocessor').show(); }

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


function LoadReport() {
    debugger;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var CmpID = $('#ddlMCompany').val();
    //var UnitID = $('#ddlMUnit').val();
    var BuyID = $('#ddlMBuyer').val();

    //var OrdNo;
    //if ($('#ddlMOrderNo').val() == 0) {
    //    OrdNo = 0;
    //}
    //else {
    //    OrdNo = $('#ddlMOrderNo option:selected').text();
    //}

    //var RefNo;
    //if ($('#ddlMRefno').val() == 0) {
    //    RefNo = 0;
    //}
    //else {
    //    RefNo = $('#ddlMRefno option:selected').text();
    //}

    var RefNo = Mref;
    var OrdNo = MOrd;

    var StyleID = $('#ddlMStyle').val();
    var ItemID = $('#ddlMItem').val();

    //var ProcessorID = $('#ddlMProcessor').val();
    //var StoreID = $('#ddlMStore').val();
    //var JobOrdNo = $('#ddlMJobNo option:selected').text();
  //  var ProcessID = $('#ddlMProcess').val();

    //window.open("../Reports/Production/CheckingReport.aspx?CompId=" + CmpID + "&BuyerID=" + BuyID + "&RefNo=" + RefNo + "&OrderNo=" + OrdNo + "&StyleID=" + StyleID + "&ItemId=" + ItemID + "&FromDate=" + FDate + "&ToDate=" + TDate + "&process_workdiv_id=" + process_workdiv_id + "&processId=" + ProcessID + "&Processortype=" + inorext);

    window.open("../Reports/Stores/SpecialRequisitionReport.aspx?CompId=" + CmpID + "&BuyerID=" + BuyID + "&RefNo=" + RefNo + "&OrderNo=" + OrdNo + "&StyleID=" + StyleID + "&ItemId=" + ItemID + "&FromDate=" + FDate + "&ToDate=" + TDate);

    //OLD
    //var chkwork = $('#optoutint').prop('checked');
    //var chkProces = $('#optoutext').prop('checked');
    //var inorext = 'I';
    //var process_workdiv_id = 0;

    //if (chkwork) {

    //    //if ($('#ddlinnerWorkdivision').val().trim() == 0) {
    //    //    $('#ddlinnerWorkdivision').siblings(".select2-container").css('border', '1px solid red');
    //    //    return true;
    //    //}
    //    //else {
    //    //    $('#ddlinnerWorkdivision').siblings(".select2-container").css('border', '1px lightgrey');
    //    //}

    //    process_workdiv_id = $('#ddlinnerWorkdivision').val();
    //    inorext = 'I'

    //}
    //else if (chkProces) {

    //    //if ($('#ddlprocessor').val().trim() == 0) {
    //    //    $('#ddlprocessor').siblings(".select2-container").css('border', '1px solid red');
    //    //    return true;
    //    //}
    //    //else {
    //    //    $('#ddlprocessor').siblings(".select2-container").css('border', '1px lightgrey');
    //    //}

    //    process_workdiv_id = $('#ddlprocessor').val();
    //    inorext = 'E'
    //}

    //var Itemchecked = true;
    //var Colorchecked = true;
    //var Sizechecked = true;

    //$(":checkbox").each(function () {
    //    //Itemchecked = $('#ChkItem').is(":checked");
    //    //Colorchecked = $('#ChkColor').is(":checked");
    //    Sizechecked = $('#ChkSize').is(":checked");
    //});

    ////if (Itemchecked == true) {
    ////    Itemchecked = false;
    ////}
    ////else {
    ////    Itemchecked = true;
    ////}
    ////if (Colorchecked == true) {
    ////    Colorchecked = false;
    ////}
    ////else {
    ////    Colorchecked = true;
    ////}

    //////if (Sizechecked == true) {  //Itemchecked == true && Colorchecked == true && 
    //////    //Itemchecked = false;
    //////    //Colorchecked = false;
    //////    Sizechecked = false;
    //////}

    ////*********
    ////if (Sizechecked == true) {
    ////    Sizechecked = false;
    ////} else {
    ////    Sizechecked = true;
    ////}
    ////window.open("../Reports/Production/CheckingReport.aspx?CompId=" + CmpID + "&BuyerID=" + BuyID + "&RefNo=" + RefNo + "&OrderNo=" + OrdNo + "&StyleID=" + StyleID + "&ItemId=" + ItemID + "&FromDate=" + FDate + "&ToDate=" + TDate + "&process_workdiv_id=" + process_workdiv_id + "&processId=" + ProcessID + "&Processortype=" + inorext + "&SizeGrp=" + Sizechecked);  // + "&ItemGrp=" + Itemchecked + "&ColorGrp=" + Colorchecked 
    ////*********

}

function getDate() {
    debugger;

    var todaydate = new Date();
    var day = todaydate.getDate();
    var Pmonth = todaydate.getMonth() - 2;
    var Cmonth = todaydate.getMonth() + 1;
    var year = todaydate.getFullYear();
    //var datestring = Pmonth + "/" + day + "/" + year;
    //var Fdatestring = Cmonth + "/" + day + "/" + year;

    var datestring = day + "/" + Pmonth + "/" + year;
    var Fdatestring = day + "/" + Cmonth + "/" + year;

    var day = new Date(),
        year = ((day.getMonth() - 2) < 0) ? (day.getFullYear() - 1) : day.getFullYear(),
        month = ((day.getMonth() - 2) < 0) ? (12 + (day.getMonth() - 2)) : (day.getMonth() + 1),
        date = month + '/' + day.getDate() + '/' + year;
    $('#txtFromDate').val(datestring);
    $('#txtToDate').val(Fdatestring);

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
    $('#ddlMRefno :selected').each(function (i, selected) {
        foo[i] = $(selected).text();

        Mref = Mref + "," + foo[i];


    });

}