var ShipmentItemList = [];
var PackItemList = [];
var SepPackItemList = [];
var indexval = -1;
var rowindex = 0;
var PackItemListN = [];
var Mod = 0;
var OrderNo;
var StyleRowId;
var ItemId;
var Colorlistaddineditmode = []
var Solidlistaddineditmode = []
var PackItemListE = [];
var idinsertflg = 0;
var SumTotQty = 0;
var SumPQty = 0;
var GShipQty = 0;
var GSNo = 0;
var NPQty = 0;
var FQty = 0;
var QtyItemList = 0;
var totqty = 0;
var Itemrowindex = -1;
var shiprowindex = -1;
var sepshiprowindex = -1;
var qty = 0;
var type = "";
var totitemlist = [];
var itemlistadd = [];
var sepitemlistadd = [];
var result = [];
var sepresult = [];
var totquanlist = [];
var quanlistadd = [];
var sepquanlistadd = [];
var resquan = [];
var sepresquan = [];
var itemlistedit = [];
var quanlistedit = [];
var itmmode = "";
var slno = [];
var flag = 0;
var ssn = 0;
var listof = [];
var listofsep = [];
var quat = 0;
var Galp = 0;
var GBMasId = 0;
var allow = 0;
var companyid = 0;
var buyerid = 0;
var buy_ord_ship = 0;
var OType = 0;
var ShRowId = 0;
var ShNo = '';
var Esln = 0;
var ChPlanBom = 0;
var ChPlanProg = 0;
var Guserid = 0;
var itmmode = '';
var flg = 0;
var EnbTranDate = 0;
var EnbAssRate = 0;
var OrdApp = "N";
var shipeditflag = 0;
var Quan = 0;
var ShipRate = 0;
var SSNO = 0;
var GCon = 0;
var sepquan = [];
var sepitm = [];
var quan = [];
var itm = [];
var ShipNo = '';
var PlanLock = [];
var type = 'B';
var DispatchClosed = "N";

$(document).ready(function () {
    debugger;

    Guserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    EnbTranDate = $("#hdnETransDate").data('value');
    EnbAssRate = $("#hdnEAssDetRate").data('value');
    var qrStr = window.location.search;
    var spQrStr = qrStr.substring(1);
    var arrQrStr = new Array();
    var arr = spQrStr.split('?');


    for (var i = 0; i < arr.length; i++) {
        var queryvalue = arr[i].split('=');
    }

    StyleRowId = queryvalue[1];
    Mod = queryvalue[3];
    type = queryvalue[7];
    if (Mod == 0) {
        type = queryvalue[5];
    }

    if (queryvalue[5] == "Y") {
        Mode = queryvalue[3];
        OrdApp = "Y";
        $('#multiplestyle').prop('disabled', true);
        //$('#addship').prop('disabled', true);
    }
    if (EnbTranDate == "Y") {
        $("#txtEntryDate").prop("disabled", true);


    } else {
        $("#txtEntryDate").prop("disabled", false);

    }

    if (EnbAssRate == "Y") {
        $("#txtshiprate").prop("disabled", true);


    } else {
        $("#txtshiprate").prop("disabled", false);

    }
    LoadCompanyUnitDDL("#ddlprodunit,#ddlprocessunit");

    getbyID(StyleRowId);

    LoadMainDetails(StyleRowId);


    if (Mod == 0) {
        Listsump("M", 1, StyleRowId);
        Listsepsump("M", 1, StyleRowId);
    }
    if (Mod == 2) {
        EditDetShipPlanList(StyleRowId);
        var SSNo = 1;
        var ShipRowId = 0;
        //EditDetPackList(ShipRowId, StyleRowId, SSNo);
        //EditDetTotPackList(StyleRowId);


        //EditDetTotalPackList(StyleRowId)
        //EditDetTotSepPackList(StyleRowId)
    }







    //$("#txtshipQty").keyup(function () {
    //    debugger;
    //    alert("hi");
    //});


    //////////////////hide the ship table//////////////////
    if (Mod == 0) {
        $("#shipIdTot").hide();
        $("#CList").hide();
    }
    if (Mod == 1 || Mod == 2) {
        $("#shipIdTot").show();
        $("#CList").show();
    }
    //////////////////////////////////////////////////////


    $(document).on('click', '.btnadddest', function () {
        debugger;
        $('#txtCountryID').val("");
        $('#txtCnName').val("");
        $('#txtCnlookup').val("");
        $('#CnStatus').val("");

        $('#btnUpdate').hide();
        $('#btnAdd').show();
        $('#txtCountryID').css('border-color', 'lightgrey');
        $('#txtCnName').css('border-color', 'lightgrey');
        $('#txtCnlookup').css('border-color', 'lightgrey');
        $('#CnStatus').css('border-color', 'lightgrey');
        $("#myModal2").modal('show');
    });
    $(document).on('click', '.btnaddport', function () {
        debugger;

        $('#txtPortOfLoadingID').val("");
        $('#txtPortOfLoading1').val("");
        $('#txtPortCode').val("");
        $('#ddlCountry').empty();
        $('#PrtStatus').val("");


        $('#txtPortOfLoadingID').css('border-color', 'lightgrey');
        $('#txtPortOfLoading1').css('border-color', 'lightgrey');
        $('#txtPortCode').css('border-color', 'lightgrey');
        $('#ddlCountry').css('border-color', 'lightgrey');
        $('#PrtStatus').css('border-color', 'lightgrey');
        // $('#tbody').DataTable().destroy();

        LoadCountryDDL("#ddlCountry");
        $("#myModal3").modal('show');
    });
    $(document).on('keyup', '.txtshiprate', function (e) {
        debugger;
        var table = $('#tPKcsbody').DataTable();
        snum = table.row($(this).parents('tr')).data()["snumb"];
        rate = table.row($(this).parents('tr')).data()["Rate"];
        var val = $(this).val();
        ShipRate = val;
        SSNO = table.row($(this).parents('tr')).data()["SSNO"];
        if (sepitemlistadd.length > 0) {
            $.each(sepitemlistadd, function () {
                if (this.snumb == snum && this.SSNO == SSNO) {
                    this.Rate = val;
                }
            });
        }

        if (sepquanlistadd.length > 0) {
            $.each(sepquanlistadd, function () {
                if (this.snumb == snum && this.SSNO == SSNO) {
                    this.Rate = val;
                }
            });
        }

        if (sepitemlistadd.length == 0 && sepquanlistadd.length == 0) {
            //alert('Please fill atleast any one quantity...');
            var msg = 'Please fill atleast any one quantity...';
            var flg = 4;
            var mode = 1;
            AlartMessage(msg, flg, mode);
            return true;
        }

    });

    $("#txtShipQuantity").keyup(function () {
        debugger;

        var quantity = 0;
        var tmpqty = 0;

        var currentqty = $("#txtShipQuantity").val();
        var Qty = $('#txtQuantity').val();

        if (parseInt(currentqty) > parseInt(Qty)) {
            //alert("ShipQuantity should not exceed Order quantity...");
            var msg = 'ShipQuantity should not exceed Order quantity...';
            var flg = 4;
            var mode = 1;
            AlartMessage(msg, flg, mode);
            $('#txtShipQuantity').val(0);
            fnAllowCalc();
            return false;
        }
        var totalamnt = 0;
        for (var e = 0; e < ShipmentItemList.length; e++) {
            var amount = ShipmentItemList[e].Quantity;
            totalamnt = totalamnt + parseFloat(amount);
        }
        if (shipeditflag == 1) {
            totalamnt = totalamnt - Quan;
        }
        else if (parseInt(totalamnt) > 0) {
            tmpqty = parseInt(totalamnt) + parseInt(currentqty);
        }

        if ($('#txtQuantity').val().trim() == "") {
            quantity = 0;
        }
        else { quantity = $('#txtQuantity').val(); }

        if (quantity == 0) {
            //alert("Ship Quantity should be greater than zero...");
            var msg = 'Ship Quantity should be greater than zero...';
            var flg = 4;
            var mode = 1;
            AlartMessage(msg, flg, mode);
        }
        else if (parseInt(tmpqty) > parseInt(quantity)) {
            //alert("ShipQuantity should not exceed Order quantity...");
            var msg = 'ShipQuantity should not exceed Order quantity...';
            var flg = 4;
            var mode = 1;
            AlartMessage(msg, flg, mode);
            $('#txtShipQuantity').val("");
        }

        fnAllowCalc();
    });


    //$(document).on('keyup', '.calcqty', function () {
    //    debugger;
    //    var tablecs = $('#tPKcsbody').DataTable();


    //    var value = $(this).val();

    //    snum = tablecs.row($(this).parents('tr')).data()["snumb"];
    //    ssno = tablecs.row($(this).parents('tr')).data()["SSNO"];
    //    var sid = tablecs.row($(this).parents('tr')).data()["SizeId"];
    //    var cid = tablecs.row($(this).parents('tr')).data()["ColorId"];
    //    var comid = tablecs.row($(this).parents('tr')).data()["ComboId"];

    //    var table = $('#tPKbody').DataTable();
    //    var qtydata = table.rows().data();


    //    //var currentrow = SepPackItemList.slice(sepshiprowindex);
    //    //snum = currentrow[0].snumb;
    //    //ssno = currentrow[0].SSNO;
    //    //var sid = currentrow[0].SizeId;
    //    //var cid = currentrow[0].ColorId;
    //    //var comid = currentrow[0].ComboId;

    //    var filteredResult = $.grep(ShipmentItemList, function (element, index) {
    //        return element.SLNo == ssno;
    //    });

    //    allow = filteredResult[0].AllowancePer;

    //    $.each(SepPackItemList, function () {
    //        if (this.snumb == snum && this.SSNO == ssno) {
    //            this.Quantity = value;
    //            //this.AllowQty = Math.ceil(parseFloat((value * allow) / 100));
    //            //this.PQty = parseInt(this.Quantity) + parseInt(this.AllowQty);

    //        }
    //    })

    //    $.each(ShipmentItemList, function () {
    //        if (this.SLNo == ssno) {
    //            itmmode = this.ItemMode;
    //        }
    //    });
    //    //loadshconQtyTab(SepPackItemList);

    //    var septable = $('#tPKcsbody').DataTable();
    //    var sepdata = septable.rows().data();

    //    $('input[id=txtshipRTQty]').each(function (ig) {
    //        if (sepdata[ig].snumb == snum && sepdata[ig].SSNO == ssno) {
    //            var row = $(this).closest('tr');
    //            row.find('#txtshipRTQty').val(value);
    //        }
    //    });

    //    var totalamnt = 0;
    //    for (var e = 0; e < SepPackItemList.length; e++) {
    //        var amount = SepPackItemList[e].Quantity;
    //        totalamnt = totalamnt + parseFloat(amount);

    //    }
    //    $('#txttot').val(totalamnt);


    //});

    $(document).on('keyup', '.calcratio', function (e) {
        debugger;

        var table = $('#tPKcsbody').DataTable();
        snum = table.row($(this).parents('tr')).data()["snumb"];
        ssno = table.row($(this).parents('tr')).data()["SSNO"];
        var sid = table.row($(this).parents('tr')).data()["SizeId"];
        var cid = table.row($(this).parents('tr')).data()["ColorId"];
        var comboid = table.row($(this).parents('tr')).data()["ComboId"];

        var val = $(this).val();
        if ((!val.match(/^[\-\+]?[\d\,]*\.?[\d]*$/)) || val == "") {
            var septable = $('#tPKcsbody').DataTable();
            var sepdata = septable.rows().data();

            $('input[id=txtshipQty]').each(function (ig) {
                if (sepdata[ig].snumb == snum && sepdata[ig].SSNO == ssno) {
                    var row = $(this).closest('tr');
                    row.find('#txtshipQty').val(0);

                }
            });
            //val = 0;
            return true;
        }

        qty;
        if (Mod != 0 && qty == 0) {
            qty = ShipmentItemList[0].Quantity;
        }

        $.each(SepPackItemList, function () {
            if (this.snumb == snum && this.SSNO == ssno) {
                this.Ratio = val;

            }
        });

        $.each(PackItemList, function () {
            if (this.ComboId == comboid && this.SSNO == ssno && this.SizeId == sid) {
                this.Ratio = val;
            }
        });
        var totalamnt = 0;
        for (var e = 0; e < SepPackItemList.length; e++) {

            var amount = SepPackItemList[e].Ratio;
            totalamnt = totalamnt + parseFloat(amount);

        }


        var tot = totalamnt;// $('#txttot').val();

        for (var g = 0; g < SepPackItemList.length; g++) {

            var q = SepPackItemList[g].Ratio;
            if (q > 0) {
                var quan = (((qty / tot) * q)).toFixed(0);
            }
            else {
                quan = 0;
            }
            SepPackItemList[g].Quantity = quan;


        }
        //loadshconRatTab(SepPackItemList);


        var septable = $('#tPKcsbody').DataTable();
        var sepdata = septable.rows().data();


        $('input[id=txtshipQty]').each(function (ig) {
            // if (sepdata[ig].snumb == snum && sepdata[ig].SSNO == ssno) {
            var row = $(this).closest('tr');
            var rat = row.find('#txtshipQty').val();
            var res = ((qty / tot) * rat).toFixed(0);
            row.find('#txtshipRTQty').val(res);
            row.find('#txtshipQty').val(rat);

            // }
        });

        var totalamnt = 0;
        for (var e = 0; e < SepPackItemList.length; e++) {
            var amount = SepPackItemList[e].Quantity;
            totalamnt = totalamnt + parseFloat(amount);

        }
        $('#txttot').val(totalamnt);

        //var chkshipqty = $('#txtShipQuantity').val();
        var ssqty = 0;
        for (var c = 0; c < ShipmentItemList.length; c++) {
            if (ShipmentItemList[c].SLNo == ssno) {
                var ssqty = ShipmentItemList[c].Quantity;
            }
        }
        var chkasstqty = $('#txttot').val();


        ///////////adjust the top row shipment quantity in ratio wise calculation
        var adjqty = parseFloat(chkasstqty) - parseFloat(ssqty);

        var rows = $("#tPKcsbody").dataTable().fnGetNodes();
        var dtTable = $('#tPKcsbody').DataTable();

        var sn = dtTable.cells({ row: 0, column: 1 }).data()[0];

        for (var g = 0; g < SepPackItemList.length; g++) {

            var Top1 = SepPackItemList[g].snumb;

            if (Top1 == sn) {
                SepPackItemList[g].Quantity = SepPackItemList[g].Quantity - adjqty;
                var top1adjqty = SepPackItemList[g].Quantity;


                var adseptable = $('#tPKcsbody').DataTable();
                var adsepdata = septable.rows().data();


                $('input[id=txtshipRTQty]').each(function (ig) {
                    if (adsepdata[ig].snumb == Top1) {
                        var row = $(this).closest('tr');
                        row.find('#txtshipRTQty').val(top1adjqty);


                    }
                });

            }
        }

        ////////////////////////////////////////////////////////       


        for (var h = 0; h < SepPackItemList.length; h++) {
            //if (SepPackItemList[h].Ratio > 0) {
            var coid = SepPackItemList[h].ComboId;
            var sss = SepPackItemList[h].SSNO;
            var sizeid = SepPackItemList[h].SizeId;
            var assqty = SepPackItemList[h].Quantity;
            for (var g = 0; g < PackItemList.length; g++) {
                var spno = PackItemList[g].snumb;

                if (PackItemList[g].ComboId == coid && PackItemList[g].SizeId == sizeid) {
                    var q = PackItemList[g].Ratio;
                    var Ir = PackItemList[g].ItemRatio;
                    if (q > 0) {

                        //var quan = Math.round((qty / tot) * q * Ir);
                        var quan = assqty * Ir;
                    } else {
                        var quan = 0;
                    }
                    PackItemList[g].Quantity = quan;

                    var percentagecal = PackItemList[g].Quantity;
                    var percenval = Math.round((percentagecal * allow / 100));
                    var allowval = percenval;
                    PackItemList[g].AllowQty = Math.round(percenval);
                    PackItemList[g].PQty = parseInt(percentagecal) + parseInt(PackItemList[g].AllowQty);

                }

                var wtable = $('#tPKbody').DataTable();
                var wdata = wtable.rows().data();

                $('input[id=txtshipRatQty]').each(function (ig) {
                    if (wdata[ig].ComboId == coid && wdata[ig].SizeId == sizeid && wdata[ig].snumb == spno) {
                        var row = $(this).closest('tr');
                        row.find('#txtshipRatQty').val(quan);
                        //var res = Math.ceil(parseFloat((percentagecal * allow) / 100));
                        var res = Math.round((percentagecal * allow / 100));
                        row.find('#txtallRatQty').val(res);
                        var tr = parseInt(quan) + parseInt(res);
                        row.find('#txtshipPrdQty').val(tr);

                    }
                });
            }

        }


        var totalPamnt = 0;
        for (var e = 0; e < PackItemList.length; e++) {
            var Pamount = PackItemList[e].PQty;
            totalPamnt = totalPamnt + parseFloat(Pamount);

        }

        $('#txtPtot').val(totalPamnt);

        var totalqty = 0;
        for (var e = 0; e < PackItemList.length; e++) {
            var qamount = PackItemList[e].Quantity;
            totalqty = totalqty + parseFloat(qamount);
        }

        $('#txttot').val(totalqty);


        $('#txttotrt').val(qty);
        var totalpqty = 0;
        for (var e = 0; e < PackItemList.length; e++) {
            var amount = PackItemList[e].PQty;
            totalpqty = totalpqty + parseFloat(amount);
        }

        for (var c = 0; c < ShipmentItemList.length; c++) {
            if (ShipmentItemList[c].SLNo == sss) {
                ShipmentItemList[c].ProductionQty = totalpqty;
            }
        }

        //loadShipAddTable(ShipmentItemList);
        totitemlist = PackItemList;
        var filtered = [];
        filtered = totitemlist;

        var li = [];
        filtered = $.grep(filtered, function (v) {
            return v.snumb === snum && v.SSNO === ssno && v.SizeId === sid && v.ColorId === cid && v.ComboId === comboid;
        });

        if (Mod == 0) {
            itemlistadd = [];
            $.each(totitemlist, function (i, e) {
                var matchingItems = $.grep(result, function (v) {
                    return v.snumb === e.snumb && v.SSNO === e.SSNO && v.SizeId === e.SizeId && v.ColorId === e.ColorId && v.ComboId === e.ComboId;
                });
                if (matchingItems.length === 0) {
                    result.push(e);
                    //itemlistadd.push(result);
                }
            });

            sepitemlistadd = [];
            $.each(SepPackItemList, function (i, e) {
                var matchingItems = $.grep(sepresult, function (v) {
                    return v.snumb === e.snumb && v.SSNO === e.SSNO && v.SizeId === e.SizeId && v.ColorId === e.ColorId && v.ComboId === e.ComboId;
                });
                if (matchingItems.length === 0) {
                    sepresult.push(e);
                }
            });

        }
        else if (Mod == 1) {
            var solidflag = 0;
            var csizeaddflg = 0;

            if (type == "Solid") {
                if (quanlistadd.length > 0) {
                    for (var q = 0; q < quanlistadd.length; q++) {
                        if (quanlistadd[q].SSNO == ssno && quanlistadd[q].ComboId == comboid && quanlistadd[q].SizeId == sid) {
                            //itemlistadd.push(PackItemList[d]);
                            csizeaddflg = 1;
                        }
                    }
                }

                if (csizeaddflg == 0) {
                    for (var d = 0; d < PackItemList.length; d++) {
                        quanlistadd.push(PackItemList[d]);
                    }

                    for (var t = 0; t < SepPackItemList.length; t++) {
                        sepquanlistadd.push(SepPackItemList[t]);
                    }
                }
                else {
                    for (var q = 0; q < quanlistadd.length; q++) {
                        if (quanlistadd[q].SSNO == ssno && quanlistadd[q].ComboId == comboid && quanlistadd[q].SizeId == sid) {
                            quanlistadd[q].Ratio = val;
                        }
                    }

                    for (var a = 0; a < sepquanlistadd.length; a++) {
                        if (sepquanlistadd[a].SSNO == ssno && sepquanlistadd[a].ComboId == comboid && sepquanlistadd[a].SizeId == sid) {
                            sepquanlistadd[a].Ratio = val;
                        }
                    }
                }
            }
            else if (type == "Color/Size") {
                var colorsizeflag = 0;
                var csizeaddflg = 0;

                if (itemlistadd.length > 0) {
                    for (var q = 0; q < itemlistadd.length; q++) {
                        if (itemlistadd[q].SSNO == ssno && itemlistadd[q].ComboId == comboid && itemlistadd[q].SizeId == sid) {
                            //itemlistadd.push(PackItemList[d]);
                            csizeaddflg = 1;
                        }
                    }
                }

                if (csizeaddflg == 0) {
                    for (var d = 0; d < PackItemList.length; d++) {
                        itemlistadd.push(PackItemList[d]);
                    }
                    for (var t = 0; t < SepPackItemList.length; t++) {
                        sepitemlistadd.push(SepPackItemList[t]);
                    }
                }
                else {
                    for (var q = 0; q < itemlistadd.length; q++) {
                        if (itemlistadd[q].SSNO == ssno && itemlistadd[q].ComboId == comboid && itemlistadd[q].SizeId == sid) {
                            itemlistadd[q].Ratio = val;
                        }
                    }
                    for (var a = 0; a < sepitemlistadd.length; a++) {
                        if (sepitemlistadd[a].SSNO == ssno && sepitemlistadd[a].ComboId == comboid && sepitemlistadd[a].SizeId == sid) {
                            sepitemlistadd[a].Ratio = val;
                        }
                    }
                }
            }
        }


        for (var x = 0; x < result.length; x++) {
            itemlistadd.push(result[x]);
        }

        //loadEshconTable(result);

        for (var u = 0; u < sepresult.length; u++) {
            sepitemlistadd.push(sepresult[u]);
        }

        var totalprqy = 0;
        for (var e = 0; e < ShipmentItemList.length; e++) {
            var prqy = ShipmentItemList[e].ProductionQty;
            totalprqy = totalprqy + parseFloat(prqy);

        }
        $('#txttotProdship').val(totalprqy.toFixed(0));


        //var rows = $("#tPKcsbody").dataTable().fnGetNodes();
        //var dtTable = $('#tPKcsbody').DataTable();
        //for (var i = 0; i < rows.length; i++) {
        //    var sn = dtTable.cells({ row: i, column: 1 }).data()[0];
        //    $('input[id=txtshipQty]').each(function () {
        //        if (sn == snum && $(this).val() == val) {
        //            var row = $(this).closest('tr');
        //            var num = row.find('#txtshipQty').val();
        //            row.find('#txtshipQty').focus().val('').val(num);
        //            return true;
        //        }
        //    });
        //}
    });
    $(document).on('input', '.calcqty', function () {
        debugger;
        // $(".loader").fadeIn("slow");
        var tablecs = $('#tPKcsbody').DataTable();

        var value = $(this).val();

        snum = tablecs.row($(this).parents('tr')).data()["snumb"];
        ssno = tablecs.row($(this).parents('tr')).data()["SSNO"];
        var sid = tablecs.row($(this).parents('tr')).data()["SizeId"];
        var cid = tablecs.row($(this).parents('tr')).data()["ColorId"];
        var comid = tablecs.row($(this).parents('tr')).data()["ComboId"];


        if ((!value.match(/^[\-\+]?[\d\,]*\.?[\d]*$/)) || value == "") {
            var septable = $('#tPKcsbody').DataTable();
            var sepdata = septable.rows().data();

            $('input[id=txtshipRTQty]').each(function (ig) {
                if (sepdata[ig].snumb == snum && sepdata[ig].SSNO == ssno) {
                    var row = $(this).closest('tr');
                    row.find('#txtshipRTQty').val(0);

                }
            });
            //val = 0;
            return true;
        }
        var table = $('#tPKbody').DataTable();
        var qtydata = table.rows().data();

        //var currentrow = SepPackItemList.slice(sepshiprowindex);
        //snum = currentrow[0].snumb;
        //ssno = currentrow[0].SSNO;
        //var sid = currentrow[0].SizeId;
        //var cid = currentrow[0].ColorId;
        //var comid = currentrow[0].ComboId;

        var filteredResult = $.grep(ShipmentItemList, function (element, index) {
            return element.SLNo == ssno;
        });

        allow = filteredResult[0].AllowancePer;

        $.each(SepPackItemList, function () {
            if (this.snumb == snum && this.SSNO == ssno) {
                this.Quantity = value;
                //this.AllowQty = Math.ceil(parseFloat((value * allow) / 100));
                //this.PQty = parseInt(this.Quantity) + parseInt(this.AllowQty);
            }
        })

        //loadshconQtyTab(SepPackItemList);

        var septable = $('#tPKcsbody').DataTable();
        var sepdata = septable.rows().data();

        $('input[id=txtshipRTQty]').each(function (ig) {
            if (sepdata[ig].snumb == snum && sepdata[ig].SSNO == ssno) {
                var row = $(this).closest('tr');
                row.find('#txtshipRTQty').val(value);
            }
        });

        var totalamnt = 0;
        for (var e = 0; e < SepPackItemList.length; e++) {
            var amount = SepPackItemList[e].Quantity;
            totalamnt = totalamnt + parseFloat(amount);

        }
        $('#txttot').val(totalamnt);



        //var valq = value * GCon;
        for (var e = 0; e < PackItemList.length; e++) {
            var ssn = PackItemList[e].snumb;
            var imr = PackItemList[e].ItemRatio;
            $.each(PackItemList, function () {
                if (this.ComboId == comid && this.snumb == ssn && this.SizeId == sid) {
                    this.Quantity = value * imr;
                    //this.AllowQty = Math.ceil(parseInt((value * allow) / 100));             
                    //this.PQty = parseInt(this.Quantity) + parseInt(this.AllowQty) * imr;

                    var te1 = (((value * imr) * allow) / 100);

                    if (te1 <= 0.5) {
                        var res = 0;
                    } else if (te1 < 1) {
                        var res = Math.ceil(parseFloat(((value * imr) * allow) / 100));
                    }
                    else {
                        var res = Math.round(parseFloat(((value * imr) * allow) / 100));
                    }
                    this.AllowQty = res;
                    var tr = parseInt(value * imr) + parseInt(res);
                    this.PQty = tr;

                }
            });

            var wstable = $('#tPKbody').DataTable();
            var wsdata = wstable.rows().data();

            $('input[id=txtshipQty]').each(function (ig) {
                if (wsdata[ig].ComboId == comid && wsdata[ig].SizeId == sid && wsdata[ig].snumb == ssn) {
                    var row = $(this).closest('tr');

                    row.find('#txtshipQty').val(value * imr);
                    //var res = Math.ceil(parseFloat(((value * imr) * allow) / 100));
                    //var res = Math.ceil(parseInt(((value * imr) * allow) / 100));

                    var te1 = (((value * imr) * allow) / 100);

                    if (te1 <= 0.5) {
                        var res = 0;
                    } else if (te1 < 1) {
                        var res = Math.ceil(parseFloat(((value * imr) * allow) / 100));
                    }
                    else {
                        var res = Math.round(parseFloat(((value * imr) * allow) / 100));
                    }

                    row.find('#txtallQty').val(res);
                    var tr = parseInt(value * imr) + parseInt(res);
                    row.find('#txtqtyPrdQty').val(tr);


                }
            });

        }

        //var wtable = $('#tPKbody').DataTable();
        //var wdata = wtable.rows().data();

        //$('input[id=txtshipQty]').each(function (ig) {
        //    if (wdata[ig].ComboId == comid && wdata[ig].SSNO == ssno && wdata[ig].SizeId == sid) {
        //        var row = $(this).closest('tr');
        //        row.find('#txtshipQty').val(value);
        //        var res = Math.ceil(parseFloat((value * allow) / 100));
        //        row.find('#txtallQty').val(res);
        //        var tr = parseInt(value) + parseInt(res);
        //        row.find('#txtqtyPrdQty').val(tr);
        //    }
        //});






        var totalamnt = 0;
        for (var e = 0; e < PackItemList.length; e++) {
            var amount = PackItemList[e].Quantity;
            totalamnt = totalamnt + parseFloat(amount);

        }
        $('#txttot').val(totalamnt);

        var totalPamnt = 0;
        for (var e = 0; e < PackItemList.length; e++) {
            var Pamount = PackItemList[e].PQty;
            totalPamnt = totalPamnt + parseFloat(Pamount);

        }
        $('#txtPtot').val(totalPamnt);
        qty;
        var totalamnt = 0;
        for (var e = 0; e < PackItemList.length; e++) {
            var amount = PackItemList[e].Quantity;
            totalamnt = totalamnt + parseFloat(amount);

        }

        $('#txttot').val(totalamnt);


        var totalamntsp = 0;
        for (var t = 0; t < SepPackItemList.length; t++) {
            var amount = SepPackItemList[t].Quantity;
            totalamntsp = totalamntsp + parseFloat(amount);

        }

        $('#txttotrt').val(totalamntsp);


        var totalpqty = 0;
        for (var t = 0; t < PackItemList.length; t++) {
            var amount = PackItemList[t].PQty;
            totalpqty = totalpqty + parseFloat(amount);
        }

        for (var c = 0; c < ShipmentItemList.length; c++) {
            if (ShipmentItemList[c].SLNo == ssno) {
                ShipmentItemList[c].ProductionQty = totalpqty;
            }
        }

        //loadShipAddTable(ShipmentItemList);
        var tot = 0;
        tot = $('#txttot').val();


        if (qty != 0) {
            if (parseInt(tot) > qty) {

            }

            else {

                if (Mod == 0) {
                    totquanlist = PackItemList;
                    var filtered = [];
                    filtered = totquanlist;

                    var li = [];
                    filtered = $.grep(filtered, function (v) {

                        return v.snumb === snum && v.SSNO === ssno;


                    });

                    quanlistadd = [];
                    $.each(totquanlist, function (i, e) {
                        var matchingItems = $.grep(resquan, function (v) {
                            return v.snumb === e.snumb && v.SSNO === e.SSNO && v.ComboId == e.ComboId;
                        });
                        if (matchingItems.length === 0) {
                            resquan.push(e);

                        }
                    });
                    for (var x = 0; x < resquan.length; x++) {
                        quanlistadd.push(resquan[x]);
                    }
                    loadEshconTable(resquan);
                                                            
                    sepquanlistadd = [];
                    $.each(SepPackItemList, function (i, e) {
                        var matchingItems = $.grep(sepresquan, function (v) {
                            return v.snumb === e.snumb && v.SSNO === e.SSNO && v.ComboId == e.ComboId;
                        });
                        if (matchingItems.length === 0) {
                            sepresquan.push(e);

                        }
                    });
                    for (var x = 0; x < sepresquan.length; x++) {
                        sepquanlistadd.push(sepresquan[x]);
                    }


                }
                else {
                    var solidflag = 0;
                    var csizeaddflg = 0;
                    if (type == "Solid") {
                        if (quanlistadd.length > 0) {
                            for (var q = 0; q < quanlistadd.length; q++) {
                                if (quanlistadd[q].SSNO == ssno && quanlistadd[q].ComboId == comid && quanlistadd[q].SizeId == sid) {

                                    csizeaddflg = 1;
                                }
                            }
                        }

                        if (csizeaddflg == 0) {
                            for (var d = 0; d < PackItemList.length; d++) {
                                quanlistadd.push(PackItemList[d]);
                            }

                            for (var d = 0; d < SepPackItemList.length; d++) {
                                sepquanlistadd.push(SepPackItemList[d]);
                            }
                        }
                        else {
                            for (var q = 0; q < quanlistadd.length; q++) {
                                if (quanlistadd[q].SSNO == ssno && quanlistadd[q].ComboId == comid && quanlistadd[q].SizeId == sid) {
                                    quanlistadd[q].Ratio = value;
                                }
                            }

                            for (var q = 0; q < sepquanlistadd.length; q++) {
                                if (sepquanlistadd[q].SSNO == ssno && sepquanlistadd[q].ComboId == comid && sepquanlistadd[q].SizeId == sid) {
                                    sepquanlistadd[q].Ratio = value;
                                }
                            }
                        }


                    }
                    else if (type == "Color/Size") {
                        var colorsizeflag = 0;
                        var csizeaddflg = 0;


                        if (itemlistadd.length > 0) {
                            for (var q = 0; q < itemlistadd.length; q++) {
                                if (itemlistadd[q].SSNO == ssno && itemlistadd[q].ComboId == comid && itemlistadd[q].SizeId == sid) {

                                    csizeaddflg = 1;
                                }
                            }
                        }

                        if (csizeaddflg == 0) {
                            for (var d = 0; d < PackItemList.length; d++) {
                                itemlistadd.push(PackItemList[d]);
                            }

                            for (var d = 0; d < SepPackItemList.length; d++) {
                                sepitemlistadd.push(SepPackItemList[d]);
                            }
                        }
                        else {
                            for (var q = 0; q < itemlistadd.length; q++) {
                                if (itemlistadd[q].SSNO == ssno && itemlistadd[q].ComboId == comid && itemlistadd[q].SizeId == sid) {
                                    itemlistadd[q].Ratio = value;
                                }
                            }

                            for (var q = 0; q < sepitemlistadd.length; q++) {
                                if (sepitemlistadd[q].SSNO == ssno && sepitemlistadd[q].ComboId == comid && sepitemlistadd[q].SizeId == sid) {
                                    sepitemlistadd[q].Ratio = value;
                                }
                            }
                        }


                    }
                }
            }
        }

        var totalprqy = 0;
        for (var e = 0; e < ShipmentItemList.length; e++) {
            var prqy = ShipmentItemList[e].ProductionQty;
            totalprqy = totalprqy + parseFloat(prqy);

        }
        $('#txttotProdship').val(totalprqy.toFixed(0));
        //$(".loader").fadeOut("slow");

        //var rows = $("#tPKcsbody").dataTable().fnGetNodes();
        //var dtTable = $('#tPKcsbody').DataTable();
        //for (var i = 0; i < rows.length; i++) {
        //    var sn = dtTable.cells({ row: i, column: 1 }).data()[0];
        //    $('input[id=txtshipRTQty]').each(function () {
        //        if (sn == snum && $(this).val() == value) {
        //            var row = $(this).closest('tr');
        //            var num = row.find('#txtshipRTQty').val();
        //            row.find('#txtshipRTQty').focus().val('').val(num);
        //            return true;
        //        }
        //    });
        //}

    });
    $("#txtallowance").keyup(function () {
        debugger;
        fnAllowCalc();
        //var qty = ($('#txtShipQuantity').val().trim() == "" ? 0 : $('#txtShipQuantity').val());
        //var allo = ($('#txtallowance').val().trim() == "" ? 0 : $('#txtallowance').val());

        //var prodqty = parseFloat((qty * allo) / 100);
        //var prodqty = Math.ceil(parseInt(prodqty) + parseInt(qty));
        //$('#txtheadprodqty').val(prodqty);
    });

    //component details
    $('#btnShipAdd').click(function () {
        debugger;
        allow = 0;
        qty = 0;

        //////////////////hide the ship table//////////////////
        if (Mod == 0) {
            $("#shipIdTot").show();
            $("#CList").show();
        }
        var leng = 0;

        var isAllValid = true;

        if (totqty == 0) {
            totqty = $("#txtShipQuantity").val();
        }
        if (Mod == 0) {
            $('#txtShipNo').val("");
        }
        //GenerateShipNo();

        debugger;
        if ($('#ddlDest').val() == "0") {
            isAllValid = false;
            //$('#ddlDest').css('border-color', 'Red');
            $('#ddlDest').siblings(".select2-container").css('border', '1px solid red');
            //alert('Select Country...!')
            var msg = 'Select Country...';
            var flg = 4;
            var mode = 1;
            AlartMessage(msg, flg, mode);
            return true;

        }
        else {
            //$('#ddlDest').css('border-color', 'lightgrey');
            $('#ddlDest').siblings(".select2-container").css('border', 'lightgrey');
        }

        if ($('#ddlPort').val() == "0") {
            isAllValid = false;
            //$('#ddlPort').css('border-color', 'Red');
            $('#ddlPort').siblings(".select2-container").css('border', '1px solid red');

        }
        else {
            // $('#ddlPort').css('border-color', 'lightgrey');
            $('#ddlPort').siblings(".select2-container").css('border', 'lightgrey');
        }
        if ($('#ddlUom').val() == "0") {
            isAllValid = false;
            $('#ddlUom').css('border-color', 'Red');
        }
        else {
            $('#ddlUom').css('border-color', 'lightgrey');
        }
        if ($('#ddlPckType').val() == "0") {
            isAllValid = false;
            //$('#ddlPckType').css('border-color', 'Red');
            $('#ddlPckType').siblings(".select2-container").css('border', '1px solid red');

        }
        else {
            $('#ddlPckType').css('border-color', 'lightgrey');
        }

        if ($('#txtdeldate').val() == "") {
            isAllValid = false;
            $('#txtdeldate').css('border-color', 'Red');
        }
        else {
            $('#txtdeldate').css('border-color', 'lightgrey');
        }
        var SQty = $("#txtShipQuantity").val();
        if (SQty == 0) {
            isAllValid = false;
            $('#txtShipQuantity').css('border-color', 'Red');
        }
        else {
            $('#txtShipQuantity').css('border-color', 'lightgrey');
        }

        var dt = $('#txtShipDate').val();

        var aDate = moment(dt, 'DD/MM/YYYY', true);
        var isAllValid = aDate.isValid();
        if (!aDate.isValid()) {
            //alert('Please Check Date format "DD/MM/YYYY"...');
            var msg = 'Please Check Date format "DD/MM/YYYY"...';
            var flg = 4;
            var mode = 1;
            AlartMessage(msg, flg, mode);
            $('#txtShipDate').css('border-color', 'Red');
            return true;
        } else {
            $('#txtShipDate').css('border-color', 'lightgrey');
        }

        var dt = $('#txtdeldate').val();

        var aDate = moment(dt, 'DD/MM/YYYY', true);
        var isAllValid = aDate.isValid();
        if (!aDate.isValid()) {
            //alert('Please Check Date format "DD/MM/YYYY"...');
            var msg = 'Please Check Date format "DD/MM/YYYY"...';
            var flg = 4;
            var mode = 1;
            AlartMessage(msg, flg, mode);
            $('#txtdeldate').css('border-color', 'Red');
            return true;
        }
        else {
            $('#txtdeldate').css('border-color', 'lightgrey');
        }

        var shpdate = $('#txtShipDate').val();
        var deldate = $('#txtdeldate').val();
        if (deldate > shpdate) {
            //alert('Delivery date should not exceed than Shipment Date...');
            var msg = 'Delivery date should not exceed than Shipment Date...';
            var flg = 4;
            var mode = 1;
            AlartMessage(msg, flg, mode);
            return true;
        }


        if (ShipmentItemList.length == 0) {
            leng = 1;
        }
        else {
            leng = ShipmentItemList.length + 1;
        }

        GenerateShipNo();

        if (isAllValid) {
            debugger;
            var shipItemObj = {
                ShipRowId: 0,
                Buy_Ord_Ship: buy_ord_ship, //$('#txtShipNo').val(),
                Order_No: $('#txtOrderNo').val(),
                //Buy_Ord_MasId: 87,
                StyleId: $('#txtHStyleID').val(),
                StyleRowid: StyleRowId,
                Lotno: $('#txtAssort').val(),
                AllowancePer: $('#txtallowance').val(),
                ProductionQty: $('#txtheadprodqty').val(),
                DelDate: $('#txtdeldate').val(),//new Date($('#txtdeldate').val()), 
                Dest: $("#ddlDest option:selected").text(),
                Dest_Code: $('#ddlDest').val(),
                PortOfLoading: $("#ddlPort option:selected").text(),
                PortOfLoadingId: $('#ddlPort').val(),
                ItemModeType: $("#ddlPckType option:selected").text(),
                ItemMode: $('#ddlPckType').val(),
                UOM: $('#txtHGUom').val(),
                UomID: $('#txtHGUomID').val(),
                Ship_Date: $('#txtShipDate').val(),//new Date($('#txtShipDate').val())
                Quantity: $('#txtShipQuantity').val(),
                SLNo: leng,
                Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
            };

            ShipmentItemList.push(shipItemObj);


            if (SumTotQty == 0) {
                SumTotQty = shipItemObj.Quantity
            } else {
                SumTotQty = parseInt(SumTotQty) + parseInt(shipItemObj.Quantity)
            };

            var totalqy = 0;
            for (var e = 0; e < ShipmentItemList.length; e++) {
                var qy = ShipmentItemList[e].Quantity;
                totalqy = totalqy + parseFloat(qy);

            }
            $('#txttotrt').val(0);
            var d = $('#txtQuantity').val();
            //if (totalqy > d) {
            //    alert('Quantity should not exceed actual quantity...');
            //}
            //else {
            $('#txttotship').val(totalqy.toFixed(0));

            var totalprqy = 0;
            for (var e = 0; e < ShipmentItemList.length; e++) {
                var prqy = ShipmentItemList[e].ProductionQty;
                totalprqy = totalprqy + parseFloat(prqy);

            }


            $('#txttotProdship').val(totalprqy.toFixed(0));
            // }
            //  alert(SumTotQty);
            loadShipAddTable(ShipmentItemList);
            loadShipSaveTable(ShipmentItemList);

            var sn = shipItemObj.SLNo;
            allow = $('#txtallowance').val();
            qty = $('#txtShipQuantity').val();

            if (Mod == 0 || Mod == 1) {
                ClearPack();
                if (shipItemObj.ItemModeType == "Color/Size") {
                    type = shipItemObj.ItemModeType;
                    Listsump("CS", sn, StyleRowId);
                    Listsepsump("CS", sn, StyleRowId);

                }

                else if (shipItemObj.ItemModeType == "Solid") {
                    type = shipItemObj.ItemModeType;
                    Listsump("M", sn, StyleRowId);
                    Listsepsump("M", sn, StyleRowId);
                }
            }
            fnClearShipControls();
            ShRowId = 0;
            ShNo = "";
        }
    });

    $(document).on('click', '.btnshipedit', function () {
        debugger;
        Mode = 1;

        rowindex = $(this).closest('tr').index();

        var currentro12 = ShipmentItemList.slice(rowindex);

        $('#ddlDest').val(currentro12[0]['Dest_Code']).trigger('change');
        $('#ddlPort').val(currentro12[0]['PortOfLoadingId']).trigger('change');
        $('#ddlUom').val(currentro12[0]['UOM']);
        $('#ddlPckType').val(currentro12[0]['ItemMode']).trigger('change');
        $('#txtShipQuantity').val(currentro12[0]['Quantity']);
        $('#txtShipDate').val(currentro12[0]['Ship_Date']);
        $('#txtdeldate').val(currentro12[0]['DelDate']);
        //$('#txtShipDate').val(moment(currentro12[0]["Ship_Date"]).format('DD/MM/YYYY'));
        //$('#txtdeldate').val(moment(currentro12[0]["DelDate"]).format('DD/MM/YYYY'));
        $('#txtAssort').val(currentro12[0]['Lotno']);
        $('#txtallowance').val(currentro12[0]['AllowancePer']);
        $('#txtheadprodqty').val(currentro12[0]['ProductionQty']);

        $('#btnShipAdd').hide();
        $('#btnShipUpdate').show();
        itmmode = currentro12[0]['ItemMode'];
        type = currentro12[0]['ItemModeType'];
        quat = currentro12[0]['Quantity'];
        Galp = currentro12[0]['AllowancePer'];
        shipeditflag = 1;
    });

    $('#btnShipUpdate').click(function () {
        debugger;

        var dt = $('#txtShipDate').val();

        var aDate = moment(dt, 'DD/MM/YYYY', true);
        var isAllValid = aDate.isValid();
        if (!aDate.isValid()) {
            //alert('Please Check Date format "DD/MM/YYYY"...');
            var msg = 'Please Check Date format "DD/MM/YYYY"...';
            var flg = 4;
            var mode = 1;
            AlartMessage(msg, flg, mode);
            $('#txtShipDate').css('border-color', 'Red');
            return true;
        } else {
            $('#txtShipDate').css('border-color', 'lightgrey');
        }


        var dt = $('#txtdeldate').val();

        var aDate = moment(dt, 'DD/MM/YYYY', true);
        var isAllValid = aDate.isValid();
        if (!aDate.isValid()) {
            //alert('Please Check Date format "DD/MM/YYYY"...');
            var msg = 'Please Check Date format "DD/MM/YYYY"...';
            var flg = 4;
            var mode = 1;
            AlartMessage(msg, flg, mode);
            $('#txtdeldate').css('border-color', 'Red');
            return true;
        } else {
            $('#txtdeldate').css('border-color', 'lightgrey');
        }

        var currentrowsel = ShipmentItemList.slice(rowindex);

        currentrowsel[0]['Dest_Code'] = $("#ddlDest").val();
        currentrowsel[0]['Dest'] = $("#ddlDest option:selected").text();
        currentrowsel[0]['PortOfLoadingId'] = $("#ddlPort").val();
        currentrowsel[0]['PortOfLoading'] = $("#ddlPort option:selected").text();
        currentrowsel[0]['UomID'] = $("#txtHGUomID").val();
        currentrowsel[0]['UOM'] = $("#ddlUom").val();
        currentrowsel[0]['ItemMode'] = $("#ddlPckType").val();
        currentrowsel[0]['ItemModeType'] = $("#ddlPckType option:selected").text();
        currentrowsel[0]['Quantity'] = $("#txtShipQuantity").val();
        currentrowsel[0]['Ship_Date'] = $("#txtShipDate").val();//new Date($('#txtShipDate').val()),
        currentrowsel[0]['Lotno'] = $("#txtAssort").val();
        currentrowsel[0]['DelDate'] = $("#txtdeldate").val();//new Date($("#txtdeldate").val()),
        currentrowsel[0]['AllowancePer'] = $("#txtallowance").val(),
        currentrowsel[0]['ProductionQty'] = $("#txtheadprodqty").val(),
        shipeditflag = 0;
        ShipmentItemList[rowindex] = currentrowsel[0];
        var sl = currentrowsel[0]['SLNo'];
        var sty = currentrowsel[0]['StyleRowid'];
        ShRowId = currentrowsel[0]['ShipRowId'];
        ShNo = currentrowsel[0]['Buy_Ord_Ship'];
        qty = $('#txtShipQuantity').val();
        //if (Mod == 0) {
        $('#txttotrt').val(0);
        var totalqy = 0;
        for (var e = 0; e < ShipmentItemList.length; e++) {
            var qy = ShipmentItemList[e].Quantity;
            totalqy = totalqy + parseFloat(qy);

        }
        var d = $('#txtQuantity').val();
        //if (totalqy > d) {
        //    alert('Quantity should not exceed actual quantity...');
        //}
        //else {
        $('#txttotship').val(totalqy.toFixed(0));

        var totalprqy = 0;
        for (var e = 0; e < ShipmentItemList.length; e++) {
            var prqy = ShipmentItemList[e].ProductionQty;
            totalprqy = totalprqy + parseFloat(prqy);

        }


        $('#txttotProdship').val(totalprqy.toFixed(0));


        //}
        //else {

        var f = $("#ddlPckType option:selected").text();
        var q = $("#txtShipQuantity").val();
        var AQ = $("#txtallowance").val();
        if (type == f && quat == q && Galp == AQ) {
            loadShipAddTable(ShipmentItemList);
            loadShipSaveTable(ShipmentItemList);
        }
        else if (type != f) {
            //alert("You are changing the itemtype");
            var msg = 'You are changing the itemtype...';
            var flg = 4;
            var mode = 1;
            AlartMessage(msg, flg, mode);
            loadShipAddTable(ShipmentItemList);
            loadShipSaveTable(ShipmentItemList);
            slno.push(sl);
            flag = 1;
            if (f == "Color/Size") {
                if (itemlistadd.length > 0) {

                    sepitm = $.grep(sepquanlistadd, function (e) {
                        return e.SSNO == sl;
                    });
                    itm = $.grep(quanlistadd, function (e) {
                        return e.SSNO == sl;
                    });
                    sepquanlistadd = $.grep(sepquanlistadd, function (e) {
                        return e.SSNO != sl;
                    });
                    quanlistadd = $.grep(quanlistadd, function (e) {
                        return e.SSNO != sl;
                    });
                    type = f;
                    idinsertflg = 1;
                    Listsump("CS", sl, StyleRowId);
                    Listsepsump("CS", sl, StyleRowId);
                }
                else {

                    sepitm = $.grep(sepquanlistadd, function (e) {
                        return e.SSNO == sl;
                    });
                    itm = $.grep(quanlistadd, function (e) {
                        return e.SSNO == sl;
                    });
                    sepquanlistadd = $.grep(sepquanlistadd, function (e) {
                        return e.SSNO != sl;
                    });
                    quanlistadd = $.grep(quanlistadd, function (e) {
                        return e.SSNO != sl;
                    });
                    type = f;
                    idinsertflg = 2;
                    Listsump("CS", sl, StyleRowId);
                    Listsepsump("CS", sl, StyleRowId);


                }
            } else {
                if (quanlistadd.length > 0) {

                    sepquan = $.grep(sepitemlistadd, function (e) {
                        return e.SSNO == sl;
                    });
                    quan = $.grep(itemlistadd, function (e) {
                        return e.SSNO == sl;
                    });
                    sepitemlistadd = $.grep(sepitemlistadd, function (e) {
                        return e.SSNO != sl;
                    });
                    itemlistadd = $.grep(itemlistadd, function (e) {
                        return e.SSNO != sl;
                    });
                    type = f;
                    idinsertflg = 1;
                    Listsump("M", sl, StyleRowId);
                    Listsepsump("M", sl, StyleRowId);
                }
                else {
                    sepquan = $.grep(sepitemlistadd, function (e) {
                        return e.SSNO == sl;
                    });
                    quan = $.grep(itemlistadd, function (e) {
                        return e.SSNO == sl;
                    });
                    sepitemlistadd = $.grep(sepitemlistadd, function (e) {
                        return e.SSNO != sl;
                    });
                    itemlistadd = $.grep(itemlistadd, function (e) {
                        return e.SSNO != sl;
                    });
                    type = f;
                    idinsertflg = 2;
                    Listsump("M", sl, StyleRowId);
                    Listsepsump("M", sl, StyleRowId);

                }
            }
        }
        else if (quat != q) {
            //alert("You are changing the itemtype");
            var msg = 'You are changing the itemtype...';
            var flg = 4;
            var mode = 1;
            AlartMessage(msg, flg, mode);
            loadShipAddTable(ShipmentItemList);
            loadShipSaveTable(ShipmentItemList);
            slno.push(sl);
            flag = 1;
            debugger;
            if (f == "Color/Size") {
                if (itemlistadd.length > 0) {
                    for (var e = 0; e < sepitemlistadd.length; e++) {
                        if (sepitemlistadd[e].SSNO == sl) {
                            sepitemlistadd[e].Quantity = 0;
                            sepitemlistadd[e].PQty = 0;
                            sepitemlistadd[e].AllowQty = 0;
                            sepitemlistadd[e].Ratio = 0;
                        }
                    }
                    SepPackItemList = $.grep(sepitemlistadd, function (v) {
                        return (v.SSNO == sl);
                    });
                    loadshconRatTab(SepPackItemList);
                }
            } else {
                if (quanlistadd.length > 0) {
                    for (var e = 0; e < sepquanlistadd.length; e++) {
                        if (sepquanlistadd[e].SSNO == sl) {
                            sepquanlistadd[e].Quantity = 0;
                            sepquanlistadd[e].PQty = 0;
                            sepquanlistadd[e].AllowQty = 0;
                            sepquanlistadd[e].Ratio = 0;
                        }
                    }
                    SepPackItemList = $.grep(sepquanlistadd, function (v) {
                        return (v.SSNO == sl);
                    });
                    loadshconQtyTab(SepPackItemList);
                }
            }
        }

        else if (Galp != AQ) {
            //alert("You are changing the itemtype");
            var msg = 'You are changing the itemtype...';
            var flg = 4;
            var mode = 1;
            AlartMessage(msg, flg, mode);
            loadShipAddTable(ShipmentItemList);
            loadShipSaveTable(ShipmentItemList);
            slno.push(sl);
            flag = 1;
            debugger;
            if (f == "Color/Size") {
                if (itemlistadd.length > 0) {
                    for (var e = 0; e < sepitemlistadd.length; e++) {
                        if (sepitemlistadd[e].SSNO == sl) {
                            sepitemlistadd[e].Quantity = 0;
                            sepitemlistadd[e].PQty = 0;
                            sepitemlistadd[e].AllowQty = 0;
                            sepitemlistadd[e].Ratio = 0;
                        }
                    }
                    SepPackItemList = $.grep(sepitemlistadd, function (v) {
                        return (v.SSNO == sl);
                    });
                    loadshconRatTab(SepPackItemList);

                }
            } else {
                if (quanlistadd.length > 0) {
                    for (var e = 0; e < sepquanlistadd.length; e++) {
                        if (sepquanlistadd[e].SSNO == sl) {
                            sepquanlistadd[e].Quantity = 0;
                            sepquanlistadd[e].PQty = 0;
                            sepquanlistadd[e].AllowQty = 0;
                            sepquanlistadd[e].Ratio = 0;
                        }
                    }
                    SepPackItemList = $.grep(sepquanlistadd, function (v) {
                        return (v.SSNO == sl);
                    });
                    loadshconQtyTab(SepPackItemList);
                }
            }
        }
        var totalqy = 0;
        for (var e = 0; e < ShipmentItemList.length; e++) {
            var qy = ShipmentItemList[e].Quantity;
            totalqy = totalqy + parseFloat(qy);
        }
        $('#txttotship').val(totalqy.toFixed(0));
        var totalprqy = 0;
        for (var e = 0; e < ShipmentItemList.length; e++) {
            var prqy = ShipmentItemList[e].ProductionQty;
            totalprqy = totalprqy + parseFloat(prqy);
        }
        $('#txttotProdship').val(totalprqy.toFixed(0));
        $('#btnShipUpdate').hide();
        $('#btnShipAdd').show();
        fnClearShipControls();
    });

    $(document).on('click', '.btnshipremove', function () {
        debugger;
        rowindex = $(this).closest('tr').index();

        var currentrowsel = ShipmentItemList.slice(rowindex);
        var sl = currentrowsel[0]['SLNo'];


        sepitemlistadd = $.grep(sepitemlistadd, function (e) {
            return e.SSNO != sl;
        });

        sepquanlistadd = $.grep(sepquanlistadd, function (e) {
            return e.SSNO != sl;
        });

        itemlistadd = $.grep(itemlistadd, function (e) {
            return e.SSNO != sl;
        });

        quanlistadd = $.grep(quanlistadd, function (e) {
            return e.SSNO != sl;
        });

        if (sepitemlistadd.length > 0) {
            loadshconRatTab(sepitemlistadd);
        }
        if (sepquanlistadd.length > 0) {
            loadshconQtyTab(sepquanlistadd);
        }

        if (itemlistadd.length > 0) {
            loadshconTab(itemlistadd);
        }
        if (quanlistadd.length > 0) {
            loadshconTable(quanlistadd);
        }
        ShipmentItemList.splice(rowindex, 1);
        document.getElementById("tblShipAdd").deleteRow(rowindex + 1);

        debugger;

    });

    $(document).on('click', '.btnPEdit', function () {
        debugger;
        Mode = 1;

        rowindex = $(this).closest('tr').index();

        var currentro12 = PackItemList.slice(rowindex);

        $('#txtColor').val(currentro12[0]['Color']);
        $('#txtSize').val(currentro12[0]['Size']);
        $('#txtSSLNO').val(currentro12[0]['SSNO']);

        var Qty = $(this).closest('tr').find('#txtshipQty').val();

        $('#txtEQuantity').val(Qty);

        $('#btnEPackAdd').hide();
        $('#btnEPackUpdate').show();
    });


    $('#btnEPackUpdate').click(function () {
        debugger;
        var currentrowsel = PackItemList.slice(rowindex);

        currentrowsel[0]['Color'] = $("#txtColor").val();
        currentrowsel[0]['Size'] = $("#txtSize").val();
        currentrowsel[0]['SSNO'] = $("#txtSSLNO").val();
        currentrowsel[0]['Quantity'] = $("#txtEQuantity").val();

        PackItemList[rowindex] = currentrowsel[0];
        loadshconTable(PackItemList);
    });

    $(document).on('keyup', '.PrdQtyCalc', function (e) {
        debugger;
        var table = $('#tPKbody').DataTable();
        var Sno = table.row($(this).parents('tr')).data()["snumb"];
        var Ssno = table.row($(this).parents('tr')).data()["SSNO"];

        var val = $(this).val();

        $.each(PackItemList, function () {
            if (this.snumb == Sno && this.SSNO == Ssno) {
                this.PQty = val;

            }
        });

        loadshconTab(PackItemList);

        $.each(itemlistadd, function () {
            if (this.snumb == Sno && this.SSNO == Ssno) {
                this.PQty = val;

            }
        });
    });

    $(document).on('keyup', '.qtPrdQtyCalc', function (e) {
        debugger;
        var table = $('#tPKbody').DataTable();
        var Sno = table.row($(this).parents('tr')).data()["snumb"];
        var Ssno = table.row($(this).parents('tr')).data()["SSNO"];

        var val = $(this).val();

        $.each(PackItemList, function () {
            if (this.snumb == Sno && this.SSNO == Ssno) {
                this.PQty = val;

            }
        });

        loadshconTable(PackItemList);

        $.each(quanlistadd, function () {
            if (this.snumb == Sno && this.SSNO == Ssno) {
                this.PQty = val;

            }
        });
    });
    $(document).on('click', '.btnaddunit', function () {
        debugger;
        $('#txtCompID').val("");
        $('#txtName').val("");
        $('#ddlCompany').empty();
        $('#txtlookup').val("");
        $('#txtaddress1').val("");
        $('#txtaddress2').val("");
        $('#txtaddress3').val("");
        $('#ddlCity').empty();
        $('#txtzipcode').val("");
        // $('#ddltounit').val("");
        $('#Status').val("");

        $('#btnUpdate').hide();
        $('#btnAdd').show();
        $('#txtCompID').css('border-color', 'lightgrey');
        $('#ddlCompany').css('border-color', 'lightgrey');
        $('#ddlCity').css('border-color', 'lightgrey');
        $('#txtlookup').css('border-color', 'lightgrey');
        $('#txtaddress1').css('border-color', 'lightgrey');
        $('#txtaddress2').css('border-color', 'lightgrey');
        $('#txtaddress3').css('border-color', 'lightgrey');
        $('#Name').css('border-color', 'lightgrey');
        $('#txtzipcode').css('border-color', 'lightgrey');
        $('#ddltounit').css('border-color', 'lightgrey');
        $('#Status').css('border-color', 'lightgrey');

        LoadCityDDL("#ddlCity");
        LoadCompanyDDL("#ddlCompany");
        $('#myModal1').modal('show');
    });
});

//Valdidation using jquery
function unitvalidate() {
    var isValid = true;
    if ($('#txtName').val().trim() == "") {
        $('#txtName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtName').css('border-color', 'lightgrey');
    }


    if ($('#ddltounit').val() == 0) {
        $('#ddltounit').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddltounit').css('border-color', 'lightgrey');
    }


    if ($('#ddlCompany').val() == 0) {
        $('#ddlCompany').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlCompany').css('border-color', 'lightgrey');
    }
    if ($('#ddlCity').val() == 0) {
        $('#ddlCity').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlCity').css('border-color', 'lightgrey');
    }

    var z = $("#txtzipcode").val();
    if (z.length >= 8) {
        $('#txtzipcode').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtzipcode').css('border-color', 'lightgrey');
    }
    return isValid;

}
//Add Data Function 
function Add() {
    var res = unitvalidate();
    if (res == false) {
        return false;
    }
    debugger;
    var checkbox_value = "";
    var ischecked = "False";
    $(":checkbox").each(function () {
        ischecked = $('#Status').is(":checked");

    });
    debugger;
    var CompanyUnitObj = {
        Id: $('#txtCompID').val(),
        CompanyUnitName: $('#txtName').val(),
        CompanyUnitLookup: $('#txtlookup').val(),
        Address1: $('#txtaddress1').val(),
        Address2: $('#txtaddress2').val(),
        Address3: $('#txtaddress3').val(),
        CityId: $('#ddlCity').val(),
        CompanyId: $('#ddlCompany').val(),
        ZipCode: $('#txtzipcode').val(),
        IssueType: $('#ddltounit').val(),
        IsActive: ischecked,
    };
    $.ajax({
        url: "/CompanyUnit/Add",
        data: JSON.stringify(CompanyUnitObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            } else if (result.Value == -1) {
                //alert('Given CompanyUnit is Already Available...');
                var msg = 'Given CompanyUnit is Already Available...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }
            else {

                $('#myModal1').modal('hide');
                //alert('Data Saved successfully');
                var msg = 'Data Saved successfully...';
                var flg = 1;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                //LoadCompanyUnitDDL("#ddlprodunit,#ddlprocessunit");
            }
            //clearTextBox();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

$(document).ready(function () {
    $("#tPKcsbody ").dataTable().find("tbody").on('click', 'tr', function () {
        //alert((this.rowIndex)-1);
        sepshiprowindex = (this.rowIndex) - 1;
    });
});

$(document).ready(function () {
    $("#tPKbody ").dataTable().find("tbody").on('click', 'tr', function () {
        //alert((this.rowIndex)-1);
        shiprowindex = (this.rowIndex) - 1;
    });
});

function fnAllowCalc() {
    var qty = ($('#txtShipQuantity').val().trim() == "" ? 0 : $('#txtShipQuantity').val());
    var allo = ($('#txtallowance').val().trim() == "" ? 0 : $('#txtallowance').val());

    var totpqty = parseInt((qty * GCon));
    var Allprodqty = parseInt((totpqty * allo) / 100);
    var prodqty = Math.ceil(parseInt(totpqty) + parseInt(Allprodqty));
    $('#txtheadprodqty').val(prodqty);
}

function getbyID(ID) {
    debugger;
    // LoadCompanyUnitDDL("#ddlprodunit,#ddlprocessunit");
    $.ajax({
        url: "/WorkOrder/GetWorkOrder/" + ID,
        type: "GET",
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            if (obj != undefined && obj != null && obj.length > 0) {
                //$('#txtorderno').val(obj[0]["OrderNo"]);
                //$('#txtrefno').val(obj[0]["RefNo"]);
                //$('#prodallowance').val(obj[0]["AllowancePer"]);
                //$('#stylerowid').val(obj[0]["Stylerowid"]);
                //$('#txtstyle').val(obj[0]["Style"]);
                //$('#txtquantity').val(obj[0]["Quantity"]);
                //$('#prodquantity').val(obj[0]["Quantity"]);
                //$('#basicuom').val(obj[0]["Guom"]);
                //$('#basicconvert').val(obj[0]["Conv"]);
                //$('#totitems').val(obj[0]["Conv"]);
                //$('#txtbuyer').val(obj[0]["Buyer"]);
                //$('#txtbuyerid').val(obj[0]["BuyerId"]);
                //$('#txtstyleid').val(obj[0]["StyleId"]);
                //$('#basicquantity').val((obj[0]["Quantity"] * obj[0]["Conv"]));
                companyid = obj[0]["CompanyId"];
                $('#txtworkno').val(obj[0]["WorkOrder"]);
                $('#ddlprodunit').val(obj[0]["ProcessUnitId"]);
                $('#ddlprocessunit').val(obj[0]["ProcessUnitId"]);
                //$('#txtWODate').val(moment(obj[0]["Shipmentdate"]).format('DD/MM/YYYY'));

                var BMasId = obj[0]["BMasId"];

                GBMasId = BMasId;

                var WorkNo = $("#txtworkno").val();

                LoadCheckWorkPlanDetails(WorkNo);


                if (WorkNo == "") {
                    GenerateNumber();
                }
                //EditDetShipPlanList(StyleRowId);
                //EditDetTotalPackList(StyleRowId);
                //EditDetTotSepPackList(StyleRowId);
            }


            $('#myModal').modal('show');
            //$('#btnUpdate').hide();
            //$('#btnAdd').show();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function ClearPack() {
    var inputcount = 0;
    $('#tPKbody tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tPKbody').DataTable().destroy();
    }

    //$('#tPKbody').DataTable().destroy();
    //   $('#tblPack1').DataTable().destroy();
}

var table, column;
function GenerateShipNo(table, column) {

    debugger;
    table = "Buy_Ord_Ship",
    column = "Buy_Ord_Ship",

    $.ajax({
        url: "/BulkOrder/GenerateShipNo",
        data: JSON.stringify({ tblname: table, ColName: column }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $('#txtShipNo').val(result.Value);
            buy_ord_ship = result.Value;
        }
    });
}


function QtyCalc(value) {
    debugger;

    calctot(value);
}
var snum, ssno;
function calctot(value) {
    debugger;

    //var currentrow = PackItemList.slice(shiprowindex);
    //snum = currentrow[0].snumb;
    //ssno = currentrow[0].SSNO;
    //var sid = currentrow[0].SizeId;
    //var cid = currentrow[0].ColorId;

    //var filteredResult = $.grep(ShipmentItemList, function (element, index) {
    //    return element.SLNo == ssno;
    //});

    //allow = filteredResult[0].AllowancePer;

    //$.each(PackItemList, function () {
    //    if (this.snumb == snum && this.SSNO == ssno) {
    //        this.Quantity = value;
    //        this.AllowQty = Math.ceil(parseFloat((value * allow) / 100));
    //        this.PQty = parseInt(this.Quantity) + parseInt(this.AllowQty);

    //    }
    //});


    //loadshconTable(PackItemList);

    //qty;
    //var totalamnt = 0;
    //for (var e = 0; e < PackItemList.length; e++) {
    //    var amount = PackItemList[e].Quantity;
    //    totalamnt = totalamnt + parseFloat(amount);

    //}

    //$('#txttot').val(totalamnt);
    //var tot = 0;
    //tot = $('#txttot').val();


    //if (qty != 0) {
    //    if (parseInt(tot) > qty) {

    //    }

    //    else {

    //        if (Mod == 0) {
    //            totquanlist = PackItemList;
    //            var filtered = [];
    //            filtered = totquanlist;

    //            var li = [];
    //            filtered = $.grep(filtered, function (v) {

    //                return v.snumb === snum && v.SSNO === ssno;


    //            });

    //            quanlistadd = [];
    //            $.each(totquanlist, function (i, e) {
    //                var matchingItems = $.grep(resquan, function (v) {
    //                    return v.snumb === e.snumb && v.SSNO === e.SSNO;
    //                });
    //                if (matchingItems.length === 0) {
    //                    resquan.push(e);

    //                }
    //            });
    //            for (var x = 0; x < resquan.length; x++) {
    //                quanlistadd.push(resquan[x]);
    //            }
    //            loadEshconTable(resquan);
    //        }
    //        else {
    //            var solidflag = 0;
    //            var csizeaddflg = 0;
    //            if (type == "Solid") {


    //                if (quanlistadd.length > 0) {
    //                    for (var q = 0; q < quanlistadd.length; q++) {
    //                        if (quanlistadd[q].SSNO == ssno && quanlistadd[q].ColorId == cid && quanlistadd[q].SizeId == sid) {

    //                            csizeaddflg = 1;
    //                        }
    //                    }
    //                }

    //                if (csizeaddflg == 0) {
    //                    for (var d = 0; d < PackItemList.length; d++) {
    //                        quanlistadd.push(PackItemList[d]);
    //                    }
    //                }
    //                else {
    //                    for (var q = 0; q < quanlistadd.length; q++) {
    //                        if (quanlistadd[q].SSNO == ssno && quanlistadd[q].ColorId == cid && quanlistadd[q].SizeId == sid) {
    //                            quanlistadd[q].Ratio = value;
    //                        }
    //                    }
    //                }


    //            }
    //            else if (type == "Color/Size") {
    //                var colorsizeflag = 0;
    //                var csizeaddflg = 0;


    //                if (itemlistadd.length > 0) {
    //                    for (var q = 0; q < itemlistadd.length; q++) {
    //                        if (itemlistadd[q].SSNO == ssno && itemlistadd[q].ColorId == cid && itemlistadd[q].SizeId == sid) {

    //                            csizeaddflg = 1;
    //                        }
    //                    }
    //                }

    //                if (csizeaddflg == 0) {
    //                    for (var d = 0; d < PackItemList.length; d++) {
    //                        itemlistadd.push(PackItemList[d]);
    //                    }
    //                }
    //                else {
    //                    for (var q = 0; q < itemlistadd.length; q++) {
    //                        if (itemlistadd[q].SSNO == ssno && itemlistadd[q].ColorId == cid && itemlistadd[q].SizeId == sid) {
    //                            itemlistadd[q].Ratio = value;
    //                        }
    //                    }
    //                }


    //            }
    //        }
    //    }
    //}
    var table = $('#tPKbody').DataTable();
    var qtydata = table.rows().data();


    var currentrow = SepPackItemList.slice(sepshiprowindex);
    snum = currentrow[0].snumb;
    ssno = currentrow[0].SSNO;
    var sid = currentrow[0].SizeId;
    var cid = currentrow[0].ColorId;
    var comid = currentrow[0].ComboId;

    var filteredResult = $.grep(ShipmentItemList, function (element, index) {
        return element.SLNo == ssno;
    });

    allow = filteredResult[0].AllowancePer;

    $.each(SepPackItemList, function () {
        if (this.snumb == snum && this.SSNO == ssno) {
            this.Quantity = value;
            //this.AllowQty = Math.ceil(parseFloat((value * allow) / 100));
            //this.PQty = parseInt(this.Quantity) + parseInt(this.AllowQty);
        }
    })

    loadshconQtyTab(SepPackItemList);
    $.each(PackItemList, function () {
        if (this.ComboId == comid && this.SSNO == ssno && this.SizeId == sid) {
            this.Quantity = value;
            this.AllowQty = Math.ceil(parseFloat((value * allow) / 100));
            this.PQty = parseInt(this.Quantity) + parseInt(this.AllowQty);

        }
    });


    loadshconTable(PackItemList);
    //$('input[id=txtshipQty]').each(function (ig) {
    //    if (qtydata[ig].ComboId == comid && qtydata[ig].SSNO == ssno && qtydata[ig].SizeId == sid) {
    //        var row = $(this).closest('tr');
    //        row.find('#txtshipQty').val(value);
    //        row.find('#txtFPurQty').val(Math.ceil(parseFloat((value * allow) / 100)));
    //        row.find('#txtFPurQty').val(parseInt(this.Quantity) + parseInt(this.AllowQty));
    //    }
    //});

    qty;
    var totalamnt = 0;
    for (var e = 0; e < PackItemList.length; e++) {
        var amount = PackItemList[e].Quantity;
        totalamnt = totalamnt + parseFloat(amount);

    }

    $('#txttot').val(totalamnt);


    var totalamntsp = 0;
    for (var t = 0; t < SepPackItemList.length; t++) {
        var amount = SepPackItemList[t].Quantity;
        totalamntsp = totalamntsp + parseFloat(amount);

    }

    $('#txttotrt').val(totalamntsp);


    var totalpqty = 0;
    for (var t = 0; t < PackItemList.length; t++) {
        var amount = PackItemList[t].PQty;
        totalpqty = totalpqty + parseFloat(amount);
    }

    for (var c = 0; c < ShipmentItemList.length; c++) {
        if (ShipmentItemList[c].SLNo == ssno) {
            ShipmentItemList[c].ProductionQty = totalpqty;
        }
    }

    loadShipAddTable(ShipmentItemList);
    var tot = 0;
    tot = $('#txttot').val();


    if (qty != 0) {
        if (parseInt(tot) > qty) {

        }

        else {

            if (Mod == 0) {
                totquanlist = PackItemList;
                var filtered = [];
                filtered = totquanlist;

                var li = [];
                filtered = $.grep(filtered, function (v) {

                    return v.snumb === snum && v.SSNO === ssno;


                });

                quanlistadd = [];
                $.each(totquanlist, function (i, e) {
                    var matchingItems = $.grep(resquan, function (v) {
                        return v.snumb === e.snumb && v.SSNO === e.SSNO && v.ComboId == e.ComboId;
                    });
                    if (matchingItems.length === 0) {
                        resquan.push(e);

                    }
                });
                for (var x = 0; x < resquan.length; x++) {
                    quanlistadd.push(resquan[x]);
                }
                loadEshconTable(resquan);





                sepquanlistadd = [];
                $.each(SepPackItemList, function (i, e) {
                    var matchingItems = $.grep(sepresquan, function (v) {
                        return v.snumb === e.snumb && v.SSNO === e.SSNO && v.ComboId == e.ComboId;
                    });
                    if (matchingItems.length === 0) {
                        sepresquan.push(e);

                    }
                });
                for (var x = 0; x < sepresquan.length; x++) {
                    sepquanlistadd.push(sepresquan[x]);
                }


            }
            else {
                var solidflag = 0;
                var csizeaddflg = 0;
                if (type == "Solid") {
                    if (quanlistadd.length > 0) {
                        for (var q = 0; q < quanlistadd.length; q++) {
                            if (quanlistadd[q].SSNO == ssno && quanlistadd[q].ComboId == comid && quanlistadd[q].SizeId == sid) {

                                csizeaddflg = 1;
                            }
                        }
                    }

                    if (csizeaddflg == 0) {
                        for (var d = 0; d < PackItemList.length; d++) {
                            quanlistadd.push(PackItemList[d]);
                        }

                        for (var d = 0; d < SepPackItemList.length; d++) {
                            sepquanlistadd.push(SepPackItemList[d]);
                        }
                    }
                    else {
                        for (var q = 0; q < quanlistadd.length; q++) {
                            if (quanlistadd[q].SSNO == ssno && quanlistadd[q].ComboId == comid && quanlistadd[q].SizeId == sid) {
                                quanlistadd[q].Ratio = value;
                            }
                        }

                        for (var q = 0; q < sepquanlistadd.length; q++) {
                            if (sepquanlistadd[q].SSNO == ssno && sepquanlistadd[q].ComboId == comid && sepquanlistadd[q].SizeId == sid) {
                                sepquanlistadd[q].Ratio = value;
                            }
                        }
                    }


                }
                else if (type == "Color/Size") {
                    var colorsizeflag = 0;
                    var csizeaddflg = 0;


                    if (itemlistadd.length > 0) {
                        for (var q = 0; q < itemlistadd.length; q++) {
                            if (itemlistadd[q].SSNO == ssno && itemlistadd[q].ComboId == comid && itemlistadd[q].SizeId == sid) {

                                csizeaddflg = 1;
                            }
                        }
                    }

                    if (csizeaddflg == 0) {
                        for (var d = 0; d < PackItemList.length; d++) {
                            itemlistadd.push(PackItemList[d]);
                        }

                        for (var d = 0; d < SepPackItemList.length; d++) {
                            sepitemlistadd.push(SepPackItemList[d]);
                        }
                    }
                    else {
                        for (var q = 0; q < itemlistadd.length; q++) {
                            if (itemlistadd[q].SSNO == ssno && itemlistadd[q].ComboId == comid && itemlistadd[q].SizeId == sid) {
                                itemlistadd[q].Ratio = value;
                            }
                        }

                        for (var q = 0; q < sepitemlistadd.length; q++) {
                            if (sepitemlistadd[q].SSNO == ssno && sepitemlistadd[q].ComboId == comid && sepitemlistadd[q].SizeId == sid) {
                                sepitemlistadd[q].Ratio = value;
                            }
                        }
                    }


                }
            }
        }
    }
}

function RatioCalc(val) {
    debugger;
    //qty;
    //var currentrow = PackItemList.slice(shiprowindex);
    //snum = currentrow[0].snumb;
    //ssno = currentrow[0].SSNO;
    //var sid = currentrow[0].SizeId;
    //var cid = currentrow[0].ColorId;
    //var comboid = currentrow[0].ComboId;

    //$.each(PackItemList, function () {
    //    if (this.snumb == snum && this.SSNO == ssno) {
    //        this.Ratio = val;

    //    }
    //});
    //var totalamnt = 0;
    //for (var e = 0; e < PackItemList.length; e++) {
    //    var amount = PackItemList[e].Ratio;
    //    totalamnt = totalamnt + parseFloat(amount);
    //}

    //// $('#txttot').val(totalamnt.toFixed(3));
    //var tot = totalamnt;// $('#txttot').val();

    //for (var g = 0; g < PackItemList.length; g++) {
    //    var q = PackItemList[g].Ratio;
    //    var quan = Math.round((qty / tot) * q);
    //    PackItemList[g].Quantity = quan;

    //    var percentagecal = PackItemList[g].Quantity;
    //    var percenval = (percentagecal * allow / 100);
    //    var allowval = percenval;
    //    PackItemList[g].AllowQty = Math.round(percenval);
    //    PackItemList[g].PQty = parseInt(percentagecal) + parseInt(PackItemList[g].AllowQty);
    //}

    //loadshconTab(PackItemList);
    //var total = 0;
    //for (var e = 0; e < PackItemList.length; e++) {
    //    var amount = PackItemList[e].Quantity;
    //    total = total + parseFloat(amount);
    //}
    //$('#txttot').val(total.toFixed(3));

    //totitemlist = PackItemList;
    //var filtered = [];
    //filtered = totitemlist;

    //var li = [];
    //filtered = $.grep(filtered, function (v) {
    //    return v.snumb === snum && v.SSNO === ssno && v.SizeId === sid && v.ColorId === cid && v.ComboId === comboid;
    //});

    //if (Mod == 0) {
    //    itemlistadd = [];
    //    $.each(totitemlist, function (i, e) {
    //        var matchingItems = $.grep(result, function (v) {
    //            return v.snumb === e.snumb && v.SSNO === e.SSNO && v.SizeId === e.SizeId && v.ColorId === e.ColorId && v.ComboId === e.ComboId;
    //        });
    //        if (matchingItems.length === 0) {
    //            result.push(e);
    //            itemlistadd.push(result);
    //        }
    //    });
    //}
    //else if (Mod == 1) {
    //    var solidflag = 0;
    //    var csizeaddflg = 0;

    //    if (type == "Solid") {          
    //        if (quanlistadd.length > 0) {
    //            for (var q = 0; q < quanlistadd.length; q++) {
    //                if (quanlistadd[q].SSNO == ssno && quanlistadd[q].ColorId == cid && quanlistadd[q].SizeId == sid) {
    //                    //itemlistadd.push(PackItemList[d]);
    //                    csizeaddflg = 1;
    //                }
    //            }
    //        }

    //        if (csizeaddflg == 0) {
    //            for (var d = 0; d < PackItemList.length; d++) {
    //                quanlistadd.push(PackItemList[d]);
    //            }
    //        }
    //        else {
    //            for (var q = 0; q < quanlistadd.length; q++) {
    //                if (quanlistadd[q].SSNO == ssno && quanlistadd[q].ColorId == cid && quanlistadd[q].SizeId == sid) {
    //                    quanlistadd[q].Ratio = val;
    //                }
    //            }
    //        }


    //    }
    //    else if (type == "Color/Size") {
    //        var colorsizeflag = 0;
    //        var csizeaddflg = 0;       

    //        if (itemlistadd.length > 0) {
    //            for (var q = 0; q < itemlistadd.length; q++) {
    //                if (itemlistadd[q].SSNO == ssno && itemlistadd[q].ColorId == cid && itemlistadd[q].SizeId == sid) {
    //                    //itemlistadd.push(PackItemList[d]);
    //                    csizeaddflg = 1;
    //                }
    //            }
    //        }

    //        if (csizeaddflg == 0) {
    //            for (var d = 0; d < PackItemList.length; d++) {
    //                itemlistadd.push(PackItemList[d]);
    //            }
    //        }
    //        else {
    //            for (var q = 0; q < itemlistadd.length; q++) {
    //                if (itemlistadd[q].SSNO == ssno && itemlistadd[q].ColorId == cid && itemlistadd[q].SizeId == sid) {
    //                    itemlistadd[q].Ratio = val;
    //                }
    //            }
    //        }           
    //    }
    //}

    //result;
    //for (var x = 0; x < result.length; x++) {
    //    itemlistadd.push(result[x]);
    //}

    //loadEshconTable(result);





    qty;
    var currentrow = SepPackItemList.slice(sepshiprowindex);
    snum = currentrow[0].snumb;
    ssno = currentrow[0].SSNO;
    var sid = currentrow[0].SizeId;
    var cid = currentrow[0].ColorId;
    var comboid = currentrow[0].ComboId;


    $.each(SepPackItemList, function () {
        if (this.snumb == snum && this.SSNO == ssno) {
            this.Ratio = val;

        }
    });

    $.each(PackItemList, function () {
        if (this.ComboId == comboid && this.SSNO == ssno && this.SizeId == sid) {
            this.Ratio = val;
        }
    });
    var totalamnt = 0;
    for (var e = 0; e < SepPackItemList.length; e++) {

        var amount = SepPackItemList[e].Ratio;
        totalamnt = totalamnt + parseFloat(amount);

    }


    var tot = totalamnt;// $('#txttot').val();

    for (var g = 0; g < SepPackItemList.length; g++) {

        var q = SepPackItemList[g].Ratio;
        var quan = Math.round((qty / tot) * q);
        SepPackItemList[g].Quantity = quan;


    }
    loadshconRatTab(SepPackItemList);


    for (var h = 0; h < SepPackItemList.length; h++) {
        if (SepPackItemList[h].Ratio > 0) {
            var coid = SepPackItemList[h].ComboId;
            var sss = SepPackItemList[h].SSNO;
            var sizeid = SepPackItemList[h].SizeId;
            for (var g = 0; g < PackItemList.length; g++) {
                if (PackItemList[g].ComboId == coid && PackItemList[g].SSNO == sss && PackItemList[g].SizeId == sizeid) {
                    var q = PackItemList[g].Ratio;
                    var quan = Math.round((qty / tot) * q);
                    PackItemList[g].Quantity = quan;

                    var percentagecal = PackItemList[g].Quantity;
                    var percenval = (percentagecal * allow / 100);
                    var allowval = percenval;
                    PackItemList[g].AllowQty = Math.round(percenval);
                    PackItemList[g].PQty = parseInt(percentagecal) + parseInt(PackItemList[g].AllowQty);

                }
            }
        }
    }
    loadshconTab(PackItemList);

    var total = 0;
    for (var e = 0; e < PackItemList.length; e++) {
        var amount = PackItemList[e].Quantity;
        total = total + parseFloat(amount);
    }
    $('#txttot').val(total.toFixed(3));

    var totalcs = 0;
    for (var e = 0; e < SepPackItemList.length; e++) {
        var amount = SepPackItemList[e].Quantity;
        totalcs = totalcs + parseFloat(amount);
    }
    $('#txttotrt').val(totalcs.toFixed(3));


    var totalpqty = 0;
    for (var e = 0; e < PackItemList.length; e++) {
        var amount = PackItemList[e].PQty;
        totalpqty = totalpqty + parseFloat(amount);
    }

    for (var c = 0; c < ShipmentItemList.length; c++) {
        if (ShipmentItemList[c].SLNo == sss) {
            ShipmentItemList[c].ProductionQty = totalpqty;
        }
    }

    loadShipAddTable(ShipmentItemList);
    totitemlist = PackItemList;
    var filtered = [];
    filtered = totitemlist;

    var li = [];
    filtered = $.grep(filtered, function (v) {
        return v.snumb === snum && v.SSNO === ssno && v.SizeId === sid && v.ColorId === cid && v.ComboId === comboid;
    });

    if (Mod == 0) {
        itemlistadd = [];
        $.each(totitemlist, function (i, e) {
            var matchingItems = $.grep(result, function (v) {
                return v.snumb === e.snumb && v.SSNO === e.SSNO && v.SizeId === e.SizeId && v.ColorId === e.ColorId && v.ComboId === e.ComboId;
            });
            if (matchingItems.length === 0) {
                result.push(e);
                //itemlistadd.push(result);
            }
        });

        sepitemlistadd = [];
        $.each(SepPackItemList, function (i, e) {
            var matchingItems = $.grep(sepresult, function (v) {
                return v.snumb === e.snumb && v.SSNO === e.SSNO && v.SizeId === e.SizeId && v.ColorId === e.ColorId && v.ComboId === e.ComboId;
            });
            if (matchingItems.length === 0) {
                sepresult.push(e);

            }
        });

    }
    else if (Mod == 1) {
        var solidflag = 0;
        var csizeaddflg = 0;

        if (type == "Solid") {
            if (quanlistadd.length > 0) {
                for (var q = 0; q < quanlistadd.length; q++) {
                    if (quanlistadd[q].SSNO == ssno && quanlistadd[q].ComboId == comboid && quanlistadd[q].SizeId == sid) {
                        //itemlistadd.push(PackItemList[d]);
                        csizeaddflg = 1;
                    }
                }
            }

            if (csizeaddflg == 0) {
                for (var d = 0; d < PackItemList.length; d++) {
                    quanlistadd.push(PackItemList[d]);
                }

                for (var t = 0; t < SepPackItemList.length; t++) {
                    sepquanlistadd.push(SepPackItemList[t]);
                }
            }
            else {
                for (var q = 0; q < quanlistadd.length; q++) {
                    if (quanlistadd[q].SSNO == ssno && quanlistadd[q].ComboId == comboid && quanlistadd[q].SizeId == sid) {
                        quanlistadd[q].Ratio = val;
                    }
                }

                for (var a = 0; a < sepquanlistadd.length; a++) {
                    if (sepquanlistadd[a].SSNO == ssno && sepquanlistadd[a].ComboId == comboid && sepquanlistadd[a].SizeId == sid) {
                        sepquanlistadd[a].Ratio = val;
                    }
                }
            }


        }
        else if (type == "Color/Size") {
            var colorsizeflag = 0;
            var csizeaddflg = 0;

            if (itemlistadd.length > 0) {
                for (var q = 0; q < itemlistadd.length; q++) {
                    if (itemlistadd[q].SSNO == ssno && itemlistadd[q].ComboId == comboid && itemlistadd[q].SizeId == sid) {
                        //itemlistadd.push(PackItemList[d]);
                        csizeaddflg = 1;
                    }
                }
            }

            if (csizeaddflg == 0) {
                for (var d = 0; d < PackItemList.length; d++) {
                    itemlistadd.push(PackItemList[d]);
                }
                for (var t = 0; t < SepPackItemList.length; t++) {
                    sepitemlistadd.push(SepPackItemList[t]);
                }
            }
            else {
                for (var q = 0; q < itemlistadd.length; q++) {
                    if (itemlistadd[q].SSNO == ssno && itemlistadd[q].ComboId == comboid && itemlistadd[q].SizeId == sid) {
                        itemlistadd[q].Ratio = val;
                    }
                }
                for (var a = 0; a < sepitemlistadd.length; a++) {
                    if (sepitemlistadd[a].SSNO == ssno && sepitemlistadd[a].ComboId == comboid && sepitemlistadd[a].SizeId == sid) {
                        sepitemlistadd[a].Ratio = val;
                    }
                }
            }
        }
    }


    for (var x = 0; x < result.length; x++) {
        itemlistadd.push(result[x]);
    }

    loadEshconTable(result);

    for (var u = 0; u < sepresult.length; u++) {
        sepitemlistadd.push(sepresult[u]);
    }


}

function loadsavetab() {
    debugger;
    var totlist = [];
    totlist = PackItemList;
    for (z = 0; z < totlist.length; z++) {
        for (var x = 0; x < PackItemList.length; x++) {
            if (PackItemList[x].snumb == snum && PackItemList[x].SSNO == ssno) {
                totlist[z] = PackItemList[x];
            }

        }
    }
    totlist;
    PackItemList;



}

function loadtable() {
    debugger;
    var value = 0;
    if (itmmode == 'M') {

        $.each(SepPackItemList, function (e) {
            $.each(PackItemList, function (f) {
                if (f.ComboId == e.ComboId && f.SSNO == e.SSNO && f.SizeId == e.SizeId) {
                    value = e.Quantity;
                    f.Quantity = e.Quantity;
                    f.AllowQty = Math.ceil(parseFloat((e.Quantity * allow) / 100));
                    f.PQty = parseInt(f.Quantity) + parseInt(f.AllowQty);

                }
                var wtable = $('#tPKbody').DataTable();
                var wdata = wtable.rows().data();

                $('input[id=txtshipQty]').each(function (ig) {
                    if (wdata[ig].ComboId == e.ComboId && wdata[ig].SSNO == e.SSNO && wdata[ig].SizeId == e.SizeId) {
                        var row = $(this).closest('tr');
                        row.find('#txtshipQty').val(value);
                        var res = Math.ceil(parseFloat((value * allow) / 100));
                        row.find('#txtallQty').val(res);
                        var tr = parseInt(value) + parseInt(res);
                        row.find('#txtqtyPrdQty').val(tr);
                    }
                });
            });
        });



    }
    else {

    }

}

function loadShipAddTable(list) {
    // $('#tblShipAdd').DataTable().destroy();
    debugger;
    var inputcount = 0;
    $('#tblShipAdd tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tblShipAdd').DataTable().destroy();
    }
    $('#tblShipAdd').empty();
    //$('#tCPIbody').DataTable().destroy();
    //list.sort(function (a, b) {
    //    return a.CPlanSlNo - b.CPlanSlNo;
    //})
    $('#tblShipAdd').DataTable({
        //"aaSorting": [[0, 'asc']],
        //"order": [[1, "asc"]],
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

            { title: "ShipID", data: "ShipRowId", "visible": false },
            { title: "S.No", data: "SLNo" },
            { title: "Ast No", data: "Lotno" },
                      //{
                      //    title: "ShipmentDate", data: "Ship_Date",
                      //    "render": function (data) {
                      //        var date = new Date(data);
                      //        var month = date.getMonth() + 1;
                      //        return (month.length > 1 ? month : "0" + month) + "/" + date.getDate() + "/" + date.getFullYear();
                      //    }
                      //},
                      {
                          title: "Ship Date", data: "Ship_Date",
                          //render: function (data) {
                          //    //return (moment(data).format("DD/MM/YYYY"));
                          //    return (moment(new Date()).format('YYYY/MM/DD'));
                          //}
                          //render: function (data, type, row) {
                          //    return (moment(data).format("DD/MM/YYYY"));
                          //}
                      },

            { title: "Dest", data: "Dest" },
            { title: "Dest Code", data: "Dest_Code", "visible": false },
            { title: "Port Loading", data: "PortOfLoading" },
            { title: "PortLoadingID", data: "PortOfLoadingId", "visible": false },
            { title: "Quantity", data: "Quantity" },
            { title: "Uom", data: "UOM" },
            { title: "UomID", data: "UomID", "visible": false },
            { title: "Packing", data: "ItemModeType" },
            {
                title: "Del Date", data: "DelDate",
                //render: function (data, type, row) {
                //    return (moment(data).format("DD/MM/YYYY"));
                //}
            },
            { title: "Allowance", data: "AllowancePer" },
            { title: "Prod Qty", data: "ProductionQty" },
            { title: "PackingID", data: "ItemMode", "visible": false },
             { title: "Ship No", data: "Buy_Ord_Ship", "visible": false },
               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<div style="display:inline-flex;"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnshipedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnshipremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div>'
                   //"sDefaultContent": '<div style="display:inline-flex;"><button type="button" class="btnshipedit btn btn-round btn-warning"> Edit </button> <button type="button" class="btnshipremove btn btn-round btn-danger"> Remove </button><button type="button" class="btnshipItemview btn btn-round btn-info"> View Pack </button></div>'
               }
        ]
    });

    $("#tblShipAdd tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblShipAdd tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });

}

function loadShipSaveTable(shipItemObj) {
    $('#tblShipAddSave').DataTable().destroy();
    debugger;

    $('#tblShipAddSave').DataTable({

        //"order": [[1, "asc"]],
        data: ShipmentItemList,
        columns: [

            { title: "ShipID", data: "ShipRowId" },
            { title: "SNo", data: "SLNo" },
            { title: "Assort No", data: "Lotno" },
          {
              title: "Ship Date", data: "Ship_Date",
              //render: function (data) {
              //    //return (moment(data).format("DD/MM/YYYY"));
              //    return (moment(new Date()).format('YYYY/MM/DD'));
              //}
              render: function (data, type, row) {
                  return (moment(data).format("DD/MM/YYYY"));
              }
          },
            { title: "Dest", data: "Dest" },
            { title: "Dest Code", data: "Dest_Code" },
            { title: "Port Loading", data: "PortOfLoading" },
            { title: "PortLoadingID", data: "PortOfLoadingId" },
            { title: "Quantity", data: "Quantity" },
            { title: "Uom", data: "UOM" },
            { title: "UomID", data: "UomID" },
            { title: "Packing", data: "ItemModeType" },
            {
                title: "Del Date", data: "DelDate",
                render: function (data, type, row) {
                    return (moment(data).format("DD/MM/YYYY"));
                }
            },
            { title: "Allowance", data: "AllowancePer" },
               { title: "Prod Qty", data: "ProductionQty" },
            { title: "PackingID", data: "ItemMode" },
             { title: "Ship No", data: "Buy_Ord_Ship" }

        ]
    });
}


function fnClearShipControls() {
    debugger;
    $('#ddlDest').val('0').trigger('change');
    $('#ddlUom').val('');
    $('#txtAssort').val('');
    $('#txtShipDate').val('');
    $('#txtShipQuantity').val('');
    $('#ddlPckType').val('0').trigger('change');
    $('#ddlPort').val('0').trigger('change');
    $('#txtdeldate').val('');
    $('#txtallowance').val('');
    $('#txtheadprodqty').val('');
}

function GenerateNumber(table, column, compId, Docum) {

    debugger;

    if (OType == "B") {

        table = "Job_Ord_Mas",
        column = "Job_Ord_No",
        compId = companyid,

        Docum = 'WORK ORDER'
    } else if (OType == "S") {
        table = "Job_Ord_Mas",
       column = "Job_Ord_No",
       compId = companyid,

       Docum = 'SAMPLE JOB ORDER'
    } else if (OType == "D") {
        table = "Job_Ord_Mas",
       column = "Job_Ord_No",
       compId = companyid,

       Docum = 'DOM WORK ORDER'
    }

    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $('#txtworkno').val(result.Value);
        }
    });
}

function save() {
    debugger;
    var res = validate();
    if (res == false) {
        return false;
    }

    $('#ddlPort').val('0');
    var ShipTot = $('#txttotship').val();
    var QtyTot = $('#txtQuantity').val();


    var totalamnt = 0;
    for (var e = 0; e < ShipmentItemList.length; e++) {
        var amount = ShipmentItemList[e].Quantity;
        totalamnt = totalamnt + parseFloat(amount);
    }

    if (parseInt(totalamnt) < parseInt(QtyTot)) {
        //alert("Total Shipment Quantity Should Be Equal To Style Quantity...");
        var msg = 'Total Shipment Quantity Should Be Equal To Style Quantity...';
        var flg = 4;
        var mode = 1;
        AlartMessage(msg, flg, mode);
        return true;
    }

    var totqnty = [];
    var Rtotqnty = [];

    var t = 0;
    var r = 0;
    for (var d = 0; d < ShipmentItemList.length; d++) {
        if (ShipmentItemList[d].ItemModeType == 'Solid') {
            totqnty = [];
            var s = ShipmentItemList[d].SLNo;
            t = ShipmentItemList[d].Quantity;
            r = ShipmentItemList[d].Lotno;

            for (var e = 0; e < sepquanlistadd.length; e++) {
                if (sepquanlistadd[e].SSNO == s) {
                    totqnty.push(sepquanlistadd[e].Quantity);
                }
            }

            var totalamnt = 0;
            for (var e = 0; e < totqnty.length; e++) {
                var amount = totqnty[e];
                totalamnt = totalamnt + parseFloat(amount);
            }

            if (t < totalamnt || t > totalamnt) {
                //alert('Sum of assort details quantity must be equal to ship quantity for assort Number=' + r);
                var msg = 'Sum of assort details quantity must be equal to ship quantity for assort Number=' + r;
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }
            else {
                totqnty = [];
            }
        }

        if (ShipmentItemList[d].ItemModeType == 'Color/Size') {
            Rtotqnty = [];
            var s = ShipmentItemList[d].SLNo;
            t = ShipmentItemList[d].Quantity;
            r = ShipmentItemList[d].Lotno;

            for (var e = 0; e < sepitemlistadd.length; e++) {
                if (sepitemlistadd[e].SSNO == s) {
                    Rtotqnty.push(sepitemlistadd[e].Quantity);
                }
            }

            var totalamnt = 0;
            for (var e = 0; e < Rtotqnty.length; e++) {
                var amount = Rtotqnty[e];
                totalamnt = totalamnt + parseFloat(amount);
            }
            //totalamnt = $('#txttotrt').val();
            if (t < totalamnt || t > totalamnt) {
                //alert('Sum of assort details quantity must be equal to ship quantity for assort Number=' + r);
                //return true;
            }
            else {
                totqnty = [];
            }
        }
    }

    var ratiolist = [];
    var quanlist = [];

    if (itemlistadd.length > 0) {
        for (var i = 0; i < itemlistadd.length; i++) {
            var det = {
                //Buy_Ord_OrderDetId:,
                snumb: itemlistadd[i].snumb,
                ItemId: itemlistadd[i].ItemId,
                AllowQty: itemlistadd[i].AllowQty,
                PQty: itemlistadd[i].PQty,
                SizeId: itemlistadd[i].SizeId,
                Colorid: itemlistadd[i].ColorId,
                ComboId: itemlistadd[i].ComboId,
                Buy_Ord_Ship: itemlistadd[i].Buy_Ord_Ship,
                Ratio: itemlistadd[i].Ratio,
                Quantity: itemlistadd[i].Quantity,
                StyleRow: itemlistadd[i].StyleRow,
                ShipRow: itemlistadd[i].ShipRow,
                Order_no: $('#txtOrderNo').val(),
                SSNO: itemlistadd[i].SSNO,
                SizeRow: itemlistadd[i].SizeRow,
                ComboRow: itemlistadd[i].ComboRow
            }
            ratiolist.push(det);
            listof.push(det);
        }
    }

    if (quanlistadd.length > 0) {
        for (var i = 0; i < quanlistadd.length; i++) {
            var det = {
                // Buy_Ord_OrderDetId:,
                snumb: quanlistadd[i].snumb,
                ItemId: quanlistadd[i].ItemId,
                AllowQty: quanlistadd[i].AllowQty,
                PQty: quanlistadd[i].PQty,
                SizeId: quanlistadd[i].SizeId,
                Colorid: quanlistadd[i].ColorId,
                ComboId: quanlistadd[i].ComboId,
                Buy_Ord_Ship: quanlistadd[i].Buy_Ord_Ship,
                Ratio: quanlistadd[i].Quantity,
                Quantity: quanlistadd[i].Quantity,
                StyleRow: quanlistadd[i].StyleRow,
                ShipRow: quanlistadd[i].ShipRow,
                Order_no: $('#txtOrderNo').val(),
                SSNO: quanlistadd[i].SSNO,
                SizeRow: quanlistadd[i].SizeRow,
                ComboRow: quanlistadd[i].ComboRow
            }

            quanlist.push(det);
            listof.push(det);
        }
    }

    listof.sort(function (a, b) {
        return a.SSNO - b.SSNO
    })
    if (listof.length == 0) {
        //alert("Please Enter Atleast Any One Quantity in Assort Details..");
        var msg = 'Please Enter Atleast Any One Quantity in Assort Details';
        var flg = 4;
        var mode = 1;
        AlartMessage(msg, flg, mode);
        return true;
    }



    if (sepitemlistadd.length > 0) {
        for (var i = 0; i < sepitemlistadd.length; i++) {
            var det = {
                //Buy_Ord_OrderDetId:,
                snumb: sepitemlistadd[i].snumb,
                ItemId: sepitemlistadd[i].ItemId,
                AllowQty: sepitemlistadd[i].AllowQty,
                PQty: sepitemlistadd[i].PQty,
                SizeId: sepitemlistadd[i].SizeId,
                ComboId: sepitemlistadd[i].ComboId,
                Buy_Ord_Ship: sepitemlistadd[i].Buy_Ord_Ship,
                Ratio: sepitemlistadd[i].Ratio,
                Rate: sepitemlistadd[i].Rate,
                Quantity: sepitemlistadd[i].Quantity,
                StyleRow: sepitemlistadd[i].StyleRow,
                ShipRow: sepitemlistadd[i].ShipRow,
                Order_no: $('#txtOrderNo').val(),
                SSNO: sepitemlistadd[i].SSNO,
                SizeRow: sepitemlistadd[i].SizeRow,
                ComboRow: sepitemlistadd[i].ComboRow
            }
            //ratiolist.push(det);
            listofsep.push(det);
        }
    }

    if (sepquanlistadd.length > 0) {
        for (var i = 0; i < sepquanlistadd.length; i++) {
            var det = {
                // Buy_Ord_OrderDetId:,
                snumb: sepquanlistadd[i].snumb,
                ItemId: sepquanlistadd[i].ItemId,
                AllowQty: sepquanlistadd[i].AllowQty,
                PQty: sepquanlistadd[i].PQty,
                SizeId: sepquanlistadd[i].SizeId,
                ComboId: sepquanlistadd[i].ComboId,
                Buy_Ord_Ship: sepquanlistadd[i].Buy_Ord_Ship,
                Ratio: sepquanlistadd[i].Quantity,
                Rate: sepquanlistadd[i].Rate,
                Quantity: sepquanlistadd[i].Quantity,
                StyleRow: sepquanlistadd[i].StyleRow,
                ShipRow: sepquanlistadd[i].ShipRow,
                Order_no: $('#txtOrderNo').val(),
                SSNO: sepquanlistadd[i].SSNO,
                SizeRow: sepquanlistadd[i].SizeRow,
                ComboRow: sepquanlistadd[i].ComboRow
            }

            //quanlist.push(det);
            listofsep.push(det);
        }
    }

    listofsep.sort(function (a, b) {
        return a.SSNO - b.SSNO
    })


    ///check();
    var cnt = $("#tblShipAddSave tr").length - 1;
    var Data = "";

    SaveShipList = [];
    for (var i = 1; i <= cnt; i++) {

        var compItemObj = {
            ShipRowId: $("#tblShipAddSave tr:eq(" + i + ") td:eq(0)").html(),
            SLNo: $("#tblShipAddSave tr:eq(" + i + ") td:eq(1)").html(),
            Lotno: $("#tblShipAddSave tr:eq(" + i + ") td:eq(2)").html(),
            Ship_Date: $("#tblShipAddSave tr:eq(" + i + ") td:eq(3)").html(),
            Dest: $("#tblShipAddSave tr:eq(" + i + ") td:eq(4)").html(),
            Dest_Code: $("#tblShipAddSave tr:eq(" + i + ") td:eq(5)").html(),
            PortOfLoading: $("#tblShipAddSave tr:eq(" + i + ") td:eq(6)").html(),
            PortOfLoadingId: $("#tblShipAddSave tr:eq(" + i + ") td:eq(7)").html(),
            Quantity: $("#tblShipAddSave tr:eq(" + i + ") td:eq(8)").html(),
            UOM: $("#tblShipAddSave tr:eq(" + i + ") td:eq(9)").html(),
            UomID: $("#tblShipAddSave tr:eq(" + i + ") td:eq(10)").html(),
            ItemModeType: $("#tblShipAddSave tr:eq(" + i + ") td:eq(11)").html(),
            DelDate: $("#tblShipAddSave tr:eq(" + i + ") td:eq(12)").html(),
            AllowancePer: $("#tblShipAddSave tr:eq(" + i + ") td:eq(13)").html(),
            ProductionQty: $("#tblShipAddSave tr:eq(" + i + ") td:eq(14)").html(),
            ItemMode: $("#tblShipAddSave tr:eq(" + i + ") td:eq(15)").html(),
            Buy_Ord_Ship: $("#tblShipAddSave tr:eq(" + i + ") td:eq(16)").html(),
            // Buy_Ord_Ship: $('#txtShipNo').val(),
            Order_No: $('#txtOrderNo').val(),
            //Buy_Ord_MasId: 87,
            StyleId: $('#txtHStyleID').val(),
            StyleRowid: StyleRowId,
        };
        SaveShipList.push(compItemObj);
    }
    var ptype = $('input[name="PAType"]:checked').attr('value');
    var WoObj = {
        StylerowId: StyleRowId,
        StyleId: $('#txtHStyleID').val(),
        //Orderdate: new Date($('#txtEntryDate').val()),
        Orderdate: $('#txtEntryDate').val(),
        OrderNo: $('#txtOrderNo').val(),
        BuyerId: buyerid,
        CompanyId: companyid,// $('#txtCompanyId').val(),
        Remarks: $('#remarks').val(),
        EmployeeID: Guserid,
        lstprodShipwo: SaveShipList,
        lstprodItemwo: listof,
        Quantity: $('#txtQuantity').val(),
        ProcessunitId: $('#ddlprocessunit').val(),
        ProdUnitId: $('#ddlprodunit').val(),
        Workorder: $('#txtworkno').val(),
        ProductionQty: $('#txttotProdship').val(),
        //AllowancePer: $('#prodallowance').val(),

    };
    var objSubmit = {
        BuyOrdShipItem: ShipmentItemList,
        BuyOrdShipratio: listof,
        BuyOrdShipquan: listofsep,
        PA: ptype
    };
    $("#Add").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/BulkOrderShipment/SaveShipment",
        data: JSON.stringify({ ObjShipEn: objSubmit, Spm: WoObj }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == true) {
               // AddNotification();
                AddUserEntryLog('SalesManagement', 'BulkOrderShipment', 'ADD', $('#txtOrderNo').val());
                alert("Data Saved Successfully");
                var msg = 'Data Saved Successfully';
                var flg = 1;
                var mode = 1;
                AlartMessage(msg, flg, mode);
               
                //$('#myModal').modal('hide');

                var Id = GBMasId;
                var Mod = 1;
                window.location.href = "/StyleEntry/StyleEntryIndex?BMasId=" + Id + "=&Mode=" + Mod + "=&type=" + type;
            } else {

                window.location.href = "/Error/Index";

            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });

    //$.ajax({
    //    url: "/WorkOrder/Add",
    //    data: JSON.stringify(WoObj),
    //    type: "POST",
    //    contentType: "application/json;charset=utf-8",
    //    dataType: "json",
    //    success: function (result) {
    //        debugger;
    //        alert("Work Order has been successfully...");
    //        window.location.href = "/StyleEntry/StyleEntryIndex?BMasId=" + Id + "=&Mode=" + Mod;
    //        //window.location.href = "/StyleEntry/StyleEntryIndex?BMasId=" + Id + "=&Mode=" + Mod;
    //    },
    //    error: function (errormessage) {
    //        alert(errormessage.responseText);
    //    }
    //});
}

//$(document).on('click', '.btnshipItemview', function () {

//    debugger;

//    $('#tPKbody').DataTable().destroy();
//    $('#txttot').val("");

//    rowindex = $(this).closest('tr').index();
//    var curentro1 = ShipmentItemList.slice(rowindex);

//    var ShipRowId = curentro1[0]['ShipRowId'];
//    qty = curentro1[0]['Quantity'];
//    type = curentro1[0]['ItemModeType'];
//    allow = curentro1[0]['AllowancePer'];

//    Esln = curentro1[0]['SLNo'];

//    var sno = curentro1[0]['SLNo'];
//    //}
//    //var GroupId = "";
//    //var CompSlN0 = "";
//    var PackType = "";
//    //rowindex1 = $(this).closest('td').parent()[0].sectionRowIndex;
//    //var cur1 = ShipmentItemList.slice(rowindex1);
//    var SNo = $(this).closest('tr').find('td:eq(0)').html();
//    var PType = $(this).closest('tr').find('td:eq(7)').html();
//    var AlloPer = $(this).closest('tr').find('td:eq(9)').html();

//    GShipQty = $(this).closest('tr').find('td:eq(5)').html();
//    GSNo = $(this).closest('tr').find('td:eq(0)').html();

//    //alert(GShipQty);
//    //alert(GSNo);

//    var shiplist = [];
//    var qlist = [];
//    PackItemList = [];
//    //if (ShipRowId == 0) {
//    ClearPack();
//    if (PType == "Color/Size") {

//        if (itemlistadd.length > 0) {
//            for (var c = 0; c < itemlistadd.length; c++) {
//                if (itemlistadd[c].SSNO == SNo) {
//                    shiplist.push(itemlistadd[c]);
//                }
//            }
//            if (shiplist.length > 0) {
//                PackItemList = shiplist;

//                var totalamnt = 0;
//                for (var e = 0; e < shiplist.length; e++) {
//                    var amount = shiplist[e].Quantity;
//                    totalamnt = totalamnt + parseFloat(amount);

//                    var percentagecal = amount;
//                    var percenval = (percentagecal * AlloPer / 100);
//                    var allowval = percenval;
//                    shiplist[e].AllowQty = Math.ceil(percenval);
//                    shiplist[e].PQty = parseInt(amount) + parseInt(shiplist[e].AllowQty);

//                }
//                $('#txttot').val(totalamnt);
//                loadshconTab(shiplist);

//                SepPackItemList = $.grep(sepitemlistadd, function (v) {
//                    return (v.SSNO == SNo);
//                });
//                loadshconRatTab(SepPackItemList);
//                var totalamntsp = 0;
//                for (var q = 0; q < SepPackItemList.length; q++) {
//                    var amount = SepPackItemList[q].Quantity;
//                    totalamntsp = totalamntsp + parseFloat(amount);
//                }
//                $('#txttotrt').val(totalamntsp);
//            }
//            else {
//                Listsump("CS", SNo, StyleRowId);
//                Listsepsump("CS", SNo, StyleRowId);
//            }


//        }
//        else {

//            Listsump("CS", SNo, StyleRowId);
//            Listsepsump("CS", SNo, StyleRowId);
//        }

//    }

//    else if (PType == "Solid") {
//        if (quanlistadd.length > 0) {
//            for (var c = 0; c < quanlistadd.length; c++) {
//                if (quanlistadd[c].SSNO == SNo) {
//                    qlist.push(quanlistadd[c]);
//                }
//            }
//            if (qlist.length > 0) {
//                PackItemList = qlist;
//                var totalamnt = 0;
//                for (var e = 0; e < qlist.length; e++) {
//                    var amount = qlist[e].Quantity;
//                    totalamnt = totalamnt + parseFloat(amount);

//                    var percentagecal = amount;
//                    var percenval = (percentagecal * AlloPer / 100);
//                    var allowval = percenval;
//                    qlist[e].AllowQty = Math.ceil(percenval);
//                    qlist[e].PQty = parseInt(amount) + parseInt(qlist[e].AllowQty);
//                }
//                $('#txttot').val(totalamnt);
//                loadshconTable(qlist);

//                SepPackItemList = $.grep(sepquanlistadd, function (v) {
//                    return (v.SSNO == SNo);
//                });

//                loadshconQtyTab(SepPackItemList);
//                var totalamntsp = 0;
//                for (var q = 0; q < SepPackItemList.length; q++) {
//                    var amount = SepPackItemList[q].Quantity;
//                    totalamntsp = totalamntsp + parseFloat(amount);
//                }
//                $('#txttotrt').val(totalamntsp);
//            }
//            else {
//                Listsump("M", SNo, StyleRowId);
//                Listsepsump("M", SNo, StyleRowId);
//            }


//        }
//        else {
//            Listsump("M", SNo, StyleRowId);
//            Listsepsump("M", SNo, StyleRowId);
//        }


//    }


//});


$(document).ready(function () {

    $('#tblShipAdd').on('click', 'tr', function (e) {
        debugger;



        //$('#tPKbody').DataTable().destroy();

        var inputcount = 0;
        $('#tPKbody tr').each(function () {
            inputcount++;
        });

        if (inputcount > 0) {
            $('#tPKbody').DataTable().destroy();
        }
        $('#tPKbody').empty();

        $('#txttot').val("");




        var table = $('#tblShipAdd').DataTable();
        var row = $(this).closest('tr');
        var data = $('#tblShipAdd').dataTable().fnGetData(row);

        //var FSupplierId = data.ShipRowId;
        //var FSupplier = data.Supplier;


        rowindex = $(this).closest('tr').index();
        var curentro1 = ShipmentItemList.slice(rowindex);

        var ShipRowId = data.ShipRowId;//curentro1[0]['ShipRowId'];
        qty = data.Quantity;//curentro1[0]['Quantity'];
        Quan = data.Quantity;
        type = data.ItemModeType;//curentro1[0]['ItemModeType'];
        allow = data.AllowancePer;//curentro1[0]['AllowancePer'];

        Esln = data.SLNo;//curentro1[0]['SLNo'];

        var sno = data.SLNo;//curentro1[0]['SLNo'];
        //}
        //var GroupId = "";
        //var CompSlN0 = "";
        var PackType = "";
        //rowindex1 = $(this).closest('td').parent()[0].sectionRowIndex;
        //var cur1 = ShipmentItemList.slice(rowindex1);
        var SNo = $(this).closest('tr').find('td:eq(0)').html();
        var PType = $(this).closest('tr').find('td:eq(7)').html();
        var AlloPer = $(this).closest('tr').find('td:eq(9)').html();

        GShipQty = $(this).closest('tr').find('td:eq(5)').html();
        GSNo = $(this).closest('tr').find('td:eq(0)').html();

        //alert(GShipQty);
        //alert(GSNo);

        var shiplist = [];
        var qlist = [];
        PackItemList = [];
        //if (ShipRowId == 0) {
        ClearPack();
        if (PType == "Color/Size") {
            debugger;
            if (itemlistadd.length > 0) {
                for (var c = 0; c < itemlistadd.length; c++) {
                    if (itemlistadd[c].SSNO == SNo) {
                        shiplist.push(itemlistadd[c]);
                    }
                }
                if (shiplist.length > 0) {
                    PackItemList = shiplist;

                    var totalamnt = 0;
                    for (var e = 0; e < shiplist.length; e++) {
                        var amount = shiplist[e].Quantity;
                        totalamnt = totalamnt + parseFloat(amount);

                        var percentagecal = amount;
                        var percenval = (percentagecal * AlloPer / 100);
                        var allowval = percenval;

                        if (percenval <= 0.5) {
                            var res = 0;
                        } else if (percenval < 1) {
                            var res = Math.ceil(percenval);
                        }
                        else {
                            var res = Math.round(percenval);
                        }
                        shiplist[e].AllowQty = res;
                        //shiplist[e].AllowQty = Math.ceil(res);
                        shiplist[e].PQty = parseInt(amount) + parseInt(shiplist[e].AllowQty);

                    }
                    $('#txttot').val(qty);
                    loadshconTab(shiplist);
                    debugger;
                    SepPackItemList = $.grep(sepitemlistadd, function (v) {
                        return (v.SSNO == SNo);
                    });
                    loadshconRatTab(SepPackItemList);
                    //var totalamntsp = 0;
                    //for (var q = 0; q < SepPackItemList.length; q++) {
                    //    var amount = SepPackItemList[q].Quantity;
                    //    totalamntsp = totalamntsp + parseFloat(amount);
                    //}
                    //$('#txttotrt').val(qty);
                }
                else {
                    Listsump("CS", SNo, StyleRowId);
                    Listsepsump("CS", SNo, StyleRowId);
                }


            }
            else {

                Listsump("CS", SNo, StyleRowId);
                Listsepsump("CS", SNo, StyleRowId);
            }

        }

        else if (PType == "Solid") {
            if (quanlistadd.length > 0) {
                for (var c = 0; c < quanlistadd.length; c++) {
                    if (quanlistadd[c].SSNO == SNo) {
                        qlist.push(quanlistadd[c]);
                    }
                }
                if (qlist.length > 0) {
                    PackItemList = qlist;
                    var totalamnt = 0;
                    for (var e = 0; e < qlist.length; e++) {
                        var amount = qlist[e].Quantity;
                        totalamnt = totalamnt + parseFloat(amount);

                        var percentagecal = amount;
                        var percenval = (percentagecal * AlloPer / 100);
                        var allowval = percenval;

                        if (percenval <= 0.5) {
                            var res = 0;
                        } else if (percenval < 1) {
                            var res = Math.ceil(percenval);
                        }
                        else {
                            var res = Math.round(percenval);
                        }

                        qlist[e].AllowQty = res;
                        //qlist[e].AllowQty = Math.ceil(percenval);
                        qlist[e].PQty = parseInt(amount) + parseInt(qlist[e].AllowQty);
                    }
                    $('#txttot').val(totalamnt);
                    loadshconTable(qlist);

                    SepPackItemList = $.grep(sepquanlistadd, function (v) {
                        return (v.SSNO == SNo);
                    });

                    loadshconQtyTab(SepPackItemList);
                    var totalamntsp = 0;
                    for (var q = 0; q < SepPackItemList.length; q++) {
                        var amount = SepPackItemList[q].Quantity;
                        totalamntsp = totalamntsp + parseFloat(amount);
                    }
                    $('#txttotrt').val(totalamntsp);
                }
                else {
                    Listsump("M", SNo, StyleRowId);
                    Listsepsump("M", SNo, StyleRowId);
                }


            }
            else {
                Listsump("M", SNo, StyleRowId);
                Listsepsump("M", SNo, StyleRowId);
            }


        }

    });
});



function loadrate() {


    if (sepitemlistadd.length == 0 && sepquanlistadd.length == 0) {
        //alert('Please fill atleast any one quantity...');
        var msg = 'Please fill atleast any one quantity';
        var flg = 4;
        var mode = 1;
        AlartMessage(msg, flg, mode);
        return true;
    }

    if (sepitemlistadd.length > 0) {
        for (var q = 0; q < sepitemlistadd.length; q++) {
            if (sepitemlistadd[q].SSNO == SSNO) {
                sepitemlistadd[q].Rate = ShipRate;
            }
        }
    }


    if (sepquanlistadd.length > 0) {
        for (var f = 0; f < sepquanlistadd.length; f++) {
            if (sepquanlistadd[f].SSNO == SSNO) {
                sepquanlistadd[f].Rate = ShipRate;
            }
        }
    }

    var septable = $('#tPKcsbody').DataTable();
    var sepdata = septable.rows().data();

    $('input[id=txtshiprate]').each(function (ig) {
        if (sepdata[ig].SSNO == SSNO) {
            var row = $(this).closest('tr');
            row.find('#txtshiprate').val(ShipRate);

        }
    });
}
function Listsump(PType, SNo, StyleRowId) {
    debugger;
    $.ajax({
        url: "/BulkOrderShipment/ListPackDetails",
        data: JSON.stringify({ SNo: SNo, PackType: PType, StyleRowId: StyleRowId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            PackItemList = result;

            if (idinsertflg == 1) {
                if (type == "Color/Size") {

                    for (i = 0; i < PackItemList.length; i++) {

                        for (j = 0; j < itm.length; j++) {

                            if (i == j) {
                                PackItemList[i].Buy_Ord_DetId = itm[j].Buy_Ord_DetId;
                            }
                        }
                    }
                    loadshconTab(PackItemList);
                }
                else if (type == "") {
                    PackItemList = [];
                    loadshconTable(PackItemList);
                }

                if (type == "Solid") {
                    for (i = 0; i < PackItemList.length; i++) {

                        for (j = 0; j < quan.length; j++) {

                            if (i == j) {
                                PackItemList[i].Buy_Ord_DetId = quan[j].Buy_Ord_DetId;
                            }
                        }
                    }
                    loadshconTable(PackItemList);
                }
            }
            else if (idinsertflg == 2) {
                if (type == "Color/Size") {

                    for (i = 0; i < PackItemList.length; i++) {

                        for (j = 0; j < itm.length; j++) {

                            if (i == j) {
                                PackItemList[i].Buy_Ord_DetId = itm[j].Buy_Ord_DetId;
                            }
                        }
                    }
                    loadshconTab(PackItemList);
                }
                else if (type == "") {
                    PackItemList = [];
                    loadshconTable(PackItemList);
                }

                if (type == "Solid") {
                    for (i = 0; i < PackItemList.length; i++) {

                        for (j = 0; j < quan.length; j++) {

                            if (i == j) {
                                PackItemList[i].Buy_Ord_DetId = quan[j].Buy_Ord_DetId;
                            }
                        }
                    }
                    loadshconTable(PackItemList);
                }

            }
            else {

                if (type == "Color/Size") {
                    loadshconTab(PackItemList);
                }
                else if (type == "") {
                    PackItemList = [];
                    loadshconTable(PackItemList);
                }

                if (type == "Solid") {
                    loadshconTable(PackItemList);
                }
            }
            //loadPackAddTable(PackItemList);
            //loadEshconTable(PackItemList);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}


function Listsepsump(PType, SNo, StyleRowId) {
    debugger;
    $.ajax({
        url: "/BulkOrderShipment/ListPackSepDetails",
        data: JSON.stringify({ SNo: SNo, PackType: PType, StyleRowId: StyleRowId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            SepPackItemList = result;
            if (idinsertflg == 1) {
                if (type == "Color/Size") {

                    for (i = 0; i < sepitm.length; i++) {

                        for (j = 0; j < SepPackItemList.length; j++) {

                            if (i == j) {
                                SepPackItemList[j].Buy_Ord_OrderDetId = sepitm[i].Buy_Ord_OrderDetId;
                            }
                        }
                    }
                    loadshconRatTab(SepPackItemList);
                    if (ShRowId > 0 && Mod == 1) {
                        for (var f = 0; f < SepPackItemList.length; f++) {
                            SepPackItemList[f].ShipRow = ShRowId;
                            SepPackItemList[f].Buy_Ord_Ship = ShNo
                        }
                    }
                }
                else if (type == "") {
                    SepPackItemList = [];
                    loadshconQtyTab(SepPackItemList);
                }
                if (type == "Solid") {
                    for (i = 0; i < SepPackItemList.length; i++) {

                        for (j = 0; j < sepquan.length; j++) {

                            if (i == j) {
                                SepPackItemList[i].Buy_Ord_OrderDetId = sepquan[j].Buy_Ord_OrderDetId;
                            }
                        }
                    }
                    loadshconQtyTab(SepPackItemList);
                    if (ShRowId > 0 && Mod == 1) {
                        for (var f = 0; f < SepPackItemList.length; f++) {
                            SepPackItemList[f].ShipRow = ShRowId;
                            SepPackItemList[f].Buy_Ord_Ship = ShNo
                        }
                    }
                }
            }
            else if (idinsertflg == 2) {
                if (type == "Color/Size") {

                    for (i = 0; i < sepitm.length; i++) {

                        for (j = 0; j < SepPackItemList.length; j++) {

                            if (i == j) {
                                SepPackItemList[j].Buy_Ord_OrderDetId = sepitm[i].Buy_Ord_OrderDetId;
                            }
                        }
                    }
                    loadshconRatTab(SepPackItemList);
                    if (ShRowId > 0 && Mod == 1) {
                        for (var f = 0; f < SepPackItemList.length; f++) {
                            SepPackItemList[f].ShipRow = ShRowId;
                            SepPackItemList[f].Buy_Ord_Ship = ShNo
                        }
                    }
                }
                else if (type == "") {
                    SepPackItemList = [];
                    loadshconQtyTab(SepPackItemList);
                }
                if (type == "Solid") {
                    for (i = 0; i < SepPackItemList.length; i++) {

                        for (j = 0; j < sepquan.length; j++) {

                            if (i == j) {
                                SepPackItemList[i].Buy_Ord_OrderDetId = sepquan[j].Buy_Ord_OrderDetId;
                            }
                        }
                    }
                    loadshconQtyTab(SepPackItemList);
                    if (ShRowId > 0 && Mod == 1) {
                        for (var f = 0; f < SepPackItemList.length; f++) {
                            SepPackItemList[f].ShipRow = ShRowId;
                            SepPackItemList[f].Buy_Ord_Ship = ShNo
                        }
                    }
                }
            }
            else {
                if (type == "Color/Size") {
                    loadshconRatTab(SepPackItemList);


                    if (ShRowId > 0 && Mod == 1) {
                        for (var f = 0; f < SepPackItemList.length; f++) {
                            SepPackItemList[f].ShipRow = ShRowId;
                            SepPackItemList[f].Buy_Ord_Ship = ShNo
                        }
                    }
                }
                else if (type == "") {
                    SepPackItemList = [];

                    loadshconQtyTab(SepPackItemList);
                }

                if (type == "Solid") {
                    loadshconQtyTab(SepPackItemList);

                    if (ShRowId > 0 && Mod == 1) {
                        for (var f = 0; f < SepPackItemList.length; f++) {
                            SepPackItemList[f].ShipRow = ShRowId;
                            SepPackItemList[f].Buy_Ord_Ship = ShNo
                        }
                    }
                }


            }
            //loadPackAddTable(PackItemList);
            //loadEshconTable(PackItemList);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function loadshconRatTab(list) {
    //$('#tPKcsbody').DataTable().destroy();
    debugger;



    var inputcount = 0;
    $('#tPKcsbody tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tPKcsbody').DataTable().destroy();
    }
    $('#tPKcsbody').empty();
    //$('#tCPIbody').DataTable().destroy();
    //list.sort(function (a, b) {
    //    return a.CPlanSlNo - b.CPlanSlNo;
    //})

    $('#tPKcsbody').DataTable({
        data: list,
        scrollY: 150,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        bSort: false,
        columns: [

            { title: "Buy_Ord_OrderDetId", data: "Buy_Ord_OrderDetId", "visible": false },
             { title: "SNo", data: "snumb", "visible": false },
            { title: "SSNO", data: "SSNO", "visible": false },
            { title: "SizeId", data: "SizeId", "visible": false },
            { title: "ComboId", data: "ComboId", "visible": false },
            { title: "Style Row", data: "StyleRow", "visible": false },
            { title: "Color", data: "Color" },
            { title: "Size", data: "Size" },
            { title: "Ship Row", data: "ShipRow", "visible": false },
            { title: "Combo Row", data: "ComboRow", "visible": false },
            {
                title: "Ratio", data: "Ratio",
                render: function (data) {

                    return '<input type="text" id="txtshipQty"  class="form-control calcratio"  maxlength="10" style="width: 100px;text-align: center;" value=' + data + '>';

                },
            },
            {
                title: "Quantity", data: "Quantity",
                render: function (data) {

                    return '<input type="text" id="txtshipRTQty" class="form-control calcqty" disabled style="width: 100px;text-align: center;" value=' + data + '>';

                },
            },
            {
                title: "Rate", data: "Rate",

                render: function (data) {
                    if (EnbAssRate == "Y") {
                        return '<input type="text" id="txtshiprate"  class="txtshiprate form-control" disabled style="width: 100px;text-align: right;" value=' + data + '>';
                    }
                    else {
                        return '<input type="text" id="txtshiprate"  class="txtshiprate form-control" style="width: 100px;text-align: right;" value=' + data + '>';
                    }
                },
            },
           { title: "ShipNo", data: "Buy_Ord_Ship", "visible": false },
             {
                 title: "ACTION", "mDataProp": null, "visible": false,
                 "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Submit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnPAdd btn-round btn btn-success"> <i class="fa fa-check"></i> </button>'
                 // "sDefaultContent": '<button type="button" class="btnPAdd"> Submit </button><button type="button" class="btnPEdit"> Edit </button> '
                 //"sDefaultContent": '<button type="button" class="btnPAdd btn-round btn btn-success"> Submit </button>'
             }



        ]


    });

    var atotalamnt = 0;
    for (var e = 0; e < list.length; e++) {
        var aamount = list[e].Quantity;
        atotalamnt = atotalamnt + parseFloat(aamount);

    }
    $('#txttotrt').val(atotalamnt);


    ////var totalamntsp = 0;
    ////for (var q = 0; q < SepPackItemList.length; q++) {
    ////    var amount = SepPackItemList[q].Quantity;
    ////    totalamntsp = totalamntsp + parseFloat(amount);
    ////}
    ////$('#txttotrt').val(qty);
}


function loadshconQtyTab(list) {
    //$('#tPKcsbody').DataTable().destroy();
    debugger;
    var inputcount = 0;
    $('#tPKcsbody tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tPKcsbody').DataTable().destroy();
    }
    $('#tPKcsbody').empty();
    //$('#tCPIbody').DataTable().destroy();
    //list.sort(function (a, b) {
    //    return a.CPlanSlNo - b.CPlanSlNo;
    //})
    $('#tPKcsbody').DataTable({
        data: list,
        scrollY: 150,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        bSort: false,
        columns: [

            { title: "Buy_Ord_OrderDetId", data: "Buy_Ord_OrderDetId", "visible": false },
             { title: "SNo", data: "snumb", "visible": false },
            { title: "SSNO", data: "SSNO", "visible": false },
            { title: "SizeId", data: "SizeId", "visible": false },
            { title: "ComboId", data: "ComboId", "visible": false },
            { title: "Style Row", data: "StyleRow", "visible": false },
            { title: "Color", data: "Color" },
            { title: "Size", data: "Size" },
            { title: "Ship Row", data: "ShipRow", "visible": false },
            { title: "Combo Row", data: "ComboRow", "visible": false },
            {
                title: "Ratio", data: "Ratio", "visible": false,
                render: function (data) {

                    return '<input type="text" id="txtshipQty" class="form-control calcratio" maxlength="10" style="width: 100px;text-align: center;" value=' + data + '>';

                },
            },
            {
                title: "Quantity", data: "Quantity",
                render: function (data) {

                    return '<input type="text" id="txtshipRTQty"  class="form-control calcqty" style="width: 100px;text-align: center;" value=' + data + '>';

                },
            },
            {
                title: "Rate", data: "Rate",
                render: function (data) {
                    if (EnbAssRate == "Y") {
                        return '<input type="text" id="txtshiprate"  class="txtshiprate form-control" disabled style="width: 100px;text-align: right;" value=' + data + '>';
                    } else {
                        return '<input type="text" id="txtshiprate"  class="txtshiprate form-control" style="width: 100px;text-align: right;" value=' + data + '>';
                    }
                },


            },
           { title: "ShipNo", data: "Buy_Ord_Ship", "visible": false },
             {
                 title: "ACTION", "mDataProp": null, "visible": false,
                 "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Submit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnPAdd btn-round btn btn-success"> <i class="fa fa-check"></i> </button>'
                 // "sDefaultContent": '<button type="button" class="btnPAdd"> Submit </button><button type="button" class="btnPEdit"> Edit </button> '
                 //"sDefaultContent": '<button type="button" class="btnPAdd btn-round btn btn-success"> Submit </button>'
             }

        ]


    });

    var atotalamnt = 0;
    for (var e = 0; e < list.length; e++) {
        var aamount = list[e].Quantity;
        atotalamnt = aamount + parseFloat(aamount);

    }
    $('#txttotrt').val(atotalamnt);
}
function loadshconTab(copsListObj) {

    debugger;
    var inputcount = 0;
    $('#tPKbody tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tPKbody').DataTable().destroy();
    }
    $('#tPKbody').empty();

    $('#tPKbody').DataTable({
        data: copsListObj,
        scrollY: 150,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        bSort: false,
        columns: [

            { title: "Buy_Ord_OrderDetId", data: "Buy_Ord_OrderDetId", "visible": false },
             { title: "SNo", data: "snumb", "visible": false },
            { title: "SSNO", data: "SSNO", "visible": false },
            { title: "ItemId", data: "ItemId", "visible": false },
              { title: "Color", data: "Color" },
            { title: "Item", data: "Item" },
            { title: "SizeId", data: "SizeId", "visible": false },
            { title: "ComboId", data: "ComboId", "visible": false },
            { title: "Style Row", data: "StyleRow", "visible": false },
            { title: "Size", data: "Size" },
            { title: "Ship Row", data: "ShipRow", "visible": false },
            { title: "Combo Row", data: "ComboRow", "visible": false },
            {
                title: "Ratio", data: "Ratio", "visible": false,
                render: function (data) {

                    return '<input type="text" id="txtshipratioQty"  class="form-control"  style="width: 100px;text-align: center;" value=' + data + '>';

                },
            },
            {
                title: "Quantity", data: "Quantity",
                render: function (data) {

                    return '<input type="text" id="txtshipRatQty" class="form-control" disabled style="width: 100px;text-align: center;" value=' + data + '>';

                },
            },
            {
                title: "Allowance", data: "AllowQty",
                render: function (data) {

                    return '<input type="text" id="txtallRatQty" class="form-control" disabled style="width: 100px;text-align: center;" value=' + data + '>';

                },

            },
            {
                title: "Prod Qty", data: "PQty",
                render: function (data) {

                    return '<input type="text" id="txtshipPrdQty" class="PrdQtyCalc form-control" style="width: 100px;text-align: center;" value=' + data + '>';

                },
            },
           { title: "ShipNo", data: "Buy_Ord_Ship", "visible": false },
             {
                 title: "ACTION", "mDataProp": null, "visible": false,
                 "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Submit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnPAdd btn-round btn btn-success"> <i class="fa fa-check"></i> </button>'
                 // "sDefaultContent": '<button type="button" class="btnPAdd"> Submit </button><button type="button" class="btnPEdit"> Edit </button> '
                 //"sDefaultContent": '<button type="button" class="btnPAdd btn-round btn btn-success"> Submit </button>'
             }



        ]


    });

    var totalamnt = 0;
    for (var e = 0; e < copsListObj.length; e++) {
        var amount = copsListObj[e].Quantity;
        totalamnt = totalamnt + parseFloat(amount);

    }
    $('#txttot').val(totalamnt);




    var totalPamnt = 0;
    for (var e = 0; e < copsListObj.length; e++) {
        var Pamount = copsListObj[e].PQty;
        totalPamnt = totalPamnt + parseFloat(Pamount);

    }
    $('#txtPtot').val(totalPamnt);
}


function loadshconTable(copsListObj) {
    //$('#tPKbody').DataTable().destroy();
    //debugger;
    var inputcount = 0;
    $('#tPKbody tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tPKbody').DataTable().destroy();
    }
    $('#tPKbody').empty();

    $('#tPKbody').DataTable({
        data: copsListObj,
        scrollY: 150,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        bSort: false,
        columns: [

            { title: "Buy_Ord_OrderDetId", data: "Buy_Ord_OrderDetId", "visible": false },
             { title: "SNo", data: "snumb", "visible": false },
            { title: "SSNO", data: "SSNO", "visible": false },
            { title: "ItemId", data: "ItemId", "visible": false },
             { title: "Color", data: "Color" },
            { title: "Item", data: "Item" },
            { title: "SizeId", data: "SizeId", "visible": false },
            { title: "ComboId", data: "ComboId", "visible": false },
            { title: "Style Row", data: "StyleRow", "visible": false },

            { title: "Size", data: "Size" },
            { title: "Ship Row", data: "ShipRow", "visible": false },
            { title: "Combo Row", data: "ComboRow", "visible": false },
             { title: "Ratio", data: "Ratio", "visible": false },
            {
                title: "Quantity", data: "Quantity",
                render: function (data) {

                    return '<input type="text" id="txtshipQty"  class="form-control" disabled  style="width: 100px;text-align: center;" value=' + data + '>';

                },
            },
            {
                title: "Allowance", data: "AllowQty",
                render: function (data) {

                    return '<input type="text" id="txtallQty"  class="form-control" disabled  style="width: 100px;text-align: center;" value=' + data + '>';

                },
            },
            {
                title: "Prod Qty", data: "PQty",
                render: function (data) {

                    return '<input type="text" id="txtqtyPrdQty" class="qtPrdQtyCalc form-control" style="width: 100px;text-align: center;" value=' + data + '>';

                },
            },
           { title: "ShipNo", data: "Buy_Ord_Ship", "visible": false },
             {
                 title: "ACTION", "mDataProp": null, "visible": false,
                 "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Submit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnPAdd btn-round btn btn-success"> <i class="fa fa-check"></i> </button>'
                 // "sDefaultContent": '<button type="button" class="btnPAdd"> Submit </button><button type="button" class="btnPEdit"> Edit </button> '
                 //"sDefaultContent": '<button type="button" class="btnPAdd btn-round btn btn-success"> Submit </button>'
             }



        ]


    });
    var totalamnt = 0;
    for (var e = 0; e < copsListObj.length; e++) {
        var amount = copsListObj[e].Quantity;
        totalamnt = totalamnt + parseFloat(amount);

    }
    $('#txttot').val(totalamnt);

    var totalPamnt = 0;
    for (var e = 0; e < copsListObj.length; e++) {
        var Pamount = copsListObj[e].PQty;
        totalPamnt = totalPamnt + parseFloat(Pamount);

    }
    $('#txtPtot').val(totalPamnt);
}


function PrdQtyCalc(val) {
    debugger;

}
function LoadPackApply() {
    debugger;



    var totalamnt = 0;
    for (var e = 0; e < PackItemList.length; e++) {
        var amount = PackItemList[e].Ratio;
        totalamnt = totalamnt + parseFloat(amount);

    }

    $('#txttot').val(totalamnt.toFixed(3));
    var tot = $('#txttot').val();

    for (var g = 0; g < PackItemList.length; g++) {
        var q = PackItemList[g].Ratio;
        var quan = (qty / tot) * q;
        PackItemList[g].Quantity = quan;
    }

    loadEshconTable(PackItemList);



}




$(document).on('click', '.btnPAdd', function () {
    debugger;

    if (ShipmentItemList.length == 0) {

        //alert("Please Select the Shipment Details");
        var msg = 'Please Select the Shipment Details';
        var flg = 4;
        var mode = 1;
        AlartMessage(msg, flg, mode);
        return true;
    }

    var CSlNo = 0;
    var CompSlNo = 0;
    var Qty, Width, Gsm, Gram, Wght, TGram, TWght = 0;

    rowindex = $(this).closest('tr').index();

    var currentro125 = PackItemList.slice(rowindex);

    var SiId = currentro125[0]['SizeId'];
    var CmID = currentro125[0]['ComboId'];
    var StyRID = currentro125[0]['StyleRow'];
    var CrName = currentro125[0]['Color'];
    var Size = currentro125[0]['Size'];
    var SSlNo = currentro125[0]['SSNO'];
    var ShiId = currentro125[0]['ShipRow'];
    var BODetID = currentro125[0]['Buy_Ord_OrderDetId'];
    var ComRow = currentro125[0]['ComboRow'];
    var sno = currentro125[0]['snumb'];
    //NPQty = $(this).closest('tr').find('#txtshipQty').val();



    Qty = $(this).closest('tr').find('#txtshipQty').val();

    if (Qty == 0) {
        //alert("Pleae Enter Quantity Pack Qty");
        var msg = 'Pleae Enter Quantity Pack Qty';
        var flg = 4;
        var mode = 1;
        AlartMessage(msg, flg, mode);
        return true;
    }
    var copsListObj = {
        SizeId: SiId,
        ComboId: CmID,
        StyleRow: StyRID,
        Color: CrName,
        Size: Size,
        SSNO: SSlNo,
        Quantity: Qty,
        ShipRow: ShiId,
        Buy_Ord_OrderDetId: BODetID,
        ComboRow: ComRow,
        snumb: sno

    };

    //validate ship qty in pack

    if (Mod == 0) {



        var DQty = 0;
        rowindex = $(this).closest('tr').index();
        var curentro1 = PackItemList.slice(rowindex);

        var SNo = $(this).closest('tr').find('td:eq(0)').html();
        var CQty = $(this).closest('tr').find('#txtshipQty').val();

        if (parseInt(SNo) == parseInt(GSNo)) {
            if (parseInt(CQty) > parseInt(GShipQty)) {
                //alert("PackQty Does Not Exists then ShipQty");
                var msg = 'PackQty Does Not Exists then ShipQty';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }
        }

        if (CQty == 0) {
            DQty == CQty;
        } else {
            DQty = parseInt(DQty) + parseInt(CQty);
        };

        //alert(DQty
        //    );

    }



    if (Mod == 0) {

        var cnt = $("#tblPack1 tr").length - 1;

        var Data = "";

        // PackItemList = [];
        for (var i = 1; i <= cnt; i++) {

            var OSSNO = $("#tblPack1 tr:eq(" + i + ") td:eq(1)").html();
            var OComboId = $("#tblPack1 tr:eq(" + i + ") td:eq(3)").html();
            var OSizeId = $("#tblPack1 tr:eq(" + i + ") td:eq(2)").html();
            var OStyleRow = $("#tblPack1 tr:eq(" + i + ") td:eq(4)").html();
            var OQuantity = $("#tblPack1 tr:eq(" + i + ") td:eq(7)").html();



        }

        if (PackItemListN.length > 0) {
            //if (OComboId == CmID && OSizeId == SiId) {
            //    alert("Color and Size Already Exists");
            //    $('#txtshipQty').keyup(function () {
            //        debugger;
            //        table.search($(this).val()).draw();
            //    })
            //    return true;


            //}
        }


    }
    PackItemListN.push(copsListObj);

    if (Mod == 0) {
        if (parseInt(SNo) == parseInt(GSNo)) {
            if (NPQty == 0) {
                NPQty = copsListObj.Quantity
            } else {
                NPQty = parseInt(NPQty) + parseInt(copsListObj.Quantity)
            };

            //if (parseInt(NPQty) > parseInt(GShipQty)) {
            //  alert("PackQty Does Not Exists then ShipQty");
            //  return true;
            //

            var cnt = $("#tblPack1 tr").length - 1;

            var Data = "";

            var Gtot = 0;
            var tot = 0;
            for (var i = 1; i <= cnt; i++) {

                var OSSNO = $("#tblPack1 tr:eq(" + i + ") td:eq(1)").html();
                var OComboId = $("#tblPack1 tr:eq(" + i + ") td:eq(3)").html();
                var OSizeId = $("#tblPack1 tr:eq(" + i + ") td:eq(2)").html();
                var OStyleRow = $("#tblPack1 tr:eq(" + i + ") td:eq(4)").html();
                var OQuantity = $("#tblPack1 tr:eq(" + i + ") td:eq(7)").html();

                tot += parseInt(OQuantity);

            }
            //Gtot == parseInt(tot);
            //alert(tot);

            FQty = parseInt(tot);

            //alert(FQty);

            //}
            //
            if (parseInt(OSSNO) == parseInt(GSNo)) {
                //if (parseInt(FQty) > parseInt(GShipQty)) {
                //    alert("PackQty Does Not Exists then ShipQty");
                //    return true;
                //}
            }


            // }
        }
    }
    // alert(NPQty);


    loadEshconTable(copsListObj);
    //alert("Update Sucessfully");
    var msg = 'Update Sucessfully';
    var flg = 1;
    var mode = 1;
    AlartMessage(msg, flg, mode);

});


$(document).ready(function () {



    LoadCountryDDL("#ddlDest");
    LoadUomDDL("#ddlUom");
    LoadPortOfLoadingDDL("#ddlPort");
});

function clearTextBox() {


    $('#ddlItem').val("");
    $('#ddlColor').val("");
    $('#ddlSize').val("");
    $('#ddluom').val("");
    $('#ddlPckType').val(0);
    $('#ddlPort').val(0);
    $('#txtAssort').val("");
    $('#txtShipQuantity').val("");
    $('#txtShipDate').val("");

    $('#ddlItem').css('border-color', 'lightgrey');
    $('#ddlColor').css('border-color', 'lightgrey');
    $('#ddlSize').css('border-color', 'lightgrey');
    $('#ddluom').css('border-color', 'lightgrey');
    $('#txtQuantity').css('border-color', 'lightgrey');
    LoadCountryDDL("#ddlDest");
    LoadUomDDL("#ddlUom");
    LoadPortOfLoadingDDL("#ddlPort");

}

//Valdidation using jquery
function validate() {

    var isValid = true;
    if ($('#txtShipQuantity').val().trim() == "") {
        $('#txtShipQuantity').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtShipQuantity').css('border-color', 'lightgrey');
    }


    if ($('#ddlUom').val() == 0) {
        $('#ddlUom').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlUom').css('border-color', 'lightgrey');
    }
    if ($('#ddlPort').val() == 0) {
        $('#ddlPort').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlPort').css('border-color', 'lightgrey');
    }
    if ($('#ddlDest').val() == 0) {
        $('#ddlDest').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlDest').css('border-color', 'lightgrey');
    }
    return isValid;
}

//function Close() {

//    var Mod = 1;
//    window.location.href = "/StyleEntry/StyleEntryIndex?BMasId=" + Id + "=&Mode=" + Mod + "=&type=" + type;
//   // $('#myModal').modal('hide');
//}

function LoadMainDetails(StyleRowId) {
    $.ajax({
        url: "/PlanningAdd/GetPlanDetails",
        data: JSON.stringify({ StyleRowid: StyleRowId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            debugger;
            if (obj != undefined) {
                $('#txtOrderNo').val(obj[0]["Order_No"]);
                $('#txtRefNo').val(obj[0]["Ref_no"]);
                $('#txtStyle').val(obj[0]["Style"]);
                $('#txtQuantity').val(obj[0]["OrderQty"]);
                $('#txtBuyer').val(obj[0]["buyer"]);
                $('#txtHStyleID').val(obj[0]["StyleID"]);
                $('#txtEntryDate').val(moment(obj[0]["EDate"]).format('DD/MM/YYYY'));
                $('#txtHGUomID').val(obj[0]["GUomID"]);
                $('#txtHGUom').val(obj[0]["GUom"]);
                buyerid = obj[0]["buyerid"];
                companyid = obj[0]["CompanyID"];
                OType = obj[0]["Type"];
                GCon = obj[0]["GUomCon"];
                LockDet();
                var WorkNo = $("#txtworkno").val();

                DispatchClosed = obj[0]["Despatch_Closed"];

                //LoadCheckWorkPlanDetails(WorkNo);

                if (WorkNo == "") {
                    GenerateNumber();
                }


                var BMasId = obj[0]["BMasID"];

                GBMasId = BMasId;

                if (Mod == 0) {
                    $('#Add').show();
                    $('#Update').hide();
                    $('#Delete').hide();

                    if (buyerid > 0) {
                        $.ajax({
                            url: "/Buyer/getbyID/" + buyerid,
                            typr: "GET",
                            contentType: "application/json;charset=UTF-8",
                            dataType: "json",
                            success: function (result) {
                                debugger;
                                var obj = result.Value;                  
                                $('#ddlPort').val(obj.PortLoad).trigger('change');
                                $('#ddlDest').val(obj.PortDestination).trigger('change');
                                $('#txtallowance').val(obj.Allowence);                             
                            },
                            error: function (errormessage) {
                                alert(errormessage.responseText);
                            }
                        });
                    }
                }
                else if (Mod == 1) {
                   // $('#Update').show();

                    if (DispatchClosed == "N") {
                        $('#Update').show();
                    }
                    else if (DispatchClosed == "Y") {
                        $('#Update').hide();
                    }

                    $('#Add').hide();
                    $('#Delete').hide();

                } else if (Mod == 2) {
                    $('#Update').hide();
                    $('#Add').hide();

                    if (DispatchClosed == "N") {
                        $('#Delete').show();
                    }
                    else if (DispatchClosed == "Y") {
                        $('#Delete').hide();
                    }
                   // $('#Delete').show();

                }

                if (OrdApp == 'Y') {
                    $('#Update').hide();
                    $('#Add').hide();
                    $('#Delete').hide();
                }
                $('#myModal').modal('show');


                EditDetShipPlanList(StyleRowId);
                EditDetTotalPackList(StyleRowId);
                EditDetTotSepPackList(StyleRowId);

            }
            else {

            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function EditDetShipPlanList(StyleRowId) {


    debugger;

    $.ajax({
        url: "/BulkOrderShipment/ListShipEditDetails",
        data: JSON.stringify({ StyleRowId: StyleRowId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            ShipmentItemList = result;

            if (ShipmentItemList.length > 0) {
                allow = ShipmentItemList[0].AllowancePer;
            }
            //for (var c = 0; c < ShipmentItemList.length; c++) {
            //    itmmode.push(ShipmentItemList[c].ItemMode);
            //}

            for (var f = 0; f < ShipmentItemList.length; f++) {
                ShipmentItemList[f].Ship_Date = moment(ShipmentItemList[f]["Ship_Date"]).format('DD/MM/YYYY');
                ShipmentItemList[f].DelDate = moment(ShipmentItemList[f]["DelDate"]).format('DD/MM/YYYY');
            }
            var totalqy = 0;
            for (var g = 0; g < ShipmentItemList.length; g++) {

                var qy = ShipmentItemList[g].Quantity;
                totalqy = totalqy + parseFloat(qy);
            }

            $('#txttotship').val(totalqy.toFixed(0));

            var totalprqy = 0;
            for (var e = 0; e < ShipmentItemList.length; e++) {
                var prqy = ShipmentItemList[e].ProductionQty;
                totalprqy = totalprqy + parseFloat(prqy);

            }
            $('#txttotProdship').val(totalprqy.toFixed(0));

            loadShipAddTable(ShipmentItemList);
            loadShipSaveTable(ShipmentItemList);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });


}




function convertToDate(data) {
    // The 6th+ positions contain the number of milliseconds in Universal Coordinated Time between the specified date and midnight January 1, 1970.
    var dtStart = new Date(parseInt(data.substr(6)));
    // Format using moment.js.
    var dtStartWrapper = moment(dtStart);
    return dtStartWrapper.format("DD/MM/YYYY");
}

function EditDetPackList(ShipRowId, StyleRowId, SSNo) {
    debugger;
    $.ajax({
        url: "/BulkOrderShipment/ListPackEditDetails",
        data: JSON.stringify({ ShipRowId: ShipRowId, StyleRowId: StyleRowId, SSNo: SSNo }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            // PackItemListN = result;
            PackItemList = result;
            loadshconTable(PackItemList);
            loadEshconTable(PackItemList);

            if (ssn != undefined) {
                for (var d = 0; d < PackItemList.length; d++) {
                    if (PackItemList[d].SSNO == ssn) {
                        PackItemList[d].Ratio = 0;
                        PackItemList[d].Quantity = 0;
                        PackItemList[d].AllowQty = 0;
                        PackItemList[d].PQty = 0;
                    }
                }
            }

            if (type == "Color/Size") {
                loadshconTab(PackItemList);
            }
            else {
                loadshconTable(PackItemList);
            }

            if (type == "Solid") {
                loadshconTable(PackItemList);
            }

            flag = 0;
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function EditDetTotPackList(StyleRowId) {
    debugger;
    $.ajax({
        url: "/BulkOrderShipment/ListPackLoadEditDetails",
        data: JSON.stringify({ StyleRowId: StyleRowId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            // PackItemListN = result;
            PackList = result;
            //loadshconTable(PackItemList);
            //loadEshconTable(PackItemListN);
            loadEshconTable(PackList);
            for (var z = 0; z < PackList.length; z++) {
                if (PackList[z].itemmode == "A") {
                    itemlistadd.push(PackList[z]);
                }
                else if (PackList[z].itemmode == "M") {
                    quanlistadd.push(PackList[z]);
                }
            }
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}


function EditDetTotSepPackList(StyleRowId) {
    debugger;
    $.ajax({
        url: "/BulkOrderShipment/EditListPackSepDetails",
        data: JSON.stringify({ StyleRowId: StyleRowId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;

            var obj = result;

            for (var z = 0; z < obj.length; z++) {
                if (obj[z].itemmode == "A") {
                    sepitemlistadd.push(obj[z]);
                }
                else if (obj[z].itemmode == "M") {
                    sepquanlistadd.push(obj[z]);
                }
            }

            for (var z = 0; z < obj.length; z++) {
                if (obj[z].SSNO == 1) {
                    SepPackItemList.push(obj[z]);

                }
            }
            if (obj.length > 0) {
                if (obj[0].itemmode == "A") {
                    loadshconRatTab(SepPackItemList);
                }
                else if (obj[0].itemmode == "") {

                    loadshconQtyTab(SepPackItemList);
                }

                if (obj[0].itemmode == "M") {
                    loadshconQtyTab(SepPackItemList);
                }
            }

            //for (var z = 0; z < SepPackItemList.length; z++) {
            //    if (SepPackItemList[z].itemmode == 'A') {
            //        loadshconRatTab(SepPackItemList);
            //    }
            //    else {
            //        loadshconQtyTab(SepPackItemList);
            //    }
            //}

            var totalamntsp = 0;
            for (var t = 0; t < SepPackItemList.length; t++) {
                var amount = SepPackItemList[t].Quantity;
                totalamntsp = totalamntsp + parseFloat(amount);

            }

            $('#txttotrt').val(totalamntsp);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}


function EditDetTotalPackList(StyleRowId) {
    debugger;
    var ord = $('#txtOrderNo').val();
    $.ajax({
        url: "/BulkOrderShipment/EditListPackDetails",
        data: JSON.stringify({ StyleRowId: StyleRowId, orderno: ord }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;

            obj = result;

            for (var z = 0; z < obj.length; z++) {
                if (obj[z].itemmode == "A") {
                    itemlistadd.push(obj[z]);
                }
                else if (obj[z].itemmode == "M") {
                    quanlistadd.push(obj[z]);
                }
            }
            //loadshconTab(itemlistadd);
            //loadshconTable(quanlistadd);


            for (var z = 0; z < obj.length; z++) {
                if (obj[z].SSNO == 1) {
                    PackItemList.push(obj[z]);

                }
            }

            if (obj.length > 0) {
                if (obj[0].itemmode == "A") {
                    loadshconTab(PackItemList);
                }
                else {

                    loadshconTable(PackItemList);
                }

                if (obj[0].itemmode == "M") {
                    loadshconTable(PackItemList);
                }
            }

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}


function loadEshconTable(copsListObj) {
    //$('#tblPack1').DataTable().destroy();
    debugger;
    var inputcount = 0;
    $('#tblPack1 tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tblPack1').DataTable().destroy();
    }
    $('#tblPack1').empty();
    //$('#tCPIbody').DataTable().destroy();
    //list.sort(function (a, b) {
    //    return a.CPlanSlNo - b.CPlanSlNo;
    //})
    $('#tblPack1').DataTable({
        //data: PackItemListN,
        data: copsListObj,
        columns: [

            { title: "Buy_Ord_OrderDetId", data: "Buy_Ord_OrderDetId" },
             { title: "SNo", data: "snumb" },
            { title: "SSNO", data: "SSNO" },
            { title: "SizeId", data: "SizeId" },
            { title: "ComboId", data: "ComboId" },
            { title: "Style Row", data: "StyleRow" },
            { title: "Color", data: "Color" },
            { title: "Size", data: "Size" },
            { title: "Qty", data: "Quantity" },
            { title: "Ratio", data: "Ratio" },
            { title: "Ship Row", data: "ShipRow" },
            { title: "Combo Row", data: "ComboRow" },
             { title: "Ship No", data: "Buy_Ord_Ship" },
        ]
    });
}

function validate() {
    var isValid = true;

    if ($('#ddlprocessunit').val() == 0) {
        $('#ddlprocessunit').focus();
        //$('#ddlprocessunit').css('border-color', 'Red');
        $('#ddlprocessunit').siblings(".select2-container").css('border', '1px solid red');

        isValid = false;

    }
    else {
        $('#ddlprocessunit').siblings(".select2-container").css('border', '1px solid lightgrey');
    }
    if ($('#ddlprodunit').val() == 0) {
        $('#ddlprodunit').focus();
        //$('#ddlprodunit').css('border-color', 'Red');
        $('#ddlprodunit').siblings(".select2-container").css('border', '1px solid red');

        isValid = false;
    }
    else {
        $('#ddlprodunit').siblings(".select2-container").css('border', '1px solid lightgrey');
    }


    return isValid;
}

function Update() {

    if (PlanLock.length > 0) {
        if (PlanLock[0].LockOrder == 'Y') {
            //alert('Order has been Locked,Please Contact Administrator..');
            var msg = 'Order has been Locked,Please Contact Administrator...';
            var flg = 4;
            var mode = 1;
            AlartMessage(msg, flg, mode);
            return true;
        }
    }
    debugger;
    var res = validate();
    if (res == false) {
        return false;
    }

    var ShipTot = $('#txttotship').val();
    var QtyTot = $('#txtQuantity').val();

    var totalamnt = 0;
    for (var e = 0; e < ShipmentItemList.length; e++) {
        var amount = ShipmentItemList[e].Quantity;
        totalamnt = totalamnt + parseFloat(amount);
    }

    if (parseInt(totalamnt) != parseInt(QtyTot)) {
        //alert("Shipment quantity should be equal to quantity...");
        var msg = 'Shipment quantity should be equal to quantity...';
        var flg = 4;
        var mode = 1;
        AlartMessage(msg, flg, mode);
        return true;
    }





    //Assort and Color wise check
    var actotalamnt = 0;
    var totalassortamnt = 0;
    var totalclamnt = 0;
    for (var e = 0; e < sepquanlistadd.length; e++) {
        var amount = sepquanlistadd[e].Quantity;
        actotalamnt = actotalamnt + parseFloat(amount);
    }


    var astotalamnt = 0;
    for (var e = 0; e < sepitemlistadd.length; e++) {
        var amount = sepitemlistadd[e].Quantity;
        astotalamnt = astotalamnt + parseFloat(amount);
    }

    totalassortamnt = parseFloat(actotalamnt) + parseFloat(astotalamnt);


    //var cctotalamnt = 0;
    //var totalccamnt = 0;
    //for (var e = 0; e < itemlistadd.length; e++) {
    //    var amount = itemlistadd[e].Quantity;
    //    cctotalamnt = cctotalamnt + parseFloat(amount);
    //}


    //var cstotalamnt = 0;
    //for (var e = 0; e < quanlistadd.length; e++) {
    //    var amount = quanlistadd[e].Quantity;
    //    cstotalamnt = cstotalamnt + parseFloat(amount);
    //}

    //totalclamnt = parseFloat(cctotalamnt) + parseFloat(cstotalamnt);

    //if (parseInt(totalassortamnt) != parseInt(totalclamnt)) {
    //    alert("Assort Quantity should be equal to Color/Size Quantity...");
    //    return true;
    //}

    //


    var ratiolist = [];
    var quanlist = [];
    var listof = [];
    var totqnty = [];
    var Rtotqnty = [];

    var t = 0;
    var r = 0;
    if (quanlistadd.length > 0) {
        for (var d = 0; d < ShipmentItemList.length; d++) {
            if (ShipmentItemList[d].ItemModeType == 'Solid') {
                totqnty = [];
                var s = ShipmentItemList[d].SLNo;
                t = ShipmentItemList[d].Quantity;
                r = ShipmentItemList[d].Lotno;

                for (var e = 0; e < sepquanlistadd.length; e++) {
                    if (sepquanlistadd[e].SSNO == s) {
                        totqnty.push(sepquanlistadd[e].Quantity);
                    }
                }
                if (totqnty.length > 0) {
                    var totalamnt = 0;
                    for (var e = 0; e < totqnty.length; e++) {
                        var amount = totqnty[e];
                        totalamnt = totalamnt + parseFloat(amount);
                    }

                    if (t < totalamnt || t > totalamnt) {
                        //alert('Sum of assort details quantity must be equal to ship quantity for assort Number=' + r);
                        var msg = 'Sum of assort details quantity must be equal to ship quantity for assort Number=' + r;
                        var flg = 4;
                        var mode = 1;
                        AlartMessage(msg, flg, mode);
                        return true;
                    }
                    else {
                        totqnty = [];
                    }
                }
            }

            if (ShipmentItemList[d].ItemModeType == 'Color/Size') {
                Rtotqnty = [];
                var s = ShipmentItemList[d].SLNo;
                t = ShipmentItemList[d].Quantity;
                r = ShipmentItemList[d].Lotno;

                for (var e = 0; e < sepitemlistadd.length; e++) {
                    if (sepitemlistadd[e].SSNO == s) {
                        Rtotqnty.push(sepitemlistadd[e].Quantity);
                    }
                }

                var totalamnt = 0;
                for (var e = 0; e < Rtotqnty.length; e++) {
                    var amount = Rtotqnty[e];
                    totalamnt = totalamnt + parseFloat(amount);
                }

                if (t < totalamnt || t > totalamnt) {
                    //alert('Sum of assort details quantity must be equal to ship quantity for assort Number=' + r);
                    var msg = 'Sum of assort details quantity must be equal to ship quantity for assort Number=' + r;
                    var flg = 4;
                    var mode = 1;
                    AlartMessage(msg, flg, mode);
                    return true;
                }
                else {
                    totqnty = [];
                }
            }
        }
    }
    //else {
    //    alert('Must fill all the quantity for Solid...');
    //    return true;
    //}
    //if (itemlistadd.length == 0) {
    //    alert('Must fill all the quantity for Color/Size...');
    //    return true;
    //}

    if (itemlistadd.length > 0) {
        //itemlistedit = [];
        for (var i = 0; i < itemlistadd.length; i++) {
            var det = {
                snumb: itemlistadd[i].snumb,
                ItemId: itemlistadd[i].ItemId,
                AllowQty: itemlistadd[i].AllowQty,
                PQty: itemlistadd[i].PQty,
                Buy_Ord_OrderDetId: itemlistadd[i].Buy_Ord_OrderDetId,
                SizeId: itemlistadd[i].SizeId,
                Colorid: itemlistadd[i].ColorId,
                ComboId: itemlistadd[i].ComboId,
                Buy_Ord_DetId: itemlistadd[i].Buy_Ord_DetId,
                Buy_Ord_Ship: itemlistadd[i].Buy_Ord_Ship,
                Ratio: itemlistadd[i].Ratio,
                Quantity: itemlistadd[i].Quantity,
                StyleRow: itemlistadd[i].StyleRow,
                ShipRow: itemlistadd[i].ShipRow,
                Order_no: $('#txtOrderNo').val(),
                SSNO: itemlistadd[i].SSNO,
                SizeRow: itemlistadd[i].SizeRow,
                ComboRow: itemlistadd[i].ComboRow
            }

            ratiolist.push(det);
            listof.push(det);
        }
    }


    if (quanlistadd.length > 0) {
        //quanlistedit = [];
        for (var i = 0; i < quanlistadd.length; i++) {
            var det = {
                snumb: quanlistadd[i].snumb,
                ItemId: quanlistadd[i].ItemId,
                AllowQty: quanlistadd[i].AllowQty,
                PQty: quanlistadd[i].PQty,
                Buy_Ord_OrderDetId: quanlistadd[i].Buy_Ord_OrderDetId,
                Buy_Ord_DetId: quanlistadd[i].Buy_Ord_DetId,
                SizeId: quanlistadd[i].SizeId,
                Colorid: quanlistadd[i].ColorId,
                ComboId: quanlistadd[i].ComboId,
                Buy_Ord_Ship: quanlistadd[i].Buy_Ord_Ship,
                Ratio: quanlistadd[i].Quantity,
                Quantity: quanlistadd[i].Quantity,
                StyleRow: quanlistadd[i].StyleRow,
                ShipRow: quanlistadd[i].ShipRow,
                Order_no: $('#txtOrderNo').val(),
                SSNO: quanlistadd[i].SSNO,
                SizeRow: quanlistadd[i].SizeRow,
                ComboRow: quanlistadd[i].ComboRow
            }
            quanlist.push(det);
            listof.push(det);
        }
    }

    listof.sort(function (a, b) {
        return a.SSNO - b.SSNO
    })

    if (listof.length == 0) {
        //alert("Please Enter Atleast Any One Quantity in Assort Details..");
        var msg = 'Please Enter Atleast Any One Quantity in Assort Details...';
        var flg = 4;
        var mode = 1;
        AlartMessage(msg, flg, mode);
        return true;
    }



    if (sepitemlistadd.length > 0) {
        for (var i = 0; i < sepitemlistadd.length; i++) {
            var det = {
                //Buy_Ord_OrderDetId:,
                snumb: sepitemlistadd[i].snumb,
                ItemId: sepitemlistadd[i].ItemId,
                AllowQty: sepitemlistadd[i].AllowQty,
                PQty: sepitemlistadd[i].PQty,
                SizeId: sepitemlistadd[i].SizeId,
                ComboId: sepitemlistadd[i].ComboId,
                Buy_Ord_Ship: sepitemlistadd[i].Buy_Ord_Ship,
                Ratio: sepitemlistadd[i].Ratio,
                Rate: sepitemlistadd[i].Rate,
                Quantity: sepitemlistadd[i].Quantity,
                StyleRow: sepitemlistadd[i].StyleRow,
                ShipRow: sepitemlistadd[i].ShipRow,
                Order_no: $('#txtOrderNo').val(),
                SSNO: sepitemlistadd[i].SSNO,
                SizeRow: sepitemlistadd[i].SizeRow,
                ComboRow: sepitemlistadd[i].ComboRow,
                Buy_Ord_OrderDetId: sepitemlistadd[i].Buy_Ord_OrderDetId,
            }
            //ratiolist.push(det);
            listofsep.push(det);
        }
    }

    if (sepquanlistadd.length > 0) {
        for (var i = 0; i < sepquanlistadd.length; i++) {
            var det = {
                // Buy_Ord_OrderDetId:,
                snumb: sepquanlistadd[i].snumb,
                ItemId: sepquanlistadd[i].ItemId,
                AllowQty: sepquanlistadd[i].AllowQty,
                PQty: sepquanlistadd[i].PQty,
                SizeId: sepquanlistadd[i].SizeId,
                ComboId: sepquanlistadd[i].ComboId,
                Buy_Ord_Ship: sepquanlistadd[i].Buy_Ord_Ship,
                Ratio: sepquanlistadd[i].Quantity,
                Rate: sepquanlistadd[i].Rate,
                Quantity: sepquanlistadd[i].Quantity,
                StyleRow: sepquanlistadd[i].StyleRow,
                ShipRow: sepquanlistadd[i].ShipRow,
                Order_no: $('#txtOrderNo').val(),
                SSNO: sepquanlistadd[i].SSNO,
                SizeRow: sepquanlistadd[i].SizeRow,
                ComboRow: sepquanlistadd[i].ComboRow,
                Buy_Ord_OrderDetId: sepquanlistadd[i].Buy_Ord_OrderDetId,
            }

            //quanlist.push(det);
            listofsep.push(det);
        }
    }

    listofsep.sort(function (a, b) {
        return a.SSNO - b.SSNO
    })



    var cnt = $("#tblShipAddSave tr").length - 1;
    var Data = "";

    SaveShipList = [];
    for (var i = 1; i <= cnt; i++) {

        //var compItemObj = {
        //    ShipRowId: $("#tblShipAddSave tr:eq(" + i + ") td:eq(0)").html(),
        //    SLNo: $("#tblShipAddSave tr:eq(" + i + ") td:eq(1)").html(),
        //    Lotno: $("#tblShipAddSave tr:eq(" + i + ") td:eq(2)").html(),
        //    Ship_Date: $("#tblShipAddSave tr:eq(" + i + ") td:eq(3)").html(),
        //    Dest: $("#tblShipAddSave tr:eq(" + i + ") td:eq(4)").html(),
        //    Dest_Code: $("#tblShipAddSave tr:eq(" + i + ") td:eq(5)").html(),
        //    PortOfLoading: $("#tblShipAddSave tr:eq(" + i + ") td:eq(6)").html(),
        //    PortOfLoadingId: $("#tblShipAddSave tr:eq(" + i + ") td:eq(7)").html(),
        //    Quantity: $("#tblShipAddSave tr:eq(" + i + ") td:eq(8)").html(),
        //    UOM: $("#tblShipAddSave tr:eq(" + i + ") td:eq(9)").html(),
        //    UomID: $("#tblShipAddSave tr:eq(" + i + ") td:eq(10)").html(),
        //    ItemModeType: $("#tblShipAddSave tr:eq(" + i + ") td:eq(11)").html(),
        //    ItemMode: $("#tblShipAddSave tr:eq(" + i + ") td:eq(14)").html(),
        //    Buy_Ord_Ship: $("#tblShipAddSave tr:eq(" + i + ") td:eq(15)").html()
        //};

        //SaveShipList.push(compItemObj);
        var compItemObj = {
            ShipRowId: $("#tblShipAddSave tr:eq(" + i + ") td:eq(0)").html(),
            SLNo: $("#tblShipAddSave tr:eq(" + i + ") td:eq(1)").html(),
            Lotno: $("#tblShipAddSave tr:eq(" + i + ") td:eq(2)").html(),
            Ship_Date: $("#tblShipAddSave tr:eq(" + i + ") td:eq(3)").html(),
            Dest: $("#tblShipAddSave tr:eq(" + i + ") td:eq(4)").html(),
            Dest_Code: $("#tblShipAddSave tr:eq(" + i + ") td:eq(5)").html(),
            PortOfLoading: $("#tblShipAddSave tr:eq(" + i + ") td:eq(6)").html(),
            PortOfLoadingId: $("#tblShipAddSave tr:eq(" + i + ") td:eq(7)").html(),
            Quantity: $("#tblShipAddSave tr:eq(" + i + ") td:eq(8)").html(),
            UOM: $("#tblShipAddSave tr:eq(" + i + ") td:eq(9)").html(),
            UomID: $("#tblShipAddSave tr:eq(" + i + ") td:eq(10)").html(),
            ItemModeType: $("#tblShipAddSave tr:eq(" + i + ") td:eq(11)").html(),
            DelDate: $("#tblShipAddSave tr:eq(" + i + ") td:eq(12)").html(),
            AllowancePer: $("#tblShipAddSave tr:eq(" + i + ") td:eq(13)").html(),
            ProductionQty: $("#tblShipAddSave tr:eq(" + i + ") td:eq(14)").html(),
            ItemMode: $("#tblShipAddSave tr:eq(" + i + ") td:eq(15)").html(),
            Buy_Ord_Ship: $("#tblShipAddSave tr:eq(" + i + ") td:eq(16)").html(),
            // Buy_Ord_Ship: $('#txtShipNo').val(),
            Order_No: $('#txtOrderNo').val(),
            //Buy_Ord_MasId: 87,
            StyleId: $('#txtHStyleID').val(),
            StyleRowid: StyleRowId,
        };
        SaveShipList.push(compItemObj);
    }

    var ptype = $('input[name="PAType"]:checked').attr('value');
    var objSubmit = {
        Buy_Ord_Ship: $('#txtShipNo').val(),
        Order_No: $('#txtOrderNo').val(),
        StyleId: $('#txtHStyleID').val(),
        StyleRowid: StyleRowId,
        //BuyOrdShipItem: ShipmentItemList,

        BuyOrdShipItem: ShipmentItemList,
        BuyOrdShipratio: listof,
        BuyOrdShipquan: listofsep,
        PA: ptype
    };

    var WoObj = {
        StylerowId: StyleRowId,
        StyleId: $('#txtHStyleID').val(),
        Orderdate: $('#txtEntryDate').val(),
        OrderNo: $('#txtOrderNo').val(),
        //BuyerId: buyerid,
        //CompanyId: companyid,// $('#txtCompanyId').val(),
        //Remarks: $('#remarks').val(),
        EmployeeID: Guserid,
        lstprodShipwo: SaveShipList,
        lstprodItemwo: listof,
        //Quantity: $('#txtQuantity').val(),
        ProcessunitId: $('#ddlprocessunit').val(),
        ProdUnitId: $('#ddlprodunit').val(),
        Workorder: $('#txtworkno').val(),
        ProductionQty: $('#txttotProdship').val(),
    };
    $("#Update").attr("disabled", true);
    LoadingSymb();

    $.ajax({
        url: "/BulkOrderShipment/Update",
        data: JSON.stringify({ ObjShipEn: objSubmit, Spm: WoObj }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;

            if (result.Value == true) {
                //AddNotification();
                AddUserEntryLog('SalesManagement', 'BulkOrderShipment', 'UPDATE', $('#txtOrderNo').val());
                var msg = 'Data Updated Successfully...';
                var flg = 1;
                var mode = 1;
                AlartMessage(msg, flg, mode);

              

                var Id = GBMasId;
                var Mod = 1;
                window.location.href = "/StyleEntry/StyleEntryIndex?BMasId=" + Id + "=&Mode=" + Mod + "=&type=" + type;
                //alert("Data Updated Successfully");
                
            } else {

                window.location.href = "/Error/Index";

            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function LoadGuom() {


    if ($('#ddlPort').val() != 0) {

        Guom = $("#txtHGUom").val();
        $('#ddlUom').val(Guom);
    }
}

function Close() {
    if (OrdApp == 'Y') {
        window.location.href = "/OrderApproval/OrderApprovalIndex";
    }
    else {
        var Id = GBMasId;
        //window.location.href = "/StyleEntry/StyleEntryIndex?BMasId=" + Id;
        var Mod = 1;
        window.location.href = "/StyleEntry/StyleEntryIndex?BMasId=" + Id + "=&Mode=" + Mod + "=&type=" + type;
    }
}

function Delete() {
    debugger;

    if (PlanLock.length > 0) {
        if (PlanLock[0].LockOrder == 'Y') {
            //alert('Order has been Locked,Please Contact Administrator..');
            var msg = 'Order has been Locked,Please Contact Administrator...';
            var flg = 4;
            var mode = 1;
            AlartMessage(msg, flg, mode);
            return true;
        }
    }

    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $("#Delete").attr("disabled", true);
        LoadingSymb();
                $.ajax({
                    url: "/BulkOrderShipment/Delete/" + StyleRowId,
                    type: "POST",
                    contentType: "application/json;charset=UTF-8",
                    dataType: "json",
                    success: function (result) {

                        if (result.Value == true) {
                            AddUserEntryLog('SalesManagement', 'BulkOrderShipment', 'DELETE', $('#txtOrderNo').val());
                            var msg = 'Data Deleted Successfully...';
                            var flg = 2;
                            var mode = 1;
                            AlartMessage(msg, flg, mode);
                            var Id = GBMasId;
                            var Mod = 2;
                            window.location.href = "/StyleEntry/StyleEntryIndex?BMasId=" + Id + "=&Mode=" + Mod + "=&type=" + type;
                            //alert("Data Deleted Successfully");
                            
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
function LoadCheckWorkPlanDetails(workno) {


    $.ajax({
        url: "/BulkOrderShipment/CheckWorkPlanDetails",
        data: JSON.stringify({ Workorder: workno }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            debugger;
            if (obj != undefined) {

                ChPlanBom = obj[0]["PlanBom"];
                ChPlanProg = obj[0]["PlanProg"];

                if (ChPlanBom > 0) {

                    //alert("Planning has been made for this Order,Please Check it....")
                    var msg = 'Planning has been made for this Order,Please Check it...';
                    var flg = 4;
                    var mode = 1;
                    AlartMessage(msg, flg, mode);
                    $("#Delete").prop("disabled", true);
                    return true;
                }

                if (ChPlanProg > 0) {

                    //alert("Process Program has been made for this Order,Please Check it....")
                    var msg = 'Process Program has been made for this Order,Please Check it...';
                    var flg = 4;
                    var mode = 1;
                    AlartMessage(msg, flg, mode);
                    $("#Delete").prop("disabled", true);
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

function CnAdd() {
    var res = cnvalidate();
    if (res == false) {
        return false;
    }

    var checkbox_value = "";
    var ischecked = false;
    $(":checkbox").each(function () {
        ischecked = $('#CnStatus').is(":checked");

    });
    debugger;
    var countryObj = {
        CountryId: $('#txtCountryID').val(),
        CountryName: $('#txtCnName').val(),
        Lookup: $('#txtCnlookup').val(),
        IsActive: ischecked,
    };
    LoadingSymb();
    $.ajax({
        url: "/Country/Add",
        data: JSON.stringify(countryObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            }
            else if (result.Value == -1) {
                //alert('Given Country is Already Available...');
                var msg = 'Given Country is Already Available...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }
            else {
                //alert('Data Saved Successfully');
                var msg = 'Data Saved Successfully...';
                var flg = 1;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                $('#myModal2').modal('hide');
                LoadCountryDDL('#ddlDest');

            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}


//Valdidation using jquery
function cnvalidate() {
    var isValid = true;
    if ($('#txtCnName').val().trim() == "") {
        $('#txtCnName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtCnName').css('border-color', 'lightgrey');
    }
    if ($('#txtCnlookup').val().trim() == "") {
        $('#txtCnlookup').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtCnlookup').css('border-color', 'lightgrey');
    }
    return isValid;
}

function PortAdd() {
    var res = portvalidate();
    if (res == false) {
        return false;
    }

    var checkbox_value = "";
    var ischecked = false;
    $(":checkbox").each(function () {
        ischecked = $('#PrtStatus').is(":checked");
        //if (ischecked) {
        //    checkbox_value += "on";
        //}
        //else {
        //    checkbox_value += "off";
        //}
    });
    debugger;
    var PortObj = {
        PortOfLoadingId: $('#txtPortOfLoadingID').val(),
        PortOfLoading1: $('#txtPortOfLoading1').val(),
        PortCode: $('#txtPortCode').val(),
        CountryId: $('#ddlCountry').val(),
        IsActive: ischecked,
    };
    LoadingSymb();
    $.ajax({
        url: '/PortOfLoading/Add/',
        data: JSON.stringify(PortObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            } else if (result.Value == -1) {
                //alert('Given PortOfLoading is Already Available...');
                var msg = 'Given PortOfLoading is Already Available...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }
            else {
                //alert('Data Saved Successfully');
                var msg = 'Data Saved Successfully...';
                var flg = 1;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                $('#myModal3').modal('hide');
                LoadPortOfLoadingDDL('#ddlPort');

            }
            // clearTextBox();

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function portvalidate() {
    var isValid = true;
    if ($('#txtPortOfLoading1').val() == "") {
        $('#txtPortOfLoading1').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtPortOfLoading1').css('border-color', 'lightgrey');
    }

    return isValid;
}

function LockDet() {
    var ord = $('#txtOrderNo').val();
    var sty = $('#txtHStyleID').val();

    $.ajax({
        url: "/BudgetApproval/LoadLockDet",
        data: JSON.stringify({ ordno: ord, styleid: sty, Type: 'S' }),
        type: "POST",
        async: false,
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            //var obj = result;
            PlanLock = result.Value;

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}

//function AddNotification() {
//    debugger;
//    var filelist = [];

//    var Toname = '';
//    var To = '';
//    var IsMail = 0;
//    var IsPopup = 0;

//    var order = $('#txtOrderNo').val();

//    var Rfno = $('#txtRefNo').val();
//    var buyer = $('#txtBuyer').val();
//    var qty = $('#txtQuantity').val();
//    var style = $('#txtStyle').val();

//    var Alert = 'BUYER ORDER';
//    var cate = 'D';

//    $.ajax({
//        url: "/AlertSetup/GetAlertDetails",
//        data: JSON.stringify({ Alertname: Alert, Category: cate, Orderno: order }),
//        type: "POST",
//        contentType: "application/json;charset=utf-8",
//        dataType: "json",
//        success: function (json) {
//            debugger;
//            var obj = json.Value;

//            var list = [];
//            list = obj;

//            $.each(list, function (i) {
//                if (list[i].AlertID == 0 && list[i].Mail == true && list[i].EmailAdd != '' && Toname=='') {
//                    Toname = list[i].Employee;
//                }

//                if (list[i].Mail == true && list[i].EmailAdd != '') {
//                    if (To == '') {
//                        To = list[i].EmailAdd;
//                    } else {
//                        To = To + ',' + list[i].EmailAdd;
//                    }
//                }

//            })


//           if (To != '')
//           {

//           ////Mail Acc Setting --
//            var Accname = '';
//            var pass = '';
//            var email = '';

//            $.ajax({
//                url: "/AccountSetting/GetSettingData/",
//                typr: "GET",
//                contentType: "application/json;charset=UTF-8",
//                dataType: "json",
//                success: function (result) {
//                    var obj = result.Value;
//                    if (result.Status == 'SUCCESS') {
//                        var obj = result.Value;
//                        debugger;
//                        if (obj != undefined) {

//                            Accname = obj[0]["AccountName"];
//                            pass = obj[0]["EMailPassword"];
//                            email = obj[0]["FromEmailID"];

//                            var name = "BUYER ORDER"
//                            var repobj = [];
//                            $.ajax({
//                                url: "/BulkOrder/GetReportOption",
//                                data: JSON.stringify({ docname: name }),
//                                type: "POST",
//                                contentType: "application/json;charset=UTF-8",
//                                dataType: "json",
//                                success: function (result) {
//                                    debugger;
//                                    //document.getElementById('sbTwo');
//                                    var obj = result.Value;
//                                    repobj = obj;

//                                    var p = [];
//                                    for (var r = 0; r < repobj.length; r++) {
//                                        p.push(0);
//                                    }

//                                    for (var f = 0; f < repobj.length; f++) {
//                                        if (true == repobj[f].optionvalue) {
//                                            p[f] = 1;
//                                        }
//                                    }

//                                    var MOrd = 0;
//                                    var compId = $('#ddlprodunit').val();

//                                    window.open("../Reports/BuyerOrderInlineReport.aspx?ddlOrderNo=" + GBMasId + "&Multiopt=" + MOrd + "&Combodet=" + p[0] + "&MeasChart=" + p[1] + "&OrdIns=" + p[2] + "&Chklst=" + p[3] + "&Material=" + p[4] + "&Ratematrix=" + p[5] + "&Packing=" + p[6] + "&GSM=" + p[7] + "&INR=" + p[8] + "&Shipdet=" + p[9] + "&PrntImg=" + p[10] + "&Companyid=" + compId + "&OrdType=" + "B");

//                                    alert('testing..');


//                                }
//                            });





//                            var Sub = 'New Order Booked.'

//                            var text = "<table style='border: 0.5px solid black;border-collapse:collapse;width:90%'>"
//                                + "<tr style='border: 0.5px solid black;border-collapse:collapse;'>"
//                                + "<td style='border: 0.5px solid black;border-collapse:collapse;font-weight: bold;font-size:10px;'>REF NO</td>"
//                                + "<td style='border: 0.5px solid black;border-collapse:collapse;font-weight: bold;font-size:10px;'>BUYER</td>"
//                                + "<td style='border: 0.5px solid black;border-collapse:collapse;font-weight: bold;font-size:10px;'>ORDER NO</td>"
//                                + "<td style='border: 0.5px solid black;border-collapse:collapse;font-weight: bold;font-size:10px;'>STYLE</td>"
//                                + "<td style='border: 0.5px solid black;border-collapse:collapse;font-weight: bold;font-size:10px;'>QUANTITY</td>"
//                                + "</tr>"

//                                + "<tr style='border: 0.5px solid black;border-collapse:collapse;'>"
//                                + "<td style='border: 0.5px solid black;border-collapse:collapse;font-size:10px;'>" + Rfno + "</td>"
//                                + "<td style='border: 0.5px solid black;border-collapse:collapse;font-size:10px;'>" + buyer + "</td>"
//                                + "<td style='border: 0.5px solid black;border-collapse:collapse;font-size:10px;'>" + order + "</td>"
//                                + "<td style='border: 0.5px solid black;border-collapse:collapse;font-size:10px;'>" + style + "</td>"
//                                + "<td style='border: 0.5px solid black;border-collapse:collapse;font-size:10px;'>" + qty + "</td>"
//                                + "</tr>"
//                                + "</table>"

//                            var objSubmit = {
//                                To: To,
//                                ToName: Toname,
//                                Subject: Sub,
//                                Body: text,
//                                FromName: Accname,
//                                Email: email,
//                                Password: pass,
//                                //CC: $('#CC').val(),
//                                MailFile: filelist
//                            };

//                            //LoadingSymb();
//                            $.ajax({
//                                url: "/Mail/MailsentFromReport",
//                                data: JSON.stringify(objSubmit),
//                                type: "POST",
//                                contentType: "application/json;charset=utf-8",
//                                dataType: "json",
//                                success: function (result) {
//                                    debugger;
//                                    if (result.Value == true) {

//                                        alert("Mail sent Sucessfully");

//                                        var Id = GBMasId;
//                                        //window.location.href = "/StyleEntry/StyleEntryIndex?BMasId=" + Id;
//                                        var Mod = 1;
//                                        window.location.href = "/StyleEntry/StyleEntryIndex?BMasId=" + Id + "=&Mode=" + Mod + "=&type=" + type;

//                                        // window.location.href = "/ProcessOrder/ProcessOrderIndex";
//                                    } else {

//                                        //window.location.href = "/Error/Index";

//                                        alert("Mail not sent.");
//                                    }

//                                },
//                                error: function (errormessage) {

//                                    alert(errormessage.responseText);
//                                }
//                            });


//                        }
//                    }
//                }
//            });


//        }




//        }

//    });






//}