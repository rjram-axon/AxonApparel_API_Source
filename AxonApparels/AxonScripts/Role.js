var RoleList = [];
var MenuList = [];
var Mode = 0;
var roleid = 0;
var oldsubmeniud = 0;
var newsubmeniud = 0;
var res = 0;
var res2 = 0;
$(document).ready(function () {
    LoadData();
    loadMenudll();
    debugger;


    $(document).on('click', '.btnmaingrdedit', function () {
        debugger;
        Mode = 1;
        //LoadData();

        rowindex = $(this).closest('tr').index();

        var currow = RoleList.slice(rowindex);
        roleid = currow[0]['RoleId'];

        $('#myModal').modal('show');
        $('#myModal').show();
        $('#btnAdd').hide();
        $('#btnDel').hide();
        $('#btnUpdate').show();
        $('#ddlMenuname').val("0");
        $('#ddlSubmenu').val("0");
        getbyID(roleid);
    });

    $(document).on('click', '.btnmaingrddelete', function () {
        debugger;
        var table = $('#tblmainlst').DataTable();
        roleid = table.row($(this).parents('tr')).data()["RoleId"];

        $('#myModal').modal('show');
        $('#myModal').show();
        $('#btnAdd').hide();
        $('#btnUpdate').hide();
        $('#btnDel').show();

        getbyID(roleid);

        //Delete(RoleId);
    });

    $(document).on('click', '.chkall', function () {
        debugger;

        var table = $('#tblmenulst').DataTable();
        var rowid = table.row($(this).parents('tr')).data()["MenuId"];
        // $('#tPAbody tr:eq(' + rowindex + ')').find('td:eq(1)').text(totalamnt);
        //if ($('#chkpfj').is(':checked')) {
        var val = $(this).is(":checked");
        if (val == true) {
            for (var f = 0; f < MenuList.length; f++) {
                if (MenuList[f].MenuId == rowid) {
                    MenuList[f].AllFlg = 1;
                    MenuList[f].AddFlg = 1;
                    MenuList[f].EditFlg = 1;
                    MenuList[f].DelFlg = 1;
                    MenuList[f].PrintFlg = 1;
                }
            }
        }
        else {
            for (var f = 0; f < MenuList.length; f++) {
                if (MenuList[f].MenuId == rowid) {
                    MenuList[f].AllFlg = 0;
                    MenuList[f].AddFlg = 0;
                    MenuList[f].EditFlg = 0;
                    MenuList[f].DelFlg = 0;
                    MenuList[f].PrintFlg = 0;

                }
            }
        }
        //LoadInnerGrid(MenuList);
        var table = $('#tblmenulst').DataTable();
        var data = table.rows().data();

        $('input[id=chkedit]').each(function (ig) {
            if (data[ig].MenuId == rowid && data[ig].AllFlg == 1) {
                var row = $(this).closest('tr');
                //row.find('#chkadd').val(data[ig].Apprate);
                row.find('#chkall').prop("checked", true);
                row.find('#chkadd').prop("checked", true);
                row.find('#chkedit').prop("checked", true);
                row.find('#chkdel').prop("checked", true);
                row.find('#chkprint').prop("checked", true);
            }
            if (data[ig].MenuId == rowid && data[ig].AllFlg == 0) {
                var row = $(this).closest('tr');
                row.find('#chkall').prop("checked", false);
                row.find('#chkadd').prop("checked", false);
                row.find('#chkedit').prop("checked", false);
                row.find('#chkdel').prop("checked", false);
                row.find('#chkprint').prop("checked", false);
            }

        });
    });

    $(document).on('click', '.chkadd', function () {
        debugger;

        var table = $('#tblmenulst').DataTable();
        var rowid = table.row($(this).parents('tr')).data()["MenuId"];
        // $('#tPAbody tr:eq(' + rowindex + ')').find('td:eq(1)').text(totalamnt);
        //if ($('#chkpfj').is(':checked')) {
        var val = $(this).is(":checked");
        if (val == true) {
            for (var f = 0; f < MenuList.length; f++) {
                if (MenuList[f].MenuId == rowid) {
                    MenuList[f].AddFlg = 1;
                    if (MenuList[f].EditFlg == 1 && MenuList[f].DelFlg == 1 && MenuList[f].PrintFlg == 1) {
                        MenuList[f].AllFlg = 1;
                    }
                }
            }
        }
        else {
            for (var f = 0; f < MenuList.length; f++) {
                if (MenuList[f].MenuId == rowid) {
                    MenuList[f].AddFlg = 0;
                    MenuList[f].AllFlg = 0;
                }
            }
        }
        //LoadInnerGrid(MenuList);
        var table = $('#tblmenulst').DataTable();
        var data = table.rows().data();

        $('input[id=chkadd]').each(function (ig) {
            if (data[ig].MenuId == rowid && data[ig].AddFlg == 1) {
                var row = $(this).closest('tr');
                //row.find('#chkadd').val(data[ig].Apprate);
                row.find('#chkadd').prop("checked", true);
            }
            if (data[ig].MenuId == rowid && data[ig].AllFlg == 1) {
                var row = $(this).closest('tr');
                row.find('#chkall').prop("checked", true);
            }
            if (data[ig].MenuId == rowid && data[ig].AllFlg == 0 && data[ig].AddFlg == 0) {
                var row = $(this).closest('tr');
                row.find('#chkall').prop("checked", false);
                row.find('#chkadd').prop("checked", false);
            }
        });
    });



    $(document).on('click', '.chkedit', function () {
        debugger;

        var table = $('#tblmenulst').DataTable();
        var rowid = table.row($(this).parents('tr')).data()["MenuId"];
        // $('#tPAbody tr:eq(' + rowindex + ')').find('td:eq(1)').text(totalamnt);
        //if ($('#chkpfj').is(':checked')) {
        var val = $(this).is(":checked");
        if (val == true) {
            for (var f = 0; f < MenuList.length; f++) {
                if (MenuList[f].MenuId == rowid) {
                    MenuList[f].EditFlg = 1;
                    if (MenuList[f].AddFlg == 1 && MenuList[f].DelFlg == 1 && MenuList[f].PrintFlg == 1) {
                        MenuList[f].AllFlg = 1;
                    }
                }
            }
        }
        else {
            for (var f = 0; f < MenuList.length; f++) {
                if (MenuList[f].MenuId == rowid) {
                    MenuList[f].EditFlg = 0;
                    MenuList[f].AllFlg = 0;
                }
            }
        }
        //LoadInnerGrid(MenuList);
        var table = $('#tblmenulst').DataTable();
        var data = table.rows().data();

        $('input[id=chkedit]').each(function (ig) {
            if (data[ig].MenuId == rowid && data[ig].EditFlg == 1) {
                var row = $(this).closest('tr');
                //row.find('#chkadd').val(data[ig].Apprate);
                row.find('#chkedit').prop("checked", true);
            }
            if (data[ig].MenuId == rowid && data[ig].AllFlg == 1) {
                var row = $(this).closest('tr');
                row.find('#chkall').prop("checked", true);
            }
            if (data[ig].MenuId == rowid && data[ig].AllFlg == 0 && data[ig].EditFlg == 0) {
                var row = $(this).closest('tr');
                row.find('#chkall').prop("checked", false);
                row.find('#chkedit').prop("checked", false);
            }
        });
    });

    $(document).on('click', '.chkdel', function () {
        debugger;

        var table = $('#tblmenulst').DataTable();
        var rowid = table.row($(this).parents('tr')).data()["MenuId"];
        // $('#tPAbody tr:eq(' + rowindex + ')').find('td:eq(1)').text(totalamnt);
        //if ($('#chkpfj').is(':checked')) {
        var val = $(this).is(":checked");
        if (val == true) {
            for (var f = 0; f < MenuList.length; f++) {
                if (MenuList[f].MenuId == rowid) {
                    MenuList[f].DelFlg = 1;
                    if (MenuList[f].AddFlg == 1 && MenuList[f].EditFlg == 1 && MenuList[f].PrintFlg == 1) {
                        MenuList[f].AllFlg = 1;
                    }
                }
            }
        }
        else {
            for (var f = 0; f < MenuList.length; f++) {
                if (MenuList[f].MenuId == rowid) {
                    MenuList[f].DelFlg = 0;
                    MenuList[f].AllFlg = 0;
                }
            }
        }
        //LoadInnerGrid(MenuList);
        var table = $('#tblmenulst').DataTable();
        var data = table.rows().data();

        $('input[id=chkdel]').each(function (ig) {
            if (data[ig].MenuId == rowid && data[ig].DelFlg == 1) {
                var row = $(this).closest('tr');
                //row.find('#chkadd').val(data[ig].Apprate);
                row.find('#chkdel').prop("checked", true);
            }
            if (data[ig].MenuId == rowid && data[ig].AllFlg == 1) {
                var row = $(this).closest('tr');
                row.find('#chkall').prop("checked", true);
            }
            if (data[ig].MenuId == rowid && data[ig].AllFlg == 0 && data[ig].DelFlg == 0) {
                var row = $(this).closest('tr');
                row.find('#chkall').prop("checked", false);
                row.find('#chkdel').prop("checked", false);
            }
        });
    });

    $(document).on('click', '.chkprint', function () {
        debugger;

        var table = $('#tblmenulst').DataTable();
        var rowid = table.row($(this).parents('tr')).data()["MenuId"];
        // $('#tPAbody tr:eq(' + rowindex + ')').find('td:eq(1)').text(totalamnt);
        //if ($('#chkpfj').is(':checked')) {
        var val = $(this).is(":checked");
        if (val == true) {
            for (var f = 0; f < MenuList.length; f++) {
                if (MenuList[f].MenuId == rowid) {
                    MenuList[f].PrintFlg = 1;
                    if (MenuList[f].AddFlg == 1 && MenuList[f].EditFlg == 1 && MenuList[f].DelFlg == 1) {
                        MenuList[f].AllFlg = 1;
                    }
                }
            }
        }
        else {
            for (var f = 0; f < MenuList.length; f++) {
                if (MenuList[f].MenuId == rowid) {
                    MenuList[f].PrintFlg = 0;
                    MenuList[f].AllFlg = 0;
                }
            }
        }
        //LoadInnerGrid(MenuList);
        var table = $('#tblmenulst').DataTable();
        var data = table.rows().data();

        $('input[id=chkprint]').each(function (ig) {
            if (data[ig].MenuId == rowid && data[ig].PrintFlg == 1) {
                var row = $(this).closest('tr');
                //row.find('#chkadd').val(data[ig].Apprate);
                row.find('#chkprint').prop("checked", true);
            }
            if (data[ig].MenuId == rowid && data[ig].AllFlg == 1) {
                var row = $(this).closest('tr');
                row.find('#chkall').prop("checked", true);
            }
            if (data[ig].MenuId == rowid && data[ig].AllFlg == 0 && data[ig].PrintFlg == 0) {
                var row = $(this).closest('tr');
                row.find('#chkall').prop("checked", false);
                row.find('#chkprint').prop("checked", false);
            }
        });
    });
});
//$(document).ready(function () {
//    debugger;
//    window.onbeforeunload = function () { return "Your work will be lost."; };
//});
function Close() {
    debugger;
    //window.onbeforeunload = function (e) {
    //    return 'Dialog text here.';
    //};

    //location.reload(true)
}

function LoadData() {
    debugger;
    var rowCount = $('#tblmainlst tr').length;
    if (rowCount > 0) {
        $('#tblmainlst').DataTable().destroy();
    }

    $.ajax({
        type: "GET",
        url: '/Role/GetRole/',
        data: JSON.stringify({}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            RoleList = json.Value;
            $('#tblmainlst').DataTable({
                data: RoleList,
                columns: [
                    { title: "ID", data: "RoleId", "visible": false },
            { title: "Role", data: "RoleName" },
            { title: "Remarks", data: "Remarks" },
            {
                title: "ACTION", "mDataProp": null,
                "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnmaingrdedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button><button type="button" type="button" data-toggle="tooltip" data-placement="top" title="Delete" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnmaingrddelete btn btn-danger btn-round" onClick=""> <i class="fa fa-times"></i> </button> '
            }
                ]
            });
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function clearTextBox() {
    $('#txtrolename').val("");
    $('#txtrem').val("");

    $('#txtrolename').focus();

    $('#btnAdd').show();
    $('#btnUpdate').hide();
    $('#btnDel').hide();
    $('#ddlMenuname').val("0");
    $('#ddlSubmenu').val("0");
    GetMenu();
    //RoleList = [];
    MenuList = [];
    roleid = 0;
    Mode = 0;
    $('#txtrolename').css('border-color', 'lightgrey');
    //window.onbeforeunload = function () { return "Your work will be lost."; };
}
function GetMenu() {
    debugger;
    if(res2==0){
      var rowCount = $('#tblmenulst tr').length;
    if (rowCount > 0) {
        $('#tblmenulst').DataTable().destroy();
    }
    var menuid = $('#ddlMenuname').val();
    var submenuid = $('#ddlSubmenu').val();
    newsubmeniud = submenuid;

    if (oldsubmeniud > 0) {

        var ans = confirm("Are you want to change without save this Record?");
        if (ans) {

            if (submenuid == null) {
                submenuid = 0
            }
            res = 0;
            //$('#tblmenulst').DataTable().destroy();
            $.ajax({
                url: '/Role/GetMenu/',
                type: "POST",
                data: JSON.stringify({ roleid: roleid, menuid: menuid, submenuid: newsubmeniud }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (jsonres) {
                    debugger;
                    MenuList = jsonres.Value;
                    LoadInnerGrid(MenuList);        
                },
                failure: function (errMsg) {
                    alert(errMsg);
                }
            });
        } else {
            if (submenuid == null) {
                submenuid = 0
            }
            res = 1;           
            $.ajax({
                url: '/Role/GetMenu/',
                type: "POST",
                data: JSON.stringify({ roleid: roleid, menuid: menuid, submenuid: oldsubmeniud }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (jsonres) {
                    debugger;
                    MenuList = jsonres.Value;
                    LoadInnerGrid(MenuList);                 
                    //$('#ddlSubmenu').val(oldsubmeniud);
                },
                failure: function (errMsg) {
                    alert(errMsg);
                }
            });
        }
    } else {
        $.ajax({
            url: '/Role/GetMenu/',
            type: "POST",
            data: JSON.stringify({ roleid: roleid, menuid: menuid, submenuid: newsubmeniud }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (jsonres) {
                debugger;
                MenuList = jsonres.Value;
                LoadInnerGrid(MenuList);             
            },
            failure: function (errMsg) {
                alert(errMsg);
            }
        });
    }
    if (res == 0) {
        oldsubmeniud = submenuid;
        
    }
    else {
        oldsubmeniud = oldsubmeniud;
        res2 = 1;
        $('#ddlSubmenu').val(oldsubmeniud).trigger('change');
        res2 = 0;
    }
}
}

function LoadInnerGrid(list) {

    var rowCount = $('#tblmenulst tr').length;
    if (rowCount > 0) {
        $('#tblmenulst').DataTable().destroy();
    }

    $('#tblmenulst').DataTable({
        data: list,
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
                 { title: "ID", data: "MenuId", "visible": false },
                 { title: "Menu", data: "MenuName" },
                  {
                      title: "All", data: "AllFlg",
                      render: function (data) {
                          return '<input type="checkbox" id="chkall" class="editor-active chkall"  style="width: 50px;text-align: center;"  value=' + data + '>';
                      },
                  },
                 {
                     title: "Add", data: "AddFlg",
                     render: function (data) {
                         return '<input type="checkbox" id="chkadd" class="editor-active chkadd"  style="width: 50px;text-align: center;"  value=' + data + '>';
                     },
                 },
                  {
                      title: "Edit", data: "EditFlg",
                      render: function (data) {
                          return '<input type="checkbox" id="chkedit" class="editor-active chkedit"  style="width: 50px;text-align: center;"  value=' + data + '>';
                      },
                  },
                  {
                      title: "Delete", data: "DelFlg",
                      render: function (data) {
                          return '<input type="checkbox" id="chkdel" class="editor-active chkdel"  style="width: 50px;text-align: center;"  value=' + data + '>';
                      },
                  },
                  {
                      title: "Print", data: "PrintFlg",
                      render: function (data) {
                          return '<input type="checkbox" id="chkprint" class="editor-active chkprint"  style="width: 50px;text-align: center;"  value=' + data + '>';
                      },
                  },
                      { title: "RoleId", data: "RoleMasId", "visible": false },
        ],
    });

    //
    $('input[id=chkall]').each(function () {
        debugger;
        var row = $(this).closest('tr');
        if ($(this).val() == 1) {
            row.find('#chkall').prop('checked', true);
        }
    });

    $('input[id=chkadd]').each(function () {
        debugger;
        var row = $(this).closest('tr');
        if ($(this).val() == 1) {
            row.find('#chkadd').prop('checked', true);
        }
    });

    $('input[id=chkedit]').each(function () {
        debugger;
        var row = $(this).closest('tr');
        if ($(this).val() == 1) {
            row.find('#chkedit').prop('checked', true);
        }
    });

    $('input[id=chkdel]').each(function () {
        debugger;
        var row = $(this).closest('tr');
        if ($(this).val() == 1) {
            row.find('#chkdel').prop('checked', true);
        }
    });

    $('input[id=chkprint]').each(function () {
        debugger;
        var row = $(this).closest('tr');
        if ($(this).val() == 1) {
            row.find('#chkprint').prop('checked', true);
        }
    });
}

//Validation using jquery
function validate() {
    debugger;
    var isValid = true;
    if ($('#txtrolename').val().trim() == "") {
        $('#txtrolename').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtrolename').css('border-color', 'lightgrey');
    }

    return isValid;
}

//Add Data Function 
function Add() {
    debugger;
    var res = validate();
    if (res == false) {
        return false;
    }
    debugger;

    var roleObj = {
        RoleName: $('#txtrolename').val(),
        Remarks: $('#txtrem').val(),
        RoleDetList: MenuList,
    };
    $("#btnAdd").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/Role/Add",
        data: JSON.stringify(roleObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            AddUserEntryLog('Master', 'Role', 'ADD', $('#txtrolename').val());
            $('#tblmenulst').DataTable().destroy();
            $('#myModal').modal('hide');
            $('#txtrolename').val("");
            $('#txtrem').val("");

            //alert('Data Saved Successfully');
            var msg = 'Data Saved Successfully...';
            var flg = 1;
            var mode = 0;
            AlartMessage(msg, flg, mode);
            $("#btnAdd").attr("disabled", false);
            LoadData();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Update Data Function 
function Update() {
    debugger;
    var res = validate();
    if (res == false) {
        return false;
    }
    debugger;

    var roleObj = {
        RoleId: roleid,
        RoleName: $('#txtrolename').val(),
        Remarks: $('#txtrem').val(),
        RoleDetList: MenuList,
    };
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/Role/Update",
        data: JSON.stringify(roleObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            
            if (result.Status == "SUCCESS") {
                AddUserEntryLog('Master', 'Role', 'UPDATE', $('#txtrolename').val());
                $('#tblmenulst').DataTable().destroy();
                // $('#myModal').modal('hide');
                $('#txtrolename').val("");
                $('#txtrem').val("");
                
                //alert('Data updated successfully');
                var msg = 'Data updated Successfully...';
                var flg = 4;
                var mode = 0;
                AlartMessage(msg, flg, mode);
                $("#btnUpdate").attr("disabled", false);
                $('#ddlMenuname').val("0").trigger('change');
                oldsubmeniud = 0;
            }
            else {
                //alert('Data updated failed');
                var msg = 'Data updated failed...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
            }

            LoadData();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function getbyID(RoleID) {
    debugger;
    $('#txtrolename').css('border-color', 'lightgrey');
    var menuid = $('#ddlMenuname').val();
    var submenuid = $('#ddlSubmenu').val();
    if (submenuid == null) {
        submenuid = 0;
    }

    $.ajax({
        url: "/Role/GetRolebyIdEdit/",
        type: "POST",
        data: JSON.stringify({ roleid: roleid, menuid: menuid, submenuid: submenuid }),
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = [];
            obj = result.Value;

            $("#txtrolename").val(obj.RoleName);
            $('#txtrem').val(obj.Remarks);
            MenuList = obj.RoleDetList;
            LoadInnerGrid(MenuList);

            //$.ajax({
            //    type: "POST",
            //    url: '/CommonProductionIssue/GetCommProdIssueitemdetforEdit/',
            //    data: JSON.stringify({ ProdIssueId: ProdIssueId }),
            //    contentType: "application/json; charset=utf-8",
            //    dataType: "json",
            //    success: function (json) {
            //        debugger;
            //        ProductionItemgrid = json;
            //        LoadProdItemStckgrid(ProductionItemgrid);

            //        //Load JobOrder Grid based on first Item
            //        if (ProductionItemgrid != undefined && ProductionItemgrid.length > 0) {
            //            var currowind = ProductionItemgrid.slice(0);
            //            //var ProdDetId = currowind[0]['ProductionDetId'];
            //            ItemId = currowind[0]['ItemId'];
            //            ColorId = currowind[0]['ColorId'];
            //            SizeId = currowind[0]['SizeId'];

            //            fnLoadJobOrderInfoforEdit(ProdIssueId);
            //            //fnLoadItemStockInfoforEdit(ProdIssueId);
            //        }
            //        else {
            //            fnLoadJobOrderInfoforEdit(0);
            //            fnLoadItemStockInfoforEdit(0);
            //        }
            //        //End
            //    },
            //    failure: function (errMsg) {
            //        alert(errMsg);
            //    }
            //});            
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

function Close() {
    debugger;
    //window.onbeforeunload = function (e) {
    //    return 'Dialog text here.';
    //};

    location.reload(true)
}

function Delete() {
    debugger;
    //var roledelid=roleid;
    

            $.ajax({
                url: "/Role/CheckRole/" + roleid,
                type: "GET",
                contentType: "application/json;charset=UTF-8",
                dataType: "json",
                success: function (result) {
                    debugger;

                    if (result.Value) {
                        //alert('The Role has been assigned to some user...');
                        var msg = 'The Role has been assigned to some user...';
                        var flg = 4;
                        var mode = 1;
                        AlartMessage(msg, flg, mode);
                    }
                    else {
                        $("#btnDel").attr("disabled", true);
                        LoadingSymb();
                        $.ajax({
                            url: "/Role/Delete/" + roleid,
                            type: "GET",
                            contentType: "application/json;charset=UTF-8",
                            dataType: "json",
                            success: function (result) {
                                debugger;
                                AddUserEntryLog('Master', 'Role', 'DELETE', $('#txtrolename').val());
                                //alert('Record deleted sucessfully...');
                                var msg = 'Record deleted sucessfully...';
                                var flg = 2;
                                var mode = 0;
                                AlartMessage(msg, flg, mode);
                                $('#myModal').modal('hide');
                                $('#txtrolename').val("");
                                $('#txtrem').val("");

                                LoadData();
                                roleid = 0;
                            }
                        });
                    }


                },
                error: function (errormessage) {
                    alert(errormessage.responseText);
                }
            });
        
}

function loadMenudll() {
    debugger;
    $.ajax({
        type: "GET",
        url: '/Role/GetMenuDetail/',
        data: JSON.stringify({}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            var obj = json.Value;
            if (json.Status == 'SUCCESS') {

                var data = json.Value;

                var menudet = {};
                var menu = [];
                // Gstcode = menu;
                debugger;
                $.each(obj, function (i, el) {

                    if (!menudet[el.MenuId]) {
                        menudet[el.MenuId] = true;
                        menu.push(el);
                    }
                });

                $(ddlMenuname).empty();


                $(ddlMenuname).append($('<option/>').val('0').text('--Select Menu--'));
                $.each(menu, function () {
                    $(ddlMenuname).append($('<option></option>').val(this.MenuId).text(this.MenuName));
                });
            }
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function LoadSubmenu() {
    debugger;   
    var Menuid = $('select#ddlMenuname option:selected').val();   
    loadSubmenudll(Menuid)
}

function loadSubmenudll(Menuid) {
    debugger;
    $.ajax({
        type: "POST",
        url: '/Role/GetSubMenuDetail/',
        data: JSON.stringify({ parentid: Menuid }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            var obj = json.Value;
            if (json.Status == 'SUCCESS') {

                var data = json.Value;

                var submenudet = {};
                var submenu = [];
                // Gstcode = menu;
                debugger;
                $.each(obj, function (i, el) {

                    if (!submenudet[el.MenuId]) {
                        submenudet[el.MenuId] = true;
                        submenu.push(el);
                    }
                });

                $(ddlSubmenu).empty();


                $(ddlSubmenu).append($('<option/>').val('0').text('--Select SubMenu--'));
                $.each(submenu, function () {
                    $(ddlSubmenu).append($('<option></option>').val(this.MenuId).text(this.MenuName));
                });
            }
            if (Mode == 1) {
                getbyID(roleid);
            }
            else {
                GetMenu();
            }
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
