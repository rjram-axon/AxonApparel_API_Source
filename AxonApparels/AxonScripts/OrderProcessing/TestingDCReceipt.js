var testtypeseq = 0;
var testtypelist = [];
var Mod = 0;
var table, column, compId, Docum = 0;
var Mode = 0;
var RecId = 0;
var Guserid = 0;
var StatusL = [];

$(document).ready(function () {
    debugger;
    loadData();
    Guserid = $("#hdnUserid").data('value');
    LoadTestingDCDDL("#ddldcno");
    LoadSupplierDDL("#ddlSupplier");    
    LoadOrderNoDDL("#ddlOrderNo");
    LoadAddlessDDL("#ddlaccheads");
    LoadStatus();

    //CGST Per Value
    $("#txtcgstper").keyup(function () {
        debugger;
        var rate = $("#txtcgstper").val();
        var testvalue = $('#txttestvalue').val();

        if (testvalue > 0 && rate > 0) {
            var CGSTval = parseFloat($('#txtcgstper').val() * $('#txttestvalue').val() / 100).toFixed(2);            
            $('#txtcgstval').val(CGSTval);
        }
        CalcTot();
    });

    //SGST Per Value
    $("#txtsgstper").keyup(function () {
        debugger;
        var rate = $("#txtsgstper").val();
        var testvalue = $('#txttestvalue').val();

        if (testvalue > 0 && rate >0) {
            var CGSTval = parseFloat($('#txtsgstper').val() * $('#txttestvalue').val() / 100).toFixed(2);
            $('#txtsgstval').val(CGSTval);
        }
        CalcTot();
    });

    //IGST Per Value
    $("#txtigstper").keyup(function () {
        debugger;
        var rate = $("#txtsgstper").val();
        var testvalue = $('#txttestvalue').val();

        if (testvalue > 0 && rate > 0) {
            var CGSTval = parseFloat($('#txtigstper').val() * $('#txttestvalue').val() / 100).toFixed(2);
            $('#txtigstval').val(CGSTval);
        }
        CalcTot();
    });

    $(document).on('change', '.loadstatuslist', function () {
        debugger;

        rowindex = $(this).closest('tr').index();
        var val = $(this).val();

        var oldind = -1;
        for (var x = 0; x < StatusL.length; x++) {
            if (StatusL[x].StatusId == val) {
                fs = StatusL[x].Status;
                oldind = x;
            }
        }

        var currentrow = testtypelist.slice(rowindex);
        var s = currentrow[0].SeqNo;

        $.each(testtypelist, function () {
            if (this.SeqNo == s) {
                this.Status = fs;
                this.StatusId = val;
            }
        });
        //array_move(StatusL, oldind, 0)
    });
});

function LoadStatus() {
    //Add row in Status
    StatusL.push({ StatusId: 0, Status: "--Select Status--" });
    StatusL.push({ StatusId: 1, Status: "Pass" });
    StatusL.push({ StatusId: 2, Status: "Fail" });
}

function CalcTot() {
    debugger;
    var TestValue = $('#txttestvalue').val();
    var CGSTValue = ($('#txtcgstval').val() == "" ? 0 : $('#txtcgstval').val());
    var SGSTValue = ($('#txtsgstval').val()==""?0:$('#txtsgstval').val());
    var IGSTValue = ($('#txtigstval').val()==""?0:$('#txtigstval').val());

    var TotVal = parseFloat(TestValue) + parseFloat(CGSTValue) + parseFloat(SGSTValue) + parseFloat(IGSTValue);

    $("#txttotvalue").val(TotVal.toFixed(2));
}

function loadData() {
    var outputcount = 0;
    $('#tbody tr').each(function () {
        outputcount++;
    });

    if (outputcount > 0) {
        $('#tbody').DataTable().destroy();
    }

    debugger;
    $.ajax({
        type: "GET",
        url: '/TestingDCReceipt/List/',
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
                         { title: "TestingDC ID", "visible": false },
                         { title: "DC Receipt No" },
                         { title: "DC Receipt Date" },
                         { title: "Order No" },
                         { title: "Supplier" },
                         { title: "DC No" },
                         { title: "Action" },
                ]
            });

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadDCNoDetail() {
    debugger;
    var companyid = $("#ddlCompany").val();
    if (companyid == 0) {
        alert("Select Company...");
        $("#ddldcno").val(0);
    }
    else {
        var DCId = $("#ddldcno").val();
        
        $.ajax({
            url: "/TestingDC/getbyID/" + DCId,
            type: "GET",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                debugger;
                var obj = result.Value;
                
                $('#ddlSupplier').val(obj.SupplierId);
                $('#ddlOrderNo').val(obj.OrderId);
                $('#txttestvalue').val(obj.TestValue);
                $('#ddlaccheads').val(obj.TaxID);
                $('#txtremarks').val(obj.Remarks);
                testtypelist = obj.Testing_dc_det;

                loadtesttypeTable(testtypelist);
                CalcTot();
                
                //$('#txtdcreceiptno').val(result.Value);
            }
        });
    }
}

function loadstatuslist(val) {
    debugger;
    var statusid = 0;

    var table = $('#tblTesttypedetails').DataTable();
    statusid = table.row($(this).parents('tr')).data()["StatusId"];
}

function loadtesttypeTable(testList) {
    $('#tblTesttypedetails').DataTable().destroy();
    //var outputcount = 0;
    //$('#tblTesttypedetails tr').each(function () {
    //    outputcount++;
    //});

    //if (outputcount > 0) {
    //    $('#tblTesttypedetails').DataTable().destroy();
    //}

    debugger;
    $('#tblTesttypedetails').DataTable({
        data: testList,
        scrollY: 100,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        columns: [
            { title: "RowSeq", data: "SeqNo", "visible": false },
            { title: "ID", data: "TestingTypeId", "visible": false },
            { title: "Testing Type", data: "TestingType" },
            { title: "Test Pcs", data: "TestPcs" },
            { title: "Rate Per Pcs", data: "RatePerPcs" },
            { title: "Value", data: "Value" },
            {
                title: "Status", data: "StatusId",

                render: function (data, type, row) {
                    var $select = $("<select></select>", {
                        "id": "ddlTRStatus",
                        "value": data,
                        "class": "form-control loadstatuslist",
                        //onchange: "loadcolorlist(this.value);"
                    });

                    $.each(StatusL, function (k, v) {
                        var $option = $("<option></option>", {
                            "text": v.Status,
                            "value": v.StatusId,
                        });

                        if (data === v.StatusId) {
                            $option.attr("selected", "selected")
                        }
                        $select.append($option);
                    });
                    return $select.prop("outerHTML");
                }                
            },
               //{
               //    title: "ACTION", "mDataProp": null,                   
               //    "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnremove btn btn-danger btn-round"> <i class="fa fa-times"></i> </button><i class="fa fa-trash-o" style="cursor: pointer;display:none;"></i></a>'//<button type="button" class="btnsizeview"> View Color </button>
               //}
        ]
    });
}

function ClearTextbox() {
    debugger;
    RecId = 0;
    Mode = 0;
    
    testtypelist = [];
    StatusL = [];

    $('#ddlCompany').val('0');
    $('#ddlcolor').val('0');
    $('#ddldcno').val('0');
    $('#txtdcreceiptno').val('');
    $('#txtordrefno').val('');    
    $('#ddlwrkdiv').val('0');
    $('#ddlSupplier').val('0');
    $('#ddlprosupplier').val('0');
    $('#ddlbuyer').val('0');
    $('#ddlOrderNo').val('0');
    $('#ddlaccheads').val('0');
    $('#ddlteston').val('0');
    $('#txttestvalue').val('');
    $('#txtremarks').val('');

    $('#btnsampletypeadd').show();
    $('#btnsampletypeupdate').hide();

    $('#ddltesttype').val('0');
    $('#txttestpcs').val('');
    $('#txtvehicleno').val('');
    $('#txtbillno').val('');
    $('#txtcgstper').val('');
    $('#txtcgstval').val('');
    $('#txtsgstper').val('');
    $('#txtsgstval').val('');
    $('#txtigstper').val('');
    $('#txtigstval').val('');
    $('#txtRateperpcs').val('');
    $('#txtvalue').val('');
    $('#txttotvalue').val('');
    $('#txttaxapplval').val('');

    $("#ddlCompany").prop("disabled", false);

    LoadStatus();
    loadtesttypeTable(testtypelist);

    var protype = $('input[name="optwrkord"]:checked').attr('value');
    if (protype == 'P') {

        $('#supp').show();
        $("#wrkdiv").hide();
    }
    else if (protype == 'W') {
        $('#supp').hide();
        $("#wrkdiv").show();
    }

    getDate();

    $('#btnDel').hide();
    $('#btnUpdate').hide();
    $('#btnAdd').show();

    //GenerateGatePassNo();
}

function validate() {
    var isValid = true;
    if ($('#ddlCompany').val() == 0) {
        $('#ddlCompany').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlCompany').css('border-color', 'lightgrey');
    }

    if ($('#ddldcno').val() == 0) {
        $('#ddldcno').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddldcno').css('border-color', 'lightgrey');
    }

    return isValid;
}

function Add() {
    debugger;
    var res = validate();
    if (res == false) {
        return false;
    }

    var TestingDCObj = {
        //SeasonId: $('#ddlSeason').val(),
        DCReceiptNo: $('#txtdcreceiptno').val(),
        //Order_Date: new Date($('#dtOrderDate').val()),
        DCReceiptDate: $('#dtDCDate').val(),
        TestingDCId: $('#ddldcno').val(),
        //ColorId: $('#ddlcolor').val(),
        SupplierId: $('#ddlSupplier').val(),
        CompanyId: $('#ddlCompany').val(),
        //BuyerId: $('#ddlbuyer').val(),
        OrderId: $('#ddlOrderNo').val(),
        OrderRefNo: $('#txtordrefno').val(),
        BillNo: $('#txtbillno').val(),
        BillDate: $('#dtbillDate').val(),
        GSTtaxID: $('#ddlaccheads').val(),
        TestValue: $('#txttestvalue').val(),
        CGSTPer: $('#txtcgstper').val(),
        CGSTValue: $('#txtcgstval').val(),
        SGSTPer: $('#txtsgstper').val(),
        SGSTValue: $('#txtsgstval').val(),
        IGSTPer: $('#txtigstper').val(),
        IGSTValue: $('#txtigstval').val(),
        TotalValue: $('#txttotvalue').val(),
        CreatedBy: Guserid,
        Remarks: $('#txtremarks').val(),
        Testing_DC_Receipt_det: testtypelist,
    };

    LoadingSymb();

    $.ajax({
        url: "/TestingDCReceipt/Add",
        data: JSON.stringify(TestingDCObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Value == true) {
                //$('#tbody').DataTable().destroy();
                //loadData();

                $('#myModal').modal('hide');

                alert('Record saved successfully...');

                loadData();

            } else {
                alert('Record saved failed...');
                //window.location.href = "/Error/Index";
            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function Update() {
    debugger;
    var res = validate();
    if (res == false) {
        return false;
    }

    var TestingDCObjUpd = {        
        TestingDCReceiptId:RecId,
        DCReceiptNo: $('#txtdcreceiptno').val(),
        //Order_Date: new Date($('#dtOrderDate').val()),
        DCReceiptDate: $('#dtDCDate').val(),
        TestingDCId: $('#ddldcno').val(),
        //ColorId: $('#ddlcolor').val(),
        SupplierId: $('#ddlSupplier').val(),
        CompanyId: $('#ddlCompany').val(),
        //BuyerId: $('#ddlbuyer').val(),
        OrderId: $('#ddlOrderNo').val(),
        OrderRefNo: $('#txtordrefno').val(),
        BillNo: $('#txtbillno').val(),
        BillDate: $('#dtbillDate').val(),
        GSTtaxID: $('#ddlaccheads').val(),
        TestValue: $('#txttestvalue').val(),
        CGSTPer: $('#txtcgstper').val(),
        CGSTValue: $('#txtcgstval').val(),
        SGSTPer: $('#txtsgstper').val(),
        SGSTValue: $('#txtsgstval').val(),
        IGSTPer: $('#txtigstper').val(),
        IGSTValue: $('#txtigstval').val(),
        TotalValue: $('#txttotvalue').val(),
        ModifyBy: Guserid,
        Remarks: $('#txtremarks').val(),
        Testing_DC_Receipt_det: testtypelist,
    };

    LoadingSymb();

    $.ajax({
        url: "/TestingDCReceipt/Update",
        data: JSON.stringify(TestingDCObjUpd),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Value == true) {
                $('#myModal').modal('hide');
                alert('Record update successfully...');
                loadData();
            } else {
                alert('Record update failed...');
                //window.location.href = "/Error/Index";
            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function fnClose() {
    debugger;
    $('#myModal').modal('hide');
    ClearTextbox();
    $("#ddlCompany").prop("disabled", false);
    loadData();
}

function getDate() {
    debugger;

    var date = new Date();
    var currentMonth = date.getMonth();
    var currentDate = date.getDate();
    var currentYear = date.getFullYear();


    var todaydate = new Date();
    var day = todaydate.getDate();
    var Pmonth = todaydate.getMonth() - 2;
    var Cmonth = todaydate.getMonth() + 1;
    var year = todaydate.getFullYear();
    var datestring = Pmonth + "/" + day + "/" + year;
    var Fdatestring = day + "/" + Cmonth + "/" + year;

    //var day = new Date(),
    //    year = ((day.getMonth() - 2) < 0) ? (day.getFullYear() - 1) : day.getFullYear(),
    //    month = ((day.getMonth() - 2) < 0) ? (12 + (day.getMonth() - 2)) : (day.getMonth() + 1),
    //    date = month + '/' + day.getDate() + '/' + year;

    $('#dtDCDate').val(Fdatestring);
    $('#dtbillDate').val(Fdatestring);

}

function GenerateNumber() {
    debugger;

    if ($('#ddlCompany').val() == 0) {
        $('#ddlCompany').css('border-color', 'Red');
        alert("Select Company...");
    }
    else {
        $('#ddlCompany').css('border-color', 'lightgrey');

        table = "TestingDCReceiptMas",
        column = "DCReceiptNo",
        compId = $('#ddlCompany').val(),
        Docum = 'TESTING DELIVERY RECEIPT'

        $.ajax({
            url: "/BulkOrder/GenerateNo",
            data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                debugger;
                $('#txtdcreceiptno').val(result.Value);
            }
        });
    }
}

function Delete(id) {
    debugger;
    Mode = 2;

    //$('#btnsampletypeadd').show();
    //$('#btnsampletypeupdate').hide();

    ViewDetails(id);
    $("#ddlCompany").prop("disabled", true);
    RecId = id;

    $('#btnDel').show();
    $('#btnUpdate').hide();
    $('#btnAdd').hide();
}

function DeleteRecord() {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        LoadingSymb();
        $.ajax({
            url: "/TestingDCReceipt/Delete/" + RecId,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                if (result.Value == true) {
                    alert("Data deleted sucessfully...");
                    $('#myModal').modal('hide');
                    //$('#tbody').DataTable().destroy();
                    loadData();
                } else {
                    alert("Data deleted failed...");
                    //window.location.href = "/Error/Index";
                }
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

function getbyID(TestingDCID) {
    debugger;
    Mode = 1;
    RecId = TestingDCID;
    ViewDetails(TestingDCID);

    $("#ddlCompany").prop("disabled", true);
    //$('#btnsampletypeadd').show();
    //$('#btnsampletypeupdate').hide();

    $('#btnDel').hide();
    $('#btnUpdate').show();
    $('#btnAdd').hide();

    //return false;
}

function ViewDetails(RowId) {
    $.ajax({
        url: "/TestingDCReceipt/getbyID/" + RowId,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;

            $('#txtdcreceiptno').val(obj.DCReceiptNo);
            $('#dtDCDate').val(moment(obj.DCReceiptDate).format('DD/MM/YYYY'));
            $('#ddldcno').val(obj.TestingDCId);            
            $('#ddlSupplier').val(obj.SupplierId);            
            $('#ddlCompany').val(obj.CompanyId);
            $('#ddlOrderNo').val(obj.OrderId);
            $('#txtordrefno').val(obj.OrderRefNo);
            $('#txtbillno').val(obj.BillNo);
            $('#dtbillDate').val(moment(obj.BillDate).format('DD/MM/YYYY'));
            $('#ddlaccheads').val(obj.GSTTaxID);
            $('#txttestvalue').val(obj.TestValue);
            $('#txtcgstper').val(obj.CGSTPer);
            $('#txtcgstval').val(obj.CGSTValue);
            $('#txtsgstper').val(obj.SGSTPer);
            $('#txtsgstval').val(obj.SGSTValue);
            $('#txtigstper').val(obj.IGSTPer);
            $('#txtigstval').val(obj.IGSTValue);
            $('#txttotvalue').val(obj.TotalValue);
            $('#txtremarks').val(obj.Remarks);
            testtypelist = obj.Testing_DC_Receipt_det;

            loadtesttypeTable(testtypelist);

            $('#myModal').modal('show');

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}