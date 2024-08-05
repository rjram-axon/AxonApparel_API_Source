var EnquiryItemList = [];
var EnquiryFabricList = [];
var EnquiryEmbList = [];
var EnquiryPrintList = [];
//var ItemList = [];
//var PrintList = [];
//var EmbList = [];
//var FabricList = [];
var StyleList = [];
var obdet = [];
var rowindex = -1;
var GUserid = 0;
var EnqID = 0;
var enqNoDDL = "#";
var index = 0;
var MainFDate = 0;
var DelItemId = [];
var DelFabId = [];
var DelEmbId = [];
var DelPriId = [];
$(document).ready(function () {
    LoadPayTermsDDL("#ddlPayment");
    //LoadBuyerDDL("#ddlBuyer");
    //LoadBuyerDDL("#ddlMBuyer");
    LoadSeasonDDL("#ddlSeason");
    LoadShipmodeDDL("#ddlShipMode");
    LoadShipsystemDDL("#ddlShipsystem");
    //LoadUomDDL("#ddlUom");
    //LoadCompanyDDL("#ddlCompany");
    //LoadCompanyDDL("#ddlMCompany");
    LoadCompanyDDL("#ddlCompany,#ddlMCompany");
    LoadBuyerDDL("#ddlBuyer,#ddlMBuyer");
    LoadItemDDL("#ddlItem");
    LoadFabricDDL("#ddlFabric");
    LoadGUomDDL("#ddlUom,#ddluom");
    LoadColorDDL("#ddlColor,#ddlFColor");
    //LoadColorDDL("#ddlFColor");
    LoadSizeDDL("#ddlFSize,#ddlSize");
    LoadStyleDDL("#ddlMStyle,#ddlStyle");  
    MainFDate = $("#hdMainFromDate").data('value');
    getDate();
    LoadEnqNoDDL("#ddlEntryNo");
    LoadBuyRefNoDDL("#ddlRefNo");
    GUserid = $("#hdnUserid").data('value');
    MainList();

});

function LoadGarmConAdd() {
    $('#txtGarmentConID').val("");
    var GUId = $('#ddlUom').val();

    $.ajax({
        url: "/GarmentUom/GetByID/" + GUId,
        typr: "GET",

        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                $('#txtGarmentConID').val(obj.To_BUom);

            }
        }

    });

}
function LoadEnqNoDDL(EnqNoDDL) {
    enqNoDDL = EnqNoDDL;
    httpGet("/Enquiry/GetEntryNo", onEntryNoSuccess, onEntryNoFailure);
}
function onEntryNoSuccess(result) {
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(enqNoDDL).empty();
        $(enqNoDDL).append($('<option/>').val('0').text('--Select Entry No--'));
        $.each(data, function () {
            $(enqNoDDL).append($('<option></option>').text(this.EnquiryNo));
        });
    }
    else {
        alert('EntryNo loading failed');
    }
}

function onEntryNoFailure(result) {
    alert('EntryNo loading failed');
}
function LoadBuyRefNoDDL(BuyNoDDL) {
    buyNoDDL = BuyNoDDL;
    httpGet("/Enquiry/GetBuyRefNo", onBuyNoSuccess, onBuyNoFailure);
}
function onBuyNoSuccess(result) {
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(buyNoDDL).empty();
        $(buyNoDDL).append($('<option/>').val('0').text('--Select BuyRef No--'));
        $.each(data, function () {
            $(buyNoDDL).append($('<option></option>').text(this.BuyerRef));
        });
    }
    else {
        alert('BuyRefNo loading failed');
    }
}

function onBuyNoFailure(result) {
    alert('BuyRefNo loading failed');
}
var table, column, compId, Docum;

function GenerateNumber(table, column, compId, Docum) {

    debugger;
    table = "MarkEnqMas",
    column = "EnquiryNo",
    compId = $('#ddlCompany').val(),
    Docum = 'MARKETING ENQUIRY'

    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $('#EnquiryNo').val(result.Value);
        }
    });
}




function Save() {


    debugger;

    var res = validate();
    if (res == false) {
        return false;
    }


    //if ($('#ddlColor').val() == 0) {
    //    alert("Please Enter the Color");
    //    return true;
    //}

    //if ($('#ddlSize').val() == 0) {
    //    alert("Please Enter the Size");
    //    return true;
    //}

    //if ($('#ddluom').val() == 0) {
    //    alert("Please Enter the Uom");
    //    return true;
    //}

    //if ($('#txtIQuantity').val().trim() == "") {
    //    alert("Please Enter the Quantity");
    //    return true;
    //}

    //if ($('#ddlFabric').val() == 0) {
    //    alert("Please Enter the Fabric");
    //    return true;
    //}

    //if ($('#ddlFColor').val() == 0) {
    //    alert("Please Enter the Color");
    //    return true;
    //}

    //if ($('#ddlFSize').val() == 0) {
    //    alert("Please Enter the Size");
    //    return true;
    //}

    //if ($('#txtCounts').val().trim() == "") {
    //    alert("Please Enter the Counts");
    //    return true;
    //}
    //if ($('#txtGsm').val().trim() == "") {
    //    alert("Please Enter the GSM");
    //    return true;
    //}
    //if ($('#txtComposition').val().trim() == "") {
    //    alert("Please Enter the Composition");
    //    return true;
    //}
    //if ($('#txtFabricDesc').val().trim() == "") {
    //    alert("Please Enter the FabricDesc");
    //    return true;
    //}


    //if ($('#txtquality').val().trim() == "") {
    //    alert("Please Enter the Quantity");
    //    return true;
    //}
    //if ($('#txtPrnNo').val().trim() == "") {
    //    alert("Please Enter the no");
    //    return true;
    //}
    //if ($('#ddlPrnType').val() == 0) {
    //    alert("Please Enter the Type");
    //    return true;
    //}


    //if ($('#txtEmbNo').val().trim() == "") {
    //    alert("Please Enter the No");
    //    return true;
    //}
    //if ($('#ddlType').val() == 0) {
    //    alert("Please Enter the Type");
    //    return true;
    //}

    if (EnqID > 0) {
        $('#tEbody').DataTable().destroy();
    }

    if (EnquiryItemList.length == 0) {
        alert("Please Enter the Item Details..");
        return true;
    }

    if (EnquiryFabricList.length == 0) {
        alert("Please Enter the Fabric Details..");
        return true;
    }
    if (EnquiryEmbList.length == 0) {
        alert("Please Enter the Emb Details..");
        return true;
    }
    if (EnquiryPrintList.length == 0) {
        alert("Please Enter the Print Details..");
        return true;
    }
    var enqmasObj = {
        SeasonId: $('#ddlSeason').val(),
        ShipSystemId: $('#ddlShipsystem').val(),
        ShipModeId: $('#ddlShipMode').val(),
        TermsId: $('#ddlPayment').val(),
        BuyerId: $('#ddlBuyer').val(),
        BuyerRef: $('#BuyerRefNo').val(),
        CompanyId: $('#ddlCompany').val(),
        EnquiryNo: $('#EnquiryNo').val(),
        EnqDate: $('#dtEnquiryDate').val(),
        //EnqDate: new Date($('#dtEnquiryDate').val()),
        RefDate: $('#BuyerRefDate').val(),
        //RefDate: new Date($('#BuyerRefDate').val()),
        DespDate: $('#TargetDate').val(),
        //DespDate: new Date($('#TargetDate').val()),
        //markbuystyle
        StyleId: $('#ddlStyle').val(),
        BuyerStyle: $('#BuyerStyle').val(),
        StyleDesc: $('#Descrip').val(),
        QuotaCateId: 0,//$('#Description').val(),
        Quantity: $('#Quantity').val(),
        GUomId: $('#ddlUom').val(),
        GUomConv: $('#txtGarmentConID').val(),
        ContactPerson: $('#ContactPerson').val(),
        ShipModeId: $('#ddlShipMode').val(),
        Department: $('#DepartmentM').val(),
        Season: $('#ddlSeason').val(),
        CreatedBy:GUserid,
        EnquiryItem: EnquiryItemList,
        EnquiryFabric: EnquiryFabricList,
        EnquiryEmbPrint: EnquiryEmbList,
        EnquiryPrint: EnquiryPrintList,

    };
    LoadingSymb();
    $.ajax({
        url: "/Enquiry/Add",
        data: JSON.stringify(enqmasObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            //  AddEnqStyle();
            if (result.Value == true) {
                alert('Data Saved Successfully...');
                $('#ddlSeason').val("");
                $('#ddlShipsystem').val("");
                $('#ddlShipMode').val("");
                $('#ddlPayment').val("");
                $('#ddlBuyer').val("");
                $('#BuyerRefNo').val("");
                $('#ddlCompany').val("");
                $('#EnquiryNo').val("");
                $('#dtEnquiryDate').val("");
                $('#BuyerRefDate').val("");
                $('#ddlUom').val("");
                $('#ddlStyle').val("");
                $('#Quantity').val("");
                $('#TargetDate').val("");
                window.location.reload(true);
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
//Valdidation using jquery
function validate() {

    var des = $("#Descrip").val();
    var isValid = true;
    if ($('#dtEnquiryDate').val().trim() == "") {
        $('#dtEnquiryDate').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#dtEnquiryDate').css('border-color', 'lightgrey');
    }


    if ($('#ddlCompany').val() == 0) {
        $('#ddlCompany').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlCompany').css('border-color', 'lightgrey');
    }


    if ($('#ddlUom').val() == 0) {
        $('#ddlUom').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlUom').css('border-color', 'lightgrey');
    }
    if ($('#ddlPayment').val() == 0) {
        $('#ddlPayment').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlPayment').css('border-color', 'lightgrey');
    }
    if ($('#ddlBuyer').val() == 0) {
        $('#ddlBuyer').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlBuyer').css('border-color', 'lightgrey');
    }
    if ($('#ddlBuyer').val() == 0) {
        $('#ddlBuyer').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlBuyer').css('border-color', 'lightgrey');
    }
    if ($('#BuyerRefNo').val().trim() == "") {
        $('#BuyerRefNo').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#BuyerRefNo').css('border-color', 'lightgrey');
    }
    if ($('#BuyerRefDate').val().trim() == "") {
        $('#BuyerRefDate').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#BuyerRefDate').css('border-color', 'lightgrey');
    }
    if ($('#TargetDate').val().trim() == "") {
        $('#TargetDate').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#TargetDate').css('border-color', 'lightgrey');
    }
    if ($('#ddlBuyer').val() == 0) {
        $('#ddlBuyer').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlBuyer').css('border-color', 'lightgrey');
    }

    ///style
    if ($('#ddlStyle').val() == 0) {
        $('#ddlStyle').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlStyle').css('border-color', 'lightgrey');
    }
    if ($('#ddlUom').val() == 0) {
        $('#ddlUom').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlUom').css('border-color', 'lightgrey');
    }
   
    if ($('#BuyerStyle').val().trim() == "") {
        $('#BuyerStyle').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#BuyerStyle').css('border-color', 'lightgrey');
    }
    
    if ($('#Descrip').val() == "") {
        $('#Descrip').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Descrip').css('border-color', 'lightgrey');
    }


    if ($('#Quantity').val().trim() == "") {
        $('#Quantity').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Quantity').css('border-color', 'lightgrey');
    }

    if ($('#ddlSeason').val() == 0) {
        $('#ddlSeason').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlSeason').css('border-color', 'lightgrey');
    }
    if ($('#ddlShipMode').val() == 0) {
        $('#ddlShipMode').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlShipMode').css('border-color', 'lightgrey');
    }
    if ($('#ddlShipsystem').val() == 0) {
        $('#ddlShipsystem').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlShipsystem').css('border-color', 'lightgrey');
    }
    //if ($('#Department').val() == "") {
    //    $('#Department').css('border-color', 'Red');
    //    isValid = false;
    //}
    //else {
    //    $('#Department').css('border-color', 'lightgrey');
    //}
    //if ($('#Style').val() == "") {
    //    $('#Style').css('border-color', 'Red');
    //    isValid = false;
    //}
    //else {
    //    $('#Style').css('border-color', 'lightgrey');
    //}

    //item

    return isValid;
}
function AddEnqStyle() {

    debugger;

    var enqStylemasObj = {
        //SeasonId: $('#ddlSeason').val(),
        //ShipSystemId: $('#ddlShipsystem').val(),
        //ShipModeId: $('#ddlShipMode').val(),
        //TermsId: $('#ddlPayment').val(),
        //BuyerId: $('#ddlBuyer').val(),
        //BuyerRef: $('#BuyerRefNo').val(),
        //CompanyId: $('#ddlCompany').val(),
        //EnquiryNo: $('#EnquiryNo').val(),
        //EnqDate: $('#dtEnquiryDate').val(),
        //RefDate: $('#BuyerRefDate').val(),
        //DespDate: $('#TargetDate').val(),


        // EnquiryID: 59,
        StyleId: $('#ddlStyle').val(),
        BuyerStyle: $('#BuyerStyle').val(),
        StyleDesc: $('#Descrip').val(),
        QuotaCateId: $('#Descrip').val(),
        Quantity: $('#Quantity').val(),
        GUomId: $('#ddlUom').val(),
        GUomConv: $('#Descrip').val(),
        ContactPerson: $('#ContactPerson').val(),
        ShipModeId: $('#ddlShipMode').val(),
        Department: $('#DepartmentM').val(),
        Season: $('#ddlSeason').val(),


    };
    $.ajax({
        url: "/Enquiry/AddEnqStyle",
        data: JSON.stringify(enqStylemasObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            //$('#ddlSeason').val("");
            //$('#ddlShipsystem').val("");
            //$('#ddlShipMode').val("");
            //$('#ddlPayment').val("");
            //$('#ddlBuyer').val("");
            //$('#BuyerRefNo').val("");
            //$('#ddlCompany').val("");
            //$('#EnquiryNo').val("");
            //$('#dtEnquiryDate').val("");
            //$('#BuyerRefDate').val("");
            //$('#ddlUom').val("");
            //$('#ddlStyle').val("");
            //$('#Quantity').val("");
            //$('#TargetDate').val("");

            alert("Data Saved Successfully");
            window.location.reload(true);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
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
    var Fdatestring = day  + "/" + Cmonth + "/" + year;

    var day = new Date(),
        year = ((day.getMonth() - 2) < 0) ? (day.getFullYear() - 1) : day.getFullYear(),
        month = ((day.getMonth() - 2) < 0) ? (12 + (day.getMonth() - 2)) : (day.getMonth() + 1),
        date = month + '/' + day.getDate() + '/' + year;


    $('#txtFromDate').val(MainFDate);
    $('#txtToDate').val(Fdatestring);
    $('#dtEnquiryDate').val(Fdatestring);
    $('#BuyerRefDate').val(Fdatestring);
    $('#TargetDate').val(Fdatestring);
}


function Add() {

    if ($('#ddlColor').val() == 0) {
        alert("Please Enter the Color");
        return true;
    }

    if ($('#ddlSize').val() == 0) {
        alert("Please Enter the Size");
        return true;
    }

    if ($('#ddluom').val() == 0) {
        alert("Please Enter the Uom");
        return true;
    }
 
    if ($('#txtIQuantity').val().trim() == "") {
        alert("Please Enter the Quantity");
        return true;
    }

    if (EnqID > 0) {
        $('#tIbody').DataTable().destroy();
    }


 

    var EnqItemObj = {

        Color: $("#ddlColor option:selected").text(),
        ColorId: $('#ddlColor').val(),
        Size: $("#ddlSize option:selected").text(),
        SizeId: $('#ddlSize').val(),
        Uom: $("#ddluom option:selected").text(),
        UomId: $('#ddluom').val(),
        Quantity: $('#txtIQuantity').val(),
        Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']


    };
    EnquiryItemList.push(EnqItemObj);

    $('#tIbody').DataTable({

        data: EnquiryItemList,

        columns: [

            //{ title: "Item", data: "Item" },
            ////{ data: "ItemId", "visible": false },
            { title: "Color", data: "Color" },
            //{ data: "ColorId", "visible": false },
            { title: "Size", data: "Size" },
            //{ data: "SizeID", "visible": false },
            { title: "Uom", data: "Uom" },
            //{ data: "UomID", "visible": false },
            { title: "Quantity", data: "Quantity" },


                {
                    title: "ACTION", "mDataProp": null,
                    // "sDefaultContent": '<a id=" 1 " onclick="return EditMfunction(1)" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="1"><i class="fa fa-pencil-square-o" style="cursor: pointer;"></i></a> | <a id=" 1 " onclick="return Delete(this)" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="1"><i class="fa fa-trash-o" style="cursor: pointer;"></i></a>'
                    //"sDefaultContent": '<button type="button" class="btnSelect"> use </button> <a id=" 1 " onclick="return Delete(this)" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="1"><i class="fa fa-trash-o" style="cursor: pointer;"></i></a>'
                    "sDefaultContent": '<button  type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnMSelect btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button><button type="button" type="button" data-toggle="tooltip" data-placement="top" title="Delete" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnMDel btn btn-round btn-danger"> <i class="fa fa-times"></i> </button>'
                }

        ]
    });
    $('#tIbody').DataTable().destroy();
    $('#ddlColor').val("");
    $('#ddlSize').val("");
    $('#ddluom').val("");
    $('#txtIQuantity').val("");

    $('#myModal').hide();

}

$(document).on('click', '.btnMSelect', function () {
    debugger;
    var rowindex = $(this).closest('tr').index();

    var currentro12 = EnquiryItemList.slice(rowindex);

    $("#ddlColor").val(currentro12[0]['ColorId']);
    $("#ddlSize").val(currentro12[0]['SizeId']);
    $("#ddluom").val(currentro12[0]['UomId']);
    $('#txtIQuantity').val(currentro12[0]['Quantity']);

    $('#myModal').modal('show');
    $('#btnItemUpdate').show();
    $('#btnItemAdd').hide();
});

$(document).on('click', '.btnMDel', function () {
    debugger;
    var indexVal = $(this).closest('tr').index();

    document.getElementById("tIbody").deleteRow(indexVal + 1);

    EnquiryItemList.splice(indexVal, 1);

    var table = $('#tIbody').DataTable();
    var ItemId = table.row($(this).parents('tr')).data()["MarkEnqItemId"];
    DelItemId.push(ItemId);

});

function BtnItemClose() {
    $('#myModal').modal('hide');
}
function BtnFabricClose() {
    $('#myModalFabric').modal('hide');
}
function BtnEmbClose() {
    $('#myModalEmb').modal('hide');
}
function BtnPrintClose() {
    $('#myModalPrint').modal('hide');
}
function BtnMeasureClose() {
    $('#myModalMeasure').modal('hide');
}

function clearTextBox() {

    $('#EnquiryNo').val("");
    //$('#tIbody').DataTable().destroy();
    $('#ddlColor').val("");
    $('#ddlSize').val("");
    //$('#ddluom').val("");
    $('#txtIQuantity').val("");

    $('#btnItemUpdate').hide();
    $('#btnItemAdd').show();

    $('#ddlColor').css('border-color', 'lightgrey');
    $('#ddlSize').css('border-color', 'lightgrey');
    $('#ddluom').css('border-color', 'lightgrey');
    $('#txtIQuantity').css('border-color', 'lightgrey');
    LoadItemDDL("#ddlItem");
    /// LoadItemDDl("#ddlFabric");
    //LoadUomDDL("#ddluom");
    LoadColorDDL("#ddlColor");
    //  LoadColorDDL("#ddlFColor");
    LoadSizeDDL("#ddlSize");

    GenerateNumber();
}
function clearFTextBox() {

    $('#ddlFabric').val("");
    $('#ddlFColor').val("");
    $('#ddlFSize').val("");
    $('#txtCounts').val("");
    $('#txtGsm').val("");
    $('#txtComposition').val("");
    $('#txtFabricDesc').val("");

    $('#btnFabricUpdate').hide();
    $('#btnFabricAdd').show();

    $('#ddlFabric').css('border-color', 'lightgrey');
    $('#ddlFColor').css('border-color', 'lightgrey');
    $('#ddlFSize').css('border-color', 'lightgrey');
    $('#txtCounts').css('border-color', 'lightgrey');
    $('#txtGsm').css('border-color', 'lightgrey');
    $('#txtComposition').css('border-color', 'lightgrey');
    $('#txtFabricDesc').css('border-color', 'lightgrey');
    LoadItemDDL("#ddlFabric");
    /// LoadItemDDl("#ddlFabric");
    LoadUomDDL("#ddluom");
    LoadColorDDL("#ddlFColor");
    //  LoadColorDDL("#ddlFColor");
    LoadSizeDDL("#ddlFSize");
}
function clearETextBox() {

    $('#txtEmbNo').val("");
    $('#txtName').val("");
    $('#txtSize').val("");
    $('#txtPlacement').val("");
    $('#txtStitch').val("");
    $('#txtColors').val("");
    $('#ddlType').val("");

    $('#btnEmbUpdate').hide();
    $('#btnEmbAdd').show();

    $('#txtEmbNo').css('border-color', 'lightgrey');
    $('#txtName').css('border-color', 'lightgrey');
    $('#txtSize').css('border-color', 'lightgrey');
    $('#txtPlacement').css('border-color', 'lightgrey');
    $('#txtStitch').css('border-color', 'lightgrey');
    $('#txtColors').css('border-color', 'lightgrey');
    $('#ddlType').css('border-color', 'lightgrey');
}
function clearPTextBox() {

    $('#txtPrnNo').val("");
    $('#txtPrnName').val("");
    $('#txtPrnSize').val("");
    $('#txtPrnPlacement').val("");
    $('#txtPrnColors').val("");
    $('#ddlPrnType').val("");
    $('#txtquality').val("");

    $('#btnPrnUpdate').hide();
    $('#btnPrnAdd').show();

    $('#txtPrnNo').css('border-color', 'lightgrey');
    $('#txtPrnName').css('border-color', 'lightgrey');
    $('#txtPrnSize').css('border-color', 'lightgrey');
    $('#txtPrnPlacement').css('border-color', 'lightgrey');
    $('#txtPrnColors').css('border-color', 'lightgrey');
    $('#ddlPrnType').css('border-color', 'lightgrey');
    $('#txtquality').css('border-color', 'lightgrey');
}
function AddFabric() {

    if ($('#ddlFabric').val() == 0) {
        alert("Please Enter the Fabric");
        return true;
    }

    if ($('#ddlFColor').val() == 0) {
        alert("Please Enter the Color");
        return true;
    }

    if ($('#ddlFSize').val() == 0) {
        alert("Please Enter the Size");
        return true;
    }

    if ($('#txtCounts').val().trim() == "") {
        alert("Please Enter the Counts");
        return true;
    }
    if ($('#txtGsm').val().trim() == "") {
        alert("Please Enter the GSM");
        return true;
    }
    if ($('#txtComposition').val().trim() == "") {
        alert("Please Enter the Composition");
        return true;
    }
    if ($('#txtFabricDesc').val().trim() == "") {
        alert("Please Enter the FabricDesc");
        return true;
    }
    if (EnqID > 0) {
        $('#tFbody').DataTable().destroy();
    }

    var EnqFabricObj = {

        Fabric: $("#ddlFabric option:selected").text(),
        FabricId: $('#ddlFabric').val(),
        Color: $("#ddlFColor option:selected").text(),
        ColorId: $('#ddlFColor').val(),
        Size: $("#ddlFSize option:selected").text(),
        SizeID: $('#ddlFSize').val(),
        Counts: $('#txtCounts').val(),
        GSM: $('#txtGsm').val(),
        Composition: $('#txtComposition').val(),
        FabDesc: $('#txtFabricDesc').val(),
        Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']


    };
    EnquiryFabricList.push(EnqFabricObj);

    $('#tFbody').DataTable({

        data: EnquiryFabricList,

        columns: [

            //{ title: "Item", data: "Item" },
            ////{ data: "ItemId", "visible": false },
            { title: "Fabric", data: "Fabric" },
            //{ data: "ColorId", "visible": false },
            { title: "Size", data: "Size" },
            //{ data: "SizeID", "visible": false },
            { title: "Color", data: "Color" },
            //{ data: "UomID", "visible": false },
            { title: "Counts", data: "Counts" },
              //{ title: "Action", data: "Status" },
                 { title: "GSM", data: "GSM" },
              //{ title: "Action", data: "Status" },
                 { title: "Composition", data: "Composition" },
              //{ title: "Action", data: "Status" },
                   {
                       title: "ACTION", "mDataProp": null,
                       // "sDefaultContent": '<a id=" 1 " onclick="return EditMfunction(1)" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="1"><i class="fa fa-pencil-square-o" style="cursor: pointer;"></i></a> | <a id=" 1 " onclick="return Delete(this)" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="1"><i class="fa fa-trash-o" style="cursor: pointer;"></i></a>'
                       //"sDefaultContent": '<button type="button" class="btnSelect"> use </button> <a id=" 1 " onclick="return Delete(this)" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="1"><i class="fa fa-trash-o" style="cursor: pointer;"></i></a>'
                       "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnFSelect btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button><button type="button" data-toggle="tooltip" data-placement="top" title="Delete" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnFDel btn btn-round btn-danger"> <i class="fa fa-times"></i> </button>'
                   }

        ]
    });
    $('#tFbody').DataTable().destroy();
    $('#ddlFabric').val("");
    $('#ddlFColor').val("");
    $('#ddlFSize').val("");
    $('#txtCounts').val("");
    $('#txtComposition').val("");
    $('#txtGsm').val("");
    $('#txtFabricDesc').val("");

    $('#myModalFabric').hide();
}


$(document).on('click', '.btnFSelect', function () {
    debugger;
    var rowindex = $(this).closest('tr').index();

    var currentro12 = EnquiryFabricList.slice(rowindex);

    $("#ddlFabric").val(currentro12[0]['FabricId']);
    $("#ddlFColor").val(currentro12[0]['ColorId']);
    $("#ddlFSize").val(currentro12[0]['SizeId']);
    $('#txtCounts').val(currentro12[0]['Counts']);
    $('#txtGsm').val(currentro12[0]['GSM']);
    $('#txtComposition').val(currentro12[0]['Composition']);
    $('#txtFabricDesc').val(currentro12[0]['FabDesc']);

    $('#myModalFabric').modal('show');
    $('#btnFabricUpdate').show();
    $('#btnFabricAdd').hide();
});

$(document).on('click', '.btnFDel', function () {
    debugger;
    var indexVal = $(this).closest('tr').index();

    document.getElementById("tFbody").deleteRow(indexVal + 1);

    EnquiryFabricList.splice(indexVal, 1);

    var table = $('#tFbody').DataTable();
    var FabId = table.row($(this).parents('tr')).data()["MarkEnqFabricId"];
    DelFabId.push(FabId);

});
function AddEmb() {



    if ($('#txtEmbNo').val().trim() == "") {
        alert("Please Enter the No");
        return true;
    }
    if ($('#ddlType').val() == 0) {
        alert("Please Enter the Type");
        return true;
    }

    if (EnqID > 0) {
        $('#tEbody').DataTable().destroy();
    }

    var EnqEmbObj = {

        EmbDesc: $('#txtName').val(),
        EmbSize: $('#txtSize').val(),
        EmbPlacement: $('#txtPlacement').val(),
        EmbColors: $('#txtColors').val(),
        EmbStiches: $('#txtStitch').val(),
        EmbType: $('#ddlType').val(),
        EmbNo: $('#txtEmbNo').val(),
        Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']


    };
    EnquiryEmbList.push(EnqEmbObj);

    $('#tEbody').DataTable({

        data: EnquiryEmbList,

        columns: [

            //{ title: "Item", data: "Item" },
            ////{ data: "ItemId", "visible": false },
             { title: "Emb No", data: "EmbNo" },
            { title: "Name", data: "EmbDesc" },
            //{ data: "ColorId", "visible": false },
            { title: "Size", data: "EmbSize" },
            //{ data: "SizeID", "visible": false },
            { title: "Placement", data: "EmbPlacement" },
            //{ data: "UomID", "visible": false },
            { title: "No.Of.Stiches", data: "EmbStiches" },
              //{ title: "Action", data: "Status" },
                 { title: "No.Of.Colors", data: "EmbColors" },
              //{ title: "Action", data: "Status" },
                 { title: "Emb Type", data: "EmbType" },
              //{ title: "Action", data: "Status" },
               {
                   title: "ACTION", "mDataProp": null,
                   // "sDefaultContent": '<a id=" 1 " onclick="return EditMfunction(1)" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="1"><i class="fa fa-pencil-square-o" style="cursor: pointer;"></i></a> | <a id=" 1 " onclick="return Delete(this)" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="1"><i class="fa fa-trash-o" style="cursor: pointer;"></i></a>'
                   //"sDefaultContent": '<button type="button" class="btnSelect"> use </button> <a id=" 1 " onclick="return Delete(this)" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="1"><i class="fa fa-trash-o" style="cursor: pointer;"></i></a>'
                   "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnESelect btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button><button type="button" data-toggle="tooltip" data-placement="top" title="Delete" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnEDel btn btn-round btn-danger"> <i class="fa fa-times"></i> </button>'

               }


        ]
    });
    $('#tEbody').DataTable().destroy();

    $('#txtEmbNo').val("");
    $('#txtName').val("");
    $('#txtSize').val("");
    $('#txtPlacement').val("");
    $('#txtStitch').val("");
    $('#txtColors').val("");
    $('#ddlType').val("");

    $('#myModalEmb').hide();
}


$(document).on('click', '.btnESelect', function () {
    debugger;
    var rowindex = $(this).closest('tr').index();

    var currentro12 = EnquiryEmbList.slice(rowindex);

    $('#txtColors').val(currentro12[0]['EmbColors']);
    $('#txtStitch').val(currentro12[0]['EmbStiches']);
    $('#txtEmbNo').val(currentro12[0]['EmbNo']);
    $('#txtPlacement').val(currentro12[0]['EmbPlacement']);
    $('#txtSize').val(currentro12[0]['EmbSize']);
    $('#txtName').val(currentro12[0]['EmbDesc']);
    $("#ddlType").val(currentro12[0]['EmbType']);

    $('#myModalEmb').modal('show');
    $('#btnEmbUpdate').show();
    $('#btnEmbAdd').hide();
});

$(document).on('click', '.btnEDel', function () {
    debugger;
    var indexVal = $(this).closest('tr').index();

    document.getElementById("tEbody").deleteRow(indexVal + 1);

    EnquiryEmbList.splice(indexVal, 1);

    var table = $('#tEbody').DataTable();
    var EmpId = table.row($(this).parents('tr')).data()["MarkEnqEmbPrintId"];
    DelEmbId.push(EmpId);
});

function AddPrint() {

    if ($('#txtquality').val().trim() == "") {
        alert("Please Enter the Quantity");
        return true;
    }
    if ($('#txtPrnNo').val().trim() == "") {
        alert("Please Enter the no");
        return true;
    }
    if ($('#ddlPrnType').val() == 0) {
        alert("Please Enter the Type");
        return true;
    }

    if (EnqID > 0) {
        $('#tPbody').DataTable().destroy();
    }

    var EnqPrintObj = {


        PrnDesc: $('#txtPrnName').val(),
        PrnSize: $('#txtPrnSize').val(),
        PrnPlacement: $('#txtPrnPlacement').val(),
        PrnColors: $('#txtPrnColors').val(),
        PrnType: $('#ddlPrnType').val(),
        PrnQlty: $('#txtquality').val(),

        PrnNo: $('#txtPrnNo').val(),
        Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']



    };
    EnquiryPrintList.push(EnqPrintObj);

    $('#tPbody').DataTable({

        data: EnquiryPrintList,

        columns: [

            //{ title: "Item", data: "Item" },
            ////{ data: "ItemId", "visible": false },
             { title: "Prn.No", data: "PrnNo" },
            { title: "Name", data: "PrnDesc" },
            //{ data: "ColorId", "visible": false },
            { title: "Size", data: "PrnSize" },
            //{ data: "SizeID", "visible": false },
            { title: "Placement", data: "PrnPlacement" },
            //{ data: "UomID", "visible": false },
            { title: "No.Of.Type", data: "PrnType" },
              //{ title: "Action", data: "Status" },
                 { title: "No.Of.Colors", data: "PrnColors" },
              //{ title: "Action", data: "Status" },
                 { title: "Quantity", data: "PrnQlty" },
              //{ title: "Action", data: "Status" },
               {
                   title: "ACTION", "mDataProp": null,
                   // "sDefaultContent": '<a id=" 1 " onclick="return EditMfunction(1)" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="1"><i class="fa fa-pencil-square-o" style="cursor: pointer;"></i></a> | <a id=" 1 " onclick="return Delete(this)" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="1"><i class="fa fa-trash-o" style="cursor: pointer;"></i></a>'
                   //"sDefaultContent": '<button type="button" class="btnSelect"> use </button> <a id=" 1 " onclick="return Delete(this)" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="1"><i class="fa fa-trash-o" style="cursor: pointer;"></i></a>'
                   "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnPSelect btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button><button type="button" data-toggle="tooltip" data-placement="top" title="Delete" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnPDel btn btn-round btn-danger"> <i class="fa fa-times"></i> </button>'
               }


        ]
    });
    $('#tPbody').DataTable().destroy();
    $('#ddlColor').val("");
    $('#ddlSize').val("");
    $('#txtCounts').val("");
    $('#txtGsm').val("");
    $('#txtComposition').val("");

    $('#myModalPrint').hide();
}

$(document).on('click', '.btnPSelect', function () {
    debugger;
    var rowindex = $(this).closest('tr').index();

    var currentro12 = EnquiryPrintList.slice(rowindex);

    $('#txtPrnName').val(currentro12[0]['PrnDesc']);
    $('#txtPrnSize').val(currentro12[0]['PrnSize']);
    $('#txtPrnPlacement').val(currentro12[0]['PrnPlacement']);
    $('#txtPrnColors').val(currentro12[0]['PrnColors']);
    $('#txtquality').val(currentro12[0]['PrnQlty']);
    $('#txtPrnNo').val(currentro12[0]['PrnNo']);
    $("#ddlPrnType").val(currentro12[0]['PrnType']);

    $('#myModalPrint').modal('show');
    $('#btnPrnUpdate').show();
    $('#btnPrnAdd').hide();
});
$(document).on('click', '.btnPDel', function () {
    debugger;
    var indexVal = $(this).closest('tr').index();
    document.getElementById("tPbody").deleteRow(indexVal + 1);

    EnquiryPrintList.splice(indexVal, 1);
    var table = $('#tPbody').DataTable();

    var PriId = table.row($(this).parents('tr')).data()["MarkEnqEmbPrintId"];
    //var cl = table.row($(this).parents('tr')).data()["CompSlNo"];
    //var Val = $(this).val();
    DelPriId.push(PriId);
    

});
function UpdateItem() {
    debugger;

    ClearItemList();

    var currentrow34 = EnquiryItemList.slice(rowindex);

    currentrow34[0]['ColorId'] = $("#ddlColor").val();
    currentrow34[0]['Color'] = $("#ddlColor option:selected").text();
    currentrow34[0]['SizeId'] = $("#ddlSize").val();
    currentrow34[0]['Size'] = $("#ddlSize option:selected").text();
    currentrow34[0]['UomId'] = $("#ddluom").val();
    currentrow34[0]['Uom'] = $("#ddluom option:selected").text();
    currentrow34[0]['Quantity'] = $("#txtIQuantity").val();


    EnquiryItemList[rowindex] = currentrow34[0];




    $('#tIbody').DataTable({

        data: EnquiryItemList,

        columns: [

                  { title: "Color", data: "Color" },
            //{ data: "ColorId", "visible": false },
            { title: "Size", data: "Size" },
            //{ data: "SizeID", "visible": false },
            { title: "Uom", data: "Uom" },
            //{ data: "UomID", "visible": false },
            { title: "Quantity", data: "Quantity" },

               {
                   title: "Action", "mDataProp": null,

                   // "sDefaultContent": '<a id=" 1 " onclick="return Editfunction(1)" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="1"><i class="fa fa-pencil-square-o" style="cursor: pointer;"></i></a> | <a id=" 1 " onclick="return Delete(this)" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="1"><i class="fa fa-trash-o" style="cursor: pointer;"></i></a>'
                   //"sDefaultContent": '<button type="button" class="btnSelect"> use </button> <a id=" 1 " onclick="return Delete(this)" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="1"><i class="fa fa-trash-o" style="cursor: pointer;"></i></a>'
                   "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnMSelect btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button><button type="button" data-toggle="tooltip" data-placement="top" title="Delete" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnMDel btn btn-round btn-danger"> <i class="fa fa-times"></i> </button>'
               }
        ]
    });
    $('#tIbody').DataTable().destroy();
    clearTextBox();


}
function ClearItemList() {

    $('#tIbody').DataTable().destroy();
}

function UpdateFabric() {
    debugger;

    ClearFabricList();

    var currentrow34 = EnquiryFabricList.slice(rowindex);

    currentrow34[0]['FabricId'] = $("#ddlFabric").val();
    currentrow34[0]['Fabric'] = $("#ddlFabric option:selected").text();
    currentrow34[0]['ColorId'] = $("#ddlFColor").val();
    currentrow34[0]['Color'] = $("#ddlFColor option:selected").text();
    currentrow34[0]['SizeId'] = $("#ddlFSize").val();
    currentrow34[0]['Size'] = $("#ddlFSize option:selected").text();
    currentrow34[0]['Counts'] = $("#txtCounts").val();
    currentrow34[0]['GSM'] = $("#txtGsm").val();
    currentrow34[0]['Composition'] = $("#txtComposition").val();
    currentrow34[0]['FabDesc'] = $("#txtFabricDesc").val();

    EnquiryFabricList[rowindex] = currentrow34[0];



    $('#tFbody').DataTable({

        data: EnquiryFabricList,

        columns: [

              ////{ data: "ItemId", "visible": false },
            { title: "Fabric", data: "Fabric" },
            //{ data: "ColorId", "visible": false },
            { title: "Size", data: "Size" },
            //{ data: "SizeID", "visible": false },
            { title: "Color", data: "Color" },
            //{ data: "UomID", "visible": false },
            { title: "Counts", data: "Counts" },
              //{ title: "Action", data: "Status" },
                 { title: "GSM", data: "GSM" },
              //{ title: "Action", data: "Status" },
                 { title: "Composition", data: "Composition" },

               {
                   title: "Action", "mDataProp": null,

                   // "sDefaultContent": '<a id=" 1 " onclick="return Editfunction(1)" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="1"><i class="fa fa-pencil-square-o" style="cursor: pointer;"></i></a> | <a id=" 1 " onclick="return Delete(this)" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="1"><i class="fa fa-trash-o" style="cursor: pointer;"></i></a>'
                   //"sDefaultContent": '<button type="button" class="btnSelect"> use </button> <a id=" 1 " onclick="return Delete(this)" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="1"><i class="fa fa-trash-o" style="cursor: pointer;"></i></a>'
                   "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnFSelect btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button><button data-toggle="tooltip" data-placement="top" title="Delete" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" type="button" class="btnFDel btn btn-round btn-danger"> <i class="fa fa-times"></i> </button>'
               }
        ]
    });
    $('#tFbody').DataTable().destroy();
    clearFTextBox();


}
function ClearFabricList() {

    $('#tFbody').DataTable().destroy();
}

function UpdateEmb() {
    debugger;

    ClearEmbList();

    var currentrow34 = EnquiryEmbList.slice(rowindex);

    //currentrow34[0]['FabricId'] = $("#ddlFabric").val();
    //currentrow34[0]['Fabric'] = $("#ddlFabric option:selected").text();
    //currentrow34[0]['ColorId'] = $("#ddlFColor").val();
    //currentrow34[0]['Color'] = $("#ddlFColor option:selected").text();
    //currentrow34[0]['SizeID'] = $("#ddlFSize").val();
    //currentrow34[0]['Size'] = $("#ddlFSize option:selected").text();

    currentrow34[0]['EmbType'] = $("#ddlType").val();
    currentrow34[0]['EmbDesc'] = $("#txtName").val();
    currentrow34[0]['EmbSize'] = $("#txtSize").val();
    currentrow34[0]['EmbPlacement'] = $("#txtPlacement").val();
    currentrow34[0]['EmbNo'] = $("#txtEmbNo").val();
    currentrow34[0]['EmbStiches'] = $("#txtStitch").val();
    currentrow34[0]['EmbColors'] = $("#txtColors").val();



    EnquiryEmbList[rowindex] = currentrow34[0];



    $('#tEbody').DataTable({

        data: EnquiryEmbList,

        columns: [

              ////{ data: "ItemId", "visible": false },
             { title: "Emb No", data: "EmbNo" },
            { title: "Name", data: "EmbDesc" },
            //{ data: "ColorId", "visible": false },
            { title: "Size", data: "EmbSize" },
            //{ data: "SizeID", "visible": false },
            { title: "Placement", data: "EmbPlacement" },
            //{ data: "UomID", "visible": false },
            { title: "No.Of.Stiches", data: "EmbStiches" },
              //{ title: "Action", data: "Status" },
                 { title: "No.Of.Colors", data: "EmbColors" },
              //{ title: "Action", data: "Status" },
                 { title: "Emb Type", data: "EmbType" },

               {
                   title: "Action", "mDataProp": null,

                   // "sDefaultContent": '<a id=" 1 " onclick="return Editfunction(1)" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="1"><i class="fa fa-pencil-square-o" style="cursor: pointer;"></i></a> | <a id=" 1 " onclick="return Delete(this)" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="1"><i class="fa fa-trash-o" style="cursor: pointer;"></i></a>'
                   //"sDefaultContent": '<button type="button" class="btnSelect"> use </button> <a id=" 1 " onclick="return Delete(this)" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="1"><i class="fa fa-trash-o" style="cursor: pointer;"></i></a>'
                   "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnESelect btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button><button type="button" data-toggle="tooltip" data-placement="top" title="Delete" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnEDel btn btn-round btn-danger"> <i class="fa fa-times"></i> </button>'
               }
        ]
    });
    $('#tEbody').DataTable().destroy();
    clearETextBox();


}
function ClearEmbList() {

    $('#tEbody').DataTable().destroy();
}

function UpdatePrint() {
    debugger;

    ClearPrintList();

    var currentrow34 = EnquiryPrintList.slice(rowindex);

    //currentrow34[0]['FabricId'] = $("#ddlFabric").val();
    //currentrow34[0]['Fabric'] = $("#ddlFabric option:selected").text();
    //currentrow34[0]['ColorId'] = $("#ddlFColor").val();
    //currentrow34[0]['Color'] = $("#ddlFColor option:selected").text();
    //currentrow34[0]['SizeID'] = $("#ddlFSize").val();
    //currentrow34[0]['Size'] = $("#ddlFSize option:selected").text();

    currentrow34[0]['PrnDesc'] = $("#txtPrnName").val();
    currentrow34[0]['PrnSize'] = $("#txtPrnSize").val();
    currentrow34[0]['PrnPlacement'] = $("#txtPrnPlacement").val();
    currentrow34[0]['PrnColors'] = $("#txtPrnColors").val();
    currentrow34[0]['PrnQlty'] = $("#txtquality").val();
    currentrow34[0]['PrnNo'] = $("#txtPrnNo").val();
    currentrow34[0]['PrnType'] = $("#ddlPrnType").val();




    EnquiryPrintList[rowindex] = currentrow34[0];



    $('#tPbody').DataTable({

        data: EnquiryPrintList,

        columns: [

            ////{ data: "ItemId", "visible": false },
            { title: "Prn.No", data: "PrnNo" },
            { title: "Name", data: "PrnDesc" },
            //{ data: "ColorId", "visible": false },
            { title: "Size", data: "PrnSize" },
            //{ data: "SizeID", "visible": false },
            { title: "Placement", data: "PrnPlacement" },
            //{ data: "UomID", "visible": false },
            { title: "No.Of.Type", data: "PrnType" },
              //{ title: "Action", data: "Status" },
                 { title: "No.Of.Colors", data: "PrnColors" },
              //{ title: "Action", data: "Status" },
                 { title: "Quantity", data: "PrnQlty" },

               {
                   title: "Action", "mDataProp": null,

                   // "sDefaultContent": '<a id=" 1 " onclick="return Editfunction(1)" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="1"><i class="fa fa-pencil-square-o" style="cursor: pointer;"></i></a> | <a id=" 1 " onclick="return Delete(this)" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="1"><i class="fa fa-trash-o" style="cursor: pointer;"></i></a>'
                   //"sDefaultContent": '<button type="button" class="btnSelect"> use </button> <a id=" 1 " onclick="return Delete(this)" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="1"><i class="fa fa-trash-o" style="cursor: pointer;"></i></a>'
                   "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnPSelect btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button><button type="button" data-toggle="tooltip" data-placement="top" title="Delete" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnPDel btn btn-round btn-danger"> <i class="fa fa-times"></i> </button>'
               }
        ]
    });
    $('#tPbody').DataTable().destroy();
    clearPTextBox();


}
function ClearPrintList() {

    $('#tPbody').DataTable().destroy();
}

function MainList() {
    debugger;

    var EntryNo = "";
    var EntNo = $('select#ddlEntryNo option:selected').val();

    if (EntNo == 0) {
        EntryNo == "";
    }
    else {

        EntryNo = $('select#ddlEntryNo option:selected').val();
    }

    var RefNo = "";
    var RNo = $('select#ddlRefNo option:selected').val();

    if (RNo == 0) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlRefNo option:selected').val();
    }

    var cmpid = $('#ddlMCompany').val();
    var buyid = $('#ddlMBuyer').val();
    var styid = $('#ddlMStyle').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();


    $.ajax({
        url: "/Enquiry/ListEnquiryEntry",
        data: JSON.stringify({ CompanyId: cmpid, EnquiryNo: EntryNo, BuyerId: buyid, StyleId: styid, frmDate: FDate, ToDate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger
            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");
            $('#tMbody').DataTable({
                data: dataSet,
                scrollY: 300,
                scrollCollapse: true,
                paging: false,
                fixedColumns: false,
                select: false,
                scrollX: "100%",
                scrollXInner: "100%",
                scroller: false,
                columns: [
                          { title: "EnquiryId", "visible": false },
                         { title: "Buyer" },
                         { title: "Enquiry No" },
                         { title: "Enquiry Date" },
                         { title: "Buyer RefNo" },
                         { title: "Style" },
                         { title: "Action" },
                ]

            });

        },

        failure: function (errMsg) {
            debugger
            alert(errMsg);
        }
    });
   
}

function CMainList() {
    $('#tMbody').DataTable().destroy();

    MainList();
}

function List() {
    $('#tMbody').DataTable().destroy();

    MainList();
}

function EMainList() {
    $('#tMbody').DataTable().destroy();

    MainList();
}

function BMainList() {
    $('#tMbody').DataTable().destroy();

    MainList();
}
function RMainList() {
    $('#tMbody').DataTable().destroy();

    MainList();
}
function SMainList() {
    $('#tMbody').DataTable().destroy();

    MainList();
}
function getbyID(MasID) {
    debugger;
    $('#txtEnqMasId').val("");
    $('#ddlPayment').empty();
    $('#ddlShipMode').empty();
    $('#ddlSeason').empty();

    LoadPayTermsDDL("#ddlPayment");
    LoadShipmodeDDL("#ddlShipMode");
    LoadSeasonDDL("#ddlSeason");
    LoadBuyerDDL("#ddlBuyer");
    LoadCompanyDDL("#ddlCompany");


    $.ajax({
        url: "/Enquiry/EditMainList/" + MasID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                $('#EnquiryNo').val(obj.EnquiryNo);
                $('#dtEnquiryDate').val(moment(obj.EnqDate).format('DD/MM/YYYY'));
                $('#BuyerRefDate').val(moment(obj.RefDate).format('DD/MM/YYYY'));
                $('#TargetDate').val(moment(obj.DespDate).format('DD/MM/YYYY'));
                $('#BuyerRefNo').val(obj.BuyerRef);
                $('#ddlPayment').val(obj.TermsId);
                $('#ddlCompany').val(obj.CompanyId);
                $('#ddlBuyer').val(obj.BuyerId);
                $('#ddlShipsystem').val(obj.ShipSystemId);
                //  $('#ddlUom').val(obj.GUomId);
                //   $('#ddlStyle').val(obj.StyleId);
                $('#txtEnqMasId').val(obj.EnquiryId);
              
                EnqID = $('#txtEnqMasId').val();
            
                //alert(EnqID);
                //$('#ddlShipMode').val(obj.ShipModeId);
                //$('#txtCRefNo').val(obj.Ref_No);
                //$('#txtAVBNo').val(obj.AWBNo);
                //$('#txtAWBDate').val(moment(obj.AWBDate).format('MM/DD/YYYY'));
                //$('#txtCourierMasId').val(obj.Courier_MasId);
                // EditDetList(MasID);


                EnquiryItemList = obj.EnquiryItem;
                loadItemTable(EnquiryItemList);
                EnquiryFabricList = obj.EnquiryFabric;
                loadFabricTable(EnquiryFabricList);
                EnquiryEmbList = obj.EnquiryEmbPrint;
                loadEmbTable(EnquiryEmbList);
                EnquiryPrintList = obj.EnquiryPrint;
                loadPrintTable(EnquiryPrintList);

                debugger;
                obdet = obj.EnquiryStyle;
                var currentro12 = obdet.slice(0);
                $('#DepartmentM').val(currentro12[0].Department);
                $('#Quantity').val(currentro12[0].Quantity);
                $('#Descrip').val(currentro12[0].StyleDesc);
                $('#ContactPerson').val(currentro12[0].ContactPerson);
                $('#Style').val(currentro12[0].BuyerStyle)
                $('#ddlShipMode').val(currentro12[0].ShipmentModeId);
                $('#ddlSeason').val(currentro12[0].SeasonId);
                $('#BuyerStyle').val(currentro12[0].BuyerStyle);
                $('#ddlUom').val(currentro12[0].GUomId);
                $('#txtGarmentConID').val(currentro12[0].GUomConv);
                $('#ddlStyle').val(currentro12[0].StyleId);
                // $('#ddlPayment').val(obj.TermsId);
                //$('#dtEnquiryDate').val(moment(obj.EnqDate).format('MM/DD/YYYY'));
                //$('#BuyerRefDate').val(moment(obj.RefDate).format('MM/DD/YYYY'));
                //$('#TargetDate').val(moment(obj.DespDate).format('MM/DD/YYYY'));
                //$('#BuyerRefNo').val(obj.BuyerRef);
                //$('#ddlPayment').val(obj.TermsId);

                debugger;
                $('#myModal1').modal('show');
                $('#btnUpdate').show();
                $('#btnAdd').hide();

            }
            else {

            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });

    return false;
}

function loadItemTable(EnquiryItemList) {

  
    //var table = $('#tIbody').DataTable();
    //table.clear().draw();

    debugger;
    $('#tIbody').DataTable({
        data: EnquiryItemList,
        columns: [
               ////{ data: "ItemId", "visible": false },
            { title: "Color", data: "Color" },
            //{ data: "ColorId", "visible": false },
            { title: "Size", data: "Size" },
            //{ data: "SizeID", "visible": false },
            { title: "Uom", data: "Uom" },
            //{ data: "UomID", "visible": false },
            { title: "Quantity", data: "Quantity" },
               {
                   title: "ACTION", "mDataProp": null,
                   //"sDefaultContent": '<button type="button" class="btnedit"> Edit </button> <a id=" 1 " onclick="return DeleteChild(this)" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="1"><i class="fa fa-trash-o" style="cursor: pointer;"></i></a>'
                   "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnMSelect btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button><button type="button" data-toggle="tooltip" data-placement="top" title="Delete" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnMDel btn btn-round btn-danger"> <i class="fa fa-times"></i> </button>'
               }
        ]
    });
}

function loadFabricTable(EnquiryFabricList) {
    // $('#tIbody').DataTable().destroy();

    //var table = $('#tIbody').DataTable();
    //table.clear().draw();

    debugger;
    $('#tFbody').DataTable({
        data: EnquiryFabricList,
        columns: [
               ////{ data: "ItemId", "visible": false },
            { title: "Fabric", data: "Fabric" },
            //{ data: "ColorId", "visible": false },
            { title: "Size", data: "Size" },
            //{ data: "SizeID", "visible": false },
            { title: "Color", data: "Color" },
            //{ data: "UomID", "visible": false },
            { title: "Counts", data: "Counts" },
              //{ title: "Action", data: "Status" },
                 { title: "GSM", data: "GSM" },
              //{ title: "Action", data: "Status" },
                 { title: "Composition", data: "Composition" },
               {
                   title: "ACTION", "mDataProp": null,
                   //"sDefaultContent": '<button type="button" class="btnedit"> Edit </button> <a id=" 1 " onclick="return DeleteChild(this)" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="1"><i class="fa fa-trash-o" style="cursor: pointer;"></i></a>'
                   "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Delete" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnFSelect btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button><button type="button" data-toggle="tooltip" data-placement="top" title="Delete" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnFDel btn btn-round btn-danger"> <i class="fa fa-times"></i> </button>'
               }
        ]
    });
}
function loadEmbTable(EnquiryEmbList) {
    // $('#tIbody').DataTable().destroy();

    //var table = $('#tIbody').DataTable();
    //table.clear().draw();

    debugger;
    $('#tEbody').DataTable({
        data: EnquiryEmbList,
        columns: [
               ////{ data: "ItemId", "visible": false },
          { title: "Emb No", data: "EmbNo" },
            { title: "Name", data: "EmbDesc" },
            //{ data: "ColorId", "visible": false },
            { title: "Size", data: "EmbSize" },
            //{ data: "SizeID", "visible": false },
            { title: "Placement", data: "EmbPlacement" },
            //{ data: "UomID", "visible": false },
            { title: "No.Of.Stiches", data: "EmbStiches" },
              //{ title: "Action", data: "Status" },
                 { title: "No.Of.Colors", data: "EmbColors" },
              //{ title: "Action", data: "Status" },
                 { title: "EmbType", data: "EmbType" },
               {
                   title: "ACTION", "mDataProp": null,
                   //"sDefaultContent": '<button type="button" class="btnedit"> Edit </button> <a id=" 1 " onclick="return DeleteChild(this)" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="1"><i class="fa fa-trash-o" style="cursor: pointer;"></i></a>'
                   "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnESelect btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button><button type="button" data-toggle="tooltip" data-placement="top" title="Delete" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnEDel btn btn-round btn-danger"> <i class="fa fa-times"></i> </button>'
               }
        ]
    });
}

function loadPrintTable(EnquiryPrintList) {
    // $('#tPbody').DataTable().destroy();

    //var table = $('#tIbody').DataTable();
    //table.clear().draw();

    debugger;
    $('#tPbody').DataTable({
        data: EnquiryPrintList,
        columns: [
               ////{ data: "ItemId", "visible": false },
     { title: "Prn.No", data: "PrnNo" },
            { title: "Name", data: "PrnDesc" },
            //{ data: "ColorId", "visible": false },
            { title: "Size", data: "PrnSize" },
            //{ data: "SizeID", "visible": false },
            { title: "Placement", data: "PrnPlacement" },
            //{ data: "UomID", "visible": false },
            { title: "No.Of.Type", data: "PrnType" },
              //{ title: "Action", data: "Status" },
                 { title: "No.Of.Colors", data: "PrnColors" },
              //{ title: "Action", data: "Status" },
                 { title: "Quantity", data: "PrnQlty" },
               {
                   title: "ACTION", "mDataProp": null,
                   //"sDefaultContent": '<button type="button" class="btnedit"> Edit </button> <a id=" 1 " onclick="return DeleteChild(this)" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="1"><i class="fa fa-trash-o" style="cursor: pointer;"></i></a>'
                   "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnPSelect btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button><button type="button" data-toggle="tooltip" data-placement="top" title="Delete" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnPDel btn btn-round btn-danger"> <i class="fa fa-times"></i> </button>'
               }
        ]
    });
}

function Mainclose() {
    $('#myModal1').modal('hide');
    window.location.reload(true);
}
function Delete(ID) {


    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        LoadingSymb();
        $.ajax({
            url: "/Enquiry/Delete/" + ID,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                $('#tMbody').DataTable().destroy();
                MainList();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}
function EnqUpdate() {
    // window.location.reload(true);

    var objEditSubmit = {
        //CompanyId: $('#ddlCompany').val(),
        //EntryDate: new Date($('#txtEntryDate').val()),
        //Ref_No: $('#txtRefNo').val(),
        //CourierId: $('#ddlCourier').val(),
        //DespType: "B",
        //DespLocationId: 1,
        //AWBNo: $('#txtAVBNo').val(),
        //AWBDate: new Date($('#txtAWBDate').val()),
        //ContactPerson: $('#txtConPerson').val(),
        //Ref_No: $('#txtCRefNo').val(),
        //EntryNo: $('#txtEntryNo').val(),
        //Courier_MasId: $('#txtCourierMasId').val(),
        //CourierItem: courierItemList
        SeasonId: $('#ddlSeason').val(),
        ShipSystemId: $('#ddlShipsystem').val(),
        ShipModeId: $('#ddlShipMode').val(),
        TermsId: $('#ddlPayment').val(),
        BuyerId: $('#ddlBuyer').val(),
        BuyerRef: $('#BuyerRefNo').val(),
        CompanyId: $('#ddlCompany').val(),
        EnquiryNo: $('#EnquiryNo').val(),
        EnquiryId: $('#txtEnqMasId').val(),
        EnqDate: $('#dtEnquiryDate').val(),
        //EnqDate: new Date($('#dtEnquiryDate').val()),
        RefDate: $('#BuyerRefDate').val(),
        //RefDate: new Date($('#BuyerRefDate').val()),
        DespDate: $('#TargetDate').val(),
        //DespDate: new Date($('#TargetDate').val()),

        //markbuystyle

        StyleId: $('#ddlStyle').val(),
        BuyerStyle: $('#BuyerStyle').val(),
        StyleDesc: $('#Descrip').val(),
        QuotaCateId: 0,//$('#Description').val(),
        Quantity: $('#Quantity').val(),
        GUomId: $('#ddlUom').val(),
        GUomConv: $('#txtGarmentConID').val(),
        ContactPerson: $('#ContactPerson').val(),
        ShipModeId: $('#ddlShipMode').val(),
        Department: $('#DepartmentM').val(),
        Season: $('#ddlSeason').val(),
        CreatedBy: GUserid,
        DelItemId: DelItemId,
        DelFabId: DelFabId,
        DelEmbId: DelEmbId,
        DelPriId: DelPriId,
        EnquiryItem: EnquiryItemList,
        EnquiryFabric: EnquiryFabricList,
        EnquiryEmbPrint: EnquiryEmbList,
        EnquiryPrint: EnquiryPrintList,
    };
    LoadingSymb();
    $.ajax({
        url: "/Enquiry/Update",
        data: JSON.stringify(objEditSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            alert("Data Updated Successfully");

            window.location.reload(true);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

