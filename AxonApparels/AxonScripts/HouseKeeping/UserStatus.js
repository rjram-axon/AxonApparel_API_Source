var Mainlist = [];
var password = 'M';
var userid = 0;
$(document).ready(function () {

    $('#myModal1').modal('show');

    LoadLoginStatus();
    LoadGroupNameDDL('#ddlUserGroup');
    LoadEmployeeDDL('#ddlEmplyee');

    $(document).on('click', '.Login', function () {
       
        var table = $('#tblUserStatus').DataTable();
        var rowid = table.row($(this).parents('tr')).data()["UserId"];
        var val = $(this).is(":checked");
        if (val == true) {
            for (var f = 0; f < Mainlist.length; f++) {
                if (Mainlist[f].UserId == rowid) {
                    Mainlist[f].LoginStatus = 'Y';
                }
            }
        }
        else {
            for (var f = 0; f < Mainlist.length; f++) {
                if (Mainlist[f].UserId == rowid) {
                    Mainlist[f].LoginStatus = 'N';
                }
            }
        }
        var table = $('#tblUserStatus').DataTable();
        var data = table.rows().data();

        $('input[id=Login]').each(function (ig) {
            if (data[ig].UserId == rowid && data[ig].LoginStatus == 'Y') {
                var row = $(this).closest('tr');
                row.find('#Login').prop("checked", true);
            }
            if (data[ig].UserId == rowid && data[ig].LoginStatus == 'N') {
                var row = $(this).closest('tr');
                row.find('#Login').prop("checked", false);
            }
        });
    });

    $(document).on('click', '.MaskPassword', function () {
        var val = $(this).is(":checked");
        if (val == true) {
            password = "U"
            $('#tblUserStatus').DataTable().destroy();
            LoadLoginStatus();
        }
        else {
            password = "M"
            $('#tblUserStatus').DataTable().destroy();
            LoadLoginStatus();
        }
    });

    $(document).on('click', '.btnUserStatusedit', function () {
       
        if (password == "U") {
        var table = $('#tblUserStatus').DataTable();
        UserId = table.row($(this).parents('tr')).data()["UserId"];
        Username = table.row($(this).parents('tr')).data()["Username"];
        Password = table.row($(this).parents('tr')).data()["Password"];
        EmployeeId = table.row($(this).parents('tr')).data()["EmployeeId"];
        Employee = table.row($(this).parents('tr')).data()["Employee"];
        GroupId = table.row($(this).parents('tr')).data()["GroupId"];
        GroupName = table.row($(this).parents('tr')).data()["GroupName"];
        userid = UserId;
        $('#ddlUserGroup').val(GroupId).trigger('change');
        $('#ddlEmplyee').val(EmployeeId).trigger('change');
        $('#txtUsername').val(Username);
        $('#txtpassword').val(Password);
    }
    });

    $(document).on('click', '#btnUserstatusupdate', function () {
       
        for (i = 0; Mainlist.length > i;i++){
            if(Mainlist[i].UserId == userid){            
                Mainlist[i].GroupId = $('#ddlUserGroup').val();
                Mainlist[i].GroupName = $("#ddlUserGroup option:selected").text();
                Mainlist[i].EmployeeId = $('#ddlEmplyee').val();
                Mainlist[i].Employee = $("#ddlEmplyee option:selected").text();
                Mainlist[i].Username = $('#txtUsername').val();
                Mainlist[i].Password = $('#txtpassword').val();          
            }     
        }
        $('#tblUserStatus').DataTable().destroy();
        LoadMainList();
        $('#ddlUserGroup').val(0).trigger('change');
        $('#ddlEmplyee').val('').trigger('change');
        $('#txtUsername').val('');
        $('#txtpassword').val('');
    });
})
function LoadLoginStatus(){
    $.ajax({
        url: "/UserStatus/ListUserStatus",
        data: JSON.stringify({ Password: password }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
          
            Mainlist = json.data.Data;
            LoadMainList();         
        }
    });
}

function LoadMainList() {
          
            $('#tblUserStatus').DataTable({
                data: Mainlist,
                scrollY: 300,
                scrollCollapse: true,
                paging: false,
                fixedColumns: false,
                select: false,
                scrollX: "100%",
                scrollXInner: "100%",
                scroller: false,
                "bSort": false,

                columns: [
                         { title: "UserId", data: "UserId", "visible": false },
                         { title: "UserName", data: "Username" },
                         { title: "Password", data: "Password" },
                         { title: "EmployeeId", data: "EmployeeId", "visible": false },
                         { title: "Employee", data: "Employee" },
                         { title: "GroupId", data: "GroupId", "visible": false },
                         { title: "UserGroup", data: "GroupName" },             
                          {
                              title: "Login", data: "LoginStatus",
                              render: function (data) {
                                  return '<input type="checkbox" id="Login" class="editor-active Login"  style="width: 50px;text-align: center;"  value=' + data + '>';
                              },
                          },
                         {
                             title: "ACTION", "mDataProp": null,
                             "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnUserStatusedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button> <i class="fa fa-trash-o" style="cursor: pointer;display:none;"></i></a>'//<button type="button" class="btnsizeview"> View Color </button>
                         }
                ]

            });

            $('input[id=Login]').each(function () {
               
                var row = $(this).closest('tr');
                if ($(this).val() == "Y") {
                    row.find('#Login').prop('checked', true);
                }
            });

            $(document).ready(function () {
                var table = $('#tblUserStatus').DataTable();

                $('#tblUserStatus tbody').on('click', 'tr', function () {
                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');
                    }
                    else {
                        table.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');
                    }
                });


            });
}
function Update() {
   
    if (password == "U") {
    var mainlistobj = {
        UserStatusList: Mainlist
    };
    LoadingSymb();
    $.ajax({
        url: "/UserStatus/UpdateUserStatus",
        data: JSON.stringify(mainlistobj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Status == "SUCCESS") {
                //alert("Record updated successfully...");        
                var msg = 'Record updated successfully...';
                var flg = 1;
                var mod = 1;
                var ur = "";
                AlartMessage(msg, flg, mod, ur);
                //$('#myModal2').modal('hide');
                $('#tblUserStatus').DataTable().destroy();
                LoadMainList();
                AddUserEntryLog('Setup And Registration', 'UserStatus', 'UPDATE', '');
            }
            else {
                //alert("Record updated failed...");
                var msg = 'Record updated failed...';
                var flg = 4;
                var mod = 1;
                var ur = "";
                AlartMessage(msg, flg, mod, ur);
            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
}
function CheckSuperUser(){
    
    var PassW = $('#txtSuperuserpassword').val();
    $.ajax({
        url: "/Login/ValidateUser",
        data: JSON.stringify({ Username: "superuser", Password: PassW, Remember:1 }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            obj = json;
            if (obj == true) {
                $('#myModal1').modal('hide');
                $('#myModal2').modal('show');
            }
            else {
                //alert("Invalid Password");
                var msg = 'Invalid Password...';
                var flg = 4;
                var mod = 1;
                var ur = "";
                AlartMessage(msg, flg, mod, ur);
                $('#txtSuperuserpassword').val('');
            }
        }       
        });
}
function Close() {
    window.location.href = "/DefaultPage/DefaultPage";
    $('#myModal2').modal('hide');
    $('#myModal1').modal('hide');
}
function backtomain() {
    window.location.href = "/DefaultPage/DefaultPage";

}