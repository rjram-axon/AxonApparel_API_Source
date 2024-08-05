var Mode = 0;
var CompanyId = 0;
var Itmdet = [];
var uomid = 0;
var grpid = 0;
var Transno = "";
var index = -1;
var loaddet = [];
var Userid = 0;
var UserName = 0;
var repobj = [];
var Repid = 0;
var MainFDate = 0;
var Guserid = 0;
var DCompid = 0;
var LoginUserid = '';
var editmasunitstore = 0;
var editsubmasunitstore = 0;
var editsubstore = 0;
var validatestore = "False";
var OPStockEditFlg = "disabled";
var OPStockDeleteFlg = "disabled";
var OPStockPrintFlg = "disabled";
$(document).ready(function () {
    debugger;
    Guserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    MainFDate = $("#hdMainFromDate").data('value');
    DCompid = $("#hdnDCompid").data('value');
    LoginUserid = $("#hdnLoginUserid").data('value');
    validatestore = $("#hdnValidateStore").data('value');
    getDate();
    LoadCompanyDDL("#ddlMCompany,#ddlCompany");
    LoadItemGroupDDL("#ddlItemgroup");
    LoadOrderNoDDL("#ddlOrderno");
    LoadSupplierDDL("#ddlSupplier");
    LoadStyleDDL("#ddlStyle,#ddlMstyle");
    LoadSizeDDL("#ddlSize");
    LoadColorDDL("#ddlColor");
    LoadCompanyUnitDDL("#ddlCompanyunit");
    ddlmain();
    loadmain();

    var fill = localStorage.getItem('OpeningStockMainFilter');
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
    $('#btnitmtadd').click(function () {
        debugger;
        var isAllValid = true;
        var lengdp = 0;

        if ($('#ddlItem').val() == "0") {
            isAllValid = false;
            $('#ddlItem').css('border-color', 'Red');
        }
        else {
            $('#ddlItem').css('border-color', 'lightgrey');
        }

        if ($('#ddlSize').val() == "0") {
            isAllValid = false;
            $('#ddlSize').css('border-color', 'Red');
        }
        else {
            $('#ddlSize').css('border-color', 'lightgrey');
        }

        if ($('#ddlColor').val() == "") {
            isAllValid = false;
            $('#ddlColor').css('border-color', 'Red');
        }
        else {
            $('#ddlColor').css('border-color', 'lightgrey');
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

        if ($('#ddlSupplier').val() == 0) {
            $('#ddlSupplier').siblings(".select2-container").css('border', '1px solid red');
            isAllValid = false;
        }
        else {
            $('#ddlSupplier').siblings(".select2-container").css('border', '1px solid lightgrey');
        }
        //if ($('#txtSecQty').val() == "") {
        //    isAllValid = false;
        //    $('#txtSecQty').siblings('span.error').css('visibility', 'visible');
        //}
        //else {
        //    $('#txtSecQty').siblings('span.error').css('visibility', 'hidden');
        //}

        var ONo = $("#ddlOrderno option:selected").text();
        var Sty = $("#ddlStyle option:selected").val();
        var Itm = $("#ddlItem option:selected").val();
        var Clr = $("#ddlColor option:selected").val();
        var Sz = $("#ddlSize option:selected").val();

        var chkplnitem = ChkPlannedItem(ONo, Sty, Itm, Clr, Sz);

        if (!chkplnitem) {
            var msg = 'Select Planned Item...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            isAllValid = false;
        }

        var chkitemid = $('#ddlItem').val();
        var chkcolorid = $('#ddlColor').val();
        var chksizeid = $('#ddlSize').val();
        var type = $('input[name="optwrkord"]:checked').attr('value');

        for (var g = 0; g < Itmdet.length; g++) {
            if (Itmdet[g].Itemid == chkitemid && Itmdet[g].Colorid == chkcolorid && Itmdet[g].sizeid == chksizeid) {
                //alert('Must be a different Item..');
                var msg = 'Must be a different Item...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                fnClearcDetailsControls();
                return true;
            }
        }

        if (Itmdet.length == 0) {
            lengdp = 1;
        }
        else {
            lengdp = Itmdet.length + 1;
        }

        var NStyId = 0;
        var StyId = $("#ddlStyle").val();

        if (StyId == 0) {
            NStyId = 0;
        } else {
            NStyId = $("#ddlStyle").val();
        }

        if (isAllValid) {
            // alert('true');
            var DetObj = {
                slno: lengdp,
                StockId: 0,
                buymsaid: $("#ddlOrderno option:selected").val(),
                joborderNo: $("#ddlOrderno option:selected").text(),
                Styleid: NStyId,
                style: $("#ddlStyle option:selected").text(),
                supplierid: $("#ddlSupplier option:selected").val(),
                supplier: $("#ddlSupplier option:selected").text(),
                Rate: $("#txtRate").val(),
                Itemid: $("#ddlItem option:selected").val(),
                item: $("#ddlItem option:selected").text(),
                Colorid: $("#ddlColor option:selected").val(),
                color: $("#ddlColor option:selected").text(),
                sizeid: $("#ddlSize option:selected").val(),
                size: $("#ddlSize option:selected").text(),
                uomid: uomid,// $("#txtUnit option:selected").val(),
                unit: $("#txtUnit").val(),
                qty: $("#txtStockQty").val(),
                sQty: $("#txtSecQty").val(),
                ItemCat: type,
                //TransType : 'OPS',
                //    Transno = $('#txtOpeningno').val();
                //    alloted = 0.00;
                //    ItemCat;
                //    CatType = '';
                //    StockType = protype;
                //    //this.processId
                //    balQty = 0.00;
                //    purorprod = 'OP';
                //    transdate = new Date($('#txtDate').val());
                //    companyid = $('#ddlCompany').val();
                //    // this.supplierid = $('#ddlSupplier').val();
                //    //this.uomid
                //    // this.MfrId
                //    // this.Styleid = $('#ddlStyle').val();
                //    unit_or_other = 'P';
                //    ReProg = 'N';
                //    Remarks = $('#txtremarks').val();
                //    this.markup_rate = 0.00;
                //    // this.lotno = $('#txtLotno').val();
                //    //this.sqty
                //    this.FabricGsm = '';
                //    this.StoreUnitID = st;
                //    this.stockdate = new Date($('#txtDate').val());
                //    this.ItemCode = '';
                //    this.BundleNo = '';

            }
            Itmdet.push(DetObj);
            LoadItmtab(Itmdet);
            fnClearcDetailsControls();
        }
      

        LoadOrdGenType();
    });
    $(document).on('click', '.btnitmedit', function () {
        debugger;
        rowindex = $(this).closest('tr').index();

        var cur1 = Itmdet.slice(rowindex);

        $('#ddlItem').val(cur1[0]['Itemid']).trigger('change');
        $('#ddlColor').val(cur1[0]['Colorid']).trigger('change');
        $('#ddlSize').val(cur1[0]['sizeid']).trigger('change');
        $('#txtUnit').val(cur1[0]['unit']);
        $('#txtStockQty').val(cur1[0]['qty']);
        $('#txtSecQty').val(cur1[0]['sQty']);

        $('#ddlOrderno').val(cur1[0]['buymsaid']).trigger('change');
        $('#ddlStyle').val(cur1[0]['Styleid']).trigger('change');


        $('#ddlSupplier').val(cur1[0]['supplierid']).trigger('change');
        $('#txtRate').val(cur1[0]['Rate']);


        $('#btnitmtadd').hide();
        $('#btnitmupdate').show();

        //LoadOrdGenType();
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

        if ($('#ddlSupplier').val() == 0) {
            $('#ddlSupplier').siblings(".select2-container").css('border', '1px solid red');
            isValid = false;
        }
        else {
            $('#ddlSupplier').siblings(".select2-container").css('border', '1px solid lightgrey');
        }

        var ONo = $("#ddlOrderno option:selected").text();
        var Sty = $("#ddlStyle option:selected").val();
        var Itm = $("#ddlItem option:selected").val();
        var Clr = $("#ddlColor option:selected").val();
        var Sz = $("#ddlSize option:selected").val();

        var chkplnitem = ChkPlannedItem(ONo, Sty, Itm, Clr, Sz);

       if (!chkplnitem) {
           var msg = 'Select Planned Item...';
           var flg = 4;
           var mod = 1;
           var url = "";
           AlartMessage(msg, flg, mod, url);
           isValid = false;
       }


        debugger;
        if (isValid) {
            var currentrowsel = Itmdet.slice(rowindex);
            currentrowsel[0]['Itemid'] = $("#ddlItem").val();
            currentrowsel[0]['item'] = $("#ddlItem option:selected").text();
            currentrowsel[0]['Colorid'] = $("#ddlColor").val();
            currentrowsel[0]['color'] = $("#ddlColor option:selected").text();
            currentrowsel[0]['sizeid'] = $("#ddlSize").val();
            currentrowsel[0]['size'] = $("#ddlSize option:selected").text();
            currentrowsel[0]['unit'] = $("#txtUnit").val();
            currentrowsel[0]['qty'] = $("#txtStockQty").val();
            currentrowsel[0]['sQty'] = $("#txtSecQty").val();

            currentrowsel[0]['buymsaid'] = $("#ddlOrderno").val();
            currentrowsel[0]['joborderNo'] = $("#ddlOrderno option:selected").text();
            currentrowsel[0]['Styleid'] = $("#ddlStyle").val();
            currentrowsel[0]['style'] = $("#ddlStyle option:selected").text();
            currentrowsel[0]['supplierid'] = $("#ddlSupplier").val();
            currentrowsel[0]['supplier'] = $("#ddlSupplier option:selected").text();
            currentrowsel[0]['Rate'] = $("#txtRate").val();
            currentrowsel[0]['uomid'] = uomid;

            var type = $('input[name="optwrkord"]:checked').attr('value');

            if (type != "G") {

                if (currentrowsel[0]['buymsaid'] == 0) {
                    //alert("Select OrderNo..");
                    var msg = 'Select OrderNo...';
                    var flg = 4;
                    var mod = 1;
                    var url = "";
                    AlartMessage(msg, flg, mod, url);
                    return true;
                }

                if (currentrowsel[0]['Styleid'] == 0) {
                    //alert("Select Style..");
                    var msg = 'Select Style...';
                    var flg = 4;
                    var mod = 1;
                    var url = "";
                    AlartMessage(msg, flg, mod, url);
                    return true;
                }
            }

            Itmdet[rowindex] = currentrowsel[0];

            LoadItmtab(Itmdet);




            $('#btnitmupdate').hide();
            $('#btnitmtadd').show();
            fnClearcDetailsControls();
            LoadOrdGenType();
        }
    });
    $(document).on('click', '.btnitmremove', function () {
        rowindex = $(this).closest('tr').index();

        Itmdet.splice(rowindex, 1);
        document.getElementById("tblitmgrid").deleteRow(rowindex + 1);
    });
    $(document).on('click', '.btngetbyid', function () {
        debugger;
        rowindex = $(this).closest('tr').index();
        var currentrow = loaddet.slice(rowindex);
        Transno = currentrow[0].Transno;

        grpid = currentrow[0].itemgrpid;
        getbyID(Transno, grpid);

    });
    $(document).on('click', '.btndel', function () {
        debugger;
        rowindex = $(this).closest('tr').index();
        var currentrow = loaddet.slice(rowindex);
        Transno = currentrow[0].Transno;
        Delete(Transno);
    });

    $(document).on('click', '.OpenstkPrint', function () {
        debugger;
        rowindex = $(this).closest('tr').index();
        var currentrow = loaddet.slice(rowindex);
        Transno = currentrow[0].Transno;
        OpenPrint(Transno);
    });


    $('#tblitmmaingrid').on('click', 'tr', function (e) {
        debugger;

        var table = $('#tblitmmaingrid').DataTable();

        var row = $(this).closest('tr');
        var data = $('#tblitmmaingrid').dataTable().fnGetData(row);
        var ProcessOrdNo = data.Transno;
        LoadItemMovements(ProcessOrdNo);
    });


});

function fnClearcDetailsControls() {
    $('#ddlItem').val('0').trigger('change');
    $('#ddlSize').val('0').trigger('change');
    $('#ddlColor').val('0').trigger('change');
    $('#txtUnit').val('');
    $('#txtStockQty').val('');
    $('#txtSecQty').val('');
    $('#ddlOrderno').val('0').trigger('change');
    $('#ddlStyle').val('0').trigger('change');
    $('#ddlSupplier').val('0').trigger('change');
    $('#txtRate').val('');
}

function LoadItmtab(list) {

    $('#tblitmgrid').DataTable().destroy();

    $('#tblitmgrid').DataTable({
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
                   { title: "S.No", data: "slno", "visible": false },
                   { title: "Stkid", data: "StockId", "visible": false },
                   { title: "Order No", data: "joborderNo" },
                   { title: "Styleid", data: "Styleid", "visible": false },
                   { title: "Style", data: "style" },
                   { title: "Supplierid", data: "supplierid", "visible": false },
                   { title: "Supplier", data: "supplier" },
                   { title: "Rate", data: "Rate" },
                   { title: "ItemId", data: "Itemid", "visible": false },
                   { title: "Item", data: "item" },
                   { title: "Sizeid", data: "sizeid", "visible": false },
                   { title: "Size", data: "size" },
                   { title: "Colorid", data: "Colorid", "visible": false },
                   { title: "color", data: "color" },
                   //{ title: "Unitid", data: "UnitId" },
                   { title: "Unit", data: "unit" },
                   { title: "Stock Qty", data: "qty" },
                   { title: "Sec Qty", data: "sQty" },

               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnitmedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnitmremove btn btn-danger btn-round"> <i class="fa fa-times"></i> </button> </div>'

               }
        ]

    });
}

function Backtomain() {
    $('#myModal').hide();
    $('#myModal').modal('hide');
}

//function getDate() {

//    var todaydate = new Date();
//    var day = todaydate.getDate();
//    var Pmonth = todaydate.getMonth() - 2;
//    var Cmonth = todaydate.getMonth() + 2;
//    var year = todaydate.getFullYear();
//    var datestring = Pmonth + "/" + day + "/" + year;
//    var Fdatestring = day + "/" + Cmonth + "/" + year;

//    var day = new Date(),
//        year = ((day.getMonth() - 2) < 0) ? (day.getFullYear() - 1) : day.getFullYear(),
//        month = ((day.getMonth() - 2) < 0) ? (12 + (day.getMonth() - 2)) : (day.getMonth() + 1),
//        date = month + '/' + day.getDate() + '/' + year;
//    // $('#txtFromDate').val(date);
//    $('#txtFromDate').val(MainFDate);
//    $('#txtToDate').val(Fdatestring);
//    $('#txtDate').val(Fdatestring);

//}

function getDate() {
    debugger;
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
    $('#txtDate').val(Fdatestring);
   
}



function ClearTextbox() {
    Mode = 0;
    //$('#ddlCompany').val("0");
    $('#ddlItemgroup').val("0");
    $('#txtOpeningno').val("");
    $('#txtSubBillNo').val("");
    // $('#txtBillDate').val("");
    // $('#txtDate').val("");
    $('#ddlCurrency').val("0");
    $('#txtExRate').val("");
    $('#txtAmount').val("");
    $('#txtremarks').val("");
    $('#ddlDepartment').val("0");

    $('#btnupd').hide();
    $('#btndel').hide();
    $('#btnadd').show();
    getDateentry();

    CompanyId = $('#ddlCompany').val();

    editmasunitstore = 0;
    editsubmasunitstore = 0;
    editsubstore = 0;
    LoadEmployeeStoreunit();
    LoadUserCompanyDDL();

    GenerateNumber();
    var type = $('input[name="MSType"]:checked').attr('value');
    if (type == 'M') {
        LoadMainStore();
    }
    if (type == 'S') {
        LoadSubStore();
    }
    if (type == 'E') {
        LoadSecStore();
    }
    // $('#tblitmgrid').DataTable().destroy();
    Itmdet = [];
    LoadItmtab(Itmdet);
}

function getDateentry() {

    var todaydate = new Date();
    var day = todaydate.getDate();
    var Pmonth = todaydate.getMonth() - 2;
    var Cmonth = todaydate.getMonth() + 1;
    var year = todaydate.getFullYear();
    var datestring = day + "/" + Pmonth + "/" + year;
    var Fdatestring = day + "/" + Cmonth + "/" + year;

    var day = new Date(),
        year = ((day.getMonth() - 2) < 0) ? (day.getFullYear() - 1) : day.getFullYear(),
        month = ((day.getMonth() - 2) < 0) ? (12 + (day.getMonth() - 2)) : (day.getMonth() + 1),
        date = month + '/' + day.getDate() + '/' + year;
    // $('#txtFromDate').val(date);


    $('#txtDate').val(Fdatestring);
}

function chkcmpnyid() {
    debugger;
    if (Mode == 0) {
        CompanyId = $('select#ddlCompany option:selected').val();
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
            CompanyId = $('#ddlCompany').val();
            editmasunitstore = 0;
            editsubmasunitstore = 0;
            editsubstore = 0;
            LoadEmployeeStoreunit();
            LoadUserCompanyDDL();

            GenerateNumber();
        }
    }

}

function LoadOrdGenType() {
    var type = $('input[name="optwrkord"]:checked').attr('value');

    if (type == "G") {
        $('#ddlOrderno').val("").trigger('change');
        $('#ddlStyle').val("").trigger('change');
        $("#ddlOrderno").attr("disabled", true);
        $("#ddlStyle").attr("disabled", true);
    } else {
        //    LoadOrderNoDDL("#ddlOrderno");       
        //    LoadStyleDDL("#ddlStyle,#ddlMstyle");
        //} else if (type == "J") {
        //    LoadJobNoDDL("#ddlOrderno");
        //    LoadStyleDDL("#ddlStyle,#ddlMstyle");
        //}
        $("#ddlOrderno").attr("disabled", false);
        $("#ddlStyle").attr("disabled", false);
        Loadorderno(type);
        LoadStyleDDL("#ddlStyle,#ddlMstyle");
    }

}


function Loadorderno(type) {

    $.ajax({
        url: "/OpeningStock/GetOrdno",
        data: JSON.stringify({ ordtype: type }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            var obj = result.Value;
            //if (obj.length > 0) {
            //    ("#ddlOrderno").empty();
            //}
            if (result.Status == 'SUCCESS') {

                if (type == "J") {

                    var data = result.Value;
                    $(ddlOrderno).empty();
                    $(ddlOrderno).append($('<option/>').val('0').text('--Select OrderNo--'));
                    $.each(data, function () {
                        //$(ddlOrderno).append($('<option></option>').text(this.workord));
                        $(ddlOrderno).append($('<option></option>').val(this.buymsaid).text(this.workord));
                    });
                } else if(type == "B") {
                    var data = result.Value;
                    $(ddlOrderno).empty();
                    $(ddlOrderno).append($('<option/>').val('0').text('--Select OrderNo--'));
                    $.each(data, function () {
                        //$(ddlOrderno).append($('<option></option>').text(this.orderno));
                        $(ddlOrderno).append($('<option></option>').val(this.buymsaid).text(this.orderno));
                    });
                } else if (type == "S") {
                    var data = result.Value;
                    $(ddlOrderno).empty();
                    $(ddlOrderno).append($('<option/>').val('0').text('--Select OrderNo--'));
                    $.each(data, function () {
                        //$(ddlOrderno).append($('<option></option>').text(this.orderno));
                        $(ddlOrderno).append($('<option></option>').val(this.buymsaid).text(this.orderno));
                    });
                }
            }
        }

    });
}


function GenerateNumber() {
    debugger;
    table = "Op_Stock",
    column = "Op_Stock_No",
    compId = $('select#ddlCompany option:selected').val(),
    Docum = 'OPENING STOCK'

    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $('#txtOpeningno').val(result.Value);
        }
    });
}

function LoadSecStore() {
    $("#SubStoreId").hide();
    $("#SecStoId").show();
    $("#MainStoreId").hide();
    //LoadCompanyUnitDDL("#ddlPUnit");
    //LoadStoreUnitDDL("#ddlSecStore");
    //LoadWorkdivisionDDL("#ddlWK");
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

function RadioSMClick() {
    $("#SubStoreMainId").show();
    $("#SubStorPrdId").hide();
}
function RadioSSPClick() {


    $("#SubStoreMainId").hide();
    $("#SubStorPrdId").show();
    //LoadStoreUnitDDL("#ddlSStoreSub");
    //LoadCompanyUnitDDL("#ddlSStorePunit");

}

function loaditem() {
    debugger;
    var itmgrp = $('select#ddlItemgroup option:selected').val();
    var cat = 'P';
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

function Add() {
    debugger;
    var listof = [];
    var protype = $('input[name="optwrkord"]:checked').attr('value');
    var type = $('input[name="optwrkord"]:checked').attr('value');
    //var st = '';
    //var main = $('input[name="MSType"]:checked').attr('value');
    //if (main == 'M') {
    //    st = $('#ddlMSMMainStore').val();
    //}
    //if (main == 'S') {
    //    var sms = $('input[name="SMSType"]:checked').attr('value');
    //    if (sms == 'SM') {
    //        st = $('#ddlSMainStore').val();
    //    }
    //    if (sms == 'SP') {
    //        st = $('#ddlSStoreSub').val();
    //    }
    //}
    //if (main == 'E') {
    //    st = $('#ddlSecStore').val();
    //}

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
    debugger;
    var oldOpeningNo = $('#txtOpeningno').val();

    table = "Op_Stock",
    column = "Op_Stock_No",
    compId = $('select#ddlCompany option:selected').val(),
    Docum = 'OPENING STOCK'

    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var newOpeningNo = result.Value;
            if (oldOpeningNo != newOpeningNo) {
                //alert('Opening No has been changed...');
                var msg = 'Opening Numer has been changed...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                $('#txtOpeningno').val(result.Value);
            }

            $.each(Itmdet, function () {
                // this.qty;
                // this.Rate = $('#txtRate').val();
                // this.joborderNo = $('select#ddlOrderno option:selected').text();
                this.TransType = 'OPS',
                this.Transno = $('#txtOpeningno').val();
                this.alloted = 0.00;
                this.ItemCat = protype;
                this.CatType = '';
                this.StockType = 'S';
                this.UnitId = $('#ddlCompanyunit').val();
                //this.processId
                this.balQty = 0.00;
                this.purorprod = 'OP';
                this.transdate = $('#txtDate').val();//new Date($('#txtDate').val());
                this.companyid = $('#ddlCompany').val();
                // this.supplierid = $('#ddlSupplier').val();
                //this.uomid
                // this.MfrId
                // this.Styleid = $('#ddlStyle').val();
                this.unit_or_other = 'P';
                this.ReProg = 'N';
                this.Remarks = $('#txtremarks').val();
                this.markup_rate = 0.00;
                // this.lotno = $('#txtLotno').val();
                //this.sqty
                this.FabricGsm = '';
                this.StoreUnitID = storeunitid;
                this.stockdate = $('#txtDate').val();//new Date($('#txtDate').val());
                this.ItemCode = '';
                this.BundleNo = '';
            });


            var oplist = [];
            for (var d = 0; d < Itmdet.length; d++) {
                var opobj = {
                    //OpStkId:
                    Companyid: $('#ddlCompany').val(),
                    CompanyunitId: $('#ddlCompanyunit').val(),
                    //Stockid:
                    Op_Stock_No: $('#txtOpeningno').val(),
                    Remarks: $('#txtremarks').val(),
                    StoreUnitID: storeunitid,
                    CreBy: Guserid
                }
                oplist.push(opobj);
            }

            var obj = {
                // StockId:
                // UnitId: Itmdet[f].UnitId,
                // Itemid: Itmdet[f].Itemid,
                // Colorid: Itmdet[f].Colorid,
                // sizeid: Itmdet[f].sizeid,
                // qty: Itmdet[f].qty,
                // Rate: Itmdet[f].Rate,
                // joborderNo: Itmdet[f].joborderNo,
                // TransType: Itmdet[f].TransType,
                Transno: $('#txtOpeningno').val(),
                //alloted: Itmdet[f].alloted,
                //ItemCat: Itmdet[f].ItemCat,
                //sQty: Itmdet[f].sQty,
                //lotNo: Itmdet[f].lotNo,
                //balQty: Itmdet[f].balQty,
                //purorprod: Itmdet[f].purorprod,
                transdate: $('#txtDate').val(),//new Date($('#txtDate').val()),
                companyid: $('#ddlCompany').val(),
                CompanyunitId: $('#ddlCompanyunit').val(),
                CreBy: Guserid,
                // supplierid: Itmdet[f].supplierid,
                //uomid: Itmdet[f].uomid,
                //Styleid: Itmdet[f].Styleid,
                //unit_or_other: Itmdet[f].unit_or_other,
                //ReProg: Itmdet[f].ReProg,
                //StockType: Itmdet[f].StockType,
                StoreUnitID: storeunitid,
                StockDate: $('#txtDate').val(),//new Date($('#txtDate').val()),
                ItemStk: Itmdet,
                OpStk: oplist
            }


            $("#btnadd").attr("disabled", true);
            LoadingSymb();

            $.ajax({
                url: "/OpeningStock/Add",
                data: JSON.stringify(obj),
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {
                    debugger;
                    if (result.Value == true) {
                        AddUserEntryLog('Procurement', 'Opening Stock', 'ADD', $("#txtOpeningno").val());
                        //alert('Data Saved Successfully...');
                        //window.location.href = "/OpeningStock/OpeningStockIndex";
                        var msg = 'Data Saved Successfully...';
                        var flg = 1;
                        var mod = 0;
                        var url = "/OpeningStock/OpeningStockIndex";
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


function getbyID(Transno, grpid) {
    debugger;


    $.ajax({
        url: "/OpeningStock/GetEditGrid",
        data: JSON.stringify({ transno: Transno }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            det = result.Value;
            Itmdet = det;
            LoadItemDDL('#ddlItem');
            $('#myModal').show();
            $('#myModal').modal('show');
            var dis = 0;
            for (var i = 0; i < Itmdet.length; i++) {
                if (Itmdet[i].alloted > 0) {
                    dis = 1;
                }
            }
            $('#btnupd').show();
            $('#btndel').hide();
            $('#btnadd').hide(); 
            if (dis == 1) {
                $('#btnupd').attr("disabled", true);
                var msg = 'Stock has been alloted...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);

            }

            $('#ddlCompany').val(det[0].companyid);
            $('#txtOpeningno').val(det[0].Transno);
            $('#ddlItemgroup').val(det[0].itemgrpid);
            $('#txtDate').val(moment(det[0]["transdate"]).format('DD/MM/YYYY'));
            $('#ddlMSCompany').val(det[0].companyid);
            $('#ddlCompanyunit').val(det[0].UnitId);
           // $('#ddlMSMMainStore').val(det[0].StoreUnitID);
            $('#txtremarks').val(det[0].Remarks);

            //var type = $('input[name="MSType"]:checked').attr('value');
            //if (type == 'M') {
            //    LoadMainStore();
            //}
            //if (type == 'S') {
            //    LoadSubStore();
            //}
            //if (type == 'E') {
            //    LoadSecStore();
            //}
            CompanyId = det[0].companyid;

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
            LoadEmployeeStoreunit();
            LoadUserCompanyDDL();

            if (det[0].Type == "B") {
                $('input:radio[name="optwrkord"][value="B"]').prop('checked', true);
            } else if (det[0].Type == "J") {
                $('input:radio[name="optwrkord"][value="J"]').prop('checked', true);
            } else if (det[0].Type == "S") {
                $('input:radio[name="optwrkord"][value="S"]').prop('checked', true);
            } else if (det[0].Type == "G") {
                $('input:radio[name="optwrkord"][value="G"]').prop('checked', true);
            } else if (det[0].Type == "SP") {
                $('input:radio[name="optwrkord"][value="P"]').prop('checked', true);
            }

            $("#ddlItemgroup").attr("disabled", true);

            $("#optoutbulkord").attr("disabled", true);
            $("#optoutsamplord").attr("disabled", true);
            $("#optoutjobord").attr("disabled", true);
            $("#optoutwrkord").attr("disabled", true);
            $("#optoeutsamord").attr("disabled", true);

            LoadOrdGenType();

            loaditem();

            LoadItmtab(det);
        }
    });
}


function Delete(Transno) {
    debugger;
    //$('#myModal').show();
    //$('#myModal').modal('show');
    $('#btnUpdate').hide();
    $('#btnDel').show();
    $('#btnAdd').hide();
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        //$.ajax({
        //    url: "/OpeningStock/getbyID/" + Transno,
        //    typr: "GET",
        //    contentType: "application/json;charset=UTF-8",
        //    dataType: "json",
        //    success: function (result) {
        //        debugger;
        //        var obj = result.Value;
        //        $('#txtOpeningno').val(obj.Transno);
        //        $('#txtOpeningno').val(det[0].Transno);
        $("#btndel").attr("disabled", true);
        LoadingSymb();
                $.ajax({
                    url: "/OpeningStock/Delete",
                    data: JSON.stringify({ Transno: Transno }),
                    type: "POST",
                    contentType: "application/json;charset=UTF-8",
                    dataType: "json",
                    success: function (result) {

                        if (result.Value == true) {

                            //alert("Data Deleted Sucessfully...");
                            //window.location.href = "/OpeningStock/OpeningStockIndex";
                            var msg = 'Data Deleted Successfully...';
                            var flg = 2;
                            var mod = 0;
                            var url = "/OpeningStock/OpeningStockIndex";
                            AlartMessage(msg, flg, mod, url);
                        } else {

                            window.location.href = "/Error/Index";

                        }


                    },
                    error: function (errormessage) {
                        //alert("Data Deleted Failed...");
                        var msg = 'Data Deleted Failed...';
                        var flg = 4;
                        var mod = 1;
                        var url = "";
                        AlartMessage(msg, flg, mod, url);
                    }
                });
        //    }
        //});
    }
}

function Update() {
    debugger;
    var listof = [];
    var protype = $('input[name="optwrkord"]:checked').attr('value');
    //var st = '';
    //var main = $('input[name="MSType"]:checked').attr('value');
    //if (main == 'M') {
    //    st = $('#ddlMSMMainStore').val();
    //}
    //if (main == 'S') {
    //    var sms = $('input[name="SMSType"]:checked').attr('value');
    //    if (sms == 'SM') {
    //        st = $('#ddlSMainStore').val();
    //    }
    //    if (sms == 'SP') {
    //        st = $('#ddlSStoreSub').val();
    //    }
    //}
    //if (main == 'E') {
    //    st = $('#ddlSecStore').val();
    //}

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


    //$.each(Itmdet, function () {


    //    this.Transno = $('#txtOpeningno').val();
    //    //this.alloted = 0.00;         
    //    this.StockType = protype;        

    //    this.transdate = new Date($('#txtDate').val());
    //    this.companyid = $('#ddlCompany').val();       
    //   // this.unit_or_other = 'P';
    //   // this.ReProg = 'N';
    //    this.Remarks = $('#txtremarks').val();
    //   // this.markup_rate = 0.00;       

    //   // this.StoreUnitID = st;
    //    this.stockdate = new Date($('#txtDate').val());



    //});


    var oplist = [];
    for (var d = 0; d < Itmdet.length; d++) {
        var opobj = {
            //OpStkId:
            Companyid: $('#ddlCompany').val(),
            CompanyunitId: $('#ddlCompanyunit').val(),
            Stockid: Itmdet[d].StockId,
            Op_Stock_No: $('#txtOpeningno').val(),
            Remarks: $('#txtremarks').val(),
            StoreUnitID: storeunitid,
            CreatedBy: Guserid
        }
        oplist.push(opobj);
    }

    var Updobj = {
        // StockId:
        // UnitId: Itmdet[f].UnitId,
        // Itemid: Itmdet[f].Itemid,
        // Colorid: Itmdet[f].Colorid,
        // sizeid: Itmdet[f].sizeid,
        // qty: Itmdet[f].qty,
        // Rate: Itmdet[f].Rate,
        // joborderNo: Itmdet[f].joborderNo,
        // TransType: Itmdet[f].TransType,
        Transno: $('#txtOpeningno').val(),
        //alloted: Itmdet[f].alloted,
        //ItemCat: Itmdet[f].ItemCat,
        //sQty: Itmdet[f].sQty,
        //lotNo: Itmdet[f].lotNo,
        //balQty: Itmdet[f].balQty,
        //purorprod: Itmdet[f].purorprod,
        transdate: $('#txtDate').val(),//new Date($('#txtDate').val()),
        companyid: $('#ddlCompany').val(),
        CompanyunitId: $('#ddlCompanyunit').val(),
        // supplierid: Itmdet[f].supplierid,
        //uomid: Itmdet[f].uomid,
        //Styleid: Itmdet[f].Styleid,
        //unit_or_other: Itmdet[f].unit_or_other,
        //ReProg: Itmdet[f].ReProg,
        //StockType: Itmdet[f].StockType,
        StoreUnitID: storeunitid,
        StockDate: $('#txtDate').val(),//new Date($('#txtDate').val()),
        Remarks: $('#txtremarks').val(),
        CreBy: Guserid,
        ItemStk: Itmdet,
        OpStk: oplist
    }

    $("#btnupd").attr("disabled", true);
    LoadingSymb();

    $.ajax({
        url: "/OpeningStock/Update",
        data: JSON.stringify(Updobj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Value == true) {
                AddUserEntryLog('Procurement', 'Opening Stock', 'UPDATE', $("#txtOpeningno").val());
                //alert('Data Updated Successfully');
                //window.location.href = "/OpeningStock/OpeningStockIndex";
                var msg = 'Data Updated Successfully...';
                var flg = 1;
                var mod = 0;
                var url = "/OpeningStock/OpeningStockIndex";
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

    var transno = "";
    var ONo = $('select#ddlMOpenstockno option:selected').val();

    if (ONo == 0) {
        transno == "";
    }
    else {

        transno = $('select#ddlMOpenstockno option:selected').val();
    }

    var Ordno = "";
    var RNo = $('select#ddlMOrderno option:selected').val();

    if (RNo == 0) {
        Ordno == "";
    }
    else {

        Ordno = $('select#ddlMOrderno option:selected').val();
    }


    var RefNo = "";
    var RNo = $('select#ddlMrefNo option:selected').val();

    if (RNo == 0) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlMrefNo option:selected').val();
    }

    var stk = 0;

    if (Ordno == null || Ordno == 0 || Ordno == undefined) {
        Ordno = "";
    }
    if (transno == null || transno == 0 || transno == undefined) {
        transno = "";
    }
    if (RefNo == null || RefNo == 0 || RefNo == undefined) {
        RefNo = "";
    }
    //var CompId = $('#ddlMCompany').val();
    var ordtype = $('#ddlMOrderType').val();
    if (ordtype == 'O') {
        ordtype = "";
    }
    var styleid = $('#ddlMstyle').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    //if (CompId == null || CompId == 0 || CompId == undefined) {
    //    CompId = 0;
    //}


    var CompId = $('#ddlMCompany').val();

    if (CompId == null) {
        CompId = DCompid;
    } else {
        CompId = $('#ddlMCompany').val();
    }

    if (styleid == null || styleid == 0 || styleid == undefined) {
        styleid = 0;
    }

    var menufilter = ordtype + ',' + stk + ',' + transno + ',' + CompId + ',' + Ordno + ',' + RefNo + ',' + styleid + ',' + FDate + ',' + TDate ;
    localStorage.setItem('OpeningStockMainFilter', menufilter);


    $.ajax({
        url: "/OpeningStock/GetOPLoad",
        data: JSON.stringify({ ordertype: ordtype, stkid: stk, transno: transno, companyid: CompId, orderno: Ordno, refno: RefNo, styleid: styleid, fromDate: FDate, todate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            var tableload = json.Value;
            loaddet = tableload;
            //var dataSet = eval("[" + tableload + "]");
            //$('#tblmaingrid').DataTable({
            //    data: dataSet,
            //    columns: [
            //              //  {title:"Sno"},
            //             { title: "CompanyId", "visible": false },
            //             { title: "Company" },
            //             { title: "OpenStock No" },
            //             { title: "Date" },
            //              { title: "Itemgroupid", "visible": false },
            //             { title: "ItemGroup" },
            //             { title: "OrderType" },

            //              { title: "Action" },


            //    ]

            //});
            if (loaddet.length > 0) {

                for (var t = 0; t < loaddet.length; t++) {
                    loaddet[t].transdate = moment(loaddet[t]["transdate"]).format('DD/MM/YYYY')
                }
                LoadMaintab(loaddet);
            }
            else {
                LoadMaintab(loaddet);
            }
         

            $(document).ready(function () {
                var table = $('#tblmaingrid').DataTable();

                $('#tblmaingrid tbody').on('click', 'tr', function () {   
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
    var fill = localStorage.getItem('OpeningStockMainFilter');
    var fillobj = [];
    fillobj = fill.split(",");

    $('#txtFromDate').val(fillobj[7]);
    $('#txtToDate').val(fillobj[8]);

    if (fillobj[2] == "undefined") {
        fillobj[2] = '';
    }
    if (fillobj[4] == "undefined") {
        fillobj[4] = '';
    }
    if (fillobj[5] == "undefined") {
        fillobj[5] = '';
    }
    if (fillobj[1] == "undefined") {
        fillobj[1] = 0;
    }
    if (fillobj[6] == "undefined") {
        fillobj[6] = 0;
    }


    $.ajax({
        url: "/OpeningStock/GetOPLoad",
        data: JSON.stringify({ ordertype: fillobj[0], stkid: fillobj[1], transno: fillobj[2], companyid: fillobj[3], orderno: fillobj[4], refno: fillobj[5], styleid: fillobj[6], fromDate: fillobj[7], todate: fillobj[8] }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            var tableload = json.Value;
            loaddet = tableload;
          
            if (loaddet.length > 0) {

                for (var t = 0; t < loaddet.length; t++) {
                    loaddet[t].transdate = moment(loaddet[t]["transdate"]).format('DD/MM/YYYY')
                }
                LoadMaintab(loaddet);
            }
            else {
                LoadMaintab(loaddet);
            }


            $(document).ready(function () {
                var table = $('#tblmaingrid').DataTable();

                $('#tblmaingrid tbody').on('click', 'tr', function () {
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

function LoadMaintab(list) {
    debugger;
    $('#tblitmmaingrid').DataTable().destroy();

    $('#tblitmmaingrid').DataTable({
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
                   { title: "CompanyId", data: "companyid", "visible": false },
                   { title: "Company", data: "company" },
                   { title: "OpenStock No", data: "Transno" },
                   { title: "Date", data: "transdate" },
                   { title: "Itemgroupid", data: "itemgrpid", "visible": false },
                   { title: "ItemGroup", data: "itmgrp" },
                   { title: "Order Type", data: "Type" },


               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<div style="display:inline-flex"><button type="button" class="btngetbyid btn-warning btn ' + OPStockEditFlg + '  btn-round" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;"><i class="fa fa-pencil-square-o"></i></button> <button type="button" ' + OPStockDeleteFlg + ' class="btndel btn-danger btn  btn-round" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;"><i class="fa fa-minus"></i></button> </a><a id=\" {0} \"  button type=\"button\" ' + OPStockPrintFlg + '  class=\"OpenstkPrint btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button></a>    </div>'

               }
        ]

    });
}

function loadmain() {
    debugger;
    var transno = "";
    var ONo = $('select#ddlMOpenstockno option:selected').val();

    if (ONo == 0) {
        transno == "";
    }
    else {

        transno = $('select#ddlMOpenstockno option:selected').val();
    }

    var Ordno = "";
    var RNo = $('select#ddlMOrderno option:selected').val();

    if (RNo == 0) {
        Ordno == "";
    }
    else {

        Ordno = $('select#ddlMOrderno option:selected').val();
    }


    var RefNo = "";
    var RNo = $('select#ddlMrefNo option:selected').val();

    if (RNo == 0) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlMrefNo option:selected').val();
    }

    var stk = 0;

    if (Ordno == null || Ordno == 0 || Ordno == undefined) {
        Ordno = "";
    }
    if (transno == null || transno == 0 || transno == undefined) {
        transno = "";
    }
    if (RefNo == null || RefNo == 0 || RefNo == undefined) {
        RefNo = "";
    }
    //var CompId = $('#ddlMCompany').val();
    var ordtype = $('#ddlMOrderType').val();
    if (ordtype == 'O') {
        ordtype = "";
    }
    var styleid = $('#ddlMstyle').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    //if (CompId == null || CompId == 0 || CompId == undefined) {
    //    CompId = 0;
    //}

    var CompId = $('#ddlMCompany').val();

    if (CompId == null) {
        CompId = DCompid;
    } else {
        CompId = $('#ddlMCompany').val();
    }

    if (styleid == null || styleid == 0 || styleid == undefined) {
        styleid = 0;
    }
    $.ajax({
        url: "/OpeningStock/GetOPLoad",
        data: JSON.stringify({ ordertype: ordtype, stkid: stk, transno: transno, companyid: CompId, orderno: Ordno, refno: RefNo, styleid: styleid, fromDate: FDate, todate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            //loaddet = json.Value;

            var obj = json.Value;

            if (json.Status == 'SUCCESS') {
                var data = json.Value;

                var compdet = {};
                var comp = [];
                var procdet = {};
                var proc = [];

                $.each(obj, function (i, el) {

                    if (!compdet[el.company]) {
                        compdet[el.company] = true;
                        comp.push(el);
                    }
                    if (!procdet[el.Transno]) {
                        procdet[el.Transno] = true;
                        proc.push(el);
                    }
                });

                $(ddlMOpenstockno).append($('<option/>').val('0').text('--Select OpenStockNo--'));
                $.each(proc, function () {
                    $(ddlMOpenstockno).append($('<option></option>').text(this.Transno));
                });

                //$(ddlMCompany).append($('<option/>').val('0').text('--Select Company--'));
                //$.each(comp, function () {
                //    $(ddlMCompany).append($('<option></option>').text(this.company));

                //});
            }
        }
    });
}

function ddlmain() {
    debugger;
    var transno = "";
    var ONo = $('select#ddlMOpenstockno option:selected').val();

    if (ONo == 0) {
        transno == "";
    }
    else {

        transno = $('select#ddlMOpenstockno option:selected').val();
    }

    var Ordno = "";
    var RNo = $('select#ddlMOrderno option:selected').val();

    if (RNo == 0) {
        Ordno == "";
    }
    else {

        Ordno = $('select#ddlMOrderno option:selected').val();
    }


    var RefNo = "";
    var RNo = $('select#ddlMrefNo option:selected').val();

    if (RNo == 0) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlMrefNo option:selected').val();
    }

    var stk = 0;

    if (Ordno == null || Ordno == 0 || Ordno == undefined) {
        Ordno = "";
    }
    if (transno == null || transno == 0 || transno == undefined) {
        transno = "";
    }
    if (RefNo == null || RefNo == 0 || RefNo == undefined) {
        RefNo = "";
    }
    //var CompId = $('#ddlMCompany').val();
    var ordtype = $('#ddlMOrderType').val();
    if (ordtype == 'O') {
        ordtype = "";
    }
    var styleid = $('#ddlMstyle').val();
    //var FDate = new Date($('#txtFromDate').val());
    //var TDate = new Date($('#txtToDate').val());

    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    //if (CompId == null || CompId == 0 || CompId == undefined) {
    //    CompId = 0;
    //}

    var CompId = $('#ddlMCompany').val();

    if (CompId == null) {
        CompId = DCompid;
    } else {
        CompId = $('#ddlMCompany').val();
    }

    if (styleid == null || styleid == 0 || styleid == undefined) {
        styleid = 0;
    }
    $.ajax({
        url: "/OpeningStock/GetOPMainddldet",
        data: JSON.stringify({ ordertype: ordtype, stkid: stk, transno: transno, companyid: CompId, orderno: Ordno, refno: RefNo, styleid: styleid, fromDate: FDate, todate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            var obj = json.Value;
            if (json.Status == 'SUCCESS') {


                var data = json.Value;


                var orddet = {};
                var ord = [];

                var refdet = {};
                var ref = [];


                $.each(obj, function (i, el) {

                    if (!orddet[el.orderno]) {
                        orddet[el.orderno] = true;
                        ord.push(el);
                    }
                    if (!refdet[el.refno]) {
                        refdet[el.refno] = true;
                        ref.push(el);
                    }
                  
                });

                $(ddlMOrderno).empty();
                $(ddlMrefNo).empty();




                $(ddlMOrderno).append($('<option/>').val('0').text('--Select OrderNo--'));
                $.each(ord, function () {
                    $(ddlMOrderno).append($('<option></option>').text(this.orderno));
                });

                //$(ddlMOpenstockno).append($('<option/>').val('0').text('--Select OpenStockNo--'));
                //$.each(data, function () {
                //    $(ddlMOpenstockno).append($('<option></option>').text(this.Transno));
                //});

                $(ddlMrefNo).append($('<option/>').val('0').text('--Select RefNo--'));
                $.each(ref, function () {
                    $(ddlMrefNo).append($('<option></option>').text(this.refno));
                });

                //$(ddlMstyle).append($('<option/>').val('0').text('--Select Style--'));
                //$.each(data, function () {
                //    $(ddlMstyle).append($('<option></option>').text(this.refno));
                //});

                //LoadStyleDDL('#ddlMstyle');
            }

        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}

function List() {
    $('#tblmaingrid').DataTable().destroy();
    LoadMaingrid();
    //ddlmain();
    loaddet = [];
}




function OpenPrint(Id) {
    debugger;
    //
    Repid = Id;
    $('#myModal2').modal('show');

    docname = "OPENING STOCK";
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
    var compid = $('#ddlMCompany').val();


    window.open("../ReportInline/Stores/OpeningStock/OpeningStockInlineReport.aspx?Masid=" + Repid + "&Itmrem=" + p[0] + "&Manufact=" + p[1] + "&Companyid=" + compid);
}

function Backtomain() {
    //$("#myModal2").hide();
    //$("#myModal2").modal('hide');

    window.location.href = "/OpeningStock/OpeningStockIndex";
}

function LoadFOrdDropDetails() {


    var BMasId = $('#ddlOrderno').val();
    var JbId = 0;
    var StyId = 0;
    var RefNo = "";
    //var RNo = $('select#ddlFRefNo option:selected').val();

    //if (RNo == 0) {
    //    RefNo == "";
    //}
    //else {

    //    RefNo = $('select#ddlFRefNo option:selected').val();
    //}

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

                var protype = $('input[name="optwrkord"]:checked').attr('value');

                if (protype != 'G') {
                    $(ddlStyle).empty();
                    $(ddlStyle).append($('<option/>').val('0').text('--Select Style--'));
                    $.each(data, function () {
                        $(ddlStyle).append($('<option></option>').val(this.Styleid).text(this.Style));
                    });
                }
            }


        }

    });

}

function LoadEmployeeStoreunit() {
    debugger;
    if (UserName == 'superuser') {
        LoginUserid = 0;
    }

    $.ajax({
        url: "/StoreSetup/GetStoreRights",
        data: JSON.stringify({ Userid: LoginUserid, Storetype: 'M', Companyid: CompanyId }),
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
        data: JSON.stringify({ Userid: LoginUserid, Storetype: 'B', Companyid: CompanyId }),
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

function LoadItemMovements(GrnNo) {
    debugger;

    $.ajax({
        url: "/GRNMain/LoadItemstockMovement/",
        data: JSON.stringify({ GrnNo: GrnNo }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            ItemMovementList = (result.Value);

            loadItemMovementTable(ItemMovementList);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function loadItemMovementTable(ItemMovementList) {
    debugger;
    // $('#tblcompdetails').DataTable().destroy();
    var inputcount = 0;
    $('#tblItemMovementdetails tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tblItemMovementdetails').DataTable().destroy();
    }
    $('#tblItemMovementdetails').empty();

    $('#tblItemMovementdetails').DataTable({

        data: ItemMovementList,
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
             //{ title: "Trims SlNo", data: "TrimsSlNo", "visible": false },
            { title: "Trans No", data: "transno" },
            { title: "Item", data: "Item" },
            { title: "Color", data: "Color" },
            { title: "Size", data: "Size" },
            { title: "Order No", data: "OrderNo", visible: false },
            { title: "Quantity", data: "Quantity" },
            { title: "Stock Qty", data: "StockQty" },
            { title: "UOM", data: "Uom" },
            { title: "Issue No", data: "IssueNo" },
            { title: "Date", data: "IssueDate" },
            { title: "IssueQty", data: "IssueQty" },
            { title: "Store Name", data: "StoreName" },
               //{
               //    title: "ACTION", "mDataProp": null,

               //    "render": function (data, type, row, meta) {
               //        if (data.Rate > "0") {
               //            return '<div style="display:inline-flex"><button type="button" disabled="disabled" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" id="btntrimsedit" class="btntrimsedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" disabled="disabled" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btntrimsremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div>'
               //        } else { return '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" id="btntrimsedit" class="btntrimsedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btntrimsremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div>' }
               //    }


               //}
        ]
    });


    $("#tblItemMovementdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblItemMovementdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}

function ChkPlannedItem(Orderno, Styleid, Itemid, Colorid, Sizeid) {
    var chk = true;
    if (Orderno != '') {
        $.ajax({
            url: "/OpeningStock/ChkPlanned/",
            data: JSON.stringify({ OrderNo: Orderno, Styleid: Styleid, Itemid: Itemid, Colorid: Colorid, Sizeid: Sizeid }),
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            async:false ,
            success: function (result) {
                var obj = result.Value[0].ChkPlanned;
                if (obj > 0) {
                    chk = true;
                } else {
                    chk = false;
                }
            },
            //error: function (errormessage) {
            //    alert(errormessage.responseText);
            //}
        });
    }

    return chk;

}