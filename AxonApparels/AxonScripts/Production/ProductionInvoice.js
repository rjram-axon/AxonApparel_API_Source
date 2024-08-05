
var PAItemList = [];
var MGRowID = 0;
var PrdItemList = [];
var ProdMasId = 0;
var PrdnDetid = 0;
var PDESaveItemList = [];
var PDOSaveItemList = [];
var PDOItemList = [];
var CreDebList = [];
var CreDebSaveList = [];
var AccList = [];
var MainFDate = 0;
var CmpId = 0;
var SuppId = 0;
var OrdType = 0;
var ProType = 0;
var ProcessId = 0;
var ProdInvId = 0;
var UnitId = 0;
var IType = 0;
var Guserid = 0;
var DCompid = 0;
var ChkBillNo = 0;
var GBillAmount = 0;
var GBillDate = 0;
var GCompId = 0;
var GSuppId = 0;
var chkBudRateBulkProd = "N";
var chkBudRateSampleProd = "N";
var AddlessId = 0;
var PDEItemList = [];
var chkGrnqty = '';
$(document).ready(function () {
    debugger;
    Guserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    MainFDate = $("#hdMainFromDate").data('value');
    DCompid = $("#hdnDCompid").data('value');
    ChkBillNo = $("#hdnCostBilltoInvProd").data('value');
    chkBudRateBulkProd = $("#hdnCostBudSewingAppid").data('value');
    chkBudRateSampleProd = $("#hdnCostBudSewingAppSamid").data('value');
    chkGrnqty = $("#hdnCostBudComProdIssAppid").data('value');

    LoadCompanyDDL("#ddlACompany,#ddlMCompany");
    LoadCompanyUnitDDL("#ddlAUnit");
    LoadRefNoDDL("#ddlARefNo");
    LoadOrderNoDDL("#ddlAOrderNo");
    LoadBuyerDDL("#ddlABuyer, #ddlMBuyer");
    LoadJobNoDDL("#ddlAWorkno");
    LoadProcessDDL("#ddlAProcess");
    LoadAddlessDDL("#ddlAcc");
    getDate();

    LoadMPrnNo();
    LoadMUnit();
    LoadMOrdRef();
    LoadMWorkdivision();
    LoadMWorkOrder();
    LoadMProcess();
    LoadMUnit();

    var fill = localStorage.getItem('ProductionInvoiceMainFilter');
    if (fill != "null" && fill != null) {
        LoadMainGridFromBack();
    } else {
        LoadMainGrid();
    }
    //LoadMainGrid();
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


    $(document).on('keyup', '.calcQty', function () {
        debugger;
        var table = $('#tblPrditmdetails').DataTable();

        var CSno = table.row($(this).parents('tr')).data()["Grndetid"];
        var Balance = table.row($(this).parents('tr')).data()["BalQty"];
        var Balqty = table.row($(this).parents('tr')).data()["BalQty"];
        var Val = $(this).val();


        if (chkGrnqty == 'Y') {

            if (Val > Balqty) {
                //alert("Invoice are not more then Balance qty..");
                var msg = 'Invoice are not more then Balance quantity...';
                var flg = 4;
                var mod = 1;
                var ur = "";
                AlartMessage(msg, flg, mod, ur);


                $.each(PDEItemList, function () {
                    if (this.Grndetid == CSno) {
                        this.InvoiceQty = 0;
                        Val = 0;
                    }
                });
                // loadPInvItemTable(PEItemList);

                var table = $('#tblPrditmdetails').DataTable();
                var ecdata = table.rows().data();
                debugger;
                $('input[id=txtOQty]').each(function (ig) {

                    var row = $(this).closest('tr');
                    for (var h = 0; h < PDEItemList.length; h++) {
                        debugger;
                        if (ecdata[ig].Grndetid == PDEItemList[h].Grndetid && ecdata[ig].Grndetid == CSno) {

                            var Invoice_Qty = PDEItemList[h].InvoiceQty;

                            row.find('#txtOQty').focus().val('').val(Invoice_Qty);
                            return true;
                        }
                    }

                });

                $.each(PDESaveItemList, function () {
                    if (this.Grndetid == CSno) {
                        this.InvoiceQty = 0;
                    }
                });
                loadPDInvSaveItemTable(PDESaveItemList);


                //job table
                $.each(PDOItemList, function () {
                    if (this.Prod_recpt_DetId == CSno) {
                        this.InvoiceQty = 0;
                    }
                });
                //loadPInvOrdTable(POItemList);

                var table = $('#tblPDInvOrddetails').DataTable();
                var ecdata = table.rows().data();
                debugger;
                $('input[id=txtOPQty]').each(function (ig) {

                    var row = $(this).closest('tr');
                    for (var h = 0; h < PDOItemList.length; h++) {
                        debugger;
                        if (ecdata[ig].Prod_recpt_DetId == PDOItemList[h].Prod_recpt_DetId && ecdata[ig].Prod_recpt_DetId == CSno) {

                            var Invoice_Qty = PDOItemList[h].InvoiceQty;

                            row.find('#txtOPQty').val(Invoice_Qty);
                            return true;
                        }
                    }

                });

                $.each(PDOSaveItemList, function () {
                    if (this.Prod_recpt_DetId == CSno) {
                        this.InvoiceQty = 0;
                    }
                });
                loadPDInvOrdSaveTable(PDOSaveItemList);
                //

                return true;
            } else {
                $.each(PDEItemList, function () {
                    if (this.Grndetid == CSno) {
                        this.InvoiceQty = Val;
                    }
                });
                // loadPInvItemTable(PEItemList);


                var table = $('#tblPrditmdetails').DataTable();
                var ecdata = table.rows().data();
                debugger;
                $('input[id=txtOQty]').each(function (ig) {

                    var row = $(this).closest('tr');
                    for (var h = 0; h < PDEItemList.length; h++) {
                        debugger;
                        if (ecdata[ig].Grndetid == PDEItemList[h].Grndetid && ecdata[ig].Grndetid == CSno) {

                            var Invoice_Qty = PDEItemList[h].InvoiceQty;

                            row.find('#txtOQty').focus().val('').val(Invoice_Qty);
                            return true;
                        }
                    }

                });

                $.each(PDESaveItemList, function () {
                    if (this.Grndetid == CSno) {
                        this.InvoiceQty = Val;
                    }
                });
                loadPDInvSaveItemTable(PDESaveItemList);

                var pid = [];
                var bal = [];
                var qty = [];
                for (var t = 0; t < PDOSaveItemList.length; t++) {
                    if (PDOSaveItemList[t].Prod_recpt_DetId == CSno) {
                        pid.push(PDOSaveItemList[t].Prod_recpt_DetId);
                        bal.push(PDOSaveItemList[t].RecQty);
                        qty.push(PDOSaveItemList[t].InvoiceQty);
                    }
                }

                var c = pid.length;
                var t = 0;

                if (Val < bal[0]) {
                    qty[0] = Val;
                    for (var l = 1; l < qty.length; l++) {
                        qty[l] = 0;
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
                for (var u = 0; u < PDOSaveItemList.length; u++) {
                    for (var r = 0; r < pid.length; r++) {
                        if (PDOSaveItemList[u].Prod_recpt_DetId == pid[r]) {
                            PDOSaveItemList[u].InvoiceQty = qty[r];
                        }
                    }
                }

                loadPDInvOrdSaveTable(PDOSaveItemList);

                PDOItemList = $.grep(PDOSaveItemList, function (v) {
                    return (v.Prod_recpt_DetId === CSno);
                });

                //loadPInvOrdTable(POItemList);

                var table = $('#tblPDInvOrddetails').DataTable();
                var ecdata = table.rows().data();
                debugger;
                $('input[id=txtOPQty]').each(function (ig) {

                    var row = $(this).closest('tr');
                    for (var h = 0; h < PDOItemList.length; h++) {
                        debugger;
                        if (ecdata[ig].Prod_recpt_DetId == PDOItemList[h].Prod_recpt_DetId && ecdata[ig].Prod_recpt_DetId == CSno) {

                            var Invoice_Qty = PDOItemList[h].InvoiceQty;

                            row.find('#txtOPQty').val(Invoice_Qty);
                            return true;
                        }
                    }

                });

            }
        } else {


            $.each(PDEItemList, function () {
                if (this.Grndetid == CSno) {
                    this.InvoiceQty = Val;
                }
            });
        
            var table = $('#tblPrditmdetails').DataTable();
            var ecdata = table.rows().data();
            debugger;
            $('input[id=txtOQty]').each(function (ig) {

                var row = $(this).closest('tr');
                for (var h = 0; h < PDEItemList.length; h++) {
                    debugger;
                    if (ecdata[ig].Grndetid == PDEItemList[h].Grndetid && ecdata[ig].Grndetid == CSno) {

                        var Invoice_Qty = PDEItemList[h].InvoiceQty;

                        row.find('#txtOQty').focus().val('').val(Invoice_Qty);
                        return true;
                    }
                }

            });

            $.each(PDESaveItemList, function () {
                if (this.Grndetid == CSno) {
                    this.InvoiceQty = Val;
                }
            });
            loadPDInvSaveItemTable(PDESaveItemList);

            var pid = [];
            var bal = [];
            var qty = [];
            for (var t = 0; t < PDOSaveItemList.length; t++) {
                if (PDOSaveItemList[t].Prod_recpt_DetId == CSno) {
                    pid.push(PDOSaveItemList[t].Prod_recpt_DetId);
                    bal.push(PDOSaveItemList[t].RecQty);
                    qty.push(PDOSaveItemList[t].InvoiceQty);
                }
            }

            var c = pid.length;
            var t = 0;

            if (Val < bal[0]) {
                qty[0] = Val;
                for (var l = 1; l < qty.length; l++) {
                    qty[l] = 0;
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
            for (var u = 0; u < PDOSaveItemList.length; u++) {
                for (var r = 0; r < pid.length; r++) {
                    if (PDOSaveItemList[u].Prod_recpt_DetId == pid[r]) {
                        PDOSaveItemList[u].InvoiceQty = qty[r];
                    }
                }
            }

            loadPDInvOrdSaveTable(PDOSaveItemList);

            PDOItemList = $.grep(PDOSaveItemList, function (v) {
                return (v.Prod_recpt_DetId === CSno);
            });

            var table = $('#tblPDInvOrddetails').DataTable();
            var ecdata = table.rows().data();
            debugger;
            $('input[id=txtOPQty]').each(function (ig) {

                var row = $(this).closest('tr');
                for (var h = 0; h < PDOItemList.length; h++) {
                    debugger;
                    if (ecdata[ig].Prod_recpt_DetId == PDOItemList[h].Prod_recpt_DetId && ecdata[ig].Prod_recpt_DetId == CSno) {

                        var Invoice_Qty = PDOItemList[h].InvoiceQty;

                        row.find('#txtOPQty').val(Invoice_Qty);
                        return true;
                    }
                }

            });

        }


        //CreditDebit
        var table = $('#tblPrditmdetails').DataTable();

        var Itm = table.row($(this).parents('tr')).data()["Item"];
        var Clr = table.row($(this).parents('tr')).data()["Color"];
        var Size = table.row($(this).parents('tr')).data()["Size"];
        var Invqty = table.row($(this).parents('tr')).data()["InvoiceQty"];
        var Rate = table.row($(this).parents('tr')).data()["InvoiceRate"];
        var Masid = table.row($(this).parents('tr')).data()["GrnMasid"];
        var Grnrate = table.row($(this).parents('tr')).data()["GrnRate"];
        var Balqty = table.row($(this).parents('tr')).data()["BalQty"];
        //var Grn = table.row($(this).parents('tr')).data()["Proc_recpt_no"];

        var difrate = parseFloat(Rate - Grnrate).toFixed(3);
        var damnt = parseFloat(difrate * Invqty).toFixed(3);
        var qtydif = parseFloat(Invqty - Balqty).toFixed(3);
        var qtyamnt = parseFloat(qtydif * Rate).toFixed(3);
        var test = [];

        if (CreDebSaveList.length == 0) {
            var obj = {
                Proc_Recpt_Masid: Masid,
                Proc_Recpt_Detid: CSno,
                Item: Itm,
                Color: Clr,
                Size: Size,
                Invoice_Qty: Invqty,
                Rate: Rate,
                BalQty: Balance,
                Grnno: 0,
                Date: 0,
                RateDiff: difrate,
                RateAmntDif: damnt,
                QtyDiff: qtydif,
                QtyAmntDif: qtyamnt
            }
            CreDebSaveList.push(obj);
            loadCreDebSaveTable(CreDebSaveList);
        }

        else {

           

            for (var t = 0; t < CreDebSaveList.length; t++) {
                if (CreDebSaveList[t].Proc_Recpt_Detid == CSno) {
                    test.push(CreDebSaveList[t]);
                }
            }
            if (test.length == 1) {
                for (var t = 0; t < CreDebSaveList.length; t++) {
                    if (CreDebSaveList[t].Proc_Recpt_Detid == CSno) {
                        CreDebSaveList[t].Invoice_Qty = Invqty;
                        CreDebSaveList[t].RateDiff = difrate;
                        CreDebSaveList[t].RateAmntDif = damnt;
                        CreDebSaveList[t].QtyDiff = qtydif;
                        CreDebSaveList[t].QtyAmntDif = qtyamnt;
                    }
                }
            }
            else if (test.length == 0) {
                var obj = {
                    Proc_Recpt_Masid: Masid,
                    Proc_Recpt_Detid: CSno,
                    Item: Itm,
                    Color: Clr,
                    Size: Size,
                    Invoice_Qty: Invqty,
                    Rate: Rate,
                    BalQty: Balance,
                    Grnno: 0,
                    Date: 0,
                    RateDiff: difrate,
                    RateAmntDif: damnt,
                    QtyDiff: qtydif,
                    QtyAmntDif: qtyamnt
                }
                CreDebSaveList.push(obj);
            }
        }


        if (Val == 0) {
            CreDebSaveList = $.grep(CreDebSaveList, function (v) {
                return (v.Proc_Recpt_Detid != CSno);
            });
        }

        CreDebList = $.grep(CreDebSaveList, function (v) {
            return (v.Proc_Recpt_Masid === Masid);
        });
        loadCreDebTable(CreDebList);
        loadCreDebSaveTable(CreDebSaveList);

        var totalamnt = 0;

        for (var e = 0; e < CreDebSaveList.length; e++) {
            if (CreDebSaveList[e].Proc_Recpt_Masid == Masid) {
                var amount = CreDebSaveList[e].Invoice_Qty - CreDebSaveList[e].BalQty;
                totalamnt = totalamnt + parseFloat(amount);
            }
        }
        $('#txtQuantity').val(totalamnt);


        //Amnt
        $.each(PDEItemList, function () {
            if (this.Grndetid == CSno) {
                this.Amount = this.InvoiceQty * this.InvoiceRate;
            }
        });
        //loadPDInvItemTable(PDEItemList);

        var table = $('#tblPrditmdetails').DataTable();
        var ecdata = table.rows().data();
        debugger;
        $('input[id=txtAMT]').each(function (ig) {

            var row = $(this).closest('tr');
            for (var h = 0; h < PDEItemList.length; h++) {
                debugger;
                if (ecdata[ig].Grndetid == PDEItemList[h].Grndetid && ecdata[ig].Grndetid == CSno) {

                    var Amount = PDEItemList[h].Amount;

                    row.find('#txtAMT').val(Amount);
                    return true;
                }
            }

        });


        $.each(PDESaveItemList, function () {
            if (this.Grndetid == CSno) {
                this.Amount = this.InvoiceQty * this.InvoiceRate;
            }
        });

        LoadNetGrossAmt();
        //var total = 0;
        //for (var e = 0; e < PDESaveItemList.length; e++) {
        //    var amount = PDESaveItemList[e].Amount;
        //    total = total + parseFloat(amount);
        //}

        //$('#txtTotalamount').val(total);

        //var totalqty = 0;
        //for (var e = 0; e < PDESaveItemList.length; e++) {
        //    var amount = PDESaveItemList[e].InvoiceQty;
        //    totalqty = totalqty + parseFloat(amount);
        //}

        //$('#txtTotalQty').val(totalqty);

        //Datatable textbox focus
        //var rows = $("#tblPrditmdetails").dataTable().fnGetNodes();
        //var dtTable = $('#tblPrditmdetails').DataTable();
        //for (var i = 0; i < rows.length; i++) {
        //    var sn = dtTable.cells({ row: i, column: 2 }).data()[0];
        //    $('input[id=txtOQty]').each(function () {
        //        if (sn == CSno && $(this).val() == Val) {
        //            var row = $(this).closest('tr');
        //            var num = row.find('#txtOQty').val();
        //            row.find('#txtOQty').focus().val('').val(num);
        //            return true;
        //        }
        //    });
        //}
    });

    $(document).on('keyup', '.calcRate', function () {
        debugger;
        var table = $('#tblPrditmdetails').DataTable();

        var CSno = table.row($(this).parents('tr')).data()["Grndetid"];

        var AppRate = 0;
        $.each(PDEItemList, function () {
            if (this.Grndetid == CSno) {
                AppRate = this.Apprate;
            }
        });

        var Val = $(this).val();


        var OrdType = $('input[name="EOType"]:checked').attr('value');

        if (OrdType == 'W') {
            if (chkBudRateBulkProd == "Y") {
                if (Val > AppRate) {
                    //alert('Rate should not be greater than Budget Rate ..');
                    var msg = 'Rate should not be greater than Budget Rate...';
                    var flg = 4;
                    var mod = 1;
                    var ur = "";
                    AlartMessage(msg, flg, mod, ur);
                    Val = 0;
                }
            }
        }
        else if (OrdType == 'S') {

            if (chkBudRateSampleProd == "Y") {
                if (Val > AppRate) {
                    //alert('Rate should not be greater than Budget Rate ..');
                    var msg = 'Rate should not be greater than Budget Rate...';
                    var flg = 4;
                    var mod = 1;
                    var ur = "";
                    AlartMessage(msg, flg, mod, ur);
                    Val = 0;
                }
            }
        }




        $.each(PDEItemList, function () {
            if (this.Grndetid == CSno) {
                this.InvoiceRate = Val;
            }
        });
       // loadPDInvItemTable(PDEItemList);


        var table = $('#tblPrditmdetails').DataTable();
        var ecdata = table.rows().data();
        debugger;
        $('input[id=txtRate]').each(function (ig) {

            var row = $(this).closest('tr');
            for (var h = 0; h < PDEItemList.length; h++) {
                debugger;
                if (ecdata[ig].Grndetid == PDEItemList[h].Grndetid && ecdata[ig].Grndetid == CSno) {

                    var Rate = PDEItemList[h].InvoiceRate;

                    row.find('#txtRate').focus().val('').val(Rate);

                    return false;
                }
            }

        });


        $.each(PDESaveItemList, function () {
            if (this.Grndetid == CSno) {
                this.InvoiceRate = Val;
            }
        });
        loadPDInvSaveItemTable(PDESaveItemList);


        //CreditDebit

        var Itm = table.row($(this).parents('tr')).data()["Item"];
        var Clr = table.row($(this).parents('tr')).data()["Color"];
        var Size = table.row($(this).parents('tr')).data()["Size"];
        var Invqty = table.row($(this).parents('tr')).data()["InvoiceQty"];
        var Rate = table.row($(this).parents('tr')).data()["InvoiceRate"];
        var Masid = table.row($(this).parents('tr')).data()["GrnMasid"];
        var Grnrate = table.row($(this).parents('tr')).data()["GrnRate"];
        var Balqty = table.row($(this).parents('tr')).data()["BalQty"];
        //var Grn = table.row($(this).parents('tr')).data()["Proc_recpt_no"];

        var difrate = parseFloat(Rate - Grnrate).toFixed(3);
        var damnt = parseFloat(difrate * Invqty).toFixed(3);
        var qtydif = parseFloat(Invqty - Balqty).toFixed(3);
        var qtyamnt = parseFloat(qtydif * Rate).toFixed(3);
        var test = [];
        if (CreDebSaveList.length == 0) {
            var obj = {
                Proc_Recpt_Masid: Masid,
                Proc_Recpt_Detid: CSno,
                Item: Itm,
                Color: Clr,
                Size: Size,
                Invoice_Qty: Invqty,
                Rate: Rate,
                BalQty: Balqty,
                Grnno: 0,
                Date: 0,
                RateDiff: difrate,
                RateAmntDif: damnt,
                QtyDiff: qtydif,
                QtyAmntDif: qtyamnt
            }
            CreDebSaveList.push(obj);
            loadCreDebSaveTable(CreDebSaveList);
        }

        else {

            //for (var t = 0; t < CreDebSaveList.length; t++) {
            //    if (CreDebSaveList[t].Proc_Recpt_Detid == CSno) {
            //        CreDebSaveList[t].Invoice_Qty = Invqty;
            //        break;
            //    }
            //    else {
            //        test.push(CreDebSaveList[t]);
            //    }
            //}
            //if (test.length > 0) {
            //    var obj = {
            //        Proc_Recpt_Masid: Masid,
            //        Proc_Recpt_Detid: CSno,
            //        Item: Itm,
            //        Color: Clr,
            //        Size: Size,
            //        Invoice_Qty: Invqty,
            //        Rate: Rate,
            //        BalQty: Balance,
            //        Grnno: 0,
            //        Date: 66
            //    }
            //    CreDebSaveList.push(obj);
            //}
            //loadCreDebSaveTable(CreDebSaveList);

            for (var t = 0; t < CreDebSaveList.length; t++) {
                if (CreDebSaveList[t].Proc_Recpt_Detid == CSno) {
                    test.push(CreDebSaveList[t]);
                }
            }
            if (test.length == 1) {
                for (var t = 0; t < CreDebSaveList.length; t++) {
                    if (CreDebSaveList[t].Proc_Recpt_Detid == CSno) {
                        CreDebSaveList[t].Rate = Rate;
                        CreDebSaveList[t].RateDiff = difrate;
                        CreDebSaveList[t].RateAmntDif = damnt;
                        CreDebSaveList[t].QtyDiff = qtydif;
                        CreDebSaveList[t].QtyAmntDif = qtyamnt;
                    }
                }
            }
            else if (test.length == 0) {
                var obj = {
                    Proc_Recpt_Masid: Masid,
                    Proc_Recpt_Detid: CSno,
                    Item: Itm,
                    Color: Clr,
                    Size: Size,
                    Invoice_Qty: Invqty,
                    Rate: Rate,
                    BalQty: Balqty,
                    Grnno: 0,
                    Date: 0,
                    RateDiff: difrate,
                    RateAmntDif: damnt,
                    QtyDiff: qtydif,
                    QtyAmntDif: qtyamnt
                }
                CreDebSaveList.push(obj);
            }
        }

        if (Val == 0) {
            CreDebSaveList = $.grep(CreDebSaveList, function (v) {
                return (v.Proc_Recpt_Detid != CSno);
            });
        }

        CreDebList = $.grep(CreDebSaveList, function (v) {
            return (v.Proc_Recpt_Masid === Masid);
        });


        loadCreDebTable(CreDebList);
        loadCreDebSaveTable(CreDebSaveList);


        //var totalamnt = 0;

        //for (var e = 0; e < CreDebSaveList.length; e++) {
        //    if (CreDebSaveList[e].Proc_Recpt_Masid == Masid) {
        //        var amount = CreDebSaveList[e].Invoice_Qty - CreDebSaveList[e].BalQty;
        //        totalamnt = totalamnt + parseFloat(amount);
        //    }
        //}
        //$('#txtQuantity').val(totalamnt);

        //Amnt
        $.each(PDEItemList, function () {
            if (this.Grndetid == CSno) {
                this.Amount = this.InvoiceQty * this.InvoiceRate;
            }
        });
        //loadPDInvItemTable(PDEItemList);

        var table = $('#tblPrditmdetails').DataTable();
        var ecdata = table.rows().data();
        debugger;
        $('input[id=txtAMT]').each(function (ig) {

            var row = $(this).closest('tr');
            for (var h = 0; h < PDEItemList.length; h++) {
                debugger;
                if (ecdata[ig].Grndetid == PDEItemList[h].Grndetid && ecdata[ig].Grndetid == CSno) {

                    var Amount = PDEItemList[h].Amount;

                    row.find('#txtAMT').val(Amount);
                    return true;
                }
            }

        });

        $.each(PDESaveItemList, function () {
            if (this.Grndetid == CSno) {
                this.Amount = this.InvoiceQty * this.InvoiceRate;
            }
        });
        LoadNetGrossAmt();
        //var total = 0;
        //for (var e = 0; e < PDESaveItemList.length; e++) {
        //    var amount = PDESaveItemList[e].Amount;
        //    total = total + parseFloat(amount);
        //}

        //$('#txtTotalamount').val(total);


        //Datatable textbox focus
        //var rows = $("#tblPrditmdetails").dataTable().fnGetNodes();
        //var dtTable = $('#tblPrditmdetails').DataTable();
        //for (var i = 0; i < rows.length; i++) {
        //    var sn = dtTable.cells({ row: i, column: 2 }).data()[0];
        //    $('input[id=txtRate]').each(function () {
        //        if (sn == CSno && $(this).val() == Val) {
        //            var row = $(this).closest('tr');
        //            var num = row.find('#txtRate').val();
        //            row.find('#txtRate').focus().val('').val(num);
        //            return true;
        //        }
        //    });
        //}
    });
    $(document).on('keyup', '.CalOIQty', function () {
        debugger;
        var table = $('#tblPDInvOrddetails').DataTable();

        var pid = table.row($(this).parents('tr')).data()["Prod_recpt_DetId"];
        var balq = table.row($(this).parents('tr')).data()["RecQty"];
        var value = $(this).val();


        if (chkGrnqty == 'Y') {

            if (value > balq) {

                //alert("Invoice Qty not more then  BalQty..");
                var msg = 'Invoice quantity not more then Balance quantity...';
                var flg = 4;
                var mod = 1;
                var ur = "";
                AlartMessage(msg, flg, mod, ur);
                $.each(PDOSaveItemList, function () {
                    if (this.Prod_recpt_DetId == pid) {
                        this.InvoiceQty = 0;
                    }
                });
                PDOItemList = $.grep(PDOSaveItemList, function (v) {
                    return (v.Prod_recpt_DetId === pid);
                });

                //loadPInvOrdTable(POItemList);
                var table = $('#tblPDInvOrddetails').DataTable();
                var ecdata = table.rows().data();
                debugger;
                $('input[id=txtOPQty]').each(function (ig) {

                    var row = $(this).closest('tr');
                    for (var h = 0; h < PDOItemList.length; h++) {
                        debugger;
                        if (ecdata[ig].Prod_recpt_DetId == PDOItemList[h].Prod_recpt_DetId) {

                            var Invoice_Qty = PDOItemList[h].InvoiceQty;

                            row.find('#txtOPQty').focus().val('').val(Invoice_Qty);
                            return true;
                        }
                    }

                });

                loadPDInvOrdSaveTable(PDOSaveItemList);

                var totalamnt = 0;

                for (var e = 0; e < PDOItemList.length; e++) {
                    var amount = PDOItemList[e].InvoiceQty;
                    totalamnt = totalamnt + parseFloat(amount);
                }
                $.each(PDESaveItemList, function () {
                    if (this.Grndetid == pid) {
                        this.InvoiceQty = totalamnt;
                    }
                });

                var masid = 0;
                $.each(PDESaveItemList, function (i) {
                    if (PDESaveItemList[i].Grndetid == pid) {

                        masid = PDESaveItemList[i].GrnMasid;
                    }
                });


                PDEItemList = $.grep(PDESaveItemList, function (v) {
                    return (v.GrnMasid === masid);
                });

                loadPDInvSaveItemTable(PDESaveItemList);
                // loadPInvItemTable(PEItemList);
                var table = $('#tblPrditmdetails').DataTable();
                var ecdata = table.rows().data();
                debugger;
                $('input[id=txtOQty]').each(function (ig) {

                    var row = $(this).closest('tr');
                    for (var h = 0; h < PDEItemList.length; h++) {
                        debugger;
                        if (ecdata[ig].Grndetid == PDEItemList[h].Grndetid && ecdata[ig].Grndetid == pid) {

                            var Invoice_Qty = PDEItemList[h].InvoiceQty;

                            row.find('#txtOQty').val(Invoice_Qty);
                            return true;
                        }
                    }

                });

            } else {
                $.each(PDOSaveItemList, function () {
                    if (this.Prod_recpt_DetId == pid) {

                        this.InvoiceQty = value;


                    }
                });
                PDOItemList = $.grep(PDOSaveItemList, function (v) {
                    return (v.Prod_recpt_DetId === pid);
                });

                //loadPInvOrdTable(POItemList);
                var table = $('#tblPDInvOrddetails').DataTable();
                var ecdata = table.rows().data();
                debugger;
                $('input[id=txtOPQty]').each(function (ig) {

                    var row = $(this).closest('tr');
                    for (var h = 0; h < PDOItemList.length; h++) {
                        debugger;
                        if (ecdata[ig].Prod_recpt_DetId == PDOItemList[h].Prod_recpt_DetId) {

                            var Invoice_Qty = PDOItemList[h].InvoiceQty;

                            row.find('#txtOPQty').focus().val('').val(Invoice_Qty);
                            return true;
                        }
                    }

                });
                loadPDInvOrdSaveTable(PDOSaveItemList);

                var totalamnt = 0;

                for (var e = 0; e < PDOItemList.length; e++) {
                    var amount = PDOItemList[e].InvoiceQty;
                    totalamnt = totalamnt + parseFloat(amount);
                }
                $.each(PDESaveItemList, function () {
                    if (this.Grndetid == pid) {
                        this.InvoiceQty = totalamnt;
                    }
                });

                var masid = 0;
                $.each(PDESaveItemList, function (i) {
                    if (PDESaveItemList[i].Grndetid == pid) {

                        masid = PDESaveItemList[i].GrnMasid;
                    }
                });


                PDEItemList = $.grep(PDESaveItemList, function (v) {
                    return (v.GrnMasid === masid);
                });

                loadPDInvSaveItemTable(PDESaveItemList);
                // loadPInvItemTable(PEItemList);
                var table = $('#tblPrditmdetails').DataTable();
                var ecdata = table.rows().data();
                debugger;
                $('input[id=txtOQty]').each(function (ig) {

                    var row = $(this).closest('tr');
                    for (var h = 0; h < PDEItemList.length; h++) {
                        debugger;
                        if (ecdata[ig].Grndetid == PDEItemList[h].Grndetid && ecdata[ig].Grndetid == pid) {

                            var Invoice_Qty = PDEItemList[h].InvoiceQty;

                            row.find('#txtOQty').val(Invoice_Qty);
                            return true;
                        }
                    }

                });
            }
        } else {

            $.each(PDOSaveItemList, function () {
                if (this.Prod_recpt_DetId == pid) {

                    this.InvoiceQty = value;


                }
            });
            PDOItemList = $.grep(PDOSaveItemList, function (v) {
                return (v.Prod_recpt_DetId === pid);
            });

            //loadPInvOrdTable(POItemList);
            var table = $('#tblPDInvOrddetails').DataTable();
            var ecdata = table.rows().data();
            debugger;
            $('input[id=txtOPQty]').each(function (ig) {

                var row = $(this).closest('tr');
                for (var h = 0; h < PDOItemList.length; h++) {
                    debugger;
                    if (ecdata[ig].Prod_recpt_DetId == PDOItemList[h].Prod_recpt_DetId) {

                        var Invoice_Qty = PDOItemList[h].InvoiceQty;

                        row.find('#txtOPQty').focus().val('').val(Invoice_Qty);
                        return true;
                    }
                }

            });
            loadPDInvOrdSaveTable(PDOSaveItemList);

            var totalamnt = 0;

            for (var e = 0; e < PDOItemList.length; e++) {
                var amount = PDOItemList[e].InvoiceQty;
                totalamnt = totalamnt + parseFloat(amount);
            }
            $.each(PDESaveItemList, function () {
                if (this.Grndetid == pid) {
                    this.InvoiceQty = totalamnt;
                }
            });

            var masid = 0;
            $.each(PDESaveItemList, function (i) {
                if (PDESaveItemList[i].Grndetid == pid) {

                    masid = PDESaveItemList[i].GrnMasid;
                }
            });


            PDEItemList = $.grep(PDESaveItemList, function (v) {
                return (v.GrnMasid === masid);
            });

            loadPDInvSaveItemTable(PDESaveItemList);
            // loadPInvItemTable(PEItemList);
            var table = $('#tblPrditmdetails').DataTable();
            var ecdata = table.rows().data();
            debugger;
            $('input[id=txtOQty]').each(function (ig) {

                var row = $(this).closest('tr');
                for (var h = 0; h < PDEItemList.length; h++) {
                    debugger;
                    if (ecdata[ig].Grndetid == PDEItemList[h].Grndetid && ecdata[ig].Grndetid == pid) {

                        var Invoice_Qty = PDEItemList[h].InvoiceQty;

                        row.find('#txtOQty').val(Invoice_Qty);
                        return true;
                    }
                }

            });

        }

        //CreditDebit

        for (var g = 0; g < PDESaveItemList.length; g++) {
            if (PDESaveItemList[g].Grndetid == pid) {
                var Itm = PDESaveItemList[g].Item;
                var Clr = PDESaveItemList[g].Color;
                var Size = PDESaveItemList[g].Size;
                var Invqty = PDESaveItemList[g].InvoiceQty;
                var Rate = PDESaveItemList[g].InvoiceRate;
                var Masid = PDESaveItemList[g].GrnMasid;
                var Balance = PDESaveItemList[g].BalQty;
                var Grnrate = PDESaveItemList[g].GrnRate;
                var Balqty = PDESaveItemList[g].BalQty;
                var Grn = PDESaveItemList[g].Proc_recpt_no;
            }
        }

        var difrate = parseFloat(Rate - Grnrate).toFixed(3);
        var damnt = parseFloat(difrate * Invqty).toFixed(3);
        var qtydif = parseFloat(Invqty - Balqty).toFixed(3);
        var qtyamnt = parseFloat(qtydif * Rate).toFixed(3);

        var test = [];
        if (CreDebSaveList.length == 0) {
            var obj = {
                Proc_Recpt_Masid: Masid,
                Proc_Recpt_Detid: pid,
                Item: Itm,
                Color: Clr,
                Size: Size,
                Invoice_Qty: Invqty,
                Rate: Rate,
                BalQty: Balance,
                Grnno: 0,
                Date: 0,
                RateDiff: difrate,
                RateAmntDif: damnt,
                QtyDiff: qtydif,
                QtyAmntDif: qtyamnt,
               
            }
            CreDebSaveList.push(obj);
            loadCreDebSaveTable(CreDebSaveList);
        }
        else {

            for (var t = 0; t < CreDebSaveList.length; t++) {
                if (CreDebSaveList[t].Proc_Recpt_Detid == pid) {
                    test.push(CreDebSaveList[t]);
                }
            }
            if (test.length == 1) {
                for (var t = 0; t < CreDebSaveList.length; t++) {
                    if (CreDebSaveList[t].Proc_Recpt_Detid == pid) {
                        CreDebSaveList[t].Invoice_Qty = Invqty;
                        CreDebSaveList[t].RateDiff = difrate;
                        CreDebSaveList[t].RateAmntDif = damnt;
                        CreDebSaveList[t].QtyDiff = qtydif;
                        CreDebSaveList[t].QtyAmntDif = qtyamnt;
                    }
                }
            }
            else if (test.length == 0) {
                var obj = {
                    Proc_Recpt_Masid: Masid,
                    Proc_Recpt_Detid: pid,
                    Item: Itm,
                    Color: Clr,
                    Size: Size,
                    Invoice_Qty: Invqty,
                    Rate: Rate,
                    BalQty: Balance,
                    Grnno: 0,
                    Date: 0,
                    RateDiff: difrate,
                    RateAmntDif: damnt,
                    QtyDiff: qtydif,
                    QtyAmntDif: qtyamnt
                }
                CreDebSaveList.push(obj);
            }
        }

        CreDebList = $.grep(CreDebSaveList, function (v) {
            return (v.Proc_Recpt_Masid === Masid);
        });
        loadCreDebTable(CreDebList);
        loadCreDebSaveTable(CreDebSaveList);

        var totalamnt = 0;

        for (var e = 0; e < CreDebSaveList.length; e++) {
            if (CreDebSaveList[e].Proc_Recpt_Masid == Masid) {
                var amount = CreDebSaveList[e].Invoice_Qty - CreDebSaveList[e].BalQty;
                totalamnt = totalamnt + parseFloat(amount);
            }
        }
        $('#txtQuantity').val(totalamnt);

        //Amnt
        $.each(PDEItemList, function () {
            if (this.Grndetid == pid) {
                this.Amount = this.InvoiceQty * this.InvoiceRate;
            }
        });
        //  loadPDInvItemTable(PDEItemList);

        var table = $('#tblPrditmdetails').DataTable();
        var ecdata = table.rows().data();
        debugger;
        $('input[id=txtAMT]').each(function (ig) {

            var row = $(this).closest('tr');
            for (var h = 0; h < PDEItemList.length; h++) {
                debugger;
                if (ecdata[ig].Grndetid == PDEItemList[h].Grndetid && ecdata[ig].Grndetid == pid) {

                    var Amount = PDEItemList[h].Amount;

                    row.find('#txtAMT').val(Amount);
                    return true;
                }
            }

        });


        $.each(PDESaveItemList, function () {
            if (this.Grndetid == pid) {
                this.Amount = this.InvoiceQty * this.InvoiceRate;
            }
        });

        LoadNetGrossAmt();
        //var total = 0;
        //for (var e = 0; e < PDESaveItemList.length; e++) {
        //    var amount = PDESaveItemList[e].Amount;
        //    total = total + parseFloat(amount);
        //}

        //$('#txtTotalamount').val(total);

        //var totalqty = 0;
        //for (var e = 0; e < PDESaveItemList.length; e++) {
        //    var amount = PDESaveItemList[e].InvoiceQty;
        //    totalqty = totalqty + parseFloat(amount);
        //}

        //$('#txtTotalQty').val(totalqty);

        //Datatable textbox focus
        //var rows = $("#tblPDInvOrddetails").dataTable().fnGetNodes();
        //var dtTable = $('#tblPDInvOrddetails').DataTable();
        //for (var i = 0; i < rows.length; i++) {
        //    var sn = dtTable.cells({ row: i, column: 2 }).data()[0];
        //    $('input[id=txtOPQty]').each(function () {
        //        if (sn == pid && $(this).val() == value) {
        //            var row = $(this).closest('tr');
        //            var num = row.find('#txtOPQty').val();
        //            row.find('#txtOPQty').focus().val('').val(num);
        //            return true;
        //        }
        //    });
        //}
    });


    $("#tblitmdetails").dataTable().find("tbody").on('click', 'td', function () {
        debugger;
        $('input[id=groupbom]').each(function () {
            var row = $(this).closest('tr');
            if ($(this).is(':checked')) {
                var val = $(this).val();
                for (var d = 0; d < CreDebList.length; d++) {
                    if (CreDebList[d].Proc_Recpt_Detid == val) {
                        CreDebList[d].IsChecked = "Y";
                    }
                }

            }
            else {
                var val = $(this).val();
                for (var d = 0; d < CreDebList.length; d++) {
                    if (CreDebList[d].Proc_Recpt_Detid == val) {
                        CreDebList[d].IsChecked = "N";
                    }

                }
            }

        });

    });



    //$("#tblitmdetails").dataTable().find("tbody").on('click', 'td', function () {
    //    debugger;
    //    var chktrue = [];
    //    var chkfalse = [];
    //    $('input[id=groupchk]').each(function () {
    //        var row = $(this).closest('tr');
    //        if ($(this).is(':checked')) {
    //            var val = $(this).val();
    //            for (var e = 0; e < CreDebSaveList.length; e++) {
    //                if (CreDebSaveList[e].Proc_Recpt_Detid == val) {
    //                    chktrue.push(CreDebSaveList[e]);
    //                }
    //            }
    //        }
    //        else {
    //            var val = $(this).val();
    //            for (var e = 0; e < CreDebSaveList.length; e++) {
    //                if (CreDebSaveList[e].Proc_Recpt_Detid == val) {
    //                    chkfalse.push(CreDebSaveList[e]);
    //                }
    //            }
    //        }

    //        if (chktrue.length > 0) {
    //            var totalamnt = 0;

    //            for (var e = 0; e < chktrue.length; e++) {
    //                var amount = chktrue[e].Invoice_Qty * chktrue[e].Rate;
    //                totalamnt = totalamnt + parseFloat(amount);

    //            }
    //            totalamnt = totalamnt.toFixed(2);
    //            $('#txtQAmount').val(totalamnt);
    //        }

    //    });
    //});


    $('#tblPrditmdetails').on('click', 'tr', function (e) {
        //$(document).on('click', '.btnGrnItemview', function () {
        debugger;
        var table = $('#tblPrditmdetails').DataTable();
        var row = $(this).closest('tr');
        var data = $('#tblPrditmdetails').dataTable().fnGetData(row);
        var recdetid = data.Grndetid;

        //var table = $('#tblPrditmdetails').DataTable();
        //var recdetid = table.row($(this).parents('tr')).data()["Prod_recpt_DetId"];

        if (PDOSaveItemList.length > 0) {
            PDOItemList = $.grep(PDOSaveItemList, function (v) {
                return (v.Prod_recpt_DetId === recdetid);
            });
            loadPDInvOrdTable(PDOItemList);
        }
    });


    $('#tblPrdndetails').on('click', 'tr', function (e) {
        //$(document).on('click', '.btnGrnItemview', function () {
        debugger;
        var table = $('#tblPrdndetails').DataTable();
        var row = $(this).closest('tr');
        var data = $('#tblPrdndetails').dataTable().fnGetData(row);
        var CSno = data.prod_recpt_masid;
        //var table = $('#tblPrdndetails').DataTable();
        //var CSno = table.row($(this).parents('tr')).data()["prod_recpt_masid"];
        PDEItemList = $.grep(PDESaveItemList, function (v) {
            return (v.GrnMasid === CSno);
        });

        loadPDInvItemTable(PDEItemList);

        if (PDEItemList.length > 0) {
            var detid = PDEItemList[0].Grndetid;

            PDOItemList = $.grep(PDOSaveItemList, function (v) {
                return (v.Prod_recpt_DetId === detid);
            });

            loadPDInvOrdTable(PDOItemList);
        }

        if (CreDebSaveList.length > 0) {
            CreDebList = $.grep(CreDebSaveList, function (v) {
                return (v.Proc_Recpt_Masid === CSno);
            });
            loadCreDebTable(CreDebList);
        }

    });
});




function ClearTextbox() {

    var PType = $('input[name="optPro"]:checked').attr('value');

    if (PType == 'E') {
        LoadSupplierDDL("#ddlAworkdiv");

    } else {
        LoadWorkdivisionDDL("#ddlAworkdiv");

    }

}

function LoadASuppWrk() {
    
    var PType = $('input[name="optPro"]:checked').attr('value');

    if (PType == 'E') {
        LoadSupplierDDL("#ddlAworkdiv");

    } else {
        LoadWorkdivisionDDL("#ddlAworkdiv");

    }
    
    LoadAddgrid();
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

    $('#txtEntryDate').val(Fdatestring);
    $('#txtInvoiceDate').val(Fdatestring);

}
function LoadNetAmount() {
    debugger;
    var Per = $('#txtPer').val();
    var GrossAmt = $('#txtGrossamount').val();
    var Amt = (Per * GrossAmt) / 100;
    $('#txtAAmount').val(Amt);



}
function RadioAPClick() {
    var PType = $('input[name="optPro"]:checked').attr('value');

    if (PType == 'E') {
        LoadSupplierDDL("#ddlAworkdiv");
        LoadPrdGridDetails();

    } else {
        LoadWorkdivisionDDL("#ddlAworkdiv");
        LoadPrdGridDetails();

    }
}



function LoadPrdGridDetails() {


    var comId = $('#ddlACompany').val();
    var unitId = $('#ddlAUnit').val();
    var suppId = $('#ddlAworkdiv').val();
    // var ProcessId = $('#ddlAProcess').val();
    var BuyerId = $('#ddlABuyer').val();


    var Pro = "";
    var Pr = $('select#ddlAProcess option:selected').val();

    if (Pr == 0) {
        Pro == "";
    }
    else {

        Pro = $('select#ddlAProcess option:selected').text();
    }


    var OrdNo = "";
    var ONo = $('select#ddlAOrderNo option:selected').val();

    if (ONo == 0) {
        OrdNo == "";
    }
    else {

        OrdNo = $('select#ddlAOrderNo option:selected').text();
    }



    var RefNo = "";
    var RNo = $('select#ddlARefNo option:selected').val();

    if (RNo == 0) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlARefNo option:selected').val();
    }

    var WorkNo = "";
    var WNo = $('select#ddlAWorkno option:selected').val();

    if (WNo == 0) {
        WorkNo == "";
    }
    else {

        WorkNo = $('select#ddlAWorkno option:selected').val();
    }
    var OrdType = $('input[name="optAOrder"]:checked').attr('value');


    var PType = $('input[name="optPro"]:checked').attr('value');

    if (Pro == "SEWING") {
        var PType = $('input[name="optPro"]:checked').attr('value');
        if (PType == "E") {
            var PrType = "P";
        } else {
            var PrType = "W";
        }
    } else {
        var PType = $('input[name="optPro"]:checked').attr('value');
        if (PType == "E") {
            var PrType = "E";
        } else {
            var PrType = "I";
        }
    }

    if (Pro == "SEWING") {
        var Process = "S";
    } else if (Pro == "CUTTING") {
        var Process = "C";
    } else {
        var Process = "G";
    }

    $.ajax({
        url: "/ProductionInvoice/GetPrdGridLoad",
        data: JSON.stringify({ Companyid: comId, CompanyUnitId: unitId, Processorid: suppId, Processid: Pr, BuyerId: BuyerId, OrdNo: OrdNo, OrdRefNo: RefNo, OrderType: OrdType, InternalOrExternal: PrType }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            PAItemList = result;
            loadPAItemTable(PAItemList);
            $('#AddSpinner').hide();
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}

function loadPAItemTable(PAItemList) {

    $('#tblProdInvAddgrid').DataTable().destroy();
    debugger;

    $('#tblProdInvAddgrid').DataTable({
        data: PAItemList,
        scrollY: 300,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        select: {
            style: 'single'
        },
        "bSort": false,
        columns: [

            { title: "PrnMasID", data: "GrnId", "visible": false },

            { title: "Dc No", data: "DcNo" },
            {
                title: "Dc Date", data: "DCDate",
                render: function (data) {
                    return (moment(data).format("DD/MM/YYYY"));
                }
            },
            { title: "Grn No", data: "GrnNo" },
            {
                title: "Grn Date", data: "GrnDate",
                render: function (data) {
                    return (moment(data).format("DD/MM/YYYY"));
                }
            },
              { title: "Process", data: "Process" },
            {

                title: "Include", data: "GrnId",
                render: function (data) {

                    return '<input type="checkbox" id="txtGrnMasId" class="editor-active"  style="width: 50px;text-align: center;"  value=' + data + ' onclick="myfunc(this.value);">';

                },
            },
        ]
    });
}

function LoadAddgrid() {
    $('#AddSpinner').show();
    $('#tblProdInvAddgrid').DataTable().destroy();
    LoadPrdGridDetails();
}

function myfunc(Val) {
    MGRowID = MGRowID + "," + Val;
}

function LoadProdInvEntryDetails() {

    MGRowID;


    var Comp = $('select#ddlACompany option:selected').text();
    var Supp = $('select#ddlAworkdiv option:selected').text();
    var Unit = $('select#ddlAUnit option:selected').text();
    var Process = $('select#ddlAProcess option:selected').text();

    var CompId = $('select#ddlACompany option:selected').val();
    var SuppId = $('select#ddlAworkdiv option:selected').val();
    var UnitId = $('select#ddlAUnit option:selected').val();
    var ProcessId = $('select#ddlAProcess option:selected').val();

    var OrdType = $('input[name="optAOrder"]:checked').attr('value');

    if (OrdType == 'W') {
        $('#optEW').prop('checked', true);
    }
    if (OrdType == 'J') {
        $('#optEJ').prop('checked', true);
    }
    if (OrdType == 'S') {
        $('#optES').prop('checked', true);
    }

    if (CompId == 0) {
        //alert("Please Select Company..");
        var msg = 'Please Select Company...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        return true;
    } else if (UnitId == 0) {
        //alert("Please Select Company Unit..");
        var msg = 'Please Select Company Unit...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        return true;
    } else if (SuppId == 0) {
        //alert("Please Select Supplier..");
        var msg = 'Please Select Supplier...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        return true;
    }
    //else if (ProcessId == 0) {
    //    alert("Please Select Process..");
    //    return true;
    //}

    if (MGRowID == 0) {
        //alert("Please Select Any One Row..");
        var msg = 'Please Select Any One Row...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        return true;
    }

    $('#myModal').modal('hide');
    $('#myModal1').modal('show');

    if (ChkBillNo == "Y") {
        $('#dptInvId').show();
        $('#txtInvId').hide();
        $('#optNewBill').show();
    } else {
        $('#txtInvId').show();
        $('#dptInvId').hide();
        $('#optNewBill').hide();
    }

    $('#txtcompany').val(Comp);
    $('#txtProcessor').val(Supp);
    $('#txtUnit').val(Unit);
    $('#txtProcess').val(Process);
    GenerateNumber();
    LoadPrdInvDetails(MGRowID, CompId, SuppId, UnitId, ProcessId);
    LoadBillInvNo(CompId, SuppId);
    $('#btnAdd').show();
    $('#btnUpdate').hide();
    $('#btnDel').hide();
}


var table, column, compId, Docum;
function GenerateNumber(table, column, compId, Docum) {

    debugger;

    table = "ProductioninvoiceMas",
    column = "InvNo",
    compId = $('#ddlACompany').val(),
    Docum = 'PRODUCTION INVOICE'

    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#txtEntryno').val(result.Value);
        }
    });
}

function backtomain() {
    $('#ddlACompany').val('0');
    $('#ddlABuyer').val('0');
    $('#ddlAWorkno').val('0');
    $('#ddlAProcess').val('0');
    $('#ddlAOrderNo').val('0');
    $('#ddlAUnit').val('0');
    $('#ddlAworkdiv').val('0');
    $('#ddlARefNo').val('0');
    var tablesize = $('#tblProdInvAddgrid').DataTable();
    tablesize.clear().draw();
    window.location.reload();
}

function LoadPrdInvDetails(MGRowID, CompId, SuppId, UnitId, ProcessId) {
    debugger;

    var OrdType = $('input[name="optwrkord"]:checked').attr('value');
    var PType = $('input[name="optExt"]:checked').attr('value');
    var ProcessId = ProcessId;
    var UnitId = UnitId;
    $.ajax({
        url: "/ProductionInvoice/GetInvPrdItemDetails",
        data: JSON.stringify({ PrdMasId: MGRowID, Processorid: SuppId, Processid: ProcessId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            PrdItemList = result;
            loadPrdItemTable(PrdItemList);

            ProdMasId = PrdItemList[0].prod_recpt_masid;


            var Iid = 0;
            var Cid = 0;
            var Sid = 0;
            var Gdid = 0;

            var ONo = 0;

            LoadProdInvItemSaveDetails(MGRowID, SuppId, ProcessId);
            LoadProdInvOrderSaveDetails(MGRowID, SuppId, ProcessId);



        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function loadPrdItemTable(PrdItemList) {

    $('#tblPrdndetails').DataTable().destroy();
    debugger;

    var table = $('#tblPrdndetails').DataTable({

        data: PrdItemList,
        scrollY: 100,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        "bSort": false,
        columns: [


             { title: "PrdInvDcId", data: "ProdInvDcId", "visible": false },
             { title: "PrdRecptId", data: "prod_recpt_masid", "visible": false },
            { title: "Dc No", data: "DcNo" },
            {
                title: "Dc Date", data: "DCDate",
                render: function (data) {
                    return (moment(data).format("DD/MM/YYYY"));
                }
            },
              { title: "Grn No", data: "GrnNo" },
               {
                   title: "Grn Date", data: "GrnDate",
                   render: function (data) {
                       return (moment(data).format("DD/MM/YYYY"));
                   }
               },
                { title: "Process", data: "process" },
                 {
                     title: "ACTION", "mDataProp": null, "visible": false,
                     "sDefaultContent": '<div style="display:inline-flex;"><button type="button" data-toggle="tooltip" data-placement="top" title="View Item" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnGrnItemview btn btn-round btn-info"> <i class="fa fa-eye"></i> </button></div>'
                 },
        ]
    });



    $("#tblPrdndetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblPrdndetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });

}

function LoadProdInvItemSaveDetails(MGRowID, SuppId, ProcessId) {
    debugger;
    $.ajax({
        url: "/ProductionInvoice/GetProdInvSaveItemDetails",
        data: JSON.stringify({ PrdMasId: MGRowID, Processorid: SuppId, Processid: ProcessId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            PDESaveItemList = result;
            loadPDInvSaveItemTable(PDESaveItemList);

            PrdnDetid = PDESaveItemList[0].Grndetid;

            PDEItemList = PDESaveItemList;

            PDEItemList = $.grep(PDEItemList, function (v) {
                return (v.GrnMasid === ProdMasId);
            });

            loadPDInvItemTable(PDEItemList);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}




function LoadProdInvOrderSaveDetails(MGRowID, SuppId, ProcessId) {
    debugger;

    $.ajax({
        url: "/ProductionInvoice/GetProdInvOrdDetails",
        data: JSON.stringify({ PrdMasId: MGRowID, Processorid: SuppId, Processid: ProcessId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            PDOSaveItemList = result;
            loadPDInvOrdSaveTable(PDOSaveItemList);

            PDOItemList = PDOSaveItemList;

            PDOItemList = $.grep(PDOItemList, function (v) {
                return (v.Prod_recpt_DetId === PrdnDetid);
            });

            loadPDInvOrdTable(PDOItemList);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function loadPDInvOrdTable(PDOItemList) {

    $('#tblPDInvOrddetails').DataTable().destroy();
    debugger;

    var table = $('#tblPDInvOrddetails').DataTable({
        data: PDOItemList,
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
              { title: "S.No", data: "OSNo", "visible": false },
               { title: "ProdInvOrdJobDetID", data: "Prood_Inv_JobDetID", "visible": false },
              { title: "ProdrecptDetId", data: "Prod_recpt_DetId", "visible": false },
            { title: "Order No", data: "OrderNo" },
            { title: "Ref No", data: "RefNo" },
              { title: "Style", data: "Style" },
               { title: "Job Ord No", data: "Job_Ord_No" },
               { title: "Received Qty", data: "RecQty" },
            { title: "Received Rate", data: "RecRate" },
            { title: "ProdinvID", data: "Prod_InvId", "visible": false },
            {
                title: "Inv Qty", data: "InvoiceQty",
                render: function (data) {

                    return '<input type="text" id="txtOPQty" class="CalOIQty form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';

                },
            },
            { title: "ProdInvDetID", data: "Prod_InvDetid", "visible": false },



        ]
    });

}




function loadPDInvOrdSaveTable(PDOSaveItemList) {

    $('#tblPDInvOrdSavedetails').DataTable().destroy();
    debugger;

    var table = $('#tblPDInvOrdSavedetails').DataTable({
        data: PDOSaveItemList,
        columns: [
            { title: "Sno", data: "OSNo" },
            { title: "ProdInvOrdJobDetID", data: "Prood_Inv_JobDetID" },
              { title: "Prod_recpt_DetId", data: "Prod_recpt_DetId" },
            { title: "Order No", data: "OrderNo" },
            { title: "Ref No", data: "RefNo" },
            { title: "Style", data: "Style" },
            { title: "Job Ord No", data: "Job_Ord_No" },
             { title: "Received Qty", data: "RecQty" },
            { title: "Received Rate", data: "RecRate" },
            { title: "ProdinvID", data: "Prod_InvId" },
            { title: "Inv Qty", data: "InvoiceQty" },
            { title: "ProdInvDetID", data: "Prod_InvDetid" },


        ]
    });

}
function loadPDInvItemTable(PDEItemList) {

    $('#tblPrditmdetails').DataTable().destroy();
    debugger;

    var table = $('#tblPrditmdetails').DataTable({
        data: PDEItemList,
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

            { title: "ProdInvId", data: "ProdInvId", "visible": false },
            { title: "ProdInvDetid", data: "ProdInvDetid", "visible": false },
            { title: "Grndetid", data: "Grndetid", "visible": false },
              { title: "GrnMasid", data: "GrnMasid", "visible": false },
            { title: "Item", data: "Item" },
            { title: "Color", data: "Color" },
            { title: "Size", data: "Size" },
            { title: "Grn.Qty", data: "GrnQty" },
            { title: "GrnRate", data: "GrnRate" },
            { title: "AppRate", data: "Apprate" },
            { title: "BalQty", data: "BalQty" },
             {
                 title: "Inv Qty", data: "InvoiceQty",
                 render: function (data) {

                     return '<input type="text" id="txtOQty" class="calcQty form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';

                 },
             },

            { title: "Uom", data: "Uom" },

            {
                title: "Rate", data: "InvoiceRate",
                render: function (data) {

                    return '<input type="text" id="txtRate" class="calcRate form-control"  style="width: 50px;text-align: center; "  value=' + data + '>';

                },
            },

               {
                   title: "Amount", data: "Amount",
                   render: function (data) {

                       return '<input type="text" id="txtAMT" class="calcAMT form-control"  style="width: 50px;text-align: center; "  value=' + data + ' disabled >';

                   },
               },


           // { title: "Amount", data: "Amount" },
            { title: "Lot No", data: "LotNo" },
            { title: "Bundle No", data: "BundleNo" },
            { title: "Rej Qty", data: "RejectdQty" },
            { title: "ItemId", data: "ItemId", "visible": false },
            { title: "ColorId", data: "ColorId", "visible": false },
            { title: "SizeId", data: "SizeId", "visible": false },


        {
            title: "ACTION", "mDataProp": null, "visible": false,
            "sDefaultContent": '<div style="display:inline-flex;"><button type="button" data-toggle="tooltip" data-placement="top" title="View Item" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnInvOrdview btn btn-round btn-info"> <i class="fa fa-eye"></i> </button></div>'
        },
        ]
    });

    //var totalamnt = 0;
    //for (var e = 0; e < PDEItemList.length; e++) {
    //    var amount = PDEItemList[e].InvAmt;
    //    totalamnt = totalamnt + parseFloat(amount);

    //}

    //$('#txtGrossAmount').val(totalamnt.toFixed(3));
    LoadNetGrossAmt();


    $("#tblPrditmdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblPrditmdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}
function loadPDInvSaveItemTable(PDESaveItemList) {

    $('#tblPDItemSavedetails').DataTable().destroy();
    debugger;

    var table = $('#tblPDItemSavedetails').DataTable({
        data: PDESaveItemList,
        columns: [

            { title: "ProdInvId", data: "ProdInvId" },
            { title: "ProdInvDetid", data: "ProdInvDetid" },
            { title: "Grndetid", data: "Grndetid" },
            { title: "GrnMasid", data: "GrnMasid" },
            { title: "Item", data: "Item" },
            { title: "Color", data: "Color" },
            { title: "Size", data: "Size" },
            { title: "Grn.Qty", data: "GrnQty" },
            { title: "GrnRate", data: "GrnRate" },
            { title: "BalQty", data: "BalQty" },
            { title: "Inv Qty", data: "InvoiceQty" },
            { title: "Uom", data: "Uom" },
            { title: "Rate", data: "InvoiceRate" },
            { title: "Amount", data: "Amount" },
            { title: "Lot No", data: "LotNo" },
            { title: "Bundle No", data: "BundleNo" },
            { title: "Rej Qty", data: "RejectdQty" },
            { title: "ItemId", data: "ItemId" },
            { title: "ColorId", data: "ColorId" },
            { title: "SizeId", data: "SizeId" },
        ]
    });



}




function loadCreDebTable(list) {

    $('#tblitmdetails').DataTable().destroy();
    debugger;

    var table = $('#tblitmdetails').DataTable({
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
             { title: "GRN No", data: "Grnno", "visible": false },
               { title: "Masid", data: "Proc_Recpt_Masid", "visible": false },
             { title: "Detid", data: "Proc_Recpt_Detid", "visible": false },
             { title: "Item", data: "Item" },
             { title: "Category1", data: "Color" },
             { title: "Category2", data: "Size" },
             { title: "Bal Qty", data: "BalQty" },
             { title: "ORD Date", data: "Date" },
             { title: "InvQty", data: "Invoice_Qty" },
             { title: "InvRate", data: "Rate" },
                { title: "RateDifference", data: "RateDiff" },
               { title: "RAmntDiferrence", data: "RateAmntDif" },
                 { title: "QuantityDifference", data: "QtyDiff" },
               { title: "QtyAmntDiferrence", data: "QtyAmntDif" },
             //{
             //    title: "Apply", data: "Proc_Recpt_Detid",
             //    render: function (data) {
             //        return '<input type="checkbox" id="groupchk" class="groupchk editor-active"  style="width: 50px;text-align: center;"  value=' + data + ' >';
             //    },
             //},
                 {
                     title: "Apply", data: "Proc_Recpt_Detid",
                     render: function (data, type, row) {
                         if ((row.IsChecked == 'Y' || row.check == true)) {
                             return '<input type="checkbox" id="groupbom" class="groupbom editor-active" checked  value=' + data + ' >';
                         }
                         else {
                             return '<input type="checkbox" id="groupbom" class="groupbom editor-active" unchecked  value=' + data + ' >';

                         }


                     }
                 },
        ]
    });
}

function loadCreDebSaveTable(list) {

    $('#tblsaveitmdetails').DataTable().destroy();
    debugger;

    var table = $('#tblsaveitmdetails').DataTable({
        data: list,
        columns: [
             { title: "GRN No", data: "Grnno" },
              { title: "Masid", data: "Proc_Recpt_Masid" },
             { title: "Detid", data: "Proc_Recpt_Detid" },
             { title: "Item", data: "Item" },
             { title: "Category1", data: "Color" },
             { title: "Category2", data: "Size" },
             { title: "Bal Qty", data: "BalQty" },
             { title: "ORD Date", data: "Date" },
             { title: "Inv Qty", data: "Invoice_Qty" },
             { title: "Inv Rate", data: "Rate" },
              { title: "Rate Difference", data: "RateDiff" },
               { title: "RAmnt Diferrence", data: "RateAmntDif" },
                 { title: "Quantity Difference", data: "QtyDiff" },
               { title: "QtyAmnt Diferrence", data: "QtyAmntDif" },
             {
                 title: "Apply", data: "Proc_Recpt_Masid",
                 render: function (data) {
                     return '<input type="checkbox" class="editor-active"  style="width: 50px;text-align: center;"  >';
                 },
             },
        ]
    });
}



$(document).ready(function () {

    //component details
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
                addless_id: $('#ddlAcc').val(),
                aorl: $('#txtPorMins').val(),
                percentage: $('#txtPer').val(),
                amount: $('#txtAAmount').val(),
                SlNo: leng,

                Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
            };

            AccList.push(AcListObj);

            loadAccTable(AcListObj);

            var totalAccamnt = 0;
            for (var e = 0; e < AccList.length; e++) {
                var amount = AccList[e].amount;
                totalAccamnt = totalAccamnt + parseFloat(amount);

            }


            //    loadItemTable(ItemList);
            // $('#txtNetAmount').val(totalAccamnt.toFixed(3));

            //var GAmt = $('#txtTotalamount').val();

            //var FNAmt = parseFloat(GAmt) + parseFloat(totalAccamnt);

            //if (FNAmt > 0) {

            //    $('#txtNetAmount').val(FNAmt);
            //}

            //$('#txtNNetamount').val(FNAmt);
            //$('#txtGrossamount').val(GAmt);

            LoadNetGrossAmt();

            fnClearAccControls();
        }
    });

    $(document).on('click', '.btnaccedit', function () {
        debugger;
        Mode = 1;


        var table = $('#tblPaydetails').DataTable();
        var addless_id = table.row($(this).parents('tr')).data()["addless_id"];
        var aorl = table.row($(this).parents('tr')).data()["aorl"];
        var percentage = table.row($(this).parents('tr')).data()["percentage"];
        var amount = table.row($(this).parents('tr')).data()["amount"];


        $('#ddlAcc').val(addless_id).trigger('change');
        $('#txtPorMins').val(aorl);
        $('#txtPer').val(percentage);
        $('#txtAAmount').val(amount);

        AddlessId = addless_id;

        //rowindex = $(this).closest('tr').index();

        //var currentro12 = AccList.slice(rowindex);

        //$('#ddlAcc').val(currentro12[0]['addless_id']);
        //$('#txtPorMins').val(currentro12[0]['aorl']);
        //$('#txtPer').val(currentro12[0]['percentage']);
        //$('#txtAAmount').val(currentro12[0]['amount']);

        $('#btnImadd').hide();
        $('#btnImupdate').show();
    });



    $('#btnImupdate').click(function () {
        debugger;
        //var currentrowsel = AccList.slice(rowindex);

        //currentrowsel[0]['addless_id'] = $("#ddlAcc").val();
        //currentrowsel[0]['Addless'] = $("#ddlAcc option:selected").text();
        //currentrowsel[0]['aorl'] = $("#txtPorMins").val();
        //currentrowsel[0]['percentage'] = $("#txtPer").val();
        //currentrowsel[0]['amount'] = $("#txtAAmount").val();

        //AccList[rowindex] = currentrowsel[0];

        $.each(AccList, function (i) {

            if (AccList[i].addless_id == AddlessId) {
                AccList[i].addless_id = $("#ddlAcc").val();
                AccList[i].Addless = $("#ddlAcc option:selected").text();
                AccList[i].aorl = $("#txtPorMins").val();
                AccList[i].percentage = $("#txtPer").val();
                AccList[i].amount = $("#txtAAmount").val();

            }
        })

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

        var table = $('#tblPaydetails').DataTable();
        var addid = table.row($(this).parents('tr')).data()["addless_id"];

        var AcsList = $.grep(AccList, function (e) {

            return e.addless_id != addid;

        });
        AccList = AcsList;

        loadAccTable(AccList);
        //rowindex = $(this).closest('tr').index();
        //AccList.splice(rowindex, 1);
        //document.getElementById("tblPaydetails").deleteRow(rowindex + 1);
        LoadNetGrossAmt();
    });
    //

});

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



function fnClearAccControls() {
    $('#ddlAcc').val('0');
    $('#txtPorMins').val('');
    $('#txtPer').val('');
    $('#txtAAmount').val('');
}

function loadAccTable(AcListObj) {
    debugger;
    $('#tblPaydetails').DataTable().destroy();

    $('#tblPaydetails').DataTable({
        data: AccList,

        columns: [

               { title: "AddlessId", data: "addless_id", "visible": false },
               { title: "Accounts Head", data: "Addless", },
               { title: "+/-", data: "aorl", },
               { title: "Percent", data: "percentage", },
               { title: "Amount", data: "amount", },

               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnaccedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button"data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnaccremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div> '

               },

        ]
    });

    var totalamnt = 0;
    for (var e = 0; e < AccList.length; e++) {
        var amount = AccList[e].amount;
        totalamnt = totalamnt + parseFloat(amount);

    }

    //$('#txtNetAmount').val(totalamnt.toFixed(3));

    //GAddAmt = $('#txtNetAmount').val();

    //var GAmt = $('#txtGrossAmount').val();
    //var NAmt = $('#txtNetAmount').val();
    //var FNAmt = parseFloat(GAmt) + parseFloat(NAmt);
    //$('#txtNetAmount').val(FNAmt);
    LoadNetGrossAmt();
}

function Save() {
    debugger;
    var res = validate();
    if (res == false) {
        return false;
    }

    if (PDESaveItemList.length == 0) {
        //alert("Please Enter the Item Details..");
        var msg = 'Please Enter the Item Details...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        return true;
    }

    //Check Qty
    var opchk = [];

    for (var y = 0; y < PDESaveItemList.length; y++) {
        if (PDESaveItemList[y].InvoiceQty > 0) {
            opchk.push(PDESaveItemList[y]);
        }
    }

    if (opchk.length == 0) {
        //alert('Please fill atleast any one invocie qty...');
        var msg = 'Please fill atleast any one invocie quantity...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        return true;
    }


    var TotitemInvqty = 0;
    var TotordInvqty = 0;

    $.each(PDESaveItemList, function () {
        TotitemInvqty = parseFloat(TotitemInvqty) + parseFloat(this.InvoiceQty);
    });

    $.each(PDOSaveItemList, function () {
        TotordInvqty = parseFloat(TotordInvqty) + parseFloat(this.InvoiceQty);
    });


    if (TotitemInvqty.toFixed(3) != TotordInvqty.toFixed(3)) {
        //alert('Please Check Item and Order Inv Qty...');
        var msg = 'Please Check Item and Order Invoice quantity...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        return true;
    }


    //Check Rate
    var opchk = [];

    for (var y = 0; y < PDESaveItemList.length; y++) {
        if (PDESaveItemList[y].InvoiceRate > 0) {
            opchk.push(PDESaveItemList[y]);
        }
    }

    if (opchk.length == 0) {
        //alert('Please fill atleast any one rate...');
        var msg = 'Please fill atleast any one rate...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        return true;
    }


    var CompId = $('select#ddlACompany option:selected').val();
    var SuppId = $('select#ddlAworkdiv option:selected').val();
    var ProcessId = $('select#ddlAProcess option:selected').val();
    var UnitId = $('select#ddlAUnit option:selected').val();
    var OrdType = $('input[name="optAOrder"]:checked').attr('value');
    var PType = $('input[name="optPro"]:checked').attr('value');

    var Process = $('select#ddlAProcess option:selected').text();

    var PC = 0;
    if (Process == "CUTTING") {
        PC = "C";
    } else if (Process == "SEWING") {
        PC = "S";
    } else {
        PC = "G";
    }

    var InvBillNo = 0;

    if (ChkBillNo == 'Y') {

        var CNetAmt = $('#txtNetAmount').val();

        if (CNetAmt != GBillAmount) {
            //alert("Bill Amount Should Match With Net Amount..");
            var msg = 'Bill Amount Should Match With Net Amount...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
            return true;
        }
        InvBillNo = $('#ddlInvoiceNo option:selected').text();
    } else {

        InvBillNo = $('#txtInvoiceNo').val();
    }


    CreDebSaveList = $.grep(CreDebSaveList, function (v) {
        return (v.IsChecked === 'Y');
    });

    table = "ProductioninvoiceMas",
    column = "InvNo",
    compId = $('#ddlACompany').val(),
    Docum = 'PRODUCTION INVOICE'

    var oldEntryNo = $('#txtEntryno').val();
    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var newEntryNo = result.Value;
            if (oldEntryNo != newEntryNo) {
                //alert('Invoice No has been changed...');
                var msg = 'Invoice Number has been changed...';
                var flg = 4;
                var mod = 1;
                var ur = "";
                AlartMessage(msg, flg, mod, ur);
                $('#txtEntryNo').val(result.Value);
            }
            var objProdSubmit = {
                OrderType: OrdType,
                InvNo: $('#txtEntryno').val(),
                InvDate: $('#txtEntryDate').val(),//new Date($('#txtEntryDate').val()),
                InvAmount: $('#txtNetAmount').val(),
                RefNo: InvBillNo,
                RefDate: $('#txtInvoiceDate').val(),
                //RefNo: $('#txtEntryno').val(),
                //RefDate: $('#txtEntryDate').val(),//new Date($('#txtInvoiceDate').val()),
                Remarks: $('#txtremarks').val(),
                PaymentAmt: 0,
                Paid: "N",
                Passed: "N",
                Processorid: SuppId,
                Processid: ProcessId,
                Companyid: CompId,
                CompanyUnitId: UnitId,
                InternalOrExternal: PType,
                Approved: "N",
                CreatedBy: Guserid,
                ApprovedBy: Guserid,
                InvoiceType: PC,

                ProdInvDDet: PDESaveItemList,
                ProdInvOrdDDet: PDOSaveItemList,
                ProdInvDcDet: PrdItemList,
                ProdInvAL: AccList,
                ProdInvRDiff: CreDebSaveList,

            };
            debugger;
            $("#btnAdd").attr("disabled", true);
            LoadingSymb();
            $.ajax({
                url: "/ProductionInvoice/Add",
                data: JSON.stringify(objProdSubmit),
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {


                    if (result.Value == true) {
                        if (ChkBillNo == 'Y') {
                            AddInvBillNo("Y");
                        }
                        AddUserEntryLog('PRODUCTION', 'Production Invoice', 'ADD', $("#txtEntryno").val());

                        //alert("Data Saved Sucessfully");
                        var msg = 'Data Saved Sucessfully...';
                        var flg = 1;
                        var mod = 0;
                        var ur = "";
                        AlartMessage(msg, flg, mod, ur);

                        $('#myModal1').modal('hide');
                        //window.location.reload();

                        ClearAddData();

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

    if ($('#txtEntryno').val().trim() == "") {
        $('#txtEntryno').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtEntryno').css('border-color', 'lightgrey');
    }

    if (ChkBillNo == 'Y') {

        if ($('#ddlInvoiceNo').val() == 0) {
            $('#ddlInvoiceNo').siblings(".select2-container").css('border', '1px solid red');
            isValid = false;
        }
        else {
            $('#ddlInvoiceNo').siblings(".select2-container").css('border', '1px solid lightgrey');
        }
    } else {

        if ($('#txtInvoiceNo').val().trim() == "") {
            $('#txtInvoiceNo').css('border-color', 'Red');
            //$('#txtInvoiceNo').siblings(".select2-container").css('border', '1px solid red');
            isValid = false;
        }
        else {
            $('#txtInvoiceNo').css('border-color', 'lightgrey');
            //$('#txtInvoiceNo').siblings(".select2-container").css('border', '1px solid lightgrey');
        }
    }

    //if ($('#txtInvoiceNo').val().trim() == "") {
    //    $('#txtInvoiceNo').css('border-color', 'Red');
    //    isValid = false;
    //}
    //else {
    //    $('#txtInvoiceNo').css('border-color', 'lightgrey');
    //}

    //if ($('#ddlLoc').val() == 0) {
    //    $('#ddlLoc').css('border-color', 'Red');
    //    isValid = false;
    //}
    //else {
    //    $('#ddlLoc').css('border-color', 'lightgrey');
    //}

    return isValid;
}

function LoadMPrnNo() {
    
    var comId = $('#ddlMCompany').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    $.ajax({
        url: "/ProductionInvoice/GetMEntryNo",
        data: JSON.stringify({ Companyid: comId, FromDate: FDate, ToDate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;
                $(ddlMEntryNo).empty();

                $(ddlMEntryNo).append($('<option/>').val('0').text('--Select EntryNo--'));
                $.each(data, function () {
                    $(ddlMEntryNo).append($('<option></option>').val(this.ProdInvid).text(this.InvNo));
                });

            }
        }

    });

}

function LoadMUnit() {

    var comId = $('#ddlMCompany').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    $.ajax({
        url: "/ProductionInvoice/GetMUnit",
        data: JSON.stringify({ Companyid: comId, FromDate: FDate, ToDate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;
                $(ddlMUnit).empty();

                $(ddlMUnit).append($('<option/>').val('0').text('--Select Unit--'));
                $.each(data, function () {
                    $(ddlMUnit).append($('<option></option>').val(this.CompanyUnitId).text(this.CompanyUnit));
                });

            }
        }

    });

}
function LoadMOrdRef() {

    var comId = $('#ddlMCompany').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    $.ajax({
        url: "/ProductionInvoice/GetMOrdRef",
        data: JSON.stringify({ Companyid: comId, FromDate: FDate, ToDate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;
                $(ddlMOrderNo).empty();

                $(ddlMOrderNo).append($('<option/>').val('0').text('--Select OrderNo--'));
                $.each(data, function () {
                    $(ddlMOrderNo).append($('<option></option>').val(this.BMasId).text(this.OrdNo));
                });

                $(ddlMRefNo).empty();

                $(ddlMRefNo).append($('<option/>').val('0').text('--Select RefNo--'));
                $.each(data, function () {
                    $(ddlMRefNo).append($('<option></option>').val(this.BMasId).text(this.OrdRefNo));
                });
            }
        }

    });

}

function LoadMWorkdivision() {

    var comId = $('#ddlMCompany').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var PType = $('input[name="optMPro"]:checked').attr('value');
    $.ajax({
        url: "/ProductionInvoice/GetMWkDiv",
        data: JSON.stringify({ Companyid: comId,InternalOrExternal:PType, FromDate: FDate, ToDate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;        

                $(ddlMworkdiv).empty();

                $(ddlMworkdiv).append($('<option/>').val('0').text('--Select Processor--'));
                $.each(data, function () {
                    $(ddlMworkdiv).append($('<option></option>').val(this.Processorid).text(this.Processor));
                });
            }
        }

    });

}

function LoadMWorkOrder() {

    var comId = $('#ddlMCompany').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    $.ajax({
        url: "/ProductionInvoice/GetMWkOrder",
        data: JSON.stringify({ Companyid: comId, FromDate: FDate, ToDate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;

                $(ddlMWorkNo).empty();

                $(ddlMWorkNo).append($('<option/>').val('0').text('--Select WorkOrder--'));
                $.each(data, function () {
                    $(ddlMWorkNo).append($('<option></option>').val(this.JobId).text(this.WorkOrder));
                });
            }
        }

    });

}

function LoadMProcess() {

    var comId = $('#ddlMCompany').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    $.ajax({
        url: "/ProductionInvoice/GetMProcess",
        data: JSON.stringify({ Companyid: comId, FromDate: FDate, ToDate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;
                $(ddlMProcess).empty();

                $(ddlMProcess).append($('<option/>').val('0').text('--Select Process--'));
                $.each(data, function () {
                    $(ddlMProcess).append($('<option></option>').val(this.Processid).text(this.Process));
                });
            }
        }

    });

}




function RadioMBClick() {
    debugger;

    var PType = $('input[name="optMPro"]:checked').attr('value');
    if (PType == 'E') {
        LoadSupplierDDL("#ddlMworkdiv");

    } else {

        LoadWorkdivisionDDL("#ddlMworkdiv");
    }
    MainList();
}


function MainList() {
    $('#tblmaindetails').DataTable().destroy();
    LoadMainGrid();
    LoadMPrnNo();
}

function LoadMainGrid() {

    debugger;

    var comId = $('#ddlMCompany').val();
    var ProcessId = $('#ddlMProcess').val();
    var UnitId = $('#ddlMUnit').val();
    var ProcessorId = $('#ddlMworkdiv').val();
    var ProdInvId = $('#ddlMEntryNo').val();
    var BuyId = $('#ddlMBuyer').val();

    var PType = $('input[name="optMPro"]:checked').attr('value');
    var OType = $('input[name="optMwrkord"]:checked').attr('value');

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

    var menufilter = OType + ',' + PType + ',' + comId + ',' + FDate + ',' + TDate + ',' + ProcessId + ',' + UnitId + ',' + ProcessorId + ',' + ProdInvId + ',' + OrdNo + ',' + RefNo + ',' + WorkNo ;
    localStorage.setItem('ProductionInvoiceMainFilter', menufilter);

    $.ajax({
        url: "/ProductionInvoice/GetMainLoad",
        data: JSON.stringify({ OrderType: OType, InternalOrExternal: PType, Companyid: comId, FromDate: FDate, ToDate: TDate, ProcessId: ProcessId, CompanyUnitId: UnitId, Processorid: ProcessorId, ProdInvid: ProdInvId, OrdNo: OrdNo, OrdRefNo: RefNo, WorkOrder: WorkNo }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {

            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");
            $('#tblmaindetails').DataTable({
                data: dataSet,
                scrollY: 200,
                scrollCollapse: true,
                paging: false,
                fixedColumns: false,
                select: false,
                scrollX: "100%",
                scrollXInner: "100%",
                scroller: false,
                columns: [
                         { title: "InvId", "visible": false },
                            { title: "Dc No" },
                         { title: "Entry No" },
                         { title: "Entry Date" },
                         { title: "Unit" },
                         { title: "Process" },
                         { title: "Processor" },
                         { title: "Type" },
                         { title: "Action" },

                ]

            });
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

function LoadMainGridFromBack() {
    debugger;
    var fill = localStorage.getItem('ProductionInvoiceMainFilter');
    var fillobj = [];
    fillobj = fill.split(",");

    $('#txtFromDate').val(fillobj[3]);
    $('#txtToDate').val(fillobj[4]);

    if (fillobj[1] == 'E') {
        $('#ME').prop('checked', true);
    } else {
        $('#MI').prop('checked', true);
    }

    if (fillobj[0] == 'W') {
        $('#MB').prop('checked', true);
    } else if (fillobj[0] == 'J') {
        $('#MJ').prop('checked', true);
    }
    else if (fillobj[0] == 'S') {
        $('#MS').prop('checked', true);
    }
  

    if (fillobj[9] == "undefined") {
        fillobj[9] = '';
    }
    if (fillobj[10] == "undefined") {
        fillobj[10] = '';
    }
    if (fillobj[11] == "undefined") {
        fillobj[11] = '';
    }
    if (fillobj[5] == "undefined") {
        fillobj[5] = 0;
    }
    if (fillobj[6] == "undefined") {
        fillobj[6] = 0;
    }
    if (fillobj[7] == "undefined") {
        fillobj[7] = 0;
    }
    if (fillobj[8] == "undefined") {
        fillobj[8] = 0;
    }

    $.ajax({
        url: "/ProductionInvoice/GetMainLoad",
        data: JSON.stringify({ OrderType: fillobj[0], InternalOrExternal: fillobj[1], Companyid: fillobj[2], FromDate: fillobj[3], ToDate: fillobj[4], ProcessId: fillobj[5], CompanyUnitId: fillobj[6], Processorid: fillobj[7], ProdInvid: fillobj[8], OrdNo: fillobj[9], OrdRefNo: fillobj[10], WorkOrder: fillobj[11] }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {

            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");
            $('#tblmaindetails').DataTable({
                data: dataSet,
                scrollY: 200,
                scrollCollapse: true,
                paging: false,
                fixedColumns: false,
                select: false,
                scrollX: "100%",
                scrollXInner: "100%",
                scroller: false,
                columns: [
                         { title: "InvId", "visible": false },
                            { title: "Dc No" },
                         { title: "Entry No" },
                         { title: "Entry Date" },
                         { title: "Unit" },
                         { title: "Process" },
                         { title: "Processor" },
                         { title: "Type" },
                         { title: "Action" },

                ]

            });
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

    function getbyID(Id) {

        PInvId = Id;
        $.ajax({
            url: "/ProductionInvoice/LoadEditProdInvDetails",
            data: JSON.stringify({ ProdInvid: Id }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {

                var obj = result.Value;
                debugger;
                if (obj != undefined) {

                    $('#txtcompany').val(obj[0]["Company"]);
                    $('#txtProcessor').val(obj[0]["Processor"]);
                    $('#txtEntryDate').val(moment(obj[0]["InvDate"]).format('DD/MM/YYYY')); 
                    $('#txtInvoiceDate').val(moment(obj[0]["RefDate"]).format('DD/MM/YYYY'));
                    $('#txtEntryno').val(obj[0]["InvNo"]);
                    $('#txtInvoiceNo').val(obj[0]["RefNo"]); 
                    $('#txtProcess').val(obj[0]["Process"]);
                    $('#txtUnit').val(obj[0]["CompanyUnit"]);
                    $('#txtRemarks').val(obj[0]["Remarks"]);
                    $('#txtEntryId').val(obj[0]["ProdInvid"]);
                    $('#txtProcessId').val(obj[0]["Processid"]);
                    $('#txtSuppId').val(obj[0]["Processorid"]);

                    CmpId = obj[0]["Companyid"];
                    SuppId = obj[0]["Processorid"];
                    OrdType = obj[0]["OrderType"];
                    ProcessId = obj[0]["Processid"];
                    ProdInvId = obj[0]["ProdInvid"];
                    UnitId = obj[0]["CompanyUnitId"];
                    ProType = obj[0]["InternalOrExternal"];                
                    IType = obj[0]["InvoiceType"];


                    if (ChkBillNo == "Y") {
                        $('#dptInvId').show();
                        $('#txtInvId').hide();
                        $('#optNewBill').show();
                    } else {
                        $('#txtInvId').show();
                        $('#dptInvId').hide();
                        $('#optNewBill').hide();
                    }

                    LoadProdInvPrnEdit(Id, CmpId, SuppId);
                    LoadProdInvAddlessEdit(Id);
                    LoadProdInvRateDiffEdit(Id);
                    EditLoadBillInvNoAmt(CmpId, SuppId);


                    $('#myModal').modal('hide');
                    $('#myModal1').modal('show');
                    $('#btnUpdate').show();
                    $('#btnAdd').hide();
                    $('#btnDel').hide();
                    if (obj[0]["Passed"] == 'Y') {
                        //alert('Bill pass are made for this entry,Cannot update the INVOICE...!');
                        var msg = 'Bill pass are made for this entry,Cannot update the INVOICE...!';
                        var flg = 4;
                        var mod = 1;
                        var ur = "";
                        AlartMessage(msg, flg, mod, ur);
                        $('#btnUpdate').attr("disabled", true);

                    } else if (obj[0]["Passed"] == 'N') {

                        $('#btnUpdate').attr("disabled", false);

                    }

                    var OrdType = $('input[name="optMwrkord"]:checked').attr('value');

                    if (OrdType == 'W') {
                        $('#optEW').prop('checked', true);
                    }
                    if (OrdType == 'J') {
                        $('#optEJ').prop('checked', true);
                    }
                    if (OrdType == 'S') {
                        $('#optES').prop('checked', true);
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

    function LoadProdInvPrnEdit(InvId, CompId, SuppId) {
        debugger;

        $.ajax({
            url: "/ProductionInvoice/GetInvPrdEditItemDetails",
            data: JSON.stringify({ Prodinvid: InvId, Companyid: CompId, Processorid: SuppId }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {

                PrdItemList = result;
                loadPrdItemTable(PrdItemList);
                var IId = 0;
                var CId = 0;
                var SId = 0;
                var PrdDtid = 0;

                ProdMasId = PrdItemList[0].prod_recpt_masid;

                LoadPdInvEditItemDetails(InvId, ProdMasId, CompId, SuppId);
                LoadPdInvEditOrderDetails(InvId, CompId, SuppId, IId, CId, SId, PrdDtid);

            },
            failure: function (errMsg) {
                alert(errMsg);
            }
        });
    }
    function LoadPdInvEditItemDetails(InvId, PrdMasId, CompId, SuppId) {
        debugger;

        $.ajax({
            url: "/ProductionInvoice/GetProdInvEditItemDetails",
            data: JSON.stringify({ ProdInvId: InvId, GrnMasid: PrdMasId, Companyid: CompId, Processorid: SuppId }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                PDESaveItemList = result;
                loadPDInvSaveItemTable(PDESaveItemList);

                        
                PrdnDetid = PDESaveItemList[0].Proc_Recpt_Detid;

                PDEItemList = PDESaveItemList;

                PDEItemList = $.grep(PDEItemList, function (v) {
                    return (v.GrnMasid === ProdMasId);
                });

                loadPDInvItemTable(PDEItemList);

                LoadNetGrossAmt();

            },
            failure: function (errMsg) {
                alert(errMsg);
            }
        });
    }

    function LoadPdInvEditOrderDetails(InvId, CompId, SuppId, ItmId, ClrId, SzId, PrdDtid) {
        debugger;

        $.ajax({
            url: "/ProductionInvoice/GetProdInvEditOrdDetails",
            data: JSON.stringify({ Prod_InvId: InvId, Companyid: CompId, Processorid: SuppId, Prod_recpt_DetId: PrdDtid }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {

                PDOSaveItemList = result;
                loadPDInvOrdSaveTable(PDOSaveItemList);

                PDOItemList = PDOSaveItemList;

                PDOItemList = $.grep(PDOItemList, function (v) {
                    return (v.Prod_recpt_DetId === PrdnDetid);
                });

                loadPDInvOrdTable(PDOItemList);
            },
            failure: function (errMsg) {
                alert(errMsg);
            }
        });
    }

    function LoadProdInvAddlessEdit(Id) {
        debugger;

        $.ajax({
            url: "/ProductionInvoice/GetProdInvEditAddLessDetails",
            data: JSON.stringify({ ProdInvId: Id }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {

                AccList = result;
                loadAccTable(AccList);

            },
            failure: function (errMsg) {
                alert(errMsg);
            }
        });
    }

    function LoadProdInvRateDiffEdit(Id) {
        debugger;

        $.ajax({
            url: "/ProductionInvoice/GetProdInvEditRateDiffDetails",
            data: JSON.stringify({ ProdInvId: Id }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {

                CreDebSaveList = result;
                loadCreDebSaveTable(CreDebSaveList);

                var masid = 0;
                if (PDESaveItemList.length > 0)
                {
                    masid = PDESaveItemList[0].GrnMasid;
                }

                CreDebList = $.grep(CreDebSaveList, function (v) {
                    return (v.Proc_Recpt_Masid === masid);
                });
                loadCreDebTable(CreDebList);
                // loadCreDebSaveTable(CreDebSaveList);

            },
            failure: function (errMsg) {
                alert(errMsg);
            }
        });
    }


    function Update() {
        debugger;
        var res = validate();
        if (res == false) {
            return false;
        }

        if (PDESaveItemList.length == 0) {
            //alert("Please Enter the Item Details..");
            var msg = 'Please Enter the Item Details...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
            return true;
        }

        //Check Qty
        var opchk = [];

        for (var y = 0; y < PDESaveItemList.length; y++) {
            if (PDESaveItemList[y].InvoiceQty > 0) {
                opchk.push(PDESaveItemList[y]);
            }
        }

        if (opchk.length == 0) {
            //alert('Please fill atleast any one invocie qty...');
            var msg = 'Please fill atleast any one invocie quantity...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
            return true;
        }


        var TotitemInvqty = 0;
        var TotordInvqty = 0;

        $.each(PDESaveItemList, function () {
            TotitemInvqty = parseFloat(TotitemInvqty) + parseFloat(this.InvoiceQty);
        });

        $.each(PDOSaveItemList, function () {
            TotordInvqty = parseFloat(TotordInvqty) + parseFloat(this.InvoiceQty);
        });


        if (TotitemInvqty.toFixed(3) != TotordInvqty.toFixed(3)) {
            //alert('Please Check Item and Order Inv Qty...');
            var msg = 'Please Check Item and Order Invoice quantity...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
            return true;
        }


        //Check Rate
        var opchk = [];

        for (var y = 0; y < PDESaveItemList.length; y++) {
            if (PDESaveItemList[y].InvoiceRate > 0) {
                opchk.push(PDESaveItemList[y]);
            }
        }

        if (opchk.length == 0) {
            //alert('Please fill atleast any one rate...');
            var msg = 'Please fill atleast any one rate...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
            return true;
        }




        var InvBillNo = 0;

        if (ChkBillNo == 'Y') {

            var CNetAmt = $('#txtNetAmount').val();

            if (CNetAmt != GBillAmount) {
                //alert("Bill Amount Should Match With Net Amount..");
                var msg = 'Bill Amount Should Match With Net Amount...';
                var flg = 4;
                var mod = 1;
                var ur = "";
                AlartMessage(msg, flg, mod, ur);
                return true;
            }
            InvBillNo = $('#ddlInvoiceNo option:selected').text();
        } else {

            InvBillNo = $('#txtInvoiceNo').val();
        }

        CreDebSaveList = $.grep(CreDebSaveList, function (v) {
            return (v.IsChecked === 'Y');
        });
        //var CmpId = 0;
        //var SuppId = 0;
        //var OrdType = 0;
        //var ProType = 0;
        //var ProcessId = 0;
        //var ProdInvId = 0;
        //var UnitId = 0;
        var OrdType = $('input[name="EOType"]:checked').attr('value');

        var objProdSubmit = {


            OrderType: OrdType,

            InvNo: $('#txtEntryno').val(),
            InvDate: $('#txtEntryDate').val(),//new Date($('#txtEntryDate').val()),
            InvAmount: $('#txtNetAmount').val(),
            RefNo: InvBillNo,
            RefDate: $('#txtInvoiceDate').val(),
            //InvNo: InvBillNo,
            //InvDate: $('#txtInvoiceDate').val(),//new Date($('#txtEntryDate').val()),
            //InvAmount: 0,
            //RefNo: $('#txtEntryno').val(),
            //RefDate: $('#txtEntryDate').val(),//new Date($('#txtInvoiceDate').val()),
            Remarks: $('#txtremarks').val(),
            PaymentAmt: 0,
            Paid: "N",
            Passed: "N",
            Processorid: $('#txtSuppId').val(),
            Processid: $('#txtProcessId').val(),
            Companyid: CmpId,
            CompanyUnitId: UnitId,
            InternalOrExternal: ProType,
            Approved: "N",
            CreatedBy: Guserid,
            ApprovedBy: Guserid,
            InvoiceType: IType,
            ProdInvid: $('#txtEntryId').val(),

            ProdInvDDet: PDESaveItemList,
            ProdInvOrdDDet: PDOSaveItemList,
            ProdInvDcDet: PrdItemList,
            ProdInvAL: AccList,
            ProdInvRDiff: CreDebSaveList,

        };
        debugger;
        $("#btnUpdate").attr("disabled", true);
        LoadingSymb();
        $.ajax({
            url: "/ProductionInvoice/Update",
            data: JSON.stringify(objProdSubmit),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {


                if (result.Value == true) {
                    AddUserEntryLog('PRODUCTION', 'Production Invoice', 'UPDATE', $("#txtEntryno").val());
                    //alert("Data Updated Sucessfully");
                    var msg = 'Data Updated Sucessfully...';
                    var flg = 1;
                    var mod = 0;
                    var ur = "";
                    AlartMessage(msg, flg, mod, ur);

                    $('#myModal1').modal('hide');
                    //window.location.reload();

                    ClearAddData();

                } else {

                    window.location.href = "/Error/Index";

                }


            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }


    function getDeleteID(Id) {
        PInvId = Id;
        $.ajax({
            url: "/ProductionInvoice/LoadEditProdInvDetails",
            data: JSON.stringify({ ProdInvid: Id }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {

                var obj = result.Value;
                debugger;
                if (obj != undefined) {

                    $('#txtcompany').val(obj[0]["Company"]);
                    $('#txtProcessor').val(obj[0]["Processor"]);
                    $('#txtEntryDate').val(moment(obj[0]["InvDate"]).format('DD/MM/YYYY'));
                    $('#txtInvoiceDate').val(moment(obj[0]["RefDate"]).format('DD/MM/YYYY'));
                    $('#txtEntryno').val(obj[0]["InvNo"]);
                    $('#txtInvoiceNo').val(obj[0]["RefNo"]);
                    $('#txtProcess').val(obj[0]["Process"]);
                    $('#txtUnit').val(obj[0]["CompanyUnit"]);
                    $('#txtRemarks').val(obj[0]["Remarks"]);
                    $('#txtEntryId').val(obj[0]["ProdInvid"]);


                    if (ChkBillNo == "Y") {
                        $('#dptInvId').show();
                        $('#txtInvId').hide();
                        $('#optNewBill').show();
                    } else {
                        $('#txtInvId').show();
                        $('#dptInvId').hide();
                        $('#optNewBill').hide();
                    }

                    CmpId = obj[0]["Companyid"];
                    SuppId = obj[0]["Processorid"];
                    OrdType = obj[0]["OrderType"];
                    ProcessId = obj[0]["ProcessId"];
                    ProdInvId = obj[0]["ProdInvid"];
               

                    UnitId = obj[0]["CompanyUnitId"];
                    ProType = obj[0]["InternalOrExternal"];
                    IType = obj[0]["InvoiceType"];
                    LoadProdInvPrnEdit(Id, CmpId, SuppId);
                    LoadProdInvAddlessEdit(Id);
                    LoadProdInvRateDiffEdit(Id);
                    EditLoadBillInvNoAmt(CmpId, SuppId);


                    $('#myModal').modal('hide');
                    $('#myModal1').modal('show');
                    $('#btnUpdate').hide();
                    $('#btnAdd').hide();
                    $('#btnDel').show();

                    if (obj[0]["Passed"] == 'Y') {
                        //alert('Bill pass are made for this entry,Cannot update the INVOICE...!');
                        var msg = 'Bill pass are made for this entry,Cannot Delete the INVOICE...!';
                        var flg = 4;
                        var mod = 1;
                        var ur = "";
                        AlartMessage(msg, flg, mod, ur);
                        $('#btnDel').attr("disabled", true);

                    } else if (obj[0]["Passed"] == 'N') {

                        $('#btnDel').attr("disabled", false);

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
    function Delete() {
        debugger;
        var res = validate();
        if (res == false) {
            return false;
        }

        if (PDESaveItemList.length == 0) {
            //alert("Please Enter the Item Details..");
            var msg = 'Please Enter the Item Details...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
            return true;
        }

        //Check Qty
        var opchk = [];

        for (var y = 0; y < PDESaveItemList.length; y++) {
            if (PDESaveItemList[y].InvoiceQty > 0) {
                opchk.push(PDESaveItemList[y]);
            }
        }

        if (opchk.length == 0) {
            //alert('Please fill atleast any one invocie qty...');
            var msg = 'Please fill atleast any one invoice quantity...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
            return true;
        }


        var TotitemInvqty = 0;
        var TotordInvqty = 0;

        $.each(PDESaveItemList, function () {
            TotitemInvqty = parseFloat(TotitemInvqty) + parseFloat(this.InvoiceQty);
        });

        $.each(PDOSaveItemList, function () {
            TotordInvqty = parseFloat(TotordInvqty) + parseFloat(this.InvoiceQty);
        });


        if (TotitemInvqty.toFixed(3) != TotordInvqty.toFixed(3)) {
            //alert('Please Check Item and Order Inv Qty...');
            var msg = 'Please Check Item and Order Invoice quantity...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
            return true;
        }


        //Check Rate
        var opchk = [];

        for (var y = 0; y < PDESaveItemList.length; y++) {
            if (PDESaveItemList[y].InvoiceRate > 0) {
                opchk.push(PDESaveItemList[y]);
            }
        }

        if (opchk.length == 0) {
            //alert('Please fill atleast any one rate...');
            var msg = 'Please fill atleast any one rate...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
            return true;
        }




        var InvBillNo = 0;

        if (ChkBillNo == 'Y') {

            var CNetAmt = $('#txtNetAmount').val();

            if (CNetAmt != GBillAmount) {
                //alert("Bill Amount Should Match With Net Amount..");
                var msg = 'Bill Amount Should Match With Net Amount...';
                var flg = 4;
                var mod = 1;
                var ur = "";
                AlartMessage(msg, flg, mod, ur);
                return true;
            }
            InvBillNo = $('#ddlInvoiceNo option:selected').text();
        } else {

            InvBillNo = $('#txtInvoiceNo').val();
        }

        CreDebSaveList = $.grep(CreDebSaveList, function (v) {
            return (v.IsChecked === 'Y');
        });

        //var CmpId = 0;
        //var SuppId = 0;
        //var OrdType = 0;
        //var ProType = 0;
        //var ProcessId = 0;
        //var ProdInvId = 0;
        //var UnitId = 0;

        var objProdSubmit = {


            OrderType: OrdType,
            InvNo: $('#txtEntryno').val(),
            InvDate: $('#txtEntryDate').val(),//new Date($('#txtEntryDate').val()),
            InvAmount: 0,
            RefNo: InvBillNo,
            RefDate: $('#txtInvoiceDate').val(),//new Date($('#txtInvoiceDate').val()),
            Remarks: $('#txtremarks').val(),
            PaymentAmt: 0,
            Paid: "N",
            Passed: "N",
            Processorid: SuppId,
            Processid: ProcessId,
            Companyid: CmpId,
            CompanyUnitId: UnitId,
            InternalOrExternal: ProType,
            Approved: "N",
            CreatedBy: Guserid,
            ApprovedBy: Guserid,
            InvoiceType: IType,
            ProdInvid: $('#txtEntryId').val(),

            ProdInvDDet: PDESaveItemList,
            ProdInvOrdDDet: PDOSaveItemList,
            ProdInvDcDet: PrdItemList,
            ProdInvAL: AccList,
            ProdInvRDiff: CreDebSaveList,

        };
        debugger;
        $("#btnDel").attr("disabled", true);
        LoadingSymb();
        $.ajax({
            url: "/ProductionInvoice/Delete",
            data: JSON.stringify(objProdSubmit),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {


                if (result.Value == true) {
                    AddInvBillNo("N");
                    AddUserEntryLog('PRODUCTION', 'Production Invoice', 'DELETE', $("#txtEntryno").val());
                    //alert("Data Deleted Sucessfully");
                    var msg = 'Data Deleted Sucessfully...';
                    var flg = 2;
                    var mod = 0;
                    var ur = "";
                    AlartMessage(msg, flg, mod, ur);

                    $('#myModal1').modal('hide');
                    //window.location.reload();

                    ClearAddData();

                } else {

                    window.location.href = "/Error/Index";

                }


            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }

    function LoadBillInvNo(comid, suppid) {

        var EDate = $('#txtEntryDate').val();
        var billid = 0;
        var IorE = $('input[name="optPro"]:checked').attr('value');
        $.ajax({
            url: "/ProcessInvoice/GetBillInvNo",
            data: JSON.stringify({ CompanyId: comid, SupplierId: suppid, Inv_Date: EDate, BillId: billid, IorE: IorE }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",

            success: function (result) {
                var obj = result.Value;

                //GBillAmount = obj[0]["Inv_Amount"];
                //GBillDate = obj[0]["Inv_Date"];


                if (result.Status == 'SUCCESS') {

                    var data = result.Value;
                    $(ddlInvoiceNo).empty();

                    $(ddlInvoiceNo).append($('<option/>').val('0').text('--Select Bill No--'));
                    $.each(data, function () {
                        $(ddlInvoiceNo).append($('<option></option>').val(this.BillId).text(this.Inv_No));
                    });

                }
            }

        });

    }

    function LoadBillInvNoAmt() {
        debugger;
        var EDate = $('#txtEntryDate').val();
        var billid = $('select#ddlInvoiceNo option:selected').val();//$('#ddlInvoiceNo').val();
        $.ajax({
            url: "/ProcessInvoice/GetBillInvNo",
            data: JSON.stringify({ CompanyId: GCompId, SupplierId: GSuppId, Inv_Date: EDate, BillId: billid }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",

            success: function (result) {
                var obj = result.Value;
                if (billid > 0) {
                    if (obj != undefined) {

                        GBillAmount = obj[0]["Inv_Amount"];
                        GBillDate = (moment(obj[0]["Inv_Date"]).format('DD/MM/YYYY'));

                        $('#txtInvoiceAmt').val(GBillAmount);

                    }
                    else {

                    }
                } else {

                    GBillAmount = 0;
                    $('#txtInvoiceAmt').val(GBillAmount);
                    GBillDate = "";

                }

            }

        });

    }

    function EditLoadBillInvNoAmt(GCompId, GSuppId) {
        debugger;
        var EDate = $('#txtEntryDate').val();
        var entryno = $('#txtEntryno').val();//$('#ddlInvoiceNo').val();

        $.ajax({
            url: "/ProcessInvoice/GetEditBillInvNo",
            data: JSON.stringify({ CompanyId: GCompId, SupplierId: GSuppId, Inv_Date: EDate, Entry_No: entryno }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",

            success: function (result) {
                var obj = result.Value;

                if (result.Status == 'SUCCESS') {

                    var data = result.Value;
                    $(ddlInvoiceNo).empty();

                    // $(ddlInvoiceNo).append($('<option/>').val('0').text('--Select Bill No--'));
                    $.each(data, function () {
                        $(ddlInvoiceNo).append($('<option></option>').val(this.BillId).text(this.Inv_No));
                    });
                    if (obj.length > 0) {
                        GBillAmount = obj[0]["Inv_Amount"];
                        GBillDate = (moment(obj[0]["Inv_Date"]).format('DD/MM/YYYY'));

                        $('#txtInvoiceAmt').val(GBillAmount);
                    }
                }

            }

        });

    }

    function LoadNewBill() {

        var ischecked = false;
        $(":checkbox").each(function () {
            ischecked = $('#chkbillStatus').is(":checked");
            if (ischecked == true) {
                LoadBillInvNo(CmpId, SuppId);
            }
            else {
                EditLoadBillInvNoAmt(CmpId, SuppId);
            }
        });
    }

    function LoadNetGrossAmt() {
        debugger;

        var totalamnt = 0;
        if (PDEItemList.length > 0) {
            for (var e = 0; e < PDEItemList.length; e++) {
                var amount = PDEItemList[e].Amount;
                totalamnt = totalamnt + parseFloat(amount);

            }
   

            var totalamnt1 = 0;
            var totalamnt2 = 0;
            for (var e = 0; e < PDEItemList.length; e++) {
                var amount1 = PDEItemList[e].Amount;
                var amount2 = PDEItemList[e].InvoiceQty;
                totalamnt1 = totalamnt1 + parseFloat(amount1);
                totalamnt2 = totalamnt2 + parseFloat(amount2);

            }
            $('#txtTotalamount').val(totalamnt1.toFixed(3));

            $('#txtTotalQty').val(totalamnt2.toFixed(3));
        }



        var TotNetAmt = 0;
        var TotGrossAmt = 0;

        $.each(PDESaveItemList, function (i) {
            var InvAmt = PDESaveItemList[i].Amount;
            TotGrossAmt = parseFloat(TotGrossAmt) + parseFloat(InvAmt);
        });


        if (AccList.length > 0) {
            var plusamt = 0;
            var minusamt = 0;

            $.each(AccList, function (i) {

                var Percentage = parseFloat(AccList[i].percentage);
                var PlusOrMinus = AccList[i].aorl;

                if (PlusOrMinus == '+') {
                    var Amt = parseFloat(AccList[i].amount);
                    plusamt = parseFloat(plusamt) + Amt;
                }
                if (PlusOrMinus == '-') {
                    var Amt = parseFloat(AccList[i].amount);
                    minusamt = parseFloat(minusamt) + Amt;
                }

            })

            TotNetAmt = TotGrossAmt;
            TotNetAmt = TotNetAmt + plusamt;
            TotNetAmt = TotNetAmt - minusamt;

            TotNetAmt = parseFloat(TotNetAmt).toFixed(3);
            $('#txtNetAmount').val(TotNetAmt);
            $('#txtNNetamount').val(TotNetAmt);
        }
        else {
            TotGrossAmt = parseFloat(TotGrossAmt).toFixed(3);
            $('#txtNetAmount').val(TotGrossAmt);
            $('#txtNNetamount').val(TotGrossAmt);
        }
        TotGrossAmt = parseFloat(TotGrossAmt).toFixed(3);
        $('#txtGrossamount').val(TotGrossAmt); 
        $('#txtgrossamt').val(TotGrossAmt);
    }

    function AddInvBillNo(MType) {
        debugger;
        var billId = $('#ddlInvoiceNo option:selected').val();
        var EntryNo = $('#txtEntryno').val();
        $.ajax({
            url: "/ProcessInvoice/BillAdd",
            data: JSON.stringify({ billId: billId, EntryNo: EntryNo, MType: MType }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {

                if (result.Value == true) {


                } else {

                    window.location.href = "/Error/Index";

                }


            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }

    function ProcessInvPrint(Id) {
        debugger;

        Repid = Id;
        $('#myModal2').modal('show');

        docname = "PRODUCTION INVOICE";
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
                var size = {setupid: 0, optionid: 1, option: 'Size', optionvalue: false}
                repobj.push(size);
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

        var comp = $('#ddlMCompany').val();
        if (comp != null) {
            window.open("../ReportInline/Production/ProductionInvoice/ProductionInvoiceReportInline.aspx?Masid=" + Repid + "&OrdRefNo=" + p[0] + "&Remarks=" + p[1] + "&EWayBill=" + p[2] + "&Ewaydate=" + p[3] + "&Companyid=" + comp + "&Type=" + "P" + "&Size=" + p[4]);
        }

    }