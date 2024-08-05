var MainFDate = 0;
var MOrd = 0;
var Mref = 0;
$(document).ready(function () {

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
    LoadSupplierDDL("#ddlMProcessor");
    LoadBuyerDDL("#ddlMBuyer");
    LoadEmployeeDDL("#ddlMerchandise,#ddlMerchan");
    //LoadOrderNoDDL("#ddlMOrderNo");
    LoadProcessDDL("#ddlMProcess");
    LoadProcessDDL("#ddlMProcess");
    LoadStyleDDL("#ddlMStyle");
    LoadColorDDL("#ddlMColor");
    LoadItemDDL("#ddlMItem,#ddlMItem1");
    LoadSizeDDL("#ddlMSize");
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


function getDate() {
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
    //var bid = $('#ddlMOrderno').val();
    //var ref = $('#ddlMRefno').val();
    var bid = MOrd;
    var ref = Mref;
    var BuyID = $('#ddlMBuyer').val();
    var ProcID = $('#ddlMProcess').val();
    var ItmID = $('#ddlMItem').val();
    var ColID = $('#ddlMColor').val();
    var CompID = $('#ddlMCompany').val();
    var unId = $('#ddlMUnit').val();
    var protype = $('input[name="OrdType"]:checked').attr('value');
    var Supplierid = $('#ddlMProcessor').val();

    window.open("../Reports/Process/ProcessInvoice/ProcessInvoiceReport.aspx?fdate=" + FDate + "&tdate=" + TDate + "&ByOrdId=" + bid + "&RefId=" + ref + "&BuyId=" + BuyID + "&PrcId=" + ProcID + "&ItmId=" + ItmID + "&ColId=" + ColID + "&CompId=" + CompID + "&Otype=" + protype + "&UnId=" + unId +"&Supid="+Supplierid);
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
