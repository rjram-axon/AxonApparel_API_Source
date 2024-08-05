var CompanyId = 0;
var Itmdet = [];
var ItmSavedet = [];
var Stkdet = [];
var StkSavedet = [];
var AccList = [];
var uomid = 0;
var index = -1;
var ind = -1;
var Issueid = 0;
var Mode = 0;
var Userid = 0;
var UserName = 0;
var MainFDate = 0;
var Guserid = 0;
var GUnitType = 0;
var GOType = 0;
var GEReqNo = 0;
var GUnSuppId = 0;
var indiptitm = -1;
var DCompid = 0;
var LoginUserid = '';
var editmasunitstore = 0;
var CompanyId = 0;
var validatestore = "False";
$(document).ready(function () {
    debugger;
    Guserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    DCompid = $("#hdnDCompid").data('value');
    LoginUserid = $("#hdnLoginUserid").data('value');
    validatestore = $("#hdnValidateStore").data('value');
    LoadCompanyDDL("#ddlCompany,#ddlMCompany");
    LoadSupplierDDL("#ddlSupplier,#ddlMSupplier");
    LoadBuyerDDL("#ddlBuyer");
    LoadCompanyUnitDDL("#ddlCmpanyunit,#ddlMUnit");
    LoadProcessDDL("#ddlProcess,#ddlMProcess,#ddlLastProcess");
    LoadWorkdivisionDDL("#ddlDivision");
    LoadStoreUnitDDL("#ddlTostore");
    LoadItemGroupDDL("#ddlItemGroup");
    LoadColorDDL("#ddlcolor");
    LoadSizeDDL("#ddlSize");
    LoadItemDDL("#ddlItem");
    LoadAddlessDDL("#ddlAcc");
    LoadEmployeeDDL("#ddlRequestner");
    MainFDate = $("#hdMainFromDate").data('value');
    LoadOrderNoDDL("#ddlOrderNo");
    getDate();

    $('#HReqId').hide();

    var protype = $('input[name="MOType"]:checked').attr('value');
    if (protype == 'U') {
        $('#buyer').hide();
        $('#supp').hide();
    }
    else if (protype == 'S') {
        $("#unit").hide();
        $('#buyer').hide();
    }
    else if (protype == 'B') {
        $("#unit").hide();
        $('#supp').hide();
    }


    ddlmain();
    LoadMaingrid();
    $('#btnitmadd').click(function () {
        debugger;
        var isAllValid = true;
        var lengdp = 0;

        if ($('#ddlItemGroup').val() == "0") {
            isAllValid = false;
            //$('#ddlItemGroup').siblings('span.error').css('visibility', 'visible');
            $('#ddlItemGroup').siblings(".select2-container").css('border', '1px solid red');
        }
        else {
            //$('#ddlItemGroup').siblings('span.error').css('visibility', 'hidden');
            $('#ddlItemGroup').siblings(".select2-container").css('border', '1px solid lightgrey');
        }

        if ($('#ddlItem').val() == "0") {
            isAllValid = false;
            //$('#ddlItem').siblings('span.error').css('visibility', 'visible');
            $('#ddlItem').siblings(".select2-container").css('border', '1px solid red');
        }
        else {
            // $('#ddlItem').siblings('span.error').css('visibility', 'hidden');
            $('#ddlItem').siblings(".select2-container").css('border', '1px solid lightgrey');
        }

        if ($('#ddlcolor').val() == "0") {
            isAllValid = false;
            //$('#ddlcolor').siblings('span.error').css('visibility', 'visible');
            $('#ddlcolor').siblings(".select2-container").css('border', '1px solid red');
        }
        else {
            //$('#ddlcolor').siblings('span.error').css('visibility', 'hidden');
            $('#ddlcolor').siblings(".select2-container").css('border', '1px solid lightgrey');
        }
        if ($('#ddlSize').val() == "0") {
            isAllValid = false;
            //$('#ddlSize').siblings('span.error').css('visibility', 'visible');
            $('#ddlSize').siblings(".select2-container").css('border', '1px solid red');
        }
        else {
           // $('#ddlSize').siblings('span.error').css('visibility', 'hidden');
            $('#ddlSize').siblings(".select2-container").css('border', '1px solid lightgrey');
        }

        if ($('#txtRate').val() == "") {
            isAllValid = false;
           // $('#txtRate').siblings('span.error').css('visibility', 'visible');
            $('#txtRate').css('border-color', 'Red');
        }
        else {
           // $('#txtRate').siblings('span.error').css('visibility', 'hidden');
            $('#txtRate').css('border-color', 'lightgrey');
        }
        //if ($('#txtStockQty').val() == "") {
        //    isAllValid = false;
        //    $('#txtStockQty').siblings('span.error').css('visibility', 'visible');
        //}
        //else {
        //    $('#txtStockQty').siblings('span.error').css('visibility', 'hidden');
        //}
        //if ($('#txtSecQty').val() == "") {
        //    isAllValid = false;
        //    $('#txtSecQty').siblings('span.error').css('visibility', 'visible');
        //}
        //else {
        //    $('#txtSecQty').siblings('span.error').css('visibility', 'hidden');
        //}
        if (Itmdet.length == 0) {
            lengdp = 1;
        }
        else {
            lengdp = Itmdet.length + 1;
        }
        if (isAllValid) {

            var DetObj = {
                slno: lengdp,
                IssueDetId: 0,
                Itmgrpid: $("#ddlItemGroup option:selected").val(),
                Itmgrp: $("#ddlItemGroup option:selected").text(),
                ItemID: $("#ddlItem option:selected").val(),
                Item: $("#ddlItem option:selected").text(),
                ColorID: $("#ddlcolor option:selected").val(),
                color: $("#ddlcolor option:selected").text(),
                SizeID: $("#ddlSize option:selected").val(),
                size: $("#ddlSize option:selected").text(),
                Uomid: uomid,
                stkqty: $("#txtStockqty").val(),
                uom: $("#txtUom").val(),
                Quantity: $("#txtIssueQty").val(),
                Rate: $("#txtRate").val(),
                sQty: $("#txtSecQty").val(),
                suom: $("#txtSecUom").val(),
                amount: $("#txtAmnt").val()

            }
            Itmdet.push(DetObj);
            //ItmSavedet.push(DetObj);
            LoadItmtab(Itmdet);
            //LoadItmSavetab(ItmSavedet);


           //// LoadReqItem();
           // var total = 0;
           // for (var e = 0; e < Itmdet.length; e++) {
           //     var amount = Itmdet[e].amount;
           //     total = total + parseFloat(amount);

           // }
           // $("#txttotalamt").val(total);
            //$("#txtGrossAmount").val(total);
            LoadNetGrossAmt();
        }
        fnClearcDetailsControls();
    });
    
    $(document).on('click', '.btnitmedit', function () {
        rowindex = $(this).closest('tr').index();

        var cur1 = Itmdet.slice(rowindex);

        $('#ddlItemGroup').val(cur1[0]['Itmgrpid']);
        $('#ddlItem').val(cur1[0]['ItemID']);
        $('#ddlcolor').val(cur1[0]['ColorID']);
        $('#ddlSize').val(cur1[0]['SizeID']);
        $('#txtStockqty').val(cur1[0]['stkqty']);
        $('#txtUom').val(cur1[0]['uom']);

        $('#txtIssueQty').val(cur1[0]['Quantity']);
        $('#txtRate').val(cur1[0]['Rate']);
        $('#txtSecQty').val(cur1[0]['sQty']);
        $('#txtSecUom').val(cur1[0]['suom']);
        $('#txtAmnt').val(cur1[0]['amount']);


        $('#btnitmadd').hide();
        $('#btnitemupdate').show();
    });
    $('#btnitemupdate').click(function () {
        debugger;
        debugger;
        var currentrowsel = Itmdet.slice(rowindex);
        currentrowsel[0]['Itmgrpid'] = $("#ddlItemGroup").val();
        currentrowsel[0]['Itmgrp'] = $("#ddlItemGroup option:selected").text();
        currentrowsel[0]['ItemID'] = $("#ddlItem").val();
        currentrowsel[0]['Item'] = $("#ddlItem option:selected").text();
        currentrowsel[0]['ColorID'] = $("#ddlcolor").val();
        currentrowsel[0]['color'] = $("#ddlcolor option:selected").text();
        currentrowsel[0]['SizeID'] = $("#ddlSize").val();
        currentrowsel[0]['size'] = $("#ddlSize  option:selected").text();
        currentrowsel[0]['sQty'] = $("#txtSecQty").val();

        currentrowsel[0]['stkqty'] = $("#txtStockqty").val();
        currentrowsel[0]['uom'] = $("#txtUom").val();
        currentrowsel[0]['Quantity'] = $("#txtIssueQty").val();

        currentrowsel[0]['suom'] = $("#txtSecUom").val();
        currentrowsel[0]['amount'] = $("#txtAmnt").val();
        currentrowsel[0]['Rate'] = $("#txtRate").val();
        Itmdet[rowindex] = currentrowsel[0];
        //ItmSavedet[rowindex] = currentrowsel[0];

        LoadItmtab(Itmdet);
        //LoadItmSavetab(ItmSavedet);

        var total = 0;
        for (var e = 0; e < Itmdet.length; e++) {
            var amount = Itmdet[e].amount;
            total = total + parseFloat(amount);

        }
        //$("#txttotalamt").val(total);
        //$("#txtGrossAmount").val(total);
        LoadNetGrossAmt();
        $('#btnitemupdate').hide();
        $('#btnitmadd').show();
        fnClearcDetailsControls();
    });
    $(document).on('click', '.btnitmremove', function () {
        rowindex = $(this).closest('tr').index();

        Itmdet.splice(rowindex, 1);
        document.getElementById("tblitemdetails").deleteRow(rowindex + 1);
        var total = 0;
        for (var e = 0; e < Itmdet.length; e++) {
            var amount = Itmdet[e].amount;
            total = total + parseFloat(amount);

        }
        //$("#txttotalamt").val(total);
        //$("#txtGrossAmount").val(total);
        //ItmSavedet.splice(rowindex, 1);
        // document.getElementById("tblitemSavedetails").deleteRow(rowindex + 1);
        LoadNetGrossAmt();
    });


    $('#tblitemdetails').on('click', 'tr', function (e) {
        debugger;



        var table = $('#tblitemdetails').DataTable();

        //var ItmId = table.row($(this).parents('tr')).data()["itmid"];
        //var ClrId = table.row($(this).parents('tr')).data()["clrid"];
        //var SzId = table.row($(this).parents('tr')).data()["sizeid"];

        var row = $(this).closest('tr');
        var data = $('#tblitemdetails').dataTable().fnGetData(row);


        var ItmId = data.ItemID;
        var ClrId = data.ColorID;
        var SzId = data.SizeID;

        //LoadReqItem();

        LoadStk(ItmId, ClrId, SzId, 0, 0, 0);

        //    var OQty = $(this).closest('tr').find('#txtRQty').val();


        var colorempty = [];
        colorempty = StkSavedet;

        colorempty = $.grep(colorempty, function (v) {
            return (v.itemid === ItmId && v.colorid === ClrId && v.sizeid === SzId);
        });

        Stkdet = colorempty;
        LoadStktab(Stkdet);


    });

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
                Addlessid: $('#ddlAcc').val(),
                PlusOrMinus: $('#txtPorMins').val(),
                Percentage: $('#txtPer').val(),
                Amount: $('#txtAmount').val(),
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
            //$('#txtAddLess').val(totalAccamnt.toFixed(3));

            //var GAmt = $('#txtGrossAmount').val();
            //var NAmt = $('#txtAddLess').val();
            //var FNAmt = parseFloat(GAmt) + parseFloat(NAmt);

            //$('#txtNetamt').val(FNAmt);
            // $('#txtBTotAmt').val(FNAmt);
            LoadNetGrossAmt();

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

        currentrowsel[0]['Addlessid'] = $("#ddlAcc").val();
        currentrowsel[0]['Addless'] = $("#ddlAcc option:selected").text();
        currentrowsel[0]['PlusOrMinus'] = $("#txtPorMins").val();
        currentrowsel[0]['Percentage'] = $("#txtPer").val();
        currentrowsel[0]['Amount'] = $("#txtAmount").val();

        AccList[rowindex] = currentrowsel[0];

        loadAccTable(AccList);

        $('#btnImupdate').hide();
        $('#btnImadd').show();

        // if (Mode == 0) {
        fnClearAccControls();
        //}
        //else {
        //    fnClearAccControls();

        //}
        // Mode = 0;
    });
    $(document).on('click', '.btnaccremove', function () {
        rowindex = $(this).closest('tr').index();
        AccList.splice(rowindex, 1);
        document.getElementById("tblPaydetails").deleteRow(rowindex + 1);
    });

    $(document).on('keyup', '.calcitmqty', function () {
        debugger;
        var table = $('#tblitemdetails').DataTable();
        var CSno = table.row($(this).parents('tr')).data()["slno"];
        var IId = table.row($(this).parents('tr')).data()["ItemID"];
        var CId = table.row($(this).parents('tr')).data()["ColorID"];
        var SId = table.row($(this).parents('tr')).data()["SizeID"];
        var balq = table.row($(this).parents('tr')).data()["stkqty"];
        var rate = table.row($(this).parents('tr')).data()["Rate"];

        var Val = $(this).val();

        if (parseFloat(Val) > parseFloat(balq)) {
            alert("StkrQty Should Not Greater then StockBalanceQty..");
            $.each(Itmdet, function () {
                if (this.slno == CSno) {
                    this.Quantity = 0;

                }
            });

            LoadItmtab(Itmdet);

            //$.each(ItmSavedet, function () {
            //    if (this.slno == CSno) {
            //        this.Quantity = 0;

            //    }
            //});

            //LoadItmSavetab(ItmSavedet);
            return true;
        }

        var amnt = parseFloat(Val) * rate;
        $.each(Itmdet, function () {
            if (this.slno == CSno) {
                this.Quantity = Val;
                // this.Rate = val;
                this.amount = amnt;
            }
        });



        LoadItmtab(Itmdet);

        //$.each(ItmSavedet, function () {
        //    if (this.slno == CSno) {
        //        this.Quantity = Val;
        //        // this.Rate = val;
        //        this.amount = amnt;
        //    }
        //});



        //LoadItmSavetab(ItmSavedet);
        var total = 0;
        for (var e = 0; e < Itmdet.length; e++) {
            var amount = Itmdet[e].amount;
            total = total + parseFloat(amount);

        }
        //$("#txttotalamt").val(total);
        //$("#txtGrossAmount").val(total);

        //var k = $("#txtAddLess").val();
        //var net = parseFloat(total) + parseFloat(k);
        //$("#txtNetamt").val(net);
        LoadNetGrossAmt();

        var pid = [];
        var bal = [];
        var qty = [];
        for (var t = 0; t < StkSavedet.length; t++) {
            if (StkSavedet[t].itemid == IId && StkSavedet[t].colorid == CId && StkSavedet[t].sizeid == SId) {
                pid.push(StkSavedet[t].Stockid);
                bal.push(StkSavedet[t].stkqty);
                qty.push(StkSavedet[t].IssStkQty);
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
        for (var u = 0; u < StkSavedet.length; u++) {
            for (var r = 0; r < pid.length; r++) {
                if (StkSavedet[u].Stockid == pid[r]) {
                    StkSavedet[u].IssStkQty = qty[r];
                }
            }
        }

        //for (var u = 0; u < Stkdet.length; u++) {
        //    for (var r = 0; r < pid.length; r++) {
        //        if (Stkdet[u].Stockid == pid[r]) {
        //            Stkdet[u].IssStkQty = qty[r];
        //        }
        //    }
        //}
        var Stkdet = [];
        //Stkdet = StkSavedet;

        //Stkdet = $.grep(Stkdet, function (er) {
        //    return (er.itemid === IId && er.colorid === CId && er.sizeid === SId);
        //});

        for (var t = 0; t < StkSavedet.length; t++) {
            if (StkSavedet[t].itemid == IId && StkSavedet[t].colorid == CId && StkSavedet[t].sizeid == SId) {
                Stkdet.push(StkSavedet[t]);
            }
        }

        LoadStktab(Stkdet);
        LoadStkSavetab(StkSavedet);

        //Datatable textbox focus
        var rows = $("#tblitemdetails").dataTable().fnGetNodes();
        var dtTable = $('#tblitemdetails').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
            $('input[id=txtitmqty]').each(function () {
                if (sn == CSno && $(this).val() == Val) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtitmqty').val();
                    row.find('#txtitmqty').focus().val('').val(num);
                    return true;
                }
            });
        }



    });
    $(document).on('keyup', '.calcamnt', function () {
        debugger;

        var table = $('#tblitemdetails').DataTable();
        var CSno = table.row($(this).parents('tr')).data()["slno"];
        var balq = table.row($(this).parents('tr')).data()["Quantity"];

        var val = $(this).val();

        var amnt = parseFloat(balq) * val;
        $.each(Itmdet, function () {
            if (this.slno == CSno) {
                this.Rate = val;
                this.amount = amnt;
            }
        });
        LoadItmtab(Itmdet);

        //$.each(ItmSavedet, function () {
        //    if (this.slno == CSno) {
        //        this.Rate = val;
        //        this.amount = amnt;
        //    }
        //});
        //LoadItmSavetab(ItmSavedet);

        //var total = 0;
        //for (var e = 0; e < Itmdet.length; e++) {
        //    var amount = Itmdet[e].amount;
        //    total = total + parseFloat(amount);

        //}
        //$("#txttotalamt").val(total);
        //$("#txtGrossAmount").val(total);
        LoadNetGrossAmt();

        //Datatable textbox focus
        var rows = $("#tblitemdetails").dataTable().fnGetNodes();
        var dtTable = $('#tblitemdetails').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
            $('input[id=txtitmrate]').each(function () {
                if (sn == CSno && $(this).val() == val) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtitmrate').val();
                    row.find('#txtitmrate').focus().val('').val(num);
                    return true;
                }
            });
        }
    });

    $(document).on('keyup', '.calcqty', function () {
        debugger;

        var table = $('#stkdetailstab').DataTable();
        var CSno = table.row($(this).parents('tr')).data()["Stockid"];
        var IId = table.row($(this).parents('tr')).data()["itemid"];
        var CId = table.row($(this).parents('tr')).data()["colorid"];
        var SId = table.row($(this).parents('tr')).data()["sizeid"];
        var balq = table.row($(this).parents('tr')).data()["stkqty"];

        var value = $(this).val();

        $.each(Stkdet, function () {
            if (this.Stockid == CSno) {


                if (balq >= value) {
                    this.IssStkQty = value;
                }
                else {
                    var t = value - balq;
                    this.IssStkQty = balq;
                }

            }
        });

        $.each(StkSavedet, function () {
            if (this.Stockid == CSno) {


                if (balq >= value) {
                    this.IssStkQty = value;
                }
                else {
                    var t = value - balq;
                    this.IssStkQty = balq;
                }

            }
        });

        var totalamnt = 0;

        for (var e = 0; e < Stkdet.length; e++) {
            var amount = Stkdet[e].stkqty;
            totalamnt = totalamnt + parseFloat(amount);
        }


        var total = 0;

        for (var e = 0; e < Stkdet.length; e++) {
            var amnt = Stkdet[e].IssStkQty;
            total = total + parseFloat(amnt);
        }

        LoadStktab(Stkdet);
        LoadStkSavetab(StkSavedet);
        var rate = 0;
        $.each(Itmdet, function () {
            if (this.ItemID == IId && this.SizeID == SId && this.ColorID == CId) {
                //this.quantity = 0;
                this.stkqty = totalamnt;
                this.Quantity = total;
                //}
                rate = this.Rate;

            }
        });
        var amnt = parseFloat(value) * rate;
        $.each(Itmdet, function () {
            if (this.slno == CSno) {

                this.amount = amnt;
            }
        });
        LoadItmtab(Itmdet);

        //$.each(ItmSavedet, function () {
        //    if (this.ItemID == IId && this.SizeID == SId && this.ColorID == CId) {
        //        //this.quantity = 0;
        //        this.stkqty = totalamnt;
        //        this.Quantity = total;
        //        //}


        //    }
        //});
        //LoadItmSavetab(ItmSavedet);
        //var total = 0;
        //for (var e = 0; e < Itmdet.length; e++) {
        //    var amount = Itmdet[e].amount;
        //    total = total + parseFloat(amount);

        //}
        //$("#txttotalamt").val(total);
        //$("#txtGrossAmount").val(total);
        //var k = $("#txtAddLess").val();
        //var net = parseFloat(total) + parseFloat(k);
        //$("#txtNetamt").val(net);
        LoadNetGrossAmt();


        //Datatable textbox focus
        var rows = $("#stkdetailstab").dataTable().fnGetNodes();
        var dtTable = $('#stkdetailstab').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
            $('input[id=txtqty]').each(function () {
                if (sn == CSno && $(this).val() == value) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtqty').val();
                    row.find('#txtqty').focus().val('').val(num);
                    return true;
                }
            });
        }
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


    $('#txtIssueDate').val(Fdatestring);



}
$(document).ready(function () {
    $("#tblitemdetails ").dataTable().find("tbody").on('click', 'tr', function () {
        index = (this.rowIndex) - 1;
    });
});


$(document).ready(function () {
    $("#stkdetailstab ").dataTable().find("tbody").on('click', 'tr', function () {
        ind = (this.rowIndex) - 1;
    });
});

//$(document).on('click', '.btnstkview', function () {
//    debugger;

//    var table = $('#tblitemdetails').DataTable();
//    var ItmId = table.row($(this).parents('tr')).data()["ItemID"];
//    var ClrId = table.row($(this).parents('tr')).data()["ColorID"];
//    var SzId = table.row($(this).parents('tr')).data()["SizeID"];
//    var UId = table.row($(this).parents('tr')).data()["Uomid"];
//    var Issid = table.row($(this).parents('tr')).data()["IssueID"];



//    var len = [];
//    if (StkSavedet.length > 0) {
//        $.each(StkSavedet, function () {
//            if (this.itemid == ItmId && this.colorid == ClrId && this.sizeid == SzId) {
//                len.push(StkSavedet);
//            }
//            else {
//                LoadStk(ItmId, ClrId, SzId, UId, Issid);
//            }
//        });
//    }
//    else {
//        LoadStk(ItmId, ClrId, SzId, UId, Issid);
//    }
//    if (len.length > 0) {
//        if (len.length > 0) {
//            var colorempty = [];
//            // colorempty = StkSavedet;

//            //colorempty = $.grep(colorempty, function (er) {
//            //    return (er.itemid === ItmId && er.colorid === ClrId && er.sizeid === SzId );
//            //});

//            for (var t = 0; t < StkSavedet.length; t++) {
//                if (StkSavedet[t].itemid == ItmId && StkSavedet[t].colorid == ClrId && StkSavedet[t].sizeid == SzId) {
//                    colorempty.push(StkSavedet[t]);
//                }
//            }
//            Stkdet = colorempty;
//            LoadStktab(colorempty);

//        } else {
//            LoadStk(ItmId, ClrId, SzId, UId, Issid);
//        }
//    }

//});

//$('#tblitemdetails').on('click', 'tr', function (e) {
//    debugger;



//    var table = $('#tblitemdetails').DataTable();

//    //var ItmId = table.row($(this).parents('tr')).data()["itmid"];
//    //var ClrId = table.row($(this).parents('tr')).data()["clrid"];
//    //var SzId = table.row($(this).parents('tr')).data()["sizeid"];

//    var row = $(this).closest('tr');
//    var data = $('#tblitemdetails').dataTable().fnGetData(row);


//    var ItmId = data.ItemID;
//    var ClrId = data.ColorID;
//    var SzId = data.SizeID;



////    var OQty = $(this).closest('tr').find('#txtRQty').val();


//    var colorempty = [];
//    colorempty = StkSavedet;

//    colorempty = $.grep(colorempty, function (v) {
//        return (v.itemid === ItmId && v.colorid === ClrId && v.sizeid === SzId);
//    });

//    Stkdet = colorempty;
//    LoadStktab(Stkdet);


//});

function loadqty() {
    debugger;
    var ItmId = $('#ddlItem').val();
    var ClrId = $('#ddlcolor').val();
    var SzId = $('#ddlSize').val();
    var UId = uomid;
    var Issid = 0;
    var fabreqid = 0;
    var tp = 'S';
    CompanyId;
    var cmp = $('select#ddlCompany option:selected').val();
    var pid = $('select#ddlLastProcess option:selected').val();
    var stuntid = $('select#ddlTostore option:selected').val();
    var itc = 'P';
    var oc = 'O';
    //var Ordno = $('#ddlOrderNo option:selected').text();
    //var StyId = $('#ddlStyle option:selected').val();

    var Ordno = $('#ddlOrderNo option:selected').val();
    if (Ordno == 0) {
        var Ordno = '';
        var StyId = 0;
    } else {

        var Ordno = $('#ddlOrderNo option:selected').text();
        var StyId = $('#ddlStyle option:selected').val();
    }
    var OType = $('input[name="Type"]:checked').attr('value');
    if (OType == 'G' || OType == 'R') {
        Ordno = 'GENERAL';
    }

    if (OType == 'R') {
        itc = 'G';
    }

    //if (pid == null || stuntid == null || ItmId ==null|| ClrId == null || SzId == null || UId == null|| Issid == null) {

    //}

    //if (pid == 0 || stuntid == 0 ) {
    //    alert('Select Process and Storeunit...');
    //    return true;
    //}
    $.ajax({
        url: "/StockOutward/GetStkdet",
        data: JSON.stringify({ type: tp, cmpid: cmp, itmid: ItmId, colorid: ClrId, sizeid: SzId, uomid: UId, issueid: Issid, procid: pid, stunitid: stuntid, itmcat: itc, ordno: oc, FabReqId: fabreqid, Orderno: Ordno, Styleid: StyId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            var obj = result.Value;

            var totalamnt = 0;
            for (var e = 0; e < obj.length; e++) {
                var amount = obj[e].stkqty;
                totalamnt = totalamnt + parseFloat(amount);

            }

            $('#txtStockqty').val(totalamnt);
        }

    });
}

function fnClearcDetailsControls() {
    $('#ddlItemGroup').val('0').trigger('change');
    $('#ddlItem').val('0').trigger('change');
    $('#ddlcolor').val('0').trigger('change');
    $('#ddlSize').val('0').trigger('change');
    $('#txtUom').val('');
    $('#txtStockqty').val('');
    $('#txtIssueQty').val('');
    $('#txtSecQty').val('');
    $('#txtSecUom').val('');
    $('#txtRate').val('');
    $('#txtAmnt').val('');
}

function fnClearAccControls() {
    $('#ddlAcc').val('0').trigger('change');
    $('#txtPorMins').val('');
    $('#txtPer').val('');
    $('#txtAmount').val('');
}

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
    $('#txtAmount').val(Amt);



}

function ClearPer() {

    $('#txtPer').val('');
}

function calamt() {
    debugger;
    var isqty = $('#txtIssueQty').val();
    var stk = $('#txtStockqty').val();

    if (parseFloat(isqty) > parseFloat(stk)) {
        //alert('Issueqty should not exceed stockqty...');
        var msg = 'Issue quantity should not exceed stock quantity...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        var f = 0;
        $('#txtIssueQty').val(f);
        return true;
    }
    else {
        var rate = $('#txtRate').val();
        var amnt = (isqty * rate);
        $('#txtAmnt').val(amnt);
    }
}

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
                   "sDefaultContent": '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnaccedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button"data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnaccremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div> '

               },

        ]
    });

    var totalamnt = 0;
    for (var e = 0; e < AccList.length; e++) {
        var amount = AccList[e].Amount;
        totalamnt = totalamnt + parseFloat(amount);

    }


    $('#txtAccAmt').val(totalamnt.toFixed(3));
    var AccountAmt = $('#txtAccAmt').val();
    var BAmt = $('#txtBTotAmt').val();

}
function backtomain() {
    $('#myModal').hide();
    $('#myModal').modal('hide');
}
function ClearTextbox() {
    debugger;
    //$('#ddlCompany').val("0");
    GenerateNumber();
    $('#supp').val("0");
    $('#ddlBuyer').val("0");
    $('#ddlProcess').val("0");
    $('#txtIssueNo').val("");
    $('#txtIssueDate').val("");
    $('#ddlDivision').val("0");
    $('#ddlTostore').val("0");

    $('#ddlRequestner').val("0");
    $('#txtVehicleNo').val("");
    $('#txtGrossAmount').val("0");
    $('#txtAddLess').val("");
    $('#txtNetamt').val("");
    $('#remarks').val("");
    var protype = $('input[name="MOType"]:checked').attr('value');
    if (protype == 'U') {
        $('#buyer').hide();
        $('#supp').hide();
    }
    else if (protype == 'S') {
        $("#unit").hide();
        $('#buyer').hide();
    }
    else if (protype == 'B') {
        $("#unit").hide();
        $('#supp').hide();
    }
    $('#btnUpdate').hide();
    $('#btnDel').hide();
    $('#btnAdd').show();

    LoadEmployeeStoreunit();
    getDate();
    fnClearcDetailsControls();
    Itmdet = [];
    // ItmSavedet = [];
    Stkdet = [];
    StkSavedet = [];
    AccList = [];
    LoadItmtab(Itmdet);
    //LoadItmSavetab(ItmSavedet);
    //LoadReqItem();
    LoadStktab(Stkdet);
    LoadStkSavetab(StkSavedet);
    loadAccTable(AccList);

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
    // $('#txtFromDate').val(date);
    $('#txtFromDate').val(MainFDate);
    $('#txtToDate').val(Fdatestring);
    $('#txtIssueDate').val(Fdatestring);

}

function RadioMBClick() {
    var protype = $('input[name="MOType"]:checked').attr('value');
    if (protype == 'U') {
        $('#buyer').hide();
        $('#supp').hide();
        $("#unit").show();
    }
    else if (protype == 'S') {
        $("#unit").hide();
        $('#buyer').hide();
        $('#supp').show();
    }
    else if (protype == 'B') {
        $("#unit").hide();
        $('#supp').hide();
        $('#buyer').show();
    }
}


function chkcmpnyid() {
    debugger;
     if (Mode == 0) {
    //CompanyId = $('select#ddlCompany option:selected').val();
    //if (CompanyId == 0) {
    //    alert('Select Company...');
    //    return true;
    //}
    //else {
    //    GenerateNumber();
         //}
         GenerateNumber();
         LoadEmployeeStoreunit();
     }

}
function GenerateNumber() {
    debugger;

    table = "GenIssueMas",
    column = "IssueNo",
   // compId = CompanyId = $('select#ddlCompany option:selected').val(),
    Docum = 'GENERAL DELIVERY',
     compId = $('#ddlCompany').val();

    if (compId == null) {
        compId = DCompid;
    } else {
        compId = $('#ddlCompany').val();
    }
    CompanyId = compId;
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
function loaduom() {
    debugger;
    var itm = $('select#ddlItem option:selected').val();

    if (itm > 0) {

        $.ajax({
            url: "/StockOutward/GetUom",
            data: JSON.stringify({ itmid: itm }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",

            success: function (result) {
                debugger;
                var obj = result.Value;
                $('#txtUom').val(obj[0].uom);
                $('#txtSecUom').val(obj[0].uom);
                var st = 0;
                $('#txtStockqty').val(st);
                uomid = obj[0].Uomid;
            }

        });
    }
}
function LoadItmtab(list) {
    $('#tblitemdetails').DataTable().destroy();

    $('#tblitemdetails').DataTable({
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
                   { title: "SNo", data: "slno", "visible": false },
                   { title: "IssueDetId", data: "IssueDetId", "visible": false },
                   { title: "ItemGroupId", data: "Itmgrpid", "visible": false },
                   { title: "ItemGroup", data: "Itmgrp" },
                   { title: "ItemId", data: "ItemID", "visible": false },
                   { title: "Item", data: "Item" },
                   { title: "ColorId", data: "ColorID", "visible": false },
                   { title: "Color", data: "color" },
                   { title: "SizeId", data: "SizeID", "visible": false },
                   { title: "Size", data: "size" },
                   { title: "Uom", data: "uom" },
                   { title: "Stock Qty", data: "stkqty" },
                   {
                       title: "Issue Qty", data: "Quantity",
                       render: function (data) {

                           return '<input type="text" id="txtitmqty" class="calcitmqty form-control"  style="width: 55px;text-align: center;" value=' + data + '  >';
                       }
                   },
                   {
                       title: "Sec Qty", data: "sQty",
                       render: function (data) {

                           return '<input type="text" id="txtitmsqty" class="form-control"  style="width: 55px;text-align: center;" value=' + data + '  >';
                       }
                   },
                   //{ title: "Unitid", data: "UnitId" },
                   { title: "Sec Uom", data: "suom" },
                   {
                       title: "Rate", data: "Rate",
                       render: function (data) {

                           return '<input type="text" id="txtitmrate" class="calcamnt form-control"  style="width: 55px;text-align: center;" value=' + data + '>';
                       }
                   },
                   { title: "Amount", data: "amount" },

               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnitmedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnitmremove btn btn-danger btn-round"> <i class="fa fa-times"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="View" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnstkview btn btn-info btn-round"> <i class="fa fa-eye"></i> </button>  </div>'

               }
        ]

    });
}

$(document).ready(function () {
    $("#tblitemdetails ").dataTable().find("tbody").on('click', 'tr', function () {
        indiptitm = (this.rowIndex) - 1;
    });
});

//function LoadItmSavetab(list) {
//    $('#tblitemSavedetails').DataTable().destroy();

//    $('#tblitemSavedetails').DataTable({
//        data: list,
//        columns: [
//                   { title: "SNo", data: "slno", "visible": false },
//                   { title: "IssueDetId", data: "IssueDetId", "visible": false },
//                   { title: "ItemGroupId", data: "Itmgrpid", "visible": false },
//                   { title: "ItemGroup", data: "Itmgrp" },
//                   { title: "ItemId", data: "ItemID", "visible": false },
//                   { title: "Item", data: "Item" },
//                   { title: "ColorId", data: "ColorID", "visible": false },
//                   { title: "Color", data: "color" },
//                   { title: "SizeId", data: "SizeID", "visible": false },
//                   { title: "Size", data: "size" },
//                   { title: "Uom", data: "uom" },
//                   { title: "Stock Qty", data: "stkqty" },
//                   {
//                       title: "Issue Qty", data: "Quantity",

//                   },
//                   {
//                       title: "Sec Qty", data: "sQty",

//                   },
//                   //{ title: "Unitid", data: "UnitId" },
//                   { title: "Sec Uom", data: "suom" },
//                   {
//                       title: "Rate", data: "Rate",

//                   },
//                   { title: "Amount", data: "amount" },

//               //{
//               //    title: "ACTION", "mDataProp": null,
//               //    "sDefaultContent": '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnitmedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnitmremove btn btn-danger btn-round"> <i class="fa fa-minus"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="View" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnstkview btn btn-info btn-round"> <i class="fa fa-eye"></i> </button>  </div>'

//               //}
//        ]

//    });
//}

function LoadStktab(list) {
    $('#stkdetailstab').DataTable().destroy();

    $('#stkdetailstab').DataTable({
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
                   { title: "StkId", data: "Stockid", "visible": false },
                   { title: "Trans No", data: "transNo" },
                   { title: "Date", data: "transdate" },
                   { title: "Supplier", data: "supp1" },
                   { title: "Process", data: "process" },
                   { title: "Lot No", data: "Lotno" },
                   { title: "Stock Qty", data: "stkqty" },
                   {
                       title: "Issue Qty", data: "IssStkQty",
                       render: function (data) {

                           return '<input type="text" id="txtqty" class="calcqty form-control"  style="width: 55px;text-align: center;" value=' + data + ' >';
                       }
                   },
                   { title: "Uom", data: "uom" },
                   { title: "Uomid", data: "Uomid", "visible": false },
                   { title: "Itemid", data: "itemid", "visible": false },
                   { title: "Colorid", data: "colorid", "visible": false },
                   { title: "Sizeid", data: "sizeid", "visible": false },
        ]

    });
}

function LoadStkSavetab(list) {
    $('#stkdetailsSavetab').DataTable().destroy();

    $('#stkdetailsSavetab').DataTable({
        data: list,
        columns: [
                   { title: "StkId", data: "Stockid" },
                   { title: "Trans No", data: "transNo" },
                   { title: "Date", data: "transdate" },
                   { title: "Supplier", data: "supp1" },
                   { title: "Process", data: "process" },
                   { title: "Lot No", data: "Lotno" },
                   { title: "Stock Qty", data: "stkqty" },
                   {
                       title: "Issue Qty", data: "IssStkQty",

                   },
                   { title: "Uom", data: "uom" },
                   { title: "Uomid", data: "Uomid" },
                   { title: "Itemid", data: "itemid" },
                   { title: "Colorid", data: "colorid" },
                   { title: "Sizeid", data: "sizeid" },
        ]

    });
}


function LoadStk(ItmId, ClrId, SzId, UId, Issid,ReqId) {
    debugger;
    var tp = 'S';
    CompanyId;
    var cmp = $('select#ddlCompany option:selected').val();
    var pid = $('select#ddlLastProcess option:selected').val();
    var stuntid = $('select#ddlTostore option:selected').val();
    var itc = 'P';
    var oc = 'O';
    if (Mode = 1) {
        Issid = Issueid;
    }
    var ReqId = 0;

    var Ordno = $('#ddlOrderNo option:selected').val();
    if (Ordno ==0) {
        var Ordno = '';
        var StyId = 0;
    } else {

        var Ordno = $('#ddlOrderNo option:selected').text();
        var StyId = $('#ddlStyle option:selected').val();
    }
    var OType = $('input[name="Type"]:checked').attr('value');
    if (OType == 'G') {
        Ordno = 'GENERAL';
    }
    if (OType == 'R') {
        itc = 'G';
    }


    //if (pid == null || stuntid == null || ItmId ==null|| ClrId == null || SzId == null || UId == null|| Issid == null) {
    //}

    //if (pid == 0 || stuntid == 0 ) {
    //    alert('Select Process and Storeunit...');
    //    return true;
    //}
    $.ajax({
        url: "/StockOutward/GetStkdet",
        data: JSON.stringify({ type: tp, cmpid: cmp, itmid: ItmId, colorid: ClrId, sizeid: SzId, uomid: UId, issueid: Issid, procid: pid, stunitid: stuntid, itmcat: itc, ordno: oc, FabReqId: ReqId, Orderno: Ordno, Styleid: StyId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            var obj = result.Value;
            Stkdet = obj;
            //StkSavedet = obj;


            for (var r = 0; r < Stkdet.length; r++) {
                Stkdet[r].transdate = moment(Stkdet[r].transdate).format("DD/MM/YYYY");
            }

            for (var f = 0; f < Stkdet.length; f++) {
                StkSavedet.push(Stkdet[f]);
            }
            //for (var r = 0; r < StkSavedet.length; r++) {
            //    StkSavedet[r].transdate = moment(StkSavedet[r].transdate).format("DD/MM/YYYY");
            //}
            if (Stkdet.length > 0) {
                loadstkqty();
            }
            //LoadStktab(Stkdet);



            var ItmId = Itmdet[0]['ItemID'];
            var ClrId = Itmdet[0]['ColorID'];
            var SzId = Itmdet[0]['SizeID'];
          


            var Stkempty = [];
            Stkempty = StkSavedet;

            Stkempty = $.grep(Stkempty, function (v) {
                return (v.itemid == ItmId && v.colorid == ClrId && v.sizeid == SzId );
            });

            Stkdet = Stkempty;
            LoadStktab(Stkdet);
            LoadStkSavetab(StkSavedet);
        }

    });
}

function loadstkqty() {
    debugger;

    var CSno = Stkdet[0].Stockid;
    var IId = Stkdet[0].itemid;
    var CId = Stkdet[0].colorid;
    var SId = Stkdet[0].sizeid;
    var balq = Stkdet[0].stkqty;
    var totalamnt = 0;
    for (var e = 0; e < Stkdet.length; e++) {
        var amount = Stkdet[e].stkqty;
        totalamnt = totalamnt + parseFloat(amount);

    }
    $.each(Itmdet, function () {
        if (this.ItemID == IId && this.SizeID == SId && this.ColorID == CId) {
            //this.quantity = 0;
            this.stkqty = totalamnt;
            // this.Quantity = total;
            //}


        }
    });
    LoadItmtab(Itmdet);
    //$.each(ItmSavedet, function () {
    //    if (this.ItemID == IId && this.SizeID == SId && this.ColorID == CId) {
    //        //this.quantity = 0;
    //        this.stkqty = totalamnt;
    //        // this.Quantity = total;
    //        //}


    //    }
    //});
    //LoadItmSavetab(ItmSavedet);
}
function LoadOrderEditAddLessDetails(Issueid) {
    debugger;


    $.ajax({
        url: "/StockOutward/LoadAddlessEditContDetails",
        data: JSON.stringify({ id: Issueid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            AccList = result;
            loadAccTable(AccList);
            var totalamnt = 0;
            for (var e = 0; e < AccList.length; e++) {
                var amount = AccList[e].Amount;
                totalamnt = totalamnt + parseFloat(amount);

            }


            //$('#txtAddLess').val(totalamnt.toFixed(3));
            //var t = $('#txtGrossAmount').val();
            //var net = parseFloat(t) + parseFloat(totalamnt);
            //$('#txtNetamt').val(net);
            LoadNetGrossAmt();

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function Add() {
    debugger;
    var SuppId = 0;
    var res = validate();
    if (res == false) {
        return false;
    }

    var isvalidate = true;

    var unittype = $('input[name="MOType"]:checked').attr('value');
    var invtype = $('input[name="VType"]:checked').attr('value');


    if (unittype == "U") {
        SuppId = $('#ddlCmpanyunit').val();
    } else if (unittype == "S") {
        SuppId = $('#ddlSupplier').val();
    } else {
        SuppId = $('#ddlBuyer').val();
    }
    var storeunitid = $('#ddlTostore').val();
    if (storeunitid == 0 && validatestore == "True") {
        //alert('Please select Store..');
        var msg = 'Please select Store...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        isvalidate = false;
    }
    debugger;
    var oldIssueNo = $('#txtIssueNo').val();

    table = "GenIssueMas",
    column = "IssueNo",
    Docum = 'GENERAL DELIVERY',
    compId = $('#ddlCompany').val();

    if (compId == null) {
        compId = DCompid;
    } else {
        compId = $('#ddlCompany').val();
    }
    CompanyId = compId;




    if (isvalidate) {

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
                    //alert('URN No has been changed...');
                    var msg = 'URN Nubmer has been changed...';
                    var flg = 4;
                    var mod = 1;
                    var url = "";
                    AlartMessage(msg, flg, mod, url);
                    $('#txtIssueNo').val(result.Value);
                }
                var objConSubmit = {

                    //
                    //IssueId: $('#txtHCompanyId').val(),
                    IssueNo: $('#txtIssueNo').val(),// $('#txtOrderNo').val(),
                    IssueDate: $('#txtIssueDate').val(),//new Date($('#txtIssueDate').val()),
                    CompanyID: $('#ddlCompany').val(),
                    UnitType: unittype,
                    UnitId: SuppId,
                    InvoiceType: invtype,
                    Remarks: $('#remarks').val(),
                    GrossAmount: $('#txtGrossAmount').val(),
                    NetAmount: $('#txtNetamt').val(),// 1,//$('select#ddljoborder option:selected').val(),
                    IssueOrRecpt: "I",// $('select#ddlcmpnyadd option:selected').val(),
                    Processid: $('#ddlProcess').val(),//$('#txtBuyOrdMasId').val(),
                    VehicleNo: $('#txtVehicleNo').val(),
                    RequestnerId: $('#ddlRequestner').val(),//  $('#ddlRequestner').val(),//$('#txtBuyOrdMasId').val(),
                    storeunitid: $('#ddlTostore').val(),// $('#txtBuyOrdMasId').val(),
                    CreatedBy: Guserid,
                    ToDiviid: $('#ddlDivision').val(),
                    ReqMasNo: $('select#ddlReqNo option:selected').text(),//$('#ddlReqNo').text(),


                    GenDet: Itmdet,
                    GenStkDet: StkSavedet,
                    GenAdLsDet: AccList
                };
                $("#btnAdd").attr("disabled", true);
                LoadingSymb();
                $.ajax({
                    url: "/StockOutward/Add",
                    data: JSON.stringify(objConSubmit),
                    type: "POST",
                    contentType: "application/json;charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        debugger;
                        // if (result.Value == true) {
                        AddUserEntryLog('Procurement', 'Stock Outward', 'ADD', $("#txtIssueNo").val());
                        //alert('Data Saved Successfully');
                        //window.location.href = "/StockOutward/StockOutwardIndex";
                        var msg = 'Data Saved Successfully...';
                        var flg = 1;
                        var mod = 0;
                        var url = "/StockOutward/StockOutwardIndex";
                        AlartMessage(msg, flg, mod, url);
                        // }
                        // else {
                        //  window.location.href = "/Error/Index";
                        // }

                    },
                    error: function (errormessage) {
                        alert(errormessage.responseText);
                    }

                });
            }
        });
    }

}


function validate() {
    debugger;
    var isValid = true;
    if ($('#ddlCompany').val().trim() == '0') {
        $('#ddlCompany').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlCompany').css('border-color', 'lightgrey');
    }

    var unittype = $('input[name="MOType"]:checked').attr('value');

    if (unittype == "") {
        unittype = GUnitType;
    } else {
        unittype = unittype;
    }

    if (unittype == "U") {
        if ($('#ddlCmpanyunit').val() == 0) {
            $('#ddlCmpanyunit').css('border-color', 'Red');
            isValid = false;
        }
        else {
            $('#ddlCmpanyunit').css('border-color', 'lightgrey');
        }
    } else if (unittype == "S") {
        if ($('#ddlSupplier').val() == 0) {
            $('#ddlSupplier').css('border-color', 'Red');
            isValid = false;
        }
        else {
            $('#ddlSupplier').css('border-color', 'lightgrey');
        }
    } else {
        if ($('#ddlBuyer').val() == 0) {
            $('#ddlBuyer').css('border-color', 'Red');
            isValid = false;
        }
        else {
            $('#ddlBuyer').css('border-color', 'lightgrey');
        }
    }
    //if ($('#ddlAMainStore').val().trim() == 0) {
    //    $('#ddlAMainStore').css('border-color', 'Red');
    //    isValid = false;
    //}
    //else {
    //    $('#ddlAMainStore').css('border-color', 'lightgrey');
    //}
    //if ($('#ddlMProcess').val().trim() == 0) {
    //    $('#ddlMProcess').css('border-color', 'Red');
    //    isValid = false;
    //}
    //else {
    //    $('#ddlMProcess').css('border-color', 'lightgrey');
    //}




    return isValid;
}
function Update() {
    debugger;
    var res = validate();
    if (res == false) {
        return true;
    }
    var unittype = $('input[name="MOType"]:checked').attr('value');
    var invtype = $('input[name="VType"]:checked').attr('value');

    $.each(Itmdet, function () {
        this.IssueID = Issueid;
    });
    $.each(StkSavedet, function () {
        this.IssueId = Issueid;
    });

    var storeunitid = $('#ddlTostore').val();
    if (storeunitid == 0 && validatestore == "True") {
        //alert('Please select Store..');
        var msg = 'Please select Store...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    var objConSubmit = {

        //
        IssueId: Issueid,
        IssueNo: $('#txtIssueNo').val(),// $('#txtOrderNo').val(),
        IssueDate: $('#txtIssueDate').val(),//new Date($('#txtIssueDate').val()),
        CompanyID: $('#ddlCompany').val(),
        UnitType: GUnitType,
        UnitId: $('#ddlCmpanyunit').val(),
        InvoiceType: invtype,
        Remarks: $('#remarks').val(),
        GrossAmount: $('#txtGrossAmount').val(),
        NetAmount: $('#txtNetamt').val(),// 1,//$('select#ddljoborder option:selected').val(),
        IssueOrRecpt: "I",// $('select#ddlcmpnyadd option:selected').val(),
        Processid: $('#ddlProcess').val(),//$('#txtBuyOrdMasId').val(),
        VehicleNo: $('#txtVehicleNo').val(),
        RequestnerId: $('#ddlRequestner').val(),//  $('#ddlRequestner').val(),//$('#txtBuyOrdMasId').val(),
        storeunitid: $('#ddlTostore').val(),// $('#txtBuyOrdMasId').val(),
        CreatedBy: Guserid,
        ToDiviid: $('#ddlDivision').val(),
        ReqMasNo: $('select#ddlReqNo option:selected').text(),//$('#ddlReqNo').text(),


        GenDet: Itmdet,
        GenStkDet: StkSavedet,
        GenAdLsDet: AccList
    };
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/StockOutward/Update",
        data: JSON.stringify(objConSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            //if (result.Value == true) {
            AddUserEntryLog('Procurement', 'Stock Outward', 'UPDATE', $("#txtIssueNo").val());
            //alert('Data Updated Successfully');
            //window.location.href = "/StockOutward/StockOutwardIndex";
            var msg = 'Data Updated Successfully...';
            var flg = 1;
            var mod = 0;
            var url = "/StockOutward/StockOutwardIndex";
            AlartMessage(msg, flg, mod, url);

            //}
            //else {
            //    window.location.href = "/Error/Index";
            //}

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }

    });


}

function CMainlist() {
   // $('#tblbillmaingrid').DataTable().destroy();
    LoadMaingrid();
}
function LoadMaingrid() {
    debugger;

    var unittype = $('input[name="optwrkord"]:checked').attr('value');
    var invtype = $('input[name="ivmaintype"]:checked').attr('value');


    var issNo = "";
    var ONo = $('select#ddlMIssueNo option:selected').val();

    if (ONo == 0) {
        issNo == "";
    }
    else {

        issNo = $('select#ddlMIssueNo option:selected').val();
    }


    //var unit = "";
    //var un = $('select#ddlMUnit option:selected').val();

    //if (un == 0) {
    //    unit == "";
    //}
    //else {

    //    unit = $('select#ddlMUnit option:selected').val();
    //}



    if (issNo == undefined) {
        issNo = "";
    }

    var issid = 0;


    var CompId = $('#ddlMCompany').val();
    var suppid = $('#ddlMSupplier').val();
    var procid = $('#ddlMProcess').val();
    var unit = $('#ddlMUnit').val();

    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    $.ajax({
        url: "/StockOutward/GetStkoutMainDetails",
        data: JSON.stringify({ ivtype: invtype, issueid: issid, issueno: issNo, cmpnyid: CompId, unittype: unittype, unitid: unit, suppid: suppid, procid: procid, fromDate: FDate, todate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");
            
            var inputcount = 0;
            $('#tblbillmaingrid tr').each(function () {
                inputcount++;
            });
            if (inputcount > 0) {
                //$('#tblYarndetails').DataTable().destroy();
                var table = $('#tblbillmaingrid').DataTable();
                var rows = table.clear().draw();
                $('#tblbillmaingrid').DataTable().rows.add(dataSet);
                $('#tblbillmaingrid').DataTable().columns.adjust().draw();
            }
            else {

                $('#tblbillmaingrid').DataTable({
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
                             { title: "Issueid", "visible": false },
                             { title: "Company" },
                             { title: "Unit" },
                             { title: "Issue No" },
                             { title: "Date" },
                             { title: "Type" },
                             { title: "Net Amount" },
                              { title: "Action" },


                    ]

                });

            }
            
            //$('#ddlMIssueNo').empty();
            //$('#ddljobno').empty();
            //$('#ddlMOrderNo').empty();

            $(document).ready(function () {
                var table = $('#tblbillmaingrid').DataTable();

                $('#tblbillmaingrid tbody').on('click', 'tr', function () {
                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');

                    }
                    else {
                        table.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');
                    }
                });


            });
            CheckRights("StockOutward");
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function ddlmain() {
    var unittype = $('input[name="MOType"]:checked').attr('value');
    var invtype = $('input[name="ivmaintype"]:checked').attr('value');


    var issNo = "";
    var ONo = $('select#ddlMIssueNo option:selected').val();

    if (ONo == 0) {
        issNo == "";
    }
    else {

        issNo = $('select#ddlMIssueNo option:selected').val();
    }


    //var unit = "";
    //var un = $('select#ddlMUnit option:selected').val();

    //if (un == 0) {
    //    unit == "";
    //}
    //else {

    //    unit = $('select#ddlMUnit option:selected').val();
    //}

    if (issNo == undefined) {
        issNo = "";
    }

    var issid = 0;


    var CompId = $('#ddlMCompany').val();
    var suppid = $('#ddlMSupplier').val();
    var procid = $('#ddlMProcess').val();
    var unit = $('#ddlMUnit').val();


    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    $.ajax({
        url: "/StockOutward/GetDataMainList",
        data: JSON.stringify({ ivtype: invtype, issueid: issid, issueno: issNo, cmpnyid: CompId, unittype: unittype, unitid: unit, suppid: suppid, procid: procid, fromDate: FDate, todate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            var obj = json.Value;
            if (json.Status == 'SUCCESS') {


                var data = json.Value;

                $(ddlMIssueNo).append($('<option/>').val('0').text('--Select IssueNo--'));
                $.each(data, function () {
                    $(ddlMIssueNo).append($('<option></option>').text(this.IssueNo));

                });




            }

        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function getbyID(id) {
    debugger;
    //LoadSupplierDDL("#ddlSupplier");
    //LoadCompanyUnitDDL("#ddlCmpanyunit");
    
    Issueid = id;
    Mode = 1;
    var unittype = $('input[name="MOType"]:checked').attr('value');
    var invtype = $('input[name="ivmaintype"]:checked').attr('value');


    var issNo = "";
    var ONo = $('select#ddlMIssueNo option:selected').val();

    if (ONo == 0) {
        issNo == "";
    }
    else {

        issNo = $('select#ddlMIssueNo option:selected').val();
    }

    if (issNo == undefined) {
        issNo = "";
    }

    var issid = id;


    var CompId = $('#ddlMCompany').val();
    var suppid = $('#ddlMSupplier').val();
    var procid = $('#ddlMProcess').val();
    var unit = $('#ddlMUnit').val();

    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    $.ajax({
        url: "/StockOutward/GetDataHeaderdet",
        data: JSON.stringify({ ivtype: invtype, issueid: issid, issueno: issNo, cmpnyid: CompId, unittype: unittype, unitid: unit, suppid: suppid, procid: procid, fromDate: FDate, todate: TDate }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;

            $('#myModal').show();
            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnDel').hide();
            $('#btnAdd').hide(); 
            $('#btnStockAdd').hide(); btnStockAdd

            var obj = result.Value;
            $('#ddlCompany').val(obj[0].CompanyID);
            $('#ddlProcess').val(obj[0].Processid);
            $('#ddlMCompany').val(obj[0].supplierid);
            $('#ddlDivision').val(obj[0].ToDiviid);
            $('#ddlRequestner').val(obj[0].RequestnerId);
            $('#txtIssueNo').val(obj[0].IssueNo);
            $('#txtIssueDate').val(moment(obj[0].IssueDate).format("DD/MM/YYYY"));
            $('#txtVehicleNo').val(obj[0].VehicleNo);
              $('#ddlTostore').val(obj[0].storeunitid);
            $('#remarks').val(obj[0].Remarks);
            $('#txtGrossAmount').val(obj[0].GrossAmount);
            $('#txtNetamt').val(obj[0].NetAmount);

            GUnitType = obj[0]["UnitType"]; 
            GOType = obj[0]["InvoiceType"];
            GEReqNo = obj[0]["ReqMasNo"];
            GUnSuppId = obj[0]["UnitId"];
            if (GUnitType == "S") {
                $('input:radio[name="MOType"][value="S"]').prop('checked', true);
                $('#ddlSupplier').val(GUnSuppId);
              
            } else if (GUnitType == "U") {
               
                $('input:radio[name="MOType"][value="U"]').prop('checked', true);
                $('#ddlCmpanyunit').val(GUnSuppId);
            }
            if (GOType == "S") {
                $('#HdnItemLoadId').show();
                $('input:radio[name="VType"][value="S"]').prop('checked', true);
            } else if (GOType == "R") {
                $('#HdnItemLoadId').hide();

                $('#HReqId').show();           

                $("#ddlReqNo").prop("disabled", true);
                
                EditListReqNo();
                $('input:radio[name="VType"][value="R"]').prop('checked', true);
            }
            ItmId = 0;
            ClrId = 0;
            SzId = 0;
            UId = 0;
            Issid = id;
            LoadItmedit(ItmId, ClrId, SzId, UId, Issid);
            LoadOrderEditAddLessDetails(Issid);

            editmasunitstore = obj[0]["storeunitid"];
            LoadEmployeeStoreunit();
        }

    });
}


function Delete(id) {
    debugger;
    Issueid = id;
    Mode = 1;
    var unittype = $('input[name="MOType"]:checked').attr('value');
    var invtype = $('input[name="ivmaintype"]:checked').attr('value');


    var issNo = "";
    var ONo = $('select#ddlMIssueNo option:selected').val();

    if (ONo == 0) {
        issNo == "";
    }
    else {

        issNo = $('select#ddlMIssueNo option:selected').val();
    }

    if (issNo == undefined) {
        issNo = "";
    }

    var issid = id;


    var CompId = $('#ddlMCompany').val();
    var suppid = $('#ddlMSupplier').val();
    var procid = $('#ddlMProcess').val();
    var unit = $('#ddlMUnit').val();

    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    $.ajax({
        url: "/StockOutward/GetDataHeaderdet",
        data: JSON.stringify({ ivtype: invtype, issueid: issid, issueno: issNo, cmpnyid: CompId, unittype: unittype, unitid: unit, suppid: suppid, procid: procid, fromDate: FDate, todate: TDate }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;

            $('#myModal').show();
            $('#myModal').modal('show');
            $('#btnUpdate').hide();
            $('#btnDel').show();
            $('#btnAdd').hide();

            var obj = result.Value;
            $('#ddlCompany').val(obj[0].CompanyID);
            $('#ddlProcess').val(obj[0].Processid);
            $('#ddlMCompany').val(obj[0].supplierid);
            $('#ddlDivision').val(obj[0].ToDiviid);
            $('#ddlRequestner').val(obj[0].RequestnerId);
            $('#txtIssueNo').val(obj[0].IssueNo);
            $('#txtIssueDate').val(moment(obj[0].IssueDate).format("DD/MM/YYYY"));
            $('#txtVehicleNo').val(obj[0].VehicleNo);
            $('#ddlTostore').val(obj[0].storeunitid);
            $('#remarks').val(obj[0].Remarks);
            $('#txtGrossAmount').val(obj[0].GrossAmount);
            $('#txtNetamt').val(obj[0].NetAmount);

            GUnitType = obj[0]["UnitType"];
            GOType = obj[0]["InvoiceType"];
            GEReqNo = obj[0]["ReqMasNo"];
            GUnSuppId = obj[0]["UnitId"];
            if (GUnitType == "S") {
                $('input:radio[name="MOType"][value="S"]').prop('checked', true);
                $('#ddlSupplier').val(GUnSuppId);

            } else if (GUnitType == "U") {

                $('input:radio[name="MOType"][value="U"]').prop('checked', true);
                $('#ddlCmpanyunit').val(GUnSuppId);
            }
            if (GOType == "S") {
                $('#HdnItemLoadId').show();
                $('input:radio[name="VType"][value="S"]').prop('checked', true);
            } else if (GOType == "R") {
                $('#HdnItemLoadId').hide();

                $('#HReqId').show();

                $("#ddlReqNo").prop("disabled", true);

                EditListReqNo();
                $('input:radio[name="VType"][value="R"]').prop('checked', true);
            }

            ItmId = 0;
            ClrId = 0;
            SzId = 0;
            UId = 0;
            Issid = id;
            LoadItmedit(ItmId, ClrId, SzId, UId, Issid);
            LoadOrderEditAddLessDetails(Issid);

        }

    });
}
function LoadItmedit(ItmId, ClrId, SzId, UId, Issid) {
    debugger;
    var tp = 'D';
    var pid = 0;//$('select#ddlProcess option:selected').val();
    var stuntid = 0;//$('select#ddlTostore option:selected').val();
    var itc = "";
    var oc = "";

    //if (pid == null || stuntid == null || ItmId ==null|| ClrId == null || SzId == null || UId == null|| Issid == null) {

    //}

    //if (pid == 0 || stuntid == 0 ) {
    //    alert('Select Process and Storeunit...');
    //    return true;
    //}
    $.ajax({
        url: "/StockOutward/GetItmeditdet",
        data: JSON.stringify({ type: tp, cmpid: CompanyId, itmid: ItmId, colorid: ClrId, sizeid: SzId, uomid: UId, issueid: Issid, procid: pid, stunitid: stuntid, itmcat: itc, ordno: oc }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            var obj = result.Value;
            Itmdet = obj;
            ItmId = Itmdet[0].ItemID;
            ClrId = Itmdet[0].ColorID;
            SzId = Itmdet[0].SizeID;
            UId = Itmdet[0].Uomid;
            Issid = Issueid;
            var ReqId = 0;

            for (var e = 0; e < Itmdet.length; e++) {
                Itmdet[e].amount = Itmdet[e].Quantity * Itmdet[e].Rate;

            }
            LoadStk(ItmId, ClrId, SzId, UId, Issid, ReqId);
            //ItmSavedet = Itmdet;
            LoadItmtab(Itmdet);
            //LoadItmSavetab(ItmSavedet);

            var total = 0;
            for (var e = 0; e < Itmdet.length; e++) {
                var amount = Itmdet[e].amount;
                total = total + parseFloat(amount);

            }
            //$("#txttotalamt").val(total);
            //$("#txtGrossAmount").val(total);
            //var k = $("#txtAddLess").val();
            //var net = parseFloat(total) + parseFloat(k);
            //$("#txtNetamt").val(net);
            LoadNetGrossAmt();

        }

    });
}

function MDelete() {
    debugger;
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $("#btnDel").attr("disabled", true);
        LoadingSymb();
        var objOutIssDelete = {

            //
            IssueId: Issueid,
            IssueNo: $('#txtIssueNo').val(),
            GenStkDet: StkSavedet,
            ReqMasNo: $('select#ddlReqNo option:selected').text(),//$('#ddlReqNo').text(),
        };
        $.ajax({
            //url: "/StockOutward/Delete/" + id,
            //type: "POST",
            //contentType: "application/json;charset=UTF-8",
            //dataType: "json",
            url: "/StockOutward/Delete",
            data: JSON.stringify(objOutIssDelete),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.Value == true) {
                    AddUserEntryLog('Procurement', 'Stock Outward', 'DELETE', $("#txtIssueNo").val());
                    //alert("Data Deleted Sucessfully");

                    //window.location.href = "/StockOutward/StockOutwardIndex";
                    var msg = 'Data Deleted Sucessfully...';
                    var flg = 2;
                    var mod = 0;
                    var url = "/StockOutward/StockOutwardIndex";
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
}



function StkOutPrint(Id) {
    debugger;
    var compid = $('#ddlMCompany').val();
    window.open("../ReportInline/Stores/StoresOutward/StoresOutwardInlineReport.aspx?Masid=" + Id + "&Companyid=" + compid);
    return true;
}


function ReqLoadItem(ReqMasid) {
    debugger;

    $.ajax({
        url: "/StockOutward/GetItmReqdet",
        data: JSON.stringify({ ReqMasId: ReqMasid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            var obj = result.Value;
            Itmdet = obj;
            ItmId = Itmdet[0].ItemID;
            ClrId = Itmdet[0].ColorID;
            SzId = Itmdet[0].SizeID;
            UId = Itmdet[0].Uomid;
            Issid = Issueid;

            for (var e = 0; e < Itmdet.length; e++) {
                Itmdet[e].amount = Itmdet[e].Quantity * Itmdet[e].Rate;

            }
            LoadItmtab(Itmdet);

            var total = 0;
            for (var e = 0; e < Itmdet.length; e++) {
                var amount = Itmdet[e].amount;
                total = total + parseFloat(amount);

            }
            //$("#txttotalamt").val(total);
            //$("#txtGrossAmount").val(total);
            //var k = $("#txtAddLess").val();
            //var net = parseFloat(total) + parseFloat(k);
            //$("#txtNetamt").val(net);
            LoadNetGrossAmt();
        }

    });
}

function LoadReqNo() {



    var Otype = $('input[name="VType"]:checked').attr('value');
    if (Otype == 'R') {
        $('#HReqId').show();
        $('#HdnItemLoadId').hide();
        $('#hddTolId').hide();
        ListReqNo();


    } else {
        $('#HReqId').hide();
        $('#HdnItemLoadId').show();
        $('#hddTolId').show();
    }
}



function ListReqNo() {

    $.ajax({
        url: "/StockOutward/GetDataLoadReqNo",
        data: JSON.stringify({}),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            var obj = json.Value;
            if (json.Status == 'SUCCESS') {
                var data = json.Value;


                $('#ddlReqNo').empty();

                $(ddlReqNo).append($('<option/>').val('0').text('--Select Req No--'));
                $.each(data, function () {
                    $(ddlReqNo).append($('<option></option>').val(this.ReqMasId).text(this.ReqMasNo));

                });
            }

        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function EditListReqNo() {

    $.ajax({
        url: "/StockOutward/GetDataLoadEditReqNo",
        data: JSON.stringify({ ReqMasNo: GEReqNo }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            var obj = json.Value;
            if (json.Status == 'SUCCESS') {
                var data = json.Value;


                //$('#ddlReqNo').empty();

               // $(ddlReqNo).append($('<option/>').val('0').text('--Select Req No--'));
                $.each(data, function () {
                    $(ddlReqNo).append($('<option></option>').val(this.ReqMasId).text(this.ReqMasNo));

                });
            }

        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadReqItem() {


    var comid = $('#ddlCompany').val();
    var proid = $('#ddlProcess').val();
    var wrkid = $('#ddlDivision').val();
    var tostoreid = $('#ddlTostore').val();


    var Motype = $('input[name="MOType"]:checked').attr('value');
    if (Motype == 'U') {
        var comunitid = $('#ddlCmpanyunit').val();
        if (comunitid == 0) {
            //alert("Please Select Internal Unit..");
            var msg = 'Please Select Internal Unit...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            $('#ddlReqNo').val(0);
            return true;

        }

    } else {
        var suppid = $('#ddlSupplier').val();
        if (suppid == 0) {
            //alert("Please Select Supplier..");
            var msg = 'Please Select Supplier...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            $('#ddlReqNo').val(0);
            return true;

        }
    }

    if (comid == 0) {
        //alert("Please Select Company Name..");
        var msg = 'Please Select Company Name...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        $('#ddlReqNo').val(0);
        return true;

    }

    if (proid == 0) {
        //alert("Please Select To Process Name..");
        var msg = 'Please Select To Process Name...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        $('#ddlReqNo').val(0);
        return true;
    }

    if (wrkid == 0) {
        //alert("Please Select To Division Name..");
        var msg = 'Please Select To Division Name...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        $('#ddlReqNo').val(0);
        return true;
    }
    if (tostoreid == 0) {
        //alert("Please Select To ToStore..");
        var msg = 'Please Select To ToStore...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        $('#ddlReqNo').val(0);
        return true;
    }


    var ReqId = $('#ddlReqNo').val();

    if (ReqId > 0) {
        ReqLoadItem(ReqId);
    }
    var ItmId = 0;
    var ClrId = 0;
    var SzId = 0;
    var UId = 0;
    var Issid = 0;
    

    LoadStk(ItmId, ClrId, SzId, UId, Issid, ReqId);
}

function LoadEmployeeStoreunit() {
    debugger;
    if (UserName == 'superuser') {
        LoginUserid = 0;
    }
    var compid = $('#ddlCompany').val();

    $.ajax({
        url: "/StoreSetup/GetStoreRights",
        data: JSON.stringify({ Userid: LoginUserid, Storetype: 'M', Companyid: compid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var data = result.Value;
            $(ddlTostore).empty();
            $(ddlTostore).append($('<option/>').val('0').text('--Select Store--'));
            $.each(data, function () {
                $(ddlTostore).append($('<option></option>').val(this.Storeid).text(this.StoreName));
            });
            $(ddlTostore).trigger("select2:updated");
            if (editmasunitstore > 0) {
                $('#ddlTostore').val(editmasunitstore).trigger('change');
            }
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });



}
function GetItemGroupItem() {
    debugger;
    var IGId = $('#ddlItemGroup').val();
    $.ajax({
        url: "/StockOutward/GetItem",
        data: JSON.stringify({ ItemGroupId: IGId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var data = result.Value;
            $(ddlItem).empty();
            $(ddlItem).append($('<option/>').val('0').text('--Select Item--'));
            $.each(data, function () {
                $(ddlItem).append($('<option></option>').val(this.ItemID).text(this.Item));
            });
            $(ddlItem).trigger("select2:updated");
        }
    });

}

function LoadFOrdDropDetails() {


    var BMasId = $('#ddlOrderNo').val();
    var JbId = 0;
    var StyId = $('#ddlStyle').val();
    var RefNo = "";

    $.ajax({
        url: "/StockAuditEntry/GetDropNo",
        data: JSON.stringify({ BMasId: BMasId, JobId: JbId, Styleid: StyId, RefNo: RefNo }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;


                ////RefNo
                //$(ddlRefNo).empty();
                //$(ddlRefNo).append($('<option/>').val('0').text('--Select RefNo--'));
                //$.each(data, function () {
                //    $(ddlRefNo).append($('<option></option>').text(this.RefNo));
                //});

                ////JobNo
                //$(ddlFWorkNo).empty();
                //$(ddlFWorkNo).append($('<option/>').val('0').text('--Select JobNo--'));
                //$.each(data, function () {
                //    $(ddlFWorkNo).append($('<option></option>').val(this.JobId).text(this.Job_Ord_no));
                //});

                //Style
                $(ddlStyle).empty();
                $(ddlStyle).append($('<option/>').val('0').text('--Select Style--'));
                $.each(data, function () {
                    $(ddlStyle).append($('<option></option>').val(this.Styleid).text(this.Style));
                });
            }


        }

    });

}

function LoadNetGrossAmt() {
    debugger;
    var TotNetAmt = 0;
    var TotGrossAmt = 0;
    var DecimalPlace = 0;
    $.each(Itmdet, function (i) {
        var InvAmt = Itmdet[i].amount;
        TotGrossAmt = parseFloat(TotGrossAmt) + parseFloat(InvAmt);
        //DecimalPlace = ESaveItemList[i].DecimalPlace;
    });
    //if (DecimalPlace > 0) {

    //} else {
    //    DecimalPlace = 2;
    //}
    var DecimalPlace = 2;

    if (AccList.length > 0) {
        var plusamt = 0;
        var minusamt = 0;

        $.each(AccList, function (i) {

            var Percentage = parseFloat(AccList[i].percentage);
            var PlusOrMinus = AccList[i].PlusOrMinus;

            if (PlusOrMinus == '+') {
                var Amt = parseFloat(AccList[i].Amount);
                plusamt = parseFloat(plusamt) + Amt;
            }
            if (PlusOrMinus == '-') {
                var Amt = parseFloat(AccList[i].Amount);
                minusamt = parseFloat(minusamt) + Amt;
            }

        });

        var addless = plusamt - minusamt;
        $('#txtAddLess').val(addless);
        
        TotNetAmt = TotGrossAmt;
        TotNetAmt = TotNetAmt + plusamt;
        TotNetAmt = TotNetAmt - minusamt;
        TotNetAmt = parseFloat(TotNetAmt).toFixed(DecimalPlace);
        $('#txtNetamt').val(TotNetAmt);
    }
    else {
        TotGrossAmt = parseFloat(TotGrossAmt).toFixed(DecimalPlace);
        $('#txtNetamt').val(TotGrossAmt);
    }
    TotGrossAmt = parseFloat(TotGrossAmt).toFixed(DecimalPlace);
    $('#txtGrossAmount').val(TotGrossAmt);
    $("#txttotalamt").val(TotGrossAmt);

}

function TypeClick(){}