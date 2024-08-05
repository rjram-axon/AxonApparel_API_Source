/// <reference path="jquery-1.9.1.intellisense.js" />
//Load Data in Table when documents is ready
var CItemList = [];
$(document).ready(function () {
    loadData();
});

//Load Data function
function loadData() {

    
    $.ajax({
        type: "GET",
        url: '/Country/List/',
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
                         { title: "CountryId", "visible": false },
                         { title: "Country" },
                         { title: "Lookup" },
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
    $('#txtCountryID').val("");
    $('#txtName').val("");
    $('#txtlookup').val("");    
    $('#Status').val("");

    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#txtCountryID').css('border-color', 'lightgrey');
    $('#txtName').css('border-color', 'lightgrey');
    $('#txtlookup').css('border-color', 'lightgrey');    
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
    var countryObj = {
        CountryId: $('#txtCountryID').val(),
        CountryName: $('#txtName').val(),
        Lookup: $('#txtlookup').val(),        
        IsActive: ischecked,
    };
    $("#btnAdd").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/Country/Add",
        data: JSON.stringify(countryObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            }
            else if (result.Value == -1) {
                //alert('Given Country is Already Available...');
                var msg = 'Given Country is Already Available...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }
            else {
                AddUserEntryLog('Master', 'Country', 'ADD', $('#txtName').val());
                $('#tbody').DataTable().destroy();
                loadData();
                $('#myModal').modal('hide');
                //clearTextBox();
                //alert('Data Saved Successfully');
                var msg = 'Data Saved Successfully...';
                var flg = 1;
                var mode =0;
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
    if ($('#txtName').val().trim() == "") {
        $('#txtName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtName').css('border-color', 'lightgrey');
    }
    if ($('#txtlookup').val().trim() == "") {
        $('#txtlookup').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtlookup').css('border-color', 'lightgrey');
    }
    return isValid;
}

function getbyID(CountryID) {
    $('#txtName').css('border-color', 'lightgrey');
    $('#txtlookup').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Country/getbyID/" + CountryID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {
                $('#txtCountryID').val(obj.CountryId);
                $('#txtName').val(obj.CountryName);
                $('#txtlookup').val(obj.Lookup);
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

function getViewbyID(CountryID) {
    $('#txtName').css('border-color', 'lightgrey');
    $('#txtlookup').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Country/getbyID/" + CountryID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {
                $('#txtCountryID').val(obj.CountryId);
                $('#txtName').val(obj.CountryName);
                $('#txtlookup').val(obj.Lookup);
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

//function for updating country's record
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

    var countryObj = {
        CountryId: $('#txtCountryID').val(),
        CountryName: $('#txtName').val(),
        Lookup: $('#txtlookup').val(),
        IsActive: ischecked,
    };
    debugger;
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/Country/Update",
        data: JSON.stringify(countryObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            
            if (result.Status == 'SUCCESS') {
                AddUserEntryLog('Master', 'Country', 'UPDATE', $('#txtName').val());
                $('#tbody').DataTable().destroy();
                loadData();
                $('#myModal').modal('hide');
                $('#txtCountryID').val("");
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
                //alert('Given Country is Already Available...');
                var msg = 'Given Country is Already Available...';
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
//function for deleting department's record
function Delete(ID) {
    debugger;
    $.ajax({
        url: "/Country/getbyID/" + ID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            $('#txtName').val(obj.CountryName);
            CheckCountrylloted(ID);

        },
        error: function (errormessage) {
            alert('delete failed..');
        }
    });
    
}

function CheckCountrylloted(Id) {

    $.ajax({
        url: "/Country/GetCountryRefDetails",
        data: JSON.stringify({ CountryId: Id }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            CItemList = result;
            if (CItemList.length > 0) {

                for (var x = 0; x < CItemList.length; x++) {

                    var c = CItemList[x].CountCountryId;

                    if (c > 0) {
                        //alert("Country Is Alloted For Some Other Entry,Please Check it....");
                        var msg = 'Country Is Alloted For Some Other Entry,Please Check it...';
                        var flg = 4;
                        var mode = 1;
                        AlartMessage(msg, flg, mode);
                    }
                    else {
                        var ans = confirm("Are you sure you want to delete this Record?");
                        if (ans) {
                            LoadingSymb();
                            $.ajax({
                                url: "/Country/Delete/" + Id,
                                type: "POST",
                                contentType: "application/json;charset=UTF-8",
                                dataType: "json",
                                success: function (result) {

                                    if (result.Value == 1) {
                                        AddUserEntryLog('Master', 'Country', 'DELETE', $('#txtName').val());
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