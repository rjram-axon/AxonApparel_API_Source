
$(document).ready(function () {
    debugger;
    //var Group = $('input[name="Local"]:checked').attr('value');
    //if (Group == 'L') {

    loadGroupData();
    //}
    //else if (Group == 'I') {

    loadUserData();
    //}
    var Group = $('input[name="Local"]:checked').attr('value');
    if (Group == 'L') {

        $('#group').show();
        $('#user').hide();
    }
    else {


        $('#group').hide();
        $('#user').show();
    }
    
    $('#ddlGrouptype').val('0');
    $('#ddlUserGroup').empty();
    LoadGroupNameDDL("#ddlUserGroup");
    LoadEmployeeDDL('#ddlEmployee');
    LoadRoleDDL('#ddlRole');
    $('#duplicatepass').hide();
    LoadCompanyUnitDDL('#UserUnit');
   
});


function AddNewUser() {
    $('#eye').hide();
    debugger;
    var Group = $('input[name="Local"]:checked').attr('value');
    if (Group == 'L') {
        $('#myModal1').show();
        $('#myModal1').modal('show');

        $('#GroupId').val("");
        $('#GroupName').val("");
        $('#txtDescription').val("");
        $('#ddlGrouptype').val('0');
        $('#btnAddG').show();
        $('#btnUpdateG').hide();
    }
    else if (Group == 'I') {
        
        $('#myModal').show();
        $('#myModal').modal('show');


        $('#UserId').val("");
        $('#UserName').val("");
        $('#ddlUserGroup').empty();
        $('#Grouptype').val("");
        $('#Password').val("");
        $('#ConfirmPassword').val("");
        $('#ddlEmployee').empty();
        $('#Question').val("");
        $('#Answer').val("");
        //$('ChangePassword')
        $('#btnAddU').show();
        $('#btnUpdateU').hide();

        LoadEmployeeDDL('#ddlEmployee');
        LoadGroupNameDDL('#ddlUserGroup');
    }

}

function AddGroup() {
    debugger;
    var GroupObj = {
        GroupName: $('#GroupName').val(),
        Description: $('#txtDescription').val(),
        GroupType: $('#ddlGrouptype').val()
    };
    $("#btnAddG").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/UserGroup/AddGroup",
        data: JSON.stringify(GroupObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            }
            else {
                //$('#tbody').DataTable().destroy();
                //loadData();
                AddUserEntryLog('Master', 'UserGroup', 'ADD GROUP', $('#GroupName').val());
                //alert('Data Saved Successfully');
                var msg = 'Data Saved Successfully...';
                var flg = 1;
                var mode = 0;
                AlartMessage(msg, flg, mode);
                $("#btnAddG").attr("disabled", false);
                $('#tblgroupdetails').DataTable().destroy();
                loadGroupData();
                $('#myModal1').modal('hide');
                $('#myModal1').hide();

            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function UpdateGroup() {
    debugger;
    var GroupObj = {
        GroupId: $('#GroupId').val(),
        GroupName: $('#GroupName').val(),
        Description: $('#txtDescription').val(),
        GroupType: $('#ddlGrouptype').val()
    };
    $("#btnUpdateG").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/UserGroup/UpdateGrp",
        data: JSON.stringify(GroupObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            }
            else {
                AddUserEntryLog('Master', 'UserGroup', 'UPDATE GROUP', $('#GroupName').val());
                //$('#tbody').DataTable().destroy();
                //loadData();
                //alert('Data Updated Successfully');
                var msg = 'Data Updated Successfully...';
                var flg = 1;
                var mode = 0;
                AlartMessage(msg, flg, mode);
                $("#btnUpdateG").attr("disabled", false);
                $('#myModal1').modal('hide');
                $('#myModal1').hide();
                //window.location.href = "/UserGroup/UserGroupIndex";
            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function UpdateUser() {
    debugger;
    var UserObj = {
        UserId: $('#UserId').val()
    }
}

function AddUser() {
    debugger;

    var ischecked = false;
    $(":checkbox").each(function () {
        ischecked = $('#ChangePassword').is(":checkbox");
    });
    var pass;
    if (ischecked == true) {
        pass = 'Y';
    }
    else {
        pass = 'N';
    }
    var Multi = 0;
    var MultiChk = $('#Multi_Unit').is(":checkbox");
    if (MultiChk == true) {
        Multi = 1;
    }
    else {
        Multi = 0;
    }
    if ($('#UserName').val().trim() == "") {
        $('#UserName').css('border-color', 'Red');
        return true;
    }
    else {
        $('#UserName').css('border-color', 'lightgrey');
    }

    if ($('#Password').val().trim() == "") {
        $('#Password').css('border-color', 'Red');
        return true;
    }
    else {
        $('#Password').css('border-color', 'lightgrey');
    }

    if ($('#ddlUserGroup').val() == 0) {
        //$('#ddlcity').css('border-color', 'Red');
        $('#ddlUserGroup').siblings(".select2-container").css('border', '1px solid red');
        return true;
    }
    else {

        $('#ddlUserGroup').siblings(".select2-container").css('border', 'lightgrey');
    }
    if ($('#ddlEmployee').val() == 0) {
        //$('#ddlcity').css('border-color', 'Red');
        $('#ddlEmployee').siblings(".select2-container").css('border', '1px solid red');
        return true;
    }
    else {

        $('#ddlEmployee').siblings(".select2-container").css('border', 'lightgrey');
    }
    if ($('#ddlRole').val() == 0) {
        //$('#ddlcity').css('border-color', 'Red');
        $('#ddlRole').siblings(".select2-container").css('border', '1px solid red');
        return true;
    }
    else {

        $('#ddlRole').siblings(".select2-container").css('border', 'lightgrey');
    }
    if ($('#UserUnit').val() == 0) {
        $('#UserUnit').siblings(".select2-container").css('border', '1px solid red');
        return true;
    }
    else {

        $('#UserUnit').siblings(".select2-container").css('border', 'lightgrey');
    }

    var UserObj = {
        Username: $('#UserName').val(),
        GroupId: $('#ddlUserGroup').val(),
        Grouptype: $('#Grouptype').val(),
        Password: $('#Password').val(),
        ConPassword: $('#ConfirmPassword').val(),
        EmployeeId: $('#ddlEmployee').val(),
        Question: $('#Question').val(),
        Answer: $('#Answer').val(),
        ChangePass: pass,
        Roleid: $('#ddlRole').val(),
        UnitId: $('#UserUnit').val(),
        Multiple: Multi,
    };
    LoadingSymb();
    $.ajax({
        url: "/UserGroup/AddUser",
        data: JSON.stringify(UserObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            }
            else {
                AddUserEntryLog('Master', 'User Group', 'ADD USER', $('#UserName').val());
                //alert('Data Saved Successfully');
                var msg = 'Data Saved Successfully...';
                var flg = 1;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                $('#tblUserdetails').DataTable().destroy();
                loadUserData();
                $('#myModal').modal('hide');
                $('#myModal').hide();
            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function UpdateUser() {
    debugger;

    var ischecked = false;
    //$(":checkbox").each(function () {
    ischecked = $('#ChangePassword').is(":checked");
    //});
    var pass;
    if (ischecked == true) {
        pass = 'Y';
    }
    else {
        pass = 'N';
    }
    var Multi = 0; 
    var MultiChk = $('#Multi_Unit').is(":checked");
    if (MultiChk == true) {
        Multi = 1;
    }
    else {
        Multi = 0;
    }

    if ($('#UserName').val().trim() == "") {
        $('#UserName').css('border-color', 'Red');
        return true;
    }
    else {
        $('#UserName').css('border-color', 'lightgrey');
    }

    if ($('#Password').val().trim() == "") {
        $('#Password').css('border-color', 'Red');
        return true;
    }
    else {
        $('#Password').css('border-color', 'lightgrey');
    }

    if ($('#ddlUserGroup').val() == 0) {
        //$('#ddlcity').css('border-color', 'Red');
        $('#ddlUserGroup').siblings(".select2-container").css('border', '1px solid red');
        return true;
    }
    else {

        $('#ddlUserGroup').siblings(".select2-container").css('border', 'lightgrey');
    }
    if ($('#ddlEmployee').val() == 0) {
        //$('#ddlcity').css('border-color', 'Red');
        $('#ddlEmployee').siblings(".select2-container").css('border', '1px solid red');
        return true;
    }
    else {

        $('#ddlEmployee').siblings(".select2-container").css('border', 'lightgrey');
    }
    if ($('#ddlRole').val() == 0) {
        //$('#ddlcity').css('border-color', 'Red');
        $('#ddlRole').siblings(".select2-container").css('border', '1px solid red');
        return true;
    }
    else {

        $('#ddlRole').siblings(".select2-container").css('border', 'lightgrey');
    }
    if ($('#UserUnit').val() == 0) {
        $('#UserUnit').siblings(".select2-container").css('border', '1px solid red');
        return true;
    }
    else {

        $('#UserUnit').siblings(".select2-container").css('border', 'lightgrey');
    }
    var UserObj = {
        UserId: $('#UserId').val(),
        Username: $('#UserName').val(),
        GroupId: $('#ddlUserGroup').val(),
        Grouptype: $('#Grouptype').val(),
        Password: $('#Password').val(),
        ConPassword: $('#ConfirmPassword').val(),
        EmployeeId: $('#ddlEmployee').val(),
        Question: $('#Question').val(),
        Answer: $('#Answer').val(),
        ChangePass: pass,
        Roleid: $('#ddlRole').val(),
        UnitId: $('#UserUnit').val(),
        Multiple: Multi,
    };
    LoadingSymb();
    $.ajax({
        url: "/UserGroup/UpdateUrp",
        data: JSON.stringify(UserObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            }
            else {
                AddUserEntryLog('Master', 'User Group', 'UPDATE USER', $('#UserName').val());
                //alert('Data Saved Successfully');
                var msg = 'Data Updated Successfully...';
                var flg = 1;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                $('#tblUserdetails').DataTable().destroy();
                loadUserData();
                $('#myModal').modal('hide');
                $('#myModal').hide();
            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function loadGroupData() {
    debugger;
    $.ajax({
        type: "GET",
        url: '/UserGroup/GroupList/',
        data: JSON.stringify({}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");
            $('#tblgroupdetails').DataTable({
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
                         { title: "Group Name " },
                         { title: "Description" },
                         { title: "Group Type" },
                         { title: "Action" },
                ]
            });

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function loadUserData() {
    debugger;

    $.ajax({
        type: "GET",
        url: '/UserGroup/UserList/',
        data: JSON.stringify({}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");

            $('#tblUserdetails').DataTable({
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
                         { title: "User Name " },
                         { title: "Group Name" },
                         { title: "Employee" },
                         { title: "Group type" },
                         { title: "Action" },
                ]
            });

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}


function loadGData() {
    debugger;
    $('#group').show();
    $('#user').hide();


}

function loadUData() {
    debugger;
    $('#group').hide();
    $('#user').show();


}

function getbyID(id) {
    var Group = $('input[name="Local"]:checked').attr('value');
    if (Group == 'L') {
        GetGroupId(id);
    }
    else {
        GetUserId(id);
    }
}

function GetGroupId(Id) {
    debugger;
    $('#GroupId').css('border-color', 'lightgrey');
    $('#GroupName').css('border-color', 'lightgrey');
    $('#txtDescription').css('border-color', 'lightgrey');
    $('#ddlGrouptype').css('border-color', 'lightgrey');
    debugger;
    $.ajax({
        url: "/UserGroup/GetGroupId/" + Id,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            $('#GroupId').val(obj.GroupId);
            $('#GroupName').val(obj.GroupName);
            $('#txtDescription').val(obj.Description);
            $('#ddlGrouptype').val(obj.GroupType);
            debugger;
            $('#myModal1').modal('show');
            //  $('#tbody').DataTable().destroy();

            $('#btnUpdateG').show();
            $('#btnAddG').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}


function GetUserId(ID) {
    debugger;
    $('#eye').show();
    $('#UserId').css('border-color', 'lightgrey');
    $('#UserName').css('border-color', 'lightgrey');
    $('#ddlUserGroup').css('border-color', 'lightgrey');
    $('#Grouptype').css('border-color', 'lightgrey');
    $('#Password').css('border-color', 'lightgrey');
    $('#ConfirmPassword').css('border-color', 'lightgrey');
    $('#ddlEmployee').css('border-color', 'lightgrey');
    $('#Question').css('border-color', 'lightgrey');
    $('#Answer').css('border-color', 'lightgrey');
    $('#UserUnit').css('border-color', 'lightgrey');

    $.ajax({
        url: "/UserGroup/GetUserId/" + ID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            $('#UserId').val(obj.UserId);
            $('#UserName').val(obj.Username);
            $('#ddlUserGroup').val(obj.GroupId);
            $('#Grouptype').val(obj.Grouptype);
            $('#Password').val(obj.Password);
            $('#ConfirmPassword').val(obj.ConPassword);
            $('#ddlEmployee').val(obj.EmployeeId);
            $('#Question').val(obj.Question);
            $('#Answer').val(obj.Answer);
            $('#ddlRole').val(obj.Roleid);
            $('UserUnit').val(obj.UnitId);
            if (obj.ChangePass == 'Y') {
                $('#ChangePassword').prop("checked", true);
            }
            else {
                $('#ChangePassword').prop("checked", false);
            }
            if (obj.Multiple == 1) {
                $('#Multi_Unit').prop("checked", true);
            } else {
                $('#Multi_Unit').prop("checked", false);
            }
            $('#myModal').modal('show');
            //  $('#tbody').DataTable().destroy();

            $('#btnUpdateU').show();
            $('#btnAddU').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

function Delete(ID) {
    debugger;
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        LoadingSymb();
        $.ajax({
            url: "/UserGroup/GetGroupId/" + ID,
            typr: "GET",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                var obj = result.Value;
                $('#GroupName').val(obj.GroupName);

                $.ajax({
                    url: "/UserGroup/DeleteGrp/" + ID,
                    type: "POST",
                    contentType: "application/json;charset=UTF-8",
                    dataType: "json",
                    success: function (result) {

                        if (result.Value == 1) {
                            $('#tblgroupdetails').DataTable().destroy();
                            AddUserEntryLog('Master', 'UserGroup', 'DELETE GROUP', $('#GroupName').val());
                            loadGroupData();
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


function DeleteUser(ID) {
    debugger;
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        LoadingSymb();
        $.ajax({
            url: "/UserGroup/GetUserId/" + ID,
            typr: "GET",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                debugger;
                var obj = result.Value;
                $('#UserName').val(obj.Username);

                $.ajax({
                    url: "/UserGroup/DeleteUsr/" + ID,
                    type: "POST",
                    contentType: "application/json;charset=UTF-8",
                    dataType: "json",
                    success: function (result) {
                        debugger;
                        if (result.Value == 1) {
                            $('#tblUserdetails').DataTable().destroy();
                            AddUserEntryLog('Master', 'User Group', 'DELETE USER', $('#UserName').val());
                            loadUserData();
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

function GroupClose() {
    $('#myModal1').modal('hide');
}

function UserClose() {
    $('#myModal').modal('hide');
}

function GroupName() {
    debugger;
    var ID = $('#ddlUserGroup').val();
    $.ajax({
        url: "/UserGroup/GetGName/" + ID,
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Status == 'SUCCESS') {
                var obj = result.Value;
                $('#Grouptype').val(obj[0].GroupType);
            }

        }
    });
}

function ShowPasswordDcrypt() {
    debugger;
    var Password = $('#Password').val();
    $.ajax({
        url: "/UserGroup/ShowPasswordDcrypt/",
        data: JSON.stringify({Pass : Password}),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;            
                var obj = result;
                $('#orginalpass').hide();
                $('#duplicatepass').show();
                $('#txtPassword').val(obj);
        }
    });
}

function ShowPasswordEncrypt() {
    debugger;
    var Password = $('#txtPassword').val();
    $.ajax({
        url: "/UserGroup/ShowPasswordEcrypt/",
        data: JSON.stringify({ Pass: Password }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result;
            $('#duplicatepass').hide();
            $('#orginalpass').show();            
            $('#Password').val(obj);
        }
    });
}