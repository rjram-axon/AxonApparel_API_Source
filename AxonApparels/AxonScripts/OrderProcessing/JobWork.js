

var AItemList = [];
var Userid = 0;
var UserName = 0;
var ShipItemList = [];
var ItemList = [];
var SaveItemList = [];
var JobQty = 0;
var Itemrowindex = -1;
var rowindex = -1;
var index = 0;
var indexforfill = -1;
var fillvar = '';
var indexforfabfill = -1;
var fabfillvar = '';
var shprwid = 0;
var shipindex = 0;
var GStyRowId = 0
var Rate = 0;


var id, order, stylId, uomid;
var Umid;
var mode = [];
var ordernum;
var StyleId;
var bomlist = [];
var uomlist = [];
var convlist = [];
var BUnit = 0;
var index = -1;
var StyrowId = 0;
var Bomrowindex = -1;
var Type = 0;
var SamBomList = [];
var MainFDate = 0;
var EnbJobRate = 0;
var ChkRefno = true;
var ChkOrdno = true;
var ChkStyle = true;
var ChkJobno = true;
var ChkBuyer = true;
var ChkSupplier = true;
var DtChk = false;
var ChkComp = false;
var DispatchClosed = "N";

$(document).ready(function () {
    debugger;

    Userid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    EnbJobRate = $("#hdnEnbJobRate").data('value');
    DCompid = $("#hdnDCompid").data('value');
    LoadCompanyDDL("#ddlACompany,#ddlMCompany");
    LoadBuyerDDL("#ddlABuyer");
    LoadStyleDDL("#ddlAStyle");
    LoadRefNoDDL("#ddlArefno");
    LoadOrderNoDDL("#ddlAOrderNo,#ddlMOrderNo");
    LoadBuyRefNoDDL("#ddlABuyRefNo");
    //LoadJobNoDDL("#ddlMWorkNo");
    LoadSupplierDDL("#ddlSupplier");
    LoadCompanyUnitDDL("#ddlCompanyunit");
    LoadCurrencyDDL("#ddlCurrency");
    // LoadStageDDL("#ddlStageType");
    getDate();
    //LoadEmployeeDDL("#ddlmerch,#ddlqc,#ddlApp");
    LoadEmployeeDDL("#ddlmerch,#ddlqc,#ddlApp");
    loadum();
    loaddetails();
    loadJobMainData();
    $('#EcomuId').show();
    $('#ESuppId').hide();
    CheckRights("WorkOrder");

    $(document).on('keyup', '#txtFromDate', function (e) {
        DtChk = true;
        loadJobMainData();
    });
    $(document).on('keyup', '#txtToDate', function (e) {
        DtChk = true;
        loadJobMainData();
    });

    $(document).on('click', '#optMPen', function (e) {
        DtChk = false;
        ChkRefno = false;
        ChkOrdno = false;
        ChkStyle = false;
        ChkJobno = false;
        ChkBuyer = false;
        ChkSupplier = false;
        ChkComp = false;
        loadJobMainData();
    });
    $(document).on('click', '#optMApp', function (e) {
        DtChk = false;
        ChkRefno = false;
        ChkOrdno = false;
        ChkStyle = false;
        ChkJobno = false;
        ChkBuyer = false;
        ChkSupplier = false;
        ChkComp = false;
        loadJobMainData();
    });
    $(document).on('click', '#optMAll', function (e) {
        DtChk = false;
        ChkRefno = false;
        ChkOrdno = false;
        ChkStyle = false;
        ChkJobno = false;
        ChkBuyer = false;
        ChkSupplier = false;
        ChkComp = false;
        loadJobMainData();
    });
});

$(document).ready(function () {
    $("#tblItemdetails ").dataTable().find("tbody").on('click', 'tr', function () {
        index = (this.rowIndex) - 1;
    });
});

$(document).ready(function () {
    $("#tblJobEntryShipDetails ").dataTable().find("tbody").on('click', 'tr', function () {
        shipindex = (this.rowIndex) - 1;
    });
});

$(document).on('click', '.btncomItemview', function () {
    debugger;
    var table = $('#tblJobEntryShipDetails').DataTable();
    var shiprowid = table.row($(this).parents('tr')).data()["shiprowid"];

    ItemList = $.grep(SaveItemList, function (d) {
        return d.ShipRowId == shiprowid;

    });

    loadJobItemTable(ItemList);
});

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

    MainFDate = $("#hdMainFromDate").data('value');

    $('#txtFromDate').val(MainFDate);
    $('#txtissuedate').val(Fdatestring);
    $('#txtToDate').val(Fdatestring);
    // $('#dtRefDate').val(Fdatestring);

}

function loadtable() {
    debugger;
    $.each(ItemList, function () {

        this.ActualJobQuantity = this.Balance;


    });
    $.each(SaveItemList, function () {

        this.ActualJobQuantity = this.Balance;


    });
    loadJobItemTable(ItemList);
    loadJobSaveItemTable(SaveItemList);

    $.each(ShipItemList, function () {

        var tot = 0;
        for (var u = 0; u < SaveItemList.length; u++) {
            if (SaveItemList[u].ShipRowId == this.shiprowid) {
                var amount = SaveItemList[u].ActualJobQuantity;
                tot = tot + parseFloat(amount);
            }
        }

        this.jobOrdqty = tot;
        this.jobqty = tot;


        //if (this.shiprowid == shipid) {
        //    this.jobOrdqty = tot;
        //    this.jobqty = tot;
        //}
    });

    loadJobShipItemTable(ShipItemList);


}
function LoadAddDetails() {
    debugger;

    $('#myModal').modal('show');


    var CompId = $('#ddlACompany').val();
    var BuyId = $('#ddlABuyer').val();
    var StyId = $('#ddlAStyle').val();


    var OrdNo = "";
    var ONo = $("#ddlAOrderNo option:selected").val();

    if (ONo == 0) {
        OrdNo == "";
    }
    else {

        OrdNo = $("#ddlAOrderNo option:selected").text();
    }

    var RefNo = "";
    var RNo = $('select#ddlArefno option:selected').val();

    if (RNo == 0) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlArefno option:selected').text();
    }


    var BRefNo = "";
    var BRNo = $('select#ddlABuyRefNo option:selected').val();

    if (BRNo == 0) {
        BRefNo == "";
    }
    else {

        BRefNo = $('select#ddlABuyRefNo option:selected').text();
    }



    $.ajax({
        url: "/JobWork/LoadJobAddDetails",
        data: JSON.stringify({ companyid: CompId, BuyerId: BuyId, StyleId: StyId, OrderNo: OrdNo, RefNo: RefNo, BRefNo: BRefNo }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            AItemList = result;
            loadADItemTable(AItemList);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}


function loadADItemTable(AItemList) {

    $('#tblJobAddDetails').DataTable().destroy();
    debugger;

    $('#tblJobAddDetails').DataTable({

        data: AItemList,
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

            { title: "StylRowId", data: "StyleRowId", "visible": false },
            { title: "CompanyId", data: "companyid", "visible": false },
            { title: "Order No", data: "OrderNo" },

             { title: "Buyer", data: "Buyer" },
              { title: "Style", data: "StyleName" },
                { title: "Quantity", data: "Quantity" },
                  { title: "Balance", data: "Balance" },
             {
                 title: "ACTION", "mDataProp": null,
                 "sDefaultContent": '<button type="button"  type="button" data-toggle="tooltip" data-placement="top" title="Add" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnjobadd btn btn-round btn-success"> <i class="fa fa-plus"></i> </button>'
             }
        ]
    });
}

function MyAddClose() {
    $('#myModal').modal('hide');
}


$(document).on('click', '.btnjobadd', function () {
    debugger;
    var table = $('#tblJobAddDetails').DataTable();

    var StyRowId = table.row($(this).parents('tr')).data()["StyleRowId"];
    var OrdNo = table.row($(this).parents('tr')).data()["OrderNo"];


    GStyRowId = StyRowId;
    ordernum = OrdNo;
    LoadJobEntryDetails(OrdNo, StyRowId);
    LoadJobShipDetails(StyRowId);

    LoadPlanDetails(StyRowId);

});



function LoadRate() {
    LoadJobShipDetails(GStyRowId);
}


var table, column, compId, Docum;

function GenerateNumber(table, column, compId, Docum) {

    debugger;

    table = "Job_Ord_Mas",
        column = "job_ord_no",
        compId = $('#txtcompid').val(),
        Docum = 'JOB ORDER'


    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $('#txtjoborderno').val(result.Value);
        }
    });
}

function LoadJobEntryDetails(OrdNo, StyRowId) {
    debugger;

    $('#myModal').modal('hide');
    $('#myModal1').modal('show');





    $.ajax({
        url: "/JobWork/GetJobEntryDetails",
        data: JSON.stringify({ OrderNo: OrdNo, StyleRowId: StyRowId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            debugger;
            if (obj != undefined) {
                // $('#txtjoborderno').val(obj[0]["JobOrderNo"]);
                $('#txtorderno').val(obj[0]["OrderNo"]);
                $('#txtorderrefno').val(obj[0]["Job_Order_RefNo"]);
                $('#txtstyle').val(obj[0]["StyleName"]);
                $('#txtqty').val(obj[0]["ProductionQty"]);
                $('#txtbuyer').val(obj[0]["Buyer"]);
                $('#txtexcrate').val(obj[0]["Exchange"]);
                $('#txtmanager').val(obj[0]["Manager"]);
                $('#ddlmanager').val(obj[0]["ManagerId"]);
                $('#ddlmerch').val(obj[0]["MerchandiserId"]);
                $('#ddlCurrency').val(obj[0]["CurrencyId"]);
                $('#txtcompid').val(obj[0]["companyid"]);
                $('#txtstyleid').val(obj[0]["StyleId"]);
                $('#txtbuyerid').val(obj[0]["BuyerId"]);
                $('#txtorderdate').val(moment(obj[0]["OrderDate"]).format('DD/MM/YYYY'));

                var radioValue = $("input[name='subcontract']:checked").val();
                if (radioValue == "P") {

                    //LoadCompanyUnitDDL("#ddlcompanyunit");
                }

                GenerateNumber();
            }
            else {

            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadSuppOrUnit() {
    $('#txtmessage').val('');
    var radioValue = $("input[name='subcontract']:checked").val();
    if (radioValue == "P") {

        LoadCompanyUnitDDL("#ddlcompanyunit");
        $('#EcomuId').show();
        $('#ESuppId').hide();

    } else {
        LoadSupplierDDL("#ddlcompanyunit");
        $('#EcomuId').hide();
        $('#ESuppId').show();
    }
}

function LoadSuppUnitAddress() {

    var radioValue = $("input[name='subcontract']:checked").val();
    if (radioValue == "P") {


        var Id = $('#ddlCompanyunit').val();
        LoadUnitAdd(Id)

    } else {

        var Id = $('#ddlSupplier').val();
        LoadSuppAdd(Id)
    }
}

function LoadUnitAdd(Id) {
    $('#txtmessage').val("");

    $.ajax({
        url: "/CompanyUnit/GetbyID/" + Id,
        typr: "GET",

        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                $('#txtmessage').val(obj.Address1 + "," + obj.Address2 + "," + obj.Address3);

            }
        }

    });

}
function LoadSuppAdd(Id) {
    $('#txtmessage').val("");

    $.ajax({
        url: "/Supplier/GetbyId/" + Id,
        typr: "GET",

        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                $('#txtmessage').val(obj.Address1 + "," + obj.Address2 + "," + obj.Address3);

            }
        }

    });

}
function LoadJobShipDetails(StyRowId) {
    debugger;


    $.ajax({
        url: "/JobWork/LoadJobEntryShipDetails",
        data: JSON.stringify({ StyleRowId: StyRowId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            ShipItemList = result;
            loadJobShipItemTable(ShipItemList);
            if (ShipItemList.length > 0) {
                shprwid = ShipItemList[0].shiprowid;
            }

            var ShipId = 0;
            LoadJobItemDetails(StyRowId, ShipId);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}


function loadJobShipItemTable(ShipItemList) {

    $('#tblJobEntryShipDetails').DataTable().destroy();
    debugger;

    $('#tblJobEntryShipDetails').DataTable({

        data: ShipItemList,
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

            { title: "StylRowId", data: "stylerowid", "visible": false },
            { title: "ShipRowId", data: "shiprowid", "visible": false },

                 {
                     title: "Shipment Date", data: "shipdate",
                     render: function (data, type, row) {
                         return (moment(data).format("DD/MM/YYYY"));
                     }
                 },

            { title: "Country", data: "Country" },
            { title: "Order Qty", data: "Ordqty" },
            { title: "Balance Qty", data: "Balance" },
            { title: "Job Order Qty", data: "jobOrdqty" },

             {
                 title: "Delivery Date", data: "deliverydate",
                 render: function (data, type, row) {
                     return (moment(data).format("DD/MM/YYYY"));
                 }
             },
            { title: "Excess %", data: "ExPer", "visible": false },
            { title: "BuyOrdShip", data: "buyordship" },
            { title: "Job Qty", data: "jobqty", "visible": false },
            { title: "Old Job Qty", data: "Oldjobqty", "visible": false },

               {
                   title: "Old Delivery Date", data: "olddeliverydate", "visible": false,
                   render: function (data, type, row) {
                       return (moment(data).format("DD/MM/YYYY"));
                   }
               },
              {
                  title: "ACTION", "mDataProp": null,
                  "sDefaultContent": '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btncompedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="View Item" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btncomItemview btn btn-round btn-info"> <i class="fa fa-eye"></i> </button></div>'


              }
        ]
    });

    $("#tblJobEntryShipDetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblJobEntryShipDetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}


$(document).ready(function () {

    $(document).on('click', '.btncompedit', function () {
        debugger;
        Mode = 1;

        rowindex = $(this).closest('tr').index();

        var currentro12 = ShipItemList.slice(rowindex);


        $('#txtShipment').val(moment(currentro12[0]["shipdate"]).format('DD/MM/YYYY'));
        $('#txtCountry').val(currentro12[0]['Country']);
        $('#txtOrder').val(currentro12[0]['Ordqty']);
        $('#txtBalance').val(currentro12[0]['Balance']);
        $('#txtJobOrder').val(currentro12[0]['jobOrdqty']);
        $('#txtDeliveryDate').val(moment(currentro12[0]["deliverydate"]).format('DD/MM/YYYY'));

    });


    $('#btnshipitmupdate').click(function () {
        debugger;
        var currentrowsel = ShipItemList.slice(rowindex);

        currentrowsel[0]['shipdate'] = $("#txtShipment").val();
        currentrowsel[0]['Country'] = $("#txtCountry").val();
        currentrowsel[0]['Ordqty'] = $("#txtOrder").val();
        currentrowsel[0]['Balance'] = $("#txtBalance").val();
        currentrowsel[0]['jobOrdqty'] = $("#txtJobOrder").val();
        currentrowsel[0]['deliverydate'] = new Date($('#txtDeliveryDate').val());

        loadJobShipItemTable(ShipItemList);



    });




});





function LoadJobItemDetails(StyRowId, ShipId) {
    debugger;


    $.ajax({
        url: "/JobWork/LoadJobEntryItemDetails",
        data: JSON.stringify({ StyleRowId: StyRowId, ShipRowId: ShipId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            //ItemList = result;
            //loadJobItemTable(ItemList);

            SaveItemList = result;

            loadJobSaveItemTable(SaveItemList);


            $.each(SaveItemList, function () {

                var JobRate = $('#txtrate').val();
                this.Rate = JobRate;

            });
            loadJobSaveItemTable(SaveItemList);



            if (SaveItemList.length > 0) {
                ItemList = $.grep(SaveItemList, function (d) {
                    return d.ShipRowId == shprwid;

                });

                loadJobItemTable(ItemList);
            }


        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function loadJobItemTable(ItemList) {

    $('#tblItemdetails').DataTable().destroy();
    debugger;

    $('#tblItemdetails').DataTable({

        data: ItemList,
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

            { title: "ShipRowId", data: "ShipRowId", "visible": false },
            { title: "StyleRowId", data: "StyRowId", "visible": false },
               { title: "BuyOrdDetId", data: "BuyOrdDetId", "visible": false },
                 { title: "BuyOrdShip", data: "BuyOrdShip", "visible": false },
            { title: "Item", data: "Item" },
            { title: "Color", data: "Color" },
            { title: "Size", data: "Size" },
            { title: "Qty", data: "JobQuantity" },
            { title: "Balance Qty", data: "Balance" },

              {
                  title: "Job Order Qty", data: "ActualJobQuantity",
                  render: function (data) {

                      return '<input type="text" id="txtJobQty" class="calcJobQty form-control"  style="width: 50px;text-align: center;" value=' + data + '  >';

                  },
              },

            { title: "Excess Qty", data: "ExQty", "visible": false },
            //{ title: "Rate", data: "Rate" },
             {
                 title: "Rate", data: "Rate",
                 render: function (data) {
                     if (EnbJobRate == "Y") {
                         return '<input type="text" id="txtRate" class="calcRate form-control" disabled style="width: 50px;text-align: center;" value=' + data + '  >';
                     } else {
                         return '<input type="text" id="txtRate" class="calcRate form-control"  style="width: 50px;text-align: center;" value=' + data + '  >';
                     }
                 },
             },
            { title: "ItemId", data: "ItemId", "visible": false },
            { title: "ColorId", data: "ColorId", "visible": false },
            { title: "SizeId", data: "SizeId", "visible": false },
        ]
    });
}

function loadJobSaveItemTable(SaveItemList) {

    $('#tblSaveItemdetails').DataTable().destroy();
    debugger;

    $('#tblSaveItemdetails').DataTable({

        data: SaveItemList,
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

            { title: "ShipRowId", data: "ShipRowId" },
            { title: "StyleRowId", data: "StyRowId" },
              { title: "BuyOrdDetId", data: "BuyOrdDetId" },
                { title: "BuyOrdShip", data: "BuyOrdShip" },
            { title: "Item", data: "Item" },
            { title: "Color", data: "Color" },
            { title: "Size", data: "Size" },
            { title: "Qty", data: "JobQuantity" },
            { title: "Balance Qty", data: "Balance" },
             { title: "Job Order Qty", data: "ActualJobQuantity" },

            { title: "Excess Qty", data: "ExQty" },
            { title: "Rate", data: "Rate" },
            { title: "ItemId", data: "ItemId" },
            { title: "ColorId", data: "ColorId" },
            { title: "SizeId", data: "SizeId" },
        ]
    });
}

$(document).on('keyup', '.calcJobQty', function (e) {
    debugger;

    var table = $('#tblItemdetails').DataTable();
    var shipid = table.row($(this).parents('tr')).data()["ShipRowId"];
    var BDetId = table.row($(this).parents('tr')).data()["BuyOrdDetId"];
    var Val = $(this).val();
    JobQty = Val;

    $.each(ItemList, function () {
        if (this.ShipRowId == shipid && this.BuyOrdDetId == BDetId) {
            this.ActualJobQuantity = JobQty;

        }
    });


    $.each(SaveItemList, function () {
        if (this.ShipRowId == shipid && this.BuyOrdDetId == BDetId) {
            this.ActualJobQuantity = JobQty;

        }
    });
    loadJobSaveItemTable(SaveItemList);

    var tot = 0;
    for (var u = 0; u < SaveItemList.length; u++) {
        if (SaveItemList[u].ShipRowId == shipid) {
            var amount = SaveItemList[u].ActualJobQuantity;
            tot = tot + parseFloat(amount);
        }
    }


    $.each(ShipItemList, function () {
        if (this.shiprowid == shipid) {
            this.jobOrdqty = tot;
            this.jobqty = tot;
        }
    });

    loadJobShipItemTable(ShipItemList);


});



$(document).on('keyup', '.calcRate', function (e) {
    debugger;

    var table = $('#tblItemdetails').DataTable();
    var shipid = table.row($(this).parents('tr')).data()["ShipRowId"];
    var BDetId = table.row($(this).parents('tr')).data()["BuyOrdDetId"];
    var Val = $(this).val();
    Rate = Val;

    $.each(ItemList, function () {
        if (this.ShipRowId == shipid && this.BuyOrdDetId == BDetId) {
            this.Rate = Rate;

        }
    });


    $.each(SaveItemList, function () {
        if (this.ShipRowId == shipid && this.BuyOrdDetId == BDetId) {
            this.Rate = Rate;

        }
    });
    loadJobSaveItemTable(SaveItemList);



});


/////////////////////////////////////////////////////////
function save() {

    debugger;


    var res = validate();
    if (res == false) {
        return false;
    }

    if (ShipItemList.length == 0) {

        //alert("Please Check Shipment Details..");
        var msg = 'Please Check Shipment Details...';
        var flg = 4;
        var mode = 1;
        AlartMessage(msg, flg, mode);
        return true;
    }

    var list = $.grep(ItemList, function (e) {
        return e.ActualJobQuantity > 0;
    });

    if (list.length == 0) {
        //alert("Please enter atleast any one job order qty...");
        var msg = 'Please enter atleast any one job order qty...';
        var flg = 4;
        var mode = 1;
        AlartMessage(msg, flg, mode);
        return true;
    }

    ///check();
    var cnt = $("#tblJobEntryShipDetails tr").length - 1;
    var Data = "";

    SaveShipList = [];
    for (var i = 1; i <= cnt; i++) {

        var compItemObj = {
            deliverydate: $("#tblJobEntryShipDetails tr:eq(" + i + ") td:eq(0)").html(),
            jobOrdqty: $("#tblJobEntryShipDetails tr:eq(" + i + ") td:eq(4)").html(),
            buyordship: $("#tblJobEntryShipDetails tr:eq(" + i + ") td:eq(6)").html(),
            JobOrderNo: $('#txtjoborderno').val(),

        };
        SaveShipList.push(compItemObj);
    }

    var radioValue = $("input[name='subcontract']:checked").val();

    var objConSubmit = {

        JobOrderNo: $('#txtjoborderno').val(),
        JobOrdDate: $('#txtorderdate').val(),//new Date($('#txtorderdate').val()),
        OrderNo: $('#txtorderno').val(),
        StyleId: $('#txtstyleid').val(),
        SupplierId: $('#ddlSupplier').val(),
        CompanyUnitId: $('#ddlCompanyunit').val(),
        UnitOrOther: radioValue,
        MerchandiserId: $('#ddlmerch').val(),
        QCId: $('#ddlqc').val(),
        Quantity: $('#txtqty').val(),
        Exchange: $('#txtexcrate').val(),
        BuyerId: $('#txtbuyerid').val(),
        companyid: $('#txtcompid').val(),
        StyleRowId: GStyRowId,
        Rate: $('#txtrate').val(),
        Issuedate: $('#txtissuedate').val(),//new Date($('#txtissuedate').val()),
        CurrencyId: $('#ddlCurrency').val(),
        Job_Order_RefNo: $('#JRefNo').val(),
        ToApproveId: $('#ddlApp').val(),
        StageId: $('#ddlStageType').val(),
        ExcessPer: $('#txtexcessper').val(),
        CreatedBy: Userid,
        JobOrdShip: SaveShipList,
        JobOrdItem: SaveItemList,
        BomListDet: bomlist
    };
    $("#btnAdd").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/JobWork/Add",
        data: JSON.stringify(objConSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.Value == true) {
                AddUserEntryLog('SalesManagement', 'Job Order', 'ADD', $('#txtjoborderno').val());
                //alert("Data Saved Sucessfully");
                var msg = 'Data Saved Sucessfully...';
                var flg = 1;
                var mode = 0;
                AlartMessage(msg, flg, mode);
                //window.location.href = "/JobWork/JobWorkIndex";

            } else {
                window.location.href = "/Error/Index";
            }

        },
        error: function (errormessage) {
            debugger;
            alert(errormessage.responseText);
        }
    });
}

//Valdidation using jquery
function validate() {
    var isValid = true;
    if ($('#txtrate').val().trim() == "") {
        $('#txtrate').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtrate').css('border-color', 'lightgrey');

    }


    if ($('#ddlcompanyunit').val() == 0) {
        // $('#ddlcompanyunit').css('border-color', 'Red');
        $('#ddlcompanyunit').siblings(".select2-container").css('border', '1px solid red');
        isValid = false;
    }
    else {

        $('#ddlcompanyunit').siblings(".select2-container").css('border', '1px solid lightgrey');
    }

    if ($('#ddlStageType').val() == 0) {
        // $('#ddlStageType').css('border-color', 'Red');
        $('#ddlStageType').siblings(".select2-container").css('border', '1px solid red');
        isValid = false;
    }
    else {

        $('#ddlStageType').siblings(".select2-container").css('border', '1px solid lightgrey');
    }

    return isValid;
}

////////////////////Trims
$(document).ready(function () {

    loadum();
    loaddetails();
    loadData();

    debugger;



    $(document).on('click', '.chkpfj', function () {
        debugger;

        var table = $('#tPJAbody').DataTable();
        var rowid = table.row($(this).parents('tr')).data()["Buyordmasdetid"];
        // $('#tPAbody tr:eq(' + rowindex + ')').find('td:eq(1)').text(totalamnt);
        //if ($('#chkpfj').is(':checked')) {
        var val = $(this).is(":checked");
        if (val == true) {
            for (var f = 0; f < bomlist.length; f++) {
                if (bomlist[f].Buyordmasdetid == rowid) {
                    bomlist[f].PurFor_Job = 'Y';
                }
            }
        }
        else {

        }

    });

    $(document).on('click', '.chkcsp', function () {
        debugger;

        var table = $('#tPJAbody').DataTable();
        var rowid = table.row($(this).parents('tr')).data()["Buyordmasdetid"];
        var val = $(this).is(":checked");
        if (val == true) {
            for (var h = 0; h < bomlist.length; h++) {
                if (bomlist[h].Buyordmasdetid == rowid) {
                    bomlist[h].CSP = 'Y';
                }
            }
        }

    });

    $(document).on('click', '.chkic', function () {
        debugger;

        var table = $('#tPJAbody').DataTable();
        var rowid = table.row($(this).parents('tr')).data()["Buyordmasdetid"];
        var val = $(this).is(":checked");
        if (val == true) {
            for (var f = 0; f < bomlist.length; f++) {
                if (bomlist[f].Buyordmasdetid == rowid) {
                    bomlist[f].ItemClosure = 'Y';
                }
            }
        }


    });
    $(document).on('change', '.ddluc', function () {
        debugger;
        rowindex = $(this).closest('tr').index();
        var Fromid = bomlist[rowindex].Uomid;
        var FromUom = bomlist[rowindex].uom;
        var Toid = $(this).val();
        //var Toid = 0;
        var Touom = 0;
        var Convmode = 0;
        var topur = 0;
        var bomqty = 0;
        for (var s = 0; s < convlist.length; s++) {
            if (convlist[s].FromUomid == Fromid && convlist[s].ToUomid == Toid) {
                //Toid = convlist[s].ToUomid;
                Touom = convlist[s].ToUom;
                Convmode = convlist[s].Mode;
                topur = convlist[s].Conversion;
            }
        }



        for (var f = 0; f < bomlist.length; f++) {
            if (f == rowindex) {
                // bomlist[f].Uomid = Toid;
                pgmq = bomlist[f].pgmqty;
                var bqty = 0;
                if (Convmode == 1) {
                    Convmode = 'D';
                    bqty = pgmq / topur;
                }
                if (Convmode == 2) {
                    Convmode = 'M';
                    bqty = pgmq * topur;
                }

                bomlist[f].uom = Touom;
                bomlist[f].Uomid = Toid;
                bomlist[f].Conv_Mode = Convmode;
                bomlist[f].ToPurUOM = topur;
                bomlist[f].BOM_qty = bqty;
                bomlist[f].Baseunit = Toid;
            }
        }

        var oldind = -1;
        for (var q = 0; q < uomlist.length; q++) {
            if (uomlist[q].Uomid == Fromid) {
                oldind = q;
            }
        }
        array_move(uomlist, oldind, 0)

        if (Touom != "") {
            loadChngtab(bomlist);
        }
    });
    $(document).on('keyup', '.txtJbomqty', function () {
        debugger;
        rowindex = $(this).closest('tr').index();
        var qty = $(this).val();
        var currentrow = bomlist.slice(rowindex);
        var s = currentrow[0].SNo;
        var prgqty = currentrow[0].pgmqty;
        $.each(bomlist, function () {
            if (this.SNo == s) {

                if (parseFloat(qty) > parseFloat(prgqty)) {
                    //alert("JobQty should not greater then ProgQty...");
                    var msg = 'JobQty should not greater then ProgQty...';
                    var flg = 4;
                    var mode = 1;
                    AlartMessage(msg, flg, mode);
                    this.JobBomQty = 0;
                    loadChngtab(bomlist);
                    return;
                }
                this.JobBomQty = qty;
            }
        });
    });

});

function array_move(arr, old_index, new_index) {

    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
};

function LoadPlanDetails(StyleRowId) {
    $.ajax({
        url: "/PlanningAdd/GetPlanDetails",
        data: JSON.stringify({ StyleRowid: StyleRowId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            debugger;
            if (obj != undefined) {
                $('#txtOrderNo').val(obj[0]["Order_No"]);
                $('#txtRefNo').val(obj[0]["Ref_no"]);
                $('#txtCompany').val(obj[0]["Company"]);
                $('#txtStyle').val(obj[0]["Style"]);
                $('#txtProdQty').val(obj[0]["Quantity"]);
                $('#txtBuyer').val(obj[0]["buyer"]);
                $('#txtStyleRowId').val(obj[0]["StyleRowid"]);
                $('#txtPlanId').val(obj[0]["PlanID"]);
                $('#txtWorkOrder').val(obj[0]["Job_Ord_No"]);
                StyleRowId = $("#txtStyleRowId").val();
                ordernum = $('#txtOrderNo').val();
                StyleId = obj[0]["StyleID"];
                Type = obj[0]["Type"];
            }
            else {

            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function loaddetails() {
    debugger;
    $.ajax({
        url: "/BOM/ItemList",
        data: JSON.stringify({}),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $.each(result, function () {
                $("#sbTwo").append($("<option></option>").val(this.Itemgroupid).html(this.Itemgroup));

            });


        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function loadData() {
    //$('#tPAbody').DataTable().destroy();
    debugger;
    $.ajax({
        type: "GET",
        url: '/BOM/ListItem/',
        data: JSON.stringify({}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            var tableload = json.data
            debugger;
            var dataSet = eval("[" + tableload + "]");
            $('#tPJAbody').DataTable({
                data: dataSet,
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
                         { title: "ID", "visible": false },
                              { title: "JobBomDetID", "visible": false },
                   { title: "JobBomID", "visible": false },
                          { title: "ItemID", "visible": false },
                         { title: "Item" },
                          { title: "Color" },
                           { title: "Size" },
                             { title: "Unit" },
                            { title: "BOM Qty" },
                              { title: "JobBOM Qty" },
                         { title: "Pgm Qty" },
                         { title: "Pur Uom" },
                         { title: "Mode" },
                         { title: "ToPur UOM" },
                          { title: "BOM Qty" },
                          { title: "JobBOM Qty" },
                          { title: "Pur For Job" },
                           { title: "CSP" },
                            { title: "Item Closure" },

                ]


            });

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
var masid;
function loaditemgroup(itemgrpid, orderno, styleid) {

    debugger;
    var OrderNo = $("#txtorderno").val();
    var StgType = 0;

    //orderno = ordernum,
    styleid = StyleId
    var flag = 0;
    //$(":checkbox").each(function () {
    debugger;
    var ischecked = $('#selectall').is(":checked");
    if (ischecked) {
        flag = 1;
    }
    else {
        flag = 0;
    }

    //if ($('#ddlStageType').val() == 0) {
    //    StgType = "";
    //}
    //else if ($('#ddlStageType').val() == 1) {
    //    StgType = "'KO','WO','PO'";
    //}
    //else if ($('#ddlStageType').val() == 2) {
    //    StgType = "'KK','KW','KP'";
    //}
    //else if ($('#ddlStageType').val() == 3) {
    //    StgType = "'FK','FW','FP'";
    //}
    //else if ($('#ddlStageType').val() == 4) {
    //    StgType = "GN";
    //}

    if ($('#ddlStageType').val() == 0) {
        StgType = "";
    }
    else if ($('#ddlStageType').val() == 1) {
        StgType = "Y";
    }
    else if ($('#ddlStageType').val() == 2) {
        StgType = "G";
    }
    else if ($('#ddlStageType').val() == 3) {
        StgType = "F";
    }
    else if ($('#ddlStageType').val() == 4) {
        StgType = "GN";
    }
    var Jobno = $("#txtjoborderno").val();

    //});
    if (flag == 1) {
        $.ajax({
            url: "/JobWork/ListDetails",
            data: JSON.stringify({ order: OrderNo, stylId: styleid, Type: Type, StageType: StgType, JobOrderNo: Jobno }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                debugger;

                bomlist = result;
                loadChngtab(bomlist);
                uomonbaseunit();
            },
            error: function (errormessage) {
                debugger;
                alert(errormessage.responseText);
            }

        });
    }


}


function loadChngtab(list) {
    debugger;

    $('#tPJAbody').DataTable().destroy();
    $('#tPJAbody').DataTable({
        data: list,
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
                 { title: "ID", data: "Buyordmasdetid", "visible": false },
                    { title: "JobBomDetID", data: "Jobordmasdetid", "visible": false },
                   { title: "JobBomID", data: "Jobordmasid", "visible": false },
                 { title: "ItemID", data: "Itemid", "visible": false },
                 { title: "Item", data: "item" },
                 { title: "Color", data: "Category1" },
                 { title: "Size", data: "Category2" },
                  { title: "Unit", data: "uom" },
                 { title: "BOM Qty", data: "pgmqty" },
                 { title: "Pgm Qty", data: "pgmqty" },
                 { title: "JobBom Qty", data: "JobBomQty" },
                   {
                       title: "Pur Uom", data: "uom",
                       render: function (data, type, row) {
                           //var filteruom = [];
                           //for (var c = 0; c < uomlist.length; c++) {
                           //    if (row.Uomid == uomlist[c].Uomid) {
                           //        filteruom.push(uomlist[c]);
                           uomlist;
                           var $select = $("<select></select>", {
                               "id": "ddluc",
                               "value": data,
                               "class": "form-control ddluc"
                               //onchange: "loadconv(this.value);"
                           });
                           $.each(uomlist, function (k, v) {
                               var $option = $("<option></option>", {
                                   "text": v.uom,
                                   "value": v.Uomid
                               });
                               if (data === v.uom) {
                                   $option.attr("selected", "selected")
                               }
                               $select.append($option);
                           });
                           return $select.prop("outerHTML");

                           //    }
                           //    else {

                           //    }
                           //}
                       }
                   },

                 {
                     title: "Mode", data: "Conv_Mode",
                     render: function (data) {
                         return '<input type="text" id="txtconv" class="form-control"  style="width: 50px;text-align: center;" value=' + data + ' disabled>';
                     }
                 },
                 { title: "ToPur UOM", data: "ToPurUOM" },
                  {
                      title: "BOM Qty", data: "BOM_qty",
                      render: function (data) {

                          return '<input type="text" id="txtbomqty" class="form-control txtbomqty"  style="width: 50px;text-align: center;" value=' + data + '>';

                      }
                  },
                    {
                        title: "JobBOM Qty", data: "JobBomQty",
                        render: function (data) {

                            return '<input type="text" id="txtJbomqty" class="form-control txtJbomqty"  style="width: 50px;text-align: center;" value=' + data + '>';

                        }
                    },
                  {

                      title: "Pur For Job", data: "PurFor_Job",
                      render: function (data) {

                          return '<input type="checkbox" id="chkpfj" class="editor-active chkpfj"  style="width: 50px;text-align: center;"  value=' + data + '>';

                      },
                  },


                 {

                     title: "CSP", data: "CSP",
                     render: function (data) {

                         return '<input type="checkbox" id="chkcsp" class="editor-active chkcsp"  style="width: 50px;text-align: center;"  value=' + data + '>';

                     },
                 },


                  {

                      title: "Item Closure", data: "ItemClosure",
                      render: function (data) {

                          return '<input type="checkbox" id="chkic" class="editor-active chkic"  style="width: 50px;text-align: center;"  value=' + data + '>';

                      },
                  },

        ],


    });


    $('input[id=chkpfj]').each(function () {
        debugger;
        var row = $(this).closest('tr');
        if ($(this).val() == "Y") {
            row.find('#chkpfj').prop('checked', true);
        }
    });

    $('input[id=chkcsp]').each(function () {
        debugger;
        var row = $(this).closest('tr');
        if ($(this).val() == "Y") {
            row.find('#chkcsp').prop('checked', true);
        }
    });

    $('input[id=chkic]').each(function () {
        debugger;
        var row = $(this).closest('tr');
        if ($(this).val() == "Y") {
            row.find('#chkic').prop('checked', true);
        }
    });
}


function loadtab(list) {
    debugger;

    $('#tPJAbody').DataTable().destroy();
    $('#tPJAbody').DataTable({
        data: list,
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
                 { title: "ID", data: "Buyordmasdetid", "visible": false },
                  { title: "JobBomDetID", data: "Jobordmasdetid", "visible": false },
                   { title: "JobBomID", data: "Jobordmasid", "visible": false },
                 { title: "ItemID", data: "Itemid", "visible": false },
                 { title: "Item", data: "item" },
                 { title: "Color", data: "Category1" },
                 { title: "Size", data: "Category2" },
                  { title: "Unit", data: "uom" },
                 { title: "BOM Qty", data: "pgmqty" },
                 { title: "Pgm Qty", data: "pgmqty" },
                  { title: "JobBom Qty", data: "JobBomQty" },
                   {
                       title: "Pur Uom", data: "uom",
                       render: function (data, type, row) {


                           var $select = $("<select></select>", {
                               "id": "ddluc",
                               "value": data,
                               "class": "form-control ddluc"
                               //onchange: "loadconv(this.value);"
                           });
                           $.each(uomlist, function (k, v) {
                               var $option = $("<option></option>", {
                                   "text": v.uom,
                                   "value": v.Uomid
                               });
                               if (data === v.uom) {
                                   $option.attr("selected", "selected")
                               }
                               $select.append($option);
                           });
                           return $select.prop("outerHTML");
                           //return '<select id="ddlGSize" selected="selected" class="form-control" style="width: 100px;"> </select>';


                       }
                   },

                 {
                     title: "Mode", data: "Conv_Mode",
                     render: function (data) {
                         return '<input type="text" id="txtconv" class="form-control"  style="width: 50px;text-align: center;" value=' + data + ' disabled>';
                     }
                 },
                 { title: "ToPur UOM", data: "ToPurUOM" },
                  {
                      title: "BOM Qty", data: "BOM_qty",
                      render: function (data) {

                          return '<input type="text" id="txtbomqty" class="form-control txtbomqty"  style="width: 50px;text-align: center;" value=' + data + '>';

                      }
                  },
                   {
                       title: "JobBOM Qty", data: "JobBomQty",
                       render: function (data) {

                           return '<input type="text" id="txtJbomqty" class="form-control txtJbomqty"  style="width: 50px;text-align: center;" value=' + data + '>';

                       }
                   },
                  {

                      title: "Pur For Job", data: "PurFor_Job",
                      render: function (data) {

                          return '<input type="checkbox" id="chkpfj" class="editor-active chkpfj"  style="width: 50px;text-align: center;"  value=' + data + '>';

                      },
                  },



                 {

                     title: "CSP", data: "CSP",
                     render: function (data) {

                         return '<input type="checkbox" id="chkcsp" class="editor-active chkcsp"  style="width: 50px;text-align: center;"  value=' + data + '>';

                     },
                 },

                  {

                      title: "Item Closure", data: "ItemClosure",
                      render: function (data) {

                          return '<input type="checkbox" id="chkic" class="editor-active chkic"  style="width: 50px;text-align: center;"  value=' + data + '>';

                      },
                  }


        ],


    });

    $('input[id=chkpfj]').each(function () {
        debugger;
        var row = $(this).closest('tr');
        if ($(this).val() == "Y") {
            row.find('#chkpfj').prop('checked', true);
        }
    });

    $('input[id=chkcsp]').each(function () {
        debugger;
        var row = $(this).closest('tr');
        if ($(this).val() == "Y") {
            row.find('#chkcsp').prop('checked', true);
        }
    });

    $('input[id=chkic]').each(function () {
        debugger;
        var row = $(this).closest('tr');
        if ($(this).val() == "Y") {
            row.find('#chkic').prop('checked', true);
        }
    });
}


function loadconv(val) {
    debugger;
    index;

    $("#tPJAbody ").dataTable().find("tbody").on('click', 'tr', function () {
        index = (this.rowIndex) - 1;
    });
    rowindex = $(this).closest('tr').index();
    for (var s = 0; s < convlist.length; s++) {
        if (convlist[s].FromUomid == val) {

        }
    }
}

function uomonbaseunit() {
    debugger;

    var foo = [];
    BUnit = [];
    for (var d = 0; d < bomlist.length; d++) {
        foo[d] = bomlist[d].Baseunit;
        BUnit = BUnit + "," + foo[d];
    }
    $.ajax({
        url: "/BOM/UomList",
        data: JSON.stringify({ baseunit: BUnit }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            uomlist = result.Value;
            loadtab(bomlist);
        }
    });

}

function loadum() {
    debugger;
    var ID = 0;
    $.ajax({
        url: "/BOM/UnitConvList/" + ID,
        data: JSON.stringify({}),
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            convlist = result.Value;

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function myUomFunction(uomid) {
    debugger;

    Umid = (uomid);
    //       loadum(Umid);
    var bom = 0, res;
    var bomm = 0;
    $("#txtbomqty").empty();
    var finalresult;
    if (mode[0] == '1') {
        bom = $("#txtbomqty").val();
        res = (bom / mode[1]);
        //var res = 2 / 144.00;
        //var res = 6 / 10;

    }
    else if (mode[0] == '2') {
        bomm = $("#txtbomqty").val();
        res = (bomm * mode[1]);
        //var res = 2 / 144;

    }
    finalresult = res.toFixed();
    $('#txtbomqty').val(finalresult);

}



function loadJobMainData() {
    debugger;

    var comId = $('#ddlMCompany').val();

    if (comId == null) {
        comId = DCompid;
    } else {
        comId = $('#ddlMCompany').val();
    }


    var buyerid = $('#ddlMBuyer').val();
    var suppid = $('#ddlMSupplier').val();
    var styid = $('#ddlMStyle').val();


    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    var OrdNo = "";
    var ONo = $('select#ddlMOrderNo option:selected').val();

    if (ONo == 0) {
        OrdNo == "";
    }
    else {

        OrdNo = $('select#ddlMOrderNo option:selected').text();
    }


    var RefNo = "";
    var RNo = $('select#ddlMRefNo option:selected').val();

    if (RNo == 0) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlMRefNo option:selected').text();
    }

    var WorkNo = "";
    var WNo = $('select#ddlMWorkNo option:selected').val();

    if (WNo == 0) {
        WorkNo == "";
    }
    else {

        WorkNo = $('select#ddlMWorkNo option:selected').text();
    }
    var OrdTyp = $('input[name="optMPType"]:checked').attr('value');

    if (DtChk || ChkComp) {
        RefNo = "";
        OrdNo = "";
        buyerid = 0;
        suppid = 0;
        styid = 0;
        WorkNo = "";
    }

    var Dispatchchecked = false;
    Dispatchchecked = $('#ChkDispatch').is(":checked");
    if (Dispatchchecked) {
        DispatchClosed = "Y";
    }
    else {
        DispatchClosed = "N";
    }

    $.ajax({
        url: "/JobWork/GetMainLoad",
        data: JSON.stringify({ companyid: comId, BuyerId: buyerid, SupplierId: suppid, StyleId: styid, OrderNo: OrdNo, RefNo: RefNo, JobOrderNo: WorkNo, Fdate: FDate, Tdate: TDate, OrderType: OrdTyp, DispatchClosed: DispatchClosed }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {

            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");


            if (DtChk) {

                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Ordid: dataSet[i][7],
                        Ordno: dataSet[i][4]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.Ordid]) {
                        revdet[el.Ordid] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMOrderNo').empty();
                $('#ddlMOrderNo').append($('<option/>').val('0').text('--Select Order No--'));
                $.each(rev, function () {
                    $('#ddlMOrderNo').append($('<option></option>').val(this.Ordid).text(this.Ordno));
                });

                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Refid: dataSet[i][7],
                        Refno: dataSet[i][8]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.Refid]) {
                        revdet[el.Refid] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMRefNo').empty();
                $('#ddlMRefNo').append($('<option/>').val('0').text('--Select Ref No--'));
                $.each(rev, function () {
                    $('#ddlMRefNo').append($('<option></option>').val(this.Refid).text(this.Refno));
                });

                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        styleid: dataSet[i][9],
                        style: dataSet[i][10]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.styleid]) {
                        revdet[el.styleid] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMStyle').empty();
                $('#ddlMStyle').append($('<option/>').val('0').text('--Select Style--'));
                $.each(rev, function () {
                    $('#ddlMStyle').append($('<option></option>').val(this.styleid).text(this.style));
                });


                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        jobid: dataSet[i][0],
                        jobno: dataSet[i][2]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.jobid]) {
                        revdet[el.jobid] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMWorkNo').empty();
                $('#ddlMWorkNo').append($('<option/>').val('0').text('--Select JobOrderNo--'));
                $.each(rev, function () {
                    $('#ddlMWorkNo').append($('<option></option>').val(this.jobid).text(this.jobno));
                });

                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Buyerid: dataSet[i][11],
                        Buyer: dataSet[i][12]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.Buyerid]) {
                        revdet[el.Buyerid] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMBuyer').empty();
                $('#ddlMBuyer').append($('<option/>').val('0').text('--Select Buyer--'));
                $.each(rev, function () {
                    $('#ddlMBuyer').append($('<option></option>').val(this.Buyerid).text(this.Buyer));
                });

                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Supplierid: dataSet[i][13],
                        Supplier: dataSet[i][14]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.Supplierid]) {
                        revdet[el.Supplierid] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMSupplier').empty();
                $('#ddlMSupplier').append($('<option/>').val('0').text('--Select Supplier--'));
                $.each(rev, function () {
                    $('#ddlMSupplier').append($('<option></option>').val(this.Supplierid).text(this.Supplier));
                });
                return true;
            }


            var inputcount = 0;
            $('#tblmaindetails tr').each(function () {
                inputcount++;
            });
            if (inputcount > 0) {
                //$('#tblYarndetails').DataTable().destroy();
                var table = $('#tblmaindetails').DataTable();
                var rows = table.clear().draw();
                $('#tblmaindetails').DataTable().rows.add(dataSet);
                $('#tblmaindetails').DataTable().columns.adjust().draw();
            }
            else {


                $('#tblmaindetails').DataTable({
                    data: dataSet,
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
                             { title: "JobId", "visible": false },
                             { title: "StylRowId", "visible": false },
                             { title: "Work Order No" },
                             { title: "Order Date" },
                             { title: "Order No" },
                             { title: "ChkBomCount", "visible": false },
                             { title: "ChkJobRecptCount", "visible": false },
                             { title: "Buy_Ord_MasId", "visible": false },
                             { title: "RefNo", "visible": false },
                             { title: "Styleid", "visible": false },
                             { title: "Style", "visible": false },
                              { title: "Buyerid", "visible": false },
                             { title: "Buyer", "visible": false },
                              { title: "Supplierid", "visible": false },
                             { title: "Supplier", "visible": false },
                             { title: "Action" },

                    ]

                });
            }
            $(document).ready(function () {
                var table = $('#tblmaindetails').DataTable();

                $('#tblmaindetails tbody').on('click', 'tr', function () {
                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');
                    }
                    else {
                        table.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');
                    }
                });


            });



            if (ChkOrdno) {
                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Ordid: dataSet[i][7],
                        Ordno: dataSet[i][4]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.Ordid]) {
                        revdet[el.Ordid] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMOrderNo').empty();
                $('#ddlMOrderNo').append($('<option/>').val('0').text('--Select Order No--'));
                $.each(rev, function () {
                    $('#ddlMOrderNo').append($('<option></option>').val(this.Ordid).text(this.Ordno));
                });
            }

            if (ChkRefno) {
                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Refid: dataSet[i][7],
                        Refno: dataSet[i][8]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.Refid]) {
                        revdet[el.Refid] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMRefNo').empty();
                $('#ddlMRefNo').append($('<option/>').val('0').text('--Select Ref No--'));
                $.each(rev, function () {
                    $('#ddlMRefNo').append($('<option></option>').val(this.Refid).text(this.Refno));
                });
            }
            if (ChkStyle) {
                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        styleid: dataSet[i][9],
                        style: dataSet[i][10]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.styleid]) {
                        revdet[el.styleid] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMStyle').empty();
                $('#ddlMStyle').append($('<option/>').val('0').text('--Select Style--'));
                $.each(rev, function () {
                    $('#ddlMStyle').append($('<option></option>').val(this.styleid).text(this.style));
                });
            }
            if (ChkJobno) {
                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        jobid: dataSet[i][0],
                        jobno: dataSet[i][2]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.jobid]) {
                        revdet[el.jobid] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMWorkNo').empty();
                $('#ddlMWorkNo').append($('<option/>').val('0').text('--Select JobOrderNo--'));
                $.each(rev, function () {
                    $('#ddlMWorkNo').append($('<option></option>').val(this.jobid).text(this.jobno));
                });
            }
            if (ChkBuyer) {
                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Buyerid: dataSet[i][11],
                        Buyer: dataSet[i][12]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.Buyerid]) {
                        revdet[el.Buyerid] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMBuyer').empty();
                $('#ddlMBuyer').append($('<option/>').val('0').text('--Select Buyer--'));
                $.each(rev, function () {
                    $('#ddlMBuyer').append($('<option></option>').val(this.Buyerid).text(this.Buyer));
                });
            }
            if (ChkSupplier) {
                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Supplierid: dataSet[i][13],
                        Supplier: dataSet[i][14]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.Supplierid]) {
                        revdet[el.Supplierid] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMSupplier').empty();
                $('#ddlMSupplier').append($('<option/>').val('0').text('--Select Supplier--'));
                $.each(rev, function () {
                    $('#ddlMSupplier').append($('<option></option>').val(this.Supplierid).text(this.Supplier));
                });
            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}


function getbyID(Id, StyRowId) {

    //LoadStageDDL("#ddlStageType");
    $.ajax({
        url: "/JobWork/LoadEditJobDetails",
        data: JSON.stringify({ JobOrderId: Id, StyleRowId: StyRowId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            debugger;
            if (obj != undefined) {


                $('#txtorderno').val(obj[0]["OrderNo"]);
                $('#txtjoborderno').val(obj[0]["JobOrderNo"]);
                $('#txtorderrefno').val(obj[0]["Job_Order_RefNo"]);
                $('#JRefNo').val(obj[0]["RefNo"]);
                $('#txtstyle').val(obj[0]["StyleName"]);
                $('#txtrate').val(obj[0]["Rate"]);
                $('#txtqty').val(obj[0]["ProductionQty"]);
                $('#txtbuyer').val(obj[0]["Buyer"]);
                $('#txtexcrate').val(obj[0]["Exchange"]);
                $('#txtmanager').val(obj[0]["Manager"]);
                $('#ddlmanager').val(obj[0]["ManagerId"]);
                $('#ddlmerch').val(obj[0]["MerchandiserId"]);
                $('#ddlStageType').val(obj[0]["StageId"]);
                $('#ddlqc').val(obj[0]["QCId"]);
                $('#ddlApp').val(obj[0]["ToApproveId"]);

                $('#ddlCurrency').val(obj[0]["CurrencyId"]);
                $('#txtcompid').val(obj[0]["companyid"]);
                $('#txtstyleid').val(obj[0]["StyleId"]);
                $('#txtbuyerid').val(obj[0]["BuyerId"]);
                $('#txtexcessper').val(obj[0]["ExcessPer"]);


                $('#txtorderdate').val(moment(obj[0]["OrderDate"]).format('DD/MM/YYYY'));

                var radioValue = $("input[name='subcontract']:checked").val();
                if (radioValue == "P") {

                    // LoadCompanyUnitDDL("#ddlcompanyunit");
                }

                StyleId = obj[0]["StyleId"];
                var IorExt = obj[0]["UnitOrOther"];

                if (IorExt == "S") {
                    $('#optSub').prop('checked', true);
                    $('#optUnit').prop('checked', false);
                    $('#ddlSupplier').val(obj[0]["SupplierId"]);

                    $('#EcomuId').hide();
                    $('#ESuppId').show();

                } else {
                    $('#optSub').prop('checked', false);
                    $('#optUnit').prop('checked', true);
                    $('#ddlCompanyunit').val(obj[0]["CompanyUnitId"]);
                    $('#EcomuId').show();
                    $('#ESuppId').hide();
                }

                var radioValue = $("input[name='subcontract']:checked").val();
                if (radioValue == "P") {


                    var CSId = $('#ddlCompanyunit').val();
                    LoadUnitAdd(CSId)

                } else {

                    var CSId = $('#ddlSupplier').val();
                    LoadSuppAdd(CSId)
                }




                //CmpId = obj[0]["Companyid"];
                //SuppId = obj[0]["Processorid"];
                //OrdType = obj[0]["OrderType"];
                //ProcessId = obj[0]["Processid"];
                //ProdInvId = obj[0]["ProdInvid"];
                //UnitId = obj[0]["CompanyUnitId"];
                //ProType = obj[0]["InternalOrExternal"];
                //IType = obj[0]["InvoiceType"];

                LoadJobShipEdit(Id, StyRowId);
                //LoadProdInvAddlessEdit(Id);
                //LoadProdInvRateDiffEdit(Id);


                $('#myModal').modal('hide');
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
                $('#btnDelete').hide();

            }
            else {

            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}


function getDeleteID(Id, StyRowId, ChkBomQty, ChkJobRecQty) {
    debugger;
    // LoadStageDDL("#ddlStageType");

    if (ChkBomQty > 0) {

        //alert("Purchase Order has been made for this entry,Please Check it....")
        var msg = 'Purchase Order has been made for this entry,Please Check it...';
        var flg = 4;
        var mode = 1;
        AlartMessage(msg, flg, mode);
        return true;

    }

    if (ChkJobRecQty > 0) {

        //alert("JobReceipt has been made for this entry,Please Check it....")
        var msg = 'JobReceipt has been made for this entry,Please Check it...';
        var flg = 4;
        var mode = 1;
        AlartMessage(msg, flg, mode);
        return true;

    }

    //if (DispatchClosed == "Y") {

    //    var msg = 'Dispatch Closed,Please Check it...';
    //    var flg = 4;
    //    var md = 1;
    //    var ul = "";
    //    AlartMessage(msg, flg, md, ul);
    //    return true;
    //}

    $.ajax({
        url: "/JobWork/LoadEditJobDetails",
        data: JSON.stringify({ JobOrderId: Id, StyleRowId: StyRowId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            debugger;
            if (obj != undefined) {


                $('#txtorderno').val(obj[0]["OrderNo"]);
                $('#txtjoborderno').val(obj[0]["JobOrderNo"]);
                $('#txtorderrefno').val(obj[0]["Job_Order_RefNo"]);
                $('#JRefNo').val(obj[0]["RefNo"]);
                $('#txtstyle').val(obj[0]["StyleName"]);
                $('#txtrate').val(obj[0]["Rate"]);
                $('#txtqty').val(obj[0]["ProductionQty"]);
                $('#txtbuyer').val(obj[0]["Buyer"]);
                $('#txtexcrate').val(obj[0]["Exchange"]);
                $('#txtmanager').val(obj[0]["Manager"]);
                $('#ddlmanager').val(obj[0]["ManagerId"]);
                $('#ddlmerch').val(obj[0]["MerchandiserId"]);
                $('#ddlStageType').val(obj[0]["StageId"]);
                $('#ddlqc').val(obj[0]["QCId"]);
                $('#ddlApp').val(obj[0]["ToApproveId"]);

                $('#ddlCurrency').val(obj[0]["CurrencyId"]);
                $('#txtcompid').val(obj[0]["companyid"]);
                $('#txtstyleid').val(obj[0]["StyleId"]);
                $('#txtbuyerid').val(obj[0]["BuyerId"]);



                $('#txtorderdate').val(moment(obj[0]["OrderDate"]).format('DD/MM/YYYY'));

                var radioValue = $("input[name='subcontract']:checked").val();
                if (radioValue == "P") {

                    // LoadCompanyUnitDDL("#ddlcompanyunit");
                }

                StyleId = obj[0]["StyleId"];
                var IorExt = obj[0]["UnitOrOther"];

                if (IorExt == "S") {
                    $('#optSub').prop('checked', true);
                    $('#optUnit').prop('checked', false);
                    $('#ddlSupplier').val(obj[0]["SupplierId"]);

                    $('#EcomuId').hide();
                    $('#ESuppId').show();

                } else {
                    $('#optSub').prop('checked', false);
                    $('#optUnit').prop('checked', true);
                    $('#ddlCompanyunit').val(obj[0]["CompanyUnitId"]);
                    $('#EcomuId').show();
                    $('#ESuppId').hide();
                }

                var radioValue = $("input[name='subcontract']:checked").val();
                if (radioValue == "P") {


                    var CSId = $('#ddlCompanyunit').val();
                    LoadUnitAdd(CSId)

                } else {

                    var CSId = $('#ddlSupplier').val();
                    LoadSuppAdd(CSId)
                }




                //CmpId = obj[0]["Companyid"];
                //SuppId = obj[0]["Processorid"];
                //OrdType = obj[0]["OrderType"];
                //ProcessId = obj[0]["Processid"];
                //ProdInvId = obj[0]["ProdInvid"];
                //UnitId = obj[0]["CompanyUnitId"];
                //ProType = obj[0]["InternalOrExternal"];
                //IType = obj[0]["InvoiceType"];

                LoadJobShipEdit(Id, StyRowId);
                //LoadProdInvAddlessEdit(Id);
                //LoadProdInvRateDiffEdit(Id);

                $('#myModal').modal('hide');
                $('#myModal1').modal('show');
                $('#btnUpdate').hide();
                $('#btnAdd').hide();

                var Dispatchchecked = $('#ChkDispatch').is(":checked");
                if (Dispatchchecked) {
                    DispatchClosed = "Y";
                }
                else {
                    DispatchClosed = "N";
                }

                if (DispatchClosed == "N") {
                    $('#btnDelete').show();
                }
                else if (DispatchClosed == "Y") {
                    $('#btnDelete').hide();
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

function LoadJobShipEdit(Id, StyRowId) {

    $.ajax({
        url: "/JobWork/GetJobEditShipDetails",
        data: JSON.stringify({ JobOrderId: Id, StyleRowId: StyRowId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            ShipItemList = result;
            loadJobShipItemTable(ShipItemList);
            if (ShipItemList.length > 0) {
                shprwid = ShipItemList[0].shiprowid;
            }

            var ShipId = 0;
            LoadJobEditItemDetails(Id);


        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}


function LoadJobEditItemDetails(Id) {
    debugger;


    $.ajax({
        url: "/JobWork/GetJobEntryEditItemDetails",
        data: JSON.stringify({ JobOrderId: Id }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {


            SaveItemList = result;
            loadJobSaveItemTable(SaveItemList);


            if (SaveItemList.length > 0) {
                ItemList = $.grep(SaveItemList, function (d) {
                    return d.ShipRowId == shprwid;

                });

                loadJobItemTable(ItemList);
            }


        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
////////////////////////

/////////////////////////////////////////////////////////
function JobWorkUpdate() {

    debugger;


    var res = validate();
    if (res == false) {
        return false;
    }

    if (ShipItemList.length == 0) {

        //alert("Please Check Shipment Details..");
        var msg = 'Please Check Shipment Details...';
        var flg = 4;
        var mode = 1;
        AlartMessage(msg, flg, mode);
        return true;
    }


    ///check();
    var cnt = $("#tblJobEntryShipDetails tr").length - 1;
    var Data = "";

    SaveShipList = [];
    for (var i = 1; i <= cnt; i++) {

        var compItemObj = {
            deliverydate: $("#tblJobEntryShipDetails tr:eq(" + i + ") td:eq(0)").html(),
            jobOrdqty: $("#tblJobEntryShipDetails tr:eq(" + i + ") td:eq(4)").html(),
            buyordship: $("#tblJobEntryShipDetails tr:eq(" + i + ") td:eq(6)").html(),
            JobOrderNo: $('#txtjoborderno').val(),

        };
        SaveShipList.push(compItemObj);
    }

    var radioValue = $("input[name='subcontract']:checked").val();

    var objConSubmit = {

        JobOrderNo: $('#txtjoborderno').val(),
        JobOrdDate: $('#txtorderdate').val(),//new Date($('#txtorderdate').val()),
        OrderNo: $('#txtorderno').val(),
        StyleId: $('#txtstyleid').val(),
        SupplierId: $('#ddlSupplier').val(),
        CompanyUnitId: $('#ddlCompanyunit').val(),
        UnitOrOther: radioValue,
        MerchandiserId: $('#ddlmerch').val(),
        QCId: $('#ddlqc').val(),
        Quantity: $('#txtqty').val(),
        Exchange: $('#txtexcrate').val(),
        BuyerId: $('#txtbuyerid').val(),
        companyid: $('#txtcompid').val(),
        StyleRowId: GStyRowId,
        Rate: $('#txtrate').val(),
        Issuedate: $('#txtissuedate').val(),//new Date($('#txtissuedate').val()),
        CurrencyId: $('#ddlCurrency').val(),
        Job_Order_RefNo: $('#JRefNo').val(),
        ToApproveId: $('#ddlApp').val(),
        StageId: $('#ddlStageType').val(),
        ExcessPer: $('#txtexcessper').val(),
        CreatedBy: Userid,
        JobOrdShip: SaveShipList,
        JobOrdItem: SaveItemList,
        BomListDet: bomlist
    };
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/JobWork/Update",
        data: JSON.stringify(objConSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.Value == true) {
                AddUserEntryLog('SalesManagement', 'Job Order', 'UPDATE', $('#txtjoborderno').val());
                //alert("Data Updated Sucessfully");
                //window.location.href = "/JobWork/JobWorkIndex";
                var msg = 'Data Updated Sucessfully...';
                var flg = 1;
                var mode = 0;
                AlartMessage(msg, flg, mode);

            } else {
                window.location.href = "/Error/Index";
            }

        },
        error: function (errormessage) {
            debugger;
            alert(errormessage.responseText);
        }
    });
}

/////////////////////////////////////////////////////////
function JobWorkDelete() {

    debugger;


    var res = validate();
    if (res == false) {
        return false;
    }

    if (ShipItemList.length == 0) {

        //alert("Please Check Shipment Details..");
        var msg = 'Please Check Shipment Details...';
        var flg = 4;
        var mode = 1;
        AlartMessage(msg, flg, mode);
        return true;
    }

    var list = $.grep(ItemList, function (e) {
        return e.ActualJobQuantity > 0;
    });

    if (list.length == 0) {
        //alert("Please enter atleast any one job order qty...");
        var msg = 'Please enter atleast any one job order qty...';
        var flg = 4;
        var mode = 1;
        AlartMessage(msg, flg, mode);
        return true;
    }

    ///check();
    var cnt = $("#tblJobEntryShipDetails tr").length - 1;
    var Data = "";

    SaveShipList = [];
    for (var i = 1; i <= cnt; i++) {

        var compItemObj = {
            deliverydate: $("#tblJobEntryShipDetails tr:eq(" + i + ") td:eq(0)").html(),
            jobOrdqty: $("#tblJobEntryShipDetails tr:eq(" + i + ") td:eq(4)").html(),
            buyordship: $("#tblJobEntryShipDetails tr:eq(" + i + ") td:eq(6)").html(),
            JobOrderNo: $('#txtjoborderno').val(),

        };
        SaveShipList.push(compItemObj);
    }

    var radioValue = $("input[name='subcontract']:checked").val();

    var objConSubmit = {

        JobOrderNo: $('#txtjoborderno').val(),
        JobOrdDate: $('#txtorderdate').val(),//new Date($('#txtorderdate').val()),
        OrderNo: $('#txtorderno').val(),
        StyleId: $('#txtstyleid').val(),
        SupplierId: $('#ddlSupplier').val(),
        CompanyUnitId: $('#ddlCompanyunit').val(),
        UnitOrOther: radioValue,
        MerchandiserId: $('#ddlmerch').val(),
        QCId: $('#ddlqc').val(),
        Quantity: $('#txtqty').val(),
        Exchange: $('#txtexcrate').val(),
        BuyerId: $('#txtbuyerid').val(),
        companyid: $('#txtcompid').val(),
        StyleRowId: GStyRowId,
        Rate: $('#txtrate').val(),
        Issuedate: $('#txtissuedate').val(),//new Date($('#txtissuedate').val()),
        CurrencyId: $('#ddlCurrency').val(),
        Job_Order_RefNo: $('#JRefNo').val(),
        ToApproveId: $('#ddlApp').val(),
        StageId: $('#ddlStageType').val(),
        CreatedBy: Userid,
        JobOrdShip: SaveShipList,
        JobOrdItem: SaveItemList,
        BomListDet: bomlist
    };
    $("#btnDelete").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/JobWork/Delete",
        data: JSON.stringify(objConSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.Value == true) {
                AddUserEntryLog('SalesManagement', 'Job Order', 'DELETE', $('#txtjoborderno').val());
                //alert("Data Deleted Sucessfully");
                //window.location.href = "/JobWork/JobWorkIndex";
                var msg = 'Data Deleted Sucessfully...';
                var flg = 2;
                var mode = 0;
                AlartMessage(msg, flg, mode);

            } else {
                window.location.href = "/Error/Index";
            }

        },
        error: function (errormessage) {
            debugger;
            alert(errormessage.responseText);
        }
    });
}


function Job_Wrk_Print(Id) {
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
    //$('#myModal2').show();
    //$('#myModal2').modal('show');
    //$('#selectall').val("");
    //GenerateReportItem();
    var compid = $('#ddlMCompany').val();
    if (compid != null) {
        window.open("../ReportInline/OrderProcessing/JobWorkInlineReport.aspx?Masid=" + RepId + "&Companyid=" + compid);//+ "&MultiOptionid=" + MOrd;
    }
}



function SubReport() {
    debugger;
    var compid = $('#ddlMCompany').val();
    if (compid == null) {
        compid = DCompid;
    }
    if (compid != null) {
        window.open("../Reports/BuyerOrderInlineReport.aspx?ddlOrderNo=" + RepId + "&Multiopt=" + MOrd + "&Combodet=" + p[0] + "&MeasChart=" + p[1] + "&OrdIns=" + p[2] + "&Chklst=" + p[3] + "&Material=" + p[4] + "&Ratematrix=" + p[5] + "&Packing=" + p[6] + "&GSM=" + p[7] + "&INR=" + p[8] + "&Shipdet=" + p[9] + "&PrntImg=" + p[10] + "&Companyid=" + compid);//+ "&MultiOptionid=" + MOrd;
    }
}

function ListFilter() {
    // $('#tblmaindetails').DataTable().destroy();
    DtChk = false;
    loadJobMainData();
}
function CMainlist() {
    DtChk = false;
    ChkRefno = true;
    ChkOrdno = true;
    ChkStyle = true;
    ChkJobno = true;
    ChkBuyer = true;
    ChkSupplier = true;
    ChkComp = true;
    loadJobMainData();
}
function BMainlist() {
    DtChk = false;
    ChkRefno = true;
    ChkOrdno = true;
    ChkStyle = true;
    ChkJobno = true;
    ChkBuyer = false;
    ChkSupplier = true;
    ChkComp = true;
    loadJobMainData();
}
function SMainlist() {
    DtChk = false;
    ChkRefno = true;
    ChkOrdno = true;
    ChkStyle = true;
    ChkJobno = true;
    ChkBuyer = true;
    ChkSupplier = false;
    ChkComp = true;
    loadJobMainData();
}
function StMainlist() {
    DtChk = false;
    ChkRefno = false;
    ChkOrdno = false;
    ChkStyle = false;
    ChkJobno = false;
    ChkBuyer = false;
    ChkSupplier = false;
    ChkComp = true;
    loadJobMainData();
}

function OMainlist() {
    DtChk = false;
    ChkRefno = false;
    ChkOrdno = false;
    ChkStyle = false;
    ChkJobno = false;
    ChkBuyer = false;
    ChkSupplier = false;
    ChkComp = true;
    loadJobMainData();
}
function RMainlist() {
    DtChk = false;
    ChkRefno = false;
    ChkOrdno = false;
    ChkStyle = false;
    ChkJobno = false;
    ChkBuyer = false;
    ChkSupplier = false;
    ChkComp = true;
    loadJobMainData();
}
function WMainlist() {
    DtChk = false;
    ChkRefno = false;
    ChkOrdno = false;
    ChkStyle = false;
    ChkJobno = false;
    ChkBuyer = false;
    ChkSupplier = false;
    ChkComp = true;
    loadJobMainData();
}