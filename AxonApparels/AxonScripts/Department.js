/// <reference path="jquery-1.9.1.intellisense.js" />
//Load Data in Table when documents is ready
var CItemList = [];
$(document).ready(function () {
    loadData();
    //$('title').show(function (e) {
    //    $(this).css("font-weight", "bold");
    //    e.stopPropagation();
    //});
    debugger;

});

//Load Data function
function loadData() {
    //$.ajax({
    //    url: "/Department/List",
    //    type: "GET",
    //    contentType: "application/json;charset=utf-8",
    //    dataType: "json",
    //    success: function (result) {
    //        var html = '';

    //        $.each(result, function (key, item) {
    //            html += '<tr>';
    //            html += '<td style="visibility:hidden;">' + item.DepartmentId + '</td>';
    //            html += '<td>' + item.DepartmentName + '</td>';
    //            html += '<td>' + item.IsActive + '</td>';                
    //            html += '<td><a href="#" onclick="return getbyID(' + item.DepartmentId + ')">Edit</a> | <a href="#" onclick="Delele(' + item.DepartmentId + ')">Delete</a></td>';
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
        url: '/Department/List/',
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
                         { title: "DepartmentId", "visible": false },
                         { title: "Department" },
                         { title: "Status" },
                         { title: "Action" },
                ]
            });
            //$('#tbody td:nth-child(3)').css('font-weight', 'bold');
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
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

    var departmentObj = {
        DepartmentId: $('#DepartmentID').val(),
        DepartmentName: $('#Name').val(),
        IsActive: ischecked,
    };
    $("#btnAdd").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/Department/Add",
        data: JSON.stringify(departmentObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            }
            else if (result.Value == -1) {
                //alert('Given Department is Already Available...');
                var msg = 'Given Department is Already Available...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }
            else {
                AddUserEntryLog('Master', 'Department', 'ADD', $('#Name').val());
                $('#tbody').DataTable().destroy();
                loadData();
                $('#myModal').modal('hide');
                $('#DepartmentID').val("");
                $('#Name').val("");
                //alert('Data Saved Successfully');
                var msg = 'Data Saved Successfully...';
                var flg = 1;
                var mode = 0;
                AlartMessage(msg, flg, mode);
                $("#btnAdd").attr("disabled", false);
                //checkname();

            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
            // alert('Data Saved Already');
        }

    });
}



//Function for getting the Data Based upon Department ID
function getbyID(DepartID) {
    debugger;
    $('#Name').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Department/getbyID/" + DepartID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;

            $('#DepartmentID').val(obj.DepartmentId);
            $('#Name').val(obj.DepartmentName);
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

function getViewbyID(DepartID) {
    debugger;
    $('#Name').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Department/getbyID/" + DepartID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;

            $('#DepartmentID').val(obj.DepartmentId);
            $('#Name').val(obj.DepartmentName);
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

//function for updating department's record
function Update() {
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

    var departmentObj = {
        DepartmentId: $('#DepartmentID').val(),
        DepartmentName: $('#Name').val(),
        IsActive: ischecked,
    };
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/Department/Update",
        data: JSON.stringify(departmentObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;         

            if (result.Status == 'SUCCESS') {
                AddUserEntryLog('Master', 'Department', 'UPDATE', $('#Name').val());
                $('#tbody').DataTable().destroy();

                loadData();
                $('#myModal').modal('hide');
                $('#DepartmentID').val("");
                $('#Name').val("");
                $('#Status').prop("checked", false);
                //alert('Data Updated Successfully');
                var msg = 'Data Updated Successfully...';
                var flg = 1;
                var mode = 0;
                AlartMessage(msg, flg, mode);
                $("#btnUpdate").attr("disabled", false);
            }
            else if (result.Status == 'EXISTS') {
                //alert('Given Department is Already Available...');
                var msg = 'Given Department is Already Available...';
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
        url: "/Department/getbyID/" + ID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            $('#Name').val(obj.DepartmentName);
            CheckDepartmentAlloted(ID);

        },
        error: function (errormessage) {
            alert('delete failed..');
        }
    });
    
}

//Function for clearing the textboxes
function clearTextBox() {
    $('#DepartmentID').val("");
    $('#Name').val("");
    $('#Status').val("");

    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#DepartmentID').css('border-color', 'lightgrey');
    $('#Name').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    // $('#tbody').DataTable().destroy();

}

//Valdidation using jquery
function validate() {
    var isValid = true;
    if ($('#Name').val() == "") {
        $('#Name').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Name').css('border-color', 'lightgrey');
    }

    return isValid;



}


function CheckDepartmentAlloted(Id) {

    $.ajax({
        url: "/Department/GetDepartmentRefDetails",
        data: JSON.stringify({ DepartmentId: Id }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            CItemList = result;
            if (CItemList.length > 0) {

                for (var x = 0; x < CItemList.length; x++) {

                    var c = CItemList[x].CountDepartmentId;

                    if (c > 0) {
                        //alert("Department Is Alloted For Some Other Entry,Please Check it....");
                        var msg = 'Department Is Alloted For Some Other Entry,Please Check it...';
                        var flg = 4;
                        var mode = 1;
                        AlartMessage(msg, flg, mode);
                    }
                    else {
                        var ans = confirm("Are you sure you want to delete this Record?");
                        if (ans) {
                            LoadingSymb();
                            $.ajax({
                                url: "/Department/Delete/" + Id,
                                type: "POST",
                                contentType: "application/json;charset=UTF-8",
                                dataType: "json",
                                success: function (result) {

                                    if (result.Value == 1) {
                                        AddUserEntryLog('Master', 'Department', 'DELETE', $('#Name').val());
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