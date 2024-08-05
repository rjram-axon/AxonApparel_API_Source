var ComboMainGrid = [];
var comboItemList = [];
var comboColorList = [];
var combocoltmplst = [];
var comboSizeList = [];
var combosiztmplst = [];
var comboStyleList = [];
var combostytmplst = [];
var comboShipList = [];
var genautoList = [];
var genmanualList = [];
var genshipmentList = [];
var itemseq = 0;
var Itemid = 0;
var QryItemId = 0;
var GWid = 0;
var AccReqId = 0;
var Mode = 0;
var PlanType = 0;
var PlanTypeId = 0;
var StyleL = [];
var ColorL = [];
var SizeL = [];
var Pcid = 0;
var Pclr = "";
var Szid = 0;
var Sz = "";
var ApplyType = 0;
var IDonEditDelMode = 0;
var StyleRowId = 0;
var shiprowid = 0;
var PLID = 0;
var ApplyID = 0;
var EditItemName = 0;
var Editunitid = 0;
var accreqmasid = 0;
var genshiprowid = 0;
var GenShipOrdQty = 0;
var GUserid = 0;
var Fillid = 0;
var EnbTranDate = 0;
var ImRemarks = 0;
var AllotedItemList = [];
$(document).ready(function () {
    debugger;
    var qrStr = window.location.search;
    var spQrStr = qrStr.substring(1);
    var arrQrStr = new Array();
    var arr = spQrStr.split('?');
    GUserid = $("#hdnUserid").data('value');
    EnbTranDate = $("#hdnETransDate").data('value');
    for (var i = 0; i < arr.length; i++) {
        var queryvalue = arr[i].split('=');
    }

    LoadStyleTemplateDDL("#ddlstyleTemp");

    if (EnbTranDate == "Y") {
        $("#txtDate").prop("disabled", true);
        $("#txtEntrydatedet").prop("disabled", true);

    } else {
        $("#txtDate").prop("disabled", false);
        $("#txtEntrydatedet").prop("disabled", true);
    }

    QryItemId = queryvalue[1];
    StyleRowId = queryvalue[3];
    var PlId = queryvalue[5];
    PLID = PlId;
    Mode = queryvalue[7];
    var OrderItemQty = queryvalue[9];
    loadcolor();
    loadsize();

    $('#txtordqtydet').val(OrderItemQty);

    LoadPlanItemDetails(QryItemId, StyleRowId);

    LoadAccessoryItemDDL("#ddlitemvar");

    $("#ddlitemvar").change(function () {
        var ID = this.value;
        var QUnit, ProcessQty, ReqQty = 0;

        GetUomCall(ID);
        //var firstDropVal = $('#pick').val();
    });

    $('#btnStyleTempadd').click(function () {
        debugger;
        Mode = 0;
        var OrderNo = $('#txtOrderNo').val();
        var EntryDate = $('#txtDate').val(); //new Date($('#txtDate').val());
        var StyleId = $('#txtHStyleId').val();
        var BuyOrdMasId = $('#txtBuyOrdMasId').val();
        //var ItemId = $('#txtitemidaccmas').val();
        var AccColorId = $('#ddlcolordet').val();
        var AccSizeId = $('#ddlsizedet').val();
        var StyleTempId = $('#ddlstyleTemp').val();
        var ProdQty = $("#txtprodqty").val();

        if ($('#ddlstyleTemp').val() == 0) {
            $('#ddlstyleTemp').css('border-color', 'Red');
            alert("Select any Template...");
        }
        else {
            $('#ddlsizedet').css('border-color', 'lightgrey');


            var TrimStyleTemplateObj = {
                OrderNo: OrderNo,
                EntryDate: $('#txtDate').val(),//new Date($('#txtDate').val()),
                Allowance: 0,//$('#txtallow').val(),
                StyleId: StyleId,
                AccColorID: AccColorId,
                AccSizeID: AccSizeId,
                ItemId: Itemid,
                StyleTemplateId: StyleTempId,
                //quantity: TotQty,
                BuyOrdMasId: BuyOrdMasId,
                ApplyID: 1,
                ProdQty: ProdQty,
                Mode: Mode,
                Companyid: $('#txtHCompanyId').val(),
                PlanType: PlanType,
                PlanId: 4,
                CreatedBy: GUserid,
            };

            $.ajax({
                url: "/Trims/AddStyleTemplateTrims",
                data: JSON.stringify(TrimStyleTemplateObj),
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {
                    debugger;
                    if (result.Status == "SUCCESS") {
                        alert("Record saved successfully...");
                        $('#myModal1').modal('hide');
                        Mode = 0;
                        fnLoadMainGridOnEditMode();

                        combocoltmplst = [];
                        comboColorList = [];
                        combosiztmplst = [];
                        comboSizeList = [];
                        combostytmplst = [];
                        comboStyleList = []
                        genautoList = [];
                        genmanualList = [];
                        genshipmentList = [];
                        shiprowid = 0;
                        //clearTextBox();
                    }
                    else {
                        alert("Record saved failed...");
                    }
                },
                error: function (errormessage) {
                    alert(errormessage.responseText);
                }
            });
        }
    });

    $("#ddlstyleTemp").change(function () {
        if ($('#ddlstyleTemp').val() != 0) {
            $('#ddlstyleTemp').css('border-color', 'lightgrey');
        }
    });

    //Add Gen-Det button click event
    $('#btngenadd').click(function () {
        var isAllValid = true;
        var qtyperpiece = 0;

        debugger;
        if ($('#ddlgenreqcolor').val() == "0") {
            isAllValid = false;
            $('#ddlgenreqcolor').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#ddlgenreqcolor').siblings('span.error').css('visibility', 'hidden');
        }

        if ($('#ddlgenreqsize').val() == "0") {
            isAllValid = false;
            $('#ddlgenreqsize').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#ddlgenreqsize').siblings('span.error').css('visibility', 'hidden');
        }
        if (PlanType == 'General' && ApplyType != 'Manual') {
            if ($('#txtqtyunit').val() == "") {
                $('#txtqtyunit').css('border-color', 'Red');
                isAllValid = false;
            }
            else {
                $('#txtqtyunit').css('border-color', 'lightgrey');
            }
        }
        else if (PlanType == 'General' && ApplyType == 'Manual') {
            if ($('#txtgenreqqty').val() == "") {
                $('#txtgenreqqty').css('border-color', 'Red');
                isAllValid = false;
            }
            else {
                $('#txtgenreqqty').css('border-color', 'lightgrey');
            }
        }

        if (PlanType == "General" && (ApplyType == "Auto" || ApplyType == "Manual")) {
            var garqty = 0;
            if ($("#optinnqty").is(":checked")) {
                garqty = $('#txtordqtydet').val();
            }
            else if ($("#optinnprod").is(":checked")) {
                garqty = $('#txtprodqtydet').val();
            }

            if (isAllValid) {
                var max = 0;
                if (ApplyType == "Auto") {
                    if (genautoList.length > 0) {
                        //Finding the max value of an attribute in an array of objects
                        jQuery.map(genautoList, function (obj) {
                            debugger;
                            if (obj.Sno > max)
                                max = obj.Sno;
                        });
                        //End
                    }
                }
                else if (ApplyType == "Manual") {
                    if (genmanualList.length > 0) {
                        //Finding the max value of an attribute in an array of objects
                        jQuery.map(genmanualList, function (obj) {
                            debugger;
                            if (obj.Sno > max)
                                max = obj.Sno;
                        });
                        //End
                    }
                }

                var GenlistObj = {
                    ColorId: $('#ddlgenreqcolor').val(),
                    ColorName: $("#ddlgenreqcolor option:selected").text(),
                    SizeName: $("#ddlgenreqsize option:selected").text(),
                    SizeId: $('#ddlgenreqsize').val(),
                    QtyPerPiece: ($('#txtqtyunit').val() == "" ? 0 : $('#txtqtyunit').val()),
                    TotQty: $('#txtgenreqqty').val(),
                    GarQty: garqty,
                    ItemId: Itemid,
                    UomId: $('#txtgenuomid').val(),
                    UomName: $('#txtgenuom').val(),
                    RecId: 0,
                    Sno: max + 1,
                    Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
                };

                if (ApplyType == "Auto") {
                    var qtypiece = $('#txtqtyunit').val();
                    //if (genautoList.length > 0) {
                    //    //Finding the max value of an attribute in an array of objects
                    //    var max = 0;
                    //    jQuery.map(genautoList, function (obj) {
                    //        debugger;
                    //        if (obj.Sno > max)
                    //            max = obj.Sno;
                    //    });
                    //    //End
                    //}
                    if (genautoList.length > 0) {
                        for (var f = 0; f < genautoList.length; f++) {
                            garqty = genautoList[f].GarQty;
                            if (qtyperpiece == 0) {
                                qtyperpiece = parseInt(genautoList[f].QtyPerPiece);
                            }
                            else {
                                qtyperpiece = (qtyperpiece + parseInt(genautoList[f].QtyPerPiece));
                            }
                        }
                        qtyperpiece = qtyperpiece + parseInt(qtypiece);

                        var AutoItems = $.grep(genautoList, function (item) {
                            return item.ColorId == $('#ddlgenreqcolor').val() && item.SizeId == $('#ddlgenreqsize').val();
                        });

                        if (AutoItems.length > 0) {
                            alert("Duplicate Color and Size...");
                        }
                        else {
                            //if (qtyValidation(genautoList, "Auto", qtyperpiece)) {
                            if (qtyperpiece > garqty) {
                                alert("Qty shouldn't exceed than Order qty...");
                            }
                            else {
                                genautoList.push(GenlistObj);
                                loadGenAuto(genautoList);

                                $('#ddlgenreqcolor').val(0);
                                $('#ddlgenreqsize').val(0);
                                $('#txtqtyunit').val('');
                                $('#txtgenreqqty').val('');
                                $('#txtgenuomid').val('');
                                $('#txtgenuom').val('');
                            }
                        }
                    }
                    else {
                        genautoList.push(GenlistObj);
                        loadGenAuto(genautoList);

                        $('#ddlgenreqcolor').val(0);
                        $('#ddlgenreqsize').val(0);
                        $('#txtqtyunit').val('');
                        $('#txtgenreqqty').val('');
                        $('#txtgenuomid').val('');
                        $('#txtgenuom').val('');
                    }
                }
                else if (ApplyType == "Manual") {
                    var qtypiece = $('#txtgenreqqty').val();
                    //genmanualList.push(GenlistObj);
                    //loadGenAuto(genmanualList);
                    if (genmanualList.length > 0) {
                        for (var f = 0; f < genmanualList.length; f++) {
                            garqty = genmanualList[f].GarQty;
                            if (qtyperpiece == 0) {
                                qtyperpiece = parseInt(genmanualList[f].TotQty);
                            }
                            else {
                                qtyperpiece = (qtyperpiece + parseInt(genmanualList[f].TotQty));
                            }
                        }
                        qtyperpiece = qtyperpiece + parseInt(qtypiece);

                        var ManualItems = $.grep(genmanualList, function (item) {
                            return item.ColorId == $('#ddlgenreqcolor').val() && item.SizeId == $('#ddlgenreqsize').val();
                        });

                        if (ManualItems.length > 0) {
                            alert("Duplicate Color and Size...");
                        }
                        else {
                            //if (qtyValidation(genautoList, "Auto", qtyperpiece)) {
                            if (qtyperpiece > garqty) {
                                alert("Qty shouldn't exceed than Order qty...");
                            }
                            else {
                                genmanualList.push(GenlistObj);
                                loadGenAuto(genmanualList);

                                $('#ddlgenreqcolor').val(0);
                                $('#ddlgenreqsize').val(0);
                                $('#txtqtyunit').val('');
                                $('#txtgenreqqty').val('');
                                $('#txtgenuomid').val('');
                                $('#txtgenuom').val('');
                            }
                        }
                    }
                    else {
                        genmanualList.push(GenlistObj);
                        loadGenAuto(genmanualList);

                        $('#ddlgenreqcolor').val(0);
                        $('#ddlgenreqsize').val(0);
                        $('#txtqtyunit').val('');
                        $('#txtgenreqqty').val('');
                        $('#txtgenuomid').val('');
                        $('#txtgenuom').val('');
                    }
                    //if (qtyValidation(genmanualList,"Manual")) {
                    //    alert("Qty shouldn't exceed than Order qty...");
                    //}
                    //else {
                    //    loadGenAuto(genmanualList);
                    //    $('#ddlgenreqcolor').val(0);
                    //    $('#ddlgenreqsize').val(0);
                    //    $('#txtqtyunit').val('');
                    //    $('#txtgenreqqty').val('');
                    //    $('#txtgenuomid').val('');
                    //    $('#txtgenuom').val('');
                    //}
                }
            }
        }
        else if (PlanType == "General" && ApplyType == "Shipment") {
            var garqty = 0;
            var qtypiece = $('#txtqtyunit').val();

            if ($("#optinnqty").is(":checked")) {
                garqty = $('#txtordqtydet').val();
            }
            else if ($("#optinnprod").is(":checked")) {
                garqty = $('#txtprodqtydet').val();
            }

            //if (isAllValid) {
            //    var max = 0;
            //    if (ApplyType == "Auto") {
            //        if (genautoList.length > 0) {
            //            //Finding the max value of an attribute in an array of objects

            //            jQuery.map(genautoList, function (obj) {
            //                debugger;
            //                if (obj.Sno > max)
            //                    max = obj.Sno;
            //            });
            //            //End
            //        }
            //    }
            //    else if (ApplyType == "Manual") {
            //        if (genmanualList.length > 0) {
            //            //Finding the max value of an attribute in an array of objects

            //            jQuery.map(genmanualList, function (obj) {
            //                debugger;
            //                if (obj.Sno > max)
            //                    max = obj.Sno;
            //            });
            //            //End
            //        }
            //    }
            if (genshiprowid == 0) {
                alert("Select any assort no...");
            }
            else {
                var GenlistObj = {
                    ColorId: $('#ddlgenreqcolor').val(),
                    ColorName: $("#ddlgenreqcolor option:selected").text(),
                    SizeName: $("#ddlgenreqsize option:selected").text(),
                    SizeId: $('#ddlgenreqsize').val(),
                    QtyPerPiece: ($('#txtqtyunit').val() == "" ? 0 : $('#txtqtyunit').val()),
                    TotQty: $('#txtgenreqqty').val(),
                    GarQty: garqty,
                    UomId: $('#txtgenuomid').val(),
                    UomName: $('#txtgenuom').val(),
                    RecId: 0,
                    ShipRowId: genshiprowid,
                    Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
                };

                if (genshipmentList.length > 0) {
                    for (var f = 0; f < genshipmentList.length; f++) {
                        garqty = genshipmentList[f].GarQty;
                        if (qtyperpiece == 0) {
                            qtyperpiece = parseInt(genshipmentList[f].QtyPerPiece);
                        }
                        else {
                            qtyperpiece = (qtyperpiece + parseInt(genshipmentList[f].QtyPerPiece));
                        }
                    }
                    qtyperpiece = qtyperpiece + parseInt(qtypiece);

                    //if (qtyValidation(genautoList, "Auto", qtyperpiece)) {
                    if (qtyperpiece > GenShipOrdQty) {
                        alert("Qty shouldn't exceed than Order qty...");
                    }
                    else {
                        genshipmentList.push(GenlistObj);
                        var matchingItems = $.grep(genshipmentList, function (item) {
                            return item.ShipRowId == genshiprowid;
                        });
                        LoadGenShipmentDet(matchingItems);

                        $('#ddlgenreqcolor').val(0);
                        $('#ddlgenreqsize').val(0);
                        $('#txtqtyunit').val('');
                        $('#txtgenreqqty').val('');
                        $('#txtgenuomid').val('');
                        $('#txtgenuom').val('');
                    }
                }
                else {
                    genshipmentList.push(GenlistObj);
                    var matchingItems = $.grep(genshipmentList, function (item) {
                        return item.ShipRowId == genshiprowid;
                    });

                    LoadGenShipmentDet(matchingItems);

                    $('#ddlgenreqcolor').val(0);
                    $('#ddlgenreqsize').val(0);
                    $('#txtqtyunit').val('');
                    $('#txtgenreqqty').val('');
                    $('#txtgenuomid').val('');
                    $('#txtgenuom').val('');
                }
            }
        }
    });

    $(document).on('click', '.btnedit', function () {
        debugger;
        rowindex = $(this).closest('tr').index();
        if (PlanType == 'General' && ApplyType == 'Auto') {
            var cur1 = genautoList.slice(rowindex);

            $('#ddlgenreqcolor').val(cur1[0]['ColorId']);
            $('#ddlgenreqsize').val(cur1[0]['SizeId']);
            $('#txtqtyunit').val(cur1[0]['QtyPerPiece']);
            $('#txtgenreqqty').val(cur1[0]['TotQty']);
            $('#txtgenuomid').val(cur1[0]['UomId']);
            $('#txtgenuom').val(cur1[0]['UomName']);
        }
        else if (PlanType == 'General' && ApplyType == 'Manual') {
            var cur1 = genmanualList.slice(rowindex);

            $('#ddlgenreqcolor').val(cur1[0]['ColorId']);
            $('#ddlgenreqsize').val(cur1[0]['SizeId']);
            $('#txtqtyunit').val(cur1[0]['QtyPerPiece']);
            $('#txtgenreqqty').val(cur1[0]['TotQty']);
            $('#txtgenuomid').val(cur1[0]['UomId']);
            $('#txtgenuom').val(cur1[0]['UomName']);
        }

        $('#btngenadd').hide();
        $('#btngenViewUpdate').show();
    });

    $('#btngenViewUpdate').click(function () {
        debugger;
        if (PlanType == 'General' && ApplyType == 'Auto') {
            var currentrowsel = genautoList.slice(rowindex);

            currentrowsel[0]['ColorId'] = $("#ddlgenreqcolor").val();
            currentrowsel[0]['ColorName'] = $("#ddlgenreqcolor option:selected").text();
            currentrowsel[0]['SizeId'] = $("#ddlgenreqsize").val();
            currentrowsel[0]['SizeName'] = $("#ddlgenreqsize option:selected").text();
            currentrowsel[0]['QtyPerPiece'] = $("#txtqtyunit").val();
            currentrowsel[0]['TotQty'] = $("#txtgenreqqty").val();
            currentrowsel[0]['UomId'] = $("#txtgenuomid").val();
            currentrowsel[0]['UomName'] = $("#txtgenuom").val();

            genautoList[rowindex] = currentrowsel[0];

            loadGenAuto(genautoList);
        }
        if (PlanType == 'General' && ApplyType == 'Manual') {
            var currentrowsel = genmanualList.slice(rowindex);

            currentrowsel[0]['ColorId'] = $("#ddlgenreqcolor").val();
            currentrowsel[0]['ColorName'] = $("#ddlgenreqcolor option:selected").text();
            currentrowsel[0]['SizeId'] = $("#ddlgenreqsize").val();
            currentrowsel[0]['SizeName'] = $("#ddlgenreqsize option:selected").text();
            currentrowsel[0]['QtyPerPiece'] = $("#txtqtyunit").val();
            currentrowsel[0]['TotQty'] = $("#txtgenreqqty").val();
            currentrowsel[0]['UomId'] = $("#txtgenuomid").val();
            currentrowsel[0]['UomName'] = $("#txtgenuom").val();

            genmanualList[rowindex] = currentrowsel[0];

            loadGenAuto(genmanualList);
        }

        $('#ddlgenreqcolor').val(0);
        $('#ddlgenreqsize').val(0);
        $('#txtqtyunit').val('');
        $('#txtgenreqqty').val('');
        $('#txtgenuomid').val('');
        $('#txtgenuom').val('');

        $('#btngenadd').show();
        $('#btngenViewUpdate').hide();

    });
    $("#ddlgenreqcolor").change(function () {
        var ID = Itemid;
        var QUnit, ProcessQty, ReqQty = 0;

        $.ajax({
            url: "/Trims/GetUombyItem/" + ID,
            type: "GET",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (json) {
                var tableload = json.Value;
                $('#txtgenuomid').val(tableload.UomId);
                $('#txtgenuom').val(tableload.UomName);
            }
        });
        //var firstDropVal = $('#pick').val();
    });

    //loadData();

    //LoadPlanItemDetails(1, 43);    

    //$('#tblcolordet tr').on('click', function () {
    //    alert("Test");
    //});

    //$('#tblcolordet tr').click(function () {
    ////$('#tblcolordet tbody').on('click', 'tr', function () {
    //    debugger;
    //    alert("HI");
    //    $(this).css('background-color', "#D6D5C3");
    //});

    //if (Mode == 1) {
    //    loadedit(PlId);
    //}

    $("#txtallow").keyup(function (e) {
        debugger;
        //if (e.keyCode == 13 && $('#txtallow').val() > 0) {
        var allowance = $('#txtallow').val();
        if (allowance == "") {
            $('#txtallow').val(0);
        }

        fnArriveCalc();
        //if (comboColorList.length > 0 && comboColorList != undefined && comboColorList != null) {

        //    for (var i = 0; i < comboColorList.length; i++) {
        //        var qtyval = comboColorList[i]["Qty"];
        //        //var reqval = comboColorList[i]["ReqQty"];
        //        var reqval = comboColorList[i]["QUnit"];
        //        var reqqty = qtyval * reqval;
        //        var percenval = ((reqqty * allowance) / 100);
        //        var allowval = (percenval + reqqty);

        //        //Round Off
        //        comboColorList[i]["ReqQty"] = Math.ceil(allowval);
        //    }

        //    LoadComboColor(comboColorList);
        //    chk("Color", "3");
        //}
        //else if (comboSizeList.length > 0 && comboSizeList != undefined && comboSizeList != null) {

        //    //LoadComboSize(matchingItems);
        //    //chk("Size", "3");
        //}
        //else if (comboStyleList.length > 0 && comboStyleList != undefined && comboStyleList != null) {

        //    //LoadComboStyle(matchingItems);
        //    //chk("Style", "3");
        //}
        //}
    });

    $("#ddltoarriveqty").change(function () {
        debugger;
        fnArriveCalc();
    });

    $(document).on('change', '.loadReqcolorlist', function () {
        debugger;

        rowindex = $(this).closest('tr').index();
        var val = $(this).val();

        var oldind = -1;
        for (var x = 0; x < ColorL.length; x++) {
            if (ColorL[x].ColorId == val) {
                fs = ColorL[x].Color;
                oldind = x;
            }
        }

        var currentrow = comboStyleList.slice(rowindex);
        var s = currentrow[0].Sno;

        $.each(comboStyleList, function () {
            if (this.Sno == s) {
                this.PColor = fs;
                this.PColorid = val;

            }
        });
        array_move(ColorL, oldind, 0)
    });

    $(document).on('change', '.loadcolorlist', function () {
        debugger;

        rowindex = $(this).closest('tr').index();
        var val = $(this).val();

        var oldind = -1;
        for (var x = 0; x < ColorL.length; x++) {
            if (ColorL[x].ColorId == val) {
                fs = ColorL[x].Color;
                oldind = x;
            }
        }

        var currentrow = comboColorList.slice(rowindex);
        var s = currentrow[0].Sno;

        $.each(comboColorList, function () {
            if (this.Sno == s) {
                this.PColor = fs;
                this.PColorid = val;

            }
        });
        array_move(ColorL, oldind, 0)
    });

    $(document).on('change', '.ddlReqColor', function () {
        debugger;

        rowindex = $(this).closest('tr').index();
        var val = $(this).val();

        var oldind = -1;
        for (var x = 0; x < ColorL.length; x++) {
            if (ColorL[x].ColorId == val) {
                fs = ColorL[x].Color;
                oldind = x;
            }
        }

        var currentrow = comboColorList.slice(rowindex);
        var s = currentrow[0].Sno;

        $.each(comboColorList, function () {
            if (this.Sno == s) {
                this.ReqColor = fs;
                this.ReqColorId = val;

            }
        });
        array_move(ColorL, oldind, 0)
    });
    $(document).on('change', '.loadsizelist', function () {
        debugger;
        table = $('#tblsizedetails').DataTable();
        var sno = table.row($(this).parents('tr')).data()["Sno"];

        //rowindex = $(this).closest('tr').index();
        var val = $(this).val();

        var oldind = -1;
        var fs = '';
        for (var x = 0; x < SizeL.length; x++) {
            if (SizeL[x].SizeId == val) {
                fs = SizeL[x].Size;
                oldind = x;
            }
        }

        //var currentrow = comboSizeList.slice(rowindex);
        //var s = currentrow[0].Sno;

        $.each(comboSizeList, function () {
            if (this.Sno == sno) {
                this.AccSize = fs;
                this.AccSizeId = val;
            }
        });
        array_move(SizeL, oldind, 0)
        LoadComboSize(comboSizeList);
    });

    $(document).on('change', '.loadstylelist', function () {
        debugger;
        table = $('#tblstyledetails').DataTable();
        var sno = table.row($(this).parents('tr')).data()["Sno"];

        //rowindex = $(this).closest('tr').index();
        var val = $(this).val();

        var oldind = -1;
        var fs = '';
        for (var x = 0; x < SizeL.length; x++) {
            if (SizeL[x].SizeId == val) {
                fs = SizeL[x].Size;
                oldind = x;
            }
        }

        $.each(comboStyleList, function () {
            if (this.Sno == sno) {
                //this.Size = fs;
                //this.SizeId = val;
                this.AccSize = fs;
                this.AccSizeId = val;
            }
        });
        array_move(SizeL, oldind, 0)
        // LoadComboStyle(comboStyleList);
    });

    $(document).on('keyup', '.txtqunit', function () {
        debugger;
        //rowindex = $(this).closest('tr').index();
        //var currentrow = comboColorList.slice(rowindex);
        var val = $(this).val();
        //var req_qty = (currentrow[0]["Qty"] * qtyunit);
        //currentrow[0]["ReqQty"] = req_qty;
        //currentrow[0]["QUnit"] = qtyunit;

        //comboColorList[rowindex] = currentrow[0];

        //LoadComboColor(comboColorList);
        var allowance = $('#txtallow').val();
        var table = 0;

        if (PlanType == "Color") {
            table = $('#tblcolordet').DataTable();
        }
        else if (PlanType == "Size") {
            table = $('#tblsizedetails').DataTable();
        }
        else if (PlanType == "Style") {
            table = $('#tblstyledetails').DataTable();
        }

        var sno = table.row($(this).parents('tr')).data()["Sno"];
        Fillid = sno;
        var qty = table.row($(this).parents('tr')).data()["Qty"];
        var reqqty = table.row($(this).parents('tr')).data()["ReqQty"];
        var qunit = table.row($(this).parents('tr')).data()["QUnit"];

        var qtyunit = $(this).val();
        var req_qty = 0;

        if (qtyunit > 0) {
            req_qty = (qty * qtyunit);
        }

        //if (PlanType == "General" && (ApplyType == "Auto" || ApplyType == "Shipment")) {
        //    if ($("#optinnqty").is(":checked")) {
        //        $("#optinnqty").prop("checked", true);
        //        //calval();
        //        fnArriveCalc();
        //    }
        //    else if ($("#optinnprod").is(":checked")) {
        //        $("#optinnprod").prop("checked", true);
        //        //calval();
        //        fnArriveCalc();
        //    }
        //}
        //else if (PlanType == "Color" && (ApplyType == "Auto" || ApplyType == "Shipment")) {
        //    if ($("#optinnqty").is(":checked")) {
        //        $("#optinnqty").prop("checked", true);
        //        //var combocoltmplst = []
        //        //combocoltmplst = comboColorList;

        //        //combocoltmplst = $.grep(comboColorList, function (e) {
        //        //    return e;
        //        //});
        //        var combocoltmplst = JSON.parse(JSON.stringify(comboColorList));

        //        for (var f = 0; f < combocoltmplst.length; f++) {
        //            combocoltmplst[f].Qty = combocoltmplst[f].Qty;
        //            //comboColorList[f].PColor = Pclr;
        //        }

        //        if (Mode == 0) {
        //            LoadComboColor(combocoltmplst);
        //        }
        //        fnColorlst(combocoltmplst);
        //        //fnArriveCalc();

        //    }
        //    else if ($("#optinnprod").is(":checked")) {
        //        $("#optinnprod").prop("checked", true);
        //        //var combocoltmplst = []
        //        //combocoltmplst = comboColorList;

        //        //combocoltmplst = $.grep(comboColorList, function (e) {
        //        //    return e;
        //        //});
        //        var combocoltmplst = JSON.parse(JSON.stringify(comboColorList));

        //        for (var f = 0; f < combocoltmplst.length; f++) {
        //            combocoltmplst[f].Qty = combocoltmplst[f].PQty;
        //            //comboColorList[f].PColor = Pclr;
        //        }

        //        if (Mode == 0) {
        //            LoadComboColor(combocoltmplst);
        //        }
        //        fnColorlst(combocoltmplst);
        //        //fnArriveCalc();
        //    }
        //}
        //else if (PlanType == "Size" && (ApplyType == "Auto" || ApplyType == "Shipment")) {
        //    if ($("#optinnqty").is(":checked")) {
        //        $("#optinnqty").prop("checked", true);
        //        fnArriveCalc();
        //        //if (comboColorList.length > 0 && comboColorList != undefined && comboColorList != null) {

        //        //}
        //    }
        //    else if ($("#optinnprod").is(":checked")) {
        //        $("#optinnprod").prop("checked", true);
        //        fnArriveCalc();
        //    }
        //}
        //else if (PlanType == "Style" && (ApplyType == "Auto" || ApplyType == "Shipment")) {
        //    if ($("#optinnqty").is(":checked")) {
        //        $("#optinnqty").prop("checked", true);
        //        fnArriveCalc();
        //        //if (comboColorList.length > 0 && comboColorList != undefined && comboColorList != null) {

        //        //}
        //    }
        //    else if ($("#optinnprod").is(":checked")) {
        //        $("#optinnprod").prop("checked", true);
        //        fnArriveCalc();
        //    }
        //}
        if (combocoltmplst.length > 0 && combocoltmplst != undefined && combocoltmplst != null) {

            for (var i in combocoltmplst) {
                if (combocoltmplst[i].Sno == sno) {
                    combocoltmplst[i].ReqQty = req_qty;
                    combocoltmplst[i].QUnit = qtyunit;
                    break; //Stop this loop, we found it!
                }
            }
            fnArriveCalc();

        }
        else if (comboColorList.length > 0 && comboColorList != undefined && comboColorList != null) {

            for (var i in comboColorList) {
                if (comboColorList[i].Sno == sno) {
                    comboColorList[i].ReqQty = req_qty;
                    comboColorList[i].QUnit = qtyunit;
                    break; //Stop this loop, we found it!
                }
            }
            fnArriveCalc();

        }

        if (combosiztmplst.length > 0 && combosiztmplst != undefined && combosiztmplst != null) {
            for (var i in combosiztmplst) {
                if (combosiztmplst[i].Sno == sno) {
                    combosiztmplst[i].ReqQty = req_qty;
                    combosiztmplst[i].QUnit = qtyunit;
                    break; //Stop this loop, we found it!
                }
            }
            fnArriveCalc();
            //LoadComboSize(matchingItems);
            //chk("Size", "3");
        }
        else if (comboSizeList.length > 0 && comboSizeList != undefined && comboSizeList != null) {
            for (var i in comboSizeList) {
                if (comboSizeList[i].Sno == sno) {
                    comboSizeList[i].ReqQty = req_qty;
                    comboSizeList[i].QUnit = qtyunit;
                    break; //Stop this loop, we found it!
                }
            }
            fnArriveCalc();
            //LoadComboSize(matchingItems);
            //chk("Size", "3");
        }

        if (combostytmplst.length > 0 && combostytmplst != undefined && combostytmplst != null) {
            for (var i in combostytmplst) {
                if (combostytmplst[i].Sno == sno) {
                    combostytmplst[i].ReqQty = req_qty;
                    combostytmplst[i].QUnit = qtyunit;
                    break; //Stop this loop, we found it!
                }
            }
            fnArriveCalc();
            //LoadComboStyle(matchingItems);
            //chk("Style", "3");
        }
        else if (comboStyleList.length > 0 && comboStyleList != undefined && comboStyleList != null) {
            for (var i in comboStyleList) {
                if (comboStyleList[i].Sno == sno) {
                    comboStyleList[i].ReqQty = req_qty;
                    comboStyleList[i].QUnit = qtyunit;
                    break; //Stop this loop, we found it!
                }
            }
            fnArriveCalc();
            //LoadComboStyle(matchingItems);
            //chk("Style", "3");
        }

        //Cursor Focus in Grid Textbox...
        //if (PlanType == "Color") {
        //    var rows = $("#tblcolordet").dataTable().fnGetNodes();
        //    var dtTable = $('#tblcolordet').DataTable();
        //    for (var i = 0; i < rows.length; i++) {
        //        var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
        //        $('input[id=txtqunit]').each(function () {
        //            if (sn == sno && $(this).val() == val) {
        //                var row = $(this).closest('tr');
        //                var num = row.find('#txtqunit').val();
        //                row.find('#txtqunit').focus().val('').val(num);
        //                return false;
        //            }
        //        });
        //    }
        //}
        //else if (PlanType == "Size") {
        //    var rows = $("#tblsizedetails").dataTable().fnGetNodes();
        //    var dtTable = $('#tblsizedetails').DataTable();
        //    for (var i = 0; i < rows.length; i++) {
        //        var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
        //        $('input[id=txtqunit]').each(function () {
        //            if (sn == sno && $(this).val() == val) {
        //                var row = $(this).closest('tr');
        //                var num = row.find('#txtqunit').val();
        //                row.find('#txtqunit').focus().val('').val(num);
        //                return false;
        //            }
        //        });
        //    }
        //}
        //else if (PlanType == "Style") {
        //    var rows = $("#tblstyledetails").dataTable().fnGetNodes();
        //    var dtTable = $('#tblstyledetails').DataTable();
        //    for (var i = 0; i < rows.length; i++) {
        //        var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
        //        $('input[id=txtqunit]').each(function () {
        //            if (sn == sno && $(this).val() == val) {
        //                var row = $(this).closest('tr');
        //                var num = row.find('#txtqunit').val();
        //                row.find('#txtqunit').focus().val('').val(num);
        //                return false;
        //            }
        //        });
        //    }
        //}
        if (PlanType == "Color") {




            var rows = $("#tblcolordet").dataTable().fnGetNodes();
            var dtTable = $('#tblcolordet').DataTable();
            var cldata = dtTable.rows().data();
            for (var i = 0; i < rows.length; i++) {
                var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
                $('input[id=txtqunit]').each(function (g) {
                    if (cldata[g].Sno == sno) {
                        var row = $(this).closest('tr');
                        var num = row.find('#txtqunit').val();
                        row.find('#txtqunit').focus().val('').val(num);
                        return false;
                    }
                });
            }
        }
        else if (PlanType == "Size") {


            //var septable = $('#tblsizedetails').DataTable();
            //var sepdata = septable.rows().data();

            //$('input[id=txtqunit]').each(function (ig) {
            //    if (sepdata[ig].Sno == sno) {
            //        var row = $(this).closest('tr');
            //        row.find('#txtqunit').val(val);
            //    }

            //});


            //var rows = $("#tblsizedetails").dataTable().fnGetNodes();
            //var dtTable = $('#tblsizedetails').DataTable();
            //var szdata = dtTable.rows().data();
            //for (var i = 0; i < rows.length; i++) {
            //    var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
            //    $('input[id=txtqunit]').each(function (g) {
            //        if (szdata[g].Sno == sno) {
            //            var row = $(this).closest('tr');
            //            var num = row.find('#txtqunit').val();
            //            row.find('#txtqunit').focus().val('').val(num);
            //            return false;
            //        }
            //    });
            //}
            var rows = $("#tblsizedetails").dataTable().fnGetNodes();
            var dtTable = $('#tblsizedetails').DataTable();
            var szdata = dtTable.rows().data();
            for (var i = 0; i < rows.length; i++) {
                var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
                $('input[id=txtqunit]').each(function (g) {
                    if (szdata[g].Sno == sno) {
                        var row = $(this).closest('tr');
                        var num = row.find('#txtqunit').val();
                        row.find('#txtqunit').focus().val('').val(num);
                        return false;
                    }
                });
            }
        }
        else if (PlanType == "Style") {
            //var rows = $("#tblstyledetails").dataTable().fnGetNodes();
            //var dtTable = $('#tblstyledetails').DataTable();
            //var stdata = dtTable.rows().data();
            //for (var i = 0; i < rows.length; i++) {
            //    var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
            //    $('input[id=txtqunit]').each(function (g) {
            //        if (stdata[g].Sno == sno) {
            //            var row = $(this).closest('tr');
            //            var num = row.find('#txtqunit').val();
            //            row.find('#txtqunit').focus().val('').val(num);
            //            return false;
            //        }
            //    });
            //}

            var rows = $("#tblstyledetails").dataTable().fnGetNodes();
            var dtTable = $('#tblstyledetails').DataTable();
            var stdata = dtTable.rows().data();
            for (var p = 0; p < rows.length; p++) {
                var sn = dtTable.cells({ row: p, column: 0 }).data()[0];
                $('input[id=txtStyleProQty]').each(function (g) {
                    if (stdata[g].Sno == sno) {
                        var row = $(this).closest('tr');
                        var num = row.find('#txtqunit').val();
                        row.find('#txtqunit').focus().val('').val(num);
                        return false;
                    }
                });
            }
        }
    });

    $(document).on('keyup', '.txtproqty', function () {
        debugger;
        //rowindex = $(this).closest('tr').index();
        //var currentrow = comboColorList.slice(rowindex);
        ////var cl = ColorL[rowindex].ColorId;
        //var ProcessQty = $(this).val();

        //currentrow[0]['ProcessQty'] = ProcessQty;

        //comboColorList[rowindex] = currentrow[0];
        if (comboColorList.length > 0 && comboColorList != undefined && comboColorList != null) {
            var table = $('#tblcolordet').DataTable();
            var sno = table.row($(this).parents('tr')).data()["Sno"];
            //var processqty = table.row($(this).parents('tr')).data()["ProcessQty"];        

            var processqty = $(this).val();

            for (var i in comboColorList) {
                if (comboColorList[i].Sno == sno) {
                    comboColorList[i].ProcessQty = processqty;
                    break; //Stop this loop, we found it!
                }
            }
        }
        else if (comboSizeList.length > 0 && comboSizeList != undefined && comboSizeList != null) {

            //LoadComboSize(matchingItems);
            //chk("Size", "3");
        }
        else if (comboStyleList.length > 0 && comboStyleList != undefined && comboStyleList != null) {

            //LoadComboStyle(matchingItems);
            //chk("Style", "3");
        }
    });

    $(document).on('keyup', '.txtStyleProQty', function () {
        debugger;
        rowindex = $(this).closest('tr').index();
        var currentrow = comboStyleList.slice(rowindex);
        //var cl = ColorL[rowindex].ColorId;
        var PQty = $(this).val();
        var PColorId = $('#ddlPColor').text();
        //var ty = $("#tblcolordet tr:eq(" + rowindex + ") td:eq(3)").html();
        //currentrow[0]['PColorid'] = PColorId;
        currentrow[0]['ProcessQty'] = PQty;

        comboStyleList[rowindex] = currentrow[0];
    });

    $(document).on('keyup', '.txtStyleReqQty', function () {
        debugger;
        //rowindex = $(this).closest('tr').index();
        //var currentrow = comboStyleList.slice(rowindex);
        ////var cl = ColorL[rowindex].ColorId;
        //var ReqQty = $(this).val();
        //var PColorId = $('#ddlReqColor').text();
        ////var ty = $("#tblcolordet tr:eq(" + rowindex + ") td:eq(3)").html();
        ////currentrow[0]['PColorid'] = PColorId;
        //currentrow[0]['ReqQty'] = ReqQty;

        //comboStyleList[rowindex] = currentrow[0];

        var table = 0;
        table = $('#tblstyledetails').DataTable();
        var sno = table.row($(this).parents('tr')).data()["Sno"];
        Fillid = sno;
        var PColorId = $('#ddlReqColor').val();
        var ReqQty = $(this).val();

        for (var i in comboStyleList) {
            if (comboStyleList[i].Sno == sno) {
                comboStyleList[i].PColorid = PColorId;
                comboStyleList[i].ReqQty = ReqQty;
                break; //Stop this loop, we found it!
            }
        }
        //LoadCuttingDetails(cuttingDetlist);
    });

    $(document).on('keyup', '.txtSizeReqQty', function () {
        debugger;
        //rowindex = $(this).closest('tr').index();
        //var currentrow = comboSizeList.slice(rowindex);
        ////var cl = ColorL[rowindex].ColorId;
        //var ReqQty = $(this).val();
        ////var PColorId = $('#ddlPColor').text();
        ////var ty = $("#tblcolordet tr:eq(" + rowindex + ") td:eq(3)").html();
        ////currentrow[0]['PColorid'] = PColorId;
        //currentrow[0]['ReqQty'] = ReqQty;

        //comboSizeList[rowindex] = currentrow[0];
        var table = 0;
        table = $('#tblsizedetails').DataTable();
        var sno = table.row($(this).parents('tr')).data()["Sno"];
        Fillid = sno;

        var ReqQty = $(this).val();
        for (var i in comboSizeList) {
            if (comboSizeList[i].Sno == sno) {
                //comboSizeList[i].PColorid = PColorId;
                comboSizeList[i].ReqQty = ReqQty;
                break; //Stop this loop, we found it!
            }
        }

        //LoadCuttingDetails(cuttingDetlist);
    });

    $(document).on('keyup', '.txtReqQty', function () {
        debugger;

        var table = 0;

        //if (PlanType == "Color") {
        table = $('#tblcolordet').DataTable();
        //}
        //else if (PlanType == "Size") {
        //    table = $('#tblsizedetails').DataTable();
        //}
        //else if (PlanType == "Style") {
        //    table = $('#tblstyledetails').DataTable();
        //}

        var sno = table.row($(this).parents('tr')).data()["Sno"];
        Fillid = sno;
        //var cl = table.row($(this).parents('tr')).data()["ColorId"];

        //rowindex = $(this).closest('tr').index();
        //var currentrow = comboColorList.slice(rowindex);
        //var cl = ColorL[rowindex].ColorId;
        var ReqQty = $(this).val();

        //var table = $('#tblcolordet').DataTable();
        //YarnColSeq = table.row($(this).parents('tr')).data()["PColorid"];

        var PColorId = $('#ddlPColor').text();
        //var ty = $("#tblcolordet tr:eq(" + rowindex + ") td:eq(3)").html();

        //currentrow[0]['PColorid'] = PColorId;
        //currentrow[0]['ReqQty'] = ReqQty;
        //comboColorList[rowindex] = currentrow[0];

        for (var i in comboColorList) {
            if (comboColorList[i].Sno == sno) {
                comboColorList[i].PColorid = PColorId;
                comboColorList[i].ReqQty = ReqQty;
                break; //Stop this loop, we found it!
            }
        }
        //LoadCuttingDetails(cuttingDetlist);
    });


    $("#txtqtyunit").keyup(function () {
        debugger;
        if ($("#optinnqty").is(":checked")) {
            calval();
        }
        else if ($("#optinnprod").is(":checked")) {
            calval();
        }
    });

    $(document).on('keyup', '.txtPcolor', function () {
        debugger;
        rowindex = $(this).closest('tr').index();
        var currentrow = comboColorList.slice(rowindex);
        // var cl = ColorL[rowindex].ColorId;

        var ReqQty = $(this).val();
        //LoadCuttingDetails(cuttingDetlist);
    });

    $(document).on('click', '.btnshipView', function () {
        debugger;
        var table = $('#tblshipdet').DataTable();
        shiprowid = table.row($(this).parents('tr')).data()["shiprowid"];
        genshiprowid = table.row($(this).parents('tr')).data()["shiprowid"];
        GenShipOrdQty = table.row($(this).parents('tr')).data()["qty"];

        if (comboColorList.length > 0 && comboColorList != undefined && comboColorList != null) {
            var matchingItems = $.grep(comboColorList, function (item) {
                return item.ShipRowId == shiprowid;
            });

            LoadComboColor(matchingItems);
            chk("Color", "3");
        }
        else if (comboSizeList.length > 0 && comboSizeList != undefined && comboSizeList != null) {
            var matchingItems = $.grep(comboSizeList, function (item) {
                return item.ShipRowId == shiprowid;
            });

            LoadComboSize(matchingItems);
            chk("Size", "3");
        }
        else if (comboStyleList.length > 0 && comboStyleList != undefined && comboStyleList != null) {
            var matchingItems = $.grep(comboStyleList, function (item) {
                return item.ShipRowId == shiprowid;
            });

            LoadComboStyle(matchingItems);
            chk("Style", "3");
        }
        else if (genshipmentList.length > 0 && genshipmentList != undefined && genshipmentList != null) {
            var matchingItems = $.grep(genshipmentList, function (item) {
                return item.ShipRowId == genshiprowid;
            });

            //loadGenAuto(matchingItems);
            LoadGenShipmentDet(matchingItems);
            chk("General", "3");
        }

    });

    $(document).on('click', '.btnrowsizesubmit', function () {

        var QUnit, ProcessQty, ReqQty, ProcessColorId = 0;

        rowindex = $(this).closest('tr').index();
        var currentcolorrow = comboSizeList.slice(rowindex);
        var AccSizeId = $('#ddlsizedet').val();

        QUnit = $(this).closest('tr').find('#txtqunit').val();
        ProcessQty = $(this).closest('tr').find('#txtqunit').val();
        ReqQty = $(this).closest('tr').find('#txtReqQty').val();
        ProcessColorId = $(this).closest('tr').find('#ddlprocecolor').val();

        currentcolorrow[0].GarSizeID = currentcolorrow[0].sizeid;
        currentcolorrow[0].GarQty = currentcolorrow[0].Qty;
        currentcolorrow[0].AccSizeID = (AccSizeId == 0 ? 0 : AccSizeId);
        currentcolorrow[0].TotalQty = ProcessQty;
        currentcolorrow[0].BOMQty = ProcessQty;
        currentcolorrow[0].QtyPerPiece = QUnit;
        currentcolorrow[0].PQty = ProcessQty;
        currentcolorrow[0].PColorId = (ProcessColorId == null ? 0 : ProcessColorId);

        comboSizeList[rowindex] = currentcolorrow[0];
    });

    $(document).on('click', '.btnrowsubmit', function () {

        var QUnit, ProcessQty, ReqQty, ProcessColorId = 0;

        rowindex = $(this).closest('tr').index();
        var currentcolorrow = comboColorList.slice(rowindex);
        var AccColorId = $('#ddlcolordet').val();

        //sizeseq = currentcolorrow[0].ComboSizeSeq;

        QUnit = $(this).closest('tr').find('#txtqunit').val();
        ProcessQty = $(this).closest('tr').find('#txtqunit').val();
        ReqQty = $(this).closest('tr').find('#txtReqQty').val();
        ProcessColorId = 8;//$(this).closest('tr').find('#ddlprocecolor').val();

        currentcolorrow[0].GarColorID = currentcolorrow[0].ColorId;
        currentcolorrow[0].GarQty = currentcolorrow[0].Qty;
        currentcolorrow[0].AccColorID = (AccColorId == 0 ? 0 : AccColorId);
        currentcolorrow[0].TotalQty = ProcessQty;
        currentcolorrow[0].BOMQty = ProcessQty;
        currentcolorrow[0].QtyPerPiece = QUnit;
        currentcolorrow[0].PQty = ProcessQty;
        currentcolorrow[0].PColorId = (ProcessColorId == null ? 0 : ProcessColorId);

        comboColorList[rowindex] = currentcolorrow[0];
        alert("Record edited...");
    });

    $('#btnclose').click(function () {
        $('#myModal1').modal('hide');
        $('#ddlgenreqcolor').val(0);
        $('#ddlgenreqsize').val(0);
        $('#txtqtyunit').val("");
        $('#txtgenreqqty').val("");
        $('#txtgenuom').val("");
        Itemid = 0;
        EditItemName = 0;
        accreqmasid = 0;
        ApplyID = 0;
        ApplyType = 0;
        Editunitid = 0;
        genshiprowid = 0;
        shiprowid = 0;
        GenShipOrdQty = 0;
        genshipmentList = [];
        genmanualList = [];
        genautoList = [];
        ColorL = [];
        SizeL = [];
    });

    $('#btnitemadd').click(function () {
        debugger;
        //validation and add order items
        var isAllValid = true;
        Mode = 0;
        ApplyType = $("#ddlapply option:selected").text();
        PlanType = $("#ddlplantype option:selected").text();
        ApplyID = $("#ddlapply").val();
        ImRemarks = $('#txtItemRemarks').val();
        loadcolor();
        loadsize();

        $("#lblhead").html(PlanType + ' - ' + ApplyType);

        $("#btnUpdate").hide();
        $("#btnDelete").hide();
        $("#btnAdd").show();
        $("#btnAdd").attr("disabled", false);
        $("#ddltoarriveqty").val(1);
        $('#ddlsizedet').empty();
        $('#ddlcolordet').empty();
        $('#txtallow').val(0);

        //Item duplication checking
        var duplicateitem = false;
        for (var i = 0; i < ComboMainGrid.length; i++) {
            if (ComboMainGrid[i].ItemId == $('#ddlitemvar').val() && ComboMainGrid[i].PlanType == PlanType && ComboMainGrid[i].Apply == ApplyType) {
                duplicateitem = true;
                alert("Cannot make entries with the same item " + $("#ddlitemvar option:selected").text());
            }
        }

        if (comboItemList.length > 0) {
            comboItemList = [];
        }

        combocoltmplst = [];
        comboColorList = [];
        comboSizeList = [];
        combosiztmplst = [];
        comboStyleList = [];
        combostytmplst = [];
        comboShipList = [];
        genautoList = [];
        genmanualList = [];
        genshipmentList = [];
        genshiprowid = 0;

        LoadSizeDDL('#ddlsizedet');
        LoadColorDDL('#ddlcolordet');

        //LoadColorDDL('#ddlprocesscolor');        

        if ($('#ddlitemvar').val() == "0") {
            isAllValid = false;
            $('#ddlitemvar').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#ddlitemvar').siblings('span.error').css('visibility', 'hidden');
        }

        if ($('#ddlplantype').val() == "0") {
            isAllValid = false;
            $('#ddlplantype').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#ddlplantype').siblings('span.error').css('visibility', 'hidden');
        }

        if ($('#ddlapply').val() == "0") {
            isAllValid = false;
            $('#ddlapply').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#ddlapply').siblings('span.error').css('visibility', 'hidden');
        }


        ////Finding the max value of an attribute in an array of objects
        //var max = 0;
        //jQuery.map(comboItemList, function (obj) {

        //    if (obj.itemrowseq > max)
        //        max = obj.itemrowseq;
        //});
        ////End

        //if (itemseq == 0 && comboItemList.length == 0) {
        //    itemseq = 1;
        //}
        //else {
        //    itemseq = max + 1//comboItemList.length+1;
        //}

        if (isAllValid && duplicateitem == false) {
            if (isAllValid) {
                $('#myModal1').modal('show');

                if (PlanType == "General") {
                    LoadColorDDL('#ddlgenreqcolor');
                    LoadSizeDDL('#ddlgenreqsize');
                }

                debugger;
                var ItemListObj = {
                    AccReqMasID: 0,
                    //itemrowseq: itemseq,
                    ItemName: $("#ddlitemvar option:selected").text(),
                    ItemId: $('#ddlitemvar').val(),
                    quantity: $('#txtqty').val(),
                    Unitid: $('#txtuomid').val(),
                    UOM: $('#txtuom').val(),
                    PlanType: $("#ddlplantype option:selected").text(),
                    Type: $('#ddlplantype').val(),
                    Apply: $("#ddlapply option:selected").text(),
                    ApplyID: $('#ddlapply').val(),
                    DivMul: $("#ddltoarriveqty option:selected").text(),
                    AutoOrMan: $('#ddlapply').val(),
                    ProdOrOrd: "P",
                    ItemRemarks: ImRemarks,
                    AddDate: new Date(),
                    LockRow: "Y",
                    Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
                };
                //var itmid = $('#ddlitemvar').val();            
                $('#txtHItemId').val(QryItemId);

                var GItemId = $('#txtHItemId').val();
                var AItemId = $('#ddlitemvar').val();

                //Let Check the Duplicate item
                var PType = 0;
                var AType = 0;
                if (PlanType == "General") {
                    PType = "4";
                } else if (PlanType == "Color") {
                    PType = "1";
                } else if (PlanType == "Size") {
                    PType = "2";
                } else if (PlanType == "Style") {
                    PType = "3";
                }

                if (ApplyType == "Auto") {
                    AType = "A";
                } else if (ApplyType == "Manual") {
                    AType = "M";
                }


                //CheckDuplicateItem(GItemId, AItemId, PType, AType);


                var comnam = [];
                //var piec = [];
                for (var d = 0; d < comboItemList.length; d++) {
                    comnam.push(comboItemList[d].ItemId + ',' + comboItemList[d].Type);
                    //piec.push(comboList[d].ColorRatio);
                }

                //Check Duplication of Same Combo should not comes
                //if (GuomConversion == 1) {
                comnam = $.unique(comnam);
                comnam.sort().join(",");
                if ((comnam.length) == (comboItemList.length - 1)) {
                    comboItemList.pop(ItemListObj);
                    result.pop(ItemListObj);
                    alert('Duplicate Item...');
                    return true;
                }
            }

            comboItemList.push(ItemListObj);
            PlanType = $("#ddlplantype option:selected").text();
            LoadInnerGrid(PlanType);
            //loadItemTable(comboItemList);


            var ItemNametxt = $("#ddlitemvar option:selected").text();
            Itemid = $('#ddlitemvar').val();
            $('#txtitemdis').val(ItemNametxt);
            //clear select data
            //$('#tblsizedetails').DataTable().destroy();
            $('#ddlitemvar').val('0');
            $('#ddlapply').val('0');
            $('#ddlplantype').val('0');
            $('#txtqty').val('');
            $('#txtuom').val('');
            $('#txtItemRemarks').val('');
        }
    });

    $(document).on('click', '.btnremove', function () {
        if (PlanType == 'General' && ApplyType == 'Auto') {
            var table = $('#tblgeneraldetails').DataTable();

            rowid = table.row($(this).parents('tr')).data()["Sno"];

            genautoList = $.grep(genautoList, function (v) {
                return (v.Sno != rowid);
            });
            loadGenAuto(genautoList);
        }
    });

    $(document).on('click', '.btnrowdelete', function () {
        debugger;
        loadsize();
        loadcolor();
        Mode = 2;
        $("#btnDelete").attr("disabled", false);

        var table = $('#tblshipmentdetails').DataTable();
        Itemid = table.row($(this).parents('tr')).data()["ItemId"];
        EditItemName = table.row($(this).parents('tr')).data()["ItemName"];
        accreqmasid = table.row($(this).parents('tr')).data()["AccReqMasID"];
        ApplyID = table.row($(this).parents('tr')).data()["ApplyID"];
        ApplyType = table.row($(this).parents('tr')).data()["Apply"];
        Editunitid = table.row($(this).parents('tr')).data()["Unitid"];
        PlanType = table.row($(this).parents('tr')).data()["PlanType"];
        ImRemarks = table.row($(this).parents('tr')).data()["ItemRemarks"];

        //var table = $('#tblshipmentdetails').DataTable();
        //itemid = table.row($(this).parents('tr')).data()["ItemId"];
        //accreqmasid = table.row($(this).parents('tr')).data()["AccReqMasID"];
        //ApplyID = table.row($(this).parents('tr')).data()["ApplyID"];
        //PlanType = table.row($(this).parents('tr')).data()["PlanType"]; 

        //Sorting by
        ComboMainGrid.sort(function (a, b) {
            return a.Sno - b.Sno
        })

        rowindex = $(this).closest('tr').index();

        var currentrowsel = ComboMainGrid.slice(rowindex);
        //PlanType = currentrowsel[0]["PlanType"];

        $("#btnDelete").show();
        $("#btnUpdate").hide();
        $("#btnAdd").hide();

        IDonEditDelMode = currentrowsel[0]["AccReqMasID"];
        if (PlanType == "Size" || PlanType == "Style") {
            $('#txtHItemId').val(currentrowsel[0]["ItemId"]);//QryItemId
            $('#txtitemdis').val(currentrowsel[0]["ItemName"]);
        }
        else if (PlanType == "Color") {
            $('#txtHItemId').val(currentrowsel[0]["ItemId"]);
            $('#txtitemdis').val(currentrowsel[0]["ItemName"]);
        }
        //$('#txtHItemId').val(currentrowsel[0]["ItemId"]);
        //$('#txtitemdis').val(currentrowsel[0]["ItemName"]);
        $("#lblhead").html(PlanType + ' - ' + ApplyType);

        if (PlanType == "Color") {
            LoadInnerGrid("Color");
        }
        else if (PlanType == "Size") {
            LoadInnerGrid("Size");
        }
        else if (PlanType == "Style") {
            LoadInnerGrid("Style");
        }
        else if (PlanType == "General") {
            LoadInnerGrid("General");
        }
    });

    $(document).on('click', '.btnrowedit', function () {
        debugger;
        loadsize();
        loadcolor();
        Mode = 1;
        $("#btnUpdate").attr("disabled", false);
        var table = $('#tblshipmentdetails').DataTable();
        Itemid = table.row($(this).parents('tr')).data()["ItemId"];
        EditItemName = table.row($(this).parents('tr')).data()["ItemName"];
        accreqmasid = table.row($(this).parents('tr')).data()["AccReqMasID"];
        ApplyID = table.row($(this).parents('tr')).data()["ApplyID"];
        ApplyType = table.row($(this).parents('tr')).data()["Apply"];
        Editunitid = table.row($(this).parents('tr')).data()["Unitid"];
        PlanType = table.row($(this).parents('tr')).data()["PlanType"];
        ImRemarks = table.row($(this).parents('tr')).data()["ItemRemarks"];
        //PlanTypeId = table.row($(this).parents('tr')).data()["Type"];

        comboColorList = [];
        comboSizeList = [];
        comboStyleList = [];
        comboShipList = [];
        genautoList = [];
        genmanualList = [];
        genshipmentList = [];

        //Sorting by AccReqMasID
        ComboMainGrid.sort(function (a, b) {
            return a.Sno - b.Sno
        });

        //rowindex = $(this).closest('tr').index();
        //var currentrowsel = ComboMainGrid.slice(rowindex);
        ////PlanType = currentrowsel[0]["PlanType"];
        //ApplyID = currentrowsel[0]["ApplyID"];
        //Apply = currentrowsel[0]["Apply"];
        $("#lblhead").html(PlanType + ' - ' + ApplyType);

        $("#btnUpdate").show();
        $("#btnDelete").hide();
        $("#btnAdd").hide();

        IDonEditDelMode = accreqmasid;//currentrowsel[0]["AccReqMasID"];
        if (PlanType == "Size" || PlanType == "Style") {
            $('#txtHItemId').val(Itemid);
            $('#txtitemdis').val(EditItemName);//currentrowsel[0]["ItemName"]
        }
        else if (PlanType == "Color") {
            $('#txtHItemId').val(Itemid);//currentrowsel[0]["ItemId"]
            $('#txtitemdis').val(EditItemName);//currentrowsel[0]["ItemName"]
        }

        if (PlanType == "Color") {
            LoadInnerGrid("Color");
            //$("#tblsizedetails").css('visibility', 'hidden');
            //$("#tblcolordet").css('visibility', 'visible');

            //$("#lblsize").css('display', 'block');
            //$("#ddlsizedet").css('display', 'block');

            //$("#lblcolor").css('display', 'none');
            //$("#ddlcolordet").css('display', 'none');

            //$.ajax({
            //    url: "/Trims/GetAccReqDet/" + ID,
            //    type: "GET",
            //    contentType: "application/json;charset=utf-8",
            //    dataType: "json",
            //    success: function (result) {
            //        debugger;

            //        comboColorList = result.Value;

            //        if (comboColorList.length > 0 && comboColorList != undefined) {

            //            var outputcount = 0;
            //            $('#tblcolordet tr').each(function () {
            //                outputcount++;
            //            });

            //            if (outputcount > 0) {
            //                $('#tblcolordet').DataTable().destroy();                            
            //            }

            //            $('#tblcolordet').DataTable({
            //                data: comboColorList,
            //                columns: [
            //                    { title: "ColorId", data: "GarColorID", "visible": false },
            //                    { title: "Color", data: "Color" },
            //                    { title: "Quantity", data: "GarQty" },
            //                    { title: "Req.Color", data: "Color" },
            //                    {
            //                        title: "Process Color", data: "ProcessColor"
            //                        //render: function (type, row) {
            //                        //    return '<select id="ddlprocecolor" class="form-control" style="width: 100px;"/></select>';
            //                        //}
            //                    },
            //                    {
            //                        title: "Qty / Unit", data: "QtyPerPiece",
            //                        //render: function (data) {
            //                        //    return '<input type="text" id="txtqunit" class="editor-active"  style="width: 50px;text-align: center;" value=' + data + ' >';
            //                        //},
            //                    },
            //                    {
            //                        title: "Req. Qty", data: "TotalQty",
            //                        //render: function (data) {
            //                        //    return '<input type="text" id="txtReqQty" class="editor-active"  style="width: 50px;text-align: center;" value=' + data + ' >';
            //                        //},
            //                    },
            //                    {
            //                        title: "Process Qty", data: "PQty",
            //                        //render: function (data) {

            //                        //    return '<input type="text" id="txtproqty" class="editor-active"  style="width: 50px;text-align: center;" value=' + data + ' >';
            //                        //},
            //                    },
            //                    {
            //                        title: "ACTION", "mDataProp": null,
            //                        "sDefaultContent": '<button type="button" class="btn btn-round btn-success" data-toggle="tooltip" data-placement="top" title="Submit" style="width: 25px;padding:0px;" disabled="disabled"> <i class="fa fa-check"></i></button>'
            //                    }
            //                         //{
            //                         //    title: "Action", "mDataProp": null,
            //                         //    "sDefaultContent": '<button type="button" class="btnedit"> Edit </button> <a id=" 1 " onclick="return DeleteChild(this)" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="1"><i class="fa fa-trash-o" style="cursor: pointer;"></i></a>'
            //                         //    //"sDefaultContent": '<button type="button" class="btnshipedit"> Edit </button><button type="button" class="btnshipView"> View Item </button>'//<button type="button" class="btnremove"> Remove </button><i class="fa fa-trash-o" style="cursor: pointer;"></i></a>
            //                         //},
            //                ]
            //            });
            //        }
            //    },
            //    error: function (errormessage) {
            //        alert(errormessage.responseText);
            //    }
            //});
        }
        else if (PlanType == "Size") {
            LoadInnerGrid("Size");
        }
        else if (PlanType == "Style") {
            LoadInnerGrid("Style");
        }
            //else if (currentrowsel[0]["PlanType"] == "General") {
        else if (PlanType == "General") {
            LoadInnerGrid("General");
        }
    });

    $(document).on('click', '.btnitemremove', function () {
        rowindex = $(this).closest('tr').index();
        comboItemList.splice(rowindex, 1);
        document.getElementById("tblshipmentdetails").deleteRow(rowindex + 1);
    });

    $(document).on('click', '.btnrowadd', function () {
        debugger;
        //clearTextBox();
        rowindex = $(this).closest('tr').index();

        var currentrowsel = comboItemList.slice(rowindex);
        PlanType = currentrowsel[0]["PlanType"];

        var ItemNametxt = currentrowsel[0]["ItemName"];
        Itemid = currentrowsel[0]["ItemId"];
        $('#txtitemdis').val(ItemNametxt);
        //$('#txtitemidaccmas').val(Itemid);
        LoadInnerGrid(PlanType);

    });
});

function LoadFill() {
    debugger;
    LoadingSymb();
    if (ApplyType == "Auto" && PlanType == "Color") {
        var qtyun = 0;

        $.each(comboColorList, function () {
            if (this.Sno == Fillid) {
                qtyun = this.QUnit;
            }
        });
        for (var i in comboColorList) {
            comboColorList[i].QUnit = qtyun;
            var qt = comboColorList[i].Qty;
            var req = parseFloat(qtyun) * parseFloat(qt);
            req = req.toFixed(0);
            comboColorList[i].ReqQty = req;
        }
        fnArriveCalc();
    }
    if (ApplyType == "Manual" && PlanType == "Color") {
        var qtyun = 0;

        $.each(comboColorList, function () {
            if (this.Sno == Fillid) {
                qtyun = this.ReqQty;
            }
        });
        for (var i in comboColorList) {
            comboColorList[i].ReqQty = qtyun;
        }
        fnArriveCalc();
    }
    if (ApplyType == "Auto" && PlanType == "Size") {
        var qtyun = 0;

        $.each(comboSizeList, function () {
            if (this.Sno == Fillid) {
                qtyun = this.QUnit;
            }
        });
        for (var i in comboSizeList) {
            comboSizeList[i].QUnit = qtyun;
            var qt = comboSizeList[i].Qty;
            var req = parseFloat(qtyun) * parseFloat(qt);
            req = req.toFixed(0);
            comboSizeList[i].ReqQty = req;
        }
        fnArriveCalc();
    }
    if (ApplyType == "Manual" && PlanType == "Size") {
        var qtyun = 0;

        $.each(comboSizeList, function () {
            if (this.Sno == Fillid) {
                qtyun = this.ReqQty;
            }
        });
        for (var i in comboSizeList) {
            comboSizeList[i].ReqQty = qtyun;
        }
        fnArriveCalc();
    }
    if (ApplyType == "Auto" && PlanType == "Style") {
        var qtyun = 0;

        $.each(comboStyleList, function () {
            if (this.Sno == Fillid) {
                qtyun = this.QUnit;
            }
        });
        for (var i in comboStyleList) {
            comboStyleList[i].QUnit = qtyun;
            var qt = comboStyleList[i].Qty;
            var req = parseFloat(qtyun) * parseFloat(qt);
            req = req.toFixed(0);
            comboStyleList[i].ReqQty = req;
        }
        fnArriveCalc();
    }
    if (ApplyType == "Manual" && PlanType == "Style") {
        var qtyun = 0;

        $.each(comboStyleList, function () {
            if (this.Sno == Fillid) {
                qtyun = this.ReqQty;
            }
        });
        for (var i in comboStyleList) {
            comboStyleList[i].ReqQty = qtyun;
        }
        fnArriveCalc();
    }
}

function qtyValidation(qtylist, ApplyType, currqty) {
    var garqty = 0;
    var qtyperpiece = 0;
    var cond = false;

    if (qtylist != null) {
        if (ApplyType == "Auto") {
            for (var f = 0; f < qtylist.length; f++) {
                garqty = qtylist[f].GarQty;
                if (qtyperpiece == 0) {
                    qtyperpiece = parseInt(qtylist[f].QtyPerPiece);
                }
                else {
                    qtyperpiece = (qtyperpiece + parseInt(qtylist[f].QtyPerPiece));
                }
                //comboColorList[f].PColor = Pclr;
            }
        }
        else if (ApplyType == "Manual") {
            for (var f = 0; f < qtylist.length; f++) {
                garqty = qtylist[f].GarQty;
                if (qtyperpiece == 0) {
                    qtyperpiece = parseInt(qtylist[f].TotQty);
                }
                else {
                    qtyperpiece = (qtyperpiece + parseInt(qtylist[f].TotQty));
                }
            }
        }
    }
    var perpiece = parseInt(qtyperpiece);
    var garq = parseInt(garqty);

    if (perpiece > garq) {
        return true;
    }
    else {
        return false;
    }

}


function array_move(arr, old_index, new_index) {
    //Binding Dropdown in grid
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
};


function loadGenAuto(genautoList) {
    $('#tblgeneraldetails').DataTable().destroy();
    debugger;
    $('#tblgeneraldetails').DataTable({
        data: genautoList,
        scrollY: 300,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        columns: [
            { title: "RecId", data: "Sno", "visible": false },
            { title: "Colorid", data: "ColorId", "visible": false },
            { title: "Sizeid", data: "SizeId", "visible": false },
             { title: "uomid", data: "UomId", "visible": false },
            { title: "Req Color", data: "ColorName" },
            { title: "Req Size", data: "SizeName" },
             { title: "Qty/Unit", data: "QtyPerPiece" },
              //{ title: "Req Qty", data: "TotQty" },
              { title: "Req Qty", data: "TotQty" },
               { title: "UOM", data: "UomName" },
               {
                   title: "ACTION", "mDataProp": null,
                   //"sDefaultContent": '<button type="button" class="btnedit"> Edit </button> <a id=" 1 " onclick="return DeleteChild(this)" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="1"><i class="fa fa-trash-o" style="cursor: pointer;"></i></a>'
                   "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnremove btn btn-danger btn-round"> <i class="fa fa-times"></i> </button><i class="fa fa-trash-o" style="cursor: pointer;display:none;"></i></a>'//<button type="button" class="btnsizeview"> View Color </button>
               }
        ]
    });
}

function calval() {
    var allowcal = $('#txtallow').val();

    if ($("#optinnqty").is(":checked")) {
        if (PlanType == "General") {
            var qtyunit = $("#txtqtyunit").val();
            var orderqty = $("#txtordqtydet").val();
            var arrive = $('#ddltoarriveqty').val();
            var calc = 0;

            if (arrive == 1) {
                calc = orderqty * qtyunit;
            }
            else if (arrive == 2) {
                calc = orderqty / qtyunit;
            }

            var perval = calc * allowcal / 100;
            if (allowcal > 0) {
                calc = (calc + perval);
            }

            $("#txtgenreqqty").val(Math.ceil(calc));
        }
    }
    else if ($("#optinnprod").is(":checked")) {
        if (PlanType == "General") {
            var qtyunit = $("#txtqtyunit").val();
            var prodqty = $("#txtprodqtydet").val();
            var calc = qtyunit * prodqty;
            var arrive = $('#ddltoarriveqty').val();
            var calc = 0;

            if (arrive == 1) {
                calc = prodqty * qtyunit;
            }
            else if (arrive == 2) {
                calc = prodqty / qtyunit;
            }

            var perval = calc * allowcal / 100;

            if (allowcal > 0) {
                calc = (calc + perval);
            }
            $("#txtgenreqqty").val(Math.ceil(calc));
        }
    }
}

function calcchange() {
    debugger;
    var txt;
    var r = confirm("Changing Qty. Type will Reset the values you have Entered...Do you want to Continue ?");
    if (r == true) {
        if (PlanType == "General" && (ApplyType == "Auto" || ApplyType == "Shipment")) {
            if ($("#optinnqty").is(":checked")) {
                $("#optinnqty").prop("checked", true);
                //calval();
                fnArriveCalc();
            }
            else if ($("#optinnprod").is(":checked")) {
                $("#optinnprod").prop("checked", true);
                //calval();
                fnArriveCalc();
            }
        }
        else if (PlanType == "Color" && (ApplyType == "Auto" || ApplyType == "Shipment")) {
            if ($("#optinnqty").is(":checked")) {
                $("#optinnqty").prop("checked", true);
                //var combocoltmplst = []
                //combocoltmplst = comboColorList;

                //combocoltmplst = $.grep(comboColorList, function (e) {
                //    return e;
                //});
                combocoltmplst = JSON.parse(JSON.stringify(comboColorList));

                for (var f = 0; f < combocoltmplst.length; f++) {
                    combocoltmplst[f].Qty = combocoltmplst[f].Qty;
                    //comboColorList[f].PColor = Pclr;
                }

                if (Mode == 0) {
                    LoadComboColor(combocoltmplst);
                }
                fnColorlst(combocoltmplst);
                //fnArriveCalc();

            }
            else if ($("#optinnprod").is(":checked")) {
                $("#optinnprod").prop("checked", true);
                //var combocoltmplst = []
                //combocoltmplst = comboColorList;

                //combocoltmplst = $.grep(comboColorList, function (e) {
                //    return e;
                //});
                combocoltmplst = JSON.parse(JSON.stringify(comboColorList));

                for (var f = 0; f < combocoltmplst.length; f++) {
                    combocoltmplst[f].Qty = combocoltmplst[f].PQty;
                    //comboColorList[f].PColor = Pclr;
                }

                if (Mode == 0) {
                    LoadComboColor(combocoltmplst);
                }
                fnColorlst(combocoltmplst);
                //fnArriveCalc();
            }
        }
        else if (PlanType == "Size" && (ApplyType == "Auto" || ApplyType == "Shipment")) {
            if ($("#optinnqty").is(":checked")) {
                $("#optinnqty").prop("checked", true);
                //fnArriveCalc();
                combosiztmplst = JSON.parse(JSON.stringify(comboSizeList));

                for (var f = 0; f < combosiztmplst.length; f++) {
                    combosiztmplst[f].Qty = combosiztmplst[f].Qty;
                    //comboColorList[f].PColor = Pclr;
                }

                if (Mode == 0) {
                    LoadComboSize(combosiztmplst);
                }
                fnSizelst(combosiztmplst);
                //if (comboColorList.length > 0 && comboColorList != undefined && comboColorList != null) {

                //}
            }
            else if ($("#optinnprod").is(":checked")) {
                $("#optinnprod").prop("checked", true);
                //fnArriveCalc();
                combosiztmplst = JSON.parse(JSON.stringify(comboSizeList));

                for (var f = 0; f < combosiztmplst.length; f++) {
                    combosiztmplst[f].Qty = combosiztmplst[f].PQty;
                    //comboColorList[f].PColor = Pclr;
                }

                if (Mode == 0) {
                    LoadComboSize(combosiztmplst);
                }
                fnSizelst(combosiztmplst);
            }
        }
        else if (PlanType == "Style" && (ApplyType == "Auto" || ApplyType == "Shipment")) {
            if ($("#optinnqty").is(":checked")) {
                $("#optinnqty").prop("checked", true);
                //fnArriveCalc();
                combostytmplst = JSON.parse(JSON.stringify(comboStyleList));

                for (var f = 0; f < combostytmplst.length; f++) {
                    combostytmplst[f].Qty = combostytmplst[f].Qty;
                    //comboColorList[f].PColor = Pclr;
                }

                if (Mode == 0) {
                    LoadComboStyle(combostytmplst);
                }
                fnStylelst(combostytmplst);

                //if (comboColorList.length > 0 && comboColorList != undefined && comboColorList != null) {

                //}
            }
            else if ($("#optinnprod").is(":checked")) {
                $("#optinnprod").prop("checked", true);
                //fnArriveCalc();
                combostytmplst = JSON.parse(JSON.stringify(comboStyleList));

                for (var f = 0; f < combostytmplst.length; f++) {
                    combostytmplst[f].Qty = combostytmplst[f].ProdQty == undefined ? 0 : combostytmplst[f].ProdQty;
                }

                if (Mode == 0) {
                    LoadComboStyle(combostytmplst);
                }
                fnStylelst(combostytmplst);
            }
        }
        //else {
        //    if ($("#optinnqty").is(":checked")) {
        //        $("#optinnqty").prop("checked", true);
        //        //calval();
        //    }
        //    else if ($("#optinnprod").is(":checked")) {
        //        $("#optinnprod").prop("checked", true);
        //        //calval();
        //    }
        //}
    }
    else {
        if (PlanType == "General") {

            if ($("#optinnqty").is(":checked")) {
                $("#optinnprod").prop("checked", true);
                calval();
            }
            else if ($("#optinnprod").is(":checked")) {
                $("#optinnqty").prop("checked", true);
                calval();
            }
        }
        else {
            if ($("#optinnqty").is(":checked")) {
                //$("#optinnqty").prop("checked", true);
                $("#optinnprod").prop("checked", true);
                //calval();
            }
            else if ($("#optinnprod").is(":checked")) {
                //$("#optinnprod").prop("checked", true);
                $("#optinnqty").prop("checked", true);
                //calval();
            }
        }
    }
}

function fnStylelst(combostytmplst) {
    var allowance = $('#txtallow').val();
    var arrive = $('#ddltoarriveqty').val();
    var prodqty = 0;
    var qtyunit = 0;

    if (combostytmplst.length > 0 && combostytmplst != undefined && combostytmplst != null) {
        if (allowance != "" && arrive == 2 && ApplyID != 2) {
            for (var i = 0; i < combostytmplst.length; i++) {
                var qtyval = combostytmplst[i]["Qty"];
                //var reqval = comboColorList[i]["ReqQty"];
                var reqval = combostytmplst[i]["QUnit"];
                var reqqty = qtyval / reqval;
                var percenval = ((reqqty * allowance) / 100);
                var allowval = (percenval + reqqty);

                //Round Off
                combostytmplst[i]["ReqQty"] = Math.ceil(allowval);
            }
        }
        else if (allowance == "" && arrive == 2 && ApplyID != 2) {
            for (var i = 0; i < combostytmplst.length; i++) {
                var qtyval = combostytmplst[i]["Qty"];
                var reqval = combostytmplst[i]["QUnit"];
                var reqqty = qtyval * reqval;
                //var percenval = ((reqqty * allowance) / 100);
                //var allowval = (percenval + reqqty);

                //Round Off
                combostytmplst[i]["ReqQty"] = Math.ceil(reqqty);
            }
        }
        if (allowance != "" && arrive == 1 && ApplyID != 2) {
            for (var i = 0; i < combostytmplst.length; i++) {
                var qtyval = combostytmplst[i]["Qty"];
                //var reqval = comboColorList[i]["ReqQty"];
                var reqval = combostytmplst[i]["QUnit"];
                var reqqty = qtyval * reqval;
                var percenval = ((reqqty * allowance) / 100);
                var allowval = (percenval + reqqty);

                //Round Off
                combostytmplst[i]["ReqQty"] = Math.ceil(allowval);
            }
        }
        else if (allowance == "" && arrive == 1 && ApplyID != 2) {
            for (var i = 0; i < combostytmplst.length; i++) {
                var qtyval = combostytmplst[i]["Qty"];
                var reqval = combostytmplst[i]["QUnit"];
                var reqqty = qtyval * reqval;
                //var percenval = ((reqqty * allowance) / 100);
                //var allowval = (percenval + reqqty);

                //Round Off
                combostytmplst[i]["ReqQty"] = Math.ceil(reqqty);
            }
        }
        LoadComboStyle(combostytmplst);

        if (ApplyID == 3) {
            chk("Color", "3");
        }
        else if (ApplyID == 2) {
            chk("Color", "2");
        }
        else if (ApplyID == 1) {
            chk("Color", "1");
        }
    }
}

function fnSizelst(combosiztmplst) {
    var allowance = $('#txtallow').val();
    var arrive = $('#ddltoarriveqty').val();
    var prodqty = 0;
    var qtyunit = 0;

    if (combosiztmplst.length > 0 && combosiztmplst != undefined && combosiztmplst != null) {
        if (allowance != "" && arrive == 2 && ApplyID != 2) {
            for (var i = 0; i < combosiztmplst.length; i++) {
                var qtyval = combosiztmplst[i]["Qty"];
                //var reqval = comboColorList[i]["ReqQty"];
                var reqval = combosiztmplst[i]["QUnit"];
                var reqqty = qtyval / reqval;
                var percenval = ((reqqty * allowance) / 100);
                var allowval = (percenval + reqqty);

                //Round Off
                combocoltmplst[i]["ReqQty"] = Math.ceil(allowval);
            }
        }
        else if (allowance == "" && arrive == 2 && ApplyID != 2) {
            for (var i = 0; i < combosiztmplst.length; i++) {
                var qtyval = combosiztmplst[i]["Qty"];
                var reqval = combosiztmplst[i]["QUnit"];
                var reqqty = qtyval * reqval;
                //var percenval = ((reqqty * allowance) / 100);
                //var allowval = (percenval + reqqty);

                //Round Off
                combosiztmplst[i]["ReqQty"] = Math.ceil(reqqty);
            }
        }
        if (allowance != "" && arrive == 1 && ApplyID != 2) {
            for (var i = 0; i < combosiztmplst.length; i++) {
                var qtyval = combosiztmplst[i]["Qty"];
                //var reqval = comboColorList[i]["ReqQty"];
                var reqval = combosiztmplst[i]["QUnit"];
                var reqqty = qtyval * reqval;
                var percenval = ((reqqty * allowance) / 100);
                var allowval = (percenval + reqqty);

                //Round Off
                combosiztmplst[i]["ReqQty"] = Math.ceil(allowval);
            }
        }
        else if (allowance == "" && arrive == 1 && ApplyID != 2) {
            for (var i = 0; i < combosiztmplst.length; i++) {
                var qtyval = combosiztmplst[i]["Qty"];
                var reqval = combosiztmplst[i]["QUnit"];
                var reqqty = qtyval * reqval;
                //var percenval = ((reqqty * allowance) / 100);
                //var allowval = (percenval + reqqty);

                //Round Off
                combosiztmplst[i]["ReqQty"] = Math.ceil(reqqty);
            }
        }
        LoadComboSize(combosiztmplst);

        if (ApplyID == 3) {
            chk("Color", "3");
        }
        else if (ApplyID == 2) {
            chk("Color", "2");
        }
        else if (ApplyID == 1) {
            chk("Color", "1");
        }
    }
}

function fnColorlst(combocoltmplst) {
    var allowance = $('#txtallow').val();
    var arrive = $('#ddltoarriveqty').val();
    var prodqty = 0;
    var qtyunit = 0;

    if (combocoltmplst.length > 0 && combocoltmplst != undefined && combocoltmplst != null) {
        if (allowance != "" && arrive == 2 && ApplyID != 2) {
            for (var i = 0; i < combocoltmplst.length; i++) {
                var qtyval = combocoltmplst[i]["Qty"];
                //var reqval = comboColorList[i]["ReqQty"];
                var reqval = combocoltmplst[i]["QUnit"];
                var reqqty = qtyval / reqval;
                var percenval = ((reqqty * allowance) / 100);
                var allowval = (percenval + reqqty);

                //Round Off
                combocoltmplst[i]["ReqQty"] = Math.ceil(allowval);
            }
        }
        else if (allowance == "" && arrive == 2 && ApplyID != 2) {
            for (var i = 0; i < combocoltmplst.length; i++) {
                var qtyval = combocoltmplst[i]["Qty"];
                var reqval = combocoltmplst[i]["QUnit"];
                var reqqty = qtyval * reqval;
                //var percenval = ((reqqty * allowance) / 100);
                //var allowval = (percenval + reqqty);

                //Round Off
                combocoltmplst[i]["ReqQty"] = Math.ceil(reqqty);
            }
        }
        if (allowance != "" && arrive == 1 && ApplyID != 2) {
            for (var i = 0; i < combocoltmplst.length; i++) {
                var qtyval = combocoltmplst[i]["Qty"];
                //var reqval = comboColorList[i]["ReqQty"];
                var reqval = combocoltmplst[i]["QUnit"];
                var reqqty = qtyval * reqval;
                var percenval = ((reqqty * allowance) / 100);
                var allowval = (percenval + reqqty);

                //Round Off
                combocoltmplst[i]["ReqQty"] = Math.ceil(allowval);
            }
        }
        else if (allowance == "" && arrive == 1 && ApplyID != 2) {
            for (var i = 0; i < combocoltmplst.length; i++) {
                var qtyval = combocoltmplst[i]["Qty"];
                var reqval = combocoltmplst[i]["QUnit"];
                var reqqty = qtyval * reqval;
                //var percenval = ((reqqty * allowance) / 100);
                //var allowval = (percenval + reqqty);

                //Round Off
                combocoltmplst[i]["ReqQty"] = Math.ceil(reqqty);
            }
        }
        LoadComboColor(combocoltmplst);
        //comboColorList = combocoltmplst;

        if (ApplyID == 3) {
            chk("Color", "3");
        }
        else if (ApplyID == 2) {
            chk("Color", "2");
        }
        else if (ApplyID == 1) {
            chk("Color", "1");
        }
    }
}

function fnqtychange() {
    if ($("#optinnqty").is(":checked")) {
        if (comboColorList.length > 0 && comboColorList != undefined && comboColorList != null) {
        }
        else if (comboSizeList.length > 0 && comboSizeList != undefined && comboSizeList != null) {
        }
        else if (comboStyleList.length > 0 && comboStyleList != undefined && comboStyleList != null) {
        }
        else if (genautoList.length > 0 && genautoList != undefined && genautoList != null) {
        }
        else if (genmanualList.length > 0 && genmanualList != undefined && genmanualList != null) {
        }
    }
    else if ($("#optinnprod").is(":checked")) {
        if (comboColorList.length > 0 && comboColorList != undefined && comboColorList != null) {
        }
        else if (comboSizeList.length > 0 && comboSizeList != undefined && comboSizeList != null) {
        }
        else if (comboStyleList.length > 0 && comboStyleList != undefined && comboStyleList != null) {
        }
        else if (genautoList.length > 0 && genautoList != undefined && genautoList != null) {
        }
        else if (genmanualList.length > 0 && genmanualList != undefined && genmanualList != null) {
        }
    }
}

function fnArriveCalc() {
    var allowance = $('#txtallow').val();
    var arrive = $('#ddltoarriveqty').val();
    var prodqty = 0;
    var qtyunit = 0;

    if ($("#optinnqty").is(":checked")) {
        if (PlanType == "General") {
            orderqty = $("#txtordqtydet").val();
        }
    }
    else if ($("#optinnprod").is(":checked")) {
        if (PlanType == "General") {
            orderqty = $("#txtprodqtydet").val();
        }
    }

    if (combocoltmplst.length > 0 && combocoltmplst != undefined && combocoltmplst != null) {
        if (allowance != "" && arrive == 2 && ApplyID != 2) {
            for (var i = 0; i < combocoltmplst.length; i++) {
                var qtyval = combocoltmplst[i]["Qty"];
                //var reqval = comboColorList[i]["ReqQty"];
                var reqval = combocoltmplst[i]["QUnit"];
                if (reqval == ".") { reqval = 0; }
                var reqqty = (qtyval == 0 ? 0 : qtyval) / (reqval == 0 ? 0 : reqval);
                var percenval = ((reqqty * allowance) / 100);
                var allowval = (percenval + reqqty);

                //Round Off
                combocoltmplst[i]["ReqQty"] = Math.ceil(allowval);
            }
        }
        else if (allowance == "" && arrive == 2 && ApplyID != 2) {
            for (var i = 0; i < combocoltmplst.length; i++) {
                var qtyval = combocoltmplst[i]["Qty"];
                var reqval = combocoltmplst[i]["QUnit"];
                if (reqval == ".") { reqval = 0; }
                var reqqty = (qtyval == 0 ? 0 : qtyval) * (reqval == 0 ? 0 : reqval);
                //var percenval = ((reqqty * allowance) / 100);
                //var allowval = (percenval + reqqty);

                //Round Off
                combocoltmplst[i]["ReqQty"] = Math.ceil(reqqty);
            }
        }
        if (allowance != "" && arrive == 1 && ApplyID != 2) {
            for (var i = 0; i < combocoltmplst.length; i++) {
                var qtyval = combocoltmplst[i]["Qty"];
                //var reqval = comboColorList[i]["ReqQty"];
                var reqval = combocoltmplst[i]["QUnit"];
                if (reqval == ".") { reqval = 0; }
                var reqqty = (qtyval == 0 ? 0 : qtyval) * (reqval == 0 ? 0 : reqval);
                var percenval = ((reqqty * allowance) / 100);
                var allowval = (percenval + reqqty);

                //Round Off
                combocoltmplst[i]["ReqQty"] = Math.ceil(allowval);
            }
        }
        else if (allowance == "" && arrive == 1 && ApplyID != 2) {
            for (var i = 0; i < combocoltmplst.length; i++) {
                var qtyval = combocoltmplst[i]["Qty"];
                var reqval = combocoltmplst[i]["QUnit"];
                if (reqval == ".") { reqval = 0; }
                var reqqty = (qtyval == 0 ? 0 : qtyval) * (reqval == 0 ? 0 : reqval);
                //var percenval = ((reqqty * allowance) / 100);
                //var allowval = (percenval + reqqty);

                //Round Off
                combocoltmplst[i]["ReqQty"] = Math.ceil(reqqty);
            }
        }

        if (ApplyID == 3) {
            var matchingItems = $.grep(combocoltmplst, function (item) {
                return item.ShipRowId == shiprowid;
            });

            LoadComboColor(matchingItems);
        }
        else {
            LoadComboColor(combocoltmplst);
        }

        if (ApplyID == 3) {
            chk("Color", "3");
        }
        else if (ApplyID == 2) {
            chk("Color", "2");
        }
        else if (ApplyID == 1) {
            chk("Color", "1");
        }

        //if (ApplyType == "Shipment") {
        //    chk("Color", "3");
        //}
        //else if (ApplyType == "Manual") {
        //    chk("Color", "2");
        //}
        //else if (ApplyType == "Auto") {
        //    chk("Color", "1");
        //}
    }
    else if (comboColorList.length > 0 && comboColorList != undefined && comboColorList != null) {
        if (allowance != "" && arrive == 2 && ApplyID != 2) {
            for (var i = 0; i < comboColorList.length; i++) {
                var qtyval = comboColorList[i]["Qty"];
                //var reqval = comboColorList[i]["ReqQty"];
                var reqval = comboColorList[i]["QUnit"];
                if (reqval == ".") { reqval = 0; }
                var reqqty = (qtyval == 0 ? 0 : qtyval) / (reqval == 0 ? 0 : reqval);

                if (isFinite(reqqty) == false) {
                    reqqty = 0;
                }

                var percenval = ((reqqty * allowance) / 100);
                var allowval = (percenval + reqqty);

                //Round Off
                comboColorList[i]["ReqQty"] = Math.ceil(allowval);
            }
        }
        else if (allowance == "" && arrive == 2 && ApplyID != 2) {
            for (var i = 0; i < comboColorList.length; i++) {
                var qtyval = comboColorList[i]["Qty"];
                var reqval = comboColorList[i]["QUnit"];
                if (reqval == ".") { reqval = 0; }
                var reqqty = (qtyval == 0 ? 0 : qtyval) * (reqval == 0 ? 0 : reqval);
                //var percenval = ((reqqty * allowance) / 100);
                //var allowval = (percenval + reqqty);

                //Round Off
                comboColorList[i]["ReqQty"] = Math.ceil(reqqty);
            }
        }
        if (allowance != "" && arrive == 1 && ApplyID != 2) {
            for (var i = 0; i < comboColorList.length; i++) {
                var qtyval = comboColorList[i]["Qty"];
                //var reqval = comboColorList[i]["ReqQty"];
                var reqval = comboColorList[i]["QUnit"];
                //var flg = 0;
                if (reqval == ".") { reqval = 0; } //else { reqval > 0 }
                var reqqty = (qtyval == 0 ? 0 : qtyval) * (reqval == 0 ? 0 : reqval);
                var percenval = ((reqqty * allowance) / 100);
                var allowval = (percenval + reqqty);

                //Round Off
                comboColorList[i]["ReqQty"] = Math.ceil(allowval);
            }
        }
        else if (allowance == "" && arrive == 1 && ApplyID != 2) {
            for (var i = 0; i < comboColorList.length; i++) {
                var qtyval = comboColorList[i]["Qty"];
                var reqval = comboColorList[i]["QUnit"];
                if (reqval == ".") { reqval = 0; }
                var reqqty = (qtyval == 0 ? 0 : qtyval) * (reqval == 0 ? 0 : reqval);
                //var percenval = ((reqqty * allowance) / 100);
                //var allowval = (percenval + reqqty);

                //Round Off
                comboColorList[i]["ReqQty"] = Math.ceil(reqqty);
            }
        }

        if (ApplyID == 3) {
            var matchingItems = $.grep(comboColorList, function (item) {
                return item.ShipRowId == shiprowid;
            });

            LoadComboColor(matchingItems);
        }
        else {
            LoadComboColor(comboColorList);
        }

        if (ApplyID == 3) {
            chk("Color", "3");
        }
        else if (ApplyID == 2) {
            chk("Color", "2");
        }
        else if (ApplyID == 1) {
            chk("Color", "1");
        }
    }

    if (combosiztmplst.length > 0 && combosiztmplst != undefined && combosiztmplst != null) {
        if (allowance != "" && arrive == 2 && ApplyID != 2) {
            for (var i = 0; i < combosiztmplst.length; i++) {
                var qtyval = combosiztmplst[i]["Qty"];
                //var reqval = comboColorList[i]["ReqQty"];
                var reqval = combosiztmplst[i]["QUnit"];
                if (reqval == ".") { reqval = 0; }
                var reqqty = (qtyval == 0 ? 0 : qtyval) / (reqval == 0 ? 0 : reqval);

                //Handling Infinity
                if (isFinite(reqqty) == false) {
                    reqqty = 0;
                }

                var percenval = ((reqqty * allowance) / 100);
                var allowval = (percenval + reqqty);

                //Round Off
                combosiztmplst[i]["ReqQty"] = Math.ceil(allowval);
            }
        }
        else if (allowance == "" && arrive == 2 && ApplyID != 2) {
            for (var i = 0; i < combosiztmplst.length; i++) {
                var qtyval = combosiztmplst[i]["Qty"];
                var reqval = combosiztmplst[i]["QUnit"];
                if (reqval == ".") { reqval = 0; }
                var reqqty = (qtyval == 0 ? 0 : qtyval) * (reqval == 0 ? 0 : reqval);
                //var percenval = ((reqqty * allowance) / 100);
                //var allowval = (percenval + reqqty);

                //Round Off
                combosiztmplst[i]["ReqQty"] = Math.ceil(reqqty);
            }
        }
        if (allowance != "" && arrive == 1 && ApplyID != 2) {
            for (var i = 0; i < combosiztmplst.length; i++) {
                var qtyval = combosiztmplst[i]["Qty"];
                //var reqval = comboColorList[i]["ReqQty"];
                var reqval = combosiztmplst[i]["QUnit"];
                if (reqval == ".") { reqval = 0; }
                var reqqty = (qtyval == 0 ? 0 : qtyval) * (reqval == 0 ? 0 : reqval);
                var percenval = ((reqqty * allowance) / 100);
                var allowval = (percenval + reqqty);

                //Round Off
                combosiztmplst[i]["ReqQty"] = Math.ceil(allowval);
            }
        }
        else if (allowance == "" && arrive == 1 && ApplyID != 2) {
            for (var i = 0; i < combosiztmplst.length; i++) {
                var qtyval = combosiztmplst[i]["Qty"];
                var reqval = combosiztmplst[i]["QUnit"];
                if (reqval == ".") { reqval = 0; }
                var reqqty = (qtyval == 0 ? 0 : qtyval) * (reqval == 0 ? 0 : reqval);
                //var percenval = ((reqqty * allowance) / 100);
                //var allowval = (percenval + reqqty);

                //Round Off
                combosiztmplst[i]["ReqQty"] = Math.ceil(reqqty);
            }
        }

        if (ApplyID == 3) {
            var matchingItems = $.grep(combosiztmplst, function (item) {
                return item.ShipRowId == shiprowid;
            });

            LoadComboSize(matchingItems);
        }
        else {
            LoadComboSize(combosiztmplst);
        }

        if (ApplyID == 3) {
            chk("Size", "3");
        }
        else if (ApplyID == 2) {
            chk("Size", "2");
        }
        else if (ApplyID == 1) {
            chk("Size", "1");
        }
        //LoadComboSize(matchingItems);
        //chk("Size", "3");
    }
    else if (comboSizeList.length > 0 && comboSizeList != undefined && comboSizeList != null) {
        if (allowance != "" && arrive == 2 && ApplyID != 2) {
            for (var i = 0; i < comboSizeList.length; i++) {
                var qtyval = comboSizeList[i]["Qty"];
                //var reqval = comboColorList[i]["ReqQty"];
                var reqval = comboSizeList[i]["QUnit"];
                if (reqval == ".") { reqval = 0; }
                var reqqty = (qtyval == 0 ? 0 : qtyval) / (reqval == 0 ? 0 : reqval);

                //Handling Infinity
                if (isFinite(reqqty) == false) {
                    reqqty = 0;
                }

                var percenval = ((reqqty * allowance) / 100);
                var allowval = (percenval + reqqty);

                //Round Off
                comboSizeList[i]["ReqQty"] = Math.ceil(allowval);
            }
        }
        else if (allowance == "" && arrive == 2 && ApplyID != 2) {
            for (var i = 0; i < comboSizeList.length; i++) {
                var qtyval = comboSizeList[i]["Qty"];
                var reqval = comboSizeList[i]["QUnit"];
                if (reqval == ".") { reqval = 0; }
                var reqqty = (qtyval == 0 ? 0 : qtyval) * (reqval == 0 ? 0 : reqval);
                //var percenval = ((reqqty * allowance) / 100);
                //var allowval = (percenval + reqqty);

                //Round Off
                comboSizeList[i]["ReqQty"] = Math.ceil(reqqty);
            }
        }
        if (allowance != "" && arrive == 1 && ApplyID != 2) {
            for (var i = 0; i < comboSizeList.length; i++) {
                var qtyval = comboSizeList[i]["Qty"];
                //var reqval = comboColorList[i]["ReqQty"];
                var reqval = comboSizeList[i]["QUnit"];
                if (reqval == ".") { reqval = 0; }
                var reqqty = (qtyval == 0 ? 0 : qtyval) * (reqval == 0 ? 0 : reqval);
                var percenval = ((reqqty * allowance) / 100);
                var allowval = (percenval + reqqty);

                //Round Off
                comboSizeList[i]["ReqQty"] = Math.ceil(allowval);
            }
        }
        else if (allowance == "" && arrive == 1 && ApplyID != 2) {
            for (var i = 0; i < comboSizeList.length; i++) {
                var qtyval = comboSizeList[i]["Qty"];
                var reqval = comboSizeList[i]["QUnit"];
                if (reqval == ".") { reqval = 0; }
                var reqqty = (qtyval == 0 ? 0 : qtyval) * (reqval == 0 ? 0 : reqval);
                //var percenval = ((reqqty * allowance) / 100);
                //var allowval = (percenval + reqqty);

                //Round Off
                comboSizeList[i]["ReqQty"] = Math.ceil(reqqty);
            }
        }

        if (ApplyID == 3) {
            var matchingItems = $.grep(comboSizeList, function (item) {
                return item.ShipRowId == shiprowid;
            });

            LoadComboSize(matchingItems);
        }
        else {
            LoadComboSize(comboSizeList);
        }

        if (ApplyID == 3) {
            chk("Size", "3");
        }
        else if (ApplyID == 2) {
            chk("Size", "2");
        }
        else if (ApplyID == 1) {
            chk("Size", "1");
        }
        //LoadComboSize(matchingItems);
        //chk("Size", "3");
    }

    if (combostytmplst.length > 0 && combostytmplst != undefined && combostytmplst != null) {
        if (allowance != "" && arrive == 2 && ApplyType != "Manual") {
            for (var i = 0; i < combostytmplst.length; i++) {
                var qtyval = combostytmplst[i]["Qty"];
                //var reqval = comboColorList[i]["ReqQty"];
                var reqval = combostytmplst[i]["QUnit"];
                if (reqval == ".") { reqval = 0; }
                var reqqty = (qtyval == 0 ? 0 : qtyval) / (reqval == 0 ? 0 : reqval);

                //Handling Infinity
                if (isFinite(reqqty) == false) {
                    reqqty = 0;
                }

                var percenval = ((reqqty * allowance) / 100);
                var allowval = (percenval + reqqty);

                //Round Off
                combostytmplst[i]["ReqQty"] = Math.ceil(allowval);
            }
        }
        else if (allowance == "" && arrive == 2 && ApplyType != "Manual") {
            for (var i = 0; i < combostytmplst.length; i++) {
                var qtyval = combostytmplst[i]["Qty"];
                var reqval = combostytmplst[i]["QUnit"];
                if (reqval == ".") { reqval = 0; }
                var reqqty = (qtyval == 0 ? 0 : qtyval) * (reqval == 0 ? 0 : reqval);
                //var percenval = ((reqqty * allowance) / 100);
                //var allowval = (percenval + reqqty);

                //Round Off
                combostytmplst[i]["ReqQty"] = Math.ceil(reqqty);
            }
        }
        if (allowance != "" && arrive == 1 && ApplyType != "Manual") {
            for (var i = 0; i < combostytmplst.length; i++) {
                var qtyval = combostytmplst[i]["Qty"];
                //var reqval = comboColorList[i]["ReqQty"];
                var reqval = combostytmplst[i]["QUnit"];
                if (reqval == ".") { reqval = 0; }
                var reqqty = (qtyval == 0 ? 0 : qtyval) * (reqval == 0 ? 0 : reqval);
                var percenval = ((reqqty * allowance) / 100);
                var allowval = (percenval + reqqty);

                //Round Off
                combostytmplst[i]["ReqQty"] = Math.ceil(allowval);
            }
        }
        else if (allowance == "" && arrive == 1 && ApplyType != "Manual") {
            for (var i = 0; i < combostytmplst.length; i++) {
                var qtyval = combostytmplst[i]["Qty"];
                var reqval = combostytmplst[i]["QUnit"];
                if (reqval == ".") { reqval = 0; }
                var reqqty = (qtyval == 0 ? 0 : qtyval) * (reqval == 0 ? 0 : reqval);
                //var percenval = ((reqqty * allowance) / 100);
                //var allowval = (percenval + reqqty);

                //Round Off
                combostytmplst[i]["ReqQty"] = Math.ceil(reqqty);
            }
        }

        if (ApplyType == "Shipment") {
            var matchingItems = $.grep(combostytmplst, function (item) {
                return item.ShipRowId == shiprowid;
            });

            LoadComboStyle(matchingItems);
        }
        else {
            LoadComboStyle(combostytmplst);
        }

        if (ApplyType == "Shipment") {
            chk("Style", "3");
        }
        else if (ApplyType == "Manual") {
            chk("Style", "2");
        }
        else if (ApplyType == "Auto") {
            chk("Style", "1");
        }
        //LoadComboStyle(matchingItems);
        //chk("Style", "3");
    }
    else if (comboStyleList.length > 0 && comboStyleList != undefined && comboStyleList != null) {
        if (allowance != "" && arrive == 2 && ApplyType != "Manual") {
            for (var i = 0; i < comboStyleList.length; i++) {
                var qtyval = comboStyleList[i]["Qty"];
                //var reqval = comboColorList[i]["ReqQty"];
                var reqval = comboStyleList[i]["QUnit"];
                if (reqval == ".") { reqval = 0; }
                var reqqty = (qtyval == 0 ? 0 : qtyval) / (reqval == 0 ? 0 : reqval);

                //Handling Infinity
                if (isFinite(reqqty) == false) {
                    reqqty = 0;
                }

                var percenval = ((reqqty * allowance) / 100);
                var allowval = (percenval + reqqty);

                //Round Off
                comboStyleList[i]["ReqQty"] = Math.ceil(allowval);
            }
        }
        else if (allowance == "" && arrive == 2 && ApplyType != "Manual") {
            for (var i = 0; i < comboStyleList.length; i++) {
                var qtyval = comboStyleList[i]["Qty"];
                var reqval = comboStyleList[i]["QUnit"];
                if (reqval == ".") { reqval = 0; }
                var reqqty = qtyval * reqval;
                //var percenval = ((reqqty * allowance) / 100);
                //var allowval = (percenval + reqqty);

                //Round Off
                comboStyleList[i]["ReqQty"] = Math.ceil(reqqty);
            }
        }
        if (allowance != "" && arrive == 1 && ApplyType != "Manual") {
            for (var i = 0; i < comboStyleList.length; i++) {
                var qtyval = comboStyleList[i]["Qty"];
                //var reqval = comboColorList[i]["ReqQty"];
                var reqval = comboStyleList[i]["QUnit"];
                if (reqval == ".") { reqval = 0; }
                var reqqty = (qtyval == 0 ? 0 : qtyval) * (reqval == 0 ? 0 : reqval);
                var percenval = ((reqqty * allowance) / 100);
                var allowval = (percenval + reqqty);

                //Round Off
                comboStyleList[i]["ReqQty"] = Math.ceil(allowval);
            }
        }
        else if (allowance == "" && arrive == 1 && ApplyType != "Manual") {
            for (var i = 0; i < comboStyleList.length; i++) {
                var qtyval = comboStyleList[i]["Qty"];
                var reqval = comboStyleList[i]["QUnit"];
                if (reqval == ".") { reqval = 0; }
                var reqqty = (qtyval == 0 ? 0 : qtyval) * (reqval == 0 ? 0 : reqval);
                //var percenval = ((reqqty * allowance) / 100);
                //var allowval = (percenval + reqqty);

                //Round Off
                comboStyleList[i]["ReqQty"] = Math.ceil(reqqty);
            }
        }
        if (ApplyType == "Shipment") {
            var matchingItems = $.grep(comboStyleList, function (item) {
                return item.ShipRowId == shiprowid;
            });

            LoadComboStyle(matchingItems);
        }
        else {
            LoadComboStyle(comboStyleList);
        }

        if (ApplyType == "Shipment") {
            chk("Style", "3");
        }
        else if (ApplyType == "Manual") {
            chk("Style", "2");
        }
        else if (ApplyType == "Auto") {
            chk("Style", "1");
        }
        //LoadComboStyle(matchingItems);
        //chk("Style", "3");
    }

    if (genautoList.length > 0 && genautoList != undefined && genautoList != null) {
        if (allowance != "" && arrive == 2 && ApplyType != "Manual") {
            for (var i = 0; i < genautoList.length; i++) {
                var qtyval = genautoList[i]["QtyPerPiece"];
                //var reqval = comboColorList[i]["ReqQty"];
                var reqval = orderqty;//genautoList[i]["TotQty"];
                var reqqty = (reqval == 0 ? 0 : reqval) / (qtyval == 0 ? 0 : qtyval);

                //Handling Infinity
                if (isFinite(reqqty) == false) {
                    reqqty = 0;
                }

                var percenval = ((reqqty * allowance) / 100);
                var allowval = (percenval + reqqty);

                //Round Off
                genautoList[i]["ReqQty"] = Math.ceil(allowval);
                genautoList[i]["TotQty"] = Math.ceil(allowval);
            }

            if ($("#txtqtyunit").val() > 0) {
                var qtyval = $("#txtqtyunit").val();
                var reqval = orderqty;
                var reqqty = (reqval == 0 ? 0 : reqval) / (qtyval == 0 ? 0 : qtyval);
                //Handling Infinity
                if (isFinite(reqqty) == false) {
                    reqqty = 0;
                }
                var percenval = ((reqqty * allowance) / 100);
                var allowval = (percenval + reqqty);
                $("#txtgenreqqty").val(Math.ceil(allowval));
            }

        }
        else if (allowance == "" && arrive == 2 && ApplyType != "Manual") {
            for (var i = 0; i < genautoList.length; i++) {
                var qtyval = genautoList[i]["QtyPerPiece"];
                var reqval = orderqty;//genautoList[i]["TotQty"];
                var reqqty = (qtyval == 0 ? 0 : qtyval) * (reqval == 0 ? 0 : reqval);
                //var percenval = ((reqqty * allowance) / 100);
                //var allowval = (percenval + reqqty);

                //Round Off
                genautoList[i]["TotQty"] = Math.ceil(reqqty);
            }
        }
        if (allowance != "" && arrive == 1 && ApplyType != "Manual") {
            for (var i = 0; i < genautoList.length; i++) {
                var qtyval = genautoList[i]["QtyPerPiece"];
                //var reqval = comboColorList[i]["ReqQty"];
                var reqval = orderqty;//genautoList[i]["TotQty"];
                var reqqty = (qtyval == 0 ? 0 : qtyval) * (reqval == 0 ? 0 : reqval);
                var percenval = ((reqqty * allowance) / 100);
                var allowval = (percenval + reqqty);

                //Round Off
                genautoList[i]["TotQty"] = Math.ceil(allowval);
            }
        }
        else if (allowance == "" && arrive == 1 && ApplyType != "Manual") {
            for (var i = 0; i < genautoList.length; i++) {
                var qtyval = genautoList[i]["QtyPerPiece"];
                var reqval = orderqty;//genautoList[i]["TotQty"];
                var reqqty = (qtyval == 0 ? 0 : qtyval) * (reqval == 0 ? 0 : reqval);
                //var percenval = ((reqqty * allowance) / 100);
                //var allowval = (percenval + reqqty);

                //Round Off
                genautoList[i]["TotQty"] = Math.ceil(reqqty);
            }
        }

        if (ApplyType == "Shipment") {
            var matchingItems = $.grep(genautoList, function (item) {
                return item.ShipRowId == shiprowid;
            });

            loadGenAuto(matchingItems);
        }
        else {
            loadGenAuto(genautoList);
        }

        if (ApplyType == "Shipment") {
            chk("General", "3");
        }
        else if (ApplyType == "Manual") {
            chk("General", "2");
        }
        else if (ApplyType == "Auto") {
            chk("General", "1");
        }
        //LoadComboStyle(matchingItems);
        //chk("Style", "3");
    }
    else if (genshipmentList.length > 0 && genshipmentList != undefined && genshipmentList != null) {
        if (allowance != "" && arrive == 2 && ApplyType != "Manual") {
            for (var i = 0; i < genshipmentList.length; i++) {
                var qtyval = genshipmentList[i]["QtyPerPiece"];
                //var reqval = comboColorList[i]["ReqQty"];
                var reqval = orderqty;//genautoList[i]["TotQty"];
                var reqqty = (reqval == 0 ? 0 : reqval) / (qtyval == 0 ? 0 : qtyval);

                //Handling Infinity
                if (isFinite(reqqty) == false) {
                    reqqty = 0;
                }

                var percenval = ((reqqty * allowance) / 100);
                var allowval = (percenval + reqqty);

                //Round Off
                genshipmentList[i]["ReqQty"] = Math.ceil(allowval);
            }

            if ($("#txtqtyunit").val() > 0) {
                var qtyval = $("#txtqtyunit").val();
                var reqval = orderqty;
                var reqqty = (reqval == 0 ? 0 : reqval) / (qtyval == 0 ? 0 : qtyval);
                //Handling Infinity
                if (isFinite(reqqty) == false) {
                    reqqty = 0;
                }
                var percenval = ((reqqty * allowance) / 100);
                var allowval = (percenval + reqqty);
                $("#txtgenreqqty").val(Math.ceil(allowval));
            }
        }
        else if (allowance == "" && arrive == 2 && ApplyType != "Manual") {
            for (var i = 0; i < genshipmentList.length; i++) {
                var qtyval = genshipmentList[i]["QtyPerPiece"];
                var reqval = orderqty;//genautoList[i]["TotQty"];
                var reqqty = (qtyval == 0 ? 0 : qtyval) * (reqval == 0 ? 0 : reqval);
                //var percenval = ((reqqty * allowance) / 100);
                //var allowval = (percenval + reqqty);

                //Round Off
                genshipmentList[i]["TotQty"] = Math.ceil(reqqty);
            }
        }
        if (allowance != "" && arrive == 1 && ApplyType != "Manual") {
            for (var i = 0; i < genshipmentList.length; i++) {
                var qtyval = genshipmentList[i]["QtyPerPiece"];
                //var reqval = comboColorList[i]["ReqQty"];
                var reqval = orderqty;//genautoList[i]["TotQty"];
                var reqqty = (qtyval == 0 ? 0 : qtyval) * (reqval == 0 ? 0 : reqval);
                var percenval = ((reqqty * allowance) / 100);
                var allowval = (percenval + reqqty);

                //Round Off
                genshipmentList[i]["TotQty"] = Math.ceil(allowval);
            }
        }
        else if (allowance == "" && arrive == 1 && ApplyType != "Manual") {
            for (var i = 0; i < genshipmentList.length; i++) {
                var qtyval = genshipmentList[i]["QtyPerPiece"];
                var reqval = orderqty;//genautoList[i]["TotQty"];
                var reqqty = (qtyval == 0 ? 0 : qtyval) * (reqval == 0 ? 0 : reqval);
                //var percenval = ((reqqty * allowance) / 100);
                //var allowval = (percenval + reqqty);

                //Round Off
                genshipmentList[i]["TotQty"] = Math.ceil(reqqty);
            }
        }

        if (ApplyType == "Shipment") {
            var matchingItems = $.grep(genshipmentList, function (item) {
                return item.ShipRowId == shiprowid;
            });

            LoadGenShipmentDet(matchingItems);
        }
        else {
            LoadGenShipmentDet(genshipmentList);
        }

        if (ApplyType == "Shipment") {
            chk("General", "3");
        }
        else if (ApplyType == "Manual") {
            chk("General", "2");
        }
        else if (ApplyType == "Auto") {
            chk("General", "1");
        }
        //LoadComboStyle(matchingItems);
        //chk("Style", "3");
    }
    else if (genmanualList.length > 0 && genmanualList != undefined && genmanualList != null) {
        if (allowance != "" && ApplyType == "Manual") {
            for (var i = 0; i < genmanualList.length; i++) {
                var qtyval = genmanualList[i]["TotQty"];

                var percenval = ((qtyval * allowance) / 100);
                var allowval = (parseInt(percenval) + parseInt(qtyval));

                //Round Off
                genmanualList[i]["TotQty"] = Math.ceil(allowval);
            }

            loadGenAuto(genmanualList);
        }
    }

    if ($("#txtqtyunit").val() > 0 && $("#ddltoarriveqty").val() == 2 && ApplyType == "Auto") {
        var qtyval = $("#txtqtyunit").val();
        var reqval = orderqty;
        var reqqty = (reqval == 0 ? 0 : reqval) / (qtyval == 0 ? 0 : qtyval);
        //Handling Infinity
        if (isFinite(reqqty) == false) {
            reqqty = 0;
        }
        var percenval = ((reqqty * allowance) / 100);
        var allowval = (percenval + reqqty);
        $("#txtgenreqqty").val(Math.ceil(allowval));
    }
    else if ($("#txtqtyunit").val() > 0 && $("#ddltoarriveqty").val() == 1 && ApplyType == "Auto") {
        var qtyval = $("#txtqtyunit").val();
        var reqval = orderqty;
        var reqqty = (reqval == 0 ? 0 : reqval) * (qtyval == 0 ? 0 : qtyval);
        //Handling Infinity
        if (isFinite(reqqty) == false) {
            reqqty = 0;
        }
        var percenval = ((reqqty * allowance) / 100);
        var allowval = (percenval + reqqty);
        $("#txtgenreqqty").val(Math.ceil(allowval));
    }

    if ($("#txtgenreqqty").val() > 0 && $("#ddltoarriveqty").val() == 2 && ApplyType == "Manual") {
        //var qtyval = $("#txtqtyunit").val();
        var reqval = $("#txtgenreqqty").val();
        //var reqqty = (reqval == 0 ? 0 : reqval) / (qtyval == 0 ? 0 : qtyval);

        //Handling Infinity
        if (isFinite(reqval) == false) {
            reqval = 0;
        }

        var percenval = ((reqval * allowance) / 100);
        var allowval = (parseInt(percenval) + parseInt(reqval));
        $("#txtgenreqqty").val(Math.ceil(allowval));
    }
    else if ($("#txtgenreqqty").val() > 0 && $("#ddltoarriveqty").val() == 1 && ApplyType == "Manual") {
        //var qtyval = $("#txtqtyunit").val();
        var reqval = $("#txtgenreqqty").val();
        //var reqqty = (reqval == 0 ? 0 : reqval) * (qtyval == 0 ? 0 : qtyval);

        //Handling Infinity
        if (isFinite(reqval) == false) {
            reqval = 0;
        }

        var percenval = ((reqval * allowance) / 100);
        var allowval = (parseInt(percenval) + parseInt(reqval));
        $("#txtgenreqqty").val(Math.ceil(allowval));
    }
}

function Delete() {
    debugger;
    var OrderNo = $('#txtOrderNo').val();
    var StyleId = $('#txtHStyleId').val();

    var ComboColor = [];
    var ComboSize = [];
    var ComboStyle = [];
    var genauto = [];
    var genmanual = [];
    var plantypeid = 0;
    var Apply = 0;

    if (ApplyType == "Auto") { Apply = "A" } else if (ApplyType == "Manual") { Apply = "M" } else if (ApplyType == "Shipment") { Apply = "S" }
    if (PlanType == "Color") { plantypeid = 1 } else if (PlanType == "Size") { plantypeid = 2 } else if (PlanType == "Style") { plantypeid = 3 } else if (PlanType == "General") { plantypeid = 4 }

    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $("#btnDelete").attr("disabled", true);
        LoadingSymb();
        $.ajax({
            url: "/Trims/CrossCheckingBOM/",
            data: JSON.stringify({ orderno: OrderNo, styleid: StyleId, itemid: Itemid, PlanTypeId: plantypeid, ApplyType: Apply }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                debugger;
                if (result.Status == "SUCCESS") {
                    alert("Budget Approval has been made for this Order : " + OrderNo + " and Style : ");
                } else {
                    $.ajax({
                        url: "/Trims/Delete/",
                        data: JSON.stringify({ ID: IDonEditDelMode, orderno: OrderNo, styleid: StyleId, ComboColor: comboColorList, ComboSize: comboSizeList, ComboStyle: comboStyleList, Mode: Mode, PlanId: PLID, genauto: genautoList, genmanual: genmanualList }),
                        type: "POST",
                        contentType: "application/json;charset=utf-8",
                        dataType: "json",
                        success: function (result) {

                            if (result.Status == "SUCCESS") {

                                alert("Data Deleted Sucessfully");
                                //StyRowId = StyleRowId;
                                $('#myModal1').modal('hide');
                                AddUserEntryLog('Planing', 'Trims Requirement', 'DELETE', $('#txtOrderNo').val());
                                Mode = 0;
                                LoadPlanItemDetails(QryItemId, StyleRowId);
                            } else {
                                window.location.href = "/Error/Index";
                            }
                        },
                        error: function (errormessage) {
                            alert(errormessage.responseText);
                        }
                    });
                }
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });

    }
}

//function Delete() {
//    debugger;
//    var OrderNo = $('#txtOrderNo').val();
//    var StyleId = $('#txtHStyleId').val();

//    var ComboColor = [];
//    var ComboSize = [];
//    var ComboStyle = [];
//    var genauto = [];
//    var genmanual = [];

//    var ans = confirm("Are you sure you want to delete this Record?");
//    if (ans) {
//        $("#btnDelete").attr("disabled", true);
//        LoadingSymb();
//        $.ajax({
//            url: "/Trims/Delete/",
//            data: JSON.stringify({ ID: IDonEditDelMode, orderno: OrderNo, styleid: StyleId, ComboColor: comboColorList, ComboSize: comboSizeList, ComboStyle: comboStyleList, Mode: Mode, PlanId: PLID, genauto: genautoList, genmanual: genmanualList }),
//            type: "POST",
//            contentType: "application/json;charset=utf-8",
//            dataType: "json",
//            success: function (result) {
//                //if (result.Status == "SUCCESS") {
//                //    alert("Record deleted successfully...");
//                //    $('#myModal1').modal('hide');
//                //    Mode = 0;
//                //    fnLoadMainGridOnEditMode();
//                //}
//                //else if (result.Status == "ERROR") {
//                //    alert("Record deleted failed...");
//                //    $('#myModal1').modal('show');
//                //}
//                if (result.Status == "SUCCESS") {

//                    alert("Data Deleted Sucessfully");
//                    //StyRowId = StyleRowId;
//                    $('#myModal1').modal('hide');
//                    Mode = 0;
//                    LoadPlanItemDetails(QryItemId, StyleRowId);
//                } else {

//                    window.location.href = "/Error/Index";


//                }
//            },
//            error: function (errormessage) {
//                alert(errormessage.responseText);
//            }
//        });
//    }
//}

function LoadInnerGrid(PlanType) {
    if (PlanType == "Color") {
        $("#tblsizedetails").css('display', 'none');
        $("#tblstyledetails").css('display', 'none');
        $("#tblcolordet").css('display', 'inline-table');
        $("#divgen").css('display', 'none');

        $("#lblsize").css('display', 'block');
        $("#ddlsizedet").css('display', 'block');

        $("#lblcolor").css('display', 'none');
        $("#ddlcolordet").css('display', 'none');
    }
    else if (PlanType == "Size") {
        $("#tblstyledetails").css('display', 'none');
        $("#tblsizedetails").css('display', 'inline-table');
        $("#tblcolordet").css('display', 'none');
        $("#divgen").css('display', 'none');

        $("#lblcolor").css('display', 'block');
        $("#ddlcolordet").css('display', 'block');

        $("#lblsize").css('display', 'none');
        $("#ddlsizedet").css('display', 'none');
    }
    else if (PlanType == "Style") {
        $("#tblstyledetails").css('display', 'inline-table');
        $("#tblsizedetails").css('display', 'none');
        $("#tblcolordet").css('display', 'none');
        $("#divgen").css('display', 'none');

        $("#lblcolor").css('display', 'none');
        $("#ddlcolordet").css('display', 'none');

        $("#lblsize").css('display', 'none');
        $("#ddlsizedet").css('display', 'none');
    }
    else if (PlanType == "General") {
        $("#tblsizedetails").css('display', 'none');
        $("#tblstyledetails").css('display', 'none');
        $("#tblcolordet").css('display', 'none');
        $("#divgen").css('display', 'inline-table');

        $("#lblsize").css('display', 'none');
        $("#ddlsizedet").css('display', 'none');

        $("#lblcolor").css('display', 'none');
        $("#ddlcolordet").css('display', 'none');
    }
    if (Mode == 0) {
        loadSizeColorData(PlanType);
    }
    else if (Mode == 1) {
        loadSizeColorDataForEdit(PlanType);
    }
    else if (Mode == 2) {
        loadSizeColorDataForEdit(PlanType);
    }
}

function loadedit(PlId) {
    debugger;
    $.ajax({
        url: "/Trims/Getloadedit",
        data: JSON.stringify({ ID: PlId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            comboItemList = result.Value;
            loadItemTable(comboItemList);
        }
    });
}

function ProQtyCal() {
    debugger;
    var QUnit, ProcessQty, ReqQty, ProcessColorId, coloqty = 0;

    $('#tblcolordet tbody').on('keyup', 'tr', function () {

        var table = $('#tblcolordet').DataTable();

        //alert('Row index: ' + table.row(this).index());

        rowindex = table.row(this).index();
        var currentcolorrow = comboColorList.slice(rowindex);
        //var AccColorId = $('#ddlcolordet').val();
        var ArriveMode = $('#ddltoarriveqty').val();

        coloqty = $(this).closest('tr').find('#txtcolorqty').val();
        QUnit = $(this).closest('tr').find('#txtqunit').val();
        ProcessQty = $(this).closest('tr').find('#txtqunit').val();
        ReqQty = $(this).closest('tr').find('#txtReqQty').val();
        ProcessColorId = $(this).closest('tr').find('#ddlprocecolor').val();

        if (ArriveMode == 1) {
            if (QUnit == 0 || QUnit == undefined)
            { $(this).closest('tr').find('#txtReqQty').val(0); }
            else if (QUnit > 0)
            { $(this).closest('tr').find('#txtReqQty').val(parseInt(coloqty) * parseInt(QUnit)); }

        }
        else if (ArriveMode == 2) {
            if (QUnit == 0 || QUnit == undefined) {
                $(this).closest('tr').find('#txtReqQty').val(0);
            }
            else if (QUnit > 0) {
                $(this).closest('tr').find('#txtReqQty').val(parseInt(coloqty) / parseInt(QUnit));
            }

        }

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
            debugger;
            var obj = result.Value;

            if (obj != undefined) {
                $('#txtOrderNo').val(obj[0]["Order_No"]);
                $('#txtRefNo').val(obj[0]["Ref_no"]);
                $('#txtCompany').val(obj[0]["Company"]);
                $('#txtHCompanyId').val(obj[0]["CompanyID"]);
                $('#txtStyle').val(obj[0]["Style"]);
                $('#txtprodqty').val(obj[0]["ProductionQty"]);
                $('#txtordqtydet').val(obj[0]["OrderQty"]);
                $('#txtBuyer').val(obj[0]["buyer"]);
                $('#txtHBuyerId').val(obj[0]["buyerid"]);
                $('#txtitem').val(obj[0]["Item"]);
                $('#txtHItemId').val(obj[0]["ItemID"]);
                $('#txtHStyleId').val(obj[0]["StyleID"]);
                $('#txtBuyOrdMasId').val(obj[0]["BMasID"]);
                $('#txtDate').val(moment(obj[0]["EDate"]).format('DD/MM/YYYY'));
                $('#txtworkOrder').val(obj[0]["Job_Ord_No"]);
                $('#txtEWorkOrder').val(obj[0]["Job_Ord_No"]);

                //
                $('#txtcompdet').val(obj[0]["Order_No"]);
                $('#txtrefnodet').val(obj[0]["Ref_no"]);
                $('#txtstyledet').val(obj[0]["Style"]);
                $('#txtbuyerdet').val(obj[0]["buyer"]);
                $('#txtitemdet').val(obj[0]["Item"]);
                $('#txtprodqtydet').val(obj[0]["ProductionQty"]);
                $('#txtEntrydatedet').val(moment(obj[0]["EDate"]).format('DD/MM/YYYY'));
                //
                //EditDetCompPlanList(ItemId, StyleRowId);
                //EditDetConPlanList(ItemId, StyleRowId);
                debugger;

                fnLoadMainGridOnEditMode();

                if (Mode == 1) {
                    debugger;
                    var OrderNo = $('#txtOrderNo').val();
                    var StyleId = $('#txtHStyleId').val();
                    var ItemId = QryItemId;//$('#txtHItemId').val();

                    var AccReqDetObj = {
                        OrderNo: OrderNo,
                        StyleId: StyleId,
                        ItemId: ItemId,
                    };

                    $.ajax({
                        url: "/Trims/GetAccReqId",
                        //data: JSON.stringify({ AccReqMas: comboItemList, ComboColorList: comboColorList, ComboSizeList: comboSizeList, Orderno: OrderNo, Entrydate: EntryDate, Styleid:StyleId,BuyOrdMasid:BuyOrdMasId}),
                        data: JSON.stringify(AccReqDetObj),
                        type: "POST",
                        contentType: "application/json;charset=utf-8",
                        dataType: "json",
                        success: function (result) {

                            var objMas = result.Value;
                            var ID = 0;

                            if (objMas != undefined && objMas.length != 0) {
                                ID = objMas[0].AccReqID;
                            }

                            //$.ajax({
                            //    url: "/Trims/GetAccReqMasandDet/" + ID,                                
                            //    type: "GET",
                            //    contentType: "application/json;charset=utf-8",
                            //    dataType: "json",
                            //    success: function (result) {                                    
                            //        debugger;
                            //        var objMas = result.Value;

                            //        comboItemList = objMas;
                            //        loadItemTable(comboItemList);

                            //    },
                            //    error: function (errormessage) {
                            //        alert(errormessage.responseText);
                            //    }
                            //});
                        },
                        error: function (errormessage) {
                            alert(errormessage.responseText);
                        }
                    });

                    //if (isAllValid) {
                    //    var ItemListObj = {
                    //        itemrowseq: itemseq,
                    //        ItemName: $("#ddlitemvar option:selected").text(),
                    //        ItemId: $('#ddlitemvar').val(),
                    //        quantity: $('#txtqty').val(),
                    //        Unitid: $('#txtuomid').val(),
                    //        UOM: $('#txtuom').val(),
                    //        PlanType: $("#ddlplantype option:selected").text(),
                    //        Type: $('#ddlplantype').val(),
                    //        Apply: $("#ddlapply option:selected").text(),
                    //        ApplyID: $('#ddlapply').val(),
                    //        DivMul: $("#ddltoarriveqty option:selected").text(),
                    //        AutoOrMan: $('#ddlapply').val(),
                    //        ProdOrOrd: "P",
                    //        ItemRemarks: "Test Remarks",
                    //        AddDate: new Date(),
                    //        LockRow: "Y",
                    //        Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
                    //    };

                    //    comboItemList.push(ItemListObj);

                    //    loadItemTable(comboItemList);

                    //    //clear select data
                    //    //$('#tblsizedetails').DataTable().destroy();
                    //    $('#ddlitemvar').val('0');
                    //    $('#ddlapply').val('0');
                    //    $('#ddlplantype').val('0');
                    //    $('#txtqty').val('');
                    //    $('#txtuom').val('');
                    //}        
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

function GetUomCall(ID) {

    $.ajax({
        url: "/Trims/GetUombyItem/" + ID,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (json) {
            var tableload = json.Value;
            $('#txtuomid').val(tableload.UomId);
            $('#txtuom').val(tableload.UomName);
        }
    });
}


function loadcolor() {
    debugger;
    $.ajax({
        url: "/Trims/ColorList",
        data: JSON.stringify({}),
        type: "POST",
        async: false,
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            ColorL = result;

            //for (var t = 0; t < ColorL.length; t++) {

            Pcid = ColorL[0].ColorId;
            Pclr = ColorL[0].Color;
            // }
            //$.each(result, function () {
            //    $("#sbTwo").append($("<option></option>").val(this.Itemgroupid).html(this.Itemgroup));

            //});
            //check();        

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

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

function loadSizeColorData(Type) {
    debugger;
    var OrderNo = $('#txtOrderNo').val();
    var StyleId = $('#txtHStyleId').val();
    var ItemId = $('#txtHItemId').val();
    var ApplyTypeId = $('#ddlapply').val();

    if (ApplyTypeId == 3) {
        $("#divship").show();

        $.ajax({
            type: "POST",
            url: '/Trims/GetAccShipDetail/',
            data: JSON.stringify({ type: Type, OrderNo: OrderNo, ItemId: ItemId, StyleId: StyleId }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (json) {
                //var tableload = json.Value;
                debugger;
                comboShipList = json.Value;
                if (comboShipList != undefined && comboShipList != null) {
                    shiprowid = comboShipList[0]["shiprowid"];
                }
                //for (var f = 0; f < comboColorList.length; f++) {
                //    comboColorList[f].PColorid = Pcid;
                //    comboColorList[f].PColor = Pclr;
                //}

                if (Mode == 0) {
                    LoadShipmentDet(comboShipList);
                }
            },
            failure: function (errMsg) {
                alert(errMsg);
            }
        });

        if (Type == "Color") {

            $.ajax({
                type: "POST",
                url: '/Trims/GetAccShipColorDetail/',
                data: JSON.stringify({ type: Type, OrderNo: OrderNo, ItemId: ItemId, StyleId: StyleId }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (json) {
                    //var tableload = json.Value;
                    debugger;
                    comboColorList = json.Value;
                    var matchingItems = $.grep(comboColorList, function (item) {
                        return item.ShipRowId === shiprowid;
                    });
                    //for (var f = 0; f < comboColorList.length; f++) {
                    //    comboColorList[f].PColorid = Pcid;
                    //    comboColorList[f].PColor = Pclr;
                    //}

                    if (Mode == 0) {
                        LoadComboColor(matchingItems);
                        chk(Type, ApplyTypeId);
                    }

                    LoadColorDDL("#ddlprocecolor");
                },
                failure: function (errMsg) {
                    alert(errMsg);
                }
            });
        }
        else if (Type == "Size") {
            debugger;
            $.ajax({
                type: "POST",
                url: '/Trims/GetAccShipColorDetail/',
                data: JSON.stringify({ type: Type, OrderNo: OrderNo, ItemId: ItemId, StyleId: StyleId }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (json) {
                    //var tableload = json.Value;
                    debugger;
                    comboSizeList = json.Value;
                    var matchingItems = $.grep(comboSizeList, function (item) {
                        return item.ShipRowId === shiprowid;
                    });

                    //for (var f = 0; f < comboColorList.length; f++) {
                    //    comboColorList[f].PColorid = Pcid;
                    //    comboColorList[f].PColor = Pclr;
                    //}

                    if (Mode == 0) {
                        LoadComboSize(matchingItems);
                        chk(Type, ApplyTypeId);
                    }
                    LoadColorDDL("#ddlprocecolor");
                },
                failure: function (errMsg) {
                    alert(errMsg);
                }
            });
        }
        else if (Type == "Style") {
            $.ajax({
                type: "POST",
                url: '/Trims/GetAccShipColorDetail/',
                data: JSON.stringify({ type: Type, OrderNo: OrderNo, ItemId: ItemId, StyleId: StyleId }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (json) {
                    //var tableload = json.Value;
                    debugger;
                    comboStyleList = json.Value;
                    var matchingItems = $.grep(comboStyleList, function (item) {
                        return item.ShipRowId === shiprowid;
                    });
                    //for (var f = 0; f < comboColorList.length; f++) {
                    //    comboColorList[f].PColorid = Pcid;
                    //    comboColorList[f].PColor = Pclr;
                    //}

                    if (Mode == 0) {
                        LoadComboStyle(matchingItems);
                        chk(Type, ApplyTypeId);
                    }

                    LoadColorDDL("#ddlprocecolor");
                },
                failure: function (errMsg) {
                    alert(errMsg);
                }
            });
        }
        else if (Type == "General") {
            if (PlanType == "General" && (ApplyType == "Auto" || ApplyType == "Shipment")) {
                $("#txtgenreqqty").attr("disabled", true);
                $("#txtqtyunit").attr("disabled", false);
                if (ApplyType == "Shipment") {
                    //loadGenAuto(genshipmentList);                    
                    $("#tblgeneraldetails").css('visibility', 'hidden');
                    //$("#tblcolordet").css('visibility', 'visible');
                    LoadGenShipmentDet(genshipmentList);
                }
            }
            else if (PlanType == "General" && ApplyType == "Manual") {
                $("#txtgenreqqty").attr("disabled", false);
                $("#txtqtyunit").attr("disabled", true);
            }
        }
    }
    else {
        $("#divship").hide();

        if (Type == "Color") {

            $.ajax({
                type: "POST",
                url: '/Trims/GetTrimsColorDet/',
                data: JSON.stringify({ OrderNo: OrderNo, ItemId: ItemId, StyleId: StyleId }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (json) {
                    //var tableload = json.Value;
                    debugger;
                    comboColorList = json.Value;
                    for (var f = 0; f < comboColorList.length; f++) {
                        comboColorList[f].PColorid = Pcid;
                        comboColorList[f].PColor = Pclr;
                    }

                    if (Mode == 0) {
                        LoadComboColor(comboColorList);
                    }
                    chk(Type, ApplyTypeId);
                    LoadColorDDL("#ddlprocecolor");
                },
                failure: function (errMsg) {
                    alert(errMsg);
                }
            });
        }
        else if (Type == "Size") {
            $.ajax({
                type: "POST",
                url: '/Trims/GetTrimsSizeDet/',
                data: JSON.stringify({ OrderNo: OrderNo, ItemId: ItemId, StyleId: StyleId }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (json) {
                    var tableload = json.Value
                    comboSizeList = tableload;

                    for (var f = 0; f < comboSizeList.length; f++) {
                        comboSizeList[f].AccSizeId = comboSizeList[f].SizeId;
                        comboSizeList[f].AccSize = comboSizeList[f].Size;
                    }
                    LoadComboSize(comboSizeList);
                    chk(Type, ApplyTypeId);
                },
                failure: function (errMsg) {
                    alert(errMsg);
                }
            });
        }
        else if (Type == "Style") {
            var AcItemId = $('#ddlitemvar').val();
            $.ajax({
                type: "POST",
                url: '/Trims/GetTrimsStyleDet/',
                data: JSON.stringify({ OrderNo: OrderNo, ItemId: ItemId, StyleId: StyleId, AccItemId: AcItemId }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (json) {
                    debugger;
                    var tableload = json.Value
                    comboStyleList = tableload;
                    for (var f = 0; f < comboStyleList.length; f++) {
                        comboStyleList[f].AccSizeId = comboStyleList[f].SizeId;
                        comboStyleList[f].AccSize = comboStyleList[f].Size;
                    }
                    LoadComboStyle(comboStyleList);
                    chk(Type, ApplyTypeId);
                },
                failure: function (errMsg) {
                    alert(errMsg);
                }
            });
        }
        else if (Type == "General") {
            if (PlanType == "General" && (ApplyType == "Auto" || ApplyType == "Shipment")) {
                $("#txtgenreqqty").attr("disabled", true);
                $("#txtqtyunit").attr("disabled", false);
                loadGenAuto(genautoList);
            }
            else if (PlanType == "General" && ApplyType == "Manual") {
                $("#txtgenreqqty").attr("disabled", false);
                $("#txtqtyunit").attr("disabled", true);
                loadGenAuto(genmanualList);
            }
        }
    }
}

function LoadComboStyle(StyleList) {
    //if (comboStyleList.length > 0) {
    var inputcount = 0;
    $('#tblstyledetails tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        //var tableinput = $('#tblinnergrid').DataTable();
        //tableinput.clear().draw();
        $('#tblstyledetails').DataTable().destroy();
    }
    //}

    $('#tblstyledetails').DataTable({
        data: StyleList,
        scrollY: 300,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        columns: [
            { title: "Sno", data: "Sno" },
            { title: "ColorId", data: "ColorId", "visible": false },
            { title: "Color", data: "Color" },
            { title: "SizeId", data: "SizeId", "visible": false },
            { title: "Size", data: "Size" },
                 { title: "Quantity", data: "Qty" },
                 //{ title: "Req.Color", data: "Color" },
                 {
                     title: "Req.Color", data: "PColor",

                     render: function (data, type, row) {
                         var $select = $("<select></select>", {
                             "id": "ddlReqColor",
                             "value": data,
                             "class": "form-control loadReqcolorlist",
                         });

                         $.each(ColorL, function (k, v) {
                             var $option = $("<option></option>", {
                                 "text": v.Color,
                                 "value": v.ColorId,
                             });

                             if (data === v.Color) {
                                 $option.attr("selected", "selected")
                             }
                             $select.append($option);
                         });


                         return $select.prop("outerHTML");
                     }
                 },
                 //{ title: "Req.Size", data: "Size" },
                 {
                     title: "Req.Size", data: "AccSize",

                     render: function (data, type, row) {
                         var $select = $("<select></select>", {
                             "id": "loadstylelist",
                             "value": data,
                             "class": "form-control loadstylelist",
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
                     //title: "Process Color", "visible": false,
                     //    //render: function (type, row) {
                     //    //    return '<select id="ddlprocecolor" class="form-control" style="width: 100px;"/></select>';
                     //    //}
                     //}
                 },
                 //{ title: "Qty / Unit", data: "QUnit" },
                 {
                     title: "Qty / Unit", data: "QUnit",
                     render: function (data) {
                         return '<input type="text" id="txtqunit" class="txtqunit form-control"  style="width: 50px;text-align: center;" value=' + data + ' >';
                         //onkeyup="ProQtyCal();"
                     },
                 },
                 //{ title: "Req Qty", data: "PQty" },
                 {
                     title: "Req. Qty", data: "ReqQty",
                     render: function (data) {
                         return '<input type="text" class="txtStyleReqQty form-control" id="txtStyleReqQty"  style="width: 50px;text-align: center;" value=' + data + ' >';
                         //disabled = "disabled"
                     },
                 },
                 {
                     title: "Process Qty", data: "ProcessQty",
                     render: function (data) {
                         return '<input type="text" class="txtStyleProQty form-control" id="txtStyleProQty"  style="width: 50px;text-align: center;" value=' + data + ' >';
                         //disabled = "disabled"
                     },
                 },
                 { title: "UOM", data: "UOM" },

        ]
    });
}

function LoadComboSize(SizeList) {
    //if (comboSizeList.length > 0) {
    var inputcount = 0;
    $('#tblsizedetails tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        //var tableinput = $('#tblinnergrid').DataTable();
        //tableinput.clear().draw();
        $('#tblsizedetails').DataTable().destroy();
    }
    //}

    $('#tblsizedetails').DataTable({
        data: SizeList,
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
            { title: "Sno", data: "Sno" },
            { title: "SizeId", data: "SizeId", "visible": false },
            { title: "Size", data: "Size" },
                 { title: "Quantity", data: "Qty" },
                 //{ title: "Req.Size", data: "Size" },
                 {
                     title: "Req.Size", data: "AccSize",

                     render: function (data, type, row) {
                         var $select = $("<select></select>", {
                             "id": "loadsizelist",
                             "value": data,
                             "class": "form-control loadsizelist",
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
                     //title: "Process Color", "visible": false,
                     //    //render: function (type, row) {
                     //    //    return '<select id="ddlprocecolor" class="form-control" style="width: 100px;"/></select>';
                     //    //}
                     //}
                 },
                 //{ title: "Qty / Unit", data: "UOM" },
                 {
                     title: "Qty / Unit", data: "QUnit",
                     render: function (data) {
                         return '<input type="text" id="txtqunit" class="txtqunit form-control"  style="width: 50px;text-align: center;" value=' + data + ' >';
                         //onkeyup="ProQtyCal();"
                     },
                 },
                 //{ title: "Req Qty", data: "PQty" },
                 {
                     title: "Req. Qty", data: "ReqQty",
                     render: function (data) {
                         return '<input type="text" class="txtSizeReqQty form-control" id="txtSizeReqQty"  style="width: 50px;text-align: center;" value=' + data + ' >';
                         //disabled = "disabled"
                     },
                 },
                 { title: "UOM", data: "UOM" },
                 //{
                 //    title: "ACTION", "mDataProp": null,
                 //    "sDefaultContent": '<button type="button" class="btnrowsizesubmit"> Submit</button>'
                 //}
                 //{
                 //    title: "Action", "mDataProp": null,
                 //    "sDefaultContent": '<button type="button" class="btnedit"> Edit </button> <a id=" 1 " onclick="return DeleteChild(this)" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="1"><i class="fa fa-trash-o" style="cursor: pointer;"></i></a>'
                 //    //"sDefaultContent": '<button type="button" class="btnshipedit"> Edit </button><button type="button" class="btnshipView"> View Item </button>'//<button type="button" class="btnremove"> Remove </button><i class="fa fa-trash-o" style="cursor: pointer;"></i></a>
                 //},
        ]
    });
}

function LoadGenShipmentDet(genShipList) {

    var inputcount = 0;
    $('#tblgenshipdet tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tblgenshipdet').DataTable().destroy();
    }

    $('#tblgenshipdet').DataTable({
        data: genShipList,
        scrollY: 300,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        columns: [
            { title: "RecId", data: "ShipRowId", "visible": false },
            { title: "Colorid", data: "ColorId", "visible": false },
            { title: "Sizeid", data: "SizeId", "visible": false },
             { title: "uomid", data: "UomId", "visible": false },
            { title: "Req Color", data: "ColorName" },
            { title: "Req Size", data: "SizeName" },
             { title: "Qty/Unit", data: "QtyPerPiece" },
              { title: "Req Qty", data: "TotQty" },
               { title: "UOM", data: "UomName" },
               {
                   title: "ACTION", "mDataProp": null,
                   //"sDefaultContent": '<button type="button" class="btnedit"> Edit </button> <a id=" 1 " onclick="return DeleteChild(this)" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="1"><i class="fa fa-trash-o" style="cursor: pointer;"></i></a>'
                   "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnremove btn btn-danger btn-round"> <i class="fa fa-times"></i> </button><i class="fa fa-trash-o" style="cursor: pointer;display:none;"></i></a>'//<button type="button" class="btnsizeview"> View Color </button>
               }
        ]
    });
}

function LoadShipmentDet(ShipList) {
    //if (comboColorList.length > 0) {
    var inputcount = 0;
    $('#tblshipdet tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        //var tableinput = $('#tblinnergrid').DataTable();
        //tableinput.clear().draw();
        $('#tblshipdet').DataTable().destroy();
    }
    //}

    $('#tblshipdet').DataTable({
        data: ShipList,
        columns: [
            { title: "ShipRowID", data: "shiprowid", "visible": false },
            { title: "Assortment", data: "assortno" },
            {
                title: "Shipment", data: "shipdate",
                render: function (data) {
                    return (moment(data).format("DD/MM/YYYY"));
                }
            },
            { title: "Destination", data: "destination" },
            { title: "Order Qty", data: "qty" },
            { title: "Production Qty", data: "prodqty" },
                {
                    title: "ACTION", "mDataProp": null,
                    //"sDefaultContent": '<button type="button" class="btnedit"> Edit </button> <a id=" 1 " onclick="return DeleteChild(this)" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="1"><i class="fa fa-trash-o" style="cursor: pointer;"></i></a>'
                    "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="View Details" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnshipView btn btn-round btn-info"> <i class="fa fa-eye"></i> </button>'//<button type="button" class="btnremove"> Remove </button><i class="fa fa-trash-o" style="cursor: pointer;"></i></a>
                }
        ]
    });
}

function LoadComboColor(ColorList) {
    //if (comboColorList.length > 0) {
    var inputcount = 0;
    $('#tblcolordet tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        //var tableinput = $('#tblinnergrid').DataTable();
        //tableinput.clear().draw();
        $('#tblcolordet').DataTable().destroy();
    }
    //}

    $('#tblcolordet').DataTable({
        data: ColorList,
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
            { title: "Sno", data: "Sno" },
            { title: "ColorId", data: "ColorId", "visible": false },
            { title: "Color", data: "Color" },
            {
                title: "Quantity", data: "Qty",
                render: function (data) {
                    return '<input type="text" id="txtcolorqty" class="form-control"  style="width: 50px;text-align: center;" disabled="disabled" value=' + data + ' >';
                },
            },
            {
                title: "Req.Color", data: "ReqColor",
                render: function (data, type, row) {
                    var $select = $("<select></select>", {
                        "id": "ddlReqClrColor",
                        "value": data,
                        "class": "form-control ddlReqColor",
                        //onchange: "loadcolorlist(this.value);"
                    });

                    $.each(ColorL, function (k, v) {
                        var $option = $("<option></option>", {
                            "text": v.Color,
                            "value": v.ColorId,
                        });

                        if (data === v.Color) {
                            $option.attr("selected", "selected")
                        }
                        $select.append($option);
                    });


                    return $select.prop("outerHTML");
                }
            },
            {
                title: "Process Color", data: "PColorid",

                render: function (data, type, row) {
                    var $select = $("<select></select>", {
                        "id": "ddlPColor",
                        "value": data,
                        "class": "form-control loadcolorlist",
                        //onchange: "loadcolorlist(this.value);"
                    });

                    $.each(ColorL, function (k, v) {
                        var $option = $("<option></option>", {
                            "text": v.Color,
                            "value": v.ColorId,
                        });

                        if (data === v.ColorId) {
                            $option.attr("selected", "selected")
                        }
                        $select.append($option);
                    });


                    return $select.prop("outerHTML");
                }
                //title: "Process Color", "visible": false,
                //    //render: function (type, row) {
                //    //    return '<select id="ddlprocecolor" class="form-control" style="width: 100px;"/></select>';
                //    //}
                //}
            },
            {
                title: "Qty / Unit", data: "QUnit",
                render: function (data) {
                    return '<input type="text" class="txtqunit form-control" id="txtqunit" style="width: 50px;text-align: center;" value=' + data + ' >';
                    //onkeyup="ProQtyCal();"
                },
            },
            {
                title: "Req. Qty", data: "ReqQty",
                render: function (data) {
                    return '<input type="text" class="txtReqQty form-control" id="txtReqQty"  style="width: 50px;text-align: center;" value=' + data + ' >';
                    //disabled = "disabled"
                },
            },
            {
                title: "Process Qty", data: "ProcessQty",
                render: function (data) {

                    return '<input type="text" class="txtproqty form-control"  style="width: 50px;text-align: center;" value=' + data + ' >';
                },
            },
            //{
            //    title: "ACTION", "mDataProp": null,
            //    "sDefaultContent": '<button type="button" class="btnrowsubmit"> Submit</button>'
            //}
                 //{
                 //    title: "Action", "mDataProp": null,
                 //    "sDefaultContent": '<button type="button" class="btnedit"> Edit </button> <a id=" 1 " onclick="return DeleteChild(this)" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="1"><i class="fa fa-trash-o" style="cursor: pointer;"></i></a>'
                 //    //"sDefaultContent": '<button type="button" class="btnshipedit"> Edit </button><button type="button" class="btnshipView"> View Item </button>'//<button type="button" class="btnremove"> Remove </button><i class="fa fa-trash-o" style="cursor: pointer;"></i></a>
                 //},
        ]
    });
}

function chk(Type, ApplyTypeId) {
    debugger;


    if (Type == "Color" && (ApplyTypeId == "3" || ApplyTypeId == "1")) {

        $('input[id=txtReqQty]').each(function () {
            debugger;
            var row = $(this).closest('tr');
            row.find('#txtReqQty').prop('disabled', true);
            row.find('#txtqunit').prop('disabled', false);

        });
    }
    else if (Type == "Size" && (ApplyTypeId == "3" || ApplyTypeId == "1")) {

        $('input[id=txtSizeReqQty]').each(function () {
            debugger;
            var row = $(this).closest('tr');
            row.find('#txtSizeReqQty').prop('disabled', true);
            row.find('#txtqunit').prop('disabled', false);

        });
    }
    else if (Type == "Style" && (ApplyTypeId == "3" || ApplyTypeId == "1")) {
        $('input[id=txtStyleReqQty]').each(function () {
            debugger;
            var row = $(this).closest('tr');
            row.find('#txtStyleReqQty').prop('disabled', true);
            row.find('#txtqunit').prop('disabled', false);


        });
    }
    else if (Type == "General" && (ApplyTypeId == "3" || ApplyTypeId == "1")) {
        $('input[id=txtStyleReqQty]').each(function () {
            debugger;
            var row = $(this).closest('tr');
            row.find('#txtStyleReqQty').prop('disabled', true);
            row.find('#txtqunit').prop('disabled', false);


        });
    }
    else if (Type == "Color" && ApplyTypeId == "2") {
        $('input[id=txtReqQty]').each(function () {
            debugger;
            var row = $(this).closest('tr');
            row.find('#txtReqQty').prop('disabled', false);
            row.find('#txtqunit').prop('disabled', true);

        });
    }
    else if (Type == "Size" && ApplyTypeId == "2") {
        $('input[id=txtSizeReqQty]').each(function () {
            debugger;
            var row = $(this).closest('tr');
            row.find('#txtSizeReqQty').prop('disabled', false);
            row.find('#txtqunit').prop('disabled', true);

        });
    }
    else if (Type == "Style" && ApplyTypeId == "2") {
        $('input[id=txtStyleReqQty]').each(function () {
            debugger;
            var row = $(this).closest('tr');
            row.find('#txtStyleReqQty').prop('disabled', false);
            row.find('#txtqunit').prop('disabled', true);

        });
    }
    else if (Type == "General" && ApplyTypeId == "2") {
        $('input[id=txtStyleReqQty]').each(function () {
            debugger;
            var row = $(this).closest('tr');
            row.find('#txtStyleReqQty').prop('disabled', false);
            row.find('#txtqunit').prop('disabled', true);

        });
    }
    //else if (Type == "General" && ApplyTypeId == "3") {
    //    var cnt = $("#tblsizedetails tr").length - 1;
    //    for (var i = 1; i <= cnt; i++) {
    //        var OCId = $("#tblsizedetails tr:eq(" + i + ") td:eq(3)").val();
    //    }
    //}
    //else if (Type == "General" && ApplyTypeId == "3") {
    //    var cnt = $("#tblstyledetails tr").length - 1;
    //    for (var i = 1; i <= cnt; i++) {
    //        var OCId = $("#tblstyledetails tr:eq(" + i + ") td:eq(3)").val();
    //    }
    //}
}

function loadSizeColorDataForEdit(Type) {
    debugger;
    var OrderNo = $('#txtOrderNo').val();
    var StyleId = $('#txtHStyleId').val();
    var ItemId = $('#txtHItemId').val();
    var headitemid = QryItemId;
    var ApplyTypeId = ApplyID;// $('#ddlapply').val();
    var AccSizeID = 0;
    var AccColorID = 0;
    var allowance = 0;
    var divmulid = 0;

    //$('#ddlsizedet').empty();
    //$('#ddlcolordet').empty();

    if (Type == "General") {
        LoadColorDDL('#ddlgenreqcolor');
        LoadSizeDDL('#ddlgenreqsize');

        if (PlanType == "General" && (ApplyType == "Auto" || ApplyType == "Shipment")) {
            $("#txtgenreqqty").attr("disabled", true);
            $("#txtqtyunit").attr("disabled", false);
            if (PlanType == "General" && ApplyType == "Shipment") {
                //loadGenAuto(genshipmentList);                    
                $("#tblgeneraldetails").css('visibility', 'hidden');
                $("#tblgenshipdet").css('visibility', 'visible');
                LoadGenShipmentDet(genshipmentList);
            }
            else if (PlanType == "General" && ApplyType == "Auto") {
                //loadGenAuto(genshipmentList);                    
                $("#tblgeneraldetails").css('visibility', 'visible');
                $("#tblgenshipdet").css('visibility', 'hidden');
                LoadGenShipmentDet(genshipmentList);
            }
            //loadGenAuto(genautoList);
        }
        else if (PlanType == "General" && ApplyType == "Manual") {
            $("#txtgenreqqty").attr("disabled", false);
            $("#txtqtyunit").attr("disabled", true);
            //loadGenAuto(genmanualList);
        }
    }

    if (Type != "General") {
        LoadSizeDDL('#ddlsizedet');
    }
    //LoadColorDDL('#ddlcolordet');

    if (ApplyID == 3) {
        $("#divship").show();

        $.ajax({
            type: "POST",
            url: '/Trims/GetAccShipDetail/',
            data: JSON.stringify({ type: Type, OrderNo: OrderNo, ItemId: headitemid, StyleId: StyleId }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (json) {
                //var tableload = json.Value;
                debugger;
                comboShipList = json.Value;
                shiprowid = comboShipList[0]["shiprowid"];
                //for (var f = 0; f < comboColorList.length; f++) {
                //    comboColorList[f].PColorid = Pcid;
                //    comboColorList[f].PColor = Pclr;
                //}

                if (Mode == 1 || Mode == 2) {
                    LoadShipmentDet(comboShipList);
                }
            },
            failure: function (errMsg) {
                alert(errMsg);
            }
        });
    }
    else {
        $("#divship").hide();
    }

    if (Type == "Color") {
        $.ajax({
            type: "POST",
            url: '/Trims/GetTrimsColorDetForEdit/',
            data: JSON.stringify({ OrderNo: OrderNo, ItemId: ItemId, StyleItemid: QryItemId, Styleid: StyleId, PlanType: 1, applytype: ApplyType }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (json) {
                //var tableload = json.Value;
                debugger;

                comboColorList = json.Value;
                if (comboColorList != null) {
                    for (var i = 0; i < comboColorList.length; i++) {
                        comboColorList[i].PQty = $("#txtprodqtydet").val();
                    }
                }
                if (comboColorList != null) {
                    for (var f = 0; f < comboColorList.length; f++) {
                        //comboColorList[f].PColorid = Pcid;
                        //comboColorList[f].PColor = Pclr;
                        if (AccSizeID == 0) {
                            AccSizeID = comboColorList[f].AccSizeId;
                        }
                        if (allowance == 0) {
                            allowance = comboColorList[f].Allow;
                        }
                        if (divmulid == 0) {
                            divmulid = comboColorList[f].DivOrMul;
                        }
                    }

                    $("#ddlsizedet").val(AccSizeID);
                    $("#txtallow").val(allowance);
                    if (divmulid == "M") {
                        $("#ddltoarriveqty").val(1);
                    }
                    else {
                        $("#ddltoarriveqty").val(2);
                    }


                    if (Mode == 1 || Mode == 2) {

                        //if (comboColorList.length > 0) {
                        //var inputcount = 0;
                        //$('#tblcolordet tr').each(function () {
                        //    inputcount++;
                        //});

                        //if (inputcount > 0) {
                        //    //var tableinput = $('#tblinnergrid').DataTable();
                        //    //tableinput.clear().draw();
                        //    $('#tblcolordet').DataTable().destroy();
                        //}
                        //}
                        LoadComboColor(comboColorList);
                        if (comboShipList.length > 0 && comboShipList != null) {
                            var shiprowval = comboShipList[0].shiprowid;

                            colorlist = $.grep(comboColorList, function (v) {
                                return v.ShipRowId == shiprowval;
                            });
                            LoadComboColor(colorlist);
                        }
                        chk(Type, ApplyTypeId);
                        //$('#tblcolordet').DataTable({
                        //    data: comboColorList,
                        //    columns: [
                        //        { title: "ColorId", data: "ColorId", "visible": false },
                        //        { title: "Color", data: "Color" },
                        //        {
                        //            title: "Quantity", data: "Qty",
                        //            render: function (data) {
                        //                return '<input type="text" id="txtcolorqty" class="editor-active"  style="width: 50px;text-align: center;" disabled="disabled" value=' + data + ' >';
                        //            },
                        //        },
                        //        { title: "Req.Color", data: "Color" },
                        //        {
                        //            title: "Process Color", data: "PColorid",

                        //            render: function (data, type, row) {
                        //                var $select = $("<select style='width:150px;'></select>", {
                        //                    "id": "ddlPColor",
                        //                    "value": data,
                        //                    onchange: "loadcolorlist(this.val);"
                        //                });

                        //                $.each(ColorL, function (k, v) {
                        //                    var $option = $("<option></option>", {
                        //                        "text": v.Color,
                        //                        "value": v.ColorID,
                        //                    });

                        //                    if (data === v.ColorID) {
                        //                        $option.attr("selected", "selected")
                        //                    }
                        //                    $select.append($option);
                        //                });


                        //                return $select.prop("outerHTML");
                        //            }
                        //            //title: "Process Color", "visible": false,
                        //            //    //render: function (type, row) {
                        //            //    //    return '<select id="ddlprocecolor" class="form-control" style="width: 100px;"/></select>';
                        //            //    //}
                        //            //}
                        //        },
                        //        {
                        //            title: "Qty / Unit", data: "QUnit",
                        //            render: function (data) {
                        //                return '<input type="text" class="txtqunit editor-active"  style="width: 50px;text-align: center;" disabled = "disabled" value=' + data + ' >';
                        //                //onkeyup="ProQtyCal();"
                        //            },
                        //        },
                        //        {
                        //            title: "Req. Qty", data: "ReqQty",
                        //            render: function (data) {
                        //                return '<input type="text" class="txtReqQty editor-active"  style="width: 50px;text-align: center;" value=' + data + ' >';
                        //                //disabled = "disabled"
                        //            },
                        //        },
                        //        {
                        //            title: "Process Qty", data: "PQty",
                        //            render: function (data) {

                        //                return '<input type="text" class="txtproqty editor-active"  style="width: 50px;text-align: center;" value=' + data + ' >';
                        //            },
                        //        },
                        //    ]
                        //});

                    }
                }
                //LoadColorDDL("#ddlprocecolor");
            },
            failure: function (errMsg) {
                alert(errMsg);
            }
        });
    }
    else if (Type == "Size") {
        $.ajax({
            type: "POST",
            url: '/Trims/GetTrimsSizeDetForEdit/',
            data: JSON.stringify({ OrderNo: OrderNo, ItemId: ItemId, Styleid: StyleId, PlanType: 2, applyid: ApplyID }),
            //data: JSON.stringify({ OrderNo: OrderNo, ItemId: ItemId, StyleId: StyleId, PlanType: 2 }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (json) {
                var tableload = json.Value
                comboSizeList = tableload;

                //Sorting by
                comboSizeList.sort(function (a, b) {
                    return a.AccReqDetId - b.AccReqDetId
                })

                if (comboSizeList != null) {
                    for (var f = 0; f < comboSizeList.length; f++) {
                        if (AccColorID == 0) {
                            AccColorID = comboSizeList[f].AccColorId;
                        }
                        if (allowance == 0) {
                            allowance = comboSizeList[f].Allow;
                        }
                        if (divmulid == 0) {
                            divmulid = comboSizeList[f].DivOrMul;
                        }
                    }

                    $("#ddlcolordet").val(AccColorID);
                    $("#txtallow").val(allowance);
                    if (divmulid == "M") {
                        $("#ddltoarriveqty").val(1);
                    }
                    else {
                        $("#ddltoarriveqty").val(2);
                    }

                    if (Mode == 1 || Mode == 2) {
                        ////if (comboSizeList.length > 0) {
                        //var inputcount = 0;
                        //$('#tblsizedetails tr').each(function () {
                        //    inputcount++;
                        //});

                        //if (inputcount > 0) {
                        //    //var tableinput = $('#tblinnergrid').DataTable();
                        //    //tableinput.clear().draw();
                        //    $('#tblsizedetails').DataTable().destroy();
                        //}
                        ////}
                        LoadComboSize(comboSizeList);

                        if (comboShipList.length > 0 && comboShipList != null) {
                            var shiprowval = comboShipList[0].shiprowid;

                            sizelist = $.grep(comboSizeList, function (v) {
                                return v.ShipRowId == shiprowval;
                            });
                            LoadComboSize(sizelist);
                        }
                        chk(Type, ApplyTypeId);
                        //$('#tblsizedetails').DataTable({
                        //    data: comboSizeList,
                        //    columns: [
                        //        { title: "SizeId", data: "SizeId", "visible": false },
                        //        { title: "Size", data: "Size" },
                        //             { title: "Quantity", data: "Qty" },
                        //             { title: "Req.Size", data: "Size" },
                        //             //{ title: "Qty / Unit", data: "UOM" },
                        //             {
                        //                 title: "Qty / Unit", data: "QUnit",
                        //                 render: function (data) {
                        //                     return '<input type="text" id="txtqunit" class="editor-active"  style="width: 50px;text-align: center;" disabled = "disabled" value=' + data + ' >';
                        //                     //onkeyup="ProQtyCal();"
                        //                 },
                        //             },
                        //             //{ title: "Req Qty", data: "PQty" },
                        //             {
                        //                 title: "Req. Qty", data: "ReqQty",
                        //                 render: function (data) {
                        //                     return '<input type="text" class="txtSizeReqQty editor-active"  style="width: 50px;text-align: center;" value=' + data + ' >';
                        //                     //disabled = "disabled"
                        //                 },
                        //             },
                        //             { title: "UOM", data: "UOM" },
                        //             //{
                        //             //    title: "ACTION", "mDataProp": null,
                        //             //    "sDefaultContent": '<button type="button" class="btnrowsizesubmit"> Submit</button>'
                        //             //}
                        //             //{
                        //             //    title: "Action", "mDataProp": null,
                        //             //    "sDefaultContent": '<button type="button" class="btnedit"> Edit </button> <a id=" 1 " onclick="return DeleteChild(this)" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="1"><i class="fa fa-trash-o" style="cursor: pointer;"></i></a>'
                        //             //    //"sDefaultContent": '<button type="button" class="btnshipedit"> Edit </button><button type="button" class="btnshipView"> View Item </button>'//<button type="button" class="btnremove"> Remove </button><i class="fa fa-trash-o" style="cursor: pointer;"></i></a>
                        //             //},
                        //    ]
                        //});
                    }
                }
            },
            failure: function (errMsg) {
                alert(errMsg);
            }
        });
    }
    else if (Type == "Style") {
        $.ajax({
            type: "POST",
            url: '/Trims/GetTrimsStyleDetForEdit/',
            data: JSON.stringify({ OrderNo: OrderNo, ItemId: Itemid, Styleid: StyleId }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (json) {
                var tableload = json.Value
                comboStyleList = tableload;

                LoadComboStyle(comboStyleList);
                if (comboShipList.length > 0 && comboShipList != null) {
                    var shiprowval = comboShipList[0].shiprowid;

                    stylelist = $.grep(comboStyleList, function (v) {
                        return v.ShipRowId == shiprowval;
                    });
                    LoadComboStyle(stylelist);
                }
                chk(Type, ApplyTypeId);
            },
            failure: function (errMsg) {
                alert(errMsg);
            }
        });
    }
    else if (Type == "General") {
        var Apply = 0;
        var plantypeid = 0;
        if (ApplyType == "Auto") { Apply = "A" } else if (ApplyType == "Manual") { Apply = "M" } else if (ApplyType == "Shipment") { Apply = "S" }
        if (PlanType == "Color") { plantypeid = 1 } else if (PlanType == "Size") { plantypeid = 2 } else if (PlanType == "Style") { plantypeid = 3 } else if (PlanType == "General") { plantypeid = 4 }

        $.ajax({
            type: "POST",
            url: '/Trims/GetTrimsGeneralDetForEdit/',
            data: JSON.stringify({ ApplyType: Apply, OrderNo: OrderNo, ItemId: Itemid, StyleItemid: headitemid, Styleid: StyleId, PlanTypeId: plantypeid }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (json) {
                var tableload = json.Value;
                if (ApplyType == "Auto" && PlanType == "General") {
                    genautoList = tableload;

                    if (genautoList.length > 0 && genautoList != null) {
                        $('#txtallow').val(genautoList[0]["Allow"]);
                        $('#txtitemdis').val(EditItemName);
                        if (genautoList[0]["DivOrMul"] == 'M') { $("#ddltoarriveqty").val(1); } else if (genautoList[0]["DivOrMul"] == 'D') { $("#ddltoarriveqty").val(2); }
                    }

                    loadGenAuto(genautoList);
                }
                else if (ApplyType == "Manual" && PlanType == "General") {
                    genmanualList = tableload;

                    if (genmanualList.length > 0 && genmanualList != null) {
                        $('#txtallow').val(genmanualList[0]["Allow"]);
                        $('#txtitemdis').val(EditItemName);
                        if (genmanualList[0]["DivOrMul"] == 'M') { $("#ddltoarriveqty").val(1); } else if (genmanualList[0]["DivOrMul"] == 'D') { $("#ddltoarriveqty").val(2); }
                    }

                    loadGenAuto(genmanualList);
                }
                else if (ApplyType == "Shipment" && PlanType == "General") {
                    genshipmentList = tableload;

                    if (genshipmentList.length > 0 && genshipmentList != null) {
                        $('#txtallow').val(genshipmentList[0]["Allow"]);
                        $('#txtitemdis').val(EditItemName);
                        if (genshipmentList[0]["DivOrMul"] == 'M') { $("#ddltoarriveqty").val(1); } else if (genshipmentList[0]["DivOrMul"] == 'D') { $("#ddltoarriveqty").val(2); }
                    }

                    var GenShiplist = $.grep(genshipmentList, function (v) {
                        return v.ShipRowId == shiprowid;
                    });

                    LoadGenShipmentDet(GenShiplist);
                }
                //if (comboShipList.length > 0 && comboShipList != null) {
                //    var shiprowval = comboShipList[0].shiprowid;

                //    stylelist = $.grep(comboStyleList, function (v) {
                //        return v.ShipRowId == shiprowval;
                //    });
                //    LoadComboStyle(stylelist);
                //}
                chk(Type, ApplyTypeId);
            },
            failure: function (errMsg) {
                alert(errMsg);
            }
        });
    }
}
function myLenFunction(Len) {
    GLen = Len;
}

//function loadReqcolorlist(val) {
//    debugger;
//    var ReqColid = 0;

//    var table = $('#tblstyledetails').DataTable();
//    ReqColid = table.row($(this).parents('tr')).data()["PColorid"];

//}

function loadcolorlist(val) {
    debugger;
    var PColid = 0;

    var table = $('#tblcolordet').DataTable();
    PColid = table.row($(this).parents('tr')).data()["PColorid"];

}

function loadsizelist(val) {
    debugger;
    var PSizeid = 0;

    var table = $('#tblsizedetails').DataTable();
    PSizeid = table.row($(this).parents('tr')).data()["AccSizeId"];

}


function loadData() {
    $.ajax({
        type: "POST",
        url: '/Trims/GetJobOrder/',
        data: JSON.stringify({ OrderNo: ordertt }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            var tableload = json.data

            if (tableload != undefined && tableload.length > 0) {
                $('#txtCompany').val(obj[0]["Company"]);
                $('#txtBuyer').val(obj[0]["Buyer"]);
                $('#txtStyle').val(obj[0]["Style"]);
                $('#txtprodqty').val(obj[0]["Quantity"]);
                $('#txtOrderNo').val(obj[0]["OrderNo"]);
                $('#txtRefNo').val(obj[0]["RefNo"]);
                //$('#txtitem').val(obj[0]["JobOrderNo"]);
                $('#txtDate').val(obj[0]["OrderDate"]);
            }
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function Styvalidate() {
    debugger;
    var isValid = true;

    if ($('#txttempname').val() == '') {
        $('#txttempname').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txttempname').css('border-color', 'lightgrey');
    }

}

function validate() {
    debugger;
    var isValid = true;
    if (PlanType == "Color") {
        if ($('#ddlsizedet').val() == 0) {
            //$('#ddlsizedet').css('border-color', 'Red');
            $('#ddlsizedet').siblings(".select2-container").css('border', '1px solid red');

            isValid = false;
        }
        else {
            $('#ddlsizedet').siblings(".select2-container").css('border', '1px solid lightgrey');
        }
    }
    else if (PlanType == "Size") {
        if ($('#ddlcolordet').val() == 0) {
            //$('#ddlcolordet').css('border-color', 'Red');
            $('#ddlcolordet').siblings(".select2-container").css('border', '1px solid red');

            isValid = false;
        }
        else {
            $('#ddlcolordet').siblings(".select2-container").css('border', '1px solid lightgrey');
        }
    }

    return isValid;
}

function Update() {
    debugger;
    var res = validate();
    if (res == false) {
        return false;
    }
    //var clist = [];
    //if (comboColorList.length > 0) {
    //    for (var r = 0; r < comboColorList.length; r++) {
    //        var obj = {
    //            TotalQty: comboColorList[r].ReqQty,
    //            BOMQty: comboColorList[r].PQty,
    //            AccReqDetID: comboColorList[r].AccReqDetId,
    //        }
    //        clist.push(obj);
    //    }
    //}
    var TotQty = 0;
    if (comboColorList.length > 0) {
        for (var f = 0; f < comboColorList.length; f++) {
            if (TotQty == 0) {
                TotQty = comboColorList[f].ReqQty;
            }
            else {
                TotQty = parseInt(TotQty) + parseInt(comboColorList[f].ReqQty);
            }
        }
        var CList = $.grep(comboColorList, function (e) {
            return e.ReqQty != 0;
        });

        if (CList.length == 0) {
            alert('Fill Qty for atleast any one...');
            return false;
        }
    }
    else if (comboSizeList.length > 0) {
        for (var f = 0; f < comboSizeList.length; f++) {
            if (TotQty == 0) {
                TotQty = comboSizeList[f].ReqQty;
            }
            else {
                TotQty = parseInt(TotQty) + parseInt(comboSizeList[f].ReqQty);
            }
        }

        var CList = $.grep(comboSizeList, function (e) {
            return e.ReqQty != 0;
        });

        if (CList.length == 0) {
            alert('Fill Qty for atleast any one...');
            return false;
        }
    }
    else if (comboStyleList.length > 0) {
        for (var f = 0; f < comboStyleList.length; f++) {
            if (TotQty == 0) {
                TotQty = comboStyleList[f].ReqQty;
            }
            else {
                TotQty = parseInt(TotQty) + parseInt(comboStyleList[f].ReqQty);
            }
        }

        var CList = $.grep(comboStyleList, function (e) {
            return e.ReqQty != 0;
        });

        if (CList.length == 0) {
            alert('Fill Qty for atleast any one...');
            return false;
        }
    }
    else if (genautoList.length > 0) {
        for (var f = 0; f < genautoList.length; f++) {
            if (TotQty == 0) {
                TotQty = genautoList[f].TotQty;
            }
            else {
                TotQty = parseInt(TotQty) + parseInt(genautoList[f].TotQty);
            }
        }

        var CList = $.grep(genautoList, function (e) {
            return e.ReqQty != 0;
        });

        if (CList.length == 0) {
            alert('Fill Qty for atleast any one...');
            return false;
        }
    }
    else if (genmanualList.length > 0) {
        for (var f = 0; f < genmanualList.length; f++) {
            if (TotQty == 0) {
                TotQty = genmanualList[f].TotQty;
            }
            else {
                TotQty = parseInt(TotQty) + parseInt(genmanualList[f].TotQty);
            }
        }

        var CList = $.grep(genmanualList, function (e) {
            return e.ReqQty != 0;
        });

        if (CList.length == 0) {
            alert('Fill Qty for atleast any one...');
            return false;
        }
    }
    else if (genshipmentList.length > 0) {
        for (var f = 0; f < genshipmentList.length; f++) {
            if (TotQty == 0) {
                TotQty = genshipmentList[f].TotQty;
            }
            else {
                TotQty = parseInt(TotQty) + parseInt(genshipmentList[f].TotQty);
            }
        }

        var CList = $.grep(genshipmentList, function (e) {
            return e.ReqQty != 0;
        });

        if (CList.length == 0) {
            alert('Fill Qty for atleast any one...');
            return false;
        }
    }

    var OrderNo = $('#txtOrderNo').val();
    var EntryDate = $('#txtDate').val();//new Date($('#txtDate').val());
    var StyleId = $('#txtHStyleId').val();
    var BuyOrdMasId = $('#txtBuyOrdMasId').val();
    //var ItemId = $('#txtitemidaccmas').val();
    var AccColorId = $('#ddlcolordet').val();
    var AccSizeId = $('#ddlsizedet').val();

    //var ItemListObj = {
    //    AccReqMasID: 0,
    //    //itemrowseq: itemseq,
    //    ItemName: $("#ddlitemvar option:selected").text(),
    //    ItemId: $('#ddlitemvar').val(),
    //    quantity: $('#txtqty').val(),
    //    Unitid: $('#txtuomid').val(),
    //    UOM: $('#txtuom').val(),
    //    PlanType: $("#ddlplantype option:selected").text(),
    //    Type: $('#ddlplantype').val(),
    //    Apply: $("#ddlapply option:selected").text(),
    //    ApplyID: $('#ddlapply').val(),
    //    DivMul: $("#ddltoarriveqty option:selected").text(),
    //    AutoOrMan: $('#ddlapply').val(),
    //    ProdOrOrd: "P",
    //    ItemRemarks: "Test Remarks",
    //    AddDate: new Date(),
    //    LockRow: "Y",
    //    Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
    //};

    var TrimObj = {
        OrderNo: OrderNo,
        EntryDate: $('#txtDate').val(),//new Date($('#txtDate').val()),
        Allowance: $('#txtallow').val(),
        AddDate: new Date(),
        AutoOrMan: ApplyID,
        DivMul: $("#ddltoarriveqty option:selected").text(),
        StyleId: StyleId,
        AccColorID: AccColorId,
        AccSizeID: AccSizeId,
        ItemId: QryItemId,//Itemid,
        quantity: TotQty,
        UnitId: Editunitid,
        BuyOrdMasId: BuyOrdMasId,
        AccReqMas: comboItemList,
        ComboShipList: comboShipList,
        ComboColorList: comboColorList,
        ComboSizeList: comboSizeList,
        ComboStyleList: comboStyleList,
        GenAutoList: genautoList,
        GenManualList: genmanualList,
        Mode: Mode,
        ProdOrOrd: "P",
        LockRow: "Y",
        GenPlanType: "O",
        Amend: "P",
        ItemRemarks: "",
        Companyid: $('#txtHCompanyId').val(),
        PlanType: PlanType,
        PlanId: PLID,
        CreatedBy: GUserid,
    };

    //var AccColorId = $('#ddlcolordet').val();
    //var AccSizeId = $('#ddlsizedet').val();
    //var OrderNo = $('#txtOrderNo').val();
    //var StyleId = $('#txtHStyleId').val();

    //var TrimObj = {
    //    OrderNo: OrderNo,
    //    EntryDate: new Date($('#txtDate').val()),
    //    Allowance: $('#txtallow').val(),
    //    StyleId: StyleId,
    //    AccColorID: AccColorId,
    //    AccSizeID: AccSizeId,
    //    //ItemId: QryItemId,
    //    quantity: TotQty,
    //    //BuyOrdMasId: BuyOrdMasId,
    //    AccReqMas: comboItemList,
    //    ComboColorList: comboColorList,
    //    ComboSizeList: comboSizeList,
    //    ComboStyleList: comboStyleList,
    //    GenAutoList: genautoList,
    //    GenManualList: genmanualList,
    //    Mode: Mode,
    //};
    LoadingSymb();
    $("#btnUpdate").attr("disabled", true);
    $.ajax({
        url: "/Trims/Update",
        data: JSON.stringify(TrimObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Status == "SUCCESS") {
                alert("Record Updated successfully...");
                $('#myModal1').modal('hide');
                AddUserEntryLog('Planing', 'Trims Requirement', 'UPDATE', $('#txtOrderNo').val());
                Mode = 0;
                LoadPlanItemDetails(QryItemId, StyleRowId);
            }
            else {
                alert("Record Updated failed...");
            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });

}

function StyleAdd() {
    debugger;
    var res = Styvalidate();
    if (res == false) {
        return false;
    }
    if (ComboMainGrid.length == 0) {
        alert("Please make any Accessories...");
    }
    else {
        var StyleId = $('#txtHStyleId').val();
        var Orderno = $('#txtOrderNo').val();
        var stylename = $('#txttempname').val();

        $.ajax({
            url: "/Trims/AddStyleTemplate",
            data: JSON.stringify({ OrderNo: Orderno, Styleid: StyleId, StyleName: stylename }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                debugger;
                if (result.Status == "SUCCESS") {
                    alert("Record saved successfully...");
                    $('#myModal3').modal('hide');
                }
                else {
                    alert("Record saved failed...");
                }
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

function Add() {
    debugger;
    var res = validate();
    if (res == false) {
        return false;
    }
    if (combocoltmplst.length > 0) {
        comboColorList = combocoltmplst;
    }

    if (combosiztmplst.length > 0) {
        comboSizeList = combosiztmplst;
    }

    if (combostytmplst.length > 0) {
        comboStyleList = combostytmplst;
    }

    var TotQty = 0;
    if (comboColorList.length > 0) {
        for (var f = 0; f < comboColorList.length; f++) {
            if (TotQty == 0) {
                TotQty = comboColorList[f].ReqQty;
            }
            else {
                TotQty = parseInt(TotQty) + parseInt(comboColorList[f].ReqQty);
            }
        }

        var CList = $.grep(comboColorList, function (e) {
            return e.ReqQty != 0;
        });

        if (CList.length == 0) {
            alert('Fill Qty for atleast any one...');
            return false;
        }
    }
    else if (comboSizeList.length > 0) {
        for (var f = 0; f < comboSizeList.length; f++) {
            if (TotQty == 0) {
                TotQty = comboSizeList[f].ReqQty;
            }
            else {
                TotQty = parseInt(TotQty) + parseInt(comboSizeList[f].ReqQty);
            }
        }
        var CList = $.grep(comboSizeList, function (e) {
            return e.ReqQty != 0;
        });

        if (CList.length == 0) {
            alert('Fill Qty for atleast any one...');
            return false;
        }
    }
    else if (comboStyleList.length > 0) {
        for (var f = 0; f < comboStyleList.length; f++) {
            if (TotQty == 0) {
                TotQty = comboStyleList[f].ReqQty;
            }
            else {
                TotQty = parseInt(TotQty) + parseInt(comboStyleList[f].ReqQty);
            }
        }
        var CList = $.grep(comboStyleList, function (e) {
            return e.ReqQty != 0;
        });

        if (CList.length == 0) {
            alert('Fill Qty for atleast any one...');
            return false;
        }
    }
    else if (genautoList.length > 0) {
        for (var f = 0; f < genautoList.length; f++) {
            if (TotQty == 0) {
                TotQty = genautoList[f].TotQty;
            }
            else {
                TotQty = parseInt(TotQty) + parseInt(genautoList[f].TotQty);
            }
        }
        var CList = $.grep(genautoList, function (e) {
            return e.ReqQty != 0;
        });

        if (CList.length == 0) {
            alert('Fill Qty for atleast any one...');
            return false;
        }
    }
    else if (genmanualList.length > 0) {
        for (var f = 0; f < genmanualList.length; f++) {
            if (TotQty == 0) {
                TotQty = genmanualList[f].TotQty;
            }
            else {
                TotQty = parseInt(TotQty) + parseInt(genmanualList[f].TotQty);
            }
        }
        var CList = $.grep(genmanualList, function (e) {
            return e.ReqQty != 0;
        });

        if (CList.length == 0) {
            alert('Fill Qty for atleast any one...');
            return false;
        }
    }
    else if (genshipmentList.length > 0) {
        for (var f = 0; f < genshipmentList.length; f++) {
            if (TotQty == 0) {
                TotQty = genshipmentList[f].TotQty;
            }
            else {
                TotQty = parseInt(TotQty) + parseInt(genshipmentList[f].TotQty);
            }
        }
        var CList = $.grep(genshipmentList, function (e) {
            return e.ReqQty != 0;
        });

        if (CList.length == 0) {
            alert('Fill Qty for atleast any one...');
            return false;
        }


    }

    if (PlanType == "General" && ApplyType == "Auto") {
        if (genautoList.length == 0) {
            alert("Please Enter the Item Details..");
            return true;
        }
    }

    if (PlanType == "General" && ApplyType == "Manual") {
        if (genmanualList.length == 0) {
            alert("Please Enter the Item Details..");
            return true;
        }
    }

    var OrderNo = $('#txtOrderNo').val();
    var EntryDate = $('#txtDate').val(); //new Date($('#txtDate').val());
    var StyleId = $('#txtHStyleId').val();
    var BuyOrdMasId = $('#txtBuyOrdMasId').val();
    //var ItemId = $('#txtitemidaccmas').val();
    var AccColorId = $('#ddlcolordet').val();
    var AccSizeId = $('#ddlsizedet').val();

    var TrimObj = {
        OrderNo: OrderNo,
        EntryDate: $('#txtDate').val(),//new Date($('#txtDate').val()),
        Allowance: $('#txtallow').val(),
        StyleId: StyleId,
        AccColorID: AccColorId,
        AccSizeID: AccSizeId,
        ItemId: QryItemId,
        quantity: TotQty,
        BuyOrdMasId: BuyOrdMasId,
        AccReqMas: comboItemList,
        ComboShipList: comboShipList,
        ComboColorList: comboColorList,
        ComboSizeList: comboSizeList,
        ComboStyleList: comboStyleList,
        GenAutoList: genautoList,
        GenManualList: genmanualList,
        GenShipmentList: genshipmentList,
        Mode: Mode,
        Companyid: $('#txtHCompanyId').val(),
        PlanType: PlanType,
        PlanId: PLID,
        CreatedBy: GUserid,
    };

    var cnt = $("#tblcolordet tr").length - 1;
    for (var i = 1; i <= cnt; i++) {
        var OCId = $("#tblcolordet tr:eq(" + i + ") td:eq(3)").val();
        //var OSizeId = $("#tblcolordet tr:eq(" + i + ") td:eq(5)").html();
        //var OCmSNo = $("#tblcolordet tr:eq(" + i + ") td:eq(0)").html();
    }

    if (comboItemList != undefined && comboItemList.length > 0) {
        //if (comboColorList != undefined && comboColorList.length > 0)
        //{
        //    var table = $('#tblcolordet').DataTable();

        //    var data = table.rows().data();
        //    comboColorList = data;

        //    //data.each(function (value, index) {
        //    //    console.log('Data in index: ' + index + ' is: ' + value);
        //    //});
        //}

        //$('#btnAdd').hide();
        $("#btnAdd").attr("disabled", true);
        LoadingSymb();
        $.ajax({
            url: "/Trims/Add",
            //data: JSON.stringify({ AccReqMas: comboItemList, ComboColorList: comboColorList, ComboSizeList: comboSizeList, Orderno: OrderNo, Entrydate: EntryDate, Styleid:StyleId,BuyOrdMasid:BuyOrdMasId}),
            data: JSON.stringify(TrimObj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                debugger;
                if (result.Status == "SUCCESS") {
                    alert("Record saved successfully...");
                    $('#myModal1').modal('hide');
                    Mode = 0;
                    fnLoadMainGridOnEditMode();
                    AddUserEntryLog('Planing', 'Trims Requirement', 'ADD', $('#txtOrderNo').val());
                    combocoltmplst = [];
                    comboColorList = [];
                    combosiztmplst = [];
                    comboSizeList = [];
                    combostytmplst = [];
                    comboStyleList = [];
                    genautoList = [];
                    genmanualList = [];
                    genshipmentList = [];
                    shiprowid = 0;
                    //clearTextBox();
                }
                else {
                    alert("Record saved failed...");
                }


            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

function clearTextBox() {
    $('#tblcolordet').DataTable().destroy();
    $('#tblsizedetails').DataTable().destroy();
}

function fnLoadMainGridOnEditMode() {
    debugger;
    var orderno = $('#txtOrderNo').val();
    var itemid = $('#txtHItemId').val();
    var styleid = $('#txtHStyleId').val();

    $.ajax({
        url: "/Trims/GetItemList",
        data: JSON.stringify({ OrderNo: orderno, StyleId: styleid, Itemid: itemid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result != undefined) {
                //comboItemList = result;
                ComboMainGrid = result;
                //Sorting by
                ComboMainGrid.sort(function (a, b) {
                    return a.Sno - b.Sno
                })

                loadItemTable(ComboMainGrid);
            }
            else {
                loadItemTable(ComboMainGrid);
            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function loadItemTable(comboItemList) {
    $('#tblshipmentdetails').DataTable().destroy();

    $('#tblshipmentdetails').DataTable({
        data: comboItemList,
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
            { title: "Sno", data: "Sno", "visible": false },
            //{ title: "RowSeq", data: "itemrowseq", "visible": false },
            { title: "Rate", data: "Rate", "visible": false },
            { title: "ItemID", data: "ItemId", "visible": false },
            { title: "ITEM", data: "ItemName" },
            { title: "QTY", data: "quantity" },
            { title: "UomID", data: "Unitid", "visible": false },
            { title: "UOM", data: "UOM" },
             { title: "Item Remarks", data: "ItemRemarks" },
            { title: "PlanId", data: "Type", "visible": false },
            { title: "PLAN TYPE", data: "PlanType" },
            { title: "ApplyId", data: "ApplyID", "visible": false },
            { title: "APPLY", data: "Apply" },
               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<button type="button" data-toggle="modal" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" data-target="#myModal1" class="btnrowedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button><button type="button" title="Delete" data-toggle="modal" data-target="#myModal1" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnrowdelete btn btn-danger btn-round"> <i class="fa fa-times"></i> </button>'
                   //"sDefaultContent": '<button type="button" data-toggle="modal" data-target="#myModal1" class="btnrowadd"> Add </button> <button type="button" data-toggle="modal" data-target="#myModal1" class="btnrowedit"> Edit </button> <button type="button" class="btnitemremove"> Remove </button>'
               }
        ]
    });
}

function CheckDuplicateItem(GItemId, AItemId, PlnType, AppType) {

    var COrdNo = $('#txtOrderNo').val();
    var CStyleId = $('#txtHStyleId').val();
    $.ajax({
        url: "/Trims/CheckItemDetails",
        data: JSON.stringify({ OrderNo: COrdNo, StyleId: CStyleId, Itemid: GItemId, CAItemId: AItemId, ApplyID: PlnType, AutoOrMan: AppType }),
        type: "POST",
        //async: false,
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            if (obj != undefined) {


                var CItemDup = obj[0]["ChkCountAccReqNo"];
                //var CJob = obj[0]["CheckJob"];

                if (CItemDup > 0) {

                    alert("This Item has been Already Made for Same PlanType and ApplyType in Previous,Please Check it....");
                    $('#myModal1').modal('hide');
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