/// <reference path="jquery-1.9.1.intellisense.js" />
//Load Data in Table when documents is ready
var CItemList = [];
$(document).ready(function () {
    loadData();
    $('#ddlType').val('0');
    $(document).on('click', '.btnaddcity', function () {
        debugger;
        LoadCountryDDL("#ddlCoun");
        $('#txtCityID').val(""),
    $('#txtcitName').val(""),
   $('#ddlCountry').val(),
   $('#Statuscit').val(""),
        $("#myModal3").modal('show');

    });
});

function LoadCountry() {

    $('#txtCountry').val("");

    var CityID = $('#ddlcity').val();

    $.ajax({
        url: "/Company/GetCountDetails",
        data: JSON.stringify({ CityId: CityID }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            if (obj != undefined) {

                $('#txtCountry').val(obj[0]["CountryName"]);
                $('#txtCountryId').val(obj[0]["CountryId"]);

            }
            else {

            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function Addcity() {
    debugger;
    var checkbox_value = "";
    var ischecked = false;
    $(":checkbox").each(function () {
        ischecked = $('#Statuscit').is(":checked");
        //if (ischecked) {
        //    checkbox_value += "on";
        //}
        //else {
        //    checkbox_value += "off";
        //}
    });
    debugger;
    var cityObj = {
        cityId: $('#txtCityID').val(),
        CityName: $('#txtcitName').val(),
        CountryId: $('#ddlCoun').val(),
        //Lookup: $('#txtlookup').val(),
        IsActive: ischecked,
    };
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
                var mod = 1;
                var ur = "";
                AlartMessage(msg, flg, mod, ur);
                return true;
            }
            else{
                //alert('Data Saved Successfully');
                var msg = 'Data Saved Successfully...';
                var flg = 1;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                $('#myModal3').modal('hide');
                LoadCityDDL("#ddlcity");
            }
           

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });

}

//Load Data function
function loadData() {
    debugger;
    var ty = $('#ddlMainType').val();
    if (ty == "0") {
        ty=""
    }
    $.ajax({
        type: "GET",
        url: '/Agent/List/',
        data: JSON.stringify({}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");
            $('#tbody').DataTable({
                data: dataSet,
                columns: [
                         { title: "Agent ID", "visible": false },
                         { title: "Agent" },
                         { title: "Address" },
                         { title: "City" },
                          { title: "Type" },
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

function ChngType() {
    debugger;
   // var ty= $('#ddlMainType').val();
    loadData();
    //if (ty == 'B') {
    //    $.ajax({
    //        type: "GET",
    //        url: '/Agent/GetAgent/',
    //        data: JSON.stringify({}),
    //        contentType: "application/json; charset=utf-8",
    //        dataType: "json",
    //        success: function (json) {
    //        }
    //    });
    //}

}
//Function for clearing the textboxes
function clearTextBox() {
    $('#AgentID').val("");
    $('#Name').val("");
    $('#add1').val("");
    $('#add2').val("");
    $('#add3').val("");
    $('#ddlcity').empty();
    $('#zipcode').val("");
    $('#mobileno').val("");
   // $('#ddltype').val("");
    $('#contactname').val("");
    $('#Status').val("");

    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#AgentID').css('border-color', 'lightgrey');
    $('#add1').css('border-color', 'lightgrey');
    $('#add2').css('border-color', 'lightgrey');
    $('#add3').css('border-color', 'lightgrey');
    $('#ddlcity').css('border-color', 'lightgrey');
    $('#Name').css('border-color', 'lightgrey');
    $('#zipcode').css('border-color', 'lightgrey');
    $('#mobileno').css('border-color', 'lightgrey');
    $('#ddltype').css('border-color', 'lightgrey');
    $('#contactname').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    LoadCityDDL("#ddlcity");
   // LoadTypeDDL("#ddltype");

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

    var agentObj = {
       // AgentId: $('#AgentID').val(),
        AgentName: $('#Name').val(),
        Address1: $('#add1').val(),
        Address2: $('#add2').val(),
        Address3: $('#add3').val(),
        CityId: $('#ddlcity').val(),
        Zipcode: $('#zipcode').val(),
        Type: $('#ddlType').val(),
        ContactName: $('#contactname').val(),
        CountryId: $('#txtCountryId').val(),
        MobNo: $('#mobileno').val(),
        IsActive: ischecked,
    };
    $("#btnAdd").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/Agent/Add",
        data: JSON.stringify(agentObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            
            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            }
            else if (result.Value == -1) {
                //alert('Given Agent is Already Available...');
                var msg = 'Given Agent is Already Available...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }
            else {
                AddUserEntryLog('Master', 'Agent', 'ADD', $('#Name').val());

                $('#tbody').DataTable().destroy();
                loadData();
                $('#myModal').modal('hide');
                //$('#AgentID').val("");
                $('#Name').val("");
                $('#add1').val(""),
                $('#add2').val(""),
                $('#add3').val(""),
                $('#ddlcity').val(""),
                $('#zipcode').val(""),
                $('#ddltype').val(0),
                $('#contactname').val(""),
                $('#mobileno').val(""),
                $('Status').val("")
                //clearTextBox();

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

//Valdidation using jquery
function validate() {
    debugger;
    var isValid = true;
    if ($('#Name').val().trim() == "") {
        $('#Name').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Name').css('border-color', 'lightgrey');
    }

    if ($('#mobileno').val().trim() == "") {
        $('#mobileno').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#mobileno').css('border-color', 'lightgrey');

    }
    if ($('#contactname').val().trim() == "") {
        $('#contactname').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#contactname').css('border-color', 'lightgrey');
    }
    if ($('#ddlType').val() == 0) {
        $('#ddlType').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlType').css('border-color', 'lightgrey');
    }
    //if ($('#ddlcity').val() == 0) {
    //    $('#ddlcity').css('border-color', 'Red');
    //    isValid = false;
    //}
    //else {
    //    $('#ddlcity').css('border-color', 'lightgrey');
    //}

    //var a = $("#mobileno").val();
    //var filter = /^\d{15}$/;
    //if (filter.test(a)) {            
    //}
    //else {
    //    $('#mobileno').css('border-color', 'Red');
    //    isValid = false;
    //}

    //var z = $("#zipcode").val();
    //var filter = /^\d{8}$/;
    //if (filter.test(z)) {
    //}
    //else {
    //    $('#zipcode').css('border-color', 'Red');
    //    isValid = false;
    //}
    var a = $("#mobileno").val();
    //var filter = /^\d{15}$/;
    if (a.length>=15) {
        $('#mobileno').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#mobileno').css('border-color', 'lightgrey');
    }
    var z = $("#zipcode").val();
    if(z.length>=8) {
        $('#zipcode').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#zipcode').css('border-color', 'lightgrey');
    }
    return isValid;
}

//Function for getting the Data Based upon Agent ID
function getbyID(AgentID) {
    $('#ddlcity').empty();
    LoadCityDDL("#ddlcity");
    

    $('#Status').css('border-color', 'lightgrey');
    $('#AgentID').css('border-color', 'lightgrey');
    $('#add1').css('border-color', 'lightgrey');
    $('#add2').css('border-color', 'lightgrey');
    $('#add3').css('border-color', 'lightgrey');
    $('#ddlcity').css('border-color', 'lightgrey');
    $('#Name').css('border-color', 'lightgrey');
    $('#zipcode').css('border-color', 'lightgrey');
    $('#mobileno').css('border-color', 'lightgrey');
    //$('#ddltype').css('border-color', 'lightgrey');
    $('#contactname').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');

    $.ajax({
        url: "/Agent/getbyID/" + AgentID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            if (result.Status == 'SUCCESS') {

                $('#AgentID').val(obj.AgentId);
                $('#add1').val(obj.Address1);
                $('#add2').val(obj.Address2);
                $('#add3').val(obj.Address3);
                $('#ddlcity').val(obj.CityId);
                $('#Name').val(obj.AgentName);
                $('#zipcode').val(obj.Zipcode);
                $('#mobileno').val(obj.MobNo);
                $('#ddlType').val(obj.Type);
                $('#contactname').val(obj.ContactName);
                LoadCountry();
                if (obj.IsActive == "TRUE") {
                    $('#Status').prop("checked", true);
                } else {
                    $('#Status').prop("checked", false);
                }

                $('#myModal').modal('show');
                $('#btnUpdate').show();
                $('#btnAdd').hide();
            } else { }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

function getViewbyID(AgentID) {
    $('#ddlcity').empty();
    LoadCityDDL("#ddlcity");


    $('#Status').css('border-color', 'lightgrey');
    $('#AgentID').css('border-color', 'lightgrey');
    $('#add1').css('border-color', 'lightgrey');
    $('#add2').css('border-color', 'lightgrey');
    $('#add3').css('border-color', 'lightgrey');
    $('#ddlcity').css('border-color', 'lightgrey');
    $('#Name').css('border-color', 'lightgrey');
    $('#zipcode').css('border-color', 'lightgrey');
    $('#mobileno').css('border-color', 'lightgrey');
    //$('#ddltype').css('border-color', 'lightgrey');
    $('#contactname').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');

    $.ajax({
        url: "/Agent/getbyID/" + AgentID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            if (result.Status == 'SUCCESS') {

                $('#AgentID').val(obj.AgentId);
                $('#add1').val(obj.Address1);
                $('#add2').val(obj.Address2);
                $('#add3').val(obj.Address3);
                $('#ddlcity').val(obj.CityId);
                $('#Name').val(obj.AgentName);
                $('#zipcode').val(obj.Zipcode);
                $('#mobileno').val(obj.MobNo);
                $('#ddlType').val(obj.Type);
                $('#contactname').val(obj.ContactName);
                LoadCountry();
                if (obj.IsActive == "TRUE") {
                    $('#Status').prop("checked", true);
                } else {
                    $('#Status').prop("checked", false);
                }

                $('#myModal').modal('show');
                $('#btnUpdate').hide();
                $('#btnAdd').hide();
            } else { }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

//function for updating Agent record
function Update() {
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

    var agentObj = {
        AgentId: $('#AgentID').val(),
        AgentName: $('#Name').val(),
        Address1: $('#add1').val(),
        Address2: $('#add2').val(),
        Address3: $('#add3').val(),
        CityId: $('#ddlcity').val(),
        Zipcode: $('#zipcode').val(),
        //Fax: $('#Fax').val(),
        Type: $('#ddlType').val(),
        ContactName: $('#contactname').val(),
        CountryId: $('#txtCountryId').val(),
        MobNo: $('#mobileno').val(),
        //Email: $('#Email').val(),
        IsActive: ischecked,
    };
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/Agent/Update",
        data: JSON.stringify(agentObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {        

            if (result.Status == 'SUCCESS') {
                AddUserEntryLog('Master', 'Agent', 'UPDATE', $('#Name').val());

                $('#tbody').DataTable().destroy();

                $('#myModal').modal('hide');
                loadData();
                $('#AgentID').val("");
                $('#Name').val("");
                $('#add1').val(""),
                $('#add2').val(""),
                $('#add3').val(""),
               $('#ddlcity').val(""),
               $('#zipcode').val(""),
               $('#ddltype').val(),
               $('#contactname').val(""),
               $('#mobileno').val(""),
               $('#Status').val("")
                //alert('Data Updated Successfully');
                var msg = 'Data Updated Successfully...';
                var flg = 1;
                var mode = 0;
                AlartMessage(msg, flg, mode);
                $("#btnUpdate").attr("disabled", false);
            }
            else if (result.Status == 'EXISTS') {
                //alert('Given Agent is Already Available...');
                var msg = 'Given Agent is Already Available...';
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

//function for deleting Agent record
function Delete(ID) {
    //var ans = confirm("Are you sure you want to delete this Record?");
    //if (ans) {
    //    $.ajax({
    //        url: "/Agent/Delete/" + ID,
    //        type: "POST",
    //        contentType: "application/json;charset=UTF-8",
    //        dataType: "json",
    //        success: function (result) {
    //            if (result.Value != 0) {
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
        url: "/Agent/getbyID/" + ID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            $('#Name').val(obj.AgentName);
            CheckAgentAlloted(ID);

        },
        error: function (errormessage) {
            alert('delet failed..');
        }
    });
    CheckAgentAlloted(ID);
}

function CheckAgentAlloted(ID) {

    $.ajax({
        url: "/Agent/GetAgentRefDetails",
        data: JSON.stringify({ AgentId: ID }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            CItemList = result;
            if (CItemList.length > 0) {

                for (var x = 0; x < CItemList.length; x++) {

                    var c = CItemList[x].CountAgentId;

                    if (c > 0) {
                        //alert("Agent Is Alloted For Some Other Entry,Please Check it....");
                        var msg = 'Agent Is Alloted For Some Other Entry,Please Check it...';
                        var flg = 4;
                        var mode = 1;
                        AlartMessage(msg, flg, mode);
                    }
                    else {
                        var ans = confirm("Are you sure you want to delete this Record?");
                        if (ans) {
                            LoadingSymb();
                            $.ajax({
                                url: "/Agent/Delete/" + ID,
                                type: "POST",
                                contentType: "application/json;charset=UTF-8",
                                dataType: "json",
                                success: function (result) {
                                    if (result.Value != 0) {
                                        $('#tbody').DataTable().destroy();
                                        AddUserEntryLog('Master', 'Agent', 'DELETE', $('#Name').val());
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