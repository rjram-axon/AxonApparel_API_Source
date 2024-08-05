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
var CanMasId = 0;
var DCompid = 0;
var ChkRecpt = true;
var ChkProcess = true;
var DtChk = false;
var ChkDCNo = true;
var ChkUnit = true;
var ChkComp = false;
var LoginUserid = '';
var editmasunitstore = 0;
var editsubmasunitstore = 0;
var editsubstore = 0;
var ValidateProcessStore = "False";
$(document).ready(function () {
    debugger;
    Guserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    MainFDate = $("#hdMainFromDate").data('value');
    DCompid = $("#hdnDCompid").data('value');
    LoginUserid = $("#hdnLoginUserid").data('value');
    ValidateProcessStore = $("#hdnValidateProcessStore").data('value');
    LoadCompanyDDL("#ddlCompany,#ddlMCompany");
    LoadCompanyUnitDDL("#ddlUnit");
    //LoadBuyerDDL("#ddlBuyer");
    LoadColorDDL("#ddlColor");
    LoadWorkdivisionDDL("#ddlwrkdiv");
    LoadProcessor();
    getDate();
    //  ddlmain();
    var fill = localStorage.getItem('GeneralProcessReturnMainFilter');
    if (fill != "null" && fill != null) {
        LoadMaingridFromBack();
    } else {
        LoadMaingrid();
    }

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
    $('#tblcompdetails').on('click', 'tr', function (e) {
        debugger;

        $('#txtRefNo').val('');
        $('#txtCancelrefNo').val('');
        $('#txtRemark').val('');

        var table = $('#tblcompdetails').DataTable();

        //var ItmId = table.row($(this).parents('tr')).data()["itmid"];
        //var ClrId = table.row($(this).parents('tr')).data()["clrid"];
        //var SzId = table.row($(this).parents('tr')).data()["sizeid"];
        //var jobno = table.row($(this).parents('tr')).data()["jobordno"];


        var row = $(this).closest('tr');
        var data = $('#tblcompdetails').dataTable().fnGetData(row);


        var prodord = data.prodord;


        var ccomp = $('#ddlCompany').val();


        var ccompunit = $('#ddlUnit').val();
        var cprocess = $('#ddlProcess').val();


        if (ccomp == 0) {
            //alert('Select Company');
            var msg = "Please Select Company...";
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return true;
        }

        if (ccompunit == 0) {
            //alert('Select CompanyUnit');
            var msg = "Please Select CompanyUnit...";
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return true;
        }
        if (cprocess == 0) {
            //alert('Select Process');
            var msg = "Please Select Process...";
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
                var msg = "Please Select Supplier...";
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
                var msg = "Please Select WorkDivision...";
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

        editmasunitstore = 0;
        editsubmasunitstore = 0;
        editsubstore = 0;
        LoadEmployeeStoreunit();
        LoadUserCompanyDDL();

        GenerateNumber();
        GenerateCancelNumber();
        $('#myModal').modal('hide');
        //$('#myModal1').show();
        $('#myModal1').modal('show');
        $('#btnUpdate').hide();
        $('#btnDel').hide();
        $('#btnAdd').show();
        //$('#txtOrderNo').val(ordno);
        $('#txtProcess').val(process);
        $('#txtUnit').val(unit);
        $('#txtProcessor').val(supp);


        compid = CompanyId;
        suppid = Processorid;
        processid = Processid;

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
        LoadOpItm(prodord);
    });
    $(document).on('keyup', '.calcRetqty', function () {
        debugger;

        var table = $('#tblitmdetails').DataTable();
        var CSno = table.row($(this).parents('tr')).data()["procjobdetid"];
        var Bal = table.row($(this).parents('tr')).data()["bal"];
        var val = $(this).val();


        if (val > Bal) {
            //alert("Return Qty should not greater then BalQty..")
            var msg = "Return quantity should not greater then Balance quantity...";
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            $.each(ItmList, function () {
                if (this.procjobdetid == CSno) {
                    this.retqty = 0;

                }
            });
            // LoadItmtab(ItmList);

            var table = $('#tblitmdetails').DataTable();
            var ecdata = table.rows().data();

            $('input[id=txtretqty]').each(function (ig) {
                var slno = ecdata[ig].procjobdetid;
                var row = $(this).closest('tr');
                for (var h = 0; h < ItmList.length; h++) {
                    if (CSno == ItmList[h].procjobdetid) {
                        var retqty = ItmList[h].retqty;
                        row.find('#txtretqty').val(retqty);

                    }
                }

            });

            return true;
        }

        $.each(ItmList, function () {
            if (this.procjobdetid == CSno) {
                this.retqty = val;

            }
        });

      //  LoadItmtab(ItmList);

        var totalqt = 0;
        for (var e = 0; e < ItmList.length; e++) {
            var amount = ItmList[e].retqty;
            totalqt = totalqt + parseFloat(amount);

        }
        $('#txtTotRetQty').val(totalqt.toFixed(3));

        //Datatable textbox focus
        //var rows = $("#tblitmdetails").dataTable().fnGetNodes();
        //var dtTable = $('#tblitmdetails').DataTable();
        //for (var i = 0; i < rows.length; i++) {
        //    var sn = dtTable.cells({ row: i, column: 1 }).data()[0];
        //    $('input[id=txtretqty]').each(function () {
        //        if (sn == CSno) {
        //            var row = $(this).closest('tr');
        //            var num = row.find('#txtretqty').val();
        //            row.find('#txtretqty').focus().val('').val(num);
        //            return true;
        //        }
        //    });
        //}

        var table = $('#tblitmdetails').DataTable();
        var ecdata = table.rows().data();

        $('input[id=txtretqty]').each(function (ig) {
            var slno = ecdata[ig].procjobdetid;
            var row = $(this).closest('tr');
            for (var h = 0; h < ItmList.length; h++) {
                if (CSno == ItmList[h].procjobdetid && CSno == slno) {
                    var retqty = ItmList[h].retqty;
                    row.find('#txtretqty').focus().val('').val(retqty);

                }
            }

        });


    });



    $(document).on('keyup', '.calccancelqty', function (e) {
        debugger;

        var table = $('#tblitmdetails').DataTable();
        var CSno = table.row($(this).parents('tr')).data()["procjobdetid"];
        var retqty = table.row($(this).parents('tr')).data()["retqty"];

        var val = $(this).val();

        //var val = $(this).closest('tr').find('#txtcancelqty').val();

        //if (parseFloat(val).toFixed(3) != parseFloat(retqty).toFixed(3)) {
        //    alert('Should be equal to Return Qty...');
        //    $.each(ItmList, function () {
        //        if (this.procjobdetid == CSno) {
        //            this.cancelqty = 0;

        //        }
        //    });
        //    LoadItmtab(ItmList);

        //    //Datatable textbox focus
        //    var rows = $("#tblitmdetails").dataTable().fnGetNodes();
        //    var dtTable = $('#tblitmdetails').DataTable();
        //    for (var i = 0; i < rows.length; i++) {
        //        var sn = dtTable.cells({ row: i, column: 1 }).data()[0];
        //        $('input[id=txtcancelqty]').each(function () {
        //            if (sn == CSno && $(this).val() == val) {
        //                var row = $(this).closest('tr');
        //                var num = row.find('#txtcancelqty').val();
        //                row.find('#txtcancelqty').focus().val('').val(num);
        //                return true;
        //            }
        //        });
        //    }

        //    return true;
        //}





        $.each(ItmList, function () {
            if (this.procjobdetid == CSno) {
                this.cancelqty = val;

            }
        });


        var tot = 0;
        for (var d = 0; d < ItmList.length; d++) {
            if (ItmList[d].procjobdetid == CSno) {
                var at = ItmList[d].cancelqty;
                tot = tot + parseFloat(at);
            }
        }

        var rtot = 0;
        for (var d = 0; d < ItmList.length; d++) {
            if (ItmList[d].procjobdetid == CSno) {
                var rat = ItmList[d].retqty;
                rtot = rtot + parseFloat(rat);
            }
        }


        if (tot > rtot) {
            //alert('Should not exceed Return Qty in Input table');
            var msg = "Should not exceed Return quantity in Input table...";
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            $.each(ItmList, function () {
                if (this.procjobdetid == CSno) {
                    this.cancelqty = 0;

                }
            });
            // LoadItmtab(ItmList);

            var table = $('#tblitmdetails').DataTable();
            var ecdata = table.rows().data();

            $('input[id=txtcancelqty]').each(function (ig) {
                var slno = ecdata[ig].procjobdetid;
                var row = $(this).closest('tr');
                for (var h = 0; h < ItmList.length; h++) {
                    if (slno == ItmList[h].procjobdetid) {
                        var cancelqty = ItmList[h].cancelqty;
                        row.find('#txtcancelqty').val(cancelqty);

                    }
                }

            });

            var totalcqt = 0;
            for (var e = 0; e < ItmList.length; e++) {
                var camount = ItmList[e].cancelqty;
                totalcqt = totalcqt + parseFloat(camount);

            }
            $('#txtTotCanQty').val(totalcqt.toFixed(3));

            return true;
        }

        var totalcqt = 0;
        for (var e = 0; e < ItmList.length; e++) {
            var camount = ItmList[e].cancelqty;
            totalcqt = totalcqt + parseFloat(camount);

        }
        $('#txtTotCanQty').val(totalcqt.toFixed(3));

    });


    $(document).on('keyup', '.calcopcancelqty', function (e) {
        debugger;

        var table = $('#tblopitmdetails').DataTable();
        var CSno = table.row($(this).parents('tr')).data()["procjobdetid"];
        var retqty = table.row($(this).parents('tr')).data()["retqty"];
        var Bal = table.row($(this).parents('tr')).data()["bal"];

        var val = $(this).val();


        if (val > Bal) {
            //alert("Cancel Qty should not greater then BalQty..")
            var msg = "Cancel quantity should not greater then Balance quantity...";
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            $.each(OPItmList, function () {
                if (this.procjobdetid == CSno) {
                    this.cancelqty = 0;

                }
            });
            // LoadItmtab(ItmList);

            var table = $('#tblopitmdetails').DataTable();
            var ecdata = table.rows().data();

            $('input[id=txtopcancelqty]').each(function (ig) {
                var slno = ecdata[ig].procjobdetid;
                var row = $(this).closest('tr');
                for (var h = 0; h < OPItmList.length; h++) {
                    if (slno == OPItmList[h].procjobdetid) {
                        var retqty = OPItmList[h].cancelqty;
                        row.find('#txtopcancelqty').val(retqty);

                    }
                }

            });

            var totalqt = 0;
            for (var e = 0; e < OPItmList.length; e++) {
                var amount = OPItmList[e].cancelqty;
                totalqt = totalqt + parseFloat(amount);

            }
            $('#txtTotOutCanQty').val(totalqt.toFixed(3));
            return true;
        }


        $.each(OPItmList, function () {
            if (this.procjobdetid == CSno) {
                this.cancelqty = val;

            }
        });

        var totalcqt = 0;
        for (var e = 0; e < OPItmList.length; e++) {
            var camount = OPItmList[e].cancelqty;
            totalcqt = totalcqt + parseFloat(camount);

        }
        $('#txtTotOutCanQty').val(totalcqt.toFixed(3));


        //var TRetQty = $('#txtTotRetQty').val();
        //var TCanQty = $('#txtTotCanQty').val();

    });

    $(document).on('keyup', '.calcLossqty', function () {
        debugger;

        var table = $('#tblitmdetails').DataTable();
        var CSno = table.row($(this).parents('tr')).data()["procjobdetid"];

        var val = $(this).val();

        $.each(ItmList, function () {
            if (this.procjobdetid == CSno) {
                this.lossqty = val;

            }
        });

        LoadItmtab(ItmList);

        //Datatable textbox focus
        var rows = $("#tblitmdetails").dataTable().fnGetNodes();
        var dtTable = $('#tblitmdetails').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 1 }).data()[0];
            $('input[id=txtlossqty]').each(function () {
                if (sn == CSno) {
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


function GenerateNumber() {
    debugger;

    table = "Process_Recpt_Mas",
    column = "proc_recpt_no",
    compId = CompanyId,
    Docum = 'PROCESS RETURN'

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

function GenerateCancelNumber() {
    debugger;

    table = "Process_Cancel_mas",
    column = "process_Cancel_no",
    compId = CompanyId,
    Docum = 'PROCESS CANCEL'

    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $('#txtCancelno').val(result.Value);
        }
    });
}

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
    $('#txtCancelDate').val(Fdatestring);
    $('#txtCancelRefDate').val(Fdatestring);

}
function ClearTextbox() {
    debugger;
    //$('#ddlCompany').val("0");
    //$('#ddlUnit').val("0");
    //$('#ddlColor').val("0");
    //$('#ddlProcess').val("0");
    //$('#ddlwrkdiv').val("0");
    //$('#ddlBuyer').val("0");
    //$('#ddlProcess').val("0");
    //$('#ddlSupplier').val("0");
    //$('#ddlOrderNo').val("0");
    //$('#ddlIssueNo').val("0");
    //$('#ddlRefNo').val("0");
    //$('#ddlinnerbuyer').val("0");
    LoadProcess();
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

function LoadProcessor() {
    debugger;

    $.ajax({
        url: "/GeneralProcessReturn/Getprocessor",
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
            LoadAddgrid();

        }

    });
}


function LoadProcess() {
    debugger;
    var cmpyid = $('select#ddlCompany option:selected').val();
    var cunitid = $('select#ddlUnit option:selected').val();
    if (cmpyid == 0) {
        //alert('Please select Company...');
        var msg = "Please select Company...";
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }
    if (cunitid == 0) {
        //alert('Please select CompanyUnit...');
        var msg = "Please select CompanyUnit...";
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }
    $.ajax({
        url: "/GeneralProcessReturn/Getprocess",
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

function LoadAddgrid() {
    debugger;
    var cmpyid = $('select#ddlCompany option:selected').val();
    var cunitid = $('select#ddlUnit option:selected').val();
    if (cmpyid == 0) {
        //alert('Please select Company...');
        var msg = "Please select Company...";
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }
    if (cunitid == 0) {
        //alert('Please select CompanyUnit...');
        var msg = "Please select CompanyUnit...";
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }
    var proid = $('select#ddlProcess option:selected').val();
    var protype = $('input[name="optwrkord"]:checked').attr('value');
    var type = 'W';// $('input[name="Revert"]:checked').attr('value');
    if (protype = 'P') {
        var procrid = $('select#ddlSupplier option:selected').val();
    }
    else if (protype = 'W') {
        var procrid = $('select#ddlwrkdiv option:selected').val();
    }
    //if (procrid == 0) {
    //    alert('Please select Processor...');
    //    return true;
    //}
    var cl = 'N';
    $.ajax({
        url: "/GeneralProcessReturn/Loadaddgrid",
        data: JSON.stringify({ cmpid: cmpyid, cmpunitid: cunitid, processid: proid, processorid: procrid, ordtype: type, clsed: cl }),
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
                   { title: "Prodid", data: "procordid", "visible": false },
                   { title: "P.ord.No", data: "prodord" },
                   { title: "P.Date", data: "procdate" },
                   { title: "Processor", data: "processor" },
                   { title: "Ord Qty", data: "orderqty" },
                   { title: "Issued", data: "issued" },
                   { title: "Balance", data: "bal" },
                   {
                       title: "Group", data: "procordid",
                       render: function (data) {

                           return '<button type="button" class="btnSelect btn btn_round btn-success" data-toggle="tooltip" data-placement="top" title="Add" style="width: 20px;padding:0px;height:20px;border-radius:10px;" >  <i class="fa fa-plus"></i> </button>';
                       }
                   },

        ]

    });
}


function LoadItm(prodord) {
    debugger;

    $.ajax({
        url: "/GeneralProcessReturn/LoadItmDet",
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
                   { title: "Prodordid", data: "procordid", "visible": false },
                    { title: "ProdJobdetid", data: "procjobdetid", "visible": false },
                    { title: "Itmid", data: "itmid", "visible": false },
                   { title: "Colorid", data: "colorid", "visible": false },
                   { title: "Sizeid", data: "sizeid", "visible": false },

                   { title: "Job Ord No", data: "jobordno", "visible": false },
                   { title: "Prog.No", data: "prodprgno", "visible": false },
                   { title: "Proc No", data: "processord" },

                    { title: "Item", data: "itm" },
                   { title: "Category I", data: "color" },
                   { title: "Category II", data: "size" },
                     { title: "Bal Qty", data: "bal" },
                   {
                       title: "Return Qty", data: "retqty",
                       render: function (data) {

                           return '<input type="text" id="txtretqty" class="calcRetqty form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';

                       },
                   },
                   {
                       title: "Loss Qty", data: "lossqty",
                       render: function (data) {

                           return '<input type="text" id="txtlossqty" class="calcLossqty form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';

                       },
                   },
                   {
                       title: "Cancel Qty", data: "cancelqty",
                       render: function (data) {

                           return '<input type="text" id="txtcancelqty" class="calccancelqty form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                       },
                   },
                     {
                         title: "Sec Qty", data: "secqty",
                         render: function (data) {

                             return '<input type="text" id="txtsecqty" class="calcsecqty form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                         },
                     },

        ]

    });

    var totalqt = 0;
    for (var e = 0; e < ItmList.length; e++) {
        var amount = ItmList[e].retqty;
        totalqt = totalqt + parseFloat(amount);

    }
    $('#txtTotRetQty').val(totalqt.toFixed(3));


    var totalcqt = 0;
    for (var e = 0; e < ItmList.length; e++) {
        var camount = ItmList[e].cancelqty;
        totalcqt = totalcqt + parseFloat(camount);

    }
    $('#txtTotCanQty').val(totalcqt.toFixed(3));


    var TRetQty = $('#txtTotRetQty').val();
    var TCanQty = $('#txtTotCanQty').val();

    //if (TCanQty != TRetQty) {
    //    alert("Cancel and Return Qty Should be Equal..");
    //    return true;
    //}


    var table = $('#tblitmdetails').DataTable();
    $("#tblitmdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblitmdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}


$(document).ready(function () {
    $("#tblitmdetails ").dataTable().find("tbody").on('click', 'tr', function () {
        index = (this.rowIndex) - 1;
    });
});
function calcRetqty(val) {
    debugger;
    var table = $('#tblitmdetails').DataTable();
    var CSno = table.row($(this).parents('tr')).data()["procjobdetid"];
    var Bal = table.row($(this).parents('tr')).data()["bal"];

    var val = $(this).val();

    if (val > Bal) {
        //alert("Return Qty should not greater then BalQty..")
        var msg = "Return quantity should not greater then Balance quantity...";
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        $.each(ItmList, function () {
            if (this.procjobdetid == CSno) {
                this.retqty = 0;

            }
        });
        // LoadItmtab(ItmList);

        var table = $('#tblitmdetails').DataTable();
        var ecdata = table.rows().data();

        $('input[id=txtretqty]').each(function (ig) {
            var slno = ecdata[ig].procjobdetid;
            var row = $(this).closest('tr');
            for (var h = 0; h < ItmList.length; h++) {
                if (slno == ItmList[h].procjobdetid) {
                    var retqty = ItmList[h].retqty;
                    row.find('#txtretqty').val(retqty);

                }
            }

        });

        var totalqt = 0;
        for (var e = 0; e < ItmList.length; e++) {
            var amount = ItmList[e].retqty;
            totalqt = totalqt + parseFloat(amount);

        }
        $('#txtTotRetQty').val(totalqt.toFixed(3));
        return true;
    }

    $.each(ItmList, function () {
        if (this.procjobdetid == CSno) {
            this.retqty = val;

        }
    });

    var totalqt = 0;
    for (var e = 0; e < ItmList.length; e++) {
        var amount = ItmList[e].retqty;
        totalqt = totalqt + parseFloat(amount);

    }
    $('#txtTotRetQty').val(totalqt.toFixed(3));
}

function backtomain() {
    $('#myModal1').hide();
    $('#myModal1').modal('hide');
    $('#myModal').hide();
    $('#myModal').modal('hide');
}


function save() {
    debugger;
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
    if (storeunitid == 0 && ValidateProcessStore == "True") {
        //alert('Please select Store..');
        var msg = "Please select Store...";
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    var ordtype = $('input[name="Revert"]:checked').attr('value');

    var oldrtno = $("#txtReceiptno").val();

    table = "Process_Recpt_Mas",
    column = "proc_recpt_no",
    compId = CompanyId,
    Docum = 'PROCESS RETURN'

    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var newrtno = result.Value;
            if (oldrtno != newrtno) {
                var msg = "Return Number has been changed...";
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                //alert('Return No has been changed...');
                $('#txtReceiptno').val(result.Value);
            }

            var ObjAdd = {
                // prod_recpt_masid:
                proc_recpt_no: $("#txtReceiptno").val(),
                proc_recpt_date: $("#txtReceiptDate").val(),//new Date($('#txtReceiptDate').val()),
                Recpt_Ref_date: $("#txtRefDate").val(),//new Date($('#txtRefDate').val()),
                Recpt_Ref_no: $("#txtRefNo").val(),
                remarks: $("#txtRemark").val(),
                OrderType: 'G',
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
                ProcRetItmDet: ItmList

            }
            $("#btnAdd").attr("disabled", true);
            LoadingSymb();
            $.ajax({
                url: "/GeneralProcessReturn/Add",
                data: JSON.stringify(ObjAdd),
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {
                    debugger;
                    if (result.Value == true) {
                        cancelsave();
                        AddUserEntryLog('PROCESS', 'General Process Return', 'ADD', $("#txtReceiptno").val());
                        //alert('Data Saved Successfully');
                        $("#btnAdd").attr("disabled", false);
                        //window.location.href = "/GeneralProcessReturn/GeneralProcessReturnIndex";
                        var msg = "Data Saved Successfully...";
                        var flg = 1;
                        var mod = 0;
                        var url = "/GeneralProcessReturn/GeneralProcessReturnIndex";
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
    //    // $('#ddlMSMMainStore').css('border-color', 'Red');
    //    $('#ddlMSMMainStore').siblings(".select2-container").css('border', '1px solid red');
    //    isValid = false;
    //}
    //else {
    //    //$('#ddlMSMMainStore').css('border-color', 'lightgrey');
    //    $('#ddlMSMMainStore').siblings(".select2-container").css('border', '1px solid lightgrey');
    //}
    //if ($('#ddlMSCompany').val() == 0) {
    //    // $('#ddlMSCompany').css('border-color', 'Red');
    //    $('#ddlMSCompany').siblings(".select2-container").css('border', '1px solid red');
    //    isValid = false;
    //}
    //else {
    //    //$('#ddlMSCompany').css('border-color', 'lightgrey');
    //    $('#ddlMSCompany').siblings(".select2-container").css('border', '1px solid lightgrey');
    //}

    return isValid;
}



function LoadMaingrid() {
    debugger;

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

    if (RNo == 0 || RNo == undefined) {
        RecNo = "";
    }
    else {

        RecNo = $('select#ddlMreceptno option:selected').val();
    }


    var DCNo = "";
    var DNo = $('select#ddlMDCNo option:selected').val();

    if (DNo == 0 || DNo == undefined) {
        DCNo = "";
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
    var buyer = $('#ddlMBuyer').val();
    if (buyer == null || buyer == "0") {
        buyer = 0;
    }
    var mas = 0;
    var prid = 0;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    if (ChkComp) {
        RecNo = "";
        DCNo = "";
        Unit = 0;
        process = 0;
        buyer = 0;
    }

    var menufilter = CompId + ',' + process + ',' + Unit + ',' + buyer + ',' + mas + ',' + prid + ',' + proctype + ',' + type + ',' + DCNo + ',' + RecNo + ',' + FDate + ',' + TDate;
    localStorage.setItem('GeneralProcessReturnMainFilter', menufilter);


    $.ajax({
        url: "/GeneralProcessReturn/LoadMaingrid",
        data: JSON.stringify({ cmpid: CompId, processid: process, unitid: Unit, buyerid: buyer, masid: mas, prodordid: prid, processortype: proctype, type: type, dcno: DCNo, recptno: RecNo, fromDate: FDate, todate: TDate }),
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
                         { title: "ProcessRecptid", "visible": false },
                         { title: "Receipt No" },
                         { title: "Receipt Date" },
                         { title: "Unit" },
                         { title: "Process" },
                         {
                             title: "DC No",//data:"Recpt_Ref_no",
                             //render: function () {
                             //    return '<input type="text" id="txtReqQty" class="editor-active"  style="width: 50px;text-align: center;" value=' + dataSet[0][5] + ' >';
                             //},
                         },
                         { title: "Type", "visible": false },
                          { title: "Processor" },
                          { title: "Action" },


                ]

            });

            ddlmain();
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


function LoadMaingridFromBack() {
    debugger;


    var fill = localStorage.getItem('GeneralProcessReturnMainFilter');
    var fillobj = [];
    fillobj = fill.split(",");

    $('#txtFromDate').val(fillobj[10]);
    $('#txtToDate').val(fillobj[11]);

    if (fillobj[6] == 'P') {
        $('#MP').prop('checked', true);
    } else {
        $('#MW').prop('checked', true);
    }

    var proctype = $('input[name="proctype"]:checked').attr('value');

    if (proctype == 'P') {

        $('#MP').show();
        $("#MW").hide();
    }
    else if (proctype == 'W') {
        $('#MP').hide();
        $("#MW").show();
    }

    if (fillobj[8] == "undefined") {
        fillobj[8] = '';
    }
    if (fillobj[9] == "undefined") {
        fillobj[9] = '';
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
  

    if (ChkComp) {
        RecNo = "";
        DCNo = "";
        Unit = 0;
        process = 0;
        buyer = 0;
    }

    $.ajax({
        url: "/GeneralProcessReturn/LoadMaingrid",
        data: JSON.stringify({ cmpid: fillobj[0], processid: fillobj[1], unitid: fillobj[2], buyerid: fillobj[3], masid: fillobj[4], prodordid: fillobj[5], processortype: fillobj[6], type: fillobj[7], dcno: fillobj[8], recptno: fillobj[9], fromDate: fillobj[10], todate: fillobj[11] }),
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
                         { title: "ProcessRecptid", "visible": false },
                         { title: "Receipt No" },
                         { title: "Receipt Date" },
                         { title: "Unit" },
                         { title: "Process" },
                         {
                             title: "DC No",//data:"Recpt_Ref_no",
                             //render: function () {
                             //    return '<input type="text" id="txtReqQty" class="editor-active"  style="width: 50px;text-align: center;" value=' + dataSet[0][5] + ' >';
                             //},
                         },
                         { title: "Type", "visible": false },
                          { title: "Processor" },
                          { title: "Action" },


                ]

            });

            ddlmain();
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
        url: "/GeneralProcessReturn/LoadMaingriddet",
        data: JSON.stringify({ cmpid: CompId, processid: process, unitid: Unit, buyerid: buyer, masid: mas, prodordid: prid, processortype: proctype, type: type, dcno: DCNo, recptno: RecNo, fromDate: FDate, todate: TDate }),
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
                });


                //$('#ddlMreceptno').empty();
                //$('#ddlMDCNo').empty();
                //$('#ddlMCompany').empty();
                //$('#ddlMProcess').empty();
                //$('#ddlMunit').empty();
                //$('#ddlMBuyer').empty();
                if (ChkRecpt || ChkComp || DtChk) {
                    $('#ddlMreceptno').empty();
                    $(ddlMreceptno).append($('<option/>').val('0').text('--Select ReceiptNo--'));
                    $.each(recpt, function () {
                        $(ddlMreceptno).append($('<option></option>').text(this.proc_recpt_no));
                    });
                }
                if (ChkDCNo || ChkComp || DtChk) {
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
                if (ChkProcess || ChkComp || DtChk) {
                    $('#ddlMProcess').empty();
                    $(ddlMProcess).append($('<option/>').val('0').text('--Select Processs--'));
                    $.each(proc, function () {
                        $(ddlMProcess).append($('<option></option>').val(this.processid).text(this.process));
                    });
                }
                if (ChkUnit || ChkComp || DtChk) {
                    $('#ddlMunit').empty();
                    $(ddlMunit).append($('<option/>').val('0').text('--Select Unit--'));
                    $.each(unit, function () {
                        $(ddlMunit).append($('<option></option>').val(this.unitid).text(this.unit));
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
    ChkRecpt = true;
    ChkProcess = true;
    DtChk = false;
    ChkDCNo = true;
    ChkUnit = true;
    ChkComp = true;
    LoadMaingrid();
}
function PMainlist() {
    $('#tblmaindetails').DataTable().destroy();
    ChkRecpt = true;
    ChkProcess = false;
    DtChk = false;
    ChkDCNo = true;
    ChkUnit = false;
    ChkComp = false;
    LoadMaingrid();
}
function RCMainlist() {
    $('#tblmaindetails').DataTable().destroy();
    ChkRecpt = false;
    ChkProcess = false;
    DtChk = false;
    ChkDCNo = false;
    ChkUnit = false;
    ChkComp = false;
    LoadMaingrid();
}
function DCMainlist() {
    $('#tblmaindetails').DataTable().destroy();
    ChkRecpt = false;
    ChkProcess = false;
    DtChk = false;
    ChkDCNo = false;
    ChkUnit = false;
    ChkComp = false;
    LoadMaingrid();
}
function UMainlist() {
    $('#tblmaindetails').DataTable().destroy();
    ChkRecpt = true;
    ChkProcess = true;
    DtChk = false;
    ChkDCNo = true;
    ChkUnit = false;
    ChkComp = false;
    LoadMaingrid();
}


function getbyID(masid) {
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
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    $.ajax({
        url: "/GeneralProcessReturn/LoadMaingriddet",
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

            $('#txtReceiptDate').val(moment(obj[0].proc_recpt_date).format("DD/MM/YYYY"));
            $('#txtRefDate').val(moment(obj[0].Recpt_Ref_date).format("DD/MM/YYYY"));
            $('#txtUnit').val(obj[0].unit);
            $('#txtProcess').val(obj[0].process);
            $('#txtProcessor').val(obj[0].supplier);
            $('#txtRefNo').val(obj[0].Recpt_Ref_no);
            $('#txtRemark').val(obj[0].remarks);
            $('#txtReceiptno').val(obj[0].proc_recpt_no);


            $('#txtCancelno').val(obj[0].CancelNo);
            $('#txtCancelrefNo').val(obj[0].CancelRefNo);


            CanMasId = obj[0].CancelMasId;

            if (CanMasId > 0) {
                $('#txtCancelRefDate').val(moment(obj[0].CancelRefDate).format("DD/MM/YYYY"));//.val(obj[0].CancelRefDate);
                $('#txtCancelDate').val(moment(obj[0].Canceldate).format("DD/MM/YYYY"));//.val(obj[0].Canceldate);
            }
            var pdn = obj[0].proc_recpt_no;
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
            CompanyId = obj[0].companyid;

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


            //ProductionOrderno = obj[0].prodnord;
            //Companyunitid = obj[0].cmpunitid;

            //Processid = obj[0].processid;
            //Processorid = obj[0].processorid;
            //LoadEditInputItm(masid, pdn);
            //LoadEditInputJobdet(masid);

            CanMasId = obj[0].CancelMasId;
            LoadEditInputItm(masid, pdn);
            LoadEditOutItm(CanMasId);
            CheckAlloted();

            if (CanMasId == 0) {


                GenerateCancelNumber();
            }

        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
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


function LoadEditInputItm(masid, pdn) {
    debugger;

    $.ajax({
        url: "/GeneralProcessReturn/LoadEditItmDet",
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


function Update() {
    debugger;
    $.each(ItmList, function () {

        this.Process_Recpt_masid = Masid;


    });
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

    if (storeunitid == 0 && ValidateProcessStore == "True") {
        //alert('Please select Store..');
        var msg = "Please select Store...";
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    var ordtype = $('input[name="Revert"]:checked').attr('value');
    var ObjAdd = {
        proc_recpt_masid: Masid,
        proc_recpt_no: $("#txtReceiptno").val(),
        proc_recpt_date: $("#txtReceiptDate").val(),// new Date($('#txtReceiptDate').val()),
        Recpt_Ref_date: $("#txtRefDate").val(),//new Date($('#txtRefDate').val()),
        Recpt_Ref_no: $("#txtRefNo").val(),
        remarks: $("#txtRemark").val(),
        OrderType: 'G',
       // StoreUnitID: $("#ddlMSMMainStore").val(),
        StoreUnitID: storeunitid,
        CreatedBy: Guserid,
        InwardNo: '',
        SupplierInvoiceNo: '',
        ExcldetoInv: 0,
        InspDate: $("#txtReceiptDate").val(),//new Date($('#txtReceiptDate').val()),//
        //InspNo: 'S',
        EWayDate: $("#txtReceiptDate").val(),// new Date($('#txtReceiptDate').val()),
        //EWayNo: 'O',       
        ProcRetItmDet: ItmList

    }
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();

    $.ajax({
        url: "/GeneralProcessReturn/Update",
        data: JSON.stringify(ObjAdd),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Value == true) {
                cancelupdate();
                AddUserEntryLog('PROCESS', 'General Process Return', 'UPDATE', $("#txtReceiptno").val());
                //alert('Data Updated Successfully');
                $("#btnUpdate").attr("disabled", false);
                //window.location.href = "/GeneralProcessReturn/GeneralProcessReturnIndex";
                var msg = "Data Updated Successfully...";
                var flg = 1;
                var mod = 0;
                var url = "/GeneralProcessReturn/GeneralProcessReturnIndex";
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

function cancelupdate() {
    debugger;
    var res = cancelvalidate();
    if (res == false) {
        return false;
    }

    var detlist = [];
    var jobdetlist = [];
    for (var y = 0; y < ItmList.length; y++) {
        //if (ItmList[y].cancelqty > 0) {

        var obj = {
            ProcessOrdId: ItmList[y].procordid,
            itemid: ItmList[y].itmid,
            sizeid: ItmList[y].sizeid,
            colorid: ItmList[y].colorid,
            plansizeid: ItmList[y].plansizeid,
            Canceled_qty: ItmList[y].cancelqty,
            Sec_Qty: ItmList[y].secqty,
            InorOut: "I",


            Job_Ord_No: ItmList[y].jobordno,
            ProdPrgNo: ItmList[y].prodprgno,
            SequenceNo: ItmList[y].prodprgno,
            Cancel_Qty: ItmList[y].cancelqty,
            ProcessOrdDetid: ItmList[y].procorddetid,
            ProcessOrdJobDetid: ItmList[y].procjobdetid,
        }
        detlist.push(obj);
        // }
    }
    for (var m = 0; m < OPItmList.length; m++) {
        //if (OPItmList[m].cancelqty > 0) {

        var obj = {
            ProcessOrdId: OPItmList[m].procordid,
            itemid: OPItmList[m].itmid,
            sizeid: OPItmList[m].sizeid,
            plansizeid: OPItmList[m].plansizeid,
            colorid: OPItmList[m].colorid,
            Canceled_qty: OPItmList[m].cancelqty,
            Sec_Qty: OPItmList[m].secqty,
            InorOut: "O",

            Job_Ord_No: OPItmList[m].jobordno,
            ProdPrgNo: OPItmList[m].prodprgno,
            SequenceNo: OPItmList[m].prodprgno,
            Cancel_Qty: OPItmList[m].cancelqty,
            ProcessOrdDetid: OPItmList[m].procorddetid,
            ProcessOrdJobDetid: OPItmList[m].procjobdetid,
        }
        detlist.push(obj);
        //}
    }

    for (var b = 0; b < ItmList.length; b++) {
        //if (ItmList[b].cancelqty > 0) {

        var obj = {
            Job_Ord_No: ItmList[b].jobordno,
            ProdPrgNo: ItmList[b].prodprgno,
            SequenceNo: ItmList[b].prodprgno,
            Cancel_Qty: ItmList[b].cancelqty,
            ProcessOrdDetid: ItmList[b].procorddetid,
            ProcessOrdJobDetid: ItmList[b].procjobdetid,
            InorOut: "I",
            ItemId: ItmList[b].itmid,
            ColorId: ItmList[b].colorid,
            SizeId: ItmList[b].sizeid,
            plansizeid: ItmList[b].plansizeid,

        }
        jobdetlist.push(obj);
        //}
    }

    for (var e = 0; e < OPItmList.length; e++) {
        //if (OPItmList[e].cancelqty > 0) {

        var obj = {
            Job_Ord_No: OPItmList[e].jobordno,
            ProdPrgNo: OPItmList[e].prodprgno,
            SequenceNo: OPItmList[e].prodprgno,
            Cancel_Qty: OPItmList[e].cancelqty,
            ProcessOrdDetid: OPItmList[e].procorddetid,
            ProcessOrdJobDetid: OPItmList[e].procjobdetid,
            InorOut: "O",
            ItemId: OPItmList[e].itmid,
            ColorId: OPItmList[e].colorid,
            SizeId: OPItmList[e].sizeid,
            plansizeid: OPItmList[e].plansizeid,
        }
        jobdetlist.push(obj);
        //}
    }





    var ordtype = $('input[name="Revert"]:checked').attr('value');
    var ObjAdd = {
        Process_Cancel_masid: CanMasId,
        process_Cancel_no: $("#txtCancelno").val(),
        process_Cancel_date: $("#txtCancelDate").val(),//new Date($('#txtReceiptDate').val()),
        Cancel_Ref_date: $("#txtCancelRefDate").val(),//new Date($('#txtRefDate').val()),
        Cancel_Ref_no: $("#txtCancelrefNo").val(),
        Remarks: $("#txtRemark").val(),
        OrderType: ordtype,
        CancelOrClose: "C",
        CreatedBy: Guserid,
        ProcDet: detlist,
        ProcJobDet: jobdetlist,
        ProcObj: detlist,
        proc_recpt_masid: Masid,

    }
    LoadingSymb();
    $.ajax({
        url: "/ProcessReturn/CancelUpdate",
        data: JSON.stringify(ObjAdd),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Value == true) {

                //alert('Data Saved Successfully');


                //window.location.href = "/ProcessReturn/ProcessReturnIndex";

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
    $.ajax({
        url: "/GeneralProcessReturn/LoadMaingriddet",
        data: JSON.stringify({ cmpid: CompId, processid: process, unitid: Unit, buyerid: buyer, masid: mas, prodordid: prid, processortype: proctype, type: type, dcno: DCNo, recptno: RecNo, fromDate: FDate, todate: TDate }),
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

            $('#txtCancelno').val(obj[0].CancelNo);
            $('#txtCancelrefNo').val(obj[0].CancelRefNo);
            $('#txtCancelRefDate').val(moment(obj[0].CancelRefDate).format("DD/MM/YYYY"));//.val(obj[0].CancelRefDate);
            $('#txtCancelDate').val(moment(obj[0].Canceldate).format("DD/MM/YYYY"));//.val(obj[0].Canceldate);

            var pdn = obj[0].proc_recpt_no;
            var type = $('input[name="MSType"]:checked').attr('value');
            CompanyId = obj[0].companyid;
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

            //if (type == 'M') {
            //    LoadMainStore();
            //}
            //if (type == 'S') {
            //    LoadSubStore();
            //}
            //if (type == 'E') {
            //    LoadSecStore();
            //}
            //CompanyId = obj[0].cmpid;
            //ProductionOrderno = obj[0].prodnord;
            //Companyunitid = obj[0].cmpunitid;

            //Processid = obj[0].processid;
            //Processorid = obj[0].processorid;
            CanMasId = obj[0].CancelMasId;
            LoadEditInputItm(masid, pdn);
            LoadEditOutItm(CanMasId);
            CheckAlloted();
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadEditOutItm(masid) {
    debugger;

    $.ajax({
        url: "/ProcessReturn/LoadEditOutItmDet",
        data: JSON.stringify({ Process_Cancel_Masid: masid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;

            OPItmList = result.Value;
            LoadOpItmtab(OPItmList);

            //if (result.length > 0) {
            //    LoadOpItmtab(OPItmList);
            //}
            //else {
            //    for (var e = 0; e < ItmList.length; e++) {
            //        var processordno = ItmList[e].processord;

            //    }

            //    LoadOpItm(processordno);
            //}
            if (OPItmList.length > 0) {
                LoadOpItmtab(OPItmList);
            } else {


                for (var e = 0; e < ItmList.length; e++) {
                    var processordno = ItmList[e].processord;

                }

                LoadOpItm(processordno);
            }


        }

    });
}

function MasDelete() {
    debugger;
    $.each(ItmList, function () {

        this.Process_Recpt_masid = Masid;


    });
    //var res = validate();
    //if (res == false) {
    //    return false;
    //}
    var ordtype = $('input[name="Revert"]:checked').attr('value');
    var ObjAdd = {
        proc_recpt_masid: Masid,
        proc_recpt_no: $("#txtReceiptno").val(),
        proc_recpt_date: $("#txtReceiptDate").val(),//new Date($('#txtReceiptDate').val()),
        Recpt_Ref_date: $("#txtRefDate").val(),//new Date($('#txtRefDate').val()),
        Recpt_Ref_no: $("#txtRefNo").val(),
        remarks: $("#txtRemark").val(),
        OrderType: 'G',
        StoreUnitID: $("#ddlMSMMainStore").val(),
        CreatedBy: Guserid,
        InwardNo: '',
        SupplierInvoiceNo: '',
        ExcldetoInv: 0,
        InspDate: $("#txtReceiptDate").val(),//new Date($('#txtReceiptDate').val()),//
        //InspNo: 'S',
        EWayDate: $("#txtReceiptDate").val(),//new Date($('#txtReceiptDate').val()),
        //EWayNo: 'O',       
        ProcRetItmDet: ItmList

    }
    $("#btnDel").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/GeneralProcessReturn/Delete",
        data: JSON.stringify(ObjAdd),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Value == true) {
                canceldelete();
                AddUserEntryLog('PROCESS', 'General Process Return', 'DELETE', $("#txtReceiptno").val());
                //alert('Data Deleted Successfully');
                $("#btnDel").attr("disabled", false);
                //window.location.href = "/GeneralProcessReturn/GeneralProcessReturnIndex";
                var msg = "Data Deleted Successfully...";
                var flg = 2;
                var mod = 0;
                var url = "/GeneralProcessReturn/GeneralProcessReturnIndex";
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



function GenProcRetnPrint(Id) {
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

    window.open("../ReportInline/Process/GeneralProcessReturn/GeneralProcessReturnInlineReport.aspx?Masid=" + Repid + "&RetlossDet=" + p[0] + "&Ins=" + p[1] + "&Ewaybill=" + p[2] + "&Ewaydate=" + p[3] + "&Companyid=" + compid);

}

function backtomain() {
    $("#myModal2").hide();
    $("#myModal2").modal('hide');
}

function LoadOpItm(prodord) {
    debugger;

    $.ajax({
        url: "/ProcessReturn/LoadOpItmDet",
        data: JSON.stringify({ prodord: prodord }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;

            OPItmList = result.Value;

            LoadOpItmtab(OPItmList);

        }

    });
}


function LoadOpItmtab(list) {
    $('#tblopitmdetails').DataTable().destroy();

    $('#tblopitmdetails').DataTable({
        data: list,
        scrollY: 300,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        //"bSort": false,
        columns: [
                   { title: "Prodordid", data: "procordid", "visible": false },
                    { title: "ProdJobdetid", data: "procjobdetid", "visible": false },
                    { title: "Itmid", data: "itmid", "visible": false },
                   { title: "Colorid", data: "colorid", "visible": false },
                   { title: "Sizeid", data: "sizeid", "visible": false },
                    { title: "Ord No", data: "ordno", "visible": false },
                     { title: "Ref No", data: "refno", "visible": false },
                   { title: "Job Ord No", data: "jobordno", "visible": false },
                   { title: "Prog.No", data: "prodprgno", "visible": false },
                   { title: "Proc No", data: "processord" },

                    { title: "Item", data: "itm" },
                   { title: "Color", data: "color" },
                   { title: "Size", data: "size" },
                   {
                       title: "Order Qty", data: "ordqty",

                   },
                   {
                       title: "Bal Qty", data: "bal",

                   },
                    {
                        title: "Cancel Qty", data: "cancelqty",
                        render: function (data) {

                            return '<input type="text" id="txtopcancelqty" class="calcopcancelqty form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                        },
                    },
                     {
                         title: "Sec Qty", data: "secqty",
                         render: function (data) {

                             return '<input type="text" id="txtopsecqty" class="calcopsecqty form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                         },
                     },

        ]

    });


    var totalocqt = 0;
    for (var e = 0; e < OPItmList.length; e++) {
        var ocamount = OPItmList[e].cancelqty;
        totalocqt = totalocqt + parseFloat(ocamount);

    }
    $('#txtTotOutCanQty').val(totalocqt.toFixed(3));

    var table = $('#tblopitmdetails').DataTable();
    $("#tblopitmdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblopitmdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}

function cancelsave() {
    debugger;
    var res = cancelvalidate();
    if (res == false) {
        return false;
    }

    var detlist = [];
    var jobdetlist = [];
    for (var y = 0; y < ItmList.length; y++) {
        if (ItmList[y].cancelqty > 0) {

            var obj = {
                ProcessOrdId: ItmList[y].procordid,
                itemid: ItmList[y].itmid,
                sizeid: ItmList[y].sizeid,
                plansizeid: ItmList[y].plansizeid,
                colorid: ItmList[y].colorid,
                Canceled_qty: ItmList[y].cancelqty,
                Sec_Qty: ItmList[y].secqty,
                InorOut: "I",


                Job_Ord_No: ItmList[y].jobordno,
                ProdPrgNo: ItmList[y].prodprgno,
                SequenceNo: ItmList[y].prodprgno,
                Cancel_Qty: ItmList[y].cancelqty,
                ProcessOrdDetid: ItmList[y].procorddetid,
                ProcessOrdJobDetid: ItmList[y].procjobdetid,
            }
            detlist.push(obj);
        }
    }
    for (var m = 0; m < OPItmList.length; m++) {
        if (OPItmList[m].cancelqty > 0) {

            var obj = {
                ProcessOrdId: OPItmList[m].procordid,
                itemid: OPItmList[m].itmid,
                sizeid: OPItmList[m].sizeid,
                plansizeid: OPItmList[m].plansizeid,
                colorid: OPItmList[m].colorid,
                Canceled_qty: OPItmList[m].cancelqty,
                Sec_Qty: OPItmList[m].secqty,
                InorOut: "O",

                Job_Ord_No: OPItmList[m].jobordno,
                ProdPrgNo: OPItmList[m].prodprgno,
                SequenceNo: OPItmList[m].prodprgno,
                Cancel_Qty: OPItmList[m].cancelqty,
                ProcessOrdDetid: OPItmList[m].procorddetid,
                ProcessOrdJobDetid: OPItmList[m].procjobdetid,
            }
            detlist.push(obj);
        }
    }

    for (var b = 0; b < ItmList.length; b++) {
        if (ItmList[b].cancelqty > 0) {

            var obj = {
                Job_Ord_No: ItmList[b].jobordno,
                ProdPrgNo: ItmList[b].prodprgno,
                SequenceNo: ItmList[b].prodprgno,
                Cancel_Qty: ItmList[b].cancelqty,
                ProcessOrdDetid: ItmList[b].procorddetid,
                ProcessOrdJobDetid: ItmList[b].procjobdetid,
                InorOut: "I",
                ItemId: ItmList[b].itmid,
                ColorId: ItmList[b].colorid,
                SizeId: ItmList[b].sizeid,
                plansizeid: ItmList[b].plansizeid,

            }
            jobdetlist.push(obj);
        }
    }

    for (var e = 0; e < OPItmList.length; e++) {
        if (OPItmList[e].cancelqty > 0) {

            var obj = {
                Job_Ord_No: OPItmList[e].jobordno,
                ProdPrgNo: OPItmList[e].prodprgno,
                SequenceNo: OPItmList[e].prodprgno,
                Cancel_Qty: OPItmList[e].cancelqty,
                ProcessOrdDetid: OPItmList[e].procorddetid,
                ProcessOrdJobDetid: OPItmList[e].procjobdetid,
                InorOut: "O",
                ItemId: OPItmList[e].itmid,
                ColorId: OPItmList[e].colorid,
                SizeId: OPItmList[e].sizeid,
                plansizeid: OPItmList[e].plansizeid,
            }
            jobdetlist.push(obj);
        }
    }


    if (OPItmList.length == 0) {
        //alert('Please fill atleast any one qty...');
        var msg = "Please fill atleast any one quantity...";
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }


    var ordtype = $('input[name="Revert"]:checked').attr('value');

    var oldcanno = $("#txtCancelno").val();

    table = "Process_Cancel_mas",
    column = "process_Cancel_no",
    compId = CompanyId,
    Docum = 'PROCESS CANCEL'
    debugger;
    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var newcanno = result.Value;
            if (oldcanno != newcanno) {
                //alert('Cancel No has been changed...');
                var msg = "Cancel number has been changed...";
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                $('#txtCancelno').val(result.Value);
            }

            var ObjAdd = {
                // prod_recpt_masid:
                process_Cancel_no: $("#txtCancelno").val(),
                process_Cancel_date: $("#txtCancelDate").val(),//new Date($('#txtReceiptDate').val()),
                Cancel_Ref_date: $("#txtCancelRefDate").val(),//new Date($('#txtRefDate').val()),
                Cancel_Ref_no: $("#txtCancelrefNo").val(),
                Remarks: $("#txtRemark").val(),
                process_return_no: $("#txtReceiptno").val(),
                OrderType: ordtype,
                CancelOrClose: "C",
                CreatedBy: Guserid,
                ProcDet: detlist,
                ProcJobDet: jobdetlist,
                ProcObj: detlist

            }
            LoadingSymb();
            $.ajax({
                url: "/ProcessReturn/CancelAdd",
                data: JSON.stringify(ObjAdd),
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {
                    debugger;
                    if (result.Value == true) {

                        //alert('Data Saved Successfully');


                        //window.location.href = "/ProcessReturn/ProcessReturnIndex";

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

function cancelvalidate() {
    var isValid = true;
    if ($('#txtCancelrefNo').val().trim() == "") {
        $('#txtCancelrefNo').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtCancelrefNo').css('border-color', 'lightgrey');
    }


    return isValid;
}

function backtomain() {

    $("#myModal2").hide();
    $("#myModal2").modal('hide');
    window.location.href = "/GeneralProcessReturn/GeneralProcessReturnIndex";
}


function canceldelete() {
    debugger;
    var res = cancelvalidate();
    if (res == false) {
        return false;
    }

    var detlist = [];
    var jobdetlist = [];
    for (var y = 0; y < ItmList.length; y++) {
        if (ItmList[y].cancelqty > 0) {

            var obj = {
                ProcessOrdId: ItmList[y].procordid,
                itemid: ItmList[y].itmid,
                sizeid: ItmList[y].sizeid,
                colorid: ItmList[y].colorid,
                Canceled_qty: ItmList[y].cancelqty,
                Sec_Qty: ItmList[y].secqty,
                InorOut: "I",
                plansizeid: ItmList[y].plansizeid,

                Job_Ord_No: ItmList[y].jobordno,
                ProdPrgNo: ItmList[y].prodprgno,
                SequenceNo: ItmList[y].prodprgno,
                Cancel_Qty: ItmList[y].cancelqty,
                ProcessOrdDetid: ItmList[y].procorddetid,
                ProcessOrdJobDetid: ItmList[y].procjobdetid,
            }
            detlist.push(obj);
        }
    }
    for (var m = 0; m < OPItmList.length; m++) {
        if (OPItmList[m].cancelqty > 0) {

            var obj = {
                ProcessOrdId: OPItmList[m].procordid,
                itemid: OPItmList[m].itmid,
                sizeid: OPItmList[m].sizeid,
                colorid: OPItmList[m].colorid,
                Canceled_qty: OPItmList[m].cancelqty,
                Sec_Qty: OPItmList[m].secqty,
                InorOut: "O",
                plansizeid: OPItmList[m].plansizeid,
                Job_Ord_No: OPItmList[m].jobordno,
                ProdPrgNo: OPItmList[m].prodprgno,
                SequenceNo: OPItmList[m].prodprgno,
                Cancel_Qty: OPItmList[m].cancelqty,
                ProcessOrdDetid: OPItmList[m].procorddetid,
                ProcessOrdJobDetid: OPItmList[m].procjobdetid,
            }
            detlist.push(obj);
        }
    }

    for (var b = 0; b < ItmList.length; b++) {
        if (ItmList[b].cancelqty > 0) {

            var obj = {
                Job_Ord_No: ItmList[b].jobordno,
                ProdPrgNo: ItmList[b].prodprgno,
                SequenceNo: ItmList[b].prodprgno,
                Cancel_Qty: ItmList[b].cancelqty,
                ProcessOrdDetid: ItmList[b].procorddetid,
                ProcessOrdJobDetid: ItmList[b].procjobdetid,
                InorOut: "I",
                ItemId: ItmList[b].itmid,
                ColorId: ItmList[b].colorid,
                SizeId: ItmList[b].sizeid,
                plansizeid: ItmList[b].plansizeid,
            }
            jobdetlist.push(obj);
        }
    }

    for (var e = 0; e < OPItmList.length; e++) {
        if (OPItmList[e].cancelqty > 0) {

            var obj = {
                Job_Ord_No: OPItmList[e].jobordno,
                ProdPrgNo: OPItmList[e].prodprgno,
                SequenceNo: OPItmList[e].prodprgno,
                Cancel_Qty: OPItmList[e].cancelqty,
                ProcessOrdDetid: OPItmList[e].procorddetid,
                ProcessOrdJobDetid: OPItmList[e].procjobdetid,
                InorOut: "O",
                ItemId: OPItmList[e].itmid,
                ColorId: OPItmList[e].colorid,
                SizeId: OPItmList[e].sizeid,
                plansizeid: OPItmList[e].plansizeid,
            }
            jobdetlist.push(obj);
        }
    }





    var ordtype = $('input[name="Revert"]:checked').attr('value');
    var ObjAdd = {
        Process_Cancel_masid: CanMasId,
        process_Cancel_no: $("#txtCancelno").val(),
        process_Cancel_date: $("#txtCancelDate").val(),//new Date($('#txtReceiptDate').val()),
        Cancel_Ref_date: $("#txtCancelRefDate").val(),//new Date($('#txtRefDate').val()),
        Cancel_Ref_no: $("#txtCancelrefNo").val(),
        Remarks: $("#txtRemark").val(),
        OrderType: ordtype,
        CancelOrClose: "C",
        CreatedBy: Guserid,
        ProcDet: detlist,
        ProcJobDet: jobdetlist,
        ProcObj: detlist,
        proc_recpt_masid: Masid,

    }
    LoadingSymb();
    $.ajax({
        url: "/ProcessReturn/CancelDelete",
        data: JSON.stringify(ObjAdd),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Value == true) {

                //alert('Data Deleted Successfully');


                //window.location.href = "/ProcessReturn/ProcessReturnIndex";

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

function ReportClose() {
    
    $('#myModal2').modal('hide');
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
        var msg = "Company loading failed...";
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
    }
}

function onUserCompanyFailure(result) {

    //alert('Company loading failed');
    var msg = "Company loading failed...";
    var flg = 4;
    var mod = 1;
    var url = "";
    AlartMessage(msg, flg, mod, url);
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