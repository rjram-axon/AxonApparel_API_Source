var Mode = 0;
var buyerList = [];
var empList = [];
var mainList = [];
var buyerseq = 0;
var empseq = 0;
var Buyersno = 0;
var Empsno = 0;
var Masid=0;

$(document).ready(function () {
    LoadBuyerDDL("#ddlbuyer");
    LoadEmployeeDDL("#ddlemployee");

    loadData();
    loadbuyerTable(buyerList);
    loadempTable(empList);


    //$('#btnedit').click(function () {
    $(document).on('click', '.btnedit', function () {
        debugger;

        table = $('#tblbuyer').DataTable();
        Buyersno = table.row($(this).parents('tr')).data()["Sno"];
        var buyerid = table.row($(this).parents('tr')).data()["BuyerId"];
        $("#ddlbuyer").val(buyerid);
        $('#btnbuyeradd').hide();
        $('#btnbuyerupdate').show();
    });

    $('#btnbuyerupdate').click(function () {
        debugger;
        //table = $('#tblbuyer').DataTable();
        //var sno = table.row($(this).parents('tr')).data()["Sno"];
        //var buyerid = table.row($(this).parents('tr')).data()["BuyerId"];
        buyerid = $("#ddlbuyer").val();

        for (var i in buyerList) {
            if (buyerList[i].Sno == Buyersno) {
                buyerList[i].BuyerId = buyerid;
                buyerList[i].Buyer = $("#ddlbuyer option:selected").text();
                break; //Stop this loop, we found it!
            }
        }
        loadbuyerTable(buyerList);
        Buyersno = 0;

        $('#btnbuyerupdate').hide();
        $('#btnbuyeradd').show();

        $('#ddlbuyer').val('0');
    });

    //Add buyer button click event
    $('#btnbuyeradd').click(function () {
        //validation and add order items
        var isAllValid = true;
        debugger;
        if ($('#ddlbuyer').val() == "0") {
            isAllValid = false;
            $('#ddlbuyer').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#ddlbuyer').siblings('span.error').css('visibility', 'hidden');
        }

        //Finding the max value of an attribute in an array of objects
        var max = 0;
        jQuery.map(buyerList, function (obj) {
            debugger;
            if (obj.Sno > max)
                max = obj.Sno;
        });
        //End

        if (buyerseq == 0 && buyerList.length == 0) {
            buyerseq = 1;
        }
        else {
            buyerseq = max + 1;
        }

        if (isAllValid) {
            var BuyerlistObj = {
                Sno: buyerseq,
                Buyer: $("#ddlbuyer option:selected").text(),
                BuyerId: $('#ddlbuyer').val(),
                Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
            };

            buyerList.push(BuyerlistObj);

            loadbuyerTable(buyerList);

            //clear select data            
            $('#ddlbuyer').val('0');

        }
    });

    //Add Employee button click event
    $('#btnempadd').click(function () {
        //validation and add order items
        var isAllValid = true;
        debugger;
        if ($('#ddlemployee').val() == "0") {
            isAllValid = false;
            $('#ddlemployee').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#ddlemployee').siblings('span.error').css('visibility', 'hidden');
        }

        //Finding the max value of an attribute in an array of objects
        var max = 0;
        jQuery.map(empList, function (obj) {
            debugger;
            if (obj.Sno > max)
                max = obj.Sno;
        });
        //End

        if (empseq == 0 && empList.length == 0) {
            empseq = 1;
        }
        else {
            empseq = max + 1;
        }

        if (isAllValid) {
            var EmplistObj = {
                Sno: empseq,
                Employee: $("#ddlemployee option:selected").text(),
                EmployeeId: $('#ddlemployee').val(),
                Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
            };

            empList.push(EmplistObj);

            loadempTable(empList);

            //clear select data            
            $('#ddlemployee').val('0');

        }
    });

    $(document).on('click', '.btnempedit', function () {
        debugger;

        table = $('#tblemp').DataTable();
        Empsno = table.row($(this).parents('tr')).data()["Sno"];
        var empid = table.row($(this).parents('tr')).data()["EmployeeId"];
        $("#ddlemployee").val(empid);
        $('#btnempadd').hide();
        $('#btnempupdate').show();
    });

    $('#btnempupdate').click(function () {
        debugger;
        //table = $('#tblbuyer').DataTable();
        //var sno = table.row($(this).parents('tr')).data()["Sno"];
        //var buyerid = table.row($(this).parents('tr')).data()["BuyerId"];
        empid = $("#ddlemployee").val();

        for (var i in empList) {
            if (empList[i].Sno == Empsno) {
                empList[i].EmployeeId = empid;
                empList[i].Employee = $("#ddlemployee option:selected").text();
                break; //Stop this loop, we found it!
            }
        }
        loadempTable(empList);
        Empsno = 0;

        $('#btnempupdate').hide();
        $('#btnempadd').show();

        $('#ddlemployee').val('0');
    });
});

function loadbuyerTable(buyList) {
    var rowCount = $('#tblbuyer tr').length;
    if (rowCount > 0) {
        $('#tblbuyer').DataTable().destroy();
    }

    debugger;
    $('#tblbuyer').DataTable({
        data: buyList,
        scrollY: 100,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        columns: [
            { title: "Sno", data: "Sno", "visible": false },
            { title: "BuyerId", data: "BuyerId", "visible": false },
            { title: "Buyer", data: "Buyer" },
               {
                   title: "ACTION", "mDataProp": null,
                   //"sDefaultContent": '<button type="button" class="btnedit"> Edit </button> <a id=" 1 " onclick="return DeleteChild(this)" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="1"><i class="fa fa-trash-o" style="cursor: pointer;"></i></a>'
                   "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnremove btn btn-danger btn-round"> <i class="fa fa-times"></i> </button><i class="fa fa-trash-o" style="cursor: pointer;display:none;"></i></a>'//<button type="button" class="btnsizeview"> View Color </button>
               }
        ]
    });
}

function loadempTable(empList) {
    var rowCount = $('#tblemp tr').length;
    if (rowCount > 0) {
        $('#tblemp').DataTable().destroy();
    }

    debugger;
    $('#tblemp').DataTable({
        data: empList,
        scrollY: 100,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        columns: [
            { title: "Sno", data: "Sno", "visible": false },
            { title: "EmpId", data: "EmployeeId", "visible": false },
            { title: "Employee", data: "Employee" },
               {
                   title: "ACTION", "mDataProp": null,
                   //"sDefaultContent": '<button type="button" class="btnedit"> Edit </button> <a id=" 1 " onclick="return DeleteChild(this)" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="1"><i class="fa fa-trash-o" style="cursor: pointer;"></i></a>'
                   "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnempedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnempremove btn btn-danger btn-round"> <i class="fa fa-times"></i> </button><i class="fa fa-trash-o" style="cursor: pointer;display:none;"></i></a>'//<button type="button" class="btnsizeview"> View Color </button>
               }
        ]
    });
}

function loadData() {
    $.ajax({
        type: "GET",
        url: '/MerchTeam/List/',
        data: JSON.stringify({}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");
            $('#tblmain').DataTable({
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
                         { title: "Merchand Team" },
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
    debugger;
    Mode = 0;
    Masid = 0;

    $('#txtMercName').val("");
    $('#ddlbuyer').val("0");
    $('#ddlemployee').val("0");

    $('#btnbuyerupdate').hide();
    $('#btnempupdate').hide();

    //Clear DataTable
    var tablesize = $('#tblbuyer').DataTable();
    tablesize.clear().draw();

    buyerList = [];
    empList = [];

    $('#btnAdd').show();
    $('#btnDelete').hide();
    $('#btnUpdate').hide();


}

//Add Data Function 
function Add() {
    debugger;
    
    var res = validate();

    if (res == false) {
        return false;
    }

    var isAllValid = true;


    if (buyerList.length == 0) {
        alert('Buyer should not be empty...');
        return true;
    }
    if (empList.length == 0) {
        alert('Employee should not be empty...');
        return true;
    }

  if (isAllValid) {
        var MerchandiseTeamObj = {
            MerchandName: $('#txtMercName').val(),
            MerchandTeamBuy: buyerList,
            MerchandTeamEmp: empList
        };
        LoadingSymb();
        $.ajax({
            url: "/MerchTeam/Add",
            data: JSON.stringify(MerchandiseTeamObj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.Status == "SUCCESS") {
                    alert("Record saved successfully...");
                    $('#tblmain').DataTable().destroy();
                    loadData();
                    $('#myModal').modal('hide');
                    clearTextBox();
                }
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

function fnmaindeleteview(TeamId) {
    Mode = 2;
    Masid=TeamId;
    getbyID(TeamId);
    $('#btnAdd').hide();
    $('#btnDelete').show();
    $('#btnUpdate').hide();

    $('#btnbuyerupdate').hide();
    $('#btnempupdate').hide();

}

function fnmaineditview(TeamId) {
    debugger;
    Mode = 1;
    Masid = TeamId;
    getbyID(TeamId);
    $('#btnAdd').hide();
    $('#btnDelete').hide();
    $('#btnUpdate').show();

    $('#btnbuyerupdate').hide();
    $('#btnempupdate').hide();

}

function getbyID(TeamId) {
    
    debugger;
    //$('#ddlcutheaderCompany').css('border-color', 'lightgrey');

    $.ajax({
        url: "/MerchTeam/GetbyID/" + TeamId,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = [];
            obj = result.Value;
            debugger;

            $("#txtMercName").val(obj.MerchandName);
            buyerList = obj.MerchandTeamBuy;
            empList = obj.MerchandTeamEmp;

            for (i=1; i < buyerList.length; i++) {
                buyerList[i].Sno = i;
            }

            for (j=1; j < empList.length; j++) {
                empList[j].Sno = j;
            }

            loadbuyerTable(buyerList);
            loadempTable(empList);
            $('#myModal').modal('show');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

function getViewbyID(TeamId) {

    debugger;
    //$('#ddlcutheaderCompany').css('border-color', 'lightgrey');

    $.ajax({
        url: "/MerchTeam/GetbyID/" + TeamId,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = [];
            obj = result.Value;
            debugger;

            $("#txtMercName").val(obj.MerchandName);
            buyerList = obj.MerchandTeamBuy;
            empList = obj.MerchandTeamEmp;

            for (i = 1; i < buyerList.length; i++) {
                buyerList[i].Sno = i;
            }

            for (j = 1; j < empList.length; j++) {
                empList[j].Sno = j;
            }

            loadbuyerTable(buyerList);
            loadempTable(empList);
            $('#myModal').modal('show');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

function validate() {
    var isValid = true;

    if ($('#txtMercName').val() == '') {
        $('#txtMercName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtMercName').css('border-color', 'lightgrey');
    }

    return isValid;
}

function Update() {
    debugger;
    var res = validate();

    if (res == false) {
        return false;
    }

    var isAllValid = true;

    if (buyerList.length == 0) {
        alert('Buyer should not be empty...');
        return true;
    }
    if (empList.length == 0) {
        alert('Employee Item list should not be empty...');
        return true;
    }

    if (isAllValid) {
        var MerchandiseTeamObj = {
            MerchandMasId: Masid,
            MerchandName: $('#txtMercName').val(),
            MerchandTeamBuy: buyerList,
            MerchandTeamEmp: empList
        };
        LoadingSymb();
        $.ajax({
            url: "/MerchTeam/Update",
            data: JSON.stringify(MerchandiseTeamObj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.Status == "SUCCESS") {
                    alert("Record updated successfully...");
                    $('#tblmain').DataTable().destroy();
                    loadData();
                    $('#myModal').modal('hide');
                    clearTextBox();
                }
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}