var MOrd = 0;
var Mref = 0;
$(document).ready(function () {
    debugger;

    LoadCompanyDDL("#ddlMCompany");
    LoadBuyerDDL("#ddlMBuyer");
    //LoadCompanyUnitDDL("#ddlMUnit");
    //LoadJobNoDDL("#ddlMJobNo");
    LoadProcessDDL("#ddlMProcess");
    //LoadSupplierDDL("#ddlMProcessor");
    //LoadSupplierDDL("#ddlprocessor");
    LoadWorkdivisionDDL("#ddlwrkdiv");

    LoadOrderNoDDL("#ddlMOrderNo");
    LoadRefNoDDL("#ddlMRefno");
    LoadStyleDDL("#ddlMStyle");
    LoadItemDDL("#ddlMItem");

    LoadSupplierDDL("#ddlMSupplier");
    LoadCompanyUnitDDL("#ddlMFromUnit");
    LoadBuyerDDL("#ddlBuyer");

    $('#wrkdiv').hide();
    $('#supp').hide();
    $("#unit").show();

    //Changedropcont();
    getDate();
});


function RadioMBClick() {
    debugger;

    var protype = $('input[name="UType"]:checked').attr('value');
    if (protype == 'U') {
        $('#wrkdiv').hide();
        $('#supp').hide();
        $("#unit").show();
    }
    else if (protype == 'S') {
        $("#unit").hide();
        $('#wrkdiv').hide();
        $('#supp').show();
    }
    else if (protype == 'W') {
        $("#unit").hide();
        $('#supp').hide();
        $('#wrkdiv').show();
    }

    //var Unit = $('#OptUnit').prop('checked');
    //var Sup = $('#OptSup').prop('checked');
    //if (Unit) {
    //    $('#MUnit').show();
    //    $('#MSupplier').hide();
    //}
    //else if (Sup) {
    //    $('#MUnit').hide();
    //    $('#MSupplier').show();
    //}


    //var PType = $('input[name="optUS"]:checked').attr('value');
    //if (PType == 'S') {
    //    LoadSupplierDDL("#ddlMSupplier");
    //    $("#UnitOrSup").val("Supplier");

    //    //LoadPrnGridDetails();	
    //} else {       
    //    LoadCompanyUnitDDL("#ddlMSupplier");
    //    $("#UnitOrSup").val("Unit");

    //    //LoadPrnGridDetails();	
    //}
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
    var ProcessID = $('#ddlMProcess').val();

    // var SupplierId = $('#ddlMSupplier').val();

    //var Unit = $('#UType').prop('checked');
    //var Sup = $('#OptSup').prop('checked');

    var UType = $('input[name="UType"]:checked').attr('value');

    if (UType == "U") {
        SupplierId = $('#ddlMFromUnit').val();
    }
    else if (UType == "S") {

        SupplierId = $('#ddlMSupplier').val();
    }
    else if (UType == "W") {

        SupplierId = $('#ddlwrkdiv').val();
    }

   //var OType = $('input[name="MOType"]:checked').attr('value');
   //var VType = $('input[name="VType"]:checked').attr('value');

    // var IsReturn = $('#ChkReturnable').is(":checked");

    var RType = $('input[name="RType"]:checked').attr('value');

    var IsReturnable;

    if (RType == "R") {
        IsReturnable = "Y";
    }
    else if (RType == "N") {
        IsReturnable = "N";
    }
    else if (RType == "B") {
        IsReturnable = "B";
    }

    window.open("../Reports/Stores/GeneralMemoReport.aspx?CompId=" + CmpID + "&BuyerID=" + BuyID + "&RefNo=" + RefNo + "&OrderNo=" + OrdNo + "&StyleID=" + StyleID + "&ItemId=" + ItemID + "&FromDate=" + FDate + "&ToDate=" + TDate + "&SupplierId=" + SupplierId + "&ProcessID=" + ProcessID + "&UType=" + UType + "&IsReturn=" + IsReturnable);
    // + "&VType=" + VType
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