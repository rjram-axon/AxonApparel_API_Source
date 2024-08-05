/// <reference path="jquery-1.9.1.intellisense.js" />
//Load Data in Table when documents is ready
var CItemList = [];
var Imglist = [];
var Company = '';
$(document).ready(function () {
    loadData();
    LoadCityDDL("#ddlcity");
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
            else {

                //alert('Data Saved Successfully');
                var msg = 'Data Update Successfully...';
                var flg = 1;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                AddUserEntryLog('Master', 'Company', 'ADD', $('#Name').val());
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

    $.ajax({
        type: "GET",
        url: '/Company/List/',
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
                         { title: "Company ID", "visible": false },
                         { title: "Company" },
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

function clearTextBox() {
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
    $('#txtRexno').val("");
    $('#txtpanno').val("");

    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#CompanyId').css('border-color', 'lightgrey');
    $('#lookup').css('border-color', 'lightgrey');
    $('#zipcode').css('border-color', 'lightgrey');
    $('#email').css('border-color', 'lightgrey');
    $('#fax').css('border-color', 'lightgrey');
    $('#cstno').css('border-color', 'lightgrey');
    $('#cstdate').css('border-color', 'lightgrey');
    $('#tinno').css('border-color', 'lightgrey');
    $('#tindate').css('border-color', 'lightgrey');
    $('#contactname').css('border-color', 'lightgrey');
    $('#mobno').css('border-color', 'lightgrey');
    $('#add1').css('border-color', 'lightgrey');
    $('#add2').css('border-color', 'lightgrey');
    $('#add3').css('border-color', 'lightgrey');
    $('#ddlcity').css('border-color', 'lightgrey');
    $('#Name').css('border-color', 'lightgrey');
    $('#zipcode').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $('#ddlcountry').css('border-color', 'lightgrey');
    $('#telex').css('border-color', 'lightgrey');
    $('#rbicode').css('border-color', 'lightgrey');
    $('#iecode').css('border-color', 'lightgrey');
    $('#prefix').css('border-color', 'lightgrey');
    $('#aepcno').css('border-color', 'lightgrey');
    $('#aepcdate').css('border-color', 'lightgrey');
    $('#logoname').css('border-color', 'lightgrey');
    $('#eanno').css('border-color', 'lightgrey');
    $('#rcmcno').css('border-color', 'lightgrey');
    $('#tngstno').css('border-color', 'lightgrey');
    $('#range').css('border-color', 'lightgrey');
    $('#division').css('border-color', 'lightgrey');
    $('#txtRexno').css('border-color', 'lightgrey');
    $('#txtpanno').css('border-color', 'lightgrey');

    //$('#tbody').DataTable().destroy();
    $("#btnAdd").attr("disabled", false);

    LoadCityDDL("#ddlcity");
    LoadCountryDDL("#ddlcountry");

    $('#tindate').val(moment(new Date()).format('DD/MM/YYYY'));
    $('#cstdate').val(moment(new Date()).format('DD/MM/YYYY'));
    $('#aepcdate').val(moment(new Date()).format('DD/MM/YYYY'));

    Imglist=[];

    addses();

}


function validate() {
    var isValid = true;
    if ($('#Name').val().trim() == "" || $('#Name').val().trim().indexOf('\'') >= 0) {
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

    if ($('#mobno').val().trim() == "") {
        $('#mobno').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#mobno').css('border-color', 'lightgrey');
    }

    if ($('#add1').val().trim() == "") {
        $('#add1').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#add1').css('border-color', 'lightgrey');
    }
    if ($('#prefix').val().trim() == "") {
        $('#prefix').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#prefix').css('border-color', 'lightgrey');
    }

    if ($('#ddlcountry').val() == 0) {
        $('#ddlcountry').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlcountry').css('border-color', 'lightgrey');
    }
    if ($('#ddlcity').val() == 0) {
        //$('#ddlcity').css('border-color', 'Red');
        $('#ddlcity').siblings(".select2-container").css('border', '1px solid red');
        isValid = false;
    }
    else {
        //$('#ddlcity').css('border-color', 'lightgrey');
        $('#ddlcity').siblings(".select2-container").css('border', 'lightgrey');
    }
   

    var a = $("#mobno").val();
    //var filter = /^\d{15}$/;
    if (a.length >= 15) {
        $('#mobno').css('border-color', 'Red');
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

    var email = $("#email").val();
    var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
    if (testEmail.test(email)) {
        $('#email').css('border-color', 'lightgrey');
    }
    else {
        $('#email').css('border-color', 'Red');
        isValid = false;
    }
    return isValid;
}

//function validateEmailAddress(EmailId) {
//    var expr = /^[a-zA-Z0-9._]+[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/;
//    if (expr.test(EmailId)) {
//        return true;
//    }
//    else {
//        return false;
//    }
//}



function Add() {

   
    var res = validate();
    if (res == false) {
        return false;
    }
    var mobno=$('#mobno').val();
    if (mobno.length != 10) {
        //alert('Please Check MobileNo');
        var msg = 'Please Check MobileNo...';
        var flg = 4;
        var mode = 1;
        AlartMessage(msg, flg, mode);
        return false;
    }

    debugger;
    var Imgtitle = ''
    var path = '';

    if (nametxt.length > 0) {
        for (var d = 0; d < nametxt.length; d++) {

            var res1 = [];
            res1 = nametxt[d].FilePath.split("/");


            path = nametxt[d].FilePath;
            Imgtitle = res1[2];

        }
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
        // cstdate: new Date($('#cstdate').val()),
        cstdate: $('#cstdate').val(),
        TinNo: $('#tinno').val(),
        TinDate: $('#tindate').val(),//new Date($('#tindate').val()),
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
        AEPC_Date: $('#aepcdate').val(),//new Date($('#aepcdate').val()),
        IEC_No: $('#iecno').val(),
        IE_code: $('#iecode').val(),
        TNGST_No: $('#tngstno').val(),
        GSTNo: $('#txtGSTNo').val(),
        IsActive: ischecked,
        Imgpath: path,
        RexNo: $('#txtRexno').val(),
        PANno: $('#txtpanno').val(),
    };
    $("#btnAdd").attr("disabled", true);
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
            } else if (result.Value == -1) {
                //alert('Given Company is Already Available...');
                var msg = 'Given Company is Already Available...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }
            else {
                $('#tbody').DataTable().destroy();
                loadData();
                $('#myModal').modal('hide');                

                //alert('Data Saved Successfully');
                var msg = 'Data Saved Successfully...';
                var flg = 1;
                var mode = 0;
                AlartMessage(msg, flg, mode);
                AddUserEntryLog('Master', 'Company', 'ADD', $('#Name').val());
            }

            //clearTextBox();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}


function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var mobno = $('#mobno').val();
    if (mobno.length != 10) {
        //alert('Please Check MobileNo');
        var msg = 'Please Check MobileNo...';
        var flg = 4;
        var mode = 1;
        AlartMessage(msg, flg, mode);
        return false;
    }
    var Imgtitle = ''
    var path = '';
    for (var d = 0; d < nametxt.length; d++) {

        var res1 = [];
        res1 = nametxt[d].FilePath.split("/");

        
        path = nametxt[d].FilePath;
        Imgtitle = res1[2];
       
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
        // cstdate: $('#cstdate').val(),
        cstdate: $('#cstdate').val(),//new Date($('#cstdate').val()),
        TinNo: $('#tinno').val(),
        // TinDate: $('#tindate').val(),
        TinDate: $('#tindate').val(),//new Date($('#tindate').val()),
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
        // AEPC_Date: $('#aepcdate').val(),
        AEPC_Date: $('#aepcdate').val(),////new Date($('#aepcdate').val()),
        IEC_No: $('#iecno').val(),
        IE_code: $('#iecode').val(),
        TNGST_No: $('#tngstno').val(),
        GSTNo: $('#txtGSTNo').val(),
        IsActive: ischecked,
        Imgpath: path,
        RexNo: $('#txtRexno').val(),
        PANno: $('#txtpanno').val(),
    };
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/Company/Update",
        data: JSON.stringify(CompanyObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {


            if (result.Status == 'SUCCESS') {
                
                AddUserEntryLog('Master', 'Company', 'UPDATE', $('#Name').val());
                var msg = 'Data Update Successfully...';
                var flg = 1;
                var mode = 0;
                AlartMessage(msg, flg, mode);
                //$('#myModal').modal('hide');
                $('#tbody').DataTable().destroy();
                loadData();
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
                $('#ddlcity').val("");
                $('#ddlcountry').val("");
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
                $('#txtRexno').val("");
                $('#txtpanno').val("");
               
            }
            else if (result.Status == 'EXISTS') {
                //alert('Given Company is Already Available...');
                var msg = 'Given Company is Already Available...';
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
        url: "/Company/getbyID/" + ID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            $('#Name').val(obj.CompanyName);
            CheckCompAlloted(ID);
            
        },
        error: function (errormessage) {
        alert('delete failed..');
     }
        });

  
}


function getbyID(CompanyId) {
    //$('#ddlcity').empty();
    //LoadCityDDL("#ddlcity");

    //$('#ddlcountry').empty();
    //LoadCountryDDL("#ddlcountry");
    debugger;
    $('#CompanyId').css('border-color', 'lightgrey');
    $('#lookup').css('border-color', 'lightgrey');
    $('#zipcode').css('border-color', 'lightgrey');
    $('#email').css('border-color', 'lightgrey');
    $('#fax').css('border-color', 'lightgrey');
    $('#cstno').css('border-color', 'lightgrey');
    $('#cstdate').css('border-color', 'lightgrey');
    $('#tinno').css('border-color', 'lightgrey');
    $('#tindate').css('border-color', 'lightgrey');
    $('#contactname').css('border-color', 'lightgrey');
    $('#mobno').css('border-color', 'lightgrey');
    $('#add1').css('border-color', 'lightgrey');
    $('#add2').css('border-color', 'lightgrey');
    $('#add3').css('border-color', 'lightgrey');
    $('#ddlcity').css('border-color', 'lightgrey');
    $('#Name').css('border-color', 'lightgrey');
    $('#zipcode').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $('#ddlcountry').css('border-color', 'lightgrey');
    $('#telex').css('border-color', 'lightgrey');
    $('#rbicode').css('border-color', 'lightgrey');
    $('#iecode').css('border-color', 'lightgrey');
    $('#prefix').css('border-color', 'lightgrey');
    $('#aepcno').css('border-color', 'lightgrey');
    $('#aepcdate').css('border-color', 'lightgrey');
    $('#logoname').css('border-color', 'lightgrey');
    $('#eanno').css('border-color', 'lightgrey');
    $('#rcmcno').css('border-color', 'lightgrey');
    $('#tngstno').css('border-color', 'lightgrey');
    $('#range').css('border-color', 'lightgrey');
    $('#division').css('border-color', 'lightgrey');
    $('#txtRexno').css('border-color', 'lightgrey');
    $('#txtpanno').css('border-color', 'lightgrey');

    $.ajax({
        url: "/Company/getbyID/" + CompanyId,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;

            $('#CompanyId').val(obj.CompanyId);
            $('#add1').val(obj.Address1);
            $('#add2').val(obj.Address2);
            $('#add3').val(obj.Address3);
            $('#ddlcity').val(obj.CityId).trigger('change');
            //$('#ddlcity').val(obj.CityId);
            $('#ddlcountry').val(obj.CountryId);
            $('#txtCountry').val(obj.CountryName);
            $('#Name').val(obj.CompanyName);
            $('#zipcode').val(obj.Zipcode);
            $('#fax').val(obj.Fax);
            $('#email').val(obj.Email);
            $('#cstno').val(obj.cstno);
            $('#cstdate').val(moment(obj.cstdate).format('DD/MM/YYYY'));
            $('#tinno').val(obj.TinNo);
            $('#tindate').val(moment(obj.TinDate).format('DD/MM/YYYY'));
            $('#contactname').val(obj.ContactName);
            $('#mobno').val(obj.MobNo);
            $('#lookup').val(obj.Complookup);
            $('#telex').val(obj.Telex);
            $('#rbicode').val(obj.Rbi_code_num);
            $('#iecode').val(obj.IE_code);
            $('#prefix').val(obj.Prefix);
            $('#aepcno').val(obj.AEPC_No);
            $('#aepcdate').val(moment(obj.AEPC_Date).format('DD/MM/YYYY'));
            $('#logoname').val(obj.LogoName);
            $('#eanno').val(obj.EAN_No);
            $('#iecno').val(obj.IEC_No);
            $('#rcmcno').val(obj.RCMC_No);
            $('#tngstno').val(obj.TNGST_No);
            $('#range').val(obj.Range);
            $('#division').val(obj.Division);
            $('#txtGSTNo').val(obj.GSTNo);
            $('#txtRexno').val(obj.RexNo);
            $('#txtpanno').val(obj.PANno);

            if (obj.IsActive == "TRUE") {
                $('#Status').prop("checked", true);
            } else {
                $('#Status').prop("checked", false);
            }

            $('#myModal').modal('show');

            $("#btnUpdate").attr("disabled", false);
            $('#btnUpdate').show();

            $('#btnAdd').hide();
            if (obj.Imgpath != '') {
                var list = obj.Buyordimg;
                Imglist = [];

                var obj = {
                    FilePath: obj.Imgpath,
                    FileID: obj.CompanyId,
                    FileName: obj.LogoName,
                }
                Imglist.push(obj);
                nametxt = Imglist;
                addses();
            }
            else {
                Imglist = [];
                nametxt = Imglist;
                addses();
            }
            // $('#tbody').DataTable().destroy();

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

function addses() {
    var SizeObj = {
        Buyordimg: Imglist
    };
    $.ajax({
        url: "/StyleEntry/AddSession",
        data: JSON.stringify(SizeObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            GetFiles();
        },
        error: function (errormessage) {
            // alert(errormessage.responseText);
            nametxt = GetFilelist();
            GetFiles();
        }
    });
}

function GetFiles() {
    debugger;

    var url = "/StyleEntry/GetFiles";
    var Id = $('input#ID').val();
    url = url + "?id=" + Id
    $.get(url, function (response) {
        $('#uploadsContainer').html(response);
    });
}
function LoadCountry() {

    $('#txtCountry').val("");
    $('#ddlCountry').val("");
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
                $('#ddlcountry').val(obj[0]["CountryId"]);
                $('#txtCountry').val(obj[0]["CountryName"]);


            }
            else {

            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}


function CheckCompAlloted(Id) {

    $.ajax({
        url: "/Company/GetCompRefDetails",
        data: JSON.stringify({ CompanyId: Id }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            CItemList = result;
            if (CItemList.length > 0) {

                for (var x = 0; x < CItemList.length; x++) {

                    var c = CItemList[x].CountCompId;

                    if (c > 0) {
                        //alert("Company Is Alloted For Some Other Entry,Please Check it...."); 
                        var msg = 'Company Is Alloted For Some Other Entry,Please Check it...';
                        var flg = 4;
                        var mode = 1;
                        AlartMessage(msg, flg, mode);
                    }
                    else {
                        var ans = confirm("Are you sure you want to delete this Record?");
                        if (ans) {
                            LoadingSymb();
                            $.ajax({
                                url: "/Company/Delete/" + Id,
                                type: "POST",
                                contentType: "application/json;charset=UTF-8",
                                dataType: "json",
                                success: function (result) {

                                    if (result.Value == 1) {
                                        $('#tbody').DataTable().destroy();
                                        AddUserEntryLog('Master', 'Company', 'DELETE', $('#Name').val());
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

function getViewbyID(CompanyId) {
  
    debugger;
    $('#CompanyId').css('border-color', 'lightgrey');
    $('#lookup').css('border-color', 'lightgrey');
    $('#zipcode').css('border-color', 'lightgrey');
    $('#email').css('border-color', 'lightgrey');
    $('#fax').css('border-color', 'lightgrey');
    $('#cstno').css('border-color', 'lightgrey');
    $('#cstdate').css('border-color', 'lightgrey');
    $('#tinno').css('border-color', 'lightgrey');
    $('#tindate').css('border-color', 'lightgrey');
    $('#contactname').css('border-color', 'lightgrey');
    $('#mobno').css('border-color', 'lightgrey');
    $('#add1').css('border-color', 'lightgrey');
    $('#add2').css('border-color', 'lightgrey');
    $('#add3').css('border-color', 'lightgrey');
    $('#ddlcity').css('border-color', 'lightgrey');
    $('#Name').css('border-color', 'lightgrey');
    $('#zipcode').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $('#ddlcountry').css('border-color', 'lightgrey');
    $('#telex').css('border-color', 'lightgrey');
    $('#rbicode').css('border-color', 'lightgrey');
    $('#iecode').css('border-color', 'lightgrey');
    $('#prefix').css('border-color', 'lightgrey');
    $('#aepcno').css('border-color', 'lightgrey');
    $('#aepcdate').css('border-color', 'lightgrey');
    $('#logoname').css('border-color', 'lightgrey');
    $('#eanno').css('border-color', 'lightgrey');
    $('#rcmcno').css('border-color', 'lightgrey');
    $('#tngstno').css('border-color', 'lightgrey');
    $('#range').css('border-color', 'lightgrey');
    $('#division').css('border-color', 'lightgrey');
    $('#txtRexno').css('border-color', 'lightgrey');
    $('#txtpanno').css('border-color', 'lightgrey');

    $.ajax({
        url: "/Company/getbyID/" + CompanyId,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;

            $('#CompanyId').val(obj.CompanyId);
            $('#add1').val(obj.Address1);
            $('#add2').val(obj.Address2);
            $('#add3').val(obj.Address3);
            $('#ddlcity').val(obj.CityId).trigger('change');
            //$('#ddlcity').val(obj.CityId);
            $('#ddlcountry').val(obj.CountryId);
            $('#txtCountry').val(obj.CountryName);
            $('#Name').val(obj.CompanyName);
            $('#zipcode').val(obj.Zipcode);
            $('#fax').val(obj.Fax);
            $('#email').val(obj.Email);
            $('#cstno').val(obj.cstno);
            $('#cstdate').val(moment(obj.cstdate).format('DD/MM/YYYY'));
            $('#tinno').val(obj.TinNo);
            $('#tindate').val(moment(obj.TinDate).format('DD/MM/YYYY'));
            $('#contactname').val(obj.ContactName);
            $('#mobno').val(obj.MobNo);
            $('#lookup').val(obj.Complookup);
            $('#telex').val(obj.Telex);
            $('#rbicode').val(obj.Rbi_code_num);
            $('#iecode').val(obj.IE_code);
            $('#prefix').val(obj.Prefix);
            $('#aepcno').val(obj.AEPC_No);
            $('#aepcdate').val(moment(obj.AEPC_Date).format('DD/MM/YYYY'));
            $('#logoname').val(obj.LogoName);
            $('#eanno').val(obj.EAN_No);
            $('#iecno').val(obj.IEC_No);
            $('#rcmcno').val(obj.RCMC_No);
            $('#tngstno').val(obj.TNGST_No);
            $('#range').val(obj.Range);
            $('#division').val(obj.Division);
            $('#txtGSTNo').val(obj.GSTNo);
            $('#txtRexno').val(obj.RexNo);
            $('#txtpanno').val(obj.PANno);

            if (obj.IsActive == "TRUE") {
                $('#Status').prop("checked", true);
            } else {
                $('#Status').prop("checked", false);
            }

            $('#myModal').modal('show');

            $('#btnUpdate').hide();
            $('#btnAdd').hide();
            if (obj.Imgpath != '') {
                var list = obj.Buyordimg;
                Imglist = [];

                var obj = {
                    FilePath: obj.Imgpath,
                    FileID: obj.CompanyId,
                    FileName: obj.LogoName,
                }
                Imglist.push(obj);

                addses();
            }
            else {
                Imglist = [];
                addses();
            }
            // $('#tbody').DataTable().destroy();

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}


