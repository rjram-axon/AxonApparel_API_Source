var testtypeseq = 0;
var testtypelist = [];
var Mod = 0;
var table, column, compId, Docum = 0;
var Mode = 0;
var RecId = 0;
var Guserid = 0;

$(document).ready(function () {
    loadData();
    Guserid = $("#hdnUserid").data('value');

    LoadCompanyUnitDDL("#ddldebiton");
    LoadSupplierDDL("#ddlSupplier,#ddlprosupplier");
    LoadBuyerDDL("#ddlbuyer");
    LoadOrderNoDDL("#ddlOrderNo");
    LoadAddlessDDL("#ddlaccheads");
    LoadTestingTypeDDL("#ddltesttype");
    LoadColorDDL("#ddlcolor");
    LoadHSNDDL("#HSNCODE");

    $("#txttestpcs").keyup(function () {
        CalcValue();
    });

    $("#txtRateperpcs").keyup(function () {
        CalcValue();
    });

    //Add Sample Type button click event
    $('#btnsampletypeadd').click(function () {
        //validation and add order items
        var isAllValid = true;
        debugger;
        if ($('#ddltesttype').val() == "0") {
            isAllValid = false;
            $('#ddltesttype').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#ddltesttype').siblings('span.error').css('visibility', 'hidden');
        }

        //Finding the max value of an attribute in an array of objects
        var max = 0;
        jQuery.map(testtypelist, function (obj) {
            debugger;
            if (obj.SeqNo > max)
                max = obj.SeqNo;
        });
        //End

        if (testtypeseq == 0 && testtypelist.length == 0) {
            testtypeseq = 1;
        }
        else {
            testtypeseq = max + 1//comboItemList.length+1;
        }

        if (isAllValid) {
            var TesttypelistObj = {
                SeqNo: testtypeseq,
                TestingType: $("#ddltesttype option:selected").text(),
                TestingTypeId: $('#ddltesttype').val(),
                TestPcs: $('#txttestpcs').val(),
                RatePerPcs: $('#txtRateperpcs').val(),
                Value: $('#txtvalue').val(),
                TaxAppVal: $('#txttaxapplval').val(),
                Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDel"/>']
            };

            testtypelist.push(TesttypelistObj);

            loadtesttypeTable(testtypelist);

            //clear select data
            //$('#tblsizedetails').DataTable().destroy();
            $('#ddltesttype').val('0');
            $('#txttestpcs').val('');
            $('#txtRateperpcs').val('');
            $('#txtvalue').val('');
            $('#txttaxapplval').val('');
        }
    });

    $(document).on('click', '.btnedit', function () {
        debugger;
        Mod = 1;

        rowindex = $(this).closest('tr').index();

        var currentro12 = testtypelist.slice(rowindex);

        $("#ddltesttype").val(currentro12[0]['TestingType']);
        $("#ddltesttype").val(currentro12[0]['TestingTypeId']);
        $("#txttestpcs").val(currentro12[0]['TestPcs']);
        $("#txtRateperpcs").val(currentro12[0]['RatePerPcs']);
        $("#txtvalue").val(currentro12[0]['Value']);
        $("#txttaxapplval").val(currentro12[0]['TaxAppVal']);

        $('#btnsampletypeadd').hide();
        $('#btnsampletypeupdate').show();
    });

    $('#btnsampletypeupdate').click(function () {
        debugger;
        var currentrowsel = testtypelist.slice(rowindex);

        currentrowsel[0]['TestingTypeId'] = $("#ddltesttype").val();
        currentrowsel[0]['TestingType'] = $("#ddltesttype option:selected").text();
        currentrowsel[0]['TestPcs'] = $("#txttestpcs").val();
        currentrowsel[0]['RatePerPcs'] = $("#txtRateperpcs").val();
        currentrowsel[0]['Value'] = $("#txtvalue").val();
        currentrowsel[0]['TaxAppVal'] = $("#txttaxapplval").val();

        testtypelist[rowindex] = currentrowsel[0];

        loadtesttypeTable(testtypelist);

        $('#btnsampletypeadd').show();
        $('#btnsampletypeupdate').hide();

        if (Mod == 0) {
            ClearTextbox();
        }
        else {
            $('#ddltesttype').val('0');
            $('#ddltesttype').siblings('span.error').css('visibility', 'hidden');
            $('#txttestpcs').val('');
            $('#txtRateperpcs').val('');
            $('#txtvalue').val('');
            $('#txttaxapplval').val('');
        }
        Mod = 0;        
    });

    $(document).on('click', '.btnremove', function () {
        debugger;

        rowindex = $(this).closest('tr').index();

        var currentrowsel = testtypelist.slice(rowindex);

        testtypelist.splice(rowindex, 1);
        document.getElementById("tblTesttypedetails").deleteRow(rowindex + 1);        
    });
});

function CalcValue() {
    debugger;
    var TestPcs = $('#txttestpcs').val();
    var RatePerpcs = ($('#txtRateperpcs').val() == "" ? 0 : $('#txtRateperpcs').val());
    
    var TotVal = parseFloat((TestPcs==0?0:TestPcs)) * parseFloat((RatePerpcs==0?0:RatePerpcs));

    $("#txtvalue").val(TotVal.toFixed(2));
}

function GenerateGatePassNo() {
    $('#txtgatepassno').val("");
    //var BuyID = $('#txtgatepassno').val();

    $.ajax({
        url: "/TestingDC/GetGatePassNoCont",
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {
                $('#txtgatepassno').val(obj);
            }
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
               {
                   title: "ACTION", "mDataProp": null,
                   //"sDefaultContent": '<button type="button" class="btnedit"> Edit </button> <a id=" 1 " onclick="return DeleteChild(this)" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="1"><i class="fa fa-trash-o" style="cursor: pointer;"></i></a>'
                   "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnremove btn btn-danger btn-round"> <i class="fa fa-times"></i> </button><i class="fa fa-trash-o" style="cursor: pointer;display:none;"></i></a>'//<button type="button" class="btnsizeview"> View Color </button>
               }
        ]
    });
}

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
        url: '/TestingDC/List/',
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

function GenerateNumber() {
    debugger;

    if ($('#ddlCompany').val() == 0) {
        $('#ddlCompany').css('border-color', 'Red');
        alert("Select Company...");
    }
    else {
        $('#ddlCompany').css('border-color', 'lightgrey');

        table = "TestingDCMas",
        column = "DCNo",
        compId = $('#ddlCompany').val(),
        Docum = 'TESTING DELIVERY CHALLEN'

        $.ajax({
            url: "/BulkOrder/GenerateNo",
            data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                debugger;
                $('#txtdcno').val(result.Value);
            }
        });
    }
}

function ClearTextbox() {
    debugger;
    RecId = 0;
    Mode = 0;
    
    testtypelist = [];
    $('#ddlCompany').val('0');
    $('#ddldebiton').val('0');
    $('#ddlcolor').val('0');
    //$('#ddlwrkdiv').val('0');
    $('#ddlSupplier').val('0');
    $('#ddlprosupplier').val('0');
    $('#ddlbuyer').val('0');
    $('#ddlOrderNo').val('0');
    $('#ddlaccheads').val('0');
    $('#ddlteston').val('0');
    $('#HSNCODE').val('0');
    $('#txttestvalue').val('');
    $('#txtremarks').val('');
    
    $('#btnsampletypeadd').show();
    $('#btnsampletypeupdate').hide();
    
    $('#ddltesttype').val('0');
    $('#txttestpcs').val('');
    $('#txtvehicleno').val('');
    $('#txtRateperpcs').val('');
    $('#txtvalue').val('');
    $('#txttaxapplval').val('');

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

    GenerateGatePassNo();
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
    
}

function validate() {
    var isValid = true;
    if ($('#txtdcno').val().trim() == "") {
        $('#txtdcno').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtdcno').css('border-color', 'lightgrey');
    }
    
    if ($('#ddlSupplier').val() == 0) {
        $('#ddlSupplier').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlSupplier').css('border-color', 'lightgrey');
    }

    if ($('#ddlbuyer').val() == 0) {
        $('#ddlbuyer').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlbuyer').css('border-color', 'lightgrey');
    }

    //var protype = $('input[name="optwrkord"]:checked').attr('value');
    //if (protype == 'P') {
    //    if ($('#ddlprosupplier').val() == 0) {
    //        $('#ddlprosupplier').css('border-color', 'Red');
    //        isValid = false;
    //    }
    //    else {
    //        $('#ddlprosupplier').css('border-color', 'lightgrey');
    //    }
    //}
    //else if (protype == 'W') {       
    //    if ($('#ddlwrkdiv').val() == 0) {
    //        $('#ddlwrkdiv').css('border-color', 'Red');
    //        isValid = false;
    //    }
    //    else {
    //        $('#ddlwrkdiv').css('border-color', 'lightgrey');
    //    }
    //}

    if ($('#ddlaccheads').val() == 0) {
        $('#ddlaccheads').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlaccheads').css('border-color', 'lightgrey');
    }

    if ($('#ddlCompany').val() == 0) {
        $('#ddlCompany').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlCompany').css('border-color', 'lightgrey');
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
        DCNo: $('#txtdcno').val(),
        //Order_Date: new Date($('#dtOrderDate').val()),
        DCDate: $('#dtDCDate').val(),
        CompanyId: $('#ddlCompany').val(),
        ColorId: $('#ddlcolor').val(),
        SupplierId: $('#ddlSupplier').val(),
        BuyerId: $('#ddlbuyer').val(),
        HSNCODE: $('#HSNCODE').val(),
        OrderId: $('#ddlOrderNo').val(),
        TestOn: $('#ddlteston').val(),
        TestValue: $('#txttestvalue').val(),
        VehicleNo: $('#txtvehicleno').val(),
        //Ref_date: new Date($('#dtRefDate').val()),
        GatePassNo: $('#txtgatepassno').val(),
        //DebitOnSuppID: $('#ddlprosupplier').val(),
        DebitOnUnitID: $('#ddldebiton').val(),
        TaxID: $('#ddlaccheads').val(),
        CreatedBy:Guserid,
        Remarks: $('#txtremarks').val(),
        Testing_dc_det: testtypelist,        
    };

    LoadingSymb();

    $.ajax({
        url: "/TestingDC/Add",
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
        //SeasonId: $('#ddlSeason').val(),
        TestingDCId:RecId,
        DCNo: $('#txtdcno').val(),
        //Order_Date: new Date($('#dtOrderDate').val()),
        DCDate: $('#dtDCDate').val(),
        CompanyId: $('#ddlCompany').val(),
        ColorId: $('#ddlcolor').val(),
        SupplierId: $('#ddlSupplier').val(),
        BuyerId: $('#ddlbuyer').val(),
        HSNCODE: $('#HSNCODE').val(),
        OrderId: $('#ddlOrderNo').val(),
        TestOn: $('#ddlteston').val(),
        TestValue: $('#txttestvalue').val(),
        VehicleNo: $('#txtvehicleno').val(),
        //Ref_date: new Date($('#dtRefDate').val()),
        GatePassNo: $('#txtgatepassno').val(),
        //DebitOnSuppID: $('#ddlprosupplier').val(),
        DebitOnUnitID: $('#ddldebiton').val(),
        TaxID: $('#ddlaccheads').val(),
        ModifyBy: Guserid,
        Remarks: $('#txtremarks').val(),
        Testing_dc_det: testtypelist,
    };

    LoadingSymb();

    $.ajax({
        url: "/TestingDC/Update",
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

function Delete(id) {
    debugger;
    Mode = 2;

    $('#btnsampletypeadd').show();
    $('#btnsampletypeupdate').hide();

    ViewDetails(id);
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
            url: "/TestingDC/Delete/" + RecId,
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

function Print(TestingDCID) {    
   // $('#myModal2').modal('show');
    alert('Under Construction...');
}

//Function for getting the Data Based upon TestingDC ID
function getbyID(TestingDCID) {
    debugger;
    Mode = 1;
    RecId = TestingDCID;
    ViewDetails(TestingDCID);

    $('#btnsampletypeadd').show();
    $('#btnsampletypeupdate').hide();

    $('#btnDel').hide();
    $('#btnUpdate').show();
    $('#btnAdd').hide();

    //return false;
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
            $('#ddldebiton').val(obj.DebitOnUnitID);
            //if (obj.DebitOnSuppID > 0) {
            //    $('input:radio[name="optwrkord"][value="P"]').prop('checked', true);
            //    $('#ddlprosupplier').val(obj.DebitOnSuppID);
            //    $('#supp').show();
            //    $("#wrkdiv").hide();
            //}
            //else {
            //    $('input:radio[name="optwrkord"][value="W"]').prop('checked', true);
            //    $('#ddlwrkdiv').val(obj.DebitOnUnitID);
            //    $('#supp').hide();
            //    $("#wrkdiv").show();
            //}

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

function fnClose() {
    debugger;
    $('#myModal').modal('hide');
    ClearTextbox();
    loadData();
}

function backtomain() {
    $('#myModal2').modal('hide');
}
