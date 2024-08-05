var MOrd = 0;
var entrygriddet = [];
var JOrdID = 0;
var OpItmList = [];
var OpJobDetList = [];
var OpSaveJobDetList = [];
var IpItmList = [];
var IpJobDetList = [];
var IpSaveJobDetList = [];
var IpStkDetList = [];
var IpSaveStkDetList = [];
var AccList = [];
var indexop = -1;
var indopjob = -1;
var indiptitm = -1;
var inditjbdet = -1;
var indipstkdet = -1;
var Itmid = 0;
var Colorid = 0;
var Sizeid = 0;
var opItmid = 0;
var OpClrid = 0;
var OpSizeid = 0;
var CompanyId = 0;
var Companyunitid = 0;
var Processorid = 0;
var Processid = 0;
var Masid = 0;
var ProductionOrderno = "";
var Userid = 0;
var UserName = 0;
var MainFDate = 0;
var repobj = [];
var Repid = 0;
var Guserid = 0;
var PrType = 0;
var OrType = 0;
var DCompid = 0;
var DCompid = 0;
var ChkProcess = true;
var ChkOrdno = true;
var DtChk = false;
var ChkUnit = true;
var ChkComp = false;
var ChkOrdn = true;
var ChkBuyer = true;
var LoginUserid = '';
var editmasunitstore = 0;
var ValidateProductionStore = "False";
var LoginUserid = 0;
var AllowList = [];
var pallown = 0;
var IOlist = [];
var Olist = [];
var ValiCutBudApp = '';

var ValiCutBudAppSam = 0;
var retchk = '';
var OrderType = '';
$(document).ready(function () {
    debugger;
    LoadCompanyDDL("#ddlMCompany,#ddlCompany");
    //LoadBuyerDDL("#ddlBuyer");
    //LoadProcessDDL("#ddlProcess");
    //LoadStyleDDL("#ddlStyle");
    //LoadCompanyUnitDDL("#ddlUnit");
    //LoadOrderNoDDL("#ddlOrderNo");
    //LoadRefNoDDL("#ddlRefNo");

    Guserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    MainFDate = $("#hdMainFromDate").data('value');
    // ValiSewingBudApp = $("#hdnCostBudCutAppid").data('value');

    ValiCutBudApp = $("#hdnCostBudCutAppid").data('value');
    ValiCutBudAppSam = $("#hdnCostBudCutAppSamid").data('value');

    ValidateProductionStore = $("#hdnValidateProductionStore").data('value');
    DCompid = $("#hdnDCompid").data('value');
    LoadWorkdivisionDDL("#ddlwrkdiv,#ddlMwrkdiv,#ddlwrkdivision");

    LoadSupplierSetup();

    LoadSupplierDDL("#ddlMSupplier,#ddlprocess");
    LoadAddlessDDL("#ddlAcc");
    LoginUserid = $("#hdnLoginUserid").data('value');
    getDate();
    var protype = $('input[name="proctype"]:checked').attr('value');
    if (protype == 'P') {

        $('#ddlpro').show();
        $("#ddlwrkd").hide();
    }
    else if (protype == 'W') {
        $('#ddlpro').hide();
        $("#ddlwrkd").show();
    }
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


    $("#entrygridtab").dataTable().find("tbody").on('click', 'td', function () {
        debugger;
        $('input[id=groupbom]').each(function () {
            var row = $(this).closest('tr');
            if ($(this).is(':checked')) {
                var val = $(this).val();
                for (var d = 0; d < entrygriddet.length; d++) {
                    if (entrygriddet[d].jmasid == val) {
                        entrygriddet[d].CheckLoad = "Y";
                    }
                }

            }
            else {
                var val = $(this).val();
                for (var d = 0; d < entrygriddet.length; d++) {
                    if (entrygriddet[d].jmasid == val) {
                        entrygriddet[d].CheckLoad = "N";
                    }

                }
            }

        });

    });

    var proctype = $('input[name="proctype"]:checked').attr('value');


    if (proctype == 'P') {

        $('#Msupp').show();
        $("#Mwrkdiv").hide();
    }
    else if (proctype == 'W') {
        $('#Msupp').hide();
        $("#Mwrkdiv").show();
    }
    LoadLocation();
    LoadIssLocation();

    ddlmain();
    var fill = localStorage.getItem('SewingIssueMainFilter');
    if (fill != "null" && fill != null) {
        LoadMaingridFromBack();
    } else {
        LoadMaingrid();
    }

    //LoadMaingrid();
    LoadMaingridord();
    $('#btnImadd').click(function () {
        debugger;

        var leng = 0;

        var isAllValid = true;


        debugger;
        if ($('#ddlAcc').val() == "0") {
            isAllValid = false;
            $('#ddlAcc').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#ddlAcc').siblings('span.error').css('visibility', 'hidden');
        }


        if (AccList.length == 0) {
            leng = 1;
        }
        else {
            leng = AccList.length + 1;
        }

        AcSno = leng;



        if (isAllValid) {


            debugger;
            var AcListObj = {
                Addless: $("#ddlAcc option:selected").text(),
                Addlessid: $('#ddlAcc').val(),
                PlusOrMinus: $('#txtPorMins').val(),
                Percentage: $('#txtPer').val(),
                Amount: $('#txtAmount').val(),
                SlNo: leng,

                Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
            };

            AccList.push(AcListObj);

            loadAccTable(AcListObj);

            var totalAccamnt = 0;
            for (var e = 0; e < AccList.length; e++) {
                var amount = AccList[e].Amount;
                totalAccamnt = totalAccamnt + parseFloat(amount);

            }


            //    loadItemTable(ItemList);
            $('#txtNetAmt').val(totalAccamnt.toFixed(3));

            var GAmt = $('#txtGrossAmt').val();
            var NAmt = $('#txtNetAmt').val();
            var FNAmt = parseFloat(GAmt) + parseFloat(NAmt);

            $('#txtNetAmt').val(FNAmt);
            $('#txtBTotAmt').val(FNAmt);

            fnClearAccControls();
        }
    });

    $(document).on('click', '.btnaccedit', function () {
        debugger;
        Mode = 1;

        rowindex = $(this).closest('tr').index();

        var currentro12 = AccList.slice(rowindex);

        $('#ddlAcc').val(currentro12[0]['Addlessid']);
        $('#txtPorMins').val(currentro12[0]['PlusOrMinus']);
        $('#txtPer').val(currentro12[0]['Percentage']);
        $('#txtAmount').val(currentro12[0]['Amount']);

        $('#btnImadd').hide();
        $('#btnImupdate').show();
    });



    $('#btnImupdate').click(function () {
        debugger;
        var currentrowsel = AccList.slice(rowindex);

        currentrowsel[0]['Addlessid'] = $("#ddlAcc").val();
        currentrowsel[0]['Addless'] = $("#ddlAcc option:selected").text();
        currentrowsel[0]['PlusOrMinus'] = $("#txtPorMins").val();
        currentrowsel[0]['Percentage'] = $("#txtPer").val();
        currentrowsel[0]['Amount'] = $("#txtAmount").val();

        AccList[rowindex] = currentrowsel[0];

        loadAccTable(AccList);

        $('#btnImupdate').hide();
        $('#btnImadd').show();

        if (Mode == 0) {
            fnClearAccControls();
        }
        else {
            fnClearAccControls();

        }
        Mode = 0;
    });

    $(document).on('click', '.btnaccremove', function () {
        rowindex = $(this).closest('tr').index();
        AccList.splice(rowindex, 1);
        document.getElementById("tblPaydetails").deleteRow(rowindex + 1);
    });
    //

    $(document).on('keyup', '.calcrate', function () {
        debugger;

        var table = $('#outputitmtab').DataTable();
        var CSno = table.row($(this).parents('tr')).data()["sno"];
        var rate = table.row($(this).parents('tr')).data()["apprate"];
        var val = $(this).val();

        if (ValiCutBudApp == 'Y' && OrderType == 'W') {
            if (val <= rate) {
                $.each(OpItmList, function () {
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
                $.each(OpItmList, function () {
                    if (this.sno == CSno) {
                        this.rate = this.apprate;

                    }
                });
                var table = $('#outputitmtab').DataTable();
                var data = table.rows().data();

                $('input[id=txtOpRQty]').each(function (ig) {
                    if (data[ig].sno == CSno) {
                        var row = $(this).closest('tr');
                        row.find('#txtOpRQty').val(data[ig].apprate);

                    }
                });
                return true;
            }
        } else if (ValiCutBudAppSam == 'Y' && OrderType == 'S') {

            if (val <= rate) {
                $.each(OpItmList, function () {
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
                $.each(OpItmList, function () {
                    if (this.sno == CSno) {
                        this.rate = this.apprate;

                    }
                });
                var table = $('#outputitmtab').DataTable();
                var data = table.rows().data();

                $('input[id=txtOpRQty]').each(function (ig) {
                    if (data[ig].sno == CSno) {
                        var row = $(this).closest('tr');
                        row.find('#txtOpRQty').val(data[ig].apprate);

                    }
                });
                return true;
            }
        }
        else {
            $.each(OpItmList, function () {
                if (this.sno == CSno) {
                    this.rate = val;

                }
            });

            //OutputitmTab(OpItmList);
            var table = $('#outputitmtab').DataTable();
            var data = table.rows().data();

            $('input[id=txtOpRQty]').each(function (ig) {
                if (data[ig].sno == CSno) {
                    var row = $(this).closest('tr');
                    row.find('#txtOpRQty').val(val);

                }
            });
        }
        //Datatable textbox focus
        //var rows = $("#outputitmtab").dataTable().fnGetNodes();
        //var dtTable = $('#outputitmtab').DataTable();
        //for (var i = 0; i < rows.length; i++) {
        //    var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
        //    $('input[id=txtOpRQty]').each(function () {
        //        if (sn == CSno && $(this).val() == val) {
        //            var row = $(this).closest('tr');
        //            var num = row.find('#txtOpRQty').val();
        //            row.find('#txtOpRQty').focus().val('').val(num);
        //            return true;
        //        }
        //    });
        //}
    });
    $(document).on('keyup', '.calcAmt', function () {
        debugger;
        var table = $('#outputitmtab').DataTable();


        var CSno = table.row($(this).parents('tr')).data()["sno"];
        var IId = table.row($(this).parents('tr')).data()["itmid"];
        var CId = table.row($(this).parents('tr')).data()["clrid"];
        var SId = table.row($(this).parents('tr')).data()["sizeid"];
        var Balance = table.row($(this).parents('tr')).data()["bal"];

        var Val = $(this).val();

        var value = Val;

        if (Val > Balance) {
            //alert('Should not exceed Bal qty...');
            var msg = 'Should not exceed Balance quantity...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
            $.each(OpItmList, function () {
                if (this.sno == CSno) {
                    this.ordqty = 0;
                }
            });
            OutputitmTab(OpItmList);
            return true;
        }
        $.each(OpItmList, function () {
            if (this.sno == CSno) {
                this.ordqty = Val;
            }
        });
        OutputitmTab(OpItmList);

        var pid = [];
        var bal = [];
        var qty = [];
        for (var t = 0; t < OpSaveJobDetList.length; t++) {
            if (OpSaveJobDetList[t].itmid == IId && OpSaveJobDetList[t].clrid == CId && OpSaveJobDetList[t].sizeid == SId) {
                pid.push(OpSaveJobDetList[t].sno);
                bal.push(OpSaveJobDetList[t].bal);
                qty.push(OpSaveJobDetList[t].ordqty);
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

        for (var u = 0; u < OpSaveJobDetList.length; u++) {
            for (var r = 0; r < pid.length; r++) {
                if (OpSaveJobDetList[u].sno == pid[r]) {
                    OpSaveJobDetList[u].ordqty = qty[r];
                }
            }
        }

        OutputSaveJobdetTab(OpSaveJobDetList);

        for (var u = 0; u < OpJobDetList.length; u++) {
            for (var r = 0; r < pid.length; r++) {
                if (OpJobDetList[u].sno == pid[r]) {
                    OpJobDetList[u].ordqty = qty[r];
                }
            }
        }

        colorempty = OpSaveJobDetList;

        colorempty = $.grep(colorempty, function (v) {
            return (v.itmid === IId && v.clrid === CId && v.sizeid === SId);
        });

        OutputJobdetTab(colorempty);

        OpJobDetList = [];
        OpJobDetList = colorempty;
        var totalamnt = 0;
        for (var e = 0; e < OpItmList.length; e++) {
            var amount = OpItmList[e].ordqty;
            totalamnt = totalamnt + parseFloat(amount);

        }
        $('#txtGrossAmt').val(totalamnt);

        //Datatable textbox focus
        var rows = $("#outputitmtab").dataTable().fnGetNodes();
        var dtTable = $('#outputitmtab').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
            $('input[id=txtOpOrdQty]').each(function () {
                if (sn == CSno && $(this).val() == value) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtOpOrdQty').val();
                    row.find('#txtOpOrdQty').focus().val('').val(num);
                    return true;
                }
            });
        }
    });
    $(document).on('keyup', '.calcsepquan', function () {
        debugger;
        var table = $('#outputjodettab').DataTable();


        var pid = table.row($(this).parents('tr')).data()["sno"];
        var itmid = table.row($(this).parents('tr')).data()["itmid"];
        var colorid = table.row($(this).parents('tr')).data()["clrid"];
        var sizeid = table.row($(this).parents('tr')).data()["sizeid"];
        var balq = table.row($(this).parents('tr')).data()["bal"];

        var value = $(this).val();
        var Val = value;



        var allow = 0;
        var balallow = 0;
        for (j = 0; OpSaveJobDetList.length > j; j++) {
            if (pid != OpSaveJobDetList[j].sno) {
                var bal = OpSaveJobDetList[j].bal; //+pallown
                // var prgqty = OpSaveJobDetList[j].prgopqty;
                var ordqty = OpSaveJobDetList[j].ordqty;
                if (OpSaveJobDetList[j].bal < OpSaveJobDetList[j].ordqty) {
                    var curallow = parseFloat(OpSaveJobDetList[j].ordqty) - parseFloat(OpSaveJobDetList[j].bal)
                    allow = allow + parseFloat(curallow);
                }
            }
        }

        balallow = pallown - allow;

        for (j = 0; OpSaveJobDetList.length > j; j++) {
            if (colorid == OpSaveJobDetList[j].clrid && itmid == OpSaveJobDetList[j].itmid && sizeid == OpSaveJobDetList[j].sizeid && pid == OpSaveJobDetList[j].sno) {
                var bal = OpSaveJobDetList[j].bal; //+pallown
                //var prgqty = OpSaveJobDetList[j].prgopqty;
                var ordqty = OpSaveJobDetList[j].ordqty;
                var allow = 0;
                if (OpSaveJobDetList[j].bal < value) {

                    var totactval = parseFloat(OpSaveJobDetList[j].bal) + balallow;

                    if (totactval < value) {

                        value = parseFloat(totactval).toFixed(3);
                        Val = value;

                    }
                }
            }
        }





        $.each(OpSaveJobDetList, function () {
            if (this.sno == pid) {
                this.ordqty = value;

                //if (balq >= value) {
                //    this.ordqty = value;
                //}
                //else {
                //    var t = value - balq;
                //    this.ordqty = balq;
                //}

            }
        });

        $.each(OpJobDetList, function () {
            if (this.sno == pid) {
                this.ordqty = value;

                //if (balq >= value) {
                //    this.ordqty = value;
                //}
                //else {
                //    var t = value - balq;
                //    this.ordqty = balq;
                //}

            }
        });

        var totalamnt = 0;

        for (var e = 0; e < OpJobDetList.length; e++) {
            var amount = OpJobDetList[e].ordqty;
            totalamnt = totalamnt + parseFloat(amount);
        }
        $.each(OpItmList, function () {
            if (this.itmid == itmid && this.sizeid == sizeid && this.clrid == colorid) {
                //this.quantity = 0;

                this.ordqty = totalamnt;
                //}


            }
        });
        OutputitmTab(OpItmList);
        OutputSaveJobdetTab(OpSaveJobDetList);
        OutputJobdetTab(OpJobDetList);


        //Datatable textbox focus
        var rows = $("#outputjodettab").dataTable().fnGetNodes();
        var dtTable = $('#outputjodettab').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
            $('input[id=txtOpjobOrdQty]').each(function () {
                if (sn == pid && $(this).val() == Val) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtOpjobOrdQty').val();
                    row.find('#txtOpjobOrdQty').focus().val('').val(num);
                    return true;
                }
            });
        }
    });
    $(document).on('keyup', '.calcipAmt', function () {
        debugger;
        var table = $('#inputitmtab').DataTable();


        var CSno = table.row($(this).parents('tr')).data()["sno"];
        var IId = table.row($(this).parents('tr')).data()["itmid"];
        var CId = table.row($(this).parents('tr')).data()["clrid"];
        var SId = table.row($(this).parents('tr')).data()["sizeid"];
        var BlQ = table.row($(this).parents('tr')).data()["bal"];
        var Val = $(this).val();

        var IssQty = Val;

        if (Val > BlQ) {
            //alert('Quantity should not exceed Balqty...');
            var msg = 'Quantity should not exceed Balance quantity...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
            return true;
        }
        $.each(IpItmList, function () {
            if (this.sno == CSno && this.itmid == IId && this.clrid == CId && this.sizeid == SId) {
                this.issqty = IssQty;

            }
        });

        InputitmTab(IpItmList);

        if (IpSaveJobDetList.length > 0) {

            var pid = [];
            var bal = [];
            var qty = [];

            for (var t = 0; t < IpSaveJobDetList.length; t++) {
                if (IpSaveJobDetList[t].itmid == IId && IpSaveJobDetList[t].clrid == CId && IpSaveJobDetList[t].sizeid == SId) {
                    pid.push(IpSaveJobDetList[t].sno);
                    bal.push(IpSaveJobDetList[t].bal);
                    qty.push(IpSaveJobDetList[t].ordqty);

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
            var son = [];
            var jid = [];
            for (var u = 0; u < IpSaveJobDetList.length; u++) {
                for (var r = 0; r < pid.length; r++) {
                    if (IpSaveJobDetList[u].sno == pid[r]) {
                        IpSaveJobDetList[u].ordqty = qty[r];
                        son.push(IpSaveJobDetList[u].ordqty);
                        jid.push(IpSaveJobDetList[u].jobordno);
                    }
                    //if (OSItemList[u].OItemid == IId && OSItemList[u].OColorid == CId && OSItemList[u].OSizeid == SId && OSItemList[u].OUomid == PUId) {
                    //    OSItemList[u].IssueQty = qty[r];
                    //}
                }
            }

            InputSaveJobdetTab(IpSaveJobDetList);

            var j = jid[0];
            var colorempty = [];
            colorempty = IpSaveJobDetList;

            colorempty = $.grep(colorempty, function (v) {
                return (v.itmid === IId && v.clrid === CId && v.sizeid === SId);
            });
            IpJobDetList = [];
            IpJobDetList = colorempty;
            InputJobdetTab(colorempty);
        }

        if (IpSaveStkDetList.length > 0) {



            var sid = [];
            var bal = [];
            var qty = [];
            for (var t = 0; t < IpSaveStkDetList.length; t++) {
                if (IpSaveStkDetList[t].itmid == IId && IpSaveStkDetList[t].clrid == CId && IpSaveStkDetList[t].sizeid == SId && IpSaveStkDetList[t].jobordno == j) {
                    sid.push(IpSaveStkDetList[t].stockid);
                    bal.push(IpSaveStkDetList[t].bal);
                    qty.push(IpSaveStkDetList[t].issues);
                }
            }

            var c = sid.length;
            var t = 0;

            //if (Val > bal[0]) {
            //qty[0] = Val;
            //}

            if (son[0] < bal[0]) {
                qty[0] = son[0];
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

            var stkempty = [];

            var stkid = [];
            for (var u = 0; u < IpSaveStkDetList.length; u++) {
                for (var r = 0; r < sid.length; r++) {
                    if (IpSaveStkDetList[u].stockid == sid[r]) {
                        IpSaveStkDetList[u].issues = qty[r];
                        stkid.push(IpSaveStkDetList[u].stockid);
                    }


                }
            }

            for (var e = 0; e < IpStkDetList.length; e++) {
                for (var r = 0; r < sid.length; r++) {
                    if (IpStkDetList[e].stockid == sid[r]) {
                        IpStkDetList[e].issues = qty[r];
                    }
                }
            }

            InputStkdetTab(IpStkDetList);
            InputSaveStkdetTab(IpSaveStkDetList);


        }

        //Datatable textbox focus
        var rows = $("#inputitmtab").dataTable().fnGetNodes();
        var dtTable = $('#inputitmtab').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
            $('input[id=txtipOrdQty]').each(function () {
                if (sn == CSno && $(this).val() == IssQty) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtipOrdQty').val();
                    row.find('#txtipOrdQty').focus().val('').val(num);
                    return true;
                }
            });
        }
    });
    $(document).on('keyup', '.calcipsepquan', function () {
        debugger;
        var table = $('#inputjodettab').DataTable();


        var pid = table.row($(this).parents('tr')).data()["sno"];
        var IId = table.row($(this).parents('tr')).data()["itmid"];
        var CId = table.row($(this).parents('tr')).data()["clrid"];
        var SId = table.row($(this).parents('tr')).data()["sizeid"];
        var balq = table.row($(this).parents('tr')).data()["bal"];
        var jmid = table.row($(this).parents('tr')).data()["jobordno"];
        var ccno = table.row($(this).parents('tr')).data()["sno"];

        var value = $(this).val();
        var IssQty = value;


        var otherqty=0;
        for (j = 0; IpSaveJobDetList.length > j; j++) {
            if (CId == IpSaveJobDetList[j].clrid && IId == IpSaveJobDetList[j].itmid && SId == IpSaveJobDetList[j].sizeid && pid != IpSaveJobDetList[j].sno && jmid == IpSaveJobDetList[j].jobordno) {
                otherqty = otherqty + parseFloat(IpSaveJobDetList[j].ordqty);
            }
        }
        var totordqty = 0;
        if (otherqty > 0) {
             totordqty = parseFloat(value) + parseFloat(otherqty);
        }
       
        var allow = 0;
        var balallow = 0;
        for (j = 0; IpSaveJobDetList.length > j; j++) {
            if (pid != IpSaveJobDetList[j].sno) {
                var bal = IpSaveJobDetList[j].bal; //+pallown
                // var prgqty = OpSaveJobDetList[j].prgopqty;
                var ordqty = IpSaveJobDetList[j].ordqty;
                if (IpSaveJobDetList[j].bal < IpSaveJobDetList[j].ordqty) {
                    var curallow = parseFloat(IpSaveJobDetList[j].ordqty) - parseFloat(IpSaveJobDetList[j].bal)
                    allow = allow + parseFloat(curallow);
                }
            }
        }

        balallow = pallown - allow;

        for (j = 0; IpSaveJobDetList.length > j; j++) {
            if (CId == IpSaveJobDetList[j].clrid && IId == IpSaveJobDetList[j].itmid && SId == IpSaveJobDetList[j].sizeid && pid == IpSaveJobDetList[j].sno) {
                var bal = IpSaveJobDetList[j].bal; //+pallown
                //var prgqty = OpSaveJobDetList[j].prgopqty;
                var ordqty = IpSaveJobDetList[j].ordqty;
                var allow = 0;
                if (IpSaveJobDetList[j].bal < value) {

                    var totactval = parseFloat(IpSaveJobDetList[j].bal) + balallow;

                    if (totactval < value) {

                        value = parseFloat(totactval).toFixed(3);
                        IssQty = value;

                    }
                }
            }
        }



        var totissues = 0;
        for (var t = 0; t < IpStkDetList.length; t++) {
            if (IpStkDetList[t].itmid == IId && IpStkDetList[t].clrid == CId && IpStkDetList[t].sizeid == SId && IpStkDetList[t].jobordno == jmid) {
                totissues = totissues + parseFloat(IpStkDetList[t].bal);
            }
        }

        if (totordqty > 0) {

            if (totissues < totordqty) {
                value = 0;
                IssQty = value;
            }
        } else {
            if (totissues < value) {
                value = parseFloat(totissues).toFixed(3);
                IssQty = value;
            }
        }



        $.each(IpSaveJobDetList, function () {
            if (this.sno == pid) {
                this.ordqty = value;
                //if (balq >= value) {
                //    this.ordqty = value;
                //}
                //else {
                //    var t = value - balq;
                //    this.ordqty = balq;
                //}

            }
        });
        $.each(IpJobDetList, function () {
            if (this.sno == pid) {
                this.ordqty = value;
                //if (balq >= value) {
                //    this.ordqty = value;
                //}
                //else {
                //    var t = value - balq;
                //    this.ordqty = balq;
                //}

            }
        });



        if (IpSaveStkDetList.length > 0) {

            if (totordqty > 0) {
                if (totissues < totordqty) {
                    value = otherqty;
                  
                } else {
                    value = totordqty;
                }
            }

            var pid = [];
            var bal = [];
            var qty = [];

            for (var t = 0; t < IpSaveJobDetList.length; t++) {
                if (IpSaveJobDetList[t].itmid == IId && IpSaveJobDetList[t].clrid == CId && IpSaveJobDetList[t].sizeid == SId && IpSaveJobDetList[t].jobordno == jmid
                    ) {
                    pid.push(IpSaveJobDetList[t].sno);
                    bal.push(IpSaveJobDetList[t].bal);
                    qty.push(IpSaveJobDetList[t].ordqty);

                }
            }

            var son = [];
            var jid = [];
            for (var u = 0; u < IpSaveJobDetList.length; u++) {
                for (var r = 0; r < pid.length; r++) {
                    if (IpSaveJobDetList[u].sno == pid[r]) {
                        IpSaveJobDetList[u].ordqty = qty[r];

                        if (totordqty > 0) {
                            son.push(totordqty);
                        } else {
                            son.push(IpSaveJobDetList[u].ordqty);
                        }
                        jid.push(IpSaveJobDetList[u].jobordno);
                    }

                }
            }



            var sid = [];
            var bal = [];
            var qty = [];
            for (var t = 0; t < IpSaveStkDetList.length; t++) {
                if (IpSaveStkDetList[t].itmid == IId && IpSaveStkDetList[t].clrid == CId && IpSaveStkDetList[t].sizeid == SId && IpSaveStkDetList[t].jobordno == jmid
                    ) {
                    sid.push(IpSaveStkDetList[t].stockid);
                    bal.push(IpSaveStkDetList[t].bal);
                    qty.push(IpSaveStkDetList[t].issues);
                }
            }

            var c = sid.length;
            var t = 0;

            //if (Val > bal[0]) {
            //qty[0] = Val;
            //}

            if (son[0] < bal[0]) {
                qty[0] = son[0];

                for (var l = 1; l < qty.length; l++) {
                    qty[l] = 0;
                }
            }
            else {
                for (var r = 0; r < c; r++) {
                    if (r == 0) {
                        if (bal[r] <= value) {
                            qty[r] = bal[r];
                            t = value - bal[r];
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

            var stkempty = [];

            var stkid = [];
            for (var u = 0; u < IpSaveStkDetList.length; u++) {
                for (var r = 0; r < sid.length; r++) {
                    if (IpSaveStkDetList[u].stockid == sid[r] && IpSaveStkDetList[u].jobordno == jmid) {
                        IpSaveStkDetList[u].issues = qty[r];
                        stkid.push(IpSaveStkDetList[u].stockid);
                    }


                }
            }



            var colorempty = [];
            for (var u = 0; u < IpSaveStkDetList.length; u++) {
                for (var r = 0; r < IpStkDetList.length; r++) {
                    if (IpSaveStkDetList[u].stockid == IpStkDetList[r].stockid && IpSaveStkDetList[u].jobordno == jmid) {
                        IpStkDetList[r].issues = IpSaveStkDetList[u].issues;
                        //stkid.push(IpSaveStkDetList[u].stockid);
                    }


                }
            }

            colorempty = IpStkDetList;

            colorempty = $.grep(colorempty, function (v) {
                return (v.itmid == IId && v.clrid == CId && v.sizeid == SId && v.jobordno == jmid);
            });

            InputStkdetTab(colorempty);
        }







        //var currentrow = [];
        //var Itmstkid = 0;
        //for (var a = 0; a < IpStkDetList.length; a++) {

        //    if (IpSaveStkDetList[a].jobordno == jmid) {
        //        currentrow.push(IpSaveStkDetList[a]);
        //        var jm = currentrow[0].jobordno;
        //        Itmstkid = currentrow[0].stockid;
        //        var balstk = currentrow[0].bal;

        //        $.each(IpSaveStkDetList, function () {
        //            if (this.stockid == Itmstkid) {
        //                if (value >= balq) {
        //                    if (balq >= value) {
        //                        this.issues = value;
        //                    }
        //                    else {
        //                        var t = value - balq;
        //                        this.issues = balq;
        //                    }
        //                }
        //                else {
        //                    if (balstk >= value) {
        //                        this.issues = value;
        //                    }
        //                    else {
        //                        var t = value - balstk;
        //                        this.issues = balstk;
        //                    }
        //                }

        //            }
        //        });

        //        $.each(IpStkDetList, function () {
        //            if (this.stockid == Itmstkid) {
        //                if (value >= balq) {
        //                    if (balq >= value) {
        //                        this.issues = value;
        //                    }
        //                    else {
        //                        var t = value - balq;
        //                        this.issues = balq;
        //                    }
        //                }
        //                else {
        //                    if (balstk >= value) {
        //                        this.issues = value;
        //                    }
        //                    else {
        //                        var t = value - balstk;
        //                        this.issues = balstk;
        //                    }
        //                }

        //            }
        //        });
        //    }
        //}




        var totalamnt = 0;

        for (var e = 0; e < IpJobDetList.length; e++) {
            var amount = IpJobDetList[e].ordqty;
            totalamnt = totalamnt + parseFloat(amount);
        }
        $.each(IpItmList, function () {
            if (this.itmid == IId && this.clrid == CId && this.sizeid == SId) {
                this.issqty = totalamnt;

            }
        });

        InputSaveJobdetTab(IpSaveJobDetList);
        InputJobdetTab(IpJobDetList);
        InputitmTab(IpItmList);
        InputStkdetTab(IpStkDetList);
        InputSaveStkdetTab(IpSaveStkDetList);

        //Datatable textbox focus
        //var rows = $("#inputjodettab").dataTable().fnGetNodes();
        //var dtTable = $('#inputjodettab').DataTable();
        //for (var i = 0; i < rows.length; i++) {
        //    var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
        //    $('input[id=txtiptjobOrdQty]').each(function () {
        //        if (sn == pid ) {
        //            var row = $(this).closest('tr');
        //            var num = row.find('#txtiptjobOrdQty').val();
        //            row.find('#txtiptjobOrdQty').focus().val('').val(num);
        //            return true;
        //        }
        //    });
        //}
        var otable = $('#inputjodettab').DataTable();
        var odata = otable.rows().data();
        $('input[id=txtiptjobOrdQty]').each(function (ig) {
            if (odata[ig].sno == ccno) {
                var row = $(this).closest('tr');
                var num = row.find('#txtiptjobOrdQty').val();
                row.find('#txtiptjobOrdQty').focus().val('').val(num);
            }
        });


    });


    $(document).on('keyup', '.calcStockqty', function () {
        debugger;
        var table = $('#inputstkdettab').DataTable();

        var CSno = table.row($(this).parents('tr')).data()["sno"];
        var IId = table.row($(this).parents('tr')).data()["itmid"];
        var CId = table.row($(this).parents('tr')).data()["clrid"];
        var SId = table.row($(this).parents('tr')).data()["sizeid"];
        var balstk = table.row($(this).parents('tr')).data()["bal"];
        var itmstkid = table.row($(this).parents('tr')).data()["stockid"];
        var jm = table.row($(this).parents('tr')).data()["jobordno"];
        var value = $(this).val();
        var IssQty = value;


        var allow = 0;
        var balallow = 0;
        for (j = 0; IpSaveJobDetList.length > j; j++) {
            if (IpSaveJobDetList[j].jobordno == jm && IpSaveJobDetList[j].itmid == IId && IpSaveJobDetList[j].clrid == CId && IpSaveJobDetList[j].sizeid == SId) { }
            else {
                var bal = IpSaveJobDetList[j].bal; //+pallown
                // var prgqty = OpSaveJobDetList[j].prgopqty;
                var ordqty = IpSaveJobDetList[j].ordqty;
                if (IpSaveJobDetList[j].bal < IpSaveJobDetList[j].ordqty) {
                    var curallow = parseFloat(IpSaveJobDetList[j].ordqty) - parseFloat(IpSaveJobDetList[j].bal)
                    allow = allow + parseFloat(curallow);
                }
            }
        }

        balallow = pallown - allow;

        for (j = 0; IpSaveJobDetList.length > j; j++) {
            if (CId == IpSaveJobDetList[j].clrid && IId == IpSaveJobDetList[j].itmid && SId == IpSaveJobDetList[j].sizeid && IpSaveJobDetList[j].jobordno == jm) {
                var bal = IpSaveJobDetList[j].bal; //+pallown
                //var prgqty = OpSaveJobDetList[j].prgopqty;
                var ordqty = IpSaveJobDetList[j].ordqty;
                var allow = 0;
                if (IpSaveJobDetList[j].bal < value) {

                    var totactval = parseFloat(IpSaveJobDetList[j].bal) + balallow;

                    if (totactval < value) {

                        value = parseFloat(totactval).toFixed(3);
                        IssQty = value;

                    }
                }
            }
        }

        //currentrowstk = [];
        //for (var w = 0; w < IpSaveJobDetList.length; w++) {
        //    if (IpSaveJobDetList[w].jobordno == jm && IpSaveJobDetList[w].itmid == IId && IpSaveJobDetList[w].clrid == CId && IpSaveJobDetList[w].sizeid == SId) {
        //        currentrowstk.push(IpSaveJobDetList[w]);
        //        var jno = currentrowstk[0].jobordno;
        //        // Itmstkid = currentrow[0].ItemStockId;
        //        var balq = currentrowstk[0].bal;
        //    }
        //}

        $.each(IpStkDetList, function () {
            if (this.stockid == itmstkid) {

                if (balstk >= value) {
                    this.issues = value;
                    //if (balq >= value) {
                    //    this.issues = value;
                    //}
                    //else {
                    //    var t = value - balq;
                    //    this.issues = balq;
                    //}
                }
                else {
                    var t = value - balstk;
                    this.issues = balstk;
                }

            }
        });

        $.each(IpSaveStkDetList, function () {
            if (this.stockid == itmstkid) {

                if (balstk >= value) {
                    this.issues = value;
                    //if (balq >= value) {
                    //    this.issues = value;
                    //}
                    //else {
                    //    var t = value - balq;
                    //    this.issues = balq;
                    //}
                }
                else {
                    var t = value - balstk;
                    this.issues = balstk;
                }

            }
        });

        //var tot = 0;
        //for (var d = 0; d < IpSaveStkDetList.length; d++) {
        //    if (IpSaveStkDetList[d].jobordno == jm && IpSaveStkDetList[d].itmid == IId && IpSaveStkDetList[d].clrid == CId && IpSaveStkDetList[d].sizeid == SId) {
        //        var at = IpSaveStkDetList[d].quantity;
        //        tot = tot + parseFloat(at);
        //    }
        //}
        //var isqty = parseFloat(tot) + value;
        //if (tot > balq) {
        //    alert('Should not exceed Bal Qty in JobOrder table');
        //    return true;
        //}

        //var currentrow = [];
        //for (var a = 0; a < IpSaveJobDetList.length; a++) {


        //if (IpSaveJobDetList[a].jobordno == jm && IpSaveJobDetList[a].itmid == IId && IpSaveJobDetList[a].clrid == CId && IpSaveJobDetList[a].sizeid == SId) {
        //    currentrow.push(IpSaveJobDetList[a]);
        //    var jno = currentrow[0].jobordno;
        //    // Itmstkid = currentrow[0].ItemStockId;
        //    var balq = currentrow[0].bal;

        //    if (balq <= balstk) {

        //    }
        $.each(IpSaveJobDetList, function () {
            //if (this.JoMasId == jm) {
            if (this.jobordno == jm && this.itmid == IId && this.clrid == CId && this.sizeid == SId) {

                this.ordqty = value;
                //if (value >= balstk) {
                //    //  if (tot < balq) {
                //    if (balstk >= value) {
                //        this.ordqty = value;
                //    }
                //    else {
                //        var t = value - balstk;
                //        this.ordqty = balstk;
                //    }
                //    //}
                //    //else {
                //    //    this.IssueQty = value;
                //    //  }
                //}
                //else {
                //    if (balq >= value) {
                //        this.ordqty = value;
                //    }
                //    else {
                //        var t = value - balq;
                //        this.ordqty = balq;
                //    }
                //}
                //if (balq <= balstk) {
                //    this.IssueQty = balq;
                //}
            }
        });

        $.each(IpJobDetList, function () {
            //if (this.JoMasId == jm) {
            if (this.jobordno == jm && this.itmid == IId && this.clrid == CId && this.sizeid == SId) {
                this.ordqty = value;
                //if (value >= balstk) {
                //    if (balstk >= value) {
                //        this.ordqty = value;
                //    }
                //    else {
                //        var t = value - balstk;
                //        this.ordqty = balstk;
                //    }
                //}
                //else {
                //    if (balq >= value) {
                //        this.ordqty = value;
                //    }
                //    else {
                //        var t = value - balq;
                //        this.ordqty = balq;
                //    }
                //}

            }
        });
        // }
        // }

        var totalamnt = 0;

        for (var e = 0; e < IpStkDetList.length; e++) {
            var amount = IpStkDetList[e].issues;
            totalamnt = totalamnt + parseFloat(amount);
        }

        $.each(IpSaveJobDetList, function () {
            if (this.itmid == IId && this.clrid == CId && this.sizeid == SId && this.jobordno == jm) {
                this.ordqty = totalamnt;

            }
        });
        $.each(IpJobDetList, function () {
            if (this.itmid == IId && this.clrid == CId && this.sizeid == SId && this.jobordno == jm) {
                this.ordqty = totalamnt;

            }
        });


        var total = 0;

        for (var e = 0; e < IpSaveJobDetList.length; e++) {
            if (IpSaveJobDetList[e].itmid == IId && IpSaveJobDetList[e].clrid == CId && IpSaveJobDetList[e].sizeid == SId) {
                var amount = IpSaveJobDetList[e].ordqty;
                total = total + parseFloat(amount);
            }
        }

        $.each(IpItmList, function () {
            if (this.itmid == IId && this.clrid == CId && this.sizeid == SId) {
                this.issqty = total;

            }
        });
        //loadDelStockTable(SItemList);

        InputSaveJobdetTab(IpSaveJobDetList);
        InputJobdetTab(IpJobDetList);
        InputitmTab(IpItmList);
        InputStkdetTab(IpStkDetList);
        InputSaveStkdetTab(IpSaveStkDetList);
        //Datatable textbox focus
        var rows = $("#inputstkdettab").dataTable().fnGetNodes();
        var dtTable = $('#inputstkdettab').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
            $('input[id=txtiptissQty]').each(function () {
                if (sn == itmstkid && $(this).val() == IssQty) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtiptissQty').val();
                    row.find('#txtiptissQty').focus().val('').val(num);
                    return true;
                }
            });
        }
    });

    $(document).on('keyup', '.calcmrate', function () {
        debugger;
        var table = $('#inputstkdettab').DataTable();

        var CSno = table.row($(this).parents('tr')).data()["sno"];
        var IId = table.row($(this).parents('tr')).data()["itmid"];
        var CId = table.row($(this).parents('tr')).data()["clrid"];
        var SId = table.row($(this).parents('tr')).data()["sizeid"];
        var balstk = table.row($(this).parents('tr')).data()["bal"];
        var itmstkid = table.row($(this).parents('tr')).data()["stockid"];
        var jm = table.row($(this).parents('tr')).data()["jobordno"];
        var value = $(this).val();
        var mrate = value;
    
        $.each(IpStkDetList, function () {
            if (this.stockid == itmstkid) {
                this.Markup_Rate = value;
            }
        });

        $.each(IpSaveStkDetList, function () {
            if (this.stockid == itmstkid) {
                this.Markup_Rate = value;

            }
        });

        InputStkdetTab(IpStkDetList);
        InputSaveStkdetTab(IpSaveStkDetList);
        //Datatable textbox focus
        //var rows = $("#inputstkdettab").dataTable().fnGetNodes();
        //var dtTable = $('#inputstkdettab').DataTable();
        //for (var i = 0; i < rows.length; i++) {
        //    var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
        //    $('input[id=txtmrate]').each(function () {
        //        if (sn == itmstkid && $(this).val() == mrate) {
        //            var row = $(this).closest('tr');
        //            //var num = row.find('#txtmrate').val();
        //            row.find('#txtmrate').focus().val('').val(mrate);
        //            return true;
        //        }
        //    });
        //}

        var table = $('#inputstkdettab').DataTable();
        var data = table.rows().data();
        $('input[id=txtmrate]').each(function (ig) {
            if (data[ig].stockid == itmstkid) {
                var row = $(this).closest('tr');
                //row.find('#txtmrate').val(value);
                row.find('#txtmrate').focus().val('').val(value);
            }
        });


    });



});



function LoadNetAmount() {
    var Per = $('#txtPer').val();
    var GrossAmt = $('#txtGrossAmt').val();
    var Amt = (Per * GrossAmt) / 100;
    $('#txtAmount').val(Amt);



}

function loadAccTable(AcListObj) {
    debugger;
    $('#tblPaydetails').DataTable().destroy();

    $('#tblPaydetails').DataTable({
        data: AccList,
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

               { title: "AddlessId", data: "Addlessid", "visible": false },
               { title: "AccountsHead", data: "Addless", },
               { title: "+/-", data: "PlusOrMinus", },
               { title: "Percent", data: "Percentage", },
               { title: "Amount", data: "Amount", },

               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnaccedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button"data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnaccremove btn btn-round btn-danger"> <i class="fa fa-minus"></i> </button> '

               },

        ]
    });

    //var totalamnt = 0;
    //for (var e = 0; e < AccList.length; e++) {
    //    var amount = AccList[e].Amount;
    //    totalamnt = totalamnt + parseFloat(amount);

    //}


    //$('#txtAccAmt').val(totalamnt.toFixed(3));
    //var AccountAmt = $('#txtAccAmt').val();
    //var BAmt = $('#txtBTotAmt').val();

}


function fnClearAccControls() {
    $('#ddlAcc').val('0');
    $('#txtPorMins').val('');
    $('#txtPer').val('');
    $('#txtAmount').val('');
}
function ClearTextbox() {
    debugger;
    //$('#ddlCompany').val("0");
    $('#ddlUnit').val("0");
    $('#ddlRefNo').val("0");
    $('#ddlOrderNo').val("0");
    $('#ddlwrkdiv').val("0");
    $('#ddlBuyer').val("0");
    $('#ddlProcess').val("0");
    $('#ddlSupplier').val("0");
    $('#ddlStyle').val("0");
    $('#txtremarks').val("");
    var protype = $('input[name="optwrkord"]:checked').attr('value');
    if (protype == 'P') {

        $('#supp').show();
        $("#wrkdiv").hide();
    }
    else if (protype == 'W') {
        $('#supp').hide();
        $("#wrkdiv").show();
    }
    Loadgridddl();
    LoadStorefromcompany();
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
function RadioMLClick() {
    var protype = $('input[name="proctype"]:checked').attr('value');
    if (protype == 'P') {

        $('#ddlpro').show();
        $("#ddlwrkd").hide();
        LoadSupplierSetup();
        LoadSupplierDDL("#ddlMSupplier,#ddlprocess");
    }
    else if (protype == 'W') {
        $('#ddlpro').hide();
        $("#ddlwrkd").show();
        LoadWorkdivisionDDL("#ddlwrkdiv,#ddlMwrkdiv,#ddlwrkdivision");
    }
    $('#tblmaindetails').DataTable().destroy();

    ChkProcess = true;
    ChkOrdn = true;
    DtChk = false;
    ChkUnit = true;
    ChkComp = false;
    LoadMaingridord();
    ddlmain();

    LoadMaingrid();
}

function RadioMainClick() {
    var protype = $('input[name="proctype"]:checked').attr('value');
    if (protype == 'P') {

        $('#Msupp').show();
        $("#Mwrkdiv").hide();
    }
    else if (protype == 'W') {
        $('#Msupp').hide();
        $("#Mwrkdiv").show();
    }
}

function LoadrefNo() {
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
    $.ajax({
        url: "/ProductionOrder/Getrefno",
        data: JSON.stringify({ cmpid: cmpyid, cmpunitid: cunitid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            if (result.Status == 'SUCCESS') {

                // if (Mode == 0) {
                var data = result.Value;
                $(ddlRefNo).empty();
                $(ddlRefNo).append($('<option/>').val('0').text('--Select RefNo--'));
                $.each(data, function () {
                    $(ddlRefNo).append($('<option></option>').val(this.bmasid).text(this.refno));
                });
                //}


            }
            LoadData();

        }

    });
}

function Loadgrid() {
    debugger;

    LoadSupplierSetup();
    //var cmpyid = $('select#ddlCompany option:selected').val();
    //var cunitid = $('select#ddlUnit option:selected').val();
    //var procid = $('select#ddlProcess option:selected').val();
    var closed = 'N';
    var amen = 'N';
    var protype = $('input[name="type"]:checked').attr('value');



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

    var byid = $('select#ddlBuyer option:selected').val();
    if (byid == null || byid == "0") {
        byid = 0;
    }

    var styid = $('select#ddlStyle option:selected').val();
    if (styid == null || styid == "0") {
        styid = 0;
    }

    var ordNo = "";
    var ONo = $('select#ddlOrderNo option:selected').val();

    if (ONo == 0 || ONo == undefined) {
        ordNo == "";
    }
    else {

        ordNo = $('select#ddlOrderNo option:selected').text();
    }


    var RfNo = "";
    var Rn = $('select#ddlRefNo option:selected').val();

    if (Rn == 0 || Rn == undefined) {
        RfNo == "";
    }
    else {

        RfNo = $('select#ddlRefNo option:selected').text();
    }

    $.ajax({
        url: "/ProductionOrder/Loadgrid",
        data: JSON.stringify({ cmpid: cmpyid, closed: closed, amend: amen, cmpunitid: cunitid, procid: procid, ordertype: protype, buyerid: byid, refno: RfNo, styleid: styid, orderno: ordNo }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            entrygriddet = result.Value;
            LoadEntrytab(entrygriddet);

        }

    });
}


function LoadAddFunction() {

    LoadStorefromcompany();
    Loadgridddl();
    Loadgrid();
}

function Loadgridddl() {
    debugger;
    //var cmpyid = $('select#ddlCompany option:selected').val();
    //var cunitid = $('select#ddlUnit option:selected').val();
    //var procid = $('select#ddlProcess option:selected').val();
    var closed = 'N';
    var amen = 'N';
    var protype = $('input[name="type"]:checked').attr('value');
    //var proctype = $('input[name="optwrkord"]:checked').attr('value');
    //if (proctype == 'P') {
    //    var procrid = $('select#ddlSupplier option:selected').val();
    //}
    //else if (proctype == 'W') {
    //    var procrid = $('select#ddlwrkdiv option:selected').val();
    //}

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

    var byid = $('select#ddlBuyer option:selected').val();
    if (byid == null || byid == "0") {
        byid = 0;
    }

    var styid = $('select#ddlStyle option:selected').val();
    if (styid == null || styid == "0") {
        styid = 0;
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
        url: "/ProductionOrder/Loadgrid",
        data: JSON.stringify({ cmpid: cmpyid, closed: closed, amend: amen, cmpunitid: cunitid, procid: procid, ordertype: protype, buyerid: byid, refno: RfNo, styleid: styid, ordo: ordNo }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            entrygriddet = result.Value;
            LoadEntrytab(entrygriddet);
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
                var stydet = {};
                var sty = [];
                var procdet = {};
                var proc = [];
                var cmpunitdet = {};
                var cmpunit = [];
                $.each(data, function (i, el) {

                    if (!compdet[el.cmpid]) {
                        compdet[el.cmpid] = true;
                        comp.push(el);
                    }

                    if (!cmpunitdet[el.cmpunitid]) {
                        cmpunitdet[el.cmpunitid] = true;
                        cmpunit.push(el);
                    }

                    if (!recptdet[el.refno]) {
                        recptdet[el.refno] = true;
                        recpt.push(el);
                    }

                    if (!dcdet[el.orderno]) {
                        dcdet[el.orderno] = true;
                        dc.push(el);
                    }

                    if (!procdet[el.processid]) {
                        procdet[el.processid] = true;
                        proc.push(el);
                    }
                    if (!unitdet[el.buyerid]) {
                        unitdet[el.buyerid] = true;
                        unit.push(el);
                    }

                    if (!stydet[el.styleid]) {
                        stydet[el.styleid] = true;
                        sty.push(el);
                    }

                    if (!procdet[el.processid]) {
                        procdet[el.processid] = true;
                        proc.push(el);
                    }
                });



                $('#ddlBuyer').empty();
                $('#ddlRefNo').empty();
                $('#ddlStyle').empty();
                $('#ddlOrderNo').empty();
                $('#ddlProcess').empty();
                $('#ddlUnit').empty();




                $(ddlBuyer).append($('<option/>').val('0').text('--Select Buyer--'));
                $.each(unit, function () {
                    $(ddlBuyer).append($('<option></option>').val(this.buyerid).text(this.buyer));
                });

                $(ddlRefNo).append($('<option/>').val('0').text('--Select RefNo--'));
                $.each(recpt, function () {
                    $(ddlRefNo).append($('<option></option>').text(this.refno));
                });

                //$(ddlCompany).append($('<option/>').val('0').text('--Select Company--'));
                //$.each(comp, function () {
                //    $(ddlCompany).append($('<option></option>').val(this.cmpid).text(this.company));
                //});

                $(ddlStyle).append($('<option/>').val('0').text('--Select Style--'));
                $.each(sty, function () {
                    $(ddlStyle).append($('<option></option>').val(this.styleid).text(this.style));
                });

                $(ddlOrderNo).append($('<option/>').val('0').text('--Select OrderNo--'));
                $.each(dc, function () {
                    $(ddlOrderNo).append($('<option></option>').text(this.orderno));
                });

                $(ddlProcess).append($('<option/>').val('0').text('--Select Process--'));
                $.each(proc, function () {
                    $(ddlProcess).append($('<option></option>').val(this.processid).text(this.process));
                });

                $(ddlUnit).append($('<option/>').val('0').text('--Select Unit--'));
                $.each(cmpunit, function () {
                    $(ddlUnit).append($('<option></option>').val(this.cmpunitid).text(this.cmpnyunit));
                });
            }

        }

    });
}


function LoadEntrytab(list) {
    $('#entrygridtab').DataTable().destroy();

    $('#entrygridtab').DataTable({
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
                   { title: "Jmasid", data: "jmasid", "visible": false },
                   { title: "Job No", data: "jobordno" },
                   { title: "Style", data: "style" },
                   { title: "Bmasid", data: "bmasid", "visible": false },
                   { title: "Order No", data: "orderno" },
                   { title: "Ref No", data: "refno" },
                   { title: "Buyer", data: "buyer" },


                   {
                       title: "Group", data: "jmasid",
                       render: function (data) {

                           //return '<input type="checkbox" id="group" value=' + data + ' onclick="myfunc(this.value);">';
                           return '<input type="checkbox" id="groupbom" class="groupbom editor-active" unchecked  value=' + data + ' >';
                       }
                   },

        ]

    });
}

function myfunc(Val) {
    debugger;
    JOrdID = JOrdID + "," + Val;

}
function LoadData() {
    debugger;


    var list = [];

    for (var j = 0; j < entrygriddet.length; j++) {
        if (entrygriddet[j].CheckLoad == "Y") {

            JOrdID = JOrdID + "," + entrygriddet[j].jmasid;

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

    var storeunitid = $('#ddlAStoreUnit').val();
    if (storeunitid == 0 && ValidateProductionStore == "True") {
        //alert('Please select Store..');
        var msg = 'Please select Store...';
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
            // alert('Select WorkDivision');
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

    LoadProcessDetails(Processid);

    CompanyId = $('select#ddlCompany option:selected').val();
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
    LoadOutputItm();
    LoadOutputJobdet();
    LoadInputItm();
    LoadInputJobdet();
    var protype = $('input[name="type"]:checked').attr('value');
    OrderType = protype;
    //if (protype == 'W') {
    Loadstkdet();
    //}
    //else if (protype == 'S') {
    //}
    LoadLocation();
    LoadIssLocation();
}

function backtomain() {
    //$('#myModal1').hide();
    $('#myModal1').modal('hide');
}
function myItmddl(Val) {

    var foo = [];
    MOrd = 0;
    $('#ddlItemgrp :selected').each(function (i, selected) {
        foo[i] = $(selected).val();

        MOrd = MOrd + "," + foo[i];


    });

    LoadItemddl();

}
function LoadOutputItm() {
    debugger;

    var procid = $('select#ddlProcess option:selected').val();
    var closed = 'N';
    var amen = 'N';

    $.ajax({
        url: "/ProductionOrder/LoadOutputitmsgrid",
        data: JSON.stringify({ closed: closed, jobordno: JOrdID, procid: procid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            OpItmList = result.Value;
            OutputitmTab(OpItmList);

            opItmid = OpItmList[0].itmid;
            OpClrid = OpItmList[0].clrid;
            OpSizeid = OpItmList[0].sizeid;
        }

    });
}

function LoadInputItm() {
    debugger;

    var procid = $('select#ddlProcess option:selected').val();
    var closed = 'N';
    var amen = 'N';

    $.ajax({
        url: "/ProductionOrder/LoadInputitmsgrid",
        data: JSON.stringify({ closed: closed, jobordno: JOrdID, procid: procid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            IpItmList = result.Value;
            InputitmTab(IpItmList);
            Itmid = IpItmList[0].itmid;
            Colorid = IpItmList[0].clrid;
            Sizeid = IpItmList[0].sizeid;
        }

    });
}


function LoadOutputJobdet() {
    debugger;

    var procid = $('select#ddlProcess option:selected').val();
    var closed = 'N';
    var amen = 'N';

    $.ajax({
        url: "/ProductionOrder/LoadOutputjobdetgrid",
        data: JSON.stringify({ closed: closed, jobordno: JOrdID, procid: procid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            OpSaveJobDetList = result.Value;
            OutputSaveJobdetTab(OpSaveJobDetList);

            var colorempty = [];
            colorempty = OpSaveJobDetList;

            colorempty = $.grep(colorempty, function (v) {
                return (v.itmid === opItmid && v.clrid === OpClrid && v.sizeid === OpSizeid);
            });
            OpJobDetList = [];
            OpJobDetList = colorempty;
            OutputJobdetTab(colorempty);
        }

    });
}

function LoadInputJobdet() {
    debugger;

    var procid = $('select#ddlProcess option:selected').val();
    var closed = 'N';
    var amen = 'N';

    $.ajax({
        url: "/ProductionOrder/LoadInputjobdetgrid",
        data: JSON.stringify({ closed: closed, jobordno: JOrdID, procid: procid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            IpSaveJobDetList = result.Value;
            InputSaveJobdetTab(IpSaveJobDetList);

            var colorempty = [];
            colorempty = IpSaveJobDetList;

            colorempty = $.grep(colorempty, function (v) {
                return (v.itmid === Itmid && v.clrid === Colorid && v.sizeid === Sizeid);
            });
            IpJobDetList = [];
            IpJobDetList = colorempty;
            InputJobdetTab(colorempty);
        }

    });
}

function LoadPlusAdd() {
    $('#txtPorMins').val("");
    var AccID = $('#ddlAcc').val();

    $.ajax({
        url: "/AccountHeads/GetbyID/" + AccID,
        typr: "GET",

        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                $('#txtPorMins').val(obj.AddlessType);

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
    $('#txtDeliDate').val(Fdatestring);
    $('#txtOrderDate').val(Fdatestring);


}
function OutputitmTab(list) {
    $('#outputitmtab').DataTable().destroy();

    $('#outputitmtab').DataTable({
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
                   { title: "Itemid", data: "itmid", "visible": false },
                   { title: "Output Item", data: "itm" },
                   { title: "Colorid", data: "clrid", "visible": false },
                   { title: "Category I", data: "clr" },
                   { title: "Sizeid", data: "sizeid", "visible": false },
                   { title: "Category II", data: "size" },
                    { title: "AppRate", data: "apprate" },
                   {
                       title: "Rate", data: "rate",
                       render: function (data) {

                           return '<input type="text" id="txtOpRQty" class="calcrate form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';

                       },
                   },
                   { title: "Prog Qty", data: "prgopqty" },
                   { title: "Balance", data: "bal" },
                   {
                       title: "Output", data: "ordqty",
                       render: function (data) {

                           return '<input type="text" id="txtOpOrdQty" class="calcAmt form-control"  style="width: 50px;text-align: center;"  value=' + data + ' disabled>';

                       },
                   },
                   { title: "Sec Qty", data: "isdeci", "visible": false },
                   {
                       title: "Apply", "visible": false,
                       render: function (data) {

                           return '<input type="checkbox" id="tab"  >';
                       }
                   },
                    //{
                    //    title: "View",// data: "jobordno",
                    //    render: function (data) {

                    //        return '<button type="button"  class="btnviewopitem btn btn-info btn-round" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;"><i class="fa fa-eye"></i></button>';
                    //    }
                    //},
        ]

    });

    var table = $('#outputitmtab').DataTable();
    $("#outputitmtab tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#outputitmtab tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}

function InputitmTab(list) {
    $('#inputitmtab').DataTable().destroy();

    $('#inputitmtab').DataTable({
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
                   { title: "Itemid", data: "itmid", "visible": false },
                   { title: "Input Item", data: "itm" },
                   { title: "Colorid", data: "clrid", "visible": false },
                   { title: "Category I", data: "clr" },
                   { title: "Sizeid", data: "sizeid", "visible": false },
                   { title: "Category II", data: "size" },
                   //{
                   //    title: "Rate", data: "rate",
                   //    render: function (data) {

                   //        return '<input type="text" id="txtOpRQty" class="editor-active"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                   //    },
                   //},
                   { title: "Prog Qty", data: "prgopqty" },
                   { title: "Balance", data: "bal" },
                    { title: "OrdQty", data: "ordqty", "visible": false },
                   {
                       title: "IssueQty", data: "issqty",
                       render: function (data) {

                           return '<input type="text" id="txtipOrdQty" class="calcipAmt form-control"  style="width: 50px;text-align: center;"  value=' + data + ' disabled>';

                       },
                   },
                   { title: "Sec Qty", data: "isdeci", "visible": false },
                   {
                       title: "Apply", "visible": false,
                       render: function (data) {

                           return '<input type="checkbox" id="tab"  >';
                       }
                   },
                    //{
                    //    title: "View",// data: "jobordno",
                    //    render: function (data) {

                    //        return '<button type="button"  class="btnviewiputitem btn btn-round btn-info" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;"><i class="fa fa-eye"></i></button>';
                    //    }
                    //},
        ]

    });

    var table = $('#inputitmtab').DataTable();
    $("#inputitmtab tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#inputitmtab tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}

$(document).ready(function () {
    $("#outputitmtab ").dataTable().find("tbody").on('click', 'tr', function () {
        indexop = (this.rowIndex) - 1;
    });
});

$(document).ready(function () {
    $("#outputjodettab ").dataTable().find("tbody").on('click', 'tr', function () {
        indopjob = (this.rowIndex) - 1;
    });
});

$(document).ready(function () {
    $("#inputitmtab ").dataTable().find("tbody").on('click', 'tr', function () {
        indiptitm = (this.rowIndex) - 1;
    });
});

$(document).ready(function () {
    $("#inputjodettab ").dataTable().find("tbody").on('click', 'tr', function () {
        inditjbdet = (this.rowIndex) - 1;
    });
});

$(document).ready(function () {
    $("#inputstkdettab ").dataTable().find("tbody").on('click', 'tr', function () {
        indipstkdet = (this.rowIndex) - 1;
    });
});

function calcsepquan(value) {
    debugger;
    indopjob;

    var currentrowoftcpi = OpJobDetList.slice(indopjob);
    var pid = currentrowoftcpi[0].sno;
    var itmid = currentrowoftcpi[0].itmid;
    var colorid = currentrowoftcpi[0].clrid;
    var sizeid = currentrowoftcpi[0].sizeid;
    //var uomid = currentrowoftcpi[0].OUomid;
    var balq = currentrowoftcpi[0].bal;

    $.each(OpSaveJobDetList, function () {
        if (this.sno == pid) {


            if (balq >= value) {
                this.ordqty = value;
            }
            else {
                var t = value - balq;
                this.ordqty = balq;
            }

        }
    });

    $.each(OpJobDetList, function () {
        if (this.sno == pid) {


            if (balq >= value) {
                this.ordqty = value;
            }
            else {
                var t = value - balq;
                this.ordqty = balq;
            }

        }
    });

    var totalamnt = 0;

    for (var e = 0; e < OpJobDetList.length; e++) {
        var amount = OpJobDetList[e].ordqty;
        totalamnt = totalamnt + parseFloat(amount);
    }
    $.each(OpItmList, function () {
        if (this.itmid == itmid && this.sizeid == sizeid && this.clrid == colorid) {
            //this.quantity = 0;

            this.ordqty = totalamnt;
            //}


        }
    });
    OutputitmTab(OpItmList);
    OutputSaveJobdetTab(OpSaveJobDetList);
    OutputJobdetTab(OpJobDetList);
}

function OutputJobdetTab(list) {
    $('#outputjodettab').DataTable().destroy();

    $('#outputjodettab').DataTable({
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
              { title: "Sno", data: "sno", "visible": false },
                   { title: "Prdprgdetid", data: "prgdetid", "visible": false },
                   { title: "Itmid", data: "itmid", "visible": false },
                   { title: "Clrid", data: "clrid", "visible": false },
                   { title: "Sizeid", data: "sizeid", "visible": false },
                   { title: "ProdProgNo", data: "prodpgmno" },
                   { title: "Job Ord No", data: "jobordno" },
                    { title: "Order No", data: "orderno" },
                   { title: "Ref No", data: "refno" },
                   {
                       title: "Prog Qty", data: "prgopqty",

                   },
                   { title: "Balance", data: "bal" },

                   {
                       title: "Adj Qty", data: "ordqty",
                       render: function (data) {

                           return '<input type="text" id="txtOpjobOrdQty" class="calcsepquan form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                       },
                   },
                   { title: "Sec Qty", data: "isdeci", "visible": false },


        ]

    });

    var table = $('#outputjodettab').DataTable();
    $("#outputjodettab tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#outputjodettab tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}


function InputSaveJobdetTab(list) {
    $('#inputsavejodettab').DataTable().destroy();

    $('#inputsavejodettab').DataTable({
        data: list,
        columns: [
              { title: "Sno", data: "sno", "visible": false },
                   { title: "Prdprgdetid", data: "prgdetid", "visible": false },
                   { title: "Itmid", data: "itmid", "visible": false },
                   { title: "Clrid", data: "clrid", "visible": false },
                   { title: "Sizeid", data: "sizeid", "visible": false },
                   { title: "ProdProgNo", data: "prodpgmno" },
                   { title: "Job Ord No", data: "jobordno" },
                   {
                       title: "Prog Qty", data: "prgopqty",

                   },
                   //{ title: "Balance", data: "bal" },

                   {
                       title: "Adj Qty", data: "ordqty",
                       //render: function (data) {

                       //    return '<input type="text" id="txtiptjobOrdQty" class="editor-active"  style="width: 50px;text-align: center;"  value=' + data + ' onkeyup="calcipsepquan(this.value);">';

                       //},
                   },
                   { title: "Sec Qty", data: "isdeci" },


        ]

    });
}

function InputJobdetTab(list) {
    $('#inputjodettab').DataTable().destroy();

    $('#inputjodettab').DataTable({
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
              { title: "Sno", data: "sno", "visible": false },
                   { title: "Prdprgdetid", data: "prgdetid", "visible": false },
                   { title: "Itmid", data: "itmid", "visible": false },
                   { title: "Clrid", data: "clrid", "visible": false },
                   { title: "Sizeid", data: "sizeid", "visible": false },
                   { title: "ProdProgNo", data: "prodpgmno" },
                   { title: "Job Ord No", data: "jobordno" },
                   {
                       title: "Prog Qty", data: "prgopqty",

                   },
                   { title: "Bal Qty", data: "bal" },

                   {
                       title: "Adj Qty", data: "ordqty",
                       render: function (data) {

                           return '<input type="text" id="txtiptjobOrdQty" class="calcipsepquan form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                       },
                   },
                   { title: "Sec Qty", data: "isdeci", "visible": false },
                   //{
                   //    title: "View",// data: "jobordno",
                   //    render: function (data) {

                   //        return '<button type="button"  class="btnviewiputstk btn btn-round btn-info" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;"><i class="fa fa-eye"></i></button>';
                   //    }
                   //},

        ]

    });

    var table = $('#inputjodettab').DataTable();
    $("#inputjodettab tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#inputjodettab tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}
$(document).on('click', '.btnviewopitem', function () {
    debugger;

    var table = $('#outputitmtab').DataTable();

    var ItmId = table.row($(this).parents('tr')).data()["itmid"];
    var ClrId = table.row($(this).parents('tr')).data()["clrid"];
    var SzId = table.row($(this).parents('tr')).data()["sizeid"];

    var OQty = $(this).closest('tr').find('#txtRQty').val();



    //if (Mode == 0) {

    var colorempty = [];
    colorempty = OpSaveJobDetList;

    colorempty = $.grep(colorempty, function (v) {
        return (v.itmid === ItmId && v.clrid === ClrId && v.sizeid === SzId);
    });

    OpJobDetList = colorempty;
    OutputJobdetTab(OpJobDetList);


    // }

    //if (Mode == 1 || Mode == 2) {
    //    // var OQty = 0;
    //    //LoadEditOrderDetails(POMId, ItmId, ClrId, SzId, PUId, OQty)
    //    LoadEditGrnOrderDetails(GrnMasId, ItmId, ClrId, SzId, PUId, OQty, SupplierId, CompId)
    //}


});

$(document).ready(function () {

    $('#outputitmtab').on('click', 'tr', function (e) {
        debugger;

        var table = $('#outputitmtab').DataTable();
        var row = $(this).closest('tr');
        var data = $('#outputitmtab').dataTable().fnGetData(row);


        //var ItmId = data.itemid; //table.row($(this).parents('tr')).data()["itemid"];
        //var ClrId = data.colorid; //table.row($(this).parents('tr')).data()["colorid"];
        //var SzId = data.sizeid; //table.row($(this).parents('tr')).data()["sizeid"];
        //var PUId = data.uomId; //table.row($(this).parents('tr')).data()["uomId"];




        var ItmId = data.itmid; //table.row($(this).parents('tr')).data()["itmid"];
        var ClrId = data.clrid; //table.row($(this).parents('tr')).data()["clrid"];
        var SzId = data.sizeid; //table.row($(this).parents('tr')).data()["sizeid"];

        //var OQty = $(this).closest('tr').find('#txtRQty').val();



        //if (Mode == 0) {

        var colorempty = [];
        colorempty = OpSaveJobDetList;

        colorempty = $.grep(colorempty, function (v) {
            return (v.itmid === ItmId && v.clrid === ClrId && v.sizeid === SzId);
        });

        OpJobDetList = colorempty;
        OutputJobdetTab(OpJobDetList);
    });
});


$(document).ready(function () {

    $('#inputitmtab').on('click', 'tr', function (e) {
        debugger;

        var table = $('#inputitmtab').DataTable();
        var row = $(this).closest('tr');
        var data = $('#inputitmtab').dataTable().fnGetData(row);


        //var ItmId = data.itemid; //table.row($(this).parents('tr')).data()["itemid"];
        //var ClrId = data.colorid; //table.row($(this).parents('tr')).data()["colorid"];
        //var SzId = data.sizeid; //table.row($(this).parents('tr')).data()["sizeid"];
        //var PUId = data.uomId; //table.row($(this).parents('tr')).data()["uomId"];



        var ItmId = data.itmid;//table.row($(this).parents('tr')).data()["itmid"];
        var ClrId = data.clrid;//table.row($(this).parents('tr')).data()["clrid"];
        var SzId = data.sizeid;//table.row($(this).parents('tr')).data()["sizeid"];

        // var OQty = $(this).closest('tr').find('#txtRQty').val();

        var colorempty = [];
        colorempty = IpSaveJobDetList;

        colorempty = $.grep(colorempty, function (v) {
            return (v.itmid === ItmId && v.clrid === ClrId && v.sizeid === SzId);
        });

        IpJobDetList = colorempty;
        InputJobdetTab(IpJobDetList);



        var ItmId = IpJobDetList[0]['itmid'];
        var ClrId = IpJobDetList[0]['clrid'];
        var SzId = IpJobDetList[0]['sizeid'];
        var jobno = IpJobDetList[0]['jobordno'];
        var Stkempty = [];
        Stkempty = IpSaveStkDetList;

        Stkempty = $.grep(Stkempty, function (v) {
            return (v.itmid === ItmId && v.clrid === ClrId && v.sizeid === SzId && v.jobordno === jobno);
        });

        IpStkDetList = Stkempty;
        InputStkdetTab(IpStkDetList);
    });
});



//$(document).on('click', '.btnviewiputstk', function () {
//    debugger;

//    var table = $('#inputjodettab').DataTable();

//    var ItmId = table.row($(this).parents('tr')).data()["itmid"];
//    var ClrId = table.row($(this).parents('tr')).data()["clrid"];
//    var SzId = table.row($(this).parents('tr')).data()["sizeid"];
//    var jobno = table.row($(this).parents('tr')).data()["jobordno"];
//    var Stkempty = [];
//    Stkempty = IpSaveStkDetList;

//    Stkempty = $.grep(Stkempty, function (v) {
//        return (v.itmid === ItmId && v.clrid === ClrId && v.sizeid === SzId && v.jobordno === jobno);
//    });

//    IpStkDetList = Stkempty;
//    InputStkdetTab(IpStkDetList);



//});


$(document).ready(function () {

    $('#inputjodettab').on('click', 'tr', function (e) {
        debugger;

        var table = $('#inputjodettab').DataTable();
        var row = $(this).closest('tr');
        var data = $('#inputjodettab').dataTable().fnGetData(row);

        //var ItmId = data.itemid; //table.row($(this).parents('tr')).data()["itemid"];
        //var ClrId = data.colorid; //table.row($(this).parents('tr')).data()["colorid"];
        //var SzId = data.sizeid; //table.row($(this).parents('tr')).data()["sizeid"];
        //var PUId = data.uomId; //table.row($(this).parents('tr')).data()["uomId"];

        var ItmId = data.itmid; //table.row($(this).parents('tr')).data()["itmid"];
        var ClrId = data.clrid; //table.row($(this).parents('tr')).data()["clrid"];
        var SzId = data.sizeid; //table.row($(this).parents('tr')).data()["sizeid"];
        var jobno = data.jobordno; //table.row($(this).parents('tr')).data()["jobordno"];

        var Stkempty = [];
        Stkempty = IpSaveStkDetList;

        Stkempty = $.grep(Stkempty, function (v) {
            return (v.itmid === ItmId && v.clrid === ClrId && v.sizeid === SzId && v.jobordno === jobno);
        });

        IpStkDetList = Stkempty;
        InputStkdetTab(IpStkDetList);
    });
});

function OutputSaveJobdetTab(list) {
    $('#outputsavejodettab').DataTable().destroy();

    $('#outputsavejodettab').DataTable({
        data: list,
        columns: [
              { title: "Sno", data: "sno" },
                   { title: "Prdprgdetid", data: "prgdetid" },
                   { title: "Itmid", data: "itmid" },
                   { title: "Clrid", data: "clrid" },
                   { title: "Sizeid", data: "sizeid" },
                   { title: "ProdProgNo", data: "prodpgmno" },
                   { title: "Job Ord No", data: "jobordno" },
                   {
                       title: "Prog Qty", data: "prgopqty",

                   },
                   { title: "Balance", data: "bal" },

                   {
                       title: "Adj Qty", data: "ordqty",
                       //render: function (data) {

                       //    return '<input type="text" id="txtOpjobOrdQty" class="editor-active"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                       //},
                   },
                   { title: "Sec Qty", data: "isdeci" },


        ]

    });
}


function Loadstkdet() {
    debugger;

    var CompId = $('#ddlCompany').val();
    var procid = 0;
    var itct = ''
    var cid = 0;
    var sid = 0;
    var itid = 0;
    var ttypt = '';
    var Storeid = $('#ddlAStoreUnit').val();


    $.ajax({
        url: "/ProductionOrder/LoadInputStkWgrid",
        data: JSON.stringify({ itmcat: itct, itmid: itid, clrid: cid, sizeid: sid, jobordno: JOrdID, transtype: ttypt, cmpid: CompId, procid: procid, Storeid: Storeid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            IpSaveStkDetList = json.Value;
            InputSaveStkdetTab(IpSaveStkDetList);


        }

    });
}

function InputSaveStkdetTab(list) {
    $('#inputsavestkdettab').DataTable().destroy();

    $('#inputsavestkdettab').DataTable({
        data: list,
        columns: [
              { title: "Stockid", data: "stockid" },

                   { title: "Itmid", data: "itmid" },
                   { title: "Clrid", data: "clrid" },
                   { title: "Sizeid", data: "sizeid" },
                   { title: "JobOrdNo", data: "jobordno" },
                   { title: "Lot No", data: "lotno" },
                   {
                       title: "Stock", data: "bal",

                   },


                   {
                       title: "Issues", data: "issues",
                       //render: function (data) {

                       //    return '<input type="text" id="txtOpjobOrdQty" class="editor-active"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                       //},
                   },
                   { title: "Process", data: "process" },


        ]

    });
}

function InputStkdetTab(list) {
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
        "bSort": false,
        columns: [
              { title: "Stockid", data: "stockid", "visible": false },

                   { title: "Itmid", data: "itmid", "visible": false },
                   { title: "Clrid", data: "clrid", "visible": false },
                   { title: "Sizeid", data: "sizeid", "visible": false },
                   { title: "JobOrdNo", data: "jobordno" },
                   { title: "Trans No", data: "TransNo" },
                   { title: "Lot No", data: "lotno", "visible": false },
                   {
                       title: "Stock Qty", data: "bal",

                   },


                   {
                       title: "Issues Qty", data: "issues",
                       render: function (data) {

                           return '<input type="text" id="txtiptissQty" class="calcStockqty form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                       },
                   },
                   { title: "Process", data: "process" },
                     {
                         title: "MarkupRate", data: "Markup_Rate",
                         render: function (data) {

                             return '<input type="text" id="txtmrate" class="calcmrate form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                         },
                     },


        ]

    });
}



function GenerateNumber() {
    debugger;

    table = "Production_Ord_Mas",
    column = "productionorder",
    compId = CompanyId,
    Docum = 'PRODUCTION ORDER'

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
function Add() {
    debugger;
    var type = $('input[name="optwrkord"]:checked').attr('value');
    var ordtype = $('input[name="type"]:checked').attr('value');
    var distype = $('input[name="disploc"]:checked').attr('value');
    var desptchtype = $('input[name="DType"]:checked').attr('value');
    var isstype = $('input[name="IssType"]:checked').attr('value');
    var iolist = [];
    var jobdetlist = [];
    var stkdetlist = [];



    var opchk = [];
    var ipchk = [];
    for (var y = 0; y < OpItmList.length; y++) {
        if (OpItmList[y].ordqty > 0) {
            opchk.push(OpItmList[y]);
        }
    }


    for (var u = 0; u < IpItmList.length; u++) {
        if (IpItmList[u].issqty > 0) {
            ipchk.push(IpItmList[u]);
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

    if (ValiCutBudApp == 'Y' && OrderType == 'W') {
        $.each(OpItmList, function (e) {
            if (OpItmList[e].ordqty > 0) {
                if (OpItmList[e].rate > 0 && OpItmList[e].rate <= OpItmList[e].apprate) {

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
        $.each(OpItmList, function (e) {
            if (OpItmList[e].ordqty > 0) {
                if (OpItmList[e].rate > 0 && OpItmList[e].rate <= OpItmList[e].apprate) {

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

    if (OpItmList.length > 0) {
        for (var r = 0; r < OpItmList.length; r++) {
            var det = {
                // productionorddetid:
                //  productionordid:
                itemid: OpItmList[r].itmid,
                colorid: OpItmList[r].clrid,
                sizeid: OpItmList[r].sizeid,
                inp_op: OpItmList[r].inrout,
                order_output_qty: OpItmList[r].prgopqty,
                issued_qty: OpItmList[r].ordqty,
                rate: OpItmList[r].rate,
                received_qty: 0.00,
                Return_Qty: 0.00,
                Damage_qty: 0.00,
                Cancel_Qty: 0.00,
                //Returnable_Qty:0.00,
                //Inp_CancelQty:
                //Markup_Rate:
                //Markup_Value:
                PlannedSizeID: OpItmList[r].sizeid,
                OrdSecQty: 0.00,
                ItemRemarks: $("#txtremarks").val(),
                Loss_Qty: 0.00,
                //IN_OUT_UOMID:
                //IssueSizeID:
                ReqDate: $("#txtOrderDate").val(),//new Date($('#txtOrderDate').val()),
                //Loop_Len:
                //Gauge:

            }
            iolist.push(det);
        }
    }


    if (IpItmList.length > 0) {
        for (var r = 0; r < IpItmList.length; r++) {
            var det = {
                // productionorddetid:
                //  productionordid:
                itemid: IpItmList[r].itmid,
                colorid: IpItmList[r].clrid,
                sizeid: IpItmList[r].sizeid,
                inp_op: IpItmList[r].inrout,
                order_output_qty: IpItmList[r].prgopqty,
                issued_qty: IpItmList[r].issqty,
                rate: IpItmList[r].rate,
                received_qty: 0.00,
                Return_Qty: 0.00,
                Damage_qty: 0.00,
                Cancel_Qty: 0.00,
                //Returnable_Qty:0.00,
                //Inp_CancelQty:
                //Markup_Rate:
                //Markup_Value:
                PlannedSizeID: IpItmList[r].sizeid,
                OrdSecQty: 0.00,
                ItemRemarks: "",
                Loss_Qty: 0.00,
                //IN_OUT_UOMID:
                //IssueSizeID:
                ReqDate: $("#txtOrderDate").val(),//new Date($('#txtOrderDate').val()),
                //Loop_Len:
                //Gauge:

            }
            iolist.push(det);
        }
    }

    if (OpSaveJobDetList.length > 0) {
        for (var s = 0; s < OpSaveJobDetList.length; s++) {
            var objdet = {
                ProgQty: OpSaveJobDetList[s].prgopqty,
                OrderQty: OpSaveJobDetList[s].ordqty,
                issued_qty: 0.00,
                received_qty: 0.00,
                Return_Qty: 0.00,
                Damage_qty: 0.00,
                Cancel_Qty: 0.00,
                Job_ord_no: OpSaveJobDetList[s].jobordno,
                ProdPrgNo: OpSaveJobDetList[s].prodpgmno,
                //Returnable_Qty:
                Closed: 'N',
                //Inp_CancelQty:
                OrdSecQty: 0.00,
                Loss_Qty: 0.00,
                buy_ord_ship: 0,
                itemid: OpSaveJobDetList[s].itmid,
                colorid: OpSaveJobDetList[s].clrid,
                sizeid: OpSaveJobDetList[s].sizeid,
                ipop: OpSaveJobDetList[s].inrout
            }
            jobdetlist.push(objdet);
        }
    }

    if (IpSaveJobDetList.length > 0) {
        for (var s = 0; s < IpSaveJobDetList.length; s++) {
            var objdet = {
                ProgQty: IpSaveJobDetList[s].prgopqty,
                OrderQty: IpSaveJobDetList[s].ordqty,
                issued_qty: IpSaveJobDetList[s].ordqty,
                received_qty: 0.00,
                Return_Qty: 0.00,
                Damage_qty: 0.00,
                Cancel_Qty: 0.00,
                Job_ord_no: IpSaveJobDetList[s].jobordno,
                ProdPrgNo: IpSaveJobDetList[s].prodpgmno,
                //Returnable_Qty:
                Closed: 'N',
                //Inp_CancelQty:
                OrdSecQty: 0.00,
                Loss_Qty: 0.00,
                buy_ord_ship: 0,
                itemid: IpSaveJobDetList[s].itmid,
                colorid: IpSaveJobDetList[s].clrid,
                sizeid: IpSaveJobDetList[s].sizeid,
                ipop: IpSaveJobDetList[s].inrout
            }
            jobdetlist.push(objdet);
        }
    }

    if (IpSaveStkDetList.length > 0) {
        for (var j = 0; j < IpSaveStkDetList.length; j++) {
            var objstk = {
                //ProductionOrdStockId:
                //    ProductionOrdJobid:
                Productionorder: $("#txtOrderNo").val(),
                jobordno: IpSaveStkDetList[j].jobordno,
                ItemStockId: IpSaveStkDetList[j].stockid,
                IssueQty: IpSaveStkDetList[j].issues,
                ReturnQty: 0.00,
                LossQty: 0.00,
                Returnable_Qty: 0.00,
                Markup_Rate: IpSaveStkDetList[j].Markup_Rate,
                LotNo: '',
                Itemid: IpSaveStkDetList[j].itmid,
                Colorid: IpSaveStkDetList[j].clrid,
                Sizeid: IpSaveStkDetList[j].sizeid
            }
            stkdetlist.push(objstk);
        }
    }
    debugger;
    table = "Production_Ord_Mas",
    column = "productionorder",
    compId = CompanyId,
    Docum = 'PRODUCTION ORDER'

    var oldOrderNo = $("#txtOrderNo").val();
    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var newOrderNo = result.Value;
            if (oldOrderNo != newOrderNo) {
                //alert('Order No has been changed...');
                var msg = 'Order Number has been changed...';
                var flg = 4;
                var mod = 1;
                var ur = "";
                AlartMessage(msg, flg, mod, ur);
                $('#txtOrderNo').val(result.Value);
            }
            var Obj = {
                // productionordid:
                productionorder: $("#txtOrderNo").val(),
                processordate: $("#txtOrderDate").val(),//new Date($('#txtOrderDate').val()),
                processorid: Processorid,
                processid: Processid,
                remarks: $("#txtremarks").val(),
                companyunitid: Companyunitid,
                companyid: CompanyId,
                ProcessorType: type,
                OrderType: ordtype,
                Closed: 'N',
                // OrderCumIssue:
                DelidateTime: $("#txtDeliDate").val(),//new Date($('#txtDeliDate').val()),
                ComboIds: "",
                DispLocType: desptchtype,
                DispLoc: $("#ddlLocation").val(),
                IssueLocType: isstype,
                IssueLoc: $("#ddlIssueLocation").val(),
                //Teamid:
                StoreUnitId: 0,
                CreatedBy: Guserid,
                //Phoneno:
                //contactperson:
                //amount:
                //taxamount:
                //saccode:
                //CGST:
                //SGST:
                //IGST:
                //TotCGST:
                //TotSGST:
                //TotIGST:
                moduletype: 'D',
                ProdDet: iolist,
                ProdJobDet: jobdetlist,
                ProdStkDet: stkdetlist,
                ProdAddLess: AccList

            }
            $("#btnAdd").attr("disabled", true);
            LoadingSymb();
            $.ajax({
                url: "/ProductionOrder/Add",
                data: JSON.stringify(Obj),
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {
                    debugger;
                    if (result.Value == true) {
                        AddUserEntryLog('Production', 'Sewing Issue', 'ADD', $("#txtOrderNo").val());
                        //alert('Data Saved Successfully');
                        //window.location.href = "/ProductionOrder/ProductionOrderIndex";
                        var msg = 'Data Saved Successfully...';
                        var flg = 1;
                        var mod = 0;
                        var ur = "/ProductionOrder/ProductionOrderIndex";
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

function Update() {
    debugger;
    //var type = $('input[name="optwrkord"]:checked').attr('value');
    //var ordtype = $('input[name="type"]:checked').attr('value');
    var distype = $('input[name="disploc"]:checked').attr('value');
    var desptchtype = $('input[name="DType"]:checked').attr('value');
    var isstype = $('input[name="IssType"]:checked').attr('value');
    var iolist = [];
    var jobdetlist = [];
    var stkdetlist = [];

    var opchk = [];
    var ipchk = [];
    for (var y = 0; y < OpItmList.length; y++) {
        if (OpItmList[y].ordqty > 0) {
            opchk.push(OpItmList[y]);
        }
    }


    for (var u = 0; u < IpItmList.length; u++) {
        if (IpItmList[u].issqty > 0) {
            ipchk.push(IpItmList[u]);
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
    if (ValiCutBudApp == 'Y' && OrderType == 'W') {
        $.each(OpItmList, function (e) {
            if (OpItmList[e].ordqty > 0) {
                if (OpItmList[e].rate > 0 && OpItmList[e].rate <= OpItmList[e].apprate) {

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
        $.each(OpItmList, function (e) {
            if (OpItmList[e].ordqty > 0) {
                if (OpItmList[e].rate > 0 && OpItmList[e].rate <= OpItmList[e].apprate) {

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
    if (OpItmList.length > 0) {
        for (var r = 0; r < OpItmList.length; r++) {
            var det = {
                productionorddetid: OpItmList[r].sno,
                productionordid: Masid,
                itemid: OpItmList[r].itmid,
                colorid: OpItmList[r].clrid,
                sizeid: OpItmList[r].sizeid,
                inp_op: OpItmList[r].inrout,
                order_output_qty: OpItmList[r].prgopqty,
                issued_qty: OpItmList[r].ordqty,
                rate: OpItmList[r].rate,
                received_qty: 0.00,
                Return_Qty: 0.00,
                Damage_qty: 0.00,
                Cancel_Qty: 0.00,
                //Returnable_Qty:0.00,
                //Inp_CancelQty:
                //Markup_Rate:
                //Markup_Value:
                PlannedSizeID: OpItmList[r].sizeid,
                OrdSecQty: 0.00,
                ItemRemarks: $("#txtremarks").val(),
                Loss_Qty: 0.00,
                //IN_OUT_UOMID:
                //IssueSizeID:
                ReqDate: $("#txtOrderDate").val(),//new Date($('#txtOrderDate').val()),
                //Loop_Len:
                //Gauge:

            }
            iolist.push(det);
        }
    }


    if (IpItmList.length > 0) {
        for (var r = 0; r < IpItmList.length; r++) {
            var det = {
                productionorddetid: IpItmList[r].sno,
                productionordid: Masid,
                itemid: IpItmList[r].itmid,
                colorid: IpItmList[r].clrid,
                sizeid: IpItmList[r].sizeid,
                inp_op: IpItmList[r].inrout,
                order_output_qty: IpItmList[r].prgopqty,
                issued_qty: IpItmList[r].issqty,
                rate: IpItmList[r].rate,
                received_qty: 0.00,
                Return_Qty: 0.00,
                Damage_qty: 0.00,
                Cancel_Qty: 0.00,
                //Returnable_Qty:0.00,
                //Inp_CancelQty:
                //Markup_Rate:
                //Markup_Value:
                PlannedSizeID: IpItmList[r].sizeid,
                OrdSecQty: 0.00,
                ItemRemarks: $("#txtremarks").val(),
                Loss_Qty: 0.00,
                //IN_OUT_UOMID:
                //IssueSizeID:
                ReqDate: $("#txtOrderDate").val(),//new Date($('#txtOrderDate').val()),
                //Loop_Len:
                //Gauge:

            }
            iolist.push(det);
        }
    }

    if (OpSaveJobDetList.length > 0) {
        for (var s = 0; s < OpSaveJobDetList.length; s++) {
            var objdet = {
                ProductionOrdid: Masid,
                ProgQty: OpSaveJobDetList[s].prgopqty,
                OrderQty: OpSaveJobDetList[s].ordqty,
                issued_qty: 0.00,
                received_qty: 0.00,
                Return_Qty: 0.00,
                Damage_qty: 0.00,
                Cancel_Qty: 0.00,
                Job_ord_no: OpSaveJobDetList[s].jobordno,
                ProdPrgNo: OpSaveJobDetList[s].prodpgmno,
                //Returnable_Qty:
                Closed: 'N',
                //Inp_CancelQty:
                OrdSecQty: 0.00,
                Loss_Qty: 0.00,
                buy_ord_ship: 0,
                itemid: OpSaveJobDetList[s].itmid,
                colorid: OpSaveJobDetList[s].clrid,
                sizeid: OpSaveJobDetList[s].sizeid,
                ipop: OpSaveJobDetList[s].inrout
            }
            jobdetlist.push(objdet);
        }
    }

    if (IpSaveJobDetList.length > 0) {
        for (var s = 0; s < IpSaveJobDetList.length; s++) {
            var objdet = {
                ProductionOrdid: Masid,
                ProgQty: IpSaveJobDetList[s].prgopqty,
                OrderQty: 0.00,
                issued_qty: IpSaveJobDetList[s].ordqty,
                received_qty: 0.00,
                Return_Qty: 0.00,
                Damage_qty: 0.00,
                Cancel_Qty: 0.00,
                Job_ord_no: IpSaveJobDetList[s].jobordno,
                ProdPrgNo: IpSaveJobDetList[s].prodpgmno,
                //Returnable_Qty:
                Closed: 'N',
                //Inp_CancelQty:
                OrdSecQty: 0.00,
                Loss_Qty: 0.00,
                buy_ord_ship: 0,
                itemid: IpSaveJobDetList[s].itmid,
                colorid: IpSaveJobDetList[s].clrid,
                sizeid: IpSaveJobDetList[s].sizeid,
                ipop: IpSaveJobDetList[s].inrout
            }
            jobdetlist.push(objdet);
        }
    }

    if (IpSaveStkDetList.length > 0) {
        for (var j = 0; j < IpSaveStkDetList.length; j++) {
            var objstk = {
                ProductionOrdStockId: IpSaveStkDetList[j].prodstkid,
                //    ProductionOrdJobid:
                Productionordid: Masid,
                Productionorder: $("#txtOrderNo").val(),
                jobordno: IpSaveStkDetList[j].jobordno,
                ItemStockId: IpSaveStkDetList[j].stockid,
                IssueQty: IpSaveStkDetList[j].issues,
                ReturnQty: 0.00,
                LossQty: 0.00,
                Returnable_Qty: 0.00,
                Markup_Rate: IpSaveStkDetList[j].Markup_Rate,
                LotNo: '',
                Itemid: IpSaveStkDetList[j].itmid,
                Colorid: IpSaveStkDetList[j].clrid,
                Sizeid: IpSaveStkDetList[j].sizeid
            }
            stkdetlist.push(objstk);
        }
    }
    var Obj = {
        productionordid: Masid,
        productionorder: $("#txtOrderNo").val(),
        processordate: $("#txtOrderDate").val(),//new Date($('#txtOrderDate').val()),
        processorid: Processorid,
        processid: Processid,
        remarks: $("#txtremarks").val(),
        companyunitid: Companyunitid,
        companyid: CompanyId,
        ProcessorType: PrType,
        OrderType: OrType,
        Closed: 'N',
        // OrderCumIssue:
        DelidateTime: $("#txtDeliDate").val(),//new Date($('#txtDeliDate').val()),
        ComboIds: "",
        DispLocType: desptchtype,
        DispLoc: $("#ddlLocation").val(),
        IssueLocType: isstype,
        IssueLoc: $("#ddlIssueLocation").val(),
        //Teamid:
        StoreUnitId: 0,
        CreatedBy: Guserid,
        //Phoneno:
        //contactperson:
        //amount:
        //taxamount:
        //saccode:
        //CGST:
        //SGST:
        //IGST:
        //TotCGST:
        //TotSGST:
        //TotIGST:
        moduletype: 'D',
        ProdDet: iolist,
        ProdJobDet: jobdetlist,
        ProdStkDet: stkdetlist,
        ProdAddLess: AccList

    }
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/ProductionOrder/Update",
        data: JSON.stringify(Obj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Value == true) {
                AddUserEntryLog('Production', 'Sewing Issue', 'UPDATE', $("#txtOrderNo").val());
                //alert('Data Updated Successfully');
                //window.location.href = "/ProductionOrder/ProductionOrderIndex";
                var msg = 'Data Updated Successfully...';
                var flg = 1;
                var mod = 0;
                var ur = "/ProductionOrder/ProductionOrderIndex";
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

function Delete(Masid) {
    debugger;

    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        LoadingSymb();
        $.ajax({
            url: "/ProductionOrder/Delete/" + Masid,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                //alert("Data Deleted Sucessfully");

                //window.location.href = "/ProductionOrder/ProductionOrderIndex";
                var msg = 'Data Deleted Sucessfully...';
                var flg = 2;
                var mod = 0;
                var ur = "/ProductionOrder/ProductionOrderIndex";
                AlartMessage(msg, flg, mod, ur);
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}


function LoadMaingrid() {
    debugger;

    var type = $('input[name="maintype"]:checked').attr('value');
    var proctype = $('input[name="proctype"]:checked').attr('value');

    // var type = $('input[name="optwrkord"]:checked').attr('value');
    //if (proctype == 'P') {
    //    var sup = $('#ddlMSupplier').val();
    //    var supp = $('select#ddlMSupplier option:selected').text();
    //    var proid = $('select#ddlMSupplier option:selected').val();
    //    if (sup == 0) {
    //        alert('Select Supplier');

    //        //$('#myModal1').hide();
    //        //$('#myModal1').modal('hide');
    //        return true;
    //    }
    //}
    //else {
    //    var sup = $('#ddlwrkdiv').val();
    //    var supp = $('select#ddlwrkdiv option:selected').text();
    //     var proid = $('select#ddlwrkdiv option:selected').val();
    //    if (sup == 0) {
    //        alert('Select WorkDivision');
    //        //$('#myModal1').hide();
    //        //$('#myModal1').modal('hide');
    //        return true;
    //    }
    //}

    if (proctype == 'P') {

        $('#ddlpro').show();
        $("#ddlwrkd").hide();
        Processorid = $('select#ddlprocess option:selected').val();
    }
    else if (proctype == 'W') {
        $('#ddlpro').hide();
        $("#ddlwrkd").show();
        Processorid = $('select#ddlwrkdivision option:selected').val();
    }
    //var GrnNo = "";
    //var ONo = $('select#ddlgrn option:selected').val();

    //if (ONo == 0) {
    //    GrnNo == "";
    //}
    //else {

    //    GrnNo = $('select#ddlgrn option:selected').val();
    //}

    //var JobNo = "";
    //var RNo = $('select#ddljobno option:selected').val();

    //if (RNo == 0) {
    //    JobNo == "";
    //}
    //else {

    //    JobNo = $('select#ddljobno option:selected').val();
    //}

    var prodid = 0;
    var clsd = "N";
    var ty = $('#ddlMType').val();
    //var CompId = $('#ddlMCompany').val();
    //if (CompId == null) {
    //    CompId = 0;
    //}

    var CompId = $('#ddlMCompany').val();

    if (CompId == null) {
        CompId = DCompid;
    } else {
        CompId = $('#ddlMCompany').val();
    }

    var prod = $('#ddlMOrderNo').val();
    if (prod == null || prod == 0) {
        prod = "";
    }
    var Unit = $('#ddlMUnit').val();
    if (Unit == null) {
        Unit = 0;
    }
    var prid = Processorid;
    var process = $('#ddlMProcess').val();
    if (process == null) {
        process = 0;
    }
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    if (ChkComp || DtChk) {
        prod = "";
        Unit = 0;
        process = 0;
    }
    var orderno = $('#ddlOrdNo').val();
    if (orderno == 0) {
        orderno = "";
    }
    buyerid = $('select#ddlBuy option:selected').val();
    if (buyerid == null) {
        buyerid = 0;
    }
    var menufilter = CompId + ',' + clsd + ',' + type + ',' + proctype + ',' + prodid + ',' + prod + ',' + ty + ',' + prid + ',' + Unit + ',' + process + ',' + FDate + ',' + TDate + ',' + buyerid + ',' + orderno;
    localStorage.setItem('SewingIssueMainFilter', menufilter);


    $.ajax({
        url: "/ProductionOrder/LoadMaingrid",
        data: JSON.stringify({ cmpid: CompId, closed: clsd, buyrsamp: type, processortype: proctype, prodordid: prodid, prodord: prod, type: ty, processorid: prid, unitid: Unit, processid: process, fromDate: FDate, todate: TDate, buyerid: buyerid, orderno: orderno }),
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
                             { title: "Productionordid", "visible": false },
                             { title: "Order No" },
                             { title: "Order Date" },
                             { title: "Company" },
                             { title: "Unit" },
                             { title: "Process" },
                             { title: "Processor" },
                             { title: "Type", "visible": false },
                              { title: "Action" },


                    ]

                });

            }
            //ddlmain();
            //$('#ddlMOrderNo').empty();
            //$('#ddlMProcess').empty();
            //$('#ddlMUnit').empty();
            //$('#ddlMType').empty();

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

    var fill = localStorage.getItem('SewingIssueMainFilter');
    var fillobj = [];
    fillobj = fill.split(",");

    $('#txtFromDate').val(fillobj[10]);
    $('#txtToDate').val(fillobj[11]);

    if (fillobj[2] == 'B') {
        $('#MB').prop('checked', true);
    } else {
        $('#MS').prop('checked', true);
    }

    if (fillobj[3] == 'P') {
        $('#MP').prop('checked', true);
    } else if (fillobj[3] == 'W') {
        $('#MW').prop('checked', true);
    }

    if (fillobj[5] == "undefined") {
        fillobj[5] = '';
    }
    if (fillobj[13] == "undefined") {
        fillobj[13] = '';
    }
    if (fillobj[4] == "undefined") {
        fillobj[4] = 0;
    }
    if (fillobj[7] == "undefined") {
        fillobj[7] = 0;
    }
    if (fillobj[8] == "undefined") {
        fillobj[8] = 0;
    }
    if (fillobj[9] == "undefined") {
        fillobj[9] = 0;
    }
    if (fillobj[12] == "undefined") {
        fillobj[12] = 0;
    }

    $.ajax({
        url: "/ProductionOrder/LoadMaingrid",
        data: JSON.stringify({ cmpid: fillobj[0], closed: fillobj[1], buyrsamp: fillobj[2], processortype: fillobj[3], prodordid: fillobj[4], prodord: fillobj[5], type: fillobj[6], processorid: fillobj[7], unitid: fillobj[8], processid: fillobj[9], fromDate: fillobj[10], todate: fillobj[11], buyerid: fillobj[12], orderno: fillobj[13] }),
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
                             { title: "Productionordid", "visible": false },
                             { title: "Order No" },
                             { title: "Order Date" },
                             { title: "Company" },
                             { title: "Unit" },
                             { title: "Process" },
                             { title: "Processor" },
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

    var type = $('input[name="maintype"]:checked').attr('value');
    var proctype = $('input[name="proctype"]:checked').attr('value');

    // var type = $('input[name="optwrkord"]:checked').attr('value');
    //if (proctype == 'P') {
    //    var sup = $('#ddlMSupplier').val();
    //    var supp = $('select#ddlMSupplier option:selected').text();
    //    var proid = $('select#ddlMSupplier option:selected').val();
    //    if (sup == 0) {
    //        alert('Select Supplier');

    //        //$('#myModal1').hide();
    //        //$('#myModal1').modal('hide');
    //        return true;
    //    }
    //}
    //else {
    //    var sup = $('#ddlwrkdiv').val();
    //    var supp = $('select#ddlwrkdiv option:selected').text();
    //     var proid = $('select#ddlwrkdiv option:selected').val();
    //    if (sup == 0) {
    //        alert('Select WorkDivision');
    //        //$('#myModal1').hide();
    //        //$('#myModal1').modal('hide');
    //        return true;
    //    }
    //}

    if (proctype == 'P') {

        $('#ddlpro').show();
        $("#ddlwrkd").hide();
        Processorid = $('select#ddlprocess option:selected').val();
    }
    else if (proctype == 'W') {
        $('#ddlpro').hide();
        $("#ddlwrkd").show();
        Processorid = $('select#ddlwrkdivision option:selected').val();
    }
    //var GrnNo = "";
    //var ONo = $('select#ddlgrn option:selected').val();

    //if (ONo == 0) {
    //    GrnNo == "";
    //}
    //else {

    //    GrnNo = $('select#ddlgrn option:selected').val();
    //}

    //var JobNo = "";
    //var RNo = $('select#ddljobno option:selected').val();

    //if (RNo == 0) {
    //    JobNo == "";
    //}
    //else {

    //    JobNo = $('select#ddljobno option:selected').val();
    //}

    var prodid = 0;
    var clsd = "N";
    var ty = $('#ddlMType').val();
    //var CompId = $('#ddlMCompany').val();
    //if (CompId == null) {
    //    CompId = 0;
    //}

    var CompId = $('#ddlMCompany').val();

    if (CompId == null) {
        CompId = DCompid;
    } else {
        CompId = $('#ddlMCompany').val();
    }

    var prod = $('#ddlMOrderNo').val();
    if (prod == null || prod == 0) {
        prod = "";
    }
    var Unit = $('#ddlMUnit').val();
    if (Unit == null) {
        Unit = 0;
    }
    var prid = Processorid;
    var process = $('#ddlMProcess').val();
    if (process == null) {
        process = 0;
    }
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    if (ChkComp || DtChk) {
        prod = "";
        Unit = 0;
        process = 0;
    }

    $.ajax({
        url: "/ProductionOrder/LoadMaingridord",
        data: JSON.stringify({ cmpid: CompId, closed: clsd, buyrsamp: type, processortype: proctype, prodordid: prodid, prodord: prod, type: ty, processorid: prid, unitid: Unit, processid: process, fromDate: FDate, todate: TDate }),
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
                    buyerid: dataSet[i][9],
                    buyer: dataSet[i][8]
                }
                refobj.push(obj);
            });

            var revdet = {};
            var rev = [];

            $.each(refobj, function (i, el) {

                if (!revdet[el.buyerid]) {
                    revdet[el.buyerid] = true;
                    rev.push(el);
                }
            });
            if (ChkBuyer || DtChk) {
                $('#ddlBuy').empty();
                $('#ddlBuy').append($('<option/>').val('0').text('--Select Buyer--'));
                $.each(rev, function () {
                    $('#ddlBuy').append($('<option></option>').val(this.buyerid).text(this.buyer));
                });
            }

            var refobj = [];
            $.each(dataSet, function (i) {
                var obj = {
                    orderno: dataSet[i][10]
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
            if (ChkOrdn || DtChk) {
                $('#ddlOrdNo').empty();
                $('#ddlOrdNo').append($('<option/>').val('0').text('--Select Orderno--'));
                $.each(rev, function () {
                    $('#ddlOrdNo').append($('<option></option>').val(this.orderno).text(this.orderno));
                });
            }
            //if (!DtChk) {
            //    $('#tblmaindetails').DataTable({
            //        data: dataSet,
            //        scrollY: 300,
            //        scrollCollapse: true,
            //        paging: false,
            //        fixedColumns: false,
            //        select: false,
            //        scrollX: "100%",
            //        scrollXInner: "100%",
            //        scroller: false,
            //        "bSort": false,
            //        columns: [
            //                 { title: "Productionordid", "visible": false },
            //                 { title: "Order No" },
            //                 { title: "Order Date" },
            //                 { title: "Company" },
            //                 { title: "Unit" },
            //                 { title: "Process" },
            //                 { title: "Processor" },
            //                 { title: "Type", "visible": false },
            //                  { title: "Action" },


            //        ]

            //    });

            //}
            //ddlmain();
            //$('#ddlMOrderNo').empty();
            //$('#ddlMProcess').empty();
            //$('#ddlMUnit').empty();
            //$('#ddlMType').empty();

            //$(document).ready(function () {
            //    var table = $('#tblmaindetails').DataTable();

            //    $('#tblmaindetails tbody').on('click', 'tr', function () {
            //        if ($(this).hasClass('selected')) {
            //            $(this).removeClass('selected');

            //        }
            //        else {
            //            table.$('tr.selected').removeClass('selected');
            //            $(this).addClass('selected');
            //        }
            //    });


            //});
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function ddlmain() {
    var type = $('input[name="maintype"]:checked').attr('value');
    var proctype = $('input[name="proctype"]:checked').attr('value');


    if (proctype == 'P') {

        $('#Msupp').show();
        $("#Mwrkdiv").hide();
    }
    else if (proctype == 'W') {
        $('#Msupp').hide();
        $("#Mwrkdiv").show();
    }
    //var GrnNo = "";

    var prodid = 0;
    var clsd = "N";
    var prid = 0;
    //var CompId = $('#ddlMCompany').val();
    //if (CompId == null) {
    //    CompId = 0;
    //}

    var CompId = $('#ddlMCompany').val();

    if (CompId == null) {
        CompId = DCompid;
    } else {
        CompId = $('#ddlMCompany').val();
    }


    var prod = $('#ddlMOrderNo').val();
    if (prod == null || prod == 0) {
        prod = "";
    }
    var Unit = $('#ddlMUnit').val();
    if (Unit == null) {
        Unit = 0;
    }
    var prid = 0;
    var process = $('#ddlMProcess').val();
    if (process == null) {
        process = 0;
    }
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    var otype = $('#ddlMType').val();
    if (otype == null) {
        otype = 0;
    }
    if (ChkComp || DtChk) {
        prod = "";
        Unit = 0;
        process = 0;
    }
    var buyerid = 0;
    var orderno = "";
    $.ajax({
        url: "/ProductionOrder/LoadMaingriddet",
        data: JSON.stringify({ cmpid: CompId, closed: clsd, buyrsamp: type, processortype: proctype, prodordid: prodid, prodord: prod, type: otype, processorid: prid, unitid: Unit, processid: process, fromDate: FDate, todate: TDate, buyerid: buyerid, orderno: orderno }),
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

                    if (!compdet[el.cmpid]) {
                        compdet[el.cmpid] = true;
                        comp.push(el);
                    }

                    if (!recptdet[el.prodnord]) {
                        recptdet[el.prodnord] = true;
                        recpt.push(el);
                    }

                    if (!procdet[el.processid]) {
                        procdet[el.processid] = true;
                        proc.push(el);
                    }

                    if (!unitdet[el.cmpunitid]) {
                        unitdet[el.cmpunitid] = true;
                        unit.push(el);
                    }

                });
                //$(ddlMCompany).append($('<option/>').val('0').text('--Select Company--'));
                //$.each(comp, function () {
                //    $(ddlMCompany).append($('<option></option>').val(this.cmpid).text(this.company));

                //});
                if (ChkOrdno || ChkComp || DtChk) {
                    $('#ddlMOrderNo').empty();
                    $(ddlMOrderNo).append($('<option/>').val('0').text('--Select ProdOrd--'));
                    $.each(recpt, function () {
                        $(ddlMOrderNo).append($('<option></option>').text(this.prodnord));
                    });
                }
                if (ChkProcess || ChkComp || DtChk) {
                    $('#ddlMProcess').empty();
                    $(ddlMProcess).append($('<option/>').val('0').text('--Select Process--'));
                    $.each(proc, function () {
                        $(ddlMProcess).append($('<option></option>').val(this.processid).text(this.process));
                    });
                }
                if (ChkUnit || ChkComp || DtChk) {
                    $('#ddlMUnit').empty();
                    $(ddlMUnit).append($('<option/>').val('0').text('--Select Unit--'));
                    $.each(unit, function () {
                        $(ddlMUnit).append($('<option></option>').val(this.cmpunitid).text(this.cmpnyunit));
                    });
                }


                //$(ddlMType).append($('<option/>').val('0').text('--Select Type--'));
                //$.each(data, function () {
                //    $(ddlMType).append($('<option></option>').text(this.type));
                //});
            }



        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function CMainlist() {
    $('#tblmaindetails').DataTable().destroy();
    ChkProcess = true;
    ChkOrdno = true;
    DtChk = false;
    ChkUnit = true;
    ChkComp = false;
    ChkOrdn = true;
    ChkBuyer = true;
    LoadMaingrid();
    LoadMaingridord();
    ddlmain();
}
function BMainlist() {
    $('#tblmaindetails').DataTable().destroy();
    ChkProcess = true;
    ChkOrdno = true;
    DtChk = false;
    ChkUnit = false;
    ChkComp = false;
    ChkOrdn = true;
    ChkBuyer = false;
    LoadMaingrid();
    LoadMaingridord();
    ddlmain();
}
function PMainlist() {
    $('#tblmaindetails').DataTable().destroy();
    ChkProcess = false;
    ChkOrdno = false;
    DtChk = false;
    ChkUnit = false;
    ChkComp = false;
    LoadMaingrid();
    ddlmain();
}
function OrdMainlist() {
    $('#tblmaindetails').DataTable().destroy();
    ChkProcess = false;
    ChkOrdno = true;
    DtChk = false;
    ChkUnit = false;
    ChkComp = false;
    ChkOrdn = false;
    ChkBuyer = false;
    LoadMaingrid();
    ddlmain();
}
function OMainlist() {
    $('#tblmaindetails').DataTable().destroy();
    ChkProcess = true;
    ChkOrdno = false;
    DtChk = false;
    ChkUnit = true;
    ChkComp = false;
    LoadMaingrid();
    ddlmain();
}

function CMainlistdd() {
    $('#tblmaindetails').DataTable().destroy();

    ChkProcess = true;
    ChkOrdno = true;
    DtChk = false;
    ChkUnit = true;
    ChkComp = false;

    ddlmain();
    LoadMaingrid();

}

function TotMainlist() {
    $('#tblmaindetails').DataTable().destroy();

    $('#ddlMOrderNo').empty();
    $('#ddlMProcess').empty();
    $('#ddlMUnit').empty();
    // $('#ddlMCompany').empty();
    ddlmain();
    LoadMaingrid();
}
function LoadEditOutputItmDet() {
    debugger;
    Masid;
    $.ajax({
        url: "/ProductionOrder/LoadEditOutputItmgrid",
        data: JSON.stringify({ prodid: Masid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            OpItmList = result.Value;
            OutputitmTab(OpItmList);

            if (OpItmList.length > 0) {
                opItmid = OpItmList[0].itmid;
                OpClrid = OpItmList[0].clrid;
                OpSizeid = OpItmList[0].sizeid;

                //Despatch
                if (OpItmList[0].disptype == 'P') {
                    $("#OptSelf").attr('checked', 'checked');
                    $("#ddlLocation").val(OpItmList[0].disploc);
                }
                else if (OpItmList[0].disptype == 'O') {
                    $("#OptUnit").attr('checked', 'checked');
                    $("#ddlLocation").val(OpItmList[0].disploc);
                }
                else if (OpItmList[0].disptype == 'S') {
                    $("#OptStore").attr('checked', 'checked');
                    $("#ddlLocation").val(OpItmList[0].disploc);
                }
                else if (OpItmList[0].disptype == 'C') {
                    $("#OptSup").attr('checked', 'checked');
                    $("#ddlLocation").val(OpItmList[0].disploc);
                }
                //Issue
                if (OpItmList[0].isstype == 'O') {
                    $("#OptIssUnit").attr('checked', 'checked');
                    $("#ddlIssueLocation").val(OpItmList[0].issloc);
                }
                else if (OpItmList[0].isstype == 'C') {
                    $("#OptCmp").attr('checked', 'checked');
                    $("#ddlIssueLocation").val(OpItmList[0].issloc);
                }
                LoadLocalAdd();
                LoadIssLocalAdd();
                var totalamnt = 0;
                for (var e = 0; e < OpItmList.length; e++) {
                    var amount = OpItmList[e].ordqty;
                    totalamnt = totalamnt + parseFloat(amount);

                }
                $('#txtGrossAmt').val(totalamnt);
            }
        }

    });
}

function LoadEditInputItmDet() {
    debugger;
    Masid;
    $.ajax({
        url: "/ProductionOrder/LoadEditInputItmgrid",
        data: JSON.stringify({ prodid: Masid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            IpItmList = result.Value;
            InputitmTab(IpItmList);

            Itmid = IpItmList[0].itmid;
            Colorid = IpItmList[0].clrid;
            Sizeid = IpItmList[0].sizeid;
        }

    });
}


function LoadEditOutputJobDet() {
    debugger;
    Masid;
    $.ajax({
        url: "/ProductionOrder/LoadEditOutputjobdetgrid",
        data: JSON.stringify({ prodid: Masid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            OpSaveJobDetList = result.Value;
            OutputSaveJobdetTab(OpSaveJobDetList);


            var colorempty = [];
            colorempty = OpSaveJobDetList;

            colorempty = $.grep(colorempty, function (v) {
                return (v.itmid === opItmid && v.clrid === OpClrid && v.sizeid === OpSizeid);
            });
            OpJobDetList = [];
            OpJobDetList = colorempty;
            OutputJobdetTab(colorempty);
        }

    });
}

function LoadEditInputJobDet() {
    debugger;
    Masid;
    $.ajax({
        url: "/ProductionOrder/LoadEditInputjobdetgrid",
        data: JSON.stringify({ prodid: Masid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            IpSaveJobDetList = result.Value;
            InputSaveJobdetTab(IpSaveJobDetList);

            //opItmid = OpItmList[0].itmid;
            //OpClrid = OpItmList[0].clrid;
            //OpSizeid = OpItmList[0].sizeid;
            var colorempty = [];
            colorempty = IpSaveJobDetList;

            colorempty = $.grep(colorempty, function (v) {
                return (v.itmid === Itmid && v.clrid === Colorid && v.sizeid === Sizeid);
            });
            IpJobDetList = [];
            IpJobDetList = colorempty;
            InputJobdetTab(colorempty);
        }

    });
}

function LoadEditInputStkdet() {
    debugger;
    Masid;
    $.ajax({
        url: "/ProductionOrder/LoadEditInputStkDet",
        data: JSON.stringify({ cmpid: CompanyId, prodid: Masid, prodordno: ProductionOrderno }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            IpSaveStkDetList = result.Value;
            InputSaveStkdetTab(IpSaveStkDetList);

            //opItmid = OpItmList[0].itmid;
            //OpClrid = OpItmList[0].clrid;
            //OpSizeid = OpItmList[0].sizeid;
        }

    });
}

function LoadEditAddless() {
    debugger;
    Masid;
    $.ajax({
        url: "/ProductionOrder/LoadEditAddlessgrid",
        data: JSON.stringify({ prodid: Masid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            AccList = result.Value;
            loadAccTable(AccList);
            var totalAccamnt = 0;
            for (var e = 0; e < AccList.length; e++) {
                var amount = AccList[e].Amount;
                totalAccamnt = totalAccamnt + parseFloat(amount);

            }


            //    loadItemTable(ItemList);
            // $('#txtNetAmt').val(totalAccamnt.toFixed(3));

            var GAmt = $('#txtGrossAmt').val();
            // var NAmt = $('#txtNetAmt').val();
            var FNAmt = parseFloat(GAmt) + parseFloat(totalAccamnt);

            $('#txtNetAmt').val(FNAmt);

        }

    });
}

function getbyID(id) {
    debugger;
    Masid = id;
    var type = $('input[name="maintype"]:checked').attr('value');
    if (type == 'B') {
        OrderType = 'W'
    } else {

        OrderType = type;
    }
    var proctype = $('input[name="proctype"]:checked').attr('value');


    if (proctype == 'P') {

        $('#Msupp').show();
        $("#Mwrkdiv").hide();
    }
    else if (proctype == 'W') {
        $('#Msupp').hide();
        $("#Mwrkdiv").show();
    }
    //var GrnNo = "";

    var prodid = id;
    var clsd = "N";
    var prid = 0;
    var CompId = $('#ddlMCompany').val();
    if (CompId == null || CompId == "0") {
        CompId = 0;
    }
    var prod = $('#ddlMOrderNo').val();
    if (prod == null || prod == 0) {
        prod = "";
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
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    var ty = $('#ddlMType').val();
    var buyerid = 0;
    var orderno = "";
    $.ajax({
        url: "/ProductionOrder/LoadMaingriddet",
        data: JSON.stringify({ cmpid: CompId, closed: clsd, buyrsamp: type, processortype: proctype, prodordid: prodid, prodord: prod, type: ty, processorid: prid, unitid: Unit, processid: process, fromDate: FDate, todate: TDate, buyerid: buyerid, orderno: orderno }),
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

            $('#txtDeliDate').val(moment(obj[0].delidate).format("DD/MM/YYYY"));
            $('#txtOrderDate').val(moment(obj[0].proddate).format("DD/MM/YYYY"));
            $('#txtUnit').val(obj[0].cmpnyunit);
            $('#txtProcess').val(obj[0].process);
            $('#txtProcessor').val(obj[0].processor);
            $('#txtOrderNo').val(obj[0].prodnord);
            $('#txtremarks').val(obj[0].remarks);
            CompanyId = obj[0].cmpid;
            ProductionOrderno = obj[0].prodnord;
            Companyunitid = obj[0].cmpunitid;

            PrType = obj[0].PType;
            OrType = obj[0].OrdType;

            var DType = obj[0].DispatchLocType;

            if (DType == "P") {
                $('#OptSelf').prop('checked', true);
                editmasunitstore = obj[0]["DispatchLocId"];
            } else if (DType == "O") {
                $('#OptUnit').prop('checked', true);
                editmasunitstore = obj[0]["DispatchLocId"];
            } else if (DType == "S") {
            } else if (DType == "C") {
                $('#OptSup').prop('checked', true);
                editmasunitstore = obj[0]["DispatchLocId"];
            }
            if (DType == "S") {
                $('#OptStore').prop('checked', true);
                editmasunitstore = obj[0]["DispatchLocId"];
                LoadEmployeeStoreunit();
            }
            LoadLocationEdit();
            CheckAlloted();

            Processid = obj[0].processid;
            LoadProcessDetails(Processid);
            Processorid = obj[0].processorid;
            //  LoadLocation();
            LoadEditOutputItmDet();
            LoadEditInputItmDet();
            LoadEditOutputJobDet();
            LoadEditInputJobDet();
            LoadEditInputStkdet();
            LoadEditAddless();

        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}


function CheckAlloted() {

    var Recpno = $('#txtOrderNo').val();

    $.ajax({
        url: "/ProcessOrder/LoadProcessCheckItemEditDetails",
        data: JSON.stringify({ RecNo: Recpno }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            AllotedItemList = result;
            if (AllotedItemList.length > 0) {


                for (var x = 0; x < AllotedItemList.length; x++) {

                    //alert("Process Order is alloted for " + AllotedItemList[x].CTransNo + ",Please Check it....")
                    var msg = "Process Order is alloted for " + AllotedItemList[x].CTransNo + ",Please Check it...";
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


function getDeleteID(id) {
    debugger;
    Masid = id;
    var type = $('input[name="maintype"]:checked').attr('value');
    var proctype = $('input[name="proctype"]:checked').attr('value');


    if (proctype == 'P') {

        $('#Msupp').show();
        $("#Mwrkdiv").hide();
    }
    else if (proctype == 'W') {
        $('#Msupp').hide();
        $("#Mwrkdiv").show();
    }
    //var GrnNo = "";

    var prodid = id;
    var clsd = "N";
    var prid = 0;
    var CompId = $('#ddlMCompany').val();
    if (CompId == null) {
        CompId = 0;
    }
    var prod = $('#ddlMOrderNo').val();
    if (prod == null || prod == 0) {
        prod = "";
    }
    var Unit = $('#ddlMUnit').val();
    if (Unit == null) {
        Unit = 0;
    }
    var prid = 0;
    var process = $('#ddlMProcess').val();
    if (process == null) {
        process = 0;
    }
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var ty = $('#ddlMType').val();
    var buyerid = 0;
    var orderno = "";
    $.ajax({
        url: "/ProductionOrder/LoadMaingriddet",
        data: JSON.stringify({ cmpid: CompId, closed: clsd, buyrsamp: type, processortype: proctype, prodordid: prodid, prodord: prod, type: ty, processorid: prid, unitid: Unit, processid: process, fromDate: FDate, todate: TDate, buyerid: buyerid, orderno: orderno }),
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

            $('#txtDeliDate').val(moment(obj[0].delidate).format("DD/MM/YYYY"));
            $('#txtOrderDate').val(moment(obj[0].proddate).format("DD/MM/YYYY"));
            $('#txtUnit').val(obj[0].cmpnyunit);
            $('#txtProcess').val(obj[0].process);
            $('#txtProcessor').val(obj[0].processor);
            $('#txtOrderNo').val(obj[0].prodnord);
            $('#txtremarks').val(obj[0].remarks);
            CompanyId = obj[0].cmpid;
            ProductionOrderno = obj[0].prodnord;
            Companyunitid = obj[0].cmpunitid;
            CheckAlloted();

            Processid = obj[0].processid;
            Processorid = obj[0].processorid;
            LoadLocation();
            LoadEditOutputItmDet();
            LoadEditInputItmDet();
            LoadEditOutputJobDet();
            LoadEditInputJobDet();
            LoadEditInputStkdet();

        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function MasDelete() {
    var type = $('input[name="optwrkord"]:checked').attr('value');
    var ordtype = $('input[name="type"]:checked').attr('value');
    var distype = $('input[name="disploc"]:checked').attr('value');
    var desptchtype = $('input[name="DType"]:checked').attr('value');
    var isstype = $('input[name="IssType"]:checked').attr('value');
    var iolist = [];
    var jobdetlist = [];
    var stkdetlist = [];
    if (OpItmList.length > 0) {
        for (var r = 0; r < OpItmList.length; r++) {
            var det = {
                productionorddetid: OpItmList[r].sno,
                productionordid: Masid,
                itemid: OpItmList[r].itmid,
                colorid: OpItmList[r].clrid,
                sizeid: OpItmList[r].sizeid,
                inp_op: OpItmList[r].inrout,
                order_output_qty: OpItmList[r].prgopqty,
                issued_qty: 0.00,
                rate: OpItmList[r].rate,
                received_qty: OpItmList[r].ordqty,
                Return_Qty: 0.00,
                Damage_qty: 0.00,
                Cancel_Qty: 0.00,
                //Returnable_Qty:0.00,
                //Inp_CancelQty:
                //Markup_Rate:
                //Markup_Value:
                PlannedSizeID: OpItmList[r].sizeid,
                OrdSecQty: 0.00,
                ItemRemarks: $("#txtremarks").val(),
                Loss_Qty: 0.00,
                //IN_OUT_UOMID:
                //IssueSizeID:
                ReqDate: $("#txtOrderDate").val(),//new Date($('#txtOrderDate').val()),
                //Loop_Len:
                //Gauge:

            }
            iolist.push(det);
        }
    }


    if (IpItmList.length > 0) {
        for (var r = 0; r < IpItmList.length; r++) {
            var det = {
                productionorddetid: IpItmList[r].sno,
                productionordid: Masid,
                itemid: IpItmList[r].itmid,
                colorid: IpItmList[r].clrid,
                sizeid: IpItmList[r].sizeid,
                inp_op: IpItmList[r].inrout,
                order_output_qty: IpItmList[r].prgopqty,
                issued_qty: IpItmList[r].issqty,
                rate: IpItmList[r].rate,
                received_qty: 0.00,
                Return_Qty: 0.00,
                Damage_qty: 0.00,
                Cancel_Qty: 0.00,
                //Returnable_Qty:0.00,
                //Inp_CancelQty:
                //Markup_Rate:
                //Markup_Value:
                PlannedSizeID: IpItmList[r].sizeid,
                OrdSecQty: 0.00,
                ItemRemarks: $("#txtremarks").val(),
                Loss_Qty: 0.00,
                //IN_OUT_UOMID:
                //IssueSizeID:
                ReqDate: $("#txtOrderDate").val(),//new Date($('#txtOrderDate').val()),
                //Loop_Len:
                //Gauge:

            }
            iolist.push(det);
        }
    }

    if (OpSaveJobDetList.length > 0) {
        for (var s = 0; s < OpSaveJobDetList.length; s++) {
            var objdet = {
                ProductionOrdid: Masid,
                ProgQty: OpSaveJobDetList[s].prgopqty,
                OrderQty: 0.00,
                issued_qty: 0.00,
                received_qty: OpSaveJobDetList[s].ordqty,
                Return_Qty: 0.00,
                Damage_qty: 0.00,
                Cancel_Qty: 0.00,
                Job_ord_no: OpSaveJobDetList[s].jobordno,
                ProdPrgNo: OpSaveJobDetList[s].prodpgmno,
                //Returnable_Qty:
                Closed: 'N',
                //Inp_CancelQty:
                OrdSecQty: 0.00,
                Loss_Qty: 0.00,
                buy_ord_ship: 0,
                itemid: OpSaveJobDetList[s].itmid,
                colorid: OpSaveJobDetList[s].clrid,
                sizeid: OpSaveJobDetList[s].sizeid,
                ipop: OpSaveJobDetList[s].inrout
            }
            jobdetlist.push(objdet);
        }
    }

    if (IpSaveJobDetList.length > 0) {
        for (var s = 0; s < IpSaveJobDetList.length; s++) {
            var objdet = {
                ProductionOrdid: Masid,
                ProgQty: IpSaveJobDetList[s].prgopqty,
                OrderQty: 0.00,
                issued_qty: IpSaveJobDetList[s].ordqty,
                received_qty: 0.00,
                Return_Qty: 0.00,
                Damage_qty: 0.00,
                Cancel_Qty: 0.00,
                Job_ord_no: IpSaveJobDetList[s].jobordno,
                ProdPrgNo: IpSaveJobDetList[s].prodpgmno,
                //Returnable_Qty:
                Closed: 'N',
                //Inp_CancelQty:
                OrdSecQty: 0.00,
                Loss_Qty: 0.00,
                buy_ord_ship: 0,
                itemid: IpSaveJobDetList[s].itmid,
                colorid: IpSaveJobDetList[s].clrid,
                sizeid: IpSaveJobDetList[s].sizeid,
                ipop: IpSaveJobDetList[s].inrout
            }
            jobdetlist.push(objdet);
        }
    }

    if (IpSaveStkDetList.length > 0) {
        for (var j = 0; j < IpSaveStkDetList.length; j++) {
            var objstk = {
                ProductionOrdStockId: IpSaveStkDetList[j].prodstkid,
                //    ProductionOrdJobid:
                Productionordid: Masid,
                Productionorder: $("#txtOrderNo").val(),
                jobordno: IpSaveStkDetList[j].jobordno,
                ItemStockId: IpSaveStkDetList[j].stockid,
                IssueQty: IpSaveStkDetList[j].issues,
                ReturnQty: 0.00,
                LossQty: 0.00,
                Returnable_Qty: 0.00,
                Markup_Rate: 0.00,
                LotNo: '',
                Itemid: IpSaveStkDetList[j].itmid,
                Colorid: IpSaveStkDetList[j].clrid,
                Sizeid: IpSaveStkDetList[j].sizeid
            }
            stkdetlist.push(objstk);
        }
    }
    var Obj = {
        productionordid: Masid,
        productionorder: $("#txtOrderNo").val(),
        processordate: $("#txtOrderDate").val(),//new Date($('#txtOrderDate').val()),
        processorid: Processorid,
        processid: Processid,
        remarks: $("#txtremarks").val(),
        companyunitid: Companyunitid,
        companyid: CompanyId,
        ProcessorType: type,
        OrderType: ordtype,
        Closed: 'N',
        // OrderCumIssue:
        DelidateTime: $("#txtDeliDate").val(),//new Date($('#txtDeliDate').val()),
        ComboIds: "",
        DispLocType: desptchtype,
        DispLoc: $("#ddlLocation").val(),
        IssueLocType: isstype,
        IssueLoc: $("#ddlIssueLocation").val(),
        //Teamid:
        StoreUnitId: 1,
        CreatedBy: Userid,
        //Phoneno:
        //contactperson:
        //amount:
        //taxamount:
        //saccode:
        //CGST:
        //SGST:
        //IGST:
        //TotCGST:
        //TotSGST:
        //TotIGST:
        moduletype: 'D',
        ProdDet: iolist,
        ProdJobDet: jobdetlist,
        ProdStkDet: stkdetlist,
        ProdAddLess: AccList

    }
    $("#btnDel").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/ProductionOrder/Delete",
        data: JSON.stringify(Obj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.Value == true) {
                AddUserEntryLog('Production', 'Sewing Issue', 'DELETE', $("#txtOrderNo").val());
                //alert('Data Deleted Successfully');
                var msg = 'Data Deleted Successfully...';
                var flg = 2;
                var mod = 0;
                var ur = "";
                AlartMessage(msg, flg, mod, ur);

                //$('#myModal1').modal('hide');
                //window.location.reload();
                //$('#tblmaindetails').DataTable().destroy();


                //LoadMainGrid();


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





function LoadLocation() {
    var LocalType = $('input[name="DType"]:checked').attr('value');


    $('#txtLocaAdd').val('');

    if (LocalType == "P") {
        LoadCompanyUnitDDL("#ddlLocation");

    } else if (LocalType == "O") {
        LoadCompanyUnitDDL("#ddlLocation");
    } else if (LocalType == "S") {
        // LoadStoreUnitDDL("#ddlLocation");
        editmasunitstore = 0;
        LoadEmployeeStoreunit();
    } else if (LocalType == "C") {
        LoadSupplierDDL("#ddlLocation");
    }
}

function LoadLocationEdit() {
    var LocalType = $('input[name="DType"]:checked').attr('value');
    $('#txtLocAdd').val('');

    if (LocalType == "P") {
        LoadCompanyUnitDDL("#ddlLocation");
        if (editmasunitstore > 0) {
            $('#ddlLocation').val(editmasunitstore).trigger('change');
        }

    } else if (LocalType == "O") {
        LoadCompanyUnitDDL("#ddlLocation");
        if (editmasunitstore > 0) {
            $('#ddlLocation').val(editmasunitstore).trigger('change');
        }

    } else if (LocalType == "S") {
        LoadEmployeeStoreunit();
    } else if (LocalType == "C") {
        LoadSupplierDDL("#ddlLocation");
        if (editmasunitstore > 0) {
            $('#ddlLocation').val(editmasunitstore).trigger('change');
        }
    }
}



function LoadLocalAdd() {


    var LocalType = $('input[name="DType"]:checked').attr('value');

    if (LocalType == "P") {
        $('#txtLocaAdd').val("");
        var LocID = $('#ddlLocation').val();

        $.ajax({
            url: "/CompanyUnit/GetbyID/" + LocID,
            typr: "GET",

            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                var obj = result.Value;
                if (result.Status == 'SUCCESS') {

                    $('#txtLocaAdd').val(obj.Address1 + "," + obj.Address2 + "," + obj.Address3);

                }
            }

        });
    } else if (LocalType == "O") {
        $('#txtLocaAdd').val("");
        var LocID = $('#ddlLocation').val();

        $.ajax({
            url: "/CompanyUnit/GetbyID/" + LocID,
            typr: "GET",

            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                var obj = result.Value;
                if (result.Status == 'SUCCESS') {

                    $('#txtLocaAdd').val(obj.Address1 + "," + obj.Address2 + "," + obj.Address3);

                }
            }

        });
    } else if (LocalType == "S") {
        $('#txtLocaAdd').val("");
        var LocID = $('#ddlLocation').val();

        $.ajax({
            url: "/StoreUnit/GetbyId/" + LocID,
            typr: "GET",

            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                var obj = result.Value;
                if (result.Status == 'SUCCESS') {

                    $('#txtLocaAdd').val('');

                }
            }

        });
    } else if (LocalType == "C") {
        $('#txtLocaAdd').val("");
        var LocID = $('#ddlLocation').val();

        $.ajax({
            url: "/Supplier/GetbyId/" + LocID,
            typr: "GET",

            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                var obj = result.Value;
                if (result.Status == 'SUCCESS') {

                    $('#txtLocaAdd').val(obj.Address1 + "," + obj.Address2 + "," + obj.Address3);

                }
            }

        });
    }
}


function LoadIssLocation() {
    var LocalType = $('input[name="IssType"]:checked').attr('value');


    $('#txtIssLocaAdd').val('');

    if (LocalType == "O") {
        LoadCompanyUnitDDL("#ddlIssueLocation");

    } else if (LocalType == "C") {
        LoadCompanyDDL("#ddlIssueLocation");
    }
}




function LoadIssLocalAdd() {


    var LocalType = $('input[name="IssType"]:checked').attr('value');

    if (LocalType == "O") {
        $('#txtIssLocaAdd').val("");
        var LocID = $('#ddlIssueLocation').val();

        $.ajax({
            url: "/CompanyUnit/GetbyID/" + LocID,
            typr: "GET",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                var obj = result.Value;
                if (result.Status == 'SUCCESS') {

                    $('#txtIssLocaAdd').val(obj.Address1 + "," + obj.Address2 + "," + obj.Address3);

                }
            }

        });
    } else if (LocalType == "C") {
        $('#txtIssLocaAdd').val("");
        var LocID = $('#ddlIssueLocation').val();

        $.ajax({
            url: "/Company/GetbyID/" + LocID,
            typr: "GET",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                var obj = result.Value;
                if (result.Status == 'SUCCESS') {

                    $('#txtIssLocaAdd').val(obj.Address1 + "," + obj.Address2 + "," + obj.Address3);

                }
            }

        });
    }
}


function ProdOrdPrint(Id) {
    debugger;

    Repid = Id;
    $('#myModal2').modal('show');

    docname = "PROCESS ORDER";
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
    window.open("../ReportInline/Production/ProdOrderReportInline/ProdOrderReportInline.aspx?ProdOrdId=" + Repid + "&InpDet=" + p[0] + "&Ins=" + p[1] + "&Gatepass=" + p[2] + "&Isssecqty=" + p[3] + "&Lotdet=" + p[4] + "&Ordsecqty=" + p[5] + "&Rem=" + p[6] + "&Disploc=" + p[7] + "&Rate=" + p[8] + "&Amnt=" + p[9] + "&Issloc=" + p[10] + "&Millname=" + p[11] + "&Looplen=" + p[12] + "&Gauge=" + p[13] + "&Outno=" + p[14] + "&Plandet=" + p[15] + "&Opdet=" + p[16] + "&Ewaybill=" + p[17] + "&Ewaydate=" + p[18] + "&Refno=" + p[19] + "&Companyid=" + compid);

}

function backtomain() {

    $("#myModal1").modal('hide');
    window.location.href = "/ProductionOrder/ProductionOrderIndex";
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
            $(ddlLocation).empty();
            $(ddlLocation).append($('<option/>').val('0').text('--Select Store--'));
            $.each(data, function () {
                $(ddlLocation).append($('<option></option>').val(this.Storeid).text(this.StoreName));
            });
            $(ddlLocation).trigger("select2:updated");
            if (editmasunitstore > 0) {
                $('#ddlLocation').val(editmasunitstore).trigger('change');
            }
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });



}

function LoadStorefromcompany() {
    CompanyId = $('#ddlCompany').val();

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

            $(ddlAStoreUnit).empty();
            $(ddlAStoreUnit).append($('<option/>').val('0').text('--Select Store--'));
            $.each(data, function () {
                $(ddlAStoreUnit).append($('<option></option>').val(this.Storeid).text(this.StoreName));
            });
            $(ddlAStoreUnit).trigger("select2:updated");

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

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

            pallown = AllowList[0].PQuantity;
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}
function LoadSupplierSetup() {
    debugger;
    var setup = $("#hdnSupplierSetup").data('value');
   
    if (setup == 'True') {
        var procid = $('select#ddlProcess option:selected').val();;
        var typ = 'S';
        $.ajax({
            url: "/Supplier/GetSupplierSetup",
            data: JSON.stringify({ Processid: procid, Type: typ }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                debugger;
                var obj = result;
                if (obj.length > 0) {
                    var data = obj;
                    $(ddlSupplier).empty();
                    $(ddlSupplier).append($('<option/>').val('0').text('--Select Supplier--'));
                    $.each(data, function () {
                        $(ddlSupplier).append($('<option></option>').val(this.SupplierId).text(this.SupplierName));
                    });

                   
                }
            }
        });
    } else {
        LoadSupplierDDL("#ddlSupplier");
    }

}