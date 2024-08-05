
var CItemList = [];

$(document).ready(function () {
    loadData();
})

function loadData() {


    $.ajax({
        type: "GET",
        url: '/AccountHeads/List/',
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

                         { title: "AccountHeadsID", "visible": false },
                         { title: "Addless" },
                         { title: "AddlessType" },
                         { title: "Lookup" },
                         { title: "Percentage" },
                         { title: "Status" },
                         { title: "Action" }
                ]

            });

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function Add() {
    var isAct = false;
    var res = validate();
    if (res == false) {
        return false;
    }
    var checkbox_value = "";
    $(":checkbox").each(function () {
        var ischecked = $('#Status').is(":checked");
        if (ischecked) {
            checkbox_value += "on";
            isAct = true;
        }
        else {
            checkbox_value += "off";
        }
    });

    var addorless = $('input[name="AddorLess"]:checked').attr('value');
    var accObj = {
        addlessid: $('#AccountHeadsID').val(),
        addless: $('#Name').val(),
        Lookup: $('#LookUp').val(),
        per: $('#Per').val(),
        amount: $('#Amount').val(),
        AddlessType: addorless,
        IsActive: isAct,

    };
    $("#btnAdd").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/AccountHeads/Add",
        data: JSON.stringify(accObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            } else if (result.Value == -1) {
                //alert('Given AccountHeads is Already Available...');
                var msg = 'Given AccountHeads is Already Available...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }
            else {
                AddUserEntryLog('Master', 'AccountHeads', 'ADD', $('#Name').val());

                //alert('Data Added Successfully');
                var msg = 'Data Added Successfully...';
                var flg = 1;
                var mode = 0;
                AlartMessage(msg, flg, mode);
                $('#tbody').DataTable().destroy();
                loadData();
                $('#myModal').modal('hide');
                $('#AccountHeadsID').val("");
                $('#Name').val("");
                $('#LookUp').val("");
                $('#Per').val("");
                $('#Amount').val("");
                $('input[name="AddorLess"]').prop('checked', false);
                $("#btnAdd").attr("disabled", false);
            }
           
          
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
//function for updating department's record
function Update() {

    var Ch = $('#AccountHeadsID').val()
    var ischecked = false;
    var res = validate();
    if (res == false) {
        return false;
    }
    var checkbox_value = "";
    $(":checkbox").each(function () {
        ischecked = $('#Status').is(":checked");

    });

    var addorless = $('input[name="AddorLess"]:checked').attr('value');

    var addlesObj = {
        addlessid: Ch,
        addless: $('#Name').val(),
        Lookup: $('#LookUp').val(),
        per: $('#Per').val(),
        amount: $('#Amount').val(),
        AddlessType: addorless,
        IsActive: ischecked,
    };
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/AccountHeads/Update",
        data: JSON.stringify(addlesObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
           
            if (result.Status == 'SUCCESS') {
                AddUserEntryLog('Master', 'AccountHeads', 'UPDATE', $('#Name').val());
                //alert('Data Updated Successfully');
                var msg = 'Data Updated Successfully...';
                var flg = 1;
                var mode = 0;
                AlartMessage(msg, flg, mode);
                $('#tbody').DataTable().destroy();
                loadData();
                $('#myModal').modal('hide');
                $('#AccountHeadsID').val("");
                $('#Name').val("");
                $('#LookUp').val("");
                $('#Per').val("");
                $('#Amount').val("");
                $('input[name="AddorLess"]').prop('checked', false);
                $("#btnUpdate").attr("disabled", false);
            }
            else if (result.Status == 'EXISTS') {
                //alert('Given AccountHeads is Already Available...');
                var msg = 'Given AccountHeads is Already Available...';
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
function validate() {
    var isValid = true;
    if ($('#Name').val().trim() == "") {
        $('#Name').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Name').css('border-color', 'lightgrey');
    }
    if ($('#LookUp').val().trim() == "") {
        $('#LookUp').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#LookUp').css('border-color', 'lightgrey');
    }
    //if ($('#Amount').val().trim() == "") {
    //    $('#Amount').css('border-color', 'Red');
    //    isValid = false;
    //}
    //else {
    //    $('#Amount').css('border-color', 'lightgrey');
    //}


    return isValid;
}
function getbyID(addlessID) {
    debugger;
    $('#Name').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $.ajax({
        url: "/AccountHeads/getbyID/" + addlessID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            var selected = obj.AddlessType;
            if (selected == "+") {
                $('input:radio[name="AddorLess"][value="+"]').prop('checked', true);
            } else {
                $('input:radio[name="AddorLess"][value="-"]').prop('checked', true);
            };

            if (result.Status == 'SUCCESS') {
                $('#AccountHeadsID').val(obj.addlessid);
                $('#Name').val(obj.addless);
                $('#LookUp').val(obj.Lookup);
                $('#Per').val(obj.per);
                $('#Amount').val(obj.amount);            
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


function getViewbyID(addlessID) {
    debugger;
    $('#Name').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $.ajax({
        url: "/AccountHeads/getbyID/" + addlessID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            var selected = obj.AddlessType;
            if (selected == "+") {
                $('input:radio[name="AddorLess"][value="+"]').prop('checked', true);
            } else {
                $('input:radio[name="AddorLess"][value="-"]').prop('checked', true);
            };

            if (result.Status == 'SUCCESS') {
                $('#AccountHeadsID').val(obj.addlessid);
                $('#Name').val(obj.addless);
                $('#LookUp').val(obj.Lookup);
                $('#Per').val(obj.per);
                $('#Amount').val(obj.amount);
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


//function for deleting department's record
function Delete(ID) {
    //var ans = confirm("Are you sure you want to delete this Record?");
    //if (ans) {
    //    $.ajax({
    //        url: "/AccountHeads/Delete/" + ID,
    //        type: "POST",
    //        contentType: "application/json;charset=UTF-8",
    //        dataType: "json",
    //        success: function (result) {
               
    //            if (result.Value == 1) {
    //                alert('Data Deleted Successfully');
    //                $('#tbody').DataTable().destroy();
    //                loadData();
    //            }
    //            else {
    //                window.location.href = "/Error/Index";
    //            }
    //        },
    //        error: function (errormessage) {
    //            alert(errormessage.responseText);
    //        }
    //    });
    //}
    debugger;
    $.ajax({
        url: "/AccountHeads/getbyID/" + ID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            $('#Name').val(obj.addless);
            CheckAccountAlloted(ID);

        },
        error: function (errormessage) {
            alert('delete failed..');
        }
    });
    
}
function clearTextBox() {
    $('#AccountHeadsID').val("");
    $('#Name').val("");
    $('#LookUp').val("");
    $('#Per').val("");
    $('#Amount').val("");
    $('#Status').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#AccountHeadsID').css('border-color', 'lightgrey');
    $('#Name').css('border-color', 'lightgrey');
    $('#LookUp').css('border-color', 'lightgrey');
    $('#Per').css('border-color', 'lightgrey');
    $('#Amount').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $('input[name="FreeOrCharge"]').prop('checked', false);
}


function CheckAccountAlloted(Id) {

    $.ajax({
        url: "/AccountHeads/GetAccountHeadsRefDetails",
        data: JSON.stringify({ addlessid: Id }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            CItemList = result;
            if (CItemList.length > 0) {

                for (var x = 0; x < CItemList.length; x++) {

                    var c = CItemList[x].Countaddlessid;

                    if (c > 0) {
                        //alert("AccountHeads Is Alloted For Some Other Entry,Please Check it....");
                        var msg = 'AccountHeads Is Alloted For Some Other Entry,Please Check it...';
                        var flg = 4;
                        var mode = 1;
                        AlartMessage(msg, flg, mode);
                    }
                    else {
                        var ans = confirm("Are you sure you want to delete this Record?");
                        if (ans) {
                            LoadingSymb();
                            $.ajax({
                                url: "/AccountHeads/Delete/" + Id,
                                type: "POST",
                                contentType: "application/json;charset=UTF-8",
                                dataType: "json",
                                success: function (result) {

                                    if (result.Value == 1) {
                                        AddUserEntryLog('Master', 'AccountHeads', 'DELETE', $('#Name').val());
                                        //alert('Data Deleted Successfully');
                                        var msg = 'Data Deleted Successfully...';
                                        var flg = 2;
                                        var mode = 0;
                                        AlartMessage(msg, flg, mode);
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