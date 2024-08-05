var MainFDate = 0;
var MIG = "";
var itemgrp = [];
var MOrd = 0;
var Mref = 0;
var MBref = 0;
var chk = false;
$(document).ready(function () {

    MainFDate = $("#hdMainFromDate").data('value');
    LoadCompanyDDL("#ddlMCompany");
    LoadCompanyUnitDDL("#ddlMUnit");   
    LoadBuyerDDL("#ddlMBuyer");    
    LoadOrderNoDDL("#ddlMOrderNo");
    LoadJobNoDDL("#ddlMJobNo");
    LoadStyleDDL("#ddlMStyle");   
    LoadRefNoDDL("#ddlMRefNo");
    LoadSeasonDDL("#ddlseason");
    LoadBuyRefNoDDL("#ddlMBRefNo");
    loaddetails();
    getDate();

    $(document).on('click', '#selectall', function () {
        var val = $(this).is(":checked");
        if (val == true) {
            chk = true;
        }
        else {
            chk = false;
        }
    });
});


function loaddetails() {
    debugger;
    $.ajax({
        url: "/BOM/ItemList",
        data: JSON.stringify({}),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $.each(result, function () {
                $("#sbTwo").append($("<option></option>").val(this.Itemgroupid).text(this.Itemgroup));
                itemgrp.push(this.Itemgroup)
            });


        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function myIgroup() {
    debugger;
    MIG = '';
    var Ig = [];
    var itemgrpid = 0;
    $('#sbTwo :selected').each(function (i, selected) {
        Ig[i] = $(selected).text();

        MIG = MIG + "," + Ig[i];

    });
     
}
function loaditemgrp() {
    MIG = '';
    //itemgrp
    //$(itemgrp).each(function(i){
    //    MIG = MIG + "," + itemgrp[i];
    //});

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

function LoadReport() {
    debugger;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    //var SuppID = $('#ddlMSupplier').val();

    if ($('#ddlMCompany').val().trim() == 0) {
        $('#ddlMCompany').css('border-color', 'Red');
        return true;
    }
    else {
        $('#ddlMCompany').css('border-color', 'lightgrey');
    }
    var RptTyp = $('input[name="BudPrintPreviewPlanned"]:checked').attr('value');
    var CmpID = $('#ddlMCompany').val();
    var BuyID = $('#ddlMBuyer').val();

    var Unitid = $('#ddlMUnit').val();

    //var Refno = $('#ddlMRefNo option:selected').text();
    //if (Refno == "--Select Ref No--") {
    //    Refno = "";
    //}
    var Refno = Mref;

    //var BRefnoid = $('#ddlMBRefNo option:selected').val();
    //var BRefno = $('#ddlMBRefNo option:selected').text();
    //if (BRefnoid == "0") {
    //    BRefno = "";
    //}
    var BRefno = MBref;
    //var OrdNo = $('#ddlMOrderNo option:selected').text();
    //if (OrdNo == "--Select Order No--") {
    //    OrdNo = "";
    //}
    var OrdNo = MOrd;
    var JobOrdNo = $('#ddlMJobNo option:selected').text();
    if (JobOrdNo == "--Select Job No--") {
        JobOrdNo = "";
    }

    var Ordtype = $('#ddlMOrderType option:selected').val();
    if (Ordtype == "0") {
        Ordtype = "";
    }

    var Seasonid = $('#ddlseason option:selected').val();
    if (Seasonid == "0") {
        Seasonid = ""; 
    }

    if (chk)
        MIG = "";
    var StyID = $('#ddlMStyle').val();

    var Statustype = $('input[name="Statustype"]:checked').attr('value');

    var Dttype = $('input[name="Dttype"]:checked').attr('value');

    window.open("../Reports/Planning/BOMReport.aspx?fdate=" + FDate + "&tdate=" + TDate + "&Compid=" + CmpID + "&BuyID=" + BuyID + "&Refno=" + Refno + "&OrdNo=" + OrdNo + "&JobOrdNo=" + JobOrdNo + "&StyID=" + StyID + "&BRefno=" + BRefno + "&Ordtype=" + Ordtype + "&Seasonid=" + Seasonid + "&Statustype=" + Statustype + "&Dttype=" + Dttype + "&Itmgrp=" + MIG + "&RptTyp=" + RptTyp);

   // window.open("../Reports/Planning/BOMReport.aspx");
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
function myByRef(Val) {
    
    debugger;
    var foo = [];
    MBref = 0;
    $('#ddlMBRefNo :selected').each(function (i, selected) {
        foo[i] = $(selected).text();

        MBref = MBref + "," + foo[i];


    });

}
