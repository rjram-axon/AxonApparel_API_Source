$(document).ready(function () {
    loadData();
   
});


function loadData() {


    $.ajax({
        type: "GET",
        url: '/OverHeads/List/',
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
                         { title: "Commercial" },
                         { title: "Cost Type" },
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

    $('#txtCommercialID').val("");
    $('#txtCommercial').val("");
    $('#ddlcosttype').val("");
    $('#Status').val("");

    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#txtCommercialID').css('border-color', 'lightgrey');
    $('#txtCommercial').css('border-color', 'lightgrey');
    $('#ddlcosttype').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    // $('#tbody').DataTable().destroy();
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
       
    });
    debugger;
    var Obj = {
        commercialid: $('#txtCommercialID').val(),
        commercial: $('#txtCommercial').val(),
        costtype: $('#ddlcosttype').val(),
        //Lookup: $('#txtlookup').val(),
        isactive: ischecked,
    };
    $("#btnAdd").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/OverHeads/Add",
        data: JSON.stringify(Obj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            } else if (result.Value == -1) {
                //alert('Given OverHeads is Already Available...');
                var msg = 'Given OverHeads is Already Available...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }
            else {
                AddUserEntryLog('Master', 'OverHeads', 'ADD', $('#txtCommercial').val());
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

    var Obj = {
        commercialid: $('#txtCommercialID').val(),
        commercial: $('#txtCommercial').val(),
        costtype: $('#ddlcosttype').val(),
        //Lookup: $('#txtlookup').val(),
        isactive: ischecked,
    };
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    debugger;
    $.ajax({
        url: "/OverHeads/Update",
        data: JSON.stringify(Obj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
           
            if (result.Status == 'SUCCESS') {
                AddUserEntryLog('Master', 'OverHeads', 'UPDATE', $('#txtCommercial').val());
                $('#tbody').DataTable().destroy();
                loadData();
                $('#myModal').modal('hide');
                $('#txtCommercialID').val("");
                $('#txtCommercial').val("");
                $('#ddlcosttype').val("");
                $('#Status').prop("checked", false);
                //alert('Data Updated Successfully');
                var msg = 'Data Updated Successfully...';
                var flg = 1;
                var mode = 0;
                AlartMessage(msg, flg, mode);
                $("#btnUpdate").attr("disabled", false);
            }
            else if (result.Status == 'EXISTS') {
                //alert('Given OverHeads is Already Available...');
                var msg = 'Given OverHeads is Already Available...';
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

//function for deleting City's record
function Delete(ID) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        LoadingSymb();
        $.ajax({
            url: "/OverHeads/getbyID/" + ID,
            typr: "GET",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                var obj = result.Value;
                $('#txtCommercial').val(obj.commercial);

                $.ajax({
                    url: "/OverHeads/Delete/" + ID,
                    type: "POST",
                    contentType: "application/json;charset=UTF-8",
                    dataType: "json",
                    success: function (result) {

                        if (result.Value == 1) {
                            $('#tbody').DataTable().destroy();
                            AddUserEntryLog('Master', 'OverHeads', 'DELETE', $('#txtCommercial').val());
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
    if ($('#txtCommercial').val() == "") {
        $('#txtCommercial').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtCommercial').css('border-color', 'lightgrey');
    }

    return isValid;
}

function getbyID(CityID) {

   

    $('#txtCommercial').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $.ajax({
        url: "/OverHeads/getbyID/" + CityID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {
                $('#txtCommercialID').val(obj.commercialid);
                $('#txtCommercial').val(obj.commercial);
                $('#ddlcosttype').val(obj.costtype);
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


function getViewbyID(CityID) {



    $('#txtCommercial').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $.ajax({
        url: "/OverHeads/getbyID/" + CityID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {
                $('#txtCommercialID').val(obj.commercialid);
                $('#txtCommercial').val(obj.commercial);
                $('#ddlcosttype').val(obj.costtype);
                if (obj.isactive == "TRUE") {
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