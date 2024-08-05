

var courierItemList = [];
//var rowindex = -1;
var CourMasID = 0;
var courNoDDL = "#";
var MainFDate = 0;
var rowindex = 0;
$(document).ready(function () {
    //GenerateNumber();

    //LoadBaseUnitAdd();
    //LoadShipmodeDDL("#ddlShipMode");
    //LoadShipsystemDDL("#ddlShipsystem");
    //LoadPayTermsDDL("#ddlPayment");

    if (CourMasID == 0) {
        LoadBuyerDDL("#ddlBuyer,#ddlMBuyer");
    }
    //LoadBuyerDDL("#ddlMBuyer");
    LoadCompanyDDL("#ddlCompany,#ddlMCompany");
    LoadCourDDL("#ddlCourier");
    LoadItemDDL("#ddlItem");
    LoadUomDDL("#ddluom");
    LoadColorDDL("#ddlColor");
    LoadSizeDDL("#ddlSize");
    MainFDate = $("#hdMainFromDate").data('value');
    getDate();
    LoadCourNoDDL("#ddlEntryNo");
    if (CourMasID == 0) {
        LoadDBuyer();
    }
    LoadCompanyUnitDDL("#ddlDispatch");
    MainList();
});

function LoadCourNoDDL(CourNoDDL) {
    courNoDDL = CourNoDDL;
    httpGet("/CourierEntry/GetEntryNo", onEntryNoSuccess, onEntryNoFailure);
}
function onEntryNoSuccess(result) {
    if (result.Status == "SUCCESS") {
        var data = result.Value;

        var data = result.Value;
        $(courNoDDL).append($('<option/>').val('0').text('--Select Entry No--'));
        $.each(data, function () {
            $(courNoDDL).append($('<option></option>').text(this.EntryNo));
        });
    }
    else {
        alert('EntryNo loading failed');
    }
}

function onEntryNoFailure(result) {
    alert('EntryNo loading failed');
}
function List() {

    $('#tCbody').DataTable().destroy();

    MainList();
}

function LoadDBuyer() {
    LoadBuyerDDL("#ddlDesLoc,#ddlMDesLoc");
    $('#LabSup').hide();
    $('#LabBuy').show();

}

function LoadDSupplier() {
    LoadSupplierDDL("#ddlDesLoc,#ddlMDesLoc");

    $('#LabBuy').hide();
    $('#LabSup').show();
}

function LoadDUnit() {
    LoadCompanyUnitDDL("#ddlDesLoc,#ddlMDesLoc");
}

function getDate() {
    var todaydate = new Date();
    var day = todaydate.getDate();
    var Pmonth = todaydate.getMonth() - 2;
    var Cmonth = todaydate.getMonth() + 1;
    var year = todaydate.getFullYear();
    var datestring = Pmonth + "/" + day + "/" + year;
    var Fdatestring = Cmonth + "/" + day + "/" + year;

    var day = new Date(),
        year = ((day.getMonth() - 2) < 0) ? (day.getFullYear() - 1) : day.getFullYear(),
        month = ((day.getMonth() - 2) < 0) ? (12 + (day.getMonth() - 2)) : (day.getMonth() + 1),
        date = month + '/' + day.getDate() + '/' + year;


    $('#txtEntryDate').val(Fdatestring);
    $('#txtAWBDate').val(Fdatestring);
    $('#txtFromDate').val(MainFDate);
    $('#txtToDate').val(Fdatestring);

}
var table, column, compId, Docum;

function GenerateNumber(table, column, compId, Docum) {

    debugger;
    table = "Courier_Mas",
    column = "EntryNo",
    compId = $('#ddlCompany').val(),
    Docum = 'COURIER'

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

function save() {

    
    var res = validate();
    if (res == false) {
        return false;
    }
    //if ($('#ddlCompany').val() == 0) {
    //    alert('select Company..')
    //    return true
    //}
    //if ($('#ddlCourier').val() == 0) {
    //    alert('select Courier..')
    //    return true
    //}
    //if ($('#ddlDesLoc').val() == 0) {
    //    alert('select DespatchLocation..')
    //    return true
    //}
    //if ($('#txtCRefNo').val() == '') {
    //    alert('enter ReferNo..')
    //    return true
    //}
    //if ($('#txtAVBNo').val() == '') {
    //    alert('enter AVBNo..')
    //    return true
    //}
    //if ($('#txtConPerson').val() == '') {
    //    alert('enter Contact Persion..')
    //    return true
    //}
   
    var Returnable = $('#Return').is(":checked");
   
    var CourType = $('#CourType').val();
    var LocType = $('input[name="DType"]:checked').attr('value');

    var objSubmit = {
        CompanyId: $('#ddlCompany').val(),
        EntryDate: $('#txtEntryDate').val(),//new Date($('#txtEntryDate').val()),
        Ref_No: $('#txtRefNo').val(),
        CourierId: $('#ddlCourier').val(),
        DespType: LocType,
        DespLocationId: $('#ddlDesLoc').val(),
        AWBNo: $('#txtAVBNo').val(),
        AWBDate: $('#txtAWBDate').val(),//new Date($('#txtAWBDate').val()),
        ContactPerson: $('#txtConPerson').val(),
        Ref_No: $('#txtCRefNo').val(),
        EntryNo: $('#txtEntryNo').val(),
        InOrOut: CourType,
        ReturnStatus: Returnable,

        CourierItem: courierItemList

    };
    LoadingSymb();
    $.ajax({
        url: "/CourierEntry/SaveCourier",
        data: JSON.stringify(objSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            alert("Data Saved Successfully");
            window.location.reload(true);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
//Valdidation using jquery
function validate() {

    var isValid = true;
    if ($('#txtEntryDate').val().trim() == "") {
        $('#txtEntryDate').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtEntryDate').css('border-color', 'lightgrey');
    }

    if ($('#txtEntryNo').val().trim() == "") {
        $('#txtEntryNo').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtEntryNo').css('border-color', 'lightgrey');
    }
    if ($('#txtAWBDate').val().trim() == "") {
        $('#txtAWBDate').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtAWBDate').css('border-color', 'lightgrey');
    }

    if ($('#ddlCourier').val() == 0) {
        $('#ddlCourier').css('border-color', 'Red');
        isValid = false;
        var msg = 'Please select courier...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
    }
    else {
        $('#ddlCourier').css('border-color', 'lightgrey');
    }
    if ($('#txtCRefNo').val().trim() == "") {
        $('#txtCRefNo').css('border-color', 'Red');
        isValid = false;
        var msg = 'Please enter Refer Number...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
    }
    else {
        $('#txtCRefNo').css('border-color', 'lightgrey');
    }

    if ($('#ddlDesLoc').val() == 0) {
        $('#ddlDesLoc').css('border-color', 'Red');
        isValid = false;
        var msg = 'Please select despatch location...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
    }
    else {
        $('#ddlDesLoc').css('border-color', 'lightgrey');
    }

    if ($('#txtAVBNo').val().trim() == "") {
        $('#txtAVBNo').css('border-color', 'Red');
        isValid = false;
        var msg = 'Please enter AVB Number...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
    }
    else {
        $('#txtAVBNo').css('border-color', 'lightgrey');
    }
    if ($('#txtConPerson').val().trim() == "") {
        $('#txtConPerson').css('border-color', 'Red');
        isValid = false;
        var msg = 'Please enter contact person...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
    }
    else {
        $('#txtConPerson').css('border-color', 'lightgrey');
    }
    if ($('#ddlCompany').val() == 0) {
        $('#ddlCompany').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlCompany').css('border-color', 'lightgrey');
    }

    //if ($('#ddlItem').val() == 0) {
    //    $('#ddlItem').css('border-color', 'Red');
    //    isValid = false;
    //}
    //else {
    //    $('#ddlItem').css('border-color', 'lightgrey');
    //}
    //if ($('#ddlColor').val() == 0) {
    //    $('#ddlColor').css('border-color', 'Red');
    //    isValid = false;
    //}
    //else {
    //    $('#ddlColor').css('border-color', 'lightgrey');
    //}
    //if ($('#ddlSize').val() == 0) {
    //    $('#ddlSize').css('border-color', 'Red');
    //    isValid = false;
    //}
    //else {
    //    $('#ddlSize').css('border-color', 'lightgrey');
    //}
    //if ($('#ddluom').val() == 0) {
    //    $('#ddluom').css('border-color', 'Red');
    //    isValid = false;
    //}
    //else {
    //    $('#ddluom').css('border-color', 'lightgrey');
    //}
    //if ($('#txtQuantity').val().trim() == "") {
    //    $('#txtQuantity').css('border-color', 'Red');
    //    isValid = false;
    //}
    //else {
    //    $('#txtQuantity').css('border-color', 'lightgrey');
    //}
    //if ($('#ddlUom').val() == 0) {
    //    $('#ddlUom').css('border-color', 'Red');
    //    isValid = false;
    //}
    //else {
    //    $('#ddlUom').css('border-color', 'lightgrey');
    //}
    //if ($('#ddlPayment').val() == 0) {
    //    $('#ddlPayment').css('border-color', 'Red');
    //    isValid = false;
    //}
    //else {
    //    $('#ddlPayment').css('border-color', 'lightgrey');
    //}
    //if ($('#ddlBuyer').val() == 0) {
    //    $('#ddlBuyer').css('border-color', 'Red');
    //    isValid = false;
    //}
    //else {
    //    $('#ddlBuyer').css('border-color', 'lightgrey');
    //}


    //item

    return isValid;
}
function Add() {
    debugger;

    if (CourMasID > 0) {
        $('#tbody').DataTable().destroy();
    }
    if ($('#ddlItem').val() == 0) {
        alert('select Item..')
        return true
    }
    if ($('#ddlColor').val() == 0) {
        alert('select color..')
        return true
    }
    if ($('#ddlSize').val() == 0) {
        alert('select size..')
        return true
    }
    if ($('#ddluom').val() == 0) {
        alert('select uom..')
        return true
    }
    if ($('#txtQuantity').val() == '') {
        alert('enter qty..')
        return true
    }
    var CourItemObj = {
        Item: $("#ddlItem option:selected").text(),
        ItemId: $('#ddlItem').val(),
        Color: $("#ddlColor option:selected").text(),
        ColorId: $('#ddlColor').val(),
        Size: $("#ddlSize option:selected").text(),
        SizeId: $('#ddlSize').val(),
        Uom: $("#ddluom option:selected").text(),
        UomId: $('#ddluom').val(),
        Quantity: $('#txtQuantity').val(),

        Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
    };

    courierItemList.push(CourItemObj);

   
    $('#tbody').DataTable({
        data: courierItemList,
        columns: [
            { title: "ITEM", data: "Item" },

            { title: "COLOR", data: "Color" },

            { title: "SIZE", data: "Size" },

            { title: "UOM", data: "Uom" },
            //{ title: "UomID", data: "UomID", "visible": false },            
            { title: "QTY", data: "Quantity" },
               {
                   title: "ACTION", "mDataProp": null,
                   // "sDefaultContent": '<a id=" 1 " onclick="return Editfunction(1)" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="1"><i class="fa fa-pencil-square-o" style="cursor: pointer;"></i></a> | <a id=" 1 " onclick="return Delete(this)" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="1"><i class="fa fa-trash-o" style="cursor: pointer;"></i></a>'
                   //"sDefaultContent": '<button type="button" class="btnSelect"> use </button> <a id=" 1 " onclick="return Delete(this)" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="1"><i class="fa fa-trash-o" style="cursor: pointer;"></i></a>'
                   "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnSelect btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button><button type="button" data-toggle="tooltip" data-placement="top" title="Delete" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnDel btn btn-round btn-danger"> <i class="fa fa-times"></i> </button>'
               }
        ]
    });
    $('#tbody').DataTable().destroy();
    $('#ddlItem').val(0).trigger('change');
    $('#ddlColor').val(0).trigger('change');
    $('#ddlSize').val(0).trigger('change');
    $('#ddluom').val(0).trigger('change');
    $('#txtQuantity').val("");
}

function Delete(ID) {


    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        LoadingSymb();
        $.ajax({
            url: "/CourierEntry/Delete/" + ID,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                $('#tCbody').DataTable().destroy();
                MainList();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

$(document).ready(function () {

    // MainList();

    $(document).on('click', '.btnSelect', function () {
        debugger;
        //var rowindex = $(this).closest('tr').index();

        //var currentro12 = courierItemList.slice(rowindex);
        rowindex = $(this).closest('tr').index();
        var currentro12 = courierItemList.slice(rowindex);

        $("#ddlItem").val(currentro12[0]['ItemId']).trigger('change');
        $("#ddlColor").val(currentro12[0]['ColorId']).trigger('change');
        $("#ddlSize").val(currentro12[0]['SizeId']).trigger('change');
        $("#ddluom").val(currentro12[0]['UomId']).trigger('change');
        $('#txtQuantity').val(currentro12[0]['Quantity']);

        
        $('#btncourieradd').hide();
        $('#btncourierupdate').show();
    });

    $(document).on('click', '.btnDel', function () {
        debugger;
        var indexVal = $(this).closest('tr').index();

        document.getElementById("tbody").deleteRow(indexVal + 1);

        courierItemList.splice(indexVal, 1);

    });

    $(document).on('click', '.btnMSelect', function () {
        debugger;
        //LoadItemDDL("#ddlItem");
        //LoadUomDDL("#ddluom");
        //LoadColorDDL("#ddlColor");
        //LoadSizeDDL("#ddlSize");

        rowindex = $(this).closest('tr').index();

        var currentro12 = courierItemList.slice(rowindex);

        $("#ddlItem").val(currentro12[0]['ItemId']);
        $("#ddlColor").val(currentro12[0]['ColorId']);
        $("#ddlSize").val(currentro12[0]['SizeId']);
        $("#ddluom").val(currentro12[0]['UomId']);
        $('#txtQuantity').val(currentro12[0]['Quantity']);

        $('#myModal2').modal('show');
        $('#btnUpdate').show();
        $('#btnAdd').hide();
    });
});

//Function for clearing the textboxes
function clearTextBox() {
    debugger;
    $('#ddlItem').val("");
    $('#ddlColor').val("");
    $('#ddlSize').val("");
    $('#ddluom').val("");
    $('#txtQuantity').val("");
    // $('#ddlDispatch').val("");
    //$('#ddlCompany').val("");

    $('#btnUpdate').hide();
    $('#btnAdd').show();

    $('#ddlItem').css('border-color', 'lightgrey');
    $('#ddlColor').css('border-color', 'lightgrey');
    $('#ddlSize').css('border-color', 'lightgrey');
    $('#ddluom').css('border-color', 'lightgrey');
    $('#txtQuantity').css('border-color', 'lightgrey');
    //LoadCompanyUnitDDL("#ddlDispatch");
    //LoadCompanyDDL("#ddlCompany");
    LoadItemDDL("#ddlItem");
    LoadUomDDL("#ddluom");
    LoadColorDDL("#ddlColor");
    LoadSizeDDL("#ddlSize");
    GenerateNumber();
}

function changeDesc(value) {
    for (var i in courierItemList) {
        if (courierItemList[i] == value) {
            //courierItemList[i].desc = desc;
            break; //Stop this loop, we found it!
        }
    }
}

function Update() {
    debugger;
    if ($('#ddlItem').val() == 0) {
        alert('select Item..')
        return true
    }
    if ($('#ddlColor').val() == 0) {
        alert('select color..')
        return true
    }
    if ($('#ddlSize').val() == 0) {
        alert('select size..')
        return true
    }
    if ($('#ddluom').val() == 0) {
        alert('select uom..')
        return true
    }
    if ($('#txtQuantity').val() == '') {
        alert('enter qty..')
        return true
    }
    ClearDetList();

    //var currentrow34 = courierItemList.slice(rowindex);

    var currentrow34 = courierItemList.slice(rowindex);

    //currentrowsel[0]['particularid'] = $("#ddlItem").val();

    currentrow34[0]['ItemId'] = $("#ddlItem").val();
    currentrow34[0]['Item'] = $("#ddlItem option:selected").text();
    currentrow34[0]['ColorId'] = $("#ddlColor").val();
    currentrow34[0]['Color'] = $("#ddlColor option:selected").text();
    currentrow34[0]['SizeId'] = $("#ddlSize").val();
    currentrow34[0]['Size'] = $("#ddlSize option:selected").text();
    currentrow34[0]['UomId'] = $("#ddluom").val();
    currentrow34[0]['Uom'] = $("#ddluom option:selected").text();
    currentrow34[0]['Quantity'] = $("#txtQuantity").val();

    courierItemList[rowindex] = currentrow34[0];

    $('#tbody').DataTable({

        data: courierItemList,

        columns: [

            { title: "Item", data: "Item" },

            { title: "Color", data: "Color" },

            { title: "Size", data: "Size" },

            { title: "Uom", data: "Uom" },

            { title: "Quantity", data: "Quantity" },

               {
                   title: "Action", "mDataProp": null,

                   // "sDefaultContent": '<a id=" 1 " onclick="return Editfunction(1)" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="1"><i class="fa fa-pencil-square-o" style="cursor: pointer;"></i></a> | <a id=" 1 " onclick="return Delete(this)" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="1"><i class="fa fa-trash-o" style="cursor: pointer;"></i></a>'
                   //"sDefaultContent": '<button type="button" class="btnSelect"> use </button> <a id=" 1 " onclick="return Delete(this)" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="1"><i class="fa fa-trash-o" style="cursor: pointer;"></i></a>'
                   "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnSelect btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button><button type="button" data-toggle="tooltip" data-placement="top" title="Delete" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnDel btn btn-round btn-danger"> <i class="fa fa-times"></i> </button>'
               }
        ]
    });
    $('#tbody').DataTable().destroy();
    clearTextBox();
    $('#btncourieradd').show();
    $('#btncourierupdate').hide();

}

function Close() {
    $('#myModal2').modal('hide');
}

function MainList() {

    var cmpid = $('#ddlMCompany').val();
    var EntryNo = "";
    var EntNo = $('select#ddlEntryNo option:selected').val();

    if (EntNo == 0) {
        EntryNo == "";
    }
    else {

        EntryNo = $('select#ddlEntryNo option:selected').val();
    }
    // var OrdNo = $('#ddlOrderNo').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var desid = $('#ddlMDesLoc').val();

    var DespType = $('input[name="MDType"]:checked').attr('value');


    $.ajax({
        url: "/CourierEntry/ListCourierEntry",
        data: JSON.stringify({ CompanyId: cmpid, EntryNo: EntryNo, frmDate: FDate, ToDate: TDate, DespLocationId: desid, DespType: DespType }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {

            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");
            $('#tCbody').DataTable({
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
                         { title: "Courier_MasId", "visible": false },
                         { title: "Courier" },
                         { title: "Entry No" },
                         { title: "Entry Date" },
                         { title: "Desp Location" },
                         { title: "Action" },
                ]

            });

        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function CMainList() {
    $('#tCbody').DataTable().destroy();

    MainList();
}

function EMainList() {
    $('#tCbody').DataTable().destroy();

    MainList();
}

function getbyID(MasID) {
    debugger;
    $('#ddlDispatch').empty();
    // $('#ddlCompany').empty();

    //LoadCompanyUnitDDL("#ddlDispatch");
    LoadCompanyDDL("#ddlCompany");
    LoadCompanyDDL("#ddlMCompany");
    
    //LoadCompanyUnitDDL("#ddlDesLoc");
    $.ajax({
        url: "/CourierEntry/EditMainList/" + MasID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                $('#txtEntryNo').val(obj.EntryNo);
                $('#txtEntryDate').val(moment(obj.EntryDate).format('DD/MM/YYYY'));
                $('#txtConPerson').val(obj.ContactPerson);
                $('#txtCRefNo').val(obj.Ref_No);
                $('#txtAVBNo').val(obj.AWBNo);
                $('#txtAWBDate').val(moment(obj.AWBDate).format('DD/MM/YYYY'));
                $('#ddlCourier').val(obj.CourierId);
                //$('#ddlDispatch').val(obj.DespLocationId);
                $('#ddlCompany').val(obj.CompanyId);
                $('#txtCourierMasId').val(obj.Courier_MasId);
               
                $("#Return").prop("checked", obj.ReturnStatus);

                $('#CourierMode').val(obj.InOrOut);

                var DType = obj.DespType;
                var LocId = obj.DespLocationId;

                if (DType == "B") {
                    LoadBuyerDDL("#ddlDesLoc");
                    $('#ddlDesLoc').val(obj.DespLocationId).trigger('change');
                }  else if (DType == "S") {
                    LoadSupplierDDL("#ddlDesLoc");
                    $('#ddlDesLoc').val(obj.DespLocationId).trigger('change');
                }


                if (DType == "B") {


                    $("#optB").prop("checked", true);
                    $("#optS").prop("checked", false);
                    $("#optU").prop("checked", false);

                } else if (DType == "U") {


                    $("#optB").prop("checked", false);
                    $("#optS").prop("checked", false);
                    $("#optU").prop("checked", true);
        

                } else if (DType == "S") {

                    $("#optB").prop("checked", false);
                    $("#optS").prop("checked", true);
                    $("#optU").prop("checked", false);
                }


                CourMasID = $('#txtCourierMasId').val();


                EditDetList(MasID);
                debugger;
                $('#myModal1').modal('show');
                $('#btnMUpdate').show();
                $('#btnMAdd').hide();

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

function LoadBuyerEdit(LocId) {
}
function LoadUnitEdit(LocId) {
}
function LoadSuppEdit(LocId) {
}
function EditDetList(MasID) {
    debugger;

    $.ajax({
        url: "/CourierEntry/ListCourierDetDetails/" + MasID,
        data: JSON.stringify({}),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            LoadChildDataToArray(result);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadChildDataToArray(result) {
    var gridData = [];
    debugger;
    this.courierItemList = result.data.Data;

    //$('#tbody').DataTable().destroy();
    var dataSet = eval("[" + result.data.tableValue + "]");
    $('#tbody').DataTable({
        data: dataSet,
        columns: [
                 { title: "Item" },
                 { title: "Color" },
                 { title: "Size" },
                 { title: "Uom" },
                 { title: "Quantity" },
                 {
                     title: "ACTION", "mDataProp": null,
                     // "sDefaultContent": '<a id=" 1 " onclick="return EditMfunction(1)" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="1"><i class="fa fa-pencil-square-o" style="cursor: pointer;"></i></a> | <a id=" 1 " onclick="return Delete(this)" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="1"><i class="fa fa-trash-o" style="cursor: pointer;"></i></a>'
                     //"sDefaultContent": '<button type="button" class="btnSelect"> use </button> <a id=" 1 " onclick="return Delete(this)" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="1"><i class="fa fa-trash-o" style="cursor: pointer;"></i></a>'
                     "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnSelect btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button><button type="button" data-toggle="tooltip" data-placement="top" title="Delete" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnDel btn btn-round btn-danger"> <i class="fa fa-times"></i> </button>'
                 }
        ]

    });
}
function MUpdate() {

    var res = validate();
    if (res == false) {
        return false;
    }
    var Returnable = $('#Return').is(":checked");

    var CourType = $('#CourType').val();
    var LocType = $('input[name="DType"]:checked').attr('value');

    var objSubmit = {
        CompanyId: $('#ddlCompany').val(),
        EntryDate: $('#txtEntryDate').val(),//new Date($('#txtEntryDate').val()),
        Ref_No: $('#txtRefNo').val(),
        CourierId: $('#ddlCourier').val(),
        DespType: LocType,
        DespLocationId: $('#ddlDesLoc').val(),
        AWBNo: $('#txtAVBNo').val(),
        AWBDate: $('#txtAWBDate').val(),//new Date($('#txtAWBDate').val()),
        ContactPerson: $('#txtConPerson').val(),
        Ref_No: $('#txtCRefNo').val(),
        EntryNo: $('#txtEntryNo').val(),
        Courier_MasId: $('#txtCourierMasId').val(),
        InOrOut: CourType,
        ReturnStatus: Returnable,

        CourierItem: courierItemList
    };
    LoadingSymb();
    $.ajax({
        url: "/CourierEntry/Update",
        data: JSON.stringify(objSubmit),
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

function ClearDetList() {

    $('#tbody').DataTable().destroy();
}

function MClose() {

    //StyRowId = StyleRId;
    window.location.href = "/CourierEntry/CourierEntryIndex";
}