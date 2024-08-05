var POrdID = 0;
var ItmList = [];
var jobdet = [];
var jobdetsave = [];
var CompanyId = 0;
var Companyunitid = 0;
var Processorid = 0;
var Processid = 0;
var Prodid = 0;
var Itmid = 0;
var Colorid = 0;
var Sizeid = 0;
var PlanSizeid = 0;
var indiptitm = -1;
var inditjbdet = -1;
var Masid = 0;
var MainFDate = 0;
var Userid = 0;
var UserName = 0;
var repobj = [];
var Repid = 0;
var Guserid = 0;
var ChkBudProApp = 0;
var processname = 0;
var maingridlist = [];
var AllotedItemList = [];
var QltyAllotedItemList = [];
var Gs = '';
var printprocessname = 0;
var EOtype = 0;
var pallown = 0;
var balallow = 0;
var itmbalallow = 0;
var rptord = '';
var rptref = '';
var rptsty = '';
var DCompid = 0;
var ChkRefno = true;
var ChkOrdno = true;
var DtChk = false;
var ChkSupplier = true;
var ChkStyle = true;
var ChkRecptNo = true;
var ChkComp = false;
var ChkProcess = true;
var ChkDCNo = true;
var ChkUnit = true;
var LoginUserid = '';
var LotItemList = [];
var LotItemListSave = [];
var GJobRowID = 0;
var prcrecjobdetid = 0;
var prcordjobdetid = 0;
var prcrecdetid = 0;
var GChkType = 0;
var GJobBalQty = 0;
var ValidateProcessStore = "False";
var view = 0;
var UserGroup = '';

var MainList_barcode = [];
var MainList_barcodeScanList = [];

$(document).ready(function () {
    debugger;
    //LoadCompanyDDL("#ddlCompany");
    //LoadCompanyUnitDDL("#ddlUnit");
    //LoadWorkdivisionDDL("#ddlwrkdiv");
    //LoadSupplierDDL("#ddlSupplier");
    LoginUserid = $("#hdnLoginUserid").data('value');
    Guserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    MainFDate = $("#hdMainFromDate").data('value');
    DCompid = $("#hdnDCompid").data('value');
    ValidateProcessStore = $("#hdnValidateProcessStore").data('value');
    //LoadWrkdiv();
    //LoadProcessor();
    LoadBuyerDDL("#ddlinnerbuyer,#ddlMBuyer");
    LoadOrderNoDDL("#ddlOrderNo,#ddlAOrderNo");
    LoadRefNoDDL("#ddlRefNo,#ddlARefNo");
    LoadBuyerDDL("#ddlBuyer");
    LoadCompanyDDL("#ddlMCompany,#ddlCompany");
    LoadCompanyUnitDDL("#ddlUnit");
    ChkBudProApp = $("#hdnCostBudProcessAppid").data('value');
    Gs = "Rcpt";
    getDate();
    loadUserGroup();

    // ListOrRefNo();
    // ListPStyle();
    //LoadEmployeeStoreunit();
    //LoadUserCompanyDDL();

    var fill = localStorage.getItem('ProcessReceiptMainFilter');
    if (fill != "null" && fill != null) {
        LoadMaingridFromBack();
    } else {
        LoadMaingrid();
    }

    //LoadMaingrid();
    Floadsize();
    //LoadMaingrid();

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
    $("#tblcompdetails").dataTable().find("tbody").on('click', 'td', function () {
        debugger;
        $('input[id=groupbom]').each(function () {
            var row = $(this).closest('tr');
            if ($(this).is(':checked')) {
                var val = $(this).val();
                for (var d = 0; d < entrygriddet.length; d++) {
                    if (entrygriddet[d].processordid == val) {
                        entrygriddet[d].CheckLoad = "Y";
                    }
                }

            }
            else {
                var val = $(this).val();
                for (var d = 0; d < entrygriddet.length; d++) {
                    if (entrygriddet[d].processordid == val) {
                        entrygriddet[d].CheckLoad = "N";
                    }

                }
            }

        });

    });


    $(document).on('click', '.groupbomAdd', function () {
        debugger;

        var table = $('#tbljobordinfo').DataTable();
        var ProcessOrdJobDetid = table.row($(this).parents('tr')).data()["ProcessOrdJobDetid"];
        var Proc_Recpt_JobDetid = table.row($(this).parents('tr')).data()["Proc_Recpt_JobDetid"];
        var Proc_Recpt_Detid = table.row($(this).parents('tr')).data()["Proc_Recpt_Detid"];
        var allow = table.row($(this).parents('tr')).data()["allow"];




        var chk = true;

        if ($(this).is(':checked')) {

            chk = true;
            for (var d = 0; d < jobdet.length; d++) {
                if (jobdet[d].ProcessOrdJobDetid == ProcessOrdJobDetid) {
                    jobdet[d].CheckType = "Y";
                }
            }

        }
        else {

            chk = false;
            for (var d = 0; d < jobdet.length; d++) {
                if (jobdet[d].ProcessOrdJobDetid == ProcessOrdJobDetid) {
                    jobdet[d].CheckType = "N";
                }

            }
        }

        var table = $('#tbljobordinfo').DataTable();
        var ecdata = table.rows().data();

        $('input[id=txtOpjobOrdQty]').each(function (ig) {
            var row = $(this).closest('tr');
            for (var h = 0; h < jobdet.length; h++) {
                if (jobdet[h].CheckType == "Y" && jobdet[h].ProcessOrdJobDetid == ecdata[ig].ProcessOrdJobDetid) {
                    row.find('#txtOpjobOrdQty').attr("disabled", true);

                }

                else if (jobdet[h].CheckType == "N" && jobdet[h].ProcessOrdJobDetid == ecdata[ig].ProcessOrdJobDetid) {

                    row.find('#txtOpjobOrdQty').attr("disabled", false);

                }
            }

        });


        if (chk) {


            prcrecjobdetid = Proc_Recpt_JobDetid;
            prcordjobdetid = ProcessOrdJobDetid;
            prcrecdetid = Proc_Recpt_Detid;
            GJobBalQty = allow;



        }

        if (!chk) {


            if (LotItemList.length > 0) {
                LotItemList = $.grep(LotItemList, function (e) {

                    return e.ProcessJobOrdId != ProcessOrdJobDetid;

                });
                loadLotTable(LotItemList);
            }

            if (LotItemListSave.length > 0) {

                LotItemListSave = $.grep(LotItemListSave, function (e) {

                    return e.ProcessJobOrdId != ProcessOrdJobDetid;

                });
            }
        }


    });



    $('#tblmaindetails').on('click', 'tr', function (e) {
        debugger;

        var table = $('#tblmaindetails').DataTable();

        var row = $(this).closest('tr');
        var data = $('#tblmaindetails').dataTable().fnGetData(row);


        var ItmId = data[0];

        printprocessname = data[4];
        LoadMainOrderDetails(ItmId);
        LoadMainOrderStkDetails(ItmId);
        var ProcessOrdNo = data[1];
        LoadItemMovements(ProcessOrdNo);


    });





    $(document).on('keyup', '.calcipAmt', function () {
        debugger;

        var table = $('#tblcbompdetails').DataTable();


        var CSno = table.row($(this).parents('tr')).data()["sno"];
        var IId = table.row($(this).parents('tr')).data()["itemid"];
        var CId = table.row($(this).parents('tr')).data()["colorid"];
        var SId = table.row($(this).parents('tr')).data()["sizeid"];
        var PSId = table.row($(this).parents('tr')).data()["PlanSizeID"];
        var OrdBalQty = table.row($(this).parents('tr')).data()["allow"];
        var prod = table.row($(this).parents('tr')).data()["procordid"];

        var Val = $(this).val();
        var value = $(this).val();

        for (j = 0; ItmList.length > j; j++) {
            if (CId == ItmList[j].colorid && IId == ItmList[j].itemid && SId == ItmList[j].sizeid && CSno == ItmList[j].sno) {
                var bal = ItmList[j].orderqty + pallown;

                var prgqty = parseFloat(ItmList[j].orderqty);
                var ordqty = parseFloat(ItmList[j].Received_qty);
                if (prgqty < ordqty && value < ordqty) {
                    var balqty = ordqty - prgqty;
                    for (k = 0; ItmList.length > k; k++) {
                        ItmList[k].allow = ItmList[k].allow + balqty;
                    }
                    itmbalallow = itmbalallow - balqty;

                    var balres = 0;
                    for (var t = 0; t < jobdetsave.length; t++) {
                        if (jobdetsave[t].Itemid == IId && jobdetsave[t].Colorid == CId && jobdetsave[t].Sizeid == SId && jobdetsave[t].processordid == prod && jobdetsave[t].PlanSizeID == PSId) {
                            var btest = 0;
                            if (parseFloat(jobdetsave[t].Received_Qty) > parseFloat(jobdetsave[t].orderqty)) {
                                btest = (parseFloat(jobdetsave[t].Received_Qty) - parseFloat(jobdetsave[t].orderqty));
                                balres = balres + btest;
                            }
                        }
                    }

                    for (k = 0; jobdetsave.length > k; k++) {
                        jobdetsave[k].allow = jobdetsave[k].allow + balres;
                    }
                    balallow = balallow - balres;

                }
            }
        }

        for (j = 0; ItmList.length > j; j++) {
            if (CId == ItmList[j].colorid && IId == ItmList[j].itemid && SId == ItmList[j].sizeid && CSno == ItmList[j].sno) {

                var balqtychk = ItmList[j].allow;

            }
        }



        if (Val > balqtychk) {
            // alert("OrderQty Should Not Greater then OrderBalanceQty..");



            $.each(ItmList, function () {
                if (this.sno == CSno) {
                    this.Received_qty = balqtychk;

                }
            });

            // LoaditmTab(ItmList);
            var table = $('#tblcbompdetails').DataTable();
            var ecdata = table.rows().data();

            $('input[id=txtrecvdqty]').each(function (ig) {
                var slno = ecdata[ig].sno;
                var row = $(this).closest('tr');
                for (var h = 0; h < ItmList.length; h++) {
                    if (slno == ItmList[h].sno) {
                        var Received_qty = ItmList[h].Received_qty;
                        row.find('#txtrecvdqty').val(Received_qty);

                    }
                }

            });
            Val = balqtychk;
            var pid = [];
            var bal = [];
            var qty = [];
            for (var t = 0; t < jobdetsave.length; t++) {
                if (jobdetsave[t].Itemid == IId && jobdetsave[t].Colorid == CId && jobdetsave[t].Sizeid == SId && jobdetsave[t].processordid == prod && jobdetsave[t].PlanSizeID == PSId) {
                    pid.push(jobdetsave[t].sno);
                    bal.push(jobdetsave[t].allow);
                    qty.push(jobdetsave[t].Received_Qty);
                }
            }
            var c = pid.length;
            var t = 0;

            if (Val < bal[0]) {

                qty[0] = Val;
                for (var j = 1; j < qty.length; j++) {
                    qty[j] = 0;
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
            for (var u = 0; u < jobdetsave.length; u++) {
                for (var r = 0; r < pid.length; r++) {
                    if (jobdetsave[u].sno == pid[r]) {
                        jobdetsave[u].Received_Qty = qty[r];
                    }
                }
            }

            colorempty = jobdetsave;

            colorempty = $.grep(colorempty, function (v) {
                return (v.Itemid === IId && v.Colorid === CId && v.Sizeid === SId && v.processordid === prod && v.PlanSizeID === PSId);
            });
            var totalrecev = 0;
            var receqty = 0
            for (i = 0; qty.length > i; i++) {
                receqty = parseInt(qty[i], 10);
                totalrecev = totalrecev + receqty;
            }
            // LoadJobdetTab(colorempty);
            $.each(ItmList, function () {
                if (this.sno == CSno) {
                    this.Received_qty = totalrecev;

                }
            });

            // LoaditmTab(ItmList);
            var table = $('#tblcbompdetails').DataTable();
            var ecdata = table.rows().data();

            $('input[id=txtrecvdqty]').each(function (ig) {
                var slno = ecdata[ig].sno;
                var row = $(this).closest('tr');
                for (var h = 0; h < ItmList.length; h++) {
                    if (slno == ItmList[h].sno) {
                        var Received_qty = ItmList[h].Received_qty;
                        row.find('#txtrecvdqty').val(Received_qty);

                    }
                }

            });

            var table = $('#tbljobordinfo').DataTable();
            var ecdata = table.rows().data();

            $('input[id=txtOpjobOrdQty]').each(function (ig) {
                var slno = ecdata[ig].sno;
                var row = $(this).closest('tr');
                for (var h = 0; h < jobdetsave.length; h++) {
                    if (slno == jobdetsave[h].sno) {
                        var Received_Qty = jobdetsave[h].Received_Qty;
                        row.find('#txtOpjobOrdQty').val(Received_Qty);

                    }
                }

            });


            jobdet = [];
            jobdet = colorempty;

            return true;
        }
        $.each(ItmList, function () {
            if (this.sno == CSno) {
                this.Received_qty = Val;

            }
        });

        // LoaditmTab(ItmList);
        var table = $('#tblcbompdetails').DataTable();
        var ecdata = table.rows().data();

        $('input[id=txtrecvdqty]').each(function (ig) {
            var slno = ecdata[ig].sno;
            var row = $(this).closest('tr');
            for (var h = 0; h < ItmList.length; h++) {
                if (slno == ItmList[h].sno) {
                    var Received_qty = ItmList[h].Received_qty;
                    row.find('#txtrecvdqty').val(Received_qty);

                }
            }

        });

        var pid = [];
        var bal = [];
        var qty = [];
        for (var t = 0; t < jobdetsave.length; t++) {
            if (jobdetsave[t].Itemid == IId && jobdetsave[t].Colorid == CId && jobdetsave[t].Sizeid == SId && jobdetsave[t].processordid == prod && jobdetsave[t].PlanSizeID == PSId) {
                pid.push(jobdetsave[t].sno);
                bal.push(jobdetsave[t].allow);
                qty.push(jobdetsave[t].Received_Qty);
            }
        }
        var c = pid.length;
        var t = 0;

        if (Val < bal[0]) {

            qty[0] = Val;
            for (var j = 1; j < qty.length; j++) {
                qty[j] = 0;
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
        for (var u = 0; u < jobdetsave.length; u++) {
            for (var r = 0; r < pid.length; r++) {
                if (jobdetsave[u].sno == pid[r]) {
                    jobdetsave[u].Received_Qty = qty[r];
                }
            }
        }

        colorempty = jobdetsave;

        colorempty = $.grep(colorempty, function (v) {
            return (v.Itemid === IId && v.Colorid === CId && v.Sizeid === SId && v.processordid === prod && v.PlanSizeID === PSId);
        });

        var totalrecev = 0;
        var receqty = 0
        for (i = 0; qty.length > i; i++) {
            receqty = parseInt(qty[i], 10);
            totalrecev = totalrecev + receqty;
        }
        // LoadJobdetTab(colorempty);
        $.each(ItmList, function () {
            if (this.sno == CSno) {
                this.Received_qty = totalrecev;

            }
        });

        // LoaditmTab(ItmList);
        var table = $('#tblcbompdetails').DataTable();
        var ecdata = table.rows().data();

        $('input[id=txtrecvdqty]').each(function (ig) {
            var slno = ecdata[ig].sno;
            var row = $(this).closest('tr');
            for (var h = 0; h < ItmList.length; h++) {
                if (slno == ItmList[h].sno) {
                    var Received_qty = ItmList[h].Received_qty;
                    row.find('#txtrecvdqty').val(Received_qty);

                }
            }

        });

        // LoadJobdetTab(colorempty);

        var table = $('#tbljobordinfo').DataTable();
        var ecdata = table.rows().data();

        $('input[id=txtOpjobOrdQty]').each(function (ig) {
            var slno = ecdata[ig].sno;
            var row = $(this).closest('tr');
            for (var h = 0; h < jobdetsave.length; h++) {
                if (slno == jobdetsave[h].sno) {
                    var Received_Qty = jobdetsave[h].Received_Qty;
                    row.find('#txtOpjobOrdQty').val(Received_Qty);

                }
            }

        });


        jobdet = [];
        jobdet = colorempty;

        //Datatable textbox focus
        var rows = $("#tblcbompdetails").dataTable().fnGetNodes();
        var dtTable = $('#tblcbompdetails').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
            $('input[id=txtrecvdqty]').each(function () {
                if (sn == CSno && $(this).val() == Val) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtrecvdqty').val();
                    row.find('#txtrecvdqty').focus().val('').val(num);
                    return true;
                }
            });
        }
    });
    $(document).on('keyup', '.calcrate', function () {
        debugger;


        var table = $('#tblcbompdetails').DataTable();
        var CSno = table.row($(this).parents('tr')).data()["sno"];

        var val = $(this).val();

        $.each(ItmList, function () {
            if (this.sno == CSno) {
                this.rate = val;

            }
        });

        LoaditmTab(ItmList);

        //Datatable textbox focus
        var rows = $("#tblcbompdetails").dataTable().fnGetNodes();
        var dtTable = $('#tblcbompdetails').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
            $('input[id=txtrate]').each(function () {
                if (sn == CSno && $(this).val() == val) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtrate').val();
                    row.find('#txtrate').focus().val('').val(num);
                    return true;
                }
            });
        }
    });

    $(document).on('keyup', '.calcipsecAmt', function () {
        debugger;


        var table = $('#tblcbompdetails').DataTable();
        var CSno = table.row($(this).parents('tr')).data()["sno"];

        var val = $(this).val();

        $.each(ItmList, function () {
            if (this.sno == CSno) {
                this.Sec_Qty = val;

            }
        });

        // LoaditmTab(ItmList);

        var otable = $('#tblcbompdetails').DataTable();
        var odata = otable.rows().data();

        $('input[id=txtsecqty]').each(function (ig) {
            if (odata[ig].sno == CSno) {
                var row = $(this).closest('tr');
                // row.find('#txtOpOrdQty').val(totalamnt);
                row.find('#txtsecqty').focus().val('').val(val);
            }
        });



        ////Datatable textbox focus
        //var rows = $("#tblcbompdetails").dataTable().fnGetNodes();
        //var dtTable = $('#tblcbompdetails').DataTable();
        //for (var i = 0; i < rows.length; i++) {
        //    var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
        //    $('input[id=txtrate]').each(function () {
        //        if (sn == CSno && $(this).val() == val) {
        //            var row = $(this).closest('tr');
        //            var num = row.find('#txtrate').val();
        //            row.find('#txtrate').focus().val('').val(num);
        //            return true;
        //        }
        //    });
        //}
    });

    $('#tbljobordinfo').on('click', 'tr', function (e) {

        if (balallow < pallown) {
            balallow = 0;
            for (j = 0; jobdetsave.length > j; j++) {

                if (jobdetsave[j].Received_Qty > 0) {
                    var ordqty = jobdetsave[j].Received_Qty;
                    var allow = jobdetsave[j].orderqty + pallown;
                    var progqty = jobdetsave[j].orderqty;
                    if (progqty < ordqty) {
                        var bal = 0;
                        bal = (allow - ordqty);
                        bal = pallown - bal;
                        balallow = balallow + bal;
                    }
                }
            }
            for (k = 0; jobdetsave.length > k; k++) {
                jobdetsave[k].allow = (jobdetsave[k].orderqty + pallown) - balallow;

            }
        }

    });

    $(document).on('change', '.loadfabsizelist', function () {
        debugger;
        var table = $('#tblcbompdetails').DataTable();

        var CSno = table.row($(this).parents('tr')).data()["sno"];
        var IId = table.row($(this).parents('tr')).data()["itemid"];
        var CId = table.row($(this).parents('tr')).data()["colorid"];
        var SId = table.row($(this).parents('tr')).data()["PlanSizeID"];
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

        $.each(ItmList, function () {
            if (this.sno == CSno) {
                this.FinDia = fs;
                this.FinSizeID = val;
            }
        });




    });


    $(document).on('keyup', '.calcsepquan', function () {
        debugger;
        var table = $('#tbljobordinfo').DataTable();


        var pid = table.row($(this).parents('tr')).data()["processordid"];
        var itmid = table.row($(this).parents('tr')).data()["Itemid"];
        var colorid = table.row($(this).parents('tr')).data()["Colorid"];
        var sizeid = table.row($(this).parents('tr')).data()["Sizeid"];
        var sno = table.row($(this).parents('tr')).data()["sno"];
        var balq = table.row($(this).parents('tr')).data()["allow"];
        var pjid = table.row($(this).parents('tr')).data()["ProcessOrdJobDetid"];

        var value = $(this).val();


        //for (j = 0; jobdetsave.length > j; j++) {
        //    if (colorid == jobdetsave[j].Colorid && itmid == jobdetsave[j].Itemid && sizeid == jobdetsave[j].Sizeid && sno == jobdetsave[j].sno) {
        //        var bal = jobdetsave[j].orderqty + pallown;
        //        var prgqty = jobdetsave[j].orderqty;
        //        var ordqty = jobdetsave[j].Received_Qty;
        //        if (prgqty < ordqty && value < ordqty) {
        //            var balqty = ordqty - prgqty;
        //            for (k = 0; jobdetsave.length > k; k++) {
        //                jobdetsave[k].allow = jobdetsave[k].allow + balqty;
        //            }
        //            balallow = balallow - balqty;

        //            for (k = 0; ItmList.length > k; k++) {
        //                ItmList[k].allow = ItmList[k].allow + balqty;
        //            }
        //            itmbalallow = itmbalallow - balqty;
        //        }
        //    }
        //}


        $.each(jobdetsave, function () {
            if (this.ProcessOrdJobDetid == pjid) {


                if (balq >= value) {
                    this.Received_Qty = value;
                }
                else {
                    var t = value - balq;
                    this.Received_Qty = balq;
                }

            }
        });


        var totalamnt = 0;

        for (var e = 0; e < jobdetsave.length; e++) {
            if (jobdetsave[e].Itemid == itmid && jobdetsave[e].Sizeid == sizeid && jobdetsave[e].Colorid == colorid && jobdetsave[e].processordid == pid) {
                var amount = jobdetsave[e].Received_Qty;
                totalamnt = totalamnt + parseFloat(amount);
            }
        }
        $.each(ItmList, function () {
            if (this.itemid == itmid && this.sizeid == sizeid && this.colorid == colorid && this.procordid == pid) {
                this.Received_qty = totalamnt;
            }
        });

        colorempty = jobdetsave;
        colorempty = $.grep(colorempty, function (v) {
            return (v.Itemid === itmid && v.Colorid === colorid && v.Sizeid === sizeid && v.processordid === pid);
        });

        // LoadJobdetTab(colorempty);

        // LoadJobdetTab(colorempty);

        //var table = $('#tbljobordinfo').DataTable();
        //var ecdata = table.rows().data();

        //$('input[id=txtOpjobOrdQty]').each(function (ig) {
        //    var slno = ecdata[ig].sno;
        //    var row = $(this).closest('tr');
        //    for (var h = 0; h < jobdetsave.length; h++) {
        //        if (jobdetsave[h].sno == slno) {
        //            var Received_Qty = jobdetsave[h].Received_Qty;
        //            row.find('#txtOpjobOrdQty').val(Received_Qty);

        //        }
        //    }

        //});






        // LoaditmTab(ItmList);
        var table = $('#tblcbompdetails').DataTable();
        var ecdata = table.rows().data();

        $('input[id=txtrecvdqty]').each(function (ig) {
            var slno = ecdata[ig].sno;
            var row = $(this).closest('tr');
            for (var h = 0; h < ItmList.length; h++) {
                if (slno == ItmList[h].sno) {
                    var Received_qty = ItmList[h].Received_qty;
                    row.find('#txtrecvdqty').val(Received_qty);

                }
            }

        });



        var table = $('#tbljobordinfo').DataTable();
        var ecdata = table.rows().data();
        debugger;
        $('input[id=txtOpjobOrdQty]').each(function (ig) {

            var row = $(this).closest('tr');
            for (var h = 0; h < jobdetsave.length; h++) {
                debugger;
                if (ecdata[ig].Itemid == jobdetsave[h].Itemid && ecdata[ig].Colorid == jobdetsave[h].Colorid && ecdata[ig].sizeid == jobdetsave[h].sizeid
                    && ecdata[ig].processordid == jobdetsave[h].processordid && ecdata[ig].Itemid == itmid && ecdata[ig].Colorid == colorid && ecdata[ig].sizeid == sizeid
                    && ecdata[ig].ProcessOrdJobDetid == pjid) {

                    var issues = jobdetsave[h].Received_Qty;
                    //row.find('#txtiptissQty').val(issues);
                    //var num = row.find('#txtiptissQty').val();
                    row.find('#txtOpjobOrdQty').focus().val('').val(issues);
                    return true;
                }
            }

        });

        ReceiptTotal();

        ////Datatable textbox focus
        //var rows = $("#tbljobordinfo").dataTable().fnGetNodes();
        //var dtTable = $('#tbljobordinfo').DataTable();
        //for (var i = 0; i < rows.length; i++) {
        //    var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
        //    $('input[id=txtOpjobOrdQty]').each(function () {
        //        if (sn == sno && $(this).val() == value) {
        //            var row = $(this).closest('tr');
        //            var num = row.find('#txtOpjobOrdQty').val();
        //            row.find('#txtOpjobOrdQty').focus().val('').val(num);
        //            return true;
        //        }
        //    });
        //}
    });
    //secqty
    $(document).on('keyup', '.calcsepsecquan', function () {
        debugger;
        var table = $('#tbljobordinfo').DataTable();


        var pid = table.row($(this).parents('tr')).data()["processordid"];
        var itmid = table.row($(this).parents('tr')).data()["Itemid"];
        var colorid = table.row($(this).parents('tr')).data()["Colorid"];
        var sizeid = table.row($(this).parents('tr')).data()["Sizeid"];
        var sno = table.row($(this).parents('tr')).data()["sno"];
        //var balq = table.row($(this).parents('tr')).data()["allow"];

        var value = $(this).val();

        $.each(jobdetsave, function () {
            if (this.sno == sno) {
                this.Sec_Qty = value;
            }
        });

        colorempty = jobdetsave;
        colorempty = $.grep(colorempty, function (v) {
            return (v.Itemid === itmid && v.Colorid === colorid && v.Sizeid === sizeid && v.processordid === pid);
        });

        // LoadJobdetTab(colorempty);




        var totsec = 0;
        $.each(colorempty, function (g) {
            totsec = totsec + parseFloat(colorempty[g].Sec_Qty);

        });

        $.each(ItmList, function (h) {
            if (ItmList[h].itemid == itmid && ItmList[h].colorid == colorid && ItmList[h].sizeid == sizeid && ItmList[h].procordid == pid) {
                ItmList[h].Sec_Qty = totsec;
            }
        });

        //LoaditmTab(ItmList);

        var otable = $('#tblcbompdetails').DataTable();
        var odata = otable.rows().data();
        $('input[id=txtsecqty]').each(function (ig) {
            if (odata[ig].procordid == pid && odata[ig].itemid == itmid && odata[ig].colorid == colorid && odata[ig].sizeid == sizeid) {
                var row = $(this).closest('tr');
                // row.find('#txtOpOrdQty').val(totalamnt);
                row.find('#txtsecqty').val(totsec);
            }
        });

        var table = $('#tbljobordinfo').DataTable();
        var ecdata = table.rows().data();
        debugger;
        $('input[id=txtOpjobOrdSecQty]').each(function (ig) {
            var row = $(this).closest('tr');
            if (ecdata[ig].sno == sno) {
                row.find('#txtOpjobOrdSecQty').focus().val('').val(value);
                // return true;
            }

        });


    });
    //
    $('#tblcbompdetails').on('click', 'tr', function (e) {

        var table = $('#tblcbompdetails').DataTable();

        //var ItmId = table.row($(this).parents('tr')).data()["itemid"];
        //var ClrId = table.row($(this).parents('tr')).data()["colorid"];
        //var SzId = table.row($(this).parents('tr')).data()["sizeid"];
        //var PId = table.row($(this).parents('tr')).data()["procordid"];


        var row = $(this).closest('tr');
        var data = $('#tblcbompdetails').dataTable().fnGetData(row);


        var ItmId = data.itemid;
        var ClrId = data.colorid;
        var SzId = data.sizeid;
        var PlanSzId = data.PlanSizeID;
        var PId = data.procordid;

        //if (itmbalallow < pallown) {
        //    itmbalallow = 0;
        //    for (j = 0; ItmList.length > j; j++) {

        //        if (ItmList[j].Received_qty > 0) {
        //            var ordqty = ItmList[j].Received_qty;
        //            var allow = ItmList[j].orderqty + pallown;
        //            var progqty = ItmList[j].orderqty;
        //            if (progqty < ordqty) {
        //                var bal = 0;
        //                bal = (allow - ordqty);
        //                bal = pallown - bal;
        //                itmbalallow = itmbalallow + bal;
        //            }
        //        }
        //    }
        //    for (k = 0; ItmList.length > k; k++) {
        //        ItmList[k].allow = (ItmList[k].orderqty + pallown) - itmbalallow;

        //    }
        //    //LoaditmTab(ItmList);
        //}


        //if (balallow < pallown) {
        //    balallow = 0;
        //    for (j = 0; jobdetsave.length > j; j++) {

        //        if (jobdetsave[j].Received_Qty > 0) {
        //            var ordqty = jobdetsave[j].Received_Qty;
        //            var allow = jobdetsave[j].orderqty + pallown;
        //            var progqty = jobdetsave[j].orderqty;
        //            if (progqty < ordqty) {
        //                var bal = 0;
        //                bal = (allow - ordqty);
        //                bal = pallown - bal;
        //                balallow = balallow + bal;
        //            }
        //        }
        //    }
        //    for (k = 0; jobdetsave.length > k; k++) {
        //        jobdetsave[k].allow = (jobdetsave[k].orderqty + pallown) - balallow;

        //    }
        //}



        var colorempty = [];
        colorempty = jobdetsave;

        colorempty = $.grep(colorempty, function (v) {
            return (v.Itemid === ItmId && v.Colorid === ClrId && v.Sizeid === SzId && v.processordid === PId && v.PlanSizeID === PlanSzId);
        });

        jobdet = colorempty;
        LoadJobdetTab(jobdet);
    });

});




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

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

    $.ajax({
        url: "/StoreSetup/GetStoreRights",
        data: JSON.stringify({ Userid: LoginUserid, Storetype: 'B', Companyid: CompanyId }),
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
            if (data[i].CompanyId == CompanyId) {
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

function LoadMainOrderDetails(Pid) {

    debugger;

    $.ajax({
        url: "/ProcessReceipt/LoadMainOrderdet",
        data: JSON.stringify({ pid: Pid }),
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
                var od = obj[t].orderno;
                var re = obj[t].refno;
                var st = obj[t].style;
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
            rptord = ord;
            rptref = ref;
            rptsty = sty;
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}

function LoadMainOrderStkDetails(Pid) {

    debugger;

    $.ajax({
        url: "/ProcessReceipt/LoadMainOrderstkdet",
        data: JSON.stringify({ pid: Pid }),
        type: "POST",
        async: false,
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;

            var trans = "";

            for (var t = 0; t < obj.length; t++) {
                var tr = obj[t].transno;

                if (trans == '') {
                    trans = tr;
                }
                else {
                    trans = trans + "," + tr;
                }



            }
            $('#txtmaintrans').val(trans);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}



function LoadProcess() {
    debugger;
    var cmpyid = $('select#ddlCompany option:selected').val();
    var cunitid = $('select#ddlUnit option:selected').val();
    if (cmpyid == 0) {
        //alert('Please select Company...');
        var msg = 'Please select Company...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }
    if (cunitid == 0) {
        //alert('Please select CompanyUnit...');
        var msg = 'Please select CompanyUnit...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }
    var protype = $('input[name="Revert"]:checked').attr('value');
    $.ajax({
        url: "/ProcessReceipt/Getprocess",
        data: JSON.stringify({ cmpid: cmpyid, cmpunitid: cunitid, ordertype: protype }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            if (result.Status == 'SUCCESS') {

                // if (Mode == 0) {
                var data = result.Value;
                $(ddlProcess).empty();
                $(ddlProcess).append($('<option/>').val('0').text('--Select Process--'));
                $.each(data, function () {
                    $(ddlProcess).append($('<option></option>').val(this.processid).text(this.process));
                });
                //}


            }


        }

    });
}

function LoadIssueno() {
    debugger;
    var cmpyid = $('select#ddlCompany option:selected').val();
    var cunitid = $('select#ddlUnit option:selected').val();
    if (cmpyid == 0) {
        //alert('Please select Company...');
        var msg = 'Please select Company...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }
    if (cunitid == 0) {
        //alert('Please select CompanyUnit...');
        var msg = 'Please select CompanyUnit...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }
    var proid = $('select#ddlProcess option:selected').val();
    var protype = $('input[name="optwrkord"]:checked').attr('value');
    if (protype = 'P') {
        var procrid = $('select#ddlSupplier option:selected').val();
    }
    else if (protype = 'W') {
        var procrid = $('select#ddlwrkdiv option:selected').val();
    }
    if (procrid == 0) {
        //alert('Please select Processor...');
        var msg = 'Please select Processor...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }
    $.ajax({
        url: "/ProcessReceipt/Getissueno",
        data: JSON.stringify({ cmpid: cmpyid, cmpunitid: cunitid, processid: proid, processorid: procrid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            if (result.Status == 'SUCCESS') {

                // if (Mode == 0) {
                var data = result.Value;
                $(ddlIssueNo).empty();
                $(ddlIssueNo).append($('<option/>').val('0').text('--Select IssueNo--'));
                $.each(data, function () {
                    $(ddlIssueNo).append($('<option></option>').val(this.processordid).text(this.processorder));
                });
                //}
            }

            //LoadAddgrid();
            //LoadColor();
        }

    });
}


function LoadAddgrid() {
    debugger;


    //var cmpyid = $('select#ddlCompany option:selected').val();
    //var cunitid = $('select#ddlUnit option:selected').val();
    //if (cmpyid == 0) {
    //    alert('Please select Company...');
    //    return true;
    //}
    //if (cunitid == 0) {
    //    alert('Please select CompanyUnit...');
    //    return true;
    //}
    //var proid = $('select#ddlProcess option:selected').val();
    //var protype = $('input[name="optwrkord"]:checked').attr('value');
    var type = $('input[name="Revert"]:checked').attr('value');// $('input[name="Revert"]:checked').attr('value');
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


    var cmpyid = $('select#ddlCompany option:selected').val();
    if (cmpyid == null || cmpyid == "0") {
        cmpyid = 0;
    }


    var clid = $('select#ddlColor option:selected').val();
    if (clid == null || clid == "0") {
        clid = 0;
    }
    var cunitid = $('select#ddlUnit option:selected').val();
    if (cunitid == null || cunitid == "0") {
        cunitid = 0;
    }
    var procid = $('select#ddlProcess option:selected').val();
    if (procid == null || procid == "0") {
        procid = 0;
    }
    var ordno = $('select#ddlOrderNo option:selected').val();
    if (ordno == null || ordno == "0") {
        ordno = "";
    }
    var refno = $('select#ddlRefNo option:selected').val();
    if (refno == null || refno == "0") {
        refno = "";
    }
    var buyerid = $('select#ddlBuyer option:selected').val();
    if (buyerid == null || buyerid == "0") {
        buyerid = 0;
    }
    $.ajax({
        url: "/ProcessReceipt/Loadaddgrid",


        data: JSON.stringify({ cmpid: cmpyid, cmpunitid: cunitid, processid: procid, processorid: procrid, ordtype: type, clsed: cl, colorid: clid, OrderNo: ordno, ReferNo: refno, BuyerId: buyerid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            entrygriddet = result.Value;
            for (var d = 0; d < entrygriddet.length; d++) {
                entrygriddet[d].proddate = moment(entrygriddet[d].proddate).format("DD/MM/YYYY")
            }
            LoadEntrytab(entrygriddet);
            //LoadAddgridddl();

        }

    });
}


$(document).ready(function () {
    $('input').bind("enterKey", function (e) {
        // alert("Enter key pressed");

        BarcodeScan();
    });
    $('input').keyup(function (e) {
        if (e.keyCode == 13) {
            $(this).trigger("enterKey");
        }
    });
});

function BarcodeScan() {
    debugger;

    var txtBarcodeScan_ProcessOrdNo = $('#txtBarcodeValue').val();

    for (var i = 0; i < MainList_barcodeScanList.length; i++) {

        if (MainList_barcodeScanList[i].processorder == txtBarcodeScan_ProcessOrdNo) {
            return;
        }
    }

    jQuery.each(MainList_barcode, function (i, val) {

        if (val.processorder == txtBarcodeScan_ProcessOrdNo) {

            var det = {
                processordid: val.processordid,
                processorder: val.processorder,
                proddate: val.proddate,
                processor: val.processor,
                ordqty: val.ordqty,
                recvdqty: val.recvdqty,
                bal: val.bal,
                FinProcess: val.FinProcess
            }
            MainList_barcodeScanList.push(det);

            LoadEntrytab_Barcode(MainList_barcodeScanList);
            $('#txtBarcodeValue').val("");

            return;
        }

        // return (val.processorder);
    });


    //for (var i = 0; i < MainList_barcode.length; i++) {

    //    if (MainList_barcode[i].processorder == txtBarcodeScan_ProcessOrdNo) {

    //        var det = {
    //            processordid: MainList_barcode[i].processordid,
    //            processorder: MainList_barcode[i].processorder,
    //            proddate: MainList_barcode[i].proddate,
    //            processor: MainList_barcode[i].processor,

    //            ordqty: MainList_barcode[i].ordqty,
    //            recvdqty: MainList_barcode[i].recvdqty,
    //            bal: MainList_barcode[i].bal,
    //            FinProcess: MainList_barcode[i].FinProcess
    //        }
    //        MainList_barcodeScanList.push(det);

    //        LoadEntrytab_Barcode(MainList_barcodeScanList);
    //        $('#txtBarcodeValue').val("");

    //        break;
    //    }
    //}

}

function LoadAddgridddl_Barcode() {
    debugger;
    //var cmpyid = $('select#ddlCompany option:selected').val();
    //var cunitid = $('select#ddlUnit option:selected').val();
    //if (cmpyid == 0) {
    //    alert('Please select Company...');
    //    return true;
    //}
    //if (cunitid == 0) {
    //    alert('Please select CompanyUnit...');
    //    return true;
    //}
    //var proid = $('select#ddlProcess option:selected').val();
    //var protype = $('input[name="optwrkord"]:checked').attr('value');
    var type = $('input[name="Revert"]:checked').attr('value');// $('input[name="Revert"]:checked').attr('value');
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


    var cmpyid = $('select#ddlCompany option:selected').val();
    if (cmpyid == null || cmpyid == "0") {
        cmpyid = 0;
    }


    var clid = $('select#ddlColor option:selected').val();
    if (clid == null || clid == "0") {
        clid = 0;
    }
    var cunitid = $('select#ddlUnit option:selected').val();
    if (cunitid == null || cunitid == "0") {
        cunitid = 0;
    }
    var procid = $('select#ddlProcess option:selected').val();
    if (procid == null || procid == "0") {
        procid = 0;
    }
    var ordno = $('select#ddlAOrderNo option:selected').val();
    if (ordno == null || ordno == "0") {
        ordno = "";
    }
    var refno = $('select#ddlARefNo option:selected').val();
    if (refno == null || refno == "0") {
        refno = "";
    }
    var buyerid = $('select#ddlBuyer option:selected').val();
    if (buyerid == null || buyerid == "0") {
        buyerid = 0;
    }
    $.ajax({
        url: "/ProcessReceipt/Loadaddgrid_Barcode",
        data: JSON.stringify({ cmpid: cmpyid, cmpunitid: cunitid, processid: procid, processorid: procrid, ordtype: type, clsed: cl, colorid: clid, OrderNo: ordno, ReferNo: refno, BuyerId: buyerid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            entrygriddet = result.Value;
            for (var d = 0; d < entrygriddet.length; d++) {
                entrygriddet[d].proddate = moment(entrygriddet[d].proddate).format("DD/MM/YYYY")
            }
            // LoadEntrytab(entrygriddet); //Comment for BARCODE Scanner on original function  LoadAddgridddl()

            MainList_barcode = entrygriddet;


            //if (result.Status == 'SUCCESS') {

            //    $('#ddlProcess').empty();
            //    //$('#ddlUnit').empty();
            //    //$('#ddlCompany').empty();
            //    $('#ddlColor').empty();
            //    $('#ddlSupplier').empty();
            //    var data = result.Value;


            //    var compdet = {};
            //    var comp = [];
            //    var recptdet = {};
            //    var recpt = [];
            //    var dcdet = {};
            //    var dc = [];
            //    var procdet = {};
            //    var proc = [];
            //    var unitdet = {};
            //    var unit = [];
            //    var suppdet = {};
            //    var supp = [];
            //    $.each(data, function (i, el) {

            //        if (!compdet[el.companyid]) {
            //            compdet[el.companyid] = true;
            //            comp.push(el);
            //        }

            //        if (!recptdet[el.processid]) {
            //            recptdet[el.processid] = true;
            //            recpt.push(el);
            //        }

            //        if (!dcdet[el.colorid]) {
            //            dcdet[el.colorid] = true;
            //            dc.push(el);
            //        }


            //        if (!unitdet[el.unitid]) {
            //            unitdet[el.unitid] = true;
            //            unit.push(el);
            //        }

            //        if (!suppdet[el.processor]) {
            //            suppdet[el.processor] = true;
            //            supp.push(el);
            //        }
            //    });


            //    //$(ddlUnit).append($('<option/>').val('0').text('--Select Unit--'));
            //    //$.each(unit, function () {
            //    //    $(ddlUnit).append($('<option></option>').val(this.unitid).text(this.unit));
            //    //});

            //    $(ddlProcess).append($('<option/>').val('0').text('--Select Process--'));
            //    $.each(recpt, function () {
            //        $(ddlProcess).append($('<option></option>').val(this.processid).text(this.process));
            //    });

            //    //$(ddlCompany).append($('<option/>').val('0').text('--Select Company--'));
            //    //$.each(comp, function () {
            //    //    $(ddlCompany).append($('<option></option>').val(this.companyid).text(this.company));
            //    //});

            //    $(ddlSupplier).append($('<option/>').val('0').text('--Select Supplier--'));
            //    $.each(supp, function () {
            //        $(ddlSupplier).append($('<option></option>').val(this.processorid).text(this.processor));
            //    });

            //    $(ddlColor).append($('<option/>').val('0').text('--Select Color--'));
            //    $.each(dc, function () {
            //        $(ddlColor).append($('<option></option>').val(this.colorid).text(this.color));
            //    });

            //}
        }

    });
}


function LoadEntrytab_Barcode(list) {
    debugger;
    $('#tblcompdetails').DataTable().destroy();

    $('#tblcompdetails').DataTable({
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
            if (data.FinProcess == "Y") {
                $('td', row).css('background-color', '#dba5a0');

            }

        },
        columns: [
                   { title: "Prodid", data: "processordid", "visible": false },
                   { title: "P.ord.No", data: "processorder" },
                   { title: "P.Date", data: "proddate" },
                   { title: "Processor", data: "processor" },
                   { title: "Ord Qty", data: "ordqty" },
                   { title: "Received", data: "recvdqty" },
                   { title: "Balance", data: "bal" },
                   { title: "Fin Process", data: "FinProcess", "visible": false },

                   {
                       title: "Group", data: "processordid",
                       render: function (data, type, row) {

                           //return '<input type="checkbox" id="group" value=' + data + ' onclick="myfunc(this.value);">';
                           if ((row.FinProcess == "Y")) {
                               return '<input type="checkbox" id="groupbom" class="groupbom editor-active"  disabled checked  value=' + data + ' >';
                           }
                           else {
                               return '<input type="checkbox" id="groupbom" class="groupbom editor-active" checked  value=' + data + ' >';

                           }
                       }
                   },




        ]

    });
}


function LoadAddgridddl() {
    debugger;
    //var cmpyid = $('select#ddlCompany option:selected').val();
    //var cunitid = $('select#ddlUnit option:selected').val();
    //if (cmpyid == 0) {
    //    alert('Please select Company...');
    //    return true;
    //}
    //if (cunitid == 0) {
    //    alert('Please select CompanyUnit...');
    //    return true;
    //}
    //var proid = $('select#ddlProcess option:selected').val();
    //var protype = $('input[name="optwrkord"]:checked').attr('value');
    var type = $('input[name="Revert"]:checked').attr('value');// $('input[name="Revert"]:checked').attr('value');
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


    var cmpyid = $('select#ddlCompany option:selected').val();
    if (cmpyid == null || cmpyid == "0") {
        cmpyid = 0;
    }


    var clid = $('select#ddlColor option:selected').val();
    if (clid == null || clid == "0") {
        clid = 0;
    }
    var cunitid = $('select#ddlUnit option:selected').val();
    if (cunitid == null || cunitid == "0") {
        cunitid = 0;
    }
    var procid = $('select#ddlProcess option:selected').val();
    if (procid == null || procid == "0") {
        procid = 0;
    }
    var ordno = $('select#ddlAOrderNo option:selected').val();
    if (ordno == null || ordno == "0") {
        ordno = "";
    }
    var refno = $('select#ddlARefNo option:selected').val();
    if (refno == null || refno == "0") {
        refno = "";
    }
    var buyerid = $('select#ddlBuyer option:selected').val();
    if (buyerid == null || buyerid == "0") {
        buyerid = 0;
    }
    $.ajax({
        url: "/ProcessReceipt/Loadaddgrid",
        data: JSON.stringify({ cmpid: cmpyid, cmpunitid: cunitid, processid: procid, processorid: procrid, ordtype: type, clsed: cl, colorid: clid, OrderNo: ordno, ReferNo: refno, BuyerId: buyerid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            entrygriddet = result.Value;
            for (var d = 0; d < entrygriddet.length; d++) {
                entrygriddet[d].proddate = moment(entrygriddet[d].proddate).format("DD/MM/YYYY")
            }
            LoadEntrytab(entrygriddet);


            if (result.Status == 'SUCCESS') {

                $('#ddlProcess').empty();
                //$('#ddlUnit').empty();
                //$('#ddlCompany').empty();
                $('#ddlColor').empty();
                $('#ddlSupplier').empty();
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
                var suppdet = {};
                var supp = [];
                $.each(data, function (i, el) {

                    if (!compdet[el.companyid]) {
                        compdet[el.companyid] = true;
                        comp.push(el);
                    }

                    if (!recptdet[el.processid]) {
                        recptdet[el.processid] = true;
                        recpt.push(el);
                    }

                    if (!dcdet[el.colorid]) {
                        dcdet[el.colorid] = true;
                        dc.push(el);
                    }


                    if (!unitdet[el.unitid]) {
                        unitdet[el.unitid] = true;
                        unit.push(el);
                    }

                    if (!suppdet[el.processor]) {
                        suppdet[el.processor] = true;
                        supp.push(el);
                    }
                });


                //$(ddlUnit).append($('<option/>').val('0').text('--Select Unit--'));
                //$.each(unit, function () {
                //    $(ddlUnit).append($('<option></option>').val(this.unitid).text(this.unit));
                //});

                $(ddlProcess).append($('<option/>').val('0').text('--Select Process--'));
                $.each(recpt, function () {
                    $(ddlProcess).append($('<option></option>').val(this.processid).text(this.process));
                });

                //$(ddlCompany).append($('<option/>').val('0').text('--Select Company--'));
                //$.each(comp, function () {
                //    $(ddlCompany).append($('<option></option>').val(this.companyid).text(this.company));
                //});

                $(ddlSupplier).append($('<option/>').val('0').text('--Select Supplier--'));
                $.each(supp, function () {
                    $(ddlSupplier).append($('<option></option>').val(this.processorid).text(this.processor));
                });

                $(ddlColor).append($('<option/>').val('0').text('--Select Color--'));
                $.each(dc, function () {
                    $(ddlColor).append($('<option></option>').val(this.colorid).text(this.color));
                });

            }
        }

    });
}

function Loadgrid() {
    LoadAddgrid();
    LoadAddgridddl();
}
function LoadEntrytab(list) {
    debugger;
    $('#tblcompdetails').DataTable().destroy();

    $('#tblcompdetails').DataTable({
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
            if (data.FinProcess == "Y") {
                $('td', row).css('background-color', '#dba5a0');

            }

        },
        columns: [
                   { title: "Prodid", data: "processordid", "visible": false },
                   { title: "P.ord.No", data: "processorder" },
                   { title: "P.Date", data: "proddate" },
                   { title: "Processor", data: "processor" },
                   { title: "Ord Qty", data: "ordqty" },
                   { title: "Received", data: "recvdqty" },
                   { title: "Balance", data: "bal" },
                   { title: "Fin Process", data: "FinProcess", "visible": false },

                   {
                       title: "Group", data: "processordid",
                       render: function (data, type, row) {

                           //return '<input type="checkbox" id="group" value=' + data + ' onclick="myfunc(this.value);">';
                           if ((row.FinProcess == "Y")) {
                               return '<input type="checkbox" id="groupbom" class="groupbom editor-active"  disabled unchecked  value=' + data + ' >';
                           }
                           else {
                               return '<input type="checkbox" id="groupbom" class="groupbom editor-active" unchecked  value=' + data + ' >';

                           }
                       }
                   },




        ]

    });
}
function LoadColor() {
    debugger;
    var cmpyid = $('select#ddlCompany option:selected').val();
    var cunitid = $('select#ddlUnit option:selected').val();
    if (cmpyid == 0) {
        //alert('Please select Company...');
        var msg = 'Please select Company...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }
    if (cunitid == 0) {
        //alert('Please select CompanyUnit...');
        var msg = 'Please select CompanyUnit...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }
    var proid = $('select#ddlProcess option:selected').val();
    var protype = $('input[name="optwrkord"]:checked').attr('value');
    if (protype = 'P') {
        var procrid = $('select#ddlSupplier option:selected').val();
    }
    else if (protype = 'W') {
        var procrid = $('select#ddlwrkdiv option:selected').val();
    }
    if (procrid == 0) {
        //alert('Please select Processor...');
        var msg = 'Please select Processor...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }
    $.ajax({
        url: "/ProcessReceipt/Loadcolor",
        data: JSON.stringify({ cmpid: cmpyid, cmpunitid: cunitid, processid: proid, processorid: procrid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            if (result.Status == 'SUCCESS') {

                // if (Mode == 0) {
                var data = result.Value;
                $(ddlColor).empty();
                $(ddlColor).append($('<option/>').val('0').text('--Select Color--'));
                $.each(data, function () {
                    $(ddlColor).append($('<option></option>').val(this.colorid).text(this.color));
                });
                //}


            }


        }

    });
}

function LoadProcessor() {
    debugger;

    $.ajax({
        url: "/ProcessReceipt/Getprocessor",
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
                    $(ddlSupplier).append($('<option></option>').val(this.supplierid).text(this.supplier));
                });
                //}


            }


        }

    });
}

function LoadWrkdiv() {
    debugger;

    $.ajax({
        url: "/ProcessReceipt/GetWrkdiv",
        data: JSON.stringify({}),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            if (result.Status == 'SUCCESS') {

                // if (Mode == 0) {
                var data = result.Value;
                $(ddlwrkdiv).empty();
                $(ddlwrkdiv).append($('<option/>').val('0').text('--Select WorkDivision--'));
                $.each(data, function () {
                    $(ddlwrkdiv).append($('<option></option>').val(this.wrkdivid).text(this.wrkdiv));
                });
                //}


            }


        }

    });
}
function ClearTextbox() {
    debugger;
    LoadCompanyUnitDDL("#ddlUnit");
    //$('#ddlCompany').empty();
    // $('#ddlUnit').val("0");
    $('#ddlColor').val("0");
    $('#ddlProcess').val("0");
    $('#ddlwrkdiv').val("0");
    $('#ddlBuyer').val("0");
    $('#ddlProcess').val("0");
    $('#ddlSupplier').val("0");
    $('#ddlOrderNo').val("0");
    $('#ddlIssueNo').val("0");
    $('#ddlRefNo').val("0");
    $('#ddlinnerbuyer').val("0");
    var protype = $('input[name="optwrkord"]:checked').attr('value');
    if (protype == 'P') {

        $('#supp').show();
        $("#wrkdiv").hide();
    }
    else if (protype == 'W') {
        $('#supp').hide();
        $("#wrkdiv").show();
    }
    // LoadAddgridddl();

    LoadAddgridddl_Barcode();

    LoadProcess();
    //LoadCompanyDDL('#ddlCompany');
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

function backtomain() {
    $('#myModal1').hide();
    $('#myModal1').modal('hide');
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
    $('#txtReceiptDate').val(Fdatestring);
    $('#txtRefDate').val(Fdatestring);


}

function myfunc(Val) {
    debugger;
    POrdID = POrdID + "," + Val;

}


function LoadData() {
    debugger;


    var list = [];

    for (var j = 0; j < entrygriddet.length; j++) {
        if (entrygriddet[j].CheckLoad == "Y") {

            POrdID = POrdID + "," + entrygriddet[j].processordid;

            list.push(entrygriddet[j]);
        }
    }


    if (list.length == 0) {
        //alert('Please select checkboxes for any one row..');
        var msg = 'Please select checkboxes for any one row...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    var type = $('input[name="optwrkord"]:checked').attr('value');
    if (type == 'P') {
        var sup = $('#ddlSupplier').val();
        var supp = $('select#ddlSupplier option:selected').text();
        Processorid = $('select#ddlSupplier option:selected').val();
        if (sup == 0) {
            $('#ddlSupplier').siblings(".select2-container").css('border', '1px solid red');
            //$('#myModal1').hide();
            //$('#myModal1').modal('hide');
            return true;
        } else {
            $('#ddlSupplier').siblings(".select2-container").css('border', '1px solid lightgrey');
        }
    }
    else {
        var sup = $('#ddlwrkdiv').val();
        var supp = $('select#ddlwrkdiv option:selected').text();
        Processorid = $('select#ddlwrkdiv option:selected').val();
        if (sup == 0) {
            $('#ddlwrkdiv').siblings(".select2-container").css('border', '1px solid red');
            //$('#myModal1').hide();
            //$('#myModal1').modal('hide');
            return true;
        } else {
            $('#ddlwrkdiv').siblings(".select2-container").css('border', '1px solid lightgrey');
        }
    }
    var unit = '';
    var process = '';
    var ordno = '';
    ordno = $('select#ddlOrderNo option:selected').text();

    process = $('select#ddlProcess option:selected').text();
    Processid = $('select#ddlProcess option:selected').val();
    unit = $('select#ddlUnit option:selected').text();
    Companyunitid = $('select#ddlUnit option:selected').val();
    c = $('select#ddlCompany option:selected').val();
    CompanyId = c;
    if (c == 0) {
        $('#ddlCompany').siblings(".select2-container").css('border', '1px solid red');
        //$('#myModal1').hide();
        //$('#myModal1').modal('hide');
        return true;
    } else {
        $('#ddlCompany').siblings(".select2-container").css('border', '1px solid lightgrey');
    }
    if (Companyunitid == 0) {
        $('#ddlUnit').siblings(".select2-container").css('border', '1px solid red');
        //$('#myModal1').hide();
        //$('#myModal1').modal('hide');
        return true;
    } else {
        $('#ddlUnit').siblings(".select2-container").css('border', '1px solid lightgrey');
    }
    if (Processid == 0) {
        $('#ddlProcess').siblings(".select2-container").css('border', '1px solid red');
        //$('#myModal1').hide();
        //$('#myModal1').modal('hide');
        return true;
    } else {
        $('#ddlProcess').siblings(".select2-container").css('border', '1px solid lightgrey');
    }
    LoadEmployeeStoreunit();
    LoadUserCompanyDDL();
    GenerateNumber();
    LoadProcessDetails(Processid);
    $('#myModal1').show();
    $('#myModal1').modal('show');
    $('#btnUpdate').hide();
    $('#btnDel').hide();
    $('#btnAdd').show();
    //$('#txtOrderNo').val(ordno);
    $('#txtProcess').val(process);
    $('#txtUnit').val(unit);
    $('#txtProcessor').val(supp);

    LoadInputItm();
    LoadInputJobdet();

    var protype = $('input[name="type"]:checked').attr('value');
    if (protype == 'W') {
        Loadstkdet();
    }
    else if (protype == 'S') {
    }

    var type = $('input[name="MSType"]:checked').attr('value');
    if (type == 'M') {
        LoadMainStore();
    }
    if (type == 'S') {
        LoadSubStore();
    }
    if (type == 'E') {
        LoadSecStore();
    }
}


function LoadSecStore() {
    $("#SubStoreId").hide();
    $("#SecStoId").show();
    $("#MainStoreId").hide();
    // LoadCompanyUnitDDL("#ddlPUnit");
    // LoadStoreUnitDDL("#ddlSecStore");
    // LoadWorkdivisionDDL("#ddlWK");
}
function LoadMainStore() {
    $("#SubStoreId").hide();
    $("#SecStoId").hide();
    $("#MainStoreId").show();
    // LoadStoreUnitDDL("#ddlMSMMainStore");
    // LoadCompanyDDL("#ddlMSCompany");
}
function LoadSubStore() {
    $("#SecStoId").hide();
    $("#MainStoreId").hide();
    $("#SubStoreId").show();
    $("#SubStorPrdId").hide();
    // LoadCompanyDDL("#ddlSCompany");
    // LoadStoreUnitDDL("#ddlSMainStore");
}

function RadioSMClick() {
    $("#SubStoreMainId").show();
    $("#SubStorPrdId").hide();
}
function RadioSSPClick() {


    $("#SubStoreMainId").hide();
    $("#SubStorPrdId").show();
    LoadStoreUnitDDL("#ddlSStoreSub");
    LoadCompanyUnitDDL("#ddlSStorePunit");

}


function LoadProcessDetails(Processid) {

    debugger;

    $.ajax({
        url: "/Allowance/LoadDataAlloProcessDetails",
        data: JSON.stringify({ ProcessId: Processid }),
        type: "POST",
        async: false,
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            AllowList = result;

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}
function LoadInputItm() {
    debugger;

    $.ajax({
        url: "/ProcessReceipt/Loaditm",
        data: JSON.stringify({ pid: POrdID }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            ItmList = result.Value;

            if (AllowList.length > 0) {
                if (AllowList[0].PQuantity > 0) {
                    var qn = AllowList[0].PQuantity;
                    $.each(ItmList, function () {
                        this.allow = parseFloat(this.orderqty) + parseFloat(qn);
                    });
                }
                else if (AllowList[0].ProPercentage > 0) {
                    var qn = AllowList[0].ProPercentage;
                    $.each(ItmList, function () {
                        var bl = (parseFloat(this.bal) * qn) / 100;
                        bl = bl.toFixed(3);
                        this.allow = (parseFloat(this.orderqty) + parseFloat(bl)).toFixed(3);
                    });
                }
                else if (AllowList[0].PQuantity == 0 && AllowList[0].ProPercentage == 0) {
                    $.each(ItmList, function () {
                        this.allow = this.orderqty;
                    });
                }
            }

            pallown = AllowList[0].PQuantity;

            LoaditmTab(ItmList);
            Prodid = ItmList[0].productionordid;
            Itmid = ItmList[0].itemid;
            Colorid = ItmList[0].colorid;
            Sizeid = ItmList[0].sizeid;
            PlanSizeid = ItmList[0].PlanSizeID;
        }

    });
}
function LoadInputJobdet() {
    debugger;



    $.ajax({
        url: "/ProcessReceipt/Loadjobddet",
        data: JSON.stringify({ pid: POrdID }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            jobdetsave = result.Value;

            if (AllowList.length > 0) {
                if (AllowList[0].PQuantity > 0) {
                    var qn = AllowList[0].PQuantity;
                    $.each(jobdetsave, function () {
                        this.allow = parseFloat(this.orderqty) + parseFloat(qn);
                    });
                }
                else if (AllowList[0].ProPercentage > 0) {
                    var qn = AllowList[0].ProPercentage;
                    $.each(jobdetsave, function () {
                        var bl = (parseFloat(this.bal) * qn) / 100;
                        bl = bl.toFixed(3);
                        this.allow = (parseFloat(this.orderqty) + parseFloat(bl)).toFixed(3);
                    });
                }
                else if (AllowList[0].PQuantity == 0 && AllowList[0].ProPercentage == 0) {
                    $.each(jobdetsave, function () {
                        this.allow = this.orderqty;
                    });
                }
            }

            LoadJobdetSaveTab(jobdetsave);

            var colorempty = [];
            colorempty = jobdetsave;

            colorempty = $.grep(colorempty, function (v) {
                return (v.Itemid === Itmid && v.Colorid === Colorid && v.Sizeid === Sizeid && v.productionordid === Prodid && v.PlanSizeID === PlanSizeid);

            });
            jobdet = [];
            jobdet = colorempty;
            LoadJobdetTab(colorempty);
        }

    });
}

function LoaditmTab(list) {

    $('#tblcbompdetails').DataTable().destroy();

    list.sort(function (a, b) {
        return a.sno - b.sno;
    });

    $('#tblcbompdetails').DataTable({
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
              { title: "SNo", data: "sno", "visible": false },
               { title: "P.Ord.No", data: "processorder" },
                              { title: "Pid", data: "procordid", "visible": false },
                   { title: "Itemid", data: "itemid", "visible": false },
                   { title: "Output Item", data: "item" },
                   { title: "Colorid", data: "colorid", "visible": false },
                   { title: "Color", data: "color" },
                   { title: "Sizeid", data: "sizeid", "visible": false },
                   { title: "Size", data: "size" },
                   { title: "FSizeId", data: "FinSizeID", "visible": false },
                   {
                       title: "Finish Size", data: "FinDia",

                       render: function (data, type, row) {
                           var $select = $("<select></select>", {
                               "id": "loadstylelist",
                               "value": data,
                               "class": "form-control loadfabsizelist col-md-4",
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
                   //{
                   //    title: "Rate", data: "rate",
                   //    render: function (data) {

                   //        return '<input type="text" id="txtOpRQty" class="editor-active"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                   //    },
                   //},
                   { title: "Order Qty", data: "orderqty" },
                   { title: "Balance", data: "bal" },
                    {
                        title: "Receipt", data: "Received_qty",
                        render: function (data) {

                            return '<input type="text" id="txtrecvdqty" class="calcipAmt form-control"  disabled style="width: 50px;text-align: center;"  value=' + data + ' >';
                            //return '<input type="text" id="txtrecvdqty" class="txtrecvdqty form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                        },
                    },
                    {
                        title: "SecQty", data: "Sec_Qty",
                        render: function (data) {

                            return '<input type="text" id="txtsecqty" class="calcipsecAmt form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';
                            //return '<input type="text" id="txtrecvdqty" class="txtrecvdqty form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                        },
                    },
                   {
                       title: "Rate", data: "rate",
                       render: function (data) {
                           if (ChkBudProApp == "Y") {
                               return '<input type="text" id="txtrate" class="calcrate form-control"  disabled style="width: 50px;text-align: center;"  value=' + data + ' >';
                           } else {
                               return '<input type="text" id="txtrate" class="calcrate form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';
                           }
                       },
                   },


                    //{
                    //    title: "View",// data: "jobordno",
                    //    render: function (data) {

                    //        return '<button type="button"  class="btnviewiputitem btn btn-round btn-info" style="width:25px;padding:0px;"><i class="fa fa-eye"></i></button>';
                    //    }
                    //},
        ]

    });
    var table = $('#tblcbompdetails').DataTable();
    $("#tblcbompdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblcbompdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });

    ReceiptTotal();

}


function LoadJobdetSaveTab(list) {
    $('#tbljobordinfosave').DataTable().destroy();

    $('#tbljobordinfosave').DataTable({
        data: list,
        columns: [
              { title: "Sno", data: "sno", "visible": false },
                   { title: "Prodid", data: "processordid", "visible": false },
                   { title: "Itmid", data: "Itemid", "visible": false },
                   { title: "Clrid", data: "Colorid", "visible": false },
                   { title: "Sizeid", data: "Sizeid", "visible": false },
                   { title: "ProdProgNo", data: "ProdPrgNo" },
                   { title: "Job Ord No", data: "Job_Ord_No" },
                   {
                       title: "Order Qty", data: "orderqty",

                   },
                   { title: "Balance", data: "bal" },

                   {
                       title: "Received", data: "Received_Qty",
                       render: function (data) {

                           return '<input type="text" id="txtOpsavejobOrdQty" class="calcsepquan form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                       },
                   },



        ]

    });
}

function LoadJobdetTab(list) {
    $('#tbljobordinfo').DataTable().destroy();

    $('#tbljobordinfo').DataTable({
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
                   { title: "Prodid", data: "processordid", "visible": false },
                   { title: "Itmid", data: "Itemid", "visible": false },
                   { title: "Clrid", data: "Colorid", "visible": false },
                   { title: "Sizeid", data: "Sizeid", "visible": false },
                   { title: "ProdProgNo", data: "ProdPrgNo" },
                   { title: "Job Ord No", data: "Job_Ord_No" },
                    { title: "Ref No", data: "refno" },
                   {
                       title: "Order Qty", data: "orderqty",

                   },
                   { title: "Balance", data: "bal" },

                   {
                       title: "Received", data: "Received_Qty",
                       render: function (data, type, row) {
                           if ((row.CheckType == 'Y' || row.check == true)) {

                               return '<input type="text" id="txtOpjobOrdQty" class="calcsepquan form-control" disabled style="width: 50px;text-align: center;"  value=' + data + ' >';
                           } else {
                               return '<input type="text" id="txtOpjobOrdQty" class="calcsepquan form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                           }
                       },
                   },

                    {
                        title: "SecQty", data: "Sec_Qty",
                        render: function (data) {

                            return '<input type="text" id="txtOpjobOrdSecQty" class="calcsepsecquan form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                        },
                    },
                    {
                        title: "Lot No", data: "ProcessOrdJobDetid",
                        render: function (data, type, row) {
                            if ((row.CheckType == 'Y' || row.check == true)) {
                                return '<input type="checkbox" id="groupbomAdd" class="groupbomAdd editor-active" checked  value=' + data + ' >';
                            }
                            else {
                                return '<input type="checkbox" id="groupbomAdd" class="groupbomAdd editor-active" unchecked  value=' + data + ' >';

                            }


                        }
                    },
        ]

    });
    var table = $('#tbljobordinfo').DataTable();
    $("#tbljobordinfo tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tbljobordinfo tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}

$(document).ready(function () {
    $("#tblcbompdetails ").dataTable().find("tbody").on('click', 'tr', function () {
        indiptitm = (this.rowIndex) - 1;
    });
});

$(document).ready(function () {
    $("#tbljobordinfo ").dataTable().find("tbody").on('click', 'tr', function () {
        inditjbdet = (this.rowIndex) - 1;
    });
});

function GenerateNumber() {
    debugger;

    table = "Process_Recpt_Mas",
    column = "proc_recpt_no",
    compId = CompanyId,
    Docum = 'PROCESS RECEIPT'

    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $('#txtReceiptno').val(result.Value);
        }
    });
}

$(document).on('click', '.btnviewiputitem', function () {
    debugger;
    var table = $('#tblcbompdetails').DataTable();

    var ItmId = table.row($(this).parents('tr')).data()["itemid"];
    var ClrId = table.row($(this).parents('tr')).data()["colorid"];
    var SzId = table.row($(this).parents('tr')).data()["sizeid"];
    var PId = table.row($(this).parents('tr')).data()["procordid"];

    var colorempty = [];
    colorempty = jobdetsave;

    colorempty = $.grep(colorempty, function (v) {
        return (v.Itemid === ItmId && v.Colorid === ClrId && v.Sizeid === SzId && v.processordid === PId);
    });

    jobdet = colorempty;
    LoadJobdetTab(jobdet);

});



function save() {
    debugger;
    var res = validate();
    if (res == false) {
        return false;
    }


    var opchk = [];
    for (var y = 0; y < ItmList.length; y++) {
        if (ItmList[y].Received_qty > 0) {
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
    $.each(ItmList, function () {
        this.closed = 'N';
        this.IPMarkup_rate = 0.00;
        this.OPMarkup_Rate = 0.00;
        this.Sec_Qty = 1;
        this.Invoice_Qty = 0.00;
        this.IssuedSizeID = this.sizeid;
        this.ProcessOrdId = this.procordid;
        this.ProcessOrdDetid = this.ProcessOrdDetid;

    });
    $.each(jobdetsave, function () {
        this.LotNo = '';
        this.Sec_Qty = 1;
        this.DisRowId = 0;
        this.LotRowid = 0;
        this.IssLot = '';
        this.ProcessOrdDetid;
        this.ProcessOrdJobDetid;


    });
    var MSType = $('input[name="MSType"]:checked').attr('value');

    var storeunitid = 0;
    if (MSType == "S") {
        storeunitid = $('#ddlSMainStore').val();
    } else if (MSType == "M") {
        storeunitid = $('#ddlMSMMainStore').val();
    }

    if (storeunitid == 0 && ValidateProcessStore == "True") {
        //alert('Please select Store..');
        var msg = 'Please select Store...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }


    var ordtype = $('input[name="Revert"]:checked').attr('value');

    var oldrcpno = $("#txtReceiptno").val()

    var table = "Process_Recpt_Mas";
    var column = "proc_recpt_no";
    var compId = CompanyId;
    var Docum = 'PROCESS RECEIPT';

    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var newrcpno = result.Value;
            if (oldrcpno != newrcpno) {
                //alert('Receipt No has been changed...');
                var msg = 'Receipt Number has been changed...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                $('#txtReceiptno').val(result.Value);
            }

            var Obj = {
                // proc_recpt_masid:
                proc_recpt_no: $("#txtReceiptno").val(),
                proc_recpt_date: $("#txtReceiptDate").val(),//new Date($('#txtReceiptDate').val()),
                Recpt_Ref_date: $("#txtRefDate").val(),//new Date($('#txtRefDate').val()),
                Recpt_Ref_no: $("#txtRefNo").val(),
                remarks: $("#txtRemark").val(),
                OrderType: ordtype,
                //  StoreUnitID: $("#ddlMSMMainStore").val(),
                StoreUnitID: storeunitid,
                CreatedBy: Guserid,
                InwardNo: '',
                SupplierInvoiceNo: '',
                ExcldetoInv: 0,
                InspDate: $("#txtReceiptDate").val(),//new Date($('#txtReceiptDate').val()),//
                //InspNo: 'S',
                EWayDate: $("#txtReceiptDate").val(),//new Date($('#txtReceiptDate').val()),
                //EWayNo: 'O',       
                ProcDet: ItmList,
                ProcJobDet: jobdetsave,
                ProcRetLotDet: LotItemListSave,
            }
            $("#btnAdd").attr("disabled", true);
            LoadingSymb();
            $.ajax({
                url: "/ProcessReceipt/Add",
                data: JSON.stringify(Obj),
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {
                    debugger;
                    if (result.Value == true) {

                        //alert('Data Saved Successfully');
                        AddUserEntryLog('Process', 'Process Receipt', 'ADD', $("#txtReceiptno").val());
                        //window.location.href = "/ProcessReceipt/ProcessReceiptIndex";
                        var msg = 'Data Saved Successfully...';
                        var flg = 1;
                        var mod = 0;
                        var url = "/ProcessReceipt/ProcessReceiptIndex";
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
    });
}


//Valdidation using jquery
function validate() {
    var isValid = true;
    if ($('#txtRefNo').val().trim() == "") {
        $('#txtRefNo').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtRefNo').css('border-color', 'lightgrey');
    }
    //if ($('#ddlMSMMainStore').val() == 0) {
    //    //$('#ddlMSMMainStore').css('border-color', 'Red');
    //    $('#ddlMSMMainStore').siblings(".select2-container").css('border', '1px solid red');

    //    isValid = false;
    //}
    //else {
    //    $('#ddlMSMMainStore').css('border-color', 'lightgrey');
    //}
    if ($('#ddlMSCompany').val() == 0) {
        //$('#ddlMSCompany').css('border-color', 'Red');
        $('#ddlMSCompany').siblings(".select2-container").css('border', '1px solid red');

        isValid = false;
    }
    else {
        $('#ddlMSCompany').css('border-color', 'lightgrey');
    }

    return isValid;
}

function LoadMaingrid() {
    debugger;

    var type = $('select#ddlMType option:selected').val();

    if (type == undefined) {
        type = "";
    }
    var proctype = $('input[name="optwrkordmain"]:checked').attr('value');


    if (proctype == 'P') {

        $('#optsupid').show();
        $("#optwkid").hide();


        var SuppId = $('#ddlMSupplier').val();
        if (SuppId == null || SuppId == "0") {
            SuppId = 0;
        }
    }
    else if (proctype == 'W') {
        $('#optsupid').hide();
        $("#optwkid").show();
        var SuppId = $('#ddlMWorkDiv').val();
        if (SuppId == null || SuppId == "0") {
            SuppId = 0;
        }
    }

    var OrdNo = "";
    var ONo = $('select#ddlMBuyOrderNo option:selected').val();

    if (ONo == 0 || ONo == undefined) {
        OrdNo == "";
    }
    else {

        OrdNo = $('select#ddlMBuyOrderNo option:selected').val();
    }

    var RefNo = "";
    var RNo = $('select#ddlMRefNo option:selected').val();

    if (RNo == 0 || RNo == undefined) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlMRefNo option:selected').val();
    }

    var StyId = $('#ddlMStyle').val();

    if (StyId == null || StyId == undefined) {
        StyId = 0;
    }


    var ordNo = "";
    var ONo = $('select#ddlMOrderNo option:selected').val();

    if (ONo == 0 || ONo == undefined) {
        ordNo == "";
    }
    else {

        ordNo = $('select#ddlMOrderNo option:selected').val();
    }

    var RecNo = "";
    var RNo = $('select#ddlMreceptno option:selected').val();

    if (RNo == 0 || RNo == undefined) {
        RecNo == "";
    }
    else {

        RecNo = $('select#ddlMreceptno option:selected').val();
    }


    var DCNo = "";
    var DNo = $('select#ddlMDCNo option:selected').val();

    if (DNo == 0 || DNo == undefined) {
        DCNo == "";
    }
    else {

        DCNo = $('select#ddlMDCNo option:selected').val();
    }


    var CompId = $('#ddlMCompany').val();

    if (CompId == null) {
        CompId = DCompid;
    } else {
        CompId = $('#ddlMCompany').val();
    }

    var Unit = $('#ddlMUnit').val();
    if (Unit == null || Unit == undefined) {
        Unit = 0;
    }
    var prid = 0;
    var process = $('#ddlMProcess').val();
    if (process == null || process == undefined) {
        process = 0;
    }
    var buyer = $('#ddlMBuyer').val();
    if (buyer == null || buyer == undefined) {
        buyer = 0;
    }
    var mas = 0;
    var prid = 0;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();


    if (ChkComp) {
        SuppId = 0;
        OrdNo == "";
        RefNo == "";
        StyId = 0;
        RecNo == "";
        DCNo == "";
        Unit = 0;
        process = 0;
        buyer = 0;
    }


    var menufilter = CompId + ',' + process + ',' + Unit + ',' + buyer + ',' + mas + ',' + prid + ',' + ordNo + ',' + proctype + ',' + type + ',' + DCNo + ',' + RecNo + ',' + FDate + ',' + TDate + ',' + Gs + ',' + OrdNo + ',' + RefNo + ',' + StyId + ',' + SuppId;
    localStorage.setItem('ProcessReceiptMainFilter', menufilter);

    $.ajax({
        url: "/ProcessReceipt/LoadMaingrid",
        data: JSON.stringify({ cmpid: CompId, processid: process, unitid: Unit, buyerid: buyer, masid: mas, prodordid: prid, jobordno: ordNo, processortype: proctype, type: type, dcno: DCNo, recptno: RecNo, fromDate: FDate, todate: TDate, MainType: Gs, orderno: OrdNo, refno: RefNo, styleid: StyId, processorid: SuppId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");

            var inputcount = 0;
            $('#tblmaindetails tr').each(function () {
                inputcount++;
            });
            if (inputcount > 0) {
                //$('#tblYarndetails').DataTable().destroy();
                var table = $('#tblmaindetails').DataTable();
                var rows = table.clear().draw();
                $('#tblmaindetails').DataTable().rows.add(dataSet);
                $('#tblmaindetails').DataTable().columns.adjust().draw();
            }
            else {

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
                    "bSort": false,
                    "rowCallback": function (row, data, index) {
                        if (data[8] > "0") {
                            $('td', row).css('background-color', '#FBE5E0');

                        }
                        //else if (data[6] == "4")
                        //{
                        //    //$('td', row).css('background-color', 'Orange');
                        //}
                    },
                    columns: [
                             { title: "ProcessRecptid", "visible": false },
                             { title: "Receipt No" },
                             { title: "Receipt Date" },
                             { title: "Unit" },
                             { title: "Process" },
                             { title: "Dc No" },
                             { title: "Type", "visible": false },
                              { title: "Processor" },
                               { title: "ChkIns", "visible": false },
                                  { title: "ChkDebQty", "visible": false },
                                  { title: "ChkAccPosted", "visible": false },
                              { title: "Action" },


                    ]

                });

            }
            ddlmain();
           
            var table = $('#tblmaindetails').DataTable();
            $("#tblmaindetails tr").click(function () {
                var selected = $(this).hasClass("selected");
                $("#tblmaindetails tr").removeClass("selected");
                if (!selected)
                    $(this).addClass("selected");
            });
           
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadMaingridFromBack() {
    debugger;

    var fill = localStorage.getItem('ProcessReceiptMainFilter');
    var fillobj = [];
    fillobj = fill.split(",");

    $('#txtFromDate').val(fillobj[11]);
    $('#txtToDate').val(fillobj[12]);

    if (fillobj[7] == 'P') {
        $('#Msup').prop('checked', true);
    } else {
        $('#Mwrk').prop('checked', true);
    }


    if (fillobj[6] == "undefined") {
        fillobj[6] = '';
    }
    if (fillobj[9] == "undefined") {
        fillobj[9] = '';
    }
    if (fillobj[10] == "undefined") {
        fillobj[10] = '';
    }
    if (fillobj[14] == "undefined") {
        fillobj[14] = '';
    }
    if (fillobj[15] == "undefined") {
        fillobj[15] = '';
    }

    if (fillobj[1] == "undefined") {
        fillobj[1] = 0;
    }
    if (fillobj[2] == "undefined") {
        fillobj[2] = 0;
    }
    if (fillobj[3] == "undefined") {
        fillobj[3] = 0;
    }
    if (fillobj[4] == "undefined") {
        fillobj[4] = 0;
    }
    if (fillobj[5] == "undefined") {
        fillobj[5] = 0;
    }
    if (fillobj[16] == "undefined") {
        fillobj[16] = 0;
    }
    if (fillobj[17] == "undefined") {
        fillobj[17] = 0;
    }


    if (ChkComp) {
        SuppId = 0;
        OrdNo == "";
        RefNo == "";
        StyId = 0;
        RecNo == "";
        DCNo == "";
        Unit = 0;
        process = 0;
        buyer = 0;
    }


    $.ajax({
        url: "/ProcessReceipt/LoadMaingrid",
        data: JSON.stringify({ cmpid: fillobj[0], processid: fillobj[1], unitid: fillobj[2], buyerid: fillobj[3], masid: fillobj[4], prodordid: fillobj[5], jobordno: fillobj[6], processortype: fillobj[7], type: fillobj[8], dcno: fillobj[9], recptno: fillobj[10], fromDate: fillobj[11], todate: fillobj[12], MainType: fillobj[13], orderno: fillobj[14], refno: fillobj[15], styleid: fillobj[16], processorid: fillobj[17] }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");

            var inputcount = 0;
            $('#tblmaindetails tr').each(function () {
                inputcount++;
            });
            if (inputcount > 0) {
                //$('#tblYarndetails').DataTable().destroy();
                var table = $('#tblmaindetails').DataTable();
                var rows = table.clear().draw();
                $('#tblmaindetails').DataTable().rows.add(dataSet);
                $('#tblmaindetails').DataTable().columns.adjust().draw();
            }
            else {

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
                    "bSort": false,
                    "rowCallback": function (row, data, index) {
                        if (data[8] > "0") {
                            $('td', row).css('background-color', '#FBE5E0');

                        }
                        //else if (data[6] == "4")
                        //{
                        //    //$('td', row).css('background-color', 'Orange');
                        //}
                    },
                    columns: [
                             { title: "ProcessRecptid", "visible": false },
                             { title: "Receipt No" },
                             { title: "Receipt Date" },
                             { title: "Unit" },
                             { title: "Process" },
                             { title: "Dc No" },
                             { title: "Type", "visible": false },
                              { title: "Processor" },
                               { title: "ChkIns", "visible": false },
                                  { title: "ChkDebQty", "visible": false },
                                  { title: "ChkAccPosted", "visible": false },
                              { title: "Action" },


                    ]

                });

            }
            ddlmain();

            var table = $('#tblmaindetails').DataTable();
            $("#tblmaindetails tr").click(function () {
                var selected = $(this).hasClass("selected");
                $("#tblmaindetails tr").removeClass("selected");
                if (!selected)
                    $(this).addClass("selected");
            });

        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}



function CheckRefNo(RefNo) {
    debugger;
    $.ajax({
        url: "/ProcessReceipt/CheckRefno",
        data: JSON.stringify({ DCNo: RefNo }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            debugger;
            if (obj != undefined) {

                var RefNo = obj.Recpt_Ref_no;

                if (RefNo != "") {
                    //alert("RefNo Already Exists...");
                    var msg = 'RefNo Already Exists...';
                    var flg = 4;
                    var mod = 1;
                    var url = "";
                    AlartMessage(msg, flg, mod, url);
                    $('#txtRefNo').val("");
                    $('#txtRefNo').focus();
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
function ddlmain() {
    debugger;
    var type = $('select#ddlMType option:selected').val();

    if (type == undefined) {
        type = "";
    }
    var proctype = $('input[name="optwrkordmain"]:checked').attr('value');


    if (proctype == 'P') {

        $('#optsupid').show();
        $("#optwkid").hide();


        var SuppId = $('#ddlMSupplier').val();
        if (SuppId == null || SuppId == undefined) {
            SuppId = 0;
        }
    }
    else if (proctype == 'W') {
        $('#optsupid').hide();
        $("#optwkid").show();
        var SuppId = $('#ddlMWorkDiv').val();
        if (SuppId == null || SuppId == undefined) {
            SuppId = 0;
        }
    }
    var ordNo = "";
    var ONo = $('select#ddlMOrderNo option:selected').val();

    if (ONo == 0 || ONo == undefined) {
        ordNo == "";
    }
    else {

        ordNo = $('select#ddlMOrderNo option:selected').val();
    }

    var RecNo = "";
    var RNo = $('select#ddlMreceptno option:selected').val();

    if (RNo == 0 || RNo == undefined) {
        RecNo == "";
    }
    else {

        RecNo = $('select#ddlMreceptno option:selected').val();
    }


    var DCNo = "";
    var DNo = $('select#ddlMDCNo option:selected').val();

    if (DNo == 0 || DNo == undefined) {
        DCNo == "";
    }
    else {

        DCNo = $('select#ddlMDCNo option:selected').val();
    }


    //var CompId = $('#ddlMCompany').val();
    //if (CompId == null || CompId == "0") {
    //    CompId = 0;
    //}


    var CompId = $('#ddlMCompany').val();

    if (CompId == null) {
        CompId = DCompid;
    } else {
        CompId = $('#ddlMCompany').val();
    }

    var Unit = $('#ddlMUnit').val();
    if (Unit == null || Unit == undefined) {
        Unit = 0;
    }
    var prid = 0;
    var process = $('#ddlMProcess').val();
    if (process == null || process == undefined) {
        process = 0;
    }
    var buyer = $('#ddlMBuyer').val();
    if (buyer == null || buyer == undefined) {
        buyer = 0;
    }
    var mas = 0;
    var prid = 0;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();


    // var OrdNo = "";
    var ONo = $('select#ddlMBuyOrderNo option:selected').val();

    if (ONo == 0) {
        OrdNo == "";
    }
    else {

        OrdNo = $('select#ddlMBuyOrderNo option:selected').val();
    }

    // var RefNo = "";
    var RNo = $('select#ddlMRefNo option:selected').val();

    if (RNo == 0) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlMRefNo option:selected').val();
    }
    var StyId = $('#ddlMStyle').val();
    if (StyId == null || StyId == undefined) {
        StyId = 0;
    }

    //var StyId = 0;

    $.ajax({
        url: "/ProcessReceipt/LoadMaingriddet",
        data: JSON.stringify({ cmpid: CompId, processid: process, unitid: Unit, buyerid: buyer, masid: mas, prodordid: prid, jobordno: ordNo, processortype: proctype, type: type, dcno: DCNo, recptno: RecNo, fromDate: FDate, todate: TDate, orderno: OrdNo, refno: RefNo, styleid: StyId, processorid: SuppId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            var obj = json.Value;
            if (json.Status == 'SUCCESS') {
                var data = json.Value;
                maingridlist = json.Value;
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
                var suppdet = {};
                var supp = [];
                var Order = {};
                var ord = [];
                var RefNo = {};
                var Ref = [];
                var Style = {};
                var sty = [];
                $.each(obj, function (i, el) {

                    if (!compdet[el.companyid]) {
                        compdet[el.companyid] = true;
                        comp.push(el);
                    }

                    if (!recptdet[el.proc_recpt_no]) {
                        recptdet[el.proc_recpt_no] = true;
                        recpt.push(el);
                    }

                    if (!dcdet[el.Recpt_Ref_no]) {
                        dcdet[el.Recpt_Ref_no] = true;
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
                    if (!suppdet[el.supplierid]) {
                        suppdet[el.supplierid] = true;
                        supp.push(el);
                    }

                    if (!Order[el.orderno]) {
                        Order[el.orderno] = true;
                        ord.push(el);
                    }
                    if (!RefNo[el.refno]) {
                        RefNo[el.refno] = true;
                        Ref.push(el);
                    }
                    if (!Style[el.styleid]) {
                        Style[el.styleid] = true;
                        sty.push(el);
                    }


                });

                if (ChkRecptNo || ChkComp || DtChk) {
                    $(ddlMreceptno).empty();
                    $(ddlMreceptno).append($('<option/>').val('0').text('--Select ReceiptNo--'));
                    $.each(recpt, function () {
                        $(ddlMreceptno).append($('<option></option>').text(this.proc_recpt_no));
                    });
                }

                if (ChkDCNo || ChkComp || DtChk) {
                    $(ddlMDCNo).empty();
                    $(ddlMDCNo).append($('<option/>').val('0').text('--Select DCNo--'));
                    $.each(dc, function () {
                        $(ddlMDCNo).append($('<option></option>').text(this.Recpt_Ref_no));
                    });
                }
               

                if (ChkProcess || ChkComp || DtChk) {
                    $(ddlMProcess).empty();
                    $(ddlMProcess).append($('<option/>').val('0').text('--Select Processs--'));
                    $.each(proc, function () {
                        $(ddlMProcess).append($('<option></option>').val(this.processid).text(this.process));
                    });
                }
                if (ChkUnit || ChkComp || DtChk) {
                    $(ddlMunit).empty();
                    $(ddlMunit).append($('<option/>').val('0').text('--Select Unit--'));
                    $.each(unit, function () {
                        $(ddlMunit).append($('<option></option>').val(this.unitid).text(this.unit));
                    });
                }

                if (ChkSupplier || ChkComp || DtChk) {

                    var proctype = $('input[name="optwrkordmain"]:checked').attr('value');

                    if (proctype == 'P') {

                        $(ddlMSupplier).empty();
                        $(ddlMSupplier).append($('<option/>').val('0').text('--Select Supplier--'));
                        $.each(supp, function () {
                            $(ddlMSupplier).append($('<option></option>').val(this.supplierid).text(this.supplier));
                        });
                    }
                    else if (proctype == 'W') {

                        $(ddlMWorkDiv).empty();
                        $(ddlMWorkDiv).append($('<option/>').val('0').text('--Select WorkDiv--'));
                        $.each(supp, function () {
                            $(ddlMWorkDiv).append($('<option></option>').val(this.supplierid).text(this.supplier));
                        });
                    }

                }
              
                if (ChkOrdno || ChkComp || DtChk) {
                   
                    ListOrRefNo();
                }
                if (ChkRefno || ChkComp || DtChk) {
                   
                    ListOrRefNo();
                }
                if (ChkStyle || ChkComp || DtChk) {
                  
                    ListPStyle();
                }

            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function CMainList() {
    // $('#tblmaindetails').DataTable().destroy();

    ChkRefno = true;
    ChkOrdno = true;
    DtChk = false;
    ChkSupplier = true;
    ChkStyle = true;
    ChkRecptNo = true;
    ChkComp = true;
    ChkProcess = true;
    ChkDCNo = true;
    ChkUnit = true;

    LoadMaingrid();
}

function UMainList() {
    // $('#tblmaindetails').DataTable().destroy();
    ChkRefno = true;
    ChkOrdno = true;
    DtChk = false;
    ChkSupplier = true;
    ChkStyle = true;
    ChkRecptNo = true;
    ChkComp = false;
    ChkProcess = true;
    ChkDCNo = true;
    ChkUnit = false;

    LoadMaingrid();
}

function BMainList() {
    // $('#tblmaindetails').DataTable().destroy();
    ChkRefno = false;
    ChkOrdno = false;
    DtChk = false;
    ChkSupplier = false;
    ChkStyle = true;
    ChkRecptNo = true;
    ChkComp = false;
    ChkProcess = true;
    ChkDCNo = true;
    ChkUnit = false;

    LoadMaingrid();
}

function RCMainList() {
    // $('#tblmaindetails').DataTable().destroy();
    ChkRefno = false;
    ChkOrdno = false;
    DtChk = false;
    ChkSupplier = false;
    ChkStyle = false;
    ChkRecptNo = false;
    ChkComp = false;
    ChkProcess = false;
    ChkDCNo = false;
    ChkUnit = false;
    LoadMaingrid();
}
function RMainlist() {
    // $('#tblmaindetails').DataTable().destroy();
    ChkRefno = false;
    ChkOrdno = false;
    DtChk = false;
    ChkSupplier = false;
    ChkStyle = true;
    ChkRecptNo = true;
    ChkComp = false;
    ChkProcess = true;
    ChkDCNo = true;
    ChkUnit = false;

    LoadMaingrid();
}

function PMainlist() {
    // $('#tblmaindetails').DataTable().destroy();
    ChkRefno = false;
    ChkOrdno = false;
    DtChk = false;
    ChkSupplier = false;
    ChkStyle = true;
    ChkRecptNo = true;
    ChkComp = false;
    ChkProcess = false;
    ChkDCNo = true;
    ChkUnit = false;

    LoadMaingrid();
}

function SMainlist() {
    // $('#tblmaindetails').DataTable().destroy();
    ChkRefno = false;
    ChkOrdno = false;
    DtChk = false;
    ChkSupplier = false;
    ChkStyle = false;
    ChkRecptNo = true;
    ChkComp = false;
    ChkProcess = true;
    ChkDCNo = true;
    ChkUnit = false;

    LoadMaingrid();
}

function DCMainlist() {
    // $('#tblmaindetails').DataTable().destroy();
    ChkRefno = false;
    ChkOrdno = false;
    DtChk = false;
    ChkSupplier = false;
    ChkStyle = false;
    ChkRecptNo = true;
    ChkComp = false;
    ChkProcess = false;
    ChkDCNo = false;
    ChkUnit = false;
    LoadMaingrid();
}

function SPMainlist() {
    // $('#tblmaindetails').DataTable().destroy();
    ChkRefno = true;
    ChkOrdno = true;
    DtChk = false;
    ChkSupplier = false;
    ChkStyle = true;
    ChkRecptNo = true;
    ChkComp = false;
    ChkProcess = true;
    ChkDCNo = true;
    ChkUnit = true;
    LoadMaingrid();
}


function LOADQLTY() {

    var Prg = "Qlty";
    Gs = Prg;
    var Type = "Qlty";
    /// $('#tblmaindetails').DataTable().destroy();
    LoadMaingrid();
}
function LOADReceipt() {

    var Prg = "Rcpt";
    Gs = Prg;
    var Type = "Rcpt";
    //$('#tblmaindetails').DataTable().destroy();
    LoadMaingrid();
}
function AddQltyID(id) {
    debugger;
    var QMode = 0;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    window.location.href = "/ProcessQuality/ProcessQualityIndex?PMasId=" + id + "=&Mode=" + QMode + "=&Fromdate=" + FDate + "=&Todate=" + TDate;
}

function getbyQltyID(id) {
    debugger;
    var QMode = 1;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    window.location.href = "/ProcessQuality/ProcessQualityIndex?PMasId=" + id + "=&Mode=" + QMode + "=&Fromdate=" + FDate + "=&Todate=" + TDate;
}
function getQltyDeleteID(id) {
    debugger;
    var QMode = 2;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    window.location.href = "/ProcessQuality/ProcessQualityIndex?PMasId=" + id + "=&Mode=" + QMode + "=&Fromdate=" + FDate + "=&Todate=" + TDate;
}
function getViewbyID(masid) {
    view = 1;
    chkIns = 0;
    chkaccpos = 0;
    getbyID(masid, chkIns, chkaccpos);
}
function getbyID(masid, chkIns, chkaccpos) {
    debugger;

    if (chkIns > 0) {

        //alert("This Receipt has been Inspected,Please Contact Administrator..");
        var msg = 'This Receipt has been Inspected,Please Contact Administrator...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;


    }
    if (chkaccpos > 0) {

        //alert("This Receipt has been Account Posted,Please Contact Administrator..");
        var msg = 'This Receipt has been Account Posted,Please Contact Administrator...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;


    }

    Masid = masid;
    //Produ
    var type = $('select#ddlMType option:selected').val();

    if (type == undefined) {
        type = "";
    }
    var proctype = $('input[name="mainproctype"]:checked').attr('value');

    var ordNo = "";
    var ONo = $('select#ddlMOrderNo option:selected').val();

    if (ONo == 0 || ONo == undefined) {
        ordNo == "";
    }
    else {

        ordNo = $('select#ddlMOrderNo option:selected').val();
    }

    var RecNo = "";
    var RNo = $('select#ddlMreceptno option:selected').val();

    if (RNo == 0 || ONo == undefined) {
        RecNo == "";
    }
    else {

        RecNo = $('select#ddlMreceptno option:selected').val();
    }


    var DCNo = "";
    var DNo = $('select#ddlMDCNo option:selected').val();

    if (DNo == 0 || ONo == undefined) {
        DCNo == "";
    }
    else {

        DCNo = $('select#ddlMDCNo option:selected').val();
    }


    var CompId = $('#ddlMCompany').val();
    if (CompId == null || CompId == "0") {
        CompId = 0;
    }
    CompanyId = CompId;
    LoadEmployeeStoreunit();
    LoadUserCompanyDDL();
    var Unit = $('#ddlMUnit').val();
    if (Unit == null || Unit == "0") {
        Unit = 0;
    }

    var process = $('#ddlMProcess').val();
    if (process == null || process == "0") {
        process = 0;
    }
    var buyer = $('#ddlMBuyer').val();
    if (buyer == null || buyer == "0") {
        buyer = 0;
    }
    var mas = masid;
    var prid = 0;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();


    var OrdNo = "";
    var ONo = $('select#ddlMBuyOrderNo option:selected').val();

    if (ONo == 0) {
        OrdNo == "";
    }
    else {

        OrdNo = $('select#ddlMBuyOrderNo option:selected').val();
    }

    var RefNo = "";
    var RNo = $('select#ddlMRefNo option:selected').val();

    if (RNo == 0) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlMRefNo option:selected').val();
    }

    var StyId = $('#ddlMStyle').val();

    $.ajax({
        url: "/ProcessReceipt/LoadMaingriddet",
        data: JSON.stringify({ cmpid: CompId, processid: process, unitid: Unit, buyerid: buyer, masid: mas, prodordid: prid, jobordno: ordNo, processortype: proctype, type: type, dcno: DCNo, recptno: RecNo, fromDate: FDate, todate: TDate, orderno: OrdNo, refno: RefNo, styleid: StyId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;


            $('#myModal1').show();
            $('#myModal1').modal('show');
            if (view == 1) {
                $('#btnUpdate').hide();
                $('#btnDel').hide();
                $('#btnAdd').hide();
            } else {
                $('#btnUpdate').show();
                $('#btnDel').hide();
                $('#btnAdd').hide();
            }

            var obj = json.Value;

            $('#txtReceiptDate').val(moment(obj[0].proc_recpt_date).format("DD/MM/YYYY"));
            $('#txtRefDate').val(moment(obj[0].Recpt_Ref_date).format("DD/MM/YYYY"));
            $('#txtUnit').val(obj[0].unit);
            $('#txtProcess').val(obj[0].process);
            $('#txtProcessor').val(obj[0].supplier);
            $('#txtRefNo').val(obj[0].Recpt_Ref_no);
            $('#txtRemark').val(obj[0].remarks);
            $('#txtReceiptno').val(obj[0].proc_recpt_no);


            Processid = obj[0].processid;
            EOtype = obj[0].type;
            LoadProcessDetails(Processid);

            if (obj[0]["Storetype"] == 'SS') {
                $('#optSS').prop('checked', true);
                LoadSubStore();
                $('#ddlSCompany').val(obj[0]["ParentUnitid"]).trigger('change');
                $('#ddlSMainStore').val(obj[0]["StoreUnitID"]).trigger('change');
            }
            else {
                $('#optMS').prop('checked', true);
                LoadMainStore();
                $('#ddlMSMMainStore').val(obj[0]["StoreUnitID"]).trigger('change');
            }


            //var type = $('input[name="MSType"]:checked').attr('value');
            //if (type == 'M') {
            //    LoadMainStore();
            //}
            //if (type == 'S') {
            //    LoadSubStore();
            //}
            //if (type == 'E') {
            //    LoadSecStore();
            //}

            $('#ddlMSCompany').val(obj[0].companyid);
            //CompanyId = obj[0].cmpid;
            //ProductionOrderno = obj[0].prodnord;
            //Companyunitid = obj[0].cmpunitid;

            //Processid = obj[0].processid;
            //Processorid = obj[0].processorid;
            LoadEditInputItm(masid);
            LoadEditInputJobdet(masid);
            LoadEditLotItm(masid);

            CheckAlloted();
            CheckQltyAlloted();
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadEditInputItm(id) {
    debugger;

    $.ajax({
        url: "/ProcessReceipt/Loadedititemdet",
        data: JSON.stringify({ pid: id }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            ItmList = result.Value;

            if (AllowList.length > 0) {
                if (AllowList[0].PQuantity > 0) {
                    var qn = AllowList[0].PQuantity;
                    $.each(ItmList, function () {
                        this.allow = parseFloat(this.orderqty) + parseFloat(qn);
                    });
                }
                else if (AllowList[0].ProPercentage > 0) {
                    var qn = AllowList[0].ProPercentage;
                    $.each(ItmList, function () {
                        var bl = (parseFloat(this.bal) * qn) / 100;
                        bl = bl.toFixed(3);
                        this.allow = (parseFloat(this.orderqty) + parseFloat(bl)).toFixed(3);
                    });
                }
                else if (AllowList[0].PQuantity == 0 && AllowList[0].ProPercentage == 0) {
                    $.each(ItmList, function () {
                        this.allow = this.orderqty;
                    });
                }
            }
            LoaditmTab(ItmList);
            Prodid = ItmList[0].procordid;
            Itmid = ItmList[0].itemid;
            Colorid = ItmList[0].colorid;
            Sizeid = ItmList[0].sizeid;
            PlanSizeid = ItmList[0].PlanSizeID;
        }

    });
}

function LoadEditInputJobdet(id) {
    debugger;
    $.ajax({
        url: "/ProcessReceipt/Loadeditjobdetdet",
        data: JSON.stringify({ pid: id }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            jobdetsave = result.Value;

            if (AllowList.length > 0) {
                if (AllowList[0].PQuantity > 0) {
                    var qn = AllowList[0].PQuantity;
                    $.each(jobdetsave, function () {
                        this.allow = parseFloat(this.orderqty) + parseFloat(qn);
                    });
                }
                else if (AllowList[0].ProPercentage > 0) {
                    var qn = AllowList[0].ProPercentage;
                    $.each(jobdetsave, function () {
                        var bl = (parseFloat(this.bal) * qn) / 100;
                        bl = bl.toFixed(3);
                        this.allow = (parseFloat(this.orderqty) + parseFloat(bl)).toFixed(3);
                    });
                }
                else if (AllowList[0].PQuantity == 0 && AllowList[0].ProPercentage == 0) {
                    $.each(jobdetsave, function () {
                        this.allow = this.orderqty;
                    });
                }
            }
            LoadJobdetSaveTab(jobdetsave);

            var colorempty = [];
            colorempty = jobdetsave;

            colorempty = $.grep(colorempty, function (v) {
                return (v.Itemid === Itmid && v.Colorid === Colorid && v.Sizeid === Sizeid && v.processordid === Prodid && v.PlanSizeID === PlanSizeid);

            });
            jobdet = [];
            jobdet = colorempty;
            LoadJobdetTab(colorempty);
        }

    });
}


function LoadEditLotItm(id) {
    debugger;
    $.ajax({
        url: "/ProcessReceipt/LoadeditLotdet",
        data: JSON.stringify({ pid: id }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            LotItemListSave = result.Value;
            loadLotTable(LotItemListSave);
        }

    });
}

function Update() {

    if (UserGroup != 'AUDIT') {
        debugger;
        var res = validate();
        if (res == false) {
            return false;
        }

        var opchk = [];
        for (var y = 0; y < ItmList.length; y++) {
            if (ItmList[y].Received_qty > 0) {
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
        //CheckDC();
        $.each(ItmList, function () {
            this.closed = 'N';
            this.IPMarkup_rate = 0.00;
            this.OPMarkup_Rate = 0.00;
            this.Sec_Qty = this.Sec_Qty;
            this.Invoice_Qty = 0.00;
            this.IssuedSizeID = this.sizeid;
            this.ProcessOrdId = this.procordid;
            this.Proc_Recpt_Masid = Masid;
            this.ProcessOrdDetid = this.ProcessOrdDetid;
            this.Proc_Recpt_Detid = this.Proc_Recpt_Detid;

        });
        $.each(jobdetsave, function () {
            this.LotNo = '';
            this.Sec_Qty = this.Sec_Qty;
            this.DisRowId = 0;
            this.LotRowid = 0;
            this.IssLot = '';
            this.Proc_Recpt_Masid = Masid;


        });
        var MSType = $('input[name="MSType"]:checked').attr('value');

        var storeunitid = 0;
        if (MSType == "S") {
            storeunitid = $('#ddlSMainStore').val();
        } else if (MSType == "M") {
            storeunitid = $('#ddlMSMMainStore').val();
        }

        if (storeunitid == 0 && ValidateProcessStore == "True") {
            //alert('Please select Store..');
            var msg = 'Please select Store...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return true;
        }

        //var ordtype = $('input[name="Revert"]:checked').attr('value');
        var Obj = {
            proc_recpt_masid: Masid,
            proc_recpt_no: $("#txtReceiptno").val(),
            proc_recpt_date: $("#txtReceiptDate").val(),//new Date($('#txtReceiptDate').val()),
            Recpt_Ref_date: $("#txtRefDate").val(),//new Date($('#txtRefDate').val()),
            Recpt_Ref_no: $("#txtRefNo").val(),
            remarks: $("#txtRemark").val(),
            OrderType: EOtype,
            //StoreUnitID: $("#ddlMSMMainStore").val(),
            StoreUnitID: storeunitid,
            CreatedBy: Guserid,
            InwardNo: '',
            SupplierInvoiceNo: '',
            ExcldetoInv: 0,
            InspDate: $("#txtReceiptDate").val(),//new Date($('#txtReceiptDate').val()),//
            //InspNo: 'S',
            EWayDate: $("#txtReceiptDate").val(),//new Date($('#txtReceiptDate').val()),
            //EWayNo: 'O',       
            ProcDet: ItmList,
            ProcJobDet: jobdetsave,
            ProcRetLotDet: LotItemListSave,
        }
        $("#btnUpdate").attr("disabled", true);
        LoadingSymb();
        $.ajax({
            url: "/ProcessReceipt/Update",
            data: JSON.stringify(Obj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                debugger;
                if (result.Value == true) {

                    //alert('Data Updated Successfully');
                    AddUserEntryLog('Process', 'Process Receipt', 'UPDATE', $("#txtReceiptno").val());
                    //window.location.href = "/ProcessReceipt/ProcessReceiptIndex";
                    var msg = 'Data Updated Successfully...';
                    var flg = 1;
                    var mod = 0;
                    var url = "/ProcessReceipt/ProcessReceiptIndex";
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


function getDeleteID(masid, chkIns, chkaccpos) {
    debugger;

    if (chkIns > 0) {

        //alert("This Receipt has been Inspected,Please Contact Administrator..");
        var msg = 'This Receipt has been Inspected,Please Contact Administrator...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;


    }
    if (chkaccpos > 0) {

        //alert("This Receipt has been Account Posted,Please Contact Administrator..");
        var msg = 'This Receipt has been Account Posted,Please Contact Administrator...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;


    }
    Masid = masid;
    //Produ
    var type = $('select#ddlMType option:selected').val();

    if (type == undefined) {
        type = "";
    }
    var proctype = $('input[name="mainproctype"]:checked').attr('value');

    var ordNo = "";
    var ONo = $('select#ddlMOrderNo option:selected').val();

    if (ONo == 0 || ONo == undefined) {
        ordNo == "";
    }
    else {

        ordNo = $('select#ddlMOrderNo option:selected').val();
    }

    var RecNo = "";
    var RNo = $('select#ddlMreceptno option:selected').val();

    if (RNo == 0 || ONo == undefined) {
        RecNo == "";
    }
    else {

        RecNo = $('select#ddlMreceptno option:selected').val();
    }


    var DCNo = "";
    var DNo = $('select#ddlMDCNo option:selected').val();

    if (DNo == 0 || ONo == undefined) {
        DCNo == "";
    }
    else {

        DCNo = $('select#ddlMDCNo option:selected').val();
    }


    var CompId = $('#ddlMCompany').val();
    if (CompId == null || CompId == "0") {
        CompId = 0;
    }

    var Unit = $('#ddlMUnit').val();
    if (Unit == null || Unit == "0") {
        Unit = 0;
    }

    var process = $('#ddlMProcess').val();
    if (process == null || process == "0") {
        process = 0;
    }
    var buyer = $('#ddlMBuyer').val();
    if (buyer == null || buyer == "0") {
        buyer = 0;
    }
    var mas = masid;
    var prid = 0;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();


    var OrdNo = "";
    var ONo = $('select#ddlMBuyOrderNo option:selected').val();

    if (ONo == 0) {
        OrdNo == "";
    }
    else {

        OrdNo = $('select#ddlMBuyOrderNo option:selected').val();
    }

    var RefNo = "";
    var RNo = $('select#ddlMRefNo option:selected').val();

    if (RNo == 0) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlMRefNo option:selected').val();
    }

    var StyId = $('#ddlMStyle').val();
    $.ajax({
        url: "/ProcessReceipt/LoadMaingriddet",
        data: JSON.stringify({ cmpid: CompId, processid: process, unitid: Unit, buyerid: buyer, masid: mas, prodordid: prid, jobordno: ordNo, processortype: proctype, type: type, dcno: DCNo, recptno: RecNo, fromDate: FDate, todate: TDate, orderno: OrdNo, refno: RefNo, styleid: StyId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;


            $('#myModal1').show();
            $('#myModal1').modal('show');
            $('#btnUpdate').hide();
            $('#btnDel').show();
            // $("#btnDel").attr("disabled", true);
            $('#btnAdd').hide();
            var obj = json.Value;

            $('#txtReceiptDate').val(moment(obj[0].proc_recpt_date).format("DD/MM/YYYY"));
            $('#txtRefDate').val(moment(obj[0].Recpt_Ref_date).format("DD/MM/YYYY"));
            $('#txtUnit').val(obj[0].unit);
            $('#txtProcess').val(obj[0].process);
            $('#txtProcessor').val(obj[0].supplier);
            $('#txtRefNo').val(obj[0].Recpt_Ref_no);
            $('#txtRemark').val(obj[0].remarks);
            $('#txtReceiptno').val(obj[0].proc_recpt_no);
            Processid = obj[0].processid;
            LoadProcessDetails(Processid);
            var type = $('input[name="MSType"]:checked').attr('value');
            if (type == 'M') {
                LoadMainStore();
            }
            if (type == 'S') {
                LoadSubStore();
            }
            if (type == 'E') {
                LoadSecStore();
            }
            //CompanyId = obj[0].cmpid;
            //ProductionOrderno = obj[0].prodnord;
            //Companyunitid = obj[0].cmpunitid;

            //Processid = obj[0].processid;
            //Processorid = obj[0].processorid;
            LoadEditInputItm(masid);
            LoadEditInputJobdet(masid);
            LoadEditLotItm(masid);
            CheckAlloted();
            CheckQltyAlloted();
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}

function MasDelete() {
    debugger;
    $.each(ItmList, function () {
        this.closed = 'N';
        this.IPMarkup_rate = 0.00;
        this.OPMarkup_Rate = 0.00;
        this.Sec_Qty = 1;
        this.Invoice_Qty = 0.00;
        this.IssuedSizeID = this.sizeid;
        this.ProcessOrdId = this.procordid;
        this.Proc_Recpt_Masid = Masid;
        this.ProcessOrdDetid = this.ProcessOrdDetid;

    });
    $.each(jobdetsave, function () {
        this.LotNo = '';
        this.Sec_Qty = 1;
        this.DisRowId = 0;
        this.LotRowid = 0;
        this.IssLot = '';
        this.Proc_Recpt_Masid = Masid;


    });
    var ordtype = $('input[name="Revert"]:checked').attr('value');
    var Obj = {
        proc_recpt_masid: Masid,
        proc_recpt_no: $("#txtReceiptno").val(),
        proc_recpt_date: $("#txtReceiptDate").val(),//new Date($('#txtReceiptDate').val()),
        Recpt_Ref_date: $("#txtRefDate").val(),//new Date($('#txtRefDate').val()),
        Recpt_Ref_no: $("#txtRefNo").val(),
        remarks: $("#txtRemark").val(),
        OrderType: ordtype,
        StoreUnitID: $("#ddlMSMMainStore").val(),
        CreatedBy: Guserid,
        InwardNo: '',
        SupplierInvoiceNo: '',
        ExcldetoInv: 0,
        InspDate: $("#txtReceiptDate").val(),//new Date($('#txtReceiptDate').val()),//
        //InspNo: 'S',
        EWayDate: $("#txtReceiptDate").val(),//new Date($('#txtReceiptDate').val()),
        //EWayNo: 'O',       
        ProcDet: ItmList,
        ProcJobDet: jobdetsave,
        ProcRetLotDet: LotItemListSave,
    }
    $("#btnDel").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/ProcessReceipt/Delete",
        data: JSON.stringify(Obj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Value == true) {

                //alert('Data Deleted Successfully');
                AddUserEntryLog('Process', 'Process Receipt', 'DELETE', $("#txtReceiptno").val());
                //window.location.href = "/ProcessReceipt/ProcessReceiptIndex";
                var msg = 'Data Deleted Successfully...';
                var flg = 2;
                var mod = 0;
                var url = "/ProcessReceipt/ProcessReceiptIndex";
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

function ProcessRecptPrint(masid) {
    debugger;

    LoadMainOrderDetails(masid);
    Masid = masid;
    //Produ
    var type = $('select#ddlMType option:selected').val();

    if (type == undefined) {
        type = "";
    }
    var proctype = $('input[name="mainproctype"]:checked').attr('value');

    var ordNo = "";
    var ONo = $('select#ddlMOrderNo option:selected').val();

    if (ONo == 0 || ONo == undefined) {
        ordNo == "";
    }
    else {

        ordNo = $('select#ddlMOrderNo option:selected').val();
    }

    var RecNo = "";
    var RNo = $('select#ddlMreceptno option:selected').val();

    if (RNo == 0 || ONo == undefined) {
        RecNo == "";
    }
    else {

        RecNo = $('select#ddlMreceptno option:selected').val();
    }


    var DCNo = "";
    var DNo = $('select#ddlMDCNo option:selected').val();

    if (DNo == 0 || ONo == undefined) {
        DCNo == "";
    }
    else {

        DCNo = $('select#ddlMDCNo option:selected').val();
    }


    var CompId = $('#ddlMCompany').val();
    if (CompId == null || CompId == "0") {
        CompId = 0;
    }

    var Unit = $('#ddlMUnit').val();
    if (Unit == null || Unit == "0") {
        Unit = 0;
    }

    var process = $('#ddlMProcess').val();
    if (process == null || process == "0") {
        process = 0;
    }
    var buyer = $('#ddlMBuyer').val();
    if (buyer == null || buyer == "0") {
        buyer = 0;
    }
    var mas = masid;
    var prid = 0;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();


    var OrdNo = "";
    var ONo = $('select#ddlMBuyOrderNo option:selected').val();

    if (ONo == 0) {
        OrdNo == "";
    }
    else {

        OrdNo = $('select#ddlMBuyOrderNo option:selected').val();
    }

    var RefNo = "";
    var RNo = $('select#ddlMRefNo option:selected').val();

    if (RNo == 0) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlMRefNo option:selected').val();
    }

    var StyId = $('#ddlMStyle').val();

    $.ajax({
        url: "/ProcessReceipt/LoadMaingriddet",
        data: JSON.stringify({ cmpid: CompId, processid: process, unitid: Unit, buyerid: buyer, masid: mas, prodordid: prid, jobordno: ordNo, processortype: proctype, type: type, dcno: DCNo, recptno: RecNo, fromDate: FDate, todate: TDate, orderno: OrdNo, refno: RefNo, styleid: StyId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            var obj = json.Value;

            //$('#txtReceiptDate').val(moment(obj[0].proc_recpt_date).format("DD/MM/YYYY"));
            //$('#txtRefDate').val(moment(obj[0].Recpt_Ref_date).format("DD/MM/YYYY"));
            //$('#txtUnit').val(obj[0].unit);
            $('#txtProcess').val(obj[0].process);
            //$('#txtProcessor').val(obj[0].supplier);
            //$('#txtRefNo').val(obj[0].Recpt_Ref_no);
            //$('#txtRemark').val(obj[0].remarks);
            //$('#txtReceiptno').val(obj[0].proc_recpt_no);


            Processid = obj[0].processid;
            var processnamecheck = obj[0].process;
            TProcessRecptPrint(Masid, processnamecheck)
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function TProcessRecptPrint(Id, processnamecheck) {
    debugger;
    Repid = Id;
    $('#myModal2').modal('show');

    //for (var d = 0; d < maingridlist.length; d++) {
    //    if (maingridlist[d].proc_recpt_masid == Id) {
    //        processname = maingridlist[d].process;
    //    }
    //}

    processname = processnamecheck;

    if (processname == "Knitting") {
        processname = "Knitting DC Receipt";
    }
    else if (processname == "LOOSE KNITTING") {
        processname = "Knitting DC Receipt";
    }
    else if (processname == "AIRTEX") {
        processname = "AIRTEX DC Receipt";
    }
    else if (processname == "FLAT KNITTING") {
        processname = "Knitting DC Receipt";
    }

    else if (processname == "LOOSE KNITTING- WINDING") {
        processname = "LOOSE KNITTING- WINDING DC Receipt";
    }

    else if (processname == "CONE WINDING") {
        processname = "CONE WINDING RECEIPT";

    }
    else if (processname == "Dyeing") {
        processname = "DYEING RECEIPT";
    }
    else if (processname == "BIO WASH") {
        processname = "BIO WASH RECEIPT";
    }
    else if (processname == "Panel Wash ") {
        processname = "PANEL WASH RECEIPT";
    }
    else if (processname == "DOUBLE DYEING AND BIO WASH ") {
        processname = "DOUBLE DYEING AND BIO WASH RECEIPT";
    }
    else if (processname == "Compacting") {
        processname = "COMPACTING RECEIPT";
    }
    else if (processname == "RE PROCESS ") {
        processname = "RE PROCESS RECEIPT";
    }
    else if (processname == "HEAT_SETTING") {
        processname = "HEAT_SETTING RECEIPT";
    }
    else if (processname == "WASHING") {
        processname = "WASHING RECEIPT";
    }
    else if (processname == "Yarn_Dyed") {
        processname = "YARNDYED RECEIPT";
    }
    else if (processname == "SPACE DYED") {
        processname = "SPACE DYED RECEIPT";
    }
    else if (processname == "MERCERIZED") {
        processname = "MERCERIZED RECEIPT";
    }
    else if (processname == "Printing") {
        processname = "PRINTING RECEIPT";
    }

    docname = "PROCESS RECEIPT";
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
    var compid = $('#ddlMCompany').val();

    window.open("../ReportInline/Process/ProcessReceipt/ProcessReceiptReportInline.aspx?Masid=" + Repid + "&RetLossdet=" + p[0] + "&Ins=" + p[1] + "&Lotdet=" + p[2] + "&Procord=" + p[3] + "&POdet=" + p[4] + "&Ewaybill=" + p[5] + "&Ewaydate=" + p[6] + "&ProcessName=" + processname + "&OrdNo=" + rptord + "&RefNo=" + rptref + "&Style=" + rptsty + "&Companyid=" + compid + "&Userid=" + LoginUserid);

}

function backtomain() {

    $("#myModal2").hide();
    $("#myModal2").modal('hide');
    window.location.href = "/ProcessReceipt/ProcessReceiptIndex";
}

function CheckAlloted() {

    var Recpno = $('#txtReceiptno').val();

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


                for (var x = 0; x < AllotedItemList.length; x++) {

                    //alert("Stock is alloted for " + AllotedItemList[x].CTransNo + ",Please Check it....")
                    var msg = "Stock is alloted for " + AllotedItemList[x].CTransNo + ",Please Check it...";
                    var flg = 4;
                    var mod = 1;
                    var url = "";
                    AlartMessage(msg, flg, mod, url);
                    $("#btnUpdate").attr('disabled', true);
                    $("#btnDel").attr('disabled', true);
                    $('#btnAdd').hide();
                    return true;
                }

            }


        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function ListOrRefNo() {
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var OType = $('#ddlMType').val();
    var POType = $('input[name="optwrkordmain"]:checked').attr('value');
    $.ajax({
        url: "/ProcessReceipt/GetOrderRefNo",
        data: JSON.stringify({ type: OType, processortype: POType, fromDate: FDate, todate: TDate }),
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

                    if (!orddet[el.orderno]) {
                        orddet[el.orderno] = true;
                        ord.push(el);
                    }
                    if (!refdet[el.refno]) {
                        refdet[el.refno] = true;
                        ref.push(el);
                    }


                });

                if (ChkOrdno || ChkComp || DtChk) {
                    //OrdNo
                    $(ddlMBuyOrderNo).empty();
                    $(ddlMBuyOrderNo).append($('<option/>').val('0').text('--Select OrdNo--'));
                    $.each(ord, function () {
                        $(ddlMBuyOrderNo).append($('<option></option>').text(this.orderno));
                    });
                }
                if (ChkRefno || ChkComp || DtChk) {
                    //RefNo
                    $(ddlMRefNo).empty();
                    $(ddlMRefNo).append($('<option/>').val('0').text('--Select RefNo--'));
                    $.each(ref, function () {
                        $(ddlMRefNo).append($('<option></option>').text(this.refno));
                    });
                }

            }
        }

    });
}

function ListPStyle() {
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var OType = $('#ddlMType').val();
    var POType = $('input[name="optwrkordmain"]:checked').attr('value');
    $.ajax({
        url: "/ProcessReceipt/GetOrderStyle",
        data: JSON.stringify({ type: OType, processortype: POType, fromDate: FDate, todate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;

                var stydet = {};
                var sty = [];


                $.each(obj, function (i, el) {

                    if (!stydet[el.styleid]) {
                        stydet[el.styleid] = true;
                        sty.push(el);
                    }

                });

                $(ddlMStyle).empty();

                $(ddlMStyle).append($('<option/>').val('0').text('--Select Style--'));
                $.each(sty, function () {
                    $(ddlMStyle).append($('<option></option>').val(this.styleid).text(this.style));
                });


            }
        }

    });
}

function LoadGridType() {
    // $('#tblmaindetails').DataTable().destroy();
    //ListOrRefNo();
    //ListPStyle();
    // ddlmain();
    ChkRefno = true;
    ChkOrdno = true;
    LoadMaingrid();
}

function Floadsize() {
    debugger;
    $.ajax({
        //has to check for fabric size only 
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

function CheckQltyAlloted() {

    var Recpno = $('#txtReceiptno').val();

    $.ajax({
        url: "/ProcessQuality/LoadProcessQltyCheckItemEditDetails",
        data: JSON.stringify({ RecNo: Recpno }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            QltyAllotedItemList = result;
            if (QltyAllotedItemList.length > 0) {


                for (var x = 0; x < QltyAllotedItemList.length; x++) {

                    //alert("Process Quality is alloted for " + QltyAllotedItemList[x].CTransNo + ",Please Check it....")
                    var msg = "Process Quality is alloted for " + QltyAllotedItemList[x].CTransNo + ",Please Check it...";
                    var flg = 4;
                    var mod = 1;
                    var url = "";
                    AlartMessage(msg, flg, mod, url);
                    $("#btnUpdate").attr('disabled', true);
                    $("#btnDel").attr('disabled', true);
                    $('#btnAdd').hide();
                    return true;
                }

            }


        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

$(document).ready(function () {


    $('#btncomponentadd').click(function () {
        debugger;


        if (GChkType == "") {
            //alert('Select Any Row...');
            var msg = 'Select Any Row...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return true;
        }

        var d = $('#txtLotNo').val();
        if (LotItemListSave.length > 0) {
            for (var q = 0; q < LotItemListSave.length; q++) {
                if (LotItemListSave[q].LotNo == d) {
                    //alert('Must be different Component...');
                    var msg = 'Must be different Component...';
                    var flg = 4;
                    var mod = 1;
                    var url = "";
                    AlartMessage(msg, flg, mod, url);
                    fnClearLotControls();
                    return true;

                }
            }
        }


        //Val JobBalQty

        var LQty = $('#txtLotQty').val();


        if (LQty > GJobBalQty) {
            //alert('Lot Qty Should not more then JobQty...');
            var msg = 'Lot Qty Should not more then Job quantity...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            fnClearLotControls();
            return true;
        }


        var totalamnt = 0;

        if (LotItemListSave.length > 0) {
            for (var q = 0; q < LotItemListSave.length; q++) {
                if (LotItemListSave[q].ProcessJobOrdId == prcordjobdetid) {


                    var amount = LotItemListSave[q].LotQty;
                    totalamnt = totalamnt + parseFloat(amount);

                    if ((parseInt(totalamnt) + parseInt(LQty)) > GJobBalQty) {
                        //alert('Lot Qty Should not more then JobQty...');
                        var msg = 'Lot quantity Should not more then Job quantity...';
                        var flg = 4;
                        var mod = 1;
                        var url = "";
                        AlartMessage(msg, flg, mod, url);
                        fnClearLotControls();
                        return true;
                    }


                }
            }
        }



        var leng = 0;

        var isAllValid = true;


        if ($('#txtLotNo').val() == "") {
            isAllValid = false;
            $('#txtLotNo').css('border-color', 'Red');
        }
        else {
            $('#txtLotNo').css('border-color', 'lightgrey');
        }

        if ($('#txtLotQty').val() == "") {
            isAllValid = false;
            $('#txtLotQty').css('border-color', 'Red');
        }
        else {
            $('#txtLotQty').css('border-color', 'lightgrey');
        }


        if ($('#txtLotSecQty').val() == "") {
            isAllValid = false;
            $('#txtLotSecQty').css('border-color', 'Red');
        }
        else {
            $('#txtLotSecQty').css('border-color', 'lightgrey');
        }


        //if (LotItemList.length == 0) {
        //    leng = 1;

        //}
        //else {
        //    leng = LotItemList.length + 1;

        //}

        if (isAllValid) {

            var compListObj = {

                LotNo: $('#txtLotNo').val(),
                LotQty: $('#txtLotQty').val(),
                LotSecQty: $('#txtLotSecQty').val(),
                prod_recpt_lotid: 0,
                prod_recpt_detid: prcrecdetid,
                prod_recpt_Jobdetid: prcrecjobdetid,
                ProcessJobOrdId: prcordjobdetid,
                Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
            };

            LotItemListSave.push(compListObj);
            Lotdet = [];


            for (var x = 0; x < LotItemListSave.length; x++) {

                if (LotItemListSave[x].ProcessJobOrdId == prcordjobdetid) {
                    Lotdet.push(LotItemListSave[x]);
                }
            }
            LotItemList = Lotdet;
            //Loadsepyarn(LotItemList);
            //LoadsepSaveyarn(PlanYarnDetSave);

            loadLotTable(LotItemList);



            fnClearLotControls();




            //load Job Receipt table

            var totalamnt = 0;
            if (LotItemListSave.length > 0) {
                for (var q = 0; q < LotItemListSave.length; q++) {
                    if (LotItemListSave[q].ProcessJobOrdId == prcordjobdetid) {


                        var Top1 = LotItemListSave[q].ProcessJobOrdId;

                        var amount = LotItemListSave[q].LotQty;
                        totalamnt = totalamnt + parseFloat(amount);

                        $.each(jobdetsave, function () {
                            if (this.ProcessOrdJobDetid == Top1) {
                                this.Received_Qty = totalamnt;

                            }
                        });

                        $.each(jobdet, function () {
                            if (this.ProcessOrdJobDetid == Top1) {
                                this.Received_Qty = totalamnt;

                            }
                        });


                        var adseptable = $('#tbljobordinfo').DataTable();
                        var adsepdata = adseptable.rows().data();

                        $('input[id=txtOpjobOrdQty]').each(function (ig) {
                            if (adsepdata[ig].ProcessOrdJobDetid == Top1) {
                                var row = $(this).closest('tr');
                                row.find('#txtOpjobOrdQty').val(totalamnt);


                            }
                        });


                    }
                }
                //////////////////////////////
                var Jtotalamnt = 0;
                for (var q = 0; q < jobdetsave.length; q++) {


                    var pordDetId = jobdetsave[q].ProcessOrdDetid;

                    var Jamount = jobdetsave[q].Received_Qty;
                    Jtotalamnt = Jtotalamnt + parseFloat(Jamount);


                    $.each(ItmList, function () {
                        if (this.ProcessOrdDetid == pordDetId) {
                            this.Received_qty = Jtotalamnt;

                        }
                    });


                    var aadseptable = $('#tblcbompdetails').DataTable();
                    var aadsepdata = aadseptable.rows().data();

                    $('input[id=txtrecvdqty]').each(function (ig) {
                        if (aadsepdata[ig].ProcessOrdDetid == pordDetId) {
                            var row = $(this).closest('tr');
                            row.find('#txtrecvdqty').val(Jtotalamnt);


                        }
                    });



                }
                ///////////////////////////////////////////////////////

            }



        }
    });

    $(document).on('click', '.btncompedit', function () {
        debugger;
        Mode = 1;

        rowindex = $(this).closest('tr').index();

        var currentro12 = LotItemList.slice(rowindex);


        $('#txtLotNo').val(currentro12[0]['LotNo']);
        $('#txtLotQty').val(currentro12[0]['LotQty']);
        $('#txtLotSecQty').val(currentro12[0]['LotSecQty']);


        $('#btncomponentadd').hide();
        $('#btncomponentupdate').show();
    });

    $('#btncomponentupdate').click(function () {
        debugger;

        var currentrowsel1 = LotItemList.slice(rowindex);



        var isAllValid = true;


        if ($('#txtLotNo').val() == "") {
            isAllValid = false;
            $('#txtLotNo').css('border-color', 'Red');
        }
        else {
            $('#txtLotNo').css('border-color', 'lightgrey');
        }

        if ($('#txtLotQty').val() == "") {
            isAllValid = false;
            $('#txtLotQty').css('border-color', 'Red');
        }
        else {
            $('#txtLotQty').css('border-color', 'lightgrey');
        }

        if ($('#txtLotSecQty').val() == "") {
            isAllValid = false;
            $('#txtLotSecQty').css('border-color', 'Red');
        }
        else {
            $('#txtLotSecQty').css('border-color', 'lightgrey');
        }

        if (isAllValid) {

            var currentrowsel = LotItemList.slice(rowindex);


            currentrowsel[0]['LotNo'] = $("#txtLotNo").val();
            currentrowsel[0]['LotQty'] = $("#txtLotQty").val();
            currentrowsel[0]['LotSecQty'] = $("#txtLotSecQty").val();


            loadLotTable(LotItemList);

            $('#btncomponentupdate').hide();
            $('#btncomponentadd').show();


            fnClearLotControls();


        };
    });
    $(document).on('click', '.btncompremove', function () {
        debugger;
        rowindex = $(this).closest('tr').index();
        var currentrowsel = LotItemList.slice(rowindex);
        var compsn = currentrowsel[0]['LotNo'];
        LotItemList.splice(rowindex, 1);
        document.getElementById("tblLotdetails").deleteRow(rowindex + 1);

        if (LotItemList.length > 0) {



            LotItemList = $.grep(LotItemList, function (e) {

                return e.LotNo != compsn;

            });
            loadLotTable(LotItemList);
        }


    });

});



function loadLotTable(compListObj) {
    debugger;
    // $('#tblcompdetails').DataTable().destroy();
    var inputcount = 0;
    $('#tblLotdetails tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tblLotdetails').DataTable().destroy();
    }
    $('#tblLotdetails').empty();

    $('#tblLotdetails').DataTable({
        //'bSortable': false,
        //'aTargets' : [ 7, 8 ],
        data: LotItemList,
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
             { title: "lotId", data: "prod_recpt_lotid", "visible": false },
            { title: "ProcessRecdetId", data: "prod_recpt_detid", "visible": false },
             { title: "prod_recpt_Jobdetid", data: "prod_recpt_Jobdetid", "visible": false },
              { title: "ProcessJobOrdId", data: "ProcessJobOrdId", "visible": false },
            { title: "Lot No", data: "LotNo" },
            { title: "Lot Quantity", data: "LotQty" },
            { title: "Lot SecQty", data: "LotSecQty" },

               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btncompedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btncompremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div>'
               }
        ]
    });


    $("#tblLotdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblLotdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });




}

function fnClearLotControls() {


    $('#txtLotNo').val('');
    $('#txtLotQty').val('');
    $('#txtLotSecQty').val('');


}

$(document).ready(function () {

    $('#tbljobordinfo').on('click', 'tr', function (e) {

        debugger;
        var table = $('#tbljobordinfo').DataTable();
        var row = $(this).closest('tr');
        var data = $('#tbljobordinfo').dataTable().fnGetData(row);
        var table = $('#tbljobordinfo').DataTable();

        var ChkLot = data.CheckType;
        GChkType = data.CheckType;

        prcordjobdetid = data.ProcessOrdJobDetid;

        var colorempty = [];
        colorempty = LotItemListSave;

        colorempty = $.grep(colorempty, function (v) {
            return (v.ProcessJobOrdId == prcordjobdetid);
        });

        LotItemList = colorempty;
        loadLotTable(LotItemList);

        if (ChkLot == "Y") {

            prcrecjobdetid = data.Proc_Recpt_JobDetid;
            prcordjobdetid = data.ProcessOrdJobDetid;
            prcrecdetid = data.Proc_Recpt_Detid;
            GJobBalQty = data.allow;

            //var colorempty = [];
            //colorempty = LotItemListSave;

            //colorempty = $.grep(colorempty, function (v) {
            //    return (v.ProcessJobOrdId == prcordjobdetid);
            //});

            //LotItemList = colorempty;
            //loadLotTable (LotItemList);

        }


        //var table = $('#tbljobordinfo').DataTable();
        //var ecdata = table.rows().data();

        //$('input[id=txtOpjobOrdQty]').each(function (ig) {
        //    var row = $(this).closest('tr');
        //    for (var h = 0; h < jobdet.length; h++) {
        //        if (jobdet[h].CheckType == "Y" && jobdet[h].ProcessOrdJobDetid == prcordjobdetid) {
        //            if (ecdata[ig].CheckType == "Y" && ecdata[ig].ProcessOrdJobDetid == prcordjobdetid) {
        //                row.find('#txtOpjobOrdQty').attr("disabled", true);
        //            }
        //        }

        //        else if (jobdet[h].CheckType == "N" && jobdet[h].ProcessOrdJobDetid == prcordjobdetid) {
        //            if (ecdata[ig].CheckType == "N" && ecdata[ig].ProcessOrdJobDetid == prcordjobdetid) {
        //                row.find('#txtOpjobOrdQty').attr("disabled", false);
        //            }
        //        }
        //    }

        //});

    });



});

function LoadItemMovements(GrnNo) {
    debugger;

    $.ajax({
        url: "/GRNMain/LoadItemstockMovement/",
        data: JSON.stringify({ GrnNo: GrnNo }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            ItemMovementList = (result.Value);

            loadItemMovementTable(ItemMovementList);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function loadItemMovementTable(ItemMovementList) {
    debugger;
    // $('#tblcompdetails').DataTable().destroy();
    var inputcount = 0;
    $('#tblItemMovementdetails tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tblItemMovementdetails').DataTable().destroy();
    }
    $('#tblItemMovementdetails').empty();

    $('#tblItemMovementdetails').DataTable({

        data: ItemMovementList,
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
             //{ title: "Trims SlNo", data: "TrimsSlNo", "visible": false },
            { title: "Trans No", data: "transno" },
            { title: "Item", data: "Item" },
            { title: "Color", data: "Color" },
            { title: "Size", data: "Size" },
            { title: "Order No", data: "OrderNo", visible: false },
            { title: "Quantity", data: "Quantity" },
            { title: "Stock Qty", data: "StockQty" },
            { title: "UOM", data: "Uom" },
            { title: "Issue No", data: "IssueNo" },
            { title: "Date", data: "IssueDate" },
            { title: "IssueQty", data: "IssueQty" },
            { title: "Store Name", data: "StoreName" },
               //{
               //    title: "ACTION", "mDataProp": null,

               //    "render": function (data, type, row, meta) {
               //        if (data.Rate > "0") {
               //            return '<div style="display:inline-flex"><button type="button" disabled="disabled" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" id="btntrimsedit" class="btntrimsedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" disabled="disabled" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btntrimsremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div>'
               //        } else { return '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" id="btntrimsedit" class="btntrimsedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btntrimsremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div>' }
               //    }


               //}
        ]
    });


    $("#tblItemMovementdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblItemMovementdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}

function loadUserGroup() {
    debugger;
    $.ajax({
        url: "/ProcessOrder/GetUserGroup",
        data: JSON.stringify({ Userid: LoginUserid }),
        type: "POST",
        async: false,
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            UserGroup = result;
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}


function ReceiptTotal() {

    var tot = 0;

    $.each(ItmList, function (i) {
        tot = tot + parseFloat(ItmList[i].Received_qty);

    });

    $('#txtRecTotal').val(tot)

}