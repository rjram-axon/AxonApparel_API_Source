/// <reference path="jquery-1.9.1.intellisense.js" />
//Load Data in Table when documents is ready
var CItemList = [];
$(document).ready(function () {
    LoadCityDDL("#ddlCity");
    LoadCompanyDDL("#ddlCompany");
    loadData();

    $('#ddltounit').val('0');

    $(document).on('click', '.btnaddcity', function () {
        debugger;
        LoadCountryDDL("#ddlCoun");
        $('#txtCityID').val(""),
    $('#txtcitName').val(""),
   $('#ddlCountry').val(),
   $('#Statuscit').val(""),
        $("#myModal3").modal('show');

    });
    $(document).on('click', '.btnaddcompany', function () {
        debugger;

        LoadCityDDL("#ddlcity");
        LoadCountryDDL("#ddlcountry");
        $('#CompanyId').val("");
        $('#Name').val("");
        $('#lookup').val("");
        $('#zipcode').val("");
        $('#email').val("");
        $('#fax').val("");
        $('#cstno').val("");
        $('#cstdate').val("");
        $('#tinno').val("");
        $('#tindate').val("");
        $('#contactname').val("");
        $('#mobno').val("");
        $('#add1').val("");
        $('#add2').val("");
        $('#add3').val("");
        $('#ddlcity').empty();
        $('#ddlcountry').empty();
        $('#zipcode').val("");
        $('#Status').val("");
        $('#telex').val("");
        $('#rbicode').val("");
        $('#iecode').val("");
        $('#prefix').val("");
        $('#aepcno').val("");
        $('#aepcdate').val("");
        $('#logoname').val("");
        $('#eanno').val("");
        $('#iecno').val("");
        $('#rcmcno').val("");
        $('#tngstno').val("");
        $('#range').val("");
        $('#division').val("");
        $("#myModal2").modal('show');

    });
});

function Addcompany() {
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

    var CompanyObj = {
        CompanyId: $('#CompanyId').val(),
        CompanyName: $('#Name').val(),
        Address1: $('#add1').val(),
        Address2: $('#add2').val(),
        Address3: $('#add3').val(),
        CityId: $('#ddlcity').val(),
        CountryId: $('#ddlcountry').val(),
        Zipcode: $('#zipcode').val(),
        Fax: $('#fax').val(),
        Status: $('#Status').val(),
        Email: $('#email').val(),
        cstno: $('#cstno').val(),
        //new Date($('#txtdate').val())
        cstdate: new Date($('#cstdate').val()),
        TinNo: $('#tinno').val(),
        TinDate: new Date($('#tindate').val()),
        ContactName: $('#contactname').val(),
        MobNo: $('#mobno').val(),
        Complookup: $('#lookup').val(),
        Fax: $('#fax').val(),
        Telex: $('#telex').val(),
        Rbi_code_num: $('#rbicode').val(),
        Prefix: $('#prefix').val(),
        LogoName: $('#logoname').val(),
        RCMC_No: $('#rcmcno').val(),
        EAN_No: $('#eanno').val(),
        Range: $('#range').val(),
        Division: $('#division').val(),
        AEPC_No: $('#aepcno').val(),
        AEPC_Date: new Date($('#aepcdate').val()),
        IEC_No: $('#iecno').val(),
        IE_code: $('#iecode').val(),
        TNGST_No: $('#tngstno').val(),
        IsActive: ischecked,

    };
    LoadingSymb();
    $.ajax({
        url: "/Company/Add",
        data: JSON.stringify(CompanyObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == 0) {
                window.location.href = "/Error/Index";

            }
            else if (result.Value == -1) {
                //alert('Given Company is Already Available...');
                var msg = 'Given Company is Already Available...';
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
                LoadCompanyDDL("#ddlCompany");
            }

            //clearTextBox();
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
                LoadCityDDL("#ddlCity");

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
    $.ajax({
        type: "GET",
        url: '/CompanyUnit/List/',
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
                         { title: "Company Unit" },
                         { title: "Company Unit LookUp" },
                         { title: "Address" },
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
    $('#txtCompID').val("");
    $('#txtName').val("");
    $('#ddlCompany').empty();
    $('#txtlookup').val("");
    $('#txtaddress1').val("");
    $('#txtaddress2').val("");
    $('#txtaddress3').val("");
    $('#ddlCity').empty();
    $('#txtzipcode').val("");
   // $('#ddltounit').val("");
    $('#Status').val("");
    $('#txtWastCut').val("");
    $('#txtWastPro').val("");
    $('#txtOfficeExp').val("");
    $('#txtOrderOverHead').val("");
    $('#txtQuoteOverHead').val("");

    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#txtCompID').css('border-color', 'lightgrey');
    $('#ddlCompany').css('border-color', 'lightgrey');
    $('#ddlCity').css('border-color', 'lightgrey');
    $('#txtlookup').css('border-color', 'lightgrey');
    $('#txtaddress1').css('border-color', 'lightgrey');
    $('#txtaddress2').css('border-color', 'lightgrey');
    $('#txtaddress3').css('border-color', 'lightgrey');
    $('#Name').css('border-color', 'lightgrey');
    $('#txtzipcode').css('border-color', 'lightgrey');
    $('#ddltounit').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');

    LoadCityDDL("#ddlCity");
    LoadCompanyDDL("#ddlCompany");
}

function getbyID(ID) {
    debugger;
    //$('#ddlCity').empty();
    //LoadCityDDL("#ddlCity");

    //$('#ddlCompany').empty();
    //LoadCompanyDDL("#ddlCompany");
    
   
   $('#txtName').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $.ajax({
        url: "/CompanyUnit/getbyID/" + ID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Value == 0) {
                //alert('Data Already Available')
                var msg = 'Data Already Available...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
            }
            else {
                var obj = result.Value;
                if (result.Status == 'SUCCESS') {
                    $('#txtCompID').val(obj.Id);
                    $('#txtName').val(obj.CompanyUnitName);
                    $('#ddlCompany').val(obj.CompanyId).trigger('change');
                      
                    $('#txtlookup').val(obj.CompanyUnitLookup);
                    $('#txtaddress1').val(obj.Address1);
                    $('#txtaddress2').val(obj.Address2);
                    $('#txtaddress3').val(obj.Address3);
                    $('#ddlCity').val(obj.CityId);
                    $('#txtzipcode').val(obj.ZipCode);
                    $('#ddltounit').val(obj.IssueType);
                    $('#txtWastCut').val(obj.WastageCut);
                    $('#txtWastPro').val(obj.WastagePro);
                    $('#txtOfficeExp').val(obj.OfficeExp);
                    $('#txtOrderOverHead').val(obj.OrderOverHead);
                    $('#txtQuoteOverHead').val(obj.QuoteOverHead);

                    if (obj.IsActive == "TRUE") {
                        $('#Status').prop("checked", true);
                    } else {
                        $('#Status').prop("checked", false);
                    }
                    $('#myModal').modal('show');
                    // $('#tbody').DataTable().destroy();

                    $('#btnUpdate').show();
                    $('#btnAdd').hide();
                }
                else {

                }
            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

function getViewbyID(ID) {
    debugger;
  

    $('#txtName').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $.ajax({
        url: "/CompanyUnit/getbyID/" + ID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Value == 0) {
                //alert('Data Already Available')
                var msg = 'Data Already Available...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
            }
            else {
                var obj = result.Value;
                if (result.Status == 'SUCCESS') {
                    $('#txtCompID').val(obj.Id);
                    $('#txtName').val(obj.CompanyUnitName);
                    $('#ddlCompany').val(obj.CompanyId).trigger('change');

                    $('#txtlookup').val(obj.CompanyUnitLookup);
                    $('#txtaddress1').val(obj.Address1);
                    $('#txtaddress2').val(obj.Address2);
                    $('#txtaddress3').val(obj.Address3);
                    $('#ddlCity').val(obj.CityId);
                    $('#txtzipcode').val(obj.ZipCode);
                    $('#ddltounit').val(obj.IssueType);
                    $('#txtWastCut').val(obj.WastageCut);
                    $('#txtWastPro').val(obj.WastagePro);
                    $('#txtOfficeExp').val(obj.OfficeExp);
                    $('#txtOrderOverHead').val(obj.OrderOverHead);
                    $('#txtQuoteOverHead').val(obj.QuoteOverHead);

                    if (obj.IsActive == "TRUE") {
                        $('#Status').prop("checked", true);
                    } else {
                        $('#Status').prop("checked", false);
                    }
                    $('#myModal').modal('show');
                    // $('#tbody').DataTable().destroy();

                    $('#btnUpdate').hide();
                    $('#btnAdd').hide();
                }
                else {

                }
            }
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
    var ischecked = "False";
    $(":checkbox").each(function () {
        ischecked = $('#Status').is(":checked");
        
    });
    debugger;
    var CompanyUnitObj = {
        Id: $('#txtCompID').val(),
        CompanyUnitName: $('#txtName').val(),
        CompanyUnitLookup: $('#txtlookup').val(),
        Address1: $('#txtaddress1').val(),
        Address2: $('#txtaddress2').val(),
        Address3: $('#txtaddress3').val(),
        CityId: $('#ddlCity').val(),
        CompanyId:$('#ddlCompany').val(),
        ZipCode: $('#txtzipcode').val(),
        IssueType: $('#ddltounit').val(),
        WastageCut: $('#txtWastCut').val(),
        WastagePro: $('#txtWastPro').val(),
        OfficeExp: $('#txtOfficeExp').val(),
        OrderOverHead: $('#txtOrderOverHead').val(),
        QuoteOverHead: $('#txtQuoteOverHead').val(),
        IsActive: ischecked,
    };
    $("#btnAdd").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/CompanyUnit/Add",
        data: JSON.stringify(CompanyUnitObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            } else if (result.Value == -1) {
                //alert('Given CompanyUnit is Already Available...');
                var msg = 'Given CompanyUnit is Already Available...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }
            else {
                $('#tbody').DataTable().destroy();
                loadData();
                $('#myModal').modal('hide');
                //alert('Data Saved successfully');
                var msg = 'Data Saved successfully...';
                var flg = 1;
                var mode = 0;
                AlartMessage(msg, flg, mode);
                AddUserEntryLog('Master', 'Company Unit', 'ADD', $('#txtName').val());
                $("#btnAdd").attr("disabled", false);
            }
            //clearTextBox();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Valdidation using jquery
function validate() {
    var isValid = true;
    if ($('#txtName').val().trim() == "") {
        $('#txtName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtName').css('border-color', 'lightgrey');
    }


    if ($('#ddltounit').val() == 0) {
        $('#ddltounit').siblings(".select2-container").css('border', '1px solid red');
        isValid = false;
    }
    else {
        $('#ddltounit').siblings(".select2-container").css('border', '1px solid lightgrey');
    }


    if ($('#ddlCompany').val() == 0) {
        $('#ddlCompany').siblings(".select2-container").css('border', '1px solid red');
        isValid = false;
    }
    else {
        $('#ddlCompany').siblings(".select2-container").css('border', '1px solid lightgrey');
    }
    if ($('#ddlCity').val() == 0) {
        $('#ddlCity').siblings(".select2-container").css('border', '1px solid red');
        isValid = false;
    }
    else {
        $('#ddlCity').siblings(".select2-container").css('border', '1px solid lightgrey');
    }

    var z = $("#txtzipcode").val();
    if (z.length >= 8) {
        $('#txtzipcode').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtzipcode').css('border-color', 'lightgrey');
    }
    return isValid;

}

//function for updating Company Unit's record
function Update() {
    var ischecked = false;
    var res = validate();
    debugger;
    if (res == false) {
        return false;
    }
    var checkbox_value = "";
    $(":checkbox").each(function () {
        ischecked = $('#Status').is(":checked");
    });

    var CompanyUnitObj = {
        Id: $('#txtCompID').val(),
        CompanyUnitName: $('#txtName').val(),
        CompanyUnitLookup: $('#txtlookup').val(),
        Address1: $('#txtaddress1').val(),
        Address2: $('#txtaddress2').val(),
        Address3: $('#txtaddress3').val(),
        CityId: $('#ddlCity').val(),
        CompanyId: $('#ddlCompany').val(),
        ZipCode: $('#txtzipcode').val(),
        IssueType: $('#ddltounit').val(),
        WastageCut: $('#txtWastCut').val(),
        WastagePro: $('#txtWastPro').val(),
        OfficeExp: $('#txtOfficeExp').val(),
        OrderOverHead: $('#txtOrderOverHead').val(),
        QuoteOverHead: $('#txtQuoteOverHead').val(),
        IsActive: ischecked,
    };
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/CompanyUnit/Update",
        data: JSON.stringify(CompanyUnitObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
           
            if (result.Status == 'SUCCESS') {
                $('#tbody').DataTable().destroy();

                loadData();
                $('#myModal').modal('hide');
                $('#txtCompID').val("");
                $('#Name').val("");
                $('#Status').prop("checked", false);
                //alert('Data Updated successfully'); 
                var msg = 'Data Updated successfully...';
                var flg = 1;
                var mode = 0;
                AlartMessage(msg, flg, mode);
                AddUserEntryLog('Master', 'Company Unit', 'UPDATE', $('#txtName').val());
                $("#btnUpdate").attr("disabled", false);
            }
            else if (result.Status == 'EXISTS') {
                //alert('Given CompanyUnit is Already Available...');
                var msg = 'Given CompanyUnit is Already Available...';
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

//function for deleting Company unit's record
function Delete(ID) {
    //var ans = confirm("Are you sure you want to delete this Record?");
    //if (ans) {
    //    $.ajax({
    //        url: "/CompanyUnit/Delete/" + ID,
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
        url: "/CompanyUnit/getbyID/" + ID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            $('#txtName').val(obj.CompanyUnitName);
            CheckCompUnitAlloted(ID);
        },
        error: function (errormessage) {
        alert('delet failed..');
        }
    });
    
}

function CheckCompUnitAlloted(Id) {

    $.ajax({
        url: "/CompanyUnit/GetCompUnitRefDetails",
        data: JSON.stringify({ Id: Id }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            CItemList = result;
            if (CItemList.length > 0) {

                for (var x = 0; x < CItemList.length; x++) {

                    var c = CItemList[x].CountCompUnitId;

                    if (c > 0) {
                        //alert("CompanyUnit Is Alloted For Some Other Entry,Please Check it....");
                        var msg = 'CompanyUnit Is Alloted For Some Other Entry,Please Check it...';
                        var flg = 4;
                        var mode = 1;
                        AlartMessage(msg, flg, mode);
                    }
                    else {
                        var ans = confirm("Are you sure you want to delete this Record?");
                        if (ans) {
                            LoadingSymb();
                            $.ajax({
                                url: "/CompanyUnit/Delete/" + Id,
                                type: "POST",
                                contentType: "application/json;charset=UTF-8",
                                dataType: "json",
                                success: function (result) {

                                    if (result.Value == 1) {
                                        $('#tbody').DataTable().destroy();
                                        AddUserEntryLog('Master', 'Company Unit', 'DELETE', $('#txtName').val());
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