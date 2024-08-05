var ordNoDDL = "#";
var MainFDate = 0;
var MOrd = 0;
var Mref = 0;
var itemtype = 0;
$(document).ready(function () {

    MainFDate = $("#hdMainFromDate").data('value');
    LoadCompanyDDL("#ddlMCompany");
    LoadBuyerDDL("#ddlMBuyer");
    LoadOrderNoDDL("#ddlMOrderNo");
    LoadRefNoDDL("#ddlRefNo");
    LoadStyleDDL("#ddlStyle");
    getDate();

});

function LoadReport() {
    debugger;
    if ($('#ddlMCompany').val().trim() == 0) {
        $('#ddlMCompany').siblings(".select2-container").css('border', '1px solid red');
        return true;
    }
    else {
        $('#ddlMCompany').siblings(".select2-container").css('border', '1px lightgrey');
    }
    //if ($('#ddlMOrderNo').val() == 0) {
    //    $('#ddlMOrderNo').siblings(".select2-container").css('border', '1px solid red');
    //    return true;
    //}
    //else {
    //    $('#ddlMOrderNo').siblings(".select2-container").css('border', '1px lightgrey');
    //}

    //if ($('#ddlStyle').val() == 0) {
    //    $('#ddlStyle').siblings(".select2-container").css('border', '1px solid red');
    //    return true;
    //}
    //else {
    //    $('#ddlStyle').siblings(".select2-container").css('border', '1px lightgrey');
    //}


    var Colorchecked = true;
    var Sizechecked = true;

    var datefil = 'R';

    var i = 0;
    var c = 0;
    var s = 0;
    $(":checkbox").each(function () {
        Colorchecked = $('#ChkColor').is(":checked");
        Sizechecked = $('#ChkSize').is(":checked");
    });
   
    var  Ord= $('#ChkOrder').is(":checked");
    var prod = $('#ChkProduction').is(":checked");
  
    if (prod == true) {
        datefil = 'R';
    } else {
        datefil = 'O';
    }

  
    if (Colorchecked == true) {
        Colorchecked = false;
    }
    else {
        Colorchecked = true;
    }
    if (Sizechecked == true) {
        Sizechecked = false;
    } else {
        Sizechecked = true;
    }
    if ( Colorchecked == true && Sizechecked == true) {
        Colorchecked = false;
        Sizechecked = false;
    }
   
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var SuppID = $('#ddlMSupplier').val();
    var CmpID = $('#ddlMCompany').val();
    var BuyID = $('#ddlMBuyer').val();
    var ClrID = $('#ddlMColor').val();
    var OrdNo = $('#ddlMOrderNo option:selected').text();
    var StyID = $('#ddlStyle').val();
    var OrdType = $('#ddlMOrderType').val();
    var RfNo = $('#ddlRefNo option:selected').val();

    if (MOrd == 0 && Mref == 0) {
        alert('Please Select anyone orderNo or RefNo');
        return true;
    }

    //var OrdNo = OrdNo;

    window.open("../Reports/Production/ConsolidateOrderStatus/ConsolidateOrderStatus.aspx?OrderNo=" + OrdNo + "&StyleID=" + StyID + "&BuyerID=" + BuyID + "&CompId=" + CmpID + "&FromDate=" + FDate + "&ToDate=" + TDate + "&RefNo=" + RfNo + "&ColorGrp=" + Colorchecked + "&SizeGrp=" + Sizechecked + "&DtFilter=" + datefil);

    //window.open("../Reports/Production/ConsolidateOrderStatus/ConsolidateOrderStatus.aspx");
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
function LoadFOrdDropDetails() {


    var BMasId = $('#ddlMOrderNo').val();
    var JbId = $('#ddlRefNo').val();
    var StyId = $('#ddlStyle').val();
    var RefNo = "";
    var RNo = $('select#ddlRefNo option:selected').val();

    if (RNo == 0) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlRefNo option:selected').val();
    }
    RefNo == "";
    $.ajax({
        url: "/StockAuditEntry/GetDropNo",
        data: JSON.stringify({ BMasId: BMasId, JobId: JbId, Styleid: StyId, RefNo: RefNo }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {
                var data = result.Value;
                //Style
                $(ddlStyle).empty();
                $(ddlStyle).append($('<option/>').val('0').text('--Select Style--'));
                $.each(data, function () {
                    $(ddlStyle).append($('<option></option>').val(this.Styleid).text(this.Style));
                });
            }
        }

    });

}



function LoadRefwise() {
    debugger;

    var BMasId = 0;
    var JbId = 0;
    var StyId = 0;
    var Refid = $('select#ddlRefNo option:selected').val();

    $.ajax({
        url: "/GroupProcessOrder/GetGroupDropdwon",
        data: JSON.stringify({ BMasId: BMasId, JobId: JbId, Styleid: StyId, RefNo: Refid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {
                debugger;
                var data = result.Value;

                //OrdNo
                $(ddlMOrderNo).empty();
                $(ddlMOrderNo).append($('<option/>').val('0').text('--Select Order No--'));
                $.each(data, function () {
                    $(ddlMOrderNo).append($('<option></option>').val(this.BMasId).text(this.Buy_Ord_no));
                });



                //Style
                $(ddlStyle).empty();
                $(ddlStyle).append($('<option/>').val('0').text('--Select Style--'));
                $.each(data, function () {
                    $(ddlStyle).append($('<option></option>').val(this.Styleid).text(this.Style));
                });
            }


        }

    });


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
    $('#ddlRefNo :selected').each(function (i, selected) {
        foo[i] = $(selected).val();
        Mref = Mref + "," + foo[i];
    });

}
