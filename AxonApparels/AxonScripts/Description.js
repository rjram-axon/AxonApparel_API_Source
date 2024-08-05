var view = 0;

$(document).ready(function () {
    loadmainlist();
});
function loadmainlist() {
    $.ajax({
        type: "GET",
        url: '/Description/List',
        data: JSON.stringify({}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");
            $('#tbody').DataTable({
                data: dataSet,
                columns: [

                         { title: "DescriptionId", "visible": false },
                         { title: "Description" },
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

function Add() {
    debugger;
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
    var obj = {
        DescriptiopnId: $('#DescriptionID').val(),
        DescriptionName: $('#Name').val(),
        IsActive: isAct,

    };
    $.ajax({
        url: "/Description/Add",
        data: JSON.stringify(obj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == 0) {
                //alert(result.Message);
                var message = result.Message;
                var msg = message;
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
            }
            else {
                AddUserEntryLog('Master', 'Description', 'ADD', $('#Name').val());
                $('#tbody').DataTable().destroy();
                loadmainlist();
                $('#myModal').modal('hide');
                $('#DescriptionID').val("");
                $('#Name').val("");
                $('#Status').prop("checked", false);
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
function clearTextBox() {

    $('#DescriptionID').val("");
    $('#Name').val("");
    $('#Status').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#DescriptionID').css('border-color', 'lightgrey');
    $('#Name').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $('#Status').prop("checked", false);
}
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
function getbyID(DescriptionID) {
    debugger;
    $('#Name').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Description/getbyID/" + DescriptionID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {
                $('#DescriptionID').val(obj.DescriptionId);
                $('#Name').val(obj.DescriptionName);
                if (obj.IsActive == "TRUE") {
                    $('#Status').prop("checked", true);
                } else {
                    $('#Status').prop("checked", false);
                }
                debugger;
                $('#myModal').modal('show');
                if(view==1){
                    $('#btnUpdate').hide();
                    $('#btnAdd').hide();
                    view = 0;
                } else {
                    $('#btnUpdate').show();
                    $('#btnAdd').hide();
                }
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
function getViewbyID(DescriptionID) {
    view = 1;
    getbyID(DescriptionID);
}
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

    var Obj = {
        DescriptionId: $('#DescriptionID').val(),
        DescriptionName: $('#Name').val(),
        IsActive: ischecked,
    };
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/Description/Update",
        data: JSON.stringify(Obj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.Value == 1) {
                AddUserEntryLog('Master', 'Description', 'UPDATE', $('#Name').val());
                $('#tbody').DataTable().destroy();
                loadmainlist();
                $('#myModal').modal('hide');
                $('#DescriptionID').val("");
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
function Delete(ID) {
    debugger;
    var ans = confirm("Are you sure you want to delete this Record?");
    debugger;
    if (ans) {
        LoadingSymb();
        $.ajax({
            url: "/Description/getbyID/" + ID,
            typr: "GET",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                debugger;
                var obj = result.Value;
                $('#Name').val(obj.DescriptionName);

                $.ajax({
                    url: "/Description/Delete/" + ID,
                    type: "POST",
                    contentType: "application/json;charset=UTF-8",
                    dataType: "json",
                    success: function (result) {
                        debugger;
                        if (result.Value == 1) {
                            $('#tbody').DataTable().destroy();
                            AddUserEntryLog('Master', 'Description', 'DELETE', $('#Name').val());
                            //alert('Delete data successfully...!');
                            var msg = 'Data Delete Successfully...';
                            var flg = 1;
                            var mode = 0;
                            AlartMessage(msg, flg, mode);
                            loadmainlist();
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