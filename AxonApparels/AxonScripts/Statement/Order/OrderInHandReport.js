var ordNoDDL = "#";
var MainFDate = 0;
var MOrd = 0;
var Mref = 0;
var itemtype = 0;
$(document).ready(function () {

    MainFDate = $("#hdMainFromDate").data('value');
    LoadCompanyDDL("#ddlMCompany");
    LoadBuyerDDL("#ddlMBuyer");
    LoadStyleDDL("#ddlStyle");
    LoadSeasonDDL("#ddlSeason");
    LoadCompanyUnitDDL("#ddlCompanyUnit");
    LoadColorDDL("#ddlColour");

    LoadOrderNoDDL("#ddlManager");
    LoadRefNoDDL("#ddlMerchandiser");
    LoadOrderNoDDL("#ddlMOrderNo");
    LoadRefNoDDL("#ddlRefNo");
    //LoadManagerDDL("#ddlManager");
    //LoadMerchandiserDDL("#ddlMerchandiser");

    LoadManager();
    LoadMerchandiser();

    getDate();  



});

function LoadManager() {
    debugger;

       $.ajax({
        url: "/OrderInHand/GetManager",
        //data: "",  //JSON.stringify({ cmpid: cmpyid, cmpunitid: cunitid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            if (result.Status == 'SUCCESS') {

                // if (Mode == 0) {
                var data = result.Value;
                $(ddlManager).empty();
                $(ddlManager).append($('<option/>').val('0').text('--Select Manager--'));
                $.each(data, function () {
                    $(ddlManager).append($('<option></option>').val(this.EmpId).text(this.EmpName));
                });
                //}


            }
        }
    });
}

function LoadMerchandiser() {
    debugger; 

    $.ajax({
        url: "/OrderInHand/GetMerchandiser",
        //data: "",  //JSON.stringify({ cmpid: cmpyid, cmpunitid: cunitid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            if (result.Status == 'SUCCESS') {

                // if (Mode == 0) {
                var data = result.Value;
                $(ddlMerchandiser).empty();
                $(ddlMerchandiser).append($('<option/>').val('0').text('--Select Merchandiser--'));
                $.each(data, function () {
                    $(ddlMerchandiser).append($('<option></option>').val(this.EmpId).text(this.EmpName));
                });
                //}


            }
        }
    });
}


function LoadReport() {
    debugger;

    var CmpID = $('#ddlMCompany').val();
    var BuyID = $('#ddlMBuyer').val();
    var StyID = $('#ddlStyle').val();
    var SeasonID = $('#ddlSeason').val();
    var ManagerID = $('#ddlManager').val();
    var MerchandiserID = $('#ddlMerchandiser').val();
    var cmpunitID = $('#ddlCompanyUnit').val();
    var ColorId = $('#ddlColour').val();

    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();   

    //if ($('#ddlMCompany').val().trim() == 0) {
    //    $('#ddlMCompany').css('border-color', 'Red');
    //    return true;
    //}  

    if ($('#ddlMCompany').val() == 0) {
        $('#ddlMCompany').siblings(".select2-container").css('border', '1px solid red');
        return true;
    }
    else {
        $('#ddlMCompany').siblings(".select2-container").css('border', '1px lightgrey');
    }
    if ($('#ddlMOrderNo').val() == 0) {
        //$('#ddlMOrderNo').css('border-color', 'Red');
        $('#ddlMOrderNo').siblings(".select2-container").css('border', '1px solid red');
        return true;
    }
    else {
        $('#ddlMOrderNo').siblings(".select2-container").css('border', '1px lightgrey');
    }   

    //var OrdNo = $('#ddlMOrderNo option:selected').text();
    //var Refno = $('#ddlRefNo option:selected').text();

    //////myOrder(OrdNo);
    //////myRef(Refno);

    var Refno = Mref;
    var OrdNo = MOrd;

    var statustype = $("input[name='statustype']:checked").val();
    var ordertype = $("input[name='ordertype']:checked").val();
    var DtType = $("input[name='proctype']:checked").val();
   
    var ViweColor = $('#chkColor').is(":checked");
    //if (chkColor == true) {
    //    var ViweColor = 1;
    //} else {
    //    var ViweColor = 0;
    //}
    // var OrdNo = MOrd;   
    var groupby = $('#ddlGroupBy').val();

    var chkActProd = $('#chkActProd').is(":checked");
    if (chkActProd == true) {
        var chkActProd = 'Y';
    } else {
        var chkActProd = 'N';
    }


    window.open("../Reports/Order/OrderInHandReport.aspx?CompanyID=" + CmpID + "&BuyerID=" + BuyID + "&Refno=" + Refno + "&OrderNo=" + OrdNo + "&StyleID=" + StyID + "&SeasonID=" + SeasonID + "&FromDate=" + FDate + "&ToDate=" + TDate + "&ManagerID=" + ManagerID + "&MerchandiserID=" + MerchandiserID + "&statustype=" + statustype + "&ordertype=" + ordertype + "&proctype=" + DtType + "&ViweColor=" + ViweColor + "&CompUnitID=" + cmpunitID + "&ColorID=" + ColorId + "&groupby=" + groupby + "&Sewing=" + chkActProd);

    //window.open("../Reports/Order/OrderInHandReport.aspx");


    /////
    ////
    //var RptTyp = $('input[name="BudPrintPreviewPlanned"]:checked').attr('value');
    //var Curr = $("input[id='Currency']:checked").val();

    //if (Curr != undefined) {
    //    Curr = 1;
    //}
    //else { Curr = 0; }

    //var tot = $("input[id='Total']:checked").val();

    //if (tot != undefined) {
    //    tot = 1;
    //}
    //else { tot = 0; }



    //var statustype = $("input[name='statustype']:checked").val();
    //var DtType = $("input[name='proctype']:checked").val();
    ////var Refno = $('#ddlRefNo option:selected').text();
    ////if (Refno == "--Select Ref No--") {
    ////    Refno = "";
    ////}
    //var Refno = Mref;
    //var OrdNo = MOrd;
    ////var OrdNo = $('#ddlOrderNo option:selected').text();
    ////if (OrdNo == "--Select Order No--") {
    ////    OrdNo = "";
    ////}

    //var OrdType = $('#ddlMOrderType').val();
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
    $('#ddlMOrderNo :selected').each(function (i, selected) {
        foo[i] = $(selected).text();

        MOrd = MOrd + "," + foo[i];

    });
}
function myRef(Val) {

    debugger;
    var foo = [];
    Mref = 0;
    $('#ddlRefNo :selected').each(function (i, selected) {
        foo[i] = $(selected).text();

        Mref = Mref + "," + foo[i];


    });

}