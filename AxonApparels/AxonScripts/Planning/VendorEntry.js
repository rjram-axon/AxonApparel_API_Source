
var VenEntList = [];
var VenEntListN = [];
var VenDetList = [];
var QMasId = 0;
var Userid = 0;
var UserName = 0;
var Guserid = 0;
var MOrd = 0;
$(document).ready(function () {
    debugger;
    Guserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    var qrStr = window.location.search;
    var spQrStr = qrStr.substring(1);
    var arrQrStr = new Array();
    var arr = spQrStr.split('?');
    $("#txtQuoteNo").prop("disabled", true);
    for (var i = 0; i < arr.length; i++) {
        var queryvalue = arr[i].split('=');

    }
    var QMasId = queryvalue[1];

    if (QMasId > 0) {
        $('#btnUpdate').show();
        $('#btnAdd').hide();
        $('#txtQMasId').val(QMasId);

    } else {
        $('#btnAdd').show();
        $('#btnUpdate').hide();
    }
    if (QMasId > 0) {
        EditItemDetails(QMasId);

    }
    
    var Ordtype = $('input[name="optionsRadios"]:checked').attr('value');
    if (Ordtype == "G") {
        $('#tblQuoteEntry').show();
    } else {
        $('#tblQuoteEntry').hide();
    }
    LoadItemDDL("#ddlItem");
    LoadUomDDL("#ddlUom");
    LoadColorDDL("#ddlColor");
    LoadSizeDDL("#ddlSize");
    //LoadPlanDetails(StyleRowId);
    //LoadPlanAdd(StyleRowId);
    if (QMasId == 0) {

        
        LoadCompanyDDL("#ddlCompany");
        LoadSupplierDDL("#ddlSupplier");
        LoadCurrencyDDL("#ddlCurrency");
        LoadItemGroupDDL("#ddlGroup");
        var radioValue = $("input[name='optionsRadios']:checked").val();

        if (radioValue == "G") {

            //$("#optBuy").attr('disabled', true);
            $("#optAuto").attr('disabled', true);
            $("#ddlOrdNo").prop("disabled", true); 
            $("#ddlBuyer").prop("disabled", true);
            $("#txtQty").prop("disabled", true);
            $("#txtRefNo").prop("disabled", true);
            $('#ddlOrdNo').val("");
            $('#ddlBuyer').val("");
            $('#txtQty').val("");
            $('#txtRefNo').val("");
            $("#ddlOrderNo").prop("disabled", true);
            //$('#radio_button1').attr('disabled', true);
            // $("#optBuy").attr('disabled', false);
        }


        LoadItemGroup();
        getDate();
        GenerateNumber();
    }
    $(document).on('keyup', '#txtGRate', function () {
        debugger;
        var table = $('#tblQuoteDet').DataTable();

        //var pid = table.row($(this).parents('tr')).data()["sno"];
        var itmid = table.row($(this).parents('tr')).data()["Itemid"];
        var colorid = table.row($(this).parents('tr')).data()["Colorid"];
        var sizeid = table.row($(this).parents('tr')).data()["Sizeid"];
        //var balq = table.row($(this).parents('tr')).data()["allow"];
        //var jordno = table.row($(this).parents('tr')).data()["jobordno"];
        var value = $(this).val();

        $.each(VenDetList, function () {
            if (this.Itemid == itmid && this.Colorid == colorid && this.Sizeid == sizeid) {
                this.Rate = value;
            }
        });
    });
    $(document).on('keyup', '#txtGMinQty', function () {
        debugger;
        var table = $('#tblQuoteDet').DataTable();

        //var pid = table.row($(this).parents('tr')).data()["sno"];
        var itmid = table.row($(this).parents('tr')).data()["Itemid"];
        var colorid = table.row($(this).parents('tr')).data()["Colorid"];
        var sizeid = table.row($(this).parents('tr')).data()["Sizeid"];
        //var balq = table.row($(this).parents('tr')).data()["allow"];
        //var jordno = table.row($(this).parents('tr')).data()["jobordno"];
        var value = $(this).val();

        $.each(VenDetList, function () {
            if (this.Itemid == itmid && this.Colorid == colorid && this.Sizeid == sizeid) {
                this.MinQty = value;
            }
        });
    });
    $(document).on('keyup', '#txtGMaxQty', function () {
        debugger;
        var table = $('#tblQuoteDet').DataTable();

        //var pid = table.row($(this).parents('tr')).data()["sno"];
        var itmid = table.row($(this).parents('tr')).data()["Itemid"];
        var colorid = table.row($(this).parents('tr')).data()["Colorid"];
        var sizeid = table.row($(this).parents('tr')).data()["Sizeid"];
        //var balq = table.row($(this).parents('tr')).data()["allow"];
        //var jordno = table.row($(this).parents('tr')).data()["jobordno"];
        var value = $(this).val();

        $.each(VenDetList, function () {
            if (this.Itemid == itmid && this.Colorid == colorid && this.Sizeid == sizeid) {
                this.MaxQty = value;
            }
        });
    });
});
function myOrder(Val) {
    debugger;
    var foo = [];
    MOrd = 0;
    $('#ddlOrdNo :selected').each(function (i, selected) {
        foo[i] = $(selected).val();

        MOrd = MOrd + "," + foo[i];


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
    $('#txtEntryDate').val(Fdatestring);
    $('#txtDate').val(Fdatestring);
    $('#txtActDate').val(Fdatestring);
}
var table, column, compId, Docum;

function GenerateNumber(table, column, compId, Docum) {

    debugger;
    table = "VendorQuoteMas",
    column = "EntryNo",
    compId = $('#ddlCompany').val(),
    Docum = 'VENDOR QUOTE'

    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $('#txtQuoteNo').val(result.Value);
        }
    });
}

function LoadItemGroup() {

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
    //console.log(str);
    FItem(dd);
    //alert(dd);
}
function FItem(dd) {
    //alert(dd);
    var msg = dd;
    var flg = 4;
    var mode = 1;
    var url = "" ;
    AlartMessage(msg, flg, mode, url);

    $.ajax({
        url: "/Item/GetFID",
        data: JSON.stringify({ FIG: dd }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            // $('#tPAbody').DataTable().destroy();

            // $("#sbTwo").val('0');
            // window.location.href = "/ProcessSeq/ProcessSeqIndex";

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function RadioBClick() {


    $("#optAuto").attr('disabled', false);
    $("#optMan").attr('disabled', false);
    $("#ddlOrdNo").prop("disabled", true);
    $("#ddlBuyer").prop("disabled", true);
    $("#txtQty").prop("disabled", true);
    $("#txtRefNo").prop("disabled", true);
    $('#ddlOrdNo').val("");
    $('#ddlBuyer').val("");
    $('#txtQty').val("");
    $('#txtRefNo').val("");
    $("#ddlOrderNo").prop("disabled", false);
    var radioValue = $("input[name='optionsRadios']:checked").val();
    $("#optMan").attr('disabled', false);
    $("#ddlOrdNo").prop("disabled", false);
    $("#ddlBuyer").prop("disabled", false);
    $("#txtQty").prop("disabled", false);
    $("#txtRefNo").prop("disabled", false);
    $("#ddlOrderNo").prop("disabled", true);
    $('#tblQuoteEntry').hide();
    VenEntList = [];
    VenDetList = [];
    //LoadOrdNoDDL("#ddlOrdNo");
    //var radioValue = $("input[name='optionsRadios']:checked").val();

    //if (radioValue == "B") {
    //    LoadOrdNoDDL("#ddlOrderNo");
    //}
    //var radioValue = $("input[name='optionsRadios1']:checked").val();

    //if (radioValue == "A") {
    LoadOrdNoDDL("#ddlOrdNo");
    $('#ddlOrderNo').val("");
    if (radioValue == "B") {
        LoadOrdNoDDL("#ddlOrderNo");
    }
}
function RadioGClick() {


    $('#ddlOrdNo').val("");
    $("#optAuto").attr('disabled', true);
    $("#ddlOrdNo").prop("disabled", true);
    $("#ddlBuyer").prop("disabled", true);
    $("#txtQty").prop("disabled", true);
    $("#txtRefNo").prop("disabled", true);
    $('#ddlBuyer').val("");
    $('#txtQty').val("");
    $('#txtRefNo').val("");
    $('#ddlOrderNo').val("");
    $('#tblQuoteEntry').show();
    MOrd = 0;
    LoadGrid();
    VenEntList = [];
    VenDetList = [];

}

function RadioAClick() {


    $("#optMan").attr('disabled', false);
    $("#ddlOrdNo").prop("disabled", false);
    $("#ddlBuyer").prop("disabled", false);
    $("#txtQty").prop("disabled", false);
    $("#txtRefNo").prop("disabled", false);
    $("#ddlOrderNo").prop("disabled", true);
    //LoadOrdNoDDL("#ddlOrdNo");
    //var radioValue = $("input[name='optionsRadios']:checked").val();

    //if (radioValue == "B") {
    //    LoadOrdNoDDL("#ddlOrderNo");
    //}
    //var radioValue = $("input[name='optionsRadios1']:checked").val();

    //if (radioValue == "A") {
    LoadOrdNoDDL("#ddlOrdNo");
    $('#ddlOrderNo').val("");
    //}
}
function RadioMClick() {


    $("#optMan").attr('disabled', false);
    $("#ddlOrdNo").prop("disabled", true);
    $("#ddlBuyer").prop("disabled", true);
    $("#txtQty").prop("disabled", true);
    $("#txtRefNo").prop("disabled", true);
    $('#ddlOrdNo').val("");
    $('#ddlBuyer').val("");
    $('#txtQty').val("");
    $('#txtRefNo').val("");
    $("#ddlOrderNo").prop("disabled", false);
    var radioValue = $("input[name='optionsRadios']:checked").val();
    if (radioValue == "B") {

        $('#ddlOrderNo').val("");
        $("#ddlOrderNo").prop("disabled", false);
        LoadOrdNoDDL("#ddlOrderNo");
    }
}
function LoadOrdNoDDL(OrdNoDDL) {
    ordNoDDL = OrdNoDDL;
    httpGet("/BulkOrder/GetOrderNo", onOrdNoSuccess, onOrdNoFailure);
}

function onOrdNoSuccess(result) {
    if (result.Status == "SUCCESS") {
        var data = result.Value;

        $(ordNoDDL).empty();
        $(ordNoDDL).append($('<option/>').val('0').text('--Select OrdNo--'));
        $.each(data, function () {
            //$(ordNoDDL).append($('<option></option>').text(this.Order_No));
            $(ordNoDDL).append($('<option></option>').val(this.Buy_Ord_MasId).text(this.Order_No));
        });
    }
    else {
        //alert('OrderNo loading failed');
        var msg = 'Order Number loading failed...';
        var flg = 4;
        var mode = 1;
        var url = "" ;
        AlartMessage(msg, flg, mode, url);
    }
}

function onOrdNoFailure(result) {
    //alert('OrderNo loading failed');
    var msg = 'Order Number loading failed...';
    var flg = 4;
    var mode = 1;
    var url = "" ;
    AlartMessage(msg, flg, mode, url);
}




$(document).ready(function () {

    //component details
    $('#btnVadd').click(function () {
        debugger;



        var isAllValid = true;


        debugger;
        if ($('#ddlItem').val() == "0") {
            isAllValid = false;
            $('#ddlItem').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#ddlItem').siblings('span.error').css('visibility', 'hidden');
        }

        if ($('#ddlColor').val() == "0") {
            isAllValid = false;
            $('#ddlColor').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#ddlColor').siblings('span.error').css('visibility', 'hidden');
        }
        if ($('#ddlSize').val() == "0") {
            isAllValid = false;
            $('#ddlSize').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#ddlSize').siblings('span.error').css('visibility', 'hidden');
        }
        if ($('#ddlUom').val() == "0") {
            isAllValid = false;
            $('#ddlUom').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#ddlUom').siblings('span.error').css('visibility', 'hidden');
        }
        if ($('#txtRate').val() == "") {
            isAllValid = false;
            $('#txtRate').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#txtRate').siblings('span.error').css('visibility', 'hidden');
        }
        if ($('#txtMinQty').val() == "") {
            isAllValid = false;
            $('#txtMinQty').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#txtMinQty').siblings('span.error').css('visibility', 'hidden');
        }
        if ($('#txtAppRate').val() == "") {
            isAllValid = false;
            $('#txtAppRate').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#txtAppRate').siblings('span.error').css('visibility', 'hidden');
        }
        if ($('#txtMaxQty').val() == "") {
            isAllValid = false;
            $('#txtMaxQty').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#txtMaxQty').siblings('span.error').css('visibility', 'hidden');
        }


        if (isAllValid) {


            debugger;
            var VenListObj = {
                QuoteDetid: 0,
                Quoteid: 0,
                Item: $("#ddlItem option:selected").text(),
                Itemid: $('#ddlItem').val(),
                Color: $("#ddlColor option:selected").text(),
                Colorid: $('#ddlColor').val(),
                Size: $("#ddlSize option:selected").text(),
                Sizeid: $('#ddlSize').val(),
                Uom: $("#ddlUom option:selected").text(),
                Uomid: $('#ddlUom').val(),
                // Quantity: $('#txtGQty').val(),
                Rate: $('#txtRate').val(),
                MinQty: $('#txtMinQty').val(),
                // Apprate: $('#txtAppRate').val(),
                MaxQty: $('#txtMaxQty').val(),
                // AppDate: new Date($('#txtAppRate').val()),
            
                Buy_ord_no: '',
                StyleId:0,
                Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
            };

            //VenEntList.push(VenListObj);
            VenDetList.push(VenListObj);
            loadVenDetTable(VenListObj);

            fnClearVenDetControls();
        }
    });

    //$(document).on('click', '.btncompedit', function () {
    //    debugger;
    //    Mode = 1;

    //    rowindex = $(this).closest('tr').index();

    //    var currentro12 = compList.slice(rowindex);

    //    $('#ddlComponent').val(currentro12[0]['ComponentID']);
    //    $('#ddlFabric').val(currentro12[0]['FabricID']);
    //    $('#ddlGroup').val(currentro12[0]['GroupingID']);
    //    $('#ddlType').val(currentro12[0]['Fabric_TypeID']);
    //    $('#txtDesc').val(currentro12[0]['Description']);
    //    $('#txtParts').val(currentro12[0]['No_Of_Parts']);
    //    $('#txtGsm').val(currentro12[0]['No_Of_Parts']);


    //    $('#btncomponentadd').hide();
    //    $('#btncomponentupdate').show();
    //});

    //$('#btncomponentupdate').click(function () {
    //    debugger;
    //    var currentrowsel = compList.slice(rowindex);

    //    currentrowsel[0]['ComponentID'] = $("#ddlComponent").val();
    //    currentrowsel[0]['ComponentName'] = $("#ddlComponent option:selected").text();
    //    currentrowsel[0]['FabricID'] = $("#ddlFabric").val();
    //    currentrowsel[0]['FabricName'] = $("#ddlFabric option:selected").text();
    //    currentrowsel[0]['GroupingID'] = $("#ddlGroup").val();
    //    currentrowsel[0]['Grouping'] = $("#ddlGroup option:selected").text();
    //    currentrowsel[0]['Fabric_TypeID'] = $("#ddlType").val();
    //    currentrowsel[0]['Fabric_Type'] = $("#ddlType option:selected").text();
    //    currentrowsel[0]['Description'] = $("#txtDesc").val();
    //    currentrowsel[0]['No_Of_Parts'] = $("#txtParts").val();
    //    currentrowsel[0]['No_Of_Parts'] = $("#txtGsm").val();

    //    compList[rowindex] = currentrowsel[0];

    //    loadcomponentTable(compList);

    //    $('#btncomponentupdate').hide();
    //    $('#btncomponentadd').show();

    //    if (Mode == 0) {
    //        fnClearCompControls();
    //    }
    //    else {
    //        fnClearCompControls();

    //    }
    //    Mode = 0;
    //});


    //



});
function loadVenDetTable(VenListObj) {
    $('#tblQuoteDet').DataTable().destroy();
    debugger;

    $('#tblQuoteDet').DataTable({

        data: VenDetList,
        scrollY: 250,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        //"bSort": false,
        columns: [
            { title: "QuoteDetid", data: "QuoteDetid", "visible": false },
            { title: "Quoteid", data: "Quoteid", "visible": false },
            { title: "Item", data: "Item" },
            { title: "ItemId", data: "Itemid", "visible": false },
            { title: "Color", data: "Color" },
            { title: "ColorId", data: "Colorid", "visible": false },
            { title: "Size", data: "Size" },
            { title: "Sizeid", data: "Sizeid", "visible": false },
            { title: "Uom", data: "Uom" },
            { title: "UomId", data: "Uomid", "visible": false },
            //{ title: "Qty", data: "Quantity" },
            //{
            //    title: "Qty", data: "Quantity",
            //    render: function (data) {

            //        return '<input type="text" id="txtGQty" class="editor-active"  style="width: 50px;text-align: center;" value=' + data + ' >';

            //    },
            //},
            //{ title: "Rate", data: "Rate" },
             {
                 title: "Rate", data: "Rate",
                 render: function (data) {

                     return '<input type="text" id="txtGRate" class="editor-active"  style="width: 50px;text-align: center;" value=' + data + ' >';

                 },
             },
           // { title: "MinQty", data: "MinQty" },
           {
               title: "Min Qty", data: "MinQty",
               render: function (data) {

                   return '<input type="text" id="txtGMinQty" class="editor-active"  style="width: 50px;text-align: center;" value=' + data + ' >';

               },
           },
            //{ title: "Apprate", data: "Apprate" },
            // { title: "MaxQty", data: "MaxQty" },
          {
              title: "Max Qty", data: "MaxQty",
              render: function (data) {

                  return '<input type="text" id="txtGMaxQty" class="editor-active"  style="width: 50px;text-align: center;" value=' + data + ' >';

              },
          },
                   
            { title: "Order No", data: "Buy_ord_no" },
            { title: "StyleId", data: "StyleId", "visible": false },
               //{
               //    title: "ACTION", "mDataProp": null,"visible":false,
               //    "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Update" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnVUpdate btn btn-round btn-success"> <i class="fa fa-check"></i> </button> '
               //    //"sDefaultContent": '<button type="button" class="btnVUpdate btn btn_round btn-success"> Update </button> '
               //}
        ]
    });
}

function fnClearVenDetControls() {
    debugger;
    $('#ddlItem').val('0');
    $('#ddlColor').val('0');
    $('#ddlSize').val('0');
    $('#ddlUom').val('0');
    $('#txtGQty').val('');
    $('#txtRate').val('');
    $('#txtMinQty').val('');
    $('#txtAppRate').val('');
    $('#txtMaxQty').val('');
    //$('#ddlGroup').val('0');
    //$('#ddlFabric').val('0');

}
function LoadSupplierAdd() {
    $('#txtSupAdd').val("");
    var SupID = $('#ddlSupplier').val();

    $.ajax({
        url: "/Supplier/GetbyId/" + SupID,
        typr: "GET",

        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                $('#txtSupAdd').val(obj.Address1 + "," + obj.Address2 + "," + obj.Address3);

            }
        }

    });

}
function LoadExRateAdd() {
    $('#txtExRate').val("");
    var CID = $('#ddlCurrency').val();

    $.ajax({
        url: "/Currency/GetbyId/" + CID,
        typr: "GET",

        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                $('#txtExRate').val(obj.Exchangerate);

            }
        }

    });

}
function LoadOrderDet() {
    $('#txtSupAdd').val("");
    var MasId = MOrd;
    LoadBuyerDDL("#ddlBuyer");
    if (MasId == 0) {
    }
    $.ajax({
        url: "/BulkOrder/EditMainList/" + MasId,
        typr: "GET",

        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                $('#txtQty').val(obj.Quantity);
                $('#txtRefNo').val(obj.Ref_No);
                $('#ddlBuyer').val(obj.BuyerId);

                //$("#ddlOrdNo").prop("disabled", true);
                $("#ddlBuyer").prop("disabled", true);
                $("#txtQty").prop("disabled", true);
                $("#txtRefNo").prop("disabled", true);
                //$('#txtSupAdd').val(obj.Address1 + "," + obj.Address2 + "," + obj.Address3);

                LoadGrid(MasId);
            }
        }

    });

}
function LoadGrid() {
    $('#tblQuoteDet').DataTable().destroy();
    var MasId = MOrd;
    if (MasId == 0) {

    }
    debugger;
    $.ajax({
        url: "/VendorEntry/ListOrderDetails",
        data: JSON.stringify({ MasId: MasId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            VenEntList = result;
            VenDetList = VenEntList;
            loadVenDetTable(VenEntList);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function Add() {

    var res = validate();
    if (res == false) {
        return false;
    }


    var Detlist = [];
    $.each(VenDetList, function (i) {
        if (this.Rate > 0 && this.MinQty > 0 && this.MaxQty > 0) {
            Detlist.push(VenDetList[i]);
        } 
    });
    
    //if (VenEntListN.length == 0) {
    //    //alert("Please Enter the Item Details")
    //    var msg = 'Please Enter the Item Details...';
    //    var flg = 4;
    //    var mode = 1;
    //    var url = "" ;
    //    AlartMessage(msg, flg, mode, url);
    //    return true;
    //}
    var Ordtype = $('input[name="optionsRadios"]:checked').attr('value');
    var type = $('input[name="optionsRadios1"]:checked').attr('value');

    debugger;
    table = "VendorQuoteMas",
    column = "EntryNo",
    compId = $('#ddlCompany').val(),
    Docum = 'VENDOR QUOTE'

    var oldQuoteNo = $('#txtQuoteNo').val();
    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var newQuoteNo = result.Value;
            if (oldQuoteNo != newQuoteNo) {
                //alert('Quote No has been changed...');
                var msg = 'Quote Number has been changed...';
                var flg = 4;
                var mode = 1;
                var url = "" ;
                AlartMessage(msg, flg, mode, url);
                $('#txtQuoteNo').val(result.Value);
            }
            var objSubmit = {
                Companyid: $('#ddlCompany').val(),
                EntryDate: $('#txtEntryDate').val(),//new Date($('#txtEntryDate').val()),
                EntryNo: $('#txtQuoteNo').val(),
                QuoteNo: $('#txtQTNo').val(),
                QuoteDate: $('#txtDate').val(),//new Date($('#txtDate').val()),
                BuyOrdGeneral: Ordtype,
                AutoManual: type,
                Supplierid: $('#ddlSupplier').val(),
                //Buy_ord_no: $("#ddlOrdNo option:selected").text(),
                Remarks: $('#txtRemarks').val(),
                Commit_Cancel: "Y",
                CurrencyId: $('#ddlCurrency').val(),
                Exchangerate: $('#txtExRate').val(),
                ActiveFrom: $('#txtActDate').val(),//new Date($('#txtActDate').val()),
                ApprovedStatus: "P",
                APPROVALDATE: $('#txtActDate').val(),//new Date($('#txtActDate').val()),
                CreatedBy: Guserid,

                VendorDet: Detlist

            };
            $("#btnAdd").attr("disabled", true);
            LoadingSymb();
            debugger;
            $.ajax({
                url: "/VendorEntry/SaveVendor",
                data: JSON.stringify(objSubmit),
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {
                    //alert("Data Saved Successfully");
                    //window.location.reload(true);
                    //alert("Data Saved Sucessfully");
                    //window.location.href = "/Vendor/VendorIndex";
                    var msg = 'Data Saved Sucessfully...';
                    var flg = 1;
                    var mode = 0;
                    var url = "/Vendor/VendorIndex" ;
                    AlartMessage(msg, flg, mode, url);
                },
                error: function (errormessage) {
                    alert(errormessage.responseText);
                }
            });
        }
    });
}
function validate() {
    debugger;
    var isValid = true;
    if ($('#txtQuoteNo').val().trim() == "") {
        $('#txtQuoteNo').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtQuoteNo').css('border-color', 'lightgrey');
    }
    if ($('#txtQTNo').val().trim() == "") {
        $('#txtQTNo').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtQTNo').css('border-color', 'lightgrey');
    }
    if ($('#txtDate').val().trim() == "") {
        $('#txtDate').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtDate').css('border-color', 'lightgrey');
    }
    if ($('#txtEntryDate').val().trim() == "") {
        $('#txtEntryDate').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtEntryDate').css('border-color', 'lightgrey');
    }
    if ($('#txtActDate').val().trim() == "") {
        $('#txtActDate').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtActDate').css('border-color', 'lightgrey');
    }
    if ($('#ddlSupplier').val() == 0) {
        $('#ddlSupplier').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlSupplier').css('border-color', 'lightgrey');
    }
    if ($('#ddlCompany').val() == 0) {
        $('#ddlCompany').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlCompany').css('border-color', 'lightgrey');
    }
    if ($('#ddlCurrency').val() == 0) {
        $('#ddlCurrency').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlCurrency').css('border-color', 'lightgrey');
    }

    $.each(VenDetList, function (i) {
        if (this.Rate > 0 && this.MinQty == 0 && this.MaxQty == 0) {
            var msg = 'Please Enter the Item Details...';
            var flg = 4;
            var mode = 1;
            var url = "";
            AlartMessage(msg, flg, mode, url);
            return true;
        } else if (this.Rate == 0 && this.MinQty > 0 && this.MaxQty == 0) {
            var msg = 'Please Enter the Item Details...';
            var flg = 4;
            var mode = 1;
            var url = "";
            AlartMessage(msg, flg, mode, url);
            return true;
        } else if (this.Rate == 0 && this.MinQty == 0 && this.MaxQty > 0) {
            var msg = 'Please Enter the Item Details...';
            var flg = 4;
            var mode = 1;
            var url = "";
            AlartMessage(msg, flg, mode, url);
            return true;
        } else if (this.Rate > 0 && this.MinQty > 0 && this.MaxQty == 0) {
            var msg = 'Please Enter the Item Details...';
            var flg = 4;
            var mode = 1;
            var url = "";
            AlartMessage(msg, flg, mode, url);
            return true;
        } else if (this.Rate > 0 && this.MinQty == 0 && this.MaxQty > 0) {
            var msg = 'Please Enter the Item Details...';
            var flg = 4;
            var mode = 1;
            var url = "";
            AlartMessage(msg, flg, mode, url);
            return true;
        } else if (this.Rate == 0 && this.MinQty > 0 && this.MaxQty > 0) {
            var msg = 'Please Enter the Item Details...';
            var flg = 4;
            var mode = 1;
            var url = "";
            AlartMessage(msg, flg, mode, url);
            return true;
        }
    });
    return isValid;
}
$(document).on('click', '.btnVUpdate', function () {


    debugger;

    rowindex = $(this).closest('tr').index();
    var currentro132 = VenEntList.slice(rowindex);


    var QDtid = currentro132[0]['QuoteDetid'];
    var Qtid = currentro132[0]['Quoteid'];
    var Itemid = currentro132[0]['Itemid'];
    var Item = currentro132[0]['Item'];
    var Colorid = currentro132[0]['Colorid'];
    var Color = currentro132[0]['Color'];
    var Sizeid = currentro132[0]['Sizeid'];
    var Size = currentro132[0]['Size'];
    var Uomid = currentro132[0]['Uomid'];
    var Uom = currentro132[0]['Uom'];
    // var Qty = currentro12[0]['Quantity'];
   
    // var GQty = $(this).closest('tr').find('#txtGQty').val();
    var GRate = $(this).closest('tr').find('#txtGRate').val();
    var GMnQty = $(this).closest('tr').find('#txtGMinQty').val();
    var GMxQty = $(this).closest('tr').find('#txtGMaxQty').val();
    var OrdNo = currentro132[0]['Buy_ord_no'];
    //Wght = $(this).closest('tr').find('#txtWght').val();
    //var GWID = $(this).closest('tr').find('#ddlGSize').val();
    //var FWID = $(this).closest('tr').find('#ddlFSize').val();





    if (GMnQty == 0) {
        //alert("Please Enter Quantity Qty");
        var msg = 'Please Enter Quantity...';
        var flg = 4;
        var mode = 1;
        var url = "" ;
        AlartMessage(msg, flg, mode, url);
        return false;
    }




    var copsvListObj = {
        QuoteDetid: QDtid,
        Quoteid: Qtid,
        Itemid: Itemid,
        Item: Item,
        Colorid: Colorid,
        Color: Color,
        Sizeid: Sizeid,
        Size: Size,
        Uomid: Uomid,
        Uom: Uom,
        //Quantity: Qty,
        //Quantity: GQty,
        Rate: GRate,
        MinQty: GMnQty,
        MaxQty: GMxQty,
        Buy_ord_no: OrdNo
    };




    //VenEntListN.push(copsvListObj);

    //loadSaveTable(copsvListObj);
    //alert("Update Sucessfully");

    if (VenEntListN.length > 0) {
        var colorempty = [];
        colorempty = VenEntListN;

        colorempty = $.grep(colorempty, function (v) {
            return v.QuoteDetid === QDtid;
        });

        loadSaveTable(colorempty);
        //alert("Update Sucessfully");
        var msg = 'Update Sucessfully...';
        var flg = 1;
        var mode = 1;
        var url = "" ;
        AlartMessage(msg, flg, mode, url);
    } else {

        VenEntListN.push(copsvListObj);
        loadSaveTable(copsvListObj);
        //alert("Update Sucessfully");
        var msg = 'Update Sucessfully...';
        var flg = 1;
        var mode = 1;
        var url = "" ;
        AlartMessage(msg, flg, mode, url);
    }

});

function loadSaveTable(copsvListObj) {
    $('#tblQuoteDetSave').DataTable().destroy();
    debugger;

    $('#tblQuoteDetSave').DataTable({

        data: VenEntListN,

        columns: [
            { title: "QuoteDetid", data: "QuoteDetid" },
            { title: "Quoteid", data: "Quoteid" },
      
            { title: "Item", data: "Item" },
            { title: "ItemId", data: "Itemid" },
            { title: "Color", data: "Color" },
            { title: "ColorId", data: "Colorid" },
            { title: "Size", data: "Size" },
            { title: "Sizeid", data: "Sizeid" },
            { title: "Uom", data: "Uom" },
            { title: "UomId", data: "Uomid" },
            { title: "Rate", data: "Rate" },
            { title: "MinQty", data: "MinQty" },
            { title: "MaxQty", data: "MaxQty" },
            { title: "OrderNo", data: "Buy_ord_no" }

        ]
    });
}
function EditItemDetails(MasID) {
    debugger;
    $('#ddlCompany').empty();
    $('#ddlSupplier').empty();
    $('#ddlCurrency').empty();
    $('#ddlOrdNo').empty();
    $('#ddlBuyer').empty();
    LoadCompanyDDL("#ddlCompany");
    LoadOrdNoDDL("#ddlOrdNo");
    LoadSupplierDDL("#ddlSupplier");
    LoadCurrencyDDL("#ddlCurrency");
    LoadBuyerDDL("#ddlBuyer");

    $.ajax({
        url: "/VendorEntry/VEditMainList",
        data: JSON.stringify({ MasID: MasID }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var ob = result.Value;
            debugger;
            if (ob != undefined) {

                $("#ddlOrdNo").prop("disabled", true);
                $("#btnFill").prop("disabled", true);
                $("#txtQuoteNo").prop("disabled", true);
                $("#txtQTNo").prop("disabled", true);
                $("#txtDate").prop("disabled", true);
                $("#txtActDate").prop("disabled", true);
                $("#txtEntryDate").prop("disabled", true);
                

                $('#txtQty').val(ob[0].Quantity);
                $('#ddlOrdNo').val(ob[0].Buy_Ord_MasId);
                $('#txtRefNo').val(ob[0].Ref_No);
                $('#txtDate').val(moment(ob[0].QuoteDate).format('DD/MM/YYYY'));
                $('#txtActDate').val(moment(ob[0].ActiveFrom).format('DD/MM/YYYY'));
                $('#txtEntryDate').val(moment(ob[0].EntryDate).format('DD/MM/YYYY'));
                $('#txtQTNo').val(ob[0].QuoteNo);
                $('#txtQuoteNo').val(ob[0].EntryNo);
                $('#ddlCompany').val(ob[0].Companyid);
                $('#ddlSupplier').val(ob[0].Supplierid).trigger('change');
                $('#ddlCurrency').val(ob[0].CurrencyId).trigger('change');
                $('#txtExRate').val(ob[0].Exchangerate);
                $('#ddlBuyer').val(ob[0].BuyerId);
                $('#txtSupAdd').val(ob[0].SAdd1 + "," + ob[0].SAdd2 + "," + ob[0].SAdd3);
                $('#txtOtype').val(ob[0].BuyOrdGeneral);
                $('#txttype').val(ob[0].AutoManual);
                $('#txtRemarks').val(ob[0].Remarks);
                var Ot = ob[0].BuyOrdGeneral;
                var Ott = $('#txttype').val();
                if (ob[0].BuyOrdGeneral == "G") {
                    $('#tblQuoteEntry').show();
                } else {
                    $('#tblQuoteEntry').hide();
                }
                if (Ot == "B") {


                    $("#optBuy").prop("checked", true);
                    $("#optGen").prop("checked", false);

                } else if (Ot == "G") {

                    $("#optBuy").prop("checked", false);
                    $("#optGen").prop("checked", true);

                    $("#optAuto").attr('disabled', true);
                    $("#ddlOrdNo").prop("disabled", true);
                    $("#ddlBuyer").prop("disabled", true);
                    $("#txtQty").prop("disabled", true);
                    $("#txtRefNo").prop("disabled", true);
                    $('#ddlOrdNo').val("");
                    $('#ddlBuyer').val("");
                    $('#txtQty').val("");
                    $('#txtRefNo').val("");
                    $("#ddlOrderNo").prop("disabled", true);

                }


                if (Ott == "A") {


                    $("#optAuto").prop("checked", true);
                    $("#optMan").prop("checked", false);

                } else if (Ott == "M") {

                    $("#optAuto").prop("checked", false);
                    $("#optMan").prop("checked", true);
                    var Ot = $('#txtOtype').val();
                    if (Ot == "G") {
                        $("#optAuto").attr('disabled', true);
                        LoadItemDDL("#ddlItem");
                        LoadUomDDL("#ddlUom");
                        LoadColorDDL("#ddlColor");
                        LoadSizeDDL("#ddlSize");
                    }
                    if (Ot == "B") {
                        $('#ddlOrdNo').val("");
                        $('#ddlBuyer').val("");
                        $('#txtQty').val("");
                        $('#txtRefNo').val("");
                        $("#ddlOrdNo").attr('disabled', true);
                        $("#ddlBuyer").attr('disabled', true);
                        $("#txtQty").attr('disabled', true);
                        $("#txtRefNo").attr('disabled', true);
                        LoadOrdNoDDL("#ddlOrderNo");
                        LoadItemDDL("#ddlItem");
                        LoadUomDDL("#ddlUom");
                        LoadColorDDL("#ddlColor");
                        LoadSizeDDL("#ddlSize");
                    }
                }

                $("#optBuy").attr('disabled', true);
                $("#optGen").attr('disabled', true);
                $("#optAuto").attr('disabled', true);
                $("#optMan").attr('disabled', true);
                LoadEditDet(MasID);
            }
            else {

            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function LoadEditDet(MasId) {
    debugger;

    $.ajax({
        url: "/VendorEntry/ListVenEditDetDetails",
        data: JSON.stringify({ MasId: MasId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            VenEntList = result;
            VenEntListN = result;

            VenDetList = result;
            loadVenDetTable(VenEntList);
            loadSaveTable(VenEntListN);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function Update() {
    // window.location.reload(true);
    debugger;
    if (VenEntListN.length == 0) {
        //alert("Please Enter the Item Details");
        var msg = 'Please Enter the Item Details...';
        var flg = 1;
        var mode = 1;
        var url = "";
        AlartMessage(msg, flg, mode, url);
    }

    var res = validate();
    if (res == false) {
        return false;
    }
    var Ordtype = $('input[name="optionsRadios"]:checked').attr('value');
    var type = $('input[name="optionsRadios1"]:checked').attr('value');

    var objSubmit = {
        Companyid: $('#ddlCompany').val(),
        EntryDate: $('#txtEntryDate').val(),//new Date($('#txtEntryDate').val()),
        EntryNo: $('#txtQuoteNo').val(),
        QuoteNo: $('#txtQTNo').val(),
        QuoteDate: $('#txtDate').val(),//new Date($('#txtDate').val()),
        BuyOrdGeneral: Ordtype,
        AutoManual: type,
        Supplierid: $('#ddlSupplier').val(),
        Buy_ord_no: $("#ddlOrdNo option:selected").text(),
        Remarks: $('#txtRemarks').val(),
        Commit_Cancel: "Y",
        CurrencyId: $('#ddlCurrency').val(),
        Exchangerate: $('#txtExRate').val(),
        ActiveFrom: $('#txtActDate').val(),//new Date($('#txtActDate').val()),
        ApprovedStatus: "P",
        APPROVALDATE: $('#txtActDate').val(),//new Date($('#txtActDate').val()),
        CreatedBy: Guserid,
        Quoteid: $('#txtQMasId').val(),
        VendorDet: VenDetList

    };
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/VendorEntry/Update",
        data: JSON.stringify(objSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            //alert("Data Updated Sucessfully");
            //window.location.href = "/Vendor/VendorIndex";
            var msg = 'Data Updated Sucessfully...';
            var flg = 1;
            var mode = 0;
            var url = "/Vendor/VendorIndex";
            AlartMessage(msg, flg, mode, url);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function BtnItemClose() {
    window.location.href = "/Vendor/VendorIndex";
}