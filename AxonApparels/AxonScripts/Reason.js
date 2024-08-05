
$(document).ready(function () {

    loadData();
})


function Add() {

    var isAct = false;
    var res = validate();
    if (res == false) {
        return false;
    }
    var checkbox_value = "";
    $(":checkbox").each(function () {
        var ischecked = $('#Status').is(":checked");
        if (ischecked) {
            checkbox_value += "on";
            isAct = true;
        }
        else {
            checkbox_value += "off";
        }
    });
    var reasonObj = {
        ReasonId: $('#ReasonID').val(),
        ReasonName: $('#Name').val(),
        IsActive: isAct,
    };
    $("#btnAdd").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/Reason/Add",
        data: JSON.stringify(reasonObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            }
            else {
                AddUserEntryLog('Master', 'Reason', 'ADD', $('#Name').val());
                $('#tbody').DataTable().destroy();
                loadData();
                $('#myModal').modal('hide');
                $('#SeasonID').val("");
                $('#Name').val("");
                //alert('Data Saved Successfully');
                var msg = 'Data Saved Successfully...';
                var flg = 1;
                var mode = 0;
                AlartMessage(msg, flg, mode);
                $("#btnAdd").attr("disabled", false);
            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
//
function loadData() {

    $.ajax({
        type: "GET",
        url: '/Reason/List/',
        data: JSON.stringify({}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");
            $('#tbody').DataTable({
                data: dataSet,
                columns: [

                         { title: "ReasonId", "visible": false },
                         { title: "Reason" },
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

function getbyID(ReasonID) {
    debugger;
    $('#Name').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Reason/getbyID/" + ReasonID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {
                $('#ReasonID').val(obj.ReasonId);
                $('#Name').val(obj.ReasonName);
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

function getViewbyID(ReasonID) {
    debugger;
    $('#Name').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Reason/getbyID/" + ReasonID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {
                $('#ReasonID').val(obj.ReasonId);
                $('#Name').val(obj.ReasonName);
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

//function for updating department's record
function Update() {
    //var isAct = false;
    var ischecked = false;
    var res = validate();
    if (res == false) {
        return false;
    }
    var checkbox_value = "";
    $(":checkbox").each(function () {
        ischecked = $('#Status').is(":checked");
    });

    var reaObj = {
        ReasonId: $('#ReasonID').val(),
        ReasonName: $('#Name').val(),
        IsActive: ischecked,
    };
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/Reason/Update",
        data: JSON.stringify(reaObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            
            if (result.Value == 1) {
                AddUserEntryLog('Master', 'Reason', 'UPDATE', $('#Name').val());
                $('#tbody').DataTable().destroy();
                loadData();
                $('#myModal').modal('hide');
                $('#ReasonID').val("");
                $('#Name').val("");
                $('#Status').prop("checked", false);
                //alert('Data Updated Successfully');
                var msg = 'Data Updated Successfully...';
                var flg = 1;
                var mode = 0;
                AlartMessage(msg, flg, mode);
                $("#btnUpdate").attr("disabled", false);
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
//function for deleting department's record
function Delete(ID) {
    debugger;
    var ans = confirm("Are you sure you want to delete this Record?");
    debugger;
    if (ans) {
        LoadingSymb();
        $.ajax({
            url: "/Reason/getbyID/" + ID,
            typr: "GET",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                debugger;
                var obj = result.Value;
                $('#Name').val(obj.ReasonName);
                
                $.ajax({
                    url: "/Reason/Delete/" + ID,
                    type: "POST",
                    contentType: "application/json;charset=UTF-8",
                    dataType: "json",
                    success: function (result) {
                        debugger;
                        if (result.Value == 1) {
                            $('#tbody').DataTable().destroy();
                            AddUserEntryLog('Master', 'Reason', 'DELETE', $('#Name').val());
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
        });
    }
}
//Function for clearing the textboxes
function clearTextBox() {

    $('#ReasonID').val("");
    $('#Name').val("");
    $('#Status').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#ReasonID').css('border-color', 'lightgrey');
    $('#Name').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
}

//Valdidation using jquery
function validate() {
    var isValid = true;
    if ($('#Name').val().trim() == "") {
        $('#Name').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Name').css('border-color', 'lightgrey');
    }

    return isValid;
}