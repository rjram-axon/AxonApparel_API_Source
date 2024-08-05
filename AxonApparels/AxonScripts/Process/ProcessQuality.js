var Guserid = 0;
var UserName = 0;
var CompanyId = 0;
var MainFDate = 0;
var mode;
var ItmList = [];
var OrderList = [];
var StockListSave = [];
var StockList = [];
var Masid = 0;
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
    var recptmasid = queryvalue[1];
    mode = queryvalue[3];
    var fromdate = queryvalue[5];
    var todate = queryvalue[7];
    MainFDate = $("#hdMainFromDate").data('value');
    getDate();
    if (mode == 0) {
        Getheaderdet(recptmasid, fromdate, todate);
        $("#btnUpdate").hide();
        $("#btnDel").hide();
    } else if (mode == 1) {
        getbyQltyID(recptmasid);
    } else {
        getbyDelQltyID(recptmasid);
    }
    $(document).on('keyup', '.calcadjquan', function () {
        debugger;

        var table = $('#Ordertab').DataTable();

        var IId = table.row($(this).parents('tr')).data()["itemid"];
        var CId = table.row($(this).parents('tr')).data()["Colorid"];
        var SId = table.row($(this).parents('tr')).data()["Sizeid"];
        var pid = table.row($(this).parents('tr')).data()["sno"];
        var balq = table.row($(this).parents('tr')).data()["Recvdqty"];
        var rate = table.row($(this).parents('tr')).data()["Rate"];
        var value = $(this).val();

        var amnt = parseFloat(rate) * parseFloat(value);
        amnt = amnt.toFixed(2);
        var acpt = parseFloat(balq) - value;

        $.each(OrderList, function () {
            if (this.sno == pid) {
                this.DebitQty = value;
                this.Amount = amnt;
                this.AcptQty = acpt;
            }
        });
        LoadOrdertab(OrderList);
        for (var y = 0; y < StockListSave.length; y++) {
            if (StockListSave[y].itemid == IId && StockListSave[y].Colorid == CId && StockListSave[y].Sizeid == SId) {
                StockListSave[y].Rejectedqty = value;

            }
        }


        StockList = $.grep(StockListSave, function (v) {
            return (v.itemid === IId && v.Colorid === CId && v.Sizeid === SId);
        });
        LoadStocktab(StockList);
    });
    $(document).on('keyup', '.calcacptquan', function () {
        debugger;

        var table = $('#Ordertab').DataTable();

        var IId = table.row($(this).parents('tr')).data()["itemid"];
        var CId = table.row($(this).parents('tr')).data()["Colorid"];
        var SId = table.row($(this).parents('tr')).data()["Sizeid"];
        var pid = table.row($(this).parents('tr')).data()["sno"];
        var balq = table.row($(this).parents('tr')).data()["Recvdqty"];
        var rate = table.row($(this).parents('tr')).data()["Rate"];
        var value = $(this).val();


        var dbt = parseFloat(balq) - value;
        var amnt = parseFloat(rate) * parseFloat(dbt);
        amnt = amnt.toFixed(2);
        $.each(OrderList, function () {
            if (this.sno == pid) {
                this.DebitQty = dbt;
                this.Amount = amnt;
                this.AcptQty = value;
            }
        });
        LoadOrdertab(OrderList);
        for (var y = 0; y < StockListSave.length; y++) {
            if (StockListSave[y].itemid == IId && StockListSave[y].Colorid == CId && StockListSave[y].Sizeid == SId) {
                StockListSave[y].Rejectedqty = dbt;

            }
        }


        StockList = $.grep(StockListSave, function (v) {
            return (v.itemid === IId && v.Colorid === CId && v.Sizeid === SId);
        });
        LoadStocktab(StockList);
    });
});
function Getheaderdet(masid, fromdate, todate) {
    debugger;
    Masid = masid;
    //Produ
    var type = $('select#ddlMType option:selected').val();

    if (type == undefined) {
        type = "";
    }
    var proctype = $('input[name="mainproctype"]:checked').attr('value');

    var ordNo = "";
    var ONo = $('select#ddlMOrderNo option:selected').val();

    if (ONo == 0 || ONo == undefined) {
        ordNo == "";
    }
    else {

        ordNo = $('select#ddlMOrderNo option:selected').val();
    }

    var RecNo = "";
    var RNo = $('select#ddlMreceptno option:selected').val();

    if (RNo == 0 || ONo == undefined) {
        RecNo == "";
    }
    else {

        RecNo = $('select#ddlMreceptno option:selected').val();
    }


    var DCNo = "";
    var DNo = $('select#ddlMDCNo option:selected').val();

    if (DNo == 0 || ONo == undefined) {
        DCNo == "";
    }
    else {

        DCNo = $('select#ddlMDCNo option:selected').val();
    }


    var CompId = $('#ddlMCompany').val();
    if (CompId == null || CompId == "0") {
        CompId = 0;
    }

    var Unit = $('#ddlMUnit').val();
    if (Unit == null || Unit == "0") {
        Unit = 0;
    }

    var process = $('#ddlMProcess').val();
    if (process == null || process == "0") {
        process = 0;
    }
    var buyer = $('#ddlMBuyer').val();
    if (buyer == null || buyer == "0") {
        buyer = 0;
    }
    var mas = masid;
    var prid = 0;
    var FDate = fromdate;
    var TDate = todate;
    $.ajax({
        url: "/ProcessReceipt/LoadMaingriddet",
        data: JSON.stringify({ cmpid: CompId, processid: process, unitid: Unit, buyerid: buyer, masid: mas, prodordid: prid, jobordno: ordNo, processortype: proctype, type: type, dcno: DCNo, recptno: RecNo, fromDate: FDate, todate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            var obj = json.Value;

            $('#txtReceiptDate').val(moment(obj[0].proc_recpt_date).format("DD/MM/YYYY"));
            $('#txtRefDate').val(moment(obj[0].Recpt_Ref_date).format("DD/MM/YYYY"));
            $('#txtUnit').val(obj[0].unit);
            $('#txtProcess').val(obj[0].process);
            $('#txtProcessor').val(obj[0].supplier);
            $('#txtRefNo').val(obj[0].Recpt_Ref_no);
            $('#txtRemark').val(obj[0].remarks);
            var recpt = obj[0].proc_recpt_no + " - " + obj[0].Recpt_Ref_no;
            $('#txtrecptno').val(obj[0].proc_recpt_no);
            $('#txtrecptrefDate').val(recpt);

            CompanyId = obj[0].companyid;
            GenerateNumber();
            LoadOrderDet(Masid);
            LoadStockDet(Masid);


        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

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

    $('#txtQualityDate').val(MainFDate);



}
function GenerateNumber() {
    debugger;

    table = "Process_Qlty_Mas",
    column = "Proc_Qlty_no",
    compId = CompanyId,
    Docum = 'PROCESS QC'

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

function LoadItemDet(rcptmasid) {

    $.ajax({
        url: "/ProcessQuality/GetEntryItemLoad",
        data: JSON.stringify({ recptmasid: rcptmasid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;

            ItmList = result.Value;

            //LoadItmtab(ItmList);

        }

    });
}

function LoadOrderDet(rcptmasid) {

    $.ajax({
        url: "/ProcessQuality/GetEntryJobDetLoad",
        data: JSON.stringify({ recptmasid: rcptmasid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;

            OrderList = result.Value;

            LoadOrdertab(OrderList);

        }

    });
}

function LoadStockDet(rcptmasid) {

    $.ajax({
        url: "/ProcessQuality/GetEntryStockLoad",
        data: JSON.stringify({ recptmasid: rcptmasid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;

            StockListSave = result.Value;
            for (var t = 0; t < StockListSave.length; t++) {
                StockListSave[t].transdate = moment(StockListSave[t].transdate).format("DD/MM/YYYY");
            }

            LoadStocktab(StockListSave);

        }

    });
}
function LoadOrdertab(list) {
    $('#Ordertab').DataTable().destroy();

    $('#Ordertab').DataTable({
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
              { title: "SNo", data: "sno", "visible": false },
                   { title: "Itemid", data: "itemid", "visible": false },
                   { title: "Output Item", data: "item" },
                   { title: "Colorid", data: "Colorid", "visible": false },
                   { title: "Category I", data: "color" },
                    { title: "Sizeid", data: "Sizeid", "visible": false },
                   { title: "Category II", data: "size" },
                   { title: "Debit Qty", data: "Recvdqty" },
                   { title: "ProcOrdNo", data: "procordno" },
                   {
                       title: "ProgNo", data: "prodprgno",

                   },
                   { title: "JobOrdNo", data: "jobordno" },

                   {
                       title: "Lot", data: "lotno",

                   },
                   {
                       title: "Adj Qty", data: "DebitQty",
                       render: function (data) {

                           return '<input type="text" id="txtDebtQty" class="calcadjquan form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';

                       },
                   },
                   {
                       title: "Acpt Qty", data: "AcptQty",
                       render: function (data) {

                           return '<input type="text" id="txtAcptQty" class="calcacptquan form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';

                       },
                   },
                   {
                       title: "Rate", data: "Rate",
                       render: function (data) {

                           return '<input type="text" id="txtRate" class="calcrate form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';

                       },

                   },
                   {
                       title: "Amount", data: "Amount",
                       render: function (data) {

                           return '<input type="text" id="txtAmnt" class="calcamnt form-control"  style="width: 50px;text-align: center;" disabled value=' + data + '>';

                       },
                   },


        ]

    });
    var table = $('#Ordertab').DataTable();
    $("#Ordertab tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#Ordertab tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}
function LoadStocktab(list) {
    $('#stktab').DataTable().destroy();

    $('#stktab').DataTable({
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
              { title: "SNo", data: "Stockid", "visible": false },
                   { title: "DocumentNo", data: "transno" },
                   { title: "Itmid", data: "itemid", "visible": false },
                   { title: "Clrid", data: "Colorid", "visible": false },
                   { title: "Sizeid", data: "Sizeid", "visible": false },
                    { title: "Date", data: "transdate" },
                   { title: "Process", data: "process" },
                   { title: "Supplier", data: "supplier" },
                   { title: "Lot No", data: "lotno" },


                   {
                       title: "Stock Qty", data: "balqty",

                   },
                   {
                       title: "Rej Qty", data: "Rejectedqty",
                       render: function (data) {

                           return '<input type="text" id="txtrejQty" class="calcrejquan form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';

                       },
                   },




        ]

    });
    var table = $('#stktab').DataTable();
    $("#stktab tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#stktab tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}

function Add() {
    debugger;
    var ordlist = [];
    if (OrderList.length > 0) {
        for (var d = 0; d < OrderList.length; d++) {
            var list = {
                itemid: OrderList[d].itemid,
                Colorid: OrderList[d].Colorid,
                Sizeid: OrderList[d].Sizeid,//$(tr).find('td:eq(0)').text(),
                uomid: OrderList[d].uomid,// $(tr).find('td:eq(2)').text(),
                //Value: $(tr).find('td:eq(3)').text(),
                DebitQty: OrderList[d].DebitQty,
                AcptQty: OrderList[d].AcptQty,// $(tr).find('td:eq(4)').text(),
                Rate: OrderList[d].Rate,
                Amount: OrderList[d].Amount,
                Prod_Recpt_detid: OrderList[d].Proc_Recpt_Detid,// 0.00,
                Debit_Rate: OrderList[d].Rate,
                ReProQty: 0
            }
            ordlist.push(list);
        }
    }

    var totalamnt = 0;
    for (var e = 0; e < OrderList.length; e++) {
        var amount = OrderList[e].Amount;
        totalamnt = totalamnt + parseFloat(amount);

    }
    var drcr = [];
    var crlist = {
        QltyRemarks: $('#txtremarks').val(),
        Amount: totalamnt
    }
    drcr.push(crlist);

    var Obj = {
        Proc_Qlty_no: $('#txtOrderNo').val(),
        Proc_qlty_date: $('#txtQualityDate').val(),
        Proc_Recpt_no: $('#txtrecptno').val(),
        Remarks: $('#txtremarks').val(),
        NetAmount: 0,
        GrossAmount: 0,
        //DebtRaised:,
        ProdDet: ordlist,
        ProdJobDet: OrderList,
        ProdStock: StockListSave,
        ProdDrcr: drcr
    }
    $("#btnAdd").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/ProcessQuality/Add",
        data: JSON.stringify(Obj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Value == 1) {

                //alert('Data Saved Successfully');
                //window.location.href = "/ProcessReceipt/ProcessReceiptIndex";
                var msg = 'Data Saved Successfully...';
                var flg = 1;
                var mod = 0;
                var url = "/ProcessReceipt/ProcessReceiptIndex";
                AlartMessage(msg, flg, mod, url);

            }
            if (result.Value == 0) {

                //alert('Data not saved properly');
                //window.location.href = "/ProcessReceipt/ProcessReceiptIndex";
                var msg = 'Data not saved properly...';
                var flg = 4;
                var mod = 0;
                var url = "/ProcessReceipt/ProcessReceiptIndex";
                AlartMessage(msg, flg, mod, url);
            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }

    });
}


function getbyQltyID(id) {
    debugger;
    Masid = id;

    $.ajax({
        url: "/ProcessQuality/GetQltyEditDetails",
        data: JSON.stringify({ Proc_Recpt_Masid: Masid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            $('#myModal1').show();
            $('#myModal1').modal('show');
            $('#btnUpdate').show();
            $('#btnDel').hide();
            $('#btnAdd').hide();
            var obj = json.Value;

            $('#txtQualityDate').val(moment(obj[0].Proc_qlty_date).format("DD/MM/YYYY"));
            $('#txtUnit').val(obj[0].Unit);
            $('#txtProcess').val(obj[0].Process);
            $('#txtProcessor').val(obj[0].Supplier);
            $('#txtOrderNo').val(obj[0].Proc_Qlty_no);
            $('#txtremarks').val(obj[0].remarks);
            var recpt = obj[0].Proc_Recpt_no + " - " + obj[0].DcNo;
            $('#txtrecptno').val(obj[0].Proc_Recpt_no);
            $('#txtrecptrefDate').val(recpt);



            //CompanyId = obj[0].cmpid;
            //ProductionOrderno = obj[0].prodnord;
            //Companyunitid = obj[0].cmpunitid;

            //Processid = obj[0].processid;
            //Processorid = obj[0].processorid;

            LoadEditItmDet(Masid);
            LoadEditStockDet(Masid);


        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function getbyDelQltyID(id) {
    debugger;
    Masid = id;

    $.ajax({
        url: "/ProcessQuality/GetQltyEditDetails",
        data: JSON.stringify({ Proc_Recpt_Masid: Masid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            $('#myModal1').show();
            $('#myModal1').modal('show');
            $('#btnUpdate').hide();
            $('#btnDel').show();
            $('#btnAdd').hide();
            var obj = json.Value;

            $('#txtQualityDate').val(moment(obj[0].Proc_qlty_date).format("DD/MM/YYYY"));
            $('#txtUnit').val(obj[0].Unit);
            $('#txtProcess').val(obj[0].Process);
            $('#txtProcessor').val(obj[0].Supplier);
            $('#txtOrderNo').val(obj[0].Proc_Qlty_no);
            $('#txtremarks').val(obj[0].remarks);
            var recpt = obj[0].Proc_Recpt_no + " - " + obj[0].DcNo;
            $('#txtrecptno').val(obj[0].Proc_Recpt_no);
            $('#txtrecptrefDate').val(recpt);



            //CompanyId = obj[0].cmpid;
            //ProductionOrderno = obj[0].prodnord;
            //Companyunitid = obj[0].cmpunitid;

            //Processid = obj[0].processid;
            //Processorid = obj[0].processorid;

            LoadEditItmDet(Masid);
            LoadEditStockDet(Masid);


        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function LoadEditItmDet(rcptmasid) {

    $.ajax({
        url: "/ProcessQuality/LoadItemQltyEditDetails",
        data: JSON.stringify({ Proc_Recpt_Masid: rcptmasid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;

            OrderList = result;

            LoadOrdertab(OrderList);

        }

    });
}

function LoadEditStockDet(rcptmasid) {

    $.ajax({
        url: "/ProcessQuality/LoadStockQltyEditDetails",
        data: JSON.stringify({ Proc_Recpt_Masid: rcptmasid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;

            StockListSave = result;
            for (var t = 0; t < StockListSave.length; t++) {
                StockListSave[t].transdate = moment(StockListSave[t].transdate).format("DD/MM/YYYY");
            }

            LoadStocktab(StockListSave);

        }

    });
}

function ChkUpdate() {
    debugger;
    var ordlist = [];
    if (OrderList.length > 0) {
        for (var d = 0; d < OrderList.length; d++) {
            var list = {
                itemid: OrderList[d].itemid,
                Colorid: OrderList[d].Colorid,
                Sizeid: OrderList[d].Sizeid,//$(tr).find('td:eq(0)').text(),
                uomid: OrderList[d].uomid,// $(tr).find('td:eq(2)').text(),
                //Value: $(tr).find('td:eq(3)').text(),
                DebitQty: OrderList[d].DebitQty,
                AcptQty: OrderList[d].AcptQty,// $(tr).find('td:eq(4)').text(),
                Rate: OrderList[d].Rate,
                Amount: OrderList[d].Amount,
                Prod_Recpt_detid: OrderList[d].Proc_Recpt_Detid,// 0.00,
                Debit_Rate: OrderList[d].Rate,
                ReProQty: 0
            }
            ordlist.push(list);
        }
    }



    var totalamnt = 0;
    for (var e = 0; e < OrderList.length; e++) {
        var amount = OrderList[e].Amount;
        totalamnt = totalamnt + parseFloat(amount);

    }
    var drcr = [];
    var crlist = {
        QltyRemarks: $('#txtremarks').val(),
        Amount: totalamnt
    }
    drcr.push(crlist);


    var Obj = {
        Proc_Qlty_no: $('#txtOrderNo').val(),
        Proc_qlty_date: $('#txtQualityDate').val(),
        Proc_Recpt_no: $('#txtrecptno').val(),
        Remarks: $('#txtremarks').val(),
        NetAmount: 0,
        GrossAmount: 0,
        //DebtRaised:,
        ProdDet: ordlist,
        ProdJobDet: OrderList,
        ProdStock: StockListSave,
        ProdDrcr: drcr
    }
    $("#btnAdd").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/ProcessQuality/Update",
        data: JSON.stringify(Obj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Value == 1) {

                //alert('Data Updated Successfully');
                //window.location.href = "/ProcessReceipt/ProcessReceiptIndex";
                var msg = 'Data Updated Successfully...';
                var flg = 1;
                var mod = 0;
                var url = "/ProcessReceipt/ProcessReceiptIndex";
                AlartMessage(msg, flg, mod, url);
            }
            if (result.Value == 0) {

                //alert('Data not saved properly');
                //window.location.href = "/ProcessReceipt/ProcessReceiptIndex";
                var msg = 'Data not saved properly...';
                var flg = 4;
                var mod = 0;
                var url = "/ProcessReceipt/ProcessReceiptIndex";
                AlartMessage(msg, flg, mod, url);
            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }

    });
}
function ChkDelete() {
    debugger;
    var ordlist = [];
    if (OrderList.length > 0) {
        for (var d = 0; d < OrderList.length; d++) {
            var list = {
                itemid: OrderList[d].itemid,
                Colorid: OrderList[d].Colorid,
                Sizeid: OrderList[d].Sizeid,//$(tr).find('td:eq(0)').text(),
                uomid: OrderList[d].particularid,// $(tr).find('td:eq(2)').text(),
                //Value: $(tr).find('td:eq(3)').text(),
                DebitQty: OrderList[d].particularid,
                AcptQty: OrderList[d].AcptQty,// $(tr).find('td:eq(4)').text(),
                Rate: OrderList[d].Rate,
                Amount: OrderList[d].Amount,
                //Prod_Recpt_detid: OrderList[d].particularid,// 0.00,
                Debit_Rate: 0.00,
                ReProQty: 0
            }
            ordlist.push(list);
        }
    }

    var totalamnt = 0;
    for (var e = 0; e < OrderList.length; e++) {
        var amount = OrderList[e].Amount;
        totalamnt = totalamnt + parseFloat(amount);

    }
    var drcr = [];
    var crlist = {
        QltyRemarks: $('#txtremarks').val(),
        Amount: totalamnt
    }
    drcr.push(crlist);


    var Obj = {
        Proc_Qlty_no: $('#txtOrderNo').val(),
        Proc_qlty_date: $('#txtQualityDate').val(),
        Proc_Recpt_no: $('#txtrecptno').val(),
        Remarks: $('#txtremarks').val(),
        NetAmount: 0,
        GrossAmount: 0,
        //DebtRaised:,
        ProdDet: ordlist,
        ProdJobDet: OrderList,
        ProdStock: StockListSave,
        ProdDrcr: drcr
    }
    $("#btnAdd").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/ProcessQuality/Delete",
        data: JSON.stringify(Obj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Value == 1) {

                //alert('Data Deleted Successfully');
                //window.location.href = "/ProcessReceipt/ProcessReceiptIndex";
                var msg = 'Data Deleted Successfully...';
                var flg = 1;
                var mod = 0;
                var url = "/ProcessReceipt/ProcessReceiptIndex";
                AlartMessage(msg, flg, mod, url);
            }
            if (result.Value == 0) {

                //alert('Data not saved properly');
                //window.location.href = "/ProcessReceipt/ProcessReceiptIndex";
                var msg = 'Data not saved properly...';
                var flg = 4;
                var mod = 0;
                var url = "/ProcessReceipt/ProcessReceiptIndex";
                AlartMessage(msg, flg, mod, url);
            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }

    });
}