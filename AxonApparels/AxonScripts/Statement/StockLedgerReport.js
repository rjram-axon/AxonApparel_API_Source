var ordNoDDL = "#";
var MainFDate = 0;
var MOrd = 0;
var Mref = 0;
$(document).ready(function () {

    //$("#txtFromDate").val(moment(new Date()).format('DD/MM/YYYY'));
    //$("#txtToDate").val(moment(new Date()).format('DD/MM/YYYY'));    
    MainFDate = $("#hdMainFromDate").data('value');
    LoadCompanyDDL("#ddlMCompany");
    LoadSupplierDDL("#ddlManufacturer,#ddlMSupplier");
    LoadBuyerDDL("#ddlMBuyer");
    LoadEmployeeDDL("#ddlMerchandise,#ddlMerchan");
   // LoadOrderNoDDL("#ddlMOrderNo");
    LoadItemGroupDDL("#ddlMItemGroup");
    LoadStyleDDL("#ddlMStyle");
    LoadColorDDL("#ddlColor");
    LoadItemDDL("#ddlItem");
    LoadStoreUnitDDL("#ddlStore");
    LoadSizeDDL("#ddlSize");
    LoadProcessDDL("#ddlProcess");
    LoadCompanyUnitDDL("#ddlMUnit");
    getDate();
    LoadOrd();
    ListGrnNo();
});

function LoadReport() {
    debugger;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var SuppID = $('#ddlMSupplier').val();
    var CmpID = $('#ddlMCompany').val();
    //var BuyID = $('#ddlMBuyer').val();
    var ClrID = $('#ddlColor').val();
    var ItmId = $('#ddlItem').val();
    var SizeID = $('#ddlSize').val();
    //var OrdNo = $('#ddlMOrderNo option:selected').text();
    var OrdNo = MOrd;
    var OrdRefNo = Mref;
    //var OrdNo = "";
    //var ONo = $('select#ddlMOrderNo option:selected').val();

    //if (ONo == 0) {
    //    OrdNo == "";
    //}
    //else {

    //    OrdNo = $('select#ddlMOrderNo option:selected').text();
    //}


    var ItmGrp = "";
    var ItGrp = $('select#ddlMItemGroup option:selected').val();

    if (ItGrp == 0) {
        ItmGrp == "";
    }
    else {

        ItmGrp = $('select#ddlMItemGroup option:selected').text();
    }


    //var OrdRefNo = "";
    //var OrRefNo = $('select#ddlMRefNo option:selected').val();

    //if (OrRefNo == 0) {
    //    OrdRefNo == "";
    //}
    //else {

    //    OrdRefNo = $('select#ddlMRefNo option:selected').text();
    //}

    var GrnNo = "";
    var GnNo = $('select#ddlGRNno option:selected').val();

    if (GnNo == 0) {
        GrnNo == "";
    }
    else {

        GrnNo = $('select#ddlGRNno option:selected').text();
    }
    


    var StyID = $('#ddlMStyle').val();
    var ProcessID = $('#ddlProcess').val();
    var StoreID = $('#ddlStore').val();
    //var OrdType = $('#ddlMOrderType').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    //var OType = $('input[name="otype"]:checked').attr('value');
    //var POType = $('input[name="proctype"]:checked').attr('value');

    //window.open("../Reports/Stores/StockLedgerReport.aspx?CompanyID=" + CmpID + "&SupplierID=" + SuppID);
    //"&BuyerID=" + BuyID + "&ColorID=" + ClrID + "&OrderNo=" + OrdNo + "&StyleID=" + StyID + "&OrderType=" + OrdType + "&FromDate=" + FDate + "&ToDate=" + TDate;

    window.open("../Reports/Stores/StockLedgerReport.aspx?CompanyID=" + CmpID + "&SupplierID=" + SuppID + "&ColorID=" + ClrID + "&OrderNo=" + OrdNo
        + "&ItGroup=" + ItmGrp + "&StyleID=" + StyID + "&ItemID=" + ItmId + "&SizeID=" + SizeID + "&GrnNo=" + GrnNo + "&OrdRefNo=" + OrdRefNo
        + "&ProcessID=" + ProcessID + "&StoreID=" + StoreID + "&FromDate=" + FDate

      + "&ToDate=" + TDate);
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


function LoadOrd() {
    debugger;
    var protype = $('input[name="proctype"]:checked').attr('value');
    $("#ddlMRefno").empty();
    if (protype == 'B') {
        LoadBulkOrderNoDDL("#ddlMOrderNo");
        LoadBulkRefNoDDL("#ddlMRefNo");
    }
    if (protype == 'S') {
        LoadSampOrderNoDDL("#ddlMOrderNo");
        LoadSampleRefNoDDL("#ddlMRefNo");

    }
    if (protype == 'A') {
        LoadOrderNoDDL("#ddlMOrderNo");
        LoadRefNoDDL("#ddlMRefNo");

    }
}

function RadioMBClick() {
    LoadOrd();
}

function ListGrnNo() {
    //var FDate = $('#txtFromDate').val();
    //var TDate = $('#txtToDate').val();
    //var LType = $('input[name="MLocal"]:checked').attr('value');
    //var OType = $('input[name="otype"]:checked').attr('value');
    //var POType = $('input[name="proctype"]:checked').attr('value');
    $.ajax({
        url: "/GRNMain/GetStkGrnNo",
        data: JSON.stringify({}),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        //success: function (json) {
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;


                var podet = {};
                var po = [];


                $.each(obj, function (i, el) {

                    if (!podet[el.transno]) {
                        podet[el.transno] = true;
                        po.push(el);
                    }


                });

                $("#ddlGRNno").empty();

                //Po No
                $("#ddlGRNno").append($('<option/>').val('0').text('--Select Grn No--'));
                $.each(po, function () {
                    $("#ddlGRNno").append($('<option></option>').text(this.transno));
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
    $('#ddlMRefNo :selected').each(function (i, selected) {
        foo[i] = $(selected).val();

        Mref = Mref + "," + foo[i];


    });

}
