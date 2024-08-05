var MainFDate = 0;
var ordtype = '';
var MOrd = 0;
var Mref = 0;
$(document).ready(function () {

    MainFDate = $("#hdMainFromDate").data('value');
    LoadCompanyDDL("#ddlMCompany");
    LoadCompanyUnitDDL("#ddlMUnit");   
    LoadBuyerDDL("#ddlMBuyer");   
    LoadOrderNoDDL("#ddlMOrderNo");   
    LoadStyleDDL("#ddlMStyle");
    LoadRefNoDDL("#ddlMRefno");
    LoadJobNoDDL("#ddlMJobno");

    getDate();
    $('#Bulk').prop('checked', true);
    $(document).on('click', 'input[name="Ordtype"]', function (e) {
        myfunctype();

    });


    $(document).on('click', '#Bulk', function () {
        $('#Sample').prop('checked', false);
        $('#General').prop('checked', false);
        $('#All').prop('checked', false);

    });
    $(document).on('click', '#Sample', function () {
        $('#Bulk').prop('checked', false);
        $('#General').prop('checked', false);
        $('#All').prop('checked', false);

    });
    $(document).on('click', '#General', function () {
        $('#Sample').prop('checked', false);
        $('#Bulk').prop('checked', false);
        $('#All').prop('checked', false);

    });
    $(document).on('click', '#All', function () {
        $('#Sample').prop('checked', false);
        $('#General').prop('checked', false);
        $('#Bulk').prop('checked', false);

    });


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


function LoadReport() {
    debugger;
    var RptTyp = $('input[name="BudPrintPreviewPlanned"]:checked').attr('value');
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    

    if ($('#ddlMCompany').val().trim() == 0) {
        $('#ddlMCompany').css('border-color', 'Red');
        return true;
    }
    else {
        $('#ddlMCompany').css('border-color', 'lightgrey');
    }
    var CmpID = $('#ddlMCompany').val();
    var BuyID = $('#ddlMBuyer').val();



    //var Refno = $('#ddlMRefno option:selected').text();
    //if (Refno == "--Select Ref No--") {
    //    Refno = "";
    //}

    //var OrdNo = $('#ddlMOrderNo option:selected').text();
    //if (OrdNo == "--Select Order No--") {
    //    OrdNo = "";
    //}
    var OrdNo =MOrd;
    var Refno = Mref;

    var JobOrdNo = $('#ddlMJobno option:selected').text();
    if (JobOrdNo == "--Select Job No--") {
        JobOrdNo = "";
    }
    var StyID = $('#ddlMStyle').val();

    var stat = 'N';
    if ($("#rdpending").prop("checked")) {
        stat = 'N';
    }
    if ($("#rddispatch").prop("checked")) {
        stat = 'Y';
    }
    if ($("#rdall").prop("checked")) {
        stat = 'A';
    }


    
    var bulkchecked = false;
    var samplechecked = false;
    var generalchecked = false;
    var allchecked = false;
    $(":checkbox").each(function () {
        bulkchecked = $('#Bulk').is(":checked");
        samplechecked = $('#Sample').is(":checked");
        generalchecked = $('#General').is(":checked");
        allchecked = $('#All').is(":checked");

    });

    var ordtype = '';
    if (bulkchecked)
        ordtype = 'B';
    if (samplechecked)
        ordtype = 'S';
    if (generalchecked)
        ordtype = 'G';
    if (allchecked)
        ordtype = 'A';
    if (ordtype != '') {


        window.open("../Reports/Planning/PlannConsolCostingReport.aspx?fdate=" + FDate + "&tdate=" + TDate + "&Compid=" + CmpID + "&BuyID=" + BuyID + "&Refno=" + Refno + "&OrdNo=" + OrdNo + "&JobOrdNo=" + JobOrdNo + "&StyID=" + StyID + "&RptTyp=" + RptTyp + "&Status=" + stat + "&OrdType=" + ordtype);
    } else {
        //alert('Please Select Order Type..');
        var msg = 'Please Select Order Type...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
    }
    //?CompanyID=" + CmpID + "&SupplierID=" + SuppID + "&BuyerID=" + BuyID + "&ColorID=" + ClrID + "&OrderNo=" + OrdNo + "&StyleID=" + StyID + "&FromDate=" + FDate + "&ToDate=" + TDate;
}

function myfunctype() {
    debugger;
    ordtype = '';
    //$('input[name="bomtype"]').find('checkbox').each(function () {
    if ($('#Bulk').prop('checked') == true) {
        ordtype = ordtype + "," + $('input[id="Bulk"]:checked').attr('value');
    }
    if ($('#Sample').prop('checked') == true) {
        ordtype = ordtype + "," + $('input[id="Sample"]:checked').attr('value');
    }
    if ($('#General').prop('checked') == true) {
        ordtype = ordtype + "," + $('input[id="General"]:checked').attr('value');
    }
    if ($('#All').prop('checked') == true) {
        ordtype = ordtype + "," + $('input[id="All"]:checked').attr('value');
    }
    //});



}

function myOrder(Val) {
    debugger;
    var foo = [];
    MOrd = 0;
    $('#ddlMOrderNo :selected').each(function (i, selected) {
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