var SetupList = [];

$(document).ready(function () {
    LoadEmployeeDll();
    LoadStoreDll();
    LoadMaingrid();


    $(document).on('click', '.groupIssue', function () {
        debugger;

        var table = $('#tblSetdetails').DataTable();
        var Storeid = table.row($(this).parents('tr')).data()["Storeid"];
       

        var val = $(this).is(":checked");
        if (val == true) {
            for (var f = 0; f < SetupList.length; f++) {
                if (SetupList[f].Storeid == Storeid) {
                    SetupList[f].Issue = 1;

                }
            }
        }
        else {
            for (var f = 0; f < SetupList.length; f++) {
                if (SetupList[f].Storeid == Storeid) {
                    SetupList[f].Issue = 0;

                }
            }
        }
   
    });

    $(document).on('click', '.groupreceipt', function () {
        debugger;

        var table = $('#tblSetdetails').DataTable();
        var Storeid = table.row($(this).parents('tr')).data()["Storeid"];

        var val = $(this).is(":checked");
        if (val == true) {
            for (var f = 0; f < SetupList.length; f++) {
                if (SetupList[f].Storeid == Storeid) {
                    SetupList[f].Receipt = 1;

                }
            }
        }
        else {
            for (var f = 0; f < SetupList.length; f++) {
                if (SetupList[f].Storeid == Storeid) {
                    SetupList[f].Receipt = 0;

                }
            }
        }

    });

});

function clearTextBox() {
    $('#btnDelete').hide();
    $('#btnAdd').show();
    $('#btnUpdate').hide();

    $('#ddlEmployee').val('0');
    $("#ddlEmployee").prop("disabled", false);
    LoadAdd();
}

function LoadAdd() {
    debugger;

    $.ajax({
        url: "/StoreSetup/GetAddSetup/",
        type: "GET",
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            SetupList = (result.Value);

            $.each(SetupList, function (index, value) {
                this.Employeeid = $('#ddlEmployee option:selected').val();
                this.Employee = $('#ddlEmployee option:selected').text();
            })


            loadSetupTable();
        },

        error: function (errormessage) {
        alert(errormessage.responseText);
        }

        });

}

function getbyID(id) {

    $('#btnDelete').hide();
    $('#btnAdd').hide();
    $('#btnUpdate').show();
    $('#myModal').modal('show');
    LoadEdit(id);

}

function getViewbyID(id) {

    $('#btnDelete').hide();
    $('#btnAdd').hide();
    $('#btnUpdate').hide();
    $('#myModal').modal('show');
    LoadEdit(id);

}
function GetDelete(id) {
    $('#btnDelete').show();
    $('#btnAdd').hide();
    $('#btnUpdate').hide();
    $('#myModal').modal('show');
    LoadEdit(id);
}

function LoadEmpAdd() {
    debugger;
    var id = $('#ddlEmployee').val();

    if (id != 0) {
        $.ajax({
            url: "/StoreSetup/GetEditSetup/" + id,
            type: "POST",
            async: false,
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                var obj = result.Value;
                debugger;
                SetupList = (result.Value);

                cnt = 0;
                $.each(SetupList, function (index, value) {
                    if (this.Employeeid == id) {
                        cnt++;
                    }
                  
                });
                if (cnt > 0) {
                    //alert('This Employee already have rights...');
                    var msg = 'This Employee already have rights...';
                    var flg = 4;
                    var mode = 1;
                    AlartMessage(msg, flg, mode);
                    $("#btnAdd").attr("disabled", true);
                    return true;
                }
                else {
                    LoadAdd();
                    $("#btnAdd").attr("disabled", false);
                }
                
            },

            error: function (errormessage) {
                alert(errormessage.responseText);
            }

        });
    } else {
        $("#btnAdd").attr("disabled", false);
        LoadAdd();
    }

}

function LoadEdit(id) {
    $.ajax({
        url: "/StoreSetup/GetEditSetup/"+id,
        type: "POST",
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            SetupList = (result.Value);

            var empid = 0;
            var emp = '';
            var cnt = 0;
            $.each(SetupList, function (index, value) {
                if (this.Employeeid > 0 && cnt ==0)
                {
                    empid = this.Employeeid;
                    emp = this.Employee;
                    cnt++;
                }
              
            })

            $.each(SetupList, function (index, value) {
                this.Employeeid = empid;
                this.Employee = emp;
            })


            if (SetupList.length > 0) {
                $('#ddlEmployee').val(SetupList[0].Employeeid);
                $("#ddlEmployee").prop("disabled", true);
            }
            loadSetupTable();
        },

        error: function (errormessage) {
            alert(errormessage.responseText);
        }

    });

}

function LoadEmployeeDll() {

    $.ajax({
        url: "/StoreSetup/GetEmployeeDDl/",
        type: "GET",
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            Employeelist = (result.Value);


            var revdet = {};
            var rev = [];

            $.each(Employeelist, function (i, el) {

                if (!revdet[el.Employeeid]) {
                    revdet[el.Employeeid] = true;
                    rev.push(el);
                }
            });

            $('#ddlEmployee').empty();
            $('#ddlEmployee').append($('<option/>').val('0').text('--Select Employee--'));
            $.each(rev, function () {
                $('#ddlEmployee').append($('<option></option>').val(this.Employeeid).text(this.Employee));
            });

            $('#ddlMEmployee').empty();
            $('#ddlMEmployee').append($('<option/>').val('0').text('--Select Employee--'));
            $.each(rev, function () {
                $('#ddlMEmployee').append($('<option></option>').val(this.Employeeid).text(this.Employee));
            });
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });



}


function LoadStoreDll() {

    $.ajax({
        url: "/StoreSetup/GetStoreDDL/",
        type: "GET",
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            Employeelist = (result.Value);


            var revdet = {};
            var rev = [];

            $.each(Employeelist, function (i, el) {

                if (!revdet[el.Storeid]) {
                    revdet[el.Storeid] = true;
                    rev.push(el);
                }
            });

            $('#ddlMStore').empty();
            $('#ddlMStore').append($('<option/>').val('0').text('--Select StoreName--'));
            $.each(rev, function () {
                $('#ddlMStore').append($('<option></option>').val(this.Storeid).text(this.StoreName));
            });

           
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });



}


function LoadMaingrid() {
    debugger;

    var Storeid = $('#ddlMStore').val();

    if (Storeid == null) {
        Storeid = 0;
    } else {
        Storeid = $('#ddlMStore').val();
    }

    var Employeeid = $('#ddlMEmployee').val();

    if (Employeeid == null) {
        Employeeid = 0;
    } else {
        Employeeid = $('#ddlMEmployee').val();
    }


    $.ajax({
        url: "/StoreSetup/List",
        data: JSON.stringify({ Employeeid: Employeeid, Storeid: Storeid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");

            var inputcount = 0;
            $('#tbody tr').each(function () {
                inputcount++;
            });
            if (inputcount > 0) {
                //$('#tblYarndetails').DataTable().destroy();
                var table = $('#tbody').DataTable();
                var rows = table.clear().draw();
                $('#tbody').DataTable().rows.add(dataSet);
                $('#tbody').DataTable().columns.adjust().draw();
            }
            else {

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
                    bSort: false,
                    columns: [
                             { title: "Employeeid", "visible": false },
                             { title: "Employee" },
                             { title: "Designation" },
                              { title: "Action" },
                    ]

                });
            }

            var table = $('#tbody').DataTable();
            $("#tbody tr").click(function () {
                var selected = $(this).hasClass("selected");
                $("#tbody tr").removeClass("selected");
                if (!selected)
                    $(this).addClass("selected");
            });
           // CheckRights("ProcessOrder");

        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function loadSetupTable() {
    debugger;
    // $('#tblcompdetails').DataTable().destroy();
    var inputcount = 0;
    $('#tblSetdetails tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tblSetdetails').DataTable().destroy();
    }
  
    $('#tblSetdetails').DataTable({
        //'bSortable': false,
        //'aTargets' : [ 7, 8 ],
        data: SetupList,
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
              { title: "Setupid", data: "Setupid", "visible": false },
            { title: "Employeeid", data: "Employeeid", "visible": false },
            { title: "Storeid", data: "Storeid", "visible": false },
            { title: "Employee", data: "Employee", "visible": false },
            { title: "Store", data: "StoreName"},
           {
               title: "Issue", data: "Issue",
               render: function (data, type, row) {

                   return '<input type="checkbox" id="groupIssue" class="groupIssue editor-active" unchecked  value=' + data + ' >';


               }
           },
            {
                title: "Receipt", data: "Receipt",
                render: function (data, type, row) {

                    return '<input type="checkbox" id="groupreceipt" class="groupreceipt editor-active" unchecked  value=' + data + ' >';


                }
            }
           
             
        ]
    });


    $("#tblSetdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblSetdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });


    $('input[id=groupIssue]').each(function () {
        debugger;
        var row = $(this).closest('tr');
        if ($(this).val() == 1) {
            row.find('#groupIssue').prop('checked', true);
        }
    });

    $('input[id=groupreceipt]').each(function () {
        debugger;
        var row = $(this).closest('tr');
        if ($(this).val() == 1) {
            row.find('#groupreceipt').prop('checked', true);
        }
    });


}
function Save() {
    debugger;
    var isAllValid = true;

    if ($('#ddlEmployee').val() == "0") {
        isAllValid = false;
        $('#ddlEmployee').siblings(".select2-container").css('border', '1px solid red');
    }
    else {
        $('#ddlEmployee').siblings(".select2-container").css('border', 'lightgrey');
    }

    var cnt = 0;
    $.each(SetupList, function (index, value) {
        if (this.Issue == 1) {
            cnt++;
        }
        if (this.Receipt == 1) {
            cnt++;
        }
    });
    if (cnt == 0) {
        //alert('Please select anyone StoreUnit..');
        var msg = 'Please select anyone StoreUnit...';
        var flg = 4;
        var mode = 1;
        AlartMessage(msg, flg, mode);
        isAllValid = false;
    }


    if (isAllValid) {
        var objSubmit = {
            SetupList: SetupList
        };
        $("#btnAdd").attr("disabled", true);
        LoadingSymb();
        $.ajax({
            url: "/StoreSetup/Add",
            data: JSON.stringify(objSubmit),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.Value == true) {
                    //alert("StoreSetup Saved Sucessfully");
                    var employeeName = $('#ddlEmployee').find(":selected").text();
                    AddUserEntryLog('Master', 'Store Setup', 'ADD', employeeName);
                    $("#btnAdd").attr("disabled", false);
                    var msg = 'StoreSetup Saved Sucessfully...';
                    var flg = 1;
                    var mode = 0;
                    AlartMessage(msg, flg, mode);
                    //window.location.href = "/StoreSetup/StoreSetupIndex";
                } else {
                    window.location.href = "/Error/Index";
                }
            },
            error: function (errormessage) {

                alert(errormessage.responseText);
            }
        });
    }
}

function Update() {
    debugger;
    var isAllValid = true;

    var cnt = 0;
    $.each(SetupList, function (index, value) {
        if (this.Issue == 1) {
            cnt++;
        }
        if (this.Receipt == 1) {
            cnt++;
        }
    })
    if (cnt == 0) {
        //alert('Please select anyone StoreUnit..');
        var msg = 'Please select anyone StoreUnit...';
        var flg = 4;
        var mode = 1;
        AlartMessage(msg, flg, mode);
        isAllValid = false;
    }


    if (isAllValid) {
        var objSubmit = {
            SetupList: SetupList
        };
        $("#btnUpdate").attr("disabled", true);
        LoadingSymb();
        $.ajax({
            url: "/StoreSetup/Update",
            data: JSON.stringify(objSubmit),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.Value == true) {
                    //alert("StoreSetup Updated Sucessfully");
                    var employeeName = $('#ddlEmployee').find(":selected").text();
                    AddUserEntryLog('Master', 'Store Setup', 'UPDATE', employeeName);
                    var msg = 'StoreSetup Updated Sucessfully...';
                    var flg = 1;
                    var mode = 0;
                    AlartMessage(msg, flg, mode);
                    //window.location.href = "/StoreSetup/StoreSetupIndex";
                    $("#btnUpdate").attr("disabled", false);
                } else {
                    window.location.href = "/Error/Index";
                }
            },
            error: function (errormessage) {

                alert(errormessage.responseText);
            }
        });
    }
}

function Delete() {
    debugger;
    var isAllValid = true;
    if (isAllValid) {
        var objSubmit = {
            SetupList: SetupList
        };
        $("#btnDelete").attr("disabled", true);
        LoadingSymb();
        $.ajax({
            url: "/StoreSetup/Delete",
            data: JSON.stringify(objSubmit),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.Value == true) {
                    var employeeName = $('#ddlEmployee').find(":selected").text();
                    AddUserEntryLog('Master', 'Store Setup', 'DELETE', employeeName);

                    //alert("StoreSetup Deleted Sucessfully");
                    //window.location.href = "/StoreSetup/StoreSetupIndex";
                    var msg = 'StoreSetup Deleted Sucessfully...';
                    var flg = 2;
                    var mode = 0;
                    AlartMessage(msg, flg, mode);
                    $("#btnDelete").attr("disabled", false);
                } else {
                    window.location.href = "/Error/Index";
                }
            },
            error: function (errormessage) {

                alert(errormessage.responseText);
            }
        });
    }
}