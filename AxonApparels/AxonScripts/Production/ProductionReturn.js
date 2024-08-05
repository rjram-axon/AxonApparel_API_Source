var CompanyId = 0;
var Companyunitid = 0;
var rowindex = -1;
var ItmList = [];
var index = -1;
var Masid = 0;
var Userid = 0;
var UserName = 0;
var MainFDate = 0;
var repobj = [];
var Repid = 0;
var Guserid = 0;
var DCompid = 0;
var ChkRcptno = true;
var DtChk = false;
var ChkProcess = true;
var ChkBuyer = true;
var ChkDCNo = true;
var ChkComp = false;
var ChkOrdno = true;
var LoginUserid = '';
var editmasunitstore = 0;
var editsubmasunitstore = 0;
var editsubstore = 0;
$(document).ready(function () {
    debugger;
    LoadWorkdivisionDDL("#ddlwrkdivision");
    LoadSupplierDDL("#ddlprocessor");
    LoadCompanyDDL("#ddlMCompany,#ddlCompany");
    LoadCompanyUnitDDL("#ddlMunit,#ddlUnit");
    //LoadBuyerDDL("#ddlBuyer");
    // LoadProcessDDL("#ddlProcess");
    Guserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    MainFDate = $("#hdMainFromDate").data('value');
    DCompid = $("#hdnDCompid").data('value');
    LoadItemMovements();

    LoadWorkdivisionDDL("#ddlwrkdiv");
    LoadProcessor();
    getDate();
    ddlmain();
    LoadMaingrid();
    LoadMaingridord();
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
        var prodord = entrygriddet[0].prodord;
        var type = $('input[name="optwrkord"]:checked').attr('value');
        if (type == 'P') {
            var sup = $('#ddlSupplier').val();
            var supp = $('select#ddlSupplier option:selected').text();
            Processorid = $('select#ddlSupplier option:selected').val();
            if (sup == 0) {
               // alert('Select Supplier');

                $('#ddlSupplier').siblings(".select2-container").css('border', '1px solid red');

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

                $('#ddlwrkdiv').siblings(".select2-container").css('border', '1px solid red');
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


        editmasunitstore = 0;
        editsubmasunitstore = 0;
        editsubstore = 0;
        LoadEmployeeStoreunit();
        LoadUserCompanyDDL();

        if (Processid == 0) {
            //alert('Select Process');
            $('#ddlProcess').siblings(".select2-container").css('border', '1px solid red');
            return true;
        }
        if (CompanyId == 0) {
           // alert('Select Company');
            $('#ddlCompany').siblings(".select2-container").css('border', '1px solid red');
            return true;
        }
        if (Companyunitid == 0) {
            //alert('Select Unit');
            $('#ddlUnit').siblings(".select2-container").css('border', '1px solid red');
            return true;
        }

        GenerateNumber();
        $('#myModal').hide();
        $('#myModal1').show();
        $('#myModal1').modal('show');
        $('#btnUpdate').hide();
        $('#btnDel').hide();
        $('#btnAdd').show();
        //$('#txtOrderNo').val(ordno);
        $('#txtProcess').val(process);
        $('#txtUnit').val(unit);
        $('#txtProcessor').val(supp);


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
        LoadItm(prodord);
    });
    $(document).on('keyup', '.calcRetqty', function () {
        debugger;

        var table = $('#tblitmdetails').DataTable();
        var CSno = table.row($(this).parents('tr')).data()["prodjobdetid"];

        var val = $(this).val();

        $.each(ItmList, function () {
            if (this.prodjobdetid == CSno) {
                this.retqty = val;

            }
        });

        LoadItmtab(ItmList);

        var rows = $("#tblitmdetails").dataTable().fnGetNodes();
        var dtTable = $('#tblitmdetails').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 1 }).data()[0];
            $('input[id=txtretqty]').each(function () {
                if (sn == CSno && $(this).val() == val) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtretqty').val();
                    row.find('#txtretqty').focus().val('').val(num);
                    return true;
                }
            });
        }
    });
    $(document).on('keyup', '.calcLossqty', function () {
        debugger;

        var table = $('#tblitmdetails').DataTable();
        var CSno = table.row($(this).parents('tr')).data()["prodjobdetid"];

        var val = $(this).val();

        $.each(ItmList, function () {
            if (this.prodjobdetid == CSno) {
                this.lossqty = val;

            }
        });

        LoadItmtab(ItmList);
        var rows = $("#tblitmdetails").dataTable().fnGetNodes();
        var dtTable = $('#tblitmdetails').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 1 }).data()[0];
            $('input[id=txtlossqty]').each(function () {
                if (sn == CSno && $(this).val() == val) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtlossqty').val();
                    row.find('#txtlossqty').focus().val('').val(num);
                    return true;
                }
            });
        }
    });
    $('#tblmaindetails').on('click', 'tr', function (e) {
        debugger;

        var table = $('#tblmaindetails').DataTable();

        var row = $(this).closest('tr');
        var data = $('#tblmaindetails').dataTable().fnGetData(row);
        var ProcessOrdNo = data[1];
        LoadItemMovements(ProcessOrdNo);
    });

});


function LoadSecStore() {
    $("#SubStoreId").hide();
    $("#SecStoId").show();
    $("#MainStoreId").hide();
    //LoadCompanyUnitDDL("#ddlPUnit");
    //LoadStoreUnitDDL("#ddlSecStore");
    //LoadWorkdivisionDDL("#ddlWK");
}
function LoadMainStore() {
    $("#SubStoreId").hide();
    $("#SecStoId").hide();
    $("#MainStoreId").show();
    //LoadStoreUnitDDL("#ddlMSMMainStore");
    //LoadCompanyDDL("#ddlMSCompany");
}
function LoadSubStore() {
    $("#SecStoId").hide();
    $("#MainStoreId").hide();
    $("#SubStoreId").show();
    $("#SubStorPrdId").hide();
    //LoadCompanyDDL("#ddlSCompany");
    //LoadStoreUnitDDL("#ddlSMainStore");
}

function RadioSMClick() {
    $("#SubStoreMainId").show();
    $("#SubStorPrdId").hide();
}
function RadioSSPClick() {


    $("#SubStoreMainId").hide();
    $("#SubStorPrdId").show();
    //LoadStoreUnitDDL("#ddlSStoreSub");
    //LoadCompanyUnitDDL("#ddlSStorePunit");

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


function GenerateNumber() {
    debugger;

    table = "Production_Recpt_Mas",
    column = "prod_recpt_no",
    compId = CompanyId,
    Docum = 'PRODUCTION RETURN'

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
function ClearTextbox() {
    debugger;
    //$('#ddlCompany').val("0");
    //$('#ddlUnit').val("0");
    //$('#ddlColor').val("0");
    $('#ddlProcess').val("0");
    $('#ddlwrkdiv').val("0");
    $('#ddlBuyer').val("0");
    //$('#ddlProcess').val("0");
    $('#ddlSupplier').val("0");
    $('#ddlOrderNo').val("0");
    //$('#ddlIssueNo').val("0");
    $('#ddlRefNo').val("0");
    //$('#ddlinnerbuyer').val("0");
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
    LoadAddgridddl();
}

function LoadProcessor() {
    debugger;

    $.ajax({
        url: "/ProductionReturn/Getprocessor",
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


function LoadProcess() {
    debugger;
    var cmpyid = $('select#ddlCompany option:selected').val();
    var cunitid = $('select#ddlUnit option:selected').val();
    if (cmpyid == 0) {
        //alert('Please select Company...');
        var msg = 'Please select Company...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        return true;
    }
    if (cunitid == 0) {
        //alert('Please select CompanyUnit...');
        var msg = 'Please select CompanyUnit...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        return true;
    }
    $.ajax({
        url: "/ProductionReturn/Getprocess",
        data: JSON.stringify({ cmpid: cmpyid, cmpunitid: cunitid }),
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
function LoadOrderno() {
    debugger;
    var cmpyid = $('select#ddlCompany option:selected').val();
    var cunitid = $('select#ddlUnit option:selected').val();
    if (cmpyid == 0) {
        //alert('Please select Company...');
        var msg = 'Please select Company...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        return true;
    }
    if (cunitid == 0) {
        //alert('Please select CompanyUnit...');
        var msg = 'Please select CompanyUnit...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        return true;
    }
    var proid = $('select#ddlProcess option:selected').val();
    var protype = $('input[name="optwrkord"]:checked').attr('value');
    if (protype == 'P') {
        var procrid = $('select#ddlSupplier option:selected').val();
    }
    else if (protype == 'W') {
        var procrid = $('select#ddlwrkdiv option:selected').val();
    }
    if (procrid == 0) {
        //alert('Please select Processor...');
        var msg = 'Please select Processor...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        return true;
    }
    $.ajax({
        url: "/ProductionReturn/GetOrderno",
        data: JSON.stringify({ cmpid: cmpyid, cmpunitid: cunitid, processid: proid, processorid: procrid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            if (result.Status == 'SUCCESS') {

                // if (Mode == 0) {
                var data = result.Value;
                $(ddlOrderNo).empty();
                $(ddlOrderNo).append($('<option/>').val('0').text('--Select OrderNo--'));
                $.each(data, function () {
                    $(ddlOrderNo).append($('<option></option>').val(this.bmasid).text(this.orderno));
                });
                //}

                $(ddlRefNo).empty();
                $(ddlRefNo).append($('<option/>').val('0').text('--Select RefNo--'));
                $.each(data, function () {
                    $(ddlRefNo).append($('<option></option>').val(this.bmasid).text(this.refno));
                });
            }
            LoadBuyer();
            LoadAddgrid();
        }

    });
}

function LoadBuyer() {
    debugger;
    var cmpyid = $('select#ddlCompany option:selected').val();
    var cunitid = $('select#ddlUnit option:selected').val();
    if (cmpyid == 0) {
        //alert('Please select Company...');
        var msg = 'Please select Company...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        return true;
    }
    if (cunitid == 0) {
        //alert('Please select CompanyUnit...');
        var msg = 'Please select CompanyUnit...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        return true;
    }
    var proid = $('select#ddlProcess option:selected').val();
    var protype = $('input[name="optwrkord"]:checked').attr('value');
    if (protype == 'P') {
        var procrid = $('select#ddlSupplier option:selected').val();
    }
    else if (protype == 'W') {
        var procrid = $('select#ddlwrkdiv option:selected').val();
    }
    if (procrid == 0) {
        //alert('Please select Processor...');
        var msg = 'Please select Processor...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        return true;
    }
    $.ajax({
        url: "/ProductionReturn/Getbuyer",
        data: JSON.stringify({ cmpid: cmpyid, cmpunitid: cunitid, processid: proid, processorid: procrid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            if (result.Status == 'SUCCESS') {
                var data = result.Value;
                $(ddlBuyer).empty();
                $(ddlBuyer).append($('<option/>').val('0').text('--Select Buyer--'));
                $.each(data, function () {
                    $(ddlBuyer).append($('<option></option>').val(this.buyerid).text(this.buyer));
                });
            }
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
    var protype = $('input[name="optwrkord"]:checked').attr('value');
    var type = $('input[name="Revert"]:checked').attr('value');
    if (protype == 'P') {
        var procrid = $('select#ddlSupplier option:selected').val();
    }
    else if (protype == 'W') {
        var procrid = $('select#ddlwrkdiv option:selected').val();
    }
    if (procrid == null || procrid == "0") {
        procrid = 0;
    }
    var cl = 'N';



    var cmpyid = $('select#ddlCompany option:selected').val();
    if (cmpyid == null || cmpyid == "0") {
        cmpyid = 0;
    }

    var ref="";
    var byid = $('select#ddlBuyer option:selected').val();
    if (byid == null || byid == "0") {
        byid = 0;
    }
    var cunitid = $('select#ddlUnit option:selected').val();
    if (cunitid == null || cunitid == "0") {
        cunitid = 0;
    }
    var procid = $('select#ddlProcess option:selected').val();
    if (procid == null || procid == "0") {
        procid = 0;
    }

    var ordNo = "";
    var ONo = $('select#ddlOrderNo option:selected').val();

    if (ONo == 0 || ONo == undefined) {
        ordNo == "";
    }
    else {

        ordNo = $('select#ddlOrderNo option:selected').val();
    }

    $.ajax({
        url: "/ProductionReturn/Loadaddgrid",
        data: JSON.stringify({ cmpid: cmpyid, cmpunitid: cunitid, processid: procid, processorid: procrid,  buyerid: byid, refno: ref, ordno: ordNo, ordtype: type, procordtype: protype }),
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
    var protype = $('input[name="optwrkord"]:checked').attr('value');
    var type = $('input[name="Revert"]:checked').attr('value');
    if (protype == 'P') {
        var procrid = $('select#ddlSupplier option:selected').val();
    }
    else if (protype == 'W') {
        var procrid = $('select#ddlwrkdiv option:selected').val();
    }
    if (procrid == null || procrid == "0") {
        procrid = 0;
    }
    var cl = 'N';



    var cmpyid = $('select#ddlCompany option:selected').val();
    if (cmpyid == null || cmpyid == "0") {
        cmpyid = 0;
    }

    var ref = "";
    var byid = $('select#ddlBuyer option:selected').val();
    if (byid == null || byid == "0") {
        byid = 0;
    }
    var cunitid = $('select#ddlUnit option:selected').val();
    if (cunitid == null || cunitid == "0") {
        cunitid = 0;
    }
    var procid = $('select#ddlProcess option:selected').val();
    if (procid == null || procid == "0") {
        procid = 0;
    }

    var ordNo = "";
    var ONo = $('select#ddlOrderNo option:selected').val();

    if (ONo == 0 || ONo == undefined) {
        ordNo == "";
    }
    else {

        ordNo = $('select#ddlOrderNo option:selected').val();
    }

    $.ajax({
        url: "/ProductionReturn/Loadaddgrid",
        data: JSON.stringify({ cmpid: cmpyid, cmpunitid: cunitid, processid: procid, processorid: procrid, buyerid: byid, refno: ref, ordno: ordNo, ordtype: type, procordtype: protype }),
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
                var orddet = {};
                var ord = [];
                $.each(data, function (i, el) {

                    if (!compdet[el.cmpid]) {
                        compdet[el.cmpid] = true;
                        comp.push(el);
                    }

                    if (!recptdet[el.processid]) {
                        recptdet[el.processid] = true;
                        recpt.push(el);
                    }

                    if (!dcdet[el.buyerid]) {
                        dcdet[el.buyerid] = true;
                        dc.push(el);
                    }


                    if (!unitdet[el.unitid]) {
                        unitdet[el.unitid] = true;
                        unit.push(el);
                    }

                    if (!orddet[el.orderno]) {
                        orddet[el.orderno] = true;
                        ord.push(el);
                    }
                });


                $(ddlProcess).empty();
                $(ddlOrderNo).empty();
                $(ddlBuyer).empty();

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
                //    $(ddlCompany).append($('<option></option>').val(this.cmpid).text(this.cmp));
                //});

                $(ddlOrderNo).append($('<option/>').val('0').text('--Select OrderNo--'));
                $.each(ord, function () {
                    $(ddlOrderNo).append($('<option></option>').text(this.orderno));
                });

                $(ddlBuyer).append($('<option/>').val('0').text('--Select Buyer--'));
                $.each(dc, function () {
                    $(ddlBuyer).append($('<option></option>').val(this.buyerid).text(this.buyer));
                });

            }
        }

    });
}


function LoadEntrytab(list) {
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
        columns: [
                   { title: "Prodid", data: "prodordid", "visible": false },
                   { title: "P.ord.No", data: "prodord" },
                   { title: "P.Date", data: "proddate" },
                   { title: "Processor", data: "processor" },
                   { title: "Ord Qty", data: "orderqty" },
                   { title: "Issued", data: "issued" },
                   { title: "Balance", data: "bal" },
                   {
                       title: "Group", data: "prodordid",
                       render: function (data) {

                           return '<button type="button" class="btnSelect btn btn_round btn-success" data-toggle="tooltip" data-placement="top" title="Add" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" >  <i class="fa fa-plus"></i> </button>';
                       }
                   },

        ]

    });
}

function LoadItm(prodord) {
    debugger;

    $.ajax({
        url: "/ProductionReturn/LoadItmDet",
        data: JSON.stringify({ prodord: prodord }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;

            ItmList = result.Value;

            LoadItmtab(ItmList);

        }

    });
}

function LoadItmtab(list) {
    $('#tblitmdetails').DataTable().destroy();

    $('#tblitmdetails').DataTable({
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
                   { title: "Prodordid", data: "prodordid", "visible": false },
                    { title: "ProdJobdetid", data: "prodjobdetid", "visible": false },
                    { title: "Itmid", data: "itmid", "visible": false },
                   { title: "Colorid", data: "colorid", "visible": false },
                   { title: "Sizeid", data: "sizeid", "visible": false },

                   { title: "Job Ord No", data: "jobordno" },
                   { title: "Prog.No", data: "prodprgno" },
                   { title: "Order No", data: "productionord" },

                    { title: "Item", data: "itm" },
                   { title: "Category I", data: "color" },
                   { title: "Category II", data: "size" },
                   {
                       title: "Return Qty", data: "retqty",
                       render: function (data) {

                           return '<input type="text" id="txtretqty" class="calcRetqty form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                       },
                   },
                   {
                       title: "Loss Qty", data: "lossqty",
                       render: function (data) {

                           return '<input type="text" id="txtlossqty" class="calcLossqty form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';

                       },
                   },

        ]

    });
}


$(document).ready(function () {
    $("#tblitmdetails ").dataTable().find("tbody").on('click', 'tr', function () {
        index = (this.rowIndex) - 1;
    });
});

function backtomain() {
    //$('#myModal1').hide();
    //$('#myModal1').modal('hide');
    //$('#myModal').hide();
    //$('#myModal').modal('hide');
    window.location.href = "/ProductionReturn/ProductionReturnIndex";
}

function Add() {
    debugger;



    var opchk = [];

    for (var y = 0; y < ItmList.length; y++) {
        if (ItmList[y].retqty > 0) {
            opchk.push(ItmList[y]);
        }
    }
        
    if (opchk.length == 0) {
        //alert('Please fill atleast any one qty...');
        var msg = 'Please fill atleast any one quantity...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        return true;
    }


    var res = validate();
    if (res == false) {
        return false;
    }
    var MSType = $('input[name="MSType"]:checked').attr('value');

    var storeunitid = 0;
    if (MSType == "S") {
        storeunitid = $('#ddlSMainStore').val();
    } else if (MSType == "M") {
        storeunitid = $('#ddlMSMMainStore').val();
    }


    var ordtype = $('input[name="Revert"]:checked').attr('value');
    debugger;
    table = "Production_Recpt_Mas",
    column = "prod_recpt_no",
    compId = CompanyId,
    Docum = 'PRODUCTION RETURN'

    var oldReturnNo = $("#txtReceiptno").val();
    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var newReturnNo = result.Value;
            if (oldReturnNo != newReturnNo) {
                //alert('Return No has been changed...');
                var msg = 'Return Number has been changed...';
                var flg = 4;
                var mod = 1;
                var ur = "";
                AlartMessage(msg, flg, mod, ur);
                $('#txtReceiptno').val(result.Value);
            }
            var ObjAdd = {
                // prod_recpt_masid:
                prod_recpt_no: $("#txtReceiptno").val(),
                prod_recpt_date: $("#txtReceiptDate").val(),//new Date($('#txtReceiptDate').val()),
                Recpt_Ref_date: $("#txtRefDate").val(),//new Date($('#txtRefDate').val()),
                Recpt_Ref_no: $("#txtRefNo").val(),
                remarks: $("#txtRemark").val(),
                OrderType: ordtype,
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
                ProdRetItmDet: ItmList

            }
            LoadingSymb();
            $.ajax({
                url: "/ProductionReturn/Add",
                data: JSON.stringify(ObjAdd),
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {
                    debugger;
                    if (result.Value == true) {
                        AddUserEntryLog('Production', 'Sewing Return', 'ADD', $("#txtReceiptno").val());
                        //alert('Data Saved Successfully');
                        //window.location.href = "/ProductionReturn/ProductionReturnIndex";
                        var msg = 'Data Saved Successfully...';
                        var flg = 1;
                        var mod = 0;
                        var ur = "/ProductionReturn/ProductionReturnIndex";
                        AlartMessage(msg, flg, mod, ur);
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

    //var type = $('select#ddlMType option:selected').val();

    //if (type == undefined) {
    //    type = "";
    //}

    var type = $('input[name="MoType"]:checked').attr('value');

    var proctype = $('input[name="mainproctype"]:checked').attr('value');
    if (proctype == 'P') {

        $('#ddlpro').show();
        $("#ddlwrkd").hide();
        Processorid = $('select#ddlprocessor option:selected').val();
    }
    else if (proctype == 'W') {
        $('#ddlpro').hide();
        $("#ddlwrkd").show();
        Processorid = $('select#ddlwrkdivision option:selected').val();
    }

    var ordNo = "";
    var ONo = $('select#ddlordno option:selected').val();

    if (ONo == 0 || ONo == undefined) {
        ordNo == "";
    }
    else {

        ordNo = $('select#ddlordno option:selected').val();
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
    if (Unit == null || Unit == "0") {
        Unit = 0;
    }
    var prid = 0;
    var process = $('#ddlMProcess').val();
    if (process == null || process == "0") {
        process = 0;
    }
    var buyerid = $('select#ddlMBuyer option:selected').val();
    if (buyerid == null || buyerid == "0") {
        buyerid = 0;
    }
    var mas = 0;
    var prid = 0;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    if (ChkComp || DtChk) {
        ordNo = "";
        RecNo = "";
        DCNo = "";
        Unit = 0;
        process = 0;
        buyer = 0;
    }
    $.ajax({
        url: "/ProductionReturn/LoadMaingrid",
        data: JSON.stringify({ cmpid: CompId, processid: process, unitid: Unit, buyerid: buyerid, masid: mas, prodordid: prid, processortype: proctype, type: type, dcno: DCNo, recptno: RecNo, fromDate: FDate, todate: TDate, Processorid: Processorid, ordno: ordNo }),
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
                "bSort": false,
                columns: [
                         { title: "ProductionRecptid", "visible": false },
                         { title: "Receipt No" },
                         { title: "Receipt Date" },
                         { title: "Unit" },
                         { title: "Process" },
                         { title: "DC No" },
                         { title: "Type", "visible": false },
                          { title: "Action" },


                ]

            });


            //ddlmain();

            //$('#ddlMreceptno').empty();
            //$('#ddlMDCNo').empty();
            //$('#ddlMCompany').empty();
            //$('#ddlMProcess').empty();
            //$('#ddlMunit').empty();
            //$('#ddlMBuyer').empty();

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
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function LoadMaingridord() {
    debugger;

    //var type = $('select#ddlMType option:selected').val();

    //if (type == undefined) {
    //    type = "";
    //}

    var type = $('input[name="MoType"]:checked').attr('value');

    var proctype = $('input[name="mainproctype"]:checked').attr('value');
    if (proctype == 'P') {

        $('#ddlpro').show();
        $("#ddlwrkd").hide();
        Processorid = $('select#ddlprocessor option:selected').val();
    }
    else if (proctype == 'W') {
        $('#ddlpro').hide();
        $("#ddlwrkd").show();
        Processorid = $('select#ddlwrkdivision option:selected').val();
    }

    var ordNo = "";
    var ONo = $('select#ddlordno option:selected').val();

    if (ONo == 0 || ONo == undefined) {
        ordNo == "";
    }
    else {

        ordNo = $('select#ddlordno option:selected').val();
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
    if (Unit == null || Unit == "0") {
        Unit = 0;
    }
    var prid = 0;
    var process = $('#ddlMProcess').val();
    if (process == null || process == "0") {
        process = 0;
    }
    var buyerid = $('select#ddlMBuyer option:selected').val();
    if (buyerid == null || buyerid == "0") {
        buyerid = 0;
    }
    var mas = 0;
    var prid = 0;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    if (ChkComp || DtChk) {
        ordNo = "";
        RecNo = "";
        DCNo = "";
        Unit = 0;
        process = 0;
        buyer = 0;
    }
    $.ajax({
        url: "/ProductionReturn/LoadMaingridord",
        data: JSON.stringify({ cmpid: CompId, processid: process, unitid: Unit, buyerid: buyerid, masid: mas, prodordid: prid, processortype: proctype, type: type, dcno: DCNo, recptno: RecNo, fromDate: FDate, todate: TDate, Processorid: Processorid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");

            var refobj = [];
            $.each(dataSet, function (i) {
                var obj = {
                    orderno: dataSet[i][7]
                }
                refobj.push(obj);
            });



            var revdet = {};
            var rev = [];

            $.each(refobj, function (i, el) {

                if (!revdet[el.orderno]) {
                    revdet[el.orderno] = true;
                    rev.push(el);
                }
            });

            if (ChkOrdno || ChkComp || DtChk) {
                $('#ddlordno').empty();
                $('#ddlordno').append($('<option/>').val('0').text('--Select OrderNo--'));
                $.each(rev, function () {
                    $('#ddlordno').append($('<option></option>').val(this.orderno).text(this.orderno));
                });
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
    var proctype = $('input[name="mainproctype"]:checked').attr('value');



    //if (proctype == 'P') {

    //    $('#Msupp').show();
    //    $("#Mwrkdiv").hide();
    //}
    //else if (proctype == 'W') {
    //    $('#Msupp').hide();
    //    $("#Mwrkdiv").show();
    //}
    var ordNo = "";
    var ONo = $('select#ddlordno option:selected').val();

    if (ONo == 0 || ONo == undefined) {
        ordNo == "";
    }
    else {

        ordNo = $('select#ddlordno option:selected').val();
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
    if (Unit == null || Unit == "0") {
        Unit = 0;
    }
    var prid = 0;
    var process = $('#ddlMProcess').val();
    if (process == null || process == "0") {
        process = 0;
    }
    var buyerid = $('select#ddlMBuyer option:selected').val();
    if (buyerid == null || buyerid == "0") {
        buyerid = 0;
    }
    var mas = 0;
    var prid = 0;
    var Processorid = 0;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    if (ChkComp || DtChk) {
        ordNo = "";
        RecNo = "";
        DCNo = "";
        Unit = 0;
        process = 0;
        buyer = 0;
    }

    $.ajax({
        url: "/ProductionReturn/LoadMaingriddet",
        data: JSON.stringify({ cmpid: CompId, processid: process, unitid: Unit, buyerid: buyerid, masid: mas, prodordid: prid, processortype: proctype, type: type, dcno: DCNo, recptno: RecNo, fromDate: FDate, todate: TDate, Processorid: Processorid, ordno: ordNo }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            var obj = json.Value;
            if (json.Status == 'SUCCESS') {
                var data = json.Value;

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
                var buydet = {};
                var buy = [];
                $.each(obj, function (i, el) {

                    if (!compdet[el.companyid]) {
                        compdet[el.companyid] = true;
                        comp.push(el);
                    }

                    if (!recptdet[el.prod_recpt_no]) {
                        recptdet[el.prod_recpt_no] = true;
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

                    if (!buydet[el.buyerid]) {
                        buydet[el.buyerid] = true;
                        buy.push(el);
                    }
                });

                //if(ChkOrdno ||ChkComp||DtChk){
                //    $('#ddlMOrderNo').empty();
                //    $(ddlMOrderNo).append($('<option/>').val('0').text('--Select OrderNo--'));
                //    $.each(ord, function () {
                //        $(ddlMOrderNo).append($('<option></option>').text(this.jobordno));
                //    });
                //}

                if(ChkRcptno ||ChkComp||DtChk){
                    $('#ddlMreceptno').empty();
                    $(ddlMreceptno).append($('<option/>').val('0').text('--Select ReceiptNo--'));
                    $.each(recpt, function () {
                        $(ddlMreceptno).append($('<option></option>').text(this.prod_recpt_no));
                    });
                }
                if(ChkDCNo ||ChkComp||DtChk){
                    $('#ddlMDCNo').empty();
                    $(ddlMDCNo).append($('<option/>').val('0').text('--Select DCNo--'));
                    $.each(dc, function () {
                        $(ddlMDCNo).append($('<option></option>').text(this.Recpt_Ref_no));
                    });
                }
                //$(ddlMCompany).append($('<option/>').val('0').text('--Select Company--'));
                //$.each(comp, function () {
                //    $(ddlMCompany).append($('<option></option>').val(this.companyid).text(this.company));
                //});
                if(ChkProcess ||ChkComp||DtChk){
                    $('#ddlMProcess').empty();
                    $(ddlMProcess).append($('<option/>').val('0').text('--Select Processs--'));
                    $.each(proc, function () {
                        $(ddlMProcess).append($('<option></option>').val(this.processid).text(this.process));
                    });}

                //$(ddlMunit).append($('<option/>').val('0').text('--Select Unit--'));
                //$.each(unit, function () {
                //    $(ddlMunit).append($('<option></option>').val(this.unitid).text(this.unit));
                //});
                if(ChkBuyer ||ChkComp||DtChk){
                    $('#ddlMBuyer').empty();
                    $(ddlMBuyer).append($('<option/>').val('0').text('--Select Buyer--'));
                    $.each(buy, function () {
                        $(ddlMBuyer).append($('<option></option>').val(this.buyerid).text(this.buyer));
                    });
                }
            
            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function CMainlist() {
    $('#tblmaindetails').DataTable().destroy();
    ChkRcptno = true;
    DtChk = false;
    ChkProcess = true;
    ChkBuyer = true;
    ChkDCNo = true;
    ChkComp = true;
    ChkOrdno = true;
    LoadWorkdivisionDDL("#ddlwrkdivision");
    LoadSupplierDDL("#ddlprocessor");
    LoadMaingridord();
    ddlmain();
    LoadMaingrid();
    
}

function PMainlist() {
    $('#tblmaindetails').DataTable().destroy();
    ChkRcptno = true;
    ChkOrdno = false;
    DtChk = false;
    ChkProcess = false;
    ChkBuyer = true;
    ChkDCNo = true;
    ChkComp = false;
    ddlmain();
    LoadMaingrid();
}
function OMainlist() {
    $('#tblmaindetails').DataTable().destroy();
    ChkRcptno = true;
    ChkOrdno = false;
    DtChk = false;
    ChkProcess = true;
    ChkBuyer = true;
    ChkDCNo = true;
    ChkComp = false;
    ddlmain();
    LoadMaingrid();
}
function OrdMainlist() {
    $('#tblmaindetails').DataTable().destroy();
    ChkRcptno = true;
    ChkOrdno = false;
    DtChk = false;
    ChkProcess = true;
    ChkBuyer = true;
    ChkDCNo = true;
    ChkComp = false;
    ddlmain();
    LoadMaingrid();
}
function RCMainlist() {
    $('#tblmaindetails').DataTable().destroy();
    ChkRcptno = false;
    ChkOrdno = false;
    DtChk = false;
    ChkProcess = true;
    ChkBuyer = false;
    ChkDCNo = false;
    ChkComp = false;
    ddlmain();
    LoadMaingrid();
}
function DCMainlist() {
    $('#tblmaindetails').DataTable().destroy();
    ChkRcptno = true;
    ChkOrdno = false;
    DtChk = false;
    ChkProcess = true;
    ChkBuyer = false;
    ChkDCNo = false;
    ChkComp = false;
    ddlmain();
    LoadMaingrid();
}
function BMainlist() {
    $('#tblmaindetails').DataTable().destroy();
    ChkRcptno = true;
    ChkOrdno = true;
    DtChk = false;
    ChkProcess = true;
    ChkBuyer = false;
    ChkDCNo = true;
    ChkComp = false;
    ChkOrdno = true;
    LoadWorkdivisionDDL("#ddlwrkdivision");
    LoadSupplierDDL("#ddlprocessor");
    LoadMaingridord();
    ddlmain();
    LoadMaingrid();
   
}

function TotMainlist() {
    $('#tblmaindetails').DataTable().destroy();   

    //$('#ddlMreceptno').empty();
    //$('#ddlMDCNo').empty();
    ////$('#ddlMCompany').empty();
    //$('#ddlMProcess').empty();
    ////$('#ddlMunit').empty();
    //$('#ddlMBuyer').empty();
    ChkRcptno = true;
    ChkOrdno = true;
    DtChk = false;
    ChkProcess = true;
    ChkBuyer = true;
    ChkDCNo = true;
    ChkComp = true;
    ChkOrdno = true;
    LoadMaingridord();
    ddlmain();
    LoadMaingrid();
    
}
function getbyID(masid) {
    debugger;
    Masid = masid;
    //Produ
    //var type = $('select#ddlMType option:selected').val();

    //if (type == undefined) {
    //    type = "";
    //}
    var proctype = $('input[name="mainproctype"]:checked').attr('value');

    var type = $('input[name="MoType"]:checked').attr('value');

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
    CompanyId = CompId;
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
    var Processorid = 0;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    $.ajax({
        url: "/ProductionReturn/LoadMaingriddet",
        data: JSON.stringify({ cmpid: CompId, processid: process, unitid: Unit, buyerid: buyer, masid: mas, prodordid: prid, processortype: proctype, type: type, dcno: DCNo, recptno: RecNo, fromDate: FDate, todate: TDate }),
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

            $('#txtReceiptDate').val(moment(obj[0].prod_recpt_date).format("DD/MM/YYYY"));
            $('#txtRefDate').val(moment(obj[0].Recpt_Ref_date).format("DD/MM/YYYY"));
            $('#txtUnit').val(obj[0].unit);
            $('#txtProcess').val(obj[0].process);
            $('#txtProcessor').val(obj[0].supplier);
            $('#txtRefNo').val(obj[0].Recpt_Ref_no);
            $('#txtRemark').val(obj[0].remarks);
            $('#txtReceiptno').val(obj[0].prod_recpt_no);

            var pdn = obj[0].prod_recpt_no;


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


            if (obj[0]["Storetype"] == 'SS') {
                $('#optSS').prop('checked', true);
                LoadSubStore();
                editsubmasunitstore = obj[0]["ParentUnitid"];
                editsubstore = obj[0]["StoreUnitID"];
                editmasunitstore = 0;
            }
            else {
                $('#optMS').prop('checked', true);
                LoadMainStore();
                editmasunitstore = obj[0]["StoreUnitID"];
                editsubmasunitstore = 0;
                editsubstore = 0;
            }
            LoadEmployeeStoreunit();
            LoadUserCompanyDDL();


            //CompanyId = obj[0].cmpid;
            //ProductionOrderno = obj[0].prodnord;
            //Companyunitid = obj[0].cmpunitid;

            //Processid = obj[0].processid;
            //Processorid = obj[0].processorid;
            LoadEditInputItm(masid, pdn);
            //LoadEditInputJobdet(masid);
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadEditInputItm(masid, pdn) {
    debugger;

    $.ajax({
        url: "/ProductionReturn/LoadEditItmDet",
        data: JSON.stringify({ masid: masid, prodord: pdn }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;

            ItmList = result.Value;

            LoadItmtab(ItmList);

        }

    });
}

function getDeleteID(masid) {
    debugger;
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
    var Processorid = 0;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    $.ajax({
        url: "/ProductionReturn/LoadMaingriddet",
        data: JSON.stringify({ cmpid: CompId, processid: process, unitid: Unit, buyerid: buyer, masid: mas, prodordid: prid, processortype: proctype, type: type, dcno: DCNo, recptno: RecNo, fromDate: FDate, todate: TDate, Processorid: Processorid }),
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

            $('#txtReceiptDate').val(moment(obj[0].prod_recpt_date).format("DD/MM/YYYY"));
            $('#txtRefDate').val(moment(obj[0].Recpt_Ref_date).format("DD/MM/YYYY"));
            $('#txtUnit').val(obj[0].unit);
            $('#txtProcess').val(obj[0].process);
            $('#txtProcessor').val(obj[0].supplier);
            $('#txtRefNo').val(obj[0].Recpt_Ref_no);
            $('#txtRemark').val(obj[0].remarks);
            $('#txtReceiptno').val(obj[0].prod_recpt_no);

            var pdn = obj[0].prod_recpt_no;
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
            LoadEditInputItm(masid, pdn);
            //LoadEditInputJobdet(masid);
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function Update() {
    debugger;
    $.each(ItmList, function () {

        this.Production_Recpt_masid = Masid;


    });


    var opchk = [];

    for (var y = 0; y < ItmList.length; y++) {
        if (ItmList[y].retqty > 0) {
            opchk.push(ItmList[y]);
        }
    }

    if (opchk.length == 0) {
        //alert('Please fill atleast any one qty...');
        var msg = 'Please fill atleast any one quantity...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        return true;
    }


    var res = validate();
    if (res == false) {
        return false;
    }

    var MSType = $('input[name="MSType"]:checked').attr('value');

    var storeunitid = 0;
    if (MSType == "S") {
        storeunitid = $('#ddlSMainStore').val();
    } else if (MSType == "M") {
        storeunitid = $('#ddlMSMMainStore').val();
    }
    var ordtype = $('input[name="Revert"]:checked').attr('value');
    var ObjAdd = {
        prod_recpt_masid: Masid,
        prod_recpt_no: $("#txtReceiptno").val(),
        prod_recpt_date: $("#txtReceiptDate").val(),//new Date($('#txtReceiptDate').val()),
        Recpt_Ref_date: $("#txtRefDate").val(),//new Date($('#txtRefDate').val()),
        Recpt_Ref_no: $("#txtRefNo").val(),
        remarks: $("#txtRemark").val(),
        OrderType: ordtype,
       // StoreUnitID: $("#ddlMSMMainStore").val(),
        StoreUnitID: storeunitid,
        CreatedBy: Guserid,
        InwardNo: '',
        SupplierInvoiceNo: '',
        ExcldetoInv: 0,
        InspDate: $("#txtReceiptDate").val(),//new Date($('#txtReceiptDate').val()),//
        //InspNo: 'S',
        EWayDate: $("#txtReceiptDate").val(),//new Date($('#txtReceiptDate').val()),
        //EWayNo: 'O',       
        ProdRetItmDet: ItmList

    }
    LoadingSymb();
    $.ajax({
        url: "/ProductionReturn/Update",
        data: JSON.stringify(ObjAdd),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Value == true) {
                AddUserEntryLog('Production', 'Sewing Return', 'UPDATE', $("#txtReceiptno").val());
                //alert('Data Updated Successfully');
                //window.location.href = "/ProductionReturn/ProductionReturnIndex";
                var msg = 'Data Updated Successfully...';
                var flg = 1;
                var mod = 0;
                var ur = "/ProductionReturn/ProductionReturnIndex";
                AlartMessage(msg, flg, mod, ur);
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
function MasDelete() {
    debugger;
    $.each(ItmList, function () {

        this.Production_Recpt_masid = Masid;


    });
    var res = validate();
    if (res == false) {
        return false;
    }
    var ordtype = $('input[name="Revert"]:checked').attr('value');
    var ObjAdd = {
        prod_recpt_masid: Masid,
        prod_recpt_no: $("#txtReceiptno").val(),
        prod_recpt_date: $("#txtReceiptDate").val(),//new Date($('#txtReceiptDate').val()),
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
        ProdRetItmDet: ItmList

    }
    LoadingSymb();
    $.ajax({
        url: "/ProductionReturn/Delete",
        data: JSON.stringify(ObjAdd),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Value == true) {
                AddUserEntryLog('Production', 'Sewing Return', 'DELETE', $("#txtReceiptno").val());
                //alert('Data Deleted Successfully');
                window.location.href = "/ProductionReturn/ProductionReturnIndex";
                var msg = 'Data Deleted Successfully...';
                var flg = 2;
                var mod = 0;
                var ur = "/ProductionReturn/ProductionReturnIndex";
                AlartMessage(msg, flg, mod, ur);
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



function ProdRetPrint(Id) {
    debugger;
    Repid = Id;
    $('#myModal2').modal('show');

    docname = "PROCESS RETURN";
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
    window.open("../ReportInline/Production/ProdReturnReportInline/ProdReturnReportInline.aspx?ProdRecptId=" + Repid + "&RetlossDet=" + p[0] + "&Ins=" + p[1] + "&Ewaybill=" + p[2] + "&Ewaydate=" + p[3] + "&Companyid=" + compid);


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

            if (editsubmasunitstore > 0) {
                $('#ddlSCompany').val(editsubmasunitstore).trigger('change');
            }
            if (editmasunitstore > 0) {
                $('#ddlMSMMainStore').val(editmasunitstore).trigger('change');
            }
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
            if (editsubstore > 0) {
                $('#ddlSMainStore').val(editsubstore).trigger('change');
            }
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
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
    }
}

function onUserCompanyFailure(result) {

    //alert('Company loading failed');
    var msg = 'Company loading failed...';
    var flg = 4;
    var mod = 1;
    var ur = "";
    AlartMessage(msg, flg, mod, ur);
}

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
        ]
    });


    $("#tblItemMovementdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblItemMovementdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}