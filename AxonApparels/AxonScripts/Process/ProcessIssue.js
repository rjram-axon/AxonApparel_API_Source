var ItmList = [];
var SaveJobDetList = [];
var JobDetList = [];
var StkDetList = [];
var SaveStkDetList = [];
var Itmid = 0;
var Colorid = 0;
var Sizeid = 0;
var CompanyId = 0;
var jmasid = [];
var JOrdID = 0;
var inditm = -1;
var indjbdet = -1;
var indstkdet = -1;
var Processordid = 0;
var Masid = 0;
var Procordid = 0;
var Userid = 0;
var UserName = 0;
var MainFDate = 0;
var repobj = [];
var Repid = 0;
var Guserid = 0;
$(document).ready(function () {
    debugger;
    Guserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    MainFDate = $("#hdMainFromDate").data('value');
    LoadCompanyDDL("#ddlCompany");
    LoadCompanyUnitDDL("#ddlMUnit");
    //LoadProcessDDL("#ddlinnerpro,#ddlMProcess");
    //LoadBuyerDDL("#ddlinnerbuyer");
    LoadWorkdivisionDDL("#ddlwrkdiv,#ddlMwrkdiv");
    //LoadSupplierDDL("#ddlSupplier,#ddlMSupplier");
    Loadsupp();
    //Loadprocess();
    getDate();
    ddlmain();
    LoadMaingrid();
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
    $(document).on('click', '.btnSelect', function () {
        debugger;
        rowindex = $(this).closest('tr').index();
        var currentro12 = entrygriddet.slice(rowindex);
        var prodord = entrygriddet[0].processordid;
        var prodno = entrygriddet[0].processorder;
        var type = $('input[name="optwrkord"]:checked').attr('value');
        if (type == 'P') {
            var sup = $('#ddlSupplier').val();
            var supp = $('select#ddlSupplier option:selected').text();
            Processorid = $('select#ddlSupplier option:selected').val();
            if (sup == 0) {
                //alert('Select Supplier');
                var msg = 'Select Supplier...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
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
                var msg = 'Select WorkDivision...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                //$('#myModal1').hide();
                //$('#myModal1').modal('hide');
                return true;
            }
        }
        var unit = '';
        var process = '';
        var ordno = '';
        // ordno = $('select#ddlOrderNo option:selected').text();

        process = $('select#ddlinnerpro option:selected').text();
        Processid = $('select#ddlinnerpro option:selected').val();
        unit = $('select#ddlinnerCompunit option:selected').text();
        Companyunitid = $('select#ddlinnerCompunit option:selected').val();
        CompanyId = entrygriddet[0].companyid;
        if (Processid == 0) {
            //alert('Select Process');
            var msg = 'Select Process...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return true;
        }
        if (Companyunitid == 0) {
            //alert('Select Unit');
            var msg = 'Select Unit...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return true;
        }
        GenerateNumber();
        $('#myModal1').show();
        $('#myModal1').modal('show');
        $('#btnUpdate').hide();
        $('#btnDel').hide();
        $('#btnAdd').show();
        //$('#txtOrderNo').val(ordno);
        $('#txtprocess').val(process);
        $('#txtunit').val(unit);
        $('#txtprocessor').val(supp);
        $('#txtprodno').val(prodno);

        LoadItm(prodord);
        LoadJobdet(prodord);
        //Loadstkdet();
        Processordid = prodord;

    });
    $(document).on('keyup', '.calcAmt', function () {
        debugger;
        var table = $('#tblitmdetails').DataTable();

        var CSno = table.row($(this).parents('tr')).data()["sno"];
        var IId = table.row($(this).parents('tr')).data()["itemid"];
        var CId = table.row($(this).parents('tr')).data()["colorid"];
        var SId = table.row($(this).parents('tr')).data()["sizeid"];
        var BlQ = table.row($(this).parents('tr')).data()["bal"];


        var Val = $(this).val();

        var IssQty = Val;

        if (Val > BlQ) {
            //alert('Quantity should not exceed Balqty...');
            var msg = 'Quantity should not exceed Balance quantity...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return true;
        }
        $.each(ItmList, function () {
            if (this.sno == CSno && this.itemid == IId && this.colorid == CId && this.sizeid == SId) {
                this.IssueQty = Val;

            }
        });

        LoadItmtab(ItmList);

        if (SaveJobDetList.length > 0) {

            var pid = [];
            var bal = [];
            var qty = [];

            for (var t = 0; t < SaveJobDetList.length; t++) {
                if (SaveJobDetList[t].itemid == IId && SaveJobDetList[t].colorid == CId && SaveJobDetList[t].sizeid == SId) {
                    pid.push(SaveJobDetList[t].sno);
                    bal.push(SaveJobDetList[t].bal);
                    qty.push(SaveJobDetList[t].IssueQty);

                }
            }

            var c = pid.length;
            var t = 0;

            if (Val < bal[0]) {
                qty[0] = Val;
                for (var z = 1; z < bal.length; z++) {
                    qty[z] = 0;
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
            var son = [];
            var jid = [];
            for (var u = 0; u < SaveJobDetList.length; u++) {
                for (var r = 0; r < pid.length; r++) {
                    if (SaveJobDetList[u].sno == pid[r]) {
                        SaveJobDetList[u].IssueQty = qty[r];
                        son.push(SaveJobDetList[u].IssueQty);
                        jid.push(SaveJobDetList[u].Job_ord_no);
                    }
                    //if (OSItemList[u].OItemid == IId && OSItemList[u].OColorid == CId && OSItemList[u].OSizeid == SId && OSItemList[u].OUomid == PUId) {
                    //    OSItemList[u].IssueQty = qty[r];
                    //}
                }
            }

            LoadSaveJobdetTab(SaveJobDetList);

            var j = jid[0];
            var colorempty = [];
            colorempty = SaveJobDetList;

            colorempty = $.grep(colorempty, function (v) {
                return (v.itemid === IId && v.colorid === CId && v.sizeid === SId);
            });
            JobDetList = [];
            JobDetList = colorempty;
            LoadJobdetTab(colorempty);
        }
        if (SaveStkDetList.length > 0) {



            var sid = [];
            var bal = [];
            var qty = [];
            for (var t = 0; t < SaveStkDetList.length; t++) {
                if (SaveStkDetList[t].Itemid == IId && SaveStkDetList[t].Colorid == CId && SaveStkDetList[t].Sizeid == SId && SaveStkDetList[t].Job_ord_no == j) {
                    sid.push(SaveStkDetList[t].ItemStockId);
                    bal.push(SaveStkDetList[t].balqty);
                    qty.push(SaveStkDetList[t].IssueQty);
                }
            }

            var c = sid.length;
            var t = 0;

            //if (Val > bal[0]) {
            //qty[0] = Val;
            //}

            if (son[0] < bal[0]) {
                qty[0] = son[0];
                for (var z = 1; z < bal.length; z++) {
                    qty[z] = 0;
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

            var stkempty = [];

            var stkid = [];
            for (var u = 0; u < SaveStkDetList.length; u++) {
                for (var r = 0; r < sid.length; r++) {
                    if (SaveStkDetList[u].ItemStockId == sid[r]) {
                        SaveStkDetList[u].IssueQty = qty[r];
                        stkid.push(SaveStkDetList[u].ItemStockId);
                    }


                }
            }

            for (var e = 0; e < StkDetList.length; e++) {
                for (var r = 0; r < sid.length; r++) {
                    if (StkDetList[e].ItemStockId == sid[r]) {
                        StkDetList[e].IssueQty = qty[r];
                    }
                }
            }

            LoadStkdetTab(StkDetList);
            LoadSaveStkdetTab(SaveStkDetList);


        }

        //Datatable textbox focus
        var rows = $("#tblitmdetails").dataTable().fnGetNodes();
        var dtTable = $('#tblitmdetails').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
            $('input[id=txtOpOrdQty]').each(function () {
                if (sn == CSno && $(this).val() == Val) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtOpOrdQty').val();
                    row.find('#txtOpOrdQty').focus().val('').val(num);
                    return true;
                }
            });
        }
    });
    $(document).on('keyup', '.calcipsepquan', function () {
        debugger;

        var table = $('#tbljobordinfodet').DataTable();

        var pid = table.row($(this).parents('tr')).data()["sno"];
        var IId = table.row($(this).parents('tr')).data()["itemid"];
        var CId = table.row($(this).parents('tr')).data()["colorid"];
        var SId = table.row($(this).parents('tr')).data()["sizeid"];
        var balq = table.row($(this).parents('tr')).data()["bal"];
        var jmid = table.row($(this).parents('tr')).data()["Job_ord_no"];

        var value = $(this).val();



        $.each(SaveJobDetList, function () {
            if (this.sno == pid) {

                if (balq >= value) {
                    this.IssueQty = value;

                }
                else {
                    var t = value - balq;
                    this.IssueQty = balq;
                }

            }
        });
        $.each(JobDetList, function () {
            if (this.sno == pid) {

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
        for (var a = 0; a < StkDetList.length; a++) {

            if (StkDetList[a].Job_ord_no == jmid) {
                currentrow.push(StkDetList[a]);
                var jm = currentrow[0].Job_ord_no;
                Itmstkid = currentrow[0].ItemStockId;
                var balstk = currentrow[0].balqty;


                $.each(SaveStkDetList, function () {
                    if (this.ItemStockId == Itmstkid) {
                        if (value >= balq) {
                            if (balq >= value) {
                                this.IssueQty = value;
                            }
                            else {

                                var t = value - balq;
                                this.IssueQty = balq;
                            }
                        }
                        else {
                            if (balstk >= value) {
                                this.IssueQty = value;

                            }
                            else {
                                var t = value - balstk;
                                this.IssueQty = balstk;

                            }
                        }

                    }
                    //else{
                    //    if (t < value) {
                    //        $.each(SaveStkDetList, function () {

                    //                this.IssueQty = t;

                    //        });
                    //    }
                    //}
                });
                //if (balstk >= value) {
                //    $.each(SaveStkDetList, function () {
                //        if (this.ItemStockId != Itmstkid || this.Job_ord_no==jm) {
                //            this.IssueQty = 0;
                //        }
                //    });
                //}

                //if (balstk < value) {
                //    $.each(SaveStkDetList, function () {
                //        if (this.ItemStockId != Itmstkid) {
                //            this.IssueQty = 0;
                //        }
                //    });
                //}
                $.each(StkDetList, function () {
                    if (this.stockid == Itmstkid) {
                        if (value >= balq) {
                            if (balq >= value) {
                                this.IssueQty = value;
                            }
                            else {
                                var t = value - balq;
                                this.IssueQty = balq;
                            }
                        }
                        else {
                            if (balstk >= value) {
                                this.IssueQty = value;
                            }
                            else {
                                var t = value - balstk;
                                this.IssueQty = balstk;
                            }
                        }

                    }
                });
            }
        }
        var totalamnt = 0;

        for (var e = 0; e < JobDetList.length; e++) {
            var amount = JobDetList[e].IssueQty;
            totalamnt = totalamnt + parseFloat(amount);
        }
        $.each(ItmList, function () {
            if (this.itemid == IId && this.colorid == CId && this.sizeid == SId) {
                this.IssueQty = totalamnt;

            }
        });

        LoadSaveJobdetTab(SaveJobDetList);
        LoadJobdetTab(JobDetList);
        LoadItmtab(ItmList);
        LoadStkdetTab(StkDetList);
        LoadSaveStkdetTab(SaveStkDetList);

        //Datatable textbox focus
        var rows = $("#tbljobordinfodet").dataTable().fnGetNodes();
        var dtTable = $('#tbljobordinfodet').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
            $('input[id=txtjobOrdQty]').each(function () {
                if (sn == pid) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtjobOrdQty').val();
                    row.find('#txtjobOrdQty').focus().val('').val(num);
                    return true;
                }
            });
        }

    });

    $(document).on('keyup', '.calcStockqty', function () {
        debugger;

        var table = $('#tblstkdetinfo').DataTable();



        var CSno = table.row($(this).parents('tr')).data()["sno"];
        var IId = table.row($(this).parents('tr')).data()["Itemid"];
        var CId = table.row($(this).parents('tr')).data()["Colorid"];
        var SId = table.row($(this).parents('tr')).data()["Sizeid"];
        var balstk = table.row($(this).parents('tr')).data()["balqty"];
        var jm = table.row($(this).parents('tr')).data()["Job_ord_no"];
        var itmstkid = table.row($(this).parents('tr')).data()["ItemStockId"];
        var value = $(this).val();


        currentrowstk = [];
        for (var w = 0; w < SaveJobDetList.length; w++) {
            if (SaveJobDetList[w].Job_ord_no == jm && SaveJobDetList[w].itemid == IId && SaveJobDetList[w].colorid == CId && SaveJobDetList[w].sizeid == SId) {
                currentrowstk.push(SaveJobDetList[w]);
                var jno = currentrowstk[0].Job_ord_no;
                // Itmstkid = currentrow[0].ItemStockId;
                var balq = currentrowstk[0].bal;
            }
        }

        if (value == 0) {
            $.each(StkDetList, function () {
                if (this.ItemStockId == itmstkid) {

                    if (balstk >= value) {
                        if (balq >= value) {
                            this.IssueQty = value;
                        }
                        else {
                            var t = value - balq;
                            this.IssueQty = balq;
                        }
                    }
                    else {
                        var t = value - balstk;
                        this.IssueQty = balstk;
                    }

                }
            });

            $.each(SaveStkDetList, function () {
                if (this.ItemStockId == itmstkid) {

                    if (balstk >= value) {
                        if (balq >= value) {
                            this.IssueQty = value;
                        }
                        else {
                            var t = value - balq;
                            this.IssueQty = balq;
                        }
                    }
                    else {
                        var t = value - balstk;
                        this.IssueQty = balstk;
                    }

                }
            });

            $.each(ItmList, function () {
                if (this.itemid == IId && this.colorid == CId && this.sizeid == SId) {
                    this.IssueQty = value;

                }
            });

            LoadItmtab(ItmList);
            LoadStkdetTab(StkDetList);
            LoadSaveStkdetTab(SaveStkDetList);
            return true;
        }

        $.each(StkDetList, function () {
            if (this.ItemStockId == itmstkid) {

                if (balstk >= value) {
                    if (balq >= value) {
                        this.IssueQty = value;
                    }
                    else {
                        var t = value - balq;
                        this.IssueQty = balq;
                    }
                }
                else {
                    var t = value - balstk;
                    this.IssueQty = balstk;
                }

            }
        });

        $.each(SaveStkDetList, function () {
            if (this.ItemStockId == itmstkid) {

                if (balstk >= value) {
                    if (balq >= value) {
                        this.IssueQty = value;
                    }
                    else {
                        var t = value - balq;
                        this.IssueQty = balq;
                    }
                }
                else {
                    var t = value - balstk;
                    this.IssueQty = balstk;
                }

            }
        });

        var tot = 0;
        for (var d = 0; d < SaveStkDetList.length; d++) {
            if (SaveStkDetList[d].Job_ord_no == jm && SaveStkDetList[d].Itemid == IId && SaveStkDetList[d].Colorid == CId && SaveStkDetList[d].Sizeid == SId) {
                var at = SaveStkDetList[d].IssueQty;
                tot = tot + parseFloat(at);
            }
        }
        //var isqty = parseFloat(tot) + value;
        if (tot > balq) {
            //alert('Should not exceed Bal Qty in JobOrder table');
            var msg = 'Should not exceed Balance quantity in JobOrder table...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);

            return true;
        }





        var currentrow = [];
        for (var a = 0; a < SaveJobDetList.length; a++) {


            if (SaveJobDetList[a].Job_ord_no == jm && SaveJobDetList[a].itemid == IId && SaveJobDetList[a].colorid == CId && SaveJobDetList[a].sizeid == SId) {
                currentrow.push(SaveJobDetList[a]);
                var jno = currentrow[0].Job_ord_no;
                // Itmstkid = currentrow[0].ItemStockId;
                var balq = currentrow[0].bal;

                if (balq <= balstk) {

                }


                $.each(SaveJobDetList, function () {
                    //if (this.JoMasId == jm) {
                    if (this.Job_ord_no == jm && this.itemid == IId && this.colorid == CId && this.sizeid == SId) {
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

                $.each(JobDetList, function () {
                    //if (this.JoMasId == jm) {
                    if (this.Job_ord_no == jm && this.itemid == IId && this.colorid == CId && this.sizeid == SId) {
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




        var totalamnt = 0;

        for (var e = 0; e < StkDetList.length; e++) {
            var amount = StkDetList[e].IssueQty;
            totalamnt = totalamnt + parseFloat(amount);
        }


        $.each(SaveJobDetList, function () {
            if (this.itemid == IId && this.colorid == CId && this.sizeid == SId && this.Job_ord_no == jm) {
                this.IssueQty = totalamnt;

            }
        });
        $.each(JobDetList, function () {
            if (this.itemid == IId && this.colorid == CId && this.sizeid == SId && this.Job_ord_no == jm) {
                this.IssueQty = totalamnt;

            }
        });


        var total = 0;

        for (var e = 0; e < SaveJobDetList.length; e++) {
            if (SaveJobDetList[e].itemid == IId && SaveJobDetList[e].colorid == CId && SaveJobDetList[e].sizeid == SId) {
                var amount = SaveJobDetList[e].IssueQty;
                total = total + parseFloat(amount);
            }
        }

        $.each(ItmList, function () {
            if (this.itemid == IId && this.colorid == CId && this.sizeid == SId) {
                this.IssueQty = total;

            }
        });
        //loadDelStockTable(SItemList);


        LoadSaveJobdetTab(SaveJobDetList);
        LoadJobdetTab(JobDetList);
        LoadItmtab(ItmList);
        LoadStkdetTab(StkDetList);
        LoadSaveStkdetTab(SaveStkDetList);

        //Datatable textbox focus
        var rows = $("#tblstkdetinfo").dataTable().fnGetNodes();
        var dtTable = $('#tblstkdetinfo').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
            $('input[id=txtstkQty]').each(function () {
                if (sn == itmstkid) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtstkQty').val();
                    row.find('#txtstkQty').focus().val('').val(num);
                    return true;
                }
            });
        }
    });

    $('#tblitmdetails').on('click', 'tr', function (e) {
        debugger;

        var table = $('#tblitmdetails').DataTable();

        //var ItmId = table.row($(this).parents('tr')).data()["itemid"];
        //var ClrId = table.row($(this).parents('tr')).data()["colorid"];
        //var SzId = table.row($(this).parents('tr')).data()["sizeid"];


        var row = $(this).closest('tr');
        var data = $('#tblitmdetails').dataTable().fnGetData(row);


        var ItmId = data.itemid;
        var ClrId = data.colorid;
        var SzId = data.sizeid;

        var colorempty = [];
        colorempty = SaveJobDetList;

        colorempty = $.grep(colorempty, function (v) {
            return (v.itemid === ItmId && v.colorid === ClrId && v.sizeid === SzId);
        });

        JobDetList = colorempty;
        LoadJobdetTab(JobDetList);

        var ItmId = JobDetList[0]['itemid'];
        var ClrId = JobDetList[0]['colorid'];
        var SzId = JobDetList[0]['sizeid'];
        var jobno = JobDetList[0]['Job_ord_no'];
        var Stkempty = [];
        Stkempty = SaveStkDetList;

        Stkempty = $.grep(Stkempty, function (v) {
            return (v.Itemid === ItmId && v.Colorid === ClrId && v.Sizeid === SzId && v.Job_ord_no === jobno);
        });

        StkDetList = Stkempty;
        LoadStkdetTab(StkDetList);
    });
    $('#tbljobordinfodet').on('click', 'tr', function (e) {
        debugger;
        var table = $('#tbljobordinfodet').DataTable();

        //var ItmId = table.row($(this).parents('tr')).data()["itemid"];
        //var ClrId = table.row($(this).parents('tr')).data()["colorid"];
        //var SzId = table.row($(this).parents('tr')).data()["sizeid"];
        //var jobno = table.row($(this).parents('tr')).data()["Job_ord_no"];


        var row = $(this).closest('tr');
        var data = $('#tbljobordinfodet').dataTable().fnGetData(row);


        var ItmId = data.itemid;
        var ClrId = data.colorid;
        var SzId = data.sizeid;
        var jobno = data.Job_ord_no;

        var Stkempty = [];
        Stkempty = SaveStkDetList;

        Stkempty = $.grep(Stkempty, function (v) {
            return (v.Itemid === ItmId && v.Colorid === ClrId && v.Sizeid === SzId && v.Job_ord_no === jobno);
        });

        StkDetList = Stkempty;
        LoadStkdetTab(StkDetList);
    });
});
$(document).ready(function () {
    $("#tblitmdetails ").dataTable().find("tbody").on('click', 'tr', function () {
        inditm = (this.rowIndex) - 1;
    });
});

$(document).ready(function () {
    $("#tbljobordinfodet ").dataTable().find("tbody").on('click', 'tr', function () {
        indjbdet = (this.rowIndex) - 1;
    });
});

$(document).ready(function () {
    $("#tblstkdetinfo ").dataTable().find("tbody").on('click', 'tr', function () {
        indstkdet = (this.rowIndex) - 1;
    });
});


function GenerateIssueNumber() {
    debugger;

    table = "Process_Issue_Mas",
    column = "ProcessIssueNo",
    compId = CompanyId,
    Docum = 'PROCESS ISSUE'

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
function GenerateNumber() {
    debugger;

    table = "Process_Issue_Mas",
    column = "ProcessIssueNo",
    compId = CompanyId,
    Docum = 'PROCESS ISSUE'

    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $('#txtissueno').val(result.Value);
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
    $('#txtissueDate').val(Fdatestring);
    $('#txtissDate').val(Fdatestring);

}

function LoadItm(prodord) {
    debugger;

    $.ajax({
        url: "/ProcessIssue/Loaditmsgrid",
        data: JSON.stringify({ procid: prodord }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;

            ItmList = result.Value;
            LoadItmtab(ItmList);
            Itmid = ItmList[0].itemid;
            Colorid = ItmList[0].colorid;
            Sizeid = ItmList[0].sizeid;

        }

    });
}


$(document).on('click', '.btnviewitem', function () {
    debugger;

    var table = $('#tblitmdetails').DataTable();

    var ItmId = table.row($(this).parents('tr')).data()["itemid"];
    var ClrId = table.row($(this).parents('tr')).data()["colorid"];
    var SzId = table.row($(this).parents('tr')).data()["sizeid"];


    var colorempty = [];
    colorempty = SaveJobDetList;

    colorempty = $.grep(colorempty, function (v) {
        return (v.itemid === ItmId && v.colorid === ClrId && v.sizeid === SzId);
    });

    JobDetList = colorempty;
    LoadJobdetTab(JobDetList);

    var ItmId = JobDetList[0]['itemid'];
    var ClrId = JobDetList[0]['colorid'];
    var SzId = JobDetList[0]['sizeid'];
    var jobno = JobDetList[0]['Job_ord_no'];
    var Stkempty = [];
    Stkempty = SaveStkDetList;

    Stkempty = $.grep(Stkempty, function (v) {
        return (v.Itemid === ItmId && v.Colorid === ClrId && v.Sizeid === SzId && v.Job_ord_no === jobno);
    });

    StkDetList = Stkempty;
    LoadStkdetTab(StkDetList);

});



$(document).on('click', '.btnviewstkdet', function () {
    debugger;

    var table = $('#tbljobordinfodet').DataTable();

    var ItmId = table.row($(this).parents('tr')).data()["itemid"];
    var ClrId = table.row($(this).parents('tr')).data()["colorid"];
    var SzId = table.row($(this).parents('tr')).data()["sizeid"];
    var jobno = table.row($(this).parents('tr')).data()["Job_ord_no"];

    var Stkempty = [];
    Stkempty = SaveStkDetList;

    Stkempty = $.grep(Stkempty, function (v) {
        return (v.Itemid === ItmId && v.Colorid === ClrId && v.Sizeid === SzId && v.Job_ord_no === jobno);
    });

    StkDetList = Stkempty;
    LoadStkdetTab(StkDetList);



});
function LoadItmtab(list) {
    $('#tblitmdetails').DataTable().destroy();

    $('#tblitmdetails').DataTable({
        data: list,
        scrollY: 100,
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
                   { title: "Itemid", data: "itemid", "visible": false },
                   { title: "Output Item", data: "item" },
                   { title: "Colorid", data: "colorid", "visible": false },
                   { title: "Category I", data: "color" },
                   { title: "Sizeid", data: "sizeid", "visible": false },
                   { title: "Category II", data: "size" },

                   { title: "Order Qty", data: "orderqty" },
                   { title: "Balance", data: "bal" },
                   {
                       title: "Issue Qty", data: "IssueQty",
                       render: function (data) {

                           return '<input type="text" id="txtOpOrdQty" class="calcAmt form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';

                       },
                   },
                    //{
                    //    title: "View",// data: "jobordno",
                    //    render: function (data) {

                    //        return '<button type="button"  class="btnviewitem btn btn-info btn-round" style="width:25px;padding:0px;"><i class="fa fa-eye"></i></button>';
                    //    }
                    //},
        ]

    });

    var table = $('#tblitmdetails').DataTable();
    $("#tblitmdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblitmdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}



function LoadSaveJobdetTab(list) {
    $('#tblsavejobordinfo').DataTable().destroy();

    $('#tblsavejobordinfo').DataTable({
        data: list,
        columns: [
              { title: "Sno", data: "sno", "visible": false },
                   { title: "Procjobid", data: "processordjobdetid", "visible": false },
                   { title: "Itmid", data: "itemid", "visible": false },
                   { title: "Clrid", data: "colorid", "visible": false },
                   { title: "Sizeid", data: "sizeid", "visible": false },
                   { title: "ProdProgNo", data: "ProdPrgNo" },
                   { title: "Job Ord No", data: "Job_ord_no" },
                   {
                       title: "Balance", data: "bal",

                   },
                   //{ title: "Balance", data: "bal" },

                   {
                       title: "Issues", data: "IssueQty",
                       //render: function (data) {

                       //    return '<input type="text" id="txtiptjobOrdQty" class="editor-active"  style="width: 50px;text-align: center;"  value=' + data + ' onkeyup="calcipsepquan(this.value);">';

                       //},
                   }



        ]

    });
}


function LoadJobdetTab(list) {
    $('#tbljobordinfodet').DataTable().destroy();

    $('#tbljobordinfodet').DataTable({
        data: list,
        scrollY: 100,
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
                   { title: "Procjobid", data: "processordjobdetid", "visible": false },
                   { title: "Itmid", data: "itemid", "visible": false },
                   { title: "Clrid", data: "colorid", "visible": false },
                   { title: "Sizeid", data: "sizeid", "visible": false },
                   { title: "ProdProgNo", data: "ProdPrgNo" },
                   { title: "Job Ord No", data: "Job_ord_no" },
                   {
                       title: "Balance", data: "bal",

                   },
                   //{ title: "Balance", data: "bal" },

                   {
                       title: "Issues", data: "IssueQty",
                       render: function (data) {

                           return '<input type="text" id="txtjobOrdQty" class="calcipsepquan form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';

                       },
                   },
        //{
        //    title: "View",// data: "jobordno",
        //    render: function (data) {

        //        return '<button type="button"  class="btnviewstkdet btn btn-round btn-info" style="width:25px;padding:0px;"><i class="fa fa-eye"></i></button>';
        //    }
        //},



        ]

    });
    var table = $('#tbljobordinfodet').DataTable();
    $("#tbljobordinfodet tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tbljobordinfodet tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}

function calcipsepquan(value) {
    debugger;
    var currentrowoftcpi = JobDetList.slice(indjbdet);


    var IId = currentrowoftcpi[0].itemid;
    var CId = currentrowoftcpi[0].colorid;
    var SId = currentrowoftcpi[0].sizeid;
    // var PUId = currentrowoftcpi[0].OUomid;

    var pid = currentrowoftcpi[0].sno;
    var balq = currentrowoftcpi[0].bal;
    var jmid = currentrowoftcpi[0].Job_ord_no;
    $.each(SaveJobDetList, function () {
        if (this.sno == pid) {

            if (balq >= value) {
                this.IssueQty = value;

            }
            else {
                var t = value - balq;
                this.IssueQty = balq;
            }

        }
    });
    $.each(JobDetList, function () {
        if (this.sno == pid) {

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
    for (var a = 0; a < StkDetList.length; a++) {

        if (StkDetList[a].Job_ord_no == jmid) {
            currentrow.push(StkDetList[a]);
            var jm = currentrow[0].Job_ord_no;
            Itmstkid = currentrow[0].ItemStockId;
            var balstk = currentrow[0].balqty;

            $.each(SaveStkDetList, function () {
                if (this.ItemStockId == Itmstkid) {
                    if (value >= balq) {
                        if (balq >= value) {
                            this.IssueQty = value;
                        }
                        else {
                            var t = value - balq;
                            this.IssueQty = balq;
                        }
                    }
                    else {
                        if (balstk >= value) {
                            this.IssueQty = value;
                        }
                        else {
                            var t = value - balstk;
                            this.IssueQty = balstk;
                        }
                    }

                }
            });

            $.each(StkDetList, function () {
                if (this.stockid == Itmstkid) {
                    if (value >= balq) {
                        if (balq >= value) {
                            this.IssueQty = value;
                        }
                        else {
                            var t = value - balq;
                            this.IssueQty = balq;
                        }
                    }
                    else {
                        if (balstk >= value) {
                            this.IssueQty = value;
                        }
                        else {
                            var t = value - balstk;
                            this.IssueQty = balstk;
                        }
                    }

                }
            });
        }
    }
    var totalamnt = 0;

    for (var e = 0; e < JobDetList.length; e++) {
        var amount = JobDetList[e].IssueQty;
        totalamnt = totalamnt + parseFloat(amount);
    }
    $.each(ItmList, function () {
        if (this.itemid == IId && this.colorid == CId && this.sizeid == SId) {
            this.IssueQty = totalamnt;

        }
    });

    LoadSaveJobdetTab(SaveJobDetList);
    LoadJobdetTab(JobDetList);
    LoadItmtab(ItmList);
    LoadStkdetTab(StkDetList);
    LoadSaveStkdetTab(SaveStkDetList);

}


function LoadJobdet(procid) {
    debugger;


    $.ajax({
        url: "/ProcessIssue/LoadJobdetgrid",
        data: JSON.stringify({ procid: procid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            SaveJobDetList = result.Value;
            LoadSaveJobdetTab(SaveJobDetList);

            var colorempty = [];
            colorempty = SaveJobDetList;

            colorempty = $.grep(colorempty, function (v) {
                return (v.itemid === Itmid && v.colorid === Colorid && v.sizeid === Sizeid);
            });
            JobDetList = [];
            JobDetList = colorempty;
            LoadJobdetTab(colorempty);
            for (var c = 0; c < SaveJobDetList.length; c++) {
                // jmasid[c] = SaveJobDetList[c].jmasid;
                JOrdID = JOrdID + "," + SaveJobDetList[c].jmasid;
            }
            Loadstkdet(JOrdID);
            //jmasid.join(",")
        }

    });
}


function Loadstkdet(JOrdID) {
    debugger;


    $.ajax({
        url: "/ProcessIssue/LoadStkgrid",
        data: JSON.stringify({ jmasid: JOrdID, cmpid: CompanyId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            SaveStkDetList = json.Value;
            LoadSaveStkdetTab(SaveStkDetList);


        }

    });
}

function LoadSaveStkdetTab(list) {
    $('#tblsavestkdetinfo').DataTable().destroy();

    $('#tblsavestkdetinfo').DataTable({
        data: list,
        columns: [
              { title: "Stockid", data: "ItemStockId" },
              { title: "Itmid", data: "Itemid" },
                   { title: "Colorid", data: "Colorid" },
                   { title: "Sizeid", data: "Sizeid" },
                     { title: "Jmasid", data: "jmasid" },
                   { title: "JobOrdNo", data: "Job_ord_no" },
                   { title: "Lot No", data: "LotNo" },
                   {
                       title: "Stock", data: "balqty",

                   },


                   {
                       title: "Issues", data: "IssueQty",
                       //render: function (data) {

                       //    return '<input type="text" id="txtOpjobOrdQty" class="editor-active"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                       //},
                   },
                   { title: "Process", data: "process" },


        ]

    });
}


function LoadStkdetTab(list) {
    $('#tblstkdetinfo').DataTable().destroy();

    $('#tblstkdetinfo').DataTable({
        data: list,
        scrollY: 100,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        //"bSort": false,
        columns: [
              { title: "Stockid", data: "ItemStockId", "visible": false },
              { title: "Itmid", data: "Itemid", "visible": false },
                   { title: "Colorid", data: "Colorid", "visible": false },
                   { title: "Sizeid", data: "Sizeid", "visible": false },
                     { title: "Jmasid", data: "jmasid", "visible": false },
                   { title: "JobOrdNo", data: "Job_ord_no" },
                   { title: "Lot No", data: "LotNo" },
                   {
                       title: "Stock", data: "balqty",

                   },


                   {
                       title: "Issues", data: "IssueQty",
                       render: function (data) {

                           return '<input type="text" id="txtstkQty" class="calcStockqty form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';

                       },
                   },
                   { title: "Process", data: "process" },


        ]

    });

    var table = $('#tblstkdetinfo').DataTable();
    $("#tblstkdetinfo tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblstkdetinfo tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
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


function ClearTextbox() {
    debugger;
    $('#ddlCompany').val("0");
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
}

function Loadprocess() {
    debugger;

    $.ajax({
        url: "/ProcessIssue/GetProcess",
        data: JSON.stringify({}),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            if (result.Status == 'SUCCESS') {

                // if (Mode == 0) {
                var data = result.Value;
                $(ddlinnerpro).empty();
                $(ddlinnerpro).append($('<option/>').val('0').text('--Select Process--'));
                $.each(data, function () {
                    $(ddlinnerpro).append($('<option></option>').val(this.processid).text(this.process));
                });
                //}


            }


        }

    });
}

function Loadsupp() {
    debugger;

    $.ajax({
        url: "/ProcessIssue/GetSupp",
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
                    $(ddlSupplier).append($('<option></option>').val(this.suppid).text(this.supp));
                });
                //}
            }
        }

    });
}

function Loadgrid() {
    debugger;
    //var cunitid = $('select#ddlinnerCompunit option:selected').val();
    //var procid = $('select#ddlinnerpro option:selected').val();
    var ordtype = $('input[name="Revert"]:checked').attr('value');
    var protype = $('input[name="optwrkord"]:checked').attr('value');


    if (protype = 'P') {
        var procrid = $('select#ddlSupplier option:selected').val();
        if (procrid == null || procrid == "0") {
            procrid = 0;
        }
    }
    else if (protype = 'W') {
        var procrid = $('select#ddlwrkdiv option:selected').val();
        if (procrid == null || procrid == "0") {
            procrid = 0;
        }
    }
    var cl = 'N';


    var ord = $('select#ddlinnerOrderNo option:selected').val();
    if (ord == null || ord == "0") {
        ord = '';
    }

    var ref = $('select#ddlinnerjobNo option:selected').val();
    if (ref == null || ref == "0") {
        ref = '';
    }

    var bid = $('select#ddlinnerbuyer option:selected').val();
    if (bid == null || bid == "0") {
        bid = 0;
    }
    var cunitid = $('select#ddlinnerCompunit option:selected').val();
    if (cunitid == null || cunitid == "0") {
        cunitid = 0;
    }
    var procid = $('select#ddlinnerpro option:selected').val();
    if (procid == null || procid == "0") {
        procid = 0;
    }

    $.ajax({
        url: "/ProcessIssue/Loadgrid",
        data: JSON.stringify({ cmpunitid: cunitid, procid: procid, ordertype: ordtype, processortype: protype, buyerid: bid, refno: ref, ordno: ord, procserid: procrid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            entrygriddet = result.Value;

            for (var d = 0; d < entrygriddet.length; d++) {
                entrygriddet[d].procdate = moment(entrygriddet[d].procdate).format("DD/MM/YYYY")
            }

            LoadEntrytab(entrygriddet);


        }

    });
}



function Loadgridddl() {
    debugger;
    //var cunitid = $('select#ddlinnerCompunit option:selected').val();
    //var procid = $('select#ddlinnerpro option:selected').val();
    var ordtype = $('input[name="Revert"]:checked').attr('value');
    var protype = $('input[name="optwrkord"]:checked').attr('value');


    if (protype = 'P') {
        var procrid = $('select#ddlSupplier option:selected').val();
        if (procrid == null || procrid == "0") {
            procrid = 0;
        }
    }
    else if (protype = 'W') {
        var procrid = $('select#ddlwrkdiv option:selected').val();
        if (procrid == null || procrid == "0") {
            procrid = 0;
        }
    }
    var cl = 'N';


    var ord = $('select#ddlinnerOrderNo option:selected').val();
    if (ord == null || ord == "0") {
        ord = '';
    }

    var ref = $('select#ddlinnerjobNo option:selected').val();
    if (ref == null || ref == "0") {
        ref = '';
    }

    var bid = $('select#ddlinnerbuyer option:selected').val();
    if (bid == null || bid == "0") {
        bid = 0;
    }
    var cunitid = $('select#ddlinnerCompunit option:selected').val();
    if (cunitid == null || cunitid == "0") {
        cunitid = 0;
    }
    var procid = $('select#ddlinnerpro option:selected').val();
    if (procid == null || procid == "0") {
        procid = 0;
    }

    $.ajax({
        url: "/ProcessIssue/Loadgrid",
        data: JSON.stringify({ cmpunitid: cunitid, procid: procid, ordertype: ordtype, processortype: protype, buyerid: bid, refno: ref, ordno: ord, procserid: procrid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            entrygriddet = result.Value;

            for (var d = 0; d < entrygriddet.length; d++) {
                entrygriddet[d].procdate = moment(entrygriddet[d].procdate).format("DD/MM/YYYY")
            }

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
                $.each(data, function (i, el) {

                    if (!compdet[el.buyerid]) {
                        compdet[el.buyerid] = true;
                        comp.push(el);
                    }

                    if (!recptdet[el.processid]) {
                        recptdet[el.processid] = true;
                        recpt.push(el);
                    }

                    if (!dcdet[el.orderno]) {
                        dcdet[el.orderno] = true;
                        dc.push(el);
                    }

                    if (!procdet[el.refno]) {
                        procdet[el.refno] = true;
                        proc.push(el);
                    }

                    if (!unitdet[el.cmpunitid]) {
                        unitdet[el.cmpunitid] = true;
                        unit.push(el);
                    }
                });


                $(ddlinnerCompunit).append($('<option/>').val('0').text('--Select Unit--'));
                $.each(unit, function () {
                    $(ddlinnerCompunit).append($('<option></option>').val(this.cmpunitid).text(this.cmpunit));
                });

                $(ddlinnerpro).append($('<option/>').val('0').text('--Select Process--'));
                $.each(recpt, function () {
                    $(ddlinnerpro).append($('<option></option>').val(this.processid).text(this.process));
                });

                $(ddlinnerbuyer).append($('<option/>').val('0').text('--Select Buyer--'));
                $.each(comp, function () {
                    $(ddlinnerbuyer).append($('<option></option>').val(this.buyerid).text(this.buyer));
                });

                $(ddlinnerjobNo).append($('<option/>').val('0').text('--Select Refno--'));
                $.each(proc, function () {
                    $(ddlinnerjobNo).append($('<option></option>').text(this.refno));
                });

                $(ddlinnerOrderNo).append($('<option/>').val('0').text('--Select Orderno--'));
                $.each(dc, function () {
                    $(ddlinnerOrderNo).append($('<option></option>').text(this.orderno));
                });

            }

        }

    });
}

function LoadEntrytab(list) {
    $('#tblcompdetdetails').DataTable().destroy();

    $('#tblcompdetdetails').DataTable({
        data: list,
        columns: [
                   { title: "Prodid", data: "processordid", "visible": false },
                   { title: "Companyid", data: "companyid", "visible": false },
                   { title: "P.ord.No", data: "processorder" },
                   { title: "P.Date", data: "procdate" },
                   { title: "Processor", data: "processor" },
                   { title: "Quantity", data: "qty" },
                   { title: "Issued", data: "issueqty" },
                   { title: "Balance", data: "bal" },
                   {
                       title: "View", data: "processordid",
                       render: function (data) {

                           return '<button type="button" class="btnSelect btn btn_round btn-success" data-toggle="tooltip" data-placement="top" title="Add" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" >  <i class="fa fa-plus"></i> </button>';
                       }
                   },

        ]

    });
}

function IssueMas() {
    debugger;

    var opchk = [];
    for (var y = 0; y < ItmList.length; y++) {
        if (ItmList[y].IssueQty > 0) {
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
    var obj = {
        //ProcessIssueId:
        ProcessIssueNo: $("#txtissueno").val(),
        ProcessIssueDate: $("#txtissueDate").val(),//new Date($('#txtissueDate').val()),
        ProcessOrdId: Processordid,
        Remarks: $("#txtremark").val(),
        GatePassVehicle: "",
        //IssueStoreid:
        CreatedBy: Guserid,
        EWayNo: "",
        EWayDate: $("#txtissueDate").val(),//new Date($('#txtissueDate').val()),
        ProcissDet: ItmList,
        ProcissJobDet: SaveJobDetList,
        Procissstk: SaveStkDetList
    }
    LoadingSymb();
    $.ajax({
        url: "/ProcessIssue/IssueAdd",
        data: JSON.stringify(obj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Value == true) {

                //alert('Data Saved Successfully');
                //window.location.href = "/ProcessIssue/ProcessIssueIndex";
                var msg = 'Data Saved Successfully...';
                var flg = 1;
                var mod = 0;
                var url = "/ProcessIssue/ProcessIssueIndex";
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

function Update() {
    debugger;
    $.each(ItmList, function () {
        this.ProcessIssueId = Masid;
    });
    $.each(SaveJobDetList, function () {
        this.ProcessIssueId = Masid;
    });
    $.each(SaveStkDetList, function () {
        this.ProcessIssueId = Masid;
        this.ProcessIssueNo = $("#txtissueno").val();
    });


    var opchk = [];
    for (var y = 0; y < ItmList.length; y++) {
        if (ItmList[y].IssueQty > 0) {
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

    var obj = {
        ProcessIssueId: Masid,
        ProcessIssueNo: $("#txtissueno").val(),
        ProcessIssueDate: $("#txtissueDate").val(),//new Date($('#txtissueDate').val()),
        ProcessOrdId: Procordid,
        Remarks: $("#txtremark").val(),
        GatePassVehicle: "",
        //IssueStoreid:
        CreatedBy: Guserid,
        EWayNo: "",
        EWayDate: $("#txtissueDate").val(),//new Date($('#txtissueDate').val()),
        ProcissDet: ItmList,
        ProcissJobDet: SaveJobDetList,
        Procissstk: SaveStkDetList
    }
    LoadingSymb();
    $.ajax({
        url: "/ProcessIssue/Update",
        data: JSON.stringify(obj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Value == true) {

                //alert('Data Updated Successfully');
                //window.location.href = "/ProcessIssue/ProcessIssueIndex";
                var msg = 'Data Updated Successfully...';
                var flg = 1;
                var mod = 0;
                var url = "/ProcessIssue/ProcessIssueIndex";
                AlartMessage(msg, flg, mod, url);
            }
            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }

    });


}

function MasDelete() {
    debugger;
    $.each(ItmList, function () {
        this.ProcessIssueId = Masid;
    });
    $.each(SaveJobDetList, function () {
        this.ProcessIssueId = Masid;
    });
    $.each(SaveStkDetList, function () {
        this.ProcessIssueId = Masid;
        this.ProcessIssueNo = $("#txtissueno").val();
    });

    var obj = {
        ProcessIssueId: Masid,
        ProcessIssueNo: $("#txtissueno").val(),
        ProcessIssueDate: $("#txtissueDate").val(),//new Date($('#txtissueDate').val()),
        ProcessOrdId: Procordid,
        Remarks: $("#txtremark").val(),
        GatePassVehicle: "",
        //IssueStoreid:
        CreatedBy: Guserid,
        EWayNo: "",
        EWayDate: $("#txtissueDate").val(),//new Date($('#txtissueDate').val()),
        ProcissDet: ItmList,
        ProcissJobDet: SaveJobDetList,
        Procissstk: SaveStkDetList
    }
    LoadingSymb();
    $.ajax({
        url: "/ProcessIssue/Delete",
        data: JSON.stringify(obj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Value == true) {

                //alert('Data Deleted Successfully');
                //window.location.href = "/ProcessIssue/ProcessIssueIndex";
                var msg = 'Data Deleted Successfully...';
                var flg = 2;
                var mod = 0;
                var url = "/ProcessIssue/ProcessIssueIndex";
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


function LoadMaingrid() {
    debugger;

    var type = $('input[name="Maintype"]:checked').attr('value');
    var proctype = $('input[name="proctype"]:checked').attr('value');

    var Procord = "";
    var ONo = $('select#ddlMProcessOrdno option:selected').val();

    if (ONo == 0) {
        Procord == "";
    }
    else {

        Procord = $('select#ddlMProcessOrdno option:selected').val();
    }

    var Issueno = "";
    var RNo = $('select#ddlMIssueNo option:selected').val();

    if (RNo == 0) {
        Issueno == "";
    }
    else {

        Issueno = $('select#ddlMIssueNo option:selected').val();
    }


    var prod = "";
    var ordNo = $('select#ddlMOrderNo option:selected').val();

    if (ordNo == 0) {
        prod == "";
    }
    else {

        prod = $('select#ddlMOrderNo option:selected').val();
    }

    var rf = "";
    var refNo = $('select#ddlMRefno option:selected').val();

    if (refNo == 0) {
        rf == "";
    }
    else {

        rf = $('select#ddlMRefno option:selected').val();
    }
    var masid = 0;

    var ty = $('#ddlMType').val();
    if (ty == 0) {
        ty = "";
    }
    var CompId = $('#ddlMCompany').val();
    if (CompId == null || CompId == "0") {
        CompId = 0;
    }
    //var prod = $('#ddlMOrderNo').val();
    //if (prod == null || prod == "0") {
    //    prod = "";
    //}
    var Unit = $('#ddlMunit').val();
    if (Unit == null || Unit == "0") {
        Unit = 0;
    }

    //var Procord = $('#ddlMProcessOrdno').val();
    //if (Procord == null) {
    //    Procord = 0;
    //}

    //var refno = $('#ddlMRefno').text();
    //if (refno == null) {
    //    refno = 0;
    //}

    //var Issueno = $('#ddlMIssueNo').val();
    //if (Issueno == null) {
    //    Issueno = 0;
    //}
    var prid = 0;
    var process = $('#ddlprocess').val();
    if (process == null || process == "0") {
        process = 0;
    }
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    $.ajax({
        url: "/ProcessIssue/LoadMaingrid",
        data: JSON.stringify({ cmpid: CompId, issueno: Issueno, processid: process, ordno: prod, masid: masid, procordno: Procord, unitid: Unit, refno: rf, ordtype: ty, fromDate: FDate, todate: TDate }),
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
                         { title: "ProcessIssueid", "visible": false },
                          { title: "ProcessOrdid", "visible": false },
                         { title: "ProcessIssueNo" },
                         { title: "Process Date" },
                         { title: "Unit" },
                         { title: "Process" },
                         { title: "RefNo" },
                         { title: "Type", "visible": false },
                          { title: "Action" },


                ]

            });


            //ddlmain();
            //$('#ddlMOrderNo').empty();
            //$('#ddlMRefno').empty();
            //$('#ddlMCompany').empty();
            //$('#ddlprocess').empty();
            //$('#ddlMunit').empty();
            //$('#ddlMProcessOrdno').empty();
            //$('#ddlMIssueNo').empty();

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
            CheckRights("ProcessIssue");
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}



function ddlmain() {
    debugger;

    var type = $('input[name="Maintype"]:checked').attr('value');
    var proctype = $('input[name="proctype"]:checked').attr('value');




    var Procord = "";
    var ONo = $('select#ddlMProcessOrdno option:selected').val();

    if (ONo == 0) {
        Procord == "";
    }
    else {

        Procord = $('select#ddlMProcessOrdno option:selected').val();
    }

    var Issueno = "";
    var RNo = $('select#ddlMIssueNo option:selected').val();

    if (RNo == 0) {
        Issueno == "";
    }
    else {

        Issueno = $('select#ddlMIssueNo option:selected').val();
    }


    var prod = "";
    var ordNo = $('select#ddlMOrderNo option:selected').val();

    if (ordNo == 0) {
        prod == "";
    }
    else {

        prod = $('select#ddlMOrderNo option:selected').val();
    }

    var rf = "";
    var refNo = $('select#ddlMRefno option:selected').val();

    if (refNo == 0) {
        rf == "";
    }
    else {

        rf = $('select#ddlMRefno option:selected').val();
    }
    var masid = 0;

    var ty = $('#ddlMType').val();

    if (ty == 0) {
        ty = "";
    }
    var CompId = $('#ddlMCompany').val();
    if (CompId == null || CompId == "0") {
        CompId = 0;
    }
    //var prod = $('#ddlMOrderNo').val();
    //if (prod == null || prod == "0") {
    //    prod = "";
    //}
    var Unit = $('#ddlMunit').val();
    if (Unit == null || Unit == "0") {
        Unit = 0;
    }

    //var Procord = $('#ddlMProcessOrdno').val();
    //if (Procord == null) {
    //    Procord = 0;
    //}

    //var refno = $('#ddlMRefno').text();
    //if (refno == null) {
    //    refno = 0;
    //}

    //var Issueno = $('#ddlMIssueNo').val();
    //if (Issueno == null) {
    //    Issueno = 0;
    //}
    var prid = 0;
    var process = $('#ddlprocess').val();
    if (process == null || process == "0") {
        process = 0;
    }
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    $.ajax({
        url: "/ProcessIssue/LoadMaingriddet",
        data: JSON.stringify({ cmpid: CompId, issueno: Issueno, processid: process, ordno: prod, masid: masid, procordno: Procord, unitid: Unit, refno: rf, ordtype: ty, fromDate: FDate, todate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            var obj = json.Value;
            if (json.Status == 'SUCCESS') {
                var data = json.Value;
                entrygriddet = data;
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
                var issdet = {};
                var iss = [];
                $.each(obj, function (i, el) {

                    if (!compdet[el.companyid]) {
                        compdet[el.companyid] = true;
                        comp.push(el);
                    }

                    if (!recptdet[el.orderno]) {
                        recptdet[el.orderno] = true;
                        recpt.push(el);
                    }

                    if (!dcdet[el.refno]) {
                        dcdet[el.refno] = true;
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

                    if (!orddet[el.unitid]) {
                        orddet[el.processorder] = true;
                        ord.push(el);
                    }

                    if (!issdet[el.processissue]) {
                        issdet[el.processissue] = true;
                        iss.push(el);
                    }
                });



                $(ddlMOrderNo).append($('<option/>').val('0').text('--Select OrderNo--'));
                $.each(recpt, function () {
                    $(ddlMOrderNo).append($('<option></option>').text(this.orderno));
                });

                $(ddlMRefno).append($('<option/>').val('0').text('--Select RefNo--'));
                $.each(dc, function () {
                    $(ddlMRefno).append($('<option></option>').text(this.refno));
                });

                $(ddlMCompany).append($('<option/>').val('0').text('--Select Company--'));
                $.each(comp, function () {
                    $(ddlMCompany).append($('<option></option>').val(this.companyid).text(this.company));
                });

                $(ddlprocess).append($('<option/>').val('0').text('--Select Processs--'));
                $.each(proc, function () {
                    $(ddlprocess).append($('<option></option>').val(this.processid).text(this.process));
                });

                $(ddlMunit).append($('<option/>').val('0').text('--Select Unit--'));
                $.each(unit, function () {
                    $(ddlMunit).append($('<option></option>').val(this.cmpunitid).text(this.cmpunit));
                });

                $(ddlMProcessOrdno).append($('<option/>').val('0').text('--Select ProcessOrd--'));
                $.each(ord, function () {
                    $(ddlMProcessOrdno).append($('<option></option>').text(this.processorder));
                });

                $(ddlMIssueNo).append($('<option/>').val('0').text('--Select IssueNo--'));
                $.each(iss, function () {
                    $(ddlMIssueNo).append($('<option></option>').text(this.processissue));
                });
            }


        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function CMainlist() {
    $('#tblmaindetails').DataTable().destroy();
    LoadMaingrid();
}


function getbyID(id, proid) {
    debugger;

    Masid = id;
    Procordid = proid;
    var type = $('input[name="Maintype"]:checked').attr('value');
    var proctype = $('input[name="proctype"]:checked').attr('value');




    var Procord = "";
    var ONo = $('select#ddlMProcessOrdno option:selected').val();

    if (ONo == 0) {
        Procord == "";
    }
    else {

        Procord = $('select#ddlMProcessOrdno option:selected').val();
    }

    var Issueno = "";
    var RNo = $('select#ddlMIssueNo option:selected').val();

    if (RNo == 0) {
        Issueno == "";
    }
    else {

        Issueno = $('select#ddlMIssueNo option:selected').val();
    }


    var prod = "";
    var ordNo = $('select#ddlMOrderNo option:selected').val();

    if (ordNo == 0) {
        prod == "";
    }
    else {

        prod = $('select#ddlMOrderNo option:selected').val();
    }

    var rf = "";
    var refNo = $('select#ddlMRefno option:selected').val();

    if (refNo == 0) {
        rf == "";
    }
    else {

        rf = $('select#ddlMRefno option:selected').val();
    }
    var masid = id;

    var ty = $('#ddlMType').val();

    if (ty == 0) {
        ty = "";
    }
    var CompId = $('#ddlMCompany').val();
    if (CompId == null || CompId == "0") {
        CompId = 0;
    }
    //var prod = $('#ddlMOrderNo').val();
    //if (prod == null || prod == "0") {
    //    prod = "";
    //}
    var Unit = $('#ddlMunit').val();
    if (Unit == null || Unit == "0") {
        Unit = 0;
    }

    //var Procord = $('#ddlMProcessOrdno').val();
    //if (Procord == null) {
    //    Procord = 0;
    //}

    //var refno = $('#ddlMRefno').text();
    //if (refno == null) {
    //    refno = 0;
    //}

    //var Issueno = $('#ddlMIssueNo').val();
    //if (Issueno == null) {
    //    Issueno = 0;
    //}
    var prid = 0;
    var process = $('#ddlprocess').val();
    if (process == null || process == "0") {
        process = 0;
    }
    var FDate = "";// $('#txtFromDate').val();
    var TDate = "";//$('#txtToDate').val();
    $.ajax({
        url: "/ProcessIssue/LoadMaingriddet",
        data: JSON.stringify({ cmpid: CompId, issueno: Issueno, processid: process, ordno: prod, masid: masid, procordno: Procord, unitid: Unit, refno: rf, ordtype: ty, fromDate: FDate, todate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            var obj = json.Value;
            $('#myModal1').show();
            $('#myModal1').modal('show');
            $('#btnUpdate').show();
            $('#btnDel').hide();
            $('#btnAdd').hide();
            var obj = json.Value;

            $('#txtissueDate').val(moment(obj[0].procdate).format("DD/MM/YYYY"));

            $('#txtunit').val(obj[0].cmpunit);
            $('#txtprocess').val(obj[0].process);
            $('#txtprocessor').val(obj[0].supp);
            $('#txtissueno').val(obj[0].processissue);
            $('#txtprodno').val(obj[0].processorder);
            $('#txtremark').val(obj[0].remarks);
            CompanyId = obj[0].companyid;

            LoadEditItm();
            LoadEditJobdet();
            // LoadEditStkdet();

        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}
function getDeleteID(id, proid) {
    debugger;

    Masid = id;
    Procordid = proid;
    var type = $('input[name="Maintype"]:checked').attr('value');
    var proctype = $('input[name="proctype"]:checked').attr('value');




    var Procord = "";
    var ONo = $('select#ddlMProcessOrdno option:selected').val();

    if (ONo == 0) {
        Procord == "";
    }
    else {

        Procord = $('select#ddlMProcessOrdno option:selected').val();
    }

    var Issueno = "";
    var RNo = $('select#ddlMIssueNo option:selected').val();

    if (RNo == 0) {
        Issueno == "";
    }
    else {

        Issueno = $('select#ddlMIssueNo option:selected').val();
    }


    var prod = "";
    var ordNo = $('select#ddlMOrderNo option:selected').val();

    if (ordNo == 0) {
        prod == "";
    }
    else {

        prod = $('select#ddlMOrderNo option:selected').val();
    }

    var rf = "";
    var refNo = $('select#ddlMRefno option:selected').val();

    if (refNo == 0) {
        rf == "";
    }
    else {

        rf = $('select#ddlMRefno option:selected').val();
    }
    var masid = id;

    var ty = $('#ddlMType').val();

    if (ty == 0) {
        ty = "";
    }
    var CompId = $('#ddlMCompany').val();
    if (CompId == null || CompId == "0") {
        CompId = 0;
    }
    //var prod = $('#ddlMOrderNo').val();
    //if (prod == null || prod == "0") {
    //    prod = "";
    //}
    var Unit = $('#ddlMunit').val();
    if (Unit == null || Unit == "0") {
        Unit = 0;
    }

    //var Procord = $('#ddlMProcessOrdno').val();
    //if (Procord == null) {
    //    Procord = 0;
    //}

    //var refno = $('#ddlMRefno').text();
    //if (refno == null) {
    //    refno = 0;
    //}

    //var Issueno = $('#ddlMIssueNo').val();
    //if (Issueno == null) {
    //    Issueno = 0;
    //}
    var prid = 0;
    var process = $('#ddlprocess').val();
    if (process == null || process == "0") {
        process = 0;
    }
    var FDate = "";// $('#txtFromDate').val();
    var TDate = "";//$('#txtToDate').val();
    $.ajax({
        url: "/ProcessIssue/LoadMaingriddet",
        data: JSON.stringify({ cmpid: CompId, issueno: Issueno, processid: process, ordno: prod, masid: masid, procordno: Procord, unitid: Unit, refno: rf, ordtype: ty, fromDate: FDate, todate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            var obj = json.Value;
            $('#myModal1').show();
            $('#myModal1').modal('show');
            $('#btnUpdate').hide();
            $('#btnDel').show();
            $('#btnAdd').hide();
            var obj = json.Value;

            $('#txtissueDate').val(moment(obj[0].procdate).format("DD/MM/YYYY"));

            $('#txtunit').val(obj[0].cmpunit);
            $('#txtprocess').val(obj[0].process);
            $('#txtprocessor').val(obj[0].supp);
            $('#txtissueno').val(obj[0].processissue);
            $('#txtprodno').val(obj[0].processorder);
            $('#txtremark').val(obj[0].remarks);
            CompanyId = obj[0].companyid;

            LoadEditItm();
            LoadEditJobdet();
            // LoadEditStkdet();

        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });


}

function LoadEditItm() {
    debugger;

    $.ajax({
        url: "/ProcessIssue/LoadEdititmsgrid",
        data: JSON.stringify({ procid: Masid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;

            ItmList = result.Value;
            LoadItmtab(ItmList);
            Itmid = ItmList[0].itemid;
            Colorid = ItmList[0].colorid;
            Sizeid = ItmList[0].sizeid;

        }

    });
}

function LoadEditJobdet() {
    debugger;
    var IssId = Masid;
    $.ajax({
        url: "/ProcessIssue/LoadeditJobdetgrid",
        data: JSON.stringify({ procid: IssId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            SaveJobDetList = result.Value;
            LoadSaveJobdetTab(SaveJobDetList);

            var colorempty = [];
            colorempty = SaveJobDetList;

            colorempty = $.grep(colorempty, function (v) {
                return (v.itemid === Itmid && v.colorid === Colorid && v.sizeid === Sizeid);
            });

            for (var c = 0; c < SaveJobDetList.length; c++) {
                // jmasid[c] = SaveJobDetList[c].jmasid;
                JOrdID = JOrdID + "," + SaveJobDetList[c].jmasid;
            }
            LoadEditStkdet(JOrdID);

        }

    });

}

function LoadEditStkdet(JOrdID) {
    debugger;


    $.ajax({
        url: "/ProcessIssue/LoadeditStkgrid",
        data: JSON.stringify({ jmasid: JOrdID, cmpid: CompanyId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            SaveStkDetList = json.Value;
            LoadSaveStkdetTab(SaveStkDetList);


        }

    });
}



function ProcessIssPrint(Id) {
    debugger;
    Repid = Id;
    $('#myModal2').modal('show');

    docname = "PROCESS ISSUE - EXTERNAL";
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

    window.location.href = "../ReportInline/Process/ProcessIssue/ProcessIssueReportInline.aspx?Masid=" + Repid + "&Ordqtydet=" + p[0] + "&Ins=" + p[1] + "&Gatepass=" + p[2] + "&Bal=" + p[3] + "&Lotdet=" + p[4] + "&Millname=" + p[5] + "&Rate=" + p[6] + "&Footer=" + p[7] + "&InpGst=" + p[8] + "&Ewaybill=" + p[9] + "&Ewaydate=" + p[10] + "&Refno=" + p[11];

}

function backtomain() {
    $("#myModal2").hide();
    $("#myModal2").modal('hide');
}