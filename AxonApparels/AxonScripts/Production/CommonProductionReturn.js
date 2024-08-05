var DetRowID = 0;
var ProdReceiptNo = 0;
var Reasonseq = 0;
var processid = 0;
var companyid = 0;
var ReturnId = 0;
var ReturnNo = 0;
var HeaderInfo = 0;
var supplierid = 0;
var issuetype = 0;
var InterExter = 0;
var WJS = 0;
var companyunitid = 0;
var workdivid = 0;
var fromdate, todate = 0;
var MultipleProdIssueDet = [];
var ProdReturnDet = [];
var maintbllist = [];
var table, column, compId, Docum;
var Userid = 0;
var UserName = 0;
var Mode = 0;
var ProdReturnId = 0;
var MainFDate = 0;
var repobj = [];
var Repid = 0;
var Guserid = 0;
var DCompid = 0;
var ChkRefno = true;
var ChkOrdno = true;
var DtChk = false;
var ChkRetno = true;
var ChkPrgNo = true;
var ChkProc = true;
var ChkComp = false;
var LoginUserid = '';
var editmasunitstore = 0;
var CompanyId = 0;
var CommProdRetEditFlg = "disabled";
var CommProdRetDeleteFlg = "disabled";
var CommProdRetPrintFlg = "disabled";
var Reasonlist = [];
var Reasonlistdet = [];
var retchk = '';
var ProdPrgDetId = 0;
var Rejectionqty = 0;
var ReworkProcQty = 0;
var ProdIssdetID = 0;

$(document).ready(function () {

    Guserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    MainFDate = $("#hdMainFromDate").data('value');
    DCompid = $("#hdnDCompid").data('value');
    LoginUserid = $("#hdnLoginUserid").data('value');
    LoadCompanyDDL("#ddlMCompany,#ddlCompany,#ddlfinCompany");
    LoadProcessDDL("#ddlProcess,#ddlfinProcess");
    LoadWorkdivisionDDL("#ddlWorkdiv,#ddlfinWorkdiv");
    LoadStyleDDL("#ddlStyle");
    LoadOrderNoDDL("#ddlOrderNo");
    LoadSupplierDDL("#ddlSupplier,#ddlfinSupplier");
    LoadProcessDDL('#ddlReProcess');
    LoadReasonDDL("#ddlreason");
    //LoadStoreUnitDDL("#ddlStore");
    loadReasonTable(Reasonlist);
    LoadRefNoDDL('#ddlRefNo');

    $('#txtFromDate').val(MainFDate);
    $('#txtToDate').val(moment(new Date()).format('DD/MM/YYYY'));

    fromdate = $("#txtFromDate").val();
    todate = $("#txtToDate").val();

    if ($('#optMinter').is(':checked')) {
        InterExter = "I";
    }
    else if ($('#optMexter').is(':checked')) {
        InterExter = "E";
    }

    $("#selectall").change(function () {

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
    LoadData(companyid, fromdate, todate, InterExter);
    LoadDDL(companyid, fromdate, todate, InterExter);

    ShowHideIntExt();

    $("#btninnerclose").click(function () {
        $('#myModal').modal('hide');
        DetRowID = 0;
    });

    $("#btnclose").click(function () {
        $('#myModal1').modal('hide');
    });

    $(document).on('click', '.btnmaingrddelete', function () {

        Mode = 2;

        rowindex = $(this).closest('tr').index();

        var currow = maintbllist.slice(rowindex);
        ProdReturnId = currow[0]['ReturnId'];

        $('#myModal1').modal('show');
        $('#btnAdd').hide();
        $('#btnDel').show();
        $('#btnUpdate').hide();

        getbyID(ProdReturnId);
        //Delete(ProdReturnId);
    });

    $("#btnsubmit").click(function () {
        debugger;
        companyid = $("#ddlMCompany").val();
        processid = $("#ddlProcess").val();
        workdivid = $("#ddlWorkdiv").val();
        supplierid = $("#ddlSupplier").val();

        var Supplier = $('select#ddlSupplier option:selected').text();
        var WorkDiv = $('select#ddlWorkdiv option:selected').text();

        if (supplierid == 0) {
            $("#txtWorkDivId").val(workdivid);
            $("#txtWorkDiv").val(WorkDiv);
        } else {
            $("#txtWorkDivId").val(supplierid);
            $("#txtWorkDiv").val(Supplier);
        }

        //$("#txtWorkDiv").val(Supplier);
        //$("#txtWorkDiv").val(Supplier);

        $('#txtRefDate').val(moment(new Date()).format('DD/MM/YYYY'));
        $('#txtRetDate').val(moment(new Date()).format('DD/MM/YYYY'));

        if (processid == 0) {
            //alert("Select Store to proceed...");
            //$('#ddlProcess').css('border-color', 'red');
            $('#ddlProcess').siblings(".select2-container").css('border', '1px solid red');
        }
        else if (workdivid == 0 && $("#optinnerinter").is(':checked')) {
            //$('#ddlWorkdiv').css('border-color', 'red');
            //$('#ddlSupplier').css('border-color', 'lightgrey');
            $('#ddlWorkdiv').siblings(".select2-container").css('border', '1px solid red');
            $('#ddlSupplier').siblings(".select2-container").css('border', '1px solid lightgrey');
        }
        else if (supplierid == 0 && $("#optinnerexter").is(':checked')) {
            //$('#ddlSupplier').css('border-color', 'red');
            //$('#ddlWorkdiv').css('border-color', 'lightgrey');
            $('#ddlSupplier').siblings(".select2-container").css('border', '1px solid red');
            $('#ddlWorkdiv').siblings(".select2-container").css('border', '1px solid lightgrey');
        }
        else {
            $("#ddlfinCompany").val(companyid);
            $("#ddlfinProcess").val(processid);

            if (InterExter == "I") {
                $("#lblfinprocessor").hide();
                $("#ddlfinSupplier").hide();

                $("#lblfinworkdiv").show();
                $("#ddlfinWorkdiv").show();

                $("#ddlfinWorkdiv").val(workdivid);
            }
            else if (InterExter == "E") {
                $("#lblfinprocessor").show();
                $("#ddlfinSupplier").show();

                $("#lblfinworkdiv").hide();
                $("#ddlfinWorkdiv").hide();

                $("#ddlfinSupplier").val(supplierid);
            }

            GenerateProductionReturnNumber(table, column, compId, Docum);

            $('#myModal1').modal('show');

            if (DetRowID != 0) {
                LoadCommonProdReciptList(DetRowID);
            }
            else {
                LoadCommonProdReciptList(0);
            }
            LoadEmployeeStoreunit();
            $('#btnAdd').show();
            $('#btnUpdate').hide();
            $('#btnDel').hide();
        }
    });

    $("#btnaddnew").click(function () {

        DetRowID = 0;
        companyid = $("#ddlMCompany").val();
        //companyunitid = $("#ddlMUnit").val();
        LoadSampleorBuyer();

        if (companyid == 0) {
            //alert("Please select Company");
            var msg = 'Please select Company...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
        }
        else {
            $("#ddlCompany").val(companyid);
            //$("#ddlUnit").val(companyunitid);
            $('#ddlProcess').val(0);
            $('#ddlWorkdiv').val(0);
            $('#ddlOrderNo').val(0);
            $('#myModal').modal('show');
            var IorE = $('input[name="optinnerinterexter"]:checked').attr('value');
            var compId=companyid;
            var processid=$("#ddlProcess").val();
            var orderType = $('input[name="optwjs"]:checked').attr('value');
            LoadCommonProductionIssueList(IorE, compId, processid, orderType);
            loadIssNo(IorE, compId, processid, orderType);

        }
    });

    //$("#ddlMCompany").change(function () {
    //   // ListFilter();
    //});

    $("#optinnerinter").change(function () {
        ShowHideIntExt();
    });

    $("#optinnerexter").change(function () {
        ShowHideIntExt();
    });

    $(document).on('click', '.btnreasonremove', function () {
        debugger;
        var table = $('#tblreason').DataTable();
        var row = $(this).closest('tr');
        var data = $('#tblreason').dataTable().fnGetData(row);
        var ProdPrgDetId = data.ProdPrgDetId;
        var ReworkProcessid = data.ReworkProcessid;
        var ReasonId = data.ReasonId;
        var colorempty = [];
        $.each(Reasonlist, function (v) {
            if (Reasonlist[v].ProdPrgDetId == ProdPrgDetId && Reasonlist[v].ReworkProcessid == ReworkProcessid && Reasonlist[v].ReasonId == ReasonId) { }
            else {
                colorempty.push(Reasonlist[v]);
            }
        });
        Reasonlist = colorempty;

        var colorempty2 = [];
        colorempty2 = Reasonlist;
        colorempty2 = $.grep(colorempty2, function (v) {
            return (v.ProdPrgDetId == ProdPrgDetId);
        });
        Reasonlistdet = colorempty2;
        loadReasonTable(Reasonlistdet);
    });

    $(document).on('click', '.btnreworkremove', function () {
        debugger;
        var table = $('#tblrework').DataTable();
        var row = $(this).closest('tr');
        var data = $('#tblrework').dataTable().fnGetData(row);
        var ProdPrgDetId = data.ProdPrgDetId;
        var ReworkProcessid = data.ReworkProcessid;
        var ReasonId = data.ReasonId;

        var colorempty = [];
        // colorempty = comboList;
        $.each(Reasonlist, function (v) {
            if (Reasonlist[v].ProdPrgDetId == ProdPrgDetId && Reasonlist[v].ReworkProcessid == ReworkProcessid && Reasonlist[v].ReasonId == ReasonId) { }
            else {
                colorempty.push(Reasonlist[v]);
            }
        });
        Reasonlist = colorempty;

        var colorempty2 = [];
        colorempty2 = Reasonlist;
        colorempty2 = $.grep(colorempty2, function (v) {
            return (v.ProdPrgDetId == ProdPrgDetId);
        });
        Reasonlistdet = colorempty2;
        loadReasonTable(Reasonlistdet);
    });
    $(document).on('click', '.btnmaingrdedit', function () {

        Mode = 1;
        rowindex = $(this).closest('tr').index();

        var currow = maintbllist.slice(rowindex);
        ReturnId = currow[0]['ReturnId'];
        ReturnNo = currow[0]['ReturnNo'];

        $('#myModal1').modal('show');
        $('#btnAdd').hide();
        $('#btnDel').hide();
        $('#btnUpdate').show();

        getbyID(ReturnId);
    });

    $("#optwork").change(function () {
        processid = $('#ddlProcess').val();

        getOrdertype();

        if (processid != 0) {
            $('#ddlProcess').css('border-color', 'lightgrey');
            LoadCommonProductionIssueList(InterExter, companyid, processid, WJS);
        }
    });

    $("#optjob").change(function () {
        processid = $('#ddlProcess').val();

        getOrdertype();

        if (processid != 0) {
            $('#ddlProcess').css('border-color', 'lightgrey');
            LoadCommonProductionIssueList(InterExter, companyid, processid, WJS);
        }
    });

    $("#optsamord").change(function () {
        LoadSampleorBuyer();

        processid = $('#ddlProcess').val();
        getOrdertype();
        if (processid != 0) {
            $('#ddlProcess').css('border-color', 'lightgrey');
            LoadCommonProductionIssueList(InterExter, companyid, processid, WJS);
        }
    });

    $("#optbulkord").change(function () {
        LoadSampleorBuyer();

        processid = $('#ddlProcess').val();
        getOrdertype();
        if (processid != 0) {
            $('#ddlProcess').css('border-color', 'lightgrey');
            LoadCommonProductionIssueList(InterExter, companyid, processid, WJS);
        }
    });

    $("#ddlWorkdiv").change(function () {
        workdivid = $('#ddlWorkdiv').val();
        if (workdivid > 0) {
            $('#ddlWorkdiv').css('border-color', 'lightgrey');
        }
    });

    $("#ddlSupplier").change(function () {
        supplierid = $('#ddlSupplier').val();
        if (supplierid > 0) {
            $('#ddlSupplier').css('border-color', 'lightgrey');
        }
    });

    $("#ddlProcess").change(function () {

        processid = $('#ddlProcess').val();

        getOrdertype();

        if (processid != 0) {
            $('#ddlProcess').css('border-color', 'lightgrey');
            LoadCommonProductionIssueList(InterExter, companyid, processid, WJS);
            loadIssNo(InterExter, companyid, processid, WJS);
        }
    });

    $(document).on('keyup', '.txtreturnqty', function () {


        var table = $('#tblreceipt').DataTable();
        var row = $(this).closest('tr');
        var data = $('#tblreceipt').dataTable().fnGetData(row);

        var Val = $(this).val();

        ProdPrgDetId = data.Prodprgdetid;
        Rejectionqty = data.RejectQty;
        ReworkProcQty = data.ReworkQty;
        ProdIssdetID = data.Prodissdetid;
        var Balqty = data.Balqty;
        var issqty = parseFloat(Rejectionqty) + parseFloat(ReworkProcQty) + parseFloat(Val);


        if (issqty > Balqty) {
            //alert("Return Qty should not exceed than Issue Qty");
            var msg = 'Return quantity should not exceed than Issue quantity...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
            $.each(ProdReturnDet, function (i) {
                if (ProdReturnDet[i].Prodprgdetid == ProdPrgDetId) {
                    ProdReturnDet[i].Returnqty = 0;
                    Val = 0;
                }
            });


        } else {
            $.each(ProdReturnDet, function (i) {
                if (ProdReturnDet[i].Prodprgdetid == ProdPrgDetId) {
                    ProdReturnDet[i].Returnqty = Val;
                }
            });
        }

        //LoadReceiptGrid(ProdReturnDet);

        var otable = $('#tblreceipt').DataTable();
        var odata = otable.rows().data();

        $('input[id=txtreturnqty]').each(function (ig) {
            if (odata[ig].Prodissdetid == ProdIssdetID && odata[ig].Prodprgdetid == ProdPrgDetId) {
                var row = $(this).closest('tr');

                row.find('#txtreturnqty').focus().val('').val(Val);
            }
        });

        //rowindex = $(this).closest('tr').index();

        //if (ProdReturnDet != undefined) {
        //    //ProdReturnDet = $.grep(ProdReturnDet, function (element, index) {
        //    //    //return (element.ProdDetId == currowind[0]['ProductionDetId']);
        //    //    return (element.ItemId == ItemId && element.ColorId == ColorId && element.SizeId == SizeId);
        //    //});
        //    ProdReturnDet.sort(function (a, b) {
        //        if (a.Prodprgdetid < b.Prodprgdetid) return -1;
        //        if (a.Prodprgdetid > b.Prodprgdetid) return 1;
        //        return 0;
        //    })
        //}

        //var currowind = ProdReturnDet.slice(rowindex);
        ////currowind[0]['ProdPrgId'] = $("#txtordqty").val();
        //currowind[0]['Returnqty'] = $(this).val();

        //for (var i in ProdReturnDet) {
        //    if (ProdReturnDet[i]['ProdIssueId'] == currowind[0]['ProdIssueId']) {

        //        if ($(this).val() > ProdReturnDet[rowindex]['Balqty']) {
        //            //if ($(this).val() > diffqty) {
        //            alert("Return Qty should not exceed than Issue Qty");

        //            ProdReturnDet[rowindex]['Returnqty'] = 0;
        //        }
        //        else {
        //            ProdReturnDet[rowindex]['Returnqty'] = $(this).val();
        //        }
        //        break; //Stop this loop, we found it!
        //    }
        //}
        //ProdReturnDet[rowindex] = currowind[0];
        //LoadReceiptGrid(ProdReturnDet);
    });

    $(document).on('keyup', '.txtrejqty', function () {

        debugger;
        var table = $('#tblreceipt').DataTable();
        var row = $(this).closest('tr');
        var data = $('#tblreceipt').dataTable().fnGetData(row);

        var Val = $(this).val();

        ProdPrgDetId = data.Prodprgdetid;
        var Returnqty = data.Returnqty;
        ReworkProcQty = data.ReworkQty;
        ProdIssdetID = data.Prodissdetid;
        var Balqty = data.Balqty;
        var issqty = parseFloat(Returnqty) + parseFloat(ReworkProcQty) + parseFloat(Val);


        if (issqty > Balqty) {
            //alert("Rejection Qty should not exceed than Issue Qty");
            var msg = 'Rejection quantity should not exceed than Issue quantity...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
            $.each(ProdReturnDet, function (i) {
                if (ProdReturnDet[i].Prodprgdetid == ProdPrgDetId) {
                    ProdReturnDet[i].RejectQty = 0;
                    Rejectionqty = 0;
                }
            });


        } else {
            $.each(ProdReturnDet, function (i) {
                if (ProdReturnDet[i].Prodprgdetid == ProdPrgDetId) {
                    ProdReturnDet[i].RejectQty = Val;
                    Rejectionqty = Val;
                }
            });
        }

        // LoadReceiptGrid(ProdReturnDet);

        var otable = $('#tblreceipt').DataTable();
        var odata = otable.rows().data();

        $('input[id=txtrejqty]').each(function (ig) {
            if (odata[ig].Prodissdetid == ProdIssdetID && odata[ig].Prodprgdetid == ProdPrgDetId) {
                var row = $(this).closest('tr');

                row.find('#txtrejqty').focus().val('').val(Rejectionqty);
            }
        });


    });

    $(document).on('keyup', '.txtrewrkqty', function () {
        debugger;

        var table = $('#tblreceipt').DataTable();
        var row = $(this).closest('tr');
        var data = $('#tblreceipt').dataTable().fnGetData(row);

        var Val = $(this).val();

        ProdPrgDetId = data.Prodprgdetid;
        var Returnqty = data.Returnqty;
        Rejectionqty = data.RejectQty;
        ProdIssdetID = data.Prodissdetid;
        var Balqty = data.Balqty;
        var issqty = parseFloat(Returnqty) + parseFloat(Rejectionqty) + parseFloat(Val);


        if (issqty > Balqty) {
            //alert("Rejection Qty should not exceed than Issue Qty");
            var msg = 'Rejection quantity should not exceed than Issue quantity...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
            $.each(ProdReturnDet, function (i) {
                if (ProdReturnDet[i].Prodprgdetid == ProdPrgDetId) {
                    ProdReturnDet[i].ReworkQty = 0;
                    ReworkProcQty = 0;
                }
            });


        } else {
            $.each(ProdReturnDet, function (i) {
                if (ProdReturnDet[i].Prodprgdetid == ProdPrgDetId) {
                    ProdReturnDet[i].ReworkQty = Val;
                    ReworkProcQty = Val;
                }
            });
        }

        //LoadReceiptGrid(ProdReturnDet);
        var otable = $('#tblreceipt').DataTable();
        var odata = otable.rows().data();

        $('input[id=txtrejqty]').each(function (ig) {
            if (odata[ig].Prodissdetid == ProdIssdetID && odata[ig].Prodprgdetid == ProdPrgDetId) {
                var row = $(this).closest('tr');
                row.find('#txtrejqty').focus().val('').val(ReworkProcQty);
            }
        });
    });


    $('#tblprodreturnmaingrid').on('click', 'tr', function (e) {


        var table = $('#tblprodreturnmaingrid').DataTable();

        var row = $(this).closest('tr');
        var data = $('#tblprodreturnmaingrid').dataTable().fnGetData(row);
        var ProcessOrdNo = data.ReturnNo;
        LoadItemMovements(ProcessOrdNo);
    });

    $(document).on('keyup', '.txtrejectedqty', function () {

        var table = $('#tblreceipt').DataTable();
        //rowindex = $(this).closest('tr').index();
        var currrejectedqty = 0;
        var currreceivedqty = 0;
        var curracceptqty = 0;
        var currreworkqty = 0;
        var Totrejectedqty = 0;

        var Prgdetid = table.row($(this).parents('tr')).data()["ProdPrgDetId"];

        for (var i in ProdReceiptDet) {
            if (ProdReceiptDet[i]['ProdPrgDetId'] == Prgdetid) {
                //if ((parseInt($(this).val()) + parseint(ProdReceiptDet[i]['ReceivedQty'])) > parseInt(ProdReceiptDet[i]['Balance'])) {
                currrejectedqty = $(this).val();
                currreceivedqty = ProdReceiptDet[i]['ReceivedQty'];
                currreworkqty = ProdReceiptDet[i]['ReworkQty'];
                curracceptqty = ProdReceiptDet[i]['AcceptQty'];
                Totrejectedqty = Number(currrejectedqty) + Number(curracceptqty) + Number(currreworkqty);

                if (Totrejectedqty > ProdReceiptDet[i]['ReceivedQty']) {
                    //alert("AcceptQty + Rejected Qty +ReworkQty should not exceed than Received Qty...");
                    var msg = 'Accept quantity + Rejected quantity + Rework quantity should not exceed than Received quantity...';
                    var flg = 4;
                    var mod = 1;
                    var ur = "";
                    AlartMessage(msg, flg, mod, ur);
                    ProdReceiptDet[i]['RejectQty'] = 0;
                }
                else {
                    ProdReceiptDet[i]['RejectQty'] = $(this).val();
                }
                break; //Stop this loop, we found it!
            }
        }


        LoadReceiptGrid(ProdReceiptDet);
        var table = $('#tblreceipt').DataTable();
        var ecdata = table.rows().data();

        $('input[id=txtrejectedqty]').each(function (ig) {

            var row = $(this).closest('tr');
            for (var h = 0; h < ProdReceiptDet.length; h++) {

                if (ecdata[ig].ProdPrgDetId == ProdReceiptDet[h].ProdPrgDetId && ecdata[ig].ProdPrgDetId == Prgdetid) {

                    var RejectionQty = ProdReceiptDet[h].RejectQty;

                    row.find('#txtrejectedqty').focus().val('').val(RejectionQty);
                    return true;
                }
            }

        });

    });

    $(document).on('keyup', '.txtacceptqty', function () {

        var table = $('#tblreceipt').DataTable();
        var Prgdetid = table.row($(this).parents('tr')).data()["ProdPrgDetId"];
        // rowindex = $(this).closest('tr').index();
        var currrejectedqty = 0;
        var currreceivedqty = 0;
        var curracceptqty = 0;
        var currreworkqty = 0;
        var Totrejectedqty = 0;

        var Prgdetid = table.row($(this).parents('tr')).data()["ProdPrgDetId"];

        for (var i in ProdReceiptDet) {
            if (ProdReceiptDet[i]['ProdPrgDetId'] == Prgdetid) {
                //if ((parseInt($(this).val()) + parseint(ProdReceiptDet[i]['ReceivedQty'])) > parseInt(ProdReceiptDet[i]['Balance'])) {
                curracceptqty = $(this).val();
                currreceivedqty = ProdReceiptDet[i]['ReceivedQty'];
                currrejectedqty = ProdReceiptDet[i]['RejectQty'];
                currreworkqty = ProdReceiptDet[i]['ReworkQty'];

                Totrejectedqty = Number(curracceptqty) + Number(currrejectedqty) + Number(currreworkqty);

                if (Totrejectedqty > ProdReceiptDet[i]['ReceivedQty']) {
                    //alert("Accepted + Rejected Qty + Rework Qty should not exceed than Received Qty...");
                    var msg = 'Accepted + Rejected quantity + Rework quantity should not exceed than Received quantity...';
                    var flg = 4;
                    var mod = 1;
                    var ur = "";
                    AlartMessage(msg, flg, mod, ur);
                    ProdReceiptDet[i]['AcceptQty'] = 0;
                }
                else {
                    ProdReceiptDet[i]['AcceptQty'] = $(this).val();
                }
                break; //Stop this loop, we found it!
            }
        }

        LoadReceiptGrid(ProdReceiptDet);
        var table = $('#tblreceipt').DataTable();
        var ecdata = table.rows().data();

        $('input[id=txtacceptqty]').each(function (ig) {

            var row = $(this).closest('tr');
            for (var h = 0; h < ProdReceiptDet.length; h++) {

                if (ecdata[ig].ProdPrgDetId == ProdReceiptDet[h].ProdPrgDetId && ecdata[ig].ProdPrgDetId == Prgdetid) {

                    var AcceptQty = ProdReceiptDet[h].AcceptQty;

                    row.find('#txtacceptqty').focus().val('').val(AcceptQty);
                    return true;
                }
            }

        });

        // LoadReceiptGrid(ProdReceiptDet);
    });


    $(document).on('keyup', '.txtreworkqty', function () {

        var table = $('#tblreceipt').DataTable();
        //rowindex = $(this).closest('tr').index();
        var Prgdetid = table.row($(this).parents('tr')).data()["ProdPrgDetId"];
        var currrejectedqty = 0;
        var currreceivedqty = 0;
        var curracceptqty = 0;
        var currreworkqty = 0;
        var Totrejectedqty = 0;


        for (var i in ProdReceiptDet) {
            if (ProdReceiptDet[i]['ProdPrgDetId'] == Prgdetid) {
                //if ((parseInt($(this).val()) + parseint(ProdReceiptDet[i]['ReceivedQty'])) > parseInt(ProdReceiptDet[i]['Balance'])) {
                currreworkqty = $(this).val();
                currreceivedqty = ProdReceiptDet[i]['ReceivedQty'];
                currrejectedqty = ProdReceiptDet[i]['RejectQty'];
                curracceptqty = ProdReceiptDet[i]['AcceptQty'];

                Totrejectedqty = Number(curracceptqty) + Number(currrejectedqty) + Number(currreworkqty);

                if (Totrejectedqty > ProdReceiptDet[i]['ReceivedQty']) {
                    //alert("Accepted + Rejected Qty + Rework Qty should not exceed than Received Qty...");
                    var msg = 'Accepted + Rejected quantity + Rework quantity should not exceed than Received quantity...';
                    var flg = 4;
                    var mod = 1;
                    var ur = "";
                    AlartMessage(msg, flg, mod, ur);
                    ProdReceiptDet[i]['ReworkQty'] = 0;
                }
                else {
                    ProdReceiptDet[i]['ReworkQty'] = $(this).val();
                }
                break; //Stop this loop, we found it!
            }
        }

        LoadReceiptGrid(ProdReceiptDet);
        var table = $('#tblreceipt').DataTable();
        var ecdata = table.rows().data();

        $('input[id=txtreworkqty]').each(function (ig) {

            var row = $(this).closest('tr');
            for (var h = 0; h < ProdReceiptDet.length; h++) {

                if (ecdata[ig].ProdPrgDetId == ProdReceiptDet[h].ProdPrgDetId && ecdata[ig].ProdPrgDetId == Prgdetid) {

                    var ReworkQty = ProdReceiptDet[h].ReworkQty;

                    row.find('#txtreworkqty').focus().val('').val(ReworkQty);
                    return true;
                }
            }

        });

    });


    $('#btnreasonadd').click(function () {

        //validation and add order items
        var isAllValid = true;
        var leng = 0;


        if ($('#ddlreason').val() == 0) {
            isAllValid = false;
            $('#ddlreason').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#ddlreason').siblings('span.error').css('visibility', 'hidden');
        }
        if ($('#txtqty').val() == "0" || $('#txtqty').val() == "") {
            isAllValid = false;
            $('#txtqty').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#txtqty').siblings('span.error').css('visibility', 'hidden');
        }




        if (ProdPrgDetId == 0) {
            //alert("Please select any Item...");
            var msg = 'Please select any Item...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
        }
        else {
            if (isAllValid) {



                var ReasonListObj = {
                    //Seq:Reasonseq,
                    ProdPrgDetId: ProdPrgDetId,
                    Quantity: $('#txtqty').val(),
                    ReasonId: $('#ddlreason').val(),
                    Reason: $("#ddlreason option:selected").text(),
                    ReworkProcessid: null,
                    Process: '',
                    ReworkQty: 0,

                    Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
                };

                Reasonlist.push(ReasonListObj);

                debugger;
                var totalamnt = 0;
                for (var e = 0; e < Reasonlist.length; e++) {
                    if (Reasonlist[e].ProdPrgDetId == ProdPrgDetId) {
                        var amount = Reasonlist[e].Qty;
                        totalamnt = totalamnt + parseFloat(amount);
                    }
                }

                if (totalamnt > Rejectionqty) {
                    //alert('Should not exceed rejected qty..');
                    var msg = 'Should not exceed rejected quantity...';
                    var flg = 4;
                    var mod = 1;
                    var ur = "";
                    AlartMessage(msg, flg, mod, ur);
                    Reasonlist.pop(ReasonListObj);
                    return true;
                }
                else {
                    var colorempty = [];
                    colorempty = Reasonlist;

                    colorempty = $.grep(colorempty, function (v) {
                        return (v.ProdPrgDetId == ProdPrgDetId);
                    });
                    Reasonlistdet = colorempty;
                    loadReasonTable(Reasonlistdet);


                }


                $('#ddlreason').val(0);
                $('#txtqty').val('');
            }
        }
    });


    $('#btnreworkadd').click(function () {

        //validation and add order items
        var isAllValid = true;
        var leng = 0;

        if ($('#ddlReProcess').val() == 0) {
            isAllValid = false;
            $('#ddlReProcess').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#ddlReProcess').siblings('span.error').css('visibility', 'hidden');
        }
        if ($('#txtReprocqty').val() == "0" || $('#txtReprocqty').val() == "") {
            isAllValid = false;
            $('#txtReprocqty').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#txtReprocqty').siblings('span.error').css('visibility', 'hidden');
        }



        if (ProdPrgDetId == 0) {
            //alert("Please select any Item...");
            var msg = 'Please select any Item...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
        }
        else {
            if (isAllValid) {


                var ReasonListObj = {
                    //Seq:Reasonseq,
                    ProdPrgDetId: ProdPrgDetId,
                    Quantity: 0,
                    ReasonId: null,
                    Reason: '',
                    ReworkProcessid: $('#ddlReProcess').val(),
                    Process: $("#ddlReProcess option:selected").text(),
                    ReworkQty: $('#txtReprocqty').val(),

                    Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
                };

                Reasonlist.push(ReasonListObj);

                var totalamnt = 0;
                for (var e = 0; e < Reasonlist.length; e++) {
                    if (Reasonlist[e].ProdPrgDetId == ProdPrgDetId) {
                        var amount = Reasonlist[e].Qty;
                        totalamnt = totalamnt + parseFloat(amount);
                    }
                }

                if (totalamnt > Rejectionqty) {
                    //alert('Should not exceed rejected qty..');
                    var msg = 'Should not exceed rejected quantity...';
                    var flg = 4;
                    var mod = 1;
                    var ur = "";
                    AlartMessage(msg, flg, mod, ur);
                    Reasonlist.pop(ReasonListObj);
                    return true;
                }
                else {

                    var colorempty = [];
                    colorempty = Reasonlist;

                    colorempty = $.grep(colorempty, function (v) {
                        return (v.ProdPrgDetId == ProdPrgDetId);
                    });
                    Reasonlistdet = colorempty;
                    loadReasonTable(Reasonlistdet);


                }


                $('#ddlreason').val(0);
                $('#txtqty').val('');
            }
        }
    });



    $('#tblreceipt').on('click', 'tr', function (e) {

        //
        var table = $('#tblreceipt').DataTable();
        var row = $(this).closest('tr');
        var data = $('#tblreceipt').dataTable().fnGetData(row);


        ProdPrgDetId = data.Prodprgdetid;
        Rejectionqty = data.RejectQty;
        ReworkProcQty = data.Reworkqty;
        ProdIssdetID = data.Prodissdetid;

        var detid = data.ReceptDetId;

        var colorempty = [];
        colorempty = Reasonlist;

        colorempty = $.grep(colorempty, function (v) {
            return (v.ProdPrgDetId == ProdPrgDetId);
        });
        Reasonlistdet = colorempty;
        loadReasonTable(Reasonlistdet);

    });

});

function getbyID(ReturnId) {

    //$('#ddlcutheaderCompany').css('border-color', 'lightgrey');
    $.ajax({
        type: "GET",
        url: "/CommonProductionReturn/GetProdReturnHeaderInfo/" + ReturnId,
        //data: JSON.stringify({ ID: ReturnId }),
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {

            HeaderInfo = result;

            $("#txtRetNo").val(HeaderInfo[0].ReturnNo);
            $("#txtRetDate").val(moment(HeaderInfo[0].ReturnDate).format('DD/MM/YYYY'));
            $("#txtRefNo").val(HeaderInfo[0].RefNo);
            $("#txtRefDate").val(moment(HeaderInfo[0].RefDate).format('DD/MM/YYYY'));
            $("#ddlfinCompany").val(HeaderInfo[0].CompanyId);
            $("#ddlfinProcess").val(HeaderInfo[0].ProcessId).trigger('change');
            $("#txtremarks").val(HeaderInfo[0].Remarks);
            $("#txtWorkDivId").val(HeaderInfo[0].WorkDivId);
            $("#txtWorkDiv").val(HeaderInfo[0].Processor);
            $("#ddlStore").val(HeaderInfo[0].StoreUnitId);

            companyid = HeaderInfo[0].CompanyId;
            editmasunitstore = HeaderInfo[0].StoreUnitId;
            LoadEmployeeStoreunit();
            LoadCommonProdRetEditList(ReturnId);

            if (HeaderInfo == true) {
                $("#btnUpdate").attr('disabled', true);
            }
            else {
                $("#btnUpdate").attr('disabled', false);

                $.ajax({
                    url: "/CommonProductionReturn/GetCommonProdRecptEditMode/" + ReturnId,
                    typr: "GET",
                    contentType: "application/json;charset=UTF-8",
                    dataType: "json",
                    success: function (result) {

                        ProdReturnDet = result;
                        LoadReceiptGrid(ProdReturnDet);
                    },
                    error: function (errormessage) {
                        alert(errormessage.responseText);
                    }
                });
            }
        }
    });
    return false;
}

function LoadCommonProdReciptList(ProdIssueID) {


    $.ajax({
        type: "POST",
        url: '/CommonProductionReturn/GetCommonProdReceiptInfo/',
        data: JSON.stringify({ ProdIssueId: ProdIssueID }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {

            ProdReturnDet = json;

            LoadReceiptGrid(ProdReturnDet);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}


function LoadCommonProdRetEditList(ReturnId) {
    debugger;

    $.ajax({
        type: "POST",
        url: '/CommonProductionReturn/GetCommonProdRetReasonEditMode/',
        data: JSON.stringify({ ID: ReturnId }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            Reasonlist = json;
            loadReasonTable(Reasonlist);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}



function LoadReceiptGrid(ProdReturnList) {
    var inputcount = 0;
    $('#tblreceipt tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        //var tableinput = $('#tblinnergrid').DataTable();
        //tableinput.clear().draw();
        $('#tblreceipt').DataTable().destroy();
    }

    $('#tblreceipt').DataTable({
        data: ProdReturnList,
        scrollY: 300,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        columns: [
            { title: "ProdPrgdetID", data: "Prodprgdetid", "visible": false },
            { title: "ProdIssdetID", data: "Prodissdetid", "visible": false },
            { title: "ProdPrgId", data: "ProdPrgId", "visible": false },
            { title: "ProdPrgNo", data: "ProdPrgNo", "visible": false },
               { title: "StyleID", data: "StyleId", "visible": false },
               { title: "UnitId", data: "UnitId", "visible": false },
               { title: "ProcessId", data: "ProcessId", "visible": false },
               { title: "UomID", data: "UomId", "visible": false },
               { title: "SupplierID", data: "SupplierId", "visible": false },
                    { title: "ID", data: "ProdIssueId", "visible": false },
                    { title: "Job Order No", data: "JobNo", "visible": false },
                    { title: "Issue No", data: "ProdIssueNo" },
                    { title: "ItemId", data: "ItemId", "visible": false },
                    { title: "ColorId", data: "ColorId", "visible": false },
                    { title: "SizeId", data: "SizeId", "visible": false },
                    { title: "Item", data: "Item" },
                    { title: "Color", data: "Color" },
                    { title: "Size", data: "Size" },
                    { title: "Issue Qty", data: "Issueqty" },
                    { title: "Bal Qty", data: "Balqty" },
                    {
                        title: "Return Qty", data: "Returnqty",
                        render: function (data) {
                            //return '<select id="ddlprocecolor" id="txtordqty" onkeyup="OnKeydown()" class="form-control" style="width: 100px;"/></select>';
                            return '<input type="text"  class="form-control txtreturnqty" style="width: 50px;text-align: center;" value=' + data + ' >';
                        }
                    },
                     {
                         title: "Rejection Qty", data: "RejectQty",
                         render: function (data) {
                             //return '<select id="ddlprocecolor" id="txtordqty" onkeyup="OnKeydown()" class="form-control" style="width: 100px;"/></select>';
                             return '<input type="text"  class="form-control txtrejqty" style="width: 50px;text-align: center;" value=' + data + ' >';
                         }
                     },
                      {
                          title: "Rework Qty", data: "ReworkQty",
                          render: function (data) {
                              //return '<select id="ddlprocecolor" id="txtordqty" onkeyup="OnKeydown()" class="form-control" style="width: 100px;"/></select>';
                              return '<input type="text"  class="form-control txtrewrkqty" style="width: 50px;text-align: center;" value=' + data + ' >';
                          }
                      },
                    //{
                    //    title: "ACTION", "mDataProp": null,
                    //    "sDefaultContent": '<button type="button" type="button" data-toggle="tooltip" data-placement="top" title="Add" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnrcpdetadd btn btn-round btn-success" > <i class="fa fa-plus"></i> </button>'
                    //}
        ]
    });


    var table = $('#tblreceipt').DataTable();
    $("#tblreceipt tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblreceipt tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });

}

function getOrdertype() {
    if ($('#optwork').is(':checked')) {
        WJS = "W";
    }
    else if ($('#optjob').is(':checked')) {
        WJS = "J";
    }
    else if ($('#optsample').is(':checked')) {
        WJS = "S";
    }
}

function ShowHideIntExt() {

    if ($('#optinnerinter').is(':checked')) {
        $("#ddlSupplier").hide();
        $("#lblsupplier").hide();

        $("#ddlWorkdiv").show();
        $("#lblworkdiv").show();
        $("#ddlLineNo").show();
        $("#lblline").show();
        //$("#mmm").css("visibility", "visible");
        InterExter = "I";
        $("#ddlSupplier").val(0);
        $('#ddlSupplier').css('border-color', 'lightgrey');
    }
    else if ($('#optinnerexter').is(':checked')) {

        InterExter = "E";
        $("#ddlWorkdiv").hide();
        $("#lblworkdiv").hide();
        $("#ddlLineNo").hide();
        $("#lblline").hide();
        $("#mmm").css("visibility", "hidden");

        $("#ddlSupplier").show();
        $("#lblsupplier").show();
        $("#ddlWorkdiv").val(0);
        $('#ddlWorkdiv').css('border-color', 'lightgrey');
    }
    
}
function loadAddIntOrExt(){
    var InterExter = $('input[name="optinnerinterexter"]:checked').attr('value');
    var compId = $("#ddlCompany").val();
    var processid = $("#ddlProcess").val();
    var orderType = $('input[name="optwjs"]:checked').attr('value');

    LoadCommonProductionIssueList(InterExter, compId, processid, orderType);
    loadIssNo(InterExter, compId, processid, orderType);
}
function addlist() {
    var InterExter = $('input[name="optinnerinterexter"]:checked').attr('value');
    var compId = $("#ddlCompany").val();
    var processid = $("#ddlProcess").val();
    var orderType = $('input[name="optwjs"]:checked').attr('value');

    LoadCommonProductionIssueList(InterExter, compId, processid, orderType);
}
function loadIssNo(IntExt, companyid, processid, Ordertype) {
    debugger;
    var orderno = $('#ddlOrderNo').val();
    if (orderno == 0 || orderno == null) {
        orderno = 0;
    }
    var referno = $('#ddlRefNo').val();
    if (referno == 0 || referno == null) {
        referno = 0;
    }
    var IOE = $('input[name="optinnerinterexter"]:checked').attr('value');
    if (IOE == 'I') {
        var supplierid = $('#ddlWorkdiv').val();
        if (supplierid == 0 || supplierid == null) {
            supplierid = 0;
        }
    } else {
        var supplierid = $('#ddlSupplier').val();
        if (supplierid == 0 || supplierid == null) {
            supplierid = 0;
        }
    }

    var styleid = $('#ddlStyle').val();
    if (styleid == 0 || styleid == null) {
        styleid = 0;
    }
    var issueid = $('#ddlIssueNo').val();
    if (issueid == 0 || issueid == null) {
        issueid = 0;
    }
    $.ajax({
        type: "POST",
        url: '/CommonProductionReturn/GetCommonProdMultipleIssueInfo/',
        data: JSON.stringify({ InterorExter: IntExt, CompanyId: companyid, Processid: processid, OrderType: Ordertype, OrdNo: orderno, RefNo: referno, SupplierId: supplierid, StyleId: styleid, IssueId: issueid }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {

            MultipleProdIssueDet = json;

            $('#ddlIssueNo').empty();
            $('#ddlIssueNo').append($('<option/>').val('0').text('--Select IssueNo--'));
            $.each(MultipleProdIssueDet, function () {
                $('#ddlIssueNo').append($('<option></option>').val(this.ProdIssueId).text(this.ProdIssueNo));
            });
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function LoadSampleorBuyer() {
    if ($('#optsamord').is(':checked')) {
        $("#optsample").attr('disabled', false);
        $("#optwork").attr('disabled', true);
        $("#optjob").attr('disabled', true);

        $("#optwork").attr('checked', false);
        $("#optsample").prop('checked', true);
    }
    else if ($('#optbulkord').is(':checked')) {
        $("#optsample").attr('disabled', true);
        $("#optwork").attr('disabled', false);
        $("#optjob").attr('disabled', false);

        $("#optsample").attr('checked', false);
        $("#optwork").prop('checked', true);
    }
}

function LoadCommonProductionIssueList(IntExt, companyid, processid, Ordertype) {

    debugger;
    var inputcount = 0;
    $('#tblissuedet tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        //var tableinput = $('#tblinnergrid').DataTable();
        //tableinput.clear().draw();
        $('#tblissuedet').DataTable().destroy();
    }
    var orderno = $('#ddlOrderNo').val();
    if (orderno == 0 || orderno == null) {
        orderno = 0;
    }
    var referno = $('#ddlRefNo').val();
    if(referno==0 || referno== null){
        referno = 0;
    }
    var IOE =  $('input[name="optinnerinterexter"]:checked').attr('value');
    if(IOE=='I'){
        var supplierid = $('#ddlWorkdiv').val();
        if (supplierid == 0 || supplierid == null) {
            supplierid = 0;
        }
    }else{
        var supplierid = $('#ddlSupplier').val();
        if (supplierid == 0 || supplierid == null) {
            supplierid = 0;
        }
    }
    
    var styleid = $('#ddlStyle').val();
    if (styleid == 0 || styleid == null) {
        styleid = 0;
    }
    var issueid = $('#ddlIssueNo').val();
    if (issueid == 0 || issueid == null) {
        issueid = 0;
    }
    $.ajax({
        type: "POST",
        url: '/CommonProductionReturn/GetCommonProdMultipleIssueInfo/',
        data: JSON.stringify({ InterorExter: IntExt, CompanyId: companyid, Processid: processid, OrderType: Ordertype, OrdNo: orderno, RefNo: referno, SupplierId: supplierid, StyleId: styleid, IssueId: issueid }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {

            MultipleProdIssueDet = json;

            LoadIssueGrid(MultipleProdIssueDet);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadIssueGrid(ProductionList) {

    $('#tblissuedet').DataTable({
        data: ProductionList,
        scrollY: 300,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        columns: [
            { title: "ProdprgID", data: "ProdPrgId", "visible": false },
                    { title: "ID", data: "ProdIssueId", "visible": false },
                    { title: "JobOrderNo", data: "JobOrderNo", "visible": false },
                    { title: "Prod Iss No", data: "ProdIssueNo" },
                    {
                        title: "Issue.Date", data: "ProdIssueDate",
                        render: function (data) {
                            return (moment(data).format("DD/MM/YYYY"));
                        }
                    },
                    { title: "Order No", data: "OrderNo" },
                    { title: "StyleId", data: "StyleId", "visible": false },
                    { title: "Style No", data: "Style" },
                    { title: "Work Division", data: "Processor" },
                    { title: "Order Qty", data: "Orderqty" },
                    { title: "Issue Qty", data: "Issueqty" },
                    { title: "Balance Qty", data: "Balqty" },
                    {
                        title: "Include", data: "ProdIssueId",
                        render: function (data) {
                            return '<input type="checkbox" id="chkinnergrid" class="editor-active"  style="width: 50px;text-align: center;"  value=' + data + ' onclick="myfunc(this.value);">';
                        },
                    },
        ]
    });
}

function myfunc(Val) {

    if (DetRowID == 0) {
        DetRowID = Val;
    }
    else {
        DetRowID = DetRowID + "," + Val;
    }
}

function GenerateProductionReturnNumber(table, column, compId, Docum) {
    table = "prodreturnmas";
    column = "ReturnNo";

    //Get Login Company Id and pass below
    compId = $('#ddlMCompany').val(),
    Docum = 'GENERAL PRODUCTION RETURN';

    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {

            $('#txtRetNo').val(result.Value);
        }
    });
}
function validate() {
    var isValid = true;

    if ($('#ddlStore').val() == 0) {
        $('#ddlStore').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlStore').css('border-color', 'lightgrey');
    }
    if ($('#txtRefNo').val().trim() == "") {
        $('#txtRefNo').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtRefNo').css('border-color', 'lightgrey');
    }

    return isValid;
}

function Add() {


    var res = validate();
    if (res == false) {
        return false;
    }

    if ($('#optgen').is(':checked')) {
        issuetype = "G";
    }
    else if ($('#optswe').is(':checked')) {
        issuetype = "S";
    }

    if (InterExter == "I") {
        workdivid = $("#ddlfinWorkdiv").val();
    }
    else if (InterExter == "E") {
        workdivid = $("#ddlfinSupplier").val();
    }


    //if (ProdReturnList.length == 0) {
    //    alert("Please Enter the Item Details..");
    //    return true;
    //}

    table = "prodreturnmas";
    column = "ReturnNo";
    compId = $('#ddlMCompany').val(),
    Docum = 'GENERAL PRODUCTION RETURN';

    var oldReturnNo = $("#txtRetNo").val();
    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {

            var newReturnNo = result.Value;
            if (oldReturnNo != newReturnNo) {
                //alert('Return No has been changed...');
                var msg = 'Return Number has been changed...';
                var flg = 4;
                var mod = 1;
                var ur = "";
                AlartMessage(msg, flg, mod, ur);
                $('#txtRetNo').val(result.Value);
            }
            var ProdReturnObj = {
                ReturnNo: $("#txtRetNo").val(),
                ReturnDate: $("#txtRetDate").val(),
                RefNo: $("#txtRefNo").val(),
                RefDate: $("#txtRefDate").val(),
                CompanyId: $("#ddlfinCompany").val(),
                Remarks: $("#txtremarks").val(),
                ProcessId: $("#ddlfinProcess").val(),
                InterExter: InterExter,
                IssueType: issuetype,
                WorkDivId: $("#txtWorkDivId").val(),
                CreatedBy: Guserid,
                StoreUnitId: $("#ddlStore").val(),
                ProdReturnDet: ProdReturnDet,
                Prodretreason: Reasonlist
            };
            $("#btnAdd").attr("disabled", true);
            LoadingSymb();
            $.ajax({
                url: "/CommonProductionReturn/Add",
                data: JSON.stringify(ProdReturnObj),
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {

                    if (result.Status == "SUCCESS") {
                        AddUserEntryLog('Production', 'Common Return', 'ADD', $("#txtRetNo").val());
                        //alert("Record saved successfully...");
                        var msg = 'Record saved successfully...';
                        var flg = 1;
                        var mod = 1;
                        var ur = "";
                        AlartMessage(msg, flg, mod, ur);
                        $('#ddlMCompany').val(0);
                        $('#ddlMUnit').val(0);
                        $('#myModal1').modal('hide');
                        $('#myModal').modal('hide');
                    }
                    else if (result == "ERROR") {
                        //alert("Record saved failed...");
                        var msg = 'Record saved failed...';
                        var flg = 4;
                        var mod = 1;
                        var ur = "";
                        AlartMessage(msg, flg, mod, ur);
                    }
                    //$('#ddlcutCompany').val(0);
                    //$('#ddlcutunit').val(0);
                    //$('#ddlProcess').val(0);
                    //$('#ddlWorkDiv').val(0);

                    //$('#tblbillmaingrid').DataTable().destroy();

                    //Load Main Grid
                    ListFilter();
                },
                error: function (errormessage) {
                    alert(errormessage.responseText);
                }
            });
        }
    });
}

function Update() {
    debugger;;
    var res = validate();
    if (res == false) {
        return false;
    }

    if ($('#optgen').is(':checked')) {
        issuetype = "G";
    }
    else if ($('#optswe').is(':checked')) {
        issuetype = "S";
    }

    if (InterExter == "I") {
        workdivid = $("#ddlfinWorkdiv").val();
    }
    else if (InterExter == "E") {
        workdivid = $("#ddlfinSupplier").val();
    }

    //if (ProdReturnList.length == 0) {
    //    alert("Please Enter the Item Details..");
    //    return true;
    //}

    var ProdReturnUpdateObj = {
        ReturnId: ReturnId,
        ReturnNo: $("#txtRetNo").val(),
        ReturnDate: $("#txtRetDate").val(),
        RefNo: $("#txtRefNo").val(),
        RefDate: $("#txtRefDate").val(),
        CompanyId: $("#ddlfinCompany").val(),
        Remarks: $("#txtremarks").val(),
        ProcessId: $("#ddlfinProcess").val(),
        InterExter: InterExter,
        IssueType: issuetype,
        WorkDivId: $("#txtWorkDivId").val(),
        CreatedBy: Guserid,
        StoreUnitId: $("#ddlStore").val(),
        ProdReturnDet: ProdReturnDet,
        Prodretreason: Reasonlist
    };
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/CommonProductionReturn/Update",
        data: JSON.stringify(ProdReturnUpdateObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.Status == "SUCCESS") {
                AddUserEntryLog('Production', 'Common Return', 'UPDATE', $("#txtRetNo").val());
                //alert("Record updated successfully...");
                var msg = 'Record updated successfully...';
                var flg = 1;
                var mod = 1;
                var ur = "";
                AlartMessage(msg, flg, mod, ur);
                $('#ddlMCompany').val(0);
                $('#ddlMUnit').val(0);
                $('#myModal1').modal('hide');
                $('#myModal').modal('hide');
                ReturnId = 0;
            }
            else if (result == "ERROR") {
                //alert("Record updated failed...");
                var msg = 'Record updated failed...';
                var flg = 4;
                var mod = 1;
                var ur = "";
                AlartMessage(msg, flg, mod, ur);
            }
            //$('#ddlcutCompany').val(0);
            //$('#ddlcutunit').val(0);
            //$('#ddlProcess').val(0);
            //$('#ddlWorkDiv').val(0);

            //$('#tblbillmaingrid').DataTable().destroy();

            //Load Main Grid
            ListFilter();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });

    //}
}

function ListFilter() {

    $('#tblprodreturnmaingrid').DataTable().destroy();
    companyid = $('#ddlMCompany').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    if ($('#optMinter').is(':checked')) {
        InterExter = "I";
    }
    else if ($('#optMexter').is(':checked')) {
        InterExter = "E";
    }

    LoadData(companyid, FDate, TDate, InterExter);
}

function clickonlist() {

    $('#tblprodreturnmaingrid').DataTable().destroy();
    companyid = $('#ddlMCompany').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    if ($('#optMinter').is(':checked')) {
        InterExter = "I";
    }
    else if ($('#optMexter').is(':checked')) {
        InterExter = "E";
    }



    LoadData(companyid, FDate, TDate, InterExter);
    LoadDDL(companyid, FDate, TDate, InterExter);
}

function CMainList() {
    $('#tblprodreturnmaingrid').DataTable().destroy();
    companyid = $('#ddlMCompany').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    if ($('#optMinter').is(':checked')) {
        InterExter = "I";
    }
    else if ($('#optMexter').is(':checked')) {
        InterExter = "E";
    }

    DCompid = 0;
    ChkRefno = true;
    ChkOrdno = true;
    DtChk = false;
    ChkRetno = true;
    ChkPrgNo = true;
    ChkProc = true;
    ChkComp = true;
    LoadData(companyid, FDate, TDate, InterExter);
    LoadDDL(companyid, FDate, TDate, InterExter);

}
function PMainList() {
    $('#tblprodreturnmaingrid').DataTable().destroy();
    companyid = $('#ddlMCompany').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    if ($('#optMinter').is(':checked')) {
        InterExter = "I";
    }
    else if ($('#optMexter').is(':checked')) {
        InterExter = "E";
    }

    DCompid = 0;
    ChkRefno = false;
    ChkOrdno = false;
    DtChk = false;
    ChkRetno = true;
    ChkPrgNo = true;
    ChkProc = false;
    ChkComp = false;
    LoadData(companyid, FDate, TDate, InterExter);
    LoadDDL(companyid, FDate, TDate, InterExter);

}

function PGMainList() {
    $('#tblprodreturnmaingrid').DataTable().destroy();
    companyid = $('#ddlMCompany').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    if ($('#optMinter').is(':checked')) {
        InterExter = "I";
    }
    else if ($('#optMexter').is(':checked')) {
        InterExter = "E";
    }

    DCompid = 0;
    ChkRefno = false;
    ChkOrdno = false;
    DtChk = false;
    ChkRetno = false;
    ChkPrgNo = false;
    ChkProc = false;
    ChkComp = false;
    LoadData(companyid, FDate, TDate, InterExter);
    LoadDDL(companyid, FDate, TDate, InterExter);

}
function OMainList() {
    $('#tblprodreturnmaingrid').DataTable().destroy();
    companyid = $('#ddlMCompany').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    if ($('#optMinter').is(':checked')) {
        InterExter = "I";
    }
    else if ($('#optMexter').is(':checked')) {
        InterExter = "E";
    }

    DCompid = 0;
    ChkRefno = false;
    ChkOrdno = false;
    DtChk = false;
    ChkRetno = true;
    ChkPrgNo = true;
    ChkProc = true;
    ChkComp = false;
    LoadData(companyid, FDate, TDate, InterExter);
    LoadDDL(companyid, FDate, TDate, InterExter);

}

function RTMainList() {
    $('#tblprodreturnmaingrid').DataTable().destroy();
    companyid = $('#ddlMCompany').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    if ($('#optMinter').is(':checked')) {
        InterExter = "I";
    }
    else if ($('#optMexter').is(':checked')) {
        InterExter = "E";
    }

    DCompid = 0;
    ChkRefno = false;
    ChkOrdno = false;
    DtChk = false;
    ChkRetno = false;
    ChkPrgNo = false;
    ChkProc = false;
    ChkComp = false;
    LoadData(companyid, FDate, TDate, InterExter);
    LoadDDL(companyid, FDate, TDate, InterExter);

}
function LoadData(companyid, fromdate, todate, InterorExter) {

    var processid = $('#ddlMProcess').val();
    if (processid == null) {
        processid = 0;
    }
    var prgno = $("#ddlMProgNo option:selected").val();
    if (prgno == null || prgno == "0") {
        prgno = "";
    }
    else {
        prgno = $("#ddlMProgNo option:selected").text();
    }
    //var refno = $("#ddlMRefNo option:selected").text();
    //if (refno == null) {
    //    refno = "";
    //}

    var RefNo = "";
    var RNo = $('select#ddlMRefNo option:selected').val();

    if (RNo == 0) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlMRefNo option:selected').text();
    }

    var orderno = $("#ddlMOrderNo option:selected").val();
    if (orderno == null || orderno == "0") {
        orderno = "";
    }
    else {
        orderno = $("#ddlMOrderNo option:selected").text();
    }
    var returnid = $('#ddlMReturnNo').val();
    if (returnid == null) {
        returnid = 0;
    }
    var companyid = $('#ddlMCompany').val();

    if (companyid == null) {
        companyid = DCompid;
    } else {
        companyid = $('#ddlMCompany').val();
    }
    if (ChkComp || DtChk) {
        processid = 0;
        prgno = "";
        RefNo = "";
        orderno = "";
        returnid = 0;
    }

    var OType = $('input[name="optbulksam"]:checked').attr('value');

    $.ajax({
        type: "POST",
        url: '/CommonProductionReturn/GetMaindt/',
        data: JSON.stringify({ CompanyId: companyid, Fromdate: fromdate, Todate: todate, InterExter: InterorExter, OrderNo: orderno, ProcessId: processid, RefNo: RefNo, ReturnId: returnid, PrgNo: prgno, OrdType: OType }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {


            maintbllist = json;
            $('#tblprodreturnmaingrid').DataTable({
                data: maintbllist,
                scrollY: 300,
                scrollCollapse: true,
                paging: false,
                fixedColumns: false,
                select: false,
                scrollX: "100%",
                scrollXInner: "100%",
                scroller: false,
                columns: [
                    { title: "ID", data: "ReturnId", "visible": false },
            { title: "Return No", data: "ReturnNo" },
            {
                title: "Return Date", data: "ReturnDate",
                render: function (data) {
                    return (moment(data).format("DD/MM/YYYY"));
                }
            },
            { title: "Ref No", data: "RefNo" },
            {
                title: "Ref Date", data: "RefDate",
                render: function (data) {
                    return (moment(data).format("DD/MM/YYYY"));
                }
            },
            { title: "Process", data: "Process" },
            { title: "Work Division", data: "WorkDivision" },
            {
                title: "ACTION", "mDataProp": null,
                "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" ' + CommProdRetEditFlg + ' class="btnmaingrdedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button><button type="button" type="button" data-toggle="tooltip" data-placement="top" title="Delete" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" ' + CommProdRetDeleteFlg + ' class="btnmaingrddelete btn btn-danger btn-round" onClick=""> <i class="fa fa-minus"></i> </button><button type="button"  ' + CommProdRetPrintFlg + ' class="ProdReturnPrint btn btn_round btn-success"  data-toggle="tooltip" data-placement="top" title="print" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;" >  <i class="fa fa-print"></i> </button>'
            }
                ]
            });
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadDDL(companyid, fromdate, todate, InterorExter) {

    //$('#tblcuttingmaingrid').DataTable().destroy();
    var processid = $('#ddlMProcess').val();
    if (processid == null) {
        processid = 0;
    }
    var prgno = $("#ddlMProgNo option:selected").val();
    if (prgno == null || prgno == "0") {
        prgno = "";
    }
    else {
        prgno = $("#ddlMProgNo option:selected").text();
    }
    //var refno = $("#ddlMRefNo option:selected").text();
    //if (refno == null) {
    //    refno = "";
    //}


    var refno = "";
    var RNo = $('select#ddlMRefNo option:selected').val();

    if (RNo == 0) {
        refno == "";
    }
    else {

        refno = $('select#ddlMRefNo option:selected').text();
    }

    var orderno = $("#ddlMOrderNo option:selected").val();
    if (orderno == null || orderno == "0") {
        orderno = "";
    }
    else {
        orderno = $("#ddlMOrderNo option:selected").text();
    }
    var returnid = $('#ddlMReturnNo').val();
    if (returnid == null) {
        returnid = 0;
    }

    var companyid = $('#ddlMCompany').val();

    if (companyid == null) {
        companyid = DCompid;
    } else {
        companyid = $('#ddlMCompany').val();
    }


    if (ChkComp || DtChk) {
        processid = 0;
        prgno = "";
        refno == "";
        orderno = "";
        returnid = 0;
    }
    var OType = $('input[name="optbulksam"]:checked').attr('value');
    $.ajax({
        type: "POST",
        url: '/CommonProductionReturn/GetMaindt/',
        data: JSON.stringify({ CompanyId: companyid, Fromdate: fromdate, Todate: todate, InterExter: InterorExter, OrderNo: orderno, ProcessId: processid, RefNo: refno, ReturnId: returnid, PrgNo: prgno }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {


            maintbllist = json;


            var retdet = {};
            var ret = [];
            var procdet = {};
            var proc = [];
            var prgdet = {};
            var prg = [];
            var orddet = {};
            var ord = [];
            var refdet = {};
            var ref = [];


            $.each(maintbllist, function (i, el) {

                if (!retdet[el.ReturnNo]) {
                    retdet[el.ReturnNo] = true;
                    ret.push(el);
                }
                if (!procdet[el.ProcessId]) {
                    procdet[el.ProcessId] = true;
                    proc.push(el);
                }
                if (!prgdet[el.ProgramNo]) {
                    prgdet[el.ProgramNo] = true;
                    prg.push(el);
                }
                if (!orddet[el.OrderNo]) {
                    orddet[el.OrderNo] = true;
                    ord.push(el);
                }
                if (!refdet[el.RefNo]) {
                    refdet[el.RefNo] = true;
                    ref.push(el);
                }
            });


            if (ChkRetno || ChkComp || DtChk) {
                $('#ddlMReturnNo').empty();
                $(ddlMReturnNo).append($('<option/>').val('0').text('--Select Retun No--'));
                $.each(ret, function () {
                    $(ddlMReturnNo).append($('<option></option>').val(this.ReturnId).text(this.ReturnNo));
                });
            }
            if (ChkProc || ChkComp || DtChk) {
                $('#ddlMProcess').empty();
                $(ddlMProcess).append($('<option/>').val('0').text('--Select Process--'));
                $.each(proc, function () {
                    $(ddlMProcess).append($('<option></option>').val(this.ProcessId).text(this.Process));
                });
            }
            if (ChkPrgNo || ChkComp || DtChk) {
                $('#ddlMProgNo').empty();
                $(ddlMProgNo).append($('<option/>').val('0').text('--Select Program No--'));
                $.each(prg, function () {
                    $(ddlMProgNo).append($('<option></option>').text(this.ProgramNo));
                });
            }
            if (ChkOrdno || ChkComp || DtChk) {
                $('#ddlMOrderNo').empty();
                $(ddlMOrderNo).append($('<option/>').val('0').text('--Select Order No--'));
                $.each(ord, function () {
                    $(ddlMOrderNo).append($('<option></option>').text(this.OrderNo));
                });
            }

            if (ChkRefno || ChkComp || DtChk) {
                $('#ddlMRefNo').empty();
                $(ddlMRefNo).append($('<option/>').val('0').text('--Select Ref No--'));
                $.each(ref, function () {
                    $(ddlMRefNo).append($('<option></option>').text(this.RefNo));
                });
            }

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

//function Delete(ID) {
//    
//    var ans = confirm("Are you sure you want to delete this Record?");
//    if (ans) {
//        $.ajax({
//            url: "/CommonProductionReturn/Delete/" + ID,
//            type: "POST",
//            contentType: "application/json;charset=UTF-8",
//            dataType: "json",
//            success: function (result) {
//                alert("Record deleted successfully...");
//                $('#tblprodreturnmaingrid').DataTable().destroy();
//                ListFilter();
//            },
//            error: function (errormessage) {
//                alert(errormessage.responseText);
//            }
//        });
//    }
//}

function Delete(ID) {
    debugger;
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $("#btnDel").attr("disabled", true);
        LoadingSymb();
        //$.ajax({
        //    type: "GET",
        //    url: "/CommonProductionReturn/GetProdReturnHeaderInfo/" + ID,
        //    contentType: "application/json;charset=UTF-8",
        //    dataType: "json",
        //    success: function (result) {
        //        debugger;
        //        HeaderInfo = result;
        //        $("#txtRetNo").val(HeaderInfo[0].ReturnNo);

        $.ajax({
            url: "/CommonProductionReturn/Delete/",
            data: JSON.stringify({ returnid: ProdReturnId, returndetail: ProdReturnDet }),
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                if (result.Status == "SUCCESS") {
                    AddUserEntryLog('Production', 'Common Return', 'delete', $("#txtRetNo").val());
                    //alert("Record deleted successfully...");
                    var msg = 'Record deleted successfully...';
                    var flg = 2;
                    var mod = 1;
                    var ur = "";
                    AlartMessage(msg, flg, mod, ur);
                    $('#tblprodreturnmaingrid').DataTable().destroy();
                    ListFilter();
                    ProdReturnId = 0;
                    $('#ddlMCompany').val(0);
                    $('#ddlMUnit').val(0);
                    $('#myModal1').modal('hide');
                    $('#myModal').modal('hide');
                    $("#btnDel").attr("disabled", false);
                }
                else {
                    //alert("Record deleted failed...");
                    var msg = 'Record deleted failed...';
                    var flg = 4;
                    var mod = 1;
                    var ur = "";
                    AlartMessage(msg, flg, mod, ur);
                }
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
        // }
        // });
    }
}


$(document).on('click', '.ProdReturnPrint', function () {

    var table = $('#tblprodreturnmaingrid').DataTable();
    var ProdRetEditId = table.row($(this).parents('tr')).data()["ReturnId"];
    Repid = ProdRetEditId;
    $('#myModal2').modal('show');

    docname = "PRODUCTION RETURNS";
    GenerateReportItem(docname);
});



function GenerateReportItem(name) {

    $("#sbTwo").empty();
    $.ajax({
        url: "/BulkOrder/GetReportOption",
        data: JSON.stringify({ docname: name }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {

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
    window.location.href = "../ReportInline/Production/CommProdReturnReportInline/CommProdReturnReportInline.aspx?ProdRetEditId=" + Repid + "&Rem=" + p[0] + "&Ewaybill=" + p[1] + "&Ewaydate=" + p[2] + "&Companyid=" + compid;

}

function backtomain() {

    // $("#myModal2").modal('hide');

    window.location.href = "/CommonProductionReturn/CommonProductionReturnIndex";
}


function LoadEmployeeStoreunit() {

    if (UserName == 'superuser') {
        LoginUserid = 0;
    }

    $.ajax({
        url: "/StoreSetup/GetStoreRights",
        data: JSON.stringify({ Userid: LoginUserid, Storetype: 'M', Companyid: companyid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var data = result.Value;
            $(ddlStore).empty();
            $(ddlStore).append($('<option/>').val('0').text('--Select Store--'));
            $.each(data, function () {
                $(ddlStore).append($('<option></option>').val(this.Storeid).text(this.StoreName));
            });
            $(ddlStore).trigger("select2:updated");
            if (editmasunitstore > 0) {
                $('#ddlStore').val(editmasunitstore).trigger('change');
            }
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}

function LoadItemMovements(GrnNo) {


    $.ajax({
        url: "/GRNMain/LoadItemstockMovement/",
        data: JSON.stringify({ GrnNo: GrnNo }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;

            ItemMovementList = (result.Value);

            loadItemMovementTable(ItemMovementList);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function loadItemMovementTable(ItemMovementList) {

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

function loadReasonTable(reasonList) {

    var colorempty = [];
    colorempty = reasonList;

    colorempty = $.grep(colorempty, function (v) {
        return (v.ReasonId > 0);
    });


    var inputcount = 0;
    $('#tblreason tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        //var tableinput = $('#tblinnergrid').DataTable();
        //tableinput.clear().draw();
        $('#tblreason').DataTable().destroy();
    }



    $('#tblreason').DataTable({
        data: colorempty,
        columns: [
           // { title: "RowSeq", data: "Seq", "visible": false },
            { title: "ProdPrgDetId  ", data: "ProdPrgDetId", "visible": false },
            { title: "Reason", data: "Reason" },
            { title: "Qty", data: "Quantity" },
            { title: "ReasonID", data: "ReasonId", "visible": false },
            { title: "Re Process", data: "Process", "visible": false },
            { title: "Proc Qty", data: "ReworkQty", "visible": false },
            { title: "ReasonID", data: "ReworkProcessid", "visible": false },

               {
                   title: "ACTION", "mDataProp": null,
                   //"sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnbundleedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnreasonremove btn btn-danger btn-round"> <i class="fa fa-minus"></i> </button>'
                   "sDefaultContent": '</button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnreasonremove btn btn-danger btn-round"> <i class="fa fa-minus"></i> </button>'
               }
        ]
    });

    loadReworkTable(reasonList);
}


function loadReworkTable(reasonList) {

    var colorempty = [];
    colorempty = reasonList;

    colorempty = $.grep(colorempty, function (v) {
        return (v.ReworkProcessid > 0);
    });

    var inputcount = 0;
    $('#tblrework tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        //var tableinput = $('#tblinnergrid').DataTable();
        //tableinput.clear().draw();
        $('#tblrework').DataTable().destroy();
    }



    $('#tblrework').DataTable({
        data: colorempty,
        columns: [
           // { title: "RowSeq", data: "Seq", "visible": false },
             { title: "ProdPrgDetId  ", data: "ProdPrgDetId", "visible": false },
            { title: "Reason", data: "Reason", "visible": false },
            { title: "Qty", data: "Quantity", "visible": false },
            { title: "ReasonID", data: "ReasonId", "visible": false },
            { title: "Re Process", data: "Process" },
            { title: "Proc Qty", data: "ReworkQty" },
            { title: "ReasonID", data: "ReworkProcessid", "visible": false },

               {
                   title: "ACTION", "mDataProp": null,
                   //"sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnbundleedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnreasonremove btn btn-danger btn-round"> <i class="fa fa-minus"></i> </button>'
                   "sDefaultContent": '</button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnreworkremove btn btn-danger btn-round"> <i class="fa fa-minus"></i> </button>'
               }
        ]
    });
}