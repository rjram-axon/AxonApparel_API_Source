/// <reference path="jquery-1.9.1.intellisense.js" />
//Load Data in Table when documents is ready

var CItemList = [];
var Imglist = [];
$(document).ready(function () {
    debugger;
    LoadCityDDL("#ddlCity");
    LoadDesignationDDL("#ddlDesignation");
    LoadDepartmentDDL("#ddlDepartment");
   // LoadCompanyUnitDDL("#ddlCompanyUnit");
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


    $(document).on('click', '.btnadddept', function () {
        debugger;
        $('#txtDesigID').val("");
        $('#txtDesignation').val("");
        $('#Status').val("");

        $("#myModal5").modal('show');

    });

    $(document).on('click', '.btnadddesgn', function () {
        debugger;
        $('#DepartmentID').val("");
        $('#Name').val("");
        $('#Statusdept').val("");
        $("#myModal4").modal('show');

    });
    $(document).on('click', '.btnaddcpnyunit', function () {
        debugger;
        //LoadCompanyDDL("#ddlCompany");
        //LoadCityDDL("#ddlCityname");
        $('#txtCompID').val("");
        $('#txtName').val("");
        $('#ddlCompany').empty();
        $('#txtlookup').val("");
        $('#txtaddress1').val("");
        $('#txtaddress2').val("");
        $('#txtaddress3').val("");
        $('#ddlCityname').empty();
        $('#txtzipcode').val("");
        $('#ddltounit').val("");
        $('#Statuscu').val("");
        $("#myModal2").modal('show');

    });
  });

function Adddesgn() {
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
    var DesigObj = {
        Id: $('#txtDesigID').val(),
        DesignationName: $('#txtDesignation').val(),
        IsActive: ischecked,
    };
    LoadingSymb();
    $.ajax({
        url: "/Designation/Add",
        data: JSON.stringify(DesigObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            }
            else if (result.Value == -1) {
                //alert('Given Designation is Already Available...');
                var msg = 'Given Designation is Already Available...';
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
                $('#myModal5').modal('hide');
                LoadDesignationDDL("#ddlDesignation");
            }
            //clearTextBox();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });

}
function Adddept() {
    var checkbox_value = "";
    var ischecked = false;

    $(":checkbox").each(function () {
        ischecked = $('#Statusdept').is(":checked");
        //if (ischecked) {
        //    checkbox_value += "on";
        //}
        //else {
        //    checkbox_value += "off";
        //}
    });

    var departmentObj = {
        DepartmentId: $('#DepartmentID').val(),
        DepartmentName: $('#Name').val(),
        IsActive: ischecked,
    };
    LoadingSymb();
    $.ajax({
        url: "/Department/Add",
        data: JSON.stringify(departmentObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            }
            else if (result.Value == -1) {
                //alert('Given Department is Already Available...');
                var msg = 'Given Department is Already Available...';
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
                $('#myModal4').modal('hide');
                LoadDepartmentDDL("#ddlDepartment");
                //checkname();

            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
            // alert('Data Saved Already');
        }

    });
}
function Addcmpnyunit() {
    debugger;
    var checkbox_value = "";
    var ischecked = "False";
    $(":checkbox").each(function () {
        ischecked = $('#Statuscu').is(":checked");

    });
    debugger;
    var CompanyUnitObj = {
        Id: $('#txtCompID').val(),
        CompanyUnitName: $('#txtName').val(),
        CompanyUnitLookup: $('#txtlookup').val(),
        Address1: $('#txtaddress1').val(),
        Address2: $('#txtaddress2').val(),
        Address3: $('#txtaddress3').val(),
        CityId: $('#ddlCityname').val(),
        CompanyId: $('#ddlCompany').val(),
        ZipCode: $('#txtzipcode').val(),
        IssueType: $('#ddltounit').val(),
        IsActive: ischecked,
    };
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
            }
            else if (result.Value == -1) {
                //alert('Given CompanyUnit is Already Available...');
                var msg = 'Given CompanyUnit is Already Available...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }
            else {
                
               
                //alert('Data Saved successfully');
                var msg = 'Data Saved Successfully...';
                var flg = 1;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                $('#myModal2').modal('hide');
                LoadCompanyUnitDDL("#ddlCompanyUnit");
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
        url: '/Employee/List/',
        data: JSON.stringify({}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            var tableload = json.data
            debugger;
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
                         { title: "Employee" },
                         { title: "Address" },
                         //{ title: "Company Unit" },
                         { title: "Department" },
                         { title: "Designation" },
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

    $('#txtEmployeeID').val("");
    $('#txtName').val("");
    $('#txtempno').val("");
    $('#ddlCompanyUnit').empty();
    $('#ddlDepartment').empty();
    $('#ddlDesignation').empty();
    $('#txtAdd1').val("");
    $('#txtAdd2').val("");
    $('#txtAdd3').val("");
    $('#ddlCity').empty();
    $('#txtEmail').val("");
    $('#txtempno').val("");
    $('#txtPhoneNo').val("");
    $('#chkPieceRate').val("");
    $('#chkprodemp').val("");
    $('#chkrlvd').val("");
    $('#Status').val("");

    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#txtEmployeeID').css('border-color', 'lightgrey');
    $('#txtempno').css('border-color', 'lightgrey');
    $('#ddlCompanyUnit').css('border-color', 'lightgrey');
    $('#ddlDepartment').css('border-color', 'lightgrey');
    $('#ddlDesignation').css('border-color', 'lightgrey');
    $('#txtAdd1').css('border-color', 'lightgrey');
    $('#txtAdd2').css('border-color', 'lightgrey');
    $('#txtAdd3').css('border-color', 'lightgrey');
    $('#ddlCity').css('border-color', 'lightgrey');
    $('#txtCityID').css('border-color', 'lightgrey');
    $('#txtEmail').css('border-color', 'lightgrey');
    $('#txtempno').css('border-color', 'lightgrey');
    $('#txtPhoneNo').css('border-color', 'lightgrey');
    $('#chkPieceRate').css('border-color', 'lightgrey');
    $('#chkprodemp').css('border-color', 'lightgrey');
    $('#chkrlvd').css('border-color', 'lightgrey');
    $('#txtName').css('border-color', 'lightgrey');    
    $('#Status').css('border-color', 'lightgrey');
    //$('#tbody').DataTable().destroy();

    LoadCityDDL("#ddlCity");
    LoadDesignationDDL("#ddlDesignation");
    LoadDepartmentDDL("#ddlDepartment");
    LoadCompanyUnitDDL("#ddlCompanyUnit");

    Imglist = [];

    addses();
   
}

//Add Data Function 
function Add() {
    var res = validate();
    if (res == false) {
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
   // var isStatuschecked = false;
    var isPieceRateChecked = false;
    var isProdEmpChecked = false;
    var isRelieved = false;
    var ischecked = false;
    
    $(":checkbox").each(function () {
        ischecked = $('#Status').is(":checked");
        isPieceRateChecked = $('#chkPieceRate').is(":checked");
        isProdEmpChecked = $('#chkprodemp').is(":checked");
        isRelieved = $('#chkrlvd').is(":checked");
    });
    
    var EmpObj = {
        EmpId: $('#txtEmployeeID').val(),
        EmpName: $('#txtName').val(),
        EmpNo: $('#txtempno').val(),
        Address1: $('#txtAdd1').val(),
        Address2: $('#txtAdd2').val(),
        Address3: $('#txtAdd3').val(),
        CompanyUnit: $('#ddlCompanyUnit').val(),
        DepartmentId: $('#ddlDepartment').val(),
        DesignationId: $('#ddlDesignation').val(),
        CityId: $('#ddlCity').val(),
        Email: $('#txtEmail').val(),
        PhoneNo: $('#txtPhoneNo').val(),
        PieceRate: isPieceRateChecked,
        ProdEmployee: isProdEmpChecked,
        Relieved: isRelieved,
        IsActive: ischecked,
        Imgpath: path
    };
    $("#btnAdd").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/Employee/Add",
        data: JSON.stringify(EmpObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            } else if (result.Value == -1) {
                //alert('Given Employee is Already Available...');
                var msg = 'Given Employee is Already Available...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }
            else {
                AddUserEntryLog('Master', 'Employee', 'ADD', $('#txtName').val());
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

function ModelClose() {
    $('#myModal').modal('hide');
    //loadData();
}

//function for updating Employee's record
function Update() {
    var ischecked = false;
    var isPieceRateChecked = false;
    var isProdEmpChecked = false;
    var isRelieved = false;

    var res = validate();
    if (res == false) {
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

    var checkbox_value = "";
    $(":checkbox").each(function () {
        ischecked = $('#Status').is(":checked");
        isPieceRateChecked = $('#chkPieceRate').is(":checked");
        isProdEmpChecked = $('#chkprodemp').is(":checked");
        isRelieved = $('#chkrlvd').is(":checked");

        //if (ischecked) {
        //    checkbox_value += "on";
        //    isAct = true;
        //}
        //else {
        //    checkbox_value += "off";
        //}
    });

    var EmpObj = {
        EmpId: $('#txtEmployeeID').val(),
        EmpName: $('#txtName').val(),
        EmpNo: $('#txtempno').val(),
        Address1: $('#txtAdd1').val(),
        Address2: $('#txtAdd2').val(),
        Address3: $('#txtAdd3').val(),
        CompanyUnit: $('#ddlCompanyUnit').val(),
        DepartmentId: $('#ddlDepartment').val(),
        DesignationId: $('#ddlDesignation').val(),
        CityId: $('#ddlCity').val(),
        Email: $('#txtEmail').val(),
        PhoneNo: $('#txtPhoneNo').val(),
        PieceRate: isPieceRateChecked,
        ProdEmployee: isProdEmpChecked,
        IsActive: ischecked,
        Relieved: isRelieved,
        Imgpath: path
    };
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/Employee/Update",
        data: JSON.stringify(EmpObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
           
            if (result.Status == 'SUCCESS') {
                AddUserEntryLog('Master', 'Employee', 'UPDATE', $('#txtName').val());
                $('#tbody').DataTable().destroy();
                loadData();
                $('#myModal').modal('hide');
                $('#Status').prop("checked", false);
                $('#chkPieceRate').prop("checked", false);
                $('#chkprodemp').prop("checked", false);
                $('#chkrlvd').prop("checked", false);
                //alert('Data Updated Successfully');
                var msg = 'Data Updated Successfully...';
                var flg = 1;
                var mode = 0;
                AlartMessage(msg, flg, mode);
                $("#btnUpdate").attr("disabled", false);
            }
            else if (result.Status == 'EXISTS') {
                //alert('Given Employee is Already Available...');
                var msg = 'Given Employee is Already Available...';
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
        url: "/Employee/getbyID/" + ID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            $('#txtName').val(obj.EmpName);
            CheckEmployeeAlloted(ID);

        },
        error: function (errormessage) {
            alert('delete failed..');
        }
    });
    
}

function CheckEmployeeAlloted(Id) {

    $.ajax({
        url: "/Employee/GetEmployeeRefDetails",
        data: JSON.stringify({ EmpId: Id }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            CItemList = result;
            if (CItemList.length > 0) {

                for (var x = 0; x < CItemList.length; x++) {

                    var c = CItemList[x].CountEmpId;

                    if (c > 0) {
                        //alert("Employee Is Alloted For Some Other Entry,Please Check it....");
                        var msg = 'Employee Is Alloted For Some Other Entry,Please Check it...';
                        var flg = 4;
                        var mode = 1;
                        AlartMessage(msg, flg, mode);
                    }
                    else {
                        var ans = confirm("Are you sure you want to delete this Record?");
                        if (ans) {
                            LoadingSymb();
                            $.ajax({
                                url: "/Employee/Delete/" + Id,
                                type: "POST",
                                contentType: "application/json;charset=UTF-8",
                                dataType: "json",
                                success: function (result) {

                                    if (result.Value == 1) {
                                        $('#tbody').DataTable().destroy();
                                        AddUserEntryLog('Master', 'Employee', 'DELETE', $('#txtName').val());
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
    if ($('#txtName').val()== "") {
        $('#txtName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtName').css('border-color', 'lightgrey');
    }

    if ($('#txtempno').val()== "") {
        $('#txtempno').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtempno').css('border-color', 'lightgrey');
    }

    
    //var EmailId = $("#txtEmail").val();
   
    //if ($.trim(EmailId).length > 0) {
    //    if (validateEmailAddress(EmailId)) {
    //        $('#txtEmail').css('border-color', 'lightgrey');
    //    }
    //    else {
    //        alert('Invalid Email Address.');
    //        $('#txtEmail').css('border-color', 'Red');
    //        isValid = false;
    //    }
    //}
    //else {
    //    $('#txtEmail').css('border-color', 'lightgrey');
    //}

    var a = $("#txtPhoneNo").val();
    //var filter = /^\d{15}$/;
    if (a.length >= 15) {
        $('#txtPhoneNo').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtPhoneNo').css('border-color', 'lightgrey');
    }

    //var email = $("#txtEmail").val();
    //var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
    //if (testEmail.test(email)) {
    //    $('#txtEmail').css('border-color', 'lightgrey');
    //}
    //else {
    //    $('#txtEmail').css('border-color', 'Red');
    //    isValid = false;
    //}

    return isValid;
}





function getbyID(EmpID) {
    //$('#ddlCompanyUnit').empty();
    //LoadCompanyUnitDDL("#ddlCompanyUnit");
    //$('#ddlDepartment').empty();
    //LoadDepartmentDDL("#ddlDepartment");
    //$('#ddlDesignation').empty();
    //LoadDesignationDDL("#ddlDesignation");
    //$('#ddlCity').empty();
    //LoadCityDDL("#ddlCity");
    
    debugger;
    $('#txtName').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Employee/getbyID/" + EmpID,
        typr: "GET",

        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {
                $('#txtEmployeeID').val(obj.EmpId);
                $('#txtName').val(obj.EmpName);
                $('#txtempno').val(obj.EmpNo);
                $('#txtAdd1').val(obj.Address1);
                $('#txtAdd2').val(obj.Address2);
                $('#txtAdd3').val(obj.Address3);
                $('#ddlCompanyUnit').val(obj.CompanyUnit);
                $('#ddlDepartment').val(obj.DepartmentId);
                $('#ddlDesignation').val(obj.DesignationId);
                $('#ddlCity').val(obj.CityId);
                $('#txtEmail').val(obj.Email);
                $('#txtPhoneNo').val(obj.PhoneNo);

                if (obj.ProdEmployee == "TRUE") {
                    $('#chkPieceRate').prop("checked", true);
                } else {
                    $('#chkPieceRate').prop("checked", false);
                }

                if (obj.PieceRate == "TRUE") {
                    $('#chkprodemp').prop("checked", true);
                } else {
                    $('#chkprodemp').prop("checked", false);
                }

                if (obj.Relieved == "TRUE") {
                    $('#chkrlvd').prop("checked", true);
                } else {
                    $('#chkrlvd').prop("checked", false);
                }

                if (obj.IsActive == "TRUE") {
                    $('#Status').prop("checked", true);
                } else {
                    $('#Status').prop("checked", false);
                }
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


                $('#myModal').modal('show');
                $('#btnUpdate').show();
                $('#btnAdd').hide();
            }
        }
    });
    return false;
}

function getViewbyID(EmpID) {
   
    debugger;
    $('#txtName').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Employee/getbyID/" + EmpID,
        typr: "GET",

        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {
                $('#txtEmployeeID').val(obj.EmpId);
                $('#txtName').val(obj.EmpName);
                $('#txtempno').val(obj.EmpNo);
                $('#txtAdd1').val(obj.Address1);
                $('#txtAdd2').val(obj.Address2);
                $('#txtAdd3').val(obj.Address3);
                $('#ddlCompanyUnit').val(obj.CompanyUnit);
                $('#ddlDepartment').val(obj.DepartmentId);
                $('#ddlDesignation').val(obj.DesignationId);
                $('#ddlCity').val(obj.CityId);
                $('#txtEmail').val(obj.Email);
                $('#txtPhoneNo').val(obj.PhoneNo);

                if (obj.ProdEmployee == "TRUE") {
                    $('#chkPieceRate').prop("checked", true);
                } else {
                    $('#chkPieceRate').prop("checked", false);
                }

                if (obj.PieceRate == "TRUE") {
                    $('#chkprodemp').prop("checked", true);
                } else {
                    $('#chkprodemp').prop("checked", false);
                }

                if (obj.Relieved == "TRUE") {
                    $('#chkrlvd').prop("checked", true);
                } else {
                    $('#chkrlvd').prop("checked", false);
                }

                if (obj.IsActive == "TRUE") {
                    $('#Status').prop("checked", true);
                } else {
                    $('#Status').prop("checked", false);
                }
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


                $('#myModal').modal('show');
                $('#btnUpdate').hide();
                $('#btnAdd').hide();
            }
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