var testtypelist = [];
var Mode = 0;
var RecId = 0;
var Guserid = 0;
var CheckReceipt = 0;

$(document).ready(function () {
    loadData();
    Guserid = $("#hdnUserid").data('value');

    LoadCompanyUnitDDL("#ddlwrkdiv");
    LoadSupplierDDL("#ddlSupplier,#ddlprosupplier");
    LoadBuyerDDL("#ddlbuyer");
    LoadOrderNoDDL("#ddlOrderNo");
    LoadAddlessDDL("#ddlaccheads");
    LoadTestingTypeDDL("#ddltesttype");
    LoadColorDDL("#ddlcolor");
    LoadHSNDDL("#HSNCODE");

});

//Load Data function
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
        url: '/TestingDCCancel/List/',
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
                         { title: "DC No" },
                         { title: "DC Date" },
                         { title: "Order No" },
                         { title: "Supplier" },
                         { title: "Buyer" },
                         { title: "Action" },
                ]
            });

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

//Function for getting the Data Based upon TestingDC ID
function getbyID(TestingDCID) {
    debugger;
    Mode = 1;
    RecId = TestingDCID;
    $('#txtcancelnarr').val('');
    ViewDetails(TestingDCID);

    $('#btnsampletypeadd').show();
    $('#btnsampletypeupdate').hide();

    $('#btnCancel').show();
}

function validate() {
    var isValid = true;
    if ($('#txtcancelnarr').val().trim() == "") {
        $('#txtcancelnarr').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtcancelnarr').css('border-color', 'lightgrey');
    }

    return isValid;
}

function Cancel() {
    debugger;
    var res = validate();
    if (res == false) {
        return false;
    }

    LoadingSymb();
    var TestingDCCancelObj = {
        TestingDCId: RecId,
        CancelNarr: $('#txtcancelnarr').val(),
        ModifyBy: Guserid,
    };

    $.ajax({
        url: "/TestingDCCancel/GetDCReceiptDetails/" + RecId,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            if (obj == false) {
                $.ajax({
                    url: "/TestingDCCancel/Cancel",
                    data: JSON.stringify(TestingDCCancelObj),
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
            else {
                alert('Receipt has been made for this DC...');
            }            
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function ViewDetails(RowId) {
    $.ajax({
        url: "/TestingDC/getbyID/" + RowId,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;

            $('#txtdcno').val(obj.DCNo);
            $('#dtDCDate').val(moment(obj.DCDate).format('DD/MM/YYYY'));
            $('#ddlCompany').val(obj.CompanyId);
            $('#ddlcolor').val(obj.ColorId);
            $('#ddlSupplier').val(obj.SupplierId);
            $('#ddlbuyer').val(obj.BuyerId);
            $('#HSNCODE').val(obj.HSNCODE),
            $('#ddlOrderNo').val(obj.OrderId);
            $('#ddlteston').val(obj.TestOn);
            $('#txttestvalue').val(obj.TestValue);
            $('#txtvehicleno').val(obj.VehicleNo);
            $('#txtgatepassno').val(obj.GatePassNo);

            if (obj.DebitOnSuppID > 0) {
                $('input:radio[name="optwrkord"][value="P"]').prop('checked', true);
                $('#ddlprosupplier').val(obj.DebitOnSuppID);
                $('#supp').show();
                $("#wrkdiv").hide();
            }
            else {
                $('input:radio[name="optwrkord"][value="W"]').prop('checked', true);
                $('#ddlwrkdiv').val(obj.DebitOnUnitID);
                $('#supp').hide();
                $("#wrkdiv").show();
            }

            $('#ddlaccheads').val(obj.TaxID);
            $('#txtremarks').val(obj.Remarks);

            testtypelist = obj.Testing_dc_det;

            loadtesttypeTable(testtypelist);

            $('#myModal').modal('show');

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function loadtesttypeTable(testList) {
    $('#tblTesttypedetails').DataTable().destroy();
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
            { title: "Tax Appl Val", data: "TaxAppVal" },
               //{
               //    title: "ACTION", "mDataProp": null,
               //    //"sDefaultContent": '<button type="button" class="btnedit"> Edit </button> <a id=" 1 " onclick="return DeleteChild(this)" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="1"><i class="fa fa-trash-o" style="cursor: pointer;"></i></a>'
               //    "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnremove btn btn-danger btn-round"> <i class="fa fa-times"></i> </button><i class="fa fa-trash-o" style="cursor: pointer;display:none;"></i></a>'//<button type="button" class="btnsizeview"> View Color </button>
               //}
        ]
    });
}

function fnClose() {
    debugger;
    $('#myModal').modal('hide');
    loadData();
}

