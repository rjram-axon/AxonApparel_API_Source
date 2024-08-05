var OrderType = 0;
var AddPur = [];
var ItemDet = [];
var Stateid = 0;
var CStateid = 0;
var CGST = 0;
var SGST = 0;
var IGST = 0;
var GItemID = 0;
var GColorID = 0;
var GSizeID = 0;
var GUomID = 0;
var GItem = 0;
var GColor = 0;
var GSize = 0;
var PurchaseItemDet = [];
var Type = '';
$(document).ready(function () {
    debugger;

    LoadSupplierDDL("#ddlSupplier,#ddlManufacture");
    LoadCompanyDDL("#ddlACompany");
    LoadCompanyUnitDDL("#ddlPoUnit");
    LoadItemDDL("#ddlItem");
    LoadColorDDL("#ddlColor");
    LoadSizeDDL("#ddlSize");
    LoadUomDDL("#ddlUom");
    LoadAddlessDDL("#ddlAccHeads");
    LoadCurrencyDDL("#ddlCurrency");
    LoadPayTermsDDL("#ddlPayTerms");
    LoadEmployeeDDL("#ddlApprove");

    var BillType = $('input[name="optBill"]:checked').attr('value');
    var LocalType = $('input[name="optLocal"]:checked').attr('value');


    if (LocalType == "F") {
        LoadCompanyUnitDDL("#ddlLocation");
    }

    var qrStr = window.location.search;
    var spQrStr = qrStr.substring(1);
    var arrQrStr = new Array();
    var arr = spQrStr.split('?');

    for (var i = 0; i < arr.length; i++) {
        var queryvalue = arr[i].split('=');
    }

    OrderType = queryvalue[3];
    //Type

});

function LoadGenerate() {
    GenerateNumber();
}


function LoadAccType() {

    $('#txtPlusOrMinus').val("");
    var AccHID = $('#ddlAccHeads').val();

    $.ajax({
        url: "/AccountHeads/GetbyID/" + AccHID,
        typr: "GET",

        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                $('#txtPlusOrMinus').val(obj.AddlessType);

            }
        }

    });

}

var table, column, compId, Docum;

function GenerateNumber(table, column, compId, Docum) {

    debugger;

    if (OrderType == "R") {

        table = "pur_ord_mas",
        column = "pur_ord_no",
        compId = $('#ddlCompany').val(),
        Docum = 'PURCHASE ORDER GENERAL'
    }
    else if (OrderType == "Y") {

        table = "pur_ord_mas",
        column = "pur_ord_no",
        compId = $('#ddlCompany').val(),
        Docum = 'PURCHASE ORDER GENERAL - YARN'
    }
    else if (OrderType == "A") {

        table = "pur_ord_mas",
        column = "pur_ord_no",
        compId = $('#ddlCompany').val(),
        Docum = 'PURCHASE ORDER GENERAL - ACCESSORY'
    }
    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $('#txtPurOrdNo').val(result.Value);
        }
    });
}

$(document).ready(function () {

    //Accounts details
    $('#btnAccadd').click(function () {
        debugger;

        var leng = 0;

        var isAllValid = true;


        debugger;
        if ($('#ddlAccHeads').val() == "0") {
            isAllValid = false;
            $('#ddlAccHeads').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#ddlAccHeads').siblings('span.error').css('visibility', 'hidden');
        }


        //if (compList.length == 0) {
        //    leng = 1;
        //}
        //else {
        //    leng = compList.length + 1;
        //}

        if (isAllValid) {


            debugger;
            var AccListObj = {
                Addless: $("#ddlAccHeads option:selected").text(),
                Addlessid: $('#ddlAccHeads').val(),
                PlusOrMinus: $('#txtPlusOrMinus').val(),
                Percentage: $('#txtPer').val(),
                Amount: $('#txtAmt').val(),
                Pur_Ord_Discountid: 0,
                Pur_Ord_id: 0,
                Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
            };

            AddPur.push(AccListObj);

            loadAccTable(AccListObj);

            //fnClearCompControls();
        }
    });

    $(document).on('click', '.btnAccedit', function () {
        debugger;
        Mode = 1;

        rowindex = $(this).closest('tr').index();

        var currentro12 = AddPur.slice(rowindex);

        $('#ddlAccHeads').val(currentro12[0]['Addlessid']);
        $('#txtPlusOrMinus').val(currentro12[0]['PlusOrMinus']);
        $('#txtPer').val(currentro12[0]['Percentage']);
        $('#txtAmt').val(currentro12[0]['Amount']);


        $('#btnAccadd').hide();
        $('#btnAccupdate').show();
    });

    $('#btnAccupdate').click(function () {
        debugger;
        var currentrowsel = AddPur.slice(rowindex);

        currentrowsel[0]['Addlessid'] = $("#ddlAccHeads").val();
        currentrowsel[0]['Addless'] = $("#ddlAccHeads option:selected").text();
        currentrowsel[0]['PlusOrMinus'] = $("#txtPlusOrMinus").val();
        currentrowsel[0]['Percentage'] = $("#txtPer").val();
        currentrowsel[0]['Amount'] = $("#txtAmt").val();

        AddPur[rowindex] = currentrowsel[0];

        loadAccTable(AddPur);

        $('#btnAccupdate').hide();
        $('#btnAccadd').show();

        //if (Mode == 0) {
        //    fnClearCompControls();
        //}
        //else {
        //    fnClearCompControls();

        //}
        //Mode = 0;
    });


    //






});
$(document).ready(function () {

    //Item details
    $('#btnItemadd').click(function () {
        debugger;

        var leng = 0;

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

       
        if ($('#txtBaseunit').val() == "") {
            alert("Please Enter the Base Qty")
            return true;
        }
        
        if ($('#txtRate').val() == "") {
            alert("Please Enter the Rate")
            return true;
        }

        if (isAllValid) {


            debugger;

            GItemID = $('#ddlItem').val();
            GColorID = $('#ddlColor').val();
            GSizeID = $('#ddlSize').val();
            GUomID = $('#ddlUom').val();
            GItem = $("#ddlItem option:selected").text();
            GColor = $("#ddlColor option:selected").text();
            GSize = $("#ddlSize option:selected").text();
            GUom = $("#ddlUom option:selected").text();
            var Qtty=$('#txtBaseunit').val();
            var SecQty = $('#txtSecUnit').val();
            var Rate = $('#txtRate').val();
            var tot = Qtty * Rate;


            var ItemListObj = {
                Item: GItem,
                ItemID: GItemID,

                Color: GColor,
                ColorID: GColorID,

                Size: GSize,
                SizeID: GSizeID,

                Uom: GUom,
                UOMId: GUomID,
                quantity: Qtty,
                Sec_Qty: SecQty,
                Rate:Rate,
                Amount: tot,
                CGST: $('#txtICGST').val(),
                SGST: $('#txtISGST').val(),
                IGST: $('#txtIIGST').val(),
                Pur_Ord_DetId: 0,
                Pur_Ord_id: 0,
                Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
            };

            ItemDet.push(ItemListObj);

            loadItemTable(ItemListObj);

            fnClearItemControls();
        }
    });

    $(document).on('click', '.btnItemEdit', function () {
        debugger;
        Mode = 1;

        rowindex = $(this).closest('tr').index();

        var currentro12 = ItemDet.slice(rowindex);

        $('#ddlItem').val(currentro12[0]['ItemID']);
        $('#ddlColor').val(currentro12[0]['ColorID']);
        $('#ddlSize').val(currentro12[0]['SizeID']);
        $('#ddlUom').val(currentro12[0]['UOMId']);
        $('#txtIAmt').val(currentro12[0]['Amount']);
        $('#txtBaseunit').val(currentro12[0]['quantity']);
        $('#txtSecUnit').val(currentro12[0]['Sec_Qty']);
        $('#txtRate').val(currentro12[0]['Rate']);
        $('#txtICGST').val(currentro12[0]['CGST']);
        $('#txtISGST').val(currentro12[0]['SGST']);
        $('#txtIIGST').val(currentro12[0]['IGST']);
        $('#txtCGST').val(currentro12[0]['CGST']);
        $('#txtSGST').val(currentro12[0]['SGST']);
        $('#txtIGST').val(currentro12[0]['IGST']);

        $('#btnItemadd').hide();
        $('#btnItemupdate').show();
    });

    $('#btnItemupdate').click(function () {
        debugger;
        var currentrowsel = ItemDet.slice(rowindex);

        currentrowsel[0]['ItemID'] = $("#ddlItem").val();
        currentrowsel[0]['Item'] = $("#ddlItem option:selected").text();
        currentrowsel[0]['ColorID'] = $("#ddlColor").val();
        currentrowsel[0]['Color'] = $("#ddlColor option:selected").text();
        currentrowsel[0]['SizeID'] = $("#ddlSize").val();
        currentrowsel[0]['Size'] = $("#ddlSize option:selected").text();
        currentrowsel[0]['UOMId'] = $("#ddlUom").val();
        currentrowsel[0]['Uom'] = $("#ddlUom option:selected").text();
        currentrowsel[0]['Amount'] = $("#txtIAmt").val();

        ItemDet[rowindex] = currentrowsel[0];

        loadItemTable(ItemDet);

        $('#btnItemupdate').hide();
        $('#btnItemadd').show();

        fnClearItemControls();
        //if (Mode == 0) {
        //    fnClearCompControls();
        //}
        //else {
        //    fnClearCompControls();

        //}
        //Mode = 0;
    });


    //






});

function LoadGST() {


    var SupID = $('#ddlSupplier').val();
    $.ajax({
        url: "/PurchaseGeneralAll/GetbyID/" + SupID,
        typr: "GET",

        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                Stateid = obj[0]["StateId"];
                CStateid = obj[0]["CStateId"];

            }
        }

    });
}

function LoadItemGST(ItemId) {



    var SID = $('#ddlSupplier').val();

    if (SID == 0) {
        alert("Please Select the Supplier Name");
        return true;
    }


    $.ajax({
        url: "/Item/GetbyID/" + ItemId,
        typr: "GET",

        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {


                if ((Stateid && CStateid) > 0) {
                    $('#txtCGST').val(obj.CGST);
                    $('#txtICGST').val(obj.CGST);
                    CGST = obj.CGST;
                    $('#txtSGST').val(obj.SGST);
                    $('#txtISGST').val(obj.SGST);
                    SGST = obj.SGST;
                    $('#txtIGST').val(0);
                } else {
                    $('#txtIGST').val(obj.IGST);
                    $('#txtIIGST').val(obj.IGST);
                    IGST = obj.IGST;
                    $('#txtCGST').val(0);
                    $('#txtSGST').val(0);
                }

            }
        }

    });
}

function fnClearItemControls() {
    debugger;
    $('#ddlItem').val('0');
    $('#ddlColor').val('0');
    $('#ddlSize').val('0');
    $('#ddlUom').val('0');
    $('#txtIAmt').val('');
    $('#txtICGST').val('');
    $('#txtISGST').val('');
    $('#txtIIGST').val('');
    $('#txtBaseunit').val('');
    $('#txtSecUnit').val('');
    $('#txtReqDate').val('');
    $('#txtRate').val('');
}
function CalculateAmt(Rate) {
    //alert(Rate);
   // //loadItemTable(ItemListObj);
   // var cnt = $("#tblItemdetails tr").length - 1;
   // var Data = "";

   // var Rate = $("#txtRate").val();
   // var Qty = $("#txtBaseunit").val();
   // var SQty = $("#txtSecUnit").val();
   // var TotAmt = Rate * Qty;


   // //alert(GItemID);
   // //alert(GSizeID);
   // //alert(GColorID);

   // var IID = GItemID;
   // var CID = GColorID;
   // var SID = GSizeID;
   // var UID = GUomID;
   // var IIM =GItem;
   // var ICR = GColor;
   // var ISZ = GSize;
   // var IUM = GUom;
   // //ItemDet = [];
   // //for (var i = 1; i <= cnt; i++) {

   //     var ItemObj = {


   //         Item: IIM,
   //         Color: ICR,
   //         Size: ISZ,
   //         Uom: IUM,
   //         ItemID: IID,
   //         ColorID: CID,
   //         SizeID: SID,
   //         UOMId: UID,
   //         quantity: Qty,
   //         Sec_Qty: SQty,
   //         CGST: CGST,
   //         SGST: SGST,
   //         IGST: IGST,
   //         Amount: TotAmt,
   //         Pur_Ord_DetId: 0,
   //         Pur_Ord_id: 0

   //     };

   //     ItemDet.push(ItemObj);


   //     var Itemempty = [];
   //     Itemempty = ItemDet;

   //     Itemempty = $.grep(Itemempty, function (v) {
   //         return v.ItemID === IID;
   //     });

   //     loadItemTable(Itemempty);


   // //    loadItemTable(ItemObj)
   //// }

}
function loadAccTable(AccListObj) {
    $('#tblAccdetails').DataTable().destroy();
    debugger;
    $('#tblAccdetails').DataTable({

        data: AddPur,

        columns: [
            { title: "Pur_Ord_Discountid", data: "Pur_Ord_Discountid", "visible": false },
            { title: "Pur_Ord_id", data: "Pur_Ord_id" },
            { title: "Addlessid", data: "Addlessid" },
            { title: "Account Head", data: "Addless" },
            { title: "Percentage", data: "Percentage" },
            { title: "PlusOrMinus", data: "PlusOrMinus" },
            { title: "Amount", data: "Amount" },
               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<button type="button" class="btnAccedit"> Edit </button> <button type="button" class="btnAccremove"> Remove </button>'
               }
        ]
    });
}
function loadItemTable(ItemListObj) {
    $('#tblItemdetails').DataTable().destroy();
    debugger;
    $('#tblItemdetails').DataTable({

        data: ItemDet,

        columns: [
            { title: "Pur_Ord_DetId", data: "Pur_Ord_DetId", "visible": false },
            { title: "ItemId", data: "ItemID", "visible": false },
            { title: "Item", data: "Item" },
            { title: "ColorId", data: "ColorID", "visible": false },
            { title: "Color", data: "Color" },
            { title: "SizeId", data: "SizeID", "visible": false },
            { title: "Size", data: "Size" },
            { title: "UomId", data: "UOMId", "visible": false },
            { title: "Uom", data: "Uom" },
            { title: "Qty", data: "quantity", "visible": false },
            { title: "SecQty", data: "Sec_Qty", "visible": false },
            { title: "Rate", data: "Rate", "visible": false },
            { title: "Amount", data: "Amount" },
            { title: "CGST", data: "CGST", "visible": false },
            { title: "SGST", data: "SGST", "visible": false },
            { title: "IGST", data: "IGST", "visible": false },
               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<button type="button" class="btnItemEdit"> Edit </button> <button type="button" class="btnItemRemove"> Remove </button>'
               }
        ]
    });
}
function LoadBillComp() {

    var BillType = $('input[name="optBill"]:checked').attr('value');
    if (BillType == "B") {
        LoadBuyerDDL("#ddlBCompany");
    } else if (BillType == "U") {
        LoadCompanyUnitDDL("#ddlBCompany");
    } else if (BillType == "C") {
        LoadCompanyDDL("#ddlBCompany");
    } else if (BillType == "S") {
        LoadSupplierDDL("#ddlBCompany");
    }
}

function LoadLocation() {
    var LocalType = $('input[name="optLocal"]:checked').attr('value');


    $('#txtLocaAdd').val('');

    if (LocalType == "U") {
        LoadCompanyUnitDDL("#ddlLocation");

    } else if (LocalType == "F") {
        LoadCompanyUnitDDL("#ddlLocation");
    } else if (LocalType == "T") {
        LoadStoreUnitDDL("#ddlLocation");
    } else if (LocalType == "S") {
        LoadSupplierDDL("#ddlLocation");
    }
}
function LoadLocalAdd() {


    var LocalType = $('input[name="optLocal"]:checked').attr('value');

    if (LocalType == "F") {
        $('#txtLocaAdd').val("");
        var LocID = $('#ddlLocation').val();

        $.ajax({
            url: "/CompanyUnit/GetbyID/" + LocID,
            typr: "GET",

            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                var obj = result.Value;
                if (result.Status == 'SUCCESS') {

                    $('#txtLocaAdd').val(obj.Address1 + "," + obj.Address2 + "," + obj.Address3);

                }
            }

        });
    } else if (LocalType == "U") {
        $('#txtLocaAdd').val("");
        var LocID = $('#ddlLocation').val();

        $.ajax({
            url: "/CompanyUnit/GetbyID/" + LocID,
            typr: "GET",

            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                var obj = result.Value;
                if (result.Status == 'SUCCESS') {

                    $('#txtLocaAdd').val(obj.Address1 + "," + obj.Address2 + "," + obj.Address3);

                }
            }

        });
    } else if (LocalType == "T") {
        $('#txtLocaAdd').val("");
        var LocID = $('#ddlLocation').val();

        $.ajax({
            url: "/StoreUnit/GetbyId/" + LocID,
            typr: "GET",

            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                var obj = result.Value;
                if (result.Status == 'SUCCESS') {

                    $('#txtLocaAdd').val('');

                }
            }

        });
    } else if (LocalType == "S") {
        $('#txtLocaAdd').val("");
        var LocID = $('#ddlLocation').val();

        $.ajax({
            url: "/Supplier/GetbyId/" + LocID,
            typr: "GET",

            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                var obj = result.Value;
                if (result.Status == 'SUCCESS') {

                    $('#txtLocaAdd').val(obj.Address1 + "," + obj.Address2 + "," + obj.Address3);

                }
            }

        });
    }
}