
var CItemList = [];
$(document).ready(function () {
    
    loadData();
    loadprogram();
})

function loadprogram() {
    debugger;
    $.ajax({
        url: "/Process/ProgramList",
        data: JSON.stringify({  }),
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
function Add() {
    debugger;
    var isAct = false;
    var IsComp = false;
    var IsValiPrQty = false;
    var AllNot = false;
    var IsProp=false;

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


    $(":checkbox").each(function () {
        var ischecked = $('#IsProcessValidateOrdQty').is(":checked");
        if (ischecked) {
            checkbox_value += "on";
            IsValiPrQty = true;
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

    $(":checkbox").each(function () {
        var ischecked = $('#InpOutPro').is(":checked");
        if (ischecked) {
            IsProp=true;
        }
        else {
            IsProp=false;
        }
    });



    var comp = 0;
    if(IsComp){
        comp=1
    }
    //
    var protype = $('input[name="ProcessType"]:checked').attr('value');
    var ProObj = {
        ProcessId: $('#ProcessID').val(),
        ProcessName: $('#Name').val(),
        IsActive: isAct,
        IsEmblishmentProcess: IsComp,
        Stage_Schedule:protype,
        AllowLotNumGen: AllNot,
        IsValidateProcessOrdQty: IsValiPrQty,
        Programinput: $('#ddlinput').val(),
        Programoutput: $('#ddloutput').val(),
        ProcessLoss: $('#ProcessLoss').val(),
        IsProportion: IsProp,
    };
    $("#btnAdd").attr("disabled", true);
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
            } else if (result.Value == -1) {
                //alert('Given Process is Already Available...');
                var msg = 'Given Process is Already Available...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }
            else {
                AddUserEntryLog('Master', 'Process', 'ADD', $('#Name').val());

                $('#tbody').DataTable().destroy();
                loadData();
                $('#myModal').modal('hide');
                $('#ProcessID').val("");
                $('#Name').val("");
                $('#ProcessLoss').val("");
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
        url: '/Process/List/',
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

                         { title: "ProcessID", "visible": false },
                         { title: "Process" },
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

function getbyID(ProcessID) {
    debugger;
    $('#Name').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Process/getbyID/" + ProcessID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            var selected = obj.Stage_Schedule;
            if (selected == "1") {
                $('input:radio[name="ProcessType"][value="1"]').prop('checked', true);
            } else {
                $('input:radio[name="ProcessType"][value="2"]').prop('checked', true);
            };
            if (result.Status == 'SUCCESS') {
                $('#ProcessID').val(obj.ProcessId);
                $('#Name').val(obj.ProcessName);
                $('#ProcessLoss').val(obj.ProcessLoss);
                if (obj.IsActive == "TRUE") {
                    $('#Status').prop("checked", true);
                } else {
                    $('#Status').prop("checked", false);
                }
                if (obj.AllowLotNumGen == "TRUE") {
                    $('#AllLotNum').prop("checked", true);
                } else {
                    $('#AllLotNum').prop("checked", false);
                }
                if (obj.IsEmblishmentProcess == "TRUE") {
                    $('#IsComponentProcess').prop("checked", true);
                } else {
                    $('#IsComponentProcess').prop("checked", false);
                }
                if (obj.IsValidateProcessOrdQty == "TRUE") {
                    $('#IsProcessValidateOrdQty').prop("checked", true);
                } else {
                    $('#IsProcessValidateOrdQty').prop("checked", false);
                }
                if (obj.IsProportion == "TRUE") {
                    $('#InpOutPro').prop("checked", true);
                } else {
                    $('#InpOutPro').prop("checked", false);
                }
                debugger;

                //for (var d = 0; d < Programlist.length; d++) {
                //    if (Programlist[d].programtype == obj.Programinput) {
                //        var typeinp = Programlist[d].program;
                //        $('#ddlinput').val(typeinp);
                //    }
                //}

                //for (var p = 0; p< Programlist.length; p++) {
                //    if (Programlist[p].programtype == obj.Programoutput) {
                //        var typeop = Programlist[p].program;
                //        $('#ddloutput').val(typeop);
                //    }
                //}
                $('#ddlinput').val(obj.Programinput);
                $('#ddloutput').val(obj.Programoutput);
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

function getViewbyID(ProcessID) {
    debugger;
    $('#Name').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Process/getbyID/" + ProcessID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            var selected = obj.Stage_Schedule;
            if (selected == "1") {
                $('input:radio[name="ProcessType"][value="1"]').prop('checked', true);
            } else {
                $('input:radio[name="ProcessType"][value="2"]').prop('checked', true);
            };
            if (result.Status == 'SUCCESS') {
                $('#ProcessID').val(obj.ProcessId);
                $('#Name').val(obj.ProcessName);
                $('#ProcessLoss').val(obj.ProcessLoss);
                if (obj.IsActive == "TRUE") {
                    $('#Status').prop("checked", true);
                } else {
                    $('#Status').prop("checked", false);
                }
                if (obj.AllowLotNumGen == "TRUE") {
                    $('#AllLotNum').prop("checked", true);
                } else {
                    $('#AllLotNum').prop("checked", false);
                }
                if (obj.IsComponentProcess == "TRUE") {
                    $('#IsComponentProcess').prop("checked", true);
                } else {
                    $('#IsComponentProcess').prop("checked", false);
                }
                if (obj.IsValidateProcessOrdQty == "TRUE") {
                    $('#IsProcessValidateOrdQty').prop("checked", true);
                } else {
                    $('#IsProcessValidateOrdQty').prop("checked", false);
                }

                debugger;

                //for (var d = 0; d < Programlist.length; d++) {
                //    if (Programlist[d].programtype == obj.Programinput) {
                //        var typeinp = Programlist[d].program;
                //        $('#ddlinput').val(typeinp);
                //    }
                //}

                //for (var p = 0; p< Programlist.length; p++) {
                //    if (Programlist[p].programtype == obj.Programoutput) {
                //        var typeop = Programlist[p].program;
                //        $('#ddloutput').val(typeop);
                //    }
                //}
                $('#ddlinput').val(obj.Programinput);
                $('#ddloutput').val(obj.Programoutput);
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
    debugger;
    var isAct = false;
    var IsComp = false;
    var IsValiPrcQty = false;
    var AllNot = false;
    var ischecked = false;
    var res = validate();
    var IsProp = false;
    if (res == false) {
        return false;
    }
    var checkbox_value = "";
    $(":checkbox").each(function () {
        ischecked = $('#Status').is(":checked");
    });
    $(":checkbox").each(function () {
        IsComp = $('#IsComponentProcess').is(":checked");
    });
    $(":checkbox").each(function () {
        IsValiPrcQty = $('#IsProcessValidateOrdQty').is(":checked");
    });
    $(":checkbox").each(function () {
        AllNot = $('#AllLotNum').is(":checked");
    });

    $(":checkbox").each(function () {
        var ischecked = $('#InpOutPro').is(":checked");
        if (ischecked) {
            IsProp = true;
        }
        else {
            IsProp = false;
        }
    });


    var comp = 0;
    if (IsComp) {
        comp = 1
    }

    var protype = $('input[name="ProcessType"]:checked').attr('value');
    var prObj = {
        ProcessId: $('#ProcessID').val(),
        ProcessName: $('#Name').val(),
        IsActive: ischecked,
        IsEmblishmentProcess: IsComp,
        Stage_Schedule: protype,
        AllowLotNumGen: AllNot,
        IsValidateProcessOrdQty: IsValiPrcQty,
        Programinput: $('#ddlinput').val(),
        Programoutput: $('#ddloutput').val(),
        ProcessLoss: $('#ProcessLoss').val(),
        IsProportion: IsProp,
    };
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/Process/Update",
        data: JSON.stringify(prObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
           
            if (result.Status == 'SUCCESS') {
                AddUserEntryLog('Master', 'Process', 'UPDATE', $('#Name').val());

                $('#tbody').DataTable().destroy();
                loadData();
                $('#myModal').modal('hide');
                $('#ProcessID').val("");
                $('#Name').val("");
                $('#Status').prop("checked", false);
                $('#ProcessLoss').val("");
                //alert('Data Updated Successfully');
                var msg = 'Data Updated Successfully...';
                var flg = 1;
                var mode = 0;
                AlartMessage(msg, flg, mode);
                $("#btnUpdate").attr("disabled", false);
            }
            else if (result.Status == 'EXISTS') {
                //alert('Given Process is Already Available...');
                var msg = 'Given Process is Already Available...';
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
    //        url: "/Process/Delete/" + ID,
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
        url: "/Process/getbyID/" + ID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            $('#Name').val(obj.ProcessName);
            CheckProcessAlloted(ID);

        },
        error: function (errormessage) {
            alert('delete failed..');
        }
    });
    CheckProcessAlloted(ID);
}


function CheckProcessAlloted(ID) {

    $.ajax({
        url: "/Process/GetProcessRefDetails",
        data: JSON.stringify({ ProcessId: ID }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            CItemList = result;
            if (CItemList.length > 0) {

                for (var x = 0; x < CItemList.length; x++) {

                    var c = CItemList[x].CountProcessId;

                    if (c > 0) {
                        //alert("Process Is Alloted For Some Other Entry,Please Check it....");
                        var msg = 'Process Is Alloted For Some Other Entry,Please Check it...';
                        var flg = 4;
                        var mode = 1;
                        AlartMessage(msg, flg, mode);
                    }
                    else {
                        var ans = confirm("Are you sure you want to delete this Record?");
                        if (ans) {
                            LoadingSymb();
                            $.ajax({
                                url: "/Process/Delete/" + ID,
                                type: "POST",
                                contentType: "application/json;charset=UTF-8",
                                dataType: "json",
                                success: function (result) {

                                    if (result.Value == 1) {
                                        $('#tbody').DataTable().destroy();
                                        AddUserEntryLog('Master', 'Process', 'DELETE', $('#Name').val());
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
////Function for clearing the textboxes
function clearTextBox() {
    $('#Status').prop("checked", false);
    $('#IsComponentProcess').prop("checked", false);
    $('#IsProcessValidateOrdQty').prop("checked", false);
    $('#InpOutPro').prop("checked", false);
    $('#AllLotNum').prop("checked", false);
    $('#ProcessID').val("");
    $('#Name').val("");
    $('#Sewing').val("");
    $('#Fabric Dyeing').val("");
    $('#YarnDyeing').val("");
    $('#Knitting').val("");
    $('#Status').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#ddlinput').val(""),
    $('#ddloutput').val(""),
    $('#ProcessID').css('border-color', 'lightgrey');
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
    //if ($('#ProcessLoss').val().trim() == "") {
    //    $('#ProcessLoss').css('border-color', 'Red');
    //    isValid = false;
    //}
    //else {
    //    $('#ProcessLoss').css('border-color', 'lightgrey');
    //}
    return isValid;
}