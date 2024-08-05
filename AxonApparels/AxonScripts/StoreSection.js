/// <reference path="jquery-1.9.1.intellisense.js" />
//Load Data in Table when documents is ready
$(document).ready(function () {
   
    loadData();
    LoadStoreUnitDDL("#ddlstoreunit,#ddlSMainStore,#ddlSCompany");
    LoadWorkdivisionDDL("#ddlWK");
    LoadCompanyDDL("#ddlMSCompany");
    chk();
    $(document).on('click', '.btnaddstore', function () {
        debugger;
        $('#StoreUnitId').val("");
        $('#txtName').val("");
        $('#Statusst').val("");
        $("#myModal2").modal('show');

    });

});

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
function strvalidate() {
    var isValid = true;
    if ($('#strName').val() == "") {
        $('#strName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#strName').css('border-color', 'lightgrey');
    }
    return isValid;
}
function Addstore() {
    debugger;
    var res = strvalidate();
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
    debugger;
    var checkbox_value = "";
    var ischecked = false;

    var checkbox_value = "";
    $(":checkbox").each(function () {
        ischecked = $('#strStatus').is(":checked");
    });

    var StoreUnitObj = {
        StoreUnitId: $('#StoreUnitId').val(),
        StoreName: $('#strName').val(),
        ParentUnitId: puid,
        UnitName: putype,
        StoreType: type,
        IsActive: ischecked,
    };

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
               
                //alert('Data Saved Successfully');
                var msg = 'Data Saved Successfully...';
                var flg = 1;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                $('#myModal2').modal('hide');
                //LoadStoreUnitDDL("#ddlstoreunit");
                LoadStoreUnitDDL("#ddlstoreunit,#ddlSMainStore,#ddlSCompany");
            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });

}

//Load Data function
function loadData() {
    // $.ajax({
    // url: "/StoreSection/List",
    //   type: "GET",
    //contentType: "application/json;charset=utf-8",
    // dataType: "json",
    //success: function (result) {
    //  var html = '';
    //debugger;
    //$.each(result, function (key, item) {
    //  html += '<tr>';
    //html += '<td style="visibility:hidden;">' + item.SectionId + '</td>';
    //   html += '<td>' + item.SectionName + '</td>';
    //   html += '<td>' + item.StoreName + '</td>';
    //   html += '<td>' + item.IsActive + '</td>';
    //   html += '<td><a href="#" onclick="return getbyID(' + item.SectionId + ')">Edit</a> | <a href="#" onclick="Delele(' + item.SectionId + ')">Delete</a></td>';
    //  html += '</tr>';
    //            });
    //          $('.tbody').html(html);
    //    },
    //  error: function (errormessage) {
    //    alert(errormessage.responseText);
    // }
    //});
    debugger;
    $.ajax({
        type: "GET",
        url: '/StoreSection/List/',
        data: JSON.stringify({}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");
            $('#tbody').DataTable({
                data: dataSet,
                scrollY: 300,
                //scrollCollapse: true,
                //paging: false,
                //fixedColumns: false,
                //select: false,
                //scrollX: "100%",
                //scrollXInner: "100%",
                //scroller: false,
                //select: {
                //    style: 'single'
                //},
                //"bSort": false,
                columns: [
                         { title: "Section ID", "visible": false },
                         { title: "Store Section " },
                         { title: "Store" },
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

//Function for getting the Data Based upon StoreSection ID
function getbyID(storesectionId) {
   // $('#ddlstoreunit').empty();
   

    $('#Name').css('border-color', 'lightgrey');    
    $('#ddlstoreunit').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $.ajax({
        url: "/StoreSection/GetbyID/" + storesectionId,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;            
            $('#SectionstoreID').val(obj.SectionId);
            //$('#SectionstoreID').val(6);
            $('#Name').val(obj.SectionName);
            $('#ddlstoreunit').val(obj.StoreunitId);
            if (obj.Status == "TRUE") {
                $('#Status').prop("checked", true);
            } else {
                $('#Status').prop("checked", false);
            }
            $('#myModal').modal('show');
            //$('#tbody').DataTable().destroy();

            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

function getViewbyID(storesectionId) {
    // $('#ddlstoreunit').empty();


    $('#Name').css('border-color', 'lightgrey');
    $('#ddlstoreunit').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $.ajax({
        url: "/StoreSection/GetbyID/" + storesectionId,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            $('#SectionstoreID').val(obj.SectionId);
            //$('#SectionstoreID').val(6);
            $('#Name').val(obj.SectionName);
            $('#ddlstoreunit').val(obj.StoreunitId);
            if (obj.Status == "TRUE") {
                $('#Status').prop("checked", true);
            } else {
                $('#Status').prop("checked", false);
            }
            $('#myModal').modal('show');
            //$('#tbody').DataTable().destroy();

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
    
    $('#SectionstoreID').val("");
    $('#Name').val("");
    $('#ddlstoreunit').val("");
    $('#Status').val();

    //$('#Status').val("");
    //var theStatus = $(status).prop('checked',true);
    //if (theStatus) {
    //    $('#Status').prop(":checked", false);
    //}
    $('#Name').css('border-color', 'lightgrey');
    $('#ddlstoreunit').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    //$('#ddlstoreunit').empty();
   // $('#tbody').DataTable().destroy();
    LoadStoreUnitDDL("#ddlstoreunit");

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

    if ($('#ddlstoreunit').val() == 0) {
        $('#ddlstoreunit').siblings(".select2-container").css('border', '1px solid red');
        isValid = false;
    }
    else {
        $('#ddlstoreunit').siblings(".select2-container").css('border', '1px solid lightgrey');
    }

    return isValid;
}

//Add Data Function 
function Add() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var checkbox_value = "";
    var ischecked = false;
            $(":checkbox").each(function () {
        ischecked = $('#Status').is(":checked");
       // if (ischecked) {
       //     checkbox_value += "on";
       // }
       // else {
       //     checkbox_value += "off";
       // }
    });
        
    var StoreSectionObj = {
        //SectionId: $('#SectionstoreID').val(),
        SectionName: $('#Name').val(),
        StoreunitId: $('#ddlstoreunit').val(),
        Status: ischecked,
    };
    $("#btnAdd").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/StoreSection/Add",
        data: JSON.stringify(StoreSectionObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            }
            else if (result.Value == -1) {
                //alert('Given StoreSection is Already Available...');
                var msg = 'Given StoreSection is Already Available...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }
            else {
                //alert('Data Saved Successfully');
                var msg = 'Data Saved Successfully...';
                var flg = 1;
                var mode = 0;
                AlartMessage(msg, flg, mode);
                AddUserEntryLog('Master', 'Store Section', 'ADD', $('#Name').val());
                $("#btnAdd").attr("disabled", false);
                $('#tbody').DataTable().destroy();

                loadData();
                $('#myModal').modal('hide');
                $('#SectionstoreID').val("");
                $('#Name').val("");
                //$('#ddlstoreunit').val("");
               // $('#ddlstoreunit').empty();
                //clearTextBox();
               
            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//function for updating employee's record
function Update() {
    var ischecked = false;
    var res = validate();
    if (res == false) {
        return false;
    }
    var checkbox_value = "";
    $(":checkbox").each(function () {
         ischecked = $('#Status').is(":checked");
     //  if (ischecked) {
      //      checkbox_value += "on";
      //  }
      //  else {
      //      checkbox_value += "off";
      //  }
    });

    var StoreSectionObj = {
        SectionId: $('#SectionstoreID').val(),
        SectionName: $('#Name').val(),
        StoreunitId: $('#ddlstoreunit').val(),
        Status: ischecked,
    };
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/StoreSection/Update",
        data: JSON.stringify(StoreSectionObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
           
            if (result.Status == 'SUCCESS') {
                //alert('Data Updated Successfully');
                var msg = 'Data Updated Successfully...';
                var flg = 1;
                var mode = 0;
                AlartMessage(msg, flg, mode);
                AddUserEntryLog('Master', 'Store Section', 'UPDATE', $('#Name').val());
                $("#btnUpdate").attr("disabled", false);
                $('#tbody').DataTable().destroy();
                loadData();
                $('#myModal').modal('hide');
                $('#SectionstoreID').val("");
                $('#Name').val("");
                //$('#ddlstoreunit').val(""),
                $('#Status').val("");
                
            }
            else if (result.Status == 'EXISTS') {
                alert('Given StoreSection is Already Available...');
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

//function for deleting employee's record
function Delete(StoreSectionId) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        LoadingSymb();

        $.ajax({
            url: "/StoreSection/getbyID/" + StoreSectionId,
            typr: "GET",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                var obj = result.Value;
                $('#Name').val(obj.SectionName);
                AddUserEntryLog('Master', 'Store Section', 'DELETE', $('#Name').val());

                $.ajax({
                    url: "/StoreSection/Delete/" + StoreSectionId,
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
        });
    
    }
}