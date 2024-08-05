/// <reference path="jquery-1.9.1.intellisense.js" />
//Load Data in Table when documents is ready
var maintbllist = [];
$(document).ready(function () {
    loadData();
    $(document).on('click', '.btnaddcolorgrp', function () {
        debugger;
        $('#ColorGroupID').val("");
        $('#Name').val("");
        $('#Statuscol').val("");
        $("#myModal2").modal('show');

    });
});

function Addcolorgrp() {
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

    var ColorGroupObj = {
        ColorGroupId: $('#ColorGroupID').val(),
        ColorGroupName: $('#Name').val(),
        IsActive: ischecked,
    };
    $.ajax({
        url: "/ColorGroup/Add",
        data: JSON.stringify(ColorGroupObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            }
            else {


                // clearTextBox();
                //alert('Data Saved Successfully');
                var msg = 'Data Saved Successfully...';
                var flg = 1;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                $('#myModal2').modal('hide');
                LoadColorGroupDDL("#ddlcolorgroup");
            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

////Load Data function
//function loadData() {

//    $.ajax({
//        type: "GET",
//        url: '/ColorMaster/List/',
//        data: JSON.stringify({}),
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (json) {
//            var tableload = json.data
//            var dataSet = eval("[" + tableload + "]");
//            $('#tbody').DataTable({
//                data: dataSet,
//                columns: [
//                         { title: "ColorId", "visible": false },
//                         { title: "Color" },
//                         { title: "Color Code" },
//                         { title: "Color Number" },
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
        url: '/ColorMaster/List/',
        data: JSON.stringify({}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            maintbllist = json;
            LoadMaintab(maintbllist);

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
                         { title: "ColorId", data: "ColorId", "visible": false },
                         { title: "Color", data: "ColorName" },
                         { title: "Color Code", data: "ColorCode" },
                         { title: "Color Number", data: "ColorNo" },
                         { title: "Status", data: "IsActive" },
                         {
                             title: "ACTION", "mDataProp": null,
                             "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnmaingrdedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button><button type="button" type="button" data-toggle="tooltip" data-placement="top" title="Delete" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnmaingrddelete btn btn-danger btn-round" onClick=""> <i class="fa fa-times"></i> </button>'
                         }
        ]
    });

}


$(document).on('click', '.btnmaingrdedit', function () {
    debugger;
    Mode = 1;
    var table = $('#tbody').DataTable();
    var ColoId = table.row($(this).parents('tr')).data()["ColorId"];
    getbyID(ColoId);

});

$(document).on('click', '.btnmaingrddelete', function () {
    debugger;
    Mode = 1;
    var table = $('#tbody').DataTable();
    var ColoId = table.row($(this).parents('tr')).data()["ColorId"];
    Delete(ColoId);

});

//Function for clearing the textboxes
function clearTextBox() {
    $('#ColorID').val("");
    $('#ddlcolorgroup').empty();
    $('#colorcode').val("");
    $('#colorname').val("");
    $('#pantone').val("");
    $('#Colorno').val("");
    $('#lookup').val("");
    // $('#coloroth').val("");
    $('#Status').val("");

    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#ColorID').css('border-color', 'lightgrey');
    $('#ddlcolorgroup').css('border-color', 'lightgrey');
    $('#colorcode').css('border-color', 'lightgrey');
    $('#colorname').css('border-color', 'lightgrey');
    $('#pantone').css('border-color', 'lightgrey');
    $('#Colorno').css('border-color', 'lightgrey');
    $('#lookup').css('border-color', 'lightgrey');
    // $('#coloroth').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    //$('#tbody').DataTable().destroy();
    LoadColorGroupDDL("#ddlcolorgroup");

}

//Valdidation using jquery
function validate() {
    debugger;
    var isValid = true;
    if ($('#colorname').val() == "") {
        $('#colorname').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#colorname').css('border-color', 'lightgrey');
    }


    return isValid;
}

//Function for getting the Data Based upon Color ID
function getbyID(ColorID) {
    debugger;
    $('#ddlcolorgroup').empty();
    LoadColorGroupDDL("#ddlcolorgroup");

    $('#ColorID').css('border-color', 'lightgrey');
    $('#colorcode').css('border-color', 'lightgrey');
    $('#colorname').css('border-color', 'lightgrey');
    $('#pantone').css('border-color', 'lightgrey');
    $('#ddlcolorgroup').css('border-color', 'lightgrey');
    $('#Colorno').css('border-color', 'lightgrey');
    $('#lookup').css('border-color', 'lightgrey');
    // $('#coloroth').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');

    $.ajax({
        url: "/ColorMaster/getbyID/" + ColorID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;

            $('#ColorID').val(obj.ColorId);
            $('#colorcode').val(obj.ColorCode);
            $('#colorname').val(obj.ColorName);
            $('#pantone').val(obj.Pantone);
            $('#lookup').val(obj.Lookup);
            // $('#coloroth').val(obj.ColorOth);
            $('#ddlcolorgroup').val(obj.ColorGroupId);
            $('#Colorno').val(obj.ColorNo);

            if (obj.IsActive == "TRUE") {
                $('#Status').prop("checked", true);
            } else {
                $('#Status').prop("checked", false);
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

function getViewbyID(ColorID) {
    debugger;
    $('#ddlcolorgroup').empty();
    LoadColorGroupDDL("#ddlcolorgroup");

    $('#ColorID').css('border-color', 'lightgrey');
    $('#colorcode').css('border-color', 'lightgrey');
    $('#colorname').css('border-color', 'lightgrey');
    $('#pantone').css('border-color', 'lightgrey');
    $('#ddlcolorgroup').css('border-color', 'lightgrey');
    $('#Colorno').css('border-color', 'lightgrey');
    $('#lookup').css('border-color', 'lightgrey');
    // $('#coloroth').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');

    $.ajax({
        url: "/ColorMaster/getbyID/" + ColorID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;

            $('#ColorID').val(obj.ColorId);
            $('#colorcode').val(obj.ColorCode);
            $('#colorname').val(obj.ColorName);
            $('#pantone').val(obj.Pantone);
            $('#lookup').val(obj.Lookup);
            // $('#coloroth').val(obj.ColorOth);
            $('#ddlcolorgroup').val(obj.ColorGroupId);
            $('#Colorno').val(obj.ColorNo);

            if (obj.IsActive == "TRUE") {
                $('#Status').prop("checked", true);
            } else {
                $('#Status').prop("checked", false);
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

//function for deleting Color record
function Delete(ID) {

    //var ans = confirm("Are you sure you want to delete this Record?");
    //if (ans) {
    //    $.ajax({
    //        url: "/ColorMaster/Delete/" + ID,
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
    debugger;
    $.ajax({
        url: "/ColorMaster/getbyID/" + ID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            $('#colorname').val(obj.ColorName);
            CheckColorAlloted(ID);

        },
        error: function (errormessage) {
            alert('delete failed..');
        }
    });
    
}
function CheckColorAlloted(ID) {
    debugger;
    $.ajax({
        url: "/ColorMaster/GetColorRefDetails",
        data: JSON.stringify({ ColorId: ID }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            CItemList = result;
            if (CItemList.length > 0) {

                for (var x = 0; x < CItemList.length; x++) {

                    var c = CItemList[x].CountColorId;

                    if (c > 0) {
                        //alert("Color Is Alloted For Some Other Entry,Please Check it....");
                        var msg = 'Color Is Alloted For Some Other Entry,Please Check it...';
                        var flg = 4;
                        var mode = 1;
                        AlartMessage(msg, flg, mode);
                    }
                    else {
                        var ans = confirm("Are you sure you want to delete this Record?");
                        if (ans) {
                            $.ajax({
                                url: "/ColorMaster/Delete/" + ID,
                                type: "POST",
                                contentType: "application/json;charset=UTF-8",
                                dataType: "json",
                                success: function (result) {

                                    if (result.Value == 1) {
                                        $('#tbody').DataTable().destroy();
                                        AddUserEntryLog('Master', 'Color', 'DELETE', $('#colorname').val());
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
//Add Data Function 
function Add() {
    var res = validate();
    if (res == false) {
        return false;
    }
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

    var ColorObj = {
        ColorId: $('#ColorID').val(),
        ColorCode: $('#colorcode').val(),
        ColorName: $('#colorname').val(),
        Pantone: $('#pantone').val(),
        ColorGroupId: $('#ddlcolorgroup').val(),
        ColorNo: $('#Colorno').val(),
        Lookup: $('#lookup').val(),
        //ColorOth: $('#coloroth').val(),
        IsActive: ischecked,
    };
    $("#btnAdd").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        type: "POST",
        url: "/ColorMaster/Add",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(ColorObj),
        dataType: "json",
        success: function (result) {
            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            }
            else if (result.Value == -1) {
                //alert('Given Color is Already Available...');
                var msg = 'Given Color is Already Available...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }
            else {
                
                AddUserEntryLog('Master', 'Color', 'ADD', $('#colorname').val());

                $('#tbody').DataTable().destroy();
                loadData();
                $('#myModal').modal('hide');
                $('#ColorID').val("");
                $('#ddlcolorgroup').val("");
                $('#colorcode').val("");
                $('#colorname').val("");
                $('#pantone').val("");
                $('#Colorno').val("");
                $('#lookup').val("");
                // $('#coloroth').val("");
                $('#Status').val("");
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
        //if (ischecked) {
        //    checkbox_value += "on";
        //}
        //else {
        //    checkbox_value += "off";
        //}
    });

    var ColorObj = {
        ColorId: $('#ColorID').val(),
        ColorCode: $('#colorcode').val(),
        ColorName: $('#colorname').val(),
        Pantone: $('#pantone').val(),
        ColorGroupId: $('#ddlcolorgroup').val(),
        ColorNo: $('#Colorno').val(),
        Lookup: $('#lookup').val(),
        ColorOth: $('#coloroth').val(),
        IsActive: ischecked,
    };
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/ColorMaster/Update",
        data: JSON.stringify(ColorObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
           
            if (result.Status == 'SUCCESS') {
                AddUserEntryLog('Master', 'Color', 'UPDATE', $('#colorname').val());
                AddPopupAlert($('#colorname').val()  + ' - Color was Updated..');
                $('#tbody').DataTable().destroy();
                $('#myModal').modal('hide');
                loadData();
                $('#ColorID').val("");
                $('#ddlcolorgroup').val("");
                $('#colorcode').val("");
                $('#colorname').val("");
                $('#pantone').val("");
                $('#Colorno').val("");
                $('#lookup').val("");
                //$('#coloroth').val("");
                $('#Status').val("");
                //alert('Data Updated Successfully');
                //var msg = 'Data Updated Successfully...';
                //var flg = 1;
                //var mode = 0;
                //AlartMessage(msg, flg, mode);
                $("#btnUpdate").attr("disabled", false);
            }
            else if (result.Status == 'EXISTS') {
                //alert('Given Color is Already Available...');
                var msg = 'Given Color is Already Available...';
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
function LoadCode() {

    var code = $('#colorcode').val();
    alert(code);
    $('#colorname').val(Code);
}

$(document).ready(function () {

    var Code = 0;
    $("#colorcode").keyup(function () {
        var dInput = $(this).val();
        Code = dInput;
        $('#colorname').val(Code);
    });

    $("#pantone").keyup(function () {
        var dPan = $(this).val();
        var CName = (Code) + ("-") + (dPan);

        if (Code != "") {

            $('#colorname').val(CName);
        } else {
            var CName = ("-") + (dPan);
            $('#colorname').val(CName);
        }
    });
});