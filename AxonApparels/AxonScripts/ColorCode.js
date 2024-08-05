/// <reference path="jquery-1.9.1.intellisense.js" />
//Load Data in Table when documents is ready
$(document).ready(function () {
    loadData();
});

//Load Data function
function loadData() {
    //$.ajax({
    //    url: "/ColorCode/List",
    //    type: "GET",
    //    contentType: "application/json;charset=utf-8",
    //    dataType: "json",
    //    success: function (result) {
    //        var html = '';
    //        debugger;
    //        $.each(result, function (key, item) {
    //            html += '<tr>';
    //            html += '<td style="visibility:hidden;">' + item.ColorCodeId + '</td>';
    //            html += '<td>' + item.Supplier + '</td>';
    //            html += '<td>' + item.Color + '</td>';
    //            html += '<td>' + item.ColorShade + '</td>';                
    //            html += '<td>' + item.IsActive + '</td>';
    //            html += '<td><a href="#" onclick="return getbyID(' + item.ColorCodeId + ')">Edit</a> | <a href="#" onclick="Delele(' + item.ColorCodeId + ')">Delete</a></td>';
    //            html += '</tr>';
    //        });
    //        $('.myTable').html(html);
    //    },
    //    error: function (errormessage) {
    //        alert(errormessage.responseText);
    //    }
    //});
    $.ajax({
        type: "GET",
        url: '/ColorCode/List/',
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
                         { title: "ColorCode ID", "visible": false },
                         { title: "Color Code" },
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
    $('#ColorcodeID').val("");
    $('#Name').val("");
    $('#ddlsupplier').empty();
    $('#ddlcolor').empty();
    $('#colorshade').val("");   
    $('#Status').val("");

    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#ColorcodeID').css('border-color', 'lightgrey');
    $('#ddlsupplier').css('border-color', 'lightgrey');
    $('#Name').css('border-color', 'lightgrey');
    $('#ddlcolor').css('border-color', 'lightgrey');
    $('#colorshade').css('border-color', 'lightgrey');    
    $('#Status').css('border-color', 'lightgrey');

    LoadColorDDL("#ddlcolor");
    LoadSupplierDDL("#ddlsupplier");

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

//Function for getting the Data Based upon ColorCode ID
function getbyID(Id) {

    $('#ddlcolor').empty();
    LoadColorDDL("#ddlcolor");
    $('#ddlsupplier').empty();
    LoadSupplierDDL("#ddlsupplier");
    debugger;
    $('#ColorcodeID').css('border-color', 'lightgrey');
    $('#ddlsupplier').css('border-color', 'lightgrey');
    $('#ddlcolor').css('border-color', 'lightgrey');
    $('#colorshade').css('border-color', 'lightgrey');
    $('#Name').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');

    $.ajax({
        url: "/ColorCode/getbyID/" + Id,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            $('#ColorcodeID').val(obj.ColorCodeId);
            $('#ddlsupplier').val(obj.SupplierID);
            $('#ddlcolor').val(obj.ColorID);
            $('#Name').val(obj.ColorCodenam);
            $('#colorshade').val(obj.ColorShade);
            
            if (obj.IsActive == "TRUE") {
                $('#Status').prop("checked", true);
            } else {
                $('#Status').prop("checked", false);
            }

            $('#myModal').modal('show');
            //$('#tbody').DataTable().destroy();
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

function getViewbyID(Id) {

    $('#ddlcolor').empty();
    LoadColorDDL("#ddlcolor");
    $('#ddlsupplier').empty();
    LoadSupplierDDL("#ddlsupplier");
    debugger;
    $('#ColorcodeID').css('border-color', 'lightgrey');
    $('#ddlsupplier').css('border-color', 'lightgrey');
    $('#ddlcolor').css('border-color', 'lightgrey');
    $('#colorshade').css('border-color', 'lightgrey');
    $('#Name').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');

    $.ajax({
        url: "/ColorCode/getbyID/" + Id,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            $('#ColorcodeID').val(obj.ColorCodeId);
            $('#ddlsupplier').val(obj.SupplierID);
            $('#ddlcolor').val(obj.ColorID);
            $('#Name').val(obj.ColorCodenam);
            $('#colorshade').val(obj.ColorShade);

            if (obj.IsActive == "TRUE") {
                $('#Status').prop("checked", true);
            } else {
                $('#Status').prop("checked", false);
            }

            $('#myModal').modal('show');
            //$('#tbody').DataTable().destroy();
            $('#btnUpdate').hide();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
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
        //if (ischecked) {
        //    checkbox_value += "on";
        //}
        //else {
        //    checkbox_value += "off";
        //}
    });

    var ColorCodeObj = {
        ColorCodeId: $('#ColorcodeID').val(),
        SupplierID: $('#ddlsupplier').val(),
        ColorID: $('#ddlcolor').val(),
        ColorCodenam: $('#Name').val(),
        ColorShade: $('#colorshade').val(),
        IsActive: ischecked,
    };
    $.ajax({
        url: "/ColorCode/Add",
        data: JSON.stringify(ColorCodeObj),
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
                alert('Data Saved Successfully');
            }


//            clearTextBox();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//function for updating ColorCode record
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

    var ColorCodeObj = {
        ColorCodeId: $('#ColorcodeID').val(),
        ColorCodenam: $('#Name').val(),
        SupplierID: $('#ddlsupplier').val(),
        ColorID: $('#ddlcolor').val(),
        ColorShade: $('#colorshade').val(),
        IsActive: ischecked,
    };

    $.ajax({
        url: "/ColorCode/Update",
        data: JSON.stringify(ColorCodeObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
           
            if (result.Value == 1) {
                $('#tbody').DataTable().destroy();

                $('#myModal').modal('hide');
                loadData();
                alert('Data Updated Successfully');
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

//function for deleting Item record
function Delete(ID) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/ColorCode/Delete/" + ID,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
               
                if (result.Value == 1) {
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