
$(document).ready(function () {
    loadData();
});

//Load Data function
function loadData() {
    debugger;
    $.ajax({
        type: "GET",
        url: '/Ledger/List/',
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
                         { title: "LedgerId", "visible": false },
                         { title: "Ledger" },
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
    $('#LedgerID').val("");
    $('#Name').val("");
    $('#Status').val("");

    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#LedgerId').css('border-color', 'lightgrey');
    $('#Name').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    // $('#tbody').DataTable().destroy();

}

//Add Data Function 
function Add() {
    debugger;
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

    var LedgerObj = {
        LedgerId: $('#LedgerId').val(),
        LedgerName: $('#Name').val(),
        IsActive: ischecked,
    };
    $("#btnAdd").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/Ledger/Add",
        data: JSON.stringify(LedgerObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            }
            else {
                AddUserEntryLog('Master', 'Ledger', 'ADD', $('#Name').val());
                $('#tbody').DataTable().destroy();
                loadData();
                $('#myModal').modal('hide');
                // clearTextBox();
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

//Function for getting the Data Based upon ColorGroup ID
function getbyID(ColorGroupID) {
    $('#Status').css('border-color', 'lightgrey');
    $('#LedgerId').css('border-color', 'lightgrey');
    $('#Name').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');

    $.ajax({
        url: "/Ledger/getbyID/" + ColorGroupID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;

            $('#LedgerId').val(obj.LedgerId);
            $('#Name').val(obj.LedgerName);

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

function getViewbyID(ColorGroupID) {
    $('#Status').css('border-color', 'lightgrey');
    $('#LedgerId').css('border-color', 'lightgrey');
    $('#Name').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');

    $.ajax({
        url: "/Ledger/getbyID/" + ColorGroupID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;

            $('#LedgerId').val(obj.LedgerId);
            $('#Name').val(obj.LedgerName);

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

//function for updating ColorGroup record
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

    var LedgerObj = {
        LedgerId: $('#LedgerId').val(),
        LedgerName: $('#Name').val(),
        IsActive: ischecked,
    };
    debugger;
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/Ledger/Update",
        data: JSON.stringify(LedgerObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.Value == 1) {
                AddUserEntryLog('Master', 'Ledger', 'UPDATE', $('#Name').val());
                $('#tbody').DataTable().destroy();
                $('#myModal').modal('hide');
                loadData();
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

//function for deleting ColorGroup record
function Delete(ID) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        LoadingSymb();
        $.ajax({
            url: "/Ledger/getbyID/" + ID,
            typr: "GET",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                var obj = result.Value;
                $('#Name').val(obj.LedgerName);

                $.ajax({
                    url: "/Ledger/Delete/" + ID,
                    type: "POST",
                    contentType: "application/json;charset=UTF-8",
                    dataType: "json",
                    success: function (result) {

                        if (result.Value == 1) {
                            $('#tbody').DataTable().destroy();
                            AddUserEntryLog('Master', 'Ledger', 'DELETE', $('#Name').val());
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