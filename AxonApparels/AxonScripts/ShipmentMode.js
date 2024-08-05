
var CItemList = [];
$(document).ready(function () {
    loadData();
    })


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
    var freeOrcharge = $('input[name="FreeOrCharge"]:checked').attr('value');
    var shipmodeObj = {
        ShipmentModeId: $('#ShipementModeID').val(),
        ShipementMode: $('#Name').val(),
        IsActive: isAct,
    };
    $("#btnAdd").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/ShipmentMode/Add",
        data: JSON.stringify(shipmodeObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            }
            else if (result.Value == -1) {
                //alert('Given ShipmentMode is Already Available...');
                var msg = 'Given ShipmentMode is Already Available...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }
            else {
                AddUserEntryLog('Master', 'Shipment Mode', 'ADD', $('#Name').val());

                $('#tbody').DataTable().destroy();
                loadData();
                $('#myModal').modal('hide');
                $('#ShipementModeID').val("");
                $('#Name').val("");
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
//
function loadData() {
    //$.ajax({
    //    url: "/ShipmentMode/List",
    //    type: "GET",
    //    contentType: "application/json;charset=utf-8",
    //    dataType: "json",
    //    success: function (result) {
    //        var html = '';
       
    //        $.each(result, function (key, item) {
    //            html += '<tr>';
    //            html += '<td style="visibility:hidden;">' + item.ShipmentModeId + '</td>';
    //            html += '<td>' + item.ShipementMode + '</td>';
    //            html += '<td>' + item.IsActive + '</td>';
    //            html += '<td><a href="#" onclick="return getbyID(' + item.ShipmentModeId + ')">Edit</a> | <a href="#" onclick="Delele(' + item.ShipmentModeId + ')">Delete</a></td>';
    //            html += '</tr>';
    //        });
    //        $('.tbody').html(html);
          
    //    },
    //    error: function (errormessage) {
    //        alert(errormessage.responseText);
    //    }
    //});


    //$.ajax({
    //    type: "GET",
    //    url: '/ShipmentMode/List/',
    //    data: JSON.stringify({}),
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    success: function (json) {
    //        var tableload = json.data
    //        var dataSet = eval("[" + tableload + "]");            
    //        $('#tbody').dataTable({
    //            "aaData": json.data,
    //            "aoColumns": [
    //                { "mDataProp": "ShipModeId" },
    //                { "mDataProp": "ShipMode" },
    //                { "mDataProp": "Status" },
    //                { "mDataProp": "Action" }
    //            ]
    //        });
    //    },
    //    failure: function (errMsg) {
    //        alert(errMsg);
    //    }
    //});


    
    $.ajax({
        type: "GET",
        url: '/ShipmentMode/List/',
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
                         { title: "ShipModeId" , "visible": false},
                         { title: "Shipment Mode" },
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

function getbyID(DepartID) {
    debugger;
    $('#Name').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $.ajax({
        url: "/ShipmentMode/getbyID/" + DepartID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {
                $('#ShipementModeID').val(obj.ShipmentModeId);
                $('#Name').val(obj.ShipementMode);
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

function getViewbyID(DepartID) {
    debugger;
    $('#Name').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $.ajax({
        url: "/ShipmentMode/getbyID/" + DepartID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {
                $('#ShipementModeID').val(obj.ShipmentModeId);
                $('#Name').val(obj.ShipementMode);
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

//function for updating department's record
function Update() {
    //var isAct = false;
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

    var shipmodeObj = {
        ShipmentModeId: $('#ShipementModeID').val(),
        ShipementMode: $('#Name').val(),
        IsActive: ischecked,
    };
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/ShipmentMode/Update",
        data: JSON.stringify(shipmodeObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {    
           
            if (result.Status == 'SUCCESS') {
                AddUserEntryLog('Master', 'Shipment Mode', 'UPDATE', $('#Name').val());

                $('#tbody').DataTable().destroy();
                loadData();
                $('#myModal').modal('hide');
                $('#ShipementModeID').val("");
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
                //alert('Given ShipmentMode is Already Available...');
                var msg = 'Given ShipmentMode is Already Available...';
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
    //var ans = confirm("Are you sure you want to delete this Record?");
    //if (ans) {
    //    $.ajax({
    //        url: "/ShipmentMode/Delete/" + ID,
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
        url: "/ShipmentMode/getbyID/" + ID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            $('#Name').val(obj.ShipementMode);
            CheckShipModeAlloted(ID);

        },
        error: function (errormessage) {
            alert('delete failed..');
        }
    });
    
}

function CheckShipModeAlloted(ID) {

    $.ajax({
        url: "/ShipmentMode/GetShipModeRefDetails",
        data: JSON.stringify({ ShipmentModeId: ID }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            CItemList = result;
            if (CItemList.length > 0) {

                for (var x = 0; x < CItemList.length; x++) {

                    var c = CItemList[x].CountShipmentModeId;

                    if (c > 0) {
                        //alert("ShipmentMode Is Alloted For Some Other Entry,Please Check it....");
                        var msg = 'ShipmentMode Is Alloted For Some Other Entry,Please Check it...';
                        var flg = 4;
                        var mode = 1;
                        AlartMessage(msg, flg, mode);
                    }
                    else {
                        var ans = confirm("Are you sure you want to delete this Record?");
                        if (ans) {
                            LoadingSymb();
                            $.ajax({
                                url: "/ShipmentMode/Delete/" + ID,
                                type: "POST",
                                contentType: "application/json;charset=UTF-8",
                                dataType: "json",
                                success: function (result) {

                                    if (result.Value == 1) {
                                        $('#tbody').DataTable().destroy();
                                        AddUserEntryLog('Master', 'Shipment Mode', 'DELETE', $('#Name').val());
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
//Function for clearing the textboxes
function clearTextBox() {
    $('#ShipementModeID').val("");
    $('#Name').val("");
    $('#Status').val("");

    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#ShipementModeID').css('border-color', 'lightgrey');
    $('#Name').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
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