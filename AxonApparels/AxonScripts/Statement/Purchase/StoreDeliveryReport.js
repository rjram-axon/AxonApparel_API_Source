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
    LoadCompanyUnitDDL("#ddlMFromUnit,#ddlLoc");

    LoadDepartmentDDL("#ddlDepartment");
   
    $('#supp').hide();
    $("#unit").show();

    //Changedropcont();
    getDate();
});

function RadioMBClick() {
    debugger;

    var protype = $('input[name="UType"]:checked').attr('value');
    if (protype == 'P') {
        $('#supp').hide();
        $("#unit").show();
    }
    else if (protype == 'S') {
        $("#unit").hide();
        $('#supp').show();
    }
}

function LoadLocation() {
    debugger;

    var LocalType = $('input[name="DSOType"]:checked').attr('value');

    $('#txtLocAdd').val('');

    if (LocalType == "U") {
        //LoadCompanyUnitDDL("#ddlLoc");
        LoadCompanyUnitDDL("#ddlLoc");
    } else if (LocalType == "F") {
        //LoadCompanyUnitDDL("#ddlLoc");
        LoadCompanyUnitDDL("#ddlLoc");
    } else if (LocalType == "S") {
        //LoadStoreUnitDDL("#ddlLoc");
        LoadEmployeeStoreunit();
    } else if (LocalType == "T") {
        LoadSupplierDDL("#ddlLoc");
    }
}

function LoadEmployeeStoreunit() {
    debugger;
    if (UserName == 'superuser') {
        LoginUserid = 0;
    }

    CompanyId = $('#ddlMCompany').val();

    $.ajax({
        url: "/StoreSetup/GetStoreRights",
        data: JSON.stringify({ Userid: LoginUserid, Storetype: 'M', Companyid: CompanyId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var data = result.Value;
            $(ddlLoc).empty();
            $(ddlLoc).append($('<option/>').val('0').text('--Select Store--'));
            $.each(data, function () {
                $(ddlLoc).append($('<option></option>').val(this.Storeid).text(this.StoreName));
            });
            $(ddlLoc).trigger("select2:updated");
            if (editmasunitstore > 0) {
                $('#ddlLoc').val(editmasunitstore).trigger('change');
            }
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
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
    // var SupplierId = $('#ddlMSupplier').val();

    //var Unit = $('#UType').prop('checked');
    //var Sup = $('#OptSup').prop('checked');

    var UType = $('input[name="UType"]:checked').attr('value');

    if (UType == "P") {
        SupplierId = $('#ddlMFromUnit').val();
    }
    else if (UType == "S") {

        SupplierId = $('#ddlMSupplier').val();
    }    

    var OType = $('input[name="MOType"]:checked').attr('value');
    var IType = $('input[name="IType"]:checked').attr('value');

    var DSOType = $('input[name="DSOType"]:checked').attr('value');
    DespatchLocId = $('#ddlLoc').val();

    //if (DSOType == "F") {
    //    Despatch = $('#ddlLoc').val();
    //}
    //else if (UType == "U") {
        
    //    Despatch = $('#ddlLoc').val();
    //}
    //else if (UType == "S") {

    //    Despatch = $('#ddlLoc').val();
    //}
    //else if (UType == "T") {

    //    Despatch = $('#ddlLoc').val();
    //}

    window.open("../Reports/Stores/StoreDeliveryReport.aspx?CompId=" + CmpID + "&BuyerID=" + BuyID + "&RefNo=" + RefNo + "&OrderNo=" + OrdNo + "&StyleID=" + StyleID + "&ItemId=" + ItemID + "&FromDate=" + FDate + "&ToDate=" + TDate + "&SupplierId=" + SupplierId + "&OType=" + OType + "&UType=" + UType + "&IType=" + IType + "&DSOType=" + DSOType + "&DespatchLocId=" + DespatchLocId);
    
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