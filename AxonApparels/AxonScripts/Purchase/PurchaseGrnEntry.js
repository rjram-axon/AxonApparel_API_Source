var PurOrdId = 0;
var ItemList = [];
var CompId = 0;
var SupplierId = 0;
var PurItemType = 0;
var POrderListSave = 0;
var POrderList = 0;
var Itemrowindex = -1;
var rowindex = -1;
var index = 0;
var ind = 0;
var POrderType = 0;
var Mode = 0;
var GrnMasId = 0;
var INQty = 0;
var colorempty = [];
var Userid = 0;
var UserName = 0;
var Guserid = 0;
var EnbTranDate = 0;
var ChkBudApp = 0;
var MainstoreDDL = '';
var SubstoreDDL = '';
var LoginUserid = '';
var ProdUnitDDL = '';
var LoginUserid = '';
var editmasunitstore = 0;
var editsubmasunitstore = 0;
var editsubstore = 0;
var validatestore = "False";
$(document).ready(function () {
    debugger;
    LoginUserid = $("#hdnLoginUserid").data('value');
    Guserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    EnbTranDate = $("#hdnETransDate").data('value');
    ChkBudApp = $("#hdnCostBudPurAppid").data('value');
    validatestore = $("#hdnValidateStore").data('value');

    var qrStr = window.location.search;
    var spQrStr = qrStr.substring(1);
    var arrQrStr = new Array();
    var arr = spQrStr.split('?');

    for (var i = 0; i < arr.length; i++) {
        var queryvalue = arr[i].split('=');
    }

    PurOrdId = queryvalue[1];
    CompId = queryvalue[7];
    POrderType = queryvalue[3];
    SupplierId = queryvalue[9];
    PurItemType = queryvalue[5];
    Mode = queryvalue[13];
    GrnMasId = queryvalue[11];
    if (EnbTranDate == "Y") {
        $("#txtEntryDate").prop("disabled", true);
        $("#txtDcDate").prop("disabled", true);
        $("#txtSupInvDate").prop("disabled", true);

    } else {
        $("#txtEntryDate").prop("disabled", false);
        $("#txtDcDate").prop("disabled", false);
        $("#txtSupInvDate").prop("disabled", false);
    }

    /////////////////Store//////////////////	

    LoadEmployeeStoreunit();
    LoadUserCompanyDDL();
    if (Mode == 0) {

        //LoadCompanyDDL("#ddlMSCompany,#ddlSCompany");	
        //LoadStoreUnitDDL("#ddlMSMMainStore");	
        // LoadStoreSectionDDL("#ddlSecStore");	
        //LoadCompanyUnitDDL("#ddlPUnit");	
        // LoadWorkdivisionDDL("#ddlWK");	
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
        // $("#Delete").attr("disabled", true);
    }

    ////////////////////////////////////////
    if (Mode == 0) {
        LoadGrnItemDetails(PurOrdId, CompId, SupplierId);
        LoadCompany();
        LoadSupplier();

        GenerateNumber();

        var ItmId = 0;
        var ClrId = 0;
        var SzId = 0;
        var UomId = 0;
        var Qty = 0;
        LoadPOrderSaveDetails(PurOrdId, ItmId, ClrId, SzId, UomId, Qty);
        getDate();
    }
    if (Mode == 1) {

        LoadCompany();
        LoadSupplier();
        LoadPurGrnEditDetails(GrnMasId);
        LoadGrnOrderEditSaveDetails(GrnMasId);
    }

    if (Mode == 2) {
        LoadCompany();
        LoadSupplier();
        LoadPurGrnEditDetails(GrnMasId);
        LoadGrnOrderEditSaveDetails(GrnMasId);
    }

    $(document).on('focusout', '#txtDcNo', function () {
        debugger;
        var Val = $(this).val();
        CheckRefNo(Val);

    });

    $(document).on('change', '.calcAmt', function () {
        debugger;
        var table = $('#tblEntryGrnItemdetails').DataTable();

        var CSno = table.row($(this).parents('tr')).data()["SNo"];
        var Rate = table.row($(this).parents('tr')).data()["rate"];
        var IId = table.row($(this).parents('tr')).data()["itemid"];
        var CId = table.row($(this).parents('tr')).data()["colorid"];
        var SId = table.row($(this).parents('tr')).data()["sizeid"];
        var PUId = table.row($(this).parents('tr')).data()["uomId"];
        var Balance = table.row($(this).parents('tr')).data()["balance"];
        var ExRate = table.row($(this).parents('tr')).data()["Erate"];
        var Allval = table.row($(this).parents('tr')).data()["AllowValue"];
        var Val = $(this).val();

        var ratecal = Val;
        var res = ratecal * Rate;
        var ExcQty = parseFloat(ratecal) - parseFloat(Balance);
        if (ExcQty > 0) {
            var EQty = parseFloat(ExcQty).toFixed(3);
        } else {
            var EQty = 0;
        }

        var EAmt = parseFloat(EQty) * parseFloat(ExRate);
        finalresult = res.toFixed(2);
        $.each(ItemList, function () {
            if (this.SNo == CSno) {
                this.Amt = finalresult;
                //this.Amt = parseFloat(res) + parseFloat(EAmt);
                this.excess_qty = EQty;
                // this.received_qty = ratecal;
                if (EQty > 0) {
                    this.received_qty = Balance;
                }
                else {

                    this.received_qty = ratecal;
                }
            }
        });
        //  loadGrnItemTable(ItemList);

        var table = $('#tblEntryGrnItemdetails').DataTable();
        var ecdata = table.rows().data();

        $('input[id=txtRQty]').each(function (ig) {
            var slno = ecdata[ig].SNo;
            var row = $(this).closest('tr');
            for (var h = 0; h < ItemList.length; h++) {
                if (slno == ItemList[h].SNo && CSno == slno) {
                    var received_qty = ItemList[h].received_qty;
                    row.find('#txtRQty').val(received_qty);
                    var excess_qty = ItemList[h].excess_qty;
                    row.find('#txtExQty').val(excess_qty);
                    var Amt = ItemList[h].Amt;
                    row.find('#txttotamt').val(Amt);
                }
            }

        });


    });

    $(document).on('keyup', '.calcAmt', function () {
        debugger;
        var table = $('#tblEntryGrnItemdetails').DataTable();

        var CSno = table.row($(this).parents('tr')).data()["SNo"];
        var Rate = table.row($(this).parents('tr')).data()["rate"];
        var IId = table.row($(this).parents('tr')).data()["itemid"];
        var CId = table.row($(this).parents('tr')).data()["colorid"];
        var SId = table.row($(this).parents('tr')).data()["sizeid"];
        var PUId = table.row($(this).parents('tr')).data()["uomId"];
        var Balance = table.row($(this).parents('tr')).data()["balance"];
        var ExRate = table.row($(this).parents('tr')).data()["Erate"];
        var Allval = table.row($(this).parents('tr')).data()["AllowValue"];

        var Val = $(this).val();

        if (Val > Allval) {
            //alert('Should not exceed Allowance Value...');
            var msg = 'Should not exceed Allowance Value....';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            $.each(ItemList, function () {
                if (this.SNo == CSno) {
                    this.quantity = 0;
                    this.excess_qty = 0;
                }
            });

            var table = $('#tblEntryGrnItemdetails').DataTable();
            var data = table.rows().data();

            $('input[id=txtRQty]').each(function (ig) {
                if (data[ig].SNo == CSno) {
                    var row = $(this).closest('tr');
                    row.find('#txtRQty').val(0);
                    row.find('#txtExQty').val(0);

                }
            });

            //finalresult = res.toFixed(2);
            $.each(POrderListSave, function () {
                if (this.OItemid == IId && this.OColorid == CId && this.OSizeid == SId && this.OUomid == PUId) {
                    //this.quantity = 0;
                    this.quantity = 0;
                    //this.Excess_Qty = 0;


                }
            });



            colorempty = POrderListSave;

            colorempty = $.grep(colorempty, function (v) {
                return (v.OItemid === IId && v.OColorid === CId && v.OSizeid === SId && v.OUomid === PUId);
            }); tblEntryGrnItemdetails

            // loadPOrderTable(colorempty);

            var table = $('#tblEntryGrnOrderdetails').DataTable();
            var ecdata = table.rows().data();

            $('input[id=txtOQty]').each(function (ig) {
                var slno = ecdata[ig].SNo;
                var row = $(this).closest('tr');
                for (var h = 0; h < colorempty.length; h++) {
                    if (ecdata[ig].OItemid == colorempty[h].OItemid && ecdata[ig].OColorid == colorempty[h].OColorid && ecdata[ig].OSizeid == colorempty[h].OSizeid && ecdata[ig].OUomid == colorempty[h].OUomid && ecdata[ig].pur_ord_detid == colorempty[h].pur_ord_detid) {
                        var quantity = colorempty[h].quantity;
                        row.find('#txtOQty').val(quantity);

                    }
                }

            });

            return true;
        }
        var ratecal = Val;
        var res = ratecal * Rate;
        var ExcQty = parseFloat(ratecal) - parseFloat(Balance);
        if (ExcQty > 0) {
            var EQty = parseFloat(ExcQty).toFixed(3);
        } else {
            var EQty = 0;
        }

        var EAmt = parseFloat(EQty) * parseFloat(ExRate);

        ///split///

        //////////


        finalresult = res.toFixed(2);
        $.each(ItemList, function () {
            if (this.SNo == CSno) {
                this.Amt = finalresult;
                //this.Amt = parseFloat(res) + parseFloat(EAmt);
                this.excess_qty = EQty;
                this.received_qty = ratecal;
                //if (EQty > 0) {
                //    this.received_qty = Balance;
                //}
                //else {

                //    this.received_qty = ratecal;
                //}
            }
        });
        //  loadGrnItemTable(ItemList);

        var table = $('#tblEntryGrnItemdetails').DataTable();
        var ecdata = table.rows().data();

        $('input[id=txtRQty]').each(function (ig) {
            var slno = ecdata[ig].SNo;
            var row = $(this).closest('tr');
            for (var h = 0; h < ItemList.length; h++) {
                if (slno == ItemList[h].SNo && CSno == slno) {
                    var received_qty = ItemList[h].received_qty;
                    row.find('#txtRQty').val(received_qty);
                    var excess_qty = ItemList[h].excess_qty;
                    row.find('#txtExQty').val(excess_qty);
                    var Amt = ItemList[h].Amt;
                    row.find('#txttotamt').val(Amt);
                }
            }

        });


        /////Load Save Order Table
        finalresult = res.toFixed(2);
        $.each(POrderListSave, function () {
            if (this.OItemid == IId && this.OColorid == CId && this.OSizeid == SId && this.OUomid == PUId) {
                //this.quantity = 0;
                this.quantity = 0;
                //this.Excess_Qty = 0;


            }
        });



        var pid = [];
        var bal = [];
        var qty = [];
        for (var t = 0; t < POrderListSave.length; t++) {
            if (POrderListSave[t].OItemid == IId && POrderListSave[t].OColorid == CId && POrderListSave[t].OSizeid == SId && POrderListSave[t].OUomid == PUId) {
                pid.push(POrderListSave[t].pur_ord_detid);
                bal.push(POrderListSave[t].Balance);
                qty.push(POrderListSave[t].quantity);
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

        for (var u = 0; u < POrderListSave.length; u++) {
            for (var r = 0; r < pid.length; r++) {
                if (POrderListSave[u].pur_ord_detid == pid[r]) {
                    POrderListSave[u].quantity = parseFloat(qty[r]).toFixed(3);
                }
            }
        }

        loadPOrderSaveTable(POrderListSave);


        for (var u = 0; u < POrderList.length; u++) {
            for (var r = 0; r < pid.length; r++) {
                if (POrderList[u].pur_ord_detid == pid[r]) {
                    POrderList[u].quantity = parseFloat(qty[r]).toFixed(3);
                }
            }
        }

        //loadPOrderTable(POrderList);



        colorempty = POrderListSave;

        colorempty = $.grep(colorempty, function (v) {
            return (v.OItemid === IId && v.OColorid === CId && v.OSizeid === SId && v.OUomid === PUId);
        });

        // loadPOrderTable(colorempty);

        var table = $('#tblEntryGrnOrderdetails').DataTable();
        var ecdata = table.rows().data();

        $('input[id=txtOQty]').each(function (ig) {
            var slno = ecdata[ig].SNo;
            var row = $(this).closest('tr');
            for (var h = 0; h < colorempty.length; h++) {
                if (ecdata[ig].OItemid == colorempty[h].OItemid && ecdata[ig].OColorid == colorempty[h].OColorid && ecdata[ig].OSizeid == colorempty[h].OSizeid && ecdata[ig].OUomid == colorempty[h].OUomid && ecdata[ig].pur_ord_detid == colorempty[h].pur_ord_detid) {
                    var quantity = colorempty[h].quantity;
                    row.find('#txtOQty').val(quantity);

                }
            }

        });

        POrderList = [];
        POrderList = colorempty;


        var totalamnt = 0;
        for (var e = 0; e < ItemList.length; e++) {
            var amount = ItemList[e].received_qty;
            totalamnt = totalamnt + parseFloat(amount);

        }


        $('#txttotal').val(totalamnt.toFixed(3));

        var totalEQty = 0;
        for (var e = 0; e < ItemList.length; e++) {
            var EQty = ItemList[e].excess_qty;
            totalEQty = totalEQty + parseFloat(EQty);

        }


        $('#txtEtotal').val(totalEQty.toFixed(3));

        var totamnt = 0;
        for (var e = 0; e < ItemList.length; e++) {
            var amt = ItemList[e].Amt;
            totamnt = totamnt + parseFloat(amt);

        }


        $('#txtEtotalAmnt').val(totamnt.toFixed(3));


        var rows = $("#tblEntryGrnItemdetails").dataTable().fnGetNodes();
        var dtTable = $('#tblEntryGrnItemdetails').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 2 }).data()[0];
            $('input[id=txtRQty]').each(function () {
                if (sn == CSno && $(this).val() == ratecal) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtRQty').val();
                    row.find('#txtRQty').focus().val('').val(num);
                    return true;
                }
            });
        }
    });

    $(document).on('keyup', '.calcEQty', function () {
        debugger;
        var table = $('#tblEntryGrnItemdetails').DataTable();


        var CSno = table.row($(this).parents('tr')).data()["SNo"];
        var Rate = table.row($(this).parents('tr')).data()["rate"];
        var IId = table.row($(this).parents('tr')).data()["itemid"];
        var CId = table.row($(this).parents('tr')).data()["colorid"];
        var SId = table.row($(this).parents('tr')).data()["sizeid"];
        var PUId = table.row($(this).parents('tr')).data()["uomId"];
        var Balance = table.row($(this).parents('tr')).data()["balance"];
        var ExQty = table.row($(this).parents('tr')).data()["excess_qty"];
        var Amt = table.row($(this).parents('tr')).data()["Amt"];

        var Val = $(this).val();
        var ERate = Val;
        var res = ExQty * ERate;
        var TEAmt = parseFloat(Amt) + parseFloat(res);

        finalresult = res.toFixed(2);
        $.each(ItemList, function () {
            if (this.SNo == CSno) {
                // this.Erate = ERate;
                this.excess_qty = Val;
                this.Amt = TEAmt;

            }
        });



        loadGrnItemTable(ItemList);
        var totalEQty = 0;
        for (var e = 0; e < ItemList.length; e++) {
            var EQty = ItemList[e].excess_qty;
            totalEQty = totalEQty + parseFloat(EQty);

        }


        $('#txtEtotal').val(totalEQty.toFixed(3));

        var rows = $("#tblEntryGrnItemdetails").dataTable().fnGetNodes();
        var dtTable = $('#tblEntryGrnItemdetails').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 2 }).data()[0];
            $('input[id=txtExQty]').each(function () {
                if (sn == CSno && $(this).val() == Val) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtExQty').val();
                    row.find('#txtExQty').focus().val('').val(num);
                    return true;
                }
            });
        }
    });

    $(document).on('keyup', '.calcExcessAmt', function () {
        debugger;
        var table = $('#tblEntryGrnItemdetails').DataTable();


        var CSno = table.row($(this).parents('tr')).data()["SNo"];
        var Rate = table.row($(this).parents('tr')).data()["rate"];
        var IId = table.row($(this).parents('tr')).data()["itemid"];
        var CId = table.row($(this).parents('tr')).data()["colorid"];
        var SId = table.row($(this).parents('tr')).data()["sizeid"];
        var PUId = table.row($(this).parents('tr')).data()["uomId"];
        var Balance = table.row($(this).parents('tr')).data()["balance"];
        var ExQty = table.row($(this).parents('tr')).data()["excess_qty"];
        var Amt = table.row($(this).parents('tr')).data()["Amt"];
        var received_qty = table.row($(this).parents('tr')).data()["received_qty"];

        var Val = $(this).val();
        var ERate = Val;
        var res1 = received_qty * Rate;
        var res = ExQty * ERate;
        var TEAmt = parseFloat(res1) + parseFloat(res);

        finalresult = res.toFixed(2);
        $.each(ItemList, function () {
            if (this.SNo == CSno) {
                this.Erate = ERate;
                this.excess_qty = ExQty;
                this.Amt = TEAmt;

            }
        });

        loadGrnItemTable(ItemList);
        var rows = $("#tblEntryGrnItemdetails").dataTable().fnGetNodes();
        var dtTable = $('#tblEntryGrnItemdetails').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 2 }).data()[0];
            $('input[id=txtExRate]').each(function () {
                if (sn == CSno && $(this).val() == Val) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtExRate').val();
                    row.find('#txtExRate').focus().val('').val(num);
                    return true;
                }
            });
        }
    });
    $(document).on('keyup', '.calcsepquan', function () {
        debugger;
        var table = $('#tblEntryGrnOrderdetails').DataTable();

        var pid = table.row($(this).parents('tr')).data()["pur_ord_detid"];
        var itmid = table.row($(this).parents('tr')).data()["OItemid"];
        var colorid = table.row($(this).parents('tr')).data()["OColorid"];
        var sizeid = table.row($(this).parents('tr')).data()["OSizeid"];
        var uomid = table.row($(this).parents('tr')).data()["OUomid"];
        var balq = table.row($(this).parents('tr')).data()["Balance"];


        var value = $(this).val();
        var Qty = value;

        $.each(POrderListSave, function () {
            if (this.pur_ord_detid == pid) {


                if (balq >= value) {
                    this.quantity = value;
                }
                else {
                    var t = value - balq;
                    this.quantity = balq;
                }

            }
        });

        $.each(POrderList, function () {
            if (this.pur_ord_detid == pid) {

                if (balq >= value) {
                    this.quantity = value;
                }
                else {
                    var t = value - balq;
                    this.quantity = balq;
                }

            }
        });




        var totalamnt = 0;

        for (var e = 0; e < POrderList.length; e++) {
            var amount = POrderList[e].quantity;
            totalamnt = totalamnt + parseFloat(amount);
        }
        $.each(ItemList, function () {
            if (this.itemid == itmid && this.sizeid == sizeid && this.colorid == colorid && this.uomId == uomid) {
                //this.quantity = 0;

                this.received_qty = totalamnt;
                //}


            }
        });


        // loadPOrderSaveTable(POrderListSave);
        // loadPOrderTable(POrderList);

        var table = $('#tblEntryGrnOrderdetails').DataTable();
        var ecdata = table.rows().data();

        $('input[id=txtOQty]').each(function (ig) {
            var slno = ecdata[ig].SNo;
            var row = $(this).closest('tr');
            for (var h = 0; h < POrderList.length; h++) {
                //if (ecdata[ig].OItemid == POrderList[h].OItemid && ecdata[ig].OColorid == POrderList[h].OColorid && ecdata[ig].OSizeid == POrderList[h].OSizeid && ecdata[ig].OUomid == POrderList[h].OUomid) {
                //    var quantity = POrderList[h].quantity;
                //    row.find('#txtOQty').val(quantity);

                //}
                if (ecdata[ig].pur_ord_detid == POrderList[h].pur_ord_detid) {
                    var quantity = POrderList[h].quantity;
                    row.find('#txtOQty').val(quantity);

                }
            }

        });

        //loadGrnItemTable(ItemList);

        var table = $('#tblEntryGrnItemdetails').DataTable();
        var ecdata = table.rows().data();

        $('input[id=txtRQty]').each(function (ig) {
            var slno = ecdata[ig].SNo;
            var row = $(this).closest('tr');
            for (var h = 0; h < ItemList.length; h++) {
                if (ig == h) {
                    var received_qty = ItemList[h].received_qty;
                    row.find('#txtRQty').val(received_qty);
                    var excess_qty = ItemList[h].excess_qty;
                    row.find('#txtExQty').val(excess_qty);
                    var Amt = ItemList[h].Amt;
                    row.find('#txttotamt').val(Amt);
                }
            }

        });

        var rows = $("#tblEntryGrnOrderdetails").dataTable().fnGetNodes();
        var dtTable = $('#tblEntryGrnOrderdetails').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 2 }).data()[0];
            $('input[id=txtOQty]').each(function () {
                if (sn == pid && $(this).val() == Qty) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtOQty').val();
                    row.find('#txtOQty').focus().val('').val(num);
                    return true;
                }
            });
        }
    });

    $(document).on('keyup', '.calcexssqty', function () {
        debugger;
        var table = $('#tblEntryGrnOrderdetails').DataTable();

        var pdid = table.row($(this).parents('tr')).data()["pur_ord_detid"];
        var itmid = table.row($(this).parents('tr')).data()["OItemid"];
        var colorid = table.row($(this).parents('tr')).data()["OColorid"];
        var sizeid = table.row($(this).parents('tr')).data()["OSizeid"];
        var uomid = table.row($(this).parents('tr')).data()["OUomid"];


        var value = $(this).val();
        var EQty = value;

        var temp = [];
        temp = $.grep(ItemList, function (v) {
            return (v.itemid === itmid && v.colorid === colorid && v.sizeid === sizeid && v.uomId === uomid);
        });
        var totex = temp[0].excess_qty;

        var totalamnt = 0;
        //for (var e = 0; e < POrderList.length; e++) {
        //    if (POrderList[e].OItemid != itmid && POrderList[e].OColorid != colorid && POrderList[e].OSizeid != sizeid && POrderList[e].OUomid != uomid && POrderList[e].pur_ord_detid != pdid) {
        $.each(POrderList, function () {
            if (this.pur_ord_detid !== pdid) {

                var amount = this.Excess_Qty;
                totalamnt = totalamnt + parseFloat(amount);
            }
        });
        var tot = parseFloat(totalamnt) + parseFloat(EQty);
        if (tot > totex) {
            //alert('Should not exceed total excess qty for this item...');
            var msg = 'Should not exceed total excess qty for this item...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);


            $.each(POrderList, function () {
                if (this.OItemid == itmid && this.OColorid == colorid && this.OSizeid == sizeid && this.OUomid == uomid && this.pur_ord_detid == pdid) {


                    this.Excess_Qty = 0;


                }
            });


            $.each(POrderListSave, function () {
                if (this.OItemid == itmid && this.OColorid == colorid && this.OSizeid == sizeid && this.OUomid == uomid && this.pur_ord_detid == pdid) {


                    this.Excess_Qty = 0;


                }
            });
            loadPOrderSaveTable(POrderListSave);
            loadPOrderTable(POrderList);

            var rows = $("#tblEntryGrnOrderdetails").dataTable().fnGetNodes();
            var dtTable = $('#tblEntryGrnOrderdetails').DataTable();
            for (var i = 0; i < rows.length; i++) {
                var sn = dtTable.cells({ row: i, column: 2 }).data()[0];
                $('input[id=txtOrdExcsQty]').each(function () {
                    if (sn == pdid) {
                        var row = $(this).closest('tr');
                        var num = row.find('#txtOrdExcsQty').val();
                        row.find('#txtOrdExcsQty').focus().val('').val(num);
                        return true;
                    }
                });
            }
            return true;
        }

        $.each(POrderList, function () {
            if (this.OItemid == itmid && this.OColorid == colorid && this.OSizeid == sizeid && this.OUomid == uomid && this.pur_ord_detid == pdid) {


                this.Excess_Qty = EQty;


            }
        });


        $.each(POrderListSave, function () {
            if (this.OItemid == itmid && this.OColorid == colorid && this.OSizeid == sizeid && this.OUomid == uomid && this.pur_ord_detid == pdid) {


                this.Excess_Qty = EQty;


            }
        });

        loadPOrderSaveTable(POrderListSave);
        loadPOrderTable(POrderList);

        var rows = $("#tblEntryGrnOrderdetails").dataTable().fnGetNodes();
        var dtTable = $('#tblEntryGrnOrderdetails').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 2 }).data()[0];
            $('input[id=txtOrdExcsQty]').each(function () {
                if (sn == pdid && $(this).val() == value) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtOrdExcsQty').val();
                    row.find('#txtOrdExcsQty').focus().val('').val(num);
                    return true;
                }
            });
        }
    });



});


function LoadEmployeeStoreunit() {
    debugger;
    if (UserName == 'superuser') {
        LoginUserid = 0;
    }

    $.ajax({
        url: "/StoreSetup/GetStoreRights",
        data: JSON.stringify({ Userid: LoginUserid, Storetype: 'M', Companyid: CompId }),
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
        data: JSON.stringify({ Userid: LoginUserid, Storetype: 'B', Companyid: CompId }),
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


function LoadUserCompanyUnitDDL() {

    httpGet("/CompanyUnit/GetCompanyUnits", onUserCompanyUnitSuccess, onUserCompanyUnitFailure);
}
function onUserCompanyUnitSuccess(result) {
    debugger;
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        var data = result.Value;
        var comp = [];
        $.each(data, function (i) {
            if (data[i].CompanyId == CompId) {
                comp.push(data[i]);
            }
        });

        $(ProdUnitDDL).empty();

        $.each(data, function () {
            $(ProdUnitDDL).append($('<option></option>').val(this.Id).text(this.CompanyUnitName));
        });
    }
    else {
        //alert('CompanyUnit loading failed');
        var msg = 'CompanyUnit loading failed...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
    }
}

function onUserCompanyUnitFailure(result) {
    //alert('CompanyUnit loading failed');
    var msg = 'CompanyUnit loading failed...';
    var flg = 4;
    var mod = 1;
    var url = "";
    AlartMessage(msg, flg, mod, url);
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
            if (data[i].CompanyId == CompId) {
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

function LoadSecStore() {
    //if (UserName != 'superuser') {
    //  //  LoadEmployeeStoreunit('S');
    //}
    $("#SubStoreId").hide();
    $("#SecStoId").show();
    $("#MainStoreId").hide();
    // LoadCompanyDDL("#ddlMSCompany,#ddlSCompany");
    //LoadStoreUnitDDL("#ddlMSMMainStore");	
    //LoadStoreSectionDDL("#ddlSecStore");
    //LoadCompanyUnitDDL("#ddlPUnit");
    //LoadWorkdivisionDDL("#ddlWK");

}
function LoadMainStore() {
    //if (UserName != 'superuser') {
    //    SubstoreDDL = '#ddlMSMMainStore';
    //    var typ = 'M';
    //    LoadEmployeeStoreunit(typ);
    //    MainstoreDDL = '#ddlMSCompany';
    //    ProdUnitDDL = '#ddlSCompany';
    //    LoadUserCompanyDDL();
    //} 
    $("#SubStoreId").hide();
    $("#SecStoId").hide();
    $("#MainStoreId").show();
}
function LoadSubStore() {
    // LoadEmployeeStoreunit('B');
    //if (UserName != 'superuser') {
    //    SubstoreDDL = '#ddlSMainStore';
    //    var typ = 'B';
    //    LoadEmployeeStoreunit(typ);
    //    //MainstoreDDL = '#ddlSCompany';
    //    //LoadUserCompanyDDL();
    //    //SubstoreDDL = '#ddlMSCompany';
    //    //var typ = 'M';
    //    //LoadEmployeeStoreunit(typ);

    //} else {
    //    LoadStoreUnitDDL("#ddlSMainStore");
    //}

    $("#SecStoId").hide();
    $("#MainStoreId").hide();
    $("#SubStoreId").show();
    $("#SubStorPrdId").hide();
    //  LoadCompanyDDL("#ddlSCompany,#ddlMSCompany");

}
function RadioSMClick() {
    $("#SubStoreMainId").show();
    $("#SubStorPrdId").hide();
}
function RadioSSPClick() {

    if (UserName != 'superuser') {
        SubstoreDDL = '#ddlSStoreSub';
        var typ = 'B';
        LoadEmployeeStoreunit(typ);
        ProdUnitDDL = '#ddlSStorePunit';
        LoadUserCompanyUnitDDL();
    } else {
        LoadStoreUnitDDL("#ddlSStoreSub");
        LoadCompanyUnitDDL("#ddlSStorePunit");
    }

    $("#SubStoreMainId").hide();
    $("#SubStorPrdId").show();
    //LoadStoreUnitDDL("#ddlSStoreSub");
    //LoadCompanyUnitDDL("#ddlSStorePunit");

}
function getDate() {

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
    $('#txtEntryDate').val(Fdatestring);
    $('#txtDcDate').val(Fdatestring);
    $('#txtSupInvDate').val(Fdatestring);
}

$(document).ready(function () {
    $("#tblEntryGrnItemdetails ").dataTable().find("tbody").on('click', 'tr', function () {
        index = (this.rowIndex) - 1;
    });
});

$(document).ready(function () {
    $("#tblEntryGrnOrderdetails ").dataTable().find("tbody").on('click', 'tr', function () {
        ind = (this.rowIndex) - 1;
    });
});
function LoadCompany() {
    $('#txtCompany').val("");


    $.ajax({
        url: "/Company/GetbyId/" + CompId,
        typr: "GET",

        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                $('#txtCompany').val(obj.CompanyName);
                $('#txtCompId').val(obj.CompanyId);

            }
        }

    });

}
function LoadSupplier() {
    $('#txtSupplier').val("");


    $.ajax({
        url: "/Supplier/GetbyId/" + SupplierId,
        typr: "GET",

        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                $('#txtSupplier').val(obj.SupplierName);
                $('#txtSuppId').val(obj.SupplierId);

            }
        }

    });

}
function LoadGrnItemDetails(PurOrdId) {
    debugger;

    $.ajax({
        url: "/GRNEntry/LoadGrnItemDetails",
        data: JSON.stringify({ MPurId: PurOrdId, companyid: CompId, supplierid: SupplierId, pur_type: POrderType }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            ItemList = result;
            $.each(ItemList, function (i) {
                if (ItemList[i].RateSno > 1) {
                    var item = ItemList[i].item + ',' + ItemList[i].color + ',' + ItemList[i].size;
                    //alert('This ' + item + ' have different PO rate.So system take min rate..');
                    var msg = 'This ' + item + ' have different PO rate.So system take min rate...';
                    var flg = 4;
                    var mod = 1;
                    var url = "";
                    AlartMessage(msg, flg, mod, url);
                }

            });
            loadGrnItemTable(ItemList);

            var ItmId = ItemList[0].itemid;
            var ClrId = ItemList[0].colorid;
            var SzId = ItemList[0].sizeid;
            var UomId = ItemList[0].uomId;
            var Qty = 0;
            LoadPOrderDetails(PurOrdId, ItmId, ClrId, SzId, UomId, Qty);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function loadGrnItemTable(ItemList) {

    $('#tblEntryGrnItemdetails').DataTable().destroy();
    debugger;

    var table = $('#tblEntryGrnItemdetails').DataTable({
        //"order": [[1, "asc"]],
        data: ItemList,
        scrollY: 250,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        "bSort": false,
        columns: [

             { title: "GrnDetId", data: "Grn_DetId", "visible": false },
            { title: "GrnMasId", data: "Grn_MasId", "visible": false },
            { title: "S.No", data: "SNo", "visible": false },
            { title: "Item", data: "item" },
            { title: "Color", data: "color" },
            { title: "Size", data: "size" },
            { title: "Pur Unit", data: "puom" },
            { title: "Sec Unit", data: "suom" },
            { title: "Balance", data: "balance" },
             { title: "AllowVal", data: "AllowValue" },
            {
                title: "Qty", data: "received_qty",
                render: function (data) {

                    return '<input type="text" id="txtRQty" class="calcAmt form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                },
            },
           { title: "Po Rate", data: "rate" },
            {
                title: "Excess Qty", data: "excess_qty",
                render: function (data) {

                    return '<input type="text" id="txtExQty" class="calcEQty form-control"  style="width: 50px;text-align: center;" disabled value=' + data + ' >';

                },
            },
             {
                 title: "Excess Rate", data: "Erate",
                 render: function (data) {

                     return '<input type="text" id="txtExRate" class="calcExcessAmt form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                 },
             },
             //{ title: "Tot Amt", data: "Amt" },

             {
                 title: "Tot Amt", data: "Amt",
                 render: function (data) {

                     return '<input type="text" id="txttotamt" class="calcExcessAmt form-control"  style="width: 50px;text-align: center;" disabled value=' + data + ' >';

                 },
             },

             { title: "ItemId", data: "itemid", "visible": false },
             { title: "ColorId", data: "colorid", "visible": false },
             { title: "SizeId", data: "sizeid", "visible": false },
             { title: "PUnitId", data: "uomId", "visible": false },
             { title: "SUnitId", data: "suomId", "visible": false },

        ]
    });


    var totalamnt = 0;
    for (var e = 0; e < ItemList.length; e++) {
        var amount = ItemList[e].received_qty;
        totalamnt = totalamnt + parseFloat(amount);

    }
    $('#txttotal').val(totalamnt);
    var totamnt = 0;
    for (var e = 0; e < ItemList.length; e++) {
        var amt = ItemList[e].Amt;
        totamnt = totamnt + parseFloat(amt);

    }


    $('#txtEtotalAmnt').val(totamnt.toFixed(3));

    var table = $('#tblShipAdd').DataTable();
    $("#tblEntryGrnItemdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblEntryGrnItemdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });

}


function CheckRefNo(RefNo) {
    debugger;
    var str = $("#txtGRNNo").val();
    var chkyear = str.substring(7, 11);
    $.ajax({
        url: "/GRNEntry/CheckRefno",
        data: JSON.stringify({ DCNo: RefNo, supplierid: SupplierId, CurrYear: chkyear }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            debugger;
            if (obj != undefined) {

                var RefNo = obj.Dc_no;

                if (RefNo != "") {
                    //alert("RefNo Already Exists...");
                    var msg = 'RefNo Already Exists...';
                    var flg = 4;
                    var mod = 1;
                    var url = "";
                    AlartMessage(msg, flg, mod, url);
                    $('#txtDcNo').val("");
                    $('#txtDcNo').focus();
                    return false;
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
var table, column, compId, Docum;

function GenerateNumber(table, column, compId, Docum) {

    debugger;

    if (PurItemType == "A") {

        table = "Pur_Grn_Mas",
        column = "receipt_no",
        compId = CompId,
        Docum = 'PURCHASE GOODS RECEIPT - ACCESSORY'
    }
    else if (PurItemType == "Y") {

        table = "Pur_Grn_Mas",
        column = "receipt_no",
        compId = CompId,
        Docum = 'PURCHASE GOODS RECEIPT - YARN'
    }
    else if (PurItemType == "") {

        table = "Pur_Grn_Mas",
        column = "receipt_no",
        compId = CompId,
        Docum = 'PURCHASE GOODS RECEIPT'
    }

    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $('#txtGRNNo').val(result.Value);
        }
    });
}

function LoadPOrderDetails(PurOrdId, ItmId, ClrId, SizeId, PUomId, OQty) {
    debugger;

    $.ajax({
        url: "/GRNEntry/LoadPOrderDetails",
        data: JSON.stringify({ GrnPurOrdNoId: PurOrdId, OItemid: ItmId, OColorid: ClrId, OSizeid: SizeId, OUomid: PUomId, quantity: OQty, pur_type: POrderType }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {


            POrderList = result;
            loadPOrderTable(POrderList);


        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function LoadPOrderSaveDetails(PurOrdId, ItmId, ClrId, SizeId, PUomId, OQty) {
    debugger;

    $.ajax({
        url: "/GRNEntry/LoadPOrderDetails",
        data: JSON.stringify({ GrnPurOrdNoId: PurOrdId, OItemid: ItmId, OColorid: ClrId, OSizeid: SizeId, OUomid: PUomId, quantity: OQty, pur_type: POrderType }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {


            POrderListSave = result;
            loadPOrderSaveTable(POrderListSave);




        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function loadPOrderTable(POrderList) {

    $('#tblEntryGrnOrderdetails').DataTable().destroy();
    //debugger;

    $('#tblEntryGrnOrderdetails').DataTable({
        data: POrderList,
        //scrollY: 200,
        //scrollCollapse: true,
        //paging: false,
        //fixedColumns: false,
        //select: false,
        //scrollX: "100%",
        //scrollXInner: "100%",
        //scroller: false,
        ////"bSort": false,
        columns: [

            { title: "Grn_DetOrdId", data: "Grn_DetOrdId", "visible": false },
            { title: "grn_detid", data: "grn_detid", "visible": false },
            { title: "PurOrdDetId", data: "pur_ord_detid", "visible": false },
            { title: "Purchase Order", data: "GrnPurOrdNo" },
            { title: "Manufacturer", data: "Manufacturer" },


                    {
                        title: "Date", data: "PoDate",
                        render: function (data) {
                            return (moment(data).format("DD/MM/YYYY"));
                        }
                    },

            { title: "Po Rate", data: "Rate" },
           { title: "Balance", data: "Balance" },
          {
              title: "Qty", data: "quantity",
              render: function (data) {

                  return '<input type="text" id="txtOQty" class="calcsepquan form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

              },
          },
           {
               title: "Rate", data: "Rate",
               render: function (data) {

                   if (ChkBudApp == "Y") {
                       return '<input type="text" id="txtORQty" class="form-control"  disabled style="width: 50px;text-align: center;"  value=' + data + ' >';
                   } else {
                       return '<input type="text" id="txtORQty" class="form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';
                   }
               },
           },
             { title: "Rate.Diff", data: "Rate_Diff" },
             {
                 title: "Excess Qty", data: "Excess_Qty",
                 render: function (data) {

                     return '<input type="text" id="txtOrdExcsQty" class="calcexssqty form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                 },
             },
             { title: "ManuFId", data: "actual_mfrid", "visible": false },
              { title: "itemid", data: "OItemid", "visible": false },
               { title: "colorid", data: "OColorid", "visible": false },
                { title: "sizeid", data: "OSizeid", "visible": false },
                 { title: "uomid", data: "OUomid", "visible": false }

        ]
    });
}
function loadPOrderSaveTable(POrderListSave) {

    $('#tblEntryGrnOrderSavedetails').DataTable().destroy();
    debugger;

    var table = $('#tblEntryGrnOrderSavedetails').DataTable({
        data: POrderListSave,
        columns: [

            { title: "Grn_DetOrdId", data: "Grn_DetOrdId" },
            { title: "grn_detid", data: "grn_detid" },
            { title: "PurOrdDetId", data: "pur_ord_detid" },
            { title: "PurchaseOrder", data: "GrnPurOrdNo" },
            { title: "Manufacturer", data: "Manufacturer" },


                    {
                        title: "Date", data: "PoDate",
                        render: function (data) {
                            return (moment(data).format("DD/MM/YYYY"));
                        }
                    },

            { title: "PoRate", data: "Rate" },
           { title: "Balance", data: "Balance" },
                { title: "OldQty", data: "OldQty" },
                 { title: "BOldQty", data: "BOldQty" },
          { title: "Qty", data: "quantity" },
           { title: "Rate", data: "Rate" },
             { title: "Rate.Diff", data: "Rate_Diff" },
             { title: "ExcessQty", data: "Excess_Qty" },
             { title: "ManuFId", data: "actual_mfrid" },
              { title: "itemid", data: "OItemid" },
               { title: "colorid", data: "OColorid" },
                { title: "sizeid", data: "OSizeid" },
                 { title: "uomid", data: "OUomid" }

        ]
    });
}

//$(document).on('click', '.btnItemview', function () {
//    debugger;

//    var table = $('#tblEntryGrnItemdetails').DataTable();

//    var ItmId = table.row($(this).parents('tr')).data()["itemid"];
//    var ClrId = table.row($(this).parents('tr')).data()["colorid"];
//    var SzId = table.row($(this).parents('tr')).data()["sizeid"];
//    var PUId = table.row($(this).parents('tr')).data()["uomId"];

//    var OQty = $(this).closest('tr').find('#txtRQty').val();



//    //if (Mode == 0) {

//    var colorempty = [];
//    colorempty = POrderListSave;

//    colorempty = $.grep(colorempty, function (v) {
//        return (v.OItemid === ItmId && v.OColorid === ClrId && v.OSizeid === SzId && v.OUomid === PUId);
//    });

//    loadPOrderTable(colorempty);

//    POrderList = colorempty;
//    // }

//    //if (Mode == 1 || Mode == 2) {
//    //    // var OQty = 0;
//    //    //LoadEditOrderDetails(POMId, ItmId, ClrId, SzId, PUId, OQty)
//    //    LoadEditGrnOrderDetails(GrnMasId, ItmId, ClrId, SzId, PUId, OQty, SupplierId, CompId)
//    //}


//});


$(document).ready(function () {

    $('#tblEntryGrnItemdetails').on('click', 'tr', function (e) {
        //debugger;

        var table = $('#tblEntryGrnItemdetails').DataTable();
        var row = $(this).closest('tr');
        var data = $('#tblEntryGrnItemdetails').dataTable().fnGetData(row);


        var ItmId = data.itemid; //table.row($(this).parents('tr')).data()["itemid"];
        var ClrId = data.colorid; //table.row($(this).parents('tr')).data()["colorid"];
        var SzId = data.sizeid; //table.row($(this).parents('tr')).data()["sizeid"];
        var PUId = data.uomId; //table.row($(this).parents('tr')).data()["uomId"];


        var colorempty = [];
        colorempty = POrderListSave;

        colorempty = $.grep(colorempty, function (v) {
            return (v.OItemid === ItmId && v.OColorid === ClrId && v.OSizeid === SzId && v.OUomid === PUId);
        });

        loadPOrderTable(colorempty);

        POrderList = colorempty;
    });


    $('#tblEntryGrnOrderdetails').on('click', 'tr', function (e) {
        //debugger;

        var table = $('#tblEntryGrnOrderdetails').DataTable();
        var row = $(this).closest('tr');
        var data = $('#tblEntryGrnOrderdetails').dataTable().fnGetData(row);

        var pur_ord_detid = data.pur_ord_detid; 
        LoadItemRemarksDetails(pur_ord_detid);
    });


});


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
    var opchk = [];
    for (var y = 0; y < ItemList.length; y++) {
        if (ItemList[y].received_qty > 0) {
            opchk.push(ItemList[y]);
        }
    }
    if (opchk.length == 0) {
        //alert('Please fill atleast any one qty...');
        var msg = 'Please fill atleast any one qty...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    for (var w = 0; w < ItemList.length; w++) {
        var te = ItemList[w].excess_qty;
        var itm = ItemList[w].itemid;
        var clr = ItemList[w].colorid;
        var sz = ItemList[w].sizeid;
        var um = ItemList[w].uomId;
        var totalamnt = 0;
        $.each(POrderListSave, function () {
            if (this.OItemid == itm && this.OColorid == clr && this.OSizeid == sz && this.OUomid == um) {

                var amount = this.Excess_Qty;
                totalamnt = totalamnt + parseFloat(amount);


            }
        });
        if (totalamnt != te) {
            //alert('Sep ExcessQty must be equal to Total ExcessQty...');
            var msg = 'Sep Excess quantity must be equal to Total Excess quantity...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return true;
        }
    }

    var PIType = PurItemType;

    if (POrderType == "B") {
        var OrdeType = "O";
    } else if (POrderType == "G") {
        var OrdeType = "G";
    } else if (POrderType == "R") {
        var OrdeType = "R";
    }
    else if (POrderType == "S") {
        var OrdeType = "SP";
    }

    var MSType = $('input[name="MSType"]:checked').attr('value');

    var storeunitid = 0;
    if (MSType == "S") {
        storeunitid = $('#ddlSMainStore').val();
    } else if (MSType == "M") {
        storeunitid = $('#ddlMSMMainStore').val();
    }

    if (storeunitid == 0 && validatestore == "True") {
        //alert('Please select Store..');
        var msg = 'Please select Store...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    var objPurSubmit = {

        companyid: CompId,
        receipt_no: $('#txtGRNNo').val(),
        receipt_date: $('#txtEntryDate').val(),//new Date($('#txtEntryDate').val()),
        Dc_date: $('#txtDcDate').val(),//new Date($('#txtDcDate').val()),
        SuppInvdate: $('#txtSupInvDate').val(),
        supplierid: SupplierId,//$('#txtSuppId').val(),
        Dc_no: $('#txtDcNo').val(),
        pur_type: OrdeType,
        Amend: "N",
        Pur_ItemType: PIType,
        DebtRaised: "N",
        //StoreUnitID: $('#txtSuppId').val(),
        //  StoreUnitID: $('#ddlMSMMainStore').val(),
        StoreUnitID: storeunitid,
        Supp_Inv_No: $('#txtSupInvNo').val(),///
        Inward_No: $('#txtInWard').val(),
        CreatedBy: Guserid,
        Remarks: $('#txtRemark').val(),
        PurchaseGrnItemDet: ItemList,
        PurchaseGrnODet: POrderListSave
        //PurchaseAccounts: AccList
    };
    debugger;
    $("#Add").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/GRNEntry/Add",
        data: JSON.stringify(objPurSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.Value == true) {

                //alert("Data Saved Sucessfully");
                AddUserEntryLog('Procurement', 'Purchase GRNEntry', 'ADD', $("#txtGRNNo").val());
                if (POrderType == "G") {
                    // window.location.href = "/GRNGeneralMain/GRNGeneralMainIndex";
                    //window.location.href = "/GRNMain/GRNMainIndex";
                    var msg = 'Data Saved Sucessfully...';
                    var flg = 1;
                    var mod = 0;
                    var url = "/GRNMain/GRNMainIndex";
                    AlartMessage(msg, flg, mod, url);
                } else {
                    //window.location.href = "/GRNMain/GRNMainIndex";
                    var msg = 'Data Saved Sucessfully...';
                    var flg = 1;
                    var mod = 0;
                    var url = "/GRNMain/GRNMainIndex";
                    AlartMessage(msg, flg, mod, url);
                    //if (PurItemType == "Y") {
                    //    window.location.href = "/GRNYarnMain/GRNYarnMainIndex";
                    //} else if (PurItemType == "A") {
                    //    window.location.href = "/GRNTrimsMain/GRNTrimsMainIndex";
                    //} else {
                    //    window.location.href = "/GRNMain/GRNMainIndex";
                    //}
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
    if (POrderType == "G") {
        //window.location.href = "/GRNGeneralMain/GRNGeneralMainIndex";
        window.location.href = "/GRNMain/GRNMainIndex";
    } else {
        window.location.href = "/GRNMain/GRNMainIndex";
        //if (PurItemType == "Y") {
        //    window.location.href = "/GRNYarnMain/GRNYarnMainIndex";
        //} else if (PurItemType == "A") {
        //    window.location.href = "/GRNTrimsMain/GRNTrimsMainIndex";
        //} else {
        //    window.location.href = "/GRNMain/GRNMainIndex";
        //}
    }
}

//Valdidation using jquery
function validate() {
    var isValid = true;

    if ($('#ddlMSMMainStore').val() == 0) {
        $('#ddlMSMMainStore').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlMSMMainStore').css('border-color', 'lightgrey');
    }
    if ($('#txtDcNo').val().trim() == "") {
        $('#txtDcNo').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtDcNo').css('border-color', 'lightgrey');
    }

    return isValid;
}
//////////////////////Edit Case//////////////////////////////////

function LoadPurGrnEditDetails(GrnMasId) {
    //LoadCompanyDDL("#ddlMSCompany,#ddlSCompany");



    // LoadStoreUnitDDL("#ddlMSMMainStore");
    $.ajax({
        url: "/GRNEntry/GetPurGrnEditDetails",
        data: JSON.stringify({ Grn_MasId: GrnMasId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            debugger;
            if (obj != undefined) {
                $('#txtGRNNo').val(obj[0]["receipt_no"]);
                $('#txtEntryDate').val(moment(obj[0].receipt_date).format('DD/MM/YYYY'));
                $('#txtDcNo').val(obj[0]["Dc_no"]);
                //$('#txtDcDate').val(obj[0]["Dc_date"]);
                $('#txtDcDate').val(moment(obj[0].Dc_date).format('DD/MM/YYYY'));
                $('#txtSupInvDate').val(moment(obj[0].SuppInvdate).format('DD/MM/YYYY'));
                $('#txtInWard').val(obj[0]["Inward_No"]);
                $('#txtSupInvNo').val(obj[0]["Supp_Inv_No"]);
                $('#txtRemark').val(obj[0]["Remarks"]);
                // $('#ddlMSMMainStore').val(obj[0]["StoreUnitID"]);
                $('#ddlMSCompany').val(obj[0]["companyid"]).trigger('change');
                //  $('#txtTaxPer').val(obj[0]["StoreUnitID"]);     

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

                var QltNo = obj[0]["Qlty_No"];



                if (Mode == 1 || Mode == 2) {

                    LoadGrnItemDetailsEdit(GrnMasId, SupplierId, CompId);
                }
                if (QltNo != "" && Mode == 1) {

                    //alert("Quality has been made update are not made,Please Check it....")
                    var msg = 'Quality has been made update are not made,Please Check it...';
                    var flg = 4;
                    var mod = 1;
                    var url = "";
                    AlartMessage(msg, flg, mod, url);
                    $("#Update").attr('disabled', true);
                    $('#Add').hide();
                    return true;
                }

                if (QltNo != "" && Mode == 2) {

                    //alert("Quality has been made delete are not made,Please Check it....")
                    var msg = 'Quality has been made delete are not made,Please Check it...';
                    var flg = 4;
                    var mod = 1;
                    var url = "";
                    AlartMessage(msg, flg, mod, url);
                    $("#Delete").attr('disabled', true);
                    $('#Update').hide();
                    $('#Add').hide();
                    return true;
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


function LoadGrnItemDetailsEdit(GrnMasId, SupplierId, CompId) {
    debugger;

    $.ajax({
        url: "/GRNEntry/LoadItemGrnEditDetails",
        data: JSON.stringify({ Grn_MasId: GrnMasId, supplierid: SupplierId, companyid: CompId, pur_type: POrderType }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            ItemList = result;
            loadGrnItemTable(ItemList);

            var ItmId = ItemList[0].itemid;
            var ClrId = ItemList[0].colorid;
            var SzId = ItemList[0].sizeid;
            var PUId = ItemList[0].uomId;
            var OQty = ItemList[0].received_qty;
            LoadEditGrnOrderDetails(GrnMasId, ItmId, ClrId, SzId, PUId, OQty, SupplierId, CompId);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function LoadEditGrnOrderDetails(GrnMasId, ItmId, ClrId, SzId, PUId, OQty, SupplierId, CompId) {
    debugger;

    $.ajax({
        url: "/GRNEntry/LoadOrderGrnEditContDetails",
        //   data: JSON.stringify({ GOrnMasID: GrnMasId, OItemid: ItmId, OColorid: ClrId, OSizeid: SzId, OUomid: PUId, quantity: OQty, GOSupId: SupplierId, GOCompId: CompId }),
        data: JSON.stringify({ GOrnMasID: GrnMasId, OItemid: ItmId, OColorid: ClrId, OSizeid: SzId, OUomid: PUId, quantity: OQty, GOSupId: SupplierId, GOCompId: CompId, pur_type: POrderType }),

        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            POrderList = result;
            loadPOrderTable(POrderList);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function LoadGrnOrderEditSaveDetails(PGrnMId) {
    debugger;

    var ItmId = 0;
    var ClrId = 0;
    var SizeId = 0;
    var PUomId = 0;
    var OQty = 0;

    $.ajax({
        url: "/GRNEntry/LoadOrderGrnEditContDetails",
        data: JSON.stringify({ GOrnMasID: PGrnMId, OItemid: ItmId, OColorid: ClrId, OSizeid: SizeId, OUomid: PUomId, quantity: OQty, GOSupId: SupplierId, GOCompId: CompId, pur_type: POrderType }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            POrderListSave = result;
            loadPOrderSaveTable(POrderListSave);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
//Valdidation using jquery
function validate() {
    var isValid = true;

    if ($('#ddlMSCompany').val() == 0) {
        //$('#ddlMSCompany').css('border-color', 'Red');
        $('#ddlMSCompany').siblings(".select2-container").css('border', '1px solid red');

        isValid = false;
    }
    else {
        $('#ddlMSCompany').siblings(".select2-container").css('border', '1px solid lightgrey');
    }

    //if ($('#ddlMSMMainStore').val() == 0) {
    //    //$('#ddlMSMMainStore').css('border-color', 'Red');
    //    $('#ddlMSMMainStore').siblings(".select2-container").css('border', '1px solid red');

    //    isValid = false;
    //}
    //else {
    //    $('#ddlMSMMainStore').siblings(".select2-container").css('border', '1px solid lightgrey');
    //}
    if ($('#txtDcNo').val() == 0) {
        $('#txtDcNo').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtDcNo').css('border-color', 'lightgrey');
    }

    return isValid;
}

function Update() {

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

    var opchk = [];
    for (var y = 0; y < ItemList.length; y++) {
        if (ItemList[y].received_qty > 0) {
            opchk.push(ItemList[y]);
        }
    }
    if (opchk.length == 0) {
        //alert('Please fill atleast any one qty...');
        var msg = 'Please fill atleast any one qty...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    for (var w = 0; w < ItemList.length; w++) {
        var te = ItemList[w].excess_qty;
        var itm = ItemList[w].itemid;
        var clr = ItemList[w].colorid;
        var sz = ItemList[w].sizeid;
        var um = ItemList[w].uomId;
        var totalamnt = 0;
        $.each(POrderListSave, function () {
            if (this.OItemid == itm && this.OColorid == clr && this.OSizeid == sz && this.OUomid == um) {

                var amount = this.Excess_Qty;
                totalamnt = totalamnt + parseFloat(amount);


            }
        });
        if (totalamnt != te) {
            //alert('Sep ExcessQty must be equal to Total ExcessQty...');
            var msg = 'Sep Excess quantity must be equal to Total Excess quantity...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return true;
        }
    }

    var PIType = PurItemType;

    if (POrderType == "B") {
        var OrdeType = "O";
    } else if (POrderType == "G") {
        var OrdeType = "G";
    } else if (POrderType == "R") {
        var OrdeType = "R";
    } else if (POrderType == "S") {
        var OrdeType = "SP";
    }

    var MSType = $('input[name="MSType"]:checked').attr('value');

    var storeunitid = 0;
    if (MSType == "S") {
        storeunitid = $('#ddlSMainStore').val();
    } else if (MSType == "M") {
        storeunitid = $('#ddlMSMMainStore').val();
    }
    if (storeunitid == 0 && validatestore == "True") {
        //alert('Please select Store..');
        var msg = 'Please select Store...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }


    var objPurSubmit = {

        Grn_MasId: GrnMasId,
        companyid: CompId,
        receipt_no: $('#txtGRNNo').val(),
        receipt_date: $('#txtEntryDate').val(),//new Date($('#txtEntryDate').val()),
        Dc_date: $('#txtDcDate').val(),//new Date($('#txtDcDate').val()),
        SuppInvdate: $('#txtSupInvDate').val(),
        supplierid: $('#txtSuppId').val(),
        Dc_no: $('#txtDcNo').val(),
        pur_type: OrdeType,
        Amend: "N",
        Pur_ItemType: PIType,
        DebtRaised: "N",
        //StoreUnitID: $('#ddlMSMMainStore').val(),
        StoreUnitID: storeunitid,
        Supp_Inv_No: $('#txtSupInvNo').val(),///
        Inward_No: $('#txtInWard').val(),
        CreatedBy: Guserid,
        Remarks: $('#txtRemark').val(),
        PurchaseGrnItemDet: ItemList,
        PurchaseGrnODet: POrderListSave
        //PurchaseAccounts: AccList
    };
    debugger;
    $("#Update").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/GRNEntry/Update",
        data: JSON.stringify(objPurSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == true) {

                //alert("Data Updated Sucessfully");
                AddUserEntryLog('Procurement', 'Purchase GRNEntry', 'UPDATE', $("#txtGRNNo").val());
                if (POrderType == "G") {
                    // window.location.href = "/GRNGeneralMain/GRNGeneralMainIndex";
                    //window.location.href = "/GRNMain/GRNMainIndex";
                    var msg = 'Data Updated Sucessfully...';
                    var flg = 1;
                    var mod = 0;
                    var url = "/GRNMain/GRNMainIndex";
                    AlartMessage(msg, flg, mod, url);
                } else {
                    //window.location.href = "/GRNMain/GRNMainIndex";
                    var msg = 'Data Updated Sucessfully...';
                    var flg = 1;
                    var mod = 0;
                    var url = "/GRNMain/GRNMainIndex";
                    AlartMessage(msg, flg, mod, url);
                    //if (PurItemType == "Y") {
                    //    window.location.href = "/GRNYarnMain/GRNYarnMainIndex";
                    //} else if (PurItemType == "A") {
                    //    window.location.href = "/GRNTrimsMain/GRNTrimsMainIndex";
                    //} else {
                    //    window.location.href = "/GRNMain/GRNMainIndex";
                    //}
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
/////////////////////////////////////////////////////////////////
///////////////////////////Delete/////////////////////////////////
function Delete() {
    debugger;


    var objConPurDelete = {

        Grn_MasId: GrnMasId,
        PurchaseGrnItemDet: ItemList,
        PurchaseGrnODet: POrderListSave
    };
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        LoadingSymb();
        $("#Delete").attr("disabled", true);
        $.ajax({
            url: "/GRNEntry/Delete",
            data: JSON.stringify(objConPurDelete),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.Value == true) {

                    //alert("Data Deleted Sucessfully");
                    AddUserEntryLog('Procurement', 'Purchase GRNEntry', 'DELETE', $("#txtGRNNo").val());
                    if (POrderType == "G") {
                        //window.location.href = "/GRNGeneralMain/GRNGeneralMainIndex";
                        //window.location.href = "/GRNMain/GRNMainIndex";
                        var msg = 'Data Deleted Sucessfully...';
                        var flg = 2;
                        var mod = 0;
                        var url = "/GRNMain/GRNMainIndex";
                        AlartMessage(msg, flg, mod, url);
                    } else {
                        //window.location.href = "/GRNMain/GRNMainIndex";
                        var msg = 'Data Deleted Sucessfully...';
                        var flg = 2;
                        var mod = 0;
                        var url = "/GRNMain/GRNMainIndex";
                        AlartMessage(msg, flg, mod, url);
                        //if (PurItemType == "Y") {
                        //    window.location.href = "/GRNYarnMain/GRNYarnMainIndex";
                        //} else if (PurItemType == "A") {
                        //    window.location.href = "/GRNTrimsMain/GRNTrimsMainIndex";
                        //} else {
                        //    window.location.href = "/GRNMain/GRNMainIndex";
                        //}
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

}

function LoadItemRemarksDetails(Pid) {

    debugger;
    var typ = 'D';

    if (POrderType == 'G') {
        typ = 'G';
    }

    $.ajax({
        url: "/GRNEntry/GetPurchaseItemRemarks",
        data: JSON.stringify({ Detid: Pid, Type: typ }),
        type: "POST",
        async: false,
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;

            var ord = "";
          
            for (var t = 0; t < obj.length; t++) {
                var od = obj[t].itemremarks;
            
                if (ord == '') {
                    ord = od;
                }
                else {
                    ord = ord + "," + od;
                }

            }
            $('#txtItemRemark').val(ord);
         
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}



///
//////////////////////////////////////////////////////////////////