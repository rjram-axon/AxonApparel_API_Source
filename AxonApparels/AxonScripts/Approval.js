$(document).ready(function () {
    loadData();
})

function loadData() {


    $.ajax({
        type: "GET",
        url: '/Approval/List/',
        data: JSON.stringify({}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");
            $('#tbody').DataTable({
                data: dataSet,
                columns: [

                         { title: "ApprovalId", "visible": false },
                         { title: "Approval" },
                         { title: "ApprovalDays" },
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
        //    isAct = true;
        //}
        //else {
        //    checkbox_value += "off";
        //}
    });

    //var freeOrcharge = $('input[name="FreeOrCharge"]:checked').attr('value');
    var AppObj = {
        ApprovalId: $('#ApprovalID').val(),
        ApprovalName: $('#Name').val(),
        ApprovalDays: $('#ApprovalDays').val(),
        IsActive: ischecked,
    };
    $("#btnAdd").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/Approval/Add",
        data: JSON.stringify(AppObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {          

            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            }
            else if (result.Value == -1) {
                //alert('Given Approval is Already Available...');
                var msg = 'Given Approval is Already Available...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }
            else {
                AddUserEntryLog('Master', 'Approval', 'ADD', $('#Name').val());

                $('#tbody').DataTable().destroy();
                loadData();
                $('#myModal').modal('hide');
                $('#ApprovalID').val("");
                $('#Name').val("");
                $('#ApprovalDays').val("");
                $('#Status').val("");
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
//function for updating department's record
function Update() {
    //var isAct = false;
    var ischecked = false;
    var res = validate();
    if (res == false) {
        return false;
    }
    debugger;
    var checkbox_value = "";
    $(":checkbox").each(function () {
        ischecked = $('#Status').is(":checked");

    });

  //  var freeOrcharge = $('input[name="FreeOrCharge"]:checked').attr('value');

    var AppObj = {
        ApprovalId: $('#ApprovalID').val(),
        ApprovalName: $('#Name').val(),
        ApprovalDays: $('#ApprovalDays').val(),
        IsActive: ischecked,
    };
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/Approval/Update",
        data: JSON.stringify(AppObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
          
            if (result.Status == 'SUCCESS') {
                AddUserEntryLog('Master', 'Approval', 'UPDATE', $('#Name').val());

                $('#tbody').DataTable().destroy();
                loadData();
                $('#myModal').modal('hide');
                $('#ApprovalID').val("");
                $('#Name').val("");
                $('#ApprovalDays').val(""),
                $('#Status').val("");
                //alert('Data Updated Successfully');
                var msg = 'Data Updated Successfully...';
                var flg = 1;
                var mode = 0;
                AlartMessage(msg, flg, mode);
                $("#btnUpdate").attr("disabled", false);
            }
            else if (result.Status == 'EXISTS') {
                //alert('Given Approval is Already Available...');
                var msg = 'Given Approval is Already Available...';
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
function getbyID(ApprovalId) {
    debugger;
    $('#ApprovalID').css('border-color', 'lightgrey');
    $('#Name').css('border-color', 'lightgrey');
    $('#ApprovalDays').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Approval/getbyID/" + ApprovalId,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;

            if (result.Status == 'SUCCESS') {
                $('#ApprovalID').val(obj.ApprovalId);
                $('#Name').val(obj.ApprovalName);
                $('#ApprovalDays').val(obj.ApprovalDays);
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

function getViewbyID(ApprovalId) {
    debugger;
    $('#ApprovalID').css('border-color', 'lightgrey');
    $('#Name').css('border-color', 'lightgrey');
    $('#ApprovalDays').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Approval/getbyID/" + ApprovalId,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;

            if (result.Status == 'SUCCESS') {
                $('#ApprovalID').val(obj.ApprovalId);
                $('#Name').val(obj.ApprovalName);
                $('#ApprovalDays').val(obj.ApprovalDays);
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


//function for deleting department's record
function Delete(ID) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        LoadingSymb();
        $.ajax({
            url: "/Approval/getbyID/" + ID,
            typr: "GET",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                var obj = result.Value;
                $('#Name').val(obj.ApprovalName);

                $.ajax({
                    url: "/Approval/Delete/" + ID,
                    type: "POST",
                    contentType: "application/json;charset=UTF-8",
                    dataType: "json",
                    success: function (result) {

                        if (result.Value == 1) {
                            $('#tbody').DataTable().destroy();
                            AddUserEntryLog('Master', 'Approval', 'DELETE', $('#Name').val());
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
function clearTextBox() {
    $('#ApprovalID').val("");
    $('#Name').val("");
    $('#ApprovalDays').val("");
    $('#Status').val("");

    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#ApprovalID').css('border-color', 'lightgrey');
    $('#ApprovalDays').css('border-color', 'lightgrey');
    $('#Name').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
}


