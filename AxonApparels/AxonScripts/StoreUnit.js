/// <reference path="jquery-1.9.1.intellisense.js" />
//Load Data in Table when documents is ready
var CItemList = [];
$(document).ready(function () {
    loadData();
    LoadWorkdivisionDDL("#ddlWK");
    LoadCompanyDDL("#ddlMSCompany");
    //LoadCompanyUnitDDL("#ddlSCompany");
    LoadStoreUnitDDL("#ddlSMainStore,#ddlSCompany");

});


function RadioSMClick() {
    LoadStoreUnitDDL("#ddlSCompany");
}


function RadioSSPClick() {
    LoadCompanyUnitDDL("#ddlSCompany");
}
//Load Data function
function loadData() {
    $.ajax({
        type: "GET",
        url: '/StoreUnit/List/',
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
                         { title: "StoreUnitId", "visible": false },
                         { title: "Store Name" },
                         {title:"Status"},
                         { title: "Action" },
                ]
            });
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

//Function for getting the Data Based upon WorkDivision ID
function getbyID(storeunitId) {
    chk();

    //LoadCompanyDDL("#ddlMSCompany");
    debugger;
    $('#Name').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $.ajax({
        url: "/StoreUnit/getbyID/" + storeunitId,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
           // if (result.Status == 'SUCCESS') {
            $('#StoreUnitId').val(obj.StoreUnitId);
            $('#Name').val(obj.StoreName);
            if (obj.StoreType == 'MS') {
                $('input:radio[name="MSType"][value="M"]').prop('checked', true);
                $('#ddlMSCompany').val(obj.ParentUnitId);
            }
            if (obj.StoreType == 'SS') {
                $('input:radio[name="MSType"][value="S"]').prop('checked', true);
                if (obj.UnitName == 'MS') {
                    $('input:radio[name="SMSType"][value="SM"]').prop('checked', true);
                    $('#ddlSCompany').val(obj.ParentUnitId);
                }
                if (obj.UnitName == 'PU') {
                    $('input:radio[name="SMSType"][value="SP"]').prop('checked', true);
                    $('#ddlSCompany').val(obj.ParentUnitId);
                }
            }
            if (obj.StoreType == 'SC') {
                $('input:radio[name="MSType"][value="E"]').prop('checked', true);
                $('#ddlWK').val(obj.ParentUnitId);
            }

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

function getViewbyID(storeunitId) {
    chk();

    //LoadCompanyDDL("#ddlMSCompany");
    debugger;
    $('#Name').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $.ajax({
        url: "/StoreUnit/getbyID/" + storeunitId,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            // if (result.Status == 'SUCCESS') {
            $('#StoreUnitId').val(obj.StoreUnitId);
            $('#Name').val(obj.StoreName);
            if (obj.StoreType == 'MS') {
                $('input:radio[name="MSType"][value="M"]').prop('checked', true);
                $('#ddlMSCompany').val(obj.ParentUnitId);
            }
            if (obj.StoreType == 'SS') {
                $('input:radio[name="MSType"][value="S"]').prop('checked', true);
                if (obj.UnitName == 'MS') {
                    $('input:radio[name="SMSType"][value="SM"]').prop('checked', true);
                    $('#ddlSCompany').val(obj.ParentUnitId);
                }
                if (obj.UnitName == 'PU') {
                    $('input:radio[name="SMSType"][value="SP"]').prop('checked', true);
                    $('#ddlSCompany').val(obj.ParentUnitId);
                }
            }
            if (obj.StoreType == 'SC') {
                $('input:radio[name="MSType"][value="E"]').prop('checked', true);
                $('#ddlWK').val(obj.ParentUnitId);
            }

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


//Clearing textboxes
function clearTextBox() {
    $('#StoreUnitId').val("");
    $('#Name').val("");
    $('#Status').val("");
    $('#ddlMSCompany').val('0');
    $('#ddlSCompany').val('0');
    $('#ddlWK').val('0');

    $('#Name').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $('#btnUpdate').hide();
    $('#btnAdd').show();
 //   LoadCompanyDDL("#ddlMSCompany");
}

function chk() {
    debugger;
    var MSType = $('input[name="MSType"]:checked').attr('value');
    if (MSType == 'M') {
        LoadMainStore();
    }
    if (MSType == 'S') {
        LoadSubStore();
    }
    if (MSType == 'E') {
        LoadSecStore();
    }
    clearTextBox();
}

//Validation 
function validate() {
    var isValid = true;
    if ($('#Name').val().trim() == "") {
        $('#Name').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Name').css('border-color', 'lightgrey');
    }
    return isValid;
}

function LoadSecStore() {
    $("#SubStoreId").hide();
    $("#SecStoId").show();
    $("#MainStoreId").hide();
    
}
function LoadMainStore() {
    $("#SubStoreId").hide();
    $("#SecStoId").hide();
    $("#MainStoreId").show();
}
function LoadSubStore() {
    $("#SecStoId").hide();
    $("#MainStoreId").hide();
    $("#SubStoreId").show();
    $("#SubStorPrdId").hide();
   
}

//Adding
function Add() {
    var res = validate();
    var type='';
    var puid=0;
    var putype='';
    var MSType = $('input[name="MSType"]:checked').attr('value');
    if (MSType == 'M') {
         type = 'MS';
         puid = $('#ddlMSCompany').val();
       putype = 'CP';
        
    }
    if (MSType == 'S') {
        type = 'SS';
        var st = $('input[name="SMSType"]:checked').attr('value');
        if (st == 'SM') {
            putype = 'MS';
            puid = $('#ddlSCompany').val();
        }
        if (st == 'SP') {
            putype = 'PU';
            puid = $('#ddlSCompany').val();
        }
    }
    if (MSType == 'E') {
         type = 'SC';
        puid = $('#ddlWK').val();
         putype = 'WD';
    }
    if (res == false) {
        return false;
    }
    debugger;
    var checkbox_value = "";
    var ischecked = false;

    var checkbox_value = "";
    $(":checkbox").each(function () {
        ischecked = $('#Status').is(":checked");
    });
    
    var StoreUnitObj = {
        StoreUnitId: $('#StoreUnitId').val(),
        StoreName: $('#Name').val(),
        ParentUnitId:puid,
        UnitName: putype,
        StoreType:type,
        IsActive:ischecked,
    };
    $("#btnAdd").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/StoreUnit/Add",
        data: JSON.stringify(StoreUnitObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            }
            else if (result.Value == -1) {
                //alert('Given StoreUnit is Already Available...');
                var msg = 'Given StoreUnit is Already Available...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }
            else {
                $('#tbody').DataTable().destroy();

                loadData();
                $('#myModal').modal('hide');
                //clearTextBox();
                //alert('Data Saved Successfully');
                var msg = 'Data Saved Successfully...';
                var flg = 1;
                var mode = 0;
                AlartMessage(msg, flg, mode);
                AddUserEntryLog('Master', 'Store', 'ADD', $('#Name').val());
                $("#btnAdd").attr("disabled", false);
            }
           },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Updating 
function Update() {
    var ischecked = false;
    var res = validate();
    var type = '';
    var puid = 0;
    var putype = '';
    var MSType = $('input[name="MSType"]:checked').attr('value');
    if (MSType == 'M') {
        type = 'MS';
        puid = $('#ddlMSCompany').val();
        putype = 'CP';

    }
    if (MSType == 'S') {
        type = 'SS';
        var st = $('input[name="SMSType"]:checked').attr('value');
        if (st == 'SM') {
            putype = 'MS';
            puid = $('#ddlSCompany').val();
        }
        if (st == 'SP') {
            putype = 'PU';
            puid = $('#ddlSCompany').val();
        }
    }
    if (MSType == 'E') {
        type = 'SC';
        puid = $('#ddlWK').val();
        putype = 'WD';
    }
    if (res == false) {
        return false;
    }
    var checkbox_value = "";
    $(":checkbox").each(function () {
        ischecked = $('#Status').is(":checked");
    });
    debugger;
    var storeunitObj = {
        StoreUnitId: $('#StoreUnitId').val(),
        StoreName: $('#Name').val(),
        ParentUnitId: puid,
        UnitName: putype,
        StoreType: type,
        IsActive:ischecked,
    };
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/StoreUnit/Update",
        data: JSON.stringify(storeunitObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
           
            if (result.Status == 'SUCCESS') {
                AddUserEntryLog('Master', 'Store', 'UPDATE', $('#Name').val());
                $('#tbody').DataTable().destroy();
                loadData();
                $('#myModal').modal('hide');
                $('#StoreUnitId').val("");
                $('#Name').val("");
                $('#Status').val("");
                //alert('Data Updated Successfully');
                var msg = 'Data Updated Successfully...';
                var flg = 1;
                var mode = 0;
                AlartMessage(msg, flg, mode);
                $("#btnUpdate").attr("disabled", false);
            }
            else if (result.Status == 'EXISTS') {
                //alert('Given StoreUnit is Already Available...');
                var msg = 'Given StoreUnit is Already Available...';
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

//Deleting 
function Delete(StoreUnitId) {
    //var ans = confirm("Are you sure you want to delete this Record?");
    //if (ans) {
    //    $.ajax({
    //        url: "/StoreUnit/Delete/" + StoreUnitId,
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
        url: "/StoreUnit/getbyID/" + StoreUnitId,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            $('#Name').val(obj.StoreName);
            CheckStoreUnitAlloted(StoreUnitId);

        },
        error: function (errormessage) {
            alert('delet failed..');
        }
    });
    
}

function CheckStoreUnitAlloted(Id) {

    $.ajax({
        url: "/StoreUnit/GetStoreRefDetails",
        data: JSON.stringify({ StoreUnitId: Id }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            CItemList = result;
            if (CItemList.length > 0) {

                for (var x = 0; x < CItemList.length; x++) {

                    var c = CItemList[x].CountStoreId;

                    if (c > 0) {
                        //alert("StoreUnit Is Alloted For Some Other Entry,Please Check it....");
                        var msg = 'StoreUnit Is Alloted For Some Other Entry,Please Check it...';
                        var flg = 4;
                        var mode = 1;
                        AlartMessage(msg, flg, mode);
                    }
                    else {
                        var ans = confirm("Are you sure you want to delete this Record?");
                        AddUserEntryLog('Master', 'Store', 'DELETE', $('#Name').val());
                        if (ans) {
                            LoadingSymb();
                            $.ajax({
                                url: "/StoreUnit/Delete/" + Id,
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
                }
            }
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}