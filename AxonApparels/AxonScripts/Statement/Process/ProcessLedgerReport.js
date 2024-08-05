var MainFDate = 0;
var MOrd = 0;
var Mref = 0;
$(document).ready(function () {
    var protype = $('input[name="OrdType"]:checked').attr('value');
    //$("#ddlMRefno").empty();
    if (protype == 'B') {
        LoadBulkOrderNoDDL("#ddlMOrderno");
        LoadBulkRefNoDDL("#ddlMRefno");

    }
    if (protype == 'S') {
        LoadSampOrderNoDDL("#ddlMOrderno");
        LoadSampleRefNoDDL("#ddlMRefno");

    }
    if (protype == 'A') {
        LoadOrderNoDDL("#ddlMOrderno");
        LoadRefNoDDL("#ddlMRefno");

    }
    //$("#txtFromDate").val(moment(new Date()).format('DD/MM/YYYY'));
    //$("#txtToDate").val(moment(new Date()).format('DD/MM/YYYY'));    
    LoadCompanyDDL("#ddlMCompany");
    LoadCompanyUnitDDL("#ddlMUnit");
    LoadSupplierDDL("#ddlMProcessor");
    LoadBuyerDDL("#ddlMBuyer");
    LoadProcessDDL("#ddlMProcess");
    //LoadOrderNoDDL("#ddlMOrderNo");
    LoadItemGroupDDL("#ddlMItemGroup");
    LoadStyleDDL("#ddlMStyle");
    LoadColorDDL("#ddlMColor");
    LoadItemDDL("#ddlMItem,#ddlMItem1");
    MainFDate = $("#hdMainFromDate").data('value');
    getDate();
});


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

function LoadOrd() {
    debugger;
    var protype = $('input[name="OrdType"]:checked').attr('value');
    $("#ddlMRefno").empty();
    if (protype == 'B') {
        LoadBulkOrderNoDDL("#ddlMOrderno");
        LoadBulkRefNoDDL("#ddlMRefno");

    }
    if (protype == 'S') {
        LoadSampOrderNoDDL("#ddlMOrderno");
        LoadSampleRefNoDDL("#ddlMRefno");

    }
    if (protype == 'A') {
        LoadOrderNoDDL("#ddlMOrderno");
        LoadRefNoDDL("#ddlMRefno");

    }
}


function LoadReport() {
    debugger;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    //var bid = $('#ddlMOrderno').val();
    var bid = MOrd;
    var buyer = $('#ddlMBuyer').val();
    var pr = $('#ddlMProcessor').val();
   
    //var ref = $('#ddlMRefno').val();
    var ref = Mref;

    var CmpID = $('#ddlMCompany').val();
    var protype = $('input[name="OrdType"]:checked').attr('value');
 
    var unit = $('#ddlMUnit').val();
    var proc = $('#ddlMProcess').val();

    window.open("../Reports/Process/ProcessLedger/ProcessLedgerReport.aspx?fdate=" + FDate + "&tdate=" + TDate +"&Compid=" + CmpID + "&Masid=" + bid
        + "&Buyid=" + buyer
             + "&Ordtype=" + protype + "&Ref=" + ref + "&Processor=" + pr + "&unitid=" + unit + "&Procid=" + proc);
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