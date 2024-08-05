/// <reference path="jquery-1.9.1.intellisense.js" />
//Load Data in Table when documents is ready
$(document).ready(function () {
    loadData();
});

//Load Data function
function loadData() {
    //$.ajax({
    //    url: "/ColorGroup/List",
    //    type: "GET",
    //    contentType: "application/json;charset=utf-8",
    //    dataType: "json",
    //    success: function (result) {
    //        var html = '';

    //        $.each(result, function (key, item) {
    //            html += '<tr>';
    //            html += '<td style="visibility:hidden;">' + item.ColorGroupId + '</td>';
    //            html += '<td>' + item.ColorGroupName + '</td>';                
    //            html += '<td>' + item.IsActive + '</td>';
    //            html += '<td><a href="#" onclick="return getbyID(' + item.ColorGroupId + ')">Edit</a> | <a href="#" onclick="Delele(' + item.ColorGroupId + ')">Delete</a></td>';
    //            html += '</tr>';
    //        });
    //        $('.tbody').html(html);
    //    },
    //    error: function (errormessage) {
    //        alert(errormessage.responseText);
    //    }
    //});
    $.ajax({
        type: "GET",
        url: '/ColorGroup/List/',
        data: JSON.stringify({}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");
            $('#tbody').DataTable({
                data: dataSet,
                columns: [
                         { title: "ColorGroupId", "visible": false },
                         { title: "Color Group" },
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
    $('#ColorGroupID').val("");
    $('#Name').val("");   
    $('#Status').val("");

    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#ColorGroupID').css('border-color', 'lightgrey');    
    $('#Name').css('border-color', 'lightgrey');    
    $('#Status').css('border-color', 'lightgrey');
   // $('#tbody').DataTable().destroy();

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

    var ColorGroupObj = {
        ColorGroupId: $('#ColorGroupID').val(),
        ColorGroupName: $('#Name').val(),
        IsActive: ischecked,
    };
    $.ajax({
        url: "/ColorGroup/Add",
        data: JSON.stringify(ColorGroupObj),
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
                // clearTextBox();
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
    $('#ColorGroupID').css('border-color', 'lightgrey');    
    $('#Name').css('border-color', 'lightgrey');    
    $('#Status').css('border-color', 'lightgrey');

    $.ajax({
        url: "/ColorGroup/getbyID/" + ColorGroupID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;

            $('#ColorGroupID').val(obj.ColorGroupId);
            $('#Name').val(obj.ColorGroupName);

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
    $('#ColorGroupID').css('border-color', 'lightgrey');
    $('#Name').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');

    $.ajax({
        url: "/ColorGroup/getbyID/" + ColorGroupID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;

            $('#ColorGroupID').val(obj.ColorGroupId);
            $('#Name').val(obj.ColorGroupName);

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

    var ColorGroupObj = {
        ColorGroupId: $('#ColorGroupID').val(),
        ColorGroupName: $('#Name').val(),
        IsActive: ischecked,
    };
    debugger;

    $.ajax({
        url: "/ColorGroup/Update",
        data: JSON.stringify(ColorGroupObj),
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

//function for deleting ColorGroup record
function Delete(ID) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/ColorGroup/Delete/" + ID,
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