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
var EOtype = 0;
$(document).ready(function () {
    debugger;
    //LoadCompanyDDL("#ddlCompany");
    //LoadCompanyUnitDDL("#ddlUnit");
    //LoadWorkdivisionDDL("#ddlwrkdiv");
    //LoadSupplierDDL("#ddlSupplier");
    Guserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    MainFDate = $("#hdMainFromDate").data('value');
    //LoadWrkdiv();
    //LoadProcessor();
    LoadBuyerDDL("#ddlinnerbuyer");
    LoadCompanyDDL("#ddlMCompany,#ddlCompany");
    LoadCompanyUnitDDL("#ddlUnit");
    ChkBudProApp = $("#hdnCostBudProcessAppid").data('value');
    Gs = "Qlty";
    getDate();

    ListOrRefNo();
    ListPStyle();
    ddlmain();
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

    $('#tblmaindetails').on('click', 'tr', function (e) {
        debugger;

        var table = $('#tblmaindetails').DataTable();

        var row = $(this).closest('tr');
        var data = $('#tblmaindetails').dataTable().fnGetData(row);


        var ItmId = data[0];

        LoadMainOrderDetails(ItmId);
        LoadMainOrderStkDetails(ItmId);


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




        if (Val > OrdBalQty) {
            //alert("OrderQty Should Not Greater then OrderBalanceQty..");
            var msg = 'Order quantity Should Not Greater then Order Balance quantity...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);


            $.each(ItmList, function () {
                if (this.sno == CSno) {
                    this.Received_qty = 0;

                }
            });

            LoaditmTab(ItmList);
            return true;
        }
        $.each(ItmList, function () {
            if (this.sno == CSno) {
                this.Received_qty = Val;

            }
        });

        LoaditmTab(ItmList);

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

        LoadJobdetTab(colorempty);

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

        LoaditmTab(ItmList);

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

        var value = $(this).val();

        $.each(jobdetsave, function () {
            if (this.sno == sno) {


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

        LoadJobdetTab(colorempty);
        LoaditmTab(ItmList);

        //Datatable textbox focus
        var rows = $("#tbljobordinfo").dataTable().fnGetNodes();
        var dtTable = $('#tbljobordinfo').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
            $('input[id=txtOpjobOrdQty]').each(function () {
                if (sn == sno && $(this).val() == value) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtOpjobOrdQty').val();
                    row.find('#txtOpjobOrdQty').focus().val('').val(num);
                    return true;
                }
            });
        }
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

        LoadJobdetTab(colorempty);
        LoaditmTab(ItmList);


    });
    //
    $('#tblcbompdetails').on('click', 'tr', function (e) {
        debugger;
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

        var colorempty = [];
        colorempty = jobdetsave;

        colorempty = $.grep(colorempty, function (v) {
            return (v.Itemid === ItmId && v.Colorid === ClrId && v.Sizeid === SzId && v.processordid === PId && v.PlanSizeID === PlanSzId);
        });

        jobdet = colorempty;
        LoadJobdetTab(jobdet);
    });

});


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
    $.ajax({
        url: "/ProcessReceipt/Loadaddgrid",


        data: JSON.stringify({ cmpid: cmpyid, cmpunitid: cunitid, processid: procid, processorid: procrid, ordtype: type, clsed: cl, colorid: clid }),
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
    $.ajax({
        url: "/ProcessReceipt/Loadaddgrid",
        data: JSON.stringify({ cmpid: cmpyid, cmpunitid: cunitid, processid: procid, processorid: procrid, ordtype: type, clsed: cl, colorid: clid }),
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
    LoadAddgridddl();
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
    ordno = $('select#ddlOrderNo option:selected').text();

    process = $('select#ddlProcess option:selected').text();
    Processid = $('select#ddlProcess option:selected').val();
    unit = $('select#ddlUnit option:selected').text();
    Companyunitid = $('select#ddlUnit option:selected').val();
    CompanyId = $('select#ddlCompany option:selected').val();
    if (CompanyId == 0) {
        //alert('Select Company');
        var msg = 'Select Company...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }
    if (Companyunitid == 0) {
        //alert('Select CompanyUnit');
        var msg = 'Select CompanyUnit...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }
    if (Processid == 0) {
        //alert('Select Process');
        var msg = 'Select Process...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }
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
    LoadCompanyUnitDDL("#ddlPUnit");
    LoadStoreUnitDDL("#ddlSecStore");
    LoadWorkdivisionDDL("#ddlWK");
}
function LoadMainStore() {
    $("#SubStoreId").hide();
    $("#SecStoId").hide();
    $("#MainStoreId").show();
    LoadStoreUnitDDL("#ddlMSMMainStore");
    LoadCompanyDDL("#ddlMSCompany");
}
function LoadSubStore() {
    $("#SecStoId").hide();
    $("#MainStoreId").hide();
    $("#SubStoreId").show();
    $("#SubStorPrdId").hide();
    LoadCompanyDDL("#ddlSCompany");
    LoadStoreUnitDDL("#ddlSMainStore");
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

                            return '<input type="text" id="txtrecvdqty" class="calcipAmt form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';
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

                           return '<input type="text" id="txtOpjobOrdQty" class="calcsepquan form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

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
                       render: function (data) {

                           return '<input type="text" id="txtOpjobOrdQty" class="calcsepquan form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                       },
                   },

                    {
                        title: "SecQty", data: "Sec_Qty",
                        render: function (data) {

                            return '<input type="text" id="txtOpjobOrdSecQty" class="calcsepsecquan form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                        },
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
    var ordtype = $('input[name="Revert"]:checked').attr('value');
    var Obj = {
        // proc_recpt_masid:
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
    if ($('#ddlMSMMainStore').val() == 0) {
        //$('#ddlMSMMainStore').css('border-color', 'Red');
        $('#ddlMSMMainStore').siblings(".select2-container").css('border', '1px solid red');

        isValid = false;
    }
    else {
        $('#ddlMSMMainStore').css('border-color', 'lightgrey');
    }
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
    if (CompId == null || CompId == "0") {
        CompId = 0;
    }

    var Unit = $('#ddlMUnit').val();
    if (Unit == null || Unit == "0") {
        Unit = 0;
    }
    var prid = 0;
    var process = $('#ddlMProcess').val();
    if (process == null || process == "0") {
        process = 0;
    }
    var buyer = $('#ddlMBuyer').val();
    if (buyer == null || buyer == "0") {
        buyer = 0;
    }
    var mas = 0;
    var prid = 0;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
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
                        if (data[9] > "0.000") {
                            $('td', row).css('background-color', '#ffb380');

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
                             { title: "DC No" },
                             { title: "Type", "visible": false },
                              { title: "Processor" },
                               { title: "ChkIns", "visible": false },
                                 { title: "ChkDebQty", "visible": false },
                                  { title: "ChkAccPosted", "visible": false },
                              { title: "Action" },


                    ]

                });
            }

            //ddlmain();
            //$('#ddlMOrderNo').empty();
            //$('#ddlMreceptno').empty();
            //$('#ddlMDCNo').empty();
            //$('#ddlMCompany').empty();
            //$('#ddlMProcess').empty();
            //$('#ddlMunit').empty();
            //$('#ddlMBuyer').empty();
            var table = $('#tblmaindetails').DataTable();
            $("#tblmaindetails tr").click(function () {
                var selected = $(this).hasClass("selected");
                $("#tblmaindetails tr").removeClass("selected");
                if (!selected)
                    $(this).addClass("selected");
            });
            CheckRights("ProcessReceiptQuality");
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
                    var msg = 'Refer Number Already Exists...';
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
    if (CompId == null || CompId == "0") {
        CompId = 0;
    }

    var Unit = $('#ddlMUnit').val();
    if (Unit == null || Unit == "0") {
        Unit = 0;
    }
    var prid = 0;
    var process = $('#ddlMProcess').val();
    if (process == null || process == "0") {
        process = 0;
    }
    var buyer = $('#ddlMBuyer').val();
    if (buyer == null || buyer == "0") {
        buyer = 0;
    }
    var mas = 0;
    var prid = 0;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();


    var OrdNo = "";
    //var ONo = $('select#ddlMBuyOrderNo option:selected').val();

    //if (ONo == 0) {
    //    OrdNo == "";
    //}
    //else {

    //    OrdNo = $('select#ddlMBuyOrderNo option:selected').val();
    //}

    var RefNo = "";
    //var RNo = $('select#ddlMRefNo option:selected').val();

    //if (RNo == 0) {
    //    RefNo == "";
    //}
    //else {

    //    RefNo = $('select#ddlMRefNo option:selected').val();
    //}

    var StyId = 0;

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
                });

                $(ddlMreceptno).empty();
                $(ddlMDCNo).empty();
                // $(ddlMCompany).empty();
                $(ddlMProcess).empty();
                $(ddlMunit).empty();
                $(ddlMSupplier).empty();

                $(ddlMreceptno).append($('<option/>').val('0').text('--Select ReceiptNo--'));
                $.each(recpt, function () {
                    $(ddlMreceptno).append($('<option></option>').text(this.proc_recpt_no));
                });

                $(ddlMDCNo).append($('<option/>').val('0').text('--Select DCNo--'));
                $.each(dc, function () {
                    $(ddlMDCNo).append($('<option></option>').text(this.Recpt_Ref_no));
                });

                //$(ddlMCompany).append($('<option/>').val('0').text('--Select Company--'));
                //$.each(comp, function () {
                //    $(ddlMCompany).append($('<option></option>').val(this.companyid).text(this.company));
                //});

                $(ddlMProcess).append($('<option/>').val('0').text('--Select Processs--'));
                $.each(proc, function () {
                    $(ddlMProcess).append($('<option></option>').val(this.processid).text(this.process));
                });

                $(ddlMunit).append($('<option/>').val('0').text('--Select Unit--'));
                $.each(unit, function () {
                    $(ddlMunit).append($('<option></option>').val(this.unitid).text(this.unit));
                });

                $(ddlMSupplier).append($('<option/>').val('0').text('--Select Supplier--'));
                $.each(supp, function () {
                    $(ddlMSupplier).append($('<option></option>').val(this.supplierid).text(this.supplier));
                });

                //$(ddlMBuyer).append($('<option/>').val('0').text('--Select Buyer--'));
                //$.each(data, function () {
                //    $(ddlMBuyer).append($('<option></option>').val(this.buyerid).text(this.buyer));
                //});
                LoadMaingrid();
            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function CMainlist() {
    //$('#tblmaindetails').DataTable().destroy();
    LoadMaingrid();
}


function LOADQLTY() {

    var Prg = "Qlty";
    Gs = Prg;
    var Type = "Qlty";
  //  $('#tblmaindetails').DataTable().destroy();
    LoadMaingrid();
}
function LOADReceipt() {

    var Prg = "Rcpt";
    Gs = Prg;
    var Type = "Rcpt";
   // $('#tblmaindetails').DataTable().destroy();
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

function getbyID(masid, chkIns) {
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
            $('#btnUpdate').show();
            $('#btnDel').hide();
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
            EOtype = obj[0].type;
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

            $('#ddlMSCompany').val(obj[0].companyid);
            //CompanyId = obj[0].cmpid;
            //ProductionOrderno = obj[0].prodnord;
            //Companyunitid = obj[0].cmpunitid;

            //Processid = obj[0].processid;
            //Processorid = obj[0].processorid;
            LoadEditInputItm(masid);
            LoadEditInputJobdet(masid);

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


function Update() {
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
    //var ordtype = $('input[name="Revert"]:checked').attr('value');
    var Obj = {
        proc_recpt_masid: Masid,
        proc_recpt_no: $("#txtReceiptno").val(),
        proc_recpt_date: $("#txtReceiptDate").val(),//new Date($('#txtReceiptDate').val()),
        Recpt_Ref_date: $("#txtRefDate").val(),//new Date($('#txtRefDate').val()),
        Recpt_Ref_no: $("#txtRefNo").val(),
        remarks: $("#txtRemark").val(),
        OrderType: EOtype,
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


function getDeleteID(masid, chkIns) {
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



function ProcessRecptPrint(Id) {
    debugger;
    Repid = Id;
    $('#myModal2').modal('show');

    for (var d = 0; d < maingridlist.length; d++) {
        if (maingridlist[d].proc_recpt_masid == Id) {
            processname = maingridlist[d].process;
        }
    }
    if (processname == "Knitting") {
        processname = "Knitting DC Receipt";
    }
    else if (processname == "CONE WINDING") {
        processname = "CONE WINDING RECEIPT";

    }
    else if (processname == "Dyeing") {
        processname = "DYEING RECEIPT";
    }
    else if (processname == "Compacting") {
        processname = "COMPACTING RECEIPT";
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

    window.open("../ReportInline/Process/ProcessReceipt/ProcessReceiptReportInline.aspx?Masid=" + Repid + "&RetLossdet=" + p[0] + "&Ins=" + p[1] + "&Lotdet=" + p[2] + "&Procord=" + p[3] + "&POdet=" + p[4] + "&Ewaybill=" + p[5] + "&Ewaydate=" + p[6] + "&ProcessName=" + processname);

}

function backtomain() {
    $("#myModal2").hide();
    $("#myModal2").modal('hide');
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

                $(ddlMBuyOrderNo).empty();
                $(ddlMRefNo).empty();

                //OrdNo
                $(ddlMBuyOrderNo).append($('<option/>').val('0').text('--Select OrdNo--'));
                $.each(ord, function () {
                    $(ddlMBuyOrderNo).append($('<option></option>').text(this.orderno));
                });
                //RefNo
                $(ddlMRefNo).append($('<option/>').val('0').text('--Select RefNo--'));
                $.each(ref, function () {
                    $(ddlMRefNo).append($('<option></option>').text(this.refno));
                });


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
    ListOrRefNo();
    ListPStyle();
    ddlmain();

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