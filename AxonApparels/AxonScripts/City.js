/// <reference path="jquery-1.9.1.intellisense.js" />
//Load Data in Table when documents is ready
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
  

    LoadStateDDL("#ddlState");
    $(document).on('click', '.btnaddstate', function () {
        debugger;
        $('#txtStateID').val(""),
        $('#txtSName').val(""),
        $('#txtSlookup').val(""),
        $('#Status').val(""),
        $("#myModal3").modal('show');

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
function SAdd() {
    //var res = validate();
    //if (res == false) {
    //    return false;
    //}
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
    debugger;
    var stateObj = {
        id: $('#txtStateID').val(),
        state: $('#txtSName').val(),
        lookup: $('#txtSlookup').val(),
        //Lookup: $('#txtlookup').val(),
        isactive: ischecked,
    };
    LoadingSymb();
    $.ajax({
        url: "/State/Add",
        data: JSON.stringify(stateObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == 0) {
                window.location.href = "/Error/Index";

            }
            else if (result.Value == -1) {
                //alert('Given State is Already Available...');
                var msg = 'Given State is Already Available...';
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
                $('#myModal3').modal('hide');
                LoadStateDDL("#ddlState");
            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}


//Load Data function
function loadData() {
    $.ajax({
        type: "GET",
        url: '/City/List/',
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
                         { title: "City" },
                         { title: "Country" },
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
    debugger;
    $('#txtCityID').val("");
    $('#txtName').val("");
    $('#ddlCountry').empty();
    $('#ddlState').empty();
    $('#Status').val("");

    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#txtCityID').css('border-color', 'lightgrey');
    $('#txtName').css('border-color', 'lightgrey');
    $('#ddlCountry').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');

    LoadCountryDDL("#ddlCountry");
    LoadStateDDL("#ddlState");
  

}


//Add Data Function 
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
    var cityObj = {
        cityId: $('#txtCityID').val(),
        CityName: $('#txtName').val(),
        CountryId: $('#ddlCountry').val(),
        StateId: $('#ddlState').val(),
        //Lookup: $('#txtlookup').val(),
        IsActive: ischecked,
    };
    $("#btnAdd").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/City/Add",
        data: JSON.stringify(cityObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.Value == 0) {
                window.location.href = "/Error/Index";

            }
            else if (result.Value == -1) {
                //alert('Given City is Already Available...');
                var msg = 'Given City is Already Available...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }
            else {
                AddUserEntryLog('Master', 'City', 'ADD', $('#txtName').val());
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

//function for updating City's record
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

    var cityObj = {
        cityId: $('#txtCityID').val(),
        CityName: $('#txtName').val(),
        CountryId: $('#ddlCountry').val(),
        StateId: $('#ddlState').val(),
        IsActive: ischecked,
    };
    debugger;
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/City/Update",
        data: JSON.stringify(cityObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.Status == 'SUCCESS') {
                AddUserEntryLog('Master', 'City', 'UPDATE', $('#txtName').val());
                $('#tbody').DataTable().destroy();
                loadData();
                $('#myModal').modal('hide');
                $('#txtCityID').val("");
                $('#txtName').val("");
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
                //alert('Given City is Already Available...');
                var msg = 'Given City is Already Available...';
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

//function for deleting City's record
function Delete(ID) {
    debugger;
    $.ajax({
        url: "/City/getbyID/" + ID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            $('#txtName').val(obj.CityName);
            CheckCityalloted(ID);

        },
        error: function (errormessage) {
            alert('delete failed..');
        }
    });
    
}
function CheckCityalloted(ID) {

    $.ajax({
        url: "/City/GetCityRefDetails",
        data: JSON.stringify({ cityId: ID }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            CItemList = result;
            if (CItemList.length > 0) {

                for (var x = 0; x < CItemList.length; x++) {

                    var c = CItemList[x].CountcityId;

                    if (c > 0) {
                        //alert("City Is Alloted For Some Other Entry,Please Check it....");
                        var msg = 'City Is Alloted For Some Other Entry,Please Check it...';
                        var flg = 4;
                        var mode = 1;
                        AlartMessage(msg, flg, mode);
                    }
                    else {
                        var ans = confirm("Are you sure you want to delete this Record?");
                        if (ans) {
                            LoadingSymb();
                            $.ajax({
                                url: "/City/Delete/" + ID,
                                type: "POST",
                                contentType: "application/json;charset=UTF-8",
                                dataType: "json",
                                success: function (result) {

                                    if (result.Value == 1) {
                                        AddUserEntryLog('Master', 'City', 'DELETE', $('#txtName').val());
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

//Valdidation using jquery
function validate() {
    var isValid = true;
    if ($('#txtName').val() == "") {
        $('#txtName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtName').css('border-color', 'lightgrey');
    }
    if ($('#ddlCountry').val() == 0) {
        $('#ddlCountry').siblings(".select2-container").css('border', '1px solid red');
        isValid = false;
    }
    else {
        $('#ddlCountry').siblings(".select2-container").css('border', '1px solid lightgrey');
    }
    return isValid;
}

function getbyID(CityID) {

    //$('#ddlCountry').empty();
    //LoadCountryDDL("#ddlCountry");

    //$('#ddlState').empty();
    //LoadStateDDL("#ddlState");

    $('#txtName').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $.ajax({
        url: "/City/getbyID/" + CityID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {
                $('#txtCityID').val(obj.CityId);
                $('#txtName').val(obj.CityName);
                $('#ddlCountry').val(obj.CountryId);
                $('#ddlState').val(obj.StateId);
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

function getViewbyID(CityID) {

    $('#txtName').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $.ajax({
        url: "/City/getbyID/" + CityID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {
                $('#txtCityID').val(obj.CityId);
                $('#txtName').val(obj.CityName);
                $('#ddlCountry').val(obj.CountryId);
                $('#ddlState').val(obj.StateId);
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