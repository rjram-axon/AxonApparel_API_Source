
var CItemList = [];
$(document).ready(function () {
    loadData();
 
});

function loadData() {
    debugger;
    $.ajax({
        type: "GET",
        url: '/GarmentUom/List/',
        data: JSON.stringify({}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
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
                "bSort": false,
                columns: [
                         { title: "ID", "visible": false },
                         { title: "Garment UOM" },
                         { title: "Abbreviation" },
                         { title: "To Pieces" },
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

    $('#txtGUomID').val("");
    $('#txtGUom').val("");
    $('#txtGUomLookUp').val("");
    $('#txtToBUom').val("");
    $('#Status').val("");

    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#txtGUomID').css('border-color', 'lightgrey');
    $('#txtGUom').css('border-color', 'lightgrey');
    $('#txtGUomLookUp').css('border-color', 'lightgrey');
    $('#txtToBUom').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
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
    var GarmObj = {
        GUomId: $('#txtGUomID').val(),
        GUom: $('#txtGUom').val(),
        GUom_Lookup: $('#txtGUomLookUp').val(),
        To_BUom: $('#txtToBUom').val(),
        IsActive: ischecked,
    };
    $("#btnAdd").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: '/GarmentUom/Add/',
        data: JSON.stringify(GarmObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            } else if (result.Value == -1) {
                //alert('Given GarmentUom is Already Available...');
                var msg = 'Given GarmentUom is Already Available...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }
            else {
                AddUserEntryLog('Master', 'Garment UOM', 'ADD', $('#txtGUom').val());
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

    var GarmObj = {
        GUomId: $('#txtGUomID').val(),
        GUom: $('#txtGUom').val(),
        GUom_Lookup: $('#txtGUomLookUp').val(),
        To_BUom: $('#txtToBUom').val(),
        IsActive: ischecked,
    };
    debugger;
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/GarmentUom/Update",
        data: JSON.stringify(GarmObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
           
            if (result.Status == 'SUCCESS') {
                AddUserEntryLog('Master', 'Garment UOM', 'UPDATE', $('#txtGUom').val());

                $('#tbody').DataTable().destroy();
                loadData();
                $('#myModal').modal('hide');
                $('#txtGUomID').val("");
                $('#txtGUom').val("");
                $('#txtGUomLookUp').val("");
                $('#txtToBUom').val("");
                $('#Status').prop("checked", false);
                //alert('Data Updated Successfully');
                var msg = 'Data Updated Successfully...';
                var flg = 1;
                var mode = 0;
                AlartMessage(msg, flg, mode);
                $("#btnUpdate").attr("disabled", false);
            }
            else if (result.Status == 'EXISTS') {
                //alert('Given GarmentUom is Already Available...');
                var msg = 'Given GarmentUom is Already Available...';
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

function Delete(ID) {
    //var ans = confirm("Are you sure you want to delete this Record?");
    //if (ans) {
    //    $.ajax({
    //        url: "/GarmentUom/Delete/" + ID,
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
    debugger;
    $.ajax({
        url: "/GarmentUom/getbyID/" + ID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            $('#txtGUom').val(obj.GUom);
            CheckGUomAlloted(ID);

        },
        error: function (errormessage) {
            alert('delete failed..');
        }
    });

    
}

function CheckGUomAlloted(ID) {

    $.ajax({
        url: "/GarmentUom/GetGuomRefDetails",
        data: JSON.stringify({ GUomId: ID }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            CItemList = result;
            if (CItemList.length > 0) {

                for (var x = 0; x < CItemList.length; x++) {

                    var c = CItemList[x].CountGuomId;

                    if (c > 0) {
                        //alert("GUom Is Alloted For Some Other Entry,Please Check it....");
                        var msg = 'GUom Is Alloted For Some Other Entry,Please Check it...';
                        var flg = 4;
                        var mode = 1;
                        AlartMessage(msg, flg, mode);
                    }
                    else {
                        var ans = confirm("Are you sure you want to delete this Record?");
                        if (ans) {
                            LoadingSymb();
                            $.ajax({
                                url: "/GarmentUom/Delete/" + ID,
                                type: "POST",
                                contentType: "application/json;charset=UTF-8",
                                dataType: "json",
                                success: function (result) {

                                    if (result.Value == 1) {
                                        $('#tbody').DataTable().destroy();
                                        AddUserEntryLog('Master', 'Garment UOM', 'DELETE', $('#txtGUom').val());
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


function validate() {
    var isValid = true;
    if ($('#txtGUom').val() == "") {
        $('#txtGUom').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtGUom').css('border-color', 'lightgrey');
    }

    return isValid;
}

function getbyID(GarmId) {

 
    $('#txtGUom').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $.ajax({
        url: "/GarmentUom/getbyID/" + GarmId,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {
                $('#txtGUomID').val(obj.GUomId);
                $('#txtGUom').val(obj.GUom);
                $('#txtGUomLookUp').val(obj.GUom_Lookup);
                $('#txtToBUom').val(obj.To_BUom);
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

function getViewbyID(GarmId) {


    $('#txtGUom').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $.ajax({
        url: "/GarmentUom/getbyID/" + GarmId,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {
                $('#txtGUomID').val(obj.GUomId);
                $('#txtGUom').val(obj.GUom);
                $('#txtGUomLookUp').val(obj.GUom_Lookup);
                $('#txtToBUom').val(obj.To_BUom);
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