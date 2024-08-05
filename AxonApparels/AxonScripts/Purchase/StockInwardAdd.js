var Itemlist = [];
var CompanyId = 0;
var index = -1;
var Masid = 0;
var jobordno = "";
var Userid = 0;
var UserName = 0;
var joorddet = [];
var MainFDate = 0;
var Guserid = 0;
var LoginUserid = '';
var editmasunitstore = 0;
var editsubmasunitstore = 0;
var editsubstore = 0;
var validatestore = "False";
var admod = 0;
var Masid = 0;
var uomid = 0;
var Csno = 0;
$(document).ready(function () {
    debugger;
    Guserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    LoginUserid = $("#hdnLoginUserid").data('value');
    validatestore = $("#hdnValidateStore").data('value');
    LoadCompanyDDL("#ddlcmpnyadd,#ddlACompany");
    LoadProcessDDL("#ddlMProcess");
    LoadWorkdivisionDDL("#ddlfromdiv, #ddlfordivision");
    LoadCompanyUnitDDL("#ddlMFromunit, #ddlMForunit");
    LoadSupplierDDL("#ddlsupplier");
    LoadStoreUnitDDL("#ddlAMainStore");
    LoadJobNoDDL("#ddljoborder");
    MainFDate = $("#hdMainFromDate").data('value');
    LoadRefNoDDL("#ddlrefno");
    LoadOrderNoDDL("#ddlMOrderNo");
    LoadSizeDDL("#ddlSize");
    LoadColorDDL("#ddlColor");

    var protype = $('input[name="UType"]:checked').attr('value');
    if (protype == 'U') {
        $('#supp').hide();
    }
    else {
        $("#fromunit").hide();
    }

    var qrStr = window.location.search;
    var spQrStr = qrStr.substring(1);
    var arrQrStr = new Array();
    var arr = spQrStr.split('?');

    for (var i = 0; i < arr.length; i++) {
        var queryvalue = arr[i].split('=');

    }
    var Id = queryvalue[1];
    Masid = Id;
    Mode = queryvalue[3];
    getsupplier();

    if (Mode == 0) {
        admod = 0;
        CompanyId = Id;
        GenerateNumber();
        getDate();
        loaditem();
        // LoadCompanyDDL("#ddlcmpnyadd");
        $("#ddlcmpnyadd").val(CompanyId);

        var FType = $('input[name="MOType"]:checked').attr('value');
        if (FType == 'B') {

            LoadBulkOrdRefNoDDL("#ddlrefno");
            LoadBulkOrderNoDDL("#ddlorderno");

        }
        else if (FType == 'S') {

            LoadSampleOrdRefNoDDL("#ddlrefno");
            LoadSampOrderNoDDL("#ddlorderno");

        } else {
            LoadOrderNoDDL("#ddlorderno");
        }

        // $("#ddlcmpnyadd" + CId).attr("selected", "selected");
        //$('#ddlcmpnyadd option').map(function () {
        //    if ($(this).val() == CId) return this;
        //}).attr('selected', 'selected');       
    }

    if (Mode == 0) {
        var type = $('input[name="MSType"]:checked').attr('value');
        if (type == 'M') {
            LoadMainStore();
        }
        if (type == 'S') {
            LoadSubStore();
        }
        OAddList();
        editmasunitstore = 0;
        editsubmasunitstore = 0;
        editsubstore = 0;
        LoadEmployeeStoreunit();
        LoadUserCompanyDDL();

        $('#btnupd').hide();
        $('#btnadd').show();
        $('#btndel').hide();
        $('#remark').val();
    }

    if (Mode == 1) {
        admod = 1;
        Masid = Id;
       
        $('#btnupd').show();
        $('#btnadd').hide();
        $('#btndel').hide();

        //Loadgrnedit();
        //loadheaderdet();
    }

    if (Mode == 2) {
        admod = 2;
        Masid = Id;
        $('#btnupd').hide();
        $('#btnadd').hide();
        $('#btndel').show();
        //Loadgrnedit();
        //loadheaderdet();
    }

    $(document).on('keyup', '.calcrate', function () {
        debugger;

        var table = $('#tblitemdetails').DataTable();
        var sno = table.row($(this).parents('tr')).data()["sno"];
        var mid = table.row($(this).parents('tr')).data()["Unit_GRN_Detid"];

        var val = $(this).val();


        if (Mode == 0) {
            $.each(Itemlist, function () {
                if (this.sno == sno) {
                    this.Rate = val;

                }
            });
        }

        if (Mode == 1 || Mode == 2) {
            $.each(Itemlist, function () {
                if (this.Unit_GRN_Detid == mid) {
                    this.Rate = val;
                }
            });
        }

    });

    $(document).on('keyup', '.calcrcdqty', function () {
        debugger;

        var table = $('#tblitemdetails').DataTable();
        var sno = table.row($(this).parents('tr')).data()["sno"];
        var mid = table.row($(this).parents('tr')).data()["Unit_GRN_Detid"];

        var val = $(this).val();

        if (Mode == 0) {
            $.each(Itemlist, function () {
                if (this.sno == sno) {
                    this.recdqty = val;
                    this.RecptQty = val;
                    this.returnqty = val;
                }
            });
        }

        if (Mode == 1 || Mode == 2) {
            $.each(Itemlist, function () {
                if (this.Unit_GRN_Detid == mid) {
                    this.recdqty = val;
                    this.RecptQty = val;
                    this.returnqty = val;
                }
            });
        }
    });



    $('#btnitmtadd').click(function () {
        debugger;
        var isAllValid = true;
        var lengdp = 0;

        if ($('#ddlItem').val() == "0") {
            isAllValid = false;
            $('#ddlItem').siblings(".select2-container").css('border', '1px solid red');
        }
        else {
            $('#ddlItem').siblings(".select2-container").css('border', 'lightgrey');
        }

        if ($('#ddlSize').val() == "0") {
            isAllValid = false;
            $('#ddlSize').siblings(".select2-container").css('border', '1px solid red');
        }
        else {
            $('#ddlSize').siblings(".select2-container").css('border', 'lightgrey');
        }

        if ($('#ddlColor').val() == "") {
            isAllValid = false;
            $('#ddlColor').siblings(".select2-container").css('border', '1px solid red');
        }
        else {
            $('#ddlColor').siblings(".select2-container").css('border', 'lightgrey');
        }

        if ($('#txtUnit').val() == "") {
            isAllValid = false;
            $('#txtUnit').css('border-color', 'Red');
        }
        else {
            $('#txtUnit').css('border-color', 'lightgrey');
        }
        if ($('#txtStockQty').val() == "") {
            isAllValid = false;
            $('#txtStockQty').css('border-color', 'Red');
        }
        else {
            $('#txtStockQty').css('border-color', 'lightgrey');
        }
        if ($('#txtRate').val() == "") {
            isAllValid = false;
            $('#txtRate').css('border-color', 'Red');
        }
        else {
            $('#txtRate').css('border-color', 'lightgrey');
        }

        var chkitemid = $('#ddlItem').val();
        var chkcolorid = $('#ddlColor').val();
        var chksizeid = $('#ddlSize').val();
        var type = $('input[name="optwrkord"]:checked').attr('value');

        if (Itemlist.length > 0) {
            for (var g = 0; g < Itemlist.length; g++) {
                if (Itemlist[g].itemid == chkitemid && Itemlist[g].Colorid == chkcolorid && Itemlist[g].Sizeid == chksizeid) {
                    var msg = 'Must be a different Item...';
                    var flg = 4;
                    var mod = 1;
                    var url = "";
                    AlartMessage(msg, flg, mod, url);
                    fnClearcDetailsControls();
                    return true;
                }
            }
        }

        var fromunit = 0;
        var protype = $('input[name="UType"]:checked').attr('value');
        if (protype == 'U') {
            fromunit = $('#ddlMFromunit option:selected').val();
        }
        else {
            fromunit = $('#ddlsupplier option:selected').val();
        }


        var leng = 0;
        var slno = [];
        $.each(Itemlist, function () {
            var sl = this.sno;
            slno.push(sl);
        });
        var largest = 0;

        for (var i = 0; i < slno.length; i++) {
            if (slno[i] > largest) {
                var largest = slno[i];
            }
        }

        leng = largest + 1;



        if (isAllValid) {
            // alert('true');
            var DetObj = {
                sno:leng,
                Rate: $("#txtRate").val(),
                itemid: $("#ddlItem option:selected").val(),
                item: $("#ddlItem option:selected").text(),
                Colorid: $("#ddlColor option:selected").val(),
                color: $("#ddlColor option:selected").text(),
                Sizeid: $("#ddlSize option:selected").val(),
                size: $("#ddlSize option:selected").text(),
                UOMid: uomid,
                uom: $("#txtUnit").val(),
                RecptQty: $("#txtStockQty").val(),
                returnqty: $("#txtStockQty").val(),
                SecQty: $("#txtSecQty").val(),
                ItemCat: type,
                Supplierid: fromunit,

                //supplier: $("#ddlItem option:selected").text(),
            }
            Itemlist.push(DetObj);
            Loadgrid(Itemlist);
            fnClearcDetailsControls();
        }
    });
    $(document).on('click', '.btnitmedit', function () {
        debugger;
        rowindex = $(this).closest('tr').index();

        var cur1 = Itemlist.slice(rowindex);

        $('#ddlItem').val(cur1[0]['itemid']).trigger('change');
        $('#ddlColor').val(cur1[0]['Colorid']).trigger('change');
        $('#ddlSize').val(cur1[0]['Sizeid']).trigger('change');
        $('#txtUnit').val(cur1[0]['uom']);
        $('#txtStockQty').val(cur1[0]['RecptQty']);
        $('#txtSecQty').val(cur1[0]['SecQty']);
        $('#txtRate').val(cur1[0]['Rate']);
        Csno = cur1[0]['sno'];
        $('#btnitmtadd').hide();
        $('#btnitmupdate').show();
        
    });
    $('#btnitmupdate').click(function () {
        var isValid = true;
        if ($('#txtRate').val() == "") {
            isValid = false;
            $('#txtRate').css('border-color', 'Red');
        }
        else {
            $('#txtRate').css('border-color', 'lightgrey');
        }
        if ($('#ddlItem').val() == "0") {
            isAllValid = false;
            $('#ddlItem').siblings(".select2-container").css('border', '1px solid red');
        }
        else {
            $('#ddlItem').siblings(".select2-container").css('border', 'lightgrey');
        }

        if ($('#ddlSize').val() == "0") {
            isAllValid = false;
            $('#ddlSize').siblings(".select2-container").css('border', '1px solid red');
        }
        else {
            $('#ddlSize').siblings(".select2-container").css('border', 'lightgrey');
        }

        if ($('#ddlColor').val() == "") {
            isAllValid = false;
            $('#ddlColor').siblings(".select2-container").css('border', '1px solid red');
        }
        else {
            $('#ddlColor').siblings(".select2-container").css('border', 'lightgrey');
        }
        if ($('#txtUnit').val() == "") {
            isAllValid = false;
            $('#txtUnit').css('border-color', 'Red');
        }
        else {
            $('#txtUnit').css('border-color', 'lightgrey');
        }
        if ($('#txtStockQty').val() == "") {
            isAllValid = false;
            $('#txtStockQty').css('border-color', 'Red');
        }
        else {
            $('#txtStockQty').css('border-color', 'lightgrey');
        }
        debugger;
        if (isValid) {
            var currentrowsel = Itemlist.slice(rowindex);
            currentrowsel[0]['itemid'] = $("#ddlItem").val();
            currentrowsel[0]['item'] = $("#ddlItem option:selected").text();
            currentrowsel[0]['Colorid'] = $("#ddlColor").val();
            currentrowsel[0]['color'] = $("#ddlColor option:selected").text();
            currentrowsel[0]['Sizeid'] = $("#ddlSize").val();
            currentrowsel[0]['size'] = $("#ddlSize option:selected").text();
            currentrowsel[0]['uom'] = $("#txtUnit").val();
            currentrowsel[0]['RecptQty'] = $("#txtStockQty").val();
            currentrowsel[0]['returnqty'] = $("#txtStockQty").val();
            currentrowsel[0]['SecQty'] = $("#txtSecQty").val();
            currentrowsel[0]['Rate'] = $("#txtRate").val();
            currentrowsel[0]['UOMid'] = uomid;
            currentrowsel[0]['sno'] = Csno;
            var type = $('input[name="optwrkord"]:checked').attr('value');
          
            Itemlist[rowindex] = currentrowsel[0];
            Loadgrid(Itemlist);
            $('#btnitmupdate').hide();
            $('#btnitmtadd').show();
            fnClearcDetailsControls();
        }
    });
    $(document).on('click', '.btnitmremove', function () {
        rowindex = $(this).closest('tr').index();
        Itemlist.splice(rowindex, 1);
        Loadgrid(Itemlist);
       // document.getElementById("tblitemdetails").deleteRow(rowindex + 1);
    });
});



function fnClearcDetailsControls() {
    $('#ddlItem').val('0').trigger('change');
    $('#ddlSize').val('0').trigger('change');
    $('#ddlColor').val('0').trigger('change');
    $('#txtUnit').val('');
    $('#txtStockQty').val('');
    $('#txtSecQty').val('');
    $('#txtRate').val('');
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
    // $('#txtFromDate').val(date);
    $('#txtToDate').val(Fdatestring);

}

function LoadMainStore() {
    $("#SubStoreId").hide();
    $("#SecStoId").hide();
    $("#MainStoreId").show();
    //LoadStoreUnitDDL("#ddlMSMMainStore");
    //LoadCompanyDDL("#ddlMSCompany");
}
function LoadSubStore() {
    $("#SecStoId").hide();
    $("#MainStoreId").hide();
    $("#SubStoreId").show();
    $("#SubStorPrdId").hide();
    //LoadCompanyDDL("#ddlSCompany");
    //LoadStoreUnitDDL("#ddlSMainStore");
}




function Loadgrnedit() {
    Masid;
    debugger;
    $.ajax({
        url: "/StockInwardAdd/Loadongrnnoedit",
        data: JSON.stringify({ mid: Masid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            var obj = result.Value;
            $('#txtToGrn').val(obj[0].Unit_GRN_No);

        }

    });
}


function GenerateNumber(table, column, compId, Docum) {

    debugger;



    table = "Unit_Grn_Mas",
    column = "Unit_GRN_No",
    compId = CompanyId,
    Docum = 'UNIT GOODS RECEIPT'

    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $('#txtToGrn').val(result.Value);
        }
    });
}



function loadheaderdet() {

    //LoadOrderNoDDL("#ddlMOrderNo");
    ////LoadRefNoDDL("#ddlAReqno");
    ////LoadStyleDDL("#ddlAStyle");
    //LoadJobNoDDL("#ddljoborder");
    //LoadItemGroupDDL('#ddlItemgrp');
    //LoadRefNoDDL('#ddlrefno');
    //LoadCompanyDDL("#ddlcmpnyadd,#ddlACompany");
    //LoadStoreUnitDDL("#ddlAMainStore");

    //var GrnNo = "";
    //var ONo = $('select#ddlgrn option:selected').val();

    //if (ONo == 0) {
    //    GrnNo == "";
    //}
    //else {

    //    GrnNo = $('select#ddlgrn option:selected').val();
    //}

    //var JobNo = "";
    //var RNo = $('select#ddljobno option:selected').val();

    //if (RNo == 0) {
    //    JobNo == "";
    //}
    //else {

    //    JobNo = $('select#ddljobno option:selected').val();
    //}

    ////var masid = 0;
    //var rcpt = "";

    //var CompId = $('#ddlMCompany').val();
    //var FromUnit = $('#ddlMFromunit').val();
    //var ForUnit = $('#ddlMForunit').val();
    //var supp = $('#ddlMSupplier').val();
    //var process = $('#ddlprocess').val();
    //var FDate = new Date($('#txtFromDate').val());
    //var TDate = new Date($('#txtToDate').val());

    $.ajax({
        url: "/StockInwardAdd/GetStkMainDetails",
        data: JSON.stringify({ URNMasid: Masid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            det = result.Value;

            $('#ddlcmpnyadd').val(det[0].Companyid).trigger('change');
            $('#ddlACompany').val(det[0].Companyid).trigger('change');
           
            $('#ddljoborder').val(det[0].JmasId).trigger('change');
            $('#ddlMOrderNo').val(det[0].BmasId).trigger('change');
            $('#ddlfromdiv').val(det[0].FromDivision).trigger('change');
            $('#ddlfordivision').val(det[0].ForDivision).trigger('change');
            $('#ddlMForunit').val(det[0].ForUnit).trigger('change');
            //$('#ddlMFromunit').val(det[0].FromUnit).trigger('change');
            $('#ddlMProcess').val(det[0].ProcessId).trigger('change');
            $('#ddlAMainStore').val(det[0].StoreUnitID).trigger('change');
            $('#remark').val(det[0].Remarks);
            $('#ddlrefno').val(det[0].BmasId).trigger('change');
            $('#txtToRefNo').val(det[0].Unit_GRN_RefNo);
            // $('#txtToDate').val(det[0].ProcessId);
            $('#txtToDate').val(moment(det[0]["Unit_GRN_date"]).format('DD/MM/YYYY'));

            if (det[0]["Storetype"] == 'SS') {
                $('#optSS').prop('checked', true);
                LoadSubStore();
                editsubmasunitstore = det[0]["ParentUnitid"];
                editsubstore = det[0]["StoreUnitID"];
                editmasunitstore = 0;
            }
            else {
                $('#optMS').prop('checked', true);
                LoadMainStore();
                editmasunitstore = det[0]["StoreUnitID"];
                editsubmasunitstore = 0;
                editsubstore = 0;
            }

            if (det[0].ReceiptCat == 'W') {
                $('#optB').prop('checked', true);
                $('#GenAdd').hide();
            }
            else if (det[0].ReceiptCat == 'S') {
                $('#optS').prop('checked', true);
                $('#GenAdd').hide();
            }
            else {
                $('#optG').prop('checked', true);
                $('#GenAdd').show();
            }

            if (det[0].UnitOrOther == 'U') {
                $('#unit').prop('checked', true);
            }
          else {
                $('#supplier').prop('checked', true);
           }

            var protype = $('input[name="UType"]:checked').attr('value');
            if (protype == 'U') {
                $('#supp').hide();
                $("#fromunit").show();
                $('#ddlMFromunit').val(det[0].FromUnit).trigger('change');
            }
            else {
                $("#fromunit").hide();
                $('#supp').show();
                $('#ddlsupplier').val(det[0].FromUnit).trigger('change');
            }

            CompanyId = det[0].Companyid;

            LoadEmployeeStoreunit();
            LoadUserCompanyDDL();

            $('#unit').attr('disabled', true);
            $('#supplier').attr('disabled', true);
            $('#optB').attr('disabled', true);
            $('#optS').attr('disabled', true);
            $('#optG').attr('disabled', true);

            $('#ddlcmpnyadd').attr('disabled', true);
            $('#ddljoborder').attr('disabled', true);
            $('#ddlMOrderNo').attr('disabled', true);
            $('#ddlMProcess').attr('disabled', true);
            $('#ddlrefno').attr('disabled', true);
            $('#txtToRefNo').attr('disabled', true);
            $('#ddlItemgrp').attr('disabled', true);
            //jobordno = det[0].Job_Ord_No;

            loadeditdetails();
            //edittextdet();

        }

    });

}

$(document).ready(function () {
    $("#tblitemdetails ").dataTable().find("tbody").on('click', 'tr', function () {
        index = (this.rowIndex) - 1;
    });
});
function Backtomain() {
    window.location.href = "/StockInwardMain/StockInwardMainIndex";
}

function RadioUClick() {
    debugger;
    var protype = $('input[name="UType"]:checked').attr('value');
    if (protype == 'U') {
        $('#supp').hide();
        $("#fromunit").show();
    }
    else {
        $("#fromunit").hide();
        $('#supp').show();
    }
}

function OAddList() {

    if (Mode == 0) {
        var cmpyid = $('select#ddlcmpnyadd option:selected').val();

        $.ajax({
            url: "/StockInwardAdd/GetJobNo",
            data: JSON.stringify({ cmpid: cmpyid }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",

            success: function (result) {
                debugger;
                joorddet = result.Value;
                if (result.Status == 'SUCCESS') {

                    // if (Mode == 0) {
                    var data = result.Value;
                    $(ddljoborder).empty();
                    $(ddljoborder).append($('<option/>').val('0').text('--Select JobOrderNo--'));
                    $.each(data, function () {
                        $(ddljoborder).append($('<option></option>').val(this.jobid).text(this.jobordno));
                    });
                    //}


                }

                //if (Mode == 1 && Mode==2) {
                //    $('#ddlMOrderNo').text(det[0].orderno);
                //    $('#ddlrefno').text(det[0].refno);
                //     $('#ddljoborder').text(det[0].Job_Ord_No);

                //    //$(ddljoborder).append($('<option/>').val('0').text('--Select JobOrdNo--'));
                //    //$.each(data, function () {
                //    //    $(ddljoborder).append($('<option></option>').text(det[0].Job_Ord_No));
                //    //});
                //}
            }

        });
        Loadorderno();
        Loadrefno();
    }

}


function Loadorderno() {
    var cmpyid = $('select#ddlcmpnyadd option:selected').val();

    $.ajax({
        url: "/StockInwardAdd/GetOrderNo",
        data: JSON.stringify({ cmpid: cmpyid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;
                $(ddlMOrderNo).empty();
                $(ddlMOrderNo).append($('<option/>').val('0').text('--Select OrderNo--'));
                $.each(data, function () {
                    $(ddlMOrderNo).append($('<option></option>').val(this.Buymasid).text(this.orderno));
                });

            }
        }

    });
}

function Loadrefno() {
    var cmpyid = $('select#ddlcmpnyadd option:selected').val();

    $.ajax({
        url: "/StockInwardAdd/GetRefNo",
        data: JSON.stringify({ cmpid: cmpyid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {
                var data = result.Value;
                $(ddlrefno).empty();
                $(ddlrefno).append($('<option/>').val('0').text('--Select RefNo--'));
                $.each(data, function () {
                    $(ddlrefno).append($('<option></option>').val(this.Buymasid).text(this.refno));
                });

            }
        }

    });
}


function LoadItemgrp() {
    //var jobno = $('select#ddljoborder option:selected').val();
    var jobno = $('select#ddljoborder option:selected').text();

    $.ajax({
        url: "/StockInwardAdd/GetItemgrp",
        data: JSON.stringify({ jobordno: jobno }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;
                $(ddlItemgrp).empty();
                $(ddlItemgrp).append($('<option/>').val('0').text('--Select ItemGroup--'));
                $.each(data, function () {
                    $(ddlItemgrp).append($('<option></option>').val(this.itemgrpid).text(this.itemgrp));
                });

            }
        }

    });
    if (Mode == 0) {
        checkval();
    }
}

function checkval() {
    debugger;

    var jid = $('select#ddljoborder option:selected').text();
    for (var x = 0; x < joorddet.length; x++) {
        if (joorddet[x].jobordno == jid) {
            $("#txtOrderNo").val(joorddet[x].orderno);
            $("#txtRefNo").val(joorddet[x].refno);
            $("#txtStyle").val(joorddet[x].style);
            $("#txtStyleid").val(joorddet[x].styleid);

        }
    }
    var protype = $('input[name="MOType"]:checked').attr('value');
    if (protype == 'G') {

    }
    else {
        getdetails();
    }
}

function ProcessList() {
    debugger;
    if (Mode == 0) {
        var jobno = $('select#ddljoborder option:selected').text();
        if (jobno == "") {
            //alert('Please select Jobordno');
            var msg = 'Please select Job order Number...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return true;
        }
        var pd = $("#ddlMProcess").val();

        $.ajax({
            url: "/StockInwardAdd/Loadonprocess",
            data: JSON.stringify({ jobordno: jobno, pid: pd }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",

            success: function (result) {
                debugger;
                //Prolist = result.Value;
                //Loadgrid(Prolist);
                Itemlist = result.Value;
                Loadgrid(Itemlist);
            }

        });
    }
}

function edittextdet() {
    debugger;

    $.ajax({
        url: "/StockInwardAdd/Loadeditdet",
        data: JSON.stringify({ jobordno: jobordno }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            var edit = result.Value;

            $("#txtOrderNo").val(edit[0].orderno);
            $("#txtRefNo").val(edit[0].refno);
            $("#txtStyle").val(edit[0].style);
            $("#txtStyleid").val(edit[0].styleid);

            //OAddList();
            LoadItemgrp();

        }

    });

}

function ItemgrpList() {
    debugger;
    var jobno = $('select#ddljoborder option:selected').text();
    if (jobno == "") {
        //alert('Please select Jobordno');
        var msg = 'Please select Job order Number...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }
    var itmgrpid = $("#ddlItemgrp").val();

    $.ajax({
        url: "/StockInwardAdd/Loadonitemgrp",
        data: JSON.stringify({ jobordno: jobno, itmid: itmgrpid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            //Itmgrplist = result.Value;
            //Loadgrid(Itmgrplist);
            Itemlist = result.Value;
            Loadgrid(Itemlist);
        }

    });
}

function getdetails() {
    debugger;

    var jobno = $('select#ddljoborder option:selected').text();
    $.ajax({
        url: "/StockInwardAdd/Loadgrid",
        data: JSON.stringify({ jobordno: jobno }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            Itemlist = result.Value;
            Loadgrid(Itemlist);
        }

    });

}


function loadeditdetails() {
    debugger;
    var jobno = $('select#ddljoborder option:selected').text();
    var ty = 'W';

    $.ajax({
        url: "/StockInwardAdd/Loadeditgrid",
        data: JSON.stringify({ mid: Masid, jobno: jobordno, type: ty }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            Itemlist = result.Value;
            Loadgrid(Itemlist);

            $("#itmremark").val(Itemlist[0].ItemRemarks);

        }

    });

}

function Loadgrid(list) {

    var inputcount = 0;
    $('#tblitemdetails tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tblitemdetails').DataTable().destroy();
    }
    $('#tblitemdetails').empty();

   // $('#tblitemdetails').DataTable().destroy();
    
    var table = $('#tblitemdetails').DataTable({
        data: list,
        scrollY: 300,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        "bSort": false,
        "rowCallback": function (row, data, index) {
            var OType = $('input[name="MOType"]:checked').attr('value');
            if (OType == "G") {
                var tbl = $('#tblitemdetails');
                tbl.DataTable().column(12).visible(true);
            } else {
                var tbl = $('#tblitemdetails');
                tbl.DataTable().column(12).visible(false);
            }
        },
        columns: [
            { title: "Sno", data: "sno", "visible": false },
            { title: "ItemId", data: "itemid", "visible": false },
            { title: "Item", data: "item" },
            { title: "ColorId", data: "Colorid", "visible": false },
            { title: "Color", data: "color" },
            { title: "SizeId", data: "Sizeid", "visible": false },
            { title: "Size", data: "size" },
            { title: "UnitId", data: "UOMid", "visible": false },
            { title: "Unit", data: "uom" },
            {
                title: "Rate", data: "Rate",
                render: function (data) {

                    return '<input type="text" id="txtrate" class="calcrate form-control"  style="width: 100px;text-align: center;" value=' + data + '>';
                }
            },
           {
               title: "Recd Qty", data: "returnqty",
               render: function (data) {

                   return '<input type="text" id="txtrecdqty" class="calcrcdqty form-control"  style="width: 100px;text-align: center;" value=' + data + ' >';
               }
           },
            { title: "Sec Qty", data: "SecQty" },
            //{
            //    title: "Supplier", data: "Supplierid","visible": false ,
            //    render: function (data, type, row) {
            //        var $select = $("<select></select>", {
            //            "id": "ddlSupp",
            //            "value": data,
            //            "class": "form-control",
            //            onchange: "loadsupplier(this.value);"
            //        });
            //        $.each(Supplier, function (k, v) {
            //            var $option = $("<option></option>", {
            //                "text": v.supp,
            //                "value": v.suppid
            //            });
            //            if (data === v.suppid) {
            //                $option.attr("selected", "selected")
            //            }
            //            $select.append($option);
            //        });
            //        return $select.prop("outerHTML");
            //        //return '<select id="ddlGSize" selected="selected" class="form-control" style="width: 100px;"> </select>';
            //    }
            //},
            {
                title: "ACTION", "mDataProp": null,
                "sDefaultContent": '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnitmedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnitmremove btn btn-danger btn-round"> <i class="fa fa-times"></i> </button> </div>'

            }

        ]
    });

}



function loadsupplier(val) {
    debugger;
    var currentrow = Itemlist.slice(index);
    var sno = currentrow[0].sno;
    var mid = currentrow[0].Unit_GRN_Detid;
    if (Mode == 0) {
        $.each(Itemlist, function () {
            if (this.sno == sno) {
                this.Supplierid = val;

            }
        });
    }
    if (Mode == 1 || Mode == 2) {
        $.each(Itemlist, function () {
            if (this.Unit_GRN_Detid == mid) {
                this.Supplierid = val;
            }
        });

    }
}



function getsupplier() {
    debugger;
    $.ajax({
        url: "/StockInwardAdd/SupplierList",
        data: JSON.stringify({}),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            Supplier = result;
            if (Mode == 1) {
                Loadgrnedit();
                loadheaderdet();
                loaditem();
            }

            if (Mode == 2) {
                Loadgrnedit();
                loadheaderdet();
            }
        }

    });
}

function Add() {
    debugger;
    var res = validate();
    if (res == false) {
        return false;
    }

    $.each(Itemlist, function () {

        this.ItemRemarks = $('#itmremark').val();


    });

    var MSType = $('input[name="MSType"]:checked').attr('value');

    var storeunitid = 0;
    if (MSType == "S") {
        storeunitid = $('#ddlSMainStore').val();
    } else if (MSType == "M") {
        storeunitid = $('#ddlMSMMainStore').val();
    }

    if (storeunitid == 0 && validatestore == "True") {
        //alert('Please select Store..');
        var msg = 'Please select Store...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    var itmstck = [];
    var list = [];
    list = $.grep(Itemlist, function (er) {
        return (er.returnqty > 0);
    });
    if (list.length == 0) {
        //alert('Fill the received qty or supplier for atleast one... ');
        var msg = 'Fill the received quantity or supplier for atleast one...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }
    else {
        Itemlist = list;
    }
    var OType = $('input[name="MOType"]:checked').attr('value');
    var UType = $('input[name="UType"]:checked').attr('value');
    if (OType == 'B') {
        OType = 'W';
    }

    var fromunit = 0;
    var protype = $('input[name="UType"]:checked').attr('value');
    if (protype == 'U') {
        fromunit = $('#ddlMFromunit option:selected').val();
    }
    else {
        fromunit = $('#ddlsupplier option:selected').val();
    }


    var job = "";
    if (OType=="G") {
       job = '';
   } else {
       job = $('select#ddljoborder option:selected').text();
    }

    var itc = 'P';

    if (OType == "G") {
        itc = 'G';
    } else {
        var prc = $('select#ddlMProcess option:selected').val();
        if (prc > 0) {
            itc = 'P';
        } else {
            itc = 'B';
        }
    }


    if (Itemlist.length > 0) {
        for (var d = 0; d < Itemlist.length; d++) {
            Itemlist[d].Supplierid = fromunit;
            var stklist = {
                //StockId: Itemlist[d].UOMid,
                UnitId: Itemlist[d].UOMid,
                Itemid: Itemlist[d].itemid,
                Colorid: Itemlist[d].Colorid,
                sizeid: Itemlist[d].Sizeid,
                qty: Itemlist[d].returnqty,
                Rate: Itemlist[d].Rate,
                joborderNo: job,//Itemlist[d].UOMid,
                TransType: "URN",
                Transno: $("#txtToGrn").val(),
                alloted: 0,
                ItemCat: itc,
                processId: $('select#ddlMProcess option:selected').val(),
                sQty: Itemlist[d].SecQty,
                balQty: Itemlist[d].returnqty,
                purorprod: 'UR',
                transdate: $("#txtToDate").val(),
                companyid: $('select#ddlcmpnyadd option:selected').val(),
                supplierid: fromunit,//Itemlist[d].Supplierid,
                return_qty: 0.00,
                uomid: Itemlist[d].UOMid,
                Styleid: $("#txtStyleid").val(),
                unit_or_other: UType,
                ReProg: 'N',
                StockType: 'S',
                Remarks: $('#itmremark').val(),
                Markup_Rate: Itemlist[d].Rate,
                StoreUnitID: storeunitid,
                StockDate: $('#txtToDate').val(),
              
            }
            itmstck.push(stklist);
        }
    }

   
    debugger;
    var oldURN = $('#txtToGrn').val();

    table = "Unit_Grn_Mas",
    column = "Unit_GRN_No",
    compId = CompanyId,
    Docum = 'UNIT GOODS RECEIPT'

    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var newURN = result.Value;
            if (oldURN != newURN) {
                //alert('URN No has been changed...');
                var msg = 'URN Number has been changed...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                $('#txtToGrn').val(result.Value);
            }

            var objConSubmit = {

                //
                //Unit_GRN_Masid: $('#txtHCompanyId').val(),
                ReceiptCat: OType,// $('#txtOrderNo').val(),
                Job_Ord_No: job,
                Unit_GRN_No: $('#txtToGrn').val(),
                Unit_GRN_date: $('#txtToDate').val(),//new Date($('#txtToDate').val()),
                Unit_GRN_RefNo: $('#txtToRefNo').val(),
                Unit_GRN_RefDate: $('#txtToDate').val(),//new Date($('#txtToDate').val()),
                Remarks: $('#remark').val(),
                FromUnit: fromunit,
                CompanyUnitid: $('select#ddlMFromunit option:selected').val(),// 1,//$('select#ddljoborder option:selected').val(),
                Companyid: $('select#ddlcmpnyadd option:selected').val(),
                CommitCancel: "N",//$('#txtBuyOrdMasId').val(),
                ForUnit: $('select#ddlMForunit option:selected').val(),
                RecOrRet: "R",//$('#txtBuyOrdMasId').val(),
                UnitOrOther: UType,// $('#txtBuyOrdMasId').val(),
                ProcessId: $('select#ddlMProcess option:selected').val(),
                //StoreUnitID: $('select#ddlAMainStore option:selected').val(),
                StoreUnitID: storeunitid,
                CreatedBy: Guserid,//$('#txtBuyOrdMasId').val(),
                FromDivision: $('select#ddlfromdiv option:selected').val(),
                ForDivision: $('select#ddlfordivision option:selected').val(),

                GrnDet: Itemlist,
                ItmstockDet: itmstck
            };
            $("#btnadd").attr("disabled", true);
            LoadingSymb();
            $.ajax({
                url: "/StockInwardAdd/Add",
                data: JSON.stringify(objConSubmit),
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {
                    debugger;
                    if (result.Value == true) {
                        AddUserEntryLog('Procurement', 'Stock Inward', 'ADD', $("#txtToGrn").val());
                        //alert('Data Saved Successfully');
                        //window.location.href = "/StockInwardMain/StockInwardMainIndex";
                        var msg = 'Data Saved Successfully...';
                        var flg = 1;
                        var mod = 0;
                        var url = "/StockInwardMain/StockInwardMainIndex";
                        AlartMessage(msg, flg, mod, url);
                    }
                    else {
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

function validate() {
    var isValid = true;
    if ($('#ddlcmpnyadd').val().trim() == 0) {
        $('#ddlcmpnyadd').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlcmpnyadd').css('border-color', 'lightgrey');
    }

    //if ($('#ddlMFromunit').val().trim() == 0) {
    //    $('#ddlMFromunit').css('border-color', 'Red');
    //    isValid = false;
    //}
    //else {
    //    $('#ddlMFromunit').css('border-color', 'lightgrey');
    //}

    if ($('#ddlMForunit').val().trim() == 0) {
        $('#ddlMForunit').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlMForunit').css('border-color', 'lightgrey');
    }

    //if ($('#ddlACompany').val() == 0) {
    //    $('#ddlACompany').css('border-color', 'Red');
    //    isValid = false;
    //}
    //else {
    //    $('#ddlACompany').css('border-color', 'lightgrey');
    //}

    //if ($('#ddlAMainStore').val() == 0) {
    //    $('#ddlAMainStore').css('border-color', 'Red');
    //    isValid = false;
    //}
    //else {
    //    $('#ddlAMainStore').css('border-color', 'lightgrey');
    //}
    //if ($('#ddlMProcess').val() == 0) {
    //    $('#ddlMProcess').css('border-color', 'Red');
    //    isValid = false;
    //}
    //else {
    //    $('#ddlMProcess').css('border-color', 'lightgrey');
    //}

    return isValid;
}

function Update() {
    debugger;
    var res = validate();
    if (res == false) {
        return false;
    }
    var list = [];
    $.each(Itemlist, function () {

        this.Unit_GRN_Masid = Masid;


    });

    list = $.grep(Itemlist, function (er) {
        return (er.returnqty > 0);
    });

    if (list.length == 0) {
        //alert('Fill the received qty for atleast one... ');
        var msg = 'Fill the received quantity for atleast one...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }
    else {
        Itemlist = list;
    }

    var MSType = $('input[name="MSType"]:checked').attr('value');

    var storeunitid = 0;
    if (MSType == "S") {
        storeunitid = $('#ddlSMainStore').val();
    } else if (MSType == "M") {
        storeunitid = $('#ddlMSMMainStore').val();
    }
    if (storeunitid == 0 && validatestore == "True") {
        //alert('Please select Store..');
        var msg = 'Please select Store...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    var OType = $('input[name="MOType"]:checked').attr('value');
    var UType = $('input[name="UType"]:checked').attr('value');
    if (OType == 'B') {
        OType = 'W';
    }

    var fromunit = 0;
    var protype = $('input[name="UType"]:checked').attr('value');
    if (protype == 'U') {
        fromunit = $('#ddlMFromunit option:selected').val();
    }
    else {
        fromunit = $('#ddlsupplier option:selected').val();
    }


    var job = "";
    if (OType == "G") {
        job = '';
    } else {
        job = $('select#ddljoborder option:selected').text();
    }

    var itc = 'P';

    if (OType == "G") {
        itc = 'G';
    } else {
        var prc = $('select#ddlMProcess option:selected').val();
        if (prc > 0) {
            itc = 'P';
        } else {
            itc = 'B';
        }
    }



    var itmstck = [];
    if (Itemlist.length > 0) {
        for (var d = 0; d < Itemlist.length; d++) {
            Itemlist[d].Supplierid = fromunit;
            var stklist = {
                //StockId: Itemlist[d].UOMid,
                UnitId: Itemlist[d].UOMid,
                Itemid: Itemlist[d].itemid,
                Colorid: Itemlist[d].Colorid,
                sizeid: Itemlist[d].Sizeid,
                qty: Itemlist[d].returnqty,
                Rate: Itemlist[d].Rate,
                joborderNo: job,
                TransType: "URN",
                Transno: $('#txtToGrn').val(),
                alloted: 0,
                ItemCat: 'P',
                processId: $('select#ddlMProcess option:selected').val(),
                sQty: Itemlist[d].UOMid,
                balQty: Itemlist[d].returnqty,
                purorprod: 'UR',
                transdate: $('#txtToDate').val(),
                companyid: $('select#ddlcmpnyadd option:selected').val(),
                supplierid: fromunit, 
                return_qty: 0.00,
                uomid: Itemlist[d].UOMid,
                Styleid: $("#txtStyleid").val(),
                unit_or_other: UType,
                ReProg: 'N',
                StockType: 'S',
                Remarks: $('#remark').val(),
                Markup_Rate: Itemlist[d].Rate,
                StoreUnitID: storeunitid,
                StockDate: $('#txtToDate').val(),
                ItemCat: itc,
            }
            itmstck.push(stklist);
        }
    }

    var objConSubmit = {

        //
        Unit_GRN_Masid: Masid,// $('#txtHCompanyId').val(),
        ReceiptCat: OType,// $('#txtOrderNo').val(),
        Job_Ord_No: job,// $('select#ddljoborder option:selected').text(),
        Unit_GRN_No: $('#txtToGrn').val(),
        Unit_GRN_date: $('#txtToDate').val(),//new Date($('#txtToDate').val()),
        Unit_GRN_RefNo: $('#txtToRefNo').val(),
        Unit_GRN_RefDate: $('#txtToDate').val(),//new Date($('#txtToDate').val()),
        Remarks: $('#remark').val(),
        FromUnit: fromunit,
        CompanyUnitid: $('select#ddlMFromunit option:selected').val(),// 1,//$('select#ddljoborder option:selected').val(),
        Companyid: $('select#ddlcmpnyadd option:selected').val(),
        CommitCancel: "N",//$('#txtBuyOrdMasId').val(),
        ForUnit: $('select#ddlMForunit option:selected').val(),
        RecOrRet: "R",//$('#txtBuyOrdMasId').val(),
        UnitOrOther: UType,// $('#txtBuyOrdMasId').val(),
        ProcessId: $('select#ddlMProcess option:selected').val(),
        // StoreUnitID: $('select#ddlAMainStore option:selected').val(),
        StoreUnitID: storeunitid,
        CreatedBy: Guserid,//$('#txtBuyOrdMasId').val(),
        FromDivision: $('select#ddlfromdiv option:selected').val(),
        ForDivision: $('select#ddlfordivision option:selected').val(),

        GrnDet: Itemlist,
        ItmstockDet: itmstck
    };
    $("#btnupd").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/StockInwardAdd/Update",
        data: JSON.stringify(objConSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Value == true) {
                AddUserEntryLog('Procurement', 'Stock Inward', 'UPDATE', $("#txtToGrn").val());
                //alert('Data Updated Successfully');
                //window.location.href = "/StockInwardMain/StockInwardMainIndex";
                var msg = 'Data Updated Successfully...';
                var flg = 1;
                var mod = 0;
                var url = "/StockInwardMain/StockInwardMainIndex";
                AlartMessage(msg, flg, mod, url);
            }
            else {
                window.location.href = "/Error/Index";
            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }

    });

}


function Delete() {
    debugger;
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $("#btndel").attr("disabled", true);
        LoadingSymb();
        $.ajax({
            url: "/StockInwardAdd/Delete/" + Masid,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                if (result.Value == true) {
                    AddUserEntryLog('Procurement', 'Stock Inward', 'DELETE', $("#txtToGrn").val());
                    //alert("Data Deleted Sucessfully");

                    //window.location.href = "/StockInwardMain/StockInwardMainIndex";
                    var msg = 'Data Deleted Sucessfully...';
                    var flg = 2;
                    var mod = 0;
                    var url = "/StockInwardMain/StockInwardMainIndex";
                    AlartMessage(msg, flg, mod, url);
                }
                else {
                    window.location.href = "/Error/Index";
                }
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

function LoadEmployeeStoreunit() {
    debugger;

    var comp = $('#ddlcmpnyadd').val();


    if (UserName == 'superuser') {
        LoginUserid = 0;
    }

    $.ajax({
        url: "/StoreSetup/GetStoreRights",
        data: JSON.stringify({ Userid: LoginUserid, Storetype: 'M', Companyid: comp }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var data = result.Value;
            $(ddlMSMMainStore).empty();
            $(ddlMSMMainStore).append($('<option/>').val('0').text('--Select Store--'));
            $.each(data, function () {
                $(ddlMSMMainStore).append($('<option></option>').val(this.Storeid).text(this.StoreName));
            });
            $(ddlMSMMainStore).trigger("select2:updated");

            $(ddlSCompany).empty();
            $(ddlSCompany).append($('<option/>').val('0').text('--Select Store--'));
            $.each(data, function () {
                $(ddlSCompany).append($('<option></option>').val(this.Storeid).text(this.StoreName));
            });
            $(ddlSCompany).trigger("select2:updated");

            if (editsubmasunitstore > 0) {
                $('#ddlSCompany').val(editsubmasunitstore).trigger('change');
            }
            if (editmasunitstore > 0) {
                $('#ddlMSMMainStore').val(editmasunitstore).trigger('change');
            }
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

    $.ajax({
        url: "/StoreSetup/GetStoreRights",
        data: JSON.stringify({ Userid: LoginUserid, Storetype: 'B', Companyid: comp }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var data = result.Value;
            $(ddlSMainStore).empty();
            $(ddlSMainStore).append($('<option/>').val('0').text('--Select Store--'));
            $.each(data, function () {
                $(ddlSMainStore).append($('<option></option>').val(this.Storeid).text(this.StoreName));
            });
            $(ddlSMainStore).trigger("select2:updated");
            if (editsubstore > 0) {
                $('#ddlSMainStore').val(editsubstore).trigger('change');
            }
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });


}

function LoadUserCompanyDDL() {
    debugger;
    httpGet("/Company/GetCompany", onUserCompanySuccess, onUserCompanyFailure);
}

function onUserCompanySuccess(result) {
    if (result.Status == "SUCCESS") {

        var data = result.Value;
        var comp = [];
        $.each(data, function (i) {
            if (data[i].CompanyId == CompanyId) {
                comp.push(data[i]);
            }
        });

        $(ddlMSCompany).empty();
        // $(ddlMSCompany).append($('<option/>').val('0').text('--Select Company--'));
        $.each(comp, function () {
            $(ddlMSCompany).append($('<option></option>').val(this.CompanyId).text(this.CompanyName));
        });
        $(ddlMSCompany).trigger("select2:updated");
    }
    else {
        //alert('Company loading failed');
        var msg = 'Company loading failed...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
    }
}

function onUserCompanyFailure(result) {

    //alert('Company loading failed');
    var msg = 'Company loading failed...';
    var flg = 4;
    var mod = 1;
    var url = "";
    AlartMessage(msg, flg, mod, url);
}

function REFMainList() {

    if (admod == 0) {
        var BMasId = $('#ddlMOrderNo option:selected').val();
        var JbId = $('#ddljoborder option:selected').val();
        var StyId = 0;
        var RefNo = "";
        var RNo = $('select#ddlrefno option:selected').val();

        if (RNo == 0) {
            RefNo == "";
        }
        else {

            RefNo = $('select#ddlrefno option:selected').val();
        }

        if (BMasId > 0) {

            $.ajax({
                url: "/StockAuditEntry/GetDropNo",
                data: JSON.stringify({ BMasId: BMasId, JobId: JbId, Styleid: StyId, RefNo: RefNo }),
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",

                success: function (result) {
                    var obj = result.Value;
                    if (result.Status == 'SUCCESS') {
                        debugger;
                        var data = result.Value;


                        //RefNo
                        $(ddlrefno).empty();
                        $(ddlrefno).append($('<option/>').val('0').text('--Select RefNo--'));
                        $.each(data, function () {
                            $(ddlrefno).append($('<option></option>').val(this.BMasId).text(this.RefNo));
                        });

                        //JobNo
                        $(ddljoborder).empty();
                        $(ddljoborder).append($('<option/>').val('0').text('--Select JobNo--'));
                        $.each(data, function () {
                            $(ddljoborder).append($('<option></option>').val(this.JobId).text(this.Job_Ord_no));
                        });

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

    }

}

function RadioMBClick() {


    var FType = $('input[name="MOType"]:checked').attr('value');
    if (FType == 'B') {

        LoadBulkOrdRefNoDDL("#ddlrefno");
        LoadBulkOrderNoDDL("#ddlMOrderNo");
        $('#GenAdd').hide();
        if (Mode == 0) {
            $('#ddljoborder').attr('disabled', false);
            $('#ddlMOrderNo').attr('disabled', false);
            $('#ddlrefno').attr('disabled', false);
            Itemlist = [];
            Loadgrid(Itemlist);
        }
    }
    else if (FType == 'S') {

        LoadSampleOrdRefNoDDL("#ddlrefno");
        LoadSampOrderNoDDL("#ddlMOrderNo");
        $('#GenAdd').hide();

        if (Mode == 0) {
            $('#ddljoborder').attr('disabled', false);
            $('#ddlMOrderNo').attr('disabled', false);
            $('#ddlrefno').attr('disabled', false);
            Itemlist = [];
            Loadgrid(Itemlist);
        }

    } else {
        $('#ddljoborder').val(0).trigger('change');
        $('#ddlMOrderNo').val(0).trigger('change');
        $('#ddlrefno').val(0).trigger('change');

        $('#GenAdd').show();
        if (Mode == 0) {
            $('#ddljoborder').attr('disabled', true);
            $('#ddlMOrderNo').attr('disabled', true);
            $('#ddlrefno').attr('disabled', true);
            Itemlist = [];
            Loadgrid(Itemlist);
        }
    }

}

function loaditem() {
    debugger;
    var itmgrp = $('select#ddlItemgroup option:selected').val();
    var cat = 'P';

    if (itmgrp > 0) {
        $.ajax({
            url: "/OpeningStock/GetItem",
            data: JSON.stringify({ itmgrpid: itmgrp, itmcat: cat }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",

            success: function (result) {
                debugger;
                var obj = result.Value;
                if (result.Status == "SUCCESS") {
                    var data = result.Value;
                    debugger;
                    $(ddlItem).empty();
                    $(ddlItem).append($('<option/>').val('0').text('--Select Item--'));
                    $.each(data, function () {
                        $(ddlItem).append($('<option></option>').val(this.Itemid).text(this.item));
                    });
                }
            }

        });
    } else {
        LoadItemDDL("#ddlItem");
        LoadItemGroupDDL("#ddlItemgrp");
    }


    var itmgrp1 = $('select#ddlItemgroup option:selected').text();

    if (itmgrp1 == "FABRIC") {
        LoadFSizeDDL("#ddlSize");
    } else if (itmgrp1 == "YARN") {
        LoadYSizeDDL("#ddlSize");
    } else if (itmgrp1 == "GARMENTS") {
        LoadGSizeDDL("#ddlSize");
    } else {
        LoadSizeDDL("#ddlSize");
    }
}

function loaduom() {
    debugger;
    var itm = $('select#ddlItem option:selected').val();

    $.ajax({
        url: "/OpeningStock/GetUom",
        data: JSON.stringify({ itmid: itm }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            var obj = result.Value;
            $('#txtUnit').val(obj[0].unit);
            uomid = obj[0].UnitId;
        }

    });
}