/// <reference path="jquery-1.9.1.intellisense.js" />
//Load Data in Table when documents is ready
$(document).ready(function () {
    loadData();
    $('#ddldivtype').val('0');
    LoadCompanyUnitDDL("#ddlCompanyUnit");
});

//Load Data function
function loadData() {
    //$.ajax({
    //    url: "/WorkDivision/List",
    //    type: "GET",
    //    contentType: "application/json;charset=utf-8",
    //    dataType: "json",
    //    success: function (result) {
    //        var html = '';
    //        debugger;
    //        $.each(result, function (key, item) {
    //            html += '<tr>';
    //            html += '<td style="visibility:hidden;">' + item.WorkDivisionId + '</td>';
    //            html += '<td>' + item.WorkDivisionName + '</td>';
    //            html += '<td>' + item.UnitName + '</td>';
    //            html += '<td>' + item.DivisionType + '</td>';
    //            html += '<td>' + item.IsActive + '</td>';
    //            html += '<td><a href="#" onclick="return getbyID(' + item.WorkDivisionId + ')">Edit</a> | <a href="#" onclick="Delele(' + item.WorkDivisionId + ')">Delete</a></td>';
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
        url: '/WorkDivision/List/',
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
                         { title: "Work Division " },
                         { title: "Division type" },
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

//Function for getting the Data Based upon WorkDivision ID
function getbyID(WorkDivisionId) {
    debugger;
    $('#WorkDivisionID').css('border-color', 'lightgrey');
    $('#WorkDivisionName').css('border-color', 'lightgrey');
    $('#Name').css('border-color', 'lightgrey');
    $('#ddldivtype').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $.ajax({
        url: "/WorkDivision/getbyID/" + WorkDivisionId,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;

            $('#WorkDivisionID').val(obj.WorkDivisionId);
            $('#Name').val(obj.WorkDivisionName);
            $('#ddldivtype').val(obj.DivisionType);
            $('#ddlCompanyUnit').val(obj.UnitId);
            if (obj.IsActive == "TRUE") {
                $('#Status').prop("checked",true);
            } else {
                $('#Status').prop("checked",false);
            }

            debugger;
            $('#myModal').modal('show');
          //  $('#tbody').DataTable().destroy();

            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}


function getViewbyID(WorkDivisionId) {
    debugger;
    $('#WorkDivisionID').css('border-color', 'lightgrey');
    $('#WorkDivisionName').css('border-color', 'lightgrey');
    $('#Name').css('border-color', 'lightgrey');
    $('#ddldivtype').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $.ajax({
        url: "/WorkDivision/getbyID/" + WorkDivisionId,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;

            $('#WorkDivisionID').val(obj.WorkDivisionId);
            $('#Name').val(obj.WorkDivisionName);
            $('#ddldivtype').val(obj.DivisionType);
            $('#ddlCompanyUnit').val(obj.UnitId);
            if (obj.IsActive == "TRUE") {
                $('#Status').prop("checked", true);
            } else {
                $('#Status').prop("checked", false);
            }

            debugger;
            $('#myModal').modal('show');
            //  $('#tbody').DataTable().destroy();

            $('#btnUpdate').hide();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

//Function for clearing the textboxes
function clearTextBox() {
    debugger;
    $('#WorkDivisionID').val("");
    $('#Name').val("");
   // $('#ddldivtype').val("");
    $('#Status').val("");

    $('#Name').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    //$('#tbody').DataTable().destroy();


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

    if ($('#ddldivtype').val() == 0) {
        $('#ddldivtype').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddldivtype').css('border-color', 'lightgrey');
    }
    
    return isValid;
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
    //    if (ischecked) {
    //        checkbox_value += "on";
    //    }
    //    else {
    //        checkbox_value += "off";
    //    }
    });
    var workdivObj = {
        WorkDivisionId: $('#WorkDivisionID').val(),
        WorkDivisionName: $('#Name').val(),
        DivisionType: $('#ddldivtype').val(),
        IsActive: ischecked,
        UnitId: $('#ddlCompanyUnit').val(),
    };
    $("#btnAdd").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/WorkDivision/Add",
        data: JSON.stringify(workdivObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            }
            else if (result.Value == -1) {
                //alert('Given WorkDivision is Already Available...');
                var msg = 'Given WorkDivision is Already Available...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }
            else {
                $('#tbody').DataTable().destroy();

                loadData();
                $('#myModal').modal('hide');
                //alert('Data Saved Successfully');
                var msg = 'Data Saved Successfully...';
                var flg = 1;
                var mode = 0;
                AlartMessage(msg, flg, mode);
                AddUserEntryLog('Master', 'WorkDivision', 'ADD', $('#Name').val());
                $("#btnAdd").attr("disabled", false);
            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//function for updating employee's record
function Update() {
    debugger;
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

    var workdivObj = {
        WorkDivisionId: $('#WorkDivisionID').val(),
        WorkDivisionName: $('#Name').val(),
        DivisionType: $('#ddldivtype').val(),
        IsActive: ischecked,
        UnitId: $('#ddlCompanyUnit').val(),
    };
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/WorkDivision/Update",
        data: JSON.stringify(workdivObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
           
            if (result.Status == 'SUCCESS') {
                AddUserEntryLog('Master', 'WorkDivision', 'UPDATE', $('#Name').val());
                $('#tbody').DataTable().destroy();

                loadData();
                $('#myModal').modal('hide');
                $('#WorkDivisionID').val("");
                $('#Name').val("");
                $('#ddldivtype').val("");
                $('#Status').val("");

                //alert('Data Updated Sucessfully');
                var msg = 'Data Updated Successfully...';
                var flg = 1;
                var mode = 0;
                AlartMessage(msg, flg, mode);
                $("#btnUpdate").attr("disabled", false);
                
            }
            else if (result.Status == 'EXISTS') {
                //alert('Given WorkDivision is Already Available...');
                var msg = 'Given WorkDivision is Already Available...';
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

//function for deleting employee's record
function Delete(WorkDivisionId) {
    debugger;
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        LoadingSymb();
        debugger;
     
            $.ajax({
                url: "/WorkDivision/getbyID/" + WorkDivisionId,
                typr: "GET",
                contentType: "application/json;charset=UTF-8",
                dataType: "json",
                success: function (result) {
                    var obj = result.Value;
                    $('#Name').val(obj.WorkDivisionName);
                    

                    $.ajax({
                        url: "/WorkDivision/Delete/" + WorkDivisionId,
                        type: "POST",
                        contentType: "application/json;charset=UTF-8",
                        dataType: "json",
                        success: function (result) {
                            debugger;
                            if (result.Value == 1) {
                                AddUserEntryLog('Master', 'WorkDivision', 'DELETE', $('#Name').val());

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
            });

    }
}
