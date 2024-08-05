var ordNoDDL = "#";
var MainFDate = 0;
var MOrd = 0;
var Mref = 0;
var MRefNo = 0;
var MStyNo = 0;
var MItm = 0;
$(document).ready(function () {

    MainFDate = $("#hdMainFromDate").data('value');
    LoadCompanyDDL("#ddlMCompany");
    LoadSupplierDDL("#ddlMSupplier");
    LoadBuyerDDL("#ddlMBuyer");
    LoadPurOrdNoDDL("#ddlMPurord");
    LoadItemGroupDDL("#ddlMItemGroup");
    LoadMultiStyleDDL("#ddlMStyle");
    
    LoadMultiItemDDL("#ddlAitem");
    LoadMultiOrderNoDDL("#ddlAOrderNo");
    LoadMultiRefNoDDL("#ddlARefNo");
    getDate();
});

function LoadReport() {
    debugger;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var SuppID = $('#ddlMSupplier').val();
    var CmpID = $('#ddlMCompany').val();
    var BuyID = $('#ddlMBuyer').val();
    var Purord = $('#ddlMPurord').val();



    var OType = $('input[name="ordtype"]:checked').attr('value');
    var PType = $('input[name="proctype"]:checked').attr('value');
    var LIType = $('input[name="loctype"]:checked').attr('value');

    //if (MOrd == "0") {
    //    var Ord = "";
    //}
    //else {
    //    var Ord = MOrd;
    //}

    //if (MRefNo == "0") {
    //    var RefNo = "";
    //}
    //else {
    //    var RefNo = MRefNo;
    //}
    var Ord = MOrd;
    var RefNo = Mref;
    if (MStyNo == "0") {
        var StyNo = "";
    }
    else {
        var StyNo = MStyNo;
    }

    if (MItm == "0") {
        var Itm = "";
    }
    else {
        var Itm = MItm;
    }

   window.location.href = "../Reports/Stores/PoCancelStatement.aspx?CompanyID=" + CmpID + "&SupplierID=" + SuppID + "&BuyerID=" + BuyID + "&Ordtype=" + OType + "&Proctype=" + PType + "&Loctype=" + LIType + "&OrdNo=" + Ord + "&refno=" + RefNo + "&styno=" + StyNo + "&itm=" + Itm + "&Purord=" + Purord + "&FromDate=" + FDate + "&ToDate=" + TDate;


    //window.open("../Reports/Stores/PoCancelStatement.aspx");
}
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
    $('#ddlAOrderNo :selected').each(function (i, selected) {
        foo[i] = $(selected).val();

        MOrd = MOrd + "," + foo[i];


    });

}
function myRef(Val) {
    debugger;
    var foo = [];
    Mref = 0;
    $('#ddlARefNo :selected').each(function (i, selected) {
        foo[i] = $(selected).val();

        Mref = Mref + "," + foo[i];


    });

}

//function myOrder(Val) {
//    var foo = [];
//    $('#ddlAOrderNo :selected').each(function (i, selected) {
//        foo[i] = $(selected).val();
//        MOrd = MOrd + "," + foo[i];
//    });
//}

//function myRef(Val) {
//    var Ref = [];
//    $('#ddlARefNo :selected').each(function (i, selected) {
//        Ref[i] = $(selected).text();
//        MRefNo = MRefNo + "," + Ref[i];
//    });
//}


function mystyle(Val) {
    var Sty = [];
    $('#ddlMStyle :selected').each(function (i, selected) {
        Sty[i] = $(selected).val();
        MStyNo = MStyNo + "," + Sty[i];
    });
}

function myItem(Val) {
    var Itm = [];
    $('#ddlAitem :selected').each(function (i, selected) {
        Itm[i] = $(selected).val();
        MItm = MItm + "," + Itm[i];
    });
}