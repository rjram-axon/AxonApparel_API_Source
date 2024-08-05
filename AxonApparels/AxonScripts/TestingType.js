$(document).ready(function () {
    loadData();
});

//Load Data function
function loadData() {

    $.ajax({
        type: "GET",
        url: '/TestingType/List/',
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
                         { title: "TestingType ID", "visible": false },
                         { title: "Testing Type" },
                         { title: "Garment / Fabric" },
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
    $('#txtTestingTypeID').val("");
    $('#txttestingtype').val("");
    $('#Status').val("");    
    $('input:radio[name="garfab"][value="G"]').prop('checked', true);

    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#txtTestingTypeID').css('border-color', 'lightgrey');
    $('#txttestingtype').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
}

function validate() {
    var isValid = true;
    if ($('#txttestingtype').val().trim() == "") {
        $('#txttestingtype').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txttestingtype').css('border-color', 'lightgrey');
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

    var garfab = $('input[name="garfab"]:checked').attr('value');

    var TestingTypeObj = {
        TestingTypeId: $('#txtTestingTypeID').val(),
        TestingTypeName: $('#txttestingtype').val(),
        GarFab:garfab,
        IsActive: ischecked,
    };

    LoadingSymb();

    $.ajax({
        url: "/TestingType/Add",
        data: JSON.stringify(TestingTypeObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            }
            else {
                $('#tbody').DataTable().destroy();

                loadData();
                $('#myModal').modal('hide');
                $('#txtTestingTypeID').val("");
                $('#txttestingtype').val("");

                alert('Data Saved Successfully');
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

    var garfab = $('input[name="garfab"]:checked').attr('value');

    var TestingTypeObj = {
        TestingTypeId: $('#txtTestingTypeID').val(),
        TestingTypeName: $('#txttestingtype').val(),
        GarFab: garfab,
        IsActive: ischecked,
    };

    LoadingSymb();

    $.ajax({
        url: "/TestingType/Update",
        data: JSON.stringify(TestingTypeObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.Status == 'SUCCESS') {
                $('#myModal').modal('hide');
                $('#tbody').DataTable().destroy();

                loadData();
                $('#myModal').modal('hide');
                $('#txtTestingTypeID').val("");
                $('#txttestingtype').val("");

                alert('Data Updated Successfully');
            }
            else {
                //window.location.href = "/Error/Index";
                alert('Data updated failed');
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
            url: "/TestingType/Delete/" + ID,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {

                if (result.Status == "SUCCESS") {
                    $('#tbody').DataTable().destroy();

                    loadData();
                    alert('Data deleted Successfully');

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

//Function for getting the Data Based upon TestingType ID
function getbyID(SampleTypeID) {
    debugger;
    $('#Status').css('border-color', 'lightgrey');
    $('#txtTestingTypeID').css('border-color', 'lightgrey');
    $('#txttestingtype').css('border-color', 'lightgrey');

    $.ajax({
        url: "/TestingType/getbyID/" + SampleTypeID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;

            $('#txtTestingTypeID').val(obj.TestingTypeId);
            $('#txttestingtype').val(obj.TestingTypeName);

            if (obj.GarFab == "Garment") {
                $('input:radio[name="garfab"][value="G"]').prop('checked', true);
            }
            else {
                $('input:radio[name="garfab"][value="F"]').prop('checked', true);
            }

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
    $('#txtTestingTypeID').css('border-color', 'lightgrey');
    $('#txttestingtype').css('border-color', 'lightgrey');

    $.ajax({
        url: "/TestingType/getbyID/" + SampleTypeID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;

            $('#txtTestingTypeID').val(obj.TestingTypeId);
            $('#txttestingtype').val(obj.TestingTypeName);

            if (obj.GarFab == "Garment") {
                $('input:radio[name="garfab"][value="G"]').prop('checked', true);
            }
            else {
                $('input:radio[name="garfab"][value="F"]').prop('checked', true);
            }

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