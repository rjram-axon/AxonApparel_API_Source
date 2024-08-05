var DetRowID = 0;
var ProdReceiptNo = 0;
var Reasonseq = 0;
var processid = 0;
var companyid = 0;
var companyunitid = 0;
var workdivid = 0;
var supplierid = 0;
var MultipleProdIssueDet = [];
var ProdReceiptDet = [];
var Reasonlist = [];
var maintbllist = [];
var ProdPrgDetId = 0;
var table, column, compId, Docum;
var fromdate, todate = 0;
var InterExter = 0;
var Mode = 0;
var ProdReceiptEditId = 0;
var ItemStockInfo = 0;
var Rejectionqty = 0;
var Userid = 0;
var UserName = 0;
var OrderType = 0;
var IntOrExt = 0;
var MainFDate = 0;
var repobj = [];
var Repid = 0;
var Guserid = 0;
var DCompid = 0;
var ChkRefno = true;
var ChkOrdno = true;
var DtChk = false;
var ChkProcess = true;
var ChkDCNo = true;
var ChkRCNo = true;
var ChkJobno = true;
var ChkComp = false;
var LoginUserid = '';
var editmasunitstore = 0;
var editsubmasunitstore = 0;
var editsubstore = 0;
var CommProdRecptEditFlg = "disabled";
var CommProdRecptDeleteFlg = "disabled";
var CommProdRecptPrintFlg = "disabled";
var CommProdRecptAddFlg = "disabled";
var ValidateProductionStore = "False";
var ReProcessid = 0;
var ReworkProcQty = 0;
var ReceptDetId = 0;
var Reasonlistdet = [];
var Gs = 0;
//var ValiProdIssBudApp = '';
var ValiCutBudApp = '';
var ValiCutBudAppSam = 0;
var retchk = '';

var MainList_barcode = [];
var MainList_barcodeScanList = [];

$(document).ready(function () {


    Guserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    MainFDate = $("#hdMainFromDate").data('value');
    //ValiProdIssBudApp = $("#hdnCostBudCutAppid").data('value');
    ValidateProductionStore = $("#hdnValidateProductionStore").data('value');
    //ValidateCostBudComProdIssAppSamid = $("#hdnCostBudCutAppSamid").data('value');
    ValiCutBudApp = $("#hdnCostBudCutAppid").data('value');
    ValiCutBudAppSam = $("#hdnCostBudCutAppSamid").data('value');
    DCompid = $("#hdnDCompid").data('value');
    LoginUserid = $("#hdnLoginUserid").data('value');
    LoadCompanyDDL("#ddlMCompany,#ddlCompany,#ddlinnercompany");
    LoadCompanyUnitDDL("#ddlMUnit,#ddlUnit,#ddlinnercompunit");
    LoadProcessDDL("#ddlMProcess,#ddlProcess,#ddlinnerprocess");
    LoadWorkdivisionDDL("#ddlMWorkdiv,#ddlWorkDiv,#ddlinnerworkdiv");
    LoadStyleDDL("#ddlStyle");
    LoadOrderNoDDL("#ddlOrderNo");
    LoadColorDDL("#ddlColor");
    LoadSizeDDL("#ddlSize");
    LoadReasonDDL("#ddlreason"); 
    LoadSupplierDDL("#ddlSupplier");
    LoadJobNoDDL("#ddlMjobNo,#ddlJobNo");
    LoadRefNoDDL("#ddlMRefNo,#ddlRefNo");
    LoadProcessDDL('#ddlReProcess');

    $('#ddlreason').siblings('span.error').css('visibility', 'hidden');
    $('#txtqty').siblings('span.error').css('visibility', 'hidden');

    $('#txtFromDate').val(MainFDate);
    $('#txtToDate').val(moment(new Date()).format('DD/MM/YYYY'));
    $('#txtReceiptDate').val(moment(new Date()).format('DD/MM/YYYY'));
    $('#txtdcdate').val(moment(new Date()).format('DD/MM/YYYY'));
    $('#txtQualitytDate').val(moment(new Date()).format('DD/MM/YYYY'));

    fromdate = $("#txtFromDate").val();
    todate = $("#txtToDate").val();

    if ($('#optinternal').is(':checked')) {
        InterExter = "I";
    }
    else if ($('#optexternal').is(':checked')) {
        InterExter = "E";
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


    if (MultipleProdIssueDet.length > 0) {

        $("#tbljobdet").dataTable().find("tbody").on('click', 'td', function () {
            debugger;
            $('input[id=groupbom]').each(function () {
                var row = $(this).closest('tr');
                if ($(this).is(':checked')) {
                    var val = $(this).val();
                    for (var d = 0; d < MultipleProdIssueDet.length; d++) {
                        if (MultipleProdIssueDet[d].ProdIssueId == val) {
                            MultipleProdIssueDet[d].CheckLoad = "Y";
                        }
                    }

                }
                else {
                    var val = $(this).val();
                    for (var d = 0; d < MultipleProdIssueDet.length; d++) {
                        if (MultipleProdIssueDet[d].ProdIssueId == val) {
                            MultipleProdIssueDet[d].CheckLoad = "N";
                        }

                    }
                }

            });

        });
    }


     companyid = $('#ddlMCompany').val();

    if (companyid == null) {
        companyid = DCompid;
    } else {
        companyid = $('#ddlMCompany').val();
    }

    LoadDDL(companyid, fromdate, todate, InterExter);

    var fill = localStorage.getItem('CommonProductionReceiptMainFilter');
    if (fill != "null" && fill != null) {
        LoadDataFromBack(companyid, fromdate, todate, InterExter);
    } else {
        LoadData(companyid, fromdate, todate, InterExter);
    }
    //LoadData(companyid, fromdate, todate, InterExter);

    $('#tblreceipt').on('click', 'tr', function (e) {

        debugger;
        var table = $('#tblreceipt').DataTable();
        var row = $(this).closest('tr');
        var data = $('#tblreceipt').dataTable().fnGetData(row);

        ReceptDetId = data.ReceptDetId;
        ProdPrgDetId = data.ProdPrgDetId;
        Rejectionqty = data.RejectionQty;
        ReProcessid = data.ReworkProcessid;
        ReworkProcQty = data.ReworkQty;
        ReceptDetId = data.ReceptDetId;

        var detid = data.ReceptDetId;

        var colorempty = [];
        colorempty = Reasonlist;

        colorempty = $.grep(colorempty, function (v) {
            return (v.RecptDetId == ReceptDetId);
        });
        Reasonlistdet = colorempty;
        loadReasonTable(Reasonlistdet);

    });



    $(document).on('keyup', '.txtrate', function (e) {
        debugger;
        var table = $('#tblreceipt').DataTable();
        var sno = table.row($(this).parents('tr')).data()["ProdPrgDetId"];
        var rate = table.row($(this).parents('tr')).data()["AppRate"];
        var Val = $(this).val();

        if (ValiCutBudApp == 'Y' && OrderType=='W') {
            if (Val <= rate) {
                $.each(ProdReceiptDet, function () {
                    if (this.ProdPrgDetId == sno) {
                        this.Rate = Val;

                    }
                });
            }
            else {
                //alert('Should not exceed BudgetRate...');
                var msg = 'Should not exceed BudgetRate...';
                var flg = 4;
                var mod = 1;
                var ur = "";
                AlartMessage(msg, flg, mod, ur);
                $.each(ProdReceiptDet, function () {
                    if (this.ProdPrgDetId == sno) {
                        this.Rate = this.AppRate;

                    }
                });
                var table = $('#tblreceipt').DataTable();
                var data = table.rows().data();

                $('input[id=txtrate]').each(function (ig) {
                    if (data[ig].ProdPrgDetId == sno) {
                        var row = $(this).closest('tr');
                        row.find('#txtrate').val(data[ig].AppRate);

                    }
                });
                return true;
            }
        } else if (ValiCutBudAppSam == 'Y' && OrderType == 'S') {
        if (Val <= rate) {
            $.each(ProdReceiptDet, function () {
                if (this.ProdPrgDetId == sno) {
                    this.Rate = Val;

                }
            });
        }
        else {
            //alert('Should not exceed BudgetRate...');
            var msg = 'Should not exceed BudgetRate...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
            $.each(ProdReceiptDet, function () {
                if (this.ProdPrgDetId == sno) {
                    this.Rate = this.AppRate;

                }
            });
            var table = $('#tblreceipt').DataTable();
            var data = table.rows().data();

            $('input[id=txtrate]').each(function (ig) {
                if (data[ig].ProdPrgDetId == sno) {
                    var row = $(this).closest('tr');
                    row.find('#txtrate').val(data[ig].AppRate);

                }
            });
            return true;
        }
        
        }
        else {
            $.each(ProdReceiptDet, function () {
                if (this.ProdPrgDetId == sno) {
                    this.Rate = Val;

                }
            });
        }
    }); 
    //function DeleteChild(r) {
    $(document).on('click', '.btnreasonremove', function () {
        debugger;


        var table = $('#tblreason').DataTable();
        var row = $(this).closest('tr');
        var data = $('#tblreason').dataTable().fnGetData(row);
        var ReceptDetId = data.RecptDetId;  
        var ReworkProcessid = data.ReworkProcessid;
        var ReasonId = data.ReasonId;
        //rowindex = $(this).closest('tr').index();
        //var currentrowsel = Reasonlistdet.slice(rowindex);
        //seq = currentrowsel[0]['Seq'];
        var colorempty = [];
       // colorempty = comboList;
       $.each(Reasonlist, function (v) {
           if (Reasonlist[v].RecptDetId == ReceptDetId && Reasonlist[v].ReworkProcessid == ReworkProcessid && Reasonlist[v].ReasonId == ReasonId) { }
            else {
               colorempty.push(Reasonlist[v]);
            }
        });
        Reasonlist = colorempty;

        var colorempty2 = [];
        colorempty2 = Reasonlist;
        colorempty2= $.grep(colorempty2, function (v) {
            return (v.RecptDetId == ReceptDetId);
        });
        Reasonlistdet = colorempty2;
        loadReasonTable(Reasonlistdet);

        //Reasonlistdet.splice(rowindex, 1);
        //document.getElementById("tblreason").deleteRow(rowindex + 1);
        //loadReasonTable(Reasonlistdet);
    });

    $(document).on('click', '.btnreworkremove', function () {
        debugger;


        var table = $('#tblrework').DataTable();
        var row = $(this).closest('tr');
        var data = $('#tblrework').dataTable().fnGetData(row);
        var ReceptDetId = data.RecptDetId;
        var ReworkProcessid = data.ReworkProcessid;
        var ReasonId = data.ReasonId;
        //rowindex = $(this).closest('tr').index();
        //var currentrowsel = Reasonlistdet.slice(rowindex);
        //seq = currentrowsel[0]['Seq'];
        var colorempty = [];
        // colorempty = comboList;
        $.each(Reasonlist, function (v) {
            if (Reasonlist[v].RecptDetId == ReceptDetId && Reasonlist[v].ReworkProcessid == ReworkProcessid && Reasonlist[v].ReasonId == ReasonId) { }
            else {
                colorempty.push(Reasonlist[v]);
            }
        });
        Reasonlist = colorempty;

        var colorempty2 = [];
        colorempty2 = Reasonlist;
        colorempty2 = $.grep(colorempty2, function (v) {
            return (v.RecptDetId == ReceptDetId);
        });
        Reasonlistdet = colorempty2;
        loadReasonTable(Reasonlistdet);

        //Reasonlistdet.splice(rowindex, 1);
        //document.getElementById("tblreason").deleteRow(rowindex + 1);
        //loadReasonTable(Reasonlistdet);
    });

    $(document).on('click', '.btnmaingrdedit', function () {
        debugger;
        Mode = 1;
        //rowindex = $(this).closest('tr').index();

        //var currow = maintbllist.slice(rowindex);
        //ProdReceiptEditId = currow[0]['ReceiptId'];
        //ProdReceiptNo = currow[0]['ReceiptNo'];


        var table = $('#tblbillmaingrid').DataTable();
        ProdReceiptEditId = table.row($(this).parents('tr')).data()["ReceiptId"];
        ProdReceiptNo = table.row($(this).parents('tr')).data()["ReceiptNo"];



        $('#myModal1').modal('show');
        $('#btnSave').hide();
        $('#btnUpdate').show();
        $('#Qltydet').hide();
        $('#btnDel').hide();
        //columnhide();
        var type = $('#ddlMType option:selected').val()
        OrderType = type;

        getbyID(ProdReceiptEditId);

    });

    $(document).on('click', '.btnmaingrddelete', function () {
        debugger;
        Mode = 1;
        //rowindex = $(this).closest('tr').index();

        //var currow = maintbllist.slice(rowindex);
        //ProdReceiptEditId = currow[0]['ReceiptId'];
        //ProdReceiptNo = currow[0]['ReceiptNo'];


        var table = $('#tblbillmaingrid').DataTable();
        ProdReceiptEditId = table.row($(this).parents('tr')).data()["ReceiptId"];
        ProdReceiptNo = table.row($(this).parents('tr')).data()["ReceiptNo"];



        $('#myModal1').modal('show');
        $('#btnSave').hide();
        $('#btnUpdate').hide();
        $('#Qltydet').hide();
        $('#btnDel').show();
        //columnhide();

        getbyID(ProdReceiptEditId);

    });


    $(document).on('click', '.btnmainqltygrdadd', function () {
        debugger;
        Mode = 0;
        var table = $('#tblbillmaingrid').DataTable();
        ProdReceiptEditId = table.row($(this).parents('tr')).data()["ReceiptId"];
        ProdReceiptNo = table.row($(this).parents('tr')).data()["ReceiptNo"];

        $('#myModal1').modal('show');
        $('#btnSave').show();
        $('#btnUpdate').hide();
        $('#btnDel').hide();
        $('#Qltydet').show();
        //columnhide();
       
        getbyQualtyAddID(ProdReceiptEditId);

    });

    $(document).on('click', '.btnmaingrdqltyedit', function () {
        debugger;
        Mode = 1;
        var table = $('#tblbillmaingrid').DataTable();
        ProdReceiptEditId = table.row($(this).parents('tr')).data()["ReceiptId"];
        ProdReceiptNo = table.row($(this).parents('tr')).data()["ReceiptNo"];


        $('#myModal1').modal('show');
        $('#btnSave').hide();
        $('#btnUpdate').show();
        $('#btnDel').hide();
        $('#Qltydet').show();
       // columnhide();

        getbyQualtyEditID(ProdReceiptEditId);

    });

    $(document).on('click', '.btnmaingrdqltydelete', function () {
        debugger;
        Mode = 1;
        var table = $('#tblbillmaingrid').DataTable();
        ProdReceiptEditId = table.row($(this).parents('tr')).data()["ReceiptId"];
        ProdReceiptNo = table.row($(this).parents('tr')).data()["ReceiptNo"];

        $('#myModal1').modal('show');
        $('#btnSave').hide();
        $('#btnUpdate').hide();
        $('#Qltydet').show();
        $('#btnDel').show();
        // columnhide();

        getbyQualtyEditID(ProdReceiptEditId);

    });


    $(document).on('keyup', '.txtreceivedqty', function () {
        debugger;
        var table = $('#tblreceipt').DataTable();
        var Prgdetid = table.row($(this).parents('tr')).data()["ProdPrgDetId"];

        var val = $(this).val();




        //rowindex = $(this).closest('tr').index();

        //var currowind = ProdReceiptDet.slice(rowindex);
        ////currowind[0]['ProdPrgId'] = $("#txtordqty").val();
        //currowind[0]['ReceivedQty'] = $(this).val();

        for (var i in ProdReceiptDet) {
            if (ProdReceiptDet[i]['ProdPrgDetId'] == Prgdetid) {
                if ($(this).val() > ProdReceiptDet[i]['Balance']) {
                    //alert("Received Qty should not exceed than Balance Qty");
                    var msg = 'Received quantity should not exceed than Balance quantity...';
                    var flg = 4;
                    var mod = 1;
                    var ur = "";
                    AlartMessage(msg, flg, mod, ur);

                    ProdReceiptDet[i]['ReceivedQty'] = 0;
                }
                else {
                    ProdReceiptDet[i]['ReceivedQty'] = $(this).val();
                }
                break; //Stop this loop, we found it!
            }
        }
        //for (var i in ProdReceiptDet) {
        //    if (ProdReceiptDet[i]['IssueId'] == currowind[0]['IssueId']) {
        //        if ($(this).val() > ProdReceiptDet[rowindex]['Balance']) {
        //            alert("Received Qty should not exceed than Balance Qty");

        //            ProdReceiptDet[rowindex]['ReceivedQty'] = 0;
        //        }
        //        else {
        //            ProdReceiptDet[rowindex]['ReceivedQty'] = $(this).val();
        //        }
        //        break; //Stop this loop, we found it!
        //    }
        //}
        //ProdReceiptDet[rowindex] = currowind[0];

        var inputcount = 0;
        $('#tblreceipt tr').each(function () {
            inputcount++;
        });

        if (inputcount > 0) {
            //var tableinput = $('#tblinnergrid').DataTable();
            //tableinput.clear().draw();
            $('#tblreceipt').DataTable().destroy();
        }

        LoadReceiptGrid(ProdReceiptDet);


        var table = $('#tblreceipt').DataTable();
        var ecdata = table.rows().data();
        debugger;
        $('input[id=txtreceivedqty]').each(function (ig) {

            var row = $(this).closest('tr');
            for (var h = 0; h < ProdReceiptDet.length; h++) {
                debugger;
                if (ecdata[ig].ProdPrgDetId == ProdReceiptDet[h].ProdPrgDetId && ecdata[ig].ProdPrgDetId == Prgdetid) {

                    var ReceivedQty = ProdReceiptDet[h].ReceivedQty;

                    row.find('#txtreceivedqty').focus().val('').val(ReceivedQty);
                    return true;
                }
            }

        });

    });



    //$(document).on('keyup', '.txtrejectedqty', function () {
    //    debugger;
    //    var table = $('#tblreceipt').DataTable();
    //    var Prgdetid = table.row($(this).parents('tr')).data()["ProdPrgDetId"];

    //    var val = $(this).val();




    //    //rowindex = $(this).closest('tr').index();

    //    //var currowind = ProdReceiptDet.slice(rowindex);
    //    ////currowind[0]['ProdPrgId'] = $("#txtordqty").val();
    //    //currowind[0]['ReceivedQty'] = $(this).val();

    //    for (var i in ProdReceiptDet) {
    //        if (ProdReceiptDet[i]['ProdPrgDetId'] == Prgdetid) {
    //            if ($(this).val() > ProdReceiptDet[i]['Balance']) {
    //                alert("Received Qty should not exceed than Balance Qty");

    //                ProdReceiptDet[i]['ReceivedQty'] = 0;
    //            }
    //            else {
    //                ProdReceiptDet[i]['ReceivedQty'] = $(this).val();
    //            }
    //            break; //Stop this loop, we found it!
    //        }
    //    }
    //    //for (var i in ProdReceiptDet) {
    //    //    if (ProdReceiptDet[i]['IssueId'] == currowind[0]['IssueId']) {
    //    //        if ($(this).val() > ProdReceiptDet[rowindex]['Balance']) {
    //    //            alert("Received Qty should not exceed than Balance Qty");

    //    //            ProdReceiptDet[rowindex]['ReceivedQty'] = 0;
    //    //        }
    //    //        else {
    //    //            ProdReceiptDet[rowindex]['ReceivedQty'] = $(this).val();
    //    //        }
    //    //        break; //Stop this loop, we found it!
    //    //    }
    //    //}
    //    //ProdReceiptDet[rowindex] = currowind[0];

    //    var inputcount = 0;
    //    $('#tblreceipt tr').each(function () {
    //        inputcount++;
    //    });

    //    if (inputcount > 0) {
    //        //var tableinput = $('#tblinnergrid').DataTable();
    //        //tableinput.clear().draw();
    //        $('#tblreceipt').DataTable().destroy();
    //    }

    //    LoadReceiptGrid(ProdReceiptDet);


    //    var table = $('#tblreceipt').DataTable();
    //    var ecdata = table.rows().data();
    //    debugger;
    //    $('input[id=txtreceivedqty]').each(function (ig) {

    //        var row = $(this).closest('tr');
    //        for (var h = 0; h < ProdReceiptDet.length; h++) {
    //            debugger;
    //            if (ecdata[ig].ProdPrgDetId == ProdReceiptDet[h].ProdPrgDetId && ecdata[ig].ProdPrgDetId == Prgdetid) {

    //                var ReceivedQty = ProdReceiptDet[h].ReceivedQty;

    //                row.find('#txtreceivedqty').focus().val('').val(ReceivedQty);
    //                return true;
    //            }
    //        }

    //    });

    //});



    $(document).on('keyup', '.txtrejectedqty', function () {
        debugger;
        var table = $('#tblreceipt').DataTable();
        //rowindex = $(this).closest('tr').index();
        var currrejectedqty = 0;
        var currreceivedqty = 0;
        var curracceptqty = 0;
        var currreworkqty = 0;
        var Totrejectedqty = 0;

        //var currowind = ProdReceiptDet.slice(rowindex);

        var Prgdetid = table.row($(this).parents('tr')).data()["ProdPrgDetId"];
        //currowind[0]['ProdPrgId'] = $("#txtordqty").val();
        //currowind[0]['RejectionQty'] = $(this).val();

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
                    ProdReceiptDet[i]['RejectionQty'] = 0;
                }
                else {
                    ProdReceiptDet[i]['RejectionQty'] = $(this).val();
                }
                break; //Stop this loop, we found it!
            }
        }
        //ProdReceiptDet[rowindex] = currowind[0];

        //var inputcount = 0;
        //$('#tblreceipt tr').each(function () {
        //    inputcount++;
        //});

        //if (inputcount > 0) {
        //    //var tableinput = $('#tblinnergrid').DataTable();
        //    //tableinput.clear().draw();
        //    $('#tblreceipt').DataTable().destroy();
        //}

        LoadReceiptGrid(ProdReceiptDet);
        var table = $('#tblreceipt').DataTable();
        var ecdata = table.rows().data();
        debugger;
        $('input[id=txtrejectedqty]').each(function (ig) {

            var row = $(this).closest('tr');
            for (var h = 0; h < ProdReceiptDet.length; h++) {
                debugger;
                if (ecdata[ig].ProdPrgDetId == ProdReceiptDet[h].ProdPrgDetId && ecdata[ig].ProdPrgDetId == Prgdetid) {

                    var RejectionQty = ProdReceiptDet[h].RejectionQty;

                    row.find('#txtrejectedqty').focus().val('').val(RejectionQty);
                    return true;
                }
            }

        });


       // LoadReceiptGrid(ProdReceiptDet);
    });

    $(document).on('keyup', '.txtacceptqty', function () {
        debugger;
        var table = $('#tblreceipt').DataTable();
        var Prgdetid = table.row($(this).parents('tr')).data()["ProdPrgDetId"];
       // rowindex = $(this).closest('tr').index();
        var currrejectedqty = 0;
        var currreceivedqty = 0;
        var curracceptqty = 0;
        var currreworkqty = 0;
        var Totrejectedqty = 0;

       // var currowind = ProdReceiptDet.slice(rowindex);
        //currowind[0]['ProdPrgId'] = $("#txtordqty").val();
        //currowind[0]['AcceptQty'] = $(this).val();
        var Prgdetid = table.row($(this).parents('tr')).data()["ProdPrgDetId"];

        for (var i in ProdReceiptDet) {
            if (ProdReceiptDet[i]['ProdPrgDetId'] == Prgdetid) {
                //if ((parseInt($(this).val()) + parseint(ProdReceiptDet[i]['ReceivedQty'])) > parseInt(ProdReceiptDet[i]['Balance'])) {
                curracceptqty = $(this).val();
                currreceivedqty = ProdReceiptDet[i]['ReceivedQty'];
                currrejectedqty = ProdReceiptDet[i]['RejectionQty'];
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
        //ProdReceiptDet[rowindex] = currowind[0];

        //var inputcount = 0;
        //$('#tblreceipt tr').each(function () {
        //    inputcount++;
        //});

        //if (inputcount > 0) {
        //    //var tableinput = $('#tblinnergrid').DataTable();
        //    //tableinput.clear().draw();
        //    $('#tblreceipt').DataTable().destroy();
        //}
        LoadReceiptGrid(ProdReceiptDet);
        var table = $('#tblreceipt').DataTable();
        var ecdata = table.rows().data();
        debugger;
        $('input[id=txtacceptqty]').each(function (ig) {

            var row = $(this).closest('tr');
            for (var h = 0; h < ProdReceiptDet.length; h++) {
                debugger;
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
        debugger;
        var table = $('#tblreceipt').DataTable();
        //rowindex = $(this).closest('tr').index();
        var Prgdetid = table.row($(this).parents('tr')).data()["ProdPrgDetId"];
        var currrejectedqty = 0;
        var currreceivedqty = 0;
        var curracceptqty = 0;
        var currreworkqty = 0;
        var Totrejectedqty = 0;

        //var currowind = ProdReceiptDet.slice(rowindex);
        //currowind[0]['ProdPrgId'] = $("#txtordqty").val();
       // currowind[0]['ReworkQty'] = $(this).val();
       // var Prgdetid = table.row($(this).parents('tr')).data()["ProdPrgDetId"];

        for (var i in ProdReceiptDet) {
            if (ProdReceiptDet[i]['ProdPrgDetId'] == Prgdetid) {
                //if ((parseInt($(this).val()) + parseint(ProdReceiptDet[i]['ReceivedQty'])) > parseInt(ProdReceiptDet[i]['Balance'])) {
                currreworkqty = $(this).val();
                currreceivedqty = ProdReceiptDet[i]['ReceivedQty'];
                currrejectedqty = ProdReceiptDet[i]['RejectionQty'];
                curracceptqty = ProdReceiptDet[i]['AcceptQty'];

                Totrejectedqty = Number(curracceptqty) + Number(currrejectedqty) + Number(currreworkqty);

                if (Totrejectedqty > ProdReceiptDet[i]['ReceivedQty']) {
                    //alert("Accepted + Rejected quantity + Rework quantity should not exceed than Received quantity...");
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
        //ProdReceiptDet[rowindex] = currowind[0];

        //var inputcount = 0;
        //$('#tblreceipt tr').each(function () {
        //    inputcount++;
        //});

        //if (inputcount > 0) {
        //    //var tableinput = $('#tblinnergrid').DataTable();
        //    //tableinput.clear().draw();
        //    $('#tblreceipt').DataTable().destroy();
        //}
        LoadReceiptGrid(ProdReceiptDet);
        var table = $('#tblreceipt').DataTable();
        var ecdata = table.rows().data();
        debugger;
        $('input[id=txtreworkqty]').each(function (ig) {

            var row = $(this).closest('tr');
            for (var h = 0; h < ProdReceiptDet.length; h++) {
                debugger;
                if (ecdata[ig].ProdPrgDetId == ProdReceiptDet[h].ProdPrgDetId && ecdata[ig].ProdPrgDetId == Prgdetid) {

                    var ReworkQty = ProdReceiptDet[h].ReworkQty;

                    row.find('#txtreworkqty').focus().val('').val(ReworkQty);
                    return true;
                }
            }

        });

       // LoadReceiptGrid(ProdReceiptDet);
    });


    $('#btnreasonadd').click(function () {
        debugger;
        //validation and add order items
        var isAllValid = true;
        var leng = 0;

        debugger;
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
                debugger;

                ////Finding the max value of an attribute in an array of objects
                //var max = 0;
                //jQuery.map(Reasonlist, function (obj) {
                //    debugger;
                //    if (obj.Seq > max)
                //        max = obj.Seq;
                //});
                ////End

                //if (Reasonseq == 0 && Reasonlist.length == 0) {
                //    Reasonseq = 1;
                //}
                //else {
                //    Reasonseq = max + 1//comboItemList.length+1;
                //}

                var ReasonListObj = {
                    //Seq:Reasonseq,
                    RecptDetId: ReceptDetId,
                    Qty: $('#txtqty').val(),
                    ReasonId: $('#ddlreason').val(),
                    Reason: $("#ddlreason option:selected").text(),
                    ReworkProcessid: null,
                    Process: '',
                    ReworkQty: 0,

                    Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
                };

                Reasonlist.push(ReasonListObj);

                var totalamnt = 0;
                for (var e = 0; e < Reasonlist.length; e++) {
                    if (Reasonlist[e].RecptDetId == ProdPrgDetId) {
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
                        return (v.RecptDetId == ReceptDetId);
                    });
                    Reasonlistdet = colorempty;
                    loadReasonTable(Reasonlistdet);

                   // loadReasonTable(Reasonlist);
                }
                ////var cuttingfilterlist = [];

                //if (cuttingDetlist != undefined) {
                //    //cuttingfilterlist = $.grep(cuttingDetlist, function (element, index) {
                //    //    return element.CuttingOrdDetId == CuttingOrddetid;
                //    //});
                //    for (var i in cuttingDetlist) {
                //        if (cuttingDetlist[i]['CuttingOrdDetId'] == CuttingOrdDetid) {
                //            cuttingDetlist[i]['Recqty'] = (parseInt(cuttingDetlist[i]['Recqty']) + parseInt($('#txtqty').val()));
                //            cuttingDetlist[i]['Weight'] = ((parseInt(cuttingDetlist[i]['Grammage']) * parseInt(cuttingDetlist[i]['Recqty'])) / 1000);
                //            break; //Stop this loop, we found it!
                //        }
                //    }
                //}

                //LoadCuttingDetails(cuttingDetlist);

                $('#ddlreason').val(0);
                $('#txtqty').val('');
            }
        }
    });


    $('#btnreworkadd').click(function () {
        debugger;
        //validation and add order items
        var isAllValid = true;
        var leng = 0;

        debugger;
      


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
                debugger;

                ////Finding the max value of an attribute in an array of objects
                //var max = 0;
                //jQuery.map(Reasonlist, function (obj) {
                //    debugger;
                //    if (obj.Seq > max)
                //        max = obj.Seq;
                //});
                ////End

                //if (Reasonseq == 0 && Reasonlist.length == 0) {
                //    Reasonseq = 1;
                //}
                //else {
                //    Reasonseq = max + 1//comboItemList.length+1;
                //}

                var ReasonListObj = {
                    //Seq:Reasonseq,
                    RecptDetId: ReceptDetId,
                    Qty: 0,
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
                    if (Reasonlist[e].RecptDetId == ProdPrgDetId) {
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
                        return (v.RecptDetId == ReceptDetId);
                    });
                    Reasonlistdet = colorempty;
                    loadReasonTable(Reasonlistdet);

                   // loadReasonTable(Reasonlist);
                }
                ////var cuttingfilterlist = [];

                //if (cuttingDetlist != undefined) {
                //    //cuttingfilterlist = $.grep(cuttingDetlist, function (element, index) {
                //    //    return element.CuttingOrdDetId == CuttingOrddetid;
                //    //});
                //    for (var i in cuttingDetlist) {
                //        if (cuttingDetlist[i]['CuttingOrdDetId'] == CuttingOrdDetid) {
                //            cuttingDetlist[i]['Recqty'] = (parseInt(cuttingDetlist[i]['Recqty']) + parseInt($('#txtqty').val()));
                //            cuttingDetlist[i]['Weight'] = ((parseInt(cuttingDetlist[i]['Grammage']) * parseInt(cuttingDetlist[i]['Recqty'])) / 1000);
                //            break; //Stop this loop, we found it!
                //        }
                //    }
                //}

                //LoadCuttingDetails(cuttingDetlist);

                $('#ddlreason').val(0);
                $('#txtqty').val('');
            }
        }
    });



    //$(document).on('click', '.btnrcpdetadd', function () {
    //    debugger;
    //    rowindex = $(this).closest('tr').index();
    //    var currentrow = ProdReceiptDet.slice(rowindex);

    //    ProdPrgDetId = currentrow[0].ProdPrgDetId;
    //    Rejectionqty = currentrow[0].RejectionQty;
    //    ReProcessid = currentrow[0].ReworkProcessid;
    //    ReworkProcQty = currentrow[0].ReworkQty; 
    //    ReceptDetId = currentrow[0].ReceptDetId;
    //    //var returnedData = $.grep(bundlelist, function (element, index) {
    //    //    return element.CuttingOrddetid == ProdPrgDetId;
    //    //});

    //    //loadbundleTable(returnedData);

    //});

    $("#btnaddnew").click(function () {
        debugger;
        DetRowID = 0;
        companyid = $("#ddlCompany").val();
        companyunitid = $("#ddlUnit").val();

        //var Processid = $("#ddlProcess").val();
        //var Suppid = $("#ddlSupplier").val();

        //if (Suppid == 0) {
        //    alert("Please select Supplier");
        //    return true;
        //}
        //if (Processid == 0) {
        //    alert("Please select Process");
        //    return true;
        //}

        if (companyid == 0) {
            //alert("Please select Company");
            var msg = 'Please select Company...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
        }
        else if (companyunitid == 0) {
            //alert("Please select Company Unit");
            var msg = 'Please select Company Unit...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
        }
        else {
            $("#ddlCompany").val(companyid);
            $("#ddlUnit").val(companyunitid);
            $('#ddlProcess').val(0);
            $('#ddlWorkDiv').val(0);
            $('#myModal').modal('show');

            //Loading Multiple Issue grid
            LoadCommonProductionIssueList(0, 0, 0);

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
            debugger;
            if ($('#optinnerexternal').is(':checked')) {

                RadioEClick();
            }
            else if ($('#optinnerinternal').is(':checked')) {
                RadioIClick();
            }
        }
    });

    //$(document).on('click', '.btnmaingrddelete', function () {
    //    debugger;
    //    rowindex = $(this).closest('tr').index();

    //    var currow = maintbllist.slice(rowindex);
    //    var ProdReceiptId = currow[0]['ReceiptId'];
    //    Delete(ProdReceiptId);
    //});

    $("#btnsubmit").click(function () {
        debugger;


        //var list = [];

        //for (var j = 0; j < MultipleProdIssueDet.length; j++) {
        //    if (MultipleProdIssueDet[j].CheckLoad == "Y") {

        //        JOrdID = JOrdID + "," + MultipleProdIssueDet[j].ProdIssueId;

        //        list.push(entrygriddet[j]);
        //    }
        //}


        //if (list.length == 0) {
        //    alert('Please select checkboxes for any one row..');
        //    return true;
        //}


        if (DetRowID == 0) {
            //alert('Please select checkboxes for any one row..');
            var msg = 'Please select checkboxes for any one row...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
            return true;
        }

        companyid = $("#ddlCompany").val();
        companyunitid = $("#ddlUnit").val();
        processid = $("#ddlProcess").val();
        workdivid = $("#ddlWorkDiv").val();
        supplierid = $("#ddlSupplier").val();

        editmasunitstore = 0;
        editsubmasunitstore = 0;
        editsubstore = 0;
        LoadEmployeeStoreunit();
        LoadUserCompanyDDL();

        var Supp = $("#ddlSupplier option:selected").text();

        if (processid == 0) {
            //alert("Select Store to proceed...");
            //$('#ddlProcess').css('border-color', 'red');

            $('#ddlProcess').siblings(".select2-container").css('border', '1px solid red');
        }
        else if (workdivid == 0 && $('#optinnerinternal').is(':checked')) {
            // $('#ddlWorkDiv').css('border-color', 'red');
            $('#ddlWorkDiv').siblings(".select2-container").css('border', '1px solid red');
            $('#ddlSupplier').css('border-color', 'lightgrey');
        }
        else if (supplierid == 0 && $('#optinnerexternal').is(':checked')) {
            //$('#ddlSupplier').css('border-color', 'red');
            $('#ddlSupplier').siblings(".select2-container").css('border', '1px solid red');
            $('#ddlWorkDiv').css('border-color', 'lightgrey');
        }
        else {

            $("#ddlinnercompany").val(companyid);
            $("#ddlinnercompunit").val(companyunitid);
            $("#ddlinnerprocess").val(processid);
            // $("#ddlinnerworkdiv").val(workdivid);



            GenerateProductionIssueNumber(table, column, compId, Docum);

            $('#myModal1').modal('show');
            if (DetRowID != 0) {
                LoadCommonProdReciptList(DetRowID);
            }
            else {
                LoadCommonProdReciptList(0);
            }

            //if ($('#optinnerexternal').is(':checked')) {
            //    LoadSupplierDDL("#ddlinnerworkdiv");
            //    //var supplierid = $('#ddlSupplier').val();
            //    $("#ddlinnerworkdiv").val(supplierid);
            //    //$("#ddlinnerworkdiv > [value=" + supplierid + "]").attr("selected", "true");
            //}
            //if ($('#optinnerinternal').is(':checked')) {
            //    LoadWorkdivisionDDL("#ddlinnerworkdiv");
            //    //var workdivid = $('#ddlWorkDiv').val();
            //    $("#ddlinnerworkdiv").val(workdivid);
            //    //$("#ddlinnerworkdiv > [value=" + workdivid + "]").attr("selected", "true");
            //}

            var Supp = $("#ddlSupplier option:selected").text();
            var SuppId = $('#ddlSupplier').val();

            if (SuppId == 0) {
                var Supp = $("#ddlWorkDiv option:selected").text();
                var SuppId = $('#ddlWorkDiv').val();
            }


            if ($('#optinnerexternal').is(':checked')) {
                LoadSupplierDDL("#ddlinnerworkdiv");
                var supplierid = $('#ddlSupplier').val();
                $('#ddlinnerworkdiv').val(Supp);
            }
            if ($('#optinnerinternal').is(':checked')) {
                LoadWorkdivisionDDL("#ddlinnerworkdiv");
                var workdivid = $('#ddlWorkDiv').val();
                $('#ddlinnerworkdiv').val(Supp);
            }

            $('#txinnerworkdivid').val(SuppId);

            $('#btnAdd').show();
            $('#btnUpdate').hide();
            $('#btnDel').hide();
            $('#Qltydet').hide();
            var typ = $('input[name="optwrkord"]:checked').attr('value');
            OrderType = typ;
          //  columnhide();

        }
    });

    $("#btnclose").click(function () {

        debugger;
        var reasoncount = 0;
        $('#tblreason tr').each(function () {
            reasoncount++;
        });

        if (reasoncount > 0) {
            var tableinput = $('#tblreason').DataTable();
            tableinput.clear().draw();
            //$('#tblreason').DataTable().destroy();
        }

        var receiptcount = 0;
        $('#tblreceipt tr').each(function () {
            receiptcount++;
        });

        if (receiptcount > 0) {
            var tableinput = $('#tblreceipt').DataTable();
            tableinput.clear().draw();
            //$('#tblreceipt').DataTable().destroy();
        }

        $('#myModal1').modal('hide');
    });

    $("#ddlProcess").change(function () {
        debugger;
        processid = $('#ddlProcess').val();
        //companyid = $('#ddlinnerComp').val();
        workdivid = $('#ddlWorkDiv').val();
        supplierid = $('#ddlSupplier').val();
        //GetOrderTypeProcessType();

        if ($('#optinnerinternal').is(':checked')) {
            InterExter = "I";
        }
        else if ($('#optinnerexternal').is(':checked')) {
            InterExter = "E";
        }

        if (processid != 0) {
            $('#ddlProcess').css('border-color', 'lightgrey');
        }
        if (workdivid == 0 && InterExter == "I") {
            $('#ddlWorkDiv').css('border-color', 'red');
            $('#ddlSupplier').css('border-color', 'lightgrey');
        }
        else if (supplierid == 0 && InterExter == "E") {
            $('#ddlSupplier').css('border-color', 'red');
            $('#ddlWorkDiv').css('border-color', 'lightgrey');
        }
        else if (workdivid > 0 || supplierid > 0) {
            if (workdivid > 0) {
                LoadCommonProductionIssueList(companyunitid, processid, workdivid, InterExter);
            }
            else {
                LoadCommonProductionIssueList(companyunitid, processid, supplierid, InterExter);
            }

        }
    });

    $("#ddlWorkDiv").change(function () {
        debugger;
        processid = $('#ddlProcess').val();
        //companyid = $('#ddlinnerComp').val();
        workdivid = $('#ddlWorkDiv').val();
        //GetOrderTypeProcessType();

        if ($('#optinnerinternal').is(':checked')) {
            InterExter = "I";
        }
        else if ($('#optinnerexternal').is(':checked')) {
            InterExter = "E";
        }

        if (workdivid != 0) {
            $('#ddlWorkDiv').css('border-color', 'lightgrey');
        }

        if (processid == 0) {
            $('#ddlProcess').css('border-color', 'red');
        }
        else if (processid > 0) {
            LoadCommonProductionIssueList(companyunitid, processid, workdivid, InterExter);
        }
    });

    $("#ddlSupplier").change(function () {
        debugger;
        processid = $('#ddlProcess').val();
        //companyid = $('#ddlinnerComp').val();
        supplierid = $('#ddlSupplier').val();
        //GetOrderTypeProcessType();

        if ($('#optinnerinternal').is(':checked')) {
            InterExter = "I";
        }
        else if ($('#optinnerexternal').is(':checked')) {
            InterExter = "E";
        }

        if (supplierid != 0) {
            $('#ddlSupplier').css('border-color', 'lightgrey');
        }

        if (processid == 0) {
            $('#ddlProcess').css('border-color', 'red');
        }
        else if (processid > 0) {
            LoadCommonProductionIssueList(companyunitid, processid, supplierid, InterExter);
        }
    });

    $('#tblbillmaingrid').on('click', 'tr', function (e) {
        debugger;

        var table = $('#tblbillmaingrid').DataTable();

        var row = $(this).closest('tr');
        var data = $('#tblbillmaingrid').dataTable().fnGetData(row);
        var ProcessOrdNo = data.ReceiptNo;
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
    //LoadStoreUnitDDL("#ddlSubStore");
    //LoadCompanyDDL("#ddlMainStore");
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

function RadioEClick() {
    debugger;
    $('#ddlWorkDiv').hide();
    $('#lblworkdiv').hide();

    $('#ddlSupplier').show();
    $('#lblsupplier').show();
}

function RadioIClick() {
    debugger;
    $('#ddlWorkDiv').show();
    $('#lblworkdiv').show();

    $('#ddlSupplier').hide();
    $('#lblsupplier').hide();
}

function getbyID(ProdReceiptId) {
    debugger;
    //$('#ddlcutheaderCompany').css('border-color', 'lightgrey');
    $.ajax({
        type: "POST",
        url: "/CommonProductionReceipt/GetProdReceiptItemstock/",
        data: JSON.stringify({ ReceiptNo: ProdReceiptNo }),
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            ItemStockInfo = result;

            //if (ItemStockInfo == true) {
            //    $("#btnUpdate").attr('disabled', true);
            //}
            //else {
            //    $("#btnUpdate").attr('disabled', false);

            $.ajax({
                url: "/CommonProductionReceipt/GetProdReceiptHeaderInfo/" + ProdReceiptId,
                typr: "GET",
                contentType: "application/json;charset=UTF-8",
                dataType: "json",
                success: function (result) {
                    debugger;
                    var obj = [];
                    obj = result;

                    obj[0].Receiptid = ProdReceiptId;
                    $("#txtReceiptNo").val(obj[0].ReceiptNo);
                    $('#txtissueDate').val(moment(obj[0].ReceiptDate).format('DD/MM/YYYY'));
                    $("#txinnerworkdivid").val(obj[0].WorkDivisionId);
                    $("#ddlinnercompany").val(obj[0].CompanyId);
                    $("#ddlinnerprocess").val(obj[0].ProcessId);
                    $("#ddlinnercompunit").val(obj[0].CompanyUnitId);
                    $('#txtremarks').val(obj[0].Remarks);
                    $("#txtDCNo").val(obj[0].DcNumber);
                    $("#ddlinnerworkdiv").val(obj[0].Processor);

                    $("#txtQualityNo").val(obj[0].Qlty_No);
                    $('#txtQualitytDate').val(moment(obj[0].Qlty_date).format('DD/MM/YYYY'));

                    if (obj[0].Qlty_No != '') {
                        alert ('Quality has been made,GRN cannot update or Delete..')
                        $("#btnUpdate").attr('disabled', true);
                        $("#btnDel").attr('disabled', true);
                    }

                    //OrderType = val(obj[0].JobWrkSample);

                    OrderType = obj[0]["JobWrkSample"];
                    IntOrExt = obj[0]["InterorExter"];

                    companyid = obj[0].CompanyId;

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

                    $.ajax({
                        type: "POST",
                        url: '/CommonProductionReceipt/GetProdReceiptForDet/',
                        data: JSON.stringify({ ProdReceptid: ProdReceiptId }),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (json) {
                            debugger;
                            ProdReceiptDet = json;
                            LoadReceiptGrid(ProdReceiptDet);

                            var currowind = ProdReceiptDet.slice(0);
                            var RecptDetId = currowind[0]['ReceptDetId'];

                            $.ajax({
                                type: "POST",
                                url: '/CommonProductionReceipt/GetProdReasonForDet/',
                                data: JSON.stringify({ ReceptDetid: RecptDetId }),
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                success: function (json) {
                                    debugger;
                                    Reasonlist = json;

                                    //for (var e = 0; e < ProdReceiptDet.length; e++) {
                                    //    for (var d = 0; d < Reasonlist.length; d++) {
                                    //        if (Reasonlist[d].RecptDetId == ProdReceiptDet[e].ReceptDetId) {
                                    //            Reasonlist[d].RecptDetId = ProdReceiptDet[e].ProdPrgDetId;
                                    //        }
                                    //    }
                                    //}

                                    loadReasonTable(Reasonlist);
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
                },
                error: function (errormessage) {
                    alert(errormessage.responseText);
                }
            });
        }

        //$('#btnUpdate').show();
        //}
    });


    return false;
}


function getbyQualtyAddID(ProdReceiptId) {
    debugger;
    //$('#ddlcutheaderCompany').css('border-color', 'lightgrey');
    $.ajax({
        type: "POST",
        url: "/CommonProductionReceipt/GetProdReceiptItemstock/",
        data: JSON.stringify({ ReceiptNo: ProdReceiptNo }),
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            ItemStockInfo = result;
     
            $.ajax({
                url: "/CommonProductionReceipt/GetProdReceiptHeaderInfo/" + ProdReceiptId,
                typr: "GET",
                contentType: "application/json;charset=UTF-8",
                dataType: "json",
                success: function (result) {
                    debugger;
                    var obj = [];
                    obj = result;

                    obj[0].Receiptid = ProdReceiptId;
                    $("#txtReceiptNo").val(obj[0].ReceiptNo);
                    $('#txtissueDate').val(moment(obj[0].ReceiptDate).format('DD/MM/YYYY'));
                    $("#txinnerworkdivid").val(obj[0].WorkDivisionId);
                    $("#ddlinnercompany").val(obj[0].CompanyId);
                    $("#ddlinnerprocess").val(obj[0].ProcessId);
                    $("#ddlinnercompunit").val(obj[0].CompanyUnitId);
                    $('#txtremarks').val(obj[0].Remarks);
                    $("#txtDCNo").val(obj[0].DcNumber);
                    $("#ddlinnerworkdiv").val(obj[0].Processor);

                    //OrderType = val(obj[0].JobWrkSample);

                    OrderType = obj[0]["JobWrkSample"];
                    IntOrExt = obj[0]["InterorExter"];

                    companyid = obj[0].CompanyId;

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


                    GenerateProductionQltyNumber(table, column, compId, Docum);

                    $.ajax({
                        type: "POST",
                        url: '/CommonProductionReceipt/GetProdReceiptForDet/',
                        data: JSON.stringify({ ProdReceptid: ProdReceiptId }),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (json) {
                            debugger;
                            ProdReceiptDet = json;

                            $.each(ProdReceiptDet, function (i) {
                                ProdReceiptDet[i].AcceptQty = ProdReceiptDet[i].ReceivedQty;
                            })

                            LoadReceiptGrid(ProdReceiptDet);

                            var currowind = ProdReceiptDet.slice(0);
                            var RecptDetId = currowind[0]['ReceptDetId'];

                            $.ajax({
                                type: "POST",
                                url: '/CommonProductionReceipt/GetProdReasonForDet/',
                                data: JSON.stringify({ ReceptDetid: RecptDetId }),
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                success: function (json) {
                                    debugger;
                                    Reasonlist = json;

                                    //for (var e = 0; e < ProdReceiptDet.length; e++) {
                                    //    for (var d = 0; d < Reasonlist.length; d++) {
                                    //        if (Reasonlist[d].RecptDetId == ProdReceiptDet[e].ReceptDetId) {
                                    //            Reasonlist[d].RecptDetId = ProdReceiptDet[e].ProdPrgDetId;
                                    //        }
                                    //    }
                                    //}

                                    loadReasonTable(Reasonlist);
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
                },
                error: function (errormessage) {
                    alert(errormessage.responseText);
                }
            });
        }

        //$('#btnUpdate').show();
        //}
    });


    return false;
}

function getbyQualtyEditID(ProdReceiptId) {
    debugger;
    //$('#ddlcutheaderCompany').css('border-color', 'lightgrey');
    $.ajax({
        type: "POST",
        url: "/CommonProductionReceipt/GetProdReceiptItemstock/",
        data: JSON.stringify({ ReceiptNo: ProdReceiptNo }),
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            ItemStockInfo = result;

            //if (ItemStockInfo == true) {
            //    $("#btnUpdate").attr('disabled', true);
            //}
            //else {
            //    $("#btnUpdate").attr('disabled', false);

            $.ajax({
                url: "/CommonProductionReceipt/GetProdReceiptHeaderInfo/" + ProdReceiptId,
                typr: "GET",
                contentType: "application/json;charset=UTF-8",
                dataType: "json",
                success: function (result) {
                    debugger;
                    var obj = [];
                    obj = result;

                    obj[0].Receiptid = ProdReceiptId;
                    $("#txtReceiptNo").val(obj[0].ReceiptNo);
                    $('#txtissueDate').val(moment(obj[0].ReceiptDate).format('DD/MM/YYYY'));
                    $("#txinnerworkdivid").val(obj[0].WorkDivisionId);
                    $("#ddlinnercompany").val(obj[0].CompanyId);
                    $("#ddlinnerprocess").val(obj[0].ProcessId);
                    $("#ddlinnercompunit").val(obj[0].CompanyUnitId);
                    $('#txtremarks').val(obj[0].Remarks);
                    $("#txtDCNo").val(obj[0].DcNumber);
                    $("#ddlinnerworkdiv").val(obj[0].Processor);

                    $("#txtQualityNo").val(obj[0].Qlty_No);
                    $('#txtQualitytDate').val(moment(obj[0].Qlty_date).format('DD/MM/YYYY'));
                    CheckAlloted();

                    //OrderType = val(obj[0].JobWrkSample);

                    OrderType = obj[0]["JobWrkSample"];
                    IntOrExt = obj[0]["InterorExter"];

                    companyid = obj[0].CompanyId;

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


                    

                    $.ajax({
                        type: "POST",
                        url: '/CommonProductionReceipt/GetProdReceiptForDet/',
                        data: JSON.stringify({ ProdReceptid: ProdReceiptId }),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (json) {
                            debugger;
                            ProdReceiptDet = json;
                            LoadReceiptGrid(ProdReceiptDet);

                            var currowind = ProdReceiptDet.slice(0);
                            var RecptDetId = currowind[0]['ReceptDetId'];

                            $.ajax({
                                type: "POST",
                                url: '/CommonProductionReceipt/GetProdReasonForDet/',
                                data: JSON.stringify({ ReceptDetid: ProdReceiptId }),
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                success: function (json) {
                                    debugger;
                                    Reasonlist = json;

                                    //for (var e = 0; e < ProdReceiptDet.length; e++) {
                                    //    for (var d = 0; d < Reasonlist.length; d++) {
                                    //        if (Reasonlist[d].RecptDetId == ProdReceiptDet[e].ReceptDetId) {
                                    //            Reasonlist[d].RecptDetId = ProdReceiptDet[e].ProdPrgDetId;
                                    //        }
                                    //    }
                                    //}

                                    loadReasonTable(Reasonlist);
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
                },
                error: function (errormessage) {
                    alert(errormessage.responseText);
                }
            });
        }

        //$('#btnUpdate').show();
        //}
    });


    return false;
}

function clickonlist() {
    debugger;
    $('#tblbillmaingrid').DataTable().destroy();
    companyid = $('#ddlMCompany').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    if ($('#optinternal').is(':checked')) {
        InterExter = "I";
    }
    else if ($('#optexternal').is(':checked')) {
        InterExter = "E";
    }

    //$('#ddlMDcNo').empty();
    //$('#ddlMReceiptNo').empty();

    LoadData(companyid, FDate, TDate, InterExter);
    LoadDDL(companyid, FDate, TDate, InterExter);
}

function ListFilter() {
    debugger;
    $('#tblbillmaingrid').DataTable().destroy();
    companyid = $('#ddlMCompany').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    if ($('#optinternal').is(':checked')) {
        InterExter = "I";
    }
    else if ($('#optexternal').is(':checked')) {
        InterExter = "E";
    }

    LoadData(companyid, FDate, TDate, InterExter);
}

function CMainList() {

    $('#tblbillmaingrid').DataTable().destroy();
    companyid = $('#ddlMCompany').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    if ($('#optinternal').is(':checked')) {
        InterExter = "I";
    }
    else if ($('#optexternal').is(':checked')) {
        InterExter = "E";
    }
    ChkRefno = true;
    ChkOrdno = true;
    DtChk = false;
    ChkProcess = true;
    ChkDCNo = true;
    ChkRCNo = true;
    ChkJobno = true;
    ChkComp = true;

    LoadDDL(companyid, fromdate, todate, InterExter);
    LoadData(companyid, FDate, TDate, InterExter);
}
function OMainList() {

    $('#tblbillmaingrid').DataTable().destroy();
    companyid = $('#ddlMCompany').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    if ($('#optinternal').is(':checked')) {
        InterExter = "I";
    }
    else if ($('#optexternal').is(':checked')) {
        InterExter = "E";
    }
    ChkRefno = false;
    ChkOrdno = false;
    DtChk = false;
    ChkProcess = true;
    ChkDCNo = true;
    ChkRCNo = true;
    ChkJobno = true;
    ChkComp = false;


    LoadDDL(companyid, fromdate, todate, InterExter);
    LoadData(companyid, FDate, TDate, InterExter);
}
function DCMainList() {

    $('#tblbillmaingrid').DataTable().destroy();
    companyid = $('#ddlMCompany').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    if ($('#optinternal').is(':checked')) {
        InterExter = "I";
    }
    else if ($('#optexternal').is(':checked')) {
        InterExter = "E";
    }
    ChkRefno = false;
    ChkOrdno = false;
    DtChk = false;
    ChkProcess = false;
    ChkDCNo = false;
    ChkRCNo = false;
    ChkJobno = false;
    ChkComp = false;

    LoadDDL(companyid, fromdate, todate, InterExter);
    LoadData(companyid, FDate, TDate, InterExter);
}
function RCMainList() {

    $('#tblbillmaingrid').DataTable().destroy();
    companyid = $('#ddlMCompany').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    if ($('#optinternal').is(':checked')) {
        InterExter = "I";
    }
    else if ($('#optexternal').is(':checked')) {
        InterExter = "E";
    }
    ChkRefno = false;
    ChkOrdno = false;
    DtChk = false;
    ChkProcess = false;
    ChkDCNo = false;
    ChkRCNo = false;
    ChkJobno = false;
    ChkComp = false;

    LoadDDL(companyid, fromdate, todate, InterExter);
    LoadData(companyid, FDate, TDate, InterExter);
}

function PMainList() {

    $('#tblbillmaingrid').DataTable().destroy();
    companyid = $('#ddlMCompany').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    if ($('#optinternal').is(':checked')) {
        InterExter = "I";
    }
    else if ($('#optexternal').is(':checked')) {
        InterExter = "E";
    }
    ChkRefno = false;
    ChkOrdno = false;
    DtChk = false;
    ChkProcess = false;
    ChkDCNo = true;
    ChkRCNo = true;
    ChkJobno = false;
    ChkComp = false;

    LoadDDL(companyid, fromdate, todate, InterExter);
    LoadData(companyid, FDate, TDate, InterExter);
}
function JMainList() {

    $('#tblbillmaingrid').DataTable().destroy();
    companyid = $('#ddlMCompany').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    if ($('#optinternal').is(':checked')) {
        InterExter = "I";
    }
    else if ($('#optexternal').is(':checked')) {
        InterExter = "E";
    }
    ChkRefno = true;
    ChkOrdno = true;
    DtChk = false;
    ChkProcess = true;
    ChkDCNo = true;
    ChkRCNo = true;
    ChkJobno = false;
    ChkComp = true;

    LoadDDL(companyid, fromdate, todate, InterExter);
    LoadData(companyid, FDate, TDate, InterExter);
}

    function LoadDDL(companyid, fromdate, todate, InterorExter) {
        debugger;

        if (Gs == 0) {
            Gs = "GRN";
        } else {
            Gs = Gs;
        }
        var dcno = $("#ddlMDcNo option:selected").text();
        var recptid = $("#ddlMReceiptNo").val();
        if (dcno == "--Select Dc No--") {
            dcno = "";
        }
        var refno = $('#ddlMRefNo').val();
        if (refno == "0") {
            refno = '';
        } else {
            var refno = $("#ddlMRefNo option:selected").text();
        }

        //var jobordno = $('#ddlMWorkNo').val();
        //if (jobordno == "0") {
        //    jobordno = '';
        //}

        var ordno = $('#ddlMOrderNo').val();
        if (ordno == "0") {
            ordno = '';
        } else {
            var ordno = $("#ddlMOrderNo option:selected").text();
        }

        var processid = $('#ddlMProcess').val();
        if (processid == null) {
            processid = 0;
        }


        var OType = $("#ddlMType").val();

        if (OType == 0) {
            OType = "W";
        } else {
            OType = $("#ddlMType").val();
        }

        var prid = 0;

        //var ordtype = $('input[name="optint"]:checked').attr('value');
        //InterorExter = '';
        var ptype = '';

        if (ChkComp || DtChk) {
            dcno = "";
            refno = '';
            ordno = '';
            processid = 0;
            recptid = 0;
        }

        $.ajax({
            type: "POST",
            url: '/CommonProductionReceipt/GetMaindt/',
            data: JSON.stringify({ CompanyId: companyid, Fromdate: fromdate, Todate: todate, InterExter: ptype, DcNo: dcno, Recptid: (recptid == null ? 0 : recptid), JobWrkSample: OType, OrdNo: ordno, Refno: refno, ProcessId: processid, processorid: prid }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (json) {
                debugger;

                maintbllist = json;


                var Orddet = {};
                var Ord = [];
                var DCdet = {};
                var DC = [];
                var Jobdet = {};
                var Job = [];
                var Refdet = {};
                var Ref = [];
                var rcpdet = {};
                var rcp = [];
                var Procdet = {};
                var proc = [];

                $.each(maintbllist, function (i, el) {

                    if (!Orddet[el.OrdNo]) {
                        Orddet[el.OrdNo] = true;
                        Ord.push(el);
                    }
                    if (!DCdet[el.DcNumber]) {
                        DCdet[el.DcNumber] = true;
                        DC.push(el);
                    }
                    if (!Jobdet[el.JobNo]) {
                        Jobdet[el.JobNo] = true;
                        Job.push(el);
                    }
                    if (!Refdet[el.RefNo]) {
                        Refdet[el.RefNo] = true;
                        Ref.push(el);
                    }
                    if (!rcpdet[el.ReceiptId]) {
                        rcpdet[el.ReceiptId] = true;
                        rcp.push(el);
                    }
                    if (!Procdet[el.ProcessId]) {
                        Procdet[el.ProcessId] = true;
                        proc.push(el);
                    }
                });

                if (ChkDCNo || ChkComp || DtChk) {
                    $('#ddlMDcNo').empty();
                    $(ddlMDcNo).append($('<option/>').val('0').text('--Select Dc No--'));
                    $.each(DC, function () {
                        $(ddlMDcNo).append($('<option></option>').text(this.DcNumber));
                    });}

                if (ChkRCNo || ChkComp || DtChk) {
                    $('#ddlMReceiptNo').empty();
                    $(ddlMReceiptNo).append($('<option/>').val('0').text('--Select Recpt No--'));
                    $.each(rcp, function () {
                        $(ddlMReceiptNo).append($('<option></option>').val(this.ReceiptId).text(this.ReceiptNo));
                    });}

                if (ChkOrdno || ChkComp || DtChk) {
                    $('#ddlMOrderNo').empty();
                    $(ddlMOrderNo).append($('<option/>').val('0').text('--Select OrderNo--'));
                    $.each(Ord, function () {
                        $(ddlMOrderNo).append($('<option></option>').text(this.OrdNo));
                    });}

                if (ChkJobno || ChkComp || DtChk) {
                    $('#ddlMjobNo').empty();
                    $(ddlMjobNo).append($('<option/>').val('0').text('--Select WorkOrdNo--'));
                    $.each(Job, function () {
                        $(ddlMjobNo).append($('<option></option>').val(this.JobNo).text(this.JobNo));
                    });}

                if (ChkRefno || ChkComp || DtChk) {
                    $('#ddlMRefNo').empty();
                    $(ddlMRefNo).append($('<option/>').val('0').text('--Select Ref No--'));
                    $.each(Ref, function () {
                        $(ddlMRefNo).append($('<option></option>').text(this.RefNo));
                    });}

                if (ChkProcess || ChkComp || DtChk) {
                    $('#ddlMProcess').empty();
                    $(ddlMProcess).append($('<option/>').val('0').text('--Select Process--'));
                    $.each(proc, function () {
                        $(ddlMProcess).append($('<option></option>').val(this.ProcessId).text(this.Process));
                    });}

            },
            failure: function (errMsg) {
                alert(errMsg);
            }
        });
    }

    function LoadData(companyid, fromdate, todate, InterorExter) {
        debugger;

        if (Gs == 0) {
            Gs = "GRN";
        } else {
            Gs = Gs;
        }

        if (Gs == "GRN") {
            $('#lblMainlist').text('Receipt List')
        } else {
            $('#lblMainlist').text('Quality List')
        }


        var dcno = $("#ddlMDcNo option:selected").text();
        var recptid = $("#ddlMReceiptNo").val();
        if (dcno == "--Select Dc No--") {
            dcno = "";
        }


        var refno = $('#ddlMRefNo').val();
        if (refno == "0") {
            refno = '';
        } else {
            var refno = $("#ddlMRefNo option:selected").text();
        }

        //var jobordno = $('#ddlMWorkNo').val();
        //if (jobordno == "0") {
        //    jobordno = '';
        //}

        var ordno = $('#ddlMOrderNo').val();
        if (ordno == "0") {
            ordno = '';
        } else {
            var ordno = $("#ddlMOrderNo option:selected").text();
        }

        var processid = $('#ddlMProcess').val();
        if (processid == null) {
            processid = 0;
        }


        var OType = $("#ddlMType").val();

        if (OType == 0) {
            OType = "W";
        } else {
            OType = $("#ddlMType").val();
        }

        var prid = 0;

        if (ChkComp || DtChk) {
            dcno = "";
            refno = '';
            ordno = '';
            processid = 0;
            recptid = 0;
        }
        //var ptype = "0";

        if (companyid == null) {
            companyid = DCompid;
        } 


        var menufilter = companyid + ',' + fromdate + ',' + todate + ',' + InterorExter + ',' + dcno + ',' + (recptid == null ? 0 : recptid) + ',' + OType + ',' + ordno + ',' + refno + ',' + processid + ',' + prid + ',' + Gs ;
        localStorage.setItem('CommonProductionReceiptMainFilter', menufilter);

        $.ajax({
            type: "POST",
            url: '/CommonProductionReceipt/GetMaindtlist/',
            data: JSON.stringify({ CompanyId: companyid, Fromdate: fromdate, Todate: todate, InterExter: InterorExter, DcNo: dcno, Recptid: (recptid == null ? 0 : recptid), JobWrkSample: OType, OrdNo: ordno, Refno: refno, ProcessId: processid, processorid: prid ,Type:Gs}),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (json) {
                debugger;

                maintbllist = json;


                $('#tblbillmaingrid').DataTable({
                    data: maintbllist,
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
                        { title: "ID", data: "ReceiptId", "visible": false },
                { title: "Work Div", data: "WorkDiv" },
                { title: "Unit", data: "CompanyUnit" },
                { title: "Recpt No", data: "ReceiptNo" },
                {
                    title: "Date", data: "ReceiptDate",
                    render: function (data) {
                        return (moment(data).format("DD/MM/YYYY"));
                    }
                },
                { title: "Process", data: "Process" },
                { title: "DC No", data: "DcNumber" },

                 {
                     title: "ACTION",
                     render: function (data, type, row) {

                         if (Gs == 'GRN') {

                             return '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" ' + CommProdRecptEditFlg + ' class="btnmaingrdedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button><button type="button" type="button" data-toggle="tooltip" data-placement="top" title="Delete" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" ' + CommProdRecptDeleteFlg + ' class="btnmaingrddelete btn btn-danger btn-round" onClick=""> <i class="fa fa-minus"></i> </button><button type="button" ' + CommProdRecptPrintFlg + '  class="ProdRecptPrint btn btn_round btn-success"  data-toggle="tooltip" data-placement="top" title="print" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;" >  <i class="fa fa-print"></i> </button>';
                         }
                         if (Gs == 'Qlty') {
                             if (row.Qlty_No == '') {

                                 return '<button type="button" data-toggle="tooltip" data-placement="top" title="Add" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" ' + CommProdRecptAddFlg + ' class="btnmainqltygrdadd btnSelect btn btn_round btn-success"> <i class="fa fa fa-plus"></i> </button><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" ' + 'disabled' + ' class=" btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button><button type="button" type="button" data-toggle="tooltip" data-placement="top" title="Delete" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" ' + 'disabled' + ' class=" btn btn-danger btn-round" onClick=""> <i class="fa fa-minus"></i> </button>';
                             }
                             else {

                                 return '<button type="button" data-toggle="tooltip" data-placement="top" title="Add" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" ' + 'disabled' + ' class=" btnSelect btn btn_round btn-success"> <i class="fa fa fa-plus"></i> </button><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" ' + CommProdRecptEditFlg + ' class="btnmaingrdqltyedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button><button type="button" type="button" data-toggle="tooltip" data-placement="top" title="Delete" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" ' + CommProdRecptDeleteFlg + ' class="btnmaingrdqltydelete btn btn-danger btn-round" onClick=""> <i class="fa fa-minus"></i> </button>';
                             }
                         }
                     },
                 },


            //    {
                   
            //        title: "ACTION", "mDataProp": null,
            //        if(1==1){
            //        "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" ' + CommProdRecptEditFlg + ' class="btnmaingrdedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button><button type="button" type="button" data-toggle="tooltip" data-placement="top" title="Delete" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" ' + CommProdRecptDeleteFlg + ' class="btnmaingrddelete btn btn-danger btn-round" onClick=""> <i class="fa fa-minus"></i> </button><button type="button" ' + CommProdRecptPrintFlg + '  class="ProdRecptPrint btn btn_round btn-success"  data-toggle="tooltip" data-placement="top" title="print" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;" >  <i class="fa fa-print"></i> </button>'
            //}
            //    }
                    ]
                });
            },
            failure: function (errMsg) {
                alert(errMsg);
            }
        });
    }

    function LoadDataFromBack(companyid, fromdate, todate, InterorExter) {
        debugger;

        
        var fill = localStorage.getItem('CommonProductionReceiptMainFilter');
        var fillobj = [];
        fillobj = fill.split(",");

        $('#txtFromDate').val(fillobj[1]);
        $('#txtToDate').val(fillobj[2]);

        if (fillobj[3] == 'I') {
            $('#optinternal').prop('checked', true);
        } else {
            $('#optexternal').prop('checked', true);
        }

        if (fillobj[4] == "undefined") {
            fillobj[4] = '';
        }
        if (fillobj[6] == "undefined") {
            fillobj[6] = 'W';
        }
        if (fillobj[7] == "undefined") {
            fillobj[7] = '';
        }
        if (fillobj[8] == "undefined") {
            fillobj[8] = ''
        }
        if (fillobj[5] == "undefined") {
            fillobj[5] = 0;
        }
        if (fillobj[9] == "undefined") {
            fillobj[9] = 0;
        }
        if (fillobj[10] == "undefined") {
            fillobj[10] = 0;
        }

        if (fillobj[11] == "GRN") {
            $('#lblMainlist').text('Receipt List')
        } else {
            $('#lblMainlist').text('Quality List')
        }
        Gs = fillobj[11];


        if (companyid == fillobj[0]) {
            companyid = DCompid;
        }


        $.ajax({
            type: "POST",
            url: '/CommonProductionReceipt/GetMaindtlist/',
            data: JSON.stringify({ CompanyId: fillobj[0], Fromdate: fillobj[1], Todate: fillobj[2], InterExter: fillobj[3], DcNo: fillobj[4], Recptid: fillobj[5], JobWrkSample: fillobj[6], OrdNo: fillobj[7], Refno: fillobj[8], ProcessId: fillobj[9], processorid: fillobj[10], Type: fillobj[11] }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (json) {
                debugger;

                maintbllist = json;


                $('#tblbillmaingrid').DataTable({
                    data: maintbllist,
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
                        { title: "ID", data: "ReceiptId", "visible": false },
                { title: "Work Div", data: "WorkDiv" },
                { title: "Unit", data: "CompanyUnit" },
                { title: "Recpt No", data: "ReceiptNo" },
                {
                    title: "Date", data: "ReceiptDate",
                    render: function (data) {
                        return (moment(data).format("DD/MM/YYYY"));
                    }
                },
                { title: "Process", data: "Process" },
                { title: "DC No", data: "DcNumber" },

                 {
                     title: "ACTION",
                     render: function (data, type, row) {

                         if (Gs == 'GRN') {

                             return '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" ' + CommProdRecptEditFlg + ' class="btnmaingrdedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button><button type="button" type="button" data-toggle="tooltip" data-placement="top" title="Delete" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" ' + CommProdRecptDeleteFlg + ' class="btnmaingrddelete btn btn-danger btn-round" onClick=""> <i class="fa fa-minus"></i> </button><button type="button" ' + CommProdRecptPrintFlg + '  class="ProdRecptPrint btn btn_round btn-success"  data-toggle="tooltip" data-placement="top" title="print" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;" >  <i class="fa fa-print"></i> </button>';
                         }
                         if (Gs == 'Qlty') {
                             if (row.Qlty_No == '') {

                                 return '<button type="button" data-toggle="tooltip" data-placement="top" title="Add" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" ' + CommProdRecptAddFlg + ' class="btnmainqltygrdadd btnSelect btn btn_round btn-success"> <i class="fa fa fa-plus"></i> </button><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" ' + 'disabled' + ' class=" btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button><button type="button" type="button" data-toggle="tooltip" data-placement="top" title="Delete" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" ' + 'disabled' + ' class=" btn btn-danger btn-round" onClick=""> <i class="fa fa-minus"></i> </button>';
                             }
                             else {

                                 return '<button type="button" data-toggle="tooltip" data-placement="top" title="Add" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" ' + 'disabled' + ' class=" btnSelect btn btn_round btn-success"> <i class="fa fa fa-plus"></i> </button><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" ' + CommProdRecptEditFlg + ' class="btnmaingrdqltyedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button><button type="button" type="button" data-toggle="tooltip" data-placement="top" title="Delete" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" ' + CommProdRecptDeleteFlg + ' class="btnmaingrdqltydelete btn btn-danger btn-round" onClick=""> <i class="fa fa-minus"></i> </button>';
                             }
                         }
                     },
                 },


            //    {

            //        title: "ACTION", "mDataProp": null,
            //        if(1==1){
            //        "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" ' + CommProdRecptEditFlg + ' class="btnmaingrdedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button><button type="button" type="button" data-toggle="tooltip" data-placement="top" title="Delete" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" ' + CommProdRecptDeleteFlg + ' class="btnmaingrddelete btn btn-danger btn-round" onClick=""> <i class="fa fa-minus"></i> </button><button type="button" ' + CommProdRecptPrintFlg + '  class="ProdRecptPrint btn btn_round btn-success"  data-toggle="tooltip" data-placement="top" title="print" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;" >  <i class="fa fa-print"></i> </button>'
            //}
            //    }
                    ]
                });
            },
            failure: function (errMsg) {
                alert(errMsg);
            }
        });
    }

    function validate() {
        debugger;
        var isValid = true;
        //if ($('#ddlshift').val().trim() == "") {
        if ($('#txtDCNo').val() == '') {
            $('#txtDCNo').css('border-color', 'Red');
            isValid = false;
        }
        else {
            $('#txtDCNo').css('border-color', 'lightgrey');
        }

        if (Gs == 'Qlty') {
            if ($('#ddlSubStore').val() == 0) {
                // $('#ddlMSMMainStore').css('border-color', 'Red');
                $('#ddlSubStore').siblings(".select2-container").css('border', '1px solid red');
                isValid = false;
            }
            else {
                //$('#ddlMSMMainStore').css('border-color', 'lightgrey');
                $('#ddlSubStore').siblings(".select2-container").css('border', '1px solid lightgrey');
            }
        }

        return isValid;
    }

    function Add() {
        debugger;
        if (Gs == "Qlty") {
            Update();
            return false;
        }

        var res = validate();
        if (res == false) {
            return false;
        }
        if (ValiCutBudApp == 'Y' && OrderType=='W') {
            $.each(ProdReceiptDet, function (e) {
                if (ProdReceiptDet[e].ReceivedQty > 0) {
                    if (ProdReceiptDet[e].Rate > 0 && ProdReceiptDet[e].Rate <= ProdReceiptDet[e].AppRate) {

                    } else {
                        //alert('Please Check the Item Rate..');
                        var msg = 'Please Check the Item Rate...';
                        var flg = 4;
                        var mod = 1;
                        var ur = "";
                        AlartMessage(msg, flg, mod, ur);
                        retchk = "F";
                        return false;
                    }
                }
            });
        }
        if (ValiCutBudAppSam == 'Y' && OrderType == 'S') {
            $.each(ProdReceiptDet, function (e) {
                if (ProdReceiptDet[e].ReceivedQty > 0) {
                    if (ProdReceiptDet[e].Rate > 0 && ProdReceiptDet[e].Rate <= ProdReceiptDet[e].AppRate) {

                    } else {
                        //alert('Please Check the Item Rate..');
                        var msg = 'Please Check the Item Rate...';
                        var flg = 4;
                        var mod = 1;
                        var ur = "";
                        AlartMessage(msg, flg, mod, ur);
                        retchk = "F";
                        return false;
                    }
                }
            });
        }

        if (retchk == 'F') {
            return false;
        }

        var ipissuqty = 0;

        $.each(ProdReceiptDet, function (e) {
            if (ProdReceiptDet[e].ReceivedQty > 0) {

                ipissuqty = ipissuqty + ProdReceiptDet[e].ReceivedQty;
            }

        });
        if (ipissuqty == 0) {
            //alert('Please Fill atleast one Receipt Qty..');
            var msg = 'Please Fill atleast one Receipt quantity...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
            return false;
        }



        if ($('#optinnerinternal').is(':checked')) {
            InterExter = "I";
        }
        else if ($('#optinnerexternal').is(':checked')) {
            InterExter = "E";
        }
        var MSType = $('input[name="MSType"]:checked').attr('value');

        var storeunitid = 0;
        if (MSType == "S") {
            storeunitid = $('#ddlSMainStore').val();
        } else if (MSType == "M") {
            storeunitid = $('#ddlMSMMainStore').val();
        }

        if (Gs == 'Qlty') {
            if (storeunitid == 0 && ValidateProductionStore == "True") {
                //alert('Please select Store..');
                var msg = 'Please select Store...';
                var flg = 4;
                var mod = 1;
                var ur = "";
                AlartMessage(msg, flg, mod, ur);
                return true;
            }
        }

        var OType = $('input[name="optwrkord"]:checked').attr('value');
        debugger;
        table = "Prod_Recpt_Mas";
        column = "RecptNo";
        compId = $('#ddlCompany').val(),
        Docum = 'GENERAL PRODUCTION RECEIPT';

        var oldReceiptNo = $('#txtReceiptNo').val();
        $.ajax({
            url: "/BulkOrder/GenerateNo",
            data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                debugger;
                var newReceiptNo = result.Value;
                if (oldReceiptNo != newReceiptNo) {
                    //alert('Receipt No has been changed...');
                    var msg = 'Receipt Number has been changed...';
                    var flg = 4;
                    var mod = 1;
                    var ur = "";
                    AlartMessage(msg, flg, mod, ur);
                    $('#txtReceiptNo').val(result.Value);
                }
                var ProdRecptObj = {
                    ReceiptNo: $('#txtReceiptNo').val(),
                    ReceiptDate: $('#txtReceiptDate').val(),
                    ReRefDate: $('#txtdcdate').val(),
                    CompanyId: $('#ddlinnercompany').val(),
                    Remarks: $('#txtremarks').val(),
                    CompanyUnitId: $('#ddlinnercompunit').val(),
                    ProcessId: $('#ddlinnerprocess').val(),
                    StoreUnitID: storeunitid,
                    InterorExter: InterExter,
                    JobWrkSample: OType,
                    RecptType: "G",
                    WorkDivisionId: $('#txinnerworkdivid').val(),
                    DcNumber: $('#txtDCNo').val(),
                    CreatedBy: Guserid,
                    ProdReceiptDet: ProdReceiptDet,
                    ProdReceiptReason: Reasonlist,
                };
                $("#btnAdd").attr("disabled", true);
                LoadingSymb();
                $.ajax({
                    url: "/CommonProductionReceipt/Add",
                    data: JSON.stringify(ProdRecptObj),
                    type: "POST",
                    contentType: "application/json;charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        if (result.Status == 'SUCCESS') {
                            AddUserEntryLog('Production', 'Common Receipt', 'ADD', $("#txtReceiptNo").val());
                            //alert("Record saved successfully...");
                            var msg = 'Record saved successfully...';
                            var flg = 1;
                            var mod = 0;
                            var ur = "/CommonProductionReceipt/CommonProductionReceiptIndex";
                            AlartMessage(msg, flg, mod, ur);
                            //$('#ddlcutCompany').val(0);
                            $('#ddlcutunit').val(0);
                            $('#ddlProcess').val(0);
                            $('#ddlWorkDiv').val(0);
                            $('#ddlMCompany').val(0);
                            $('#ddlMUnit').val(0);
                            $('#myModal1').modal('hide');
                            $('#myModal').modal('hide');
                            //$('#tblbillmaingrid').DataTable().destroy();

                            //Load Main Grid
                            ListFilter();
                            //window.location.href = "/CommonProductionReceipt/CommonProductionReceiptIndex";
                        }
                        else {
                            //alert("Record saved failed...");
                            var msg = 'Record saved failed...';
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
            }
        });
    }

    function Update() {
        debugger;
        var res = validate();
        if (res == false) {
            return false;
        }


        //if (ValiProdIssBudApp == 'Y') {
        //    var ratecnt = 0;
        //    $.each(ProdReceiptDet, function (g) {
        //        if (ProdReceiptDet[g].ReceivedQty > 0) {
        //            if (ProdReceiptDet[g].Rate > 0) {
        //            }
        //            else {
        //                ratecnt = ratecnt + 1;
        //            }
        //        }

        //    });

        //    if (ratecnt > 0) {
        //        alert('Please Check Rate..');
        //        return false;
        //    }
        //}
        if (ValiCutBudApp == 'Y' && OrderType == 'W') {
            $.each(ProdReceiptDet, function (e) {
                if (ProdReceiptDet[e].ReceivedQty > 0) {
                    if (ProdReceiptDet[e].Rate > 0 && ProdReceiptDet[e].Rate <= ProdReceiptDet[e].AppRate) {

                    } else {
                        //alert('Please Check the Item Rate..');
                        var msg = 'Please Check the Item Rate...';
                        var flg = 4;
                        var mod = 1;
                        var ur = "";
                        AlartMessage(msg, flg, mod, ur);
                        retchk = "F";
                        return false;
                    }
                }
            });
        }
        if (ValiCutBudAppSam == 'Y' && OrderType == 'S') {
            $.each(ProdReceiptDet, function (e) {
                if (ProdReceiptDet[e].ReceivedQty > 0) {
                    if (ProdReceiptDet[e].Rate > 0 && ProdReceiptDet[e].Rate <= ProdReceiptDet[e].AppRate) {

                    } else {
                        //alert('Please Check the Item Rate..');
                        var msg = 'Please Check the Item Rate...';
                        var flg = 4;
                        var mod = 1;
                        var ur = "";
                        AlartMessage(msg, flg, mod, ur);
                        retchk = "F";
                        return false;
                    }
                }
            });
        }
        if (retchk == 'F') {
            return false;
        }

        var ipissuqty = 0;

        $.each(ProdReceiptDet, function (e) {
            if (ProdReceiptDet[e].ReceivedQty > 0) {

                ipissuqty = ipissuqty + ProdReceiptDet[e].ReceivedQty;
            }

        });
        if (ipissuqty == 0) {
            //alert('Please Fill atleast one Receipt Qty..');
            var msg = 'Please Fill atleast one Receipt quantity...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
            return true;
        }



        var rescnt = 0;
        var reworkcnt = 0;
        if (Gs == 'Qlty') {
           
            $.each(ProdReceiptDet, function (k) {
                var resqty = 0;
                var rwqty = 0;


                if (ProdReceiptDet[k].RejectionQty > 0) {
                    $.each(Reasonlist, function (l) {

                        if (Reasonlist[l].RecptDetId == ProdReceiptDet[k].ReceptDetId) {

                            resqty = resqty + parseFloat(Reasonlist[l].Qty);
                        }

                    });

                    if (parseFloat(ProdReceiptDet[k].RejectionQty).toFixed(3) != resqty.toFixed(3)) {

                        rescnt = rescnt + 1;
                    }
                }

                if (ProdReceiptDet[k].ReworkQty > 0) {
                    $.each(Reasonlist, function (l) {

                        if (Reasonlist[l].RecptDetId == ProdReceiptDet[k].ReceptDetId) {

                            rwqty = rwqty + parseFloat(Reasonlist[l].ReworkQty);
                        }

                    });

                    if (parseFloat(ProdReceiptDet[k].ReworkQty).toFixed(3) != rwqty.toFixed(3)) {

                        reworkcnt = reworkcnt + 1;
                    }
                }


            });


            if (rescnt >0) {
                //alert('Please Check Rejection Qty and Reason Qty..');
                var msg = 'Please Check Rejection quantity and Reason quantity...';
                var flg = 4;
                var mod = 1;
                var ur = "";
                AlartMessage(msg, flg, mod, ur);
                return true;
            }

            if (reworkcnt > 0) {
                //alert('Please Check Rework Qty and Reprocess Qty..');
                var msg = 'Please Check Rework quantity and Reprocess quantity...';
                var flg = 4;
                var mod = 1;
                var ur = "";
                AlartMessage(msg, flg, mod, ur);
                return true;
            }


        }

        var totcnt = 0;
        
        if (Gs == 'Qlty') {

            $.each(ProdReceiptDet, function (k) {
              
                var sum = parseFloat(ProdReceiptDet[k].AcceptQty) + parseFloat(ProdReceiptDet[k].RejectionQty) + parseFloat(ProdReceiptDet[k].ReworkQty);

                if (sum.toFixed(3) != ProdReceiptDet[k].ReceivedQty.toFixed(3)) {

                    totcnt = totcnt + 1;
                }

            });


            if (totcnt > 0) {
                //alert('Please Check Received Qty equal to Accept Qty +Rej Qty + Re Work Qty..');
                var msg = 'Please Check Received quantity equal to Accept quantity +Rej quantity + Re Work quantity...';
                var flg = 4;
                var mod = 1;
                var ur = "";
                AlartMessage(msg, flg, mod, ur);
                return true;
            }

        }


        if ($('#optinnerinternal').is(':checked')) {
            InterExter = "I";
        }
        else if ($('#optinnerexternal').is(':checked')) {
            InterExter = "E";
        }
        var MSType = $('input[name="MSType"]:checked').attr('value');

        var storeunitid = 0;
        if (MSType == "S") {
            storeunitid = $('#ddlSMainStore').val();
        } else if (MSType == "M") {
            storeunitid = $('#ddlMSMMainStore').val();
        }
        if (Gs == 'Qlty') {
            if (storeunitid == 0 && ValidateProductionStore == "True") {
                //alert('Please select Store..');
                var msg = 'Please select Store...';
                var flg = 4;
                var mod = 1;
                var ur = "";
                AlartMessage(msg, flg, mod, ur);
                return true;
            }
        }

        var OType = $('input[name="optwrkord"]:checked').attr('value');

        var ProdRecptObj = {
            Receiptid: ProdReceiptEditId,
            ReceiptNo: $('#txtReceiptNo').val(),
            ReceiptDate: $('#txtReceiptDate').val(),
            CompanyId: $('#ddlinnercompany').val(),
            Remarks: $('#txtremarks').val(),
            CompanyUnitId: $('#ddlinnercompunit').val(),
            ProcessId: $('#ddlinnerprocess').val(),
            StoreUnitID: storeunitid,
            InterorExter: IntOrExt,
            JobWrkSample: OrderType,
            RecptType: "G",
            WorkDivisionId: $('#txinnerworkdivid').val(),
            DcNumber: $('#txtDCNo').val(),
            CreatedBy: Guserid,
            ProdReceiptDet: ProdReceiptDet,
            ProdReceiptReason: Reasonlist,
            Qlty_No: $('#txtQualityNo').val(),
            Qlty_date: $('#txtQualitytDate').val(),
            Type: Gs,
            Mod:Mode,
        };
        $("#btnUpdate").attr("disabled", true);
        LoadingSymb();
        $.ajax({
            url: "/CommonProductionReceipt/Update",
            data: JSON.stringify(ProdRecptObj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                debugger;
                if (result.Status == 'SUCCESS') {
                    AddUserEntryLog('Production', 'Common Receipt', 'UPDATE', $("#txtReceiptNo").val());
                    //alert("Record updated successfully...");
                    var msg = 'Record updated successfully...';
                    var flg = 1;
                    var mod = 0;
                    var ur = "/CommonProductionReceipt/CommonProductionReceiptIndex";
                    AlartMessage(msg, flg, mod, ur);

                    //$('#ddlcutCompany').val(0);
                    //$('#ddlcutunit').val(0);
                    //$('#ddlProcess').val(0);
                    //$('#ddlWorkDiv').val(0);
                    //$('#ddlMCompany').val(0);
                    //$('#ddlMUnit').val(0);
                    $('#myModal1').modal('hide');
                    $('#myModal').modal('hide');
                    // $('#tblbillmaingrid').DataTable().destroy();
                    ProdReceiptEditId = 0;
                    //Load MainGrid
                    ListFilter();
                    //window.location.href = "/CommonProductionReceipt/CommonProductionReceiptIndex";
                }
                else {
                    //alert("Record updated failed...");
                    var msg = 'Record updated failed...';
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

        //}
    }



    function Delete() {
        debugger;
        //var res = validate();
        //if (res == false) {
        //    return false;
        //}


        var ipissuqty = 0;

        $.each(ProdReceiptDet, function (e) {
            if (ProdReceiptDet[e].ReceivedQty > 0) {

                ipissuqty = ipissuqty + ProdReceiptDet[e].ReceivedQty;
            }

        });
        if (ipissuqty == 0) {
            //alert('Please Fill atleast one Receipt Qty..');
            var msg = 'Please Fill atleast one Receipt quantity...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
            return false;
        }



        if ($('#optinnerinternal').is(':checked')) {
            InterExter = "I";
        }
        else if ($('#optinnerexternal').is(':checked')) {
            InterExter = "E";
        }
        var MSType = $('input[name="MSType"]:checked').attr('value');

        var storeunitid = 0;
        if (MSType == "S") {
            storeunitid = $('#ddlSMainStore').val();
        } else if (MSType == "M") {
            storeunitid = $('#ddlMSMMainStore').val();
        }
        if (Gs == 'Qlty') {
            if (storeunitid == 0 && ValidateProductionStore == "True") {
                //alert('Please select Store..');
                var msg = 'Please select Store...';
                var flg = 4;
                var mod = 1;
                var ur = "";
                AlartMessage(msg, flg, mod, ur);
                return true;
            }
        }

        var OType = $('input[name="optwrkord"]:checked').attr('value');

        var ProdRecptObj = {
            Receiptid: ProdReceiptEditId,
            ReceiptNo: $('#txtReceiptNo').val(),
            ReceiptDate: $('#txtReceiptDate').val(),
            CompanyId: $('#ddlinnercompany').val(),
            Remarks: $('#txtremarks').val(),
            CompanyUnitId: $('#ddlinnercompunit').val(),
            ProcessId: $('#ddlinnerprocess').val(),
            StoreUnitID: storeunitid,
            InterorExter: IntOrExt,
            JobWrkSample: OrderType,
            RecptType: "G",
            WorkDivisionId: $('#txinnerworkdivid').val(),
            DcNumber: $('#txtDCNo').val(),
            CreatedBy: Guserid,
            ProdReceiptDet: ProdReceiptDet,
            ProdReceiptReason: Reasonlist,
            Qlty_No: $('#txtQualityNo').val(),
            Qlty_date: $('#txtQualitytDate').val(),
            Type: Gs,
            Mod: Mode,
        };
        $("#btnDel").attr("disabled", true);
        LoadingSymb();
        $.ajax({
            url: "/CommonProductionReceipt/Delete",
            data: JSON.stringify(ProdRecptObj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                debugger;
                if (result.Status == 'SUCCESS') {
                    AddUserEntryLog('Production', 'Common Receipt', 'DELETE', $("#txtReceiptNo").val());
                    //alert("Record Deleted successfully...");
                    var msg = 'Record Deleted successfully...';
                    var flg = 2;
                    var mod = 0;
                    var ur = "/CommonProductionReceipt/CommonProductionReceiptIndex";
                    AlartMessage(msg, flg, mod, ur);

                    $('#myModal1').modal('hide');
                    $('#myModal').modal('hide');
                    // $('#tblbillmaingrid').DataTable().destroy();
                    ProdReceiptEditId = 0;
                    //Load MainGrid
                    ListFilter();
                    //window.location.href = "/CommonProductionReceipt/CommonProductionReceiptIndex";
                }
                else {
                    //alert("Record updated failed...");
                    var msg = 'Record updated failed...';
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

        //}
    }




    function LOADQLTY() {

        var Prg = "Qlty";
        Gs = Prg;
        var Type = "Qlty";
        // $('#tGMbody').DataTable().destroy();
        //LoadMainGrid();
        CMainList();
    }
    function LOADGRN() {

        var Prg = "GRN";
        Gs = Prg;
        var Type = "GRN";
        //$('#tGMbody').DataTable().destroy();
        // LoadMainGrid();
        CMainList();
    }


    //function Delete(ID) {
    //    debugger;
    //    var ans = confirm("Are you sure you want to delete this Record?");
    //    if (ans) {
    //        $("#btnDel").attr("disabled", true);
    //        LoadingSymb();
    //        $.ajax({
    //            url: "/CommonProductionReceipt/GetProdReceiptHeaderInfo/" + ID,
    //            typr: "GET",
    //            contentType: "application/json;charset=UTF-8",
    //            dataType: "json",
    //            success: function (result) {
    //                debugger;
    //                var obj = [];
    //                obj = result;
    //                $("#txtReceiptNo").val(obj[0].ReceiptNo);

    //                $.ajax({
    //                    url: "/CommonProductionReceipt/Delete/" + ID,
    //                    type: "POST",
    //                    contentType: "application/json;charset=UTF-8",
    //                    dataType: "json",
    //                    success: function (result) {
    //                        AddUserEntryLog('Production', 'Common Receipt', 'DELETE', $("#txtReceiptNo").val());
    //                        alert("Record deleted successfully...");
    //                        //$('#tblbillmaingrid').DataTable().destroy();
    //                        ListFilter();
    //                        window.location.href = "/CommonProductionReceipt/CommonProductionReceiptIndex";
    //                    },
    //                    error: function (errormessage) {
    //                        alert(errormessage.responseText);
    //                    }
    //                });
    //            }
    //        });
    //    }
    //}

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

        debugger;

        $('#tblreason').DataTable({
            data: colorempty,
            columns: [
               // { title: "RowSeq", data: "Seq", "visible": false },
            { title: "RecptDetId", data: "RecptDetId", "visible": false },
                { title: "Reason", data: "Reason" },
                { title: "Qty", data: "Qty" },
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
            return (v.ReworkProcessid >0);
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

        debugger;

        $('#tblrework').DataTable({
            data: colorempty,
            columns: [
               // { title: "RowSeq", data: "Seq", "visible": false },
            { title: "RecptDetId", data: "RecptDetId", "visible": false },
                { title: "Reason", data: "Reason" , "visible": false },
                { title: "Qty", data: "Qty", "visible": false },
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



    function RadioEInnerClick() {
        debugger;
        $('#ddlWorkDiv').hide();
        $('#lblworkdiv').hide();

        $('#ddlSupplier').show();
        $('#lblsupplier').show();
    }

    function RadioIInnerClick() {
        debugger;
        $('#ddlWorkDiv').show();
        $('#lblworkdiv').show();

        $('#ddlSupplier').hide();
        $('#lblsupplier').hide();
    }


    function LoadAddItem() {
        if ($('#optinnerexternal').is(':checked')) {

            RadioEInnerClick();
        }
        else if ($('#optinnerinternal').is(':checked')) {
            RadioIInnerClick();
        }
        LoadCommonProductionIssueList(0, 0, 0, 0);
    }

    function LoadCommonProductionIssueList(companyunitid, processid, Workdivisionid, InterorExternal) {
        debugger;

        //var inputcount = 0;
        //$('#tbljobdet tr').each(function () {
        //    inputcount++;
        //});

        //if (inputcount > 0) {
        //    //var tableinput = $('#tblinnergrid').DataTable();
        //    //tableinput.clear().draw();
        //    $('#tbljobdet').DataTable().destroy();
        //}

        //var CompId = $('#ddlinnercompany').val();

        var CompId = $('select#ddlCompany option:selected').val();
        if (CompId == null || CompId == "0") {
            CompId = 0;
        }

        var CompUnitId = $('#ddlUnit').val();
        var SuppId = $('#ddlSupplier').val();
        var ProcessId = $('#ddlProcess').val();
        var proctype = $('input[name="optProcessord"]:checked').attr('value');
        var otype = $('input[name="optwrkord"]:checked').attr('value');


        var styid = $('select#ddlStyle option:selected').val();
        if (styid == null || styid == "0") {
            styid = 0;
        }

        var ordNo = "";
        var ONo = $('select#ddlOrderNo option:selected').val();

        if (ONo == 0 || ONo == undefined) {
            ordNo == "";
        }
        else {

            ordNo = $('select#ddlOrderNo option:selected').text();
        }


        var RfNo = "";
        var Rn = $('select#ddlRefNo option:selected').val();

        if (Rn == 0 || Rn == undefined) {
            RfNo == "";
        }
        else {

            RfNo = $('select#ddlRefNo option:selected').text();
        }

        $.ajax({
            type: "POST",
            url: '/CommonProductionReceipt/GetCommonProdMultipleIssueInfo/',
            data: JSON.stringify({ CompanyUnitId: CompUnitId, ProcessId: ProcessId, WorkDivisionId: SuppId, InterorExter: proctype, OType: otype, RefNo: RfNo, StyId: styid, OrdNo: ordNo, CompId: CompId }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (json) {
                debugger;
                MultipleProdIssueDet = json;

                MainList_barcode = MultipleProdIssueDet;

                //Last Working
                //******  LoadIssueGrid(MultipleProdIssueDet);
            },
            failure: function (errMsg) {
                alert(errMsg);
            }
        });
    }
    function LoadCommonProdReciptList(ProdIssueID) {
        debugger;

        //var inputcount = 0;
        //$('#tblreceipt tr').each(function () {
        //    inputcount++;
        //});

        //if (inputcount > 0) {
        //    //var tableinput = $('#tblinnergrid').DataTable();
        //    //tableinput.clear().draw();
        //    $('#tblreceipt').DataTable().destroy();
        //}

        $.ajax({
            type: "POST",
            url: '/CommonProductionReceipt/GetCommonProdReceiptInfo/',
            data: JSON.stringify({ ProdIssueId: ProdIssueID }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (json) {
                debugger;
                ProdReceiptDet = json;

                ProdReceiptDet.sort(function (a, b) {
                    return a.ProdPrgDetId - b.ProdPrgDetId;
                });

                LoadReceiptGrid(ProdReceiptDet);
            },
            failure: function (errMsg) {
                alert(errMsg);
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

        var txtBarcodeScan_ProdIssueNo = $('#txtBarcodeValue').val();

        for (var i = 0; i < MainList_barcodeScanList.length; i++) {

            if (MainList_barcodeScanList[i].ProdIssueNo == txtBarcodeScan_ProdIssueNo) {
                return;
            }
        }

        jQuery.each(MainList_barcode, function (i, val) {

            if (val.ProdIssueNo == txtBarcodeScan_ProdIssueNo) {

                var det = {
                    ProdIssueId: val.ProdIssueId,
                    CompanyUnit: val.CompanyUnit,
                    JobOrdNo: val.JobOrdNo,
                    RefNo: val.RefNo,
                    ProdprgNo: val.ProdprgNo,
                    ProdIssueNo: val.ProdIssueNo,
                    Process: val.Process
                }
                MainList_barcodeScanList.push(det);

                LoadIssueGrid(MainList_barcodeScanList);
                $('#txtBarcodeValue').val("");

                return;
            }

            // return (val.processorder);
        });
    }


    function LoadIssueGrid(ProductionList) {

        var inputcount = 0;
        $('#tbljobdet tr').each(function () {
            inputcount++;
        });

        if (inputcount > 0) {
            //var tableinput = $('#tblinnergrid').DataTable();
            //tableinput.clear().draw();
            $('#tbljobdet').DataTable().destroy();
        }

        $('#tbljobdet').DataTable({
            data: ProductionList,
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
                        { title: "ID", data: "ProdIssueId", "visible": false },
                        { title: "Company Unit", data: "CompanyUnit" },
                        { title: "Job No", data: "JobOrdNo" },
                        { title: "Ref No", data: "RefNo" },
                        { title: "Prog No", data: "ProdprgNo" },
                        { title: "Pro.Issue.No", data: "ProdIssueNo" },
                        //{
                        //    title: "Prog.Date", data: "ProgDate",
                        //    render: function (data) {
                        //        return (moment(data).format("DD/MM/YYYY"));
                        //    }
                        //},
                        { title: "Process", data: "Process" },

                        {
                            title: "Include", data: "ProdIssueId",
                            render: function (data) {

                                return '<input type="checkbox" id="chkinnergrid" class="editor-active"  style="width: 50px;text-align: center;" checked  value=' + data + ' onclick="myfunc(this.value);">';

                                //return '<input type="checkbox" id="groupbom" class="groupbom editor-active" unchecked  value=' + data + ' >';
                            },
                        },
                        //{
                        //    title: "ACTION", "mDataProp": null,
                        //    "sDefaultContent": '<button type="button"  type="button" data-toggle="tooltip" data-placement="top" title="Add" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnordadd btn btn-round btn-success"> <i class="fa fa-plus"></i> </button>'                             
                        //}
            ]
        });
    }

    function LoadIssueGrid_LastWORK(ProductionList) {

        var inputcount = 0;
        $('#tbljobdet tr').each(function () {
            inputcount++;
        });

        if (inputcount > 0) {
            //var tableinput = $('#tblinnergrid').DataTable();
            //tableinput.clear().draw();
            $('#tbljobdet').DataTable().destroy();
        }

        $('#tbljobdet').DataTable({
            data: ProductionList,
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
                        { title: "ID", data: "ProdIssueId", "visible": false },
                        { title: "Company Unit", data: "CompanyUnit" },
                        { title: "Job No", data: "JobOrdNo" },
                        { title: "Ref No", data: "RefNo" },
                        { title: "Prog No", data: "ProdprgNo" },
                        { title: "Pro.Issue.No", data: "ProdIssueNo" },
                        //{
                        //    title: "Prog.Date", data: "ProgDate",
                        //    render: function (data) {
                        //        return (moment(data).format("DD/MM/YYYY"));
                        //    }
                        //},
                        { title: "Process", data: "Process" },

                        {
                            title: "Include", data: "ProdIssueId",
                            render: function (data) {

                                return '<input type="checkbox" id="chkinnergrid" class="editor-active"  style="width: 50px;text-align: center;"  value=' + data + ' onclick="myfunc(this.value);">';

                                //return '<input type="checkbox" id="groupbom" class="groupbom editor-active" unchecked  value=' + data + ' >';
                            },
                        },
                        //{
                        //    title: "ACTION", "mDataProp": null,
                        //    "sDefaultContent": '<button type="button"  type="button" data-toggle="tooltip" data-placement="top" title="Add" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnordadd btn btn-round btn-success"> <i class="fa fa-plus"></i> </button>'                             
                        //}
            ]
        });
    }
    function LoadReceiptGrid(ProdReceiptList) {
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
            data: ProdReceiptList,
            scrollY: 300,
            scrollCollapse: true,
            paging: false,
            fixedColumns: false,
            select: false,
            scrollX: "100%",
            scrollXInner: "100%",
            scroller: false,
            columns: [
                        { title: "ID", data: "ProdPrgDetId", "visible": false },
                        { title: "ReceptDetID", data: "ReceptDetId", "visible": false },
                        { title: "Item", data: "Item" },
                        { title: "ItemId", data: "ItemId", "visible": false },
                        { title: "Color", data: "Color" },
                        { title: "ProdPrgNo", data: "ProdprgNo", "visible": false },
                        { title: "JobNo", data: "JobOrdNo", "visible": false },
                        { title: "IssueId", data: "IssueId", "visible": false },
                        { title: "ColorId", data: "ColorId", "visible": false },
                        { title: "Uomid", data: "UomId", "visible": false },
                        { title: "Size", data: "Size" },
                        { title: "SizeId", data: "SizeId", "visible": false },
                        { title: "Balance", data: "Balance" },
                        {
                            title: "Received Qty", data: "ReceivedQty",
                            render: function (data) {
                                //return '<select id="ddlprocecolor" id="txtordqty" onkeyup="OnKeydown()" class="form-control" style="width: 100px;"/></select>';
                                if (Gs == "Qlty") {

                                    return '<input type="text"  class="form-control txtreceivedqty" id="txtreceivedqty" style="width: 50px;text-align: center;" value=' + data + ' disabled>';
                                } else {
                                    return '<input type="text"  class="form-control txtreceivedqty" id="txtreceivedqty" style="width: 50px;text-align: center;" value=' + data + ' >';
                                }
                            }
                        },

                         {
                             title: "Accept Qty", data: "AcceptQty",
                             render: function (data) {
                                 //return '<select id="ddlprocecolor" id="txtordqty" onkeyup="OnKeydown()" class="form-control" style="width: 100px;"/></select>';
                                 return '<input type="text"  class="form-control txtacceptqty" id="txtacceptqty" style="width: 50px;text-align: center;" value=' + data + ' >';
                             }
                         },

                        {
                            title: "Rejection Qty", data: "RejectionQty",
                            render: function (data) {
                                //return '<select id="ddlprocecolor" id="txtordqty" onkeyup="OnKeydown()" class="form-control" style="width: 100px;"/></select>';
                                return '<input type="text"  class="form-control txtrejectedqty" id ="txtrejectedqty" style="width: 50px;text-align: center;" value=' + data + ' >';
                            }
                        },

                        {
                            title: "Rework Qty", data: "ReworkQty",
                            render: function (data) {
                                //return '<select id="ddlprocecolor" id="txtordqty" onkeyup="OnKeydown()" class="form-control" style="width: 100px;"/></select>';
                                return '<input type="text"  class="form-control txtreworkqty" id="txtreworkqty" style="width: 50px;text-align: center;" value=' + data + ' >';
                            }
                        },

                          { title: "AppRate", data: "AppRate" },
                        //{
                        //    title: "Rate", data: "Rate",
                        //    render: function (data) {
                        //        //return '<select id="ddlprocecolor" id="txtordqty" onkeyup="OnKeydown()" class="form-control" style="width: 100px;"/></select>';
                        //        return '<input type="text" id="txtrate" class="form-control txtrate" style="width: 50px;text-align: center;" value=' + data + ' >';
                        //    }
                        //},


                          {
                              title: "Rate", data: "Rate",
                              render: function (data) {
                                  //return '<select id="ddlprocecolor" id="txtordqty" onkeyup="OnKeydown()" class="form-control" style="width: 100px;"/></select>';
                                  if (Gs == "Qlty") {

                                      return  '<input type="text" id="txtrate" class="form-control txtrate" style="width: 50px;text-align: center;" value=' + data + ' disabled>';
                                  } else {
                                      return  '<input type="text" id="txtrate" class="form-control txtrate" style="width: 50px;text-align: center;" value=' + data + ' >';
                                  }
                              }
                          },



                        { title: "UOM", data: "Uom" },
                        { title: "Order No", data: "OrdNo" },
                        //{
                        //    title: "ACTION", "mDataProp": null, "visible": false,
                        //    "sDefaultContent": '<button type="button" type="button" data-toggle="tooltip" data-placement="top" title="Add" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnrcpdetadd btn btn-round btn-success" > <i class="fa fa-plus"></i> </button>'
                        //}
            ]
        });
        columnhide();


        var table = $('#tblreceipt').DataTable();
        $("#tblreceipt tr").click(function () {
            var selected = $(this).hasClass("selected");
            $("#tblreceipt tr").removeClass("selected");
            if (!selected)
                $(this).addClass("selected");
        });





    }

    function GenerateProductionIssueNumber(table, column, compId, Docum) {
        table = "Prod_Recpt_Mas";
        column = "RecptNo";

        //Get Login Company Id and pass below
        compId = $('#ddlCompany').val(),
        Docum = 'GENERAL PRODUCTION RECEIPT';

        $.ajax({
            url: "/BulkOrder/GenerateNo",
            data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                debugger;
                $('#txtReceiptNo').val(result.Value);
            }
        });
    }


    function GenerateProductionQltyNumber(table, column, compId, Docum) {
        debugger;
        table = "Prod_Recpt_Mas";
        column = "Qlty_No";

        //Get Login Company Id and pass below
        compId = $('#ddlinnercompany').val(),
        Docum = 'PRODUCTION QC';

        $.ajax({
            url: "/BulkOrder/GenerateNo",
            data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                debugger;
                $('#txtQualityNo').val(result.Value);
            }
        });
    }


    function myfunc(Val) {
        debugger;
        if (DetRowID == 0) {
            DetRowID = Val;
        }
        else {
            DetRowID = DetRowID + "," + Val;
        }
    }



    $(document).on('click', '.ProdRecptPrint', function () {
        debugger;

        var table = $('#tblbillmaingrid').DataTable();
        var ProdReceiptEditId = table.row($(this).parents('tr')).data()["ReceiptId"];


        Repid = ProdReceiptEditId;
        $('#myModal2').modal('show');

        docname = "PRODUCTION RECEIPT";
        GenerateReportItem(docname);
    });


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
        window.open("../ReportInline/Production/CommProdRecptReportInline/CommProdRecptReportInline.aspx?ProdReceiptEditId=" + Repid + "&Rate=" + p[0] + "&Bundle=" + p[1] + "&Lotno=" + p[2] + "&Ordrefno=" + p[3] + "&Prodorddet=" + p[4] + "&Ewaybill=" + p[5] + "&Ewaydate=" + p[6] + "&Companyid=" + compid);
    }
    function backtomain() {

        window.location.href = "/CommonProductionReceipt/CommonProductionReceiptIndex";
    }
    function LoadEmployeeStoreunit() {
        debugger;
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
            data: JSON.stringify({ Userid: LoginUserid, Storetype: 'B', Companyid: companyid }),
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
                if (data[i].CompanyId == companyid) {
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

    function columnhide() {

        if (Gs == 'GRN') {

            var tbl = $('#tblreceipt');
            tbl.DataTable().column(14).visible(false);
            tbl.DataTable().column(15).visible(false);
            tbl.DataTable().column(16).visible(false);
           // tbl.DataTable().column(21).visible(false);
          
        } else {
            var tbl = $('#tblreceipt');
            tbl.DataTable().column(14).visible(true);
            tbl.DataTable().column(15).visible(true);
            tbl.DataTable().column(16).visible(true);
           // tbl.DataTable().column(21).visible(true);
        }

    }


    function CheckAlloted() {

        var Recpno = $('#txtReceiptNo').val();

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
                        var msg = "Stock is alloted for " + AllotedItemList[x].CTransNo + ",Please Check it....";
                        var flg = 4;
                        var mod = 1;
                        var ur = "";
                        AlartMessage(msg, flg, mod, ur);
                        $("#btnUpdate").attr('disabled', true);
                        $("#btnDel").attr('disabled', true);
                        $('#btnSave').hide();
                        return true;
                    }

                }


            },
            failure: function (errMsg) {
                alert(errMsg);
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
            ]
        });


        $("#tblItemMovementdetails tr").click(function () {
            var selected = $(this).hasClass("selected");
            $("#tblItemMovementdetails tr").removeClass("selected");
            if (!selected)
                $(this).addClass("selected");
        });
    }