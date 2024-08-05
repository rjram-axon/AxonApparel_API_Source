var ordNoDDL = "#";
var MOrd = 0;
var Mref = 0;
$(document).ready(function () {

    //$("#txtFromDate").val(moment(new Date()).format('DD/MM/YYYY'));
    //$("#txtToDate").val(moment(new Date()).format('DD/MM/YYYY'));    
    LoadCompanyDDL("#ddlMCompany");
    LoadSupplierDDL("#ddlMSupplier,#ddlManufacturer");
    LoadBuyerDDL("#ddlBuyer");
    //LoadEmployeeDDL("#ddlMerchandise,#ddlMerchan");
    LoadItemDDL("#ddlItem");
    LoadItemGroupDDL("#ddlMItemGroup");
    LoadStyleDDL("#ddlMStyle");
    LoadColorDDL("#ddlColor");
    LoadProcessDDL("#ddlProcess");
    LoadCompanyUnitDDL("#ddlMUnit");
    LoadStoreUnitDDL("#ddlStore");
    LoadSizeDDL("#ddlSize");
    getDate();
    LoadOrd();
});

function LoadReport() {
    debugger;

    var UnitID = $('#ddlMUnit').val();
    var CmpID = $('#ddlMCompany').val();
    var SuppID = $('#ddlMSupplier').val();
    var ManuID = $('#ddlManufacturer').val();
    var ProcID = $('#ddlProcess').val();
    var IgID = $('#ddlMItemGroup').val();
    var ItmID = $('#ddlItem').val();
    var ClID = $('#ddlColor').val();
    var SzID = $('#ddlSize').val();
    var StrID = $('#ddlStore').val();
    var OrRefNo = Mref;
    //var OrdRefNo = "";
    //var OrRefNo = $('select#ddlRefNo option:selected').val();

    //if (OrRefNo == 0) {
    //    OrdRefNo == "";
    //}
    //else {

    //    OrdRefNo = $('select#ddlRefNo option:selected').text();
    //}
    var OrdNo = MOrd;
    //var OrdNo = "";
    //var ONo = $('select#ddlOrdNo option:selected').val();

    //if (ONo == 0) {
    //    OrdNo == "";
    //}
    //else {

    //    OrdNo = $('select#ddlOrdNo option:selected').text();
    //}
 

    var shvalue = $('input[name="optvalue"]:checked').attr('value');

    if (shvalue == 1) {
        shvalue = 1;
    } else {
        shvalue = 0;
    }

    var shmanu = $('input[name="optmanu"]:checked').attr('value');

    if (shmanu == 1) {
        shmanu = 1;
    } else {
        shmanu = 0;
    }
    var shstr = $('input[name="optstr"]:checked').attr('value');

    if (shstr == 1) {
        shstr = 1;
    } else {
        shstr = 0;
    }
    var shdate = $('input[name="optdate"]:checked').attr('value');

    if (shdate == 1) {
        shdate = 1;
    } else {
        shdate = 0;
    }
    var shclr = $('input[name="optclr"]:checked').attr('value');

    if (shclr == 1) {
        shclr = 1;
    } else {
        shclr = 0;
    }
    var shsize = $('input[name="optsize"]:checked').attr('value');

    if (shsize == 1) {
        shsize = 1;
    } else {
        shsize = 0;
    }
    var shordinf = $('input[name="optordinfo"]:checked').attr('value');

    if (shordinf == 1) {
        shordinf = 1;
    } else {
        shordinf = 0;
    }
    var shrefno = $('input[name="optrefno"]:checked').attr('value');

    if (shrefno == 1) {
        shrefno = 1;
    } else {
        shrefno = 0;
    }
    var shsea = $('input[name="optseas"]:checked').attr('value');

    if (shsea == 1) {
        shsea = 1;
    } else {
        shsea = 0;
    }
    var shage = $('input[name="optage"]:checked').attr('value');

    if (shage == 1) {
        shage = 1;
    } else {
        shage = 0;
    }

    var gtype = $('input[name="proctype"]:checked').attr('value');

    if (gtype == 'G') {
        gtype = 'ITEM GROUP WISE STOCK';
    }
    else if (gtype == 'S') {
        gtype = 'SUPPLIER WISE STOCK';
    }
    else if (gtype == 'O') {
        gtype = 'ORDER WISE STOCK';
    }
    else {
        gtype = 'STORE WISE STOCK';
    }
        var Otype = $('input[name="Otype"]:checked').attr('value');
    var Stktype = $('input[name="Stktype"]:checked').attr('value');

    window.open("../Reports/Stores/StockGroupwiseReport.aspx?UnitID=" + UnitID + "&CmpID=" + CmpID + "&SuppID=" + SuppID + "&ManuID=" + ManuID + "&ProcID=" + ProcID + "&IgID=" + IgID + "&ItmID=" + ItmID + "&ClID=" + ClID + "&SzID=" + SzID
        + "&StrID=" + StrID + "&OrRefNo=" + OrRefNo + "&OrdNo=" + OrdNo + "&shvalue=" + shvalue + "&shmanu=" + shmanu + "&shstr=" + shstr + "&shdate=" + shdate + "&shclr=" + shclr
        + "&shsize=" + shsize + "&shordinf=" + shordinf + "&shrefno=" + shrefno + "&shsea=" + shsea + "&shage=" + shage + "&gtype=" + gtype + "&Otype=" + Otype + "&Stktype=" + Stktype);
}
function getDate() {

    var todaydate = new Date();
    var day = todaydate.getDate();
    var Pmonth = todaydate.getMonth() - 2;
    var Cmonth = todaydate.getMonth() + 1;
    var year = todaydate.getFullYear();
    var datestring = Pmonth + "/" + day + "/" + year;
    var Fdatestring = Cmonth + "/" + day + "/" + year;

    var day = new Date(),
        year = ((day.getMonth() - 2) < 0) ? (day.getFullYear() - 1) : day.getFullYear(),
        month = ((day.getMonth() - 2) < 0) ? (12 + (day.getMonth() - 2)) : (day.getMonth() + 1),
        date = month + '/' + day.getDate() + '/' + year;
    $('#txtFromDate').val(datestring);
    $('#txtToDate').val(Fdatestring);

}

function LoadOrd() {
    debugger;
    var protype = $('input[name="Otype"]:checked').attr('value');
    var Gtype = $('input[name="proctype"]:checked').attr('value');
    $("#ddlOrdNo").empty();
    $("#ddlRefNo").empty();
    if (protype == 'B' || Gtype=='O') {
        $("#ddlOrdNo").prop("disabled", false);
        $("#ddlRefNo").prop("disabled", false);
        LoadBulkOrderNoDDL("#ddlOrdNo");
        LoadBulkRefNoDDL("#ddlRefNo");
    }
    if (protype == 'S' || Gtype == 'O') {
        $("#ddlOrdNo").prop("disabled", false);
        $("#ddlRefNo").prop("disabled", false);
        LoadSampOrderNoDDL("#ddlOrdNo");
        LoadSampleRefNoDDL("#ddlRefNo");

    }
    if (protype == 'A' || Gtype == 'O') {
        $("#ddlOrdNo").prop("disabled", false);
        $("#ddlRefNo").prop("disabled", false);
        LoadOrderNoDDL("#ddlOrdNo");
        LoadRefNoDDL("#ddlRefNo");

    } if (protype == 'G' || (Gtype != 'O' && Gtype != 'R')) {
        $("#ddlOrdNo").prop("disabled", true);
        $("#ddlRefNo").prop("disabled", true);
    }
}

function RadioMBClick() {
    LoadOrd();
}
function myOrder(Val) {
    debugger;
    var foo = [];
    MOrd = 0;
    $('#ddlOrdNo :selected').each(function (i, selected) {
        foo[i] = $(selected).val();

        MOrd = MOrd + "," + foo[i];


    });

}
function myRef(Val) {
    debugger;
    var foo = [];
    Mref = 0;
    $('#ddlRefNo :selected').each(function (i, selected) {
        foo[i] = $(selected).val();

        Mref = Mref + "," + foo[i];


    });

}
