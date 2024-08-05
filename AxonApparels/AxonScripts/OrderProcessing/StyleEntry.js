/// <reference path="jquery-1.9.1.intellisense.js" />
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
var Hstyleid = 0;
var type = '';
var curmode = 0;
var DispatchClosed = "N";

$(document).ready(function () {
    debugger;
    //DcurrId = $("#hdnDCurrencyId").data('value');
    DcurrencyAbs = $("#hdnDCurrencyAbs").data('value');
    EnbTranDate = $("#hdnETransDate").data('value');
    Roleid = $("#hdnRoleid").data('value');
    superuser = $("#hdnusername").data('value');

    document.getElementById("DcurrAbs").innerHTML = DcurrencyAbs;

    if (EnbTranDate == "Y") {
        $("#txtstyledate").prop("disabled", true);

    } else {
        $("#txtstyledate").prop("disabled", false);

    }
    
    var qrStr = window.location.search;
    var spQrStr = qrStr.substring(1);
    var arrQrStr = new Array();
    var arr = spQrStr.split('?');

    for (var i = 0; i < arr.length; i++) {
        var queryvalue = arr[i].split('=');

    }
    BMasId = queryvalue[1];
    Mod = queryvalue[3];
    Mode = queryvalue[3];
    type = queryvalue[5];
    //LoadCurrencyDDL("#ddlCurrencyload");
    LoadSeasonDDL("#ddlseason");
    LoadStyleDDL("#ddlstyle");
    LoadOrderNoDDL("#ddlCpyOrderNo");
    loadorderQtyno(BMasId);
    $('#ddlCpyStyleNo').empty();
    $('#ddlCpyStyleNo').append($('<option/>').val('0').text('--Select Style--'));


    if (Mod == 1) {

        fnGetRefQty(BMasId);
    }

    if (queryvalue.length == 8) {
        Mode = queryvalue[3];
        OrdApp = "Y";
        var styrw = queryvalue[7];
        Gs = "Sty";
        getbyEditID(styrw);
        return true;
    }
    if (Mod == 0) {
        clearTextBox();
        $('#myModal').modal('show');
    }
    var Type = "Sty";
    loadData(Type);
    $(document).on('click', '.btnaddsize', function () {
        debugger;
        Menuid = 2437;
        rightsflg = 0;
        if (superuser.toUpperCase() != "SUPERUSER") {
            Rolecheck();
        }
        else {
            rightsflg = 1;
            addsize();
        }
    });
    $(document).on('click', '.btnaddcolor', function () {
        debugger;
        Menuid = 2436;
        rightsflg = 0;
        if (superuser.toUpperCase() != "SUPERUSER") {
            Rolecheck();
        }
        else {
            rightsflg = 1;
            addcolor();
        }
    });
    $(document).on('click', '.btnadditem', function () {
        debugger;
        Menuid = 2435;
        rightsflg = 0;
        if (superuser.toUpperCase() != "SUPERUSER") {
            Rolecheck();
        }
        else {
            rightsflg = 1;
            additem();
        }
        
    });
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

    $(document).on('click', '.btnsizeview', function () {
        debugger;
        var isItem = $('#divcolor').is(':visible');
        if (isItem == false) {
            $('#divcolor').show();
        }
        rowindex = $(this).closest('tr').index();
        var currentcolorrow = sizeList.slice(rowindex);
        sizeseq = currentcolorrow[0].ComboSizeSeq;

        //Temporarily commanded by Mohammed
        //var colorempty = [];
        //colorempty = comboList;

        //colorempty = $.grep(colorempty, function (v) {
        //    return v.ComboSeq === sizeseq;
        //});

        //loadcolorTable(colorempty);
    });

    $(document).on('click', '.btncolorview', function () {
        debugger;
        var isItem = $('#divyarn').is(':visible');
        yarnlist = [];
        if (isItem == false) {
            ////$('#divyarn').show();
            //$("#divyarn").modal('show');
            //$('#divitem').show();

            $('#divyarn').show();
        }

        rowindex = $(this).closest('tr').index();
        //var currentcolorrow = comboItemList.slice(rowindex);
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
                    //if (comboItemYarnList[d].ComboItemRowId == comboitemrowid) {
                    if (comboItemYarnList[d].ColorSeq == itemseq) {
                        if (comboItemYarnList[d].ComboItemRowId == 0) {
                            comboItemYarnList[d].ComboItemRowId = comboitemrowid;
                        }
                        yarnlist.push(comboItemYarnList[d]);
                    }
                    if (comboItemYarnList[d].ComboItemRowId == comboitemrowid) {
                        comboItemYarnList[d].combocolor = combocol;
                        //yarnlist.push(comboItemYarnList[d]);
                    }
                }
                //else if (Mod == 1) {
                //    if (comboItemYarnList[d].ComboItemRowId == itemseq) {
                //        yarnlist.push(comboItemYarnList[d]);
                //    }
                //}

            }
            loadcolorItemYarnTable(yarnlist);
        }
        //var isItem = $('#divitem').is(':visible');
        //itemlist = [];
        //if (isItem == false) {
        //    $('#divitem').show();
        //}
        //rowindex = $(this).closest('tr').index();
        //var currentcolorrow = comboList.slice(rowindex);
        ////Combocolorid = currentcolorrow[0].CombocolorId;
        //if (Mod == 0) {
        //    colorseq = currentcolorrow[0].ColorSeq;
        //}
        //else if (Mod == 1) {
        //    Combocolorid = currentcolorrow[0].CombocolorId;
        //}
        //combocolor = currentcolorrow[0].ComboName;

        //if (comboItemList.length > 0) {
        //    for (var d = 0; d < comboItemList.length; d++) {
        //        if (Mod == 0) {
        //            if (comboItemList[d].ComboColorId == colorseq) {
        //                itemlist.push(comboItemList[d]);
        //            }
        //        }
        //        else if (Mod == 1) {
        //            if (comboItemList[d].ComboColorId == Combocolorid) {
        //                itemlist.push(comboItemList[d]);
        //            }
        //        }
        //    }
        //    loadcolorItemTable(itemlist);
        //}
    });

    $(document).on('click', '.btnyarnview', function () {
        debugger;
        var isItem = $('#divyarn').is(':visible');
        yarnlist = [];
        if (isItem == false) {
            $('#divyarn').show();
        }

        rowindex = $(this).closest('tr').index();
        //var currentcolorrow = comboItemList.slice(rowindex);
        var currentcolorrow = itemlist.slice(rowindex);
        itemseq = currentcolorrow[0].Itemseq;
        itemname = currentcolorrow[0].ItemName;
        combocol = currentcolorrow[0].Combocolor;
        comboitemrowid = currentcolorrow[0].ComboitemRowId;
        if (comboItemYarnList.length > 0) {
            for (var d = 0; d < comboItemYarnList.length; d++) {
                if (Mod == 0) {
                    if (comboItemYarnList[d].ComboItemRowId == itemseq) {
                        yarnlist.push(comboItemYarnList[d]);
                    }
                }
                else if (Mod == 1) {
                    if (comboItemYarnList[d].ComboItemRowId == comboitemrowid) {
                        yarnlist.push(comboItemYarnList[d]);
                    }
                }


            }
            loadcolorItemYarnTable(yarnlist);
        }
    });

    $('#btncoloradd').click(function () {
        debugger;
        //validation and add order items
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

                //$('#ddlcombo').val('0');
                $('#ddlcolor').val('0').trigger('change');
                $('#txtpcs').val('');
                return true;
            }
        }

        debugger;
        if ($('#ddlcombo').val() == "0") {
            isAllValid = false;
            //$('#ddlcombo').siblings('span.error').css('visibility', 'visible');
            $('#ddlcombo').siblings(".select2-container").css('border', '1px solid red');
        }
        else {
            //$('#ddlcombo').siblings('span.error').css('visibility', 'hidden');
            $('#ddlcombo').siblings(".select2-container").css('border', 'lightgrey');
            //$('#ddlcolor').siblings('span.error').css('visibility', 'hidden');
        }

        if ($('#ddlcolor').val() == "0" || $('#ddlcolor').val() == "") {
            isAllValid = false;
            //$('#ddlcolor').siblings('span.error').css('visibility', 'visible');
            $('#ddlcolor').siblings(".select2-container").css('border', '1px solid red');
        }
        else {
            //$('#ddlcolor').siblings('span.error').css('visibility', 'hidden');
            $('#ddlcolor').siblings(".select2-container").css('border', 'lightgrey');
        }

        if ($('#ddlcoloritem').val() == "0" || $('#ddlcoloritem').val() == "") {
            isAllValid = false;
            //$('#ddlcoloritem').siblings('span.error').css('visibility', 'visible');
            $('#ddlcoloritem').siblings(".select2-container").css('border', '1px solid red');
        }
        else {
            //$('#ddlcoloritem').siblings('span.error').css('visibility', 'hidden');
            $('#ddlcoloritem').siblings(".select2-container").css('border', 'lightgrey');
        }
        AddinEdit = 1;
        //Finding the max value of an attribute in an array of objects
        var max = 0;

        //jQuery.map(result, function (obj) {
        jQuery.map(comboList, function (obj) {
            debugger;
            if (obj.ColorSeq > max)
                max = obj.ColorSeq;
        });
        //End
        debugger;

        if (colorseq == 0 && comboList.length == 0) {
            colorseq = 1;
        }
        else {
            colorseq = max + 1//comboItemList.length+1;
        }



        var maxc = 0;

        //jQuery.map(result, function (obj) {
        jQuery.map(comboList, function (obj) {
            debugger;
            if (obj.ComboSeq > maxc)
                maxc = obj.ColorSeq;
        });
        //End
        debugger;

        if (comcolorseq == 0 && comboList.length == 0) {
            comcolorseq = 1;
        }
        else {
            var cc = $('#ddlcombo').val();
            for (var r = 0; r < comboList.length; r++) {
                if (comboList[r].ComboId != cc) {
                    var amount = comboList[r].ComboId;
                    //total = total + parseFloat(amount);
                    comcolorseq = maxc + 1
                }
                else {
                    //comcolorseq = amount
                    var total = 0;
                    for (var r = 0; r < comboList.length; r++) {
                        if (comboList[r].ComboId == cc) {
                            comcolorseq = comboList[r].ComboSeq;
                            
                        }
                    }
                }
            }
            //comcolorseq = maxc + 1//comboItemList.length+1;
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
                //ComboPer: $('#txtper').val(),
                //ComboQty: $('#txtcolorqty').val(),                
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
                            //$('#ddlcombo').val('0');
                            $('#ddlcolor').val('0').trigger('change');
                           // $('#ddlcoloritem').val('0').trigger('change');
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
                            //$('#ddlcombo').val('0');
                            $('#ddlcolor').val('0').trigger('change');
                           // $('#ddlcoloritem').val('0').trigger('change');
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
                        var msg = 'Total piece should not exceed' + GuomConversion + '...';
                        var flg = 4;
                        var mode = 1;
                        AlartMessage(msg, flg, mode);
                        $('#ddlcolor').val('0').trigger('change');
                       // $('#ddlcoloritem').val('0').trigger('change');
                        $('#txtpcs').val('');
                        loadcolorTable(comboList);
                        return true;
                    }
                }
            }


            comboList.push(comboListObj);
            debugger;
            // var result = [];
            //Filter comboList
            $.each(comboList, function (i, e) {
                var matchingItems = $.grep(comboList, function (item) {
                    return item.ColorName === e.ColorName && item.ComboName === e.ComboName && item.ItemId === e.ItemId;
                });
                if (matchingItems.length === 0) {
                    comboList.push(e);
                }
            });

            //var comnam = [];
            //var piec = [];
            //for (var d = 0; d < comboList.length; d++) {
            //    comnam.push(comboList[d].ComboName + ',' + comboList[d].ColorName + ',' + comboList[d].ItemId);
            //    piec.push(comboList[d].ColorRatio);
            //}

            //Check Duplication of Same Combo should not comes
            //if (GuomConversion == 1) {
            //    comnam = $.unique(comnam);
            //    comnam.sort().join(",");
            //    if ((comnam.length) == (comboList.length - 1)) {
            //        comboList.pop(comboListObj);
            //        result.pop(comboListObj);
            //        alert('Sholud not be same combo color...');
            //        //$('#ddlcombo').val('0');
            //        $('#ddlcolor').val('0');
            //        $('#ddlcoloritem').val('0')
            //        $('#txtpcs').val('');
            //        return true;
            //    }
            //}


            var totpiece = [];
            //if (GuomConversion > 1) 
            //if (s >=1) {   


            //     for (var r = 0; r < comnam.length; r++) {
            //         if (comnam[r] == comboListObj.ComboName) {
            //             totpiece.push(piec[r]);
            //         }
            //     }

            //     var totalamnt = 0;
            //     for (var e = 0; e < totpiece.length; e++) {
            //         var amount = totpiece[e];
            //         totalamnt = totalamnt + parseFloat(amount);

            //     }
            //     if (2 >= totalamnt) {
            //         for (var c = 0; c < totpiece.length; c++) {
            //             for (var d = 0; d < comboList.length; d++) {
            //                 if (comboList[d].ComboName == comboListObj.ComboName && comboList[d].ColorName == comboListObj.ColorName) {

            //                     comboList[d].ColorRatio = totpiece[c];
            //                 }
            //             }
            //         }
            //     }
            //     else {
            //         alert('Total piece should not exeed ' + 2);
            //         comboList.pop(comboListObj);
            //         result.pop(comboListObj);
            //     }
            // }

            //if (comboList.length >= 2) {
            //    if (GuomConversion == 1) {
            //        var comboid = $('#ddlcombo').val();
            //        //comboList = $.grep(comboList, function (item) {
            //        //    return item.ComboId != comboid;
            //        //});
            //        for (var d = 0; d < comboList.length; d++) {
            //            if (comboList[d].ComboId == comboid) {
            //                comboList.splice(d, 1);
            //                alert('Sholud not be same combo color...');
            //                //$('#ddlcombo').val('0');
            //                $('#ddlcolor').val('0');
            //                $('#ddlcoloritem').val('0')
            //                $('#txtpcs').val('');
            //                loadcolorTable(comboList);
            //                return true;
            //            }
            //        }
            //    }
            //    else if (GuomConversion > 1) {

            //    }
            //}

            loadcolorTable(comboList);

            //clear select data
            //$('#tblsizedetails').DataTable().destroy();
            // fnClearColorControls();

            // $('#ddlcombo').val('0');

            LoadItemCombo();

            $('#ddlcolor').val('0').trigger('change');
           // $('#ddlcoloritem').val('0').trigger('change');
            $('#txtpcs').val('');
        }
    });

    $('#btnitemadd').click(function () {
        debugger;
        //validation and add order items
        var isAllValid = true;

        debugger;
        if ($('#ddlitem').val() == "0") {
            isAllValid = false;
            $('#ddlitem').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#ddlitem').siblings('span.error').css('visibility', 'hidden');
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
                Combocolor: combocolor,
                ItemName: $("#ddlitem option:selected").text(),
                ItemID: $('#ddlitem').val(),
                ItemRatio: $('#txtitempcs').val(),
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
            if (totalamnt <= 1) {

            }
            else {
                //alert('Total piece should not exceed ' + 1);
                var msg = 'Total piece should not exceed' + 1 + '...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                itemlist.pop(comboItemListObj);
                comboItemList.pop(comboItemListObj);
            }
            loadcolorItemTable(itemlist);

            //clear select data
            //$('#tblsizedetails').DataTable().destroy();
            $('#ddlitem').val('0');
            $('#txtitempcs').val('');
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

    $(document).on('click', '.btnitemedit', function () {
        debugger;
        Mod = 1;

        rowindex = $(this).closest('tr').index();

        var currentro12 = comboItemList.slice(rowindex);

        $('#ddlitem').val(currentro12[0]['ItemID']).trigger('change');
        $('#txtitempcs').val(currentro12[0]['ItemRatio']);

        $('#btnitemadd').hide();
        $('#btnitemupdate').show();
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

    $('#btnitemupdate').click(function () {
        debugger;
        var currentrowsel = comboItemList.slice(rowindex);


        currentrowsel[0]['ItemID'] = $("#ddlitem").val();
        currentrowsel[0]['ItemName'] = $("#ddlitem option:selected").text();
        currentrowsel[0]['ItemRatio'] = $("#txtitempcs").val();

        comboItemList[rowindex] = currentrowsel[0];

        loadcolorItemTable(comboItemList);

        $('#btnitemupdate').hide();
        $('#btnitemadd').show();

        $('#ddlitem').val('0');
        $('#txtitempcs').val('');

        Mod = 0;
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

    $('#btncolorupdate').click(function () {
        debugger;
        var cpycomlist = [];
        cpycomlist = comboList;
        var currentrowsel = cpycomlist.slice(rowindex);
        //var copy = [];
        //copy.push(currentrowsel[0]);
        // var copy = currentrowsel[0];

        var coid = currentrowsel[0]['ComboId'];
        var clrid = currentrowsel[0]['ColorId'];
        var itmid = currentrowsel[0]['ItemId'];

        //cpycomlist =  jQuery.grep(cpycomlist, function (e) {
        //    return e.ComboId != coid && e.ColorId != clrid && e.ItemId != itmid;
        //});

        var resultAarray = $.grep(cpycomlist, function (n, i) {
            return ((n.ComboId !== coid) || (n.ColorId !== clrid) || (n.ItemId !== itmid));
        }, false);

        //var resultAarray = [];
        //for (var d = 0; d < comboList.length; d++) {
        //    if (comboList[d].ComboId != coid && comboList[d].ColorId != clrid && comboList[d].ItemId != itmid) {
        //        resultAarray.push(comboList[d]);
        //    }
        //}

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
                        //$('#ddlcombo').val('0');
                        $('#ddlcolor').val('0').trigger('change');
                        //$('#ddlcoloritem').val('0').trigger('change');
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
                        //$('#ddlcombo').val('0');
                        $('#ddlcolor').val('0').trigger('change');
                       // $('#ddlcoloritem').val('0').trigger('change');
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
                    var msg = 'Total piece should not exceed' + GuomConversion + '...';
                    var flg = 4;
                    var mode = 1;
                    AlartMessage(msg, flg, mode);
                    $('#ddlcolor').val('0').trigger('change');
                   // $('#ddlcoloritem').val('0').trigger('change');
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

        //for (var r = 0; r < cpycomlist.length; r++) {
        //    if (cpycomlist[r].ColorName === currentrowsel[0]['ColorName'] && cpycomlist[r].ComboName === currentrowsel[0]['ComboName']) {
        //        result.push(cpycomlist[r]);
        //    }
        //}
        //if (result.length > 1) {
        //    alert('Sholud not be same combo color...');
        //    cpycomlist = [];

        //}
        //comboList;

        // if (comboList.length != a.length) {
        loadcolorTable(comboList);
        //}
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
                    //comboItemList[e].Combocolor
                }
            }
            loadcolorItemTable(comboItemList);

            fnClearColorControls();
            //$('#ddlcombo').val('0');
            //$('#ddlcombo').siblings('span.error').css('visibility', 'hidden');
        }
        //Mod = 0;
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

    $("#txtcolorqty").keyup(function () {
        debugger;
        var quantity = 0;
        var tmpqty = 0;

        var currentqty = $("#txtcolorqty").val();
        if (parseInt(SumTotQty) > 0) {
            tmpqty = parseInt(SumTotQty) + parseInt(currentqty);
        }

        if ($('#txtquantity').val().trim() == "") {
            quantity = 0;
        }
        else { quantity = $('#txtquantity').val(); }

        if (quantity == 0) {
            //alert("Style Quantity should be greater than zero...");
            var msg = 'Style Quantity should be greater than zero...';
            var flg = 4;
            var mode = 1;
            AlartMessage(msg, flg, mode);
            $('#txtcolorqty').val("");
        }
        else if ((parseInt(tmpqty) > parseInt(quantity)) || ((parseInt(currentqty) > parseInt(quantity)))) {
            //alert("Quantity should not exceed Order quantity...");
            var msg = 'Quantity should not exceed Order quantity...';
            var flg = 4;
            var mode = 1;
            AlartMessage(msg, flg, mode);
            $('#txtcolorqty').val("");
        }
        else { $('#txtper').val(($('#txtcolorqty').val() * 100) / quantity); }
    });

    $("#txtrate").keyup(function () {
        debugger;
        // $('#txtamount').val($('#txtquantity').val() * $('#txtrate').val());

        var Qty = $("#txtquantity").val();

        if (Qty == 0) {
            //alert("Please Enter the Order Quantity...");
            var msg = 'Please Enter the Order Quantity...';
            var flg = 4;
            var mode = 1;
            AlartMessage(msg, flg, mode);
            $('#txtrate').val(0);
            return true;
        }

        var amt = $("#txtrate");
        if (amt.val().indexOf(".") > -1 && (amt.val().split('.')[1].length > 4)) {
            amt.val(amt.val().substring(0, amt.val().length - 1));
            return true;
        }

        var Rate = parseFloat($('#txtrate').val() * $('#txtinr').val());
        var TAmt = parseFloat(Rate) * $('#txtquantity').val();
        TAmt = TAmt.toFixed(4);
        $('#txtamount').val(TAmt);


        //var Ratetext = $('#txtrate').val();
        //if (Ratetext.toString().length > 6) Ratetext = parseFloat(Ratetext).toPrecision(5);
        //$('#txtrate').val(Ratetext);
    });

    $("#txtinr").keyup(function () {
        debugger;
        var rate = $("#txtinr").val();
        if (rate > 0) {
            //$('#txtamount').val($('#txtquantity').val() * $('#txtrate').val());
            var Rate = parseFloat($('#txtrate').val() * $('#txtinr').val()).toFixed(2);
            var TAmt = parseFloat(Rate) * $('#txtquantity').val();
            $('#txtamount').val(TAmt);
        }
    });


    $("#txtquantity").keyup(function () {
        debugger;
        var rate = $("#txtinr").val();
        if (rate > 0) {
            //$('#txtamount').val($('#txtquantity').val() * $('#txtrate').val());
            var Rate = parseFloat($('#txtrate').val() * $('#txtinr').val()).toFixed(2);
            var TAmt = parseFloat(Rate) * $('#txtquantity').val();
            $('#txtamount').val(TAmt);
        }

        LoadValQty($('#txtquantity').val());
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
            //alert("Planning has been made for this Order,Cannot Update the Size...");
            var msg = 'Planning has been made for this Order,Cannot Update the Size...';
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

    $("#ddlitem").change(function () {
        $('#txtitempcs').val(GuomConversion);
    });

    $("#ddlstyle").change(function () {
        debugger;
        var ID = $('#ddlstyle').val();
        var StyleId = this.value;
        $("#ddlitem").empty();
        $("#ddlcoloritem").empty();
        fngetitembystyle(StyleId);

    });

    $("#ddlOrderNo").change(function () {
        debugger;
        var OrderId = this.value;
        var OrderNo = $(this).find("option:selected").text();

        for (var t = 0; t < bal.length; t++) {
            if (bal[t].buyormasid == OrderId) {
                $('#txtbalamount').val(bal[t].quantity);
            }
        }

        // fnGetRefQty(OrderId);
    });



    //function DeleteChild(r) {
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

    $(document).on('click', '.btnitemremove', function () {
        rowindex = $(this).closest('tr').index();
        comboItemList.splice(rowindex, 1);
        document.getElementById("tblitemdetails").deleteRow(rowindex + 1);
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
    $(document).on('click', '.btnaddstyle', function () {
        debugger;
        Menuid = 2438;
        rightsflg = 0;
        if (superuser.toUpperCase() != "SUPERUSER") {
            Rolecheck();
        }
        else {
            rightsflg = 1;
            addstyle();
        }
       
    });
    $(document).on('click', '.btnaddseason', function () {
        debugger;
        Menuid = 1473;
        rightsflg = 0;
        if (superuser.toUpperCase() != "SUPERUSER") {
            Rolecheck();
        }
        else {
            rightsflg = 1;
            addseason();
        }
    });
    $(document).on('click', '.btnaddcurrency', function () {
        debugger;
        Menuid = 1481;
        rightsflg = 0;
        if (superuser.toUpperCase() != "SUPERUSER") {
            Rolecheck();
        }
        else {
            rightsflg = 1;
            addcurrency();
        }
    });
});
function closeaddcurrency() {
    debugger;
    $('#myModal3').modal('hide');
}
function curvalidate() {
    var isValid = true;
    if ($('#curName').val().trim() == "") {
        $('#curName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#curName').css('border-color', 'lightgrey');
    }
    if ($('#Abbreviation').val().trim() == "") {
        $('#Abbreviation').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Abbreviation').css('border-color', 'lightgrey');
    }
    return isValid;
}
function CurrAdd() {
    debugger;
    var isAct = false;

    var res = curvalidate();
    if (res == false) {
        return false;
    }
    var checkbox_value = "";
    var ischecked = false;
    $(":checkbox").each(function () {
        ischecked = $('#curStatus').is(":checked");
        //if (ischecked) {
        //    checkbox_value += "on";
        //    isAct = true;
        //}
        //else {
        //    checkbox_value += "off";
        //}
    });
    //

    var Eo = "0";
    var curObj = {
        CurrencyId: $('#CurrencyID').val(),
        CurrencyName: $('#curName').val(),
        Abbreviation: $('#Abbreviation').val(),
        Exchangerate: $('#ExchangeRate').val(),
        Decimalplace: $('#DecemialPlace').val(),
        Euro: Eo,
        IsActive: ischecked
    };
    $.ajax({
        url: "/Currency/Add",
        data: JSON.stringify(curObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            } else if (result.Value == -1) {
                //alert('Given Currency is Already Available...');
                var msg = 'Given Currency is Already Available...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }
            else {
                $('#myModal3').modal('hide');
                //alert('Data Saved Successfully');
                var msg = 'Data Saved Successfully...';
                var flg = 1;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                LoadCurrencyDDL("#ddlCurrencyload");
            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function seasonvalidate() {
    var isValid = true;
    if ($('#Name').val().trim() == "") {
        $('#Name').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Name').css('border-color', 'lightgrey');
    }

    return isValid;
}

function SeasonAdd() {

    var isAct = false;
    var res = seasonvalidate();
    if (res == false) {
        return false;
    }
    var checkbox_value = "";
    $(":checkbox").each(function () {
        var ischecked = $('#seasonStatus').is(":checked");
        if (ischecked) {
            checkbox_value += "on";
            isAct = true;
        }
        else {
            checkbox_value += "off";
        }
    });
    var seasonObj = {
        SeasonId: $('#SeasonID').val(),
        SeasonName: $('#Name').val(),
        IsActive: isAct,
    };
    $.ajax({
        url: "/Season/Add",
        data: JSON.stringify(seasonObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            }
            else if (result.Value == -1) {
                //alert('Given Season is Already Available...');
                var msg = 'Given Season is Already Available...';
                var flg = 1;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }
            else {
                $('#myModal2').modal('hide');
                //alert('Data Saved Successfully');
                var msg = 'Data Saved Successfully...';
                var flg = 1;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                LoadSeasonDDL('#ddlseason');
            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
//Valdidation using jquery
function stylevalidate() {
    var isValid = true;
    if ($('#txtName').val().trim() == "") {
        $('#txtName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtName').css('border-color', 'lightgrey');
    }
    if ($('#ddlItem').val() == 0) {
        $('#ddlItem').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlItem').css('border-color', 'lightgrey');
    }


    return isValid;
}

function StyleAdd() {
    var res = stylevalidate();

    var itemname = $(("#Item")),
            quantity = $(("#quant"));

    if (res == false) {
        return false;
    }

    var checkbox_value = "";
    var ischecked = false;
    debugger;
    $(":checkbox").each(function () {
        ischecked = $('#Status').is(":checked");

    });

    var isAllValid = true;

    //validate order items

    var styleList = [];

    if (isAllValid) {
        var StyleObj = {
            StyleId: $('#StyleID').val(),
            StyleName: $('#txtName').val(),
            ArticleNo: $('#txtarticle').val(),
            Season: $('#txtSeason').val(),
            DesignName: $('#txtdesign').val(),
            IsActive: ischecked,
            ItemId: $('#ddlItem').val(),
            StyleDet: styleList,
            //StyleDet: list,
        };
        $("#btnAdd").attr("disabled", true);
        LoadingSymb();
        $.ajax({
            url: "/Style/Add",
            data: JSON.stringify(StyleObj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.Value == 0) {
                    window.location.href = "/Error/Index";
                } else if (result.Value == -1) {
                    //alert('Given Style is Already Available...');
                    var msg = 'Given Style is Already Available...';
                    var flg = 4;
                    var mode = 1;
                    AlartMessage(msg, flg, mode);
                    $("#btnAdd").attr("disabled", false);
                    return true;
                }

                else {

                    $("#myModal1").modal('hide');
                    //alert('Data Saved Successfully');
                    var msg = 'Data Saved Successfully...';
                    var flg = 1;
                    var mode = 1;
                    AlartMessage(msg, flg, mode);
                    $("#btnAdd").attr("disabled", false);
                    LoadStyleDDL('#ddlstyle');
                }
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }


        });
    }
}
function LoadValQty(val) {
    debugger;

    var BalQty = $('#txtbalamount').val();
    var StyQty = $('#txtquantity').val();
    var StyOldQty = $('#txtoldquantity').val();
    var OrdQty = $('#txtQty').val();
    var CurOrdQty = parseInt(BalQty) + parseInt(StyOldQty)
    


 if (StyOldQty == "") {
        StyOldQty = 0;
    } else {
        var StyOldQty = $('#txtoldquantity').val();
    }

    if (CShip > 0) {

        if (OrdQty > CurOrdQty) {
       // if (StyQty > OrdQty) {
            //alert("Style Quantity are not greater then Order Quantity...");
            var msg = 'Style Quantity are not greater then Order Quantity...';
            var flg = 4;
            var mode = 1;
            AlartMessage(msg, flg, mode);
            $('#txtquantity').val(StyOldQty);
            return true;
        } else if (OrdQty < StyOldQty) {

            if (BalQty > 0) {
            } else {
                //alert("Style Quantity are not less then Ship Quantity...");
                var msg = 'Style Quantity are not less then Ship Quantity...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                $('#txtquantity').val(StyOldQty);
                return true;
            }
        }


    } else {
        //if (parseInt(StyQty) < parseInt(StyOldQty)) {
        //    var ans = confirm("Are you sure want to change the Style Quantity..");
        //} else
        if (parseInt(StyQty) > parseInt(OrdQty)) {
            //alert("Style Quantity are not greater then Order Quantity...");
            var msg = 'Style Quantity are not greater then Order Quantity...';
            var flg = 4;
            var mode = 1;
            AlartMessage(msg, flg, mode);
            $('#txtquantity').val(StyOldQty);
            return true;
        }


    }

    //if (BalQty == 0) {
    //    if (parseInt(val) > parseInt(BalQty)) {
    //        alert("Total Style Quantity Should Not Exceed Then Order quantity...");
    //        $('#txtquantity').val("");
    //        return true;
    //    }
    //}
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

function GetUnique(inputArray) {
    var outputArray = [];
    for (var i = 0; i < inputArray.length; i++) {
        if ((jQuery.inArray(inputArray[i], outputArray)) == -1) {
            outputArray.push(inputArray[i]);
        }
    }
    return outputArray;
}

function checkDuplicateInObject(column1, column2, inputArray) {
    debugger;
    var seenDuplicate = false,
        testObject = inputArray;

    inputArray.map(function (item) {
        debugger;
        var itemPropertyName1 = item[column1];
        var itemPropertyName2 = item[column2];

        if ((itemPropertyName1 in testObject) && (itemPropertyName2 in testObject)) {
            testObject[itemPropertyName].duplicate = true;
            item.duplicate = true;
            seenDuplicate = true;
        }
        //else {
        //    testObject[itemPropertyName] = item;
        //    delete item.duplicate;
        //}
    });

    return seenDuplicate;
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
                if (obj.Buyerid > 0) {
                    $.ajax({
                        url: "/Buyer/getbyID/" + obj.Buyerid,
                        typr: "GET",
                        contentType: "application/json;charset=UTF-8",
                        dataType: "json",
                        success: function (result) {
                            debugger;
                            var obj = result.Value;
                            var currid = obj.Currency;
                            $.ajax({
                                url: "/Currency/GetCurrency",
                                data: JSON.stringify({}),
                                type: "GET",
                                contentType: "application/json;charset=UTF-8",
                                //dataType: "json",
                                success: function (result) {
                                    debugger;
                                    var obj = result.Value;
                                    $('#ddlCurrencyload').empty();
                                    $('#ddlCurrencyload').append($('<option/>').val('0').text('--Select Currency--'));
                                    $.each(obj, function () {
                                        $('#ddlCurrencyload').append($('<option></option>').val(this.CurrencyId).text(this.CurrencyName));
                                    });
                                    $('#ddlCurrencyload').val(currid).trigger('change');
                                    LoadINR();
                                },
                                error: function (errormessage) {
                                    debugger;
                                    alert(errormessage.responseText);
                                }
                            });
                            //$('#ddlCurrency').val(obj.Currency).trigger('change');
                            //LoadINR();
                        },
                        error: function (errormessage) {
                            alert(errormessage.responseText);
                        }
                    });
                }
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
    var ON = $('#ddlCpyOrderNo').val();
    if (ON == 0) {
        OrderNo = "";
        //alert('Please select any OrderNo...');
        var msg = 'Please select any Order Number...';
        var flg = 4;
        var mode = 1;
        AlartMessage(msg, flg, mode);
        //return false;
    }
    else {
        OrderNo = $('#ddlCpyOrderNo option:selected').text();
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
            $('#ddlCpyStyleNo').empty();
            $('#ddlCpyStyleNo').append($('<option/>').val('0').text('--Select Style--'));
            $.each(obj, function () {
                $('#ddlCpyStyleNo').append($('<option></option>').val(this.StyleId).text(this.StyleName));
            });


        },
        error: function (errormessage) {
            debugger;
            alert(errormessage.responseText);
        }
    });
}

function LoadCpyOrdData() {
    debugger;
    StyleType = "C";
    var OrdN = $('#ddlCpyOrderNo').val();
    var StyN = $('#ddlCpyStyleNo').val();
    if (OrdN != 0 && StyN != 0) {
        var ord = $('#ddlCpyOrderNo option:selected').text();
        var styid = $('#ddlCpyStyleNo').val();
        var res = $.grep(CpyStyle, function (e) {
            return e.orderno == ord && e.StyleId == styid;
        });
        if (res.length == 1) {
            getCpybyid(res[0].Stylerowid);
        }
    }
    else {
        //alert('Please Select OrderNo and Style...');
        var msg = 'Please select Order Number and Style...';
        var flg = 4;
        var mode = 1;
        AlartMessage(msg, flg, mode);
    }

}

function getCpybyid(StyleID) {
    debugger;
    Mod = 0;
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
    $.ajax({
        url: "/StyleEntry/GetbyIDforCopyStyle",
        data: JSON.stringify({ ID: StyleID, styletype: StyleType }),
        //url: "/StyleEntry/GetbyIDforCopyStyle/" + StyleID,
        type: "POST",
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
            //$('#ddlOrderNo').val(obj.order_no);
            $('#ddlstyle').val(obj.Styleid).trigger('change');
            $('#ddlseason').val(obj.SeasonId).trigger('change');
            $('#txtstyledate').val(moment(obj.styleentdate).format('DD/MM/YYYY'));
            $('#txtarticleno').val(0);
            $('#txtitemref').val(1);
            //$('#txtquantity').val(obj.quantity);
            $('#txtoldquantity').val(obj.quantity);
            $('#txtrate').val(obj.price);
            //$('#txtamount').val(obj.value);
            $('#ddlCurrencyload').val(obj.CurrencyId).trigger('change');
            $('#txtinr').val(obj.ExRate);

            $('#ddlitem').empty();
            $('#ddlcoloritem').empty();
            var styid = $('#ddlstyle').val();
            fngetitembystyle(styid);
            //LoadCheckBomShipDetails();
            debugger;
            var OrderId = $("#ddlOrderNoId").val();
            // fnGetRefQty(OrderId);

            sizeList = obj.ComboSize;
            comboList = obj.ComboColor;
            comboItemList = obj.ComboStyleItem;
            comboItemYarnList = obj.ComboItemComposition;
            var list = obj.Buyordimg;
            //$.session.set("Uploads", Imglist);

            $.each(list, function (d) {
                var obj = {
                    FilePath: list[d].Imgtitle,
                    FileID: list[d].Imgno,
                    FileName: list[d].Imgpath,
                }
                Imglist.push(obj);
            });

            GetFiles();

            if (Mod == 1) {
                comboList.sort(function (a, b) {
                    return a.ColorSeq - b.ColorSeq;
                });

                comboItemList.sort(function (a, b) {
                    return a.Itemseq - b.Itemseq;
                });
            }

            $.each(comboItemList, function (d) {
                var cid = comboItemList[d].ComboColorId;
                for (var v = 0; v < comboList.length; v++) {
                    if (comboList[v].CombocolorId == cid) {
                        comboItemList[d].Combocolor = comboList[v].ComboName;
                    }
                }
            });

            $.each(comboItemYarnList, function (f) {
                var yid = comboItemYarnList[f].ComboItemRowId;
                for (var v = 0; v < comboItemList.length; v++) {
                    if (comboItemList[v].ComboitemRowId == yid) {
                        comboItemYarnList[f].combocolor = comboItemList[v].Combocolor;
                        comboItemYarnList[f].Itemname = comboItemList[v].ItemName;
                    }
                }
            });


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
            $("#btnCpyList").attr("disabled", false);
            $('#btncldupdate').hide();
            $('#btnsizeadd').show();

            $('#btncoloradd').show();
            $('#btncolorupdate').hide();

            $('#btnitemadd').show();
            $('#btnitemupdate').hide();

            $('#btnyarnadd').show();
            $('#btnyarnupdate').hide();

            $('#myModal').modal('show');
            $('#btnUpdate').hide();
            $('#btnDelete').hide();
            $('#btnAdd').show();

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

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function fnClearColorControls() {
    debugger;
    $('#ddlcombo').val('0').trigger('change');
    $('#ddlcolor').val('0').trigger('change');
    //$('#ddlcoloritem').val('0').trigger('change');
    $('#txtcolorqty').val('0');
    $('#txtpcs').val('');
    $('#txtper').val('');
    $('#SizeorderItemError').empty();
}

function UploadImage_Complete() {
}

//Load Data function
function loadData(Type) {


    $.ajax({
        //url: "/StyleEntry/List",
        //data: JSON.stringify({ Type: Type }),
        //type: "GET",
        //contentType: "application/json;charset=utf-8",
        //dataType: "json",
        //success: function (json) {
        url: "/StyleEntry/List",
        data: JSON.stringify({ Type: Type, buyormasid: BMasId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            var tableload = json.data
            var dataSet = eval('[' + tableload + ']');
            debugger;

            var inputcount = 0;
            $('#tblmain tr').each(function () {
                inputcount++;
            });
            if (inputcount > 0) {
                //$('#tblYarndetails').DataTable().destroy();
                var table = $('#tblmain').DataTable();
                var rows = table.clear().draw();
                $('#tblmain').DataTable().rows.add(dataSet);
                $('#tblmain').DataTable().columns.adjust().draw();
            }
            else {


                $('#tblmain').DataTable({
                    data: dataSet,
                    scrollY: 300,
                    scrollCollapse: true,
                    paging: false,
                    fixedColumns: false,
                    select: false,
                    scrollX: "100%",
                    scrollXInner: "100%",
                    scroller: false,
                    "rowCallback": function (row, data, index) {
                        if (data[6] > "0") {
                            $('td', row).css('background-color', 'Tan');
                        }
                        //else if (data[6] == "4")
                        //{
                        //    //$('td', row).css('background-color', 'Orange');
                        //}
                    },
                    columns: [
                             { title: "ID", "visible": false },
                             { title: "Order No" },
                             { title: "Style" },
                             { title: "Order Qty" },
                             { title: "Style Qty" },
                             //{ title: "BalanceOrdQty" },
                             { title: "Ship No", "visible": false },
                             { title: "Style Amend", "visible": false },
                               { title: "StyApp", "visible": false },
                               { title: "ShipApp", "visible": false },
                             { title: "Action" },
                    ]
                });
            }
            $(document).ready(function () {
                var table = $('#tblmain').DataTable();

                $('#tblmain tbody').on('click', 'tr', function () {
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
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Function for clearing the textboxes
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

    $('#btnUpdate').hide();
    $('#btnDelete').hide();
    $('#btnAdd').show();

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

    if (OrdApp == 'Y') {
        window.location.href = "/OrderApproval/OrderApprovalIndex";
    }
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
            //  $('#ddlBuyer').val(1);
            ////$("#txtstyleEntryID").val(obj.StyleRowid);
            //StyleRowNoId = obj.StyleRowid;
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

//Function for getting the Data Based upon StyleEntry ID
function getbyID(StyleID) {
    debugger;
    //$.ajax({
    //    url: "/StyleEntry/GetShipmentEntry/" + StyleID,
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

    //LoadBuyerDDL("#ddlBuyer");
    // LoadOrderNoDDL("#ddlOrderNo");
    //LoadSeasonDDL("#ddlseason");
    //LoadStyleDDL("#ddlstyle");
    LoadGSizeDDL("#ddlsize");

    //LoadItemDDL("#ddlitem");
    LoadColorDDL("#ddlcombo,#ddlcolor,#ddlyarncolor");


    //Mode = 1;
    $('#txtstyledate').css('border-color', 'lightgrey');
    // $('#ddlBuyer').css('border-color', 'lightgrey');
    //$('#ddlOrderNo').css('border-color', 'lightgrey');
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
    $.ajax({
        url: "/StyleEntry/getbyID/" + StyleID,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            //  $('#ddlBuyer').val(1);
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
            $('#ddlstyle').val(obj.Styleid);
            $('#ddlseason').val(obj.SeasonId);
            $('#ddlCurrencyload').val(obj.CurrencyId);
            $('#txtstyledate').val(moment(obj.styleentdate).format('DD/MM/YYYY'));
            $('#txtarticleno').val(0);
            $('#txtitemref').val(1);
            $('#txtquantity').val(obj.quantity);
            $('#txtoldquantity').val(obj.quantity);
            $('#txtrate').val(obj.price);
            $('#txtamount').val(obj.value);
            $('#txtinr').val(obj.ExRate);

            $('#ddlitem').empty();
            $('#ddlcoloritem').empty();
            var styid = $('#ddlstyle').val();
            fngetitembystyle(styid);

            debugger;
            var OrderId = $("#ddlOrderNoId").val();

            LoadCheckBomShipDetails();
            //fnGetRefQty(OrderId);
            //fnGetRefQty(BMasId);
            sizeList = obj.ComboSize;
            comboList = obj.ComboColor;
            comboItemList = obj.ComboStyleItem;
            comboItemYarnList = obj.ComboItemComposition;



            $.each(comboItemList, function (d) {
                var cid = comboItemList[d].ComboColorId;
                for (var v = 0; v < comboList.length; v++) {
                    if (comboList[v].CombocolorId == cid) {
                        comboItemList[d].Combocolor = comboList[v].ComboName;
                    }
                }
            });

            $.each(comboItemYarnList, function (f) {
                var yid = comboItemYarnList[f].ComboItemRowId;
                for (var v = 0; v < comboItemList.length; v++) {
                    if (comboItemList[v].ComboitemRowId == yid) {
                        comboItemYarnList[f].combocolor = comboItemList[v].Combocolor;
                        comboItemYarnList[f].Itemname = comboItemList[v].ItemName;
                    }
                }
            });

            loadsizeTable(sizeList);
            loadcolorTable(comboList);

            //loadcolorItemTable(comboItemList[0]);

            //loadcolorItemYarnTable(comboItemYarnList);
            $('#btnCpyList').attr("disabled", true);
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
            $('#divitem').show();
            $('#divyarn').show();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });

    return false;
    //        }
    //    },
    //    error: function (errormessage) {
    //        alert(errormessage.responseText);
    //    }
    //});
}

//Add Data Function 
function Add() {
    debugger;
    var imgdet = [];
    if (nametxt.length > 0) {
        for (var d = 0; d < nametxt.length; d++) {

            var res = [];
            res = nametxt[d].FilePath.split("/");

            var obj = {
                Imgpath: nametxt[d].FilePath,
                Imgtitle: res[2],//title[d],
                Order_no: $('#ddlOrderNo').val()// $('#ddlOrderNo option:selected').text()
            }
            imgdet.push(obj);
        }
    }

    var res = validate();

    if (res == false) {
        return false;
    }

    var isAllValid = true;


    if (sizeList.length == 0) {
        //alert('Size should not be empty...');
        var msg = 'Size should not be empty...';
        var flg = 4;
        var mode = 1;
        AlartMessage(msg, flg, mode);
        return true;
    }
    if (comboList.length == 0) {
        //alert('Combo Item list should not be empty...');
        var msg = 'Combo Item list should not be empty...';
        var flg = 4;
        var mode = 1;
        AlartMessage(msg, flg, mode);
        return true;
    }

    if (comboList.length > 0) {
        for (var d = 0; d < comboList.length; d++) {
            var cid = comboList[d].ComboId;
            var totalamnt = 0;
            for (var e = 0; e < comboList.length; e++) {
                if (comboList[e].ComboId == cid) {
                    var amnt = comboList[e].ColorRatio;
                    totalamnt = totalamnt + parseFloat(amnt);
                }
            }
            if (totalamnt < GuomConversion) {
                //alert('Total piece must be equal to ' + GuomConversion);
                var msg = 'Total piece must be equal to ' + GuomConversion +'...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }
        }
    }

    //validate order items
    $('#orderItemError').text('');
    var ptype = $('input[name="PAType"]:checked').attr('value');
    if (isAllValid) {
        var SizeObj = {
            order_no: $('#ddlOrderNo').val(),
            Styleid: $('#ddlstyle').val(),
            styleentdate: $('#txtstyledate').val(),
            quantity: $('#txtquantity').val(),
            price: $('#txtrate').val(),
            value: $('#txtamount').val(),
            ProductionQty: $('#txtquantity').val(),
            Enquiryid: $('#ddlenquiryno').val(),
            SeasonId: $('#ddlseason').val(),
            CurrencyId: $('#ddlCurrencyload').val(),
            ExRate: $('#txtinr').val(),
            CADWeight: ($('#txtcadweight').val() == '' ? 0 : $('#txtcadweight').val()),
            CADPercentage: ($('#txtcadper').val() == '' ? 0 : $('#txtcadper').val()),
            PA: ptype,
            Description: $('#txtdesc').val(),
            ComboSize: sizeList,
            ComboColor: comboList,
            ComboStyleItem: comboItemList,
            ComboItemComposition: comboItemYarnList,
            Buyordimg: imgdet,
            BuyerArt: $('#txtarticleno').val(),
        };
        $("#btnAdd").attr("disabled", true);
        LoadingSymb();
        $.ajax({
            url: "/StyleEntry/Add",
            data: JSON.stringify(SizeObj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.Status == "SUCCESS") {
                    AddUserEntryLog('SalesManagement', 'StyleEntry', 'ADD', $('#ddlOrderNo').val());
                    //alert("Record saved successfully...");
                    var msg = 'Record saved successfully...';
                    var flg = 1;
                    var mode = 1;
                    AlartMessage(msg, flg, mode);
                    $("#btnAdd").attr("disabled", false);
                   // $('#tblmain').DataTable().destroy();
                    var Type = "Sty";
                    loadData(Type);
                    $('#myModal').modal('hide');
                    clearTextBox();
                }
                else {
                    //alert("Record saved failed...");
                    var msg = 'Record saved failed...';
                    var flg = 4;
                    var mode = 1;
                    AlartMessage(msg, flg, mode);
                }
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

//Valdidation using jquery
function validate() {
    var isValid = true;

    if ($('#txtquantity').val() == '') {
        $('#txtquantity').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtquantity').css('border-color', 'lightgrey');
    }


    if ($('#ddlOrderNo').val() == '') {
        $('#ddlOrderNo').css('border-color', 'Red');
        //$('#ddlOrderNo').siblings(".select2-container").css('border', '1px solid red');

        isValid = false;
    }
    else {
        $('#ddlOrderNo').css('border-color', 'lightgrey');
    }


    if ($('#ddlBuyer').val() == '') {
        $('#ddlBuyer').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlBuyer').css('border-color', 'lightgrey');
    }


    if ($('#ddlCurrencyload').val() == 0) {
        //$('#ddlCurrency').css('border-color', 'Red');
        $('#ddlCurrencyload').siblings(".select2-container").css('border', '1px solid red');

        isValid = false;
    }
    else {
        $('#ddlCurrencyload').siblings(".select2-container").css('border', '1px solid lightgrey');
    }

    if ($('#ddlstyle').val() == 0) {
        //$('#ddlstyle').css('border-color', 'Red');
        $('#ddlstyle').siblings(".select2-container").css('border', '1px solid red');

        isValid = false;
    }
    else {
        $('#ddlstyle').siblings(".select2-container").css('border', '1px solid lightgrey');
    }

    if ($('#ddlseason').val() == 0) {
        //$('#ddlseason').css('border-color', 'Red');
        $('#ddlseason').siblings(".select2-container").css('border', '1px solid red');

        isValid = false;
    }
    else {
        $('#ddlseason').siblings(".select2-container").css('border', '1px solid lightgrey');
    }

    if ($('#txtrate').val() == '') {
        $('#txtrate').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtrate').css('border-color', 'lightgrey');
    }


    return isValid;
}

//function for updating Style record
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

    var imgdet = [];
    if (nametxt.length > 0) {
        for (var d = 0; d < nametxt.length; d++) {

            var res = [];
            res = nametxt[d].FilePath.split("/");

            var obj = {
                Imgpath: nametxt[d].FilePath,
                Imgtitle: res[2],//title[d],
                Order_no: $('#ddlOrderNo').val()// $('#ddlOrderNo option:selected').text()
            }
            imgdet.push(obj);
        }
    }


    var res = validate();
    if (res == false) {
        return false;
    }
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
        order_no: $('#ddlOrderNo').val(),
        Styleid: $('#ddlstyle').val(),
        styleentdate: $('#txtstyledate').val(),
        quantity: $('#txtquantity').val(),
        price: $('#txtrate').val(),
        ProductionQty: $('#txtquantity').val(),
        value: $('#txtamount').val(),
        Enquiryid: $('#ddlenquiryno').val(),
        SeasonId: $('#ddlseason').val(),
        CurrencyId: $('#ddlCurrencyload').val(),
        ExRate: $('#txtinr').val(),
        CADWeight: ($('#txtcadweight').val() == '' ? 0 : $('#txtcadweight').val()),
        CADPercentage: ($('#txtcadper').val() == '' ? 0 : $('#txtcadper').val()),
        ComboSize: sizeList,
        ComboColor: comboList,
        ComboStyleItem: comboItemList,
        ComboItemComposition: comboItemYarnList,
        Buyordimg: imgdet,
        PA: ptype,
        Description: $('#txtdesc').val(),
        BuyerArt: $('#txtarticleno').val(),
    };

    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/StyleEntry/Update",
        data: JSON.stringify(SizeObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            AddUserEntryLog('SalesManagement', 'StyleEntry', 'UPDATE', $('#ddlOrderNo').val());
            //alert("Record updated successfully...");
            var msg = 'Record updated successfully...';
            var flg = 1;
            var mode = 1;
            AlartMessage(msg, flg, mode);
            //$('#tblmain').DataTable().destroy();
            var Type = "Sty";
            loadData(Type);

            $('#myModal').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//function for deleting Style record
function Delete(ID) {
    debugger;
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        LoadingSymb();
     

                $.ajax({
                    url: "/StyleEntry/Delete/" + ID,
                    type: "POST",
                    contentType: "application/json;charset=UTF-8",
                    dataType: "json",
                    success: function (result) {
                        
                        //alert("Record deleted successfully...");
                        var msg = 'Record deleted successfully...';
                        var flg = 2;
                        var mode = 1;
                        AlartMessage(msg, flg, mode);
                        //$('#tblmain').DataTable().destroy();
                        loadData(Gs);
                    },
                    error: function (errormessage) {
                        alert(errormessage.responseText);
                    }
                });
    }
}

function getbyAddID(StyleRowID) {
    debugger;

    //var Mode = 0;
    //window.location.href = "/BulkOrderShipment/BulkOrderShipmentIndex?StyleRowID=" + StyleRowID + "=&Mode=" + Mode;
    if (Gs == "Ship") {
        StyRowId = StyleRowID;
        var Mode = 0;
        window.location.href = "/BulkOrderShipment/BulkOrderShipmentIndex?StyleRowID=" + StyleRowID + "=&Mode=" + Mode + "=&type=" + type;
    }
}

function getbyEditID(StyleRowID,StyShipApproved) {
    debugger;

    //var Mode = 1;
    //window.location.href = "/BulkOrderShipment/BulkOrderShipmentIndex?StyleRowID=" + StyleRowID + "=&Mode=" + Mode;
    if (Gs == "Ship") {

        if (superuser != "superuser") {
            if (StyShipApproved == 1) {
                //alert("This order has been Approved,Please Contact Administrator..");
                var msg = 'This order has been Approved,Please Contact Administrator...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }

        }

        StyRowId = StyleRowID;
        var Mode = 1;
        window.location.href = "/BulkOrderShipment/BulkOrderShipmentIndex?StyleRowID=" + StyleRowID + "=&Mode=" + Mode + "=&Status=" + OrdApp + "=&type=" + type;
    } else if (Gs == "Sty") {

        curmode = 1;
        if (superuser != "superuser") {
            if (StyShipApproved == 1) {
                //alert("This order has been Approved,Please Contact Administrator..");
                var msg = 'This order has been Approved,Please Contact Administrator...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }

        }

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
                $('#ddlOrderNo').val(obj.order_no);
                $('#ddlstyle').val(obj.Styleid).trigger('change');
                $('#ddlseason').val(obj.SeasonId).trigger('change');
                $('#txtstyledate').val(moment(obj.styleentdate).format('DD/MM/YYYY'));
                $('#txtarticleno').val(obj.BuyerArt);
                $('#txtitemref').val(1);
                $('#txtquantity').val(obj.quantity);
                $('#txtoldquantity').val(obj.quantity);
                $('#txtrate').val(obj.price);
                $('#txtamount').val(obj.value);
                $('#ddlCurrencyload').val(obj.CurrencyId).trigger('change');
                $('#txtinr').val(obj.ExRate);
                $('#txtcadweight').val(obj.CADWeight);
                $('#txtcadper').val(obj.CADPercentage);
                $('#txtdesc').val(obj.Description);

                DispatchClosed = obj.Despatch_Closed; //  obj[0]["Despatch_Closed"];
            
                $('#ddlitem').empty();
                $('#ddlcoloritem').empty();
                var styid = $('#ddlstyle').val();
                fngetitembystyle(styid);
                LoadCheckBomShipDetails();
                debugger;
                var OrderId = $("#ddlOrderNoId").val();
                Hstyleid = obj.Styleid;
                LockDet();
                // fnGetRefQty(OrderId);

                sizeList = obj.ComboSize;
                comboList = obj.ComboColor;
                comboItemList = obj.ComboStyleItem;
                comboItemYarnList = obj.ComboItemComposition;
                var list = obj.Buyordimg;
                //$.session.set("Uploads", Imglist);
               
                var list = obj.Buyordimg;
                //$.session.set("Uploads", Imglist);
                Imglist = [];
                $.each(list, function (d) {
                    var obj = {
                        FilePath: list[d].FilePath,
                        FileID: list[d].FileID,
                        FileName: list[d].FileName,
                    }
                    Imglist.push(obj);
                });
                nametxt = Imglist;
                addses();

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

                if (DispatchClosed == "N") {
                    $('#btnUpdate').show();
                }
                else if (DispatchClosed == "Y") {
                    $('#btnUpdate').hide();
                }

            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });

        return false;
        //        }
        //    },
        //    error: function (errormessage) {
        //        alert(errormessage.responseText);
        //    }
        //});
    }
}

function addses() {
    var SizeObj = {
        Buyordimg: Imglist
    };
    $.ajax({
        url: "/StyleEntry/AddSession",
        data: JSON.stringify(SizeObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            nametxt = GetFilelist();
            GetFiles();
        },
        error: function (errormessage) {
            // alert(errormessage.responseText);
        }
    });
}

function getbyDeleteID(StyleRowID, StyShipApproved) {
    debugger;
    if (Gs == "Ship") {
        if (superuser != "superuser") {
            if (StyShipApproved == 1) {
                //alert("This order has been Approved,Please Contact Administrator..");
                var msg = 'This order has been Approved,Please Contact Administrator...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }
        }
        //var ans = confirm("Are you sure you want to delete this Record?");
        //if (ans) {
        //    $.ajax({
        //        url: "/BulkOrderShipment/Delete/" + StyleRowID,
        //        type: "POST",
        //        contentType: "application/json;charset=UTF-8",
        //        dataType: "json",
        //        success: function (result) {                           

        //            if (result.Value == true) {
        //                alert("Data Deleted Successfully");
        //                window.location.reload(true);
        //            } else {

        //                window.location.href = "/Error/Index";

        //            }
        //        },
        //        error: function (errormessage) {
        //            alert(errormessage.responseText);
        //        }
        //    });
        //}

        StyRowId = StyleRowID;
        var Mode = 2;
        window.location.href = "/BulkOrderShipment/BulkOrderShipmentIndex?StyleRowID=" + StyleRowID + "=&Mode=" + Mode+"=&type=" + type;
    } else if (Gs == "Sty") {
        //$.ajax({
        //    url: "/StyleEntry/Delete/" + StyleRowID,
        //    type: "POST",
        //    contentType: "application/json;charset=UTF-8",
        //    dataType: "json",
        //    success: function (result) {
        //        alert("Record deleted successfully...");
        //        $('#tblmain').DataTable().destroy();
        //        var Type = "Sty";
        //        loadData(Type);
        //    },
        //    error: function (errormessage) {
        //        alert(errormessage.responseText);
        //    }
        //});

        //var Mode = 1;
        //window.location.href = "/BulkOrderShipment/BulkOrderShipmentIndex?StyleRowID=" + StyleRowID + "=&Mode=" + Mode;
        if (Gs == "Ship") {
            StyRowId = StyleRowID;
            var Mode = 1;
            window.location.href = "/BulkOrderShipment/BulkOrderShipmentIndex?StyleRowID=" + StyleRowID + "=&Mode=" + Mode + "=&type=" + type;
        } else if (Gs == "Sty") {
            Mod = 1;
            if (superuser != "superuser") {
                if (StyShipApproved == 1) {
                    //alert("This order has been Approved,Please Contact Administrator..");
                    var msg = 'This order has been Approved,Please Contact Administrator...';
                    var flg = 4;
                    var mode = 1;
                    AlartMessage(msg, flg, mode);
                    return true;
                }
            }
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
            $('#btnUpdate').hide();
            $('#btnAdd').hide();
            $('#btnDelete').show();
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
                    $('#ddlOrderNo').val(obj.order_no);
                    $('#ddlstyle').val(obj.Styleid);
                    $('#ddlseason').val(obj.SeasonId);
                    $('#txtstyledate').val(moment(obj.styleentdate).format('DD/MM/YYYY'));
                    $('#txtarticleno').val(0);
                    $('#txtitemref').val(1);
                    $('#txtquantity').val(obj.quantity);
                    $('#txtoldquantity').val(obj.quantity);
                    $('#txtrate').val(obj.price);
                    $('#txtamount').val(obj.value);
                    $('#ddlCurrencyload').val(obj.CurrencyId);
                    $('#txtinr').val(obj.ExRate);


                    DispatchClosed = obj.Despatch_Closed; // obj[0]["Despatch_Closed"];

                    $('#ddlitem').empty();
                    $('#ddlcoloritem').empty();
                    var styid = $('#ddlstyle').val();
                    fngetitembystyle(styid);
                    LoadCheckBomShipDetails();
                    debugger;
                    var OrderId = $("#ddlOrderNoId").val();
                    // fnGetRefQty(OrderId);

                    sizeList = obj.ComboSize;
                    comboList = obj.ComboColor;
                    comboItemList = obj.ComboStyleItem;
                    comboItemYarnList = obj.ComboItemComposition;
                    var list = obj.Buyordimg;
                    //$.session.set("Uploads", Imglist);

                    $.each(list, function (d) {
                        var obj = {
                            FilePath: list[d].Imgtitle,
                            FileID: list[d].Imgno,
                            FileName: list[d].Imgpath,
                        }
                        Imglist.push(obj);
                    });

                    GetFiles();

                    if (Mod == 1) {
                        comboList.sort(function (a, b) {
                            return a.ColorSeq - b.ColorSeq;
                        });

                        comboItemList.sort(function (a, b) {
                            return a.Itemseq - b.Itemseq;
                        });
                    }

                    $.each(comboItemList, function (d) {
                        var cid = comboItemList[d].ComboColorId;
                        for (var v = 0; v < comboList.length; v++) {
                            if (comboList[v].CombocolorId == cid) {
                                comboItemList[d].Combocolor = comboList[v].ComboName;
                            }
                        }
                    });

                    $.each(comboItemYarnList, function (f) {
                        var yid = comboItemYarnList[f].ComboItemRowId;
                        for (var v = 0; v < comboItemList.length; v++) {
                            if (comboItemList[v].ComboitemRowId == yid) {
                                comboItemYarnList[f].combocolor = comboItemList[v].Combocolor;
                                comboItemYarnList[f].Itemname = comboItemList[v].ItemName;
                            }
                        }
                    });


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
                    $('#btnCpyList').attr("disabled", true);
                    $('#btncldupdate').hide();
                    $('#btnsizeadd').show();

                    $('#btncoloradd').show();
                    $('#btncolorupdate').hide();

                    $('#btnitemadd').show();
                    $('#btnitemupdate').hide();

                    $('#btnyarnadd').show();
                    $('#btnyarnupdate').hide();

                    $('#myModal').modal('show');
                    $('#btnUpdate').hide();
                    $('#btnAdd').hide();
                    $('#btnDelete').show();

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
                    var SumVal = parseFloat(StyQty) + parseFloat(BalQty);
                    $("#txtbalamount").val(SumVal);

                    if (DispatchClosed == "N") {
                        $('#btnDelete').show();
                    }
                    else if (DispatchClosed == "Y") {
                        $('#btnDelete').hide();
                    }

                },
                error: function (errormessage) {
                    alert(errormessage.responseText);
                }
            });

            return false;
            //        }
            //    },
            //    error: function (errormessage) {
            //        alert(errormessage.responseText);
            //    }
            //});
        }

    } else if (Gs == "Prod") {
        $.ajax({
            url: "/WorkOrder/Delete/" + StyleRowID,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                $('#twobody').DataTable().destroy();
                //alert("Record Deleted successfully...");
                var msg = 'Record Deleted successfully...';
                var flg = 2;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                var Id = GBMasId;


                var Mod = 1;
                window.location.href = "/StyleEntry/StyleEntryIndex?BMasId=" + Id + "=&Mode=" + Mod+"=&type=" + type;
                //loadData();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

function STYLE() {
    CheckRights("OrderStyle");
    var Prg = "Sty";
    Gs = Prg;
    var Type = "Sty";
   // $('#tblmain').DataTable().destroy();
    loadData(Type);
}
function SHIPMENT() {
    CheckRights("OrderShipment");
    var Prg = "Ship";
    Gs = Prg;
    var Type = "Ship";
   // $('#tblmain').DataTable().destroy();
    loadData(Type);
}
function PRODUCTION() {
    //CheckRights("OrderShipment");
    var Prg = "Prod";
    Gs = Prg;
    var Type = "Prod";
  //  $('#tblmain').DataTable().destroy();
    loadData(Type);
}
function MEASUREMENT() {
    CheckRights("Measurment");
    var Prg = "Meas";
    Gs = Prg;
    var Type = "Meas";
   // $('#tblmain').DataTable().destroy();
    loadData(Type);
}
function APPROVAL() {
    CheckRights("OrderApproval");
    var Prg = "Approve";
    Gs = Prg;
    var Type = "Approve";
   // $('#tblmain').DataTable().destroy();
    loadData(Type);
}
function PRECOSTING() {
    var Prg = "Precos";
    Gs = Prg;
    var Type = "Precos";
    $('#tblmain').DataTable().destroy();
    loadData(Type);
}
function PRECOSTFAB() {
    var Prg = "Precostfab";
    Gs = Prg;
    var Type = "Precostfab";
    $('#tblmain').DataTable().destroy();
    loadData(Type);
}
function PRECOSTTRIMS() {
    var Prg = "Precosttrims";
    Gs = Prg;
    var Type = "Precosttrims";
    $('#tblmain').DataTable().destroy();
    loadData(Type);
}
function PRECOSTINGRATE() {
    var Prg = "Precostrate";
    Gs = Prg;
    var Type = "Precostrate";
    $('#tblmain').DataTable().destroy();
    loadData(Type);
}


function getApproveAddID(StyleRowID) {
    debugger;
    if (Gs == "Approve") {
        StyRowId = StyleRowID;
        var Mode = 0;
        window.location.href = "/StyleApprovalTitle/StyleApprovalTitleIndex?StyleRowID=" + StyleRowID + "=&Mode=" + Mode + "=&Bmasid=" + BMasId;
    }
}

function getApproveEditID(StyleRowID) {
    debugger;
    if (Gs == "Approve") {
        StyRowId = StyleRowID;
        var Mode = 1;
        window.location.href = "/StyleApprovalTitle/StyleApprovalTitleIndex?StyleRowID=" + StyleRowID + "=&Mode=" + Mode + "=&Bmasid=" + BMasId;
    }
}

function getApproveDeleteID(StyleRowID) {
    debugger;
    if (Gs == "Approve") {
        StyRowId = StyleRowID;
        var Mode = 2;
        window.location.href = "/StyleApprovalTitle/StyleApprovalTitleIndex?StyleRowID=" + StyleRowID + "=&Mode=" + Mode + "=&Bmasid=" + BMasId;
    }
}

function getMeasAddID(StyleRowID) {
    debugger;
    
    //var Mode = 0;
    //window.location.href = "/BulkOrderShipment/BulkOrderShipmentIndex?StyleRowID=" + StyleRowID + "=&Mode=" + Mode;
    if (Gs == "Meas") {
        StyRowId = StyleRowID;
        var Mode = 0;
        window.location.href = "/OrderMeasurement/OrderMeasurementIndex?StyleRowID=" + StyleRowID + "=&Mode=" + Mode + "=&type=" + type;;
    }
}
function getMeasEditID(StyleRowID) {
    debugger;

    //var Mode = 0;
    //window.location.href = "/BulkOrderShipment/BulkOrderShipmentIndex?StyleRowID=" + StyleRowID + "=&Mode=" + Mode;
    if (Gs == "Meas") {
        StyRowId = StyleRowID;
        var Mode = 1;
        window.location.href = "/OrderMeasurement/OrderMeasurementIndex?StyleRowID=" + StyleRowID + "=&Mode=" + Mode + "=&type=" + type;;
    }
}
function getMeasbyDeleteID(StyleRowID) {
    debugger;

    //var Mode = 0;
    //window.location.href = "/BulkOrderShipment/BulkOrderShipmentIndex?StyleRowID=" + StyleRowID + "=&Mode=" + Mode;
    if (Gs == "Meas") {
        StyRowId = StyleRowID;
        var Mode = 2;
        window.location.href = "/OrderMeasurement/OrderMeasurementIndex?StyleRowID=" + StyleRowID + "=&Mode=" + Mode + "=&type=" + type;;
    }
}
function getProdAddID(StyleRowID) {
    debugger;

    //var Mode = 0;
    //window.location.href = "/BulkOrderShipment/BulkOrderShipmentIndex?StyleRowID=" + StyleRowID + "=&Mode=" + Mode;
    if (Gs == "Prod") {
        StyRowId = StyleRowID;
        var Mode = 0;
        window.location.href = "/WorkOrder/WorkOrderIndex?StyleRowID=" + StyleRowID + "=&type=" + type;;
    }
}
function getPrecosAddID(StyleRowID) {
    debugger;

    //var Mode = 0;
    //window.location.href = "/BulkOrderShipment/BulkOrderShipmentIndex?StyleRowID=" + StyleRowID + "=&Mode=" + Mode;
    if (Gs == "Precos") {
        StyRowId = StyleRowID;
        var Mode = 0;
        window.location.href = "/Precosting/PrecostingIndex?StyleRowID=" + StyleRowID + "=&Mode=" + Mode;
    }
}
function getPrecosEditID(StyleRowID) {
    debugger;

    //var Mode = 0;
    //window.location.href = "/BulkOrderShipment/BulkOrderShipmentIndex?StyleRowID=" + StyleRowID + "=&Mode=" + Mode;
    if (Gs == "Precos") {
        StyRowId = StyleRowID;
        var Mode = 1;
        window.location.href = "/Precosting/PrecostingIndex?StyleRowID=" + StyleRowID + "=&Mode=" + Mode;
    }
}
function getPrecosbyDeleteID(StyleRowID) {
    debugger;

    //var Mode = 0;
    //window.location.href = "/BulkOrderShipment/BulkOrderShipmentIndex?StyleRowID=" + StyleRowID + "=&Mode=" + Mode;
    if (Gs == "Precos") {
        StyRowId = StyleRowID;
        var Mode = 2;
        window.location.href = "/Precosting/PrecostingIndex?StyleRowID=" + StyleRowID + "=&Mode=" + Mode;
    }
}

function getPrecostfabAddID(StyleRowID) {
    debugger;
    if (Gs == "Precostfab") {
        StyRowId = StyleRowID;
        var Mode = 0;
        window.location.href = "/PrecostingFabricDept/PrecostingFabricDeptIndex?StyleRowID=" + StyleRowID + "=&Mode=" + Mode;
    }
}
function getPrecostfabEditID(StyleRowID) {
    debugger;

    if (Gs == "Precostfab") {
        StyRowId = StyleRowID;
        var Mode = 1;
        window.location.href = "/PrecostingFabricDept/PrecostingFabricDeptIndex?StyleRowID=" + StyleRowID + "=&Mode=" + Mode;
    }
}
function getPrecostfabbyDeleteID(StyleRowID) {
    debugger;

    if (Gs == "Precostfab") {
        StyRowId = StyleRowID;
        var Mode = 2;
        window.location.href = "/PrecostingFabricDept/PrecostingFabricDeptIndex?StyleRowID=" + StyleRowID + "=&Mode=" + Mode;
    }
}

function getPrecosttrimsAddID(StyleRowID) {
    debugger;
    if (Gs == "Precosttrims") {
        StyRowId = StyleRowID;
        var Mode = 0;
        window.location.href = "/PrecostingTrimsConsumption/PrecostingTrimsConsumptionIndex?StyleRowID=" + StyleRowID + "=&Mode=" + Mode;
    }
}
function getPrecosttrimsEditID(StyleRowID) {
    debugger;

    if (Gs == "Precosttrims") {
        StyRowId = StyleRowID;
        var Mode = 1;
        window.location.href = "/PrecostingTrimsConsumption/PrecostingTrimsConsumptionIndex?StyleRowID=" + StyleRowID + "=&Mode=" + Mode;
    }
}
function getPrecosttrimsbyDeleteID(StyleRowID) {
    debugger;

    if (Gs == "Precosttrims") {
        StyRowId = StyleRowID;
        var Mode = 2;
        window.location.href = "/PrecostingTrimsConsumption/PrecostingTrimsConsumptionIndex?StyleRowID=" + StyleRowID + "=&Mode=" + Mode;
    }
}

function getPrecostrateAddID(StyleRowID) {
    debugger;
    if (Gs == "Precostrate") {
        StyRowId = StyleRowID;
        var Mode = 0;
        window.location.href = "/PrecostingRate/PrecostingRateIndex?StyleRowID=" + StyleRowID + "=&Mode=" + Mode;
    }
}
function getPrecostrateEditID(StyleRowID) {
    debugger;

    if (Gs == "Precostrate") {
        StyRowId = StyleRowID;
        var Mode = 1;
        window.location.href = "/PrecostingRate/PrecostingRateIndex?StyleRowID=" + StyleRowID + "=&Mode=" + Mode;
    }
}
function getPrecostratebyDeleteID(StyleRowID) {
    debugger;

    if (Gs == "Precostrate") {
        StyRowId = StyleRowID;
        var Mode = 2;
        window.location.href = "/PrecostingRate/PrecostingRateIndex?StyleRowID=" + StyleRowID + "=&Mode=" + Mode;
    }
}

////////INR VALUE //////////////

function LoadINR() {
    debugger;
    $('#txtinr').val("");
    var CurID = $('#ddlCurrencyload').val();

    $.ajax({
        url: "/Currency/GetbyID/" + CurID,
        typr: "GET",

        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                if (curmode == 1) {
                    curmode = 0;
                } else {
                    $('#txtinr').val(obj.Exchangerate);
                }
                $('#txtinrid').val(obj.CurrencyId);
                var qty = ($('#txtquantity').val() == "" ? 0 : $('#txtquantity').val());

                var Rate = parseFloat($('#txtrate').val() * $('#txtinr').val());
                var TAmt = parseFloat(Rate) * parseFloat(qty);
                TAmt = TAmt.toFixed(4);
                $('#txtamount').val(TAmt);

                //var Ratetext = $('#txtrate').val();
                //if (Ratetext.toString().length > 6) Ratetext = parseFloat(Ratetext).toPrecision(5);
                //$('#txtrate').val(Ratetext);
            }
        }

    });

}
////////////////////////////////

function LoadCheckBomShipDetails() {


    var OrderNo = $('#ddlOrderNo').val();
    var StlyeId = $('#ddlstyle').val();

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

                if (CBom > 0) {

                    //alert("Planning has been made for this Order,Please Check it....")
                    var msg = 'Planning has been made for this Order,Please Check it...';
                    var flg = 4;
                    var mode = 1;
                    AlartMessage(msg, flg, mode);
                    $("#ddlstyle").prop("disabled", true);
                    $("#ddlseason").prop("disabled", true);
                    $("#btnDelete").prop("disabled", true);

                    // $("#ddlOrderType").prop("disabled", true);
                    //$("#Update").attr('disabled', true);
                    //$('#Add').hide();
                    return true;
                }

                if (CShip > 0) {

                    //alert("Shipment has been made for this Order,Please Check it....")
                    var msg = 'Shipment has been made for this Order,Please Check it...';
                    var flg = 4;
                    var mode = 1;
                    AlartMessage(msg, flg, mode);
                    $("#ddlstyle").prop("disabled", true);
                    $("#ddlseason").prop("disabled", true);
                    $("#btnDelete").prop("disabled", true);
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

function StyleDelete() {

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

    if (CShip > 0) {

        //alert("Shipment has been made for this Order,Cannot Delete this Style....")
        var msg = 'Shipment has been made for this Order,Cannot Delete this Style...';
        var flg = 4;
        var mode = 1;
        AlartMessage(msg, flg, mode);
        $("#btnDelete").attr('disabled', true);
        return true;

    }
    $("#btnDelete").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/styleentry/delete/" + StyleRowNoId,
        type: "post",
        contenttype: "application/json;charset=utf-8",
        datatype: "json",
        success: function (result) {
            AddUserEntryLog('SalesManagement', 'StyleEntry', 'DELETE', $('#ddlOrderNo').val());
            //alert("record deleted successfully...");
            var msg = 'record deleted successfully...';
            var flg = 2;
            var mode = 1;
            AlartMessage(msg, flg, mode);
            var Id = BMasId;

            var Mod = 0;
            window.location.href = "/StyleEntry/StyleEntryIndex?BMasId=" + Id + "=&Mode=" + Mod;
        },
        error: function (errormessage) {
            alert(errormessage.responsetext);
        }
    });
}

function CheckStyle(StlyeId) {

    var OrderNo = $('#ddlOrderNo').val();

    $.ajax({
        url: "/styleentry/CheckStlyeNo",
        data: JSON.stringify({ Styleid: StlyeId, order_no: OrderNo }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            debugger;
            if (obj != undefined) {

                var StyleId = obj.Styleid;

                if (StyleId != "") {
                    if (Mod == 0) {
                        //alert("Style Already Exists...");
                        var msg = 'Style Already Exists...';
                        var flg = 4;
                        var mode = 1;
                        AlartMessage(msg, flg, mode);
                        $('#ddlstyle').val(0);
                        $('#ddlstyle').focus();
                        return true;
                    }
                }
            }


            $.ajax({
                url: "/styleentry/GetStyleItem",
                data: JSON.stringify({ Styleid: StlyeId }),
                type: "GET",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {

                    var objItem = result.Value;
                    debugger;
                    if (objItem != undefined) {
                        debugger;
                        var ItemId = objItem.itemid;

                        $('#ddlcoloritem').val(ItemId).trigger('change');
                    }
                },

                failure: function (errMsg) {
                    alert(errMsg);
                }
            });
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

$(document).ready(function () {

    $(document).ready(function () {
        $("select.gcw_handlerFgxhpH1Id").change(function () {
            var selectedCountry = $(this).children("option:selected").val();
            //alert("You have selected the country - " + selectedCountry);
            var msg = 'You have selected the country -' + selectedCountry;
            var flg = 4;
            var mode = 1;
            AlartMessage(msg, flg, mode);
        });
    });
});

//function gcw_handlerFgxhpH1Id(Id) {


//    var value = $('#gcw_valFgxhpH1Id3').val();

//    alert(value);
//}

//$(".gcw_selectFgxhpH1Id").on("change", function () {

//    alert($(this).val())

//})

function SzAdd() {
    var res = Szvalidate();
    if (res == false) {
        return false;
    }
    debugger;
    var checkbox_value = "";
    var ischecked = false;

    $(":checkbox").each(function () {
        ischecked = $('#SzStatus').is(":checked");
        //if (ischecked) {
        //    checkbox_value += "on";
        //}
        //else {
        //    checkbox_value += "off";
        //}
    });

    var SizeObj = {
        SizeId: $('#SizeID').val(),
        SizeName: $('#SzName').val(),
        SeqNo: $('#seqno').val(),
        // ItemType: $('#ddlitemtype').val(),
        ItemType: $("#ddlitemtype option:selected").text(),
        IsActive: ischecked,
        LookUp: $('#lookup').val(),
        ActualSize: $('#actualsize').val()
    };
    $("#btnAdd").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/Size/Add",
        data: JSON.stringify(SizeObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            }
            else if (result.Value == -1) {
                //alert('Given Size is Already Available...');
                var msg = 'Given Size is Already Available...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                $("#btnAdd").attr("disabled", false);
                return true;
            }
            else {

                //alert('Data Saved Successfully');
                var msg = 'Data Saved Successfully' ;
                var flg = 1;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                $("#btnAdd").attr("disabled", false);
                $('#myModal4').modal('hide');
                LoadGSizeDDL("#ddlsize");
            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function Szvalidate() {
    var isValid = true;
    if ($('#SzName').val().trim() == "") {
        $('#SzName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#SzName').css('border-color', 'lightgrey');
    }
    //if ($('#actualsize').val().trim() == "") {
    //    $('#actualsize').css('border-color', 'Red');
    //    isValid = false;
    //}
    //else {
    //    $('#actualsize').css('border-color', 'lightgrey');
    //}
    return isValid;
}

function ClrAdd() {
    var res = clrvalidate();
    if (res == false) {
        return false;
    }
    debugger;
    var checkbox_value = "";
    var ischecked = false;

    $(":checkbox").each(function () {
        ischecked = $('#ClrStatus').is(":checked");
        //if (ischecked) {
        //    checkbox_value += "on";
        //}
        //else {
        //    checkbox_value += "off";
        //}
    });

    var ColorObj = {
        ColorId: $('#ColorID').val(),
        ColorCode: $('#colorcode').val(),
        ColorName: $('#colorname').val(),
        Pantone: $('#pantone').val(),
        ColorGroupId: $('#ddlcolorgroup').val(),
        ColorNo: $('#Colorno').val(),
        Lookup: $('#lookup').val(),
        //ColorOth: $('#coloroth').val(),
        IsActive: ischecked,
    };
    LoadingSymb();
    $.ajax({
        type: "POST",
        url: "/ColorMaster/Add",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(ColorObj),
        dataType: "json",
        success: function (result) {
            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            }
            else if (result.Value == -1) {
                //alert('Given Color is Already Available...');
                var msg = 'Given Color is Already Available...';
                var flg = 1;
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
                $('#myModal5').modal('hide'); 
                LoadColorDDL('#ddlcombo');
                LoadColorDDL('#ddlcolor');
            }


            // clearTextBox();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function clrvalidate() {
    debugger;
    var isValid = true;
    if ($('#colorname').val() == "") {
        $('#colorname').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#colorname').css('border-color', 'lightgrey');
    }


    return isValid;
}
function LoadGstTax(HsnCode) {
    debugger;
    $.ajax({
        url: "/Item/GetGstDetails",
        data: JSON.stringify({ HSNCODE: HsnCode }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            debugger;
            if (obj != undefined) {

                $('#cgst').val(obj[0]["CGST"]);
                $('#sgst').val(obj[0]["SGST"]);
                $('#igst').val(obj[0]["IGST"]);
                $('#txtGSTTaxCode').val(obj[0]["GSTtaxcode"]);
                $('#txtIGSTTaxCode').val(obj[0]["IGSTtaxcode"]);

            }
            else {

            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

//Add Data Function 
function ItmAdd() {
    var res = Itmvalidate();
    if (res == false) {
        return false;
    }
    debugger;
    var checkbox_value = "";
    var ischecked = false;
    var MComp = 0;

    $(":checkbox").each(function () {
        ischecked = $('#ItmStatus').is(":checked");
        //if (ischecked) {
        //    checkbox_value += "on";
        //}
        //else {
        //    checkbox_value += "off";
        //}
    });

    //var groupdropdown = $('#ddlitemgroup');
    var radioComp = $("input[name='MajorComp']:checked").val();

    if (radioComp == "Y") {
        MComp = "Y";
    }
    else {
        MComp = "N";
    }
    var ItemObj = {
        Itemid: $('#ItemID').val(),
        ItemName: $('#ItmName').val(),
        ItemGroupId: $('#ddlitemgroup').val(),
        //ItemTypeName: $('#ddlitemtype').val(),
        ItemTypeName: $("#ddlItmitemtype option:selected").text(),
        Description: $('#Descript').val(),
        BasicUnit: $('#base').val(),
        SecUnit: $('#sec').val(),
        PurUnit: $('#pur').val(),
        IsActive: ischecked,
        CGST: $('#cgst').val(),
        SGST: $('#sgst').val(),
        IGST: $('#igst').val(),
        rate: $('#Rate').val(),
        colornum: $('#Color').val(),
        HSNCODE: $('#HSNCODE').val(),
        itemcat: "P",
        MajorComp: MComp,
        GSTtaxcode: $('#txtGSTTaxCode').val(),
        IGSTtaxcode: $('#txtIGSTTaxCode').val(),
        MinQty: $('#txtMinQty').val(),
        MaxQty: $('#txtMaxQty').val(),
    };
    LoadingSymb();
    $.ajax({
        url: "/Item/Add",
        data: JSON.stringify(ItemObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            }
            else if (result.Value == -1) {
                //alert('Given Item is Already Available...');
                var msg = 'Given Item is Already Available...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }
            else {

                $('#myModal6').modal('hide');
                //alert('Data Saved Successfully');
                var msg = 'Data Saved Successfully...';
                var flg = 1;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                $('#ddlcoloritem').empty();
                fngetitembystyle(AddStyleid);

            }
            // clearTextBox();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}


//Validation using jquery
function Itmvalidate() {
    debugger;
    var isValid = true;
    if ($('#ItmName').val().trim() == "") {
        $('#ItmName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ItmName').css('border-color', 'lightgrey');
    }

    if ($('#ddlitemgroup').val() == 0) {
        $('#ddlitemgroup').siblings(".select2-container").css('border', '1px solid red');
        isValid = false;
    }
    else {
        $('#ddlitemgroup').siblings(".select2-container").css('border', '1px solid lightgrey');
    }
    if ($('#ddlItmitemtype').val() == 0) {
        $('#ddlItmitemtype').siblings(".select2-container").css('border', '1px solid red');
        isValid = false;
    }
    else {
        $('#ddlItmitemtype').siblings(".select2-container").css('border', '1px solid lightgrey');
    }

    if ($('#pur').val() == 0) {
        $('#pur').siblings(".select2-container").css('border', '1px solid red');
        isValid = false;
    }
    else {
        $('#pur').siblings(".select2-container").css('border', '1px solid lightgrey');
    }
    if ($('#sec').val() == 0) {
        $('#sec').siblings(".select2-container").css('border', '1px solid red');
        isValid = false;
    }
    else {
        $('#sec').siblings(".select2-container").css('border', '1px solid lightgrey');
    }
    if ($('#base').val() == 0) {
        $('#base').siblings(".select2-container").css('border', '1px solid red');
        isValid = false;
    }
    else {
        $('#base').siblings(".select2-container").css('border', '1px solid lightgrey');
    }
    if ($('#HSNCODE').val() == 0) {
        $('#HSNCODE').siblings(".select2-container").css('border', '1px solid red');
        isValid = false;
    }
    else {
        $('#HSNCODE').siblings(".select2-container").css('border', '1px solid lightgrey');
    }
    return isValid;
}


function CheckBalQty() {
    var CBalqty = $('#txtbalamount').val();
    if (CBalqty == 0) {
        //alert("Style Quantity has been Completed..");
        var msg = 'Style Quantity has been Completed...';
        var flg = 4;
        var mode = 1;
        AlartMessage(msg, flg, mode);
        $("#btnAdd").attr("disabled", true);
        return true;
    }
}
function Rolecheck() {
    debugger;
    $.ajax({
        url: "/Role/GetRolebyId",
        data: JSON.stringify({ roleid: Roleid, menuid: Menuid, submenuid: Submenuid }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        success: function (result) {
            debugger;
            //var obj = result.Value;
            //if (result.Status == 'SUCCESS' && obj.length > 0 && obj[0].AddFlg == 1) {
            //    //if (obj[0].AddFlg == 1) {
            //    rightsflg = 1;
            //    menurights();
            //    // }
            //}
            //else {
            //    rightsflg = 0;
            //    menurights();
            //}

            if (result.Value.RoleDetList.length > 0) {
                var obj = result.Value.RoleDetList[0];
                if (obj.AddFlg == 1) {
                    //if (obj[0].AddFlg == 1) {
                    rightsflg = 1;
                    menurights();
                    // }
                }
                else {
                    rightsflg = 0;
                    menurights();
                }
            } else {
                rightsflg = 0;
                menurights();
            }


        }
    });
}
function menurights() {
    debugger;
    switch (Menuid) {
        case 2438:
            addstyle();
            break;
        case 1473:
            addseason();
            break;
        case 1481:
            addcurrency();
            break;
        case 2437:
            addsize();
            break;
        case 2436:
            addcolor();
            break;
        case 2435:
            additem();
            break;
    }
    //if (Menuid == 2438) {
    //    addstyle();
    //}
    //if (Menuid == 1473) {
    //    addseason();
    //}
    //if (Menuid == 1481) {
    //    addcurrency();
    //}
    //if (Menuid == 2437) {
    //    addsize();
    //}
    //if (Menuid == 2436) {
    //    addcolor();
    //}
    //if (Menuid == 2435) {
    //    additem();
    //}  
}
function addstyle() {
    debugger;
    if (rightsflg == 1) {
        $('#txtstyleID').val("");
        $('#txtName').val("");
        $('#txtarticle').val("");
        $('#txtSeason').val("");
        $('#txtdesign').val("");
        $('#Status').val("");
        $('#quantity').val('');
        $('#ddlItem').val(0);


        $('#btnstyleAdd').show();
        $('#txtstyleID').css('border-color', 'lightgrey');
        $('#txtarticle').css('border-color', 'lightgrey');
        $('#txtSeason').css('border-color', 'lightgrey');
        $('#txtdesign').css('border-color', 'lightgrey');
        $('#txtName').css('border-color', 'lightgrey');
        $('#Status').css('border-color', 'lightgrey');
        $('#ddlItem').css('border-color', 'lightgrey');

        $('#Item').siblings('span.error').css('visibility', 'hidden');
        $('#product').siblings('span.error').css('visibility', 'hidden');
        $('#quantity').siblings('span.error').css('visibility', 'hidden');
        $("#myModal1").modal('show');
        LoadGarmentItemDDL("#ddlItem");
    }
    else {
        //alert("You don't have rights...");
        var msg = "You don't have rights...";
        var flg = 4;
        var mode = 1;
        AlartMessage(msg, flg, mode);

    }
}
function addseason() {
    debugger;
    if (rightsflg == 1) {
        $('#SeasonID').val("");
        $('#Name').val("");
        $('#seasonStatus').val("");
        $('#btnUpdate').hide();
        $('#btnAdd').show();
        $('#SeasonID').css('border-color', 'lightgrey');
        $('#Name').css('border-color', 'lightgrey');
        $('#seasonStatus').css('border-color', 'lightgrey');
        $("#myModal2").modal('show');
    }
    else {
        //alert("You don't have rights...");
        var msg = "You don't have rights...";
        var flg = 4;
        var mode = 1;
        AlartMessage(msg, flg, mode);

    }
}
function addcurrency() {
    debugger;
    if (rightsflg == 1) {
        $('#curName').val("");
        $('#CurrencyID').val("");
        $('#Abbreviation').val("");
        $('#ExchangeRate').val("");
        $('#DecemialPlace').val("");

        $('#btnUpdate').hide();
        $('#btnAdd').show();
        $('#SeasonID').css('border-color', 'lightgrey');
        $('#Name').css('border-color', 'lightgrey');
        $('#curStatus').css('border-color', 'lightgrey');
        $("#myModal3").modal('show');
    }
    else {
        //alert("You don't have rights...");
        var msg = "You don't have rights...";
        var flg = 4;
        var mode = 1;
        AlartMessage(msg, flg, mode);

    }
}

function addsize() {
    debugger;
    if (rightsflg == 1) {
        $('#SizeID').val("");
        $('#SzName').val("");
        $('#seqno').val("");
        $('#ddlitemtype').val(0);
        $('#SzStatus').val("");
        $('#actualsize').val("");
        $('#lookup').val("");


        $('#SizeID').css('border-color', 'lightgrey');
        $('#seqno').css('border-color', 'lightgrey');
        $('#ddlitemtype').css('border-color', 'lightgrey');
        $('#Name').css('border-color', 'lightgrey');
        $('#Status').css('border-color', 'lightgrey');
        $('#actualsize').css('border-color', 'lightgrey');
        $('#lookup').css('border-color', 'lightgrey');
        $("#myModal4").modal('show');
    }
    else {
        //alert("You don't have rights...");
        var msg = "You don't have rights...";
        var flg = 4;
        var mode = 1;
        AlartMessage(msg, flg, mode);

    }
}
function addcolor() {
    debugger;
    if (rightsflg == 1) {
        $('#ColorID').val("");
        $('#colorcode').val("");
        $('#colorname').val("");
        $('#pantone').val("");
        $('#Colorno').val("");
        $('#lookup').val("");
        // $('#coloroth').val("");
        $('#ClrStatus').val("");


        $('#ColorID').css('border-color', 'lightgrey');
        $('#ddlcolorgroup').css('border-color', 'lightgrey');
        $('#colorcode').css('border-color', 'lightgrey');
        $('#colorname').css('border-color', 'lightgrey');
        $('#pantone').css('border-color', 'lightgrey');
        $('#Colorno').css('border-color', 'lightgrey');
        $('#lookup').css('border-color', 'lightgrey');
        // $('#coloroth').css('border-color', 'lightgrey');
        $('#ClrStatus').css('border-color', 'lightgrey');
        $("#myModal5").modal('show');
    }
    else {
        //alert("You don't have rights...");
        var msg = "You don't have rights...";
        var flg = 4;
        var mode = 1;
        AlartMessage(msg, flg, mode);

    }
}
function additem() {
    debugger;
    if (rightsflg == 1) {
        if ($('#ddlstyle').val() == 0) {
            //alert('Please Select any Style..');
            var msg = "Please Select any Style...";
            var flg = 4;
            var mode = 1;
            AlartMessage(msg, flg, mode);
            return true;
        }
        else {
            AddStyleid = $('#ddlstyle').val();
        }
        $('#ItemID').val("");
        $('#ItmName').val("");
        // $('#ddlitemgroup').empty();
        $('#ddlItmitemtype').val('GARMENT');
        $('#Descript').val("");
        //$('#base').val("");
        //$('#sec').val("");
        //$('#pur').val("");
        $('#cgst').val("");
        $('#igst').val("");
        $('#sgst').val(""); 
        $('#Rate').val("");
        $('#Color').val("");
        $('#HSNCODE').val("");
        $('#txtMinQty').val("");
        $('#txtMaxQty').val("");
        $('#txtGSTTaxCode').val("");
        $('#txtIGSTTaxCode').val("");


        $('#ItmStatus').val("");
        

        $('#ItemID').css('border-color', 'lightgrey');
        $('#ddlitemgroup').css('border-color', 'lightgrey');
        $('#ddlItmitemtype').css('border-color', 'lightgrey');
        $('#ItmName').css('border-color', 'lightgrey');
        $('#Name').css('border-color', 'lightgrey');
        $('#Descript').css('border-color', 'lightgrey');
        $('#ItmStatus').css('border-color', 'lightgrey');
        $('#base').css('border-color', 'lightgrey');
        $('#sec').css('border-color', 'lightgrey');
        $('#pur').css('border-color', 'lightgrey');
        $('#cgst').css('border-color', 'lightgrey');
        $('#igst').css('border-color', 'lightgrey');
        $('#sgst').css('border-color', 'lightgrey');
        $('#Rate').css('border-color', 'lightgrey');
        $('#Color').css('border-color', 'lightgrey');
        $('#HSNCODE').css('border-color', 'lightgrey');
        $('#txtGSTTaxCode').css('border-color', 'lightgrey')
        $('#txtIGSTTaxCode').css('border-color', 'lightgrey');

        //$('#tbody').DataTable().destroy();

        LoadItemGroupDDL("#ddlitemgroup");
        LoadUomDDL("#base,#sec,#pur");
        LoadHSNDDL("#HSNCODE");

        $("#myModal6").modal('show');
    }
    else {
        //alert("You don't have rights...");
        var msg = "You don't have rights...";
        var flg = 4;
        var mode = 1;
        AlartMessage(msg, flg, mode);

    }
}

function fnCleaSizeControls() {

    $('#ddlsize').val('0').trigger('change');
    //$('#txtFabLoss').val('');

}

function Backmain() {
    if (type == 'B') {
        window.location.href = "/BulkOrder/BulkOrderIndex";
    }
    if (type == 'S') {
        window.location.href = "/SampleOrder/SampleOrderIndex";
    }
}

function LockDet() {
    var ord = $('#ddlOrderNo').val();
    var sty = Hstyleid;

    $.ajax({
        url: "/BudgetApproval/LoadLockDet",
        data: JSON.stringify({ ordno: ord, styleid: sty, Type: 'O' }),
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