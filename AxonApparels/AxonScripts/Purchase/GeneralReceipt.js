var Itmdet = [];
var CompanyId = 0;
var index = -1;
var Masid = 0;
var MainFDate = 0;
var Userid = 0;
var UserName = 0;
var Guserid = 0;
var DTmode = 0;
$(document).ready(function () {
    debugger;

    Guserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    MainFDate = $("#hdMainFromDate").data('value');
    LoadCompanyDDL("#ddlFromCompany,#ddlMCompany");
    LoadSupplierDDL("#ddlSupplier,#ddlMSupplier");
    LoadCompanyUnitDDL("#ddlCmpanyunit,#ddlfromunit");
    LoadBuyerDDL("#ddlBuyer,#ddlMBuyer");
    LoadColorDDL("#ddlcolor");
    LoadSizeDDL("#ddlSize");
    LoadItemDDL("#ddlItem");
    LoadWorkdivisionDDL("#ddlwrkdiv");
    getDate();
    LoadIssueno();
    
    LoadMaingrid();
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
        if (Itmdet.length == 0) {
            lengdp = 1;
        }
        else {
            lengdp = Itmdet.length + 1;
        }

        var Cld = 0;

        if ($('#closed').is(":checked")) {
            Cld = 1;
        }
        else {
            Cld = 0;
        }
        if (isAllValid) {

            var DetObj = {
                Slno: lengdp,
                Gen_MemoRet_Detid: 0,

                Itemid: $("#ddlItem option:selected").val(),
                item: $("#ddlItem option:selected").text(),
                Colorid: $("#ddlcolor option:selected").val(),
                color: $("#ddlcolor option:selected").text(),
                Sizeid: $("#ddlSize option:selected").val(),
                size: $("#ddlSize option:selected").text(),
                Uomid: uomid,
                uom: $("#txtUom").val(),
                issuqty: $("#txtIssueQty").val(),
                Quantity: $("#txtRetQuantity").val(),
                Closed: Cld

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
        $('#txtIssueQty').val(cur1[0]['issuqty']);
        $('#txtRetQuantity').val(cur1[0]['Quantity']);
        $('#txtUom').val(cur1[0]['uom']);


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
        currentrowsel[0]['issuqty'] = $("#txtIssueQty").val();
        currentrowsel[0]['Quantity'] = $("#txtRetQuantity").val();
        currentrowsel[0]['uom'] = $("#txtUom").val();



        Itmdet[rowindex] = currentrowsel[0];

        LoadItmtab(Itmdet);


        fnClearcDetailsControls();
    });
    $(document).on('click', '.btnitmremove', function () {
        rowindex = $(this).closest('tr').index();

        Itmdet.splice(rowindex, 1);
        document.getElementById("itmdetails").deleteRow(rowindex + 1);


    });
    $(document).on('keyup', '.calcitmqty', function () {
        debugger;
        var table = $('#itmdetails').DataTable();
        var detid = table.row($(this).parents('tr')).data()["Gen_memo_Detid"];
        var issqty = table.row($(this).parents('tr')).data()["issuqty"];

        var val = $(this).val();
       
        if (val > issqty) {
            //alert('Should not exceed issueqty...');
            var msg = 'Should not exceed issue quantity...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            $.each(Itmdet, function () {
                if (this.Gen_memo_Detid == detid) {
                    this.Quantity = 0;

                }
            });
            LoadItmtab(Itmdet);
        }
        else {
            $.each(Itmdet, function () {
                if (this.Gen_memo_Detid == detid) {
                    this.Quantity = val;

                }
            });
            LoadItmtab(Itmdet);
        }

        var rows = $("#itmdetails").dataTable().fnGetNodes();
        var dtTable = $('#itmdetails').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
            $('input[id=txtitmqty]').each(function () {
                if (sn == detid && $(this).val() == val) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtitmqty').val();
                    row.find('#txtitmqty').focus().val('').val(num);
                    return true;
                }
            });
        }
    });
});

function fnClearcDetailsControls() {
    $('#ddlItem').val('0');
    $('#ddlcolor').val('0');
    $('#ddlSize').val('0');
    $('#txtUom').val('');
    $('#txtIssueQty').val('');
    $('#txtRetQuantity').val('');
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

    table = "Gen_MemoRet_mas",
    column = "GenMemo_RetNo",
    compId = CompanyId,
    Docum = 'GENERAL RETURN [MEMO]'

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
function LoadIssueno() {
    debugger;
    $.ajax({
        url: "/GeneralReceipt/GetIssueNo",
        data: JSON.stringify({ }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            var obj = result.Value;
            if (result.Status == "SUCCESS") {
                var data = result.Value;
                $(ddlIssueNo).empty();
                $(ddlIssueNo).append($('<option/>').val('0').text('--Select IssueNo--'));
                $.each(data, function () {
                    $(ddlIssueNo).append($('<option></option>').val(this.Gen_memo_Masid).text(this.gen_memo_no));
                });
            }
        }

    });
}

function GetItemdet() {
    debugger;
    var mid = $('select#ddlIssueNo option:selected').val();
    if(mid==0){
        //alert('Please select IssueNo...');
        var msg = 'Please select Issue Number...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }
    debugger;
    $.ajax({
        url: "/GeneralReceipt/LoadItm",
        data: JSON.stringify({ masid: mid }),
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
function ClearTextbox() {
    debugger;
    $('#txtEntryNo').val("");
    $('#txtEntryDate').val("");
    $('#ddlFromCompany').val("0");
    $('#txtRefNo').val("");
    $('#txtRefDate').val("");
    $('#ddlIssueNo').val("0");
   
   
    $('#ddlCmpanyunit').val("0");
    $('#ddlSupplier').val("0");
    $('#ddlwrkdiv').val("0");
    $('#txtvehicleno').val("");
    $('#ddlStyleNo').val("0");
    $('#ddlBuyer').val("0");
    $('#ddlfromunit').val("0");
    
    $('#txtremarks').val("");
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
}

function backtomain() {
    $('#myModal').hide();
    $('#myModal').modal('hide');
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
                  
                   { title: "Detid", data: "Gen_memo_Detid", "visible": false },
                   { title: "ItemId", data: "Itemid", "visible": false },
                   { title: "Item", data: "item" },
                   { title: "ColorId", data: "Colorid", "visible": false },
                   { title: "Color", data: "color" },
                   { title: "SizeId", data: "Sizeid", "visible": false },
                   { title: "Size", data: "size" },
                   { title: "Uom", data: "uom" },
                    { title: "Iss.Qty", data: "issuqty" },
                   {
                       title: "Ret.Qty", data: "Quantity",
                       render: function (data) {

                           return '<input type="text" id="txtitmqty" class="calcitmqty form-control"  style="width: 55px;text-align: center;" value=' + data + ' >';
                       }
                   },
                    {
                        title: "Closed", data: "Closed",
                        render: function (data) {
                            return '<input type="checkbox" id="closed"   style="border-color: lightgrey;margin-top: 0px;">';
                        }
                    },

               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnitmremove btn btn-danger btn-round"> <i class="fa fa-times"></i> </button>   </div>'

               }
        ]

    });
}



$(document).ready(function () {
    $("#itmdetails ").dataTable().find("tbody").on('click', 'tr', function () {
        index = (this.rowIndex) - 1;
    });
});

function validate() {
    var isValid = true;
    if ($('#ddlFromCompany').val().trim() == 0) {
        $('#ddlFromCompany').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlFromCompany').css('border-color', 'lightgrey');
    }

    if ($('#ddlfromunit').val().trim() == 0) {
        $('#ddlfromunit').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlfromunit').css('border-color', 'lightgrey');
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
    var type = $('input[name="Type"]:checked').attr('value');
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

    debugger;
    table = "Gen_MemoRet_mas",
    column = "GenMemo_RetNo",
    compId = CompanyId,
    Docum = 'GENERAL RETURN [MEMO]'

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


                //Gen_MemoRet_MasId: $('#txtHCompanyId').val(),
                GenMemo_RetNo: $('#txtEntryNo').val(),
                GenMemoRet_RefNo: $('#txtRefNo').val(),
                GenMemoRetDate: $('#txtEntryDate').val(),//new Date($('#txtEntryDate').val()),
                Gen_memo_Masid: $('#ddlIssueNo').val(),
                CompanyId: $('#ddlFromCompany').val(),
                UnitId: unitid,//$('#ddlfromunit').val(),
                Unit_or_Other: unirother,
                Remarks: $('#txtremarks').val(),
                VehicleNo: $('#txtvehicleno').val(),
                GenmemoRet_Refdate: $('#txtRefDate').val(),//new Date($('#txtRefDate').val()),
                MemoType: type,// new Date($('#txtRefDate').val()),      
                CreatedBy: Guserid,
                Company_unitID: $('#ddlfromunit').val(),
                buyerid: $('#ddlBuyer').val(),

                GenMemDet: Itmdet

            };
            $("#btnAdd").attr("disabled", true);
            LoadingSymb();
            $.ajax({
                url: "/GeneralReceipt/Add",
                data: JSON.stringify(objConSubmit),
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {
                    debugger;
                    if (result.Value == true) {
                        AddUserEntryLog('Procurement', 'General Receipt', 'ADD', $("#txtEntryNo").val());
                        //alert('Data Saved Successfully');
                        //window.location.href = "/GeneralReceipt/GeneralReceiptIndex";
                        var msg = 'Data Saved Successfully...';
                        var flg = 1;
                        var mod = 0;
                        var url = "/GeneralReceipt/GeneralReceiptIndex";
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

function LoadMaingrid() {
    debugger;

    var EnNo = "";
    var ONo = $('select#ddlMEntryNo option:selected').val();

    if (ONo == 0) {
        EnNo == "";
    }
    else {

        EnNo = $('select#ddlMEntryNo option:selected').val();
    }
    


    if (EnNo == undefined) {
        EnNo = "";
    }
  

    var genmasid = 0;
    var unid = 0;

    var CompId = $('#ddlMCompany').val();
   // var suppid = $('#ddlMSupplier').val();
    //var buyerid = $('#ddlMBuyer').val();
    //var procid = $('#ddlMProcess').val();
    //var unit = $('#ddlMUnit').val();

    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    $.ajax({
        url: "/GeneralReceipt/LoadMaingrid",
        data: JSON.stringify({ entryno: EnNo, masid: genmasid, cmpid: CompId, unitid: unid, fromDate: FDate, todate: TDate }),
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
                         { title: "Type" },
                          { title: "Action" },


                ]

            });


            ddlmain();
            $('#ddlMEntryNo').empty();
           // $('#ddlMRefNo').empty();
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
            CheckRights("GeneralReturn");
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

    if (ONo == 0) {
        EnNo == "";
    }
    else {

        EnNo = $('select#ddlMEntryNo option:selected').val();
    }



    if (EnNo == undefined) {
        EnNo = "";
    }


    var genmasid = 0;
    var unid = 0;

    var CompId = $('#ddlMCompany').val();
    // var suppid = $('#ddlMSupplier').val();
    //var buyerid = $('#ddlMBuyer').val();
    //var procid = $('#ddlMProcess').val();
    //var unit = $('#ddlMUnit').val();

    var FDate = new Date($('#txtFromDate').val());
    var TDate = new Date($('#txtToDate').val());
    $.ajax({
        url: "/GeneralReceipt/GetDataMainList",
        data: JSON.stringify({ entryno: EnNo, masid: genmasid, cmpid: CompId, unitid: unid, fromDate: FDate, todate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            if (json.Status == 'SUCCESS') {


                var data = json.Value;

                $(ddlMEntryNo).append($('<option/>').val('0').text('--Select EntryNo--'));
                $.each(data, function () {
                    $(ddlMEntryNo).append($('<option></option>').text(this.GenMemo_RetNo));

                });




            }

        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function getbyID(id) {
    debugger;
    Masid = id;
   

    $.ajax({
        url: "/GeneralReceipt/LoadHeaderdet",
        data: JSON.stringify({ masid: Masid }),
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
            $('#txtEntryNo').val(obj[0].GenMemo_RetNo);
            $('#txtEntryDate').val(moment(obj[0].GenMemoRetDate).format("DD/MM/YYYY"));
            $('#ddlFromCompany').val(obj[0].CompanyId);
            $('#txtRefNo').val(obj[0].GenMemoRet_RefNo);
            $('#txtRefDate').val(moment(obj[0].GenmemoRet_Refdate).format("DD/MM/YYYY"));
            $('#ddlfromunit').val(obj[0].Company_unitID);
            $('#txtvehicleno').val(obj[0].VehicleNo);           
            $('#ddlBuyer').val(obj[0].buyerid);
            $('#txtremarks').val(obj[0].Remarks);
            $('#ddlIssueNo').val(obj[0].Gen_memo_Masid);

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

            if (obj[0].MemoType == "Receipt") {
                $('input:radio[name="Type"][value="Receipt"]').prop('checked', true);
               
            } else if (obj[0].MemoType == "Return") {
                $('input:radio[name="Type"][value="Return"]').prop('checked', true);
                
            } else if (obj[0].MemoType == "Open Receipt") {
                $('input:radio[name="Type"][value="Open Receipt"]').prop('checked', true);
                
            }




            LoadItmedit(Masid);
        }
    });
}

function LoadItmedit(Masid) {
   
    debugger;
    $.ajax({
        url: "/GeneralReceipt/LoadItmeditdet",
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

function Update() {
    debugger;
   
    var res = validate();
    if (res == false) {
        return true;
    }

    var protype = $('input[name="MOType"]:checked').attr('value');
    var type = $('input[name="Type"]:checked').attr('value');
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


    $.each(Itmdet, function () {

        this.Gen_memo_Masid = Masid;


    });

    var objConSubmit = {


        Gen_MemoRet_MasId: Masid,//$('#txtHCompanyId').val(),
        GenMemo_RetNo: $('#txtEntryNo').val(),
        GenMemoRet_RefNo: $('#txtRefNo').val(),
        GenMemoRetDate: $('#txtEntryDate').val(),//new Date($('#txtEntryDate').val()),
        Gen_memo_Masid: $('#ddlIssueNo').val(),
        CompanyId: $('#ddlFromCompany').val(),
        UnitId: unitid,//$('#ddlfromunit').val(),
        Unit_or_Other: unirother,
        Remarks: $('#txtremarks').val(),
        VehicleNo: $('#txtvehicleno').val(),
        GenmemoRet_Refdate: $('#txtRefDate').val(),// new Date($('#txtRefDate').val()),
        MemoType: type,// new Date($('#txtRefDate').val()),      
        CreatedBy: Guserid,
        Company_unitID: $('#ddlfromunit').val(),
        buyerid: $('#ddlBuyer').val(),

        GenMemDet: Itmdet

    };
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/GeneralReceipt/Update",
        data: JSON.stringify(objConSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Value == true) {
                AddUserEntryLog('Procurement', 'General Receipt', 'UPDATE', $("#txtEntryNo").val());
            //alert('Data Updated Successfully');
            //window.location.href = "/GeneralReceipt/GeneralReceiptIndex";
                var msg = 'Data Updated Successfully...';
                var flg = 1;
                var mod = 0;
                var url = "/GeneralReceipt/GeneralReceiptIndex";
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

function Delete(id) {
    debugger;
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $("#btnDel").attr("disabled", true);
        LoadingSymb();
        DTmode = 1;
        getbyID(id);
        $.ajax({
            url: "/GeneralReceipt/Delete/" + id,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                if (result.Value == true) {
                    AddUserEntryLog('Procurement', 'General Receipt', 'DELETE', $("#txtEntryNo").val());
                    //alert("Data Deleted Sucessfully");
                    //window.location.href = "/GeneralReceipt/GeneralReceiptIndex";
                    var msg = 'Data Deleted Sucessfully...';
                    var flg = 2;
                    var mod = 0;
                    var url = "/GeneralReceipt/GeneralReceiptIndex";
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

function CMainlist() {
    $('#tblbillmaingrid').DataTable().destroy();
    LoadMaingrid();
}

function StoresGenMemoRetPrint(ID) {
    debugger;
    var compid = $('#ddlMCompany').val();

    window.open("../ReportInline/Stores/StoresGenMemoReturnReportInline/StoresGenMemoRetReportInline.aspx?MasId=" + ID + "&Companyid=" + compid);
    return true;
}