/// <reference path="jquery-1.9.1.intellisense.js" />
//Load Data in Table when documents is ready
$(document).ready(function () {
   
    loadData();

    $(document).on('click', '.btnaddcountry', function () {
        debugger;
        $('#txtCountryID').val(""),
    $('#txtconName').val(""),
   $('#txtlookup').val(""),
   $('#Statuscon').val(""),
        $("#myModal2").modal('show');

    });

    $(document).on('click', '.btnaddcity', function () {
        debugger;
        LoadCountryDDL("#ddlCoun");
        $('#txtCityID').val(""),
    $('#txtName').val(""),
   $('#ddlCountry').val(),
   $('#Statuscit').val(""),
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
                alert('Given Country is Already Available...');
                return true;
            }
            else
            {
                alert('Data Saved Successfully');
                $('#myModal2').modal('hide');
                LoadCountryDDL("#ddlcountry");
            }
           
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
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
        CityName: $('#txtName').val(),
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
                alert('Given City is Already Available...');
                return true;
            }
            else
           {
                alert('Data Saved Successfully');
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
    //$.ajax({
    //    url: "/Bank/List",
    //    type: "GET",
    //    contentType: "application/json;charset=utf-8",
    //    dataType: "json",
    //    success: function (result) {
    //        var html = '';

    //        $.each(result, function (key, item) {
    //            html += '<tr>';
    //            html += '<td style="visibility:hidden;">' + item.Bankid + '</td>';
    //            html += '<td>' + item.BankName + '</td>';
    //            html += '<td>' + item.Address1 + ',' + item.Address2 + ',' + item.Address3 + '</td>';
    //            html += '<td>' + item.CityName + '</td>';
    //            html += '<td>' + item.IsActive + '</td>';
    //            html += '<td><a href="#" onclick="return getbyID(' + item.Bankid + ')">Edit</a> | <a href="#" onclick="Delele(' + item.Bankid + ')">Delete</a></td>';
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
        url: '/Bank/List/',
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
                         { title: "Bank ID", "visible": false },
                         { title: "Bank" },
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

//Function for getting the Data Based upon Bank ID
function getbyID(BankId) {
    debugger;
    $('#ddlcity').empty();
    LoadCityDDL("#ddlcity");

    $('#ddlcountry').empty();
    LoadCountryDDL("#ddlcountry");

    $('#BankID').css('border-color', 'lightgrey');
    $('#add1').css('border-color', 'lightgrey');
    $('#add2').css('border-color', 'lightgrey');
    $('#add3').css('border-color', 'lightgrey');
    $('#ddlcity').css('border-color', 'lightgrey');
    $('#ddlcountry').css('border-color', 'lightgrey');
    $('#Name').css('border-color', 'lightgrey');
    $('#zipcode').css('border-color', 'lightgrey');    
    $('#lookup').css('border-color', 'lightgrey');
    $('#mobileno').css('border-color', 'lightgrey');
    $('#email').css('border-color', 'lightgrey');
    $('#fax').css('border-color', 'lightgrey');
    $('#telex').css('border-color', 'lightgrey');   
    $('#shortcode').css('border-color', 'lightgrey');
    $('#shiftno').css('border-color', 'lightgrey');
    $('#contactname').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');

    $.ajax({
        url: "/Bank/getbyID/" + BankId,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;   
            $('#BankID').val(obj.BankId);
            $('#add1').val(obj.Address1);
            $('#add2').val(obj.Address2);
            $('#add3').val(obj.Address3);
            $('#ddlcity').val(obj.CityId);
            $('#ddlcountry').val(obj.CountryId);
            $('#Name').val(obj.BankName);
            $('#zipcode').val(obj.Zipcode);
            $('#lookup').val(obj.BankLookup);
            $('#mobileno').val(obj.MobNum);
            $('#email').val(obj.Email);
            $('#fax').val(obj.Fax);
            $('#telex').val(obj.Telex);
            $('#shortcode').val(obj.shortcode);
            $('#shiftno').val(obj.shiftno);
            $('#contactname').val(obj.ContactName);

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

function getViewbyID(BankId) {
    debugger;
    $('#ddlcity').empty();
    LoadCityDDL("#ddlcity");

    $('#ddlcountry').empty();
    LoadCountryDDL("#ddlcountry");

    $('#BankID').css('border-color', 'lightgrey');
    $('#add1').css('border-color', 'lightgrey');
    $('#add2').css('border-color', 'lightgrey');
    $('#add3').css('border-color', 'lightgrey');
    $('#ddlcity').css('border-color', 'lightgrey');
    $('#ddlcountry').css('border-color', 'lightgrey');
    $('#Name').css('border-color', 'lightgrey');
    $('#zipcode').css('border-color', 'lightgrey');
    $('#lookup').css('border-color', 'lightgrey');
    $('#mobileno').css('border-color', 'lightgrey');
    $('#email').css('border-color', 'lightgrey');
    $('#fax').css('border-color', 'lightgrey');
    $('#telex').css('border-color', 'lightgrey');
    $('#shortcode').css('border-color', 'lightgrey');
    $('#shiftno').css('border-color', 'lightgrey');
    $('#contactname').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');

    $.ajax({
        url: "/Bank/getbyID/" + BankId,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            $('#BankID').val(obj.BankId);
            $('#add1').val(obj.Address1);
            $('#add2').val(obj.Address2);
            $('#add3').val(obj.Address3);
            $('#ddlcity').val(obj.CityId);
            $('#ddlcountry').val(obj.CountryId);
            $('#Name').val(obj.BankName);
            $('#zipcode').val(obj.Zipcode);
            $('#lookup').val(obj.BankLookup);
            $('#mobileno').val(obj.MobNum);
            $('#email').val(obj.Email);
            $('#fax').val(obj.Fax);
            $('#telex').val(obj.Telex);
            $('#shortcode').val(obj.shortcode);
            $('#shiftno').val(obj.shiftno);
            $('#contactname').val(obj.ContactName);

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

//Function for clearing the textboxes
function clearTextBox() {

    $('#BankID').val("");
    $('#Name').val("");
    $('#add1').val("");
    $('#add2').val("");
    $('#add3').val("");
    $('#ddlcity').empty();
    $('#ddlcountry').empty();
    $('#zipcode').val("");
    $('#lookup').val("");
    $('#mobileno').val("");
    $('#email').val("");
    $('#fax').val("");
    $('#telex').val("");
    $('#contactname').val("");
    $('#shortcode').val("");
    $('#shiftno').val("");
    $('#Status').val("");

    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#BankID').css('border-color', 'lightgrey');
    $('#add1').css('border-color', 'lightgrey');
    $('#add2').css('border-color', 'lightgrey');
    $('#add3').css('border-color', 'lightgrey');
    $('#ddlcity').css('border-color', 'lightgrey');
    $('#ddlcountry').css('border-color', 'lightgrey');
    $('#Name').css('border-color', 'lightgrey');
    $('#zipcode').css('border-color', 'lightgrey');
    $('#lookup').css('border-color', 'lightgrey');
    $('#mobileno').css('border-color', 'lightgrey');
    $('#contactname').css('border-color', 'lightgrey');
    $('#email').css('border-color', 'lightgrey');
    $('#fax').css('border-color', 'lightgrey');
    $('#telex').css('border-color', 'lightgrey');
    $('#shortcode').css('border-color', 'lightgrey');
    $('#shiftno').css('border-color', 'lightgrey');    
    $('#Status').css('border-color', 'lightgrey');

   // $('#tbody').DataTable().destroy();

    LoadCityDDL("#ddlcity");
    LoadCountryDDL("#ddlcountry");
}

//function validateControls() {
//    debugger;
//    var valid = true;
//    $("#myModal input[required=true], #myModal textarea[required=true]").each(function () {
//        $(this).removeClass('invalid');
//        $(this).attr('title', '');
//        if (!$(this).val()) {
//            $(this).addClass('invalid');
//            $(this).attr('title', 'This field is required');
//            valid = false;
//        }
//        if ($(this).attr("type") == "email" && !$(this).val().match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)) {
//            $(this).addClass('invalid');
//            $(this).attr('title', 'Enter valid email');
//            valid = false;
//        }
//    });
//    return valid;
//}

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
    
    var EmailId = $("#email").val();
   
    if ($.trim(EmailId).length > 0) {
            if (validateEmailAddress(EmailId)) {
                $('#email').css('border-color', 'lightgrey');
            }
            else {
                alert('Invalid email address');
                $('#email').css('border-color', 'Red');
                isValid = false;

            }
        }
        else {
            $('#email').css('border-color', 'lightgrey');
        }
    
  

    return isValid;

    
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

    var BankObj = {
        BankId: $('#BankID').val(),
        BankName: $('#Name').val(),
        BankLookup: $('#lookup').val(),
        Address1: $('#add1').val(),
        Address2: $('#add2').val(),
        Address3: $('#add3').val(),
        CityId: $('#ddlcity').val(),
        CountryId: $('#ddlcountry').val(),
        Zipcode: $('#zipcode').val(),
        MobNum: $('#mobileno').val(),
        Email: $('#email').val(),
        Fax: $('#fax').val(),
        Telex: $('#telex').val(),
        shortcode: $('#shortcode').val(),
        shiftno: $('#shiftno').val(),
        ContactName:$('#contactname').val(),
        IsActive: ischecked,
    };
    LoadingSymb();
    $.ajax({
        url: "/Bank/Add",
        data: JSON.stringify(BankObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
           
            if (result.Value == 1) {
                $('#tbody').DataTable().destroy();
                loadData();
                $('#myModal').modal('hide');
                alert('Data Saved Successfully');
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
//function for updating Bank record
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

    var BankObj = {
        BankId: $('#BankID').val(),
        BankName: $('#Name').val(),
        BankLookup: $('#lookup').val(),
        Address1: $('#add1').val(),
        Address2: $('#add2').val(),
        Address3: $('#add3').val(),
        CityId: $('#ddlcity').val(),
        CountryId: $('#ddlcountry').val(),
        Zipcode: $('#zipcode').val(),
        MobNum: $('#mobileno').val(),
        Email: $('#email').val(),
        Fax: $('#fax').val(),
        Telex: $('#telex').val(),
        shortcode: $('#shortcode').val(),
        shiftno: $('#shiftno').val(),
        ContactName: $('#contactname').val(),
        IsActive: ischecked,
    };
    LoadingSymb();
    $.ajax({
        url: "/Bank/Update",
        data: JSON.stringify(BankObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
           
            if (result.Value == 1) {
                $('#tbody').DataTable().destroy();
                $('#myModal').modal('hide');
                loadData();
                alert('Data Updated Successfully');
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

//function for deleting Bank record
function Delete(ID) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        LoadingSymb();
        $.ajax({
            url: "/Bank/Delete/" + ID,
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
}
