
var UserName = 0;
var MainFDate = 0;
var Guserid = 0;
var DCompid = 0;
var ItmList = [];
var SItmList = [];
var GBoxRate = 0;
var GBoxMasId = 0;
var GEditBoxQty = 0;




$(document).ready(function () {
    debugger;
    DCompid = $("#hdnDCompid").data('value');
    Guserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    MainFDate = $("#hdMainFromDate").data('value');
    getDate();
    LoadNo();

    ddlmain();
    var protype = $('input[name="OrdType"]:checked').attr('value');

    if (protype == 'B') {
        LoadBulkOrderNoDDL("#ddlMOrderno");
        LoadBulkRefNoDDL("#ddlMRefno");
    }
    if (protype == 'S') {
        LoadSampOrderNoDDL("#ddlMOrderno");
        LoadSampleRefNoDDL("#ddlMRefno");

    }
    LoadCompanyDDL("#ddlMSCompany,#ddlSCompany");
    LoadStoreUnitDDL("#ddlMSMMainStore");
    LoadStoreSectionDDL("#ddlSecStore");
    LoadCompanyUnitDDL("#ddlPUnit");
    LoadWorkdivisionDDL("#ddlWK");


    var MSType = $('input[name="MSType"]:checked').attr('value');


    if (MSType == "M") {
        $("#SubStoreId").hide();
        $("#SecStoId").hide();
    } else if (MSType == "E") {
        $("#SubStoreId").hide();
        $("#SecStoId").show();
        $("#MainStoreId").hide();
    }

    
   

    $(document).on('keyup', '.calcAmt', function () {
        debugger;
    

        var table = $('#inputitmtab').DataTable();
        // var CSno = table.row($(this).parents('tr')).data()["SNo"];   
        var StyId = table.row($(this).parents('tr')).data()["StyleId"];

        var Val = $(this).val();
        var Issqty = Val;


        $.each(ItmList, function () {
            if (this.StyleId == StyId) {
                this.BoxQty = Issqty;
            }
        });

        //Check the pcsqty for box 
        $.each(SItmList, function () {
            //if (this.ItemStockId == StyId) {
                this.BoxQty = Issqty;
            //}
        });
        SItmList = SItmList;
        LoadSItmtab(SItmList);
        //

        var totalqt = 0;
        for (var e = 0; e < ItmList.length; e++) {
            var amount = ItmList[e].BoxQty;
            totalqt = totalqt + parseFloat(amount);

        }
        $('#txtTotBoxQty').val(totalqt.toFixed(3));


        var TBoxQty = $('#txtTotBoxQty').val();
        var totalpqt = 0;
        for (var e = 0; e < ItmList.length; e++) {
            var pcs = ItmList[e].PcsQty;
            totalpqt = totalpqt + parseFloat(pcs);

        }
        $('#txtTotPcsQty').val(totalpqt.toFixed(3));

        var TBoxQty = $('#txtTotBoxQty').val();
        var TPcsQty = $('#txtTotPcsQty').val();
        var GPcsQty = (parseFloat(TPcsQty) * parseFloat(TBoxQty)).toFixed(2);
        $('#txtTotPcsQty').val(GPcsQty);
    });

    $(document).on('keyup', '.calcAlloted', function () {
        debugger;
        var table = $('#inputstkdettab').DataTable();
        // var CSno = table.row($(this).parents('tr')).data()["SNo"];   
        var StkId = table.row($(this).parents('tr')).data()["ItemStockId"];
        var StkQty = table.row($(this).parents('tr')).data()["StockQty"];
        var BxQty = table.row($(this).parents('tr')).data()["BoxQty"];
        var PcQty = table.row($(this).parents('tr')).data()["PcsQty"];

        var Val = $(this).val();
        var qty = Val;


        var PcheckQty = BxQty * PcQty;

        if (qty > PcheckQty) {
            //alert("Alloted Qty Should Not Greater then Conversion Qty..");
            var msg = 'Alloted quantity Should Not Greater then Conversion quantity...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
            $.each(SItmList, function () {
                if (this.ItemStockId == StkId) {
                    this.AllotedQty = 0;

                }
            });
            var tablef = $('#inputstkdettab').DataTable();
            var datas = tablef.rows().data();

            $('input[id=txtAllOrdQty]').each(function (ig) {
                if (datas[ig].ItemStockId == StkId) {
                    var row = $(this).closest('tr');
                    row.find('#txtAllOrdQty').val(0);
                }
            });
            return true;
        }

        $.each(SItmList, function () {
            if (this.ItemStockId == StkId) {
                this.AllotedQty = qty;
            }
        });



        var totalqt = 0;
        for (var e = 0; e < SItmList.length; e++) {
            var amount = SItmList[e].AllotedQty;
            totalqt = totalqt + parseFloat(amount);

        }
        $('#txtTotAloQty').val(totalqt.toFixed(3));


        var TAlQty = $('#txtTotAloQty').val();
        var TPcsQty = $('#txtTotPcsQty').val();



       

        if (parseFloat(Val) > parseFloat(StkQty)) {
            //alert("Alloted Qty Should Not Greater then Stock Qty..");
            var msg = 'Alloted quantity Should Not Greater then Stock quantity...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);

            $.each(SItmList, function () {
                if (this.ItemStockId == StkId) {
                    this.AllotedQty = 0;

                }
            });

            var tablef = $('#inputstkdettab').DataTable();
            var datas = tablef.rows().data();

            $('input[id=txtAllOrdQty]').each(function (ig) {
                if (datas[ig].ItemStockId == StkId) {
                    var row = $(this).closest('tr');
                    row.find('#txtAllOrdQty').val(0);
                }
            });
            $('#txtTotAloQty').val(0);
            return true;
        }


        if (parseFloat(TAlQty) > parseFloat(TPcsQty)) {
            //alert("Alloted Qty Should Not Greater then TotPcs Qty..");
            var msg = 'Alloted quantity Should Not Greater then TotPcs quantity...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);



            $.each(SItmList, function () {
                if (this.ItemStockId == StkId) {
                    this.AllotedQty = 0;

                }
            });


            var tablef = $('#inputstkdettab').DataTable();
            var datas = tablef.rows().data();

            $('input[id=txtAllOrdQty]').each(function (ig) {
                if (datas[ig].ItemStockId == StkId) {
                    var row = $(this).closest('tr');
                    row.find('#txtAllOrdQty').val(0);
                }
            });
            //$('#txtTotAloQty').val(0);


            var totalqt = 0;
            for (var e = 0; e < SItmList.length; e++) {
                var amount = SItmList[e].AllotedQty;
                totalqt = totalqt + parseFloat(amount);

            }
            $('#txtTotAloQty').val(totalqt.toFixed(3));
            return true;


        }

        //CalRate for BoxQty

        var totalrate = 0;
        for (var e = 0; e < SItmList.length; e++) {

            var amount = SItmList[e].Rate;
            var BQty = SItmList[e].AllotedQty;
            if (BQty > 0) {
                totalrate = totalrate + parseFloat(amount);
            }

        }

        var TRate = totalrate;
        var TBoxQty = $('#txtTotBoxQty').val();
        var BRate = parseFloat(TRate) / parseFloat(TBoxQty);

        GBoxRate = BRate;

        //var GPcsQty = (parseFloat(TPcsQty) * parseFloat(TBoxQty)).toFixed(2);
        //$('#txtTotPcsQty').val(GPcsQty);
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
    $('#txtDcDate').val(Fdatestring);
    $('#txtEntryDate').val(Fdatestring);

}


function backtomain() {
    $("#myModal2").hide();
    $("#myModal2").modal('hide');
}

function LoadNo() {

    $.ajax({
        url: "/BoxConversion/GetSknDetails",
        data: JSON.stringify({}),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;


            var obj = json.Value;
            if (json.Status == 'SUCCESS') {

                var data = json.Value;

                var skndet = {};
                var skn = [];

                $.each(obj, function (i, el) {

                    if (!skndet[el.SKUMasID]) {
                        skndet[el.SKUMasID] = true;
                        skn.push(el);
                    }
                });

                $(ddlSknNo).empty();


                $(ddlSknNo).append($('<option/>').val('0').text('--Select Skn No--'));
                $.each(skn, function () {
                    $(ddlSknNo).append($('<option></option>').val(this.SKUMasID).text(this.SKUNo));
                });


            }


        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function GenerateNumber() {
    debugger;

    table = "box_con_mas",
    column = "BoxConNo",
    compId = DCompid,
    Docum = 'BOX CONVERSION'

    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $('#txtEntryNo').val(result.Value);
        }
    });
}

function ClearTextbox() {
    debugger;
    GenerateNumber();
    $('#ddlMOrderno').val("0");
    $('#ddlMRefno').val("0");
    $('#ddlSknNo').val("0");

    var table = $('#inputstkdettab').DataTable();
    table.clear().draw();

    var table1 = $('#inputitmtab').DataTable();
    table1.clear().draw();

    $('#txtremarks').val("");
}

function LoadOrd() {
    var protype = $('input[name="OrdType"]:checked').attr('value');

    if (protype == 'B') {
        LoadBulkOrderNoDDL("#ddlMOrderno");
        LoadBulkRefNoDDL("#ddlMRefno");
    }
    if (protype == 'S') {
        LoadSampOrderNoDDL("#ddlMOrderno");
        LoadSampleRefNoDDL("#ddlMRefno");

    }
}


function LoadItemlist() {
    var MasID = $('#ddlSknNo').val();
    LoadItm(MasID);
}
function LoadItm(MasID) {
    debugger;

    $.ajax({
        url: "/BoxConversion/Loaditmsgrid",
        data: JSON.stringify({ SKUMasID: MasID }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;

            ItmList = result.Value;
            LoadItmtab(ItmList);
            //Itmid = ItmList[0].itemid;
            //Colorid = ItmList[0].colorid;
            //Sizeid = ItmList[0].sizeid;

        }

    });
}
function LoadItmtab(list) {
    $('#inputitmtab').DataTable().destroy();

    $('#inputitmtab').DataTable({
        data: list,
        scrollY: 100,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        //"bSort": false,
        columns: [
              //{ title: "SNo", data: "sno", "visible": false },
                   { title: "Styleid", data: "StyleId", "visible": false },
                   { title: "Style", data: "Style" },
                   { title: "Size", data: "Size" },
                   { title: "Sizeid", data: "SizeId", "visible": false },
                   { title: "Color", data: "Color" },
                   { title: "Colorid", data: "ColorId", "visible": false },
                   { title: "Pcs", data: "PcsQty" },
                   {
                       title: "Box Qty", data: "BoxQty",
                       render: function (data) {

                           return '<input type="text" id="txtOpOrdQty" class="calcAmt form-control"  style="width: 50px;text-align: center;"  value=' + data + ' onkeypress="return isNumber(event)">';

                       },
                   },

        ]

    });

  


    var totalqt = 0;
    for (var e = 0; e < ItmList.length; e++) {
        var amount = ItmList[e].BoxQty;
        totalqt = totalqt + parseFloat(amount);

    }
    $('#txtTotBoxQty').val(totalqt.toFixed(3));


    var TBoxQty = $('#txtTotBoxQty').val();
    var totalpqt = 0;
    for (var e = 0; e < ItmList.length; e++) {
        var pcs = ItmList[e].PcsQty;
        totalpqt = totalpqt + parseFloat(pcs);

    }
    $('#txtTotPcsQty').val(totalpqt.toFixed(3));

    var TBoxQty = $('#txtTotBoxQty').val();
    var TPcsQty = $('#txtTotPcsQty').val();
    var GPcsQty = (parseFloat(TPcsQty) * parseFloat(TBoxQty)).toFixed(2);
    $('#txtTotPcsQty').val(GPcsQty);

    var table = $('#inputitmtab').DataTable();
    $("#inputitmtab tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#inputitmtab tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });

    if (GBoxMasId == 0) {
        LoadStockDetails();
    }
}


function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}
function LoadRefno() {
    debugger;
    var OrderNo = $('#ddlMOrderno').val();
    $.ajax({
        url: "/BoxConversion/GeRefNoDetails",
        data: JSON.stringify({ Buy_Ord_MasId: OrderNo }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {

            var obj = json.Value;
            if (json.Status == 'SUCCESS') {

                var data = json.Value;
                var refdet = {};
                var ref = [];

                $.each(obj, function (i, el) {

                    if (!refdet[el.Buy_Ord_MasId]) {
                        refdet[el.Buy_Ord_MasId] = true;
                        ref.push(el);
                    }
                });

                $(ddlMRefno).empty();
                //$(ddlMRefno).append($('<option/>').val('0').text('--Select Ref No--'));
                $.each(ref, function () {
                    $(ddlMRefno).append($('<option></option>').val(this.Buy_Ord_MasId).text(this.Ref_No));
                });
            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
    LoadStockDetails(OrderNo);
}
function LoadOrderno() {
    debugger;
    var RefNo = $('#ddlMRefno').val();
    $.ajax({
        url: "/BoxConversion/GeOrdDetails",
        data: JSON.stringify({ Buy_Ord_MasId: RefNo }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {

            var obj = json.Value;
            if (json.Status == 'SUCCESS') {

                var data = json.Value;
                var orddet = {};
                var ord = [];

                $.each(obj, function (i, el) {

                    if (!orddet[el.Buy_Ord_MasId]) {
                        orddet[el.Buy_Ord_MasId] = true;
                        ord.push(el);
                    }
                });

                $(ddlMOrderno).empty();
                //$(ddlMRefno).append($('<option/>').val('0').text('--Select Ref No--'));
                $.each(ord, function () {
                    $(ddlMOrderno).append($('<option></option>').val(this.Buy_Ord_MasId).text(this.Order_No));
                });
            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });

    //LoadStockDetails(RefNo);
}



function LoadStockDetails() {
    debugger;
    var RefNo = $('#ddlMRefno').val();
    var Sknid = $('#ddlSknNo').val();
    $.ajax({
        url: "/BoxConversion/Loaditmstockgrid",
        data: JSON.stringify({ BMasId: RefNo, SknMasId: Sknid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;

            SItmList = result.Value;
            LoadSItmtab(SItmList);

        }

    });
}

function LoadSItmtab(list) {
    $('#inputstkdettab').DataTable().destroy();

    $('#inputstkdettab').DataTable({
        data: list,
        scrollY: 300,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,

        columns: [

                   { title: "Stockid", data: "ItemStockId", "visible": false },
                   { title: "Itmid", data: "Itemid", "visible": false },
                   { title: "Clrid", data: "Colorid", "visible": false },
                   { title: "Sizeid", data: "Sizeid", "visible": false },
                   { title: "Trans No", data: "TransNo" },
                   { title: "Item", data: "Item" },
                   { title: "Color", data: "Color" },
                   { title: "Size", data: "Size" },
                   { title: "Stock Qty", data: "StockQty" },
                    { title: "Box Qty", data: "BoxQty" },
                    { title: "Pcs Qty", data: "PcsQty" },
                   {
                       title: "Alloted", data: "AllotedQty",
                       render: function (data) {

                           return '<input type="text" id="txtAllOrdQty" class="calcAlloted form-control"  style="width: 50px;text-align: center;"  value=' + data + ' onkeypress="return isNumber(event)">';

                       },
                   },

        ]

    });


    var totalqt = 0;
    for (var e = 0; e < SItmList.length; e++) {
        var amount = SItmList[e].AllotedQty;
        totalqt = totalqt + parseFloat(amount);

    }
    $('#txtTotAloQty').val(totalqt.toFixed(3));


    var TAlQty = $('#txtTotAloQty').val();
    var TPcsQty = $('#txtTotPcsQty').val();


    var totalrate = 0;
    for (var e = 0; e < SItmList.length; e++) {

        var amount = SItmList[e].Rate;
        var BQty = SItmList[e].AllotedQty;
        if (BQty > 0) {
            totalrate = totalrate + parseFloat(amount);
        }

    }

    var TRate = totalrate;
    var TBoxQty = $('#txtTotBoxQty').val();
    var BRate = parseFloat(TRate) / parseFloat(TBoxQty);

    GBoxRate = BRate;

    var table = $('#inputstkdettab').DataTable();
    $("#inputstkdettab tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#inputstkdettab tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}


function save() {

    debugger;

    var res = validate();
    if (res == false) {
        return false;
    }


    if (ItmList.length == 0) {
        //alert("Please Enter the Item Details..");
        var msg = 'Please Enter the Item Details...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        return true;
    }
    var opchk = [];
    for (var y = 0; y < ItmList.length; y++) {
        if (ItmList[y].BoxQty > 0) {
            opchk.push(ItmList[y]);
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
    if (SItmList.length == 0) {
        //alert("Please Enter the Stock Details..");
        var msg = 'Please Enter the Stock Details...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        return true;
    }

    var TPQty = $('#txtTotPcsQty').val();
    var TAQty = $('#txtTotAloQty').val();

    if (parseFloat(TPQty) != parseFloat(TAQty)) {
        //alert("Please Check TotBoxQty and TotAllotedQty Should be Equal..");
        var msg = 'Please Check TotBox quantity and TotAlloted quantity Should be Equal...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        return true;
    }

    var otype = $('input[name="OrdType"]:checked').attr('value');


    var objPurSubmit = {

        CompanyId: DCompid,
        BoxConNo: $('#txtEntryNo').val(),
        BoxConDate: $('#txtEntryDate').val(),
        OrderNo: $('#ddlMOrderno option:selected').text(),
        StoreId: $('#ddlMSMMainStore').val(),
        CreatedBy: Guserid,
        SKUMasID: $('#ddlSknNo').val(),
        SKUNo: $('#ddlSknNo option:selected').text(),
        Remarks: $('#txtRemark').val(),
        OType: otype,
        BoxRate: GBoxRate,
        BoxConDet: ItmList,
        BoxConStock: SItmList

    };
    debugger;
    $("#Add").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/BoxConversion/Add",
        data: JSON.stringify(objPurSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.Value == true) {

                //alert("Data Saved Sucessfully");
                //window.location.href = "/BoxConversion/BoxConversionIndex";
                var msg = 'Data Saved Sucessfully...';
                var flg = 1;
                var mod = 0;
                var ur = "/BoxConversion/BoxConversionIndex";
                AlartMessage(msg, flg, mod, ur);
            } else {

                window.location.href = "/Error/Index";


            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function validate() {
    var isValid = true;

    if ($('#ddlMSCompany').val() == 0) {

        $('#ddlMSCompany').siblings(".select2-container").css('border', '1px solid red');

        isValid = false;
    }
    else {
        $('#ddlMSCompany').siblings(".select2-container").css('border', '1px solid lightgrey');
    }

    if ($('#ddlMSMMainStore').val() == 0) {

        $('#ddlMSMMainStore').siblings(".select2-container").css('border', '1px solid red');

        isValid = false;
    }
    else {
        $('#ddlMSMMainStore').siblings(".select2-container").css('border', '1px solid lightgrey');
    }

    if ($('#ddlMOrderno').val() == 0) {

        $('#ddlMOrderno').siblings(".select2-container").css('border', '1px solid red');

        isValid = false;
    }
    else {
        $('#ddlMOrderno').siblings(".select2-container").css('border', '1px solid lightgrey');
    }

    if ($('#ddlMRefno').val() == 0) {

        $('#ddlMRefno').siblings(".select2-container").css('border', '1px solid red');

        isValid = false;
    }
    else {
        $('#ddlMRefno').siblings(".select2-container").css('border', '1px solid lightgrey');
    }

    if ($('#ddlSknNo').val() == 0) {

        $('#ddlSknNo').siblings(".select2-container").css('border', '1px solid red');

        isValid = false;
    }
    else {
        $('#ddlSknNo').siblings(".select2-container").css('border', '1px solid lightgrey');
    }

    return isValid;
}

function ddlmain() {


    var CompId = $('#ddlMCompany').val();
    if (CompId == null || CompId == "0") {
        CompId = 0;
    }

    var StoreId = $('#ddlMStore').val();
    if (StoreId == null || StoreId == "0") {
        StoreId = 0;
    }


    var RecNo = "";
    var RNo = $('select#ddlMEntryNo option:selected').val();

    if (RNo == 0 || RNo == undefined) {
        RecNo == "";
    }
    else {

        RecNo = $('select#ddlMEntryNo option:selected').val();
    }


    var OrdNo = "";
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var BoxMasId = 0;


    $.ajax({
        url: "/BoxConversion/LoadMaingriddet",
        data: JSON.stringify({ CompanyId: CompId, StoreId: StoreId, BoxConNo: RecNo, OrderNo: OrdNo, FromDate: FDate, ToDate: TDate, BoxConMasId: BoxMasId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            var obj = json.Value;
            if (json.Status == 'SUCCESS') {
                var data = json.Value;
                maingridlist = json.Value;
                var compdet = {};
                var comp = [];
                var recptdet = {};
                var recpt = [];
                var orddet = {};
                var ord = [];
                var stodet = {};
                var sto = [];

                $.each(obj, function (i, el) {

                    if (!compdet[el.CompanyId]) {
                        compdet[el.CompanyId] = true;
                        comp.push(el);
                    }

                    if (!recptdet[el.BoxConNo]) {
                        recptdet[el.BoxConNo] = true;
                        recpt.push(el);
                    }

                    if (!orddet[el.OrderNo]) {
                        orddet[el.OrderNo] = true;
                        ord.push(el);
                    }

                    if (!stodet[el.StoreId]) {
                        stodet[el.StoreId] = true;
                        sto.push(el);
                    }


                });

                $(ddlMCompany).empty();
                $(ddlMEntryNo).empty();
                $(ddlMStore).empty();
                $(ddlMBuyOrderNo).empty();


                $(ddlMCompany).append($('<option/>').val('0').text('--Select Company--'));
                $.each(comp, function () {
                    $(ddlMCompany).append($('<option></option>').val(this.CompanyId).text(this.Company));
                });

                $(ddlMEntryNo).append($('<option/>').val('0').text('--Select Entry No--'));
                $.each(recpt, function () {
                    $(ddlMEntryNo).append($('<option></option>').text(this.BoxConNo));
                });


                $(ddlMStore).append($('<option/>').val('0').text('--Select Store Name--'));
                $.each(sto, function () {
                    $(ddlMStore).append($('<option></option>').val(this.StoreId).text(this.Store));
                });

                $(ddlMBuyOrderNo).append($('<option/>').val('0').text('--Select Order No--'));
                $.each(ord, function () {
                    $(ddlMBuyOrderNo).append($('<option></option>').text(this.OrderNo));
                });




                LoadMaingrid();
            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadMaingrid() {
    debugger;


    var OrdNo = "";
    var ONo = $('select#ddlMBuyOrderNo option:selected').val();

    if (ONo == 0 || ONo == undefined) {
        OrdNo == "";
    }
    else {

        OrdNo = $('select#ddlMBuyOrderNo option:selected').val();
    }

    var RecNo = "";
    var RNo = $('select#ddlMEntryNo option:selected').val();

    if (RNo == 0 || RNo == undefined) {
        RecNo == "";
    }
    else {

        RecNo = $('select#ddlMEntryNo option:selected').val();
    }




    var CompId = $('#ddlMCompany').val();
    if (CompId == null || CompId == "0") {
        CompId = 0;
    }

    var StoreId = $('#ddlMStore').val();
    if (StoreId == null || StoreId == "0") {
        StoreId = 0;
    }

    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var BoxMasId = 0;
    $.ajax({
        url: "/BoxConversion/LoadMaingrid",
        data: JSON.stringify({ CompanyId: CompId, StoreId: StoreId, BoxConNo: RecNo, OrderNo: OrdNo, FromDate: FDate, ToDate: TDate, BoxConMasId: BoxMasId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");
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
                         { title: "BoxMasid", "visible": false },
                         { title: "Entry No" },
                         { title: "Entry Date" },
                         { title: "Order No" },
                          { title: "Action" },


                ]

            });


            var table = $('#tblmaindetails').DataTable();
            $("#tblmaindetails tr").click(function () {
                var selected = $(this).hasClass("selected");
                $("#tblmaindetails tr").removeClass("selected");
                if (!selected)
                    $(this).addClass("selected");
            });

        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function getbyID(masid) {
    debugger;
    var OrdNo = "";
    var ONo = $('select#ddlMBuyOrderNo option:selected').val();

    if (ONo == 0 || ONo == undefined) {
        OrdNo == "";
    }
    else {

        OrdNo = $('select#ddlMBuyOrderNo option:selected').val();
    }

    var RecNo = "";
    var RNo = $('select#ddlMEntryNo option:selected').val();

    if (RNo == 0 || RNo == undefined) {
        RecNo == "";
    }
    else {

        RecNo = $('select#ddlMEntryNo option:selected').val();
    }


    var CompId = $('#ddlMCompany').val();
    if (CompId == null || CompId == "0") {
        CompId = 0;
    }

    var StoreId = $('#ddlMStore').val();
    if (StoreId == null || StoreId == "0") {
        StoreId = 0;
    }

    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var BoxMasId = masid;

    $.ajax({
        url: "/BoxConversion/LoadMaingriddet",
        data: JSON.stringify({ CompanyId: CompId, StoreId: StoreId, BoxConNo: RecNo, OrderNo: OrdNo, FromDate: FDate, ToDate: TDate, BoxConMasId: BoxMasId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;


            $('#myModal').show();
            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnDel').hide();
            $('#btnAdd').hide();
            var obj = json.Value;

            $('#txtEntryDate').val(moment(obj[0].BoxConDate).format("DD/MM/YYYY"));
            $('#txtDcDate').val(moment(obj[0].BoxConDcDate).format("DD/MM/YYYY"));
            $('#txtEntryNo').val(obj[0].BoxConNo);
            $('#ddlMSMMainStore').val(obj[0].StoreId);
            $('#ddlSknNo').val(obj[0].SKUMasID);

            var otype = obj[0].OType;
            GBoxMasId = obj[0].BoxConMasId;

            if (otype == 'B') {
                $('input:radio[name="optwrkord"][value="B"]').prop('checked', true);

                $('#ddlMOrderno').val(obj[0].BMasId);
                $('#ddlMRefno').val(obj[0].BMasId);
            }
            else if (protype == 'S') {

                $('input:radio[name="optwrkord"][value="S"]').prop('checked', true);
                $('#ddlMOrderno').val(obj[0].BMasId);
                $('#ddlMRefno').val(obj[0].BMasId);
            }

            $("#ddlMOrderno").prop("disabled", true);
            $("#ddlMRefno").prop("disabled", true);
            $("#ddlSknNo").prop("disabled", true);

            LoadEditItm(BoxMasId);
            LoadStockEditDetails(BoxMasId);

        },



        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadEditItm(MasID) {
    debugger;

    $.ajax({
        url: "/BoxConversion/LoaditmEditgrid",
        data: JSON.stringify({ BoxConMasId: MasID }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;

            ItmList = result.Value;
            LoadItmtab(ItmList);
            GEditBoxQty = ItmList[0].BoxQty;

        }

    });
}

function LoadStockEditDetails(MasID) {
    debugger;

    $.ajax({
        url: "/BoxConversion/LoaditmEditstockgrid",
        data: JSON.stringify({ BoxConMasId: MasID }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;

            SItmList = result.Value;

            $.each(SItmList, function () {
                //if (this.ItemStockId == StyId) {
                this.BoxQty = GEditBoxQty;
                //}
            });

            LoadSItmtab(SItmList);

        }

    });
}


function ChkUpdate() {

    debugger;

    var res = validate();
    if (res == false) {
        return false;
    }


    if (ItmList.length == 0) {
        //alert("Please Enter the Item Details..");
        var msg = 'Please Enter the Item Details...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        return true;
    }
    var opchk = [];
    for (var y = 0; y < ItmList.length; y++) {
        if (ItmList[y].BoxQty > 0) {
            opchk.push(ItmList[y]);
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
    if (SItmList.length == 0) {
        //alert("Please Enter the Stock Details..");
        var msg = 'Please Enter the Stock Details...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        return true;
    }

    var TPQty = $('#txtTotPcsQty').val();
    var TAQty = $('#txtTotAloQty').val();

    if (parseFloat(TPQty) != parseFloat(TAQty)) {
        //alert("Please Check TotBoxQty and TotAllotedQty Should be Equal..");
        var msg = 'Please Check TotBox quantity and Total Alloted quantity Should be Equal...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        return true;
    }

    var otype = $('input[name="OrdType"]:checked').attr('value');


    var objPurSubmit = {

        CompanyId: DCompid,
        BoxConNo: $('#txtEntryNo').val(),
        BoxConMasId: GBoxMasId,
        BoxConDate: $('#txtEntryDate').val(),
        OrderNo: $('#ddlMOrderno option:selected').text(),
        StoreId: $('#ddlMSMMainStore').val(),
        CreatedBy: Guserid,
        Remarks: $('#txtRemark').val(),
        OType: otype,
        BoxRate: GBoxRate,
        SKUMasID: $('#ddlSknNo').val(),
        SKUNo: $('#ddlSknNo option:selected').text(),
        BoxConDet: ItmList,
        BoxConStock: SItmList

    };
    debugger;
    $("#btnAdd").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/BoxConversion/Update",
        data: JSON.stringify(objPurSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.Value == true) {

                //alert("Data Updated Sucessfully");
                window.location.href = "/BoxConversion/BoxConversionIndex";
                var msg = 'Data Updated Sucessfully...';
                var flg = 1;
                var mod = 0;
                var ur = "/BoxConversion/BoxConversionIndex";
                AlartMessage(msg, flg, mod, ur);
            } else {

                window.location.href = "/Error/Index";


            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function getDeleteID(masid) {
    debugger;
    var OrdNo = "";
    var ONo = $('select#ddlMBuyOrderNo option:selected').val();

    if (ONo == 0 || ONo == undefined) {
        OrdNo == "";
    }
    else {

        OrdNo = $('select#ddlMBuyOrderNo option:selected').val();
    }

    var RecNo = "";
    var RNo = $('select#ddlMEntryNo option:selected').val();

    if (RNo == 0 || RNo == undefined) {
        RecNo == "";
    }
    else {

        RecNo = $('select#ddlMEntryNo option:selected').val();
    }


    var CompId = $('#ddlMCompany').val();
    if (CompId == null || CompId == "0") {
        CompId = 0;
    }

    var StoreId = $('#ddlMStore').val();
    if (StoreId == null || StoreId == "0") {
        StoreId = 0;
    }

    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var BoxMasId = masid;

    $.ajax({
        url: "/BoxConversion/LoadMaingriddet",
        data: JSON.stringify({ CompanyId: CompId, StoreId: StoreId, BoxConNo: RecNo, OrderNo: OrdNo, FromDate: FDate, ToDate: TDate, BoxConMasId: BoxMasId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;


            $('#myModal').show();
            $('#myModal').modal('show');
            $('#btnUpdate').hide();
            $('#btnDel').show();
            $('#btnAdd').hide();
            var obj = json.Value;

            $('#txtEntryDate').val(moment(obj[0].BoxConDate).format("DD/MM/YYYY"));
            $('#txtDcDate').val(moment(obj[0].BoxConDcDate).format("DD/MM/YYYY"));
            $('#txtEntryNo').val(obj[0].BoxConNo);
            $('#ddlMSMMainStore').val(obj[0].StoreId);
            $('#ddlSknNo').val(obj[0].SKUMasID);

            var otype = obj[0].OType;
            GBoxMasId = obj[0].BoxConMasId;

            if (otype == 'B') {
                $('input:radio[name="optwrkord"][value="B"]').prop('checked', true);

                $('#ddlMOrderno').val(obj[0].BMasId);
                $('#ddlMRefno').val(obj[0].BMasId);
            }
            else if (protype == 'S') {

                $('input:radio[name="optwrkord"][value="S"]').prop('checked', true);
                $('#ddlMOrderno').val(obj[0].BMasId);
                $('#ddlMRefno').val(obj[0].BMasId);
            }

            $("#ddlMOrderno").prop("disabled", true);
            $("#ddlMRefno").prop("disabled", true);
            $("#ddlSknNo").prop("disabled", true);

            LoadEditItm(BoxMasId);
            LoadStockEditDetails(BoxMasId);

        },



        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function ChkDelete() {

    debugger;

    var res = validate();
    if (res == false) {
        return false;
    }


    if (ItmList.length == 0) {
        //alert("Please Enter the Item Details..");
        var msg = 'Please Enter the Item Details...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        return true;
    }
    var opchk = [];
    for (var y = 0; y < ItmList.length; y++) {
        if (ItmList[y].BoxQty > 0) {
            opchk.push(ItmList[y]);
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
    if (SItmList.length == 0) {
        //alert("Please Enter the Stock Details..");
        var msg = 'Please Enter the Stock Details...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        return true;
    }

    var TPQty = $('#txtTotPcsQty').val();
    var TAQty = $('#txtTotAloQty').val();

    if (parseFloat(TPQty) != parseFloat(TAQty)) {
        //alert("Please Check TotBoxQty and TotAllotedQty Should be Equal..");
        var msg = "Please Check Total Box Quantity and Total Alloted quantity Should be Equal..";
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        return true;
    }

    var otype = $('input[name="OrdType"]:checked').attr('value');


    var objPurSubmit = {

        CompanyId: DCompid,
        BoxConNo: $('#txtEntryNo').val(),
        BoxConMasId: GBoxMasId,
        BoxConDate: $('#txtEntryDate').val(),
        OrderNo: $('#ddlMOrderno option:selected').text(),
        StoreId: $('#ddlMSMMainStore').val(),
        CreatedBy: Guserid,
        Remarks: $('#txtRemark').val(),
        OType: otype,
        SKUMasID: $('#ddlSknNo').val(),
        SKUNo: $('#ddlSknNo option:selected').text(),
        BoxRate: GBoxRate,
        BoxConDet: ItmList,
        BoxConStock: SItmList

    };
    debugger;
    $("#btnAdd").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/BoxConversion/Delete",
        data: JSON.stringify(objPurSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.Value == true) {

                //alert("Data Deleted Sucessfully");
                //window.location.href = "/BoxConversion/BoxConversionIndex";
                var msg = 'Data Deleted Sucessfully...';
                var flg = 2;
                var mod = 0;
                var ur = "/BoxConversion/BoxConversionIndex";
                AlartMessage(msg, flg, mod, ur);
            } else {

                window.location.href = "/Error/Index";


            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function CMainlist() {
    $('#tblmaindetails').DataTable().destroy();
    LoadMaingrid();
}