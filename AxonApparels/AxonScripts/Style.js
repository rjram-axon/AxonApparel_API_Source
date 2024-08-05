/// <reference path="jquery-1.9.1.intellisense.js" />
//Load Data in Table when documents is ready
var styleList = [];
var indexval = -1;
var rowindex = 0;
var Mode = 0;
var maintbllist = [];
var CItemList = [];
$(document).ready(function () {
    debugger;
    LoadGarmentItemDDL("#ddlItem");
    loadData();
    $(document).on('click', '.btnadditem', function () {
        debugger;

        $('#ddlitemgroup').empty();
        $('#sec').empty();
        $('#base').empty();
        $('#pur').empty();
        $('#HSNCODE').empty();

        LoadUomDDL("#base,#sec,#pur");
        LoadItemGroupDDL("#ddlitemgroup");
        LoadHSNDDL('#HSNCODE');

        $('#ItemID').val("");
        $('#Name').val("");
        $('#ddlitemtype').val("");
        $('#Descript').val("");
        $('#HSNCODE').val(0);
        $('#base').val(0);
        $('#sec').val(0);
        $('#pur').val(0);
        $('#cgst').val("");
        $('#igst').val("");
        $('#sgst').val("");
        $('#Rate').val("");
        $('#Color').val("");
        //$('#HSNCODE').val("");


        $('#ddlitemgroup').val(0);
        $('#Statusitem').val("");
        $("#myModal2").modal('show');

    });
    //Add button click event
    $('#btncldadd').click(function () {
        //validation and add order items
        var isAllValid = true;
        var itemddl = $("#Item");
        debugger;
        if ($('#Item').val() == "0") {
            isAllValid = false;
            $('#Item').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#Item').siblings('span.error').css('visibility', 'hidden');
        }

        if (!($('#quantity').val() != '' && (parseInt($('#quantity').val()) || 0))) {
            isAllValid = false;
            $('#quantity').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#quantity').siblings('span.error').css('visibility', 'hidden');
        }

        if (isAllValid) {
            //var $newRow = $('#mainrow').clone().removeAttr('id');
            //$('.pc', $newRow).val($('#Item').val());
            //$('.quantity', $newRow).val($('#quantity').val());

            ////Replace add button with remove button
            //$('#add', $newRow).addClass('remove').val('Remove').removeClass('btn-success').addClass('btn-danger');

            // //remove id attribute from new clone row
            // $('#Item,#quantity,#add', $newRow).removeAttr('id');
            // $('span.error', $newRow).remove();
            // //append clone row
            ////$('#styleitemdetails').append($newRow);
            debugger;
            var StylelistObj = {
                ItemName: $("#Item option:selected").text(),
                ItemId: $('#Item').val(),
                Qty: $('#quantity').val(),
                Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
            };

            styleList.push(StylelistObj);


            loadchildTable(styleList);



            //clear select data
            $('#styleitemdetails').DataTable().destroy();
            $('#Item').val('0');
            //$('#quantity,#rate').val('');
            $('#quantity').val('');
            $('#orderItemError').empty();
        }
    })


    $(document).on('click', '.btnedit', function () {
        debugger;
        rowindex = $(this).closest('tr').index();
        //var $th = $td.closest('table').find('th').eq($td.index());

        var currentro12 = styleList.slice(rowindex);
        //var data = _.find(styleList, function (Item) { return Item.ItemId == ID; });


        // if (det) {
        $("#Item").val(currentro12[0]['ItemId']);
        //$("#ddlColor").val(currentro12[0]['Item']);
        $("#quantity").val(currentro12[0]['Qty']);
        //  }
        $('#btncldupdate').show();
        $('#btncldadd').hide();
    });

    $('#styleitemdetails').DataTable().destroy();



    $('#btncldupdate').click(function () {
        debugger;
        //rowindex = $(this).closest('tr').index();

        var currentrowsel = styleList.slice(rowindex);

        currentrowsel[0]['ItemId'] = $("#Item").val();
        currentrowsel[0]['ItemName'] = $("#Item option:selected").text();
        currentrowsel[0]['Qty'] = $("#quantity").val();

        styleList[rowindex] = currentrowsel[0];

        loadchildTable(styleList);


        $('#btncldupdate').hide();
        $('#btncldadd').show();

        if (Mode == 0) {
            clearTextBox();
        }
        else {
            $('#quantity').val('');
            $('#Item').val('0');

            $('#quantity').siblings('span.error').css('visibility', 'hidden');
            $('#Item').siblings('span.error').css('visibility', 'hidden');
        }

    });
});

//Validation using jquery
function itemvalidate() {
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
        $('#ddlitemgroup').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlitemgroup').css('border-color', 'lightgrey');
    }
    if ($('#ddlitemtype').val() == 0) {
        $('#ddlitemtype').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlitemtype').css('border-color', 'lightgrey');
    }
    if ($('#ddlitemtype').val() == 0) {
        $('#ddlitemtype').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlitemtype').css('border-color', 'lightgrey');
    }
    if ($('#pur').val() == 0) {
        $('#pur').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#pur').css('border-color', 'lightgrey');
    }
    if ($('#sec').val() == 0) {
        $('#sec').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#sec').css('border-color', 'lightgrey');
    }
    if ($('#base').val() == 0) {
        $('#base').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#base').css('border-color', 'lightgrey');
    }
    return isValid;
}
function Additem() {


    var res = itemvalidate();
    if (res == false) {
        return false;
    }
    var checkbox_value = "";
    var ischecked = false;

    $(":checkbox").each(function () {
        ischecked = $('#Statusitem').is(":checked");
       
    });

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
        itemcat: "P"
    };
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

                //alert('Data Saved Successfully');
                var msg = 'Data Saved Successfully...';
                var flg = 1;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                $('#myModal2').modal('hide');
                LoadGarmentItemDDL("#ddlItem");

            }
            // clearTextBox();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });

}
////Valdidation using jquery
//function validate() {
//    var isValid = true;
//    if ($('#ddlitemgroup').val() == 0) {
//        $('#ddlitemgroup').css('border-color', 'Red');
//        isValid = false;
//    }
//    else {
//        $('#ddlitemgroup').css('border-color', 'lightgrey');
//    }

//    return isValid;
//}
function loadchildTable(styleList) {
    $('#styleitemdetails').DataTable().destroy();
    debugger;
    $('#styleitemdetails').DataTable({
        data: styleList,
        columns: [
            { title: "Id", data: "ItemId", "visible": false },
            { title: "Item", data: "ItemName" },
            { title: "Quantity", data: "Qty" },
               {
                   title: "Action", "mDataProp": null,
                   //"sDefaultContent": '<button type="button" class="btnedit"> Edit </button> <a id=" 1 " onclick="return DeleteChild(this)" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="1"><i class="fa fa-trash-o" style="cursor: pointer;"></i></a>'
                   "sDefaultContent": '<button type="button" class="btnedit"> Edit </button> <button type="button" class="btnremove"> Remove </button><i class="fa fa-trash-o" style="cursor: pointer;"></i></a>'
               }
        ]
    });


    

}

//function DeleteChild(r) {
$(document).on('click', '.btnremove', function () {
    debugger;
    rowindex = $(this).closest('tr').index();
    styleList.splice(rowindex, 1);
    document.getElementById("styleitemdetails").deleteRow(rowindex + 1);
});

//function loadData() {
//    var counter = new Array();
//    var option;

//    $.ajax({
//        type: "GET",
//        url: '/Style/List/',
//        data: JSON.stringify({}),
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (json) {
//            var tableload = json.data
//            var dataSet = eval("[" + tableload + "]");
//            $('#tbody').DataTable({
//                data: dataSet,
//                scrollY: 300,
//                scrollCollapse: true,
//                paging: false,
//                fixedColumns: false,
//                select: false,
//                scrollX: "100%",
//                scrollXInner: "100%",
//                scroller: false,
//                select: {
//                    style: 'single'
//                },
//                "bSort": false,
//                columns: [
//                         { title: "ID", "visible": false },
//                         { title: "Style" },
//                         { title: "Article Number" },
//                         { title: "Status" },
//                         { title: "Action" },
//                ]
//            });

//        },
//        failure: function (errMsg) {
//            alert(errMsg);
//        }
//    });
//}





function loadData() {
    debugger;

    $.ajax({
        type: "GET",
        url: '/Style/List/',
        data: JSON.stringify({}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            var tblLoad = json.data;
            var dataset = eval("[" + tblLoad + "]");

            maintbllist = json;
            LoadMaintab(dataset);

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
                         { title: "ID",   "visible": false },
                         { title: "Style"  },
                         { title: "Article Number"  },
                         { title: "Status"  },
                         { title: "Action" },
                        // {
                        //     title: "ACTION", "mDataProp": null,
                         //    "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnmaingrdedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button><button type="button" type="button" data-toggle="tooltip" data-placement="top" title="Delete" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnmaingrddelete btn btn-danger btn-round" onClick=""> <i class="fa fa-times"></i> </button><button type="button"  class="CuttOrdPrint btn btn_round btn-success"  data-toggle="tooltip" data-placement="top" title="print" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;" >  <i class="fa fa-print"></i> </button>'
                         //}
        ]
    });

}






//Function for clearing the textboxes
function clearTextBox() {
    $('#txtstyleID').val("");
    $('#txtName').val("");
    $('#txtarticle').val("");
    $('#txtSeason').val("");
    $('#txtdesign').val("");
    $('#Status').val("");
    $('#quantity').val('');
    $('#ddlItem').val(0);

    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#txtstyleID').css('border-color', 'lightgrey');
    $('#txtarticle').css('border-color', 'lightgrey');
    $('#txtSeason').css('border-color', 'lightgrey');
    $('#txtdesign').css('border-color', 'lightgrey');
    $('#txtName').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $('#ddlItem').css('border-color', 'lightgrey');

    $('#Item').siblings('span.error').css('visibility', 'hidden');
    $('#product').siblings('span.error').css('visibility', 'hidden');
    $('#quantity').siblings('span.error').css('visibility', 'hidden');

    var table = $('#styleitemdetails').DataTable();
    table.clear().draw();

    //LoadGarmentItemDDL("#ddlItem");

    //styleList = [];

    $('#btncldupdate').hide();
    $('#btncldadd').show();

    Mode == 0;
}

//Valdidation using jquery
function validate() {
    debugger;
    var str = $('#txtName').val().trim();
    var isValid = true;
    if ($('#txtName').val().trim() == "") {
        $('#txtName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtName').css('border-color', 'lightgrey');
    }
    if ($('#ddlItem').val() == 0) {
        $('#ddlItem').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlItem').css('border-color', 'lightgrey');
    }
   
    if (str.indexOf('\'') >= 0 ) {
        //do something
        //alert('Quotes Does Not Exists');
        var msg = 'Quotes Does Not Exists...';
        var flg = 4;
        var mode = 1;
        AlartMessage(msg, flg, mode);
        isValid = false;
    }
    else {
        $('#txtName').css('border-color', 'lightgrey');
    }

    return isValid;

   

   
}


$(document).on('click', '.btnmaingrdedit', function () {
    debugger;
    Mode = 1;
    var table = $('#tbody').DataTable();
    var StyId = table.row($(this).parents('tr')).data()["StyleId"];
    getbyID(StyId);

});

//Function for getting the Data Based upon Style ID
function getbyID(StyleID) {
    debugger;
    Mode = 1;


   // $("#ddlItem").empty();
    //LoadGarmentItemDDL("#ddlItem");


    $('#txtstyleID').css('border-color', 'lightgrey');
    $('#txtarticle').css('border-color', 'lightgrey');
    $('#txtSeason').css('border-color', 'lightgrey');
    $('#txtdesign').css('border-color', 'lightgrey');
    $('#txtName').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');

    $.ajax({
        url: "/Style/getbyID/" + StyleID,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            $('#txtstyleID').val(obj.StyleId);
            $('#txtarticle').val(obj.ArticleNo);
            $('#txtSeason').val(obj.Season);
            $('#txtName').val(obj.StyleName);
            $('#txtdesign').val(obj.DesignName);
            $('#ddlItem').val(obj.itemid);
            if (obj.IsActive == "TRUE") {
                $('#Status').prop("checked", true);
            } else {
                $('#Status').prop("checked", false);
            }

   
            $('#btncldupdate').hide();
            $('#btncldadd').show();

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

function getViewbyID(StyleID) {
    debugger;
    Mode = 1;


    // $("#ddlItem").empty();
    //LoadGarmentItemDDL("#ddlItem");


    $('#txtstyleID').css('border-color', 'lightgrey');
    $('#txtarticle').css('border-color', 'lightgrey');
    $('#txtSeason').css('border-color', 'lightgrey');
    $('#txtdesign').css('border-color', 'lightgrey');
    $('#txtName').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');

    $.ajax({
        url: "/Style/getbyID/" + StyleID,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            $('#txtstyleID').val(obj.StyleId);
            $('#txtarticle').val(obj.ArticleNo);
            $('#txtSeason').val(obj.Season);
            $('#txtName').val(obj.StyleName);
            $('#txtdesign').val(obj.DesignName);
            $('#ddlItem').val(obj.itemid);
            if (obj.IsActive == "TRUE") {
                $('#Status').prop("checked", true);
            } else {
                $('#Status').prop("checked", false);
            }


            $('#btncldupdate').hide();
            $('#btncldadd').show();

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

    var itemname = $(("#Item")),
            quantity = $(("#quant"));

    if (res == false) {
        return false;
    }

    var checkbox_value = "";
    var ischecked = false;
    debugger;
    $(":checkbox").each(function () {
        ischecked = $('#Status').is(":checked");
       
    });

    var isAllValid = true;

    //validate order items
    $('#orderItemError').text('');
    var list = [];
    var errorItemCount = 0;
    $('#styleitemdetails tbody tr').each(function (index, ele) {
        $ItemCell = $('td.item', this).html();//$('td:first-child', this).html();
        $QuantityCell = $('td.quant', this).html();//$('td:first-child', this).next();
        $Itemid = $('td.itemid', this).html();//$('td:first-child', this).next();

        if (
            $ItemCell == "" || $QuantityCell == ""
           ) {
            errorItemCount++;
            $(this).addClass('error');
        } else {
            var orderItem = {
                ItemId: $Itemid,
                //ItemName: $ItemCell,// $($ItemCell, this).val(),
                Qty: $QuantityCell// parseInt($($QuantityCell, this).val())
            }
            list.push(orderItem);
        }
    })

    if (errorItemCount > 0) {
        $('#orderItemError').text(errorItemCount + " invalid entry in order item list.");
        isAllValid = false;
    }

    if (list.length == 0) {
        $('#orderItemError').text('At least 1 order item required.');
        isAllValid = false;
    }

    if (isAllValid) {
        var StyleObj = {
            StyleId: $('#StyleID').val(),
            StyleName: $('#txtName').val(),
            ArticleNo: $('#txtarticle').val(),
            Season: $('#txtSeason').val(),
            DesignName: $('#txtdesign').val(),
            IsActive: ischecked,
            ItemId: $('#ddlItem').val(),
            StyleDet: styleList,
            //StyleDet: list,
        };
        $("#btnAdd").attr("disabled", true);
        LoadingSymb();
        $.ajax({
            url: "/Style/Add",
            data: JSON.stringify(StyleObj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.Value == 0) {
                    window.location.href = "/Error/Index";
                } else if (result.Value == -1) {
                    //alert('Given Style is Already Available...');
                    var msg = 'Given Style is Already Available...';
                    var flg = 4;
                    var mode = 1;
                    AlartMessage(msg, flg, mode);
                    $("#btnAdd").attr("disabled", false);
                    return true;
                }
                             
                else {
                    AddUserEntryLog('Master', 'Style', 'ADD', $('#txtName').val());
                    //alert('Data Saved Successfully');
                    var msg = 'Data Saved Successfully...';
                    var flg = 1;
                    var mode = 0;
                    AlartMessage(msg, flg, mode);
                    $('#tbody').DataTable().destroy();
                    loadData();
                    $('#myModal').modal('hide');
                    $("#btnAdd").attr("disabled", false);
                }
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }


        });
    }
}

//function for updating Style record
function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var checkbox_value = "";
    var ischecked = false;
    debugger;
    $(":checkbox").each(function () {
        ischecked = $('#Status').is(":checked");
     
    });
    debugger;
    var StyleObj = {
        StyleId: $('#txtstyleID').val(),
        StyleName: $('#txtName').val(),
        ArticleNo: $('#txtarticle').val(),
        Season: $('#txtSeason').val(),
        DesignName: $('#txtdesign').val(),
        ItemId: $('#ddlItem').val(),
        IsActive: ischecked,
        StyleDet: styleList,
    };
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/Style/Update",
        data: JSON.stringify(StyleObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
           
            if (result.Status == 'SUCCESS') {
                AddUserEntryLog('Master', 'Style', 'UPDATE', $('#txtName').val());

                $('#tbody').DataTable().destroy();
                loadData();
                $('#myModal').modal('hide');
                //alert('Data Updated Successfully');
                var msg = 'Data Updated Successfully...';
                var flg = 1;
                var mode = 0;
                AlartMessage(msg, flg, mode);
                $("#btnUpdate").attr("disabled", false);
            }
            else if (result.Status == 'EXISTS') {
                //alert('Given Style is Already Available...');
                var msg = 'Given Style is Already Available...';
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

//function for deleting Style record
function Delete(ID) {
    //debugger;
    //var ans = confirm("Are you sure you want to delete this Record?");
    //if (ans) {
    //    $.ajax({
    //        url: "/Style/Delete/" + ID,
    //        type: "POST",
    //        contentType: "application/json;charset=UTF-8",
    //        dataType: "json",
    //        success: function (result) {
              
    //            if (result.Value != 0) {
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
    debugger;
    $.ajax({
        url: "/Style/getbyID/" + ID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            $('#txtName').val(obj.StyleName);
            CheckStyleAlloted(ID);

        },
        error: function (errormessage) {
            alert('delete failed..');
        }
    });
    
}

function CheckStyleAlloted(ID) {

    $.ajax({
        url: "/Style/GetStyleRefDetails",
        data: JSON.stringify({ StyleId: ID }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            CItemList = result;
            if (CItemList.length > 0) {

                for (var x = 0; x < CItemList.length; x++) {

                    var c = CItemList[x].CountStyleId;

                    if (c > 0) {
                        //alert("Style Is Alloted For Some Other Entry,Please Check it....");
                        var msg = 'Style Is Alloted For Some Other Entry,Please Check it...';
                        var flg = 4;
                        var mode = 1;
                        AlartMessage(msg, flg, mode);
                    }
                    else {
                        var ans = confirm("Are you sure you want to delete this Record?");
                        if (ans) {
                            LoadingSymb();
                            $.ajax({
                                url: "/Style/Delete/" + ID,
                                type: "POST",
                                contentType: "application/json;charset=UTF-8",
                                dataType: "json",
                                success: function (result) {

                                    if (result.Value != 0) {
                                        //alert("Style delete success...")
                                        var msg = 'Style delete success...';
                                        var flg = 1;
                                        var mode = 0;
                                        AlartMessage(msg, flg, mode);
                                        $('#tbody').DataTable().destroy();
                                        AddUserEntryLog('Master', 'Style', 'DELETE', $('#txtName').val());
                                        loadData();
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