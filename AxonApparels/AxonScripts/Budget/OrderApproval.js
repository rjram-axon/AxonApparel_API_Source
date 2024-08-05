var StyleRowid = 0;
var Gp = 0;
$(document).ready(function () {
    debugger;
    LoadBulkOrderNoDDL("#ddlMOrderNo");
    LoadBulkRefNoDDL("#ddlMRefNo");
    MainFDate = $("#hdMainFromDate").data('value');
    var Prg = "Ord";
    Gp = Prg;
});


function Update() {
    debugger;
    var ptype = $('input[name="PAType"]:checked').attr('value');
    var masid = $('#ddlMOrderNo').val();

    var RefNo = "";
    var RNo = $('select#ddlMRefNo option:selected').val();

    if (RNo == 0) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlMRefNo option:selected').val();
    }

    if (masid == 0 && RefNo == "") {
        //alert('Please select any OrderNo or RefNo...');
        var msg = 'Please select any Order Number or Refer Number...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }
    var orderno = $("#ddlMOrderNo option:selected").text();



    var RefNo = "";
    var RNo = $('select#ddlMRefNo option:selected').val();

    if (RNo == 0) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlMRefNo option:selected').text();
    }
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/OrderApproval/Update",
        data: JSON.stringify({ ordno: RefNo, Bmasid: masid, PA: ptype, PType: Gp }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.Status == 'SUCCESS') {
                //alert('Data Updated Successfully');
                var msg = 'Data Updated Successfully...';
                var flg = 1;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                LoadBulkOrderNoDDL("#ddlMOrderNo");
                LoadBulkRefNoDDL("#ddlMRefNo");

                //$(ddlMOrderNo).empty();
                //$(ddlMRefNo).empty();
                $('input:radio[name="PAType"][value="P"]').prop('checked', true);
                $('input:radio[name="OrdType"][value="B"]').prop('checked', true);
            }

            else {
                window.location.href = "/Error/Index";
            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function GetPAStatus() {
    var id = $("#ddlMOrderNo").val();
    if (id == 0) {
        //alert('Please select any one OrderNo...');
        var msg = 'Please select any one Order Number...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    $.ajax({
        url: "/OrderApproval/GetPAStatus/",
        data: JSON.stringify({ bmasid: id }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            if (obj.length > 0) {
                if (obj[0].PA == "A") {
                    $('input:radio[name="PAType"][value="A"]').prop('checked', true);
                } else if (obj[0].PA == "P") {
                    $('input:radio[name="PAType"][value="P"]').prop('checked', true);
                }
                else {
                    $('input:radio[name="PAType"][value="P"]').prop('checked', true);
                }
                var typ = "";
                if (obj[0].OrdType == 'B') {
                    typ = "BULKORDER";
                    $("#txttype").val(typ);
                }
                else if (obj[0].OrdType == 'S') {
                    typ = "SAMPLEORDER";
                    $("#txttype").val(typ);
                }
            }


        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}


function OrderEntry() {
    debugger;

    var Prg = "Ord";
    Gp = Prg;

    var masid = $('#ddlMOrderNo').val();

    var RefNo = "";
    var RNo = $('select#ddlMRefNo option:selected').val();

    if (RNo == 0) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlMRefNo option:selected').val();
    }

    if (masid == 0 && RefNo == "") {
        //alert('Please select any OrderNo or RefNo...');
        var msg = 'Please select any  Order Number or Refer Number...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }


    $('#txtFromDate').val(MainFDate);
   
    LoadOrderNoDDL("#ddlCPOrderNo,#ddlParOrderNo");
    LoadBuyerDDL("#ddlBuyer,#ddlMBuyer");   
    LoadCompanyDDL("#ddlCompany");
    LoadGUomDDL("#ddlUom");
    LoadEmployeeDDL("#ddlManager,#ddlMerch");  
    LoadConsigneeDDL("#ddlConsignee");
    LoadAgentDDL("#ddlAgent");
    LoadSAgentDDL("#ddlShipAgent");
    LoadShipmodeDDL("#ddlShipMode");
    LoadShipsystemDDL("#ddlShipsystem");
    LoadPayTermsDDL("#ddlPayment");
    LoadQuotationNoDDL("#ddlQuoteNo");
  
    //$('#myModal1').modal('show');
    StylegetbyID(masid);
}


function StylegetbyID(MasID) {


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
    LoadEnquiryDDL("#ddlenquiryno");

    $.ajax({
        url: "/BulkOrder/EditMainList/" + MasID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
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
                $('#ddlParOrderNo').val(obj.ParentOrdId);
                $('#ddlQuoteNo').val(obj.QuoteId);

                //OType = $('#ddlOrderType').val();
                //
                $('#txtBuyRefNo').val(obj.Buyer_Ref_No);
                $('#dtOrderDate').val(moment(obj.Order_Date).format('DD/MM/YYYY'));
                $('#dtRefDate').val(moment(obj.Ref_Date).format('DD/MM/YYYY'));
                $('#txtRefNo').val(obj.Ref_No);

                //var buyerid = $('#ddlBuyer').val();
                //var AgnID = $('#ddlAgent').val();
                //var ConID = $('#ddlConsignee').val();
                //var ShipAgnID = $('#ddlShipAgent').val();
                //var GUomID = $('#ddlUom').val();
                //var BMasId = $('#txtBuyOrdMasID').val();
                //OldQty = $('#txtOldQty').val();

                //BuyMasId = BMasId;

                //LoadBuyerEditAdd(buyerid);
                //if (AgnID > 0) {
                //    LoadAgnEditAdd(AgnID);
                //}
                //if (ConID > 0) {
                //    LoadConEditAdd(ConID);
                //}
                //if (ShipAgnID > 0) {
                //    LoadShipAgnEditAdd(ShipAgnID);
                //}
                //LoadGUomEditAdd(GUomID);
              
              

                LoadFullData();
               // loadData(MasID);



                $('#myModal1').modal('show');
                $('#btnUpdate').hide();
                $('#btnAdd').hide();

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
        scrollY: 100,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        "bSort": false,

        columns: [
            //{ title: "SlNo", data: "SlNo" },
            { title: "SupplierId", data: "SupplierId", "visible": false },
            { title: "Supplier", data: "Supplier", },

               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnsupedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button"data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnsupremove btn btn-round btn-danger"> <i class="fa fa-minus"></i> </button> '

                   //"sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnsupedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnsupremove btn btn-round btn-danger"> <i class="fa fa-minus"> </button><button type="button" data-toggle="tooltip" data-placement="top" title="View Item" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnsupItemview btn btn-round btn-info"> <i class="fa fa-eye"> </button> '

               },

        ]
    });

    $("#tblSupdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblSupdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
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

function getStylerowid() {
    var Ord = $('#ddlMOrderNo option:selected').text();
    $.ajax({
        url: "/OrderApproval/GetStyleRowid",
        data: JSON.stringify({ ordno: Ord }),
        type: "POST",
        async:false,
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            debugger;
            var obj = result.Value;
            StyleRowid = obj[0].StyleRowid;


        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function Budget() {
    var Prg = "Bud";
    Gp = Prg;

    var masid = $('#ddlMOrderNo').val();

    var RefNo = "";
    var RNo = $('select#ddlMRefNo option:selected').val();

    if (RNo == 0) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlMRefNo option:selected').val();
    }

    if (masid == 0 && RefNo == "") {
        //alert('Please select any OrderNo or RefNo...');
        var msg = 'Please select any  Order Number or Refer Number...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }
    getStylerowid();

    //StyRowId = StyleRowID;
    var Mode = 2;
    var Status = "OrdApp";
    //window.location.href = "/Budget/BudgetIndex?StyleRowId=" + StyRowId;
    window.location.href = "/Budget/BudgetIndex?StyleRowId=" + StyleRowid + "=&Mode=" + Mode + "=&Status=" + Status;
}

function StyleEntry() {

    var Prg = "Sty";
    Gp = Prg;

    var masid = $('#ddlMOrderNo').val();

    var RefNo = "";
    var RNo = $('select#ddlMRefNo option:selected').val();

    if (RNo == 0) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlMRefNo option:selected').val();
    }

    if (masid == 0 && RefNo == "") {
        //alert('Please select any OrderNo or RefNo...');
        var msg = 'Please select any  Order Number or Refer Number...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }
    getStylerowid();
    var Mod = 1;
    var Status="Y"
    var url = "/StyleEntry/StyleEntryIndex?BMasId=" + masid + "=&Mode=" + Mod + "=&Status=" + Status + "=&StyleRowID=" + StyleRowid;
   
    window.location.href = url;
}

function Shipment() {
    var Prg = "Ship";
    Gp = Prg;

    var masid = $('#ddlMOrderNo').val();

    var RefNo = "";
    var RNo = $('select#ddlMRefNo option:selected').val();

    if (RNo == 0) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlMRefNo option:selected').val();
    }

    if (masid == 0 && RefNo == "") {
        //alert('Please select any OrderNo or RefNo...');
        var msg = 'Please select any  Order Number or Refer Number...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }
    getStylerowid();
    var Mode = 1;
    var Status = "Y";
    window.location.href = "/BulkOrderShipment/BulkOrderShipmentIndex?StyleRowID=" + StyleRowid + "=&Mode=" + Mode + "=&Status=" + Status;
}
function Planning() {
    var Prg = "Plan";
    Gp = Prg;
    var masid = $('#ddlMOrderNo').val();

    var RefNo = "";
    var RNo = $('select#ddlMRefNo option:selected').val();

    if (RNo == 0) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlMRefNo option:selected').val();
    }

    if (masid == 0 && RefNo == "") {
        //alert('Please select any OrderNo or RefNo...');
        var msg = 'Please select any  Order Number or Refer Number...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }
    getStylerowid();
    var Status = "OrdApp";
    var Mode = 1;
    window.location.href = "/PlanningAdd/PlanningAddIndex?StyleRowId=" + StyleRowid + "=&Mode=" + Mode + "=&Status=" + Status;
}

function LoadOrdType() {
    debugger;
    var ortype = $('input[name="OrdType"]:checked').attr('value');
    $("#ddlMRefNo").empty();
    if (ortype == 'B') {
        LoadBulkOrderNoDDL('#ddlMOrderNo');
        LoadBulkRefNoDDL("#ddlMRefNo");
    }

    else if (ortype == 'S') {
        LoadSampOrderNoDDL('#ddlMOrderNo');
        LoadSampleRefNoDDL("#ddlMRefNo");
    }
}