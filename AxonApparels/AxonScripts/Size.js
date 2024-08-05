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
        url: '/Size/List/',
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
                         { title: "Size ID", "visible": false },
                         { title: "Size" },
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
    $('#SizeID').val("");
    $('#Name').val("");
    $('#seqno').val("");
    $('#ddlitemtype').val(0);
    $('#Status').val("");
    $('#actualsize').val("");
    $('#lookup').val("");

    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#SizeID').css('border-color', 'lightgrey');
    $('#seqno').css('border-color', 'lightgrey');
    $('#ddlitemtype').css('border-color', 'lightgrey');    
    $('#Name').css('border-color', 'lightgrey');    
    $('#Status').css('border-color', 'lightgrey');
    $('#actualsize').css('border-color', 'lightgrey');
    $('#lookup').css('border-color', 'lightgrey');


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
    //if ($('#actualsize').val().trim() == "") {
    //    $('#actualsize').css('border-color', 'Red');
    //    isValid = false;
    //}
    //else {
    //    $('#actualsize').css('border-color', 'lightgrey');
    //}

    if ($('#Name').val().trim().indexOf('\'') >= 0) {
        $('#Name').val($('#Name').val().replace(/'/g, ' '));
    }

   return isValid;
}

//Function for getting the Data Based upon Size ID
function getbyID(SizeID) {
    debugger;
    $('#Status').css('border-color', 'lightgrey');
    $('#SizeID').css('border-color', 'lightgrey');
    $('#seqno').css('border-color', 'lightgrey');
    $('#ddlitemtype').css('border-color', 'lightgrey');   
    $('#Name').css('border-color', 'lightgrey');    
    $('#Status').css('border-color', 'lightgrey');
    $('#actualsize').css('border-color', 'lightgrey');
    $('#lookup').css('border-color', 'lightgrey');


    $.ajax({
        url: "/Size/getbyID/" + SizeID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;

            $('#SizeID').val(obj.SizeId);
            $('#seqno').val(obj.Seqno);
            $('#ddlitemtype').val(obj.ItemType);
            $('#Name').val(obj.SizeName);
            $('#lookup').val(obj.Lookup);
            $('#actualsize').val(obj.ActualSize);

            
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

function getViewbyID(SizeID) {
    debugger;
    $('#Status').css('border-color', 'lightgrey');
    $('#SizeID').css('border-color', 'lightgrey');
    $('#seqno').css('border-color', 'lightgrey');
    $('#ddlitemtype').css('border-color', 'lightgrey');
    $('#Name').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $('#actualsize').css('border-color', 'lightgrey');
    $('#lookup').css('border-color', 'lightgrey');


    $.ajax({
        url: "/Size/getbyID/" + SizeID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;

            $('#SizeID').val(obj.SizeId);
            $('#seqno').val(obj.Seqno);
            $('#ddlitemtype').val(obj.ItemType);
            $('#Name').val(obj.SizeName);
            $('#lookup').val(obj.Lookup);
            $('#actualsize').val(obj.ActualSize);


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

    var SizeObj = {
        SizeId: $('#SizeID').val(),
        SizeName: $('#Name').val(),
        SeqNo: $('#seqno').val(),
       // ItemType: $('#ddlitemtype').val(),
        ItemType: $("#ddlitemtype option:selected").text(),
        IsActive: ischecked,
        LookUp: $('#lookup').val(),
        ActualSize:$('#actualsize').val()
    };
    $("#btnAdd").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/Size/Add",
        data: JSON.stringify(SizeObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            } else if (result.Value == -1) {
                //alert('Given Size is Already Available...');
                var msg = 'Given Size is Already Available...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                $("#btnAdd").attr("disabled", false);
                return true;
            }
            else {
                AddUserEntryLog('Master', 'Size', 'ADD', $('#Name').val());

                $('#tbody').DataTable().destroy();

                loadData();
                $('#myModal').modal('hide');
                $('#SizeID').val("");
                $('#Name').val("");
                $('#seqno').val("");
                $('#ddlitemtype').val("");
                $('#Status').val("");
                $('#actualsize').val("");
                $('#lookup').val("");
                //alert('Data Saved Successfully');
                var msg = 'Data Saved Successfully...';
                var flg = 1;
                var mode = 0;
                AlartMessage(msg, flg, mode);
                $("#btnAdd").attr("disabled", false);
            }
            //clearTextBox();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//function for updating Size record
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

    var SizeObj = {
        SizeId: $('#SizeID').val(),
        SizeName: $('#Name').val(),
        SeqNo: $('#seqno').val(),
        //ItemType: $('#ddlitemtype').val(),
        ItemType: $("#ddlitemtype option:selected").text(),
        IsActive: ischecked,
        LookUp: $('#lookup').val(),
        ActualSize: $('#actualsize').val()

    };
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/Size/Update",
        data: JSON.stringify(SizeObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
           
            if (result.Status == 'SUCCESS') {
                AddUserEntryLog('Master', 'Size', 'UPDATE', $('#Name').val());

                $('#myModal').modal('hide');
                $('#tbody').DataTable().destroy();

                loadData();
                $('#SizeID').val("");
                $('#Name').val("");
                $('#seqno').val("");
                $('#ddlitemtype').val("");
                $('#Status').val("");
                $('#actualsize').val("");
                $('#lookup').val("");
                //alert('Data Updated Successfully');
                var msg = 'Data Updated Successfully...';
                var flg = 1;
                var mode = 0;
                AlartMessage(msg, flg, mode);
                $("#btnUpdate").attr("disabled", false);
            }
            else if (result.Status == 'EXISTS') {
                //alert('Given Size is Already Available...');
                var msg = 'Given Size is Already Available...';
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

//function for deleting size record
function Delete(ID) {
    //var ans = confirm("Are you sure you want to delete this Record?");
    //if (ans) {
    //    $.ajax({
    //        url: "/Size/Delete/" + ID,
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
        url: "/Size/getbyID/" + ID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            $('#Name').val(obj.SizeName);
            CheckSizeAlloted(ID);

        },
        error: function (errormessage) {
            alert('delete failed..');
        }
    });

    
}

function CheckSizeAlloted(ID) {

    $.ajax({
        url: "/Size/GetSizeRefDetails",
        data: JSON.stringify({ SizeId: ID }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            CItemList = result;
            if (CItemList.length > 0) {

                for (var x = 0; x < CItemList.length; x++) {

                    var c = CItemList[x].CountSizeId;

                    if (c > 0) {
                        //alert("Size Is Alloted For Some Other Entry,Please Check it....");
                        var msg = 'Size Is Alloted For Some Other Entry,Please Check it...';
                        var flg = 4;
                        var mode = 1;
                        AlartMessage(msg, flg, mode);
                    }
                    else {
                        var ans = confirm("Are you sure you want to delete this Record?");
                        if (ans) {
                            LoadingSymb();
                            $.ajax({
                                url: "/Size/Delete/" + ID,
                                type: "POST",
                                contentType: "application/json;charset=UTF-8",
                                dataType: "json",
                                success: function (result) {

                                    if (result.Value == 1) {
                                        //alert("Size delete success...")
                                        var msg = 'Size delete successfully...';
                                        var flg = 2;
                                        var mode = 0;
                                        AlartMessage(msg, flg, mode);
                                        AddUserEntryLog('Master', 'Size', 'DELETE', $('#Name').val());

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