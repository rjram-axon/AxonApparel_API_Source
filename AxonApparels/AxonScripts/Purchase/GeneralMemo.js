var Itmdet = [];
var MOrd = 0;
var CompanyId = 0;
var Masid = 0;
var GUserid = 0;
var UserName = 0;
var MainFDate = 0;
var repobj = [];
var Repid = 0;
var DTmode = 0;
$(document).ready(function () {
    debugger;

    GUserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    MainFDate = $("#hdMainFromDate").data('value');
    LoadCompanyDDL("#ddlFromCompany,#ddlMCompany");
    LoadSupplierDDL("#ddlSupplier,#ddlMSupplier");
    LoadCompanyUnitDDL("#ddlCmpanyunit,#ddlfromunit");
    LoadBuyerDDL("#ddlBuyer,#ddlMBuyer");
    LoadProcessDDL("#ddlProcess");
    LoadStyleDDL("#ddlStyleNo");
    LoadMultipleItemGroupDDL("#ddlItemgrp");
    LoadColorDDL("#ddlcolor");
    LoadSizeDDL("#ddlSize");
    LoadItemDDL("#ddlItem");
    LoadEmployeeDDL("#ddlRequestner");
    LoadWorkdivisionDDL("#ddlwrkdiv");
    getDate();
    var fill = localStorage.getItem('GeneralMemoMainFilter');
    if (fill != "null" && fill != null) {
        LoadMaingridFromBack();
    } else {
        LoadMaingrid();
    }

    //LoadMaingrid();
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
        if ($('#ddlItem').val() == "0") {
            isAllValid = false;
            $('#ddlItem').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#ddlItem').siblings('span.error').css('visibility', 'hidden');
        }

        if ($('#ddlcolor').val() == "0") {
            isAllValid = false;
            $('#ddlcolor').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#ddlcolor').siblings('span.error').css('visibility', 'hidden');
        }



        var slno = [];
        $.each(Itmdet, function () {
            var sl = this.Slno;
            slno.push(sl);
        });
        var largest = 0;

        for (var i = 0; i < slno.length; i++) {
            if (slno[i] > largest) {
                var largest = slno[i];
            }
        }

        lengdp = largest + 1;
       

        //if (Itmdet.length == 0) {
        //    lengdp = 1;
        //}
        //else {
        //    lengdp = Itmdet.length + 1;
        //}
        if (isAllValid) {

            var DetObj = {
                Slno: lengdp,
                Gen_memo_Detid: 0,
               
                Itemid: $("#ddlItem option:selected").val(),
                item: $("#ddlItem option:selected").text(),
                Colorid: $("#ddlcolor option:selected").val(),
                color: $("#ddlcolor option:selected").text(),
                Sizeid: $("#ddlSize option:selected").val(),
                size: $("#ddlSize option:selected").text(),
                Uomid: uomid,
                uom: $("#txtUom").val(),
                Quantity: $("#txtQuantity").val(),
                Rate: $("#txtRate").val(),
                Amount: $("#txtAmt").val(),
                ItemRemarks: $("#txtItmRemarks").val(),
            }
            Itmdet.push(DetObj);           
            LoadItmtab(Itmdet);
           

          
        }
        fnClearcDetailsControls();
    });
    $(document).on('click', '.btnitmedit', function () {
        rowindex = $(this).closest('tr').index();

        var cur1 = Itmdet.slice(rowindex);

      
        $('#ddlItem').val(cur1[0]['Itemid']);
        $('#ddlcolor').val(cur1[0]['Colorid']);
        $('#ddlSize').val(cur1[0]['Sizeid']);
        $('#txtQuantity').val(cur1[0]['Quantity']);
        $('#txtUom').val(cur1[0]['uom']);

        $('#txtRate').val(cur1[0]['Rate']);
        $('#txtAmt').val(cur1[0]['Amount']);
        $('#txtItmRemarks').val(cur1[0]['ItemRemarks']);


        $('#btnitmadd').hide();
        $('#btnitmupdate').show();
    });
    $('#btnitmupdate').click(function () {
        debugger;
     
        var currentrowsel = Itmdet.slice(rowindex);
      
        currentrowsel[0]['Itemid'] = $("#ddlItem").val();
        currentrowsel[0]['item'] = $("#ddlItem option:selected").text();
        currentrowsel[0]['Colorid'] = $("#ddlcolor").val();
        currentrowsel[0]['color'] = $("#ddlcolor option:selected").text();
        currentrowsel[0]['Sizeid'] = $("#ddlSize").val();
        currentrowsel[0]['size'] = $("#ddlSize  option:selected").text();

        currentrowsel[0]['Quantity'] = $("#txtQuantity").val();
        currentrowsel[0]['Rate'] = $("#txtRate").val();
        currentrowsel[0]['Amount'] = $("#txtAmt").val();
        currentrowsel[0]['ItemRemarks'] = $("#txtItmRemarks").val();
        currentrowsel[0]['uom'] = $("#txtUom").val();
      

      
        Itmdet[rowindex] = currentrowsel[0];    

        LoadItmtab(Itmdet);    

      
        fnClearcDetailsControls();
        $('#btnitmadd').show();
        $('#btnitmupdate').hide();
    });
    $(document).on('click', '.btnitmremove', function () {
        rowindex = $(this).closest('tr').index();

        Itmdet.splice(rowindex, 1);
        document.getElementById("itmdetails").deleteRow(rowindex + 1);
       
        
    });

    $('#Return').click(function () {

        var val = $(this).is(":checked");
        if (val == true) {
            $('#txtRtnDate').val('');
            $("#txtRtnDate").attr("disabled", false);
        } else {

            $('#txtRtnDate').val('');
            $("#txtRtnDate").attr("disabled", true);
        }

    });

    $(document).on('keyup', '#txtQuantity', function () {

        var Rate = 0;
        var Qty = 0;
        Rate = $('#txtRate').val();
        Qty = $('#txtQuantity').val();
        var Amt = Rate * Qty;
        $('#txtAmt').val(Amt);
    });

    $(document).on('keyup', '#txtRate', function () {

        var Rate = 0;
        var Qty = 0;
        Rate = $('#txtRate').val();
        Qty = $('#txtQuantity').val();
        var Amt = Rate * Qty;
        $('#txtAmt').val(Amt);
    });


});

function fnClearcDetailsControls() {
    $('#ddlItem').val('0').trigger('change');
    $('#ddlcolor').val('0').trigger('change');
    $('#ddlSize').val('0').trigger('change');
    $('#txtUom').val('');
    $('#txtQuantity').val('');
    $('#txtRate').val('');
    $('#txtAmt').val('');
    $('#txtItmRemarks').val('');
}

function chkcmpnyid() {
    debugger;
    // if (Mode == 0) {
    CompanyId = $('select#ddlFromCompany option:selected').val();
    if (CompanyId == 0) {
        //alert('Select Company...');
        var msg = 'Select Company...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }
    else {
        GenerateNumber();
    }
    // }

}
function GenerateNumber() {
    debugger;

    table = "General_Memo_mas",
    column = "Gen_memo_No",
    compId = CompanyId,
    Docum = 'GENERAL ISSUES [MEMO]'

    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $('#txtEntryNo').val(result.Value);
        }
    });
}

function ClearTextbox() {
    debugger;
    $('#txtEntryNo').val("");
    $('#txtEntryDate').val("");
    $('#ddlFromCompany').val("0");
    $('#txtRefNo').val("");
    $('#txtRefDate').val("");
    $('#ddlTostore').val("0");
    $('#ddlOrderNo').val("0");
    $('#ddlProcess').val("0");
    $('#ddlCmpanyunit').val("0");
    $('#ddlSupplier').val("0");
    $('#ddlwrkdiv').val("0");
    $('#txtvehicleno').val("");
    $('#ddlStyleNo').val("0");
    $('#ddlBuyer').val("0");
    $('#ddlfromunit').val("0");
    $('#ddlRequestner').val("0");
    $('#txtremarks').val("");
    $('#Return').prop('checked', false);
    $('#txtRtnDate').val("");
    getDate();
    var protype = $('input[name="MOType"]:checked').attr('value');
    if (protype == 'U') {
        $('#buyer').hide();
        $('#supp').hide();
        $("#unit").show();
    }
    else if (protype == 'S') {
        $("#unit").hide();
        $('#buyer').hide();
        $('#supp').show();
    }
    else if (protype == 'W') {
        $("#unit").hide();
        $('#supp').hide();
        $('#buyer').show();
    }
    $('#btnUpdate').hide();
    $('#btnDel').hide();
    $('#btnAdd').show();
    Itmdet = [];
    LoadItmtab(Itmdet);
    fnClearcDetailsControls();
}

function backtomain() {
    $('#myModal').hide();
    $('#myModal').modal('hide');
}

function LoadItemddl() {
    
    if (MOrd == "0") {
        var id = "";
    }
    else {
        var id = MOrd;
    }
    debugger;
    $.ajax({
        url: "/GeneralMemo/LoadItmDetails",
        data: JSON.stringify({ Itmgrpid: id }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            debugger;

           // if (result.Status == 'SUCCESS') {

            if (result.length>0) {
                var data = result;
                $(ddlItem).empty();
                $(ddlItem).append($('<option/>').val('0').text('--Select Item--'));
                $.each(data, function () {
                    $(ddlItem).append($('<option></option>').val(this.Itemid).text(this.item));
                });
                }


           // }
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadItmtab(list) {
    $('#itmdetails').DataTable().destroy();

    $('#itmdetails').DataTable({
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
        columns: [
                   { title: "SNo", data: "Slno", "visible": false },
                   { title: "Detid", data: "Gen_memo_Detid", "visible": false },
                   { title: "ItemId", data: "Itemid", "visible": false },
                   { title: "Item", data: "item" },
                   { title: "ColorId", data: "Colorid", "visible": false },
                   { title: "Color", data: "color" },
                   { title: "SizeId", data: "Sizeid", "visible": false },
                   { title: "Size", data: "size" },
                   { title: "Uom", data: "uom" },
                  
                   {
                       title: "Qty", data: "Quantity",
                       //render: function (data) {

                       //    return '<input type="text" id="txtitmqty" class="editor-active"  style="width: 55px;text-align: center;" value=' + data + '  onkeyup="calcitmqty(this.value)" >';
                       //}
                   },
                    { title: "Rate", data: "Rate" },
                     { title: "Amount", data: "Amount" },
                      { title: "Remarks", data: "ItemRemarks" },
                  

               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnitmedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnitmremove btn btn-danger btn-round"> <i class="fa fa-times"></i> </button>   </div>'

               }
        ]

    });
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
    $('#txtFromDate').val(MainFDate);
    $('#txtToDate').val(Fdatestring);
    $('#txtEntryDate').val(Fdatestring);
    $('#txtRefDate').val(Fdatestring);

}
function RadioMBClick() {
    var protype = $('input[name="MOType"]:checked').attr('value');
    if (protype == 'U') {
        $('#buyer').hide();
        $('#supp').hide();
        $("#unit").show();
    }
    else if (protype == 'S') {
        $("#unit").hide();
        $('#buyer').hide();
        $('#supp').show();
    }
    else if (protype == 'W') {
        $("#unit").hide();
        $('#supp').hide();
        $('#buyer').show();
    }
}

function myItmddl(Val) {

    var foo = [];
    MOrd = 0;
    $('#ddlItemgrp :selected').each(function (i, selected) {
        foo[i] = $(selected).val();

        MOrd = MOrd + "," + foo[i];


    });

    LoadItemddl();

}

function OAddList() {
    debugger;

    var cmpyid = $('select#ddlFromCompany option:selected').val();
    chkcmpnyid();

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
                $(ddlOrderNo).empty();
                $(ddlOrderNo).append($('<option/>').val('0').text('--Select OrderNo--'));
                $.each(data, function () {
                    $(ddlOrderNo).append($('<option></option>').val(this.jobid).text(this.orderno));
                });
                //}


            }

           
        }

    });
 
}

function loaduom() {
    debugger;
    var itm = $('select#ddlItem option:selected').val();

    $.ajax({
        url: "/StockOutward/GetUom",
        data: JSON.stringify({ itmid: itm }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            var obj = result.Value;
            $('#txtUom').val(obj[0].uom);        
          
            uomid = obj[0].Uomid;
        }

    });
}
function validate() {
    var isValid = true;
    if ($('#ddlFromCompany').val() == 0) {
        $('#ddlFromCompany').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlFromCompany').css('border-color', 'lightgrey');
    }

    if ($('#ddlfromunit').val() == 0) {
        $('#ddlfromunit').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlfromunit').css('border-color', 'lightgrey');
    }

    if ($('#ddlCmpanyunit').val() == 0) {
        $('#ddlCmpanyunit').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlCmpanyunit').css('border-color', 'lightgrey');
    }

    if ($('#txtRefNo').val().trim() == "") {
        $('#txtRefNo').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtRefNo').css('border-color', 'lightgrey');
    }

    return isValid;
}
function Add() {
    debugger;

    var res = validate();
    if (res == false) {
        return true;
    }
    var protype = $('input[name="MOType"]:checked').attr('value');
    var unitid = 0;
    var unirother = '';
    if (protype == 'U') {
        unitid = $('#ddlCmpanyunit').val();
        unirother = 'U';
    }
    else if (protype == 'S') {
        unitid = $('#ddlSupplier').val();
        unirother = 'S';
    }
    else if (protype == 'W') {
        unitid = $('#ddlwrkdiv').val();
        unirother = 'W';
    }
    var ordnum = '';
    if ($('#ddlOrderNo option:selected').text() == '--Select OrderNo--') {
        ordnum = '';
    }
    else {
        ordnum = $('#ddlOrderNo option:selected').text();
    }
    var Rtnble = $('#Return').is(":checked");

    var rtdate = $('#txtRtnDate').val();
    var rtn = 'N';
    if (Rtnble) {
        rtn = 'Y';
    } else {
        var rtdate = $('#txtRefDate').val();
    }
    debugger;
    table = "General_Memo_mas",
    column = "Gen_memo_No",
    compId = CompanyId,
    Docum = 'GENERAL ISSUES [MEMO]'

    var oldentryno = $('#txtEntryNo').val();
    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var newentryno = result.Value;
            if (oldentryno != newentryno) {
                //alert('Entry No has been changed...');
                var msg = 'Entry Number has been changed...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                $('#txtEntryNo').val(result.Value);
            }
            var objConSubmit = {


                //Gen_memo_Masid: $('#txtHCompanyId').val(),
                Gen_memo_No: $('#txtEntryNo').val(),
                Gen_memo_date: $('#txtEntryDate').val(),//new Date($('#txtEntryDate').val()),
                Gen_memo_RefNo: $('#txtRefNo').val(),
                Gen_memo_Refdate: $('#txtRefDate').val(),//new Date( $('#txtRefDate').val()),
                Companyid: $('#ddlFromCompany').val(),
                UnitId: unitid,//$('#ddlfromunit').val(),
                Unit_or_Other: unirother,
                Remarks: $('#txtremarks').val(),
                VehicleNo: $('#txtvehicleno').val(),
                ReturnOrNo: rtn,
                ReturnDate: rtdate,//new Date($('#txtRefDate').val()),
                RequestnerId: $('#ddlRequestner').val(),
                CreatedBy: GUserid,
                Order_no: ordnum,
                ProcessId: $('#ddlProcess').val(),
                Company_unitID: $('#ddlfromunit').val(),
                styleid: $('#ddlStyleNo').val(),
                BuyerId: $('#ddlBuyer').val(),
                validatebomqtyindelivery: 0,

                GenMemDet: Itmdet

            };
            $("#btnAdd").attr("disabled", true);
            LoadingSymb();
            $.ajax({
                url: "/GeneralMemo/Add",
                data: JSON.stringify(objConSubmit),
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {
                    debugger;
                    if (result.Value == true) {
                        AddUserEntryLog('Procurement', 'General Memo', 'ADD', $("#txtEntryNo").val());
                        //alert('Data Saved Successfully');
                        //window.location.href = "/GeneralMemo/GeneralMemoIndex";
                        var msg = 'Data Saved Successfully...';
                        var flg = 1;
                        var mod = 0;
                        var url = "/GeneralMemo/GeneralMemoIndex";
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

function Update() {
    debugger;
    var res = validate();
    if (res == false) {
        return true;
    }
    var protype = $('input[name="MOType"]:checked').attr('value');
    var unitid = 0;
    var unirother = '';
    if (protype == 'U') {
        unitid = $('#ddlCmpanyunit').val();
        unirother = 'U';
    }
    else if (protype == 'S') {
        unitid = $('#ddlSupplier').val();
        unirother = 'S';
    }
    else if (protype == 'W') {
        unitid = $('#ddlwrkdiv').val();
        unirother = 'W';
    }

    var ordnum = '';
    if ($('#ddlOrderNo option:selected').text() == '--Select OrderNo--') {
        ordnum = '';
    }
    else {
        ordnum = $('#ddlOrderNo option:selected').text();
    }

    var Rtnble = $('#Return').is(":checked");

    var rtdate = $('#txtRtnDate').val();
    var rtn = 'N';
    if (Rtnble) {
        rtn = 'Y';
    } else {
        var rtdate = $('#txtRefDate').val();
    }


    $.each(Itmdet, function () {

        this.Gen_memo_Masid = Masid;


    });

    var objConSubmit = {


        Gen_memo_Masid:Masid,// $('#txtHCompanyId').val(),
        Gen_memo_No: $('#txtEntryNo').val(),
        Gen_memo_date: $('#txtEntryDate').val(),//new Date($('#txtEntryDate').val()),
        Gen_memo_RefNo: $('#txtRefNo').val(),
        Gen_memo_Refdate: $('#txtRefDate').val(),//new Date($('#txtRefDate').val()),
        Companyid: $('#ddlFromCompany').val(),
        UnitId: unitid,//$('#ddlfromunit').val(),
        Unit_or_Other: unirother,
        Remarks: $('#txtremarks').val(),
        VehicleNo: $('#txtvehicleno').val(),
        ReturnOrNo: rtn,
        ReturnDate: rtdate,//new Date($('#txtRefDate').val()),
        RequestnerId: $('#ddlRequestner').val(),
        CreatedBy: GUserid,
        Order_no: ordnum,
        ProcessId: $('#ddlProcess').val(),
        Company_unitID: $('#ddlfromunit').val(),
        styleid: $('#ddlStyleNo').val(),
        BuyerId: $('#ddlBuyer').val(),
        validatebomqtyindelivery: 0,

        GenMemDet: Itmdet

    };
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/GeneralMemo/Update",
        data: JSON.stringify(objConSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Value == true) {
                AddUserEntryLog('Procurement', 'General Memo', 'UPDATE', $("#txtEntryNo").val());
            //alert('Data Updated Successfully');
            //window.location.href = "/GeneralMemo/GeneralMemoIndex";
                var msg = 'Data Updated Successfully...';
                var flg = 1;
                var mod = 0;
                var url = "/GeneralMemo/GeneralMemoIndex";
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
function LoadMaingrid() {
    debugger;

    var EnNo = "";
    var ONo = $('select#ddlMEntryNo option:selected').val();

    if (ONo == 0 || ONo==undefined) {
        EnNo == "";
    }
    else {

        EnNo = $('select#ddlMEntryNo option:selected').val();
    }


    var unit = "";
    var un = $('select#ddlMRefNo option:selected').val();

    if (un == 0 || un == undefined) {
        unit == "";
    }
    else {

        unit = $('select#ddlMRefNo option:selected').val();
    }



    if (EnNo == undefined) {
        EnNo = "";
    }
    if (unit == undefined) {
        unit = "";
    }

    var genmasid = 0;
    //var unid = 0;

    var CompId = $('#ddlMCompany').val();
    if (CompId == null) {
        CompId = 0;
    }
    var suppid = $('#ddlMSupplier').val();
    if (suppid == null) {
        suppid = 0;
    }
    var buyerid = $('#ddlMBuyer').val();
    if (buyerid == null) {
        buyerid = 0;
    }
    var procid = $('#ddlMProcess').val();
    if (procid == null || procid == undefined) {
        procid = 0;
    }
    var unitid = $('#ddlMUnit').val();
    if (unitid == null) {
        unitid = 0;
    }

    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    var menufilter = CompId + ',' + EnNo + ',' + unitid + ',' + genmasid + ',' + unit + ',' + buyerid + ',' + FDate + ',' + TDate;
    localStorage.setItem('GeneralMemoMainFilter', menufilter);

    $.ajax({
        url: "/GeneralMemo/GetgenememMainDetails",
        data: JSON.stringify({ cmpid: CompId, entryno: EnNo, unitid: unitid, masid: genmasid, refno: unit, buyerid: buyerid, fromDate: FDate, todate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");
            $('#tblbillmaingrid').DataTable({
                data: dataSet,
                scrollY: 300,
                scrollCollapse: true,
                paging: false,
                fixedColumns: false,
                select: false,
                scrollX: "100%",
                scrollXInner: "100%",
                scroller: false,
                "bSort": false,
                columns: [
                         { title: "GenMasid", "visible": false },
                         { title: "Unit" },
                         { title: "Entry No" },
                         { title: "Entry Date" },
                         { title: "Ref No" },
                         { title: "Ref Date" },                         
                          { title: "Action" },


                ]

            });


            ddlmain();
            $('#ddlMEntryNo').empty();
            $('#ddlMRefNo').empty();
            //$('#ddlMOrderNo').empty();

            $(document).ready(function () {
                var table = $('#tblbillmaingrid').DataTable();

                $('#tblbillmaingrid tbody').on('click', 'tr', function () {
                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');

                    }
                    else {
                        table.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');
                    }
                });


            });
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadMaingridFromBack() {
    debugger;
    var fill = localStorage.getItem('GeneralMemoMainFilter');
    var fillobj = [];
    fillobj = fill.split(",");

    $('#txtFromDate').val(fillobj[6]);
    $('#txtToDate').val(fillobj[7]);

  
    if (fillobj[1] == "undefined") {
        fillobj[1] = '';
    }
    if (fillobj[4] == "undefined") {
        fillobj[4] = '';
    }
    if (fillobj[2] == "undefined") {
        fillobj[2] = 0;
    }
    if (fillobj[3] == "undefined") {
        fillobj[3] = 0;
    }
    if (fillobj[5] == "undefined") {
        fillobj[5] = 0;
    }
     
    $.ajax({
        url: "/GeneralMemo/GetgenememMainDetails",
        data: JSON.stringify({ cmpid: fillobj[0], entryno: fillobj[1], unitid: fillobj[2], masid: fillobj[3], refno: fillobj[4], buyerid: fillobj[5], fromDate: fillobj[6], todate: fillobj[7] }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");
            $('#tblbillmaingrid').DataTable({
                data: dataSet,
                scrollY: 300,
                scrollCollapse: true,
                paging: false,
                fixedColumns: false,
                select: false,
                scrollX: "100%",
                scrollXInner: "100%",
                scroller: false,
                "bSort": false,
                columns: [
                         { title: "GenMasid", "visible": false },
                         { title: "Unit" },
                         { title: "Entry No" },
                         { title: "Entry Date" },
                         { title: "Ref No" },
                         { title: "Ref Date" },
                          { title: "Action" },


                ]

            });


            ddlmain();
            $('#ddlMEntryNo').empty();
            $('#ddlMRefNo').empty();
            //$('#ddlMOrderNo').empty();

            $(document).ready(function () {
                var table = $('#tblbillmaingrid').DataTable();

                $('#tblbillmaingrid tbody').on('click', 'tr', function () {
                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');

                    }
                    else {
                        table.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');
                    }
                });


            });
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}


function ddlmain() {
    debugger;

    var EnNo = "";
    var ONo = $('select#ddlMEntryNo option:selected').val();

    if (ONo == 0 || ONo == undefined) {
        EnNo == "";
    }
    else {

        EnNo = $('select#ddlMEntryNo option:selected').val();
    }


    var unit = "";
    var un = $('select#ddlMRefNo option:selected').val();

    if (un == 0 || un == undefined) {
        unit == "";
    }
    else {

        unit = $('select#ddlMRefNo option:selected').val();
    }



    if (EnNo == undefined) {
        EnNo = "";
    }
    if (unit == undefined) {
        unit = "";
    }

    var genmasid = 0;
    //var unid = 0;

    var CompId = $('#ddlMCompany').val();
    if (CompId == null) {
        CompId = 0;
    }
    var suppid = $('#ddlMSupplier').val();
    if (suppid == null) {
        suppid = 0;
    }
    var buyerid = $('#ddlMBuyer').val();
    if (buyerid == null) {
        buyerid = 0;
    }
    var procid = $('#ddlMProcess').val();
    if (procid == null || procid == undefined) {
        procid = 0;
    }
    var unitid = $('#ddlMUnit').val();
    if (unitid == null) {
        unitid = 0;
    }

    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    $.ajax({
        url: "/GeneralMemo/GetDataMainList",
        data: JSON.stringify({ cmpid: CompId, entryno: EnNo, unitid: unitid, masid: genmasid, refno: unit, buyerid: buyerid, fromDate: FDate, todate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            var obj = json.Value;
            if (json.Status == 'SUCCESS') {


                var data = json.Value;

                $(ddlMEntryNo).append($('<option/>').val('0').text('--Select EntryNo--'));
                $.each(data, function () {
                    $(ddlMEntryNo).append($('<option></option>').text(this.Gen_memo_No));

                });

                $(ddlMRefNo).append($('<option/>').val('0').text('--Select RefNo--'));
                $.each(data, function () {
                    $(ddlMRefNo).append($('<option></option>').text(this.Gen_memo_RefNo));

                });




            }

          

          
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function CMainlist() {
    $('#tblbillmaingrid').DataTable().destroy();
    LoadMaingrid();
}

function getbyID(id) {
    debugger;
    Masid = id;
    Mode = 1;
    LoadOrderNoDDL('#ddlOrderNo');

    var EnNo = "";
    var ONo = $('select#ddlMEntryNo option:selected').val();

    if (ONo == 0 || ONo == undefined) {
        EnNo == "";
    }
    else {

        EnNo = $('select#ddlMEntryNo option:selected').val();
    }


    var unit = "";
    var un = $('select#ddlMRefNo option:selected').val();

    if (un == 0 || un == undefined) {
        unit == "";
    }
    else {

        unit = $('select#ddlMRefNo option:selected').val();
    }



    if (EnNo == undefined) {
        EnNo = "";
    }
    if (unit == undefined) {
        unit = "";
    }

    var genmasid = id;
    //var unid = 0;

    var CompId = $('#ddlMCompany').val();
    if (CompId == null) {
        CompId = 0;
    }
    var suppid = $('#ddlMSupplier').val();
    if (suppid == null) {
        suppid = 0;
    }
    var buyerid = $('#ddlMBuyer').val();
    if (buyerid == null) {
        buyerid = 0;
    }
    var procid = $('#ddlMProcess').val();
    if (procid == null || procid == undefined) {
        procid = 0;
    }
    var unitid = $('#ddlMUnit').val();
    if (unitid == null) {
        unitid = 0;
    }

    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    $.ajax({
        url: "/GeneralMemo/GetDataMainList",
        data: JSON.stringify({ cmpid: CompId, entryno: EnNo, unitid: unitid, masid: genmasid, refno: unit, buyerid: buyerid, fromDate: FDate, todate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            if (DTmode == 1) {
                $('#myModal').hide();
                $('#myModal').modal('hide');
                $('#btnUpdate').hide();
                $('#btnDel').hide();
                $('#btnAdd').hide();
            } else {
                $('#myModal').show();
                $('#myModal').modal('show');
                $('#btnUpdate').show();
                $('#btnDel').hide();
                $('#btnAdd').hide();
            }

         
           
            var obj = json.Value;
            $('#txtEntryNo').val(obj[0].Gen_memo_No);
            $('#txtEntryDate').val(moment(obj[0].Gen_memo_date).format("DD/MM/YYYY"));
            $('#ddlFromCompany').val(obj[0].Companyid);
            $('#txtRefNo').val(obj[0].Gen_memo_RefNo);
            $('#txtRefDate').val(moment(obj[0].Gen_memo_Refdate).format("DD/MM/YYYY"));
            $('#ddlfromunit').val(obj[0].Company_unitID);
            $('#ddlIssueNo').val(obj[0].Gen_memo_Masid);
            $('#ddlOrderNo').val(obj[0].bmasid);
            $('#ddlProcess').val(obj[0].ProcessId);
            $('#txtvehicleno').val(obj[0].VehicleNo);
            $('#ddlStyleNo').val(obj[0].styleid);
            $('#ddlBuyer').val(obj[0].BuyerId);
            $('#ddlRequestner').val(obj[0].RequestnerId);
            $('#txtremarks').val(obj[0].Remarks);

            if (obj[0].Unit_or_Other == "U") {
                $('input:radio[name="MOType"][value="U"]').prop('checked', true);
                $('#buyer').hide();
                $('#supp').hide();
                $("#unit").show();
                $('#ddlCmpanyunit').val(obj[0].UnitId);
            } else if (obj[0].Unit_or_Other == "S") {
                $('input:radio[name="MOType"][value="S"]').prop('checked', true);
                $("#unit").hide();
                $('#buyer').hide();
                $('#supp').show();
                $('#ddlSupplier').val(obj[0].UnitId);
            } else if (obj[0].Unit_or_Other == "W") {
                $('input:radio[name="MOType"][value="W"]').prop('checked', true);
                $("#unit").hide();
                $('#supp').hide();
                $('#buyer').show();
                $('#ddlwrkdiv').val(obj[0].UnitId);
            }

            if (obj[0].ReturnOrNo == 'Y') {
                $('#Return').prop('checked', true);
                $('#txtRtnDate').val(moment(obj[0].ReturnDate).format("DD/MM/YYYY"));
            } else {
                $('#Return').prop('checked', false);
                $('#txtRtnDate').val(moment('').format("DD/MM/YYYY"));
            }

            LoadItmedit(Masid);
           

        }

    });
}

function LoadItmedit(Masid) {
    debugger;

    $.ajax({
        url: "/GeneralMemo/GetEditdet",
        data: JSON.stringify({ masid: Masid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            Itmdet = result.Value;
            LoadItmtab(Itmdet);

        }
    });
}
   

function Delete(id) {
    debugger;
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $("#btnDel").attr("disabled", true);
        LoadingSymb();
        DTmode = 1;
        getbyID(id);
                $.ajax({
                    url: "/GeneralMemo/Delete/" + id,
                    type: "POST",
                    contentType: "application/json;charset=UTF-8",
                    dataType: "json",
                    success: function (result) {
                        if (result.Value == true) {
                            AddUserEntryLog('Procurement', 'General Memo', 'DELETE', $("#txtEntryNo").val());
                            //alert("Data Deleted Sucessfully");
                            //window.location.href = "/GeneralMemo/GeneralMemoIndex";
                            var msg = 'Data Deleted Successfully...';
                            var flg = 2;
                            var mod = 1;
                            var url = "/GeneralMemo/GeneralMemoIndex";
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


function StoreGenMemoPrint(ID) {
    debugger;
    Repid = ID;
    $('#myModal2').modal('show');

    docname = "GENERAL MEMO";
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
    var comp = $('#ddlMCompany').val();
    if (comp != null) {
        window.open("../ReportInline/Stores/StoresGeneralMemoReportInline/StoresGenMemoReportInline.aspx?MasId=" + Repid + "&Itmrem=" + p[0] + "&Gatepass=" + p[1] + "&Amnt=" + p[2] + "&Rate=" + p[3] + "&Companyid=" + comp);
    }
}

function backtomain() {
    $("#myModal2").hide();
    $("#myModal2").modal('hide');
}