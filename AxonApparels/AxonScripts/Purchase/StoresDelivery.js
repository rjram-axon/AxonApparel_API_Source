
var ItemList = [];
var MOrd = 0;
var MJobRowID = 0;
var EItemList = [];
var OItemList = [];
var OSItemList = [];
var SItemList = [];
var Itemrowindex = -1;
var rowindex = -1;
var index = 0;
var Oindex = 0;
var Sindex = 0;
var GIssId = 0;
var GStoreId = 0;
var GCmpId = 0;
var GOType = 0;
var GIType = 0;
var GDType = 0;
var GUPType = 0;
var GCmpUnId = 0;
var typeofg = '';
var Userid = 0;
var UserName = 0;
var Itemid = 0;
var Colorid = 0;
var Sizeid = 0;
var MainFDate = 0;
var Guserid = 0;
var EnbTranDate = 0;
var Allowence = 0;
var totalstk = -1;
var totalissstk = 0;
var Rptid = 0;
var DCompid = 0;
var LoginUserid = '';
var editmasunitstore = 0;
var CompanyId = 0;
var IGroup = 0;
var validatestore = "False";
var JobOrdid = 0;
var LMode = 0;
$(document).ready(function () {
    debugger;

    Guserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    EnbTranDate = $("#hdnETransDate").data('value');
    DCompid = $("#hdnDCompid").data('value');
    LoginUserid = $("#hdnLoginUserid").data('value');
    LoadCompanyDDL("#ddlACompany,#ddlMCompany");
    LoadBuyerDDL("#ddlABuyer");
    LoadMultipleItemGroupDDL("#ddlAItemGroup");
    validatestore = $("#hdnValidateStore").data('value');
   // LoadStoreUnitDDL("#ddlAStore");
    LoadRefNoDDL("#ddlARefNo");
    LoadOrderNoDDL("#ddlAOrderNo");
    MainFDate = $("#hdMainFromDate").data('value');
    LoadProcessDDL("#ddlAProcess");

    var ADY = $('input[name="ADType"]:checked').attr('value');


    if (ADY == "P") {

        $("#optAR").prop("disabled", true);
        LoadCompanyUnitDDL("#ddlAPUnit");
    } else if (ADY == "U") {
        LoadSupplierDDL("#ddlAPUnit");

    }
    $('#SplOId').hide();
    getDate();
    loadsize();
    ListMainUnit();
    ListOrderRefNo();
    ListDisNo();
    ListIssueNo();
    var fill = localStorage.getItem('StoreDeliveryMainFilter');
    if (fill != "null" && fill != null) {
        LoadMainGridFromBack();
    } else {
        LoadMainGrid();
    }

    //LoadMainGrid();
    LoadEmployeeDDL("#ddlRequestner");
    LoadDepartmentDDL("#ddlDepartment");
    $('#MSplOId').hide();
    var radioValue = $("input[name='DSOType']:checked").val();
    if (radioValue == "F") {

        LoadCompanyUnitDDL("#ddlLoc,#ddlAPUnit");
    }

    $(document).on('keyup', '.calcIss', function () {
        debugger;

        var table = $('#tblEDItemdetails').DataTable();


        var CSno = table.row($(this).parents('tr')).data()["SNo"];
        var IId = table.row($(this).parents('tr')).data()["Itemid"];
        var CId = table.row($(this).parents('tr')).data()["Colorid"];
        var SId = table.row($(this).parents('tr')).data()["Sizeid"];
        var PUId = table.row($(this).parents('tr')).data()["Uomid"];
        var BlQ = table.row($(this).parents('tr')).data()["BalQty"];
        var Val = $(this).val();

        var IssQty = Val;

        if (Val > BlQ) {
            //alert('Quantity should not exceed Balqty...');
            var msg = 'Quantity should not exceed Balence quantity...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return true;
        }


        
        if (typeofg != "G") {
           
            if (totalstk == -1 || totalstk >= Val) {
                $.each(EItemList, function () {
                    if (this.SNo == CSno && this.Itemid == IId && this.Colorid == CId && this.Sizeid == SId && this.Uomid == PUId) {
                        this.Quantity = IssQty;

                    }
                });


                var table = $('#tblEDItemdetails').DataTable();
                var data = table.rows().data();

                $('input[id=txtRQty]').each(function (ig) {
                    if (data[ig].SNo == CSno && data[ig].Itemid == IId && data[ig].Colorid == CId && data[ig].Sizeid == SId && data[ig].Uomid == PUId) {
                        var row = $(this).closest('tr');
                        row.find('#txtRQty').val(IssQty);

                    }
                });



                //loadDelyItemTable(EItemList);


                if (OSItemList.length > 0) {

                    var pid = [];
                    var bal = [];
                    var qty = [];

                    for (var t = 0; t < OSItemList.length; t++) {
                        if (OSItemList[t].OItemid == IId && OSItemList[t].OColorid == CId && OSItemList[t].OSizeid == SId && OSItemList[t].OUomid == PUId) {
                            pid.push(OSItemList[t].SoNo);
                            bal.push(OSItemList[t].BalQty);
                            qty.push(OSItemList[t].IssueQty);

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
                    for (var u = 0; u < OSItemList.length; u++) {
                        for (var r = 0; r < pid.length; r++) {
                            if (OSItemList[u].SoNo == pid[r]) {
                                OSItemList[u].IssueQty = qty[r];
                                son.push(OSItemList[u].IssueQty);
                                jid.push(OSItemList[u].JoMasId);
                            }
                            //if (OSItemList[u].OItemid == IId && OSItemList[u].OColorid == CId && OSItemList[u].OSizeid == SId && OSItemList[u].OUomid == PUId) {
                            //    OSItemList[u].IssueQty = qty[r];
                            //}
                        }
                    }

                    loadDelOrderSaveTable(OSItemList);

                    var j = jid[0];
                    var colorempty = [];
                    colorempty = OSItemList;

                    colorempty = $.grep(colorempty, function (v) {
                        return (v.OItemid === IId && v.OColorid === CId && v.OSizeid === SId && v.OUomid === PUId);
                    });
                    OItemList = [];
                    OItemList = colorempty;
                    loadDelOrderTable(colorempty);
                }
                if (SSItemList.length > 0) {



                    var sid = [];
                    var bal = [];
                    var qty = [];
                    for (var t = 0; t < SSItemList.length; t++) {
                        if (SSItemList[t].SItemid == IId && SSItemList[t].SColorid == CId && SSItemList[t].SSizeid == SId && SSItemList[t].SUomid == PUId && SSItemList[t].jmasid == j) {
                            sid.push(SSItemList[t].ItemStockId);
                            bal.push(SSItemList[t].StockQty);
                            qty.push(SSItemList[t].quantity);
                        }
                    }

                    var c = sid.length;
                    var t = 0;

                    //if (Val > bal[0]) {
                    //qty[0] = Val;
                    //}


                    // if(totalstk<Val){
                    if (son[0] < bal[0]) {
                        qty[0] = son[0];
                        for (i = 1; qty.length > i; i++) {
                            qty[i] = 0;
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
                    // }
                    totalstk = 0;
                    for (i = 0; bal.length > i; i++) {
                        totalstk = totalstk + parseFloat(bal[i]);
                    }
                    totalissstk = 0;
                    for (i = 0; qty.length > i; i++) {
                        totalissstk = totalissstk + parseFloat(qty[i]);
                    }
                    //var stkempty = [];
                    //stkempty = SItemList;

                    //stkempty = $.grep(stkempty, function (v) {
                    //    return (v.SItemid === IId && v.SColorid === CId && v.SSizeid === SId && v.SUomid === PUId);
                    //});

                    // for (var c = 0; c < SItemList.length; c++) {
                    //     for (var r = 0; r < pid.length; r++) {
                    //         if (SItemList[c].ONo == pid[r]) {

                    //             //stkempty = SItemList;

                    //             //stkempty = $.grep(stkempty, function (v) {
                    //             //    return (v.SItemid === IId && v.SColorid === CId && v.SSizeid === SId && v.SUomid === PUId);
                    //             //});

                    //             if (SItemList[c].SItemid == IId && SItemList[c].SColorid == CId && SItemList[c].SSizeid == SId && SItemList[c].SUomid == PUId)
                    //             {
                    //                 stkempty.push(SItemList[c]);
                    //             }
                    //         }
                    //     }

                    // }



                    //// SItemList = [];
                    // SItemList = stkempty;
                    // loadDelStockTable(SItemList);
                    var stkid = [];
                    for (var u = 0; u < SSItemList.length; u++) {
                        for (var r = 0; r < sid.length; r++) {
                            if (SSItemList[u].ItemStockId == sid[r]) {
                                SSItemList[u].quantity = qty[r];
                                stkid.push(SSItemList[u].ItemStockId);
                            }
                            //if (OSItemList[u].OItemid == IId && OSItemList[u].OColorid == CId && OSItemList[u].OSizeid == SId && OSItemList[u].OUomid == PUId) {
                            //    OSItemList[u].IssueQty = qty[r];
                            //}

                        }
                    }

                    //for (var e = 0; e < SItemList.length; e++) {
                    //    for (var r = 0; r < sid.length; r++) {
                    //        if (SItemList[e].ItemStockId == sid[r]) {
                    //            SItemList[e].quantity = qty[r];
                    //        }
                    //    }
                    //}


                    var colorempty = [];
                    colorempty = SSItemList;

                    colorempty = $.grep(colorempty, function (v) {
                        return (v.SItemid === IId && v.SColorid === CId && v.SSizeid === SId);
                    });
                    SItemList = [];
                    SItemList = colorempty;


                    loadDelStockTable(SItemList);
                    loadDelStockSaveTable(SSItemList);


                }
            }
            else {
                //alert('Quantity should not exceed Stkqty...');
                var msg = 'Quantity should not exceed Stock quantity...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                var rows = $("#tblEDItemdetails").dataTable().fnGetNodes();
                var dtTable = $('#tblEDItemdetails').DataTable();
                for (var i = 0; i < rows.length; i++) {
                    var sn = dtTable.cells({ row: i, column: 2 }).data()[0];
                    $('input[id=txtRQty]').each(function () {
                        if (sn == CSno && $(this).val() == IssQty) {
                            var row = $(this).closest('tr');
                            var num = row.find('#txtRQty').val();
                            row.find('#txtRQty').focus().val(totalissstk);
                            return true;
                        }
                    });
                }
                return true;
            }
        }
        else {
            $.each(EItemList, function () {
                if (this.SNo == CSno && this.Itemid == IId && this.Colorid == CId && this.Sizeid == SId && this.Uomid == PUId) {
                    this.Quantity = IssQty;

                }
            });



            loadDelyItemTable(EItemList);


            var pid = [];
            var bal = [];
            var qty = [];
            for (var t = 0; t < SSItemList.length; t++) {
                if (SSItemList[t].SItemid == IId && SSItemList[t].SColorid == CId && SSItemList[t].SSizeid == SId && SSItemList[t].SUomid == PUId) {
                    pid.push(SSItemList[t].ItemStockId);
                    bal.push(SSItemList[t].StockQty);
                    qty.push(SSItemList[t].quantity);
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
            for (var u = 0; u < SSItemList.length; u++) {
                for (var r = 0; r < pid.length; r++) {
                    if (SSItemList[u].ItemStockId == pid[r]) {
                        SSItemList[u].quantity = qty[r];
                    }
                }
            }




            for (var u = 0; u < SItemList.length; u++) {
                for (var r = 0; r < pid.length; r++) {
                    if (SItemList[u].ItemStockId == pid[r]) {
                        SItemList[u].quantity = qty[r];
                    }
                }
            }
            loadDelStockTable(SItemList);
            loadDelStockSaveTable(SSItemList);
        }
        var rows = $("#tblEDItemdetails").dataTable().fnGetNodes();
        var dtTable = $('#tblEDItemdetails').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 2 }).data()[0];
            $('input[id=txtRQty]').each(function () {
                if (sn == CSno && $(this).val() == IssQty) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtRQty').val();
                    row.find('#txtRQty').focus().val('').val(num);
                    return true;
                }
            });
        }
    });
    $("#tblMainDelidetails").on('click', 'tr', function () {
        var table = $("#tblMainDelidetails").DataTable();
        var row = $(this).closest('tr');
        var data = $("#tblMainDelidetails").dataTable().fnGetData(row);

        var Id = data[0];
        LoadMainOrderDetails(Id);

    });
    $(document).on('keyup', '.calcsepquan', function () {
        debugger;

        var table = $('#tblOrderdetails').DataTable();
        var IId = table.row($(this).parents('tr')).data()["OItemid"];
        var CId = table.row($(this).parents('tr')).data()["OColorid"];
        var SId = table.row($(this).parents('tr')).data()["OSizeid"];
        var PUId = table.row($(this).parents('tr')).data()["OUomid"];
        var pid = table.row($(this).parents('tr')).data()["SoNo"];
        var balq = table.row($(this).parents('tr')).data()["BalQty"];
        var jmid = table.row($(this).parents('tr')).data()["JoMasId"];
        var value = $(this).val();
        var Val = value;


        var totstck = 0;
        for (var t = 0; t < SSItemList.length; t++) {
            if (SSItemList[t].SItemid == IId && SSItemList[t].SColorid == CId && SSItemList[t].SSizeid == SId && SSItemList[t].SUomid == PUId && SSItemList[t].jmasid == jmid) {                  
                totstck = totstck + SSItemList[t].StockQty;                
            }
        }



        if (totstck >= Val) {

        } else {

            Val = 0;
            value = 0;
        }




        $.each(OSItemList, function () {
            if (this.SoNo == pid) {

                if (balq >= value) {
                    this.IssueQty = value;
                }
                else {
                    var t = value - balq;
                    this.IssueQty = balq;
                }

            }
        });


        $.each(OItemList, function () {
            if (this.SoNo == pid) {

                if (balq >= value) {
                    if (this.IssueQty > balq) {
                        var s1 = Allowence + balq;
                        var s2 = s1 - value;
                        for (i = 0; OItemList.length > i; i++) {
                            OItemList[i].AllowValue = OItemList[i].AllowValue + s2;
                        }
                    }
                    this.IssueQty = value;
                }
                else if (balq + Allowence >= value) {
                    if (this.IssueQty > balq) {
                        var s1 = Allowence + balq;
                        var s2 = s1 - value;
                        for (i = 0; OItemList.length > i; i++) {
                            OItemList[i].AllowValue = OItemList[i].AllowValue + s2;
                        }
                    }

                    this.IssueQty = value;
                    var bal=value-balq;
                    for (i = 0; OItemList.length > i;i++){
                        OItemList[i].AllowValue = OItemList[i].AllowValue - bal;                  
                    }               
                }
                else {
                    var t = value - balq;
                    this.IssueQty = balq + this.AllowValue;
                }

            }
        });

        //var currentrow = [];
        //var Itmstkid = 0;
        //for (var a = 0; a < SSItemList.length; a++) {
        //    if (SSItemList[a].SItemid == IId && SSItemList[a].SColorid == CId && SSItemList[a].SSizeid == SId) {
        //        Itmstkid = SSItemList[a].ItemStockId;

        //        if (SSItemList[a].jmasid == jmid) {
        //            currentrow.push(SSItemList[a]);
        //            var jm = currentrow[0].jmasid;
        //            //Itmstkid = currentrow[0].ItemStockId;
        //            var balstk = currentrow[0].StockQty;

        //            $.each(SSItemList, function () {
        //                // if (this.SItemid == IId && this.SColorid == CId && this.SSizeid == SId) {
        //                if (this.ItemStockId == Itmstkid) {
        //                    if (value >= balq) {
        //                        if (balq >= value) {
        //                            this.quantity = value;
        //                        }
        //                        else {
        //                            var t = value - balq;
        //                            this.quantity = balq;
        //                        }
        //                    }
        //                    else {
        //                        if (balstk >= value) {
        //                            this.quantity = value;
        //                        }
        //                        else {
        //                            var t = value - balstk;
        //                            this.quantity = balstk;
        //                        }
        //                    }

        //                }
        //            });

        //            $.each(SItemList, function () {
        //                // if (this.SItemid == IId && this.SColorid == CId && this.SSizeid == SId) {
        //                if (this.ItemStockId == Itmstkid) {
        //                    if (value >= balq) {
        //                        if (balq >= value) {
        //                            this.quantity = value;
        //                        }
        //                        else {
        //                            var t = value - balq;
        //                            this.quantity = balq;
        //                        }
        //                    }
        //                    else {
        //                        if (balstk >= value) {
        //                            this.quantity = value;
        //                        }
        //                        else {
        //                            var t = value - balstk;
        //                            this.quantity = balstk;
        //                        }
        //                    }

        //                }
        //            });
        //        }
        //    }
        //}


        if (OSItemList.length > 0) {

            //var pid2 = [];
            //var bal = [];
            //var qty = [];

            //for (var t = 0; t < OSItemList.length; t++) {
            //    if (OSItemList[t].OItemid == IId && OSItemList[t].OColorid == CId && OSItemList[t].OSizeid == SId && OSItemList[t].OUomid == PUId) {
            //        pid2.push(OSItemList[t].SoNo);
            //        bal.push(OSItemList[t].BalQty);
            //        qty.push(OSItemList[t].IssueQty);

            //    }
            //}

            //var c = pid.length;
            //var t = 0;

            //if (Val < bal[0]) {
            //    qty[0] = Val;
            //}
            //else {
            //    for (var r = 0; r < c; r++) {
            //        if (r == 0) {
            //            if (bal[r] <= Val) {
            //                qty[r] = bal[r];
            //                t = Val - bal[r];
            //            }
            //        }
            //        if (r > 0) {
            //            if (bal[r] >= t) {
            //                qty[r] = t;
            //                t = 0;
            //            }
            //            else {
            //                var y = t - bal[r];
            //                if (bal[r] < y || bal[r] > y) {
            //                    qty[r] = bal[r];
            //                    t = t - qty[r];
            //                }
            //                else {
            //                    qty[r] = y;
            //                    t = t - y;
            //                }
            //            }

            //        }
            //    }
            //}
            //var son = [];
            //var jid = [];
            //for (var u = 0; u < OSItemList.length; u++) {
            //    for (var r = 0; r < pid.length; r++) {
            //        if (OSItemList[u].SoNo == pid[r]) {
            //            OSItemList[u].IssueQty = qty[r];
            //            son.push(OSItemList[u].IssueQty);
            //            jid.push(OSItemList[u].JoMasId);
            //        }
            //        //if (OSItemList[u].OItemid == IId && OSItemList[u].OColorid == CId && OSItemList[u].OSizeid == SId && OSItemList[u].OUomid == PUId) {
            //        //    OSItemList[u].IssueQty = qty[r];
            //        //}
            //    }
            //}

            //loadDelOrderSaveTable(OSItemList);

            //var j = jid[0];
            //var colorempty = [];
            //colorempty = OSItemList;

            //colorempty = $.grep(colorempty, function (v) {
            //    return (v.OItemid === IId && v.OColorid === CId && v.OSizeid === SId && v.OUomid === PUId);
            //});
            //OItemList = [];
            //OItemList = colorempty;
            //loadDelOrderTable(colorempty);

            var totstck = 0;
            for (var t = 0; t < SSItemList.length; t++) {
                if (SSItemList[t].SItemid == IId && SSItemList[t].SColorid == CId && SSItemList[t].SSizeid == SId && SSItemList[t].SUomid == PUId && SSItemList[t].jmasid == jmid) {                  
                    totstck = totstck + SSItemList[t].StockQty;                
                }
            }



            if (totstck >= Val) {
                if (SSItemList.length > 0) {



                    var pid = [];
                    var bal = [];
                    var qty = [];
                    for (var t = 0; t < SSItemList.length; t++) {
                        if (SSItemList[t].SItemid == IId && SSItemList[t].SColorid == CId && SSItemList[t].SSizeid == SId && SSItemList[t].SUomid == PUId && SSItemList[t].jmasid == jmid) {
                            pid.push(SSItemList[t].ItemStockId);
                            bal.push(SSItemList[t].StockQty);
                            qty.push(SSItemList[t].quantity);
                        }
                    }



                    var c = pid.length;
                    var t = 0;

                    if (Val < bal[0]) {
                        qty[0] = Val;
                        for (i = 1; i < qty.length; i++) {
                            qty[i] = 0;
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

                    for (var u = 0; u < SSItemList.length; u++) {
                        for (var r = 0; r < pid.length; r++) {
                            if (SSItemList[u].ItemStockId == pid[r]) {
                                SSItemList[u].quantity = qty[r];
                            }
                        }
                    }

                    //OutputSaveJobdetTab(OpSaveJobDetList);

                    for (var u = 0; u < SItemList.length; u++) {
                        for (var r = 0; r < pid.length; r++) {
                            if (SItemList[u].ItemStockId == pid[r]) {
                                SItemList[u].quantity = qty[r];
                            }
                        }
                    }




                 


                    var colorempty = [];
                    colorempty = SSItemList;

                    colorempty = $.grep(colorempty, function (v) {
                        return (v.SItemid === IId && v.SColorid === CId && v.SSizeid === SId && v.jmasid == jmid);
                    });
                    SItemList = [];
                    SItemList = colorempty;


                    loadDelStockTable(SItemList);
                    loadDelStockSaveTable(SSItemList);

                 
                }
            }
            else {


                //alert('Quantity should not exceed Stkqty...');
                var msg = 'Quantity should not exceed Stock quantity...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                Val = 0;

                if (SSItemList.length > 0) {



                    var pid = [];
                    var bal = [];
                    var qty = [];
                    for (var t = 0; t < SSItemList.length; t++) {
                        if (SSItemList[t].SItemid == IId && SSItemList[t].SColorid == CId && SSItemList[t].SSizeid == SId && SSItemList[t].SUomid == PUId && SSItemList[t].jmasid == jmid) {
                            pid.push(SSItemList[t].ItemStockId);
                            bal.push(SSItemList[t].StockQty);
                            qty.push(SSItemList[t].quantity);
                        }
                    }



                    var c = pid.length;
                    var t = 0;

                    if (Val < bal[0]) {
                        qty[0] = Val;
                        for (i = 1; i < qty.length; i++) {
                            qty[i] = 0;
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

                    for (var u = 0; u < SSItemList.length; u++) {
                        for (var r = 0; r < pid.length; r++) {
                            if (SSItemList[u].ItemStockId == pid[r]) {
                                SSItemList[u].quantity = qty[r];
                            }
                        }
                    }

                    //OutputSaveJobdetTab(OpSaveJobDetList);

                    for (var u = 0; u < SItemList.length; u++) {
                        for (var r = 0; r < pid.length; r++) {
                            if (SItemList[u].ItemStockId == pid[r]) {
                                SItemList[u].quantity = qty[r];
                            }
                        }
                    }


                    var colorempty = [];
                    colorempty = SSItemList;

                    colorempty = $.grep(colorempty, function (v) {
                        return (v.SItemid === IId && v.SColorid === CId && v.SSizeid === SId && v.jmasid == jmid);
                    });
                    SItemList = [];
                    SItemList = colorempty;


                    loadDelStockTable(SItemList);
                    loadDelStockSaveTable(SSItemList);


                }



                var rows = $("#tblOrderdetails").dataTable().fnGetNodes();
                var dtTable = $('#tblOrderdetails').DataTable();
                for (var i = 0; i < rows.length; i++) {
                    var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
                    $('input[id=txtOQty]').each(function () {
                        if (sn == pid && $(this).val() == Val) {
                            var row = $(this).closest('tr');
                          //  var num = row.find('#txtOQty').val();
                            row.find('#txtOQty').focus().val('').val(totalissstk);
                            return true;
                        }
                    });
                }

                return true;
            }
        }
        var totalamnt = 0;

        for (var e = 0; e < OItemList.length; e++) {
            var amount = OItemList[e].IssueQty;
            totalamnt = totalamnt + parseFloat(amount);
        }
        $.each(EItemList, function () {
            if (this.Itemid == IId && this.Colorid == CId && this.Sizeid == SId && this.Uomid == PUId) {
                if (this.BalQty >= totalamnt) {
                    this.Quantity = totalamnt;
            }
                else {

                    $.each(OItemList, function () {
                        if (this.SoNo == pid) {
                         this.IssueQty = 0;
                        }
                    });
                    var totalamntre = 0;

                    for (var e = 0; e < OItemList.length; e++) {
                        var amount = OItemList[e].IssueQty;
                        totalamntre = totalamntre + parseFloat(amount);
                    }

                    this.Quantity = totalamntre;
            }
            }
        });



        loadDelStockTable(SItemList);
     //   loadDelStockSaveTable(SSItemList);
        //loadDelyItemTable(EItemList);

        var table = $('#tblEDItemdetails').DataTable();
        var ecdata = table.rows().data();

        $('input[id=txtRQty]').each(function (ig) {
            var row = $(this).closest('tr');
            for (var h = 0; h < EItemList.length; h++) {
               
                if (EItemList[h].Itemid == ecdata[ig].Itemid && EItemList[h].Colorid == ecdata[ig].Colorid && EItemList[h].Sizeid == ecdata[ig].Sizeid && EItemList[h].Uomid == ecdata[ig].Uomid) {
                    var Quantity = EItemList[h].Quantity;
                    row.find('#txtRQty').val(Quantity);

                }
            }

        });

        loadDelOrderTable(OItemList);

        var table = $('#tblOrderdetails').DataTable();
        var ecdata = table.rows().data();

        $('input[id=txtOQty]').each(function (ig) {
            var row = $(this).closest('tr');
            for (var h = 0; h < OItemList.length; h++) {

                if (OItemList[h].JoMasId == ecdata[ig].JoMasId && ecdata[ig].JoMasId == jmid) {
                    var IssueQty = OItemList[h].IssueQty;
                    row.find('#txtOQty').focus().val('').val(IssueQty);

                }
            }

        });

       // loadDelOrderSaveTable(OSItemList);

        //var rows = $("#tblOrderdetails").dataTable().fnGetNodes();
        //var dtTable = $('#tblOrderdetails').DataTable();
        //for (var i = 0; i < rows.length; i++) {
        //    var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
        //    $('input[id=txtOQty]').each(function () {
        //        if (sn == pid && $(this).val() == Val) {
        //            var row = $(this).closest('tr');
        //            var num = row.find('#txtOQty').val();
        //            row.find('#txtOQty').focus().val('').val(num);
        //            return true;
        //        }
        //    });
        //}
    });
    $(document).on('keyup', '.calcStockqty', function () {
        debugger;

        var table = $('#tblStockdetails').DataTable();
        var CSno = table.row($(this).parents('tr')).data()["SNo"];
        var IId = table.row($(this).parents('tr')).data()["SItemid"];
        var CId = table.row($(this).parents('tr')).data()["SColorid"];
        var SId = table.row($(this).parents('tr')).data()["SSizeid"];
        var PUId = table.row($(this).parents('tr')).data()["SUomid"];
        var itmstkid = table.row($(this).parents('tr')).data()["ItemStockId"];
        var balstk = table.row($(this).parents('tr')).data()["StockQty"];
        var jm = table.row($(this).parents('tr')).data()["jmasid"];
        var value = $(this).val();
        var Val = value;
        var revtqty = 0;
        if (typeofg != "G") {
            currentrowstk = [];
            for (var w = 0; w < OSItemList.length; w++) {
                if (OSItemList[w].JoMasId == jm && OSItemList[w].OItemid == IId && OSItemList[w].OColorid == CId && OSItemList[w].OSizeid == SId && OSItemList[w].OUomid == PUId) {
                    currentrowstk.push(OSItemList[w]);
                    var jno = currentrowstk[0].JoMasId;
                    // Itmstkid = currentrow[0].ItemStockId;
                    var balq = currentrowstk[0].BalQty;
                }
            }



            $.each(SItemList, function () {
                if (this.ItemStockId == itmstkid) {

                    if (balstk >= value) {
                        if (balq >= value) {
                            this.quantity = value;
                        }
                        else {
                            var t = value - balq;
                            this.quantity = balq;
                        }
                    }
                    else {
                        var t = value - balstk;
                        this.quantity = balstk;
                    }

                }
            });
            
            $.each(SSItemList, function () {
                if (this.ItemStockId == itmstkid) {

                    if (balstk >= value) {
                        if (balq >= value) {
                            this.quantity = value;
                        }
                        else {
                            var t = value - balq;
                            this.quantity = balq;
                        }
                    }
                    else {
                        var t = value - balstk;
                        this.quantity = balstk;
                        revtqty = balstk;
                    }

                }
            });

            var tot = 0;
            for (var d = 0; d < SSItemList.length; d++) {
                if (SSItemList[d].jmasid == jm && SSItemList[d].SItemid == IId && SSItemList[d].SColorid == CId && SSItemList[d].SSizeid == SId && SSItemList[d].SUomid == PUId) {
                    var at = SSItemList[d].quantity;
                    tot = tot + parseFloat(at);
                }
            }
            //var isqty = parseFloat(tot) + value;
            if (tot > balq) {
                //alert('Should not exceed Bal Qty in Order table');
                var msg = 'Should not exceed Balance quantity in Order table...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                return true;
            }
            //$.each(OSItemList, function () {
            //    if (this.SoNo == Ono) {

            //        if (balstk >= value) {
            //            this.quantity = value;
            //        }
            //        else {
            //            var t = value - balstk;
            //            this.quantity = balstk;
            //        }

            //    }
            //});
            //$.each(SItemList, function () {
            //    if (this.SItemid == IId && this.SColorid == CId && this.SSizeid == SId && this.SUomid == PUId) {
            //        this.quantity = IssQty;

            //    }
            //});
            var currentrow = [];
            for (var a = 0; a < OSItemList.length; a++) {
                //if (SItemList[a].ONo == pid && Itmstkid==0) {
                //    currentrow.push(SItemList[a]);
                //    var Ono = currentrow[0].ONo;
                //     Itmstkid = currentrow[0].ItemStockId;
                //    var balstk = currentrow[0].StockQty;

                //    $.each(SItemList, function () {
                //        if (this.ItemStockId == Itmstkid) {

                //            if (balstk >= value) {
                //                this.quantity = value;
                //            }
                //            else {
                //                var t = value - balstk;
                //                this.quantity = balstk;
                //            }

                //        }
                //    });
                //}

                if (OSItemList[a].JoMasId == jm && OSItemList[a].OItemid == IId && OSItemList[a].OColorid == CId && OSItemList[a].OSizeid == SId && OSItemList[a].OUomid == PUId) {
                    currentrow.push(OSItemList[a]);
                    var jno = currentrow[0].JoMasId;
                    // Itmstkid = currentrow[0].ItemStockId;
                    var balq = currentrow[0].BalQty;

                    if (balq <= balstk) {

                    }


                    $.each(OSItemList, function () {
                        //if (this.JoMasId == jm) {
                        if (this.JoMasId == jm && this.OItemid == IId && this.OColorid == CId && this.OSizeid == SId && this.OUomid == PUId) {
                            if (value >= balstk) {
                                //  if (tot < balq) {
                                if (balstk >= value) {
                                    this.IssueQty = value;
                                }
                                else {
                                    var t = value - balstk;
                                    this.IssueQty = balstk;
                                }
                                //}
                                //else {
                                //    this.IssueQty = value;
                                //  }
                            }
                            else {
                                if (balq >= value) {
                                    this.IssueQty = value;
                                }
                                else {
                                    var t = value - balq;
                                    this.IssueQty = balq;
                                }
                            }
                            //if (balq <= balstk) {
                            //    this.IssueQty = balq;
                            //}
                        }
                    });

                    $.each(OItemList, function () {
                        //if (this.JoMasId == jm) {
                        if (this.JoMasId == jm && this.OItemid == IId && this.OColorid == CId && this.OSizeid == SId && this.OUomid == PUId) {
                            if (value >= balstk) {
                                if (balstk >= value) {
                                    this.IssueQty = value;
                                }
                                else {
                                    var t = value - balstk;
                                    this.IssueQty = balstk;
                                }
                            }
                            else {
                                if (balq >= value) {
                                    this.IssueQty = value;
                                }
                                else {
                                    var t = value - balq;
                                    this.IssueQty = balq;
                                }
                            }

                        }
                    });
                }
            }

            //var total = 0;

            //for (var e = 0; e < OSItemList.length; e++) {
            //    var amo = OSItemList[e].IssueQty;
            //    total = total + parseFloat(amo);
            //}



            var totalamnt = 0;

            for (var e = 0; e < SItemList.length; e++) {
                var amount = SItemList[e].quantity;
                totalamnt = totalamnt + parseFloat(amount);
            }

            //for (var e = 0; e < OSItemList.length; e++) {
            //    var amo = OSItemList[e].IssueQty;
            //    totalamnt = totalamnt + parseFloat(amo);
            //}



            $.each(OSItemList, function () {
                if (this.OItemid == IId && this.OColorid == CId && this.OSizeid == SId && this.OUomid == PUId && this.JoMasId == jm) {
                    this.IssueQty = totalamnt;

                }
            });
            $.each(OItemList, function () {
                if (this.OItemid == IId && this.OColorid == CId && this.OSizeid == SId && this.OUomid == PUId && this.JoMasId == jm) {
                    this.IssueQty = totalamnt;

                }
            });


            var total = 0;

            for (var e = 0; e < OItemList.length; e++) {
                var amount = OItemList[e].IssueQty;
                total = total + parseFloat(amount);
            }

            $.each(EItemList, function () {
                if (this.Itemid == IId && this.Colorid == CId && this.Sizeid == SId && this.Uomid == PUId) {
                    this.Quantity = total;

                }
            });


            //loadDelStockTable(SItemList);
            //loadDelStockSaveTable(SSItemList);
            //loadDelOrderTable(OItemList);
            //loadDelOrderSaveTable(OSItemList);
            //loadDelyItemTable(EItemList);


            //load the itemtables
            var table = $('#tblEDItemdetails').DataTable();
            var data = table.rows().data();

            $('input[id=txtRQty]').each(function (ig) {
                if (data[ig].Itemid == IId && data[ig].Colorid == CId && data[ig].Sizeid == SId && data[ig].Uomid == PUId) {
                    var row = $(this).closest('tr');
                    row.find('#txtRQty').val(total);

                }
            });
            //

            ////load the ordertables
            var table = $('#tblOrderdetails').DataTable();
            var odata = table.rows().data();

            $('input[id=txtOQty]').each(function (ig) {
                if (odata[ig].OItemid == IId && odata[ig].OColorid == CId && odata[ig].OSizeid == SId && odata[ig].OUomid == PUId && odata[ig].JoMasId == jm) {


                    var row = $(this).closest('tr');
                    row.find('#txtOQty').val(totalamnt);

                }
            });
            //
        }
        else {
            $.each(SSItemList, function () {
                if (this.ItemStockId == itmstkid) {


                    if (balstk >= value) {
                        this.quantity = value;
                    }
                    else {
                        var t = value - balstk;
                        this.quantity = balstk;
                        Val = balstk;
                    }

                }
            });
            $.each(SItemList, function () {
                if (this.ItemStockId == itmstkid) {


                    if (balstk >= value) {
                        this.quantity = value;
                    }
                    else {
                        var t = value - balstk;
                        this.quantity = balstk;
                        Val = balstk
                    }

                }
            });

            var totalamnt = 0;

            for (var e = 0; e < SItemList.length; e++) {
                var amount = SItemList[e].quantity;
                totalamnt = totalamnt + parseFloat(amount);
            }
            $.each(EItemList, function () {
                if (this.Itemid == IId && this.Colorid == CId && this.Sizeid == SId && this.Uomid == PUId) {
                    this.Quantity = totalamnt;

                }
            });

            //loadDelyItemTable(EItemList);

            var table = $('#tblEDItemdetails').DataTable();
            var data = table.rows().data();

            $('input[id=txtRQty]').each(function (ig) {
                if (data[ig].Itemid == IId && data[ig].Colorid == CId && data[ig].Sizeid == SId && data[ig].Uomid == PUId) {
                    var row = $(this).closest('tr');
                    row.find('#txtRQty').val(totalamnt);

                }
            });


            //loadDelStockTable(SItemList);


            var table = $('#tblStockdetails').DataTable();
            var data = table.rows().data();

            $('input[id=txtStkOQty]').each(function (ig) {
                if (data[ig].ItemStockId == itmstkid ) {
                    var row = $(this).closest('tr');
                    row.find('#txtStkOQty').val(Val);

                }
            });


           // loadDelStockSaveTable(SSItemList);

        }



        //var rows = $("#tblStockdetails").dataTable().fnGetNodes();
        //var dtTable = $('#tblStockdetails').DataTable();
        //for (var i = 0; i < rows.length; i++) {
        //    var sn = dtTable.cells({ row: i, column: 3 }).data()[0];
        //    $('input[id=txtStkOQty]').each(function () {
        //        if (sn == itmstkid && $(this).val() == Val) {
        //            var row = $(this).closest('tr');
        //            if (revtqty == 0) {
        //                var num = row.find('#txtStkOQty').val();
        //                row.find('#txtStkOQty').focus().val('').val(num);
        //            }
        //            else if (revtqty > 0) {
        //                row.find('#txtStkOQty').focus().val(revtqty);
        //            }
        //            return true;
        //        }
        //    });
        //}


    });
    $(document).on('change', '.loadsizelist', function () {
        debugger;
        var table = $('#tblEDItemdetails').DataTable();

        var CSno = table.row($(this).parents('tr')).data()["SNo"];
        var IId = table.row($(this).parents('tr')).data()["Itemid"];
        var CId = table.row($(this).parents('tr')).data()["Colorid"];
        var SId = table.row($(this).parents('tr')).data()["Plansizeid"];
        var Balance = table.row($(this).parents('tr')).data()["allow"];


        var val = $(this).val();

        var oldind = -1;
        var fs = '';
        for (var x = 0; x < SizeL.length; x++) {
            if (SizeL[x].SizeId == val) {
                fs = SizeL[x].Size;
                oldind = x;
            }
        }

        $.each(EItemList, function () {
            if (this.SNo == CSno) {
                this.Size = fs;
                this.Sizeid = val;
            }
        });


        $.each(OSItemList, function () {
            if (this.OItemid == IId && this.OColorid == CId && this.Plansizeid == SId) {
                this.OSizeid = val;
                this.OSize = fs;
            }
        });



        OItemList = $.grep(OSItemList, function (v) {
            return (v.OItemid === IId && v.OColorid === CId && v.Plansizeid === SId);
        });
        loadDelOrderTable(OItemList);

        var ItmId = OItemList[0]['OItemid'];
        var ClrId = OItemList[0]['OColorid'];
        var SzId = OItemList[0]['OSizeid'];
        var uom = OItemList[0]['Uomid'];
        var Stkempty = [];
        Stkempty = SSItemList;

        Stkempty = $.grep(SSItemList, function (v) {
            return (v.SItemid == ItmId && v.SColorid == ClrId && v.SSizeid == SzId && v.SUomid == uom);
        });

        SItemList = Stkempty;
        loadDelStockTable(SItemList);

    });
});


function LoadMainGrid() {

    debugger;

    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var USType = $('input[name="Local"]:checked').attr('value');
    var OType = $('input[name="MOType"]:checked').attr('value');
    var POType = $('input[name="PoType"]:checked').attr('value');
    //var CompId = $('#ddlMCompany').val();

    var CompId = $('#ddlMCompany').val();

    if (CompId == null) {
        CompId = DCompid;
    } else {
        CompId = $('#ddlMCompany').val();
    }


    var IssId = $('#ddlMIssueNo').val();
    var DesId = $('#ddlMDesp').val();
    var OrdNo = "";
    var ONo = $('select#ddlMOrderNo option:selected').text();

    if (ONo == "--Select OrderNo--") {
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

        RefNo = $('select#ddlMRefNo option:selected').val();
    }

    var menufilter = USType + ',' + OType + ',' + POType + ',' + FDate + ',' + TDate + ',' + CompId + ',' + OrdNo + ',' + RefNo + ',' + DesId + ',' + IssId ;
    localStorage.setItem('StoreDeliveryMainFilter', menufilter);

    $.ajax({
        url: "/StoreIssue/GetMainLoad",
        data: JSON.stringify({ unit_or_other: USType, Job_Mac_Gen: OType, ItemType: POType, FromDate: FDate, ToDate: TDate, Companyid: CompId, OrderNo: OrdNo, RefNo: RefNo, desunitid: DesId, IssueId: IssId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {

            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");
           
            var inputcount = 0;
            $('#tblMainDelidetails tr').each(function () {
                inputcount++;
            });
            if (inputcount > 0) {
                //$('#tblYarndetails').DataTable().destroy();
                var table = $('#tblMainDelidetails').DataTable();
                var rows = table.clear().draw();
                $('#tblMainDelidetails').DataTable().rows.add(dataSet);
                $('#tblMainDelidetails').DataTable().columns.adjust().draw();
            }
            else {

                $('#tblMainDelidetails').DataTable({
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
                             { title: "IssueId", "visible": false },
                             { title: "Despatch Location" },
                             { title: "Unit/Supplier" },
                             { title: "Issue No" },
                             { title: "Date" },
                             { title: "Reference" },
                             { title: "RIssId", "visible": false },
                             { title: "Action" },

                    ]

                });
            }
            $(document).ready(function () {
                var table = $('#tblMainDelidetails').DataTable();

                $('#tblMainDelidetails tbody').on('click', 'tr', function () {
                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');
                    }
                    else {
                        table.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');
                    }
                });


            });
            //CheckRights("StoresDelivery");
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadMainGridFromBack() {
    debugger;
    var fill = localStorage.getItem('StoreDeliveryMainFilter');
    var fillobj = [];
    fillobj = fill.split(",");

    $('#txtFromDate').val(fillobj[3]);
    $('#txtToDate').val(fillobj[4]);

    if (fillobj[0] == 'P') {
        $('#optMU').prop('checked', true);
    } else {
        $('#optMSR').prop('checked', true);
    }

    if (fillobj[1] == 'B') {
        $('#optMB').prop('checked', true);
    } else if (fillobj[1] == 'S') {
        $('#optMS').prop('checked', true);
    }
    else if (fillobj[1] == 'G') {
        $('#optMG').prop('checked', true);
    }
    else if (fillobj[1] == 'R') {
        $('#optMSL').prop('checked', true);
    }


    if (fillobj[2] == 'L') {
        $('#optML').prop('checked', true);
    } else if (fillobj[2] == 'Y') {
        $('#optMY').prop('checked', true);
    }
    else if (fillobj[2] == 'A') {
        $('#optMA').prop('checked', true);
    }

    $.ajax({
        url: "/StoreIssue/GetMainLoad",
        data: JSON.stringify({ unit_or_other: fillobj[0], Job_Mac_Gen: fillobj[1], ItemType: fillobj[2], FromDate: fillobj[3], ToDate: fillobj[4], Companyid: fillobj[5], OrderNo: fillobj[6], RefNo: fillobj[7], desunitid: fillobj[8], IssueId: fillobj[9] }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {

            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");

            var inputcount = 0;
            $('#tblMainDelidetails tr').each(function () {
                inputcount++;
            });
            if (inputcount > 0) {
                //$('#tblYarndetails').DataTable().destroy();
                var table = $('#tblMainDelidetails').DataTable();
                var rows = table.clear().draw();
                $('#tblMainDelidetails').DataTable().rows.add(dataSet);
                $('#tblMainDelidetails').DataTable().columns.adjust().draw();
            }
            else {

                $('#tblMainDelidetails').DataTable({
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
                             { title: "IssueId", "visible": false },
                             { title: "Despatch Location" },
                             { title: "Unit/Supplier" },
                             { title: "Issue No" },
                             { title: "Date" },
                             { title: "Reference" },
                             { title: "RIssId", "visible": false },
                             { title: "Action" },

                    ]

                });
            }
            $(document).ready(function () {
                var table = $('#tblMainDelidetails').DataTable();

                $('#tblMainDelidetails tbody').on('click', 'tr', function () {
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


function RadioMBClick() {
    var MOType = $('input[name="MOType"]:checked').attr('value');
    if (MOType == "R") {
        $('#MSplOId').show();
    } else {
        $('#MSplOId').hide();

    }
}

$(document).ready(function () {
    $("#tblEDItemdetails ").dataTable().find("tbody").on('click', 'tr', function () {
        index = (this.rowIndex) - 1;
    });
});

$(document).ready(function () {
    $("#tblOrderdetails ").dataTable().find("tbody").on('click', 'tr', function () {
        Oindex = (this.rowIndex) - 1;
    });
});

$(document).ready(function () {
    $("#tblStockdetails ").dataTable().find("tbody").on('click', 'tr', function () {
        Sindex = (this.rowIndex) - 1;
    });
});
function RadioAADClick() {
    var ADY = $('input[name="ADType"]:checked').attr('value');

    if (ADY == "P") {
        LoadCompanyUnitDDL("#ddlAPUnit");
    } else if (ADY == "S") {
        LoadSupplierDDL("#ddlAPUnit");

    }
}
function LoadMainOrderDetails(Pid) {



    $.ajax({
        url: "/StoreIssue/LoadMainOrderdet",
        data: JSON.stringify({ IssId: Pid }),
        type: "POST",
        async: false,
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;

            var ord = "";
            var ref = "";
            var sty = "";
            for (var t = 0; t < obj.length; t++) {
                var od = obj[t].OrderNo;
                var re = obj[t].RefNo;
                var st = obj[t].Style;
                if (ord == '') {
                    ord = od;
                }
                else {
                    ord = ord + "," + od;
                }

                if (ref == '') {
                    ref = re;
                }
                else {
                    ref = ref + "," + re;
                }

                if (sty == '') {
                    sty = st;
                }
                else {
                    sty = sty + "," + st;
                }

            }
            $('#txtmainOrdno').val(ord);
            $('#txtmainrefno').val(ref);
            $('#txtmainstyle').val(sty);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}
function LoadASplOrder() {
    $('#SplOId').show();
}

function LoadAOrder() {
    $('#SplOId').hide();
    $("#optAU").prop("checked", true);
    $("#optAR").prop("disabled", true);
    $("#optAU").prop("disabled", false);
    var ADLType = $('input[name="ADType"]:checked').attr('value');

    if (ADLType == "P") {
        LoadCompanyUnitDDL("#ddlAPUnit");
    } else {

        LoadSupplierDDL("#ddlAPUnit");
    }
}
function LoadJAOrder() {
    $('#SplOId').hide();
    $("#optAR").prop("disabled", false);
    $("#optAU").prop("disabled", false);

    var ADLType = $('input[name="ADType"]:checked').attr('value');

    if (ADLType == "P") {
        LoadCompanyUnitDDL("#ddlAPUnit");
    } else {

        LoadSupplierDDL("#ddlAPUnit");
    }
}

function LoadADetails() {
    $('#tblAddDelyDetails').DataTable().destroy();
    LoadAddItemDetails();
}

function LoadDetails() {

    var Compid = $("#ddlACompany").val();
    var ProdSuid = $("#ddlAPUnit").val();
    if (Compid == 0) {
        //alert("Please Select Company..");
        var msg = 'Please Select Company...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return;
    }
    if (ProdSuid == 0) {
        //alert("Please Select Unit/Supplier..");
        var msg = 'Please Select Unit/Supplier...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return;
    }


    LoadAddItemDetails();
}

function RadioAPClick() {
    //LoadAddItemDetails();
}

function LoadAddItemDetails() {
    debugger;

    var CompId = $('#ddlACompany').val();
    var BuyId = $('#ddlABuyer').val();
    var IgId = $('#ddlAItemGroup').val();
    var StoreId = $('#ddlAStore').val();
    var ProdId = $('#ddlAPUnit').val();
    var ADLType = $('input[name="ADType"]:checked').attr('value');
    var PType = $('input[name="APType"]:checked').attr('value');
    var OType = $('input[name="AOType"]:checked').attr('value');



    var OrdNo = "";
    var ONo = $("#ddlAOrderNo option:selected").val();

    if (ONo == 0) {
        OrdNo == "";
    }
    else {

        OrdNo = $("#ddlAOrderNo option:selected").text();
    }

    var RefNo = "";
    var RNo = $('select#ddlARefNo option:selected').val();

    if (RNo == 0) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlARefNo option:selected').text();
    }


    if (MOrd == "0") {
        var MCOrd = "";
    }
    else {
        var MCOrd = MOrd;
    }

    $.ajax({
        url: "/StoreIssue/LoadAddDetails",
        data: JSON.stringify({ Companyid: CompId, Buyerid: BuyId, OrderNo: OrdNo, RefNo: RefNo, FromStoreUnitID: StoreId, Companyunitid: ProdId, Job_Mac_Gen: OType, ItemType: PType, unit_or_other: ADLType, IgroupId: MCOrd }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            ItemList = result;
            loadADItemTable(ItemList);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function loadADItemTable(ItemList) {

    $('#tblAddDelyDetails').DataTable().destroy();
    debugger;

    $('#tblAddDelyDetails').DataTable({
        // "order": [[8, "asc"]],
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
        columns: [

            { title: "JobId", data: "JobMasId", "visible": false },
            { title: "Work Order No", data: "Joborderno" },
            {
                title: "Order Date", data: "ODate",
                render: function (data) {
                    return (moment(data).format("DD/MM/YYYY"));
                }
            },
            { title: "Order No", data: "OrderNo" },
            {
                title: "Include", data: "JobMasId",
                render: function (data) {

                    return '<input type="checkbox" id="txtStyleRowId" class="editor-active"  style="width: 50px;text-align: center;"  value=' + data + ' onclick="myfunc(this.value);">';

                },
            },
        ]
    });
}

function myOrder(Val) {

    var foo = [];
    $('#ddlAItemGroup :selected').each(function (i, selected) {
        foo[i] = $(selected).val();

        MOrd = MOrd + "," + foo[i];


    });


}


function myfunc(Val) {

    MJobRowID = MJobRowID + "," + Val;

}

function LoadDelyJobId() {

    MJobRowID;

    LMode = 0;

    var Comp = $('select#ddlACompany option:selected').text();
    var Unit = $('select#ddlAPUnit option:selected').text();

    var CompUnitId = $('#ddlAPUnit').val();
    var CompId = $('#ddlACompany').val();

    if (CompId == 0) {
        //alert("Please Select Company then Proceed...");
        var msg = 'Please Select Company then Proceed...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    if (CompUnitId == 0) {
        //alert("Please Select Company Unit then Proceed...");
        var msg = 'Please Select Company Unit then Proceed...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    var StoreId = $('#ddlAStore').val();
    if (StoreId == 0 && validatestore == "True") {
        //alert('Please select Store..');
        var msg = 'Please Select Store...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }


    $('#txtCompany').val(Comp);
    $('#txtUnit').val(Unit);

    GenerateNumber();
    //LoadStorefromcompany();

    $('#ddlAProcess').attr('disabled', false);
   
    $('#optBom').attr('disabled', false);
    $('#optPrc').attr('disabled', false);
    $('#optBom').prop('checked', true);
    var RCType = $('input[name="RCType"]:checked').attr('value');
    if (RCType == 'B') {
        $('#ddlAProcess').attr('disabled', true);
        $('#ddlAProcess').val(0).trigger('change');
        $('#btnloaditem').attr('disabled', true);
    } else if (RCType == 'R') {
        $('#ddlAProcess').attr('disabled', false);
        $('#btnloaditem').attr('disabled', false);
    }
   
    LoadDelyItemDetails(MJobRowID);
    var ItmId = 0;
    var ClrId = 0;
    var SzId = 0;
    var UomId = 0;
    var Qty = 0;

    $('#myModal').modal('hide');
    $('#myModal1').modal('show');

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

    $('#txtEntryDate').val(Fdatestring);
    $('#txtFromDate').val(MainFDate);
    $('#txtToDate').val(Fdatestring);

}

var table, column, compId, Docum;

function GenerateNumber(table, column, compId, Docum) {

    debugger;


    var PType = $('input[name="APType"]:checked').attr('value');
    var OType = $('input[name="AOType"]:checked').attr('value');

    if (OType == 'W' && PType == 'L') {
        table = "Stores_Issue_Mas",
        column = "Issueno",
        compId = $('#ddlACompany').val();
        Docum = 'STORES DELIVERY'
    }
    else if (OType == 'W' && PType == 'A') {
        table = "Stores_Issue_Mas",
        column = "Issueno",
        compId = $('#ddlACompany').val();
        Docum = 'STORES DELIVERY - ACCESSORY'
    } else if (OType == 'W' && PType == 'Y') {
        table = "Stores_Issue_Mas",
        column = "Issueno",
        compId = $('#ddlACompany').val();
        Docum = 'STORES DELIVERY - YARN'
    } if (OType == 'P' && PType == 'L') {
        table = "Stores_Issue_Mas",
        column = "Issueno",
        compId = $('#ddlACompany').val();
        Docum = 'STORES DELIVERY'
    }
    else if (OType == 'P' && PType == 'A') {
        table = "Stores_Issue_Mas",
        column = "Issueno",
        compId = $('#ddlACompany').val();
        Docum = 'STORES DELIVERY - ACCESSORY'
    } else if (OType == 'P' && PType == 'Y') {
        table = "Stores_Issue_Mas",
        column = "Issueno",
        compId = $('#ddlACompany').val();
        Docum = 'STORES DELIVERY - YARN'
    } else if (OType == 'G' && PType == 'A') {
        table = "Stores_Issue_Mas",
        column = "Issueno",
        compId = $('#ddlACompany').val();
        Docum = 'STORES DELIVERY - GENERAL ACCESSORY'
    } else if (OType == 'G' && PType == 'Y') {
        table = "Stores_Issue_Mas",
        column = "Issueno",
        compId = $('#ddlACompany').val();
        Docum = 'STORES DELIVERY - GENERAL YARN'
    } else if (OType == 'G' && PType == 'L') {
        table = "Stores_Issue_Mas",
        column = "Issueno",
        compId = $('#ddlACompany').val();
        Docum = 'STORES DELIVERY - GENERAL'
    } else if (OType == 'S' && PType == 'A') {
        table = "Stores_Issue_Mas",
        column = "Issueno",
        compId = $('#ddlACompany').val();
        Docum = 'SAMPLE STORES DELIVERY - ACCESSORY'
    } else if (OType == 'S' && PType == 'Y') {
        table = "Stores_Issue_Mas",
        column = "Issueno",
        compId = $('#ddlACompany').val();
        Docum = 'SAMPLE STORES DELIVERY - YARN'
    } else if (OType == 'S' && PType == 'L') {
        table = "Stores_Issue_Mas",
        column = "Issueno",
        compId = $('#ddlACompany').val();
        Docum = 'SAMPLE STORES DELIVERY'
    } else if (OType == 'R' && PType == 'L') {
        table = "Stores_Issue_Mas",
        column = "Issueno",
        compId = $('#ddlACompany').val();
        Docum = 'STORES DELIVERY'
    }
    else if (OType == 'R' && PType == 'A') {
        table = "Stores_Issue_Mas",
        column = "Issueno",
        compId = $('#ddlACompany').val();
        Docum = 'STORES DELIVERY - ACCESSORY'
    } else if (OType == 'R' && PType == 'Y') {
        table = "Stores_Issue_Mas",
        column = "Issueno",
        compId = $('#ddlACompany').val();
        Docum = 'STORES DELIVERY - YARN'
    }
    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $('#txtIssueNo').val(result.Value);
        }
    });
}

function LoadDelyItemDetails(MJobRowID) {
    debugger;

    var OType = $('input[name="AOType"]:checked').attr('value');
    typeofg = OType;
    var ITType = $('input[name="APType"]:checked').attr('value');
    var ItemGroup = IGroup;
    var StoreId = $('#ddlAStore').val();
    var Procsid = $('#ddlAProcess option:selected').val();

    //var Procsid = 16110;

    $.ajax({
        url: "/StoreIssue/GetDelyItemDetails",
        data: JSON.stringify({ JMasId: MJobRowID, Job_Mac_Gen: OType, ItemType: ITType, ItemGroup: ItemGroup, Storeid: StoreId, Processid: Procsid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            EItemList = result;
            loadDelyItemTable(EItemList);

            var ItmId = EItemList[0].Itemid;
            var ClrId = EItemList[0].Colorid;
            var SzId = EItemList[0].Sizeid;
            var UomId = EItemList[0].Uomid;
            var Qty = 0;
            var ESNo = EItemList[0].SNo;
            var Iid = 0;
            var Cid = 0;
            var Sid = 0;
            var Uid = 0;

            var ONo = 0;

            if (OType != "G") {
                $("#OrdertblId").show();
                LoadDelOrderDetails(MJobRowID, ItmId, ClrId, SzId, UomId, Qty, ESNo, Procsid);


                LoadDelOrderSaveDetails(MJobRowID, Iid, Cid, Sid, Uid, Qty, ESNo, Procsid);
                LoadDelStockSaveDetails(MJobRowID, Iid, Cid, Sid, Uid, Qty, ONo, Procsid);
            } else {
                $("#OrdertblId").hide(); 


                //LoadDelStockDetails(MJobRowID, ItmId, ClrId, SzId, UomId, Qty, ONo);
                //LoadDelStockSaveDetails(MJobRowID, ItmId, ClrId, SzId, UomId, Qty, ONo);

                //LoadDelStockDetails(MJobRowID, Iid, Cid, Sid, Uid, Qty, ONo);
                LoadDelStockSaveDetails(MJobRowID, Iid, Cid, Sid, Uid, Qty, ONo, Procsid);
            }
            //LoadDelStockDetails(MJobRowID, ItmId, ClrId, SzId, UomId, Qty);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function loadDelyItemTable(EItemList) {

    // $('#tblEDItemdetails').DataTable().destroy();
    debugger;
    var inputcount = 0;
    $('#tblEDItemdetails tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tblEDItemdetails').DataTable().destroy();
    }
    $('#tblEDItemdetails').empty();

    var table = $('#tblEDItemdetails').DataTable({
        //"order": [[1, "asc"]],
        data: EItemList,
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

             { title: "IssDetId", data: "IssueDetId", "visible": false },
            { title: "IssId", data: "IssueId", "visible": false },
            { title: "S.No", data: "SNo" },
            { title: "Item", data: "Item" },
            { title: "Color", data: "Color" },
            {
                title: "Size", data: "Size",
                render: function (data, type, row) {
                    var $select = $("<select></select>", {
                        "id": "loadstylelist",
                        "value": data,
                        "class": "form-control loadsizelist select2",
                        "disabled":"disabled",
                        "style":"width:100px;",
                        //onchange: "loadcolorlist(this.value);"
                    });

                    $.each(SizeL, function (k, v) {
                        var $option = $("<option></option>", {
                            "text": v.Size,
                            "value": v.SizeId,
                        });

                        if (data === v.Size) {
                            $option.attr("selected", "selected")
                        }
                        $select.append($option);
                    });
                    return $select.prop("outerHTML");
                }
            },
            { title: "Pur Unit", data: "Uom" },
            { title: "Sec Unit", data: "SUom" },

             { title: "Allowance", data: "AllowValue" },
              { title: "Balance+Allow", data: "BalQty" },
            {
                title: "Iss Qty", data: "Quantity",
                render: function (data) {

                    return '<input type="text" id="txtRQty" class="calcIss form-control"  style="width: 50px;text-align: center;"  value=' + data + ' disabled>';

                },
            },

            {
                title: "Excess Qty", data: "ExcessQty",
                render: function (data) {

                    return '<input type="text" id="txtExQty" class="form-control"  style="width: 50px;text-align: center;"  value=' + data + ' disabled>';

                },
            },

             { title: "ItemId", data: "Itemid", "visible": false },
             { title: "ColorId", data: "Colorid", "visible": false },
             { title: "SizeId", data: "Sizeid", "visible": false },
             { title: "PUnitId", data: "Uomid", "visible": false },
             { title: "SUnitId", data: "Sec_uomid", "visible": false },
             { title: "Plan Size", data: "Plansize" },
                 //{
                 //    title: "ACTION", "mDataProp": null,
                 //    "sDefaultContent": '<div style="display:inline-flex;"><button type="button" data-toggle="tooltip" data-placement="top" title="View Item" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnItemview btn btn-round btn-info"> <i class="fa fa-eye"></i> </button></div>'
                 //},
        ]
    });



    $("#tblEDItemdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblEDItemdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });

}

function LoadDelOrderDetails(MJobRowID, ItmId, ClrId, SizeId, PUomId, OQty, ESNo,Processid) {
    debugger;


    var OType = $('input[name="AOType"]:checked').attr('value');
    var ITType = $('input[name="APType"]:checked').attr('value');

    $.ajax({
        url: "/StoreIssue/GetDelyOrderDetails",
        data: JSON.stringify({ JMasId: MJobRowID, Job_Mac_Gen: OType, ItemType: ITType, OItemid: ItmId, OColorid: ClrId, OSizeid: SizeId, OUomid: PUomId, ESNo: ESNo, Processid: Processid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {



            OItemList = result;
            loadDelOrderTable(OItemList);

            var ItmId = OItemList[0].OItemid;
            var ClrId = OItemList[0].OColorid;
            var SzId = OItemList[0].OSizeid;
            var UomId = OItemList[0].OUomid;
            var JMasId = OItemList[0].JoMasId;
            var ONo = OItemList[0].ISno;
            var Qty = 0;


            LoadDelStockDetails(JMasId, ItmId, ClrId, SzId, UomId, Qty, ONo);


            //var Qty = 0;

            //var ItmId = OItemList[0].OItemid;
            //var ClrId = OItemList[0].OColorid;
            //var SzId = OItemList[0].OSizeid;
            //var UomId = OItemList[0].OUomid;
            //var JMasId = OItemList[0].JoMasId;
            //var ONo = 0;
            //LoadDelStockSaveDetails(MJobRowID, ItmId, ClrId, SzId, UomId, Qty,ONo);



            //LoadDelStockSaveDetails(MJobRowID, ItmId, ClrId, SzId, UomId, Qty);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function LoadDelOrderSaveDetails(MJobRowID, ItmId, ClrId, SizeId, PUomId, OQty, ESNo, Processid) {
    debugger;

    var ESNo = 0;
    var OType = $('input[name="AOType"]:checked').attr('value');
    var ITType = $('input[name="APType"]:checked').attr('value');

    $.ajax({
        url: "/StoreIssue/GetDelyOrderDetails",
        data: JSON.stringify({ JMasId: MJobRowID, Job_Mac_Gen: OType, ItemType: ITType, OItemid: ItmId, OColorid: ClrId, OSizeid: SizeId, OUomid: PUomId, ESNo: ESNo, Processid: Processid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {


            OSItemList = result;
            loadDelOrderSaveTable(OSItemList);


        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}


function loadDelOrderTable(OItemList) {

    //$('#tblOrderdetails').DataTable().destroy();
   // debugger;
    var inputcount = 0;
    $('#tblOrderdetails tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tblOrderdetails').DataTable().destroy();
    }
    $('#tblOrderdetails').empty();

    var table = $('#tblOrderdetails').DataTable({
        data: OItemList,
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
               { title: "Sno", data: "SoNo", "visible": false },
             { title: "ISno", data: "ISno", "visible": false },
            { title: "IssueOrdID", data: "IssueOrdID", "visible": false },
            { title: "IssueID", data: "IssueID", "visible": false },
            { title: "IssueDetID", data: "IssueDetID", "visible": false },
            { title: "Order No", data: "OrderNo" },
            { title: "Ref No", data: "RefNo" },
             { title: "Work Ord No", data: "WorkOrd", "visible": false },
              { title: "Bal Qty", data: "BalQty" },
          {
              title: "Issue Qty", data: "IssueQty",
              render: function (data) {

                  return '<input type="text" id="txtOQty" class="calcsepquan form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

              },
          },

             {
                 title: "Exe Qty", data: "ExcessQty",
                 render: function (data) {

                     return '<input type="text" id="Excsqty" class="form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                 },
             },

              { title: "itemid", data: "OItemid", "visible": false },
               { title: "colorid", data: "OColorid", "visible": false },
                { title: "sizeid", data: "OSizeid", "visible": false },
                 { title: "uomid", data: "OUomid", "visible": false },
                  { title: "JobId", data: "JoMasId", "visible": false },
                  { title: "Plan Size", data: "Plansize" },
        //{
        //    title: "ACTION", "mDataProp": null,
        //    "sDefaultContent": '<div style="display:inline-flex;"><button type="button" data-toggle="tooltip" data-placement="top" title="View Item" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnStockview btn btn-round btn-info"> <i class="fa fa-eye"></i> </button></div>'
        //},
        ]
    });
    $("#tblOrderdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblOrderdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}

function loadDelOrderSaveTable(OSItemList) {

    //$('#tblOrderSavedetails').DataTable().destroy();
    debugger;
    var inputcount = 0;
    $('#tblOrderSavedetails tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tblOrderSavedetails').DataTable().destroy();
    }
    $('#tblOrderSavedetails').empty();

    var table = $('#tblOrderSavedetails').DataTable({
        data: OSItemList,
        scrollY: 300,
        scrollCollapse: true,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        columns: [

             { title: "Sno", data: "SoNo" },
              { title: "ISno", data: "ISno" },

            { title: "IssueOrdID", data: "IssueOrdID" },
            { title: "IssueID", data: "IssueID" },
            { title: "IssueDetID", data: "IssueDetID" },
            { title: "OrderNo", data: "OrderNo" },
             { title: "WorkOrdNo", data: "WorkOrd" },
              { title: "Bal Qty", data: "BalQty" },
          {
              title: "IssueQty", data: "IssueQty",

          },

             {
                 title: "ExcessQty", data: "ExcessQty",

             },

              { title: "itemid", data: "OItemid", "visible": false },
               { title: "colorid", data: "OColorid", "visible": false },
                { title: "sizeid", data: "OSizeid", "visible": false },
                 { title: "uomid", data: "OUomid", "visible": false },
                  { title: "JobId", data: "JoMasId" },
        {
            title: "ACTION", "mDataProp": null,
            "sDefaultContent": '<div style="display:inline-flex;"><button type="button" data-toggle="tooltip" data-placement="top" title="View Item" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnStockview btn btn-round btn-info"> <i class="fa fa-eye"></i> </button></div>'
        },
        ]
    });
    $("#tblOrderSavedetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblOrderSavedetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}

function LoadDelStockDetails(MJobRowID, ItmId, ClrId, SizeId, PUomId, OQty, ONo) {
    debugger;


    var OType = $('input[name="AOType"]:checked').attr('value');
    var ITType = $('input[name="APType"]:checked').attr('value');
    var compId = $('#ddlACompany').val();
    var StoreId = $('#ddlAStore').val();
    var Jobno = "";

    $.ajax({
        url: "/StoreIssue/GetDelyStockDetails",
        data: JSON.stringify({ JMasId: MJobRowID, Job_Mac_Gen: OType, ItemType: ITType, Companyid: compId, FromStoreUnitID: StoreId, Joborderno: Jobno, SItemid: ItmId, SColorid: ClrId, SSizeid: SizeId, SUomid: PUomId, ONo: ONo }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {


            SItemList = result;
            loadDelStockTable(SItemList);


        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadDelStockSaveDetails(MJobRowID, ItmId, ClrId, SizeId, PUomId, OQty, ONo,Processid) {
    debugger;


    var OType = $('input[name="AOType"]:checked').attr('value');
    var ITType = $('input[name="APType"]:checked').attr('value');
    var compId = $('#ddlACompany').val();
    var StoreId = $('#ddlAStore').val();
    var Jobno = "";

    $.ajax({
        url: "/StoreIssue/GetDelyStockDetails",
        data: JSON.stringify({ JMasId: MJobRowID, Job_Mac_Gen: OType, ItemType: ITType, Companyid: compId, FromStoreUnitID: StoreId, Joborderno: Jobno, SItemid: ItmId, SColorid: ClrId, SSizeid: SizeId, SUomid: PUomId, ONo: ONo, Processid: Processid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;

            SSItemList = result;
            for (var e = 0; e < SSItemList.length; e++) {
                for (var r = 0; r < SItemList.length; r++) {
                    if (SSItemList[e].TransNo == SItemList[r].TransNo) {
                        SSItemList[e].ONo = SItemList[r].ONo;
                    }
                }
            }
            loadDelStockSaveTable(SSItemList);


        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function loadDelStockTable(SItemList) {

    //$('#tblStockdetails').DataTable().destroy();
    //debugger;
    var inputcount = 0;
    $('#tblStockdetails tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tblStockdetails').DataTable().destroy();
    }
    $('#tblStockdetails').empty();

    var table = $('#tblStockdetails').DataTable({
        data: SItemList,
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
              { title: "Sno", data: "ONo", "visible": false },
            { title: "IssueStockID", data: "IssueStockID", "visible": false },
            { title: "IssueDetId", data: "IssueDetId", "visible": false },
            { title: "ItemStockId", data: "ItemStockId", "visible": false },
            { title: "IssueOrdId", data: "IssueOrdId", "visible": false },
            { title: "Trans No", data: "TransNo" },
            { title: "Stock Qty", data: "StockQty" },


             {
                 title: "Issue Qty", data: "quantity",
                 render: function (data) {

                     return '<input type="text" id="txtStkOQty" class="calcStockqty form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';

                 },
             },
           { title: "Sec_qty", data: "Sec_qty", "visible": false },
            { title: "MarkRate", data: "MarkRate" },

              { title: "itemid", data: "SItemid", "visible": false },
               { title: "colorid", data: "SColorid", "visible": false },
                { title: "sizeid", data: "SSizeid", "visible": false },
                 { title: "uomid", data: "SUomid", "visible": false },
                 { title: "Jmasid", data: "jmasid", "visible": false },
                 { title: "Plan Size", data: "Plansize" },

        ]
    });
}


function loadDelStockSaveTable(SSItemList) {

    //$('#tblStockSavedetails').DataTable().destroy();
    //debugger;
    var inputcount = 0;
    $('#tblStockSavedetails tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tblStockSavedetails').DataTable().destroy();
    }
    $('#tblStockSavedetails').empty();

    var table = $('#tblStockSavedetails').DataTable({
        data: SSItemList,
        scrollY: 300,
        scrollCollapse: true,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        columns: [
                    { title: "Sno", data: "ONo" },
            { title: "IssueStockID", data: "IssueStockID", "visible": false },
            { title: "IssueDetId", data: "IssueDetId", "visible": false },
            { title: "ItemStockId", data: "ItemStockId" },
            { title: "IssueOrdId", data: "IssueOrdId", "visible": false },
            { title: "TransNo", data: "TransNo" },
            { title: "StockQty", data: "StockQty" },
             { title: "IssueQty", data: "quantity" },
           { title: "Sec_qty", data: "Sec_qty", "visible": false },
            { title: "MarkRate", data: "MarkRate" },

              { title: "itemid", data: "SItemid", "visible": false },
               { title: "colorid", data: "SColorid", "visible": false },
                { title: "sizeid", data: "SSizeid", "visible": false },
                 { title: "uomid", data: "SUomid", "visible": false },
        { title: "Jmasid", data: "jmasid" },
        ]
    });
}

//$(document).on('click', '.btnItemview', function () {
//    debugger;


//    var OType = $('input[name="AOType"]:checked').attr('value');

//    var table = $('#tblEDItemdetails').DataTable();

//    var ItmId = table.row($(this).parents('tr')).data()["Itemid"];
//    var ClrId = table.row($(this).parents('tr')).data()["Colorid"];
//    var SzId = table.row($(this).parents('tr')).data()["Sizeid"];
//    var PUId = table.row($(this).parents('tr')).data()["Uomid"];
//    var ESNo = table.row($(this).parents('tr')).data()["SNo"];

//    var OQty = 0;

//    if (OType != "G") {
//        $("#OrdertblId").show();
//        if (GIssId == 0) {

//            // LoadDelOrderDetails(MJobRowID, ItmId, ClrId, SzId, PUId, OQty, ESNo)

//            //OItemList = OSItemList;

//            //OItemList = $.grep(OItemList, function (v) {
//            //   // if(v.
//            //   return (v.OItemid === ItmId && v.OColorid === ClrId && v.OSizeid === SzId && v.OUomid === PUId );
//            //   // return (v.SItemid === ItmId && v.SColorid === ClrId && v.SSizeid === SzId && v.SUomid === PUId );
//            //});

//            //loadDelOrderTable(OItemList);

//            OItemList = [];
//            SItemList = [];
//            var ctry = [];
//            ctry = OSItemList;
//            ctry = $.grep(ctry, function (e) {
//                return e.OItemid == ItmId && e.OColorid == ClrId && e.OSizeid == SzId;
//            });
//            OItemList = ctry;
//            loadDelOrderTable(OItemList);

//            var ctry = [];
//            ctry = SSItemList;
//            ctry = $.grep(ctry, function (e) {
//                return e.SItemid == ItmId && e.SColorid == ClrId && e.SSizeid == SzId;
//            });
//            SItemList = ctry;
//            loadDelStockTable(SItemList);

//            // LoadDelStockDetails(MJobRowID, ItmId, ClrId, SzId, PUId, OQty)
//        } else {
//            // LoadEditOrderDetails(GIssId, ItmId, ClrId, SzId, PUId, GCmpId, GStoreId)
//            //LoadEditDelStockDetails(GIssId, ItmId, ClrId, SzId, PUId, GOType, GCmpId, GStoreId)
//            OItemList = [];
//            SItemList = [];
//            var ctry = [];
//            ctry = OSItemList;
//            ctry = $.grep(ctry, function (e) {
//                return e.OItemid == ItmId && e.OColorid == ClrId && e.OSizeid == SzId;
//            });
//            OItemList = ctry;
//            loadDelOrderTable(OItemList);

//            var ctry = [];
//            ctry = SSItemList;
//            ctry = $.grep(ctry, function (e) {
//                return e.SItemid == ItmId && e.SColorid == ClrId && e.SSizeid == SzId;
//            });
//            SItemList = ctry;
//            loadDelStockTable(SItemList);
//        }


//        //var colorempty = [];
//        //colorempty = OSItemList;

//        //colorempty = $.grep(colorempty, function (v) {
//        //    return (v.OItemid === ItmId && v.OColorid === ClrId && v.OSizeid === SzId && v.OUomid === PUId);
//        //});
//        //$.each(colorempty, function () {

//        //    this.ISno = ESNo;


//        //});
//        //loadDelOrderTable(colorempty);
//        // loadDelOrderTable(colorempty);


//    } else {
//        $("#OrdertblId").hide();
//        if (GIssId == 0) {


//            var JobMasID = "";
//            // LoadDelStockDetails(JobMasID, ItmId, ClrId, SzId, PUId, OQty)
//            SItemList = SSItemList;

//            SItemList = $.grep(SItemList, function (v) {
//                // if(v.
//                return (v.SItemid === ItmId && v.SColorid === ClrId && v.SSizeid === SzId && v.SUomid === PUId);
//                // return (v.SItemid === ItmId && v.SColorid === ClrId && v.SSizeid === SzId && v.SUomid === PUId );
//            });

//            loadDelStockTable(SItemList);

//        } else {
//            LoadEditDelStockDetails(GIssId, ItmId, ClrId, SzId, PUId, GOType, GCmpId, GStoreId)
//            //OItemList = [];
//            //SItemList = [];
//            //var ctry = [];
//            //ctry = OSItemList;
//            //ctry = $.grep(ctry, function (e) {
//            //    return e.OItemid == ItmId && e.OColorid == ClrId && e.OSizeid == SzId;
//            //});
//            //OItemList = ctry;
//            //loadDelOrderTable(OItemList);

//            //var ctry = [];
//            //ctry = SSItemList;
//            //ctry = $.grep(ctry, function (e) {
//            //    return e.SItemid == ItmId && e.SColorid == ClrId && e.SSizeid == SzId;
//            //});
//            //SItemList = ctry;
//            //loadDelStockTable(SItemList);
//        }
//    }


//});
function loadsize() {
    debugger;
    $.ajax({
        url: "/Trims/SizeList",
        data: JSON.stringify({}),
        type: "POST",
        async: false,
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            SizeL = result;
            Szid = SizeL[0].SizeId;
            Sz = SizeL[0].Size;

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}



$(document).ready(function () {

    $('#tblEDItemdetails').on('click', 'tr', function (e) {
     

        var table = $('#tblEDItemdetails').DataTable();
        var row = $(this).closest('tr');
        var data = $('#tblEDItemdetails').dataTable().fnGetData(row);

        //var FSupplierId = data.SupplierId;
        //var FSupplier = data.Supplier;

        var OType = $('input[name="AOType"]:checked').attr('value');

        totalstk = -1;

        var ItmId = data.Itemid;//table.row($(this).parents('tr')).data()["Itemid"];
        var ClrId = data.Colorid;//table.row($(this).parents('tr')).data()["Colorid"];
        var SzId = data.Sizeid;//table.row($(this).parents('tr')).data()["Sizeid"];
        var PUId = data.Uomid;//table.row($(this).parents('tr')).data()["Uomid"];
        var ESNo = data.SNo;//table.row($(this).parents('tr')).data()["SNo"];
        Allowence = data.AllowValue;
        var OQty = 0;


        if (GIssId > 0) {
            OType = GOType;
        }

        if (OType != "G") {
            $("#OrdertblId").show();
            if (GIssId == 0) {

                // LoadDelOrderDetails(MJobRowID, ItmId, ClrId, SzId, PUId, OQty, ESNo)

                //OItemList = OSItemList;

                //OItemList = $.grep(OItemList, function (v) {
                //   // if(v.
                //   return (v.OItemid === ItmId && v.OColorid === ClrId && v.OSizeid === SzId && v.OUomid === PUId );
                //   // return (v.SItemid === ItmId && v.SColorid === ClrId && v.SSizeid === SzId && v.SUomid === PUId );
                //});

                //loadDelOrderTable(OItemList);

                OItemList = [];
                SItemList = [];
                var ctry = [];
                ctry = OSItemList;
                ctry = $.grep(ctry, function (e) {
                    return e.OItemid == ItmId && e.OColorid == ClrId && e.OSizeid == SzId;
                });
                OItemList = ctry;
                loadDelOrderTable(OItemList);

                var ctry = [];
                ctry = SSItemList;
                ctry = $.grep(ctry, function (e) {
                    return e.SItemid == ItmId && e.SColorid == ClrId && e.SSizeid == SzId;
                });
                SItemList = ctry;
                loadDelStockTable(SItemList);

                // LoadDelStockDetails(MJobRowID, ItmId, ClrId, SzId, PUId, OQty)
            } else {
                // LoadEditOrderDetails(GIssId, ItmId, ClrId, SzId, PUId, GCmpId, GStoreId)
                //LoadEditDelStockDetails(GIssId, ItmId, ClrId, SzId, PUId, GOType, GCmpId, GStoreId)
                OItemList = [];
                SItemList = [];
                var ctry = [];
                ctry = OSItemList;
                ctry = $.grep(ctry, function (e) {
                    return e.OItemid == ItmId && e.OColorid == ClrId && e.OSizeid == SzId;
                });
                OItemList = ctry;
                loadDelOrderTable(OItemList);

                var ctry = [];
                ctry = SSItemList;
                ctry = $.grep(ctry, function (e) {
                    return e.SItemid == ItmId && e.SColorid == ClrId && e.SSizeid == SzId;
                });
                SItemList = ctry;
                loadDelStockTable(SItemList);
            }


            //var colorempty = [];
            //colorempty = OSItemList;

            //colorempty = $.grep(colorempty, function (v) {
            //    return (v.OItemid === ItmId && v.OColorid === ClrId && v.OSizeid === SzId && v.OUomid === PUId);
            //});
            //$.each(colorempty, function () {

            //    this.ISno = ESNo;


            //});
            //loadDelOrderTable(colorempty);
            // loadDelOrderTable(colorempty);


        } else {
            $("#OrdertblId").hide();
            if (GIssId == 0) {


                var JobMasID = "";
                // LoadDelStockDetails(JobMasID, ItmId, ClrId, SzId, PUId, OQty)
                SItemList = SSItemList;

                SItemList = $.grep(SItemList, function (v) {
                    // if(v.
                    return (v.SItemid === ItmId && v.SColorid === ClrId && v.SSizeid === SzId && v.SUomid === PUId);
                    // return (v.SItemid === ItmId && v.SColorid === ClrId && v.SSizeid === SzId && v.SUomid === PUId );
                });

                loadDelStockTable(SItemList);

            } else {
                LoadEditDelStockDetails(GIssId, ItmId, ClrId, SzId, PUId, GOType, GCmpId, GStoreId)
                //OItemList = [];
                //SItemList = [];
                //var ctry = [];
                //ctry = OSItemList;
                //ctry = $.grep(ctry, function (e) {
                //    return e.OItemid == ItmId && e.OColorid == ClrId && e.OSizeid == SzId;
                //});
                //OItemList = ctry;
                //loadDelOrderTable(OItemList);

                //var ctry = [];
                //ctry = SSItemList;
                //ctry = $.grep(ctry, function (e) {
                //    return e.SItemid == ItmId && e.SColorid == ClrId && e.SSizeid == SzId;
                //});
                //SItemList = ctry;
                //loadDelStockTable(SItemList);
            }
        }

    });
});


$(document).on('click', '.btnStockview', function () {
    debugger;

    var table = $('#tblOrderdetails').DataTable();

    var ItmId = table.row($(this).parents('tr')).data()["OItemid"];
    var ClrId = table.row($(this).parents('tr')).data()["OColorid"];
    var SzId = table.row($(this).parents('tr')).data()["OSizeid"];
    var PUId = table.row($(this).parents('tr')).data()["OUomid"];
    var JobMasID = table.row($(this).parents('tr')).data()["JoMasId"];
    var Ono = table.row($(this).parents('tr')).data()["SoNo"];

    var OQty = 0;


    if (GIssId == 0) {

        // LoadDelStockDetails(JobMasID, ItmId, ClrId, SzId, PUId, OQty, Ono)


        //loadDelStockSaveTable(SSItemList);
        //var colorempty = [];
        SItemList = SSItemList;

        SItemList = $.grep(SItemList, function (v) {
            // if(v.
            return (v.SItemid === ItmId && v.SColorid === ClrId && v.SSizeid === SzId && v.SUomid === PUId && v.jmasid === JobMasID);
            // return (v.SItemid === ItmId && v.SColorid === ClrId && v.SSizeid === SzId && v.SUomid === PUId );
        });



        loadDelStockTable(SItemList);

    } else {
        LoadEditDelStockDetails(GIssId, ItmId, ClrId, SzId, PUId, GOType, GCmpId, GStoreId)
    }



});



$(document).ready(function () {

    $('#tblOrderdetails').on('click', 'tr', function (e) {
        debugger;
        var table = $('#tblOrderdetails').DataTable();
        var row = $(this).closest('tr');
        var data = $('#tblOrderdetails').dataTable().fnGetData(row);
        var ItmId = data.OItemid; //table.row($(this).parents('tr')).data()["OItemid"];
        var ClrId = data.OColorid; //table.row($(this).parents('tr')).data()["OColorid"];
        var SzId = data.OSizeid; //table.row($(this).parents('tr')).data()["OSizeid"];
        var PUId = data.OUomid; //table.row($(this).parents('tr')).data()["OUomid"];
        var JobMasID = data.JoMasId; //table.row($(this).parents('tr')).data()["JoMasId"];
        var Ono = data.SoNo; //table.row($(this).parents('tr')).data()["SoNo"];
        JobOrdid = data.JoMasId;
        Itemid = data.OItemid;
        Colorid = data.OColorid;
        Sizeid = data.OSizeid;
        var OQty = 0;
        if (GIssId == 0) {
            // LoadDelStockDetails(JobMasID, ItmId, ClrId, SzId, PUId, OQty, Ono)
            //loadDelStockSaveTable(SSItemList);
            //var colorempty = [];
            SItemList = SSItemList;
            SItemList = $.grep(SItemList, function (v) {
                // if(v.
                return (v.SItemid === ItmId && v.SColorid === ClrId && v.SSizeid === SzId && v.SUomid === PUId && v.jmasid === JobMasID);
                // return (v.SItemid === ItmId && v.SColorid === ClrId && v.SSizeid === SzId && v.SUomid === PUId );
            });



            loadDelStockTable(SItemList);

        } else {

            var totstck = 0;
            for (var t = 0; t < SSItemList.length; t++) {
                if (SSItemList[t].SItemid == ItmId && SSItemList[t].SColorid == ClrId && SSItemList[t].SSizeid == SzId && SSItemList[t].SUomid == PUId && SSItemList[t].jmasid == JobMasID) {
                    totstck = totstck + SSItemList[t].StockQty;
                }
            }

            if (totstck == 0) {

                LoadEditDelStockDetails(GIssId, ItmId, ClrId, SzId, PUId, GOType, GCmpId, GStoreId);
            }
            else {

                var ctry = [];
                ctry = SSItemList;
                ctry = $.grep(ctry, function (e) {
                    return e.SItemid == ItmId && e.SColorid == ClrId && e.SSizeid == SzId && e.jmasid == JobOrdid;
                });
                SItemList = ctry;
                loadDelStockTable(SItemList);
            }
        }

    });
});


function ClearAddData() {
    $('#ddlAPUnit').val('0');
    $('#ddlAOrderNo').val('0');
    $('#ddlARefNo').val('0');
    $('#ddlAStore').val('0');
    $('#ddlACompany').val('0');
    $('#ddlABuyer').val('0');
    var tablesize = $('#tblAddDelyDetails').DataTable();
    tablesize.clear().draw();
    window.location.reload();


}

//Valdidation using jquery
function validate() {
    var isValid = true;


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

function Delysave() {

    debugger;

    var res = validate();
    if (res == false) {
        return false;
    }


    if (EItemList.length == 0) {
        //alert("Please Enter the Item Details..");
        var msg = 'Please Enter the Item Details...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    if (SItemList.length == 0) {
        //alert("Please Enter the Stock Details..");
        var msg = 'Please Enter the Stock Details...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    var DSType = $('input[name="DSOType"]:checked').attr('value');
    var OType = $('input[name="AOType"]:checked').attr('value');
    var USType = $('input[name="ADType"]:checked').attr('value');
    var IType = $('input[name="APType"]:checked').attr('value');

    debugger;
    var PType = $('input[name="APType"]:checked').attr('value');

    if (OType == 'W' && PType == 'L') {
        table = "Stores_Issue_Mas",
        column = "Issueno",
        compId = $('#ddlACompany').val();
        Docum = 'STORES DELIVERY'
    }
    else if (OType == 'W' && PType == 'A') {
        table = "Stores_Issue_Mas",
        column = "Issueno",
        compId = $('#ddlACompany').val();
        Docum = 'STORES DELIVERY - ACCESSORY'
    } else if (OType == 'W' && PType == 'Y') {
        table = "Stores_Issue_Mas",
        column = "Issueno",
        compId = $('#ddlACompany').val();
        Docum = 'STORES DELIVERY - YARN'
    } if (OType == 'P' && PType == 'L') {
        table = "Stores_Issue_Mas",
        column = "Issueno",
        compId = $('#ddlACompany').val();
        Docum = 'STORES DELIVERY'
    }
    else if (OType == 'P' && PType == 'A') {
        table = "Stores_Issue_Mas",
        column = "Issueno",
        compId = $('#ddlACompany').val();
        Docum = 'STORES DELIVERY - ACCESSORY'
    } else if (OType == 'P' && PType == 'Y') {
        table = "Stores_Issue_Mas",
        column = "Issueno",
        compId = $('#ddlACompany').val();
        Docum = 'STORES DELIVERY - YARN'
    } else if (OType == 'G' && PType == 'A') {
        table = "Stores_Issue_Mas",
        column = "Issueno",
        compId = $('#ddlACompany').val();
        Docum = 'STORES DELIVERY - GENERAL ACCESSORY'
    } else if (OType == 'G' && PType == 'Y') {
        table = "Stores_Issue_Mas",
        column = "Issueno",
        compId = $('#ddlACompany').val();
        Docum = 'STORES DELIVERY - GENERAL YARN'
    } else if (OType == 'G' && PType == 'L') {
        table = "Stores_Issue_Mas",
        column = "Issueno",
        compId = $('#ddlACompany').val();
        Docum = 'STORES DELIVERY - GENERAL'
    } else if (OType == 'S' && PType == 'A') {
        table = "Stores_Issue_Mas",
        column = "Issueno",
        compId = $('#ddlACompany').val();
        Docum = 'SAMPLE STORES DELIVERY - ACCESSORY'
    } else if (OType == 'S' && PType == 'Y') {
        table = "Stores_Issue_Mas",
        column = "Issueno",
        compId = $('#ddlACompany').val();
        Docum = 'SAMPLE STORES DELIVERY - YARN'
    } else if (OType == 'S' && PType == 'L') {
        table = "Stores_Issue_Mas",
        column = "Issueno",
        compId = $('#ddlACompany').val();
        Docum = 'SAMPLE STORES DELIVERY'
    } else if (OType == 'R' && PType == 'L') {
        table = "Stores_Issue_Mas",
        column = "Issueno",
        compId = $('#ddlACompany').val();
        Docum = 'STORES DELIVERY'
    }
    else if (OType == 'R' && PType == 'A') {
        table = "Stores_Issue_Mas",
        column = "Issueno",
        compId = $('#ddlACompany').val();
        Docum = 'STORES DELIVERY - ACCESSORY'
    } else if (OType == 'R' && PType == 'Y') {
        table = "Stores_Issue_Mas",
        column = "Issueno",
        compId = $('#ddlACompany').val();
        Docum = 'STORES DELIVERY - YARN'
    }
    var oldIssueNo = $('#txtIssueNo').val();
    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var newIssueNo = result.Value;
            if (oldIssueNo != newIssueNo) {
                //alert('Issue No has been changed...');
                var msg = 'Issue Number has been changed...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                $('#txtIssueNo').val(result.Value);
            }

            var objPurSubmit = {

                Issueno: $('#txtIssueNo').val(),
                Companyid: $('#ddlACompany').val(),
                Companyunitid: $('#ddlAPUnit').val(),
                Issuedate: $('#txtEntryDate').val(),//new Date($('#txtEntryDate').val()),
                Unit_supplier_self: DSType,
                desunitid: $('#ddlLoc').val(),
                remarks: $('#txtdescription').val(),
                Job_Mac_Gen: OType,
                issue_Commit: "N",
                reqorstock: "S",
                issueunit: $('#ddlAPUnit').val(),
                Unit_or_other: USType,
                ItemType: IType,
                QualityMade: "N",
                //RequestnerId: $('#txtInWard').val(),
                FromStoreUnitID: $('#ddlAStore').val(),
                CreatedBy: Guserid,
                GatePassVehicle: $('#txtVechicalNo').val(),
                RequestnerId: $('#ddlRequestner').val(),
                Deptid: $('#ddlDepartment').val(),
                StoresDelDet: EItemList,
                StoresDelOrd: OSItemList,
                StoresDelStock: SSItemList,
                Processid: $('#ddlAProcess option:selected').val()
            };
            debugger;
            $("#btnAdd").attr("disabled", true);
            LoadingSymb();
            $.ajax({
                url: "/StoreIssue/Add",
                data: JSON.stringify(objPurSubmit),
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {


                    if (result.Value == true) {
                        AddUserEntryLog('Procurement', 'Stores Delivery', 'ADD', $("#txtIssueNo").val());
                        //alert("Data Saved Sucessfully");
                        //window.location.href = "/StoreIssue/StoreIssueIndex";
                        var msg = 'Data Saved Sucessfully...';
                        var flg = 1;
                        var mod = 0;
                        var url = "/StoreIssue/StoreIssueIndex";
                        AlartMessage(msg, flg, mod, url);
                        //$('#myModal1').modal('hide');
                        //window.location.reload();
                        //$('#tblMainDelidetails').DataTable().destroy();
                        //ListMainUnit();
                        //ListOrderRefNo();
                        //ListDisNo();
                        //ListIssueNo();
                        //LoadMainGrid();
                        //ClearAddData();
                        $('#myModal1').modal('hide');
                        //window.location.reload();
                        //$('#tblMainDelidetails').DataTable().destroy();
                        //ListMainUnit();
                        //ListOrderRefNo();
                        //ListDisNo();
                        //ListIssueNo();
                        //LoadMainGrid();
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
    });
}

function calcIss(Val) {
    debugger;

    //if (OItemList.length == 0 || SItemList.length == 0) {
    //    alert('Please select stock for order info..');
    //    return true;
    //}

    index;

    var currentrowoftcpi = EItemList.slice(index);

    var CSno = currentrowoftcpi[0].SNo;
    var IId = currentrowoftcpi[0].Itemid;
    var CId = currentrowoftcpi[0].Colorid;
    var SId = currentrowoftcpi[0].Sizeid;
    var PUId = currentrowoftcpi[0].Uomid;
    var IssQty = Val;
    var BlQ = currentrowoftcpi[0].BalQty;
    if (Val > BlQ) {
        //alert('Quantity should not exceed Balqty...');
        var msg = 'Quantity should not exceed Balance quantity...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    if (typeofg != "G") {

        $.each(EItemList, function () {
            if (this.SNo == CSno && this.Itemid == IId && this.Colorid == CId && this.Sizeid == SId && this.Uomid == PUId) {
                this.Quantity = IssQty;

            }
        });



        loadDelyItemTable(EItemList);


        if (OSItemList.length > 0) {

            var pid = [];
            var bal = [];
            var qty = [];

            for (var t = 0; t < OSItemList.length; t++) {
                if (OSItemList[t].OItemid == IId && OSItemList[t].OColorid == CId && OSItemList[t].OSizeid == SId && OSItemList[t].OUomid == PUId) {
                    pid.push(OSItemList[t].SoNo);
                    bal.push(OSItemList[t].BalQty);
                    qty.push(OSItemList[t].IssueQty);

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
            for (var u = 0; u < OSItemList.length; u++) {
                for (var r = 0; r < pid.length; r++) {
                    if (OSItemList[u].SoNo == pid[r]) {
                        OSItemList[u].IssueQty = qty[r];
                        son.push(OSItemList[u].IssueQty);
                        jid.push(OSItemList[u].JoMasId);
                    }
                    //if (OSItemList[u].OItemid == IId && OSItemList[u].OColorid == CId && OSItemList[u].OSizeid == SId && OSItemList[u].OUomid == PUId) {
                    //    OSItemList[u].IssueQty = qty[r];
                    //}
                }
            }

            loadDelOrderSaveTable(OSItemList);

            var j = jid[0];
            var colorempty = [];
            colorempty = OSItemList;

            colorempty = $.grep(colorempty, function (v) {
                return (v.OItemid === IId && v.OColorid === CId && v.OSizeid === SId && v.OUomid === PUId);
            });
            OItemList = [];
            OItemList = colorempty;
            loadDelOrderTable(colorempty);
        }
        if (SSItemList.length > 0) {



            var sid = [];
            var bal = [];
            var qty = [];
            for (var t = 0; t < SSItemList.length; t++) {
                if (SSItemList[t].SItemid == IId && SSItemList[t].SColorid == CId && SSItemList[t].SSizeid == SId && SSItemList[t].SUomid == PUId && SSItemList[t].jmasid == j) {
                    sid.push(SSItemList[t].ItemStockId);
                    bal.push(SSItemList[t].StockQty);
                    qty.push(SSItemList[t].quantity);
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
            //stkempty = SItemList;

            //stkempty = $.grep(stkempty, function (v) {
            //    return (v.SItemid === IId && v.SColorid === CId && v.SSizeid === SId && v.SUomid === PUId);
            //});

            // for (var c = 0; c < SItemList.length; c++) {
            //     for (var r = 0; r < pid.length; r++) {
            //         if (SItemList[c].ONo == pid[r]) {

            //             //stkempty = SItemList;

            //             //stkempty = $.grep(stkempty, function (v) {
            //             //    return (v.SItemid === IId && v.SColorid === CId && v.SSizeid === SId && v.SUomid === PUId);
            //             //});

            //             if (SItemList[c].SItemid == IId && SItemList[c].SColorid == CId && SItemList[c].SSizeid == SId && SItemList[c].SUomid == PUId)
            //             {
            //                 stkempty.push(SItemList[c]);
            //             }
            //         }
            //     }

            // }



            //// SItemList = [];
            // SItemList = stkempty;
            // loadDelStockTable(SItemList);
            var stkid = [];
            for (var u = 0; u < SSItemList.length; u++) {
                for (var r = 0; r < sid.length; r++) {
                    if (SSItemList[u].ItemStockId == sid[r]) {
                        SSItemList[u].quantity = qty[r];
                        stkid.push(SSItemList[u].ItemStockId);
                    }
                    //if (OSItemList[u].OItemid == IId && OSItemList[u].OColorid == CId && OSItemList[u].OSizeid == SId && OSItemList[u].OUomid == PUId) {
                    //    OSItemList[u].IssueQty = qty[r];
                    //}

                }
            }

            //for (var e = 0; e < SItemList.length; e++) {
            //    for (var r = 0; r < sid.length; r++) {
            //        if (SItemList[e].ItemStockId == sid[r]) {
            //            SItemList[e].quantity = qty[r];
            //        }
            //    }
            //}


            var colorempty = [];
            colorempty = SSItemList;

            colorempty = $.grep(colorempty, function (v) {
                return (v.SItemid === IId && v.SColorid === CId && v.SSizeid === SId);
            });
            SItemList = [];
            SItemList = colorempty;


            loadDelStockTable(SItemList);
            loadDelStockSaveTable(SSItemList);


        }
    }
    else {
        $.each(EItemList, function () {
            if (this.SNo == CSno && this.Itemid == IId && this.Colorid == CId && this.Sizeid == SId && this.Uomid == PUId) {
                this.Quantity = IssQty;

            }
        });



        loadDelyItemTable(EItemList);


        var pid = [];
        var bal = [];
        var qty = [];
        for (var t = 0; t < SSItemList.length; t++) {
            if (SSItemList[t].SItemid == IId && SSItemList[t].SColorid == CId && SSItemList[t].SSizeid == SId && SSItemList[t].SUomid == PUId) {
                pid.push(SSItemList[t].ItemStockId);
                bal.push(SSItemList[t].StockQty);
                qty.push(SSItemList[t].quantity);
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
        for (var u = 0; u < SSItemList.length; u++) {
            for (var r = 0; r < pid.length; r++) {
                if (SSItemList[u].ItemStockId == pid[r]) {
                    SSItemList[u].quantity = qty[r];
                }
            }
        }




        for (var u = 0; u < SItemList.length; u++) {
            for (var r = 0; r < pid.length; r++) {
                if (SItemList[u].ItemStockId == pid[r]) {
                    SItemList[u].quantity = qty[r];
                }
            }
        }
        loadDelStockTable(SItemList);
        loadDelStockSaveTable(SSItemList);
    }
}


function calcStockqty(value) {
    debugger;

    Sindex;

    var currentrowoftcpi = SItemList.slice(Sindex);

    var CSno = currentrowoftcpi[0].SNo;
    var IId = currentrowoftcpi[0].SItemid;
    var CId = currentrowoftcpi[0].SColorid;
    var SId = currentrowoftcpi[0].SSizeid;
    var PUId = currentrowoftcpi[0].SUomid;
    //var IssQty = Val;

    var itmstkid = currentrowoftcpi[0].ItemStockId;
    var balstk = currentrowoftcpi[0].StockQty;
    var jm = currentrowoftcpi[0].jmasid;

    if (typeofg != "G") {
        currentrowstk = [];
        for (var w = 0; w < OSItemList.length; w++) {
            if (OSItemList[w].JoMasId == jm && OSItemList[w].OItemid == IId && OSItemList[w].OColorid == CId && OSItemList[w].OSizeid == SId && OSItemList[w].OUomid == PUId) {
                currentrowstk.push(OSItemList[w]);
                var jno = currentrowstk[0].JoMasId;
                // Itmstkid = currentrow[0].ItemStockId;
                var balq = currentrowstk[0].BalQty;
            }
        }



        $.each(SItemList, function () {
            if (this.ItemStockId == itmstkid) {

                if (balstk >= value) {
                    if (balq >= value) {
                        this.quantity = value;
                    }
                    else {
                        var t = value - balq;
                        this.quantity = balq;
                    }
                }
                else {
                    var t = value - balstk;
                    this.quantity = balstk;
                }

            }
        });

        $.each(SSItemList, function () {
            if (this.ItemStockId == itmstkid) {

                if (balstk >= value) {
                    if (balq >= value) {
                        this.quantity = value;
                    }
                    else {
                        var t = value - balq;
                        this.quantity = balq;
                    }
                }
                else {
                    var t = value - balstk;
                    this.quantity = balstk;
                }

            }
        });

        var tot = 0;
        for (var d = 0; d < SSItemList.length; d++) {
            if (SSItemList[d].jmasid == jm && SSItemList[d].SItemid == IId && SSItemList[d].SColorid == CId && SSItemList[d].SSizeid == SId && SSItemList[d].SUomid == PUId) {
                var at = SSItemList[d].quantity;
                tot = tot + parseFloat(at);
            }
        }
        //var isqty = parseFloat(tot) + value;
        if (tot > balq) {
            //alert('Should not exceed Bal Qty in Order table');
            var msg = 'Should not exceed Balance quantity in Order table...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return true;
        }
        //$.each(OSItemList, function () {
        //    if (this.SoNo == Ono) {

        //        if (balstk >= value) {
        //            this.quantity = value;
        //        }
        //        else {
        //            var t = value - balstk;
        //            this.quantity = balstk;
        //        }

        //    }
        //});
        //$.each(SItemList, function () {
        //    if (this.SItemid == IId && this.SColorid == CId && this.SSizeid == SId && this.SUomid == PUId) {
        //        this.quantity = IssQty;

        //    }
        //});
        var currentrow = [];
        for (var a = 0; a < OSItemList.length; a++) {
            //if (SItemList[a].ONo == pid && Itmstkid==0) {
            //    currentrow.push(SItemList[a]);
            //    var Ono = currentrow[0].ONo;
            //     Itmstkid = currentrow[0].ItemStockId;
            //    var balstk = currentrow[0].StockQty;

            //    $.each(SItemList, function () {
            //        if (this.ItemStockId == Itmstkid) {

            //            if (balstk >= value) {
            //                this.quantity = value;
            //            }
            //            else {
            //                var t = value - balstk;
            //                this.quantity = balstk;
            //            }

            //        }
            //    });
            //}

            if (OSItemList[a].JoMasId == jm && OSItemList[a].OItemid == IId && OSItemList[a].OColorid == CId && OSItemList[a].OSizeid == SId && OSItemList[a].OUomid == PUId) {
                currentrow.push(OSItemList[a]);
                var jno = currentrow[0].JoMasId;
                // Itmstkid = currentrow[0].ItemStockId;
                var balq = currentrow[0].BalQty;

                if (balq <= balstk) {

                }


                $.each(OSItemList, function () {
                    //if (this.JoMasId == jm) {
                    if (this.JoMasId == jm && this.OItemid == IId && this.OColorid == CId && this.OSizeid == SId && this.OUomid == PUId) {
                        if (value >= balstk) {
                            //  if (tot < balq) {
                            if (balstk >= value) {
                                this.IssueQty = value;
                            }
                            else {
                                var t = value - balstk;
                                this.IssueQty = balstk;
                            }
                            //}
                            //else {
                            //    this.IssueQty = value;
                            //  }
                        }
                        else {
                            if (balq >= value) {
                                this.IssueQty = value;
                            }
                            else {
                                var t = value - balq;
                                this.IssueQty = balq;
                            }
                        }
                        //if (balq <= balstk) {
                        //    this.IssueQty = balq;
                        //}
                    }
                });

                $.each(OItemList, function () {
                    //if (this.JoMasId == jm) {
                    if (this.JoMasId == jm && this.OItemid == IId && this.OColorid == CId && this.OSizeid == SId && this.OUomid == PUId) {
                        if (value >= balstk) {
                            if (balstk >= value) {
                                this.IssueQty = value;
                            }
                            else {
                                var t = value - balstk;
                                this.IssueQty = balstk;
                            }
                        }
                        else {
                            if (balq >= value) {
                                this.IssueQty = value;
                            }
                            else {
                                var t = value - balq;
                                this.IssueQty = balq;
                            }
                        }

                    }
                });
            }
        }

        //var total = 0;

        //for (var e = 0; e < OSItemList.length; e++) {
        //    var amo = OSItemList[e].IssueQty;
        //    total = total + parseFloat(amo);
        //}



        var totalamnt = 0;

        for (var e = 0; e < SItemList.length; e++) {
            var amount = SItemList[e].quantity;
            totalamnt = totalamnt + parseFloat(amount);
        }

        //for (var e = 0; e < OSItemList.length; e++) {
        //    var amo = OSItemList[e].IssueQty;
        //    totalamnt = totalamnt + parseFloat(amo);
        //}



        $.each(OSItemList, function () {
            if (this.OItemid == IId && this.OColorid == CId && this.OSizeid == SId && this.OUomid == PUId && this.JoMasId == jm) {
                this.IssueQty = totalamnt;

            }
        });
        $.each(OItemList, function () {
            if (this.OItemid == IId && this.OColorid == CId && this.OSizeid == SId && this.OUomid == PUId && this.JoMasId == jm) {
                this.IssueQty = totalamnt;

            }
        });


        var total = 0;

        for (var e = 0; e < OItemList.length; e++) {
            var amount = OItemList[e].IssueQty;
            total = total + parseFloat(amount);
        }

        $.each(EItemList, function () {
            if (this.Itemid == IId && this.Colorid == CId && this.Sizeid == SId && this.Uomid == PUId) {
                this.Quantity = total;

            }
        });
        //loadDelStockTable(SItemList);

        loadDelStockTable(SItemList);
        loadDelStockSaveTable(SSItemList);
        loadDelOrderTable(OItemList);
        loadDelOrderSaveTable(OSItemList);
        loadDelyItemTable(EItemList);
    }
    else {
        $.each(SSItemList, function () {
            if (this.ItemStockId == itmstkid) {


                if (balstk >= value) {
                    this.quantity = value;
                }
                else {
                    var t = value - balstk;
                    this.quantity = balstk;
                }

            }
        });
        $.each(SItemList, function () {
            if (this.ItemStockId == itmstkid) {


                if (balstk >= value) {
                    this.quantity = value;
                }
                else {
                    var t = value - balstk;
                    this.quantity = balstk;
                }

            }
        });

        var totalamnt = 0;

        for (var e = 0; e < SItemList.length; e++) {
            var amount = SItemList[e].quantity;
            totalamnt = totalamnt + parseFloat(amount);
        }
        $.each(EItemList, function () {
            if (this.Itemid == IId && this.Colorid == CId && this.Sizeid == SId && this.Uomid == PUId) {
                this.Quantity = totalamnt;

            }
        });

        loadDelyItemTable(EItemList);
        loadDelStockTable(SItemList);
        loadDelStockSaveTable(SSItemList);

    }
}
function calcsepquan(value) {
    debugger;

    Oindex;

    var currentrowoftcpi = OItemList.slice(Oindex);


    var IId = currentrowoftcpi[0].OItemid;
    var CId = currentrowoftcpi[0].OColorid;
    var SId = currentrowoftcpi[0].OSizeid;
    var PUId = currentrowoftcpi[0].OUomid;


    // var IssQty = Val;

    var pid = currentrowoftcpi[0].SoNo;
    var balq = currentrowoftcpi[0].BalQty;
    var jmid = currentrowoftcpi[0].JoMasId;
    $.each(OSItemList, function () {
        if (this.SoNo == pid) {

            if (balq >= value) {
                this.IssueQty = value;
            }
            else {
                var t = value - balq;
                this.IssueQty = balq;
            }

        }
    });


    $.each(OItemList, function () {
        if (this.SoNo == pid) {

            if (balq >= value) {
                this.IssueQty = value;
            }
            else {
                var t = value - balq;
                this.IssueQty = balq;
            }

        }
    });

    var currentrow = [];
    var Itmstkid = 0;
    for (var a = 0; a < SItemList.length; a++) {
        //if (SItemList[a].ONo == pid && Itmstkid==0) {
        //    currentrow.push(SItemList[a]);
        //    var Ono = currentrow[0].ONo;
        //     Itmstkid = currentrow[0].ItemStockId;
        //    var balstk = currentrow[0].StockQty;

        //    $.each(SItemList, function () {
        //        if (this.ItemStockId == Itmstkid) {

        //            if (balstk >= value) {
        //                this.quantity = value;
        //            }
        //            else {
        //                var t = value - balstk;
        //                this.quantity = balstk;
        //            }

        //        }
        //    });
        //}

        if (SSItemList[a].jmasid == jmid) {
            currentrow.push(SSItemList[a]);
            var jm = currentrow[0].jmasid;
            Itmstkid = currentrow[0].ItemStockId;
            var balstk = currentrow[0].StockQty;

            $.each(SSItemList, function () {
                if (this.ItemStockId == Itmstkid) {
                    if (value >= balq) {
                        if (balq >= value) {
                            this.quantity = value;
                        }
                        else {
                            var t = value - balq;
                            this.quantity = balq;
                        }
                    }
                    else {
                        if (balstk >= value) {
                            this.quantity = value;
                        }
                        else {
                            var t = value - balstk;
                            this.quantity = balstk;
                        }
                    }

                }
            });

            $.each(SItemList, function () {
                if (this.ItemStockId == Itmstkid) {
                    if (value >= balq) {
                        if (balq >= value) {
                            this.quantity = value;
                        }
                        else {
                            var t = value - balq;
                            this.quantity = balq;
                        }
                    }
                    else {
                        if (balstk >= value) {
                            this.quantity = value;
                        }
                        else {
                            var t = value - balstk;
                            this.quantity = balstk;
                        }
                    }

                }
            });
        }
    }


    var totalamnt = 0;

    for (var e = 0; e < OItemList.length; e++) {
        var amount = OItemList[e].IssueQty;
        totalamnt = totalamnt + parseFloat(amount);
    }
    $.each(EItemList, function () {
        if (this.Itemid == IId && this.Colorid == CId && this.Sizeid == SId && this.Uomid == PUId) {
            this.Quantity = totalamnt;

        }
    });



    loadDelStockTable(SItemList);
    loadDelStockSaveTable(SSItemList);
    loadDelyItemTable(EItemList);
    loadDelOrderTable(OItemList);
    loadDelOrderSaveTable(OSItemList);

}

function ListMainUnit() {
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var USType = $('input[name="Local"]:checked').attr('value');
    var OType = $('input[name="MOType"]:checked').attr('value');
    var POType = $('input[name="PoType"]:checked').attr('value');
    //var CompId = $('#ddlMCompany').val();

    var CompId = $('#ddlMCompany').val();

    if (CompId == null) {
        CompId = DCompid;
    } else {
        CompId = $('#ddlMCompany').val();
    }

    $.ajax({
        url: "/StoreIssue/GetUnit",
        data: JSON.stringify({ unit_or_other: USType, Job_Mac_Gen: OType, ItemType: POType, FromDate: FDate, ToDate: TDate, Companyid: CompId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;



                var unitdet = {};
                var unit = [];



                $.each(obj, function (i, el) {


                    if (!unitdet[el.Companyunitid]) {
                        unitdet[el.Companyunitid] = true;
                        unit.push(el);
                    }


                });

                $(ddlMUnit).empty();

                $(ddlMUnit).append($('<option/>').val('0').text('--Select Unit--'));
                $.each(unit, function () {
                    $(ddlMUnit).append($('<option></option>').val(this.Companyunitid).text(this.Unit));
                });


            }
        }

    });
}

function List() {
   // $('#tblMainDelidetails').DataTable().destroy();
    //LoadMainGrid();
    ListMainUnit();
    //ListOrderRefNo();
    //ListDisNo();
    //ListIssueNo();
    LoadMainGrid();
}

function CMainList() {
  //  $('#tblMainDelidetails').DataTable().destroy();

    ListOrderRefNo();
    ListDisNo();
    ListIssueNo();
    LoadMainGrid();
}
function SMainList() {
   // $('#tblMainDelidetails').DataTable().destroy();

    //ListOrderRefNo();
    ListDisNo();
    ListIssueNo();
    LoadMainGrid();
}
function RefMainList() {
   // $('#tblMainDelidetails').DataTable().destroy();

    //ListOrderRefNo();
    ListDisNo();
    ListIssueNo();
    LoadMainGrid();
}
function IssMainList() {
  //  $('#tblMainDelidetails').DataTable().destroy();

    ListOrderRefNo();
    ListDisNo();
    // ListIssueNo();
    LoadMainGrid();
}
function UMainList() {
  //  $('#tblMainDelidetails').DataTable().destroy();

    ListOrderRefNo();
    ListDisNo();
    ListIssueNo();
    LoadMainGrid();
}
function DMainList() {
  //  $('#tblMainDelidetails').DataTable().destroy();

    ListOrderRefNo();
    //ListDisNo();
    ListIssueNo();
    LoadMainGrid();
}
function ListOrderRefNo() {
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var USType = $('input[name="Local"]:checked').attr('value');
    var OType = $('input[name="MOType"]:checked').attr('value');
    var POType = $('input[name="PoType"]:checked').attr('value');
    //var CompId = $('#ddlMCompany').val();

    var CompId = $('#ddlMCompany').val();

    if (CompId == null) {
        CompId = DCompid;
    } else {
        CompId = $('#ddlMCompany').val();
    }

    var IssId = $('#ddlMIssueNo').val();
    var DesId = $('#ddlMDesp').val();
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
    $.ajax({
        url: "/StoreIssue/GetOrd",
        data: JSON.stringify({ unit_or_other: USType, Job_Mac_Gen: OType, ItemType: POType, FromDate: FDate, ToDate: TDate, Companyid: CompId, OrderNo: OrdNo, RefNo: RefNo, desunitid: DesId, IssueId: IssId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;


                var orddet = {};
                var ord = [];

                var refdet = {};
                var ref = [];

                $.each(obj, function (i, el) {


                    if (!orddet[el.OrderNo]) {
                        orddet[el.OrderNo] = true;
                        ord.push(el);
                    }

                    if (!refdet[el.RefNo]) {
                        refdet[el.RefNo] = true;
                        ref.push(el);
                    }


                });

                $(ddlMOrderNo).empty();
                $(ddlMRefNo).empty();

                $(ddlMOrderNo).append($('<option/>').val('0').text('--Select OrderNo--'));
                $.each(ord, function () {
                    $(ddlMOrderNo).append($('<option></option>').val(this.BMasId).text(this.OrderNo));
                });
                //RefNo
                $(ddlMRefNo).append($('<option/>').val('0').text('--Select RefNo--'));
                $.each(ref, function () {
                    $(ddlMRefNo).append($('<option></option>').text(this.RefNo));
                });


            }
        }

    });
}
function ListIssueNo() {
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var USType = $('input[name="Local"]:checked').attr('value');
    var OType = $('input[name="MOType"]:checked').attr('value');
    var POType = $('input[name="PoType"]:checked').attr('value');
    //var CompId = $('#ddlMCompany').val();

    var CompId = $('#ddlMCompany').val();

    if (CompId == null) {
        CompId = DCompid;
    } else {
        CompId = $('#ddlMCompany').val();
    }

    var IssId = $('#ddlMIssueNo').val();
    var DesId = $('#ddlMDesp').val();
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
    $.ajax({
        url: "/StoreIssue/GetIssue",
        data: JSON.stringify({ unit_or_other: USType, Job_Mac_Gen: OType, ItemType: POType, FromDate: FDate, ToDate: TDate, Companyid: CompId, OrderNo: OrdNo, RefNo: RefNo, desunitid: DesId, IssueId: IssId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;


                var unitdet = {};
                var unit = [];



                $.each(obj, function (i, el) {


                    if (!unitdet[el.IssueId]) {
                        unitdet[el.IssueId] = true;
                        unit.push(el);
                    }



                });

                $(ddlMIssueNo).empty();

                //IssueNo
                $(ddlMIssueNo).append($('<option/>').val('0').text('--Select IssueNo--'));
                $.each(unit, function () {
                    $(ddlMIssueNo).append($('<option></option>').val(this.IssueId).text(this.Issueno));
                });



            }
        }

    });
}
function ListDisNo() {
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var USType = $('input[name="Local"]:checked').attr('value');
    var OType = $('input[name="MOType"]:checked').attr('value');
    var POType = $('input[name="PoType"]:checked').attr('value');
    //var CompId = $('#ddlMCompany').val();

    var CompId = $('#ddlMCompany').val();

    if (CompId == null) {
        CompId = DCompid;
    } else {
        CompId = $('#ddlMCompany').val();
    }

    var IssId = $('#ddlMIssueNo').val();
    var DesId = $('#ddlMDesp').val();
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
    $.ajax({
        url: "/StoreIssue/GetDis",
        data: JSON.stringify({ unit_or_other: USType, Job_Mac_Gen: OType, ItemType: POType, FromDate: FDate, ToDate: TDate, Companyid: CompId, OrderNo: OrdNo, RefNo: RefNo, desunitid: DesId, IssueId: IssId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;


                var disdet = {};
                var dis = [];



                $.each(obj, function (i, el) {


                    if (!disdet[el.IssueId]) {
                        disdet[el.IssueId] = true;
                        dis.push(el);
                    }



                });

                $(ddlMDesp).empty();


                //Dispatch
                $(ddlMDesp).append($('<option/>').val('0').text('--Select Dispatch--'));
                $.each(dis, function () {
                    $(ddlMDesp).append($('<option></option>').val(this.desunitid).text(this.Unit_supplier_self));
                });



            }
        }

    });
}



function getbyID(Id, RetId) {

    LMode = 1;

    //LoadPayTermsDDL("#ddlBPayTerms");
    //LoadEmployeeDDL("#ddlBApprove");
    //LoadCurrencyDDL("#ddlBCurrency");
    //LoadSupplierDDL("#ddlSupplier");
    //LoadAddlessDDL("#ddlAcc");

    LoadEmployeeDDL("#ddlRequestner");
    LoadDepartmentDDL("#ddlDepartment");
    $.ajax({
        url: "/StoreIssue/LoadEditDeliDetails",
        data: JSON.stringify({ IssueId: Id }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            debugger;
            if (obj != undefined) {
                $('#txtCompany').val(obj[0]["Company"]);
                $('#txtIssueNo').val(obj[0]["Issueno"]);
                //$('#txtEntryDate').val(obj[0]["Issuedate"]);
                $('#txtEntryDate').val(moment(obj[0]["Issuedate"]).format('DD/MM/YYYY'));
                $('#txtUnit').val(obj[0]["Unit"]);
                $('#ddlDepartment').val(obj[0]["Deptid"]);
                $('#ddlRequestner').val(obj[0]["RequestnerId"]);
                $('#txtVechicalNo').val(obj[0]["GatePassVehicle"]);
                $('#txtdescription').val(obj[0]["remarks"]);
                $('#ddlLoc').val(obj[0]["desunitid"]);
                $('#ddlAProcess').val(obj[0]["Processid"]).trigger('change');
                $('#ddlAProcess').attr('disabled', true);
                $('#btnloaditem').attr('disabled', true);
                $('#optBom').attr('disabled', true);
                $('#optPrc').attr('disabled', true);
                if (obj[0]["Processid"] > 0) {
                    $('#optPrc').prop('checked', true);
                } else {
                    $('#optBom').prop('checked', true);
                }

                var DType = obj[0]["Unit_supplier_self"];
                var OType = obj[0]["Job_Mac_Gen"];
                var UPType = obj[0]["unit_or_other"];
                var IType = obj[0]["ItemType"];

                var CmpId = obj[0]["Companyid"];
                var CmpUnId = obj[0]["Companyunitid"];
                var FStoreId = obj[0]["FromStoreUnitID"];
                var SuppId = obj[0]["desunitid"];
                CompanyId = CmpId;

                GIssId = obj[0]["IssueId"];
                GStoreId = FStoreId;
                GCmpId = CmpId;
                GOType = OType;
                GIType = IType;
                GDType = DType;
                GUPType = UPType;
                GCmpUnId = CmpUnId;
                LoadDelyItemDetailsEdit(Id, OType, CmpId, FStoreId);

                if (DType == "F") {
                    //LoadEditFDes(SuppId);
                } else if (DType == "U") {
                    //LoadEditFDes(SuppId);
                } else if (DType == "S") {
                    //LoadEditSDes(SuppId);
                } else if (DType == "T") {
                    //LoadEditTDes(SuppId);
                }


                if (DType == "F") {
                    LoadEditFDes(SuppId);
                    $('#optDess').prop('checked', true);
                    editmasunitstore = obj[0]["desunitid"];
                } else if (DType == "U") {
                    $('#optDesu').prop('checked', true);
                    editmasunitstore = obj[0]["desunitid"];
                    LoadEditFDes(SuppId);
                } else if (DType == "S") {

                    // LoadEditSDes(SuppId);
                } else if (DType == "T") {
                    // LoadEditTDes(SuppId);
                    $('#optDesp').prop('checked', true);
                    editmasunitstore = obj[0]["desunitid"];
                }

                if (DType == "S") {
                    $('#optDest').prop('checked', true);
                    editmasunitstore = obj[0]["desunitid"];
                    LoadEmployeeStoreunit();

                }
              

                LoadLocationEdit();

                //if (Mode == 1) {
                //    LoadItemDetailsEdit(POMId, OrderType);
                //    LoadOrderEditAddLessDetails(POMId);
                //}
                //if (Mode == 2) {
                //    LoadItemDetailsEdit(POMId);
                //    LoadOrderEditAddLessDetails(POMId);
                //}

                $('#myModal').modal('hide');
                $('#myModal1').modal('show');
                $('#btnUpdate').show();
                $('#btnAdd').hide();
                $('#btnDelete').hide();


                if (RetId > 0) {

                    //alert("Stores Delivery are made for this Entry,Cannot Update the Entry..");
                    var msg = 'Stores Delivery are made for this Entry,Cannot Update the Entry...';
                    var flg = 4;
                    var mod = 1;
                    var url = "";
                    AlartMessage(msg, flg, mod, url);
                    $("#btnUpdate").attr('disabled', true);
                    $('#btnDelete').hide();
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
function LoadDelyItemDetailsEdit(Id, OType, CmpId, FStoreId) {
    debugger;
    typeofg = OType;
    $.ajax({
        url: "/StoreIssue/LoadItemEditDetailsDel",
        data: JSON.stringify({ IssueId: Id, Job_Mac_Gen: OType }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            EItemList = result;
            loadDelyItemTable(EItemList);

            var ItmId = 0;// EItemList[0].Itemid;
            var ClrId = 0;// EItemList[0].Colorid;
            var SzId = 0;// EItemList[0].Sizeid;
            var PUId = 0;//EItemList[0].Uomid;

            var Itemid = EItemList[0].Itemid;
            var Colorid = EItemList[0].Colorid;
            var Sizeid = EItemList[0].Sizeid;
            if (OType != "G") {
                $("#OrdertblId").show();
                LoadEditOrderDetails(Id, ItmId, ClrId, SzId, PUId);
            } else {
                $("#OrdertblId").hide();
            }
            LoadEditDelStockDetails(Id, ItmId, ClrId, SzId, PUId, OType, CmpId, FStoreId);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadEditOrderDetails(Id, ItmId, ClrId, SzId, PUId) {
    debugger;

    $.ajax({
        url: "/StoreIssue/LoadOrderEditDetailsDel",
        data: JSON.stringify({ IssueId: Id, OItemid: ItmId, OColorid: ClrId, OSizeid: SzId, OUomid: PUId, Job_Mac_Gen: GOType }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            OSItemList = result;
            loadDelOrderSaveTable(OSItemList);

            var ctry = [];
            ctry = OSItemList;
            ctry = $.grep(ctry, function (e) {
                return e.OItemid == Itemid && e.OColorid == Colorid && e.OSizeid == Sizeid;
            });
            OItemList = ctry;
            loadDelOrderTable(OItemList);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function RadioMAClick() {
  //  $('#tblMainDelidetails').DataTable().destroy();

    ListOrderRefNo();
    ListDisNo();
    ListIssueNo();
    LoadMainGrid();
}


function RadioMBClick() {
   // $('#tblMainDelidetails').DataTable().destroy();

    ListOrderRefNo();
    ListDisNo();
    ListIssueNo();
    LoadMainGrid();
}
function RadioRCClick() {
    var RCType = $('input[name="RCType"]:checked').attr('value');
    if (RCType == 'B') {
        $('#ddlAProcess').attr('disabled', true);
        $('#ddlAProcess').val(0).trigger('change');
        $('#btnloaditem').attr('disabled', true);
        LoadDelyItemDetails(MJobRowID);
    } else if (RCType == 'R') {
        $('#ddlAProcess').attr('disabled', false);
        $('#btnloaditem').attr('disabled', false);
    }
   
}
function Loadfill() {
    if (LMode == 0) {
        LoadDelyItemDetails(MJobRowID);
    }
}

function LoadEditDelStockDetails(Id, ItmId, ClrId, SzId, PUId, OType, CmpId, FStoreId) {
    //debugger;


    var CompId = $('#txtCompany').val();
    var IssId = $('#txtIssueNo').val();

    $.ajax({
        url: "/StoreIssue/LoadStockEditDetailsDel",
        data: JSON.stringify({ IssueId: Id, OItemid: ItmId, OColorid: ClrId, OSizeid: SzId, OUomid: PUId, Job_Mac_Gen: OType, Companyid: CmpId, FromStoreUnitID: FStoreId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            SSItemList = result;
            loadDelStockSaveTable(SSItemList);

            var ctry = [];
            ctry = SSItemList;
            ctry = $.grep(ctry, function (e) {
                return e.SItemid == ItmId && e.SColorid == ClrId && e.SSizeid == SzId && e.jmasid == JobOrdid;
            });
            SItemList = ctry;
            loadDelStockTable(SItemList);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadLocation() {
    var LocalType = $('input[name="DSOType"]:checked').attr('value');

    $('#txtLocAdd').val('');

    if (LocalType == "U") {
        //LoadCompanyUnitDDL("#ddlLoc");
        LoadCompanyUnitDDL("#ddlLoc,#ddlAPUnit");
    } else if (LocalType == "F") {
        //LoadCompanyUnitDDL("#ddlLoc");
        LoadCompanyUnitDDL("#ddlLoc,#ddlAPUnit");
    } else if (LocalType == "S") {
        //LoadStoreUnitDDL("#ddlLoc");
        LoadEmployeeStoreunit();
    } else if (LocalType == "T") {
        LoadSupplierDDL("#ddlLoc");
    }
}


function LoadLocationEdit() {
    var LocalType = $('input[name="DSOType"]:checked').attr('value');
    $('#txtLocAdd').val('');
    if (LocalType == "U") {
        LoadCompanyUnitDDL("#ddlLoc,#ddlAPUnit");
        if (editmasunitstore > 0) {
            $('#ddlLoc').val(editmasunitstore).trigger('change');
        }

    } else if (LocalType == "F") {
        LoadCompanyUnitDDL("#ddlLoc,#ddlAPUnit");
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




function LoadLocAdd() {


    var LocalType = $('input[name="DSOType"]:checked').attr('value');

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


function DelyUpdate() {

    debugger;

    var res = validate();
    if (res == false) {
        return false;
    }


    if (EItemList.length == 0) {
        //alert("Please Enter the Item Details..");
        var msg = 'Please Enter the Item Details...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }


    //var GIType = 0;
    //var GDType = 0;
    //var GUPType = 0;
    var DSType = $('input[name="DSOType"]:checked').attr('value');
    //var OType = $('input[name="AOType"]:checked').attr('value');
    //var USType = $('input[name="ADType"]:checked').attr('value');
    //var IType = $('input[name="APType"]:checked').attr('value');
    var objPurSubmit = {

        IssueId: GIssId,
        Issueno: $('#txtIssueNo').val(),
        Companyid: GCmpId,
        Companyunitid: GCmpUnId,
        Issuedate: $('#txtEntryDate').val(),//new Date($('#txtEntryDate').val()),
        Unit_supplier_self: DSType,
        desunitid: $('#ddlLoc').val(),
        remarks: $('#txtdescription').val(),
        Job_Mac_Gen: GOType,
        issue_Commit: "N",
        reqorstock: "S",
        issueunit: GCmpUnId,
        Unit_or_other: GUPType,
        ItemType: GIType,
        QualityMade: "N",
        //RequestnerId: $('#txtInWard').val(),
        FromStoreUnitID: $('#ddlAStore').val(),
        GatePassVehicle: $('#txtVechicalNo').val(),
        RequestnerId: $('#ddlRequestner').val(),
        Deptid: $('#ddlDepartment').val(),
        CreatedBy: Guserid,
        StoresDelDet: EItemList,
        StoresDelOrd: OSItemList,
        StoresDelStock: SSItemList,

    };
    debugger;
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/StoreIssue/Update",
        data: JSON.stringify(objPurSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {



            if (result.Value == true) {
                AddUserEntryLog('Procurement', 'Stores Delivery', 'UPDATE', $("#txtIssueNo").val());
                //alert("Data Updated Sucessfully");
                //window.location.href = "/StoreIssue/StoreIssueIndex";
                var msg = 'Data Updated Sucessfully...';
                var flg = 1;
                var mod = 0;
                var url = "/StoreIssue/StoreIssueIndex";
                AlartMessage(msg, flg, mod, url);

                $('#myModal1').modal('hide');
                //window.location.reload();
                //$('#tblMainDelidetails').DataTable().destroy();
                //ListMainUnit();
                //ListOrderRefNo();
                //ListDisNo();
                //ListIssueNo();
                //LoadMainGrid();
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

function getDeleteID(Id, RtId) {

    LMode = 2;
    //LoadPayTermsDDL("#ddlBPayTerms");
    //LoadEmployeeDDL("#ddlBApprove");
    //LoadCurrencyDDL("#ddlBCurrency");
    //LoadSupplierDDL("#ddlSupplier");
    //LoadAddlessDDL("#ddlAcc");

    LoadEmployeeDDL("#ddlRequestner");
    LoadDepartmentDDL("#ddlDepartment");
    $.ajax({
        url: "/StoreIssue/LoadEditDeliDetails",
        data: JSON.stringify({ IssueId: Id }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            debugger;
            if (obj != undefined) {
                $('#txtCompany').val(obj[0]["Company"]);
                $('#txtIssueNo').val(obj[0]["Issueno"]);
                //$('#txtEntryDate').val(obj[0]["Issuedate"]);
                $('#txtEntryDate').val(moment(obj[0]["Issuedate"]).format('DD/MM/YYYY'));
                $('#txtUnit').val(obj[0]["Unit"]);
                $('#ddlDepartment').val(obj[0]["Deptid"]);
                $('#ddlRequestner').val(obj[0]["RequestnerId"]);
                $('#txtVechicalNo').val(obj[0]["GatePassVehicle"]);
                $('#txtdescription').val(obj[0]["remarks"]);
                $('#ddlLoc').val(obj[0]["desunitid"]);
                $('#ddlAProcess').val(obj[0]["Processid"]).trigger('change');
                $('#ddlAProcess').attr('disabled', true);
                $('#optBom').attr('disabled', true);
                $('#optPrc').attr('disabled', true);
                $('#btnloaditem').attr('disabled', true);
                if (obj[0]["Processid"] > 0) {
                    $('#optPrc').prop('checked', true);
                } else {
                    $('#optBom').prop('checked', true);
                }

                var DType = obj[0]["Unit_supplier_self"];
                var OType = obj[0]["Job_Mac_Gen"];
                var UPType = obj[0]["unit_or_other"];
                var IType = obj[0]["ItemType"];

                var CmpId = obj[0]["Companyid"];
                var CmpUnId = obj[0]["Companyunitid"];
                var FStoreId = obj[0]["FromStoreUnitID"];
                var SuppId = obj[0]["desunitid"];


                GIssId = obj[0]["IssueId"];
                GStoreId = FStoreId;
                GCmpId = CmpId;
                GOType = OType;
                GIType = IType;
                GDType = DType;
                GUPType = UPType;
                GCmpUnId = CmpUnId;
                LoadDelyItemDetailsEdit(Id, OType, CmpId, FStoreId);

                if (DType == "F") {
                    //LoadEditFDes(SuppId);
                } else if (DType == "U") {
                    //LoadEditFDes(SuppId);
                } else if (DType == "S") {
                    //LoadEditSDes(SuppId);
                } else if (DType == "T") {
                    //LoadEditTDes(SuppId);
                }

                //if (Mode == 1) {
                //    LoadItemDetailsEdit(POMId, OrderType);
                //    LoadOrderEditAddLessDetails(POMId);
                //}
                //if (Mode == 2) {
                //    LoadItemDetailsEdit(POMId);
                //    LoadOrderEditAddLessDetails(POMId);
                //}

                $('#myModal').modal('hide');
                $('#myModal1').modal('show');
                $('#btnUpdate').hide();
                $('#btnAdd').hide();
                $('#btnDelete').show();

                //$("#btnDelete").attr("disabled", true);

                if (RtId > 0) {

                    //alert("Stores Delivery are made for this Entry,Cannot Delete the Entry..");
                    var msg = 'Stores Delivery are made for this Entry,Cannot Delete the Entry...';
                    var flg = 4;
                    var mod = 1;
                    var url = "";
                    AlartMessage(msg, flg, mod, url);
                    $("#btnDelete").attr('disabled', true);
                    $('#btnUpdate').hide();
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

function DelyDelete() {

    debugger;

    //var res = validate();
    //if (res == false) {
    //    return false;
    //}


    if (EItemList.length == 0) {
        //alert("Please Enter the Item Details..");
        var msg = 'Please Enter the Item Details...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }


    //var GIType = 0;
    //var GDType = 0;
    //var GUPType = 0;
    //var DSType = $('input[name="DSOType"]:checked').attr('value');
    //var OType = $('input[name="AOType"]:checked').attr('value');
    //var USType = $('input[name="ADType"]:checked').attr('value');
    //var IType = $('input[name="APType"]:checked').attr('value');
    var objPurSubmit = {

        IssueId: GIssId,
        Issueno: $('#txtIssueNo').val(),
        Companyid: GCmpId,
        Companyunitid: GCmpUnId,
        Issuedate: $('#txtEntryDate').val(),//new Date($('#txtEntryDate').val()),
        Unit_supplier_self: GDType,
        desunitid: $('#ddlDecUnit').val(),
        remarks: $('#txtdescription').val(),
        Job_Mac_Gen: GOType,
        issue_Commit: "N",
        reqorstock: "S",
        issueunit: $('#ddlAPUnit').val(),
        Unit_or_other: GUPType,
        ItemType: GIType,
        QualityMade: "N",
        //RequestnerId: $('#txtInWard').val(),
        FromStoreUnitID: $('#ddlAStore').val(),
        CreatedBy: Guserid,
        StoresDelDet: EItemList,
        StoresDelOrd: OSItemList,
        StoresDelStock: SSItemList,

    };
    debugger;
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $("#btnDelete").attr("disabled", true);
        LoadingSymb();
        $.ajax({
            url: "/StoreIssue/Delete",
            data: JSON.stringify(objPurSubmit),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.Value == true) {
                    AddUserEntryLog('Procurement', 'Stores Delivery', 'DELETE', $("#txtIssueNo").val());
                    alert("Data Deleted Sucessfully");
                    //window.location.href = "/StoreIssue/StoreIssueIndex";
                    var msg = 'Data Deleted Sucessfully...';
                    var flg = 2;
                    var mod = 0;
                    var url = "/StoreIssue/StoreIssueIndex";
                    AlartMessage(msg, flg, mod, url);

                    //$('#myModal1').modal('hide');
                    //window.location.reload();
                    //$('#tblMainDelidetails').DataTable().destroy();
                    //ListMainUnit();
                    //ListOrderRefNo();
                    //ListDisNo();
                    //ListIssueNo();
                    //LoadMainGrid();
                    //ClearAddData();

                    $('#myModal1').modal('hide');

                    

                } else {

                    window.location.href = "/Error/Index";

                }
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

function myGroup() {
    debugger;
    var foo = [];
    IGroup = 0;
    $('#ddlAItemGroup :selected').each(function (i, selected) {
        foo[i] = $(selected).val();
        IGroup = IGroup + "," + foo[i];
    });

}


function StoreIssuePrint(ID) {
    debugger;
    Rptid = ID;
    $('#myModal2').modal('show');

    docname = "STORES DELIVERY";
    GenerateReportItem(docname);
    //window.open("../ReportInline/Stores/StoresDeliveryInlineReport/StoreDeliveryReportInline.aspx?IssueId=" + ID);
   // return true;
}



function GenerateReportItem(name) {

    $("#sbTwo").empty();
    $.ajax({
        url: "/BulkOrder/GetReportOption",
        data: JSON.stringify({ docname: name }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {

            //document.getElementById('sbTwo');
            var obje = result.Value;
            repobj = obje;
            var obj = $.grep(repobj, function (r) {
                return r.optionid != 13280;
            });


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

    var RptTyp = $('input[name="BudPrintPreviewPlanned"]:checked').attr('value');

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

    window.open("../ReportInline/Stores/StoresDeliveryInlineReport/StoreDeliveryReportInline.aspx?IssueId=" + Rptid + "&Remarks=" + p[0] + "&TotalQty=" + p[1] + "&SecQty=" + p[2] + "&Splitup=" + p[3] + "&Gatepass=" + p[4] + "&IssueQty=" + 0 + "&Rate=" + p[6] + "&DeliLoc=" + p[7] + "&ExcessQty=" + p[8] + "&OrdNo=" + p[9] + "&WrkOrdNo=" + p[10] + "&ArtNo=" + p[11] + "&RefNo=" + p[12] + "&RptTyp=" + RptTyp + "&Companyid=" + compid);

}

function backtomain() {

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

function LoadStorefromcompany() {
    CompanyId = $('#ddlACompany').val();

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

            $(ddlAStore).empty();
            $(ddlAStore).append($('<option/>').val('0').text('--Select Store--'));
            $.each(data, function () {
                $(ddlAStore).append($('<option></option>').val(this.Storeid).text(this.StoreName));
            });
            $(ddlAStore).trigger("select2:updated");

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