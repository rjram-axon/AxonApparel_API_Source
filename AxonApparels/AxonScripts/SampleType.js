$(document).ready(function () {
    loadData();
});

//Load Data function
function loadData() {

    $.ajax({
        type: "GET",
        url: '/SampleType/List/',
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
                         { title: "SampleType ID", "visible": false },
                         { title: "Sample Type" },
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
    $('#SampleTypeID').val("");
    $('#txtsampletype').val("");  
    $('#Status').val("");

    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#SampleTypeID').css('border-color', 'lightgrey');
    $('#txtsampletype').css('border-color', 'lightgrey');   
    $('#Status').css('border-color', 'lightgrey');    
}

//Valdidation using jquery
function validate() {
    var isValid = true;
    if ($('#txtsampletype').val().trim() == "") {
        $('#txtsampletype').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtsampletype').css('border-color', 'lightgrey');
    }
   
    return isValid;
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
    });

    var SampleTypeObj = {
        SampleTypeId: $('#SampleTypeID').val(),
        SampleType: $('#txtsampletype').val(),
        IsActive: ischecked,        
    };
    $("#btnAdd").attr("disabled", true);
    LoadingSymb();

    $.ajax({
        url: "/SampleType/Add",
        data: JSON.stringify(SampleTypeObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            }            
            else {
                AddUserEntryLog('Master', 'SampleType', 'ADD', $('#txtsampletype').val());

                $('#tbody').DataTable().destroy();

                loadData();
                $('#myModal').modal('hide');
                $('#SampleTypeID').val("");
                $('#txtsampletype').val("");
               
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

//function for updating Size record
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

    var SampleTypeObj = {
        SampleTypeId: $('#SampleTypeID').val(),
        SampleType: $('#txtsampletype').val(),
        IsActive: ischecked,
    };
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();

    $.ajax({
        url: "/SampleType/Update",
        data: JSON.stringify(SampleTypeObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.Status == 'SUCCESS') {
                AddUserEntryLog('Master', 'SampleType', 'UPDATE', $('#txtsampletype').val());

                $('#myModal').modal('hide');
                $('#tbody').DataTable().destroy();

                loadData();
                $('#myModal').modal('hide');
                $('#SampleTypeID').val("");
                $('#txtsampletype').val("");

                //alert('Data Updated Successfully');
                var msg = 'Data Updated Successfully...';
                var flg = 1;
                var mode = 0;
                AlartMessage(msg, flg, mode);
                $("#btnUpdate").attr("disabled", false);
            }
            //else if (result.Status == 'EXISTS') {
            //    alert('Given Size is Already Available...');
            //    return true;
            //}
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
            url: "/SampleType/getbyID/" + ID,
            typr: "GET",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                var obj = result.Value;
                $('#txtsampletype').val(obj.SampleType);

                $.ajax({
                    url: "/SampleType/Delete/" + ID,
                    type: "POST",
                    contentType: "application/json;charset=UTF-8",
                    dataType: "json",
                    success: function (result) {

                        if (result.Status == "SUCCESS") {
                            AddUserEntryLog('Master', 'SampleType', 'DELETE', $('#txtsampletype').val());
                            $('#tbody').DataTable().destroy();

                            loadData();
                            //alert('Data deleted Successfully');
                            var msg = 'Data deleted Successfully...';
                            var flg = 2;
                            var mode = 0;
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
        });
    }
}

//Function for getting the Data Based upon SampleType ID
function getbyID(SampleTypeID) {
    debugger;
    $('#Status').css('border-color', 'lightgrey');
    $('#SampleTypeID').css('border-color', 'lightgrey');
    $('#txtsampletype').css('border-color', 'lightgrey');

    $.ajax({
        url: "/SampleType/getbyID/" + SampleTypeID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;

            $('#SampleTypeID').val(obj.SampleTypeId);
            $('#txtsampletype').val(obj.SampleType);
            
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

function getViewbyID(SampleTypeID) {
    debugger;
    $('#Status').css('border-color', 'lightgrey');
    $('#SampleTypeID').css('border-color', 'lightgrey');
    $('#txtsampletype').css('border-color', 'lightgrey');

    $.ajax({
        url: "/SampleType/getbyID/" + SampleTypeID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;

            $('#SampleTypeID').val(obj.SampleTypeId);
            $('#txtsampletype').val(obj.SampleType);

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