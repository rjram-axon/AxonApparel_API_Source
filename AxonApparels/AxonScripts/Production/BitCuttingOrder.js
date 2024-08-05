var maintbllist = [];
var cuttinglist = [];
var IOlist = [];
var ItemStock = [];
var ItemStockorg = [];
var ItemStocktmplist = [];
var Ilist = [];
var Olist = [];
var companyid = 0;
var companyunitid = 0;
var Prodprgid = 0;
var WorkOrderNo, OrderType = 0;
var Frmdate, ToDt = 0;
var fromdate = 0, todate = 0;
var table, column, compId, Docum;
var Mode = 0;
var CuttingOrdMasid = 0;
var flag = false;
var Processorid = 0;
var Userid = 0;
var UserName = 0;
var Ortype = 0;
var Prtype = 0;
var MainFDate = 0;
var Guserid = 0;
var DCompid = 0;
var ChkRefno = true;
var ChkOrdno = true;
var ChkJOrdno = true;
var DtChk = false;
var ChkSupplier = true;
var ChkBuyer = true;
var ChkUnit = true;
var ChkIncharge = true;
var ChkCord = true;
var ChkComp = false;
var LoginUserid = '';
var editmasunitstore = 0;
var PanelProcessIssueEditFlg = "disabled";
var PanelProcessReturnDeleteFlg = "disabled";
var PanelProcessReturnPrintFlg = "disabled";
var ValidateCuttingTolerance = 0;
var AllowList = [];
var pallown = 0;
var Processid = 0;
var DTmode = 0;
var ValiCutBudAppSam = 0;
var OrderType = '';
var inProcess = '';
$(document).ready(function () {
    debugger; 

    Guserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    MainFDate = $("#hdMainFromDate").data('value');
    ValiCutBudApp = $("#hdnCostBudCutAppid").data('value');
    ValiCutBudAppSam = $("#hdnCostBudCutAppSamid").data('value');
    DCompid = $("#hdnDCompid").data('value');
    LoginUserid = $("#hdnLoginUserid").data('value');
    LoadCompanyDDL("#ddlcutCompany,#ddlinnercompany,#ddlcutheaderCompany");
    LoadCompanyUnitDDL("#ddlcutunit,#ddlinnercompunit,#ddlcutheaderUnit");
    LoadBuyerDDL("#ddlcutheaderBuyer,#ddlinnerBuyer");
    LoadPanelProcessDDL("#ddlProcess,#ddlinnerProcess");
    ValidateCuttingTolerance = $("#hdnValidateCuttingTolerance").data('value');

    LoadRefNoDDL("#ddlinnerrefno");
    LoadEmployeeDDL("#ddlheaderincharge");
    LoadStyleDDL("#ddlinnerstyle,#ddlheaderstyle");
    LoadOrderNoDDL("#ddlinnerOrderNo,#ddlheaderordno");
    LoadStoreUnitDDL("#ddlissuestore");
    LoadSupplierDDL("#ddlprocessor");
    LoadWorkdivisionDDL("#ddlinnerWorkdivision");


    Changedropcont();

    var todaydate = new Date();
    var day = todaydate.getDate();
    var Pmonth = todaydate.getMonth() - 2;
    var Cmonth = todaydate.getMonth() + 1;
    var year = todaydate.getFullYear();
    var datestring = Pmonth + "/" + day + "/" + year;
    var Fdatestring = day + "/" + Cmonth + "/" + year;
    Frmdate = year + "/" + Cmonth + "/" + day;
    ToDt = year + "/" + Cmonth + "/" + day;

    var day = new Date(),
        year = ((day.getMonth() - 2) < 0) ? (day.getFullYear() - 1) : day.getFullYear(),
        month = ((day.getMonth() - 2) < 0) ? (12 + (day.getMonth() - 2)) : (day.getMonth() + 1),
        date = day.getDate() + '/' + month + '/' + year;



    $("#txtFromDate").val(MainFDate);
    $("#txtToDate").val(Fdatestring);

    var d = new Date();

    var month = d.getMonth() + 1;
    var day = d.getDate();

    var output = (day < 10 ? '0' : '') + day + '/' +
        (month < 10 ? '0' : '') + month + '/' +
        d.getFullYear();

    //$("#txtFromDate").val(output);
    //$("#txtToDate").val(output);
    fromdate = $("#txtFromDate").val();
    todate = $("#txtToDate").val();

    $("#txtcutheaderdate").val(output);
    $("#txtheaderdeldate").val(output);
    ddlmain();
    //var output = d.getFullYear() + '/' +
    // (month < 10 ? '0' : '') + month + '/' +
    // (day < 10 ? '0' : '') + day;


    ChangeMaininorext();
    debugger;

    var fill = localStorage.getItem('PanelProcessMainFilter');
    if (fill != "null" && fill != null) {
        LoadDataFromBack(companyid, fromdate, todate);
    } else {
        LoadData(companyid, fromdate, todate);
    }

    //LoadData(companyid, fromdate, todate);
    $(document).on('keyup', '.txtrate', function (e) {
        debugger;
        var table = $('#tbloutputgrd').DataTable();
        var sno = table.row($(this).parents('tr')).data()["ProdPrgId"];
        var rate = table.row($(this).parents('tr')).data()["apprate"];
        var Val = $(this).val();

        if (ValiCutBudApp == 'Y' && OrderType=="W") {
            if (Val <= rate) {
                $.each(Olist, function () {
                    if (this.ProdPrgId == sno) {
                        this.rate = Val;

                    }
                });
            }
            else {
                //alert('Should not exceed BudgetRate...');
                var msg = 'Should not exceed BudgetRate...';
                var flg = 4;
                var mod = 1;
                AlartMessage(msg, flg, mod);
                $.each(Olist, function () {
                    if (this.ProdPrgId == sno) {
                        this.rate = this.apprate;

                    }
                });
                var table = $('#tbloutputgrd').DataTable();
                var data = table.rows().data();

                $('input[id=txtrate]').each(function (ig) {
                    if (data[ig].ProdPrgId == sno) {
                        var row = $(this).closest('tr');
                        row.find('#txtrate').val(data[ig].apprate);

                    }
                });
                return true;
            }
        }
        else if (ValiCutBudAppSam == 'Y' && OrderType == "S") {
            if (Val <= rate) {
                $.each(Olist, function () {
                    if (this.ProdPrgId == sno) {
                        this.rate = Val;

                    }
                });
            }
            else {
                //alert('Should not exceed BudgetRate...');
                var msg = 'Should not exceed BudgetRate...';
                var flg = 4;
                var mod = 1;
                AlartMessage(msg, flg, mod);
                $.each(Olist, function () {
                    if (this.ProdPrgId == sno) {
                        this.rate = this.apprate;

                    }
                });
                var table = $('#tbloutputgrd').DataTable();
                var data = table.rows().data();

                $('input[id=txtrate]').each(function (ig) {
                    if (data[ig].ProdPrgId == sno) {
                        var row = $(this).closest('tr');
                        row.find('#txtrate').val(data[ig].apprate);

                    }
                });
                return true;
            }
        }

        else {
            $.each(Olist, function () {
                if (this.ProdPrgId == sno) {
                    this.rate = Val;

                }
            });
        }
    });

    $(document).on('keyup', '.txtMRate', function () {
        debugger;
        rowindex = $(this).closest('tr').index();

        ItemStocktmplist.sort(function (a, b) {
            return a.Stockid - b.Stockid;
        });

        var currentrowoftcpi = ItemStocktmplist.slice(rowindex);
        var pid = currentrowoftcpi[0].Stockid;

        var value = $(this).val();

        $.each(ItemStocktmplist, function () {
            if (this.Stockid == pid) {
                this.MRate = value;
            }
        });

        var table = $('#tblinputstckgrd').DataTable();
        var data = table.rows().data();

        $('input[id=txtMRate]').each(function (ig) {
            if (data[ig].Stockid == pid) {
                var row = $(this).closest('tr');
                row.find('#txtMRate').val(value);

            }
        });


    });

    $("#btnmodalclose").click(function () {
        debugger;
        allototalvalue = 0;
        $('#myModal1').modal('hide');
        //ClearTextbox();
        var inputcount = 0;
        $('#tblinputgrd tr').each(function () {
            inputcount++;
        });

        if (inputcount > 0) {
            $('#tblinputgrd').DataTable().destroy();
            //var tableinput = $('#tblinputgrd').DataTable();
            //tableinput.clear().draw();
        }

        var outputcount = 0;
        $('#tbloutputgrd tr').each(function () {
            outputcount++;
        });

        if (outputcount > 0) {
            $('#tbloutputgrd').DataTable().destroy();
            //var tableoutput = $('#tbloutputgrd').DataTable();
            //tableoutput.clear().draw();
        }

        var stckcount = 0;
        $('#tblinputstckgrd tr').each(function () {
            stckcount++;
        });

        if (stckcount > 0) {
            $('#tblinputstckgrd').DataTable().destroy();
            //var tableinput = $('#tblinputgrd').DataTable();
            //tableinput.clear().draw();
        }

        //$('#tblinputgrd').DataTable().destroy();
        //$('#tbloutputgrd').DataTable().destroy();
        //$('#tblinputstckgrd').DataTable().destroy();
        Prodprgid = 0;
        Mode = 0;
        ItemStock = [];
        ItemStockorg = [];
        Ilist = [];
        Olist = [];
        companyid = 0;
        companyunitid = 0;
        Processorid = 0;
    });

    $("#btnlst").click(function () {
        $('#myModal1').modal('show');
        //fnLoadInOutGrid();
    });

    $(document).on('keyup', '.txtordqty', function () {
        debugger;
        rowindex = $(this).closest('tr').index();

        var currowind = Ilist.slice(rowindex);
        //currowind[0]['ProdPrgId'] = $("#txtordqty").val();
        currowind[0]['ordqty'] = $(this).val();

        for (var i in IOlist) {
            if (IOlist[i]['ProdPrgId'] == currowind[0]['ProdPrgId']) {
                IOlist[i]['ordqty'] = $(this).val();
                break; //Stop this loop, we found it!
            }
        }
        Ilist[rowindex] = currowind[0];
    });

    $(document).on('keyup', '.txtallqty', function () {
        debugger;
        //rowindex = $(this).closest('tr').index();

        //ItemStocktmplist.sort(function (a, b) {
        //    return a.Stockid - b.Stockid;
        //});

        var row = $(this).closest('tr');
        var data = $('#tblinputstckgrd').dataTable().fnGetData(row);

        var pid = data.Stockid;
        var itmid = data.ItemId;
        var colorid = data.ColorId;
        var sizeid = data.SizeId;
        var balq = data.StockQty;


        //var currentrowoftcpi = ItemStocktmplist.slice(rowindex);
        //var pid = currentrowoftcpi[0].Stockid;
        //var itmid = currentrowoftcpi[0].ItemId;
        //var colorid = currentrowoftcpi[0].ColorId;
        //var sizeid = currentrowoftcpi[0].SizeId;
        //// var uomid = currentrowoftcpi[0].OUomid;
        //var balq = currentrowoftcpi[0].StockQty;
        var value = $(this).val();




        $.each(ItemStocktmplist, function () {
            if (this.Stockid == pid) {

                if (balq >= value) {
                    this.AllotedQty = value;
                }
                else {
                    var t = value - balq;
                    this.AllotedQty = balq;
                    value = balq;
                }
            }
        });

        var totalamnt = 0;
        var totexceed = false;

        for (var e = 0; e < ItemStocktmplist.length; e++) {
            var amount = ItemStocktmplist[e].AllotedQty;
            if (ItemStocktmplist[e].ItemId == itmid && ItemStocktmplist[e].ColorId == colorid && ItemStocktmplist[e].SizeId == sizeid) {
                totalamnt = totalamnt + parseFloat(amount);
            }
        }


        var CSno=0

        $.each(Ilist, function () {
            if (this.ItemId == itmid && this.SizeId == sizeid && this.ColorId == colorid) {
                CSno= this.ProdPrgId
            }
        });

        var allow = 0;
        var balallow = 0;
        for (j = 0; Ilist.length > j; j++) {
            if (CSno == Ilist[j].ProdPrgId) {
            }
            else {
               
                if (Ilist[j].BalQty < Ilist[j].issqty) {
                    var curallow = parseFloat(Ilist[j].issqty) - parseFloat(Ilist[j].BalQty)
                    allow = allow + parseFloat(curallow);
                }
            }
        }

        balallow = pallown - allow;

        for (j = 0; Ilist.length > j; j++) {
            if (CSno == Ilist[j].ProdPrgId) {
              
                var allow = 0;
                if (Ilist[j].BalQty < totalamnt) {

                    var totactval = parseFloat(Ilist[j].BalQty) + balallow;

                    if (totactval < totalamnt) {
                        value = 0;

                        $.each(ItemStocktmplist, function () {
                            if (this.Stockid == pid) {

                                    this.AllotedQty = value;
                            }
                        });


                    }
                }
            }
        }

        totalamnt = 0;

        for (var e = 0; e < ItemStocktmplist.length; e++) {
            var amount = ItemStocktmplist[e].AllotedQty;
            if (ItemStocktmplist[e].ItemId == itmid && ItemStocktmplist[e].ColorId == colorid && ItemStocktmplist[e].SizeId == sizeid) {
                totalamnt = totalamnt + parseFloat(amount);
            }
        }

      

        $.each(Ilist, function () {
            if (this.ItemId == itmid && this.SizeId == sizeid && this.ColorId == colorid) {
                //this.quantity = 0;
                //if (this.BalQty > totalamnt) {
                    this.issqty = totalamnt;//this.BalQty;
                //}
                //else {
                //    this.issqty = this.BalQty;
                //    totexceed = true;
                //}
            }
        });

        if (value > balq) {
            $(this).val(balq);
        }
        else if (totexceed == true) {
            //alert("Total alloted qty should not exceed issued qty...");
            var msg = 'Total alloted quantity should not exceed issued quantity...';
            var flg = 4;
            var mod = 1;
            AlartMessage(msg, flg, mod);
            var tt = 0;
            $.each(Ilist, function () {
                if (this.ItemId == itmid && this.SizeId == sizeid && this.ColorId == colorid) {
                    tt = this.issqty;
                }
            });
            $.each(ItemStocktmplist, function () {
                if (this.Stockid == pid) {
                    this.AllotedQty = tt;
                }
            });
            var table = $('#tblinputstckgrd').DataTable();
            var data = table.rows().data();

            $('input[id=txtallqty]').each(function (ig) {
                if (data[ig].Stockid == pid) {
                    var row = $(this).closest('tr');
                    row.find('#txtallqty').val(tt);

                }
            });

        }


        var table = $('#tblinputstckgrd').DataTable();
        var data = table.rows().data();

        $('input[id=txtallqty]').each(function (ig) {
            if (data[ig].Stockid == pid) {
                var row = $(this).closest('tr');
                row.find('#txtallqty').val(value);

            }
        });

        //else if (totexceed == false) {
        //    if ($("#btnAdd").is(":disabled")) {
        //        $("#btnAdd").prop("disabled", true);
        //    }
        //}

        //if ((totalamnt > allototalvalue && allototalvalue>0)) {
        //    $(this).val(0);
        //}

        $('#tblinputgrd').DataTable().destroy();

        LoadInGrid(Ilist);

        Totwgt();
    });

    $(document).on('change', '.txtissqty', function () {
        debugger;
        rowindex = $(this).closest('tr').index();
        //var val = $(this).val();
        var currowind = Ilist.slice(rowindex);
        var table = $('#tblinputgrd').DataTable();
        var Prodprgid = table.row($(this).parents('tr')).data()["ProdPrgId"];
        var CuttingOrdDetId = table.row($(this).parents('tr')).data()["CuttingOrdDetId"];
        var CSno = Prodprgid;
        if (Mode == 0) {
            var CSno = Prodprgid;
        }
        else {
            var CSno = CuttingOrdDetId;
        }

        var Val = $(this).val();

        var allow = 0;
        var balallow = 0;
        for (j = 0; Ilist.length > j; j++) {
            if (CSno == Ilist[j].ProdPrgId) {
            }
            else {
                //var bal = Ilist[j].BalQty; //+pallown
                //var prgqty = Ilist[j].ProdprgQty;
                //var ordqty = Ilist[j].ordqty;
                if (Ilist[j].BalQty < Ilist[j].issqty) {
                    var curallow = parseFloat(Ilist[j].issqty) - parseFloat(Ilist[j].BalQty)
                    allow = allow + parseFloat(curallow);
                }
            }
        }

        balallow = pallown - allow;

        for (j = 0; Ilist.length > j; j++) {
            if (CSno == Ilist[j].ProdPrgId) {
                //var bal = Ilist[j].BalQty;  //+pallown
                //var prgqty = Ilist[j].ProdprgQty;
                //var ordqty = Ilist[j].ordqty;
                var allow = 0;
                if (Ilist[j].BalQty < Val) {

                    var totactval = parseFloat(Ilist[j].BalQty) + balallow;

                    if (totactval < Val) {

                        Val = parseFloat(totactval).toFixed(3);

                    }
                }
            }
        }

        var val = Val;


        //var v = currowind[0]['ordqty'];
        //if (v >= val) {
        currowind[0]['issqty'] = Val;

        //for (var i in IOlist) {
        //    if (IOlist[i]['ProdPrgId'] == currowind[0]['ProdPrgId']) {
        //        IOlist[i]['issqty'] = $(this).val();
        //        break; //Stop this loop, we found it!
        //    }
        //}
        //Ilist[rowindex] = currowind[0];

        var itemid = currowind[0]['ItemId'];
        var colorid = currowind[0]['ColorId'];
        var sizeid = currowind[0]['SizeId'];
        var sid = [];
        var bal = [];
        var qty = [];
        for (var t = 0; t < ItemStockorg.length; t++) {
            if (ItemStockorg[t].ItemId == itemid && ItemStockorg[t].ColorId == colorid && ItemStockorg[t].SizeId == sizeid) {
                sid.push(ItemStockorg[t].Stockid);
                bal.push(ItemStockorg[t].StockQty);
                qty.push(ItemStockorg[t].AllotedQty);
            }
            //if (ItemStock[t].ItemId == itemid && ItemStock[t].ColorId == colorid && ItemStock[t].SizeId == sizeid) {
            //    sid.push(ItemStock[t].Stockid);
            //    bal.push(ItemStock[t].BalQty);
            //    qty.push(ItemStock[t].AllotedQty);
            //}
        }

        var c = sid.length;
        var t = 0;

        if (val < bal[0]) {
            qty[0] = val;
        }
        else {
            for (var r = 0; r < c; r++) {
                //To split up stock bal value 
                if (r == 0) {
                    if (bal[r] <= val) {
                        qty[r] = bal[r];
                        t = val - bal[r];
                    }
                }
                if (r > 0) {
                    //If Stock should be 2 rows
                    if (bal[r] >= t) {
                        qty[r] = t;
                        t = 0;
                    }
                    else {
                        //If Stock more than 2 rows
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

        for (var u = 0; u < ItemStockorg.length; u++) {
            for (var r = 0; r < sid.length; r++) {
                if (ItemStockorg[u].Stockid == sid[r]) {
                    ItemStockorg[u].AllotedQty = qty[r];
                }
            }
        }

        var totalamnt = 0;
        var totexceed = false;
        for (var e = 0; e < ItemStockorg.length; e++) {
            var amount = ItemStockorg[e].AllotedQty;
            if (ItemStockorg[e].ItemId == itemid && ItemStockorg[e].ColorId == colorid && ItemStockorg[e].SizeId == sizeid) {
                totalamnt = totalamnt + parseFloat(amount);
            }
        }


        $.each(Ilist, function () {
            if (this.ItemId == itemid && this.SizeId == sizeid && this.ColorId == colorid) {
                //this.quantity = 0;
                //if (this.BalQty > totalamnt) {
                //    this.issqty = totalamnt;//this.BalQty;
                //}
                //else {
                //    this.issqty = this.BalQty;
                //    totexceed = true;
                //}
                this.issqty = Val;
            }
        });

        var tt = 0;
        $.each(Ilist, function () {
            if (this.ItemId == itemid && this.SizeId == sizeid && this.ColorId == colorid) {
                tt = this.issqty;
            }
        });
        if (ItemStockorg.length > 0) {
            var sid = [];
            var bal = [];
            var qty = [];
            for (var t = 0; t < ItemStockorg.length; t++) {
                if (ItemStockorg[t].ItemId == itemid && ItemStockorg[t].ColorId == colorid && ItemStockorg[t].SizeId == sizeid) {
                    sid.push(ItemStockorg[t].Stockid);
                    bal.push(ItemStockorg[t].StockQty);
                    qty.push(ItemStockorg[t].AllotedQty);
                }
                //if (ItemStock[t].ItemId == itemid && ItemStock[t].ColorId == colorid && ItemStock[t].SizeId == sizeid) {
                //    sid.push(ItemStock[t].Stockid);
                //    bal.push(ItemStock[t].BalQty);
                //    qty.push(ItemStock[t].AllotedQty);
                //}
            }

            var c = sid.length;
            var t = 0;

            if (tt < bal[0]) {
                qty[0] = tt;
                for (var l = 1; l < qty.length; l++) {
                    qty[l] = 0;
                }
            }
            else {
                for (var r = 0; r < c; r++) {
                    if (r == 0) {
                        if (bal[r] <= tt) {
                            qty[r] = bal[r];
                            t = tt - bal[r];
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

            for (var u = 0; u < ItemStockorg.length; u++) {
                for (var r = 0; r < sid.length; r++) {
                    if (ItemStockorg[u].Stockid == sid[r]) {
                        ItemStockorg[u].AllotedQty = qty[r];
                    }
                }
            }

        }
        $('#tblinputstckgrd').DataTable().destroy();
        $('#tblinputgrd').DataTable().destroy();
        LoadInGrid(Ilist);
        var tmplist = [];

        tmplist = $.grep(ItemStockorg, function (element, index) {
            return (element.ItemId == itemid && element.SizeId == sizeid && element.ColorId == colorid);
        });
        if (tmplist != undefined && tmplist.length > 0) {
            loadinputstock(tmplist);
        }
        //}
        //else {
        //    alert('Issue quantity should not exceed order quantity');
        //    $('#txtissqty').val(0);
        //}

        //Datatable textbox focus
        var rows = $("#tblinputgrd").dataTable().fnGetNodes();
        var dtTable = $('#tblinputgrd').DataTable();
        for (var i = 0; i < rows.length; i++) {
            if (Mode == 0) {

                var otable = $('#tblinputgrd').DataTable();
                var odata = otable.rows().data();

                $('input[id=txtissqty]').each(function (ig) {
                    if (odata[ig].ItemId == itemid && odata[ig].SizeId == sizeid && odata[ig].ColorId == colorid) {
                        var row = $(this).closest('tr');
                        var num = row.find('#txtissqty').val();
                        row.find('#txtissqty').focus().val('').val(num);
                    }
                });

                //var sn = dtTable.cells({ row: i, column: 1 }).data()[0];
                //$('input[id=txtissqty]').each(function () {
                //    if (sn == CSno && $(this).val() == val) {
                //        var row = $(this).closest('tr');
                //        var num = row.find('#txtissqty').val();
                //        row.find('#txtissqty').focus().val('').val(num);
                //        return true;
                //    }
                //});
            }
            else {

                var otable = $('#tblinputgrd').DataTable();
                var odata = otable.rows().data();

                $('input[id=txtissqty]').each(function (ig) {
                    if (odata[ig].ItemId == itemid && odata[ig].SizeId == sizeid && odata[ig].ColorId == colorid ) {
                        var row = $(this).closest('tr');
                        var num = row.find('#txtissqty').val();
                        row.find('#txtissqty').focus().val('').val(num);
                    }
                });


                //var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
                //$('input[id=txtissqty]').each(function () {
                //    if (sn == CSno && $(this).val() == val) {
                //        var row = $(this).closest('tr');
                //        var num = row.find('#txtissqty').val();
                //        row.find('#txtissqty').focus().val('').val(num);
                //        return true;
                //    }
                //});
            }
        }
        Totwgt();
    });

    $(document).on('keyup', '.txtsecqty', function () {
        debugger;
        rowindex = $(this).closest('tr').index();

        var currowind = Ilist.slice(rowindex);
        currowind[0]['secqty'] = $(this).val();

        for (var i in IOlist) {
            if (IOlist[i]['ProdPrgId'] == currowind[0]['ProdPrgId']) {
                IOlist[i]['secqty'] = $(this).val();
                break; //Stop this loop, we found it!
            }
        }
        Ilist[rowindex] = currowind[0];
    });

    $(document).on('keyup', '.txtoutordqty', function () {
        debugger;
        rowindex = $(this).closest('tr').index();

        var currowind = Olist.slice(rowindex);
        currowind[0]['secqty'] = $(this).val();
        var orderqty = currowind[0]['ordqty'];
        var Csno = currowind[0]['ProdPrgId'];
        var apprate = currowind[0]["apprate"];
        var rate = currowind[0]["rate"];

        var Val = $(this).val();

        if (ValiCutBudAppSam == "Y" && OrderType == "S") {
            if (apprate < rate) {

                //alert("Please Check Budget Rate..");
                var msg = 'Please Check Budget Rate...';
                var flg = 4;
                var mod = 1;
                AlartMessage(msg, flg, mod);
                Val = 0;
                return true;
            }

        }

        if (ValiCutBudApp == "Y" && OrderType == "B") {
            if (apprate < rate) {

                //alert("Please Check Budget Rate..");
                var msg = 'Please Check Budget Rate...';
                var flg = 4;
                var mod = 1;
                AlartMessage(msg, flg, mod);
                Val = 0;
                return true;
            }

        }


        var allow = 0;
        var balallow = 0;
        for (j = 0; Olist.length > j; j++) {
            if (Csno == Olist[j].ProdPrgId) {
            }
            else {
                var bal = Olist[j].BalQty; //+pallown
                var prgqty = Olist[j].ProdprgQty;
                var ordqty = Olist[j].ordqty;
                if (Olist[j].BalQty < Olist[j].ordqty) {
                    var curallow = parseFloat(Olist[j].ordqty) - parseFloat(Olist[j].BalQty)
                    allow = allow + parseFloat(curallow);
                }
            }
        }

        balallow = pallown - allow;

        for (j = 0; Olist.length > j; j++) {
            if (Csno == Olist[j].ProdPrgId) {
                var bal = Olist[j].BalQty;  //+pallown
                var prgqty = Olist[j].ProdprgQty;
                var ordqty = Olist[j].ordqty;
                var allow = 0;
                if (Olist[j].BalQty < Val) {

                    var totactval = parseFloat(Olist[j].BalQty) + balallow;

                    if (totactval < Val) {

                        Val = parseFloat(totactval).toFixed(3);

                    }
                }
            }
        }

     
            for (var i in IOlist) {
                if (IOlist[i]['ProdPrgId'] == currowind[0]['ProdPrgId']) {
                    IOlist[i]['ordqty'] = Val; //$(this).val(); Val

                    IOlist[i]['weight'] = ((currowind[0]['Grammage'] * Val) / 1000);//((currowind[0]['Grammage']*$(this).val())/1000);
                    //IOlist[i]['weight'] = ((2 * $(this).val()) / 1000);
                    currowind[0]['weight'] = IOlist[i]['weight'];
                    break; //Stop this loop, we found it!
                }
            }

            Olist[rowindex] = currowind[0];
            fnLoadOutGrid(Olist);
     
        var rows = $("#tbloutputgrd").dataTable().fnGetNodes();
        var dtTable = $('#tbloutputgrd').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 1 }).data()[0];
            $('input[id=txtoutordqty]').each(function () {
                if (sn == Csno && $(this).val() == Val) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtoutordqty').val();
                    row.find('#txtoutordqty').focus().val('').val(num);
                    return true;
                }
            });
        }
    });



    $(document).on('change', '#txtgrammage', function () {
        debugger;
        rowindex = $(this).closest('tr').index();

        var currowind = Olist.slice(rowindex);
        //currowind[0]['secqty'] = $(this).val();
        var orderqty = currowind[0]['ordqty'];
        var Csno = currowind[0]['ProdPrgId'];
        var Val = $(this).val();
        //if ($(this).val() > currowind[0]['BalQty']) {
        //    alert("Quantity should not exceed than Balance Qty...");
        //    $(this).val(orderqty);
        //}
       // else {
            for (var i in IOlist) {
                if (IOlist[i]['ProdPrgId'] == currowind[0]['ProdPrgId']) {
                    IOlist[i]['Grammage'] = $(this).val();

                    IOlist[i]['weight'] = ((currowind[0]['ordqty'] * $(this).val()) / 1000);
                    //IOlist[i]['weight'] = ((2 * $(this).val()) / 1000);
                    currowind[0]['weight'] = IOlist[i]['weight'];
                    break; //Stop this loop, we found it!
                }
            }

            Olist[rowindex] = currowind[0];
            fnLoadOutGrid(Olist);
      //  }
        //Datatable textbox focus
            var rows = $("#tbloutputgrd").dataTable().fnGetNodes();
        var dtTable = $('#tbloutputgrd').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 1 }).data()[0];
            $('input[id=txtgrammage]').each(function () {
                if (sn == Csno && $(this).val() == Val) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtgrammage').val();
                    row.find('#txtgrammage').focus().val('').val(num);
                    return true;
                }
            });
        }
    });




    $(document).ready(function () {

        $('#tblinputgrd').on('click', 'tr', function (e) {
            debugger;




            var stckcount = 0;
            $('#tblinputstckgrd tr').each(function () {
                stckcount++;
            });

            if (stckcount > 0) {
                $('#tblinputstckgrd').DataTable().destroy();
                //var tableinput = $('#tblinputgrd').DataTable();
                //tableinput.clear().draw();
            }

            var Jobordno = $('#txtheaderwrkNo').val();
            var Companyid = $('#ddlcutheaderCompany').val();
            var IssueStoreid = $('#ddlissuestore').val();
            var Styleid = $('#ddlheaderstyle').val();

            //rowindex = $(this).closest('tr').index();
            //var currowind = Ilist.slice(rowindex);

            //var Colorid = currowind[0]['ColorId'];
            //var Itemid = currowind[0]['ItemId'];
            //var Sizeid = currowind[0]['SizeId'];
            //var Stockid = currowind[0]['StockId'];



            var table = $('#tblinputgrd').DataTable();
            var row = $(this).closest('tr');
            var data = $('#tblinputgrd').dataTable().fnGetData(row);


            var Colorid = data.ColorId; //table.row($(this).parents('tr')).data()["itemid"];
            var Itemid = data.ItemId; //table.row($(this).parents('tr')).data()["colorid"];
            var Sizeid = data.SizeId; //table.row($(this).parents('tr')).data()["sizeid"];
            var Stockid = data.StockId; //table.row($(this).parents('tr')).data()["uomId"];

            if (Mode == 1) {
                var tmplist = [];

                tmplist = $.grep(ItemStockorg, function (element, index) {
                    return (element.ItemId == Itemid && element.SizeId == Sizeid && element.ColorId == Colorid);
                });
                if (tmplist != undefined && tmplist.length > 0) {
                    loadinputstock(tmplist);
                    ItemStocktmplist = tmplist;
                }
                else {
                    $.ajax({
                        url: "/BitCuttingOrder/GetInputItemStockEditMode",
                        data: JSON.stringify({ ID: CuttingOrdMasid, ItemID: Itemid, ColorID: Colorid, SizeID: Sizeid }),
                        type: "POST",
                        contentType: "application/json;charset=UTF-8",
                        dataType: "json",
                        success: function (result) {
                            debugger;
                            ItemStock = result;
                            if (result.length > 0) {
                                ItemStockorg = ItemStockorg.concat(ItemStock);
                            }
                            ItemStocktmplist = ItemStock;

                            $('#tblinputstckgrd').DataTable({
                                data: ItemStock,
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
                                    { title: "StockId", data: "Stockid", "visible": false },
                                    { title: "IssStockId", data: "IssStkid", "visible": false },
                                    { title: "Itemstckid", data: "itemstckid", "visible": false },
                                    { title: "ItemId", data: "ItemId", "visible": false },
                                    { title: "ColorId", data: "ColorId", "visible": false },
                                    { title: "SizeId", data: "SizeId", "visible": false },

                                    { title: "Document", data: "TransNo" },
                                    { title: "Lot No", data: "LotNo" },
                                    {
                                        title: "Trans Date", data: "TransDate",
                                        render: function (data) {
                                            return (moment(data).format("DD/MM/YYYY"));
                                        }
                                    },
                                    { title: "SupplierID", data: "Supplierid", "visible": false },
                                    { title: "Supplier", data: "Supplier" },
                                    { title: "ProcessId", data: "Processid", "visible": false },
                                    { title: "Process", data: "Process" },
                                    {
                                        title: "Stock Qty", data: "StockQty",
                                        render: function (data) {
                                            //return '<select id="ddlprocecolor" id="txtordqty" onkeyup="OnKeydown()" class="form-control" style="width: 100px;"/></select>';
                                            return '<input type="text"  class="form-control txtstkqty" style="width: 50px;text-align: center;" value=' + data + ' disabled="disabled">';
                                        }
                                    },
                                    {
                                        title: "Alloted Qty", data: "AllotedQty",
                                        render: function (data) {
                                            return '<input type="text" id="txtallqty" class="form-control txtallqty"  style="width: 50px;text-align: center;" value=' + data + ' >';
                                        },
                                    },
                                     {
                                         title: "Markup rate", data: "MRate",
                                         render: function (data) {
                                             return '<input type="text" id="txtMRate" class="form-control txtMRate"  style="width: 50px;text-align: center;" value=' + data + ' >';
                                         },
                                     },
                                ]
                            });
                        }
                    });
                }
            }
            else if (Mode == 0) {
                debugger;

                if (ItemStockorg.length == 0) {
                    LoadItemStock(Jobordno, Companyid, IssueStoreid, Styleid, Colorid, Itemid, Sizeid);
                }
                else {
                    for (var t = 0; t < ItemStockorg.length; t++) {
                        if (ItemStockorg[t].ItemId == Itemid && ItemStockorg[t].ColorId == Colorid && ItemStockorg[t].SizeId == Sizeid) {
                            flag = true;
                        }
                    }
                    if (flag == false) {
                        LoadItemStock(Jobordno, Companyid, IssueStoreid, Styleid, Colorid, Itemid, Sizeid);
                    }
                    else if (flag == true) {
                        ItemStock = $.grep(ItemStockorg, function (element, index) {
                            return element.ItemId == Itemid && element.ColorId == Colorid && element.SizeId == Sizeid;
                        });
                        ItemStocktmplist = ItemStock;

                        ItemStocktmplist.sort(function (a, b) {
                            return a.Stockid - b.Stockid;
                        });

                        ItemStock.sort(function (a, b) {
                            return a.Stockid - b.Stockid;
                        });

                        loadinputstock(ItemStock);
                        flag = false;
                    }
                }
            }
        });
    });



    $(document).on('click', '.btnmaingrddelete', function () {
        debugger;
        var table = $('#tblcuttingmaingrid').DataTable();
        var CuttOrdId = table.row($(this).parents('tr')).data()["CuttingOrdId"]; 
        //var OrderNo = table.row($(this).parents('tr')).data()["OrderNo"];

        //rowindex = $(this).closest('tr').index();

        //var currow = maintbllist.slice(rowindex);
        //var CuttOrdId = currow[0]['CuttingOrdId'];


        var Recpno = table.row($(this).parents('tr')).data()["CuttingOrdNo"];

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
                        AlartMessage(msg, flg, mod);
                        $("#btnUpdate").attr('disabled', true);
                        $("#btnDel").attr('disabled', true);
                        $('#btnAdd').hide();
                        return true;
                    }

                }
                else {
                    Delete(CuttOrdId);
                }

            },
            failure: function (errMsg) {
                alert(errMsg);
            }
        });

       // Delete(CuttOrdId);
    });

    $("#btnaddnew").click(function () {
        debugger;
        Mode = 0;
        companyid = $("#ddlcutCompany").val();
        companyunitid = $("#ddlcutunit").val();

        if (companyid == 0 || companyunitid == 0) {
            //alert("Please select Company and CompanyUnit");
            var msg = 'Please select Company and CompanyUnit...';
            var flg = 4;
            var mod = 1;
            AlartMessage(msg, flg, mod);
        }
        else {
            //$("#ddlinnercompunit").val(companyunitid);
            //$("#ddlinnercompany").val(companyid);

            $('#myModal').modal('show');
            LoadCuttingOrder(companyid, companyunitid);
            editmasunitstore = 0;
            LoadEmployeeStoreunit();
        }
    });
    $("#btncutclose").click(function () {
        debugger;
        $('#myModal').modal('hide');
        //ClearTextbox();
        $('#tblcuttingord1').DataTable().destroy();
        $("#ddlinnercompany").val(0);
        //$("#ddlcutCompany").val(0);
        $("#ddlinnerBuyer").val(0);
        $("#ddlinnerOrderNo").val(0);
        $("#ddlinnercompunit").val(0);
        //$("#ddlcutunit").val(0);
        $("#ddlinnerstyle").val(0);
        $("#ddlinnerWorkdivision").val(0);
        $("#ddlprocessor").val(0);
    });

    $(document).on('click', '.btnmaingrdedit', function () {
        debugger;
        Mode = 1;
        var table = $('#tblcuttingmaingrid').DataTable();
        CuttingOrdMasid = table.row($(this).parents('tr')).data()["CuttingOrdId"];
        var OrderNo = table.row($(this).parents('tr')).data()["OrderNo"];
        inProcess = table.row($(this).parents('tr')).data()["Process"];
        $('#txtProcess').val(inProcess);
        //rowindex = $(this).closest('tr').index();

        //var currow = maintbllist.slice(rowindex);
        //CuttingOrdMasid = currow[0]['CuttingOrdId'];
        //var OrderNo = currow[0]['OrderNo'];

        $('#myModal1').modal('show');
        $('#btnAdd').hide();
        $('#btnUpdate').show();
        ////Clear controls
        //var tablesize = $('#tblinputgrd').DataTable();
        //tablesize.clear().draw();

        //var tablesize = $('#tbloutputgrd').DataTable();
        //tablesize.clear().draw();

        getbyID(CuttingOrdMasid);

    });

    $(document).on('click', '.btnordadd', function () {
        debugger;


        var table = $('#tblcuttingord1').DataTable();


        Prodprgid = table.row($(this).parents('tr')).data()["ProdPrgId"];
        var ProdPrgNo = table.row($(this).parents('tr')).data()["ProdPrgNo"];
        var WorkOrderNo = table.row($(this).parents('tr')).data()["WorkOrder"];
        inProcess = table.row($(this).parents('tr')).data()["Process"];
        CheckPlanAmend(WorkOrderNo);
        //var ddlWorkDivision = $("#ddlinnerWorkdivision").val();
        var ddlIssueStore = $("#ddlissuestore").val();
        //var ddlProcessor = $("#ddlprocessor").val();

        //if ((ddlWorkDivision == 0) && (ddlProcessor == 0)) {
        //    alert("Check Work Division cannot be empty...");
        //} else if (ddlIssueStore == 0) {
        //    alert("Check Stores cannot be empty...");
        //}
        var type = $('input[name="wrkordnew"]:checked').attr('value');
        if (type == 'E') {
            var sup = $('#ddlprocessor').val();
            var supp = $('select#ddlprocessor option:selected').text();
            Processorid = $('select#ddlprocessor option:selected').val();
            if (sup == 0) {
                // alert('Select Supplier');
                $('#ddlprocessor').siblings(".select2-container").css('border', '1px solid red');
                //$('#myModal1').hide();
                //$('#myModal1').modal('hide');
                return true;
            } else {
                $('#ddlprocessor').siblings(".select2-container").css('border', '1px solid lightgrey');
            }
        }
        else {
            var sup = $('#ddlinnerWorkdivision').val();
            var supp = $('select#ddlinnerWorkdivision option:selected').text();
            Processorid = $('select#ddlinnerWorkdivision option:selected').val();
            if (sup == 0) {
               // alert('Select WorkDivision');
                $('#ddlinnerWorkdivision').siblings(".select2-container").css('border', '1px solid red');
                //$('#myModal1').hide();
                //$('#myModal1').modal('hide');
                return true;
            }
            else {
                $('#ddlinnerWorkdivision').siblings(".select2-container").css('border', '1px solid lightgrey');
            }
        }
        //else {
        if (ddlIssueStore == 0) {
            //alert("Check Stores cannot be empty...");
            $('#ddlissuestore').siblings(".select2-container").css('border', '1px solid red');
            return true;
        }
        else {
            $('#ddlissuestore').siblings(".select2-container").css('border', '1px solid lightgrey');
        }

        //rowindex = $(this).closest('tr').index();
        //var currow = cuttinglist.slice(rowindex);
        //Prodprgid = currow[0]['ProdPrgId'];
        //var ProdPrgNo = currow[0]['ProdPrgNo'];;
        //var WorkOrderNo = currow[0]['WorkOrder'];

        var OType = $('input[name="wrkord"]:checked').attr('value');
        OrderType = OType;
        var Type = OType;

        //if ($('#optproces').is(':checked')) {
        //    LoadSupplierDDL("#ddlheaderwrkdiv");
        //    var supplierid = $('#ddlprocessor').val();
        //    $('#ddlheaderwrkdiv').val(supplierid);
        //}
        //if ($('#optwrkorder').is(':checked')) {
        //    LoadWorkdivisionDDL("#ddlheaderwrkdiv");
        //    var workdivid = $('#ddlinnerWorkdivision').val();
        //    $('#ddlheaderwrkdiv').val(workdivid);
        //}
        var Processid = 0;
        $.each(cuttinglist, function (i) {
            if (cuttinglist[i].ProdPrgNo == ProdPrgNo) {

            }
        });





        GenerateCuttingNumber(table, column, compId, Docum);
        GenerateIssueNumber(table, column, compId, Docum);
        fnGetHeaderDet(WorkOrderNo, ProdPrgNo);
        fnLoadInOutGrid(Prodprgid, WorkOrderNo, Type);

        $('#ddlheaderwrkdiv').val(supp);
        $('#btnAdd').show();
        $('#btnUpdate').hide();
        // }
    });
});

function Changedropcont() {
    debugger;
    //if ($('#optwrkorder').is(':checked')) { $('#ddlinnerWorkdivision').show(); $('#ddlprocessor').hide(); }
    //else if ($('#optproces').is(':checked')) { $('#ddlinnerWorkdivision').hide(); $('#ddlprocessor').show(); }

    var chkwork = $('#optwrkorder').prop('checked');
    var chkProces = $('#optproces').prop('checked');
    if (chkwork) {
        $('#innerwork').show();
        $('#innerprocessor').hide();
    }
    else if (chkProces) {
        $('#innerwork').hide();
        $('#innerprocessor').show();
    }
}

function ChangeMaininorext() {
    debugger;

    var chkwork = $('#optoutint').prop('checked');
    var chkProces = $('#optoutext').prop('checked');
    if (chkwork) {
        $('#Mwork').show();
        $('#Mprocess').hide();
    }
    else if (chkProces) {
        $('#Mwork').hide();
        $('#Mprocess').show();
    }
}



function LoadAddDet() {

    $('#tblcuttingord1').DataTable().destroy();

    //$("#ddlinnercompunit").val(companyunitid);
    //$("#ddlinnercompany").val(companyid);

    var OType = $('input[name="wrkord"]:checked').attr('value');
    OrderType = OType;
    LoadCuttingOrder(companyid, companyunitid);

    companyid= $('#ddlinnercompany').val();
      
      LoadEmployeeStoreunit();
}

function calcsepquan(value) {
    debugger;
    ind;

    var currentrowoftcpi = ItemStockorg.slice(ind);
    var pid = currentrowoftcpi[0].Stockid;
    var itmid = currentrowoftcpi[0].ItemId;
    var colorid = currentrowoftcpi[0].ColorId;
    var sizeid = currentrowoftcpi[0].SizeId;
    // var uomid = currentrowoftcpi[0].OUomid;
    var balq = currentrowoftcpi[0].StockQty;

    $.each(ItemStockorg, function () {
        if (this.Stockid == pid) {

            if (balq >= value) {
                this.AllotedQty = value;
            }
            else {
                var t = value - balq;
                this.AllotedQty = balq;
            }
        }
    });

    var totalamnt = 0;

    for (var e = 0; e < ItemStockorg.length; e++) {
        var amount = ItemStockorg[e].AllotedQty;
        totalamnt = totalamnt + parseFloat(amount);
    }
    $.each(Ilist, function () {
        if (this.ItemId == itmid && this.SizeId == sizeid && this.ColorId == colorid) {
            //this.quantity = 0;
            this.issqty = totalamnt;
            //}
        }
    });

    LoadInGrid(Ilist);
}

function validate() {
    debugger;
    var isValid = true;
    //if ($('#ddlshift').val().trim() == "") {
    if ($('#ddlheaderincharge').val() == 0) {
       // $('#ddlheaderincharge').css('border-color', 'Red');
        $('#ddlheaderincharge').siblings(".select2-container").css('border', '1px solid red');
        isValid = false;
    }
    else {
      //  $('#ddlheaderincharge').css('border-color', 'lightgrey');
        $('#ddlheaderincharge').siblings(".select2-container").css('border', '1px solid lightgrey');
    }

    return isValid;
}

function LoadItemStock(Jobordno, Companyid, IssueStoreid, Styleid, Colorid, Itemid, Sizeid) {

    var PType = $('input[name="wrkordnew"]:checked').attr('value');
    var processorid = 0
    if (PType == 'I') {
        processorid = $('select#ddlinnerWorkdivision option:selected').val();
    } else {
        processorid = $('select#ddlprocessor option:selected').val();
    }

    var processortype = PType;



    $.ajax({
        url: "/BitCuttingOrder/GetInputItemStock",
        data: JSON.stringify({ JobOrdNo: Jobordno, CompanyId: Companyid, IssueStoreId: IssueStoreid, StyleId: Styleid, ColorId: Colorid, ItemId: Itemid, SizeId: Sizeid, Supplierid: processorid, Processortype: processortype }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            ItemStock = result;
            //ItemStockorg.push(ItemStock);
            if (ItemStockorg.length == 0) {
                ItemStockorg = ItemStock;
            }
            else if (ItemStock.length > 0) {
                //ItemStockorg.push(result);
                ItemStockorg = $.merge($.merge([], ItemStockorg), result);
            }

            ItemStocktmplist = ItemStock;
            //if (ItemStock.length == 0) { $('#tblinputstckgrd').DataTable().destroy(); }

            var stckcount = 0;
            $('#tblinputstckgrd tr').each(function () {
                stckcount++;
            });

            if (stckcount > 0) {
                $('#tblinputstckgrd').DataTable().destroy();
                //var tableinput = $('#tblinputgrd').DataTable();
                //tableinput.clear().draw();
            }

            //loadinputstock(ItemStockorg);
            loadinputstock(ItemStock);
        }
    });
}

function ListFilter() {
    debugger;
    $('#tblcuttingmaingrid').DataTable().destroy();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    companyid = $("#ddlcutCompany").val();

    //if (FDate >= TDate) {
    //    alert('From Date Should not exceed To Date...');
    //    return true;
    //}
    LoadData(companyid, FDate, TDate);
    //ddlmain();
}



function getbyID(CuttingOrderId) {
    debugger;
    $('#ddlcutheaderCompany').css('border-color', 'lightgrey');

    $.ajax({
        url: "/BitCuttingOrder/GetCuttingHeaderInfo/" + CuttingOrderId,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = [];
            obj = result;
            debugger;

            $("#ddlcutheaderCompany").val(obj[0].CompanyId);
            $('#ddlcutheaderBuyer').val(obj[0].BuyerId);
            $('#ddlcutheaderUnit').val(obj[0].CompanyUnitId);
            $('#txtheaderprogno').val(obj[0].ProdPrgNo);
            $("#ddlheaderwrkdiv").val(obj[0].WorkDivision);
            $("#ddlheaderincharge").val(obj[0].EmployeeId);
            $('#txtheaderwrkNo').val(obj[0].WorkOrder);
            $('#txtheaderloss').val(obj[0].LossPer);
            $('#txtcutheaderordno').val(obj[0].CuttingOrdNo);
            $('#txtheaderissNo').val(obj[0].OrderCumIssue);
            $('#txtcutheaderdate').val(moment(obj[0].CuttingOrdDate).format('DD/MM/YYYY'));
            $('#txtheaderdeldate').val(moment(obj[0].DeliverDate).format('DD/MM/YYYY'));
            $('#txtheaderrefno').val(obj[0].RefNo);
            $('#ddlheaderstyle').val(obj[0].StyleId);
            $('#txtremarks').val(obj[0].Remarks);
            $("#ddlheaderordno option:selected").text(obj[0].OrderNo);

            var prodprgid = obj[0].ProdPrgId;
            var Workorderno = obj[0].WorkOrder;
            Ortype = obj[0].OrderType;
            OrderType = Ortype;
            Prtype = obj[0].InterExter;
            Processorid = obj[0].WorkDivisionId;
            fnLoadInOutGridOnEditMode(CuttingOrderId, prodprgid);
            Processid = obj[0].ProcessId;
            LoadProcessDetails(Processid);
            CheckAlloted();

            //if (obj[0].InterExter == "E") {
            //    LoadSupplierDDL("#ddlheaderwrkdiv");
            //    var supplierid = obj[0].WorkDivisionId;
            //    $('#ddlheaderwrkdiv').val(supplierid);
            //}
            ////if ($('#optwrkorder').is(':checked')) {
            //if (obj[0].InterExter == "I") {
            //    LoadWorkdivisionDDL("#ddlheaderwrkdiv");
            //    var workdivid = obj[0].WorkDivisionId;
            //    $('#ddlheaderwrkdiv').val(workdivid);
            //}
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

function loadinputstock(list) {
    debugger;
    var stockcount = 0;

    if ($('#tblinputstckgrd').hide()) {
        $('#tblinputstckgrd').show();
    }

    $('#tblinputstckgrd tr').each(function () {
        stockcount++;
    });

    if (stockcount > 0) {
        $('#tblinputstckgrd').DataTable().destroy();
        //var tableinput = $('#tblinputgrd').DataTable();
        //tableinput.clear().draw();
    }

    if (Mode == 1) {
        //$('#tblinputstckgrd').DataTable().destroy();
        //var inputcount = 0;
        //$('#tblinputstckgrd tr').each(function () {
        //    inputcount++;
        //});

        //if (inputcount > 0) {
        //    //var tableinput = $('#tblinnergrid').DataTable();
        //    //tableinput.clear().draw();
        //    $('#tblinputstckgrd').DataTable().destroy();
        //}

        $('#tblinputstckgrd').DataTable({
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
                { title: "StockId", data: "Stockid", "visible": false },
                { title: "IssStockId", data: "IssStkid", "visible": false },
                { title: "Itemstckid", data: "itemstckid", "visible": false },
                { title: "ItemId", data: "ItemId", "visible": false },
                { title: "ColorId", data: "ColorId", "visible": false },
                { title: "SizeId", data: "SizeId", "visible": false },

                { title: "Document", data: "TransNo" },
                { title: "Lot No", data: "LotNo" },
                {
                    title: "Trans Date", data: "TransDate",
                    render: function (data) {
                        return (moment(data).format("DD/MM/YYYY"));
                    }
                },
                { title: "SupplierID", data: "Supplierid", "visible": false },
                { title: "Supplier", data: "Supplier" },
                { title: "ProcessId", data: "Processid", "visible": false },
                { title: "Process", data: "Process" },
                {
                    title: "Stock Qty", data: "StockQty",
                    render: function (data) {
                        //return '<select id="ddlprocecolor" id="txtordqty" onkeyup="OnKeydown()" class="form-control" style="width: 100px;"/></select>';
                        return '<input type="text"  class="form-control txtstkqty" style="width: 50px;text-align: center;" value=' + data + ' disabled="disabled">';
                    }
                },
                {
                    title: "Alloted Qty", data: "AllotedQty",
                    render: function (data) {
                        return '<input type="text" id="txtallqty" class="form-control txtallqty"  style="width: 50px;text-align: center;" value=' + data + ' >';
                    },
                },
                 {
                     title: "Markup rate", data: "MRate",
                     render: function (data) {
                         return '<input type="text" id="txtMRate" class="form-control txtMRate"  style="width: 50px;text-align: center;" value=' + data + ' >';
                     },
                 },
            ]
        });
    }
    else if (Mode == 0) {
        //$('#tblinputstckgrd').DataTable().destroy();
        $('#tblinputstckgrd').DataTable({
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
                { title: "StockId", data: "Stockid", "visible": false },

                { title: "ItemId", data: "ItemId", "visible": false },
                { title: "ColorId", data: "ColorId", "visible": false },
                { title: "SizeId", data: "SizeId", "visible": false },

                { title: "Document", data: "TransNo" },
                { title: "Lot No", data: "LotNo" },
                {
                    title: "Trans Date", data: "TransDate",
                    render: function (data) {
                        return (moment(data).format("DD/MM/YYYY"));
                    }
                },
                { title: "SupplierID", data: "Supplierid", "visible": false },
                { title: "Supplier", data: "Supplier" },
                { title: "ProcessId", data: "Processid", "visible": false },
                { title: "Process", data: "Process" },
                {
                    title: "Stock Qty", data: "BalQty",
                    render: function (data) {
                        //return '<select id="ddlprocecolor" id="txtordqty" onkeyup="OnKeydown()" class="form-control" style="width: 100px;"/></select>';
                        return '<input type="text"  class="form-control txtstkqty" style="width: 50px;text-align: center;" value=' + data + ' disabled="disabled">';
                    }
                },
                {
                    title: "Alloted Qty", data: "AllotedQty",
                    render: function (data) {
                        return '<input type="text" id="txtallqty" class="form-control txtallqty"  style="width: 50px;text-align: center;" value=' + data + ' >';
                    },
                },
                {
                    title: "Markup rate", data: "MRate",
                    render: function (data) {
                        return '<input type="text" id="txtMRate" class="form-control txtMRate"  style="width: 50px;text-align: center;" value=' + data + ' >';
                    },
                },
            ]
        });
    }
}

function GenerateCuttingNumber(table, column, compId, Docum) {
    table = "Cutting_Order_Mas",
    column = "CuttingOrderNo",
    compId = $('#ddlinnercompany').val(),
    Docum = 'BITCUTTING ORDER'

    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $('#txtcutheaderordno').val(result.Value);
        }
    });
}

function GenerateIssueNumber(table, column, compId, Docum) {
    table = "Cutting_Order_Mas",
    column = "OrderCumIssue",
    compId = $('#ddlinnercompany').val(),
    Docum = 'BITCUTTING ISSUE'

    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#txtheaderissNo').val(result.Value);
        }
    });
}

function addDays(theDate, days) {
    return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
}

function Add() {
    debugger;

    var res = validate();
    if (res == false) {
        return false;
    }


  
    var chkstk = 0;
    $.each(Ilist, function (i) {
        var totstk = 0
        if (Ilist[i].issqty > 0) {
            for (var e = 0; e < ItemStockorg.length; e++) {
                var amount = ItemStockorg[e].AllotedQty;
                if (ItemStockorg[e].ItemId == Ilist[i].ItemId && ItemStockorg[e].ColorId == Ilist[i].ColorId && ItemStockorg[e].SizeId == Ilist[i].SizeId) {
                    totstk = totstk + parseFloat(amount);
                }
            }

           
                if (totstk != Ilist[i].issqty) {
                    chkstk = 1;
                }
            }

    });

    if (chkstk > 0) {
        //alert('Please Fill atleast one Input Issue Qty..');
        var msg = 'Please Check Stock quantity and  Input Issue quantity...';
        var flg = 4;
        var mod = 1;
        AlartMessage(msg, flg, mod);
        return false;
    }



    var ipissuqty = 0;
    var opordqty = 0;
    $.each(IOlist, function (e) {
        if (IOlist[e].issqty > 0) {
            ipissuqty = ipissuqty + IOlist[e].issqty;
        }
        if (IOlist[e].ordqty > 0) {
            opordqty = opordqty + IOlist[e].ordqty;
        }
    });
    if (ipissuqty == 0) {
        //alert('Please Fill atleast one Input Issue Qty..');
        var msg = 'Please Fill atleast one Input Issue quantity...';
        var flg = 4;
        var mod = 1;
        AlartMessage(msg, flg, mod);
        return false;
    }

    if (opordqty == 0) {
        //alert('Please Fill atleast one Output Order Qty..');
        var msg = 'Please Fill atleast one Output Order quantity...';
        var flg = 4;
        var mod = 1;
        AlartMessage(msg, flg, mod);
        return false;
    }


    if (OrderType == 'W') {
        if (ValiCutBudApp == 'Y') {
            var cntrt = 0;
            $.each(IOlist, function (e) {
                if (IOlist[e].ordqty > 0) {
                    if (IOlist[e].rate > 0) {

                    } else {
                        // alert('Please Check the Item Rate..');
                        cntrt = cntrt + 1;
                    }
                }
            });
            if (cntrt > 0) {
                //alert('Please Check the Item Rate..');
                var msg = 'Please Check the Item Rate...';
                var flg = 4;
                var mod = 1;
                AlartMessage(msg, flg, mod);
                return false;
            }
        }
    }

    if (OrderType == 'S') {
        if (ValiCutBudAppSam == 'Y') {
            var cntrt = 0;
            $.each(IOlist, function (e) {
                if (IOlist[e].ordqty > 0) {
                    if (IOlist[e].rate > 0) {

                    } else {
                        // alert('Please Check the Item Rate..');
                        cntrt = cntrt + 1;
                    }
                }
            });
            if (cntrt > 0) {
                //alert('Please Check the Item Rate..');
                var msg = 'Please Check the Item Rate...';
                var flg = 4;
                var mod = 1;
                AlartMessage(msg, flg, mod);
                return false;
            }
        }
    }



    //if (ValidateCuttingTolerance > 0) {
    //    var mintolrence = 0;
    //    var maxtolrence = 0;

    //    var totwgt = 0;
    //    totwgt = $('#txttotwgt').val()

    //    mintolrence = parseFloat(ipissuqty) - parseFloat(ValidateCuttingTolerance);
    //    maxtolrence = parseFloat(ipissuqty) + parseFloat(ValidateCuttingTolerance);

    //    if (mintolrence <= totwgt && maxtolrence >= totwgt) {

    //    }
    //    else {
    //        //alert('Please Check Tolerance & Tot Wgt ..');
    //        var msg = 'Please Check Tolerance & Total Weight...';
    //        var flg = 4;
    //        var mod = 1;
    //        AlartMessage(msg, flg, mod);
    //        return false;
    //    }
    //}


    var PType = $('input[name="wrkordnew"]:checked').attr('value');

    var OType = $('input[name="wrkord"]:checked').attr('value');

    if (ItemStockorg.length > 0) {

        table = "Cutting_Order_Mas",
        column = "CuttingOrderNo",
        compId = $('#ddlinnercompany').val(),
        Docum = 'BITCUTTING ORDER'

        var oldCutOrdNo = $('#txtcutheaderordno').val();
        $.ajax({
            url: "/BulkOrder/GenerateNo",
            data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                debugger;
                var newCutOrdNo = result.Value;
                if (oldCutOrdNo != newCutOrdNo) {
                    //alert('Cut Ord No has been changed...');
                    var msg = 'Cut Order Number has been changed...';
                    var flg = 4;
                    var mod = 1;
                    AlartMessage(msg, flg, mod);
                    $('#txtcutheaderordno').val(result.Value);
                }

                var CuttObj = {
                    CuttingOrdNo: $('#txtcutheaderordno').val(),
                    OrderNo: $('#txtheaderwrkNo').val(),
                    CuttingOrdDate: $('#txtcutheaderdate').val(),
                    EmployeeId: $('#ddlheaderincharge').val(),
                    Remarks: $('#txtremarks').val(),
                    CompanyId: $('#ddlcutheaderCompany').val(),
                    OrderCumIssue: $('#txtheaderissNo').val(),
                    CompanyUnitId: $('#ddlcutheaderUnit').val(),
                    InorOut: PType,
                    OrderCumIssue: $('#txtheaderissNo').val(),
                    FromStoreId: $('#ddlissuestore').val(),
                    //ordertype: $('#txtquantity').val(),
                    OrderType: OType,
                    WorkDivisionId: Processorid,// $('#ddlheaderwrkdiv').val(),
                    LossPer: $('#txtheaderloss').val(),
                    ProdPrgId: Prodprgid,
                    Convtype: "K",
                    DeliverDate: $('#txtheaderdeldate').val(),
                    //createdby: $('#prodallowance').val(),
                    CreatedBy: Guserid,
                    //FLineId: $('#prodallowance').val(),
                    Issueunitid: $('#ddlcutheaderUnit').val(),
                    //saccode: $('#prodallowance').val(),
                    Saccode: "",
                    cgst: 0,
                    sgst: 0,
                    igst: 0,
                    Totcgst: 0,
                    Totsgst: 0,
                    TotIgst: 0,
                    cuttingorddet: IOlist,
                    cuttingordstckdet: ItemStockorg,
                    Type:'P',
                };
                $("#btnAdd").attr("disabled", true);
                LoadingSymb();
                $.ajax({
                    url: "/BitCuttingOrder/Add",
                    data: JSON.stringify(CuttObj),
                    type: "POST",
                    contentType: "application/json;charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        AddUserEntryLog('Production', 'Cutting Order', 'ADD', $("#txtcutheaderordno").val());
                        //alert("Record saved successfully...");
                        var msg = 'Record saved successfully...';
                        var flg = 1;
                        var mod = 0;
                        var ur = "/BitCuttingOrder/BitCuttingOrderIndex";
                        AlartMessage(msg, flg, mod,ur);
                        //$('#ddlcutCompany').val(0);
                        // $('#ddlcutunit').val(0);
                        $('#myModal1').modal('hide');
                        $('#myModal').modal('hide');
                        $('#tblcuttingmaingrid').DataTable().destroy();
                        $('#tblcuttingord1').DataTable().destroy();
                        LoadData(companyid, fromdate, todate);
                        Mode = 0;
                        //window.location.href = "/BitCuttingOrder/BitCuttingOrderIndex";
                    },
                    error: function (errormessage) {
                        alert(errormessage.responseText);
                    }
                });
            }
        });

    }
    else {
        //alert("No More stocks...");
        var msg = 'No More stocks...';
        var flg = 4;
        var mod = 1;
        AlartMessage(msg, flg, mod);
      //  $('#ddlcutunit').val(0);
        $('#myModal1').modal('hide');
        $('#myModal').modal('hide');
        $('#tblcuttingmaingrid').DataTable().destroy();
        $('#tblcuttingord1').DataTable().destroy();
        LoadData(companyid, fromdate, todate);
    }
}

function UpdateDetail() {
    debugger;

    //var OType = $('input[name="wrkord"]:checked').attr('value');

   
    var chkstk = 0;
    $.each(Ilist, function (i) {
        var totstk = 0
        if (Ilist[i].issqty > 0) {
        for (var e = 0; e < ItemStockorg.length; e++) {
            var amount = ItemStockorg[e].AllotedQty;
            if (ItemStockorg[e].ItemId == Ilist[i].ItemId && ItemStockorg[e].ColorId == Ilist[i].ColorId && ItemStockorg[e].SizeId == Ilist[i].SizeId) {
                totstk = totstk + parseFloat(amount);
            }
        }
       
            if (totstk != Ilist[i].issqty) {
                chkstk = 1;
            }
        }

    });

    if (chkstk > 0) {
        //alert('Please Fill atleast one Input Issue Qty..');
        var msg = 'Please Check Stock quantity and  Input Issue quantity...';
        var flg = 4;
        var mod = 1;
        AlartMessage(msg, flg, mod);
        return false;
    }


    var ipissuqty = 0;
    var opordqty = 0;
    $.each(IOlist, function (e) {
        if (IOlist[e].issqty > 0) {
            ipissuqty = ipissuqty + IOlist[e].issqty;
        }
        if (IOlist[e].ordqty > 0) {
            opordqty = opordqty + IOlist[e].ordqty;
        }
    });
    if (ipissuqty == 0) {
        //alert('Please Fill atleast one Input Issue Qty..');
        var msg = 'Please Fill atleast one Input Issue quantity...';
        var flg = 4;
        var mod = 1;
        AlartMessage(msg, flg, mod);
        return false;
    }

    if (opordqty == 0) {
        //alert('Please Fill atleast one Output Order Qty..');
        var msg = 'Please Fill atleast one Output Order quantity...';
        var flg = 4;
        var mod = 1;
        AlartMessage(msg, flg, mod);
        return false;
    }

    //$.each(IOlist, function (e) {
    //    if (IOlist[e].ordqty > 0) {
    //        if (IOlist[e].rate > 0) {

    //        } else {
    //            alert('Please Check the Item Rate..');
    //            return false;
    //        }
    //    }
    //});

    if (OrderType == 'W') {
        if (ValiCutBudApp == 'Y') {
            var cntrt = 0;
            $.each(IOlist, function (e) {
                if (IOlist[e].ordqty > 0) {
                    if (IOlist[e].rate > 0) {

                    } else {
                        // alert('Please Check the Item Rate..');
                        cntrt = cntrt + 1;
                    }
                }
            });
            if (cntrt > 0) {
                //alert('Please Check the Item Rate..');
                var msg = 'Please Check the Item Rate...';
                var flg = 4;
                var mod = 1;
                AlartMessage(msg, flg, mod);
                return false;
            }
        }
    }

    if (OrderType == 'S') {
        if (ValiCutBudAppSam == 'Y') {
            var cntrt = 0;
            $.each(IOlist, function (e) {
                if (IOlist[e].ordqty > 0) {
                    if (IOlist[e].rate > 0) {

                    } else {
                        // alert('Please Check the Item Rate..');
                        cntrt = cntrt + 1;
                    }
                }
            });
            if (cntrt > 0) {
                //alert('Please Check the Item Rate..');
                var msg = 'Please Check the Item Rate...';
                var flg = 4;
                var mod = 1;
                AlartMessage(msg, flg, mod);
                return false;
            }
        }
    }


    //if (ValidateCuttingTolerance > 0) {
    //    var mintolrence = 0;
    //    var maxtolrence = 0;

    //    var totwgt = 0;
    //    totwgt = $('#txttotwgt').val()

    //    mintolrence = parseFloat(ipissuqty) - parseFloat(ValidateCuttingTolerance);
    //    maxtolrence = parseFloat(ipissuqty) + parseFloat(ValidateCuttingTolerance);

    //    if (mintolrence <= totwgt && maxtolrence >= totwgt) {

    //    }
    //    else {
    //        //alert('Please Check Tolerance & Tot Wgt ..');
    //        var msg = 'Please Check Tolerance & Total weight...';
    //        var flg = 4;
    //        var mod = 1;
    //        AlartMessage(msg, flg, mod);
    //        return false;
    //    }
    //}


    var CuttObjUpdate = {
        CuttingOrdId: CuttingOrdMasid,
        CuttingOrdNo: $('#txtcutheaderordno').val(),
        OrderNo: $('#txtheaderwrkNo').val(),
        CuttingOrdDate: $('#txtcutheaderdate').val(),
        EmployeeId: $('#ddlheaderincharge').val(),
        Remarks: $('#txtremarks').val(),
        CompanyId: $('#ddlcutheaderCompany').val(),
        OrderCumIssue: $('#txtheaderissNo').val(),
        CompanyUnitId: $('#ddlcutheaderUnit').val(),
        InorOut: Prtype,
        OrderCumIssue: $('#txtheaderissNo').val(),
        FromStoreId: $('#ddlissuestore').val(),
        OrderType: Ortype,
        WorkDivisionId: Processorid,//$('#ddlheaderwrkdiv').val(),
        LossPer: $('#txtheaderloss').val(),
        ProdPrgId: Prodprgid,
        Convtype: "K",
        DeliverDate: $('#txtheaderdeldate').val(),
        CreatedBy: Guserid,
        Issueunitid: $('#ddlcutheaderUnit').val(),
        Saccode: "",
        cgst: 0,
        sgst: 0,
        igst: 0,
        Totcgst: 0,
        Totsgst: 0,
        TotIgst: 0,
        cuttingorddet: IOlist,
        cuttingordstckdet: ItemStockorg,
    };
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/BitCuttingOrder/UpdateDet",
        data: JSON.stringify(CuttObjUpdate),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "JSON",
        success: function (result) {
            debugger;
            AddUserEntryLog('Production', 'Cutting Order', 'UPDATE', $("#txtcutheaderordno").val());
            //alert("Record updated successfully...");
            var msg = 'Record updated successfully...';
            var flg = 1;
            var mod = 0;
            var ur = "/BitCuttingOrder/BitCuttingOrderIndex";
            AlartMessage(msg, flg, mod, ur);
            $('#myModal1').modal('hide');
            $('#myModal').modal('hide');
            $('#tblcuttingmaingrid').DataTable().destroy();
            //$('#tblcuttingord1').DataTable().destroy();
            companyid = $('#ddlcutCompany').val();
            fromdate = $("#txtFromDate").val();
            todate = $("#txtToDate").val();

            LoadData(companyid, fromdate, todate);
            CuttingOrdMasid = 0;
            Mode = 0;
            //window.location.href = "/BitCuttingOrder/BitCuttingOrderIndex";
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function fnGetHeaderDet(JobordNo, ProdPrgNo) {
    //LoadSupplierDDL("#ddlheaderwrkdiv");
    $.ajax({
        type: "POST",
        url: '/BitCuttingOrder/GetCuttingHeaderDet/',
        //data: JSON.stringify({ CompanyId: companyid, CompanyUnitId: companyunitid }),
        data: JSON.stringify({ JobOrdNo: JobordNo }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            var HeaderValue = json;

            $("#ddlcutheaderCompany").val($("#ddlinnercompany").val());
            $('#ddlcutheaderBuyer').val(HeaderValue[0]['BuyerId']);
            $('#ddlcutheaderUnit').val(HeaderValue[0]['CompanyUnitId']);
            $('#txtheaderprogno').val(ProdPrgNo);
            $('#txtProcess').val(inProcess);
            //$("#ddlheaderwrkdiv").val($("#ddlinnerWorkdivision").val());

            //var PrcoId = $('#ddlheaderwrkdiv').val();

            //if (PrcoId == 0) {
            //    $("#ddlheaderwrkdiv").val($("#ddlprocessor").val());
            //}

            $('#txtheaderwrkNo').val(JobordNo);
            $("#ddlheaderordno option:selected").text(HeaderValue[0]['OrderNo']);
            $('#txtheaderrefno').val(HeaderValue[0]['RefNo']);
            $('#ddlheaderstyle').val(HeaderValue[0]['StyleId']);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function fnLoadInOutGridOnEditMode(CuttingOrderId, prodprgid) {
    debugger;

    $.ajax({
        type: "POST",
        url: "/BitCuttingOrder/GetInOutDetEdit",
        data: JSON.stringify({ CuttingOrdMasId: CuttingOrderId, Prodprgid: prodprgid }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            IOlist = json.Value;
            if (IOlist != undefined) {
                Ilist = $.grep(IOlist, function (element, index) {
                    return element.InorOut == "I";
                });

                Olist = $.grep(IOlist, function (element, index) {
                    return element.InorOut == "O";
                });
            }

            var inputcount = 0;
            $('#tblinputgrd tr').each(function () {
                inputcount++;
            });

            var outputcount = 0;
            $('#tbloutputgrd tr').each(function () {
                outputcount++;
            });

            //var stockcount = 0;
            //$('#tblinputstckgrd tr').each(function () {
            //    stockcount++;
            //});

            //if (stockcount > 0) {
            //    $('#tblinputstckgrd').DataTable().destroy();
            //    //var tableinput = $('#tblinputgrd').DataTable();
            //    //tableinput.clear().draw();
            //}

            if (inputcount > 0) {
                $('#tblinputgrd').DataTable().destroy();
                //var tableinput = $('#tblinputgrd').DataTable();
                //tableinput.clear().draw();
            }

            if (outputcount > 0) {
                $('#tbloutputgrd').DataTable().destroy();
                //var tableoutput = $('#tbloutputgrd').DataTable();
                //tableoutput.clear().draw();
            }

            Ilist.sort(function (a, b) {
                return a.CuttingOrdDetId - b.CuttingOrdDetId;
            });

            LoadInGrid(Ilist);

            Olist.sort(function (a, b) {
                return a.CuttingOrdDetId - b.CuttingOrdDetId;
            });

            $('#tbloutputgrd').DataTable({
                data: Olist,
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
                    { title: "CuttingOrderDetId", data: "CuttingOrdDetId", "visible": false },
                    { title: "ProdPrgId", data: "ProdPrgId", "visible": false },
                    { title: "ColorId", data: "ColorId", "visible": false },
                    { title: "SizeId", data: "SizeId", "visible": false },
                    { title: "ItemId", data: "ItemId", "visible": false },
                    { title: "Item", data: "Item" },
                    { title: "Color", data: "Color" },
                    { title: "Size", data: "Size" },
                    {
                        title: "Gms/Pcs", data: "Grammage","visible": false,
                        render: function (data) {
                            //return '<select id="ddlprocecolor" class="form-control" style="width: 100px;"/></select>';
                            return '<input type="text" id="txtgrammage" class="form-control"  style="width: 50px;text-align: center;" value=' + data + ' >';
                        }
                    },
                    { title: "Weight", data: "weight" ,"visible": false},
                    { title: "Prog.Qty", data: "ProdprgQty" },
                    { title: "Bal.Qty", data: "StockQty" },
                       { title: "AppRate", data: "apprate", "visible": false },
                    {
                        title: "Rate", data: "rate",
                        render: function (data) {
                            //return '<select id="ddlprocecolor" class="form-control" style="width: 100px;"/></select>';
                            return '<input type="text" id="txtrate" class="txtrate form-control"  style="width: 50px;text-align: center;" value=' + data + ' >';
                        }
                    },
                    {
                        title: "Order Qty", data: "ordqty",
                        render: function (data) {
                            return '<input type="text" id="txtoutordqty" class="form-control txtoutordqty"  style="width: 50px;text-align: center;" value=' + data + ' >';
                        },
                    },
                     { title: "UOM", data: "BaseUnit" },
                ]
            });


            Totwgt();
            if ($('#tblinputstckgrd').hide()) {
                $('#tblinputstckgrd').show();
            }

            var stockcount = 0;
            $('#tblinputstckgrd tr').each(function () {
                stockcount++;
            });

            if (stockcount > 0) {
                $('#tblinputstckgrd').DataTable().destroy();
                //var tableinput = $('#tblinputgrd').DataTable();
                //tableinput.clear().draw();
            }

            //Load Stock Grid
            if (Ilist != undefined && Ilist.length > 0) {
                debugger;
                var currowind = Ilist.slice(0);

                var Colorid = currowind[0]['ColorId'];
                var Itemid = currowind[0]['ItemId'];
                var Sizeid = currowind[0]['SizeId'];
                var Stockid = currowind[0]['StockId'];

                $.ajax({
                    url: "/BitCuttingOrder/GetInputItemStockEditMode",
                    data: JSON.stringify({ ID: CuttingOrdMasid, ItemID: Itemid, ColorID: Colorid, SizeID: Sizeid }),
                    type: "POST",
                    contentType: "application/json;charset=UTF-8",
                    dataType: "json",
                    success: function (result) {
                        debugger;
                        ItemStock = result;
                        ItemStockorg = result;

                        $('#tblinputstckgrd').DataTable({
                            data: ItemStock,
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
                                { title: "StockId", data: "Stockid", "visible": false },
                                { title: "IssStockId", data: "IssStkid", "visible": false },
                                { title: "Itemstckid", data: "itemstckid", "visible": false },
                                { title: "ItemId", data: "ItemId", "visible": false },
                                { title: "ColorId", data: "ColorId", "visible": false },
                                { title: "SizeId", data: "SizeId", "visible": false },

                                { title: "Document", data: "TransNo" },
                                { title: "Lot No", data: "LotNo" },
                                {
                                    title: "Trans Date", data: "TransDate",
                                    render: function (data) {
                                        return (moment(data).format("DD/MM/YYYY"));
                                    }
                                },
                                { title: "SupplierID", data: "Supplierid", "visible": false },
                                { title: "Supplier", data: "Supplier" },
                                { title: "ProcessId", data: "Processid", "visible": false },
                                { title: "Process", data: "Process" },
                                {
                                    title: "Stock Qty", data: "StockQty",
                                    render: function (data) {
                                        //return '<select id="ddlprocecolor" id="txtordqty" onkeyup="OnKeydown()" class="form-control" style="width: 100px;"/></select>';
                                        return '<input type="text"  class="form-control txtstkqty" style="width: 50px;text-align: center;" value=' + data + ' disabled="disabled">';
                                    }
                                },
                                {
                                    title: "Alloted Qty", data: "AllotedQty",
                                    render: function (data) {
                                        return '<input type="text" id="txtallqty" class="form-control txtallqty"  style="width: 50px;text-align: center;" value=' + data + ' >';
                                    },
                                },
                                {
                                    title: "Markup rate", data: "MRate",
                                    render: function (data) {
                                        return '<input type="text" id="txtMRate" class="form-control txtMRate"  style="width: 50px;text-align: center;" value=' + data + ' >';
                                    },
                                },

                            ]
                        });
                    }
                });
            }

            $('#myModal1').modal('show');

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}


function LoadInGrid(list) {
    $('#tblinputgrd').DataTable({
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
            { title: "CuttingOrderDetId", data: "CuttingOrdDetId", "visible": false },
            { title: "ProdPrgId", data: "ProdPrgId", "visible": false },
            { title: "ColorId", data: "ColorId", "visible": false },
            { title: "SizeId", data: "SizeId", "visible": false },
            { title: "ItemId", data: "ItemId", "visible": false },
            { title: "Item", data: "Item" },
            { title: "Color", data: "Color" },
            { title: "Size", data: "Size" },
            { title: "Prog.Qty", data: "ProdprgQty" },
            { title: "Bal.Qty", data: "BalQty" },
            //{
            //    title: "Order Qty", data: "ordqty",
            //    render: function (data) {
            //        //return '<select id="ddlprocecolor" id="txtordqty" onkeyup="OnKeydown()" class="form-control" style="width: 100px;"/></select>';
            //        return '<input type="text"  class="form-control txtordqty" style="width: 50px;text-align: center;" value=' + data + ' >';
            //    }
            //},
            {
                title: "Iss.Qty", data: "issqty",
                render: function (data) {
                    return '<input type="text" id="txtissqty" class="form-control txtissqty"  style="width: 50px;text-align: center;" value=' + data + ' >';
                },
            },
              { title: "UOM", data: "BaseUnit" },
            {
                title: "Sec.Qty", data: "secqty",
                render: function (data) {
                    return '<input type="text" class="form-control txtsecqty"  style="width: 50px;text-align: center;" value=' + data + ' >';
                },
            },
            //{
            //    title: "ACTION", "mDataProp": null,
            //    "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="View Stock" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnitemstck btn btn-info btn-round"><i class="fa fa-eye"></i></button>'
            //}
        ]
    });

    var table = $('#tblinputgrd').DataTable();
    $("#tblinputgrd tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblinputgrd tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}

function fnLoadInOutGrid(ProdprgId, WorkOrderNo, Type) {
    debugger;
    $('#tblinputstckgrd').hide();
    $.ajax({
        type: "POST",
        url: "/BitCuttingOrder/GetInOutDet",
        //data: JSON.stringify({ CompanyId: companyid, CompanyUnitId: companyunitid }),
        //data: JSON.stringify({ Prodprgid: "7608", JobOrdNo: "TEX@WRK00118", Ordertype: "W" }),
        data: JSON.stringify({ Prodprgid: ProdprgId, JobOrdNo: WorkOrderNo, Ordertype: Type }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            IOlist = json.Value;
            if (IOlist != undefined) {
                Ilist = $.grep(IOlist, function (element, index) {
                    return element.InorOut == "I";
                });

                Olist = $.grep(IOlist, function (element, index) {
                    return element.InorOut == "O";
                });
            }

            Ilist.sort(function (a, b) {
                return a.ProdPrgId - b.ProdPrgId;
            });

            var inputcount = 0;
            $('#tblinputgrd tr').each(function () {
                inputcount++;
            });

            var outputcount = 0;
            $('#tbloutputgrd tr').each(function () {
                outputcount++;
            });

            if (inputcount > 0) {
                $('#tblinputgrd').DataTable().destroy();
            }

            if (outputcount > 0) {
                $('#tbloutputgrd').DataTable().destroy();
            }


            $('#tblinputgrd').DataTable({
                data: Ilist,
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
                    //{ title: "CuttingOrderDetId", data: "CuttingOrdDetId", "visible": false },
                    { title: "ProdPrgId", data: "ProdPrgId", "visible": false },
                    { title: "StockId", data: "StockId", "visible": false },
                    { title: "ColorId", data: "ColorId", "visible": false },
                    { title: "SizeId", data: "SizeId", "visible": false },
                    { title: "ItemId", data: "ItemId", "visible": false },
                    { title: "Item", data: "Item" },
                    { title: "Color", data: "Color" },
                    { title: "Size", data: "Size" },
                    { title: "Prog.Qty", data: "ProdprgQty" },
                    { title: "Bal.Qty", data: "BalQty" },
                    //{
                    //    title: "Order Qty", data: "ordqty",
                    //    render: function (data) {
                    //        //return '<select id="ddlprocecolor" id="txtordqty" onkeyup="OnKeydown()" class="form-control" style="width: 100px;"/></select>';
                    //        return '<input type="text"  class="form-control txtordqty" style="width: 50px;text-align: center;" value=' + data + ' >';
                    //    }
                    //},
                    {
                        title: "Iss.Qty", data: "issqty",
                        render: function (data) {
                            return '<input type="text" class="form-control txtissqty" id="txtissqty"  style="width: 50px;text-align: center;" value=' + data + ' >';
                        },
                    },
                     { title: "UOM", data: "BaseUnit" },
                    {
                        title: "Sec.Qty", data: "secqty",
                        render: function (data) {
                            return '<input type="text" class="form-control txtsecqty"  style="width: 50px;text-align: center;" value=' + data + ' >';
                        },
                    },
                    //{
                    //    title: "ACTION", "mDataProp": null,
                    //    "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="View Stock" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnitemstck btn btn-info btn-round"><i class="fa fa-eye"></i></button>'
                    //}
                ]
            });

            var table = $('#tblinputgrd').DataTable();
            $("#tblinputgrd tr").click(function () {
                var selected = $(this).hasClass("selected");
                $("#tblinputgrd tr").removeClass("selected");
                if (!selected)
                    $(this).addClass("selected");
            });

            $('#tbloutputgrd').DataTable({
                data: Olist,
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
                    { title: "CuttingOrderDetId", data: "CuttingOrdDetId", "visible": false },
                    { title: "ProdPrgId", data: "ProdPrgId", "visible": false },
                    { title: "ColorId", data: "ColorId", "visible": false },
                    { title: "SizeId", data: "SizeId", "visible": false },
                    { title: "ItemId", data: "ItemId", "visible": false },
                    { title: "Item", data: "Item" },
                    { title: "Color", data: "Color" },
                    { title: "Size", data: "Size" },
                    {
                        //title: "Gms/Pcs", data: "Grammage",
                        title: "Gms/Pcs", data: "Grammage", "visible": false, 
                        render: function (data) {
                            //return '<select id="ddlprocecolor" class="form-control" style="width: 100px;"/></select>';
                            return '<input type="text" id="txtgrammage" class="form-control"  style="width: 50px;text-align: center;" value=' + data + ' >';
                        }
                    },
                    { title: "Weight", data: "weight", "visible": false  },
                    { title: "Prog.Qty", data: "ProdprgQty" },
                    { title: "Bal.Qty", data: "BalQty" },
                     { title: "AppRate", data: "apprate", "visible": false },
                    {
                        title: "Rate", data: "rate",
                        render: function (data) {
                            //return '<select id="ddlprocecolor" class="form-control" style="width: 100px;"/></select>';
                            return '<input type="text" id="txtrate" class="txtrate form-control"  style="width: 50px;text-align: center;" value=' + data + ' >';
                        }
                    },
                    {
                        title: "Order Qty", data: "ordqty",
                        render: function (data) {
                            return '<input type="text" id="txtoutordqty" class="form-control txtoutordqty"  style="width: 50px;text-align: center;" value=' + data + ' >';
                        },
                    },
                     { title: "UOM", data: "BaseUnit" },
                ]
            });

            //if ($('#tblinputstckgrd').DataTable().visible == true) {
            //    $('#tblinputstckgrd').DataTable().visible == false;
            //}

            var table = $('#tbloutputgrd').DataTable();
            $("#tbloutputgrd tr").click(function () {
                var selected = $(this).hasClass("selected");
                $("#tbloutputgrd tr").removeClass("selected");
                if (!selected)
                    $(this).addClass("selected");
            });

            $('#myModal1').modal('show');
            Totwgt();
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });


}

function fnLoadOutGrid(Oarraylist) {
    $('#tbloutputgrd').DataTable().destroy();

    $('#tbloutputgrd').DataTable({
        data: Oarraylist,
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
            { title: "CuttingOrderDetId", data: "CuttingOrdDetId", "visible": false },
            { title: "ProdPrgId", data: "ProdPrgId", "visible": false },
            { title: "ColorId", data: "ColorId", "visible": false },
            { title: "SizeId", data: "SizeId", "visible": false },
            { title: "ItemId", data: "ItemId", "visible": false },
            { title: "Item", data: "Item" },
            { title: "Color", data: "Color" },
            { title: "Size", data: "Size" },
            {
                title: "Gms/Pcs", data: "Grammage", "visible": false ,
                render: function (data) {
                    //return '<select id="ddlprocecolor" class="form-control" style="width: 100px;"/></select>';
                    return '<input type="text" id="txtgrammage" class="form-control"  style="width: 50px;text-align: center;" value=' + data + ' >';
                }
            },
            { title: "Weight", data: "weight", "visible": false },
            { title: "Prog.Qty", data: "ProdprgQty" },
            { title: "Bal.Qty", data: "BalQty" },
               { title: "AppRate", data: "apprate", "visible": false },
            {
                title: "Rate", data: "rate",
                render: function (data) {
                    //return '<select id="ddlprocecolor" class="form-control" style="width: 100px;"/></select>';
                    return '<input type="text" id="txtrate" class="txtrate form-control"  style="width: 50px;text-align: center;" value=' + data + ' >';
                }
            },
            {
                title: "Order Qty", data: "ordqty",
                render: function (data) {
                    return '<input type="text" id="txtoutordqty" class="form-control txtoutordqty"  style="width: 50px;text-align: center;" value=' + data + ' >';
                },
            },
            { title: "UOM", data: "BaseUnit" },
        ]
    });
    Totwgt();
}

function ClearTextbox() {
    $('#ddlcutCompany').val(0);
    //$('#ddlcutunit').val(0);
    Prodprgid = 0;
}

function LoadCuttingOrder(companyid, companyunitid) {
    debugger;


    var OType = $('input[name="wrkord"]:checked').attr('value');


    var styid = $('select#ddlinnerstyle option:selected').val();
    if (styid == null || styid == "0") {
        styid = 0;
    }

    var buyerid = $('#ddlinnerBuyer option:selected').val();
    if (buyerid == undefined || buyerid == "0") {
        buyerid = 0;
    }

    var Process = $('#ddlinnerProcess option:selected').val();
    if (Process == undefined || Process == "0") {
        Process = 0;
    }

    var ordNo = "";
    var ONo = $('select#ddlinnerOrderNo option:selected').val();

    if (ONo == 0 || ONo == undefined) {
        ordNo == "";
    }
    else {

        ordNo = $('select#ddlinnerOrderNo option:selected').text();
    }


    var RfNo = "";
    var Rn = $('select#ddlinnerrefno option:selected').val();

    if (Rn == 0 || Rn == undefined) {
        RfNo == "";
    }
    else {

        RfNo = $('select#ddlinnerrefno option:selected').text();
    }

    var inCompId = $('#ddlinnercompany').val();
    if (inCompId == null || inCompId == "0") {
        inCompId = 0;
    }



    $.ajax({
        type: "POST",
        url: '/BitCuttingOrder/ListCuttingOrder/',
        data: JSON.stringify({ CompanyId: inCompId, CompanyUnitId: companyunitid, OrderType: OType, RefNo: RfNo, StyleId: styid, OrderNo: ordNo, Buyerid: buyerid,Processid:Process }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            //$('#tblcuttingord1').DataTable().destroy();
            cuttinglist = json.Value;
            if (cuttinglist.length > 0) {

                Processid = cuttinglist[0].ProcessId;
                LoadProcessDetails(Processid);
            }
            //var tableload = json.Value
            //var dataSet = eval("[" + tableload + "]");

            $('#tblcuttingord1').DataTable({
                data: cuttinglist,
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
                         { title: "ID", data: "BuyOrdMasId", "visible": false },
                         { title: "ProdPrgId", data: "ProdPrgId", "visible": false },
                         { title: "Order No", data: "OrderNo" },
                         { title: "Ref No", data: "RefNo" },
                         { title: "Process", data: "Process" },
                         { title: "Work Order", data: "WorkOrder" },
                         { title: "Prod Prg No", data: "ProdPrgNo" },
                         { title: "Style", data: "Style" },
                         { title: "Qty", data: "Qty" },
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

function Delete(ID) {
    debugger;
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        LoadingSymb();
        DTmode = 1;
        getbyID(ID);
        $.ajax({
            url: "/BitCuttingOrder/Delete/" + ID,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                AddUserEntryLog('Production', 'Cutting Order', 'DELETE', $("#txtcutheaderordno").val());
                //alert("Record deleted successfully...");
                var msg = 'Record deleted successfully...';
                var flg = 2;
                var mod = 1;
                AlartMessage(msg, flg, mod);
                $('#tblcuttingmaingrid').DataTable().destroy();
                LoadData(companyid, fromdate, todate);
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

function LoadData() {
    debugger;

    var OrdNo = "";
    var ONo = $('select#ddlcutOrderNo option:selected').val();

    if (ONo == 0) {
        OrdNo == "";
    }
    else {

        OrdNo = $('select#ddlcutOrderNo option:selected').text();
    }

    var jordNo = "";
    var JONo = $('select#ddlprounit option:selected').val();

    if (JONo == 0 || JONo == undefined) {
        jordNo == "";
    }
    else {

        jordNo = $('select#ddlprounit option:selected').val();
    }

    var RecNo = "";
    var RNo = $('select#ddlcutRefNo option:selected').val();

    if (RNo == 0 || ONo == undefined) {
        RecNo == "";
    }
    else {

        RecNo = $('select#ddlcutRefNo option:selected').text();
    }
    var DCNo = "";
    var DNo = $('select#ddlcuttingord option:selected').val();

    if (DNo == 0 || ONo == undefined) {
        DCNo == "";
    }
    else {

        DCNo = $('select#ddlcuttingord option:selected').val();
    }



    var CompId = $('#ddlcutCompany').val();

    if (CompId == null) {
        CompId = DCompid;
    } else {
        CompId = $('#ddlcutCompany').val();
    }

    //var CompId = $('#ddlcutCompany').val();
    //if (CompId == null || CompId == "0") {
    //    CompId = 0;
    //}

    var Unit = $('#ddlcutunit').val();
    if (Unit == null || Unit == "0") {
        Unit = 0;
    }
    var prid = 0;
    var emp = $('#ddlproincharge').val();
    if (emp == null || emp == "") {
        emp = 0;
    }
    var buyer = $('#ddlproBuyer').val();
    if (buyer == null || buyer == "0") {
        buyer = 0;
    }

    var Process = $('#ddlProcess').val();
    if (Process == null || Process == "0") {
        Process = 0;
    }

    var supptype = $('input[name="outinternal"]:checked').attr('value');
    var ordtype = $('input[name="optwrkord"]:checked').attr('value');
    var mas = 0;
    var prid = 0;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    var chkwork = $('#optoutint').prop('checked');
    var chkProces = $('#optoutext').prop('checked');
    if (chkwork) {
        var suppid = $('#ddlcutType').val();
        if (suppid == null || suppid == "0") {
            suppid = 0;
        }
    }
    else if (chkProces) {
        var suppid = $('#ddlMprocessor').val();
        if (suppid == null || suppid == "0") {
            suppid = 0;
        }
    }
    var menufilter = CompId + ',' + Unit + ',' + buyer + ',' + mas + ',' + emp + ',' + RecNo + ',' + OrdNo + ',' + supptype + ',' + ordtype + ',' + DCNo + ',' + jordNo + ',' + FDate + ',' + TDate + ',' + suppid + ',' + Process;
    localStorage.setItem('PanelProcessMainFilter', menufilter);
    //$('#tblcuttingmaingrid').DataTable().destroy();
    $.ajax({
        type: "POST",
        url: '/BitCuttingOrder/GetMaindt/',
        //data: JSON.stringify({ CompanyId: companyid, CompanyUnitId: companyunitid }),
        data: JSON.stringify({ compid: CompId, unitid: Unit, buyerid: buyer, masid: mas, empid: emp, refno: RecNo, orderno: OrdNo, supptype: supptype, ordtype: ordtype, cuttingordno: DCNo, jobordno: jordNo, Fromdate: FDate, Todate: TDate, supplierid: suppid,Processid:Process }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            maintbllist = json;
            LoadMaintab(maintbllist);

            //$('#ddlproincharge').empty();
            //$('#ddlcutOrderNo').empty();
            //$('#ddlcutCompany').empty();
           // $('#ddlcuttingord').empty();
            //$('#ddlcutRefNo').empty();
            //$('#ddlprounit').empty();
            //if (json.length > 0) {

            //    var data = json;

            //    var compdet = {};
            //    var comp = [];
            //    var empdet = {};
            //    var emp = [];
            //    var orddet = {};
            //    var ord = [];
                //var wrkdet = {};
                //var wrk = [];
                //$.each(maintbllist, function (i, el) {

                    //if (!compdet[el.CompanyId]) {
                    //    compdet[el.CompanyId] = true;
                    //    comp.push(el);
                    //}

                    //if (!empdet[el.EmployeeId]) {
                    //    empdet[el.EmployeeId] = true;
                    //    emp.push(el);
                    //}


                    //if (!orddet[el.BuyOrdMasId]) {
                    //    orddet[el.BuyOrdMasId] = true;
                    //    ord.push(el);
                    //}

                    //if (!wrkdet[el.WorkOrder]) {
                    //    wrkdet[el.WorkOrder] = true;
                    //    wrk.push(el);
                    //}
                //});

            //    $(ddlproincharge).append($('<option/>').val('0').text('--Select Employee--'));
            //    $.each(emp, function () {
            //        $(ddlproincharge).append($('<option></option>').val(this.EmployeeId).text(this.Incharger));
            //    });

            //    $(ddlcutOrderNo).append($('<option/>').val('0').text('--Select OrderNo--'));
            //    $.each(ord, function () {
            //        $(ddlcutOrderNo).append($('<option></option>').val(this.BuyOrdMasId).text(this.OrderNo));
            //    });

            //    $(ddlcutCompany).append($('<option/>').val('0').text('--Select Company--'));
            //    $.each(comp, function () {
            //        $(ddlcutCompany).append($('<option></option>').val(this.CompanyId).text(this.company));
            //    });


            //    $(ddlcuttingord).append($('<option/>').val('0').text('--Select CuttingOrdNo--'));
            //    $.each(data, function () {
            //        $(ddlcuttingord).append($('<option></option>').text(this.CuttingOrdNo));
            //    });

            //    $(ddlcutRefNo).append($('<option/>').val('0').text('--Select RefNo--'));
            //    $.each(ord, function () {
            //        $(ddlcutRefNo).append($('<option></option>').text(this.RefNo));
            //    });

                //$(ddlprounit).append($('<option/>').val('0').text('--Select WorkOrdNo--'));
                //$.each(wrk, function () {
                //    $(ddlprounit).append($('<option></option>').text(this.WorkOrder));
                //});
            //    //$(ddlproBuyer).append($('<option/>').val('0').text('--Select Buyer--'));
            //    //$.each(data, function () {
            //    //    $(ddlproBuyer).append($('<option></option>').val(this.BuyerId));
            //    //});
            //}

            //$('#ddlproincharge').empty();
            //$('#ddlcutOrderNo').empty();
            //$('#ddlcutRefNo').empty();
            //$('#ddlcuttingord').empty();
            //$('#ddlcutRefNo').empty();
            //$('#ddlprounit').empty();
            //if (json.length > 0) {

            //    var data = json;

            //        var compdet = {};
            //        var comp = [];
            //        var empdet = {};
            //        var emp = [];
            //        $.each(maintbllist, function (i, el) {

            //            if (!compdet[el.CompanyId]) {
            //                compdet[el.CompanyId] = true;
            //                comp.push(el);
            //            }

            //            if (!empdet[el.EmployeeId]) {
            //                empdet[el.EmployeeId] = true;
            //                emp.push(el);
            //            }
            //        });






            //        $(ddlproincharge).append($('<option/>').val('0').text('--Select Employee--'));
            //        $.each(emp, function () {
            //            $(ddlproincharge).append($('<option></option>').val(this.EmployeeId).text(this.Incharger));
            //        });

            //        $(ddlcutOrderNo).append($('<option/>').val('0').text('--Select OrderNo--'));
            //        $.each(data, function () {
            //            $(ddlcutOrderNo).append($('<option></option>').val(this.BuyOrdMasId).text(this.OrderNo));
            //        }); 

            //        $(ddlcutRefNo).append($('<option/>').val('0').text('--Select Ref No--'));
            //        $.each(comp, function () {
            //            $(ddlcutRefNo).append($('<option></option>').val(this.BuyOrdMasId).text(this.RefNo));
            //        });

            //        $(ddlcuttingord).append($('<option/>').val('0').text('--Select CuttingOrdNo--'));
            //        $.each(data, function () {
            //            $(ddlcuttingord).append($('<option></option>').text(this.CuttingOrdNo));
            //        });

            //    //    $(ddlcutRefNo).append($('<option/>').val('0').text('--Select RefNo--'));
            //    //    $.each(data, function () {
            //    //        $(ddlcutRefNo).append($('<option></option>').text(this.RefNo));
            //    //    });

            //    $(ddlprounit).append($('<option/>').val('0').text('--Select WorkOrdNo--'));
            //    $.each(data, function () {
            //        $(ddlprounit).append($('<option></option>').text(this.WorkOrder));
            //    });

            //} else {
            //    $(ddlcuttingord).append($('<option/>').val('0').text('--Select CuttingOrdNo--'));
            //    $(ddlprounit).append($('<option/>').val('0').text('--Select WorkOrdNo--'));
            //    $(ddlcutOrderNo).append($('<option/>').val('0').text('--Select OrdNo--'));
            //    $(ddlcutRefNo).append($('<option/>').val('0').text('--Select RefNo--'));
            //    $(ddlproincharge).append($('<option/>').val('0').text('--Select Incharge--'));
            //}


        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}


function LoadDataFromBack() {
    debugger;
    var fill = localStorage.getItem('PanelProcessMainFilter');
    var fillobj = [];
    fillobj = fill.split(",");

    $('#txtFromDate').val(fillobj[11]);
    $('#txtToDate').val(fillobj[12]);

    if (fillobj[7] == 'I') {
        $('#optoutint').prop('checked', true);
    } else {
        $('#optoutext').prop('checked', true);
    }

    if (fillobj[8] == 'W') {
        $('#optoutwrkord').prop('checked', true);
    } else {
        $('#optoutsamord').prop('checked', true);
    }


    if (fillobj[5] == "undefined") {
        fillobj[5] = '';
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
    if (fillobj[13] == "undefined") {
        fillobj[13] = 0;
    }
    if (fillobj[14] == "undefined") {
        fillobj[14] = 0;
    }
   
    $.ajax({
        type: "POST",
        url: '/BitCuttingOrder/GetMaindt/',
        //data: JSON.stringify({ CompanyId: companyid, CompanyUnitId: companyunitid }),
        data: JSON.stringify({ compid: fillobj[0], unitid: fillobj[1], buyerid: fillobj[2], masid: fillobj[3], empid: fillobj[4], refno: fillobj[5], orderno: fillobj[6], supptype: fillobj[7], ordtype: fillobj[8], cuttingordno: fillobj[9], jobordno: fillobj[10], Fromdate: fillobj[11], Todate: fillobj[12], supplierid: fillobj[13], Processid: fillobj[14] }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            maintbllist = json;
            LoadMaintab(maintbllist);

            


        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}

function ddlmain() {
    debugger;

    var ordNo = "";
    var ONo = $('select#ddlcutOrderNo option:selected').val();

    if (ONo == 0 || ONo == undefined) {
        ordNo == "";
    }
    else {

        ordNo = $('select#ddlcutOrderNo option:selected').val();
    }

    var jordNo = "";
    var JONo = $('select#ddlprounit option:selected').val();

    if (JONo == 0 || JONo == undefined) {
        jordNo == "";
    }
    else {

        jordNo = $('select#ddlprounit option:selected').val();
    }

    var RecNo = "";
    var RNo = $('select#ddlcutRefNo option:selected').val();

    if (RNo == 0 || ONo == undefined) {
        RecNo == "";
    }
    else {

        RecNo = $('select#ddlcutRefNo option:selected').text();
    }
    var DCNo = "";
    var DNo = $('select#ddlcuttingord option:selected').val();

    if (DNo == 0 || ONo == undefined) {
        DCNo == "";
    }
    else {

        DCNo = $('select#ddlcuttingord option:selected').val();
    }

    //var CompId = $('#ddlcutCompany').val();
    //if (CompId == null || CompId == "0") {
    //    CompId = 0;
    //}
    var CompId = $('#ddlcutCompany').val();

    if (CompId == null) {
        CompId = DCompid;
    } else {
        CompId = $('#ddlcutCompany').val();
    }

    var Unit = $('#ddlcutunit').val();
    if (Unit == null || Unit == "0") {
        Unit = 0;
    }
    var prid = 0;
    var emp = $('#ddlproincharge').val();
    if (emp == null || emp == "") {
        emp = 0;
    }
    var buyer = $('#ddlproBuyer').val();
    if (buyer == null || buyer == "0") {
        buyer = 0;
    }

    var Process = $('#ddlproBuyer').val();
    if (Process == null || Process == "0") {
        Process = 0;
    }

    var supptype = $('input[name="outinternal"]:checked').attr('value');
    var ordtype = $('input[name="optwrkord"]:checked').attr('value');
    var mas = 0;
    var prid = 0;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    
    var suppid = $('#ddlcutType').val();
    if (suppid == null || suppid == "0") {
        suppid = 0;
    }

    if (ChkComp || DtChk) {
        ordNo == "";
        RecNo == "";
        jordNo == "";
        DCNo == "";
        Unit = 0;
        emp = 0;
        buyer = 0;
        suppid = 0;
        Process = 0;
    }


    //$('#tblcuttingmaingrid').DataTable().destroy();
    $.ajax({
        type: "POST",
        url: '/BitCuttingOrder/GetMaindt/',
        //data: JSON.stringify({ CompanyId: companyid, CompanyUnitId: companyunitid }),
        data: JSON.stringify({ compid: CompId, unitid: Unit, buyerid: buyer, masid: mas, empid: emp, refno: RecNo, orderno: ordNo, supptype: supptype, ordtype: ordtype, cuttingordno: DCNo, jobordno: jordNo, Fromdate: FDate, Todate: TDate, supplierid: suppid, Processid: Process }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            maintbllist = json;


          
          
           // $('#ddlcutCompany').empty();
           
           
            // if (json.length > 0) {

            var data = json;

            var buyerdet = {};
            var buyer = [];
            var empdet = {};
            var emp = [];
            var orddet = {};
            var ord = [];
            var wrkdet = {};
            var wrk = [];
            var Refdet = {};
            var Ref = [];
            var empdet = {};
            var emp = [];
            var supdet = {};
            var sup = [];


            $.each(maintbllist, function (i, el) {

                if (!buyerdet[el.BuyerId]) {
                    buyerdet[el.BuyerId] = true;
                    buyer.push(el);
                }

                if (!empdet[el.EmployeeId]) {
                    empdet[el.EmployeeId] = true;
                    emp.push(el);
                }

                if (!orddet[el.BuyOrdMasId]) {
                    orddet[el.BuyOrdMasId] = true;
                    ord.push(el);
                }

                if (!wrkdet[el.WorkOrder]) {
                    wrkdet[el.WorkOrder] = true;
                    wrk.push(el);
                }

                if (!Refdet[el.RefNo]) {
                    Refdet[el.RefNo] = true;
                    Ref.push(el);
                }

                if (!empdet[el.InchargerId]) {
                    empdet[el.InchargerId] = true;
                    emp.push(el);
                }
                if (!supdet[el.SupplierId]) {
                    supdet[el.SupplierId] = true;
                    sup.push(el);
                }
            });


            if (ChkIncharge || ChkComp || DtChk) {
                $('#ddlproincharge').empty();
                $(ddlproincharge).append($('<option/>').val('0').text('--Select Employee--'));
                $.each(emp, function () {
                    $(ddlproincharge).append($('<option></option>').val(this.InchargerId).text(this.Incharger));
                });
            }

            if (ChkOrdno || ChkComp || DtChk) {
                $('#ddlcutOrderNo').empty();
                $(ddlcutOrderNo).append($('<option/>').val('0').text('--Select OrderNo--'));
                $.each(ord, function () {
                    $(ddlcutOrderNo).append($('<option></option>').val(this.BuyOrdMasId).text(this.OrderNo));
                });
            }
            if (ChkCord || ChkComp || DtChk) {
                $('#ddlcuttingord').empty();
                $(ddlcuttingord).append($('<option/>').val('0').text('--Select CuttingOrdNo--'));
                $.each(data, function () {
                    $(ddlcuttingord).append($('<option></option>').text(this.CuttingOrdNo));
                });
            }
            if (ChkRefno || ChkComp || DtChk) {
                $('#ddlcutRefNo').empty();

                $(ddlcutRefNo).append($('<option/>').val('0').text('--Select RefNo--'));
                $.each(ord, function () {
                    $(ddlcutRefNo).append($('<option></option>').text(this.RefNo));
                });
            }
            if (ChkJOrdno || ChkComp || DtChk) {
                $('#ddlprounit').empty();
                $(ddlprounit).append($('<option/>').val('0').text('--Select WorkOrdNo--'));
                $.each(wrk, function () {
                    $(ddlprounit).append($('<option></option>').text(this.WorkOrder));
                });
            }
            if (ChkBuyer || ChkComp || DtChk) {
                $('#ddlproBuyer').empty();
                $(ddlproBuyer).append($('<option/>').val('0').text('--Select Buyer--'));
                $.each(buyer, function () {
                    $(ddlproBuyer).append($('<option></option>').val(this.BuyerId).text(this.Buyer));
                });
            }
            if (ChkSupplier || ChkComp || DtChk) {
                var supptype = $('input[name="outinternal"]:checked').attr('value');
                if (supptype == 'E') {

                    $('#ddlMprocessor').empty();
                    $(ddlMprocessor).append($('<option/>').val('0').text('--Select Supplier--'));
                    $.each(sup, function () {
                        $(ddlMprocessor).append($('<option></option>').val(this.SupplierId).text(this.WorkDivision));
                    });
                }
                if (supptype == 'I') {

                    $('#ddlcutType').empty();
                    $(ddlcutType).append($('<option/>').val('0').text('--Select WorkDiv--'));
                    $.each(sup, function () {
                        $(ddlcutType).append($('<option></option>').val(this.SupplierId).text(this.WorkDivision));
                    });
                }
            }
           //  }
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}

function LoadMaintab(maintbllist) {
    //$('#tblcuttingmaingrid').DataTable().destroy();
    $('#tblcuttingmaingrid').DataTable({
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
                    { title: "ID", data: "CuttingOrdId", "visible": false },
                    { title: "Order No", data: "OrderNo", "visible": false },
                     { title: "Process", data: "Process" },
                    { title: "Ref No", data: "RefNo" },
                    { title: "Cut Ord No", data: "CuttingOrdNo" },
                    {
                        title: "Cut Ord Date", data: "CuttingOrdDate",
                        render: function (data) {
                            return (moment(data).format("DD/MM/YYYY"));
                        }
                    },
                    { title: "Work Division", data: "WorkDivision" },
                    { title: "Incharge", data: "Incharger" },
                    {
                        title: "ACTION", "mDataProp": null,
                        "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" ' + PanelProcessIssueEditFlg + ' class="btnmaingrdedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button><button type="button" type="button" data-toggle="tooltip" data-placement="top" title="Delete" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" ' + PanelProcessIssueDeleteFlg + ' class="btnmaingrddelete btn btn-danger btn-round" onClick=""> <i class="fa fa-times"></i> </button><button type="button"  ' + PanelProcessIssuePrintFlg + ' class="CuttOrdPrint btn btn_round btn-success"  data-toggle="tooltip" data-placement="top" title="print" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;" >  <i class="fa fa-print"></i> </button>'
                    }
        ]
    });

}

function CMainlist() {
    $('#tblcuttingmaingrid').DataTable().destroy();
    ChkRefno = true;
    ChkOrdno = true;
    ChkJOrdno = true;
    DtChk = false;
    ChkSupplier = true;
    ChkBuyer = true;
    ChkUnit = true;
    ChkIncharge = true;
    ChkCord = true;
    ChkComp = false;
    ddlmain();
    LoadData();
    ChangeMaininorext();
}

function BMainlist() {
    $('#tblcuttingmaingrid').DataTable().destroy();
    ChkRefno = true;
    ChkOrdno = true;
    ChkJOrdno = true;
    DtChk = false;
    ChkSupplier = true;
    ChkBuyer = false;
    ChkUnit = true;
    ChkIncharge = true;
    ChkCord = true;
    ChkComp = false;
    LoadData();
    ddlmain();

}

function JMainlist() {
    $('#tblcuttingmaingrid').DataTable().destroy();
    ChkRefno = false;
    ChkOrdno = false;
    ChkJOrdno = false;
    DtChk = false;
    ChkSupplier = false;
    ChkBuyer = false;
    ChkUnit = false;
    ChkIncharge = true;
    ChkCord = true;
    ChkComp = false;
    LoadData();
    ddlmain();
}

function OMainlist() {
    ChkRefno = false;
    ChkOrdno = false;
    ChkJOrdno = true;
    DtChk = false;
    ChkSupplier = false;
    ChkBuyer = false;
    ChkUnit = false;
    ChkIncharge = true;
    ChkCord = true;
    ChkComp = false;
    $('#tblcuttingmaingrid').DataTable().destroy();
    LoadData();
    ddlmain();
}

function RMainlist() {
    ChkRefno = false;
    ChkOrdno = false;
    ChkJOrdno = true;
    DtChk = false;
    ChkSupplier = false;
    ChkBuyer = false;
    ChkUnit = false;
    ChkIncharge = true;
    ChkCord = true;
    ChkComp = false;
    $('#tblcuttingmaingrid').DataTable().destroy();
    LoadData();
    ddlmain();
}

function SPMainlist() {
    ChkRefno = true;
    ChkOrdno = true;
    ChkJOrdno = true;
    DtChk = false;
    ChkSupplier = false;
    ChkBuyer = false;
    ChkUnit = false;
    ChkIncharge = true;
    ChkCord = true;
    ChkComp = false;
    $('#tblcuttingmaingrid').DataTable().destroy();
    LoadData();
    ddlmain();
}

function UMainlist() {
    $('#tblcuttingmaingrid').DataTable().destroy();
    LoadData();
    ChkRefno = true;
    ChkOrdno = true;
    ChkJOrdno = true;
    DtChk = false;
    ChkSupplier = false;
    ChkBuyer = false;
    ChkUnit = false;
    ChkIncharge = true;
    ChkCord = true;
    ChkComp = false;
    ddlmain();
}

function OMainlist() {
    ChkRefno = false;
    ChkOrdno = false;
    ChkJOrdno = true;
    DtChk = false;
    ChkSupplier = false;
    ChkBuyer = false;
    ChkUnit = false;
    ChkIncharge = true;
    ChkCord = true;
    ChkComp = false;
    $('#tblcuttingmaingrid').DataTable().destroy();
    LoadData();
    ddlmain();
}

//function RMainlist() {
//    ChkRefno = false;
//    ChkOrdno = false;
//    ChkJOrdno = true;
//    DtChk = false;
//    ChkSupplier = false;
//    ChkBuyer = false;
//    ChkUnit = false;
//    ChkIncharge = true;
//    ChkCord = true;
//    ChkComp = false;
//    $('#tblcuttingmaingrid').DataTable().destroy();
//    LoadData();
//    ChangeMaininorext();
//}
function SPMainlist() {
    $('#tblcuttingmaingrid').DataTable().destroy();
    ChkRefno = true;
    ChkOrdno = true;
    ChkJOrdno = true;
    DtChk = false;
    ChkSupplier = false;
    ChkBuyer = true;
    ChkUnit = false;
    ChkIncharge = true;
    ChkCord = true;
    ChkComp = false;

    LoadData();
    ddlmain();
}

function IMainlist() {
    $('#tblcuttingmaingrid').DataTable().destroy();
    ChkRefno = true;
    ChkOrdno = true;
    ChkJOrdno = true;
    DtChk = false;
    ChkSupplier = false;
    ChkBuyer = true;
    ChkUnit = false;
    ChkIncharge = true;
    ChkCord = true;
    ChkComp = false;
    LoadData();
    ddlmain();
}

function COMainlist() {
    $('#tblcuttingmaingrid').DataTable().destroy();
    ChkRefno = false;
    ChkOrdno = false;
    ChkJOrdno = false;
    DtChk = false;
    ChkSupplier = false;
    ChkBuyer = true;
    ChkUnit = false;
    ChkIncharge = false;
    ChkCord = false;
    ChkComp = false;
    LoadData();
    ddlmain(); 
}

$(document).on('click', '.CuttOrdPrint', function () {
    debugger;
    var compid = $('#ddlcutCompany').val();
    var table = $('#tblcuttingmaingrid').DataTable();
    var CuttingOrdId = table.row($(this).parents('tr')).data()["CuttingOrdId"];
    window.open("../ReportInline/Production/CuttingOrderReportInline/CuttingOrdReportInline.aspx?CuttingOrdId=" + CuttingOrdId + "&Companyid=" + compid + "&type=" + 'P');
});

function Close() {


    window.location.href = "/BitCuttingOrder/BitCuttingOrderIndex";


}

function LoadEmployeeStoreunit() {
    debugger;
    if (UserName == 'superuser') {
        LoginUserid = 0;
    }

    $.ajax({
        url: "/StoreSetup/GetStoreRights",
        data: JSON.stringify({ Userid: LoginUserid, Storetype: 'M', Companyid: companyid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var data = result.Value;
            $(ddlissuestore).empty();
            $(ddlissuestore).append($('<option/>').val('0').text('--Select Store--'));
            $.each(data, function () {
                $(ddlissuestore).append($('<option></option>').val(this.Storeid).text(this.StoreName));
            });
            $(ddlissuestore).trigger("select2:updated");
            if (editmasunitstore > 0) {
                $('#ddlissuestore').val(editmasunitstore).trigger('change');
            }
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });



}

function Totwgt() {

    var totwgt = 0;
    var totqty = 0;

    $.each(Ilist, function () {
        var wgt = parseFloat(this.issqty);
        totwgt = totwgt + wgt;
    });

    $.each(Olist, function () {
        var qty = parseFloat(this.ordqty);
        totqty = totqty + qty;
    });

    $('#txttotwgt').val(parseFloat(totwgt).toFixed(3));
    $('#txttotqty').val(parseFloat(totqty).toFixed(3));
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


function CheckAlloted() {

    var Recpno = $('#txtcutheaderordno').val();

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
                    AlartMessage(msg, flg, mod);
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

function CheckPlanAmend(wrkordno) {

    $.ajax({
        url: "/PlanningConsumption/LoadAmendDetails",
        data: JSON.stringify({ Stylerowid: 0, jmasid: '', Workordno: wrkordno }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var amendlist = []
            amendlist = result;
            if (amendlist.length > 0) {
                for (var x = 0; x < amendlist.length; x++) {
                    //alert("Planning amended for " + amendlist[x].Order_No + '-' + amendlist[x].Style + ",Please Check it....")
                    var msg = "Planning amended for " + amendlist[x].Order_No + '-' + amendlist[x].Style + ",Please Check it...";
                    var flg = 4;
                    var mod = 1;
                    AlartMessage(msg, flg, mod);
                    $("#btnAdd").attr("disabled", true);
                    return true;
                }
            } else {
                $("#btnAdd").attr("disabled", false);
            }

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

