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

    $(document).on('click', '#chkbom', function () {
        debugger;

        var val = $(this).is(":checked");
        if (val == true) {

            $('#ChkYarn').prop('checked', true);
            $('#ChkFabric').prop('checked', true);
            $('#ChkAccess').prop('checked', true);

        }
        else {
            $('#ChkYarn').prop('checked', false);
            $('#ChkFabric').prop('checked', false);
            $('#ChkAccess').prop('checked', false);
        }
    });


    $(document).on('click', '#ChkYarn', function () {

        var val = $(this).is(":checked");
        if (val == true) {
            $('#chkbom').prop('checked', true);
        }
        else {
            var fabchecked = $('#ChkFabric').is(":checked");
            var Acesschecked = $('#ChkAccess').is(":checked");

            if (fabchecked || Acesschecked) {
                $('#chkbom').prop('checked', true);
            }
            else {
                $('#chkbom').prop('checked', false);
            }
        }
    });

    $(document).on('click', '#ChkFabric', function () {

        var val = $(this).is(":checked");
        if (val == true) {
            $('#chkbom').prop('checked', true);
        }
        else {
            var fabchecked = $('#ChkYarn').is(":checked");
            var Acesschecked = $('#ChkAccess').is(":checked");

            if (fabchecked || Acesschecked) {
                $('#chkbom').prop('checked', true);
            }
            else {
                $('#chkbom').prop('checked', false);
            }
        }
    });

    $(document).on('click', '#ChkAccess', function () {

        var val = $(this).is(":checked");
        if (val == true) {
            $('#chkbom').prop('checked', true);
        }
        else {
            var fabchecked = $('#ChkFabric').is(":checked");
            var Acesschecked = $('#ChkYarn').is(":checked");

            if (fabchecked || Acesschecked) {
                $('#chkbom').prop('checked', true);
            }
            else {
                $('#chkbom').prop('checked', false);
            }
        }
    });



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
    if ($('#ddlMOrderNo').val() == 0) {
        //$('#ddlMOrderNo').css('border-color', 'Red');
        $('#ddlMOrderNo').siblings(".select2-container").css('border', '1px solid red');
        return true;
    }
    else {
        $('#ddlMOrderNo').siblings(".select2-container").css('border', '1px lightgrey');
    }

    if ($('#ddlStyle').val() == 0) {
        //$('#ddlMOrderNo').css('border-color', 'Red');
        $('#ddlStyle').siblings(".select2-container").css('border', '1px solid red');
        return true;
    }
    else {
        $('#ddlStyle').siblings(".select2-container").css('border', '1px lightgrey');
    }

   
    var Itemchecked = true;
    var Colorchecked = true;
    var Sizechecked = true;

    var i = 0;
    var c = 0;
    var s = 0;
    $(":checkbox").each(function () {
        Itemchecked = $('#ChkItem').is(":checked");
        Colorchecked = $('#ChkColor').is(":checked");
        Sizechecked = $('#ChkSize').is(":checked");
    });
    if (Itemchecked == true) {
        Itemchecked = false;
    }
    else {
        Itemchecked = true;
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
    if (Itemchecked == true && Colorchecked == true && Sizechecked == true) {
        Itemchecked = false;
        Colorchecked = false;
        Sizechecked = false;
    }

    var checkbox_value = "";
    var orderchecked = false;
    var bomchecked = false;
    var procprodchecked = false;
    var despchecked = false;
    var prodchecked = false;
    var stocktrans = false;
    $(":checkbox").each(function () {
        orderchecked = $('#chkorder').is(":checked");
        bomchecked = $('#chkbom').is(":checked");
        procprodchecked = $('#chkprocprod').is(":checked");
        despchecked = $('#despatch').is(":checked");
        prodchecked = $('#chkprod').is(":checked");
        stocktrans = $('#chkstocktran').is(":checked");
    });
    var itemtype = "";

    var ynchecked = false;
    var fabchecked = false;
    var Aceschecked = false;
    if (bomchecked) {
        $(":checkbox").each(function () {
             ynchecked = $('#ChkYarn').is(":checked");
            fabchecked = $('#ChkFabric').is(":checked");
            Aceschecked = $('#ChkAccess').is(":checked");

        });

        if (ynchecked)
            itemtype = itemtype + "," + "YARN";
        if (fabchecked)
            itemtype = itemtype + "," + "FABRIC";
        if (Aceschecked)
            itemtype = itemtype + "," + "ACCESSORY";
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
    var RfNo = $('#ddlRefNo option:selected').text();

   // var OrdNo = MOrd;

    window.open("../Reports/Order/OrderStatusReport.aspx?OrderNo=" + OrdNo + "&StyleID=" + StyID + "&orderchecked=" + orderchecked + "&bomchecked=" + bomchecked + "&procprodchecked=" + procprodchecked + "&prodchecked=" + prodchecked + "&despchecked=" + despchecked + "&BuyerID=" + BuyID + "&Itemtype=" + itemtype + "&CompId=" + CmpID + "&FromDate=" + FDate + "&ToDate=" + TDate + "&RefNo=" + RfNo + "&ItemGrp=" + Itemchecked + "&ColorGrp=" + Colorchecked + "&SizeGrp=" + Sizechecked + "&Stocktranschecked=" + stocktrans);
    //?CompanyID=" + CmpID + "&SupplierID=" + SuppID + "&BuyerID=" + BuyID + "&ColorID=" + ClrID + "&OrderNo=" + OrdNo + "&StyleID=" + StyID + "&FromDate=" + FDate + "&ToDate=" + TDate;
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
    RefNo = "";
    JbId = 0;
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


                ////RefNo
                //$(ddlRefNo).empty();
                //$(ddlRefNo).append($('<option/>').val('0').text('--Select RefNo--'));
                //$.each(data, function () {
                //    $(ddlRefNo).append($('<option></option>').text(this.RefNo));
                //});

                ////JobNo
                //$(ddlFWorkNo).empty();
                //$(ddlFWorkNo).append($('<option/>').val('0').text('--Select JobNo--'));
                //$.each(data, function () {
                //    $(ddlFWorkNo).append($('<option></option>').val(this.JobId).text(this.Job_Ord_no));
                //});

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
    $('#ddlMRefno :selected').each(function (i, selected) {
        foo[i] = $(selected).val();
        Mref = Mref + "," + foo[i];
    });

}
