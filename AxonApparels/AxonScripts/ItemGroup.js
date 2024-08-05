/// <reference path="jquery-1.9.1.intellisense.js" />
//Load Data in Table when documents is ready

var CItemList = [];
$(document).ready(function () {
    debugger;
    loadData();
});

//Load Data function
function loadData() {
    //$.ajax({
    //    url: "/ItemGroup/List",
    //    type: "GET",
    //    contentType: "application/json;charset=utf-8",
    //    dataType: "json",
    //    success: function (result) {
    //        var html = '';

    //        $.each(result, function (key, item) {
    //            html += '<tr>';
    //            html += '<td style="visibility:hidden;">' + item.ItemgroupId + '</td>';
    //            html += '<td>' + item.ItemGroupName + '</td>';
    //            html += '<td>' + item.CatHead1 + '</td>';
    //            html += '<td>' + item.CatHead2 + '</td>';
    //            html += '<td>' + item.CatHead3 + '</td>';
    //            html += '<td>' + item.IsActive + '</td>';
    //            html += '<td><a href="#" onclick="return getbyID(' + item.ItemgroupId + ')">Edit</a> | <a href="#" onclick="Delele(' + item.ItemgroupId + ')">Delete</a></td>';
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
        url: '/ItemGroup/List/',
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
                         { title: "ItemGroupId", "visible": false },
                         { title: "ItemGroup" },
                         { title: "Category1" },
                         { title: "Category2" },
                         { title: "Category3" },
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

//Function for getting the Data Based upon Item Group ID
function getbyID(ItemGroupID) {

    $('#Itemgroupid').css('border-color', 'lightgrey');
    $('#Name').css('border-color', 'lightgrey');
    $('#cat1').css('border-color', 'lightgrey');
    $('#cat2').css('border-color', 'lightgrey');
    $('#cat3').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');

    $.ajax({
        url: "/ItemGroup/getbyID/" + ItemGroupID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;

            $('#Itemgroupid').val(obj.ItemgroupId);
            $('#cat1').val(obj.CatHead1);
            $('#cat2').val(obj.CatHead2);
            $('#cat3').val(obj.CatHead3);
            $('#Name').val(obj.ItemGroupName);

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

function getViewbyID(ItemGroupID) {

    $('#Itemgroupid').css('border-color', 'lightgrey');
    $('#Name').css('border-color', 'lightgrey');
    $('#cat1').css('border-color', 'lightgrey');
    $('#cat2').css('border-color', 'lightgrey');
    $('#cat3').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');

    $.ajax({
        url: "/ItemGroup/getbyID/" + ItemGroupID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;

            $('#Itemgroupid').val(obj.ItemgroupId);
            $('#cat1').val(obj.CatHead1);
            $('#cat2').val(obj.CatHead2);
            $('#cat3').val(obj.CatHead3);
            $('#Name').val(obj.ItemGroupName);

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

//Function for clearing the textboxes
function clearTextBox() {
    $('#Itemgroupid').val("");
    $('#Name').val("");
    $('#cat1').val("");
    $('#cat2').val("");
    $('#cat3').val("");
    $('#Status').val("");

    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#Itemgroupid').css('border-color', 'lightgrey');
    $('#Name').css('border-color', 'lightgrey');
    $('#cat1').css('border-color', 'lightgrey');
    $('#cat2').css('border-color', 'lightgrey');
    $('#cat3').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    // $('#tbody').DataTable().destroy();

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
    if ($('#cat1').val().trim() == "") {
        $('#cat1').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#cat1').css('border-color', 'lightgrey');
    }
    if ($('#cat2').val().trim() == "") {
        $('#cat2').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#cat2').css('border-color', 'lightgrey');
    }
    if ($('#cat3').val().trim() == "") {
        $('#cat3').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#cat3').css('border-color', 'lightgrey');
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
        //if (ischecked) {
        //    checkbox_value += "on";
        //}
        //else {
        //    checkbox_value += "off";
        //}
    });

    var ItemGroupObj = {
        ItemgroupId: $('#Itemgroupid').val(),
        ItemGroupName: $('#Name').val(),
        CatHead1: $('#cat1').val(),
        CatHead2: $('#cat2').val(),
        CatHead3: $('#cat3').val(),
        IsActive: ischecked,
    };
    $("#btnAdd").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/ItemGroup/Add",
        data: JSON.stringify(ItemGroupObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            }
            else if (result.Value == -1) {
                //alert('Given ItemGroup is Already Available...');
                var msg = 'Given ItemGroup is Already Available...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }
            else {
                $('#tbody').DataTable().destroy();
                loadData();
                $('#myModal').modal('hide');
                // clearTextBox();
                //alert('Data Saved Successfully');
                var msg = 'Data Saved Successfully...';
                var flg = 1;
                var mode = 0;
                AlartMessage(msg, flg, mode);
                AddUserEntryLog('Master', 'Item Group', 'ADD', $('#Name').val());
                $("#btnAdd").attr("disabled", false);
            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
//function for updating Item Group record
function Update() {
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

    var ItemGroupObj = {
        ItemgroupId: $('#Itemgroupid').val(),
        ItemGroupName: $('#Name').val(),
        CatHead1: $('#cat1').val(),
        CatHead2: $('#cat2').val(),
        CatHead3: $('#cat3').val(),
        IsActive: ischecked,
    };
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/ItemGroup/Update",
        data: JSON.stringify(ItemGroupObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            AddUserEntryLog('Master', 'Item Group', 'UPDATE', $('#Name').val());

            if (result.Status == 'SUCCESS') {
                $('#tbody').DataTable().destroy();
                $('#myModal').modal('hide');
                loadData();
                //alert('Data Updated Successfully');
                var msg = 'Data Updated Successfully...';
                var flg = 1;
                var mode = 0;
                AlartMessage(msg, flg, mode);
                $("#btnUpdate").attr("disabled", false);
            }
            else if (result.Status == 'EXISTS') {
                //alert('Given ItemGroup is Already Available...');
                var msg = 'Given ItemGroup is Already Available...';
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

//function for deleting Item Group record
function Delete(ID) {
    //var ans = confirm("Are you sure you want to delete this Record?");
    //if (ans) {
    //    $.ajax({
    //        url: "/ItemGroup/Delete/" + ID,
    //        type: "POST",
    //        contentType: "application/json;charset=UTF-8",
    //        dataType: "json",
    //        success: function (result) {

    //            if (result.Value == 1) {
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
    $.ajax({
        url: "/ItemGroup/getbyID/" + ID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            $('#Name').val(obj.ItemGroupName);
            CheckItemGroupAlloted(ID);

        },
        error: function (errormessage) {
            alert('delete failed..');
        }
    });

}

function CheckItemGroupAlloted(ID) {

    $.ajax({
        url: "/ItemGroup/GetItemGroupRefDetails",
        data: JSON.stringify({ ItemgroupId: ID }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            CItemList = result;
            if (CItemList.length > 0) {

                for (var x = 0; x < CItemList.length; x++) {

                    var c = CItemList[x].CountItemGroupId;

                    if (c > 0) {
                        //alert("ItemGroup Is Alloted For Some Other Entry,Please Check it....");
                        var msg = 'ItemGroup Is Alloted For Some Other Entry,Please Check it...';
                        var flg = 4;
                        var mode = 1;
                        AlartMessage(msg, flg, mode);
                    }
                    else {
                        var ans = confirm("Are you sure you want to delete this Record?");
                        if (ans) {
                            LoadingSymb();
                            $.ajax({
                                url: "/ItemGroup/Delete/" + ID,
                                type: "POST",
                                contentType: "application/json;charset=UTF-8",
                                dataType: "json",
                                success: function (result) {

                                    if (result.Value == 1) {
                                        $('#tbody').DataTable().destroy();
                                        AddUserEntryLog('Master', 'Item Group', 'DELETE', $('#Name').val());
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