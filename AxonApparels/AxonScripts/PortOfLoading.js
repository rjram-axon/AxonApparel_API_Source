var CItemList = [];
$(document).ready(function () {
    loadData();
    $('#ddlCountry').empty();

    LoadCountryDDL("#ddlCountry");

    $(document).on('click', '.btnaddcountry', function () {
        debugger;
        $('#txtCountryID').val(""),
    $('#txtconName').val(""),
   $('#txtlookup').val(""),
   $('#Statuscon').val(""),
        $("#myModal2").modal('show');

    });
});


function AddCountry() {
    debugger;

    var checkbox_value = "";
    var ischecked = false;
    $(":checkbox").each(function () {
        ischecked = $('#Statuscon').is(":checked");

    });
    debugger;
    var countryObj = {
        CountryId: $('#txtCountryID').val(),
        CountryName: $('#txtconName').val(),
        Lookup: $('#txtlookup').val(),
        IsActive: ischecked,
    };
    LoadingSymb();
    $.ajax({
        url: "/Country/Add",
        data: JSON.stringify(countryObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            }
            else if (result.Value == -1) {
                //alert('Given Country is Already Available...');
                var msg = 'Given Country is Already Available...';
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
                $('#myModal2').modal('hide');
                LoadCountryDDL("#ddlCountry");
            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}



function loadData() {


    $.ajax({
        type: "GET",
        url: '/PortOfLoading/List/',
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
                         { title: "ID", "visible": false },
                         { title: "Name" },
                         { title: "Country" },
                         { title: "PortCode" },
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

    $('#txtPortOfLoadingID').val("");
    $('#txtPortOfLoading1').val("");
    $('#txtPortCode').val("");
    $('#ddlCountry').empty();
    $('#Status').val("");

    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#txtPortOfLoadingID').css('border-color', 'lightgrey');
    $('#txtPortOfLoading1').css('border-color', 'lightgrey');
    $('#txtPortCode').css('border-color', 'lightgrey');
    $('#ddlCountry').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    // $('#tbody').DataTable().destroy();

    LoadCountryDDL("#ddlCountry");
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
        //if (ischecked) {
        //    checkbox_value += "on";
        //}
        //else {
        //    checkbox_value += "off";
        //}
    });
    debugger;
    var PortObj = {
        PortOfLoadingId: $('#txtPortOfLoadingID').val(),
        PortOfLoading1: $('#txtPortOfLoading1').val(),
        PortCode: $('#txtPortCode').val(),
        CountryId: $('#ddlCountry').val(),
        IsActive: ischecked,
    };
    $("#btnAdd").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: '/PortOfLoading/Add/',
        data: JSON.stringify(PortObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            } else if (result.Value == -1) {
                //alert('Given PortOfLoading is Already Available...');
                var msg = 'Given PortOfLoading is Already Available...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }
            else {
                AddUserEntryLog('Master', 'PortOfLoading', 'ADD', $('#txtPortOfLoading1').val());
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
            // clearTextBox();

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

    var PortObj = {
        PortOfLoadingId: $('#txtPortOfLoadingID').val(),
        PortOfLoading1: $('#txtPortOfLoading1').val(),
        PortCode: $('#txtPortCode').val(),
        CountryId: $('#ddlCountry').val(),
        IsActive: ischecked,
    };
    debugger;
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/PortOfLoading/Update",
        data: JSON.stringify(PortObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
           
            if (result.Status == 'SUCCESS') {
                AddUserEntryLog('Master', 'PortOfLoading', 'UPDATE', $('#txtPortOfLoading1').val());
                $('#tbody').DataTable().destroy();
                loadData();
                $('#myModal').modal('hide');
                $('#txtPortOfLoadingID').val("");
                $('#txtPortOfLoading1').val("");
                $('#txtPortCode').val("");
                $('#ddlCountry').val("");
                $('#Status').prop("checked", false);
                //alert('Data Updated Successfully');
                var msg = 'Data Updated Successfully...';
                var flg = 1;
                var mode = 0;
                AlartMessage(msg, flg, mode);
                $("#btnUpdate").attr("disabled", false);
            }
            else if (result.Status == 'EXISTS') {
                //alert('Given PortOfLoading is Already Available...');
                var msg = 'Given PortOfLoading is Already Available...';
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
    debugger;
    $.ajax({
        url: "/PortOfLoading/getbyID/" + ID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            $('#txtPortOfLoading1').val(obj.PortOfLoading1);
            CheckPortOfLoadingalloted(ID);

        },
        error: function (errormessage) {
            alert('delete failed..');
        }
    });
    
}

function CheckPortOfLoadingalloted(Id) {

    $.ajax({
        url: "/PortOfLoading/GetPortOfLoadingRefDetails",
        data: JSON.stringify({ PortOfLoadingId: Id }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            CItemList = result;
            if (CItemList.length > 0) {

                for (var x = 0; x < CItemList.length; x++) {

                    var c = CItemList[x].CountportId;

                    if (c > 0) {
                        //alert("PortOfLoading Is Alloted For Some Other Entry,Please Check it....");
                        var msg = 'PortOfLoading Is Alloted For Some Other Entry,Please Check it...';
                        var flg = 4;
                        var mode = 1;
                        AlartMessage(msg, flg, mode);
                    }
                    else {
                        var ans = confirm("Are you sure you want to delete this Record?");
                        if (ans) {
                            LoadingSymb();
                            $.ajax({
                                url: "/PortOfLoading/Delete/" + Id,
                                type: "POST",
                                contentType: "application/json;charset=UTF-8",
                                dataType: "json",
                                success: function (result) {

                                    if (result.Value == 1) {
                                        AddUserEntryLog('Master', 'PortOfLoading', 'DELETE', $('#txtPortOfLoading1').val());
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
function validate() {
    var isValid = true;
    if ($('#txtPortOfLoading1').val() == "") {
        $('#txtPortOfLoading1').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtPortOfLoading1').css('border-color', 'lightgrey');
    }

    return isValid;
}

function getbyID(PortId) {

    $('#ddlCountry').empty();
    LoadCountryDDL("#ddlCountry");

    $('#txtPortOfLoading1').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $.ajax({
        url: "/PortOfLoading/getbyID/" + PortId,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {
                $('#txtPortOfLoadingID').val(obj.PortOfLoadingId);
                $('#txtPortOfLoading1').val(obj.PortOfLoading1);
                $('#txtPortCode').val(obj.PortCode);
                $('#ddlCountry').val(obj.CountryId);
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

function getViewbyID(PortId) {

    $('#ddlCountry').empty();
    LoadCountryDDL("#ddlCountry");

    $('#txtPortOfLoading1').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $.ajax({
        url: "/PortOfLoading/getbyID/" + PortId,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {
                $('#txtPortOfLoadingID').val(obj.PortOfLoadingId);
                $('#txtPortOfLoading1').val(obj.PortOfLoading1);
                $('#txtPortCode').val(obj.PortCode);
                $('#ddlCountry').val(obj.CountryId);
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