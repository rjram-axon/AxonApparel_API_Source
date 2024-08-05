/// <reference path="jquery-1.9.1.intellisense.js" />
//Load Data in Table when documents is ready
var CItemList = [];
$(document).ready(function () {

    LoadCityDDL("#ddlcity");
    loadData();

    LoadShipmodeDDL("#ddlshipment");
    LoadShipsystemDDL("#ddlsystem");
    LoadPayTermsDDL("#ddlPayment");
    LoadEmployeeDDL("#ddlManager,#ddlMerch");
    LoadCurrencyDDL("#ddlcurrency");
    LoadCountryDDL("#ddlPorddest");
    LoadPortOfLoadingDDL("#ddlPordload");

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


        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });

}

//Load Data function
function loadData() {
    debugger;
    //  $.ajax({
    //      url: "/Buyer/List",
    //type: "GET",
    //contentType: "application/json;charset=utf-8",
    //dataType: "json",
    //success: function (result) {
    //    var html = '';

    //    $.each(result, function (key, item) {
    //        html += '<tr>';
    //        html += '<td style="visibility:hidden;">' + item.BuyerId + '</td>';
    //        html += '<td>' + item.BuyerName + '</td>';
    //        html += '<td>' + item.Address1 + ',' + item.Address2 + ',' + item.Address3 + '</td>';
    //        html += '<td>' + item.CityName + '</td>';
    //        html += '<td>' + item.IsActive + '</td>';
    //        html += '<td><a href="#" onclick="return getbyID(' + item.BuyerId + ')">Edit</a> | <a href="#" onclick="Delele(' + item.BuyerId + ')">Delete</a></td>';
    //        html += '</tr>';
    //    });
    //    $('.tbody').html(html);
    //},
    //error: function (errormessage) {
    //    alert(errormessage.responseText);
    //}
    // });
    $.ajax({
        type: "GET",
        url: '/Buyer/List/',
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
                         { title: "Buyer ID", "visible": false },
                         { title: "Buyer" },
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
    debugger;
    $('#BuyerID').val("");
    $('#Name').val("");
    $('#add1').val("");
    $('#add2').val("");
    $('#add3').val("");
    $('#ddlcity').empty();
    $('#zipcode').val("");
    $('#mobileno').val("");
    $('#Status').val("");
    $('#txtComm').val("");
    $('#txtBankInt').val("");

    $('#txtMarkPrice').val("");
    $('#txtDisMargin').val("");
    $('#txtAdminExp').val("");
    $('#txtCompMargin').val("");
    $('#txtDealerMargin').val("");

    $('#ddlcurrency').val(0).trigger('change'),
      $('#ddlsystem').val(0).trigger('change'),
     $('#ddlshipment').val(0).trigger('change'),
     $('#ddlPayment').val(0).trigger('change'),
      $('#ddlManager').val("").trigger('change'),
    $('#ddlMerch').val("").trigger('change'),
      $('#ddlPordload').val(0).trigger('change'),
     $('#ddlPorddest').val(0).trigger('change'),
     $('#txtAllowence').val(""),

    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#BuyerID').css('border-color', 'lightgrey');
    $('#add1').css('border-color', 'lightgrey');
    $('#add2').css('border-color', 'lightgrey');
    $('#add3').css('border-color', 'lightgrey');
    $('#ddlcity').css('border-color', 'lightgrey');
    $('#Name').css('border-color', 'lightgrey');
    $('#zipcode').css('border-color', 'lightgrey');
    $('#mobileno').css('border-color', 'lightgrey');

    $('#Status').css('border-color', 'lightgrey');
    //$('#tbody').DataTable().destroy();
    LoadCityDDL("#ddlcity");

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
        //    if (ischecked) {
        //        checkbox_value += "on";
        //    }
        //    else {
        //        checkbox_value += "off";
        //    }
    });

    var BuyerObj = {
        BuyerId: $('#BuyerID').val(),
        BuyerName: $('#Name').val(),
        Address1: $('#add1').val(),
        Address2: $('#add2').val(),
        Address3: $('#add3').val(),
        CityId: $('#ddlcity').val(),
        Mobile: $('#mobileno').val(),
        Zipcode: $('#zipcode').val(),
        ContPerson: $('#txtConPer').val(),
        Designation: $('#txtDes').val(),
        Phone: $('#txtPhone').val(),
        Email: $('#txtEmail').val(),
        LookUp: $('#txtLookup').val(),
        CountryId: $('#txtCountryId').val(),
        Commission: $('#txtComm').val(),
        BankInt: $('#txtBankInt').val(),

        MarkPrice: $('#txtMarkPrice').val(),
        DisMargin: $('#txtDisMargin').val(),
        AdminExp: $('#txtAdminExp').val(),
        CompMargin: $('#txtCompMargin').val(),
        DealerMargin: $('#txtDealerMargin').val(),

        Currency: $('#ddlcurrency').val(),
        System: $('#ddlsystem').val(),
        Shipment: $('#ddlshipment').val(),
        Paymode: $('#ddlPayment').val(),
        Manager: $('#ddlManager').val(),
        Merch: $('#ddlMerch').val(),
        PortLoad: $('#ddlPordload').val(),
        PortDestination: $('#ddlPorddest').val(),
        Allowence: $('#txtAllowence').val(),
        IsActive: ischecked,
    };
    $("#btnAdd").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/Buyer/Add",
        data: JSON.stringify(BuyerObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            //if (result.Value == 1) {
            //    $('#tbody').DataTable().destroy();

            //    loadData();
            //    $('#myModal').modal('hide');
            //    $('#BuyerID').val("");
            //    $('#Name').val("");
            //    $('#add1').val("");
            //    $('#add2').val("");
            //    $('#add3').val("");
            //    $('#ddlcity').empty();
            //    $('#zipcode').val("");
            //    $('#mobileno').val("");

            //    $('#txtConPer').val(""),
            //    $('#txtDes').val(""),
            //    $('#txtPhone').val(""),
            //    $('#txtEmail').val(""),
            //    $('#txtLookup').val(""),

            //    $('#Status').val("");
            //    alert('Data Saved Successfully');
            //}
            //else {
            //    window.location.href = "/Error/Index";
            //}

            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            }
            else if (result.Value == -1) {
                //alert('Given Buyer is Already Available...');
                var msg = 'Given Buyer is Already Available...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }
            else {
                AddUserEntryLog('Master', 'Buyer', 'ADD', $('#Name').val());

                $('#tbody').DataTable().destroy();

                loadData();
                $('#myModal').modal('hide');
                $('#BuyerID').val("");
                $('#Name').val("");
                $('#add1').val("");
                $('#add2').val("");
                $('#add3').val("");
                $('#ddlcity').empty();
                $('#zipcode').val("");
                $('#mobileno').val("");

                $('#txtConPer').val(""),
                $('#txtDes').val(""),
                $('#txtPhone').val(""),
                $('#txtEmail').val(""),
                $('#txtLookup').val(""),
                 $('#txtComm').val(""),
                 $('#txtBankInt').val(""),
                   $('#txtMarkPrice').val(""),
                 $('#txtDisMargin').val(""),
                 $('#txtAdminExp').val(""),
                 $('#txtCompMargin').val(""),
                 $('#txtDealerMargin').val(""),

               $('#ddlcurrency').val(0).trigger('change'),
                 $('#ddlsystem').val(0).trigger('change'),
                $('#ddlshipment').val(0).trigger('change'),
                $('#ddlPayment').val(0).trigger('change'),
                 $('#ddlManager').val("").trigger('change'),
               $('#ddlMerch').val("").trigger('change'),
                 $('#ddlPordload').val(0).trigger('change'),
                $('#ddlPorddest').val(0).trigger('change'),
                $('#txtAllowence').val(""),

                $('#Status').val("");
                //alert('Data Saved Successfully');
                var msg = 'Data Saved Successfully...';
                var flg = 1;
                var mode = 1;
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

    if ($('#txtLookup').val().trim() == "") {
        $('#txtLookup').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtLookup').css('border-color', 'lightgrey');
    }

    if ($('#ddlcity').val() == 0) {
        $('#ddlcity').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlcity').css('border-color', 'lightgrey');
    }

    if ($('#txtPhone').val() != "") {

        if ($('#txtPhone').val().trim() == "") {
            $('#txtPhone').css('border-color', 'Red');
            isValid = false;
        }
        else {
            $('#txtPhone').css('border-color', 'lightgrey');
        }
    }

    var a = $("#txtPhone").val();
    //var filter = /^\d{15}$/;
    if (a.length >= 15) {
        $('#txtPhone').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtPhone').css('border-color', 'lightgrey');
    }

    var z = $("#zipcode").val();
    if (z.length >= 8) {
        $('#zipcode').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#zipcode').css('border-color', 'lightgrey');
    }

    var email = $("#txtEmail").val();
    var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;

    if (email = ! "") {
        //if (testEmail.test(email)) {
        //    $('#txtEmail').css('border-color', 'lightgrey');
        //}
        //else {
        //    $('#txtEmail').css('border-color', 'Red');
        //    isValid = false;
        //}
    }
    return isValid;

}

//Function for getting the Data Based upon Buyer ID
function getbyID(BuyerID) {
    //$('#ddlcity').empty();
    LoadCityDDL("#ddlcity");
    debugger;
    $('#Name').css('border-color', 'lightgrey');
    $('#add1').css('border-color', 'lightgrey');
    $('#add2').css('border-color', 'lightgrey');
    $('#add3').css('border-color', 'lightgrey');
    $('#ddlcity').css('border-color', 'lightgrey');
    $('#zipcode').css('border-color', 'lightgrey');
    $('#mobileno').css('border-color', 'lightgrey');

    $('#Status').css('border-color', 'lightgrey');

    $.ajax({
        url: "/Buyer/getbyID/" + BuyerID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            //  $('#tbody').DataTable().destroy();

            var obj = result.Value;
            $('#BuyerID').val(obj.BuyerId);
            $('#add1').val(obj.Address1);
            $('#add2').val(obj.Address2);
            $('#add3').val(obj.Address3);
            $('#ddlcity').val(obj.CityId);
            $('#Name').val(obj.BuyerName);
            $('#mobileno').val(obj.Mobile);
            $('#zipcode').val(obj.Zipcode);

            $('#txtConPer').val(obj.ContPerson);
            $('#txtDes').val(obj.Designation);
            $('#txtPhone').val(obj.Phone);
            $('#txtEmail').val(obj.Email);
            $('#txtLookup').val(obj.LookUp);
            $('#txtComm').val(obj.Commission);
            $('#txtBankInt').val(obj.BankInt);

            $('#txtMarkPrice').val(obj.MarkPrice);
            $('#txtDisMargin').val(obj.DisMargin);;
            $('#txtAdminExp').val(obj.AdminExp);
            $('#txtCompMargin').val(obj.CompMargin);
            $('#txtDealerMargin').val(obj.DealerMargin);

            $('#ddlcurrency').val(obj.Currency).trigger('change');
            $('#ddlsystem').val(obj.System).trigger('change');
            $('#ddlshipment').val(obj.Shipment).trigger('change');
            $('#ddlPayment').val(obj.Paymode).trigger('change');



            // $('#ddlMerch').val(obj.Merch).trigger('change');
            $('#ddlPordload').val(obj.PortLoad).trigger('change');
            $('#ddlPorddest').val(obj.PortDestination).trigger('change');
            $('#txtAllowence').val(obj.Allowence);

            if (obj.Manager == 0) {
                $('#ddlManager').val("").trigger('change');
            }
            else {
                $('#ddlManager').val(obj.Manager).trigger('change');
            }

            if (obj.Merch == 0) {
                $('#ddlMerch').val("").trigger('change');
            }
            else {
                $('#ddlMerch').val(obj.Merch).trigger('change');
            }
            LoadCountry();

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

function getViewbyID(BuyerID) {
    //$('#ddlcity').empty();
    LoadCityDDL("#ddlcity");
    debugger;
    $('#Name').css('border-color', 'lightgrey');
    $('#add1').css('border-color', 'lightgrey');
    $('#add2').css('border-color', 'lightgrey');
    $('#add3').css('border-color', 'lightgrey');
    $('#ddlcity').css('border-color', 'lightgrey');
    $('#zipcode').css('border-color', 'lightgrey');
    $('#mobileno').css('border-color', 'lightgrey');

    $('#Status').css('border-color', 'lightgrey');

    $.ajax({
        url: "/Buyer/getbyID/" + BuyerID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            //  $('#tbody').DataTable().destroy();

            var obj = result.Value;
            $('#BuyerID').val(obj.BuyerId);
            $('#add1').val(obj.Address1);
            $('#add2').val(obj.Address2);
            $('#add3').val(obj.Address3);
            $('#ddlcity').val(obj.CityId);
            $('#Name').val(obj.BuyerName);
            $('#mobileno').val(obj.Mobile);
            $('#zipcode').val(obj.Zipcode);

            $('#txtConPer').val(obj.ContPerson);
            $('#txtDes').val(obj.Designation);
            $('#txtPhone').val(obj.Phone);
            $('#txtEmail').val(obj.Email);
            $('#txtLookup').val(obj.LookUp);
            $('#txtComm').val(obj.Commission);
            $('#txtBankInt').val(obj.BankInt);

            $('#txtMarkPrice').val(obj.MarkPrice);
            $('#txtDisMargin').val(obj.DisMargin);;
            $('#txtAdminExp').val(obj.AdminExp);
            $('#txtCompMargin').val(obj.CompMargin);
            $('#txtDealerMargin').val(obj.DealerMargin);

            $('#ddlcurrency').val(obj.Currency).trigger('change');
            $('#ddlsystem').val(obj.System).trigger('change');
            $('#ddlshipment').val(obj.Shipment).trigger('change');
            $('#ddlPayment').val(obj.Paymode).trigger('change');



            // $('#ddlMerch').val(obj.Merch).trigger('change');
            $('#ddlPordload').val(obj.PortLoad).trigger('change');
            $('#ddlPorddest').val(obj.PortDestination).trigger('change');
            $('#txtAllowence').val(obj.Allowence);

            if (obj.Manager == 0) {
                $('#ddlManager').val("").trigger('change');
            }
            else {
                $('#ddlManager').val(obj.Manager).trigger('change');
            }

            if (obj.Merch == 0) {
                $('#ddlMerch').val("").trigger('change');
            }
            else {
                $('#ddlMerch').val(obj.Merch).trigger('change');
            }
            LoadCountry();

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

//function for updating Buyer record
function Update() {
    debugger;
    var ischecked = false;
    var res = validate();
    if (res == false) {
        return false;
    }

    debugger;
    var checkbox_value = "";
    $(":checkbox").each(function () {
        ischecked = $('#Status').is(":checked");
        //    if (ischecked) {
        //        checkbox_value += "on";
        //    }
        //    else {
        //        checkbox_value += "off";
        //    }
    });


    var buyerObj = {
        BuyerId: $('#BuyerID').val(),
        BuyerName: $('#Name').val(),
        Address1: $('#add1').val(),
        Address2: $('#add2').val(),
        Address3: $('#add3').val(),
        CityId: $('#ddlcity').val(),
        CountryId: $('#txtCountryId').val(),
        Mobile: $('#mobileno').val(),
        Zipcode: $('#zipcode').val(),
        ContPerson: $('#txtConPer').val(),
        Designation: $('#txtDes').val(),
        Phone: $('#txtPhone').val(),
        Email: $('#txtEmail').val(),
        LookUp: $('#txtLookup').val(),
        Commission: $('#txtComm').val(),
        BankInt: $('#txtBankInt').val(),
        IsActive: ischecked,
        MarkPrice: $('#txtMarkPrice').val(),
        DisMargin: $('#txtDisMargin').val(),
        AdminExp: $('#txtAdminExp').val(),
        CompMargin: $('#txtCompMargin').val(),
        DealerMargin: $('#txtDealerMargin').val(),
        Currency: $('#ddlcurrency').val(),
        System: $('#ddlsystem').val(),
        Shipment: $('#ddlshipment').val(),
        Paymode: $('#ddlPayment').val(),
        Manager: $('#ddlManager').val(),
        Merch: $('#ddlMerch').val(),
        PortLoad: $('#ddlPordload').val(),
        PortDestination: $('#ddlPorddest').val(),
        Allowence: $('#txtAllowence').val(),
    };
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/Buyer/Update",
        data: JSON.stringify(buyerObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {


            if (result.Status == 'SUCCESS') {
                AddUserEntryLog('Master', 'Buyer', 'UPDATE', $('#Name').val());

                $('#tbody').DataTable().destroy();

                $('#myModal').modal('hide');
                loadData();
                //$('#BuyerID').val("");
                $('#Name').val("");
                $('#add1').val("");
                $('#add2').val("");
                $('#add3').val("");
                $('#ddlcity').val("");
                $('#mobileno').val("");
                $('#zipcode').val("");
                $('#Status').val("");

                $('#txtConPer').val("");
                $('#txtDes').val("");
                $('#txtPhone').val("");
                $('#txtEmail').val("");
                $('#txtLookup').val("");
                $('#txtComm').val("");
                $('#txtBankInt').val("");
                $('#txtMarkPrice').val("");
                $('#txtDisMargin').val("");
                $('#txtAdminExp').val("");
                $('#txtCompMargin').val("");
                $('#txtDealerMargin').val("");

                $('#ddlcurrency').val(0).trigger('change');
                $('#ddlsystem').val(0).trigger('change');
                $('#ddlshipment').val(0).trigger('change');
                $('#ddlPayment').val(0).trigger('change');
                $('#ddlManager').val(0).trigger('change');
                $('#ddlMerch').val(0).trigger('change');
                $('#ddlPordload').val(0).trigger('change');
                $('#ddlPorddest').val(0).trigger('change');
                $('#txtAllowence').val("");

                
                //alert('Data Updated Successfully');
                var msg = 'Data Updated Successfully...';
                var flg = 1;
                var mode = 0;
                AlartMessage(msg, flg, mode);
                $("#btnUpdate").attr("disabled", false);
            }
            else if (result.Status == 'EXISTS') {
                //alert('Given Buyer is Already Available...');
                var msg = 'Given Buyer is Already Available...';
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


//function for deleting Buyer record
function Delete(ID) {
    //var ans = confirm("Are you sure you want to delete this Record?");
    //if (ans) {
    //    $.ajax({
    //        url: "/Buyer/Delete/" + ID,
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
        url: "/Buyer/getbyID/" + ID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            $('#Name').val(obj.BuyerName);
            CheckBuyerAlloted(ID);

        },
        error: function (errormessage) {
            alert('delet failed..');
        }
    });
    
}



function CheckBuyerAlloted(ID) {

    $.ajax({
        url: "/Buyer/GetBuyerRefDetails",
        data: JSON.stringify({ BuyerId: ID }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            CItemList = result;
            if (CItemList.length > 0) {

                for (var x = 0; x < CItemList.length; x++) {

                    var c = CItemList[x].CountBuyerId;

                    if (c > 0) {
                        //alert("Buyer Is Alloted For Some Other Entry,Please Check it....");
                        var msg = 'Buyer Is Alloted For Some Other Entry,Please Check it...';
                        var flg = 4;
                        var mode = 1;
                        AlartMessage(msg, flg, mode);
                    }
                    else {
                        var ans = confirm("Are you sure you want to delete this Record?");
                        if (ans) {
                            $.ajax({
                                url: "/Buyer/Delete/" + ID,
                                type: "POST",
                                contentType: "application/json;charset=UTF-8",
                                dataType: "json",
                                success: function (result) {

                                    if (result.Value == 1) {
                                        $('#tbody').DataTable().destroy();
                                        AddUserEntryLog('Master', 'Buyer', 'DELETE', $('#Name').val());
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

////////////////Validate the TextBox////////////////////

//function ValPhone(PhNo) {
//    var phoneno = /^\d{10}$/;
//    if (PhNo.value.match(phoneno)) {
//        return true;
//    }
//    else {
//        alert("Not a valid Phone Number");
//        return false;
//    }


//}

function PhValidate() {
    var mobile = document.getElementById("txtPhone").value;
    var pattern = /^\d{10}$/;
    if (pattern.test(mobile)) {
        //alert("Your mobile number : " + mobile);

        return true;
    }
    //alert("It is not valid mobile number.input 10 digits number!");
    var msg = 'It is not valid mobile number.input 10 digits number..!';
    var flg = 4;
    var mode = 1;
    AlartMessage(msg, flg, mode);
    $('#txtPhone').val("");
    $('#txtPhone').focus();
    return false;
}
///////////////////////////////////////////////////////