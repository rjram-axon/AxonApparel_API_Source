var MainFDate = 0;
var MOrd = 0;
var Mref = 0;

$(document).ready(function () {
    MainFDate = $("#hdMainFromDate").data('value');
    LoadCompanyDDL("#ddlMCompany");
    LoadCompanyUnitDDL("#ddlMUnit");
    LoadBuyerDDL("#ddlMBuyer");
    LoadOrderNoDDL("#ddlMOrderNo");
    LoadJobNoDDL("#ddlMJobNo");
    LoadStyleDDL("#ddlMStyle");
    LoadRefNoDDL("#ddlMRefNo");
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
    $('#ddlMRefNo :selected').each(function (i, selected) {
        foo[i] = $(selected).val();
        Mref = Mref + "," + foo[i];
    });
}

function LoadReport() {
    debugger;
    var fromDate = $('#txtFromDate').val();
    var todate = $('#txtToDate').val();
    
    if ($('#ddlMCompany').val().trim() == 0) {
        $('#ddlmCompany').css('border-color', 'Red')
        return true;
    } else {
        $('#ddlMCompany').css('border-color', 'Lightgray')
    }
    var CompId = $('#ddlMCompany').val();
    var BuyId = $('#ddlMBuyer').val();

    var JobOrdNo = $('#ddlMJobNo option:selected').text();
    if (JobOrdNo == "--Select Job No--") {
        JobOrdNo = "";
    }
    var StyId = $('#ddlMStyle option:selected').val();

    var OrdNo = MOrd;
    var RefNo = Mref;

    var Status = $('input[name="proctype"]:checked').attr('value');
    
    var store = 'N';
    if ($('#InStore').is(":checked") == true) {
        store='Y'
    }
    var Fab = 'N';
    if ($('#InFabric').is(":checked") == true) {
        Fab = 'Y'
    }
    var Prod = 'N';
    if ($('#InProd').is(":checked") == true) {
        Prod = 'Y'
    }


    window.open("../Reports/Planning/BudgetReport.aspx?fdate=" + fromDate + "&tdate=" + todate + "&compid=" + CompId + "&buyid=" + BuyId + "&jobno=" + JobOrdNo + "&styleid=" + StyId + "&ordno=" + OrdNo + "&refno=" + Mref + "&status=" + Status + "&store=" + store + "&fab=" + Fab + "&prod=" + Prod)
}