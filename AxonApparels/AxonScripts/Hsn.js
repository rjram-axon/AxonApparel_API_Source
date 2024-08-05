
var CItemList = [];
var Gstcode = [];
var IGstcode = [];

$(document).ready(function () {
    Guserid = $("#hdnUserid").data('value');
    loadData();
    loadGSTdll();
    loadIGSTdll();
})
function loadData() {
    debugger;
    $.ajax({
        type: "GET",
        url: '/HSN/List/',
        data: JSON.stringify({}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
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

                         { title: "HSNID", "visible": false },
                         { title: "HSNcode" },
                         { title: "HSNdesc" },
                         { title: "Ttype", "visible": false},
                         { title: "sortorder","visible": false },
                         { title: "rstatus", "visible": false},
                         { title: "GSTtaxcode" },
                         { title: "IGSTtaxcode" },
                         { title: "Action" }
                ]

            });

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function loadGSTdll() {
    debugger;
    $.ajax({
        type: "GET",
        url: '/HSN/LoadGstDetail/',
        data: JSON.stringify({}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            var obj = json.Value;
            if (json.Status == 'SUCCESS') {

                var data = json.Value;

                var gstdet = {};
                var gst = [];
                Gstcode = gst;
                debugger;
                $.each(obj, function (i, el) {

                    if (!gstdet[el.id]) {
                        gstdet[el.id] = true;
                        gst.push(el);
                    }
                });

                $(ddlGSTtaxcode).empty();


                $(ddlGSTtaxcode).append($('<option/>').val('0').text('--Select GST TaxCode--'));
                $.each(gst, function () {
                    $(ddlGSTtaxcode).append($('<option></option>').val(this.id).text(this.GSTtaxcode));
                });
            }
            },
            failure: function (errMsg) {
                alert(errMsg);
            }       
    });
}
function loadIGSTdll() {
    debugger;
    $.ajax({
        type: "GET",
        url: '/HSN/LoadIGstDetail/',
        data: JSON.stringify({}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            var obj = json.Value;
            if (json.Status == 'SUCCESS') {

                var data = json.Value;

                var gstdet = {};
                var gst = [];
                IGstcode = gst;
                debugger;
                $.each(obj, function (i, el) {

                    if (!gstdet[el.id]) {
                        gstdet[el.id] = true;
                        gst.push(el);
                    }
                });

                $(ddlIGSTtaxcode).empty();


                $(ddlIGSTtaxcode).append($('<option/>').val('0').text('--Select IGST TaxCode--'));
                $.each(gst, function () {
                    $(ddlIGSTtaxcode).append($('<option></option>').val(this.id).text(this.GSTtaxcode));
                });
            }
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function Add() {
    debugger;
    var isAct = false;
    var res = validate();
    if (res == false) {
        return false;
    }
    //var res2 = validateGSTddl();
    //if (res2 == false) {
    //    return false;
    //}
    //var res4 = validateIGSTddl();
    //if (res4 == false) {
    //    return false;
    //}
    var res3 = validatechk();
    if (res3 == false) {
        return false;
    }
    var checkbox_value = "";
    $(":checkbox").each(function () {
        ischecked = $('#rstatus').is(":checked");
    });
    if (ischecked == true) {
        checkbox_value = 'A';
    }
    else {
        checkbox_value = '';
    }
    GSTtaxcode = $('select#ddlGSTtaxcode option:selected').text();
    IGSTtaxcode = $('select#ddlIGSTtaxcode option:selected').text();
   // var rstatus = $('input[name="rstatus"]:checked').attr('value');
    var HSNObj = {
        HSNid: $('#HSNid').val(),
        HSNcode: $('#txtHSNcode').val(),
        HSNdesc: $('#txtHSNdesc').val(),
        Ttype: "",
        sortorder: "",
        GSTtaxcode: GSTtaxcode,
        IGSTtaxcode: IGSTtaxcode,
        enteredby: Guserid,
        modifiedby: "",
        modifiedDate: "",      
        rstatus: checkbox_value,

    };
    $("#btnAdd").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/HSN/Add",
        data: JSON.stringify(HSNObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            } else if (result.Value == -1) {
                //alert('Given HSNCode is Already Available...');
                var msg = 'Given HSN Code is Already Available...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);

                return true;
            }
            else {
                AddUserEntryLog('Master', 'HSN', 'ADD', $('#txtHSNcode').val());

                //alert('Data Added Successfully');
                var msg = 'Data Added Successfully...';
                var flg = 1;
                var mode = 0;
                AlartMessage(msg, flg, mode);
                $('#tbody').DataTable().destroy();
                loadData();
                $('#myModal').modal('hide');
                $('#HSNid').val("");
                $('#HSNcode').val("");
                $('#HSNdesc').val("");
                $('#Ttype').val("");
                $('#GSTtaxcode').val("");
                $('#enteredby').val("");
                $('#modifiedby').val("");
                $('#modifiedDate').val("");               
                $('input[name="rstatus"]').prop('checked', false);
                $("#btnAdd").attr("disabled", false);
            }


        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function Update() {
    debugger;
    var HSNid = $('#HSNid').val();
    CheckHSNAllotedUpdate(HSNid);
}
function CheckHSNAllotedUpdate(HSNid) {

    $.ajax({
        url: "/HSN/GetHSNRefDetails",
        data: JSON.stringify({ HSNid: HSNid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            CItemList = result;
            if (CItemList.length > 0) {

                for (var x = 0; x < CItemList.length; x++) {

                    var c = CItemList[x].HSNid;

                    if (c > 0) {
                        //alert("HSN Is Alloted For Some Other Entry,Please Check it....");
                        var msg = 'HSN Is Alloted For Some Other Entry,Please Check it...';
                        var flg = 4;
                        var mode = 1;
                        AlartMessage(msg, flg, mode);

                    }
                    else {
                        var ans = confirm("Are you sure you want to Update this Record?");
                        if (ans) {
                            LoadingSymb();
                            var Ch = $('#HSNid').val()
                            var res = validate();
                            if (res == false) {
                                return false;
                            }
                            var checkbox_value = "";
                            $(":checkbox").each(function () {
                                ischecked = $('#rstatus').is(":checked");
                            });

                            var rstatus = $('input[name="rstatus"]:checked').attr('value');
                            var HSNObj = {
                                HSNid: $('#HSNid').val(),
                                HSNcode: $('#txtHSNcode').val(),
                                HSNdesc: $('#txtHSNdesc').val(),
                                Ttype: $('#txtTtype').val(),
                                sortorder: $('#sortorder').val(),
                                GSTtaxcode: $('#txtGSTCode').val(),
                                IGSTtaxcode: $('#txtIGSTCode').val(),
                                enteredby: "",
                                modifiedby: Guserid,
                                modifiedDate: "",
                                rstatus: ischecked == "False" ? "" : "A",
                            };
                            $("#btnUpdate").attr("disabled", true);
                            LoadingSymb();
                            $.ajax({
                                url: "/HSN/Update",
                                data: JSON.stringify(HSNObj),
                                type: "POST",
                                contentType: "application/json;charset=utf-8",
                                dataType: "json",
                                success: function (result) {

                                    if (result.Status == 'SUCCESS') {
                                        AddUserEntryLog('Master', 'HSN', 'UPDATE', $('#txtHSNcode').val());

                                        //alert('Data Updated Successfully');
                                        var msg = 'Data Updated Successfully...';
                                        var flg = 1;
                                        var mode = 0;
                                        AlartMessage(msg, flg, mode);
                                        $('#tbody').DataTable().destroy();
                                        loadData();
                                        $('#myModal').modal('hide');
                                        $('#HSNid').val("");
                                        $('#HSNcode').val("");
                                        $('#HSNdesc').val("");
                                        $('#Ttype').val("");
                                        $('#GSTtaxcode').val("");
                                        $('#enteredby').val("");
                                        $('#modifiedby').val("");
                                        $('#modifiedDate').val("");
                                        $('input[name="rstatus"]').prop('checked', false);
                                        $("#btnUpdate").attr("disabled", false);
                                    }
                                    else if (result.Status == 'EXISTS') {
                                        //alert('Given HSNCode is Already Available...');
                                        var msg = 'Given HSN Code is Already Available...';
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
                    }
                }
            }
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function validate() {
    var isValid = true;
    if ($('#txtHSNcode').val().trim() == "") {
        $('#txtHSNcode').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtHSNcode').css('border-color', 'lightgrey');
    }
    if ($('#txtHSNdesc').val().trim() == "") {
        $('#txtHSNdesc').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtHSNdesc').css('border-color', 'lightgrey');
    }

    if ($('#ddlGSTtaxcode').val().trim() == 0) {
        isValid = false;
        $('#ddlGSTtaxcode').siblings(".select2-container").css('border', '1px solid red');
        //alert("Select GST TaxCode");
    }
    else {
        $('#ddlGSTtaxcode').siblings(".select2-container").css('border', '1px lightgrey');
    }

    if ($('#ddlIGSTtaxcode').val().trim() == 0) {
        isValid = false;
        $('#ddlIGSTtaxcode').siblings(".select2-container").css('border', '1px solid red');
        //alert("Select IGST TaxCode");
    }
    else {
        $('#ddlIGSTtaxcode').siblings(".select2-container").css('border', '1px lightgrey');
    }
    //if ($('#txtIGSTCode').val().trim() == "") {
    //    $('#txtIGSTCode').css('border-color', 'Red');
    //    isValid = false;
    //}
    //else {
    //    $('#txtIGSTCode').css('border-color', 'lightgrey');
    //}
    //if ($('#rstatus').prop("checked") == false) {
    //    $("#rstatus").css('color', 'red');
    //    isValid = false;
    //        alert("Checkbox is Unchecked.");
    //    }
     return isValid;
}
function validatechk() {
    var isValid = true;
    
    if ($('#rstatus').prop("checked") == false) {
        isValid = false;
        //alert("Checkbox is Unchecked.");
        var msg = 'Checkbox is Unchecked...';
        var flg = 4;
        var mode = 1;
        AlartMessage(msg, flg, mode);
    }
    return isValid;
}
//function validateGSTddl() {
//    var isValid = true;

//    if ($('#ddlGSTtaxcode').val().trim() == 0) {
//        isValid = false;
//        $('#ddlGSTtaxcode').siblings(".select2-container").css('border', '1px solid red');
//        //alert("Select GST TaxCode");
//    }
//    else {
//        $('#ddlGSTtaxcode').siblings(".select2-container").css('border', '1px lightgrey');
//    }
//    return isValid;
//}
//function validateIGSTddl() {
//    var isValid = true;

//    if ($('#ddlIGSTtaxcode').val().trim() == 0) {
//        isValid = false;
//        $('#ddlIGSTtaxcode').siblings(".select2-container").css('border', '1px solid red');
//        //alert("Select IGST TaxCode");
//    }
//    else {
//        $('#ddlIGSTtaxcode').siblings(".select2-container").css('border', '1px lightgrey');
//    }
//    return isValid;
//}
function getbyID(id) {
    debugger;
    $('#txtHSNcode').css('border-color', 'lightgrey');
    $('#txtHSNdesc').css('border-color', 'lightgrey');
    $('#ddlGSTtaxcode').siblings(".select2-container").css('border', '1px lightgrey');
    $('#ddlIGSTtaxcode').siblings(".select2-container").css('border', '1px lightgrey');
    $.ajax({
        url: "/HSN/getbyID/" + id,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            var selected = obj.HSNid;
            if (selected == "+") {
                $('input:radio[name="HSNcode"][value="+"]').prop('checked', true);
            } else {
                $('input:radio[name="HSNcode"][value="-"]').prop('checked', true);
            };

            if (result.Status == 'SUCCESS') {
                $('#HSNid').val(obj.HSNid);
                $('#txtHSNcode').val(obj.HSNcode);
                $('#txtHSNdesc').val(obj.HSNdesc);
                $('#txtTtype').val(obj.Ttype);              
                var id = 0;
                for (i = 0; i < Gstcode.length; i++) {
                    if (Gstcode[i].GSTtaxcode.trim() == obj.GSTtaxcode.trim()) {
                        id = Gstcode[i].id;
                    }
                }
                $('#ddlGSTtaxcode').val(id);
                $('#enteredby').val(obj.enteredby);
                $('#modifiedby').val(obj.modifiedby);
                var igstid = 0;
                for (i = 0; i < IGstcode.length; i++) {
                    if (IGstcode[i].GSTtaxcode == obj.IGSTtaxcode) {
                        igstid = IGstcode[i].id;
                    }
                }
                $('#ddlIGSTtaxcode').val(igstid);
               // $('#txtIGSTCode').val(obj.IGSTtaxcode);
                $('#sortorder').val(obj.sortorder);

                if (obj.rstatus == "A") {
                    $('#rstatus').prop("checked", true);
                } else {
                    $('#rstatus').prop("checked", false);
                }
                debugger;
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

function getViewbyID(id) {
    debugger;
    $('#txtHSNcode').css('border-color', 'lightgrey');
    $('#txtHSNdesc').css('border-color', 'lightgrey');
    $('#ddlGSTtaxcode').siblings(".select2-container").css('border', '1px lightgrey');
    $('#ddlIGSTtaxcode').siblings(".select2-container").css('border', '1px lightgrey');
    $.ajax({
        url: "/HSN/getbyID/" + id,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            var selected = obj.HSNid;
            if (selected == "+") {
                $('input:radio[name="HSNcode"][value="+"]').prop('checked', true);
            } else {
                $('input:radio[name="HSNcode"][value="-"]').prop('checked', true);
            };

            if (result.Status == 'SUCCESS') {
                $('#HSNid').val(obj.HSNid);
                $('#txtHSNcode').val(obj.HSNcode);
                $('#txtHSNdesc').val(obj.HSNdesc);
                $('#txtTtype').val(obj.Ttype);
                var id = 0;
                for (i = 0; i < Gstcode.length; i++) {
                    if (Gstcode[i].GSTtaxcode.trim() == obj.GSTtaxcode.trim()) {
                        id = Gstcode[i].id;
                    }
                }
                $('#ddlGSTtaxcode').val(id);
                $('#enteredby').val(obj.enteredby);
                $('#modifiedby').val(obj.modifiedby);
                var igstid = 0;
                for (i = 0; i < IGstcode.length; i++) {
                    if (IGstcode[i].GSTtaxcode == obj.IGSTtaxcode) {
                        igstid = IGstcode[i].id;
                    }
                }
                $('#ddlIGSTtaxcode').val(igstid);
                // $('#txtIGSTCode').val(obj.IGSTtaxcode);
                $('#sortorder').val(obj.sortorder);

                if (obj.rstatus == "A") {
                    $('#rstatus').prop("checked", true);
                } else {
                    $('#rstatus').prop("checked", false);
                }
                debugger;
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
function Delete(HSNid) {
    debugger;
    $.ajax({
        url: "/HSN/getbyID/" + HSNid,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            $('#txtHSNcode').val(obj.HSNcode);
            CheckHSNAlloted(HSNid);

        },
        error: function (errormessage) {
            alert('delete failed..');
        }
    });

    
}
function clearTextBox() {
    $('#HSNid').val("");
    $('#txtHSNcode').val("");
    $('#txtHSNdesc').val("");
    $('#txtTtype').val("");
    $('#sortorder').val("");
    $('#ddlGSTtaxcode').val("0");
    $('#ddlIGSTtaxcode').val("0");
    $('#modifiedDate').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#HSNid').css('border-color','lightgrey');
    $('#txtHSNcode').css('border-color', 'lightgrey');
    $('#txtHSNdesc').css('border-color', 'lightgrey');
    $('#txtTtype').css('border-color', 'lightgrey');
    $('#txtGSTCode').css('border-color', 'lightgrey');
    $('#modifiedby').css('border-color', 'lightgrey');
    $('#enteredby').css('border-color', 'lightgrey');
    $('#modifiedby').css('border-color', 'lightgrey');
    $('#modifiedDate').css('border-color', 'lightgrey');   
    $('#Status').css('border-color', 'lightgrey');
    $('#ddlGSTtaxcode').siblings(".select2-container").css('border', '1px lightgrey');
    $('#ddlIGSTtaxcode').siblings(".select2-container").css('border', '1px lightgrey');
    //$('input[name="rstatus"]').prop('checked', false);
    $('#rstatus').prop('checked', false);
}
function CheckHSNAlloted(HSNid) {

    $.ajax({
        url: "/HSN/GetHSNRefDetails",
        data: JSON.stringify({ HSNid: HSNid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            CItemList = result;
            if (CItemList.length > 0) {

                for (var x = 0; x < CItemList.length; x++) {

                    var c = CItemList[x].HSNid;

                    if (c > 0) {
                        //alert("HSN Is Alloted For Some Other Entry,Please Check it....");
                        var msg = 'HSN Is Alloted For Some Other Entry,Please Check it...';
                        var flg = 4;
                        var mode = 1;
                        AlartMessage(msg, flg, mode);
                    }
                    else {
                        var ans = confirm("Are you sure you want to delete this Record?");
                        if (ans) {
                            LoadingSymb();
                            $.ajax({
                                url: "/HSN/Delete/" + HSNid,
                                type: "POST",
                                contentType: "application/json;charset=UTF-8",
                                dataType: "json",
                                success: function (result) {

                                    if (result.Value == 1) {
                                        AddUserEntryLog('Master', 'HSN', 'DELETE', $('#txtHSNcode').val());
                                        //alert('Data Deleted Successfully');
                                        var msg = 'Data Deleted Successfully...';
                                        var flg = 2;
                                        var mode = 1;
                                        AlartMessage(msg, flg, mode);
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
                }
            }
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}