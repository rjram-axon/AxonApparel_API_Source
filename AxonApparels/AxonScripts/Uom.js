
var CItemList = [];
$(document).ready(function () {
    loadData();
    $('#ddldeci').val('0');
});

function loadData() {
    $.ajax({
        type: "GET",
        url: '/Unit_of_measurement/List/',
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
                         { title: "Uom ID", "visible": false },
                         { title: "Unit Of Measurement" },
                         { title: "Abbreviation" },
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
    $('#UomID').val("");
    $('#Uom').val("");
    $('#abbreviation').val("");
 
    $('#Status').val("");
    
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#UomID').css('border-color', 'lightgrey');
    $('#Uom').css('border-color', 'lightgrey');
    $('#ddldeci').css('border-color', 'lightgrey');
    $('#abbreviation').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
}

function validate() {
    var isValid = true;
    if ($('#Uom').val() == "") {
        $('#Uom').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Uom').css('border-color', 'lightgrey');
    }
    if ($('#abbreviation').val().trim() == "") {
        $('#abbreviation').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#abbreviation').css('border-color', 'lightgrey');
    }
    if ($('#ddldeci').val() == 0) {
        $('#ddldeci').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddldeci').css('border-color', 'lightgrey');
    }

    return isValid;
}

function getbyID(UomID) {
    $('#Status').css('border-color', 'lightgrey');
    $('#UomID').css('border-color', 'lightgrey');
    $('#Uom').css('border-color', 'lightgrey');
    $('#ddldeci').css('border-color', 'lightgrey');
    $('#abbreviation').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
   
    $.ajax({
        url: "/Unit_of_measurement/getbyID/" + UomID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;

            $('#UomID').val(obj.UomId);
            $('#Uom').val(obj.Uom);
            $('#ddldeci').val(obj.IsDecimal);
            $('#abbreviation').val(obj.Abbreviation);

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

function getViewbyID(UomID) {
    $('#Status').css('border-color', 'lightgrey');
    $('#UomID').css('border-color', 'lightgrey');
    $('#Uom').css('border-color', 'lightgrey');
    $('#ddldeci').css('border-color', 'lightgrey');
    $('#abbreviation').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');

    $.ajax({
        url: "/Unit_of_measurement/getbyID/" + UomID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;

            $('#UomID').val(obj.UomId);
            $('#Uom').val(obj.Uom);
            $('#ddldeci').val(obj.IsDecimal);
            $('#abbreviation').val(obj.Abbreviation);

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

    var UomObj = {
        UomId: $('#UomID').val(),
        Uom: $('#Uom').val(),
        Abbreviation: $('#abbreviation').val(),
        IsDecimal: $('#ddldeci').val(),
        IsActive: ischecked,
    };
    $("#btnAdd").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/Unit_of_measurement/Add",
        data: JSON.stringify(UomObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            } else if (result.Value == -1) {
                //alert('Given Unitofmeasurement is Already Available...');
                var msg = 'Given Unitofmeasurement is Already Available...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }
            else {
                AddUserEntryLog('Master', 'Unit Of Measurement', 'ADD', $('#Uom').val());

                $('#tbody').DataTable().destroy();

                loadData();
                $('#myModal').modal('hide');
                $('#UomID').val("");
                $('#Uom').val("");
                $('#abbreviation').val("");
                $('#ddldeci').val("");
                $('#Status').val("");

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

    var UomObj = {
        UomId: $('#UomID').val(),
        Uom: $('#Uom').val(),
        Abbreviation: $('#abbreviation').val(),
        IsDecimal: $('#ddldeci').val(),
        IsActive: ischecked,
    };
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/Unit_of_measurement/Update",
        data: JSON.stringify(UomObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
           
            //clearTextBox();
            if (result.Status == 'SUCCESS') {
                AddUserEntryLog('Master', 'Unit Of Measurement', 'UPDATE', $('#Uom').val());
                $('#tbody').DataTable().destroy();

                loadData();
                $('#myModal').modal('hide');
                $('#UomID').val("");
                $('#Uom').val("");
                $('#abbreviation').val("");
                $('#ddldeci').val("");
                $('#Status').val("");
                //alert('Data Updated Successfully');
                var msg = 'Data Updated Successfully...';
                var flg = 1;
                var mode = 0;
                AlartMessage(msg, flg, mode);
                $("#btnUpdate").attr("disabled", false);
            }
            else if (result.Status == 'EXISTS') {
                //alert('Given UOM is Already Available...');
                var msg = 'Given Unit Of Measurment is Already Available...';
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
    //        url: "/Unit_of_measurement/Delete/" + ID,
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
        url: "/Unit_of_measurement/getbyID/" + ID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            $('#Uom').val(obj.Uom);
            CheckUomAlloted(ID);

        },
        error: function (errormessage) {
            alert('delete failed..');
        }
    });
    
}

function CheckUomAlloted(ID) {

    $.ajax({
        url: "/Unit_of_measurement/GetUomRefDetails",
        data: JSON.stringify({ UomId: ID }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            CItemList = result;
            if (CItemList.length > 0) {

                for (var x = 0; x < CItemList.length; x++) {

                    var c = CItemList[x].CountUomId;

                    if (c > 0) {
                        //alert("Uom Is Alloted For Some Other Entry,Please Check it....");
                        var msg = 'Unit Of Measurment Is Alloted For Some Other Entry,Please Check it...';
                        var flg = 4;
                        var mode = 1;
                        AlartMessage(msg, flg, mode);
                    }
                    else {
                        var ans = confirm("Are you sure you want to delete this Record?");
                        if (ans) {
                            LoadingSymb();
                            $.ajax({
                                url: "/Unit_of_measurement/Delete/" + ID,
                                type: "POST",
                                contentType: "application/json;charset=UTF-8",
                                dataType: "json",
                                success: function (result) {

                                    if (result.Value == 1) {
                                        $('#tbody').DataTable().destroy();
                                        AddUserEntryLog('Master', 'Unit Of Measurement', 'DELETE', $('#Uom').val());
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