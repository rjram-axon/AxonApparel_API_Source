
var MIG = 0;
var CompanyId = 0;
var index = -1;
var Masid = 0;
var Userid = 0;
var UserName = 0;
var Guserid = 0;
var DCompid = 0;
var ecompid = 0;
var totalqt = 0;
$(document).ready(function () {
    debugger;

    Guserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    DCompid = $("#hdnDCompid").data('value');
    //LoadCompanyDDL("#ddlACompany");
    LoadCompanyUnitDDL("#ddlAProdunit");
    LoadSupplierDDL("#ddlsupplier");
    LoadMultipleItemGroupDDL("#ddlItemGroup");
    LoadEmployeeDDL("#ddlApprovedBy");

    var protype = $('input[name="MOType"]:checked').attr('value');
    if (protype == 'P') {
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
    Mode = queryvalue[3];


    if (Mode == 0) {
        LoadCompanyDDL("#ddlACompany");
        CompanyId = DCompid;
        Loadorderno();
        GenerateNumber();

        $('#btnupd').hide();
        $('#btnadd').show();
        $('#btndel').hide();
    }

    if (Mode == 1) {
        Masid = Id;
        //LoadCompanyDDL("#ddlACompany");
        //LoadRefNoDDL('#ddlAReqno');
        //LoadOrderNoDDL('#ddlAOrderno');
        //LoadStyleDDL('#ddlAStyle');
        $('#btnupd').show();
        $('#btnadd').hide();
        $('#btndel').hide();
        loadheaderdet();
        Loadeditgrid();

    }

    if (Mode == 2) {
        Masid = Id;
        //LoadCompanyDDL("#ddlACompany");
        $('#btnupd').hide();
        $('#btnadd').hide();
        $('#btndel').show();
        loadheaderdet();
        Loadeditgrid();
    }
    LoadItemGroup();
    getDate();
});


$(document).ready(function () {
    $("#itmdetils ").dataTable().find("tbody").on('click', 'tr', function () {
        index = (this.rowIndex) - 1;
    });
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
    // $('#txtFromDate').val(date);
    //$('#txtReqDate').val(Fdatestring);
    $('#txtRefDate').val(Fdatestring);
    $('#txtAppDate').val(Fdatestring);

}
function GenerateNumber() {
    debugger;

    if (Mode == 0) {

        CompanyId = $('select#ddlACompany option:selected').val();

        if (CompanyId == undefined) {
            CompanyId = DCompid;
        } else {
            CompanyId = $('select#ddlACompany option:selected').val();
        }

        table = "Special_Req_Mas",
        column = "Spl_Req_No",
        compId = CompanyId,
        Docum = 'SPECIAL REQ'

        $.ajax({
            url: "/BulkOrder/GenerateNo",
            data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                debugger;
                $('#txtReqNo').val(result.Value);
            }
        });
    }
}


function myIgroup() {
    debugger;
    var Ig = [];
    $('#ddlItemGroup :selected').each(function (i, selected) {
        Ig[i] = $(selected).val();

        MIG = MIG + "," + Ig[i];


    });
}


function RadioMBClick() {
    debugger;
    var protype = $('input[name="MOType"]:checked').attr('value');
    if (protype == 'P') {
        $('#supp').hide();
        $("#fromunit").show();
    }
    else {
        $("#fromunit").hide();
        $('#supp').show();
    }
}
function LoadItemGroup() {
    debugger;
    $.ajax({
        url: "/ItemGroup/GetItemGroup/",
        typr: "GET",

        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {

            BindCheckBoxList(result);
        }

    });
}

function BindCheckBoxList(result) {
    var items = result.Value;
    CreateCheckBoxList(items);
}
function CreateCheckBoxList(checkboxlistItems) {
    var table = $('<table></table>');
    var counter = 0;
    $(checkboxlistItems).each(function () {
        table.append($('<tr></tr>').append($('<td></td>').append($('<input>').attr({
            type: 'checkbox', name: 'chklistitem', value: this.ItemgroupId, id: 'chklistitem' + counter
        })).append(
        $('<label>').attr({
            for: 'chklistitem' + counter++
        }).text(this.ItemGroupName))));
    });


    $('#dvCheckBoxListControl').append(table);
}

function LoadItemType() {
    // alert("dd");
    var dd = [];
    var all_location_id = document.querySelectorAll('input[name="chklistitem"]:checked');


    var aIds = [];

    for (var x = 0, l = all_location_id.length; x < l; x++) {
        aIds.push(all_location_id[x].value);
    }

    var str = aIds.join(', ');
    dd = aIds.join(', ');

    //FItem(dd);
    //alert(dd);
    var msg = dd;
    var flg = 4;
    var mod = 1;
    var url = "";
    AlartMessage(msg, flg, mod, url);
}

function backtomain() {
    window.location.href = "/SpecialRequisitionApprovalMain/SpecialRequisitionApprovalMainIndex";
}

function chkorder() {
    debugger;
    var protype = $('input[name="Type"]:checked').attr('value');
    if (protype == 'W' || protype == 'J') {

        //Loadorderno();
        LoadBulkOrderNoDDL("#ddlAOrderno");
    }
    else {
        LoadSampOrderNoDDL("#ddlAOrderno");

    }
}

function Loadorderno() {
    var cmpyid = CompanyId;
    var un = 'P';
    $.ajax({
        url: "/SpecialRequisitionAdd/GetOrderNo",
        data: JSON.stringify({ cmpid: cmpyid, unit: un }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;
                $(ddlAOrderno).empty();
                $(ddlAOrderno).append($('<option/>').val('0').text('--Select OrderNo--'));
                $.each(data, function () {
                    $(ddlAOrderno).append($('<option></option>').val(this.buymasid).text(this.orderno));
                });

            }
        }

    });
}

function Loadrefno() {
    debugger;
    var orderno = $('select#ddlAOrderno option:selected').text();
    var cmpyid = $('select#ddlACompany option:selected').val();
    var un = 'P';
    $.ajax({
        url: "/SpecialRequisitionAdd/GetRefNo",
        data: JSON.stringify({ cmpid: cmpyid, orderno: orderno, unit: un }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;
                $(ddlAReqno).empty();
                $(ddlAReqno).append($('<option/>').val('0').text('--Select RefNo--'));
                $.each(data, function () {
                    $(ddlAReqno).append($('<option></option>').val(this.buymasid).text(this.refno));
                });

            }
        }

    });
}

function LoadStyle() {
    debugger;
    var orderno = $('select#ddlAOrderno option:selected').text();
    var rfn = $('select#ddlAReqno option:selected').text();
    var cmpyid = $('select#ddlACompany option:selected').val();
    var un = 'P';
    $.ajax({
        url: "/SpecialRequisitionAdd/GetStyle",
        data: JSON.stringify({ cmpid: cmpyid, orderno: orderno, refno: rfn, unit: un }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;
                $(ddlAStyle).empty();
                $(ddlAStyle).append($('<option/>').val('0').text('--Select Style--'));
                $.each(data, function () {
                    $(ddlAStyle).append($('<option></option>').val(this.styleid).text(this.style));
                });

            }
        }

    });
}

function LoadJobordno() {
    debugger;
    var sty = $('select#ddlAStyle option:selected').val();
    var orderno = $('select#ddlAOrderno option:selected').text();
    var rfn = $('select#ddlAReqno option:selected').text();
    var cmpyid = $('select#ddlACompany option:selected').val();
    var un = 'P';
    $.ajax({
        url: "/SpecialRequisitionAdd/Getwrkordno",
        data: JSON.stringify({ cmpid: cmpyid, orderno: orderno, refno: rfn, styleid: sty, unit: un }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;
                $(ddlAWorkorder).empty();
                $(ddlAWorkorder).append($('<option/>').val('0').text('--Select JobOrdNo--'));
                $.each(data, function () {
                    $(ddlAWorkorder).append($('<option></option>').val(this.jobid).text(this.jobordno));
                });

            }
        }

    });
}

function Loadwrkgrid() {
    debugger;
    var sty = $('select#ddlAStyle option:selected').val();
    var orderno = $('select#ddlAOrderno option:selected').text();
    var rfn = $('select#ddlAReqno option:selected').text();
    var jbno = $('select#ddlAWorkorder option:selected').text();

    $.ajax({
        url: "/SpecialRequisitionAdd/Loadgrid",
        data: JSON.stringify({ jborderno: jbno, orderno: orderno, refno: rfn, styleid: sty }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            ItmList = result.Value;
            Loaditmtab(ItmList);
        }

    });
}

function Loadeditgrid() {
    debugger;
    $.ajax({
        url: "/SpecialRequisitionAdd/Loadeditgrid",
        data: JSON.stringify({ reqid: Masid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            ItmList = result.Value;


            for (var e = 0; e < ItmList.length; e++) {
                var amount = ItmList[e].Order_Qty;
                totalqt = totalqt + parseFloat(amount);

            }
            Loaditmtab(ItmList);

            if (Mode == 2) {

                if (totalqt > 0) {

                    $("#btndel").attr("disabled", true);

                    //alert("Po has been made for this entry,Cannot delete..");
                    var msg = "PO has been made for this entry,Cannot delete...";
                    var flg = 4;
                    var mod = 1;
                    var url = "";
                    AlartMessage(msg, flg, mod, url);
                    return true;

                }
            }
           




        }

    });
}

function Loadjobgrid() {
    debugger;
    var sty = $('select#ddlAStyle option:selected').val();
    var orderno = $('select#ddlAOrderno option:selected').text();
    var rfn = $('select#ddlAReqno option:selected').text();
    var jbno = $('select#ddlAWorkorder option:selected').text();

    $.ajax({
        url: "/SpecialRequisitionAdd/Loadjobgrid",
        data: JSON.stringify({ jborderno: jbno, orderno: orderno, refno: rfn, styleid: sty }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            ItmList = result.Value;
            Loaditmtab(ItmList);
        }

    });
}

function checklistgrid() {
    debugger;
    var protype = $('input[name="Type"]:checked').attr('value');
    if (Mode == 0) {
        if (protype == 'W') {
            Loaditmgrp();
            Loadwrkgrid();
        }
        else if (protype == 'J') {
            //Loaditmgrp();
            Loadjobgrid();
        }
    }
    if (Mode == 1 || Mode == 2) {
        if (protype == 'W') {
            Loaditmgrp();
            // Loadeditgrid();
        }
        else if (protype == 'J') {
            //Loaditmgrp();
            Loadjobgrid();
        }
    }
}

function Loaditmgrp() {
    debugger;
    var jordno = ""
    if (Mode == 0) {
        jordno = $('select#ddlAWorkorder option:selected').text();
    }
    else if (Mode == 1 || Mode == 2) {
        if (ItmList.length > 0) {
            jordno = ItmList[0].Job_Ord_No;
        }
    }
    $.ajax({
        url: "/SpecialRequisitionAdd/Getitmgrp",
        data: JSON.stringify({ jbno: jordno }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;
                $(ddlItemGroup).empty();
                //$(ddlAWorkorder).append($('<option/>').val('0').text('--Select JobOrdNo--'));
                $.each(data, function () {
                    $(ddlItemGroup).append($('<option></option>').val(this.itmgrpid).text(this.itmgrp));
                });
            }


        }

    });
}

function Loaditmtab(list) {
    $('#itmdetils').DataTable().destroy();
    debugger;

    $('#itmdetils').DataTable({
        data: list,
        scrollY: 300,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        //"bSort": false,
        columns: [
            { title: "Sno", data: "sno", "visible": false },
            { title: "Itemgrpid", data: "itmgrpid", "visible": false },
             { title: "ItemId", data: "Itemid", "visible": false },
            { title: "Item", data: "item" },
            { title: "ColorId", data: "Colorid", "visible": false },
            { title: "Color", data: "color" },
            { title: "SizeId", data: "Sizeid", "visible": false },
            { title: "Size", data: "size" },
            { title: "UnitId", data: "UOMid", "visible": false },
            { title: "Unit", data: "uom" },
           {
               title: "Quanity", data: "Quantity",
               
           },
           {
               title: "Approved Qty", data: "App_Qty",
               render: function (data) {

                   return '<input type="text" id="txtqty" class="form-control"  style="width: 100px;text-align: center;" value=' + data + ' onfocusout="calcqty(this.value)" >';
               }
           },
            { title: "Pur unit id", data: "Pur_UOMid", "visible": false },
            { title: "Pur Unit", data: "puruom" },
            { title: "Mode", data: "Conv_Mode" },
            { title: "T.Po Unit", data: "ToPurUOM" },




        ]
    });
}

function calcqty(val) {
    debugger;
    var currentrow = ItmList.slice(index);
    var s = currentrow[0].sno;
    var oqty = currentrow[0].Quantity;
    if (val == "") {
        val = 0;
    }
    if (val > oqty) {
        $.each(ItmList, function () {
            if (this.sno == s) {
                this.App_Qty = 0;

            }
        });
        Loaditmtab(ItmList);
        //alert("Approved Qty not greater then Order Qty..");
        var msg = "Approved quntity not greater then Order quntity...";
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
        
    } else {
        $.each(ItmList, function () {
            if (this.sno == s) {
                this.App_Qty = val;

            }
        });
        Loaditmtab(ItmList);
    }
}

function Add() {
    debugger;

    var res = validate();
    if (res == false) {
        return false;
    }
    var list = [];

    var protype = $('input[name="Type"]:checked').attr('value');
    var unit = $('input[name="MOType"]:checked').attr('value');
    list = $.grep(ItmList, function (er) {
        return (er.Quantity > 0);
    });
    if (list.length == 0) {
        //alert('Fill the qty for atleast one... ');
        var msg = "Fill the quantity for atleast one...";
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }
    else {
        ItmList = list;
    }
    $.each(ItmList, function () {

        this.Issue_Qty = 0.00;
        this.Order_Qty = 0.00;
        this.Received_Qty = 0.00;
        this.Cancel_Qty = 0.00;
        this.Debit_Qty = 0.00;
        this.ReqType = "P";


    });
    var objConSubmit = {

        //
        //Spl_Reqid: $('#txtHCompanyId').val(),
        Spl_Req_No: $('#txtReqNo').val(),// $('#txtOrderNo').val(),
        Spl_Req_Date: $('#txtReqDate').val(),//new Date($('#txtReqDate').val()),
        Ref_No: $('select#ddlAReqno option:selected').text(),
        Ref_Date: $('#txtRefDate').val(),//new Date($('#txtRefDate').val()),
        Job_Ord_No: $('select#ddlAWorkorder option:selected').text(),
        Companyid: $('#ddlACompany').val(),
        CompanyUnitid: $('#ddlAProdunit').val(),
        Req_Remarks: $('#txtSupAdd').val(),
        Req_Commit_Cancel: "N",
        //App_By: $('select#ddlcmpnyadd option:selected').val(),
        //App_Date: ,//$('#txtBuyOrdMasId').val(),
        //App_Commit_Cancel: $('select#ddlMForunit option:selected').val(),
        App_Remarks: "R",//$('#txtBuyOrdMasId').val(),
        Auto_Manual: "U",// $('#txtBuyOrdMasId').val(),
        //OrderType: $('select#ddlMProcess option:selected').val(),
        Unit_Or_Other: unit,//"P",
        Type: protype,//$('#txtBuyOrdMasId').val(),
        App_Amend: "N",
        CreatedBy: Guserid,

        SplreqDet: ItmList,

    };
    $("#btnadd").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/SpecialRequisitionAdd/Add",
        data: JSON.stringify(objConSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Value == true) {

                //alert('Data Saved Successfully');
                AddUserEntryLog('ManagementConsole', 'SpecialRequisitionApproval', 'ADD', $("#txtReqNo").val());
                //window.location.href = "/SpecialRequisitionMain/SpecialRequisitionMainIndex";
                var msg = "Data Saved Successfully...";
                var flg = 1;
                var mod = 0;
                var url = "/SpecialRequisitionMain/SpecialRequisitionMainIndex";
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



function validate() {
    var isValid = true;
    if ($('#ddlACompany').val().trim() == 0) {
        $('#ddlACompany').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlACompany').css('border-color', 'lightgrey');
    }


    if ($('#ddlAProdunit').val().trim() == 0) {
        $('#ddlAProdunit').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlAProdunit').css('border-color', 'lightgrey');
    }


    return isValid;
}


function AppUpdate() {
    debugger;
    var list = [];
    list = $.grep(ItmList, function (er) {
        return (er.App_Qty > 0);
    });
    if (list.length == 0) {
        //alert('Fill the qty for atleast one... ');
        var msg = "Fill the quantity for atleast one...";
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }
    else {
        ItmList = list;
    }
    var protype = $('input[name="Type"]:checked').attr('value');
    var unit = $('input[name="MOType"]:checked').attr('value');
    $.each(ItmList, function () {

        this.Spl_Reqid = Masid;
        this.ReqType = unit;


    });


    if ($('#ddlApprovedBy').val() == "") {      
        $('#ddlApprovedBy').css('border-color', 'Red');
        return true;
    }
    else {
        $('#ddlApprovedBy').css('border-color', 'lightgrey');
    }

    var objConSubmit = {

        //
        Spl_Reqid: Masid,
        Spl_Req_No: obj[0].Spl_Req_No,// $('#txtReqNo').val(),// $('#txtOrderNo').val(),
        Spl_Req_Date: $('#txtRefDate').val(),//new Date($('#txtReqDate').val()),
        Ref_No: obj[0].Ref_No,// $('select#ddlAReqno option:selected').text(),
        Ref_Date: $('#txtRefDate').val(),//new Date($('#txtRefDate').val()),
        Job_Ord_No: obj[0].Job_Ord_No,//$('select#ddlAWorkorder option:selected').text(),
        Companyid: obj[0].Companyid,//$('#ddlACompany').val(),
        CompanyUnitid: obj[0].CompanyUnitid,//$('#ddlAProdunit').val(),
        Req_Remarks: $('#txtSupAdd').val(),
        Req_Commit_Cancel: "N",
        App_By: $('select#ddlApprovedBy option:selected').val(),
        App_Date: $('#txtAppDate').val(),
        //App_Commit_Cancel: $('select#ddlMForunit option:selected').val(),
        App_Remarks: "R",//$('#txtBuyOrdMasId').val(),
        Auto_Manual: "U",// $('#txtBuyOrdMasId').val(),
        //OrderType: $('select#ddlMProcess option:selected').val(),
        Unit_Or_Other: unit,// "P",
        Type: protype,//$('#txtBuyOrdMasId').val(),
        App_Amend: "N",
        CreatedBy: Guserid,

        SplreqDet: ItmList,

    };
    $("#btnupd").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/SpecialRequisitionAdd/AppUpdate",
        data: JSON.stringify(objConSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Value == true) {

                //alert('Data Approved Successfully');
                AddUserEntryLog('ManagementConsole', 'SpecialRequisitionApproval', 'APPROVED', $("#txtReqNo").val());
                //window.location.href = "/SpecialRequisitionApprovalMain/SpecialRequisitionApprovalMainIndex";
                var msg = "Data Approved Successfully...";
                var flg = 1;
                var mod = 0;
                var url = "/SpecialRequisitionApprovalMain/SpecialRequisitionApprovalMainIndex";
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

function loadheaderdet() {


    LoadOrderNoDDL("#ddlAOrderno");
    LoadRefNoDDL("#ddlAReqno");
    LoadStyleDDL("#ddlAStyle");
    LoadJobNoDDL("#ddlAWorkorder");
    LoadCompanyUnitDDL("#ddlAProdunit");
    //LoadCompanyDDL("#ddlACompany");

    var OType = "";
    var ONo = $('select#ddlMOrdertype option:selected').val();

    if (ONo == 0) {
        OType == "";
    }
    else {

        OType = $('select#ddlMOrdertype option:selected').val();
    }

    var JobNo = "";
    var RNo = $('select#ddlMJobno option:selected').val();

    if (RNo == 0) {
        JobNo == "";
    }
    else {

        JobNo = $('select#ddlMJobno option:selected').val();
    }




    var rid = Masid;
    var unitoth = "P";

    var CompId = $('#ddlMCompany').val();
    if (CompId == null) {
        CompId = 0;
    }
    var Unit = $('#ddlMUnit').val();
    if (Unit == null) {
        Unit = 0;
    }
    var style = $('#ddlMStyle').val();
    if (style == null) {
        style = 0;
    }
    var refno = $('#ddlMRefNo').val();
    if (refno == null || refno == 0) {
        refno = "";
    }
    var orderno = $('#ddlMOrderno').val();
    if (orderno == null || orderno == 0) {
        orderno = "";
    }
    var reqno = $('#ddlMReqno').val();
    if (reqno == null || reqno == 0) {
        reqno = "";
    }
    //var FDate = new Date($('#txtFromDate').val());

    //var TDate = new Date($('#txtToDate').val());


    var FDate = $('#txtFromDate').val();

    var TDate = $('#txtToDate').val();
    $.ajax({
        url: "/SpecialRequisitionMain/GetMainddldet",
        data: JSON.stringify({ companyId: CompId, type: OType, orderno: orderno, refno: refno, jobordno: JobNo, reqid: rid, reqno: reqno, styleid: style, unitid: Unit, unitrother: unitoth, fromDate: FDate, todate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            obj = json.Value;
            //$('#ddlACompany').val(obj[0].Companyid);

            ecompid = obj[0].Companyid;
            var appby = obj[0].App_By;
            // Loadorderno();
            $('#ddlAOrderno').val(obj[0].bmasid);
            $('#ddlAReqno').val(obj[0].bmasid);
            $('#ddlAStyle').val(obj[0].styleid);
            $('#ddlAWorkorder').val(obj[0].jmasid);
            $('#ddlAProdunit').val(obj[0].CompanyUnitid);

            if (appby > 0) {
                $('#ddlApprovedBy').val(obj[0].App_By);
                $('#txtAppDate').val(moment(obj[0]["App_Date"]).format('DD/MM/YYYY'));
            }
            //Loadrefno();
            //LoadStyle();
            //LoadJobordno();
            $('#txtReqNo').val(obj[0].Spl_Req_No);
            //$('#ddlAProdunit').val(obj[0].unitid);
           
            $('#txtRefDate').val(moment(obj[0]["Ref_Date"]).format('DD/MM/YYYY'));
            $('#txtSupAdd').val(obj[0].Req_Remarks);
            if (obj[0].Type == 'W') {
                $('input:radio[name="Type"][value="W"]').prop('checked', true);
            }
            else if (obj[0].Type == 'J') {
                $('input:radio[name="Type"][value="J"]').prop('checked', true);
            }
            else if (obj[0].Type == 'S') {
                $('input:radio[name="Type"][value="S"]').prop('checked', true);
            }

            LoadAddCompanyDDL('#ddlACompany');

        },

        failure: function (errMsg) {
            alert(errMsg);
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
            url: "/SpecialRequisitionAdd/Delete/" + Masid,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                if (result.Value == true) {
                    //alert("Data Deleted Sucessfully");
                    AddUserEntryLog('ManagementConsole', 'SpecialRequisitionApproval', 'DELETE', $("#txtReqNo").val());
                    //window.location.href = "/SpecialRequisitionMain/SpecialRequisitionMainIndex";
                    var msg = "Data Deleted Successfully...";
                    var flg = 2;
                    var mod = 0;
                    var url = "/SpecialRequisitionMain/SpecialRequisitionMainIndex";
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
}

function LoadCompanyNo() {


    GenerateNumber();
    Loadorderno();
}

function LoadAddCompanyDDL(companyDDLName) {
    debugger;
    companyDDL = companyDDLName;
    httpGet("/Company/GetCompany", onCompanySuccess, onCompanyFailure);
}
function onCompanySuccess(result) {
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(companyDDL).empty();
        // $(companyDDL).append($('<option/>').val('0').text('--Select Company--'));
        $.each(data, function () {
            $(companyDDL).append($('<option></option>').val(this.CompanyId).text(this.CompanyName));
        });
        $(companyDDL).trigger("select2:updated");
        $('#ddlACompany').val(ecompid).trigger('change');
    }
    else {
        //alert('Company loading failed');
        var msg = "Company loading failed...";
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
    }
}
function onCompanyFailure(result) {

    //alert('Company loading failed');
    var msg = "Company loading failed...";
    var flg = 4;
    var mod = 1;
    var url = "";
    AlartMessage(msg, flg, mod, url);
}


function AppDelete() {


    debugger;
    var list = [];
    list = $.grep(ItmList, function (er) {
        return (er.App_Qty > 0);
    });
    if (list.length == 0) {
        //alert('Fill the qty for atleast one... ');
        var msg = "Fill the qty for atleast one...";
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }
    else {
        ItmList = list;
    }
    var protype = $('input[name="Type"]:checked').attr('value');
    var unit = $('input[name="MOType"]:checked').attr('value');
    $.each(ItmList, function () {

        this.Spl_Reqid = Masid;
        this.ReqType = unit;


    });


    if ($('#ddlApprovedBy').val() == "") {
        $('#ddlApprovedBy').css('border-color', 'Red');
        return true;
    }
    else {
        $('#ddlApprovedBy').css('border-color', 'lightgrey');
    }

    var objConSubmit = {

        //
        Spl_Reqid: Masid,
        Spl_Req_No: obj[0].Spl_Req_No,// $('#txtReqNo').val(),// $('#txtOrderNo').val(),
        Spl_Req_Date: $('#txtRefDate').val(),//new Date($('#txtReqDate').val()),
        Ref_No: obj[0].Ref_No,// $('select#ddlAReqno option:selected').text(),
        Ref_Date: $('#txtRefDate').val(),//new Date($('#txtRefDate').val()),
        Job_Ord_No: obj[0].Job_Ord_No,//$('select#ddlAWorkorder option:selected').text(),
        Companyid: obj[0].Companyid,//$('#ddlACompany').val(),
        CompanyUnitid: obj[0].CompanyUnitid,//$('#ddlAProdunit').val(),
        Req_Remarks: $('#txtSupAdd').val(),
        Req_Commit_Cancel: "N",
        App_By: $('select#ddlApprovedBy option:selected').val(),
        App_Date: $('#txtAppDate').val(),
        //App_Commit_Cancel: $('select#ddlMForunit option:selected').val(),
        App_Remarks: "R",//$('#txtBuyOrdMasId').val(),
        Auto_Manual: "U",// $('#txtBuyOrdMasId').val(),
        //OrderType: $('select#ddlMProcess option:selected').val(),
        Unit_Or_Other: unit,// "P",
        Type: protype,//$('#txtBuyOrdMasId').val(),
        App_Amend: "N",
        CreatedBy: Guserid,

        SplreqDet: ItmList,

    };
    $("#btnupd").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/SpecialRequisitionAdd/AppDelete",
        data: JSON.stringify(objConSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Value == true) {

                //alert('Data Deleted Successfully');
                AddUserEntryLog('ManagementConsole', 'SpecialRequisition', 'REVERT', $("#txtReqNo").val());
                //window.location.href = "/SpecialRequisitionApprovalMain/SpecialRequisitionApprovalMainIndex";
                var msg = "Data Deleted Successfully...";
                var flg = 2;
                var mod = 0;
                var url = "/SpecialRequisitionApprovalMain/SpecialRequisitionApprovalMainIndex";
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