//Load Data in Table when documents is ready
var sizeList = [];
var comboList = [];
var result = [];
var comboItemList = [];
var comboItemYarnList = [];
var Mod = 0;
var YarnColSeq = 0;
var rowid = 0;
var ComboYarnRowId = 0;
var ComboYarnColorName = 0;
var ComboColorYarn = 0;
var YarnColorId = 0;
var colorseq = 0;
var combocolor = "";
var itemseq = 0;
var comboitemrowid = 0;
var itemname = "";
var combocol = "";
var sizeseq = 0;
var SumTotQty = 0;
var GuomConversion = 0;
var StyleRowNoId = 0;
var itemlist = [];
var yarnlist = [];
var Gs = 0;
var bal = [];
var BMasId = 0;
var CBom = 0;
var CShip = 0;
var DcurrId = 0;
var DcurrencyAbs = 0;
var Mode = 0;
var CpyStyle = [];
var StyleType = "N";
var AddStyleid = 0;
var EnbTranDate = 0;
var OrdApp = "N";
var superuser = 0;
var rightsflg = 0;
var Roleid = 0;
var Menuid = 0;
var Submenuid = 0;
var comcolorseq = 0;
var UserName = 0;
var ShipmentItemList = [];
var PackItemList = [];
var SepPackItemList = [];
var itemlistadd = [];
var quanlistadd = [];
var sepitemlistadd = [];
var sepquanlistadd = [];
var EnbAssRate = 0;
var listof = [];
var listofsep = [];
var StyleRowID = 0;
var qty = 0;
var CBom = 0;
var CShip = 0;
var slno = [];
var totqty = 0;
var buy_ord_ship = 0;
var Quan = 0;
var idinsertflg = 0;
var sepresult = [];
var compList = [];
var CompSlNo = 0;
var type = '';
var ConItemListSave = [];
var ConItemList = [];
var Fabriclist = [];
var GreyList = [];
var checkpattern = 0;
var ChkMaj = 0;
var Itemrowindex = -1;
var rowindex = -1;
var index = 0;
var indexforfill = -1;
var fillvar = '';
var PlanCompanyid = 0;
var PlanBmasid = 0;
var PlanOrderNo = '';
var PlanItemId = 0;
var PlanStyleid = 0;
var PlanId = 0;
var fcompno = 0;
var planid = 0;
var Cplan = 'N';
var Yplan = 'N';
var Fplan = 'N';
var BaseColorlist = [];
var FinishColorlist = [];
var PlanLoss = [];
var PlanLossSave = [];
var PLID = 0;
var PlanCompFabricDet = [];
var PlanCompFabricDetSave = [];
var chklist = [];
var PlanYarn = [];
var PlanYarnSave = [];
var PlanYarnDyeing = [];
var PlanYarnDyeingSave = [];
var PlanYarnDet = [];
var PlanYarnDetSave = [];
var YarnDyeItemList = [];
var Dying = 0;
var FBRID = 0;
var fid = 0;
var BCLID = 0;
var OrdNo = 0;
var PrintColorlist = [];
var ItemId = 0;
var YlNo = 0;
var yslno = 0;
var yarndet = [];
var wt = 0;
var Weight = 0;
var Bper = 0;
var YarnDyeing = [];
var index = 0;
var indexforfill = -1;
var fillvar = '';
var indexforfabfill = -1;
var fabfillvar = '';
var Fabindex = -1;
var CEPItemList = [];
var Yplanmasid = 0;
var Eweight = 0;
var TEWeight = 0;
var PlanYarnLoss = [];
var PlanYarnLossSave = [];
var ProcSeqList = [];
$(document).ready(function () {
    debugger;
    UserName = $("#hdnusername").data('value');
    Guserid = $("#hdnUserid").data('value');

    LoadOrderNoDDL("#ddlOrderNo");
    LoadCompanyUnitDDL("#ddlprodunit,#ddlprocessunit");
    LoadSeasonDDL("#ddlseason");
    LoadCountryDDL("#ddlDest");
    LoadUomDDL("#ddlUom");
    LoadPortOfLoadingDDL("#ddlPort");
    LoadComponentDDL("#ddlComponent");
    LoadFabricDDL("#ddlFabric");
    EnbAssRate = $("#hdnEAssDetRate").data('value');
    getfabric();
    checkpattern = 1;
    if (EnbAssRate == "Y") {
        $("#txtshiprate").prop("disabled", true);


    } else {
        $("#txtshiprate").prop("disabled", false);

    }
    //  LoadStyleDDL("#ddlstyle");
    clearTextBox();
    $('#myModal').modal('show');

    //Add size button click event
    $('#btnsizeadd').click(function () {
        //validation and add order items
        var isAllValid = true;
        debugger;


        var sizeid = $('#ddlsize').val();
        for (var g = 0; g < sizeList.length; g++) {
            if (sizeList[g].SizeId == sizeid) {
                //alert('Must be a different Size..');
                var msg = 'Must be a different Size...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                fnCleaSizeControls();
                return true;
            }
        }


        if ($('#ddlsize').val() == "0") {
            isAllValid = false;
            //$('#ddlsize').siblings('span.error').css('visibility', 'visible');
            $('#ddlsize').siblings(".select2-container").css('border', '1px solid red');
        }
        else {
            //$('#ddlsize').siblings('span.error').css('visibility', 'hidden');
            $('#ddlsize').siblings(".select2-container").css('border', 'lightgrey');
        }

        //Finding the max value of an attribute in an array of objects
        var max = 0;
        jQuery.map(sizeList, function (obj) {
            debugger;
            if (obj.ComboSizeSeq > max)
                max = obj.ComboSizeSeq;
        });
        //End

        if (sizeseq == 0 && sizeList.length == 0) {
            sizeseq = 1;
        }
        else {
            sizeseq = max + 1//comboItemList.length+1;
        }

        if (isAllValid) {
            var SizelistObj = {
                ComboSizeSeq: sizeseq,
                SizeName: $("#ddlsize option:selected").text(),
                SizeId: $('#ddlsize').val(),
                Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
            };

            sizeList.push(SizelistObj);

            loadsizeTable(sizeList);

            //clear select data
            //$('#tblsizedetails').DataTable().destroy();
            $('#ddlsize').val('0').trigger('change');
            $('#SizeorderItemError').empty();
        }
    });
    $(document).on('click', '.btnedit', function () {
        debugger;

        if (CShip > 0) {
            //alert("Shipment has been made for this Order,Cannot Update the Size...");
            var msg = 'Shipment has been made for this Order,Cannot Update the Size...';
            var flg = 4;
            var mode = 1;
            AlartMessage(msg, flg, mode);
            return true;
        }
        if (CBom > 0) {
            //alert("Shipment has been made for this Order,Cannot Update the Size...");
            var msg = 'Shipment has been made for this Order,Cannot Update the Size...';
            var flg = 4;
            var mode = 1;
            AlartMessage(msg, flg, mode);
            return true;
        }
        Mod = 1;

        rowindex = $(this).closest('tr').index();

        var currentro12 = sizeList.slice(rowindex);

        $("#ddlsize").val(currentro12[0]['SizeId']).trigger('change');

        $('#btnsizeadd').hide();
        $('#btncldupdate').show();
    });

    $('#btncldupdate').click(function () {
        debugger;
        var currentrowsel = sizeList.slice(rowindex);

        currentrowsel[0]['SizeId'] = $("#ddlsize").val();
        currentrowsel[0]['SizeName'] = $("#ddlsize option:selected").text();

        sizeList[rowindex] = currentrowsel[0];

        loadsizeTable(sizeList);

        $('#btncldupdate').hide();
        $('#btnsizeadd').show();

        if (Mod == 0) {
            clearTextBox();
        }
        else {
            $('#ddlsize').val('0').trigger('change');
            $('#ddlsize').siblings('span.error').css('visibility', 'hidden');
        }
        Mod = 0;
    });

    $('#btncoloradd').click(function () {
        debugger;
        var isAllValid = true;
        var leng = 0;
        var s = $('#txtpcs').val();
        if (GuomConversion == 1) {
            if (s != GuomConversion) {
                //alert('Sholud not be greater than single piece...');
                var msg = 'Sholud not be greater than single piece...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                $('#ddlcolor').val('0').trigger('change');
                $('#txtpcs').val('');
                return true;
            }
        }

        debugger;
        if ($('#ddlcombo').val() == "0") {
            isAllValid = false;

            $('#ddlcombo').siblings(".select2-container").css('border', '1px solid red');
        }
        else {

            $('#ddlcombo').siblings(".select2-container").css('border', 'lightgrey');

        }

        if ($('#ddlcolor').val() == "0" || $('#ddlcolor').val() == "") {
            isAllValid = false;

            $('#ddlcolor').siblings(".select2-container").css('border', '1px solid red');
        }
        else {

            $('#ddlcolor').siblings(".select2-container").css('border', 'lightgrey');
        }

        if ($('#ddlcoloritem').val() == "0" || $('#ddlcoloritem').val() == "") {
            isAllValid = false;

            $('#ddlcoloritem').siblings(".select2-container").css('border', '1px solid red');
        }
        else {

            $('#ddlcoloritem').siblings(".select2-container").css('border', 'lightgrey');
        }
        AddinEdit = 1;
        var max = 0;
        jQuery.map(comboList, function (obj) {
            debugger;
            if (obj.ColorSeq > max)
                max = obj.ColorSeq;
        });
        debugger;

        if (colorseq == 0 && comboList.length == 0) {
            colorseq = 1;
        }
        else {
            colorseq = max + 1
        }
        var maxc = 0;
        jQuery.map(comboList, function (obj) {
            debugger;
            if (obj.ComboSeq > maxc)
                maxc = obj.ColorSeq;
        });
        debugger;

        if (comcolorseq == 0 && comboList.length == 0) {
            comcolorseq = 1;
        }
        else {
            var cc = $('#ddlcombo').val();
            for (var r = 0; r < comboList.length; r++) {
                if (comboList[r].ComboId != cc) {
                    var amount = comboList[r].ComboId;
                    comcolorseq = maxc + 1
                }
                else {
                    var total = 0;
                    for (var r = 0; r < comboList.length; r++) {
                        if (comboList[r].ComboId == cc) {
                            comcolorseq = comboList[r].ComboSeq;
                        }
                    }
                }
            }
        }
        if (isAllValid) {
            debugger;
            var comboListObj = {
                ComboSeq: comcolorseq,
                ColorSeq: colorseq,
                ComboName: $("#ddlcombo option:selected").text(),
                ComboId: $('#ddlcombo').val(),
                ColorName: $("#ddlcolor option:selected").text(),
                ColorId: $('#ddlcolor').val(),
                ColorRatio: $('#txtpcs').val(),
                ItemId: $('#ddlcoloritem').val(),
                ItemName: $("#ddlcoloritem option:selected").text(),
                Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
            };

            if (SumTotQty == 0) { SumTotQty = comboListObj.ComboQty } else { SumTotQty = parseInt(SumTotQty) + parseInt(comboListObj.ComboQty) };


            if (comboList.length > 0) {
                var comboid = $('#ddlcombo').val();
                var clrid = $('#ddlcolor').val();
                var itmid = $('#ddlcoloritem').val();
                var tt = $('#txtpcs').val();
                if (GuomConversion == 1) {

                    for (var d = 0; d < comboList.length; d++) {
                        if (comboList[d].ComboId == comboid) {
                            //alert('Sholud not be same combo color...');
                            var msg = 'Sholud not be same combo color...';
                            var flg = 4;
                            var mode = 1;
                            AlartMessage(msg, flg, mode);
                            $('#ddlcolor').val('0').trigger('change');
                            $('#txtpcs').val('');
                            loadcolorTable(comboList);
                            return true;
                        }
                    }
                }
                else if (GuomConversion >= 2) {

                    for (var d = 0; d < comboList.length; d++) {
                        if (comboList[d].ComboId == comboid && comboList[d].ColorId == clrid && comboList[d].ItemId == itmid) {
                            //alert('Sholud not be same combo color...');
                            var msg = 'Sholud not be same combo color...';
                            var flg = 4;
                            var mode = 1;
                            AlartMessage(msg, flg, mode);
                            $('#ddlcolor').val('0').trigger('change');
                            $('#txtpcs').val('');
                            loadcolorTable(comboList);
                            return true;
                        }
                    }

                    var total = 0;
                    for (var r = 0; r < comboList.length; r++) {
                        if (comboList[r].ComboId == comboid) {
                            var amount = comboList[r].ColorRatio;
                            total = total + parseFloat(amount);
                        }
                    }
                    total = parseFloat(total) + parseFloat(tt);
                    if (total > GuomConversion) {
                        //alert('Total piece should not exceed ' + GuomConversion);
                        var msg = 'Total piece should not exceed ' + GuomConversion;
                        var flg = 4;
                        var mode = 1;
                        AlartMessage(msg, flg, mode);
                        $('#ddlcolor').val('0').trigger('change');
                        $('#txtpcs').val('');
                        loadcolorTable(comboList);
                        return true;
                    }
                }
            }


            comboList.push(comboListObj);
            debugger;
            $.each(comboList, function (i, e) {
                var matchingItems = $.grep(comboList, function (item) {
                    return item.ColorName === e.ColorName && item.ComboName === e.ComboName && item.ItemId === e.ItemId;
                });
                if (matchingItems.length === 0) {
                    comboList.push(e);
                }
            });
            var totpiece = [];
            loadcolorTable(comboList);
            LoadItemCombo();
            $('#ddlcolor').val('0').trigger('change');
            $('#txtpcs').val('');
        }
    });

    $(document).on('click', '.btncoloredit', function () {
        debugger;

        if (CShip > 0) {
            //alert("Shipment has been made for this Order,Cannot Update the Color...");
            var msg = 'Shipment has been made for this Order,Cannot Update the Color...';
            var flg = 4;
            var mode = 1;
            AlartMessage(msg, flg, mode);
            return true;
        }
        if (CBom > 0) {
            //alert("Planning has been made for this Order,Cannot Update the Color...");
            var msg = 'Planning has been made for this Order,Cannot Update the Color...';
            var flg = 4;
            var mode = 1;
            AlartMessage(msg, flg, mode);
            return true;
        }
        Mod = 1;

        rowindex = $(this).closest('tr').index();

        var currentro12 = comboList.slice(rowindex);

        $('#ddlcombo').val(currentro12[0]['ComboId']).trigger('change');
        $('#ddlcolor').val(currentro12[0]['ColorId']).trigger('change');
        $('#txtcolorqty').val(currentro12[0]['ComboQty']);
        $('#ddlcoloritem').val(currentro12[0]['ItemId']).trigger('change');
        $('#txtpcs').val(currentro12[0]['ColorRatio']);
        $('#txtper').val(currentro12[0]['ComboPer']);

        $('#btncoloradd').hide();
        $('#btncolorupdate').show();
    });
    $('#btncolorupdate').click(function () {
        debugger;
        var cpycomlist = [];
        cpycomlist = comboList;
        var currentrowsel = cpycomlist.slice(rowindex);
        var coid = currentrowsel[0]['ComboId'];
        var clrid = currentrowsel[0]['ColorId'];
        var itmid = currentrowsel[0]['ItemId'];
        var resultAarray = $.grep(cpycomlist, function (n, i) {
            return ((n.ComboId !== coid) || (n.ColorId !== clrid) || (n.ItemId !== itmid));
        }, false);
        if (comboList.length > 0) {
            var comboid = $('#ddlcombo').val();
            var clrid = $('#ddlcolor').val();
            var tt = $('#txtpcs').val();
            var itmid = $('#ddlcoloritem').val();
            if (GuomConversion == 1) {

                for (var d = 0; d < resultAarray.length; d++) {
                    if (resultAarray[d].ComboId == comboid) {
                        //alert('Sholud not be same combo color...');
                        var msg = 'Sholud not be same combo color...';
                        var flg = 4;
                        var mode = 1;
                        AlartMessage(msg, flg, mode);
                        $('#ddlcolor').val('0').trigger('change');
                        $('#txtpcs').val('');
                        loadcolorTable(comboList);
                        $('#btncolorupdate').hide();
                        $('#btncoloradd').show();
                        return true;
                    }
                }
            }
            else if (GuomConversion >= 2) {

                for (var d = 0; d < resultAarray.length; d++) {
                    if (resultAarray[d].ComboId == comboid && resultAarray[d].ColorId == clrid && resultAarray[d].ItemId == itmid) {
                        //alert('Sholud not be same combo color...');
                        var msg = 'Sholud not be same combo color...';
                        var flg = 4;
                        var mode = 1;
                        AlartMessage(msg, flg, mode);
                        $('#ddlcolor').val('0').trigger('change');
                        $('#txtpcs').val('');
                        loadcolorTable(comboList);
                        $('#btncolorupdate').hide();
                        $('#btncoloradd').show();
                        return true;
                    }
                }
                var total = 0;
                for (var r = 0; r < resultAarray.length; r++) {
                    if (resultAarray[r].ComboId == comboid) {
                        var amount = resultAarray[r].ColorRatio;
                        total = total + parseFloat(amount);
                    }
                }
                total = parseFloat(total) + parseFloat(tt);
                if (total > GuomConversion) {
                    //alert('Total piece should not exceed ' + GuomConversion);
                    var msg = 'Total piece should not exceed ' + GuomConversion;
                    var flg = 4;
                    var mode = 1;
                    AlartMessage(msg, flg, mode);
                    $('#ddlcolor').val('0').trigger('change');
                    $('#txtpcs').val('');
                    loadcolorTable(comboList);
                    $('#btncolorupdate').hide();
                    $('#btncoloradd').show();
                    return true;
                }
            }
        }
        currentrowsel[0]['ComboId'] = $("#ddlcombo").val();
        currentrowsel[0]['ComboName'] = $("#ddlcombo option:selected").text();
        currentrowsel[0]['ColorId'] = $("#ddlcolor").val();
        currentrowsel[0]['ColorName'] = $("#ddlcolor option:selected").text();
        currentrowsel[0]['ColorRatio'] = $("#txtpcs").val();
        currentrowsel[0]['ItemId'] = $("#ddlcoloritem").val();
        currentrowsel[0]['ItemName'] = $("#ddlcoloritem option:selected").text();
        currentrowsel[0]['ComboPer'] = $("#txtper").val();
        currentrowsel[0]['ComboQty'] = $("#txtcolorqty").val();
        var result = [];
        comboList[rowindex] = currentrowsel[0];
        var d = currentrowsel[0]['ColorSeq'];
        loadcolorTable(comboList);
        $('#btncolorupdate').hide();
        $('#btncoloradd').show();
        if (Mod == 0) {
            fnClearColorControls();
        }
        else {
            for (var e = 0; e < comboItemList.length; e++) {
                if (comboItemList[e].Itemseq == d) {
                    comboItemList[e].Combocolor = currentrowsel[0]['ComboName'];
                    comboItemList[e].ItemID = currentrowsel[0]['ItemId'];
                    comboItemList[e].ItemName = currentrowsel[0]['ItemName'];
                }
            }
            loadcolorItemTable(comboItemList);
            fnClearColorControls();
        }
    });

    $(document).on('click', '.btnremove', function () {
        debugger;

        if (CShip > 0) {
            //alert("Shipment has been made for this Order,Cannot Delete the Size...");
            var msg = 'Shipment has been made for this Order,Cannot Delete the Size...';
            var flg = 4;
            var mode = 1;
            AlartMessage(msg, flg, mode);
            return true;
        }
        if (CBom > 0) {
            //alert("Planning has been made for this Order,Cannot Delete the Size...");
            var msg = 'Planning has been made for this Order,Cannot Delete the Size...';
            var flg = 4;
            var mode = 1;
            AlartMessage(msg, flg, mode);
            return true;
        }

        rowindex = $(this).closest('tr').index();

        var currentrowsel = sizeList.slice(rowindex);

        colorseq = currentrowsel[0]['SizeName'];
        //var colorempty = [];
        //colorempty = comboList;

        //colorempty = $.grep(colorempty, function (v) {
        //    return v.ComboSeq === sizeseq;
        //});

        sizeList.splice(rowindex, 1);
        document.getElementById("tblsizedetails").deleteRow(rowindex + 1);
    });

    $(document).on('click', '.btncolorremove', function () {
        debugger;
        if (CShip > 0) {
            //alert("Shipment has been made for this Order,Cannot Delete the Color...");
            var msg = 'Shipment has been made for this Order,Cannot Delete the Color...';
            var flg = 4;
            var mode = 1;
            AlartMessage(msg, flg, mode);
            return true;
        }
        if (CBom > 0) {
            //alert("Planning has been made for this Order,Cannot Delete the Color...");
            var msg = 'Planning has been made for this Order,Cannot Delete the Color...';
            var flg = 4;
            var mode = 1;
            AlartMessage(msg, flg, mode);
            return true;
        }

        rowindex = $(this).closest('tr').index();

        var currentrowsel = comboList.slice(rowindex);

        colorseq = currentrowsel[0]['ColorSeq'];

        comboList.splice(rowindex, 1);


        comboItemList = $.grep(comboItemList, function (v) {
            return (v.Itemseq != colorseq);
        });

        //comboItemList.splice(rowindex, 1);
        result.splice(rowindex, 1);
        document.getElementById("tblcolordetails").deleteRow(rowindex + 1);

        loadcolorItemTable(comboItemList);
    });

    $(document).on('click', '.btncolorview', function () {
        debugger;
        var isItem = $('#divyarn').is(':visible');
        yarnlist = [];
        if (isItem == false) {
            $('#divyarn').show();
        }
        rowindex = $(this).closest('tr').index();
        var currcomboinfo = comboList.slice(rowindex);

        var currentcolorrow = comboItemList.slice(rowindex);

        itemseq = currentcolorrow[0].Itemseq;
        itemname = currentcolorrow[0].ItemName;
        combocol = currcomboinfo[0].ComboName;
        colorseq = currcomboinfo[0].ColorSeq;
        comboitemrowid = currentcolorrow[0].ComboitemRowId;
        if (comboItemYarnList.length > 0) {
            for (var d = 0; d < comboItemYarnList.length; d++) {
                if (Mod == 0) {
                    if (comboItemYarnList[d].ComboItemRowId == itemseq) {
                        yarnlist.push(comboItemYarnList[d]);
                    }
                }
                else if (Mod == 1) {

                    if (comboItemYarnList[d].ColorSeq == itemseq) {
                        yarnlist.push(comboItemYarnList[d]);
                    }
                    if (comboItemYarnList[d].ComboItemRowId == comboitemrowid) {
                        comboItemYarnList[d].combocolor = combocol;
                    }
                }
            }
            loadcolorItemYarnTable(yarnlist);
        }
    });

    $('#btnyarnadd').click(function () {
        debugger;
        //validation and add order items
        var isAllValid = true;

        debugger;
        if ($('#ddlyarncolor').val() == "0") {
            isAllValid = false;
            // $('#ddlyarncolor').siblings('span.error').css('visibility', 'visible');
            $('#ddlyarncolor').siblings(".select2-container").css('border', '1px solid red');
        }
        else {
            // $('#ddlyarncolor').siblings('span.error').css('visibility', 'hidden');
            $('#ddlyarncolor').siblings(".select2-container").css('border', 'lightgrey');
        }

        if (isAllValid) {
            debugger;
            var comboItemYarnListObj = {
                RowId: 0,
                ComboItemRowId: itemseq,
                combocolor: combocol,
                ColorSeq: colorseq,
                Itemname: itemname,
                ColorName: $("#ddlyarncolor option:selected").text(),
                ColorID: $('#ddlyarncolor').val(),
                Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
            };
            var cl = $("#ddlyarncolor option:selected").text();

            for (var t = 0; t < comboItemYarnList.length; t++) {
                if (comboItemYarnList[t].combocolor == combocol && comboItemYarnList[t].ColorName == cl) {
                    //alert('Duplicate Color for same Combo...');
                    var msg = 'Duplicate Color for same Combo...';
                    var flg = 4;
                    var mode = 1;
                    AlartMessage(msg, flg, mode);
                    return true;
                }
            }

            comboItemYarnList.push(comboItemYarnListObj);
            yarnlist = [];
            for (var s = 0; s < comboItemYarnList.length; s++) {
                //if (comboItemYarnList[s].ComboItemRowId == itemseq) {
                if (comboItemYarnList[s].ColorSeq == itemseq) {
                    yarnlist.push(comboItemYarnList[s]);
                }

            }

            loadcolorItemYarnTable(yarnlist);

            //clear select data
            //$('#tblsizedetails').DataTable().destroy();
            $('#ddlyarncolor').val('0').trigger('change');
        }
    });

    $(document).on('click', '.btnyarnedit', function () {
        debugger;

        if (CShip > 0) {
            //alert("Shipment has been made for this Order,Cannot Update the Yarn Dyeing Color...");
            var msg = 'Shipment has been made for this Order,Cannot Update the Yarn Dyeing Color...';
            var flg = 4;
            var mode = 1;
            AlartMessage(msg, flg, mode);
            return true;
        }
        if (CBom > 0) {
            //alert("Planning has been made for this Order,Cannot Update the  Yarn Dyeing Color...");
            var msg = 'Planning has been made for this Order,Cannot Update the  Yarn Dyeing Color...';
            var flg = 4;
            var mode = 1;
            AlartMessage(msg, flg, mode);
            return true;
        }
        //Mod = 1;

        var table = $('#tblyarndetails').DataTable();
        YarnColSeq = table.row($(this).parents('tr')).data()["ColorSeq"];
        rowid = table.row($(this).parents('tr')).data()["RowId"];
        ComboYarnRowId = table.row($(this).parents('tr')).data()["ComboItemRowId"];
        ComboYarnColorName = table.row($(this).parents('tr')).data()["ColorName"];
        ComboColorYarn = table.row($(this).parents('tr')).data()["combocolor"];
        YarnColorId = table.row($(this).parents('tr')).data()["ColorID"];

        if (Mod == 0) {
            var comboItemYarnListtst = $.grep(comboItemYarnList, function (item) {
                return item.ColorSeq === YarnColSeq && item.ColorID == YarnColorId && item.ColorName == ComboYarnColorName;
            });
        }
        else if (Mod == 1) {
            var comboItemYarnListtst = $.grep(comboItemYarnList, function (item) {
                return item.ColorSeq === YarnColSeq && item.ColorID == YarnColorId && item.ColorName == ComboYarnColorName && item.RowId == rowid;
            });
        }

        //rowindex = $(this).closest('tr').index();
        //var ColorSeq = $(this).closest('tr').find('td:eq(2)').html();
        //var currentro12 = matchingItems.slice(rowindex);

        $('#ddlyarncolor').val(comboItemYarnListtst[0]['ColorID']).trigger('change');

        $('#btnyarnadd').hide();
        $('#btnyarnupdate').show();
    });

    $('#btnyarnupdate').click(function () {
        debugger;

        var matchingItems = [];
        //var tableyarn = $('#tblyarndetails').DataTable();
        //YarnColSeq = tableyarn.row($(this).parents('tr')).data()["ColorSeq"];
        if (Mod == 0) {
            matchingItems = $.grep(comboItemYarnList, function (item) {
                return item.ColorSeq === YarnColSeq && item.ColorID == YarnColorId && item.ColorName == ComboYarnColorName;
            });
        }
        else if (Mod == 1) {
            matchingItems = $.grep(comboItemYarnList, function (item) {
                return item.ColorSeq === YarnColSeq && item.ColorID == YarnColorId && item.ColorName == ComboYarnColorName && item.RowId == rowid;
            });
        }


        //var currentro12 = comboItemYarnList.slice(rowindex);

        matchingItems[0]['ColorID'] = $('#ddlyarncolor').val();
        matchingItems[0]['ColorName'] = $("#ddlyarncolor option:selected").text();

        //var currentrowsel = comboItemYarnList.slice(rowindex);
        if (Mod == 0) {
            for (var r = 0; r < comboItemYarnList.length; r++) {
                if (comboItemYarnList[r].ColorSeq === YarnColSeq && comboItemYarnList[r].ColorID === YarnColorId && comboItemYarnList[r].ColorName === ComboYarnColorName) {
                    comboItemYarnList[r].ColorID = $('#ddlyarncolor').val();
                    comboItemYarnList[r].ColorName = $("#ddlyarncolor option:selected").text();
                }
            }
        }
        else if (Mod == 1) {
            for (var r = 0; r < comboItemYarnList.length; r++) {
                if (comboItemYarnList[r].ColorSeq === YarnColSeq && comboItemYarnList[r].ColorID === YarnColorId && comboItemYarnList[r].ColorName === ComboYarnColorName && comboItemYarnList[r].RowId === rowid) {
                    comboItemYarnList[r].ColorID = $('#ddlyarncolor').val();
                    comboItemYarnList[r].ColorName = $("#ddlyarncolor option:selected").text();
                }
            }
        }

        //currentrowsel[0]['ColorID'] = $("#ddlyarncolor").val();
        //currentrowsel[0]['ColorName'] = $("#ddlyarncolor option:selected").text();

        //comboItemYarnList[rowindex] = matchingItems[0];



        loadcolorItemYarnTable(comboItemYarnList);

        $('#btnyarnupdate').hide();
        $('#btnyarnadd').show();
        $('#ddlyarncolor').val('0').trigger('change');

        YarnColSeq = 0;
        rowid = 0;
        ComboYarnRowId = 0;
        ComboYarnColorName = 0;
        ComboColorYarn = 0;
        YarnColorId = 0;

    });

    $(document).on('click', '.btnyarnremove', function () {
        debugger;
        rowindex = $(this).closest('tr').index();

        var table = $('#tblyarndetails').DataTable();
        //YarnColSeq = table.row($(this).parents('tr')).data()["ColorSeq"];
        rowid = table.row($(this).parents('tr')).data()["RowId"];
        colorname = table.row($(this).parents('tr')).data()["ColorName"];
        combocolor = table.row($(this).parents('tr')).data()["combocolor"];
        colorseq = table.row($(this).parents('tr')).data()["ColorSeq"];

        if (Mod == 1) {
            comboItemYarnList = $.grep(comboItemYarnList, function (v) {
                return (v.RowId != rowid);
            });
            loadcolorItemYarnTable(comboItemYarnList);
        }
        else if (Mod == 0) {
            comboItemYarnList = $.grep(comboItemYarnList, function (v) {
                return v.ColorName != colorname && v.combocolor != combocolor && v.ColorSeq != colorseq;
            });
            loadcolorItemYarnTable(comboItemYarnList);
        }

        for (var d = 0; d < comboItemYarnList.length; d++) {
            if (Mod == 0) {
                if (comboItemYarnList[d].ComboItemRowId == colorseq) {
                    yarnlist.push(comboItemYarnList[d]);
                }
            }
            else if (Mod == 1) {
                //if (comboItemYarnList[d].ComboItemRowId == comboitemrowid) {
                if (comboItemYarnList[d].ColorSeq == colorseq) {
                    yarnlist.push(comboItemYarnList[d]);
                }
            }
        }
        loadcolorItemYarnTable(yarnlist);
        //comboItemYarnList.splice(rowindex, 1);
        //document.getElementById("tblyarndetails").deleteRow(rowindex + 1);
        rowid = 0;
        combocolor = 0;
        colorseq = 0;
    });

    $("#ddlcombo").change(function () {
        debugger;
        var ddlcomboid = $('#ddlcombo').val();
        $('#ddlcolor').val(ddlcomboid).trigger('change');
        $('#txtpcs').val(GuomConversion);
    });

    $("#ddlcolor").change(function () {
        debugger;
        var ddlcomboid = $('#ddlcolor').val();
        // $('#ddlcolor').val(ddlcomboid);
        $('#txtpcs').val(GuomConversion);
    });
});
////////////////////////////////////Amend

function clearTextBox() {
    debugger;
    Mod = 0;
    StyleType = "N";
    // $('#ddlBuyer').empty();
    // $('#ddlOrderNo').empty();
    //$('#ddlseason').empty();
    //$('#ddlstyle').empty();
    $('#ddlsize').empty();
    $('#ddlcolor').empty();
    $('#ddlcombo').empty();
    $('#ddlitem').empty();
    $('#ddlcoloritem').empty();
    $('#ddlenquiryno').empty();


    $('#txtstyledate').val("");
    //  $('#ddlBuyer').val("0");
    $('#ddlcombo').val("0").trigger('change');
    $('#ddlcolor').val("0").trigger('change');
    $('#ddlitem').val("0").trigger('change');
    $('#ddlcoloritem').val("0").trigger('change');
    $('#ddlCurrencyload').val("0").trigger('change');
    $('#ddlseason').val("0").trigger('change');
    $('#ddlstyle').val("0").trigger('change');
    //  $('#ddlOrderNo').val("0");
    $('#ddlenquiryno').val("0").trigger('change');
    $('#txtenqno').val("");
    //   $('#txtRefNo').val("");
    $('#txtQty').val("");
    $('#txtstyle').val("");
    $('#txtseason').val("");
    $('#txtarticleno').val("");
    $('#txtitemref').val("");
    $('#txtquantity').val("");
    $('#txtoldquantity').val("");
    $('#txtrate').val("");
    $('#txtamount').val("");
    $('#txtbalamount').val("");
    $('#txtinr').val("");
    $('#txtcadweight').val("");
    $('#txtcadper').val("");

    // $('#btnUpdate').hide();
    $('#btnDelete').hide();
    $('#btnAdd').show();
    $('#btnShipUpdate').hide();
    $('#divitem').hide();
    //$('#divcolor').hide();
    $('#divyarn').hide();

    $('#btncldupdate').hide();
    $('#btncolorupdate').hide();
    $('#btnitemupdate').hide();
    $('#btnyarnupdate').hide();

    $('#txtstyledate').css('border-color', 'lightgrey');
    // $('#ddlBuyer').css('border-color', 'lightgrey');
    //  $('#ddlOrderNo').css('border-color', 'lightgrey');
    $('#txtenqno').css('border-color', 'lightgrey');
    // $('#txtRefNo').css('border-color', 'lightgrey');
    $('#txtstyle').css('border-color', 'lightgrey');
    $('#txtseason').css('border-color', 'lightgrey');
    $('#txtarticleno').css('border-color', 'lightgrey');
    $('#txtitemref').css('border-color', 'lightgrey');
    $('#txtquantity').css('border-color', 'lightgrey');
    $('#txtoldquantity').css('border-color', 'lightgrey');
    $('#txtrate').css('border-color', 'lightgrey');
    $('#txtamount').css('border-color', 'lightgrey');

    //Clear DataTable
    var tablesize = $('#tblsizedetails').DataTable();
    tablesize.clear().draw();
    var tablecolor = $('#tblcolordetails').DataTable();
    tablecolor.clear().draw();
    var tableitem = $('#tblitemdetails').DataTable();
    tableitem.clear().draw();
    var tableyarn = $('#tblyarndetails').DataTable();
    tableyarn.clear().draw();

    //   LoadBuyerDDL("#ddlBuyer");

    //LoadSeasonDDL("#ddlseason");
    //LoadStyleDDL("#ddlstyle");
    LoadGSizeDDL("#ddlsize");
    LoadColorDDL("#ddlcombo,#ddlcolor,#ddlyarncolor");
    //LoadItemDDL("#ddlitem");
    LoadEnquiryDDL("#ddlenquiryno");

    $('#txtstyledate').val(moment(new Date()).format('DD/MM/YYYY'));

    sizeList = [];
    comboList = [];
    comboItemList = [];
    comboItemYarnList = [];

    SumTotQty = 0;
    StyleRowNoId = 0;

    if (Mod == 0) {
        //LoadOrderNoDDL("#ddlOrderNo");
        //loadorderno();
    }
    else {
        //$('#ddlOrderNo').val("0");
        //LoadOrderNoDDL("#ddlOrderNo");
    }
    fnGetRefQty(BMasId);


}
function fnGetRefQty(OrderId) {
    debugger;
    //LoadBuyerDDL("#ddlBuyer");
    //LoadOrderNoDDL("#ddlOrderNo");
    $.ajax({
        url: "/StyleEntry/GetbyIDOrder/" + OrderId,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        //dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;

            if (result.Status == 'SUCCESS') {
                $('#txtRefNo').val(obj.Ref_No);
                $('#txtQty').val(obj.quantity);
                $('#ddlBuyer').val(obj.BuyerName);
                $('#ddlOrderNo').val(obj.order_no);
                $('#ddlOrderNoId').val(OrderId);
                GuomConversion = obj.GuomConversion;
                //if (obj.Buyerid > 0) {
                //    $.ajax({
                //        url: "/Buyer/getbyID/" + obj.Buyerid,
                //        typr: "GET",
                //        contentType: "application/json;charset=UTF-8",
                //        dataType: "json",
                //        success: function (result) {
                //            debugger;
                //            var obj = result.Value;
                //            var currid = obj.Currency;
                //            $.ajax({
                //                url: "/Currency/GetCurrency",
                //                data: JSON.stringify({}),
                //                type: "GET",
                //                contentType: "application/json;charset=UTF-8",
                //                //dataType: "json",
                //                success: function (result) {
                //                    debugger;
                //                    var obj = result.Value;
                //                    $('#ddlCurrencyload').empty();
                //                    $('#ddlCurrencyload').append($('<option/>').val('0').text('--Select Currency--'));
                //                    $.each(obj, function () {
                //                        $('#ddlCurrencyload').append($('<option></option>').val(this.CurrencyId).text(this.CurrencyName));
                //                    });
                //                    $('#ddlCurrencyload').val(currid).trigger('change');
                //                    LoadINR();
                //                },
                //                error: function (errormessage) {
                //                    debugger;
                //                    alert(errormessage.responseText);
                //                }
                //            });
                //            //$('#ddlCurrency').val(obj.Currency).trigger('change');
                //            //LoadINR();
                //        },
                //        error: function (errormessage) {
                //            alert(errormessage.responseText);
                //        }
                //    });
                //}
            }

            loadorderQtyno(BMasId);
        },
        error: function (errormessage) {
            debugger;
            alert(errormessage.responseText);
        }
    });
}

function GetStyleNo() {
    debugger;
    var OrderNo = '';
    var ON = $('#ddlOrderNo').val();
    if (ON == 0) {
        OrderNo = "";
        //alert('Please select any OrderNo...');
        var msg = 'Please select any OrderNo...';
        var flg = 4;
        var mode = 1;
        AlartMessage(msg, flg, mode);
        //return false;
    }
    else {
        OrderNo = $('#ddlOrderNo option:selected').text();
    }
    $.ajax({
        url: "/styleentry/GetStyleNumber/",
        data: JSON.stringify({ OrdNo: OrderNo }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        //dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            CpyStyle = obj;
            $('#ddlStyleNo').empty();
            $('#ddlStyleNo').append($('<option/>').val('0').text('--Select Style--'));
            $.each(obj, function () {
                $('#ddlStyleNo').append($('<option></option>').val(this.StyleId).text(this.StyleName));
            });


        },
        error: function (errormessage) {
            debugger;
            alert(errormessage.responseText);
        }
    });
}

function LoadOrdData() {
    var ON = $('#ddlOrderNo').val();
    var SN = $('#ddlStyleNo').val();

    BMasId = ON;

    Mod = 1;
    //$.ajax({
    //    url: "/StyleEntry/GetShipmentEntry/" + StyleRowID,
    //    type: "GET",
    //    contentType: "application/json;charset=UTF-8",
    //    dataType: "json",
    //    success: function (result) {
    //        var obj = result.Value;

    //        if (obj == true) {
    //            alert("Shipment has been made for this Order No...");
    //        }
    //        else {
    $('#myModal').modal('show');
    $('#btnUpdate').show();
    $('#btnDelete').hide();
    $('#btnAdd').hide();

    $('#divcolor').show();
    $('#divitem').show();
    $('#divyarn').show();

    ///LoadBuyerDDL("#ddlBuyer");
    //LoadOrderNoDDL("#ddlOrderNo");
    // LoadSeasonDDL("#ddlseason");
    //LoadStyleDDL("#ddlstyle");
    LoadGSizeDDL("#ddlsize");
    //LoadItemDDL("#ddlitem");
    LoadColorDDL("#ddlcombo,#ddlcolor,#ddlyarncolor");

    //Mode = 1;
    $('#txtstyledate').css('border-color', 'lightgrey');
    // $('#ddlBuyer').css('border-color', 'lightgrey');
    // $('#ddlOrderNo').css('border-color', 'lightgrey');
    $('#txtenqno').css('border-color', 'lightgrey');
    $('#txtRefNo').css('border-color', 'lightgrey');
    $('#txtstyle').css('border-color', 'lightgrey');
    $('#txtseason').css('border-color', 'lightgrey');
    $('#txtarticleno').css('border-color', 'lightgrey');
    $('#txtitemref').css('border-color', 'lightgrey');
    $('#txtquantity').css('border-color', 'lightgrey');
    $('#txtoldquantity').css('border-color', 'lightgrey');
    $('#txtrate').css('border-color', 'lightgrey');
    $('#txtamount').css('border-color', 'lightgrey');
    debugger;

    var OrderNo = $('#ddlOrderNo option:selected').text();
    PlanOrderNo = OrderNo;
    LoadCheckBomShipDetails(OrderNo, SN);
    $.ajax({
        url: "/styleentry/GetStylerowidDetails",
        data: JSON.stringify({ order_no: OrderNo, Styleid: SN }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            debugger;
            if (obj != undefined) {

                StyleRowID = obj[0].StyleRowid;
            }

            //StyleRowID = 7054;
            $.ajax({
                url: "/StyleEntry/getbyID/" + StyleRowID,
                type: "GET",
                contentType: "application/json;charset=UTF-8",
                dataType: "json",
                success: function (result) {
                    debugger;
                    var obj = result.Value;
                    //Mode = 1;
                    // $('#ddlBuyer').val(1);
                    //$("#txtstyleEntryID").val(obj.StyleRowid);
                    StyleRowNoId = obj.StyleRowid;
                    //$('#ddlOrderNo').val(obj.order_no);
                    //var text1 = obj.order_no;
                    //$("#ddlOrderNo option").filter(function () {
                    //  return this.text == text1;
                    //}).attr('selected', true);
                    //$("#ddlOrderNo option:selected").text().valueOf() = obj.order_no;
                    //$('#txtenqno').val(obj.Season);
                    //$('#txtRefNo').val(obj.Ref_No);
                    // $('#ddlOrderNo').val(obj.order_no);
                    //$('#ddlstyle').val(obj.Styleid).trigger('change');
                    $('#ddlseason').val(obj.SeasonId).trigger('change');

                    //$('#ddlstyle').val(obj.Styleid);
                    //$('#ddlseason').val(obj.SeasonId);
                    $('#txtstyledate').val(moment(obj.styleentdate).format('DD/MM/YYYY'));
                    //$('#txtarticleno').val(0);
                    // $('#txtitemref').val(1);
                    $('#txtQty').val(obj.quantity);
                    $('#txtquantity').val(obj.quantity);
                    $('#txtrate').val(obj.price);
                    $('#txtamount').val(obj.value);
                    // $('#ddlCurrencyload').val(obj.CurrencyId).trigger('change');
                    //$('#txtinr').val(obj.ExRate);
                    // //$('#txtcadweight').val(obj.CADWeight);
                    //$('#txtcadper').val(obj.CADPercentage);

                    $('#ddlitem').empty();
                    $('#ddlcoloritem').empty();
                    // var styid = $('#ddlstyle').val();
                    fngetitembystyle(SN);
                    //LoadCheckBomShipDetails();

                    var OrderId = $("#ddlOrderNoId").val();


                    fnGetRefQty(ON);

                    sizeList = obj.ComboSize;
                    comboList = obj.ComboColor;
                    comboItemList = obj.ComboStyleItem;
                    comboItemYarnList = obj.ComboItemComposition;


                    if (Mod == 1) {
                        comboList.sort(function (a, b) {
                            return a.ColorSeq - b.ColorSeq;
                        });

                        comboItemList.sort(function (a, b) {
                            return a.Itemseq - b.Itemseq;
                        });
                    }

                    $.each(comboItemList, function (d) {
                        var cid = comboItemList[d].Itemseq;
                        for (var v = 0; v < comboList.length; v++) {
                            if (comboList[v].ColorSeq == cid) {
                                comboItemList[d].Combocolor = comboList[v].ComboName;
                            }
                        }
                    });

                    $.each(comboItemYarnList, function (f) {
                        var yid = comboItemYarnList[f].ComboItemRowId;
                        for (var v = 0; v < comboItemList.length; v++) {
                            if (comboItemList[v].ComboitemRowId == yid) {
                                //comboItemYarnList[f].combocolor = comboItemList[v].Combocolor;
                                comboItemYarnList[f].Itemname = comboItemList[v].ItemName;
                            }
                        }
                    });

                    if (comboItemYarnList.length > 0) {
                        for (var c = 0; c < comboList.length; c++) {
                            colorseq = comboList[c].ColorSeq;
                            ComboName = comboList[c].ComboName;
                            for (var d = 0; d < comboItemYarnList.length; d++) {
                                if (comboItemYarnList[d].ColorSeq == colorseq) {
                                    comboItemYarnList[d].combocolor = ComboName;
                                }
                            }
                        }
                        //loadcolorItemYarnTable(yarnlist);
                    }


                    var cseq = comboList[0].ColorSeq;
                    var yarnlist = [];
                    for (var d = 0; d < comboItemYarnList.length; d++) {
                        if (comboItemYarnList[d].ColorSeq == cseq) {
                            yarnlist.push(comboItemYarnList[d]);
                        }
                    }
                    loadcolorItemYarnTable(yarnlist);
                    loadsizeTable(sizeList);
                    loadcolorTable(comboList);

                    //loadcolorItemTable(comboItemList);

                    //loadcolorItemYarnTable(comboItemYarnList);
                    $("#btnCpyList").attr("disabled", true);
                    $('#btncldupdate').hide();
                    $('#btnsizeadd').show();

                    $('#btncoloradd').show();
                    $('#btncolorupdate').hide();

                    $('#btnitemadd').show();
                    $('#btnitemupdate').hide();

                    $('#btnyarnadd').show();
                    $('#btnyarnupdate').hide();

                    $('#myModal').modal('show');
                    $('#btnUpdate').show();
                    $('#btnDelete').hide();
                    $('#btnAdd').hide();

                    $('#divcolor').show();
                    $('#divitem').hide();
                    //$('#divyarn').show();

                    var isYarn = $('#divyarn').is(':visible');
                    if (isYarn == false) {
                        $('#divyarn').show();
                    }

                    debugger;
                    var StyQty = $("#txtquantity").val();
                    var BalQty = $("#txtbalamount").val();
                    if (BalQty == "") {
                        var NBalQty = 0;
                    } else {
                        var NBalQty = $("#txtbalamount").val();
                    }
                    //var SumVal = parseFloat(StyQty) - parseFloat(BalQty);
                    $("#txtbalamount").val(NBalQty);

                    if (OrdApp == 'Y') {
                        $('#btnUpdate').hide();
                        $('#btnDelete').hide();
                        $('#btnAdd').hide();
                    }

                },
                error: function (errormessage) {
                    alert(errormessage.responseText);
                }
            });
            getbyIDship(StyleRowID);
            LoadMainDetails(StyleRowID);
            EditDetShipPlanList(StyleRowID);
            EditDetTotalPackList(StyleRowID);
            EditDetTotSepPackList(StyleRowID);

            var Type = 'M';
            LoadPlanAdd(StyleRowID, Mod, Type);
            return false;
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}

function loadtable() {
    debugger;
    LoadingSymb();
    indexforfill;
    var currentrow = ConItemList.slice(indexforfill);

    var sno = currentrow[0].CompSlNo;
    var pno = currentrow[0].CPlanSlNo;
    var PQty = currentrow[0].Prdn_Qty;
    var totpcs = currentrow[0].TotPieces;
    var l = currentrow[0].Length;
    var allen = currentrow[0].AlloLen;
    var w = currentrow[0].Width;
    var allwid = currentrow[0].AllowWid;
    var g = currentrow[0].GSM;
    var gram = currentrow[0].Grammage;
    var color = currentrow[0].Color;
    var size = currentrow[0].Size;
    var Colorid = currentrow[0].ColorID;
    var Sizeid = currentrow[0].SizeId;
    var Wtgh = currentrow[0].Weight;
    var fid = currentrow[0].FinishWidthID;
    var fin = currentrow[0].FinishWidth;
    var gid = currentrow[0].GreyWidthID;
    var gry = currentrow[0].GreyWidth;
    var grmpcs = currentrow[0].GmsPieces;
    var req = currentrow[0].Requirement;
    var tomt = currentrow[0].TotMetres;
    var wtmet = currentrow[0].WtMetre;
    var pat = currentrow[0].Pattern;
    var noofparts = currentrow[0].No_Of_Parts;

    //var twt = PQty * gram / 1000;  

    for (var t = 0; t < compList.length; t++) {
        if (compList[t].CompSlNo == sno) {
            var parts = compList[t].No_Of_Parts;
        }
    }

    var table = $('#tCPIbody').DataTable();
    var data = table.rows().data();


    var fabtable = $('#tCDbody').DataTable();
    var fabdata = fabtable.rows().data();

    if (type == 'KNITS') {

        var protype = $('input[name="ALType"]:checked').attr('value');
        if (protype == 'A') {
            if (fillvar == 'L' || fillvar == 'W' || fillvar == 'GS' || fillvar == 'AL' || fillvar == 'AW' || fillvar == 'P') {

                //Dia
                var dd = parseFloat(w) + parseFloat(allwid);
                dd = parseFloat(dd / 2.54).toFixed(0);
                var r = dd + "DIA";

                var fab = $.grep(Fabriclist, function (e) {

                    return e.Size == r;

                });
                var fid = 0;
                var fn = '';
                if (fab.length == 0 && dd != 0) {

                    DiaSize = r;

                    $.when($.ajax(SizeAdd(r))).done(function getfabric() {

                        var fabres = $.grep(Fabriclist, function (e) {

                            return e.Size == DiaSize;

                        });
                        fid = fabres[0].SizeId;
                        fn = fabres[0].Size;

                    });
                }
                else {
                    if (dd == 0) {
                        fid = 0;
                        fn = '--Select--';
                    }
                    else {
                        var fabres = $.grep(Fabriclist, function (e) {

                            return e.Size == DiaSize;

                        });
                        fid = fabres[0].SizeId;
                        fn = fabres[0].Size;
                    }

                }
                $.each(ConItemList, function () {
                    this.Length = l;
                    this.AlloLen = allen;
                    this.Width = w;
                    this.AllowWid = allwid;
                    this.Pattern = pat;
                    this.GSM = g;

                    if (pat == 0) {
                        res1 = 0;
                    }
                    else {
                        var totlen = parseFloat(l) + parseFloat(allen);
                        var totwid = parseFloat(w) + parseFloat(allwid);
                        var res1 = parseFloat(parseFloat(totlen * totwid) / pat);
                    }

                    res1 = res1.toFixed(3);
                    var res = (res1 * g) / 10000;

                    this.Grammage = res;
                    this.FinishWidthID = fid;
                    this.FinishWidth = fn;
                    this.GreyWidthID = fid;
                    this.GreyWidth = fn;

                });
                $.each(ConItemListSave, function () {
                    if (this.CompSlNo == sno) {
                        this.Length = l;
                        this.AlloLen = allen;
                        this.Width = w;
                        this.AllowWid = allwid;
                        this.Pattern = pat;
                        this.GSM = g;

                        if (pat == 0) {
                            res1 = 0;
                        }
                        else {
                            var totlen = parseFloat(l) + parseFloat(allen);
                            var totwid = parseFloat(w) + parseFloat(allwid);
                            var res1 = parseFloat(parseFloat(totlen * totwid) / pat);
                        }

                        res1 = res1.toFixed(3);
                        var res = (res1 * g) / 10000;

                        this.Grammage = res;
                        this.FinishWidthID = fid;
                        this.FinishWidth = fn;
                        this.GreyWidthID = fid;
                        this.GreyWidth = fn;

                    }
                });
                loadAdConTable(ConItemList);
            }

            if (fillvar == 'GRM') {
                $.each(ConItemList, function () {
                    this.Length = l;
                    this.Width = w;
                    this.GSM = g;
                    this.Grammage = gram;

                });
                $.each(ConItemListSave, function () {
                    if (this.CompSlNo == sno) {
                        this.Length = l;
                        this.Width = w;
                        this.GSM = g;
                        this.Grammage = gram;

                    }
                });

                for (var s = 0; s < ConItemList.length; s++) {
                    var sn = ConItemList[s].CPlanSlNo;
                    p = ConItemList[s].Prdn_Qty;
                    rm = ConItemList[s].Grammage;
                    ConItemList[s].Weight = (((p * rm) / 1000) * parts).toFixed(3);
                    $('input[id=txtGram]').each(function (ig) {
                        if (data[ig].CPlanSlNo == sn) {
                            var row = $(this).closest('tr');
                            row.find('#txtLen').val(l);
                            row.find('#txtWidth').val(w);
                            row.find('#txtGsm').val(g);
                            row.find('#txtGram').val(gram);
                            row.find('#txtWght').val((((p * rm) / 1000) * parts).toFixed(3));
                        }
                    });
                }
            }

            if (fillvar == 'FW') {
                $.each(ConItemList, function () {
                    this.FinishWidthID = fid;
                    this.FinishWidth = fin;
                });
                $.each(ConItemListSave, function () {
                    if (this.CompSlNo == sno) {
                        this.FinishWidthID = fid;
                        this.FinishWidth = fin;
                    }
                });
                loadAdConTable(ConItemList);
                //loadconSaveTable(ConItemListSave);
                ConsmtnHideCol(type);
                return true;
            }
            if (fillvar == 'GYW') {
                $.each(ConItemList, function () {
                    this.GreyWidthID = gid;
                    this.GreyWidth = gry;
                });
                $.each(ConItemListSave, function () {
                    if (this.CompSlNo == sno) {
                        this.GreyWidthID = gid;
                        this.GreyWidth = gry;
                    }
                });
                loadAdConTable(ConItemList);
                //loadconSaveTable(ConItemListSave);
                ConsmtnHideCol(type);
                return true;
            }



        }
        if (protype == 'S') {
            if (fillvar == 'L' || fillvar == 'W' || fillvar == 'GS' || fillvar == 'AL' || fillvar == 'AW' || fillvar == 'P') {
                //Dia
                var dd = parseFloat(w) + parseFloat(allwid);
                dd = parseFloat(dd / 2.54).toFixed(0);
                var r = dd + "DIA";
                var fab = $.grep(Fabriclist, function (e) {

                    return e.Size == r;

                });
                var fid = 0;
                var fn = '';
                if (fab.length == 0 && dd != 0) {
                    DiaSize = r;
                    //SizeAdd(r);

                    $.when($.ajax(SizeAdd(r))).done(function getfabric() {

                        var fabres = $.grep(Fabriclist, function (e) {

                            return e.Size == DiaSize;

                        });
                        fid = fabres[0].SizeId;
                        fn = fabres[0].Size;

                    });
                }
                else {
                    if (dd == 0) {
                        fid = 0;
                        fn = '--Select--';
                    }
                    else {
                        var fabres = $.grep(Fabriclist, function (e) {

                            return e.Size == DiaSize;

                        });
                        fid = fabres[0].SizeId;
                        fn = fabres[0].Size;
                    }

                }
                $.each(ConItemList, function () {
                    if (this.Size == size) {

                        this.Length = l;
                        this.AlloLen = allen;
                        this.Width = w;
                        this.AllowWid = allwid;
                        this.GSM = g;
                        var totlen = parseFloat(l) + parseFloat(allen);
                        this.Pattern = pat;
                        if (pat == 0) {
                            res1 = 0;
                        }
                        else {
                            var totlen = parseFloat(l) + parseFloat(allen);
                            var totwid = parseFloat(w) + parseFloat(allwid);
                            var res1 = parseFloat(parseFloat(totlen * totwid) / pat);
                        }

                        res1 = res1.toFixed(3);
                        var res = (res1 * g) / 10000;

                        this.Grammage = res;

                        this.FinishWidthID = fid;
                        this.FinishWidth = fn;
                        this.GreyWidthID = fid;
                        this.GreyWidth = fn;


                    }
                });
                $.each(ConItemListSave, function () {
                    if (this.CompSlNo == sno && this.Size == size) {
                        this.Length = l;
                        this.AlloLen = allen;
                        this.Width = w;
                        this.AllowWid = allwid;
                        this.GSM = g;
                        this.Pattern = pat;
                        if (pat == 0) {
                            res1 = 0;
                        }
                        else {
                            var totlen = parseFloat(l) + parseFloat(allen);
                            var totwid = parseFloat(w) + parseFloat(allwid);
                            var res1 = parseFloat(parseFloat(totlen * totwid) / pat);
                        }

                        res1 = res1.toFixed(3);
                        var res = (res1 * g) / 10000;

                        this.Grammage = res;

                        this.FinishWidthID = fid;
                        this.FinishWidth = fn;
                        this.GreyWidthID = fid;
                        this.GreyWidth = fn;
                    }
                });

                loadAdConTable(ConItemList);
            }


            if (fillvar == 'GRM') {
                $.each(ConItemList, function () {
                    if (this.Size == size) {
                        this.Grammage = gram;
                    }
                });
                $.each(ConItemListSave, function () {
                    if (this.CompSlNo == sno && this.Size == size) {
                        this.Grammage = gram;
                    }
                });
                loadAdConTable(ConItemList);
                //loadconSaveTable(ConItemListSave);

                for (var s = 0; s < ConItemList.length; s++) {
                    if (ConItemList[s].Size == size) {
                        var sn = ConItemList[s].CPlanSlNo;
                        p = ConItemList[s].Prdn_Qty;
                        rm = ConItemList[s].Grammage;
                        ConItemList[s].Weight = (((p * rm) / 1000) * parts).toFixed(3);
                        $('input[id=txtGram]').each(function (ig) {
                            if (data[ig].CPlanSlNo == sn) {
                                var row = $(this).closest('tr');
                                row.find('#txtLen').val(l);
                                row.find('#txtWidth').val(w);
                                row.find('#txtGsm').val(g);
                                row.find('#txtGram').val(gram);
                                row.find('#txtWght').val((((p * rm) / 1000) * parts).toFixed(3));

                            }
                        });
                    }
                }
            }
            if (fillvar == 'FW') {
                $.each(ConItemList, function () {
                    if (this.Size == size) {
                        this.FinishWidthID = fid;
                        this.FinishWidth = fin;
                    }
                });
                $.each(ConItemListSave, function () {
                    if (this.CompSlNo == sno && this.Size == size) {
                        this.FinishWidthID = fid;
                        this.FinishWidth = fin;
                    }
                });
                loadAdConTable(ConItemList);
                ConsmtnHideCol(type);
                return true;
            }

            if (fillvar == 'GYW') {
                $.each(ConItemList, function () {
                    if (this.Size == size) {
                        this.GreyWidthID = gid;
                        this.GreyWidth = gry;
                    }
                });
                $.each(ConItemListSave, function () {
                    if (this.CompSlNo == sno && this.Size == size) {
                        this.GreyWidthID = gid;
                        this.GreyWidth = gry;
                    }
                });
                loadAdConTable(ConItemList);
                ConsmtnHideCol(type);
                return true;
            }


        }
        if (protype == 'C') {
            if (fillvar == 'L' || fillvar == 'W' || fillvar == 'GS' || fillvar == 'AL' || fillvar == 'AW') {

                //Dia
                var dd = parseFloat(w) + parseFloat(allwid);
                dd = parseFloat(dd / 2.54).toFixed(0);
                var r = dd + "DIA";
                var fab = $.grep(Fabriclist, function (e) {

                    return e.Size == r;

                });
                var fid = 0;
                var fn = '';
                if (fab.length == 0 && dd != 0) {
                    DiaSize = r;
                    //SizeAdd(r);

                    $.when($.ajax(SizeAdd(r))).done(function getfabric() {

                        var fabres = $.grep(Fabriclist, function (e) {

                            return e.Size == DiaSize;

                        });
                        fid = fabres[0].SizeId;
                        fn = fabres[0].Size;

                    });
                }
                else {
                    if (dd == 0) {
                        fid = 0;
                        fn = '--Select--';
                    }
                    else {
                        var fabres = $.grep(Fabriclist, function (e) {

                            return e.Size == DiaSize;

                        });
                        fid = fabres[0].SizeId;
                        fn = fabres[0].Size;
                    }

                }
                $.each(ConItemList, function () {
                    if (this.Color == color) {
                        this.Length = l;
                        this.AlloLen = allen;
                        this.Width = w;
                        this.AllowWid = allwid;
                        this.GSM = g;
                        this.Pattern = pat;
                        if (pat == 0) {
                            res1 = 0;
                        }
                        else {
                            var totlen = parseFloat(l) + parseFloat(allen);
                            var totwid = parseFloat(w) + parseFloat(allwid);
                            var res1 = parseFloat(parseFloat(totlen * totwid) / pat);
                        }

                        res1 = res1.toFixed(3);
                        var res = (res1 * g) / 10000;
                        this.Grammage = res;
                        this.FinishWidthID = fid;
                        this.FinishWidth = fn;
                        this.GreyWidthID = fid;
                        this.GreyWidth = fn;
                    }
                });
                $.each(ConItemListSave, function () {
                    if (this.CompSlNo == sno && this.Color == color) {
                        this.Length = l;
                        this.AlloLen = allen;
                        this.Width = w;
                        this.AllowWid = allwid;
                        this.GSM = g;
                        this.Pattern = pat;

                        if (pat == 0) {
                            res1 = 0;
                        }
                        else {
                            var totlen = parseFloat(l) + parseFloat(allen);
                            var totwid = parseFloat(w) + parseFloat(allwid);
                            var res1 = parseFloat(parseFloat(totlen * totwid) / pat);
                        }

                        res1 = res1.toFixed(3);
                        var res = (res1 * g) / 10000;
                        this.Grammage = res;
                        this.FinishWidthID = fid;
                        this.FinishWidth = fn;
                        this.GreyWidthID = fid;
                        this.GreyWidth = fn;
                    }
                });
                loadAdConTable(ConItemList);
            }


            if (fillvar == 'GRM') {
                $.each(ConItemList, function () {
                    if (this.Color == color) {
                        this.Grammage = gram;
                    }
                });
                $.each(ConItemListSave, function () {
                    if (this.CompSlNo == sno && this.Color == color) {
                        this.Grammage = gram;
                    }
                });
                for (var s = 0; s < ConItemList.length; s++) {
                    if (ConItemList[s].Color == color) {
                        var sn = ConItemList[s].CPlanSlNo;
                        p = ConItemList[s].Prdn_Qty;
                        rm = ConItemList[s].Grammage;
                        ConItemList[s].Weight = (((p * rm) / 1000) * parts).toFixed(3);

                        $('input[id=txtGram]').each(function (ig) {
                            if (data[ig].CPlanSlNo == sn) {
                                var row = $(this).closest('tr');

                                row.find('#txtGram').val(gram);
                                row.find('#txtWght').val((((p * rm) / 1000) * parts).toFixed(3));

                            }
                        });

                    }
                }
            }

            if (fillvar == 'FW') {
                $.each(ConItemList, function () {
                    if (this.Color == color) {
                        this.FinishWidthID = fid;
                        this.FinishWidth = fin;
                    }
                });
                $.each(ConItemListSave, function () {
                    if (this.CompSlNo == sno && this.Color == color) {
                        this.FinishWidthID = fid;
                        this.FinishWidth = fin;
                    }
                });
                loadAdConTable(ConItemList);
                ConsmtnHideCol(type);
                return true;
            }

            if (fillvar == 'GYW') {
                $.each(ConItemList, function () {
                    if (this.Color == color) {
                        this.GreyWidthID = gid;
                        this.GreyWidth = gry;
                    }
                });
                $.each(ConItemListSave, function () {
                    if (this.CompSlNo == sno && this.Color == color) {
                        this.GreyWidthID = gid;
                        this.GreyWidth = gry;
                    }
                });
                loadAdConTable(ConItemList);
                ConsmtnHideCol(type);
                return true;
            }
        }
    }
    else if (type == 'WOVEN') {
        var protype = $('input[name="ALType"]:checked').attr('value');
        if (protype == 'A') {
            if (fillvar == 'REQMNT') {
                var modtype = $('input[name="Opttype"]:checked').attr('value');
                var conval = 0;
                if (modtype == 'C') {
                    conval = 1;
                }
                else {
                    conval = 2.54;
                }


                $.each(ConItemList, function () {
                    var res = (req * conval) / 100;
                    var totmet = res * this.Prdn_Qty * parts;
                    totmet = totmet.toFixed(3);

                    this.Requirement = req;
                    this.TotMetres = totmet;
                    this.Weight = parseFloat((totmet * this.WtMetre) / 1000).toFixed(3);

                });
                $.each(ConItemListSave, function () {
                    if (this.CompSlNo == sno) {
                        var res = (req * conval) / 100;
                        var totmet = res * this.Prdn_Qty * parts;
                        totmet = totmet.toFixed(3);

                        this.Requirement = req;
                        this.TotMetres = totmet;
                        this.Weight = parseFloat((totmet * this.WtMetre) / 1000).toFixed(3);
                    }
                });

                for (var s = 0; s < ConItemList.length; s++) {

                    var sn = ConItemList[s].CPlanSlNo;
                    p = ConItemList[s].Requirement;
                    var res = (p * conval) / 100;
                    var totmet = res * ConItemList[s].Prdn_Qty * parts;
                    totmet = totmet.toFixed(3);
                    var wgh = parseFloat((totmet * ConItemList[s].WtMetre) / 1000).toFixed(3);
                    $('input[id=txtReqmnt]').each(function (ig) {
                        if (data[ig].CPlanSlNo == sn) {
                            var row = $(this).closest('tr');
                            row.find('#txtTotMetWov').val(totmet);
                            row.find('#txtReqmnt').val(p);
                            row.find('#txtWght').val(wgh);
                        }
                    });
                }
            }
            if (fillvar == 'WOVMET') {

                $.each(ConItemList, function () {

                    this.WtMetre = wtmet;
                    this.Weight = parseFloat((wtmet * this.TotMetres) / 1000).toFixed(3);

                });
                $.each(ConItemListSave, function () {
                    if (this.CompSlNo == sno) {
                        this.WtMetre = wtmet;
                        this.Weight = parseFloat((wtmet * this.TotMetres) / 1000).toFixed(3);

                    }
                });

                for (var s = 0; s < ConItemList.length; s++) {

                    var sn = ConItemList[s].CPlanSlNo;
                    p = ConItemList[s].WtMetre;
                    var res = (p * ConItemList[s].TotMetres) / 1000;

                    res = res.toFixed(3);
                    $('input[id=txtWght]').each(function (ig) {
                        if (data[ig].CPlanSlNo == sn) {
                            var row = $(this).closest('tr');
                            row.find('#txtWtmtWov').val(wtmet);
                            row.find('#txtWght').val(res);

                        }
                    });
                }
            }

            if (fillvar == 'FW') {
                $.each(ConItemList, function () {
                    this.FinishWidthID = fid;
                    this.FinishWidth = fin;
                });
                $.each(ConItemListSave, function () {
                    if (this.CompSlNo == sno) {
                        this.FinishWidthID = fid;
                        this.FinishWidth = fin;
                    }
                });
                loadAdConTable(ConItemList);
                ConsmtnHideCol(type);
                return true;
            }
            if (fillvar == 'GYW') {
                $.each(ConItemList, function () {
                    this.GreyWidthID = gid;
                    this.GreyWidth = gry;
                });
                $.each(ConItemListSave, function () {
                    if (this.CompSlNo == sno) {
                        this.GreyWidthID = gid;
                        this.GreyWidth = gry;
                    }
                });
                loadAdConTable(ConItemList);
                ConsmtnHideCol(type);
                return true;
            }
        }
        if (protype == 'S') {
            if (fillvar == 'REQMNT') {
                var modtype = $('input[name="Opttype"]:checked').attr('value');
                var conval = 0;
                if (modtype == 'C') {
                    conval = 1;
                }
                else {
                    conval = 2.54;
                }


                $.each(ConItemList, function () {
                    var res = (req * conval) / 100;
                    var totmet = res * this.Prdn_Qty * parts;
                    totmet = totmet.toFixed(3);

                    this.Requirement = req;
                    this.TotMetres = totmet;
                    this.Weight = parseFloat((totmet * this.WtMetre) / 1000).toFixed(3);

                });
                $.each(ConItemListSave, function () {
                    if (this.CompSlNo == sno && this.Size == size) {
                        var res = (req * conval) / 100;
                        var totmet = res * this.Prdn_Qty * parts;
                        totmet = totmet.toFixed(3);

                        this.Requirement = req;
                        this.TotMetres = totmet;
                        this.Weight = parseFloat((totmet * this.WtMetre) / 1000).toFixed(3);

                    }
                });

                for (var s = 0; s < ConItemList.length; s++) {
                    if (ConItemList[s].CompSlNo == sno && ConItemList[s].Size == size) {
                        var sn = ConItemList[s].CPlanSlNo;
                        p = ConItemList[s].Requirement;
                        var res = (p * conval) / 100;
                        var totmet = res * ConItemList[s].Prdn_Qty * parts;
                        totmet = totmet.toFixed(3);
                        var wgh = parseFloat((totmet * ConItemList[s].WtMetre) / 1000).toFixed(3);
                        $('input[id=txtReqmnt]').each(function (ig) {
                            if (data[ig].CPlanSlNo == sn && data[ig].Size == size) {
                                var row = $(this).closest('tr');
                                row.find('#txtTotMetWov').val(totmet);
                                row.find('#txtReqmnt').val(p);
                                row.find('#txtWght').val(wgh);
                            }
                        });
                    }
                }
            }
            if (fillvar == 'WOVMET') {
                $.each(ConItemList, function () {
                    if (this.CompSlNo == sno && this.Size == size) {
                        this.WtMetre = wtmet;
                        this.Weight = parseFloat((wtmet * this.TotMetres) / 1000).toFixed(3);
                    }

                });
                $.each(ConItemListSave, function () {
                    if (this.CompSlNo == sno && this.Size == size) {
                        this.WtMetre = wtmet;
                        this.Weight = parseFloat((wtmet * this.TotMetres) / 1000).toFixed(3);

                    }
                });

                for (var s = 0; s < ConItemList.length; s++) {
                    if (ConItemList[s].CompSlNo == sno && ConItemList[s].Size == size) {
                        var sn = ConItemList[s].CPlanSlNo;
                        p = ConItemList[s].WtMetre;
                        var res = (p * ConItemList[s].TotMetres) / 1000;

                        res = res.toFixed(3);
                        $('input[id=txtWght]').each(function (ig) {
                            if (data[ig].CPlanSlNo == sn && data[ig].Size == size) {
                                var row = $(this).closest('tr');
                                row.find('#txtWtmtWov').val(wtmet);
                                row.find('#txtWght').val(res);

                            }
                        });
                    }
                }
            }
            if (fillvar == 'FW') {
                $.each(ConItemList, function () {
                    if (this.Size == size) {
                        this.FinishWidthID = fid;
                        this.FinishWidth = fin;
                    }
                });
                $.each(ConItemListSave, function () {
                    if (this.CompSlNo == sno && this.Size == size) {
                        this.FinishWidthID = fid;
                        this.FinishWidth = fin;
                    }
                });
                loadAdConTable(ConItemList);

                ConsmtnHideCol(type);
                return true;

            }

            if (fillvar == 'GYW') {
                $.each(ConItemList, function () {
                    if (this.Size == size) {
                        this.GreyWidthID = gid;
                        this.GreyWidth = gry;
                    }
                });
                $.each(ConItemListSave, function () {
                    if (this.CompSlNo == sno && this.Size == size) {
                        this.GreyWidthID = gid;
                        this.GreyWidth = gry;
                    }
                });
                loadAdConTable(ConItemList);

                ConsmtnHideCol(type);
                return true;
            }
        }
        if (protype == 'C') {
            if (fillvar == 'REQMNT') {
                var modtype = $('input[name="Opttype"]:checked').attr('value');
                var conval = 0;
                if (modtype == 'C') {
                    conval = 1;
                }
                else {
                    conval = 2.54;
                }


                $.each(ConItemList, function () {
                    var res = (req * conval) / 100;
                    var totmet = res * this.Prdn_Qty * parts;
                    totmet = totmet.toFixed(3);

                    this.Requirement = req;
                    this.TotMetres = totmet;
                    this.Weight = parseFloat((totmet * this.WtMetre) / 1000).toFixed(3);

                });
                $.each(ConItemListSave, function () {
                    if (this.CompSlNo == sno && this.Color == color) {
                        var res = (req * conval) / 100;
                        var totmet = res * this.Prdn_Qty * parts;
                        totmet = totmet.toFixed(3);

                        this.Requirement = req;
                        this.TotMetres = totmet;
                        this.Weight = parseFloat((totmet * this.WtMetre) / 1000).toFixed(3);

                    }
                });

                for (var s = 0; s < ConItemList.length; s++) {
                    if (ConItemList[s].CompSlNo == sno && ConItemList[s].Color == color) {
                        var sn = ConItemList[s].CPlanSlNo;
                        p = ConItemList[s].Requirement;
                        var res = (p * conval) / 100;
                        var totmet = res * ConItemList[s].Prdn_Qty * parts;
                        totmet = totmet.toFixed(3);

                        var wgh = parseFloat((totmet * ConItemList[s].WtMetre) / 1000).toFixed(3);
                        $('input[id=txtReqmnt]').each(function (ig) {
                            if (data[ig].CPlanSlNo == sn && data[ig].Color == color) {
                                var row = $(this).closest('tr');
                                row.find('#txtTotMetWov').val(totmet);
                                row.find('#txtReqmnt').val(p);
                                row.find('#txtWght').val(wgh);
                            }
                        });
                    }
                }


            }
            if (fillvar == 'WOVMET') {

                $.each(ConItemList, function () {
                    if (this.CompSlNo == sno && this.Color == color) {
                        this.WtMetre = wtmet;
                        this.Weight = parseFloat((wtmet * this.TotMetres) / 1000).toFixed(3);
                    }

                });
                $.each(ConItemListSave, function () {
                    if (this.CompSlNo == sno && this.Color == color) {
                        this.WtMetre = wtmet;
                        this.Weight = parseFloat((wtmet * this.TotMetres) / 1000).toFixed(3);

                    }
                });

                for (var s = 0; s < ConItemList.length; s++) {
                    if (ConItemList[s].CompSlNo == sno && ConItemList[s].Color == color) {
                        var sn = ConItemList[s].CPlanSlNo;
                        p = ConItemList[s].WtMetre;
                        var res = (p * ConItemList[s].TotMetres) / 1000;

                        res = res.toFixed(3);

                        $('input[id=txtWght]').each(function (ig) {
                            if (data[ig].CPlanSlNo == sn && data[ig].Color == color) {
                                var row = $(this).closest('tr');
                                row.find('#txtWtmtWov').val(wtmet);
                                row.find('#txtWght').val(res);

                            }
                        });
                    }
                }



            }
            if (fillvar == 'FW') {
                $.each(ConItemList, function () {
                    if (this.Color == color) {
                        this.FinishWidthID = fid;
                        this.FinishWidth = fin;
                    }
                });
                $.each(ConItemListSave, function () {
                    if (this.CompSlNo == sno && this.Color == color) {
                        this.FinishWidthID = fid;
                        this.FinishWidth = fin;
                    }
                });
                loadAdConTable(ConItemList);
                ConsmtnHideCol(type);
                return true;
            }

            if (fillvar == 'GYW') {
                $.each(ConItemList, function () {
                    if (this.Color == color) {
                        this.GreyWidthID = gid;
                        this.GreyWidth = gry;
                    }
                });
                $.each(ConItemListSave, function () {
                    if (this.CompSlNo == sno && this.Color == color) {
                        this.GreyWidthID = gid;
                        this.GreyWidth = gry;
                    }
                });
                loadAdConTable(ConItemList);
                ConsmtnHideCol(type);
                return true;
            }
        }


        ConsmtnHideCol(type);



        return true;

    }
    else if (type == 'PANELS') {
        var protype = $('input[name="ALType"]:checked').attr('value');
        if (protype == 'A') {
            if (fillvar == 'GRMPCSPAN') {
                $.each(ConItemList, function () {
                    this.GmsPieces = grmpcs;
                    this.Weight = parseFloat((grmpcs * totpcs) / 1000).toFixed(3);

                });
                $.each(ConItemListSave, function () {
                    if (this.CompSlNo == sno) {
                        this.GmsPieces = grmpcs;
                        this.Weight = parseFloat((grmpcs * totpcs) / 1000).toFixed(3);

                    }
                });

                for (var s = 0; s < ConItemList.length; s++) {

                    var sn = ConItemList[s].CPlanSlNo;
                    p = ConItemList[s].TotPieces;
                    rm = ConItemList[s].GmsPieces;
                    ConItemList[s].Weight = parseFloat((rm * p) / 1000).toFixed(3);
                    //}

                    $('input[id=txtGmspcspan]').each(function (ig) {
                        if (data[ig].CPlanSlNo == sn) {
                            var row = $(this).closest('tr');
                            row.find('#txtGmspcspan').val(grmpcs);
                            row.find('#txtWght').val(((rm * p) / 1000).toFixed(3));

                        }
                    });
                }
            }
            if (fillvar == 'FW') {
                $.each(ConItemList, function () {
                    this.FinishWidthID = fid;
                    this.FinishWidth = fin;
                });
                $.each(ConItemListSave, function () {
                    if (this.CompSlNo == sno) {
                        this.FinishWidthID = fid;
                        this.FinishWidth = fin;
                    }
                });
                loadAdConTable(ConItemList);
                ConsmtnHideCol(type);
                return true;
            }
            if (fillvar == 'GYW') {
                $.each(ConItemList, function () {
                    this.GreyWidthID = gid;
                    this.GreyWidth = gry;
                });
                $.each(ConItemListSave, function () {
                    if (this.CompSlNo == sno) {
                        this.GreyWidthID = gid;
                        this.GreyWidth = gry;
                    }
                });
                loadAdConTable(ConItemList);
                ConsmtnHideCol(type);
                return true;
            }
        }
        else if (protype == 'S') {
            if (fillvar == 'GRMPCSPAN') {

                $.each(ConItemList, function () {
                    if (this.CompSlNo == sno && this.Size == size) {
                        this.GmsPieces = grmpcs;
                        this.Weight = parseFloat((grmpcs * totpcs) / 1000).toFixed(3);
                    }
                });
                $.each(ConItemListSave, function () {
                    if (this.CompSlNo == sno && this.Size == size) {
                        this.GmsPieces = grmpcs;
                        this.Weight = parseFloat((grmpcs * totpcs) / 1000).toFixed(3);

                    }
                });

                for (var s = 0; s < ConItemList.length; s++) {
                    if (ConItemList[s].CompSlNo == sno && ConItemList[s].Size == size) {
                        var sn = ConItemList[s].CPlanSlNo;
                        p = ConItemList[s].TotPieces;
                        rm = ConItemList[s].GmsPieces;
                        ConItemList[s].Weight = parseFloat((rm * p) / 1000).toFixed(3);
                        //}

                        $('input[id=txtGmspcspan]').each(function (ig) {
                            if (data[ig].CPlanSlNo == sn && data[ig].Size == size) {
                                var row = $(this).closest('tr');
                                row.find('#txtGmspcspan').val(grmpcs);
                                row.find('#txtWght').val(((rm * p) / 1000).toFixed(3));

                            }
                        });
                    }
                }
            }
            if (fillvar == 'FW') {
                $.each(ConItemList, function () {
                    if (this.Size == size) {
                        this.FinishWidthID = fid;
                        this.FinishWidth = fin;
                    }
                });
                $.each(ConItemListSave, function () {
                    if (this.CompSlNo == sno && this.Size == size) {
                        this.FinishWidthID = fid;
                        this.FinishWidth = fin;
                    }
                });
                loadAdConTable(ConItemList);
                ConsmtnHideCol(type);
                return true;
            }

            if (fillvar == 'GYW') {
                $.each(ConItemList, function () {
                    if (this.Size == size) {
                        this.GreyWidthID = gid;
                        this.GreyWidth = gry;
                    }
                });
                $.each(ConItemListSave, function () {
                    if (this.CompSlNo == sno && this.Size == size) {
                        this.GreyWidthID = gid;
                        this.GreyWidth = gry;
                    }
                });
                loadAdConTable(ConItemList);
                ConsmtnHideCol(type);
                return true;
            }
        }
        else if (protype == 'C') {
            if (fillvar == 'GRMPCSPAN') {

                $.each(ConItemList, function () {
                    if (this.CompSlNo == sno && this.Color == color) {
                        this.GmsPieces = grmpcs;
                        this.Weight = parseFloat((grmpcs * totpcs) / 1000).toFixed(3);
                    }
                });
                $.each(ConItemListSave, function () {
                    if (this.CompSlNo == sno && this.Color == color) {
                        this.GmsPieces = grmpcs;
                        this.Weight = parseFloat((grmpcs * totpcs) / 1000).toFixed(3);

                    }
                });

                for (var s = 0; s < ConItemList.length; s++) {
                    if (ConItemList[s].CompSlNo == sno && ConItemList[s].Color == color) {
                        var sn = ConItemList[s].CPlanSlNo;
                        p = ConItemList[s].TotPieces;
                        rm = ConItemList[s].GmsPieces;
                        ConItemList[s].Weight = parseFloat((rm * p) / 1000).toFixed(3);
                        //}

                        $('input[id=txtGmspcspan]').each(function (ig) {
                            if (data[ig].CPlanSlNo == sn && data[ig].Color == color) {
                                var row = $(this).closest('tr');
                                row.find('#txtGmspcspan').val(grmpcs);
                                row.find('#txtWght').val(((rm * p) / 1000).toFixed(3));

                            }
                        });
                    }
                }
            }
            if (fillvar == 'FW') {
                $.each(ConItemList, function () {
                    if (this.Color == color) {
                        this.FinishWidthID = fid;
                        this.FinishWidth = fin;
                    }
                });
                $.each(ConItemListSave, function () {
                    if (this.CompSlNo == sno && this.Color == color) {
                        this.FinishWidthID = fid;
                        this.FinishWidth = fin;
                    }
                });
                loadAdConTable(ConItemList);

                ConsmtnHideCol(type);
                return true;
            }

            if (fillvar == 'GYW') {
                $.each(ConItemList, function () {
                    if (this.Color == color) {
                        this.GreyWidthID = gid;
                        this.GreyWidth = gry;
                    }
                });
                $.each(ConItemListSave, function () {
                    if (this.CompSlNo == sno && this.Color == color) {
                        this.GreyWidthID = gid;
                        this.GreyWidth = gry;
                    }
                });
                loadAdConTable(ConItemList);

                ConsmtnHideCol(type);
                return true;
            }
        }
        ConsmtnHideCol(type);
        return true;
    }
    totconwght();
    ConsmtnHideCol(type);
}

function CompEdit(ItemID, PlanID) {
    debugger;
    ItemId = ItemID;
    LoadYarnDDL("#ddlYarn");
    LoadYSizeDDL("#ddlCount");
    LoadColorDDL("#ddlColor");
    LoadProcessDDL("#ddlProcess,#ddlFabProcess");

    loadcolor();
    loadprintlistcolor();

    LoadPlanFabriComp(PlanID);

    PlanId = PlanID;
    EditDetCompPlanList(ItemID, StyleRowID, PlanID);
    LoadPlanItemDetails(ItemID, StyleRowID);

    $('#tCPIbody').show();

    var ord = $('#ddlOrderNo option:selected').text();

    var Styleid = $('#ddlStyleNo').val();
    Entrystatus(PlanOrderNo, Styleid, ItemID);
    loaddetails(StyleRowID);
}
function LoadPlanFabriComp(PlId) {



    $.ajax({
        url: "/PlanningFabric/ListPlanningFabricComp",
        data: JSON.stringify({ PlanID: PlId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            LoadCompFabric(result);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });


}


function LoadCompFabric(result) {

    var inputcount = 0;
    $('#tCFbody tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tCFbody').DataTable().destroy();
    }
    $('#tCFbody').empty();

    var gridData = [];
    debugger;
    this.PlanFabric = result.data.Data;

    var PlanFabric = eval("[" + result.data.tableValue + "]");

    $('#tCFbody').DataTable({
        //"order": [[5, "asc"]],
        data: PlanFabric,



        //scrollY: 300,
        //scrollCollapse: true,
        //paging: false,
        //fixedColumns: false,
        //select: false,
        //scrollX: "100%",
        //scrollXInner: "100%",
        //scroller: false,
        //bSort: false,
        columns: [
                         { title: "Comp_Plan_MasID", "visible": false },
                         { title: "ComponentID", "visible": false },
                         { title: "Component Name" },
                         { title: "Fabric Type" },
                         { title: "kgs" },
                         { title: "Pan Parts", "visible": false },
                         { title: "Comp SlNo", "visible": false },
                           //{
                           //    title: "Loss", "mDataProp": null,
                           //    "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Loss" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnLossView btn btn-round btn-danger"> <i class="fa fa-arrow-down"></i> </button>'
                           //    //"sDefaultContent": '<button type="button" class="btnCDetView"> Submit </button> <button type="button" class="btnLossView"> Loss </button>'
                           //},


        ]

    });
    //$("#tCFbody tr").click(function () {
    //    var selected = $(this).hasClass("selected");
    //    $("#tCFbody tr").removeClass("selected");
    //    if (!selected)
    //        $(this).addClass("selected");
    //});



    $("#tCFbody tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tCFbody tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}

function loadcolor() {
    debugger;
    $.ajax({
        //url: "/PlanningFabric/ColorList",
        //data: JSON.stringify({}),
        //type: "GET",
        //contentType: "application/json;charset=utf-8",
        //dataType: "json",
        url: "/PlanningFabric/ColorList",
        data: JSON.stringify({}),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {


            BaseColorlist = json;
            FinishColorlist = json;
            for (var t = 0; t < BaseColorlist.length; t++) {
                if (BaseColorlist[t].Color == "GREY") {
                    bcid = BaseColorlist[t].ColorID;
                    bc = BaseColorlist[t].Color;
                }
            }


        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function loadprintlistcolor() {
    debugger;
    $.ajax({
        url: "/PlanningFabric/PrintColorList",
        data: JSON.stringify({}),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            PrintColorlist = result;

            //if (Mod == 1) {



            //    CmNo = 1;
            //    CompNo = 1;

            //}


            //if (Mod == 2) {


            //    $('#btnUpdate').hide();
            //    $('#btnAdd').hide();
            //    $('#btnDelete').show();

            //    CmNo = 1;
            //    CompNo = 1;

            //}
            //if (OrdApp == "Y") {
            //    $('#btnAdd').hide();
            //    $('#btnUpdate').hide();
            //    $('#btnDelete').hide();

            //}

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });



}

$(document).ready(function () {

    $('#tCFbody').on('click', 'tr', function (e) {
        debugger;
        var table = $('#tCFbody').DataTable();
        var row = $(this).closest('tr');
        var data = $('#tCFbody').dataTable().fnGetData(row);

        fcompno = data[6];


        if (fcompno == 0) {
            fcompno = 1;
        }
        else {
            fcompno = fcompno;
        }

        PlanCompFabricDet = $.grep(PlanCompFabricDetSave, function (v) {
            return (v.CompSlNo == fcompno);
        });
        $('#txtFabShow').val(PlanCompFabricDet[0]['Fabric']);
        $('#txtFinishShow').val(PlanCompFabricDet[0]['FinishWidth']);
        $('#txtGreyShow').val(PlanCompFabricDet[0]['GreyWidth']);
        //loadCompFabTable(PlanCompFabricDet);

        var table = $('#tCDbody').DataTable();
        var ecdata = table.rows().data();

        debugger;
        $('input[id=txtPurQty]').each(function (ig) {
            debugger;
            // if (ecdata[ig].snumb == (ig + 1)) {
            var row = $(this).closest('tr');

            for (var h = 0; h < PlanCompFabricDet.length; h++) {
                if (ig == h) {
                    var snumb = PlanCompFabricDet[h].snumb;
                    var FPlanId = PlanCompFabricDet[h].FPlanId;
                    var ColorID = PlanCompFabricDet[h].ColorID;
                    var Color = PlanCompFabricDet[h].Color;
                    var SizeId = PlanCompFabricDet[h].SizeId;
                    var Size = PlanCompFabricDet[h].Size;
                    var Prdn_Qty = PlanCompFabricDet[h].Prdn_Qty;
                    var ActWeight = PlanCompFabricDet[h].ActWeight;
                    var Weight = PlanCompFabricDet[h].Weight;
                    var Grammage = PlanCompFabricDet[h].Grammage;
                    var FabricID = PlanCompFabricDet[h].FabricID;

                    var GreyWidthID = PlanCompFabricDet[h].GreyWidthID;
                    var FinishWidthID = PlanCompFabricDet[h].FinishWidthID;
                    var FabricType = PlanCompFabricDet[h].FabricType;
                    var PlanID = PlanCompFabricDet[h].PlanID;
                    var CompSlNo = PlanCompFabricDet[h].CompSlNo;
                    var Bcolor = PlanCompFabricDet[h].Bcolor;
                    var BColorPQty = PlanCompFabricDet[h].BColorPQty;
                    var Fcolor = PlanCompFabricDet[h].Fcolor;
                    var FColorPQty = PlanCompFabricDet[h].FColorPQty;
                    var PColor = PlanCompFabricDet[h].PColor;
                    var FGsm = PlanCompFabricDet[h].FGsm;

                    var KGsm = PlanCompFabricDet[h].KGsm;
                    var LoopLen = PlanCompFabricDet[h].LoopLen;
                    var texture = PlanCompFabricDet[h].texture;
                    var content = PlanCompFabricDet[h].content;
                    var guage = PlanCompFabricDet[h].guage;

                    //if (comsn == CompSlNo) {


                    row.find('#txtsnumb').val(snumb);
                    row.find('#txtColor').val(Color);
                    row.find('#txtSize').val(Size);
                    row.find('#txtfabPrdQty').val(Prdn_Qty);
                    row.find('#txtfabActwt').val(ActWeight);
                    row.find('#txtfabwt').val(Weight);
                    row.find('#txtPurQty').val(BColorPQty);
                    row.find('#txtFPurQty').val(FColorPQty);
                    row.find('#txtFGsm').val(FGsm);
                    row.find('#txtKnitgsm').val(KGsm);
                    row.find('#txtlooplen').val(LoopLen);
                    row.find('#txtTexture').val(texture);
                    row.find('#txtContent').val(content);
                    row.find('#txtGauge').val(guage);
                    if (PColor == null) {
                        PColor = '--Select--';
                    }
                    // row.find('#ddlBColor option:selected').text(Bcolor);
                    $.each(BaseColorlist, function (k, v) {
                        var id = 0;
                        if (Bcolor === v.Color) {
                            id = v.ColorID
                            row.find('#ddlBColor').val(id);
                        }

                    });
                    // row.find('#ddlFColor option:selected').text(Fcolor);
                    $.each(FinishColorlist, function (k, v) {
                        var id = 0;
                        if (Fcolor === v.Color) {
                            id = v.ColorID
                            row.find('#ddlFColor').val(id);
                        }

                    });
                    // row.find('#ddlPColor option:selected').text(PColor);
                    $.each(PrintColorlist, function (k, v) {
                        var id = 0;
                        if (PColor === v.Color) {
                            id = v.ColorID
                            row.find('#ddlPColor').val(id);
                        }

                    });

                }
            }
            // }
        });



        loadfillloss();
        var colorempty = [];
        colorempty = PlanLossSave;

        colorempty = $.grep(colorempty, function (v) {
            return (v.CompSNo == fcompno);
        });

        PlanLoss = colorempty;
        loadFabricLossTable(PlanLoss);

    });
});

$(document).ready(function () {



    $('#tYFbody').on('click', 'tr', function (e) {

        debugger;
        rowindex = $(this).closest('tr').index();
        var currentrowp = PlanYarn.slice(rowindex);

        FBRID = currentrowp[0]['FabricID'];
        BCLID = currentrowp[0]['Fabric_ColorId'];
        YlNo = currentrowp[0]['YSlno'];
        var wght = currentrowp[0]['Fabric_Weight'];
        wt = currentrowp[0]['Fabric_Weight'];
        Weight = wght;
        var currentro1 = [];
        for (var g = 0; g < PlanYarnDetSave.length; g++) {
            if (PlanYarnDetSave[g].BaseColorID == BCLID && PlanYarnDetSave[g].FabricID == FBRID) {
                currentro1.push(PlanYarnDetSave[g]);
            }
        }
        if (Mod == 1 && currentro1.length == 0) {
            $("#txtPer").val('');
            $('#txtWeight').val(wght);
            $('#txtActualWeight').val(wght);
            $("#ddlYarn").prop("disabled", false);
            $("#ddlColor").prop("disabled", false);
            $("#ddlCount").prop("disabled", false);
            var yarndet = [];
            for (var x = 0; x < PlanYarnDetSave.length; x++) {
                if (PlanYarnDetSave[x].BaseColorID == BCLID && PlanYarnDetSave[x].FabricID == FBRID) {
                    yarndet.push(PlanYarnDetSave[x]);
                }
            }
            PlanYarnDet = yarndet;
            Loadsepyarn(PlanYarnDet);

            if (PlanYarnDyeingSave.length > 0) {
                var ctry = [];
                ctry = PlanYarnDyeingSave;
                if (PlanYarnDet.length > 0) {
                    ctry = $.grep(ctry, function (e) {
                        if (e.YDSlNo == PlanYarnDet[0].SlNo) {
                            return e;
                        }
                    });
                }
                else {
                    ctry = PlanYarnDet;
                }
                PlanYarnDyeing = ctry;
                loadYarnDyeAddTable(PlanYarnDyeing);
            }
            return true;
        }

        rowindex = $(this).closest('tr').index();
        var currentrowpyarn = PlanYarn.slice(rowindex);
        var YMID = currentrowpyarn[0]['YPlanmasID'];
        var PerQty = $('#txtPer').val();
        if (Bper > 0) {
            $("#txtPer").val(Bper);
            var NAweight = Bper / 100 * wght;
            $('#txtWeight').val(NAweight);
            $('#txtActualWeight').val(NAweight);

            $("#ddlYarn").prop("disabled", false);
            $("#ddlColor").prop("disabled", false);
            $("#ddlCount").prop("disabled", false);

            Bper = 0;
            yarndet = [];
            for (var x = 0; x < PlanYarnDetSave.length; x++) {

                if (PlanYarnDetSave[x].BaseColorID == BCLID && PlanYarnDetSave[x].FabricID == FBRID) {
                    yarndet.push(PlanYarnDetSave[x]);
                }
            }
            PlanYarnDet = yarndet;
            Loadsepyarn(PlanYarnDet);
            LoadsepSaveyarn(PlanYarnDetSave);

        }

        else if (Bper == 0) {

            yarndet = [];

            $('#txtWeight').val(0);
            $('#txtActualWeight').val(0);
            $("#ddlYarn").prop("disabled", true);
            $("#ddlColor").prop("disabled", true);
            $("#ddlCount").prop("disabled", true);
            for (var x = 0; x < PlanYarnDetSave.length; x++) {


                if (PlanYarnDetSave[x].BaseColorID == BCLID && PlanYarnDetSave[x].FabricID == FBRID) {
                    yarndet.push(PlanYarnDetSave[x]);
                }
            }
            PlanYarnDet = yarndet;
            Loadsepyarn(PlanYarnDet);
            LoadsepSaveyarn(PlanYarnDetSave);
        } else {
            $('#txtWeight').val(wght);
            $('#txtActualWeight').val(wght);
        }

        if (PlanYarnDyeingSave.length > 0) {


            var ctry = [];
            ctry = PlanYarnDyeingSave;

            ctry = $.grep(ctry, function (e) {
                if (e.YDSlNo == PlanYarnDet[0].SlNo && PlanYarnDet[0].Dyeing_Req == 1) {
                    return e;
                }
            });
            PlanYarnDyeing = ctry;

            loadYarnDyeAddTable(PlanYarnDyeing);
        }


    });
});


function loadYarnDyeAddTable(list) {

    //$('#tFYDbody').DataTable().destroy();
    var inputcount = 0;
    $('#tFYDbody tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tFYDbody').DataTable().destroy();
    }
    $('#tFYDbody').empty();
    $('#tFYDbody').DataTable({
        data: list,
        columns: [

            { title: "YPlanDetID", data: "YPlanDetID", "visible": false },
            { title: "Sl No", data: "SlNo", "visible": false },
            { title: "CompSlNo", data: "CompSlNo", "visible": false },
            { title: "Garment_ColorID", data: "Garment_ColorID", "visible": false },
            { title: "Garment Color", data: "GColor" },
            { title: "Weight(Kgs)", data: "ActWeight" },
            { title: "Yarn_DyeColorID", data: "CColorID", "visible": false },
            { title: "Dyeing Color", data: "CColor" },

          {
              title: "%", data: "Qty_Per",
              render: function (data) {

                  return '<input type="text" id="txtQty_Per" class="form-control txtQty_Per"  style="width: 50px;text-align: center;" value=' + data + '>';

              },
          },
          { title: "Weight(Kgs)", data: "Weight" },
          {
              title: "Purchase(Kgs)", data: "Purchase_Qty",
              render: function (data) {

                  return '<input type="text" id="txtPurchase_Qty" class="form-control txtPurchase_Qty"  style="width: 50px;text-align: center;" value=' + data + ' >';

              },
          },

           {
               title: "Courses", data: "Courses",
               render: function (data) {

                   return '<input type="text" id="txtCourses" class="form-control"  style="width: 50px;text-align: center;" value=' + data + ' >';

               },
           },
            { title: "YDSlNo", data: "YDSlNo", "visible": false },
            { title: "YPlanDyeID", data: "YPlanDyeID", "visible": false },



        ]
    });

}


$(document).ready(function () {

    $('#tblyarnDetails').on('click', 'tr', function (e) {

        debugger;
        rowindex = $(this).closest('tr').index();
        var currentrowp = PlanYarnDet.slice(rowindex);

        var FID = currentrowp[0]['FabricID'];
        var BCID = currentrowp[0]['BaseColorID'];
        var Qty = currentrowp[0]['Knit_In_Qty'];
        var Percnt = currentrowp[0]['Knit_In_Per'];
        var YlNo = currentrowp[0]['YSlNo'];
        var SlNo = currentrowp[0]['SlNo'];
        //var CompSlNo = currentrowp[0]['CompSno'];
        var dye = currentrowp[0]['Dyeing_Req'];

        var itemid = currentrowp[0]['Knit_In_ItemId'];
        var sizeid = currentrowp[0]['Knit_In_SizeID'];
        var colorid = currentrowp[0]['Knit_in_ColorID'];

        LoadstockDetails(itemid, sizeid, colorid);
        //

        if (dye == 1) {
            var test = [];
            if (PlanYarnDyeingSave.length > 0) {

                for (var f = 0; f < PlanYarnDyeingSave.length; f++) {
                    if (PlanYarnDyeingSave[f].YDSlNo == SlNo) {
                        test.push(PlanYarnDyeingSave[f]);
                    }
                }
            }
            var totgc = [];
            var totgc2 = [];
            if (YarnDyeing.length > 0) {
                var garidlist = [];
                var garclid = 0;
                for (var e = 0; e < YarnDyeing.length; e++) {
                    var gid = YarnDyeing[e].Garment_ColorID;
                    var totalqty = 0;

                    for (var q = 0; q < PlanCompFabricDetSave.length; q++) {
                        if (PlanCompFabricDetSave[q].ColorID == gid && PlanCompFabricDetSave[q].BColorID == BCID && PlanCompFabricDetSave[q].FabricID == FID) {
                            garidlist.push(PlanCompFabricDetSave[q].ColorID);
                            var qty = PlanCompFabricDetSave[q].Weight;
                            totalqty = totalqty + parseFloat(qty);
                        }
                    }
                    var bcqty = 0;
                    for (var w = 0; w < PlanCompFabricDetSave.length; w++) {
                        if (PlanCompFabricDetSave[w].ColorID == gid && PlanCompFabricDetSave[w].BColorID == BCID && PlanCompFabricDetSave[w].FabricID == FID) {
                            var qty = PlanCompFabricDetSave[w].BColorPQty;
                            bcqty = bcqty + parseFloat(qty);
                        }
                    }
                    var finqty = 0;
                    for (var p = 0; p < PlanCompFabricDetSave.length; p++) {
                        if (PlanCompFabricDetSave[p].ColorID == gid && PlanCompFabricDetSave[p].BColorID == BCID && PlanCompFabricDetSave[p].FabricID == FID) {

                            var qty = PlanCompFabricDetSave[p].FColorPQty;
                            finqty = finqty + parseFloat(qty);
                        }
                    }

                    var totclrqty = parseFloat(bcqty) + parseFloat(finqty);

                    var tot = parseFloat(totalqty - totclrqty);

                    totgc.push(tot);
                    if (garclid != gid) {
                        totgc2.push(tot);
                    }
                    else {
                        tot = 0;
                        totgc2.push(tot);
                    }
                    garclid = gid;
                }

                if (totgc.length > 0) {
                    for (var p = 0; p < totgc.length; p++) {
                        var g = totgc[p];
                        totgc[p] = parseFloat((Percnt * g) / 100).toFixed(3);
                    }
                }
                if (totgc2.length > 0) {
                    for (var p = 0; p < totgc2.length; p++) {
                        var g = totgc2[p];
                        totgc2[p] = parseFloat((Percnt * g) / 100).toFixed(3);
                    }
                }
            }
            $.unique(garidlist);
            if (test.length == 0) {
                for (var l = 0; l < YarnDyeing.length; l++) {
                    var gcl = YarnDyeing[l].Garment_ColorID;
                    for (var r = 0; r < garidlist.length; r++) {
                        if (garidlist[r] == gcl) {
                            var lengp = 0;
                            if (PlanYarnDyeingSave.length == 0) {
                                lengp = 1;
                            }
                            else {
                                lengp = PlanYarnDyeingSave.length + 1;
                            }
                            var obj = {
                                CColor: YarnDyeing[l].CColor,
                                CColorID: YarnDyeing[l].CColorID,
                                GColor: YarnDyeing[l].GColor,
                                Garment_ColorID: YarnDyeing[l].Garment_ColorID,
                                SlNo: lengp,
                                CompSlNo: CompSlNo,// currentro1[0]['CompSno'],
                                YDSlNo: SlNo,// currentro1[0]['SlNo'],
                                ActWeight: totgc[l],
                                Weight: 0,
                                FabId: FID,//currentro1[0]['FabricID'],
                                GWeight: totgc[l],
                                Yarn_DyeColorID: YarnDyeing[l].CColorID,
                                Qty_Per: 0,
                                Purchase_Qty: 0,
                                Loss: 0,
                                ColorSeq: 0,
                                PerWeight: 0,
                                YPlanDetID: 0,
                                YPlanDyeID: 0,
                                Courses: 0

                            }
                            PlanYarnDyeingSave.push(obj);
                        }
                    }
                }
                loadYarnDyeAddTableSave(PlanYarnDyeingSave);
            }
            else {
                if (totgc.length == test.length) {
                    if (totgc.length > 0) {
                        for (var m = 0; test.length > m; m++) {
                            for (var p = 0; p < totgc.length; p++) {
                                if (m == p) {
                                    var g = totgc[p];
                                    //  totgc[p] = parseFloat((test[m].Qty_Per * g) / 100).toFixed(3);
                                    test[m].Weight = parseFloat((test[m].Qty_Per * g) / 100).toFixed(3);
                                    test[m].ActWeight = totgc[p];
                                    test[m].GWeight = totgc[p];
                                }
                            }
                        }
                    }
                    var e = 0;
                    for (var f = 0; f < PlanYarnDyeingSave.length; f++) {
                        if (PlanYarnDyeingSave[f].YDSlNo == SlNo) {
                            PlanYarnDyeingSave[f].Weight = test[e].Weight;
                            PlanYarnDyeingSave[f].ActWeight = test[e].ActWeight;
                            PlanYarnDyeingSave[f].GWeight = test[e].GWeight
                            e = e + 1;
                        }
                    }
                }
            }

            var ctry = [];
            ctry = PlanYarnDyeingSave;

            ctry = $.grep(ctry, function (e) {
                if (e.YDSlNo == SlNo) {
                    return e;
                }
            });
            PlanYarnDyeing = ctry;
            loadYarnDyeAddTable(PlanYarnDyeing);
        }
        else {
            var ctry = [];
            PlanYarnDyeing = ctry;
            loadYarnDyeAddTable(PlanYarnDyeing);

        }
    });

    //fabric loss

    $('#btnLossViewAdd').click(function () {


        var procid = $('#ddlFabProcess').val();
        for (var g = 0; g < PlanLossSave.length; g++) {
            if (PlanLossSave[g].CompSNo == fcompno && PlanLossSave[g].ProcessId == procid) {
                //alert('Must be a different process..');
                var msg = 'Must be a different process...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                fnClearCompLossControls();
                return true;
            }
        }

        var lengp = 0;
        var isAllValid = true;



        if ($('#ddlFabProcess').val() == "0") {
            isAllValid = false;
            $('#ddlFabProcess').siblings(".select2-container").css('border', '1px solid red');
        }
        else {
            $('#ddlFabProcess').siblings(".select2-container").css('border', 'lightgrey');
        }


        if ($('#txtFabLoss').val() == "") {
            isAllValid = false;
            $('#txtFabLoss').css('border-color', 'Red');
        }
        else {
            $('#txtFabLoss').css('border-color', 'lightgrey');
        }

        if (PlanLossSave.length == 0) {
            lengp = 1;
        }
        else {
            lengp = PlanLossSave.length + 1;
        }

        if (fcompno == 0) {
            fcompno == 1;
        } else {
            fcompno == fcompno;
        }

        if (isAllValid) {



            var compLossObj = {
                ProcessName: $("#ddlFabProcess option:selected").text(),
                ProcessId: $('#ddlFabProcess').val(),
                SlNo: lengp,
                Loss_Per: $('#txtFabLoss').val(),
                CompSNo: fcompno,
                FLPlanID: 0,
                FPlanId: 0,
                Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
            };

            PlanLossSave.push(compLossObj);

            loadFabricLossSaveTable(PlanLossSave);

            fnClearCompLossControls();

            var colorempty = [];
            colorempty = PlanLossSave;

            colorempty = $.grep(colorempty, function (v) {
                return (v.CompSNo == fcompno);
            });

            PlanLoss = colorempty;
            loadFabricLossTable(PlanLoss);

            //loadfillloss();
            var totalamnt = 0;
            for (var e = 0; e < PlanLossSave.length; e++) {
                if (PlanLossSave[e].CompSNo == fcompno) {
                    var amount = PlanLossSave[e].Loss_Per;
                    totalamnt = totalamnt + parseFloat(amount);
                }
            }
            $('#txttotfabloss').val(totalamnt);
            loadfillloss();
        }

    });
    function fnClearCompLossControls() {

        $('#ddlFabProcess').val('0').trigger('change');
        $('#txtFabLoss').val('');

    }

    $(document).on('click', '.btncompLossedit', function () {

        Mode = 1;

        rowindex = $(this).closest('tr').index();

        var cur1 = PlanLoss.slice(rowindex);

        $('#ddlFabProcess').val(cur1[0]['ProcessId']).trigger('change');
        $('#txtFabLoss').val(cur1[0]['Loss_Per']);


        $('#btnLossViewAdd').hide();
        $('#btnLossViewUpdate').show();
    });

    $('#btnLossViewUpdate').click(function () {

        var currentrowsel = PlanLoss.slice(rowindex);

        currentrowsel[0]['ProcessId'] = $("#ddlFabProcess").val();
        currentrowsel[0]['ProcessName'] = $("#ddlFabProcess option:selected").text();
        currentrowsel[0]['Loss_Per'] = $("#txtFabLoss").val();

        var sno = currentrowsel[0]['SlNo'];
        var compsn = currentrowsel[0]['CompSNo']
        PlanLoss[rowindex] = currentrowsel[0];

        loadFabricLossTable(PlanLoss);

        $('#btnLossViewUpdate').hide();
        $('#btnLossViewAdd').show();
        fnClearCompLossControls();
        for (var f = 0; f < PlanLossSave.length; f++) {
            if (PlanLossSave[f].CompSNo == compsn && PlanLossSave[f].SlNo == sno) {
                PlanLossSave[f] = currentrowsel[0];
            }
        }

        loadFabricLossSaveTable(PlanLossSave);
        var totalamnt = 0;
        for (var e = 0; e < PlanLossSave.length; e++) {
            if (PlanLossSave[e].CompSNo == CompSlNo) {
                var amount = PlanLossSave[e].Loss_Per;
                totalamnt = totalamnt + parseFloat(amount);
            }
        }
        $('#txttotfabloss').val(totalamnt);
        loadfillloss();
    });

    $(document).on('click', '.btncompLossremove', function () {
        rowindex = $(this).closest('tr').index();
        var currentrowsel = PlanLoss.slice(rowindex);
        var sno = currentrowsel[0]['SlNo'];
        var compsn = currentrowsel[0]['CompSNo']
        PlanLoss.splice(rowindex, 1);
        for (var f = 0; f < PlanLossSave.length; f++) {
            if (PlanLossSave[f].CompSNo == compsn && PlanLossSave[f].SlNo == sno) {
                PlanLossSave.splice(f, 1);
            }
        }
        document.getElementById("tblcompfabricloss").deleteRow(rowindex + 1);
        loadFabricLossSaveTable(PlanLossSave);
        var totalamnt = 0;
        for (var e = 0; e < PlanLossSave.length; e++) {
            if (PlanLossSave[e].CompSNo == CompSlNo) {
                var amount = PlanLossSave[e].Loss_Per;
                totalamnt = totalamnt + parseFloat(amount);
            }
        }
        $('#txttotfabloss').val(totalamnt);
        loadfillloss();
    });

    $(document).on('keyup', '.loadpqty', function (e) {
        debugger;

        var table = $('#tCDbody').DataTable();
        var s = table.row($(this).parents('tr')).data()["CompSlNo"];
        var sno = table.row($(this).parents('tr')).data()["snumb"];
        var bc = table.row($(this).parents('tr')).data()["BColorID"];
        var finclrqty = table.row($(this).parents('tr')).data()["FColorPQty"];
        var wt = table.row($(this).parents('tr')).data()["Weight"];
        var fq = table.row($(this).parents('tr')).data()["FColorPQty"];
        var fd = table.row($(this).parents('tr')).data()["FabricID"];
        var gm = table.row($(this).parents('tr')).data()["Grammage"];

        var val = $(this).val();

        Fabindex;
        indexforfabfill = Fabindex;
        fabfillvar = 'BCQT';

        var tot = parseFloat(fq) + parseFloat(val);

        if (tot > wt) {
            //alert('Sum of PurQty should not exceed actual weight');
            var msg = 'Sum of Purchase Quantity should not exceed actual weight...';
            var flg = 4;
            var mode = 1;
            AlartMessage(msg, flg, mode);
            $.each(PlanCompFabricDet, function () {
                if (this.CompSlNo == s && this.snumb == sno) {
                    this.BColorPQty = 0;

                }
            });

            var fabtable = $('#tCDbody').DataTable();
            var fabdata = fabtable.rows().data();

            $('input[id=txtPurQty]').each(function (ig) {
                if (fabdata[ig].snumb == sno && fabdata[ig].CompSlNo == s) {
                    var row = $(this).closest('tr');
                    row.find('#txtPurQty').val(0);

                }
            });
            return true;
        }

        $.each(PlanCompFabricDet, function () {
            if (this.CompSlNo == s && this.snumb == sno) {
                this.BColorPQty = val;

            }
        });
        $.each(PlanCompFabricDetSave, function () {
            if (this.CompSlNo == s && this.snumb == sno) {
                this.BColorPQty = val;

            }
        });

        var result = [];
        $.each(PlanCompFabricDet, function (i, e) {
            var matchingItems = $.grep(result, function (item) {
                return item.BColorID === e.BColorID;
            });
            if (matchingItems.length === 0) {
                result.push(e);
            }
        });


        var rows = $("#tCDbody").dataTable().fnGetNodes();
        var dtTable = $('#tCDbody').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
            $('input[id=txtPurQty]').each(function () {
                if (sn == sno && $(this).val() == val) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtPurQty').val();
                    row.find('#txtPurQty').focus().val('').val(num);
                    return true;
                }
            });
        }
    });

    $(document).on('keyup', '.loadfcpqty', function (e) {
        debugger;

        var table = $('#tCDbody').DataTable();
        var s = table.row($(this).parents('tr')).data()["CompSlNo"];
        var sno = table.row($(this).parents('tr')).data()["snumb"];
        var wt = table.row($(this).parents('tr')).data()["Weight"];
        var bq = table.row($(this).parents('tr')).data()["BColorPQty"];
        var bclrqty = table.row($(this).parents('tr')).data()["BColorPQty"];
        var fd = table.row($(this).parents('tr')).data()["FabricID"];
        var bc = table.row($(this).parents('tr')).data()["BColorID"];

        var val = $(this).val();

        Fabindex;
        indexforfabfill = Fabindex;
        fabfillvar = 'FIQT';

        var tot = parseFloat(bq) + parseFloat(val);
        if (tot > wt) {
            //alert('Sum of PurQty should not exceed actual weight');
            var msg = 'Sum of Purchase Quantity should not exceed actual weight...';
            var flg = 4;
            var mode = 1;
            AlartMessage(msg, flg, mode);
            $.each(PlanCompFabricDet, function () {
                if (this.CompSlNo == s && this.snumb == sno) {
                    this.FColorPQty = 0;

                }
            });

            var fabtable = $('#tCDbody').DataTable();
            var fabdata = fabtable.rows().data();

            $('input[id=txtPurQty]').each(function (ig) {
                if (fabdata[ig].snumb == sno && fabdata[ig].CompSlNo == s) {
                    var row = $(this).closest('tr');
                    row.find('#txtFPurQty').val(0);

                }
            });
            return true;
        }

        $.each(PlanCompFabricDet, function () {
            if (this.CompSlNo == s && this.snumb == sno) {
                this.FColorPQty = val;

            }
        });

        $.each(PlanCompFabricDetSave, function () {
            if (this.CompSlNo == s && this.snumb == sno) {
                this.FColorPQty = val;

            }
        });

        var result = [];
        $.each(PlanCompFabricDet, function (i, e) {
            var matchingItems = $.grep(result, function (item) {
                return item.BColorID === e.BColorID;
            });
            if (matchingItems.length === 0) {
                result.push(e);
            }
        });

        var ty = PlanCompFabricDet[0].type;
        var rows = $("#tCDbody").dataTable().fnGetNodes();
        var dtTable = $('#tCDbody').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
            $('input[id=txtFPurQty]').each(function () {
                if (sn == sno && $(this).val() == val) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtFPurQty').val();
                    row.find('#txtFPurQty').focus().val('').val(num);
                    return true;
                }
            });
        }
    });

    $(document).on('change', '.ddlPColor', function () {

        rowindex = $(this).closest('tr').index();
        var oldind = -1;
        var val = $(this).val();
        var currentrow = PlanCompFabricDet.slice(rowindex);
        var s = currentrow[0].CompSlNo;
        var sno = currentrow[0].snumb;
        var cname = "";
        indexforfabfill = rowindex;
        fabfillvar = 'PRC';
        for (var d = 0; d < PrintColorlist.length; d++) {
            if (PrintColorlist[d].ColorID == val) {
                oldind = d;
                cname = PrintColorlist[d].Color;
            }
        }
        $.each(PlanCompFabricDet, function () {
            if (this.CompSlNo == s && this.snumb == sno) {
                this.PColorID = val;
                this.PColor = cname;

            }
        });

        $.each(PlanCompFabricDetSave, function () {
            if (this.CompSlNo == s && this.snumb == sno) {
                this.PColorID = val;
                this.PColor = cname;
            }
        });
        //array_move(PrintColorlist, oldind, 0)
        loadCompFabSaveTable(PlanCompFabricDetSave);

        //loadFabAddTable(PlanFabricDet);
    });

    $(document).on('keyup', '.loadfgsm', function (e) {
        debugger;
        rowindex = $(this).closest('tr').index();
        var val = $(this).val();
        Fabindex = rowindex;
        indexforfabfill = Fabindex;
        fabfillvar = 'FGSM';

        var currentrow = PlanCompFabricDet.slice(rowindex);
        var s = currentrow[0].CompSlNo;
        var sno = currentrow[0].snumb;

        $.each(PlanCompFabricDet, function () {
            if (this.CompSlNo == s && this.snumb == sno) {
                this.FGsm = val;

            }
        });

        $.each(PlanCompFabricDetSave, function () {
            if (this.CompSlNo == s && this.snumb == sno) {
                this.FGsm = val;

            }
        });
        //loadCompFabSaveTable(PlanCompFabricDetSave);

        var rows = $("#tCDbody").dataTable().fnGetNodes();
        var dtTable = $('#tCDbody').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
            $('input[id=txtFGsm]').each(function () {
                if (sn == sno && $(this).val() == val) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtFGsm').val();
                    row.find('#txtFGsm').focus().val('').val(num);
                    return true;
                }
            });
        }
    });

    $(document).on('keyup', '.calcknitgsm', function (e) {

        rowindex = $(this).closest('tr').index();
        var val = $(this).val();
        Fabindex = rowindex;
        indexforfabfill = Fabindex;
        fabfillvar = 'KGSM';

        var currentrow = PlanCompFabricDet.slice(rowindex);
        var s = currentrow[0].CompSlNo;
        var sno = currentrow[0].snumb;

        $.each(PlanCompFabricDet, function () {
            if (this.CompSlNo == s && this.snumb == sno) {
                this.KGsm = val;

            }
        });

        $.each(PlanCompFabricDetSave, function () {
            if (this.CompSlNo == s && this.snumb == sno) {
                this.KGsm = val;

            }
        });
        //loadCompFabSaveTable(PlanCompFabricDetSave);

        var rows = $("#tCDbody").dataTable().fnGetNodes();
        var dtTable = $('#tCDbody').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
            $('input[id=txtKnitgsm]').each(function () {
                if (sn == sno && $(this).val() == val) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtKnitgsm').val();
                    row.find('#txtKnitgsm').focus().val('').val(num);
                    return true;
                }
            });
        }
    });
    $(document).on('keyup', '.calclooplen', function (e) {

        rowindex = $(this).closest('tr').index();
        var val = $(this).val();
        Fabindex = rowindex;
        indexforfabfill = Fabindex;
        fabfillvar = 'LOOPLEN';

        var currentrow = PlanCompFabricDet.slice(rowindex);
        var s = currentrow[0].CompSlNo;
        var sno = currentrow[0].snumb;



        $.each(PlanCompFabricDet, function () {
            if (this.CompSlNo == s && this.snumb == sno) {
                this.LoopLen = val;

            }
        });

        $.each(PlanCompFabricDetSave, function () {
            if (this.CompSlNo == s && this.snumb == sno) {
                this.LoopLen = val;

            }
        });
        loadCompFabSaveTable(PlanCompFabricDetSave);

        var rows = $("#tCDbody").dataTable().fnGetNodes();
        var dtTable = $('#tCDbody').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
            $('input[id=txtlooplen]').each(function () {
                if (sn == sno && $(this).val() == val) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtlooplen').val();
                    row.find('#txtlooplen').focus().val('').val(num);
                    return true;
                }
            });
        }
    });

    $(document).on('keyup', '.calcTexture', function (e) {


        rowindex = $(this).closest('tr').index();
        var val = $(this).val();
        Fabindex = rowindex;
        indexforfabfill = Fabindex;
        fabfillvar = 'TEXT';

        var currentrow = PlanCompFabricDet.slice(rowindex);
        var s = currentrow[0].CompSlNo;
        var sno = currentrow[0].snumb;


        $.each(PlanCompFabricDet, function () {
            if (this.CompSlNo == s && this.snumb == sno) {
                this.texture = val;

            }
        });

        $.each(PlanCompFabricDetSave, function () {
            if (this.CompSlNo == s && this.snumb == sno) {
                this.texture = val;

            }
        });
        loadCompFabSaveTable(PlanCompFabricDetSave);

        var rows = $("#tCDbody").dataTable().fnGetNodes();
        var dtTable = $('#tCDbody').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
            $('input[id=txtTexture]').each(function () {
                if (sn == sno && $(this).val() == val) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtTexture').val();
                    row.find('#txtTexture').focus().val('').val(num);
                    return true;
                }
            });
        }
    });

    $(document).on('keyup', '.CalcContent', function (e) {

        rowindex = $(this).closest('tr').index();
        var val = $(this).val();
        Fabindex = rowindex;
        indexforfabfill = Fabindex;
        fabfillvar = 'CONT';

        var currentrow = PlanCompFabricDet.slice(rowindex);
        var s = currentrow[0].CompSlNo;
        var sno = currentrow[0].snumb;



        $.each(PlanCompFabricDet, function () {
            if (this.CompSlNo == s && this.snumb == sno) {
                this.content = val;

            }
        });

        $.each(PlanCompFabricDetSave, function () {
            if (this.CompSlNo == s && this.snumb == sno) {
                this.content = val;

            }
        });
        loadCompFabSaveTable(PlanCompFabricDetSave);

        var rows = $("#tCDbody").dataTable().fnGetNodes();
        var dtTable = $('#tCDbody').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
            $('input[id=txtContent]').each(function () {
                if (sn == sno && $(this).val() == val) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtContent').val();
                    row.find('#txtContent').focus().val('').val(num);
                    return true;
                }
            });
        }
    });

    $(document).on('keyup', '.CalcGauge', function (e) {

        rowindex = $(this).closest('tr').index();
        var val = $(this).val();
        Fabindex = rowindex;
        indexforfabfill = Fabindex;
        fabfillvar = 'GUAGE';

        var currentrow = PlanCompFabricDet.slice(rowindex);
        var s = currentrow[0].CompSlNo;
        var sno = currentrow[0].snumb;



        $.each(PlanCompFabricDet, function () {
            if (this.CompSlNo == s && this.snumb == sno) {
                this.guage = val;

            }
        });

        $.each(PlanCompFabricDetSave, function () {
            if (this.CompSlNo == s && this.snumb == sno) {
                this.guage = val;

            }
        });
        loadCompFabSaveTable(PlanCompFabricDetSave);

        var rows = $("#tCDbody").dataTable().fnGetNodes();
        var dtTable = $('#tCDbody').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
            $('input[id=txtGauge]').each(function () {
                if (sn == sno && $(this).val() == val) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtGauge').val();
                    row.find('#txtGauge').focus().val('').val(num);
                    return true;
                }

            });
        }
    });

    $(document).on('change', '.ddlFColor', function () {

        rowindex = $(this).closest('tr').index();
        var currentrow = PlanCompFabricDet.slice(rowindex);
        var s = currentrow[0].CompSlNo;
        var sno = currentrow[0].snumb;
        var cname = "";
        var oldind = -1;
        var val = $(this).val();
        indexforfabfill = rowindex;
        fabfillvar = 'FIC';
        for (var d = 0; d < FinishColorlist.length; d++) {
            if (FinishColorlist[d].ColorID == val) {
                cname = FinishColorlist[d].Color;
                oldind = d;
            }
        }

        $.each(PlanCompFabricDet, function () {
            if (this.CompSlNo == s && this.snumb == sno) {
                this.FColorID = val;
                this.Fcolor = cname;
            }
        });

        $.each(PlanCompFabricDetSave, function () {
            if (this.CompSlNo == s && this.snumb == sno) {
                this.FColorID = val;
                this.Fcolor = cname;
            }
        });
        loadCompFabSaveTable(PlanCompFabricDetSave);

    });

    $(document).on('change', '.ddlBColor', function () {
        debugger;
        rowindex = $(this).closest('tr').index();
        var oldind = -1;
        indexforfabfill = rowindex;
        fabfillvar = 'BC';
        var currentrow = PlanCompFabricDet.slice(rowindex);
        var s = currentrow[0].CompSlNo;
        var sno = currentrow[0].snumb;
        var fd = currentrow[0].FabricID;
        var ty = currentrow[0].type;
        var bcl = '';
        var val = $(this).val();
        var bclrqty = currentrow[0].BColorPQty;
        var finclrqty = currentrow[0].FColorPQty;

        for (var d = 0; d < BaseColorlist.length; d++) {
            if (BaseColorlist[d].ColorID == val) {
                bcl = BaseColorlist[d].Color;
                oldind = d;
            }
        }
        $.each(PlanCompFabricDet, function () {
            if (this.CompSlNo == s && this.snumb == sno) {
                this.BColorID = val;
                this.Bcolor = bcl;
            }
        });

        $.each(PlanCompFabricDetSave, function () {
            if (this.CompSlNo == s && this.snumb == sno) {
                this.BColorID = val;
                this.Bcolor = bcl;
            }
        });
        loadCompFabSaveTable(PlanCompFabricDetSave);
        fillfabrictbl(PlanCompFabricDet);
        var result = [];
        $.each(PlanCompFabricDet, function (i, e) {
            var matchingItems = $.grep(result, function (item) {
                return item.Bcolor === e.Bcolor;
            });
            if (matchingItems.length === 0) {
                result.push(e);
            }
        });
    });

    $('#btnYarnViewAdd').click(function () {
        debugger;

        $("#YarnDetId").show();

        var d = $("#ddlYarn option:selected").text();
        var S = $("#ddlCount option:selected").text();
        var c = $("#ddlColor option:selected").text();
        if (PlanYarnDet.length > 0) {
            for (var q = 0; q < PlanYarnDet.length; q++) {
                if (PlanYarnDet[q].BaseColorID == BCLID && PlanYarnDet[q].FabricID == FBRID) {
                    if (PlanYarnDet[q].Yarn == d && PlanYarnDet[q].Size == S && PlanYarnDet[q].Color == c) {
                        //alert('Must be different yarn...');
                        var msg = 'Must be different yarn...';
                        var flg = 4;
                        var mode = 1;
                        AlartMessage(msg, flg, mode);
                        return true;
                    }
                }
            }
        }

        var totalper = 0;
        for (var s = 0; s < PlanYarnDet.length; s++) {
            if (PlanYarnDet[s].YBaseColorID == BCLID && PlanYarnDet[s].FabricID == FBRID) {
                var per = PlanYarnDet[s].Knit_In_Per;
                totalper = totalper + parseFloat(per);
            }
        }
        Bper = 100 - totalper;
        if (Bper == 0) {
            //alert("Already Weight has been Exists");
            var msg = 'Already Weight has been Exists...';
            var flg = 4;
            var mode = 1;
            AlartMessage(msg, flg, mode);
            fnClearYarnDetailsControls();
            return true;

        }
        if (Mod == 0) {
            ///////hide the loss table
            $("#CList1").show();
            ///////
        }

        var Dye = 0;

        if ($('#Dyeing').is(":checked")) {
            Dye = 1;
        }
        else {
            Dye = 0;
        }


        Eweight = $('#txtWeight').val();
        AWeight = $('#txtActualWeight').val();
        TEWeight = parseInt(TEWeight) + parseInt(Eweight);



        var lengdp = 0;
        var isAllValid = true;



        if ($('#ddlYarn').val() == "0") {
            isAllValid = false;
            $('#ddlYarn').siblings(".select2-container").css('border', '1px solid red');
        }
        else {
            $('#ddlYarn').siblings(".select2-container").css('border', '1px solid lightgrey');
        }

        if ($('#ddlCount').val() == "0") {
            isAllValid = false;
            $('#ddlCount').siblings(".select2-container").css('border', '1px solid red');
        }
        else {
            $('#ddlCount').siblings(".select2-container").css('border', '1px solid lightgrey');
        }

        if ($('#ddlColor').val() == "0") {
            isAllValid = false;
            $('#ddlColor').siblings(".select2-container").css('border', '1px solid red');
        }
        else {
            $('#ddlColor').siblings(".select2-container").css('border', '1px solid lightgrey');
        }


        if ($('#txtPer').val() == "") {
            isAllValid = false;
            $('#txtPer').css('border-color', 'Red');
        }
        else {
            $('#txtPer').css('border-color', 'lightgrey');
        }
        if ($('#txtWeight').val() == 0) {
            isAllValid = false;
            $('#txtWeight').css('border-color', 'Red');
        }
        else {
            $('#txtWeight').css('border-color', 'lightgrey');
        }

        if ($('#txtActualWeight').val() == 0) {
            isAllValid = false;
            $('#txtActualWeight').css('border-color', 'Red');
            //alert("Please Check the Fabric Weight...");
            var msg = 'Please Check the Fabric Weight...';
            var flg = 4;
            var mode = 1;
            AlartMessage(msg, flg, mode);
        }
        else {
            $('#txtActualWeight').css('border-color', 'lightgrey');
        }


        if (PlanYarnDetSave.length == 0) {
            lengdp = 1;
        }
        else {
            lengdp = PlanYarnDetSave.length + 1;
        }

        if (isAllValid) {



            var YarnDetObj = {
                Yarn: $("#ddlYarn option:selected").text(),
                Knit_In_ItemId: $('#ddlYarn').val(),
                Size: $("#ddlCount option:selected").text(),
                Knit_In_SizeID: $('#ddlCount').val(),
                Color: $("#ddlColor option:selected").text(),
                Knit_in_ColorID: $('#ddlColor').val(),
                Knit_In_Per: $('#txtPer').val(),
                Knit_In_Qty: $('#txtWeight').val(),
                Knit_In_ActQty: $('#txtActualWeight').val(),
                Loss_per: $('#txtLossPer').val(),
                Dyeing_Req: Dye,
                // txtPer: $('#txtActualWeight').val(),
                YSlNo: YlNo,//YarnMasSerno
                YplanDetID: 0,
                YPlanMasID: 0,
                SlNo: lengdp,//YarnDetSerno
                FabricID: FBRID,
                BaseColorID: BCLID,
                CompSno: CompSlNo,

                Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
            };

            var b = $('#txtWeight').val();
            Weight = Weight - b;
            var Percnt = YarnDetObj.Knit_In_Per;

            PlanYarnDetSave.push(YarnDetObj);
            yarndet = [];

            for (var x = 0; x < PlanYarnDetSave.length; x++) {

                if (PlanYarnDetSave[x].BaseColorID == BCLID && PlanYarnDetSave[x].FabricID == FBRID) {
                    yarndet.push(PlanYarnDetSave[x]);
                }
            }
            PlanYarnDet = yarndet;
            Loadsepyarn(PlanYarnDet);
            LoadsepSaveyarn(PlanYarnDetSave);

            totyarn();
            fnClearYarnDetailsControls();

            if (PlanYarnDet.length > 0) {
                Bper = 0;

                var totalper = 0;
                for (var s = 0; s < PlanYarnDet.length; s++) {
                    if (PlanYarnDet[s].BaseColorID == BCLID && PlanYarnDet[s].FabricID == FBRID) {
                        var per = PlanYarnDet[s].Knit_In_Per;
                        totalper = totalper + parseFloat(per);
                    }
                }
                Bper = 100 - totalper;
            }



            var PerQty = $('#txtPer').val();



            if (Bper > 0) {
                $("#txtPer").val(Bper);
                var NAweight = Bper / 100 * wt;
                NAweight = NAweight.toFixed(3);
                $('#txtWeight').val(NAweight);
                $('#txtActualWeight').val(NAweight);
                Bper = 0;
            }

            else if (Bper == 0) {
                $('#txtWeight').val(0);
                $('#txtActualWeight').val(0);
                $("#ddlYarn").prop("disabled", true);
                $("#ddlColor").prop("disabled", true);
                $("#ddlCount").prop("disabled", true);

            } else {
                wt = wt.toFixed(3);
                $('#txtWeight').val(wt);
                $('#txtActualWeight').val(wt);
            }

            //valid
            Loadsepyarn(yarndet);
            if (Dye == 1) {

                var test = [];
                if (PlanYarnDyeingSave.length > 0) {

                    for (var f = 0; f < PlanYarnDyeingSave.length; f++) {
                        if (PlanYarnDyeingSave[f].YDSlNo == lengdp) {
                            test.push(PlanYarnDyeingSave[f]);
                        }
                    }

                }
                var totgc = [];
                var totgc2 = [];
                if (YarnDyeing.length > 0) {
                    var garidlist = [];
                    var garclid = 0;
                    for (var e = 0; e < YarnDyeing.length; e++) {
                        var gid = YarnDyeing[e].Garment_ColorID;

                        var totalqty = 0;

                        for (var q = 0; q < PlanCompFabricDetSave.length; q++) {
                            if (PlanCompFabricDetSave[q].ColorID == gid && PlanCompFabricDetSave[q].BColorID == BCLID && PlanCompFabricDetSave[q].FabricID == FBRID) {
                                garidlist.push(PlanCompFabricDetSave[q].ColorID);
                                var qty = PlanCompFabricDetSave[q].Weight;
                                totalqty = totalqty + parseFloat(qty);
                            }
                        }
                        var bcqty = 0;
                        for (var w = 0; w < PlanCompFabricDetSave.length; w++) {
                            if (PlanCompFabricDetSave[w].ColorID == gid && PlanCompFabricDetSave[w].BColorID == BCLID && PlanCompFabricDetSave[w].FabricID == FBRID) {
                                var qty = PlanCompFabricDetSave[w].BColorPQty;
                                bcqty = bcqty + parseFloat(qty);
                            }
                        }
                        var finqty = 0;
                        for (var p = 0; p < PlanCompFabricDetSave.length; p++) {
                            if (PlanCompFabricDetSave[p].ColorID == gid && PlanCompFabricDetSave[p].BColorID == BCLID && PlanCompFabricDetSave[p].FabricID == FBRID) {

                                var qty = PlanCompFabricDetSave[p].FColorPQty;
                                finqty = finqty + parseFloat(qty);
                            }
                        }

                        var totclrqty = parseFloat(bcqty) + parseFloat(finqty);

                        var tot = parseFloat(totalqty - totclrqty);

                        totgc.push(tot);
                        if (garclid != gid) {
                            totgc2.push(tot);
                        }
                        else {
                            tot = 0;
                            totgc2.push(tot);
                        }
                        garclid = gid;
                    }

                    if (totgc.length > 0) {
                        for (var p = 0; p < totgc.length; p++) {
                            var g = totgc[p];
                            totgc[p] = parseFloat((Percnt * g) / 100).toFixed(3);
                        }
                    }
                    if (totgc2.length > 0) {
                        for (var p = 0; p < totgc2.length; p++) {
                            var g = totgc2[p];
                            totgc2[p] = parseFloat((Percnt * g) / 100).toFixed(3);
                        }
                    }
                }
                $.unique(garidlist);
                if (test.length == 0) {
                    for (var l = 0; l < YarnDyeing.length; l++) {
                        var gcl = YarnDyeing[l].Garment_ColorID;
                        for (var r = 0; r < garidlist.length; r++) {
                            if (garidlist[r] == gcl) {
                                var lengp = 0;
                                if (PlanYarnDyeingSave.length == 0) {
                                    lengp = 1;
                                }
                                else {
                                    lengp = PlanYarnDyeingSave.length + 1;
                                }
                                var obj = {
                                    CColor: YarnDyeing[l].CColor,
                                    CColorID: YarnDyeing[l].CColorID,
                                    GColor: YarnDyeing[l].GColor,
                                    Garment_ColorID: YarnDyeing[l].Garment_ColorID,
                                    SlNo: lengp,
                                    CompSlNo: CompSlNo,// currentro1[0]['CompSno'],
                                    YDSlNo: lengdp,// currentro1[0]['SlNo'],
                                    ActWeight: totgc[l],
                                    Weight: 0,
                                    FabId: FID,//currentro1[0]['FabricID'],
                                    GWeight: totgc[l],
                                    Yarn_DyeColorID: YarnDyeing[l].CColorID,
                                    Qty_Per: 0,
                                    Purchase_Qty: 0,
                                    Loss: 0,
                                    ColorSeq: 0,
                                    PerWeight: 0,
                                    YPlanDetID: 0,
                                    YPlanDyeID: 0,
                                    Courses: 0

                                }
                                PlanYarnDyeingSave.push(obj);
                            }
                        }
                    }
                    loadYarnDyeAddTableSave(PlanYarnDyeingSave);
                }

                var ctry = [];
                ctry = PlanYarnDyeingSave;

                ctry = $.grep(ctry, function (e) {
                    if (e.YDSlNo == lengdp) {
                        return e;
                    }
                });
                PlanYarnDyeing = ctry;

                loadYarnDyeAddTable(PlanYarnDyeing);
            }
            else {
                var ctry = [];
                PlanYarnDyeing = ctry;
                loadYarnDyeAddTable(PlanYarnDyeing);
            }

        }

    });


    function fnClearYarnDetailsControls() {

        $('#ddlYarn').val('0').trigger('change');
        $('#ddlColor').val('0').trigger('change');
        $('#ddlCount').val('0').trigger('change');

        $('#txtPer').val('');
        $('#txtWeight').val('');
        $('#txtActualWeight').val('');
        $('#txtLossPer').val('');
        document.getElementById("Dyeing").checked = false;

    }

    $(document).on('click', '.btnYarnedit', function () {

        Mode = 1;
        //if (YlNo == 0) {
        //    alert('Please select any one yarn...');
        //    return true;
        //}
        rowindex = $(this).closest('tr').index();

        var cur1 = PlanYarnDet.slice(rowindex);

        if (Mod == 0) {

            $('#ddlYarn').val(cur1[0]['Knit_In_ItemId']).trigger('change');
            $('#txtPer').val(cur1[0]['Knit_In_Per']);
            $('#ddlCount').val(cur1[0]['Knit_In_SizeID']).trigger('change');
            $('#txtWeight').val(cur1[0]['Knit_In_Qty']);
            $('#ddlColor').val(cur1[0]['Knit_in_ColorID']).trigger('change');
            $('#txtLossPer').val(cur1[0]['Loss_per']);
            $('#txtActualWeight').val(cur1[0]['Knit_In_Qty']);
        } else {

            $('#ddlYarn').val(cur1[0]['Knit_In_ItemId']).trigger('change');
            $('#txtPer').val(cur1[0]['Knit_In_Per']);
            $('#ddlCount').val(cur1[0]['Knit_In_SizeID']).trigger('change');
            $("#txtWeight").val(cur1[0]['Knit_In_Qty']);
            $('#ddlColor').val(cur1[0]['Knit_in_ColorID']).trigger('change');
            $('#txtLossPer').val(cur1[0]['Loss_per']);
            $('#txtActualWeight').val(cur1[0]['Knit_In_Qty']);

            Yplanmasid = cur1[0]['YSlNo'];

            var CItemId = cur1[0]['Knit_In_ItemId'];
            var CSizeId = cur1[0]['Knit_In_SizeID'];
            var CColorId = cur1[0]['Knit_in_ColorID'];

            for (var t = 0; t < PlanYarnSave.length; t++) {
                if (PlanYarnSave[t].YSlno == Yplanmasid) {
                    Weight = PlanYarnSave[t].Fabric_Weight;
                }
            }


            CheckPoMadeEntry(CItemId, CColorId, CSizeId);

        }
        var Chk = cur1[0]['Dyeing_Req'];

        if (Chk == 0) {
            document.getElementById("Dyeing").checked = false;
        } else if (Chk == 1) {
            document.getElementById("Dyeing").checked = true;
        }

        $('#btnYarnViewAdd').hide();
        $('#btnYarnViewUpdate').show();
    });



    //Yarn Loss
    $(document).on('click', '.btnYarnDetLoss', function () {

        $("#YarnLossId").show();
        rowindex = $(this).closest('tr').index();
        var cur1 = PlanYarnDet.slice(rowindex);
        YDetSlNo = cur1[0].SlNo;
        var CompSLNo = cur1[0].CompSno;
        if (PlanYarnLossSave.length > 0) {
            PlanYarnLoss = $.grep(PlanYarnLossSave, function (e) {
                return e.SNo == YDetSlNo && e.CompSNo == CompSLNo;
            });
            loadyarnLossTable(PlanYarnLoss);
        }
    });

    $('#btnYarnViewUpdate').click(function () {
        debugger;
        var currentrowsel = PlanYarnDet.slice(rowindex);

        currentrowsel[0]['Knit_In_ItemId'] = $("#ddlYarn").val();
        currentrowsel[0]['Yarn'] = $("#ddlYarn option:selected").text();

        currentrowsel[0]['Knit_In_SizeID'] = $("#ddlCount").val();
        currentrowsel[0]['Size'] = $("#ddlCount option:selected").text();

        currentrowsel[0]['Knit_in_ColorID'] = $("#ddlColor").val();
        currentrowsel[0]['Color'] = $("#ddlColor option:selected").text();
        currentrowsel[0]['Loss_per'] = $("#txtLossPer").val();
        currentrowsel[0]['Knit_In_Qty'] = $("#txtWeight").val();
        currentrowsel[0]['Knit_In_ActQty'] = $("#txtActualWeight").val();
        currentrowsel[0]['Knit_In_Per'] = $("#txtPer").val();

        var Percnt = $("#txtPer").val();
        var Dye = 0;
        //CompSlNo = currentrowsel[0]['CompSno'];
        var ysno = currentrowsel[0]['SlNo'];
        //var detid = currentrowsel[0]['CompSno'];
        var ysl = currentrowsel[0]['YSlNo'];

        if ($('#Dyeing').is(":checked")) {
            currentrowsel[0]['Dyeing_Req'] = 1;
            Dye = 1;
        }
        else {
            currentrowsel[0]['Dyeing_Req'] = 0;
            Dye = 0;
        }



        PlanYarnDet[rowindex] = currentrowsel[0];
        for (var d = 0; d < PlanYarnDetSave.length; d++) {
            //if (PlanYarnDetSave[d].SlNo == ysno && PlanYarnDetSave[d].CompSno == detid) {
            //    PlanYarnDetSave[d] = currentrowsel[0];;

            //}
            if (PlanYarnDetSave[d].SlNo == ysno && PlanYarnDetSave[d].YSlNo == ysl) {
                PlanYarnDetSave[d] = currentrowsel[0];;

            }
        }
        yarndet = PlanYarnDet;
        Loadsepyarn(PlanYarnDet);
        LoadsepSaveyarn(PlanYarnDetSave);
        $('#btnYarnViewUpdate').hide();
        $('#btnYarnViewAdd').show();
        var YarnDyeingSave = [];
        for (i = 0; PlanYarnDetSave.length > i; i++) {
            if (PlanYarnDetSave[i].Dyeing_Req == true || PlanYarnDetSave[i].Dyeing_Req == 1) {
                for (j = 0; PlanYarnDyeingSave.length > j; j++) {
                    if (PlanYarnDetSave[i].SlNo == PlanYarnDyeingSave[j].YDSlNo) {
                        YarnDyeingSave.push(PlanYarnDyeingSave[j]);
                    }
                }
            }
        }

        PlanYarnDyeingSave = YarnDyeingSave;
        var b = $('#txtWeight').val();

        Weight = Weight - b;

        if (PlanYarnDet.length > 0) {
            Bper = 0;

            var totalper = 0;
            for (var s = 0; s < PlanYarnDet.length; s++) {
                if (PlanYarnDet[s].YSlNo == ysl) {
                    var per = PlanYarnDet[s].Knit_In_Per;
                    totalper = totalper + parseFloat(per);
                }
            }
            Bper = 100 - totalper;
        }


        //  if (Mod == 0) {

        var PerQty = $('#txtPer').val();
        fnClearYarnDetailsControls();


        if (Bper > 0) {
            $("#txtPer").val(Bper);
            var NAweight = Bper / 100 * wt;
            NAweight = NAweight.toFixed(3);
            $('#txtWeight').val(NAweight);
            $('#txtActualWeight').val(NAweight);
            Bper = 0;
        }

        else if (Bper == 0) {
            $('#txtWeight').val(0);
            $('#txtActualWeight').val(0);


        } else {
            $('#txtWeight').val(wt);
            $('#txtActualWeight').val(wt);
        }

        //valid
        Loadsepyarn(yarndet);
        totyarn();
        if (Dye == 1) {

            var test = [];
            if (PlanYarnDyeingSave.length > 0) {
                var dtry = [];
                dtry = PlanYarnDyeingSave;

                dtry = $.grep(dtry, function (e) {
                    if (e.YDSlNo != ysno) {
                        return e;
                    }
                });
                PlanYarnDyeingSave = dtry;
            }
            var totgc = [];
            var totgc2 = [];
            if (YarnDyeing.length > 0) {
                var garidlist = [];
                var garclid = 0;
                for (var e = 0; e < YarnDyeing.length; e++) {
                    var gid = YarnDyeing[e].Garment_ColorID;
                    var totalqty = 0;

                    for (var q = 0; q < PlanCompFabricDetSave.length; q++) {
                        if (PlanCompFabricDetSave[q].ColorID == gid && PlanCompFabricDetSave[q].BColorID == BCLID && PlanCompFabricDetSave[q].FabricID == FBRID) {
                            garidlist.push(PlanCompFabricDetSave[q].ColorID);
                            var qty = PlanCompFabricDetSave[q].Weight;
                            totalqty = totalqty + parseFloat(qty);
                        }
                    }
                    var bcqty = 0;
                    for (var w = 0; w < PlanCompFabricDetSave.length; w++) {
                        if (PlanCompFabricDetSave[w].ColorID == gid && PlanCompFabricDetSave[w].BColorID == BCLID && PlanCompFabricDetSave[w].FabricID == FBRID) {
                            var qty = PlanCompFabricDetSave[w].BColorPQty;
                            bcqty = bcqty + parseFloat(qty);
                        }
                    }
                    var finqty = 0;
                    for (var p = 0; p < PlanCompFabricDetSave.length; p++) {
                        if (PlanCompFabricDetSave[p].ColorID == gid && PlanCompFabricDetSave[p].BColorID == BCLID && PlanCompFabricDetSave[p].FabricID == FBRID) {

                            var qty = PlanCompFabricDetSave[p].FColorPQty;
                            finqty = finqty + parseFloat(qty);
                        }
                    }

                    var totclrqty = parseFloat(bcqty) + parseFloat(finqty);

                    var tot = parseFloat(totalqty - totclrqty);

                    totgc.push(tot);
                    if (garclid != gid) {
                        totgc2.push(tot);
                    }
                    else {
                        tot = 0;
                        totgc2.push(tot);
                    }
                    garclid = gid;
                }

                if (totgc.length > 0) {
                    for (var p = 0; p < totgc.length; p++) {
                        var g = totgc[p];
                        totgc[p] = parseFloat((Percnt * g) / 100).toFixed(3);
                    }
                }
                if (totgc2.length > 0) {
                    for (var p = 0; p < totgc2.length; p++) {
                        var g = totgc2[p];
                        totgc2[p] = parseFloat((Percnt * g) / 100).toFixed(3);
                    }
                }
            }
            $.unique(garidlist);
            //if (test.length == 0) {
            for (var l = 0; l < YarnDyeing.length; l++) {
                var gcl = YarnDyeing[l].Garment_ColorID;
                for (var r = 0; r < garidlist.length; r++) {
                    if (garidlist[r] == gcl) {
                        var lengp = 0;
                        if (PlanYarnDyeingSave.length == 0) {
                            lengp = 1;
                        }
                        else {
                            lengp = PlanYarnDyeingSave.length + 1;
                        }
                        var obj = {
                            CColor: YarnDyeing[l].CColor,
                            CColorID: YarnDyeing[l].CColorID,
                            GColor: YarnDyeing[l].GColor,
                            Garment_ColorID: YarnDyeing[l].Garment_ColorID,
                            SlNo: lengp,
                            CompSlNo: CompSlNo,// currentro1[0]['CompSno'],
                            YDSlNo: ysno,// currentro1[0]['SlNo'],
                            ActWeight: totgc[l],
                            Weight: 0,
                            FabId: FID,//currentro1[0]['FabricID'],
                            GWeight: totgc[l],
                            Yarn_DyeColorID: YarnDyeing[l].CColorID,
                            Qty_Per: 0,
                            Purchase_Qty: 0,
                            Loss: 0,
                            ColorSeq: 0,
                            PerWeight: 0,
                            YPlanDetID: 0,
                            YPlanDyeID: 0,
                            Courses: 0

                        }
                        PlanYarnDyeingSave.push(obj);
                    }
                }
            }
            loadYarnDyeAddTableSave(PlanYarnDyeingSave);
            // }

            var ctry = [];
            ctry = PlanYarnDyeingSave;

            ctry = $.grep(ctry, function (e) {
                if (e.YDSlNo == ysno) {
                    return e;
                }
            });
            PlanYarnDyeing = ctry;

            loadYarnDyeAddTable(PlanYarnDyeing);
        }
        else {
            var ctry = [];
            PlanYarnDyeing = ctry;
            loadYarnDyeAddTable(PlanYarnDyeing);
        }
        // }


    });

    $(document).on('click', '.btnYarnremove', function () {

        rowindex = $(this).closest('tr').index();
        var currentrowsel = PlanYarnDet.slice(rowindex);


        var CItemId = currentrowsel[0]['Knit_In_ItemId'];
        var CSizeId = currentrowsel[0]['Knit_In_SizeID'];
        var CColorId = currentrowsel[0]['Knit_in_ColorID'];



        CheckPoMadeEntry(CItemId, CColorId, CSizeId);

        if (CEPItemList.length == 0) {

            var compsn = currentrowsel[0]['CompSno'];
            var sno = currentrowsel[0]['SlNo'];
            PlanYarnDet.splice(rowindex, 1);
            for (var f = 0; f < PlanYarnDetSave.length; f++) {
                if (PlanYarnDetSave[f].CompSno == compsn && PlanYarnDetSave[f].SlNo == sno) {
                    PlanYarnDetSave.splice(f, 1);
                }
            }
            document.getElementById("tblyarnDetails").deleteRow(rowindex + 1);

            LoadsepSaveyarn(PlanYarnDetSave);
        }
    });

});

function loaddetails(StyleRowId) {
    debugger;
    $.ajax({
        url: "/ProcessSeqProc/ListProcSeqDetails",
        data: JSON.stringify({ StyleRowId: StyleRowId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            ProcSeqList = result;

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}



function CheckPoMadeEntry(Itmid, Colorid, Sizeid) {
    debugger;
    var OrdNo = $('#txtOrderNo').val();
    var Styid = $('#txtHStyleId').val();


    $.ajax({
        url: "/PlanningConsumption/LoadCheckPoMadeEntryDetails",
        data: JSON.stringify({ Orderno: OrdNo, styleid: Styid, Itemid: Itmid, Colorid: Colorid, Sizeid: Sizeid }),
        type: "POST",
        async: false,
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            CEPItemList = result;
            if (CEPItemList.length > 0) {

                if (Mod == 1) {

                    for (var x = 0; x < CEPItemList.length; x++) {

                        //alert("Po has been made for " + CEPItemList[x].PoNo + ",Please Check it....")
                        var msg = "PO has been made for " + CEPItemList[x].PoNo + ",Please Check it....";
                        var flg = 4;
                        var mode = 1;
                        AlartMessage(msg, flg, mode);
                        $("#ddlYarn").attr('disabled', true);
                        $("#ddlCount").attr('disabled', true);
                        $("#ddlColor").attr('disabled', true);
                        $("#txtPer").attr('disabled', true);
                        //$('#btnAdd').hide();
                        return true;
                    }

                }
                if (Mod == 2) {
                    for (var x = 0; x < CEPItemList.length; x++) {
                        //alert("Po has been made for " + CEPItemList[x].PoNo + ",Please Check it....")
                        var msg = "PO has been made for " + CEPItemList[x].PoNo + ",Please Check it....";
                        var flg = 4;
                        var mode = 1;
                        AlartMessage(msg, flg, mode);
                        $("#ddlYarn").attr('disabled', true);
                        $("#ddlCount").attr('disabled', true);
                        $("#ddlColor").attr('disabled', true);
                        $("#txtPer").attr('disabled', true);
                        return true;

                    }
                }

            } else {
                $("#ddlYarn").attr('disabled', false);
                $("#ddlCount").attr('disabled', false);
                $("#ddlColor").attr('disabled', false);
                $("#txtPer").attr('disabled', false);
            }

        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
//function loadfabricfill() {
//    debugger;
//    //LoadingSymb();
//    indexforfabfill;
//    var currentrow = PlanCompFabricDet.slice(indexforfabfill);
//    var compsno = currentrow[0].CompSlNo;
//    var sno = currentrow[0].snumb;
//    var bclrid = currentrow[0].BColorID;
//    var bclr = currentrow[0].Bcolor;
//    var bcqty = currentrow[0].BColorPQty;
//    var fclrid = currentrow[0].FColorID;
//    var fcl = currentrow[0].Fcolor;
//    var fclqty = currentrow[0].FColorPQty;
//    var prclid = currentrow[0].PColorID;
//    var prcl = currentrow[0].PColor;
//    var fgsm = currentrow[0].FGsm;
//    var size = currentrow[0].Size;
//    var color = currentrow[0].Color;


//    var kgsm = currentrow[0].KGsm;
//    var guage = currentrow[0].guage;
//    var textur = currentrow[0].texture;
//    var contnt = currentrow[0].content;
//    var looplen = currentrow[0].LoopLen;



//    var table = $('#tCPIbody').DataTable();
//    var data = table.rows().data();

//    var fabtable = $('#tCDbody').DataTable();
//    var fabdata = fabtable.rows().data();


//    var protype = $('input[name="FabType"]:checked').attr('value');
//    if (protype == 'A') {
//        if (fabfillvar == 'BC') {
//            $.each(PlanCompFabricDet, function () {
//                this.BColorID = bclrid;
//                this.Bcolor = bclr;
//            });
//            $.each(PlanCompFabricDetSave, function () {
//                if (this.CompSlNo == compsno) {
//                    this.BColorID = bclrid;
//                    this.Bcolor = bclr;
//                }
//            });
//            /// loadCompFabTable(PlanCompFabricDet);
//            fillfabrictbl(PlanCompFabricDet);
//            loadCompFabSaveTable(PlanCompFabricDetSave);
//        }
//        if (fabfillvar == 'BCQT') {

//            $.each(PlanCompFabricDet, function () {
//                var sn = this.snumb;
//                var gj = this.Weight - this.FColorPQty;
//                this.BColorPQty = gj;
//                $('input[id=txtPurQty]').each(function (ig) {
//                    if (fabdata[ig].snumb == sn && fabdata[ig].CompSlNo == compsno) {
//                        var row = $(this).closest('tr');
//                        row.find('#txtPurQty').val(gj);
//                    }
//                });
//            });
//            $.each(PlanCompFabricDetSave, function () {
//                if (this.CompSlNo == compsno) {
//                    var gj = this.Weight - this.FColorPQty;
//                    this.BColorPQty = gj;
//                }
//            });


//            //loadCompFabTable(PlanCompFabricDet);
//            loadCompFabSaveTable(PlanCompFabricDetSave);

//        }
//        if (fabfillvar == 'FIC') {
//            $.each(PlanCompFabricDet, function () {
//                this.FColorID = fclrid;
//                this.Fcolor = fcl;
//            });
//            $.each(PlanCompFabricDetSave, function () {
//                if (this.CompSlNo == compsno) {
//                    this.FColorID = fclrid;
//                    this.Fcolor = fcl;
//                }
//            });
//            /// loadCompFabTable(PlanCompFabricDet);
//            fillfabrictbl(PlanCompFabricDet);
//            loadCompFabSaveTable(PlanCompFabricDetSave);
//        }
//        if (fabfillvar == 'FIQT') {
//            $.each(PlanCompFabricDet, function () {
//                var sn = this.snumb;
//                var gj = this.Weight - this.BColorPQty;
//                this.FColorPQty = gj;
//                $('input[id=txtPurQty]').each(function (ig) {
//                    if (fabdata[ig].snumb == sn && fabdata[ig].CompSlNo == compsno) {
//                        var row = $(this).closest('tr');
//                        row.find('#txtFPurQty').val(gj);
//                    }
//                });
//            });
//            $.each(PlanCompFabricDetSave, function () {
//                if (this.CompSlNo == compsno) {
//                    var gj = this.Weight - this.BColorPQty;
//                    this.FColorPQty = gj;
//                }
//            });


//            //loadCompFabTable(PlanCompFabricDet);
//            loadCompFabSaveTable(PlanCompFabricDetSave);
//        }
//        if (fabfillvar == 'PRC') {
//            $.each(PlanCompFabricDet, function () {
//                this.PColorID = prclid;
//                this.PColor = prcl;
//            });
//            $.each(PlanCompFabricDetSave, function () {
//                if (this.CompSlNo == compsno) {
//                    this.PColorID = prclid;
//                    this.PColor = prcl;
//                }
//            });
//            ///loadCompFabTable(PlanCompFabricDet);
//            fillfabrictbl(PlanCompFabricDet);
//            loadCompFabSaveTable(PlanCompFabricDetSave);
//        }
//        if (fabfillvar == 'FGSM') {
//            //$.each(PlanCompFabricDet, function () {
//            //    var sn = this.snumb;
//            //    this.FGsm = fgsm;
//            //    $('input[id=txtPurQty]').each(function (ig) {
//            //        if (fabdata[ig].snumb == sn && fabdata[ig].CompSlNo == compsno) {
//            //            var row = $(this).closest('tr');
//            //            row.find('#txtFGsm').val(fgsm);
//            //        }
//            //    });
//            //});

//            //$('input[id=txtPurQty]').each(function (ig) {
//            //    debugger;
//            //    // if (ecdata[ig].snumb == (ig + 1)) {
//            //    var row = $(this).closest('tr');

//            //    for (var h = 0; h < PlanCompFabricDet.length; h++) {
//            //        if (ig == h) {

//            //            var FGsm = PlanCompFabricDet[h].FGsm;
//            //        }
//            //    }
//            //});

//            fillfabrictbl(PlanCompFabricDet);
//            $.each(PlanCompFabricDetSave, function () {
//                if (this.CompSlNo == compsno) {
//                    this.FGsm = fgsm;
//                }
//            });
//            //loadCompFabTable(PlanCompFabricDet);
//            loadCompFabSaveTable(PlanCompFabricDetSave);
//        }
//        if (fabfillvar == 'KGSM') {
//            var sn = this.snumb;
//            this.FGsm = kgsm;
//            $('input[id=txtPurQty]').each(function (ig) {
//                if (fabdata[ig].snumb == sn && fabdata[ig].CompSlNo == compsno) {
//                    var row = $(this).closest('tr');
//                    row.find('#txtKnitgsm').val(kgsm);
//                }
//            });

//            $.each(PlanCompFabricDetSave, function () {
//                if (this.CompSlNo == compsno) {
//                    this.KGsm = kgsm;
//                }
//            });
//            //loadCompFabTable(PlanCompFabricDet);
//            loadCompFabSaveTable(PlanCompFabricDetSave);
//        }
//        if (fabfillvar == 'LOOPLEN') {
//            var sn = this.snumb;
//            this.LoopLen = looplen;
//            $('input[id=txtPurQty]').each(function (ig) {
//                if (fabdata[ig].snumb == sn && fabdata[ig].CompSlNo == compsno) {
//                    var row = $(this).closest('tr');
//                    row.find('#txtlooplen').val(looplen);
//                }
//            });

//            $.each(PlanCompFabricDetSave, function () {
//                if (this.CompSlNo == compsno) {
//                    this.LoopLen = kgsm;
//                }
//            });
//            //loadCompFabTable(PlanCompFabricDet);
//            loadCompFabSaveTable(PlanCompFabricDetSave);
//        }
//        if (fabfillvar == 'TEXT') {
//            var sn = this.snumb;
//            this.texture = textur;
//            $('input[id=txtPurQty]').each(function (ig) {
//                if (fabdata[ig].snumb == sn && fabdata[ig].CompSlNo == compsno) {
//                    var row = $(this).closest('tr');
//                    row.find('#txtTexture').val(textur);
//                }
//            });

//            $.each(PlanCompFabricDetSave, function () {
//                if (this.CompSlNo == compsno) {
//                    this.texture = textur;
//                }
//            });
//            //loadCompFabTable(PlanCompFabricDet);
//            loadCompFabSaveTable(PlanCompFabricDetSave);
//        }
//        if (fabfillvar == 'CONT') {
//            var sn = this.snumb;
//            this.content = contnt;
//            $('input[id=txtPurQty]').each(function (ig) {
//                if (fabdata[ig].snumb == sn && fabdata[ig].CompSlNo == compsno) {
//                    var row = $(this).closest('tr');
//                    row.find('#txtContent').val(contnt);
//                }
//            });

//            $.each(PlanCompFabricDetSave, function () {
//                if (this.CompSlNo == compsno) {
//                    this.content = contnt;
//                }
//            });
//            //loadCompFabTable(PlanCompFabricDet);
//            loadCompFabSaveTable(PlanCompFabricDetSave);
//        }
//        if (fabfillvar == 'GUAGE') {
//            var sn = this.snumb;
//            this.guage = guage;
//            $('input[id=txtPurQty]').each(function (ig) {
//                if (fabdata[ig].snumb == sn && fabdata[ig].CompSlNo == compsno) {
//                    var row = $(this).closest('tr');
//                    row.find('#txtGauge').val(guage);
//                }
//            });

//            $.each(PlanCompFabricDetSave, function () {
//                if (this.CompSlNo == compsno) {
//                    this.guage = guage;
//                }
//            });
//            //loadCompFabTable(PlanCompFabricDet);
//            loadCompFabSaveTable(PlanCompFabricDetSave);
//        }
//    }
//    if (protype == 'S') {
//        if (fabfillvar == 'BC') {
//            $.each(PlanCompFabricDet, function () {
//                if (this.Size == size) {
//                    this.BColorID = bclrid;
//                    this.Bcolor = bclr;
//                }
//            });
//            $.each(PlanCompFabricDetSave, function () {
//                if (this.CompSlNo == compsno && this.Size == size) {
//                    this.BColorID = bclrid;
//                    this.Bcolor = bclr;
//                }
//            });
//            /// loadCompFabTable(PlanCompFabricDet);
//            fillfabrictbl(PlanCompFabricDet);
//            loadCompFabSaveTable(PlanCompFabricDetSave);
//        }
//        if (fabfillvar == 'BCQT') {
//            $.each(PlanCompFabricDet, function () {
//                if (this.Size == size) {

//                    var sn = this.snumb;
//                    var gj = this.Weight - this.FColorPQty;
//                    gj.toFixed(3);
//                    this.BColorPQty = gj;
//                    $('input[id=txtPurQty]').each(function (ig) {
//                        if (fabdata[ig].snumb == sn && fabdata[ig].CompSlNo == compsno) {
//                            var row = $(this).closest('tr');
//                            row.find('#txtPurQty').val(gj);
//                        }
//                    });
//                }
//            });
//            $.each(PlanCompFabricDetSave, function () {
//                if (this.CompSlNo == compsno && this.Size == size) {
//                    var gj = this.Weight - this.FColorPQty;
//                    this.BColorPQty = gj;
//                }
//            });

//            //loadCompFabTable(PlanCompFabricDet);
//            loadCompFabSaveTable(PlanCompFabricDetSave);
//        }
//        if (fabfillvar == 'FIC') {
//            $.each(PlanCompFabricDet, function () {
//                if (this.Size == size) {
//                    this.FColorID = fclrid;
//                    this.Fcolor = fcl;
//                }
//            });
//            $.each(PlanCompFabricDetSave, function () {
//                if (this.CompSlNo == compsno && this.Size == size) {
//                    this.FColorID = fclrid;
//                    this.Fcolor = fcl;
//                }
//            });
//            ///loadCompFabTable(PlanCompFabricDet);
//            fillfabrictbl(PlanCompFabricDet);
//            loadCompFabSaveTable(PlanCompFabricDetSave);
//        }
//        if (fabfillvar == 'FIQT') {
//            $.each(PlanCompFabricDet, function () {
//                if (this.Size == size) {

//                    var sn = this.snumb;
//                    var gj = this.Weight - this.BColorPQty;
//                    gj.toFixed(3);
//                    this.FColorPQty = gj;

//                    $('input[id=txtPurQty]').each(function (ig) {
//                        if (fabdata[ig].snumb == sn && fabdata[ig].CompSlNo == compsno) {
//                            var row = $(this).closest('tr');
//                            row.find('#txtFPurQty').val(gj);
//                        }
//                    });
//                }
//            });
//            $.each(PlanCompFabricDetSave, function () {
//                if (this.CompSlNo == compsno && this.Size == size) {
//                    var gj = this.Weight - this.BColorPQty;
//                    this.FColorPQty = gj;
//                }
//            });
//            ///loadCompFabTable(PlanCompFabricDet);
//            fillfabrictbl(PlanCompFabricDet);
//            loadCompFabSaveTable(PlanCompFabricDetSave);
//        }
//        if (fabfillvar == 'PRC') {
//            $.each(PlanCompFabricDet, function () {
//                if (this.Size == size) {
//                    this.PColorID = prclid;
//                    this.PColor = prcl;
//                }
//            });
//            $.each(PlanCompFabricDetSave, function () {
//                if (this.CompSlNo == compsno && this.Size == size) {
//                    this.PColorID = prclid;
//                    this.PColor = prcl;
//                }
//            });
//            ///loadCompFabTable(PlanCompFabricDet);
//            fillfabrictbl(PlanCompFabricDet);
//            loadCompFabSaveTable(PlanCompFabricDetSave);
//        }
//        if (fabfillvar == 'FGSM') {
//            $.each(PlanCompFabricDet, function () {
//                if (this.Size == size) {
//                    var sn = this.snumb;
//                    this.FGsm = fgsm;

//                    $('input[id=txtPurQty]').each(function (ig) {
//                        if (fabdata[ig].snumb == sn && fabdata[ig].CompSlNo == compsno) {
//                            var row = $(this).closest('tr');
//                            row.find('#txtFGsm').val(fgsm);
//                        }
//                    });
//                }
//            });
//            $.each(PlanCompFabricDetSave, function () {
//                if (this.CompSlNo == compsno && this.Size == size) {
//                    this.FGsm = fgsm;
//                }
//            });
//            fillfabrictbl(PlanCompFabricDet);
//            //loadCompFabTable(PlanCompFabricDet);
//            loadCompFabSaveTable(PlanCompFabricDetSave);
//        }
//        if (fabfillvar == 'KGSM') {
//            $.each(PlanCompFabricDet, function () {
//                if (this.Size == size) {
//                    var sn = this.snumb;
//                    this.KGsm = kgsm;

//                    $('input[id=txtPurQty]').each(function (ig) {
//                        if (fabdata[ig].snumb == sn && fabdata[ig].CompSlNo == compsno) {
//                            var row = $(this).closest('tr');
//                            row.find('#txtKnitgsm').val(kgsm);
//                        }
//                    });
//                }
//            });
//            $.each(PlanCompFabricDetSave, function () {
//                if (this.CompSlNo == compsno && this.Size == size) {
//                    this.KGsm = kgsm;
//                }
//            });
//            //loadCompFabTable(PlanCompFabricDet);
//            loadCompFabSaveTable(PlanCompFabricDetSave);
//        }
//        if (fabfillvar == 'LOOPLEN') {
//            $.each(PlanCompFabricDet, function () {
//                if (this.Size == size) {
//                    var sn = this.snumb;
//                    this.LoopLen = looplen;

//                    $('input[id=txtPurQty]').each(function (ig) {
//                        if (fabdata[ig].snumb == sn && fabdata[ig].CompSlNo == compsno) {
//                            var row = $(this).closest('tr');
//                            row.find('#txtlooplen').val(looplen);
//                        }
//                    });
//                }
//            });
//            $.each(PlanCompFabricDetSave, function () {
//                if (this.CompSlNo == compsno && this.Size == size) {
//                    this.LoopLen = looplen;
//                }
//            });
//            //loadCompFabTable(PlanCompFabricDet);
//            loadCompFabSaveTable(PlanCompFabricDetSave);
//        }
//        if (fabfillvar == 'TEXT') {
//            $.each(PlanCompFabricDet, function () {
//                if (this.Size == size) {
//                    var sn = this.snumb;
//                    this.texture = textur;

//                    $('input[id=txtPurQty]').each(function (ig) {
//                        if (fabdata[ig].snumb == sn && fabdata[ig].CompSlNo == compsno) {
//                            var row = $(this).closest('tr');
//                            row.find('#txtTexture').val(textur);
//                        }
//                    });
//                }
//            });
//            $.each(PlanCompFabricDetSave, function () {
//                if (this.CompSlNo == compsno && this.Size == size) {
//                    this.texture = textur;
//                }
//            });
//            //loadCompFabTable(PlanCompFabricDet);
//            loadCompFabSaveTable(PlanCompFabricDetSave);
//        }
//        if (fabfillvar == 'CONT') {
//            $.each(PlanCompFabricDet, function () {
//                if (this.Size == size) {
//                    var sn = this.snumb;
//                    this.content = contnt;

//                    $('input[id=txtPurQty]').each(function (ig) {
//                        if (fabdata[ig].snumb == sn && fabdata[ig].CompSlNo == compsno) {
//                            var row = $(this).closest('tr');
//                            row.find('#txtContent').val(contnt);
//                        }
//                    });
//                }
//            });
//            $.each(PlanCompFabricDetSave, function () {
//                if (this.CompSlNo == compsno && this.Size == size) {
//                    this.content = contnt;
//                }
//            });
//            //loadCompFabTable(PlanCompFabricDet);
//            loadCompFabSaveTable(PlanCompFabricDetSave);
//        }
//        if (fabfillvar == 'GUAGE') {
//            $.each(PlanCompFabricDet, function () {
//                if (this.Size == size) {
//                    var sn = this.snumb;
//                    this.guage = guage;

//                    $('input[id=txtPurQty]').each(function (ig) {
//                        if (fabdata[ig].snumb == sn && fabdata[ig].CompSlNo == compsno) {
//                            var row = $(this).closest('tr');
//                            row.find('#txtGauge').val(guage);
//                        }
//                    });
//                }
//            });
//            $.each(PlanCompFabricDetSave, function () {
//                if (this.CompSlNo == compsno && this.Size == size) {
//                    this.guage = guage;
//                }
//            });
//            //loadCompFabTable(PlanCompFabricDet);
//            loadCompFabSaveTable(PlanCompFabricDetSave);
//        }

//    }
//    if (protype == 'C') {
//        if (fabfillvar == 'BC') {
//            $.each(PlanCompFabricDet, function () {
//                if (this.Color == color) {
//                    this.BColorID = bclrid;
//                    this.Bcolor = bclr;
//                }
//            });
//            $.each(PlanCompFabricDetSave, function () {
//                if (this.CompSlNo == compsno && this.Color == color) {
//                    this.BColorID = bclrid;
//                    this.Bcolor = bclr;
//                }
//            });
//            /// loadCompFabTable(PlanCompFabricDet);
//            fillfabrictbl(PlanCompFabricDet);
//            loadCompFabSaveTable(PlanCompFabricDetSave);
//        }
//        if (fabfillvar == 'BCQT') {
//            $.each(PlanCompFabricDet, function () {
//                if (this.Color == color) {

//                    var sn = this.snumb;
//                    var gj = this.Weight - this.FColorPQty;
//                    gj.toFixed(3);
//                    this.BColorPQty = gj;
//                    $('input[id=txtPurQty]').each(function (ig) {
//                        if (fabdata[ig].snumb == sn && fabdata[ig].CompSlNo == compsno) {
//                            var row = $(this).closest('tr');
//                            row.find('#txtPurQty').val(gj);
//                        }
//                    });
//                }
//            });
//            $.each(PlanCompFabricDetSave, function () {
//                if (this.CompSlNo == compsno && this.Color == color) {
//                    var gj = this.Weight - this.FColorPQty;
//                    this.BColorPQty = gj;
//                }
//            });
//            //loadCompFabTable(PlanCompFabricDet);
//            loadCompFabSaveTable(PlanCompFabricDetSave);
//        }
//        if (fabfillvar == 'FIC') {
//            $.each(PlanCompFabricDet, function () {
//                if (this.Color == color) {
//                    this.FColorID = fclrid;
//                    this.Fcolor = fcl;
//                }
//            });
//            $.each(PlanCompFabricDetSave, function () {
//                if (this.CompSlNo == compsno && this.Color == color) {
//                    this.FColorID = fclrid;
//                    this.Fcolor = fcl;
//                }
//            });
//            ///loadCompFabTable(PlanCompFabricDet);
//            fillfabrictbl(PlanCompFabricDet);
//            loadCompFabSaveTable(PlanCompFabricDetSave);
//        }
//        if (fabfillvar == 'FIQT') {
//            $.each(PlanCompFabricDet, function () {
//                if (this.Color == color) {

//                    var sn = this.snumb;
//                    var gj = this.Weight - this.BColorPQty;
//                    gj.toFixed(3);
//                    this.FColorPQty = gj;

//                    $('input[id=txtPurQty]').each(function (ig) {
//                        if (fabdata[ig].snumb == sn && fabdata[ig].CompSlNo == compsno) {
//                            var row = $(this).closest('tr');
//                            row.find('#txtFPurQty').val(gj);
//                        }
//                    });
//                }
//            });
//            $.each(PlanCompFabricDetSave, function () {
//                if (this.CompSlNo == compsno && this.Color == color) {
//                    var gj = this.Weight - this.BColorPQty;
//                    this.FColorPQty = gj;
//                }
//            });
//            ///loadCompFabTable(PlanCompFabricDet);
//            fillfabrictbl(PlanCompFabricDet);
//            loadCompFabSaveTable(PlanCompFabricDetSave);
//        }
//        if (fabfillvar == 'PRC') {
//            $.each(PlanCompFabricDet, function () {
//                if (this.Color == color) {
//                    this.PColorID = prclid;
//                    this.PColor = prcl;
//                }
//            });
//            $.each(PlanCompFabricDetSave, function () {
//                if (this.CompSlNo == compsno && this.Color == color) {
//                    this.PColorID = prclid;
//                    this.PColor = prcl;
//                }
//            });
//            ///loadCompFabTable(PlanCompFabricDet);
//            fillfabrictbl(PlanCompFabricDet);
//            loadCompFabSaveTable(PlanCompFabricDetSave);
//        }
//        if (fabfillvar == 'FGSM') {
//            $.each(PlanCompFabricDet, function () {
//                if (this.Color == color) {
//                    var sn = this.snumb;
//                    this.FGsm = fgsm;

//                    $('input[id=txtPurQty]').each(function (ig) {
//                        if (fabdata[ig].snumb == sn && fabdata[ig].CompSlNo == compsno) {
//                            var row = $(this).closest('tr');
//                            row.find('#txtFGsm').val(fgsm);
//                        }
//                    });
//                }
//            });
//            fillfabrictbl(PlanCompFabricDet);

//            $.each(PlanCompFabricDetSave, function () {
//                if (this.CompSlNo == compsno && this.Color == color) {
//                    this.FGsm = fgsm;
//                }
//            });
//            //loadCompFabTable(PlanCompFabricDet);
//            loadCompFabSaveTable(PlanCompFabricDetSave);
//        }
//        if (fabfillvar == 'KGSM') {
//            $.each(PlanCompFabricDet, function () {
//                if (this.Color == color) {
//                    var sn = this.snumb;
//                    this.KGsm = kgsm;

//                    $('input[id=txtPurQty]').each(function (ig) {
//                        if (fabdata[ig].snumb == sn && fabdata[ig].CompSlNo == compsno) {
//                            var row = $(this).closest('tr');
//                            row.find('#txtKnitgsm').val(kgsm);
//                        }
//                    });
//                }
//            });
//            $.each(PlanCompFabricDetSave, function () {
//                if (this.CompSlNo == compsno && this.Color == color) {
//                    this.KGsm = kgsm;
//                }
//            });
//            //loadCompFabTable(PlanCompFabricDet);
//            loadCompFabSaveTable(PlanCompFabricDetSave);
//        }
//        if (fabfillvar == 'LOOPLEN') {
//            $.each(PlanCompFabricDet, function () {
//                if (this.Color == color) {
//                    var sn = this.snumb;
//                    this.LoopLen = looplen;

//                    $('input[id=txtPurQty]').each(function (ig) {
//                        if (fabdata[ig].snumb == sn && fabdata[ig].CompSlNo == compsno) {
//                            var row = $(this).closest('tr');
//                            row.find('#txtlooplen').val(looplen);
//                        }
//                    });
//                }
//            });
//            $.each(PlanCompFabricDetSave, function () {
//                if (this.CompSlNo == compsno && this.Color == color) {
//                    this.LoopLen = looplen;
//                }
//            });
//            //loadCompFabTable(PlanCompFabricDet);
//            loadCompFabSaveTable(PlanCompFabricDetSave);
//        }
//        if (fabfillvar == 'TEXT') {
//            $.each(PlanCompFabricDet, function () {
//                if (this.Color == color) {
//                    var sn = this.snumb;
//                    this.texture = textur;

//                    $('input[id=txtPurQty]').each(function (ig) {
//                        if (fabdata[ig].snumb == sn && fabdata[ig].CompSlNo == compsno) {
//                            var row = $(this).closest('tr');
//                            row.find('#txtTexture').val(textur);
//                        }
//                    });
//                }
//            });
//            $.each(PlanCompFabricDetSave, function () {
//                if (this.CompSlNo == compsno && this.Color == color) {
//                    this.texture = textur;
//                }
//            });
//            //loadCompFabTable(PlanCompFabricDet);
//            loadCompFabSaveTable(PlanCompFabricDetSave);
//        }
//        if (fabfillvar == 'CONT') {
//            $.each(PlanCompFabricDet, function () {
//                if (this.Color == color) {
//                    var sn = this.snumb;
//                    this.content = contnt;

//                    $('input[id=txtPurQty]').each(function (ig) {
//                        if (fabdata[ig].snumb == sn && fabdata[ig].CompSlNo == compsno) {
//                            var row = $(this).closest('tr');
//                            row.find('#txtContent').val(contnt);
//                        }
//                    });
//                }
//            });
//            $.each(PlanCompFabricDetSave, function () {
//                if (this.CompSlNo == compsno && this.Color == color) {
//                    this.content = contnt;
//                }
//            });
//            //loadCompFabTable(PlanCompFabricDet);
//            loadCompFabSaveTable(PlanCompFabricDetSave);
//        }
//        if (fabfillvar == 'GUAGE') {
//            $.each(PlanCompFabricDet, function () {
//                if (this.Color == color) {
//                    var sn = this.snumb;
//                    this.guage = guage;

//                    $('input[id=txtPurQty]').each(function (ig) {
//                        if (fabdata[ig].snumb == sn && fabdata[ig].CompSlNo == compsno) {
//                            var row = $(this).closest('tr');
//                            row.find('#txtGauge').val(guage);
//                        }
//                    });
//                }
//            });
//            $.each(PlanCompFabricDetSave, function () {
//                if (this.CompSlNo == compsno && this.Color == color) {
//                    this.guage = guage;
//                }
//            });
//            //loadCompFabTable(PlanCompFabricDet);
//            loadCompFabSaveTable(PlanCompFabricDetSave);
//        }
//    }

//    //PlanYarn
//    var totalqty = 0;
//    for (var w = 0; w < PlanCompFabricDetSave.length; w++) {
//        if (PlanCompFabricDetSave[w].CompSlNo == compsno) {

//            var qty = PlanCompFabricDetSave[w].Weight;
//            totalqty = totalqty + parseFloat(qty);
//        }
//    }

//    var bcqty = 0;
//    for (var w = 0; w < PlanCompFabricDetSave.length; w++) {
//        if (PlanCompFabricDetSave[w].CompSlNo == compsno) {

//            var qty = PlanCompFabricDetSave[w].BColorPQty;
//            bcqty = bcqty + parseFloat(qty);
//        }
//    }


//    var finqty = 0;
//    for (var w = 0; w < PlanCompFabricDetSave.length; w++) {
//        if (PlanCompFabricDetSave[w].CompSlNo == compsno) {

//            var qty = PlanCompFabricDetSave[w].FColorPQty;
//            finqty = finqty + parseFloat(qty);
//        }
//    }


//    var totclrqty = parseFloat(bcqty) + parseFloat(finqty);

//}

function loadfabricfill() {
    debugger;
    //LoadingSymb();
    indexforfabfill;
    var currentrow = PlanCompFabricDet.slice(indexforfabfill);
    var compsno = currentrow[0].CompSlNo;
    var sno = currentrow[0].snumb;
    var bclrid = currentrow[0].BColorID;
    var bclr = currentrow[0].Bcolor;
    var bcqty = currentrow[0].BColorPQty;
    var fclrid = currentrow[0].FColorID;
    var fcl = currentrow[0].Fcolor;
    var fclqty = currentrow[0].FColorPQty;
    var prclid = currentrow[0].PColorID;
    var prcl = currentrow[0].PColor;
    var fgsm = currentrow[0].FGsm;
    var size = currentrow[0].Size;
    var color = currentrow[0].Color;


    var kgsm = currentrow[0].KGsm;
    var guage = currentrow[0].guage;
    var textur = currentrow[0].texture;
    var contnt = currentrow[0].content;
    var looplen = currentrow[0].LoopLen;



    var table = $('#tCPIbody').DataTable();
    var data = table.rows().data();

    var fabtable = $('#tCDbody').DataTable();
    var fabdata = fabtable.rows().data();


    var protype = $('input[name="FabType"]:checked').attr('value');
    if (protype == 'A') {
        if (fabfillvar == 'BC') {
            $.each(PlanCompFabricDet, function () {
                this.BColorID = bclrid;
                this.Bcolor = bclr;
            });
            $.each(PlanCompFabricDetSave, function () {
                if (this.CompSlNo == compsno) {
                    this.BColorID = bclrid;
                    this.Bcolor = bclr;
                }
            });
            /// loadCompFabTable(PlanCompFabricDet);
            fillfabrictbl(PlanCompFabricDet);
            loadCompFabSaveTable(PlanCompFabricDetSave);
        }
        if (fabfillvar == 'BCQT') {

            $.each(PlanCompFabricDet, function () {
                var sn = this.snumb;
                var gj = this.Weight - this.FColorPQty;
                this.BColorPQty = gj;
                $('input[id=txtPurQty]').each(function (ig) {
                    if (fabdata[ig].snumb == sn && fabdata[ig].CompSlNo == compsno) {
                        var row = $(this).closest('tr');
                        row.find('#txtPurQty').val(gj);
                    }
                });
            });
            $.each(PlanCompFabricDetSave, function () {
                if (this.CompSlNo == compsno) {
                    var gj = this.Weight - this.FColorPQty;
                    this.BColorPQty = gj;
                }
            });

            var table = $('#tCDbody').DataTable();
            var ecdata = table.rows().data();
            $('input[id=txtPurQty]').each(function (ig) {
                debugger;
                // if (ecdata[ig].snumb == (ig + 1)) {
                var row = $(this).closest('tr');
                for (var h = 0; h < PlanCompFabricDet.length; h++) {
                    if (ig == h) {
                        var BColorPQty = PlanCompFabricDet[h].BColorPQty;
                        row.find('#txtPurQty').val(BColorPQty);
                    }
                }
            });

            //loadCompFabTable(PlanCompFabricDet);
            loadCompFabSaveTable(PlanCompFabricDetSave);

            //loadCompFabTable(PlanCompFabricDet);
            loadCompFabSaveTable(PlanCompFabricDetSave);

        }
        if (fabfillvar == 'FIC') {
            $.each(PlanCompFabricDet, function () {
                this.FColorID = fclrid;
                this.Fcolor = fcl;
            });
            $.each(PlanCompFabricDetSave, function () {
                if (this.CompSlNo == compsno) {
                    this.FColorID = fclrid;
                    this.Fcolor = fcl;
                }
            });
            /// loadCompFabTable(PlanCompFabricDet);
            fillfabrictbl(PlanCompFabricDet);
            loadCompFabSaveTable(PlanCompFabricDetSave);
        }
        if (fabfillvar == 'FIQT') {
            $.each(PlanCompFabricDet, function () {
                var sn = this.snumb;
                var gj = this.Weight - this.BColorPQty;
                this.FColorPQty = gj;
                $('input[id=txtPurQty]').each(function (ig) {
                    if (fabdata[ig].snumb == sn && fabdata[ig].CompSlNo == compsno) {
                        var row = $(this).closest('tr');
                        row.find('#txtFPurQty').val(gj);
                    }
                });
            });
            $.each(PlanCompFabricDetSave, function () {
                if (this.CompSlNo == compsno) {
                    var gj = this.Weight - this.BColorPQty;
                    this.FColorPQty = gj;
                }
            });
            var table = $('#tCDbody').DataTable();
            var ecdata = table.rows().data();
            $('input[id=txtPurQty]').each(function (ig) {
                debugger;
                // if (ecdata[ig].snumb == (ig + 1)) {
                var row = $(this).closest('tr');
                for (var h = 0; h < PlanCompFabricDet.length; h++) {
                    if (ig == h) {
                        var FColorPQty = PlanCompFabricDet[h].FColorPQty;
                        row.find('#txtFPurQty').val(FColorPQty);
                    }
                }
            });

            //loadCompFabTable(PlanCompFabricDet);
            loadCompFabSaveTable(PlanCompFabricDetSave);
        }
        if (fabfillvar == 'PRC') {
            $.each(PlanCompFabricDet, function () {
                this.PColorID = prclid;
                this.PColor = prcl;
            });
            $.each(PlanCompFabricDetSave, function () {
                if (this.CompSlNo == compsno) {
                    this.PColorID = prclid;
                    this.PColor = prcl;
                }
            });
            ///loadCompFabTable(PlanCompFabricDet);
            fillfabrictbl(PlanCompFabricDet);
            loadCompFabSaveTable(PlanCompFabricDetSave);
        }
        if (fabfillvar == 'FGSM') {
            $.each(PlanCompFabricDet, function () {
                var sn = this.snumb;
                this.FGsm = fgsm;
                $('input[id=txtPurQty]').each(function (ig) {
                    if (fabdata[ig].snumb == sn && fabdata[ig].CompSlNo == compsno) {
                        var row = $(this).closest('tr');
                        row.find('#txtFGsm').val(fgsm);
                    }
                });
            });
            $.each(PlanCompFabricDetSave, function () {
                if (this.CompSlNo == compsno) {
                    this.FGsm = fgsm;
                }
            });
            var table = $('#tCDbody').DataTable();
            var ecdata = table.rows().data();
            $('input[id=txtPurQty]').each(function (ig) {
                debugger;
                // if (ecdata[ig].snumb == (ig + 1)) {
                var row = $(this).closest('tr');
                for (var h = 0; h < PlanCompFabricDet.length; h++) {
                    if (ig == h) {
                        var FGsm = PlanCompFabricDet[h].FGsm;
                        row.find('#txtFGsm').val(FGsm);
                    }
                }
            });
            //loadCompFabTable(PlanCompFabricDet);
            loadCompFabSaveTable(PlanCompFabricDetSave);
        }
        if (fabfillvar == 'KGSM') {
            var sn = this.snumb;
            this.KGsm = kgsm;
            $('input[id=txtPurQty]').each(function (ig) {
                if (fabdata[ig].snumb == sn && fabdata[ig].CompSlNo == compsno) {
                    var row = $(this).closest('tr');
                    row.find('#txtKnitgsm').val(kgsm);
                }
            });

            $.each(PlanCompFabricDetSave, function () {
                if (this.CompSlNo == compsno) {
                    this.KGsm = kgsm;
                }
            });
            var table = $('#tCDbody').DataTable();
            var ecdata = table.rows().data();
            $('input[id=txtPurQty]').each(function (ig) {
                debugger;
                // if (ecdata[ig].snumb == (ig + 1)) {
                var row = $(this).closest('tr');
                for (var h = 0; h < PlanCompFabricDet.length; h++) {
                    if (ig == h) {
                        var KGsm = PlanCompFabricDet[h].KGsm;
                        row.find('#txtKnitgsm').val(KGsm);
                    }
                }
            });
            //loadCompFabTable(PlanCompFabricDet);
            loadCompFabSaveTable(PlanCompFabricDetSave);
        }
        if (fabfillvar == 'LOOPLEN') {
            var sn = this.snumb;
            this.LoopLen = looplen;
            $('input[id=txtPurQty]').each(function (ig) {
                if (fabdata[ig].snumb == sn && fabdata[ig].CompSlNo == compsno) {
                    var row = $(this).closest('tr');
                    row.find('#txtlooplen').val(looplen);
                }
            });

            $.each(PlanCompFabricDetSave, function () {
                if (this.CompSlNo == compsno) {
                    this.LoopLen = kgsm;
                }
            });
            var table = $('#tCDbody').DataTable();
            var ecdata = table.rows().data();
            $('input[id=txtPurQty]').each(function (ig) {
                debugger;
                // if (ecdata[ig].snumb == (ig + 1)) {
                var row = $(this).closest('tr');
                for (var h = 0; h < PlanCompFabricDet.length; h++) {
                    if (ig == h) {
                        var LoopLen = PlanCompFabricDet[h].LoopLen;
                        row.find('#txtlooplen').val(LoopLen);
                    }
                }
            });
            //loadCompFabTable(PlanCompFabricDet);
            loadCompFabSaveTable(PlanCompFabricDetSave);
        }
        if (fabfillvar == 'TEXT') {
            var sn = this.snumb;
            this.texture = textur;
            $('input[id=txtPurQty]').each(function (ig) {
                if (fabdata[ig].snumb == sn && fabdata[ig].CompSlNo == compsno) {
                    var row = $(this).closest('tr');
                    row.find('#txtTexture').val(textur);
                }
            });
            var table = $('#tCDbody').DataTable();
            var ecdata = table.rows().data();
            $('input[id=txtPurQty]').each(function (ig) {
                debugger;
                // if (ecdata[ig].snumb == (ig + 1)) {
                var row = $(this).closest('tr');
                for (var h = 0; h < PlanCompFabricDet.length; h++) {
                    if (ig == h) {
                        var texture = PlanCompFabricDet[h].texture;
                        row.find('#txtTexture').val(texture);
                    }
                }
            });

            $.each(PlanCompFabricDetSave, function () {
                if (this.CompSlNo == compsno) {
                    this.texture = textur;
                }
            });


            //loadCompFabTable(PlanCompFabricDet);
            loadCompFabSaveTable(PlanCompFabricDetSave);
        }
        if (fabfillvar == 'CONT') {
            var sn = this.snumb;
            this.content = contnt;
            $('input[id=txtPurQty]').each(function (ig) {
                if (fabdata[ig].snumb == sn && fabdata[ig].CompSlNo == compsno) {
                    var row = $(this).closest('tr');
                    row.find('#txtContent').val(contnt);
                }
            });

            $.each(PlanCompFabricDetSave, function () {
                if (this.CompSlNo == compsno) {
                    this.content = contnt;
                }
            });
            var table = $('#tCDbody').DataTable();
            var ecdata = table.rows().data();
            $('input[id=txtPurQty]').each(function (ig) {
                debugger;
                // if (ecdata[ig].snumb == (ig + 1)) {
                var row = $(this).closest('tr');
                for (var h = 0; h < PlanCompFabricDet.length; h++) {
                    if (ig == h) {
                        var content = PlanCompFabricDet[h].content;
                        row.find('#txtContent').val(content);
                    }
                }
            });


            //loadCompFabTable(PlanCompFabricDet);
            loadCompFabSaveTable(PlanCompFabricDetSave);
        }
        if (fabfillvar == 'GUAGE') {
            var sn = this.snumb;
            this.guage = guage;
            $('input[id=txtPurQty]').each(function (ig) {
                if (fabdata[ig].snumb == sn && fabdata[ig].CompSlNo == compsno) {
                    var row = $(this).closest('tr');
                    row.find('#txtGauge').val(guage);
                }
            });

            $.each(PlanCompFabricDetSave, function () {
                if (this.CompSlNo == compsno) {
                    this.guage = guage;
                }
            });
            var table = $('#tCDbody').DataTable();
            var ecdata = table.rows().data();
            $('input[id=txtPurQty]').each(function (ig) {
                debugger;
                // if (ecdata[ig].snumb == (ig + 1)) {
                var row = $(this).closest('tr');
                for (var h = 0; h < PlanCompFabricDet.length; h++) {
                    if (ig == h) {
                        var guage = PlanCompFabricDet[h].guage;
                        row.find('#txtGauge').val(guage);
                    }
                }
            });
            //loadCompFabTable(PlanCompFabricDet);
            loadCompFabSaveTable(PlanCompFabricDetSave);
        }
    }
    if (protype == 'S') {
        if (fabfillvar == 'BC') {
            $.each(PlanCompFabricDet, function () {
                if (this.Size == size) {
                    this.BColorID = bclrid;
                    this.Bcolor = bclr;
                }
            });
            $.each(PlanCompFabricDetSave, function () {
                if (this.CompSlNo == compsno && this.Size == size) {
                    this.BColorID = bclrid;
                    this.Bcolor = bclr;
                }
            });
            /// loadCompFabTable(PlanCompFabricDet);
            fillfabrictbl(PlanCompFabricDet);
            loadCompFabSaveTable(PlanCompFabricDetSave);
        }
        if (fabfillvar == 'BCQT') {
            $.each(PlanCompFabricDet, function () {
                if (this.Size == size) {

                    var sn = this.snumb;
                    var gj = this.Weight - this.FColorPQty;
                    gj.toFixed(3);
                    this.BColorPQty = gj;
                    $('input[id=txtPurQty]').each(function (ig) {
                        if (fabdata[ig].snumb == sn && fabdata[ig].CompSlNo == compsno) {
                            var row = $(this).closest('tr');
                            row.find('#txtPurQty').val(gj);
                        }
                    });
                }
            });
            $.each(PlanCompFabricDetSave, function () {
                if (this.CompSlNo == compsno && this.Size == size) {
                    var gj = this.Weight - this.FColorPQty;
                    this.BColorPQty = gj;
                }
            });

            //loadCompFabTable(PlanCompFabricDet);
            loadCompFabSaveTable(PlanCompFabricDetSave);
        }
        if (fabfillvar == 'FIC') {
            $.each(PlanCompFabricDet, function () {
                if (this.Size == size) {
                    this.FColorID = fclrid;
                    this.Fcolor = fcl;
                }
            });
            $.each(PlanCompFabricDetSave, function () {
                if (this.CompSlNo == compsno && this.Size == size) {
                    this.FColorID = fclrid;
                    this.Fcolor = fcl;
                }
            });
            ///loadCompFabTable(PlanCompFabricDet);
            fillfabrictbl(PlanCompFabricDet);
            loadCompFabSaveTable(PlanCompFabricDetSave);
        }
        if (fabfillvar == 'FIQT') {
            $.each(PlanCompFabricDet, function () {
                if (this.Size == size) {

                    var sn = this.snumb;
                    var gj = this.Weight - this.BColorPQty;
                    gj.toFixed(3);
                    this.FColorPQty = gj;

                    $('input[id=txtPurQty]').each(function (ig) {
                        if (fabdata[ig].snumb == sn && fabdata[ig].CompSlNo == compsno) {
                            var row = $(this).closest('tr');
                            row.find('#txtFPurQty').val(gj);
                        }
                    });
                }
            });
            $.each(PlanCompFabricDetSave, function () {
                if (this.CompSlNo == compsno && this.Size == size) {
                    var gj = this.Weight - this.BColorPQty;
                    this.FColorPQty = gj;
                }
            });
            ///loadCompFabTable(PlanCompFabricDet);
            fillfabrictbl(PlanCompFabricDet);
            loadCompFabSaveTable(PlanCompFabricDetSave);
        }
        if (fabfillvar == 'PRC') {
            $.each(PlanCompFabricDet, function () {
                if (this.Size == size) {
                    this.PColorID = prclid;
                    this.PColor = prcl;
                }
            });
            $.each(PlanCompFabricDetSave, function () {
                if (this.CompSlNo == compsno && this.Size == size) {
                    this.PColorID = prclid;
                    this.PColor = prcl;
                }
            });
            ///loadCompFabTable(PlanCompFabricDet);
            fillfabrictbl(PlanCompFabricDet);
            loadCompFabSaveTable(PlanCompFabricDetSave);
        }
        if (fabfillvar == 'FGSM') {
            $.each(PlanCompFabricDet, function () {
                if (this.Size == size) {
                    var sn = this.snumb;
                    this.FGsm = fgsm;

                    $('input[id=txtPurQty]').each(function (ig) {
                        if (fabdata[ig].snumb == sn && fabdata[ig].CompSlNo == compsno) {
                            var row = $(this).closest('tr');
                            row.find('#txtFGsm').val(fgsm);
                        }
                    });
                }
            });
            $.each(PlanCompFabricDetSave, function () {
                if (this.CompSlNo == compsno && this.Size == size) {
                    this.FGsm = fgsm;
                }
            });
            var table = $('#tCDbody').DataTable();
            var ecdata = table.rows().data();
            $('input[id=txtPurQty]').each(function (ig) {
                debugger;
                // if (ecdata[ig].snumb == (ig + 1)) {
                var row = $(this).closest('tr');
                for (var h = 0; h < PlanCompFabricDet.length; h++) {
                    if (ig == h) {
                        var FGsm = PlanCompFabricDet[h].FGsm;
                        row.find('#txtFGsm').val(FGsm);
                    }
                }
            });
            //loadCompFabTable(PlanCompFabricDet);
            loadCompFabSaveTable(PlanCompFabricDetSave);
        }
        if (fabfillvar == 'KGSM') {
            $.each(PlanCompFabricDet, function () {
                if (this.Size == size) {
                    var sn = this.snumb;
                    this.KGsm = kgsm;

                    $('input[id=txtPurQty]').each(function (ig) {
                        if (fabdata[ig].snumb == sn && fabdata[ig].CompSlNo == compsno) {
                            var row = $(this).closest('tr');
                            row.find('#txtKnitgsm').val(kgsm);
                        }
                    });
                }
            });
            $.each(PlanCompFabricDetSave, function () {
                if (this.CompSlNo == compsno && this.Size == size) {
                    this.KGsm = kgsm;
                }
            });
            var table = $('#tCDbody').DataTable();
            var ecdata = table.rows().data();
            $('input[id=txtPurQty]').each(function (ig) {
                debugger;
                // if (ecdata[ig].snumb == (ig + 1)) {
                var row = $(this).closest('tr');
                for (var h = 0; h < PlanCompFabricDet.length; h++) {
                    if (ig == h) {
                        var KGsm = PlanCompFabricDet[h].KGsm;
                        row.find('#txtKnitgsm').val(KGsm);
                    }
                }
            });
            //loadCompFabTable(PlanCompFabricDet);
            loadCompFabSaveTable(PlanCompFabricDetSave);
        }
        if (fabfillvar == 'LOOPLEN') {
            $.each(PlanCompFabricDet, function () {
                if (this.Size == size) {
                    var sn = this.snumb;
                    this.LoopLen = looplen;

                    $('input[id=txtPurQty]').each(function (ig) {
                        if (fabdata[ig].snumb == sn && fabdata[ig].CompSlNo == compsno) {
                            var row = $(this).closest('tr');
                            row.find('#txtlooplen').val(looplen);
                        }
                    });
                }
            });
            $.each(PlanCompFabricDetSave, function () {
                if (this.CompSlNo == compsno && this.Size == size) {
                    this.LoopLen = looplen;
                }
            });
            var table = $('#tCDbody').DataTable();
            var ecdata = table.rows().data();
            $('input[id=txtPurQty]').each(function (ig) {
                debugger;
                // if (ecdata[ig].snumb == (ig + 1)) {
                var row = $(this).closest('tr');
                for (var h = 0; h < PlanCompFabricDet.length; h++) {
                    if (ig == h) {
                        var LoopLen = PlanCompFabricDet[h].LoopLen;
                        row.find('#txtlooplen').val(LoopLen);
                    }
                }
            });
            //loadCompFabTable(PlanCompFabricDet);
            loadCompFabSaveTable(PlanCompFabricDetSave);
        }
        if (fabfillvar == 'TEXT') {
            $.each(PlanCompFabricDet, function () {
                if (this.Size == size) {
                    var sn = this.snumb;
                    this.texture = textur;

                    $('input[id=txtPurQty]').each(function (ig) {
                        if (fabdata[ig].snumb == sn && fabdata[ig].CompSlNo == compsno) {
                            var row = $(this).closest('tr');
                            row.find('#txtTexture').val(textur);
                        }
                    });
                }
            });
            var table = $('#tCDbody').DataTable();
            var ecdata = table.rows().data();
            $('input[id=txtPurQty]').each(function (ig) {
                debugger;
                // if (ecdata[ig].snumb == (ig + 1)) {
                var row = $(this).closest('tr');
                for (var h = 0; h < PlanCompFabricDet.length; h++) {
                    if (ig == h) {
                        var texture = PlanCompFabricDet[h].texture;
                        row.find('#txtTexture').val(texture);
                    }
                }
            });

            $.each(PlanCompFabricDetSave, function () {
                if (this.CompSlNo == compsno && this.Size == size) {
                    this.texture = textur;
                }
            });
            //loadCompFabTable(PlanCompFabricDet);
            loadCompFabSaveTable(PlanCompFabricDetSave);
        }
        if (fabfillvar == 'CONT') {
            $.each(PlanCompFabricDet, function () {
                if (this.Size == size) {
                    var sn = this.snumb;
                    this.content = contnt;

                    $('input[id=txtPurQty]').each(function (ig) {
                        if (fabdata[ig].snumb == sn && fabdata[ig].CompSlNo == compsno) {
                            var row = $(this).closest('tr');
                            row.find('#txtContent').val(contnt);
                        }
                    });
                }
            });

            var table = $('#tCDbody').DataTable();
            var ecdata = table.rows().data();
            $('input[id=txtPurQty]').each(function (ig) {
                debugger;
                // if (ecdata[ig].snumb == (ig + 1)) {
                var row = $(this).closest('tr');
                for (var h = 0; h < PlanCompFabricDet.length; h++) {
                    if (ig == h) {
                        var content = PlanCompFabricDet[h].content;
                        row.find('#txtContent').val(content);
                    }
                }
            });
            $.each(PlanCompFabricDetSave, function () {
                if (this.CompSlNo == compsno && this.Size == size) {
                    this.content = contnt;
                }
            });
            //loadCompFabTable(PlanCompFabricDet);
            loadCompFabSaveTable(PlanCompFabricDetSave);
        }
        if (fabfillvar == 'GUAGE') {
            $.each(PlanCompFabricDet, function () {
                if (this.Size == size) {
                    var sn = this.snumb;
                    this.guage = guage;

                    $('input[id=txtPurQty]').each(function (ig) {
                        if (fabdata[ig].snumb == sn && fabdata[ig].CompSlNo == compsno) {
                            var row = $(this).closest('tr');
                            row.find('#txtGauge').val(guage);
                        }
                    });
                }
            });
            $.each(PlanCompFabricDetSave, function () {
                if (this.CompSlNo == compsno && this.Size == size) {
                    this.guage = guage;
                }
            });
            var table = $('#tCDbody').DataTable();
            var ecdata = table.rows().data();
            $('input[id=txtPurQty]').each(function (ig) {
                debugger;
                // if (ecdata[ig].snumb == (ig + 1)) {
                var row = $(this).closest('tr');
                for (var h = 0; h < PlanCompFabricDet.length; h++) {
                    if (ig == h) {
                        var guage = PlanCompFabricDet[h].guage;
                        row.find('#txtGauge').val(guage);
                    }
                }
            });
            //loadCompFabTable(PlanCompFabricDet);
            loadCompFabSaveTable(PlanCompFabricDetSave);
        }

    }
    if (protype == 'C') {
        if (fabfillvar == 'BC') {
            $.each(PlanCompFabricDet, function () {
                if (this.Color == color) {
                    this.BColorID = bclrid;
                    this.Bcolor = bclr;
                }
            });
            $.each(PlanCompFabricDetSave, function () {
                if (this.CompSlNo == compsno && this.Color == color) {
                    this.BColorID = bclrid;
                    this.Bcolor = bclr;
                }
            });
            /// loadCompFabTable(PlanCompFabricDet);
            fillfabrictbl(PlanCompFabricDet);
            loadCompFabSaveTable(PlanCompFabricDetSave);
        }
        if (fabfillvar == 'BCQT') {
            $.each(PlanCompFabricDet, function () {
                if (this.Color == color) {

                    var sn = this.snumb;
                    var gj = this.Weight - this.FColorPQty;
                    gj.toFixed(3);
                    this.BColorPQty = gj;
                    $('input[id=txtPurQty]').each(function (ig) {
                        if (fabdata[ig].snumb == sn && fabdata[ig].CompSlNo == compsno) {
                            var row = $(this).closest('tr');
                            row.find('#txtPurQty').val(gj);
                        }
                    });
                }
            });
            $.each(PlanCompFabricDetSave, function () {
                if (this.CompSlNo == compsno && this.Color == color) {
                    var gj = this.Weight - this.FColorPQty;
                    this.BColorPQty = gj;
                }
            });
            //loadCompFabTable(PlanCompFabricDet);
            loadCompFabSaveTable(PlanCompFabricDetSave);
        }
        if (fabfillvar == 'FIC') {
            $.each(PlanCompFabricDet, function () {
                if (this.Color == color) {
                    this.FColorID = fclrid;
                    this.Fcolor = fcl;
                }
            });
            $.each(PlanCompFabricDetSave, function () {
                if (this.CompSlNo == compsno && this.Color == color) {
                    this.FColorID = fclrid;
                    this.Fcolor = fcl;
                }
            });
            ///loadCompFabTable(PlanCompFabricDet);
            fillfabrictbl(PlanCompFabricDet);
            loadCompFabSaveTable(PlanCompFabricDetSave);
        }
        if (fabfillvar == 'FIQT') {
            $.each(PlanCompFabricDet, function () {
                if (this.Color == color) {

                    var sn = this.snumb;
                    var gj = this.Weight - this.BColorPQty;
                    gj.toFixed(3);
                    this.FColorPQty = gj;

                    $('input[id=txtPurQty]').each(function (ig) {
                        if (fabdata[ig].snumb == sn && fabdata[ig].CompSlNo == compsno) {
                            var row = $(this).closest('tr');
                            row.find('#txtFPurQty').val(gj);
                        }
                    });
                }
            });
            $.each(PlanCompFabricDetSave, function () {
                if (this.CompSlNo == compsno && this.Color == color) {
                    var gj = this.Weight - this.BColorPQty;
                    this.FColorPQty = gj;
                }
            });
            ///loadCompFabTable(PlanCompFabricDet);
            fillfabrictbl(PlanCompFabricDet);
            loadCompFabSaveTable(PlanCompFabricDetSave);
        }
        if (fabfillvar == 'PRC') {
            $.each(PlanCompFabricDet, function () {
                if (this.Color == color) {
                    this.PColorID = prclid;
                    this.PColor = prcl;
                }
            });
            $.each(PlanCompFabricDetSave, function () {
                if (this.CompSlNo == compsno && this.Color == color) {
                    this.PColorID = prclid;
                    this.PColor = prcl;
                }
            });
            ///loadCompFabTable(PlanCompFabricDet);
            fillfabrictbl(PlanCompFabricDet);
            loadCompFabSaveTable(PlanCompFabricDetSave);
        }
        if (fabfillvar == 'FGSM') {
            $.each(PlanCompFabricDet, function () {
                if (this.Color == color) {
                    var sn = this.snumb;
                    this.FGsm = fgsm;

                    $('input[id=txtPurQty]').each(function (ig) {
                        if (fabdata[ig].snumb == sn && fabdata[ig].CompSlNo == compsno) {
                            var row = $(this).closest('tr');
                            row.find('#txtFGsm').val(fgsm);
                        }
                    });
                }
            });
            $.each(PlanCompFabricDetSave, function () {
                if (this.CompSlNo == compsno && this.Color == color) {
                    this.FGsm = fgsm;
                }
            });
            var table = $('#tCDbody').DataTable();
            var ecdata = table.rows().data();
            $('input[id=txtPurQty]').each(function (ig) {
                debugger;
                // if (ecdata[ig].snumb == (ig + 1)) {
                var row = $(this).closest('tr');
                for (var h = 0; h < PlanCompFabricDet.length; h++) {
                    if (ig == h) {
                        var FGsm = PlanCompFabricDet[h].FGsm;
                        row.find('#txtFGsm').val(FGsm);
                    }
                }
            });
            //loadCompFabTable(PlanCompFabricDet);
            loadCompFabSaveTable(PlanCompFabricDetSave);
        }
        if (fabfillvar == 'KGSM') {
            $.each(PlanCompFabricDet, function () {
                if (this.Color == color) {
                    var sn = this.snumb;
                    this.KGsm = kgsm;

                    $('input[id=txtPurQty]').each(function (ig) {
                        if (fabdata[ig].snumb == sn && fabdata[ig].CompSlNo == compsno) {
                            var row = $(this).closest('tr');
                            row.find('#txtKnitgsm').val(kgsm);
                        }
                    });
                }
            });
            $.each(PlanCompFabricDetSave, function () {
                if (this.CompSlNo == compsno && this.Color == color) {
                    this.KGsm = kgsm;
                }
            });
            var table = $('#tCDbody').DataTable();
            var ecdata = table.rows().data();
            $('input[id=txtPurQty]').each(function (ig) {
                debugger;
                // if (ecdata[ig].snumb == (ig + 1)) {
                var row = $(this).closest('tr');
                for (var h = 0; h < PlanCompFabricDet.length; h++) {
                    if (ig == h) {
                        var KGsm = PlanCompFabricDet[h].KGsm;
                        row.find('#txtKnitgsm').val(KGsm);
                    }
                }
            });
            //loadCompFabTable(PlanCompFabricDet);
            loadCompFabSaveTable(PlanCompFabricDetSave);
        }
        if (fabfillvar == 'LOOPLEN') {
            $.each(PlanCompFabricDet, function () {
                if (this.Color == color) {
                    var sn = this.snumb;
                    this.LoopLen = looplen;

                    $('input[id=txtPurQty]').each(function (ig) {
                        if (fabdata[ig].snumb == sn && fabdata[ig].CompSlNo == compsno) {
                            var row = $(this).closest('tr');
                            row.find('#txtlooplen').val(looplen);
                        }
                    });
                }
            });
            $.each(PlanCompFabricDetSave, function () {
                if (this.CompSlNo == compsno && this.Color == color) {
                    this.LoopLen = looplen;
                }
            });
            var table = $('#tCDbody').DataTable();
            var ecdata = table.rows().data();
            $('input[id=txtPurQty]').each(function (ig) {
                debugger;
                // if (ecdata[ig].snumb == (ig + 1)) {
                var row = $(this).closest('tr');
                for (var h = 0; h < PlanCompFabricDet.length; h++) {
                    if (ig == h) {
                        var LoopLen = PlanCompFabricDet[h].LoopLen;
                        row.find('#txtlooplen').val(LoopLen);
                    }
                }
            });
            //loadCompFabTable(PlanCompFabricDet);
            loadCompFabSaveTable(PlanCompFabricDetSave);
        }
        if (fabfillvar == 'TEXT') {
            $.each(PlanCompFabricDet, function () {
                if (this.Color == color) {
                    var sn = this.snumb;
                    this.texture = textur;

                    $('input[id=txtPurQty]').each(function (ig) {
                        if (fabdata[ig].snumb == sn && fabdata[ig].CompSlNo == compsno) {
                            var row = $(this).closest('tr');
                            row.find('#txtTexture').val(textur);
                        }
                    });
                }
            });
            var table = $('#tCDbody').DataTable();
            var ecdata = table.rows().data();
            $('input[id=txtPurQty]').each(function (ig) {
                debugger;
                // if (ecdata[ig].snumb == (ig + 1)) {
                var row = $(this).closest('tr');
                for (var h = 0; h < PlanCompFabricDet.length; h++) {
                    if (ig == h) {
                        var texture = PlanCompFabricDet[h].texture;
                        row.find('#txtTexture').val(texture);
                    }
                }
            });
            $.each(PlanCompFabricDetSave, function () {
                if (this.CompSlNo == compsno && this.Color == color) {
                    this.texture = textur;
                }
            });
            //loadCompFabTable(PlanCompFabricDet);
            loadCompFabSaveTable(PlanCompFabricDetSave);
        }
        if (fabfillvar == 'CONT') {
            $.each(PlanCompFabricDet, function () {
                if (this.Color == color) {
                    var sn = this.snumb;
                    this.content = contnt;

                    $('input[id=txtPurQty]').each(function (ig) {
                        if (fabdata[ig].snumb == sn && fabdata[ig].CompSlNo == compsno) {
                            var row = $(this).closest('tr');
                            row.find('#txtContent').val(contnt);
                        }
                    });
                }
            });
            var table = $('#tCDbody').DataTable();
            var ecdata = table.rows().data();
            $('input[id=txtPurQty]').each(function (ig) {
                debugger;
                // if (ecdata[ig].snumb == (ig + 1)) {
                var row = $(this).closest('tr');
                for (var h = 0; h < PlanCompFabricDet.length; h++) {
                    if (ig == h) {
                        var content = PlanCompFabricDet[h].content;
                        row.find('#txtContent').val(content);
                    }
                }
            });
            $.each(PlanCompFabricDetSave, function () {
                if (this.CompSlNo == compsno && this.Color == color) {
                    this.content = contnt;
                }
            });
            //loadCompFabTable(PlanCompFabricDet);
            loadCompFabSaveTable(PlanCompFabricDetSave);
        }
        if (fabfillvar == 'GUAGE') {
            $.each(PlanCompFabricDet, function () {
                if (this.Color == color) {
                    var sn = this.snumb;
                    this.guage = guage;

                    $('input[id=txtPurQty]').each(function (ig) {
                        if (fabdata[ig].snumb == sn && fabdata[ig].CompSlNo == compsno) {
                            var row = $(this).closest('tr');
                            row.find('#txtGauge').val(guage);
                        }
                    });
                }
            });
            $.each(PlanCompFabricDetSave, function () {
                if (this.CompSlNo == compsno && this.Color == color) {
                    this.guage = guage;
                }
            });
            var table = $('#tCDbody').DataTable();
            var ecdata = table.rows().data();
            $('input[id=txtPurQty]').each(function (ig) {
                debugger;
                // if (ecdata[ig].snumb == (ig + 1)) {
                var row = $(this).closest('tr');
                for (var h = 0; h < PlanCompFabricDet.length; h++) {
                    if (ig == h) {
                        var guage = PlanCompFabricDet[h].guage;
                        row.find('#txtGauge').val(guage);
                    }
                }
            });
            //loadCompFabTable(PlanCompFabricDet);
            loadCompFabSaveTable(PlanCompFabricDetSave);
        }
    }

    //PlanYarn
    var totalqty = 0;
    for (var w = 0; w < PlanCompFabricDetSave.length; w++) {
        if (PlanCompFabricDetSave[w].CompSlNo == compsno) {

            var qty = PlanCompFabricDetSave[w].Weight;
            totalqty = totalqty + parseFloat(qty);
        }
    }

    var bcqty = 0;
    for (var w = 0; w < PlanCompFabricDetSave.length; w++) {
        if (PlanCompFabricDetSave[w].CompSlNo == compsno) {

            var qty = PlanCompFabricDetSave[w].BColorPQty;
            bcqty = bcqty + parseFloat(qty);
        }
    }
    var finqty = 0;
    for (var w = 0; w < PlanCompFabricDetSave.length; w++) {
        if (PlanCompFabricDetSave[w].CompSlNo == compsno) {

            var qty = PlanCompFabricDetSave[w].FColorPQty;
            finqty = finqty + parseFloat(qty);
        }
    }
    var totclrqty = parseFloat(bcqty) + parseFloat(finqty);
}


function fillfabrictbl(PlanCompFabricDet) {

    debugger;

    var table = $('#tCDbody').DataTable();
    var ecdata = table.rows().data();
    debugger;
    $('input[id=txtPurQty]').each(function (ig) {
        debugger;
        // if (ecdata[ig].snumb == (ig + 1)) {
        var row = $(this).closest('tr');

        for (var h = 0; h < PlanCompFabricDet.length; h++) {
            if (ig == h) {
                var snumb = PlanCompFabricDet[h].snumb;
                var FPlanId = PlanCompFabricDet[h].FPlanId;
                var ColorID = PlanCompFabricDet[h].ColorID;
                var Color = PlanCompFabricDet[h].Color;
                var SizeId = PlanCompFabricDet[h].SizeId;
                var Size = PlanCompFabricDet[h].Size;
                var Prdn_Qty = PlanCompFabricDet[h].Prdn_Qty;
                var ActWeight = PlanCompFabricDet[h].ActWeight;
                var Weight = PlanCompFabricDet[h].Weight;
                var Grammage = PlanCompFabricDet[h].Grammage;
                var FabricID = PlanCompFabricDet[h].FabricID;

                var GreyWidthID = PlanCompFabricDet[h].GreyWidthID;
                var FinishWidthID = PlanCompFabricDet[h].FinishWidthID;
                var FabricType = PlanCompFabricDet[h].FabricType;
                var PlanID = PlanCompFabricDet[h].PlanID;
                var CompSlNo = PlanCompFabricDet[h].CompSlNo;
                var Bcolor = PlanCompFabricDet[h].Bcolor;
                var BColorPQty = PlanCompFabricDet[h].BColorPQty;
                var Fcolor = PlanCompFabricDet[h].Fcolor;
                var FColorPQty = PlanCompFabricDet[h].FColorPQty;
                var PColor = PlanCompFabricDet[h].PColor;
                var FGsm = PlanCompFabricDet[h].FGsm;

                var KGsm = PlanCompFabricDet[h].KGsm;
                var LoopLen = PlanCompFabricDet[h].LoopLen;
                var texture = PlanCompFabricDet[h].texture;
                var content = PlanCompFabricDet[h].content;
                var guage = PlanCompFabricDet[h].guage;

                //if (comsn == CompSlNo) {


                //row.find('#txtsnumb').val(snumb);
                row.find('#txtColor').val(Color);
                row.find('#txtSize').val(Size);
                row.find('#txtfabPrdQty').val(Prdn_Qty);
                row.find('#txtfabActwt').val(ActWeight);
                row.find('#txtfabwt').val(Weight);
                row.find('#txtPurQty').val(BColorPQty);
                row.find('#txtFPurQty').val(FColorPQty);
                row.find('#txtFGsm').val(FGsm);
                row.find('#txtKnitgsm').val(KGsm);
                row.find('#txtlooplen').val(LoopLen);
                row.find('#txtTexture').val(texture);
                row.find('#txtContent').val(content);
                row.find('#txtGauge').val(guage);
                if (PColor == null) {
                    PColor = '--Select--';
                }
                // row.find('#ddlBColor option:selected').text(Bcolor);
                $.each(BaseColorlist, function (k, v) {
                    var id = 0;
                    if (Bcolor === v.Color) {
                        id = v.ColorID
                        row.find('#ddlBColor').val(id);
                    }

                });
                // row.find('#ddlFColor option:selected').text(Fcolor);
                $.each(FinishColorlist, function (k, v) {
                    var id = 0;
                    if (Fcolor === v.Color) {
                        id = v.ColorID
                        row.find('#ddlFColor').val(id);
                    }

                });
                // row.find('#ddlPColor option:selected').text(PColor);
                $.each(PrintColorlist, function (k, v) {
                    var id = 0;
                    if (PColor === v.Color) {
                        id = v.ColorID
                        row.find('#ddlPColor').val(id);
                    }

                });

            }
        }
        // }
    });



}


function Entrystatus(PlanOrderNo, Styleid, Itmid) {
    debugger;
    $.ajax({
        url: "/PlanningConsumption/LoadEntrystatus",
        data: JSON.stringify({ Ordno: PlanOrderNo, Styleid: Styleid, Itmid: Itmid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;

            if (result.Value.length > 0) {
                Cplan = result.Value[0].Con_Plan;
                Yplan = result.Value[0].Yarn_Plan;
                Fplan = result.Value[0].Fabric_Plan;
                PLID = result.Value[0].PlanID;
            }

            if (Fplan == 'E' && Mod == "1") {

                if (fcompno == 0) {
                    fcompno = 1;
                } else {
                    fcompno == fcompno;
                }
                EditCompFabricLossPlanList(PLID, fcompno);


            }

        },
        failure: function (errMsg) {
            alert(errMsg);
        }

    });
}

function EditCompFabricLossPlanList(PlId, CompNo) {


    $.ajax({
        url: "/PlanningConsumption/ListCompFabricLossDetails",
        data: JSON.stringify({ PlanID: PlId, CNo: CompNo }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {


            PlanLossSave = result;
            if (PlanLossSave.length == 0) {
                $('#FabricLossId').hide();
            }
            PlanLoss = $.grep(PlanLossSave, function (e) {
                return e.CompSNo == CompSlNo;
            });
            debugger;
            loadFabricLossTable(PlanLoss);
            loadFabricLossSaveTable(PlanLossSave);
            if (Fplan == "N") {
            } else {
                Loadtotfabriceditdet(PLID);
                var FID = 0;
                LoadPlanFabric(PLID);
                ListYarnEditDetDetails(PLID);
                EditDetPlanYarnDyeingList(PLID, ItemId, FID, StyleRowID);
            }
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });


}

function EditDetPlanYarnDyeingList(PlanID, ItemID, FabricID, StyleRowID) {

    $.ajax({
        url: "/PlanningConsumption/ListYarnDyeingEditDetails",
        data: JSON.stringify({ PlId: PlanID, ItemID: ItemID, FabricID: FabricID, StyleRowID: StyleRowID }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;

            PlanYarnDyeingSave = result;
            loadYarnDyeAddTableSave(PlanYarnDyeingSave);

            var ycolorempty = [];
            ycolorempty = PlanYarnDetSave;

            if (PlanYarnDetSave.length > 0 && PlanYarnDyeingSave.length > 0) {
                for (var i = 0; PlanYarnDetSave.length > i; i++) {

                    for (var j = 0; PlanYarnDyeingSave.length > j; j++) {

                        if (PlanYarnDetSave[i].SlNo == PlanYarnDyeingSave[j].YDSlNo) {

                            PlanYarnDyeingSave[j].ActWeight = PlanYarnDetSave[i].Knit_In_Qty;
                            var actwt = PlanYarnDyeingSave[j].ActWeight;
                            var val = PlanYarnDyeingSave[j].Qty_Per;
                            var wt = parseFloat((val * actwt) / 100);
                            PlanYarnDyeingSave[j].Weight = wt;
                        }
                    }
                }
            }

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });


}
function loadYarnDyeAddTableSave(list) {

    // $('#tFYDbodySave').DataTable().destroy();
    var inputcount = 0;
    $('#tFYDbodySave tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tFYDbodySave').DataTable().destroy();
    }
    $('#tFYDbodySave').empty();

    $('#tFYDbodySave').DataTable({
        data: list,
        columns: [

            { title: "YPlanDetID", data: "YPlanDetID" },
            { title: "Sl No", data: "SlNo" },
             { title: "CompSlNo", data: "CompSlNo" },
            { title: "Garment_ColorID", data: "Garment_ColorID" },
            { title: "Garment Color", data: "GColor" },
            { title: "Weight(Kgs)", data: "ActWeight" },
            { title: "Yarn_DyeColorID", data: "CColorID" },
            { title: "Dyeing Color", data: "CColor" },
            { title: "%", data: "Qty_Per" },
            { title: "Weight(Kgs)", data: "Weight" },
            { title: "Purchase(Kgs)", data: "Purchase_Qty" },
            { title: "Courses", data: "Courses" },
            { title: "YDSlNo", data: "YDSlNo" },
            { title: "YPlanDyeID", data: "YPlanDyeID" },


        ]
    });

}

function Loadtotfabriceditdet(PlId) {

    $.ajax({
        url: "/PlanningConsumption/ListConFabricEdittotDetails",
        data: JSON.stringify({ PlanID: PlId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result;
            if (BaseColorlist.length > 0 && BaseColorlist != undefined) {
                for (var f = 0; f < obj.length; f++) {
                    var fid = obj[f].FabricID;
                    for (var n = 0; n < compList.length; n++) {
                        if (compList[n].FabricID == fid) {
                            obj[f].Fabric = compList[n].FabricName;
                        }
                    }
                }
                for (var c = 0; c < obj.length; c++) {
                    var bcl = obj[c].BColorID;
                    for (var n = 0; n < BaseColorlist.length; n++) {
                        if (BaseColorlist[n].ColorID == bcl) {
                            obj[c].Bcolor = BaseColorlist[n].Color;
                        }
                    }
                }


                for (var t = 0; t < obj.length; t++) {
                    var fci = obj[t].FColorID;
                    for (var n = 0; n < FinishColorlist.length; n++) {
                        if (FinishColorlist[n].ColorID == fci) {
                            obj[t].Fcolor = FinishColorlist[n].Color;
                        }
                    }
                }


                for (var e = 0; e < obj.length; e++) {
                    if (obj[e].BColorID == 0) {
                        obj[e].BColorID = bcid;
                        obj[e].Bcolor = bc;
                    }
                }

                PlanCompFabricDetSave = obj;
                chklist = PlanCompFabricDetSave;
                var totconwgt = 0;
                for (i = 0; chklist.length > i; i++) {
                    totconwgt = totconwgt + chklist[i].Weight;
                }
                var diffsno = 0;
                var chksno = 0;
                for (i = 0; PlanCompFabricDetSave.length > i; i++) {
                    diffsno = PlanCompFabricDetSave[i].CompSlNo;
                    if (diffsno > 0 && diffsno != chksno) {
                        fcompno = PlanCompFabricDetSave[i].CompSlNo;
                        loadfillloss();
                    }
                    chksno = diffsno;
                }


                var totfabwgt = 0;

                for (j = 0; PlanCompFabricDetSave.length > j; j++) {
                    totfabwgt = totfabwgt + PlanCompFabricDetSave[j].Weight;
                }

                if (Math.round(totconwgt) != Math.round(totfabwgt)) {
                    $('#profile-tab1').attr('style', 'background-color : #acf2c1');
                    $('#profile-tab2').attr('style', 'background-color : #acf2c1');
                }


                loadCompFabSaveTable(PlanCompFabricDetSave);
                fcompno = CompSlNo;
                PlanCompFabricDet = $.grep(PlanCompFabricDetSave, function (v) {
                    return (v.CompSlNo == CompSlNo);
                });

                $('#txtFabShow').val(PlanCompFabricDet[0]['Fabric']);
                $('#txtFinishShow').val(PlanCompFabricDet[0]['FinishWidth']);
                $('#txtGreyShow').val(PlanCompFabricDet[0]['GreyWidth']);
                //PlanCompFabricDet = color;
                loadCompFabTable(PlanCompFabricDet);
                if (PlanCompFabricDet.length > 0) {
                    Fplid = PlanCompFabricDet[0].FPlanId;
                }
                if (PlanCompFabricDetSave.length > 0) {

                    LoadPlanFabric(PLID);
                }
            }
            LoadPlanFabric(PLID);
            ListYarnEditDetDetails(PLID);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function ListYarnEditDetDetails(PlId) {
    debugger;
    $.ajax({
        url: "/PlanningConsumption/ListYarnEditDetDetails",
        data: JSON.stringify({ PlanID: PlId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            PlanYarnDetSave = result;

            var totyarnwgt = 0;
            var totfabwgt = 0;
            var totfabbwgt = 0;
            var totfabFwgt = 0;
            for (i = 0; PlanYarnDetSave.length > i; i++) {
                totyarnwgt = totyarnwgt + PlanYarnDetSave[i].Knit_In_Qty;
            }
            for (j = 0; PlanCompFabricDetSave.length > j; j++) {
                totfabwgt = totfabwgt + PlanCompFabricDetSave[j].Weight;
                totfabbwgt = totfabbwgt + PlanCompFabricDetSave[j].BColorPQty;
                totfabFwgt = totfabFwgt + PlanCompFabricDetSave[j].FColorPQty;
            }

            var tt = totfabbwgt + totfabFwgt;

            var tt1 = totfabwgt - tt;

            if (Math.round(tt1) != Math.round(totyarnwgt)) {
                $('#profile-tab2').attr('style', 'background-color : #acf2c1');
            }

            var pyarndetsav = [];

            for (i = 0; PlanYarnSave.length > i; i++) {

                for (j = 0; PlanYarnDetSave.length > j; j++) {
                    if (PlanYarnSave[i].FabricID == PlanYarnDetSave[j].FabricID && PlanYarnSave[i].Fabric_ColorId == PlanYarnDetSave[j].BaseColorID) {
                        pyarndetsav.push(PlanYarnDetSave[j]);
                    }
                }
            }
            PlanYarnDetSave = pyarndetsav;
            LoadsepSaveyarn(PlanYarnDetSave);

            if (PlanYarnDetSave.length > 0) {


                for (var h = 0; h < PlanYarn.length; h++) {

                    var ymslno = PlanYarn[h].YSlno;
                    var fabid = PlanYarn[h].FabricID;
                    var fabclid = PlanYarn[h].Fabric_ColorId;
                    var fabwgt = PlanYarn[h].Fabric_Weight;
                    for (var g = 0; g < PlanYarnDetSave.length; g++) {
                        var ydslno = PlanYarnDetSave[g].YSlNo;

                        if (PlanYarnDetSave[g].FabricID == fabid && PlanYarnDetSave[g].BaseColorID == fabclid) {
                            var kper = PlanYarnDetSave[g].Knit_In_Per;

                            var quan = kper / 100 * fabwgt;
                            PlanYarnDetSave[g].Knit_In_Qty = parseFloat(quan).toFixed(3);
                            PlanYarnDetSave[g].Knit_In_ActQty = parseFloat(quan).toFixed(3);


                        }


                    }

                }




                var ycolorempty = [];
                ycolorempty = PlanYarnDetSave;

                if (PlanYarnDetSave.length > 0 && PlanYarnDyeingSave.length > 0) {
                    for (var i = 0; PlanYarnDetSave.length > i; i++) {

                        for (var j = 0; PlanYarnDyeingSave.length > j; j++) {

                            if (PlanYarnDetSave[i].SlNo == PlanYarnDyeingSave[j].YDSlNo) {

                                PlanYarnDyeingSave[j].ActWeight = PlanYarnDetSave[i].Knit_In_Qty;
                                var actwt = PlanYarnDyeingSave[j].ActWeight;
                                var val = PlanYarnDyeingSave[j].Qty_Per;
                                var wt = parseFloat((val * actwt) / 100);
                                PlanYarnDyeingSave[j].Weight = wt;
                            }
                        }
                    }
                }

                ycolorempty = $.grep(ycolorempty, function (v) {
                    return (v.FabricID == FBRID && v.BaseColorID == BCLID);
                });

                PlanYarnDet = ycolorempty;
                Loadsepyarn(PlanYarnDet);
                totyarn();


            }

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });


}

function totyarn() {
    debugger;
    var totalfabqty = 0;

    for (var e = 0; e < PlanYarnSave.length; e++) {
        var pcs = PlanYarnSave[e].Fabric_Weight;
        totalfabqty = totalfabqty + parseFloat(pcs);

    }
    $('#txtfabqty').val(totalfabqty.toFixed(3));

    var totalyarn = 0;
    for (var e = 0; e < PlanYarnDetSave.length; e++) {
        var ypcs = PlanYarnDetSave[e].Knit_In_ActQty;
        totalyarn = totalyarn + parseFloat(ypcs);

    }
    $('#txtyarnqty').val(totalyarn.toFixed(3));
}
function Loadsepyarn(list) {
    debugger;
    //var cur1 = PlanYarnDet.slice(0);
    ////KQty = cur1[0]['Knit_In_Qty'];
    //$('#tblyarnDetails').DataTable().destroy();
    var inputcount = 0;
    $('#tblyarnDetails tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tblyarnDetails').DataTable().destroy();
    }
    $('#tblyarnDetails').empty();
    $('#tblyarnDetails').DataTable({
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
        "rowCallback": function (row, data, index) {
            if (data.OrdQty > "0") {
                $('td', row).css('background-color', '#FCF3CF');
            }

        },
        columns: [
                   { title: "SlNo", data: "SlNo", "visible": false },
                    { title: "CompSlNo", data: "CompSno", "visible": false },
                   { title: "YplanDetID", data: "YplanDetID", "visible": false },
                   { title: "Knit_In_ItemId", data: "Knit_In_ItemId", "visible": false },
                   { title: "Yarn", data: "Yarn" },
                   { title: "Knit_In_SizeID", data: "Knit_In_SizeID", "visible": false },
                   { title: "Counts", data: "Size" },
                   { title: "Knit_in_ColorID", data: "Knit_in_ColorID", "visible": false },
                   { title: "Color", data: "Color" },
                   { title: "%", data: "Knit_In_Per" },
                   //{ title: "Weight(Kgs)", data: "Knit_In_Qty" },
                   {
                       title: "Weight(Kgs)", data: "Knit_In_Qty",
                       render: function (data) {

                           return '<input type="text" id="txtWght" class="form-control"  style="width: 50px;text-align: center;" value=' + data + ' disabled >';

                       },
                   },
                   { title: "Loss%", data: "Loss_per" },
                   { title: "Actual Weight", data: "Knit_In_ActQty" },
                   { title: "YD SlNo", data: "YSlNo", "visible": false },
                   { title: "FabricID", data: "FabricID", "visible": false },
                   { title: "BaseCID", data: "BaseColorID", "visible": false },
                   { title: "YMasID", data: "YPlanMasID", "visible": false },
                   { title: "Dyeing", data: "Dyeing_Req" },

               {
                   title: "Action", "mDataProp": null,
                   "sDefaultContent": '<div style="display:inline-flex;"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnYarnedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnYarnremove btn btn-danger btn-round"> <i class="fa fa-times"></i> </button> </div>'
               }
        ]

    });

    $("#tblyarnDetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblyarnDetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}

function LoadsepSaveyarn(list) {

    //var cur1 = PlanYarnDet.slice(0);
    //KQty = cur1[0]['Knit_In_Qty'];
    //$('#tblyarnSaveDetails').DataTable().destroy();
    var inputcount = 0;
    $('#tblyarnSaveDetails tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tblyarnSaveDetails').DataTable().destroy();
    }
    $('#tblyarnSaveDetails').empty();
    $('#tblyarnSaveDetails').DataTable({
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
                   { title: "SlNo", data: "SlNo" },
                    { title: "CompSlNo", data: "CompSno" },
                   { title: "YplanDetID", data: "YplanDetID" },
                   { title: "Knit_In_ItemId", data: "Knit_In_ItemId" },
                   { title: "Yarn", data: "Yarn" },
                   { title: "Knit_In_SizeID", data: "Knit_In_SizeID" },
                   { title: "Counts", data: "Size" },
                   { title: "Knit_in_ColorID", data: "Knit_in_ColorID" },
                   { title: "Color", data: "Color" },
                   { title: "%", data: "Knit_In_Per" },
                   { title: "Weight(Kgs)", data: "Knit_In_Qty" },
                   { title: "Loss%", data: "Loss_per" },
                   { title: "Actual Weight", data: "Knit_In_ActQty" },
                   { title: "YD SlNo", data: "YSlNo" },
                   { title: "FabricID", data: "FabricID" },
                   { title: "BaseCID", data: "BaseColorID" },
                   { title: "YMasID", data: "YPlanMasID" },
                   { title: "Dyeing", data: "Dyeing_Req" },


        ]

    });
}

function LoadPlanFabric(PLID) {
    $.ajax({
        url: "/PlanningConsumption/ListPlanningFabricYarn",
        data: JSON.stringify({ PlanID: PLID }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            PlanYarnSave = result;
            loadYarnSavedetTab(PlanYarnSave);
            PlanYarn = PlanYarnSave;
            loadYarndetTab(PlanYarn);
            if (PlanYarn.length > 0) {
                FBRID = PlanYarn[0].FabricID;
                BCLID = PlanYarn[0].Fabric_ColorId;

            }

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });


}

function loadYarndetTab(list) {
    debugger;
    //$('#tYFbody').DataTable().destroy();
    var inputcount = 0;
    $('#tYFbody tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tYFbody').DataTable().destroy();
    }
    $('#tYFbody').empty();
    $('#tYFbody').DataTable({

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
                         { title: "CpSNo", data: "SlNo", "visible": false },
                          { title: "YSlno", data: "YSlno", "visible": false },
                         { title: "YarnPlanMasID", data: "YPlanmasID", "visible": false },
                         { title: "FabricID", data: "FabricID", "visible": false },
                         { title: "Fabric", data: "Fabric" },
                           { title: "ComponentID", data: "ComponentId", "visible": false },
                         { title: "Component", data: "Component", "visible": false },
                         { title: "Base Color", data: "BColor" },
                         { title: "Weight(kgs)", data: "Fabric_Weight" },
                         { title: "ColorID", data: "Fabric_ColorId", "visible": false },
                          { title: "Type", data: "Fabric_type" },
                           //{
                           //    title: "Action", "mDataProp": null,
                           //    "sDefaultContent": '<div style="display:inline-flex;"><button type="button" data-toggle="tooltip" data-placement="top" title="Yarn" style="width: 20px;padding: 0px;height: 20px;background: #6B8E23;border: 1px solid #6B8E23;" class="btnYarn btn btn_round"> <img style="width:14px;" src="../images/yarn.png"> </button> </div>'
                           //    //"sDefaultContent": '<div style="display:inline-flex;"><button type="button" data-toggle="tooltip" data-placement="top" title="Yarn" style="width: 20px;padding: 0px;height: 20px;background: #6B8E23;border: 1px solid #6B8E23;" class="btnYarn btn btn_round"> <img style="width:14px;" src="../images/yarn.png"> </button>  <button type="button" data-toggle="tooltip" data-placement="top" title="Dyeing" style="width: 20px;padding: 0px;height: 20px;background: #6B8E23;border: 1px solid #6B8E23;" class="btnYarnDyeing btn btn_round"> <img style="width: 14px;margin-top: -1px;/* margin-left: 0.5px; */" src="../images/dyeing.png"> </button> <button data-toggle="tooltip" data-placement="top" title="Loss" type="button" style="width: 20px;padding: 0px;height: 20px;" class="btnYarnLoss btn btn_round btnl btn-danger"> <i class="fa fa-arrow-down"></i> </button></div>'

                           //},


        ]



    });

    $("#tYFbody tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tYFbody tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}

function loadYarnSavedetTab(list) {
    //$('#tYFSavebody').DataTable().destroy();
    var inputcount = 0;
    $('#tYFSavebody tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tYFSavebody').DataTable().destroy();
    }
    $('#tYFSavebody').empty();
    $('#tYFSavebody').DataTable({

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
                         { title: "CompSNo", data: "SlNo" },
                          { title: "YSlno", data: "YSlno" },
                         { title: "YarnPlanMasID", data: "YPlanmasID" },
                         { title: "FabricID", data: "FabricID" },
                         { title: "Fabric", data: "Fabric" },
                         { title: "ComponentID", data: "ComponentId" },
                         { title: "Component", data: "Component" },
                         { title: "Base Color", data: "BColor" },
                         { title: "Weight(kgs)", data: "Fabric_Weight" },
                         { title: "ColorID", data: "Fabric_ColorId" },
                          { title: "Fabric Type", data: "Fabric_type" },
                           {
                               title: "ViewDetails", "mDataProp": null,
                           },
        ]
    });
}

function loadCompFabTable(list) {
    debugger;
    //$('#tCDbody').DataTable().destroy();




    //list.sort(function (a, b) {
    //    return a.snumb - b.snumb;
    //});


    var inputcount = 0;
    $('#tCDbody tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tCDbody').DataTable().destroy();
    }
    $('#tCDbody').empty();
    //$('#tCPIbody').DataTable().destroy();
    //list.sort(function (a, b) {
    //    return a.snumb - b.snumb;
    //})

    $('#tCDbody').DataTable({
        data: list,
        "deferRender": true,
        scrollY: 150,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        "bSort": false,
        "rowCallback": function (row, data, index) {
            if (data.CheckDcMade > "0") {
                $('td', row).css('background-color', '#FCF3CF');

            }

        },
        columns: [
            { title: "SNo", data: "snumb", "visible": false },

             //{
             //    title: "SNo", data: "snumb", 
             //    render: function (data) {

             //        return '<input type="label" id="txtsnumb" class="form-control" style="width: 150px;text-align: left;border:0px;"  disabled value=' + data + ' >';

             //    },
             //},

            { title: "FPlanId", data: "FPlanId", "visible": false },
            { title: "ColorID", data: "ColorID", "visible": false },
           // { title: "Color", data: "Color" },
             {
                 title: "Color", data: "Color",
                 render: function (data) {

                     return '<input type="label" id="txtColor" class="form-control" style="width: 150px;text-align: left;border:0px;"  disabled value=' + data + ' >';

                 },
             },
            { title: "SizeId", data: "SizeId", "visible": false },
           // { title: "Size", data: "Size" },
           {
               title: "Size", data: "Size",
               render: function (data) {

                   return '<input type="label" id="txtSize" class="form-control" style="width: 50px;text-align: center;border:0px;" disabled value=' + data + ' >';

               },
           },

            {
                title: "Prod Qty", data: "Prdn_Qty",
                render: function (data) {

                    return '<input type="label" id="txtfabPrdQty" class="form-control" style="width: 50px;text-align: center;border:0px;" disabled value=' + data + ' >';

                },
            },
            {
                title: "Act Weight", data: "ActWeight",
                render: function (data) {

                    return '<input type="label" id="txtfabActwt" class="form-control" style="width: 50px;text-align: center;border:0px;" disabled value=' + data + ' >';

                },
            },
            {
                title: "Weight", data: "Weight",
                render: function (data) {

                    return '<input type="label" id="txtfabwt" class="form-control" style="width: 50px;text-align: center;border:0px;" disabled value=' + data + ' >';

                },
            },
            {
                title: "Grammage", data: "Grammage", "visible": false,
                render: function (data) {

                    return '<input type="label" id="txtfabgram" class="form-control" style="width: 50px;text-align: center;border:0px;" value=' + data + ' >';

                },
            },
            { title: "FabricID", data: "FabricID", "visible": false },
            {
                title: "GreyWidthID", data: "GreyWidthID", "visible": false,
                render: function (data) {

                    return '<input type="label" id="txtfabgrey" class="form-control" style="width: 50px;text-align: center;border:0px;" value=' + data + ' >';

                },
            },
            {
                title: "FinishWidthID", data: "FinishWidthID", "visible": false,
                render: function (data) {

                    return '<input type="label" id="txtfabfin" class="form-control" style="width: 50px;text-align: center;border:0px;" value=' + data + ' >';

                },
            },
            { title: "Fabric Type", data: "FabricType", "visible": false },
            { title: "PlanID", data: "PlanID", "visible": false },
            { title: "Comp SlNo", data: "CompSlNo", "visible": false },


       {
           title: "Base Color", data: "Bcolor",

           render: function (data, type, row) {
               if (row.CheckDcMade > 0) {
                   var $select = $("<select></select>", {
                       "id": "ddlBColor",
                       "value": data,
                       "class": "form-control selWidth ddlBColor",
                       "disabled": true
                       // "width": $this.css("width", "100px"),
                       //onchange: "loadbasecolor(this.value);"
                   });

                   $.each(BaseColorlist, function (k, v) {
                       var $option = $("<option></option>", {
                           "text": v.Color,
                           "value": v.ColorID
                       });

                       if (data === v.Color) {
                           $option.attr("selected", "selected")
                       }
                       $select.append($option);
                   });


                   return $select.prop("outerHTML");
               } else {
                   var $select = $("<select></select>", {
                       "id": "ddlBColor",
                       "value": data,
                       "class": "form-control selWidth ddlBColor",
                       // "width": $this.css("width", "100px"),
                       //onchange: "loadbasecolor(this.value);"
                   });

                   $.each(BaseColorlist, function (k, v) {
                       var $option = $("<option></option>", {
                           "text": v.Color,
                           "value": v.ColorID
                       });

                       if (data === v.Color) {
                           $option.attr("selected", "selected")
                       }
                       $select.append($option);
                   });


                   return $select.prop("outerHTML");
               }
           }
       },


        {
            //title: "PurQty", data: "BColorPQty",
            //render: function (data) {

            //    return '<input type="text" id="txtPurQty" class="loadpqty form-control" style="width: 50px;text-align: center;" value=' + data + ' >';

            //},
            title: "Pur Qty", data: "BColorPQty",
            render: function (data, type, row) {
                if (row.CheckDcMade > "0") {
                    return '<input type="text" class="loadpqty form-control" disabled style="width: 50px;text-align: center;" value=' + data + ' >';
                } else {
                    return '<input type="text" class="loadpqty form-control" id="txtPurQty" style="width: 50px;text-align: center;" value=' + data + ' >';
                }
            },
        },


       {
           title: "Finish Color", data: "Fcolor",
           render: function (data, type, row) {
               if (row.CheckDcMade > 0) {
                   var $select = $("<select></select>", {
                       "id": "ddlFColor",
                       "value": data,
                       "class": "form-control selWidth ddlFColor",
                       "disabled": true
                       //onchange: "loadfinishcolor(this.value);"
                   });
                   $.each(FinishColorlist, function (k, v) {
                       var $option = $("<option></option>", {
                           "text": v.Color,
                           "value": v.ColorID
                       });

                       if (data === v.Color) {
                           $option.attr("selected", "selected")
                       }
                       $select.append($option);
                   });
                   return $select.prop("outerHTML");
               } else {
                   var $select = $("<select></select>", {
                       "id": "ddlFColor",
                       "value": data,
                       "class": "form-control selWidth ddlFColor",
                       //onchange: "loadfinishcolor(this.value);"
                   });
                   $.each(FinishColorlist, function (k, v) {
                       var $option = $("<option></option>", {
                           "text": v.Color,
                           "value": v.ColorID
                       });

                       if (data === v.Color) {
                           $option.attr("selected", "selected")
                       }
                       $select.append($option);
                   });
                   return $select.prop("outerHTML");
               }
           }
       },
         {
             title: "Pur Qty", data: "FColorPQty",
             render: function (data, type, row) {
                 return '<input type="text" id="txtFPurQty" class="loadfcpqty form-control"  style="width: 50px;text-align: center;" value=' + data + ' >';
             }
         },


         {
             title: "Print Color", data: "PColor",
             render: function (data, type, row) {
                 if (data == null) {
                     data = '--Select--'
                 }
                 var $select = $("<select></select>", {
                     "id": "ddlPColor",
                     "value": data,
                     "class": "form-control ddlPColor",
                     //onchange: "loadprintcolor(this.value);"
                 });
                 $.each(PrintColorlist, function (k, v) {
                     var $option = $("<option></option>", {
                         "text": v.Color,
                         "value": v.ColorID
                     });

                     if (data === v.Color) {
                         $option.attr("selected", "selected")
                     }
                     $select.append($option);
                 });
                 return $select.prop("outerHTML");
                 //return '<select id="ddlGSize" selected="selected" class="form-control" style="width: 100px;"> </select>';                                                             
             }
         },
          {
              title: "Finish Gsm", data: "FGsm",
              render: function (data, type, row) {
                  // return '<input id="txtFGsm" type="text" value="0" style="width: 50px;text-align: center;" >';
                  return '<input type="text" id="txtFGsm" class="loadfgsm form-control" style="width:50px;text-align: center;" value=' + data + ' >';
              }
          },

           {
               title: "Knit GSM", data: "KGsm",
               render: function (data) {

                   return '<input type="text" id="txtKnitgsm" class="calcknitgsm form-control" style="width: 50px;text-align: center;" value=' + data + ' >';

               },
           },
            {
                title: "Loop Len", data: "LoopLen",
                render: function (data) {

                    return '<input type="text" id="txtlooplen" class="calclooplen form-control" style="width: 50px;text-align: center;" value=' + data + ' >';

                },
            },
             {
                 title: "Texture", data: "texture",
                 render: function (data) {

                     return '<input type="text" id="txtTexture" class="calcTexture form-control" style="width: 50px;text-align: center;" value=' + data + ' >';

                 },
             },
              {
                  title: "Content", data: "content",
                  render: function (data) {

                      return '<input type="text" id="txtContent" class="CalcContent form-control" style="width: 50px;text-align: center;" value=' + data + ' >';

                  },
              },
               {
                   title: "Gauge", data: "guage",
                   render: function (data) {

                       return '<input type="text" id="txtGauge" class="CalcGauge form-control" style="width: 50px;text-align: center;" value=' + data + ' >';

                   },
               },

               {
                   title: "Stock", "mDataProp": null,
                   "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="View" style="width: 20px;padding:0px;height: 20px;border-radius: 10px;" class="btnshowstock btn btn-round btn-info"> <i class="fa fa-eye"></i> </button>'
                   //"sDefaultContent": '<button type="button" class="btncompLossedit"> Edit </button> <button type="button" class="btncompLossremove"> Remove </button>'
               },
        ]
    });



    totwght();

    $("#tCDbody tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tCDbody tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });

}

function loadCompFabSaveTable(data) {
    //$('#tblcompfabdetails').DataTable().destroy();

    var inputcount = 0;
    $('#tblcompfabdetails tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tblcompfabdetails').DataTable().destroy();
    }
    $('#tblcompfabdetails').empty();

    data.sort(function (a, b) {
        return a.snumb - b.snumb;
    });

    $('#tblcompfabdetails').DataTable({

        //"order": [[1, "asc"]],
        data: data,
        scrollY: 100,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        scrollY: "300px",
        scrollX: true,
        scrollCollapse: true,
        paging: false,
        fixedColumns: {
            heightMatch: 'none'
        },

        columns: [
            { title: "SNo", data: "snumb" },
            { title: "FPlId", data: "FPlanId" },
            { title: "ColorID", data: "ColorID" },
            { title: "Color", data: "Color" },
            { title: "SizeId", data: "SizeId" },
            { title: "Size", data: "Size" },
            { title: "PQty", data: "Prdn_Qty" },
             { title: "ActWeight", data: "ActWeight" },
            { title: "Wht", data: "Weight" },
            { title: "Gram", data: "Grammage" },
            { title: "FabID", data: "FabricID" },
            { title: "GWidID", data: "GreyWidthID" },
            { title: "FWidID", data: "FinishWidthID" },
            { title: "FType", data: "FabricType" },
            { title: "PlID", data: "PlanID" },
            { title: "CoSNo", data: "CompSlNo" },
            { title: "BColor", data: "BColorID" },
            { title: "PurQty", data: "BColorPQty" },
            { title: "FColor", data: "FColorID" },
            { title: "PuQty", data: "FColorPQty" },
            { title: "PrColor", data: "PColorID" },
            { title: "FGsm", data: "FGsm" },
        ]
    });



}

function loadfillloss() {
    debugger;

    if (fcompno == 0) {
        fcompno == 1;
    } else {
        fcompno == fcompno;
    }

    var totalamnt = 0;
    for (var e = 0; e < PlanLossSave.length; e++) {
        if (PlanLossSave[e].CompSNo == fcompno) {
            var amount = PlanLossSave[e].Loss_Per;
            totalamnt = totalamnt + parseFloat(amount);
        }
    }
    if (totalamnt < 0) {
        var table = $('#tCDbody').DataTable();
        var ecdata = table.rows().data();

        debugger;
        $('input[id=txtPurQty]').each(function (ig) {
            debugger;
            var row = $(this).closest('tr');

            for (var h = 0; h < PlanCompFabricDet.length; h++) {
                if (ig == h) {

                    var snu = PlanCompFabricDet[h].snumb;
                    var quan = PlanCompFabricDet[h].ActWeight;
                    var res = -((totalamnt / 100) * quan).toFixed(3);
                    PlanCompFabricDet[h].Weight = parseFloat(quan) + parseFloat(res);
                    var res = (parseFloat(quan) + parseFloat(res)).toFixed(3);

                    var snumb = PlanCompFabricDet[h].snumb;
                    var FPlanId = PlanCompFabricDet[h].FPlanId;
                    var ColorID = PlanCompFabricDet[h].ColorID;
                    var Color = PlanCompFabricDet[h].Color;
                    var SizeId = PlanCompFabricDet[h].SizeId;
                    var Size = PlanCompFabricDet[h].Size;
                    var Prdn_Qty = PlanCompFabricDet[h].Prdn_Qty;
                    var ActWeight = PlanCompFabricDet[h].ActWeight;
                    var Weight = res;
                    var Grammage = PlanCompFabricDet[h].Grammage;
                    var FabricID = PlanCompFabricDet[h].FabricID;

                    var GreyWidthID = PlanCompFabricDet[h].GreyWidthID;
                    var FinishWidthID = PlanCompFabricDet[h].FinishWidthID;
                    var FabricType = PlanCompFabricDet[h].FabricType;
                    var PlanID = PlanCompFabricDet[h].PlanID;
                    var CompSlNo = PlanCompFabricDet[h].CompSlNo;
                    var Bcolor = PlanCompFabricDet[h].Bcolor;
                    var BColorPQty = PlanCompFabricDet[h].BColorPQty;
                    var Fcolor = PlanCompFabricDet[h].Fcolor;
                    var FColorPQty = PlanCompFabricDet[h].FColorPQty;
                    var PColor = PlanCompFabricDet[h].PColor;
                    var FGsm = PlanCompFabricDet[h].FGsm;

                    var KGsm = PlanCompFabricDet[h].KGsm;
                    var LoopLen = PlanCompFabricDet[h].LoopLen;
                    var texture = PlanCompFabricDet[h].texture;
                    var content = PlanCompFabricDet[h].content;
                    var guage = PlanCompFabricDet[h].guage;

                    row.find('#txtsnumb').val(snumb);
                    row.find('#txtColor').val(Color);
                    row.find('#txtSize').val(Size);
                    row.find('#txtfabPrdQty').val(Prdn_Qty);
                    row.find('#txtfabActwt').val(ActWeight);
                    row.find('#txtfabwt').val(Weight);
                    row.find('#txtPurQty').val(BColorPQty);
                    row.find('#txtFPurQty').val(FColorPQty);
                    row.find('#txtFGsm').val(FGsm);
                    row.find('#txtKnitgsm').val(KGsm);
                    row.find('#txtlooplen').val(LoopLen);
                    row.find('#txtTexture').val(texture);
                    row.find('#txtContent').val(content);
                    row.find('#txtGauge').val(guage);
                    if (PColor == null) {
                        PColor = '--Select--';
                    }
                    // row.find('#ddlBColor option:selected').text(Bcolor);
                    $.each(BaseColorlist, function (k, v) {
                        var id = 0;
                        if (Bcolor === v.Color) {
                            id = v.ColorID
                            row.find('#ddlBColor').val(id);
                        }

                    });
                    // row.find('#ddlFColor option:selected').text(Fcolor);
                    $.each(FinishColorlist, function (k, v) {
                        var id = 0;
                        if (Fcolor === v.Color) {
                            id = v.ColorID
                            row.find('#ddlFColor').val(id);
                        }

                    });
                    // row.find('#ddlPColor option:selected').text(PColor);
                    $.each(PrintColorlist, function (k, v) {
                        var id = 0;
                        if (PColor === v.Color) {
                            id = v.ColorID
                            row.find('#ddlPColor').val(id);
                        }

                    });

                }
            }
            // }
        });


        for (var d = 0; d < PlanCompFabricDetSave.length; d++) {
            if (PlanCompFabricDetSave[d].CompSlNo == fcompno) {
                var quan = PlanCompFabricDetSave[d].ActWeight;
                var res = -((totalamnt / 100) * quan).toFixed(3);
                PlanCompFabricDetSave[d].Weight = parseFloat(quan) + parseFloat(res);

            }
        }
    }
    else {
        var table = $('#tCDbody').DataTable();
        var ecdata = table.rows().data();

        debugger;
        $('input[id=txtPurQty]').each(function (ig) {
            debugger;
            // if (ecdata[ig].snumb == (ig + 1)) {
            var row = $(this).closest('tr');

            for (var h = 0; h < PlanCompFabricDet.length; h++) {
                if (ig == h) {
                    var snumb = PlanCompFabricDet[h].snumb;
                    var FPlanId = PlanCompFabricDet[h].FPlanId;
                    var ColorID = PlanCompFabricDet[h].ColorID;
                    var Color = PlanCompFabricDet[h].Color;
                    var SizeId = PlanCompFabricDet[h].SizeId;
                    var Size = PlanCompFabricDet[h].Size;
                    var Prdn_Qty = PlanCompFabricDet[h].Prdn_Qty;
                    var ActWeight = PlanCompFabricDet[h].ActWeight;
                    var Weight = PlanCompFabricDet[h].ActWeight;;
                    var Grammage = PlanCompFabricDet[h].Grammage;
                    var FabricID = PlanCompFabricDet[h].FabricID;

                    var GreyWidthID = PlanCompFabricDet[h].GreyWidthID;
                    var FinishWidthID = PlanCompFabricDet[h].FinishWidthID;
                    var FabricType = PlanCompFabricDet[h].FabricType;
                    var PlanID = PlanCompFabricDet[h].PlanID;
                    var CompSlNo = PlanCompFabricDet[h].CompSlNo;
                    var Bcolor = PlanCompFabricDet[h].Bcolor;
                    var BColorPQty = PlanCompFabricDet[h].BColorPQty;
                    var Fcolor = PlanCompFabricDet[h].Fcolor;
                    var FColorPQty = PlanCompFabricDet[h].FColorPQty;
                    var PColor = PlanCompFabricDet[h].PColor;
                    var FGsm = PlanCompFabricDet[h].FGsm;

                    var KGsm = PlanCompFabricDet[h].KGsm;
                    var LoopLen = PlanCompFabricDet[h].LoopLen;
                    var texture = PlanCompFabricDet[h].texture;
                    var content = PlanCompFabricDet[h].content;
                    var guage = PlanCompFabricDet[h].guage;

                    row.find('#txtColor').val(Color);
                    row.find('#txtSize').val(Size);
                    row.find('#txtfabPrdQty').val(Prdn_Qty);
                    row.find('#txtfabActwt').val(ActWeight);
                    row.find('#txtfabwt').val(Weight);
                    row.find('#txtPurQty').val(BColorPQty);
                    row.find('#txtFPurQty').val(FColorPQty);
                    row.find('#txtFGsm').val(FGsm);
                    row.find('#txtKnitgsm').val(KGsm);
                    row.find('#txtlooplen').val(LoopLen);
                    row.find('#txtTexture').val(texture);
                    row.find('#txtContent').val(content);
                    row.find('#txtGauge').val(guage);
                    if (PColor == null) {
                        PColor = '--Select--';
                    }
                    // row.find('#ddlBColor option:selected').text(Bcolor);
                    $.each(BaseColorlist, function (k, v) {
                        var id = 0;
                        if (Bcolor === v.Color) {
                            id = v.ColorID
                            row.find('#ddlBColor').val(id);
                        }

                    });
                    // row.find('#ddlFColor option:selected').text(Fcolor);
                    $.each(FinishColorlist, function (k, v) {
                        var id = 0;
                        if (Fcolor === v.Color) {
                            id = v.ColorID
                            row.find('#ddlFColor').val(id);
                        }

                    });
                    // row.find('#ddlPColor option:selected').text(PColor);
                    $.each(PrintColorlist, function (k, v) {
                        var id = 0;
                        if (PColor === v.Color) {
                            id = v.ColorID
                            row.find('#ddlPColor').val(id);
                        }

                    });

                }
            }
            // }
        });

        for (var d = 0; d < PlanCompFabricDetSave.length; d++) {
            if (PlanCompFabricDetSave[d].CompSlNo == fcompno) {

                PlanCompFabricDetSave[d].Weight = PlanCompFabricDetSave[d].ActWeight;

            }
        }
    }

    totwght();
}
function totwght() {
    debugger;

    if (fcompno == 0) {
        fcompno == 1;
    } else {
        fcompno == fcompno;
    }

    var totalamnt = 0;
    for (var e = 0; e < PlanCompFabricDet.length; e++) {
        if (PlanCompFabricDet[e].CompSlNo == fcompno) {
            var amount = PlanCompFabricDet[e].ActWeight;
            totalamnt = totalamnt + parseFloat(amount);
        }
    }
    $('#txttotwt').val(totalamnt.toFixed(3));

    var totalamntloss = 0;
    for (var e = 0; e < PlanCompFabricDet.length; e++) {
        if (PlanCompFabricDet[e].CompSlNo == fcompno) {
            var amountloss = PlanCompFabricDet[e].Weight;
            totalamntloss = totalamntloss + parseFloat(amountloss);
        }
    }
    $('#txttotwtloss').val(totalamntloss.toFixed(3));
}

function loadFabricLossTable(list) {
    //$('#tblcompfabricloss').DataTable().destroy();

    var inputcount = 0;
    $('#tblcompfabricloss tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tblcompfabricloss').DataTable().destroy();
    }
    $('#tblcompfabricloss').empty();
    $('#tblcompfabricloss').DataTable({
        data: list,
        columns: [
            { title: "FLPlanID", data: "FLPlanID", "visible": false },
            { title: "ProcessID", data: "ProcessId", "visible": false },
            { title: "Process", data: "ProcessName" },
            { title: "Loss%", data: "Loss_Per" },
            { title: "Sl No", data: "SlNo", "visible": false },
            { title: "Comp SNo", data: "CompSNo", "visible": false },
             { title: "FPlanId", data: "FPlanId", "visible": false },
               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btncompLossedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btncompLossremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button>'
                   //"sDefaultContent": '<button type="button" class="btncompLossedit"> Edit </button> <button type="button" class="btncompLossremove"> Remove </button>'
               }
        ]
    });

    var totalamnt = 0;
    for (var e = 0; e < PlanLossSave.length; e++) {
        if (PlanLossSave[e].CompSNo == fcompno) {
            var amount = PlanLossSave[e].Loss_Per;
            totalamnt = totalamnt + parseFloat(amount);
        }
    }
    $('#txttotfabloss').val(totalamnt);
}

function loadFabricLossSaveTable(list) {
    $('#tblcompfabriclossSave').DataTable().destroy();

    $('#tblcompfabriclossSave').DataTable({
        data: list,
        columns: [
            { title: "FLPlanID", data: "FLPlanID" },
            { title: "ProcessID", data: "ProcessId" },
            { title: "Process", data: "ProcessName" },
            { title: "Loss%", data: "Loss_Per" },
            { title: "Sl No", data: "SlNo" },
            { title: "Comp SNo", data: "CompSNo" },
             { title: "FPlanId", data: "FPlanId" },
        ]
    });
}

function LoadPlanItemDetails(ItemId, StyleRowId) {
    $.ajax({
        url: "/PlanningConsumption/GetPlanItemDetails",
        data: JSON.stringify({ ItemId: ItemId, StyleRowId: StyleRowId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;

            if (obj != undefined) {

                //$('#txtHCompanyId').val(obj[0]["CompanyID"]);
                //$('#txtStyle').val(obj[0]["Style"]); 

                //$('#txtHItemId').val(obj[0]["ItemID"]);
                //$('#txtHStyleId').val(obj[0]["StyleID"]);
                //$('#txtBuyOrdMasId').val(obj[0]["BMasID"]);
                //$('#txtWorkOrderNo').val(obj[0]["Job_Ord_No"]);
                $('#txtPlanEntryDate').val(moment(obj[0]["EDate"]).format('DD/MM/YYYY'));
                PlanCompanyid = obj[0]["CompanyID"];
                PlanBmasid = obj[0]["BMasID"];
                PlanItemId = ItemId;
                PlanStyleid = obj[0]["StyleID"];
            }
            else {

            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function EditDetCompPlanList(PItemId, StyleRowId, PLID) {
    debugger;

    $.ajax({
        url: "/PlanningConsumption/ListCompDetDetails",
        data: JSON.stringify({ PItemId: PItemId, StyleRowId: StyleRowId, PlanID: PLID }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            compList = result;
            loadcomponentTable(compList);

            CompSlNo = compList[0].CompSlNo;
            var Slno = compList[0].CompSlNo;
            var Grouping = compList[0].Grouping;
            var gsm = compList[0].GSM;
            var tp = compList[0].Fabric_Type;
            if (tp == 'P') {
                type = 'PANELS'
            }
            else if (tp == 'W') {
                type = 'WOVEN'
            }
            else if (tp == 'K') {
                type = 'KNITS'
            }
            Chkgroup(Grouping);
            //var PId = curentro1[0]['procordid'];

            if (compList.length > 0) {

                EditDetConPlanTotList(PItemId, StyleRowId, PLID, gsm);

            }

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function EditDetConPlanTotList(PItemId, StyleRowId, PLID, gsm) {

    $.ajax({
        url: "/PlanningConsumption/TotListConDetDetails",
        data: JSON.stringify({ PItemId: PItemId, StyleRowId: StyleRowId, PlanID: PLID }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            debugger;
            ConItemListSave = result;
            //loadconSaveTable(ConItemListSave);

            $.each(ConItemListSave, function () {
                if (this.CompSlNo == CompSlNo) {
                    this.GSM = gsm;

                }
            });



            //loadconSaveTable(ConItemListSave);
            var colorempty = [];
            colorempty = ConItemListSave;

            colorempty = $.grep(colorempty, function (v) {
                return (v.CompSlNo == CompSlNo);
            });

            ConItemList = colorempty;
            loadAdConTable(ConItemList);
            ConsmtnHideCol(type);
            if (ConItemListSave.length > 0) {
                //Loadtotfabriceditdet(PLID);
            }

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}

function ConsmtnHideCol(type) {
    var tbl = $('#tCPIbody');


    if (type == 'KNITS') {
        //tbl.DataTable().column(12).visible(false);
        //tbl.DataTable().column(13).visible(false);

        tbl.DataTable().column(15).visible(false);
        tbl.DataTable().column(16).visible(false);
        tbl.DataTable().column(17).visible(false);
        tbl.DataTable().column(18).visible(false);
        tbl.DataTable().column(19).visible(false);
        tbl.DataTable().column(20).visible(false);

        tbl.DataTable().column(3).visible(true);
        tbl.DataTable().column(4).visible(true);
        tbl.DataTable().column(6).visible(true);
        tbl.DataTable().column(8).visible(true);
        tbl.DataTable().column(9).visible(true);
        tbl.DataTable().column(10).visible(true);
        tbl.DataTable().column(11).visible(true);

        tbl.DataTable().column(12).visible(true);
        tbl.DataTable().column(13).visible(true);
        tbl.DataTable().column(14).visible(true);

        tbl.DataTable().column(21).visible(true);
        tbl.DataTable().column(22).visible(true);
        tbl.DataTable().column(23).visible(true);
    }
    else if (type == 'WOVEN') {
        tbl.DataTable().column(8).visible(false);
        tbl.DataTable().column(9).visible(false);
        tbl.DataTable().column(10).visible(false);
        tbl.DataTable().column(11).visible(false);
        tbl.DataTable().column(12).visible(false);
        tbl.DataTable().column(13).visible(false);
        tbl.DataTable().column(14).visible(false);

        tbl.DataTable().column(18).visible(false);
        tbl.DataTable().column(19).visible(false);
        tbl.DataTable().column(20).visible(false);


        tbl.DataTable().column(3).visible(true);
        tbl.DataTable().column(4).visible(true);
        tbl.DataTable().column(6).visible(true);

        tbl.DataTable().column(15).visible(true);
        tbl.DataTable().column(16).visible(true);
        tbl.DataTable().column(17).visible(true);

        tbl.DataTable().column(21).visible(true);
        tbl.DataTable().column(22).visible(true);
        tbl.DataTable().column(23).visible(true);
    }
    else if (type == 'PANELS') {
        tbl.DataTable().column(8).visible(false);
        tbl.DataTable().column(9).visible(false);
        tbl.DataTable().column(10).visible(false);
        tbl.DataTable().column(11).visible(false);
        tbl.DataTable().column(12).visible(false);
        tbl.DataTable().column(13).visible(false);
        tbl.DataTable().column(14).visible(false);
        tbl.DataTable().column(15).visible(false);
        tbl.DataTable().column(16).visible(false);
        tbl.DataTable().column(17).visible(false);


        tbl.DataTable().column(3).visible(true);
        tbl.DataTable().column(4).visible(true);
        tbl.DataTable().column(6).visible(true);



        tbl.DataTable().column(18).visible(true);
        tbl.DataTable().column(19).visible(true);
        tbl.DataTable().column(20).visible(true);
        tbl.DataTable().column(21).visible(true);
        tbl.DataTable().column(22).visible(true);
        tbl.DataTable().column(23).visible(true);
    }
}
function loadAdConTable(list) {
    debugger;
    var inputcount = 0;
    $('#tCPIbody tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tCPIbody').DataTable().destroy();
    }
    $('#tCPIbody').empty();
    //$('#tCPIbody').DataTable().destroy();
    //list.sort(function (a, b) {
    //    return a.CPlanSlNo - b.CPlanSlNo;
    //})

    //Fabriclist;
    $('#tCPIbody').DataTable({
        data: list,
        scrollY: 150,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        "bSort": false,
        "rowCallback": function (row, data, index) {
            if (data.CheckDcMade > "0") {
                $('td', row).css('background-color', '#FCF3CF');

            }

        },
        columns: [

              { title: "Cp SNo", data: "CPlanSlNo", "visible": false },
            { title: "Con_PlanID", data: "Con_PlanID", "visible": false },
            { title: "CID", data: "ColorID", "visible": false },
            { title: "Color", data: "Color" },
            { title: "Size", data: "Size" },
            { title: "SzId", data: "SizeId", "visible": false },
            { title: "Prd Qty", data: "Prdn_Qty" },

            { title: "CmSNo", data: "CompSlNo", "visible": false },
            //{ title: "Length", data: "Length" },

            {
                title: "Length", data: "Length",
                render: function (data) {

                    return '<input type="text" id="txtLen" class="calclength form-control"  style="width: 50px;text-align: center;" value=' + data + '  >';

                },
            },
             {
                 title: "A.Length", data: "AlloLen",
                 render: function (data) {

                     return '<input type="text" id="txtallowLen" class="calcallowlength form-control"  style="width: 50px;text-align: center;" value=' + data + '  >';

                 },
             },
            //{ title: "Width", data: "Width" },
             {
                 title: "Width", data: "Width",
                 render: function (data) {

                     return '<input type="text" id="txtWidth" class="calcwidth form-control"  style="width: 50px;text-align: center;" value=' + data + ' >';

                 },
             },
              {
                  title: "A.Width", data: "AllowWid",
                  render: function (data) {

                      return '<input type="text" id="txtalloeWidth" class="calcallowwidth form-control"  style="width: 50px;text-align: center;" value=' + data + ' >';

                  },
              },
              {
                  title: "Pattern", data: "Pattern",
                  render: function (data) {
                      if (checkpattern == 1) {
                          return '<input type="text" id="txtPattern" class="calcpattern form-control"  style="width: 50px;text-align: center;" value=' + data + ' >';
                      } else {
                          return '<input type="text" id="txtPattern" class="calcpattern form-control" disabled style="width: 50px;text-align: center;" value=' + data + ' >';

                      }
                  },
              },
            //{ title: "Gsm", data: "GSM" },
            {
                title: "Gsm", data: "GSM",
                render: function (data) {

                    return '<input type="text" id="txtGsm" class="calcgsm form-control"  style="width: 50px;text-align: center;" value=' + data + ' >';

                },
            },
           // { title: "Gram", data: "Grammage" },
           {
               title: "Gram", data: "Grammage",
               render: function (data) {

                   return '<input type="text" id="txtGram" class="calcgramm form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

               },
           },
            {
                title: "Requirement", data: "Requirement", "visible": false,
                render: function (data) {

                    return '<input type="text" id="txtReqmnt" class="calcreqmnt form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                },
            },
            {
                title: "Tot Metres", data: "TotMetres", "visible": false,
                render: function (data) {

                    return '<input type="text" id="txtTotMetWov" class="calcwovtotmet form-control"  style="width: 50px;text-align: center;"  value=' + data + ' disabled>';

                },
            },
              {
                  title: "Wt.Metre(Gms)", data: "WtMetre", "visible": false,
                  render: function (data) {

                      return '<input type="text" id="txtWtmtWov" class="calcwovwtmt form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                  },
              },
               { title: "Parts", data: "No_Of_Parts", "visible": false },
               {
                   title: "Tot Peices", data: "TotPieces", "visible": false,
                   render: function (data) {

                       return '<input type="text" id="txtTotpcspan" class="calcpantotpcs form-control"  style="width: 50px;text-align: center;"  value=' + data + ' disabled >';

                   },
               },
               {
                   title: "Grams/Pieces", data: "GmsPieces", "visible": false,
                   render: function (data) {

                       return '<input type="text" id="txtGmspcspan" class="calcpanpcs form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                   },
               },
            {
                title: "Tab Weight", data: "Weight",
                render: function (data) {

                    return '<input type="text" id="txtWght" class="form-control"  style="width: 50px;text-align: center;" value=' + data + ' disabled >';

                },
            },

            //{
            //    title: "FWidth", data: "FinishWidthID",
            //    render: function (data, type, row) {
            //        return ' <select id="ddlFSize" class="form-control" style="width: 100px;" onchange="loadFWidth(this.value);"></select>';

            //    }
            //},

            {
                title: "Fab Width", data: "FinishWidth",
                render: function (data, type, row) {

                    if (row.CheckDcMade > 0) {
                        if (data == null) {
                            data = '--Select--'
                        }
                        var $select = $("<select></select>", {
                            "id": "ddlFSize",
                            "value": data,
                            "class": "form-control ddlFSize",
                            "disabled": true
                            //onchange: "loadFWidth(this.value);"
                        });
                        $.each(Fabriclist, function (k, v) {
                            var $option = $("<option></option>", {
                                "text": v.Size,
                                "value": v.SizeId
                            });
                            if (data === v.Size) {
                                $option.attr("selected", "selected")
                            }
                            $select.append($option);
                        });
                        return $select.prop("outerHTML");
                    } else {


                        if (data == null) {
                            data = '--Select--'
                        }
                        var $select = $("<select></select>", {
                            "id": "ddlFSize",
                            "value": data,
                            "class": "form-control ddlFSize",
                            //onchange: "loadFWidth(this.value);"
                        });
                        $.each(Fabriclist, function (k, v) {
                            var $option = $("<option></option>", {
                                "text": v.Size,
                                "value": v.SizeId
                            });
                            if (data === v.Size) {
                                $option.attr("selected", "selected")
                            }
                            $select.append($option);
                        });
                        return $select.prop("outerHTML");
                    }
                    //return '<select id="ddlGSize" selected="selected" class="form-control" style="width: 100px;"> </select>';
                }
            },


                                                       {
                                                           title: "Grey", data: "GreyWidth",
                                                           render: function (data, type, row) {
                                                               if (row.CheckDcMade > 0) {
                                                                   if (data == null) {
                                                                       data = '--Select--'
                                                                   }
                                                                   var $select = $("<select></select>", {
                                                                       "id": "ddlGSize",
                                                                       "value": data,
                                                                       "class": "form-control ddlGSize",
                                                                       "disabled": true
                                                                       //onchange: "loadlist(this.value);"
                                                                   });
                                                                   $.each(GreyList, function (k, v) {
                                                                       var $option = $("<option></option>", {
                                                                           "text": v.Size,
                                                                           "value": v.SizeId
                                                                       });

                                                                       if (data === v.Size) {
                                                                           $option.attr("selected", "selected")
                                                                       }
                                                                       $select.append($option);
                                                                   });
                                                                   return $select.prop("outerHTML");
                                                               }
                                                               else {
                                                                   if (data == null) {
                                                                       data = '--Select--'
                                                                   }
                                                                   var $select = $("<select></select>", {
                                                                       "id": "ddlGSize",
                                                                       "value": data,
                                                                       "class": "form-control ddlGSize",
                                                                       //onchange: "loadlist(this.value);"
                                                                   });
                                                                   $.each(GreyList, function (k, v) {
                                                                       var $option = $("<option></option>", {
                                                                           "text": v.Size,
                                                                           "value": v.SizeId
                                                                       });

                                                                       if (data === v.Size) {
                                                                           $option.attr("selected", "selected")
                                                                       }
                                                                       $select.append($option);
                                                                   });
                                                                   return $select.prop("outerHTML");
                                                               }
                                                           }
                                                       },

        {
            title: "Update", "mDataProp": null, "visible": false,


            "sDefaultContent": '<button type="button"  style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" data-toggle="tooltip" data-placement="top" title="Submit" class="btnUpdate btn btn-success"> <i class="fa fa-check"></i> </button>'
        }

        ]
    });
    totconwght();

}
function totconwght() {
    debugger;
    var totalconqty = 0;
    for (var e = 0; e < ConItemList.length; e++) {
        if (ConItemList[e].CompSlNo == CompSlNo) {
            var amountconqty = ConItemList[e].Prdn_Qty;
            totalconqty = totalconqty + parseFloat(amountconqty);
        }
    }
    $('#txtconqty').val(totalconqty.toFixed(0));

    var totalconwgt = 0;
    for (var e = 0; e < ConItemList.length; e++) {
        if (ConItemList[e].CompSlNo == CompSlNo) {
            var amountconwgt = ConItemList[e].Weight;
            totalconwgt = totalconwgt + parseFloat(amountconwgt);
        }
    }
    $('#txtconwgt').val(totalconwgt.toFixed(3));
}

function getfabric() {

    $.ajax({
        url: "/PlanningConsumption/FabricList",
        data: JSON.stringify({}),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            Fabriclist = result;
            GreyList = result;

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function Chkgroup(grp) {
    debugger;
    if (grp == 'COLOR/SIZE') {
        $("input[name=ALType]").attr('disabled', false);
        $('#consumpfill').prop('disabled', false);

    }
    else {
        $("#optall").prop("checked", true);
        $("input[name=ALType]").attr('disabled', true);
        $('#consumpfill').prop('disabled', false);
    }

}
function loadcomponentTable(compListObj) {
    debugger;
    // $('#tblcompdetails').DataTable().destroy();
    var inputcount = 0;
    $('#tblcompdetails tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tblcompdetails').DataTable().destroy();
    }
    $('#tblcompdetails').empty();
    compList.sort(function (a, b) {
        return a.CompSlNo - b.CompSlNo;
    })
    $('#tblcompdetails').DataTable({
        //'bSortable': false,
        //'aTargets' : [ 7, 8 ],
        data: compList,
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
            if (data.CheckDcMade > "0") {
                $('td', row).css('background-color', '#FCF3CF');

            }

        },
        columns: [
             { title: "Comp SlNo", data: "CompSlNo", "visible": false },
            { title: "Comp_Plan_MasID", data: "Comp_Plan_MasID", "visible": false },
            { title: "ComponentID", data: "ComponentID", "visible": false },
            { title: "Component Name", data: "ComponentName" },
            { title: "Parts", data: "No_Of_Parts" },
            { title: "Type", data: "Fabric_Type" },
            { title: "Gsm", data: "GSM" },
            { title: "Grouping", data: "Grouping" },
            { title: "Description", data: "Description" },
            { title: "FabricID", data: "FabricID", "visible": false },
            { title: "Fabric Name", data: "FabricName" },

               {
                   title: "ACTION", "mDataProp": null, "visible": false,
                   "sDefaultContent": '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btncompedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btncompremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div>'
               }
        ]
    });


    $("#tblcompdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblcompdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });




}

function LoadPlanAdd(StyleRowID, Mod, Type) {

    var StyRId = StyleRowID;
    var M = 1;

    $.ajax({
        url: "/PlanningAdd/ListAddPlanning",
        data: JSON.stringify({ StyleRowid: StyRId, Mode: M, Type: Type }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {

            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");
            $('#tPAbody').DataTable({
                data: dataSet,
                "rowCallback": function (row, data, index) {
                    if (data[5] > "0") {
                        $('td', row).css('background-color', 'Tan');

                    }
                },
                columns: [
                         { title: "ItemId", "visible": false },
                         { title: "Item" },
                         { title: "Order Qty" },
                         { title: "Production Qty" },
                         //{ title: "Style" },
                         //{ title: "RefNo" },
                         //{ title: "Date" },
                         //{ title: "Quantity" },
                         //{ title: "StyleRowID" },
                         { title: "PlanID", "visible": false },
                           { title: "ProdAmend", "visible": false },
                          { title: "Action" },

                ]

            });
            //if (Gp == "Con") {
            //    CheckRights("PlanProgram");
            //} else if (Gp == "Acc") {
            //    CheckRights("PlanTrims");
            //}
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });


}

function LoadCheckBomShipDetails(OrderNo, StlyeId) {
    //var OrderNo = $('#ddlOrderNo').val();
    //var StlyeId = $('#ddlstyle').val();

    $.ajax({
        url: "/StyleEntry/CheckShipPlanDetails",
        data: JSON.stringify({ order_no: OrderNo, Styleid: StlyeId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            if (obj != undefined) {
                CBom = obj[0]["CheckBom"];
                CShip = obj[0]["CheckShip"];
            }
            else {
            }
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function getbyIDship(ID) {
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

                companyid = obj[0]["CompanyId"];
                $('#txtworkno').val(obj[0]["WorkOrder"]);
                $('#ddlprodunit').val(obj[0]["ProcessUnitId"]);
                $('#ddlprocessunit').val(obj[0]["ProcessUnitId"]);

            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
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
                   "sDefaultContent": '<div style="display:inline-flex;"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnshipedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> </div>'
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

function EditDetTotalPackList(StyleRowId) {
    debugger;
    var ord = $('#ddlOrderNo option:selected').text();
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
                $('#txtRefNoship').val(obj[0]["Ref_no"]);
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
                var WorkNo = $("#txtworkno").val();
                var BMasId = obj[0]["BMasID"];
            }
            else {

            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
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

$(document).ready(function () {
    $('#tblcompdetails').on('click', 'tr', function (e) {

        debugger;
        var table = $('#tblcompdetails').DataTable();
        var row = $(this).closest('tr');
        var data = $('#tblcompdetails').dataTable().fnGetData(row);
        var table = $('#tblcompdetails').DataTable();
        CompSlNo = data.CompSlNo;
        var checkdc = data.CheckDcMade;

        if (checkdc > 0) {
            $("#ddlFabric").prop("disabled", true);
            $("#ddlComponent").prop("disabled", true);
            $("#ddlType").prop("disabled", true);
            $("#ddlGroup").prop("disabled", true);
        } else {
            $("#ddlFabric").prop("disabled", false);
            $("#ddlComponent").prop("disabled", false);
            $("#ddlType").prop("disabled", false);
            $("#ddlGroup").prop("disabled", false);
        }
        var Slno = data.CompSlNo;
        gsm = data.GSM;
        FabricId = data.FabricID;
        Fabric = data.FabricName;
        type = data.Fabric_Type;
        Yarnid = CompSlNo;
        if (Mod == 1 || Mod == 2 || CpyMode == 1) {
            var tp = data.Fabric_Type;
            if (tp == 'P') {
                type = 'PANELS'
            }
            else if (tp == 'W') {
                type = 'WOVEN'
            }
            else if (tp == 'K') {
                type = 'KNITS'
            }
        }
        var grp = data.Grouping;

        Chkgroup(grp);

        $.each(ConItemListSave, function () {
            if (this.CompSlNo == Slno) {
                this.GSM = gsm;

            }
        });
        var colorempty = [];
        colorempty = ConItemListSave;

        colorempty = $.grep(colorempty, function (v) {
            return (v.CompSlNo == Slno);
        });

        ConItemList = colorempty;
        loadAdConTable(ConItemList);

        ConsmtnHideCol(type);
        totconwght();

    });
    $(document).on('keyup', '.calclength', function (e) {


        var table = $('#tCPIbody').DataTable();
        var sno = table.row($(this).parents('tr')).data()["CPlanSlNo"];
        var cl = table.row($(this).parents('tr')).data()["CompSlNo"];
        var Val = $(this).val();
        Len = Val;
        fillvar = 'L';
        rowindex = $(this).closest('tr').index();
        indexforfill = rowindex;

        $.each(ConItemList, function () {
            if (this.CPlanSlNo == sno) {
                this.Length = Len;

            }
        });

        //loadAdConTable(ConItemList);        
        var table = $('#tCPIbody').DataTable();
        var data = table.rows().data();

        $('input[id=txtGram]').each(function (ig) {
            if (data[ig].CPlanSlNo == sno) {
                var row = $(this).closest('tr');
                row.find('#txtLen').val(Len);

            }
        });

        $.each(ConItemListSave, function () {
            if (this.CompSlNo == cl && this.CPlanSlNo == sno) {
                this.Length = Len;

            }
        });
        //loadconSaveTable(ConItemListSave);

    });
    $(document).on('keyup', '.calcallowlength', function (e) {


        var table = $('#tCPIbody').DataTable();
        var sno = table.row($(this).parents('tr')).data()["CPlanSlNo"];
        var cl = table.row($(this).parents('tr')).data()["CompSlNo"];
        var Val = $(this).val();
        Len = Val;
        fillvar = 'AL';

        rowindex = $(this).closest('tr').index();
        indexforfill = rowindex;

        $.each(ConItemList, function () {
            if (this.CPlanSlNo == sno) {
                this.AlloLen = Len;

            }
        });

        //loadAdConTable(ConItemList);        
        var table = $('#tCPIbody').DataTable();
        var data = table.rows().data();

        $('input[id=txtGram]').each(function (ig) {
            if (data[ig].CPlanSlNo == sno) {
                var row = $(this).closest('tr');
                row.find('#txtallowLen').val(Len);

            }
        });

        $.each(ConItemListSave, function () {
            if (this.CompSlNo == cl && this.CPlanSlNo == sno) {
                this.AlloLen = Len;

            }
        });
        //loadconSaveTable(ConItemListSave);

    });
    $(document).on('keyup', '.calcpattern', function (e) {
        debugger;

        var table = $('#tCPIbody').DataTable();
        var CPlan = table.row($(this).parents('tr')).data()["CPlanSlNo"];
        var quantity = table.row($(this).parents('tr')).data()["Prdn_Qty"];
        var len = table.row($(this).parents('tr')).data()["Length"];
        var allowlen = table.row($(this).parents('tr')).data()["AlloLen"];
        var wid = table.row($(this).parents('tr')).data()["Width"];
        var allowwid = table.row($(this).parents('tr')).data()["AllowWid"];
        var gsm = table.row($(this).parents('tr')).data()["GSM"];
        var Colorid = table.row($(this).parents('tr')).data()["ColorID"];
        var Sizeid = table.row($(this).parents('tr')).data()["SizeId"];
        var Sno = table.row($(this).parents('tr')).data()["CompSlNo"];
        var GSizeid = table.row($(this).parents('tr')).data()["GreyWidthID"];
        var FSizeid = table.row($(this).parents('tr')).data()["FinishWidthID"];


        for (var t = 0; t < compList.length; t++) {
            if (compList[t].CompSlNo == Sno) {
                var parts = compList[t].No_Of_Parts;
            }
        }

        var Val = $(this).val();
        Pattern = Val;
        fillvar = 'P';
        rowindex = $(this).closest('tr').index();
        indexforfill = rowindex;

        $.each(ConItemList, function () {
            if (this.CPlanSlNo == CPlan) {
                this.Pattern = Pattern;

            }
        });

        //loadAdConTable(ConItemList);


        $.each(ConItemListSave, function () {
            if (this.CompSlNo == Sno && this.CPlanSlNo == CPlan) {
                this.Pattern = Pattern;

            }
        });
        //loadconSaveTable(ConItemListSave);

        var totlen = parseFloat(len) + parseFloat(allowlen);
        var totwid = parseFloat(allowwid) + parseFloat(wid);
        var res1 = parseFloat(parseFloat(totlen * totwid) / Pattern);


        res1 = res1.toFixed(3);
        var res = (res1 * gsm) / 10000;
        Wght = quantity * res / 1000;

        var finalresult = res.toFixed(3);
        var finalwgt = (Wght * parts).toFixed(3);

        $.each(ConItemList, function () {
            if (this.CPlanSlNo == CPlan) {
                this.Pattern = Pattern;
                this.GSM = gsm;
                this.Grammage = finalresult;
                this.Weight = finalwgt;

            }
        });

        var table = $('#tCPIbody').DataTable();
        var data = table.rows().data();

        $('input[id=txtGram]').each(function (ig) {
            if (data[ig].CPlanSlNo == CPlan) {
                var row = $(this).closest('tr');
                row.find('#txtWidth').val(wid);
                row.find('#txtGsm').val(gsm);
                row.find('#txtGram').val(finalresult);
                row.find('#txtWght').val(finalwgt);
                row.find('#txtPattern').val(Pattern);

            }
        });


        $.each(ConItemListSave, function () {
            if (this.CompSlNo == Sno && this.CPlanSlNo == CPlan) {

                this.GSM = gsm;
                this.Grammage = finalresult;
                this.Weight = finalwgt;
                this.Pattern = Pattern;
            }
        });

        totconwght();
        ConsmtnHideCol(type);


    });
    $(document).on('keyup', '.calcwidth', function (e) {
        debugger;


        var table = $('#tCPIbody').DataTable();
        var CPlan = table.row($(this).parents('tr')).data()["CPlanSlNo"];
        var quantity = table.row($(this).parents('tr')).data()["Prdn_Qty"];
        var len = table.row($(this).parents('tr')).data()["Length"];
        var allowlen = table.row($(this).parents('tr')).data()["AlloLen"];
        var allowwid = table.row($(this).parents('tr')).data()["AllowWid"];
        var gsm = table.row($(this).parents('tr')).data()["GSM"];
        var Colorid = table.row($(this).parents('tr')).data()["ColorID"];
        var Sizeid = table.row($(this).parents('tr')).data()["SizeId"];
        var Sno = table.row($(this).parents('tr')).data()["CompSlNo"];
        var pat = table.row($(this).parents('tr')).data()["Pattern"];
        if (checkpattern == 0) {
            pat = 1;
        } else {
            pat = table.row($(this).parents('tr')).data()["Pattern"];
        }
        for (var t = 0; t < compList.length; t++) {
            if (compList[t].CompSlNo == Sno) {
                var parts = compList[t].No_Of_Parts;
            }
        }

        var Val = $(this).val();
        Width = Val;
        fillvar = 'W';
        rowindex = $(this).closest('tr').index();
        indexforfill = rowindex;

        $.each(ConItemList, function () {
            if (this.CPlanSlNo == CPlan) {
                this.Width = Width;

            }
        });

        //loadAdConTable(ConItemList);


        $.each(ConItemListSave, function () {
            if (this.CompSlNo == Sno && this.CPlanSlNo == CPlan) {
                this.Width = Width;

            }
        });
        //loadconSaveTable(ConItemListSave);
        if (pat == 0) {
            res1 = 0;
        }
        else {
            var totlen = parseFloat(len) + parseFloat(allowlen);
            var totwid = parseFloat(allowwid) + parseFloat(Val);
            var res1 = parseFloat(parseFloat(totlen * totwid) / pat);
        }

        res1 = res1.toFixed(3);
        var res = (res1 * gsm) / 10000;
        Wght = quantity * res / 1000;

        var finalresult = res.toFixed(3);
        var finalwgt = (Wght * parts).toFixed(3);


        //Dia
        var dd = parseFloat(Val) + parseFloat(allowwid);
        dd = parseFloat(dd / 2.54).toFixed(0);


        var r = dd + "DIA";
        var fab = $.grep(Fabriclist, function (e) {

            return e.Size == r;

        });
        var fid = 0;
        var fn = '';

        if (fab.length == 0 && dd != 0) {

            DiaSize = r;
            //SizeAdd(r);

            $.when($.ajax(SizeAdd(r))).done(function getfabric() {

                var fabres = $.grep(Fabriclist, function (e) {

                    return e.Size == DiaSize;

                });
                fid = fabres[0].SizeId;
                fn = fabres[0].Size;

                $.each(ConItemList, function () {
                    if (this.CPlanSlNo == CPlan) {

                        this.GSM = gsm;
                        this.Grammage = finalresult;
                        this.Weight = finalwgt;

                        this.FinishWidthID = fid;
                        this.FinishWidth = fn;
                        this.GreyWidthID = fid;
                        this.GreyWidth = fn;

                    }
                });

                loadAdConTable(ConItemList);
                $.each(ConItemListSave, function () {
                    if (this.CompSlNo == Sno && this.CPlanSlNo == CPlan) {
                        this.Pattern = pat;
                        this.GSM = gsm;
                        this.Grammage = finalresult;
                        this.Weight = finalwgt;
                    }
                });
                var totalcgpqt = 0;
                for (var e = 0; e < ConItemListSave.length; e++) {
                    var cgpcs = ConItemListSave[e].Grammage;
                    totalcgpqt = totalcgpqt + parseFloat(cgpcs);

                }
                var TgmWeight = (totalcgpqt.toFixed(3));
                $('#txtWeight').val("");
                $('#txtActualWeight').val("");
                ConsmtnHideCol(type);
            });
        }
        else {
            DiaSize = r;
            if (dd == 0) {
                fid = 0;
                fn = '--Select--';
            }
            else {

                var fabres = $.grep(Fabriclist, function (e) {

                    return e.Size == DiaSize;

                });
                fid = fabres[0].SizeId;
                fn = fabres[0].Size;
            }
            $.each(ConItemList, function () {
                if (this.CPlanSlNo == CPlan) {

                    this.GSM = gsm;
                    this.Grammage = finalresult;
                    this.Weight = finalwgt;

                    this.FinishWidthID = fid;
                    this.FinishWidth = fn;
                    this.GreyWidthID = fid;
                    this.GreyWidth = fn;

                }
            });

            loadAdConTable(ConItemList);
            $.each(ConItemListSave, function () {
                if (this.CompSlNo == Sno && this.CPlanSlNo == CPlan) {
                    this.Pattern = pat;
                    this.GSM = gsm;
                    this.Grammage = finalresult;
                    this.Weight = finalwgt;
                }
            });
            var totalcgpqt = 0;
            for (var e = 0; e < ConItemListSave.length; e++) {
                var cgpcs = ConItemListSave[e].Grammage;
                totalcgpqt = totalcgpqt + parseFloat(cgpcs);

            }
            var TgmWeight = (totalcgpqt.toFixed(1));
            $('#txtWeight').val("");
            $('#txtActualWeight').val("");


            ConsmtnHideCol(type);
        }
        //Datatable textbox focus
        var rows = $("#tCPIbody").dataTable().fnGetNodes();
        var dtTable = $('#tCPIbody').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
            $('input[id=txtWidth]').each(function () {
                if (sn == CPlan && $(this).val() == Val) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtWidth').val();
                    row.find('#txtWidth').focus().val('').val(num);
                    return true;
                }
            });
        }
        totconwght();
    });
    $(document).on('keyup', '.calcallowwidth', function (e) {
        debugger;

        var table = $('#tCPIbody').DataTable();
        var CPlan = table.row($(this).parents('tr')).data()["CPlanSlNo"];
        var quantity = table.row($(this).parents('tr')).data()["Prdn_Qty"];
        var len = table.row($(this).parents('tr')).data()["Length"];
        var allowlen = table.row($(this).parents('tr')).data()["AlloLen"];
        var wid = table.row($(this).parents('tr')).data()["Width"];
        var gsm = table.row($(this).parents('tr')).data()["GSM"];
        var Colorid = table.row($(this).parents('tr')).data()["ColorID"];
        var Sizeid = table.row($(this).parents('tr')).data()["SizeId"];
        var Sno = table.row($(this).parents('tr')).data()["CompSlNo"];
        var pat = table.row($(this).parents('tr')).data()["Pattern"];

        if (checkpattern == 0) {
            pat = 1;
        } else {
            pat = table.row($(this).parents('tr')).data()["Pattern"];
        }

        for (var t = 0; t < compList.length; t++) {
            if (compList[t].CompSlNo == Sno) {
                var parts = compList[t].No_Of_Parts;
            }
        }

        var Val = $(this).val();
        Width = Val;
        fillvar = 'AW';
        rowindex = $(this).closest('tr').index();
        indexforfill = rowindex;

        $.each(ConItemList, function () {
            if (this.CPlanSlNo == CPlan && this.CompSlNo == Sno) {
                this.AllowWid = parseFloat(Val);

            }
        });


        $.each(ConItemListSave, function () {
            if (this.CPlanSlNo == CPlan && this.CompSlNo == Sno) {
                this.AllowWid = parseFloat(Val);

            }
        });

        if (pat == 0) {
            res1 = 0;
        }
        else {
            var totlen = parseFloat(len) + parseFloat(allowlen);
            var totwid = parseFloat(wid) + parseFloat(Val);
            var res1 = parseFloat(parseFloat(totlen * totwid) / pat);
        }

        res1 = res1.toFixed(3);
        var res = (res1 * gsm) / 10000;
        Wght = quantity * res / 1000;

        var finalresult = res.toFixed(3);
        var finalwgt = (Wght * parts).toFixed(3);


        //Dia
        var dd = parseFloat(Val) + parseFloat(wid);
        dd = parseFloat(dd / 2.54).toFixed(0);
        var r = dd + "DIA";
        var fab = $.grep(Fabriclist, function (e) {

            return e.Size == r;

        });
        var fid = 0;
        var fn = '';
        if (fab.length == 0 && dd != 0) {

            DiaSize = r;
            //SizeAdd(r);

            $.when($.ajax(SizeAdd(r))).done(function getfabric() {

                var fabres = $.grep(Fabriclist, function (e) {

                    return e.Size == DiaSize;

                });
                fid = fabres[0].SizeId;
                fn = fabres[0].Size;
                $.each(ConItemList, function () {
                    if (this.CPlanSlNo == CPlan) {
                        this.Pattern = pat;
                        this.GSM = gsm;
                        this.Grammage = finalresult;
                        this.Weight = finalwgt;
                        this.FinishWidthID = fid;
                        this.FinishWidth = fn;
                        this.GreyWidthID = fid;
                        this.GreyWidth = fn;
                    }
                });

                // loadAdConTable(ConItemList);


                var table = $('#tCPIbody').DataTable();
                var data = table.rows().data();

                $('input[id=txtalloeWidth]').each(function (ig) {
                    if (data[ig].CPlanSlNo == CPlan) {
                        var row = $(this).closest('tr');
                        row.find('#txtLen').val(len);
                        row.find('#txtallowLen').val(allowlen);
                        row.find('#txtWidth').val(wid);
                        row.find('#txtalloeWidth').val(Val);
                        row.find('#txtGsm').val(gsm);
                        row.find('#txtGram').val(finalresult);
                        row.find('#txtWght').val(finalwgt);

                    }
                });

                $.each(ConItemListSave, function () {
                    if (this.CPlanSlNo == CPlan) {

                        this.GSM = gsm;
                        this.Grammage = finalresult;
                        this.Weight = finalwgt;
                        this.FinishWidthID = fid;
                        this.FinishWidth = fn;
                        this.GreyWidthID = fid;
                        this.GreyWidth = fn;
                    }
                });
                $('#txtWeight').val("");
                $('#txtActualWeight').val("");
                ConsmtnHideCol(type);
            });
        }
        else {
            DiaSize = r;
            //SizeAdd(r);          
            if (dd == 0) {
                fid = 0;
                fn = '--Select--';
            }
            else {
                var fabres = $.grep(Fabriclist, function (e) {

                    return e.Size == DiaSize;

                });
                fid = fabres[0].SizeId;
                fn = fabres[0].Size;
            }
            $.each(ConItemList, function () {
                if (this.CPlanSlNo == CPlan && this.CompSlNo == Sno) {
                    this.Pattern = pat;
                    this.GSM = gsm;
                    this.Grammage = finalresult;
                    this.Weight = finalwgt;
                    this.FinishWidthID = fid;
                    this.FinishWidth = fn;
                    this.GreyWidthID = fid;
                    this.GreyWidth = fn;
                }
            });
            var table = $('#tCPIbody').DataTable();
            var data = table.rows().data();

            $('input[id=txtalloeWidth]').each(function (ig) {
                if (data[ig].CPlanSlNo == CPlan) {
                    var row = $(this).closest('tr');
                    row.find('#txtLen').val(len);
                    row.find('#txtallowLen').val(allowlen);
                    row.find('#txtWidth').val(wid);
                    row.find('#txtalloeWidth').val(Val);
                    row.find('#txtGsm').val(gsm);
                    row.find('#txtGram').val(finalresult);
                    row.find('#txtWght').val(finalwgt);

                }
            });
            $.each(ConItemListSave, function () {
                if (this.CPlanSlNo == CPlan && this.CompSlNo == Sno) {

                    this.GSM = gsm;
                    this.Grammage = finalresult;
                    this.Weight = finalwgt;
                    this.FinishWidthID = fid;
                    this.FinishWidth = fn;
                    this.GreyWidthID = fid;
                    this.GreyWidth = fn;
                }
            });
            $('#txtWeight').val("");
            $('#txtActualWeight').val("");
            ConsmtnHideCol(type);
        }
        //Datatable textbox focus
        var rows = $("#tCPIbody").dataTable().fnGetNodes();
        var dtTable = $('#tCPIbody').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
            $('input[id=txtalloeWidth]').each(function () {
                if (sn == CPlan && $(this).val() == Val) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtalloeWidth').val();
                    row.find('#txtalloeWidth').focus().val('').val(num);
                    return true;
                }
            });
        }
        totconwght();
    });
    $(document).on('keyup', '.calcgsm', function (e) {
        debugger;

        var table = $('#tCPIbody').DataTable();
        var quantity = table.row($(this).parents('tr')).data()["Prdn_Qty"];
        var CPlan = table.row($(this).parents('tr')).data()["CPlanSlNo"];
        var sno = table.row($(this).parents('tr')).data()["CompSlNo"];
        var len = table.row($(this).parents('tr')).data()["Length"];
        var alwlen = table.row($(this).parents('tr')).data()["AlloLen"];
        var wid = table.row($(this).parents('tr')).data()["Width"];
        var pat = table.row($(this).parents('tr')).data()["Pattern"];
        var alwwid = table.row($(this).parents('tr')).data()["AllowWid"];
        var Colorid = table.row($(this).parents('tr')).data()["ColorID"];
        var Sizeid = table.row($(this).parents('tr')).data()["SizeId"];


        for (var t = 0; t < compList.length; t++) {
            if (compList[t].CompSlNo == sno) {
                var parts = compList[t].No_Of_Parts;
            }
        }
        var Val = $(this).val();

        CGsm = Val;
        fillvar = 'GS';
        indexforfill = index;

        var IQty = 0;
        if (Val == 0) {
            IQty = 0;
        }
        else {
            IQty = Val;
        }

        var field = Val;
        if (!field.match(/^[\-\+]?[\d\,]*\.?[\d]*$/)) {
            $.each(ConItemList, function () {
                if (this.CPlanSlNo == CPlan) {
                    this.Grammage = 0;
                }
            });
            //loadAdConTable(ConItemList);

            var table = $('#tCPIbody').DataTable();
            var data = table.rows().data();

            $('input[id=txtGram]').each(function (ig) {
                if (data[ig].CPlanSlNo == CPlan) {
                    var row = $(this).closest('tr');
                    row.find('#txtGram').val(0);

                }
            });
            return false;
        }

        if (pat == 0) {
            res1 = 0;
        }
        else {
            var totlen = parseFloat(len) + parseFloat(alwlen);
            var totwid = parseFloat(wid) + parseFloat(alwwid);
            var res1 = parseFloat(parseFloat(totlen * totwid) / pat);
        }

        res1 = res1.toFixed(3);
        var res = (res1 * CGsm) / 10000;
        Wght = quantity * res / 1000;

        var finalresult = res.toFixed(3);
        var finalwgt = (Wght * parts).toFixed(3);


        $.each(ConItemList, function () {
            if (this.CPlanSlNo == CPlan) {
                this.Length = len;
                this.AlloLen = alwlen;
                this.Width = wid;
                this.AllowWid = alwwid;
                this.GSM = CGsm;
                this.Grammage = finalresult;
                this.Weight = Wght;
            }
        });

        //loadAdConTable(ConItemList);


        var table = $('#tCPIbody').DataTable();
        var data = table.rows().data();

        $('input[id=txtGram]').each(function (ig) {
            if (data[ig].CPlanSlNo == CPlan) {
                var row = $(this).closest('tr');
                row.find('#txtLen').val(len);
                row.find('#txtallowLen').val(alwlen);
                row.find('#txtWidth').val(wid);
                row.find('#txtalloeWidth').val(alwwid);
                row.find('#txtGsm').val(CGsm);
                row.find('#txtGram').val(finalresult);
                row.find('#txtWght').val(Wght);

            }
        });

        $.each(ConItemListSave, function () {
            if (this.CPlanSlNo == CPlan) {
                this.Length = len;
                this.AlloLen = alwlen;
                this.Width = wid;
                this.AllowWid = alwwid;
                this.GSM = CGsm;
                this.Grammage = finalresult;
                this.Weight = Wght;
            }
        });

        var rows = $("#tCPIbody").dataTable().fnGetNodes();
        var dtTable = $('#tCPIbody').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
            $('input[id=txtGsm]').each(function () {
                if (sn == CPlan && $(this).val() == Val) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtGsm').val();
                    row.find('#txtGsm').focus().val('').val(num);
                    return true;
                }
            });
        }
        totconwght();
    });
    $(document).on('keyup', '.calcwovwtmt', function (e) {
        debugger;
        var table = $('#tCPIbody').DataTable();
        var quantity = table.row($(this).parents('tr')).data()["Prdn_Qty"];
        var tmt = table.row($(this).parents('tr')).data()["TotMetres"];
        var CPlan = table.row($(this).parents('tr')).data()["CPlanSlNo"];
        var Sno = table.row($(this).parents('tr')).data()["CompSlNo"];
        var Colorid = table.row($(this).parents('tr')).data()["ColorID"];
        var Sizeid = table.row($(this).parents('tr')).data()["SizeId"];
        var rq = table.row($(this).parents('tr')).data()["Requirement"];

        var Val = $(this).val();

        fillvar = 'WOVMET';
        index;
        rowindex = $(this).closest('tr').index();
        indexforfill = rowindex;

        var wt = (Val * tmt) / 1000;
        wt = wt.toFixed(3);
        $.each(ConItemList, function () {
            if (this.CPlanSlNo == CPlan && this.CompSlNo == Sno) {
                this.WtMetre = Val;
                this.Weight = wt;
            }
        });

        var data = table.rows().data();

        $('input[id=txtWtmtWov]').each(function (ind) {
            if (data[ind].CPlanSlNo == CPlan && data[ind].CompSlNo == Sno) {
                var row = $(this).closest('tr');
                row.find('#txtWght').val(wt);
            }
        });
        $.each(ConItemListSave, function () {
            if (this.CPlanSlNo == CPlan && this.CompSlNo == Sno) {
                this.WtMetre = Val;
                this.Weight = wt;
            }
        });
        loadconSaveTable(ConItemListSave);


        for (var e = 0; e < PlanCompFabricDet.length; e++) {
            if (PlanCompFabricDet[e].Woven_Req_InMtrs == undefined) {
                PlanCompFabricDet[e].Woven_Req_InMtrs = 0;
            }
        }

        for (var e = 0; e < PlanCompFabricDetSave.length; e++) {
            if (PlanCompFabricDetSave[e].Woven_Req_InMtrs == undefined) {
                PlanCompFabricDetSave[e].Woven_Req_InMtrs = 0;
            }
        }
        if (Colorid > 0 && Sizeid > 0) {
            var fd = 0;
            var s = 0;
            var bclrid = 0;
            var bclr = '';
            $.each(PlanCompFabricDet, function () {
                if (this.ColorID == Colorid && this.SizeId == Sizeid && this.CompSlNo == Sno) {
                    this.ActWeight = tmt;
                    this.Weight = tmt;
                    this.Grammage = Val;
                    this.Woven_Req_InMtrs = ((this.Weight * Val) / 1000).toFixed(3);
                    bclrid = this.BColorID;
                    bclr = this.Bcolor;
                }
            });

            $.each(PlanCompFabricDet, function () {
                if (this.CompSlNo == Sno) {
                    this.BColorPQty = 0;
                    this.FColorPQty = 0;
                }
            });
            //loadCompFabTable(PlanCompFabricDet);

            var fabtable = $('#tCDbody').DataTable();
            var fabdata = fabtable.rows().data();

            $('input[id=txtPurQty]').each(function (ig) {
                if (fabdata[ig].ColorID == Colorid && fabdata[ig].SizeId == Sizeid && fabdata[ig].CompSlNo == Sno) {
                    var row = $(this).closest('tr');
                    row.find('#txtfabActwt').val(tmt);
                    row.find('#txtfabwt').val(tmt);
                    //row.find('#txtfabgram').val(ratecal);
                }
            });

            $('input[id=txtPurQty]').each(function (ig) {
                if (fabdata[ig].CompSlNo == Sno) {
                    var row = $(this).closest('tr');
                    row.find('#txtPurQty').val(0);
                    row.find('#txtFPurQty').val(0);
                }
            });


            $.each(PlanCompFabricDetSave, function () {
                if (this.ColorID == Colorid && this.SizeId == Sizeid && this.CompSlNo == Sno) {
                    this.ActWeight = tmt;
                    this.Weight = tmt;
                    this.Grammage = Val;
                    this.Woven_Req_InMtrs = ((this.Weight * Val) / 1000).toFixed(3);
                }
            });
            $.each(PlanCompFabricDetSave, function () {
                if (this.CompSlNo == Sno) {
                    this.BColorPQty = 0;
                    this.FColorPQty = 0;
                }
            });
            loadCompFabSaveTable(PlanCompFabricDetSave);

            $('#txtWeight').val("");
            $('#txtActualWeight').val("");




        }
        if (Colorid > 0 && Sizeid == 0) {

            var fd = 0;
            var s = 0;
            var bclrid = 0;
            var bclr = '';
            $.each(PlanCompFabricDet, function () {
                if (this.ColorID == Colorid && this.CompSlNo == Sno) {
                    this.ActWeight = ((this.Prdn_Qty * rq) / 100).toFixed(3);
                    this.Weight = ((this.Prdn_Qty * rq) / 100).toFixed(3);
                    this.Grammage = Val;
                    this.Woven_Req_InMtrs = ((this.Weight * Val) / 1000).toFixed(3);
                    bclrid = this.BColorID;
                    bclr = this.Bcolor;
                }
            });

            $.each(PlanCompFabricDet, function () {
                if (this.CompSlNo == Sno) {
                    this.BColorPQty = 0;
                    this.FColorPQty = 0;
                }
            });
            //loadCompFabTable(PlanCompFabricDet);

            var fabtable = $('#tCDbody').DataTable();
            var fabdata = fabtable.rows().data();

            $('input[id=txtPurQty]').each(function (ig) {
                if (fabdata[ig].ColorID == Colorid && fabdata[ig].CompSlNo == Sno) {
                    var row = $(this).closest('tr');
                    var t = row.find('#txtfabPrdQty').val();
                    var re = t * rq;
                    re = (re / 100).toFixed(3);
                    row.find('#txtfabActwt').val(re);
                    row.find('#txtfabwt').val(re);
                    //row.find('#txtfabgram').val(ratecal);
                }
            });

            $('input[id=txtPurQty]').each(function (ig) {
                if (fabdata[ig].CompSlNo == Sno) {
                    var row = $(this).closest('tr');
                    row.find('#txtPurQty').val(0);
                    row.find('#txtFPurQty').val(0);
                }
            });


            $.each(PlanCompFabricDetSave, function () {
                if (this.ColorID == Colorid && this.CompSlNo == Sno) {
                    this.ActWeight = ((this.Prdn_Qty * rq) / 100).toFixed(3);
                    this.Weight = ((this.Prdn_Qty * rq) / 100).toFixed(3);
                    this.Grammage = Val;
                    this.Woven_Req_InMtrs = ((this.Weight * Val) / 1000).toFixed(3);
                }
            });
            $.each(PlanCompFabricDetSave, function () {
                if (this.CompSlNo == Sno) {
                    this.BColorPQty = 0;
                    this.FColorPQty = 0;
                }
            });
            loadCompFabSaveTable(PlanCompFabricDetSave);

            $('#txtWeight').val("");
            $('#txtActualWeight').val("");



        }
        if (Colorid == 0 && Sizeid > 0) {

            var fd = 0;
            var s = 0;
            var bclrid = 0;
            var bclr = '';
            $.each(PlanCompFabricDet, function () {
                if (this.SizeId == Sizeid && this.CompSlNo == Sno) {
                    this.ActWeight = ((this.Prdn_Qty * rq) / 100).toFixed(3);
                    this.Weight = ((this.Prdn_Qty * rq) / 100).toFixed(3);
                    this.Grammage = Val;
                    this.Woven_Req_InMtrs = ((this.Weight * Val) / 1000).toFixed(3);
                    bclrid = this.BColorID;
                    bclr = this.Bcolor;
                }
            });

            $.each(PlanCompFabricDet, function () {
                if (this.CompSlNo == Sno) {
                    this.BColorPQty = 0;
                    this.FColorPQty = 0;
                }
            });
            //loadCompFabTable(PlanCompFabricDet);

            var fabtable = $('#tCDbody').DataTable();
            var fabdata = fabtable.rows().data();

            $('input[id=txtPurQty]').each(function (ig) {
                if (fabdata[ig].SizeId == Sizeid && fabdata[ig].CompSlNo == Sno) {
                    var row = $(this).closest('tr');
                    var t = row.find('#txtfabPrdQty').val();
                    var re = t * rq;
                    re = (re / 100).toFixed(3);
                    row.find('#txtfabActwt').val(re);
                    row.find('#txtfabwt').val(re);
                    //row.find('#txtfabgram').val(ratecal);
                }
            });

            $('input[id=txtPurQty]').each(function (ig) {
                if (fabdata[ig].CompSlNo == Sno) {
                    var row = $(this).closest('tr');
                    row.find('#txtPurQty').val(0);
                    row.find('#txtFPurQty').val(0);
                }
            });


            $.each(PlanCompFabricDetSave, function () {
                if (this.SizeId == Sizeid && this.CompSlNo == Sno) {
                    this.ActWeight = ((this.Prdn_Qty * rq) / 100).toFixed(3);
                    this.Weight = ((this.Prdn_Qty * rq) / 100).toFixed(3);
                    this.Grammage = Val;
                    this.Woven_Req_InMtrs = ((this.Weight * Val) / 1000).toFixed(3);
                }
            });
            $.each(PlanCompFabricDetSave, function () {
                if (this.CompSlNo == Sno) {
                    this.BColorPQty = 0;
                    this.FColorPQty = 0;
                }
            });
            loadCompFabSaveTable(PlanCompFabricDetSave);

            $('#txtWeight').val("");
            $('#txtActualWeight').val("");

            ////yarn

            //var totalamnt = 0;
            //for (var e = 0; e < ConItemList.length; e++) {

            //    var amount = ConItemList[e].Weight;
            //    totalamnt = totalamnt + parseFloat(amount);

            //}

            //totalamnt = totalamnt.toFixed(3);
            //for (var e = 0; e < PlanYarnSave.length; e++) {
            //    if (PlanYarnSave[e].SlNo == Sno && PlanYarnSave[e].BColor == bclr) {
            //        PlanYarnSave[e].Fabric_Weight = (totalamnt);
            //    }
            //}
            //loadYarnSavedetTab(PlanYarnSave);


            //PlanYarn = $.grep(PlanYarnSave, function (e) {
            //    return e.SlNo == Sno;
            //});
            //loadYarndetTab(PlanYarn);

            //totwght();

            ////Yarndet

            //if (PlanYarnDetSave.length > 0) {

            //    for (var b = 0; b < PlanYarnSave.length; b++) {
            //        var pysl = PlanYarnSave[b].YSlno;
            //        var cmpsl = PlanYarnSave[b].SlNo;
            //        var wgt = PlanYarnSave[b].Fabric_Weight;
            //        for (var m = 0; m < PlanYarnDetSave.length; m++) {
            //            if (PlanYarnDetSave[m].CompSno == cmpsl && PlanYarnDetSave[m].YSlNo == pysl) {
            //                var pr = PlanYarnDetSave[m].Knit_In_Per;
            //                var re = parseFloat((pr * wgt) / 100);
            //                re = re.toFixed(3);
            //                PlanYarnDetSave[m].Knit_In_Qty = re;
            //                PlanYarnDetSave[m].Knit_In_ActQty = re;
            //            }
            //        }
            //    }
            //    PlanYarnDet = $.grep(PlanYarnDetSave, function (e) {
            //        return e.CompSno == CompSlNo;
            //    });
            //    Loadsepyarn(PlanYarnDet);
            //    LoadsepSaveyarn(PlanYarnDetSave);
            //}
        }
        if (Colorid == 0 && Sizeid == 0) {
            $.each(PlanCompFabricDet, function () {
                if (this.CompSlNo == Sno) {

                    //this.ActWeight = tmt;
                    //this.Weight = tmt;
                    this.Woven_Req_InMtrs = ((this.Weight * Val) / 1000).toFixed(3);
                    var s = this.snumb;
                    this.Grammage = Val;
                    //var fabtable = $('#tCDbody').DataTable();
                    //var fabdata = fabtable.rows().data();

                    //$('input[id=txtPurQty]').each(function (ig) {
                    //    if (fabdata[ig].snumb == s && fabdata[ig].CompSlNo == Sno) {
                    //        var row = $(this).closest('tr');
                    //        row.find('#txtfabActwt').val(tmt);
                    //        row.find('#txtfabwt').val(tmt);
                    //        //row.find('#txtfabgram').val(ratecal);
                    //    }
                    //});
                }
            });


            $.each(PlanCompFabricDet, function () {
                if (this.CompSlNo == Sno) {
                    this.BColorPQty = 0;
                    this.FColorPQty = 0;
                }
            });

            var fabtable = $('#tCDbody').DataTable();
            var fabdata = fabtable.rows().data();
            $('input[id=txtPurQty]').each(function (ig) {
                if (fabdata[ig].CompSlNo == Sno) {
                    var row = $(this).closest('tr');
                    row.find('#txtPurQty').val(0);
                    row.find('#txtFPurQty').val(0);
                }
            });
            $.each(PlanCompFabricDetSave, function () {
                if (this.CompSlNo == Sno) {
                    //this.ActWeight = tmt;
                    //this.Weight = tmt;
                    this.Grammage = Val;
                    this.Woven_Req_InMtrs = ((this.Weight * Val) / 1000).toFixed(3);
                }
            });

            $.each(PlanCompFabricDetSave, function () {
                if (this.CompSlNo == Sno) {
                    this.BColorPQty = 0;
                    this.FColorPQty = 0;
                }
            });

            loadCompFabSaveTable(PlanCompFabricDetSave);

            $('#txtWeight').val("");
            $('#txtActualWeight').val("");

            ////yarn

            //var totalamnt = 0;
            //for (var e = 0; e < ConItemList.length; e++) {

            //    var amount = ConItemList[e].Weight;
            //    totalamnt = totalamnt + parseFloat(amount);

            //}

            //totalamnt = totalamnt.toFixed(3);
            //for (var e = 0; e < PlanYarnSave.length; e++) {
            //    if (PlanYarnSave[e].SlNo == Sno) {
            //        PlanYarnSave[e].Fabric_Weight = (totalamnt);
            //    }
            //}
            //loadYarnSavedetTab(PlanYarnSave);


            //PlanYarn = $.grep(PlanYarnSave, function (e) {
            //    return e.SlNo == Sno;
            //});
            //loadYarndetTab(PlanYarn);

            //totwght();

            ////Yarndet

            //if (PlanYarnDetSave.length > 0) {

            //    for (var b = 0; b < PlanYarnSave.length; b++) {
            //        var pysl = PlanYarnSave[b].YSlno;
            //        var cmpsl = PlanYarnSave[b].SlNo;
            //        var wgt = PlanYarnSave[b].Fabric_Weight;
            //        for (var m = 0; m < PlanYarnDetSave.length; m++) {
            //            if (PlanYarnDetSave[m].CompSno == cmpsl && PlanYarnDetSave[m].YSlNo == pysl) {
            //                var pr = PlanYarnDetSave[m].Knit_In_Per;
            //                var re = parseFloat((pr * wgt) / 100);
            //                re = re.toFixed(3);
            //                PlanYarnDetSave[m].Knit_In_Qty = re;
            //                PlanYarnDetSave[m].Knit_In_ActQty = re;
            //            }
            //        }
            //    }
            //    PlanYarnDet = $.grep(PlanYarnDetSave, function (e) {
            //        return e.CompSno == CompSlNo;
            //    });
            //    Loadsepyarn(PlanYarnDet);
            //    LoadsepSaveyarn(PlanYarnDetSave);
            //}

        }
        //yarn
        var result = [];
        $.each(PlanCompFabricDet, function (i, e) {
            var matchingItems = $.grep(result, function (item) {
                return item.BColorID === e.BColorID;
            });
            if (matchingItems.length === 0) {
                result.push(e);
            }
        });



        if (result.length > 0) {
            //PlanYarnSave = [];
            PlanYarn = [];

            PlanYarnSave = jQuery.grep(PlanYarnSave, function (value) {
                return value.SlNo != CompSlNo;
            });
            //PlanYarnSave = jQuery.grep(yarnlist, function (value) {
            //    return value.FabricID != fd;
            //});

            var Cs = result[0].CompSlNo;
            var ComponentId = 0;
            var Component = '';
            for (var t = 0; t < compList.length; t++) {
                if (compList[t].CompSlNo == Cs) {
                    ComponentId = compList[t].ComponentID;
                    Component = compList[t].ComponentName;
                }
            }

            //if (Mod != 0) {
            //    PlanYarnSave = $.grep(PlanYarnSave, function (e) {
            //        return e.SlNo != CompSlNo;
            //    });
            //}
            for (var j = 0; j < result.length; j++) {


                if (PlanYarn.length == 0) {
                    leng = 1;

                }
                else {
                    leng++;

                }
                var bd = 0;
                bd = result[j].BColorID;
                var snumb = result[j].snumb;
                var csln = result[j].CompSlNo;
                var totalqty = 0;
                for (var u = 0; u < PlanCompFabricDetSave.length; u++) {
                    if (PlanCompFabricDetSave[u].BColorID == bd && PlanCompFabricDetSave[u].CompSlNo == csln) {

                        var qty = PlanCompFabricDetSave[u].Woven_Req_InMtrs;
                        totalqty = totalqty + parseFloat(qty);
                    }
                }


                //var bcqty = 0;
                //for (var r = 0; r < PlanCompFabricDetSave.length; r++) {
                //    if (PlanCompFabricDetSave[r].BColorID == bd && PlanCompFabricDetSave[r].CompSlNo == s) {

                //        var qty = PlanCompFabricDetSave[r].BColorPQty;
                //        bcqty = bcqty + parseFloat(qty);
                //    }
                //}


                //var finqty = 0;
                //for (var n = 0; n < PlanCompFabricDetSave.length; n++) {
                //    if (PlanCompFabricDetSave[n].BColorID == bd && PlanCompFabricDetSave[n].CompSlNo == s) {

                //        var qty = PlanCompFabricDetSave[n].FColorPQty;
                //        finqty = finqty + parseFloat(qty);
                //    }
                //}


                //var totclrqty = parseFloat(bcqty) + parseFloat(finqty);


                //totalqty = totalqty - totclrqty;
                totalqty = totalqty.toFixed(3);


                var yarnlistobj = {
                    PlanId: 0,
                    Fabric: result[j].Fabric,
                    FabricID: result[j].FabricID,
                    Fabric_ColorId: result[j].BColorID,
                    Fabric_Weight: totalqty,
                    Fabric_type: result[j].type,//result[j].FabricType,
                    EntryDate: new Date($('#txtEntryDate').val()),
                    BColor: result[j].Bcolor,
                    SlNo: result[j].CompSlNo,
                    YPlanmasID: 0,
                    YSlno: leng,
                    ComponentId: ComponentId,
                    Component: Component
                }




                PlanYarnSave.push(yarnlistobj);
                PlanYarn.push(yarnlistobj);
            }
        }

        //loadYarndetTab
        PlanYarnSave = jQuery.grep(PlanYarnSave, function (value) {
            return value.Fabric_Weight != 0;
        });
        PlanYarn = jQuery.grep(PlanYarn, function (value) {
            return value.Fabric_Weight != 0;
        });
        loadYarnSavedetTab(PlanYarnSave);

        loadYarndetTab(PlanYarn);
        //Yarndet

        if (PlanYarnDetSave.length > 0) {

            for (var b = 0; b < PlanYarnSave.length; b++) {
                var pysl = PlanYarnSave[b].YSlno;
                var cmpsl = PlanYarnSave[b].SlNo;
                var wgt = PlanYarnSave[b].Fabric_Weight;
                for (var m = 0; m < PlanYarnDetSave.length; m++) {
                    if (PlanYarnDetSave[m].CompSno == cmpsl && PlanYarnDetSave[m].YSlNo == pysl) {
                        var pr = PlanYarnDetSave[m].Knit_In_Per;
                        var re = parseFloat((pr * wgt) / 100);
                        re = re.toFixed(3);
                        PlanYarnDetSave[m].Knit_In_Qty = re;
                        PlanYarnDetSave[m].Knit_In_ActQty = re;
                        //PlanYarnDetSave[m].FabricID = FabricId;
                    }
                }
            }
            PlanYarnDet = $.grep(PlanYarnDetSave, function (e) {
                return e.CompSno == CompSlNo;
            });
            Loadsepyarn(PlanYarnDet);
            LoadsepSaveyarn(PlanYarnDetSave);
        }

    });
    $(document).on('keyup', '.calcreqmnt', function (e) {
        debugger;
        var table = $('#tCPIbody').DataTable();
        var quantity = table.row($(this).parents('tr')).data()["Prdn_Qty"];
        var wtmt = table.row($(this).parents('tr')).data()["WtMetre"];
        var CPlan = table.row($(this).parents('tr')).data()["CPlanSlNo"];
        var Sno = table.row($(this).parents('tr')).data()["CompSlNo"];
        var Colorid = table.row($(this).parents('tr')).data()["ColorID"];
        var Sizeid = table.row($(this).parents('tr')).data()["SizeId"];

        var Val = $(this).val();
        var protype = $('input[name="Opttype"]:checked').attr('value');
        if (Mod == 1 || Mod == 2) {
            parts = table.row($(this).parents('tr')).data()["No_Of_Parts"];
        }
        fillvar = 'REQMNT';
        index;
        rowindex = $(this).closest('tr').index();
        indexforfill = rowindex;

        var conval = 0;
        if (protype == 'C') {
            conval = 1;
        }
        else {
            conval = 2.54;
        }

        var res = (Val * conval) / 100;
        var totmet = res * quantity * parts;
        totmet = totmet.toFixed(3);
        $.each(ConItemList, function () {
            if (this.CPlanSlNo == CPlan && this.CompSlNo == Sno) {
                this.Requirement = Val;
                this.TotMetres = totmet;
            }
        });

        var data = table.rows().data();

        $('input[id=txtReqmnt]').each(function (ind) {
            if (data[ind].CPlanSlNo == CPlan && data[ind].CompSlNo == Sno) {
                var row = $(this).closest('tr');
                row.find('#txtTotMetWov').val(totmet);
            }
        });
        $.each(ConItemListSave, function () {
            if (this.CPlanSlNo == CPlan && this.CompSlNo == Sno) {
                this.Requirement = Val;
                this.TotMetres = totmet;
            }
        });
        loadconSaveTable(ConItemListSave);

        if (wtmt > 0) {
            var wt = (wtmt * totmet) / 1000;
            wt = wt.toFixed(3);
            $.each(ConItemList, function () {
                if (this.CPlanSlNo == CPlan && this.CompSlNo == Sno) {
                    this.WtMetre = wtmt;
                    this.Weight = wt;
                }
            });

            var data = table.rows().data();

            $('input[id=txtWtmtWov]').each(function (ind) {
                if (data[ind].CPlanSlNo == CPlan && data[ind].CompSlNo == Sno) {
                    var row = $(this).closest('tr');
                    row.find('#txtWght').val(wt);
                }
            });
            $.each(ConItemListSave, function () {
                if (this.CPlanSlNo == CPlan && this.CompSlNo == Sno) {
                    this.WtMetre = wtmt;
                    this.Weight = wt;
                }
            });
            loadconSaveTable(ConItemListSave);
        }

        if (Colorid > 0 && Sizeid > 0) {
            var fd = 0;
            var s = 0;
            var bclrid = 0;
            var bclr = '';
            $.each(PlanCompFabricDet, function () {
                if (this.ColorID == Colorid && this.SizeId == Sizeid && this.CompSlNo == Sno) {
                    this.ActWeight = totmet;
                    this.Weight = totmet;
                    this.Woven_Req_InMtrs = wt;
                    this.Grammage = wtmt;
                    bclrid = this.BColorID;
                    bclr = this.Bcolor;
                }
            });

            $.each(PlanCompFabricDet, function () {
                if (this.CompSlNo == Sno) {
                    this.BColorPQty = 0;
                    this.FColorPQty = 0;
                }
            });
            //loadCompFabTable(PlanCompFabricDet);

            var fabtable = $('#tCDbody').DataTable();
            var fabdata = fabtable.rows().data();

            $('input[id=txtPurQty]').each(function (ig) {
                if (fabdata[ig].ColorID == Colorid && fabdata[ig].SizeId == Sizeid && fabdata[ig].CompSlNo == Sno) {
                    var row = $(this).closest('tr');
                    row.find('#txtfabActwt').val(totmet);
                    row.find('#txtfabwt').val(totmet);
                    //row.find('#txtfabgram').val(ratecal);
                }
            });

            $('input[id=txtPurQty]').each(function (ig) {
                if (fabdata[ig].CompSlNo == Sno) {
                    var row = $(this).closest('tr');
                    row.find('#txtPurQty').val(0);
                    row.find('#txtFPurQty').val(0);
                }
            });


            $.each(PlanCompFabricDetSave, function () {
                if (this.ColorID == Colorid && this.SizeId == Sizeid && this.CompSlNo == Sno) {
                    this.ActWeight = totmet;
                    this.Weight = totmet;
                    this.Grammage = wtmt;
                    this.Woven_Req_InMtrs = wt;
                }
            });
            $.each(PlanCompFabricDetSave, function () {
                if (this.CompSlNo == Sno) {
                    this.BColorPQty = 0;
                    this.FColorPQty = 0;
                }
            });
            loadCompFabSaveTable(PlanCompFabricDetSave);

            $('#txtWeight').val("");
            $('#txtActualWeight').val("");

            //yarn

            var totalamnt = 0;
            for (var e = 0; e < ConItemList.length; e++) {

                var amount = ConItemList[e].Weight;
                totalamnt = totalamnt + parseFloat(amount);

            }

            totalamnt = totalamnt.toFixed(3);
            for (var e = 0; e < PlanYarnSave.length; e++) {
                if (PlanYarnSave[e].SlNo == Sno && PlanYarnSave[e].BColor == bclr) {
                    PlanYarnSave[e].Fabric_Weight = (totalamnt);
                }
            }
            loadYarnSavedetTab(PlanYarnSave);


            PlanYarn = $.grep(PlanYarnSave, function (e) {
                return e.SlNo == Sno;
            });
            loadYarndetTab(PlanYarn);

            totwght();

            //Yarndet

            if (PlanYarnDetSave.length > 0) {

                for (var b = 0; b < PlanYarnSave.length; b++) {
                    var pysl = PlanYarnSave[b].YSlno;
                    var cmpsl = PlanYarnSave[b].SlNo;
                    var wgt = PlanYarnSave[b].Fabric_Weight;
                    for (var m = 0; m < PlanYarnDetSave.length; m++) {
                        if (PlanYarnDetSave[m].CompSno == cmpsl && PlanYarnDetSave[m].YSlNo == pysl) {
                            var pr = PlanYarnDetSave[m].Knit_In_Per;
                            var re = parseFloat((pr * wgt) / 100);
                            re = re.toFixed(3);
                            PlanYarnDetSave[m].Knit_In_Qty = re;
                            PlanYarnDetSave[m].Knit_In_ActQty = re;
                            //PlanYarnDetSave[m].FabricID = FabricId;
                        }
                    }
                }
                PlanYarnDet = $.grep(PlanYarnDetSave, function (e) {
                    return e.CompSno == CompSlNo;
                });
                Loadsepyarn(PlanYarnDet);
                LoadsepSaveyarn(PlanYarnDetSave);
            }
        }
        if (Colorid > 0 && Sizeid == 0) {

            var fd = 0;
            var s = 0;
            var bclrid = 0;
            var bclr = '';
            $.each(PlanCompFabricDet, function () {
                if (this.ColorID == Colorid && this.CompSlNo == Sno) {
                    this.ActWeight = ((this.Prdn_Qty * Val) / 100).toFixed(3);
                    this.Weight = ((this.Prdn_Qty * Val) / 100).toFixed(3);
                    this.Woven_Req_InMtrs = wt;
                    this.Grammage = wtmt;
                    bclrid = this.BColorID;
                    bclr = this.Bcolor;
                }
            });

            $.each(PlanCompFabricDet, function () {
                if (this.CompSlNo == Sno) {
                    this.BColorPQty = 0;
                    this.FColorPQty = 0;
                }
            });
            //loadCompFabTable(PlanCompFabricDet);

            var fabtable = $('#tCDbody').DataTable();
            var fabdata = fabtable.rows().data();

            $('input[id=txtPurQty]').each(function (ig) {
                if (fabdata[ig].ColorID == Colorid && fabdata[ig].CompSlNo == Sno) {
                    var row = $(this).closest('tr');
                    var t = row.find('#txtfabPrdQty').val();
                    var re = t * Val;
                    re = (re / 100).toFixed(3);
                    row.find('#txtfabActwt').val(re);
                    row.find('#txtfabwt').val(re);
                    //row.find('#txtfabgram').val(ratecal);
                }
            });

            $('input[id=txtPurQty]').each(function (ig) {
                if (fabdata[ig].CompSlNo == Sno) {
                    var row = $(this).closest('tr');
                    row.find('#txtPurQty').val(0);
                    row.find('#txtFPurQty').val(0);
                }
            });


            $.each(PlanCompFabricDetSave, function () {
                if (this.ColorID == Colorid && this.CompSlNo == Sno) {
                    this.ActWeight = ((this.Prdn_Qty * Val) / 100).toFixed(3);
                    this.Weight = ((this.Prdn_Qty * Val) / 100).toFixed(3);
                    this.Grammage = wtmt;
                    this.Woven_Req_InMtrs = wt;
                }
            });
            $.each(PlanCompFabricDetSave, function () {
                if (this.CompSlNo == Sno) {
                    this.BColorPQty = 0;
                    this.FColorPQty = 0;
                }
            });
            loadCompFabSaveTable(PlanCompFabricDetSave);

            $('#txtWeight').val("");
            $('#txtActualWeight').val("");

            //yarn

            var totalamnt = 0;
            for (var e = 0; e < ConItemList.length; e++) {

                var amount = ConItemList[e].Weight;
                totalamnt = totalamnt + parseFloat(amount);

            }

            totalamnt = totalamnt.toFixed(3);
            for (var e = 0; e < PlanYarnSave.length; e++) {
                if (PlanYarnSave[e].SlNo == Sno && PlanYarnSave[e].BColor == bclr) {
                    PlanYarnSave[e].Fabric_Weight = (totalamnt);
                }
            }
            loadYarnSavedetTab(PlanYarnSave);


            PlanYarn = $.grep(PlanYarnSave, function (e) {
                return e.SlNo == Sno;
            });
            loadYarndetTab(PlanYarn);

            totwght();

            //Yarndet

            if (PlanYarnDetSave.length > 0) {

                for (var b = 0; b < PlanYarnSave.length; b++) {
                    var pysl = PlanYarnSave[b].YSlno;
                    var cmpsl = PlanYarnSave[b].SlNo;
                    var wgt = PlanYarnSave[b].Fabric_Weight;
                    for (var m = 0; m < PlanYarnDetSave.length; m++) {
                        if (PlanYarnDetSave[m].CompSno == cmpsl && PlanYarnDetSave[m].YSlNo == pysl) {
                            var pr = PlanYarnDetSave[m].Knit_In_Per;
                            var re = parseFloat((pr * wgt) / 100);
                            re = re.toFixed(3);
                            PlanYarnDetSave[m].Knit_In_Qty = re;
                            PlanYarnDetSave[m].Knit_In_ActQty = re;
                            // PlanYarnDetSave[m].FabricID = FabricId;
                        }
                    }
                }
                PlanYarnDet = $.grep(PlanYarnDetSave, function (e) {
                    return e.CompSno == CompSlNo;
                });
                Loadsepyarn(PlanYarnDet);
                LoadsepSaveyarn(PlanYarnDetSave);
            }
        }
        if (Colorid == 0 && Sizeid > 0) {
            var fd = 0;
            var s = 0;
            var bclrid = 0;
            var bclr = '';
            $.each(PlanCompFabricDet, function () {
                if (this.SizeId == Sizeid && this.CompSlNo == Sno) {
                    this.ActWeight = ((this.Prdn_Qty * Val) / 100).toFixed(3);
                    this.Weight = ((this.Prdn_Qty * Val) / 100).toFixed(3);
                    this.Woven_Req_InMtrs = wt;
                    this.Grammage = wtmt;
                    bclrid = this.BColorID;
                    bclr = this.Bcolor;
                }
            });

            $.each(PlanCompFabricDet, function () {
                if (this.CompSlNo == Sno) {
                    this.BColorPQty = 0;
                    this.FColorPQty = 0;
                }
            });
            //loadCompFabTable(PlanCompFabricDet);

            var fabtable = $('#tCDbody').DataTable();
            var fabdata = fabtable.rows().data();

            $('input[id=txtPurQty]').each(function (ig) {
                if (fabdata[ig].SizeId == Sizeid && fabdata[ig].CompSlNo == Sno) {
                    var row = $(this).closest('tr');
                    var t = row.find('#txtfabPrdQty').val();
                    var re = t * Val;
                    re = (re / 100).toFixed(3);
                    row.find('#txtfabActwt').val(re);
                    row.find('#txtfabwt').val(re);
                    //row.find('#txtfabgram').val(ratecal);
                }
            });

            $('input[id=txtPurQty]').each(function (ig) {
                if (fabdata[ig].CompSlNo == Sno) {
                    var row = $(this).closest('tr');
                    row.find('#txtPurQty').val(0);
                    row.find('#txtFPurQty').val(0);
                }
            });


            $.each(PlanCompFabricDetSave, function () {
                if (this.SizeId == Sizeid && this.CompSlNo == Sno) {
                    this.ActWeight = ((this.Prdn_Qty * Val) / 100).toFixed(3);
                    this.Weight = ((this.Prdn_Qty * Val) / 100).toFixed(3);
                    this.Grammage = wtmt;
                    this.Woven_Req_InMtrs = wt;
                }
            });
            $.each(PlanCompFabricDetSave, function () {
                if (this.CompSlNo == Sno) {
                    this.BColorPQty = 0;
                    this.FColorPQty = 0;
                }
            });
            loadCompFabSaveTable(PlanCompFabricDetSave);

            $('#txtWeight').val("");
            $('#txtActualWeight').val("");

            //yarn

            var totalamnt = 0;
            for (var e = 0; e < ConItemList.length; e++) {

                var amount = ConItemList[e].Weight;
                totalamnt = totalamnt + parseFloat(amount);

            }

            totalamnt = totalamnt.toFixed(3);
            for (var e = 0; e < PlanYarnSave.length; e++) {
                if (PlanYarnSave[e].SlNo == Sno && PlanYarnSave[e].BColor == bclr) {
                    PlanYarnSave[e].Fabric_Weight = (totalamnt);
                }
            }
            loadYarnSavedetTab(PlanYarnSave);


            PlanYarn = $.grep(PlanYarnSave, function (e) {
                return e.SlNo == Sno;
            });
            loadYarndetTab(PlanYarn);

            totwght();

            //Yarndet

            if (PlanYarnDetSave.length > 0) {

                for (var b = 0; b < PlanYarnSave.length; b++) {
                    var pysl = PlanYarnSave[b].YSlno;
                    var cmpsl = PlanYarnSave[b].SlNo;
                    var wgt = PlanYarnSave[b].Fabric_Weight;
                    for (var m = 0; m < PlanYarnDetSave.length; m++) {
                        if (PlanYarnDetSave[m].CompSno == cmpsl && PlanYarnDetSave[m].YSlNo == pysl) {
                            var pr = PlanYarnDetSave[m].Knit_In_Per;
                            var re = parseFloat((pr * wgt) / 100);
                            re = re.toFixed(3);
                            PlanYarnDetSave[m].Knit_In_Qty = re;
                            PlanYarnDetSave[m].Knit_In_ActQty = re;
                            //PlanYarnDetSave[m].FabricID = FabricId;
                        }
                    }
                }
                PlanYarnDet = $.grep(PlanYarnDetSave, function (e) {
                    return e.CompSno == CompSlNo;
                });
                Loadsepyarn(PlanYarnDet);
                LoadsepSaveyarn(PlanYarnDetSave);
            }
        }
        if (Colorid == 0 && Sizeid == 0) {

            $.each(PlanCompFabricDet, function () {
                if (this.CompSlNo == Sno) {
                    var res = (Val * conval) / 100;
                    var totmet = res * this.Prdn_Qty * parts;
                    totmet = totmet.toFixed(3);
                    this.ActWeight = totmet;
                    this.Weight = totmet;
                    this.Grammage = wtmt;
                    var wt = (wtmt * totmet) / 1000;
                    wt = wt.toFixed(3);
                    this.Woven_Req_InMtrs = wt;
                    var s = this.snumb;

                    var fabtable = $('#tCDbody').DataTable();
                    var fabdata = fabtable.rows().data();

                    $('input[id=txtPurQty]').each(function (ig) {
                        if (fabdata[ig].CompSlNo == Sno && fabdata[ig].snumb == s) {

                            var row = $(this).closest('tr');
                            row.find('#txtfabActwt').val(totmet);
                            row.find('#txtfabwt').val(totmet);
                            //row.find('#txtfabgram').val(ratecal);
                        }
                    });
                    $('input[id=txtPurQty]').each(function (ig) {
                        if (fabdata[ig].CompSlNo == Sno) {
                            var row = $(this).closest('tr');
                            row.find('#txtPurQty').val(0);
                            row.find('#txtFPurQty').val(0);
                        }

                    });
                }
            });

            $.each(PlanCompFabricDet, function () {
                if (this.CompSlNo == Sno) {
                    this.BColorPQty = 0;
                    this.FColorPQty = 0;
                }
            });



            $.each(PlanCompFabricDetSave, function () {
                if (this.CompSlNo == Sno) {
                    var res = (Val * conval) / 100;
                    var totmet = res * this.Prdn_Qty * parts;
                    totmet = totmet.toFixed(3);
                    this.ActWeight = totmet;
                    this.Weight = totmet;
                    this.Grammage = wtmt;
                    var wt = (wtmt * totmet) / 1000;
                    wt = wt.toFixed(3);
                    this.Woven_Req_InMtrs = wt;
                }
            });


            $.each(PlanCompFabricDetSave, function () {
                if (this.CompSlNo == Sno) {
                    this.BColorPQty = 0;
                    this.FColorPQty = 0;
                }
            });
            loadCompFabSaveTable(PlanCompFabricDetSave);

            $('#txtWeight').val("");
            $('#txtActualWeight').val("");

            //yarn
            var result = [];
            $.each(PlanCompFabricDet, function (i, e) {
                var matchingItems = $.grep(result, function (item) {
                    return item.BColorID === e.BColorID;
                });
                if (matchingItems.length === 0) {
                    result.push(e);
                }
            });



            if (result.length > 0) {
                //PlanYarnSave = [];
                PlanYarn = [];

                PlanYarnSave = jQuery.grep(PlanYarnSave, function (value) {
                    return value.SlNo != CompSlNo;
                });
                //PlanYarnSave = jQuery.grep(yarnlist, function (value) {
                //    return value.FabricID != fd;
                //});

                var Cs = result[0].CompSlNo;
                var ComponentId = 0;
                var Component = '';
                for (var t = 0; t < compList.length; t++) {
                    if (compList[t].CompSlNo == Cs) {
                        ComponentId = compList[t].ComponentID;
                        Component = compList[t].ComponentName;
                    }
                }

                //if (Mod != 0) {
                //    PlanYarnSave = $.grep(PlanYarnSave, function (e) {
                //        return e.SlNo != CompSlNo;
                //    });
                //}
                for (var j = 0; j < result.length; j++) {


                    if (PlanYarn.length == 0) {
                        leng = 1;

                    }
                    else {
                        leng++;

                    }
                    var bd = 0;
                    bd = result[j].BColorID;
                    var snumb = result[j].snumb;
                    var csln = result[j].CompSlNo;
                    var totalqty = 0;
                    for (var u = 0; u < PlanCompFabricDetSave.length; u++) {
                        if (PlanCompFabricDetSave[u].BColorID == bd && PlanCompFabricDetSave[u].CompSlNo == csln) {

                            var qty = PlanCompFabricDetSave[u].Woven_Req_InMtrs;
                            totalqty = totalqty + parseFloat(qty);
                        }
                    }


                    //var bcqty = 0;
                    //for (var r = 0; r < PlanCompFabricDetSave.length; r++) {
                    //    if (PlanCompFabricDetSave[r].BColorID == bd && PlanCompFabricDetSave[r].CompSlNo == s) {

                    //        var qty = PlanCompFabricDetSave[r].BColorPQty;
                    //        bcqty = bcqty + parseFloat(qty);
                    //    }
                    //}


                    //var finqty = 0;
                    //for (var n = 0; n < PlanCompFabricDetSave.length; n++) {
                    //    if (PlanCompFabricDetSave[n].BColorID == bd && PlanCompFabricDetSave[n].CompSlNo == s) {

                    //        var qty = PlanCompFabricDetSave[n].FColorPQty;
                    //        finqty = finqty + parseFloat(qty);
                    //    }
                    //}


                    //var totclrqty = parseFloat(bcqty) + parseFloat(finqty);


                    //totalqty = totalqty - totclrqty;
                    totalqty = totalqty.toFixed(3);


                    var yarnlistobj = {
                        PlanId: 0,
                        Fabric: result[j].Fabric,
                        FabricID: result[j].FabricID,
                        Fabric_ColorId: result[j].BColorID,
                        Fabric_Weight: totalqty,
                        Fabric_type: result[j].type,//result[j].FabricType,
                        EntryDate: new Date($('#txtEntryDate').val()),
                        BColor: result[j].Bcolor,
                        SlNo: result[j].CompSlNo,
                        YPlanmasID: 0,
                        YSlno: leng,
                        ComponentId: ComponentId,
                        Component: Component
                    }




                    PlanYarnSave.push(yarnlistobj);
                    PlanYarn.push(yarnlistobj);
                }
            }

            //loadYarndetTab
            PlanYarnSave = jQuery.grep(PlanYarnSave, function (value) {
                return value.Fabric_Weight != 0;
            });
            PlanYarn = jQuery.grep(PlanYarn, function (value) {
                return value.Fabric_Weight != 0;
            });
            loadYarnSavedetTab(PlanYarnSave);

            loadYarndetTab(PlanYarn);

            //yarn

            //var totalamnt = 0;
            //for (var e = 0; e < ConItemList.length; e++) {

            //    var amount = ConItemList[e].Weight;
            //    totalamnt = totalamnt + parseFloat(amount);

            //}

            //totalamnt = totalamnt.toFixed(3);
            //for (var e = 0; e < PlanYarnSave.length; e++) {
            //    if (PlanYarnSave[e].SlNo == Sno) {
            //        PlanYarnSave[e].Fabric_Weight = (totalamnt);
            //    }
            //}
            //loadYarnSavedetTab(PlanYarnSave);


            //PlanYarn = $.grep(PlanYarnSave, function (e) {
            //    return e.SlNo == Sno;
            //});
            //loadYarndetTab(PlanYarn);

            totwght();

            //Yarndet

            if (PlanYarnDetSave.length > 0) {

                for (var b = 0; b < PlanYarnSave.length; b++) {
                    var pysl = PlanYarnSave[b].YSlno;
                    var cmpsl = PlanYarnSave[b].SlNo;
                    var wgt = PlanYarnSave[b].Fabric_Weight;
                    for (var m = 0; m < PlanYarnDetSave.length; m++) {
                        if (PlanYarnDetSave[m].CompSno == cmpsl && PlanYarnDetSave[m].YSlNo == pysl) {
                            var pr = PlanYarnDetSave[m].Knit_In_Per;
                            var re = parseFloat((pr * wgt) / 100);
                            re = re.toFixed(3);
                            PlanYarnDetSave[m].Knit_In_Qty = re;
                            PlanYarnDetSave[m].Knit_In_ActQty = re;
                            //PlanYarnDetSave[m].FabricID = FabricId;
                        }
                    }
                }
                PlanYarnDet = $.grep(PlanYarnDetSave, function (e) {
                    return e.CompSno == CompSlNo;
                });
                Loadsepyarn(PlanYarnDet);
                LoadsepSaveyarn(PlanYarnDetSave);
            }
        }

    });
    $(document).on('keyup', '.calcpanpcs', function (e) {
        debugger;
        var table = $('#tCPIbody').DataTable();
        var quantity = table.row($(this).parents('tr')).data()["Prdn_Qty"];
        var totpcs = table.row($(this).parents('tr')).data()["TotPieces"];
        var CPlan = table.row($(this).parents('tr')).data()["CPlanSlNo"];
        var Sno = table.row($(this).parents('tr')).data()["CompSlNo"];
        var Colorid = table.row($(this).parents('tr')).data()["ColorID"];
        var Sizeid = table.row($(this).parents('tr')).data()["SizeId"];
        parts = table.row($(this).parents('tr')).data()["No_Of_Parts"];
        var Val = $(this).val();

        fillvar = 'GRMPCSPAN';
        index;
        rowindex = $(this).closest('tr').index();
        indexforfill = rowindex;


        var IQty = 0;
        if (Val == 0) {
            IQty = 0;
        }
        else {
            IQty = Val;
        }

        var wt = (Val * totpcs) / 1000;
        wt = wt.toFixed(3);
        $.each(ConItemList, function () {
            if (this.CPlanSlNo == CPlan && this.CompSlNo == Sno) {
                this.GmsPieces = Val;
                this.Weight = wt;
            }
        });

        var data = table.rows().data();

        $('input[id=txtGmspcspan]').each(function (ind) {
            if (data[ind].CPlanSlNo == CPlan && data[ind].CompSlNo == Sno) {
                var row = $(this).closest('tr');
                row.find('#txtWght').val(wt);
            }
        });
        $.each(ConItemListSave, function () {
            if (this.CPlanSlNo == CPlan && this.CompSlNo == Sno) {
                this.GmsPieces = Val;
                this.Weight = wt;
            }
        });
        loadconSaveTable(ConItemListSave);

        if (Colorid > 0 && Sizeid > 0) {
            var fd = 0;
            var s = 0;
            var bclrid = 0;
            var bclr = '';
            $.each(PlanCompFabricDet, function () {
                if (this.ColorID == Colorid && this.SizeId == Sizeid && this.CompSlNo == Sno) {
                    this.Weight = totpcs;
                    this.ActWeight = totpcs;
                    this.Woven_Req_InMtrs = wt;
                    //fd = this.FabricID;
                    //s = this.CompSlNo;
                    this.Grammage = Val;
                    bclrid = this.BColorID;
                    bclr = this.Bcolor;
                }
            });

            $.each(PlanCompFabricDet, function () {
                if (this.CompSlNo == Sno) {
                    this.BColorPQty = 0;
                    this.FColorPQty = 0;
                }
            });
            //loadCompFabTable(PlanCompFabricDet);

            var fabtable = $('#tCDbody').DataTable();
            var fabdata = fabtable.rows().data();

            $('input[id=txtPurQty]').each(function (ig) {
                if (fabdata[ig].ColorID == Colorid && fabdata[ig].SizeId == Sizeid && fabdata[ig].CompSlNo == Sno) {
                    var row = $(this).closest('tr');
                    row.find('#txtfabActwt').val(totpcs);
                    row.find('#txtfabwt').val(totpcs);
                    //row.find('#txtfabgram').val(ratecal);
                }
            });

            $('input[id=txtPurQty]').each(function (ig) {
                if (fabdata[ig].CompSlNo == Sno) {
                    var row = $(this).closest('tr');
                    row.find('#txtPurQty').val(0);
                    row.find('#txtFPurQty').val(0);
                }
            });

            var bclrid = 0;
            var bclr = '';
            $.each(PlanCompFabricDetSave, function () {
                if (this.ColorID == Colorid && this.SizeId == Sizeid && this.CompSlNo == Sno) {
                    this.Weight = totpcs;
                    this.ActWeight = totpcs;
                    this.Woven_Req_InMtrs = wt;
                    this.Grammage = Val;
                    bclrid = this.BColorID;
                    bclr = this.Bcolor;
                }
            });
            $.each(PlanCompFabricDetSave, function () {
                if (this.CompSlNo == Sno) {
                    this.BColorPQty = 0;
                    this.FColorPQty = 0;
                }
            });
            loadCompFabSaveTable(PlanCompFabricDetSave);

            $('#txtWeight').val("");
            $('#txtActualWeight').val("");



        }
        if (Colorid == 0 && Sizeid > 0) {
            var fd = 0;
            var s = 0;
            var bclrid = 0;
            var bclr = '';
            $.each(PlanCompFabricDet, function () {
                if (this.SizeId == Sizeid && this.CompSlNo == Sno) {
                    this.Weight = this.Prdn_Qty * parts;
                    this.ActWeight = this.Prdn_Qty * parts;
                    var r = (parseFloat(Val) * parseFloat(this.Weight)) / 1000;
                    this.Woven_Req_InMtrs = r;
                    //fd = this.FabricID;
                    //s = this.CompSlNo;
                    this.Grammage = Val;
                    bclrid = this.BColorID;
                    bclr = this.Bcolor;
                }
            });

            $.each(PlanCompFabricDet, function () {
                if (this.CompSlNo == Sno) {
                    this.BColorPQty = 0;
                    this.FColorPQty = 0;
                }
            });
            //loadCompFabTable(PlanCompFabricDet);

            var fabtable = $('#tCDbody').DataTable();
            var fabdata = fabtable.rows().data();

            $('input[id=txtPurQty]').each(function (ig) {
                if (fabdata[ig].SizeId == Sizeid && fabdata[ig].CompSlNo == Sno) {
                    var row = $(this).closest('tr');
                    var tr = row.find('#txtfabPrdQty').val();
                    row.find('#txtfabActwt').val(tr * parts);
                    row.find('#txtfabwt').val(tr * parts);
                    //row.find('#txtfabgram').val(ratecal);
                }
            });

            $('input[id=txtPurQty]').each(function (ig) {
                if (fabdata[ig].CompSlNo == Sno) {
                    var row = $(this).closest('tr');
                    row.find('#txtPurQty').val(0);
                    row.find('#txtFPurQty').val(0);
                }
            });

            var bclrid = 0;
            var bclr = '';
            $.each(PlanCompFabricDetSave, function () {
                if (this.SizeId == Sizeid && this.CompSlNo == Sno) {
                    this.Weight = this.Prdn_Qty * parts;
                    this.ActWeight = this.Prdn_Qty * parts;
                    var r = (parseFloat(Val) * parseFloat(this.Weight)) / 1000;
                    this.Woven_Req_InMtrs = r;
                    this.Grammage = Val;
                    bclrid = this.BColorID;
                    bclr = this.Bcolor;
                }
            });
            $.each(PlanCompFabricDetSave, function () {
                if (this.CompSlNo == Sno) {
                    this.BColorPQty = 0;
                    this.FColorPQty = 0;
                }
            });
            loadCompFabSaveTable(PlanCompFabricDetSave);

            $('#txtWeight').val("");
            $('#txtActualWeight').val("");


        }

        if (Colorid > 0 && Sizeid == 0) {
            var fd = 0;
            var s = 0;
            var bclrid = 0;
            var bclr = '';
            $.each(PlanCompFabricDet, function () {
                if (this.ColorID == Colorid && this.CompSlNo == Sno) {
                    this.Weight = this.Prdn_Qty * parts;
                    this.ActWeight = this.Prdn_Qty * parts;
                    var r = (parseFloat(Val) * parseFloat(this.Weight)) / 1000;
                    this.Woven_Req_InMtrs = r;
                    //fd = this.FabricID;
                    //s = this.CompSlNo;
                    this.Grammage = Val;
                    bclrid = this.BColorID;
                    bclr = this.Bcolor;
                }
            });

            $.each(PlanCompFabricDet, function () {
                if (this.CompSlNo == Sno) {
                    this.BColorPQty = 0;
                    this.FColorPQty = 0;
                }
            });
            //loadCompFabTable(PlanCompFabricDet);

            var fabtable = $('#tCDbody').DataTable();
            var fabdata = fabtable.rows().data();

            $('input[id=txtPurQty]').each(function (ig) {
                if (fabdata[ig].ColorID == Colorid && fabdata[ig].CompSlNo == Sno) {
                    var row = $(this).closest('tr');
                    var tr = row.find('#txtfabPrdQty').val();
                    row.find('#txtfabActwt').val(tr * parts);
                    row.find('#txtfabwt').val(tr * parts);
                    //row.find('#txtfabgram').val(ratecal);
                }
            });

            $('input[id=txtPurQty]').each(function (ig) {
                if (fabdata[ig].CompSlNo == Sno) {
                    var row = $(this).closest('tr');
                    row.find('#txtPurQty').val(0);
                    row.find('#txtFPurQty').val(0);
                }
            });

            var bclrid = 0;
            var bclr = '';
            $.each(PlanCompFabricDetSave, function () {
                if (this.ColorID == Colorid && this.CompSlNo == Sno) {
                    this.Weight = this.Prdn_Qty * parts;
                    this.ActWeight = this.Prdn_Qty * parts;
                    var r = (parseFloat(Val) * parseFloat(this.Weight)) / 1000;
                    this.Woven_Req_InMtrs = r;
                    this.Grammage = Val;
                    bclrid = this.BColorID;
                    bclr = this.Bcolor;
                }
            });
            $.each(PlanCompFabricDetSave, function () {
                if (this.CompSlNo == Sno) {
                    this.BColorPQty = 0;
                    this.FColorPQty = 0;
                }
            });
            loadCompFabSaveTable(PlanCompFabricDetSave);

            $('#txtWeight').val("");
            $('#txtActualWeight').val("");


        }
        var totprdqty = $('#txtProdQty').val();

        if (Colorid == 0 && Sizeid == 0) {
            $.each(PlanCompFabricDet, function () {
                var quan = this.Prdn_Qty;
                var res = parts * parseFloat(quan);
                res = res.toFixed(3);
                this.Weight = res;
                this.ActWeight = res;
                var r = (parseFloat(Val) * parseFloat(this.Weight)) / 1000;
                this.Woven_Req_InMtrs = r;
                this.Grammage = Val;
                //fd = this.FabricID;
                var s = this.snumb;
                var fabtable = $('#tCDbody').DataTable();
                var fabdata = fabtable.rows().data();

                $('input[id=txtPurQty]').each(function (ig) {
                    if (fabdata[ig].CompSlNo == Sno && fabdata[ig].snumb == s) {

                        var row = $(this).closest('tr');
                        row.find('#txtfabActwt').val(res);
                        row.find('#txtfabwt').val(res);
                        //row.find('#txtfabgram').val(ratecal);
                    }
                });
            });



            $.each(PlanCompFabricDetSave, function () {
                if (this.CompSlNo == Sno) {
                    var quan = this.Prdn_Qty;
                    var res = parts * parseFloat(quan);
                    res = res.toFixed(3);
                    this.Weight = res;
                    this.Grammage = Val;
                    this.ActWeight = res;
                    var r = (parseFloat(Val) * parseFloat(this.Weight)) / 1000;
                    this.Woven_Req_InMtrs = r;
                }
            });
            loadCompFabSaveTable(PlanCompFabricDetSave);

            $('#txtWeight').val("");
            $('#txtActualWeight').val("");


        }


        //yarn
        var result = [];
        $.each(PlanCompFabricDet, function (i, e) {
            var matchingItems = $.grep(result, function (item) {
                return item.BColorID === e.BColorID;
            });
            if (matchingItems.length === 0) {
                result.push(e);
            }
        });



        if (result.length > 0) {
            //PlanYarnSave = [];
            PlanYarn = [];

            PlanYarnSave = jQuery.grep(PlanYarnSave, function (value) {
                return value.SlNo != CompSlNo;
            });
            //PlanYarnSave = jQuery.grep(yarnlist, function (value) {
            //    return value.FabricID != fd;
            //});

            var Cs = result[0].CompSlNo;
            var ComponentId = 0;
            var Component = '';
            for (var t = 0; t < compList.length; t++) {
                if (compList[t].CompSlNo == Cs) {
                    ComponentId = compList[t].ComponentID;
                    Component = compList[t].ComponentName;
                }
            }

            //if (Mod != 0) {
            //    PlanYarnSave = $.grep(PlanYarnSave, function (e) {
            //        return e.SlNo != CompSlNo;
            //    });
            //}
            for (var j = 0; j < result.length; j++) {


                if (PlanYarn.length == 0) {
                    leng = 1;

                }
                else {
                    leng++;

                }
                var bd = 0;
                bd = result[j].BColorID;
                var snumb = result[j].snumb;
                var csln = result[j].CompSlNo;
                var totalqty = 0;
                for (var u = 0; u < PlanCompFabricDetSave.length; u++) {
                    if (PlanCompFabricDetSave[u].BColorID == bd && PlanCompFabricDetSave[u].CompSlNo == csln) {

                        var qty = PlanCompFabricDetSave[u].Woven_Req_InMtrs;
                        totalqty = totalqty + parseFloat(qty);
                    }
                }

                totalqty = totalqty.toFixed(3);

                var yarnlistobj = {
                    PlanId: 0,
                    Fabric: result[j].Fabric,
                    FabricID: result[j].FabricID,
                    Fabric_ColorId: result[j].BColorID,
                    Fabric_Weight: totalqty,
                    Fabric_type: result[j].type,//result[j].FabricType,
                    EntryDate: new Date($('#txtEntryDate').val()),
                    BColor: result[j].Bcolor,
                    SlNo: result[j].CompSlNo,
                    YPlanmasID: 0,
                    YSlno: leng,
                    ComponentId: ComponentId,
                    Component: Component
                }

                PlanYarnSave.push(yarnlistobj);
                PlanYarn.push(yarnlistobj);
            }
        }

        //loadYarndetTab
        PlanYarnSave = jQuery.grep(PlanYarnSave, function (value) {
            return value.Fabric_Weight != 0;
        });
        PlanYarn = jQuery.grep(PlanYarn, function (value) {
            return value.Fabric_Weight != 0;
        });
        loadYarnSavedetTab(PlanYarnSave);


        //var ctry = [];
        //ctry = PlanYarnSave;
        //ctry = $.grep(ctry, function (e) {
        //    if (e.SlNo == s) {
        //        return e;
        //    }
        //});
        //PlanYarn = ctry;

        loadYarndetTab(PlanYarn);
        //yarn

        //var totalamnt = 0;
        //for (var e = 0; e < ConItemList.length; e++) {

        //    var amount = ConItemList[e].Weight;
        //    totalamnt = totalamnt + parseFloat(amount);

        //}

        //totalamnt = totalamnt.toFixed(3);
        //for (var e = 0; e < PlanYarnSave.length; e++) {
        //    if (PlanYarnSave[e].SlNo == Sno) {
        //        PlanYarnSave[e].Fabric_Weight = (totalamnt);
        //    }
        //}
        //loadYarnSavedetTab(PlanYarnSave);


        //PlanYarn = $.grep(PlanYarnSave, function (e) {
        //    return e.SlNo == Sno;
        //});
        //loadYarndetTab(PlanYarn);

        totwght();

        //Yarndet

        if (PlanYarnDetSave.length > 0) {

            for (var b = 0; b < PlanYarnSave.length; b++) {
                var pysl = PlanYarnSave[b].YSlno;
                var cmpsl = PlanYarnSave[b].SlNo;
                var wgt = PlanYarnSave[b].Fabric_Weight;
                for (var m = 0; m < PlanYarnDetSave.length; m++) {
                    if (PlanYarnDetSave[m].CompSno == cmpsl && PlanYarnDetSave[m].YSlNo == pysl) {
                        var pr = PlanYarnDetSave[m].Knit_In_Per;
                        var re = parseFloat((pr * wgt) / 100);
                        re = re.toFixed(3);
                        PlanYarnDetSave[m].Knit_In_Qty = re;
                        PlanYarnDetSave[m].Knit_In_ActQty = re;
                        //PlanYarnDetSave[m].FabricID = FabricId;
                    }
                }
            }
            PlanYarnDet = $.grep(PlanYarnDetSave, function (e) {
                return e.CompSno == CompSlNo;
            });
            Loadsepyarn(PlanYarnDet);
            LoadsepSaveyarn(PlanYarnDetSave);


        }
        totwght();
    });
    $(document).on('keyup', '.calcgramm', function (e) {
        debugger;

        var table = $('#tCPIbody').DataTable();
        var quantity = table.row($(this).parents('tr')).data()["Prdn_Qty"];
        var CPlan = table.row($(this).parents('tr')).data()["CPlanSlNo"];
        var Sno = table.row($(this).parents('tr')).data()["CompSlNo"];
        var Colorid = table.row($(this).parents('tr')).data()["ColorID"];
        var Sizeid = table.row($(this).parents('tr')).data()["SizeId"];
        var Clen = table.row($(this).parents('tr')).data()["Length"];
        var CWid = table.row($(this).parents('tr')).data()["Width"];
        if (ChkMaj == "Y") {
        }

        for (var t = 0; t < compList.length; t++) {
            if (compList[t].CompSlNo == Sno) {
                var parts = compList[t].No_Of_Parts;
            }
        }

        var Val = $(this).val();

        fillvar = 'GRM';
        index;
        rowindex = $(this).closest('tr').index();
        indexforfill = rowindex;


        var IQty = 0;
        if (Val == 0) {
            IQty = 0;
        }
        else {
            IQty = Val;
        }

        var field = Val;
        if (!field.match(/^[\-\+]?[\d\,]*\.?[\d]*$/)) {
            $.each(ConItemList, function () {
                if (this.CPlanSlNo == CPlan && this.CompSlNo == Sno) {
                    this.Grammage = 0;
                    this.Weight = 0;
                }
            });
            loadAdConTable(ConItemList);
            return false;
        }
        var ratecal = Val;
        var res = quantity * ratecal / 1000;
        finalresult = (res * parts).toFixed(3);
        res = (res * parts).toFixed(3);
        $.each(ConItemList, function () {
            if (this.CPlanSlNo == CPlan && this.CompSlNo == Sno) {
                this.Grammage = ratecal;
                this.Weight = res;
            }
        });
        var data = table.rows().data();

        $('input[id=txtGram]').each(function (ind) {
            if (data[ind].CPlanSlNo == CPlan && data[ind].CompSlNo == Sno) {
                var row = $(this).closest('tr');
                row.find('#txtWght').val(res);
            }
        });
        $.each(ConItemListSave, function () {
            if (this.CPlanSlNo == CPlan && this.CompSlNo == Sno) {
                this.Grammage = ratecal;
                this.Weight = res;
            }
        });


        ConItemList.sort(function (a, b) {
            return a.CPlanSlNo - b.CPlanSlNo;
        });

        ConItemListSave.sort(function (a, b) {
            return a.CPlanSlNo - b.CPlanSlNo;
        });
        var rows = $("#tCPIbody").dataTable().fnGetNodes();
        var dtTable = $('#tCPIbody').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
            $('input[id=txtGram]').each(function () {
                if (sn == CPlan && $(this).val() == Val) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtGram').val();
                    row.find('#txtGram').focus().val('').val(num);
                    return true;
                }
            });
        }
        totconwght();
    });
    $(document).on('change', '.ddlGSize', function () {

        rowindex = $(this).closest('tr').index();
        var gs = "";
        var oldind = -1;
        var val = $(this).val();
        fillvar = 'GYW';
        indexforfill = rowindex;

        var Sizres = [];
        Sizres = $.grep(GreyList, function (r) {
            return r.SizeId == val;
        });

        gs = Sizres[0].Size;
        var currentrow = ConItemList.slice(rowindex);
        var s = currentrow[0].CPlanSlNo;
        var sno = currentrow[0].CompSlNo;
        var Colorid = currentrow[0].ColorID;
        var Sizeid = currentrow[0].SizeId;
        $.each(ConItemList, function () {
            if (this.CPlanSlNo == s && this.CompSlNo == sno) {
                this.GreyWidthID = val;
                this.GreyWidth = gs;

            }
        });

        loadAdConTable(ConItemList);
        $.each(ConItemListSave, function () {
            if (this.CPlanSlNo == s && this.CompSlNo == sno) {
                this.GreyWidthID = val;
                this.GreyWidth = gs;

            }
        });
        //loadconSaveTable(ConItemListSave);
        ConsmtnHideCol(type);

    });
    $(document).on('change', '.ddlFSize', function () {

        debugger;

        rowindex = $(this).closest('tr').index();
        indexforfill = rowindex;
        fillvar = 'FW';
        var fs = "";
        var val = $(this).val();

        var oldind = -1;
        var Sizres = [];
        Sizres = $.grep(Fabriclist, function (r) {
            return r.SizeId == val;
        });

        fs = Sizres[0].Size;
        var currentrow = ConItemList.slice(rowindex);
        var s = currentrow[0].CPlanSlNo;
        var u = currentrow[0].CompSlNo;

        var Colorid = currentrow[0].ColorID;
        var Sizeid = currentrow[0].SizeId;

        $.each(ConItemList, function () {
            if (this.CPlanSlNo == s && this.CompSlNo == u) {
                this.FinishWidth = fs;
                this.FinishWidthID = val;

            }
        });

        loadAdConTable(ConItemList);
        $.each(ConItemListSave, function () {
            if (this.CPlanSlNo == s && this.CompSlNo == u) {
                this.FinishWidth = fs;
                this.FinishWidthID = val;

            }
        });
    });
});
function ListConsump(ItemId, StyleRowId, GroupId, CompSlNo) {
    debugger;
    // $('#tCPIbody').DataTable().destroy();

    $.ajax({
        url: "/PlanningConsumption/ListPlanningComp",
        data: JSON.stringify({ ItemId: ItemId, StyleRowId: StyleRowId, GroupId: GroupId, CompSlNo: CompSlNo }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            obj = result;
            var dup = [];

            for (var t = 0; t < obj.length; t++) {
                obj[t].GSM = gsm;
                obj[t].Requirement = 0;
                obj[t].TotMetres = 0;
                obj[t].WtMetre = 0;
                obj[t].GmsPieces = 0;
                obj[t].No_Of_Parts = parts;
                obj[t].TotPieces = (obj[t].Prdn_Qty * parts);
                obj[t].type = type;
                obj[t].AlloLen = 0;
                obj[t].AllowWid = 0;
                obj[t].Pattern = 0;
            }
            //if (type == 'KNITS') {
            //    for (var t = 0; t < obj.length; t++) {
            //        obj[t].GSM = gsm;
            //      
            //    }
            //}
            //else if (type == 'WOVEN') {
            //    for (var t = 0; t < obj.length; t++) {
            //        obj[t].Requirement = 0;
            //        obj[t].TotMetres = 0;
            //        obj[t].WtMetre = 0;

            //      
            //    }
            //}
            //else if (type == 'PANELS') {
            //    for (var t = 0; t < obj.length; t++) {                   
            //        obj[t].GmsPieces = 0;
            //        obj[t].No_Of_Parts = parts;

            //       
            //    }
            //}

            if (ConItemListSave.length == 0) {
                ConItemListSave = obj;
                //loadconSaveTable(ConItemListSave);
                ConItemList = obj;
                loadAdConTable(ConItemList);

            }
            else {
                for (var t = 0; t < obj.length; t++) {
                    for (var d = 0; d < ConItemListSave.length; d++) {
                        if (ConItemListSave[d].CompSlNo == obj[t].CompSlNo) {
                            ConItemListSave[d].GSM = obj[t].GSM;

                            /////////////////////

                            var pat = ConItemListSave[d].Pattern;
                            if (pat > 0) {

                                //var totlen = ConItemListSave[d].Length + ConItemListSave[d].AlloLen;
                                //var totwid = ConItemListSave[d].Width + ConItemListSave[d].AllowWid;
                                //var res1 = parseFloat(parseFloat(totlen * totwid) / pat);


                                //var res1 = res1.toFixed(3);
                                //var res = (res1 * (ConItemListSave[d].GSM)) / 10000;
                                //var Wght = (ConItemListSave[d].Prdn_Qty) * res / 1000;

                                //var finalresult = res.toFixed(3);
                                //var finalwgt = (Wght * (ConItemListSave[d].No_Of_Parts)).toFixed(3);

                                //ConItemListSave[d].Grammage = finalresult;
                                //ConItemListSave[d].Weight = Wght;

                                //checkautogsm(ConItemListSave[d].Prdn_Qty, ConItemListSave[d].CPlanSlNo, ConItemListSave[d].CompSlNo, ConItemListSave[d].Length, ConItemListSave[d].AlloLen, ConItemListSave[d].Width, ConItemListSave[d].Pattern, ConItemListSave[d].AllowWid, ConItemListSave[d].ColorID, ConItemListSave[d].SizeId, ConItemListSave[d].GSM);


                                //checkautogsm(Gquantity, GCPlan, Gsno, Glen, Galwlen, Gwid, Gpat, Galwwid, GColorid, GSizeid);
                            }
                            /////////////////////
                            dup.push(ConItemListSave[d]);
                        }
                    }
                }

                if (dup.length > 0) {
                    loadconSaveTable(ConItemListSave);

                    //ConItemList = $.grep(ConItemListSave, function (r) {
                    //    return r.CompSlNo == CompSlNo;
                    //});
                    //loadAdConTable(ConItemList);

                    //return true;
                }
                else {
                    //for (var s = 0; s < StklistSave.length; s++) {
                    //    if (obj[s].Itemid != Iid && obj[s].Colorid != Cid && obj[s].Sizeid != Sid) {
                    for (var d = 0; d < obj.length; d++) {
                        ConItemListSave.push(obj[d]);
                    }
                    loadconSaveTable(ConItemListSave);

                    //    }

                    //}
                }

                ConItemList = $.grep(ConItemListSave, function (r) {
                    return r.CompSlNo == CompSlNo;
                });
                loadAdConTable(ConItemList);
            }
            totconwght();
            ConsmtnHideCol(type);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

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
                        shiplist[e].AllowQty = Math.ceil(percenval);
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
                    Listsump("CS", SNo, StyleRowID);
                    Listsepsump("CS", SNo, StyleRowID);
                }


            }
            else {

                Listsump("CS", SNo, StyleRowID);
                Listsepsump("CS", SNo, StyleRowID);
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
                        qlist[e].AllowQty = Math.ceil(percenval);
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
                    Listsump("M", SNo, StyleRowID);
                    Listsepsump("M", SNo, StyleRowID);
                }


            }
            else {
                Listsump("M", SNo, StyleRowID);
                Listsepsump("M", SNo, StyleRowID);
            }


        }

    });

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

    });

    $(document).on('input', '.calcqty', function () {
        debugger;

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

            return true;
        }
        var table = $('#tPKbody').DataTable();
        var qtydata = table.rows().data();
        var filteredResult = $.grep(ShipmentItemList, function (element, index) {
            return element.SLNo == ssno;
        });

        allow = filteredResult[0].AllowancePer;

        $.each(SepPackItemList, function () {
            if (this.snumb == snum && this.SSNO == ssno) {
                this.Quantity = value;
            }
        })
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

                    var te1 = (((value * imr) * allow) / 100);

                    if (te1 <= 0.5) {
                        var res = 0;
                    } else if (te1 < 1) {
                        var res = Math.ceil(parseFloat(((value * imr) * allow) / 100));
                    }
                    else {
                        var res = Math.ceil(parseInt(((value * imr) * allow) / 100));
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

                    var te1 = (((value * imr) * allow) / 100);

                    if (te1 <= 0.5) {
                        var res = 0;
                    } else if (te1 < 1) {
                        var res = Math.ceil(parseFloat(((value * imr) * allow) / 100));
                    }
                    else {
                        var res = Math.ceil(parseInt(((value * imr) * allow) / 100));
                    }

                    row.find('#txtallQty').val(res);
                    var tr = parseInt(value * imr) + parseInt(res);
                    row.find('#txtqtyPrdQty').val(tr);


                }
            });

        }


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

    $("#txtallowance").keyup(function () {
        debugger;
        fnAllowCalc();

    });

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
                StyleRowid: StyleRowID,
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
                    Listsump("CS", sn, StyleRowID);
                    Listsepsump("CS", sn, StyleRowID);

                }

                else if (shipItemObj.ItemModeType == "Solid") {
                    type = shipItemObj.ItemModeType;
                    Listsump("M", sn, StyleRowID);
                    Listsepsump("M", sn, StyleRowID);
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
                    Listsump("CS", sl, StyleRowID);
                    Listsepsump("CS", sl, StyleRowID);
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
                    Listsump("CS", sl, StyleRowID);
                    Listsepsump("CS", sl, StyleRowID);


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
                    Listsump("M", sl, StyleRowID);
                    Listsepsump("M", sl, StyleRowID);
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
                    Listsump("M", sl, StyleRowID);
                    Listsepsump("M", sl, StyleRowID);

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
        //if (shipeditflag = 1) {
        totalamnt = totalamnt - Quan;
        // }
        //else if (parseInt(totalamnt) > 0) {
        tmpqty = parseInt(totalamnt) + parseInt(currentqty);
        //}

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
});

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

//function Listsump(PType, SNo, StyleRowId) {
//    debugger;
//    $.ajax({
//        url: "/BulkOrderShipment/ListPackDetails",
//        data: JSON.stringify({ SNo: SNo, PackType: PType, StyleRowId: StyleRowId }),
//        type: "POST",
//        contentType: "application/json;charset=utf-8",
//        dataType: "json",
//        success: function (result) {
//            PackItemList = result;

//            if (idinsertflg == 1) {
//                if (type == "Color/Size") {

//                    for (i = 0; i < PackItemList.length; i++) {

//                        for (j = 0; j < itm.length; j++) {

//                            if (i == j) {
//                                PackItemList[i].Buy_Ord_DetId = itm[j].Buy_Ord_DetId;
//                            }
//                        }
//                    }
//                    loadshconTab(PackItemList);
//                }
//                else if (type == "") {
//                    PackItemList = [];
//                    loadshconTable(PackItemList);
//                }

//                if (type == "Solid") {
//                    for (i = 0; i < PackItemList.length; i++) {

//                        for (j = 0; j < quan.length; j++) {

//                            if (i == j) {
//                                PackItemList[i].Buy_Ord_DetId = quan[j].Buy_Ord_DetId;
//                            }
//                        }
//                    }
//                    loadshconTable(PackItemList);
//                }
//            }
//            else if (idinsertflg == 2) {
//                if (type == "Color/Size") {

//                    for (i = 0; i < PackItemList.length; i++) {

//                        for (j = 0; j < itm.length; j++) {

//                            if (i == j) {
//                                PackItemList[i].Buy_Ord_DetId = itm[j].Buy_Ord_DetId;
//                            }
//                        }
//                    }
//                    loadshconTab(PackItemList);
//                }
//                else if (type == "") {
//                    PackItemList = [];
//                    loadshconTable(PackItemList);
//                }

//                if (type == "Solid") {
//                    for (i = 0; i < PackItemList.length; i++) {

//                        for (j = 0; j < quan.length; j++) {

//                            if (i == j) {
//                                PackItemList[i].Buy_Ord_DetId = quan[j].Buy_Ord_DetId;
//                            }
//                        }
//                    }
//                    loadshconTable(PackItemList);
//                }

//            }
//            else {

//                if (type == "Color/Size") {
//                    loadshconTab(PackItemList);
//                }
//                else if (type == "") {
//                    PackItemList = [];
//                    loadshconTable(PackItemList);
//                }

//                if (type == "Solid") {
//                    loadshconTable(PackItemList);
//                }
//            }


//        },
//        failure: function (errMsg) {
//            alert(errMsg);
//        }
//    });
//}

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

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

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
function fnAllowCalc() {
    var qty = ($('#txtShipQuantity').val().trim() == "" ? 0 : $('#txtShipQuantity').val());
    var allo = ($('#txtallowance').val().trim() == "" ? 0 : $('#txtallowance').val());

    var totpqty = parseInt((qty * GCon));
    var Allprodqty = parseInt((totpqty * allo) / 100);
    var prodqty = Math.ceil(parseInt(totpqty) + parseInt(Allprodqty));
    $('#txtheadprodqty').val(prodqty);
}
function LoadGuom() {


    if ($('#ddlPort').val() != 0) {

        Guom = $("#txtHGUom").val();
        $('#ddlUom').val(Guom);
    }
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

function loadcolorItemYarnTable(comboItemYarnList) {
    $('#tblyarndetails').DataTable().destroy();
    debugger;

    $('#tblyarndetails').DataTable({
        data: comboItemYarnList,
        scrollY: 100,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        columns: [
            { title: "UID", data: "RowId", "visible": false },
            { title: "ID", data: "ColorID", "visible": false },
            { title: "ComboItemRowId", data: "ComboItemRowId", "visible": false },
            { title: "Color Seq", data: "ColorSeq", "visible": false },
            { title: "Color", data: "ColorName" },
             { title: "Combo Color", data: "combocolor" },
             { title: "Item", data: "Itemname" },
               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnyarnedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnyarnremove btn-round btn btn-danger"> <i class="fa fa-times"></i> </button>'
               }
        ]
    });


    $("#tblyarndetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblyarndetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}

function loadsizeTable(sizeList) {
    $('#tblsizedetails').DataTable().destroy();
    debugger;
    $('#tblsizedetails').DataTable({
        data: sizeList,
        scrollY: 100,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        columns: [
            { title: "RowSeq", data: "ComboSizeSeq", "visible": false },
            { title: "ID", data: "SizeId", "visible": false },
            { title: "SIZE", data: "SizeName" },
               {
                   title: "ACTION", "mDataProp": null,
                   //"sDefaultContent": '<button type="button" class="btnedit"> Edit </button> <a id=" 1 " onclick="return DeleteChild(this)" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="1"><i class="fa fa-trash-o" style="cursor: pointer;"></i></a>'
                   "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnremove btn btn-danger btn-round"> <i class="fa fa-times"></i> </button><i class="fa fa-trash-o" style="cursor: pointer;display:none;"></i></a>'//<button type="button" class="btnsizeview"> View Color </button>
               }
        ]
    });
}

function loadcolorTable(comboList) {
    $('#tblcolordetails').DataTable().destroy();
    debugger;

    $('#tblcolordetails').DataTable({
        data: comboList,
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
            { title: "ComboID", data: "ComboId", "visible": false },
            { title: "Combo Color", data: "ComboName" },
            { title: "ColorID", data: "ColorId", "visible": false },
            { title: "Color", data: "ColorName" },
            { title: "ItemID", data: "ItemId", "visible": false },
            { title: "Item", data: "ItemName" },
            { title: "Pcs", data: "ColorRatio" },
            { title: "ColorSeq", data: "ColorSeq", "visible": false },
            //{ title: "%", data: "ComboPer" },
            //{ title: "Qty", data: "ComboQty" },
               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btncoloredit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btncolorremove btn btn-danger btn-round"> <i class="fa fa-times"></i> </button><button type="button" data-toggle="tooltip" data-placement="top" title="Add Item" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btncolorview btn btn-info btn-round"> <i class="fa fa-eye"></i> </button>'

               }
        ]
    });


    $("#tblcolordetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblcolordetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });

}

function fnGetRefQty(OrderId) {
    debugger;
    //LoadBuyerDDL("#ddlBuyer");
    //LoadOrderNoDDL("#ddlOrderNo");
    $.ajax({
        url: "/StyleEntry/GetbyIDOrder/" + OrderId,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        //dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;

            if (result.Status == 'SUCCESS') {
                $('#txtRefNo').val(obj.Ref_No);
                $('#txtQty').val(obj.quantity);
                $('#ddlBuyer').val(obj.BuyerName);
                $('#ddlOrderNo').val(obj.order_no);
                $('#ddlOrderNoId').val(OrderId);
                GuomConversion = obj.GuomConversion;

            }

            loadorderQtyno(BMasId);
        },
        error: function (errormessage) {
            debugger;
            alert(errormessage.responseText);
        }
    });
}

function loadorderQtyno(BMasId) {
    debugger;
    $.ajax({
        url: "/StyleEntry/Getorderno",
        data: JSON.stringify({ buyormasid: BMasId }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;

            var obj = result.Value;
            if (obj.length > 0) {
                var text1 = obj[0]["order_no"];
                $("#ddlOrderNo option").filter(function () {
                    return this.text == text1;
                }).attr('selected', true);

                $('#txtbalamount').val(obj[0]["quantity"]);
            }
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function fngetitembystyle(styleid) {
    debugger;
    $.ajax({
        url: "/StyleEntry/GetStyleItem/" + (styleid == null ? 0 : styleid),
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;

            if (result.Status == 'SUCCESS') {
                $("#ddlitem").append($('<option/>').val('0').text('--Select Item--'));
                $("#ddlcoloritem").append($('<option/>').val('0').text('--Select Item--'));
                $.each(obj, function () {
                    $("#ddlitem").append($('<option></option>').val(this.Itemid).text(this.ItemName));
                    $("#ddlcoloritem").append($('<option></option>').val(this.Itemid).text(this.ItemName));
                });
                $("#ddlcoloritem").prop("selectedIndex", 1);

            }
        },
        error: function (errormessage) {
            debugger;
            alert(errormessage.responseText);
        }
    });

}
/////////////////////////////////////

//function for updating Style record
function Update() {
    var imgdet = [];

    //for (var d = 0; d < nametxt.length; d++) {

    //    var res = [];
    //    res = nametxt[d].FilePath.split("/");

    //    var obj = {
    //        Imgpath: nametxt[d].FilePath,
    //        Imgtitle: res[2],//title[d],
    //        Order_no: $('#ddlOrderNo').val()// $('#ddlOrderNo option:selected').text()
    //    }
    //    imgdet.push(obj);
    //}


    //var res = validate();
    //if (res == false) {
    //    return false;
    //}
    var checkbox_value = "";
    $(":checkbox").each(function () {
        var ischecked = $('#Status').is(":checked");
        if (ischecked) {
            checkbox_value += "on";
        }
        else {
            checkbox_value += "off";
        }
    });
    var ptype = $('input[name="PAType"]:checked').attr('value');
    debugger;
    var SizeObj = {
        StyleRowid: StyleRowNoId,//$('#txtstyleEntryID').val(),

        ComboSize: sizeList,
        ComboColor: comboList,
        ComboStyleItem: comboItemList,
        ComboItemComposition: comboItemYarnList,
        Buyordimg: imgdet,
        //PA: ptype,
        //Description: $('#txtdesc').val(),

    };
    LoadingSymb();
    $.ajax({
        url: "/OrderDetailsAmend/Update",
        data: JSON.stringify(SizeObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.Value == true) {
                AddUserEntryLog('SalesManagement', 'Order Amendment', 'UPDATE', 'Style');
                //alert("Data Amended Sucessfully");
                var msg = 'Data Amended Sucessfully...';
                var flg = 1;
                var mode = 0;
                AlartMessage(msg, flg, mode);
                //window.location.href = "/BulkOrder/BulkOrderIndex";
                //location.reload();
            } else {

                window.location.href = "/Error/Index";


            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function LoadItemCombo() {
    debugger;
    //validation and add order items
    var isAllValid = true;

    debugger;
    if ($('#ddlcoloritem').val() == "0") {
        isAllValid = false;
        //$('#ddlcoloritem').siblings('span.error').css('visibility', 'visible');
        $('#ddlcoloritem').siblings(".select2-container").css('border', '1px solid red');
    }
    else {
        //$('#ddlcoloritem').siblings('span.error').css('visibility', 'hidden');
        $('#ddlcoloritem').siblings(".select2-container").css('border', 'lightgrey');
    }

    //Finding the max value of an attribute in an array of objects
    var max = 0;
    jQuery.map(comboItemList, function (obj) {
        debugger;
        if (obj.Itemseq > max)
            max = obj.Itemseq;
    });
    //End

    if (itemseq == 0 && comboItemList.length == 0) {
        itemseq = 1;
    }
    else {
        itemseq = max + 1//comboItemList.length+1;
    }

    if (isAllValid) {
        debugger;
        var comboItemListObj = {
            ComboColorId: colorseq,
            Itemseq: itemseq,
            Combocolor: $("#ddlcombo option:selected").text(),//combocolor,
            ComboId: $("#ddlcombo").val(),
            ItemName: $("#ddlcoloritem option:selected").text(),
            ItemID: $('#ddlcoloritem').val(),
            ItemRatio: $('#txtpcs').val(),
            Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
        };

        comboItemList.push(comboItemListObj);
        itemlist = [];
        for (var s = 0; s < comboItemList.length; s++) {
            if (comboItemList[s].ComboColorId == colorseq) {
                itemlist.push(comboItemList[s]);
            }

        }
        var totpiece = [];
        for (var e = 0; e < itemlist.length; e++) {
            if (itemlist[e].Combocolor == comboItemListObj.Combocolor) {
                totpiece.push(itemlist[e].ItemRatio);
            }
        }

        var totalamnt = 0;
        for (var e = 0; e < totpiece.length; e++) {
            var amount = totpiece[e];
            totalamnt = totalamnt + parseFloat(amount);

        }
        //if (totalamnt <= 1) {

        //}
        //else {
        //    alert('Total piece should not exceed ' + 1);
        //    itemlist.pop(comboItemListObj);
        //    comboItemList.pop(comboItemListObj);
        //}
        loadcolorItemTable(itemlist);

        //$('#ddlitem').val('0');
        //$('#txtitempcs').val('');
    }
}

function loadcolorItemTable(comboItemList) {
    $('#tblitemdetails').DataTable().destroy();
    debugger;

    $('#tblitemdetails').DataTable({
        data: comboItemList,
        scrollY: 100,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        columns: [
            { title: "Item Seq", data: "Itemseq", "visible": false },
            { title: "ItemID", data: "ItemID", "visible": false },
            { title: "ComboColorId", data: "ComboColorId", "visible": false },
            { title: "ComboId", data: "ComboId", "visible": false },
            { title: "Item", data: "ItemName" },
            { title: "ComboColor", data: "Combocolor" },
            { title: "Pcs", data: "ItemRatio" },
               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnitemedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnitemremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button><button type="button" data-toggle="tooltip" data-placement="top" title="View Yarn" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnyarnview btn btn-round btn-info"> <i class="fa fa-eye"></i> </button>'
               }
        ]
    });



    $("#tblitemdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblitemdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}

function Close() {
    window.location.href = "/DefaultPage/DefaultPage?UserName=" + UserName;
}

function ShipUpdate() {

    debugger;

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

    if (itemlistadd.length > 0) {

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
        //alert("Please Enter Atleast Any One Quantity in Assort Details..");\
        var msg = 'Please Enter Atleast Any One Quantity in Assort Details';
        var flg = 4;
        var mode = 1;
        AlartMessage(msg, flg, mode);
        return true;
    }



    if (sepitemlistadd.length > 0) {
        for (var i = 0; i < sepitemlistadd.length; i++) {
            var det = {

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
            StyleRowid: StyleRowID,
        };
        SaveShipList.push(compItemObj);
    }

    var ptype = $('input[name="PAType"]:checked').attr('value');
    var objSubmit = {
        Buy_Ord_Ship: $('#txtShipNo').val(),
        Order_No: $('#txtOrderNo').val(),
        StyleId: $('#txtHStyleID').val(),
        StyleRowid: StyleRowID,
        //BuyOrdShipItem: ShipmentItemList,

        BuyOrdShipItem: ShipmentItemList,
        BuyOrdShipratio: listof,
        BuyOrdShipquan: listofsep,
        PA: ptype
    };

    var WoObj = {
        StylerowId: StyleRowID,
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
    $("#ShipUpdate").attr("disabled", true);
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
                AddUserEntryLog('SalesManagement', 'Order Amendment', 'UPDATE', 'Shipment');
                ////alert("Data Amended Successfully");
                var msg = 'Data Amended Successfully...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                window.location.href = "/BulkOrder/BulkOrderIndex";
                //location.reload();
            } else {

                window.location.href = "/Error/Index";

            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function ConUpdate() {

    debugger;

    //var conupflag = 0;
    if (Mod == 1) {
        var FYmode = "A";
    }

    if (compList.length == 0) {

        //alert("Please Check Component Details..");
        var msg = 'Please Check Component Details...';
        var flg = 4;
        var mode = 1;
        AlartMessage(msg, flg, mode);
        return true;
    }

    if (ConItemList.length == 0) {

        //alert("Please Enter the Consumption Details..");
        var msg = 'Please Enter the Consumption Details...';
        var flg = 4;
        var mode = 1;
        AlartMessage(msg, flg, mode);
        return true;
    }

    var tot = [];
    for (var d = 0; d < ConItemList.length; d++) {
        if (ConItemList[d].GreyWidthID == 0) {
            tot.push(ConItemList[d]);
        }
    }

    if (tot.length > 0) {
        //alert('Please choose greywidth...');
        var msg = 'Please choose greywidth...';
        var flg = 4;
        var mode = 1;
        AlartMessage(msg, flg, mode);
        return true;
    }


    var ptype = 'P';
    var objConSubmit = {

        CompanyID: PlanCompanyid,
        Order_No: PlanOrderNo,
        ItemID: PlanItemId,
        Styleid: PlanStyleid,
        BMasID: PlanBmasid,
        EDate: $('#txtPlanEntryDate').val(),//new Date($('#txtEntryDate').val()),
        PrgThr: "W",
        PA: ptype,
        Mode: FYmode,
        PlanID: PlanId,
        CreatedBy: Guserid,
        CompoItemMas: compList,
        CompoItemDetails: ConItemListSave,


    };
    $("#ConUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/PlanningConsumption/ConUpdate",
        data: JSON.stringify(objConSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == true) {
                AddUserEntryLog('SalesManagement', 'Order Amendment', 'UPDATE', 'Consumption');
                //alert("Consumption Updated Sucessfully");
                var msg = 'Consumption Updated Sucessfully...';
                var flg = 1;
                var mode = 1;
                AlartMessage(msg, flg, mode);

                debugger;
                //$('#profile-tab1').attr('style', 'background-color : #acf2c1');
                //$('#profile-tab2').attr('style', 'background-color : #acf2c1');

                ////if (conupflag == 1) {

                //$('#ConAdd').hide();
                //$('#ConUpdate').show();
                Mod == 1;

                if (fcompno == 0) {
                    fcompno = 1;
                } else {
                    fcompno == fcompno;
                }
                LoadPlanFabriComp(PLID);
                EditCompFabricLossPlanList(PLID, fcompno);


            } else {

                window.location.href = "/Error/Index";


            }
        },
        error: function (errormessage) {

            alert(errormessage.responseText);
        }
    });
}

function FabUpdate() {

    debugger;

    var fabupflag = 0;
    if (Mod == 1) {
        var FYmode = "A";
    }



    var ptype = 'P';
    var objConSubmit = {

        CompanyID: PlanCompanyid,
        Order_No: PlanOrderNo,
        ItemID: PlanItemId,
        Styleid: PlanStyleid,
        BMasID: PlanBmasid,
        EDate: $('#txtPlanEntryDate').val(),//new Date($('#txtEntryDate').val()),
        PrgThr: "W",
        PA: ptype,
        Mode: FYmode,
        PlanID: PlanId,
        CreatedBy: Guserid,

        PlanFabricDet: PlanCompFabricDetSave,
        PlanLoss: PlanLossSave,



    };
    $("#FabUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/PlanningConsumption/FabUpdate",
        data: JSON.stringify(objConSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == true) {
                AddUserEntryLog('SalesManagement', 'Order Amendment', 'UPDATE', 'Fabric Plan');
                //alert("Fabric Updated Sucessfully");
                var msg = 'Fabric Updated Sucessfully...';
                var flg = 1;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                //$('#profile-tab1').attr('style', 'background-color : #F5F7FA');

                EditCompFabricLossPlanList(PLID, fcompno);


                Mod == 1;

            } else {

                window.location.href = "/Error/Index";


            }
        },
        error: function (errormessage) {

            alert(errormessage.responseText);
        }
    });
}

function YarnUpdate() {

    debugger;

    var yarnupflag = 0;
    if (Mod == 1) {
        var FYmode = "A";
    }

    var det = [];
    if (PlanYarnSave.length > 0) {
        if (PlanYarnDetSave.length == 0) {
            //alert("Please Enter the Yarn Details..");
            var msg = 'Please Enter the Yarn Details...';
            var flg = 4;
            var mode = 1;
            AlartMessage(msg, flg, mode);
            return true;
        }
        var c = 0;
        for (var e = 0; e < PlanYarnSave.length; e++) {
            FD = PlanYarnSave[e].FabricID;
            FCD = PlanYarnSave[e].Fabric_ColorId;
            var totalper = 0;
            for (var f = 0; f < PlanYarnDetSave.length; f++) {
                if (PlanYarnDetSave[f].FabricID == FD && PlanYarnDetSave[f].BaseColorID == FCD) {
                    var per = PlanYarnDetSave[f].Knit_In_Per;
                    totalper = totalper + parseFloat(per);
                }

            }
            if (totalper < 100) {
                //alert('Separate weight should not be less than 100');
                var msg = 'Separate weight should not be less than 100...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }
        }

        var r = 0;
        for (var e = 0; e < PlanYarnSave.length; e++) {
            // r = PlanYarnSave[e].SlNo;


            FD = PlanYarnSave[e].FabricID;
            FCD = PlanYarnSave[e].Fabric_ColorId;
            var data = $.grep(PlanYarnDetSave, function (e) {
                return e.FabricID == FD;
            });

            if (data.length == 0) {
                //alert('Yarn must be filled for all fabric...');
                var msg = 'Yarn must be filled for all fabric...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }
        }

        //Total Fabric weight
        var totalpqt = 0;
        for (var e = 0; e < PlanYarnSave.length; e++) {
            var pcs = PlanYarnSave[e].Fabric_Weight;
            totalpqt = totalpqt + parseFloat(pcs);

        }
        var TFWeight = (totalpqt.toFixed(1));


        //Total Yarn weight
        var totalypqt = 0;
        for (var e = 0; e < PlanYarnDetSave.length; e++) {
            var ypcs = PlanYarnDetSave[e].Knit_In_ActQty;
            totalypqt = totalypqt + parseFloat(ypcs);

        }
        var TYWeight = (totalypqt.toFixed(1));


        if (parseFloat(TYWeight) != parseFloat(TFWeight)) {
            //alert("Please Check the Total Fabric Weight and Total Yarn Weight for all Panels..");
            var msg = 'Please Check the Total Fabric Weight and Total Yarn Weight for all Panels...';
            var flg = 4;
            var mode = 1;
            AlartMessage(msg, flg, mode);
            return true;
        }

        var YarnDyeingSave = [];
        for (i = 0; PlanYarnDetSave.length > i; i++) {
            if (PlanYarnDetSave[i].Dyeing_Req == true || PlanYarnDetSave[i].Dyeing_Req == 1) {
                for (j = 0; PlanYarnDyeingSave.length > j; j++) {
                    if (PlanYarnDetSave[i].SlNo == PlanYarnDyeingSave[j].YDSlNo) {
                        YarnDyeingSave.push(PlanYarnDyeingSave[j]);
                    }
                }
            }
        }
        PlanYarnDyeingSave = YarnDyeingSave;
        //Total Yarn weight for yarn dyeing and yarn details check
        if (PlanYarnDyeingSave.length > 0) {
            var totalypdqt = 0;
            for (var e = 0; e < PlanYarnDetSave.length; e++) {

                if (PlanYarnDetSave[e].Dyeing_Req == true || PlanYarnDetSave[e].Dyeing_Req == 1) {
                    var ydpcs = PlanYarnDetSave[e].Knit_In_ActQty;
                    totalypdqt = totalypdqt + parseFloat(ydpcs);
                }
            }
            var TYDWeight = (totalypdqt.toFixed(1));

            var totalypddqt = 0;
            for (var e = 0; e < PlanYarnDyeingSave.length; e++) {


                var yddpcs = PlanYarnDyeingSave[e].Weight;
                totalypddqt = totalypddqt + parseFloat(yddpcs);

            }
            var TYDDWeight = (totalypddqt.toFixed(1));


            if (Math.round(TYDDWeight) != Math.round(TYDWeight)) {
                //alert("Please Check the Total Yarn Weight and Total Yarn dyeing Weight for all Dyed Yarn..");
                var msg = 'Please Check the Total Yarn Weight and Total Yarn dyeing Weight for all Dyed Yarn...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }
        }
        //
    }
    else {
        for (var e = 0; e < compList.length; e++) {
            var cs = compList[e].CompSlNo;
            var totalamnt = 0;
            for (var v = 0; v < PlanCompFabricDetSave.length; v++) {
                if (PlanCompFabricDetSave[v].CompSlNo == cs) {

                    var amount = parseFloat(PlanCompFabricDetSave[v].BColorPQty) + parseFloat(PlanCompFabricDetSave[v].FColorPQty);
                    totalamnt = totalamnt + parseFloat(amount);
                }
            }
            totalamnt = totalamnt.toFixed(3);
            var totam = 0;
            for (var l = 0; l < PlanCompFabricDetSave.length; l++) {
                if (PlanCompFabricDetSave[l].CompSlNo == cs) {
                    var at = PlanCompFabricDetSave[l].Weight;
                    totam = totam + parseFloat(at);
                }

            }
            totam = totam.toFixed(3);
            var tot = $('#txttotwt').val();
            if (totalamnt == totam) {

            }
            else {
                det.push(cs);
            }
        }

        if (det != 0) {
            //alert('Yarn must be filled...');
            var msg = 'Yarn must be filled...';
            var flg = 4;
            var mode = 1;
            AlartMessage(msg, flg, mode);
            return true;
        }
    }

    if (PlanYarnDyeingSave.length > 0) {
        //for (var u = 0; u < PlanYarnDetSave.length; u++) {
        //    var cl = PlanYarnDetSave[u].CompSno;
        //    var so = PlanYarnDetSave[u].SlNo;
        for (var h = 0; h < PlanYarnDyeingSave.length; h++) {
            var nm = 0;
            var gar = PlanYarnDyeingSave[h].Garment_ColorID;
            var yl = PlanYarnDyeingSave[h].YDSlNo;
            var cn = PlanYarnDyeingSave[h].CompSlNo;
            var totalamnt = 0;

            for (var g = 0; g < PlanYarnDyeingSave.length; g++) {
                nm = 1;
                if (PlanYarnDyeingSave[g].YDSlNo == yl && PlanYarnDyeingSave[g].CompSlNo == cn && PlanYarnDyeingSave[g].Garment_ColorID == gar) {
                    var amount = PlanYarnDyeingSave[g].Qty_Per;
                    totalamnt = totalamnt + parseFloat(amount);
                }
            }
            if (totalamnt == 100) {

            }
            else if (totalamnt == 0 && nm == 1) {
                //alert('Fill all the percentage');
                var msg = 'Fill all the percentage...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }
            else if (totalamnt < 100) {
                //alert('Percentage should not be less than 100...');
                var msg = 'Percentage should not be less than 100...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }
            else if (totalamnt > 100) {
                //alert('Percentage should not exceed 100..');\
                var msg = 'Percentage should not exceed 100...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }
        }
        // }
    }


    var ptype = $('input[name="PAType"]:checked').attr('value');
    var objYarnSubmit = {

        CompanyID: PlanCompanyid,
        Order_No: PlanOrderNo,
        ItemID: PlanItemId,
        Styleid: PlanStyleid,
        BMasID: PlanBmasid,
        EDate: $('#txtPlanEntryDate').val(),
        PrgThr: "W",
        PA: ptype,
        Mode: FYmode,
        PlanID: PLID,
        CreatedBy: Guserid,
        PlanYarnN: PlanYarnSave,
        PlanYarnDet: PlanYarnDetSave,
        PlanYarnLoss: PlanYarnLossSave,
        PlanYarnDyeing: PlanYarnDyeingSave


    };
    $("#YarnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/PlanningConsumption/YarnUpdate",
        data: JSON.stringify(objYarnSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == true) {
                AddUserEntryLog('SalesManagement', 'Order Amendment', 'UPDATE', 'Yarn Plan');
                //alert("Yarn Updated Sucessfully");
                var msg = 'Yarn Updated Sucessfully...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                $('#profile-tab2').attr('style', 'background-color : #F5F7FA');
                CreateProg();
                Mod == 1;

            } else {

                window.location.href = "/Error/Index";


            }
        },
        error: function (errormessage) {

            alert(errormessage.responseText);
        }
    });
}

function CreateProg() {

    if (ProcSeqList.length > 0) {
        $.each(ProcSeqList, function () {
            var ProcessId = this.Processid;
            var JobOrderNo = $("#txtworkno").val();

            $.ajax({
                url: "/ProcessSeqProc/CheckProSeq",
                data: JSON.stringify({ Processid: ProcessId, JobNo: JobOrderNo }),
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {

                    var obj = result.Value;
                    debugger;
                    if (obj.length == 0) {


                        //alert("Please Save Selected Process Sequence...");
                        var msg = 'Please Save Selected Process Sequence...';
                        var flg = 4;
                        var mode = 1;
                        AlartMessage(msg, flg, mode);
                        return true;

                    }
                    else {
                        LoadAutoGenerate(JobOrderNo, ProcessId, Guserid);
                    }
                },

                failure: function (errMsg) {
                    alert(errMsg);
                }
            });
        });
        //alert("Program Updated Sucessfully..");
        var msg = 'Program Updated Sucessfully...';
        var flg = 1;
        var mode = 1;
        AlartMessage(msg, flg, mode);
    }
}
function LoadAutoGenerate(JobOrderNo, ProcessId, Userid) {
    debugger;
    $.ajax({
        url: "/ProcessSeqProc/AutoProg",
        data: JSON.stringify({ Processid: ProcessId, JobNo: JobOrderNo, CreatedBy: Userid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == true) {
               // alert("Program Created Sucessfully..");
            } else {
                window.location.href = "/Error/Index";
            }
             
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function CheckFab() {

    var Wgt = $('#txtWeight').val();

    if (Wgt == 0) {
        //alert("Please Select the Fabric Row:By click the Yarn Button");
    }
}
function LoadPer(val) {
    debugger;
    if ($('#txtPer').val() > 100) {
        //alert('Percentage should below 100...');
        var msg = 'Percentage should below 100...';
        var flg = 4;
        var mode = 1;
        AlartMessage(msg, flg, mode);
        return true;
    }
    var totper = 0;
    for (var i = 0; PlanYarnDet.length > i; i++) {
        if (PlanYarnDet[i].SlNo != yneditslno) {
            totper = totper + parseFloat(PlanYarnDet[i].Knit_In_Per);
        }
    }
    totper = totper + parseFloat($('#txtPer').val());
    if (totper > 100) {
        //alert('Percentage total should be 100...');
        var msg = 'Percentage total should be 100...';
        var flg = 4;
        var mode = 1;
        AlartMessage(msg, flg, mode);
        $('#txtPer').val('0');
        $('#txtWeight').val('0');
        $('#txtActualWeight').val('0');
        return true;
    }

    var Wgt = wt;

    var Per = $('#txtPer').val();
    var AWght = (Per / 100) * Wgt;
    AWght = AWght.toFixed(3);
    $('#txtWeight').val(AWght);
    $('#txtActualWeight').val(AWght);

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
$(document).on('click', '.btnshowstock', function () {

    debugger;
    $('#myModal2').modal('show');
    var table = $('#tCDbody').DataTable();
    var row = $(this).closest('tr');
    var data = $('#tCDbody').dataTable().fnGetData(row);
    var sbclid = data.BColorID;
    var sbcl = data.Bcolor;
    var sfclid = data.FColorID;
    var sfcl = data.Fcolor;
    var sfbid = data.FabricID;
    var sksize = data.GreyWidth;
    var sfsize = data.FinishWidth;
    var sksizeid = data.GreyWidthID;
    var sfsizeid = data.FinishWidthID;
    var sfabric = data.Fabric;
    $('#BaseColor').val(sbcl);
    $('#FinColor').val(sfcl);
    $('#knittingsize').val(sksize);
    $('#Finsize').val(sfsize);
    $('#txtfabric').val(sfabric);

    loadstockbasecolor(sfbid, sbclid, sksizeid);
    loadstockfinishcolor(sfbid, sfclid, sfsizeid);
});
function loadstockbasecolor(sfbid, sbclid, sksizeid) {
    debugger;

    $.ajax({
        url: "/PlanningConsumption/LoadStockBaseDetails",
        data: JSON.stringify({ FabricID: sfbid, BColorID: sbclid, GreyWidthID: sksizeid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            BaseStockList = result;
            loadBaseStockTable(BaseStockList);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function loadstockfinishcolor(sfbid, sfclid, sfsizeid) {
    debugger;

    $.ajax({
        url: "/PlanningConsumption/LoadStockFinishDetails",
        data: JSON.stringify({ FabricID: sfbid, FColorID: sfclid, FinishWidthID: sfsizeid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            FinishStockList = result;
            loadFinishStockTable(FinishStockList);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function loadBaseStockTable(compListObj) {
    debugger;
    var inputcount = 0;
    $('#tblbasestock tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tblbasestock').DataTable().destroy();
    }
    $('#tblbasestock').empty();

    $('#tblbasestock').DataTable({
        data: BaseStockList,
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
             { title: "S.No", data: "StkSlno" },
            { title: "Order No", data: "SOrderno" },
            { title: "Ref No", data: "SRefno" },
            { title: "Trans.No", data: "STransno" },
            { title: "Supplier", data: "SSupplier" },
            { title: "Process", data: "SProcess" },
            { title: "Stock Qty", data: "StockQty" },
        ]
    });




}
function loadFinishStockTable(compListObj) {
    debugger;
    var inputcount = 0;
    $('#tblfinishstock tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tblfinishstock').DataTable().destroy();
    }
    $('#tblfinishstock').empty();

    $('#tblfinishstock').DataTable({
        data: FinishStockList,
        scrollY: 300,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        columns: [
                { title: "S.No", data: "StkSlno" },
            { title: "Order No", data: "SOrderno" },
            { title: "Ref No", data: "SRefno" },
            { title: "Trans.No", data: "STransno" },
            { title: "Supplier", data: "SSupplier" },
            { title: "Process", data: "SProcess" },
            { title: "Stock Qty", data: "StockQty" },
        ]
    });



}

function LoadstockDetails(itemid, sizeid, colorid) {

    $.ajax({
        url: "/PlanningConsumption/LoadStockDetails",
        data: JSON.stringify({ Itemid: itemid, Sizeid: sizeid, Colorid: colorid }),
        type: "POST",
        async: false,
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result;
            var stkdet = [];
            stkdet = result;
            $('#lblstk').show;
            LoadStockDetTable(stkdet);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}

function LoadStockDetTable(StockList) {
    var inputcount = 0;
    $('#tblStockdet tr').each(function () {
        inputcount++;
    });
    if (inputcount > 0) {
        $('#tblStockdet').DataTable().destroy();
    }
    $('#tblStockdet').DataTable({
        data: StockList,
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
            { title: "Order No", data: "SOrderno" },
            { title: "Ref No", data: "SRefno" },
            { title: "Style", data: "SStyle" },
              { title: "Supplier", data: "SSupplier" },
                { title: "Stock Qty", data: "StockQty" },
                 { title: "Despatch", data: "SDespatch" },
        ]
    });
}
