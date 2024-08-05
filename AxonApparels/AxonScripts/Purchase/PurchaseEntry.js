
var StyleRowId = 0;
var OrderType = 0;
var PurType = 0;
var Mode = 0;
var CmpId = 0;
var ItemList = [];
var termsList = [];
var OrderList = [];
var Itemrowindex = -1;
var rowindex = -1;
var index = 0;
var AccList = [];
var AcSno = 0;
var OrderListSave = [];
var POMId = 0;
var TAmt = 0;
var GrossAmt = 0;
var ANAmt = 0;
var ind = 0;
var Userid = 0;
var UserName = 0;
var ChkBudApp = 0;
var MainFDate = 0;
var Nom = 0;
var Ig = 0;
var LorI = 0;
var ELorI = 0;
var Guserid = 0;
var termseq = 0;
var PurApp = '';
var PurAgnInd = 0;
var EnbTranDate = 0;
var Suppid = 0;
var Supp = '';
var Reqdate = '';
var DPurApp = 0;
var ToAppEmpid = 0;
var LoginUserid = '';
var editmasunitstore = 0;
var CompanyId = 0;
var CurrDecimal = 0;
var Currid = 0;
var geneditFlg = 0;
var CostAppSamPurCheck = 'Y';
var ItemStockList = [];
var Stkitemid = 0;
var Stkcolorid = 0;
var StkSizeid = 0;
var Orderwiseitemqty = 0;
var StktoOrdno = '';
var StkToStyleid = 0;
var StkToStyle = 0;
var ModalOrder = [];
var modalflg = 0;
var cancelflg = 0;
var CItem = 0;
var CColor = 0
var CSize = 0;
var COrder = 0;
var CStyle = 0;
var ViewStock = 0;
var okFlag = 1;
var StkUomid = 0;
var chkSGST = 0;
var chkCGST = 0;
var chkIGST = 0;

$(document).ready(function () {
    debugger;

    Guserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    ChkBudApp = $("#hdnCostBudPurAppid").data('value');
    MainFDate = $("#hdMainFromDate").data('value');
    PurAgnInd = $("#hdnPurAgnIndid").data('value');
    EnbTranDate = $("#hdnETransDate").data('value');
    DPurApp = $("#hdnPurAppid").data('value');
    LoginUserid = $("#hdnLoginUserid").data('value');
    CostAppSamPurCheck = $("#hdnCostAppSamPurCheck").data('value');
    var qrStr = window.location.search;
    var spQrStr = qrStr.substring(1);
    var arrQrStr = new Array();
    var arr = spQrStr.split('?');

    for (var i = 0; i < arr.length; i++) {
        var queryvalue = arr[i].split('=');
    }

    StyleRowId = queryvalue[1];
    OrderType = queryvalue[3];
    PurType = queryvalue[5];
    CmpId = queryvalue[7];
    POMId = queryvalue[9];
    Mode = queryvalue[11];
    Ig = queryvalue[13];
    Nom = queryvalue[15];
    LorI = queryvalue[17];
    PurApp = queryvalue[13];
    Suppid = queryvalue[19];
    CompanyId = CmpId;
    Currid = queryvalue[23];

    LoadUserCompanyDDL();

    GetGSTstate(Suppid, CompanyId);

    if (EnbTranDate == "Y") {
        $("#txtEntryDate").prop("disabled", true);

    } else {
        $("#txtEntryDate").prop("disabled", false);
    }

    if (OrderType == 'G') {
        LorI = queryvalue[13];
    }

    LoadSizeDDL("#ddlSize");
    LoadItemDDL("#ddlItem");
    LoadColorDDL("#ddlColor");
    LoadUomDDL("#ddlPUnit");
    LoadCurrencyDDL("#ddlBCurrency");
    LoadTermsConditionDDL("#ddlTerms");

   // LoadCompanyDDL("#ddlBCompany");
    LoadPayTermsDDL("#ddlBPayTerms");
    LoadEmployeeDDL("#ddlBApprove");
    LoadSupplierDDL("#ddlGSupplier");
    LoadAddlessDDL("#ddlAcc");

    var MOType = OrderType;
    texttospeak("");

    //if (MOType == "G") {
    //    $('#suppgenid').show();
    //    $('#suppordid').hide();
    //} else {
    //    $('#suppordid').show();
    //    $('#suppgenid').hide();
    //}
    $('#suppgenid').hide();
    //$('#itemgeneral').hide();
    //if (Mode == 0) {

    //    //if (Nom == "Nom") {
    //    //    LoadNomsupplier(StyleRowId, Ig);
    //    //} else {
    //    //    LoadSupplierDDL("#ddlSupplier");
    //    //}
    //    LoadSupplierDDL("#ddlSupplier");
    //    LoadAddlessDDL("#ddlAcc");
    //    LoadPayTermsDDL("#ddlBPayTerms");
    //    LoadEmployeeDDL("#ddlBApprove");
    //    //LoadCurrencyDDL("#ddlBCurrency");

    //}
    if (Mode == 0) {
        GenerateNumber();

     

        var su = queryvalue[21];
        Supp = window.unescape(su);
        $("#ddlSupplier").val(Supp);
    }

    if (Mode == 0) {

        if (Nom > 0) {
            LoadNomsupplier(StyleRowId, Ig);
        }
        LoadItemDetails(StyleRowId);
        if (OrderType != 'G') {
            LoadOrderSaveDetails(StyleRowId);
        }
    }
    getDate();
    var radioValue = $("input[name='DType']:checked").val();
    if (radioValue == "F") {

        LoadCompanyUnitDDL("#ddlLoc,#ddlBPUnit");
    }

    //if (Mode == 0) {
    //    var BillType = $("input[name='Pay']:checked").val();
    //    if (BillType == "C") {
    //        LoadCompanyDDL("#ddlBCompany");
    //    }
    //}


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

    if (Mode == 1) {
        LoadPurEditDetails(POMId);
        //LoadTermandCond(POMId);
        //if (OrderType != "G") {
        //    LoadOrderEditSaveDetails(POMId);
        //}

    }
    if (Mode == 2) {
        LoadPurEditDetails(POMId);
        //if (OrderType != "G") {
        //    LoadOrderEditSaveDetails(POMId);
        //}

    }


    if (OrderType != "G") {
        $("#itemgeneral").hide();
        $("#OrderDetails").show();
    }
    if (OrderType == "G") {
        $("#OrderDetails").hide();
        $("#itemgeneral").show();
    }
    //if (OrderType == "G" || OrderType == "I") {
    //    $("#itemgeneral").hide();
    //}

    //$('#btnItemview').click(function () {


    $(document).on('click', '.OrdLbl', function () {
        debugger
        var index = $(this).val();

     
        var OBQty = ModalOrder[index].Value3;

        StktoOrdno = ModalOrder[index].Value1;
        StkToStyleid = ModalOrder[index].Value2;

        Orderwiseitemqty = OBQty;

        var isstk = 0;
          $.each(ItemStockList, function (v) {
              if (ItemStockList[v].OrderNo != StktoOrdno && ItemStockList[v].Styleid != StkToStyleid) {
                isstk = 1;
            }
        });

        if (isstk == 1) {
            MsgModalclose();
            $('#myModal').modal('show');
            ItemStockList = [];
            LoadStockTransDetails(Stkitemid, Stkcolorid, StkSizeid);

        } else {
            var txt = 'Stock cannot move this Order'
            $('#AlertlabelFL').val(txt).text(txt);
        }

        //alert(index);

    });



    $(document).on('keyup', '.calcsepquan', function () {
         debugger;
         if (Mode == 0 ) {
             var table = $('#tblEntryOrderdetails').DataTable();
             var OBQty = table.row($(this).parents('tr')).data()["OBQty"];

             StktoOrdno = table.row($(this).parents('tr')).data()["OrderNo"];
             StkToStyleid = table.row($(this).parents('tr')).data()["Styleid"];
             StkToStyle = table.row($(this).parents('tr')).data()["OStyle"];
             StkUomid = table.row($(this).parents('tr')).data()["PurUomId"];

             Orderwiseitemqty = OBQty;
             modalflg = 'O';

       
             if (StktoOrdno != COrder && StkToStyleid != CStyle) {

                 ItemStockList = [];
                 LoadChkStockTransDetails(Stkitemid, Stkcolorid, StkSizeid, StkUomid);

                 //LoadStockTransDetails(Stkitemid, Stkcolorid, StkSizeid);
             }
         }
     });


    $(document).on('keyup', '.calcAmt', function () {
        debugger;
      
            if (Mode == 0) {
                var table = $('#tblEntryItemdetails').DataTable();
                var OBQty = table.row($(this).parents('tr')).data()["quantity"];
                Stkitemid = table.row($(this).parents('tr')).data()["ItemID"];
                Stkcolorid = table.row($(this).parents('tr')).data()["ColorID"];
                StkSizeid = table.row($(this).parents('tr')).data()["SizeID"];
                StkUomid = table.row($(this).parents('tr')).data()["PurUomId"];
                if (OrderType == 'G') {
                    modalflg = 'G';
                } else { modalflg = 'I'; }
                StktoOrdno = "";
                StkToStyleid = 0;

                Orderwiseitemqty = OBQty;

                //$('#myModal').modal('show');
                if (Stkitemid != CItem && Stkcolorid != CColor && StkSizeid != CSize && modalflg != 'I') {
                    ItemStockList = [];
                    LoadChkStockTransDetails(Stkitemid, Stkcolorid, StkSizeid, StkUomid);
                }

                if (Stkitemid != CItem && Stkcolorid != CColor && StkSizeid != CSize && modalflg == 'I') {
                    ItemStockList = [];
                    LoadChkStockTransDetails(Stkitemid, Stkcolorid, StkSizeid, StkUomid)
                }
            }
       
     });

    //$(document).on('change', '.calcAmt', function () {
    //    debugger;
    //    if (Mode == 0) {
    //        MsgCancel = 0;
    //        CItem = 0;
    //        CColor = 0;
    //        CSize = 0;
    //        COrder = '';
    //        CStyle = 0;

    //    }
    //});
    //$(document).on('change', '.calcsepquan', function () {
    //    debugger;
    //    if (Mode == 0) {
    //        MsgCancel = 0;
    //        CItem = 0;
    //        CColor = 0;
    //        CSize = 0;
    //        COrder = '';
    //        CStyle = 0;
    //    }
    //});


    $(document).on('keyup', '.txtSQty', function () {
        debugger;
        var table = $('#tblEntryItemdetails').DataTable();
        var CSno = table.row($(this).parents('tr')).data()["SNo"];
        var Val = $(this).val();

        $.each(ItemList, function () {
            if (this.SNo == CSno) {
                this.Sec_Qty = Val;
            }
        });
        //loadItemTable(ItemList);

        var table = $('#tblEntryItemdetails').DataTable();
        var data = table.rows().data();

        $('input[id=txtSQty]').each(function (ig) {
            if (data[ig].SNo == CSno) {
                var row = $(this).closest('tr');
                row.find('#txtSQty').val(Val);

            }
        });

    });


    $(document).on('change', '.txttransQty', function () {
        debugger;
        var table = $('#tblStockTranItem').DataTable();
        var StockId = table.row($(this).parents('tr')).data()["StockId"];
        var Bal = table.row($(this).parents('tr')).data()["BalStkQtyval"];
        var ToOrderno = table.row($(this).parents('tr')).data()["ToOrderno"];
        var ToStyleid = table.row($(this).parents('tr')).data()["ToStyleid"];
        var ItemId = table.row($(this).parents('tr')).data()["ItemId"];
        var ColorId = table.row($(this).parents('tr')).data()["ColorId"];
        var SizeId = table.row($(this).parents('tr')).data()["SizeId"];
        var Ordbalqty = table.row($(this).parents('tr')).data()["Ordbalqtyval"];

        var Val = $(this).val();


        var totord = 0
        var totstk = 0;

        $.each(ItemStockList, function (G) {

            if (this.ToOrderno == ToOrderno && this.ToStyleid == ToStyleid && this.ItemId == ItemId && this.ColorId == ColorId && this.SizeId == SizeId && this.StockId != StockId) {

                totord = totord + parseFloat(this.TransQty);
            }

            if (this.ToOrderno != ToOrderno && this.ToStyleid != ToStyleid && this.ItemId == ItemId && this.ColorId == ColorId && this.SizeId == SizeId && this.StockId == StockId) {
                totstk = totstk + parseFloat(this.TransQty);
            }


        });


        var stkorder = totord + parseFloat(Val);

        if (OrderType != "G") {
        if (stkorder > Ordbalqty) {
            Val = 0;
        }
        }

        var stktotord = totstk + parseFloat(Val);

       
            if (stktotord > Bal) {
                Val = 0;
            }
       


        var balord = Ordbalqty - (totord + parseFloat(Val));
        var balstk = Bal - (totstk + parseFloat(Val));

        $.each(ItemStockList, function (G) {

            if (this.ToOrderno == ToOrderno && this.ToStyleid == ToStyleid && this.ItemId == ItemId && this.ColorId == ColorId && this.SizeId == SizeId && this.StockId == StockId) {

                this.TransQty = parseFloat(Val);
            }

            if (OrderType != "G") {
                if (this.ToOrderno == ToOrderno && this.ToStyleid == ToStyleid && this.ItemId == ItemId && this.ColorId == ColorId && this.SizeId == SizeId) {

                    this.Ordbalqty = balord;
                }
            }
            if (this.StockId == StockId) {
                this.StkQty = balstk;
            }


        });

        //loadItemTable(ItemList);

        var table = $('#tblStockTranItem').DataTable();
        var data = table.rows().data();

        $('input[id=txttransQty]').each(function (ig) {
            if (data[ig].StockId == StockId && data[ig].ToOrderno == ToOrderno && data[ig].ToStyleid == ToStyleid
                 && data[ig].ItemId == ItemId && data[ig].ColorId == ColorId && data[ig].SizeId == SizeId) {
                var row = $(this).closest('tr');
                row.find('#txttransQty').val(Val);

            }
        });

        $('input[id=txtStockBal]').each(function (ig) {
            if (data[ig].StockId == StockId ) {
                var row = $(this).closest('tr');
                row.find('#txtStockBal').val(balstk);

            }
        });
        if (OrderType != "G") {

            $('input[id=txtOrderBal]').each(function (ig) {
                if (data[ig].ToOrderno == ToOrderno && data[ig].ToStyleid == ToStyleid
                     && data[ig].ItemId == ItemId && data[ig].ColorId == ColorId && data[ig].SizeId == SizeId) {
                    var row = $(this).closest('tr');
                    row.find('#txtOrderBal').val(balord);

                }
            });
        }



    });


    //$(document).on('keyup', '.txttransQty', function () {
    //    debugger;
    //    var table = $('#tblStockTranItem').DataTable();
    //    var StockId = table.row($(this).parents('tr')).data()["StockId"];
    //    var Bal = table.row($(this).parents('tr')).data()["StkQty"];
    //    var Val = $(this).val();

    //    if (Bal < Val) {
    //        Val = 0;
    //    }

    //    var tottransqty = 0;

    //    $.each(ItemStockList, function (i) {
    //        if (ItemStockList[i].TransQty > 0) {
    //            if (ItemStockList[i].StockId != StockId) {
    //                tottransqty = tottransqty + parseFloat(ItemStockList[i].TransQty);
    //            }
    //        }

    //    });

     

    //    var tot = tottransqty + parseFloat(Val);
    //    if (OrderType != 'G') {
    //        if (tot > Orderwiseitemqty) {
    //            var msg = 'Transfer Quntity should not exceed Order Balance quantity..';
    //            var flg = 4;
    //            AlartMessage(msg, flg);

    //            //alert('TransQty should not exceed OrderBal Qty..');
    //            Val = 0;
    //        }
    //    }




    //    $.each(ItemStockList, function () {
    //        if (this.StockId == StockId) {
    //            this.TransQty = Val;
    //            this.Etype = OrderType;
    //            this.Createdby = Guserid;
    //            this.ToOrderno = StktoOrdno;
    //            this.ToStyleid = StkToStyleid;
    //            this.Transdate = $('#txtEntryDate').val();

    //        }
    //    });
    //    //loadItemTable(ItemList);

    //    var table = $('#tblStockTranItem').DataTable();
    //    var data = table.rows().data();

    //    $('input[id=txttransQty]').each(function (ig) {
    //        if (data[ig].StockId == StockId) {
    //            var row = $(this).closest('tr');
    //            row.find('#txttransQty').val(Val);

    //        }
    //    });
    //});


    $(document).on('keyup', '.txtReqdate', function () {
        debugger;
        var table = $('#tblEntryItemdetails').DataTable();
        var CSno = table.row($(this).parents('tr')).data()["SNo"];
        var Val = $(this).val();

        $.each(ItemList, function () {
            if (this.SNo == CSno) {
                this.Reqdate = Val;
            }
        });
        //loadItemTable(ItemList);

        var table = $('#tblEntryItemdetails').DataTable();
        var data = table.rows().data();

        $('input[id=txtReqdate]').each(function (ig) {
            if (data[ig].SNo == CSno) {
                var row = $(this).closest('tr');
                row.find('#txtReqdate').val(Val);

            }
        });
    });
    $(document).on('keyup', '.txtRate', function () {
        debugger;
        var table = $('#tblEntryItemdetails').DataTable();
        var CSno = table.row($(this).parents('tr')).data()["SNo"];
        var rate = table.row($(this).parents('tr')).data()["AppRate"];
        var rt = table.row($(this).parents('tr')).data()["Rate"];
        var qt = table.row($(this).parents('tr')).data()["quantity"];
        var CGST = table.row($(this).parents('tr')).data()["CGST"];
        var SGST = table.row($(this).parents('tr')).data()["SGST"];
        var IGST = table.row($(this).parents('tr')).data()["IGST"];
        var Val = $(this).val();


        var CGSTA = (parseFloat(qt) * parseFloat(Val) * parseFloat(CGST) / 100).toFixed(CurrDecimal);
        var SGSTA = (parseFloat(qt) * parseFloat(Val) * parseFloat(SGST) / 100).toFixed(CurrDecimal);
        var IGSTA = (parseFloat(qt) * parseFloat(Val) * parseFloat(IGST) / 100).toFixed(CurrDecimal);

        if (ChkBudApp == 'Y' && (OrderType == "B" || OrderType == "R")) {
            if (Val <= rate) {
                $.each(ItemList, function () {
                    if (this.SNo == CSno) {
                        this.Rate = Val;
                        this.Amt = Val * this.quantity;
                        this.CGSTAMt = CGSTA;
                        this.SGSTAMT = SGSTA;
                        this.IGSTAMT = IGSTA;
                    }
                });
                var tableig = $('#tblEntryItemdetails').DataTable();
                var dataig = tableig.rows().data();

                $('input[id=txtAmnt]').each(function (ij) {
                    if (dataig[ij].SNo == CSno) {
                        var row = $(this).closest('tr');
                        row.find('#txtRate').val(dataig[ij].Rate);
                        var t = dataig[ij].Rate * dataig[ij].quantity;
                        t = t.toFixed(CurrDecimal);
                        row.find('#txtAmnt').val(t);
                        row.find('#txtcgstAmnt').val(CGSTA);
                        row.find('#txtsgstAmnt').val(SGSTA);
                        row.find('#txtigstAmnt').val(IGSTA);
                    }
                });
            }
            else {
                var msg = 'Should not exceed BudgetRate...';
                var flg = 4;
                AlartMessage(msg, flg);
                //alert('Should not exceed BudgetRate...');
                $.each(ItemList, function () {
                    if (this.SNo == CSno) {
                        this.Rate = this.AppRate;
                        var t = this.AppRate * this.quantity;
                        t = t.toFixed(CurrDecimal);
                        this.Amt = t;
                        this.CGSTAMt = CGSTA;
                        this.SGSTAMT = SGSTA;
                        this.IGSTAMT = IGSTA;
                    }
                });
                var tableig = $('#tblEntryItemdetails').DataTable();
                var dataig = tableig.rows().data();

                $('input[id=txtAmnt]').each(function (ij) {
                    if (dataig[ij].SNo == CSno) {
                        var row = $(this).closest('tr');
                        row.find('#txtRate').val(dataig[ij].AppRate);
                        var t = dataig[ij].AppRate * dataig[ij].quantity;
                        t = t.toFixed(CurrDecimal);
                        row.find('#txtAmnt').val(t);
                        row.find('#txtcgstAmnt').val(CGSTA);
                        row.find('#txtsgstAmnt').val(SGSTA);
                        row.find('#txtigstAmnt').val(IGSTA);

                    }
                });
                return true;
            }
        }
        else if (CostAppSamPurCheck == 'Y' && (OrderType == "S")) {
            if (Val <= rate) {
                $.each(ItemList, function () {
                    if (this.SNo == CSno) {
                        this.Rate = Val;
                        this.Amt = Val * this.quantity;
                        this.CGSTAMt = CGSTA;
                        this.SGSTAMT = SGSTA;
                        this.IGSTAMT = IGSTA;
                    }
                });
                var tableig = $('#tblEntryItemdetails').DataTable();
                var dataig = tableig.rows().data();

                $('input[id=txtAmnt]').each(function (ij) {
                    if (dataig[ij].SNo == CSno) {
                        var row = $(this).closest('tr');
                        row.find('#txtRate').val(dataig[ij].Rate);
                        var t = dataig[ij].Rate * dataig[ij].quantity;
                        t = t.toFixed(CurrDecimal);
                        row.find('#txtAmnt').val(t);
                        row.find('#txtcgstAmnt').val(CGSTA);
                        row.find('#txtsgstAmnt').val(SGSTA);
                        row.find('#txtigstAmnt').val(IGSTA);
                    }
                });
            }
            else {
                var msg = 'Should not exceed BudgetRate...';
                var flg = 4;
                AlartMessage(msg, flg);
                //alert('Should not exceed BudgetRate...');
                $.each(ItemList, function () {
                    if (this.SNo == CSno) {
                        this.Rate = this.AppRate;
                        var t = this.AppRate * this.quantity;
                        t = t.toFixed(CurrDecimal);
                        this.Amt = t;
                        this.CGSTAMt = CGSTA;
                        this.SGSTAMT = SGSTA;
                        this.IGSTAMT = IGSTA;
                    }
                });
                var tableig = $('#tblEntryItemdetails').DataTable();
                var dataig = tableig.rows().data();

                $('input[id=txtAmnt]').each(function (ij) {
                    if (dataig[ij].SNo == CSno) {
                        var row = $(this).closest('tr');
                        row.find('#txtRate').val(dataig[ij].AppRate);
                        var t = dataig[ij].AppRate * dataig[ij].quantity;
                        t = t.toFixed(CurrDecimal);
                        row.find('#txtAmnt').val(t);
                        row.find('#txtcgstAmnt').val(CGSTA);
                        row.find('#txtsgstAmnt').val(SGSTA);
                        row.find('#txtigstAmnt').val(IGSTA);

                    }
                });
                return true;
            }

        }

        else {
            $.each(ItemList, function () {
                if (this.SNo == CSno) {
                    this.Rate = Val;
                    var amnt = Val * this.quantity;
                    this.Amt = parseFloat(amnt).toFixed(CurrDecimal);
                    this.CGSTAMt = CGSTA;
                    this.SGSTAMT = SGSTA;
                    this.IGSTAMT = IGSTA;
                }
            });
            //loadItemTable(ItemList);

            var table = $('#tblEntryItemdetails').DataTable();
            var data = table.rows().data();

            $('input[id=txtAmnt]').each(function (ig) {
                if (data[ig].SNo == CSno) {
                    var row = $(this).closest('tr');
                    row.find('#txtRate').val(Val);
                    var q = row.find('#txtQty').val();
                    var res = parseFloat(Val * q).toFixed(CurrDecimal);
                    row.find('#txtAmnt').val(res);
                    row.find('#txtcgstAmnt').val(CGSTA);
                    row.find('#txtsgstAmnt').val(SGSTA);
                    row.find('#txtigstAmnt').val(IGSTA);

                }
            });
        }

        var totalamnt = 0;
        for (var e = 0; e < ItemList.length; e++) {
            var amount = parseFloat(ItemList[e].Amt) + parseFloat(ItemList[e].CGSTAMt) + parseFloat(ItemList[e].SGSTAMT) + parseFloat(ItemList[e].IGSTAMT);
            totalamnt = totalamnt + parseFloat(amount);

        }

        $('#txttotal').val(totalamnt.toFixed(CurrDecimal));
        $('#txtBTotAmt').val(totalamnt.toFixed(CurrDecimal));
        $('#txtGrossAmount').val(totalamnt.toFixed(CurrDecimal));

        var GrossAmt = $('#txttotal').val();
        var ANAmt = $('#txtAccAmt').val();

        if (ANAmt == '') {
            ANAmt = 0;
        }
        var FNAmt = parseFloat(GrossAmt) + parseFloat(ANAmt);

        $('#txtNetAmt').val(parseFloat(FNAmt).toFixed(CurrDecimal));

        var totalqt = 0;
        for (var e = 0; e < ItemList.length; e++) {
            var amount = ItemList[e].quantity;
            totalqt = totalqt + parseFloat(amount);

        }
        $('#txtqnty').val(totalqt.toFixed(3));
    });

    $(document).on('change', '.txtRate', function () {
        debugger;
        var table = $('#tblEntryItemdetails').DataTable();
        var CSno = table.row($(this).parents('tr')).data()["SNo"];
        var rate = table.row($(this).parents('tr')).data()["AppRate"];
        var rt = table.row($(this).parents('tr')).data()["Rate"];
        var qt = table.row($(this).parents('tr')).data()["quantity"];
        var CGST = table.row($(this).parents('tr')).data()["CGST"];
        var SGST = table.row($(this).parents('tr')).data()["SGST"];
        var IGST = table.row($(this).parents('tr')).data()["IGST"];
        var Val = $(this).val();

        Val = parseFloat(Val).toFixed(CurrDecimal);


        var CGSTA = (parseFloat(qt) * parseFloat(Val) * parseFloat(CGST) / 100).toFixed(CurrDecimal);
        var SGSTA = (parseFloat(qt) * parseFloat(Val) * parseFloat(SGST) / 100).toFixed(CurrDecimal);
        var IGSTA = (parseFloat(qt) * parseFloat(Val) * parseFloat(IGST) / 100).toFixed(CurrDecimal);

        if (ChkBudApp == 'Y' && (OrderType == "B"  || OrderType == "R")) {
            if (Val <= rate) {
                $.each(ItemList, function () {
                    if (this.SNo == CSno) {
                        this.Rate = Val;
                        var amt = Val * this.quantity;
                        this.Amt = parseFloat(amt).toFixed(CurrDecimal);
                        this.CGSTAMt = CGSTA;
                        this.SGSTAMT = SGSTA;
                        this.IGSTAMT = IGSTA;
                    }
                });
                var tableig = $('#tblEntryItemdetails').DataTable();
                var dataig = tableig.rows().data();

                $('input[id=txtAmnt]').each(function (ij) {
                    if (dataig[ij].SNo == CSno) {
                        var row = $(this).closest('tr');
                        row.find('#txtRate').val(dataig[ij].Rate);
                        var t = dataig[ij].Rate * dataig[ij].quantity;
                        t = t.toFixed(CurrDecimal);
                        row.find('#txtAmnt').val(t);
                        row.find('#txtcgstAmnt').val(CGSTA);
                        row.find('#txtsgstAmnt').val(SGSTA);
                        row.find('#txtigstAmnt').val(IGSTA);
                    }
                });
            }
            else {
                var msg = 'Should not exceed BudgetRate...';
                var flg = 4;
                AlartMessage(msg, flg);
                //alert('Should not exceed BudgetRate...');
                $.each(ItemList, function () {
                    if (this.SNo == CSno) {
                        this.Rate = this.AppRate;
                        var t = this.AppRate * this.quantity;
                        t = t.toFixed(CurrDecimal);
                        this.Amt = t;
                        this.CGSTAMt = CGSTA;
                        this.SGSTAMT = SGSTA;
                        this.IGSTAMT = IGSTA;
                    }
                });
                var tableig = $('#tblEntryItemdetails').DataTable();
                var dataig = tableig.rows().data();

                $('input[id=txtAmnt]').each(function (ij) {
                    if (dataig[ij].SNo == CSno) {
                        var row = $(this).closest('tr');
                        row.find('#txtRate').val(dataig[ij].AppRate);
                        var t = dataig[ij].AppRate * dataig[ij].quantity;
                        t = t.toFixed(CurrDecimal);
                        row.find('#txtAmnt').val(t);
                        row.find('#txtcgstAmnt').val(CGSTA);
                        row.find('#txtsgstAmnt').val(SGSTA);
                        row.find('#txtigstAmnt').val(IGSTA);

                    }
                });
                return true;
            }
        }
        else if (CostAppSamPurCheck == 'Y' && (OrderType == "S")) {
            if (Val <= rate) {
                $.each(ItemList, function () {
                    if (this.SNo == CSno) {
                        this.Rate = Val;
                        var amt = Val * this.quantity;
                        this.Amt = parseFloat(amt).toFixed(CurrDecimal);
                        this.CGSTAMt = CGSTA;
                        this.SGSTAMT = SGSTA;
                        this.IGSTAMT = IGSTA;
                    }
                });
                var tableig = $('#tblEntryItemdetails').DataTable();
                var dataig = tableig.rows().data();

                $('input[id=txtAmnt]').each(function (ij) {
                    if (dataig[ij].SNo == CSno) {
                        var row = $(this).closest('tr');
                        row.find('#txtRate').val(dataig[ij].Rate);
                        var t = dataig[ij].Rate * dataig[ij].quantity;
                        t = t.toFixed(CurrDecimal);
                        row.find('#txtAmnt').val(t);
                        row.find('#txtcgstAmnt').val(CGSTA);
                        row.find('#txtsgstAmnt').val(SGSTA);
                        row.find('#txtigstAmnt').val(IGSTA);
                    }
                });
            }
            else {
                var msg = 'Should not exceed BudgetRate...';
                var flg = 4;
                AlartMessage(msg, flg);
                //alert('Should not exceed BudgetRate...');
                $.each(ItemList, function () {
                    if (this.SNo == CSno) {
                        this.Rate = this.AppRate;
                        var t = this.AppRate * this.quantity;
                        t = t.toFixed(CurrDecimal);
                        this.Amt = t;
                        this.CGSTAMt = CGSTA;
                        this.SGSTAMT = SGSTA;
                        this.IGSTAMT = IGSTA;
                    }
                });
                var tableig = $('#tblEntryItemdetails').DataTable();
                var dataig = tableig.rows().data();

                $('input[id=txtAmnt]').each(function (ij) {
                    if (dataig[ij].SNo == CSno) {
                        var row = $(this).closest('tr');
                        row.find('#txtRate').val(dataig[ij].AppRate);
                        var t = dataig[ij].AppRate * dataig[ij].quantity;
                        t = t.toFixed(CurrDecimal);
                        row.find('#txtAmnt').val(t);
                        row.find('#txtcgstAmnt').val(CGSTA);
                        row.find('#txtsgstAmnt').val(SGSTA);
                        row.find('#txtigstAmnt').val(IGSTA);

                    }
                });
                return true;
            }

        }

        else {
            $.each(ItemList, function () {
                if (this.SNo == CSno) {
                    this.Rate = Val;
                    // this.Amt = Val * this.quantity;
                    var t = Val * this.quantity;
                    t = parseFloat(t).toFixed(CurrDecimal);
                    this.Amt = t;
                    this.CGSTAMt = CGSTA;
                    this.SGSTAMT = SGSTA;
                    this.IGSTAMT = IGSTA;
                }
            });
            //loadItemTable(ItemList);

            var table = $('#tblEntryItemdetails').DataTable();
            var data = table.rows().data();

            $('input[id=txtAmnt]').each(function (ig) {
                if (data[ig].SNo == CSno) {
                    var row = $(this).closest('tr');
                    row.find('#txtRate').val(Val);
                    var q = row.find('#txtQty').val();
                    var res = parseFloat(Val * q).toFixed(CurrDecimal);
                    row.find('#txtAmnt').val(res);
                    row.find('#txtcgstAmnt').val(CGSTA);
                    row.find('#txtsgstAmnt').val(SGSTA);
                    row.find('#txtigstAmnt').val(IGSTA);

                }
            });
        }

        var totalamnt = 0;
        for (var e = 0; e < ItemList.length; e++) {
            var amount = parseFloat(ItemList[e].Amt) + parseFloat(ItemList[e].CGSTAMt) + parseFloat(ItemList[e].SGSTAMT) + parseFloat(ItemList[e].IGSTAMT);
            totalamnt = totalamnt + parseFloat(amount);

        }

        $('#txttotal').val(totalamnt.toFixed(CurrDecimal));
        $('#txtBTotAmt').val(totalamnt.toFixed(CurrDecimal));
        $('#txtGrossAmount').val(totalamnt.toFixed(CurrDecimal));

        var GrossAmt = $('#txttotal').val();
        var ANAmt = $('#txtAccAmt').val();
        if (ANAmt == '') {
            ANAmt = 0;
        }
        var FNAmt = parseFloat(GrossAmt) + parseFloat(ANAmt);

        $('#txtNetAmt').val(parseFloat(FNAmt).toFixed(CurrDecimal));

        var totalqt = 0;
        for (var e = 0; e < ItemList.length; e++) {
            var amount = ItemList[e].quantity;
            totalqt = totalqt + parseFloat(amount);

        }
        $('#txtqnty').val(totalqt.toFixed(3));
    });


    $(document).on('keyup', '.remarks', function () {
        debugger;
        var table = $('#tblEntryItemdetails').DataTable();
        var CSno = table.row($(this).parents('tr')).data()["SNo"];
        //var IId = table.row($(this).parents('tr')).data()["ItemID"];
        //var CId = table.row($(this).parents('tr')).data()["ColorID"];
        //var SId = table.row($(this).parents('tr')).data()["SizeID"];
        var Val = $(this).val();

        $.each(ItemList, function () {
            if (this.SNo == CSno) {
                this.ItemRemarks = Val;
            }
        });
        //loadItemTable(ItemList);

        //Update Corressponding Table row without Postback
        var table = $('#tblEntryItemdetails').DataTable();
        var data = table.rows().data();

        $('input[id=txtremarks]').each(function (ig) {
            if (data[ig].SNo == CSno) {
                var row = $(this).closest('tr');
                row.find('#txtremarks').val(Val);
            }
        });
    });
    //$(document).on('keyup', '.txtCGST', function () {
    //    debugger;
    //    var table = $('#tblEntryItemdetails').DataTable();
    //    var CSno = table.row($(this).parents('tr')).data()["SNo"];
    //    var Rate = table.row($(this).parents('tr')).data()["Rate"];
    //    var CGST = table.row($(this).parents('tr')).data()["CGST"];
    //    var SGST = table.row($(this).parents('tr')).data()["SGST"];
    //    var IGST = table.row($(this).parents('tr')).data()["IGST"];
    //    var OrdBalQty = table.row($(this).parents('tr')).data()["OrdBal"];
    //    var IId = table.row($(this).parents('tr')).data()["ItemID"];
    //    var CId = table.row($(this).parents('tr')).data()["ColorID"];
    //    var SId = table.row($(this).parents('tr')).data()["SizeID"];
    //    var PUId = table.row($(this).parents('tr')).data()["PurUomId"];
    //    var Qty = table.row($(this).parents('tr')).data()["quantity"];

    //    var Val = $(this).val();
    //    var Issqty = Val;

    //    var IQty = 0;
    //    if (Val == 0) {

    //    }
    //    else {
    //        IQty = Val;
    //    }


    //    var CGSTA = (parseFloat(Rate) * parseFloat(Qty) * parseFloat(Val) / 100).toFixed(CurrDecimal);
    //    if (!Val.match(/^[\-\+]?[\d\,]*\.?[\d]*$/)) {

    //        $.each(ItemList, function () {
    //            if (this.SNo == CSno) {
    //                this.CGST = 0;
    //                this.CGSTAMt = 0;
    //            }
    //        });
    //        loadItemTable(ItemList);
    //        return false;
    //    }

    //    $.each(ItemList, function () {
    //        if (this.SNo == CSno) {
    //            this.CGST = Val;
    //            this.CGSTAMt = CGSTA;
    //        }
    //    });
    //    //loadItemTable(ItemList);



    //    //Datatable textbox focus
    //    var table = $('#tblEntryItemdetails').DataTable();
    //    var data = table.rows().data();

    //    $('input[id=txtCGST]').each(function (ig) {
    //        if (data[ig].SNo == CSno) {
    //            var row = $(this).closest('tr');
    //            var num = row.find('#txtCGST').val();
    //            row.find('#txtCGST').focus().val('').val(num);
    //            return true;
    //        }
    //    });



    //    //Datatable textbox focus
    //    //var rows = $("#tblEntryItemdetails").dataTable().fnGetNodes();
    //    //var dtTable = $('#tblEntryItemdetails').DataTable();
    //    //for (var i = 0; i < rows.length; i++) {
    //    //    var sn = dtTable.cells({ row: i, column: 1 }).data()[0];
    //    //    $('input[id=txtCGST]').each(function () {
    //    //        if (sn == CSno && $(this).val() == Val) {
    //    //            var row = $(this).closest('tr');
    //    //            var num = row.find('#txtCGST').val();
    //    //            row.find('#txtCGST').focus().val('').val(num);
    //    //            return true;
    //    //        }
    //    //    });
    //    //}



    //});
    //$(document).on('keyup', '.txtSGST', function () {
    //    debugger;
    //    var table = $('#tblEntryItemdetails').DataTable();
    //    var CSno = table.row($(this).parents('tr')).data()["SNo"];
    //    var Rate = table.row($(this).parents('tr')).data()["Rate"];
    //    var CGST = table.row($(this).parents('tr')).data()["CGST"];
    //    var SGST = table.row($(this).parents('tr')).data()["SGST"];
    //    var IGST = table.row($(this).parents('tr')).data()["IGST"];
    //    var OrdBalQty = table.row($(this).parents('tr')).data()["OrdBal"];
    //    var IId = table.row($(this).parents('tr')).data()["ItemID"];
    //    var CId = table.row($(this).parents('tr')).data()["ColorID"];
    //    var SId = table.row($(this).parents('tr')).data()["SizeID"];
    //    var PUId = table.row($(this).parents('tr')).data()["PurUomId"];
    //    var Qty = table.row($(this).parents('tr')).data()["quantity"];

    //    var Val = $(this).val();
    //    var Issqty = Val;

    //    var IQty = 0;
    //    if (Val == 0) {
    //        IQty = 0;
    //    }
    //    else {
    //        IQty = Val;
    //    }


    //    var SGSTA = (parseFloat(Rate) * parseFloat(Qty) * parseFloat(Val) / 100).toFixed(CurrDecimal);
    //    if (!Val.match(/^[\-\+]?[\d\,]*\.?[\d]*$/)) {

    //        $.each(ItemList, function () {
    //            if (this.SNo == CSno) {
    //                this.SGST = 0;
    //                this.SGSTAMT = 0;
    //            }
    //        });
    //        loadItemTable(ItemList);
    //        return false;
    //    }

    //    $.each(ItemList, function () {
    //        if (this.SNo == CSno) {
    //            this.SGST = Val;
    //            this.SGSTAMT = SGSTA;
    //        }
    //    });
    //   // loadItemTable(ItemList);


    //    //Datatable textbox focus
    //    var table = $('#tblEntryItemdetails').DataTable();
    //    var data = table.rows().data();

    //    $('input[id=txtSGST]').each(function (ig) {
    //        if (data[ig].SNo == CSno) {
    //            var row = $(this).closest('tr');
    //            var num = row.find('#txtSGST').val();
    //            row.find('#txtSGST').focus().val('').val(num);
    //            return true;
    //        }
    //    });



    //    ////Datatable textbox focus
    //    //var rows = $("#tblEntryItemdetails").dataTable().fnGetNodes();
    //    //var dtTable = $('#tblEntryItemdetails').DataTable();
    //    //for (var i = 0; i < rows.length; i++) {
    //    //    var sn = dtTable.cells({ row: i, column: 1 }).data()[0];
    //    //    $('input[id=txtSGST]').each(function () {
    //    //        if (sn == CSno && $(this).val() == Val) {
    //    //            var row = $(this).closest('tr');
    //    //            var num = row.find('#txtSGST').val();
    //    //            row.find('#txtSGST').focus().val('').val(num);
    //    //            return true;
    //    //        }
    //    //    });
    //    //}

    //});
    //$(document).on('keyup', '.txtIGST', function () {
    //    debugger;
    //    var table = $('#tblEntryItemdetails').DataTable();
    //    var CSno = table.row($(this).parents('tr')).data()["SNo"];
    //    var Rate = table.row($(this).parents('tr')).data()["Rate"];
    //    var CGST = table.row($(this).parents('tr')).data()["CGST"];
    //    var SGST = table.row($(this).parents('tr')).data()["SGST"];
    //    var IGST = table.row($(this).parents('tr')).data()["IGST"];
    //    var OrdBalQty = table.row($(this).parents('tr')).data()["OrdBal"];
    //    var IId = table.row($(this).parents('tr')).data()["ItemID"];
    //    var CId = table.row($(this).parents('tr')).data()["ColorID"];
    //    var SId = table.row($(this).parents('tr')).data()["SizeID"];
    //    var PUId = table.row($(this).parents('tr')).data()["PurUomId"];
    //    var Qty = table.row($(this).parents('tr')).data()["quantity"];

    //    var Val = $(this).val();
    //    var Issqty = Val;

    //    var IQty = 0;
    //    if (Val == 0) {
    //        IQty = 0;
    //    }
    //    else {
    //        IQty = Val;
    //    }


    //    var IGSTA = (parseFloat(Rate) * parseFloat(Qty) * parseFloat(Val) / 100).toFixed(CurrDecimal);
    //    if (!Val.match(/^[\-\+]?[\d\,]*\.?[\d]*$/)) {

    //        $.each(ItemList, function () {
    //            if (this.SNo == CSno) {
    //                this.IGST = 0;
    //                this.IGSTAMT = 0;
    //            }
    //        });
    //        loadItemTable(ItemList);
    //        return false;
    //    }

    //    $.each(ItemList, function () {
    //        if (this.SNo == CSno) {
    //            this.IGST = Val;
    //            this.IGSTAMT = IGSTA;
    //        }
    //    });
    //   // loadItemTable(ItemList);


    //    //Datatable textbox focus
    //    var table = $('#tblEntryItemdetails').DataTable();
    //    var data = table.rows().data();

    //    $('input[id=txtIGST]').each(function (ig) {
    //        if (data[ig].SNo == CSno) {
    //            var row = $(this).closest('tr');
    //            var num = row.find('#txtIGST').val();
    //            row.find('#txtIGST').focus().val('').val(num);
    //            return true;
    //        }
    //    });



    //    ////Datatable textbox focus
    //    //var rows = $("#tblEntryItemdetails").dataTable().fnGetNodes();
    //    //var dtTable = $('#tblEntryItemdetails').DataTable();
    //    //for (var i = 0; i < rows.length; i++) {
    //    //    var sn = dtTable.cells({ row: i, column: 1 }).data()[0];
    //    //    $('input[id=txtIGST]').each(function () {
    //    //        if (sn == CSno && $(this).val() == Val) {
    //    //            var row = $(this).closest('tr');
    //    //            var num = row.find('#txtIGST').val();
    //    //            row.find('#txtIGST').focus().val('').val(num);
    //    //            return true;
    //    //        }
    //    //    });
    //    //}

    //});

    $(document).on('change', '.txtCGST', function () {
        debugger;
        var table = $('#tblEntryItemdetails').DataTable();
        var CSno = table.row($(this).parents('tr')).data()["SNo"];
        var Rate = table.row($(this).parents('tr')).data()["Rate"];
        var CGST = table.row($(this).parents('tr')).data()["CGST"];
        var SGST = table.row($(this).parents('tr')).data()["SGST"];
        var IGST = table.row($(this).parents('tr')).data()["IGST"];
        var OrdBalQty = table.row($(this).parents('tr')).data()["OrdBal"];
        var IId = table.row($(this).parents('tr')).data()["ItemID"];
        var CId = table.row($(this).parents('tr')).data()["ColorID"];
        var SId = table.row($(this).parents('tr')).data()["SizeID"];
        var PUId = table.row($(this).parents('tr')).data()["PurUomId"];
        var Qty = table.row($(this).parents('tr')).data()["quantity"];

        var Val = $(this).val();

        Val = parseFloat(Val).toFixed(CurrDecimal);


        var Issqty = Val;

        var IQty = 0;
        if (Val == 0) {

        }
        else {
            IQty = Val;
        }


        var CGSTA = (parseFloat(Rate) * parseFloat(Qty) * parseFloat(Val) / 100).toFixed(CurrDecimal);
        if (!Val.match(/^[\-\+]?[\d\,]*\.?[\d]*$/)) {

            $.each(ItemList, function () {
                if (this.SNo == CSno) {
                    this.CGST = 0;
                    this.CGSTAMt = 0;
                }
            });
            loadItemTable(ItemList);
            return false;
        }

        $.each(ItemList, function () {
            if (this.SNo == CSno) {
                this.CGST = Val;
                this.CGSTAMt = CGSTA;
            }
        });
        loadItemTable(ItemList);



        ////Datatable textbox focus
        //var table = $('#tblEntryItemdetails').DataTable();
        //var data = table.rows().data();

        //$('input[id=txtCGST]').each(function (ig) {
        //    if (data[ig].SNo == CSno) {
        //        var row = $(this).closest('tr');
        //        var num = row.find('#txtCGST').val();
        //        row.find('#txtCGST').focus().val('').val(num);
        //        return true;
        //    }
        //});



        ////Datatable textbox focus
        //var rows = $("#tblEntryItemdetails").dataTable().fnGetNodes();
        //var dtTable = $('#tblEntryItemdetails').DataTable();
        //for (var i = 0; i < rows.length; i++) {
        //    var sn = dtTable.cells({ row: i, column: 1 }).data()[0];
        //    $('input[id=txtCGST]').each(function () {
        //        if (sn == CSno && $(this).val() == Val) {
        //            var row = $(this).closest('tr');
        //            var num = row.find('#txtCGST').val();
        //            row.find('#txtCGST').focus().val('').val(num);
        //            return true;
        //        }
        //    });
        //}



    });
    $(document).on('change', '.txtSGST', function () {
        debugger;
        var table = $('#tblEntryItemdetails').DataTable();
        var CSno = table.row($(this).parents('tr')).data()["SNo"];
        var Rate = table.row($(this).parents('tr')).data()["Rate"];
        var CGST = table.row($(this).parents('tr')).data()["CGST"];
        var SGST = table.row($(this).parents('tr')).data()["SGST"];
        var IGST = table.row($(this).parents('tr')).data()["IGST"];
        var OrdBalQty = table.row($(this).parents('tr')).data()["OrdBal"];
        var IId = table.row($(this).parents('tr')).data()["ItemID"];
        var CId = table.row($(this).parents('tr')).data()["ColorID"];
        var SId = table.row($(this).parents('tr')).data()["SizeID"];
        var PUId = table.row($(this).parents('tr')).data()["PurUomId"];
        var Qty = table.row($(this).parents('tr')).data()["quantity"];

        var Val = $(this).val();

        Val = parseFloat(Val).toFixed(CurrDecimal);

        var Issqty = Val;

        var IQty = 0;
        if (Val == 0) {
            IQty = 0;
        }
        else {
            IQty = Val;
        }


        var SGSTA = (parseFloat(Rate) * parseFloat(Qty) * parseFloat(Val) / 100).toFixed(CurrDecimal);
        if (!Val.match(/^[\-\+]?[\d\,]*\.?[\d]*$/)) {

            $.each(ItemList, function () {
                if (this.SNo == CSno) {
                    this.SGST = 0;
                    this.SGSTAMT = 0;
                }
            });
            loadItemTable(ItemList);
            return false;
        }

        $.each(ItemList, function () {
            if (this.SNo == CSno) {
                this.SGST = Val;
                this.SGSTAMT = SGSTA;
            }
        });
        loadItemTable(ItemList);


        ////Datatable textbox focus
        //var table = $('#tblEntryItemdetails').DataTable();
        //var data = table.rows().data();

        //$('input[id=txtSGST]').each(function (ig) {
        //    if (data[ig].SNo == CSno) {
        //        var row = $(this).closest('tr');
        //        var num = row.find('#txtSGST').val();
        //        row.find('#txtSGST').focus().val('').val(num);
        //        return true;
        //    }
        //});



        ////Datatable textbox focus
        //var rows = $("#tblEntryItemdetails").dataTable().fnGetNodes();
        //var dtTable = $('#tblEntryItemdetails').DataTable();
        //for (var i = 0; i < rows.length; i++) {
        //    var sn = dtTable.cells({ row: i, column: 1 }).data()[0];
        //    $('input[id=txtSGST]').each(function () {
        //        if (sn == CSno && $(this).val() == Val) {
        //            var row = $(this).closest('tr');
        //            var num = row.find('#txtSGST').val();
        //            row.find('#txtSGST').focus().val('').val(num);
        //            return true;
        //        }
        //    });
        //}

    });
    $(document).on('change', '.txtIGST', function () {
        debugger;
        var table = $('#tblEntryItemdetails').DataTable();
        var CSno = table.row($(this).parents('tr')).data()["SNo"];
        var Rate = table.row($(this).parents('tr')).data()["Rate"];
        var CGST = table.row($(this).parents('tr')).data()["CGST"];
        var SGST = table.row($(this).parents('tr')).data()["SGST"];
        var IGST = table.row($(this).parents('tr')).data()["IGST"];
        var OrdBalQty = table.row($(this).parents('tr')).data()["OrdBal"];
        var IId = table.row($(this).parents('tr')).data()["ItemID"];
        var CId = table.row($(this).parents('tr')).data()["ColorID"];
        var SId = table.row($(this).parents('tr')).data()["SizeID"];
        var PUId = table.row($(this).parents('tr')).data()["PurUomId"];
        var Qty = table.row($(this).parents('tr')).data()["quantity"];

        var Val = $(this).val();
        Val = parseFloat(Val).toFixed(CurrDecimal);

        var Issqty = Val;

        var IQty = 0;
        if (Val == 0) {
            IQty = 0;
        }
        else {
            IQty = Val;
        }


        var IGSTA = (parseFloat(Rate) * parseFloat(Qty) * parseFloat(Val) / 100).toFixed(CurrDecimal);
        if (!Val.match(/^[\-\+]?[\d\,]*\.?[\d]*$/)) {

            $.each(ItemList, function () {
                if (this.SNo == CSno) {
                    this.IGST = 0;
                    this.IGSTAMT = 0;
                }
            });
            loadItemTable(ItemList);
            return false;
        }

        $.each(ItemList, function () {
            if (this.SNo == CSno) {
                this.IGST = Val;
                this.IGSTAMT = IGSTA;
            }
        });
        loadItemTable(ItemList);

        ////Datatable textbox focus
        //var table = $('#tblEntryItemdetails').DataTable();
        //var data = table.rows().data();

        //$('input[id=txtIGST]').each(function (ig) {
        //    if (data[ig].SNo == CSno) {
        //        var row = $(this).closest('tr');
        //        var num = row.find('#txtIGST').val();
        //        row.find('#txtIGST').focus().val('').val(num);
        //        return true;
        //    }
        //});


        ////Datatable textbox focus
        //var rows = $("#tblEntryItemdetails").dataTable().fnGetNodes();
        //var dtTable = $('#tblEntryItemdetails').DataTable();
        //for (var i = 0; i < rows.length; i++) {
        //    var sn = dtTable.cells({ row: i, column: 1 }).data()[0];
        //    $('input[id=txtIGST]').each(function () {
        //        if (sn == CSno && $(this).val() == Val) {
        //            var row = $(this).closest('tr');
        //            var num = row.find('#txtIGST').val();
        //            row.find('#txtIGST').focus().val('').val(num);
        //            return true;
        //        }
        //    });
        //}

    });

    //$(document).on('keyup', '.calcAmt', function () {
    //    if (OrderType == 'G') {
    //        var table = $('#tblEntryItemdetails').DataTable();
    //        var IId = table.row($(this).parents('tr')).data()["ItemID"];
    //        var CId = table.row($(this).parents('tr')).data()["ColorID"];
    //        var SId = table.row($(this).parents('tr')).data()["SizeID"];

    //        modalflg = 'G';
    //        Stkitemid = IId;
    //        Stkcolorid = CId;
    //        StkSizeid = SId;
    //        if (Stkitemid != CItem && Stkcolorid != CColor && StkSizeid != CSize) {
    //            ItemStockList = [];
    //            LoadStockTransDetails(Stkitemid, Stkcolorid, StkSizeid);
    //        }

    //        StktoOrdno = "";
    //        StkToStyleid = 0;
    //        ItemStockList = [];
    //        LoadChkStockTransDetails(Stkitemid, Stkcolorid, StkSizeid);
    //    }

    //});


    $(document).on('keyup', '.calcAmt', function () {
        debugger;
        var table = $('#tblEntryItemdetails').DataTable();
        var CSno = table.row($(this).parents('tr')).data()["SNo"];
        var Rate = table.row($(this).parents('tr')).data()["Rate"];
        var CGST = table.row($(this).parents('tr')).data()["CGST"];
        var SGST = table.row($(this).parents('tr')).data()["SGST"];
        var IGST = table.row($(this).parents('tr')).data()["IGST"];
        var OrdBalQty = table.row($(this).parents('tr')).data()["OrdBal"];
        var IId = table.row($(this).parents('tr')).data()["ItemID"];
        var CId = table.row($(this).parents('tr')).data()["ColorID"];
        var SId = table.row($(this).parents('tr')).data()["SizeID"];
        var PUId = table.row($(this).parents('tr')).data()["PurUomId"];
        var InDetId = table.row($(this).parents('tr')).data()["IndDetId"]; 
        var Val = $(this).val();
        var Issqty = Val;

        var IQty = 0;
        if (Val == 0) {
            IQty = 0;
        }
        else {
            IQty = Val;
        }


        var field = Val;
        if (!field.match(/^[\-\+]?[\d\,]*\.?[\d]*$/)) {

            $.each(ItemList, function () {
                if (this.SNo == CSno) {
                    this.quantity = 0;
                }
            });
            loadItemTable(ItemList);
            return false;
        }

        var CGSTA = (parseFloat(Rate) * parseFloat(Val) * parseFloat(CGST) / 100).toFixed(CurrDecimal);
        var SGSTA = (parseFloat(Rate) * parseFloat(Val) * parseFloat(SGST) / 100).toFixed(CurrDecimal);
        var IGSTA = (parseFloat(Rate) * parseFloat(Val) * parseFloat(IGST) / 100).toFixed(CurrDecimal);

        var ratecal = Val;
        var res = ratecal * Rate;

        if (OrderType == "B" || OrderType == "G" || OrderType == "I" || OrderType == "R") {

            if (ratecal > OrdBalQty) {

                var msg = 'Order Quantity Should Not Greater then Order Balance Quantity..';
                var flg = 4;
                AlartMessage(msg, flg);
                //alert("OrderQty Should Not Greater then OrderBalanceQty..");


                finalresult = res.toFixed(2);
                $.each(ItemList, function () {
                    if (this.SNo == CSno) {
                        this.quantity = 0;

                    }
                });

                //loadItemTable(ItemList);
                var tablef = $('#tblEntryItemdetails').DataTable();
                var datas = tablef.rows().data();

                $('input[id=txtAmnt]').each(function (ig) {
                    if (datas[ig].SNo == CSno) {
                        var row = $(this).closest('tr');
                        row.find('#txtQty').val(0);
                    }
                });
                return true;
            }
        }

        finalresult = res.toFixed(2);
        $.each(ItemList, function () {
            if (this.SNo == CSno) {
                this.quantity = ratecal;
                this.Amt = parseFloat(res).toFixed(CurrDecimal);
                this.CGSTAMt = CGSTA;
                this.SGSTAMT = SGSTA;
                this.IGSTAMT = IGSTA;
            }
        });


        var totalamnt = 0;
        for (var e = 0; e < ItemList.length; e++) {
            var amount = parseFloat(ItemList[e].Amt) + parseFloat(ItemList[e].CGSTAMt) + parseFloat(ItemList[e].SGSTAMT) + parseFloat(ItemList[e].IGSTAMT);
            totalamnt = totalamnt + parseFloat(amount);

        }


        //loadItemTable(ItemList);

        var table = $('#tblEntryItemdetails').DataTable();
        var data = table.rows().data();

        $('input[id=txtAmnt]').each(function (ig) {
            if (data[ig].SNo == CSno) {
                var row = $(this).closest('tr');
                row.find('#txtQty').val(ratecal);
                row.find('#txtAmnt').val(parseFloat(res).toFixed(CurrDecimal));
                row.find('#txtcgstAmnt').val(CGSTA);
                row.find('#txtsgstAmnt').val(SGSTA);
                row.find('#txtigstAmnt').val(IGSTA);

            }
        });


        //ChkBudApp();


        //if (Mode == 1) {
        //    LoadEditOrderDetails(POMId, IId, CId, SId, PUId, ratecal);
        //}

        ///Load Save Order Table
        finalresult = res.toFixed(2);
        //$.each(OrderListSave, function () {
        //    if (this.ItemID == IId && this.ColorID == CId && this.SizeID == SId && this.PurUomId == PUId) {
        //        this.quantity = Val;

        //    }
        //});

        //loadOrderTableSave(OrderListSave);


        var pid = [];
        var bal = [];
        var qty = [];
        if (OrderType == "I" || OrderType == "G") {

            for (var t = 0; t < OrderListSave.length; t++) {
                if (OrderListSave[t].ItemID == IId && OrderListSave[t].ColorID == CId && OrderListSave[t].SizeID == SId) {
                    pid.push(OrderListSave[t].IndBuyJobId);
                    bal.push(OrderListSave[t].OBQty);
                    qty.push(OrderListSave[t].quantity);
                }
            }

        } else {
            for (var t = 0; t < OrderListSave.length; t++) {
                if (OrderListSave[t].ItemID == IId && OrderListSave[t].ColorID == CId && OrderListSave[t].SizeID == SId) {
                    pid.push(OrderListSave[t].BuyODetId);
                    bal.push(OrderListSave[t].OBQty);
                    qty.push(OrderListSave[t].quantity);
                }
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

        if (OrderType == "I" || OrderType == "G") {
            for (var u = 0; u < OrderListSave.length; u++) {
                for (var r = 0; r < pid.length; r++) {
                    if (OrderListSave[u].IndBuyJobId == pid[r]) {
                        OrderListSave[u].quantity = parseFloat(qty[r]).toFixed(3);
                    }
                }
            }

            loadOrderTableSave(OrderListSave);


            for (var u = 0; u < OrderList.length; u++) {
                for (var r = 0; r < pid.length; r++) {
                    if (OrderList[u].IndBuyJobId == pid[r]) {
                        OrderList[u].quantity = parseFloat(qty[r]).toFixed(3);
                    }
                }
            }
        } else {
            for (var u = 0; u < OrderListSave.length; u++) {
                for (var r = 0; r < pid.length; r++) {
                    if (OrderListSave[u].BuyODetId == pid[r]) {
                        OrderListSave[u].quantity = parseFloat(qty[r]).toFixed(3);
                    }
                }
            }

            loadOrderTableSave(OrderListSave);


            for (var u = 0; u < OrderList.length; u++) {
                for (var r = 0; r < pid.length; r++) {
                    if (OrderList[u].BuyODetId == pid[r]) {
                        OrderList[u].quantity = parseFloat(qty[r]).toFixed(3);
                    }
                }
            }
        }
        if (Mode == 0 || Mode == 1) {

       
           
                var colorempty = [];
                colorempty = OrderListSave;

                colorempty = $.grep(colorempty, function (v) {
                    return (v.ItemID === IId && v.ColorID === CId && v.SizeID === SId);
                });

                loadOrderTable(colorempty);

                OrderList = [];
                OrderList = colorempty;
            

        }
        ///



        $('#txttotal').val(totalamnt.toFixed(CurrDecimal));
        $('#txtBTotAmt').val(totalamnt.toFixed(CurrDecimal));
        $('#txtGrossAmount').val(totalamnt.toFixed(CurrDecimal));

        var totalqt = 0;
        for (var e = 0; e < ItemList.length; e++) {
            var amount = ItemList[e].quantity;
            totalqt = totalqt + parseFloat(amount);

        }
        $('#txtqnty').val(totalqt.toFixed(3));
        //TAmt = val(totalamnt.toFixed(3));


        //var rows = $("#tblEntryItemdetails").dataTable().fnGetNodes();
        //var dtTable = $('#tblEntryItemdetails').DataTable();
        //for (var i = 0; i < rows.length; i++) {
        //    var sn = dtTable.cells({ row: i, column: 1 }).data()[0];
        //    $('input[id=txtQty]').each(function () {
        //        if (sn == CSno && $(this).val() == Issqty) {
        //            var row = $(this).closest('tr');
        //            var num = row.find('#txtQty').val();
        //            row.find('#txtQty').focus().val('').val(num);
        //            return true;
        //        }
        //    });
        //}

    });
    $(document).on('keyup', '.calcsepquan', function () {
        debugger;

        var table = $('#tblEntryOrderdetails').DataTable();

        var pid = table.row($(this).parents('tr')).data()["BuyODetId"];
        var itmid = table.row($(this).parents('tr')).data()["ItemID"];
        var colorid = table.row($(this).parents('tr')).data()["ColorID"];
        var sizeid = table.row($(this).parents('tr')).data()["SizeID"];
        var balq = table.row($(this).parents('tr')).data()["OBQty"];
       
        var value = $(this).val();
        var Issqty = value;
        $.each(OrderListSave, function () {
            if (this.BuyODetId == pid) {
                if (balq >= value) {
                    this.quantity = value;
                }
                else {
                    var t = value - balq;
                    this.quantity = balq;
                }

            }
        });

        var OrderList = [];
        OrderList = OrderListSave;
        OrderList = $.grep(OrderList, function (e) {
            if (e.ItemID == itmid && e.SizeID == sizeid && e.ColorID == colorid) {
                return e;
            }
        });

        var totalamnt = 0;

        for (var e = 0; e < OrderList.length; e++) {
            var amount = OrderList[e].quantity;
            totalamnt = totalamnt + parseFloat(amount);
        }
        $.each(ItemList, function () {
            if (this.ItemID == itmid && this.SizeID == sizeid && this.ColorID == colorid) {
                //this.quantity = 0;

                this.quantity = totalamnt;
                this.Amt = parseFloat(totalamnt * this.Rate).toFixed(2);
                //}


            }
        });


        loadOrderTableSave(OrderListSave);
        loadOrderTable(OrderList);
        loadItemTable(ItemList);



        var rows = $("#tblEntryOrderdetails").dataTable().fnGetNodes();
        var dtTable = $('#tblEntryOrderdetails').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 12 }).data()[0];
            $('input[id=txtOQty]').each(function () {
                if (sn == pid && $(this).val() == Issqty) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtOQty').val();
                    row.find('#txtOQty').focus().val('').val(num);
                    return true;
                }
            });
        }
    });



    $(document).on('change', '.txtplanremks', function () {
        debugger;

        var table = $('#tblEntryOrderdetails').DataTable();

        var pid = table.row($(this).parents('tr')).data()["BuyODetId"];
        var itmid = table.row($(this).parents('tr')).data()["ItemID"];
        var colorid = table.row($(this).parents('tr')).data()["ColorID"];
        var sizeid = table.row($(this).parents('tr')).data()["SizeID"];
        var balq = table.row($(this).parents('tr')).data()["OBQty"];

        var value = $(this).val();
      
        $.each(OrderListSave, function () {
            if (this.BuyODetId == pid) {
                this.PlanItmRmks = value;
            }
        });

    
    });




    $(document).on('click', '.btnedit', function () {
        debugger;
        Mod = 1;
        rowindex = $(this).closest('tr').index();

        var currentro12 = termsList.slice(rowindex);

        $("#ddlTerms").val(currentro12[0]['TermId']);
        $("#txtDes").val(currentro12[0]['Description']);

        $('#btnDesadd').hide();
        $('#btnDesupdate').show();
    });

    //function DeleteChild(r) {
    $(document).on('click', '.btnremove', function () {
        debugger;

        rowindex = $(this).closest('tr').index();

        var currentrowsel = termsList.slice(rowindex);

        TermsSeq = currentrowsel[0]['TermsSeq'];

        termsList.splice(rowindex, 1);
        document.getElementById("tblTermsdetails").deleteRow(rowindex + 1);
    });

    $('#btnDesupdate').click(function () {
        debugger;
        var currentrowsel = termsList.slice(rowindex);

        currentrowsel[0]['TermId'] = $("#ddlTerms").val();
        currentrowsel[0]['TermsName'] = $("#ddlTerms option:selected").text();
        currentrowsel[0]['Description'] = $("#txtDes").val();

        termsList[rowindex] = currentrowsel[0];

        loadTermsTable(termsList);

        $('#btnDesupdate').hide();
        $('#btnDesadd').show();

        $('#ddlTerms').val('0').trigger('change');
        $('#txtDes').val('');
        //if (Mod == 0) {
        //    clearTextBox();
        //}
        //else {
        //    $('#ddlTerms').val('0');
        //    $('#ddlTerms').siblings('span.error').css('visibility', 'hidden');
        //}
        Mod = 0;
    });

    //Add Terms button click event
    $('#btnDesadd').click(function () {
        var isAllValid = true;
        var Termid = 0;
        var TermName = "";
        debugger;
        if ($('#ddlTerms').val() == "0") {
            isAllValid = false;
            $('#ddlTerms').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#ddlTerms').siblings('span.error').css('visibility', 'hidden');
        }




        //Finding the max value of an attribute in an array of objects
        var max = 0;
        jQuery.map(termsList, function (obj) {
            debugger;
            if (obj.TermsSeq > max)
                max = obj.TermsSeq;
        });
        //End

        if (termseq == 0 && termsList.length == 0) {
            termseq = 1;
        }
        else {
            termseq = max + 1;
        }

        if (isAllValid) {
            var termdetid = $('#ddlTerms').val();
            $.ajax({
                url: "/PurchaseOrderEntry/GetLoadTerms",
                data: JSON.stringify({ Tremsdetid: termdetid }),
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {
                    debugger;
                    var obj = [];
                    obj = result.Value
                    Termid = obj[0].TermId;
                    TermName = obj[0].TermName;
                    var TermlistObj = {
                        TermsSeq: termseq,
                        //TermName: $("#ddlTerms option:selected").text(),
                        //TermId: $('#ddlTerms').val(),
                        TermName: TermName,
                        TermId: Termid,
                        Description: $('#txtDes').val(),
                        Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
                    };

                    termsList.push(TermlistObj);

                    loadTermsTable(termsList);

                    //clear select data        
                    $('#ddlTerms').val('0').trigger('change');
                    $('#txtDes').val('');

                },
                failure: function (errMsg) {
                    alert(errMsg);
                }
            });

            //var TermlistObj = {
            //    TermsSeq: termseq,
            //    //TermName: $("#ddlTerms option:selected").text(),
            //    //TermId: $('#ddlTerms').val(),
            //    TermName: TermName,
            //    TermId: Termid,
            //    Description: $('#txtDes').val(),
            //    Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
            //};

            //termsList.push(TermlistObj);

            //loadTermsTable(termsList);

            ////clear select data        
            //$('#ddlTerms').val('0');
            //$('#txtDes').val('');
        }
    });

});


$(document).ready(function () {
    $("#tblEntryItemdetails ").dataTable().find("tbody").on('click', 'tr', function () {
        index = (this.rowIndex) - 1;
    });
});


$(document).ready(function () {
    $("#tblEntryOrderdetails ").dataTable().find("tbody").on('click', 'tr', function () {
        ind = (this.rowIndex) - 1;
    });
});

function loadTermsTable(termList) {
    //$('#tblTermsdetails').DataTable().destroy();
    var inputcount = 0;
    $('#tblTermsdetails tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        //var tableinput = $('#tblinnergrid').DataTable();
        //tableinput.clear().draw();
        $('#tblTermsdetails').DataTable().destroy();
    }
    debugger;
    $('#tblTermsdetails').DataTable({
        data: termList,
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
            { title: "Sno", data: "TermsSeq", "visible": false },
            { title: "ID", data: "TermId", "visible": false },
            { title: "Terms", data: "TermName" },
            { title: "Description", data: "Description" },
               {
                   title: "ACTION", "mDataProp": null,
                   //"sDefaultContent": '<button type="button" class="btnedit"> Edit </button> <a id=" 1 " onclick="return DeleteChild(this)" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="1"><i class="fa fa-trash-o" style="cursor: pointer;"></i></a>'
                   "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnremove btn btn-danger btn-round"> <i class="fa fa-times"></i> </button><i class="fa fa-trash-o" style="cursor: pointer;display:none;"></i></a>'//<button type="button" class="btnsizeview"> View Color </button>
               }
        ]
    });
}

function LoadPurEditDetails(POMId) {
    //LoadCompanyDDL("#ddlBCompany");
    //LoadPayTermsDDL("#ddlBPayTerms");
    //LoadEmployeeDDL("#ddlBApprove");   
    //LoadSupplierDDL("#ddlSupplier");
    //LoadAddlessDDL("#ddlAcc");
    $.ajax({
        url: "/PurchaseOrderEntry/GetPurEditDetails",
        data: JSON.stringify({ pur_ord_id: POMId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            debugger;
            if (obj != undefined) {

                $('#txtPoNo').val(obj[0]["pur_ord_no"]);
                $('#ddlSupplier').val(obj[0]["Supplier"]).trigger('change');
                Suppid = obj[0]["SupplierId"];
                $('#ddlLoc').val(obj[0]["Unit_Supplier"]);
                $('#ddlBCompany').val(obj[0]["BillCompany"]).trigger('change');
                $('#ddlBPayTerms').val(obj[0]["Paytermid"]).trigger('change');
                $('#txtReqNo').val(obj[0]["ReqNo"]);
                $('#ddlPayMode').val(obj[0]["RateMode"]).trigger('change');
                $('#txtTaxPer').val(obj[0]["TaxPercent"]);
                $('#txtTaxValue').val(obj[0]["TaxAmount"]);
               // $('#ddlBApprove').val(obj[0]["ToApprove"]);
                ToAppEmpid = obj[0]["ToApprove"];
                LoadEditEmployeeDDL();
                $('#txtcheNo').val(obj[0]["chequeno"]);
                $('#txtAdvamt').val(obj[0]["advance"]);
                $('#ddlBCurrency').val(obj[0]["currencyid"]).trigger('change');
                $('#txtExchange').val(obj[0]["exchange_rate"]);
                $('#txtRemark').val(obj[0]["remarks"]);
                var DType = obj[0]["Unit_Supplier_Self"];
                ELorI = obj[0]["LocalImport"];
                var SuppId = obj[0]["SupplierId"];
                var CheckCount = obj[0]["CPDetId"];
                var Approve = obj[0]["IsApproved"];

                if (Approve == "Y") {
                    $("#optapp").prop("checked", true);
                    $("#optwith").prop("checked", false);
                } else if (Approve == "H") {
                    $("#optapp").prop("checked", false);
                    $("#optwith").prop("checked", true);
                }


               
                if (DType == "F") {
                    LoadEditFDes(SuppId);
                    $('#OptSelf').prop('checked', true);
                    editmasunitstore = obj[0]["Unit_Supplier"];
                } else if (DType == "U") {
                    $('#OptUnit').prop('checked', true);
                    editmasunitstore = obj[0]["Unit_Supplier"];
                    LoadEditFDes(SuppId);
                } else if (DType == "S") {

                   // LoadEditSDes(SuppId);
                } else if (DType == "T") {
                   // LoadEditTDes(SuppId);
                    $('#OptSup').prop('checked', true);
                    editmasunitstore = obj[0]["Unit_Supplier"];
                }
                if (DType == "S") {
                    $('#OptStore').prop('checked', true);
                    editmasunitstore = obj[0]["Unit_Supplier"];
                    LoadEmployeeStoreunit();

                }
                else {
                    LoadLocAdd();
                }

                LoadLocationEdit();
                if (Mode == 1) {
                    if (OrderType != "G") {
                        LoadOrderEditSaveDetails(POMId);
                    }

                    if (OrderType == "G") {
                        LoadOrderEditSaveDetails(POMId);
                    }
                    LoadItemDetailsEdit(POMId, OrderType);
                    LoadTermConditionDetailsEdit(POMId);
                    LoadOrderEditAddLessDetails(POMId);

                    if (CheckCount > 0 && PurApp == undefined) {
                        var msg = 'GRN are made for this Entry,Cannot Update the Purchase Order..';
                        var flg = 4;
                        AlartMessage(msg, flg);
                        //alert("Grn are made for this Entry,Cannot Update the Po..");
                        $("#Update").attr('disabled', true);
                        $('#Add').hide();
                        return true;

                    }
                    if (Approve == 'Y' && PurApp == undefined) {
                        var msg = 'This Purchase order is already approved...';
                        var flg = 4;
                        AlartMessage(msg, flg);
                        debugger;
                        //alert("This Po is already approved...");
                        $("#Update").attr('disabled', true);
                        $('#Add').hide();
                        return true;
                    }
                }
                if (Mode == 2) {
                    if (OrderType != "G") {
                        LoadOrderEditSaveDetails(POMId);
                    }
                    if (OrderType == "G") {
                        LoadOrderEditSaveDetails(POMId);
                    }
                    LoadItemDetailsEdit(POMId, OrderType);
                    LoadTermConditionDetailsEdit(POMId);
                    LoadOrderEditAddLessDetails(POMId);
                    if (CheckCount > 0 && PurApp == undefined) {

                        var msg = 'GRN are made for this Entry,Cannot Delete the Purchase Order..';
                        var flg = 4;
                        AlartMessage(msg, flg);
                       // alert("Grn are made for this Entry,Cannot Delete the Po..");
                        $("#Add").hide();
                        $("#Update").hide();
                        $("#Delete").attr('disabled', true);
                        return true;

                    }
                    if (Approve == 'Y' && PurApp == undefined) {
                        var msg = 'This Purchase Order is already approved...';
                        var flg = 4;
                        AlartMessage(msg, flg);

                       // alert("This Po is already approved...");
                        $("#Add").hide();
                        $("#Update").hide();
                        $("#Delete").attr('disabled', true);
                        return true;
                    }
                }
                if (PurApp == 'PENDING') {
                    $("#Add").hide();
                    $("#Update").hide();
                    $("#Approve").show();
                    $("#Revert").hide();
                }
                else if (PurApp == 'APPROVED') {
                    $("#Add").hide();
                    $("#Update").hide();
                    $("#Approve").hide();
                    $("#Revert").show();
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

function LoadEditFDes(SuppId) {
    debugger;
    $.ajax({
        url: "/CompanyUnit/GetbyID/" + SuppId,
        typr: "GET",

        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                $('#txtLocAdd').val(obj.Address1 + "," + obj.Address2 + "," + obj.Address3);

            }
        }

    });
}
function LoadBCurrency() {
    debugger;
    var CurrId = $('#ddlBCurrency').val();
    $.ajax({
        url: "/Currency/GetbyID/" + CurrId,
        typr: "GET",
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                $('#txtExchange').val(obj.Exchangerate);
                CurrDecimal = obj.Decimalplace;

            }
        }

    });
    return true;
}
function LoadEditUDes(SuppId) {
    debugger;
    $.ajax({
        url: "/CompanyUnit/GetbyID/" + SuppId,
        typr: "GET",

        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                $('#txtLocAdd').val(obj.Address1 + "," + obj.Address2 + "," + obj.Address3);

            }
        }

    });
}
function LoadEditFDes(SuppId) {
    debugger;
    $.ajax({
        url: "/Supplier/GetbyId/" + SuppId,
        typr: "GET",

        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                $('#txtLocAdd').val(obj.Address1 + "," + obj.Address2 + "," + obj.Address3);

            }
        }

    });
}

function LoadItemDetailsEdit(POMId, OrderType) {
    debugger;

    $.ajax({
        url: "/PurchaseOrderEntry/LoadItemEditDetails",
        data: JSON.stringify({ pur_ord_id: POMId, Purchase_Type: OrderType, LocalImport: ELorI, PurIndType: PurAgnInd }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            ItemList = result;
            for (var r = 0; r < ItemList.length; r++) {
                ItemList[r].Reqdate = ItemList[r].Reqdate == null ? Reqdate : moment(ItemList[r].Reqdate).format('DD/MM/YYYY');
            }
            loadItemTable(ItemList);

            //ChkBudApp();

            var ItmId = ItemList[0].ItemID;
            var ClrId = ItemList[0].ColorID;
            var SzId = ItemList[0].SizeID;
            var PUId = ItemList[0].PurUomId;
            var OQty = ItemList[0].quantity;

            if (OrderType != "G") {
                LoadEditOrderDetails(POMId, ItmId, ClrId, SzId, PUId, OQty);
            }
            if (OrderType == "G") {
                LoadEditOrderDetails(POMId, ItmId, ClrId, SzId, PUId, OQty);
            }
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
    Reqdate = Fdatestring;
    var day = new Date(),
        year = ((day.getMonth() - 2) < 0) ? (day.getFullYear() - 1) : day.getFullYear(),
        month = ((day.getMonth() - 2) < 0) ? (12 + (day.getMonth() - 2)) : (day.getMonth() + 1),
        date = month + '/' + day.getDate() + '/' + year;


    $('#txtEntryDate').val(Fdatestring);
    $('#txtBReqDate').val(Fdatestring);
    $('#txtGReqDate').val(Fdatestring);

}

var table, column, compId, Docum;

function GenerateNumber(table, column, compId, Docum) {

    debugger;

    if (OrderType == "B" && PurType == "L") {

        table = "pur_ord_mas",
        column = "pur_ord_no",
        compId = $('#ddlCompany').val(),
        Docum = 'PURCHASE ORDER'
    }
    else if (OrderType == "B" && PurType == "Y") {

        table = "pur_ord_mas",
        column = "pur_ord_no",
        compId = $('#ddlCompany').val(),
        Docum = 'PURCHASE ORDER - YARN'
    }
    else if (OrderType == "B" && PurType == "A") {

        table = "pur_ord_mas",
        column = "pur_ord_no",
        compId = $('#ddlCompany').val(),
        Docum = 'PURCHASE ORDER - ACCESSORY'
    }
    if (OrderType == "S" && PurType == "L") {

        table = "pur_ord_mas",
        column = "pur_ord_no",
        compId = $('#ddlCompany').val(),
        Docum = 'PURCHASE ORDER'
    }
    else if (OrderType == "S" && PurType == "Y") {

        table = "pur_ord_mas",
        column = "pur_ord_no",
        compId = $('#ddlCompany').val(),
        Docum = 'SAMPLE PURCHASE ORDER - YARN'
    }
    else if (OrderType == "S" && PurType == "A") {

        table = "pur_ord_mas",
        column = "pur_ord_no",
        compId = $('#ddlCompany').val(),
        Docum = 'SAMPLE PURCHASE ORDER - ACCESSORY'
    }
    if ((OrderType == "G" || OrderType == "I") && PurType == "L") {

        table = "pur_ord_mas",
        column = "pur_ord_no",
        compId = CmpId,
        Docum = 'PURCHASE ORDER GENERAL'
    }
    else if ((OrderType == "G" || OrderType == "I") && PurType == "Y") {

        table = "pur_ord_mas",
        column = "pur_ord_no",
        compId = CmpId,
        Docum = 'PURCHASE ORDER GENERAL - YARN'
    }
    else if ((OrderType == "G" || OrderType == "I") && PurType == "A") {

        table = "pur_ord_mas",
        column = "pur_ord_no",
        compId = CmpId,
        Docum = 'PURCHASE ORDER GENERAL - ACCESSORY'
    }
    else if (OrderType == "R" && PurType == "L") {

        table = "pur_ord_mas",
        column = "pur_ord_no",
        compId = CmpId,
        Docum = 'SPECIAL REQ PURCHASE ORDER'
    }
    else if (OrderType == "R" && PurType == "Y") {

        table = "pur_ord_mas",
        column = "pur_ord_no",
        compId = CmpId,
        Docum = 'SPECIAL REQ PURCHASE ORDER - YARN'
    }
    else if (OrderType == "R" && PurType == "A") {

        table = "pur_ord_mas",
        column = "pur_ord_no",
        compId = CmpId,
        Docum = 'SPECIAL REQ PURCHASE ORDER - ACCESSORY'
    }
    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: CmpId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $('#txtPoNo').val(result.Value);
        }
    });
}
function LoadItemDetails(SRowId) {
    debugger;

    if (OrderType != 'G') {
        $.ajax({
            url: "/PurchaseOrderEntry/LoadItemDetails",
            data: JSON.stringify({ StyleRowId: SRowId, OType: OrderType, Purchase_ItemType: PurType, LocalImport: LorI, IGId: Ig, PurIndType: PurAgnInd, supplierid: Suppid,GetUser:UserName }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {

                ItemList = result;

                if (LorI == 'I') {
                    var itmlist = [];
                    itmlist = $.grep(ItemList, function (v) {
                        return (v.currencyid == Currid );
                    });
                    ItemList = itmlist;
                }

                for (var r = 0; r < ItemList.length; r++) {
                    ItemList[r].Reqdate = moment(ItemList[r].Reqdate).format('DD/MM/YYYY');
                }
                if (ItemList[0]["currencyid"] > 0) {
                    $('#ddlBCurrency').val(ItemList[0]["currencyid"]).trigger('change');
                } else {
                    $('#ddlBCurrency').val(ItemList[0]["DCurrencyid"]).trigger('change');
                }
                var ret = LoadBCurrency();

                loadItemTable(ItemList);

                //ChkBudApp();
            },
            failure: function (errMsg) {
                alert(errMsg);
            }
        });
    }
}

function ChkBudApp() {

    $('input[id=txtRate]').each(function () {
        debugger;
        var row = $(this).closest('tr');
        if ((ChkBudApp == "Y") || CostAppSamPurCheck=="Y") {
            row.find('#txtRate').prop('disabled', true);
        }
    });

}
function loadItemTable(ItemList) {

    $('#tblEntryItemdetails').DataTable().destroy();
    debugger;

    var table = $('#tblEntryItemdetails').DataTable({
        // "order": [[1, "asc"]],
        data: ItemList,
        scrollY: 300,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        "bSort": false,
        "rowCallback": function (row, data, index) {
            if (OrderType == 'G') {
                var tbl = $('#tblEntryItemdetails');
                tbl.DataTable().column(26).visible(true);
                tbl.DataTable().column(25).visible(true);
            } else {
                var tbl = $('#tblEntryItemdetails');
                tbl.DataTable().column(26).visible(false);
                tbl.DataTable().column(25).visible(false);
            }

        },


        columns: [

             { title: "PurOrdDetId", data: "Pur_Ord_DetId", "visible": false },
            { title: "SNo", data: "SNo" },
            { title: "Item", data: "Item" },
            { title: "Color", data: "Color" },
            { title: "Size", data: "Size" },
            { title: "Pur Unit", data: "Unit", "visible": false },
            { title: "Ord Bal", data: "OrdBal" },
            {
                title: "Qty", data: "quantity",
                render: function (data) {
                    return '<input type="text" id="txtQty" class="calcAmt form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                },
            },
            {
                title: "Sec Qty", data: "Sec_Qty",
                render: function (data) {

                    return '<input type="text" id="txtSQty" class="txtSQty form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';

                },
            },
             { title: "AppRate", data: "AppRate", "visible": false },
              {
                  title: "Rate", data: "Rate",
                  render: function (data) {
                      //if (ChkBudApp == "Y") {
                      //  return '<input type="text" id="txtRate" class="txtRate form-control" disabled style="width: 50px;text-align: center;"  value=' + data + '>';
                      //} else {
                      return '<input type="text" id="txtRate" class="txtRate form-control" style="width: 50px;text-align: center;"  value=' + data + '>';
                      // }
                  },
              },
             {
                 title: "Amt", data: "Amt",
                 render: function (data) {

                     return '<input type="text" id="txtAmnt" class="txtAmnt form-control" style="width: 50px;text-align: center;" disabled value=' + data + '>';

                 },
             },
             { title: "Itemid", data: "ItemID", "visible": false },
             { title: "Colorid", data: "ColorID", "visible": false },
             { title: "Sizeid", data: "SizeID", "visible": false },
             { title: "PurUomId", data: "PurUomId", "visible": false },
             { title: "BaseUnitId", data: "BaseUnitId", "visible": false },

             {
                 title: "Cgst", data: "CGST",
                 render: function (data) {
                     if (data == 0) {
                         return '<input type="text" id="txtCGST" class="txtCGST form-control" disabled style="width: 50px;text-align: center;"  value=' + data + '>';
                     }
                     else {
                         return '<input type="text" id="txtCGST" class="txtCGST form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';

                     }

                 },
             },
             {
                 title: "Sgst", data: "SGST",
                 render: function (data) {
                     if (data == 0) {
                         return '<input type="text" id="txtSGST" class="txtSGST form-control" disabled style="width: 50px;text-align: center;"  value=' + data + '>';
                     }
                     else {
                         return '<input type="text" id="txtSGST" class="txtSGST form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';

                     }
                 },
             },
             {
                 title: "Igst", data: "IGST",
                 render: function (data) {
                     if (data == 0) {
                         return '<input type="text" id="txtIGST" class="txtIGST form-control"  disabled style="width: 50px;text-align: center;"  value=' + data + '>';
                     }
                     else {
                         return '<input type="text" id="txtIGST" class="txtIGST form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';

                     }
                 },
             },
             { title: "HCode", data: "HSNCODE" },
             {
                 title: "Cgst Amt", data: "CGSTAMt",
                 render: function (data) {

                     return '<input type="label" id="txtcgstAmnt" class="txtcgstAmnt form-control" style="width: 50px;text-align: center;" disabled value=' + data + '>';

                 },
             },
             {
                 title: "Sgst Amt", data: "SGSTAMT",
                 render: function (data) {

                     return '<input type="label" id="txtsgstAmnt" class="txtsgstAmnt form-control" style="width: 50px;text-align: center;" disabled value=' + data + '>';

                 },
             },
              {
                  title: "Igst Amt", data: "IGSTAMT",
                  render: function (data) {

                      return '<input type="label" id="txtigstAmnt" class="txtigstAmnt form-control" style="width: 50px;text-align: center;" disabled value=' + data + '>';

                  },
              },
               {
                   title: "ReqDate", data: "Reqdate",
                   render: function (data) {

                       return '<input type="text" id="txtReqdate" class="form-control txtReqdate" style="width: 50px;text-align: center;" value=' + data + '>';

                   },
               },
              {
                  title: "Remarks", data: "ItemRemarks",
                  render: function (data) {
                      return '<input type="text" id="txtremarks" class="remarks form-control"  style="width: 150px;text-align: left;"  value=' + data + ' >';
                  },
              },
                 {
                     title: "ACTION", data: "Pur_Ord_DetId",
                     render: function (data) {
                         return '<div style="display:inline-flex;"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnitemedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnItemremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button> </div>'
                         //if (OrderType == 'G' && Mode == 0) {
                         //    return '<div style="display:inline-flex;"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnitemedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnItemremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="View Item" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" id="btnGenItemview" class="btnGenItemview btn btn-round btn-info"> <i class="fa fa-eye"></i> </button></div>'
                         //} else {
                         //    return '<div style="display:inline-flex;"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnitemedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnItemremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button> </div>'
                         //}
                     }
                 },
                  
        ]
    });
    var totalamnt = 0;
    for (var e = 0; e < ItemList.length; e++) {
        var amount = parseFloat(ItemList[e].Amt) + parseFloat(ItemList[e].CGSTAMt) + parseFloat(ItemList[e].SGSTAMT) + parseFloat(ItemList[e].IGSTAMT);
        totalamnt = totalamnt + parseFloat(amount);

    }


    $('#txttotal').val(totalamnt.toFixed(CurrDecimal));
    $('#txtGrossAmount').val(totalamnt.toFixed(CurrDecimal));
    $('#txtBTotAmt').val(totalamnt.toFixed(CurrDecimal));
    var totalqt = 0;
    for (var e = 0; e < ItemList.length; e++) {
        var amount = ItemList[e].quantity;
        totalqt = totalqt + parseFloat(amount);

    }


    $('#txtqnty').val(totalqt.toFixed(3));
    var GrossAmt = $('#txttotal').val();
    var ANAmt = $('#txtAccAmt').val();
    if (ANAmt == '') {
        ANAmt = 0;
    }
    var FNAmt = parseFloat(GrossAmt) + parseFloat(ANAmt);

    $('#txtNetAmt').val(parseFloat(FNAmt).toFixed(CurrDecimal));

    ItemRemarks();

    var table = $('#tblEntryItemdetails').DataTable();
    $("#tblEntryItemdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblEntryItemdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });


  
}

function ItemRemarks() {
    debugger;
    var table = $('#tblEntryItemdetails').DataTable();
    var ecdata = table.rows().data();
    $('input[id=txtremarks]').each(function (ig) {
        var row = $(this).closest('tr');
        for (var h = 0; h < ItemList.length; h++) {

            if (ecdata[ig].ItemID == ItemList[h].ItemID && ecdata[ig].ColorID == ItemList[h].ColorID && ecdata[ig].SizeID == ItemList[h].SizeID && ecdata[ig].Pur_Ord_DetId == ItemList[h].Pur_Ord_DetId) {
                var rem = ItemList[h].ItemRemarks;
                row.find('#txtremarks').val(rem);
            }
        }

    });
}


function calcsepquan(value) {
    debugger;
    ind;

    var currentrowoftcpi = OrderList.slice(ind);
    var pid = currentrowoftcpi[0].BuyODetId;
    var itmid = currentrowoftcpi[0].ItemID;
    var colorid = currentrowoftcpi[0].ColorID;
    var sizeid = currentrowoftcpi[0].SizeID;
    // var uomid = currentrowoftcpi[0].OUomid;
    var balq = currentrowoftcpi[0].OBQty;



    $.each(OrderListSave, function () {
        if (this.BuyODetId == pid) {


            if (balq >= value) {
                this.quantity = value;
            }
            else {
                var t = value - balq;
                this.quantity = balq;
            }

        }
    });

    $.each(OrderList, function () {
        if (this.BuyODetId == pid) {

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

    for (var e = 0; e < OrderList.length; e++) {
        var amount = OrderList[e].quantity;
        totalamnt = totalamnt + parseFloat(amount);
    }
    $.each(ItemList, function () {
        if (this.ItemID == itmid && this.SizeID == sizeid && this.ColorID == colorid) {
            //this.quantity = 0;

            this.quantity = totalamnt;
            //}


        }
    });


    loadOrderTableSave(OrderListSave);
    loadOrderTable(OrderList);
    loadItemTable(ItemList);
}


function calcAmt(Val) {

    debugger;

    index;

    var currentrowoftcpi = ItemList.slice(index);
    var CSno = currentrowoftcpi[0].SNo;

    var IQty = 0;
    if (Val == 0) {
        IQty = 0;
    }
    else {
        IQty = Val;
    }


    var field = Val;
    if (!field.match(/^[\-\+]?[\d\,]*\.?[\d]*$/)) {

        $.each(ItemList, function () {
            if (this.SNo == CSno) {
                this.quantity = 0;
            }
        });
        loadItemTable(ItemList);
        return false;
    }

    var CSno = currentrowoftcpi[0].SNo;
    var Rate = currentrowoftcpi[0].Rate;
    var CGST = currentrowoftcpi[0].CGST;
    var SGST = currentrowoftcpi[0].SGST;
    var OrdBalQty = currentrowoftcpi[0].OrdBal;
    var IId = currentrowoftcpi[0].ItemID;
    var CId = currentrowoftcpi[0].ColorID;
    var SId = currentrowoftcpi[0].SizeID;
    var PUId = currentrowoftcpi[0].PurUomId;
    var InDetId = currentrowoftcpi[0].IndDetId;

    var CGSTA = Rate * Val * CGST / 100;
    var SGSTA = Rate * Val * SGST / 100;

    var ratecal = Val;
    var res = ratecal * Rate;

    if (OrderType == "B" || OrderType == "G") {

        if (ratecal > OrdBalQty) {
            var msg = 'Order Quantity Should Not Greater then Order Balance Quantity..';
            var flg = 4;
            AlartMessage(msg, flg);

            //alert("OrderQty Should Not Greater then OrderBalanceQty..");


            finalresult = res.toFixed(2);
            $.each(ItemList, function () {
                if (this.SNo == CSno) {
                    this.quantity = 0;

                }
            });

            loadItemTable(ItemList);
            return true;
        }
    }

    finalresult = res.toFixed(2);
    $.each(ItemList, function () {
        if (this.SNo == CSno) {
            this.quantity = ratecal;
            this.Amt = parseFloat(res).toFixed(CurrDecimal);
            this.CGSTAMt = CGSTA;
            this.SGSTAMT = SGSTA;
        }
    });


    var totalamnt = 0;
    for (var e = 0; e < ItemList.length; e++) {
        var amount = parseFloat(ItemList[e].Amt) + parseFloat(ItemList[e].CGSTAMt) + parseFloat(ItemList[e].SGSTAMT) + parseFloat(ItemList[e].IGSTAMT);
        totalamnt = totalamnt + parseFloat(amount);

    }


    loadItemTable(ItemList);

    //ChkBudApp();


    //if (Mode == 1) {
    //    LoadEditOrderDetails(POMId, IId, CId, SId, PUId, ratecal);
    //}

    ///Load Save Order Table
    finalresult = res.toFixed(2);
    //$.each(OrderListSave, function () {
    //    if (this.ItemID == IId && this.ColorID == CId && this.SizeID == SId && this.PurUomId == PUId) {
    //        this.quantity = Val;

    //    }
    //});

    //loadOrderTableSave(OrderListSave);


    var pid = [];
    var bal = [];
    var qty = [];

    //if (InDetId > 0) {
    //    for (var t = 0; t < OrderListSave.length; t++) {
    //        if (OrderListSave[t].ItemID == IId && OrderListSave[t].ColorID == CId && OrderListSave[t].SizeID == SId && OrderListSave[t].IndBuyJobId == InDetId) {
    //            pid.push(OrderListSave[t].BuyODetId);
    //            bal.push(OrderListSave[t].OBQty);
    //            qty.push(OrderListSave[t].quantity);
    //        }
    //    }
    //}
    if (OrderType == "G" || OrderType == "I") {
        for (var t = 0; t < OrderListSave.length; t++) {
            if (OrderListSave[t].ItemID == IId && OrderListSave[t].ColorID == CId && OrderListSave[t].SizeID == SId) {
                pid.push(OrderListSave[t].IndBuyJobId);
                bal.push(OrderListSave[t].OBQty);
                qty.push(OrderListSave[t].quantity);
            }
        }
    } else {
        for (var t = 0; t < OrderListSave.length; t++) {
            if (OrderListSave[t].ItemID == IId && OrderListSave[t].ColorID == CId && OrderListSave[t].SizeID == SId) {
                pid.push(OrderListSave[t].BuyODetId);
                bal.push(OrderListSave[t].OBQty);
                qty.push(OrderListSave[t].quantity);
            }
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

    if (OrderType == "G" || OrderType == "I") {
        for (var u = 0; u < OrderListSave.length; u++) {
            for (var r = 0; r < pid.length; r++) {
                if (OrderListSave[u].IndBuyJobId == pid[r]) {
                    OrderListSave[u].quantity = qty[r];
                }
            }
        }

        loadOrderTableSave(OrderListSave);


        for (var u = 0; u < OrderList.length; u++) {
            for (var r = 0; r < pid.length; r++) {
                if (OrderList[u].IndBuyJobId == pid[r]) {
                    OrderList[u].quantity = qty[r];
                }
            }
        }
    } else {
        for (var u = 0; u < OrderListSave.length; u++) {
            for (var r = 0; r < pid.length; r++) {
                if (OrderListSave[u].BuyODetId == pid[r]) {
                    OrderListSave[u].quantity = qty[r];
                }
            }
        }

        loadOrderTableSave(OrderListSave);


        for (var u = 0; u < OrderList.length; u++) {
            for (var r = 0; r < pid.length; r++) {
                if (OrderList[u].BuyODetId == pid[r]) {
                    OrderList[u].quantity = qty[r];
                }
            }
        }
    }

    if (Mode == 0 || Mode == 1) {

   
            var colorempty = [];
            colorempty = OrderListSave;

            colorempty = $.grep(colorempty, function (v) {
                return (v.ItemID === IId && v.ColorID === CId && v.SizeID === SId);
            });

            loadOrderTable(colorempty);

            OrderList = [];
            OrderList = colorempty;
        
    }
    ///



    $('#txttotal').val(totalamnt.toFixed(CurrDecimal));
    $('#txtBTotAmt').val(totalamnt.toFixed(CurrDecimal));
    $('#txtGrossAmount').val(totalamnt.toFixed(CurrDecimal));

   var  GrossAmt = $('#txttotal').val();
   var ANAmt = $('#txtAccAmt').val();
   if (ANAmt == '') {
       ANAmt = 0;
   }
    var FNAmt = parseFloat(GrossAmt) + parseFloat(ANAmt);

    $('#txtNetAmt').val(parseFloat(FNAmt).toFixed(CurrDecimal));

    //TAmt = val(totalamnt.toFixed(3));
    var totalqt = 0;
    for (var e = 0; e < ItemList.length; e++) {
        var amount = ItemList[e].quantity;
        totalqt = totalqt + parseFloat(amount);

    }
    $('#txtqnty').val(totalqt.toFixed(3));


}
function LoadOrderDetails(SRowId, ItmId, ClrId, SizeId, PUomId, OQty) {
    debugger;

    $.ajax({
        url: "/PurchaseOrderEntry/LoadOrderContDetails",
        data: JSON.stringify({ StyleRowId: SRowId, ItemID: ItmId, ColorID: ClrId, SizeID: SizeId, PurUomId: PUomId, quantity: OQty, LocalImport: LorI, PurIndType: PurAgnInd }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            OrderList = result;
            loadOrderTable(OrderList);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadEditOrderDetails(PurOrdId, ItmId, ClrId, SizeId, PUomId, OQty) {
    debugger;

    $.ajax({
        url: "/PurchaseOrderEntry/LoadOrderEditContDetails",
        data: JSON.stringify({ Pur_ord_id: PurOrdId, ItemID: ItmId, ColorID: ClrId, SizeID: SizeId, PurUomId: PUomId, quantity: OQty, OType: OrderType, LocalImport: ELorI, PurIndType: PurAgnInd }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            OrderList = result;
            loadOrderTable(OrderList);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}


function LoadOrderSaveDetails(SRowId) {
    debugger;

    var ItmId = 0;
    var ClrId = 0;
    var SizeId = 0;
    var PUomId = 0;
    var OQty = 0;

    $.ajax({
        url: "/PurchaseOrderEntry/LoadOrderContDetails",
        data: JSON.stringify({ StyleRowId: SRowId, ItemID: ItmId, ColorID: ClrId, SizeID: SizeId, PurUomId: PUomId, quantity: OQty, OType: OrderType, LocalImport: LorI, PurIndType: PurAgnInd }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            OrderListSave = result;
            loadOrderTableSave(OrderListSave);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadOrderEditSaveDetails(POMId) {
    debugger;

    var ItmId = 0;
    var ClrId = 0;
    var SizeId = 0;
    var PUomId = 0;
    var OQty = 0;

    $.ajax({
        url: "/PurchaseOrderEntry/LoadOrderEditContDetails",
        data: JSON.stringify({ pur_ord_id: POMId, ItemID: ItmId, ColorID: ClrId, SizeID: SizeId, PurUomId: PUomId, quantity: OQty, OType: OrderType, LocalImport: ELorI, PurIndType: PurAgnInd }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            OrderListSave = result;
            loadOrderTableSave(OrderListSave);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function loadOrderTable(OrderList) {

    $('#tblEntryOrderdetails').DataTable().destroy();
    debugger;

    var table = $('#tblEntryOrderdetails').DataTable({
        data: OrderList,
        //"rowCallback": function (row, data, index) {
        //    if (OrderType == 'B' && Mode == 0) {
        //        var tbl = $('#tblEntryOrderdetails');
        //        tbl.DataTable().column(14).visible(true);
        //    } else {
        //        var tbl = $('#tblEntryOrderdetails');
        //        tbl.DataTable().column(14).visible(false);
        //    }

        //},
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

            { title: "PurOrdJobId", data: "Pur_Ord_BuyJobid", "visible": false },
            { title: "Order No", data: "OrderNo" },
            { title: "Ref No", data: "ORefNo" },
            { title: "Style", data: "OStyle" },
            { title: "Bom Qty", data: "BomQty" },
            { title: "Ord Bal", data: "OBQty" },
          {
              title: "Order Qty", data: "quantity",
              render: function (data) {

                  return '<input type="text" id="txtOQty" class="calcsepquan form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

              },
          },
             { title: "Itemid", data: "ItemID", "visible": false },
             { title: "Colorid", data: "ColorID", "visible": false },
             { title: "Sizeid", data: "SizeID", "visible": false },
             { title: "PurUomId", data: "PurUomId", "visible": false },
             { title: "StyleId", data: "Styleid", "visible": false },
           { title: "Buy_Ord_BOMDetid", data: "BuyODetId", "visible": false },
            {
                title: "PlanItemRemarks", data: "PlanItmRmks",
                render: function (data) {

                    return '<input type="text" id="txtItmRmks" class="txtplanremks form-control"  style="width: 150px;text-align: center;"  value=' + data + ' >';

                },
            },
            //{
            //    title: "Action", "mDataProp": null,
            //    "sDefaultContent": '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="View Item" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" id="btnItemview" class="btnItemview btn btn-round btn-info"> <i class="fa fa-eye"></i> </button></div>'
            //},
        ]
    });

    PlanRemarks();
}


function PlanRemarks() {
    debugger;
    var table = $('#tblEntryOrderdetails').DataTable();
    var ecdata = table.rows().data();
    $('input[id=txtItmRmks]').each(function (ig) {
        var row = $(this).closest('tr');
        for (var h = 0; h < OrderList.length; h++) {

            if (ecdata[ig].ItemID == OrderList[h].ItemID && ecdata[ig].ColorID == OrderList[h].ColorID && ecdata[ig].SizeID == OrderList[h].SizeID && ecdata[ig].Pur_Ord_BuyJobid == OrderList[h].Pur_Ord_BuyJobid) {
                var rem = OrderList[h].PlanItmRmks;
                row.find('#txtItmRmks').val(rem);
            }
        }

    });
}





function loadOrderTableSave(OrderListSave) {
    debugger;
    $('#tblEntryOrderdetailsSave').DataTable().destroy();

    var table = $('#tblEntryOrderdetailsSave').DataTable({
        data: OrderListSave,
        columns: [

            { title: "PurOrdJobId", data: "Pur_Ord_BuyJobid" },
            { title: "Order No", data: "OrderNo" },
            { title: "Ref No", data: "ORefNo" },
            { title: "Style", data: "OStyle" },
            { title: "Bom Qty", data: "BomQty" },
            { title: "Ord Bal", data: "OBQty" },
            { title: "Order Qty", data: "quantity" },
             { title: "Itemid", data: "ItemID" },
             { title: "Colorid", data: "ColorID" },
             { title: "Sizeid", data: "SizeID" },
             { title: "PurUomId", data: "PurUomId" },
             { title: "StyleId", data: "Styleid" },
            { title: "Buy_Ord_BOMDetid", data: "BuyODetId" },
             {
                 title: "PlanItemRemarks", data: "PlanItmRmks"
             }
        ]
    });
}




$(document).ready(function () {

    $('#tblEntryItemdetails').on('click', 'tr', function (e) {
        debugger;

        var table = $('#tblEntryItemdetails').DataTable();
        var row = $(this).closest('tr');
        var data = $('#tblEntryItemdetails').dataTable().fnGetData(row);


        var StRId = data.StyleRowId;//table.row($(this).parents('tr')).data()["StyleRowId"];
        var ItmId = data.ItemID;//table.row($(this).parents('tr')).data()["ItemID"];
        var ClrId = data.ColorID;//table.row($(this).parents('tr')).data()["ColorID"];
        var SzId = data.SizeID;//table.row($(this).parents('tr')).data()["SizeID"];
        var PUId = data.PurUomId;//table.row($(this).parents('tr')).data()["PurUomId"];
        var InDetId = data.IndDetId;

        Stkitemid = ItmId;
        Stkcolorid = ClrId;
        StkSizeid = SzId;

        COrder = '';
        CStyle = 0;
      

           // if (OrderType != "G") {
                if (Mode == 0 || Mode == 1) {


                    var colorempty = [];
                    colorempty = OrderListSave;

                    colorempty = $.grep(colorempty, function (v) {
                        return (v.ItemID === ItmId && v.ColorID === ClrId && v.SizeID === SzId && v.PurUomId === PUId);
                    });

                    loadOrderTable(colorempty);

                }
          //  }
        
    });
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
function LoadNetAmount() {
    var Per = $('#txtPer').val();
    var GrossAmt = $('#txtGrossAmount').val();
    var Amt = (Per * GrossAmt) / 100;
    $('#txtAmount').val(parseFloat(Amt).toFixed(CurrDecimal));



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

        var itmamt = $('#txtAmount').val();
        itmamt = parseFloat(itmamt).toFixed(CurrDecimal);


        if (isAllValid) {


            debugger;
            var AcListObj = {
                Addless: $("#ddlAcc option:selected").text(),
                Addlessid: $('#ddlAcc').val(),
                PlusOrMinus: $('#txtPorMins').val(),
                Percentage: $('#txtPer').val(),
                // Amount: $('#txtAmount').val(),
                Amount: itmamt,
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
            $('#txtNetAmt').val(totalAccamnt.toFixed(CurrDecimal));

            var GAmt = $('#txtGrossAmount').val();
            var NAmt = $('#txtNetAmt').val();
          
            var FNAmt = parseFloat(GAmt) + parseFloat(NAmt);

            $('#txtNetAmt').val(parseFloat(FNAmt).toFixed(CurrDecimal));
            $('#txtBTotAmt').val(parseFloat(FNAmt).toFixed(CurrDecimal));

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

        var itmamt = 0;
        itmamt = $("#txtAmount").val();
        itmamt = parseFloat(itmamt).toFixed(CurrDecimal);

        currentrowsel[0]['Addlessid'] = $("#ddlAcc").val();
        currentrowsel[0]['Addless'] = $("#ddlAcc option:selected").text();
        currentrowsel[0]['PlusOrMinus'] = $("#txtPorMins").val();
        currentrowsel[0]['Percentage'] = $("#txtPer").val();
        //currentrowsel[0]['Amount'] = $("#txtAmount").val();
        currentrowsel[0]['Amount'] = itmamt;

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

});
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
        "bSort": false,
        columns: [

               { title: "AddlessId", data: "Addlessid", "visible": false },
               { title: "Accounts Head", data: "Addless", },
               { title: "+/-", data: "PlusOrMinus", },
               { title: "Percent", data: "Percentage", },
               { title: "Amount", data: "Amount", },

               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnaccedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button"data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnaccremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button> </div>'

               },

        ]
    });

    var totalamnt = 0;
    for (var e = 0; e < AccList.length; e++) {
        var amount = AccList[e].Amount;
        totalamnt = totalamnt + parseFloat(amount);

    }


    $('#txtAccAmt').val(totalamnt.toFixed(CurrDecimal));
    var AccountAmt = $('#txtAccAmt').val();
    var BAmt = $('#txtBTotAmt').val();
    var GAmt = $('#txtGrossAmount').val();

    if (AccountAmt == '') {
        AccountAmt = 0;
    }

    var NAmt = parseFloat(GAmt) + parseFloat(AccountAmt);
    $('#txtNetAmt').val(parseFloat(NAmt).toFixed(CurrDecimal));


}

function fnClearAccControls() {
    $('#ddlAcc').val('0');
    $('#txtPorMins').val('');
    $('#txtPer').val('');
    $('#txtAmount').val('');
}
/////////////////
function LoadLocation() {
    var LocalType = $('input[name="DType"]:checked').attr('value');
    $('#txtLocAdd').val('');
    if (LocalType == "U") {
        LoadCompanyUnitDDL("#ddlLoc,#ddlBPUnit");
    } else if (LocalType == "F") {
        LoadCompanyUnitDDL("#ddlLoc,#ddlBPUnit");
    } else if (LocalType == "S") {
        LoadEmployeeStoreunit();
    } else if (LocalType == "T") {
        LoadSupplierDDL("#ddlLoc");
    }
}

function LoadLocationEdit() {
    var LocalType = $('input[name="DType"]:checked').attr('value');
    $('#txtLocAdd').val('');
    if (LocalType == "U") {
        LoadCompanyUnitDDL("#ddlLoc,#ddlBPUnit");
        if (editmasunitstore > 0) {
            $('#ddlLoc').val(editmasunitstore).trigger('change');
        }

    } else if (LocalType == "F") {
        LoadCompanyUnitDDL("#ddlLoc,#ddlBPUnit");
        if (editmasunitstore > 0) {
            $('#ddlLoc').val(editmasunitstore).trigger('change');
        }

    } else if (LocalType == "S") {
        LoadEmployeeStoreunit();
    } else if (LocalType == "T") {
        LoadSupplierDDL("#ddlLoc");
        if (editmasunitstore > 0) {
            $('#ddlLoc').val(editmasunitstore).trigger('change');
        }
    }
}

//if (Mode == 0) {
function LoadLocAdd() {


    var LocalType = $('input[name="DType"]:checked').attr('value');

    if (LocalType == "F") {
        $('#txtLocAdd').val("");
        var LocID = $('#ddlLoc').val();

        $.ajax({
            url: "/CompanyUnit/GetbyID/" + LocID,
            typr: "GET",

            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                var obj = result.Value;
                if (result.Status == 'SUCCESS') {

                    $('#txtLocAdd').val(obj.Address1 + "," + obj.Address2 + "," + obj.Address3);

                }
            }

        });
    } else if (LocalType == "U") {
        $('#txtLocAdd').val("");
        var LocID = $('#ddlLoc').val();

        $.ajax({
            url: "/CompanyUnit/GetbyID/" + LocID,
            typr: "GET",

            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                var obj = result.Value;
                if (result.Status == 'SUCCESS') {

                    $('#txtLocAdd').val(obj.Address1 + "," + obj.Address2 + "," + obj.Address3);

                }
            }

        });
    } else if (LocalType == "S") {
        $('#txtLocAdd').val("");
        var LocID = $('#ddlLoc').val();

        $.ajax({
            url: "/StoreUnit/GetbyId/" + LocID,
            typr: "GET",

            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                var obj = result.Value;
                if (result.Status == 'SUCCESS') {

                    $('#txtLocAdd').val('');

                }
            }

        });
    } else if (LocalType == "T") {
        $('#txtLocAdd').val("");
        var LocID = $('#ddlLoc').val();

        $.ajax({
            url: "/Supplier/GetbyId/" + LocID,
            typr: "GET",

            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                var obj = result.Value;
                if (result.Status == 'SUCCESS') {

                    $('#txtLocAdd').val(obj.Address1 + "," + obj.Address2 + "," + obj.Address3);

                }
            }

        });
    }
}
//}
function LoadBillComp() {

    var BillType = $('input[name="Pay"]:checked').attr('value');
    if (BillType == "B") {
        //  LoadBuyerDDL("#ddlBCompany");
        LoadUserCompanyDDL();
    } else if (BillType == "U") {
        LoadCompanyUnitDDL("#ddlBCompany,#ddlBPUnit");
    } else if (BillType == "C") {
        LoadCompanyDDL("#ddlBCompany");
    } else if (BillType == "S") {
        LoadSupplierDDL("#ddlBCompany");
    }
}



function save() {

    debugger;
    var res = validate();
    if (res == false) {
        return false;
    }


    if (LorI == "I") {
        var CurrId = $('#ddlBCurrency').val();
        var Exrate = $('#txtExchange').val();

        if (CurrId == 0) {
            var msg = 'Please select currency..';
            var flg = 4;
            AlartMessage(msg, flg);

            //alert("Please select currency..");
            return true;
        }
        if (Exrate == 0) {
            var msg = 'Please select Excess Rate..';
            var flg = 4;
            AlartMessage(msg, flg);

            //alert("Please select ExRate..");
            return true;
        }

    }

    if (ItemList.length == 0) {
        var msg = 'Please Enter the Item Details..';
        var flg = 4;
        AlartMessage(msg, flg);

        //alert("Please Enter the Item Details..");
        return true;
    }

    var opchk = [];
    for (var y = 0; y < ItemList.length; y++) {
        if (ItemList[y].quantity > 0) {
            opchk.push(ItemList[y]);
        }
    }
    if (opchk.length == 0) {

        var msg = 'Please fill atleast any one Quantity...';
        var flg = 4;
        AlartMessage(msg, flg);
       // alert('Please fill atleast any one qty...');
        return true;
    }

    var opBchk = [];
    for (var y = 0; y < ItemList.length; y++) {
        if (ItemList[y].Rate > 0) {
            opBchk.push(ItemList[y]);
        }
    }
    if (ChkBudApp == "Y" && (OrderType == "B"  || OrderType == "R")) {
        if (opBchk.length == 0) {
            var msg = 'Please Approval Budget Rate Atleast Any One Item...';
            var flg = 4;
            AlartMessage(msg, flg);
            //alert('Please Approval Budget Rate Atleast Any One Item...');
            return true;
        }
    }

    if (CostAppSamPurCheck == "Y" && (OrderType == "S")) {
        if (opBchk.length == 0) {
            var msg = 'Please Approval Budget Rate Atleast Any One Item...';
            var flg = 4;
            AlartMessage(msg, flg);
           // alert('Please Approval Budget Rate Atleast Any One Item...');
            return true;
        }
    }

    if (DPurApp == "Y") {


        var poapp = $("#ddlBApprove option:selected").val();

        if (poapp == undefined) {
            var msg = 'Select Authority for Approval..';
            var flg = 4;
            AlartMessage(msg, flg);
            //alert("Select Authority for Approval..");
            return true;
        }

        if (poapp == '') {
            var msg = 'Select Authority for Approval..';
            var flg = 4;
            AlartMessage(msg, flg);

            //alert("Select Authority for Approval..");
            return true;
        }
    }

    var BillType = $('input[name="Pay"]:checked').attr('value');

    var LocalType = $('input[name="DType"]:checked').attr('value');

    var FType = $('input[name="FType"]:checked').attr('value');
    var Cmode = $('#ddlPayMode').val();
    var CDate = $('#txtBcheDate').val();

    var ChDate = "";

    if (CDate == "") {
        ChDate == null;
    } else {
        ChDate = $('#txtBcheDate').val();
    }

    var CName = "";
    if (Cmode == 0) {
        CName = "";
    }
    else {
        CName = $("#ddlPayMode option:selected").text();
    }

    if (OrderType == "G") {
        //Suppid = $('#ddlGSupplier').val();
        Suppid = Suppid;
    } else {
        Suppid = Suppid;
    }

    if (OrderType == "I") {
        OrderType = "G";
        PurAgnInd = "Y";
    } else {
        OrderType = OrderType;
    }



    if (OrderType == "B" && PurType == "L") {

        table = "pur_ord_mas",
        column = "pur_ord_no",
        compId = $('#ddlCompany').val(),
        Docum = 'PURCHASE ORDER'
    }
    else if (OrderType == "B" && PurType == "Y") {

        table = "pur_ord_mas",
        column = "pur_ord_no",
        compId = $('#ddlCompany').val(),
        Docum = 'PURCHASE ORDER - YARN'
    }
    else if (OrderType == "B" && PurType == "A") {

        table = "pur_ord_mas",
        column = "pur_ord_no",
        compId = $('#ddlCompany').val(),
        Docum = 'PURCHASE ORDER - ACCESSORY'
    }
    if (OrderType == "S" && PurType == "L") {

        table = "pur_ord_mas",
        column = "pur_ord_no",
        compId = $('#ddlCompany').val(),
        Docum = 'PURCHASE ORDER'
    }
    else if (OrderType == "S" && PurType == "Y") {

        table = "pur_ord_mas",
        column = "pur_ord_no",
        compId = $('#ddlCompany').val(),
        Docum = 'SAMPLE PURCHASE ORDER - YARN'
    }
    else if (OrderType == "S" && PurType == "A") {

        table = "pur_ord_mas",
        column = "pur_ord_no",
        compId = $('#ddlCompany').val(),
        Docum = 'SAMPLE PURCHASE ORDER - ACCESSORY'
    }
    if ((OrderType == "G" || OrderType == "I") && PurType == "L") {

        table = "pur_ord_mas",
        column = "pur_ord_no",
        compId = CmpId,
        Docum = 'PURCHASE ORDER GENERAL'
    }
    else if ((OrderType == "G" || OrderType == "I") && PurType == "Y") {

        table = "pur_ord_mas",
        column = "pur_ord_no",
        compId = CmpId,
        Docum = 'PURCHASE ORDER GENERAL - YARN'
    }
    else if ((OrderType == "G" || OrderType == "I") && PurType == "A") {

        table = "pur_ord_mas",
        column = "pur_ord_no",
        compId = CmpId,
        Docum = 'PURCHASE ORDER GENERAL - ACCESSORY'
    }
    else if (OrderType == "R" && PurType == "L") {

        table = "pur_ord_mas",
        column = "pur_ord_no",
        compId = CmpId,
        Docum = 'SPECIAL REQ PURCHASE ORDER'
    }
    else if (OrderType == "R" && PurType == "Y") {

        table = "pur_ord_mas",
        column = "pur_ord_no",
        compId = CmpId,
        Docum = 'SPECIAL REQ PURCHASE ORDER - YARN'
    }
    else if (OrderType == "R" && PurType == "A") {

        table = "pur_ord_mas",
        column = "pur_ord_no",
        compId = CmpId,
        Docum = 'SPECIAL REQ PURCHASE ORDER - ACCESSORY'
    }
    var oldpono = $('#txtPoNo').val();
    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: CmpId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var newpono = result.Value;
            if (oldpono != newpono) {
                var msg = 'Purchase Order Number has been changed...';
                var flg = 3;
                AlartMessage(msg, flg);
               // alert('Pur Ord.No has been changed...');
                $('#txtPoNo').val(result.Value);
            }



            var objPurSubmit = {

                companyid: CmpId,
                pur_ord_no: $('#txtPoNo').val(),
                orddate: $('#txtEntryDate').val(),//new Date($('#txtEntryDate').val()),
                SupplierId: Suppid,
                Purchase_Type: OrderType,
                Purchase_ItemType: PurType,
                remarks: $('#txtRemark').val(),
                ord_commit: "N",
                cancel: 0,
                Unit_Supplier_Self: LocalType,
                Unit_Supplier: $('#ddlLoc').val(),///
                Amount: $('#txtNetAmt').val(),
                ord_close: 0,
                ord_commit: "N",
                cancel: 0,
                Unit_Supplier_Self: LocalType,
                Unit_Supplier: $('#ddlLoc').val(),
                LocalImport: LorI,
                Amend: "N",
                currencyid: $('#ddlBCurrency').val(),
                exchange_rate: $('#txtExchange').val(),
                Paytermid: $('#ddlBPayTerms').val(),
                ReqNo: $('#txtReqNo').val(),
                ReqDate: $('#txtBReqDate').val(),//new Date($('#txtBReqDate').val()),
                BillCompany: $('#ddlBCompany').val(),
                BillCompType: BillType,
                RateMode: $('#ddlPayMode').val(),
                ToApprove: $('#ddlBApprove').val(),
                TaxPercent: $('#txtTaxPer').val(),
                TaxAmount: $('#txtTaxValue').val(),
                WITH_ANNEXURE: "N",
                AddLessType: "G",
                chequeno: $('#txtcheNo').val(),
                chequedate: $('#txtBcheDate').val(),//new Date($('#txtBcheDate').val()),
                advance: $('#txtAdvamt').val(),
                paymode: CName,
                CreatedBy: Guserid,
                AddLessManualOrFormula: FType,
                PurchaseItemDet: ItemList,
                PurchaseODet: OrderListSave,
                PurchaseAccounts: AccList,
                TermsCondDet: termsList,
                PurIndType: PurAgnInd
            };
            debugger;
            $("#Add").attr("disabled", true);
            LoadingSymb();
            $.ajax({
                url: "/PurchaseOrderEntry/Add",
                data: JSON.stringify(objPurSubmit),
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {


                    if (result.Value == true) {
                        AddUserEntryLog('Procurement', 'PurchaseOrder', 'ADD', $('#txtPoNo').val());
                        var Mod = "R"
                        var MasId = 0;
                        //var msg = 'Data Saved Successfully';
                        //var flg = 1;
                        //AlartMessage(msg, flg);
                       // alert("Data Saved Successfully");

                        if (OrderType != "G") {

                            if (PurType == "Y") {
                                var msg = 'Data Saved Successfully';
                                var flg = 1;
                                var mo = 0;
                                var ur = "/PurchaseOrderYarnMain/PurchaseOrderYarnMainIndex?PMasId=" + MasId + "=&OrderType=" + Mod;
                                AlartMessage(msg, flg,mo,ur);
                                //window.location.href = "/PurchaseOrderYarnMain/PurchaseOrderYarnMainIndex?PMasId=" + MasId + "=&OrderType=" + Mod;
                            } else if (PurType == "A") {
                                var msg = 'Data Saved Successfully';
                                var flg = 1;
                                var mo = 0;
                                var ur = "/PurchaseOrderTrimsMain/PurchaseOrderTrimsMainIndex?PMasId=" + MasId + "=&OrderType=" + Mod;
                                AlartMessage(msg, flg, mo, ur);
                                //window.location.href = "/PurchaseOrderTrimsMain/PurchaseOrderTrimsMainIndex?PMasId=" + MasId + "=&OrderType=" + Mod;
                            } else {
                                var msg = 'Data Saved Successfully';
                                var flg = 1;
                                var mo = 0;
                                var ur = "/PurchaseOrderMain/PurchaseOrderMainIndex?PMasId=" + MasId + "=&OrderType=" + Mod;
                                AlartMessage(msg, flg, mo, ur);
                                //window.location.href = "/PurchaseOrderMain/PurchaseOrderMainIndex?PMasId=" + MasId + "=&OrderType=" + Mod;
                            }
                        } else {

                            var msg = 'Data Saved Successfully';
                            var flg = 1;
                            var mo = 0;
                            var ur = "/PurchaseGeneralMain/PurchaseGeneralMainIndex?PMasId=" + MasId + "=&OrderType=" + Mod;
                            AlartMessage(msg, flg, mo, ur);
                            //window.location.href = "/PurchaseGeneralMain/PurchaseGeneralMainIndex?PMasId=" + MasId + "=&OrderType=" + Mod;

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
    });
}
function Close() {

    if (PurApp == 'PENDING' || PurApp == 'APPROVED') {
        var Mod = "R"
        var MasId = 0;
        window.location.href = "/PurchaseOrderApproval/PurchaseOrderApproval?PMasId=" + MasId + "=&OrderType=" + Mod;
    }
    else {
        var Mod = "R"
        var MasId = 0;
        if (OrderType != "G") {

            if (PurType == "Y") {
                window.location.href = "/PurchaseOrderYarnMain/PurchaseOrderYarnMainIndex?PMasId=" + MasId + "=&OrderType=" + Mod;
            } else if (PurType == "A") {
                window.location.href = "/PurchaseOrderTrimsMain/PurchaseOrderTrimsMainIndex?PMasId=" + MasId + "=&OrderType=" + Mod;
            } else {
                window.location.href = "/PurchaseOrderMain/PurchaseOrderMainIndex?PMasId=" + MasId + "=&OrderType=" + Mod;
            }
        } else {

            window.location.href = "/PurchaseGeneralMain/PurchaseGeneralMainIndex?PMasId=" + MasId + "=&OrderType=" + Mod;
        }
    }
}

//Valdidation using jquery
function validate() {
    var isValid = true;

    var MOType = $('input[name="MOType"]:checked').attr('value');

    if (MOType == "G") {
        if ($('#ddlGSupplier').val() == 0) {
            $('#ddlGSupplier').css('border-color', 'Red');
            isValid = false;
        }
        else {
            $('#ddlGSupplier').css('border-color', 'lightgrey');
        }
    }
    if ($('#ddlLoc').val() == 0) {
        //$('#ddlLoc').css('border-color', 'Red');
        $('#ddlLoc').siblings(".select2-container").css('border', '1px solid red');

        isValid = false;
    }
    else {
        $('#ddlLoc').siblings(".select2-container").css('border', '1px solid lightgrey');
    }

    return isValid;
}

function Update() {

    debugger;
    var res = validate();
    if (res == false) {
        return false;
    }

    if (ELorI == "I") {
        var CurrId = $('#ddlBCurrency').val();
        var Exrate = $('#txtExchange').val();

        if (CurrId == 0) {

            var msg = 'Please select currency..';
            var flg = 4;
            AlartMessage(msg, flg);
            //alert("Please select currency..");
            return true;
        }
        if (Exrate == 0) {
            var msg = 'Please select ExRate..';
            var flg = 4;
            AlartMessage(msg, flg);

            //alert("Please select ExRate..");
            return true;
        }

    }


    if (ItemList.length == 0) {
        var msg = 'Please Enter the Item Details..';
        var flg = 4;
        AlartMessage(msg, flg);

        //alert("Please Enter the Item Details..");
        return true;
    }

    var opchk = [];
    for (var y = 0; y < ItemList.length; y++) {
        if (ItemList[y].quantity > 0) {
            opchk.push(ItemList[y]);
        }
    }
    if (opchk.length == 0) {

        var msg = 'Please fill atleast any one Quantity...';
        var flg = 4;
        AlartMessage(msg, flg);
        //alert('Please fill atleast any one qty...');
        return true;
    }
    var BillType = $('input[name="Pay"]:checked').attr('value');

    var LocalType = $('input[name="DType"]:checked').attr('value');

    var FType = $('input[name="FType"]:checked').attr('value');

    var Cmode = $('#ddlPayMode').val();

    var CName = "";
    if (Cmode == 0) {
        CName = "";
    }
    else {
        CName = $("#ddlPayMode option:selected").text();
    }

    if (OrderType == "G") {
        OrderType = "G";
        PurAgnInd = "Y";
    } else {
        OrderType = OrderType;
        PurAgnInd = "N";
    }


    if (DPurApp == "Y") {
        var poapp = $("#ddlBApprove option:selected").val();

        if (poapp == "") {
            var msg = 'Select Authority for Approval..';
            var flg = 4;
            AlartMessage(msg, flg);

           // alert("Select Authority for Approval..");
            return true;
        }
    }

    var objPurSubmit = {

        companyid: CmpId,
        pur_ord_id: POMId,
        pur_ord_no: $('#txtPoNo').val(),
        orddate: $('#txtEntryDate').val(),//new Date($('#txtEntryDate').val()),
        SupplierId: Suppid,
        Purchase_Type: OrderType,
        Purchase_ItemType: PurType,
        remarks: $('#txtRemark').val(),
        ord_commit: "N",
        cancel: 0,
        Unit_Supplier_Self: LocalType,
        Unit_Supplier: $('#ddlLoc').val(),///
        Amount: $('#txtNetAmt').val(),
        ord_close: 0,
        ord_commit: "N",
        cancel: 0,
        Unit_Supplier_Self: LocalType,
        Unit_Supplier: $('#ddlLoc').val(),
        LocalImport: ELorI,
        Amend: "N",
        currencyid: $('#ddlBCurrency').val(),
        exchange_rate: $('#txtExchange').val(),
        Paytermid: $('#ddlBPayTerms').val(),
        //RateMode: $('#ddlPayMode').val(),
        ReqNo: $('#txtReqNo').val(),
        ReqDate: $('#txtBReqDate').val(),//new Date($('#txtBReqDate').val()),
        BillCompany: $('#ddlBCompany').val(),
        BillCompType: BillType,
        TaxPercent: $('#txtTaxPer').val(),
        TaxAmount: $('#txtTaxValue').val(),
        ToApprove: $('#ddlBApprove').val(),
        ApprovedBY: 0,
        //ApproveDate:
        IsApproved: 'N',
        WITH_ANNEXURE: "N",
        AddLessType: "G",
        chequeno: $('#txtcheNo').val(),
        chequedate: $('#txtBcheDate').val(),//new Date($('#txtBcheDate').val()),
        advance: $('#txtAdvamt').val(),
        paymode: CName,//$("#ddlPayMode option:selected").text(),
        AddLessManualOrFormula: FType,
        PurchaseItemDet: ItemList,
        PurchaseODet: OrderListSave,
        CreatedBy: Guserid,
        PurchaseAccounts: AccList,
        TermsCondDet: termsList,
        PurIndType: PurAgnInd
    };
    debugger;
    $("#Revert").attr("disabled", true);
    $("#Update").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/PurchaseOrderEntry/Update",
        data: JSON.stringify(objPurSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.Value == true) {
                if (PurApp == 'PENDING' || PurApp == 'APPROVED') {
                    var Mod = "R"
                    var MasId = 0;
                    AddUserEntryLog('Management Console', 'Purchase Approval', 'REVERT', $('#txtPoNo').val());
                    //var msg = 'Data Reverted Successfully';
                    //var flg = 1;
                    //AlartMessage(msg, flg);
                    //alert("Data Reverted Successfully");
                    var msg = 'Data Reverted Successfully';
                    var flg = 1;
                    var mo = 0;
                    var ur = "/PurchaseOrderApproval/PurchaseOrderApproval?PMasId=" + MasId + "=&OrderType=" + Mod;
                    AlartMessage(msg, flg, mo, ur);
                    //window.location.href = "/PurchaseOrderApproval/PurchaseOrderApproval?PMasId=" + MasId + "=&OrderType=" + Mod;
                }
                else {
                    var Mod = "R"
                    var MasId = 0;

                    //var msg = 'Data Updated Successfully';
                    //var flg = 1;
                    //AlartMessage(msg, flg);
                   // alert("Data Updated Successfully");
                    AddUserEntryLog('Procurement', 'PurchaseOrder', 'UPDATE', $('#txtPoNo').val());

                    if (OrderType != "G") {

                        if (PurType == "Y") {
                            var msg = 'Data Updated Successfully';
                            var flg = 1;
                            var mo = 0;
                            var ur = "/PurchaseOrderYarnMain/PurchaseOrderYarnMainIndex?PMasId=" + MasId + "=&OrderType=" + Mod;
                            AlartMessage(msg, flg, mo, ur);
                            //window.location.href = "/PurchaseOrderYarnMain/PurchaseOrderYarnMainIndex?PMasId=" + MasId + "=&OrderType=" + Mod;
                        } else if (PurType == "A") {
                            var msg = 'Data Updated Successfully';
                            var flg = 1;
                            var mo = 0;
                            var ur = "/PurchaseOrderTrimsMain/PurchaseOrderTrimsMainIndex?PMasId=" + MasId + "=&OrderType=" + Mod;
                            AlartMessage(msg, flg, mo, ur);
                            //window.location.href = "/PurchaseOrderTrimsMain/PurchaseOrderTrimsMainIndex?PMasId=" + MasId + "=&OrderType=" + Mod;
                        } else {
                            var msg = 'Data Updated Successfully';
                            var flg = 1;
                            var mo = 0;
                            var ur = "/PurchaseOrderMain/PurchaseOrderMainIndex?PMasId=" + MasId + "=&OrderType=" + Mod;
                            AlartMessage(msg, flg, mo, ur);
                            //window.location.href = "/PurchaseOrderMain/PurchaseOrderMainIndex?PMasId=" + MasId + "=&OrderType=" + Mod;
                        }
                    } else {
                        var msg = 'Data Updated Successfully';
                        var flg = 1;
                        var mo = 0;
                        var ur = "/PurchaseGeneralMain/PurchaseGeneralMainIndex?PMasId=" + MasId + "=&OrderType=" + Mod;
                        AlartMessage(msg, flg, mo, ur);
                        //window.location.href = "/PurchaseGeneralMain/PurchaseGeneralMainIndex?PMasId=" + MasId + "=&OrderType=" + Mod;
                    }


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
function Approve() {

    debugger;
    var res = validate();
    if (res == false) {
        return false;
    }

    if (ELorI == "I") {
        var CurrId = $('#ddlBCurrency').val();
        var Exrate = $('#txtExchange').val();

        if (CurrId == 0) {
            var msg = 'Please select currency..';
            var flg = 4;
            AlartMessage(msg, flg);

            //alert("Please select currency..");
            return true;
        }
        if (Exrate == 0) {
            var msg = 'Please select ExRate..';
            var flg = 4;
            AlartMessage(msg, flg);

           // alert("Please select ExRate..");
            return true;
        }

    }


    if (ItemList.length == 0) {

        var msg = 'Please Enter the Item Details..';
        var flg = 4;
        AlartMessage(msg, flg);

        //alert("Please Enter the Item Details..");
        return true;
    }

    var BillType = $('input[name="Pay"]:checked').attr('value');

    var LocalType = $('input[name="DType"]:checked').attr('value');

    var FType = $('input[name="FType"]:checked').attr('value');
    var apptype = $('input[name="apptype"]:checked').attr('value');

    var Cmode = $('#ddlPayMode').val();

    var CName = "";
    if (Cmode == 0) {
        CName = "";
    }
    else {
        CName = $("#ddlPayMode option:selected").text();
    }



    var objPurSubmit = {

        companyid: CmpId,
        pur_ord_id: POMId,
        pur_ord_no: $('#txtPoNo').val(),
        orddate: $('#txtEntryDate').val(),//new Date($('#txtEntryDate').val()),
        SupplierId: Suppid,
        Purchase_Type: OrderType,
        Purchase_ItemType: PurType,
        remarks: $('#txtRemark').val(),
        ord_commit: "N",
        cancel: 0,
        Unit_Supplier_Self: LocalType,
        Unit_Supplier: $('#ddlLoc').val(),///
        Amount: $('#txtNetAmt').val(),
        ord_close: 0,
        ord_commit: "N",
        cancel: 0,
        Unit_Supplier_Self: LocalType,
        Unit_Supplier: $('#ddlLoc').val(),
        LocalImport: ELorI,
        Amend: "N",
        currencyid: $('#ddlBCurrency').val(),
        exchange_rate: $('#txtExchange').val(),
        Paytermid: $('#ddlBPayTerms').val(),
        //RateMode: $('#ddlPayMode').val(),
        ReqNo: $('#txtReqNo').val(),
        ReqDate: $('#txtBReqDate').val(),//new Date($('#txtBReqDate').val()),
        BillCompany: $('#ddlBCompany').val(),
        BillCompType: BillType,
        TaxPercent: $('#txtTaxPer').val(),
        TaxAmount: $('#txtTaxValue').val(),
        ToApprove: $('#ddlBApprove').val(),
        ApprovedBY: $('#ddlBApprove').val(),
        ApproveDate: $('#txtEntryDate').val(),
        IsApproved: apptype,
        WITH_ANNEXURE: "N",
        AddLessType: "G",
        chequeno: $('#txtcheNo').val(),
        chequedate: $('#txtBcheDate').val(),//new Date($('#txtBcheDate').val()),
        advance: $('#txtAdvamt').val(),
        paymode: CName,//$("#ddlPayMode option:selected").text(),
        AddLessManualOrFormula: FType,
        PurchaseItemDet: ItemList,
        PurchaseODet: OrderListSave,
        CreatedBy: Guserid,
        PurchaseAccounts: AccList,
        TermsCondDet: termsList

    };
    debugger;
    $("#Approve").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/PurchaseOrderEntry/Update",
        data: JSON.stringify(objPurSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.Value == true) {

                var Mod = "R"
                var MasId = 0;
                AddUserEntryLog('Management Console', 'Purchase Approval', 'APPROVE', $('#txtPoNo').val());
                var msg = 'Data Approved Successfully';
                var flg = 4;
                AlartMessage(msg, flg);
                //alert("Data Approved Successfully");
                window.location.href = "/PurchaseOrderApproval/PurchaseOrderApproval?PMasId=" + MasId + "=&OrderType=" + Mod;
            } else {

                window.location.href = "/Error/Index";


            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function LoadOrderEditAddLessDetails(POMId) {
    debugger;


    $.ajax({
        url: "/PurchaseOrderEntry/LoadAddlessEditContDetails",
        data: JSON.stringify({ pur_ord_id: POMId }),
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

function LoadTermConditionDetailsEdit(POMId) {
    debugger;

    $.ajax({
        url: "/PurchaseOrderEntry/LoadTermonEditDetails",
        data: JSON.stringify({ pur_ord_id: POMId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            termsList = result;
            if (termsList.length > 0) {
                for (var t = 0; t < termsList.length; t++) {
                    termsList[t].TermsSeq = t + 1;
                }
            }
            loadTermsTable(termsList);

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

    if (ItemList.length > 0) {
    } else {
        var msg = 'Please Check Item Details..';
        var flg = 4;
        AlartMessage(msg, flg);
        return false;
    }

    if (OrderType != 'G') {
        if (OrderListSave.length > 0) {
        } else {
            var msg = 'Please Check Order Details..';
            var flg = 4;
            AlartMessage(msg, flg);
            return false;
        }
    }

    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $("#Delete").attr("disabled", true);
        if (OrderType == "B") {

            if (OrderType == "B") {
                OrderType = "B";
                PurAgnInd = "N";
            } else {
                OrderType = OrderType;
            }
            var objConPurDelete = {

                pur_ord_id: POMId,
                Purchase_Type: OrderType,
                PurchaseODet: OrderListSave,
                PurIndType: PurAgnInd
            };
            LoadingSymb();
            $.ajax({
                url: "/PurchaseOrderEntry/Delete",
                data: JSON.stringify(objConPurDelete),
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {


                    if (result.Value == true) {
                        AddUserEntryLog('Procurement', 'PurchaseOrder', 'DELETE', $('#txtPoNo').val());
                        //var msg = 'Data Deleted Successfully';
                        //var flg = 2;
                        //AlartMessage(msg, flg);
                        //alert("Data Deleted Successfully");
                        var Mod = "R"
                        var MasId = 0;
                        if (OrderType != "G") {

                            if (PurType == "Y") {
                                var msg = 'Data Deleted Successfully';
                                var flg = 2;
                                var mo = 0;
                                var ur = "/PurchaseOrderYarnMain/PurchaseOrderYarnMainIndex?PMasId=" + MasId + "=&OrderType=" + Mod;
                                AlartMessage(msg, flg, mo, ur);
                                //window.location.href = "/PurchaseOrderYarnMain/PurchaseOrderYarnMainIndex?PMasId=" + MasId + "=&OrderType=" + Mod;
                            } else if (PurType == "A") {
                                var msg = 'Data Deleted Successfully';
                                var flg = 2;
                                var mo = 0;
                                var ur = "/PurchaseOrderTrimsMain/PurchaseOrderTrimsMainIndex?PMasId=" + MasId + "=&OrderType=" + Mod;
                                AlartMessage(msg, flg, mo, ur);
                                //window.location.href = "/PurchaseOrderTrimsMain/PurchaseOrderTrimsMainIndex?PMasId=" + MasId + "=&OrderType=" + Mod;
                            } else {
                                var msg = 'Data Deleted Successfully';
                                var flg = 2;
                                var mo = 0;
                                var ur = "/PurchaseOrderMain/PurchaseOrderMainIndex?PMasId=" + MasId + "=&OrderType=" + Mod;
                                AlartMessage(msg, flg, mo, ur);
                                //window.location.href = "/PurchaseOrderMain/PurchaseOrderMainIndex?PMasId=" + MasId + "=&OrderType=" + Mod;
                            }
                        } else {
                            var msg = 'Data Deleted Successfully';
                            var flg = 2;
                            var mo = 0;
                            var ur = "/PurchaseGeneralMain/PurchaseGeneralMainIndex?PMasId=" + MasId + "=&OrderType=" + Mod;
                            AlartMessage(msg, flg, mo, ur);
                            //window.location.href = "/PurchaseGeneralMain/PurchaseGeneralMainIndex?PMasId=" + MasId + "=&OrderType=" + Mod;
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
        } else if (OrderType == "R") {

            if (OrderType == "R") {
                OrderType = "R";
                PurAgnInd = "N";
            } else {
                OrderType = OrderType;
            }
            var objConPurDelete = {

                pur_ord_id: POMId,
                Purchase_Type: OrderType,
                PurchaseODet: OrderListSave,
                PurIndType: PurAgnInd
            };
            LoadingSymb();
            $.ajax({
                url: "/PurchaseOrderEntry/Delete",
                data: JSON.stringify(objConPurDelete),
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {


                    if (result.Value == true) {
                        //var msg = 'Data Deleted Successfully';
                        //var flg = 2;
                        //AlartMessage(msg, flg);
                        ////alert("Data Deleted Successfully");
                        AddUserEntryLog('Procurement', 'PurchaseOrder', 'DELETE', $('#txtPoNo').val());
                        var Mod = "R"
                        var MasId = 0;
                        var msg = 'Data Deleted Successfully';
                        var flg = 2;
                        var mo = 0;
                        var ur = "/PurchaseOrderMain/PurchaseOrderMainIndex?PMasId=" + MasId + "=&OrderType=" + Mod;
                        AlartMessage(msg, flg, mo, ur);
                        //window.location.href = "/PurchaseOrderMain/PurchaseOrderMainIndex?PMasId=" + MasId + "=&OrderType=" + Mod;

                    } else {

                        window.location.href = "/Error/Index";


                    }
                },
                error: function (errormessage) {
                    debugger;
                    alert(errormessage.responseText);
                }
            });
        } else if (OrderType == "G") {

            if (OrderType == "G") {
                OrderType = "G";
                PurAgnInd = "Y";
            } else {
                OrderType = OrderType;
            }

            var objConPurDelete = {

                pur_ord_id: POMId,
                Purchase_Type: OrderType,
                PurchaseODet: OrderListSave,
                PurIndType: PurAgnInd
            };

            $.ajax({
                url: "/PurchaseOrderEntry/Delete",
                data: JSON.stringify(objConPurDelete),
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {


                    if (result.Value == true) {
                        
                        AddUserEntryLog('Procurement', 'PurchaseOrder', 'DELETE', $('#txtPoNo').val());
                       // alert("Data Deleted Successfully");
                        var Mod = "R"
                        var MasId = 0;
                        var msg = 'Data Deleted Successfully';
                        var flg = 2;
                        var mo = 0;
                        var ur = "/PurchaseGeneralMain/PurchaseGeneralMainIndex?PMasId=" + MasId + "=&OrderType=" + Mod;
                        AlartMessage(msg, flg, mo, ur);
                        //window.location.href = "/PurchaseGeneralMain/PurchaseGeneralMainIndex?PMasId=" + MasId + "=&OrderType=" + Mod;

                    } else {

                        window.location.href = "/Error/Index";


                    }
                },
                error: function (errormessage) {
                    debugger;
                    alert(errormessage.responseText);
                }
            });
        } else if (OrderType == "S") {


            if (OrderType == "S") {
                OrderType = "S";
                PurAgnInd = "N";
            } else {
                OrderType = OrderType;
            }
            var objConPurDelete = {

                pur_ord_id: POMId,
                Purchase_Type: OrderType,
                PurchaseODet: OrderListSave,
                PurIndType: PurAgnInd
            };
            LoadingSymb();
            $.ajax({
                url: "/PurchaseOrderEntry/Delete",
                data: JSON.stringify(objConPurDelete),
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {


                    if (result.Value == true) {
                      
                        AddUserEntryLog('Procurement', 'PurchaseOrder', 'DELETE', $('#txtPoNo').val());
                        //alert("Data Deleted Successfully");
                        var Mod = "R"
                        var MasId = 0;
                        var msg = 'Data Deleted Successfully';
                        var flg = 2;
                        var mo = 0;
                        var ur = "/PurchaseOrderMain/PurchaseOrderMainIndex?PMasId=" + MasId + "=&OrderType=" + Mod;
                        AlartMessage(msg, flg, mo, ur);
                        //window.location.href = "/PurchaseOrderMain/PurchaseOrderMainIndex?PMasId=" + MasId + "=&OrderType=" + Mod;

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
}
////////////General///////////////
function LoadCST() {
    $('#txtCGST').val("");
    var IID = $('#ddlItem').val();

    if (geneditFlg != 1) {

        $.ajax({
            url: "/Item/GetbyID/" + IID,
            typr: "GET",

            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                var obj = result.Value;
                if (result.Status == 'SUCCESS') {

                    $('#txtCGST').val(obj.CGST);
                    $('#txtSGST').val(obj.SGST);
                    $('#txtIGST').val(obj.IGST);
                    $('#txtHSN').val(obj.HSNCODE);
                    $('#txtSecQtyId').val(obj.SecUnit);


                }
            }

        });
        debugger;
        var itm = $('select#ddlItem option:selected').val();

        $.ajax({
            url: "/StockOutward/GetPurUom",
            data: JSON.stringify({ itmid: itm }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",

            success: function (result) {
                debugger;
                var obj = result.Value;
                $('#ddlPUnit').val(obj[0].Uomid).trigger('change');


            }

        });

    } else {
        geneditFlg = 0;
    }



}

function LoadAmt() {
    debugger;

    var cur=$('#ddlBCurrency').val()

    if (cur > 0) { }else{
     var dcurrid = $("#hdnDCurrencyId").data('value');
    $('#ddlBCurrency').val(dcurrid).trigger('change');
   
    }


    var Qty = $('#txtQty').val();
    var Rate = $('#txtRate').val();
    var CGST = $('#txtCGST').val();
    var SGST = $('#txtSGST').val();
    var IGST = $('#txtIGST').val();

    Rate = parseFloat(Rate).toFixed(CurrDecimal);
     CGST = parseFloat(CGST).toFixed(1);
     SGST = parseFloat(SGST).toFixed(1);
     IGST = parseFloat(IGST).toFixed(1);

     $('#txtRate').val(Rate);
     $('#txtCGST').val(CGST);
     $('#txtSGST').val(SGST);
     $('#txtIGST').val(IGST);

    var Amt = Qty * Rate;
    $('#txtAmt').val(parseFloat(Amt).toFixed(CurrDecimal));
    var CGSTA = Rate * Qty * CGST / 100;
    var SGSTA = Rate * Qty * SGST / 100;
    var IGSTA = Rate * Qty * IGST / 100;
    $('#txtCGSTAmt').val(parseFloat(CGSTA).toFixed(CurrDecimal));
    $('#txtSGSTAmt').val(parseFloat(SGSTA).toFixed(CurrDecimal));
    $('#txtIGSTAmt').val(parseFloat(IGSTA).toFixed(CurrDecimal));





}
$(document).ready(function () {

    //component details
    $('#btnGenadd').click(function () {
        debugger;

        var leng = 0;

        var isAllValid = true;


        debugger;
        if ($('#ddlItem').val() == "0") {
            $('#ddlItem').css('border-color', 'Red');
            isAllValid = false;
            // $('#ddlItem').siblings('span.error').css('visibility', 'visible');
        }
        else {
            // $('#ddlItem').siblings('span.error').css('visibility', 'hidden');
            $('#ddlItem').css('border-color', 'lightgrey');
        }
        if ($('#ddlColor').val() == "0") {
            $('#ddlColor').css('border-color', 'Red');
            isAllValid = false;
            // $('#ddlColor').siblings('span.error').css('visibility', 'visible');
        }
        else {
            //$('#ddlColor').siblings('span.error').css('visibility', 'hidden');
            $('#ddlColor').css('border-color', 'lightgrey');
        }
        if ($('#ddlSize').val() == "0") {
            $('#ddlSize').css('border-color', 'Red');
            isAllValid = false;
            // $('#ddlSize').siblings('span.error').css('visibility', 'visible');
        }
        else {
            //$('#ddlSize').siblings('span.error').css('visibility', 'hidden');
            $('#ddlSize').css('border-color', 'lightgrey');
        }
        if ($('#ddlPUnit').val() == "0") {
            $('#ddlPUnit').css('border-color', 'Red');
            isAllValid = false;
            // $('#ddlPUnit').siblings('span.error').css('visibility', 'visible');
        }
        else {
            //$('#ddlPUnit').siblings('span.error').css('visibility', 'hidden');
            $('#ddlPUnit').css('border-color', 'lightgrey');
        }

        if ($('#txtQty').val().trim() == "") {
            $('#txtQty').css('border-color', 'Red');
            isAllValid = false;
        }
        else {
            $('#txtQty').css('border-color', 'lightgrey');
        }

        if ($('#txtRate').val().trim() == "") {
            $('#txtRate').css('border-color', 'Red');
            isAllValid = false;
        }
        else {
            $('#txtRate').css('border-color', 'lightgrey');
        }

        //if (ItemList.length == 0) {
        //    leng = 1;
        //}
        //else {
        //    leng = ItemList.length + 1;
        //}

        //AcSno = leng;

        var slno = [];
        $.each(ItemList, function () {
            var sl = this.SNo;
            slno.push(sl);
        });
        var largest = 0;

        for (var i = 0; i < slno.length; i++) {
            if (slno[i] > largest) {
                var largest = slno[i];
            }
        }

        leng = largest + 1;
        AcSno = leng;

        var GItemid = $('#ddlItem').val();
        var GColorid = $('#ddlColor').val();
        var GSizeid = $('#ddlSize').val();


        for (var g = 0; g < ItemList.length; g++) {
            if (ItemList[g].ItemID == GItemid && ItemList[g].ColorID == GColorid && ItemList[g].SizeID == GSizeid) {
                var msg = 'Must be a different Item..';
                var flg = 4;
                AlartMessage(msg, flg);
                //alert('Must be a different Item..');
                fnClearItemControls();
                return true;
            }
        }


        if (chkSGST == 0) {
            $('#txtSGST').val(0);
            $('#txtSGSTAmt').val(0);
        }

        if (chkCGST == 0) {
            $('#txtCGST').val(0);
            $('#txtCGSTAmt').val(0);
        }

        if (chkIGST == 0) {
            $('#txtIGST').val(0);
            $('#txtIGSTAmt').val(0);
        }



        if (isAllValid) {


            debugger;
            var IListObj = {
                Pur_Ord_DetId: 0,
                Item: $("#ddlItem option:selected").text(),
                ItemID: $('#ddlItem').val(),
                Color: $("#ddlColor option:selected").text(),
                ColorID: $('#ddlColor').val(),
                Size: $("#ddlSize option:selected").text(),
                SizeID: $('#ddlSize').val(),
                Unit: $("#ddlPUnit option:selected").text(),
                PurUomId: $('#ddlPUnit').val(),
                OrdBal: 0,
                quantity: $('#txtQty').val(),
                Sec_Qty: $('#txtSecQty').val(),
                BaseUnitId: $('#txtSecQtyId').val(),
                Rate: $('#txtRate').val(),
                AppRate: $('#txtRate').val(),
                Amt: $('#txtAmt').val(),
                CGST: $('#txtCGST').val(),
                SGST: $('#txtSGST').val(),
                IGST: $('#txtIGST').val(),
                HSNCODE: $('#txtHSN').val(),
                CGSTAMt: $('#txtCGSTAmt').val(),
                SGSTAMT: $('#txtSGSTAmt').val(),
                IGSTAMT: $('#txtIGSTAmt').val(),
                Reqdate: $('#txtGReqDate').val(),
                ItemRemarks: $('#txtGRemarks').val(),
                SNo: AcSno,

                Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
            };

            ItemList.push(IListObj);

            loadItemTable(ItemList);

            //var totalAccamnt = 0;
            //for (var e = 0; e < AccList.length; e++) {
            //    var amount = AccList[e].Amount;
            //    totalAccamnt = totalAccamnt + parseFloat(amount);

            //}


            ////    loadItemTable(ItemList);
            //$('#txtNetAmt').val(totalAccamnt.toFixed(3));

            //var GAmt = $('#txtGrossAmount').val();
            //var NAmt = $('#txtNetAmt').val();
            //var FNAmt = parseFloat(GAmt) + parseFloat(NAmt);

            //$('#txtNetAmt').val(FNAmt);
            //$('#txtBTotAmt').val(FNAmt);

            Stkitemid = $('#ddlItem').val();
            Stkcolorid = $('#ddlColor').val();
            StkSizeid = $('#ddlSize').val();
            StkUomid = $('#ddlPUnit').val();

            StktoOrdno = "";
            StkToStyleid = 0;

            modalflg = 'G'
            ItemStockList = [];
            LoadChkStockTransDetails(Stkitemid, Stkcolorid, StkSizeid, StkUomid);
            fnClearItemControls();

        }
    });

    $(document).on('click', '.btnitemedit', function () {
        debugger;
        Mode = 1;
        geneditFlg = 1;

        rowindex = $(this).closest('tr').index();

        var currentro12 = ItemList.slice(rowindex);

        $('#ddlItem').val(currentro12[0]['ItemID']).trigger('change');
        $('#ddlColor').val(currentro12[0]['ColorID']).trigger('change');
        $('#ddlSize').val(currentro12[0]['SizeID']).trigger('change');
        $('#ddlPUnit').val(currentro12[0]['PurUomId']);
        $('#txtQty').val(currentro12[0]['quantity']);
        $('#txtSecQty').val(currentro12[0]['Sec_Qty']);
        $('#txtSecQtyId').val(currentro12[0]['BaseUnitId']);
        $('#txtRate').val(currentro12[0]['Rate']);
        $('#txtAmt').val(currentro12[0]['Amt']);
        $('#txtCGST').val(currentro12[0]['CGST']);
        $('#txtSGST').val(currentro12[0]['SGST']);
        $('#txtIGST').val(currentro12[0]['IGST']);
        $('#txtHSN').val(currentro12[0]['HSNCODE']);
        $('#txtCGSTAmt').val(currentro12[0]['CGSTAMt']);
        $('#txtSGSTAmt').val(currentro12[0]['SGSTAMT']);
        $('#txtIGSTAmt').val(currentro12[0]['IGSTAMT']);
        $('#txtGReqDate').val(currentro12[0]['Reqdate']);

        $('#btnGenadd').hide();
        $('#btnGenupdate').show();
    });



    $('#btnGenupdate').click(function () {
        debugger;
        var currentrowsel = ItemList.slice(rowindex);

        if (chkSGST == 0) {
            $('#txtSGST').val(0);
            $('#txtSGSTAmt').val(0);
        }

        if (chkCGST == 0) {
            $('#txtCGST').val(0);
            $('#txtCGSTAmt').val(0);
        }

        if (chkIGST == 0) {
            $('#txtIGST').val(0);
            $('#txtIGSTAmt').val(0);
        }


        currentrowsel[0]['ItemID'] = $("#ddlItem").val();
        currentrowsel[0]['Item'] = $("#ddlItem option:selected").text();

        currentrowsel[0]['ColorID'] = $("#ddlColor").val();
        currentrowsel[0]['Color'] = $("#ddlColor option:selected").text();

        currentrowsel[0]['SizeID'] = $("#ddlSize").val();
        currentrowsel[0]['Size'] = $("#ddlSize option:selected").text();

        currentrowsel[0]['PurUomId'] = $("#ddlPUnit").val();
        currentrowsel[0]['Unit'] = $("#ddlPUnit option:selected").text();

        currentrowsel[0]['BaseUnitId'] = $("#txtSecQtyId").val();
        currentrowsel[0]['Sec_Qty'] = $("#txtSecQty").val();
        currentrowsel[0]['Rate'] = $("#txtRate").val();
        currentrowsel[0]['Amt'] = $("#txtAmt").val();
        currentrowsel[0]['quantity'] = $("#txtQty").val();
        currentrowsel[0]['CGST'] = $("#txtCGST").val();
        currentrowsel[0]['SGST'] = $("#txtSGST").val();
        currentrowsel[0]['IGST'] = $("#txtIGST").val();
        currentrowsel[0]['HSNCODE'] = $("#txtHSN").val();
        currentrowsel[0]['CGSTAMt'] = $("#txtCGSTAmt").val();
        currentrowsel[0]['SGSTAMT'] = $("#txtSGSTAmt").val();
        currentrowsel[0]['IGSTAMT'] = $("#txtIGSTAmt").val();
        currentrowsel[0]['Reqdate'] = $("#txtGReqDate").val();


        ItemList[rowindex] = currentrowsel[0];

        loadItemTable(ItemList);

        $('#btnGenupdate').hide();
        $('#btnGenadd').show();

        Stkitemid = $('#ddlItem').val();
        Stkcolorid = $('#ddlColor').val();
        StkSizeid = $('#ddlSize').val();

        StktoOrdno = "";
        StkToStyleid = 0;
        ItemStockList = [];
        //LoadChkStockTransDetails(Stkitemid, Stkcolorid, StkSizeid);

        if (Mode == 0) {
            fnClearItemControls();
        }
        else {
            fnClearItemControls();

        }
        Mode = 0;



    });

    $(document).on('click', '.btnItemremove', function () {
        rowindex = $(this).closest('tr').index();
        ItemList.splice(rowindex, 1);
        document.getElementById("tblEntryItemdetails").deleteRow(rowindex + 1);
    });


});
function fnClearItemControls() {

    $('#ddlItem').val(0).trigger('change');
    $('#ddlColor').val(0).trigger('change');
    $('#ddlSize').val(0).trigger('change');
    $('#ddlPUnit').val(0);
    $('#txtQty').val('');
    $('#txtSecQty').val('');
    $('#txtSecQtyId').val('');
    $('#txtRate').val('');
    $('#txtAmt').val('');
    $('#txtCGST').val('');
    $('#txtSGST').val('');
    $('#txtIGST').val('');
    $('#txtHSN').val('');
    $('#txtCGSTAmt').val('');
    $('#txtSGSTAmt').val('');
    $('#txtIGSTAmt').val('');
}
///////////

/////////////
function GetDefaultMis() {

    var MisSetId = 0;


    $.ajax({
        url: "/MISSetting/GetDefaultDetails",
        data: JSON.stringify({ MisId: MisSetId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var obj = result.value;
            debugger;
            if (obj != undefined) {

                var DCompId = obj[0]["dCompanyId"];
                var DCompUnitId = obj[0]["dCompanyUnitId"];

            }
            else {

            }
        }
    });
}
/////////////
function LoadNomsupplier(StyleRowId, Ig) {
    //LoadSupplierDDL("#ddlSupplier");
    $.ajax({
        url: "/PurchaseOrderEntry/GetPurNomDetails",
        data: JSON.stringify({ StyleRowId: StyleRowId, IGId: Ig }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            debugger;
            if (obj != undefined) {
                $('#ddlSupplier').val(obj[0]["SupplierId"]);
                //$('#txtRefNo').val(obj[0]["NomItemId"]);             
                //var Planid = $("#txtPlanId").val();

            }
            else {

            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function getTermDesc() {
    debugger;
    var termdetid = $('#ddlTerms').val();
    if ($('#ddlTerms').val() != "0") {
        $.ajax({
            url: "/PurchaseOrderEntry/GetTermDesc",
            data: JSON.stringify({ Tremsdetid: termdetid }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                debugger;
                var obj = [];
                obj = result.Value;
                $('#txtDes').val(obj[0].TermDesc);
            },

            failure: function (errMsg) {
                alert(errMsg);
            }
        });
    }
    else {
        $('#txtDes').val('');
    }
}
function LoadEditEmployeeDDL() {
    debugger;  
    httpGet("/Employee/GetEmployee", onEmployeeSuccess, onEmployeeFailure);
}
function onEmployeeSuccess(result) {
    debugger;
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(ddlBApprove).empty();
        $(ddlBApprove).append($('<option/>').val('').text('--Select Employee--'));
        $.each(data, function () {
            $(ddlBApprove).append($('<option></option>').val(this.EmpId).text(this.EmpName));
        });
        if (ToAppEmpid > 0) {
            $('#ddlBApprove').val(ToAppEmpid);
        }
    }
    else {
        var msg = 'Employee loading failed';
        var flg = 5;
        AlartMessage(msg, flg);
        //alert('Employee loading failed');
    }
}
function onEmployeeFailure(result) {

    var msg = 'Employee loading failed';
    var flg = 5;
    AlartMessage(msg, flg);
   // alert('Employee loading failed');
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
        async:false,
        dataType: "json",
        success: function (result) {
            debugger;
            var data = result.Value;
            $(ddlLoc).empty();
            $(ddlLoc).append($('<option/>').val('0').text('--Select Store--'));
            $.each(data, function () {
                $(ddlLoc).append($('<option></option>').val(this.Storeid).text(this.StoreName));
            });
            $(ddlLoc).trigger("select2:updated");
            if (editmasunitstore > 0) {
                $('#ddlLoc').val(editmasunitstore).trigger('change');
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

        $(ddlBCompany).empty();
        // $(ddlMSCompany).append($('<option/>').val('0').text('--Select Company--'));
        $.each(comp, function () {
            $(ddlBCompany).append($('<option></option>').val(this.CompanyId).text(this.CompanyName));
        });
        $(ddlBCompany).trigger("select2:updated");
    }
    else {

        var msg = 'Company loading failed';
        var flg = 5;
        AlartMessage(msg, flg);
        //alert('Company loading failed');
    }
}

function onUserCompanyFailure(result) {
    var msg = 'Company loading failed';
    var flg = 5;
    AlartMessage(msg, flg);

    //alert('Company loading failed');
}


function LoadChkStockTransDetails(Itemid, Colorid, Sizeid,Uomid) {
    debugger;
    var Compid = CmpId;
    $.ajax({
        url: "/StockTransfer/GetPurchaseStockDet",
        data: JSON.stringify({ Compid: Compid, Itemid: Itemid, Colorid: Colorid, Sizeid: Sizeid, Uomid: Uomid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = [];
            obj = result.Value;
            ItemStockList = result.Value;

            var fillList = [];
            fillList = result.Value;

            $.each(OrderList, function (t) {

                var list = [];
                list = $.grep(fillList, function (v) {
                    return (v.OrderNo != OrderList[t].OrderNo && v.Styleid != OrderList[t].Styleid);
                });
              
                fillList = list
            });


            ItemStockList = fillList;


            if (OrderType != 'G') {


                var ord = [];
                if (obj.length > 0) {

                    var cnt = 0;
               
                    $.each(OrderList, function (t) {
                   
                        if (OrderList[t].ItemID == Itemid && OrderList[t].ColorID == Colorid && OrderList[t].SizeID == Sizeid) {
                            var ob = {
                                Value1: OrderList[t].OrderNo,
                                Value2: OrderList[t].Styleid,
                                Value3: OrderList[t].OBQty,
                                Value4: OrderList[t].OStyle,
                            }
                            ord.push(ob);
                        }
                          
                    });
                }



                if (ord.length > 0) {


                    var ordnewArray = [];
                    $.each(ord, function (key, value) {
                        var exists = false;
                        var rate = 0;
                        $.each(ordnewArray, function (k, val2) {
                            if (value.Value1 == val2.Value1 && value.Value2 == val2.Value2) { exists = true; };
                        });

                        if (exists == false && value.Value1 != "" && value.Value2 != "") { ordnewArray.push(value); }
                    });
                    if (ItemStockList.length > 0) {
                        var msg = 'This Product is available in Stock, Do you want to see the details?';
                        var flg = 6;
                        AlartMessage(msg, flg);
                        okFlag = 1;
                        ModalOrder = ordnewArray;
                    }
                }

            }


                if (OrderType == 'G' && ItemStockList.length > 0) {
                    var msg = 'This Product is available in Stock, Do you want to see the details?';
                    var flg = 6;
                    AlartMessage(msg, flg);

                }

              

                //var ans = confirm(msg);
                //if (ans) {
                //    if (OrderType == 'G') {

                //        //alert('Please to make Itemwise Transfer..');
                //        var msg = 'Please to make Itemwise Transfer..';
                //        var flg = 4;
                //        AlartMessage(msg, flg);

                //    }
                //    else {
                //        var msg = 'Please Select Order for to move a stock..';
                //        var flg = 4;
                //        AlartMessage(msg, flg);
                //        //alert('Please Select Order for to move a stock..');
                //    }
                    
                //}
           
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadStockTransDetails(Itemid,Colorid,Sizeid) {
    debugger;
    var Compid = CmpId;
    $.ajax({
        url: "/StockTransfer/GetPurchaseStockDet",
        data: JSON.stringify({ Compid: Compid, Itemid: Itemid, Colorid: Colorid, Sizeid: Sizeid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = [];
            obj = result.Value;

            ItemStockList = $.grep(obj, function (v) {
                return (v.OrderNo != StktoOrdno && v.Styleid != StkToStyleid);
            });


            if (ItemStockList.length > 0 && modalflg == 'I') {
                loadStockTransTable(ItemStockList)
            }

            if (ItemStockList.length > 0 && modalflg == 'O') {

                var msg = 'You have stock in this Item, Do you want to make a Transfer?';
                var flg = 6;
                AlartMessage(msg, flg);
            }
           
            if (ItemStockList.length > 0 && modalflg == 'G') {

                var msg = 'You have stock in this Item, Do you want to make a Transfer?';
                var flg = 6;
                AlartMessage(msg, flg);
            }

            //loadStockTransTable(ItemStockList)
          
           
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}


function loadStockTransTable(ItemStockList) {
    $('#stktrans').attr('disabled', false);
    $('#tblStockTranItem').DataTable().destroy();
    debugger;

    var table = $('#tblStockTranItem').DataTable({
     
        data: ItemStockList,
        scrollY: 300,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        "bSort": false,
        "rowCallback": function (row, data, index) {
            if (ViewStock == 0) {
                var tbl = $('#tblStockTranItem');
                tbl.DataTable().column(14).visible(true);
                tbl.DataTable().column(15).visible(true);
                tbl.DataTable().column(16).visible(true);
                tbl.DataTable().column(17).visible(true);

            } else {
                var tbl = $('#tblStockTranItem');
                tbl.DataTable().column(14).visible(false);
                tbl.DataTable().column(15).visible(false);
                tbl.DataTable().column(16).visible(false);
                tbl.DataTable().column(17).visible(false);
            }

        },


        columns: [
                { title: "StockType", data: "StockType" },
                { title: "TransNo", data: "TransNo" },
                { title: "FromOrder", data: "OrderNo" },
                { title: "RefNo", data: "RefNo" },
                 {
                     title: "Status", data: "OrderStatus",
                     render: function (data) {
                         if (data == 'Running') {
                             return '<label  style="text-align: center;color:green;"> Running <label>';
                         } else if (data == 'Depatched') {
                             return '<label  style="text-align: center;color:red;"> Closed <label>';
                         } else if (data == 'General') {
                             return '<label  style="text-align: center;color:brown;"> General <label>';
                         } else {
                             return '<label  style="text-align: center;">  <label>';
                         }

                     },
                 },
                { title: "WorkOrdNo", data: "WorkOrdNo", "visible": false },
                { title: "Supplier", data: "Supplier", "visible": false },
                { title: "Item", data: "Item" },
                { title: "Color", data: "Color" },
                { title: "Size", data: "Size" },
                { title: "Uom", data: "Uom" },
               { title: "Stkbal", data: "BalStkQtyval", "visible": false },
                { title: "prgbal", data: "Ordbalqtyval", "visible": false },

                 {
                     title: "Stock.Bal", data: "StkQty",
                     render: function (data) {
                         return '<input type="text" id="txtStockBal" class="txtStockBal form-control"  style="text-align: center;"  value=' + data + ' disabled>';

                     },
                 },

                {
                    title: "Req.Qty", data: "TransQty",
                render: function (data) {
                return '<input type="text" id="txttransQty" class="txttransQty form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                },
                },
               
                {
                    title: "ToOrder", data: "ToOrderno",
                    render: function (data) {
                      
                        return '<label  style="text-align: center;color:blue;">' + data + '<label>';
                       

                    },
                },
                {
                    title: "ToStyle", data: "ToStyle",
                    render: function (data) {
                        return '<label  style="text-align: center;color:blue;">' + data + '<label>';

                    },
                },
                {
                    title: "BOM.Bal", data: "Ordbalqty",
                    render: function (data) {
                        return '<input type="text" id="txtOrderBal" class="txtOrderBal form-control"  style="text-align: center;"  value=' + data + ' disabled>';

                    },
                },

                //{ title: "Status", data: "OrderStatus" },
                { title: "Itemid", data: "ItemId", "visible": false },
                { title: "Colorid", data: "ColorId", "visible": false },
                { title: "Sizeid", data: "SizeId", "visible": false },
                { title: "Stockid", data: "StockId", "visible": false },
                { title: "NewStockid", data: "NewStockId", "visible": false },
                { title: "ToStyleid", data: "ToStyleid", "visible": false },
        ]
    });
  

}

function StkClose() {
    $('#myModal').modal('hide');
}


function Transfer() {
    debugger;
    var stkempty = [];
    stkempty = ItemStockList;
    stkempty = $.grep(stkempty, function (v) {
        return (v.TransQty >0);
    });

    if (stkempty.length > 0) {
        ItemStockList = stkempty;
    }
    else {
        var msg = 'Please fill anyone Request quantity..';
        var flg = 4;
        AlartMessage(msg, flg);
        //alert('Please Fill anyone TransQty..');
        return true;
    }
    //var newArray = [];
    //$.each(ItemStockList, function (key, value) {
    //    var exists = false;
    //    var rate = 0;
    //    $.each(newArray, function (k, val2) {
    //        if (value.WorkOrdNo == val2.WorkOrdNo && value.StoreId == val2.StoreId) { exists = true; };
    //    });

    //    if (exists == false && value.WorkOrdNo != "" && value.StoreId != "" ) { newArray.push(value); }
    //});
    //$.each(newArray, function (i) {
    //    $.each(ItemStockList, function (j) {
    //        if (newArray[i].WorkOrdNo == ItemStockList[j].WorkOrdNo && newArray[i].StoreId == ItemStockList[j].StoreId) {
    //            ItemStockList[j].stktransno = i + 1;
    //        }
    //        });
    //});


    if (ItemStockList.length > 0) {
        $('#stktrans').attr('disabled', true);
        $.ajax({
            url: "/StockTransfer/PurchaseStockTranfer",
            data: JSON.stringify({ opj: ItemStockList }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {

                var msg = 'Stock Transfer Request raised..';
                var flg = 1;
                AlartMessage(msg, flg);
                //alert('Stock Transfered Successfully..');


                //if (OrderType != 'G') {
                //    location.reload();
                //}
                //else {
                //    var tottransqty = 0;

                //    $.each(ItemStockList, function (i) {
                //        if (ItemStockList[i].TransQty > 0) {
                //            tottransqty = tottransqty + parseFloat(ItemStockList[i].TransQty);
                //        }

                //    });
                //    if (tottransqty > 0) {

                //        for (var g = 0; g < ItemList.length; g++) {
                //            if (ItemList[g].ItemID == Stkitemid && ItemList[g].ColorID == Stkcolorid && ItemList[g].SizeID == StkSizeid) {
                //                ItemList[g].quantity = ItemList[g].quantity - tottransqty;
                //            }
                //        }
                //        loadItemTable(ItemList);
                //        $('#myModal').modal('hide');
                //    }


                //}

            },
            failure: function (errMsg) {
                alert(errMsg);
            }
        });
    }

}
function MsgModalconfirm() {
    debugger;
    //if (okFlag == 1) {

    //    var Bulk = 0;
    //    var Sample = 0;
    //    var General = 0;

    //    $.each(ItemStockList, function (i) {
    //        if (ItemStockList[i].StockType == "General") {
    //            General = General + parseFloat(ItemStockList[i].StkQty);

    //        }
    //        else if (ItemStockList[i].StockType == "Sample") {
    //            Sample = Sample + parseFloat(ItemStockList[i].StkQty);

    //        }
    //        else  {
    //            Bulk = Bulk + parseFloat(ItemStockList[i].StkQty);

    //        }

    //    })


    //    var txt = "Available Stocks are Bulk -" + String(Bulk) + " , Sample -" + String(Sample) + " , General -" + String(General) + ". Do you want raise the stock transfer requset ? ";


    //    $('#AlertlabelFL').val(txt).text(txt);

       

    //}


   // if (okFlag == 2) {
        $("#btnConfirm").attr('disabled', true);
        if (modalflg == 'I') {
            if (OrderType != 'G') {

                ViewStock = 1;

                $('#stktransgoto').show();
                $('#stktrans').hide();

                MsgModalclose();
                $('#myModal').modal('show');
                loadStockTransTable(ItemStockList);

                //var txt = 'Please Select Order for move Stock'
                //$('#AlertlabelFL').val(txt).text(txt);

                //if (ModalOrder.length > 0) {
                //    $.each(ModalOrder, function (t) {

                //        $("#lblSetval").append('<div><button for="name"  class="OrdLbl" value=' + t + '>' + ModalOrder[t].Value1 + '</button></div>');
                //    });
                //}

            }
        }
        if (modalflg == 'O') {

            ViewStock = 1;

            $('#stktransgoto').show();
            $('#stktrans').hide();

            MsgModalclose();
            $('#myModal').modal('show');
            loadStockTransTable(ItemStockList);
        }
        if (modalflg == 'G') {
            //MsgModalclose();
            //$('#myModal').modal('show');
            //loadStockTransTable(ItemStockList);


            ViewStock = 1;

            $('#stktransgoto').show();
            $('#stktrans').hide();

            MsgModalclose();
            $('#myModal').modal('show');
            loadStockTransTable(ItemStockList);

        }
   // }

    //if (okFlag == 1) {
    //    okFlag = 2;
    //}

}

function MsgCancel() {
    debugger;
    cancelflg = 1;

    CItem = Stkitemid;
    CColor = Stkcolorid;
    CSize = StkSizeid;
    COrder = StktoOrdno;
    CStyle = StkToStyleid;
    MsgModalclose();
}


function Request() {

    ViewStock = 0;

    $('#stktransgoto').hide();
    $('#stktrans').show();


    if (modalflg == 'O') {

        ModalOrder = $.grep(ModalOrder, function (v) {
            return (v.Value1 === StktoOrdno && v.Value2 === StkToStyleid );
        });
    }


    if (OrderType != 'G') {

        var Stklist = [];
        $.each(ModalOrder, function (i) {

            $.each(ItemStockList, function (G) {

                var obj = {
                    TransNo: ItemStockList[G].TransNo,
                    TrasId: ItemStockList[G].TrasId,
                    Item: ItemStockList[G].Item,
                    Color: ItemStockList[G].Color,
                    Size: ItemStockList[G].Size,
                    Uom: ItemStockList[G].Uom,
                    Supplier: ItemStockList[G].Supplier,
                    LotNo: ItemStockList[G].LotNo,
                    Process: ItemStockList[G].Process,
                    StockId: ItemStockList[G].StockId,
                    ItemId: ItemStockList[G].ItemId,
                    ColorId: ItemStockList[G].ColorId,
                    SizeId: ItemStockList[G].SizeId,
                    UomId: ItemStockList[G].UomId,
                    SupplierId: ItemStockList[G].SupplierId,
                    ProcessId: ItemStockList[G].ProcessId,
                    StoreId: ItemStockList[G].StoreId,
                    PrgDetId: ItemStockList[G].PrgDetId,
                    StkQty: ItemStockList[G].StkQty,
                    BalStkQtyval: ItemStockList[G].StkQty,
                    PrgQty: ItemStockList[G].PrgQty,
                    TransQty: ItemStockList[G].TransQty,
                    MrpRate: ItemStockList[G].MrpRate,
                    NewStockId: ItemStockList[G].NewStockId,
                    AllotedQty: ItemStockList[G].AllotedQty,
                    EditTransQty: ItemStockList[G].EditTransQty,
                    StockDate: ItemStockList[G].StockDate,
                    OrderNo: ItemStockList[G].OrderNo,
                    RefNo: ItemStockList[G].RefNo,
                    WorkOrdNo: ItemStockList[G].WorkOrdNo,
                    StockType: ItemStockList[G].StockType,
                    stktransno: ItemStockList[G].stktransno,
                    stkcompid: ItemStockList[G].stkcompid,
                    Etype: OrderType,
                    ItemCat: ItemStockList[G].ItemCat,
                    Styleid: ItemStockList[G].Styleid,
                    ToOrderno: ModalOrder[i].Value1,
                    ToRef: ItemStockList[G].ToRef,
                    ToStyleid: ModalOrder[i].Value2,
                    Createdby: Guserid,
                    Companyid: ItemStockList[G].Companyid,
                    Transdate: $('#txtEntryDate').val(),
                    ProgramSeqno: ItemStockList[G].ProgramSeqno,
                    ReqNo: ItemStockList[G].ReqNo,
                    ReqId: ItemStockList[G].ReqId,
                    OrderStatus: ItemStockList[G].OrderStatus,
                    ToStyle: ModalOrder[i].Value4,
                    Ordbalqty: ModalOrder[i].Value3,
                    Ordbalqtyval: ModalOrder[i].Value3,

                }
                Stklist.push(obj);
            });
        });

        ItemStockList = Stklist;


    } else {

        var Stklist = [];
       

            $.each(ItemStockList, function (G) {

                var obj = {
                    TransNo: ItemStockList[G].TransNo,
                    TrasId: ItemStockList[G].TrasId,
                    Item: ItemStockList[G].Item,
                    Color: ItemStockList[G].Color,
                    Size: ItemStockList[G].Size,
                    Uom: ItemStockList[G].Uom,
                    Supplier: ItemStockList[G].Supplier,
                    LotNo: ItemStockList[G].LotNo,
                    Process: ItemStockList[G].Process,
                    StockId: ItemStockList[G].StockId,
                    ItemId: ItemStockList[G].ItemId,
                    ColorId: ItemStockList[G].ColorId,
                    SizeId: ItemStockList[G].SizeId,
                    UomId: ItemStockList[G].UomId,
                    SupplierId: ItemStockList[G].SupplierId,
                    ProcessId: ItemStockList[G].ProcessId,
                    StoreId: ItemStockList[G].StoreId,
                    PrgDetId: ItemStockList[G].PrgDetId,
                    StkQty: ItemStockList[G].StkQty,
                    BalStkQtyval: ItemStockList[G].StkQty,
                    PrgQty: ItemStockList[G].PrgQty,
                    TransQty: ItemStockList[G].TransQty,
                    MrpRate: ItemStockList[G].MrpRate,
                    NewStockId: ItemStockList[G].NewStockId,
                    AllotedQty: ItemStockList[G].AllotedQty,
                    EditTransQty: ItemStockList[G].EditTransQty,
                    StockDate: ItemStockList[G].StockDate,
                    OrderNo: ItemStockList[G].OrderNo,
                    RefNo: ItemStockList[G].RefNo,
                    WorkOrdNo: ItemStockList[G].WorkOrdNo,
                    StockType: ItemStockList[G].StockType,
                    stktransno: ItemStockList[G].stktransno,
                    stkcompid: ItemStockList[G].stkcompid,
                    Etype: "G",
                    ItemCat: ItemStockList[G].ItemCat,
                    Styleid: ItemStockList[G].Styleid,
                    ToOrderno: "General",
                    ToRef: "",
                    ToStyleid: 0,
                    Createdby: Guserid,
                    Companyid: ItemStockList[G].Companyid,
                    Transdate: $('#txtEntryDate').val(),
                    ProgramSeqno: ItemStockList[G].ProgramSeqno,
                    ReqNo: ItemStockList[G].ReqNo,
                    ReqId: ItemStockList[G].ReqId,
                    OrderStatus: ItemStockList[G].OrderStatus,
                    ToStyle: "",
                    Ordbalqty: 0,
                    Ordbalqtyval: 0,

                }
                Stklist.push(obj);
            });
      

        ItemStockList = Stklist;


    }




    //MsgModalclose();
    //$('#myModal').modal('show');
    loadStockTransTable(ItemStockList);

}

function GetGSTstate(Supplierid,Companyid) {
    debugger;
    $.ajax({
        url: "/PurchaseOrderEntry/GetStateGST",
        data: JSON.stringify({ Supplierid: Supplierid, Companyid: Companyid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            var obj = result.Value;
            
            chkSGST = obj[0].chkSGST;
            chkCGST = obj[0].chkCGST;
            chkIGST = obj[0].chkIGST;

        }

    });

}

