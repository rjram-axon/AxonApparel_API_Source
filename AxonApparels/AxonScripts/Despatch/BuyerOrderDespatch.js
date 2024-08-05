var maintbllist = [];
var AddGridtbllist = [];
var ItemGridtbllist = [];
var StockGridtbllist = [];
var StockGridtbllistFilter = [];
var InnerHeaderInfo = [];
var table, column, compId, Docum;
var companyid, despatchid = 0;
var storeid = 0;
var ItemId, ColorId, SizeId = 0;
var shiprowId, buyOrdShip, orderNo, style, destination, refno, shipno, buyer, shiptype = 0;
var fromdate, todate = 0;
var index = -1;
var repobj = [];
var Repid = 0;
var GUserid = 0;
var UserName = 0;
var DCompid = 0;
var BuyOrddespatchEditFlg = "disabled";
var BuyOrddespatchDeleteFlg = "disabled";
var BuyOrddespatchPrintFlg = "disabled";
var SalesHeaderInfo = [];
var SalesItemdet = [];
var ShipItemList = [];
var chkSalesInv = 'N';
var Exrate = 0;
var Mode = 0;
var TotInvQty = 0;
$(document).ready(function () {
    LoadCompanyDDL("#ddlMCompany,#ddlCompany,#ddlinnCompany");
    LoadBuyerDDL("#ddlMBuyer,#ddlBuyer,#ddlinnbuyer");
    LoadStoreUnitDDL("#ddlIssueStore,#ddlinnIssStore");
    LoadSupplierDDL("#ddlFreightSupplier");
    LoadCountryDDL('#ddlinnDestination');
    LoadStyleDDL("#ddlinnstyle");
    LoadEmployeeDDL("#ddlinnMerchandiser,#ddlinnManager");
    LoadShipmodeDDL('#ddlShipMode');
    LoadShipsystemDDL('#ddlSystem');
    LoadPortOfLoadingDDL('#ddlPortOfDischarge');
    LoadProcessDDL("#ddlProcess");
    LoadBulkOrderNoDDL("#ddlMOrderNo,#ddlOrderNo");
    LoadBulkRefNoDDL("#ddlMRefNo,#ddlRefNo");
    LoadInvNo();
    GUserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    DCompid = $("#hdnDCompid").data('value');
    chkSalesInv = $("#hdnChkInvDesp").data('value');
    if (chkSalesInv == 'Y') {
        $('#SalInvNo').show();
    } else {
        $('#SalInvNo').hide();
    }

    getDate();
    //$('#txtFromDate').val(moment(new Date()).format('DD/MM/YYYY'));
    //$('#txtToDate').val(moment(new Date()).format('DD/MM/YYYY'));
    debugger;
    fromdate = $("#txtFromDate").val();
    todate = $("#txtToDate").val();
    companyid = $("#ddlMCompany").val();

     var CompId = $('#ddlMCompany').val();

    if (CompId == null) {
        CompId = DCompid;
    } else {
        CompId = $('#ddlMCompany').val();
    }

    //if (companyid == null) { companyid = 0; }

    var fill = localStorage.getItem('BuyerOrderDespatchMainFilter');
    if (fill != "null" && fill != null) {
        LoadDataFromBack(CompId, fromdate, todate);
    } else {
        LoadData(CompId, fromdate, todate);
    }

    //LoadData(CompId, fromdate, todate);
    $("#selectall").change(function () {
        debugger;
        if (this.checked == true) {
            $('#sbTwo option').each(function () {
                $(this).prop('selected', true);
            });
        } else {
            $('#sbTwo option').each(function () {
                $(this).prop('selected', false);
            });
        }
    });
    $("#btnaddnew").click(function () {
        debugger;
        companyid = $("#ddlMCompany").val();

        if (companyid == 0) {
            //alert("Please select Company");
            var msg = 'Please select Company...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
        }
        else {
            $("#ddlCompany").val(companyid);
            $('#ddlIssueStore').val(0);
            $('#ddlOrderNo').val(0);
            $('#ddlRefNo').val(0);
            $('#ddlBuyer').val(0);

            $('#myModal').modal('show');
            GetAddGridDetails();
        }
    });

    //$(document).on('click', '.btnitem', function () {
    //    debugger;
    //    rowindex = $(this).closest('tr').index();
    //    var currowind = ItemGridtbllist.slice(rowindex);
    //    //var ProdDetId = currowind[0]['ProductionDetId'];
    //    ItemId = currowind[0]['ItemId'];
    //    ColorId = currowind[0]['ColorId'];
    //    SizeId = currowind[0]['SizeId'];

    //    if (StockGridtbllist.length == 0) {
    //        GetItemStock(orderNo, ItemId, ColorId, SizeId);
    //    }

    //    if (StockGridtbllist != undefined) {
    //        StockGridtbllistFilter = $.grep(StockGridtbllist, function (element, index) {
    //            //return (element.ProdDetId == currowind[0]['ProductionDetId']);
    //            return (element.ItemId == ItemId && element.ColorId == ColorId && element.SizeId == SizeId);
    //        });
    //    }

    //    LoadStockDetails(StockGridtbllistFilter);
    //});

    $(document).on('click', '.btnmaingrdedit', function () {
        debugger;
        Mode = 1;
        //rowindex = $(this).closest('tr').index();

        //var currow = maintbllist.slice(rowindex);
        //despatchid = currow[0]['DespatchID'];
        //ProdReceiptNo = currow[0]['ReceiptNo'];

        var row = $(this).closest('tr');
        var data = $('#tbldespatchmaingrid').dataTable().fnGetData(row);


         despatchid = data.DespatchID;
         ProdReceiptNo = data.ReceiptNo;
      
         Mode = 1;

        $('#myModal1').modal('show');
        $('#btnAdd').hide();
        $('#btnDel').hide();
        $('#btnUpdate').show();

        getbyID(despatchid);
    });

    $(document).on('keyup', '.txtitemdespatch', function () {
        debugger;
        var rowindex = $(this).closest('tr').index();

        calcAmt(this.value, rowindex);
    });

    $(document).on('keyup', '.txtstckdespatch', function () {
        debugger;
        var rowindex = $(this).closest('tr').index();
        calcsepquan(this.value, rowindex);
    });

    $("#ddlMCompany").change(function () {
        //fromdate = $("#txtFromDate").val();
        //todate = $("#txtToDate").val();

        //if ($("#ddlMCompany").val() != 0) {
        //    //$('#ddlinnerprocess').css('border-color', 'lightgrey');
        //    LoadData(companyid, fromdate, todate);
        //}
        ListFilter();
    });

    $("#btnclose").click(function () {
        $('#myModal1').modal('hide');
        StockGridtbllist = [];
        ItemGridtbllist = [];
    });

    $("#btnorderclose").click(function () {
        $('#myModal').modal('hide');
        $('#ddlIssueStore').val(0);
        $('#ddlOrderNo').val(0);
        $('#ddlRefNo').val(0);
        $('#ddlBuyer').val(0);
    });

    $("#ddlIssueStore").change(function () {
        storeid = $("#ddlIssueStore").val();

        if (storeid > 0) {
            $('#ddlIssueStore').css('border-color', 'lightgrey');
        }
    });

   

    $(document).on('click', '.btnmaingrddelete', function () {
        debugger;
        //rowindex = $(this).closest('tr').index();

        //var currow = maintbllist.slice(rowindex);
        //var despatchid = currow[0]['DespatchID'];
        var row = $(this).closest('tr');
        var data = $('#tbldespatchmaingrid').dataTable().fnGetData(row);

        Mode = 2;
        despatchid = data.DespatchID;
        Delete(despatchid);
    });

    $(document).on('click', '.btnordadd', function () {
        debugger;
        rowindex = $(this).closest('tr').index();
        var currentcolorrow = AddGridtbllist.slice(rowindex);

        Mode = 0;
        var table = $('#tbladdgriddet').DataTable();
        ShiprowId = table.row($(this).parents('tr')).data()["ShipRowID"];
        BuyOrdShip = table.row($(this).parents('tr')).data()["BuyOrdShip"];
        orderNo = table.row($(this).parents('tr')).data()["OrderNo"];

        //LoadCompanyDDL("#ddlinnCompany");
        //LoadBuyerDDL("#ddlinnbuyer");
        //LoadStyleDDL("#ddlinnstyle");
        //LoadEmployeeDDL("#ddlinnMerchandiser,#ddlinnManager");

        $('#txtShipDate').val(moment(new Date()).format('DD/MM/YYYY'));
        $('#txtDispDate').val(moment(new Date()).format('DD/MM/YYYY'));
        $('#txtInvRefDate').val(moment(new Date()).format('DD/MM/YYYY'));
        $('#txtRefDate').val(moment(new Date()).format('DD/MM/YYYY'));

        //ShiprowId = currentcolorrow[0].ShipRowID;
        //BuyOrdShip = currentcolorrow[0].BuyOrdShip;
        //orderNo = currentcolorrow[0].OrderNo;



        //Style = currentcolorrow[0].Style;
        //destination = currentcolorrow[0].Destination;
        //refno = currentcolorrow[0].RefNo;
        //shipno = currentcolorrow[0].BuyOrdShip;
        //buyer = currentcolorrow[0].Buyer;

        companyid = $("#ddlCompany").val();

        //Company = $("#ddlinnercompany option:selected").text();
        //CompanyUnit = $("#ddlinnercompunit option:selected").text();

        storeid = $("#ddlIssueStore").val();

        if (storeid == 0) {
            //alert("Select Store to proceed...");
            //$('#ddlIssueStore').css('border-color', 'red');
            $('#ddlIssueStore').siblings(".select2-container").css('border', '1px solid red');
        }
        else {
            $('#myModal1').modal('show');
        }

        $('#btnAdd').show();
        $('#btnUpdate').hide();
        $('#btnDel').hide();

        LoadInnerHeaderDetails(ShiprowId);

        LoadItemDetails(ShiprowId, BuyOrdShip, orderNo);

        GenerateDespatchNumber(table, column, compId, Docum);
    });


    $('#tblitemDetails').on('click', 'tr', function (e) {

        var table = $('#tblitemDetails').DataTable();

        //var ItmId = table.row($(this).parents('tr')).data()["itemid"];
        //var ClrId = table.row($(this).parents('tr')).data()["colorid"];
        //var SzId = table.row($(this).parents('tr')).data()["sizeid"];
        //var PId = table.row($(this).parents('tr')).data()["procordid"];


        var row = $(this).closest('tr');
        var data = $('#tblitemDetails').dataTable().fnGetData(row);


        ItemId = data.ItemId;
        ColorId = data.ColorId;
        SizeId = data.SizeId;
        //var PlanSzId = data.PlanSizeID;
        //var PId = data.procordid;

     
        //ItemId = currowind[0]['ItemId'];
        //ColorId = currowind[0]['ColorId'];
        //SizeId = currowind[0]['SizeId'];

        if (StockGridtbllist.length == 0) {
            GetItemStock(orderNo, ItemId, ColorId, SizeId);
        }

        if (StockGridtbllist != undefined) {
            StockGridtbllistFilter = $.grep(StockGridtbllist, function (element, index) {
                //return (element.ProdDetId == currowind[0]['ProductionDetId']);
                return (element.ItemId == ItemId && element.ColorId == ColorId && element.SizeId == SizeId);
            });
        }

        LoadStockDetails(StockGridtbllistFilter);
    });

});

function getDate() {
    debugger;
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
    //$('#txtReceiptDate').val(Fdatestring);
    //$('#txtRefDate').val(Fdatestring);


}


function fnInlinePrint(Id) {
    debugger;
    //var Mod = 1;
    //$('#myModal3').modal('show');
    //var src = '../ReportInline/Production/Despatch/DespatchInlineReport.aspx?';
    //src = src + "ddlOrderNo=" + Id
    ////src = src + "txtFromDate=" + FDate
    ////src = src + "&txtToDate=" + TDate
    //var iframe = '<iframe id="reportFrame" align="center" width="100%" height="1000px" background-image="none" frameborder="0" src="' + src + '" allowfullscreen></iframe>';
    //$("#divReport").html(iframe);
    window.location.href = "../ReportInline/Production/Despatch/DespatchInlineReport.aspx?DespatchId=" + Id;
}

function GenerateDespatchNumber(table, column, compId, Docum) {
    table = "Despatchmas",
    column = "DespatchNo",
    compId = companyid,// $('#ddlinnercompany').val(),
    Docum = 'DESPATCH'

    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $('#txtDispNo').val(result.Value);
        }
    });
}

function getbyID(despatchid) {
    debugger;
    //$('#ddlcutheaderCompany').css('border-color', 'lightgrey');
    Mode = 1;
    $.ajax({
        url: "/BuyerOrderDespatch/GetDespatchEditMode/" + despatchid,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = [];
            obj = result.Value;

            $("#txtDispNo").val(obj[0].DespatchNo);
            $("#txtDispDate").val(moment(obj[0].DespatchDate).format('DD/MM/YYYY'));
            $("#ddlinnCompany").val(obj[0].CompanyId);
            $("#txtOrderNo").val(obj[0].OrderNo);
            $("#txtRefNo").val(obj[0].RefNo);
            $("#txtShipDate").val(moment(obj[0].ShipDate).format('DD/MM/YYYY'));
            $("#ddlinnstyle").val(obj[0].StyleId);
            $("#txtShipNo").val(obj[0].BuyOrdShip);
            $("#ddlShipMode").val(obj[0].ShipMode);
            $('#ddlSystem').val(obj[0].SystemId);
            $('#ddlinnManager').val(obj[0].ManagerId);
            $('#ddlinnMerchandiser').val(obj[0].MerchenId);
            $('#ddlInvno').val(obj[0].SalesInvid);
            //$('#ddlinnDestination').val(obj[0].MerchenId);
            //ShipType: shiptype,
            $('#txtRefDate').val(moment(obj[0].DocRefDate).format('DD/MM/YYYY'));
            $('#txtInvRefNo').val(obj[0].InvRefNo);
            $('#txtInvRefDate').val(moment(obj[0].InvRefDate).format('DD/MM/YYYY'));
            //IssStoreId: storeid,
            //OrderType: "B",
            if (obj[0].ShipType == "F") {
                shiptype = "F";
                $('#optfullord').prop('checked', true);
            }
            else if (obj[0].ShipType == "P") {
                $('#optpartord').prop('checked', true);
            }

            $("#ddlIssueStore").val(obj[0].IssStoreId);
            $('#txtPrecarrBy').val(obj[0].PreCarrBy);
            $('#txtPlaceOfReceipt').val(obj[0].PlaceofRecpt);
            $('#txtVesselFlightNo').val(obj[0].VesselFlightNo);
            $('#txtMarksNos').val(obj[0].MarksNo);
            $('#txtTotalCartons').val(obj[0].Cartons);
            //$('#txtRefDate').val(obj[0].CBMQty);ddlPortOfDischarge
            $('#ddlPortOfDischarge').val(obj[0].PortofDischargeId);
            $('#ddlFreightSupplier').val(obj[0].SupplierId);
            //CreatedBy: 8,
            $("#txtDocRefNo").val(obj[0].DocRefNo);
            ItemGridtbllist = obj[0].DespatchDet;
            StockGridtbllist = obj[0].DespatchStock;

            LoadItemDet(ItemGridtbllist);
            LoadStockDetails(StockGridtbllist);
            $("#ddlInvno").attr('disabled', true);
        }
    });

    return false;
}

function LoadInnerHeaderDetails(shiprowid) {
    debugger;

    $.ajax({
        type: "POST",
        url: "/BuyerOrderDespatch/GetInnerHeaderDetails/",
        data: JSON.stringify({ ShipRowId: shiprowid }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            InnerHeaderInfo = json;

            $('#ddlinnCompany').val(InnerHeaderInfo[0].CompanyID);
            $('#ddlinnIssStore').val(storeid);
            $('#txtOrderNo').val(InnerHeaderInfo[0].OrderNo);
            $('#txtRefNo').val(InnerHeaderInfo[0].RefNo);
            $('#txtShipNo').val(InnerHeaderInfo[0].BuyOrdShip);
            $('#ddlinnstyle').val(InnerHeaderInfo[0].StyleID);
            $('#ddlinnbuyer').val(InnerHeaderInfo[0].BuyerID);
            $('#ddlinnDestination').val(InnerHeaderInfo[0].DestinationID);
            $('#ddlinnMerchandiser').val(InnerHeaderInfo[0].MerchendiserId);
            $('#ddlinnManager').val(InnerHeaderInfo[0].ManagerID);
            $('#ddlSystem').val(InnerHeaderInfo[0].SystemId);
            $('#ddlShipMode').val(InnerHeaderInfo[0].MOSid);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function Add() {
    debugger;

    if (chkSalesInv == 'Y') {

        var chkInv = $("#ddlInvno option:selected").val();

        if (chkInv > 0) { } else {

            var msg = 'Please Select Invoice...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
            return true;
        }

    }


    var opchk = [];

    for (var y = 0; y < ItemGridtbllist.length; y++) {
        if (ItemGridtbllist[y].DespatchQty > 0) {
            opchk.push(ItemGridtbllist[y]);
        }
    }

    if (opchk.length == 0) {
        //alert('Please fill atleast any one qty...');
        var msg = 'Please fill atleast any one quantity...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        return true;
    }

    if (ShipItemList.length > 0) {
        totdespqty = 0;
        for (var y = 0; y < ItemGridtbllist.length; y++) {
            totdespqty = totdespqty + parseFloat(ItemGridtbllist[y].DespatchQty);
        }
        if (totdespqty != TotInvQty) {
            //alert('Please Check invoiceQty & Tot Despatch Qty...');
            var msg = 'Please Check invoice quantity & Total Despatch quantity...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
            return true;
        }

    }

    var res = validate();
    if (res == false) {
        return false;
    }


    if ($('#optfullord').is(':checked')) {
        shiptype = "F";
    }
    else if ($('#optpartord').is(':checked')) {
        shiptype = "P";
    }

    var DespatchObj = {
        DespatchNo: $("#txtDispNo").val(),
        DespatchDate: $("#txtDispDate").val(),
        CompanyId: $("#ddlinnCompany").val(),
        OrderNo: $("#txtOrderNo").val(),
        StyleId: $("#ddlinnstyle").val(),
        BuyOrdShip: $("#txtShipNo").val(),
        ShipMode: $("#ddlShipMode").val(),
        SystemId: $('#ddlSystem').val(),
        ShipType: shiptype,
        DocRefDate: $('#txtRefDate').val(),
        InvRefNo: $('#txtInvRefNo').val(),
        InvRefDate: $('#txtInvRefDate').val(),
        IssStoreId: storeid,
        OrderType: "B",
        PreCarrBy: $('#txtPrecarrBy').val(),
        PlaceofRecpt: $('#txtPlaceOfReceipt').val(),
        VesselFlightNo: $('#txtVesselFlightNo').val(),
        MarksNo: $('#txtMarksNos').val(),
        PortofDischargeId: $('#ddlPortOfDischarge').val(),
        Cartons: $('#txtTotalCartons').val(),
        CBMQty: $('#txtRefDate').val(),
        SupplierId: $('#ddlFreightSupplier').val(),
        CreatedBy: GUserid,
        DocRefNo: $("#txtDocRefNo").val(),
        SalesInvid: $("#ddlInvno option:selected").val(),
        DespatchDet: ItemGridtbllist,
        DespatchStock: StockGridtbllist,
    };
    LoadingSymb();
    $.ajax({
        url: "/BuyerOrderDespatch/Add",
        data: JSON.stringify(DespatchObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Status == "SUCCESS") {
                //alert("Record saved successfully...");
                var msg = 'Record saved successfully...';
                var flg = 1;
                var mod = 1;
                var ur = "";
                AlartMessage(msg, flg, mod, ur);
                $('#myModal1').modal('hide');
                $('#myModal').modal('hide');
            }
            else if (result.Status == "ERROR") {
                //alert("Record saved failed...");
                var msg = 'Record saved failed...';
                var flg = 4;
                var mod = 1;
                var ur = "";
                AlartMessage(msg, flg, mod, ur);
            }


            //Load Main Grid
            ListFilter();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}


//Valdidation using jquery
function validate() {
    var isValid = true;

    if ($('#ddlPortOfDischarge').val() == 0) {
        //$('#ddlFreightSupplier').css('border-color', 'Red');
        $('#ddlPortOfDischarge').siblings(".select2-container").css('border', '1px solid red');
        isValid = false;
    }
    else {
        //$('#ddlFreightSupplier').css('border-color', 'lightgrey');
        $('#ddlPortOfDischarge').siblings(".select2-container").css('border', '1px solid lightgrey');
    }

    if ($('#ddlFreightSupplier').val() == 0) {
        //$('#ddlFreightSupplier').css('border-color', 'Red');
        $('#ddlFreightSupplier').siblings(".select2-container").css('border', '1px solid red');
        isValid = false;
    }
    else {
        //$('#ddlFreightSupplier').css('border-color', 'lightgrey');
        $('#ddlFreightSupplier').siblings(".select2-container").css('border', '1px solid lightgrey');
    }
    if ($('#txtDocRefNo').val().trim() == "") {
        $('#txtDocRefNo').css('border-color', 'Red');

        isValid = false;
    }
    else {
        $('#txtDocRefNo').css('border-color', 'lightgrey');
    }

    if ($('#txtInvRefNo').val().trim() == "") {
        $('#txtInvRefNo').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtInvRefNo').css('border-color', 'lightgrey');
    }


    return isValid;
}

function Update() {
    debugger;
    if (chkSalesInv == 'Y') {

        var chkInv = $("#ddlInvno option:selected").val();

        if (chkInv > 0) { } else {

            var msg = 'Please Select Invoice...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
            return true;
        }

    }

    var opchk = [];

    for (var y = 0; y < ItemGridtbllist.length; y++) {
        if (ItemGridtbllist[y].DespatchQty > 0) {
            opchk.push(ItemGridtbllist[y]);
        }
    }

    if (opchk.length == 0) {
        //alert('Please fill atleast any one qty...');
        var msg = 'Please fill atleast any one quantity...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        return true;
    }

    if (ShipItemList.length > 0) {
        totdespqty = 0;
        for (var y = 0; y < ItemGridtbllist.length; y++) {
            totdespqty = totdespqty + parseFloat(ItemGridtbllist[y].DespatchQty);
        }
        if (totdespqty != TotInvQty) {
            //alert('Please Check invoiceQty & Tot Despatch Qty...');
            var msg = 'Please Check invoice quantity & Total Despatch quantity...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
            return true;
        }

    }

    var res = validate();
    if (res == false) {
        return false;
    }

    if ($('#optfullord').is(':checked')) {
        shiptype = "F";
    }
    else if ($('#optpartord').is(':checked')) {
        shiptype = "P";
    }

    var DespatchObj = {
        DespatchId: despatchid,
        DespatchNo: $("#txtDispNo").val(),
        DespatchDate: $("#txtDispDate").val(),
        CompanyId: $("#ddlinnCompany").val(),
        OrderNo: $("#txtOrderNo").val(),
        StyleId: $("#ddlinnstyle").val(),
        BuyOrdShip: $("#txtShipNo").val(),
        ShipMode: $("#ddlShipMode").val(),
        SystemId: $('#ddlSystem').val(),
        ShipType: shiptype,
        DocRefDate: $('#txtRefDate').val(),
        InvRefNo: $('#txtInvRefNo').val(),
        InvRefDate: $('#txtInvRefDate').val(),
        IssStoreId: storeid,
        OrderType: "B",
        PreCarrBy: $('#txtPrecarrBy').val(),
        PlaceofRecpt: $('#txtPlaceOfReceipt').val(),
        VesselFlightNo: $('#txtVesselFlightNo').val(),
        MarksNo: $('#txtMarksNos').val(),
        PortofDischargeId: $('#ddlPortOfDischarge').val(),
        Cartons: $('#txtTotalCartons').val(),
        CBMQty: $('#txtRefDate').val(),
        SupplierId: $('#ddlFreightSupplier').val(),
        CreatedBy: GUserid,
        DocRefNo: $("#txtDocRefNo").val(),
        SalesInvid: $("#ddlInvno option:selected").val(),
        DespatchDet: ItemGridtbllist,
        DespatchStock: StockGridtbllist,
    };
    LoadingSymb();
    $.ajax({
        url: "/BuyerOrderDespatch/Update",
        data: JSON.stringify(DespatchObj),
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
                $('#myModal1').modal('hide');
                $('#myModal').modal('hide');
            }
            else if (result.Status == "ERROR") {
                //alert("Record updated failed...");
                var msg = 'Record updated failed...';
                var flg = 4;
                var mod = 1;
                var ur = "";
                AlartMessage(msg, flg, mod, ur);
            }
            //Load MainGrid
            ListFilter();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });

    //}
}

function ListFilter() {
    debugger;
    //$('#tblbillmaingrid').DataTable().destroy();
    companyid = $('#ddlMCompany').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    LoadData(companyid, FDate, TDate);
}

function LoadItemDetails(ShiprowId, BuyOrdShip, OrderNo) {
    debugger;

    $.ajax({
        type: "POST",
        url: "/BuyerOrderDespatch/GetInnerItemDetails/",
        data: JSON.stringify({ ShipRowId: ShiprowId, OrderNo: OrderNo, ShipNo: BuyOrdShip }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            ItemGridtbllist = json;
            LoadItemDet(ItemGridtbllist);

            //Load ItemStock Grid based on first Item
            if (ItemGridtbllist != undefined && ItemGridtbllist.length > 0) {
                var currowind = ItemGridtbllist.slice(0);
                //var ProdDetId = currowind[0]['ProductionDetId'];
                ItemId = currowind[0]['ItemId'];
                ColorId = currowind[0]['ColorId'];
                SizeId = currowind[0]['SizeId'];

                if (StockGridtbllist.length == 0) {
                    GetItemStock(OrderNo, ItemId, ColorId, SizeId);
                }
            }
            else {
                LoadStockDetails(StockGridtbllist);
            }
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function GetItemStock(orderno, Itemid, Colorid, Sizeid) {
    $.ajax({
        url: "/BuyerOrderDespatch/GetInnerItemStockDetails/",
        data: JSON.stringify({ OrderNo: orderno, JobOrderNo: orderno, itemId: Itemid, ColorId: Colorid, SizeId: Sizeid, StoreUnitId: storeid }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            StockGridtbllist = result;

            //var currowind = StockGridtbllist.slice(0);
            ////var ProdDetId = currowind[0]['ProductionDetId'];
            //ItemId = currowind[0]['ItemId'];
            //ColorId = currowind[0]['ColorId'];
            //SizeId = currowind[0]['SizeId'];

            if (StockGridtbllist != undefined) {
                StockGridtbllistFilter = $.grep(StockGridtbllist, function (element, index) {
                    //return (element.ProdDetId == currowind[0]['ProductionDetId']);
                    return (element.ItemId == Itemid && element.ColorId == Colorid && element.SizeId == Sizeid);
                });
            }

            LoadStockDetails(StockGridtbllistFilter);
        }
    });
}
//$(document).ready(function () {
//    $("#tblitemDetails ").dataTable().find("tbody").on('click', 'tr', function () {
//        index = (this.rowIndex) - 1;
//    });
//});

function LoadItemDet(ItemList) {
    debugger;
    var rowCount = $('#tblitemDetails tr').length;
    if (rowCount > 0) {
        $('#tblitemDetails').DataTable().destroy();
    }

    $('#tblitemDetails').DataTable({
        data: ItemList,
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
                 { title: "Sno", data: "Sno", "visible": false },
                 { title: "ItemId", data: "ItemId", "visible": false },
                 { title: "ColorId", data: "ColorId", "visible": false },
                 { title: "SizeId", data: "SizeId", "visible": false },
                 { title: "Item", data: "Item" },
                 { title: "Color", data: "Color" },
                 { title: "Size", data: "Size" },
                 { title: "Order Qty", data: "Quantity" },
                 { title: "Prod Qty", data: "Productionqty" },
                 { title: "Bal Qty", data: "BalQty" },
                 {
                     title: "Desp Qty", data: "DespatchQty",
                     render: function (data) {
                         return '<input type="text" id="txtitemdespatch" class="form-control txtitemdespatch" style="width: 50px;text-align: center;" value=' + data + '>';
                     }
                 },
                 { title: "Sales Rate", data: "Rate" },
                 //{
                 //    title: "ACTION", "mDataProp": null,
                 //    "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="View Stock" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnitem btn btn-info btn-round"><i class="fa fa-eye"></i></button>'
                 //}
        ]
    });

    $("#tblitemDetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblitemDetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}

function calcAmt(Val, rowindex) {
    debugger;
    var currentrowoftcpi = ItemGridtbllist.slice(rowindex);

    var CSno = currentrowoftcpi[0].Sno;

    var OrdBalQty = currentrowoftcpi[0].BalQty;
    var IId = currentrowoftcpi[0].ItemId;
    var CId = currentrowoftcpi[0].ColorId;
    var SId = currentrowoftcpi[0].SizeId;

    if (Val > OrdBalQty) {
        //alert("OrderQty Should Not Greater then OrderBalanceQty..");    
        var msg = 'Order quantity Should Not Greater then Order Balance quantity...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        $.each(ItemGridtbllist, function () {
            if (this.Sno == CSno) {
                this.DespatchQty = 0;

            }
        });

       // LoadItemDet(ItemGridtbllist);

        var table = $('#tblitemDetails').DataTable();
        var data = table.rows().data();

        $('input[id=txtitemdespatch]').each(function (ig) {
            if (data[ig].Sno == CSno) {
                var row = $(this).closest('tr');
                row.find('#txtitemdespatch').val(0);

            }
        });
        return true;
    }
    $.each(ItemGridtbllist, function () {
        if (this.Sno == CSno) {
            this.DespatchQty = Val;

        }
    });

    LoadItemDet(ItemGridtbllist);

    var pid = [];
    var bal = [];
    var qty = [];
    for (var t = 0; t < StockGridtbllist.length; t++) {
        if (StockGridtbllist[t].ItemId == IId && StockGridtbllist[t].ColorId == CId && StockGridtbllist[t].SizeId == SId) {
            pid.push(StockGridtbllist[t].StockId);
            bal.push(StockGridtbllist[t].BalQty);
            qty.push(StockGridtbllist[t].DespatchQty);
        }
    }
    var c = pid.length;
    var t = 0;

    if (Val < bal[0]) {

        qty[0] = Val;
        for (var j = 1; j < qty.length; j++) {
            qty[j] = 0;
        }
    }
    else {
        for (var r = 0; r < c; r++) {
            if (r == 0) {
                if (bal[r] <= Val) {
                    qty[r] = bal[r];
                    t = Val - bal[r];
                }
            }
            if (r > 0) {
                if (bal[r] >= t) {
                    qty[r] = t;
                    t = 0;
                }
                else {
                    var y = t - bal[r];
                    if (bal[r] < y || bal[r] > y) {
                        qty[r] = bal[r];
                        t = t - qty[r];
                    }
                    else {
                        qty[r] = y;
                        t = t - y;
                    }
                }

            }
        }
    }

    for (var u = 0; u < StockGridtbllist.length; u++) {
        for (var r = 0; r < pid.length; r++) {
            if (StockGridtbllist[u].StockId == pid[r]) {
                StockGridtbllist[u].DespatchQty = qty[r];
            }
        }
    }


    colorempty = StockGridtbllist;

    colorempty = $.grep(colorempty, function (v) {
        return (v.ItemId === IId && v.ColorId === CId && v.SizeId === SId);
    });

    LoadStockDetails(colorempty);

    StockGridtbllistFilter = [];
    StockGridtbllistFilter = colorempty;

   

    //Datatable textbox focus
    var rows = $("#tblitemDetails").dataTable().fnGetNodes();
    var dtTable = $('#tblitemDetails').DataTable();
    for (var i = 0; i < rows.length; i++) {
        var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
        $('input[id=txtitemdespatch]').each(function () {
            if (sn == CSno && $(this).val() == Val) {
                var row = $(this).closest('tr');
                var num = row.find('#txtitemdespatch').val();
                row.find('#txtitemdespatch').focus().val('').val(num);
                return true;
            }
        });
    }
}

function calcsepquan(value, rowindex) {
    debugger;
    var currentrowoftcpi = StockGridtbllistFilter.slice(rowindex);
    var pid = currentrowoftcpi[0].StockId;
    var itmid = currentrowoftcpi[0].ItemId;
    var colorid = currentrowoftcpi[0].ColorId;
    var sizeid = currentrowoftcpi[0].SizeId;

    var balq = currentrowoftcpi[0].BalQty;

    $.each(StockGridtbllist, function () {
        if (this.StockId == pid) {


            if (balq >= value) {
                this.DespatchQty = value;
            }
            else {
                var t = value - balq;
                this.DespatchQty = balq;
            }

        }
    });


    var totalamnt = 0;

    for (var e = 0; e < StockGridtbllist.length; e++) {
        if (StockGridtbllist[e].ItemId == itmid && StockGridtbllist[e].SizeId == sizeid && StockGridtbllist[e].ColorId == colorid) {
            var amount = StockGridtbllist[e].DespatchQty;
            totalamnt = totalamnt + parseFloat(amount);
        }
    }
    $.each(ItemGridtbllist, function () {
        if (this.ItemId == itmid && this.SizeId == sizeid && this.ColorId == colorid) {
            //this.quantity = 0;

            this.DespatchQty = totalamnt;
            //}


        }
    });

    colorempty = StockGridtbllist;

    colorempty = $.grep(colorempty, function (v) {
        return (v.ItemId === itmid && v.ColorId === colorid && v.SizeId === sizeid);
    });

    LoadStockDetails(colorempty);

    LoadItemDet(ItemGridtbllist);

    //Datatable textbox focus
    var rows = $("#tblstock").dataTable().fnGetNodes();
    var dtTable = $('#tblstock').DataTable();
    for (var i = 0; i < rows.length; i++) {
        var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
        $('input[id=txtstckdespatch]').each(function () {
            if (sn == pid && $(this).val() == value) {
                var row = $(this).closest('tr');
                var num = row.find('#txtstckdespatch').val();
                row.find('#txtstckdespatch').focus().val('').val(num);
                return true;
            }
        });
    }
}

function LoadStockDetails(StockList) {
    debugger;
    var rowCount = $('#tblstock tr').length;
    if (rowCount > 0) {
        $('#tblstock').DataTable().destroy();
    }

    $('#tblstock').DataTable({
        data: StockList,
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
                 { title: "StockId", data: "StockId", "visible": false },
                 { title: "ItemId", data: "ItemId", "visible": false },
                 { title: "ColorId", data: "ColorId", "visible": false },
                 { title: "SizeId", data: "SizeId", "visible": false },
                 { title: "ProcessId", data: "ProcessId", "visible": false },
                 { title: "SupplierId", data: "SupplierId", "visible": false },
                 { title: "Trans No", data: "TransNo" },
                 {
                     title: "Trans Date", data: "TransDate",
                     render: function (data) {
                         return (moment(data).format("DD/MM/YYYY"));
                     }
                 },
                 { title: "Process", data: "Process" },
                 { title: "Lot No", data: "LotNo" },
                 { title: "Bundle No", data: "BundleNo" },
                 { title: "Supplier", data: "Supplier" },
                 { title: "Stock Qty", data: "BalQty" },
                 {
                     title: "Desp Qty", data: "DespatchQty",
                     render: function (data) {
                         return '<input type="text" id="txtstckdespatch" class="form-control txtstckdespatch" style="width: 50px;text-align: center;" value=' + data + ' >';
                     }
                 },
                 //{ title: "Sales Rate", data: "Rate" },
                 //{
                 //    title: "ACTION", "mDataProp": null,
                 //    "sDefaultContent": '<button type="button" type="button" data-toggle="tooltip" data-placement="top" title="Add" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnrcpdetadd btn btn-round btn-success" > <i class="fa fa-plus"></i> </button>'
                 //}
        ]
    });

    $("#tblstock tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblstock tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}
function GetAddGridDetails() {
    debugger;
    var inputcount = 0;
    //$("#tbladdgriddet tr").each(function () {
    //    inputcount++;
    //});
    inputcount = $('#tbladdgriddet tr').length;
    if (inputcount > 0) {
        //var tableinput = $('#tblinnergrid').DataTable();
        //tableinput.clear().draw();
        $("#tbladdgriddet").DataTable().destroy();
    }


    var OrdNo = "";
    var ONo = $('select#ddlOrderNo option:selected').val();

    if (ONo == 0) {
        OrdNo == "";
    }
    else {

        OrdNo = $('select#ddlOrderNo option:selected').text();
    }

    var RecNo = "";
    var RNo = $('select#ddlRefNo option:selected').val();

    if (RNo == 0 || ONo == undefined) {
        RecNo == "";
    }
    else {

        RecNo = $('select#ddlRefNo option:selected').text();
    }
    var buyer = $('#ddlBuyer').val();
    if (buyer == null || buyer == "0") {
        buyer = 0;
    }
    var ordtype = $('input[name="optshiptype"]:checked').attr('value');

    var storeid = $('#ddlIssueStore').val();
    if (storeid == null || storeid == "0") {
        storeid = 0;
    }

    var innercomp = $('#ddlCompany').val();
    if (innercomp == null || innercomp == "0") {
        innercomp = 0;
    }

    $.ajax({
        type: "POST",
        url: "/BuyerOrderDespatch/GetAddGridDetails/",
        data: JSON.stringify({ CompanyId: innercomp, OrderType: ordtype, RefNo: RecNo, storeid: storeid, OrderNo: OrdNo, Buyerid: buyer }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            AddGridtbllist = json;
            $('#tbladdgriddet').DataTable({
                data: AddGridtbllist,
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
                    { title: "ID", data: "ShipRowID", "visible": false },
            { title: "Order No", data: "OrderNo" },
            { title: "Style", data: "Style" },
            { title: "Ref No", data: "RefNo" },
            { title: "Buyer", data: "Buyer" },
            { title: "Destination", data: "Destination" },
            {
                title: "Ship Date", data: "ShipDate",
                render: function (data) {
                    return (moment(data).format("DD/MM/YYYY"));
                }
            },
            { title: "Quantity", data: "ProductionQty" },
            { title: "Balance", data: "BalanceQty" },
            {
                title: "ACTION", "mDataProp": null,
                "sDefaultContent": '<button type="button"  type="button" data-toggle="tooltip" data-placement="top" title="Add" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnordadd btn btn-round btn-success"> <i class="fa fa-plus"></i> </button>'
            }
                ]
            });
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
//function GetAddGridDetails() {
//    debugger;
//    var inputcount = 0;
//    //$("#tbladdgriddet tr").each(function () {
//    //    inputcount++;
//    //});
//    inputcount = $('#tbladdgriddet tr').length;
//    if (inputcount > 0) {
//        //var tableinput = $('#tblinnergrid').DataTable();
//        //tableinput.clear().draw();
//        $("#tbladdgriddet").DataTable().destroy();
//    }

//    $.ajax({
//        type: "GET",
//        url: "/BuyerOrderDespatch/GetAddGridDetails/",
//        //data: JSON.stringify({ CompanyId: companyid, Fromdate: fromdate, Todate: todate, InterExter: InterorExter }),
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (json) {
//            debugger;

//            AddGridtbllist = json;
//            $('#tbladdgriddet').DataTable({
//                data: AddGridtbllist,
//                scrollY: 300,
//                scrollCollapse: true,
//                paging: false,
//                fixedColumns: false,
//                select: false,
//                scrollX: "100%",
//                scrollXInner: "100%",
//                scroller: false,
//                // "bSort": false,
//                columns: [
//                    { title: "ID", data: "ShipRowID", "visible": false },
//            { title: "Order No", data: "OrderNo" },
//            { title: "Style", data: "Style" },
//            { title: "Ref No", data: "RefNo" },
//            { title: "Buyer", data: "Buyer" },
//            { title: "Destination", data: "Destination" },
//            {
//                title: "Ship Date", data: "ShipDate",
//                render: function (data) {
//                    return (moment(data).format("DD/MM/YYYY"));
//                }
//            },
//            { title: "Quantity", data: "ProductionQty" },
//            { title: "Balance", data: "BalanceQty" },
//            {
//                title: "ACTION", "mDataProp": null,
//                "sDefaultContent": '<button type="button"  type="button" data-toggle="tooltip" data-placement="top" title="Add" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnordadd btn btn-round btn-success"> <i class="fa fa-plus"></i> </button>'
//            }
//                ]
//            });
//        },
//        failure: function (errMsg) {
//            alert(errMsg);
//        }
//    });
//}
function LoadData(companyid, fromdate, todate) {
    debugger;
    var inputcount = 0;
    //$("#tbladdgriddet tr").each(function () {
    //    inputcount++;
    //});
    fromdate = $("#txtFromDate").val();
    todate = $("#txtToDate").val();
    inputcount = $('#tbldespatchmaingrid tr').length;
    if (inputcount > 0) {
        //var tableinput = $('#tblinnergrid').DataTable();
        //tableinput.clear().draw();
        $("#tbldespatchmaingrid").DataTable().destroy();
    }


    var OrdNo = "";
    var ONo = $('select#ddlMOrderNo option:selected').val();

    if (ONo == 0) {
        OrdNo == "";
    }
    else {

        OrdNo = $('select#ddlMOrderNo option:selected').text();
    }

    var RecNo = "";
    var RNo = $('select#ddlMRefNo option:selected').val();

    if (RNo == 0 || ONo == undefined) {
        RecNo == "";
    }
    else {

        RecNo = $('select#ddlMRefNo option:selected').text();
    }
    var buyer = $('#ddlMBuyer').val();
    if (buyer == null || buyer == "0") {
        buyer = 0;
    }
    var ordtype = $('input[name="optmord"]:checked').attr('value');

    //var comp = $('#ddlMCompany').val();
    //if (comp == null || comp == "0") {
    //    comp = 0;
    //}

    var shiptype = $('#ddlMShipType').val();

    var comp = $('#ddlMCompany').val();

    if (comp == null) {
        comp = DCompid;
    } else {
        comp = $('#ddlMCompany').val();
    }

    var menufilter = comp + ',' + fromdate + ',' + todate + ',' + ordtype + ',' + RecNo + ',' + OrdNo + ',' + buyer + ',' + shiptype;
    localStorage.setItem('BuyerOrderDespatchMainFilter', menufilter);


    $.ajax({
        type: "POST",
        url: '/BuyerOrderDespatch/GetMaindt/',
        data: JSON.stringify({ CompanyId: comp, Fromdate: fromdate, Todate: todate, OrderType: ordtype, RefNo: RecNo, OrderNo: OrdNo, Buyerid: buyer, ShipType: shiptype }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            maintbllist = json;
            //maintbllist.sort(function (a, b) {
            //    return a.DespatchID - b.DespatchID;
            //});

            $('#tbldespatchmaingrid').DataTable({
                data: maintbllist,
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
                    { title: "ID", data: "DespatchID", "visible": false },
                    { title: "BuyerID", data: "BuyerID", "visible": false },
            { title: "Desp No", data: "DespatchNo" },
            {
                title: "Desp Date", data: "DespatchDate",
                render: function (data) {
                    return (moment(data).format("DD/MM/YYYY"));
                }
            },
            { title: "Destination", data: "Destination" },
            { title: "Order No", data: "OrderNo" },
            { title: "Ref No", data: "RefNo" },
            { title: "Style", data: "Style" },
            { title: "Buyer", data: "Buyer" },
            { title: "Des Qty", data: "DesQty" },
            { title: "Doc Ref No", data: "DocRefNo" },
            {
                title: "ACTION", "mDataProp": null,
                "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" ' + BuyOrddespatchEditFlg + ' class="btnmaingrdedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button><button type="button" type="button" data-toggle="tooltip" data-placement="top" title="Delete" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" ' + BuyOrddespatchDeleteFlg + ' class="btnmaingrddelete btn btn-danger btn-round" onClick=""> <i class="fa fa-minus"></i> </button><button type="button" type="button" data-toggle="tooltip" data-placement="top" title="Print" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;" ' + BuyOrddespatchPrintFlg + ' class="btnmaingrdprint btn btn-danger btn-round" onClick=""> <i class="fa fa-print"></i> </button>'
            }
                ]
            });

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadDataFromBack(companyid, fromdate, todate) {
    debugger;
    var fill = localStorage.getItem('BuyerOrderDespatchMainFilter');
    var fillobj = [];
    fillobj = fill.split(",");

    $('#txtFromDate').val(fillobj[1]);
    $('#txtToDate').val(fillobj[2]);

    if (fillobj[3] == 'B') {
        $('#optMBuyOrd').prop('checked', true);
    } else {
        $('#optMSamOrd').prop('checked', true);
    }


    if (fillobj[4] == "undefined") {
        fillobj[4] = '';
    }
    if (fillobj[5] == "undefined") {
        fillobj[5] = '';
    }
    if (fillobj[6] == "undefined") {
        fillobj[6] = 0;
    }
   
    $.ajax({
        type: "POST",
        url: '/BuyerOrderDespatch/GetMaindt/',
        data: JSON.stringify({ CompanyId: fillobj[0], Fromdate: fillobj[1], Todate: fillobj[2], OrderType: fillobj[3], RefNo: fillobj[4], OrderNo: fillobj[5], Buyerid: fillobj[6], ShipType: fillobj[7] }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            maintbllist = json;

            var inputcount = 0;
            inputcount = $('#tbldespatchmaingrid tr').length;
            if (inputcount > 0) {
                $("#tbldespatchmaingrid").DataTable().destroy();
            }


            $('#tbldespatchmaingrid').DataTable({
                data: maintbllist,
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
                    { title: "ID", data: "DespatchID", "visible": false },
                    { title: "BuyerID", data: "BuyerID", "visible": false },
            { title: "Desp No", data: "DespatchNo" },
            {
                title: "Desp Date", data: "DespatchDate",
                render: function (data) {
                    return (moment(data).format("DD/MM/YYYY"));
                }
            },
            { title: "Destination", data: "Destination" },
            { title: "Order No", data: "OrderNo" },
            { title: "Ref No", data: "RefNo" },
            { title: "Style", data: "Style" },
            { title: "Buyer", data: "Buyer" },
            { title: "Des Qty", data: "DesQty" },
            { title: "Doc Ref No", data: "DocRefNo" },
            {
                title: "ACTION", "mDataProp": null,
                "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" ' + BuyOrddespatchEditFlg + ' class="btnmaingrdedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button><button type="button" type="button" data-toggle="tooltip" data-placement="top" title="Delete" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" ' + BuyOrddespatchDeleteFlg + ' class="btnmaingrddelete btn btn-danger btn-round" onClick=""> <i class="fa fa-minus"></i> </button><button type="button" type="button" data-toggle="tooltip" data-placement="top" title="Print" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;" ' + BuyOrddespatchPrintFlg + ' class="btnmaingrdprint btn btn-danger btn-round" onClick=""> <i class="fa fa-print"></i> </button>'
            }
                ]
            });

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

//function LoadData(companyid, fromdate, todate) {
//    debugger;
//    var inputcount = 0;
//    //$("#tbladdgriddet tr").each(function () {
//    //    inputcount++;
//    //});
//    fromdate = $("#txtFromDate").val();
//    todate = $("#txtToDate").val();
//    inputcount = $('#tbldespatchmaingrid tr').length;
//    if (inputcount > 0) {
//        //var tableinput = $('#tblinnergrid').DataTable();
//        //tableinput.clear().draw();
//        $("#tbldespatchmaingrid").DataTable().destroy();
//    }

//    $.ajax({
//        type: "POST",
//        url: '/BuyerOrderDespatch/GetMaindt/',
//        data: JSON.stringify({ CompanyId: companyid, Fromdate: fromdate, Todate: todate }),
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (json) {
//            debugger;
//            maintbllist = json;
//            //maintbllist.sort(function (a, b) {
//            //    return a.DespatchID - b.DespatchID;
//            //});

//            $('#tbldespatchmaingrid').DataTable({
//                data: maintbllist,
//                scrollY: 300,
//                scrollCollapse: true,
//                paging: false,
//                fixedColumns: false,
//                select: false,
//                scrollX: "100%",
//                scrollXInner: "100%",
//                scroller: false,
//                "bSort": false,
//                columns: [
//                    { title: "ID", data: "DespatchID", "visible": false },
//                    { title: "BuyerID", data: "BuyerID", "visible": false },
//            { title: "Desp No", data: "DespatchNo" },
//            {
//                title: "Desp Date", data: "DespatchDate",
//                render: function (data) {
//                    return (moment(data).format("DD/MM/YYYY"));
//                }
//            },
//            { title: "Destination", data: "Destination" },
//            { title: "Order No", data: "OrderNo" },
//            { title: "Ref No", data: "RefNo" },
//            { title: "Style", data: "Style" },
//            { title: "Buyer", data: "Buyer" },
//            { title: "Des Qty", data: "DesQty" },
//            { title: "Doc Ref No", data: "DocRefNo" },
//            {
//                title: "ACTION", "mDataProp": null,
//                "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnmaingrdedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button><button type="button" type="button" data-toggle="tooltip" data-placement="top" title="Delete" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnmaingrddelete btn btn-danger btn-round" onClick=""> <i class="fa fa-minus"></i> </button><button type="button" type="button" data-toggle="tooltip" data-placement="top" title="Print" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;" class="btnmaingrdprint btn btn-danger btn-round" onClick=""> <i class="fa fa-print"></i> </button>'
//            }
//                ]
//            });

//        },
//        failure: function (errMsg) {
//            alert(errMsg);
//        }
//    });
//}

function Delete(ID) {
    debugger;
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        LoadingSymb();
        $.ajax({
            url: "/BuyerOrderDespatch/Delete/" + ID,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                //alert("Record deleted successfully...");
                var msg = 'Record deleted successfully...';
                var flg = 2;
                var mod = 1;
                var ur = "";
                AlartMessage(msg, flg, mod, ur);
                //$('#tblprodreturnmaingrid').DataTable().destroy();
                ListFilter();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}


$(document).on('click', '.btnmaingrdprint', function () {
    debugger;
    //rowindex = $(this).closest('tr').index();
    var table = $('#tbldespatchmaingrid').DataTable();
    var despatchid = table.row($(this).parents('tr')).data()["DespatchID"];

    //fnInlinePrint(despatchid);

    Repid = despatchid;
    $('#myModal2').modal('show');

    docname = "BUYER ORDER DESPATCH";
    GenerateReportItem(docname);
});




function GenerateReportItem(name) {
    debugger;
    $("#sbTwo").empty();
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
            var size = { setupid: 0, optionid: 1, option: 'Size', optionvalue: false }
            repobj.push(size);
            var Color = { setupid: 0, optionid: 2, option: 'Color', optionvalue: false }
            repobj.push(Color);
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
    var arr = [];
    $('#sbTwo :selected').each(function (i, sel) {
        arr.push($(sel).val());
    });
    var res = [];
    var p = [];
    for (var r = 0; r < repobj.length; r++) {
        res.push(repobj[r].optionid);
        p.push(0);
    }
    for (var y = 0; y < arr.length; y++) {
        for (var f = 0; f < res.length; f++) {
            if (arr[y] == res[f]) {
                p[f] = 1;
            }
        }
    }

    window.open("../ReportInline/Production/Despatch/DespatchInlineReport.aspx?DespatchId=" + Repid + "&Size=" + p[0] + "&Color=" + p[1]);

}

function backtomain() {
    //$("#myModal2").hide();
    //$("#myModal2").modal('hide');

    window.location.href = "/BuyerOrderDespatch/BuyerOrderDespatchIndex";
}


function LoadInvNo() {
    var comid = 4;

    $.ajax({
        url: "/OrderSalesInvoice/GetInvdet",
        data: JSON.stringify({ companyid: comid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result;
            if (result.length > 0) {
                var data = result;
                $(ddlInvno).empty();
                $(ddlInvno).append($('<option/>').val('0').text('--Select InvoiceNo--'));
                $.each(data, function () {
                    $(ddlInvno).append($('<option></option>').val(this.Invid).text(this.InvoiceNo));
                });

            }
        }

    });

}

function changeRef() {
    if (Mode == 0) {
        var invid = $('select#ddlInvno option:selected').val();

        SalesHeaderDetails(invid);
    }
 
}

function SalesHeaderDetails(invid) {
    debugger;

    $.ajax({
        type: "POST",
        url: "/OrderSalesInvoice/GetInnerHeaderDetails/",
        data: JSON.stringify({ Invid: invid }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            SalesHeaderInfo = json;

            // Invid = id;
    
            $("#txtInvRefNo").val(SalesHeaderInfo.refno),
            $("#txtInvRefDate").val(moment(SalesHeaderInfo.refdate).format("DD/MM/YYYY")),
        
            $("#ddlPortOfDischarge").val(SalesHeaderInfo.portofdischarge).trigger('change'),
            $("#ddlShipMode").val(SalesHeaderInfo.shipmode).trigger('change'),
            $("#ddlSystem").val(SalesHeaderInfo.systemid).trigger('change'),
            //$("#ddlPaymentmode").val(InnerHeaderInfo.payment).trigger('change'),
            $("#txtPrecarrBy").val(SalesHeaderInfo.Precarriage),
            $("#txtPlaceOfReceipt").val(SalesHeaderInfo.placeofrecpt).trigger('change'),
            $("#txtVesselFlightNo").val(SalesHeaderInfo.Vesselno),
            $("#txtMarksNos").val(SalesHeaderInfo.MarksNos),
            $("#txtTotalCartons").val(SalesHeaderInfo.Totalcartons);
        
            Exrate = SalesHeaderInfo.Exrate;
            SalesItemDetails(invid);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function SalesItemDetails(invid) {
    debugger;
    $.ajax({
        type: "POST",
        url: "/OrderSalesInvoice/GetInnerItemDetailsDespatch/",
        data: JSON.stringify({ Invid: invid }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            ShipItemList = json;
            // LoadItemDet(ShipItemList);
            var shp = $('#txtShipNo').val();
            var cnt = 0;
            var incnt = 0;
            $.each(ShipItemList, function (t) {
                cnt = cnt + 1;
                $.each(ItemGridtbllist, function (r) {
                    if (ShipItemList[t].Itemid == ItemGridtbllist[r].ItemId && ShipItemList[t].Shipno == shp) {
                        
                            var sal= parseFloat(ShipItemList[t].rate) * parseFloat(Exrate);
                            ItemGridtbllist[r].Rate = sal.toFixed(5);
                        if (incnt != cnt) {
                            TotInvQty = parseFloat(TotInvQty) + parseFloat(ShipItemList[t].qty);
                        }
                        incnt = cnt;
                    }
                });
            });
            LoadItemDet(ItemGridtbllist);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}