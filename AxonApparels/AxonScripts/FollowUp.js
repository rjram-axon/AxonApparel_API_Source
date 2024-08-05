/// <reference path="jquery-1.9.1.intellisense.js" />
//Load Data in Table when documents is ready
$(document).ready(function () {
    loadData();
});

//Load Data function
function loadData() {
    $.ajax({
        type: "GET",
        url: '/Followup/List/',
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
                columns: [
                         { title: "ID", "visible": false },
                         { title: "Company Name" },
                         { title: "Employee" },
                         { title: "Buyer" },
                         //{ title: "Status" },
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
    $('#txtfollowID').val("");
    $('#txtentry').val("");
    $('#Company').val("");
    $('#txtdate').val("");
    $('#Buyer').val("");
    $('#ddlenquiry').val("0");
    $('#Status').val("");
    $('#Employee').val("");
    $('#txtquotationno').val("");
    $('#txtstyle').val("");
    $('#txtquodate').val("");
    $('#txtaction').val("");
    $('#txttocontact').val("");
    $('#txtnextfollow').val("");
    $('#txtremarks').val("");

    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#txtfollowID').css('border-color', 'lightgrey');
    $('#txtentry').css('border-color', 'lightgrey');
    $('#Company').css('border-color', 'lightgrey');
    $('#txtdate').css('border-color', 'lightgrey');
    $('#Buyer').css('border-color', 'lightgrey');
    $('#ddlenquiry').css('border-color', 'lightgrey');
    $('#Employee').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $('#txtquotationno').css('border-color', 'lightgrey');
    $('#txtstyle').css('border-color', 'lightgrey');
    $('#txtquodate').css('border-color', 'lightgrey');
    $('#txtaction').css('border-color', 'lightgrey');
    $('#txttocontact').css('border-color', 'lightgrey');
    $('#txtnextfollow').css('border-color', 'lightgrey');
    $('#txtremarks').css('border-color', 'lightgrey');

    //Change city to Buyer once Buyer Controller Created
    LoadCityDDL("#Buyer");
    LoadCompanyDDL("#Company");
    LoadEmployeeDDL("#Employee");
    LoadEnquiryDDL("#ddlenquiry");

    $('#txtdate').val(moment(new Date()).format('DD/MM/YYYY'));
    $('#txtquodate').val(moment(new Date()).format('DD/MM/YYYY'));
    $('#txtnextfollow').val(moment(new Date()).format('DD/MM/YYYY'));
}

//Valdidation using jquery
function validate() {
    var isValid = true;
    if ($('#txtentry').val().trim() == "") {
        $('#txtentry').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtentry').css('border-color', 'lightgrey');
    }

    //groupdropdown = $('#ddlgroup');
    //if (groupdropdown.length == 0 || $(groupdropdown).val() == "") {
    //    $('#ddlgroup').css('border-color', 'Red');
    //    isValid = false;
    //}
    //else {
    //    $('#ddlgroup').css('border-color', 'lightgrey');
    //}
    return isValid;
}

//Function for getting the Data Based upon FollowUp ID
function getbyID(ItemID) {
    debugger;
    $('#Buyer').empty();
    $('#Company').empty();
    $('#Employee').empty();
    $('#ddlenquiry').empty();

    LoadCityDDL("#Buyer");
    LoadCompanyDDL("#Company");
    LoadEmployeeDDL("#Employee");
    LoadEnquiryDDL("#ddlenquiry");

    $('#txtfollowID').css('border-color', 'lightgrey');
    $('#txtentry').css('border-color', 'lightgrey');
    $('#Company').css('border-color', 'lightgrey');
    $('#txtdate').css('border-color', 'lightgrey');
    $('#Buyer').css('border-color', 'lightgrey');
    $('#ddlenquiry').css('border-color', 'lightgrey');
    $('#Employee').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $('#txtquotationno').css('border-color', 'lightgrey');
    $('#txtstyle').css('border-color', 'lightgrey');
    $('#txtquodate').css('border-color', 'lightgrey');
    $('#txtaction').css('border-color', 'lightgrey');
    $('#txttocontact').css('border-color', 'lightgrey');
    $('#txtnextfollow').css('border-color', 'lightgrey');
    $('#txtremarks').css('border-color', 'lightgrey');
    debugger;
    $.ajax({
        url: "/Followup/getbyID/" + ItemID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {
                $('#txtfollowID').val(obj.FollowId);
                $('#txtentry').val(obj.EntryNo);
                $('#Company').val(obj.CompanyId);
                $('#txtdate').val(moment(obj.FollowDate).format('DD/MM/YYYY'));
                $('#Buyer').val(obj.BuyerId);
                $('#ddlenquiry').val(obj.EnquiryId);
                $('#Employee').val(obj.EmployeeId);
                $('#Status').val(obj.Statusid);
                $('#txtquotationno').val(obj.QuotationNo);
                $('#txtstyle').val(obj.QuotationStyle);
                //$('#txtquodate').val(obj.QuoDate);
                $('#txtquodate').val(moment(obj.QuoDate).format('DD/MM/YYYY'));
                $('#txtaction').val(obj.Action);
                $('#txttocontact').val(obj.ToContact);
                //$('#txtnextfollow').val(obj.NextFollowDate);
                $('#txtnextfollow').val(moment(obj.NextFollowDate).format('DD/MM/YYYY'));
                $('#txtremarks').val(obj.Remarks);

                //if (result.IsActive == "Active") {
                //    $('#Status').prop("checked", true);
                //} else {
                //    $('#Status').prop("checked", false);
                //}

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

function getViewbyID(ItemID) {
    debugger;
    $('#Buyer').empty();
    $('#Company').empty();
    $('#Employee').empty();
    $('#ddlenquiry').empty();

    LoadCityDDL("#Buyer");
    LoadCompanyDDL("#Company");
    LoadEmployeeDDL("#Employee");
    LoadEnquiryDDL("#ddlenquiry");

    $('#txtfollowID').css('border-color', 'lightgrey');
    $('#txtentry').css('border-color', 'lightgrey');
    $('#Company').css('border-color', 'lightgrey');
    $('#txtdate').css('border-color', 'lightgrey');
    $('#Buyer').css('border-color', 'lightgrey');
    $('#ddlenquiry').css('border-color', 'lightgrey');
    $('#Employee').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $('#txtquotationno').css('border-color', 'lightgrey');
    $('#txtstyle').css('border-color', 'lightgrey');
    $('#txtquodate').css('border-color', 'lightgrey');
    $('#txtaction').css('border-color', 'lightgrey');
    $('#txttocontact').css('border-color', 'lightgrey');
    $('#txtnextfollow').css('border-color', 'lightgrey');
    $('#txtremarks').css('border-color', 'lightgrey');
    debugger;
    $.ajax({
        url: "/Followup/getbyID/" + ItemID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {
                $('#txtfollowID').val(obj.FollowId);
                $('#txtentry').val(obj.EntryNo);
                $('#Company').val(obj.CompanyId);
                $('#txtdate').val(moment(obj.FollowDate).format('DD/MM/YYYY'));
                $('#Buyer').val(obj.BuyerId);
                $('#ddlenquiry').val(obj.EnquiryId);
                $('#Employee').val(obj.EmployeeId);
                $('#Status').val(obj.Statusid);
                $('#txtquotationno').val(obj.QuotationNo);
                $('#txtstyle').val(obj.QuotationStyle);
                //$('#txtquodate').val(obj.QuoDate);
                $('#txtquodate').val(moment(obj.QuoDate).format('DD/MM/YYYY'));
                $('#txtaction').val(obj.Action);
                $('#txttocontact').val(obj.ToContact);
                //$('#txtnextfollow').val(obj.NextFollowDate);
                $('#txtnextfollow').val(moment(obj.NextFollowDate).format('DD/MM/YYYY'));
                $('#txtremarks').val(obj.Remarks);

                //if (result.IsActive == "Active") {
                //    $('#Status').prop("checked", true);
                //} else {
                //    $('#Status').prop("checked", false);
                //}

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

//function dateTimeReviver(key, value) {
//    var a;
//    if (typeof value === 'string') {
//        a = /\/Date\((\d*)\)\//.exec(value);
//        if (a) {
//            return new Date(+a[1]);
//        }
//    }
//    return value;
//}

//Add Data Function 
function Add() {
    var res = validate();
    if (res == false) {
        return false;
    }

    var today = new Date();
    debugger;
    var checkbox_value = "";
    $(":checkbox").each(function () {
        var ischecked = $('#Status').is(":checked");
        if (ischecked) {
            checkbox_value += "on";
        }
        else {
            checkbox_value += "off";
        }
    });

    var ItemObj = {
        EntryNo: $('#txtentry').val(),
        CompanyId: $('#Company').val(),
        FollowDate: $('#txtdate').val(),
        BuyerId: $('#Buyer').val(),
        Enquiryid: $('#ddlenquiry').val(),
        EmployeeId: $('#Employee').val(),
        QuotationNo: $('#txtquotationno').val(),
        Statusid: $('#Status').val(),
        QuotationStyle: $('#txtstyle').val(),
        QuoDate: $('#txtquodate').val(),
        Action: $('#txtaction').val(),
        ToContact: $('#txttocontact').val(),
        NextFollowDate: $('#txtnextfollow').val(),
        Remarks: $('#txtremarks').val(),
        //IsActive: checkbox_value,
    };
    debugger;
    //$("#btnAdd").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/Followup/Add",
        data: JSON.stringify(ItemObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#tbody').DataTable().destroy();
            loadData();
            $('#myModal').modal('hide');
            clearTextBox();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//function for updating Followup record
function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var checkbox_value = "";
    $(":checkbox").each(function () {
        var ischecked = $('#Status').is(":checked");
        if (ischecked) {
            checkbox_value += "on";
        }
        else {
            checkbox_value += "off";
        }
    });

    var ItemObj = {
        FollowId: $('#txtfollowID').val(),
        EntryNo: $('#txtentry').val(),
        CompanyId: $('#Company').val(),
        //FollowDate: new Date($('#txtdate').val()),
        FollowDate: $('#txtdate').val(),
        BuyerId: $('#Buyer').val(),
        Enquiryid: $('#ddlenquiry').val(),
        EmployeeId: $('#Employee').val(),
        QuotationNo: $('#txtquotationno').val(),
        Statusid: $('#Status').val(),
        QuotationStyle: $('#txtstyle').val(),
        //QuoDate: new Date($('#txtquodate').val()),
        QuoDate: $('#txtquodate').val(),
        Action: $('#txtaction').val(),
        ToContact: $('#txttocontact').val(),
        //NextFollowDate: new Date($('#txtnextfollow').val()),
        NextFollowDate: $('#txtnextfollow').val(),
        Remarks: $('#txtremarks').val(),
        //IsActive: checkbox_value,
    };
    //$("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/Followup/Update",
        data: JSON.stringify(ItemObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#myModal').modal('hide');
            $('#tbody').DataTable().destroy();
            loadData();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//function for deleting Followup record
function Delele(ID) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        LoadingSymb();
        $.ajax({
            url: "/Followup/Delete/" + ID,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                $('#tbody').DataTable().destroy();
                loadData();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

