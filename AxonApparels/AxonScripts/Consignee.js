/// <reference path="jquery-1.9.1.intellisense.js" />
//Load Data in Table when documents is ready
$(document).ready(function () {
    loadData();
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
                LoadCityDDL("#ddlcity");

            }
            // clearTextBox();

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });

}



//Load Data function
function loadData() {
    //$.ajax({
    //    url: "/Consignee/List",
    //    type: "GET",
    //    contentType: "application/json;charset=utf-8",
    //    dataType: "json",
    //    success: function (result) {
    //        var html = '';

    //        $.each(result, function (key, item) {
    //            html += '<tr>';
    //            html += '<td style="visibility:hidden;">' + item.ConsigneeId + '</td>';
    //            html += '<td>' + item.ConsigneeName + '</td>';
    //            html += '<td>' + item.Address1 + ',' + item.Address2 + ',' + item.Address3 + '</td>';
    //            html += '<td>' + item.CityName + '</td>';
    //            html += '<td>' + item.IsActive + '</td>';
    //            html += '<td><a href="#" onclick="return getbyID(' + item.ConsigneeId + ')">Edit</a> | <a href="#" onclick="Delele(' + item.ConsigneeId + ')">Delete</a></td>';
    //            html += '</tr>';
    //        });
    //        $('.tbody').html(html);
    //    },
    //    error: function (errormessage) {
    //        alert(errormessage.responseText);
    //    }
    //});

    $.ajax({
        type: "GET",
        url: '/Consignee/List/',
        data: JSON.stringify({}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");
            $('#tbody').DataTable({
                data: dataSet,
                columns: [
                         { title: "Consignee ID", "visible": false },
                         { title: "Consignee" },
                         { title: "Address" },
                         { title: "City" },
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
    $('#ConsigneeID').val("");
    $('#Name').val("");
    $('#add1').val("");
    $('#add2').val("");
    $('#add3').val("");
    $('#ddlcity').empty();
    $('#zipcode').val("");
    $('#Status').val("");
    $('#lookup').val("");
    $('#remarks').val("");

    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#ConsigneeID').css('border-color', 'lightgrey');
    $('#add1').css('border-color', 'lightgrey');
    $('#add2').css('border-color', 'lightgrey');
    $('#add3').css('border-color', 'lightgrey');
    $('#ddlcity').css('border-color', 'lightgrey');
    $('#Name').css('border-color', 'lightgrey');
    $('#zipcode').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $('#lookup').css('border-color', 'lightgrey');
    $('#remarks').css('border-color', 'lightgrey');
    //$('#tbody').DataTable().destroy();
    LoadCityDDL("#ddlcity");


}

//Add Data Function 
function Add() {
    var res = validate();
    if (res == false) {
        return false;
    }

    var checkbox_value = "";
    var ischecked = false;
    debugger;
    $(":checkbox").each(function () {
         ischecked = $('#Status').is(":checked");
        ////if (ischecked) {
        ////    checkbox_value += "on";
        ////}
        ////else {
        ////    checkbox_value += "off";
        ////}
    });

    var ConsigneeObj = {
        ConsigneeId: $('#ConsigneeID').val(),
        ConsigneeName: $('#Name').val(),
        Address1: $('#add1').val(),
        Address2: $('#add2').val(),
        Address3: $('#add3').val(),
        CityId: $('#ddlcity').val(),
        Zipcode: $('#zipcode').val(),
        Remarks: $('#remarks').val(),
        LookUp: $('#lookup').val(),
        IsActive: ischecked,
    };
    $("#btnAdd").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/Consignee/Add",
        data: JSON.stringify(ConsigneeObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            }
            else {
                $('#tbody').DataTable().destroy();

                loadData();
                $('#myModal').modal('hide');
                //$('#tbody').DataTable().destroy();
                //clearTextBox();
                AddUserEntryLog('Master', 'Consignee', 'ADD', $('#Name').val());
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
    var isValid = true;
    if ($('#Name').val().trim() == "") {
        $('#Name').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Name').css('border-color', 'lightgrey');
    }

    if ($('#lookup').val().trim() == "") {
        $('#lookup').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#lookup').css('border-color', 'lightgrey');
    }
    if ($('#add1').val().trim() == "") {
        $('#add1').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#add1').css('border-color', 'lightgrey');
    }
    if ($('#zipcode').val().trim() == "") {
        $('#zipcode').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#zipcode').css('border-color', 'lightgrey');
    }
    //citydropdown = $('#ddlcity');
    //if (citydropdown.length == 0 || $(citydropdown).val() == "") {
    //    $('#ddlcity').css('border-color', 'Red');
    //    isValid = false;
    //}
    //else {
    //    $('#ddlcity').css('border-color', 'lightgrey');
    //}
    var z = $("#zipcode").val();
    if (z.length >= 8) {
        $('#zipcode').css('border-color', 'Red');
        isValid = false;
    }
    return isValid;
}

//Function for getting the Data Based upon Consignee ID
function getbyID(ConsigneeID) {
    $('#ddlcity').empty();
    LoadCityDDL("#ddlcity");

    $('#Status').css('border-color', 'lightgrey');
    $('#ConsigneeID').css('border-color', 'lightgrey');
    $('#add1').css('border-color', 'lightgrey');
    $('#add2').css('border-color', 'lightgrey');
    $('#add3').css('border-color', 'lightgrey');
    $('#ddlcity').css('border-color', 'lightgrey');
    $('#Name').css('border-color', 'lightgrey');
    $('#zipcode').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $('#remarks').css('border-color', 'lightgrey');
    $('#lookup').css('border-color', 'lightgrey');
    debugger;
    $.ajax({
        url: "/Consignee/getbyID/" + ConsigneeID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            $('#ConsigneeID').val(obj.ConsigneeId);
            $('#add1').val(obj.Address1);
            $('#add2').val(obj.Address2);
            $('#add3').val(obj.Address3);
            $('#ddlcity').val(obj.CityId);
            $('#Name').val(obj.ConsigneeName);
            $('#zipcode').val(obj.Zipcode);
            $('#lookup').val(obj.Lookup);
            $('#remarks').val(obj.Remarks);


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

function getViewbyID(ConsigneeID) {
    $('#ddlcity').empty();
    LoadCityDDL("#ddlcity");

    $('#Status').css('border-color', 'lightgrey');
    $('#ConsigneeID').css('border-color', 'lightgrey');
    $('#add1').css('border-color', 'lightgrey');
    $('#add2').css('border-color', 'lightgrey');
    $('#add3').css('border-color', 'lightgrey');
    $('#ddlcity').css('border-color', 'lightgrey');
    $('#Name').css('border-color', 'lightgrey');
    $('#zipcode').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $('#remarks').css('border-color', 'lightgrey');
    $('#lookup').css('border-color', 'lightgrey');
    debugger;
    $.ajax({
        url: "/Consignee/getbyID/" + ConsigneeID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            $('#ConsigneeID').val(obj.ConsigneeId);
            $('#add1').val(obj.Address1);
            $('#add2').val(obj.Address2);
            $('#add3').val(obj.Address3);
            $('#ddlcity').val(obj.CityId);
            $('#Name').val(obj.ConsigneeName);
            $('#zipcode').val(obj.Zipcode);
            $('#lookup').val(obj.Lookup);
            $('#remarks').val(obj.Remarks);


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

    var ConsigneeObj = {
        ConsigneeId: $('#ConsigneeID').val(),
        ConsigneeName: $('#Name').val(),
        Address1: $('#add1').val(),
        Address2: $('#add2').val(),
        Address3: $('#add3').val(),
        CityId: $('#ddlcity').val(),
        Zipcode: $('#zipcode').val(),
        Remarks: $('#remarks').val(),
        LookUp: $('#lookup').val(),
        IsActive: ischecked,
    };
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/Consignee/Update",
        data: JSON.stringify(ConsigneeObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
           
            if (result.Value == 1) {
                AddUserEntryLog('Master', 'Consignee', 'UPDATE', $('#Name').val());

                $('#tbody').DataTable().destroy();
                $('#myModal').modal('hide');
                loadData();
                //alert('Data Updated Successfully');
                var msg = 'Data Updated Successfully...';
                var flg = 1;
                var mode = 0;
                AlartMessage(msg, flg, mode);
                $("#btnUpdate").attr("disabled", false);
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
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        LoadingSymb();
        $.ajax({
            url: "/Consignee/getbyID/" + ID,
            typr: "GET",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                var obj = result.Value;
                $('#Name').val(obj.ConsigneeName);
                AddUserEntryLog('Master', 'Consignee', 'DELETE', $('#Name').val());

                debugger;
                $.ajax({
                    url: "/Consignee/Delete/" + ID,
                    type: "POST",
                    contentType: "application/json;charset=UTF-8",
                    dataType: "json",
                    success: function (result) {

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