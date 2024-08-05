var CompanyId = 0;
var Companyunitid = 0;
var rowindex = -1;
var ItmList = [];
var OPItmList = [];
var index = -1;
var Masid = 0;
var MainFDate = 0;
var Userid = 0;
var UserName = 0;
var repobj = [];
var Repid = 0;
var Guserid = 0;
var compid = 0;
var suppid = 0;
var processid = 0;
var CanMasId = 0;
var AllotedItemList = [];
var gcompid = 0;
var gproid = 0;
var DCompid = 0;
var ChkProcess = true;
var ChkRecpt = true;
var DtChk = false;
var ChkDCNo = true;
var ChkUnit = true;
var ChkComp = false;
var LoginUserid = '';
var ValidateProcessStore = "False";
var editmasunitstore = 0;
var editsubmasunitstore = 0;
var editsubstore = 0;
var ProcessSetup = '';
var UserGroup = '';

$(document).ready(function () {
    debugger;
    //LoadCompanyDDL("#ddlCompany");
    //LoadCompanyUnitDDL("#ddlUnit");
    //LoadProcessDDL("#ddlProcess");
    //LoadColorDDL("#ddlColor");
    LoadSupplierDDL("#ddlprocessor");
    LoginUserid = $("#hdnLoginUserid").data('value');
    Guserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    MainFDate = $("#hdMainFromDate").data('value');
    DCompid = $("#hdnDCompid").data('value');
    ValidateProcessStore = $("#hdnValidateProcessStore").data('value');
    LoadWorkdivisionDDL("#ddlwrkdiv,#ddlwrkdivision");
    LoadCompanyDDL("#ddlMCompany,#ddlCompany");
    LoadCompanyUnitDDL("#ddlUnit");
    //LoadProcessor();
    getDate();
    loadUserGroup();
    var fill = localStorage.getItem('ProcessReturnMainFilter');
    if (fill != "null" && fill != null) {
        LoadMaingridFromBack();
         
    } else {
        LoadMaingrid();
    }

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
    //$(document).on('click', '.btnSelect', function () {
    //    debugger;

    //    rowindex = $(this).closest('tr').index();
    //    var currentro12 = entrygriddet.slice(rowindex);
    //    var prodord = entrygriddet[0].prodord;
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
            var msg = 'Select Company...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return true;
        }

        if (ccompunit == 0) {
            //alert('Select CompanyUnit');
            var msg = 'Select CompanyUnit...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return true;
        }
        if (cprocess == 0) {
            //alert('Select Process');
            var msg = 'Select Process...';
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
        //processid = Processid;
        GetProcessSetup();

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
    $(document).on('keyup', '.calcRetqty', function (e) {
        debugger;

        var table = $('#tblitmdetails').DataTable();
        var CSno = table.row($(this).parents('tr')).data()["procjobdetid"];
        var Bal = table.row($(this).parents('tr')).data()["bal"];

        var val = $(this).val();

        if (val > Bal) {
            //alert("Return Qty should not greater then BalQty..")
            var msg = 'Return quantity should not greater then Balance quantity...';
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
            var msg = 'Should not exceed Return quantity in Input table...';
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
            var msg = 'Cancel quantity should not greater then Balance quantity...';
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

    $(document).on('keyup', '.calcsecqty', function (e) {
        debugger;

        var table = $('#tblitmdetails').DataTable();
        var CSno = table.row($(this).parents('tr')).data()["procjobdetid"];

        var val = $(this).val();

        $.each(ItmList, function () {
            if (this.procjobdetid == CSno) {
                this.secqty = val;

            }
        });


    });

    $(document).on('keyup', '.calcsecqty', function (e) {
        debugger;

        var table = $('#tblopitmdetails').DataTable();
        var CSno = table.row($(this).parents('tr')).data()["procjobdetid"];

        var val = $(this).val();

        $.each(OPItmList, function () {
            if (this.procjobdetid == CSno) {
                this.secqty = val;

            }
        });


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

        //LoadItmtab(ItmList);

        var table = $('#tblitmdetails').DataTable();
        var ecdata = table.rows().data();

        $('input[id=txtlossqty]').each(function (ig) {
            var slno = ecdata[ig].procjobdetid;
            var row = $(this).closest('tr');
            for (var h = 0; h < ItmList.length; h++) {
                if (slno == ItmList[h].procjobdetid) {
                    var lossqty = ItmList[h].lossqty;
                    row.find('#txtlossqty').val(lossqty);

                }
            }

        });


        //Datatable textbox focus
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

    //$('#tblEntryGrnItemdetails').on('click', 'tr', function (e) {
    //    debugger;
    //});


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
    LoadStoreUnitDDL("#ddlSStoreSub");
    LoadCompanyUnitDDL("#ddlSStorePunit");


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
    LoadCompanyUnitDDL("#ddlUnit");
    //$('#ddlCompany').val("0");
    //$('#ddlUnit').val("0");
    $('#ddlColor').val("0");
    $('#ddlProcess').val("0");
    //$('#ddlwrkdiv').val("0");
    //$('#ddlBuyer').val("0");
    //$('#ddlProcess').val("0");
    //$('#ddlSupplier').val("0");
    //$('#ddlOrderNo').val("0");
    //$('#ddlIssueNo').val("0");
    //$('#ddlRefNo').val("0");
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
    LoadAddgrid();
}
function RadioMBClick() {
    $("#ddlProcess").empty();
    var protype = $('input[name="optwrkord"]:checked').attr('value');
    if (protype == 'P') {

        $('#supp').show();
        $("#wrkdiv").hide();
        
    }
    else if (protype == 'W') {
        $('#supp').hide();
        $("#wrkdiv").show();
        LoadWorkdivisionDDL("#ddlwrkdiv");
    }
    LoadAddgridddl();
}

function LoadProcessor() {
    debugger;

    $.ajax({
        url: "/ProcessReturn/Getprocessor",
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
    $.ajax({
        url: "/ProcessReturn/Getprocess",
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
    var type = $('input[name="Revert"]:checked').attr('value');// $('input[name="Revert"]:checked').attr('value');
    if (protype == 'P') {
        var procrid = $('select#ddlSupplier option:selected').val();
        if (procrid == null || procrid == "0") {
            procrid = 0;
        }
    }
    else if (protype == 'W') {
        var procrid = $('select#ddlwrkdiv option:selected').val();
        if (procrid == null || procrid == "0") {
            procrid = 0;
        }
    }
    //if (procrid == 0) {
    //    alert('Please select Processor...');
    //    return true;
    //}
    //var cl = 'N';

    //var Sty = $('select#ddlCompany option:selected').val();
    //if (Sty == null || Sty == "0") {
    //    Sty = 0;
    //}


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
    var OrdNo = $('select#ddlOrderNo option:selected').val();
    if (OrdNo == null || OrdNo == "0") {
        OrdNo = "";
    }
    var RefNo = $('select#ddlRefNo option:selected').val();
    if (RefNo == null || RefNo == "0") {
        RefNo = "";
    }
    var StyleId = $('select#ddlStyle option:selected').val();
    if (StyleId == null || StyleId == "0") {
        StyleId = 0;
    }
    var BuyId = $('select#ddlBuyer option:selected').val();
    if (BuyId == null || BuyId == "0") {
        BuyId = 0;
    }

    $.ajax({
        url: "/ProcessReturn/Loadaddgrid",
        data: JSON.stringify({ cmpid: cmpyid, cmpunitid: cunitid, processid: procid, processorid: procrid, colorid: clid, ordtype: type, ProcessorType: protype, OrderNo: OrdNo, ReferNo: RefNo, StyleId: StyleId, BuyerId: BuyId  }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            entrygriddet = result.Value;

            if (entrygriddet.length > 0) {
                for (var d = 0; d < entrygriddet.length; d++) {
                    entrygriddet[d].procdate = moment(entrygriddet[d].procdate).format("DD/MM/YYYY")
                }
                LoadEntrytab(entrygriddet);
            }

        }

    });
}
function LoadChk() {
    //$('#ddlCompany').empty();
    $('#ddlColor').empty();

    // $('#ddlUnit').empty();
    $('#ddlProcess').empty();
   
    LoadAddgridddl();
    LoadAddgrid();
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
    var type = $('input[name="Revert"]:checked').attr('value');// $('input[name="Revert"]:checked').attr('value');
    if (protype == 'P') {
        var procrid = $('select#ddlSupplier option:selected').val();
        //var Sty = $('select#ddlCompany option:selected').val();
        if (procrid == null || procrid == "0") {
            procrid = 0;
        }
    }
    else if (protype == 'W') {
        var procrid = $('select#ddlwrkdiv option:selected').val();
        if (procrid == null || procrid == "0") {
            procrid = 0;
        }
    }
    //if (procrid == 0) {
    //    alert('Please select Processor...');
    //    return true;
    //}
    //var cl = 'N';




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
    var OrdNo = $('select#ddlOrderNo option:selected').val();
    if (OrdNo == null || OrdNo == "0") {
        OrdNo = "";
    }
    var RefNo = $('select#ddlRefNo option:selected').val();
    if (RefNo == null || RefNo == "0") {
        RefNo = "";
    }
    var StyleId = $('select#ddlStyle option:selected').val();
    if (StyleId == null || StyleId == "0") {
        StyleId = 0;
    }
    var BuyId = $('select#ddlBuyer option:selected').val();
    if (BuyId == null || BuyId == "0") {
        BuyId = 0;
    }

    $.ajax({
        url: "/ProcessReturn/Loadaddgrid",
        data: JSON.stringify({ cmpid: cmpyid, cmpunitid: cunitid, processid: procid, processorid: procrid, colorid: clid, ordtype: type, ProcessorType: protype, OrderNo: OrdNo, ReferNo: RefNo, StyleId: StyleId, BuyerId: BuyId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            entrygriddet = result.Value;
            for (var d = 0; d < entrygriddet.length; d++) {
                entrygriddet[d].procdate = moment(entrygriddet[d].procdate).format("DD/MM/YYYY")
            }

            //entrygriddet.sort(function (a, b) {
            //    return a.procordid - b.procordid;
            //})
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
                var suppdet = {};
                var supp = [];
                var OrdNodet = {};
                var OrdNo = [];
                var RefNodet = {};
                var RefNo = [];
                var Styledet = {};
                var style = [];
                var buyerdet = {};
                var Buyer = [];
                
                $.each(data, function (i, el) {

                    if (!compdet[el.cmpid]) {
                        compdet[el.cmpid] = true;
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


                    if (!unitdet[el.cmpunitid]) {
                        unitdet[el.cmpunitid] = true;
                        unit.push(el);
                    }

                    if (!suppdet[el.processor]) {
                        suppdet[el.processor] = true;
                        supp.push(el);
                    }

                    if (!OrdNodet[el.orderno]) {
                        OrdNodet[el.orderno] = true;
                        OrdNo.push(el);
                    }

                    if (!RefNodet[el.refno]) {
                        RefNodet[el.refno] = true;
                        RefNo.push(el);
                    }

                    if (!Styledet[el.StyleId]) {
                        Styledet[el.StyleId] = true;
                        style.push(el);
                    }

                    if (!buyerdet[el.buyerid]) {
                        buyerdet[el.buyerid] = true;
                        Buyer.push(el);
                    }
                });

                //$("#ddlUnit").empty();
                $("#ddlProcess").empty();
                //$("#ddlCompany").empty();
                $("#ddlSupplier").empty();
                $("#ddlColor").empty();
                $("#ddlOrderNo").empty();
                $("#ddlRefNo").empty();
                $("#ddlStyle").empty();
                $("#ddlBuyer").empty();

                //$(ddlUnit).append($('<option/>').val('0').text('--Select Unit--'));
                //$.each(unit, function () {
                //    $(ddlUnit).append($('<option></option>').val(this.cmpunitid).text(this.cmpunit));
                //});

                $(ddlProcess).append($('<option/>').val('0').text('--Select Process--'));
                $.each(recpt, function () {
                    $(ddlProcess).append($('<option></option>').val(this.processid).text(this.process));
                });

                //$(ddlCompany).append($('<option/>').val('0').text('--Select Company--'));
                //$.each(comp, function () {
                //    $(ddlCompany).append($('<option></option>').val(this.cmpid).text(this.cmp));
                //});

                $(ddlSupplier).append($('<option/>').val('0').text('--Select Supplier--'));
                $.each(supp, function () {
                    $(ddlSupplier).append($('<option></option>').val(this.processorid).text(this.processor));
                });

                $(ddlColor).append($('<option/>').val('0').text('--Select Color--'));
                $.each(dc, function () {
                    $(ddlColor).append($('<option></option>').val(this.colorid).text(this.color));
                });

                $('#ddlOrderNo').append($('<option/>').val('0').text('--Select OrderNo--'));
                $.each(OrdNo, function () {
                    $('#ddlOrderNo').append($('<option></option>').val(this.orderno).text(this.orderno));
                });

                $('#ddlRefNo').append($('<option/>').val('0').text('--Select RefNo--'));
                $.each(RefNo, function () {
                    $('#ddlRefNo').append($('<option></option>').val(this.refno).text(this.refno));
                });

                $('#ddlStyle').append($('<option/>').val('0').text('--Select Style--'));
                $.each(style, function () {
                    $('#ddlStyle').append($('<option></option>').val(this.StyleId).text(this.Style));
                });

                $('#ddlBuyer').append($('<option/>').val('0').text('--Select Buyer--'));
                $.each(Buyer, function () {
                    $('#ddlBuyer').append($('<option></option>').val(this.buyerid).text(this.buyer));
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

                           return '<button type="button" class="btnSelect btn btn_round btn-success" data-toggle="tooltip" data-placement="top" title="Add" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" >  <i class="fa fa-plus"></i> </button>';
                       }
                   },

        ]

    });
}

function LoadItm(prodord) {
    debugger;

    $.ajax({
        url: "/ProcessReturn/LoadItmDet",
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
        //"bSort": false,
        columns: [
                   { title: "Prodordid", data: "procordid", "visible": false },
                    { title: "ProdJobdetid", data: "procjobdetid", "visible": false },
                    { title: "Itmid", data: "itmid", "visible": false },
                   { title: "Colorid", data: "colorid", "visible": false },
                   { title: "Sizeid", data: "sizeid", "visible": false },
                   { title: "Ord No", data: "ordno" },
                   { title: "Ref No", data: "refno" },
                   { title: "Job Ord No", data: "jobordno", "visible": false },
                   { title: "Prog.No", data: "prodprgno", "visible": false },
                   { title: "Proc No", data: "processord" },

                    { title: "Item", data: "itm" },
                   { title: "Color", data: "color" },
                   { title: "Size", data: "size" },
                     { title: "Ord Qty", data: "ordqty" },
                    { title: "Bal Qty", data: "bal" },
                   {
                       title: "Return Qty", data: "retqty",
                       render: function (data) {

                           return '<input type="text" id="txtretqty" class="calcRetqty form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                       },
                   },
                   {
                       title: "Loss Qty", data: "lossqty",
                       render: function (data) {

                           return '<input type="text" id="txtlossqty" class="calcLossqty form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

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
                    { title: "Ord No", data: "ordno" },
                     { title: "Ref No", data: "refno" },
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


$(document).ready(function () {
    $("#tblitmdetails ").dataTable().find("tbody").on('click', 'tr', function () {
        index = (this.rowIndex) - 1;
    });
});


function backtomain() {
    // $('#myModal1').hide();
    $('#myModal1').modal('hide');
}


function save() {
    debugger;
    var res = validate();
    if (res == false) {
        return false;
    }

    var opchk = [];
    for (var y = 0; y < ItmList.length; y++) {
        if (ItmList[y].retqty > 0) {
            opchk.push(ItmList[y]);
        }
    }
    if (opchk.length == 0) {
        var msg = 'Please fill atleast any one Return quantity...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        //alert('Please fill atleast any one Return Qty...');
        return true;
    }


    var opicchk = [];
    for (var y = 0; y < ItmList.length; y++) {
        if (ItmList[y].cancelqty > 0) {
            opicchk.push(ItmList[y]);
        }
    }
    if (opicchk.length == 0) {
        //alert('Please fill atleast any one Input Cancel quantity...');
        var msg = 'Please fill atleast any one Input Cancel quantity...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }


    var opcchk = [];
    for (var y = 0; y < OPItmList.length; y++) {
        if (OPItmList[y].cancelqty > 0) {
            opcchk.push(OPItmList[y]);
        }
    }
    if (opcchk.length == 0) {
        if (ProcessSetup == 'K') { } else {
            //alert('Please fill atleast any one Output Cancel quantity...');
            var msg = 'Please fill atleast any one Output Cancel quantity...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return true;
        }
    }



    //var totalqt = 0;
    //for (var e = 0; e < ItmList.length; e++) {
    //    var amount = ItmList[e].retqty;
    //    totalqt = totalqt + parseFloat(amount);

    //}
    //$('#txtTotRetQty').val(totalqt.toFixed(3));


    //var totalcqt = 0;
    //for (var e = 0; e < ItmList.length; e++) {
    //    var camount = ItmList[e].cancelqty;
    //    totalcqt = totalcqt + parseFloat(camount);

    //}
    //$('#txtTotCanQty').val(totalcqt.toFixed(3));

    var TRetQty = $('#txtTotRetQty').val();
    var TCanQty = $('#txtTotCanQty').val();
    var TOCanQty = $('#txtTotOutCanQty').val();

    if (TRetQty != TCanQty) {
        //alert("Input Return and Input Cancel Qty Should be Equal..");
        var msg = 'Input Return and Input Cancel quantity Should be Equal...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    if (ProcessSetup == "C" || ProcessSetup == "S" || ProcessSetup == "K") { }
    else {

        if (TOCanQty != TCanQty) {
            //alert("Input Cancel and OutPut Cancel Qty Should be Equal..");
            var msg = 'Input Cancel and OutPut Cancel quantity Should be Equal...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return true;
        }
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
        var msg = 'Please select Store...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    compid = CompanyId;
    suppid = Processorid;
    processid = Processid;
    var ordtype = $('input[name="Revert"]:checked').attr('value');

    var oldrecpno = $('#txtReceiptno').val();

    var table = "Process_Recpt_Mas"
    var column = "proc_recpt_no"
    var compId = CompanyId
    var Docum = 'PROCESS RETURN'

    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var newrcpno = result.Value;
            if (oldrecpno != newrcpno) {
                //alert('Return No has been changed...');
                var msg = 'Return Number has been changed...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                $('#txtReceiptno').val(result.Value);
            }


            var ObjAdd = {
                // prod_recpt_masid:
                companyid: compid,
                supplierid: suppid,
                processid: processid,
                proc_recpt_no: $("#txtReceiptno").val(),
                proc_recpt_date: $("#txtReceiptDate").val(),//new Date($('#txtReceiptDate').val()),
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
                ProcRetItmDet: ItmList

            }


            $("#btnAdd").attr("disabled", true);
            LoadingSymb();
            $.ajax({
                url: "/ProcessReturn/Add",
                data: JSON.stringify(ObjAdd),
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {
                    debugger;
                    if (result.Value == true) {
                        cancelsave();
                        //alert('Data Saved Successfully');
                        AddUserEntryLog('Process', 'Process Return', 'ADD', $("#txtReceiptno").val());

                        $("#btnAdd").attr("disabled", false);
                        //window.location.href = "/ProcessReturn/ProcessReturnIndex";
                        var msg = 'Data Saved Successfully...';
                        var flg = 1;
                        var mod = 0;
                        var url = "/ProcessReturn/ProcessReturnIndex";
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
    if ($('#txtCancelrefNo').val().trim() == "") {
        $('#txtCancelrefNo').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtCancelrefNo').css('border-color', 'lightgrey');
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

function cancelsave() {
    debugger;
    var res = cancelvalidate();
    if (res == false) {
        return false;
    }

    var detlist = [];

    var detlist2 = [];

    var jobdetlist = [];
    for (var y = 0; y < ItmList.length; y++) {
        if (ItmList[y].cancelqty > 0) {

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



    var ipdet = [];
    debugger;
    var newArray = [];
    $.each(detlist, function (key, value) {
        var exists = false;
        var rate = 0;
        $.each(newArray, function (k, val2) {
            if (value.itemid == val2.itemid && value.colorid == val2.colorid && value.sizeid == val2.sizeid && value.plansizeid == val2.plansizeid && value.ProcessOrdDetid == val2.ProcessOrdDetid) { exists = true; };
        });

        if (exists == false && value.itemid != "" && value.colorid != "" && value.sizeid != "" && value.plansizeid != "" && value.ProcessOrdDetid != "" && value.InorOut == "I") { newArray.push(value); }
    });
    ipdet = newArray;



    $.each(ipdet, function (i) {

        var cancledqty = 0;
        var canlqty = 0;
        var sqty = 0;


        $.each(detlist, function (k) {
            if (ipdet[i].itemid == detlist[k].itemid && ipdet[i].colorid == detlist[k].colorid && ipdet[i].sizeid == detlist[k].sizeid && ipdet[i].plansizeid == detlist[k].plansizeid
                && ipdet[i].ProcessOrdDetid == detlist[k].ProcessOrdDetid && detlist[k].InorOut == "I") {

                cancledqty += parseFloat(detlist[k].Canceled_qty);
                sqty += parseFloat(detlist[k].Sec_Qty);
                canlqty += parseFloat(detlist[k].Cancel_Qty);
            }

        });

        ipdet[i].Canceled_qty = cancledqty;
        ipdet[i].Sec_Qty = sqty;
        ipdet[i].Cancel_Qty = canlqty;

    });




    var opdet = [];

    debugger;
    var newArray = [];
    $.each(detlist, function (key, value) {
        var exists = false;
        var rate = 0;
        $.each(newArray, function (k, val2) {
            if (value.itemid == val2.itemid && value.colorid == val2.colorid && value.sizeid == val2.sizeid && value.plansizeid == val2.plansizeid && value.ProcessOrdDetid == val2.ProcessOrdDetid) { exists = true; };
        });

        if (exists == false && value.itemid != "" && value.colorid != "" && value.sizeid != "" && value.plansizeid != "" && value.ProcessOrdDetid != "" && value.InorOut == "O") { newArray.push(value); }
    });
    opdet = newArray;



    $.each(opdet, function (i) {

        var cancledqty = 0;
        var canlqty = 0;
        var sqty = 0;

        $.each(detlist, function (k) {
            if (opdet[i].itemid == detlist[k].itemid && opdet[i].colorid == detlist[k].colorid && opdet[i].sizeid == detlist[k].sizeid && opdet[i].plansizeid == detlist[k].plansizeid
                && opdet[i].ProcessOrdDetid == detlist[k].ProcessOrdDetid && detlist[k].InorOut == "O") {

                cancledqty += parseFloat(detlist[k].Canceled_qty);
                sqty += parseFloat(detlist[k].Sec_Qty);
                canlqty += parseFloat(detlist[k].Cancel_Qty);
            }

        });

        opdet[i].Canceled_qty = cancledqty;
        opdet[i].Sec_Qty = sqty;
        opdet[i].Cancel_Qty = canlqty;

    });


    for (var y = 0; y < ipdet.length; y++) {
        if (ipdet[y].Cancel_Qty > 0) {

            var obj = {
                ProcessOrdId: ipdet[y].ProcessOrdId,
                itemid: ipdet[y].itemid,
                sizeid: ipdet[y].sizeid,
                plansizeid: ipdet[y].plansizeid,
                colorid: ipdet[y].colorid,
                Canceled_qty: ipdet[y].Canceled_qty,
                Sec_Qty: ipdet[y].Sec_Qty,
                InorOut: "I",


                Job_Ord_No: ipdet[y].Job_Ord_No,
                ProdPrgNo: ipdet[y].ProdPrgNo,
                SequenceNo: ipdet[y].SequenceNo,
                Cancel_Qty: ipdet[y].Cancel_Qty,
                ProcessOrdDetid: ipdet[y].ProcessOrdDetid,
                ProcessOrdJobDetid: ipdet[y].ProcessOrdJobDetid,
            }
            detlist2.push(obj);
        }
    }
    for (var m = 0; m < opdet.length; m++) {
        if (opdet[m].Cancel_Qty > 0) {

            var obj = {
                ProcessOrdId: opdet[m].ProcessOrdId,
                itemid: opdet[m].itemid,
                sizeid: opdet[m].sizeid,
                plansizeid: opdet[m].plansizeid,
                colorid: opdet[m].colorid,
                Canceled_qty: opdet[m].Canceled_qty,
                Sec_Qty: opdet[m].Sec_Qty,
                InorOut: "O",

                Job_Ord_No: opdet[m].Job_Ord_No,
                ProdPrgNo: opdet[m].ProdPrgNo,
                SequenceNo: opdet[m].SequenceNo,
                Cancel_Qty: opdet[m].Cancel_Qty,
                ProcessOrdDetid: opdet[m].ProcessOrdDetid,
                ProcessOrdJobDetid: opdet[m].ProcessOrdJobDetid,
            }
            detlist2.push(obj);
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
        if (ProcessSetup == 'K') { } else {
            //alert('Please fill atleast any one qty...');
            var msg = 'Please fill atleast any one quantity...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return true;
        }
    }


    var ordtype = $('input[name="Revert"]:checked').attr('value');

    var oldcanno = $('#txtCancelno').val();

    var table = "Process_Cancel_mas"
    var column = "process_Cancel_no"
    var compId = CompanyId
    var Docum = 'PROCESS CANCEL'

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
                var msg = 'Cancel number has been changed...';
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
                ProcDet: detlist2,
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


function LoadMaingrid() {
    debugger;

    var type = $('select#ddlMType option:selected').val();

    if (type == undefined) {
        type = "";
    }
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
    var ONo = $('select#ddlMOrderNo option:selected').val();

    if (ONo == 0 || ONo == undefined) {
        ordNo = "";
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
        debugger;
        ordNo = "";
        RecNo = "";
        DCNo = "";
        Unit = 0;
        process = 0;
        buyer = 0;
    }
    var menufilter = CompId + ',' + process + ',' + Unit + ',' + buyer + ',' + mas + ',' + prid + ',' + proctype + ',' + type + ',' + DCNo + ',' + RecNo + ',' + FDate + ',' + TDate + ',' + Processorid ;
    localStorage.setItem('ProcessReturnMainFilter', menufilter);


    $.ajax({
        url: "/ProcessReturn/LoadMaingrid",
        data: JSON.stringify({ cmpid: CompId, processid: process, unitid: Unit, buyerid: buyer, masid: mas, prodordid: prid, processortype: proctype, type: type, dcno: DCNo, recptno: RecNo, fromDate: FDate, todate: TDate, Processorid: Processorid }),
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

            }
            ddlmain();

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
            CheckRights("ProcessReturn");
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}


function LoadMaingridFromBack() {
    debugger;
    var fill = localStorage.getItem('ProcessReturnMainFilter');
    var fillobj = [];
    fillobj = fill.split(",");

    $('#txtFromDate').val(fillobj[10]);
    $('#txtToDate').val(fillobj[11]);

    if (fillobj[6] == 'P') {
        $('#MP').prop('checked', true);
    } else {
        $('#MW').prop('checked', true);
    }
    var proctype = $('input[name="mainproctype"]:checked').attr('value');

    if (proctype == 'P') {
        $('#ddlpro').show();
        $("#ddlwrkd").hide();
    }
    else if (proctype == 'W') {
        $('#ddlpro').hide();
        $("#ddlwrkd").show();
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
    if (fillobj[12] == "undefined") {
        fillobj[12] = 0;
    }

    $.ajax({
        url: "/ProcessReturn/LoadMaingrid",
        data: JSON.stringify({ cmpid: fillobj[0], processid: fillobj[1], unitid: fillobj[2], buyerid: fillobj[3], masid: fillobj[4], prodordid: fillobj[5], processortype: fillobj[6], type: fillobj[7], dcno: fillobj[8], recptno: fillobj[9], fromDate: fillobj[10], todate: fillobj[11], Processorid: fillobj[12] }),
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

            }
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
    //LoadCompanyUnitDDL("#ddlMUnit");
    var type = $('select#ddlMType option:selected').val();

    if (type == undefined) {
        type = "";
    }
    var proctype = $('input[name="mainproctype"]:checked').attr('value');


    var ordNo = "";
    var ONo = $('select#ddlMOrderNo option:selected').val();

    if (ONo == 0 || ONo == undefined) {
        ordNo = "";
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
    var Processorid = 0;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    if (ChkComp) {
        ordNo = "";
        RecNo = "";
        DCNo = "";
        Unit = 0;
        process = 0;
        buyer = 0;
    }

    $.ajax({
        url: "/ProcessReturn/LoadMaingriddet",
        data: JSON.stringify({ cmpid: CompId, processid: process, unitid: Unit, buyerid: buyer, masid: mas, prodordid: prid, processortype: proctype, type: type, dcno: DCNo, recptno: RecNo, fromDate: FDate, todate: TDate, Processorid: Processorid }),
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

                
                if (ChkProcess || ChkComp || DtChk) {
                    $('#ddlMProcess').empty();
                    $(ddlMProcess).append($('<option/>').val('0').text('--Select Process--'));
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
    // $('#tblmaindetails').DataTable().destroy();
    ChkProcess = true;
    ChkRecpt = true;
    DtChk = false;
    ChkDCNo = true;
    ChkUnit = true;
    ChkComp = true;
    Chksupplier();
    LoadMaingrid();
}
function Chksupplier() {
    var proctype = $('input[name="mainproctype"]:checked').attr('value');

    if (proctype == 'P') {
        $("#ddlwrkdivision").empty();
        LoadWorkdivisionDDL("#ddlwrkdivision");
        
    }
    else if (proctype == 'W') {
        $("#ddlprocessor").empty();
        LoadSupplierDDL("#ddlprocessor");
    }
}
function PMainlist() {
    // $('#tblmaindetails').DataTable().destroy();
    ChkProcess = false;
    ChkRecpt = true;
    DtChk = false;
    ChkDCNo = true;
    ChkUnit = false;
    ChkComp = false;
    LoadMaingrid();
}

function RCMainlist() {
    // $('#tblmaindetails').DataTable().destroy();
    ChkProcess = false;
    ChkRecpt = false;
    DtChk = false;
    ChkDCNo = false;
    ChkUnit = false;
    ChkComp = false;
    LoadMaingrid();
}

function DCMainlist() {
    // $('#tblmaindetails').DataTable().destroy();
    ChkProcess = false;
    ChkRecpt = false;
    DtChk = false;
    ChkDCNo = false;
    ChkUnit = false;
    ChkComp = false;
    LoadMaingrid();
}
function UMainlist() {
    // $('#tblmaindetails').DataTable().destroy();
    ChkProcess = true;
    ChkRecpt = true;
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
    CompanyId = CompId;

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
    $.ajax({
        url: "/ProcessReturn/LoadMaingriddet",
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
            $('#txtCancelRefDate').val(moment(obj[0].CancelRefDate).format("DD/MM/YYYY"));//.val(obj[0].CancelRefDate);
            $('#txtCancelDate').val(moment(obj[0].Canceldate).format("DD/MM/YYYY"));//.val(obj[0].Canceldate);


            var pdn = obj[0].proc_recpt_no;
            gcompid = obj[0].companyid;
            gproid = obj[0].processid;
            Processid = obj[0].processid;
            GetProcessSetup();

            if (obj[0]["Storetype"] == 'SS') {
                $('#optSS').prop('checked', true);
                LoadSubStore();
                editsubmasunitstore = obj[0]["ParentUnitid"];
                editsubstore = obj[0]["StoreUnitID"];
                editmasunitstore = 0;
                //$('#ddlSCompany').val(obj[0]["ParentUnitid"]).trigger('change');
                //$('#ddlSMainStore').val(obj[0]["StoreUnitID"]).trigger('change');
            }
            else {
                $('#optMS').prop('checked', true);
                LoadMainStore();
                editmasunitstore = obj[0]["StoreUnitID"];
                editsubmasunitstore = 0;
                editsubstore = 0;
                //$('#ddlMSMMainStore').val(obj[0]["StoreUnitID"]).trigger('change');
            }
            LoadEmployeeStoreunit();
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
            //CompanyId = obj[0].cmpid;
            //ProductionOrderno = obj[0].prodnord;
            //Companyunitid = obj[0].cmpunitid;

            //Processid = obj[0].processid;
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


function LoadEditInputItm(masid, pdn) {
    debugger;

    $.ajax({
        url: "/ProcessReturn/LoadEditItmDet",
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

        }

    });
}

function Update() {
    debugger;
    if (UserGroup != 'AUDIT') {

        $.each(ItmList, function () {

            this.Process_Recpt_masid = Masid;


        });
        var res = validate();
        if (res == false) {
            return false;
        }

        var opchk = [];
        for (var y = 0; y < ItmList.length; y++) {
            if (ItmList[y].retqty > 0) {
                opchk.push(ItmList[y]);
            }
        }
        if (opchk.length == 0) {
            //alert('Please fill atleast any one Return Qty...');
            var msg = 'Please fill atleast any one Return quantity...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return true;
        }


        var opicchk = [];
        for (var y = 0; y < ItmList.length; y++) {
            if (ItmList[y].cancelqty > 0) {
                opicchk.push(ItmList[y]);
            }
        }
        if (opicchk.length == 0) {
            //alert('Please fill atleast any one Input Cancel Qty...');
            var msg = 'Please fill atleast any one Input Cancel quantity...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return true;
        }


        var opcchk = [];
        for (var y = 0; y < OPItmList.length; y++) {
            if (OPItmList[y].cancelqty > 0) {
                opcchk.push(OPItmList[y]);
            }
        }
        if (opcchk.length == 0) {
            if (ProcessSetup == 'K') { } else {
                //alert('Please fill atleast any one Output Cancel Qty...');
                var msg = 'Please fill atleast any one Output Cancel quantity...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                return true;
            }
        }


        var TRetQty = $('#txtTotRetQty').val();
        var TCanQty = $('#txtTotCanQty').val();
        var TOCanQty = $('#txtTotOutCanQty').val();


        if (TRetQty != TCanQty) {
            //alert("Input Return and Input Cancel Qty Should be Equal..");
            var msg = 'Input Return and Input Cancel quantity Should be Equal...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return true;
        }


        if (ProcessSetup == "C" || ProcessSetup == "S" || ProcessSetup == "K") { }
        else {

            if (TOCanQty != TCanQty) {
                //alert("Input Cancel and OutPut Cancel Qty Should be Equal..");
                var msg = 'Input Cancel and OutPut Cancel quantity Should be Equal...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                return true;
            }
        }


        //if (TOCanQty != TCanQty) {
        //    alert("Input Cancel and OutPut Cancel Qty Should be Equal..");
        //    return true;
        //}

        var ordtype = $('input[name="Revert"]:checked').attr('value');

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

        var ObjAdd = {
            companyid: gcompid,
            processid: gproid,
            proc_recpt_masid: Masid,
            proc_recpt_no: $("#txtReceiptno").val(),
            proc_recpt_date: $("#txtReceiptDate").val(),//new Date($('#txtReceiptDate').val()),
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
            InspDate: $("#txtReceiptDate").val(),// new Date($('#txtReceiptDate').val()),//
            //InspNo: 'S',
            EWayDate: $("#txtReceiptDate").val(),// new Date($('#txtReceiptDate').val()),
            //EWayNo: 'O',       
            ProcRetItmDet: ItmList


        }
        $("#btnUpdate").attr("disabled", true);
        LoadingSymb();
        $.ajax({
            url: "/ProcessReturn/Update",
            data: JSON.stringify(ObjAdd),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                debugger;
                if (result.Value == true) {
                    cancelupdate();

                    //alert('Data Updated Successfully');
                    AddUserEntryLog('Process', 'Process Return', 'UPDATE', $("#txtReceiptno").val());
                    $("#btnUpdate").attr("disabled", false);
                    //window.location.href = "/ProcessReturn/ProcessReturnIndex";
                    var msg = 'Data Updated Successfully...';
                    var flg = 1;
                    var mod = 0;
                    var url = "/ProcessReturn/ProcessReturnIndex";
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
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    $.ajax({
        url: "/ProcessReturn/LoadMaingriddet",
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
            $('#txtCancelno').val(obj[0].CancelNo);
            $('#txtCancelrefNo').val(obj[0].CancelRefNo);
            $('#txtCancelRefDate').val(moment(obj[0].CancelRefDate).format("DD/MM/YYYY"));//.val(obj[0].CancelRefDate);
            $('#txtCancelDate').val(moment(obj[0].Canceldate).format("DD/MM/YYYY"));//.val(obj[0].Canceldate);

            var pdn = obj[0].proc_recpt_no;
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
            CanMasId = obj[0].CancelMasId;
            LoadEditInputItm(masid, pdn);
            LoadEditOutItm(CanMasId);
            CheckAlloted();
            //LoadEditInputJobdet(masid);
        },

        failure: function (errMsg) {
            alert(errMsg);
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
        ProcRetItmDet: ItmList

    }
    $("#btnDel").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/ProcessReturn/Delete",
        data: JSON.stringify(ObjAdd),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Value == true) {
                canceldelete();

                //alert('Data Deleted Successfully');
                AddUserEntryLog('Process', 'Process Return', 'DELETE', $("#txtReceiptno").val());
                $("#btnDel").attr("disabled", false);
                //window.location.href = "/ProcessReturn/ProcessReturnIndex";
                var msg = 'Data Deleted Successfully...';
                var flg = 2;
                var mod = 0;
                var url = "/ProcessReturn/ProcessReturnIndex";
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



function ProcRetPrint(Id) {
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

    window.open("../ReportInline/Process/ProcessReturn/ProcessReturnReportInline.aspx?Masid=" + Repid + "&RetlossDet=" + p[0] + "&Ins=" + p[1] + "&Ewaybill=" + p[2] + "&Ewaydate=" + p[3] + "&Companyid=" + compid + "&Userid=" + LoginUserid);


}

function backtomain() {
    $("#myModal2").hide();
    $("#myModal2").modal('hide');
}


function cancelupdate() {
    debugger;
    var res = cancelvalidate();
    if (res == false) {
        return false;
    }


    var detlist = [];

    var detlist2 = [];

    var jobdetlist = [];
    for (var y = 0; y < ItmList.length; y++) {
        if (ItmList[y].cancelqty > 0) {

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



    var ipdet = [];
    debugger;
    var newArray = [];
    $.each(detlist, function (key, value) {
        var exists = false;
        var rate = 0;
        $.each(newArray, function (k, val2) {
            if (value.itemid == val2.itemid && value.colorid == val2.colorid && value.sizeid == val2.sizeid && value.plansizeid == val2.plansizeid && value.ProcessOrdDetid == val2.ProcessOrdDetid) { exists = true; };
        });

        if (exists == false && value.itemid != "" && value.colorid != "" && value.sizeid != "" && value.plansizeid != "" && value.ProcessOrdDetid != "" && value.InorOut == "I") { newArray.push(value); }
    });
    ipdet = newArray;



    $.each(ipdet, function (i) {

        var cancledqty = 0;
        var canlqty = 0;
        var sqty = 0;


        $.each(detlist, function (k) {
            if (ipdet[i].itemid == detlist[k].itemid && ipdet[i].colorid == detlist[k].colorid && ipdet[i].sizeid == detlist[k].sizeid && ipdet[i].plansizeid == detlist[k].plansizeid
                && ipdet[i].ProcessOrdDetid == detlist[k].ProcessOrdDetid && detlist[k].InorOut == "I") {

                cancledqty += parseFloat(detlist[k].Canceled_qty);
                sqty += parseFloat(detlist[k].Sec_Qty);
                canlqty += parseFloat(detlist[k].Cancel_Qty);
            }

        });

        ipdet[i].Canceled_qty = cancledqty;
        ipdet[i].Sec_Qty = sqty;
        ipdet[i].Cancel_Qty = canlqty;

    });




    var opdet = [];

    debugger;
    var newArray = [];
    $.each(detlist, function (key, value) {
        var exists = false;
        var rate = 0;
        $.each(newArray, function (k, val2) {
            if (value.itemid == val2.itemid && value.colorid == val2.colorid && value.sizeid == val2.sizeid && value.plansizeid == val2.plansizeid && value.ProcessOrdDetid == val2.ProcessOrdDetid) { exists = true; };
        });

        if (exists == false && value.itemid != "" && value.colorid != "" && value.sizeid != "" && value.plansizeid != "" && value.ProcessOrdDetid != "" && value.InorOut == "O") { newArray.push(value); }
    });
    opdet = newArray;



    $.each(opdet, function (i) {

        var cancledqty = 0;
        var canlqty = 0;
        var sqty = 0;

        $.each(detlist, function (k) {
            if (opdet[i].itemid == detlist[k].itemid && opdet[i].colorid == detlist[k].colorid && opdet[i].sizeid == detlist[k].sizeid && opdet[i].plansizeid == detlist[k].plansizeid
                && opdet[i].ProcessOrdDetid == detlist[k].ProcessOrdDetid && detlist[k].InorOut == "O") {

                cancledqty += parseFloat(detlist[k].Canceled_qty);
                sqty += parseFloat(detlist[k].Sec_Qty);
                canlqty += parseFloat(detlist[k].Cancel_Qty);
            }

        });

        opdet[i].Canceled_qty = cancledqty;
        opdet[i].Sec_Qty = sqty;
        opdet[i].Cancel_Qty = canlqty;

    });


    for (var y = 0; y < ipdet.length; y++) {
        if (ipdet[y].Cancel_Qty > 0) {

            var obj = {
                ProcessOrdId: ipdet[y].ProcessOrdId,
                itemid: ipdet[y].itemid,
                sizeid: ipdet[y].sizeid,
                plansizeid: ipdet[y].plansizeid,
                colorid: ipdet[y].colorid,
                Canceled_qty: ipdet[y].Canceled_qty,
                Sec_Qty: ipdet[y].Sec_Qty,
                InorOut: "I",


                Job_Ord_No: ipdet[y].Job_Ord_No,
                ProdPrgNo: ipdet[y].ProdPrgNo,
                SequenceNo: ipdet[y].SequenceNo,
                Cancel_Qty: ipdet[y].Cancel_Qty,
                ProcessOrdDetid: ipdet[y].ProcessOrdDetid,
                ProcessOrdJobDetid: ipdet[y].ProcessOrdJobDetid,
            }
            detlist2.push(obj);
        }
    }
    for (var m = 0; m < opdet.length; m++) {
        if (opdet[m].Cancel_Qty > 0) {

            var obj = {
                ProcessOrdId: opdet[m].ProcessOrdId,
                itemid: opdet[m].itemid,
                sizeid: opdet[m].sizeid,
                plansizeid: opdet[m].plansizeid,
                colorid: opdet[m].colorid,
                Canceled_qty: opdet[m].Canceled_qty,
                Sec_Qty: opdet[m].Sec_Qty,
                InorOut: "O",

                Job_Ord_No: opdet[m].Job_Ord_No,
                ProdPrgNo: opdet[m].ProdPrgNo,
                SequenceNo: opdet[m].SequenceNo,
                Cancel_Qty: opdet[m].Cancel_Qty,
                ProcessOrdDetid: opdet[m].ProcessOrdDetid,
                ProcessOrdJobDetid: opdet[m].ProcessOrdJobDetid,
            }
            detlist2.push(obj);
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
        ProcDet: detlist2,
        ProcJobDet: jobdetlist,
        ProcObj: detlist

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


function canceldelete() {
    debugger;
    var res = cancelvalidate();
    if (res == false) {
        return false;
    }


    var detlist = [];

    var detlist2 = [];

    var jobdetlist = [];
    for (var y = 0; y < ItmList.length; y++) {
        if (ItmList[y].cancelqty > 0) {

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



    var ipdet = [];
    debugger;
    var newArray = [];
    $.each(detlist, function (key, value) {
        var exists = false;
        var rate = 0;
        $.each(newArray, function (k, val2) {
            if (value.itemid == val2.itemid && value.colorid == val2.colorid && value.sizeid == val2.sizeid && value.plansizeid == val2.plansizeid && value.ProcessOrdDetid == val2.ProcessOrdDetid) { exists = true; };
        });

        if (exists == false && value.itemid != "" && value.colorid != "" && value.sizeid != "" && value.plansizeid != "" && value.ProcessOrdDetid != "" && value.InorOut == "I") { newArray.push(value); }
    });
    ipdet = newArray;



    $.each(ipdet, function (i) {

        var cancledqty = 0;
        var canlqty = 0;
        var sqty = 0;


        $.each(detlist, function (k) {
            if (ipdet[i].itemid == detlist[k].itemid && ipdet[i].colorid == detlist[k].colorid && ipdet[i].sizeid == detlist[k].sizeid && ipdet[i].plansizeid == detlist[k].plansizeid
                && ipdet[i].ProcessOrdDetid == detlist[k].ProcessOrdDetid && detlist[k].InorOut == "I") {

                cancledqty += parseFloat(detlist[k].Canceled_qty);
                sqty += parseFloat(detlist[k].Sec_Qty);
                canlqty += parseFloat(detlist[k].Cancel_Qty);
            }

        });

        ipdet[i].Canceled_qty = cancledqty;
        ipdet[i].Sec_Qty = sqty;
        ipdet[i].Cancel_Qty = canlqty;

    });




    var opdet = [];

    debugger;
    var newArray = [];
    $.each(detlist, function (key, value) {
        var exists = false;
        var rate = 0;
        $.each(newArray, function (k, val2) {
            if (value.itemid == val2.itemid && value.colorid == val2.colorid && value.sizeid == val2.sizeid && value.plansizeid == val2.plansizeid && value.ProcessOrdDetid == val2.ProcessOrdDetid) { exists = true; };
        });

        if (exists == false && value.itemid != "" && value.colorid != "" && value.sizeid != "" && value.plansizeid != "" && value.ProcessOrdDetid != "" && value.InorOut == "O") { newArray.push(value); }
    });
    opdet = newArray;



    $.each(opdet, function (i) {

        var cancledqty = 0;
        var canlqty = 0;
        var sqty = 0;

        $.each(detlist, function (k) {
            if (opdet[i].itemid == detlist[k].itemid && opdet[i].colorid == detlist[k].colorid && opdet[i].sizeid == detlist[k].sizeid && opdet[i].plansizeid == detlist[k].plansizeid
                && opdet[i].ProcessOrdDetid == detlist[k].ProcessOrdDetid && detlist[k].InorOut == "O") {

                cancledqty += parseFloat(detlist[k].Canceled_qty);
                sqty += parseFloat(detlist[k].Sec_Qty);
                canlqty += parseFloat(detlist[k].Cancel_Qty);
            }

        });

        opdet[i].Canceled_qty = cancledqty;
        opdet[i].Sec_Qty = sqty;
        opdet[i].Cancel_Qty = canlqty;

    });


    for (var y = 0; y < ipdet.length; y++) {
        if (ipdet[y].Cancel_Qty > 0) {

            var obj = {
                ProcessOrdId: ipdet[y].ProcessOrdId,
                itemid: ipdet[y].itemid,
                sizeid: ipdet[y].sizeid,
                plansizeid: ipdet[y].plansizeid,
                colorid: ipdet[y].colorid,
                Canceled_qty: ipdet[y].Canceled_qty,
                Sec_Qty: ipdet[y].Sec_Qty,
                InorOut: "I",


                Job_Ord_No: ipdet[y].Job_Ord_No,
                ProdPrgNo: ipdet[y].ProdPrgNo,
                SequenceNo: ipdet[y].SequenceNo,
                Cancel_Qty: ipdet[y].Cancel_Qty,
                ProcessOrdDetid: ipdet[y].ProcessOrdDetid,
                ProcessOrdJobDetid: ipdet[y].ProcessOrdJobDetid,
            }
            detlist2.push(obj);
        }
    }
    for (var m = 0; m < opdet.length; m++) {
        if (opdet[m].Cancel_Qty > 0) {

            var obj = {
                ProcessOrdId: opdet[m].ProcessOrdId,
                itemid: opdet[m].itemid,
                sizeid: opdet[m].sizeid,
                plansizeid: opdet[m].plansizeid,
                colorid: opdet[m].colorid,
                Canceled_qty: opdet[m].Canceled_qty,
                Sec_Qty: opdet[m].Sec_Qty,
                InorOut: "O",

                Job_Ord_No: opdet[m].Job_Ord_No,
                ProdPrgNo: opdet[m].ProdPrgNo,
                SequenceNo: opdet[m].SequenceNo,
                Cancel_Qty: opdet[m].Cancel_Qty,
                ProcessOrdDetid: opdet[m].ProcessOrdDetid,
                ProcessOrdJobDetid: opdet[m].ProcessOrdJobDetid,
            }
            detlist2.push(obj);
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
        ProcDet: detlist2,
        ProcJobDet: jobdetlist,
        ProcObj: detlist

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

$(document).ready(function () {

    $('#tblitmdetails').on('click', 'tr', function (e) {
        debugger;

        var table = $('#tblitmdetails').DataTable();
        var row = $(this).closest('tr');
        var data = $('#tblitmdetails').dataTable().fnGetData(row);


        //var StRId = data.StyleRowId;//table.row($(this).parents('tr')).data()["StyleRowId"];
        var OpItmId = data.opitmid;//table.row($(this).parents('tr')).data()["ItemID"];
        //var ClrId = data.ColorID;//table.row($(this).parents('tr')).data()["ColorID"];
        //var SzId = data.SizeID;//table.row($(this).parents('tr')).data()["SizeID"];
        //var PUId = data.PurUomId;//table.row($(this).parents('tr')).data()["PurUomId"];
        //var InDetId = data.IndDetId;
        var ordno = data.ordno;


        // if (OrderType != "G") {
       // if (Mode == 0 || Mode == 1) {


            var colorempty = [];
            colorempty = OPItmList;

            colorempty = $.grep(colorempty, function (v) {
                return (v.itmid === OpItmId && v.ordno === ordno);
            });

            LoadOpItmtab(colorempty);

        //}
        //  }

    });
});

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

//function LoadEmployeeStoreunit() {
//    debugger;
//    if (UserName == 'superuser') {
//        LoginUserid = 0;
//    }

//    $.ajax({
//        url: "/StoreSetup/GetStoreRights",
//        data: JSON.stringify({ Userid: LoginUserid, Storetype: 'M', Companyid: CompanyId }),
//        type: "POST",
//        contentType: "application/json;charset=utf-8",
//        dataType: "json",
//        success: function (result) {
//            debugger;
//            var data = result.Value;
//            $(ddlMSMMainStore).empty();
//            $(ddlMSMMainStore).append($('<option/>').val('0').text('--Select Store--'));
//            $.each(data, function () {
//                $(ddlMSMMainStore).append($('<option></option>').val(this.Storeid).text(this.StoreName));
//            });
//            $(ddlMSMMainStore).trigger("select2:updated");

//            $(ddlSCompany).empty();
//            $(ddlSCompany).append($('<option/>').val('0').text('--Select Store--'));
//            $.each(data, function () {
//                $(ddlSCompany).append($('<option></option>').val(this.Storeid).text(this.StoreName));
//            });
//            $(ddlSCompany).trigger("select2:updated");

//        },
//        failure: function (errMsg) {
//            alert(errMsg);
//        }
//    });

//    $.ajax({
//        url: "/StoreSetup/GetStoreRights",
//        data: JSON.stringify({ Userid: LoginUserid, Storetype: 'B', Companyid: CompanyId }),
//        type: "POST",
//        contentType: "application/json;charset=utf-8",
//        dataType: "json",
//        success: function (result) {
//            debugger;
//            var data = result.Value;
//            $(ddlSMainStore).empty();
//            $(ddlSMainStore).append($('<option/>').val('0').text('--Select Store--'));
//            $.each(data, function () {
//                $(ddlSMainStore).append($('<option></option>').val(this.Storeid).text(this.StoreName));
//            });
//            $(ddlSMainStore).trigger("select2:updated");

//        },
//        failure: function (errMsg) {
//            alert(errMsg);
//        }
//    });


//}


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

function GetProcessSetup() {
    debugger;
 
    var id = Processid;
    $.ajax({
        url: "/ProcessSetup/GetbyprocessID",
        data: JSON.stringify({ ProcessId: id }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            if (result.Status == 'SUCCESS') {
                var obj = result.Value;
                ProcessSetup = obj.CuttingorSewing;
            }

        }

    });
   
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