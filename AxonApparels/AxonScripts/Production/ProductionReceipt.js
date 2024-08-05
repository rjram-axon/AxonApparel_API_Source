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
var Userid = 0;
var UserName = 0;
var MainFDate = 0;
var repobj = [];
var Repid = 0;
var Guserid = 0;
var PrType = 0;
var OrType = 0;
var DCompid = 0;
var ChkRcptno = true;
var ChkOrdno = true;
var DtChk = false;
var ChkProcess = true;
var ChkBuyer = true;
var ChkDCNo = true;
var ChkComp = false;
var LoginUserid = '';
var editmasunitstore = 0;
var editsubmasunitstore = 0;
var editsubstore = 0;
var ValidateProductionStore = "False";
//var ValiSewingBudApp = '';
var retchk = '';
var ValiCutBudApp = '';
var ValiCutBudAppSam = 0;
var OrderType = '';

var MainList_barcode = [];
var MainList_barcodeScanList = [];

$(document).ready(function () {
    debugger;
    LoadCompanyDDL("#ddlMCompany,#ddlCompany");
    LoadCompanyUnitDDL("#ddlMunit,#ddlUnit");
    LoadWorkdivisionDDL("#ddlwrkdivision");
    LoadSupplierDDL("#ddlprocessor");
    //LoadWorkdivisionDDL("#ddlwrkdiv");
    //LoadSupplierDDL("#ddlSupplier");

    Guserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    MainFDate = $("#hdMainFromDate").data('value');
    DCompid = $("#hdnDCompid").data('value');
    LoginUserid = $("#hdnLoginUserid").data('value');
    //ValiSewingBudApp = $("#hdnCostBudCutAppid").data('value');
    ValiCutBudApp = $("#hdnCostBudCutAppid").data('value');
    ValiCutBudAppSam = $("#hdnCostBudCutAppSamid").data('value');
    ValidateProductionStore = $("#hdnValidateProductionStore").data('value');

    LoadWrkdiv();
    LoadProcessor();
    //LoadBuyerDDL("#ddlinnerbuyer");
    getDate();
    ddlmain();
    var fill = localStorage.getItem('SewingReceiptMainFilter');
    if (fill != "null" && fill != null) {
        LoadMaingridFromBack();
    } else {
        LoadMaingrid();
    }
    //LoadMaingrid();
    LoadMaingridord();

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
                    if (entrygriddet[d].productionordid == val) {
                        entrygriddet[d].CheckLoad = "Y";
                    }
                }

            }
            else {
                var val = $(this).val();
                for (var d = 0; d < entrygriddet.length; d++) {
                    if (entrygriddet[d].productionordid == val) {
                        entrygriddet[d].CheckLoad = "N";
                    }

                }
            }

        });

    });

    $(document).on('keyup', '.calcipAmt', function () {
        debugger;
        var table = $('#tblcbompdetails').DataTable();


        var CSno = table.row($(this).parents('tr')).data()["sno"];
        var IId = table.row($(this).parents('tr')).data()["itemid"];
        var CId = table.row($(this).parents('tr')).data()["colorid"];
        var SId = table.row($(this).parents('tr')).data()["sizeid"];
        var OrdBalQty = table.row($(this).parents('tr')).data()["bal"];
        var prod = table.row($(this).parents('tr')).data()["productionordid"];

        var Val = $(this).val();    
        var IssQty = Val;
        if (Val > OrdBalQty) {
            //alert("OrderQty Should Not Greater then OrderBalanceQty..");
            var msg = 'Order quantity Should Not Greater then Order Balance quantity...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);

            //finalresult = res.toFixed(2);
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
            if (jobdetsave[t].Itemid == IId && jobdetsave[t].Colorid == CId && jobdetsave[t].Sizeid == SId && jobdetsave[t].productionordid == prod) {
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
            return (v.Itemid === IId && v.Colorid === CId && v.Sizeid === SId && v.productionordid === prod);
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
                if (sn == CSno && $(this).val() == IssQty) {
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
        var rate = table.row($(this).parents('tr')).data()["apprate"];
        var val = $(this).val();
        if (ValiCutBudApp == 'Y' && OrderType=='W') {
            if (val <= rate) {
                $.each(ItmList, function () {
                    if (this.sno == CSno) {
                        this.rate = val;

                    }
                });
            }
            else {
                //alert('Should not exceed BudgetRate...');
                var msg = 'Should not exceed BudgetRate...';
                var flg = 4;
                var mod = 1;
                var ur = "";
                AlartMessage(msg, flg, mod, ur);
                $.each(ItmList, function () {
                    if (this.sno == CSno) {
                        this.rate = this.apprate;

                    }
                });
                var table = $('#tblcbompdetails').DataTable();
                var data = table.rows().data();

                $('input[id=txtrate]').each(function (ig) {
                    if (data[ig].sno == CSno) {
                        var row = $(this).closest('tr');
                        row.find('#txtrate').val(data[ig].apprate);

                    }
                });
                return true;
            }
        } else if (ValiCutBudAppSam == 'Y' && OrderType == 'S') {


            if (val <= rate) {
                $.each(ItmList, function () {
                    if (this.sno == CSno) {
                        this.rate = val;

                    }
                });
            }
            else {
                //alert('Should not exceed BudgetRate...');
                var msg = 'Should not exceed BudgetRate...';
                var flg = 4;
                var mod = 1;
                var ur = "";
                AlartMessage(msg, flg, mod, ur);
                $.each(ItmList, function () {
                    if (this.sno == CSno) {
                        this.rate = this.apprate;

                    }
                });
                var table = $('#tblcbompdetails').DataTable();
                var data = table.rows().data();

                $('input[id=txtrate]').each(function (ig) {
                    if (data[ig].sno == CSno) {
                        var row = $(this).closest('tr');
                        row.find('#txtrate').val(data[ig].apprate);

                    }
                });
                return true;
            }

        }
        else {

            $.each(ItmList, function () {
                if (this.sno == CSno) {
                    this.rate = val;

                }
            });

            //LoaditmTab(ItmList);
            var table = $('#tblcbompdetails').DataTable();
            var data = table.rows().data();

            $('input[id=txtrate]').each(function (ig) {
                if (data[ig].sno == CSno) {
                    var row = $(this).closest('tr');
                    row.find('#txtrate').val(val);

                }
            });
        }
        ////Datatable textbox focus
        //var rows = $("#tblcbompdetails").dataTable().fnGetNodes();
        //var dtTable = $('#tblcbompdetails').DataTable();
        //for (var i = 0; i < rows.length; i++) {
        //    var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
        //    $('input[id=txtrate]').each(function () {
        //        if (sn == CSno && $(this).val() == val) {
        //            var row = $(this).closest('tr');
        //            var num = row.find('#txtrate').val();
        //            row.find('#txtrate').focus().val('').val(num);
        //            return true;
        //        }
        //    });
        //}
    });
    $(document).on('keyup', '.calcsepquan', function () {
        debugger;
        var table = $('#tbljobordinfo').DataTable();
    
        var poid = table.row($(this).parents('tr')).data()["productionordid"];
        var pid = table.row($(this).parents('tr')).data()["sno"];
        var itmid = table.row($(this).parents('tr')).data()["Itemid"];
        var colorid = table.row($(this).parents('tr')).data()["Colorid"];
        var sizeid = table.row($(this).parents('tr')).data()["Sizeid"];
        var balq = table.row($(this).parents('tr')).data()["bal"];
       
        var value = $(this).val();
        var IssQty = value;


        var Val = $(this).val();
        var IssQty = Val;
        if (Val > balq) {
            //alert("OrderQty Should Not Greater then OrderBalanceQty..");
            var msg = 'Order quantity Should Not Greater then Order Balance quantity...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);


            //finalresult = res.toFixed(2);
            $.each(jobdetsave, function () {
                if (this.sno == pid) {
                    this.Received_Qty = 0;

                }
            });

            colorempty = jobdetsave;
            colorempty = $.grep(colorempty, function (v) {
                return (v.Itemid === itmid && v.Colorid === colorid && v.Sizeid === sizeid && v.sno === pid);
            });

          


            //$.each(ItmList, function () {
            //    if (this.productionordid == poid) {
            //        this.Received_qty = 0;

            //    }
            //});

            var totalamnt = 0;

            for (var e = 0; e < jobdetsave.length; e++) {
                if (jobdetsave[e].Itemid == itmid && jobdetsave[e].Sizeid == sizeid && jobdetsave[e].Colorid == colorid && jobdetsave[e].sno == pid) {
                    var amount = jobdetsave[e].Received_Qty;
                    totalamnt = totalamnt + parseFloat(amount);
                }
            }
            $.each(ItmList, function () {
                if (this.itemid == itmid && this.sizeid == sizeid && this.colorid == colorid && this.productionordid == poid) {
                    this.Received_qty = totalamnt;
                }
            });
            LoaditmTab(ItmList);
            LoadJobdetTab(colorempty);
            return true;
        }


        $.each(jobdetsave, function () {
            if (this.sno == pid) {


                if (balq >= value) {
                    this.Received_Qty = value;
                }
                else {
                    var t = value - balq;
                    this.Received_Qty = balq;
                }

            }
        });


        var totalamnt = 0;

        for (var e = 0; e < jobdetsave.length; e++) {
            if (jobdetsave[e].Itemid == itmid && jobdetsave[e].Sizeid == sizeid && jobdetsave[e].Colorid == colorid && jobdetsave[e].sno == pid) {
                var amount = jobdetsave[e].Received_Qty;
                totalamnt = totalamnt + parseFloat(amount);
            }
        }
        $.each(ItmList, function () {
            if (this.itemid == itmid && this.sizeid == sizeid && this.colorid == colorid) {
                this.Received_qty = totalamnt;
            }
        });

        colorempty = jobdetsave;
        colorempty = $.grep(colorempty, function (v) {
            return (v.Itemid === itmid && v.Colorid === colorid && v.Sizeid === sizeid && v.sno === pid);
        });

        LoadJobdetTab(colorempty);
        LoaditmTab(ItmList);

        //Datatable textbox focus
        var rows = $("#tbljobordinfo").dataTable().fnGetNodes();
        var dtTable = $('#tbljobordinfo').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
            $('input[id=txtOpjobOrdQty]').each(function () {
                if (sn == pid && $(this).val() == IssQty) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtOpjobOrdQty').val();
                    row.find('#txtOpjobOrdQty').focus().val('').val(num);
                    return true;
                }
            });
        }
    });

    $('#tblmaindetails').on('click', 'tr', function (e) {
        debugger;

        var table = $('#tblmaindetails').DataTable();

        var row = $(this).closest('tr');
        var data = $('#tblmaindetails').dataTable().fnGetData(row);
        var ProcessOrdNo = data[1];
        LoadItemMovements(ProcessOrdNo);
    });

});

function ClearTextbox() {
    debugger;
    //$('#ddlCompany').val("0");
    //$('#ddlUnit').val("0");
    $('#ddlColor').val("0");
    //$('#ddlProcess').val("0");
    $('#ddlwrkdiv').val("0");
    $('#ddlBuyer').val("0");
    $('#ddlProcess').val("0");
    $('#ddlSupplier').val("0");
    $('#ddlOrderNo').val("0");
    $('#ddlIssueNo').val("0");
    $('#ddlRefNo').val("0");
    $('#ddlinnerbuyer').val("0");
    var protype = $('input[name="optwrkord"]:checked').attr('value');
    if (protype == 'P') {

        $('#supp').show();
        $("#wrkdiv").hide();
    }
    else if (protype == 'W') {
        $('#supp').hide();
        $("#wrkdiv").show();
    }
    LoadAddgridddl();
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
    LoadAddgridddl();
}
function LoadProcess() {
    debugger;
    var cmpyid = $('select#ddlCompany option:selected').val();
    var cunitid = $('select#ddlUnit option:selected').val();
    if (cmpyid == 0) {
        //alert('Please select Company...');
        var msg = 'Please select Company...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        return true;
    }
    if (cunitid == 0) {
        //alert('Please select CompanyUnit...');
        var msg = 'Please select CompanyUnit...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        return true;
    }
    var protype = $('input[name="Revert"]:checked').attr('value');
    $.ajax({
        url: "/ProductionReceipt/Getprocess",
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


            }


        }

    });
}


function GenerateNumber() {
    debugger;

    table = "Production_Recpt_Mas",
    column = "prod_recpt_no",
    compId = CompanyId,
    Docum = 'PRODUCTION RECEIPT'

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
function LoadProcessor() {
    debugger;

    $.ajax({
        url: "/ProductionReceipt/Getprocessor",
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
        url: "/ProductionReceipt/GetWrkdiv",
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

function LoadIssueno() {
    debugger;
    var cmpyid = $('select#ddlCompany option:selected').val();
    var cunitid = $('select#ddlUnit option:selected').val();
    if (cmpyid == 0) {
        //alert('Please select Company...');
        var msg = 'Please select Company...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        return true;
    }
    if (cunitid == 0) {
        //alert('Please select CompanyUnit...');
        var msg = 'Please select CompanyUnit...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
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
    if (procrid == 0) {
        //alert('Please select Processor...');
        var msg = 'Please select Processor...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        return true;
    }
    $.ajax({
        url: "/ProductionReceipt/Getissueno",
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
                    $(ddlIssueNo).append($('<option></option>').val(this.productionordid).text(this.productionorder));
                });
                //}
            }

            LoadAddgrid();
            LoadOrderno();
            LoadColor();
        }

    });
}

function LoadOrderno() {
    debugger;
    var cmpyid = $('select#ddlCompany option:selected').val();
    var cunitid = $('select#ddlUnit option:selected').val();
    if (cmpyid == 0) {
        //alert('Please select Company...');
        var msg = 'Please select Company...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        return true;
    }
    if (cunitid == 0) {
        //alert('Please select CompanyUnit...');
        var msg = 'Please select CompanyUnit...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
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
    if (procrid == 0) {
        //alert('Please select Processor...');
        var msg = 'Please select Processor...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        return true;
    }
    $.ajax({
        url: "/ProductionReceipt/Loadorderno",
        data: JSON.stringify({ cmpid: cmpyid, cmpunitid: cunitid, processid: proid, processorid: procrid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            if (result.Status == 'SUCCESS') {

                // if (Mode == 0) {
                var data = result.Value;
                $(ddlOrderNo).empty();
                $(ddlOrderNo).append($('<option/>').val('0').text('--Select OrderNo--'));
                $.each(data, function () {
                    $(ddlOrderNo).append($('<option></option>').val(this.buymasid).text(this.orderno));
                });
                //}

                $(ddlRefNo).empty();
                $(ddlRefNo).append($('<option/>').val('0').text('--Select RefNo--'));
                $.each(data, function () {
                    $(ddlRefNo).append($('<option></option>').val(this.buymasid).text(this.refno));
                });
            }


        }

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
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        return true;
    }
    if (cunitid == 0) {
        //alert('Please select CompanyUnit...');
        var msg = 'Please select CompanyUnit...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
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
    if (procrid == 0) {
        //alert('Please select Processor...');
        var msg = 'Please select Processor...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        return true;
    }
    $.ajax({
        url: "/ProductionReceipt/Loadcolor",
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


function LoadAddgrid() {
    debugger;
    //var cmpyid = $('select#ddlCompany option:selected').val();
    //var cunitid = $('select#ddlUnit option:selected').val();
    //if (cmpyid == 0) {
    //    alert('Please select Company...');
    //    return true;
    //}
    //if (cunitid == 0) {
    //    alert('Please select CompanyUnit...');
    //    return true;
    //}
    //var proid = $('select#ddlProcess option:selected').val();
    var protype = $('input[name="optwrkord"]:checked').attr('value');
    var type = $('input[name="Revert"]:checked').attr('value');
    if (protype == 'P') {
        var procrid = $('select#ddlSupplier option:selected').val();
    }
    else if (protype == 'W') {
        var procrid = $('select#ddlwrkdiv option:selected').val();
    }
    if (procrid == null || procrid == "0") {
        procrid = 0;
    }
    var cl = 'N';


    var cmpyid = $('select#ddlCompany option:selected').val();
    if (cmpyid == null || cmpyid == "0") {
        cmpyid = 0;
    }

    var ref = "";
    var byid = $('select#ddlBuyer option:selected').val();
    if (byid == null || byid == "0") {
        byid = 0;
    }
    var cunitid = $('select#ddlUnit option:selected').val();
    if (cunitid == null || cunitid == "0") {
        cunitid = 0;
    }
    var procid = $('select#ddlProcess option:selected').val();
    if (procid == null || procid == "0") {
        procid = 0;
    }

    var clid = $('select#ddlColor option:selected').val();
    if (clid == null || clid == "0") {
        clid = 0;
    }

    var ordNo = "";
    var ONo = $('select#ddlOrderNo option:selected').val();

    if (ONo == 0 || ONo == undefined) {
        ordNo == "";
    }
    else {

        ordNo = $('select#ddlOrderNo option:selected').val();
    }


    var RfNo = "";
    var Rn = $('select#ddlRefNo option:selected').val();

    if (Rn == 0 || Rn == undefined) {
        RfNo == "";
    }
    else {

        RfNo = $('select#ddlRefNo option:selected').val();
    }
    $.ajax({
        url: "/ProductionReceipt/Loadaddgrid",
        data: JSON.stringify({ cmpid: cmpyid, cmpunitid: cunitid, processid: procid, processorid: procrid, ordtype: type, clsed: cl, buyerid: byid, refno: RfNo, ordno: ordNo, clid: clid, procrtype: protype }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            entrygriddet = result.Value;
            for (var d = 0; d < entrygriddet.length; d++) {
                entrygriddet[d].proddate = moment(entrygriddet[d].proddate).format("DD/MM/YYYY")
            }
            LoadEntrytab(entrygriddet);

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

    var txtBarcodeScan_productionorder = $('#txtBarcodeValue').val();

    for (var i = 0; i < MainList_barcodeScanList.length; i++) {

        if (MainList_barcodeScanList[i].productionorder == txtBarcodeScan_productionorder) {
            return;
        }
    }

    jQuery.each(MainList_barcode, function (i, val) {

        if (val.productionorder == txtBarcodeScan_productionorder) {

            var det = {
                productionordid: val.productionordid,
                productionorder: val.productionorder,
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
}

function LoadAddgridddl() {
    debugger;
    //var cmpyid = $('select#ddlCompany option:selected').val();
    //var cunitid = $('select#ddlUnit option:selected').val();
    //if (cmpyid == 0) {
    //    alert('Please select Company...');
    //    return true;
    //}
    //if (cunitid == 0) {
    //    alert('Please select CompanyUnit...');
    //    return true;
    //}
    //var proid = $('select#ddlProcess option:selected').val();
    var protype = $('input[name="optwrkord"]:checked').attr('value');
    var type = $('input[name="Revert"]:checked').attr('value');
    if (protype == 'P') {
        var procrid = $('select#ddlSupplier option:selected').val();
    }
    else if (protype == 'W') {
        var procrid = $('select#ddlwrkdiv option:selected').val();
    }
    if (procrid == null || procrid == "0") {
        procrid = 0;
    }
    var cl = 'N';


    var cmpyid = $('select#ddlCompany option:selected').val();
    if (cmpyid == null || cmpyid == "0") {
        cmpyid = 0;
    }

    var ref = "";
    var byid = $('select#ddlBuyer option:selected').val();
    if (byid == null || byid == "0") {
        byid = 0;
    }
    var cunitid = $('select#ddlUnit option:selected').val();
    if (cunitid == null || cunitid == "0") {
        cunitid = 0;
    }
    var procid = $('select#ddlProcess option:selected').val();
    if (procid == null || procid == "0") {
        procid = 0;
    }

    var clid = $('select#ddlColor option:selected').val();
    if (clid == null || clid == "0") {
        clid = 0;
    }

    var ordNo = "";
    var ONo = $('select#ddlOrderNo option:selected').val();

    if (ONo == 0 || ONo == undefined) {
        ordNo == "";
    }
    else {

        ordNo = $('select#ddlOrderNo option:selected').val();
    }


    var RfNo = "";
    var Rn = $('select#ddlRefNo option:selected').val();

    if (Rn == 0 || Rn == undefined) {
        RfNo == "";
    }
    else {

        RfNo = $('select#ddlRefNo option:selected').val();
    }
    $.ajax({
        url: "/ProductionReceipt/Loadaddgrid",
        data: JSON.stringify({ cmpid: cmpyid, cmpunitid: cunitid, processid: procid, processorid: procrid, ordtype: type, clsed: cl, buyerid: byid, refno: RfNo, ordno: ordNo, clid: clid, procrtype: protype }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            entrygriddet = result.Value;
            for (var d = 0; d < entrygriddet.length; d++) {
                entrygriddet[d].proddate = moment(entrygriddet[d].proddate).format("DD/MM/YYYY")
            }

            //Last Work
            //*******  LoadEntrytab(entrygriddet);

            MainList_barcode = entrygriddet;

            if (result.Status == 'SUCCESS') {

                var data = result.Value;


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
                var orddet = {};
                var ord = [];
                var refdet = {};
                var ref = [];
                var clrdet = {};
                var clr = [];
                $.each(data, function (i, el) {

                    if (!compdet[el.companyid]) {
                        compdet[el.companyid] = true;
                        comp.push(el);
                    }

                    if (!recptdet[el.processid]) {
                        recptdet[el.processid] = true;
                        recpt.push(el);
                    }

                    if (!dcdet[el.buyerid]) {
                        dcdet[el.buyerid] = true;
                        dc.push(el);
                    }


                    if (!unitdet[el.unitid]) {
                        unitdet[el.unitid] = true;
                        unit.push(el);
                    }

                    if (!orddet[el.orderno]) {
                        orddet[el.orderno] = true;
                        ord.push(el);
                    }

                    if (!refdet[el.refno]) {
                        refdet[el.refno] = true;
                        ref.push(el);
                    }

                    if (!clrdet[el.colorid]) {
                        clrdet[el.colorid] = true;
                        clr.push(el);
                    }
                });


                //$(ddlUnit).append($('<option/>').val('0').text('--Select Unit--'));
                //$.each(unit, function () {
                //    $(ddlUnit).append($('<option></option>').val(this.unitid).text(this.unit));
                //});


                $('#ddlProcess').empty();
                $('#ddlOrderNo').empty();
                $('#ddlRefNo').empty();
                $('#ddlinnerbuyer').empty();
                $('#ddlColor').empty();


                $(ddlProcess).append($('<option/>').val('0').text('--Select Process--'));
                $.each(recpt, function () {
                    $(ddlProcess).append($('<option></option>').val(this.processid).text(this.process));
                });

                //$(ddlCompany).append($('<option/>').val('0').text('--Select Company--'));
                //$.each(comp, function () {
                //    $(ddlCompany).append($('<option></option>').val(this.companyid).text(this.company));
                //});

                $(ddlOrderNo).append($('<option/>').val('0').text('--Select OrderNo--'));
                $.each(ord, function () {
                    $(ddlOrderNo).append($('<option></option>').text(this.orderno));
                });

                $(ddlRefNo).append($('<option/>').val('0').text('--Select RefNo--'));
                $.each(ref, function () {
                    $(ddlRefNo).append($('<option></option>').text(this.refno));
                });

                $(ddlinnerbuyer).append($('<option/>').val('0').text('--Select Buyer--'));
                $.each(dc, function () {
                    $(ddlinnerbuyer).append($('<option></option>').val(this.buyerid).text(this.buyer));
                });

                $(ddlColor).append($('<option/>').val('0').text('--Select Color--'));
                $.each(clr, function () {
                    $(ddlColor).append($('<option></option>').val(this.colorid).text(this.color));
                });

            }

        }

    });
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
                   { title: "Prodid", data: "productionordid", "visible": false },
                   { title: "P.ord.No", data: "productionorder" },
                   { title: "P.Date", data: "proddate" },
                   { title: "Processor", data: "processor" },
                   { title: "Ord Qty", data: "ordqty" },
                   { title: "Received", data: "recvdqty" },
                   { title: "Balance", data: "bal" },


                   {
                       title: "Group", data: "productionordid",
                       render: function (data) {

                           //return '<input type="checkbox" id="group" value=' + data + ' onclick="myfunc(this.value);">';

                           return '<input type="checkbox" id="groupbom" class="groupbom editor-active" checked value=' + data + ' >';

                           //LAST WORK *******
                           //return '<input type="checkbox" id="groupbom" class="groupbom editor-active" unchecked  value=' + data + ' >';
                       }
                   },

        ]

    });
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

            POrdID = POrdID + "," + entrygriddet[j].productionordid;

            list.push(entrygriddet[j]);
        }
    }


    if (list.length == 0) {
        //alert('Please select checkboxes for any one row..');
        var msg = 'Please select checkboxes for any one row...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        return true;
    }


    var type = $('input[name="optwrkord"]:checked').attr('value');
    if (type == 'P') {
        var sup = $('#ddlSupplier').val();
        var supp = $('select#ddlSupplier option:selected').text();
        Processorid = $('select#ddlSupplier option:selected').val();
        if (sup == 0) {
           // alert('Select Supplier');
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

    if (Processid == 0) {
        //alert('Select Process');


        $('#ddlProcess').siblings(".select2-container").css('border', '1px solid red');
        return true;
    }

    if (CompanyId == 0) {
        //alert('Select Company');
        $('#ddlCompany').siblings(".select2-container").css('border', '1px solid red');
        return true;
    }

    editmasunitstore = 0;
    editsubmasunitstore = 0;
    editsubstore = 0;
    LoadEmployeeStoreunit();
    LoadUserCompanyDDL();

    if (Companyunitid == 0) {
        //alert('Select Unit');

        $('#ddlUnit').siblings(".select2-container").css('border', '1px solid red');
        return true;
    }
    GenerateNumber();
    $('#myModal').hide();
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
    //var protype = $('input[name="type"]:checked').attr('value');
    //if (protype == 'W') {
    //Loadstkdet();
    //}
    //else if (protype == 'S') {
    //}
    var typ = $('input[name="type"]:checked').attr('value');
    OrderType = typ;

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
        url: "/ProductionReceipt/Loaditm",
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
        url: "/ProductionReceipt/Loadjobddet",
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

function backtomain() {
    //$('#myModal1').hide();
    //$('#myModal1').modal('hide');
    //$('#myModal').hide();
    //$('#myModal').modal('hide');
    window.location.href = "/ProductionReceipt/ProductionReceiptIndex";
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
        "bSort": false,
        columns: [
              { title: "SNo", data: "sno", "visible": false },
               { title: "P.Ord.No", data: "productionorder" },
                              { title: "Pid", data: "productionordid", "visible": false },
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
                     { title: "AppRate", data: "apprate" },
                   {
                       title: "Rate", data: "rate",
                       render: function (data) {

                           return '<input type="text" id="txtrate" class="calcrate form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                       },
                   },


                    //{
                    //    title: "View",// data: "jobordno",
                    //    render: function (data) {

                    //        return '<button type="button"  class="btnviewiputitem btn btn-round btn-info" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;"><i class="fa fa-eye"></i></button>';
                    //    }
                    //},
        ]

    });

    var table = $('#tblcbompdetails').DataTable();
    $("#tblcbompdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblcbompdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}

function LoadJobdetSaveTab(list) {
    $('#tbljobordinfosave').DataTable().destroy();

    $('#tbljobordinfosave').DataTable({
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
                   { title: "Prodid", data: "productionordid", "visible": false },
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
                   { title: "Prodid", data: "productionordid", "visible": false },
                   { title: "Itmid", data: "Itemid", "visible": false },
                   { title: "Clrid", data: "Colorid", "visible": false },
                   { title: "Sizeid", data: "Sizeid", "visible": false },
                   { title: "ProdProgNo", data: "ProdPrgNo" },
                   { title: "Job Ord No", data: "Job_Ord_No" },
                    { title: "Order No", data: "Order_No" },
                   { title: "Ref No", data: "Ref_No" },
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

    $('#tblcbompdetails').on('click', 'tr', function (e) {
        debugger;

        var table = $('#tblcbompdetails').DataTable();
        var row = $(this).closest('tr');
        var data = $('#tblcbompdetails').dataTable().fnGetData(row);
        

        var ItmId = data.itemid; //table.row($(this).parents('tr')).data()["itemid"];
        var ClrId = data.colorid; //table.row($(this).parents('tr')).data()["colorid"];
        var SzId = data.sizeid; //table.row($(this).parents('tr')).data()["sizeid"];
        var PId = data.productionordid; //table.row($(this).parents('tr')).data()["productionordid"];


        var colorempty = [];
            colorempty = jobdetsave;

            colorempty = $.grep(colorempty, function (v) {
                return (v.Itemid === ItmId && v.Colorid === ClrId && v.Sizeid === SzId && v.productionordid === PId);
            });

            jobdet = colorempty;
            LoadJobdetTab(jobdet);
    });
});


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



function save() {
    debugger;
    var res = validate();
    if (res == false) {
        return false;
    }


    var opchk = [];
    var ipchk = [];
    for (var y = 0; y < ItmList.length; y++) {
        if (ItmList[y].Received_qty > 0) {
            opchk.push(ItmList[y]);
        }
    }


    for (var u = 0; u < jobdetsave.length; u++) {
        if (jobdetsave[u].Received_Qty > 0) {
            ipchk.push(jobdetsave[u]);
        }
    }
    if (opchk.length == 0 || ipchk.length == 0) {
        //alert('Please fill atleast any one qty...');
        var msg = 'Please fill atleast any one quantity...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        return true;
    }
    if (ValiCutBudApp == 'Y' && OrderType=='W') {
        $.each(ItmList, function (e) {
            if (ItmList[e].Received_qty > 0) {
                if (ItmList[e].rate > 0 && ItmList[e].rate <= ItmList[e].apprate) {

                } else {
                    //alert('Please Check the Item Rate..');
                    var msg = 'Please Check the Item Rate...';
                    var flg = 4;
                    var mod = 1;
                    var ur = "";
                    AlartMessage(msg, flg, mod, ur);
                    retchk = "F";
                    return false;
                }
            }
        });
    }
    if (ValiCutBudAppSam == 'Y' && OrderType == 'S') {
        $.each(ItmList, function (e) {
            if (ItmList[e].Received_qty > 0) {
                if (ItmList[e].rate > 0 && ItmList[e].rate <= ItmList[e].apprate) {

                } else {
                    //alert('Please Check the Item Rate..');
                    var msg = 'Please Check the Item Rate...';
                    var flg = 4;
                    var mod = 1;
                    var ur = "";
                    AlartMessage(msg, flg, mod, ur);
                    retchk = "F";
                    return false;
                }
            }
        });
    }
    if (retchk == 'F') {
        return false;
    }


    $.each(ItmList, function () {
        this.closed = 'N';
        this.IPMarkup_rate = 0.00;
        this.OPMarkup_Rate = 0.00;
        this.Sec_Qty = 1;
        this.Invoice_Qty = 0.00;
        this.IssuedSizeID = this.sizeid;
        this.ProcessOrdId = this.productionordid;

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

    if (storeunitid == 0 && ValidateProductionStore == "True") {
        //alert('Please select Store..');
        var msg = 'Please select Store...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        return true;
    }

    var ordtype = $('input[name="Revert"]:checked').attr('value');
    debugger;

    table = "Production_Recpt_Mas",
    column = "prod_recpt_no",
    compId = CompanyId,
    Docum = 'PRODUCTION RECEIPT'

    var oldReceiptno = $("#txtReceiptno").val();
    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var newReceiptno = result.Value;
            if (oldReceiptno != newReceiptno) {
                //alert('Receipt No has been changed...');
                var msg = 'Receipt Number has been changed...';
                var flg = 4;
                var mod = 1;
                var ur = "";
                AlartMessage(msg, flg, mod, ur);
                $('#txtReceiptno').val(result.Value);
            }
            var Obj = {
                // prod_recpt_masid:
                prod_recpt_no: $("#txtReceiptno").val(),
                prod_recpt_date: $("#txtReceiptDate").val(),//new Date($('#txtReceiptDate').val()),
                Recpt_Ref_date: $("#txtRefDate").val(),//new Date($('#txtRefDate').val()),
                Recpt_Ref_no: $("#txtRefNo").val(),
                remarks: $("#txtRemark").val(),
                OrderType: ordtype,
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
                ProdDet: ItmList,
                ProdJobDet: jobdetsave,

            }
            $("#btnAdd").attr("disabled", true);

            LoadingSymb();
            $.ajax({
                url: "/ProductionReceipt/Add",
                data: JSON.stringify(Obj),
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {
                    debugger;
                    if (result.Value == true) {
                        AddUserEntryLog('Production', 'Sewing Receipt', 'ADD', $("#txtReceiptno").val());
                        //alert('Data Saved Successfully');
                        //window.location.href = "/ProductionReceipt/ProductionReceiptIndex";
                        var msg = 'Data Saved Successfully...';
                        var flg = 1;
                        var mod = 0;
                        var ur = "/ProductionReceipt/ProductionReceiptIndex";
                        AlartMessage(msg, flg, mod, ur);
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
    //   // $('#ddlMSMMainStore').css('border-color', 'Red');

    //    $('#ddlMSMMainStore').siblings(".select2-container").css('border', '1px solid red');
    //    isValid = false;
    //}
    //else {
    //    $('#ddlMSMMainStore').css('border-color', 'lightgrey');
    //}
    if ($('#ddlMSCompany').val() == 0) {
        //$('#ddlMSCompany').css('border-color', 'Red');
        $('#ddlMSCompany').siblings(".select2-container").css('border', '1px solid red');
        isValid = false;
    }
    else {
        $('#ddlMSCompany').css('border-color', 'lightgrey');
    }

    return isValid;
}

function Update() {
    debugger;
    var res = validate();
    if (res == false) {
        return false;
    }
    
    var opchk = [];
    var ipchk = [];
    for (var y = 0; y < ItmList.length; y++) {
        if (ItmList[y].Received_qty > 0) {
            opchk.push(ItmList[y]);
        }
    }


    for (var u = 0; u < jobdetsave.length; u++) {
        if (jobdetsave[u].Received_Qty > 0) {
            ipchk.push(jobdetsave[u]);
        }
    }
    if (opchk.length == 0 || ipchk.length == 0) {
        //alert('Please fill atleast any one qty...');
        var msg = 'Please fill atleast any one quantity...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        return true;
    }

    CheckDC();
    $.each(ItmList, function () {
        this.closed = 'N';
        this.IPMarkup_rate = 0.00;
        this.OPMarkup_Rate = 0.00;
        this.Sec_Qty = 1;
        this.Invoice_Qty = 0.00;
        this.IssuedSizeID = this.sizeid;
        this.ProcessOrdId = this.productionordid;
        this.Prod_Recpt_Masid = Masid;

    });
    $.each(jobdetsave, function () {
        this.LotNo = '';
        this.Sec_Qty = 1;
        this.DisRowId = 0;
        this.LotRowid = 0;
        this.IssLot = '';
        this.Prod_Recpt_Masid = Masid;


    });
    var MSType = $('input[name="MSType"]:checked').attr('value');

    var storeunitid = 0;
    if (MSType == "S") {
        storeunitid = $('#ddlSMainStore').val();
    } else if (MSType == "M") {
        storeunitid = $('#ddlMSMMainStore').val();
    }

    if (storeunitid == 0 && ValidateProductionStore == "True") {
        //alert('Please select Store..');
        var msg = 'Please select Store...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        return true;
    }
    if (ValiCutBudApp == 'Y' && OrderType == 'W') {
        $.each(ItmList, function (e) {
            if (ItmList[e].Received_qty > 0) {
                if (ItmList[e].rate > 0 && ItmList[e].rate <= ItmList[e].apprate) {

                } else {
                    //alert('Please Check the Item Rate..');
                    var msg = 'Please Check the Item Rate...';
                    var flg = 4;
                    var mod = 1;
                    var ur = "";
                    AlartMessage(msg, flg, mod, ur);
                    retchk = "F";
                    return false;
                }
            }
        });
    }
    if (ValiCutBudAppSam == 'Y' && OrderType == 'S') {
        $.each(ItmList, function (e) {
            if (ItmList[e].Received_qty > 0) {
                if (ItmList[e].rate > 0 && ItmList[e].rate <= ItmList[e].apprate) {

                } else {
                    //alert('Please Check the Item Rate..');
                    var msg = 'Please Check the Item Rate...';
                    var flg = 4;
                    var mod = 1;
                    var ur = "";
                    AlartMessage(msg, flg, mod, ur);
                    retchk = "F";
                    return false;
                }
            }
        });
    }
    if (retchk == 'F') {
        return false;
    }
    var ordtype = $('input[name="Revert"]:checked').attr('value');
    var Obj = {
        prod_recpt_masid:Masid,
        prod_recpt_no: $("#txtReceiptno").val(),
        prod_recpt_date: $("#txtReceiptDate").val(),//new Date($('#txtReceiptDate').val()),
        Recpt_Ref_date: $("#txtRefDate").val(),//new Date($('#txtRefDate').val()),
        Recpt_Ref_no: $("#txtRefNo").val(),
        remarks: $("#txtRemark").val(),
        OrderType: OrType,
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
        ProdDet: ItmList,
        ProdJobDet: jobdetsave,

    }

    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/ProductionReceipt/Update",
        data: JSON.stringify(Obj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Value == true) {
                AddUserEntryLog('Production', 'Sewing Receipt', 'UPDATE', $("#txtReceiptno").val());
                //alert('Data Updated Successfully');
                //window.location.href = "/ProductionReceipt/ProductionReceiptIndex";
                var msg = 'Data Updated Successfully...';
                var flg = 1;
                var mod = 0;
                var ur = "/ProductionReceipt/ProductionReceiptIndex";
                AlartMessage(msg, flg, mod, ur);
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

function LoadMaingrid() {
    debugger;

    var proctype = $('input[name="mainproctype"]:checked').attr('value');

  
    var type = $('input[name="MOtype"]:checked').attr('value');

    if (proctype == 'P') {

        $('#ddlpro').show();
        $("#ddlwrkd").hide();
        Processorid = $('select#ddlprocessor option:selected').val();
    }
    else if (proctype == 'W') {
        $('#ddlpro').hide();
        $("#ddlwrkd").show();
        Processorid = $('select#ddlwrkdivision option:selected').val();
    }

  
    var ordNo = "";
    var ONo = $('select#ddlMOrderNo option:selected').val();

    if (ONo == 0 || ONo==undefined) {
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

    if (CompId == null) {
        CompId = DCompid;
    } else {
        CompId = $('#ddlMCompany').val();
    }

    var Unit = $('#ddlMUnit').val();
    if (Unit == null || Unit=="0") {
        Unit = 0;
    }
    var prid = 0;
    var process = $('#ddlMProcess').val();
    if (process == null || process=="0") {
        process = 0;
    }
    var buyer = $('#ddlMBuyer').val();
    if (buyer == null || buyer=="0") {
        buyer = 0;
    }
    var mas = 0;
    var prid = 0;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    if (ChkComp || DtChk) {
        ordNo = "";
        RecNo == "";
        DCNo = "";
        Unit = 0;
        process = 0;
        buyer = 0;
    }

    var menufilter = CompId + ',' + process + ',' + Unit + ',' + buyer + ',' + mas + ',' + prid + ',' + ordNo + ',' + proctype + ',' + type + ',' + DCNo + ',' + RecNo + ',' + FDate + ',' + TDate + ',' + Processorid;
    localStorage.setItem('SewingReceiptMainFilter', menufilter);

    $.ajax({
        url: "/ProductionReceipt/LoadMaingrid",
        data: JSON.stringify({ cmpid: CompId, processid: process, unitid: Unit, buyerid: buyer, masid: mas, prodordid: prid, jobordno: ordNo, processortype: proctype, type: type, dcno: DCNo, recptno: RecNo, fromDate: FDate, todate: TDate, processorid: Processorid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");
            if (!DtChk) {
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
                             { title: "ProductionRecptid", "visible": false },
                             { title: "Receipt No" },
                             { title: "Receipt Date" },
                             { title: "Unit" },
                             { title: "Process" },
                             { title: "DC No" },
                             { title: "Type", "visible": false },
                              { title: "Action" },


                    ]

                });
            }

            //ddlmain();
            // $('#ddlMOrderNo').empty();
            // $('#ddlMreceptno').empty();
            // $('#ddlMDCNo').empty();
            // $('#ddlMCompany').empty();
            // $('#ddlMProcess').empty();
            // $('#ddlMunit').empty();
            // $('#ddlMBuyer').empty();

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

    var fill = localStorage.getItem('SewingReceiptMainFilter');
    var fillobj = [];
    fillobj = fill.split(",");

    $('#txtFromDate').val(fillobj[11]);
    $('#txtToDate').val(fillobj[12]);


    if (fillobj[8] == 'W') {
        $('#MB').prop('checked', true);
    } else {
        $('#MS').prop('checked', true);
    }

    if (fillobj[7] == 'P') {
        $('#MP').prop('checked', true);
    } else if (fillobj[3] == 'W') {
        $('#MW').prop('checked', true);
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

    $.ajax({
        url: "/ProductionReceipt/LoadMaingrid",
        data: JSON.stringify({ cmpid: fillobj[0], processid: fillobj[1], unitid: fillobj[2], buyerid: fillobj[3], masid: fillobj[4], prodordid: fillobj[5], jobordno: fillobj[6], processortype: fillobj[7], type: fillobj[8], dcno: fillobj[9], recptno: fillobj[10], fromDate: fillobj[11], todate: fillobj[12], processorid: fillobj[13] }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");
            if (!DtChk) {
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
                             { title: "ProductionRecptid", "visible": false },
                             { title: "Receipt No" },
                             { title: "Receipt Date" },
                             { title: "Unit" },
                             { title: "Process" },
                             { title: "DC No" },
                             { title: "Type", "visible": false },
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
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadMaingridord() {
    debugger;

    //var type = $('select#ddlMType option:selected').val();

    //if (type == undefined) {
    //    type = "";
    //}
    var proctype = $('input[name="mainproctype"]:checked').attr('value');


    var type = $('input[name="MOtype"]:checked').attr('value');

    if (proctype == 'P') {

        $('#ddlpro').show();
        $("#ddlwrkd").hide();
        Processorid = $('select#ddlprocessor option:selected').val();
    }
    else if (proctype == 'W') {
        $('#ddlpro').hide();
        $("#ddlwrkd").show();
        Processorid = $('select#ddlwrkdivision option:selected').val();
    }

    //if (proctype == 'P') {

    //    $('#Msupp').show();
    //    $("#Mwrkdiv").hide();
    //}
    //else if (proctype == 'W') {
    //    $('#Msupp').hide();
    //    $("#Mwrkdiv").show();
    //}
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


    //var CompId = $('#ddlMCompany').val();
    //if (CompId == null || CompId=="0") {
    //    CompId = 0;
    //}

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
    if (ChkComp || DtChk) {
        ordNo = "";
        RecNo == "";
        DCNo == "";
        Unit = 0;
        process = 0;
        buyer = 0;
    }

    $.ajax({
        url: "/ProductionReceipt/LoadMaingridord",
        data: JSON.stringify({ cmpid: CompId, processid: process, unitid: Unit, buyerid: buyer, masid: mas, prodordid: prid, jobordno: ordNo, processortype: proctype, type: type, dcno: DCNo, recptno: RecNo, fromDate: FDate, todate: TDate, processorid: Processorid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");

            var refobj = [];
            $.each(dataSet, function (i) {
                var obj = {
                    orderno: dataSet[i][7]
                }
                refobj.push(obj);
            });



            var revdet = {};
            var rev = [];

            $.each(refobj, function (i, el) {

                if (!revdet[el.orderno]) {
                    revdet[el.orderno] = true;
                    rev.push(el);
                }
            });
         
            if (ChkOrdno || ChkComp || DtChk) {
                $('#ddlMOrderNo').empty();
                $('#ddlMOrderNo').append($('<option/>').val('0').text('--Select OrderNo--'));
                $.each(rev, function () {
                    $('#ddlMOrderNo').append($('<option></option>').val(this.orderno).text(this.orderno));
                });
            }
            
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
    var proctype = $('input[name="mainproctype"]:checked').attr('value');

  

    //if (proctype == 'P') {

    //    $('#Msupp').show();
    //    $("#Mwrkdiv").hide();
    //}
    //else if (proctype == 'W') {
    //    $('#Msupp').hide();
    //    $("#Mwrkdiv").show();
    //}
    var ordNo = "";
    var ONo = $('select#ddlMOrderNo option:selected').val();

    if (ONo == 0 || ONo==undefined) {
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

  
    //var CompId = $('#ddlMCompany').val();
    //if (CompId == null || CompId == "0") {
    //    CompId = 0;
    //}


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
    var processorid = 0;
    var prid = 0;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    if (ChkComp || DtChk) {
        ordNo == "";
        RecNo == "";
        DCNo == "";
        Unit = 0;
        process = 0;
        buyer = 0;
    }

    $.ajax({
        url: "/ProductionReceipt/LoadMaingriddet",
        data: JSON.stringify({ cmpid: CompId, processid: process, unitid: Unit, buyerid: buyer, masid: mas, prodordid: prid, jobordno: ordNo, processortype: proctype, type: type, dcno: DCNo, recptno: RecNo, fromDate: FDate, todate: TDate, processorid: processorid }),
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
                var buydet = {};
                var buy = [];
                var orddet = {};
                var ord = [];
                $.each(obj, function (i, el) {

                    if (!compdet[el.companyid]) {
                        compdet[el.companyid] = true;
                        comp.push(el);
                    }

                    if (!recptdet[el.prod_recpt_no]) {
                        recptdet[el.prod_recpt_no] = true;
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

                    if (!buydet[el.buyerid]) {
                        buydet[el.buyerid] = true;
                        buy.push(el);
                    }

                    if (!orddet[el.jobordno]) {
                        orddet[el.jobordno] = true;
                        ord.push(el);
                    }
                });


        //
        //
        //
        ////$('#ddlMCompany').empty();
        //
        ////$('#ddlMunit').empty();
        //

                

                if(ChkRcptno ||ChkComp||DtChk){
        $('#ddlMreceptno').empty();
        $('#ddlMreceptno').append($('<option/>').val('0').text('--Select ReceiptNo--'));
                $.each(recpt, function () {
                    $('#ddlMreceptno').append($('<option></option>').text(this.prod_recpt_no));
                });
                }
               if(ChkDCNo ||ChkComp||DtChk){
        $('#ddlMDCNo').empty();
        $('#ddlMDCNo').append($('<option/>').val('0').text('--Select DCNo--'));
                $.each(dc, function () {
                    $('#ddlMDCNo').append($('<option></option>').text(this.Recpt_Ref_no));
                });
                }
                //$(ddlMCompany).append($('<option/>').val('0').text('--Select Company--'));
                //$.each(comp, function () {
                //    $(ddlMCompany).append($('<option></option>').val(this.companyid).text(this.company));
                //});
                 if(ChkProcess ||ChkComp||DtChk){
        $('#ddlMProcess').empty();
        $('#ddlMProcess').append($('<option/>').val('0').text('--Select Processs--'));
                $.each(proc, function () {
                    $('#ddlMProcess').append($('<option></option>').val(this.processid).text(this.process));
                 });}

                //$(ddlMunit).append($('<option/>').val('0').text('--Select Unit--'));
                //$.each(unit, function () {
                //    $(ddlMunit).append($('<option></option>').val(this.unitid).text(this.unit));
                //});
               if(ChkBuyer ||ChkComp||DtChk){
        $('#ddlMBuyer').empty();
        $('#ddlMBuyer').append($('<option/>').val('0').text('--Select Buyer--'));
                $.each(buy, function () {
                    $('#ddlMBuyer').append($('<option></option>').val(this.buyerid).text(this.buyer));
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
    ChkRcptno = true;
    ChkOrdno = true;
    DtChk = false;
    ChkProcess = true;
    ChkBuyer = true;
    ChkDCNo = true;
    ChkComp = true;
    ddlmain();
    LoadMaingrid();
    LoadMaingridord();
}

function PMainlist() {
    $('#tblmaindetails').DataTable().destroy();
    ChkRcptno = true;
    ChkOrdno = false;
    DtChk = false;
    ChkProcess = false;
    ChkBuyer = true;
    ChkDCNo = true;
    ChkComp = false;
    ddlmain();
    LoadMaingrid();
    LoadMaingridord();
}
function OMainlist() {
    $('#tblmaindetails').DataTable().destroy();
    ChkRcptno = true;
    ChkOrdno = false;
    DtChk = false;
    ChkProcess = true;
    ChkBuyer = true;
    ChkDCNo = true;
    ChkComp = false;
    ddlmain();
    LoadMaingrid();
    LoadMaingridord();
}
function RCMainlist() {
    $('#tblmaindetails').DataTable().destroy();
    ChkRcptno = true;
    ChkOrdno = false;
    DtChk = false;
    ChkProcess = true;
    ChkBuyer = false;
    ChkDCNo = false;
    ChkComp = false;
    ddlmain();
    LoadMaingrid();
    LoadMaingridord();
}
function DCMainlist() {
    $('#tblmaindetails').DataTable().destroy();
    ChkRcptno = true;
    ChkOrdno = false;
    DtChk = false;
    ChkProcess = true;
    ChkBuyer = false;
    ChkDCNo = false;
    ChkComp = false;
    ddlmain();
    LoadMaingrid();
    LoadMaingridord();
}
function BMainlist() {
    $('#tblmaindetails').DataTable().destroy();
    ChkRcptno = true;
    ChkOrdno = true;
    DtChk = false;
    ChkProcess = true;
    ChkBuyer = false;
    ChkDCNo = true;
    ChkComp = false;
    ddlmain();
    LoadMaingrid();
    LoadMaingridord();

}

function CMainlistdd() {
    $('#tblmaindetails').DataTable().destroy();

     //$('#ddlMOrderNo').empty();
     //$('#ddlMreceptno').empty();
     //$('#ddlMDCNo').empty();
     ////$('#ddlMCompany').empty();
     //$('#ddlMProcess').empty();
     ////$('#ddlMunit').empty();
     //$('#ddlMBuyer').empty();
     ChkRcptno = true;
     ChkOrdno = true;
     DtChk = false;
     ChkProcess = true;
     ChkBuyer = true;
     ChkDCNo = true;
     ChkComp = true;
     LoadMaingrid();
     LoadMaingridord();
    ddlmain();

}
function TotMainlist() {
    $('#tblmaindetails').DataTable().destroy();

     //$('#ddlMOrderNo').empty();
     //$('#ddlMreceptno').empty();
     //$('#ddlMDCNo').empty();
     ////$('#ddlMCompany').empty();
     //$('#ddlMProcess').empty();
     ////$('#ddlMunit').empty();
    //$('#ddlMBuyer').empty();
    ChkRcptno = true;
    ChkOrdno = true;
    DtChk = false;
    ChkProcess = true;
    ChkBuyer = true;
    ChkDCNo = true;
    ChkComp = true;
    ddlmain();
    LoadMaingrid();
    LoadMaingridord();
}

function getbyID(masid) {
    debugger;
    Masid=masid;
    //Produ
    var type = $('select#ddlMType option:selected').val();

    if (type == undefined) {
        type = "";
    }
    var proctype = $('input[name="mainproctype"]:checked').attr('value');

    var typ = $('input[name="MOtype"]:checked').attr('value');
    OrderType = typ;

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
    var processorid = 0;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    $.ajax({
        url: "/ProductionReceipt/LoadMaingriddet",
        data: JSON.stringify({ cmpid: CompId, processid: process, unitid: Unit, buyerid: buyer, masid: mas, prodordid: prid, jobordno: ordNo, processortype: proctype, type: type, dcno: DCNo, recptno: RecNo, fromDate: FDate, todate: TDate, processorid: processorid }),
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

            $('#txtReceiptDate').val(moment(obj[0].prod_recpt_date).format("DD/MM/YYYY"));
            $('#txtRefDate').val(moment(obj[0].Recpt_Ref_date).format("DD/MM/YYYY"));
            $('#txtUnit').val(obj[0].unit);
            $('#txtProcess').val(obj[0].process);
            $('#txtProcessor').val(obj[0].supplier);
            $('#txtRefNo').val(obj[0].Recpt_Ref_no);
            $('#txtRemark').val(obj[0].remarks);
            $('#txtReceiptno').val(obj[0].prod_recpt_no);
            CheckAlloted();

            PrType = obj[0].processortype;
            OrType = obj[0].type;

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
           // CompanyId = obj[0].cmpid;

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
        url: "/ProductionReceipt/Loadedititemdet",
        data: JSON.stringify({ pid: id }),
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

function LoadEditInputJobdet(id) {
    debugger;
    $.ajax({
        url: "/ProductionReceipt/Loadeditjobdetdet",
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
                return (v.Itemid === Itmid && v.Colorid === Colorid && v.Sizeid === Sizeid && v.productionordid === Prodid);

            });
            jobdet = [];
            jobdet = colorempty;
            LoadJobdetTab(colorempty);
        }

    });
}

function CheckDC() {
    debugger;
    var rc= $('#txtRefNo').val();
    $.ajax({
        url: "/ProductionReceipt/ChkDC",
        data: JSON.stringify({ recpt: rc, pid: Masid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            List = result.Value;
            if (List.length > 0) {
                //alert('RecptNo is already available..');
                var msg = 'Receipt Number is already available...';
                var flg = 4;
                var mod = 1;
                var ur = "";
                AlartMessage(msg, flg, mod, ur);
                return true;
            }
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
    var processorid = 0;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    $.ajax({
        url: "/ProductionReceipt/LoadMaingriddet",
        data: JSON.stringify({ cmpid: CompId, processid: process, unitid: Unit, buyerid: buyer, masid: mas, prodordid: prid, jobordno: ordNo, processortype: proctype, type: type, dcno: DCNo, recptno: RecNo, fromDate: FDate, todate: TDate, processorid: processorid }),
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

            $('#txtReceiptDate').val(moment(obj[0].prod_recpt_date).format("DD/MM/YYYY"));
            $('#txtRefDate').val(moment(obj[0].Recpt_Ref_date).format("DD/MM/YYYY"));
            $('#txtUnit').val(obj[0].unit);
            $('#txtProcess').val(obj[0].process);
            $('#txtProcessor').val(obj[0].supplier);
            $('#txtRefNo').val(obj[0].Recpt_Ref_no);
            $('#txtRemark').val(obj[0].remarks);
            $('#txtReceiptno').val(obj[0].prod_recpt_no);
            CheckAlloted();

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
        this.ProcessOrdId = this.productionordid;
        this.Prod_Recpt_Masid = Masid;

    });
    $.each(jobdetsave, function () {
        this.LotNo = '';
        this.Sec_Qty = 1;
        this.DisRowId = 0;
        this.LotRowid = 0;
        this.IssLot = '';
        this.Prod_Recpt_Masid = Masid;


    });
    var ordtype = $('input[name="Revert"]:checked').attr('value');
    var Obj = {
        prod_recpt_masid: Masid,
        prod_recpt_no: $("#txtReceiptno").val(),
        prod_recpt_date: $("#txtReceiptDate").val(),//new Date($('#txtReceiptDate').val()),
        Recpt_Ref_date: $("#txtRefDate").val(),//new Date($('#txtRefDate').val()),
        Recpt_Ref_no: $("#txtRefNo").val(),
        remarks: $("#txtRemark").val(),
        OrderType: ordtype,
        StoreUnitID: $("#ddlMSMMainStore").val(),
        CreatedBy: Guserid,
        InwardNo: '',
        SupplierInvoiceNo: '',
        ExcldetoInv: 0,
        InspDate: $("#txtReceiptDate").val(),//new Date($('#txtReceiptDate').val()),//
        //InspNo: 'S',
        EWayDate: $("#txtReceiptDate").val(),//new Date($('#txtReceiptDate').val()),
        //EWayNo: 'O',       
        ProdDet: ItmList,
        ProdJobDet: jobdetsave,

    }
    $("#btnDel").attr("disabled", true);

    LoadingSymb();
    $.ajax({
        url: "/ProductionReceipt/Delete",
        data: JSON.stringify(Obj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Value == true) {
                AddUserEntryLog('Production', 'Sewing Receipt', 'DELETE', $("#txtReceiptno").val());
                //alert('Data Deleted Successfully');
                //window.location.href = "/ProductionReceipt/ProductionReceiptIndex";
                var msg = 'Data Deleted Successfully...';
                var flg = 2;
                var mod = 0;
                var ur = "/ProductionReceipt/ProductionReceiptIndex";
                AlartMessage(msg, flg, mod, ur);
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


function ProdRecptPrint(Id) {
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

    window.open("../ReportInline/Production/ProdRecptReportInline/ProdRecptReportInline.aspx?ProdRecptId=" + Repid + "&RetLossdet=" + p[0] + "&Ins=" + p[1] + "&Lotdet=" + p[2] + "&Procord=" + p[3] + "&POdet=" + p[4] + "&Ewaybill=" + p[5] + "&Ewaydate=" + p[6] + "&Companyid=" + compid);

}

function backtomain() {
   
    $("#myModal1").modal('hide');
    window.location.href = "/ProductionReceipt/ProductionReceiptIndex";
        
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
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
    }
}

function onUserCompanyFailure(result) {

    //alert('Company loading failed');
    var msg = 'Company loading failed...';
    var flg = 4;
    var mod = 1;
    var ur = "";
    AlartMessage(msg, flg, mod, ur);
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
                    var ur = "";
                    AlartMessage(msg, flg, mod, ur);
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
        ]
    });


    $("#tblItemMovementdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblItemMovementdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}