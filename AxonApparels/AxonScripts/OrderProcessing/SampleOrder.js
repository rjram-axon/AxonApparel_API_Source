var refNoDDL = "#";
var ordNoDDL = "#";
var tblname, ColName, CompanyID, Doc;
var supList = [];
var ItmList = [];
var sampletype = [];
var SlNo = 0;
var SupSno = 0;
var SupId = 0;
var BuyMasId = 0;
var NItmList = [];
var GItemId = 0;
var Supp = 0;
var suppName = 0;
var Itemrowindex = -1;
var list = [];
var Gs = 0;
var Userid = 0;
var UserName = 0;
var DCompid = 0;
var DCompUnitid = 0;
var OType = 0;
var OldQty = 0;
var MainFDate = 0;
var Guserid = 0;
var sampletypeseq = 0;
var Mod = 0;
var DEnbBuyDetails = 0;
var RepId = 0;
var emode = 0;
var DispatchClosed = "N";
$(document).ready(function () {
    //GenerateNumber();
    debugger;
    Guserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');

    DCompid = $("#hdnDCompid").data('value');
    DCompUnitid = $("#hdnDCompUnitid").data('value');
    MainFDate = $("#hdMainFromDate").data('value');
    DEnbBuyDetails = $("#hdnCostBuyDetilsApp").data('value');
    if (Guserid == null || Guserid == "") {
        window.location.href = '/Login/LoginIndex';
    }
    else {
        LoadBuyerDDL("#ddlBuyer,#ddlMBuyer");
        //LoadBuyerDDL("#ddlMBuyer");
        LoadCompanyDDL("#ddlMCompany,#ddlCompany");
        LoadSampOrderNoDDL("#ddlCPOrderNo,#ddlParOrderNo");
        ///Want to check default comp,unit
        $('#ddlMCompany').val(DCompid);

        //LoadCompanyDDL("#ddlMCompany");
        LoadGUomDDL("#ddlUom");
        LoadEmployeeDDL("#ddlManager,#ddlMerch");
        //LoadEmployeeDDL("#ddlMerch");

        //if (BuyMasId == 0) {

        LoadConsigneeDDL("#ddlConsignee");
        LoadAgentDDL("#ddlAgent");
        LoadSAgentDDL("#ddlShipAgent");
        LoadShipmodeDDL("#ddlShipMode");
        LoadShipsystemDDL("#ddlShipsystem");
        LoadPayTermsDDL("#ddlPayment");
        //}
        LoadBaseUnitAdd();
        //LoadGrid();

        getDate();
        GetRefNo();
        GetOrdNo();
        var Type = "Ord";

        var fill = localStorage.getItem('SampleOrderMenuFilter');
        if (fill != "null" && fill != null) {
            LoadMainGridFromBack(Type);
        } else {
            LoadMainGrid(Type);
        }

        //LoadMainGrid(Type);

        $('#tblSupdetails').on('keyup', 'tr', function () {

            var tr = $(this).closest("tr");
            var rowindexof = tr.index();
            Itemrowindex = rowindexof;
            //alert(Itemrowindex);
        });

        if (BuyMasId == 0) {
            $('#CList1').hide();
            $('#CList').hide();
        } else {
            $('#CList1').show();
            $('#CList').show();
        }
    }

    $(document).on('click', '.btnedit', function () {
        debugger;
        Mod = 1;

        rowindex = $(this).closest('tr').index();

        var currentro12 = sampletype.slice(rowindex);

        $("#ddlsampletype").val(currentro12[0]['SampleTypeId']);
        $("#txtsamqty").val(currentro12[0]['SampleTypeQty']);

        $('#btnsampletypeadd').hide();
        $('#btnsampletypeupdate').show();
    });

    $(document).on('click', '.btnremove', function () {
        debugger;

        rowindex = $(this).closest('tr').index();

        var currentrowsel = sampletype.slice(rowindex);

        //colorseq = currentrowsel[0]['SizeName'];

        sampletype.splice(rowindex, 1);
        document.getElementById("tblsampletypedetails").deleteRow(rowindex + 1);
        CalcQty();
    });

    $('#btnsampletypeupdate').click(function () {
        debugger;
        var currentrowsel = sampletype.slice(rowindex);

        currentrowsel[0]['SampleTypeId'] = $("#ddlsampletype").val();
        currentrowsel[0]['SampleType'] = $("#ddlsampletype option:selected").text();
        currentrowsel[0]['SampleTypeQty'] = $("#txtsamqty").val();

        sampletype[rowindex] = currentrowsel[0];

        loadsampletypeTable(sampletype);

        $('#btnsampletypeadd').show();
        $('#btnsampletypeupdate').hide();

        if (Mod == 0) {
            clearTextBox();
        }
        else {
            $('#ddlsampletype').val('0');
            $('#ddlsampletype').siblings('span.error').css('visibility', 'hidden');
            $('#txtsamqty').val('');
        }
        Mod = 0;
        CalcQty();
    });

    //Add Sample Type button click event
    $('#btnsampletypeadd').click(function () {
        //validation and add order items
        var isAllValid = true;
        debugger;
        if ($('#ddlsampletype').val() == "0") {
            isAllValid = false;
            $('#ddlsampletype').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#ddlsampletype').siblings('span.error').css('visibility', 'hidden');
        }

        //Finding the max value of an attribute in an array of objects
        var max = 0;
        jQuery.map(sampletype, function (obj) {
            debugger;
            if (obj.SamTypeSeq > max)
                max = obj.SamTypeSeq;
        });
        //End

        if (sampletypeseq == 0 && sampletype.length == 0) {
            sampletypeseq = 1;
        }
        else {
            sampletypeseq = max + 1//comboItemList.length+1;
        }

        if (isAllValid) {
            var SampletypelistObj = {
                SamTypeSeq: sampletypeseq,
                SampleType: $("#ddlsampletype option:selected").text(),
                SampleTypeId: $('#ddlsampletype').val(),
                SampleTypeQty: $('#txtsamqty').val(),
                Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
            };

            sampletype.push(SampletypelistObj);

            loadsampletypeTable(sampletype);

            //clear select data
            //$('#tblsizedetails').DataTable().destroy();
            $('#ddlsampletype').val('0');
            $('#txtsamqty').val('');
            CalcQty();
        }
    });

    $("#ddlBuyer").change(function () {
        if (DEnbBuyDetails == "Y") {
            debugger;
            var buyerid = this.value;
            if (buyerid > 0) {
                $.ajax({
                    url: "/Buyer/getbyID/" + buyerid,
                    typr: "GET",
                    contentType: "application/json;charset=UTF-8",
                    dataType: "json",
                    success: function (result) {
                        debugger;
                        var obj = result.Value;
                        // $('#ddlcurrency').val(obj.Currency).trigger('change');
                        $('#ddlShipsystem').val(obj.System).trigger('change');
                        $('#ddlShipMode').val(obj.Shipment).trigger('change');
                        $('#ddlPayment').val(obj.Paymode).trigger('change');
                        $('#ddlPordload').val(obj.PortLoad).trigger('change');
                        $('#ddlPorddest').val(obj.PortDestination).trigger('change');
                        //$('#txtAllowence').val(obj.Allowence);

                        if (obj.Manager == 0) {
                            $('#ddlManager').val("").trigger('change');
                        }
                        else {
                            $('#ddlManager').val(obj.Manager).trigger('change');
                        }
                        if (obj.Merch == 0) {
                            $('#ddlMerch').val("").trigger('change');
                        }
                        else {
                            $('#ddlMerch').val(obj.Merch).trigger('change');
                        }
                    },
                    error: function (errormessage) {
                        alert(errormessage.responseText);
                    }
                });
            }
            else {
                $('#ddlShipsystem').val(0).trigger('change');
                $('#ddlShipMode').val(0).trigger('change');
                $('#ddlPayment').val(0).trigger('change');
                $('#ddlManager').val("").trigger('change');
                $('#ddlMerch').val("").trigger('change');
                $('#ddlPordload').val(0).trigger('change');
                $('#ddlPorddest').val(0).trigger('change');
            }
        }
    });


});

function CalcQty() {
    var qty = 0;
    if (sampletype.length > 0) {
        for (var i = 0; i < sampletype.length; i++) {
            if (qty == 0) {
                qty = sampletype[i].SampleTypeQty;
            }
            else {
                qty = parseFloat(qty) + parseFloat(sampletype[i].SampleTypeQty);
            }
        }
    }
    $('#txtQty').val(qty);
}

function loadsampletypeTable(sampleList) {
    $('#tblsampletypedetails').DataTable().destroy();
    debugger;
    $('#tblsampletypedetails').DataTable({
        data: sampleList,
        scrollY: 100,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        columns: [
            { title: "RowSeq", data: "SamTypeSeq", "visible": false },
            { title: "ID", data: "SampleTypeId", "visible": false },
            { title: "SampleType", data: "SampleType" },
            { title: "Sample Qty", data: "SampleTypeQty" },
               {
                   title: "ACTION", "mDataProp": null,
                   //"sDefaultContent": '<button type="button" class="btnedit"> Edit </button> <a id=" 1 " onclick="return DeleteChild(this)" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="1"><i class="fa fa-trash-o" style="cursor: pointer;"></i></a>'
                   "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnremove btn btn-danger btn-round"> <i class="fa fa-times"></i> </button><i class="fa fa-trash-o" style="cursor: pointer;display:none;"></i></a>'//<button type="button" class="btnsizeview"> View Color </button>
               }
        ]
    });
}

function LoadBuyerAdd() {
    $('#txtBuyAdd').val("");
    var BuyID = $('#ddlBuyer').val();

    $.ajax({
        url: "/Buyer/GetbyId/" + BuyID,
        typr: "GET",

        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                $('#txtBuyAdd').val(obj.Address1 + "," + obj.Address2 + "," + obj.Address3);

            }
        }

    });

}

var table, column, compId, Docum;

function GenerateNumber(table, column, compId, Docum) {



    debugger;
    if (emode == 0) {
        table = "Buy_Ord_Mas",
        column = "Order_no",
        // compId = DCompid,//$('#ddlCompany').val(),
        Docum = 'SAMPLE ORDER'

        compId = $('#ddlCompany').val();

        if (compId == null) {
            compId = DCompid;
        } else {
            compId = $('#ddlCompany').val();
        }

        $.ajax({
            url: "/BulkOrder/GenerateNo",
            data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                debugger;
                $('#txtOrderNo').val(result.Value);
            }
        });
    }
}


function LoadGarmConAdd() {
    $('#txtGarmentConID').val("");
    var GUId = $('#ddlUom').val();

    $.ajax({
        url: "/GarmentUom/GetByID/" + GUId,
        typr: "GET",

        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                $('#txtGarmentConID').val(obj.To_BUom);

            }
        }

    });

}

function LoadConAdd() {

    $('#txtConAdd').val("");
    var ConID = $('#ddlConsignee').val();

    $.ajax({
        url: "/Consignee/GetbyId/" + ConID,
        typr: "GET",

        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                $('#txtConAdd').val(obj.Address1 + "," + obj.Address2 + "," + obj.Address3);

            }
        }

    });

}

function LoadBuyAgAdd() {

    $('#txtBuyAgAdd').val("");
    var BuyAgID = $('#ddlAgent').val();

    $.ajax({
        url: "/Agent/GetbyId/" + BuyAgID,
        typr: "GET",

        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                $('#txtBuyAgAdd').val(obj.Address1 + "," + obj.Address2 + "," + obj.Address3);

            }
        }

    });

}
function LoadShipAgAdd() {

    $('#txtShipAgAdd').val("");
    var ShipAgID = $('#ddlShipAgent').val();

    $.ajax({
        url: "/Agent/GetbyId/" + ShipAgID,
        typr: "GET",

        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                $('#txtShipAgAdd').val(obj.Address1 + "," + obj.Address2 + "," + obj.Address3);

            }
        }

    });

}
function LoadBaseUnitAdd() {
    //   var ShipAgID = $('#ddlShipAgent').val();
    debugger;
    $.ajax({
        url: "/GarmentUom/GetBaseUom/",
        typr: "GET",

        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {
                debugger;
                //var test= obj.GUom;
                //alert(val(obj.GUom));
                $('#txtbasunit').val("PCS");

                $('#txtbasunitID').val("1");

            }
        }

    });

}

function LoadRefNoDDL(RefDDLName) {
    refNoDDL = RefDDLName;
    httpGet("/BulkOrder/GetSampleOrdRefNo", onRefNoSuccess, onRefNoFailure);
}

function LoadOrdNoDDL(OrdNoDDL) {
    ordNoDDL = OrdNoDDL;
    httpGet("/BulkOrder/GetSampleOrdNo", onOrdNoSuccess, onOrdNoFailure);
}
function Add() {
    var res = validate();
    if (res == false) {
        return false;
    }

    var RefNo = $('#txtRefNo').val();

    var OPost = $('input[name="ordpostchk"]:checked').attr('value');
    var PPost = $('input[name="planpostchk"]:checked').attr('value');
    //  CheckRefNo(RefNo);

    var bukmasObj = {
        SeasonId: $('#ddlSeason').val(),
        ShipSystemId: $('ddlShipsystem').val(),
        //Order_Date: new Date($('#dtOrderDate').val()),
        Order_Date: $('#dtOrderDate').val(),
        Order_No: $('#txtOrderNo').val(),
        buyerid: $('#ddlBuyer').val(),
        Buyer_Addid: $('#ddlBuyer').val(),
        Managerid: $('#ddlManager').val(),
        Merchandiserid: $('#ddlMerch').val(),
        Ref_no: $('#txtRefNo').val(),
        Ref_date: $('#dtRefDate').val(),
        //Ref_date: new Date($('#dtRefDate').val()),
        Pay_Systemid: $('#ddlPayment').val(),
        Systemid: $('#ddlShipsystem').val(),
        Payment_Modeid: $('#ddlShipMode').val(),
        AgentId: $('#ddlAgent').val(),
        agent_addid: $('#ddlAgent').val(),
        Shipagentid: $('#ddlShipAgent').val(),
        Shipagent_addid: $('#ddlShipAgent').val(),
        CurrencyId: null,
        Exchange: 1.0000,
        Cancel: 0,
        Comit: 0,
        Closed: "N",
        CloseDate: $('#dtOrderDate').val(),
        // CloseDate: new Date($('#dtOrderDate').val()),
        companyid: $('#ddlCompany').val(),
        Cost_def: "N",
        quantity: $('#txtQty').val(),
        GUOMid: $('#ddlUom').val(),
        GUOM_Conv: $('#txtGarmentConID').val(),
        Agency_Per: null,
        Bas_Unit: $('#ddlUom').val(),
        remarks: null,
        ClaimType: "R",
        NominatedForwarder: "N",
        CSP: "N",
        Buyer_Ref_No: $('#txtBuyRefNo').val(),
        TransAmend: "N",
        ConsigneeId: $('#ddlConsignee').val(),
        CreatedBy: Guserid,
        OrdType: $('#ddlOrderType').val(),
        Consignee_AddID: $('#ddlConsignee').val(),
        NSupplier: NItmList,
        SampleTypeList: sampletype,
        ParentOrdId: $('#ddlParOrderNo').val(),
        OrdPost: OPost,
        PlanPost: PPost,
        FOrderNo: $('#ddlCPOrderNo option:selected').text(),
    };
    LoadingSymb();
    $.ajax({
        url: "/BulkOrder/Add",
        data: JSON.stringify(bukmasObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.Value == true) {
                $('#tMbody').DataTable().destroy();
                //loadData();
                LoadOrderProcessingData();
                $('#myModal1').modal('hide');


                $('#ddlShipMode').val("");
                $('#ddlShipsystem').val("");
                $('#ddlPayment').val("");
                $('#txtRefNo').val("");
                $('#txtQty').val("");
                $('#txtShipAgAdd').val("");
                $('#txtBuyAgAdd').val("");
                $('#txtConAdd').val("");
                $('#txtBuyAdd').val("");
                $('#txtBuyRefNo').val("");
                $('#ddlOrderNo').val("");

                AddUserEntryLog('SalesManagement', 'SampleOrder Processing', 'ADD', $('#txtOrderNo').val());
                //alert('Data Saved Successfully');
                var msg = 'Data Saved Successfully...';
                var flg = 1;
                var mode = 0;
                AlartMessage(msg, flg, mode);
                //window.location.reload();
            } else {

                window.location.href = "/Error/Index";

            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
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

    var day = new Date(),
        year = ((day.getMonth() - 2) < 0) ? (day.getFullYear() - 1) : day.getFullYear(),
        month = ((day.getMonth() - 2) < 0) ? (12 + (day.getMonth() - 2)) : (day.getMonth() + 1),
        date = month + '/' + day.getDate() + '/' + year;

    $('#txtFromDate').val(MainFDate);
    $('#txtToDate').val(Fdatestring);
    $('#dtOrderDate').val(Fdatestring);
    $('#dtRefDate').val(Fdatestring);

}
function AddNom() {


    var nomObj = {
        SupplierId: $('#ddlSupplier').val(),
        ItemId: $('#ddlItem').val(),
        NSOrderNo: $('#txtOrderNo').val(),
    };
    $.ajax({
        url: "/BulkOrder/AddNom",
        data: JSON.stringify(nomObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            //   $('#tbody').DataTable().destroy();
            // loadData();
            $('#myModal').modal('hide');
            $('#ddlSupplier').val("");
            $('#ddlItem').val("");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function clearTextBox() {
    $('#ddlItem').val("");
    $('#ddlSupplier').val("");
    $('#ddlManager').val("");
    $('#ddlMerch').val("");
    $('#ddlShipMode').val("");
    $('#ddlShipsystem').val("");
    $('#ddlPayment').val("");
    $('#ddlConsignee').val("");
    $('#ddlBuyer').val("");
    $('#ddlUom').val("");
    $('#ddlCompany').val("");
    $('#ddlAgent').val("");
    $('#ddlItem').css('border-color', 'lightgrey');
    $('#ddlSupplier').css('border-color', 'lightgrey');
    $('#txtShipAgAdd').val("");
    $('#txtBuyAgAdd').val("");
    $('#txtConAdd').val("");
    $('#txtBuyAdd').val("");
    GenerateNumber();
    LoadShipmodeDDL("#ddlShipMode");
    LoadShipsystemDDL("#ddlShipsystem");
    LoadPayTermsDDL("#ddlPayment");
    LoadBuyerDDL("#ddlBuyer,#ddlMBuyer");
    //LoadBuyerDDL("#ddlMBuyer");
    LoadCompanyDDL("#ddlCompany");
    //LoadCompanyDDL("#ddlMCompany");
    LoadGUomDDL("#ddlUom");
    //LoadEmployeeDDL("#ddlManager,#ddlMerch");
    //LoadEmployeeDDL("#ddlMerch");
    LoadConsigneeDDL("#ddlConsignee");
    LoadAgentDDL("#ddlAgent");
    LoadSAgentDDL("#ddlShipAgent");
    LoadSupplierDDL("#ddlSupp");
    LoadAccessoryItemDDL("#ddlIm");
    //LoadEmployeeDDL("#ddlManager");
    LoadSampleTypeDDL("#ddlsampletype");

    $('#btnsampletypeadd').show();
    $('#btnsampletypeupdate').hide();
    emode = 0;
}

function loadData(BMasId) {
    debugger;
    $.ajax({
        url: "/BulkOrder/ListNomSuppDetails",
        data: JSON.stringify({ Buy_Ord_MasId: BMasId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            supList = result;
            loadSuppTable(supList);

            if (supList.length > 0) {
                $('#nom_model').show();
                var Sup = supList[0].Supplier;
                //var Sup = "";
                loadSuppItemData(Sup);
            }
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function loadSuppItemData(SupName) {
    debugger;
    var BMasId = $('#txtBuyOrdMasID').val();
    var SuppName = "";
    $.ajax({
        url: "/BulkOrder/ListNomSuppItemDetails",
        data: JSON.stringify({ Supplier: SupName, Buy_Ord_MasId: BMasId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            ItmList = result;
            loadItemTable(ItmList);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadGrid() {
    $.ajax({
        type: "GET",
        url: '/BulkOrder/ListDetails/',
        data: JSON.stringify({}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");
            $('#tMbody').DataTable({
                data: dataSet,

                columns: [
                         { title: "BuyOrdMasId", "visible": false },
                         { title: "Company" },
                         { title: "Order No" },
                         { title: "Ref No" },
                         { title: "Date" },
                         { title: "Quantity" },
                         { title: "Action" },
                ]

            });
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function getbyID(MasID) {

    debugger;
    //$('#ddlShipMode').empty();
    //$('#ddlShipsystem').empty();
    //LoadShipmodeDDL("#ddlShipMode");
    // LoadShipsystemDDL("#ddlShipsystem");
    // LoadPayTermsDDL("#ddlPayment");
    //LoadBuyerDDL("#ddlBuyer");
    //  LoadSeasonDDL("#ddlSeason");
    //LoadCompanyDDL("#ddlCompany");
    //LoadEmployeeDDL("#ddlManager");
    //LoadEmployeeDDL("#ddlMerch");
    //LoadConsigneeDDL("#ddlConsignee");
    // LoadAgentDDL("#ddlAgent");
    //LoadSAgentDDL("#ddlShipAgent");
    // LoadGUomDDL("#ddlUom");
    LoadSupplierDDL("#ddlSupp");
    LoadAccessoryItemDDL("#ddlIm");
    LoadSampleTypeDDL("#ddlsampletype");
    emode = 1;

    $.ajax({
        url: "/BulkOrder/EditMainList/" + MasID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                $('#txtQty').val(obj.Quantity);
                $('#txtOldQty').val(obj.Quantity);
                $('#txtBuyOrdMasID').val(obj.Buy_Ord_MasId);
                $('#txtOrderNo').val(obj.Order_No);

                $('#ddlShipMode').val(obj.Payment_ModeId);
                $('#ddlShipsystem').val(obj.SystemId);
                $('#ddlPayment').val(obj.Pay_SystemId);
                //
                $('#ddlAgent').val(obj.AgentId);
                $('#ddlConsignee').val(obj.ConsigneeId);
                $('#ddlMerch').val(obj.MerchandiserId);
                $('#ddlManager').val(obj.ManagerId);
                $('#ddlCompany').val(obj.CompanyId);
                $('#ddlSeason').val(obj.SeasonId);
                $('#ddlShipAgent').val(obj.ShipAgentId);
                $('#ddlBuyer').val(obj.BuyerId);
                $('#ddlUom').val(obj.GuomId);
                $('#ddlOrderType').val(obj.OrdType);
                $('#ddlParOrderNo').val(obj.ParentOrdId).trigger('change');

                if (obj.SampleTypeList != null) {
                    sampletype = obj.SampleTypeList;
                    loadsampletypeTable(sampletype);
                }

                OType = $('#ddlOrderType').val();
                //
                $('#txtBuyRefNo').val(obj.Buyer_Ref_No);
                $('#dtOrderDate').val(moment(obj.Order_Date).format('DD/MM/YYYY'));
                $('#dtRefDate').val(moment(obj.Ref_Date).format('DD/MM/YYYY'));
                $('#txtRefNo').val(obj.Ref_No);

                var buyerid = $('#ddlBuyer').val();
                var AgnID = $('#ddlAgent').val();
                var ConID = $('#ddlConsignee').val();
                var ShipAgnID = $('#ddlShipAgent').val();
                var GUomID = $('#ddlUom').val();
                var BMasId = $('#txtBuyOrdMasID').val();
                OldQty = $('#txtOldQty').val();

                BuyMasId = BMasId;

                var OPost = (obj.OrdPost);
                var PPost = (obj.PlanPost);

                if (OPost == 'P') {
                    $('#chkorderpost').prop("checked", true);
                }
                else {
                    $('#chkorderpost').prop("checked", false);
                }

                if (PPost == 'P') {
                    $('#chkplanpost').prop("checked", true);
                }
                else {
                    $('#chkplanpost').prop("checked", false);
                }
                $("#chkorderpost").attr("disabled", true);
                $("#chkplanpost").attr("disabled", true);
                $("#ddlParOrderNo").attr("disabled", true);

                LoadBuyerEditAdd(buyerid);
                if (AgnID > 0) {
                    LoadAgnEditAdd(AgnID);
                }
                if (ConID > 0) {
                    LoadConEditAdd(ConID);
                }
                if (ShipAgnID > 0) {
                    LoadShipAgnEditAdd(ShipAgnID);
                }
                LoadGUomEditAdd(GUomID);
                //

                // alert(BuyMasId);

                if (BuyMasId == 0) {
                    $('#CList1').hide();
                    $('#CList').hide();
                } else {
                    $('#CList1').show();
                    $('#CList').show();
                }

                LoadFullData();
                loadData(BMasId);

                $('#myModal1').modal('show');

                var Dispatchchecked = $('#ChkDispatch').is(":checked");
                if (Dispatchchecked) {
                    DispatchClosed = "Y";
                }
                else {
                    DispatchClosed = "N";
                }

                if (DispatchClosed == "N") {
                    $('#btnUpdate').show();
                }
                else if (DispatchClosed == "Y") {
                    $('#btnUpdate').hide();
                }

                
                $('#btnAdd').hide();

                $('#btnsampletypeadd').show();
                $('#btnsampletypeupdate').hide();
            }
            else {

            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });

    return false;
}


function LoadFullData() {
    var BMasId = $('#txtBuyOrdMasID').val();

    if (BMasId > 0) {
        var SupName = "";
        $.ajax({
            url: "/BulkOrder/ListNomSuppItemDetails",
            data: JSON.stringify({ Supplier: SupName, Buy_Ord_MasId: BMasId }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {


                NItmList = result;
                loadItemTableSave(NItmList);
            },
            failure: function (errMsg) {
                alert(errMsg);
            }
        });
    }
}

function LoadBuyerEditAdd(BuyID) {


    $.ajax({
        url: "/Buyer/GetbyId/" + BuyID,
        typr: "GET",

        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                $('#txtBuyAdd').val(obj.Address1 + "," + obj.Address2 + "," + obj.Address3);

            }
        }

    });
}
function LoadAgnEditAdd(AgnID) {
    $.ajax({
        url: "/Agent/GetbyId/" + AgnID,
        typr: "GET",

        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                $('#txtBuyAgAdd').val(obj.Address1 + "," + obj.Address2 + "," + obj.Address3);

            }
        }

    });
}


function LoadConEditAdd(ConID) {

    $.ajax({
        url: "/Consignee/GetbyId/" + ConID,
        typr: "GET",

        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                $('#txtConAdd').val(obj.Address1 + "," + obj.Address2 + "," + obj.Address3);

            }
        }

    });
}

function LoadShipAgnEditAdd(ShipAgnID) {

    $.ajax({
        url: "/Agent/GetbyId/" + ShipAgnID,
        typr: "GET",

        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                $('#txtShipAgAdd').val(obj.Address1 + "," + obj.Address2 + "," + obj.Address3);

            }
        }

    });
}
function LoadGUomEditAdd(GUomID) {


    $.ajax({
        url: "/GarmentUom/GetByID/" + GUomID,
        typr: "GET",

        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                $('#txtGarmentConID').val(obj.To_BUom);

            }
        }

    });

}

function Update() {

    var res = validate();
    if (res == false) {
        return false;
    }
    var OQty = 0;

    var NewQty = $('#txtQty').val();


    if (NewQty != OldQty) {
        var ans = confirm("Quantity has been changed, do you want to save the new quantity...")
        if (ans) {
            OQty = NewQty;
        } else {
            OQty = OldQty;
        }
    } else {
        OQty = OldQty;
    }
    for (var t = 0; t < sampletype.length; t++) {
        sampletype[t].Buy_Ord_MasId = $('#txtBuyOrdMasID').val();
    }

    var bukObj = {
        SeasonId: $('#ddlSeason').val(),
        ShipSystemId: $('ddlShipsystem').val(),
        //Order_Date: new Date($('#dtOrderDate').val()),
        Order_Date: $('#dtOrderDate').val(),
        Order_No: $('#txtOrderNo').val(),
        buyerid: $('#ddlBuyer').val(),
        Buyer_Addid: $('#ddlBuyer').val(),
        ManagerId: $('#ddlManager').val(),
        MerchandiserId: $('#ddlMerch').val(),
        Ref_no: $('#txtRefNo').val(),
        Buy_Ord_MasId: $('#txtBuyOrdMasID').val(),
        Ref_date: $('#dtRefDate').val(),
        //Ref_date: new Date($('#dtRefDate').val()),
        Pay_Systemid: $('#ddlPayment').val(),
        Systemid: $('#ddlShipsystem').val(),
        Payment_Modeid: $('#ddlShipMode').val(),
        AgentId: $('#ddlAgent').val(),
        agent_addid: $('#ddlAgent').val(),
        Shipagentid: $('#ddlShipAgent').val(),
        Shipagent_addid: $('#ddlShipAgent').val(),
        CurrencyId: null,
        Exchange: 1.0000,
        Cancel: 0,
        Comit: 0,
        Closed: "N",
        CloseDate: $('#dtOrderDate').val(),
        //CloseDate: new Date($('#dtOrderDate').val()),
        companyid: $('#ddlCompany').val(),
        Cost_def: "N",
        quantity: OQty,//$('#txtQty').val(),
        GUOMid: $('#ddlUom').val(),
        GUOM_Conv: $('#txtGarmentConID').val(),
        Agency_Per: null,
        Bas_Unit: $('#ddlUom').val(),
        remarks: null,
        ClaimType: "R",
        NominatedForwarder: "N",
        CSP: "N",
        Buyer_Ref_No: $('#txtBuyRefNo').val(),
        TransAmend: "N",
        //ConsigneeID: null,
        CreatedBy: Guserid,
        OrdType: $('#ddlOrderType').val(),
        ConsigneeId: $('#ddlConsignee').val(),
        NSupplier: NItmList,
        SampleTypeList: sampletype
    };
    LoadingSymb();
    $.ajax({
        url: "/BulkOrder/Update",
        data: JSON.stringify(bukObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {


            if (result.Value == true) {

                $('#tMbody').DataTable().destroy();
                LoadOrderProcessingData();
                $('#myModal1').modal('hide');
                $('#ddlShipMode').val("");
                $('#ddlShipsystem').val("");
                $('#ddlPayment').val("");
                $('#txtRefNo').val("");
                $('#txtQty').val("");
                $('#txtBuyRefNo').val("");
                $('#ddlOrderNo').val("");


                // $('#myModal1').modal('show');
                $('#btnUpdate').hide();
                $('#btnAdd').show();
                //alert('Data Updated Successfully');
                AddUserEntryLog('SalesManagement', 'SampleOrder Processing', 'UPDATE', $('#txtOrderNo').val());
                var msg = 'Data Updated Successfully...';
                var flg = 1;
                var mode = 0;
                AlartMessage(msg, flg, mode);
                //window.location.reload();
            } else {

                window.location.href = "/Error/Index";


            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function Delete(ID, StyCno) {

    if (StyCno > 0) {

        //alert("Style has been made for this entry,Please Check it....")
        var msg = 'Style has been made for this entry,Please Check it...';
        var flg = 4;
        var mode = 1;
        AlartMessage(msg, flg, mode);
        return true;

    }

    var Dispatchchecked = $('#ChkDispatch').is(":checked");
    if (Dispatchchecked) {
        DispatchClosed = "Y";
    }
    else {
        DispatchClosed = "N";
    }

    if (DispatchClosed == "Y") {

        var msg = 'Dispatch Closed,Please Check it...';
        var flg = 4;
        var md = 1;
        var ul = "";
        AlartMessage(msg, flg, md, ul);
        return true;
    }

    var ordernod = 0;
    $.ajax({
        url: "/BulkOrder/EditMainList/" + ID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            if (result.Status == 'SUCCESS') {
                ordernod = obj.Order_No;
            }
        }
    });

    var Type = "Ord";
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        LoadingSymb();
        $.ajax({
            url: "/BulkOrder/Delete/" + ID,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {


                if (result.Value == true) {
                    AddUserEntryLog('SalesManagement', 'SampleOrder Processing', 'DELETE', ordernod);
                    //alert("Data Deleted Sucessfully");
                    var msg = 'Data Deleted Sucessfully...';
                    var flg = 2;
                    var mode = 0;
                    AlartMessage(msg, flg, mode);
                    $('#tMbody').DataTable().destroy();
                    LoadMainGrid(Type);
                    //window.location.reload();
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

//Valdidation using jquery
function validate() {
    var isValid = true;
    if ($('#txtQty').val().trim() == "") {
        $('#txtQty').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtQty').css('border-color', 'lightgrey');
    }

    if ($('#txtOrderNo').val().trim() == "") {
        $('#txtOrderNo').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtOrderNo').css('border-color', 'lightgrey');
    }
    if ($('#txtRefNo').val().trim() == "") {
        $('#txtRefNo').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtRefNo').css('border-color', 'lightgrey');
    }
    //if ($('#txtBuyRefNo').val().trim() == "") {
    //    $('#txtBuyRefNo').css('border-color', 'Red');
    //    isValid = false;
    //}
    //else {
    //    $('#txtBuyRefNo').css('border-color', 'lightgrey');
    //}
    if ($('#dtOrderDate').val().trim() == "") {
        $('#dtOrderDate').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#dtOrderDate').css('border-color', 'lightgrey');
    }
    if ($('#dtRefDate').val().trim() == "") {
        $('#dtRefDate').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#dtRefDate').css('border-color', 'lightgrey');
    }
    if ($('#ddlUom').val() == 0) {
        $('#ddlUom').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlUom').css('border-color', 'lightgrey');
    }

    if (OType != "D") {
        if ($('#ddlPayment').val() == 0) {
            $('#ddlPayment').css('border-color', 'Red');
            isValid = false;
        }
        else {
            $('#ddlPayment').css('border-color', 'lightgrey');
        }
        if ($('#ddlShipsystem').val() == 0) {
            $('#ddlShipsystem').css('border-color', 'Red');
            isValid = false;
        }
        else {
            $('#ddlShipsystem').css('border-color', 'lightgrey');
        } if ($('#ddlShipMode').val() == 0) {
            $('#ddlShipMode').css('border-color', 'Red');
            isValid = false;
        }
        else {
            $('#ddlShipMode').css('border-color', 'lightgrey');
        }

        if ($('#ddlBuyer').val() == 0) {
            $('#ddlBuyer').css('border-color', 'Red');
            isValid = false;
        }
        else {
            $('#ddlBuyer').css('border-color', 'lightgrey');
        }
    }
    if ($('#ddlCompany').val() == 0) {
        $('#ddlCompany').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlCompany').css('border-color', 'lightgrey');
    }

    if ($('#ddlManager').val() == 0) {
        $('#ddlManager').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlManager').css('border-color', 'lightgrey');
    }
    if ($('#ddlMerch').val() == 0) {
        $('#ddlMerch').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlMerch').css('border-color', 'lightgrey');
    }

    return isValid;
}

function GetRefNo() {


    $('#ddlRefNo').empty();
    LoadRefNoDDL("#ddlRefNo");

}

function GetOrdNo() {


    $('#ddlOrderNo').empty();
    LoadOrdNoDDL("#ddlOrderNo");

}


function MainList() {

    $('#tMbody').DataTable().destroy();


    LoadMainGrid(Gs);
}


function CMainList() {
    $('#tMbody').DataTable().destroy();

    LoadMainGrid(Gs);
}

function BMainList() {
    $('#tMbody').DataTable().destroy();

    LoadMainGrid(Gs);
}

function OMainList() {
    $('#tMbody').DataTable().destroy();

    LoadMainGrid(Gs);
}

function RMainList() {
    $('#tMbody').DataTable().destroy();

    LoadMainGrid(Gs);
}




function LoadMainGrid(Type) {


    var RefNo = "";
    var RNo = $('select#ddlRefNo option:selected').val();

    if (RNo == 0) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlRefNo option:selected').val();
    }


    var OrdNo = "";
    var ONo = $('select#ddlOrderNo option:selected').val();

    if (ONo == 0) {
        OrdNo == "";
    }
    else {

        OrdNo = $('select#ddlOrderNo option:selected').val();
    }

    var cmpid = $('#ddlMCompany').val();
    var buyid = $('#ddlMBuyer').val();
    // var OrdNo = $('#ddlOrderNo').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();


    Gs = Type;
    var OType = $('#ddlMOrderType').val();

    var Dispatchchecked = false;
    Dispatchchecked = $('#ChkDispatch').is(":checked");
    if (Dispatchchecked) {
        DispatchClosed = "Y";
    }
    else {
        DispatchClosed = "N";
    }


    var menufilter = cmpid + ',' + OrdNo + ',' + RefNo + ',' + buyid + ',' + FDate + ',' + TDate + ',' + Gs + ',' + OType + ',' + DispatchClosed;

    localStorage.setItem('SampleOrderMenuFilter', menufilter);

    $.ajax({
        url: "/BulkOrder/ListDetailsMain",
        data: JSON.stringify({ CmpId: cmpid, Order_No: OrdNo, Ref_No: RefNo, BuyId: buyid, frmDate: FDate, ToDate: TDate, OrderType: Gs, OrdType: OType, DispatchClosed: DispatchClosed }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger
            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");
            $('#tMbody').DataTable({
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
                          { title: "BuyOrdMasId", "visible": false },
                          { title: "Company" },
                          { title: "Buyer" },
                         { title: "Order No" },
                         { title: "Ref No" },
                         { title: "Date" },
                         { title: "Quantity" },
                         { title: "StyleCount", "visible": false },
                        { title: "Approved", "visible": false },
                        { title: "GCount", "visible": false },
                        { title: "BuyerId", "visible": false },
                         { title: "Action" },
                ]

            });

        },

        failure: function (errMsg) {
            debugger
            alert(errMsg);
        }
    });
    //$('#tMObody').DataTable().destroy();
}


function LoadMainGridFromBack(Type) {

    var fill = localStorage.getItem('SampleOrderMenuFilter');
    var fillobj = [];
    fillobj = fill.split(",");
    Gs = Type;
    $('#txtFromDate').val(fillobj[4]);
    $('#txtToDate').val(fillobj[5]);

    if (fillobj[1] == "undefined") {
        fillobj[1] = '';
    }
    if (fillobj[2] == "undefined") {
        fillobj[2] = '';
    }
    

    $.ajax({
        url: "/BulkOrder/ListDetailsMain",
        data: JSON.stringify({ CmpId: fillobj[0], Order_No: fillobj[1], Ref_No: fillobj[2], BuyId: fillobj[3], frmDate: fillobj[4], ToDate: fillobj[5], OrderType: Gs, OrdType: fillobj[7], DispatchClosed: fillobj[8] }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger
            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");
            $('#tMbody').DataTable({
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
                          { title: "BuyOrdMasId", "visible": false },
                          { title: "Company" },
                          { title: "Buyer" },
                         { title: "Order No" },
                         { title: "Ref No" },
                         { title: "Date" },
                         { title: "Quantity" },
                         { title: "StyleCount", "visible": false },
                        { title: "Approved", "visible": false },
                        { title: "GCount", "visible": false },
                        { title: "BuyerId", "visible": false },
                         { title: "Action" },
                ]

            });

        },

        failure: function (errMsg) {
            debugger
            alert(errMsg);
        }
    });
    //$('#tMObody').DataTable().destroy();
}


function LoadOrderProcessingData() {

    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    $.ajax({
        url: "/BulkOrder/ListDetailsMain",
        data: JSON.stringify({ frmDate: FDate, ToDate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {

            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");
            $('#tMbody').DataTable({
                data: dataSet,
                columns: [
                          { title: "BuyOrdMasId", "visible": false },
                          { title: "Company" },
                         { title: "Buyer" },
                         { title: "Order No" },
                         { title: "Ref No" },
                         { title: "Date" },
                         { title: "Quantity" },
                         { title: "Action" },
                ]

            });

        },

        failure: function (errMsg) {

            alert(errMsg);

        }

    });
    //$('#tMObody').DataTable().destroy();
}

function onRefNoSuccess(result) {
    if (result.Status == "SUCCESS") {
        var data = result.Value;

        $(refNoDDL).empty();
        $(refNoDDL).append($('<option/>').val('0').text('--Select Ref No--'));
        $.each(data, function () {
            $(refNoDDL).append($('<option></option>').text(this.Ref_No));
        });
    }
    else {
        //alert('RefNo loading failed');
        var msg = 'Refer Number loading failed...';
        var flg = 4;
        var mode = 1;
        AlartMessage(msg, flg, mode);
    }
}

function onRefNoFailure(result) {
    //alert('RefNo loading failed');
    var msg = 'Refer Number loading failed...';
    var flg = 4;
    var mode = 1;
    AlartMessage(msg, flg, mode);
}


function onOrdNoSuccess(result) {
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(ordNoDDL).empty();
        $(ordNoDDL).append($('<option/>').val('0').text('--Select Order No--'));
        $.each(data, function () {
            $(ordNoDDL).append($('<option></option>').text(this.Order_No));
        });
    }
    else {
        //alert('OrderNo loading failed');
        var msg = 'Order Number loading failed...';
        var flg = 4;
        var mode = 1;
        AlartMessage(msg, flg, mode);
    }
}

function onOrdNoFailure(result) {
    //alert('OrderNo loading failed');
    var msg = 'Order Number loading failed...';
    var flg = 4;
    var mode = 1;
    AlartMessage(msg, flg, mode);
}

function LoadNom() {

}

////////////////////////nomi////////////////



$(document).ready(function () {

    //component details
    $('#btnSuppadd').click(function () {
        debugger;


        $('#CList1').show();

        var leng = 0;

        var isAllValid = true;


        debugger;
        if ($('#ddlSupp').val() == "0") {
            isAllValid = false;
            $('#ddlSupp').css('border-color', 'Red');
        }
        else {
            $('#ddlSupp').css('border-color', 'lightgrey');
        }

        var sid = $('#ddlSupp').val();
        for (var d = 0; d < supList.length; d++) {
            if (supList[d].SupplierId == sid) {
                //alert('Must be different supplier...');
                var msg = 'Must be different supplier...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                fnClearSupControls();
                return true;
            }
        }

        if (supList.length == 0) {
            leng = 1;
        }
        else {
            leng = supList.length + 1;
        }

        SupSno = leng;

        // SupId = $('#ddlSupp').val();
        Supp = $("#ddlSupp option:selected").text();



        if (isAllValid) {


            debugger;
            var supListObj = {
                Supplier: $("#ddlSupp option:selected").text(),
                SupplierId: $('#ddlSupp').val(),
                SlNo: leng,

                Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
            };

            supList.push(supListObj);

            loadSuppTable(supListObj);

            fnClearSupControls();
        }
    });

    $(document).on('click', '.btnsupedit', function () {
        debugger;
        Mode = 1;

        rowindex = $(this).closest('tr').index();

        var currentro12 = supList.slice(rowindex);

        $('#ddlSupp').val(currentro12[0]['SupplierId']);



        $('#btnSuppadd').hide();
        $('#btnSuppupdate').show();
    });



    $('#btnSuppupdate').click(function () {
        debugger;
        var currentrowsel = supList.slice(rowindex);

        currentrowsel[0]['SupplierId'] = $("#ddlSupp").val();
        currentrowsel[0]['Supplier'] = $("#ddlSupp option:selected").text();


        supList[rowindex] = currentrowsel[0];

        loadSuppTable(supList);

        $('#btnSuppupdate').hide();
        $('#btnSuppadd').show();

        if (Mode == 0) {
            fnClearSupControls();
        }
        else {
            fnClearSupControls();

        }
        Mode = 0;
    });

    $(document).on('click', '.btnsupremove', function () {
        rowindex = $(this).closest('tr').index();
        supList.splice(rowindex, 1);
        document.getElementById("tblSupdetails").deleteRow(rowindex + 1);
    });
    //






});

function loadSuppTable(supListObj) {
    debugger;
    $('#tblSupdetails').DataTable().destroy();

    supList.sort(function (a, b) {
        return a.SlNo - b.SlNo;
    });
    //PlanYarn1[0][2]
    $('#tblSupdetails').DataTable({
        // "order": [[8, "asc"]],
        data: supList,
        bSort: false,

        columns: [
            //{ title: "SlNo", data: "SlNo" },
            { title: "SupplierId", data: "SupplierId", "visible": false },
            { title: "Supplier", data: "Supplier", },

               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnsupedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button"data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnsupremove btn btn-round btn-danger"> <i class="fa fa-minus"></i> </button> <button data-toggle="tooltip" data-placement="top" title="View Item" type="button" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnsupItemview btn btn-round btn-info"> <i class="fa fa-eye"></i> </button>  '

                   //"sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnsupedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnsupremove btn btn-round btn-danger"> <i class="fa fa-minus"> </button><button type="button" data-toggle="tooltip" data-placement="top" title="View Item" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnsupItemview btn btn-round btn-info"> <i class="fa fa-eye"> </button> '

               },

        ]
    });

}







$(document).on('click', '.btnsupItemview', function () {
    debugger;

    // $(this).addClass('selected');

    rowindex = $(this).closest('tr').index();


    var currentro12 = supList.slice(rowindex);


    var FSupplierId = currentro12[0]['SupplierId'];
    var FSupplier = currentro12[0]['Supplier'];


    SupId = FSupplierId;


    rowindex = $(this).closest('tr').index();

    var currentro12 = supList.slice(rowindex);
    var supplierid = currentro12[0].SupplierId;
    //var supp = currentro12[0].Supplier;
    var supp = $(this).closest('tr').find('td:eq(0)').html();
    suppName = $(this).closest('tr').find('td:eq(0)').html();
    // alert(suppName);

    var FItmList = new Array();
    for (var d = 0; d < NItmList.length; d++) {
        if (NItmList[d].SupplierId == SupId) {
            // loadItemTable(NItmList[d]);
            FItmList.push(NItmList[d]);
        }

    }


    loadItemTableView(FItmList);


});

function fnClearSupControls() {
    debugger;
    $('#ddlSupp').val('0');


}

////////nomi item

$(document).ready(function () {

    //component details
    $('#btnImadd').click(function () {
        debugger;
        $('#CList').show();

        if (SupId == 0) {
            //alert("Please select Supplier...")
            var msg = 'Please select Supplier...';
            var flg = 4;
            var mode = 1;
            AlartMessage(msg, flg, mode);
            return true;
        }
        else {
            var itmid = $('#ddlIm').val();
            for (var t = 0; t < NItmList.length; t++) {
                if (NItmList[t].SupplierId == SupId && NItmList[t].ItemId == itmid) {
                    //alert('Must be different item for same supplier...');
                    var msg = 'Must be different item for same supplier...';
                    var flg = 4;
                    var mode = 1;
                    AlartMessage(msg, flg, mode);
                    $('#ddlIm').val('0');
                    return true;
                }
            }
        }

        if (BuyMasId == 0) {

            var cnt = $("#tblimdetails tr").length - 1;

            var Data = "";

            // PackItemList = [];
            for (var i = 1; i <= cnt; i++) {

                var OSupId = $("#tblimdetails tr:eq(" + i + ") td:eq(3)").html();
                var OItmId = $("#tblimdetails tr:eq(" + i + ") td:eq(1)").html();




            }

            if (ItmList.length > 0) {
                if (OSupId != SupId && OItmId != GItemId) {
                    ItmList = [];


                }
            }


        }


        var leng = 0;

        var isAllValid = true;


        debugger;
        //if ($('#ddlIm').val() == "0") {
        //    isAllValid = false;
        //    $('#ddlIm').siblings('span.error').css('visibility', 'visible');
        //}
        //else {
        //    $('#ddlIm').siblings('span.error').css('visibility', 'hidden');
        //}

        if ($('#ddlIm').val() == "0") {
            isAllValid = false;
            $('#ddlIm').css('border-color', 'Red');
        }
        else {
            $('#ddlIm').css('border-color', 'lightgrey');
        }

        var SSNo = SupSno;
        var SuppliId = SupId;
        var SName = suppName;
        GItemId = $('#ddlIm').val();
        if (isAllValid) {


            debugger;
            var itmListObj = {
                Item: $("#ddlIm option:selected").text(),
                ItemId: $('#ddlIm').val(),
                NomSupId: 0,
                SupplierId: SuppliId,
                Supplier: SName,

                Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
            };

            if (BuyMasId > 0) {
                NItmList.push(itmListObj);
                var filtered = [];
                filtered = NItmList;

                loadItemTableSave(filtered);

                filtered = $.grep(filtered, function (v) {
                    return v.SupplierId === SuppliId;
                });


                loadItemTableView(filtered);
                //    //loadItemTable(itmListObj);
            }
            if (BuyMasId == 0) {

                list.push(itmListObj);



                var filteredarr = [];
                filteredarr = list;

                filteredarr = $.grep(filteredarr, function (v) {
                    return v.SupplierId === SuppliId;
                });

                loadItemTableView(filteredarr);
            }


            if (BuyMasId == 0) {
                NItmList.push(itmListObj);
                loadItemTableSave(itmListObj);
            }

            fnClearItmControls();
        }

    });

    $(document).on('click', '.btnitmedit', function () {
        debugger;
        Mode = 1;

        rowindex = $(this).closest('tr').index();

        var currentro12 = ItmList.slice(rowindex);

        $('#ddlIm').val(currentro12[0]['ItemId']);



        $('#btnImadd').hide();
        $('#btnImupdate').show();
    });

    $('#btnImupdate').click(function () {
        debugger;
        var currentrowsel = ItmList.slice(rowindex);

        currentrowsel[0]['ItemId'] = $("#ddlIm").val();
        currentrowsel[0]['Item'] = $("#ddlIm option:selected").text();


        ItmList[rowindex] = currentrowsel[0];

        loadItemTable(ItmList);

        $('#btnImupdate').hide();
        $('#btnImadd').show();

        if (Mode == 0) {
            fnClearItmControls();
        }
        else {
            fnClearItmControls();

        }
        Mode = 0;
    });

    $(document).on('click', '.btnitmremove', function () {
        rowindex = $(this).closest('tr').index();
        ItmList.splice(rowindex, 1);
        document.getElementById("tblimdetails").deleteRow(rowindex + 1);
    });
    //






});


function fnClearItmControls() {
    debugger;
    $('#ddlIm').val('0');

}

function loadItemTable(itmListObj) {
    $('#tblimdetails').DataTable().destroy();
    debugger;

    $('#tblimdetails').DataTable({
        // "order": [[8, "asc"]],
        data: ItmList,
        //scrollY: 300,
        //scrollCollapse: true,
        //paging: false,
        //fixedColumns: false,
        //select: false,
        //scrollX: "100%",
        //scrollXInner: "100%",
        //scroller: false,

        columns: [
            { title: "NsupId", data: "NomSupId", "visible": false },
            { title: "ItemId", data: "ItemId", "visible": false },
            { title: "Item", data: "Item" },
            { title: "SuppId", data: "SupplierId", "visible": false },

               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnitmedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnitmremove btn btn-round btn-danger"> <i class="fa fa-minus"></i> </button>'
               }
        ]
    });
}


function loadItemTableView(list) {
    $('#tblimdetails').DataTable().destroy();
    debugger;

    $('#tblimdetails').DataTable({
        // "order": [[8, "asc"]],

        data: list,
        bSort: false,

        columns: [
            { title: "NsupId", data: "NomSupId", "visible": false },
            { title: "ItemId", data: "ItemId", "visible": false },
            { title: "Item", data: "Item" },
            { title: "SuppId", data: "SupplierId", "visible": false },

               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnitmedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnitmremove btn btn-round btn-danger"> <i class="fa fa-minus"></i> </button>'
               }
        ]
    });
}




function loadItemTableSave(itmListObj) {
    $('#tblimdetailsSave_wrapper').DataTable().destroy();
    debugger;

    $('#tblimdetailsSave_wrapper').DataTable({
        // "order": [[8, "asc"]],
        data: NItmList,

        columns: [
            { title: "NsupId", data: "NomSupId" },
            { title: "ItemId", data: "ItemId" },
            { title: "Item", data: "Item" },
            { title: "SuppId", data: "SupplierId" },
              { title: "Supplier", data: "Supplier" },


        ]
    });
}

function CClose() {

    window.location.href = "/SampleOrder/SampleOrderIndex";
}

function LOADSTYLE() {

    var Prg = "Sty";
    Gs = Prg;
    var Type = "Sty";
    $('#tMbody').DataTable().destroy();

    var fill = localStorage.getItem('SampleOrderMenuFilter');
    if (fill != "null" && fill != null) {

        LoadMainGridFromBack(Type);
    } else {
        LoadMainGrid(Type);
    }

    //LoadMainGrid(Type);
}
function LOADORDER() {

    var Prg = "Ord";
    Gs = Prg;
    var Type = "Ord";
    $('#tMbody').DataTable().destroy();
    var fill = localStorage.getItem('SampleOrderMenuFilter');
    if (fill != "null" && fill != null) {

        LoadMainGridFromBack(Type);
    } else {
        LoadMainGrid(Type);
    }
    //LoadMainGrid(Type);
}

function AddStyleEntry(Id) {
    var Mod = 0;
    window.location.href = "/StyleEntry/StyleEntryIndex?BMasId=" + Id + "=&Mode=" + Mod + "=&type=" + "S";
}
function EditStyEntry(Id) {
    var Mod = 1;
    window.location.href = "/StyleEntry/StyleEntryIndex?BMasId=" + Id + "=&Mode=" + Mod + "=&type=" + "S";
}
function DeleteStyEntry(Id) {
    var Mod = 2;
    window.location.href = "/StyleEntry/StyleEntryIndex?BMasId=" + Id + "=&Mode=" + Mod + "=&type=" + "S";
}
function CheckRefNo(RefNo) {
    $.ajax({
        url: "/BulkOrder/CheckRefno",
        data: JSON.stringify({ Ref_No: RefNo }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            debugger;
            if (obj != undefined) {
                var RefNo = obj.Ref_No;
                if (RefNo != null) {
                    //alert("RefNo Already Exists...");
                    var msg = 'Refer Number Already Exists...';
                    var flg = 4;
                    var mode = 1;
                    AlartMessage(msg, flg, mode);
                    $('#txtRefNo').val("");
                    $('#txtRefNo').focus();
                    return true;
                }
            }
            else {

            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

//function Buy_ord_Print(Id) {
//    debugger;
//    var Mod = 1;
//    //$('#myModal3').modal('show');
//    //var src = '../Reports/BuyerOrderInlineReport.aspx?';
//    //src = src + "ddlOrderNo=" + Id
//    ////src = src + "txtFromDate=" + FDate
//    ////src = src + "&txtToDate=" + TDate
//    //var iframe = '<iframe id="reportFrame" align="center" width="100%" height="1000px" background-image="none" frameborder="0" src="' + src + '" allowfullscreen></iframe>';
//    //$("#divReport").html(iframe);
//    window.location.href = "../ReportInline/OrderProcessing/SampleOrderInlineReport.aspx?ddlOrderNo=" + Id;
//}
function Buy_ord_Print(Id) {
    debugger;
    RepId = Id;
    //var Mod = 1;
    //$('#myModal3').modal('show');
    //var src = '../Reports/BuyerOrderInlineReport.aspx?';
    //src = src + "ddlOrderNo=" + Id
    //src = src + "txtFromDate=" + FDate
    //src = src + "&txtToDate=" + TDate
    //var iframe = '<iframe id="reportFrame" align="center" width="100%" height="1000px" background-image="none" frameborder="0" src="' + src + '" allowfullscreen></iframe>';
    //$("#divReport").html(iframe);
    //window.location.href = "../Reports/BuyerOrderInlineReport.aspx?ddlOrderNo=" + Id;
    $('#myModal2').show();
    $('#myModal2').modal('show');
    $('#selectall').val("");
    GenerateReportItem();
}

function GenerateReportItem() {
    debugger;
    name = "BUYER ORDER"
    $.ajax({
        url: "/BulkOrder/GetReportOption",
        data: JSON.stringify({ docname: name }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            //document.getElementById('sbTwo');
            var obj = result.Value;
            repobj = obj;
            $("#sbTwo").empty();
            $.each(obj, function () {
                $("#sbTwo").append($("<option></option>").val(this.optionid).html(this.option));

            });

            i = 0, size = obj.length;
            for (i; i < size; i++) {
                //$("#sbTwo").multiselect("widget").find(":checkbox[value='" + obj[i][optionid] + "']").attr("checked", "checked");
                if (obj[i].optionvalue == true) {
                    $("#sbTwo").find(":checkbox[value='" + obj[i].optionid + "']").attr("checked", true);
                    $("#sbTwo option[value='" + obj[i].optionid + "']").attr("selected", true);
                    //$("#sbTwo").multiselect("refresh");
                }
                else {
                    $("#sbTwo").find(":checkbox[value='" + obj[i].optionid + "']").attr("checked", false);
                    $("#sbTwo option[value='" + obj[i].optionid + "']").attr("selected", false);
                }
            }
        }
    });
}
function SubReport() {
    debugger;
    //$('#myModal3').modal('show');
    //var src = '../Reports/BuyerOrderInlineReport.aspx?';
    //var iframe = '<iframe id="reportFrame" align="center" width="100%" height="1000px" background-image="none" frameborder="0" src="' + src + '" allowfullscreen></iframe>';
    //$("#divReport").html(iframe);
    //var opt = 0;
    //var opt = "13467";


    var MOrd = 0;

    var arr = [];
    var nam = [];
    var tet = [];
    $('#sbTwo :selected').each(function (i, sel) {
        //alert($(sel).text());
        MOrd = MOrd + "," + $(sel).val();
        arr.push($(sel).val());
        nam.push($(sel).text());
        //var obj = {
        //    optionname: $(sel).text(),
        //    optionid: $(sel).val(),
        //    optionval:1
        //}
        //tet.push(obj);
    });
    var res = [];
    var p = [];
    for (var r = 0; r < repobj.length; r++) {
        res.push(repobj[r].optionid);
        p.push(0);
        //var obj = {
        //    optionname: repobj[r].optionname,
        //    optionid: repobj[r].optionid,
        //    optionval: 0
        //}
        //tet.push(obj);
    }

    for (var y = 0; y < arr.length; y++) {
        for (var f = 0; f < res.length; f++) {
            if (arr[y] == res[f]) {
                p[f] = 1;
            }
        }
    }
    var compId = $('#ddlMCompany').val();
    // window.location.href = "../Reports/BuyerOrderInlineReport.aspx?ddlOrderNo=" + RepId + "&Multiopt=" + arr + "&Multinam=" + nam;

    window.open("../Reports/BuyerOrderInlineReport.aspx?ddlOrderNo=" + RepId + "&Multiopt=" + MOrd + "&Combodet=" + p[0] + "&MeasChart=" + p[1] + "&OrdIns=" + p[2] + "&Chklst=" + p[3] + "&Material=" + p[4] + "&Ratematrix=" + p[5] + "&Packing=" + p[6] + "&GSM=" + p[7] + "&INR=" + p[8] + "&Shipdet=" + p[9] + "&PrntImg=" + p[10] + "&Companyid=" + compId + "&OrdType=" + "S");//+ "&MultiOptionid=" + MOrd;

}
function backtomain() {
    $("#myModal2").hide();
    $("#myModal2").modal('hide');
}


function LoadOrderPrefix() {


    var OrderType = $('#ddlOrderType').val();

    var compId = $('#ddlCompany').val();

    if (compId > 0) {
        if (OrderType == "B") {
            OType = "B";
            GenerateNumber();
        }
        else if (OrderType == "S") {
            OType = "S";
            GenerateNumber();
        } else if (OrderType == "D") {
            OType = "D";
            GenerateNumber();
        }
    } else {
        if (OrderType == "B") {
            OType = "B";

        }
        else if (OrderType == "S") {
            OType = "S";

        } else if (OrderType == "D") {
            OType = "D";

        }
    }
}

function LoadFOrdDropDetails() {


    var BMasId = $('#ddlCPOrderNo').val();
    var JbId = 0;
    var StyId = 0;
    var RefNo = "";
    var RNo = $('select#ddlCPRefNo option:selected').val();

    if (RNo == 0) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlCPRefNo option:selected').val();
    }


    $.ajax({
        url: "/StockAuditEntry/GetDropNo",
        data: JSON.stringify({ BMasId: BMasId, JobId: JbId, Styleid: StyId, RefNo: RefNo }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;


                //RefNo
                $(ddlCPRefNo).empty();
                $(ddlCPRefNo).append($('<option/>').val('0').text('--Select RefNo--'));
                $.each(data, function () {
                    $(ddlCPRefNo).append($('<option></option>').text(this.RefNo));
                });

            }


        }

    });

}

function LoadCpyOrderNo() {
    debugger;
    var mid = $("#ddlCPOrderNo").val();
    if (mid != 0) {
        $('#ddlItem').val("");
        $('#ddlSupplier').val("");
        $('#ddlManager').val("");
        $('#ddlMerch').val("");
        $('#ddlShipMode').val("");
        $('#ddlShipsystem').val("");
        $('#ddlPayment').val("");
        $('#ddlConsignee').val("");
        $('#ddlBuyer').val("");
        $('#ddlUom').val("");
        $('#ddlCompany').val("");
        $('#ddlAgent').val("");
        $('#ddlItem').css('border-color', 'lightgrey');
        $('#ddlSupplier').css('border-color', 'lightgrey');
        $('#txtShipAgAdd').val("");
        $('#txtBuyAgAdd').val("");
        $('#txtConAdd').val("");
        $('#txtBuyAdd').val("");
        getbyCpyID(mid);
    }
    else {
        //alert('Please Select any OrderNo...');
        var msg = 'Please Select any Order Number...';
        var flg = 4;
        var md = 1;
        var ul = "";
        AlartMessage(msg, flg, md, ul);
    }
}


function getbyCpyID(MasID) {
    debugger;
    LoadSupplierDDL("#ddlSupp");
    LoadAccessoryItemDDL("#ddlIm");

    $.ajax({
        url: "/BulkOrder/EditMainList/" + MasID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                //$('#txtQty').val(obj.Quantity);
                $('#txtOldQty').val(obj.Quantity);
                $('#txtBuyOrdMasID').val(obj.Buy_Ord_MasId);
                // $('#txtOrderNo').val(obj.Order_No);

                $('#ddlShipMode').val(obj.Payment_ModeId).trigger('change');
                $('#ddlShipsystem').val(obj.SystemId).trigger('change');
                $('#ddlPayment').val(obj.Pay_SystemId).trigger('change');
                //
                $('#ddlAgent').val(obj.AgentId).trigger('change');
                $('#ddlConsignee').val(obj.ConsigneeId).trigger('change');
                $('#ddlMerch').val(obj.MerchandiserId).trigger('change');
                $('#ddlManager').val(obj.ManagerId).trigger('change');
                $('#ddlCompany').val(obj.CompanyId).trigger('change');
                $('#ddlSeason').val(obj.SeasonId).trigger('change');
                $('#ddlShipAgent').val(obj.ShipAgentId).trigger('change');
                $('#ddlBuyer').val(obj.BuyerId).trigger('change');
                $('#ddlUom').val(obj.GuomId).trigger('change');
                $('#ddlOrderType').val(obj.OrdType).trigger('change');
                $('#ddlQuoteNo').val(obj.QuoteId).trigger('change');

                OType = $('#ddlOrderType').val();
                //
                $('#txtBuyRefNo').val(obj.Buyer_Ref_No);
                //$('#dtOrderDate').val(moment(obj.Order_Date).format('DD/MM/YYYY'));
                //$('#dtRefDate').val(moment(obj.Ref_Date).format('DD/MM/YYYY'));
                //$('#txtRefNo').val(obj.Ref_No);

                var buyerid = $('#ddlBuyer').val();
                var AgnID = $('#ddlAgent').val();
                var ConID = $('#ddlConsignee').val();
                var ShipAgnID = $('#ddlShipAgent').val();
                var GUomID = $('#ddlUom').val();
                var BMasId = $('#txtBuyOrdMasID').val();
                OldQty = $('#txtOldQty').val();

                BuyMasId = BMasId;
                GenerateNumber();
                LoadBuyerEditAdd(buyerid);
                if (AgnID > 0) {
                    LoadAgnEditAdd(AgnID);
                }
                if (ConID > 0) {
                    LoadConEditAdd(ConID);
                }
                if (ShipAgnID > 0) {
                    LoadShipAgnEditAdd(ShipAgnID);
                }
                LoadGUomEditAdd(GUomID);
                //

                // alert(BuyMasId);

                if (BuyMasId == 0) {
                    $('#CList1').hide();
                    $('#CList').hide();
                } else {
                    $('#CList1').show();
                    $('#CList').show();
                }

                //LoadCheckBomJobDetails();

                LoadFullData();
                loadData(BMasId);

            }
            else {

            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });

    return false;
}

function OpenRevQuote() {

    var quoid = $('#ddlQuoteNo').val();
    //if (quoid == 0) {
    //    alert("Please select the Quotation no and then click the revised..");
    //    $("#chk").prop("checked", false);
    //    return true;

    //}
    //else {
    if ($('#chk').is(":checked")) {

        $('#ddlrevid').show();
        GetRevNo(quoid);
    } else {
        $('#ddlrevid').hide();
    }
    //}
}