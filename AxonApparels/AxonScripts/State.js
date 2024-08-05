$(document).ready(function () {
    loadData();
});


function loadData() {


    $.ajax({
        type: "GET",
        url: '/State/List/',
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
                         { title: "ID", "visible": false },
                         { title: "State" },
                         { title: "Look Up" },
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

function clearTextBox() {

    $('#txtStateID').val("");
    $('#txtName').val("");
    $('#txtlookup').val("");
    $('#Status').val("");

    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#txtStateID').css('border-color', 'lightgrey');
    $('#txtName').css('border-color', 'lightgrey');
    $('#txtlookup').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    
}


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
    var stateObj = {
        id: $('#txtStateID').val(),
        state: $('#txtName').val(),
        lookup: $('#txtlookup').val(),
        //Lookup: $('#txtlookup').val(),
        isactive: ischecked,
    };
    $("#btnAdd").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/State/Add",
        data: JSON.stringify(stateObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            }
            else if (result.Value == -1) {
                //alert('Given State is Already Available...');
                var msg = 'Given State is Already Available...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }
            else {
                AddUserEntryLog('Master', 'State', 'ADD', $('#txtName').val());
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
            // clearTextBox();

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}


function Update() {
    var ischecked = false;
    var res = validate();
    if (res == false) {
        return false;
    }
    var checkbox_value = "";
    $(":checkbox").each(function () {
        ischecked = $('#Status').is(":checked");

    });

    var stateObj = {
        id: $('#txtStateID').val(),
        state: $('#txtName').val(),
        lookup: $('#txtlookup').val(),
        //Lookup: $('#txtlookup').val(),
        isactive: ischecked,
    };
    debugger;
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/State/Update",
        data: JSON.stringify(stateObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
           

            if (result.Status == 'SUCCESS') {
                AddUserEntryLog('Master', 'State', 'UPDATE', $('#txtName').val());
                $('#tbody').DataTable().destroy();
                loadData();
                $('#myModal').modal('hide');
                $('#txtStateID').val("");
                $('#txtName').val("");
                $('#txtlookup').val("");
                $('#Status').prop("checked", false);
                //alert('Data Updated Successfully');
                var msg = 'Data Updated Successfully...';
                var flg = 1;
                var mode = 0;
                AlartMessage(msg, flg, mode);
                $("#btnUpdate").attr("disabled", false);
            }
            else if (result.Status == 'EXISTS') {
                //alert('Given State is Already Available...');
                var msg = 'Given State is Already Available...';
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

function Delete(ID) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        LoadingSymb();
        $.ajax({
            url: "/State/getbyID/" + ID,
            typr: "GET",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                var obj = result.Value;
                $('#txtName').val(obj.state);

                $.ajax({
                    url: "/State/Delete/" + ID,
                    type: "POST",
                    contentType: "application/json;charset=UTF-8",
                    dataType: "json",
                    success: function (result) {

                        if (result.Value == 1) {
                            $('#tbody').DataTable().destroy();
                            AddUserEntryLog('Master', 'State', 'DELETE', $('#txtName').val());
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


function validate() {
    var isValid = true;
    if ($('#txtName').val() == "") {
        $('#txtName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtName').css('border-color', 'lightgrey');
    }

    return isValid;
}



function getbyID(ID) {

   

    $('#txtName').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $.ajax({
        url: "/State/getbyID/" + ID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {
                $('#txtStateID').val(obj.id);
                $('#txtName').val(obj.state);
                $('#txtlookup').val(obj.lookup);
                if (obj.isactive == "TRUE") {
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

function getViewbyID(ID) {



    $('#txtName').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $.ajax({
        url: "/State/getbyID/" + ID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {
                $('#txtStateID').val(obj.id);
                $('#txtName').val(obj.state);
                $('#txtlookup').val(obj.lookup);
                if (obj.isactive == "TRUE") {
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