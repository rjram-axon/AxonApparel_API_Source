var POrdID = 0;
var ItmList = [];
var jobdet = [];
var jobdetsave = [];
var CompanyId = 0;
var Companyunitid = 0;
var Processorid = 0;
var Processid = 0;
var Prodid = 0;
var Itmid = 0;
var Colorid = 0;
var Sizeid = 0;
var indiptitm = -1;
var inditjbdet = -1;
var Masid = 0;
var MainFDate = 0;
var Userid = 0;
var UserName = 0;
var repobj = [];
var Repid = 0;
var Guserid = 0;
var DCompid = 0;
var pallown = 0;
var balallow = 0;
var itmbalallow = 0;
var ChkRecpt = true;
var ChkProcess = true;
var DtChk = false;
var ChkDCNo = true;
var ChkUnit = true;
var ChkComp = false;
var ChkSupplier = true;
var LoginUserid = '';
var editmasunitstore = 0;
var editsubmasunitstore = 0;
var editsubstore = 0;
var ValidateProcessStore = "False";
var processname = '';

var MainList_barcode = [];
var MainList_barcodeScanList = [];

$(document).ready(function () {
    debugger;
    Guserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    MainFDate = $("#hdMainFromDate").data('value');
    LoginUserid = $("#hdnLoginUserid").data('value');
    ValidateProcessStore = $("#hdnValidateProcessStore").data('value');
    DCompid = $("#hdnDCompid").data('value');
    LoadCompanyDDL("#ddlCompany,#ddlMCompany");
    LoadCompanyUnitDDL("#ddlUnit");
    //LoadWorkdivisionDDL("#ddlwrkdiv");
    //LoadSupplierDDL("#ddlSupplier");
    LoadWrkdiv();
    LoadProcessor();
    LoadBuyerDDL("#ddlinnerbuyer");
    getDate();
    // ddlmain();
    var fill = localStorage.getItem('GeneralProcessReceiptMainFilter');
    if (fill != "null" && fill != null) {
        LoadMaingridFromBack();
    } else {
        LoadMaingrid();
    }
    //LoadMaingrid();
    //LoadProcess();
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

    $("#tblcompdetails").dataTable().find("tbody").on('click', 'td', function () {
        debugger;
        $('input[id=groupbom]').each(function () {
            var row = $(this).closest('tr');
            if ($(this).is(':checked')) {
                var val = $(this).val();
                for (var d = 0; d < entrygriddet.length; d++) {
                    if (entrygriddet[d].processordid == val) {
                        entrygriddet[d].CheckLoad = "Y";
                    }
                }

            }
            else {
                var val = $(this).val();
                for (var d = 0; d < entrygriddet.length; d++) {
                    if (entrygriddet[d].processordid == val) {
                        entrygriddet[d].CheckLoad = "N";
                    }

                }
            }

        });

    });

    $('#tblmaindetails').on('click', 'tr', function (e) {
        debugger;

        var table = $('#tblmaindetails').DataTable();

        var row = $(this).closest('tr');
        var data = $('#tblmaindetails').dataTable().fnGetData(row);

        processname = data[4];
        var ProcessOrderNo = data[1];
        LoadItemMovements(ProcessOrderNo);

    });

    $(document).on('keyup', '.calcipAmt', function () {
        debugger;

        var table = $('#tblcbompdetails').DataTable();


        var CSno = table.row($(this).parents('tr')).data()["sno"];
        var IId = table.row($(this).parents('tr')).data()["itemid"];
        var CId = table.row($(this).parents('tr')).data()["colorid"];
        var SId = table.row($(this).parents('tr')).data()["sizeid"];
        var OrdBalQty = table.row($(this).parents('tr')).data()["orderqty"];
        var prod = table.row($(this).parents('tr')).data()["procordid"];
       
        var Val = $(this).val();       

        if (Val > OrdBalQty) {
            //alert("OrderQty Should Not Greater then OrderBalanceQty..");
            var msg = 'Order Quantity Should Not Greater then Order Balance Quantity...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            $.each(ItmList, function () {
                if (this.sno == CSno) {
                    this.Received_qty = 0;

                }
            });

            LoaditmTab(ItmList);
            return true;
        }
        $.each(ItmList, function () {
            if (this.sno == CSno) {
                this.Received_qty = Val;

            }
        });

        LoaditmTab(ItmList);

        var pid = [];
        var bal = [];
        var qty = [];
        for (var t = 0; t < jobdetsave.length; t++) {
            if (jobdetsave[t].Itemid == IId && jobdetsave[t].Colorid == CId && jobdetsave[t].Sizeid == SId && jobdetsave[t].processordid == prod) {
                pid.push(jobdetsave[t].sno);
                bal.push(jobdetsave[t].orderqty);
                qty.push(jobdetsave[t].Received_Qty);
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
        for (var u = 0; u < jobdetsave.length; u++) {
            for (var r = 0; r < pid.length; r++) {
                if (jobdetsave[u].sno == pid[r]) {
                    jobdetsave[u].Received_Qty = qty[r];
                }
            }
        }

        colorempty = jobdetsave;

        colorempty = $.grep(colorempty, function (v) {
            return (v.Itemid === IId && v.Colorid === CId && v.Sizeid === SId && v.processordid === prod);
        });

        LoadJobdetTab(colorempty);

        jobdet = [];
        jobdet = colorempty;

        //Datatable textbox focus
        var rows = $("#tblcbompdetails").dataTable().fnGetNodes();
        var dtTable = $('#tblcbompdetails').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
            $('input[id=txtrecvdqty]').each(function () {
                if (sn == CSno) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtrecvdqty').val();
                    row.find('#txtrecvdqty').focus().val('').val(num);
                    return true;
                }
            });
        }
    });


    $(document).on('keyup', '.calcrate', function () {
        debugger;
       
        var table = $('#tblcbompdetails').DataTable();
        var CSno = table.row($(this).parents('tr')).data()["sno"];

        var val = $(this).val();

        $.each(ItmList, function () {
            if (this.sno == CSno) {
                this.rate = val;

            }
        });

        LoaditmTab(ItmList);
        //Datatable textbox focus
        var rows = $("#tblcbompdetails").dataTable().fnGetNodes();
        var dtTable = $('#tblcbompdetails').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
            $('input[id=txtrate]').each(function () {
                if (sn == CSno) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtrate').val();
                    row.find('#txtrate').focus().val('').val(num);
                    return true;
                }
            });
        }
    });
    $(document).on('keyup', '.calcsepquan', function () {
        debugger;
        var table = $('#tbljobordinfo').DataTable();

        var pid = table.row($(this).parents('tr')).data()["processordid"];
        var itmid = table.row($(this).parents('tr')).data()["Itemid"];
        var colorid = table.row($(this).parents('tr')).data()["Colorid"];
        var sizeid = table.row($(this).parents('tr')).data()["Sizeid"];
        var sno = table.row($(this).parents('tr')).data()["sno"];
        var balq = table.row($(this).parents('tr')).data()["bal"];
        var value = $(this).val();
        //for (j = 0; jobdetsave.length > j; j++) {
        //    if (colorid == jobdetsave[j].Colorid && itmid == jobdetsave[j].Itemid && sizeid == jobdetsave[j].Sizeid && sno == jobdetsave[j].sno) {
        //        var bal = jobdetsave[j].orderqty + pallown;
        //        var prgqty = jobdetsave[j].orderqty;
        //        var ordqty = jobdetsave[j].Received_Qty;
        //        if (prgqty < ordqty && value < ordqty) {
        //            var balqty = ordqty - prgqty;
        //            for (k = 0; jobdetsave.length > k; k++) {
        //                jobdetsave[k].allow = jobdetsave[k].allow + balqty;
        //            }
        //            balallow = balallow - balqty;

        //            for (k = 0; ItmList.length > k; k++) {
        //                ItmList[k].allow = ItmList[k].allow + balqty;
        //            }
        //            itmbalallow = itmbalallow - balqty;
        //        }
        //    }
        //}
        var allow = 0;
        var balallow = 0;
        for (j = 0; jobdetsave.length > j; j++) {
            if (colorid == jobdetsave[j].Colorid && itmid == jobdetsave[j].Itemid && sizeid == jobdetsave[j].Sizeid && sno == jobdetsave[j].sno) {
            }
            else {
                var bal = jobdetsave[j].bal; //+pallown
                var prgqty = jobdetsave[j].orderqty;
                var ordqty = jobdetsave[j].Received_Qty;
                if (jobdetsave[j].bal < jobdetsave[j].Received_Qty) {
                    var curallow = parseFloat(jobdetsave[j].Received_Qty) - parseFloat(jobdetsave[j].bal)
                    allow = allow + parseFloat(curallow);
                }
            }
        }
        balallow = pallown - allow;
        for (j = 0; jobdetsave.length > j; j++) {
            if (colorid == jobdetsave[j].Colorid && itmid == jobdetsave[j].Itemid && sizeid == jobdetsave[j].Sizeid && sno == jobdetsave[j].sno) {
                var bal = jobdetsave[j].bal; //+pallown
                var prgqty = jobdetsave[j].orderqty;
                var ordqty = jobdetsave[j].Received_Qty;
                var allow = 0;
                if (jobdetsave[j].bal < value) {

                    var totactval = parseFloat(jobdetsave[j].bal) + balallow;

                    if (totactval < value) {

                        value = parseFloat(totactval).toFixed(3);

                    }
                }
            }
        }

        $.each(jobdetsave, function () {
            if (this.sno == sno) {


                if (balq >= value) {
                    this.Received_Qty = value;
                }
                else {
                    var t = value - balq;
                    // this.Received_Qty = balq;
                    this.Received_Qty = value;
                }

            }
        });


        var totalamnt = 0;

        for (var e = 0; e < jobdetsave.length; e++) {
            if (jobdetsave[e].Itemid == itmid && jobdetsave[e].Sizeid == sizeid && jobdetsave[e].Colorid == colorid && jobdetsave[e].processordid == pid) {
                var amount = jobdetsave[e].Received_Qty;
                totalamnt = totalamnt + parseFloat(amount);
            }
        }
        $.each(ItmList, function () {
            if (this.itemid == itmid && this.sizeid == sizeid && this.colorid == colorid && this.procordid == pid) {
                this.Received_qty = totalamnt;
            }
        });

        colorempty = jobdetsave;
        colorempty = $.grep(colorempty, function (v) {
            return (v.Itemid === itmid && v.Colorid === colorid && v.Sizeid === sizeid && v.processordid === pid);
        });

        LoadJobdetTab(colorempty);
        LoaditmTab(ItmList);

        //Datatable textbox focus
        var rows = $("#tbljobordinfo").dataTable().fnGetNodes();
        var dtTable = $('#tbljobordinfo').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
            $('input[id=txtOpjobOrdQty]').each(function () {
                if (sn == sno) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtOpjobOrdQty').val();
                    row.find('#txtOpjobOrdQty').focus().val('').val(num);
                    return true;
                }
            });
        }
    });
});




function LoadProcess() {
    debugger;
    var cmpyid = $('select#ddlCompany option:selected').val();
    var cunitid = $('select#ddlUnit option:selected').val();
    if (cmpyid == 0) {
        //alert('Please select Company...');
        var msg = 'Please select Company...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }
    if (cunitid == 0) {
        //alert('Please select CompanyUnit...');
        var msg = 'Please select CompanyUnit...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }
    var protype = 'G';//$('input[name="Revert"]:checked').attr('value');
    //var cmpyid = 1;

    var cmpyid = $('#ddlCompany').val();

    if (cmpyid == null) {
        cmpyid = DCompid;
    } else {
        cmpyid = $('#ddlCompany').val();
    }

   // var cunitid = 1;


    var cunitid = $('#ddlUnit').val();

    if (cunitid == null) {
        cunitid = 0;
    } else {
        cunitid = $('#ddlUnit').val();
    }

    $.ajax({
        url: "/GeneralProcessReceipt/Getprocess",
        data: JSON.stringify({ cmpid: cmpyid, cmpunitid: cunitid, ordertype: protype }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            if (result.Status == 'SUCCESS') {

                // if (Mode == 0) {
                var data = result.Value;
                $(ddlProcess).empty();
                $(ddlProcess).append($('<option/>').val('0').text('--Select Process--'));
                $.each(data, function () {
                    $(ddlProcess).append($('<option></option>').val(this.processid).text(this.process));
                });
                //}
                LoadIssueno();
                LoadColor();
            }


        }

    });
}

function LoadIssueno() {
    debugger;
    var cmpyid = $('select#ddlCompany option:selected').val();
    var cunitid = $('select#ddlUnit option:selected').val();
    if (cmpyid == 0) {
        //alert('Please select Company...');
        var msg = 'Please select Company...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }
    if (cunitid == 0) {
        //alert('Please select CompanyUnit...');
        var msg = 'Please select CompanyUnit...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }
    var proid = $('select#ddlProcess option:selected').val();
    var protype = $('input[name="optwrkord"]:checked').attr('value');
    if (protype = 'P') {
        var procrid = $('select#ddlSupplier option:selected').val();
    }
    else if (protype = 'W') {
        var procrid = $('select#ddlwrkdiv option:selected').val();
    }
    //if (procrid == 0) {
    //    alert('Please select Processor...');
    //    return true;
    //}

    $.ajax({
        url: "/GeneralProcessReceipt/Getissueno",
        data: JSON.stringify({ cmpid: cmpyid, cmpunitid: cunitid, processid: proid, processorid: procrid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            if (result.Status == 'SUCCESS') {

                // if (Mode == 0) {
                var data = result.Value;
                $(ddlIssueNo).empty();
                $(ddlIssueNo).append($('<option/>').val('0').text('--Select IssueNo--'));
                $.each(data, function () {
                    $(ddlIssueNo).append($('<option></option>').val(this.processordid).text(this.processorder));
                });
                //}
            }

            LoadAddgrid();
            
        }

    });
}


function LoadAddgrid() {
    debugger;

    var protype = $('input[name="optwrkord"]:checked').attr('value');
    if (protype == 'P') {

        $('#supp').show();
        $("#wrkdiv").hide();
    }
    else if (protype == 'W') {
        $('#supp').hide();
        $("#wrkdiv").show();
    }



    var cmpyid = $('select#ddlCompany option:selected').val();
    var cunitid = $('select#ddlUnit option:selected').val();
    if (cmpyid == 0) {
        //alert('Please select Company...');
        var msg = 'Please select Company...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }
    if (cunitid == 0) {
        //alert('Please select CompanyUnit...');
        var msg = 'Please select CompanyUnit...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }
    //var proid = $('select#ddlProcess option:selected').val();


    var proid = $('#ddlProcess').val();
    if (proid == null || proid == undefined) {
        proid = 0;
    }

    var protype = $('input[name="optwrkord"]:checked').attr('value');
    var type = 'G';// $('input[name="Revert"]:checked').attr('value');
    if (protype == 'P') {
        var procrid = $('select#ddlSupplier option:selected').val();
    }
    else if (protype == 'W') {
        var procrid = $('select#ddlwrkdiv option:selected').val();
    }
    //if (procrid == 0) {
    //    alert('Please select Processor...');
    //    return true;
    //}
    var cl = 'N';
    $.ajax({
        url: "/GeneralProcessReceipt/Loadaddgrid",
        data: JSON.stringify({ cmpid: cmpyid, cmpunitid: cunitid, processid: proid, processorid: procrid, ordtype: type, clsed: cl }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            entrygriddet = result.Value;
            for (var d = 0; d < entrygriddet.length; d++) {
                entrygriddet[d].proddate = moment(entrygriddet[d].proddate).format("DD/MM/YYYY")
            }
            //  LoadEntrytab(entrygriddet);

            MainList_barcode = entrygriddet;

        }

    });
}


$(document).ready(function () {
    $('input').bind("enterKey", function (e) {
        // alert("Enter key pressed");

        BarcodeScan();
    });
    $('input').keyup(function (e) {
        if (e.keyCode == 13) {
            $(this).trigger("enterKey");
        }
    });
});

function BarcodeScan() {
    debugger;

    var txtBarcodeScan_PurOrdNo = $('#txtBarcodeValue').val();

    for (var i = 0; i < MainList_barcodeScanList.length; i++) {

        if (MainList_barcodeScanList[i].PurOrdNo == txtBarcodeScan_PurOrdNo) {
            return;
        }
    }

    jQuery.each(MainList_barcode, function (i, val) {

        if (val.processorder == txtBarcodeScan_PurOrdNo) {

            var det = {

                processordid: val.processordid,
                processorder: val.processorder,
                proddate: val.proddate,
                processor: val.processor,
                ordqty: val.ordqty,
                recvdqty: val.recvdqty,
                bal: val.bal
            }
            MainList_barcodeScanList.push(det);

            LoadEntrytab(MainList_barcodeScanList);
            $('#txtBarcodeValue').val("");

            return;
        }

        // return (val.processorder);
    });

    //for (var i = 0; i < MainList_barcode.length; i++) {

    //    if (MainList_barcode[i].PurOrdNo == txtBarcodeScan_PurOrdNo) {

    //        var det = {
    //            PurOrdId: MainList_barcode[i].PurOrdId,
    //            PurOrdNo: MainList_barcode[i].PurOrdNo,
    //            OrdDate: MainList_barcode[i].OrdDate,
    //            Amount: MainList_barcode[i].Amount
    //        }
    //        MainList_barcodeScanList.push(det);

    //        loadPAddItemTable_Barcode(MainList_barcodeScanList);
    //        $('#txtBarcodeValue').val("");

    //        break;
    //    }
    //}
}

function LoadEntrytab(list) {
    $('#tblcompdetails').DataTable().destroy();

    $('#tblcompdetails').DataTable({
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
                   { title: "Prodid", data: "processordid", "visible": false },
                   { title: "P.ord.No", data: "processorder" },
                   { title: "P.Date", data: "proddate" },
                   { title: "Processor", data: "processor" },
                   { title: "Ord Qty", data: "ordqty" },
                   { title: "Received", data: "recvdqty" },
                   { title: "Balance", data: "bal" },


                   {
                       title: "Group", data: "processordid",
                       render: function (data) {

                           //return '<input type="checkbox" id="group" value=' + data + ' onclick="myfunc(this.value);">';

                           return '<input type="checkbox" id="groupbom" class="groupbom editor-active" checked  value=' + data + ' >';
                       }
                   },

        ]

    });
}
function LoadColor() {
    debugger;
    var cmpyid = $('select#ddlCompany option:selected').val();
    var cunitid = $('select#ddlUnit option:selected').val();
    if (cmpyid == 0) {
        //alert('Please select Company...');
        var msg = 'Please select Company...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }
    if (cunitid == 0) {
        //alert('Please select CompanyUnit...');
        var msg = 'Please select CompanyUnit...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }
    var proid = $('select#ddlProcess option:selected').val();
    var protype = $('input[name="optwrkord"]:checked').attr('value');
    if (protype = 'P') {
        var procrid = $('select#ddlSupplier option:selected').val();
    }
    else if (protype = 'W') {
        var procrid = $('select#ddlwrkdiv option:selected').val();
    }
    //if (procrid == 0) {
    //    alert('Please select Processor...');
    //    return true;
    //}
    $.ajax({
        url: "/GeneralProcessReceipt/Loadcolor",
        data: JSON.stringify({ cmpid: cmpyid, cmpunitid: cunitid, processid: proid, processorid: procrid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            if (result.Status == 'SUCCESS') {

                // if (Mode == 0) {
                var data = result.Value;
                $(ddlColor).empty();
                $(ddlColor).append($('<option/>').val('0').text('--Select Color--'));
                $.each(data, function () {
                    $(ddlColor).append($('<option></option>').val(this.colorid).text(this.color));
                });
                //}


            }


        }

    });
}

function LoadProcessor() {
    debugger;

    $.ajax({
        url: "/GeneralProcessReceipt/Getprocessor",
        data: JSON.stringify({}),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            if (result.Status == 'SUCCESS') {

                // if (Mode == 0) {
                var data = result.Value;
                $(ddlSupplier).empty();
                $(ddlSupplier).append($('<option/>').val('0').text('--Select Supplier--'));
                $.each(data, function () {
                    $(ddlSupplier).append($('<option></option>').val(this.supplierid).text(this.supplier));
                });
                //}


            }


        }

    });
}

function LoadWrkdiv() {
    debugger;

    $.ajax({
        url: "/GeneralProcessReceipt/GetWrkdiv",
        data: JSON.stringify({}),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            if (result.Status == 'SUCCESS') {

                // if (Mode == 0) {
                var data = result.Value;
                $(ddlwrkdiv).empty();
                $(ddlwrkdiv).append($('<option/>').val('0').text('--Select WorkDivision--'));
                $.each(data, function () {
                    $(ddlwrkdiv).append($('<option></option>').val(this.wrkdivid).text(this.wrkdiv));
                });
                //}


            }


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

    $('#txtFromDate').val(MainFDate);
    $('#txtToDate').val(Fdatestring);
    $('#txtReceiptDate').val(Fdatestring);
    $('#txtRefDate').val(Fdatestring);


}

function ClearTextbox() {
    debugger;

    //LoadProcess();

    //$('#ddlCompany').val("0");
    //$('#ddlUnit').val("0");
    //$('#ddlColor').val("0");
    //$('#ddlProcess').val("0");
    //$('#ddlwrkdiv').val("0");
    $('#ddlBuyer').val("0");
 
    //$('#ddlSupplier').val("0");
    $('#ddlOrderNo').val("0");
    //$('#ddlIssueNo').val("0");
    $('#ddlRefNo').val("0");
    $('#ddlinnerbuyer').val("0");


    LoadProcess();
    LoadIssueno();
    var protype = $('input[name="optwrkord"]:checked').attr('value');
    if (protype == 'P') {

        $('#supp').show();
        $("#wrkdiv").hide();
    }
    else if (protype == 'W') {
        $('#supp').hide();
        $("#wrkdiv").show();
    }

    LoadAddgrid();
}
function RadioMBClick() {
    var protype = $('input[name="optwrkord"]:checked').attr('value');
    if (protype == 'P') {

        $('#supp').show();
        $("#wrkdiv").hide();
    }
    else if (protype == 'W') {
        $('#supp').hide();
        $("#wrkdiv").show();
    }
}

function backtomain() {
    //$('#myModal1').hide();
    //$('#myModal1').modal('hide');
    //$('#myModal').hide();
    //$('#myModal').modal('hide');

    window.location.href = "/GeneralProcessReceipt/GeneralProcessReceiptIndex";
}


function myfunc(Val) {
    debugger;
    POrdID = POrdID + "," + Val;

}


function LoadData() {
    debugger;



    var list = [];

    for (var j = 0; j < entrygriddet.length; j++) {
        if (entrygriddet[j].CheckLoad == "Y") {

            POrdID = POrdID + "," + entrygriddet[j].processordid;

            list.push(entrygriddet[j]);
        }
    }


    if (list.length == 0) {
        //alert('Please select checkboxes for any one row..');
        var msg = 'Please select checkboxes for any one row...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }


    var type = $('input[name="optwrkord"]:checked').attr('value');
    if (type == 'P') {
        var sup = $('#ddlSupplier').val();
        var supp = $('select#ddlSupplier option:selected').text();
        Processorid = $('select#ddlSupplier option:selected').val();
        if (sup == 0) {
            //alert('Select Supplier');
            $('#ddlSupplier').siblings(".select2-container").css('border', '1px solid red');
            //$('#myModal1').hide();
            //$('#myModal1').modal('hide');
            return true;
        }
    }
    else {
        var sup = $('#ddlwrkdiv').val();
        var supp = $('select#ddlwrkdiv option:selected').text();
        Processorid = $('select#ddlwrkdiv option:selected').val();
        if (sup == 0) {
            //alert('Select WorkDivision');
            $('#ddlwrkdiv').siblings(".select2-container").css('border', '1px solid red');
            //$('#myModal1').hide();
            //$('#myModal1').modal('hide');
            return true;
        }
    }
    var unit = '';
    var process = '';
    var ordno = '';
    ordno = $('select#ddlOrderNo option:selected').text();

    process = $('select#ddlProcess option:selected').text();
    Processid = $('select#ddlProcess option:selected').val();
    unit = $('select#ddlUnit option:selected').text();
    Companyunitid = $('select#ddlUnit option:selected').val();
    CompanyId = $('select#ddlCompany option:selected').val();

    LoadProcessDetails(Processid);

    editmasunitstore = 0;
    editsubmasunitstore = 0;
    editsubstore = 0;
    LoadEmployeeStoreunit();
    LoadUserCompanyDDL();

    if (CompanyId == 0) {
        //alert('Select Company');
        $('#ddlCompany').siblings(".select2-container").css('border', '1px solid red');
        return true;
    }
    if (Companyunitid == 0) {
        //alert('Select CompanyUnit');
        $('#ddlUnit').siblings(".select2-container").css('border', '1px solid red');
        return true;
    }
    if (Processid == 0) {
        //alert('Select Process');
        $('#ddlProcess').siblings(".select2-container").css('border', '1px solid red');
        return true;
    }



    GenerateNumber();
    $('#myModal').modal('hide');
    $('#myModal1').show();
    $('#myModal1').modal('show');
    $('#btnUpdate').hide();
    $('#btnDel').hide();
    $('#btnAdd').show();
    //$('#txtOrderNo').val(ordno);
    $('#txtProcess').val(process);
    $('#txtUnit').val(unit);
    $('#txtProcessor').val(supp);

    LoadInputItm();
    LoadInputJobdet();
    var protype = $('input[name="type"]:checked').attr('value');
    if (protype == 'W') {
        Loadstkdet();
    }
    else if (protype == 'S') {
    }

    var type = $('input[name="MSType"]:checked').attr('value');
    if (type == 'M') {
        LoadMainStore();
    }
    if (type == 'S') {
        LoadSubStore();
    }
    if (type == 'E') {
        LoadSecStore();
    }
}

function LoadSecStore() {
    $("#SubStoreId").hide();
    $("#SecStoId").show();
    $("#MainStoreId").hide();
    //LoadCompanyUnitDDL("#ddlPUnit");
    //LoadStoreUnitDDL("#ddlSecStore");
    //LoadWorkdivisionDDL("#ddlWK");
}
function LoadMainStore() {
    $("#SubStoreId").hide();
    $("#SecStoId").hide();
    $("#MainStoreId").show();
    //LoadStoreUnitDDL("#ddlMSMMainStore");
    //LoadCompanyDDL("#ddlMSCompany");
}
function LoadSubStore() {
    $("#SecStoId").hide();
    $("#MainStoreId").hide();
    $("#SubStoreId").show();
    $("#SubStorPrdId").hide();
    //LoadCompanyDDL("#ddlSCompany");
    //LoadStoreUnitDDL("#ddlSMainStore");
}

function RadioSMClick() {
    $("#SubStoreMainId").show();
    $("#SubStorPrdId").hide();
}
function RadioSSPClick() {


    $("#SubStoreMainId").hide();
    $("#SubStorPrdId").show();
    //LoadStoreUnitDDL("#ddlSStoreSub");
    //LoadCompanyUnitDDL("#ddlSStorePunit");

}


function LoadInputItm() {
    debugger;

    $.ajax({
        url: "/GeneralProcessReceipt/Loaditm",
        data: JSON.stringify({ pid: POrdID }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            ItmList = result.Value;
            LoaditmTab(ItmList);
            Prodid = ItmList[0].productionordid;
            Itmid = ItmList[0].itemid;
            Colorid = ItmList[0].colorid;
            Sizeid = ItmList[0].sizeid;
        }

    });
}
function LoadInputJobdet() {
    debugger;



    $.ajax({
        url: "/GeneralProcessReceipt/Loadjobddet",
        data: JSON.stringify({ pid: POrdID }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            jobdetsave = result.Value;
            LoadJobdetSaveTab(jobdetsave);

            var colorempty = [];
            colorempty = jobdetsave;

            colorempty = $.grep(colorempty, function (v) {
                return (v.Itemid === Itmid && v.Colorid === Colorid && v.Sizeid === Sizeid && v.productionordid === Prodid);

            });
            jobdet = [];
            jobdet = colorempty;
            LoadJobdetTab(colorempty);
        }

    });
}

function LoaditmTab(list) {
    $('#tblcbompdetails').DataTable().destroy();

    list.sort(function (a, b) {
        return a.sno - b.sno;
    });

    $('#tblcbompdetails').DataTable({
        data: list,
        scrollY: 300,
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
               { title: "P.Ord.No", data: "processorder" },
                              { title: "Pid", data: "procordid", "visible": false },
                   { title: "Itemid", data: "itemid", "visible": false },
                   { title: "Output Item", data: "item" },
                   { title: "Colorid", data: "colorid", "visible": false },
                   { title: "Category I", data: "color" },
                   { title: "Sizeid", data: "sizeid", "visible": false },
                   { title: "Category II", data: "size" },
                   //{
                   //    title: "Rate", data: "rate",
                   //    render: function (data) {

                   //        return '<input type="text" id="txtOpRQty" class="editor-active"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                   //    },
                   //},
                   { title: "Order Qty", data: "orderqty" },
                   { title: "Balance", data: "bal" },
                    {
                        title: "Receipt", data: "Received_qty",
                        render: function (data) {

                            return '<input type="text" id="txtrecvdqty" class="calcipAmt form-control"  disabled style="width: 50px;text-align: center;"  value=' + data + ' >';

                        },
                    },
                   {
                       title: "Rate", data: "rate",
                       render: function (data) {

                           return '<input type="text" id="txtrate" class="calcrate form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                       },
                   },


                    //{
                    //    title: "View",// data: "jobordno",
                    //    render: function (data) {

                    //        return '<button type="button"  class="btnviewiputitem btn btn-round btn-info" style="width:20px;padding:0px;height:20px;border-radius:10px;"><i class="fa fa-eye"></i></button>';
                    //    }
                    //},
        ]

    });
}


function LoadJobdetSaveTab(list) {
    $('#tbljobordinfosave').DataTable().destroy();

    $('#tbljobordinfosave').DataTable({
        data: list,
        columns: [
              { title: "Sno", data: "sno", "visible": false },
                   { title: "Prodid", data: "processordid", "visible": false },
                   { title: "Itmid", data: "Itemid", "visible": false },
                   { title: "Clrid", data: "Colorid", "visible": false },
                   { title: "Sizeid", data: "Sizeid", "visible": false },
                   { title: "ProdProgNo", data: "ProdPrgNo" },
                   { title: "Job Ord No", data: "Job_Ord_No" },
                   {
                       title: "Order Qty", data: "orderqty",

                   },
                   { title: "Balance", data: "bal" },

                   {
                       title: "Received", data: "Received_Qty",
                       render: function (data) {

                           return '<input type="text" id="txtOpjobOrdQty" class="calcsepquan form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                       },
                   },



        ]

    });
}

function LoadJobdetTab(list) {
    $('#tbljobordinfo').DataTable().destroy();

    $('#tbljobordinfo').DataTable({
        data: list,
        scrollY: 300,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        //"bSort": false,
        columns: [
              { title: "Sno", data: "sno", "visible": false },
                   { title: "Prodid", data: "processordid", "visible": false },
                   { title: "Itmid", data: "Itemid", "visible": false },
                   { title: "Clrid", data: "Colorid", "visible": false },
                   { title: "Sizeid", data: "Sizeid", "visible": false },
                   { title: "ProdProgNo", data: "ProdPrgNo", "visible": false },
                   { title: "Job Ord No", data: "Job_Ord_No", "visible": false },
                   {
                       title: "Order Qty", data: "orderqty",

                   },
                   { title: "Balance", data: "bal" },

                   {
                       title: "Received", data: "Received_Qty",
                       render: function (data) {

                           return '<input type="text" id="txtOpjobOrdQty" class="calcsepquan form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                       },
                   },



        ]

    });
}

$(document).ready(function () {
    $("#tblcbompdetails ").dataTable().find("tbody").on('click', 'tr', function () {
        indiptitm = (this.rowIndex) - 1;
    });
});

$(document).ready(function () {
    $("#tbljobordinfo ").dataTable().find("tbody").on('click', 'tr', function () {
        inditjbdet = (this.rowIndex) - 1;
    });
});

function GenerateNumber() {
    debugger;

    table = "Process_Recpt_Mas",
    column = "proc_recpt_no",
    compId = CompanyId,
    Docum = 'PROCESS RECEIPT'

    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $('#txtReceiptno').val(result.Value);
        }
    });
}


function calcipAmt(Val) {
    debugger;

    indiptitm;
    var currentrowoftcpi = ItmList.slice(indiptitm);

    var CSno = currentrowoftcpi[0].sno;
    var OrdBalQty = currentrowoftcpi[0].orderqty;
    var IId = currentrowoftcpi[0].itemid;
    var CId = currentrowoftcpi[0].colorid;
    var SId = currentrowoftcpi[0].sizeid;
    var prod = currentrowoftcpi[0].procordid;

    if (Val > OrdBalQty) {
        //alert("OrderQty Should Not Greater then OrderBalanceQty..");
        var msg = 'Order quantity Should Not Greater then Order Balance quantity...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        $.each(ItmList, function () {
            if (this.sno == CSno) {
                this.Received_qty = 0;

            }
        });

        LoaditmTab(ItmList);
        return true;
    }
    $.each(ItmList, function () {
        if (this.sno == CSno) {
            this.Received_qty = Val;

        }
    });

    LoaditmTab(ItmList);

    var pid = [];
    var bal = [];
    var qty = [];
    for (var t = 0; t < jobdetsave.length; t++) {
        if (jobdetsave[t].Itemid == IId && jobdetsave[t].Colorid == CId && jobdetsave[t].Sizeid == SId && jobdetsave[t].processordid == prod) {
            pid.push(jobdetsave[t].sno);
            bal.push(jobdetsave[t].orderqty);
            qty.push(jobdetsave[t].Received_Qty);
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
    for (var u = 0; u < jobdetsave.length; u++) {
        for (var r = 0; r < pid.length; r++) {
            if (jobdetsave[u].sno == pid[r]) {
                jobdetsave[u].Received_Qty = qty[r];
            }
        }
    }

    colorempty = jobdetsave;

    colorempty = $.grep(colorempty, function (v) {
        return (v.Itemid === IId && v.Colorid === CId && v.Sizeid === SId && v.processordid === prod);
    });

    LoadJobdetTab(colorempty);

    jobdet = [];
    jobdet = colorempty;

}
//$(document).on('click', '.btnviewiputitem', function () {
//    debugger;
//    var table = $('#tblcbompdetails').DataTable();

//    var ItmId = table.row($(this).parents('tr')).data()["itemid"];
//    var ClrId = table.row($(this).parents('tr')).data()["colorid"];
//    var SzId = table.row($(this).parents('tr')).data()["sizeid"];
//    var PId = table.row($(this).parents('tr')).data()["procordid"];
//    var colorempty = [];
//    colorempty = jobdetsave;

//    colorempty = $.grep(colorempty, function (v) {
//        return (v.Itemid === ItmId && v.Colorid === ClrId && v.Sizeid === SzId && v.processordid === PId);
//    });

//    jobdet = colorempty;
//    LoadJobdetTab(jobdet);

//});


function save() {
    debugger;
    var res = validate();
    if (res == false) {
        return false;
    }

    var opchk = [];
    for (var y = 0; y < ItmList.length; y++) {
        if (ItmList[y].Received_qty > 0) {
            opchk.push(ItmList[y]);
        }
    }
    if (opchk.length == 0) {
        //alert('Please fill atleast any one qty...');
        var msg = 'Please fill atleast any one quantity...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }


    $.each(ItmList, function () {
        this.closed = 'N';
        this.IPMarkup_rate = 0.00;
        this.OPMarkup_Rate = 0.00;
        this.Sec_Qty = 1;
        this.Invoice_Qty = 0.00;
        this.IssuedSizeID = this.sizeid;
        this.ProcessOrdId = this.procordid;

    });
    $.each(jobdetsave, function () {
        this.LotNo = '';
        this.Sec_Qty = 1;
        this.DisRowId = 0;
        this.LotRowid = 0;
        this.IssLot = '';
        this.ProcessOrdDetid;
        this.ProcessOrdJobDetid;


    });

    var MSType = $('input[name="MSType"]:checked').attr('value');

    var storeunitid = 0;
    if (MSType == "S") {
        storeunitid = $('#ddlSMainStore').val();
    } else if (MSType == "M") {
        storeunitid = $('#ddlMSMMainStore').val();
    }


    if (storeunitid == 0 && ValidateProcessStore == "True") {
        //alert('Please select Store..');
        var msg = 'Please select Store...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    var ordtype = $('input[name="Revert"]:checked').attr('value');

    var oldrecpno = $('#txtReceiptno').val();

    table = "Process_Recpt_Mas",
    column = "proc_recpt_no",
    compId = CompanyId,
    Docum = 'PROCESS RECEIPT'

    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var newrecpno = result.Value;
            if (oldrecpno != newrecpno) {
                //alert('Recept No has been changed...');
                var msg = 'Recept Number has been changed...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                $('#txtReceiptno').val(result.Value);
            }

            var Obj = {
                // proc_recpt_masid:
                proc_recpt_no: $("#txtReceiptno").val(),
                proc_recpt_date: $("#txtReceiptDate").val(),//new Date($('#txtReceiptDate').val()),
                Recpt_Ref_date: $("#txtRefDate").val(),//new Date($('#txtRefDate').val()),
                Recpt_Ref_no: $("#txtRefNo").val(),
                remarks: $("#txtRemark").val(),
                OrderType: 'G',
                //StoreUnitID: $("#ddlMSMMainStore").val(),
                StoreUnitID: storeunitid,
                CreatedBy: Guserid,
                InwardNo: '',
                SupplierInvoiceNo: '',
                ExcldetoInv: 0,
                InspDate: $("#txtReceiptDate").val(),//new Date($('#txtReceiptDate').val()),//
                //InspNo: 'S',
                EWayDate: $("#txtReceiptDate").val(),//new Date($('#txtReceiptDate').val()),
                //EWayNo: 'O',       
                ProcDet: ItmList,
                ProcJobDet: jobdetsave,

            }
            $("#btnAdd").attr("disabled", true);
            LoadingSymb();
            $.ajax({
                url: "/GeneralProcessReceipt/Add",
                data: JSON.stringify(Obj),
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {
                    debugger;
                    if (result.Value == true) {
                        AddUserEntryLog('PROCESS', 'Group Process Receipt', 'ADD', $("#txtReceiptno").val());
                        //alert('Data Saved Successfully');
                        //window.location.href = "/GeneralProcessReceipt/GeneralProcessReceiptIndex";
                        var msg = 'Data Saved Successfully...';
                        var flg = 1;
                        var mod = 0;
                        var url = "/GeneralProcessReceipt/GeneralProcessReceiptIndex";
                        AlartMessage(msg, flg, mod, url);
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
    });
}


//Valdidation using jquery
function validate() {
    var isValid = true;
    if ($('#txtRefNo').val().trim() == "") {
        $('#txtRefNo').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtRefNo').css('border-color', 'lightgrey');
    }
    //if ($('#ddlMSMMainStore').val() == 0) {
    //    //$('#ddlMSMMainStore').css('border-color', 'Red');

    //    $('#ddlMSMMainStore').siblings(".select2-container").css('border', '1px solid red');
    //    isValid = false;
    //}
    //else {
    //    $('#ddlMSMMainStore').css('border-color', 'lightgrey');
    //}
    if ($('#ddlMSCompany').val() == 0) {
       // $('#ddlMSCompany').css('border-color', 'Red');
        $('#ddlMSCompany').siblings(".select2-container").css('border', '1px solid red');
        isValid = false;
    }
    else {
        $('#ddlMSCompany').css('border-color', 'lightgrey');
    }

    return isValid;
}



function LoadMaingrid() {
    debugger;

    var type = $('select#ddlMType option:selected').val();

    if (type == undefined) {
        type = "";
    }
    var proctype = $('input[name="optwrkordmain"]:checked').attr('value');


    if (proctype == 'P') {
        var SuppId = $('#ddlSuplier').val();
        if (SuppId == null || SuppId == "0") {
            SuppId = 0;
        }

    }
    else if (proctype == 'W') {
        var SuppId = $('#ddlWorkDiv').val();
        if (SuppId == null || SuppId == "0") {
            SuppId = 0;
        }
    }
    var ordNo = "";
 

    var RecNo = "";
    var RNo = $('select#ddlMreceptno option:selected').val();

    if (RNo == 0 || RNo == undefined) {
        RecNo = "";
    }
    else {

        RecNo = $('select#ddlMreceptno option:selected').val();
    }


    var DCNo = "";
    var DNo = $('select#ddlMDCNo option:selected').val();

    if (DNo == 0 || DNo == undefined) {
        DCNo = "";
    }
    else {

        DCNo = $('select#ddlMDCNo option:selected').val();
    }


    var CompId = $('#ddlMCompany').val();

    if (CompId == null) {
        CompId = DCompid;
    } else {
        CompId = $('#ddlMCompany').val();
    }

    var Unit = $('#ddlMUnit').val();
    if (Unit == null || Unit == "0") {
        Unit = 0;
    }
    var prid = 0;
    var process = $('#ddlMProcess').val();
    if (process == null || process == "0") {
        process = 0;
    }
    var buyer = $('#ddlMBuyer').val();
    if (buyer == null || buyer == "0") {
        buyer = 0;
    }
    var mas = 0;
    var prid = 0;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    if (ChkComp) {
        RecNo = "";
        DCNo = "";
        Unit = 0;
        process = 0;
        buyer = 0;
    }

    var menufilter = CompId + ',' + process + ',' + Unit + ',' + buyer + ',' + mas + ',' + prid + ',' + ordNo + ',' + proctype + ',' + type + ',' + DCNo + ',' + RecNo + ',' + FDate + ',' + TDate + ',' + SuppId;
    localStorage.setItem('GeneralProcessReceiptMainFilter', menufilter);

    $.ajax({
        url: "/GeneralProcessReceipt/LoadMaingrid",
        data: JSON.stringify({ cmpid: CompId, processid: process, unitid: Unit, buyerid: buyer, masid: mas, prodordid: prid, jobordno: ordNo, processortype: proctype, type: type, dcno: DCNo, recptno: RecNo, fromDate: FDate, todate: TDate, processorid: SuppId }),
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
                         { title: "ProcessRecptid", "visible": false },
                         { title: "Receipt No" },
                         { title: "Receipt Date" },
                         { title: "Unit" },
                         { title: "Process" },
                         { title: "DC No" },
                         { title: "Type", "visible": false },
                         { title: "Processor" },
                         { title: "Action" },


                ]

            });

            ddlmain();
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
            
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}


function LoadMaingridFromBack() {
    debugger;
    var fill = localStorage.getItem('GeneralProcessReceiptMainFilter');
    var fillobj = [];
    fillobj = fill.split(",");

    $('#txtFromDate').val(fillobj[11]);
    $('#txtToDate').val(fillobj[12]);

    if (fillobj[7] == 'P') {
        $('#MP').prop('checked', true);
    } else {
        $('#MW').prop('checked', true);
    }

    var Typ = $('input[name="optwrkordmain"]:checked').attr('value');
    if (Typ == 'P') {
        $("#FilSupp").show();
        $("#FilWorkDiv").hide();
    } else {
        $("#FilWorkDiv").show();
        $("#FilSupp").hide();
    }

    if (fillobj[6] == "undefined") {
        fillobj[6] = '';
    }
    if (fillobj[9] == "undefined") {
        fillobj[9] = '';
    }
    if (fillobj[10] == "undefined") {
        fillobj[10] = '';
    }
    if (fillobj[1] == "undefined") {
        fillobj[1] = 0;
    }
    if (fillobj[2] == "undefined") {
        fillobj[2] = 0;
    }
    if (fillobj[3] == "undefined") {
        fillobj[3] = 0;
    }
    if (fillobj[4] == "undefined") {
        fillobj[4] = 0;
    }
    if (fillobj[5] == "undefined") {
        fillobj[5] = 0;
    }
    if (fillobj[13] == "undefined") {
        fillobj[13] = 0;
    }
   
    if (ChkComp) {
        RecNo = "";
        DCNo = "";
        Unit = 0;
        process = 0;
        buyer = 0;
    }

    $.ajax({
        url: "/GeneralProcessReceipt/LoadMaingrid",
        data: JSON.stringify({ cmpid: fillobj[0], processid: fillobj[1], unitid: fillobj[2], buyerid: fillobj[3], masid: fillobj[4], prodordid: fillobj[5], jobordno: fillobj[6], processortype: fillobj[7], type: fillobj[8], dcno: fillobj[9], recptno: fillobj[10], fromDate: fillobj[11], todate: fillobj[12], processorid: fillobj[13] }),
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
                         { title: "ProcessRecptid", "visible": false },
                         { title: "Receipt No" },
                         { title: "Receipt Date" },
                         { title: "Unit" },
                         { title: "Process" },
                         { title: "DC No" },
                         { title: "Type", "visible": false },
                         { title: "Processor" },
                         { title: "Action" },


                ]

            });

            ddlmain();
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

        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function ddlmain() {
    var type = $('select#ddlMType option:selected').val();

    if (type == undefined) {
        type = "";
    }
    var proctype = $('input[name="optwrkordmain"]:checked').attr('value');

    if (proctype == 'P') {
        var SuppId = $('#ddlSuplier').val();
        if (SuppId == null || SuppId == "0") {
            SuppId = 0;
        }
    }
    else if (proctype == 'W') {
        var SuppId = $('#ddlWorkDiv').val();
        if (SuppId == null || SuppId == "0") {
            SuppId = 0;
        }
    }

    if (proctype == 'P') {
        var SuppId = $('#ddlSuplier').val();
        if (SuppId == null || SuppId == "0") {
            SuppId = 0;
        }
    }
    else if (proctype == 'W') {
        var SuppId = $('#ddlWorkDiv').val();
        if (SuppId == null || SuppId == "0") {
            SuppId = 0;
        }
    }
    var ordNo = "";
    var RecNo = "";
    var RNo = $('select#ddlMreceptno option:selected').val();

    if (RNo == 0 || RNo == undefined) {
        RecNo == "";
    }
    else {

        RecNo = $('select#ddlMreceptno option:selected').val();
    }


    var DCNo = "";
    var DNo = $('select#ddlMDCNo option:selected').val();

    if (DNo == 0 || DNo == undefined) {
        DCNo == "";
    }
    else {

        DCNo = $('select#ddlMDCNo option:selected').val();
    }

    var CompId = $('#ddlMCompany').val();

    if (CompId == null) {
        CompId = DCompid;
    } else {
        CompId = $('#ddlMCompany').val();
    }

    var Unit = $('#ddlMUnit').val();
    if (Unit == null || Unit == undefined) {
        Unit = 0;
    }
    var prid = 0;
    var process = $('#ddlMProcess').val();
    if (process == null || process == undefined) {
        process = 0;
    }
    var buyer = $('#ddlMBuyer').val();
    if (buyer == null || buyer == undefined) {
        buyer = 0;
    }
    var mas = 0;
    var prid = 0;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    $.ajax({
        url: "/GeneralProcessReceipt/LoadMaingriddet",
        data: JSON.stringify({ cmpid: CompId, processid: process, unitid: Unit, buyerid: buyer, masid: mas, prodordid: prid, jobordno: ordNo, processortype: proctype, type: type, dcno: DCNo, recptno: RecNo, fromDate: FDate, todate: TDate, processorid: SuppId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            var obj = json.Value;
            if (json.Status == 'SUCCESS') {
                var data = json.Value;



                var compdet = {};
                var comp = [];
                var recptdet = {};
                var recpt = [];
                var dcdet = {};
                var dc = [];
                var procdet = {};
                var proc = [];
                var unitdet = {};
                var unit = [];
                var suppdet = {};
                var supp = [];
                $.each(obj, function (i, el) {

                    if (!compdet[el.companyid]) {
                        compdet[el.companyid] = true;
                        comp.push(el);
                    }

                    if (!recptdet[el.proc_recpt_no]) {
                        recptdet[el.proc_recpt_no] = true;
                        recpt.push(el);
                    }

                    if (!dcdet[el.Recpt_Ref_no]) {
                        dcdet[el.Recpt_Ref_no] = true;
                        dc.push(el);
                    }

                    if (!procdet[el.processid]) {
                        procdet[el.processid] = true;
                        proc.push(el);
                    }

                    if (!unitdet[el.unitid]) {
                        unitdet[el.unitid] = true;
                        unit.push(el);
                    }
                    if (!suppdet[el.supplierid]) {
                        suppdet[el.supplierid] = true;
                        supp.push(el);
                    }
                });

                if (ChkRecpt || ChkComp || DtChk) {
                    $('#ddlMreceptno').empty();
                    $(ddlMreceptno).append($('<option/>').val('0').text('--Select ReceiptNo--'));
                    $.each(recpt, function () {
                        $(ddlMreceptno).append($('<option></option>').text(this.proc_recpt_no));
                    });
                }

                if (ChkDCNo || ChkComp || DtChk) {
                    $('#ddlMDCNo').empty();
                    $(ddlMDCNo).append($('<option/>').val('0').text('--Select DCNo--'));
                    $.each(dc, function () {
                        $(ddlMDCNo).append($('<option></option>').text(this.Recpt_Ref_no));
                    });
                }
                if (ChkSupplier || ChkComp || DtChk) {
                    var proctype = $('input[name="optwrkordmain"]:checked').attr('value');
                    if (proctype == 'P') {
                        $(ddlSuplier).empty();
                        $(ddlSuplier).append($('<option/>').val('0').text('--Select Supplier--'));
                        $.each(supp, function () {
                            $(ddlSuplier).append($('<option></option>').val(this.supplierid).text(this.supplier));
                        });
                    }
                    else if (proctype == 'W') {
                        $(ddlWorkDiv).empty();
                        $(ddlWorkDiv).append($('<option/>').val('0').text('--Select WorkDiv--'));
                        $.each(supp, function () {
                            $(ddlWorkDiv).append($('<option></option>').val(this.supplierid).text(this.supplier));
                        });
                    }
                }
            
                if (ChkProcess || ChkComp || DtChk) {
                    $('#ddlMProcess').empty();
                    $(ddlMProcess).append($('<option/>').val('0').text('--Select Processs--'));
                    $.each(proc, function () {
                        $(ddlMProcess).append($('<option></option>').val(this.processid).text(this.process));
                    });
                }
                if (ChkUnit || ChkComp || DtChk) {
                    $('#ddlMunit').empty();
                    $(ddlMunit).append($('<option/>').val('0').text('--Select Unit--'));
                    $.each(unit, function () {
                        $(ddlMunit).append($('<option></option>').val(this.unitid).text(this.unit));
                    });
                }

            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function CMainlist() {
    $('#tblmaindetails').DataTable().destroy();
     ChkRecpt = true;
     ChkProcess = true;
     DtChk = false;
     ChkDCNo = true;
     ChkUnit = true;
     ChkComp = true;
     ChkSupplier = true;
    var Typ = $('input[name="optwrkordmain"]:checked').attr('value');
     if (Typ == 'P') {
         $("#FilSupp").show();
         $("#FilWorkDiv").hide();
     } else {
         $("#FilWorkDiv").show();
         $("#FilSupp").hide();
     }
    LoadMaingrid();
}
function SPMainlist() {
    $('#tblmaindetails').DataTable().destroy();

    DtChk = false;
    ChkSupplier = false;
    ChkRecpt = true;
    ChkComp = false;
    ChkProcess = true;
    ChkDCNo = true;
    ChkUnit = true;
    LoadMaingrid();
}

function PMainlist() {
    $('#tblmaindetails').DataTable().destroy();
    ChkRecpt = true;
    ChkProcess = false;
    DtChk = false;
    ChkDCNo = true;
    ChkUnit = false;
    ChkComp = false;
    LoadMaingrid();
}
function RCMainlist() {
    $('#tblmaindetails').DataTable().destroy();
    ChkRecpt = false;
    ChkProcess = false;
    DtChk = false;
    ChkDCNo = false;
    ChkUnit = false;
    ChkComp = false;
    LoadMaingrid();
}
function DCMainlist() {
    $('#tblmaindetails').DataTable().destroy();
    ChkRecpt = false;
    ChkProcess = false;
    DtChk = false;
    ChkDCNo = false;
    ChkUnit = false;
    ChkComp = false;
    LoadMaingrid();
}
function UMainlist() {
    $('#tblmaindetails').DataTable().destroy();
    ChkRecpt = true;
    ChkProcess = true;
    DtChk = false;
    ChkDCNo = true;
    ChkUnit = false;
    ChkComp = false;
    LoadMaingrid();
}

function getbyID(masid) {
    debugger;
    Masid = masid;
    //Produ
    var type = $('select#ddlMType option:selected').val();

    if (type == undefined) {
        type = "";
    }
    var proctype = $('input[name="optwrkordmain"]:checked').attr('value');

    if (proctype == 'P') {
        var SuppId = $('#ddlSuplier').val();
        if (SuppId == null || SuppId == "0") {
            SuppId = 0;
        }
    }
    else if (proctype == 'W') {
        var SuppId = $('#ddlWorkDiv').val();
        if (SuppId == null || SuppId == "0") {
            SuppId = 0;
        }
    }


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

    if (RNo == 0 || RNo == undefined) {
        RecNo == "";
    }
    else {

        RecNo = $('select#ddlMreceptno option:selected').val();
    }


    var DCNo = "";
    var DNo = $('select#ddlMDCNo option:selected').val();

    if (DNo == 0 || DNo == undefined) {
        DCNo == "";
    }
    else {

        DCNo = $('select#ddlMDCNo option:selected').val();
    }


    var CompId = $('#ddlMCompany').val();
    if (CompId == null || CompId == "0") {
        CompId = 0;
    }
    CompanyId = CompId;
    
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
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    $.ajax({
        url: "/GeneralProcessReceipt/LoadMaingriddet",
        data: JSON.stringify({ cmpid: CompId, processid: process, unitid: Unit, buyerid: buyer, masid: mas, prodordid: prid, jobordno: ordNo, processortype: proctype, type: type, dcno: DCNo, recptno: RecNo, fromDate: FDate, todate: TDate, processorid: SuppId }),
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

            $('#txtReceiptDate').val(moment(obj[0].proc_recpt_date).format("DD/MM/YYYY"));
            $('#txtRefDate').val(moment(obj[0].Recpt_Ref_date).format("DD/MM/YYYY"));
            $('#txtUnit').val(obj[0].unit);
            $('#txtProcess').val(obj[0].process);
            $('#txtProcessor').val(obj[0].supplier);
            $('#txtRefNo').val(obj[0].Recpt_Ref_no);
            $('#txtRemark').val(obj[0].remarks);
            $('#txtReceiptno').val(obj[0].proc_recpt_no);

            LoadProcessDetails(obj[0].processid);

            if (obj[0]["Storetype"] == 'SS') {
                $('#optSS').prop('checked', true);
                LoadSubStore();
                editsubmasunitstore = obj[0]["ParentUnitid"];
                editsubstore = obj[0]["StoreUnitID"];
                editmasunitstore = 0;
            }
            else {
                $('#optMS').prop('checked', true);
                LoadMainStore();
                editmasunitstore = obj[0]["StoreUnitID"];
                editsubmasunitstore = 0;
                editsubstore = 0;
            }
            LoadEmployeeStoreunit();
            LoadUserCompanyDDL();
            CheckAlloted();

            //var type = $('input[name="MSType"]:checked').attr('value');
            //if (type == 'M') {
            //    LoadMainStore();
            //}
            //if (type == 'S') {
            //    LoadSubStore();
            //}
            //if (type == 'E') {
            //    LoadSecStore();
            //}
            //CompanyId = obj[0].cmpid;
            //ProductionOrderno = obj[0].prodnord;
            //Companyunitid = obj[0].cmpunitid;

            //Processid = obj[0].processid;
            //Processorid = obj[0].processorid;
            LoadEditInputItm(masid);
            LoadEditInputJobdet(masid);
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}


function LoadEditInputItm(id) {
    debugger;

    $.ajax({
        url: "/GeneralProcessReceipt/Loadedititemdet",
        data: JSON.stringify({ pid: id }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            ItmList = result.Value;
            LoaditmTab(ItmList);
            Prodid = ItmList[0].procordid;
            Itmid = ItmList[0].itemid;
            Colorid = ItmList[0].colorid;
            Sizeid = ItmList[0].sizeid;
        }

    });
}

function LoadEditInputJobdet(id) {
    debugger;
    $.ajax({
        url: "/GeneralProcessReceipt/Loadeditjobdetdet",
        data: JSON.stringify({ pid: id }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            jobdetsave = result.Value;
            LoadJobdetSaveTab(jobdetsave);

            var colorempty = [];
            colorempty = jobdetsave;

            colorempty = $.grep(colorempty, function (v) {
                return (v.Itemid === Itmid && v.Colorid === Colorid && v.Sizeid === Sizeid && v.processordid === Prodid);

            });
            jobdet = [];
            jobdet = colorempty;
            LoadJobdetTab(colorempty);
        }

    });
}



function Update() {
    debugger;
    var res = validate();
    if (res == false) {
        return false;
    }

    //CheckDC();
    $.each(ItmList, function () {
        this.closed = 'N';
        this.IPMarkup_rate = 0.00;
        this.OPMarkup_Rate = 0.00;
        this.Sec_Qty = 1;
        this.Invoice_Qty = 0.00;
        this.IssuedSizeID = this.sizeid;
        this.ProcessOrdId = this.procordid;
        this.Proc_Recpt_Masid = Masid;

    });
    $.each(jobdetsave, function () {
        this.LotNo = '';
        this.Sec_Qty = 1;
        this.DisRowId = 0;
        this.LotRowid = 0;
        this.IssLot = '';
        this.Proc_Recpt_Masid = Masid;


    });

    var MSType = $('input[name="MSType"]:checked').attr('value');

    var storeunitid = 0;
    if (MSType == "S") {
        storeunitid = $('#ddlSMainStore').val();
    } else if (MSType == "M") {
        storeunitid = $('#ddlMSMMainStore').val();
    }

    if (storeunitid == 0 && ValidateProcessStore == "True") {
        //alert('Please select Store..');
        var msg = 'Please select Store...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    var ordtype = $('input[name="Revert"]:checked').attr('value');
    var Obj = {
        proc_recpt_masid: Masid,
        proc_recpt_no: $("#txtReceiptno").val(),
        proc_recpt_date: $("#txtReceiptDate").val(),//new Date($('#txtReceiptDate').val()),
        Recpt_Ref_date: $("#txtRefDate").val(),//new Date($('#txtRefDate').val()),
        Recpt_Ref_no: $("#txtRefNo").val(),
        remarks: $("#txtRemark").val(),
        OrderType: 'G',
        // StoreUnitID: $("#ddlMSMMainStore").val(),
        StoreUnitID: storeunitid,
        CreatedBy: Guserid,
        InwardNo: '',
        SupplierInvoiceNo: '',
        ExcldetoInv: 0,
        InspDate: $("#txtReceiptDate").val(),//new Date($('#txtReceiptDate').val()),//
        //InspNo: 'S',
        EWayDate: $("#txtReceiptDate").val(),//new Date($('#txtReceiptDate').val()),
        //EWayNo: 'O',       
        ProcDet: ItmList,
        ProcJobDet: jobdetsave,

    }
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/GeneralProcessReceipt/Update",
        data: JSON.stringify(Obj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Value == 1) {
                AddUserEntryLog('PROCESS', 'Group Process Receipt', 'UPDATE', $("#txtReceiptno").val());
                //alert('Data Updated Successfully');
                //window.location.href = "/GeneralProcessReceipt/GeneralProcessReceiptIndex";
                var msg = 'Data Updated Successfully...';
                var flg = 1;
                var mod = 0;
                var url = "/GeneralProcessReceipt/GeneralProcessReceiptIndex";
                AlartMessage(msg, flg, mod, url);
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


function getDeleteID(masid) {
    debugger;
    Masid = masid;
    //Produ
    var type = $('select#ddlMType option:selected').val();

    if (type == undefined) {
        type = "";
    }
    var proctype = $('input[name="optwrkordmain"]:checked').attr('value');

    if (proctype == 'P') {
        var SuppId = $('#ddlSuplier').val();
        if (SuppId == null || SuppId == "0") {
            SuppId = 0;
        }
    }
    else if (proctype == 'W') {
        var SuppId = $('#ddlWorkDiv').val();
        if (SuppId == null || SuppId == "0") {
            SuppId = 0;
        }
    }

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

    if (RNo == 0 || RNo == undefined) {
        RecNo == "";
    }
    else {

        RecNo = $('select#ddlMreceptno option:selected').val();
    }


    var DCNo = "";
    var DNo = $('select#ddlMDCNo option:selected').val();

    if (DNo == 0 || DNo == undefined) {
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
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    $.ajax({
        url: "/GeneralProcessReceipt/LoadMaingriddet",
        data: JSON.stringify({ cmpid: CompId, processid: process, unitid: Unit, buyerid: buyer, masid: mas, prodordid: prid, jobordno: ordNo, processortype: proctype, type: type, dcno: DCNo, recptno: RecNo, fromDate: FDate, todate: TDate, processorid: SuppId }),
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

            $('#txtReceiptDate').val(moment(obj[0].proc_recpt_date).format("DD/MM/YYYY"));
            $('#txtRefDate').val(moment(obj[0].Recpt_Ref_date).format("DD/MM/YYYY"));
            $('#txtUnit').val(obj[0].unit);
            $('#txtProcess').val(obj[0].process);
            $('#txtProcessor').val(obj[0].supplier);
            $('#txtRefNo').val(obj[0].Recpt_Ref_no);
            $('#txtRemark').val(obj[0].remarks);
            $('#txtReceiptno').val(obj[0].proc_recpt_no);

            var type = $('input[name="MSType"]:checked').attr('value');
            if (type == 'M') {
                LoadMainStore();
            }
            if (type == 'S') {
                LoadSubStore();
            }
            if (type == 'E') {
                LoadSecStore();
            }
            CheckAlloted();
            //CompanyId = obj[0].cmpid;
            //ProductionOrderno = obj[0].prodnord;
            //Companyunitid = obj[0].cmpunitid;

            //Processid = obj[0].processid;
            //Processorid = obj[0].processorid;
            LoadEditInputItm(masid);
            LoadEditInputJobdet(masid);
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}

function MasDelete() {
    debugger;
    $.each(ItmList, function () {
        this.closed = 'N';
        this.IPMarkup_rate = 0.00;
        this.OPMarkup_Rate = 0.00;
        this.Sec_Qty = 1;
        this.Invoice_Qty = 0.00;
        this.IssuedSizeID = this.sizeid;
        this.ProcessOrdId = this.procordid;
        this.Proc_Recpt_Masid = Masid;

    });
    $.each(jobdetsave, function () {
        this.LotNo = '';
        this.Sec_Qty = 1;
        this.DisRowId = 0;
        this.LotRowid = 0;
        this.IssLot = '';
        this.Proc_Recpt_Masid = Masid;


    });
    var ordtype = $('input[name="Revert"]:checked').attr('value');
    var Obj = {
        proc_recpt_masid: Masid,
        proc_recpt_no: $("#txtReceiptno").val(),
        proc_recpt_date: $("#txtReceiptDate").val(),//new Date($('#txtReceiptDate').val()),
        Recpt_Ref_date: $("#txtRefDate").val(),//new Date($('#txtRefDate').val()),
        Recpt_Ref_no: $("#txtRefNo").val(),
        remarks: $("#txtRemark").val(),
        OrderType: 'G',
        StoreUnitID: $("#ddlMSMMainStore").val(),
        CreatedBy: Guserid,
        InwardNo: '',
        SupplierInvoiceNo: '',
        ExcldetoInv: 0,
        InspDate: $("#txtReceiptDate").val(),//new Date($('#txtReceiptDate').val()),//
        //InspNo: 'S',
        EWayDate: $("#txtReceiptDate").val(),//new Date($('#txtReceiptDate').val()),
        //EWayNo: 'O',       
        ProcDet: ItmList,
        ProcJobDet: jobdetsave,

    }
    $("#btnDel").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/GeneralProcessReceipt/Delete",
        data: JSON.stringify(Obj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Value == true) {
                AddUserEntryLog('PROCESS', 'Group Process Receipt', 'DELETE', $("#txtReceiptno").val());
                //alert('Data Deleted Successfully');
                //window.location.href = "/GeneralProcessReceipt/GeneralProcessReceiptIndex";
                var msg = 'Data Deleted Successfully...';
                var flg = 2;
                var mod = 0;
                var url = "/GeneralProcessReceipt/GeneralProcessReceiptIndex";
                AlartMessage(msg, flg, mod, url);
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



function GenProcRecpt(Id) {
    debugger;
    debugger;
    Repid = Id;
    $('#myModal2').modal('show');

    docname = "PROCESS RECEIPT";
    GenerateReportItem(docname);
}


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
    var compid = $('#ddlMCompany').val();
    window.open("../ReportInline/Process/GeneralProcessReceipt/GeneralProcessReceiptInlineReport.aspx?Masid=" + Repid + "&RetLossdet=" + p[0] + "&Ins=" + p[1] + "&Lotdet=" + p[2] + "&Procord=" + p[3] + "&POdet=" + p[4] + "&Ewaybill=" + p[5] + "&Ewaydate=" + p[6] + "&Companyid=" + compid + "&Process=" + processname);

}

//function backtomain() {
//    $("#myModal2").hide();
//    $("#myModal2").modal('hide');
//}



$(document).ready(function () {

    $('#tblcbompdetails').on('click', 'tr', function (e) {
        debugger;

        var table = $('#tblcbompdetails').DataTable();
        var row = $(this).closest('tr');
        var data = $('#tblcbompdetails').dataTable().fnGetData(row);


        var ItmId = data.itemid;//table.row($(this).parents('tr')).data()["StyleRowId"];
        var ClrId = data.colorid;//table.row($(this).parents('tr')).data()["ItemID"];
        var SzId = data.sizeid;//table.row($(this).parents('tr')).data()["ColorID"];
        var PId = data.procordid;//table.row($(this).parents('tr')).data()["SizeID"];
       

        var colorempty = [];
        colorempty = jobdetsave;

        colorempty = $.grep(colorempty, function (v) {
            return (v.Itemid === ItmId && v.Colorid === ClrId && v.Sizeid === SzId && v.processordid === PId);
        });

        jobdet = colorempty;
        LoadJobdetTab(jobdet);

       

    });
});

function ReportClose() {

    $('#myModal2').modal('hide');
}

function LoadEmployeeStoreunit() {
    debugger;
    if (UserName == 'superuser') {
        LoginUserid = 0;
    }

    $.ajax({
        url: "/StoreSetup/GetStoreRights",
        data: JSON.stringify({ Userid: LoginUserid, Storetype: 'M', Companyid: CompanyId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var data = result.Value;
            $(ddlMSMMainStore).empty();
            $(ddlMSMMainStore).append($('<option/>').val('0').text('--Select Store--'));
            $.each(data, function () {
                $(ddlMSMMainStore).append($('<option></option>').val(this.Storeid).text(this.StoreName));
            });
            $(ddlMSMMainStore).trigger("select2:updated");

            $(ddlSCompany).empty();
            $(ddlSCompany).append($('<option/>').val('0').text('--Select Store--'));
            $.each(data, function () {
                $(ddlSCompany).append($('<option></option>').val(this.Storeid).text(this.StoreName));
            });
            $(ddlSCompany).trigger("select2:updated");

            if (editsubmasunitstore > 0) {
                $('#ddlSCompany').val(editsubmasunitstore).trigger('change');
            }
            if (editmasunitstore > 0) {
                $('#ddlMSMMainStore').val(editmasunitstore).trigger('change');
            }
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

    $.ajax({
        url: "/StoreSetup/GetStoreRights",
        data: JSON.stringify({ Userid: LoginUserid, Storetype: 'B', Companyid: CompanyId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var data = result.Value;
            $(ddlSMainStore).empty();
            $(ddlSMainStore).append($('<option/>').val('0').text('--Select Store--'));
            $.each(data, function () {
                $(ddlSMainStore).append($('<option></option>').val(this.Storeid).text(this.StoreName));
            });
            $(ddlSMainStore).trigger("select2:updated");
            if (editsubstore > 0) {
                $('#ddlSMainStore').val(editsubstore).trigger('change');
            }
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });


}

function LoadUserCompanyDDL() {
    debugger;
    httpGet("/Company/GetCompany", onUserCompanySuccess, onUserCompanyFailure);
}

function onUserCompanySuccess(result) {
    if (result.Status == "SUCCESS") {

        var data = result.Value;
        var comp = [];
        $.each(data, function (i) {
            if (data[i].CompanyId == CompanyId) {
                comp.push(data[i]);
            }
        });

        $(ddlMSCompany).empty();
        // $(ddlMSCompany).append($('<option/>').val('0').text('--Select Company--'));
        $.each(comp, function () {
            $(ddlMSCompany).append($('<option></option>').val(this.CompanyId).text(this.CompanyName));
        });
        $(ddlMSCompany).trigger("select2:updated");
    }
    else {
        //alert('Company loading failed');
        var msg = 'Company loading failed...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
    }
}

function onUserCompanyFailure(result) {

    //alert('Company loading failed');
    var msg = 'Company loading failed...';
    var flg = 4;
    var mod = 1;
    var url = "";
    AlartMessage(msg, flg, mod, url);
}


function LoadProcessDetails(Processid) {

    debugger;

    $.ajax({
        url: "/Allowance/LoadDataAlloProcessDetails",
        data: JSON.stringify({ ProcessId: Processid }),
        type: "POST",
        async: false,
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            AllowList = result;

            pallown = AllowList[0].PQuantity
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}

function CheckAlloted() {

    var Recpno = $('#txtReceiptno').val();

    $.ajax({
        url: "/PurchaseQuality/LoadQltyCheckItemEditDetails",
        data: JSON.stringify({ RecNo: Recpno }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            AllotedItemList = result;
            if (AllotedItemList.length > 0) {


                for (var x = 0; x < AllotedItemList.length; x++) {

                    //alert("Stock is alloted for " + AllotedItemList[x].CTransNo + ",Please Check it....")
                    var msg = "Stock is alloted for " + AllotedItemList[x].CTransNo + ",Please Check it...";
                    var flg = 4;
                    var mod = 1;
                    var url = "";
                    AlartMessage(msg, flg, mod, url);
                    $("#btnUpdate").attr('disabled', true);
                    $("#btnDel").attr('disabled', true);
                    $('#btnAdd').hide();
                    return true;
                }

            }


        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadItemMovements(GrnNo) {
    debugger;

    $.ajax({
        url: "/GRNMain/LoadItemstockMovement/",
        data: JSON.stringify({ GrnNo: GrnNo }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            ItemMovementList = (result.Value);

            loadItemMovementTable(ItemMovementList);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function loadItemMovementTable(ItemMovementList) {
    debugger;
    // $('#tblcompdetails').DataTable().destroy();
    var inputcount = 0;
    $('#tblItemMovementdetails tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tblItemMovementdetails').DataTable().destroy();
    }
    $('#tblItemMovementdetails').empty();

    $('#tblItemMovementdetails').DataTable({

        data: ItemMovementList,
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
             //{ title: "Trims SlNo", data: "TrimsSlNo", "visible": false },
            { title: "Trans No", data: "transno" },
            { title: "Item", data: "Item" },
            { title: "Color", data: "Color" },
            { title: "Size", data: "Size" },
            { title: "Order No", data: "OrderNo", visible: false },
            { title: "Quantity", data: "Quantity" },
            { title: "Stock Qty", data: "StockQty" },
            { title: "UOM", data: "Uom" },
            { title: "Issue No", data: "IssueNo" },
            { title: "Date", data: "IssueDate" },
            { title: "IssueQty", data: "IssueQty" },
            { title: "Store Name", data: "StoreName" },
               //{
               //    title: "ACTION", "mDataProp": null,

               //    "render": function (data, type, row, meta) {
               //        if (data.Rate > "0") {
               //            return '<div style="display:inline-flex"><button type="button" disabled="disabled" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" id="btntrimsedit" class="btntrimsedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" disabled="disabled" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btntrimsremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div>'
               //        } else { return '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" id="btntrimsedit" class="btntrimsedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btntrimsremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div>' }
               //    }


               //}
        ]
    });


    $("#tblItemMovementdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblItemMovementdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}