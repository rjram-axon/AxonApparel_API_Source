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
        url: '/Terms/List/',
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
                         { title: "TermsId", "visible": false },
                         { title: "TermsName" },
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
    $('#txtTermID').val("");
    $('#txtTerms').val(""); 
    $('#Status').val("");

    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#txtTermID').css('border-color', 'lightgrey');
    $('#txtTerms').css('border-color', 'lightgrey'); 
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
        TermsId: $('#txtTermID').val(),
        TermsName: $('#txtTerms').val(),
        IsActive: ischecked,
    };
    LoadingSymb();
    $.ajax({
        url: "/Terms/Add",
        data: JSON.stringify(countryObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            }
            else if (result.Value == -1) {
                alert('Given Terms is Already Available...');
                return true;
            }
            else {
                $('#tbody').DataTable().destroy();
                loadData();
                $('#myModal').modal('hide');
                //clearTextBox();
                alert('Data Saved Successfully');
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
    if ($('#txtTerms').val().trim() == "") {
        $('#txtTerms').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtTerms').css('border-color', 'lightgrey');
    }
   
    return isValid;
}

function getbyID(TrmID) {
    $('#txtTerms').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Terms/getbyID/" + TrmID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {
                $('#txtTermID').val(obj.TermsId);
                $('#txtTerms').val(obj.TermsName);
            
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

function getViewbyID(TrmID) {
    $('#txtTerms').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Terms/getbyID/" + TrmID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {
                $('#txtTermID').val(obj.TermsId);
                $('#txtTerms').val(obj.TermsName);

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
        TermsId: $('#txtTermID').val(),
        TermsName: $('#txtTerms').val(),
        IsActive: ischecked,
    };
    debugger;
    LoadingSymb();
    $.ajax({
        url: "/Terms/Update",
        data: JSON.stringify(countryObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.Status == 'SUCCESS') {
                $('#tbody').DataTable().destroy();
                loadData();
                $('#myModal').modal('hide');
                $('#txtTermID').val("");
                $('#txtTerms').val("");               
                $('#Status').prop("checked", false);
                alert('Data Updated Successfully');
            }
            else if (result.Status == 'EXISTS') {
                alert('Given Terms is Already Available...');
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


    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        LoadingSymb();
        $.ajax({
            url: "/Terms/Delete/" + ID,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {

                if (result.Value == 1) {
                    $('#tbody').DataTable().destroy();
                    alert('Data Deleted Successfully');
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
