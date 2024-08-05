
var GrnId = 0;
var Mode = 0;
var OrdType = 0
var ItemType = 0;
var CompId = 0;
var SuppId = 0;
var ItemList = [];
var OItemList = [];
var OSItemList = [];
var Itemrowindex = -1;
var rowindex = -1;
var index = 0;
var indexitm = -1;
var indexstk = -1;
var AllotedItemList = [];
var Userid = 0;
var UserName = 0;
var Guserid = 0;
var PurAgnInd = 0;
var EnbTranDate = 0;
var PurItemType = 0;
$(document).ready(function () {

    Guserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    PurAgnInd = $("#hdnPurAgnIndid").data('value');
    EnbTranDate = $("#hdnETransDate").data('value');
    var qrStr = window.location.search;
    var spQrStr = qrStr.substring(1);
    var arrQrStr = new Array();
    var arr = spQrStr.split('?');

    for (var i = 0; i < arr.length; i++) {
        var queryvalue = arr[i].split('=');

    }
    var GrnMasId = queryvalue[1];
    OrdType = queryvalue[3];
    ItemType = queryvalue[5];
    CompId = queryvalue[7];
    SuppId = queryvalue[9];
    GrnId = queryvalue[11];
    Mode = queryvalue[13];

    PurItemType = ItemType;
    if (EnbTranDate == "Y") {
        $("#txtQltyDate").prop("disabled", true);

    } else {
        $("#txtQltyDate").prop("disabled", false);

    }
    if (Mode == 0) {
        LoadQualityDetails(GrnId);
        getDate();
        GenerateNumber();
    } else if (Mode == 1) {
        LoadQualityEditDetails(GrnId);
    } else if (Mode == 2) {
        LoadQualityEditDetails(GrnId);
    }

    $(document).on('keyup', '.RejcalcQty', function () {
        debugger;

        var table = $('#tbItemEntrygrid').DataTable();

        var GrnDetId = table.row($(this).parents('tr')).data()["Grn_detid"];
        var ExcQty = table.row($(this).parents('tr')).data()["excess_qty"];

        var Val = $(this).val();

       //if (ExcQty > 0) {
            //alert("Execess Qty are made for this row,So rejected are not alowed...");
            //var msg = 'Execess quantity are made for this row,So rejected are not alowed...';
            //var flg = 4;
            //var mod = 1;
            //var url = "";
            //AlartMessage(msg, flg, mod, url);

            //$.each(ItemList, function () {
            //    if (this.Grn_detid == GrnDetId) {
            //        this.grnreject = 0;
            //    }
            //});
            //loadQltyItemTable(ItemList);
            //return true;
        //}
        //else {
            $.each(ItemList, function () {
                if (this.Grn_detid == GrnDetId) {
                    this.grnreject = Val;
                    this.grnreturn = Val;

                }
            });
            loadQltyItemTable(ItemList);
       // }

        var rows = $("#tbItemEntrygrid").dataTable().fnGetNodes();
        var dtTable = $('#tbItemEntrygrid').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
            $('input[id=txtTQty]').each(function () {
                if (sn == GrnDetId && $(this).val() == Val) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtTQty').val();
                    row.find('#txtTQty').focus().val('').val(num);
                    return true;
                }
            });
        }
    });
    $(document).on('keyup', '.ExRetcalcQty', function () {
        debugger;

        var table = $('#tbItemEntrygrid').DataTable();

        var GrnDetId = table.row($(this).parents('tr')).data()["Grn_detid"];
        var ExcQty = table.row($(this).parents('tr')).data()["excess_qty"];

        var Val = $(this).val();

        if (Val > ExcQty) {
            //alert("Excess Return Qty are not greater then ExcessQty...");
            var msg = 'Excess Return quantity are not greater then Excess quantity...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);

            $.each(ItemList, function () {
                if (this.Grn_detid == GrnDetId) {
                    this.excess_return = 0;


                }
            });
            loadQltyItemTable(ItemList);
            return true;
        }
        else {
            $.each(ItemList, function () {
                if (this.Grn_detid == GrnDetId) {
                    this.excess_return = Val;


                }
            });
            loadQltyItemTable(ItemList);
        }

        var rows = $("#tbItemEntrygrid").dataTable().fnGetNodes();
        var dtTable = $('#tbItemEntrygrid').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
            $('input[id=txtExcessTQty]').each(function () {
                if (sn == GrnDetId && $(this).val() == Val) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtExcessTQty').val();
                    row.find('#txtExcessTQty').focus().val('').val(num);
                    return true;
                }
            });
        }
    });
    $(document).on('keyup', '.ReccalcQty', function () {
        debugger;

        var table = $('#tbItemEntrygrid').DataTable();

        var GrnDetId = table.row($(this).parents('tr')).data()["Grn_detid"];
        var ExcQty = table.row($(this).parents('tr')).data()["excess_qty"];
        var debit = table.row($(this).parents('tr')).data()["Debit"];

        var Val = $(this).val();
        var quan = Val;
        if (ExcQty > 0) {
            //alert("Execess Qty are made for this row,So receivable are not alowed...");
            var msg = 'Execess quantity are made for this row,So receivable are not alowed...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);


            $.each(ItemList, function () {
                if (this.Grn_detid == GrnDetId) {
                    this.grnreceivable = 0;


                }
            });
            loadQltyItemTable(ItemList);
            return true;
        }
        else {
            if (debit > 0) {
                //alert('Already Debit is filled...');
                var msg = 'Already Debit is filled...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                $.each(ItemList, function () {
                    if (this.Grn_detid == GrnDetId) {
                        this.grnreceivable = 0;


                    }
                });
                loadQltyItemTable(ItemList);
                return true;
            }
            $.each(ItemList, function () {
                if (this.Grn_detid == GrnDetId) {
                    this.grnreceivable = Val;


                }
            });

            loadQltyItemTable(ItemList);


            var poid = table.row($(this).parents('tr')).data()["Grn_detid"];
            var qty = table.row($(this).parents('tr')).data()["grnqty"];
            var oid = table.row($(this).parents('tr')).data()["order_no"];
            var po = table.row($(this).parents('tr')).data()["pur_ord_no"];

            OSItemList;
            var jid = [];
            var pid = [];
            var bal = [];
            var ordbal = [];
            var detid = [];
            for (var d = 0; d < OSItemList.length; d++) {
                if (OSItemList[d].grn_detid == poid) {
                    jid.push(OSItemList[d].order_no);
                    pid.push(OSItemList[d].pur_ord_no);
                    bal.push(OSItemList[d].PurRecvdQty);
                    ordbal.push(OSItemList[d].orderqty);
                    // detid.push(OSItemList[d].);
                }
            }
            var arr = [];
            // arr = $.unique(bal);
            var t = jid.length;
            var p = pid.length;
            var pt = [];
            var rt = [];
            var h = 0;
            for (var f = t; f <= jid.length; f--) {
                for (var r = p; r <= pid.length; r--) {
                    var d = bal[f - 1];
                    var hg = ordbal[f - 1];
                    if (d > 0) {
                        bal[f - 1] = d - Val;
                        var l = d - Val;
                        if (l > 0) {
                            ordbal[f - 1] = ordbal[f - 1] - Val;
                            var t = ordbal[f - 1];
                            if (t > 0) {
                                h = bal[f - 1];
                                pt = [];
                                rt = [];
                                pt.push(pid[r - 1]);
                                rt.push(jid[f - 1]);
                                if (pt.length > 0) {
                                    $.each(OSItemList, function () {
                                        if (this.pur_ord_no === pt[0] && this.grn_detid === poid) {
                                            this.porderqty = h;
                                        }
                                    });

                                    $.each(OSItemList, function () {
                                        if (this.order_no === rt[0] && this.pur_ord_no === pt[0] && this.grn_detid === poid) {
                                            this.accept_qty = ordbal[f - 1];
                                        }
                                    });
                                    loadQltyOrdSaveTable(OSItemList);

                                    $.each(OItemList, function () {
                                        if (this.pur_ord_no === pt[0]) {
                                            this.porderqty = h;
                                        }
                                    });
                                    $.each(OItemList, function () {
                                        if (this.order_no === rt[0] && this.pur_ord_no === pt[0] && this.grn_detid === poid) {
                                            this.accept_qty = ordbal[f - 1];
                                        }
                                    });
                                    loadQltyOrdTable(OItemList);

                                    $.each(ItemList, function () {
                                        if (this.Grn_detid === poid) {
                                            //this.grnreceivable
                                            this.grnaccept = qty - Val;
                                        }
                                    });
                                    loadQltyItemTable(ItemList);
                                    var rows = $("#tbItemEntrygrid").dataTable().fnGetNodes();
                                    var dtTable = $('#tbItemEntrygrid').DataTable();
                                    for (var i = 0; i < rows.length; i++) {
                                        var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
                                        $('input[id=txtAccQty]').each(function () {
                                            if (sn == GrnDetId && $(this).val() == quan) {
                                                var row = $(this).closest('tr');
                                                var num = row.find('#txtAccQty').val();
                                                row.find('#txtAccQty').focus().val('').val(num);
                                                return true;
                                            }
                                        });
                                    }
                                    return true;
                                }
                            }
                            else if (t < 0) {
                                ordbal[f - 1] = 0;
                                pt = [];
                                rt = [];
                                pt.push(pid[r - 1]);
                                rt.push(jid[f - 1]);
                                $.each(OSItemList, function () {
                                    if (this.order_no === rt[0] && this.pur_ord_no === pt[0] && this.grn_detid === poid) {
                                        this.accept_qty = 0;// ordbal[f - 1];
                                    }
                                });
                                $.each(OItemList, function () {
                                    if (this.order_no === rt[0] && this.pur_ord_no === pt[0] && this.grn_detid === poid) {
                                        this.accept_qty = 0;// ordbal[f - 1];
                                    }
                                });
                                $.each(OItemList, function () {
                                    if (this.pur_ord_no === pt[0]) {
                                        this.porderqty = bal[f - 1];
                                    }
                                });


                                $.each(OSItemList, function () {
                                    if (this.pur_ord_no === pt[0] && this.grn_detid === poid) {
                                        this.porderqty = bal[f - 1];
                                    }
                                });
                                f--;
                                r--;
                                if (r == 0) {
                                    r = 1;
                                }
                                if (f == 0) {
                                    f = 1;
                                }


                                Val = parseFloat(Val) - parseFloat(hg);
                                Val = ordbal[f - 1] - Val;
                                pt = [];
                                rt = [];
                                pt.push(pid[r - 1]);
                                rt.push(jid[f - 1]);
                                $.each(OSItemList, function () {
                                    if (this.order_no === rt[0] && this.pur_ord_no === pt[0] && this.grn_detid === poid) {
                                        this.accept_qty = Val;
                                    }
                                });
                                $.each(OItemList, function () {
                                    if (this.order_no === rt[0] && this.pur_ord_no === pt[0] && this.grn_detid === poid) {
                                        this.accept_qty = Val;
                                    }
                                });
                                //$.each(OItemList, function () {
                                //    if (this.pur_ord_no === pt[0]) {
                                //        this.porderqty = bal[f - 1];
                                //    }
                                //});
                                loadQltyOrdSaveTable(OSItemList);
                                loadQltyOrdTable(OItemList);
                                if (Val >= 0) {
                                    return true;
                                }
                            }
                            else if (t == 0) {
                                ordbal[f - 1] = 0;
                                pt = [];
                                rt = [];
                                pt.push(pid[r - 1]);
                                rt.push(jid[f - 1]);
                                $.each(OSItemList, function () {
                                    if (this.order_no === rt[0] && this.pur_ord_no === pt[0] && this.grn_detid === poid) {
                                        this.accept_qty = 0;// ordbal[f - 1];
                                    }
                                });
                                $.each(OItemList, function () {
                                    if (this.order_no === rt[0] && this.pur_ord_no === pt[0] && this.grn_detid === poid) {
                                        this.accept_qty = 0;// ordbal[f - 1];
                                    }
                                });
                                $.each(OItemList, function () {
                                    if (this.pur_ord_no === pt[0]) {
                                        this.porderqty = bal[f - 1];
                                    }
                                });

                                $.each(OSItemList, function () {
                                    if (this.pur_ord_no === pt[0] && this.grn_detid === poid) {
                                        this.porderqty = bal[f - 1];
                                    }
                                });
                                loadQltyOrdSaveTable(OSItemList);
                                loadQltyOrdTable(OItemList);

                                return true;
                            }
                        }
                        else if (l < 0) {
                            //var uy = Val + l;
                            // ordbal[f - 1] = ordbal[f - 1] - Val;
                            var p = bal[f - 1];
                            bal[f - 1] = 0;
                            ordbal[f - 1] = 0;
                            // h = bal[f - 1];

                            pt = [];
                            rt = [];
                            pt.push(pid[r - 1]);
                            rt.push(jid[f - 1]);
                            $.each(OSItemList, function () {
                                if (this.pur_ord_no === pt[0] && this.grn_detid === poid) {
                                    this.porderqty = 0;
                                }
                            });

                            $.each(OItemList, function () {
                                if (this.pur_ord_no === pt[0]) {
                                    this.porderqty = 0;
                                }
                            });
                            $.each(OSItemList, function () {
                                if (this.order_no === rt[0] && this.pur_ord_no === pt[0] && this.grn_detid === poid) {
                                    this.accept_qty = ordbal[f - 1];
                                }
                            });
                            $.each(OItemList, function () {
                                if (this.order_no === rt[0] && this.pur_ord_no === pt[0] && this.grn_detid === poid) {
                                    this.accept_qty = ordbal[f - 1];
                                }
                            });
                            loadQltyOrdTable(OItemList);
                            loadQltyOrdSaveTable(OSItemList);
                            f--;
                            r--;
                            if (r == 0) {
                                r = 1;
                            }
                            if (f == 0) {
                                f = 1;
                            }
                            if (bal[f - 1] == d) {
                                bal[f - 1] = 0;
                                ordbal[f - 1] = 0;
                                pt = [];
                                rt = [];
                                pt.push(pid[r - 1]);
                                rt.push(jid[f - 1]);
                                $.each(OSItemList, function () {
                                    if (this.pur_ord_no === pt[0] && this.grn_detid === poid) {
                                        this.porderqty = 0;
                                    }
                                });

                                $.each(OItemList, function () {
                                    if (this.pur_ord_no === pt[0]) {
                                        this.porderqty = 0;
                                    }
                                });
                                $.each(OSItemList, function () {
                                    if (this.order_no === rt[0] && this.pur_ord_no === pt[0] && this.grn_detid === poid) {
                                        this.accept_qty = ordbal[f - 1];
                                    }
                                });
                                $.each(OItemList, function () {
                                    if (this.order_no === rt[0] && this.pur_ord_no === pt[0] && this.grn_detid === poid) {
                                        this.accept_qty = ordbal[f - 1];
                                    }
                                });
                                loadQltyOrdTable(OItemList);
                                loadQltyOrdSaveTable(OSItemList);
                                f--;
                                r--;
                                if (r == 0) {
                                    r = 1;
                                }
                                if (f == 0) {
                                    f = 1;
                                }
                            }

                            h = bal[f - 1];

                            Val = parseFloat(Val) - parseFloat(d);
                            pt = [];
                            rt = [];
                            pt.push(pid[r - 1]);
                            rt.push(jid[f - 1]);
                            $.each(OSItemList, function () {
                                if (this.pur_ord_no === pt[0] && this.grn_detid === poid) {
                                    this.porderqty = Val;
                                }
                            });

                            //$.each(OSItemList, function () {
                            //    if (this.order_no === rt[0] && this.pur_ord_no === pt[0]) {
                            //        this.accept_qty = ordbal[f - 1];
                            //    }
                            //});
                            loadQltyOrdSaveTable(OSItemList);

                            $.each(OItemList, function () {
                                if (this.pur_ord_no === pt[0]) {
                                    this.porderqty = Val;
                                }
                            });
                            //$.each(OItemList, function () {
                            //    if (this.order_no === rt[0] && this.pur_ord_no === pt[0]) {
                            //        this.accept_qty = ordbal[f - 1];
                            //    }
                            //});
                            loadQltyOrdTable(OItemList);
                        }
                    }
                    //else {
                    //    return true;
                    //}


                }
            }
            $.each(ItemList, function () {
                if (this.Grn_detid === poid) {
                    //this.grnreceivable
                    this.grnaccept = qty - Val;
                }
            });
            loadQltyItemTable(ItemList);

        }

        var rows = $("#tbItemEntrygrid").dataTable().fnGetNodes();
        var dtTable = $('#tbItemEntrygrid').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
            $('input[id=txtAccQty]').each(function () {
                if (sn == GrnDetId && $(this).val() == quan) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtAccQty').val();
                    row.find('#txtAccQty').focus().val('').val(num);
                    return true;
                }
            });
        }
    });
    $(document).on('change', '.DebitcalcQty', function () {
        debugger;

        var table = $('#tbItemEntrygrid').DataTable();

        var GrnDetId = table.row($(this).parents('tr')).data()["Grn_detid"];
        var ExcQty = table.row($(this).parents('tr')).data()["excess_qty"];
        var ExcrtQty = table.row($(this).parents('tr')).data()["Eexcess_return"];
        var recv = table.row($(this).parents('tr')).data()["grnreceivable"];
        var Val = $(this).val();
        var quan = Val;
        var ex=(ExcQty-ExcrtQty);
        //if (ex > 0) {
        //    //alert("Execess Qty are made for this row,So return are not alowed...");
        //    var msg = 'Execess quantity are made for this row,So return are not alowed...';
        //    var flg = 4;
        //    var mod = 1;
        //    var url = "";
        //    AlartMessage(msg, flg, mod, url);

        //    $.each(ItemList, function () {
        //        if (this.Grn_detid == GrnDetId) {
        //            this.Debit = 0;


        //        }
        //    });
        //    loadQltyItemTable(ItemList);
        //    return true;
        //}
        //else {
            if (recv > 0) {
                //alert('Already Receivable is filled...');
                var msg = 'Already Receivable is filled...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                $.each(ItemList, function () {
                    if (this.Grn_detid == GrnDetId) {
                        this.Debit = 0;


                    }
                });
                loadQltyItemTable(ItemList);
                return true;
            }
            $.each(ItemList, function () {
                if (this.Grn_detid == GrnDetId) {
                    this.Debit = Val;


                }
            });

            loadQltyItemTable(ItemList);


            var poid = table.row($(this).parents('tr')).data()["Grn_detid"];
            var qty = table.row($(this).parents('tr')).data()["grnqty"];
            var oid = table.row($(this).parents('tr')).data()["order_no"];
            var po = table.row($(this).parents('tr')).data()["pur_ord_no"];

            //OSItemList;
            //var jid = [];
            //var pid = [];
            //var bal = [];
            //var ordbal = [];
            //var detid = [];
            //for (var d = 0; d < OSItemList.length; d++) {
            //    if (OSItemList[d].grn_detid == poid) {
            //        jid.push(OSItemList[d].order_no);
            //        pid.push(OSItemList[d].pur_ord_no);
            //        bal.push(OSItemList[d].PurRecvdQty);
            //        ordbal.push(OSItemList[d].orderqty);
            //        // detid.push(OSItemList[d].);
            //    }
            //}
            //var arr = [];
            //// arr = $.unique(bal);
            //var t = jid.length;
            //var p = pid.length;
            //var pt = [];
            //var rt = [];
            //var h = 0;
            //for (var f = t; f <= jid.length; f--) {
            //    for (var r = p; r <= pid.length; r--) {
            //        var d = bal[f - 1];
            //        var hg = ordbal[f - 1];
            //        if (d > 0) {
            //            bal[f - 1] = d - Val;
            //            var l = d - Val;
            //            if (l > 0) {
            //                ordbal[f - 1] = ordbal[f - 1] - Val;
            //                var t = ordbal[f - 1];
            //                if (t > 0) {
            //                    h = bal[f - 1];
            //                    pt = [];
            //                    rt = [];
            //                    pt.push(pid[r - 1]);
            //                    rt.push(jid[f - 1]);
            //                    if (pt.length > 0) {
            //                        $.each(OSItemList, function () {
            //                            if (this.pur_ord_no === pt[0] && this.grn_detid === poid) {
            //                                this.porderqty = h;
            //                            }
            //                        });

            //                        $.each(OSItemList, function () {
            //                            if (this.order_no === rt[0] && this.pur_ord_no === pt[0] && this.grn_detid === poid) {
            //                                this.accept_qty = ordbal[f - 1];
            //                            }
            //                        });
            //                        loadQltyOrdSaveTable(OSItemList);

            //                        $.each(OItemList, function () {
            //                            if (this.pur_ord_no === pt[0]) {
            //                                this.porderqty = h;
            //                            }
            //                        });
            //                        $.each(OItemList, function () {
            //                            if (this.order_no === rt[0] && this.pur_ord_no === pt[0] && this.grn_detid === poid) {
            //                                this.accept_qty = ordbal[f - 1];
            //                            }
            //                        });
            //                        loadQltyOrdTable(OItemList);

            //                        $.each(ItemList, function () {
            //                            if (this.Grn_detid === poid) {
            //                                //this.grnreceivable
            //                                this.grnaccept = qty - Val;
            //                            }
            //                        });
            //                        loadQltyItemTable(ItemList);
            //                        var rows = $("#tbItemEntrygrid").dataTable().fnGetNodes();
            //                        var dtTable = $('#tbItemEntrygrid').DataTable();
            //                        for (var i = 0; i < rows.length; i++) {
            //                            var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
            //                            $('input[id=txtDebitAccQty]').each(function () {
            //                                if (sn == GrnDetId && $(this).val() == quan) {
            //                                    var row = $(this).closest('tr');
            //                                    var num = row.find('#txtDebitAccQty').val();
            //                                    row.find('#txtDebitAccQty').focus().val('').val(num);
            //                                    return true;
            //                                }
            //                            });
            //                        }
            //                        return true;
            //                    }
            //                }
            //                else if (t < 0) {
            //                    ordbal[f - 1] = 0;
            //                    pt = [];
            //                    rt = [];
            //                    pt.push(pid[r - 1]);
            //                    rt.push(jid[f - 1]);
            //                    $.each(OSItemList, function () {
            //                        if (this.order_no === rt[0] && this.pur_ord_no === pt[0] && this.grn_detid === poid) {
            //                            this.accept_qty = 0;// ordbal[f - 1];
            //                        }
            //                    });
            //                    $.each(OItemList, function () {
            //                        if (this.order_no === rt[0] && this.pur_ord_no === pt[0] && this.grn_detid === poid) {
            //                            this.accept_qty = 0;// ordbal[f - 1];
            //                        }
            //                    });
            //                    $.each(OItemList, function () {
            //                        if (this.pur_ord_no === pt[0]) {
            //                            this.porderqty = bal[f - 1];
            //                        }
            //                    });
            //                    f--;
            //                    r--;
            //                    if (r == 0) {
            //                        r = 1;
            //                    }
            //                    if (f == 0) {
            //                        f = 1;
            //                    }


            //                    Val = parseFloat(Val) - parseFloat(hg);
            //                    Val = ordbal[f - 1] - Val;
            //                    pt = [];
            //                    rt = [];
            //                    pt.push(pid[r - 1]);
            //                    rt.push(jid[f - 1]);
            //                    $.each(OSItemList, function () {
            //                        if (this.order_no === rt[0] && this.pur_ord_no === pt[0] && this.grn_detid === poid) {
            //                            this.accept_qty = Val;
            //                        }
            //                    });
            //                    $.each(OItemList, function () {
            //                        if (this.order_no === rt[0] && this.pur_ord_no === pt[0] && this.grn_detid === poid) {
            //                            this.accept_qty = Val;
            //                        }
            //                    });

            //                    loadQltyOrdSaveTable(OSItemList);
            //                    loadQltyOrdTable(OItemList);
            //                    if (Val >= 0) {
            //                        return true;
            //                    }
            //                }
            //                else if (t == 0) {
            //                    ordbal[f - 1] = 0;
            //                    pt = [];
            //                    rt = [];
            //                    pt.push(pid[r - 1]);
            //                    rt.push(jid[f - 1]);
            //                    $.each(OSItemList, function () {
            //                        if (this.order_no === rt[0] && this.pur_ord_no === pt[0] && this.grn_detid === poid) {
            //                            this.accept_qty = 0;// ordbal[f - 1];
            //                        }
            //                    });
            //                    $.each(OItemList, function () {
            //                        if (this.order_no === rt[0] && this.pur_ord_no === pt[0] && this.grn_detid === poid) {
            //                            this.accept_qty = 0;// ordbal[f - 1];
            //                        }
            //                    });
            //                    $.each(OItemList, function () {
            //                        if (this.pur_ord_no === pt[0]) {
            //                            this.porderqty = bal[f - 1];
            //                        }
            //                    });
            //                    loadQltyOrdSaveTable(OSItemList);
            //                    loadQltyOrdTable(OItemList);
            //                    return true;
            //                }
            //            }
            //            else if (l < 0) {
            //                //var uy = Val + l;
            //                // ordbal[f - 1] = ordbal[f - 1] - Val;
            //                var p = bal[f - 1];
            //                bal[f - 1] = 0;
            //                ordbal[f - 1] = 0;
            //                // h = bal[f - 1];

            //                pt = [];
            //                rt = [];
            //                pt.push(pid[r - 1]);
            //                rt.push(jid[f - 1]);
            //                $.each(OSItemList, function () {
            //                    if (this.pur_ord_no === pt[0] && this.grn_detid === poid) {
            //                        this.porderqty = 0;
            //                    }
            //                });

            //                $.each(OItemList, function () {
            //                    if (this.pur_ord_no === pt[0]) {
            //                        this.porderqty = 0;
            //                    }
            //                });
            //                $.each(OSItemList, function () {
            //                    if (this.order_no === rt[0] && this.pur_ord_no === pt[0] && this.grn_detid === poid) {
            //                        this.accept_qty = ordbal[f - 1];
            //                    }
            //                });
            //                $.each(OItemList, function () {
            //                    if (this.order_no === rt[0] && this.pur_ord_no === pt[0] && this.grn_detid === poid) {
            //                        this.accept_qty = ordbal[f - 1];
            //                    }
            //                });
            //                loadQltyOrdTable(OItemList);
            //                loadQltyOrdSaveTable(OSItemList);
            //                f--;
            //                r--;
            //                if (r == 0) {
            //                    r = 1;
            //                }
            //                if (f == 0) {
            //                    f = 1;
            //                }
            //                if (bal[f - 1] == d) {
            //                    bal[f - 1] = 0;
            //                    ordbal[f - 1] = 0;
            //                    pt = [];
            //                    rt = [];
            //                    pt.push(pid[r - 1]);
            //                    rt.push(jid[f - 1]);
            //                    $.each(OSItemList, function () {
            //                        if (this.pur_ord_no === pt[0] && this.grn_detid === poid) {
            //                            this.porderqty = 0;
            //                        }
            //                    });

            //                    $.each(OItemList, function () {
            //                        if (this.pur_ord_no === pt[0]) {
            //                            this.porderqty = 0;
            //                        }
            //                    });
            //                    $.each(OSItemList, function () {
            //                        if (this.order_no === rt[0] && this.pur_ord_no === pt[0] && this.grn_detid === poid) {
            //                            this.accept_qty = ordbal[f - 1];
            //                        }
            //                    });
            //                    $.each(OItemList, function () {
            //                        if (this.order_no === rt[0] && this.pur_ord_no === pt[0] && this.grn_detid === poid) {
            //                            this.accept_qty = ordbal[f - 1];
            //                        }
            //                    });
            //                    loadQltyOrdTable(OItemList);
            //                    loadQltyOrdSaveTable(OSItemList);
            //                    f--;
            //                    r--;
            //                    if (r == 0) {
            //                        r = 1;
            //                    }
            //                    if (f == 0) {
            //                        f = 1;
            //                    }
            //                }

            //                h = bal[f - 1];

            //                Val = parseFloat(Val) - parseFloat(d);
            //                pt = [];
            //                rt = [];
            //                pt.push(pid[r - 1]);
            //                rt.push(jid[f - 1]);
            //                $.each(OSItemList, function () {
            //                    if (this.pur_ord_no === pt[0] && this.grn_detid === poid) {
            //                        this.porderqty = Val;
            //                    }
            //                });


            //                loadQltyOrdSaveTable(OSItemList);

            //                $.each(OItemList, function () {
            //                    if (this.pur_ord_no === pt[0]) {
            //                        this.porderqty = Val;
            //                    }
            //                });

            //                loadQltyOrdTable(OItemList);
            //            }
            //        }

            //    }
            ////}
            //$.each(ItemList, function () {
            //    if (this.Grn_detid === poid) {
            //        //this.grnreceivable
            //        this.grnaccept = qty - Val;
            //    }
            //});
            loadQltyItemTable(ItemList);



       // }
        var rows = $("#tbItemEntrygrid").dataTable().fnGetNodes();
        var dtTable = $('#tbItemEntrygrid').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
            $('input[id=txtDebitAccQty]').each(function () {
                if (sn == GrnDetId && $(this).val() == quan) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtDebitAccQty').val();
                    row.find('#txtDebitAccQty').focus().val('').val(num);
                    return true;
                }
            });
        }
    });

    $(document).on('keyup', '.calcAccQty', function () {
        debugger;

        var table = $('#tblQltyOrdgrid').DataTable();

        var GrnDetId = table.row($(this).parents('tr')).data()["grn_detid"];
        var Pordno = table.row($(this).parents('tr')).data()["pur_ord_no"];
        var ordn = table.row($(this).parents('tr')).data()["order_no"];
        var balq = table.row($(this).parents('tr')).data()["porderqty"];
        var ordqty = table.row($(this).parents('tr')).data()["orderqty"];
        var sty = table.row($(this).parents('tr')).data()["style"];

        var value = $(this).val();
        var quan = value;
        if (OrdType != "G") {
            if (value > ordqty) {
                //alert('Should not exceed OrdBal...');
                var msg = 'Should not exceed Order Balance...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                $.each(OItemList, function () {
                    if (this.pur_ord_no == Pordno && this.order_no == ordn && this.grn_detid == GrnDetId && this.style == sty) {

                        this.accept_qty = 0;

                    }
                });
                loadQltyOrdTable(OItemList);
                return true;
            }
        }

        $.each(OSItemList, function () {
            if (this.pur_ord_no == Pordno && this.order_no == ordn && this.grn_detid == GrnDetId && this.style == sty) {
                if (balq >= value) {
                    this.accept_qty = value;
                }
                else {
                    var t = value - balq;
                    this.accept_qty = balq;
                }
            }
        });

        $.each(OItemList, function () {
            if (this.pur_ord_no == Pordno && this.order_no == ordn && this.grn_detid == GrnDetId && this.style == sty) {
                if (balq >= value) {
                    this.accept_qty = value;
                }
                else {
                    var t = value - balq;
                    this.accept_qty = balq;
                }
            }
        });
        var totalamnt = 0;

        for (var e = 0; e < OItemList.length; e++) {
            if (OItemList[e].pur_ord_no == Pordno) {
                var amount = OItemList[e].accept_qty;
                totalamnt = totalamnt + parseFloat(amount);
            }
        }

        if (totalamnt > balq) {
            //alert('Should not exceed Accepted Qty...');
            var msg = 'Should not exceed Accepted quantity...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            $.each(OItemList, function () {
                if (this.pur_ord_no == Pordno && this.order_no == ordn && this.grn_detid == GrnDetId && this.style == sty) {

                    this.accept_qty = 0;

                }
            });
            $.each(OSItemList, function () {
                if (this.pur_ord_no == Pordno && this.order_no == ordn && this.grn_detid == GrnDetId && this.style == sty) {

                    this.accept_qty = 0;

                }
            });
            loadQltyOrdSaveTable(OSItemList);
            loadQltyOrdTable(OItemList);


            var totalgrnacc = 0;
            $.each(OSItemList, function () {
                if (this.grn_detid == GrnDetId) {
                    var amount = this.accept_qty;
                    totalgrnacc = totalgrnacc + parseFloat(amount);
                }
            });

            $.each(ItemList, function () {
                if (this.Grn_detid == GrnDetId) {
                    this.grnaccept = totalgrnacc;
                }
            });
            loadQltyItemTable(ItemList);

            return true;
        }
        else {
            var fd = 0;
            var fr = 0;
          
            $.each(ItemList, function () {
                if (this.Grn_detid == GrnDetId) {
                    fd = this.Debit;
                    fr = this.grnreceivable;
                }
            });
            if (fd > 0) {
                var qy = ordqty - value;
                if (qy >= 0) {
                    $.each(OItemList, function () {
                        if (this.pur_ord_no == Pordno && this.order_no == ordn && this.grn_detid == GrnDetId && this.style == sty) {

                            this.debit_qty = qy;

                        }
                    });
                    $.each(OSItemList, function () {
                        if (this.pur_ord_no == Pordno && this.order_no == ordn && this.grn_detid == GrnDetId && this.style == sty) {

                            this.debit_qty = qy;

                        }
                    });
                }
            }

            if (fr > 0) {
                var qy = ordqty - value;
                if (qy >= 0) {
                    $.each(OItemList, function () {
                        if (this.pur_ord_no == Pordno && this.order_no == ordn && this.grn_detid == GrnDetId && this.style == sty) {

                            this.receivable_qty = qy;

                        }
                    });
                    $.each(OSItemList, function () {
                        if (this.pur_ord_no == Pordno && this.order_no == ordn && this.grn_detid == GrnDetId && this.style == sty) {

                            this.receivable_qty = qy;

                        }
                    });
                }
            }
            loadQltyOrdSaveTable(OSItemList);
            loadQltyOrdTable(OItemList);


            var totalgrnacc = 0;
            $.each(OSItemList, function () {
                if (this.grn_detid == GrnDetId) {
                    var amount = this.accept_qty;
                    totalgrnacc = totalgrnacc + parseFloat(amount);
                }
            });

            $.each(ItemList, function () {
                if (this.Grn_detid == GrnDetId) {
                    this.grnaccept = totalgrnacc;
                }
            });
            loadQltyItemTable(ItemList);


        }
        var rows = $("#tblQltyOrdgrid").dataTable().fnGetNodes();
        var dtTable = $('#tblQltyOrdgrid').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
            $('input[id=txtOrdAcTQty]').each(function () {
                if (sn == GrnDetId && $(this).val() == quan) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtOrdAcTQty').val();
                    row.find('#txtOrdAcTQty').focus().val('').val(num);
                    return true;
                }
            });
        }
    });

    $(document).on('change', '.calcDebQty', function () {
        debugger;

        var table = $('#tblQltyOrdgrid').DataTable();

        var GrnDetId = table.row($(this).parents('tr')).data()["grn_detid"];
        var Pordno = table.row($(this).parents('tr')).data()["pur_ord_no"];
        var ordn = table.row($(this).parents('tr')).data()["order_no"];
        var balq = table.row($(this).parents('tr')).data()["porderqty"];
        var accqty = table.row($(this).parents('tr')).data()["accept_qty"];
        var ordqty = table.row($(this).parents('tr')).data()["orderqty"];
        var POExcess_Qty = table.row($(this).parents('tr')).data()["POExcess_Qty"];
        var QltyExcessQty = table.row($(this).parents('tr')).data()["QltyExcessQty"];
        
        var Val = $(this).val();

        var aqty = [];
        var dqty = [];
        var fd = 0;
        var fr = 0;
        $.each(ItemList, function () {
            if (this.Grn_detid == GrnDetId) {
                fd = this.Debit;
                fr = this.grnreceivable;
            }
        });
        //loadQltyItemTable(ItemList);


        if (OrdType != "G") {

            if (fd > 0) {

                var ac = parseFloat(accqty) + parseFloat(Val);
                var cc = ordqty + POExcess_Qty;
                if (ac <= cc) {
                    $.each(OItemList, function () {
                        if (this.pur_ord_no == Pordno && this.order_no == ordn && this.grn_detid == GrnDetId) {

                            this.debit_qty = Val;
                        }
                    });
                    $.each(OSItemList, function () {
                        if (this.pur_ord_no == Pordno && this.order_no == ordn && this.grn_detid == GrnDetId) {

                            this.debit_qty = Val;
                        }
                    });
                    loadQltyOrdSaveTable(OSItemList);
                    loadQltyOrdTable(OItemList);
                }
                else {
                    //alert('Should not exceed BalQty...');
                    var msg = 'Should not exceed Balance Quantity...';
                    var flg = 4;
                    var mod = 1;
                    var url = "";
                    AlartMessage(msg, flg, mod, url);
                    $.each(OItemList, function () {
                        if (this.pur_ord_no == Pordno && this.order_no == ordn) {

                            this.debit_qty = 0;
                        }
                    });
                    loadQltyOrdTable(OItemList);
                    return true;
                }


            }

        } else {


            var ac = parseFloat(accqty) + parseFloat(Val);
            var cc = ordqty + POExcess_Qty;
           // if (ac <= cc) {
                $.each(OItemList, function () {
                    if (this.pur_ord_no == Pordno && this.order_no == ordn && this.grn_detid == GrnDetId) {

                        this.debit_qty = Val;
                    }
                });
                $.each(OSItemList, function () {
                    if (this.pur_ord_no == Pordno && this.order_no == ordn && this.grn_detid == GrnDetId) {

                        this.debit_qty = Val;
                    }
                });
                loadQltyOrdSaveTable(OSItemList);
                loadQltyOrdTable(OItemList);
            //}

        }

        if (fr > 0) {

            //alert('Should fill in Receivable Qty...');
            var msg = 'Should fill in Receivable Quantity...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);

            $.each(OItemList, function () {
                if (this.pur_ord_no == Pordno && this.order_no == ordn) {

                    this.debit_qty = 0;
                }
            });
            loadQltyOrdTable(OItemList);
            return true;

        }

        var rows = $("#tblQltyOrdgrid").dataTable().fnGetNodes();
        var dtTable = $('#tblQltyOrdgrid').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
            $('input[id=txtOrdDbTQty]').each(function () {
                if (sn == GrnDetId && $(this).val() == Val) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtOrdDbTQty').val();
                    row.find('#txtOrdDbTQty').focus().val('').val(num);
                    return true;
                }
            });
        }
    });
    $(document).on('keyup', '.RecSepcalcQty', function () {
        debugger;

        var table = $('#tblQltyOrdgrid').DataTable();

        var GrnDetId = table.row($(this).parents('tr')).data()["grn_detid"];
        var Pordno = table.row($(this).parents('tr')).data()["pur_ord_no"];
        var ordn = table.row($(this).parents('tr')).data()["order_no"];
        var balq = table.row($(this).parents('tr')).data()["porderqty"];
        var accqty = table.row($(this).parents('tr')).data()["accept_qty"];
        var ordqty = table.row($(this).parents('tr')).data()["orderqty"];


        var Val = $(this).val();

        var aqty = [];
        var dqty = [];
        var fd = 0;
        var fr = 0;
        $.each(ItemList, function () {
            if (this.Grn_detid == GrnDetId) {
                fd = this.Debit;
                fr = this.grnreceivable;
            }
        });
        //loadQltyItemTable(ItemList);

        if (fd > 0) {
            //alert('Should fill in Debit Qty...');
            var msg = 'Should fill in Debit Quantity...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);

            $.each(OItemList, function () {
                if (this.pur_ord_no == Pordno && this.order_no == ordn) {

                    this.receivable_qty = 0;
                }
            });
            loadQltyOrdTable(OItemList);
            return true;


        }

        if (fr > 0) {

            var ac = parseFloat(accqty) + parseFloat(Val);
            if (ac <= ordqty) {
                $.each(OItemList, function () {
                    if (this.pur_ord_no == Pordno && this.order_no == ordn && this.grn_detid == GrnDetId) {

                        this.receivable_qty = Val;
                    }
                });
                $.each(OSItemList, function () {
                    if (this.pur_ord_no == Pordno && this.order_no == ordn && this.grn_detid == GrnDetId) {

                        this.receivable_qty = Val;
                    }
                });
                loadQltyOrdSaveTable(OSItemList);
                loadQltyOrdTable(OItemList);
            }
            else {
                //alert('Should not exceed BalQty...');
                var msg = 'Should not exceed Balance Quantity...';
                var flg = 4; 
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                $.each(OItemList, function () {
                    if (this.pur_ord_no == Pordno && this.order_no == ordn) {

                        this.receivable_qty = 0;
                    }
                });
                loadQltyOrdTable(OItemList);
                return true;
            }


        }
        var rows = $("#tblQltyOrdgrid").dataTable().fnGetNodes();
        var dtTable = $('#tblQltyOrdgrid').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
            $('input[id=txtRecAccQty]').each(function () {
                if (sn == GrnDetId && $(this).val() == Val) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtRecAccQty').val();
                    row.find('#txtRecAccQty').focus().val('').val(num);
                    return true;
                }
            });
        }
    });
    $(document).on('keyup', '.ExccalcQty', function () {
        debugger;

        var table = $('#tblQltyOrdgrid').DataTable();

        var GrnDetId = table.row($(this).parents('tr')).data()["grn_detid"];
        var Pordno = table.row($(this).parents('tr')).data()["pur_ord_no"];
        var ordn = table.row($(this).parents('tr')).data()["order_no"];
        var balq = table.row($(this).parents('tr')).data()["porderqty"];
        var pjid = table.row($(this).parents('tr')).data()["pur_ord_buyjobid"];
        var ordexqty = table.row($(this).parents('tr')).data()["POExcess_Qty"];


        var Val = $(this).val();


        if (Val > ordexqty) {
            $.each(OItemList, function () {
                if (this.grn_detid == GrnDetId && this.pur_ord_buyjobid == pjid) {
                    this.QltyExcessQty = 0;
                }
            });
            $.each(OSItemList, function () {
                if (this.grn_detid == GrnDetId && this.pur_ord_buyjobid == pjid) {
                    this.QltyExcessQty = 0;
                }
            });

            loadQltyOrdSaveTable(OSItemList);
            loadQltyOrdTable(OItemList);

            //alert('Should not exceed then Order excess qty...');
            var msg = 'Should not exceed then Order excess Quantity...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return true;
        } 

        var ex = 0;
        $.each(ItemList, function () {
            if (this.Grn_detid == GrnDetId) {
                ex = this.excess_qty;

            }
        });
        $.each(OItemList, function () {
            if (this.grn_detid == GrnDetId && this.pur_ord_buyjobid == pjid) {
                this.QltyExcessQty = Val;
            }
        });
        $.each(OSItemList, function () {
            if (this.grn_detid == GrnDetId && this.pur_ord_buyjobid == pjid) {
                this.QltyExcessQty = Val;
            }
        });
        var exq = [];
        $.each(OSItemList, function () {
            if (this.grn_detid == GrnDetId) {
                exq.push(this.QltyExcessQty);
            }
        });

        var totalamnt = 0;

        for (var e = 0; e < exq.length; e++) {
            var amount = exq[e];
            totalamnt = totalamnt + parseFloat(amount);
        }
        if (totalamnt > ex) {
            //alert('Should not exceed Item excess qty...');
            var msg = 'Should not exceed Item excess Quantity...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return true;
        }
        else {
            loadQltyOrdSaveTable(OSItemList);
            loadQltyOrdTable(OItemList);
        }



        var rows = $("#tblQltyOrdgrid").dataTable().fnGetNodes();
        var dtTable = $('#tblQltyOrdgrid').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
            $('input[id=txtQltExAccQty]').each(function () {
                if (sn == GrnDetId && $(this).val() == Val) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtQltExAccQty').val();
                    row.find('#txtQltExAccQty').focus().val('').val(num);
                    return true;
                }
            });
        }

    });
});

$(document).ready(function () {
    $("#tbItemEntrygrid ").dataTable().find("tbody").on('click', 'tr', function () {
        index = (this.rowIndex) - 1;
    });


    $('#tblQltyOrdgrid').on('click', 'tr', function (e) {
        //debugger;

        var table = $('#tblQltyOrdgrid').DataTable();
        var row = $(this).closest('tr');
        var data = $('#tblQltyOrdgrid').dataTable().fnGetData(row);

        var pur_ord_buyjobid = data.pur_ord_buyjobid;
        LoadItemRemarksDetails(pur_ord_buyjobid);
    });


});


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

    $('#txtQltyDate').val(Fdatestring);
    //$('#txtFromDate').val(datestring);
    //$('#txtToDate').val(Fdatestring);

}


function GenerateNumber() {
    debugger;


    var Itype = ItemType;


    if (Itype == 'A') {
        table = "Pur_Grn_Mas",
        column = "Qlty_No",
        compId = CompId,
        Docum = 'PURCHASE QC - ACCESSORY'
    } else if (Itype == 'Y') {
        table = "Pur_Grn_Mas",
        column = "Qlty_No",
        compId = CompId,
        Docum = 'PURCHASE QC - YARN'
    } else {
        table = "Pur_Grn_Mas",
       column = "Qlty_No",
       compId = CompId,
       Docum = 'PURCHASE QC'
    }

    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $('#txtQltyNo').val(result.Value);
        }
    });
}

function LoadQualityDetails(GrnMasId) {
    $.ajax({
        url: "/PurchaseQuality/GetQualityDetails",
        data: JSON.stringify({ Grn_MasId: GrnMasId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            debugger;
            if (obj != undefined) {
                $('#txtCompany').val(obj[0]["Company"]);
                $('#txtSupplier').val(obj[0]["Supplier"]);
                $('#txtGrnNo').val(obj[0]["receipt_no"]);
                $('#txtDcNo').val(obj[0]["Dc_no"]);
                //$('#txtProdQty').val(obj[0]["Quantity"]);
                //$('#txtBuyer').val(obj[0]["buyer"]);
                //$('#txtStyleRowId').val(obj[0]["StyleRowid"]);
                //$('#txtPlanId').val(obj[0]["PlanID"]);

                //StyleRowId = $("#txtStyleRowId").val();
                //var Planid = $("#txtPlanId").val();         

                LoadQualityEntryItem(GrnMasId);
                LoadQualityOrderEntrySave(GrnMasId);
            }
            else {

            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadQualityEntryItem(GrnMasId) {
    debugger;


    $.ajax({
        url: "/PurchaseQuality/LoadQltyItemDetails",
        data: JSON.stringify({ Grn_MasId: GrnMasId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            ItemList = result;
            loadQltyItemTable(ItemList);

            //var GrnDetId = ItemList[0].Grn_detid;

            //LoadQltyOrderDetails(GrnDetId);


        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadQualityEditEntryItem(GrnMasId) {
    debugger;


    $.ajax({
        url: "/PurchaseQuality/LoadQltyItemEditDetails",
        data: JSON.stringify({ Grn_MasId: GrnMasId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            ItemList = result;
            loadQltyItemTable(ItemList);

            var GrnDetId = ItemList[0].Grn_detid;

            LoadQltyOrderEditDetails(GrnDetId);


        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadQualityOrderEntrySave(GrnMasId) {
    debugger;


    $.ajax({
        url: "/PurchaseQuality/LoadQltyOrderSaveDetails",
        data: JSON.stringify({ Grn_MasId: GrnMasId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            OSItemList = result;

            //var grnid = [];
            //var jid = [];
            //var pid = [];
            //var bal = [];
            //var ordbal = [];
            //var acc = [];
            //for (var d = 0; d < OSItemList.length; d++) {
            //    grnid.push(OSItemList[d].grn_detid);
            //    jid.push(OSItemList[d].order_no);
            //    pid.push(OSItemList[d].pur_ord_no);
            //    bal.push(OSItemList[d].PurRecvdQty);
            //    ordbal.push(OSItemList[d].orderqty);
            //    acc.push(OSItemList[d].accept_qty);

            //}
            //var lk = [];
            //var te = [];
            //for (var s = 1; s < OSItemList.length; s++) {
            //    if (OSItemList[s].grn_detid == grnid[s] && OSItemList[s].pur_ord_no == pid[s]) {
            //        //OSItemList[s].accept_qty = 0;
            //        lk = [];
            //        te = [];
            //        lk.push(OSItemList[s].grn_detid);
            //        te.push(OSItemList[s].pur_ord_no);
            //    }
            //    if (lk.length > 0) {
            //        for (var t = 0; t < OSItemList.length; t++) {
            //            if (OSItemList[t].grn_detid != lk[0] && OSItemList[t].pur_ord_no != te[0]) {
            //                OSItemList[t].accept_qty = 0;

            //            }
            //        }
            //    }

            //}
            var id = 0;
            for (var qu = 0; qu < ItemList.length; qu++) {
                id = ItemList[qu].Grn_detid;
                var ctry = [];
                ctry = OSItemList;
                ctry = $.grep(ctry, function (e) {
                    if (e.grn_detid == id) {
                        return e;
                    }
                });
                ctry;

                var grnid = [];
                var jid = [];
                var pid = [];
                var bal = [];
                var ordbal = [];
                var acc = [];
                for (var d = 0; d < ctry.length; d++) {
                    grnid.push(ctry[d].grn_detid);
                    jid.push(ctry[d].order_no);
                    pid.push(ctry[d].pur_ord_no);
                    bal.push(ctry[d].PurRecvdQty);
                    ordbal.push(ctry[d].orderqty);
                    acc.push(ctry[d].accept_qty);

                }

                for (var w = 0; w < acc.length; w++) {
                    var gh = [];
                    var tr = [];
                    var pr = [];
                    tr = pid[w];
                    pr = jid[w];
                    for (var t = 0; t < pid.length; t++) {
                        if (pid[t] == tr) {
                            gh.push(acc[w]);
                        }

                    }
                    if (gh.length > 0) {
                        for (var f = 1; f < gh.length; f++) {
                            gh[f] = 0;
                        }

                        for (var y = 0; y < ctry.length; y++) {
                            for (var re = 0; re < gh.length; re++) {
                                if (ctry[y].grn_detid == id && ctry[y].pur_ord_no == tr) {
                                    ctry[y].accept_qty = gh[re];
                                    y++;
                                }
                            }
                        }
                    }

                }
            }


            loadQltyOrdSaveTable(OSItemList);
            var ids = 0;
            for (var fd = 0; fd < ItemList.length; fd++) {
                ids = ItemList[fd].Grn_detid;
                var tryli = [];
                tryli = OSItemList;
                tryli = $.grep(tryli, function (e) {
                    if (e.grn_detid == id) {
                        return e;
                    }
                });
                ctry;
            }
            OItemList = [];
            OItemList = tryli;

            loadQltyOrdTable(OItemList);


        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function LoadQltyOrderEditDetails(GrnDetId) {
    debugger;


    $.ajax({
        url: "/PurchaseQuality/LoadQltyOrdEditDetails",
        data: JSON.stringify({ grn_detid: GrnDetId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            OItemList = result;
            loadQltyOrdTable(OItemList);




        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadQualityEditOrderEntrySave(GrnMasId) {
    debugger;


    $.ajax({
        url: "/PurchaseQuality/LoadQltyEditOrderSaveDetails",
        data: JSON.stringify({ Grn_MasId: GrnMasId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            OSItemList = result;
            loadQltyOrdSaveTable(OSItemList);


        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function loadQltyItemTable(ItemList) {

    $('#tbItemEntrygrid').DataTable().destroy();
    debugger;

    $('#tbItemEntrygrid').DataTable({

        data: ItemList,
        scrollY: 150,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        columns: [

                { title: "GrnDetid", data: "Grn_detid", "visible": false },
                { title: "Item", data: "Item" },
                { title: "Color", data: "Color" },
                { title: "Size", data: "Size" },
                { title: "Unit", data: "Uom" },
                 { title: "Recv Qty", data: "grnqty" },
                  { title: "Acept Qty", data: "grnaccept" },
                  {
                      title: "Excess Qty", data: "excess_qty",
                      render: function (data) {

                          return '<input type="text" id="txtExcessAccQty" class="form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                      },
                  },
                   //{
                   //    title: "Short Qty", data: "grnshortage",
                   //    render: function (data) {

                   //        return '<input type="text" id="txtTQty" class="editor-active"  style="width: 50px;text-align: center;"  value=' + data + ' onkeyup="calcQty(this.value);">';

                   //    },
                   //},
                {
                    title: "Rej Qty", data: "grnreject",
                    render: function (data) {

                        return '<input type="text" id="txtTQty" class="RejcalcQty form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                    },
                },
                  {
                      title: "Ret Qty", data: "grnreturn",
                      //render: function (data) {

                      //    return '<input type="text" id="txtAccQty" class="editor-active"  style="width: 50px;text-align: center;"  value=' + data + ' onkeyup="RetcalcQty(this.value);">';

                      //},
                  },
                  {
                      title: "Rev Qty", data: "grnreceivable",
                      render: function (data) {

                          return '<input type="text" id="txtAccQty" class="ReccalcQty form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                      },
                  },
                  {
                      title: "Debit Qty", data: "Debit",
                      render: function (data) {

                          return '<input type="text" id="txtDebitAccQty" class="DebitcalcQty form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                      },
                  },
                    {
                        title: "ExRet Qty", data: "excess_return",
                        render: function (data) {

                            return '<input type="text" id="txtExcessTQty" class="ExRetcalcQty form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                        },
                    },

               { title: "ItemId", data: "Itemid", "visible": false },
               { title: "ColorId", data: "Colorid", "visible": false },
               { title: "SizeId", data: "Sizeid", "visible": false },
               { title: "Uomid", data: "Uomid", "visible": false },
               { title: "EAcept Qty", data: "Egrnaccept", "visible": false },
                  { title: "EExcess Qty", data: "Eexcess_qty", "visible": false },
                    { title: "EReject Qty", data: "Egrnreject", "visible": false },
                    { title: "EReturn Qty", data: "Egrnreturn", "visible": false },
                    { title: "EReceiv Qty", data: "Egrnreceivable", "visible": false },
                     { title: "EDebit Qty", data: "Egrndebit", "visible": false },
                     { title: "EExReturn Qty", data: "Eexcess_return", "visible": false },
               //{
               //    title: "ACTION", "mDataProp": null,
               //    "sDefaultContent": '<div style="display:inline-flex;"><button type="button" data-toggle="tooltip" data-placement="top" title="View Item" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnItemview btn btn-round btn-info"> <i class="fa fa-eye"></i> </button></div>'
               //},

        ]
    });

    var table = $('#tbItemEntrygrid').DataTable();
    $("#tbItemEntrygrid tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tbItemEntrygrid tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}


$(document).ready(function () {
    $("#tbItemEntrygrid ").dataTable().find("tbody").on('click', 'tr', function () {
        indexitm = (this.rowIndex) - 1;
    });
});

$(document).ready(function () {
    $("#tblQltyOrdgrid ").dataTable().find("tbody").on('click', 'tr', function () {
        indexstk = (this.rowIndex) - 1;
    });
});

//function ReccalcQty(val) {
//    debugger;
//    indexitm;
//    var currentrowoftcpi = ItemList.slice(indexitm);
//    var pid = currentrowoftcpi[0].Grn_detid;
//    //var itmid = currentrowoftcpi[0].itmid;
//    //var colorid = currentrowoftcpi[0].clrid;

//    OSItemList;
//    var jid = [];
//    var pid = [];
//    var bal = [];
//    $.each(OSItemList, function () {
//        if (this.grn_detid == pid) {
//            jid.push(this.order_no);
//            pid.push(this.pur_ord_no);
//            bal.push(this.porderqty);
//        }
//    });

//}

function LoadQltyOrderDetails(GrnDetId) {
    debugger;


    $.ajax({
        url: "/PurchaseQuality/LoadQltyOrdDetails",
        data: JSON.stringify({ grn_detid: GrnDetId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            OItemList = result;
            loadQltyOrdTable(OItemList);




        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}



function loadQltyOrdTable(OItemList) {

    $('#tblQltyOrdgrid').DataTable().destroy();
    debugger;

    $('#tblQltyOrdgrid').DataTable({

        data: OItemList,
        scrollY: 150,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        columns: [

                { title: "GrnDetId", data: "grn_detid", "visible": false },
                { title: "purorddetid", data: "pur_ord_detid", "visible": false },
                { title: "purordbuyjobid", data: "pur_ord_buyjobid", "visible": false },
                { title: "Purchase Order", data: "pur_ord_no" },
                { title: "Received", data: "PurRecvdQty" },
                 { title: "Accepted", data: "porderqty" },
                  { title: "Excess", data: "POExcess_Qty" },
                    { title: "Ord No", data: "order_no" },
                    { title: "Style", data: "style" },
                    { title: "Ord Bal", data: "orderqty" },

                   {
                       title: "Accepted", data: "accept_qty",
                       render: function (data) {

                           return '<input type="text" id="txtOrdAcTQty" class="calcAccQty form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                       },
                   },
                {
                    title: "Debit Qty", data: "debit_qty",
                    render: function (data) {

                        return '<input type="text" id="txtOrdDbTQty" class="calcDebQty form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';

                    },
                },
                  {
                      title: "Receivable", data: "receivable_qty",
                      render: function (data) {

                          return '<input type="text" id="txtRecAccQty" class="RecSepcalcQty form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                      },
                  },
                  {
                      title: "Excess", data: "QltyExcessQty",
                      render: function (data) {

                          return '<input type="text" id="txtQltExAccQty" class="ExccalcQty form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                      },
                  },

        ]
    });



}
function loadQltyOrdSaveTable(OSItemList) {

    $('#tblQltyOrdSavegrid').DataTable().destroy();
    debugger;

    $('#tblQltyOrdSavegrid').DataTable({

        data: OSItemList,
        scrollY: 150,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        columns: [

                { title: "GrnDetId", data: "grn_detid" },
                { title: "purorddetid", data: "pur_ord_detid" },
                { title: "purordbuyjobid", data: "pur_ord_buyjobid" },
                { title: "Purchase Order", data: "pur_ord_no" },
                { title: "Received", data: "PurRecvdQty" },
                 { title: "Accepted", data: "porderqty" },
                  { title: "Excess", data: "POExcess_Qty" },
                    { title: "Ord No", data: "order_no" },
                    { title: "Style", data: "style" },
                    { title: "Ord Bal", data: "orderqty" },
                    { title: "Accepted", data: "accept_qty" },
                    { title: "Debit Qty", data: "debit_qty" },
                    { title: "Receivable", data: "receivable_qty" },
                    { title: "Excess", data: "QltyExcessQty" },
                      { title: "EAccepted", data: "Eaccept_qty" },
                    { title: "EDebit Qty", data: "Edebit_qty" },
                    { title: "EReceivable", data: "Ereceivable_qty" },
                    { title: "EExcess", data: "EQltyExcessQty" },


                     { title: "ItemId", data: "ItemId" },
                     { title: "ColorId", data: "ColorId" },
                     { title: "SizeId", data: "SizeId" },
                     { title: "UomId", data: "UomId" },



        ]
    });



}

function RejcalcQty(Val) {
    debugger;

    index;

    var currentrowoftcpi = ItemList.slice(index);

    var GrnDetId = currentrowoftcpi[0].Grn_detid;
    var ExcQty = currentrowoftcpi[0].excess_qty;

    if (ExcQty > 0) {
        //alert("Execess Qty are made for this row,So rejected are not alowed...");
        var msg = 'Execess quantity are made for this row,So rejected are not alowed...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);

        $.each(ItemList, function () {
            if (this.Grn_detid == GrnDetId) {
                this.grnreject = 0;


            }
        });
        loadQltyItemTable(ItemList);
        return true;
    }
    else {
        $.each(ItemList, function () {
            if (this.Grn_detid == GrnDetId) {
                this.grnreject = Val;
                this.grnreturn = Val;
            }
        });
        loadQltyItemTable(ItemList);
    }


}

function ExccalcQty(Val) {
    debugger;
    indexstk;

    var currentrowoftcpi = OItemList.slice(indexstk);

    var GrnDetId = currentrowoftcpi[0].grn_detid;
    var Pordno = currentrowoftcpi[0].pur_ord_no;
    var ordn = currentrowoftcpi[0].order_no;
    var balq = currentrowoftcpi[0].porderqty;

    var ex = 0;
    $.each(ItemList, function () {
        if (this.Grn_detid == GrnDetId) {
            ex = this.excess_qty;

        }
    });
    $.each(OItemList, function () {
        if (this.Grn_detid == GrnDetId) {
            this.QltyExcessQty = Val;
        }
    });
    $.each(OSItemList, function () {
        if (this.Grn_detid == GrnDetId) {
            this.QltyExcessQty = Val;
        }
    });
    var exq = [];
    $.each(OSItemList, function () {
        if (this.Grn_detid == GrnDetId) {
            exq.push(this.QltyExcessQty);
        }
    });

    var totalamnt = 0;

    for (var e = 0; e < exq.length; e++) {
        var amount = exq[e];
        totalamnt = totalamnt + parseFloat(amount);
    }
    if (totalamnt > ex) {
        //alert('Should not exceed Item excess qty...');
        var msg = 'Should not exceed Item excess quantity...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }
    else {
        loadQltyOrdSaveTable(OSItemList);
        loadQltyOrdTable(OItemList);
    }
}

function calcDebQty(Val) {
    debugger;
    indexstk;

    var currentrowoftcpi = OItemList.slice(indexstk);

    var GrnDetId = currentrowoftcpi[0].grn_detid;
    var Pordno = currentrowoftcpi[0].pur_ord_no;
    var ordn = currentrowoftcpi[0].order_no;
    var balq = currentrowoftcpi[0].porderqty;
    var accqty = currentrowoftcpi[0].accept_qty;
    var ordqty = currentrowoftcpi[0].orderqty;


    var aqty = [];
    var dqty = [];
    var fd = 0;
    var fr = 0;
    $.each(ItemList, function () {
        if (this.Grn_detid == GrnDetId) {
            fd = this.Debit;
            fr = this.grnreceivable;
        }
    });
    //loadQltyItemTable(ItemList);

    if (fd > 0) {

        var ac = parseFloat(accqty) + parseFloat(Val);
        if (ac <= ordqty) {
            $.each(OItemList, function () {
                if (this.pur_ord_no == Pordno && this.order_no == ordn && this.grn_detid == GrnDetId) {

                    this.debit_qty = Val;
                }
            });
            $.each(OSItemList, function () {
                if (this.pur_ord_no == Pordno && this.order_no == ordn && this.grn_detid == GrnDetId) {

                    this.debit_qty = Val;
                }
            });
            loadQltyOrdSaveTable(OSItemList);
            loadQltyOrdTable(OItemList);
        }
        else {
            //alert('Should not exceed BalQty...');
            var msg = 'Should not exceed Balance quantity...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            $.each(OItemList, function () {
                if (this.pur_ord_no == Pordno && this.order_no == ordn) {

                    this.debit_qty = 0;
                }
            });
            loadQltyOrdTable(OItemList);
            return true;
        }
        //$.each(OItemList, function () {
        //    if (this.pur_ord_no == Pordno && this.order_no == ordn) {

        //        this.debit_qty = Val;
        //    }
        //});

        //$.each(OItemList, function () {
        //    if (this.pur_ord_no == Pordno) {
        //        aqty.push(this.accept_qty);
        //        aqty.push(this.debit_qty);
        //    }
        //});

        //var totalamnt = 0;

        //for (var e = 0; e < aqty.length; e++) {
        //    var amount = aqty[e];
        //    totalamnt = totalamnt + parseFloat(amount);
        //}

        //if (totalamnt > balq) {
        //    alert('Should not exceed BalQty...');

        //    $.each(OItemList, function () {
        //        if (this.pur_ord_no == Pordno && this.order_no == ordn) {

        //            this.debit_qty = 0;
        //        }
        //    });
        //    loadQltyOrdTable(OItemList);
        //    return true;
        //}
        //else {
        //    $.each(OSItemList, function () {
        //        if (this.pur_ord_no == Pordno && this.order_no == ordn && this.grn_detid == GrnDetId) {
        //            this.debit_qty = Val;
        //        }
        //    });
        //    loadQltyOrdSaveTable(OSItemList);
        //    loadQltyOrdTable(OItemList);
        //}
    }

    if (fr > 0) {

        //alert('Should fill in Receivable Qty...');
        var msg = 'Should fill in Receivable quantity...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);

        $.each(OItemList, function () {
            if (this.pur_ord_no == Pordno && this.order_no == ordn) {

                this.debit_qty = 0;
            }
        });
        loadQltyOrdTable(OItemList);
        return true;
        //$.each(OItemList, function () {
        //    if (this.pur_ord_no == Pordno) {
        //        aqty.push(this.accept_qty);
        //        aqty.push(this.receivable_qty);
        //    }
        //});

        //var totalamnt = 0;

        //for (var e = 0; e < aqty.length; e++) {
        //    var amount = aqty[e];
        //    totalamnt = totalamnt + parseFloat(amount);
        //}

        //if (totalamnt > balq) {
        //    alert('Should not exceed BalQty...');
        //    return true;
        //}
        //else {
        //    $.each(OSItemList, function () {
        //        if (this.pur_ord_no == Pordno && this.order_no == ordn && this.grn_detid == GrnDetId) {
        //            this.receivable_qty = Val;
        //        }
        //    });
        //    loadQltyOrdSaveTable(OSItemList);
        //    loadQltyOrdTable(OItemList);
        //}
    }
}

function RecSepcalcQty(Val) {
    debugger;
    indexstk;

    var currentrowoftcpi = OItemList.slice(indexstk);

    var GrnDetId = currentrowoftcpi[0].grn_detid;
    var Pordno = currentrowoftcpi[0].pur_ord_no;
    var ordn = currentrowoftcpi[0].order_no;
    var balq = currentrowoftcpi[0].porderqty;
    var accqty = currentrowoftcpi[0].accept_qty;
    var ordqty = currentrowoftcpi[0].orderqty;


    var aqty = [];
    var dqty = [];
    var fd = 0;
    var fr = 0;
    $.each(ItemList, function () {
        if (this.Grn_detid == GrnDetId) {
            fd = this.Debit;
            fr = this.grnreceivable;
        }
    });
    //loadQltyItemTable(ItemList);

    if (fd > 0) {
        //alert('Should fill in Debit Qty...');
        var msg = 'Should fill in Debit quantity...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);

        $.each(OItemList, function () {
            if (this.pur_ord_no == Pordno && this.order_no == ordn) {

                this.receivable_qty = 0;
            }
        });
        loadQltyOrdTable(OItemList);
        return true;
        //$.each(OItemList, function () {
        //    if (this.pur_ord_no == Pordno) {
        //        aqty.push(this.accept_qty);
        //        aqty.push(this.debit_qty);
        //    }
        //});

        //var totalamnt = 0;

        //for (var e = 0; e < aqty.length; e++) {
        //    var amount = aqty[e];
        //    totalamnt = totalamnt + parseFloat(amount);
        //}

        //if (totalamnt > balq) {
        //    alert('Should not exceed BalQty...');
        //    return true;
        //}
        //else {
        //    $.each(OSItemList, function () {
        //        if (this.pur_ord_no == Pordno && this.order_no == ordn && this.grn_detid == GrnDetId) {
        //            this.debit_qty = Val;
        //        }
        //    });
        //    loadQltyOrdSaveTable(OSItemList);
        //    loadQltyOrdTable(OItemList);
        //}
    }

    if (fr > 0) {

        var ac = parseFloat(accqty) + parseFloat(Val);
        if (ac <= ordqty) {
            $.each(OItemList, function () {
                if (this.pur_ord_no == Pordno && this.order_no == ordn && this.grn_detid == GrnDetId) {

                    this.receivable_qty = Val;
                }
            });
            $.each(OSItemList, function () {
                if (this.pur_ord_no == Pordno && this.order_no == ordn && this.grn_detid == GrnDetId) {

                    this.receivable_qty = Val;
                }
            });
            loadQltyOrdSaveTable(OSItemList);
            loadQltyOrdTable(OItemList);
        }
        else {
            //alert('Should not exceed BalQty...');
            var msg = 'Should not exceed Balance quantity...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            $.each(OItemList, function () {
                if (this.pur_ord_no == Pordno && this.order_no == ordn) {

                    this.receivable_qty = 0;
                }
            });
            loadQltyOrdTable(OItemList);
            return true;
        }

        //    $.each(OItemList, function () {
        //        if (this.pur_ord_no == Pordno && this.order_no == ordn) {

        //            this.receivable_qty = val;
        //        }
        //    });

        //$.each(OItemList, function () {
        //    if (this.pur_ord_no == Pordno) {
        //        aqty.push(this.accept_qty);
        //        aqty.push(this.receivable_qty);
        //    }
        //});

        //var totalamnt = 0;

        //for (var e = 0; e < aqty.length; e++) {
        //    var amount = aqty[e];
        //    totalamnt = totalamnt + parseFloat(amount);
        //}

        //if (totalamnt > balq) {
        //    alert('Should not exceed BalQty...');
        //    $.each(OItemList, function () {
        //        if (this.pur_ord_no == Pordno && this.order_no == ordn) {

        //            this.receivable_qty = 0;
        //        }
        //    });
        //    loadQltyOrdTable(OItemList);
        //    return true;
        //}
        //else {
        //    $.each(OSItemList, function () {
        //        if (this.pur_ord_no == Pordno && this.order_no == ordn && this.grn_detid == GrnDetId) {
        //            this.receivable_qty = val;
        //        }
        //    });
        //    loadQltyOrdSaveTable(OSItemList);
        //    loadQltyOrdTable(OItemList);
        //}
    }

}

function RetcalcQty(Val) {
    debugger;

    index;

    var currentrowoftcpi = ItemList.slice(index);

    var GrnDetId = currentrowoftcpi[0].Grn_detid;
    var ExcQty = currentrowoftcpi[0].excess_qty;

    if (ExcQty > 0) {
        //alert("Execess Qty are made for this row,So return are not alowed...");
        var msg = 'Execess quantity are made for this row,So return are not alowed...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);

        $.each(ItemList, function () {
            if (this.Grn_detid == GrnDetId) {
                this.grnreturn = 0;


            }
        });
        loadQltyItemTable(ItemList);
        return true;
    }

    else {
        $.each(ItemList, function () {
            if (this.Grn_detid == GrnDetId) {
                this.grnreturn = Val;

            }
        });
        loadQltyItemTable(ItemList);
    }
}

function calcAccQty(value) {
    debugger;
    indexstk;

    var currentrowoftcpi = OItemList.slice(indexstk);

    var GrnDetId = currentrowoftcpi[0].grn_detid;
    var Pordno = currentrowoftcpi[0].pur_ord_no;
    var ordn = currentrowoftcpi[0].order_no;
    var balq = currentrowoftcpi[0].porderqty;

    var ordqty = currentrowoftcpi[0].orderqty;

    if (value > ordqty) {
        //alert('Should not exceed OrdBal...');
        var msg = 'Should not exceed Order Balance...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        $.each(OItemList, function () {
            if (this.pur_ord_no == Pordno && this.order_no == ordn && this.grn_detid == GrnDetId) {

                this.accept_qty = 0;

            }
        });
        loadQltyOrdTable(OItemList);
        return true;
    }

    $.each(OSItemList, function () {
        if (this.pur_ord_no == Pordno && this.order_no == ordn && this.grn_detid == GrnDetId) {
            if (balq >= value) {
                this.accept_qty = value;
            }
            else {
                var t = value - balq;
                this.accept_qty = balq;
            }
        }
    });

    $.each(OItemList, function () {
        if (this.pur_ord_no == Pordno && this.order_no == ordn && this.grn_detid == GrnDetId) {
            if (balq >= value) {
                this.accept_qty = value;
            }
            else {
                var t = value - balq;
                this.accept_qty = balq;
            }
        }
    });
    var totalamnt = 0;

    for (var e = 0; e < OItemList.length; e++) {
        if (OItemList[e].pur_ord_no == Pordno) {
            var amount = OItemList[e].accept_qty;
            totalamnt = totalamnt + parseFloat(amount);
        }
    }

    if (totalamnt > balq) {
        //alert('Should not exceed Accepted Qty...');
        var msg = 'Should not exceed Accepted quantity...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        $.each(OItemList, function () {
            if (this.pur_ord_no == Pordno && this.order_no == ordn && this.grn_detid == GrnDetId) {

                this.accept_qty = 0;

            }
        });
        $.each(OSItemList, function () {
            if (this.pur_ord_no == Pordno && this.order_no == ordn && this.grn_detid == GrnDetId) {

                this.accept_qty = 0;

            }
        });
        loadQltyOrdSaveTable(OSItemList);
        loadQltyOrdTable(OItemList);
        return true;
    }
    else {
        var fd = 0;
        var fr = 0;
        $.each(ItemList, function () {
            if (this.Grn_detid == GrnDetId) {
                fd = this.Debit;
                fr = this.grnreceivable;
            }
        });
        if (fd > 0) {
            var qy = ordqty - value;
            if (qy >= 0) {
                $.each(OItemList, function () {
                    if (this.pur_ord_no == Pordno && this.order_no == ordn && this.grn_detid == GrnDetId) {

                        this.debit_qty = qy;

                    }
                });
                $.each(OSItemList, function () {
                    if (this.pur_ord_no == Pordno && this.order_no == ordn && this.grn_detid == GrnDetId) {

                        this.debit_qty = qy;

                    }
                });
            }
        }

        if (fr > 0) {
            var qy = ordqty - value;
            if (qy >= 0) {
                $.each(OItemList, function () {
                    if (this.pur_ord_no == Pordno && this.order_no == ordn && this.grn_detid == GrnDetId) {

                        this.receivable_qty = qy;

                    }
                });
                $.each(OSItemList, function () {
                    if (this.pur_ord_no == Pordno && this.order_no == ordn && this.grn_detid == GrnDetId) {

                        this.receivable_qty = qy;

                    }
                });
            }
        }
        loadQltyOrdSaveTable(OSItemList);
        loadQltyOrdTable(OItemList);

    }

}
function ReccalcQty(Val) {
    debugger;

    index;

    var currentrowoftcpi = ItemList.slice(index);

    var GrnDetId = currentrowoftcpi[0].Grn_detid;
    var ExcQty = currentrowoftcpi[0].excess_qty;
    var debit = currentrowoftcpi[0].Debit;
    if (ExcQty > 0) {
        //alert("Execess Qty are made for this row,So receivable are not alowed...");
        var msg = 'Execess quantity are made for this row,So receivable are not alowed...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);

        $.each(ItemList, function () {
            if (this.Grn_detid == GrnDetId) {
                this.grnreceivable = 0;


            }
        });
        loadQltyItemTable(ItemList);
        return true;
    }
    else {
        if (debit > 0) {
            //alert('Already Debit is filled...');
            var msg = 'Already Debit is filled...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            $.each(ItemList, function () {
                if (this.Grn_detid == GrnDetId) {
                    this.grnreceivable = 0;


                }
            });
            loadQltyItemTable(ItemList);
            return true;
        }
        $.each(ItemList, function () {
            if (this.Grn_detid == GrnDetId) {
                this.grnreceivable = Val;


            }
        });

        loadQltyItemTable(ItemList);
        indexitm;
        var currentrowoftcpi = ItemList.slice(indexitm);
        var poid = currentrowoftcpi[0].Grn_detid;
        var qty = currentrowoftcpi[0].grnqty;
        var oid = currentrowoftcpi[0].order_no;
        var po = currentrowoftcpi[0].pur_ord_no;
        OSItemList;
        var jid = [];
        var pid = [];
        var bal = [];
        var ordbal = [];
        var detid = [];
        for (var d = 0; d < OSItemList.length; d++) {
            if (OSItemList[d].grn_detid == poid) {
                jid.push(OSItemList[d].order_no);
                pid.push(OSItemList[d].pur_ord_no);
                bal.push(OSItemList[d].PurRecvdQty);
                ordbal.push(OSItemList[d].orderqty);
                // detid.push(OSItemList[d].);
            }
        }
        var arr = [];
        // arr = $.unique(bal);
        var t = jid.length;
        var p = pid.length;
        var pt = [];
        var rt = [];
        var h = 0;
        for (var f = t; f <= jid.length; f--) {
            for (var r = p; r <= pid.length; r--) {
                var d = bal[f - 1];
                var hg = ordbal[f - 1];
                if (d > 0) {
                    bal[f - 1] = d - Val;
                    var l = d - Val;
                    if (l > 0) {
                        ordbal[f - 1] = ordbal[f - 1] - Val;
                        var t = ordbal[f - 1];
                        if (t > 0) {
                            h = bal[f - 1];
                            pt = [];
                            rt = [];
                            pt.push(pid[r - 1]);
                            rt.push(jid[f - 1]);
                            if (pt.length > 0) {
                                $.each(OSItemList, function () {
                                    if (this.pur_ord_no === pt[0] && this.grn_detid === poid) {
                                        this.porderqty = h;
                                    }
                                });

                                $.each(OSItemList, function () {
                                    if (this.order_no === rt[0] && this.pur_ord_no === pt[0] && this.grn_detid === poid) {
                                        this.accept_qty = ordbal[f - 1];
                                    }
                                });
                                loadQltyOrdSaveTable(OSItemList);

                                $.each(OItemList, function () {
                                    if (this.pur_ord_no === pt[0]) {
                                        this.porderqty = h;
                                    }
                                });
                                $.each(OItemList, function () {
                                    if (this.order_no === rt[0] && this.pur_ord_no === pt[0] && this.grn_detid === poid) {
                                        this.accept_qty = ordbal[f - 1];
                                    }
                                });
                                loadQltyOrdTable(OItemList);

                                $.each(ItemList, function () {
                                    if (this.Grn_detid === poid) {
                                        //this.grnreceivable
                                        this.grnaccept = qty - Val;
                                    }
                                });
                                loadQltyItemTable(ItemList);
                                return true;
                            }
                        }
                        else if (t < 0) {
                            ordbal[f - 1] = 0;
                            pt = [];
                            rt = [];
                            pt.push(pid[r - 1]);
                            rt.push(jid[f - 1]);
                            $.each(OSItemList, function () {
                                if (this.order_no === rt[0] && this.pur_ord_no === pt[0] && this.grn_detid === poid) {
                                    this.accept_qty = 0;// ordbal[f - 1];
                                }
                            });
                            $.each(OItemList, function () {
                                if (this.order_no === rt[0] && this.pur_ord_no === pt[0] && this.grn_detid === poid) {
                                    this.accept_qty = 0;// ordbal[f - 1];
                                }
                            });
                            $.each(OItemList, function () {
                                if (this.pur_ord_no === pt[0]) {
                                    this.porderqty = bal[f - 1];
                                }
                            });


                            $.each(OSItemList, function () {
                                if (this.pur_ord_no === pt[0] && this.grn_detid === poid) {
                                    this.porderqty = bal[f - 1];
                                }
                            });
                            f--;
                            r--;
                            if (r == 0) {
                                r = 1;
                            }
                            if (f == 0) {
                                f = 1;
                            }
                            //if (bal[f - 1] == d) {
                            //    ordbal[f - 1] = 0;
                            //    pt = [];
                            //    rt = [];
                            //    pt.push(pid[r - 1]);
                            //    rt.push(jid[f - 1]);
                            //    $.each(OSItemList, function () {
                            //        if (this.order_no === rt[0] && this.pur_ord_no === pt[0]) {
                            //            this.accept_qty = 0;// ordbal[f - 1];
                            //        }
                            //    });
                            //    $.each(OItemList, function () {
                            //        if (this.order_no === rt[0] && this.pur_ord_no === pt[0]) {
                            //            this.accept_qty = 0;// ordbal[f - 1];
                            //        }
                            //    });
                            //    f--;
                            //    r--;

                            //}

                            Val = parseFloat(Val) - parseFloat(hg);
                            Val = ordbal[f - 1] - Val;
                            pt = [];
                            rt = [];
                            pt.push(pid[r - 1]);
                            rt.push(jid[f - 1]);
                            $.each(OSItemList, function () {
                                if (this.order_no === rt[0] && this.pur_ord_no === pt[0] && this.grn_detid === poid) {
                                    this.accept_qty = Val;
                                }
                            });
                            $.each(OItemList, function () {
                                if (this.order_no === rt[0] && this.pur_ord_no === pt[0] && this.grn_detid === poid) {
                                    this.accept_qty = Val;
                                }
                            });
                            //$.each(OItemList, function () {
                            //    if (this.pur_ord_no === pt[0]) {
                            //        this.porderqty = bal[f - 1];
                            //    }
                            //});
                            loadQltyOrdSaveTable(OSItemList);
                            loadQltyOrdTable(OItemList);
                            if (Val >= 0) {
                                return true;
                            }
                        }
                        else if (t == 0) {
                            ordbal[f - 1] = 0;
                            pt = [];
                            rt = [];
                            pt.push(pid[r - 1]);
                            rt.push(jid[f - 1]);
                            $.each(OSItemList, function () {
                                if (this.order_no === rt[0] && this.pur_ord_no === pt[0] && this.grn_detid === poid) {
                                    this.accept_qty = 0;// ordbal[f - 1];
                                }
                            });
                            $.each(OItemList, function () {
                                if (this.order_no === rt[0] && this.pur_ord_no === pt[0] && this.grn_detid === poid) {
                                    this.accept_qty = 0;// ordbal[f - 1];
                                }
                            });
                            $.each(OItemList, function () {
                                if (this.pur_ord_no === pt[0]) {
                                    this.porderqty = bal[f - 1];
                                }
                            });

                            $.each(OSItemList, function () {
                                if (this.pur_ord_no === pt[0] && this.grn_detid === poid) {
                                    this.porderqty = bal[f - 1];
                                }
                            });
                            loadQltyOrdSaveTable(OSItemList);
                            loadQltyOrdTable(OItemList);
                            return true;
                        }
                    }
                    else if (l < 0) {
                        //var uy = Val + l;
                        // ordbal[f - 1] = ordbal[f - 1] - Val;
                        var p = bal[f - 1];
                        bal[f - 1] = 0;
                        ordbal[f - 1] = 0;
                        // h = bal[f - 1];

                        pt = [];
                        rt = [];
                        pt.push(pid[r - 1]);
                        rt.push(jid[f - 1]);
                        $.each(OSItemList, function () {
                            if (this.pur_ord_no === pt[0] && this.grn_detid === poid) {
                                this.porderqty = 0;
                            }
                        });

                        $.each(OItemList, function () {
                            if (this.pur_ord_no === pt[0]) {
                                this.porderqty = 0;
                            }
                        });
                        $.each(OSItemList, function () {
                            if (this.order_no === rt[0] && this.pur_ord_no === pt[0] && this.grn_detid === poid) {
                                this.accept_qty = ordbal[f - 1];
                            }
                        });
                        $.each(OItemList, function () {
                            if (this.order_no === rt[0] && this.pur_ord_no === pt[0] && this.grn_detid === poid) {
                                this.accept_qty = ordbal[f - 1];
                            }
                        });
                        loadQltyOrdTable(OItemList);
                        loadQltyOrdSaveTable(OSItemList);
                        f--;
                        r--;
                        if (r == 0) {
                            r = 1;
                        }
                        if (f == 0) {
                            f = 1;
                        }
                        if (bal[f - 1] == d) {
                            bal[f - 1] = 0;
                            ordbal[f - 1] = 0;
                            pt = [];
                            rt = [];
                            pt.push(pid[r - 1]);
                            rt.push(jid[f - 1]);
                            $.each(OSItemList, function () {
                                if (this.pur_ord_no === pt[0] && this.grn_detid === poid) {
                                    this.porderqty = 0;
                                }
                            });

                            $.each(OItemList, function () {
                                if (this.pur_ord_no === pt[0]) {
                                    this.porderqty = 0;
                                }
                            });
                            $.each(OSItemList, function () {
                                if (this.order_no === rt[0] && this.pur_ord_no === pt[0] && this.grn_detid === poid) {
                                    this.accept_qty = ordbal[f - 1];
                                }
                            });
                            $.each(OItemList, function () {
                                if (this.order_no === rt[0] && this.pur_ord_no === pt[0] && this.grn_detid === poid) {
                                    this.accept_qty = ordbal[f - 1];
                                }
                            });
                            loadQltyOrdTable(OItemList);
                            loadQltyOrdSaveTable(OSItemList);
                            f--;
                            r--;
                            if (r == 0) {
                                r = 1;
                            }
                            if (f == 0) {
                                f = 1;
                            }
                        }

                        h = bal[f - 1];

                        Val = parseFloat(Val) - parseFloat(d);
                        pt = [];
                        rt = [];
                        pt.push(pid[r - 1]);
                        rt.push(jid[f - 1]);
                        $.each(OSItemList, function () {
                            if (this.pur_ord_no === pt[0] && this.grn_detid === poid) {
                                this.porderqty = Val;
                            }
                        });

                        //$.each(OSItemList, function () {
                        //    if (this.order_no === rt[0] && this.pur_ord_no === pt[0]) {
                        //        this.accept_qty = ordbal[f - 1];
                        //    }
                        //});
                        loadQltyOrdSaveTable(OSItemList);

                        $.each(OItemList, function () {
                            if (this.pur_ord_no === pt[0]) {
                                this.porderqty = Val;
                            }
                        });
                        //$.each(OItemList, function () {
                        //    if (this.order_no === rt[0] && this.pur_ord_no === pt[0]) {
                        //        this.accept_qty = ordbal[f - 1];
                        //    }
                        //});
                        loadQltyOrdTable(OItemList);





                        // else {

                        // var c = bal[f - 1] + l;
                        // }
                        //$.each(OItemList, function () {
                        //    if (this.order_no === rt[0] && this.pur_ord_no === pt[0]) {
                        //        this.accept_qty = 0;
                        //    }
                        //});
                        //loadQltyOrdTable(OItemList);

                    }
                }
                //else {
                //    return true;
                //}


            }
        }
        $.each(ItemList, function () {
            if (this.Grn_detid === poid) {
                //this.grnreceivable
                this.grnaccept = qty - Val;
            }
        });
        loadQltyItemTable(ItemList);

    }

}
function DebitcalcQty(Val) {
    debugger;

    index;

    var currentrowoftcpi = ItemList.slice(index);

    var GrnDetId = currentrowoftcpi[0].Grn_detid;
    var ExcQty = currentrowoftcpi[0].excess_qty;
    var recv = currentrowoftcpi[0].grnreceivable;
    if (ExcQty > 0) {
        //alert("Execess Qty are made for this row,So return are not alowed...");
        var msg = 'Execess quantity are made for this row,So return are not alowed...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        $.each(ItemList, function () {
            if (this.Grn_detid == GrnDetId) {
                this.Debit = 0;


            }
        });
        loadQltyItemTable(ItemList);
        return true;
    }
    else {
        if (recv > 0) {
            //alert('Already Receivable is filled...');
            var msg = 'Already Receivable is filled...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            $.each(ItemList, function () {
                if (this.Grn_detid == GrnDetId) {
                    this.Debit = 0;


                }
            });
            loadQltyItemTable(ItemList);
            return true;
        }
        $.each(ItemList, function () {
            if (this.Grn_detid == GrnDetId) {
                this.Debit = Val;


            }
        });

        loadQltyItemTable(ItemList);
        indexitm;


        var currentrowoftcpi = ItemList.slice(indexitm);
        var poid = currentrowoftcpi[0].Grn_detid;
        var qty = currentrowoftcpi[0].grnqty;
        var oid = currentrowoftcpi[0].order_no;
        var po = currentrowoftcpi[0].pur_ord_no;
        OSItemList;
        var jid = [];
        var pid = [];
        var bal = [];
        var ordbal = [];
        var detid = [];
        for (var d = 0; d < OSItemList.length; d++) {
            if (OSItemList[d].grn_detid == poid) {
                jid.push(OSItemList[d].order_no);
                pid.push(OSItemList[d].pur_ord_no);
                bal.push(OSItemList[d].PurRecvdQty);
                ordbal.push(OSItemList[d].orderqty);
                // detid.push(OSItemList[d].);
            }
        }
        var arr = [];
        // arr = $.unique(bal);
        var t = jid.length;
        var p = pid.length;
        var pt = [];
        var rt = [];
        var h = 0;
        for (var f = t; f <= jid.length; f--) {
            for (var r = p; r <= pid.length; r--) {
                var d = bal[f - 1];
                var hg = ordbal[f - 1];
                if (d > 0) {
                    bal[f - 1] = d - Val;
                    var l = d - Val;
                    if (l > 0) {
                        ordbal[f - 1] = ordbal[f - 1] - Val;
                        var t = ordbal[f - 1];
                        if (t > 0) {
                            h = bal[f - 1];
                            pt = [];
                            rt = [];
                            pt.push(pid[r - 1]);
                            rt.push(jid[f - 1]);
                            if (pt.length > 0) {
                                $.each(OSItemList, function () {
                                    if (this.pur_ord_no === pt[0] && this.grn_detid === poid) {
                                        this.porderqty = h;
                                    }
                                });

                                $.each(OSItemList, function () {
                                    if (this.order_no === rt[0] && this.pur_ord_no === pt[0] && this.grn_detid === poid) {
                                        this.accept_qty = ordbal[f - 1];
                                    }
                                });
                                loadQltyOrdSaveTable(OSItemList);

                                $.each(OItemList, function () {
                                    if (this.pur_ord_no === pt[0]) {
                                        this.porderqty = h;
                                    }
                                });
                                $.each(OItemList, function () {
                                    if (this.order_no === rt[0] && this.pur_ord_no === pt[0] && this.grn_detid === poid) {
                                        this.accept_qty = ordbal[f - 1];
                                    }
                                });
                                loadQltyOrdTable(OItemList);

                                $.each(ItemList, function () {
                                    if (this.Grn_detid === poid) {
                                        //this.grnreceivable
                                        this.grnaccept = qty - Val;
                                    }
                                });
                                loadQltyItemTable(ItemList);
                                return true;
                            }
                        }
                        else if (t < 0) {
                            ordbal[f - 1] = 0;
                            pt = [];
                            rt = [];
                            pt.push(pid[r - 1]);
                            rt.push(jid[f - 1]);
                            $.each(OSItemList, function () {
                                if (this.order_no === rt[0] && this.pur_ord_no === pt[0] && this.grn_detid === poid) {
                                    this.accept_qty = 0;// ordbal[f - 1];
                                }
                            });
                            $.each(OItemList, function () {
                                if (this.order_no === rt[0] && this.pur_ord_no === pt[0] && this.grn_detid === poid) {
                                    this.accept_qty = 0;// ordbal[f - 1];
                                }
                            });
                            $.each(OItemList, function () {
                                if (this.pur_ord_no === pt[0]) {
                                    this.porderqty = bal[f - 1];
                                }
                            });
                            f--;
                            r--;
                            if (r == 0) {
                                r = 1;
                            }
                            if (f == 0) {
                                f = 1;
                            }
                            //if (bal[f - 1] == d) {
                            //    ordbal[f - 1] = 0;
                            //    pt = [];
                            //    rt = [];
                            //    pt.push(pid[r - 1]);
                            //    rt.push(jid[f - 1]);
                            //    $.each(OSItemList, function () {
                            //        if (this.order_no === rt[0] && this.pur_ord_no === pt[0]) {
                            //            this.accept_qty = 0;// ordbal[f - 1];
                            //        }
                            //    });
                            //    $.each(OItemList, function () {
                            //        if (this.order_no === rt[0] && this.pur_ord_no === pt[0]) {
                            //            this.accept_qty = 0;// ordbal[f - 1];
                            //        }
                            //    });
                            //    f--;
                            //    r--;

                            //}

                            Val = parseFloat(Val) - parseFloat(hg);
                            Val = ordbal[f - 1] - Val;
                            pt = [];
                            rt = [];
                            pt.push(pid[r - 1]);
                            rt.push(jid[f - 1]);
                            $.each(OSItemList, function () {
                                if (this.order_no === rt[0] && this.pur_ord_no === pt[0] && this.grn_detid === poid) {
                                    this.accept_qty = Val;
                                }
                            });
                            $.each(OItemList, function () {
                                if (this.order_no === rt[0] && this.pur_ord_no === pt[0] && this.grn_detid === poid) {
                                    this.accept_qty = Val;
                                }
                            });
                            //$.each(OItemList, function () {
                            //    if (this.pur_ord_no === pt[0]) {
                            //        this.porderqty = bal[f - 1];
                            //    }
                            //});
                            loadQltyOrdSaveTable(OSItemList);
                            loadQltyOrdTable(OItemList);
                            if (Val >= 0) {
                                return true;
                            }
                        }
                        else if (t == 0) {
                            ordbal[f - 1] = 0;
                            pt = [];
                            rt = [];
                            pt.push(pid[r - 1]);
                            rt.push(jid[f - 1]);
                            $.each(OSItemList, function () {
                                if (this.order_no === rt[0] && this.pur_ord_no === pt[0] && this.grn_detid === poid) {
                                    this.accept_qty = 0;// ordbal[f - 1];
                                }
                            });
                            $.each(OItemList, function () {
                                if (this.order_no === rt[0] && this.pur_ord_no === pt[0] && this.grn_detid === poid) {
                                    this.accept_qty = 0;// ordbal[f - 1];
                                }
                            });
                            $.each(OItemList, function () {
                                if (this.pur_ord_no === pt[0]) {
                                    this.porderqty = bal[f - 1];
                                }
                            });
                            loadQltyOrdSaveTable(OSItemList);
                            loadQltyOrdTable(OItemList);
                            return true;
                        }
                    }
                    else if (l < 0) {
                        //var uy = Val + l;
                        // ordbal[f - 1] = ordbal[f - 1] - Val;
                        var p = bal[f - 1];
                        bal[f - 1] = 0;
                        ordbal[f - 1] = 0;
                        // h = bal[f - 1];

                        pt = [];
                        rt = [];
                        pt.push(pid[r - 1]);
                        rt.push(jid[f - 1]);
                        $.each(OSItemList, function () {
                            if (this.pur_ord_no === pt[0] && this.grn_detid === poid) {
                                this.porderqty = 0;
                            }
                        });

                        $.each(OItemList, function () {
                            if (this.pur_ord_no === pt[0]) {
                                this.porderqty = 0;
                            }
                        });
                        $.each(OSItemList, function () {
                            if (this.order_no === rt[0] && this.pur_ord_no === pt[0] && this.grn_detid === poid) {
                                this.accept_qty = ordbal[f - 1];
                            }
                        });
                        $.each(OItemList, function () {
                            if (this.order_no === rt[0] && this.pur_ord_no === pt[0] && this.grn_detid === poid) {
                                this.accept_qty = ordbal[f - 1];
                            }
                        });
                        loadQltyOrdTable(OItemList);
                        loadQltyOrdSaveTable(OSItemList);
                        f--;
                        r--;
                        if (r == 0) {
                            r = 1;
                        }
                        if (f == 0) {
                            f = 1;
                        }
                        if (bal[f - 1] == d) {
                            bal[f - 1] = 0;
                            ordbal[f - 1] = 0;
                            pt = [];
                            rt = [];
                            pt.push(pid[r - 1]);
                            rt.push(jid[f - 1]);
                            $.each(OSItemList, function () {
                                if (this.pur_ord_no === pt[0] && this.grn_detid === poid) {
                                    this.porderqty = 0;
                                }
                            });

                            $.each(OItemList, function () {
                                if (this.pur_ord_no === pt[0]) {
                                    this.porderqty = 0;
                                }
                            });
                            $.each(OSItemList, function () {
                                if (this.order_no === rt[0] && this.pur_ord_no === pt[0] && this.grn_detid === poid) {
                                    this.accept_qty = ordbal[f - 1];
                                }
                            });
                            $.each(OItemList, function () {
                                if (this.order_no === rt[0] && this.pur_ord_no === pt[0] && this.grn_detid === poid) {
                                    this.accept_qty = ordbal[f - 1];
                                }
                            });
                            loadQltyOrdTable(OItemList);
                            loadQltyOrdSaveTable(OSItemList);
                            f--;
                            r--;
                            if (r == 0) {
                                r = 1;
                            }
                            if (f == 0) {
                                f = 1;
                            }
                        }

                        h = bal[f - 1];

                        Val = parseFloat(Val) - parseFloat(d);
                        pt = [];
                        rt = [];
                        pt.push(pid[r - 1]);
                        rt.push(jid[f - 1]);
                        $.each(OSItemList, function () {
                            if (this.pur_ord_no === pt[0] && this.grn_detid === poid) {
                                this.porderqty = Val;
                            }
                        });

                        //$.each(OSItemList, function () {
                        //    if (this.order_no === rt[0] && this.pur_ord_no === pt[0]) {
                        //        this.accept_qty = ordbal[f - 1];
                        //    }
                        //});
                        loadQltyOrdSaveTable(OSItemList);

                        $.each(OItemList, function () {
                            if (this.pur_ord_no === pt[0]) {
                                this.porderqty = Val;
                            }
                        });
                        //$.each(OItemList, function () {
                        //    if (this.order_no === rt[0] && this.pur_ord_no === pt[0]) {
                        //        this.accept_qty = ordbal[f - 1];
                        //    }
                        //});
                        loadQltyOrdTable(OItemList);





                        // else {

                        // var c = bal[f - 1] + l;
                        // }
                        //$.each(OItemList, function () {
                        //    if (this.order_no === rt[0] && this.pur_ord_no === pt[0]) {
                        //        this.accept_qty = 0;
                        //    }
                        //});
                        //loadQltyOrdTable(OItemList);

                    }
                }
                //else {
                //    return true;
                //}


            }
        }
        $.each(ItemList, function () {
            if (this.Grn_detid === poid) {
                //this.grnreceivable
                this.grnaccept = qty - Val;
            }
        });
        loadQltyItemTable(ItemList);


        //var currentrowoftcpi = ItemList.slice(indexitm);
        //var poid = currentrowoftcpi[0].Grn_detid;
        //var qty = currentrowoftcpi[0].grnqty;
        ////var colorid = currentrowoftcpi[0].clrid;

        //OSItemList;
        //var jid = [];
        //var pid = [];
        //var bal = [];
        //var ordbal = [];
        //for (var d = 0; d < OSItemList.length; d++) {
        //    if (OSItemList[d].grn_detid == poid) {
        //        jid.push(OSItemList[d].order_no);
        //        pid.push(OSItemList[d].pur_ord_no);
        //        bal.push(OSItemList[d].PurRecvdQty);
        //        ordbal.push(OSItemList[d].orderqty);
        //    }
        //}

        //var t = jid.length;
        //var p = pid.length;
        //var pt = [];
        //var rt = [];
        //for (var f = t; f <= jid.length; f--) {
        //    for (var r = p; r <= pid.length; r--) {
        //        //if (jid[f] == pid[r]) {

        //        //}
        //        var d = bal[f - 1];
        //        if (d > 0) {
        //            bal[f - 1] = d - Val;
        //            ordbal[f - 1] = ordbal[f - 1] - Val;
        //            var h = bal[f - 1];
        //            pt.push(pid[r - 1]);
        //            rt.push(jid[f - 1]);
        //            if (pt.length > 0) {
        //                $.each(OSItemList, function () {
        //                    if (this.pur_ord_no === pt[0]) {
        //                        this.porderqty = h;
        //                    }
        //                });

        //                $.each(OSItemList, function () {
        //                    if (this.order_no === rt[0] && this.pur_ord_no === pt[0]) {
        //                        this.accept_qty = ordbal[f - 1];
        //                    }
        //                });
        //                loadQltyOrdSaveTable(OSItemList);

        //                $.each(OItemList, function () {
        //                    if (this.pur_ord_no === pt[0]) {
        //                        this.porderqty = h;
        //                    }
        //                });
        //                $.each(OItemList, function () {
        //                    if (this.order_no === rt[0] && this.pur_ord_no === pt[0]) {
        //                        this.accept_qty = ordbal[f - 1];
        //                    }
        //                });
        //                loadQltyOrdTable(OItemList);

        //                $.each(ItemList, function () {
        //                    if (this.Grn_detid === poid) {
        //                        //this.grnreceivable
        //                        this.grnaccept = qty - Val;
        //                    }
        //                });
        //                loadQltyItemTable(ItemList);
        //                return true;
        //            }

        //        }
        //        //else {
        //        //    return true;
        //        //}



        //    }
        //}
    }


}


function ExRetcalcQty(Val) {
    debugger;

    index;

    var currentrowoftcpi = ItemList.slice(index);

    var GrnDetId = currentrowoftcpi[0].Grn_detid;
    var ExcQty = currentrowoftcpi[0].excess_qty;
    if (Val > ExcQty) {
        //alert("Excess Return Qty are not greater then ExcessQty...");
        var msg = 'Excess Return quantity are not greater then Excess quantity...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);

        $.each(ItemList, function () {
            if (this.Grn_detid == GrnDetId) {
                this.excess_return = 0;


            }
        });
        loadQltyItemTable(ItemList);
        return true;
    }
    else {
        $.each(ItemList, function () {
            if (this.Grn_detid == GrnDetId) {
                this.excess_return = Val;


            }
        });
        loadQltyItemTable(ItemList);
    }


}

//$(document).on('click', '.btnItemview', function () {
//    debugger;

//    var table = $('#tbItemEntrygrid').DataTable();

//    var GrDetId = table.row($(this).parents('tr')).data()["Grn_detid"];
//    var ExcQty = table.row($(this).parents('tr')).data()["excess_qty"];   

//    var colorempty = [];
//    colorempty = OSItemList;

//    colorempty = $.grep(colorempty, function (v) {
//        return (v.grn_detid === GrDetId);
//    });

//    OItemList = colorempty;
//    loadQltyOrdTable(OItemList);
//    //LoadQltyOrderDetails(GrDetId);



//});


$(document).ready(function () {

    $('#tbItemEntrygrid').on('click', 'tr', function (e) {
        debugger;

        var table = $('#tbItemEntrygrid').DataTable();
        var row = $(this).closest('tr');
        var data = $('#tbItemEntrygrid').dataTable().fnGetData(row);

        var GrDetId = data.Grn_detid;
        var ExcQty = data.excess_qty;

        var colorempty = [];
        colorempty = OSItemList;

        colorempty = $.grep(colorempty, function (v) {
            return (v.grn_detid === GrDetId);
        });

        OItemList = colorempty;
        loadQltyOrdTable(OItemList);



    });
});


function LoadQualityEditDetails(GrnMasId) {
    $.ajax({
        url: "/PurchaseQuality/GetQualityEditDetails",
        data: JSON.stringify({ Grn_MasId: GrnMasId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            debugger;
            if (obj != undefined) {
                $('#txtCompany').val(obj[0]["Company"]);
                $('#txtSupplier').val(obj[0]["Supplier"]);
                $('#txtGrnNo').val(obj[0]["receipt_no"]);
                $('#txtDcNo').val(obj[0]["Dc_no"]);
                $('#txtQltyNo').val(obj[0]["Qlty_No"]);
                $('#txtqltRemarks').val(obj[0]["QltyRemarks"]);
                $('#txtQcRptNo').val(obj[0]["QCReport_No"]);
                $('#txtQltyDate').val(moment(obj[0]["Qlty_date"]).format('DD/MM/YYYY'));


                LoadQualityEditEntryItem(GrnMasId);
                LoadQualityEditOrderEntrySave(GrnMasId);




                if (Mode == 1) {

                    $('#btnUpdate').show();
                    $('#btnAdd').hide();
                    $('#btnDelete').hide();
                } if (Mode == 2) {
                    $('#btnUpdate').hide();
                    $('#btnAdd').hide();
                    $('#btnDelete').show();
                   // $("#btnDelete").attr("disabled", true);
                }
                CheckAlloted();
            }
            else {

            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function CheckAlloted() {

    var Recpno = $('#txtGrnNo').val();

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

                if (Mode == 1) {

                    for (var x = 0; x < AllotedItemList.length; x++) {

                        //alert("Stock is alloted for " + AllotedItemList[x].CTransNo + ",Please Check it....")
                        var msg = "Stock is alloted for " + AllotedItemList[x].CTransNo + ",Please Check it...";
                        var flg = 4;
                        var mod = 1;
                        var url = "";
                        AlartMessage(msg, flg, mod, url);
                        $("#btnUpdate").attr('disabled', true);
                        $('#btnAdd').hide();
                        return true;
                    }

                }
                if (Mode == 2) {
                    for (var x = 0; x < AllotedItemList.length; x++) {
                        //alert("Stock is alloted for " + AllotedItemList[x].CTransNo + ",Please Check it....")
                        var msg = "Stock is alloted for " + AllotedItemList[x].CTransNo + ",Please Check it...";
                        var flg = 4;
                        var mod = 1;
                        var url = "";
                        AlartMessage(msg, flg, mod, url);
                        $("#btnDelete").attr('disabled', true);
                        $('#btnAdd').hide();
                        $('#btnUpdate').hide();
                        return true;

                    }
                }
            }


        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function validate() {
    var isValid = true;


    if ($('#txtQltyNo').val() == "") {
        $('#txtQltyNo').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtQltyNo').css('border-color', 'lightgrey');
    }




    return isValid;
}

function QltySave() {
    debugger;


    var res = validate();
    if (res == false) {
        return false;
    }


    if (OSItemList.length == 0) {
        //alert("Please Enter the Item Details..");
        var msg = "Please Enter the Item Details..";
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    //Total item weight
    var totalpqt = 0;
    var totalepqt = 0;
    var totexrt = 0;
    for (var e = 0; e < ItemList.length; e++) {
        var pcs = ItemList[e].grnaccept; 
        var epcs = ItemList[e].excess_qty;
        var exr = ItemList[e].excess_return;
        var deb = ItemList[e].grnreject;
        totalpqt = totalpqt + parseFloat(pcs) - parseFloat(deb);
        totalepqt = totalepqt + parseFloat(epcs);
        totexrt = totexrt + parseFloat(exr);
    }
    var TFWeight = (totalpqt.toFixed(1));

    var TEFWeight = (totalepqt.toFixed(1) - totexrt.toFixed(1));
    //Total Ord weight
    var totalypqt = 0;
    var totalyepqt = 0;
    for (var e = 0; e < OSItemList.length; e++) {
        var ypcs = OSItemList[e].accept_qty;
        var eypcs = OSItemList[e].QltyExcessQty;
        totalypqt = totalypqt + parseFloat(ypcs);
        totalyepqt = totalyepqt + parseFloat(eypcs);
    }
    var TYWeight = (totalypqt.toFixed(1));
    var TEYWeight = (totalyepqt.toFixed(1));



    if ((parseFloat(TYWeight) ) != (parseFloat(TFWeight) )) {
        //alert("Please Check the Total Item Accpt Qty and Total Order Weight for all Order Splilt up..");
        var msg = "Please Check the Total Item Accpt Qty and Total Order Weight for all Order Splilt up...";
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    //if ((parseFloat(TYWeight) + parseFloat(TEYWeight)) != (parseFloat(TFWeight)+parseFloat(TEFWeight)))  {
    //    alert("Please Check the Total Item Accpt Qty and Total Order Weight for all Order Splilt up..");
    //    return true;
    //}
    if (parseFloat(TEFWeight) != parseFloat(TEYWeight)) {
        //alert("Please Check the Total Item Excess Qty and Total Order Excess Weight for all Order Splilt up..");
        var msg = "Please Check the Total Item Excess Qty and Total Order Excess Weight for all Order Splilt up...";
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }


    var objConSubmit = {

        Grn_MasId: GrnId,
        Qlty_No: $('#txtQltyNo').val(),
        DebitNo: $('#txtDebitNo').val(),
        Qlty_date: $('#txtQltyDate').val(),//new Date($('#txtQltyDate').val()),
        QltyRemarks: $('#txtqltRemarks').val(),
        QCReport_No: $('#txtQcRptNo').val(),
        PurIndType: PurAgnInd,
        PurQDet: ItemList,
        PurQOrdDet: OSItemList

    };
    $("#btnAdd").attr("disabled", true);
    LoadingSymb();
    $.ajax({

        url: "/PurchaseQuality/Add",
        data: JSON.stringify(objConSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;


            if (result.Value == true) {

                //alert("Data Saved Sucessfully");
                AddUserEntryLog('Procurement', 'Purchase Quality', 'ADD', $("#txtQltyNo").val());
                if (OrdType == "G") {

                  //  window.location.href = "/GRNGeneralMain/GRNGeneralMainIndex";
                    //window.location.href = "/GRNMain/GRNMainIndex";
                    var msg = "Data Saved Sucessfully...";
                    var flg = 1;
                    var mod = 0;
                    var url = "/GRNMain/GRNMainIndex";
                    AlartMessage(msg, flg, mod, url);
                } else {
                    //window.location.href = "/GRNMain/GRNMainIndex";
                    var msg = "Data Saved Sucessfully...";
                    var flg = 1;
                    var mod = 0;
                    var url = "/GRNMain/GRNMainIndex";
                    AlartMessage(msg, flg, mod, url);
                    //if (PurItemType == "Y") {
                    //    window.location.href = "/GRNYarnQualityMain/GRNYarnQualityMainIndex";
                    //} else if (PurItemType == "A") {
                    //    window.location.href = "/GRNTrimsQualityMain/GRNTrimsQualityMainIndex";
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

function ClearQlty() {
    if (OrdType == "G") {

       // window.location.href = "/GRNGeneralMain/GRNGeneralMainIndex";
        window.location.href = "/GRNMain/GRNMainIndex";
    } else {
        //if (PurItemType == "Y") {
        //    window.location.href = "/GRNYarnQualityMain/GRNYarnQualityMainIndex";
        //} else if (PurItemType == "A") {
        //    window.location.href = "/GRNTrimsQualityMain/GRNTrimsQualityMainIndex";
        //} else {
        //    window.location.href = "/GRNMain/GRNMainIndex";
        //}
        window.location.href = "/GRNMain/GRNMainIndex";
    }

}

function QltyUpdate() {
    debugger;


    var res = validate();
    if (res == false) {
        return false;
    }


    if (OSItemList.length == 0) {
        //alert("Please Enter the Item Details..");
        var msg = "Please Enter the Item Details...";
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    //Total item weight
    var totalpqt = 0;
    var totalepqt = 0;
    for (var e = 0; e < ItemList.length; e++) {
        var pcs = ItemList[e].grnaccept;
        var epcs = ItemList[e].excess_qty;
        var deb = ItemList[e].grnreject;
        totalpqt = totalpqt + parseFloat(pcs) - parseFloat(deb);
       // totalpqt = totalpqt + parseFloat(pcs);
        totalepqt = totalepqt + parseFloat(epcs);
    }
    var TFWeight = (totalpqt.toFixed(1));

    var TEFWeight = (totalepqt.toFixed(1));
    //Total Ord weight
    var totalypqt = 0;
    var totalyepqt = 0;
    for (var e = 0; e < OSItemList.length; e++) {
        var ypcs = OSItemList[e].accept_qty;
        var eypcs = OSItemList[e].POExcess_Qty;
        totalypqt = totalypqt + parseFloat(ypcs);
        totalyepqt = totalyepqt + parseFloat(eypcs);
    }
    var TYWeight = (totalypqt.toFixed(1));
    var TEYWeight = (totalyepqt.toFixed(1));

    if ((parseFloat(TYWeight) ) != (parseFloat(TFWeight) )) {
        //alert("Please Check the Total Item Accpt Qty and Total Order Weight for all Order Splilt up..");
        var msg = "Please Check the Total Item Accpt Qty and Total Order Weight for all Order Splilt up...";
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }


    //if ((parseFloat(TYWeight) + parseFloat(TEYWeight)) != (parseFloat(TFWeight)+parseFloat(TEFWeight))) {
    //    alert("Please Check the Total Item Accpt Qty and Total Order Weight for all Order Splilt up..");
    //    return true;
    //}
    if (parseFloat(TEFWeight) != parseFloat(TEYWeight)) {
        //alert("Please Check the Total Item Excess Qty and Total Order Excess Weight for all Order Splilt up..");
        var msg = "Please Check the Total Item Excess Qty and Total Order Excess Weight for all Order Splilt up...";
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }


    var objConSubmit = {

        Grn_MasId: GrnId,
        Qlty_No: $('#txtQltyNo').val(),
        DebitNo: $('#txtDebitNo').val(),
        Qlty_date: $('#txtQltyDate').val(),//new Date($('#txtQltyDate').val()),
        QltyRemarks: $('#txtqltRemarks').val(),
        QCReport_No: $('#txtQcRptNo').val(),
        receipt_no: $('#txtGrnNo').val(),
        PurIndType: PurAgnInd,

        PurQDet: ItemList,
        PurQOrdDet: OSItemList

    };
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({

        url: "/PurchaseQuality/Update",
        data: JSON.stringify(objConSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;

            if (result.Value == true) {

                //alert("Data Updated Sucessfully");
                AddUserEntryLog('Procurement', 'Purchase Quality', 'UPDATE', $("#txtQltyNo").val());
                if (OrdType == "G") {

                    //window.location.href = "/GRNMain/GRNMainIndex";
                    var msg = "Data Updated Sucessfully...";
                    var flg = 1;
                    var mod = 0;
                    var url = "/GRNMain/GRNMainIndex";
                    AlartMessage(msg, flg, mod, url);

                } else {
                    //if (PurItemType == "Y") {
                    //    window.location.href = "/GRNYarnQualityMain/GRNYarnQualityMainIndex";
                    //} else if (PurItemType == "A") {
                    //    window.location.href = "/GRNTrimsQualityMain/GRNTrimsQualityMainIndex";
                    //} else {
                    //    window.location.href = "/GRNMain/GRNMainIndex";
                    //}
                    //window.location.href = "/GRNMain/GRNMainIndex";
                    var msg = "Data Updated Sucessfully...";
                    var flg = 1;
                    var mod = 0;
                    var url = "/GRNMain/GRNMainIndex";
                    AlartMessage(msg, flg, mod, url);
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
function QltyDelete() {
    debugger;


    var res = validate();
    if (res == false) {
        return false;
    }


    if (OSItemList.length == 0) {
        //alert("Please Enter the Item Details..");
        var msg = "Please Enter the Item Details...";
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    //Total item weight
    var totalpqt = 0;
    var totalepqt = 0;
    for (var e = 0; e < ItemList.length; e++) {
        var pcs = ItemList[e].grnaccept;
        var epcs = ItemList[e].excess_qty;
        totalpqt = totalpqt + parseFloat(pcs);
        totalepqt = totalepqt + parseFloat(epcs);
    }
    var TFWeight = (totalpqt.toFixed(1));

    var TEFWeight = (totalepqt.toFixed(1));
    //Total Ord weight
    var totalypqt = 0;
    var totalyepqt = 0;
    for (var e = 0; e < OSItemList.length; e++) {
        var ypcs = OSItemList[e].accept_qty;
        var eypcs = OSItemList[e].POExcess_Qty;
        totalypqt = totalypqt + parseFloat(ypcs);
        totalyepqt = totalyepqt + parseFloat(eypcs);
    }
    var TYWeight = (totalypqt.toFixed(1));
    var TEYWeight = (totalyepqt.toFixed(1));

    //if ((parseFloat(TYWeight) + parseFloat(TEYWeight)) != parseFloat(TFWeight)) {
    //    alert("Please Check the Total Item Accpt Qty and Total Order Weight for all Order Splilt up..");
    //    return true;
    //}
    //if (parseFloat(TEFWeight) != parseFloat(TEYWeight)) {
    //    alert("Please Check the Total Item Excess Qty and Total Order Excess Weight for all Order Splilt up..");
    //    return true;
    //}


    var objConSubmit = {

        Grn_MasId: GrnId,
        Qlty_No: $('#txtQltyNo').val(),
        DebitNo: $('#txtDebitNo').val(),
        Qlty_date: $('#txtQltyDate').val(),//new Date($('#txtQltyDate').val()),
        QltyRemarks: $('#txtqltRemarks').val(),
        QCReport_No: $('#txtQcRptNo').val(),
        receipt_no: $('#txtGrnNo').val(),
        PurIndType: PurAgnInd,

        PurQDet: ItemList,
        PurQOrdDet: OSItemList

    };

    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        LoadingSymb();
        $("#btnDelete").attr("disabled", true);
        $.ajax({

            url: "/PurchaseQuality/Delete",
            data: JSON.stringify(objConSubmit),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                debugger;

                if (result.Value == true) {

                    //alert("Data Deleted Sucessfully");
                    AddUserEntryLog('Procurement', 'Purchase Quality', 'DELETE', $("#txtQltyNo").val());
                    if (OrdType == "G") {

                        //window.location.href = "/GRNMain/GRNMainIndex";
                        var msg = "Data Deleted Sucessfully...";
                        var flg = 2;
                        var mod = 0;
                        var url = "/GRNMain/GRNMainIndex";
                        AlartMessage(msg, flg, mod, url);

                    } else {
                        //if (PurItemType == "Y") {
                        //    window.location.href = "/GRNYarnQualityMain/GRNYarnQualityMainIndex";
                        //} else if (PurItemType == "A") {
                        //    window.location.href = "/GRNTrimsQualityMain/GRNTrimsQualityMainIndex";
                        //} else {
                        //    window.location.href = "/GRNMain/GRNMainIndex";
                        //}
                        //window.location.href = "/GRNMain/GRNMainIndex";
                        var msg = "Data Deleted Sucessfully...";
                        var flg = 2;
                        var mod = 0;
                        var url = "/GRNMain/GRNMainIndex";
                        AlartMessage(msg, flg, mod, url);
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
}

function LoadItemRemarksDetails(Pid) {

    debugger;
    var typ = 'O';

    if (OrdType == 'G') {
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
            $('#txtItemRemarks').val(ord);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}