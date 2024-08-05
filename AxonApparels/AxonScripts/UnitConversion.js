$(document).ready(function () {
    loadData();
    $(document).on('click', '.btnadduom', function () {
        debugger;
        $('#UomID').val("");
        $('#Uom').val("");
        $('#abbreviation').val("");
        $('#ddldeci').val("");
        $('#Statusuom').val("");
        $("#myModal1").modal('show');

    });
});


function Adduom() {
    debugger;
    var checkbox_value = "";
    var ischecked = false;

    $(":checkbox").each(function () {
        ischecked = $('#Statusuom').is(":checked");
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
            }
            else if (result.Value == -1) {
                //alert('Given U O M is Already Available...');
                var msg = 'Given Unit Of Measurment is Already Available...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }
            else {
                //alert('Data Saved Successfully');
                var msg = 'Data Saved Successfully...';
                var flg = 1;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                $('#myModal1').modal('hide');
                LoadUomDDL("#ddlfromuom,#ddltouom");
            }
            //clearTextBox();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });

}

function loadData() {
    $.ajax({
        type: "GET",
        url: '/UnitConversion/List/',
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
                select: {
                    style: 'single'
                },
                "bSort": false,
                columns: [
                         { title: "UC ID", "visible": false },
                         { title: "Unit Conversion" },
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
    $('#UcID').val("");
    $('#orderno').val("");
    $('#conversion').val("");
    $('#ddlmode').val("");
   // $('#ddlfromuom').empty();
   // $('#ddltouom').empty();
    $('#Status').val("");

    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#UcID').css('border-color', 'lightgrey');
    $('#conversion').css('border-color', 'lightgrey');
    $('#ddlfromuom').css('border-color', 'lightgrey');
    $('#ddltouom').css('border-color', 'lightgrey');
    $('#ddlmode').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    //$('#tbody').DataTable().destroy();
    debugger;
    LoadUomDDL("#ddlfromuom,#ddltouom");
   //LoadUomDDL("#ddltouom");

}

function validate() {
    var isValid = true;
    if ($('#ddlfromuom').val() == 0) {
        $('#ddlfromuom').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlfromuom').css('border-color', 'lightgrey');
    }
    if ($('#ddltouom').val() == 0) {
        $('#ddltouom').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddltouom').css('border-color', 'lightgrey');
    }
    if ($('#conversion').val() == "") {
        $('#conversion').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#conversion').css('border-color', 'lightgrey');
    }

    return isValid;
}

function getbyID(UcID) {
    $('#ddlfromuom').empty();
   // LoadUomDDL("#ddlfromuom");
    $('#ddltouom').empty();
    //LoadUomDDL("#ddltouom");
    LoadUomDDL("#ddlfromuom,#ddltouom");

    $('#Status').css('border-color', 'lightgrey');
    $('#UcID').css('border-color', 'lightgrey');
    $('#conversion').css('border-color', 'lightgrey');
    $('#ddlfromuom').css('border-color', 'lightgrey');
    $('#ddltouom').css('border-color', 'lightgrey');
    $('#ddlmode').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');

    $.ajax({
        url: "/UnitConversion/getbyID/" + UcID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;

            $('#UcID').val(obj.Id);
            $('#conversion').val(obj.Conversion);
            $('#ddlfromuom').val(obj.FromUomId);
            $('#ddltouom').val(obj.ToUomId);
            $('#ddlmode').val(obj.Mode);

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
function getViewbyID(UcID) {
    $('#ddlfromuom').empty();
    // LoadUomDDL("#ddlfromuom");
    $('#ddltouom').empty();
    //LoadUomDDL("#ddltouom");
    LoadUomDDL("#ddlfromuom,#ddltouom");

    $('#Status').css('border-color', 'lightgrey');
    $('#UcID').css('border-color', 'lightgrey');
    $('#conversion').css('border-color', 'lightgrey');
    $('#ddlfromuom').css('border-color', 'lightgrey');
    $('#ddltouom').css('border-color', 'lightgrey');
    $('#ddlmode').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');

    $.ajax({
        url: "/UnitConversion/getbyID/" + UcID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;

            $('#UcID').val(obj.Id);
            $('#conversion').val(obj.Conversion);
            $('#ddlfromuom').val(obj.FromUomId);
            $('#ddltouom').val(obj.ToUomId);
            $('#ddlmode').val(obj.Mode);

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
    debugger;
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

    var UCObj = {
        Id: $('#UcID').val(),
        Conversion: $('#conversion').val(),
        Mode: $('#ddlmode').val(),
        FromUomId: $('#ddlfromuom').val(),
       // FromUom:$('#ddlfromuom').text(),
        ToUomId: $('#ddltouom').val(),
        IsActive: ischecked,
    };
    $("#btnAdd").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/UnitConversion/Add",
        data: JSON.stringify(UCObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            } else if (result.Value == -1) {
                //alert('Given UnitConversion is Already Available...');
                var msg = 'Given UnitConversion is Already Available...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }
            else {
                var fromuom = $('#ddlfromuom').find(":selected").text();
                var touom = $('#ddltouom').find(":selected").text();
                AddUserEntryLog('Master', 'Unit Conversion', 'ADD', fromuom + '-' + touom);

                $('#tbody').DataTable().destroy();

                loadData();
                $('#myModal').modal('hide');
                $('#UcID').val("");
                $('#conversion').val("");
                $('#ddlmode').val("");
                $('#ddlfromuom').text("");
                $('#ddltouom').val("");
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

    var UcObj = {
        Id: $('#UcID').val(),
        Conversion: $('#conversion').val(),
        Mode: $('#ddlmode').val(),
        FromUomId: $('#ddlfromuom').val(),
        ToUomId: $('#ddltouom').val(),
        //FromUom:$('#ddlfromuom').text(),
        IsActive: ischecked,
    };
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/UnitConversion/Update",
        data: JSON.stringify(UcObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
           
            if (result.Status == 'SUCCESS') {
                var fromuom = $('#ddlfromuom').find(":selected").text();
                var touom = $('#ddltouom').find(":selected").text();
                AddUserEntryLog('Master', 'Unit Conversion', 'UPDATE', fromuom + '-' + touom);

                $('#tbody').DataTable().destroy();

                loadData();
                $('#myModal').modal('hide');
                $('#UcID').val("");
                $('#conversion').val("");
                $('#ddlmode').val("");
                $('#ddlfromuom').val("");
                $('#ddltouom').val("");
                $('#Status').val("");
                //alert('Data Updated Successfully');
                var msg = 'Data Updated Successfully...';
                var flg = 1;
                var mode = 0;
                AlartMessage(msg, flg, mode);
                $("#btnUpdate").attr("disabled", false);
            }
            else if (result.Status == 'EXISTS') {
                //alert('Given UnitConversion is Already Available...');
                var msg = 'Given UnitConversion is Already Available...';
                var flg = 4;
                var mode = 0;
                AlartMessage(msg, flg, mode);
                return true;
            }
            else {
                window.location.href = "/Error/Index";
            }

            //clearTextBox();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function Delete(ID) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        LoadingSymb();
        $.ajax({
            url: "/UnitConversion/Delete/" + ID,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
              
                if (result.Value == 1) {
                    $('#tbody').DataTable().destroy();
                    var fromuom = $('#ddlfromuom').find(":selected").text();
                    var touom = $('#ddltouom').find(":selected").text();
                    AddUserEntryLog('Master', 'Unit Conversion', 'DELETE', fromuom + '-' + touom);
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
