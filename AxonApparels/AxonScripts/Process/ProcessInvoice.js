
var Userid = 0;
var UserName = 0;
var AItemList = [];
var MGRowID = 0;
var PrnMasId = 0;
var PrnDetid = 0;
var PEItemList = [];
var PESaveItemList = [];
var POItemList = [];
var POSaveItemList = [];
var PrnItemList = [];
var AccList = [];
var GrossAmt = 0;
var ANAmt = 0;
var GInvId = 0;
var GAddAmt = 0;
var PInvId = 0;
var CreDebList = [];
var CreDebSaveList = [];

var CmpId = 0;
var SuppId = 0;
var OrdType = 0;
var ProType = 0;
var ProcessId = 0;
var ProcessInvId = 0;
var UnitId = 0;
var MainFDate = 0;
var repobj = [];
var Repid = 0;
var Guserid = 0;
var DCompid = 0;
var ChkBillNo = 0;
var GBillAmount = 0;
var GBillDate = 0;
var GCompId = 0;
var GSuppId = 0;
var chkBudRateBulk = "False";
var chkBudRateSample = "False";
var AddlessId = 0;

$(document).ready(function () {
    debugger;


    Guserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    MainFDate = $("#hdMainFromDate").data('value');
    DCompid = $("#hdnDCompid").data('value');
    ChkBillNo = $("#hdncheckBillsToInvoiceEntry").data('value');
    chkBudRateBulk = $("#hdnValidateBudRateinProinvBulk").data('value');
    chkBudRateSample = $("#hdnValidateBudRateinProinvSample").data('value');
    ValidateProcessGRNqty = $("#hdnValidateProcessGRNqty").data('value');
    LoadCompanyDDL("#ddlACompany,#ddlMCompany");
    LoadCompanyUnitDDL("#ddlAUnit");
    LoadProcessDDL("#ddlAProcess");
    LoadRefNoDDL("#ddlARefNo");
    LoadOrderNoDDL("#ddlAOrdNo");
    LoadAddlessDDL("#ddlAcc");
    getDate();

    LoadMPrnNo();
    LoadMEntryNo();
    LoadMProcessor();
    LoadMOrderRef();
    LoadMProcess();
    LoadMUnit();
    var fill = localStorage.getItem('ProcessInvoiceMainFilter');
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




  
    $(document).on('change', '.calcQty', function () {
        debugger;
        var table = $('#tblPItemdetails').DataTable();

        var CSno = table.row($(this).parents('tr')).data()["Proc_Recpt_Detid"];

        var Balance = table.row($(this).parents('tr')).data()["BalQty"];
        var Balqty = table.row($(this).parents('tr')).data()["BalQty"];
        var OrdQty = table.row($(this).parents('tr')).data()["OrdQty"];
        var ValidateProcessQty = table.row($(this).parents('tr')).data()["ValidateProcessQty"];
        var Val = $(this).val();
        var debqty = 0;

        if (ValidateProcessQty == "True") {

            if (Val > OrdQty) {
                //alert("Invoice are not more then order qty..");
                var msg = 'Invoice are not more then order quantity...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);

                $.each(PEItemList, function () {
                    if (this.Proc_Recpt_Detid == CSno) {
                        this.Invoice_Qty = 0;
                    }
                });
                // loadPInvItemTable(PEItemList);

                var table = $('#tblPItemdetails').DataTable();
                var ecdata = table.rows().data();
                debugger;
                $('input[id=txtOQty]').each(function (ig) {

                    var row = $(this).closest('tr');
                    for (var h = 0; h < PEItemList.length; h++) {
                        debugger;
                        if (ecdata[ig].Proc_Recpt_Detid == PEItemList[h].Proc_Recpt_Detid && ecdata[ig].Proc_Recpt_Detid == CSno) {

                            var Invoice_Qty = PEItemList[h].Invoice_Qty;
                          
                            row.find('#txtOQty').focus().val('').val(Invoice_Qty);
                            return true;
                        }
                    }

                });
               

                $.each(PESaveItemList, function () {
                    if (this.Proc_Recpt_Detid == CSno) {
                        this.Invoice_Qty = 0;
                    }
                });
                loadPInvSaveItemTable(PESaveItemList);


                //job table
                $.each(POItemList, function () {
                    if (this.Process_recpt_DetId == CSno) {
                        this.InvoiceQty = 0;
                    }
                });
                // loadPInvOrdTable(POItemList);

                var table = $('#tblPInvOrddetails').DataTable();
                var ecdata = table.rows().data();
                debugger;
                $('input[id=txtOPQty]').each(function (ig) {

                    var row = $(this).closest('tr');
                    for (var h = 0; h < POItemList.length; h++) {
                        debugger;
                        if (ecdata[ig].Process_recpt_DetId == POItemList[h].Process_recpt_DetId && ecdata[ig].Process_recpt_DetId == CSno && ecdata[ig].Process_recpt_JobDetId == POItemList[h].Process_recpt_JobDetId) {

                            var Invoice_Qty = POItemList[h].InvoiceQty;

                            row.find('#txtOPQty').val(Invoice_Qty);
                            return true;
                        }
                    }

                });



                $.each(POSaveItemList, function () {
                    if (this.Process_recpt_DetId == CSno) {
                        this.InvoiceQty = 0;
                    }
                });
                loadPInvOrdSaveTable(POSaveItemList);

                //
                return true;
            } else {
                $.each(PEItemList, function () {
                    if (this.Proc_Recpt_Detid == CSno) {
                        this.Invoice_Qty = Val;
                    }
                });
                //loadPInvItemTable(PEItemList);

                var table = $('#tblPItemdetails').DataTable();
                var ecdata = table.rows().data();
                debugger;
                $('input[id=txtOQty]').each(function (ig) {

                    var row = $(this).closest('tr');
                    for (var h = 0; h < PEItemList.length; h++) {
                        debugger;
                        if (ecdata[ig].Proc_Recpt_Detid == PEItemList[h].Proc_Recpt_Detid && ecdata[ig].Proc_Recpt_Detid == CSno) {

                            var Invoice_Qty = PEItemList[h].Invoice_Qty;

                            row.find('#txtOQty').focus().val('').val(Invoice_Qty);
                            return true;
                        }
                    }

                });

                $.each(PESaveItemList, function () {
                    if (this.Proc_Recpt_Detid == CSno) {
                        this.Invoice_Qty = Val;
                    }
                });
                loadPInvSaveItemTable(PESaveItemList);

                var pid = [];
                var bal = [];
                var qty = [];
                for (var t = 0; t < POSaveItemList.length; t++) {
                    if (POSaveItemList[t].Process_recpt_DetId == CSno) {
                        pid.push(POSaveItemList[t].Process_recpt_JobDetId);
                        bal.push(POSaveItemList[t].RecQty);
                        qty.push(POSaveItemList[t].InvoiceQty);
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
                for (var u = 0; u < POSaveItemList.length; u++) {
                    for (var r = 0; r < pid.length; r++) {
                        if (POSaveItemList[u].Process_recpt_JobDetId == pid[r]) {
                            POSaveItemList[u].InvoiceQty = qty[r];
                        }
                    }
                }

                loadPInvOrdSaveTable(POSaveItemList);

                POItemList = $.grep(POSaveItemList, function (v) {
                    return (v.Process_recpt_DetId === CSno);
                });

                // loadPInvOrdTable(POItemList);


                var table = $('#tblPInvOrddetails').DataTable();
                var ecdata = table.rows().data();
                debugger;
                $('input[id=txtOPQty]').each(function (ig) {

                    var row = $(this).closest('tr');
                    for (var h = 0; h < POItemList.length; h++) {
                        debugger;
                        if (ecdata[ig].Process_recpt_DetId == POItemList[h].Process_recpt_DetId && ecdata[ig].Process_recpt_DetId == CSno && ecdata[ig].Process_recpt_JobDetId == POItemList[h].Process_recpt_JobDetId) {

                            var Invoice_Qty = POItemList[h].InvoiceQty;

                            row.find('#txtOPQty').val(Invoice_Qty);
                            return true;
                        }
                    }

                });

            }
        } else {

            if (ValidateProcessGRNqty == 'True') {
                if (Val > Balqty) {
                    //alert("Invoice are not more then Balance qty..");
                    var msg = 'Invoice are not more then Balance quantity...';
                    var flg = 4;
                    var mod = 1;
                    var url = "";
                    AlartMessage(msg, flg, mod, url);

                    $.each(PEItemList, function () {
                        if (this.Proc_Recpt_Detid == CSno) {
                            this.Invoice_Qty = 0;
                        }
                    });
                    // loadPInvItemTable(PEItemList);

                    var table = $('#tblPItemdetails').DataTable();
                    var ecdata = table.rows().data();
                    debugger;
                    $('input[id=txtOQty]').each(function (ig) {

                        var row = $(this).closest('tr');
                        for (var h = 0; h < PEItemList.length; h++) {
                            debugger;
                            if (ecdata[ig].Proc_Recpt_Detid == PEItemList[h].Proc_Recpt_Detid && ecdata[ig].Proc_Recpt_Detid == CSno) {

                                var Invoice_Qty = PEItemList[h].Invoice_Qty;

                                row.find('#txtOQty').focus().val('').val(Invoice_Qty);
                                return true;
                            }
                        }

                    });

                    $.each(PESaveItemList, function () {
                        if (this.Proc_Recpt_Detid == CSno) {
                            this.Invoice_Qty = 0;
                        }
                    });
                    loadPInvSaveItemTable(PESaveItemList);


                    //job table
                    $.each(POItemList, function () {
                        if (this.Process_recpt_DetId == CSno) {
                            this.InvoiceQty = 0;
                        }
                    });
                    //loadPInvOrdTable(POItemList);

                    var table = $('#tblPInvOrddetails').DataTable();
                    var ecdata = table.rows().data();
                    debugger;
                    $('input[id=txtOPQty]').each(function (ig) {

                        var row = $(this).closest('tr');
                        for (var h = 0; h < POItemList.length; h++) {
                            debugger;
                            if (ecdata[ig].Process_recpt_DetId == POItemList[h].Process_recpt_DetId && ecdata[ig].Process_recpt_DetId == CSno && ecdata[ig].Process_recpt_JobDetId == POItemList[h].Process_recpt_JobDetId) {

                                var Invoice_Qty = POItemList[h].InvoiceQty;

                                row.find('#txtOPQty').val(Invoice_Qty);
                                return true;
                            }
                        }

                    });

                    $.each(POSaveItemList, function () {
                        if (this.Process_recpt_DetId == CSno) {
                            this.InvoiceQty = 0;
                        }
                    });
                    loadPInvOrdSaveTable(POSaveItemList);
                    //

                    return true;
                } else {
                    $.each(PEItemList, function () {
                        if (this.Proc_Recpt_Detid == CSno) {
                            this.Invoice_Qty = Val;
                        }
                    });
                    // loadPInvItemTable(PEItemList);


                    var table = $('#tblPItemdetails').DataTable();
                    var ecdata = table.rows().data();
                    debugger;
                    $('input[id=txtOQty]').each(function (ig) {

                        var row = $(this).closest('tr');
                        for (var h = 0; h < PEItemList.length; h++) {
                            debugger;
                            if (ecdata[ig].Proc_Recpt_Detid == PEItemList[h].Proc_Recpt_Detid && ecdata[ig].Proc_Recpt_Detid == CSno) {

                                var Invoice_Qty = PEItemList[h].Invoice_Qty;

                                row.find('#txtOQty').focus().val('').val(Invoice_Qty);
                                return true;
                            }
                        }

                    });

                    $.each(PESaveItemList, function () {
                        if (this.Proc_Recpt_Detid == CSno) {
                            this.Invoice_Qty = Val;
                        }
                    });
                    loadPInvSaveItemTable(PESaveItemList);

                    var pid = [];
                    var bal = [];
                    var qty = [];
                    for (var t = 0; t < POSaveItemList.length; t++) {
                        if (POSaveItemList[t].Process_recpt_DetId == CSno) {
                            pid.push(POSaveItemList[t].Process_recpt_JobDetId);
                            bal.push(POSaveItemList[t].RecQty);
                            qty.push(POSaveItemList[t].InvoiceQty);
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
                    for (var u = 0; u < POSaveItemList.length; u++) {
                        for (var r = 0; r < pid.length; r++) {
                            if (POSaveItemList[u].Process_recpt_JobDetId == pid[r]) {
                                POSaveItemList[u].InvoiceQty = qty[r];
                            }
                        }
                    }

                    loadPInvOrdSaveTable(POSaveItemList);

                    POItemList = $.grep(POSaveItemList, function (v) {
                        return (v.Process_recpt_DetId === CSno);
                    });

                    //loadPInvOrdTable(POItemList);

                    var table = $('#tblPInvOrddetails').DataTable();
                    var ecdata = table.rows().data();
                    debugger;
                    $('input[id=txtOPQty]').each(function (ig) {

                        var row = $(this).closest('tr');
                        for (var h = 0; h < POItemList.length; h++) {
                            debugger;
                            if (ecdata[ig].Process_recpt_DetId == POItemList[h].Process_recpt_DetId && ecdata[ig].Process_recpt_DetId == CSno && ecdata[ig].Process_recpt_JobDetId == POItemList[h].Process_recpt_JobDetId) {

                                var Invoice_Qty = POItemList[h].InvoiceQty;

                                row.find('#txtOPQty').val(Invoice_Qty);
                                return true;
                            }
                        }

                    });

                }
            } else {

                $.each(PEItemList, function () {
                    if (this.Proc_Recpt_Detid == CSno) {

                        if (Val > Balqty) {
                            this.Invoice_Qty = Balqty;
                            debqty = parseFloat(Val )- parseFloat(Balqty);
                        } else {

                            this.Invoice_Qty = Val;
                        }


                        
                    }
                });
                // loadPInvItemTable(PEItemList);


                var table = $('#tblPItemdetails').DataTable();
                var ecdata = table.rows().data();
                debugger;
                $('input[id=txtOQty]').each(function (ig) {

                    var row = $(this).closest('tr');
                    for (var h = 0; h < PEItemList.length; h++) {
                        debugger;
                        if (ecdata[ig].Proc_Recpt_Detid == PEItemList[h].Proc_Recpt_Detid && ecdata[ig].Proc_Recpt_Detid == CSno) {

                            var Invoice_Qty = PEItemList[h].Invoice_Qty;

                            row.find('#txtOQty').focus().val('').val(Invoice_Qty);
                            return true;
                        }
                    }

                });

                $.each(PESaveItemList, function () {
                    if (this.Proc_Recpt_Detid == CSno) {

                        if (Val > Balqty) {
                            this.Invoice_Qty = Balqty;
                            debqty = parseFloat(Val) - parseFloat(Balqty);
                        } else {

                            this.Invoice_Qty = Val;
                        }
                    }
                });
                loadPInvSaveItemTable(PESaveItemList);

                var pid = [];
                var bal = [];
                var qty = [];
                for (var t = 0; t < POSaveItemList.length; t++) {
                    if (POSaveItemList[t].Process_recpt_DetId == CSno) {
                        pid.push(POSaveItemList[t].Process_recpt_JobDetId);
                        bal.push(POSaveItemList[t].RecQty);
                        qty.push(POSaveItemList[t].InvoiceQty);
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
                for (var u = 0; u < POSaveItemList.length; u++) {
                    for (var r = 0; r < pid.length; r++) {
                        if (POSaveItemList[u].Process_recpt_JobDetId == pid[r]) {
                            POSaveItemList[u].InvoiceQty = qty[r];
                        }
                    }
                }

                loadPInvOrdSaveTable(POSaveItemList);

                POItemList = $.grep(POSaveItemList, function (v) {
                    return (v.Process_recpt_DetId === CSno);
                });

                //loadPInvOrdTable(POItemList);

                var table = $('#tblPInvOrddetails').DataTable();
                var ecdata = table.rows().data();
                debugger;
                $('input[id=txtOPQty]').each(function (ig) {

                    var row = $(this).closest('tr');
                    for (var h = 0; h < POItemList.length; h++) {
                        debugger;
                        if (ecdata[ig].Process_recpt_DetId == POItemList[h].Process_recpt_DetId && ecdata[ig].Process_recpt_DetId == CSno && ecdata[ig].Process_recpt_JobDetId == POItemList[h].Process_recpt_JobDetId) {

                            var Invoice_Qty = POItemList[h].InvoiceQty;

                            row.find('#txtOPQty').val(Invoice_Qty);
                            return true;
                        }
                    }

                });



            }
        }

        var table = $('#tblPItemdetails').DataTable();

        //CreditDebit

        var Itm = table.row($(this).parents('tr')).data()["Item"];
        var Clr = table.row($(this).parents('tr')).data()["Color"];
        var Size = table.row($(this).parents('tr')).data()["Size"];
        var Invqty = table.row($(this).parents('tr')).data()["Invoice_Qty"];
        var Rate = table.row($(this).parents('tr')).data()["Rate"];
        var Masid = table.row($(this).parents('tr')).data()["Proc_Recpt_Masid"];
        var Grnrate = table.row($(this).parents('tr')).data()["GrnRate"];
        var Balqty = table.row($(this).parents('tr')).data()["BalQty"];
        var Grn = table.row($(this).parents('tr')).data()["Proc_recpt_no"];

        var difrate = parseFloat(Rate - Grnrate).toFixed(2);
        var damnt = parseFloat(difrate * Invqty).toFixed(2);

        if (debqty > 0) {
            var qtydif = debqty;
        }else{
            var qtydif = parseFloat(Invqty - Balqty);
         }
        var qtyamnt = parseFloat(qtydif * Rate).toFixed(2);
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
                Grnno: Grn,
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
                    Grnno: Grn,
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
        $.each(PEItemList, function () {
            if (this.Proc_Recpt_Detid == CSno) {
                var amt = parseFloat(this.Invoice_Qty * this.Rate).toFixed(2);
                //this.Amount = this.Invoice_Qty * this.Rate;
                this.Amount = amt;
            }
        });
        //loadPInvItemTable(PEItemList);


        var table = $('#tblPItemdetails').DataTable();
        var ecdata = table.rows().data();
        debugger;
        $('input[id=txtAMT]').each(function (ig) {

            var row = $(this).closest('tr');
            for (var h = 0; h < PEItemList.length; h++) {
                debugger;
                if (ecdata[ig].Proc_Recpt_Detid == PEItemList[h].Proc_Recpt_Detid && ecdata[ig].Proc_Recpt_Detid == CSno) {

                    var Amount = PEItemList[h].Amount;

                    row.find('#txtAMT').val(Amount);
                    return true;
                }
            }

        });


        $.each(PESaveItemList, function () {
            if (this.Proc_Recpt_Detid == CSno) {
                var amt = parseFloat(this.Invoice_Qty * this.Rate).toFixed(2);
                //this.Amount = this.Invoice_Qty * this.Rate;
                this.Amount = amt;
            }
        });

        var total = 0;
        for (var e = 0; e < PESaveItemList.length; e++) {
            var amount = PESaveItemList[e].Amount;
            total = total + parseFloat(amount);
        }

        $('#txtTotalamount').val(total);

        var totalqty = 0;
        for (var e = 0; e < PESaveItemList.length; e++) {
            var amount = PESaveItemList[e].Invoice_Qty;
            totalqty = totalqty + parseFloat(amount);
        }

        $('#txtTotalQty').val(totalqty);

        ////Datatable textbox focus
        //var rows = $("#tblPItemdetails").dataTable().fnGetNodes();
        //var dtTable = $('#tblPItemdetails').DataTable();
        //for (var i = 0; i < rows.length; i++) {
        //    var sn = dtTable.cells({ row: i, column: 12 }).data()[0];
        //    $('input[id=txtOQty]').each(function () {
        //        if (sn == CSno && $(this).val() == Val) {
        //            var row = $(this).closest('tr');
        //            var num = row.find('#txtOQty').val();
        //            row.find('#txtOQty').focus().val('').val(num);
        //            return true;
        //        }
        //    });
        //}
        LoadNetGrossAmt();

        //Datatable textbox focus
        var otable = $('#tblPItemdetails').DataTable();
        var odata = otable.rows().data();

        $('input[id=txtOQty]').each(function (ig) {
            if (odata[ig].Proc_Recpt_Detid == CSno) {
                var row = $(this).closest('tr');
                var num = row.find('#txtOQty').val();
                row.find('#txtOQty').focus().val('').val(num);
            }
        });


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

    $(document).on('keyup', '.calcRate', function () {
        debugger;
        var table = $('#tblPItemdetails').DataTable();

        var CSno = table.row($(this).parents('tr')).data()["Proc_Recpt_Detid"];
        //var AppRate = table.row($(this).parents('tr')).data()["AppRate"];
        var AppRate = 0;
        $.each(PEItemList, function () {
            if (this.Proc_Recpt_Detid == CSno) {
                AppRate = this.AppRate;
            }
        });

        var Val = $(this).val();

        var OrdType = $('input[name="MSType"]:checked').attr('value');

        if (OrdType == 'M') {
            if (chkBudRateBulk == "True") {
                if (Val > AppRate) {
                    //alert('Rate should not be greater than Budget Rate ..');
                    var msg = 'Rate should not be greater than Budget Rate...';
                    var flg = 4;
                    var mod = 1;
                    var url = "";
                    AlartMessage(msg, flg, mod, url);
                    Val = 0;
                }
            }
        }
        else if (OrdType == 'S') {

            if (chkBudRateSample == "True") {
                if (Val > AppRate) {
                    //alert('Rate should not be greater than Budget Rate ..');
                    var msg = 'Rate should not be greater than Budget Rate ...';
                    var flg = 4;
                    var mod = 1;
                    var url = "";
                    AlartMessage(msg, flg, mod, url);
                    Val = 0;
                }
            }
        }


        $.each(PEItemList, function () {
            if (this.Proc_Recpt_Detid == CSno) {
                this.Rate = Val;
            }
        });
       // loadPInvItemTable(PEItemList);


        var table = $('#tblPItemdetails').DataTable();
        var ecdata = table.rows().data();
        debugger;
        $('input[id=txtRate]').each(function (ig) {

            var row = $(this).closest('tr');
            for (var h = 0; h < PEItemList.length; h++) {
                debugger;
                if (ecdata[ig].Proc_Recpt_Detid == PEItemList[h].Proc_Recpt_Detid && ecdata[ig].Proc_Recpt_Detid == CSno) {

                    var Rate = PEItemList[h].Rate;

                    row.find('#txtRate').focus().val('').val(Rate);
                    
                    return false;
                }
            }

        });



        $.each(PESaveItemList, function () {
            if (this.Proc_Recpt_Detid == CSno) {
                this.Rate = Val;
            }
        });
        loadPInvSaveItemTable(PESaveItemList);



        //CreditDebit

        var Itm = table.row($(this).parents('tr')).data()["Item"];
        var Clr = table.row($(this).parents('tr')).data()["Color"];
        var Size = table.row($(this).parents('tr')).data()["Size"];
        var Invqty = table.row($(this).parents('tr')).data()["Invoice_Qty"];
        var Rate = table.row($(this).parents('tr')).data()["Rate"];
        var Masid = table.row($(this).parents('tr')).data()["Proc_Recpt_Masid"];
        var Grn = table.row($(this).parents('tr')).data()["Proc_recpt_no"];
        var Grnrate = table.row($(this).parents('tr')).data()["GrnRate"];
        var Balqty = table.row($(this).parents('tr')).data()["BalQty"];

        var difrate = parseFloat(Rate - Grnrate).toFixed(2);
        var damnt = parseFloat(difrate * Invqty).toFixed(2);
        var qtydif = parseFloat(Invqty - Balqty).toFixed(2);
        var qtyamnt = parseFloat(qtydif * Rate).toFixed(2);

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
                Grnno: Grn,
                Date: 66,

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
                    Grnno: Grn,
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
        $.each(PEItemList, function () {
            if (this.Proc_Recpt_Detid == CSno) {
                var amt = parseFloat(this.Invoice_Qty * this.Rate).toFixed(2);
                //this.Amount = this.Invoice_Qty * this.Rate;
                this.Amount = amt;
               
            }
        });
        //loadPInvItemTable(PEItemList);

        var table = $('#tblPItemdetails').DataTable();
        var ecdata = table.rows().data();
        debugger;
        $('input[id=txtAMT]').each(function (ig) {

            var row = $(this).closest('tr');
            for (var h = 0; h < PEItemList.length; h++) {
                debugger;
                if (ecdata[ig].Proc_Recpt_Detid == PEItemList[h].Proc_Recpt_Detid && ecdata[ig].Proc_Recpt_Detid == CSno) {

                    var Amount = PEItemList[h].Amount;

                    row.find('#txtAMT').val(Amount);
                    return true;
                }
            }

        });


        $.each(PESaveItemList, function () {
            if (this.Proc_Recpt_Detid == CSno) {
                var amt = parseFloat(this.Invoice_Qty * this.Rate).toFixed(2);
                //this.Amount = this.Invoice_Qty * this.Rate;
                this.Amount = amt;
            }
        });

        var total = 0;
        for (var e = 0; e < PESaveItemList.length; e++) {
            var amount = PESaveItemList[e].Amount;
            total = total + parseFloat(amount);
        }

        $('#txtTotalamount').val(total);
        //$('#txtNetAmount').val(total);
        LoadNetGrossAmt();

        ////Datatable textbox focus
        //var rows = $("#tblPItemdetails").dataTable().fnGetNodes();
        //var dtTable = $('#tblPItemdetails').DataTable();
        //for (var i = 0; i < rows.length; i++) {
        //    var sn = dtTable.cells({ row: i, column: 12 }).data()[0];
        //    $('input[id=txtRate]').each(function () {
        //        if (sn == CSno && $(this).val() == Val) {
        //            var row = $(this).closest('tr');
        //            var num = row.find('#txtRate').val();
        //            row.find('#txtRate').focus().val('').val(num);
        //            return true;
        //        }
        //    });
        //}



        //Datatable textbox focus
        //var otable = $('#tblPItemdetails').DataTable();
        //var odata = otable.rows().data();

        //$('input[id=txtRate]').each(function (ig) {
        //    if (odata[ig].Proc_Recpt_Detid == CSno) {Proc_Recpt_Detid
        //        var row = $(this).closest('tr');
        //        var num = row.find('#txtRate').val();
        //        row.find('#txtRate').focus().val('').val(num);
        //    }
        //});


    });
    $(document).on('keyup', '.CalOIQty', function () {
        debugger;
        var table = $('#tblPInvOrddetails').DataTable();

        var pid = table.row($(this).parents('tr')).data()["Process_recpt_DetId"];
        var pjid = table.row($(this).parents('tr')).data()["Process_recpt_JobDetId"];
        var balq = table.row($(this).parents('tr')).data()["RecQty"];
        var OrdQty = table.row($(this).parents('tr')).data()["OrdQty"];
        var ValidateProcessQty = table.row($(this).parents('tr')).data()["ValidateProcessQty"];
        var value = $(this).val();


        if (ValidateProcessQty == "True") {

            if (value > OrdQty) {

                //alert("Invoice Qty not more then Process Order Qty..");
                var msg = 'Invoice quantity not more then Process Order quantity...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);

                $.each(POSaveItemList, function () {
                    if (this.Process_recpt_DetId == pid && this.Process_recpt_JobDetId == pjid) {
                        //if (balq >= value) {
                        this.InvoiceQty = 0;
                        //}
                        //else {
                        //    var t = value - balq;
                        //    this.InvoiceQty = balq;
                        //}

                    }
                });

                POItemList = $.grep(POSaveItemList, function (v) {
                    return (v.Process_recpt_DetId === pid);
                });

                loadPInvOrdTable(POItemList);

                var table = $('#tblPInvOrddetails').DataTable();
                var ecdata = table.rows().data();
                debugger;
                $('input[id=txtOPQty]').each(function (ig) {

                    var row = $(this).closest('tr');
                    for (var h = 0; h < POItemList.length; h++) {
                        debugger;
                        if (ecdata[ig].Process_recpt_JobDetId == POItemList[h].Process_recpt_JobDetId && ecdata[ig].Process_recpt_JobDetId == pjid) {

                            var Invoice_Qty = POItemList[h].InvoiceQty;

                            row.find('#txtOPQty').focus().val('').val(Invoice_Qty);
                            return true;
                        }
                    }

                });


                loadPInvOrdSaveTable(POSaveItemList);

                var totalamnt = 0;

                for (var e = 0; e < POItemList.length; e++) {
                    var amount = POItemList[e].InvoiceQty;
                    totalamnt = totalamnt + parseFloat(amount);
                }



                $.each(PESaveItemList, function () {
                    if (this.Proc_Recpt_Detid == pid) {
                        this.Invoice_Qty = totalamnt;
                    }
                });

                var masid = 0;
                $.each(PESaveItemList, function (i) {
                    if (PESaveItemList[i].Proc_Recpt_Detid == pid) {

                        masid = PESaveItemList[i].Proc_Recpt_Masid;
                    }
                });


                PEItemList = $.grep(PESaveItemList, function (v) {
                    return (v.Proc_Recpt_Masid === masid);
                });
                loadPInvSaveItemTable(PESaveItemList);

                //loadPInvItemTable(PEItemList);

                var table = $('#tblPItemdetails').DataTable();
                var ecdata = table.rows().data();
                debugger;
                $('input[id=txtOQty]').each(function (ig) {

                    var row = $(this).closest('tr');
                    for (var h = 0; h < PEItemList.length; h++) {
                        debugger;
                        if (ecdata[ig].Proc_Recpt_Detid == PEItemList[h].Proc_Recpt_Detid && ecdata[ig].Proc_Recpt_Detid == pid) {

                            var Invoice_Qty = PEItemList[h].Invoice_Qty;

                            row.find('#txtOQty').val(Invoice_Qty);
                            return true;
                        }
                    }

                });



                return true;
            } else {
                $.each(POSaveItemList, function () {
                    if (this.Process_recpt_DetId == pid && this.Process_recpt_JobDetId == pjid) {
                        //if (balq >= value) {
                        this.InvoiceQty = value;
                        //}
                        //else {
                        //    var t = value - balq;
                        //    this.InvoiceQty = balq;
                        //}

                    }
                });
                POItemList = $.grep(POSaveItemList, function (v) {
                    return (v.Process_recpt_DetId === pid);
                });

                // loadPInvOrdTable(POItemList);

                var table = $('#tblPInvOrddetails').DataTable();
                var ecdata = table.rows().data();
                debugger;
                $('input[id=txtOPQty]').each(function (ig) {

                    var row = $(this).closest('tr');
                    for (var h = 0; h < POItemList.length; h++) {
                        debugger;
                        if (ecdata[ig].Process_recpt_JobDetId == POItemList[h].Process_recpt_JobDetId && ecdata[ig].Process_recpt_JobDetId == pjid) {

                            var Invoice_Qty = POItemList[h].InvoiceQty;

                            row.find('#txtOPQty').focus().val('').val(Invoice_Qty);
                            return true;
                        }
                    }

                });


                loadPInvOrdSaveTable(POSaveItemList);

                var totalamnt = 0;

                for (var e = 0; e < POItemList.length; e++) {
                    var amount = POItemList[e].InvoiceQty;
                    totalamnt = totalamnt + parseFloat(amount);
                }
                $.each(PESaveItemList, function () {
                    if (this.Proc_Recpt_Detid == pid) {
                        this.Invoice_Qty = totalamnt;
                    }
                });

                var masid = 0;
                $.each(PESaveItemList, function (i) {
                    if (PESaveItemList[i].Proc_Recpt_Detid == pid) {

                        masid = PESaveItemList[i].Proc_Recpt_Masid;
                    }
                });


                PEItemList = $.grep(PESaveItemList, function (v) {
                    return (v.Proc_Recpt_Masid === masid);
                });

                //PEItemList = $.grep(PESaveItemList, function (v) {
                //    return (v.Proc_Recpt_Detid === pid);
                //});
                loadPInvSaveItemTable(PESaveItemList);

                // loadPInvItemTable(PEItemList);

                var table = $('#tblPItemdetails').DataTable();
                var ecdata = table.rows().data();
                debugger;
                $('input[id=txtOQty]').each(function (ig) {

                    var row = $(this).closest('tr');
                    for (var h = 0; h < PEItemList.length; h++) {
                        debugger;
                        if (ecdata[ig].Proc_Recpt_Detid == PEItemList[h].Proc_Recpt_Detid && ecdata[ig].Proc_Recpt_Detid == pid) {

                            var Invoice_Qty = PEItemList[h].Invoice_Qty;

                            row.find('#txtOQty').val(Invoice_Qty);
                            return true;
                        }
                    }

                });
            }


        } else {

            if (value > balq) {

                //alert("Invoice Qty not more then  BalQty..");
                var msg = 'Invoice quantity not more then Balance quantity...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                $.each(POSaveItemList, function () {
                    if (this.Process_recpt_DetId == pid && this.Process_recpt_JobDetId == pjid) {
                        //if (balq >= value) {
                        this.InvoiceQty = 0;
                        //}
                        //else {
                        //    var t = value - balq;
                        //    this.InvoiceQty = balq;
                        //}

                    }
                });
                POItemList = $.grep(POSaveItemList, function (v) {
                    return (v.Process_recpt_DetId === pid);
                });

                //loadPInvOrdTable(POItemList);
                var table = $('#tblPInvOrddetails').DataTable();
                var ecdata = table.rows().data();
                debugger;
                $('input[id=txtOPQty]').each(function (ig) {

                    var row = $(this).closest('tr');
                    for (var h = 0; h < POItemList.length; h++) {
                        debugger;
                        if (ecdata[ig].Process_recpt_JobDetId == POItemList[h].Process_recpt_JobDetId && ecdata[ig].Process_recpt_JobDetId == pjid) {

                            var Invoice_Qty = POItemList[h].InvoiceQty;

                            row.find('#txtOPQty').focus().val('').val(Invoice_Qty);
                            return true;
                        }
                    }

                });

                loadPInvOrdSaveTable(POSaveItemList);

                var totalamnt = 0;

                for (var e = 0; e < POItemList.length; e++) {
                    var amount = POItemList[e].InvoiceQty;
                    totalamnt = totalamnt + parseFloat(amount);
                }
                $.each(PESaveItemList, function () {
                    if (this.Proc_Recpt_Detid == pid) {
                        this.Invoice_Qty = totalamnt;
                    }
                });

                var masid = 0;
                $.each(PESaveItemList, function (i) {
                    if (PESaveItemList[i].Proc_Recpt_Detid == pid) {

                        masid = PESaveItemList[i].Proc_Recpt_Masid;
                    }
                });


                PEItemList = $.grep(PESaveItemList, function (v) {
                    return (v.Proc_Recpt_Masid === masid);
                });

                //PEItemList = $.grep(PESaveItemList, function (v) {
                //    return (v.Proc_Recpt_Detid === pid);
                //});
                loadPInvSaveItemTable(PESaveItemList);
                // loadPInvItemTable(PEItemList);
                var table = $('#tblPItemdetails').DataTable();
                var ecdata = table.rows().data();
                debugger;
                $('input[id=txtOQty]').each(function (ig) {

                    var row = $(this).closest('tr');
                    for (var h = 0; h < PEItemList.length; h++) {
                        debugger;
                        if (ecdata[ig].Proc_Recpt_Detid == PEItemList[h].Proc_Recpt_Detid && ecdata[ig].Proc_Recpt_Detid == pid) {

                            var Invoice_Qty = PEItemList[h].Invoice_Qty;

                            row.find('#txtOQty').val(Invoice_Qty);
                            return true;
                        }
                    }

                });

            } else {
                $.each(POSaveItemList, function () {
                    if (this.Process_recpt_DetId == pid && this.Process_recpt_JobDetId == pjid) {
                        //if (balq >= value) {
                        this.InvoiceQty = value;
                        //}
                        //else {
                        //    var t = value - balq;
                        //    this.InvoiceQty = balq;
                        //}

                    }
                });
                POItemList = $.grep(POSaveItemList, function (v) {
                    return (v.Process_recpt_DetId === pid);
                });

                //loadPInvOrdTable(POItemList);
                var table = $('#tblPInvOrddetails').DataTable();
                var ecdata = table.rows().data();
                debugger;
                $('input[id=txtOPQty]').each(function (ig) {

                    var row = $(this).closest('tr');
                    for (var h = 0; h < POItemList.length; h++) {
                        debugger;
                        if (ecdata[ig].Process_recpt_JobDetId == POItemList[h].Process_recpt_JobDetId && ecdata[ig].Process_recpt_JobDetId == pjid) {

                            var Invoice_Qty = POItemList[h].InvoiceQty;

                            row.find('#txtOPQty').focus().val('').val(Invoice_Qty);
                            return true;
                        }
                    }

                });
                loadPInvOrdSaveTable(POSaveItemList);

                var totalamnt = 0;

                for (var e = 0; e < POItemList.length; e++) {
                    var amount = POItemList[e].InvoiceQty;
                    totalamnt = totalamnt + parseFloat(amount);
                }
                $.each(PESaveItemList, function () {
                    if (this.Proc_Recpt_Detid == pid) {
                        this.Invoice_Qty = totalamnt;
                    }
                });

                var masid = 0;
                $.each(PESaveItemList, function (i) {
                    if (PESaveItemList[i].Proc_Recpt_Detid == pid) {

                        masid = PESaveItemList[i].Proc_Recpt_Masid;
                    }
                });


                PEItemList = $.grep(PESaveItemList, function (v) {
                    return (v.Proc_Recpt_Masid === masid);
                });

                //PEItemList = $.grep(PESaveItemList, function (v) {
                //    return (v.Proc_Recpt_Detid === pid);
                //});
                loadPInvSaveItemTable(PESaveItemList);
                // loadPInvItemTable(PEItemList);
                var table = $('#tblPItemdetails').DataTable();
                var ecdata = table.rows().data();
                debugger;
                $('input[id=txtOQty]').each(function (ig) {

                    var row = $(this).closest('tr');
                    for (var h = 0; h < PEItemList.length; h++) {
                        debugger;
                        if (ecdata[ig].Proc_Recpt_Detid == PEItemList[h].Proc_Recpt_Detid && ecdata[ig].Proc_Recpt_Detid == pid) {

                            var Invoice_Qty = PEItemList[h].Invoice_Qty;

                            row.find('#txtOQty').val(Invoice_Qty);
                            return true;
                        }
                    }

                });
            }
        }




        //CreditDebit

        for (var g = 0; g < PESaveItemList.length; g++) {
            if (PESaveItemList[g].Proc_Recpt_Detid == pid) {
                var Itm = PESaveItemList[g].Item;
                var Clr = PESaveItemList[g].Color;
                var Size = PESaveItemList[g].Size;
                var Invqty = parseFloat(PESaveItemList[g].Invoice_Qty).toFixed(3);
                var Rate = PESaveItemList[g].Rate;
                var Masid = PESaveItemList[g].Proc_Recpt_Masid;
                var Balance = PESaveItemList[g].BalQty;
                var Grnrate = PESaveItemList[g].GrnRate;
                var Balqty = PESaveItemList[g].BalQty;

                var Grn = PESaveItemList[g].Proc_recpt_no;
            }
        }

        var difrate = parseFloat(Rate - Grnrate).toFixed(2);
        var damnt = parseFloat(difrate * Invqty).toFixed(2);
        var qtydif = parseFloat(Invqty - Balqty).toFixed(2);
        var qtyamnt = parseFloat(qtydif * Rate).toFixed(2);


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
                Grnno: Grn,
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
                    Grnno: Grn,
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
        $.each(PEItemList, function () {
            if (this.Proc_Recpt_Detid == pid) {
                var amt = parseFloat(this.Invoice_Qty * this.Rate).toFixed(2);
                //this.Amount = this.Invoice_Qty * this.Rate;
                this.Amount = amt;
            }
        });
         //loadPInvItemTable(PEItemList);

        var table = $('#tblPItemdetails').DataTable();
        var ecdata = table.rows().data();
        debugger;
        $('input[id=txtAMT]').each(function (ig) {

            var row = $(this).closest('tr');
            for (var h = 0; h < PEItemList.length; h++) {
                debugger;
                if (ecdata[ig].Proc_Recpt_Detid == PEItemList[h].Proc_Recpt_Detid && ecdata[ig].Proc_Recpt_Detid == pid) {

                    var Amount = PEItemList[h].Amount;

                    row.find('#txtAMT').val(Amount);
                    return true;
                }
            }

        });

        $.each(PESaveItemList, function () {
            if (this.Proc_Recpt_Detid == pid) {
                var amt = parseFloat(this.Invoice_Qty * this.Rate).toFixed(2);
                //this.Amount = this.Invoice_Qty * this.Rate;
                this.Amount = amt;
            }
        });

        var total = 0;
        for (var e = 0; e < PESaveItemList.length; e++) {
            var amount = PESaveItemList[e].Amount;
            total = total + parseFloat(amount);
        }

        $('#txtTotalamount').val(total);

        var totalqty = 0;
        for (var e = 0; e < PESaveItemList.length; e++) {
            var amount = PESaveItemList[e].Invoice_Qty;
            totalqty = totalqty + parseFloat(amount);
        }

        $('#txtTotalQty').val(totalqty);

        LoadNetGrossAmt();
        ////Datatable textbox focus
        //var rows = $("#tblPInvOrddetails").dataTable().fnGetNodes();
        //var dtTable = $('#tblPInvOrddetails').DataTable();
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
});

function LoadNetAmount() {
    debugger;
    var Per = $('#txtPer').val();
    var GrossAmt = $('#txtGrossamount').val();
    var Amt = (Per * GrossAmt) / 100;
    $('#txtAAmount').val(Amt);



}
$(document).on('click', '.btnGrnItemview', function () {
    debugger;

    var table = $('#tblPrnitmdetails').DataTable();
    var CSno = table.row($(this).parents('tr')).data()["proc_recpt_masid"];

    var colorempty = [];
    colorempty = PESaveItemList;

    colorempty = $.grep(colorempty, function (v) {
        return (v.Proc_Recpt_Masid === CSno);
    });

    PEItemList = colorempty;
    loadPInvItemTable(PEItemList);

    if (PEItemList.length > 0) {
        var detid = PEItemList[0].Proc_Recpt_Detid;

        POItemList = $.grep(POSaveItemList, function (v) {
            return (v.Process_recpt_DetId === detid);
        });

        loadPInvOrdTable(POItemList);
    }

    if (CreDebSaveList.length > 0) {
        CreDebList = $.grep(CreDebSaveList, function (v) {
            return (v.Proc_Recpt_Masid === CSno);
        });
        loadCreDebTable(CreDebList);
    }
});
$(document).on('click', '.btnInvOrdview', function () {
    debugger;

    var table = $('#tblPItemdetails').DataTable();
    var CSno = table.row($(this).parents('tr')).data()["Proc_Recpt_Detid"];

    var colorempty = [];
    colorempty = POSaveItemList;

    colorempty = $.grep(colorempty, function (v) {
        return (v.Process_recpt_DetId === CSno);
    });

    POItemList = colorempty;
    loadPInvOrdTable(POItemList);
});

function ClearTextbox() {

    var PType = $('input[name="optExt"]:checked').attr('value');

    if (PType == 'P') {
        LoadSupplierDDL("#ddlAProcessor");
        LoadPrnGridDetails();
    } else {
        LoadWorkdivisionDDL("#ddlAProcessor");
        LoadPrnGridDetails();
    }

    LoadPrnNo();
    LoadProcessOrdNo();
    LoadProcessIssNo();
    LoadPrnGridDetails();
}

function RadioAPClick() {
    var PType = $('input[name="optExt"]:checked').attr('value');

    if (PType == 'P') {
        LoadSupplierDDL("#ddlAProcessor");
        LoadPrnGridDetails();
    } else {
        LoadWorkdivisionDDL("#ddlAProcessor");
        LoadPrnGridDetails();
    }
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
    $('#txtAFromDate').val(MainFDate);
    $('#txtAToDate').val(Fdatestring);
    $('#txtInvoiceDate').val(Fdatestring);
    $('#txtEntryDate').val(Fdatestring);

    $('#txtFrmDate').val(MainFDate);
    $('#txttoDate').val(Fdatestring);


}
function LoadPrnNo() {


    var comId = $('#ddlACompany').val();
    var unitId = $('#ddlAUnit').val();
    var suppId = $('#ddlAProcessor').val();
    var ProcessId = $('#ddlAProcess').val();
    var ProcessordId = $('#ddlAPordNo').val();
    var ProcessrecptId = $('#ddlAGrnNo').val();

    var OrdNo = "";
    var ONo = $('select#ddlAOrdNo option:selected').val();

    if (ONo == 0) {
        OrdNo == "";
    }
    else {

        OrdNo = $('select#ddlAOrdNo option:selected').text();
    }
    var RefNo = "";
    var RNo = $('select#ddlARefNo option:selected').val();

    if (RNo == 0) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlARefNo option:selected').val();
    }
    var OrdType = $('input[name="optwrkord"]:checked').attr('value');
    var PType = $('input[name="optExt"]:checked').attr('value');

    var AFDate = $('#txtAFromDate').val();
    var ATDate = $('#txtAToDate').val();

    $.ajax({
        url: "/ProcessInvoice/GetPrnNo",
        data: JSON.stringify({ companyid: comId, companyunitid: unitId, processorid: suppId, processid: ProcessId, processordid: ProcessordId, ProcRecId: ProcessrecptId, OrdNo: OrdNo, RefNo: RefNo, OrderType: OrdType, ProcessorType: PType, FDate: AFDate, DDate: ATDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;
                $(ddlAGrnNo).empty();
                $(ddlADcNo).empty();

                $(ddlAGrnNo).append($('<option/>').val('0').text('--Select PrnNo--'));
                $.each(data, function () {
                    $(ddlAGrnNo).append($('<option></option>').val(this.ProcRecId).text(this.ProcRecNo));
                });

                $(ddlADcNo).append($('<option/>').val('0').text('--Select DcNo--'));
                $.each(data, function () {
                    $(ddlADcNo).append($('<option></option>').val(this.ProcRecId).text(this.ProcDcNo));
                });

            }
        }

    });

}
function LoadProcessOrdNo() {


    var comId = $('#ddlACompany').val();
    var unitId = $('#ddlAUnit').val();
    var ProcessId = $('#ddlAProcess').val();
    var OrdType = $('input[name="optwrkord"]:checked').attr('value');
    var PType = $('input[name="optExt"]:checked').attr('value');

    var AFDate = $('#txtAFromDate').val();
    var ATDate = $('#txtAToDate').val();

    $.ajax({
        url: "/ProcessInvoice/GetProcessOrdNo",
        data: JSON.stringify({ companyid: comId, companyunitid: unitId, processid: ProcessId, OrderType: OrdType, ProcessorType: PType, FDate: AFDate, DDate: ATDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;
                $(ddlAPordNo).empty();

                $(ddlAPordNo).append($('<option/>').val('0').text('--Select Process Ord No--'));
                $.each(data, function () {
                    $(ddlAPordNo).append($('<option></option>').val(this.processordid).text(this.processorder));
                });

            }
        }

    });

}

function LoadProcessIssNo() {


    var comId = $('#ddlACompany').val();
    var unitId = $('#ddlAUnit').val();
    var ProcessId = $('#ddlAProcess').val();
    var ProcessordId = $('#ddlAPordNo').val();
    var OrdType = $('input[name="optwrkord"]:checked').attr('value');
    var PType = $('input[name="optExt"]:checked').attr('value');

    var AFDate = $('#txtAFromDate').val();
    var ATDate = $('#txtAToDate').val();

    $.ajax({
        url: "/ProcessInvoice/GetProcessIssNo",
        data: JSON.stringify({ companyid: comId, companyunitid: unitId, processid: ProcessId, processordid: ProcessordId, OrderType: OrdType, ProcessorType: PType, FDate: AFDate, DDate: ATDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;
                $(ddlAIssueNo).empty();

                $(ddlAIssueNo).append($('<option/>').val('0').text('--Select Process Issue No--'));
                $.each(data, function () {
                    $(ddlAIssueNo).append($('<option></option>').val(this.ProcIssId).text(this.ProIssNo));
                });

            }
        }

    });

}

function LoadPrnGridDetails() {


    var comId = $('#ddlACompany').val();
    var unitId = $('#ddlAUnit').val();
    var suppId = $('#ddlAProcessor').val();
    var ProcessId = $('#ddlAProcess').val();
    var ProcessordId = $('#ddlAPordNo').val();
    var ProcessrecptId = $('#ddlAGrnNo').val();

    var OrdNo = "";
    var ONo = $('select#ddlAOrdNo option:selected').val();

    if (ONo == 0) {
        OrdNo == "";
    }
    else {

        OrdNo = $('select#ddlAOrdNo option:selected').text();
    }
    var RefNo = "";
    var RNo = $('select#ddlARefNo option:selected').val();

    if (RNo == 0) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlARefNo option:selected').val();
    }
    var DcNo = "";
    var DNo = $('select#ddlADcNo option:selected').val();

    if (DNo == 0) {
        DcNo == "";
    }
    else {

        DcNo = $('select#ddlADcNo option:selected').val();
    }
    var OrdType = $('input[name="optwrkord"]:checked').attr('value');
    var PType = $('input[name="optExt"]:checked').attr('value');

    var AFDate = $('#txtAFromDate').val();
    var ATDate = $('#txtAToDate').val();

    $.ajax({
        url: "/ProcessInvoice/GetPrnGridLoad",
        data: JSON.stringify({ companyid: comId, companyunitid: unitId, processorid: suppId, processid: ProcessId, processordid: ProcessordId, ProcRecId: ProcessrecptId, OrdNo: OrdNo, RefNo: RefNo, ProcDcNo: DcNo, OrderType: OrdType, ProcessorType: PType, FDate: AFDate, DDate: ATDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            AItemList = result;
            loadAItemTable(AItemList);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}

function loadAItemTable(AItemList) {

    $('#tblProInvAddgrid').DataTable().destroy();
    debugger;

    $('#tblProInvAddgrid').DataTable({
        data: AItemList,
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

            { title: "GrnMasID", data: "ProcRecId", "visible": false },
              { title: "Processordid", data: "processordid", "visible": false },
                { title: "Processid", data: "processid", "visible": false },
            { title: "Dc No", data: "ProcDcNo" },
            {
                title: "Dc Date", data: "ProcDcDate",
                render: function (data) {
                    return (moment(data).format("DD/MM/YYYY"));
                }
            },
            { title: "Grn No", data: "ProcRecNo" },
            {
                title: "Grn Date", data: "ProcGrnDate",
                render: function (data) {
                    return (moment(data).format("DD/MM/YYYY"));
                }
            },
             { title: "Process", data: "process" },
            {

                title: "Include", data: "ProcRecId",
                render: function (data) {

                    return '<input type="checkbox" id="txtGrnMasId" class="editor-active"  style="width: 50px;text-align: center;"  value=' + data + ' onclick="myfunc(this.value);">';

                },
            },
        ]
    });
}


function myfunc(Val) {
    MGRowID = MGRowID + "," + Val;
}




function LoadProInvEntryDetails() {

    MGRowID;



    var Comp = $('select#ddlACompany option:selected').text();
    var Supp = $('select#ddlAProcessor option:selected').text();
    var Unit = $('select#ddlAUnit option:selected').text();
    var Process = $('select#ddlAProcess option:selected').text();

    var CompId = $('select#ddlACompany option:selected').val();
    var SuppId = $('select#ddlAProcessor option:selected').val();
    var UnitId = $('select#ddlAUnit option:selected').val();
    var ProcessId = $('select#ddlAProcess option:selected').val();

    var OrdType = $('input[name="optwrkord"]:checked').attr('value');

    if (OrdType == 'W') {
        $('#optMS').prop('checked', true);
    }
    else if (OrdType == 'S') {
        $('#optSS').prop('checked', true);
    }
    else if (OrdType == 'E') {
        $('#optES').prop('checked', true);
    }
    else if (OrdType == 'G') {
        $('#optGS').prop('checked', true);
    }

    GCompId = CompId;
    GSuppId = SuppId;

    if (CompId == 0) {
        //alert("Please Select Company..");
        var msg = 'Please Select Company...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    } else if (UnitId == 0) {
        //alert("Please Select CompanyUnit..");
        var msg = 'Please Select CompanyUnit...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    } else if (SuppId == 0) {
        //alert("Please Select Supplier..");
        var msg = 'Please Select Supplier...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    } else if (ProcessId == 0) {
        //alert("Please Select Process..");
        var msg = 'Please Select Process...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    if (MGRowID == 0) {
        //alert("Please Select Any One Row..");
        var msg = 'Please Select Any One Row...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    $('#myModal').modal('hide');
    $('#myModal1').modal('show');

    if (ChkBillNo == "True") {
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
    LoadPrnInvDetails(MGRowID, CompId, SuppId, UnitId, ProcessId);
    LoadBillInvNo(CompId, SuppId);
    $('#btnAdd').show();
    $('#btnUpdate').hide();
    $('#btnDel').hide();
}


var table, column, compId, Docum;
function GenerateNumber(table, column, compId, Docum) {

    debugger;

    table = "Process_Inv_Mas",
    column = "Entry_No",
    compId = $('#ddlACompany').val(),
    Docum = 'PROCESS INVOICE'

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

function LoadPrnInvDetails(MGRowID, CompId, SuppId, UnitId, ProcessId) {
    debugger;

    var OrdType = $('input[name="optwrkord"]:checked').attr('value');
    var PType = $('input[name="optExt"]:checked').attr('value');
    var ProcessId = ProcessId;
    var UnitId = UnitId;
    $.ajax({
        url: "/ProcessInvoice/GetInvPrnItemDetails",
        data: JSON.stringify({ PrnMasId: MGRowID, CompanyId: CompId, SupplierId: SuppId, ProcessId: ProcessId, UnitId: UnitId, InternalOrExternal: PType, OrderType: OrdType }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            PrnItemList = result;
            loadPrnItemTable(PrnItemList);

            PrnMasId = PrnItemList[0].proc_recpt_masid;


            var Iid = 0;
            var Cid = 0;
            var Sid = 0;
            var Gdid = 0;

            var ONo = 0;

            LoadProInvItemSaveDetails(MGRowID, CompId, SuppId, UnitId, ProcessId, PType, OrdType);
            LoadProInvOrderSaveDetails(MGRowID, OrdType);



        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function loadPrnItemTable(PrnItemList) {

    $('#tblPrnitmdetails').DataTable().destroy();
    debugger;

    var table = $('#tblPrnitmdetails').DataTable({

        data: PrnItemList,
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


             { title: "PurInvDcId", data: "Process_Inv_DcId", "visible": false },
             { title: "PrnRecptId", data: "proc_recpt_masid", "visible": false },
            { title: "Prn No", data: "PrnNo" },
            { title: "Party Dely No", data: "DcNo" },
            {
                title: "Date", data: "DCDate",
                render: function (data) {
                    return (moment(data).format("DD/MM/YYYY"));
                }
            },

                 //{
                 //    title: "ACTION", "mDataProp": null,
                 //    "sDefaultContent": '<div style="display:inline-flex;"><button type="button" data-toggle="tooltip" data-placement="top" title="View Item" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnGrnItemview btn btn-round btn-info"> <i class="fa fa-eye"></i> </button></div>'
                 //},
        ]
    });



    $("#tblPrnitmdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblPrnitmdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });

}

function ClearData() {
    $('#ddlARefNo').val('0');
    $('#ddlAOrdNo').val('0');
    $('#ddlAGrnNo').val('0');
    $('#ddlAIssueNo').val('0');
    $('#ddlAProcess').val('0');
    $('#ddlADcNo').val('0');
    $('#ddlAProcessor').val('0');
    $('#ddlAPordNo').val('0');
    var tablesize = $('#tblProInvAddgrid').DataTable();
    tablesize.clear().draw();
    window.location.reload();
}



function LoadProInvItemSaveDetails(MGRowID, CompId, SuppId, UnitId, ProcessId, PType, OrdType) {
    debugger;
    $.ajax({
        url: "/ProcessInvoice/GetProInvSaveItemDetails",
        data: JSON.stringify({ PrnMasId: MGRowID, CompanyId: CompId, SupplierId: SuppId, ProcessId: ProcessId, UnitId: UnitId, InternalOrExternal: PType, OrderType: OrdType }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            PESaveItemList = result;
            loadPInvSaveItemTable(PESaveItemList);

            PrnDetid = PESaveItemList[0].Proc_Recpt_Detid;

            PEItemList = PESaveItemList;

            PEItemList = $.grep(PEItemList, function (v) {
                return (v.Proc_Recpt_Masid === PrnMasId);
            });

            loadPInvItemTable(PEItemList);



            //var Cb = PEItemList[0].CAbb;
            //var ExRate = PEItemList[0].EXRate;
            //var CuId = PEItemList[0].CurrId;

            //$('#txtCurrency').val(Cb);
            //$('#txtExchangeRate').val(ExRate);
            //$('#txtCurrencyId').val(CuId);


        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}




function LoadProInvOrderSaveDetails(MGRowID, OrdType) {
    debugger;

    $.ajax({
        url: "/ProcessInvoice/GetProInvOrdDetails",
        data: JSON.stringify({ PrnMasId: MGRowID, OrderType: OrdType }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            POSaveItemList = result;
            loadPInvOrdSaveTable(POSaveItemList);

            POItemList = POSaveItemList;

            POItemList = $.grep(POItemList, function (v) {
                return (v.Process_recpt_DetId === PrnDetid);
            });

            loadPInvOrdTable(POItemList);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function loadPInvOrdTable(POItemList) {

    $('#tblPInvOrddetails').DataTable().destroy();
    debugger;

    var table = $('#tblPInvOrddetails').DataTable({
        data: POItemList,
        columns: [
              { title: "S.No", data: "OSNo", "visible": false },
             { title: "ProInvOrdDetID", data: "Process_Inv_JobDetID", "visible": false },
              { title: "ProcessrecptDetId", data: "Process_recpt_DetId", "visible": false },
            { title: "Order No", data: "OrderNo" },
            { title: "Ref No", data: "RefNo" },
              { title: "Style", data: "Style" },
               { title: "Job Ord No", data: "Job_Ord_No" },
               { title: "Received Qty", data: "RecQty" },
            { title: "Received Rate", data: "RecRate" },
            { title: "ProinvID", data: "Process_InvId", "visible": false },
            {
                title: "Inv Qty", data: "InvoiceQty",
                render: function (data) {

                    return '<input type="text" id="txtOPQty" class="CalOIQty form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';

                },
            },
            { title: "ProInvDetID", data: "Process_InvDetid", "visible": false },



        ]
    });

}




function loadPInvOrdSaveTable(POSaveItemList) {

    $('#tblPInvOrdSavedetails').DataTable().destroy();
    debugger;

    var table = $('#tblPInvOrdSavedetails').DataTable({
        data: POSaveItemList,
        columns: [
            { title: "Sno", data: "OSNo" },
            { title: "PurInvOrdDetID", data: "Process_Inv_JobDetID" },
              { title: "ProcessrecptDetId", data: "Process_recpt_DetId" },
            { title: "Order No", data: "OrderNo" },
            { title: "Ref No", data: "RefNo" },
            { title: "Style", data: "Style" },
            { title: "Job Ord No", data: "Job_Ord_No" },
             { title: "Received Qty", data: "RecQty" },
            { title: "Received Rate", data: "RecRate" },
            { title: "PurinvID", data: "Process_InvId" },
            { title: "Inv Qty", data: "InvoiceQty" },
            { title: "PurInvDetID", data: "Process_InvDetid" },


        ]
    });

}
function loadPInvItemTable(PEItemList) {

    $('#tblPItemdetails').DataTable().destroy();
    debugger;

    var table = $('#tblPItemdetails').DataTable({
        data: PEItemList,
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

            { title: "ProInvId", data: "Process_Invid", "visible": false },
            { title: "ProInvDetId", data: "Process_InvDetid", "visible": false },
            { title: "PrnMasId", data: "Proc_Recpt_Masid", "visible": false },
            { title: "Item", data: "Item" },
            { title: "Color", data: "Color" },
            { title: "Size", data: "Size" },
             { title: "OrdQty", data: "OrdQty" },
            { title: "Grn Qty", data: "GrnQty" },
            { title: "Sec Qty", data: "SecQty" },
             { title: "AppRate", data: "AppRate", "visible": false },
            { title: "Grn Rate", data: "GrnRate" },
            { title: "Bal Qty", data: "BalQty" },
            { title: "Sec Qty", data: "SecQty" },
             {
                 title: "Inv Qty", data: "Invoice_Qty",
                 render: function (data) {

                     return '<input type="text" id="txtOQty" class="calcQty form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';

                 },
             },
            { title: "PrnDetId", data: "Proc_Recpt_Detid", "visible": false },
            { title: "Uom", data: "Uom" },

            {
                title: "Rate", data: "Rate",
                render: function (data) {

                    return '<input type="text" id="txtRate" class="calcRate form-control"  style="width: 50px;text-align: center; "  value=' + data + '>';

                },
            },

             {
                 title: "Amount", data: "Amount",
                 render: function (data) {

                     return '<input type="text" id="txtAMT" class="calcAMT form-control"  style="width: 50px;text-align: center; "  value=' + data + ' disabled>';

                 },
             },


            //{ title: "Amount", data: "Amount" },
            { title: "Deb Qty", data: "DebtQty" },
            { title: "Acpt Qty", data: "AcptQty" },
            { title: "ItemId", data: "ItemId", "visible": false },
            { title: "ColorId", data: "ColorId", "visible": false },
            { title: "SizeId", data: "SizeId", "visible": false },
            { title: "UomId", data: "UomId", "visible": false },
             { title: "Procrecptno", data: "Proc_recpt_no", "visible": false },

        //{
        //    title: "ACTION", "mDataProp": null,
        //    "sDefaultContent": '<div style="display:inline-flex;"><button type="button" data-toggle="tooltip" data-placement="top" title="View Item" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnInvOrdview btn btn-round btn-info"> <i class="fa fa-eye"></i> </button></div>'
        //},
        ]
    });

    var totalamnt = 0;
    for (var e = 0; e < PEItemList.length; e++) {
        var amount = PEItemList[e].InvAmt;
        totalamnt = totalamnt + parseFloat(amount);

    }

   // $('#txtGrossAmount').val(totalamnt.toFixed(3));


    var totalamnt1 = 0;
    var totalamnt2 = 0;
    for (var e = 0; e < PEItemList.length; e++) {
        var amount1 = PEItemList[e].Amount;
        var amount2 = PEItemList[e].Invoice_Qty;
        totalamnt1 = totalamnt1 + parseFloat(amount1);
        totalamnt2 = totalamnt2 + parseFloat(amount2);

    }
    $('#txtTotalamount').val(totalamnt1.toFixed(3));
   // $('#txtNetAmount').val(totalamnt1.toFixed(3));
    $('#txtTotalQty').val(totalamnt2.toFixed(3));

    LoadNetGrossAmt();


    $("#tblPItemdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblPItemdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}
function loadPInvSaveItemTable(PESaveItemList) {

    $('#tblPItemSavedetails').DataTable().destroy();
    debugger;

    var table = $('#tblPItemSavedetails').DataTable({
        data: PESaveItemList,
        columns: [

            { title: "ProInvId", data: "Process_Invid" },
            { title: "ProInvDetId", data: "Process_InvDetid" },
            { title: "PrnMasId", data: "Proc_Recpt_Masid" },
            { title: "Item", data: "Item" },
            { title: "Color", data: "Color" },
            { title: "Size", data: "Size" },
               { title: "OrdQty", data: "OrdQty" },
            { title: "Grn.Qty", data: "GrnQty" },
            { title: "SecQty", data: "SecQty" },
              { title: "AppRate", data: "AppRate" },
            { title: "GrnRate", data: "GrnRate" },
            { title: "BalQty", data: "BalQty" },
            { title: "SecQty", data: "SecQty" },
            { title: "Inv.Qty", data: "Invoice_Qty" },
            { title: "PrnDetId", data: "Proc_Recpt_Detid" },
            { title: "Uom", data: "Uom" },
            { title: "Rate", data: "Rate" },
            { title: "Amount", data: "Amount" },
            { title: "DebQty", data: "DebtQty" },
            { title: "AcptQty", data: "AcptQty" },
            { title: "ItemId", data: "ItemId" },
            { title: "ColorId", data: "ColorId" },
            { title: "SizeId", data: "SizeId" },
            { title: "UomId", data: "UomId" },
            { title: "Procrecptno", data: "Proc_recpt_no" },
        ]
    });



}


function loadCreDebTable(list) {

    $('#tblitmdetails').DataTable().destroy();
    debugger;

    var table = $('#tblitmdetails').DataTable({
        data: list,
        columns: [
             { title: "Grn No", data: "Grnno" },
               { title: "Masid", data: "Proc_Recpt_Masid", "visible": false },
             { title: "Detid", data: "Proc_Recpt_Detid", "visible": false },
             { title: "Item", data: "Item" },
             { title: "Color", data: "Color" },
             { title: "Size", data: "Size" },
             { title: "Bal Qty", data: "BalQty" },
             { title: "Ord Date", data: "Date" },
             { title: "Inv Qty", data: "Invoice_Qty" },
             { title: "Inv Rate", data: "Rate" },
                { title: "Rate Diff", data: "RateDiff" },
               { title: "RAmnt Diff", data: "RateAmntDif" },
                 { title: "Qty Diff", data: "QtyDiff" },
               { title: "QtyAmnt Diff", data: "QtyAmntDif" },
             //{
             //    title: "Apply", data: "Proc_Recpt_Detid",
             //    render: function (data) {
             //        return '<input type="checkbox" id="groupchk" class="groupchk editor-active"  style="width: 50px;text-align: center;"  value=' + data + ' >';
             //    },
             //},
             //{
             //    title: "Apply", data: "Proc_Recpt_Detid",
             //    render: function (data, type, row) {

             //        return '<input type="checkbox" id="groupbom" class="groupbom editor-active" unchecked  value=' + data + ' >';


             //    }
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

///payment add///
////////////////////////nomi////////////////



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
                AccList[i].amount= $("#txtAAmount").val();

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


    if (AccList.length > 0) {
        var totalamnt = 0;
        for (var e = 0; e < AccList.length; e++) {
            var amount = AccList[e].amount;
            totalamnt = totalamnt + parseFloat(amount);

        }
        LoadNetGrossAmt();
        //$('#txtNetAmount').val(totalamnt.toFixed(3));

        //GAddAmt = $('#txtNetAmount').val();

        //var GAmt = $('#txtGrossAmount').val();
        //var NAmt = $('#txtNetAmount').val();
        //var FNAmt = parseFloat(GAmt) + parseFloat(NAmt);
        //$('#txtNetAmount').val(FNAmt);
    }
}

function ProInvSave() {
    debugger;
    var res = validate();
    if (res == false) {
        return false;
    }

    if (PEItemList.length == 0) {
        //alert("Please Enter the Item Details..");
        var msg = 'Please Enter the Item Details...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    //Check Qty
    var opchk = [];

    for (var y = 0; y < PEItemList.length; y++) {
        if (PEItemList[y].Invoice_Qty > 0) {
            opchk.push(PEItemList[y]);
        }
    }

    if (opchk.length == 0) {
        //alert('Please fill atleast any one invocie qty...');
        var msg = 'Please fill atleast any one invocie quantity...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }


    var TotitemInvqty = 0;
    var TotordInvqty = 0;

    $.each(PESaveItemList, function () {      
        TotitemInvqty = parseFloat(TotitemInvqty) + parseFloat(this.Invoice_Qty);
    });

    $.each(POSaveItemList, function () {
        TotordInvqty = parseFloat(TotordInvqty)+ parseFloat(this.InvoiceQty);
    });


    if (TotitemInvqty.toFixed(3) != TotordInvqty.toFixed(3)) {
        //alert('Please Check Item and Order Inv Qty...');
        var msg = 'Please Check Item and Order Invoice quantity...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }


    //Check Rate
    var opchk = [];

    for (var y = 0; y < PEItemList.length; y++) {
        if (PEItemList[y].Rate > 0) {
            opchk.push(PEItemList[y]);
        }
    }

    if (opchk.length == 0) {
        //alert('Please fill atleast any one rate...');
        var msg = 'Please fill atleast any one rate...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    var CompId = $('select#ddlACompany option:selected').val();
    var SuppId = $('select#ddlAProcessor option:selected').val();
    var OrdType = $('input[name="optwrkord"]:checked').attr('value');
    var PType = $('input[name="optExt"]:checked').attr('value');


    if (PType == "P") {
        var ProcessType = "E";
    }
    else {
        var ProcessType = "I";
    }

    var InvBillNo = 0;

    if (ChkBillNo == 'True') {

        var CNetAmt = $('#txtNetAmount').val();

        if (CNetAmt != GBillAmount) {
            //alert("Bill Amount Should Match With Net Amount..");
            var msg = 'Bill Amount Should Match With Net Amount...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return true;
        }
        InvBillNo = $('#ddlInvoiceNo option:selected').text();
    } else {

        InvBillNo = $('#txtInvoiceNo').val();
    }


    CreDebSaveList = $.grep(CreDebSaveList, function (v) {
        return (v.IsChecked === 'Y');
    });

    //loadPInvItemTable(PEItemList);

    var oldentryno = $('#txtEntryno').val();

    table = "Process_Inv_Mas",
    column = "Entry_No",
    compId = $('#ddlACompany').val(),
    Docum = 'PROCESS INVOICE'

    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var newentryno = result.Value;
            if (oldentryno != newentryno) {
                //alert('Entry No has been changed...');
                var msg = 'Entry Number has been changed...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                $('#txtEntryno').val(result.Value);
            }

            var objProSubmit = {


                OrderType: OrdType,
                Inv_No: InvBillNo,
                Inv_Date: $('#txtInvoiceDate').val(),//new Date($('#txtInvoiceDate').val()),
                Inv_Amount: $('#txtNetAmount').val(),
                Entry_No: $('#txtEntryno').val(),
                Entry_Date: $('#txtEntryDate').val(),//new Date($('#txtEntryDate').val()),
                Remarks: $('#txtremarks').val(),
                Payment_Amt: 0,
                DebitCredit: "N",
                DebtRaised: "N",
                Approved: "N",
                SupplierId: SuppId,
                InternalOrExternal: ProcessType,
                CreatedBy: Guserid,
                ApprovedBy: Guserid,
                MultiFlag: "N",


                ProInvDDet: PESaveItemList,
                ProInvOrdDDet: POSaveItemList,
                ProInvDcDet: PrnItemList,
                ProInvAL: AccList,
                ProInvRDiff: CreDebSaveList,
            };
            debugger;
            LoadingSymb();
            $.ajax({
                url: "/ProcessInvoice/Add",
                data: JSON.stringify(objProSubmit),
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {


                    if (result.Value == true) {

                        if (ChkBillNo == 'True') {
                            AddInvBillNo("Y");
                        }
                        AddUserEntryLog('Process', 'Process Invoice', 'ADD', $("#txtEntryno").val());
                        //alert("Data Saved Sucessfully");
                        var msg = 'Data Saved Sucessfully...';
                        var flg = 1;
                        var mod = 0;
                        var url = "";
                        AlartMessage(msg, flg, mod, url);

                        $('#myModal1').modal('hide');
                        //window.location.reload();
                        //$('#tblMainDelidetails').DataTable().destroy();
                        //ListMainUnit();
                        //ListOrderRefNo();
                        //ListDisNo();
                        //ListIssueNo();
                        //LoadMainGrid();
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

//Valdidation using jquery
function validate() {
    var isValid = true;

    //if ($('#txtInvoiceNo').val().trim() == "") {
    //    $('#txtInvoiceNo').css('border-color', 'Red');
    //    isValid = false;
    //}
    //else {
    //    $('#txtComp').css('border-color', 'lightgrey');
    //}

    if (ChkBillNo == 'True') {

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
    var OrdType = $('#ddlMType').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    $.ajax({
        url: "/ProcessInvoice/GetMPrnNo",
        data: JSON.stringify({ OrderType: OrdType, CompanyId: comId, FromDate: FDate, ToDate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;
                $(ddlMReceiptNo).empty();

                $(ddlMReceiptNo).append($('<option/>').val('0').text('--Select PrnNo--'));
                $.each(data, function () {
                    $(ddlMReceiptNo).append($('<option></option>').val(this.PrnMasId).text(this.PrnNo));
                });

            }
        }

    });

}


function LoadMUnit() {


    var comId = $('#ddlMCompany').val();
    var OrdType = $('#ddlMType').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    $.ajax({
        url: "/ProcessInvoice/GetUnit",
        data: JSON.stringify({ OrderType: OrdType, CompanyId: comId, FromDate: FDate, ToDate: TDate }),
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
                    $(ddlMUnit).append($('<option></option>').val(this.UnitId).text(this.Unit));
                });

            }
        }

    });

}

function LoadMProcess() {


    var comId = $('#ddlMCompany').val();
    var OrdType = $('#ddlMType').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    $.ajax({
        url: "/ProcessInvoice/GetProcess",
        data: JSON.stringify({ OrderType: OrdType, CompanyId: comId, FromDate: FDate, ToDate: TDate }),
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
                    $(ddlMProcess).append($('<option></option>').val(this.ProcessId).text(this.Process));
                });

            }
        }

    });

}

function LoadMOrderRef() {


    var comId = $('#ddlMCompany').val();
    var OrdType = $('#ddlMType').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    $.ajax({
        url: "/ProcessInvoice/GetOrderRefNo",
        data: JSON.stringify({ OrderType: OrdType, CompanyId: comId, FromDate: FDate, ToDate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;
                $(ddlMOrderNo).empty();

                $(ddlMOrderNo).append($('<option/>').val('0').text('--Select Order No--'));
                $.each(data, function () {
                    $(ddlMOrderNo).append($('<option></option>').text(this.OrderNo));
                });

                $(ddlMRefNo).empty();

                $(ddlMRefNo).append($('<option/>').val('0').text('--Select RefNo--'));
                $.each(data, function () {
                    $(ddlMRefNo).append($('<option></option>').text(this.RefNo));
                });

            }
        }

    });

}
function LoadMProcessor() {


    var comId = $('#ddlMCompany').val();
    var OrdType = $('#ddlMType').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    $.ajax({
        url: "/ProcessInvoice/GetProcessor",
        data: JSON.stringify({ OrderType: OrdType, CompanyId: comId, FromDate: FDate, ToDate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;
                $(ddlMprocessor).empty();

                $(ddlMprocessor).append($('<option/>').val('0').text('--Select Supplier--'));
                $.each(data, function () {
                    $(ddlMprocessor).append($('<option></option>').val(this.SupplierId).text(this.Supplier));
                });

            }
        }

    });

}
function LoadMEntryNo() {


    var comId = $('#ddlMCompany').val();
    var OrdType = $('#ddlMType').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    $.ajax({
        url: "/ProcessInvoice/GetEntryNo",
        data: JSON.stringify({ OrderType: OrdType, CompanyId: comId, FromDate: FDate, ToDate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;
                $(ddlMEntryNo).empty();

                $(ddlMEntryNo).append($('<option/>').val('0').text('--Select Entry No--'));
                $.each(data, function () {
                    $(ddlMEntryNo).append($('<option></option>').val(this.Process_Invid).text(this.Entry_No));
                });

            }
        }

    });

}


function CMainList() {

    $('#tblmaindetails').DataTable().destroy();

    LoadMainGrid();

}

function LoadMainGrid() {
    debugger;
    var cmpid = $('#ddlMCompany').val();

    if (cmpid == null) {
        cmpid = DCompid;
    } else {
        cmpid = $('#ddlMCompany').val();
    }

    var OrdType = $('#ddlMType').val();
    var ProcessId = $('#ddlMProcess').val();
    var UnitId = $('#ddlMUnit').val();
    var ProcessorId = $('#ddlMprocessor').val();
    var PrnMasId = $('#ddlMReceiptNo').val();
    var ProcessInvId = $('#ddlMEntryNo').val();

    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    var OrdNo = "";
    var ONo = $('select#ddlMOrderNo option:selected').val();

    if (ONo == 0) {
        OrdNo == "";
    }
    else {

        OrdNo = $('select#ddlMOrderNo option:selected').val();
    }


    var RefNo = "";
    var RNo = $('select#ddlMRefNo option:selected').val();

    if (RNo == 0) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlMRefNo option:selected').val();
    }

    var menufilter = OrdType + ',' + cmpid + ',' + FDate + ',' + TDate + ',' + ProcessId + ',' + UnitId + ',' + ProcessorId + ',' + PrnMasId + ',' + ProcessInvId + ',' + OrdNo + ',' + RefNo + ',' + 'N';
    localStorage.setItem('ProcessInvoiceMainFilter', menufilter);

    $.ajax({
        url: "/ProcessInvoice/GetMainLoad",
        data: JSON.stringify({ OrderType: OrdType, CompanyId: cmpid, FromDate: FDate, ToDate: TDate, ProcessId: ProcessId, UnitId: UnitId, SupplierId: ProcessorId, PrnMasId: PrnMasId, Process_Invid: ProcessInvId, OrdNo: OrdNo, RefNo: RefNo, MultiFlag: 'N' }),
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
                bSort: false,
                columns: [
                         { title: "InvId", "visible": false },
                         { title: "Entry No" },
                         { title: "Entry Date" },
                         { title: "Sub BillNo" },
                         { title: "Unit" },
                         { title: "Process" },
                         { title: "Processor" },
                         { title: "Type" },
                          { title: "Amount" },
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
            //CheckRights("ProcessInvoice");
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadMainGridFromBack() {
    debugger;
    var fill = localStorage.getItem('ProcessInvoiceMainFilter');
    var fillobj = [];
    fillobj = fill.split(",");

    $('#txtFromDate').val(fillobj[2]);
    $('#txtToDate').val(fillobj[3]);

    if (fillobj[9] == "undefined") {
        fillobj[9] = '';
    }
    if (fillobj[10] == "undefined") {
        fillobj[10] = '';
    }
    if (fillobj[4] == "undefined") {
        fillobj[4] = 0;
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
        url: "/ProcessInvoice/GetMainLoad",
        data: JSON.stringify({ OrderType: fillobj[0], CompanyId: fillobj[1], FromDate: fillobj[2], ToDate: fillobj[3], ProcessId: fillobj[4], UnitId: fillobj[5], SupplierId: fillobj[6], PrnMasId: fillobj[7], Process_Invid: fillobj[8], OrdNo: fillobj[9], RefNo: fillobj[10], MultiFlag: 'N' }),
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
                bSort: false,
                columns: [
                         { title: "InvId", "visible": false },
                         { title: "Entry No" },
                         { title: "Entry Date" },
                         { title: "Sub BillNo" },
                         { title: "Unit" },
                         { title: "Process" },
                         { title: "Processor" },
                         { title: "Type" },
                          { title: "Amount" },
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
        url: "/ProcessInvoice/LoadEditProInvDetails",
        data: JSON.stringify({ Process_Invid: Id }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            debugger;
            if (obj != undefined) {

                $('#txtcompany').val(obj[0]["Company"]);
                $('#txtProcessor').val(obj[0]["Supplier"]);
                $('#txtEntryDate').val(moment(obj[0]["Entry_Date"]).format('DD/MM/YYYY'));
                $('#txtInvoiceDate').val(moment(obj[0]["Inv_Date"]).format('DD/MM/YYYY'));
                $('#txtInvoiceNo').val(obj[0]["Inv_No"]);
                $('#txtEntryno').val(obj[0]["Entry_No"]);
                $('#txtProcess').val(obj[0]["Process"]);
                $('#txtUnit').val(obj[0]["Unit"]);

                //$('#txtCurrency').val(obj[0]["CurrencyId"]);
                //$('#txtExchangeRate').val(obj[0]["ExchangeRate"]);
                //$('#txtGrossAmount').val(obj[0]["Gross_amount"]);
                $('#txtRemarks').val(obj[0]["remarks"]);

                //$('#txtCreditRate').val(obj[0]["CRateDiff"]);
                //$('#txtDebitRate').val(obj[0]["DRateDiff"]);
                //$('#txtRateReason').val(obj[0]["DReason"]);

                CmpId = obj[0]["CompanyId"];
                SuppId = obj[0]["SupplierId"];
                OrdType = obj[0]["OrderType"];

                if (OrdType == 'W') {
                    $('#optMS').prop('checked', true);
                }
                else if (OrdType == 'S') {
                    $('#optSS').prop('checked', true);
                }
                else if (OrdType == 'E') {
                    $('#optES').prop('checked', true);
                }
                else if (OrdType == 'G') {
                    $('#optGS').prop('checked', true);
                }

                ProcessId = obj[0]["ProcessId"];
                ProcessInvId = obj[0]["Process_Invid"];
                UnitId = obj[0]["UnitId"];
                ProType = obj[0]["InternalOrExternal"];

                if (ChkBillNo == "True") {
                    $('#dptInvId').show();
                    $('#txtInvId').hide();
                    $('#optNewBill').show();
                } else {
                    $('#txtInvId').show();
                    $('#dptInvId').hide();
                    $('#optNewBill').hide();
                }

                LoadProInvPrnEdit(Id, CmpId, SuppId);
                LoadProInvAddlessEdit(Id);
                LoadProInvRateDiffEdit(Id);
                EditLoadBillInvNoAmt(CmpId, SuppId);


                $('#myModal').modal('hide');
                $('#myModal1').modal('show');
                $('#btnUpdate').show();
                $('#btnAdd').hide();
                $('#btnDel').hide();

                if (obj[0]["Passed"] == true) {
                    //alert('Bill pass are made for this entry,Cannot update the INVOICE...!');
                    var msg = 'Bill pass are made for this entry,Cannot update the INVOICE...!';
                    var flg = 4;
                    var mod = 1;
                    var url = "";
                    AlartMessage(msg, flg, mod, url);
                    $('#btnUpdate').attr("disabled", true);
                    $('#btnDel').attr("disabled", true);
                } else if (obj[0]["Passed"] == false) {
                    $('#btnUpdate').attr("disabled", false);
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


function LoadProInvPrnEdit(InvId, CompId, SuppId) {
    debugger;

    $.ajax({
        url: "/ProcessInvoice/GetInvPrnEditItemDetails",
        data: JSON.stringify({ Process_Invid: InvId, CompanyId: CompId, SupplierId: SuppId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            PrnItemList = result;
            loadPrnItemTable(PrnItemList);
            var IId = 0;
            var CId = 0;
            var SId = 0;
            var PrnDtid = 0;

            PrnMasId = PrnItemList[0].proc_recpt_masid;

            LoadPInvEditItemDetails(InvId, PrnMasId, CompId, SuppId);
            LoadPInvEditOrderDetails(InvId, CompId, SuppId, IId, CId, SId, PrnDtid);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadPInvEditItemDetails(InvId, PrnMasId, CompId, SuppId) {
    debugger;



    $.ajax({
        url: "/ProcessInvoice/GetProInvEditItemDetails",
        data: JSON.stringify({ Process_Invid: InvId, Proc_Recpt_Masid: PrnMasId, CompanyId: CompId, SupplierId: SuppId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            PESaveItemList = result;
            loadPInvSaveItemTable(PESaveItemList);




            //var Cb = ESaveItemList[0].CAbb;
            //var ExRate = ESaveItemList[0].EXRate;
            //var CuId = ESaveItemList[0].CurrId;

            //$('#txtCurrency').val(Cb);
            //$('#txtExchangeRate').val(ExRate);
            //$('#txtCurrencyId').val(CuId);


            PrnDetid = PESaveItemList[0].Proc_Recpt_Detid;

            PEItemList = PESaveItemList;

            PEItemList = $.grep(PEItemList, function (v) {
                return (v.Proc_Recpt_Masid === PrnMasId);
            });

            loadPInvItemTable(PEItemList);



        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadPInvEditOrderDetails(InvId, CompId, SuppId, ItmId, ClrId, SzId, PrnDetId) {
    debugger;

    $.ajax({
        url: "/ProcessInvoice/GetProInvEditOrdDetails",
        data: JSON.stringify({ Process_Invid: InvId, CompanyId: CompId, SupplierId: SuppId, Process_recpt_DetId: PrnDetId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            POSaveItemList = result;
            loadPInvOrdSaveTable(POSaveItemList);

            POItemList = POSaveItemList;

            POItemList = $.grep(POItemList, function (v) {
                return (v.Process_recpt_DetId === PrnDetid);
            });

            loadPInvOrdTable(POItemList);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadProInvAddlessEdit(Id) {
    debugger;

    $.ajax({
        url: "/ProcessInvoice/GetProInvEditAddLessDetails",
        data: JSON.stringify({ Process_Invid: Id }),
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

function LoadProInvRateDiffEdit(Id) {
    debugger;

    $.ajax({
        url: "/ProcessInvoice/GetProInvEditRateDiffDetails",
        data: JSON.stringify({ Process_Invid: Id }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            CreDebSaveList = result;
            loadCreDebSaveTable(CreDebSaveList);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function ProInvUpdate() {
    debugger;
    var res = validate();
    if (res == false) {
        return false;
    }

    if (PEItemList.length == 0) {
        //alert("Please Enter the Item Details..");
        var msg = 'Please Enter the Item Details...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }


    //Check Qty
    var opchk = [];

    for (var y = 0; y < PEItemList.length; y++) {
        if (PEItemList[y].Invoice_Qty > 0) {
            opchk.push(PEItemList[y]);
        }
    }

    if (opchk.length == 0) {
        //alert('Please fill atleast any one invocie qty...');
        var msg = 'Please fill atleast any one invocie quantity...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }


    //Check Rate
    var opchk = [];

    for (var y = 0; y < PEItemList.length; y++) {
        if (PEItemList[y].Rate > 0) {
            opchk.push(PEItemList[y]);
        }
    }

    if (opchk.length == 0) {
        //alert('Please fill atleast any one rate...');
        var msg = 'Please fill atleast any one rate...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }


    var TotitemInvqty = 0;
    var TotordInvqty = 0;

    $.each(PESaveItemList, function () {
        TotitemInvqty = parseFloat(TotitemInvqty) + parseFloat(this.Invoice_Qty);
    });

    $.each(POSaveItemList, function () {
        TotordInvqty = parseFloat(TotordInvqty) + parseFloat(this.InvoiceQty);
    });


    if (TotitemInvqty.toFixed(3) != TotordInvqty.toFixed(3)) {
        //alert('Please Check Item and Order Inv Qty...');
        var msg = 'Please Check Item and Order Invoice quantity...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    var InvBillNo = 0;

    if (ChkBillNo == 'True') {

        var CNetAmt = $('#txtNetAmount').val();

        if (CNetAmt != GBillAmount) {
            //alert("Bill Amount Should Match With Net Amount..");
            var msg = 'Bill Amount Should Match With Net Amount...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return true;
        }
        InvBillNo = $('#ddlInvoiceNo option:selected').text();
    } else {

        InvBillNo = $('#txtInvoiceNo').val();
    }

    CreDebSaveList = $.grep(CreDebSaveList, function (v) {
        return (v.IsChecked === 'Y');
    });

    var objProSubmit = {


        OrderType: OrdType,
        Inv_No: InvBillNo,
        Inv_Date: $('#txtInvoiceDate').val(),//new Date($('#txtInvoiceDate').val()),
        Inv_Amount:  $('#txtNetAmount').val(),
        Entry_No: $('#txtEntryno').val(),
        Entry_Date: $('#txtEntryDate').val(),//new Date($('#txtEntryDate').val()),
        Remarks: $('#txtremarks').val(),
        Payment_Amt: 0,
        DebitCredit: "N",
        DebtRaised: "N",
        Approved: "N",
        SupplierId: SuppId,
        InternalOrExternal: ProType,
        CreatedBy: Guserid,
        ApprovedBy: Guserid,
        Process_Invid: ProcessInvId,
        MultiFlag: "N",


        ProInvDDet: PESaveItemList,
        ProInvOrdDDet: POSaveItemList,
        ProInvDcDet: PrnItemList,
        ProInvAL: AccList,
        ProInvRDiff: CreDebSaveList,



    };
    debugger;
    LoadingSymb();
    $.ajax({
        url: "/ProcessInvoice/Update",
        data: JSON.stringify(objProSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {


            if (result.Value == true) {
                AddInvBillNo("Y");
                AddUserEntryLog('Process', 'Process Invoice', 'UPDATE', $("#txtEntryno").val());
                //alert("Data Updated Sucessfully");
                var msg = 'Data Updated Sucessfully...';
                var flg = 1;
                var mod = 0;
                var url = "";
                AlartMessage(msg, flg, mod, url);

                $('#myModal1').modal('hide');
                //window.location.reload();
                //ClearAddData();

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
        url: "/ProcessInvoice/LoadEditProInvDetails",
        data: JSON.stringify({ Process_Invid: Id }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            debugger;
            if (obj != undefined) {

                $('#txtcompany').val(obj[0]["Company"]);
                $('#txtProcessor').val(obj[0]["Supplier"]);
                $('#txtEntryDate').val(moment(obj[0]["Entry_Date"]).format('DD/MM/YYYY'));
                $('#txtInvoiceDate').val(moment(obj[0]["Inv_Date"]).format('DD/MM/YYYY'));
                $('#txtInvoiceNo').val(obj[0]["Inv_No"]);
                $('#txtEntryno').val(obj[0]["Entry_No"]);
                $('#txtProcess').val(obj[0]["Process"]);
                $('#txtUnit').val(obj[0]["Unit"]);

                //$('#txtCurrency').val(obj[0]["CurrencyId"]);
                //$('#txtExchangeRate').val(obj[0]["ExchangeRate"]);
                //$('#txtGrossAmount').val(obj[0]["Gross_amount"]);
                $('#txtRemarks').val(obj[0]["remarks"]);


                //$('#txtCreditRate').val(obj[0]["CRateDiff"]);
                //$('#txtDebitRate').val(obj[0]["DRateDiff"]);
                //$('#txtRateReason').val(obj[0]["DReason"]);



                if (ChkBillNo == "True") {
                    $('#dptInvId').show();
                    $('#txtInvId').hide();
                    $('#optNewBill').show();
                } else {
                    $('#txtInvId').show();
                    $('#dptInvId').hide();
                    $('#optNewBill').hide();
                }
                CmpId = obj[0]["CompanyId"];
                SuppId = obj[0]["SupplierId"];
                OrdType = obj[0]["OrderType"];
                if (OrdType == 'W') {
                    $('#optMS').prop('checked', true);
                }
                else if (OrdType == 'S') {
                    $('#optSS').prop('checked', true);
                }
                else if (OrdType == 'E') {
                    $('#optES').prop('checked', true);
                }
                else if (OrdType == 'G') {
                    $('#optGS').prop('checked', true);
                }
                ProcessId = obj[0]["ProcessId"];
                ProcessInvId = obj[0]["Process_Invid"];
                UnitId = obj[0]["UnitId"];
                ProType = obj[0]["InternalOrExternal"];

                LoadProInvPrnEdit(Id, CmpId, SuppId);
                LoadProInvAddlessEdit(Id);
                EditLoadBillInvNoAmt(CmpId, SuppId);


                $('#myModal').modal('hide');
                $('#myModal1').modal('show');
                $('#btnUpdate').hide();
                $('#btnAdd').hide();
                $('#btnDel').show();


                if (obj[0]["Passed"] == true) {
                    //alert('Bill pass are made for this entry,Cannot update the INVOICE...!');
                    var msg = 'Bill pass are made for this entry,Cannot Delete the INVOICE...!';
                    var flg = 4;
                    var mod = 1;
                    var url = "";
                    AlartMessage(msg, flg, mod, url);
                    $('#btnUpdate').attr("disabled", true);
                    $('#btnDel').attr("disabled", true);
                } else if (obj[0]["Passed"] == false) {
                    $('#btnUpdate').attr("disabled", false);
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

function ProInvDelete() {
    debugger;
    var res = validate();
    if (res == false) {
        return false;
    }

    if (PEItemList.length == 0) {
        //alert("Please Enter the Item Details..");
        var msg = 'Please Enter the Item Details...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    //Check Qty
    var opchk = [];

    for (var y = 0; y < PEItemList.length; y++) {
        if (PEItemList[y].Invoice_Qty > 0) {
            opchk.push(PEItemList[y]);
        }
    }

    if (opchk.length == 0) {
        //alert('Please fill atleast any one invocie qty...');
        var msg = 'Please fill atleast any one invocie quantity...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }


    //Check Rate
    var opchk = [];

    for (var y = 0; y < PEItemList.length; y++) {
        if (PEItemList[y].Rate > 0) {
            opchk.push(PEItemList[y]);
        }
    }

    if (opchk.length == 0) {
        //alert('Please fill atleast any one rate...');
        var msg = 'Please fill atleast any one rate...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    //var CompId = $('select#ddlACompany option:selected').val();
    //var SuppId = $('select#ddlAProcessor option:selected').val();
    //var OrdType = $('input[name="optwrkord"]:checked').attr('value');
    //var PType = $('input[name="optExt"]:checked').attr('value');


    //if (PType == "P") {
    //    var ProcessType = "E";
    //}
    //else {
    //    var ProcessType = "I";
    //}

    var InvBillNo = 0;

    if (ChkBillNo == 'True') {

        var CNetAmt = $('#txtNetAmount').val();

        if (CNetAmt != GBillAmount) {
            //alert("Bill Amount Should Match With Net Amount..");
            var msg = 'Bill Amount Should Match With Net Amount...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return true;
        }
        InvBillNo = $('#ddlInvoiceNo option:selected').text();
    } else {

        InvBillNo = $('#txtInvoiceNo').val();
    }


    var objProSubmit = {


        OrderType: OrdType,
        Inv_No: InvBillNo,
        Inv_Date: $('#txtInvoiceDate').val(),//new Date($('#txtInvoiceDate').val()),
        Inv_Amount: 0,
        Entry_No: $('#txtEntryno').val(),
        Entry_Date: $('#txtEntryDate').val(),//new Date($('#txtEntryDate').val()),
        Remarks: $('#txtremarks').val(),
        Payment_Amt: 0,
        DebitCredit: "N",
        DebtRaised: "N",
        Approved: "N",
        SupplierId: SuppId,
        InternalOrExternal: ProType,
        CreatedBy: Guserid,
        ApprovedBy: Guserid,
        Process_Invid: ProcessInvId,
        MultiFlag: "N",


        ProInvDDet: PESaveItemList,
        ProInvOrdDDet: POSaveItemList,
        ProInvDcDet: PrnItemList,
        ProInvAL: AccList,
    };
    debugger;
    LoadingSymb();
    $.ajax({
        url: "/ProcessInvoice/Delete",
        data: JSON.stringify(objProSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {


            if (result.Value == true) {
                AddInvBillNo("N");
                AddUserEntryLog('Process', 'Process Invoice', 'DELETE', $("#txtEntryno").val());
                //alert("Data Deleted Sucessfully");
                var msg = 'Data Deleted Sucessfully...';
                var flg = 2;
                var mod = 0;
                var url = "";
                AlartMessage(msg, flg, mod, url);

                $('#myModal1').modal('hide');
                window.location.reload();
                //ClearAddData();

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

    docname = "PROCESS INVOICE";
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

    var comp = $('#ddlMCompany').val();
    if (comp != null) {
        window.open("../ReportInline/Process/ProcessInvoice/ProcessInvoiceInlineReport.aspx?Masid=" + Repid + "&Debcred=" + p[0] + "&Rem=" + p[1] + "&Style=" + p[2] + "&Pendingdet=" + p[3] + "&Ewaybill=" + p[4] + "&Ewaydate=" + p[5] + "&Companyid=" + comp + "&Type=" + "P");
    }

}
function backtomain() {
    $("#myModal2").hide();
    $("#myModal2").modal('hide');
}


$(document).ready(function () {

    $('#tblPrnitmdetails').on('click', 'tr', function (e) {
        debugger;

        var table = $('#tblPrnitmdetails').DataTable();
        var row = $(this).closest('tr');
        var data = $('#tblPrnitmdetails').dataTable().fnGetData(row);

        var CSno = data.proc_recpt_masid;

        var colorempty = [];
        colorempty = PESaveItemList;

        colorempty = $.grep(colorempty, function (v) {
            return (v.Proc_Recpt_Masid === CSno);
        });

        PEItemList = colorempty;
        loadPInvItemTable(PEItemList);

        if (PEItemList.length > 0) {
            var detid = PEItemList[0].Proc_Recpt_Detid;

            POItemList = $.grep(POSaveItemList, function (v) {
                return (v.Process_recpt_DetId === detid);
            });

            loadPInvOrdTable(POItemList);
        }

        if (CreDebSaveList.length > 0) {
            CreDebList = $.grep(CreDebSaveList, function (v) {
                return (v.Proc_Recpt_Masid === CSno);
            });
            loadCreDebTable(CreDebList);
        }

    });
});



$(document).ready(function () {

    $('#tblPItemdetails').on('click', 'tr', function (e) {
        debugger;

        var table = $('#tblPItemdetails').DataTable();
        var row = $(this).closest('tr');
        var data = $('#tblPItemdetails').dataTable().fnGetData(row);

        var CSno = data.Proc_Recpt_Detid;


        var colorempty = [];
        colorempty = POSaveItemList;

        colorempty = $.grep(colorempty, function (v) {
            return (v.Process_recpt_DetId === CSno);
        });

        POItemList = colorempty;
        loadPInvOrdTable(POItemList);

    });
});


function LoadBillInvNo(comid, suppid) {

    var EDate = $('#txtEntryDate').val();
    var billid = 0;
    var PType = $('input[name="optExt"]:checked').attr('value');

    var ire = '';
    if (PType == 'P') {
        ire = 'E'
    } else {
        ire = 'I'
    }

    $.ajax({
        url: "/ProcessInvoice/GetBillInvNo",
        data: JSON.stringify({ CompanyId: comid, SupplierId: suppid, Inv_Date: EDate, BillId: billid, IorE: ire }),
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

    var PType = $('input[name="optExt"]:checked').attr('value');

    var ire = '';
    if (PType == 'P') {
        ire='E'
    } else {
       ire='I'
    }

    $.ajax({
        url: "/ProcessInvoice/GetBillInvNo",
        data: JSON.stringify({ CompanyId: GCompId, SupplierId: GSuppId, Inv_Date: EDate, BillId: billid, IorE: ire }),
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
    for (var e = 0; e < PEItemList.length; e++) {
        var amount = PEItemList[e].InvAmt;
        totalamnt = totalamnt + parseFloat(amount);

    }

    var totalamnt1 = 0;
    var totalamnt2 = 0;
    for (var e = 0; e < PEItemList.length; e++) {
        var amount1 = PEItemList[e].Amount;
        var amount2 = PEItemList[e].Invoice_Qty;
        totalamnt1 = totalamnt1 + parseFloat(amount1);
        totalamnt2 = totalamnt2 + parseFloat(amount2);

    }
    $('#txtTotalamount').val(totalamnt1.toFixed(2));
  
    $('#txtTotalQty').val(totalamnt2.toFixed(3));




    var TotNetAmt = 0;
    var TotGrossAmt = 0;

    $.each(PESaveItemList, function (i) {
        var InvAmt = PESaveItemList[i].Amount;
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

        TotNetAmt = parseFloat(TotNetAmt).toFixed(2);
        $('#txtNetAmount').val(TotNetAmt);
        $('#txtNNetamount').val(TotNetAmt);
    }
    else {
        TotGrossAmt = parseFloat(TotGrossAmt).toFixed(2);
        $('#txtNetAmount').val(TotGrossAmt);
        $('#txtNNetamount').val(TotGrossAmt);
    }
    TotGrossAmt = parseFloat(TotGrossAmt).toFixed(2);
    $('#txtGrossamount').val(TotGrossAmt);

}