var PuMasId = 0;
var Mode = 0;
var ItemList = [];
var OrderList = [];
var OrderListSave = [];
var CompId = 0;
var index = 0;
var ind = 0;
var ItemType = 0;
var Userid = 0;
var UserName = 0;
var Guserid = 0;
$(document).ready(function () {
    debugger;
    Guserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    var qrStr = window.location.search;
    var spQrStr = qrStr.substring(1);
    var arrQrStr = new Array();
    var arr = spQrStr.split('?');

    for (var i = 0; i < arr.length; i++) {
        var queryvalue = arr[i].split('=');
    }

    PurMasId = queryvalue[1];
    //ItemType = queryvalue[5];
    Mode = queryvalue[5];

    if (Mode == 0) {

        LoadCancelDetails(PurMasId);
        LoadCancelItemDetails(PurMasId);
        var ItmId = 0;
        var ClrId = 0;
        var SzId = 0;
        var PUId = 0;
        LoadCancelOrderSaveDetails(PurMasId, ItmId, ClrId, SzId, PUId);


    }

    if (Mode == 1 || Mode == 2) {

        LoadCancelEditDetails(PurMasId);
        LoadCancelItemEditDetails(PurMasId);
        LoadCancelOrderSaveEditDetails(PurMasId, ItmId, ClrId, SzId, PUId);


    }


    if (Mode == 0) {
        $('#Add').show();
        $('#Update').hide();
        $('#Delete').hide();
    } else if (Mode == 1) {
        $('#Update').show();
        $('#Add').hide();
        $('#Delete').hide();
    }
    else if (Mode == 2) {
        $('#Add').hide();
        $('#Update').hide();
        $('#Delete').show();
    }
    getDate();
})

$(document).ready(function () {
    $("#tblEntryCanItemdetails ").dataTable().find("tbody").on('click', 'tr', function () {
        index = (this.rowIndex) - 1;
    });
});


$(document).ready(function () {
    $("#tblEntryCanOrderdetails ").dataTable().find("tbody").on('click', 'tr', function () {
        ind = (this.rowIndex) - 1;
    });
});
var table, column, compId, Docum;

function GenerateNumber(table, column, compId, Docum) {

    debugger;

    table = "Pur_Cancel_Mas",
       column = "CancelNo",
       compId = CompId,
       Docum = 'PURCHASE ORDER CANCELLATION'

    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $('#txtCancelNo').val(result.Value);
        }
    });
}

function getDate() {

    //var todaydate = new Date();
    //var day = todaydate.getDate();
    //var Pmonth = todaydate.getMonth() - 2;
    //var Cmonth = todaydate.getMonth() + 1;
    //var year = todaydate.getFullYear();
    //var datestring = Pmonth + "/" + day + "/" + year;
    //var Fdatestring = Cmonth + "/" + day + "/" + year;

    //var day = new Date(),
    //    year = ((day.getMonth() - 2) < 0) ? (day.getFullYear() - 1) : day.getFullYear(),
    //    month = ((day.getMonth() - 2) < 0) ? (12 + (day.getMonth() - 2)) : (day.getMonth() + 1),
    //    date = month + '/' + day.getDate() + '/' + year;
    //$('#txtPurDate').val(date);
    //$('#txtCancelDate').val(date);


    //var todaydate = new Date();
    //var day = todaydate.getDate();
    //var Pmonth = todaydate.getMonth() - 2;
    //var Cmonth = todaydate.getMonth() + 1;
    //var year = todaydate.getFullYear();
    //var datestring = Pmonth + "/" + day + "/" + year;
    //var Fdatestring = day + "/" + Cmonth + "/" + year;
    //Reqdate = Fdatestring;
    //var day = new Date(),
    //    year = ((day.getMonth() - 2) < 0) ? (day.getFullYear() - 1) : day.getFullYear(),
    //    month = ((day.getMonth() - 2) < 0) ? (12 + (day.getMonth() - 2)) : (day.getMonth() + 1),
    //    date = month + '/' + day.getDate() + '/' + year;


    //$('#txtPurDate').val(date);
    //$('#txtCancelDate').val(date);

    var todaydate = new Date();
    var day = todaydate.getDate();
    var Pmonth = todaydate.getMonth() - 2;
    var Cmonth = todaydate.getMonth() + 1;
    var year = todaydate.getFullYear();
    var datestring = Pmonth + "/" + day + "/" + year;
    var Fdatestring = day + "/" + Cmonth + "/" + year;
    Reqdate = Fdatestring;
    var day = new Date(),
        year = ((day.getMonth() - 2) < 0) ? (day.getFullYear() - 1) : day.getFullYear(),
        month = ((day.getMonth() - 2) < 0) ? (12 + (day.getMonth() - 2)) : (day.getMonth() + 1),
        date = month + '/' + day.getDate() + '/' + year;


    $('#txtCancelDate').val(Fdatestring);
    $('#txtPurDate').val(Fdatestring);


}

function LoadCancelDetails(PurMasId) {



    $.ajax({
        url: "/PurchaseCancel/GetCancelEntryDetails",
        data: JSON.stringify({ pur_ord_id: PurMasId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            debugger;
            if (obj != undefined) {


                $('#txtCompId').val(obj[0]["companyid"]);
                $('#txtSupplier').val(obj[0]["Supplier"]);
                $('#txtPurOrdNo').val(obj[0]["pur_ord_no"]);
                $('#txtEmpCanId').val(obj[0]["CreatedBy"]);
                $('#txtCancelledBy').val(obj[0]["CEmpName"]);
                $('#txtPurDate').val(moment(obj.orddate).format('DD/MM/YYYY'));

                CompId = obj[0]["companyid"];

                if (Mode == 0) {
                    GenerateNumber();
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


function LoadCancelEditDetails(PurMasId) {



    $.ajax({
        url: "/PurchaseCancel/GetCancelEntryEditDetails",
        data: JSON.stringify({ pur_ord_id: PurMasId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            debugger;
            if (obj != undefined) {


                $('#txtCompId').val(obj[0]["companyid"]);
                $('#txtSupplier').val(obj[0]["Supplier"]);
                $('#txtPurOrdNo').val(obj[0]["pur_ord_no"]);
                $('#txtEmpCanId').val(obj[0]["CreatedBy"]);
                $('#txtCancelledBy').val(obj[0]["CEmpName"]);
                $('#txtCancelNo').val(obj[0]["CancelNo"]);
                $('#txtCancelDate').val(moment(obj.CancelDate).format('DD/MM/YYYY'));
                $('#txtPurDate').val(moment(obj.orddate).format('DD/MM/YYYY'));
                $('#txtPurCanId').val(obj[0]["CancelID"]);
                $('#txtRemarks').val(obj[0]["remarks"]);
                CompId = obj[0]["companyid"];

            }
            else {

            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}


function LoadCancelItemDetails(PurMasId) {
    debugger;

    $.ajax({
        url: "/PurchaseCancel/GetCancelEntryItemDetails",
        data: JSON.stringify({ pur_ord_id: PurMasId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            ItemList = result;
            loadCancelItemTable(ItemList);


            var ItmId = ItemList[0].ItemID;
            var ClrId = ItemList[0].ColorID;
            var SzId = ItemList[0].SizeID;
            var UomId = ItemList[0].PurUomId;

            LoadCancelOrderDetails(PurMasId, ItmId, ClrId, SzId, UomId);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadCancelItemEditDetails(PurMasId) {
    debugger;

    $.ajax({
        url: "/PurchaseCancel/GetCancelEntryItemEditDetails",
        data: JSON.stringify({ pur_ord_id: PurMasId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            ItemList = result;
            loadCancelItemTable(ItemList);


            var ItmId = ItemList[0].ItemID;
            var ClrId = ItemList[0].ColorID;
            var SzId = ItemList[0].SizeID;
            var UomId = ItemList[0].PurUomId;

            LoadCancelOrderEditDetails(PurMasId, ItmId, ClrId, SzId, UomId);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadCancelOrderDetails(PurMasId, ItmId, ClrId, SzId, UomId) {

    $.ajax({
        url: "/PurchaseCancel/GetCancelEntryOrderDetails",
        data: JSON.stringify({ pur_ord_id: PurMasId, ItemID: ItmId, ColorID: ClrId, SizeID: SzId, PurUomId: UomId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            OrderList = result;
            loadCancelOrderTable(OrderList);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadCancelOrderEditDetails(PurMasId, ItmId, ClrId, SzId, UomId) {

    $.ajax({
        url: "/PurchaseCancel/GetCancelEntryOrderEditDetails",
        data: JSON.stringify({ pur_ord_id: PurMasId, ItemID: ItmId, ColorID: ClrId, SizeID: SzId, PurUomId: UomId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            OrderList = result;
            loadCancelOrderTable(OrderList);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadCancelOrderSaveDetails(PurMasId, ItmId, ClrId, SzId, UomId) {

    $.ajax({
        url: "/PurchaseCancel/GetCancelEntryOrderDetails",
        data: JSON.stringify({ pur_ord_id: PurMasId, ItemID: ItmId, ColorID: ClrId, SizeID: SzId, PurUomId: UomId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            OrderListSave = result;
            loadCancelOrderTableSave(OrderListSave);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadCancelOrderSaveEditDetails(PurMasId, ItmId, ClrId, SzId, UomId) {

    $.ajax({
        url: "/PurchaseCancel/GetCancelEntryOrderEditDetails",
        data: JSON.stringify({ pur_ord_id: PurMasId, ItemID: ItmId, ColorID: ClrId, SizeID: SzId, PurUomId: UomId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            OrderListSave = result;
            loadCancelOrderTableSave(OrderListSave);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function loadCancelItemTable(ItemList) {

    $('#tblEntryCanItemdetails').DataTable().destroy();
    debugger;

    var table = $('#tblEntryCanItemdetails').DataTable({
        // "order": [[1, "asc"]],
        data: ItemList,
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

            { title: "PurOrdDetId", data: "Pur_Ord_DetId", "visible": false },
             { title: "CancelId", data: "CancelId", "visible": false },
            { title: "CancelDetId", data: "CancelDetId", "visible": false },
            { title: "Item", data: "Item" },
            { title: "Color", data: "Color" },
            { title: "Size", data: "Size" },
            { title: "Pur Unit", data: "Unit" },
            { title: "Ord Bal", data: "OrdBal" },
            {
                title: "Can Qty", data: "Cancel_Qty",
                render: function (data) {

                    return '<input type="text" id="txtCQty" class="editor-active"  style="width: 50px;text-align: center;"  value=' + data + ' onkeyup="calcQty(this.value);">';

                },
            },

             { title: "ItemId", data: "ItemID", "visible": false },
             { title: "ColorId", data: "ColorID", "visible": false },
             { title: "SizeId", data: "SizeID", "visible": false },
             { title: "PurUomId", data: "PurUomId", "visible": false },
                 //{
                 //    title: "ACTION", "mDataProp": null,
                 //    "sDefaultContent": '<div style="display:inline-flex;"><button type="button" data-toggle="tooltip" data-placement="top" title="View Item" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnOrdview btn btn-round btn-info"> <i class="fa fa-eye"></i> </button></div>'
                 //},
        ]
    });

    var table = $('#tblEntryCanItemdetails').DataTable();
    $("#tblEntryCanItemdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblEntryCanItemdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}

function loadCancelOrderTable(OrderList) {

    $('#tblEntryCanOrderdetails').DataTable().destroy();
    debugger;

    var table = $('#tblEntryCanOrderdetails').DataTable({
        //"order": [[1, "asc"]],
        data: OrderList,
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

            { title: "PurOrdDetId", data: "pur_ord_Detid", "visible": false },
             { title: "CancelId", data: "CancelId", "visible": false },
                  { title: "CancelDetId", data: "CancelDetId", "visible": false },
                     { title: "CancelOrdId", data: "CancelOrdId", "visible": false },
            { title: "Order No", data: "OrderNo" },
            { title: "Ref No", data: "ORefNo" },
            { title: "Style", data: "OStyle" },
            { title: "Ord Qty", data: "quantity" },
            {
                title: "Can Qty", data: "Cancel_Qty",
                render: function (data) {

                    return '<input type="text" id="txtCsepQty" class="editor-active"  style="width: 50px;text-align: center;"  value=' + data + ' onkeyup="calcsepquan(this.value);">';

                },
            },

             { title: "StyleId", data: "Styleid", "visible": false },
             { title: "PurOrdBuyId", data: "Pur_Ord_BuyJobid", "visible": false },
              { title: "ItemId", data: "ItemID", "visible": false },
             { title: "ColorId", data: "ColorID", "visible": false },
             { title: "SizeId", data: "SizeID", "visible": false },
             { title: "PurUomId", data: "PurUomId", "visible": false }

                 //{
                 //    title: "ACTION", "mDataProp": null,
                 //    "sDefaultContent": '<div style="display:inline-flex;"><button type="button" data-toggle="tooltip" data-placement="top" title="View Item" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnOrd1view btn btn-round btn-info"> <i class="fa fa-eye"></i> </button></div>'
                 //},
        ]
    });

    var table = $('#tblEntryCanOrderdetails').DataTable();
    $("#tblEntryCanOrderdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblEntryCanOrderdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}

$(document).on('click', '.btnOrdview', function () {
    debugger;

    rowindex = $(this).closest('tr').index();
    var curentro1 = ItemList.slice(rowindex);

    var ItmId = curentro1[0]['ItemID'];
    var ClrId = curentro1[0]['ColorID'];
    var SzId = curentro1[0]['SizeID'];
    var PUId = curentro1[0]['PurUomId'];


    //LoadCancelOrderDetails(PurMasId, ItmId, ClrId, SzId, PUId);

    if (Mode == 0) {
        var colorempty = [];
        colorempty = OrderListSave;

        colorempty = $.grep(colorempty, function (v) {
            return (v.ItemID === ItmId && v.ColorID === ClrId && v.SizeID === SzId && v.PurUomId === PUId);
        });

        loadCancelOrderTable(colorempty);

        OrderList = [];
        OrderList = colorempty;
    }
    //LoadCancelOrderDetails(PurMasId, ItmId, ClrId, SzId, PUId);

    if (Mode == 1) {
        var colorempty = [];
        colorempty = OrderListSave;

        colorempty = $.grep(colorempty, function (v) {
            return (v.ItemID === ItmId && v.ColorID === ClrId && v.SizeID === SzId && v.PurUomId === PUId);
        });

        loadCancelOrderTable(colorempty);
        OrderList = [];
        OrderList = colorempty;
    }



});


function calcsepquan(value) {
    debugger;

    debugger;
    ind;
    var cqty = value;
    var currentrowoftcpi = OrderList.slice(ind);
    var pid = currentrowoftcpi[0].Pur_Ord_BuyJobid;
    var itmid = currentrowoftcpi[0].ItemID;
    var colorid = currentrowoftcpi[0].ColorID;
    var sizeid = currentrowoftcpi[0].SizeID;
    // var uomid = currentrowoftcpi[0].OUomid;
    var balq = currentrowoftcpi[0].quantity;
    var pdetid = currentrowoftcpi[0].pur_ord_Detid;


    $.each(ItemList, function () {
        if (this.Pur_Ord_DetId == pdetid) {
            var t = this.OrdBal;

            if (cqty > t) {
                //alert("Cancel are not greater then Order Bal Qty..");
                var msg = 'Cancel are not greater then Order Bal quantity...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);

                $.each(OrderListSave, function () {
                    if (this.pur_ord_Detid == pdetid) {
                        this.Cancel_Qty = 0;
                    }
                });

                $.each(OrderList, function () {
                    if (this.pur_ord_Detid == pdetid) {
                        this.Cancel_Qty = 0;
                    }
                });

                loadCancelOrderTableSave(OrderListSave);
                loadCancelOrderTable(OrderList);
                return true;

            } else {
                $.each(OrderListSave, function () {
                    if (this.Pur_Ord_BuyJobid == pid) {


                        if (balq >= value) {
                            this.Cancel_Qty = value;
                        }
                        else {
                            var t = value - balq;
                            this.Cancel_Qty = balq;
                        }

                    }
                });

                $.each(OrderList, function () {
                    if (this.Pur_Ord_BuyJobid == pid) {

                        if (balq >= value) {
                            this.Cancel_Qty = value;
                        }
                        else {
                            var t = value - balq;
                            this.Cancel_Qty = balq;
                        }

                    }
                });




                var totalamnt = 0;

                for (var e = 0; e < OrderList.length; e++) {
                    var amount = OrderList[e].Cancel_Qty;
                    totalamnt = totalamnt + parseFloat(amount);
                }
                $.each(ItemList, function () {
                    if (this.ItemID == itmid && this.SizeID == sizeid && this.ColorID == colorid) {
                        //this.quantity = 0;

                        this.Cancel_Qty = totalamnt;
                        //}


                    }
                });


                loadCancelOrderTableSave(OrderListSave);
                loadCancelOrderTable(OrderList);
                loadCancelItemTable(ItemList);
            }
           

        }
    });


    //$.each(OrderListSave, function () {
    //    if (this.Pur_Ord_BuyJobid == pid) {


    //        if (balq >= value) {
    //            this.Cancel_Qty = value;
    //        }
    //        else {
    //            var t = value - balq;
    //            this.Cancel_Qty = balq;
    //        }

    //    }
    //});

    //$.each(OrderList, function () {
    //    if (this.Pur_Ord_BuyJobid == pid) {

    //        if (balq >= value) {
    //            this.Cancel_Qty = value;
    //        }
    //        else {
    //            var t = value - balq;
    //            this.Cancel_Qty = balq;
    //        }

    //    }
    //});




    //var totalamnt = 0;

    //for (var e = 0; e < OrderList.length; e++) {
    //    var amount = OrderList[e].Cancel_Qty;
    //    totalamnt = totalamnt + parseFloat(amount);
    //}
    //$.each(ItemList, function () {
    //    if (this.ItemID == itmid && this.SizeID == sizeid && this.ColorID == colorid) {
    //        //this.quantity = 0;

    //        this.Cancel_Qty = totalamnt;
    //        //}


    //    }
    //});


    //loadCancelOrderTableSave(OrderListSave);
    //loadCancelOrderTable(OrderList);
    //loadCancelItemTable(ItemList);
}
function calcQty(Val) {

    debugger;

    index;

    var currentrowoftcpi = ItemList.slice(index);

    var CQty = currentrowoftcpi[0].OrdBal;
    var IId = currentrowoftcpi[0].ItemID;
    var CId = currentrowoftcpi[0].ColorID;
    var SId = currentrowoftcpi[0].SizeID;
    var PUId = currentrowoftcpi[0].PurUomId;



    var ratecal = Val;
    var res = Val;

    if (ratecal > CQty) {
        //alert("CancelQty Should Not Greater then OrderBalanceQty..");
        var msg = 'Cancel quantity Should Not Greater then Order Balance quantity...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);

        //finalresult = res.toFixed(2);
        $.each(ItemList, function () {
            if (this.ItemID == IId && this.ColorID == CId && this.SizeID == SId && this.PurUomId == PUId) {
                this.Cancel_Qty = 0;

            }
        });

        loadCancelItemTable(ItemList);
        return true;
    }


    //finalresult = res.toFixed(2);
    $.each(ItemList, function () {
        if (this.ItemID == IId && this.ColorID == CId && this.SizeID == SId && this.PurUomId == PUId) {
            this.Cancel_Qty = Val;

        }
    });




    loadCancelItemTable(ItemList);





    ///Load Save Order Table
    //finalresult = res.toFixed(2);
    //$.each(OrderListSave, function () {
    //    if (this.ItemID == IId && this.ColorID == CId && this.SizeID == SId && this.PurUomId == PUId) {
    //        this.Cancel_Qty = res;

    //    }
    //});

    //loadCancelOrderTableSave(OrderListSave);


    var pid = [];
    var bal = [];
    var qty = [];
    for (var t = 0; t < OrderListSave.length; t++) {
        if (OrderListSave[t].ItemID == IId && OrderListSave[t].ColorID == CId && OrderListSave[t].SizeID == SId) {
            pid.push(OrderListSave[t].Pur_Ord_BuyJobid);
            bal.push(OrderListSave[t].quantity);
            qty.push(OrderListSave[t].Cancel_Qty);
        }
    }


    var c = pid.length;
    var t = 0;

    if (Val < bal[0]) {
        qty[0] = Val;
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


    for (var u = 0; u < OrderListSave.length; u++) {
        for (var r = 0; r < pid.length; r++) {
            if (OrderListSave[u].Pur_Ord_BuyJobid == pid[r]) {
                OrderListSave[u].Cancel_Qty = qty[r];
            }
        }
    }

    loadCancelOrderTableSave(OrderListSave);


    for (var u = 0; u < OrderList.length; u++) {
        for (var r = 0; r < pid.length; r++) {
            if (OrderList[u].Pur_Ord_BuyJobid == pid[r]) {
                OrderList[u].Cancel_Qty = qty[r];
            }
        }
    }

    if (Mode == 0) {


        var colorempty = [];
        colorempty = OrderListSave;

        colorempty = $.grep(colorempty, function (v) {
            return (v.ItemID === IId && v.ColorID === CId && v.SizeID === SId && v.PurUomId === PUId);
        });

        loadCancelOrderTable(colorempty);

        //OrderList = [];
        //OrderList = colorempty;

    }


    if (Mode == 1) {


        var colorempty = [];
        colorempty = OrderListSave;

        colorempty = $.grep(colorempty, function (v) {
            return (v.ItemID === IId && v.ColorID === CId && v.SizeID === SId && v.PurUomId === PUId);
        });

        loadCancelOrderTable(colorempty);

    }

    ///





}

function loadCancelOrderTableSave(OrderListSave) {

    $('#tblEntryCanOrderdetailsSave').DataTable().destroy();
    debugger;

    var table = $('#tblEntryCanOrderdetailsSave').DataTable({
        "order": [[1, "asc"]],
        data: OrderListSave,
        //scrollY: 100,
        //scrollCollapse: true,
        //paging: false,
        //fixedColumns: false,
        //select: false,
        //scrollX: "100%",
        //scrollXInner: "100%",
        //scroller: false,
        //"bSort": false,
        columns: [

            { title: "PurOrdDetId", data: "pur_ord_Detid" },
               { title: "CancelId", data: "CancelId" },
                   { title: "CancelDetId", data: "CancelDetId" },
                     { title: "CancelOrdId", data: "CancelOrdId" },
            { title: "Order No", data: "OrderNo" },
            { title: "Ref No", data: "ORefNo" },
            { title: "Style", data: "OStyle" },
            { title: "Ord Qty", data: "quantity" },
            { title: "Can Qty", data: "Cancel_Qty" },

             { title: "StyleId", data: "Styleid", "visible": false },
             { title: "PurOrdBuyId", data: "Pur_Ord_BuyJobid" },
              { title: "ItemId", data: "ItemID" },
             { title: "ColorId", data: "ColorID" },
             { title: "SizeId", data: "SizeID" },
             { title: "PurUomId", data: "PurUomId" },

                 {
                     title: "ACTION", "mDataProp": null,
                     "sDefaultContent": '<div style="display:inline-flex;"><button type="button" data-toggle="tooltip" data-placement="top" title="View Item" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnOrd1view btn btn-round btn-info"> <i class="fa fa-eye"></i> </button></div>'
                 },
        ]
    });

    var table = $('#tblEntryCanOrderdetails').DataTable();
    $("#tblEntryCanOrderdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblEntryCanOrderdetails tr").removeClass("selected");
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


    if (ItemList.length == 0) {
        //alert("Please Enter the Item Details..");
        var msg = 'Please Enter the Item Details...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    if (OrderListSave.length == 0) {
        //alert("Please Enter the Order Details..");
        var msg = 'Please Enter the Order Details...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    var PuMasId = PurMasId;



    var objPurSubmit = {

        pur_ord_id: PuMasId,
        CancelNo: $('#txtCancelNo').val(),
        CancelDate: $('#txtCancelDate').val(),// new Date($('#txtCancelDate').val()),
        remarks: $('#txtRemarks').val(),
        CEmpName: $('#txtEmpCanId').val(),
        PurchaseItemDet: ItemList,
        PurchaseODet: OrderListSave

    };
    debugger;
    $("#Add").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/PurchaseCancel/Add",
        data: JSON.stringify(objPurSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            // window.location.href = "/PurchaseOrderMain/PurchaseOrderMainIndex";


            if (result.Value == true) {

                var Mod = "R"
                var MasId = 0;
                //alert("Data Saved Sucessfully");
                
                AddUserEntryLog('Procurement', 'Purchase Cancel', 'ADD', $("#txtCancelNo").val());

                if (ItemType == "Y") {
                    //window.location.href = "/PurchaseOrderYarnMain/PurchaseOrderYarnMainIndex";
                    var msg = 'Data Saved Sucessfully...';
                    var flg = 1;
                    var md = 0;
                    var url = "/PurchaseOrderYarnMain/PurchaseOrderYarnMainIndex";
                    AlartMessage(msg, flg, md, url);
                } else if (ItemType == "A") {
                    //window.location.href = "/PurchaseOrderTrimsMain/PurchaseOrderTrimsMainIndex";
                    var msg = 'Data Saved Sucessfully...';
                    var flg = 1;
                    var md = 0;
                    var url = "/PurchaseOrderTrimsMain/PurchaseOrderTrimsMainIndex";
                    AlartMessage(msg, flg, md, url);
                } else {
                    //window.location.href = "/PurchaseOrderMain/PurchaseOrderMainIndex";
                    var msg = 'Data Saved Sucessfully...';
                    var flg = 1;
                    var md = 0;
                    var url = "/PurchaseOrderMain/PurchaseOrderMainIndex";
                    AlartMessage(msg, flg, md, url);
                }

            } else {

                window.location.href = "/Error/Index";


            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function Close() {



    window.location.href = "/PurchaseOrderMain/PurchaseOrderMainIndex";
}

function validate() {
    var isValid = true;


    if ($('#txtSupplier').val() == 0) {
        $('#txtSupplier').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtSupplier').css('border-color', 'lightgrey');
    }


    if ($('#txtCancelledBy').val() == 0) {
        $('#txtCancelledBy').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtCancelledBy').css('border-color', 'lightgrey');
    }

    return isValid;
}

function CancelUpdate() {

    debugger;
    var res = validate();
    if (res == false) {
        return false;
    }


    if (ItemList.length == 0) {
        //alert("Please Enter the Item Details..");
        var msg = 'Please Enter the Item Details...';
        var flg = 4;
        var md = 1;
        var url = "";
        AlartMessage(msg, flg, md, url);
        return true;
    }

    if (OrderListSave.length == 0) {
        //alert("Please Enter the Order Details..");
        var msg = 'Please Enter the Order Details...';
        var flg = 4;
        var md = 1;
        var url = "";
        AlartMessage(msg, flg, md, url);
        return true;
    }

    var PuMasId = PurMasId;



    var objPurSubmit = {

        pur_ord_id: PuMasId,
        CancelNo: $('#txtCancelNo').val(),
        CancelDate: $('#txtCancelDate').val(),// new Date($('#txtCancelDate').val()),
        remarks: $('#txtRemarks').val(),
        CEmpName: $('#txtEmpCanId').val(),
        CancelID: $('#txtPurCanId').val(),
        PurchaseItemDet: ItemList,
        PurchaseODet: OrderListSave

    };
    debugger;
    $("#Update").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/PurchaseCancel/Update",
        data: JSON.stringify(objPurSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.Value == true) {

                var Mod = "R"
                var MasId = 0;
                //alert("Data Updated Sucessfully");
                AddUserEntryLog('Procurement', 'Purchase Cancel', 'UPDATE', $("#txtCancelNo").val());

                if (ItemType == "Y") {
                    //window.location.href = "/PurchaseOrderYarnMain/PurchaseOrderYarnMainIndex";
                    var msg = 'Data Updated Sucessfully...';
                    var flg = 1;
                    var md = 0;
                    var url = "/PurchaseOrderYarnMain/PurchaseOrderYarnMainIndex";
                    AlartMessage(msg, flg, md, url);
                } else if (ItemType == "A") {
                    //window.location.href = "/PurchaseOrderTrimsMain/PurchaseOrderTrimsMainIndex";
                    var msg = 'Data Updated Sucessfully...';
                    var flg = 1;
                    var md = 0;
                    var url = "/PurchaseOrderTrimsMain/PurchaseOrderTrimsMainIndex";
                    AlartMessage(msg, flg, md, url);
                } else {
                    //window.location.href = "/PurchaseOrderMain/PurchaseOrderMainIndex";
                    var msg = 'Data Updated Sucessfully...';
                    var flg = 1;
                    var md = 0;
                    var url = "/PurchaseOrderMain/PurchaseOrderMainIndex";
                    AlartMessage(msg, flg, md, url);
                }

            } else {

                window.location.href = "/Error/Index";


            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function CanDelete() {
    debugger;


    var objConPurCDelete = {

        CancelID: $('#txtPurCanId').val(),
        PurchaseItemDet: ItemList,
        PurchaseODet: OrderListSave
    };
    $("#Delete").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/PurchaseCancel/Delete",
        data: JSON.stringify(objConPurCDelete),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == true) {

                var Mod = "R"
                var MasId = 0;
                //alert("Data Deleted Sucessfully");
                AddUserEntryLog('Procurement', 'Purchase Cancel', 'DELETE', $("#txtCancelNo").val());

                if (ItemType == "Y") {
                    //window.location.href = "/PurchaseOrderYarnMain/PurchaseOrderYarnMainIndex";
                    var msg = 'Data Deleted Sucessfully...';
                    var flg = 2;
                    var md = 0;
                    var url = "/PurchaseOrderMain/PurchaseOrderMainIndex";
                    AlartMessage(msg, flg, md, url);
                } else if (ItemType == "A") {
                    //window.location.href = "/PurchaseOrderTrimsMain/PurchaseOrderTrimsMainIndex";
                    var msg = 'Data Deleted Sucessfully...';
                    var flg = 2;
                    var md = 0;
                    var url = "/PurchaseOrderMain/PurchaseOrderMainIndex";
                    AlartMessage(msg, flg, md, url);
                } else {
                    //window.location.href = "/PurchaseOrderMain/PurchaseOrderMainIndex";
                    var msg = 'Data Deleted Sucessfully...';
                    var flg = 2;
                    var md = 0;
                    var url = "/PurchaseOrderMain/PurchaseOrderMainIndex";
                    AlartMessage(msg, flg, md, url);
                }

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


$(document).ready(function () {

    $('#tblEntryCanItemdetails').on('click', 'tr', function (e) {

        debugger;
        var table = $('#tblEntryCanItemdetails').DataTable();
        var row = $(this).closest('tr');
        var data = $('#tblEntryCanItemdetails').dataTable().fnGetData(row);
           
        var table = $('#tblEntryCanItemdetails').DataTable();

        var ItmId = data.ItemID;
        var ClrId = data.ColorID;
        var SzId = data.SizeID;
        var PUId = data.PurUomId;       
           


    if (Mode == 0) {
        var colorempty = [];
        colorempty = OrderListSave;

        colorempty = $.grep(colorempty, function (v) {
            return (v.ItemID === ItmId && v.ColorID === ClrId && v.SizeID === SzId && v.PurUomId === PUId);
        });

        loadCancelOrderTable(colorempty);

        OrderList = [];
        OrderList = colorempty;
    }


    if (Mode == 1) {
        var colorempty = [];
        colorempty = OrderListSave;

        colorempty = $.grep(colorempty, function (v) {
            return (v.ItemID === ItmId && v.ColorID === ClrId && v.SizeID === SzId && v.PurUomId === PUId);
        });

        loadCancelOrderTable(colorempty);
        OrderList = [];
        OrderList = colorempty;
    }

        


    });
    
});