
//var ItemList = [];
//var AcomId = 0;
var Itmdet = [];
var AccList = [];
//var GIssId = 0;
//var Itemrowindex = -1;
//var rowindex = -1;
//var index = 0;
//var GRetId = 0
var TAmt = 0;
var GrossAmt = 0;
var ANAmt = 0;
var GDebId = 0;
var Userid = 0;
var UserName = 0;
var MainFDate = 0;
var repobj = [];
var Repid = 0;
var Guserid = 0;
var EditFlag = 0;
var DCompid = 0;
$(document).ready(function () {
    debugger;

    Guserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    MainFDate = $("#hdMainFromDate").data('value');
    DCompid = $("#hdnDCompid").data('value');
    getDate();
    LoadProcessDDL("#ddlProcess");
    LoadSupplierDDL("#ddlParty");
    LoadCurrencyDDL("#ddlCurrency");
    //Main
    LoadOrderNoDDL("#ddlordno");
    LoadRefNoDDL("#ddlreferno");
    ListDebitNo();
    LoadCompanyDDL("#ddlcompany,#ddlMCompany");
    ListProcess();
    ListSup();
    LoadMainGrid();
    //
    $("#selectall").change(function () {
        debugger;
        if (this.checked == true) {
            $('#sbTwo option').each(function () {
                $(this).prop('selected', true);
            });
        } else {
            $('#sbTwo option').each(function () {
                $(this).prop('selected', false);
            });
        }
    });
    $('#btnitmadd').click(function () {
        debugger;
        var isAllValid = true;
        var lengdp = 0;

        var OType = $('input[name="optype"]:checked').attr('value');

        if (OType == "O") {



            if ($('#ddlorderno').val() == "0") {
                isAllValid = false;

                $('#ddlorderno').css('border-color', 'Red');
            }
            else {

                $('#ddlorderno').css('border-color', 'lightgrey');
            }

            if ($('#ddlrefno').val() == "0") {
                isAllValid = false;
                $('#ddlrefno').css('border-color', 'Red');
            }
            else {
                $('#ddlrefno').css('border-color', 'lightgrey');
            }

            if ($('#ddlwrkord').val() == "0") {
                isAllValid = false;
                $('#ddlwrkord').css('border-color', 'Red');
            }
            else {
                $('#ddlwrkord').css('border-color', 'lightgrey');
            }
        }
        if ($('#ddlItem').val() == "0") {
            isAllValid = false;
            $('#ddlItem').css('border-color', 'Red');
        }
        else {
            $('#ddlItem').css('border-color', 'lightgrey');
        }
        if ($('#ddlColor').val() == "0") {
            isAllValid = false;
            $('#ddlColor').css('border-color', 'Red');
        }
        else {
            $('#ddlColor').css('border-color', 'lightgrey');
        }
        if ($('#ddlSize').val() == "0") {
            isAllValid = false;
            $('#ddlSize').css('border-color', 'Red');
        }
        else {
            $('#ddlSize').css('border-color', 'lightgrey');
        }


        if ($('#txtqty').val() == "") {
            isAllValid = false;
            $('#txtqty').css('border-color', 'Red');
        }
        else {
            $('#txtqty').css('border-color', 'lightgrey');
        }
        if ($('#txtRate').val() == "") {
            isAllValid = false;
            $('#txtRate').css('border-color', 'Red');
        }
        else {
            $('#txtRate').css('border-color', 'lightgrey');
        }
        if ($('#txtamt').val() == "") {
            isAllValid = false;
            $('#txtamt').css('border-color', 'Red');
        }
        else {
            $('#txtamt').css('border-color', 'lightgrey');
        }




        if (Itmdet.length == 0) {
            lengdp = 1;
        }
        else {
            lengdp = Itmdet.length + 1;
        }
        if (isAllValid) {

            var DetObj = {
                slno: lengdp,
                DebitDetId: 0,
                DebitID: 0,

                OrdNo: $("#ddlorderno option:selected").text(),
                BmasId: $("#ddlorderno option:selected").val(),

                JobId: $("#ddlwrkord option:selected").val(),
                JobNo: $("#ddlwrkord option:selected").text(),

                RefId: $("#ddlrefno option:selected").val(),
                Refno: $("#ddlrefno option:selected").text(),

                Itemid: $("#ddlItem option:selected").val(),
                Item: $("#ddlItem option:selected").text(),
                Colorid: $("#ddlColor option:selected").val(),
                Color: $("#ddlColor option:selected").text(),
                Sizeid: $("#ddlSize option:selected").val(),
                Size: $("#ddlSize option:selected").text(),
                Quantity: $("#txtqty").val(),
                Rate: $("#txtRate").val(),
                Amt: $("#txtamt").val(),


            }
            Itmdet.push(DetObj);
            LoadItmtab(DetObj);

            var totalAccamnt = 0;
            for (var e = 0; e < Itmdet.length; e++) {
                var amount = Itmdet[e].Amt;
                totalAccamnt = totalAccamnt + parseFloat(amount);

            }

            $('#txtGrandTotal').val(totalAccamnt.toFixed(3));
            var GAmt = $('#txtTotalAmount').val();
            var NAmt = $('#txtnetamnt').val();
            var FNAmt = parseFloat(GAmt) + parseFloat(NAmt);

            $('#txtGrossAmount').val(FNAmt);
        }
        ClearData();
    });

    $(document).on('click', '.btnitmedit', function () {
        debugger;

        EditFlag = 1;
        rowindex = $(this).closest('tr').index();

        var cur1 = Itmdet.slice(rowindex);

        var OType = $('input[name="optype"]:checked').attr('value');

        if (OType == "O") {

            $('#ddlorderno').val(cur1[0]['BmasId']).trigger('change');
            $('#ddlwrkord').val(cur1[0]['JobId']).trigger('change');
            $('#ddlrefno').val(cur1[0]['RefId']).trigger('change');
            //$('#ddlorderno').val("");
            //$('#ddlwrkord').val("");
            //$('#ddlrefno').val("");
        }
        $('#ddlItem').val(cur1[0]['Itemid']).trigger('change');
        $('#ddlColor').val(cur1[0]['Colorid']).trigger('change');
        $('#ddlSize').val(cur1[0]['Sizeid']).trigger('change');

        $('#txtqty').val(cur1[0]['Quantity']);
        $('#txtRate').val(cur1[0]['Rate']);
        $('#txtamt').val(cur1[0]['Amt']);


        $('#btnitmadd').hide();
        $('#btnitmupdate').show();
    });
    $('#btnitmupdate').click(function () {
        debugger;

        var currentrowsel = Itmdet.slice(rowindex);

        var OType = $('input[name="optype"]:checked').attr('value');

        if (OType == "O") {

            currentrowsel[0]['BmasId'] = $("#ddlorderno").val();
            currentrowsel[0]['OrdNo'] = $("#ddlorderno option:selected").text();
            currentrowsel[0]['JobId'] = $("#ddlwrkord").val();
            currentrowsel[0]['JobNo'] = $("#ddlwrkord option:selected").text();
            currentrowsel[0]['RefId'] = $("#ddlrefno").val();
            currentrowsel[0]['Refno'] = $("#ddlrefno  option:selected").text();
        }
        currentrowsel[0]['Itemid'] = $("#ddlItem").val();
        currentrowsel[0]['Item'] = $("#ddlItem  option:selected").text();
        currentrowsel[0]['Colorid'] = $("#ddlColor").val();
        currentrowsel[0]['Color'] = $("#ddlColor  option:selected").text();
        currentrowsel[0]['Sizeid'] = $("#ddlSize").val();
        currentrowsel[0]['Size'] = $("#ddlSize  option:selected").text();


        currentrowsel[0]['Quantity'] = $("#txtqty").val();


        currentrowsel[0]['Rate'] = $("#txtRate").val();
        currentrowsel[0]['Amt'] = $("#txtamt").val();



        Itmdet[rowindex] = currentrowsel[0];

        LoadItmtab(Itmdet);


        ClearData();
        $('#btnitmadd').show();
        $('#btnitmupdate').hide();
    });

    $(document).on('click', '.btnitmremove', function () {
        rowindex = $(this).closest('tr').index();

        Itmdet.splice(rowindex, 1);
        document.getElementById("tblOpItemGrid").deleteRow(rowindex + 1);


    });



    $('#btnImadd').click(function () {
        debugger;

        var leng = 0;

        var isAllValid = true;


        debugger;
        if ($('#ddlAcc').val() == "0") {
            isAllValid = false;
            $('#ddlAcc').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#ddlAcc').siblings('span.error').css('visibility', 'hidden');
        }


        if (AccList.length == 0) {
            leng = 1;
        }
        else {
            leng = AccList.length + 1;
        }

        AcSno = leng;



        if (isAllValid) {


            debugger;
            var AcListObj = {
                Addless: $("#ddlAcc option:selected").text(),
                Addlessid: $('#ddlAcc').val(),
                PlusOrMinus: $('#txtPorMins').val(),
                Percentage: $('#txtPer').val(),
                Amount: $('#txtAmount').val(),
                SlNo: leng,

                Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
            };

            AccList.push(AcListObj);

            loadAccTable(AcListObj);

            //var totalamnt = 0;
            //for (var e = 0; e < AccList.length; e++) {
            //    var amount = AccList[e].Amount;
            //    totalamnt = totalamnt + parseFloat(amount);

            //}


            //$('#txtAccAmt').val(totalamnt.toFixed(3));


            //var GAmt = $('#txtGrandTotal').val();
            //var AcAmt = $('#txtAccAmt').val();
            //var FNAmt = parseFloat(GAmt) + parseFloat(AcAmt);

            //$('#txtNetAmt').val(FNAmt);

            fnClearAccControls();
        }
    });

    $(document).on('click', '.btnaccedit', function () {
        debugger;
        Mode = 1;

        rowindex = $(this).closest('tr').index();

        var currentro12 = AccList.slice(rowindex);

        $('#ddlAcc').val(currentro12[0]['Addlessid']).trigger('change');
        $('#txtPorMins').val(currentro12[0]['PlusOrMinus']);
        $('#txtPer').val(currentro12[0]['Percentage']);
        $('#txtAmount').val(currentro12[0]['Amount']);

        $('#btnImadd').hide();
        $('#btnImupdate').show();
    });



    $('#btnImupdate').click(function () {
        debugger;
        var currentrowsel = AccList.slice(rowindex);

        currentrowsel[0]['Addlessid'] = $("#ddlAcc").val();
        currentrowsel[0]['Addless'] = $("#ddlAcc option:selected").text();
        currentrowsel[0]['PlusOrMinus'] = $("#txtPorMins").val();
        currentrowsel[0]['Percentage'] = $("#txtPer").val();
        currentrowsel[0]['Amount'] = $("#txtAmount").val();

        AccList[rowindex] = currentrowsel[0];

        loadAccTable(AccList);

        $('#btnImupdate').hide();
        $('#btnImadd').show();

        if (Mode == 0) {
            fnClearAccControls();
        }
        else {
            fnClearAccControls();

        }
        Mode = 0;
    });

    $(document).on('click', '.btnaccremove', function () {
        rowindex = $(this).closest('tr').index();
        AccList.splice(rowindex, 1);
        document.getElementById("tblPaydetails").deleteRow(rowindex + 1);
        loadAccTable(AccList);

    });

});


function ListDebitNo() {
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var DCType = $('input[name="MDCType"]:checked').attr('value');
    var OType = $('input[name="MOType"]:checked').attr('value');

    var CompId = $('#ddlMCompany').val();
    var SuppId = $('#ddlMParty').val();
    var ProcId = $('#ddlMProcess').val();


    $.ajax({
        url: "/OpenDebitNote/GetMainDebitNo",
        data: JSON.stringify({ Companyid: CompId, Partyid: SuppId, Processid: ProcId, OrderType: OType, DebitOrCredit: DCType, FromDate: FDate, ToDate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;

                $(ddlMDebitNo).empty();
                //Debit
                $(ddlMDebitNo).append($('<option/>').val('0').text('--Select DebitNo--'));
                $.each(data, function () {
                    $(ddlMDebitNo).append($('<option></option>').val(this.DebitId).text(this.DebitNo));
                });

            }
        }

    });
}
function ListProcess() {
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var DCType = $('input[name="MDCType"]:checked').attr('value');
    var OType = $('input[name="MOType"]:checked').attr('value');

    var CompId = $('#ddlMCompany').val();
    var SuppId = $('#ddlMParty').val();
    var DebId = $('#ddlMDebitNo').val();


    $.ajax({
        url: "/OpenDebitNote/GetMainDebProcess",
        data: JSON.stringify({ Companyid: CompId, Partyid: SuppId, DebitId: DebId, OrderType: OType, DebitOrCredit: DCType, FromDate: FDate, ToDate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;

                $(ddlMProcess).empty();
                //Process
                $(ddlMProcess).append($('<option/>').val('0').text('--Select Process--'));
                $.each(data, function () {
                    $(ddlMProcess).append($('<option></option>').val(this.Processid).text(this.Process));
                });



            }
        }

    });
}
function ListSup() {
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var DCType = $('input[name="MDCType"]:checked').attr('value');
    var OType = $('input[name="MOType"]:checked').attr('value');

    var CompId = $('#ddlMCompany').val();
    var ProssId = $('#ddlMProcess').val();
    var DebId = $('#ddlMDebitNo').val();


    $.ajax({
        url: "/OpenDebitNote/GetMainDebSuppDrop",
        data: JSON.stringify({ Companyid: CompId, Processid: ProssId, DebitId: DebId, OrderType: OType, DebitOrCredit: DCType, FromDate: FDate, ToDate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;

                $(ddlMParty).empty();
                //Supp
                $(ddlMParty).append($('<option/>').val('0').text('--Select Supplier--'));
                $.each(data, function () {
                    $(ddlMParty).append($('<option></option>').val(this.Partyid).text(this.Supplier));
                });



            }
        }

    });
}
function fnClearAccControls() {
    $('#ddlAcc').val('0');
    $('#txtPorMins').val('');
    $('#txtPer').val('');
    $('#txtAmount').val('');
}
function ClearData() {

    $('#ddlorderno').val('0').trigger('change');
    $('#ddlwrkord').val('0').trigger('change');
    $('#ddlrefno').val('0').trigger('change');

    $('#ddlItem').val('0').trigger('change');
    $('#ddlColor').val('0').trigger('change');
    $('#ddlSize').val('0').trigger('change');

    $('#txtqty').val('');
    $('#txtRate').val('');
    $('#txtamt').val('');

}

function RadioACClick() {
    GenerateNumber();
}

function GenerateNumber() {
    debugger;


    var DCtype = $('input[name="ACType"]:checked').attr('value');
    //var CompId = $('#ddlcompany').val();

    CompId = $('#ddlcompany').val();

    if (CompId == null) {
        CompId = DCompid;
    } else {
        CompId = $('#ddlcompany').val();
    }


    if (DCtype == 'D') {
        table = "OpenDebitMas",
    column = "DebitNo",
    compId = CompId,
    Docum = 'OPEN DEBIT NOTE'
    } else {
        table = "OpenDebitMas",
   column = "DebitNo",
   compId = CompId,
   Docum = 'OPEN CREDIT NOTE'
    }







    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $('#txtDebitNo').val(result.Value);
        }
    });
}

function LoadPlusAdd() {
    $('#txtPorMins').val("");
    var AccID = $('#ddlAcc').val();

    $.ajax({
        url: "/AccountHeads/GetbyID/" + AccID,
        typr: "GET",

        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                $('#txtPorMins').val(obj.AddlessType);

            }
        }

    });

}
function calcamnt() {
    debugger;
    var rate = $('#txtRate').val();
    var qty = $('#txtqty').val();
    var tot = parseFloat(rate) * parseFloat(qty);
    $('#txtamt').val(tot);
}

function LoadNetAmount() {
    var Per = $('#txtPer').val();
    var GrossAmt = $('#txtGrandTotal').val();
    var Amt = (Per * GrossAmt) / 100;
    $('#txtAmount').val(Amt);



}

function LoadItmtab(DetObj) {
    debugger;
    $('#tblOpItemGrid').DataTable().destroy();


    $('#tblOpItemGrid').DataTable({
        data: Itmdet,
        scrollY: 100,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        "bSort": false,
        columns: [

             { title: "DebitDetId", data: "DebitDetId", "visible": false },
            { title: "DebitID", data: "DebitID", "visible": false },
            { title: "Order No", data: "OrdNo" },
            { title: "Ref No", data: "Refno" },
            { title: "Work Ord No", data: "JobNo" },
            { title: "Item", data: "Item" },
            { title: "Color", data: "Color" },
            { title: "Size", data: "Size" },
             { title: "Quanity", data: "Quantity" },
              { title: "Rate", data: "Rate" },
               { title: "Amount", data: "Amt" },
            { title: "ItemId", data: "Itemid", "visible": false },
            { title: "ColorId", data: "Colorid", "visible": false },
             { title: "SizeId", data: "Sizeid", "visible": false },
               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnitmedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnitmremove btn btn-danger btn-round"> <i class="fa fa-minus"></i> </button>   </div>'
               }
        ]
    });

    var totalAccamnt = 0;
    for (var e = 0; e < Itmdet.length; e++) {
        var amount = Itmdet[e].Amt;
        totalAccamnt = totalAccamnt + parseFloat(amount);

    }

    $('#txtGrandTotal').val(totalAccamnt.toFixed(3));
    var GAmt = $('#txtTotalAmount').val();
    var NAmt = $('#txtnetamnt').val();
    var FNAmt = parseFloat(GAmt) + parseFloat(NAmt);

    $('#txtGrossAmount').val(FNAmt);
    Netamt();
    LoadCurrency();

    $("#tblOpItemGrid tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblOpItemGrid tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}
function getDate() {
    debugger;
    //var todaydate = new Date();
    //var day = todaydate.getDate();
    //var Pmonth = todaydate.getMonth() - 2;
    //var Cmonth = todaydate.getMonth() + 1;
    //var year = todaydate.getFullYear();
    //var datestring = Pmonth + "/" + day + "/" + year;
    //var Fdatestring = day + "/" + Cmonth + "/" + year;

    //var day = new Date(),
    //    year = ((day.getMonth() - 2) < 0) ? (day.getFullYear() - 1) : day.getFullYear(),
    //    month = ((day.getMonth() - 2) < 0) ? (12 + (day.getMonth() - 2)) : (day.getMonth() + 1),
    //    date = month + '/' + day.getDate() + '/' + year;

    //$('#txtDebitDate').val(Fdatestring);
    //$('#txtRefDate').val(Fdatestring);
    //$('#txtFromDate').val(MainFDate);
    //$('#txtToDate').val(Fdatestring);

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
    //$('#txtFromDate').val(MainFDate);
    //$('#txtToDate').val(Fdatestring);


    $('#txtDebitDate').val(Fdatestring);
    $('#txtRefDate').val(Fdatestring);
    $('#txtFromDate').val(MainFDate);
    $('#txtToDate').val(Fdatestring);

}

function LoadOrdDet() {
    $("#ddlorderno").prop("disabled", false);
    $("#ddlwrkord").prop("disabled", false);
    $("#ddlrefno").prop("disabled", false);
    //LoadProcessDDL("#ddlProcess");
    // LoadSupplierDDL("#ddlParty");
    LoadAddlessDDL("#ddlAcc");
    //LoadOrderNoDDL();
    LoadSizeDDL("#ddlSize");
    LoadItemDDL("#ddlItem");
    LoadColorDDL("#ddlColor");
    LoadOrderNoDDL("#ddlorderno");
    LoadRefNoDDL("#ddlrefno");
    LoadJobNoDDL("#ddlwrkord");
    //LoadCurrencyDDL("#ddlCurrency");
}
function LoadOpDet() {

    $('#ddlorderno').val("");
    $('#ddlwrkord').val("");
    $('#ddlrefno').val("");

    $("#ddlorderno").prop("disabled", true);
    $("#ddlwrkord").prop("disabled", true);
    $("#ddlrefno").prop("disabled", true);

    //LoadProcessDDL("#ddlProcess");
    // LoadSupplierDDL("#ddlParty");
    LoadAddlessDDL("#ddlAcc");
    LoadSizeDDL("#ddlSize");
    LoadItemDDL("#ddlItem");
    LoadColorDDL("#ddlColor");
    //LoadCurrencyDDL("#ddlCurrency");
}

function ClearTextbox() {


    var OPType = $('input[name="optype"]:checked').attr('value');

    if (OPType == "P") {
        //LoadOrderNoDDL("#ddlorderno");
        //LoadRefNoDDL("#ddlrefno");
        //LoadJobNoDDL("#ddlwrkord");
        $("#ddlorderno").prop("disabled", true);
        $("#ddlwrkord").prop("disabled", true);
        $("#ddlrefno").prop("disabled", true);
        //LoadProcessDDL("#ddlProcess");
        // LoadSupplierDDL("#ddlParty");
        LoadAddlessDDL("#ddlAcc");
        LoadSizeDDL("#ddlSize");
        LoadItemDDL("#ddlItem");
        LoadColorDDL("#ddlColor");
        //LoadCurrencyDDL("#ddlCurrency");
    }
    else {
        $("#ddlorderno").prop("disabled", false);
        $("#ddlwrkord").prop("disabled", false);
        $("#ddlrefno").prop("disabled", false);
        // LoadProcessDDL("#ddlProcess");
        // LoadSupplierDDL("#ddlParty");
        LoadAddlessDDL("#ddlAcc");
        //LoadOrderNoDDL();
        LoadSizeDDL("#ddlSize");
        LoadItemDDL("#ddlItem");
        LoadColorDDL("#ddlColor");
        LoadOrderNoDDL("#ddlorderno");
        LoadRefNoDDL("#ddlrefno");
        LoadJobNoDDL("#ddlwrkord");
        //LoadCurrencyDDL("#ddlCurrency");
    }
    GenerateNumber();
}

function LoadCurrency() {
    debugger;
    var CurrId = $('#ddlCurrency').val();
    $.ajax({
        url: "/Currency/GetbyID/" + CurrId,
        typr: "GET",

        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                $('#txtExchangeRate').val(obj.Exchangerate);

                var ExRate = $('#txtExchangeRate').val();


                var GAmt = $('#txtGrandTotal').val();
                var AcAmt = $('#txtAccAmt').val();
                var FNAmt = parseFloat(GAmt) + parseFloat(AcAmt) * ExRate;

                $('#txtNetAmt').val(FNAmt);

                $('#txtGrossAmount').val(FNAmt);

            }
        }

    });
}

function LoadOrdDropDetails() {
    

        debugger;
        var BMasId = $('#ddlorderno').val();
        var JbId = $('#ddlwrkord').val();
        var StyId = 0;
        var RefNo = "";
        var RNo = $('select#ddlrefno option:selected').val();

        if (RNo == 0) {
            RefNo == "";
        }
        else {

            RefNo = $('select#ddlrefno option:selected').val();
        }

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

                    if (EditFlag == 0) {
                        //RefNo
                        $(ddlrefno).empty();
                        $(ddlrefno).append($('<option/>').val('0').text('--Select RefNo--'));
                        $.each(data, function () {
                            $(ddlrefno).append($('<option></option>').text(this.RefNo));
                        });

                        //JobNo
                        $(ddlwrkord).empty();
                        $(ddlwrkord).append($('<option/>').val('0').text('--Select JobNo--'));
                        $.each(data, function () {
                            $(ddlwrkord).append($('<option></option>').val(this.JobId).text(this.Job_Ord_no));
                        });
                    }
                    else {
                        EditFlag = 0;
                    }

                    ////Style
                    //$(ddlFStyle).empty();
                    //$(ddlFStyle).append($('<option/>').val('0').text('--Select Style--'));
                    //$.each(data, function () {
                    //    $(ddlFStyle).append($('<option></option>').val(this.Styleid).text(this.Style));
                    //});
                }


            }

        });
   
}

function loadAccTable(AcListObj) {
    debugger;
    $('#tblPaydetails').DataTable().destroy();

    $('#tblPaydetails').DataTable({
        data: AccList,

        columns: [

               { title: "AddlessId", data: "Addlessid", "visible": false },
               { title: "Accounts Head", data: "Addless", },
               { title: "+/-", data: "PlusOrMinus", },
               { title: "Percent", data: "Percentage", },
               { title: "Amount", data: "Amount", },

               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnaccedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button"data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnaccremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div> '

               },

        ]
    });

    var totalamnt = 0;
    var TotNetAmt = 0;


    if ( AccList.length>0) {
        //var amount = AccList[e].Amount;
        //totalamnt = totalamnt + parseFloat(amount);


        var plusamt = 0;
        var minusamt = 0;

        $.each(AccList, function (i) {

            var Percentage = parseFloat(AccList[i].percentage);
            var PlusOrMinus = AccList[i].PlusOrMinus;

            if (PlusOrMinus == '+') {
                var Amt = parseFloat(AccList[i].Amount);
                plusamt = parseFloat(plusamt) + Amt;
            }
            if (PlusOrMinus == '-') {
                var Amt = parseFloat(AccList[i].Amount);
                minusamt = parseFloat(minusamt) + Amt;
            }

        })

       
        TotNetAmt = TotNetAmt + plusamt;
        TotNetAmt = TotNetAmt - minusamt;

        TotNetAmt = parseFloat(TotNetAmt).toFixed(2);
        totalamnt = TotNetAmt;


    }


    $('#txtAccAmt').val(totalamnt);


    var GAmt = $('#txtGrandTotal').val();
    var AcAmt = $('#txtAccAmt').val();
    var FNAmt = parseFloat(GAmt) + parseFloat(AcAmt);

    $('#txtNetAmt').val(FNAmt);
    LoadCurrency();
}


function validate() {
    var isValid = true;


    if ($('#txtDebitNo').val() == "") {
        $('#txtDebitNo').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtDebitNo').css('border-color', 'lightgrey');
    }


    if ($('#ddlProcess').val() == 0) {
        //$('#ddlProcess').css('border-color', 'Red');
        $('#ddlProcess').siblings(".select2-container").css('border', '1px solid red');
        isValid = false;
    }
    else {
        //$('#ddlProcess').css('border-color', 'lightgrey');
        $('#ddlProcess').siblings(".select2-container").css('border', '1px solid lightgrey');
    }


    if ($('#ddlParty').val() == 0) {
        //$('#ddlParty').css('border-color', 'Red');
        $('#ddlParty').siblings(".select2-container").css('border', '1px solid red');
        isValid = false;
    }
    else {
        //$('#ddlParty').css('border-color', 'lightgrey');
        $('#ddlParty').siblings(".select2-container").css('border', '1px solid lightgrey');
    }

    return isValid;
}

function OpenDebitsave() {
    debugger;


    var res = validate();
    if (res == false) {
        return false;
    }


    if (Itmdet.length == 0) {
        //alert("Please Enter the Item Details..");
        var msg = 'Please Enter the Item Details...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    var isValid = true;


    if ($('#txtRemark').val() == "") {
        $('#txtRemark').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtRemark').css('border-color', 'lightgrey');
    }

    if (!isValid) {
        var msg = 'Please Enter the Reason in Remarks...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }





    var DCtype = $('input[name="ACType"]:checked').attr('value');
    var OPtype = $('input[name="optype"]:checked').attr('value');

    if (OPtype == "P") {
        Otype = "";
    } else {
        var Otype = $('input[name="OType"]:checked').attr('value');
    }

    debugger;
    var DCtype = $('input[name="ACType"]:checked').attr('value');

    CompId = $('#ddlcompany').val();

    if (CompId == null) {
        CompId = DCompid;
    } else {
        CompId = $('#ddlcompany').val();
    }
    if (DCtype == 'D') {
        table = "OpenDebitMas",
        column = "DebitNo",
        compId = CompId,
        Docum = 'OPEN DEBIT NOTE'
    } else {
        table = "OpenDebitMas",
        column = "DebitNo",
        compId = CompId,
        Docum = 'OPEN CREDIT NOTE'
    }
    var oldDebitNo = $('#txtDebitNo').val();
    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var newDebitNo = result.Value;
            if (oldDebitNo != newDebitNo) {
                //alert('Debit No has been changed...');
                var msg = 'Debit Number has been changed...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                $('#txtDebitNo').val(result.Value);
            }
            var objConSubmit = {
                Companyid: $('#ddlcompany').val(),
                DebitNo: $('#txtDebitNo').val(),
                DebitDate: $('#txtDebitDate').val(),//new Date($('#txtDebitDate').val()),
                RefDate: $('#txtRefDate').val(),//new Date($('#txtRefDate').val()),
                Partyid: $('#ddlParty').val(),
                RefNo: $('#txtRefNo').val(),
                Processid: $('#ddlProcess').val(),
                CurrencyID: $('#ddlCurrency').val(),
                ExchangeRate: $('#txtExchangeRate').val(),
                DebitOrCredit: DCtype,
                OpenOrOrder: OPtype,
                OrderType: Otype,
                CreatedBy: Guserid,
                Remarks: $('#txtRemark').val(),
                VehicleNo: $('#txtVehicleNo').val(),
                Amount: $('#txtNetAmt').val(),
                Addless_amount: $('#txtAccAmt').val(),
                ItemOpenDet: Itmdet,
                OpenAddless: AccList

            };
            $("#btnAdd").attr("disabled", true);
            LoadingSymb();
            $.ajax({
                url: "/OpenDebitNote/Add",
                data: JSON.stringify(objConSubmit),
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {
                    debugger;
                    if (result.Value == true) {
                        AddUserEntryLog('Procurement', 'Open Debit', 'ADD', $("#txtDebitNo").val());
                        //alert('Data Saved Successfully');
                        $('#myModal').modal('hide');
                        //window.location.reload();
                        var msg = 'Data Saved Successfully...';
                        var flg = 1;
                        var mod = 0;
                        var url = "";
                        AlartMessage(msg, flg, mod, url);
                    } else {

                        window.location.href = "/Error/Index";

                    }

                },
                error: function (errormessage) {
                    alert(errormessage.responseText);
                }

            });
        }
    });
}

//function LoadGrid() {
//    $('#tblDebitmaingrid').DataTable().destroy();
//    LoadMainGrid();
//}


function LoadMainGrid() {

    debugger;

    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var DCType = $('input[name="MDCType"]:checked').attr('value');
    var OType = $('input[name="MOType"]:checked').attr('value');

    var CompId = $('#ddlMCompany').val();
    var ProssId = $('#ddlMProcess').val();
    var DebId = $('#ddlMDebitNo').val();
    var Suppid = $('#ddlMParty').val();
    var Orderno = $("#ddlordno option:selected").val();
    if (Orderno == 0 || Orderno == null) {
        Orderno = "";
    } else {
        Orderno = $("#ddlordno option:selected").text();
    }
    var refno = $("#ddlreferno option:selected").val();
    if (refno == 0 || refno == null) {
        refno = "";
    } else {
        refno = $("#ddlreferno option:selected").text();
    }

    $.ajax({
        url: "/OpenDebitNote/GetMainDebitLoad",
        data: JSON.stringify({ Companyid: CompId, Processid: ProssId, Partyid: Suppid, DebitId: DebId, OrderType: OType, DebitOrCredit: DCType, FromDate: FDate, ToDate: TDate, orderno: Orderno, refno: refno }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {

            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");
            $('#tblDebitmaingrid').DataTable({
                data: dataSet,
                scrollY: 300,
                scrollCollapse: true,
                paging: false,
                fixedColumns: false,
                select: false,
                scrollX: "100%",
                scrollXInner: "100%",
                scroller: false,
                bSort: false,
                columns: [
                         { title: "DebitId", "visible": false },
                         { title: "Supplier" },
                         { title: "Debit No" },
                         { title: "Date" },
                         { title: "Process" },
                         { title: "Total Amount" },
                         { title: "Action" },

                ]

            });
            $(document).ready(function () {
                var table = $('#tblDebitmaingrid').DataTable();

                $('#tblDebitmaingrid tbody').on('click', 'tr', function () {
                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');
                    }
                    else {
                        table.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');
                    }
                });


            });
            CheckRights("OpenDebitNote");
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function List() {
    $('#tblDebitmaingrid').DataTable().destroy();
    ListDebitNo();
    ListProcess();
    ListSup();
    LoadMainGrid();
}

function CMainList() {
    $('#tblDebitmaingrid').DataTable().destroy();

    ListDebitNo();
    ListProcess();
    ListSup();
    LoadMainGrid();
    //GenerateNumber();
}

function PMainlist() {
    $('#tblDebitmaingrid').DataTable().destroy();

    ListDebitNo();
    ListSup();
    LoadMainGrid();
}
function SMainlist() {
    $('#tblDebitmaingrid').DataTable().destroy();

    ListDebitNo();
    ListProcess();
    LoadMainGrid();
}
function DMainlist() {
    $('#tblDebitmaingrid').DataTable().destroy();
    ListProcess();
    ListSup();
    LoadMainGrid();
}

function getbyID(Id) {


    LoadCompanyDDL("#ddlcompany");
    // LoadProcessDDL("#ddlProcess");
    //LoadSupplierDDL("#ddlParty");
    LoadAddlessDDL("#ddlAcc");
    //LoadCurrencyDDL("#ddlCurrency");
    LoadSizeDDL("#ddlSize");
    LoadItemDDL("#ddlItem");
    LoadColorDDL("#ddlColor");
    LoadOrderNoDDL("#ddlorderno");
    LoadRefNoDDL("#ddlrefno");
    LoadJobNoDDL("#ddlwrkord");

    //LoadDepartmentDDL("#ddlDepartment");
    $.ajax({
        url: "/OpenDebitNote/LoadEditDebitDetails",
        data: JSON.stringify({ DebitId: Id }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            debugger;
            if (obj != undefined) {
                $('#ddlcompany').val(obj[0]["Companyid"]);
                $('#txtDebitNo').val(obj[0]["DebitNo"]);
                $('#txtDebitDate').val(moment(obj[0]["DebitDate"]).format('DD/MM/YYYY'));
                $('#txtRefDate').val(moment(obj[0]["RefDate"]).format('DD/MM/YYYY'));
                $('#txtRefNo').val(obj[0]["RefNo"]);
                $('#ddlParty').val(obj[0]["Partyid"]);
                $('#ddlProcess').val(obj[0]["Processid"]);
                $('#ddlCurrency').val(obj[0]["CurrencyID"]).trigger('change');
                $('#txtRemark').val(obj[0]["Remarks"]);
                $('#txtExchangeRate').val(obj[0]["ExchangeRate"]);
                $('#txtVehicleNo').val(obj[0]["VehicleNo"]);

                var DType = obj[0]["DebitOrCredit"];
                var OPType = obj[0]["OpenOrOrder"];
                var OType = obj[0]["OrderType"];

                GDebId = obj[0]["DebitId"];

              

                if (DType == "D") {


                    $("#OptDebit").prop("checked", true);
                    $("#OptCredit").prop("checked", false);

                } else if (DType == "C") {


                    $("#OptDebit").prop("checked", false);
                    $("#OptCredit").prop("checked", true);


                    //$('#ddlOrderNo').val("");
                    //$('#ddlWorkOrdNo').val("");
                    //$('#ddlStyle').val("");

                    ////$("#optAuto").attr('disabled', true);
                    //$("#ddlOrderNo").prop("disabled", true);
                    //$("#ddlWorkOrdNo").prop("disabled", true);
                    //$("#ddlStyle").prop("disabled", true);
                    //$("#optAuto").attr('disabled', true);
                    //$("#ddlOrdNo").prop("disabled", true);
                    //$("#ddlBuyer").prop("disabled", true);
                    //$("#txtQty").prop("disabled", true);
                    //$("#txtRefNo").prop("disabled", true);
                    //$('#ddlOrdNo').val("");
                    //$('#ddlBuyer').val("");
                    //$('#txtQty').val("");
                    //$('#txtRefNo').val("");
                    //$("#ddlOrderNo").prop("disabled", true);

                }
                $("#OptGen").prop("disabled", true);
                $("#OptOrd").prop("disabled", true);
                if (OPType == "P") {


                    $('#ddlorderno').val("");
                    $('#ddlwrkord').val("");
                    $('#ddlrefno').val("");
                    $("#ddlorderno").prop("disabled", true);
                    $("#ddlwrkord").prop("disabled", true);
                    $("#ddlrefno").prop("disabled", true);
                    $("#OptGen").prop("checked", true);
                    $("#OptOrd").prop("checked", false);

                } else {
                    $("#ddlorderno").prop("disabled", false);
                    $("#ddlwrkord").prop("disabled", false);
                    $("#ddlrefno").prop("disabled", false);

                    $("#OptGen").prop("checked", false);
                    $("#OptOrd").prop("checked", true);


                    //$('#ddlOrderNo').val("");
                    //$('#ddlWorkOrdNo').val("");
                    //$('#ddlStyle').val("");

                    ////$("#optAuto").attr('disabled', true);
                    //$("#ddlOrderNo").prop("disabled", true);
                    //$("#ddlWorkOrdNo").prop("disabled", true);
                    //$("#ddlStyle").prop("disabled", true);
                    //$("#optAuto").attr('disabled', true);
                    //$("#ddlOrdNo").prop("disabled", true);
                    //$("#ddlBuyer").prop("disabled", true);
                    //$("#txtQty").prop("disabled", true);
                    //$("#txtRefNo").prop("disabled", true);
                    //$('#ddlOrdNo').val("");
                    //$('#ddlBuyer').val("");
                    //$('#txtQty').val("");
                    //$('#txtRefNo').val("");
                    //$("#ddlOrderNo").prop("disabled", true);

                }
                if (OType == "B") {


                    $("#OptBuyOrd").prop("checked", true);
                    $("#OptSamOrd").prop("checked", false);

                } else {



                    $("#OptBuyOrd").prop("checked", false);
                    $("#OptSamOrd").prop("checked", true);


                    //$('#ddlOrderNo').val("");
                    //$('#ddlWorkOrdNo').val("");
                    //$('#ddlStyle').val("");

                    ////$("#optAuto").attr('disabled', true);
                    //$("#ddlOrderNo").prop("disabled", true);
                    //$("#ddlWorkOrdNo").prop("disabled", true);
                    //$("#ddlStyle").prop("disabled", true);
                    //$("#optAuto").attr('disabled', true);
                    //$("#ddlOrdNo").prop("disabled", true);
                    //$("#ddlBuyer").prop("disabled", true);
                    //$("#txtQty").prop("disabled", true);
                    //$("#txtRefNo").prop("disabled", true);
                    //$('#ddlOrdNo').val("");
                    //$('#ddlBuyer').val("");
                    //$('#txtQty').val("");
                    //$('#txtRefNo').val("");
                    //$("#ddlOrderNo").prop("disabled", true);

                }
                LoadDebitItemDetailsEdit(Id);
                LoadDebitAddlessDetailsEdit(Id);


                $('#myModal').modal('show');


                $('#btnUpdate').show();
                $('#btnAdd').hide();
                $('#btnDebitDelete').hide();
            }
            else {

            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function getDeleteID(Id) {
    LoadCompanyDDL("#ddlcompany");
    //LoadProcessDDL("#ddlProcess");
    // LoadSupplierDDL("#ddlParty");
    LoadAddlessDDL("#ddlAcc");
    //LoadCurrencyDDL("#ddlCurrency");
    LoadSizeDDL("#ddlSize");
    LoadItemDDL("#ddlItem");
    LoadColorDDL("#ddlColor");
    LoadOrderNoDDL("#ddlorderno");
    LoadRefNoDDL("#ddlrefno");
    LoadJobNoDDL("#ddlwrkord");

    //LoadDepartmentDDL("#ddlDepartment");
    $.ajax({
        url: "/OpenDebitNote/LoadEditDebitDetails",
        data: JSON.stringify({ DebitId: Id }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            debugger;
            if (obj != undefined) {
                $('#ddlcompany').val(obj[0]["Companyid"]);
                $('#txtDebitNo').val(obj[0]["DebitNo"]);
                $('#txtDebitDate').val(moment(obj[0]["DebitDate"]).format('DD/MM/YYYY'));
                $('#txtRefDate').val(moment(obj[0]["RefDate"]).format('DD/MM/YYYY'));
                $('#txtRefNo').val(obj[0]["RefNo"]);
                $('#ddlParty').val(obj[0]["Partyid"]);
                $('#ddlProcess').val(obj[0]["Processid"]);
                $('#ddlCurrency').val(obj[0]["CurrencyID"]);
                $('#txtRemark').val(obj[0]["Remarks"]);
                $('#txtExchangeRate').val(obj[0]["ExchangeRate"]);
                $('#txtVehicleNo').val(obj[0]["VehicleNo"]);

                var DType = obj[0]["DebitOrCredit"];
                var OPType = obj[0]["OpenOrOrder"];
                var OType = obj[0]["OrderType"];

                GDebId = obj[0]["DebitId"];



                if (DType == "D") {


                    $("#OptDebit").prop("checked", true);
                    $("#OptCredit").prop("checked", false);

                } else if (DType == "C") {


                    $("#OptDebit").prop("checked", false);
                    $("#OptCredit").prop("checked", true);


                }
                if (OPType == "P") {


                    $('#ddlorderno').val("");
                    $('#ddlwrkord').val("");
                    $('#ddlrefno').val("");
                    $("#ddlorderno").prop("disabled", true);
                    $("#ddlwrkord").prop("disabled", true);
                    $("#ddlrefno").prop("disabled", true);
                    $("#OptGen").prop("checked", true);
                    $("#OptOrd").prop("checked", false);

                } else {
                    $("#ddlorderno").prop("disabled", false);
                    $("#ddlwrkord").prop("disabled", false);
                    $("#ddlrefno").prop("disabled", false);

                    $("#OptGen").prop("checked", false);
                    $("#OptOrd").prop("checked", true);


                }
                if (OType == "B") {


                    $("#OptBuyOrd").prop("checked", true);
                    $("#OptSamOrd").prop("checked", false);

                } else {



                    $("#OptBuyOrd").prop("checked", false);
                    $("#OptSamOrd").prop("checked", true);



                }
                LoadDebitItemDetailsEdit(Id);
                LoadDebitAddlessDetailsEdit(Id);


                $('#myModal').modal('show');


                $('#btnUpdate').hide();
                $('#btnAdd').hide();
                $('#btnDebitDelete').show();
            }
            else {

            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadDebitItemDetailsEdit(DebId) {
    debugger;


    $.ajax({
        url: "/OpenDebitNote/LoadDebItemEditDetails",
        data: JSON.stringify({ DebitId: DebId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            Itmdet = result;
            LoadItmtab(Itmdet);


        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadDebitAddlessDetailsEdit(DebId) {
    debugger;


    $.ajax({
        url: "/OpenDebitNote/LoadDebAddlessEditDetails",
        data: JSON.stringify({ DebitId: DebId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            AccList = result;
            loadAccTable(AccList);


        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function OpenDebitUpdate() {

    //var res = validate();
    //if (res == false) {
    //    return false;
    //}

    var isValid = true;

   
    if ($('#txtRemark').val() == "") {
        $('#txtRemark').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtRemark').css('border-color', 'lightgrey');
    }

    if (!isValid) {
        var msg = 'Please Enter the Reason in Remarks...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }


    if (Itmdet.length == 0) {
        //alert("Please Enter the Item Details..");
        var msg = 'Please Enter the Item Details...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }



    if ($('#ddlProcess').val() == 0) {
        //alert("Please Select the Process Name..");
        var msg = 'Please Select the Process Name...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }


    if ($('#ddlParty').val() == 0) {
        //alert("Please Select the Supplier Name..");
        var msg = 'Please Select the Supplier Name...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    if ($('#ddlcompany').val() == 0) {
        //alert("Please Select the Company Name..");
        var msg = 'Please Select the Company Name...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }



    var DCtype = $('input[name="ACType"]:checked').attr('value');
    var OPtype = $('input[name="optype"]:checked').attr('value');

    if (OPtype == "P") {
        Otype = "";
    } else {
        var Otype = $('input[name="OType"]:checked').attr('value');
    }


    var objConSubmit = {


        Companyid: $('#ddlcompany').val(),
        DebitId: GDebId,
        DebitNo: $('#txtDebitNo').val(),
        //DebitDate: new Date($('#txtDebitDate').val()),
        //RefDate: new Date($('#txtRefDate').val()),

        DebitDate: $('#txtDebitDate').val(),//new Date($('#txtDebitDate').val()),
        RefDate: $('#txtRefDate').val(),//new Date($('#txtRefDate').val()),
        Partyid: $('#ddlParty').val(),
        RefNo: $('#txtRefNo').val(),
        Processid: $('#ddlProcess').val(),
        CurrencyID: $('#ddlCurrency').val(),
        ExchangeRate: $('#txtExchangeRate').val(),
        DebitOrCredit: DCtype,
        OpenOrOrder: OPtype,
        OrderType: Otype,
        CreatedBy: Guserid,
        Remarks: $('#txtRemark').val(),
        VehicleNo: $('#txtVehicleNo').val(),
        Amount: $('#txtNetAmt').val(),
        Addless_amount: $('#txtAccAmt').val(),
        ItemOpenDet: Itmdet,
        OpenAddless: AccList

    };
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/OpenDebitNote/Update",
        data: JSON.stringify(objConSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;

            if (result.Value == true) {
                AddUserEntryLog('Procurement', 'Open Debit', 'UPDATE', $("#txtDebitNo").val());
                //alert('Data Updated Successfully');
                var msg = 'Data Updated Successfully...';
                var flg = 1;
                var mod = 0;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                $('#myModal').modal('hide');
                // window.location.reload();

            } else {

                window.location.href = "/Error/Index";

            }


        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }

    });
}

function ClearOpenDebit() {
    $('#myModal').modal('hide');
    window.location.reload();
}

function OpenDebitDelete() {

    var res = validate();
    if (res == false) {
        return false;
    }


    if (Itmdet.length == 0) {
        //alert("Please Enter the Item Details..");
        var msg = 'Please Enter the Item Details...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }


    var DCtype = $('input[name="ACType"]:checked').attr('value');
    var OPtype = $('input[name="optype"]:checked').attr('value');

    if (OPtype == "P") {
        Otype = "";
    } else {
        var Otype = $('input[name="OType"]:checked').attr('value');
    }


    var objConSubmit = {


        Companyid: $('#ddlcompany').val(),
        DebitId: GDebId,
        DebitNo: $('#txtDebitNo').val(),
        DebitDate: $('#txtDebitDate').val(),//new Date($('#txtDebitDate').val()),
        RefDate: $('#txtRefDate').val(),//new Date($('#txtRefDate').val()),
        Partyid: $('#ddlParty').val(),
        RefNo: $('#txtRefNo').val(),
        Processid: $('#ddlProcess').val(),
        CurrencyID: $('#ddlCurrency').val(),
        ExchangeRate: $('#txtExchangeRate').val(),
        DebitOrCredit: DCtype,
        OpenOrOrder: OPtype,
        OrderType: Otype,
        CreatedBy: Guserid,
        Remarks: $('#txtRemark').val(),
        VehicleNo: $('#txtVehicleNo').val(),


        ItemOpenDet: Itmdet,
        OpenAddless: AccList

    };
    $("#btnDebitDelete").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/OpenDebitNote/Delete",
        data: JSON.stringify(objConSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;

            if (result.Value == true) {
                AddUserEntryLog('Procurement', 'Open Debit', 'DELETE', $("#txtDebitNo").val());
                //alert('Data Deleted Successfully');
                $('#myModal').modal('hide');
                //window.location.reload();
                var msg = 'Data Deleted Successfully...';
                var flg = 2;
                var mod = 0;
                var url = "";
                AlartMessage(msg, flg, mod, url);

            } else {

                window.location.href = "/Error/Index";

            }


        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }

    });
}



function OpenDebPrint(Id) {
    debugger;
    Repid = Id;
    $('#myModal2').modal('show');

    docname = "OPEN DEBIT NOTE";
    GenerateReportItem(docname);
}



function GenerateReportItem(name) {
    debugger;
    $("#sbTwo").empty();
    $.ajax({
        url: "/BulkOrder/GetReportOption",
        data: JSON.stringify({ docname: name }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            //document.getElementById('sbTwo');
            var obj = result.Value;
            repobj = obj;
            $.each(obj, function () {
                $("#sbTwo").append($("<option></option>").val(this.optionid).html(this.option));

            });

            i = 0, size = obj.length;
            for (i; i < size; i++) {
                //$("#sbTwo").multiselect("widget").find(":checkbox[value='" + obj[i][optionid] + "']").attr("checked", "checked");
                if (obj[i].optionvalue == true) {
                    $("#sbTwo").find(":checkbox[value='" + obj[i].optionid + "']").attr("checked", true);
                    $("#sbTwo option[value='" + obj[i].optionid + "']").attr("selected", true);
                    //$("#sbTwo").multiselect("refresh");
                }
                else {
                    $("#sbTwo").find(":checkbox[value='" + obj[i].optionid + "']").attr("checked", false);
                    $("#sbTwo option[value='" + obj[i].optionid + "']").attr("selected", false);
                }
            }
        }
    });
}



function SubReport() {
    debugger;

    var RptTyp = $('input[name="BudPrintPreviewPlanned"]:checked').attr('value');

    if (RptTyp == "M") {
        LoadingSymb();
        var compid = $('#ddlMCompany').val();
        $.ajax({
            type: "POST",
            url: "../ReportInline/Stores/OpenDebit/OpenDebitInlineReport.aspx?Masid=" + Repid + "&Companyid=" + compid + "&RptTyp=" + RptTyp,
            data: "",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                debugger;
                // $("#divResult").html("success");
            },
            error: function (e) {
                // $("#divResult").html("Something Wrong.");
            }
        });

        sentmail(Repid);

    }
    else {
        var arr = [];
        $('#sbTwo :selected').each(function (i, sel) {
            arr.push($(sel).val());
        });
        var res = [];
        var p = [];
        for (var r = 0; r < repobj.length; r++) {
            res.push(repobj[r].optionid);
            p.push(0);
        }
        for (var y = 0; y < arr.length; y++) {
            for (var f = 0; f < res.length; f++) {
                if (arr[y] == res[f]) {
                    p[f] = 1;
                }
            }
        }
        var compid = $('#ddlMCompany').val();
        window.open("../ReportInline/Stores/OpenDebit/OpenDebitInlineReport.aspx?Masid=" + Repid + "&Companyid=" + compid + "&RptTyp=" + RptTyp);
    }
}

function backtomain() {
    $("#myModal2").hide();
    $("#myModal2").modal('hide');
    $("#myModal3").modal('hide');
}

function addses() {

    $.ajax({
        url: "/PurchaseOrderMain/AddSession",
        data: JSON.stringify(),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            flpath = result;
        },
        error: function (errormessage) {
            // alert(errormessage.responseText);
        }
    });
}

function Netamt() {


    var totalamnt = 0;
    if (AccList.length > 0) {
        for (var e = 0; e < AccList.length; e++) {
            var amount = AccList[e].Amount;
            totalamnt = totalamnt + parseFloat(amount);

        }
    }


    $('#txtAccAmt').val(totalamnt.toFixed(3));


    var GAmt = $('#txtGrandTotal').val();
    var AcAmt = $('#txtAccAmt').val();
    var FNAmt = parseFloat(GAmt) + parseFloat(AcAmt);

    $('#txtNetAmt').val(FNAmt);


}