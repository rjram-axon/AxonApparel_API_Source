
$(document).ready(function () {

    loadData();
    LoadProcessDDL("#ddlProcess");
    $(document).on('click', '.btnaddprocess', function () {
        debugger;
        $('#ProcessID').val("");
        $('#Name').val("");
        $('#Sewing').val("");
        $('#Fabric Dyeing').val("");
        $('#YarnDyeing').val("");
        $('#Knitting').val("");
        $('#Status').val("");
        $("#myModal2").modal('show');

    });
    loadprogram();
})


function loadprogram() {
    debugger;
    $.ajax({
        url: "/Process/ProgramList",
        data: JSON.stringify({}),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            Programlist = result;
            $("#ddlinput").append($('<option/>').val('').text('--Select ProgramType--'));
            $("#ddloutput").append($('<option/>').val('').text('--Select ProgramType--'));
            $.each(result, function () {
                $("#ddlinput").append($("<option></option>").val(this.programtype).html(this.program));
                $("#ddloutput").append($("<option></option>").val(this.programtype).html(this.program));

            });

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function Addprocess() {
    debugger;
    debugger;
    var isAct = false;
    var IsComp = false;
    var AllNot = false;

   
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
    //
    $(":checkbox").each(function () {
        var ischecked = $('#IsComponentProcess').is(":checked");
        if (ischecked) {
            checkbox_value += "on";
            IsComp = true;
        }
        else {
            checkbox_value += "off";
        }
    });
    //
    $(":checkbox").each(function () {
        var ischecked = $('#AllLotNum').is(":checked");
        if (ischecked) {
            checkbox_value += "on";
            AllNot = true;
        }
        else {
            checkbox_value += "off";
        }
    });
    //
    var protype = $('input[name="ProcessType"]:checked').attr('value');
    var ProObj = {
        ProcessId: $('#ProcessID').val(),
        ProcessName: $('#Name').val(),
        IsActive: isAct,
        IsComponentProcess: IsComp,
        Stage_Schedule: protype,
        AllowLotNumGen: AllNot,
        Programinput: $('#ddlinput').val(),
        Programoutput: $('#ddloutput').val()
    };
    LoadingSymb();
    $.ajax({
        url: "/Process/Add",
        data: JSON.stringify(ProObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            }
            else if (result.Value == -1) {
                //alert('Given Process is Already Available...');
                var msg = 'Given Process is Already Available...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }
            else {
                $('#tbody').DataTable().destroy();
                loadData();
                $('#myModal2').modal('hide');
                //LoadProcessDDL("#ddlProcess");
                //alert('Data Saved Successfully');
                var msg = 'Data Saved Successfully...';
                var flg = 1;
                var mode = 0;
                AlartMessage(msg, flg, mode);
            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });

}

function Add() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var protype = $('input[name="ProcessType"]:checked').attr('value');
    var ProObj = {
        ProcessSetupid: $('ProcessSetupID').val(),
        Processid: $('#ddlProcess').val(),
        CuttingorSewing: protype

    };
    $("#btnAdd").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/ProcessSetup/Add",
        data: JSON.stringify(ProObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            }
            else if (result.Value == -1) {
                //alert('Given ProcessSetup is Already Available...');
                var msg = 'Given ProcessSetup is Already Available...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }
            else {
                var process = $('#ddlProcess').find(":selected").text();
                AddUserEntryLog('Master', 'Process Setup', 'ADD', process);

                $('#tbody').DataTable().destroy();
                loadData();
                $('#myModal').modal('hide');
                $('#ddlProcess').val("");
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

    $.ajax({
        type: "GET",
        url: '/ProcessSetup/List/',
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

                         { title: "ProcessSetupid", "visible": false },
                         { title: "Process" },
                         { title: "CuttingorSewing" },
                         { title: "Action" },
                ]

            });

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function getbyID(ProcessSetupID) {

    //$('#ddlProcess').empty();
    //LoadProcessDDL("#ddlProcess");

    debugger;
    $('#ddlProcess').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $.ajax({
        url: "/ProcessSetup/getbyID/" + ProcessSetupID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            var selected = obj.CuttingorSewing;

            if (selected == "P") {
                $('input:radio[name="ProcessType"][value="P"]').prop('checked', true);
            } else if (selected == "I") {
                $('input:radio[name="ProcessType"][value="I"]').prop('checked', true);
            } else if (selected == "H") {
                $('input:radio[name="ProcessType"][value="H"]').prop('checked', true);
            } else if (selected == "M") {
                $('input:radio[name="ProcessType"][value="M"]').prop('checked', true);
            } else if (selected == "C") {
                $('input:radio[name="ProcessType"][value="C"]').prop('checked', true);
            } else if (selected == "R") {
                $('input:radio[name="ProcessType"][value="R"]').prop('checked', true);
            } else if (selected == "S") {
                $('input:radio[name="ProcessType"][value="S"]').prop('checked', true);
            } else if (selected == "F") {
                $('input:radio[name="ProcessType"][value="F"]').prop('checked', true);
            } else if (selected == "Y") {
                $('input:radio[name="ProcessType"][value="Y"]').prop('checked', true);
            } else if (selected == "K") {
                $('input:radio[name="ProcessType"][value="K"]').prop('checked', true);
            }
            else if (selected == "B") {
                $('input:radio[name="ProcessType"][value="B"]').prop('checked', true);
            } else {
                return false;
            }
            debugger;
            if (result.Status == 'SUCCESS') {
                $('#ddlProcess').val(obj.Processid);
                $('#ProcessSetupID').val(obj.ProcessSetupid);

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

function getViewbyID(ProcessSetupID) {

    //$('#ddlProcess').empty();
    //LoadProcessDDL("#ddlProcess");

    debugger;
    $('#ddlProcess').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $.ajax({
        url: "/ProcessSetup/getbyID/" + ProcessSetupID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            var selected = obj.CuttingorSewing;

            if (selected == "P") {
                $('input:radio[name="ProcessType"][value="P"]').prop('checked', true);
            } else if (selected == "I") {
                $('input:radio[name="ProcessType"][value="I"]').prop('checked', true);
            } else if (selected == "H") {
                $('input:radio[name="ProcessType"][value="H"]').prop('checked', true);
            } else if (selected == "M") {
                $('input:radio[name="ProcessType"][value="M"]').prop('checked', true);
            } else if (selected == "C") {
                $('input:radio[name="ProcessType"][value="C"]').prop('checked', true);
            } else if (selected == "R") {
                $('input:radio[name="ProcessType"][value="R"]').prop('checked', true);
            } else if (selected == "S") {
                $('input:radio[name="ProcessType"][value="S"]').prop('checked', true);
            } else if (selected == "F") {
                $('input:radio[name="ProcessType"][value="F"]').prop('checked', true);
            } else if (selected == "Y") {
                $('input:radio[name="ProcessType"][value="Y"]').prop('checked', true);
            } else if (selected == "K") {
                $('input:radio[name="ProcessType"][value="K"]').prop('checked', true);
            }
            else if (selected == "B") {
                $('input:radio[name="ProcessType"][value="B"]').prop('checked', true);
            } else {
                return false;
            }

            if (result.Status == 'SUCCESS') {
                $('#ddlProcess').val(obj.Processid);
                $('#ProcessSetupID').val(obj.ProcessSetupid);

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
    var res = validate();
    if (res == false) {
        return false;
    }
    var protype = $('input[name="ProcessType"]:checked').attr('value');
    var prObj = {
        Processid: $('#ddlProcess').val(),
        CuttingorSewing: protype,
        ProcessSetupid: $('#ProcessSetupID').val(),
    };
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/ProcessSetup/Update",
        data: JSON.stringify(prObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Status == 'SUCCESS') {
                
                var process = $('#ddlProcess').find(":selected").text();
                AddUserEntryLog('Master', 'Process Setup', 'UPDATE', process);

                $('#tbody').DataTable().destroy();
                loadData();
                $('#myModal').modal('hide');
                $('#ddlProcess').val("");
                $('#Status').val("");

                //alert('Data Updated Successfully');
                var msg = 'Data Updated Successfully...';
                var flg = 1;
                var mode = 0;
                AlartMessage(msg, flg, mode);
                $("#btnUpdate").attr("disabled", false);
            }
            else if (result.Status == 'EXISTS') {
                //alert('Given ProcessSetup is Already Available...');
                var msg = 'Given ProcessSetup is Already Available...';
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
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        LoadingSymb();
        $.ajax({
            url: "/ProcessSetup/getbyID/" + ID,
            typr: "GET",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                debugger;
                var obj = result.Value;
                $('#ddlProcess').val(obj.Processid);
                var process = $('#ddlProcess').find(":selected").text();
                AddUserEntryLog('Master', 'Process Setup', 'DELETE', process);

                $.ajax({
                    url: "/ProcessSetup/Delete/" + ID,
                    type: "POST",
                    contentType: "application/json;charset=UTF-8",
                    dataType: "json",
                    success: function (result) {
                        debugger;
                        if (result.Value == 1) {
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
////Function for clearing the textboxes
function clearTextBox() {

    // $('#Name').val("");
    $('#ddlProcess').empty();
    $('#Status').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#ddlProcess').css('border-color', 'lightgrey');
    //$('#Name').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    LoadProcessDDL("#ddlProcess");
}

//Valdidation using jquery
function validate() {
    var isValid = true;
    //if ($('#ddlProcess').val().trim() == "") {
    //    $('#ddlProcess').css('border-color', 'Red');
    //    isValid = false;
    //}
    //else {
    //    $('#ddlProcess').css('border-color', 'lightgrey');
    //}
    if ($('#ddlProcess').val() == 0) {
        $('#ddlProcess').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlProcess').css('border-color', 'lightgrey');
    }
    return isValid;
}