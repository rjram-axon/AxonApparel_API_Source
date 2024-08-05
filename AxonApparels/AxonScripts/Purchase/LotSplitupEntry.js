var Mode = 0;
var TransNoId = 0;
var LotItemList = [];
var LotSplitList = [];
var LotSplitListSave = [];
var index = 0;
var GLSno = 0;
var BalQty = 0;
var ind = 0;
var GStockId = 0;
var GItemId = 0;
var GColorId = 0;
var GSizeId = 0;
var GUomId = 0;
var GStyId = 0;
var GProcId = 0;
var GOrderNo = 0;
var TransId = 0;
var Userid = 0;
var UserName = 0;
var MainFDate = 0;
var Guserid = 0;
$(document).ready(function () {
    debugger;


    Guserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    MainFDate = $("#hdMainFromDate").data('value');

    var qrStr = window.location.search;
    var spQrStr = qrStr.substring(1);
    var arrQrStr = new Array();
    var arr = spQrStr.split('?');

    for (var i = 0; i < arr.length; i++) {
        var queryvalue = arr[i].split('=');
    }

    TransNo = queryvalue[1];
    Mode = queryvalue[3];
    TransId = queryvalue[5];

    if (Mode == 0) {
        LoadLotEntryDetails(TransNo);
        LoadLotItemDetails(TransNo);

        getDate();
    }

    if (Mode == 1 || Mode == 2) {
        var StkId = 0;
        LoadLotEditEntryDetails(TransId);

        LoadLotEditSplitSaveDetails(TransId, StkId);


    }

    if (Mode == 1) {
        $('#Update').show();
        $('#Add').hide();
    } else if (Mode == 0) {
        $('#Add').show();
        $('#Update').hide();
    }
    else if (Mode == 2) {
        $('#Add').hide();
        $('#Update').hide();
        $('#Delete').show();
    }
    $(document).on('keyup', '.calcAmt', function () {
        debugger;

        var table = $('#tblSplitdetails').DataTable();

        var snum = table.row($(this).parents('tr')).data()["LSno"];
        var qty = table.row($(this).parents('tr')).data()["SplQty"];
        var LotNumber = table.row($(this).parents('tr')).data()["LotNo"];   
        table.row($(this).parents('tr')).data()["SplQty"] = $(this).val();
        var val = $(this).val();

        var q = 0;
        for (var d = 0; d < LotItemList.length; d++) {
            if (LotItemList[d].SNo == snum) {
                q = LotItemList[d].BalQty;
            }
        }


        var splqty = [];
        if (LotSplitList.length > 0) {
            for (var g = 0; g < LotSplitList.length; g++) {
                if (LotSplitList[g].LSno == snum) {
                    splqty.push(LotSplitList[g].SplQty);
                }
            }
        }

        var totalamnt = 0;
        for (var e = 0; e < splqty.length; e++) {
            var amount = splqty[e];
            totalamnt = totalamnt + parseFloat(amount);

        }
        if (parseFloat(totalamnt) > parseFloat(q)) {
            //alert('Lot quantity sholud not exceed balance...');
            var msg = 'Lot quantity sholud not exceed balance...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            currentrowof[0].SplQty = qty;

        }
        LotSplitList;
        if (q > totalamnt) {
            for (var d = 0; d < LotItemList.length; d++) {
                if (LotItemList[d].SNo == snum) {
                    LotItemList[d].Quantity = totalamnt;
                }
            }
        }

        loadLotItemTable(LotItemList);
        loadLotSplitTable(LotSplitList);

        if (Mode == 0) {
            LotSplitListObj = LotSplitList;
            loadLotSplitTableSave(LotSplitListObj);
        }
        if (Mode == 1) {
            $.each(LotSplitListSave, function () {
                if (this.LSno == snum && this.LotNo == LotNumber) {


                    this.SplQty = val;


                }
            });

            LotSplitListObj = LotSplitListSave;
            loadLotSplitTableSave(LotSplitListObj);
        }

        var rows = $("#tblSplitdetails").dataTable().fnGetNodes();
        var dtTable = $('#tblSplitdetails').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 2 }).data()[0];
            $('input[id=txtRQty]').each(function () {
                if (sn == snum && $(this).val() == val) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtRQty').val();
                    row.find('#txtRQty').focus().val('').val(num);
                    return true;
                }
            });
        }
    });
});



$(document).ready(function () {
    $("#tblEntryLotItemdetails ").dataTable().find("tbody").on('click', 'tr', function () {
        index = (this.rowIndex) - 1;
    });
});

$(document).ready(function () {
    $("#tblSplitdetails ").dataTable().find("tbody").on('click', 'tr', function () {
        ind = (this.rowIndex) - 1;
    });
});


function getDate() {

    //var todaydate = new Date();
    //var day = todaydate.getDate();
    //var Pmonth = todaydate.getMonth() - 2;
    //var Cmonth = todaydate.getMonth() + 1;
    //var year = todaydate.getFullYear();
    //var datestring = Pmonth + "/" + day + "/" + year;
    //var Fdatestring = day + "/" + Cmonth + "/" + year;

    //var day = new Date(),
    //    year = ((day.getMonth() - 2) < 0) ? (day.getFullYear() - 1) : day.getFullYear(),
    //    month = ((day.getMonth() - 2) < 0) ? (12 + (day.getMonth() - 2)) : (day.getMonth() + 1),
    //    date = month + '/' + day.getDate() + '/' + year;
    //$('#txtEntryDate').val(date);

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


    $('#txtEntryDate').val(Fdatestring);
 
}


function LoadLotEntryDetails(TransNo) {

    if (Mode == 0) {
        var EType = 'A';
    }

    $.ajax({
        url: "/LotsplitupEntry/GetLotEntryDetails",
        data: JSON.stringify({ TransNo: TransNo, EType: EType }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            debugger;
            if (obj != undefined) {


                $('#txtCompany').val(obj[0]["Company"]);
                $('#txtCompanyId').val(obj[0]["Companyid"]);
                $('#txtSupplier').val(obj[0]["Supplier"]);
                $('#txtSupplierId').val(obj[0]["SupplierId"]);
                $('#txtOrderNo').val(obj[0]["OrderNo"]);
                $('#txtOrderRefNo').val(obj[0]["OrderRefNo"]);
                $('#txtTransType').val(obj[0]["TransType"]);
                $('#txtTransNo').val(obj[0]["TransNo"]);

                var CompId = $("#txtCompanyId").val();
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

function LoadLotEditEntryDetails(TransId) {

    if (Mode == 1) {
        var EType = 'E';
    }

    $.ajax({
        url: "/LotsplitupEntry/GetLotEditEntryDetails",
        data: JSON.stringify({ LotSplitMasId: TransId, EType: EType }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            debugger;
            if (obj != undefined) {


                $('#txtCompany').val(obj[0]["Company"]);
                $('#txtCompanyId').val(obj[0]["Companyid"]);
                $('#txtSupplier').val(obj[0]["Supplier"]);
                $('#txtSupplierId').val(obj[0]["SupplierId"]);
                $('#txtOrderNo').val(obj[0]["OrderNo"]);
                $('#txtOrderRefNo').val(obj[0]["OrderRefNo"]);
                $('#txtTransType').val(obj[0]["TransType"]);
                $('#txtTransNo').val(obj[0]["TransNo"]);
                $('#txtEntryDate').val(moment(obj.EntryDate).format('DD/MM/YYYY'));
                $('#txtSplitNo').val(obj[0]["EntryNo"]);
                $('#txtSplitRefNo').val(obj[0]["RefNo"]);

                var CompId = $("#txtCompanyId").val();
                LoadLotEditItemDetails(TransId);
            }
            else {

            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
var table, column, compId, Docum;

function GenerateNumber(table, column, compId, Docum) {

    debugger;
    table = "LotSplitMas",
    column = "EntryNo",
    compId = $('#txtCompanyId').val(),
    Docum = 'LOT SPLIT-UP'

    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $('#txtSplitNo').val(result.Value);
        }
    });
}

function LoadLotItemDetails(TransNo) {
    debugger;
    if (Mode == 0) {
        var EType = 'A';
    }
    $.ajax({
        url: "/LotsplitupEntry/LoadLotItemDetails",
        data: JSON.stringify({ TransNo: TransNo, EType: EType }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            LotItemList = result;
            loadLotItemTable(LotItemList);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadLotEditItemDetails(TransId) {
    debugger;
    if (Mode == 0) {
        var EType = 'E';
    }
    $.ajax({
        url: "/LotsplitupEntry/LoadLotEditItemDetails",
        data: JSON.stringify({ LotSplitMasId: TransId, EType: EType }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            LotItemList = result;
            loadLotItemTable(LotItemList);

            var StkId = LotItemList[0].Stockid;
            LoadLotEditSplitDetails(TransId, StkId)
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}


function LoadLotEditSplitDetails(TransId, StkId) {
    debugger;

    $.ajax({
        url: "/LotsplitupEntry/LoadLotEditSplitDetails",
        data: JSON.stringify({ LotSplitMasId: TransId, Stockid: StkId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            LotSplitList = result;
            loadLotSplitTable(LotSplitList);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadLotEditSplitSaveDetails(TransId, StkId) {
    debugger;

    $.ajax({
        url: "/LotsplitupEntry/LoadLotEditSplitDetails",
        data: JSON.stringify({ LotSplitMasId: TransId, Stockid: StkId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            LotSplitListSave = result;
            loadLotSplitTableSave(LotSplitListSave);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function loadLotItemTable(LotItemList) {

    $('#tblEntryLotItemdetails').DataTable().destroy();
    debugger;

    var table = $('#tblEntryLotItemdetails').DataTable({
        "order": [[1, "asc"]],
        data: LotItemList,
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

             { title: "LotSplitDetId", data: "LotSplitDetid", "visible": false },
            { title: "LotSplitMasId", data: "LotSplitMasid", "visible": false },
            { title: "S.No", data: "SNo" },
            { title: "Order No", data: "Orderno" },
            { title: "Style", data: "Style" },
            { title: "Item", data: "Item" },
            { title: "Color", data: "Color" },
            { title: "Size", data: "Size" },
            { title: "Uom", data: "Uom" },
            { title: "Balance", data: "BalQty" },
            {
                title: "Split Qty", data: "Quantity",
                render: function (data) {

                    return '<input type="text" id="txtOQty" class="form-control"  style="width: 50px;text-align: center;"  value=' + data + ' disabled>';

                },
            },
           { title: "StockId", data: "Stockid", "visible": false },
            { title: "Process", data: "ItemProcess" },
             { title: "ItemId", data: "itemid", "visible": false },
             { title: "ColorId", data: "colorid", "visible": false },
             { title: "SizeId", data: "Sizeid", "visible": false },
             { title: "PUnitId", data: "UomId", "visible": false },
             { title: "StyleId", data: "Styleid", "visible": false },
             { title: "ProcessId", data: "processid", "visible": false },
                 //{
                 //    title: "ACTION", "mDataProp": null,
                 //    "sDefaultContent": '<div style="display:inline-flex;"><button type="button" data-toggle="tooltip" data-placement="top" title="View Item" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnItemview btn btn-round btn-info"> <i class="fa fa-eye"></i> </button></div>'
                 //},
        ]
    });

    var table = $('#tblEntryLotItemdetails').DataTable();
    $("#tblEntryLotItemdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblEntryLotItemdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}


////////////////Lot Add
$(document).ready(function () {


    $('#btnLotadd').click(function () {
        debugger;

        //fnClearLotSptControls();

        LotItemList;
        LotSplitList;


        ////clear the list///

        //var q = 0;
        //for (var d = 0; d < LotSplitList.length; d++) {
        //    if (LotSplitList[d].LSno == GLSno) {
        //        q = LotSplitList[d].BalQty;
        //    } else {
        //        LotSplitList = [];
        //    }
        //}


        ///////////////////


        var q = 0;
        for (var d = 0; d < LotItemList.length; d++) {
            if (LotItemList[d].SNo == GLSno) {
                q = LotItemList[d].BalQty;
            }
        }

        var leng = 0;

        var isAllValid = true;


        debugger;
        if ($('#LotNumber').val() == "0") {
            isAllValid = false;
            $('#LotNumber').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#LotNumber').siblings('span.error').css('visibility', 'hidden');
        }
        if ($('#LotQuantity').val() == "0") {
            isAllValid = false;
            $('#LotQuantity').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#LotQuantity').siblings('span.error').css('visibility', 'hidden');
        }

        if (LotSplitList.length == 0) {
            leng = 1;
        }
        else {
            leng = LotSplitList.length + 1;
        }

        var t = $('#LotQuantity').val();
        if (t > q) {

            //alert('Lot quantity sholud not exceed balance...');
            var msg = 'Lot quantity sholud not exceed balance...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);

            fnClearLotSptControls();
            return true;
        }
        var splqty = [];


        if (isAllValid) {


            debugger;
            var LotSplitListObj = {
                SplQty: $('#LotQuantity').val(),
                LotNo: $('#LotNumber').val(),
                LSno: GLSno,
                Stockid: GStockId,
                itemid: GItemId,
                colorid: GColorId,
                Sizeid: GSizeId,
                UomId: GUomId,
                Styleid: GStyId,
                processid: GProcId,
                Orderno: GOrderNo,
                LotSplitMasid: 0,
                LotSplitDetid: 0,
                Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
            };

            LotSplitList.push(LotSplitListObj);
            LotSplitListSave.push(LotSplitListObj);



            if (LotSplitList.length > 0) {
                for (var g = 0; g < LotSplitList.length; g++) {
                    if (LotSplitList[g].LSno == GLSno) {
                        splqty.push(LotSplitList[g].SplQty);
                    }
                }
            }

            var totalamnt = 0;
            for (var e = 0; e < splqty.length; e++) {
                var amount = splqty[e];
                totalamnt = totalamnt + parseFloat(amount);

            }
            if (parseFloat(totalamnt) > parseFloat(q)) {
                //alert('Lot quantity sholud not exceed balance...');
                var msg = 'Lot quantity sholud not exceed balance...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                LotSplitList.pop(LotSplitListObj);

                fnClearLotSptControls();
                return true;
            }


            for (var d = 0; d < LotItemList.length; d++) {
                if (LotItemList[d].SNo == GLSno) {
                    LotItemList[d].Quantity = totalamnt;
                }
            }
            loadLotItemTable(LotItemList);
            //loadLotSplitTable(LotSplitListObj);
            loadLotSplitTableSave(LotSplitListObj);


            ///Filter////
            var colorempty = [];
            colorempty = LotSplitList;

            colorempty = $.grep(colorempty, function (v) {
                return v.LSno === GLSno;
            });

            loadLotSplitTable(colorempty);
            /////////////


            fnClearLotSptControls();
        }
    });

    $(document).on('click', '.btnlotedit', function () {
        debugger;
        Mode = 1;

        rowindex = $(this).closest('tr').index();

        var currentro12 = LotSplitList.slice(rowindex);

        $('#LotQuantity').val(currentro12[0]['SplQty']);
        $('#LotNumber').val(currentro12[0]['LotNo']);


        $('#btnLotadd').hide();
        $('#btnLotupdate').show();
    });



    $('#btnLotupdate').click(function () {
        debugger;
        var currentrowsel = LotSplitList.slice(rowindex);

        currentrowsel[0]['SplQty'] = $("#LotQuantity").val();
        currentrowsel[0]['LotNo'] = $("#LotNumber").val();


        LotSplitList[rowindex] = currentrowsel[0];

        loadLotSplitTable(LotSplitList);


        var Lotno = currentrowsel[0]['LotNo'];
        var Qty=$("#LotQuantity").val();

        $.each(LotSplitListSave, function (i) {

            if (LotSplitListSave[i].LotNo == Lotno) {

                LotSplitListSave[i].SplQty = Qty;

            }


        });


        $('#btnLotupdate').hide();
        $('#btnLotadd').show();

        if (Mode == 0) {
            fnClearLotSptControls();
        }
        else {
            fnClearLotSptControls();

        }
        Mode = 0;
    });

    $(document).on('click', '.btnlotremove', function () {
        debugger;
        rowindex = $(this).closest('tr').index();

        var currentrowsel = LotSplitList.slice(rowindex);

        currentrowsel[0]['SplQty'] = $("#LotQuantity").val();
        currentrowsel[0]['LotNo'] = $("#LotNumber").val();
        var LotNo = currentrowsel[0]['LotNo'];

        LotSplitList.splice(rowindex, 1);
        document.getElementById("tblSplitdetails").deleteRow(rowindex + 1);


        LotSplitListSave = $.grep(LotSplitListSave, function (v) {
            return (v.LotNo != LotNo);
        });


    });
    //

});

function fnClearLotSptControls() {
    debugger;

    $('#LotNumber').val('');
    $('#LotQuantity').val('');


}
function loadLotSplitTable(LotSplitListObj) {
    debugger;
    $('#tblSplitdetails').DataTable().destroy();

    $('#tblSplitdetails').DataTable({

        data: LotSplitList,
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

                   { title: "Lot Number", data: "LotNo" },

                    {
                        title: "Lot Quantity", data: "SplQty",
                        render: function (data) {

                            return '<input type="text" id="txtRQty" class="calcAmt form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                        },
                    },
                   { title: "Lot S.No", data: "LSno", "visible": false },

                   {
                       title: "ACTION", "mDataProp": null,
                       "sDefaultContent": '<div style="display:inline-flex;"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnlotedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button"data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnlotremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div>'


                   },

        ]
    });
}

function loadLotSplitTableSave(LotSplitListObj) {
    debugger;
    $('#tblSplitdetailsSave').DataTable().destroy();

    $('#tblSplitdetailsSave').DataTable({

        data: LotSplitListSave,

        columns: [
                 { title: "LotSplitDetId", data: "LotSplitDetid" },
            { title: "LotSplitMasId", data: "LotSplitMasid" },
                   { title: "Lot Number", data: "LotNo" },
                    { title: "Lot Quantity", data: "SplQty" },
                   { title: "Lot Sno", data: "LSno" },
                    { title: "Order No", data: "Orderno" },
                     { title: "StockId", data: "Stockid" },
             { title: "ItemId", data: "itemid" },
             { title: "ColorId", data: "colorid" },
             { title: "SizeId", data: "Sizeid" },
             { title: "PUnitId", data: "UomId" },
             { title: "StyleId", data: "Styleid" },
             { title: "ProcessId", data: "processid" },

        ]
    });
}

function calcAmt(val) {
    debugger;
    ind;
    LotItemList;
    LotSplitList;

    var currentrowof = LotSplitList.slice(ind);

    var snum = currentrowof[0].LSno;
    var qty = currentrowof[0].SplQty;
    var LotNumber = currentrowof[0].LotNo;

    currentrowof[0].SplQty = val;

    var q = 0;
    for (var d = 0; d < LotItemList.length; d++) {
        if (LotItemList[d].SNo == snum) {
            q = LotItemList[d].BalQty;
        }
    }


    var splqty = [];
    if (LotSplitList.length > 0) {
        for (var g = 0; g < LotSplitList.length; g++) {
            if (LotSplitList[g].LSno == snum) {
                splqty.push(LotSplitList[g].SplQty);
            }
        }
    }

    var totalamnt = 0;
    for (var e = 0; e < splqty.length; e++) {
        var amount = splqty[e];
        totalamnt = totalamnt + parseFloat(amount);

    }
    if (parseFloat(totalamnt) > parseFloat(q)) {
        //alert('Lot quantity sholud not exceed balance...');
        var msg = 'Lot quantity sholud not exceed balance...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        currentrowof[0].SplQty = qty;

    }
    LotSplitList;
    if (q > totalamnt) {
        for (var d = 0; d < LotItemList.length; d++) {
            if (LotItemList[d].SNo == snum) {
                LotItemList[d].Quantity = totalamnt;
            }
        }
    }

    loadLotItemTable(LotItemList);
    loadLotSplitTable(LotSplitList);

    if (Mode == 0) {
        LotSplitListObj = LotSplitList;
        loadLotSplitTableSave(LotSplitListObj);
    }
    if (Mode == 1) {
        $.each(LotSplitListSave, function () {
            if (this.LSno == snum && this.LotNo == LotNumber) {


                this.SplQty = val;


            }
        });

        LotSplitListObj = LotSplitListSave;
        loadLotSplitTableSave(LotSplitListObj);
    }
}


//$(document).on('click', '.btnItemview', function () {
//    debugger;


//    var table = $('#tblEntryLotItemdetails').DataTable();

//     GLSno = table.row($(this).parents('tr')).data()["SNo"];
//     GStockId = table.row($(this).parents('tr')).data()["Stockid"];
//     GItemId = table.row($(this).parents('tr')).data()["itemid"];
//     GColorId = table.row($(this).parents('tr')).data()["colorid"];
//     GSizeId = table.row($(this).parents('tr')).data()["Sizeid"];
//     GUomId = table.row($(this).parents('tr')).data()["UomId"];
//     GStyId = table.row($(this).parents('tr')).data()["Styleid"];
//     GProcId = table.row($(this).parents('tr')).data()["processid"];
//     GOrderNo = table.row($(this).parents('tr')).data()["Orderno"];

//    if (Mode == 1) {
//        LoadLotEditSplitDetails(TransId, GStockId)
//    }


//    var colorempty = [];
//    colorempty = LotSplitListSave;

//    colorempty = $.grep(colorempty, function (v) {
//        return (v.LSno === GLSno);
//    });

//    LotSplitList = colorempty;

//    loadLotSplitTable(LotSplitList);




//});


$(document).ready(function () {

    $('#tblEntryLotItemdetails').on('click', 'tr', function (e) {
        debugger;

        var table = $('#tblEntryLotItemdetails').DataTable();
        var row = $(this).closest('tr');
        var data = $('#tblEntryLotItemdetails').dataTable().fnGetData(row);
        


        GLSno = data.SNo; //table.row($(this).parents('tr')).data()["SNo"];
        GStockId = data.Stockid; //table.row($(this).parents('tr')).data()["Stockid"];
        GItemId = data.itemid; //table.row($(this).parents('tr')).data()["itemid"];
        GColorId = data.colorid; //table.row($(this).parents('tr')).data()["colorid"];
        GSizeId = data.Sizeid; //table.row($(this).parents('tr')).data()["Sizeid"];
        GUomId = data.UomId; //table.row($(this).parents('tr')).data()["UomId"];
        GStyId = data.Styleid; //table.row($(this).parents('tr')).data()["Styleid"];
        GProcId = data.processid; //table.row($(this).parents('tr')).data()["processid"];
        GOrderNo = data.Orderno; //table.row($(this).parents('tr')).data()["Orderno"];

            //if (Mode == 1) {
            //    LoadLotEditSplitDetails(TransId, GStockId)
            //}


            var colorempty = [];
            colorempty = LotSplitListSave;

            colorempty = $.grep(colorempty, function (v) {
                return (v.LSno === GLSno);
            });

            LotSplitList = colorempty;

            loadLotSplitTable(LotSplitList);


    });
});


function save() {

    debugger;

    var res = validate();
    if (res == false) {
        return false;
    }


    if (LotSplitList.length == 0) {
        //alert("Please Enter the LotSplit Details..");
        var msg = 'Please Enter the LotSplit Details...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }


    var SupId = $('#txtSupplierId').val();

    debugger;
    var oldSplitNo = $('#txtSplitNo').val();

    table = "LotSplitMas",
    column = "EntryNo",
    compId = $('#txtCompanyId').val(),
    Docum = 'LOT SPLIT-UP'

    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var newSplitNo = result.Value;
            if (oldSplitNo != newSplitNo) {
                //alert('Split No has been changed...');
                var msg = 'Split Number has been changed...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                $('#txtSplitNo').val(result.Value);
            }

            var objLotSubmit = {

                Companyid: $('#txtCompanyId').val(),
                SupplierId: SupId,
                TransNo: $('#txtTransNo').val(),
                EntryNo: $('#txtSplitNo').val(),
                EntryDate: $('#txtEntryDate').val(),//new Date($('#txtEntryDate').val()),
                RefNo: $('#txtSplitRefNo').val(),
                SplitType: "O",
                CreatedBy: Guserid,
                LotSplitUpDet: LotSplitListSave

            };
            debugger;
            $("#Add").attr("disabled", true);
            LoadingSymb();
            $.ajax({
                url: "/LotsplitupEntry/Add",
                data: JSON.stringify(objLotSubmit),
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {
                    //alert("Data Saved Sucessfully");
                    //window.location.href = "/LotsplitupMain/LotsplitupMainIndex";

                    if (result.Value == true) {
                        AddUserEntryLog('Procurement', 'Lot SplitUp', 'ADD', $("#txtOrderNo").val());
                        //alert("Data Saved Sucessfully");
                        //window.location.href = "/LotsplitupMain/LotsplitupMainIndex";
                        var msg = 'Data Saved Sucessfully...';
                        var flg = 1;
                        var mod = 0;
                        var url = "/LotsplitupMain/LotsplitupMainIndex";
                        AlartMessage(msg, flg, mod, url);
                    } else {

                        window.location.href = "/Error/Index";

                    }


                },
                error: function (errormessage) {
                    alert(errormessage.responseText);
                }
            });
        }
    });
}

//Valdidation using jquery
function validate() {
    var isValid = true;


    if ($('#txtSplitRefNo').val() == 0) {
        $('#txtSplitRefNo').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtSplitRefNo').css('border-color', 'lightgrey');
    }

    return isValid;
}
function Close() {
    window.location.href = "/LotsplitupMain/LotsplitupMainIndex";
}

function Update() {

    debugger;

    var res = validate();
    if (res == false) {
        return false;
    }


    if (LotSplitList.length == 0) {
        //alert("Please Enter the LotSplit Details..");
        var msg = 'Please Enter the LotSplit Details...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }


    var SupId = $('#txtSupplierId').val();

    var objLotSubmit = {

        Companyid: $('#txtCompanyId').val(),
        SupplierId: $('#txtSupplierId').val(),
        TransNo: $('#txtTransNo').val(),
        EntryNo: $('#txtSplitNo').val(),
        EntryDate: $('#txtEntryDate').val(),//new Date($('#txtEntryDate').val()),
        RefNo: $('#txtSplitRefNo').val(),
        SplitType: "O",
        CreatedBy: Guserid,
        LotSplitMasid: TransId,
        LotSplitUpDet: LotSplitListSave

    };
    debugger;
    $("#Update").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/LotsplitupEntry/Update",
        data: JSON.stringify(objLotSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == true) {
                AddUserEntryLog('Procurement', 'Lot SplitUp', 'UPDATE', $("#txtOrderNo").val());
                //alert("Data Updated Sucessfully");
                //window.location.href = "/LotsplitupMain/LotsplitupMainIndex";
                var msg = 'Data Updated Sucessfully...';
                var flg = 1;
                var mod = 0;
                var url = "/LotsplitupMain/LotsplitupMainIndex";
                AlartMessage(msg, flg, mod, url);

            } else {

                window.location.href = "/Error/Index";

            }


        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
/////////////////////////////////////////////////////////////////
///////////////////////////Delete/////////////////////////////////
function Delete() {
    debugger;


    var objConPurDelete = {

        Companyid: $('#txtCompanyId').val(),
        SupplierId: $('#txtSupplierId').val(),
        TransNo: $('#txtTransNo').val(),
        EntryNo: $('#txtSplitNo').val(),
        EntryDate: $('#txtEntryDate').val(),
        RefNo: $('#txtSplitRefNo').val(),
        SplitType: "O",
        CreatedBy: Guserid,
        LotSplitMasid: TransId,
        LotSplitUpDet: LotSplitListSave
    };
    $("#Delete").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/LotsplitupEntry/Delete",
        data: JSON.stringify(objConPurDelete),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == true) {
                AddUserEntryLog('Procurement', 'Lot SplitUp', 'DELETE', $("#txtOrderNo").val());
                //alert("Data Deleted Sucessfully");
                //window.location.href = "/LotsplitupMain/LotsplitupMainIndex";
                var msg = 'Data Deleted Sucessfully...';
                var flg = 2;
                var mod = 0;
                var url = "/LotsplitupMain/LotsplitupMainIndex";
                AlartMessage(msg, flg, mod, url);

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