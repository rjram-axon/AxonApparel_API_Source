var testtypelist = [];
var RecId = 0;
var Mode = 0;

$(document).ready(function () {
    debugger;
    loadData();
    LoadTestingDCDDL("#ddldcno");
    LoadSupplierDDL("#ddlSupplier");
    LoadOrderNoDDL("#ddlOrderNo");
    LoadAddlessDDL("#ddlaccheads");
});

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
        url: '/TestingDCReceiptApproval/List/',
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

function getbyID(TestingDCID) {
    debugger;
    Mode = 1;
    RecId = TestingDCID;
    ViewDetails(TestingDCID);

    //$('#btnsampletypeadd').show();
    //$('#btnsampletypeupdate').hide();
    
    $('#btnDel').hide();
    $('#btnUpdate').show();
    $('#btnAdd').hide();

    //return false;
}

function Approve() {
    LoadingSymb();
    $.ajax({
        url: "/TestingDCReceiptApproval/Approve/" + RecId,
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == true) {
                alert("Approved sucessfully...");
                $('#myModal').modal('hide');
                //$('#tbody').DataTable().destroy();
                loadData();
            } else {
                alert("Approved failed...");
                //window.location.href = "/Error/Index";
            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
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

function loadtesttypeTable(testList) {
    //$('#tblTestdcdetails').DataTable().destroy();
    var outputcount = 0;
    $('#tblTestdcdetails tr').each(function () {
        outputcount++;
    });

    if (outputcount > 0) {
        $('#tblTestdcdetails').DataTable().destroy();
    }

    debugger;
    $('#tblTestdcdetails').DataTable({
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
            { title: "Value", data: "Value" }
        ]
    });
}

function fnClose() {
    debugger;
    $('#myModal').modal('hide');
    loadData();
}
