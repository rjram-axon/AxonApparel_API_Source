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
var CuttingOrderEditFlg = "disabled";
var CuttingOrderDeleteFlg = "disabled";
var CuttingOrderPrintFlg = "disabled";
var ValidateCuttingTolerance = 0;
var CostBudCutAppid = '';
var retchk = '';
var AllowList = [];
var pallown = 0;
var Processid = 0;
var DTmode = 0;
var ValiCutBudAppSam = 0;
var OrderType = '';

var InputItemsgrdList = [];
var Maintype = "Issue";
var IsReceipt = false;
var IsDeleteReceipt = false;

var MainList = [];

var editmasunitstore = 0;
var editsubmasunitstore = 0;
var editsubstore = 0;
var prodprgid_Edit = 0;
var FabDelyIssueNo_Edit = 0;
var ValidateProductionStore = "False";

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
    ValidateCuttingTolerance = $("#hdnValidateCuttingTolerance").data('value');
    CostBudCutAppid = $("#hdnCostBudCutAppid").data('value');

    ValidateProductionStore = $("#hdnValidateProductionStore").data('value');

    LoadRefNoDDL("#ddlinnerrefno");
    LoadEmployeeDDL("#ddlheaderincharge");
    LoadStyleDDL("#ddlinnerstyle,#ddlheaderstyle");
    LoadOrderNoDDL("#ddlinnerOrderNo,#ddlheaderordno");
    LoadStoreUnitDDL("#ddlissuestore");
    LoadSupplierDDL("#ddlprocessor");
    LoadWorkdivisionDDL("#ddlinnerWorkdivision");

    LoadUserCompanyDDL();
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

    fromdate = $("#txtFromDate").val();
    todate = $("#txtToDate").val();

    $("#txtcutheaderdate").val(output);
    $("#txtheaderdeldate").val(output);

    ChangeMaininorext();
    LoadIssueMain();

    //Load Radio Button of MSType
    if (Mode == 0) {
        //LoadCompanyDDL("#ddlMSCompany,#ddlSCompany");
        LoadStoreUnitDDL("#ddlMSMMainStore");
        //LoadStoreSectionDDL("#ddlSecStore");
        //LoadCompanyUnitDDL("#ddlPUnit");
        LoadWorkdivisionDDL("#ddlWK");
    }
    var MSType = $('input[name="MSType"]:checked').attr('value');

    if (MSType == "M") {
        $("#SubStoreId").hide();
        $("#SecStoId").hide();
    } else if (MSType == "E") {
        $("#SubStoreId").hide();
        $("#SecStoId").show();
        $("#MainStoreId").hide();
    }

    debugger;
    //  LoadData(companyid, fromdate, todate);
    $(document).on('keyup', '.txtrate', function (e) {
        debugger;
        var table = $('#tbloutputgrd').DataTable();
        var sno = table.row($(this).parents('tr')).data()["ProdPrgId"];
        var rate = table.row($(this).parents('tr')).data()["apprate"];
        var Val = $(this).val();

        if (ValiCutBudApp == 'Y' && OrderType == "W") {
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
                var ur = "";
                AlartMessage(msg, flg, mod, ur);
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
                var ur = "";
                AlartMessage(msg, flg, mod, ur);
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


    $(document).on('change', '.txtallqty', function (e) {
        debugger;

        //var charCode = (e.which) ? e.which : event.keyCode

        //if (String.fromCharCode(charCode).match(/[^0-9]/g))

        //    return false;

        rowindex = $(this).closest('tr').index();

        ItemStocktmplist.sort(function (a, b) {
            return a.Stockid - b.Stockid;
        });

        var currentrowoftcpi = ItemStocktmplist.slice(rowindex);
        var pid = currentrowoftcpi[0].Stockid;
        var itmid = currentrowoftcpi[0].ItemId;
        var colorid = currentrowoftcpi[0].ColorId;
        var sizeid = currentrowoftcpi[0].SizeId;
        // var uomid = currentrowoftcpi[0].OUomid;
        var balq = currentrowoftcpi[0].StockQty;
        var value = $(this).val();

        $.each(ItemStocktmplist, function () {
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
        var totexceed = false;

        for (var e = 0; e < ItemStocktmplist.length; e++) {
            var amount = ItemStocktmplist[e].AllotedQty;
            if (ItemStocktmplist[e].ItemId == itmid && ItemStocktmplist[e].ColorId == colorid && ItemStocktmplist[e].SizeId == sizeid) {
                totalamnt = totalamnt + parseFloat(amount);
            }
        }

        $.each(Ilist, function () {
            if (this.ItemId == itmid && this.SizeId == sizeid && this.ColorId == colorid) {
                //this.quantity = 0;
                if (this.BalQty > totalamnt) {
                    this.issqty = totalamnt;//this.BalQty;
                }
                else {
                    this.issqty = this.BalQty;
                    totexceed = true;
                }
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
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
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

        LoadInGrid(Ilist);
    });

    $(document).on('change', '.txtreceivedqty', function () {
        debugger;

        var table = $('#tblinputstckgrd').DataTable();
        var Stockid = table.row($(this).parents('tr')).data()["Stockid"];
        var ItemId = table.row($(this).parents('tr')).data()["ItemId"];
        var ColorId = table.row($(this).parents('tr')).data()["ColorId"];
        var SizeId = table.row($(this).parents('tr')).data()["SizeId"];
        var StockQty = table.row($(this).parents('tr')).data()["StockQty"];
        var AllotedQty = table.row($(this).parents('tr')).data()["AllotedQty"];
        var ReturnQty = table.row($(this).parents('tr')).data()["ReturnQty"];

        var Val = $(this).val();

        var totallot = parseFloat(ReturnQty) + parseFloat(Val);
        
        if (StockQty < totallot) {
            Val = 0
        } 

        for (var d = 0; d < ItemStockorg.length; d++) {
            if (ItemStockorg[d].Stockid == Stockid) {
                ItemStockorg[d].receivedqty = Val;
            }
        }

        var totrece = 0;
        for (var d = 0; d < ItemStockorg.length; d++) {
            if (ItemStockorg[d].ItemId == ItemId && ItemStockorg[d].ColorId == ColorId && ItemStockorg[d].SizeId == SizeId) {
                totrece = totrece + parseFloat(ItemStockorg[d].receivedqty);
            }
        }

       
            for (var t = 0; t < Ilist.length; t++) {
                if (Ilist[t].ItemId == ItemId && Ilist[t].ColorId == ColorId && Ilist[t].SizeId == SizeId) {
                    var acc = parseFloat(Ilist[t].issqty) - parseFloat(Ilist[t].ReturnQty);

                    if (acc < totrece) {
                        Val = 0;
                    } 

                }
            }


            for (var d = 0; d < ItemStockorg.length; d++) {
                if (ItemStockorg[d].Stockid == Stockid) {
                    ItemStockorg[d].receivedqty = Val;
                }
            }


            var totrece = 0;
            for (var d = 0; d < ItemStockorg.length; d++) {
                if (ItemStockorg[d].ItemId == ItemId && ItemStockorg[d].ColorId == ColorId && ItemStockorg[d].SizeId == SizeId) {
                    totrece = totrece + parseFloat(ItemStockorg[d].receivedqty) ;
                }
            }


            for (var t = 0; t < Ilist.length; t++) {
                if (Ilist[t].ItemId == ItemId && Ilist[t].ColorId == ColorId && Ilist[t].SizeId == SizeId) {
                   
                    Ilist[t].receivedqty = totrece;
                }
            }


            var tmplist = [];

            tmplist = $.grep(ItemStockorg, function (element, index) {
                return (element.ItemId == ItemId && element.SizeId == SizeId && element.ColorId == ColorId );
            });
            if (tmplist != undefined && tmplist.length > 0) {
                loadinputstock(tmplist);
                ItemStocktmplist = tmplist;
            }



            LoadInGrid(Ilist);


            //var otable = $('#tblinputstckgrd').DataTable();
            //var odata = otable.rows().data();

            //$('input[id=txtJOpRQty]').each(function (ig) {
            //    if (odata[ig].itmid == Itemid && odata[ig].clrid == Clrid && odata[ig].plansizeid == pszid && odata[ig].sno == CSno) {
            //        var row = $(this).closest('tr');
            //        // row.find('#txtOpOrdQty').val(totalamnt);
            //        row.find('#txtJOpRQty').focus().val('').val(val);
            //    }
            //});


        //var Currowval = 0;
        //var val = 0;
        //var currow_issqty = 0;
        //var currow_ReturnQty = 0;
        //var Tot_AccQty = 0;
        //var Tot_ReturnQty = 0;
        //var NxtRow_AccQty = 0;
        //var NxtRow_ReturnQty = 0;

        //Currowval = $(this).val();

        //if (Currowval != "") {
        //    val = parseFloat(Currowval);
        //}

        //rowindex = $(this).closest('tr').index();

        //var currowind = ItemStockorg.slice(rowindex);

        //for (var d = 0; d < ItemStockorg.length; d++) {
        //    if (ItemStockorg[d].Stockid == Stockid) {

        //        colorid = ItemStockorg[d].ColorId;
        //        itemid = ItemStockorg[d].ItemId;
        //        sizeid = ItemStockorg[d].SizeId;

        //        currow_issqty = parseFloat(ItemStockorg[d].AllotedQty);
        //        currow_ReturnQty = parseFloat(ItemStockorg[d].ReturnQty);

        //        var tot = val + parseFloat(currow_ReturnQty);

        //        //if (currow_issqty < tot) {  //(val + currow_ReturnQty)
        //        //    //  alert("Sum of (Accepted Qty + Return Qty) should not exceed Issue Qty!");

        //        //    currowind[0]['receivedqty'] = 0;
        //        //    ItemStockorg[d].receivedqty = 0;
        //        //    loadinputstock(ItemStockorg);

        //        //    for (var t = 0; t < Ilist.length; t++) {
        //        //        if (Ilist[t].ItemId == itemid && Ilist[t].ColorId == colorid && Ilist[t].SizeId == sizeid) {

        //        //            Ilist[t].receivedqty = 0;
        //        //            $('#tblinputgrd').DataTable().destroy();
        //        //            LoadInGrid(Ilist);
        //        //            break;                            
        //        //        }
        //        //    }

        //        //    return;
        //        //}
        //        //else if (currow_issqty > tot) {
        //        //    // alert("Sum of (Accepted Qty + Return Qty) must be equal to Issue Qty!");                   

        //        //    currowind[0]['receivedqty'] = 0;
        //        //    ItemStockorg[d].receivedqty = 0;
        //        //    loadinputstock(ItemStockorg);

        //        //    for (var t = 0; t < Ilist.length; t++) {
        //        //        if (Ilist[t].ItemId == itemid && Ilist[t].ColorId == colorid && Ilist[t].SizeId == sizeid) {

        //        //            Ilist[t].receivedqty = 0;
        //        //            $('#tblinputgrd').DataTable().destroy();
        //        //            LoadInGrid(Ilist);
        //        //            break;                          
        //        //        }
        //        //    }

        //        //    return;
        //        //}
        //        //else if (currow_issqty == tot) {
        //        Tot_ReturnQty = Tot_ReturnQty + parseFloat(ItemStockorg[d].ReturnQty);
        //        Tot_AccQty = Tot_AccQty + val;
        //        //}
        //    }
        //    else {

        //        NxtRow_AccQty = parseFloat(ItemStockorg[d].receivedqty);
        //        NxtRow_ReturnQty = parseFloat(ItemStockorg[d].ReturnQty);

        //        Tot_AccQty = Tot_AccQty + NxtRow_AccQty;
        //        Tot_ReturnQty = Tot_ReturnQty + NxtRow_ReturnQty;
        //    }
        //}

        //for (var t = 0; t < Ilist.length; t++) {
        //    if (Ilist[t].ItemId == itemid && Ilist[t].ColorId == colorid && Ilist[t].SizeId == sizeid) {

        //        //if (parseFloat(Ilist[t].issqty) < (Tot_AccQty + Tot_ReturnQty)) {                  
        //        //    //alert("Sum of (Accepted Qty + Return Qty) should not exceed Issue Qty!");

        //        //    Ilist[t].receivedqty = 0;
        //        //    $('#tblinputgrd').DataTable().destroy();
        //        //    LoadInGrid(Ilist);
        //        //    return;
        //        //}
        //        //else if (parseFloat(Ilist[t].issqty) > (Tot_AccQty + Tot_ReturnQty)) {                    
        //        //    //alert("Sum of (Accepted Qty + Return Qty) must be equal to Issue Qty!");                    

        //        //    Ilist[t].receivedqty = 0;
        //        //    $('#tblinputgrd').DataTable().destroy();
        //        //    LoadInGrid(Ilist);
        //        //    return;
        //        //}
        //        //else if (parseFloat(Ilist[t].issqty) == (Tot_AccQty + Tot_ReturnQty)) {                   
        //        Ilist[t].receivedqty = Tot_AccQty;
        //        break;
        //        //}
        //    }
        //}

        //currowind[0]['receivedqty'] = $(this).val();
        //$('#tblinputgrd').DataTable().destroy();
        //LoadInGrid(Ilist);
    });

    $(document).on('change', '.txtReturnQty', function () {
        debugger;

        var table = $('#tblinputstckgrd').DataTable();
        var Stockid = table.row($(this).parents('tr')).data()["Stockid"];
        var ItemId = table.row($(this).parents('tr')).data()["ItemId"];
        var ColorId = table.row($(this).parents('tr')).data()["ColorId"];
        var SizeId = table.row($(this).parents('tr')).data()["SizeId"];
        var StockQty = table.row($(this).parents('tr')).data()["StockQty"];
        var AllotedQty = table.row($(this).parents('tr')).data()["AllotedQty"];
        var ReturnQty = table.row($(this).parents('tr')).data()["ReturnQty"];
        var receivedqty = table.row($(this).parents('tr')).data()["receivedqty"];

        var Val = $(this).val();

        var totallot = parseFloat(receivedqty) + parseFloat(Val);

        if (StockQty < totallot) {
            Val = 0
        }

        for (var d = 0; d < ItemStockorg.length; d++) {
            if (ItemStockorg[d].Stockid == Stockid) {
                ItemStockorg[d].ReturnQty = Val;
            }
        }

        var totrece = 0;
        for (var d = 0; d < ItemStockorg.length; d++) {
            if (ItemStockorg[d].ItemId == ItemId && ItemStockorg[d].ColorId == ColorId && ItemStockorg[d].SizeId == SizeId) {
                totrece = totrece +  parseFloat(ItemStockorg[d].ReturnQty);
            }
        }


        for (var t = 0; t < Ilist.length; t++) {
            if (Ilist[t].ItemId == ItemId && Ilist[t].ColorId == ColorId && Ilist[t].SizeId == SizeId) {
                var acc = parseFloat(Ilist[t].issqty) - parseFloat(Ilist[t].receivedqty);

                if (acc.toFixed(2) < totrece.toFixed(2)) {
                    Val = 0;
                }

            }
        }


        for (var d = 0; d < ItemStockorg.length; d++) {
            if (ItemStockorg[d].Stockid == Stockid) {
                ItemStockorg[d].ReturnQty = Val;
            }
        }


        var totrece = 0;
        for (var d = 0; d < ItemStockorg.length; d++) {
            if (ItemStockorg[d].ItemId == ItemId && ItemStockorg[d].ColorId == ColorId && ItemStockorg[d].SizeId == SizeId) {
                totrece = totrece + parseFloat(ItemStockorg[d].ReturnQty);
            }
        }


        for (var t = 0; t < Ilist.length; t++) {
            if (Ilist[t].ItemId == ItemId && Ilist[t].ColorId == ColorId && Ilist[t].SizeId == SizeId) {

                Ilist[t].ReturnQty = totrece;
            }
        }


        var tmplist = [];

        tmplist = $.grep(ItemStockorg, function (element, index) {
            return (element.ItemId == ItemId && element.SizeId == SizeId && element.ColorId == ColorId );
        });
        if (tmplist != undefined && tmplist.length > 0) {
            loadinputstock(tmplist);
            ItemStocktmplist = tmplist;
        }

        LoadInGrid(Ilist);



        //var Currowval = 0;
        //var val = 0;
        //var currow_issqty = 0;
        //var currow_receivedqty = 0;
        //var Tot_AccQty = 0;
        //var Tot_ReturnQty = 0;
        //var NxtRow_AccQty = 0;
        //var NxtRow_ReturnQty = 0;

        //Currowval = $(this).val();

        //if (Currowval != "") {
        //    val = parseFloat(Currowval);
        //}

        //rowindex = $(this).closest('tr').index();

        //var currowind = ItemStockorg.slice(rowindex);

        //for (var d = 0; d < ItemStockorg.length; d++) {
        //    if (d == rowindex) {

        //        colorid = ItemStockorg[d].ColorId;
        //        itemid = ItemStockorg[d].ItemId;
        //        sizeid = ItemStockorg[d].SizeId;

        //        currow_issqty = parseFloat(ItemStockorg[d].AllotedQty);
        //        currow_receivedqty = parseFloat(ItemStockorg[d].receivedqty);

        //        var tot = val + parseFloat(currow_receivedqty);

        //        //if (currow_issqty < tot) {  //(val + currow_receivedqty)
        //        //    // alert("Sum of (Accepted Qty + Return Qty) should not exceed Issue Qty!");                  

        //        //    currowind[0]['ReturnQty'] = 0;
        //        //    ItemStockorg[d].ReturnQty = 0;
        //        //    loadinputstock(ItemStockorg);

        //        //    for (var t = 0; t < Ilist.length; t++) {
        //        //        if (Ilist[t].ItemId == itemid && Ilist[t].ColorId == colorid && Ilist[t].SizeId == sizeid) {

        //        //            Ilist[t].ReturnQty = 0;
        //        //            $('#tblinputgrd').DataTable().destroy();
        //        //            LoadInGrid(Ilist);
        //        //            break;                            
        //        //        }
        //        //    }

        //        //    return;
        //        //}
        //        //else if (currow_issqty > tot) {  //(val + currow_receivedqty)
        //        //    // alert("Sum of (Accepted Qty + Return Qty) must be equal to Issue Qty!");                   

        //        //    currowind[0]['ReturnQty'] = 0;
        //        //    ItemStockorg[d].ReturnQty = 0;
        //        //    loadinputstock(ItemStockorg);

        //        //    for (var t = 0; t < Ilist.length; t++) {
        //        //        if (Ilist[t].ItemId == itemid && Ilist[t].ColorId == colorid && Ilist[t].SizeId == sizeid) {

        //        //            Ilist[t].ReturnQty = 0;
        //        //            $('#tblinputgrd').DataTable().destroy();
        //        //            LoadInGrid(Ilist);
        //        //            break;                          
        //        //        }
        //        //    }

        //        //    return;
        //        //}
        //        //else if (currow_issqty == tot) {
        //        Tot_AccQty = Tot_AccQty + parseFloat(ItemStockorg[d].receivedqty);
        //        Tot_ReturnQty = Tot_ReturnQty + val;
        //        //}
        //    }
        //    else {

        //        NxtRow_AccQty = parseFloat(ItemStockorg[d].receivedqty);
        //        NxtRow_ReturnQty = parseFloat(ItemStockorg[d].ReturnQty);

        //        Tot_AccQty = Tot_AccQty + NxtRow_AccQty;
        //        Tot_ReturnQty = Tot_ReturnQty + NxtRow_ReturnQty;
        //    }
        //}

        //for (var t = 0; t < Ilist.length; t++) {
        //    if (Ilist[t].ItemId == itemid && Ilist[t].ColorId == colorid && Ilist[t].SizeId == sizeid) {

        //        //if (parseFloat(Ilist[t].issqty) < (Tot_AccQty + Tot_ReturnQty)) {                    
        //        //    //  alert("Sum of (Accepted Qty + Return Qty) should not exceed Issue Qty!");                    

        //        //    Ilist[t].ReturnQty = 0;
        //        //    $('#tblinputgrd').DataTable().destroy();
        //        //    LoadInGrid(Ilist);
        //        //    return;
        //        //}
        //        //else if (parseFloat(Ilist[t].issqty) > (Tot_AccQty + Tot_ReturnQty)) {                   
        //        //    //  alert("Sum of (Accepted Qty + Return Qty) must be equal to Issue Qty!");

        //        //    Ilist[t].ReturnQty = 0;
        //        //    $('#tblinputgrd').DataTable().destroy();
        //        //    LoadInGrid(Ilist);
        //        //    return;
        //        //}
        //        //else if (parseFloat(Ilist[t].issqty) == (Tot_AccQty + Tot_ReturnQty)) {                   
        //        Ilist[t].ReturnQty = Tot_ReturnQty;
        //        break;
        //        //}
        //    }
        //}

        //currowind[0]['ReturnQty'] = $(this).val();
        //$('#tblinputgrd').DataTable().destroy();
        //LoadInGrid(Ilist);

    });

    $(document).on('change', '.txtissqty', function () {
        debugger;

        var val = $(this).val();

        var Prodprgid = 0;
        var itemid = 0;
        var colorid = 0;
        var sizeid = 0;

        var val1 = $(this).closest('tr').find("td:eq(0)").text();

        for (var d = 0; d < Ilist.length; d++) {
            if (InputItemsgrdList[d].Sno == val1) {

                Prodprgid = InputItemsgrdList[d].ProdPrgId;
                colorid = InputItemsgrdList[d].ColorId;
                itemid = InputItemsgrdList[d].ItemId;
                sizeid = InputItemsgrdList[d].SizeId;
                // Stockid = InputItemsgrdList[d].StockId;

                Ilist[d].issqty = val;
                InputItemsgrdList[d].issqty = val;

                for (var i in IOlist) {
                    if (IOlist[i]['ProdPrgId'] == Prodprgid) {
                        IOlist[i]['issqty'] = $(this).val();
                        break;
                    }
                }

                break;
            }
        }

        var sid = [];
        var bal = [];
        var qty = [];
        for (var t = 0; t < ItemStockorg.length; t++) {
            if (ItemStockorg[t].ItemId == itemid && ItemStockorg[t].ColorId == colorid && ItemStockorg[t].SizeId == sizeid) {
                sid.push(ItemStockorg[t].Stockid);
                bal.push(ItemStockorg[t].StockQty);
                qty.push(ItemStockorg[t].AllotedQty);
            }
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
                if (this.BalQty > totalamnt) {
                    this.issqty = totalamnt;//this.BalQty;
                }
                else {
                    this.issqty = this.BalQty;
                    totexceed = true;
                }
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
        var tmplist = [];

        tmplist = $.grep(ItemStockorg, function (element, index) {
            return (element.ItemId == itemid && element.SizeId == sizeid && element.ColorId == colorid);
        });
        if (tmplist != undefined && tmplist.length > 0) {
            loadinputstock(tmplist);
        }

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
            }
            else {

                var otable = $('#tblinputgrd').DataTable();
                var odata = otable.rows().data();

                $('input[id=txtissqty]').each(function (ig) {
                    if (odata[ig].ItemId == itemid && odata[ig].SizeId == sizeid && odata[ig].ColorId == colorid) {
                        var row = $(this).closest('tr');
                        var num = row.find('#txtissqty').val();
                        row.find('#txtissqty').focus().val('').val(num);
                    }
                });
            }
        }
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
                var ur = "";
                AlartMessage(msg, flg, mod, ur);
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
                var ur = "";
                AlartMessage(msg, flg, mod, ur);
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

    $(document).ready(function () {

        $('#tblinputgrd').on('click', 'tr', function (e) {
            debugger;

            var stckcount = 0;
            $('#tblinputstckgrd tr').each(function () {
                stckcount++;
            });

            var Jobordno = $('#txtheaderwrkNo').val();
            var Companyid = $('#ddlcutheaderCompany').val();
            var IssueStoreid = $('#ddlissuestore').val();
            var Styleid = $('#ddlheaderstyle').val();

            var table = $('#tblinputgrd').DataTable();
            var row = $(this).closest('tr');
            var data = $('#tblinputgrd').dataTable().fnGetData(row);

            var Colorid = 0;
            var Itemid = 0;
            var Sizeid = 0;
            var Stockid = 0;

            var val1 = $(this).closest('tr').find("td:eq(0)").text();
            for (var d = 0; d < InputItemsgrdList.length; d++) {
                if (InputItemsgrdList[d].Sno == val1) {
                    Colorid = InputItemsgrdList[d].ColorId;
                    Itemid = InputItemsgrdList[d].ItemId;
                    Sizeid = InputItemsgrdList[d].SizeId;
                    Stockid = InputItemsgrdList[d].StockId;

                    break;
                }
            }

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
                        url: "/FabricDelySection/GetFabricInputItemStockEditMode",
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

                            if (ItemStocktmplist.length > 0) {
                                $('#tblinputstckgrd').DataTable().destroy();


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
                                                return '<input type="text"  class="form-control txtstkqty" style="width: 50px;text-align: center;" value=' + data + ' disabled="disabled">';
                                            }
                                        },
                                        {
                                            title: "Issue Qty", data: "AllotedQty",  //Alloted Qty
                                            render: function (data) {

                                                if (!IsReceipt) {
                                                    return '<input type="text" id="txtallqty" class="form-control txtallqty"  style="width: 50px;text-align: center;" value=' + data + ' >';
                                                }
                                                else {
                                                    return '<input type="text" id="txtallqty" class="form-control txtallqty"  style="width: 50px;text-align: center;" value=' + data + ' disabled="disabled">';
                                                }
                                            },
                                        },

                                         {
                                             title: "Markup rate", data: "MRate", "visible": false,
                                             render: function (data) {
                                                 return '<input type="text" id="txtMRate" class="form-control txtMRate"  style="width: 50px;text-align: center;" value=' + data + ' >';
                                             },
                                         },
                                          {
                                              title: "Acc.Qty", data: "receivedqty", visible: IsReceipt,
                                              render: function (data) {
                                                  return '<input type="text" class="form-control txtreceivedqty" id="txtreceivedqty"  style="width: 50px;text-align: center;" value=' + data + ' >';
                                              },
                                          },
                                          {
                                              title: "Ret.Qty", data: "ReturnQty", visible: IsReceipt,
                                              render: function (data) {
                                                  return '<input type="text" class="form-control txtReturnQty" id="txtReturnQty"  style="width: 50px;text-align: center;" value=' + data + ' >';
                                              },
                                          },

                                    ]
                                });

                            }
                            else {
                                loadinputstock(ItemStock);
                            }
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
        var CuttOrdId = table.row($(this).parents('tr')).data()["FabDelyIssueId"];  //CuttingOrdId
        var FabDelyIssueNo = table.row($(this).parents('tr')).data()["FabDelyIssueNo"];

        var Recpno = table.row($(this).parents('tr')).data()["CuttingOrdNo"];
        if (IsReceipt) {

            $.ajax({
                url: "/ProcessOrder/LoadProcessCheckItemEditDetails",
                data: JSON.stringify({ RecNo: FabDelyIssueNo }),
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {
                    debugger;
                    AllotedItemList = result;
                    if (AllotedItemList.length > 0) {

                        for (var x = 0; x < AllotedItemList.length; x++) {

                            //alert("Process Order is alloted for " + AllotedItemList[x].CTransNo + ",Please Check it....")
                            var msg = "Stock has been alloted for " + AllotedItemList[x].CTransNo + ",Please Check it...";
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
                    else {
                        Delete(CuttOrdId, FabDelyIssueNo);
                    }

                },
                failure: function (errMsg) {
                    alert(errMsg);
                }
            });
        }
        else {
            Delete(CuttOrdId, FabDelyIssueNo);
        }
    });

    $("#btnaddnew").click(function () {
        debugger;
        Mode = 0;
        companyid = $("#ddlcutCompany").val();
        companyunitid = $("#ddlcutunit").val();

        if (companyid == 0 || companyunitid == 0) {
            //alert("Please select Company and CompanyUnit");
            var msg = "Please select Company and CompanyUnit...";
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
        }
        else {

            $('#myModal').modal('show');
            LoadCuttingOrder(companyid, companyunitid);
            editmasunitstore = 0;
            LoadEmployeeStoreunit();
        }
    });
    $("#btncutclose").click(function () {
        debugger;
        $('#myModal').modal('hide');
        $('#tblcuttingord1').DataTable().destroy();
        $("#ddlinnercompany").val(0);
        $("#ddlinnerBuyer").val(0);
        $("#ddlinnerOrderNo").val(0);
        $("#ddlinnercompunit").val(0);
        $("#ddlinnerstyle").val(0);
        $("#ddlinnerWorkdivision").val(0);
        $("#ddlprocessor").val(0);
    });

    $(document).on('click', '.btnmaingrdedit', function () {
        debugger;
        Mode = 1;
        var table = $('#tblcuttingmaingrid').DataTable();
        CuttingOrdMasid = table.row($(this).parents('tr')).data()["FabDelyIssueId"];  //CuttingOrdId
        var OrderNo = table.row($(this).parents('tr')).data()["OrderNo"];

        $('#myModal1').modal('show');
        $('#btnAdd').hide();
        $('#btnUpdate').show();

        if (Maintype == "Issue" && IsReceipt == false) {
            $("#divStore").css("display", "none");
        }
        else {

        }

        getbyID(CuttingOrdMasid);

    });

    $(document).on('click', '.btnordadd', function () {
        debugger;


        var table = $('#tblcuttingord1').DataTable();


        Prodprgid = table.row($(this).parents('tr')).data()["ProdPrgId"];
        var ProdPrgNo = table.row($(this).parents('tr')).data()["ProdPrgNo"];
        var WorkOrderNo = table.row($(this).parents('tr')).data()["WorkOrder"];
        CheckPlanAmend(WorkOrderNo);
        var ddlIssueStore = $("#ddlissuestore").val();
        var type = $('input[name="wrkordnew"]:checked').attr('value');
        if (type == 'E') {
            var sup = $('#ddlprocessor').val();
            var supp = $('select#ddlprocessor option:selected').text();
            Processorid = $('select#ddlprocessor option:selected').val();
            if (sup == 0) {
                $('#ddlprocessor').siblings(".select2-container").css('border', '1px solid red');
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
                $('#ddlinnerWorkdivision').siblings(".select2-container").css('border', '1px solid red');
                return true;
            }
            else {
                $('#ddlinnerWorkdivision').siblings(".select2-container").css('border', '1px solid lightgrey');
            }
        }
        if (ddlIssueStore == 0) {
            $('#ddlissuestore').siblings(".select2-container").css('border', '1px solid red');
            return true;
        }
        else {
            $('#ddlissuestore').siblings(".select2-container").css('border', '1px solid lightgrey');
        }

        var OType = $('input[name="wrkord"]:checked').attr('value');
        OrderType = OType;
        var Type = OType;

        editmasunitstore = 0;
        editsubmasunitstore = 0;
        editsubstore = 0;
        LoadEmployeeStoreunit();
        LoadUserCompanyDDL();

        GenerateCuttingNumber(table, column, compId, Docum);
        fnGetHeaderDet(WorkOrderNo, ProdPrgNo);
        fnLoadInOutGrid(Prodprgid, WorkOrderNo, Type);

        $('#ddlheaderwrkdiv').val(supp);
        $('#btnAdd').show();
        $('#btnUpdate').hide();

        if (Maintype == "Issue" && IsReceipt == false) {
            $('#divStore').css('display', 'none');
        }
        else {

        }

    });
});

function AddReceipt(FabDelyIssueId) {  //Prodprgid, ProdPrgNo, WorkOrderNo
    debugger;

    IsReceipt = true;
    getbyID(FabDelyIssueId);
}

function Changedropcont() {
    debugger;

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

    var OType = $('input[name="wrkord"]:checked').attr('value');
    OrderType = OType;
    LoadCuttingOrder(companyid, companyunitid);

    companyid = $('#ddlinnercompany').val();

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
            this.issqty = totalamnt;
        }
    });

    $('#tblinputgrd').DataTable().destroy();
    LoadInGrid(Ilist);
}

function validate() {
    debugger;
    var isValid = true;
    if ($('#ddlheaderincharge').val() == 0) {
        $('#ddlheaderincharge').siblings(".select2-container").css('border', '1px solid red');
        isValid = false;
    }
    else {
        $('#ddlheaderincharge').siblings(".select2-container").css('border', '1px solid lightgrey');
    }

    return isValid;
}

function LoadItemStock(Jobordno, Companyid, IssueStoreid, Styleid, Colorid, Itemid, Sizeid) {
    $.ajax({
        url: "/FabricDelySection/GetInputItemStock",
        data: JSON.stringify({ JobOrdNo: Jobordno, CompanyId: Companyid, IssueStoreId: IssueStoreid, StyleId: Styleid, ColorId: Colorid, ItemId: Itemid, SizeId: Sizeid }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            ItemStock = result;
            if (ItemStockorg.length == 0) {
                ItemStockorg = ItemStock;
            }
            else if (ItemStock.length > 0) {
                ItemStockorg = $.merge($.merge([], ItemStockorg), result);
            }

            ItemStocktmplist = ItemStock;

            var stckcount = 0;
            $('#tblinputstckgrd tr').each(function () {
                stckcount++;
            });

            if (stckcount > 0) {
                $('#tblinputstckgrd').DataTable().destroy();
            }

            loadinputstock(ItemStock);
        }
    });
}

function ListFilter() {
    debugger;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    companyid = $("#ddlcutCompany").val();

    GetMainDDLValues();
    LoadData(companyid, FDate, TDate);
}

function getbyID(CuttingOrderId) {
    debugger;

    Mode = 1;
    CuttingOrdMasid = CuttingOrderId;

    $('#ddlcutheaderCompany').css('border-color', 'lightgrey');

    $.ajax({
        url: "/FabricDelySection/GetFabricHeaderInfo/" + CuttingOrderId,
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
            //$('#txtheaderloss').val(obj[0].LossPer);
            $('#txtcutheaderordno').val(obj[0].FabDelyIssueNo);
            //$('#txtheaderissNo').val(obj[0].OrderCumIssue);
            $('#txtcutheaderdate').val(moment(obj[0].FabDelyIssueDate).format('DD/MM/YYYY'));
            //$('#txtheaderdeldate').val(moment(obj[0].DeliverDate).format('DD/MM/YYYY'));
            $('#txtheaderrefno').val(obj[0].RefNo);
            $('#ddlheaderstyle').val(obj[0].StyleId);
            $('#txtremarks').val(obj[0].Remarks);
            $("#ddlheaderordno option:selected").text(obj[0].OrderNo);

            var prodprgid = obj[0].ProdPrgId;
            prodprgid_Edit = prodprgid;
            var Workorderno = obj[0].WorkOrder;
            Ortype = obj[0].OrderType;
            OrderType = Ortype;
            Prtype = obj[0].InterExter;
            Processorid = obj[0].WorkDivisionId;
            fnLoadInOutGridOnEditMode(CuttingOrderId, prodprgid);
            Processid = obj[0].ProcessId;
            LoadProcessDetails(Processid);

            if (IsReceipt) {
                CheckAlloted();
            }

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

            if (!IsDeleteReceipt) {
                $('#myModal1').modal('show');

                if (Maintype == "Issue" && IsReceipt == false) {
                    $("#divStore").css("display", "none");
                }
                else {
                }
            }

            if (IsReceipt) {
                $('#btnAdd').show();
                $('#btnUpdate').hide();
                $('#btnaddtxt').text("Update");
            }
            else if (IsDeleteReceipt) {
                $('#myModal1').modal('hide');
            }
            else {
                $('#btnAdd').hide();
                $('#btnUpdate').show();
            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    }).done(function () {

        if (IsDeleteReceipt) {
            if (ItemStockorg.length > 0) {

                for (var t = 0; t < Ilist.length; t++) {

                    Ilist[t].receivedqty = 0;
                    Ilist[t].ReturnQty = 0;
                }

                for (var p = 0; p < ItemStockorg.length; p++) {

                    ItemStockorg[p].ReturnQty = 0;
                }

                var FabDelyObj = {
                    FabDelyIssueId: CuttingOrdMasid,  //EditSchMasId
                    ToStoreid: null,
                    Remarks: "",
                    MainType: "Receipt/Return",
                    Mode: "Delete",
                    FabDelyIssueNo: FabDelyIssueNo_Edit,
                    FabricDelySectionDet: Ilist,   //IOlist
                    FabricDelySectionStock: ItemStockorg
                }

                LoadingSymb();
                $.ajax({
                    url: "/FabricDelySection/DeleteReceipt",
                    data: JSON.stringify(FabDelyObj),
                    type: "POST",
                    contentType: "application/json;charset=utf-8",
                    dataType: "JSON",
                    success: function (result) {
                        debugger;
                        AddUserEntryLog('Production', 'Fabric Delivery Receipt', 'DELETE', $("#txtcutheaderordno").val());
                        //alert("Record updated successfully...");
                        var msg = "Record deleted successfully...";
                        var flg = 1;
                        var mod = 0;
                        var ur = "/FabricDelySection/FabricDelySectionIndex";  //"/CuttingOrder/CuttingOrderIndex";
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
                        //window.location.href = "/CuttingOrder/CuttingOrderIndex";
                    },
                    error: function (errormessage) {
                        alert(errormessage.responseText);
                    }
                });
            }
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
    }

    if (Mode == 1) {

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
                        return '<input type="text"  class="form-control txtstkqty" style="width: 50px;text-align: center;" value=' + data + ' disabled="disabled">';
                    }
                },
                {
                    title: "Issue Qty", data: "AllotedQty",
                    render: function (data) {

                        if (!IsReceipt) {
                            return '<input type="text" id="txtallqty" class="form-control txtallqty"  style="width: 50px;text-align: center;" value=' + data + ' >';
                        }
                        else {
                            return '<input type="text" id="txtallqty" class="form-control txtallqty"  style="width: 50px;text-align: center;" value=' + data + ' disabled="disabled">';
                        }
                    },
                },
                   {
                       title: "Markup rate", data: "MRate", "visible": false,
                       render: function (data) {
                           return '<input type="text" id="txtMRate" class="form-control txtMRate"  style="width: 50px;text-align: center;" value=' + data + ' >';
                       },
                   },
                   {
                       title: "Acc.Qty", data: "receivedqty", visible: IsReceipt,
                       render: function (data) {
                           return '<input type="text" class="form-control txtreceivedqty" id="txtreceivedqty"  style="width: 50px;text-align: center;" value=' + data + ' >';
                       },
                   },
                                      {
                                          title: "Ret.Qty", data: "ReturnQty", visible: IsReceipt,
                                          render: function (data) {
                                              return '<input type="text" class="form-control txtReturnQty" id="txtReturnQty"  style="width: 50px;text-align: center;" value=' + data + ' >';
                                          },
                                      },
            ]
        });
    }
    else if (Mode == 0) {
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
                //{ title: "Issue Qty" },
                {
                    title: "Issue Qty", data: "AllotedQty",   //Alloted Qty
                    render: function (data) {

                        if (!IsReceipt) {
                            return '<input type="text" id="txtallqty" class="form-control txtallqty"  style="width: 50px;text-align: center;" value=' + data + ' >';
                        }
                        else {
                            return '<input type="text" id="txtallqty" class="form-control txtallqty"  style="width: 50px;text-align: center;" value=' + data + ' disabled="disabled">';
                        }

                        //  return '<input type="text" id="txtallqty" class="form-control txtallqty"  style="width: 50px;text-align: center;" value=' + data + ' >';
                    },
                },
                   {
                       title: "Markup rate", data: "MRate", "visible": false,
                       render: function (data) {
                           return '<input type="text" id="txtMRate" class="form-control txtMRate"  style="width: 50px;text-align: center;" value=' + data + ' >';
                       },
                   },
                   {
                       title: "Acc.Qty", data: "receivedqty", visible: IsReceipt,
                       render: function (data) {
                           return '<input type="text" class="form-control txtreceivedqty" id="txtreceivedqty"  style="width: 50px;text-align: center;" value=' + data + ' >';
                       },
                   },
                                      {
                                          title: "Ret.Qty", data: "ReturnQty", visible: IsReceipt,
                                          render: function (data) {
                                              return '<input type="text" class="form-control txtReturnQty" id="txtReturnQty"  style="width: 50px;text-align: center;" value=' + data + ' >';
                                          },
                                      },
            ]
        });
    }
}

function GenerateCuttingNumber(table, column, compId, Docum) {

    table = "FabDelySec_Issue_Mas",
    column = "FabDelyIssueNo",
    compId = $('#ddlinnercompany').val(),
    Docum = 'FABRIC DELIVERY ISSUE'

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
    Docum = 'CUTTING ISSUE'

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

function ConvertStringToDate(StrDate) {
    debugger;

    if (StrDate == "") {
        return null;
    }
    else {
        var parts = StrDate.split("/");
        var DateFormat = new Date(parts[2], parts[1] - 1, parts[0]);
        return DateFormat;
    }
}

function LoadMainStore() {
    $("#SubStoreId").hide();
    $("#SecStoId").hide();
    $("#MainStoreId").show();
}
function LoadSubStore() {
    $("#SecStoId").hide();
    $("#MainStoreId").hide();
    $("#SubStoreId").show();
    $("#SubStorPrdId").hide();
}

function Add() {
    debugger;

    if (IsReceipt) {

        var ipreceivedqty = 0;

        $.each(IOlist, function (e) {
            if (IOlist[e].receivedqty > 0) {

                ipreceivedqty = ipreceivedqty + IOlist[e].receivedqty;
            }
        });

        for (var t = 0; t < Ilist.length; t++) {

            var Issqty = parseFloat(Ilist[t].issqty);
            var recptqty = parseFloat(Ilist[t].receivedqty);
            var retqty = parseFloat(Ilist[t].ReturnQty);

            if ((recptqty + retqty).toFixed(1) == Issqty.toFixed(1)) {

            }
            else {
                // alert("Sum of (Accepted Qty + Return Qty) must be equal to Issue Qty!");
                var msg = 'Sum of Accepted Qty and Return Qty must be equal to Issue Qty!';
                var flg = 4;
                var mod = 1;
                var ur = "";
                AlartMessage(msg, flg, mod, ur);
                return false;
            }
        }

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

        if (ItemStockorg.length > 0) {

            var FabDelyObj = {
                FabDelyIssueId: CuttingOrdMasid,  //EditSchMasId
                ToStoreid: storeunitid,
                Remarks: $("#txtremarks").val(),
                MainType: "Receipt/Return",
                Mode: "Add/Edit",
                FabDelyIssueNo: $('#txtcutheaderordno').val(),

                FabricDelySectionDet: Ilist,   //IOlist
                FabricDelySectionStock: ItemStockorg
            }

            $("#btnAdd").attr("disabled", true);
            LoadingSymb();
            $.ajax({
                url: "/FabricDelySection/UpdateReceipt",
                data: JSON.stringify(FabDelyObj),
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "JSON",
                success: function (result) {
                    debugger;
                    AddUserEntryLog('Production', 'Fabric Delivery Receipt', 'ADD', $("#txtcutheaderordno").val());
                    //alert("Record updated successfully...");
                    var msg = "Record saved successfully...";
                    var flg = 1;
                    var mod = 0;
                    var ur = "/FabricDelySection/FabricDelySectionIndex";  //"/CuttingOrder/CuttingOrderIndex";
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
                },
                error: function (errormessage) {
                    alert(errormessage.responseText);
                }
            });
        }
    }
    else {

        var ipissuqty = 0;
        var opordqty = 0;
        $.each(IOlist, function (e) {
            if (IOlist[e].issqty > 0 && IOlist[e].BaseUnit != 'PCS') {
                ipissuqty = ipissuqty + parseFloat(IOlist[e].issqty);
            }
        });

        var chkpcs = 0;
        $.each(IOlist, function (e) {
            if (IOlist[e].BaseUnit == 'PCS' && IOlist[e].InorOut == 'I') {
                chkpcs = chkpcs + 1;
            }
        });

        if (chkpcs == 0) {
            if (ipissuqty == 0) {
                //alert('Please Fill atleast one Input Issue Qty..');
                var msg = "Please Fill atleast one Input Issue quantity...";
                var flg = 4;
                var mod = 1;
                var ur = "";
                AlartMessage(msg, flg, mod, ur);
                return false;
            }
        }

        var PType = $('input[name="wrkordnew"]:checked').attr('value');
        var OType = $('input[name="wrkord"]:checked').attr('value');
        var detlist = [];
        var Stocklist = [];

        if (ItemStockorg.length > 0) {

            table = "FabDelySec_Issue_Mas",
            column = "FabDelyIssueNo",
            compId = $('#ddlinnercompany').val(),
            Docum = 'FABRIC DELIVERY ISSUE'

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
                        //var msg = "Cutting Order Number has been changed...";
                        var msg = "Fabric Delivery Section Issue Number has been changed...";
                        var flg = 4;
                        var mod = 1;
                        var ur = "";
                        AlartMessage(msg, flg, mod, ur);
                        $('#txtcutheaderordno').val(result.Value);
                    }

                    var FabDelyObj = {
                        FabDelyIssueId: 0,  //EditSchMasId
                        // SchType: "",
                        FabDelyIssueNo: $("#txtcutheaderordno").val(),
                        FabDelyIssueDate: ConvertStringToDate($("#txtcutheaderdate").val()),
                        Joborderno: $("#txtheaderwrkNo").val(),
                        Employeeid: $("#ddlheaderincharge").val(),
                        Remarks: $("#txtremarks").val(),
                        companyunitid: $("#ddlcutheaderUnit").val(),

                        Companyid: $("#ddlcutheaderCompany").val(),
                        InorOut: PType,
                        OrderType: OType,
                        WorkDivisionid: Processorid,
                        ProdPrgid: Prodprgid,
                        FromStoreid: $("#ddlissuestore").val(),
                        CreatedBy: Guserid,  //1, //CreateUserId
                        FLineId: $("#txtCompanyId").val(),
                        IsApproved: 1,
                        FabricDelySectionDet: Ilist,   //IOlist
                        FabricDelySectionStock: ItemStockorg
                    }

                    $("#btnAdd").attr("disabled", true);
                    LoadingSymb();
                    $.ajax({
                        url: "/FabricDelySection/Add",
                        data: JSON.stringify(FabDelyObj),  //CuttObj
                        type: "POST",
                        contentType: "application/json;charset=utf-8",
                        dataType: "json",
                        success: function (result) {
                            AddUserEntryLog('Production', 'Fabric Dely Section', 'ADD', $("#txtcutheaderordno").val());
                            //alert("Record saved successfully...");
                            var msg = "Record saved successfully...";
                            var flg = 1;
                            var mod = 0;
                            var ur = "/FabricDelySection/FabricDelySectionIndex";  //"/CuttingOrder/CuttingOrderIndex";
                            AlartMessage(msg, flg, mod, ur);
                            //$('#ddlcutCompany').val(0);
                            // $('#ddlcutunit').val(0);
                            $('#myModal1').modal('hide');
                            $('#myModal').modal('hide');
                            $('#tblcuttingmaingrid').DataTable().destroy();
                            $('#tblcuttingord1').DataTable().destroy();
                            LoadData(companyid, fromdate, todate);
                            Mode = 0;
                            //window.location.href = "/CuttingOrder/CuttingOrderIndex";
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
            var msg = "No More stocks...";
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
            //  $('#ddlcutunit').val(0);
            $('#myModal1').modal('hide');
            $('#myModal').modal('hide');
            $('#tblcuttingmaingrid').DataTable().destroy();
            $('#tblcuttingord1').DataTable().destroy();
            LoadData(companyid, fromdate, todate);
        }

    }
}

function UpdateDetail() {
    debugger;

    var ipissuqty = 0;
    var opordqty = 0;
    $.each(IOlist, function (e) {
        if (IOlist[e].issqty > 0 && IOlist[e].BaseUnit != 'PCS') {
            ipissuqty = ipissuqty + parseFloat(IOlist[e].issqty);
        }
        if (IOlist[e].ordqty > 0) {
            opordqty = opordqty + parseFloat(IOlist[e].ordqty);
        }
    });

    var chkpcs = 0;
    $.each(IOlist, function (e) {
        if (IOlist[e].BaseUnit == 'PCS' && IOlist[e].InorOut == 'I') {
            chkpcs = chkpcs + 1;
        }
    });

    if (chkpcs == 0) {
        if (ipissuqty == 0) {
            //alert('Please Fill atleast one Input Issue Qty..');
            var msg = "Please Fill atleast one Input Issue quantity...";
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
            return false;
        }
    }

    var FabDelyObj = {
        FabDelyIssueId: CuttingOrdMasid,  //EditSchMasId
        // SchType: "",
        FabDelyIssueNo: $("#txtcutheaderordno").val(),
        FabDelyIssueDate: ConvertStringToDate($("#txtcutheaderdate").val()),
        Joborderno: $("#txtheaderwrkNo").val(),
        Employeeid: $("#ddlheaderincharge").val(),
        Remarks: $("#txtremarks").val(),
        companyunitid: $("#ddlcutheaderUnit").val(),

        Companyid: $("#ddlcutheaderCompany").val(),
        InorOut: Prtype,
        OrderType: Ortype,
        WorkDivisionid: Processorid,
        ProdPrgid: Prodprgid,
        FromStoreid: $("#ddlissuestore").val(),
        CreatedBy: Guserid,  //1, //CreateUserId
        FLineId: $("#txtCompanyId").val(),
        IsApproved: 1,
        ProdPrgid: prodprgid_Edit,
        FabricDelySectionDet: Ilist,   //IOlist
        FabricDelySectionStock: ItemStockorg
    }

    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/FabricDelySection/UpdateDet",
        data: JSON.stringify(FabDelyObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "JSON",
        success: function (result) {
            debugger;
            AddUserEntryLog('Production', 'Cutting Order', 'UPDATE', $("#txtcutheaderordno").val());
            //alert("Record updated successfully...");
            var msg = "Record updated successfully...";
            var flg = 1;
            var mod = 0;
            var ur = "/FabricDelySection/FabricDelySectionIndex";  //"/CuttingOrder/CuttingOrderIndex";
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
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function fnGetHeaderDet(JobordNo, ProdPrgNo) {
    $.ajax({
        type: "POST",
        url: '/CuttingOrder/GetCuttingHeaderDet/',
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
            //$("#ddlheaderwrkdiv").val($("#ddlinnerWorkdivision").val());           

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
        url: "/FabricDelySection/GetInOutDetEdit",  //CuttingOrder/GetInOutDetEdit
        data: JSON.stringify({ FabricDelyIssueId: CuttingOrderId, Prodprgid: prodprgid }),
        //data: JSON.stringify({ CuttingOrdMasId: CuttingOrderId, Prodprgid: prodprgid }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            IOlist = json.Value;
            if (IOlist != undefined) {
                Ilist = $.grep(IOlist, function (element, index) {
                    return element.InorOut == "I";
                });

                Ilist = $.grep(IOlist, function (element, index) {
                    return element.issqty > 0;
                });

                for (var d = 0; d < Ilist.length; d++) {
                    Ilist[d].Sno = d + 1;
                }

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

            if (inputcount > 0) {
                $('#tblinputgrd').DataTable().destroy();
            }

            if (outputcount > 0) {
                $('#tbloutputgrd').DataTable().destroy();
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
                    //{ title: "CuttingOrderDetId", data: "CuttingOrdDetId", "visible": false },
                    { title: "ProdPrgId", data: "ProdPrgId", "visible": false },
                    { title: "ColorId", data: "ColorId", "visible": false },
                    { title: "SizeId", data: "SizeId", "visible": false },
                    { title: "ItemId", data: "ItemId", "visible": false },
                    { title: "Item", data: "Item" },
                    { title: "Color", data: "Color" },
                    { title: "Size", data: "Size" },
                    {
                        title: "Gms/Pcs", data: "Grammage",
                        render: function (data) {
                            //return '<select id="ddlprocecolor" class="form-control" style="width: 100px;"/></select>';
                            return '<input type="text" id="txtgrammage" class="form-control"  style="width: 50px;text-align: center;" value=' + data + ' >';
                        }
                    },
                    { title: "Weight", data: "weight" },
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

                var Colorid = Ilist[0]['ColorId'];
                var Itemid = Ilist[0]['ItemId'];
                var Sizeid = Ilist[0]['SizeId'];
                var Stockid = Ilist[0]['StockId'];

                $.ajax({
                    url: "/FabricDelySection/GetFabricInputItemStockEditMode",  //CuttingOrder/GetInputItemStockEditMode
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
                                    title: "Issue Qty", data: "AllotedQty",   //Alloted Qty
                                    render: function (data) {

                                        if (!IsReceipt) {
                                            return '<input type="text" id="txtallqty" class="form-control txtallqty"  style="width: 50px;text-align: center;" value=' + data + ' >';
                                        }
                                        else {
                                            return '<input type="text" id="txtallqty" class="form-control txtallqty"  style="width: 50px;text-align: center;" value=' + data + ' disabled="disabled">';
                                        }

                                        // return '<input type="text" id="txtallqty" class="form-control txtallqty"  style="width: 50px;text-align: center;" value=' + data + ' >';
                                    },
                                },
                                   {
                                       title: "Markup rate", data: "MRate", "visible": false,
                                       render: function (data) {
                                           return '<input type="text" id="txtMRate" class="form-control txtMRate"  style="width: 50px;text-align: center;" value=' + data + ' >';
                                       },
                                   },
                                   {
                                       title: "Acc.Qty", data: "receivedqty", visible: IsReceipt,
                                       render: function (data) {
                                           return '<input type="text" class="form-control txtreceivedqty" id="txtreceivedqty"  style="width: 50px;text-align: center;" value=' + data + ' >';
                                       },
                                   },
                                      {
                                          title: "Ret.Qty", data: "ReturnQty", visible: IsReceipt,
                                          render: function (data) {
                                              return '<input type="text" class="form-control txtReturnQty" id="txtReturnQty"  style="width: 50px;text-align: center;" value=' + data + ' >';
                                          },
                                      },
                            ]
                        });
                    }
                }).done(function () {

                    if (!IsDeleteReceipt) {
                        $('#myModal1').modal('show');
                    }

                    if (!IsReceipt) {

                        var IsRecp_Record = false;

                        for (var i in Ilist) {
                            if (Ilist[i]['receivedqty'] > 0 || Ilist[i]['ReturnQty'] > 0) {
                                IsRecp_Record = true;
                                break; //Stop this loop, we found it!
                            }
                        }

                        if (IsRecp_Record) {
                            $("#btnUpdate").attr('disabled', true);
                            $("#btnDel").attr('disabled', true);
                            $('#btnAdd').hide();
                        }
                    }
                });
            }
            else {
                if (!IsDeleteReceipt) {
                    $('#myModal1').modal('show');
                }
            }
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}


function LoadInGrid(list) {

    InputItemsgrdList = list;

    var IsIssue_Visb = false;
    if (IsReceipt) {
        IsIssue_Visb = false;
    }
    else {
        IsIssue_Visb = true;
    }

    var inputcount = 0;
    $('#tblinputgrd tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tblinputgrd').DataTable().destroy();
    }

    $('#tblinputgrd').empty();

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
            { title: "SNo", data: "Sno", className: 'clsSNO' },
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
            {
                title: "Iss.Qty", data: "issqty", //visible: IsIssue_Visb,
                render: function (data) {

                    if (IsReceipt) {
                        return '<input type="text" id="txtissqty" class="form-control txtissqty"  style="width: 50px;text-align: center;" value=' + data + ' disabled="disabled">';
                    }
                    else {
                        return '<input type="text" id="txtissqty" class="form-control txtissqty"  style="width: 50px;text-align: center;" value=' + data + ' >';
                    }

                    // return '<input type="text" id="txtissqty" class="form-control txtissqty"  style="width: 50px;text-align: center;" value=' + data + ' >';
                },
            },
            {
                title: "Sec.Qty", data: "secqty", visible: false,
                render: function (data) {
                    return '<input type="text" class="form-control txtsecqty"  style="width: 50px;text-align: center;" value=' + data + ' >';
                },
            },
            {
                title: "Acc.Qty", data: "receivedqty", visible: IsReceipt,
            },
                    {
                        title: "Ret.Qty", data: "ReturnQty", visible: IsReceipt,
                    },

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
        url: "/FabricDelySection/GetInOutDet",
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

            InputItemsgrdList = Ilist;

            var IsIssue_Visb = false;
            if (IsReceipt) {
                IsIssue_Visb = false;
            }
            else {
                IsIssue_Visb = true;
            }

            var IsIssue_Visb = false;
            if (IsReceipt) {
                IsIssue_Visb = false;
            }
            else {
                IsIssue_Visb = true;
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

                    { title: "SNo", data: "Sno", className: 'clsSNO' },
                    { title: "CuttingOrderDetId", data: "CuttingOrdDetId", "visible": false },
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
                    {
                        title: "Iss.Qty", data: "issqty", // visible: IsIssue_Visb,
                        render: function (data) {

                            if (IsReceipt) {
                                return '<input type="text" class="form-control txtissqty" id="txtissqty"  style="width: 50px;text-align: center;" value=' + data + ' disabled="disabled">';
                            }
                            else {
                                return '<input type="text" class="form-control txtissqty" id="txtissqty"  style="width: 50px;text-align: center;" value=' + data + ' >';
                            }
                            //return '<input type="text" class="form-control txtissqty" id="txtissqty"  style="width: 50px;text-align: center;" value=' + data + ' >';
                        },
                    },
                    {
                        title: "Sec.Qty", data: "secqty", visible: false,
                        render: function (data) {
                            return '<input type="text" class="form-control txtsecqty"  style="width: 50px;text-align: center;" value=' + data + ' >';
                        },
                    },
                     {
                         title: "Acc.Qty", data: "receivedqty", visible: IsReceipt,
                     },
                    {
                        title: "Ret.Qty", data: "ReturnQty", visible: IsReceipt,
                    },

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
                    //{ title: "CuttingOrderDetId", data: "CuttingOrdDetId", "visible": false },
                    { title: "ProdPrgId", data: "ProdPrgId", "visible": false },
                    { title: "ColorId", data: "ColorId", "visible": false },
                    { title: "SizeId", data: "SizeId", "visible": false },
                    { title: "ItemId", data: "ItemId", "visible": false },
                    { title: "Item", data: "Item" },
                    { title: "Color", data: "Color" },
                    { title: "Size", data: "Size" },
                    {
                        //title: "Gms/Pcs", data: "Grammage",
                        title: "Gms/Pcs", data: "Grammage",
                        render: function (data) {
                            //return '<select id="ddlprocecolor" class="form-control" style="width: 100px;"/></select>';
                            return '<input type="text" id="txtgrammage" class="form-control"  style="width: 50px;text-align: center;" value=' + data + ' >';
                        }
                    },
                    { title: "Weight", data: "weight" },
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
                ]
            });

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
            //{ title: "CuttingOrderDetId", data: "CuttingOrdDetId", "visible": false },
            { title: "ProdPrgId", data: "ProdPrgId", "visible": false },
            { title: "ColorId", data: "ColorId", "visible": false },
            { title: "SizeId", data: "SizeId", "visible": false },
            { title: "ItemId", data: "ItemId", "visible": false },
            { title: "Item", data: "Item" },
            { title: "Color", data: "Color" },
            { title: "Size", data: "Size" },
            {
                title: "Gms/Pcs", data: "Grammage",
                render: function (data) {
                    //return '<select id="ddlprocecolor" class="form-control" style="width: 100px;"/></select>';
                    return '<input type="text" id="txtgrammage" class="form-control"  style="width: 50px;text-align: center;" value=' + data + ' >';
                }
            },
            { title: "Weight", data: "weight" },
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
        url: '/FabricDelySection/GetFaricDelySectionOrderList/',
        data: JSON.stringify({ CompanyId: inCompId, CompanyUnitId: companyunitid, OrderType: OType, RefNo: RfNo, StyleId: styid, OrderNo: ordNo, Buyerid: buyerid }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            //$('#tblcuttingord1').DataTable().destroy();
            cuttinglist = json.Value;
            Processid = cuttinglist[0].ProcessId;
            LoadProcessDetails(Processid);
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
                         { title: "Work Order", data: "WorkOrder" },
                         { title: "Prod Prg No", data: "ProdPrgNo" },
                          { title: "Process", data: "Process" },
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

function Delete(ID, FabDelyIssueNo) {
    debugger;

    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {

        if (IsReceipt) {

            FabDelyIssueNo_Edit = FabDelyIssueNo;
            IsDeleteReceipt = true;
            AddReceipt(ID);
        }
        else {
            LoadingSymb();
            DTmode = 1;
            $.ajax({
                url: "/FabricDelySection/Delete/",
                data: JSON.stringify({ ID: ID, FabDelyIssueNo: FabDelyIssueNo }),
                type: "POST",
                contentType: "application/json;charset=UTF-8",
                dataType: "json",
                success: function (result) {
                    AddUserEntryLog('Production', 'Cutting Order', 'DELETE', $("#txtcutheaderordno").val());
                    //alert("Record deleted successfully...");
                    var msg = "Record deleted successfully...";
                    var flg = 1;
                    var mod = 0;
                    var ur = "/FabricDelySection/FabricDelySectionIndex";  //"/CuttingOrder/CuttingOrderIndex";
                    AlartMessage(msg, flg, mod, ur);
                },
                error: function (errormessage) {
                    alert(errormessage.responseText);
                }
            });
        }
    }
}

function GetMainDDLValues() {
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

    $.ajax({
        type: "POST",
        url: '/FabricDelySection/GetMainDDLValues/',
        data: JSON.stringify({ compid: CompId, unitid: Unit, buyerid: buyer, masid: mas, empid: emp, refno: RecNo, orderno: OrdNo, supptype: supptype, ordtype: ordtype, cuttingordno: DCNo, jobordno: jordNo, Fromdate: FDate, Todate: TDate, supplierid: suppid, type: Maintype }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            var dataSet = json;

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

            $.each(dataSet, function (i, el) {  //maintbllist

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
                $(ddlcuttingord).append($('<option/>').val('0').text('--Select Dely No--'));
                $.each(data, function () {
                    $(ddlcuttingord).append($('<option></option>').text(this.FabDelyIssueNo));  //this.CuttingOrdNo
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
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
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

    $.ajax({
        type: "POST",
        url: '/FabricDelySection/GetMaindt/',  //CuttingOrder/GetMaindt
        //data: JSON.stringify({ CompanyId: companyid, CompanyUnitId: companyunitid }),
        data: JSON.stringify({ compid: CompId, unitid: Unit, buyerid: buyer, masid: mas, empid: emp, refno: RecNo, orderno: OrdNo, supptype: supptype, ordtype: ordtype, cuttingordno: DCNo, jobordno: jordNo, Fromdate: FDate, Todate: TDate, supplierid: suppid, type: Maintype }),
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
    }

    $.ajax({
        type: "POST",
        url: '/FabricDelySection/GetMaindt/',  //CuttingOrder
        //data: JSON.stringify({ CompanyId: companyid, CompanyUnitId: companyunitid }),
        data: JSON.stringify({ compid: CompId, unitid: Unit, buyerid: buyer, masid: mas, empid: emp, refno: RecNo, orderno: ordNo, supptype: supptype, ordtype: ordtype, cuttingordno: DCNo, jobordno: jordNo, Fromdate: FDate, Todate: TDate, supplierid: suppid, type: Maintype }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            maintbllist = json;

            var tableload = maintbllist.data; //json.data
            var dataSet = eval("[" + tableload + "]");

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

            $.each(dataSet, function (i, el) {  //maintbllist

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
                $(ddlcuttingord).append($('<option/>').val('0').text('--Select Dely No--'));
                $.each(data, function () {
                    $(ddlcuttingord).append($('<option></option>').text(this.FabDelyIssueNo));  //this.CuttingOrdNo
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

    var tableload = maintbllist.data; //json.data
    var dataSet = eval("[" + tableload + "]");

    var inputcount = 0;
    $('#tblcuttingmaingrid tr').each(function () {
        inputcount++;
    });
    if (inputcount > 0) {
        //$('#tblYarndetails').DataTable().destroy();
        var table = $('#tblcuttingmaingrid').DataTable();
        var rows = table.clear().draw();
        $('#tblcuttingmaingrid').DataTable().rows.add(dataSet);
        $('#tblcuttingmaingrid').DataTable().columns.adjust().draw();
    }
    else {

        MainList = dataSet;

        $('#tblcuttingmaingrid').DataTable({
            data: dataSet,  //maintbllist
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
                        { title: "Order No", "visible": false },
                        { title: "Ref No" },
                        { title: "Dely No" },
                        { title: "Dely Date" },
                        { title: "Work Division" },
                        { title: "Incharge", "visible": false },
                        { title: "ProdPrgId", "visible": false },
                        { title: "ProdPrgNo", "visible": false },
                        { title: "WorkOrder", "visible": false },
                        { title: "Action" },
            ]

        });
    }

}

function CMainlist() {
    debugger;

    // $('#tblcuttingmaingrid').DataTable().destroy();
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
    //ddlmain();
    GetMainDDLValues();
    LoadData();
    ChangeMaininorext();
}

function LoadIssueMain() {
    debugger;

    Maintype = "Issue";
    IsReceipt = false;
    //ddlmain();
    GetMainDDLValues();
    LoadData();
}
function LoadRecptMain() {
    debugger;

    Maintype = "Receipt";
    IsReceipt = true;
    //ddlmain();
    GetMainDDLValues();
    LoadData();
}

function BMainlist() {
    //  $('#tblcuttingmaingrid').DataTable().destroy();
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
    //   $('#tblcuttingmaingrid').DataTable().destroy();
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
    //  $('#tblcuttingmaingrid').DataTable().destroy();
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
    //   $('#tblcuttingmaingrid').DataTable().destroy();
    LoadData();
    ddlmain();
}

function UMainlist() {
    // $('#tblcuttingmaingrid').DataTable().destroy();
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
    //   $('#tblcuttingmaingrid').DataTable().destroy();
    LoadData();
    ddlmain();
}

function SPMainlist() {
    //   $('#tblcuttingmaingrid').DataTable().destroy();
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
    //  $('#tblcuttingmaingrid').DataTable().destroy();
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
    //  $('#tblcuttingmaingrid').DataTable().destroy();
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

function Close() {
    window.location.href = "/FabricDelySection/FabricDelySectionIndex";
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

    $.each(Olist, function () {
        var wgt = parseFloat(this.weight);
        totwgt = totwgt + wgt;

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
                    var msg = "Stock has been alloted for " + AllotedItemList[x].CTransNo + ",Please Check it...";
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
                    var ur = "";
                    AlartMessage(msg, flg, mod, ur);
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


function LoadUserCompanyDDL() {
    debugger;
    httpGet("/Company/GetCompany", onUserCompanySuccess, onUserCompanyFailure);
}

function onUserCompanySuccess(result) {
    if (result.Status == "SUCCESS") {

        companyid = $('#ddlcutCompany option:selected').val();
        var data = result.Value;
        var comp = [];
        $.each(data, function (i) {
            if (data[i].CompanyId == companyid) {
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


function LoadEmployeeStoreunit() {
    debugger;
    if (UserName == 'superuser') {
        LoginUserid = 0;
    }

    companyid = $('#ddlcutCompany option:selected').val();

    $.ajax({
        url: "/StoreSetup/GetStoreRights",
        data: JSON.stringify({ Userid: LoginUserid, Storetype: 'M', Companyid: companyid }),
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
        data: JSON.stringify({ Userid: LoginUserid, Storetype: 'B', Companyid: companyid }),
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

function Print(FabDelyIssueId) {
    debugger;
    var compid = $('#ddlcutCompany').val();
    window.open("../ReportInline/Production/FabricDeliveryReportInline/FabricDeliveryReportInline.aspx?FabDelyIssueId=" + FabDelyIssueId + "&Companyid=" + compid + "&Maintype=" + Maintype);
}