/// <reference path="jquery-1.9.1.intellisense.js" />
//Load Data in Table when documents is ready

var maintbllist = [];
var CItemList = [];
$(document).ready(function () {
    LoadItemGroupDDL("#ddlitemgroup");
    LoadUomDDL("#base,#sec,#pur");
    LoadHSNDDL("#HSNCODE");
    loadData();
    $('#ddlitemtype').val('0');
    $(document).on('click', '.btnadditemgrp', function () {
        debugger;
        $('#Itemgroupid').val("");
        $('#txtName').val("");
        $('#cat1').val("");
        $('#cat2').val("");
        $('#cat3').val("");
        $('#Statusgrp').val("");
        $("#myModal2").modal('show');

    });
    $(document).on('click', '.btnadduom', function () {
        debugger;
        $('#UomID').val("");
        $('#Uom').val("");
        $('#abbreviation').val("");
        $('#ddldeci').val("");
        $('#Status').val("");
        $("#myModal1").modal('show');

    });

});


function Adduom() {
    debugger;
    var checkbox_value = "";
    var ischecked = false;

    $(":checkbox").each(function () {
        ischecked = $('#Status').is(":checked");
        //if (ischecked) {
        //    checkbox_value += "on";
        //}
        //else {
        //    checkbox_value += "off";
        //}
    });

    var UomObj = {
        UomId: $('#UomID').val(),
        Uom: $('#Uom').val(),
        Abbreviation: $('#abbreviation').val(),
        IsDecimal: $('#ddldeci').val(),
        IsActive: ischecked,
    };
    LoadingSymb();
    $.ajax({
        url: "/Unit_of_measurement/Add",
        data: JSON.stringify(UomObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == 0) {
                window.location.href = "/Error/Index";

            }
            else if (result.Value == -1) {
                //alert('Given UOM is Already Available...');
                var msg = 'Given UOM is Already Available...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }
            else {

                //alert('Data Saved Successfully');
                var msg = 'Data Saved Successfully...';
                var flg = 1;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                $('#myModal1').modal('hide');
                LoadUomDDL("#base,#sec,#pur");
            }
            //clearTextBox();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });

}
function Additemgrp() {
    debugger;

    var checkbox_value = "";
    var ischecked = false;

    $(":checkbox").each(function () {
        ischecked = $('#Statusgrp').is(":checked");
        //if (ischecked) {
        //    checkbox_value += "on";
        //}
        //else {
        //    checkbox_value += "off";
        //}
    });

    var ItemGroupObj = {
        ItemgroupId: $('#Itemgroupid').val(),
        ItemGroupName: $('#txtName').val(),
        CatHead1: $('#cat1').val(),
        CatHead2: $('#cat2').val(),
        CatHead3: $('#cat3').val(),
        IsActive: ischecked,
    };
    LoadingSymb();
    $.ajax({
        url: "/ItemGroup/Add",
        data: JSON.stringify(ItemGroupObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == 0) {
                window.location.href = "/Error/Index";

            }
            else if (result.Value == -1) {
                //alert('Given ItemGroup is Already Available...');
                var msg = 'Given ItemGroup is Already Available...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }
            else {


                // clearTextBox();
                //alert('Data Saved Successfully');
                var msg = 'Data Saved Successfully...';
                var flg = 1;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                $('#myModal2').modal('hide');
                LoadItemGroupDDL("#ddlitemgroup");

            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}


function loadData() {
    debugger;

    $.ajax({
        type: "GET",
        url: '/Item/List/',
        data: JSON.stringify({}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");

            maintbllist = json;
            LoadMaintab(dataSet);
            
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}


function LoadMaintab(maintbllist) {
    debugger;
    var data = [];
    for (var i = 0 ; i < maintbllist.length ; i++) {
        data.push(maintbllist[i]);
    }
    $('#tbody').DataTable({
        data: data,
        scrollY: 300,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        select: {
            style: 'single'
        },
        "bSort": false,
        columns: [
                         { title: "ItemId", "visible": false },//data: "Itemid",
                         { title: "Item" },
                         { title: "Status" },
                          { title: "Action" },
                        // {
                         //    title: "ACTION", "mDataProp": null,
                        //     "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnmaingrdedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button><button type="button" type="button" data-toggle="tooltip" data-placement="top" title="Delete" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnmaingrddelete btn btn-danger btn-round" onClick=""> <i class="fa fa-times"></i> </button><button type="button"  class="CuttOrdPrint btn btn_round btn-success"  data-toggle="tooltip" data-placement="top" title="print" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;" >  <i class="fa fa-print"></i> </button>'
                        // }
        ]
    });

}


//Function for clearing the textboxes
function clearTextBox() {
    debugger;
    $('#ItemID').val("");
    $('#Name').val("");
    // $('#ddlitemgroup').empty();
     $('#ddlitemtype').val(0);
    $('#Descript').val("");
    //$('#base').val("");
    //$('#sec').val("");
    //$('#pur').val("");
    $('#cgst').val("");
    $('#igst').val("");
    $('#sgst').val("");
    $('#Rate').val("");
    $('#Color').val(""); 
    $('#HSNCODE').val("0");
    $('#txtMinQty').val("");
    $('#txtMaxQty').val("");
    $('#txtGSTTaxCode').val("");
    $('#txtIGSTTaxCode').val("");


    $('#Status').val("");

    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#ItemID').css('border-color', 'lightgrey');
    $('#ddlitemgroup').css('border-color', 'lightgrey');
    $('#ddlitemtype').css('border-color', 'lightgrey');
    $('#Name').css('border-color', 'lightgrey');
    $('#Descript').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $('#base').css('border-color', 'lightgrey');
    $('#sec').css('border-color', 'lightgrey');
    $('#pur').css('border-color', 'lightgrey');
    $('#cgst').css('border-color', 'lightgrey');
    $('#igst').css('border-color', 'lightgrey');
    $('#sgst').css('border-color', 'lightgrey');
    $('#Rate').css('border-color', 'lightgrey');
    $('#Color').css('border-color', 'lightgrey');
    $('#HSNCODE').css('border-color', 'lightgrey');
    $('#txtGSTTaxCode').css('border-color', 'lightgrey')
    $('#txtIGSTTaxCode').css('border-color', 'lightgrey');


    //$('#tbody').DataTable().destroy();

    LoadItemGroupDDL("#ddlitemgroup");
    LoadUomDDL("#base,#sec,#pur");
    LoadHSNDDL("#HSNCODE");
    //LoadUomDDL("#sec");
    //LoadUomDDL("#pur");
}

//Validation using jquery
function validate() {
    debugger;
    var isValid = true;
    if ($('#Name').val().trim() == "") {
        $('#Name').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Name').css('border-color', 'lightgrey');
    }

    if ($('#ddlitemgroup').val() == 0) {
        $('#ddlitemgroup').siblings(".select2-container").css('border', '1px solid red');
        isValid = false;
    }
    else {
        $('#ddlitemgroup').siblings(".select2-container").css('border', '1px solid lightgrey');
    }
    if ($('#ddlitemtype').val() == 0) {
        $('#ddlitemtype').siblings(".select2-container").css('border', '1px solid red');
        isValid = false;
    }
    else {
        $('#ddlitemtype').siblings(".select2-container").css('border', '1px solid lightgrey');
    }
    if ($('#ddlitemtype').val() == 0) {
        $('#ddlitemtype').siblings(".select2-container").css('border', '1px solid red');
        isValid = false;
    }
    else {
        $('#ddlitemtype').siblings(".select2-container").css('border', '1px solid lightgrey');
    }
    if ($('#pur').val() == 0) {
        $('#pur').siblings(".select2-container").css('border', '1px solid red');
        isValid = false;
    }
    else {
        $('#pur').siblings(".select2-container").css('border', '1px solid lightgrey');
    }
    if ($('#sec').val() == 0) {
        $('#sec').siblings(".select2-container").css('border', '1px solid red');
        isValid = false;
    }
    else {
        $('#sec').siblings(".select2-container").css('border', '1px solid lightgrey');
    }
    if ($('#base').val() == 0) {
        $('#base').siblings(".select2-container").css('border', '1px solid red');
        isValid = false;
    }
    else {
        $('#base').siblings(".select2-container").css('border', '1px solid lightgrey');
    }
    if ($('#HSNCODE').val() == 0) {
        $('#HSNCODE').siblings(".select2-container").css('border', '1px solid red');
        isValid = false;
    }
    else {
        $('#HSNCODE').siblings(".select2-container").css('border', '1px solid lightgrey');
    }

    //if ($('#txtitemdesc').val().trim().indexOf('\'') >= 0) {
    //    $('#txtitemdesc').val($('#txtitemdesc').val().replace(/'/g, ' '));
    //}
    if ($('#cgst').val().trim().indexOf('\'') >= 0) {
        $('#cgst').val($('#cgst').val().replace(/'/g, ' '));
    }
    if ($('#igst').val().trim().indexOf('\'') >= 0) {
        $('#igst').val($('#igst').val().replace(/'/g, ' '));
    }
    if ($('#sgst').val().trim().indexOf('\'') >= 0) {
        $('#sgst').val($('#sgst').val().replace(/'/g, ' '));
    }
    if ($('#HSNCODE').val().trim().indexOf('\'') >= 0) {
        $('#HSNCODE').val($('#HSNCODE').val().replace(/'/g, ' '));
    }
    if ($('#Name').val().trim().indexOf('\'') >= 0) {
        $('#Name').val($('#Name').val().replace(/'/g, ' '));
    }


    return isValid;
}

//Function for getting the Data Based upon Item ID
function getbyID(ID) {

   // $('#ddlitemgroup').empty();
   // LoadItemGroupDDL("#ddlitemgroup");
  //  LoadUomDDL("#base,#sec,#pur");
    debugger;
    $('#ItemID').css('border-color', 'lightgrey');
    $('#ddlitemgroup').css('border-color', 'lightgrey');
    $('#ddlitemtype').css('border-color', 'lightgrey');
    $('#Name').css('border-color', 'lightgrey');
    $('#Descript').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $('#base').css('border-color', 'lightgrey');
    $('#sec').css('border-color', 'lightgrey');
    $('#pur').css('border-color', 'lightgrey');
    $('#cgst').css('border-color', 'lightgrey');
    $('#igst').css('border-color', 'lightgrey');
    $('#sgst').css('border-color', 'lightgrey');
    $.ajax({

        url: "/Item/getbyID/" + ID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;

            var obj = result.Value;
            $('#ItemID').val(obj.Itemid);
            $('#ddlitemtype').val(obj.ItemTypeName);
            $('#ddlitemgroup').val(obj.ItemGroupId);
            $('#Name').val(obj.ItemName);
            $('#base').val(obj.BasicUnit);
            $('#sec').val(obj.SecUnit);
            $('#pur').val(obj.PurUnit);
            $('#cgst').val(obj.CGST);
            $('#igst').val(obj.IGST);
            $('#sgst').val(obj.SGST);
            $('#Rate').val(obj.rate);
            $('#Color').val(obj.colornum);
            $('#txtGSTTaxCode').val(obj.GSTtaxcode);
            $('#txtIGSTTaxCode').val(obj.IGSTtaxcode);
            $('#txtMinQty').val(obj.MinQty);
            $('#txtMaxQty').val(obj.MaxQty);
            var H = obj.HSNCODE;

            if (H == "") {
                LoadHSNDDL("#HSNCODE");
            } else {
                $('#HSNCODE').val(obj.HSNCODE);
            }
            $('#Descript').val(obj.Description);

            if (obj.IsActive == "TRUE") {
                $('#Status').prop("checked", true);
            } else {
                $('#Status').prop("checked", false);
            }

            if (obj.MajorComp == "Y") {
                $('#chkmajcomp').prop("checked", true);
            } else {
                $('#chkmajcomp').prop("checked", false);
            }

            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

function getViewbyID(ID) {

    debugger;
    $('#ItemID').css('border-color', 'lightgrey');
    $('#ddlitemgroup').css('border-color', 'lightgrey');
    $('#ddlitemtype').css('border-color', 'lightgrey');
    $('#Name').css('border-color', 'lightgrey');
    $('#Descript').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $('#base').css('border-color', 'lightgrey');
    $('#sec').css('border-color', 'lightgrey');
    $('#pur').css('border-color', 'lightgrey');
    $('#cgst').css('border-color', 'lightgrey');
    $('#igst').css('border-color', 'lightgrey');
    $('#sgst').css('border-color', 'lightgrey');
    $.ajax({

        url: "/Item/getbyID/" + ID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;

            var obj = result.Value;
            $('#ItemID').val(obj.Itemid);
            $('#ddlitemtype').val(obj.ItemTypeName);
            $('#ddlitemgroup').val(obj.ItemGroupId);
            $('#Name').val(obj.ItemName);
            $('#base').val(obj.BasicUnit);
            $('#sec').val(obj.SecUnit);
            $('#pur').val(obj.PurUnit);
            $('#cgst').val(obj.CGST);
            $('#igst').val(obj.IGST);
            $('#sgst').val(obj.SGST);
            $('#Rate').val(obj.rate);
            $('#Color').val(obj.colornum);
            $('#txtGSTTaxCode').val(obj.GSTtaxcode);
            $('#txtIGSTTaxCode').val(obj.IGSTtaxcode);
            $('#txtMinQty').val(obj.MinQty);
            $('#txtMaxQty').val(obj.MaxQty);
            var H = obj.HSNCODE;

            if (H == "") {
                LoadHSNDDL("#HSNCODE");
            } else {
                $('#HSNCODE').val(obj.HSNCODE);
            }
            $('#Descript').val(obj.Description);

            if (obj.IsActive == "TRUE") {
                $('#Status').prop("checked", true);
            } else {
                $('#Status').prop("checked", false);
            }

            if (obj.MajorComp == "Y") {
                $('#chkmajcomp').prop("checked", true);
            } else {
                $('#chkmajcomp').prop("checked", false);
            }

            $('#myModal').modal('show');
            $('#btnUpdate').hide();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}
//Add Data Function 
function Add() {
    var res = validate();
    if (res == false) {
        return false;
    }
    debugger;
    var checkbox_value = "";
    var ischecked = false;
    var isMajorComp = false;
    var MComp = 0;

    $(":checkbox").each(function () {
        ischecked = $('#Status').is(":checked");
       // isMajorComp = $('#chkmajcomp').is(":checked");
        //if (ischecked) {
        //    checkbox_value += "on";
        //}
        //else {
        //    checkbox_value += "off";
        //}
    });

    var radioComp = $("input[name='MajorComp']:checked").val();

    if (radioComp == "Y") {
        MComp = "Y";
    }
    else {
        MComp = "N";
    }
    //var groupdropdown = $('#ddlitemgroup');

    var ItemObj = {
        Itemid: $('#ItemID').val(),
        ItemName: $('#Name').val(),
        ItemGroupId: $('#ddlitemgroup').val(),
        //ItemTypeName: $('#ddlitemtype').val(),
        ItemTypeName: $("#ddlitemtype option:selected").text(),
        Description: $('#Descript').val(),
        BasicUnit: $('#base').val(),
        SecUnit: $('#sec').val(),
        PurUnit: $('#pur').val(),
        IsActive: ischecked,
        CGST: $('#cgst').val(),
        SGST: $('#sgst').val(),
        IGST: $('#igst').val(),
        rate: $('#Rate').val(),
        colornum: $('#Color').val(),
        HSNCODE: $('#HSNCODE').val(),
        itemcat: "P",
        MajorComp: MComp,
        GSTtaxcode: $('#txtGSTTaxCode').val(),
        IGSTtaxcode: $('#txtIGSTTaxCode').val(),
        MinQty: $('#txtMinQty').val(),
        MaxQty: $('#txtMaxQty').val(),
        
    };
    $("#btnAdd").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/Item/Add",
        data: JSON.stringify(ItemObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            }
            else if (result.Value == -1) {
                //alert('Given Item is Already Available...');
                var msg = 'Given Item is Already Available...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }
            else {
                AddUserEntryLog('Master', 'Item Master', 'ADD', $('#Name').val());

                $('#tbody').DataTable().destroy();
                loadData();
                $('#myModal').modal('hide');
                $('#ItemID').val("");
                $('#Name').val("");
                $('#ddlitemgroup').val("");
                $('#ddlitemtype').val("");
                $('#Descript').val("");
                $('#Status').val("");
                $('#base').val("");
                $('#sec').val("");
                $('#pur').val("");
                $('#cgst').val("");
                $('#igst').val("");
                $('#sgst').val("");
                $('#Rate').val("");
                $('#Color').val("");
                $('#HSNCODE').val("");
                $('#txtMinQty').val("");
                $('#txtMaxQty').val("");
                //alert('Data Saved Successfully');
                var msg = 'Data Saved Successfully...';
                var flg = 1;
                var mode = 0;
                AlartMessage(msg, flg, mode);
                $("#btnAdd").attr("disabled", false);
            }
            // clearTextBox();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function LoadGstTax(HsnCode) {
    debugger;
    $.ajax({
        url: "/Item/GetGstDetails",
        data: JSON.stringify({ HSNCODE: HsnCode }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            debugger;
            if (obj != undefined) {

                $('#cgst').val(obj[0]["CGST"]);
                $('#sgst').val(obj[0]["SGST"]);
                $('#igst').val(obj[0]["IGST"]);
                $('#txtGSTTaxCode').val(obj[0]["GSTtaxcode"]);
                $('#txtIGSTTaxCode').val(obj[0]["IGSTtaxcode"]);

            }
            else {

            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
//function for updating Item record
function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var checkbox_value = "";
    var ischecked = false;
    var isMajorComp = false;
    var MComp = 0;

    var radioComp = $("input[name='MajorComp']:checked").val();

    if (radioComp == "Y") {
        MComp = "Y";
    }
    else {
        MComp = "N";
    }

    $(":checkbox").each(function () {
        ischecked = $('#Status').is(":checked");
       // isMajorComp = $('#chkmajcomp').is(":checked");
        //if (ischecked) {
        //    checkbox_value += "on";
        //}
        //else {
        //    checkbox_value += "off";
        //}
    });

    var ItemObj = {
        Itemid: $('#ItemID').val(),
        ItemName: $('#Name').val(),
        // ItemGroupId: 2,
        ItemGroupId: $('#ddlitemgroup').val(),
        //ItemTypeName: $('#ddlitemtype').val(),
        ItemTypeName: $("#ddlitemtype option:selected").text(),
        Description: $('#Descript').val(),
        BasicUnit: $('#base').val(),
        SecUnit: $('#sec').val(),
        PurUnit: $('#pur').val(),
        IsActive: ischecked,
        //MajorComp: isMajorComp,
        CGST: $('#cgst').val(),
        SGST: $('#sgst').val(),
        IGST: $('#igst').val(),
        rate: $('#Rate').val(),
        colornum: $('#Color').val(),
        HSNCODE: $('#HSNCODE').val(),
        MajorComp: MComp,
        GSTtaxcode: $('#txtGSTTaxCode').val(),
        IGSTtaxcode: $('#txtIGSTTaxCode').val(),
        MinQty: $('#txtMinQty').val(),
        MaxQty: $('#txtMaxQty').val(),
        itemcat: "P",
    };
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/Item/Update",
        data: JSON.stringify(ItemObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
        
            if (result.Status == 'SUCCESS') {
                AddUserEntryLog('Master', 'Item Master', 'UPDATE', $('#Name').val());

                $('#tbody').DataTable().destroy();
                $('#myModal').modal('hide');
                loadData();
                $('#Name').val("");
                $('#ddlitemgroup').val("");
                $('#ddlitemtype').val("");
                $('#Descript').val("");
                $('#Status').val("");
                $('#base').val("");
                $('#sec').val("");
                $('#pur').val("");
                $('#cgst').val("");
                $('#igst').val("");
                $('#sgst').val("");
                $('#Rate').val("");
                $('#Color').val("");
                $('#HSNCODE').val("");
                $('#txtMinQty').val("");
                $('#txtMaxQty').val("");
                //alert('Data Updated Successfully');
                var msg = 'Data Updated Successfully...';
                var flg = 1;
                var mode = 0;
                AlartMessage(msg, flg, mode);
                $("#btnUpdate").attr("disabled", false);
            }
            else if (result.Status == 'EXISTS') {
                //alert('Given Item is Already Available...');
                var msg = 'Given Item is Already Available...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
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

//function for deleting Item record
function Delete(ID) {
    
    //var ans = confirm("Are you sure you want to delete this Record?");
    //if (ans) {
    //    $.ajax({
    //        url: "/Item/Delete/" + ID,
    //        type: "POST",
    //        contentType: "application/json;charset=UTF-8",
    //        dataType: "json",
    //        success: function (result) {
              
    //            if (result.Value == 1) {
    //                $('#tbody').DataTable().destroy();
    //                loadData();
    //            }
    //            else {
    //                window.location.href = "/Error/Index";
    //            }
    //        },
    //        error: function (errormessage) {
    //            alert(errormessage.responseText);
    //        }
    //    });
    //}
    $.ajax({
        url: "/Item/getbyID/" + ID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            $('#Name').val(obj.ItemName);
            CheckItemAlloted(ID);

        },
        error: function (errormessage) {
            alert('delete failed..');
        }
    });
}


function CheckItemAlloted(ID) {

    $.ajax({
        url: "/Item/GetItemRefDetails",
        data: JSON.stringify({ Itemid: ID }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            CItemList = result;
            if (CItemList.length > 0) {

                for (var x = 0; x < CItemList.length; x++) {

                    var c = CItemList[x].CountItemId;

                    if (c > 0) {
                        //alert("Item Is Alloted For Some Other Entry,Please Check it....");
                        var msg = 'Item Is Alloted For Some Other Entry,Please Check it...';
                        var flg = 4;
                        var mode = 1;
                        AlartMessage(msg, flg, mode);
                    }
                    else {
                        var ans = confirm("Are you sure you want to delete this Record?");
                        if (ans) {
                            $.ajax({
                                url: "/Item/Delete/" + ID,
                                type: "POST",
                                contentType: "application/json;charset=UTF-8",
                                dataType: "json",
                                success: function (result) {

                                    if (result.Value == 1) {
                                        $('#tbody').DataTable().destroy();
                                        AddUserEntryLog('Master', 'Item Master', 'DELETE', $('#Name').val());
                                        loadData();
                                        //alert('Data Deleted Successfully');
                                        var msg = 'Data Deleted Successfully...';
                                        var flg = 1;
                                        var mode = 1;
                                        AlartMessage(msg, flg, mode);
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
                }
            }
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

$(document).on('click', '.btnmaingrdedit', function () {
    debugger;
    Mode = 1;
    var table = $('#tbody').DataTable();
    var ItemId = table.row($(this).parents('tr')).data()["Itemid"];
    getbyID(ItemId);

});