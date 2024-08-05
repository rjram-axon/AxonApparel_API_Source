
var CItemList = [];
$(document).ready(function () {
    loadData();
})

function loadData() {


    $.ajax({
        type: "GET",
        url: '/ShipmentSystem/List/',
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

                         { title: "SystemId", "visible": false },
                         { title: "Shipment System" },
                         { title: "FreeOrCharge" },
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
function Add() {
    var isAct = false;
    var res = validate();
    if (res == false) {
        return false;
    }
    var checkbox_value = "";
    debugger;
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
    var shipsystemObj = {
        SystemId: $('#ShipmentSystemID').val(),
        System: $('#Name').val(),
        FreeOrCharge: freeOrcharge,
        IsActive: isAct,

    };
    $("#btnAdd").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/ShipmentSystem/Add",
        data: JSON.stringify(shipsystemObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            }
            else if (result.Value == -1) {
                //alert('Given ShipmentSystem is Already Available...');
                var msg = 'Given ShipmentSystem is Already Available...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }
            else {
                AddUserEntryLog('Master', 'Shipment System', 'ADD', $('#Name').val());

                $('#tbody').DataTable().destroy();
                loadData();
                $('#myModal').modal('hide');
                $('#ShipmentSystemID').val("");
                $('#Name').val("");
                $('input[name="FreeOrCharge"]').prop('checked', false);
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

    });

    var freeOrcharge = $('input[name="FreeOrCharge"]:checked').attr('value');

    var shipsystemObj = {
        SystemId: $('#ShipmentSystemID').val(),
        System: $('#Name').val(),
        FreeOrCharge: freeOrcharge,
        IsActive: ischecked,
    };
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();

    $.ajax({
        url: "/ShipmentSystem/Update",
        data: JSON.stringify(shipsystemObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
           
            if (result.Status == 'SUCCESS') {
                AddUserEntryLog('Master', 'Shipment System', 'UPDATE', $('#Name').val());

                $('#tbody').DataTable().destroy();
                loadData();
                $('#myModal').modal('hide');
                $('#ShipmentSystemID').val("");
                $('#Name').val("");
                $('input[name="FreeOrCharge"]').prop('checked', false);
                $('#Status').prop("checked", false);
                //alert('Data Updated Successfully');
                var msg = 'Data Updated Successfully...';
                var flg = 1;
                var mode = 0;
                AlartMessage(msg, flg, mode);
                $("#btnUpdate").attr("disabled", false);
            }
            else if (result.Status == 'EXISTS') {
                //alert('Given ShipmentSystem is Already Available...');
                var msg = 'Given ShipmentSystem is Already Available...';
                var flg = 1;
                var mode = 0;
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

   

    return isValid;
}
function getbyID(SystemId) {
    debugger;
    $('#Name').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $.ajax({
        url: "/ShipmentSystem/getbyID/" + SystemId,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            var selected = obj.FreeOrCharge;
            if (selected == "F") {
                $('input:radio[name="FreeOrCharge"][value="F"]').prop('checked', true);
            } else {
                $('input:radio[name="FreeOrCharge"][value="C"]').prop('checked', true);
            };

            if (result.Status == 'SUCCESS') {
                $('#ShipmentSystemID').val(obj.SystemId);
                $('#Name').val(obj.System);
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

function getViewbyID(SystemId) {
    debugger;
    $('#Name').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $.ajax({
        url: "/ShipmentSystem/getbyID/" + SystemId,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            var selected = obj.FreeOrCharge;
            if (selected == "F") {
                $('input:radio[name="FreeOrCharge"][value="F"]').prop('checked', true);
            } else {
                $('input:radio[name="FreeOrCharge"][value="C"]').prop('checked', true);
            };

            if (result.Status == 'SUCCESS') {
                $('#ShipmentSystemID').val(obj.SystemId);
                $('#Name').val(obj.System);
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
    debugger;
    $.ajax({
        url: "/ShipmentSystem/getbyID/" + ID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            $('#Name').val(obj.System);
            CheckShipSystemModeAlloted(ID);

        },
        error: function (errormessage) {
            alert('delete failed..');
        }
    });
    


}



function CheckShipSystemModeAlloted(ID) {

    $.ajax({
        url: "/ShipmentSystem/GetShipsysRefDetails",
        data: JSON.stringify({ SystemId: ID }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            CItemList = result;
            if (CItemList.length > 0) {

                for (var x = 0; x < CItemList.length; x++) {

                    var c = CItemList[x].CountSystemId;

                    if (c > 0) {
                        //alert("ShipmentSystem Is Alloted For Some Other Entry,Please Check it....");
                        var msg = 'ShipmentSystem Is Alloted For Some Other Entry,Please Check it...';
                        var flg = 4;
                        var mode = 1;
                        AlartMessage(msg, flg, mode);
                    }
                    else {
                        var ans = confirm("Are you sure you want to delete this Record?");
                        if (ans) {
                            LoadingSymb();
                            $.ajax({
                                url: "/ShipmentSystem/Delete/" + ID,
                                type: "POST",
                                contentType: "application/json;charset=UTF-8",
                                dataType: "json",
                                success: function (result) {

                                    if (result.Value == 1) {
                                        $('#tbody').DataTable().destroy();
                                        AddUserEntryLog('Master', 'Shipment System', 'DELETE', $('#Name').val());
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
function clearTextBox() {
    $('#ShipmentSystemID').val("");
    $('#Name').val("");
    $('#Status').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#ShipmentSystemID').css('border-color', 'lightgrey');
    $('#Name').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    //$('input[name="FreeOrCharge"]').prop('checked', false);
}


