var DcurrencyAbs = 0;
var CItemList = [];
$(document).ready(function () {
    DcurrencyAbs = $("#hdnDCurrencyAbs").data('value');

    var SetCurr = DcurrencyAbs +"  " + "[Default Currency]"
    document.getElementById("DcurrAbs").innerHTML = SetCurr;
    loadData();
})


function Add() {

    var isAct = false;

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
        //    isAct = true;
        //}
        //else {
        //    checkbox_value += "off";
        //}
    });
    //

    var Eo = "0";
    var curObj = {
        CurrencyId: $('#CurrencyID').val(),
        CurrencyName: $('#Name').val(),
        Abbreviation: $('#Abbreviation').val(),
        Exchangerate: $('#ExchangeRate').val(),
        Decimalplace: $('#DecemialPlace').val(),
        Euro: Eo,
        IsActive: ischecked
    };
    $("#btnAdd").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/Currency/Add",
        data: JSON.stringify(curObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            } else if (result.Value == -1) {
                //alert('Given Currency is Already Available...');
                var msg = 'Given Currency is Already Available...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }
            else {
                AddUserEntryLog('Master', 'Currency', 'ADD', $('#Name').val());
                $('#tbody').DataTable().destroy();
                loadData();
                $('#myModal').modal('hide');
                $('#CurrencyID').val("");
                $('#Name').val("");
                $('#Abbreviation').val("");
                $('#ExchangeRate').val("");
                $('#DecemialPlace').val("");
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
        url: '/Currency/List/',
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

                         { title: "CurrencyID", "visible": false },
                         { title: "Currency" },
                         { title: "Abbreviation" },
                         { title: "Exchangerate" },
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

function getbyID(CurrencyID) {
    debugger;
    $('#Name').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Currency/getbyID/" + CurrencyID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {
                $('#CurrencyID').val(obj.CurrencyId);
                $('#Name').val(obj.CurrencyName);
                $('#ExchangeRate').val(obj.Exchangerate);            
                $('#Abbreviation').val(obj.Abbreviation);
                $('#DecemialPlace').val(obj.Decimalplace);
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

function getViewbyID(CurrencyID) {
    debugger;
    $('#Name').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Currency/getbyID/" + CurrencyID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {
                $('#CurrencyID').val(obj.CurrencyId);
                $('#Name').val(obj.CurrencyName);
                $('#ExchangeRate').val(obj.Exchangerate);
                $('#Abbreviation').val(obj.Abbreviation);
                $('#DecemialPlace').val(obj.Decimalplace);
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
    });
   

    var cuObj = {
        CurrencyId: $('#CurrencyID').val(),
        CurrencyName: $('#Name').val(),
        Abbreviation: $('#Abbreviation').val(),
        Exchangerate: $('#ExchangeRate').val(),
        Decimalplace: $('#DecemialPlace').val(),
        IsActive: ischecked
    };
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/Currency/Update",
        data: JSON.stringify(cuObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Status == 'SUCCESS') {
                AddUserEntryLog('Master', 'Currency', 'UPDATE', $('#Name').val());
                $('#tbody').DataTable().destroy();
                loadData();
                $('#myModal').modal('hide');
                $('#Name').val("");
                $('#Abbreviation').val("");
                $('#ExchangeRate').val("");
                $('#DecemialPlace').val("");
                $('#Status').prop("checked", false);
                //alert('Data Updated Successfully');
                var msg = 'Data Updated Successfully...';
                var flg = 1;
                var mode = 0;
                AlartMessage(msg, flg, mode);
                $("#btnUpdate").attr("disabled", false);
            }
            else if (result.Status == 'EXISTS') {
                //alert('Given Currency is Already Available...');
                var msg = 'Given Currency is Already Available...';
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
    //var ans = confirm("Are you sure you want to delete this Record?");
    //if (ans) {
    //    $.ajax({
    //        url: "/Currency/Delete/" + ID,
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
        url: "/Currency/getbyID/" + ID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            $('#Name').val(obj.CurrencyName);
            CheckCurrencyAlloted(ID);

        },
        error: function (errormessage) {
            alert('delete failed..');
        }
    });
    
}



function CheckCurrencyAlloted(ID) {

    $.ajax({
        url: "/Currency/GetCurrencyRefDetails",
        data: JSON.stringify({ CurrencyId: ID }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            CItemList = result;
            if (CItemList.length > 0) {

                for (var x = 0; x < CItemList.length; x++) {

                    var c = CItemList[x].CountCurrencyId;

                    if (c > 0) {
                        //alert("Currency Is Alloted For Some Other Entry,Please Check it....");
                        var msg = 'Currency Is Alloted For Some Other Entry,Please Check it...';
                        var flg = 4;
                        var mode = 1;
                        AlartMessage(msg, flg, mode);
                    }
                    else {
                        var ans = confirm("Are you sure you want to delete this Record?");
                        if (ans) {
                            LoadingSymb();
                            $.ajax({
                                url: "/Currency/Delete/" + ID,
                                type: "POST",
                                contentType: "application/json;charset=UTF-8",
                                dataType: "json",
                                success: function (result) {
                                    if (result.Value == 1) {
                                        $('#tbody').DataTable().destroy();
                                        AddUserEntryLog('Master', 'Currency', 'DELETE', $('#Name').val());
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

    $('#Name').val("");
    $('#CurrencyID').val("");
    $('#Abbreviation').val("");
    $('#ExchangeRate').val("");
    $('#DecemialPlace').val("");

    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#SeasonID').css('border-color', 'lightgrey');
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
    if ($('#Abbreviation').val().trim() == "") {
        $('#Abbreviation').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Abbreviation').css('border-color', 'lightgrey');
    }
    return isValid;
}