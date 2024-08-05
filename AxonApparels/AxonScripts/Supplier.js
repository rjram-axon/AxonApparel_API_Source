/// <reference path="jquery-1.9.1.intellisense.js" />
//Load Data in Table when documents is ready
var CItemList = [];
var MPro = '';
$(document).ready(function () {
    loadData();
    LoadSupplierDDL("#ddlAuditSupplier");
    LoadProcessDDL("#ddlProcess");

    $(document).on('click', '.btnaddcity', function () {
        debugger;
        LoadStateDDL("#ddlState");
        LoadCountryDDL("#ddlCoun");
        $('#txtCityID').val(""),
        $('#txtcitName').val(""),
        $('#ddlCountry').val(),
        $('#Statuscit').val(""),
        $("#myModal3").modal('show');

    });
});

function Print() {
    debugger;
    var Status = $('input[name="proctype"]:checked').attr('value');
    window.open("../Reports/SupplierMas_Report/SupplierMas_Report.aspx?Status=" + Status);
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
        StateId: $('#ddlState').val(),
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
    //    url: "/Supplier/List",
    //    type: "GET",
    //    contentType: "application/json;charset=utf-8",
    //    dataType: "json",
    //    success: function (result) {
    //        var html = '';

    //        $.each(result, function (key, item) {
    //            html += '<tr>';
    //            html += '<td style="visibility:hidden;">' + item.SupplierId + '</td>';
    //            html += '<td>' + item.SupplierName + '</td>';
    //            html += '<td>' + item.Address1 + ',' + item.Address2 + ',' + item.Address3 + '</td>';
    //            html += '<td>' + item.CityName + '</td>';
    //            html += '<td>' + item.IsActive + '</td>';
    //            html += '<td><a href="#" onclick="return getbyID(' + item.SupplierId + ')">Edit</a> | <a href="#" onclick="Delele(' + item.SupplierId + ')">Delete</a></td>';
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
        url: '/Supplier/List/',
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
                         { title: "Supplier ID", "visible": false },
                         { title: "Supplier" },
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
    $('#SupplierID').val("");
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
    $('#zipcode').val("");
    $('#Status').val("");
    $('#gstno').val("");
    $('#applicale').prop("checked", false);
    $('#chkProcessAll').prop("checked", false);
    $('#chkPurchaseAll').prop("checked", false);
    $('#chkPurchaseYarn').prop("checked", false);
    $('#chkPurchaseTrims').prop("checked", false);
    //$('#applicale').val("");

    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#SupplierID').css('border-color', 'lightgrey');
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
    $('#applicale').css('border-color', 'lightgrey');
    $('#gstno').css('border-color', 'lightgrey');
    //$('#tbody').DataTable().destroy();
    $('#chkProcessAll').prop("checked", false);
    $('#chkPurchaseAll').prop("checked", false);
    $('#chkPurchaseYarn').prop("checked", false);
    $('#chkPurchaseTrims').prop("checked", false);

    LoadCityDDL("#ddlcity");
    LoadSupplierDDL("#ddlAuditSupplier");
    LoadProcessDDL("#ddlProcess");
    $('#cstdate').val(moment(new Date()).format('DD/MM/YYYY'));
    $('#tindate').val(moment(new Date()).format('DD/MM/YYYY'));

    MPro = '';
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

    //if ($('#contactname').val().trim() == "") {
    //    $('#contactname').css('border-color', 'Red');
    //    isValid = false;
    //}
    //else {
    //    $('#contactname').css('border-color', 'lightgrey');
    //}
    if ($('#ddlcity').val() == 0) {
        $('#ddlcity').siblings(".select2-container").css('border', '1px solid red');       
        isValid = false;
    }
    else {
        $('#ddlcity').siblings(".select2-container").css('border', ' lightgrey');
        
    }
    if ($('#mobno').val().trim() == "") {
        $('#mobno').css('border-color', 'Red');
        isValid = false;
    }
    else {
        var a = $("#mobno").val();
        //var filter = /^\d{15}$/;
        if (a.length >= 15) {
            $('#mobno').css('border-color', 'Red');
            isValid = false;
        }
        else {
            $('#mobno').css('border-color', 'lightgrey');
        }       
    }   
    var z = $("#zipcode").val();
    if (z.length >= 8) {
        $('#zipcode').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#zipcode').css('border-color', 'lightgrey');
    }
    var gstischecked = false;
    $(":checkbox").each(function () {
        gstischecked = $('#applicale').is(":checked");
        if (gstischecked) {
            gstcode = $('#gstno').val();
            if (gstcode == "" || gstcode.length > 16) {
                $('#gstno').css('border-color', 'Red');
                isValid = false;
            }
        }
        else {
            $('#gstno').css('border-color', 'lightgrey');
            gstcode = '';
        }
    });
   
    
    var email = $("#email").val();
    var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
    //if (testEmail.test(email))
    //{
    //   // $('#email').css('border-color', 'lightgrey');
    //}
    //else 
    //{
    //   // $('#email').css('border-color', 'Red');
    //   // isValid = false;
    //}
    return isValid;
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
//Add Data Function 
function Add() {

    var res = validate();
    if (res == false) {
        return false;
    }
    debugger;
    var checkbox_value = "";
    var ischecked = false;
    var isprocessall = false;
    var ispurchaseall = false;
    var ispurchseyarn = false;
    var ispurchasetrims = false;

    $(":checkbox").each(function () {
        ischecked = $('#Status').is(":checked");
        isprocessall = $('#Status').is(":checked");
        ispurchaseall = $('#Status').is(":checked");
        ispurchseyarn = $('#Status').is(":checked");
        ispurchasetrims = $('#Status').is(":checked");
       
        //if (ischecked) {
        //    checkbox_value += "on";
        //}
        //else {
        //    checkbox_value += "off";
        //}
    });

    if (isprocessall) {
    MPro='';
    }

    if (ispurchaseall) {
        ispurchseyarn = false;
        ispurchasetrims = false;
    }

    debugger;
    var gstischecked = false;
    $(":checkbox").each(function () {
        gstischecked = $('#applicale').is(":checked");
        if (gstischecked) {
            gstcode = $('#gstno').val();
        }
        else {
            gstcode ='';
        }
    });
    var aud = $('#ddlAuditSupplier option:selected').val();
    if (aud > 0) {
        aud = $('#ddlAuditSupplier option:selected').val();
    } else {
        aud = null;
    }

    debugger;
    var SupplierObj = {
        // SupplierId: $('#SupplierID').val(),
        SupplierName: $('#Name').val(),
        Address1: $('#add1').val(),
        Address2: $('#add2').val(),
        Address3: $('#add3').val(),
        CityId: $('#ddlcity').val(),
        Zipcode: $('#zipcode').val(),
        Phone: $('#phoneno').val(),
        Fax: $('#fax').val(),
        Email: $('#email').val(),
        cstno: $('#cstno').val(),
        //new Date($('#txtdate').val())
        cstdate: $('#cstdate').val(),//new Date($('#cstdate').val()),
        TinNo: $('#tinno').val(),
        TinDate: $('#tindate').val(),//new Date($('#tindate').val()),
        ContactName: "--",//$('#contactname').val("--"),
        MobNo: $('#mobno').val(),
        Supplookup: $('#lookup').val(),
        CountryId: $('#txtCountryId').val(),
        IsActive: ischecked,
        GSTNO: gstcode,
        GstApplicable: (gstischecked == true) ? 'Y' : 'N',
        AuditSupplierid: aud,
        ProcessAll: isprocessall,
        PurchaseAll: ispurchaseall,
        ProcessYarn: ispurchseyarn,
        ProcessTrims: ispurchasetrims,
        ProcessSet: MPro

    };
    LoadingSymb();
    $.ajax({
        url: "/Supplier/Add",
        data: JSON.stringify(SupplierObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            }
            else if (result.Value == -1) {
                //alert('Given Supplier is Already Available...');
                var msg = 'Given Supplier is Already Available...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }
            else {
                AddUserEntryLog('Master', 'Supplier', 'ADD', $('#Name').val());


                $('#tbody').DataTable().destroy();
                loadData();
                $('#myModal').modal('hide');
                $('#SupplierID').val("");
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
                $('#zipcode').val("");
                $('#Status').val("");
                $('#gstno').val("");
                $('#applicale').val("");
                $('#chkProcessAll').prop("checked", false);
                $('#chkPurchaseAll').prop("checked", false);
                $('#chkPurchaseYarn').prop("checked", false);
                $('#chkPurchaseTrims').prop("checked", false);
                LoadSupplierDDL("#ddlAuditSupplier");
                LoadProcessDDL("#ddlProcess");
                //$('#tbody').DataTable().destroy();
                //clearTextBox();

                //alert('Data Added Successfully');
                var msg = 'Data Added Successfully...';
                var flg = 1;
                var mode = 0;
                AlartMessage(msg, flg, mode);
            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//function for updating department's record
function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }
    debugger;
    var checkbox_value = "";
    var ischecked = false;
    var isprocessall = false;
    var ispurchaseall = false;
    var ispurchseyarn = false;
    var ispurchasetrims = false;

    $(":checkbox").each(function () {
        ischecked = $('#Status').is(":checked");
        isprocessall = $('#chkProcessAll').is(":checked");
        ispurchaseall = $('#chkPurchaseAll').is(":checked");
        ispurchseyarn = $('#chkPurchaseYarn').is(":checked");
        ispurchasetrims = $('#chkPurchaseTrims').is(":checked");
        //if (ischecked) {
        //    checkbox_value += "on";
        //}
        //else {
        //    checkbox_value += "off";
        //}
    });

    if (isprocessall) {
        MPro = '';
    }

    if (ispurchaseall) {
        ispurchseyarn = false;
        ispurchasetrims = false;
    }


    var gstcode = '';
    var gstischecked = false;
    $(":checkbox").each(function () {
        gstischecked = $('#applicale').is(":checked");
        if (gstischecked) {
            gstcode = $('#gstno').val();
        }
        else {
            gstcode = '';
        }
    });

    var aud = $('#ddlAuditSupplier option:selected').val();
    if (aud > 0) {
        aud = $('#ddlAuditSupplier option:selected').val();
    } else {
        aud = null;
    }

    debugger;
    var SupplierObj = {
        SupplierId: $('#SupplierID').val(),
        SupplierName: $('#Name').val(),
        Address1: $('#add1').val(),
        Address2: $('#add2').val(),
        Address3: $('#add3').val(),
        CityId: $('#ddlcity').val(),
        Zipcode: $('#zipcode').val(),
        Fax: $('#fax').val(),
        Email: $('#email').val(),
        cstno: $('#cstno').val(),
        cstdate: $('#cstdate').val(),//new Date($('#cstdate').val()),//$('#cstdate').val(),
        TinNo: $('#tinno').val(),
        TinDate: $('#tindate').val(),//new Date($('#tindate').val()),//$('#tindate').val(),
        ContactName: "--",
        MobNo: $('#mobno').val(),
        Supplookup: $('#lookup').val(),
        CountryId: $('#txtCountryId').val(),
        IsActive: ischecked,
        GSTNO: gstcode,
        GstApplicable: (gstischecked == true) ? 'Y' : 'N',
        AuditSupplierid: aud,
        ProcessAll: isprocessall,
        PurchaseAll: ispurchaseall,
        ProcessYarn: ispurchseyarn,
        ProcessTrims: ispurchasetrims,
        ProcessSet: MPro
    };
    LoadingSymb();
    $.ajax({
        url: "/Supplier/Update",
        data: JSON.stringify(SupplierObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.Status == 'SUCCESS') {
                AddUserEntryLog('Master', 'Supplier', 'UPDATE', $('#Name').val());

                $('#myModal').modal('hide');
                $('#tbody').DataTable().destroy();
                loadData();
                $('#SupplierID').val("");
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
                $('#zipcode').val("");
                $('#Status').val("");
                $('#gstno').val("");
                $('#applicale').val("");
                $('#chkProcessAll').prop("checked", false);
                $('#chkPurchaseAll').prop("checked", false);
                $('#chkPurchaseYarn').prop("checked", false);
                $('#chkPurchaseTrims').prop("checked", false);
                LoadSupplierDDL("#ddlAuditSupplier");
                LoadProcessDDL("#ddlProcess");
                //alert('Data Updated Successfully');
                var msg = 'Data Updated Successfully...';
                var flg = 1;
                var mode = 0;
                AlartMessage(msg, flg, mode);
            }
            else if (result.Status == 'EXISTS') {
                //alert('Given Supplier is Already Available...');
                var msg = 'Given Supplier is Already Available...';
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

//function for deleting supplier record
function Delete(ID) {
    //var ans = confirm("Are you sure you want to delete this Record?");
    //if (ans) {
    //    $.ajax({
    //        url: "/Supplier/Delete/" + ID,
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
        url: "/Supplier/getbyID/" + ID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            $('#Name').val(obj.SupplierName);
            CheckSupplierAlloted(ID);

        },
        error: function (errormessage) {
            alert('delet failed..');
        }
    });
    
}



function CheckSupplierAlloted(ID) {

    $.ajax({
        url: "/Supplier/GetSuppRefDetails",
        data: JSON.stringify({ SupplierId: ID }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            CItemList = result;
            if (CItemList.length > 0) {

                for (var x = 0; x < CItemList.length; x++) {

                    var c = CItemList[x].CountSupplierId;

                    if (c > 0) {
                        //alert("Supplier Is Alloted For Some Other Entry,Please Check it....");
                        var msg = 'Supplier Is Alloted For Some Other Entry,Please Check it...';
                        var flg = 4;
                        var mode = 1;
                        AlartMessage(msg, flg, mode);
                    }
                    else {
                        var ans = confirm("Are you sure you want to delete this Record?");
                        if (ans) {
                            LoadingSymb();
                            $.ajax({
                                url: "/Supplier/Delete/" + ID,
                                type: "POST",
                                contentType: "application/json;charset=UTF-8",
                                dataType: "json",
                                success: function (result) {

                                    if (result.Value == 1) {
                                        $('#tbody').DataTable().destroy();
                                        AddUserEntryLog('Master', 'Supplier', 'DELETE', $('#Name').val());
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
//Function for getting the Data Based upon Buyer ID
function getbyID(SupplierID) {
    debugger;
    $('#ddlcity').empty();
    LoadCityDDL("#ddlcity");

    $('#Status').css('border-color', 'lightgrey');
    $('#SupplierId').css('border-color', 'lightgrey');
    $('#fax').css('border-color', 'lightgrey');
    $('#email').css('border-color', 'lightgrey');
    $('#cstno').css('border-color', 'lightgrey');
    $('#cstdate').css('border-color', 'lightgrey');
    $('#tinno').css('border-color', 'lightgrey');
    $('#tindate').css('border-color', 'lightgrey');
    $('#contactname').css('border-color', 'lightgrey');
    $('#mobno').css('border-color', 'lightgrey');
    $('#lookup').css('border-color', 'lightgrey');
    $('#add1').css('border-color', 'lightgrey');
    $('#add2').css('border-color', 'lightgrey');
    $('#add3').css('border-color', 'lightgrey');
    $('#ddlcity').css('border-color', 'lightgrey');
    $('#Name').css('border-color', 'lightgrey');
    $('#zipcode').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $('#gstno').css('border-color', 'lightgrey');

    $.ajax({
        url: "/Supplier/getbyID/" + SupplierID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            $('#SupplierID').val(obj.SupplierId);
            $('#add1').val(obj.Address1);
            $('#add2').val(obj.Address2);
            $('#add3').val(obj.Address3);
            $('#ddlcity').val(obj.CityId);
            $('#Name').val(obj.SupplierName);
            $('#zipcode').val(obj.Zipcode);
            $('#fax').val(obj.Fax);
            $('#email').val(obj.Email);
            $('#cstno').val(obj.cstno);
            $('#cstdate').val(moment(obj.cstdate).format('DD/MM/YYYY'));
            $('#tinno').val(obj.TinNo);
            $('#tindate').val(moment(obj.TinDate).format('DD/MM/YYYY'));
            $('#contactname').val(obj.ContactName);
            $('#mobno').val(obj.MobNo);
            $('#lookup').val(obj.Supplookup);
            $('#gstno').val(obj.GSTNO);
            $('#ddlAuditSupplier').val(obj.AuditSupplierid).trigger('change'),
          
            LoadCountry();

            if (obj.IsActive == "TRUE") {
                $('#Status').prop("checked", true);
            } else {
                $('#Status').prop("checked", false);
            }


            if (obj.ProcessAll == true) {
                $('#chkProcessAll').prop("checked", true);
            } else {
                $('#chkProcessAll').prop("checked", false);
            }
            if (obj.PurchaseAll == true) {
                $('#chkPurchaseAll').prop("checked", true);
            } else {
                $('#chkPurchaseAll').prop("checked", false);
            }
            if (obj.ProcessYarn == true) {
                $('#chkPurchaseYarn').prop("checked", true);
            } else {
                $('#chkPurchaseYarn').prop("checked", false);
            }
            if (obj.ProcessTrims == true) {
                $('#chkPurchaseTrims').prop("checked", true);
            } else {
                $('#chkPurchaseTrims').prop("checked", false);
            }


            if (obj.GstApplicable == "Y") {
                $('#applicale').prop("checked", true);
            } else {
                $('#applicale').prop("checked", false);
            }


            ProcSeq = [];
            var txt = obj.ProcessSet;
            MPro = txt;
            ProcSeq = txt.split(',');

            $("#ddlProcess").val(ProcSeq);



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

function getViewbyID(SupplierID) {
    debugger;
    $('#ddlcity').empty();
    LoadCityDDL("#ddlcity");

    $('#Status').css('border-color', 'lightgrey');
    $('#SupplierId').css('border-color', 'lightgrey');
    $('#fax').css('border-color', 'lightgrey');
    $('#email').css('border-color', 'lightgrey');
    $('#cstno').css('border-color', 'lightgrey');
    $('#cstdate').css('border-color', 'lightgrey');
    $('#tinno').css('border-color', 'lightgrey');
    $('#tindate').css('border-color', 'lightgrey');
    $('#contactname').css('border-color', 'lightgrey');
    $('#mobno').css('border-color', 'lightgrey');
    $('#lookup').css('border-color', 'lightgrey');
    $('#add1').css('border-color', 'lightgrey');
    $('#add2').css('border-color', 'lightgrey');
    $('#add3').css('border-color', 'lightgrey');
    $('#ddlcity').css('border-color', 'lightgrey');
    $('#Name').css('border-color', 'lightgrey');
    $('#zipcode').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $('#gstno').css('border-color', 'lightgrey');

    $.ajax({
        url: "/Supplier/getbyID/" + SupplierID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            $('#SupplierID').val(obj.SupplierId);
            $('#add1').val(obj.Address1);
            $('#add2').val(obj.Address2);
            $('#add3').val(obj.Address3);
            $('#ddlcity').val(obj.CityId);
            $('#Name').val(obj.SupplierName);
            $('#zipcode').val(obj.Zipcode);
            $('#fax').val(obj.Fax);
            $('#email').val(obj.Email);
            $('#cstno').val(obj.cstno);
            $('#cstdate').val(moment(obj.cstdate).format('DD/MM/YYYY'));
            $('#tinno').val(obj.TinNo);
            $('#tindate').val(moment(obj.TinDate).format('DD/MM/YYYY'));
            $('#contactname').val(obj.ContactName);
            $('#mobno').val(obj.MobNo);
            $('#lookup').val(obj.Supplookup);
            $('#gstno').val(obj.GSTNO);
            $('#ddlAuditSupplier').val(obj.AuditSupplierid).trigger('change'),

            LoadCountry();

            if (obj.IsActive == "TRUE") {
                $('#Status').prop("checked", true);
            } else {
                $('#Status').prop("checked", false);
            }

            if (obj.ProcessAll == true) {
                $('#chkProcessAll').prop("checked", true);
            } else {
                $('#chkProcessAll').prop("checked", false);
            }
            if (obj.PurchaseAll == true) {
                $('#chkPurchaseAll').prop("checked", true);
            } else {
                $('#chkPurchaseAll').prop("checked", false);
            }
            if (obj.ProcessYarn == true) {
                $('#chkPurchaseYarn').prop("checked", true);
            } else {
                $('#chkPurchaseYarn').prop("checked", false);
            }
            if (obj.ProcessTrims == true) {
                $('#chkPurchaseTrims').prop("checked", true);
            } else {
                $('#chkPurchaseTrims').prop("checked", false);
            }



            if (obj.GstApplicable == "Y") {
                $('#applicale').prop("checked", true);
            } else {
                $('#applicale').prop("checked", false);
            }



            ProcSeq = [];
            var txt = obj.ProcessSet;
            MPro = txt;
            ProcSeq = txt.split(',');

            $("#ddlProcess").val(ProcSeq);


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


function myProcess(Val) {
    //debugger;
    var foo = [];
    MPro = '';
    $('#ddlProcess :selected').each(function (i, selected) {
        foo[i] = $(selected).val();
        MPro = MPro + "," + foo[i];
    });
}