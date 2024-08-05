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
    LoadSupplierDDL("#ddlMSupplier");

    //Changedropcont();
    getDate();
});


function RadioAPClick() {
    var PType = $('input[name="optExt"]:checked').attr('value');
    if (PType == 'E') {
        LoadSupplierDDL("#ddlMSupplier");
        //LoadPrnGridDetails();	
    } else {
        LoadWorkdivisionDDL("#ddlMSupplier");
        //LoadPrnGridDetails();	
    }
}

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
    var SupplierId = $('#ddlMSupplier').val();

    var OType = $('input[name="MOType"]:checked').attr('value');
    var IntorExt = $('input[name="optExt"]:checked').attr('value');

    window.open("../Reports/Stores/OpenInvoiceReport.aspx?CompId=" + CmpID + "&BuyerID=" + BuyID + "&RefNo=" + RefNo + "&OrderNo=" + OrdNo + "&StyleID=" + StyleID + "&ItemId=" + ItemID + "&FromDate=" + FDate + "&ToDate=" + TDate + "&SupplierId=" + SupplierId + "&OType=" + OType + "&IntorExt=" + IntorExt);
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