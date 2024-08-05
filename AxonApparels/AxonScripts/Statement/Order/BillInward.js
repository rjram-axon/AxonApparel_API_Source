var ordNoDDL = "#";
var MainFDate = 0;
var MOrd = 0;
var Mref = 0;
var itemtype = 0;
$(document).ready(function () {

    MainFDate = $("#hdMainFromDate").data('value');
    LoadCompanyDDL("#ddlMCompany");
    LoadCompanyUnitDDL("#ddlUnit");
    LoadBuyerDDL("#ddlMBuyer");
    LoadStyleDDL("#ddlStyle");
    LoadProcessDDL("#ddlProcess");
    LoadOrderNoDDL("#ddlMOrderNo");
    LoadRefNoDDL("#ddlRefNo");
    LoadItemGroupDDL("#ddlItemGroup");
    LoadItemDDL("#ddlItem");
    LoadSupplierDDL("#ddlprocessor");
    LoadWorkdivisionDDL("#ddlinnerWorkdivision");
    Changedropcont();
    getDate();
    ddlmain();

    $('#ChkBilldet').prop('checked', true);
    $('#ChkInvdet').prop('checked', true);
    $('#Chkpassdet').prop('checked', true);

});

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


function Changedropcont() {
    debugger;
   
    var chkwork = $('#optoutint').prop('checked');
    var chkProces = $('#optoutext').prop('checked');
    if (chkwork) {
        $('#Mwork').show();
        $('#Mprocess').hide();
    }
    else if (chkProces) {
        $('#Mwork').hide();
        $('#Mprocess').show();
    }
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

function LoadReport() {
    debugger;

    var Refno;
    var OrdNo;

    var CmpID = $('#ddlMCompany').val();
    var BuyID = $('#ddlMBuyer').val();
    var StyID = $('#ddlStyle').val();

    var process_workdiv_id = 0;

    var unitId = $('#ddlUnit').val();
    var processId = $('#ddlProcess').val();
    var itemgroupid = $('#ddlItemGroup').val();
    var item = $('#ddlItem').val();
    var itemtype = 0;  

    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

  
    var statustype = $("input[name='statustype']:checked").val();
    var ordertype = $("input[name='ordertype']:checked").val();
    var DtType = $("input[name='proctype']:checked").val();

    if ($('#ddlMCompany').val().trim() == 0) {
        $('#ddlMCompany').siblings(".select2-container").css('border', '1px solid red');
        return true;
    }
    else {
        $('#ddlMCompany').siblings(".select2-container").css('border', '1px lightgrey');
    }

    var inorext = 'E';
    var chkwork = $('#optoutint').prop('checked');
    var chkProces = $('#optoutext').prop('checked');

    if (chkwork) {

     
        inorext = 'I';
        process_workdiv_id = $('#ddlinnerWorkdivision').val();

    }
    else if (chkProces) {
        inorext = 'E';
        process_workdiv_id = $('#ddlprocessor').val();
    }

  

    if (ordertype == "G") {
        OrdNo = "General";
        Refno = "";
        BuyID = 0;
        StyID = 0;

    }
    else {
        OrdNo = MOrd;  
        Refno = Mref;
    }

    var DateType = $("input[name='Datetype']:checked").val();
    var ChkUninv = $('#ChkUninv').prop('checked');
    var invtype = 'I'
    if (ChkUninv == true) {
        invtype = 'U'
    }
    var ChkUnBill = $('#ChkUnBill').prop('checked');

    var Passtype = 'Y'
    if (ChkUnBill == true) {
        Passtype = 'N'
    }
    var chkSupp = $('#ChkSupplier').prop('checked');

    var supptype = 'N'
    if (chkSupp == true) {
        supptype = 'Y'
    }

    var Billno = $('#ddlMBillNo option:selected').text();
    var SBillno = $('#ddlSBillNo option:selected').text();

    if (Billno == '--Select BillNo--' || Billno == undefined) {
        Billno = '';
    }

    if (SBillno == '--Select SupplierBill--' || SBillno == undefined) {
        SBillno = '';
    }


    var chkBill = $('#ChkBilldet').prop('checked');
    var billdet = 'Y'
    if (chkBill == false) {
        billdet = 'N'
    }

    var chkInv = $('#ChkInvdet').prop('checked');
    var invdet = 'Y'
    if (chkInv == false) {
        invdet = 'N'
    }

    var chkpass = $('#Chkpassdet').prop('checked');
    var passdet = 'Y'
    if (chkpass == false) {
        passdet = 'N'
    }
    var ChkDebCrd = $('#ChkDebCrd').prop('checked');
    var DebCrd = 0;
    if (ChkDebCrd == true) {
        var DebCrd = 1;
    }

    window.open("../Reports/Order/BillInwardReport1.aspx?CompId=" + CmpID + "&BuyerID=" + BuyID + "&Refno=" + Refno + "&OrderNo=" + OrdNo + "&StyleID=" + StyID + "&unitId=" + unitId + "&FromDate=" + FDate + "&ToDate=" + TDate + "&processId=" + processId + "&process_workdiv_id=" + process_workdiv_id + "&Datetype=" + DateType + "&statustype=" + statustype + "&ordertype=" + ordertype + "&Supptype=" + inorext + "&invtype=" + invtype + "&prcstype=" + supptype + "&Passtype=" + Passtype + "&Billno=" + Billno + "&SBillno=" + SBillno + "&billdet=" + billdet + "&invdet=" + invdet + "&passdet=" + passdet + "&DebCrd=" + DebCrd);
}


function ddlmain() {
  

    var CompId = $('#ddlMCompany').val();

    if (CompId == null) {
        CompId = DCompid;
    } else {
        CompId = $('#ddlMCompany').val();
    }


    $.ajax({
        url: "/BillEntry/Listddldet",
        data: JSON.stringify({ companyId: CompId}),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            var obj = json.Value;
            if (json.Status == 'SUCCESS') {

                var data = json.Value;
             
                $('#ddlMBillNo').empty();
                $('#ddlSBillNo').empty();

                $(ddlMBillNo).append($('<option/>').val('0').text('--Select BillNo--'));
                $.each(data, function () {
                    $(ddlMBillNo).append($('<option></option>').val(this.BillID).text(this.BillNo));
                });

                $(ddlSBillNo).append($('<option/>').val('0').text('--Select SupplierBill--'));
                $.each(data, function () {
                    $(ddlSBillNo).append($('<option></option>').text(this.SupBillNo));
                });
            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}