/// <reference path="jquery-1.9.1.intellisense.js" />
//Load Data in Table when documents is ready
var CItemList = [];
$(document).ready(function () {
    loadData();
});

//Load Data function
function loadData() {
    //$.ajax({
    //    url: "/Designation/List",
    //    type: "GET",
    //    contentType: "application/json;charset=utf-8",
    //    dataType: "json",
    //    success: function (result) {
    //        if (result.Status == "SUCCESS") {
    //            var html = '';

    //            $.each(result.Value, function (key, item) {
    //                html += '<tr>';
    //                html += '<td style="visibility:hidden;">' + item.CountryId + '</td>';
    //                html += '<td>' + item.CountryName + '</td>';
    //                html += '<td>' + item.Lookup + '</td>';
    //                html += '<td>' + item.IsActive + '</td>';
    //                html += '<td><a href="#" onclick="return getbyID(' + item.CountryId + ')">Edit</a> | <a href="#" onclick="Delele(' + item.CountryId + ')">Delete</a></td>';
    //                html += '</tr>';
    //            });
    //            $('.tbody').html(html);
    //        }
    //        else {

    //        }


    //    },
    //    error: function (errormessage) {
    //        alert(errormessage.responseText);
    //    }
    //});

    $.ajax({
        type: "GET",
        url: '/Designation/List/',
        data: JSON.stringify({}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");
            $('#tbody').DataTable({
                data: dataSet,
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
                         { title: "DesginationID", "visible": false },
                         { title: "Designation" },
                         { title: "Status" },
                         { title: "Action" },
                ]
            });
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

//Function for clearing the textboxes
function clearTextBox() {
    $('#txtDesigID').val("");
    $('#txtDesignation').val("");
    $('#Status').val("");

    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#txtDesigID').css('border-color', 'lightgrey');
    $('#txtDesignation').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    //$('#tbody').DataTable().destroy();
}

//Add Data Function 
function Add() {
    var res = validate();
    if (res == false) {
        return false;
    }

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
    debugger;
    var DesigObj = {
        Id: $('#txtDesigID').val(),
        DesignationName: $('#txtDesignation').val(),
        IsActive: ischecked,
    };
    $("#btnAdd").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/Designation/Add",
        data: JSON.stringify(DesigObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            } else if (result.Value == -1) {
                //alert('Given Designation is Already Available...');
                var msg = 'Given Designation is Already Available...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }
            else {
                AddUserEntryLog('Master', 'Designation', 'ADD', $('#txtDesignation').val());
                $('#tbody').DataTable().destroy();

                loadData();
                $('#myModal').modal('hide');
                //alert('Data Saved Successfully');
                var msg = 'Data Saved Successfully...';
                var flg = 1;
                var mode = 0;
                AlartMessage(msg, flg, mode);
                $("#btnAdd").attr("disabled", false);
            }
            //clearTextBox();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Valdidation using jquery
function validate() {
    var isValid = true;
    if ($('#txtDesignation').val().trim() == "") {
        $('#txtDesignation').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtDesignation').css('border-color', 'lightgrey');
    }
    return isValid;
}

function getbyID(DesignationID) {
    $('#txtDesignation').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Designation/getbyID/" + DesignationID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {
                $('#txtDesigID').val(obj.Id);
                $('#txtDesignation').val(obj.DesignationName);
                if (obj.IsActive == "TRUE") {
                    $('#Status').prop("checked", true);
                } else {
                    $('#Status').prop("checked", false);
                }
                debugger;
                $('#myModal').modal('show');
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

function getViewbyID(DesignationID) {
    $('#txtDesignation').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Designation/getbyID/" + DesignationID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {
                $('#txtDesigID').val(obj.Id);
                $('#txtDesignation').val(obj.DesignationName);
                if (obj.IsActive == "TRUE") {
                    $('#Status').prop("checked", true);
                } else {
                    $('#Status').prop("checked", false);
                }
                debugger;
                $('#myModal').modal('show');
                $('#btnUpdate').hide();
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

//function for updating designation's record
function Update() {
    var ischecked = false;
    var res = validate();
    if (res == false) {
        return false;
    }
    var checkbox_value = "";
    $(":checkbox").each(function () {
        ischecked = $('#Status').is(":checked");

        //if (ischecked) {
        //    checkbox_value += "on";
        //    isAct = true;
        //}
        //else {
        //    checkbox_value += "off";
        //}
    });

    var DesigObj = {
        Id: $('#txtDesigID').val(),
        DesignationName: $('#txtDesignation').val(),
        IsActive: ischecked,
    };

    debugger;
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/Designation/Update",
        data: JSON.stringify(DesigObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.Status == 'SUCCESS') {
                AddUserEntryLog('Master', 'Designation', 'UPDATE', $('#txtDesignation').val());
                $('#tbody').DataTable().destroy();
                loadData();
                $('#myModal').modal('hide');
                $('#txtDesigID').val("");
                $('#txtDesignation').val("");
                $('#Status').prop("checked", false);
                //alert('Data Updated Successfully');
                var msg = 'Data Updated Successfully...';
                var flg = 1;
                var mode = 0;
                AlartMessage(msg, flg, mode);
                $("#btnUpdate").attr("disabled", false);
            }
            else if (result.Status == 'EXISTS') {
                //alert('Given Designation is Already Available...');
                var msg = 'Given Designation is Already Available...';
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

//function for deleting designation's record
function Delete(ID) {
    debugger;
    $.ajax({
        url: "/Designation/getbyID/" + ID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            $('#txtDesignation').val(obj.DesignationName);
            CheckDesignationAlloted(ID);

        },
        error: function (errormessage) {
            alert('delete failed..');
        }
    });
    
}


function CheckDesignationAlloted(Id) {

    $.ajax({
        url: "/Designation/GetDesignationRefDetails",
        data: JSON.stringify({ Id: Id }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            CItemList = result;
            if (CItemList.length > 0) {

                for (var x = 0; x < CItemList.length; x++) {

                    var c = CItemList[x].CountDesgiId;

                    if (c > 0) {
                        //alert("Designation Is Alloted For Some Other Entry,Please Check it....");
                        var msg = 'Designation Is Alloted For Some Other Entry,Please Check it...';
                        var flg = 4;
                        var mode = 1;
                        AlartMessage(msg, flg, mode);
                    }
                    else {
                        var ans = confirm("Are you sure you want to delete this Record?");
                        if (ans) {
                            LoadingSymb();
                            $.ajax({
                                url: "/Designation/Delete/" + Id,
                                type: "POST",
                                contentType: "application/json;charset=UTF-8",
                                dataType: "json",
                                success: function (result) {

                                    if (result.Value == 1) {
                                        AddUserEntryLog('Master', 'Designation', 'DELETE', $('#txtDesignation').val());
                                        $('#tbody').DataTable().destroy();

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