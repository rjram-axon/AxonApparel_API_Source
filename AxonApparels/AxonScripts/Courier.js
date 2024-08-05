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
            else {

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
//Load Data function
function loadData() {
    ////$.ajax({
    ////    url: "/Courier/List",
    ////    type: "GET",
    ////    contentType: "application/json;charset=utf-8",
    ////    dataType: "json",
    ////    success: function (result) {
    ////        var html = '';

    ////        $.each(result, function (key, item) {
    ////            html += '<tr>';
    ////            html += '<td style="visibility:hidden;">' + item.CourierId + '</td>';
    ////            html += '<td>' + item.CourierName + '</td>';
    ////            html += '<td>' + item.CourierAddress + '</td>';
    ////            html += '<td>' + item.CountryName + '</td>';
    ////            html += '<td>' + item.IsActive + '</td>';
    ////            html += '<td><a href="#" onclick="return getbyID(' + item.CourierId + ')">Edit</a> | <a href="#" onclick="Delele(' + item.CourierId + ')">Delete</a></td>';
    ////            html += '</tr>';
    ////        });
    ////        $('.tbody').html(html);
    ////    },
    ////    error: function (errormessage) {
    ////        alert(errormessage.responseText);
    ////    }
    ////});
    $.ajax({
        type: "GET",
        url: '/Courier/List/',
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
                         { title: "Courier Id", "visible": false },
                         { title: "Courier" },
                         { title: "Courier Address" },
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
    $('#CourierID').val("");
    $('#Name').val("");
    $('#add').val("");
    $('#fax').val("");
    $('#phone').val("");
    $('#ddlcountry').empty();
    $('#email').val("");
    $('#Status').val("");
    $('#url').val("");

    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#CourierID').css('border-color', 'lightgrey');
    $('#add').css('border-color', 'lightgrey');
    $('#fax').css('border-color', 'lightgrey');
    $('#phone').css('border-color', 'lightgrey');
    $('#ddlcountry').css('border-color', 'lightgrey');
    $('#Name').css('border-color', 'lightgrey');
    $('#email').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $('#url').css('border-color', 'lightgrey');
    //$('#tbody').DataTable().destroy();

    LoadCountryDDL("#ddlcountry");

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

    if ($('#ddlcountry').val() == 0) {
        $('#ddlcountry').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlcountry').css('border-color', 'lightgrey');
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



//Function for getting the Data Based upon Courier ID
function getbyID(CourierID) {
    debugger;
    $('#ddlcountry').empty();
    LoadCountryDDL("#ddlcountry");

    $('#Status').css('border-color', 'lightgrey');
    $('#CourierID').css('border-color', 'lightgrey');
    $('#add').css('border-color', 'lightgrey');
    $('#fax').css('border-color', 'lightgrey');
    $('#phone').css('border-color', 'lightgrey');
    $('#ddlcountry').css('border-color', 'lightgrey');
    $('#Name').css('border-color', 'lightgrey');
    $('#email').css('border-color', 'lightgrey');
    $('#url').css('border-color', 'lightgrey');

    $.ajax({
        url: "/Courier/getbyID/" + CourierID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            $('#CourierID').val(obj.CourierId);
            $('#add').val(obj.CourierAddress);
            $('#fax').val(obj.Fax);
            $('#phone').val(obj.Phone);
            $('#ddlcountry').val(obj.CountryId);
            $('#Name').val(obj.CourierName);
            $('#email').val(obj.Email);
            $('#url').val(obj.URL);

            if (obj.IsActive == "TRUE") {
                $('#Status').prop("checked", true);
            } else {
                $('#Status').prop("checked", false);
            }

            $('#myModal').modal('show');
           // $('#tbody').DataTable().destroy();

            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

function getViewbyID(CourierID) {
    debugger;
    $('#ddlcountry').empty();
    LoadCountryDDL("#ddlcountry");

    $('#Status').css('border-color', 'lightgrey');
    $('#CourierID').css('border-color', 'lightgrey');
    $('#add').css('border-color', 'lightgrey');
    $('#fax').css('border-color', 'lightgrey');
    $('#phone').css('border-color', 'lightgrey');
    $('#ddlcountry').css('border-color', 'lightgrey');
    $('#Name').css('border-color', 'lightgrey');
    $('#email').css('border-color', 'lightgrey');
    $('#url').css('border-color', 'lightgrey');

    $.ajax({
        url: "/Courier/getbyID/" + CourierID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            $('#CourierID').val(obj.CourierId);
            $('#add').val(obj.CourierAddress);
            $('#fax').val(obj.Fax);
            $('#phone').val(obj.Phone);
            $('#ddlcountry').val(obj.CountryId);
            $('#Name').val(obj.CourierName);
            $('#email').val(obj.Email);
            $('#url').val(obj.URL);

            if (obj.IsActive == "TRUE") {
                $('#Status').prop("checked", true);
            } else {
                $('#Status').prop("checked", false);
            }

            $('#myModal').modal('show');
            // $('#tbody').DataTable().destroy();

            $('#btnUpdate').hide();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
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

    var CourierObj = {
        CourierId: $('#CourierID').val(),
        CourierName: $('#Name').val(),
        CourierAddress: $('#add').val(),
        Fax: $('#fax').val(),
        Phone: $('#phone').val(),
        CountryId: $('#ddlcountry').val(),
        Email: $('#email').val(),
        IsActive: $('#Status').val(),
        URL: $('#url').val(),
        IsActive: ischecked,
    };
    LoadingSymb();
    $.ajax({
        url: "/Courier/Add",
        data: JSON.stringify(CourierObj),
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
                alert('Data Saved Successfully');
            }
            //clearTextBox();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//function for updating Courier record
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

    var CourierObj = {
        CourierId: $('#CourierID').val(),
        CourierName: $('#Name').val(),
        CourierAddress: $('#add').val(),
        Fax: $('#fax').val(),
        Phone: $('#phone').val(),
        CountryId: $('#ddlcountry').val(),
        Email: $('#email').val(),
        IsActive: $('#Status').val(),
        URL: $('#url').val(),
        IsActive: ischecked,
    };
    LoadingSymb();
    $.ajax({
        url: "/Courier/Update",
        data: JSON.stringify(CourierObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
           
            if (result.Value == 1) {
                $('#tbody').DataTable().destroy();
                $('#myModal').modal('hide');

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

//function for deleting Courier record
function Delete(ID) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        LoadingSymb();
        $.ajax({
            url: "/Courier/Delete/" + ID,
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