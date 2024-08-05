var companyid = 0;
var companyunitid = 0;
var processid = 0;
var maintbllist = [];
var ProductionMaingrid = [];
var ProductionItemgrid = [];
var ProdItemStckgrid = [];
var ProdItemStckgridFilter = [];
var ProdItemJobOrdNogrid = [];
var ProdItemJobOrdNogridFilter = [];
var DetRowID = 0;
var WorkdivId = 0;
var IssueStoreId = 0;
var ItemId, ColorId, SizeId = 0;
var table, column, compId, Docum;
var ProdPrgId = 0;
var ProcessType = 0;
var OrderType = 0;
var fromdate, todate = 0;
var index = -1;
var Oindex = -1;
var Sindex = -1;
var ProdIssueEditId = 0;
var Userid = 0;
var UserName = 0;
var GOrdType = 0;
var GInorExtType = 0;
var MainFDate = 0;
var repobj = [];
var Repid = 0;
var Guserid = 0;
var DCompid = 0;
var ChkRefno = true;
var ChkOrdno = true;
var DtChk = false;
var ChkBuyer = true;
var ChkProcesse = true;
var ChkJobNo = true;
var ChkIsuNo = true;
var ChkComp = false;
var CommProdEditFlg = "disabled";
var CommProdDeleteFlg = "disabled";
var CommProdPrintFlg = "disabled";
var AllowList = [];
var pallown = 0;

var rptordno = '';
var rptrefno = '';
var rptsty = '';
//var ValiProdIssBudApp = '';
var ValiCutBudApp = '';
var ValiCutBudAppSam = 0;
var retchk = '';
$(document).ready(function () {
    debugger;


    Guserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    MainFDate = $("#hdMainFromDate").data('value');
    //ValiProdIssBudApp = $("#hdnCostBudCutAppid").data('value');
    ValiCutBudApp = $("#hdnCostBudCutAppid").data('value');
    ValiCutBudAppSam = $("#hdnCostBudCutAppSamid").data('value');
    DCompid = $("#hdnDCompid").data('value');

    LoadCompanyDDL("#ddlMCompany,#ddlinnerComp,#ddlComp");
    LoadCompanyUnitDDL("#ddlMunit,#ddlinnerCompunit,#ddlCompunit");
    //LoadOrderNoDDL("#ddlMOrderNo");
    LoadProcessDDL("#ddlprocess,#ddlinnerpro,#ddlpro,#ddllastprocess");
    LoadWorkdivisionDDL("#ddlMWorkDiv,#ddlinnerworkdiv,#ddlworkdiv,#ddlinnerworkdiv");
    LoadBuyerDDL("#ddlMBuyer,#ddlinnerbuyer");
    LoadStoreUnitDDL("#ddlinnerstore,#ddlstore");
    LoadStyleDDL("#ddlinnerstyle,#ddlstyle");
    LoadItemDDL("#ddlinneritem");
    LoadColorDDL("#ddlinnercolor");
    LoadSupplierSetup();
    LoadSupplierDDL("#ddlinnerProcessor");
    LoadOrderNoDDL("#ddlMOrderNo,#ddlinnerOrderNo");
    LoadRefNoDDL("#ddlMRefNo,#ddlinnerjobNo");


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
    var todaydate = new Date();
    var day = todaydate.getDate();
    var Pmonth = todaydate.getMonth() - 2;
    var Cmonth = todaydate.getMonth() + 1;
    var year = todaydate.getFullYear();
    var datestring = Pmonth + "/" + day + "/" + year;
    var Fdatestring = day + "/" + Cmonth + "/" + year;
    Frmdate = year + "/" + Cmonth + "/" + day;
    ToDt = year + "/" + Cmonth + "/" + day;

    var day = new Date(),
        year = ((day.getMonth() - 2) < 0) ? (day.getFullYear() - 1) : day.getFullYear(),
        month = ((day.getMonth() - 2) < 0) ? (12 + (day.getMonth() - 2)) : (day.getMonth() + 1),
        date = day.getDate() + '/' + month + '/' + year;

    $("#txtcutheaderdate").val(date);
    $("#txtheaderdeldate").val(Fdatestring);

    //$("#txtFromDate").val(Fdatestring);
    $('#txtFromDate').val(MainFDate);
    //$("#txtToDate").val(Fdatestring)
    $('#txtToDate').val(moment(new Date()).format('DD/MM/YYYY'));

    fromdate = $("#txtFromDate").val();
    todate = $("#txtToDate").val();


     companyid = $('#ddlMCompany').val();

    if (companyid == null) {
        companyid = DCompid;
    } else {
        companyid = $('#ddlMCompany').val();
    }

    var fill = localStorage.getItem('CommonProductionIssueMainFilter');
    if (fill != "null" && fill != null) {
        LoadDataFromBack(companyid, fromdate, todate);
    } else {
        LoadData(companyid, fromdate, todate);
    }

    //LoadData(companyid, fromdate, todate);
    LoadDDL(companyid, fromdate, todate);

    //$("#ddlinnerworkdiv").change(function () {
    //    if ($("#ddlinnerworkdiv").val() != 0) {
    //        $('#ddlinnerworkdiv').css('border-color', 'lightgrey');
    //    }
    //});

    $("#ddlinnerprocess").change(function () {
        if ($("#ddlinnerprocess").val() != 0) {
            $('#ddlinnerprocess').css('border-color', 'lightgrey');
        }
    });

    $("#ddlinnerstore").change(function () {
        if ($("#ddlinnerstore").val() != 0) {
            $('#ddlinnerstore').css('border-color', 'lightgrey');
        }
    });

    $("#ddllastprocess").change(function () {
        if ($("#ddllastprocess").val() != 0) {
            $('#ddllastprocess').css('border-color', 'lightgrey');
        }
    });
    $(document).on('keyup', '.txtitemrate', function (e) {
        debugger;
        var table = $('#tblitemstckadj').DataTable();
        var sno = table.row($(this).parents('tr')).data()["Sno"];
        var rate = table.row($(this).parents('tr')).data()["AppRate"];
        var Val = $(this).val();

        if (ValiCutBudApp == 'Y' && OrderType=='W') {
            if (Val <= rate) {
                $.each(ProductionItemgrid, function () {
                    if (this.Sno == sno) {
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
                $.each(ProductionItemgrid, function () {
                    if (this.Sno == sno) {
                        this.Rate = this.AppRate;

                    }
                });
                var table = $('#tblitemstckadj').DataTable();
                var data = table.rows().data();

                $('input[id=txtitemrate]').each(function (ig) {
                    if (data[ig].Sno == sno) {
                        var row = $(this).closest('tr');
                        row.find('#txtitemrate').val(data[ig].AppRate);

                    }
                });
                return true;
            }
        }
        else if (ValiCutBudAppSam == 'Y' && OrderType == 'S') {
        

            if (Val <= rate) {
                $.each(ProductionItemgrid, function () {
                    if (this.Sno == sno) {
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
                $.each(ProductionItemgrid, function () {
                    if (this.Sno == sno) {
                        this.Rate = this.AppRate;

                    }
                });
                var table = $('#tblitemstckadj').DataTable();
                var data = table.rows().data();

                $('input[id=txtitemrate]').each(function (ig) {
                    if (data[ig].Sno == sno) {
                        var row = $(this).closest('tr');
                        row.find('#txtitemrate').val(data[ig].AppRate);

                    }
                });
                return true;
            }
      
        
        }

        else {
            $.each(ProductionItemgrid, function () {
                if (this.Sno == sno) {
                    this.Rate = Val;

                }
            });
            var table = $('#tblitemstckadj').DataTable();
            var data = table.rows().data();

            $('input[id=txtitemrate]').each(function (ig) {
                if (data[ig].Sno == sno) {
                    var row = $(this).closest('tr');
                    row.find('#txtitemrate').val(Val);

                }
            });
        }
    });
    $("#ddlinnerpro").change(function () {
        debugger;
        LoadSupplierSetup();
        processid = $('#ddlinnerpro').val();
        //companyid = $('#ddlinnerComp').val();
        companyunitid = $('#ddlinnerCompunit').val();
        GetOrderTypeProcessType();
       
        if (companyunitid == 0) {
            $('#ddlinnerpro').val(0);
            //alert("Please select Company Unit...");
            var msg = 'Please select Company Unit...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
        }
        else if (companyunitid > 0) {
            LoadCommonProductionIssueInnerGrid(companyunitid, processid, ProcessType, OrderType);
        }
    });

    $("#ddlinnerCompunit").change(function () {
        debugger;
        processid = $('#ddlinnerpro').val();
        //companyid = $('#ddlinnerComp').val();
        companyunitid = $('#ddlinnerCompunit').val();

        if (processid > 0) {
            //LoadCommonProductionIssueInnerGrid(companyid, companyunitid, processid);
        }
    });

    $("#btninnerclose").click(function () {
        debugger;
        $('#ddlMCompany').val(0);
        $("#ddlinnerComp").val(0);
        $("#ddlinnerCompunit").val(0);
        $("#ddlinnerpro").val(0);
        $("#ddlinnerworkdiv").val(0);
        $("#ddlinnerstyle").val(0);
        $("#ddlinnerbuyer").val(0);
        $("#ddlinneritem").val(0);
        $("#ddlinnercolor").val(0);
    });

    $("#btnsubmit").click(function () {
        debugger;
        ProductionItemgrid = [];
        ProdItemStckgrid = [];
        ProdItemStckgridFilter = [];
        ProdItemJobOrdNogrid = [];
        ProdItemJobOrdNogridFilter = [];
        var type = $('input[name="AOType"]:checked').attr('value');
        OrderType = type;
        LoadInnerItemDetails(DetRowID);
    });

    $(document).on('click', '.btnmaingrddelete', function () {
        debugger;

        var table = $('#tblCommProdmaingrid').DataTable();
        ProdIssueEditId = table.row($(this).parents('tr')).data()["ProdIssueId"];

        //rowindex = $(this).closest('tr').index();

        //var currow = maintbllist.slice(rowindex);
        var ProdIssId = ProdIssueEditId;
        ProdIssueEditId = ProdIssId;
        Delete(ProdIssId);
    });

   

    $(document).on('click', '.btnmaingrdedit', function () {
        debugger;
        Mode = 1;
        var table = $('#tblCommProdmaingrid').DataTable();
        ProdIssueEditId = table.row($(this).parents('tr')).data()["ProdIssueId"];
        var ProdIssueNo = table.row($(this).parents('tr')).data()["ProdIssueNo"];
        companyid = table.row($(this).parents('tr')).data()["CompanyId"];

        //rowindex = $(this).closest('tr').index();

        //var currow = maintbllist.slice(rowindex);
        //ProdIssueEditId = currow[0]['ProdIssueId'];
        //var ProdIssueNo = currow[0]['ProdIssueNo'];
        //companyid = currow[0]['CompanyId'];

        $('#myModal1').modal('show');
        $('#btnAdd').hide();
        $('#btnUpdate').show();
        ////Clear controls
        //var tablesize = $('#tblinputgrd').DataTable();
        //tablesize.clear().draw();

        //var tablesize = $('#tbloutputgrd').DataTable();
        //tablesize.clear().draw();
        var type = $('#ddlMType option:selected').val()
        OrderType = type;

        getbyID(ProdIssueEditId);

    });
    //$(document).on('click', '.btnordadd', function () {
    //    debugger;
    //    rowindex = $(this).closest('tr').index();

    //    var currow = ProductionMaingrid.slice(rowindex);
    //    ProdPrgId = currow[0]['ProdPrgId'];
    //    LoadInnerStockDetails(DetRowID);
    //});

    //$(document).on('click', '.btnitemjobord', function () {
    //    debugger;
    //    rowindex = $(this).closest('tr').index();
    //    var currowind = ProductionItemgrid.slice(rowindex);
    //    var ProdDetId = currowind[0]['ProductionDetId'];
    //    ItemId = currowind[0]['ItemId'];
    //    ColorId = currowind[0]['ColorId'];
    //    SizeId = currowind[0]['SizeId'];

    //    if (ProdItemJobOrdNogrid != undefined) {
    //        ProdItemJobOrdNogridFilter = $.grep(ProdItemJobOrdNogrid, function (element, index) {
    //            //return (element.ProdDetId == currowind[0]['ProductionDetId']);
    //            return (element.ItemId == ItemId && element.ColorId == ColorId && element.SizeId == SizeId);
    //        });
    //    }

    //    var curjobrow = 0;
    //    var ProdJobDetId = 0;
    //    var JobOrdno, itemid, colorid, sizeid = 0;

    //    if (ProdItemJobOrdNogridFilter != undefined && ProdItemJobOrdNogridFilter.length > 0) {
    //        curjobrow = ProdItemJobOrdNogridFilter.slice(0);
    //        ProdJobDetId = curjobrow[0]['ProcessJobDetId'];
    //        JobOrdno = curjobrow[0]['JobOrdNo'];
    //        itemid = curjobrow[0]['ItemId'];
    //        colorid = curjobrow[0]['ColorId'];
    //        sizeid = curjobrow[0]['SizeId'];
    //    }

    //    //for (var i in ProdItemStckgrid) {
    //    //    for (var j in ProdItemJobOrdNogrid) {
    //    //        if (ProdItemJobOrdNogrid[j].JobOrdNo == ProdItemStckgrid[i].JobOrdNo) {
    //    //            ProdItemStckgrid[i].ProdJobDetId = ProdItemJobOrdNogrid[j].ProcessJobDetId;
    //    //            ProdItemStckgrid[i].ItemId = ProdItemJobOrdNogrid[j].ItemId;
    //    //            ProdItemStckgrid[i].ColorId = ProdItemJobOrdNogrid[j].ColorId;
    //    //            ProdItemStckgrid[i].SizeId = ProdItemJobOrdNogrid[j].SizeId;
    //    //        }
    //    //    }
    //    //}

    //    if (ProdItemStckgrid != undefined) {
    //        ProdItemStckgridFilter = $.grep(ProdItemStckgrid, function (element, index) {
    //            return (element.JobOrdNo == JobOrdno && element.ItemId == itemid && element.ColorId == colorid && element.SizeId == sizeid);
    //        });
    //    }

    //    //var inputcount = 0;
    //    //$('#tbljobordinfo tr').each(function () {
    //    //    inputcount++;
    //    //});

    //    //if (inputcount > 0) {
    //    //    //var tableinput = $('#tblinnergrid').DataTable();
    //    //    //tableinput.clear().draw();
    //    //    $('#tbljobordinfo').DataTable().destroy();
    //    //}

    //    //$('#tbljobordinfo').DataTable().destroy();
    //    //$('#tbljobordstckinfo').DataTable().destroy();

    //    LoadProdItemJobOrdergrid(ProdItemJobOrdNogridFilter);
    //    LoadProdStockgrid(ProdItemStckgridFilter);
    //    //fnLoadJobOrderInfo(ProdDetId);
    //});


    $(document).ready(function () {

        $('#tblitemstckadj').on('click', 'tr', function (e) {
            debugger;

            var table = $('#tblitemstckadj').DataTable();
            var row = $(this).closest('tr');
            var data = $('#tblitemstckadj').dataTable().fnGetData(row);
     

            var ProdDetId = data.ProductionDetId; //table.row($(this).parents('tr')).data()["itemid"];
            ItemId = data.ItemId; //table.row($(this).parents('tr')).data()["colorid"];
            ColorId = data.ColorId; //table.row($(this).parents('tr')).data()["sizeid"];
            SizeId = data.SizeId; //table.row($(this).parents('tr')).data()["uomId"];
           // var prgno = data.ProdPrgNo;

            //rowindex = $(this).closest('tr').index();
            ////var currowind = ProductionItemgrid.slice(rowindex);
            //var ProdDetId = currowind[0]['ProductionDetId'];
            //ItemId = currowind[0]['ItemId'];
            //ColorId = currowind[0]['ColorId'];
            //SizeId = currowind[0]['SizeId'];

            if (ProdItemJobOrdNogrid != undefined) {
                ProdItemJobOrdNogridFilter = $.grep(ProdItemJobOrdNogrid, function (element, index) {
                    //return (element.ProdDetId == currowind[0]['ProductionDetId']);
                    return (element.ItemId == ItemId && element.ColorId == ColorId && element.SizeId == SizeId );
                });
            }

            var curjobrow = 0;
            var ProdJobDetId = 0;
            var JobOrdno, itemid, colorid, sizeid = 0;

            if (ProdItemJobOrdNogridFilter != undefined && ProdItemJobOrdNogridFilter.length > 0) {
                curjobrow = ProdItemJobOrdNogridFilter.slice(0);
                ProdJobDetId = curjobrow[0]['ProcessJobDetId'];
                JobOrdno = curjobrow[0]['JobOrdNo'];
                itemid = curjobrow[0]['ItemId'];
                colorid = curjobrow[0]['ColorId'];
                sizeid = curjobrow[0]['SizeId'];
            }

            //for (var i in ProdItemStckgrid) {
            //    for (var j in ProdItemJobOrdNogrid) {
            //        if (ProdItemJobOrdNogrid[j].JobOrdNo == ProdItemStckgrid[i].JobOrdNo) {
            //            ProdItemStckgrid[i].ProdJobDetId = ProdItemJobOrdNogrid[j].ProcessJobDetId;
            //            ProdItemStckgrid[i].ItemId = ProdItemJobOrdNogrid[j].ItemId;
            //            ProdItemStckgrid[i].ColorId = ProdItemJobOrdNogrid[j].ColorId;
            //            ProdItemStckgrid[i].SizeId = ProdItemJobOrdNogrid[j].SizeId;
            //        }
            //    }
            //}

            if (ProdItemStckgrid != undefined) {
                ProdItemStckgridFilter = $.grep(ProdItemStckgrid, function (element, index) {
                    return (element.JobOrdNo == JobOrdno && element.ItemId == itemid && element.ColorId == colorid && element.SizeId == sizeid);
                });
            }

            //var inputcount = 0;
            //$('#tbljobordinfo tr').each(function () {
            //    inputcount++;
            //});

            //if (inputcount > 0) {
            //    //var tableinput = $('#tblinnergrid').DataTable();
            //    //tableinput.clear().draw();
            //    $('#tbljobordinfo').DataTable().destroy();
            //}

            //$('#tbljobordinfo').DataTable().destroy();
            //$('#tbljobordstckinfo').DataTable().destroy();

            LoadProdItemJobOrdergrid(ProdItemJobOrdNogridFilter);
            LoadProdStockgrid(ProdItemStckgridFilter);
        });
    });




    //$(document).on('click', '.btnitemstck', function () {
    //    debugger;
    //    rowindex = $(this).closest('tr').index();

    //    var supp = $(this).closest('tr').find('td:eq(0)').html();
    //    Sno = $(this).closest('tr').find('td:eq(1)').html();

    //    var table = $('#tbljobordinfo').DataTable();
    //    Joborderno = table.row($(this).parents('tr')).data()["JobOrdNo"];
    //    ItemId = table.row($(this).parents('tr')).data()["ItemId"];
    //    ColorId = table.row($(this).parents('tr')).data()["ColorId"];
    //    SizeId = table.row($(this).parents('tr')).data()["SizeId"];

    //    //for (var t = 0; t < ProdItemStckgrid.length; t++) {
    //    //    if (ProdItemStckgrid[t].JobOrdNo == JobOrdno) {
    //    //        ProdItemStckgrid[t].ProdJobDetId = ProcessJobDetId;
    //    //    }
    //    //}

    //    if (ProdItemStckgrid != undefined) {
    //        ProdItemStckgridFilter = $.grep(ProdItemStckgrid, function (element, index) {
    //            return (element.JobOrdNo == Joborderno && element.ItemId == ItemId && element.ColorId == ColorId && element.SizeId == SizeId);
    //        });
    //    }

    //    $('#tbljobordstckinfo').DataTable().destroy();

    //    LoadProdStockgrid(ProdItemStckgridFilter);

    //    //fnLoadItemStockInfo(JobOrdno, ProcessJobDetId);
    //});


    $(document).ready(function () {

        $('#tbljobordinfo').on('click', 'tr', function (e) {
            debugger;

            var table = $('#tbljobordinfo').DataTable();
            var row = $(this).closest('tr');
            var data = $('#tbljobordinfo').dataTable().fnGetData(row);


            //var ItmId = data.itemid; //table.row($(this).parents('tr')).data()["itemid"];
            //var ClrId = data.colorid; //table.row($(this).parents('tr')).data()["colorid"];
            //var SzId = data.sizeid; //table.row($(this).parents('tr')).data()["sizeid"];
            //var PUId = data.uomId; //table.row($(this).parents('tr')).data()["uomId"];

            var supp = $(this).closest('tr').find('td:eq(0)').html();
            Sno = $(this).closest('tr').find('td:eq(1)').html();

            //var table = $('#tbljobordinfo').DataTable();
            Joborderno = data.JobOrdNo; //table.row($(this).parents('tr')).data()["JobOrdNo"];
            ItemId = data.ItemId; //table.row($(this).parents('tr')).data()["ItemId"];
            ColorId = data.ColorId; //table.row($(this).parents('tr')).data()["ColorId"];
            SizeId = data.SizeId; //table.row($(this).parents('tr')).data()["SizeId"];



            if (ProdItemStckgrid != undefined) {
                ProdItemStckgridFilter = $.grep(ProdItemStckgrid, function (element, index) {
                    return (element.JobOrdNo == Joborderno && element.ItemId == ItemId && element.ColorId == ColorId && element.SizeId == SizeId);
                });
            }

            $('#tbljobordstckinfo').DataTable().destroy();

            LoadProdStockgrid(ProdItemStckgridFilter);
        });
    });



    $("#btnaddnew").click(function () {
        debugger;
        DetRowID = 0;
        companyid = $("#ddlinnerComp").val();

        if (companyid == 0) {
            //alert("Please select Company");
            var msg = 'Please select Company...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
        }
        else {
            $("#ddlinnerComp").val(companyid);

            $('#myModal').modal('show');
            //$('ddlinnerComp').val(companyid);
            $('#optinnerwrkord').prop('checked', true);
            //$('#optinnerinter').prop('checked', true);
            $('#optinnerpro').prop('checked', true);
            $('#optinnerbuyer').prop('checked', true);
            GetOrderTypeProcessType();

            $('#txtissDate').val(moment(new Date()).format('DD/MM/YYYY'));

            if ($('#optinnerpro').is(':checked')) {
                RadioPClick();
            }
            else if ($('#optinnerworkdiv').is(':checked')) {
                RadioCClick();
            }



            //Loading empty inner grid
            LoadCommonProductionIssueInnerGrid(0, 0, ProcessType, OrderType);
        }
    });


  
    $(document).on('keyup', '.txtitemissueqty', function () {
        debugger;
        //rowindex = $(this).closest('tr').index();
        ////alert(rowindex);

        //var currentrowoftcpi = ProductionItemgrid.slice(rowindex);

        //var CSno = currentrowoftcpi[0].Sno;
        //var IId = currentrowoftcpi[0].ItemId;
        //var CId = currentrowoftcpi[0].ColorId;
        //var SId = currentrowoftcpi[0].SizeId;
        //var PUId = currentrowoftcpi[0].UomId;

        var table = $('#tblitemstckadj').DataTable();
        var row = $(this).closest('tr');
        var data = $('#tblitemstckadj').dataTable().fnGetData(row);

        var  CSno = data.Sno;
        var IId = data.ItemId;
        var  CId = data.ColorId;
        var SId = data.SizeId;
        var  PUId = data.UomId;
      


        var Val = $(this).val();
        var IssQty = Val;
        var BlQ = data.BalanceQty;



        var allow = 0;
        var balallow = 0;
        for (j = 0; ProductionItemgrid.length > j; j++) {
            if (CSno != ProductionItemgrid[j].Sno) {
                var bal = ProductionItemgrid[j].BalanceQty; //+pallown
                // var prgqty = OpSaveJobDetList[j].prgopqty;
                var IssueQty = ProductionItemgrid[j].IssueQty;
                if (ProductionItemgrid[j].BalanceQty < ProductionItemgrid[j].IssueQty) {
                    var curallow = parseFloat(ProductionItemgrid[j].IssueQty) - parseFloat(ProductionItemgrid[j].BalanceQty)
                    allow = allow + parseFloat(curallow);
                }
            }
        }

        balallow = pallown - allow;

        for (j = 0; ProductionItemgrid.length > j; j++) {
            if (CId == ProductionItemgrid[j].ColorId && IId == ProductionItemgrid[j].ItemId && SId == ProductionItemgrid[j].SizeId && CSno == ProductionItemgrid[j].Sno) {
                var bal = ProductionItemgrid[j].BalanceQty; //+pallown
                //var prgqty = OpSaveJobDetList[j].prgopqty;
                var ordqty = ProductionItemgrid[j].IssueQty;
                var allow = 0;
                if (ProductionItemgrid[j].BalanceQty < Val) {

                    var totactval = parseFloat(ProductionItemgrid[j].BalanceQty) + balallow;

                    if (totactval < Val) {

                        Val = parseFloat(totactval).toFixed(3);
                        IssQty = Val;

                    }
                }
            }
        }




        var totjobissues = 0;
        for (var t = 0; t < ProdItemJobOrdNogrid.length; t++) {
            if (ProdItemJobOrdNogrid[t].ItemId == IId && ProdItemJobOrdNogrid[t].ColorId == CId && ProdItemJobOrdNogrid[t].SizeId == SId) {
                totjobissues = totjobissues + parseFloat(ProdItemJobOrdNogrid[t].BalQty);
            }
        }
        var totjob = 0;
        totjob = totjobissues + balallow;

        if (totjob < Val) {
            Val = parseFloat(totjob).toFixed(3);
            IssQty = Val;
        }



        var totstkissues = 0;
        for (var t = 0; t < ProdItemStckgrid.length; t++) {
            if (ProdItemStckgrid[t].ItemId == IId && ProdItemStckgrid[t].ColorId == CId && ProdItemStckgrid[t].SizeId == SId) {
                totstkissues = totstkissues + parseFloat(ProdItemStckgrid[t].Stock);
            }
        }

        if (totstkissues < Val) {
            Val = parseFloat(totstkissues).toFixed(3);
            IssQty = Val;
        }



        //if (Val > BlQ) {
        //    Val = 0;
        //    var otable = $('#tblitemstckadj').DataTable();
        //    var odata = otable.rows().data();

        //    $('input[id=txtitemissueqty]').each(function (ig) {
        //        if (odata[ig].ItemId == IId && odata[ig].ColorId == CId && odata[ig].SizeId == SId & odata[ig].Sno == CSno)
        //        {
        //            var row = $(this).closest('tr');
        //            // row.find('#txtOpOrdQty').val(totalamnt);
        //            row.find('#txtitemissueqty').focus().val('').val(Val);
        //        }
        //    });

        //    alert('Quantity should not exceed Balqty...');
          
        //    return true;
        //}

        $.each(ProductionItemgrid, function () {
            if (this.Sno == CSno) {
                this.IssueQty = IssQty;

            }
        });
        $('#tblitemstckadj').DataTable().destroy();

        LoadProdItemStckgrid(ProductionItemgrid);

        var pid = [];
        var bal = [];
        var qty = [];

        for (var t = 0; t < ProdItemJobOrdNogrid.length; t++) {
            if (ProdItemJobOrdNogrid[t].ItemId == IId && ProdItemJobOrdNogrid[t].ColorId == CId && ProdItemJobOrdNogrid[t].SizeId == SId) {
                pid.push(ProdItemJobOrdNogrid[t].Sno);
                if (bal.length == 0) {
                    bal.push(ProdItemJobOrdNogrid[t].BalQty + balallow);
                } else {
                    bal.push(ProdItemJobOrdNogrid[t].BalQty);
                }
                qty.push(ProdItemJobOrdNogrid[t].IssQty);
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

        var son = [];
        var jid = [];
        var itmid = [];
        var coid = [];
        var szid = [];
        for (var u = 0; u < ProdItemJobOrdNogrid.length; u++) {
            for (var r = 0; r < pid.length; r++) {
                if (ProdItemJobOrdNogrid[u].Sno == pid[r]) {
                    ProdItemJobOrdNogrid[u].IssQty = qty[r];
                    son.push(ProdItemJobOrdNogrid[u].IssQty);
                    jid.push(ProdItemJobOrdNogrid[u].JobOrdNo);
                    itmid.push(ProdItemJobOrdNogrid[u].ItemId);
                    coid.push(ProdItemJobOrdNogrid[u].ColorId);
                    szid.push(ProdItemJobOrdNogrid[u].SizeId);
                }
            }
        }
        var colorempty = [];
        colorempty = ProdItemJobOrdNogrid;

        colorempty = $.grep(colorempty, function (v) {
            return (v.ItemId === IId && v.ColorId === CId && v.SizeId === SId);
        });

        ProdItemJobOrdNogridFilter = colorempty;


        $('#tbljobordinfo').DataTable().destroy();
        LoadProdItemJobOrdergrid(ProdItemJobOrdNogridFilter);

        var j = jid[0];
        var i = itmid[0];
        var c = coid[0];
        var s = szid[0];

        var sid = [];
        var bal = [];
        var qty = [];
        for (var t = 0; t < ProdItemStckgrid.length; t++) {
            if (ProdItemStckgrid[t].JobOrdNo == j && ProdItemStckgrid[t].ItemId == i && ProdItemStckgrid[t].ColorId == c && ProdItemStckgrid[t].SizeId == s) {
                sid.push(ProdItemStckgrid[t].StockId);
                bal.push(ProdItemStckgrid[t].Stock);
                qty.push(ProdItemStckgrid[t].Issues);
            }
        }

        if (son[0] < bal[0]) {
            qty[0] = son[0];
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

        for (var u = 0; u < ProdItemStckgrid.length; u++) {
            for (var r = 0; r < sid.length; r++) {
                if (ProdItemStckgrid[u].StockId == sid[r]) {
                    ProdItemStckgrid[u].Issues = qty[r];
                    // stkid.push(ProdItemStckgrid[u].ItemStockId);
                }
            }
        }


        var empty = [];
        empty = ProdItemStckgrid;

        empty = $.grep(empty, function (v) {
            return (v.ItemId === IId && v.ColorId === CId && v.SizeId === SId && v.JobOrdNo === j);
        });

        ProdItemStckgridFilter = empty;

        $('#tbljobordstckinfo').DataTable().destroy();
        LoadProdStockgrid(ProdItemStckgridFilter);

        ////Datatable textbox focus
        //var rows = $("#tblitemstckadj").dataTable().fnGetNodes();
        //var dtTable = $('#tblitemstckadj').DataTable();
        //for (var i = 0; i < rows.length; i++) {
        //    var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
        //    $('input[id=txtitemissueqty]').each(function () {
        //        if (sn == CSno && $(this).val() == Val) {
        //            var row = $(this).closest('tr');
        //            var num = row.find('#txtitemissueqty').val();
        //            row.find('#txtitemissueqty').focus().val('').val(num);
        //            return true;
        //        }
        //    });
        //}

        var CSno = data.Sno;
        var IId = data.ItemId;
        var CId = data.ColorId;
        var SId = data.SizeId;
        var PUId = data.UomId;


        var otable = $('#tblitemstckadj').DataTable();
        var odata = otable.rows().data();

        $('input[id=txtitemissueqty]').each(function (ig) {
            if (odata[ig].ItemId == IId && odata[ig].ColorId == CId && odata[ig].SizeId == SId & odata[ig].Sno == CSno

                ) {
                var row = $(this).closest('tr');
                // row.find('#txtOpOrdQty').val(totalamnt);
                row.find('#txtitemissueqty').focus().val('').val(Val);
            }
        });

        return true;




    });



    $(document).on('keyup', '.txtstockissues', function () {
        debugger;
        rowindex = $(this).closest('tr').index();
        // alert(rowindex);
        var table = $('#tbljobordstckinfo').DataTable();
        var itmstkid = table.row($(this).parents('tr')).data()["StockId"];
        var balstk = table.row($(this).parents('tr')).data()["Stock"];
        var jm = table.row($(this).parents('tr')).data()["JobOrdNo"];
        var itmid = table.row($(this).parents('tr')).data()["ItemId"];
        var clrid = table.row($(this).parents('tr')).data()["ColorId"];
        var szid = table.row($(this).parents('tr')).data()["SizeId"];

        var currentrowoftcpi = ProdItemStckgrid.slice(rowindex);
        //var itmstkid = currentrowoftcpi[0].StockId;
        //var balstk = currentrowoftcpi[0].Stock;
        //var jm = currentrowoftcpi[0].ProdJobDetId;

        var value = $(this).val();


        var allow = 0;
        var balallow = 0;
        for (j = 0; ProductionItemgrid.length > j; j++) {
            if (ProductionItemgrid[j].ItemId == itmid && ProductionItemgrid[j].ColorId == clrid && ProductionItemgrid[j].SizeId == szid) {}
            else{
                var bal = ProductionItemgrid[j].BalanceQty; //+pallown
                // var prgqty = OpSaveJobDetList[j].prgopqty;
                var IssueQty = ProductionItemgrid[j].IssueQty;
                if (ProductionItemgrid[j].BalanceQty < ProductionItemgrid[j].IssueQty) {
                    var curallow = parseFloat(ProductionItemgrid[j].IssueQty) - parseFloat(ProductionItemgrid[j].BalanceQty)
                    allow = allow + parseFloat(curallow);
                }
            }
            }
        

        balallow = pallown - allow;

        for (j = 0; ProductionItemgrid.length > j; j++) {
            if (clrid == ProductionItemgrid[j].ColorId && itmid == ProductionItemgrid[j].ItemId && szid == ProductionItemgrid[j].SizeId ) {
                var bal = ProductionItemgrid[j].BalanceQty; //+pallown
                //var prgqty = OpSaveJobDetList[j].prgopqty;
                var ordqty = ProductionItemgrid[j].IssueQty;
                var allow = 0;
                if (ProductionItemgrid[j].BalanceQty < value) {

                    var totactval = parseFloat(ProductionItemgrid[j].BalanceQty) + balallow;

                    if (totactval < value) {

                        value = parseFloat(totactval).toFixed(3);
                        

                    }
                }
            }
        }

        var totjobissues = 0;
        for (var t = 0; t < ProdItemJobOrdNogrid.length; t++) {
            if (ProdItemJobOrdNogrid[t].ItemId == itmid && ProdItemJobOrdNogrid[t].ColorId == clrid && ProdItemJobOrdNogrid[t].SizeId == szid && ProdItemJobOrdNogrid[t].JobOrdNo == jm) {
                totjobissues = totjobissues + parseFloat(ProdItemJobOrdNogrid[t].BalQty);
            }
        }
        var totjob = 0;
        totjob = totjobissues + balallow;
        if (totjob < value) {
            value = parseFloat(totjob).toFixed(3);
        }



        var totstkissues = 0;
        for (var t = 0; t < ProdItemStckgrid.length; t++) {
            if (ProdItemStckgrid[t].ItemId == itmid && ProdItemStckgrid[t].ColorId == clrid && ProdItemStckgrid[t].SizeId == szid && ProdItemStckgrid[t].JobOrdNo == jm) {
                totstkissues = totstkissues + parseFloat(ProdItemStckgrid[t].Stock);
            }
        }

        if (totstkissues < value) {
            value = parseFloat(totstkissues).toFixed(3);
        }

        //currentrowstk = [];
        //var det = 0;

        //for (var w = 0; w < ProdItemJobOrdNogrid.length; w++) {
        //    if (ProdItemJobOrdNogrid[w].JobOrdNo == jm && ProdItemJobOrdNogrid[w].ItemId == itmid && ProdItemJobOrdNogrid[w].ColorId == clrid && ProdItemJobOrdNogrid[w].SizeId == szid) {
        //        currentrowstk.push(ProdItemJobOrdNogrid[w]);
        //        //var jno = currentrowstk[0].ProcessJobDetId;
        //        det = currentrowstk[0].ProdDetId;
        //        var balq = currentrowstk[0].BalQty;
        //    }
        //}

        $.each(ProdItemStckgrid, function () {
            if (this.StockId == itmstkid) {

                if (balstk >= value) {
                    this.Issues = value;
                    //if (balq >= value) {
                    //    this.Issues = value;
                    //}
                    //else {
                    //    var t = value - balq;
                    //    this.Issues = balq;
                    //}
                }
                else {
                    var t = value - balstk;
                    this.Issues = balstk;
                }
            }
        });

        var tot = 0;
        for (var d = 0; d < ProdItemStckgrid.length; d++) {
            if (ProdItemStckgrid[d].ItemId == itmid && ProdItemStckgrid[d].ColorId == clrid && ProdItemStckgrid[d].SizeId == szid && ProdItemStckgrid[d].JobOrdNo == jm) {
                var at = ProdItemStckgrid[d].Issues;
                tot = tot + parseFloat(at);
            }
        }

        ////var isqty = parseFloat(tot) + value;
        //if (tot > balq) {
        //    alert('Should not exceed Bal Qty in Order table');
        //    return true;
        //}

        //var currentrow = [];
        //for (var a = 0; a < ProdItemJobOrdNogrid.length; a++) {

        //    if (ProdItemJobOrdNogrid[a].JobOrdNo == jm && ProdItemJobOrdNogrid[a].ItemId == itmid && ProdItemJobOrdNogrid[a].ColorId == clrid && ProdItemJobOrdNogrid[a].SizeId == szid) {
        //        currentrow.push(ProdItemJobOrdNogrid[a]);
        //        //var jno = currentrow[0].ProcessJobDetId;
        //        // Itmstkid = currentrow[0].ItemStockId;
        //        var balq = currentrow[0].BalQty;

        //        if (balq <= balstk) {

        //        }

        //        $.each(ProdItemJobOrdNogrid, function () {
        //            //if (this.JoMasId == jm) {
        //            if (this.JobOrdNo == jm && this.ItemId == itmid && this.ColorId == clrid && this.SizeId == szid) {
        //                if (value >= balstk) {
        //                    //  if (tot < balq) {
        //                    if (balstk >= value) {
        //                        this.IssQty = value;
        //                    }
        //                    else {
        //                        var t = value - balstk;
        //                        this.IssQty = balstk;
        //                    }
        //                    //}
        //                    //else {
        //                    //    this.IssueQty = value;
        //                    //  }
        //                }
        //                else {
        //                    if (balq >= value) {
        //                        this.IssQty = value;
        //                    }
        //                    else {
        //                        var t = value - balq;
        //                        this.IssQty = balq;
        //                    }
        //                }
        //                //if (balq <= balstk) {
        //                //    this.IssueQty = balq;
        //                //}
        //            }
        //        });
        //    }
        //}



        var pid = [];
        var bal = [];
        var qty = [];

        for (var t = 0; t < ProdItemJobOrdNogrid.length; t++) {
            if (ProdItemJobOrdNogrid[t].ItemId == itmid && ProdItemJobOrdNogrid[t].ColorId == clrid && ProdItemJobOrdNogrid[t].SizeId == szid && ProdItemJobOrdNogrid[t].JobOrdNo == jm) {
                pid.push(ProdItemJobOrdNogrid[t].Sno);
                if (bal.length == 0) {
                    bal.push(ProdItemJobOrdNogrid[t].BalQty + balallow);
                } else {
                    bal.push(ProdItemJobOrdNogrid[t].BalQty);
                }
                qty.push(ProdItemJobOrdNogrid[t].IssQty);
            }
        }

        var c = pid.length;
        var t = 0;

        if (tot < bal[0]) {
            qty[0] = tot;
        }
        else {
            for (var r = 0; r < c; r++) {
                if (r == 0) {
                    if (bal[r] <= tot) {
                        qty[r] = bal[r];
                        t = tot - bal[r];
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

        //var son = [];
        //var jid = [];
        //var itmid = [];
        //var coid = [];
        //var szid = [];
        for (var u = 0; u < ProdItemJobOrdNogrid.length; u++) {
            for (var r = 0; r < pid.length; r++) {
                if (ProdItemJobOrdNogrid[u].Sno == pid[r]) {
                    ProdItemJobOrdNogrid[u].IssQty = qty[r];
                    //son.push(ProdItemJobOrdNogrid[u].IssQty);
                    //jid.push(ProdItemJobOrdNogrid[u].JobOrdNo);
                    //itmid.push(ProdItemJobOrdNogrid[u].ItemId);
                    //coid.push(ProdItemJobOrdNogrid[u].ColorId);
                    //szid.push(ProdItemJobOrdNogrid[u].SizeId);
                }
            }
        }
        var colorempty = [];
        colorempty = ProdItemJobOrdNogrid;

        colorempty = $.grep(colorempty, function (v) {
            return (v.ItemId === itmid && v.ColorId === clrid && v.SizeId === szid && v.JobOrdNo===jm);
        }); 

        ProdItemJobOrdNogridFilter = colorempty;
        $('#tbljobordinfo').DataTable().destroy();
        LoadProdItemJobOrdergrid(ProdItemJobOrdNogridFilter);


        //var totalamnt = 0;

        //for (var e = 0; e < ProdItemStckgrid.length; e++) {
        //    if (ProdItemStckgrid[e].JobOrdNo == jm && ProdItemStckgrid[e].ItemId == itmid && ProdItemStckgrid[e].ColorId == clrid && ProdItemStckgrid[e].SizeId == szid) {
        //        var amount = ProdItemStckgrid[e].Issues;
        //        totalamnt = totalamnt + parseFloat(amount);
        //    }
        //}

        ProdItemStckgridFilter = $.grep(ProdItemStckgrid, function (v) {
            return (v.ItemId === itmid && v.ColorId === clrid && v.SizeId === szid && v.JobOrdNo === jm);
        });

       

        //$.each(ProdItemJobOrdNogrid, function () {
        //    if (this.ItemId == itmid && this.ColorId == clrid && this.SizeId == szid) {
        //        this.IssQty = totalamnt;
        //    }
        //});

        //ProdItemJobOrdNogridFilter = $.grep(ProdItemJobOrdNogrid, function (v) {
        //    return (v.ItemId === itmid && v.ColorId === clrid && v.SizeId === szid && v.JobOrdNo === jm);

        //});

        var total = 0;

        for (var e = 0; e < ProdItemJobOrdNogrid.length; e++) {
            if (ProdItemJobOrdNogrid[e].JobOrdNo == jm && ProdItemJobOrdNogrid[e].ItemId == itmid && ProdItemJobOrdNogrid[e].ColorId == clrid && ProdItemJobOrdNogrid[e].SizeId == szid) {

                var amount = ProdItemJobOrdNogrid[e].IssQty;
                total = total + parseFloat(amount);
            }
        }

        $.each(ProductionItemgrid, function () {
            if (this.ItemId == itmid && this.ColorId == clrid && this.SizeId == szid) {

                this.IssueQty = total;
            }
        });

        var otable = $('#tblitemstckadj').DataTable();
        var odata = otable.rows().data();

        $('input[id=txtitemissueqty]').each(function (ig) {
            if (odata[ig].ItemId == itmid && odata[ig].ColorId == clrid && odata[ig].SizeId == szid) {
                var row = $(this).closest('tr');
                // row.find('#txtOpOrdQty').val(totalamnt);
                row.find('#txtitemissueqty').val(total);
            }
        });

        //return true;



        //$('#tblitemstckadj').DataTable().destroy();
        //LoadProdItemStckgrid(ProductionItemgrid);

        $('#tbljobordinfo').DataTable().destroy();
        LoadProdItemJobOrdergrid(ProdItemJobOrdNogridFilter);


        var otable = $('#tbljobordstckinfo').DataTable();
        var odata = otable.rows().data();

        $('input[id=txtstockissues]').each(function (ig) {
            var row = $(this).closest('tr');
            $.each(ProdItemStckgridFilter, function (v) {
                if (odata[ig].StockId == itmstkid && ProdItemStckgridFilter[v].StockId == itmstkid
              ) {
                   
                    // row.find('#txtOpOrdQty').val(totalamnt);
                    var iss = ProdItemStckgridFilter[v].Issues;
                    row.find('#txtstockissues').focus().val('').val(iss);
                    return true;
                }

            });
        });
      
        //$('#tbljobordstckinfo').DataTable().destroy();
        //LoadProdStockgrid(ProdItemStckgridFilter);

    });


    $(document).on('keyup', '.txtMarkupRate', function () {
        debugger;
        rowindex = $(this).closest('tr').index();
       
        var table = $('#tbljobordstckinfo').DataTable();
        var itmstkid = table.row($(this).parents('tr')).data()["StockId"];
        var balstk = table.row($(this).parents('tr')).data()["Stock"];
        var jm = table.row($(this).parents('tr')).data()["JobOrdNo"];
        var itmid = table.row($(this).parents('tr')).data()["ItemId"];
        var clrid = table.row($(this).parents('tr')).data()["ColorId"];
        var szid = table.row($(this).parents('tr')).data()["SizeId"];

        var currentrowoftcpi = ProdItemStckgrid.slice(rowindex);
        var value = $(this).val();

        $.each(ProdItemStckgrid, function () {
            if (this.StockId == itmstkid) {
                this.MarkupRate = value;
            }
        });
    
        var otable = $('#tbljobordstckinfo').DataTable();
        var odata = otable.rows().data();

        $('input[id=txtMarkupRate]').each(function (ig) {
            var row = $(this).closest('tr');
            $.each(ProdItemStckgridFilter, function (v) {
                if (odata[ig].StockId == itmstkid && ProdItemStckgridFilter[v].StockId == itmstkid
              ) {
                    var iss = ProdItemStckgridFilter[v].MarkupRate;
                    row.find('#txtMarkupRate').focus().val('').val(iss);
                    return true;
                }

            });
        });

    });


});


function LoadAddItem() {
    var proid = "";
    var proid = $('select#ddlinnerpro option:selected').val();

    if (proid == null || proid == "") {
        proid == 0;
    }
    else {

        proid = $('select#ddlinnerpro option:selected').val();
    }
    LoadCommonProductionIssueInnerGrid(0, proid, ProcessType, OrderType);
}


function getbyID(ProdIssueId) {
    debugger;
    //$('#ddlcutheaderCompany').css('border-color', 'lightgrey');

    $.ajax({
        url: "/CommonProductionIssue/GetCommonHeaderInfo/" + ProdIssueId,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = [];
            obj = result;

            $("#txtissueno").val(obj[0].ProdIssueNo);
            $('#txtissueDate').val(moment(obj[0].ProdIssueDate).format('DD/MM/YYYY'));
            $("#txtremark").val(obj[0].Remarks);
            $("#ddllastprocess").val(obj[0].LastProcessId);
            $("#ddlpro").val(obj[0].ProcessId);
            $("#txtProcessor").val(obj[0].Processor);
            $("#ddlCompunit").val(obj[0].CompanyUnitId);
            $("#txtgatepass").val(obj[0].GatePassVehicle);
            $("#txtProcessorId").val(obj[0].ProcessorId);

            LoadProcessDetails(obj[0].ProcessId);

            GOrdType = obj[0]["OrderType"];
            GInorExtType = obj[0]["InterExter"];
            CheckAlloted();

            $.ajax({
                type: "POST",
                url: '/CommonProductionIssue/GetCommProdIssueitemdetforEdit/',
                data: JSON.stringify({ ProdIssueId: ProdIssueId }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (json) {
                    debugger;

                    $('#btnDelete').hide();
                    $('#btnUpdate').show();
                    $('#btnAdd').hide();

                    ProductionItemgrid = json;
                    LoadProdItemStckgrid(ProductionItemgrid);

                    //Load JobOrder Grid based on first Item
                    if (ProductionItemgrid != undefined && ProductionItemgrid.length > 0) {
                        var currowind = ProductionItemgrid.slice(0);
                        //var ProdDetId = currowind[0]['ProductionDetId'];
                        ItemId = currowind[0]['ItemId'];
                        ColorId = currowind[0]['ColorId'];
                        SizeId = currowind[0]['SizeId'];

                        fnLoadJobOrderInfoforEdit(ProdIssueId);
                        //fnLoadItemStockInfoforEdit(ProdIssueId);
                    }
                    else {
                        fnLoadJobOrderInfoforEdit(0);
                        fnLoadItemStockInfoforEdit(0);
                    }
                    //End
                },
                failure: function (errMsg) {
                    alert(errMsg);
                }
            });

            //fnLoadInOutGridOnEditMode(CuttingOrderId, prodprgid);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

function GetOrderTypeProcessType() {
    if ($('#optinnerpro').is(':checked')) {
        ProcessType = 'P';
    }
    else if ($('#optinnerpro').is(':checked')) {
        ProcessType = 'W';
    }

    if ($('#optinnerwrkord').is(':checked')) {
        OrderType = 'W';
    }
    else if ($('#optinnersamord').is(':checked')) {
        OrderType = 'S';
    }
    else if ($('#optinnerjobord').is(':checked')) {
        OrderType = 'J';
    }
}

function RadioPClick() {
    debugger;
   // $('#ddlinnerworkdiv').hide();
    $('#lblworkdiv').hide();

    //$('#ddlinnerprocess').show();
    $('#lblprocessor').show();
}

function RadioCClick() {
    debugger;
    $('#ddlinnerprocess').hide();
    $('#lblprocessor').hide();

    $('#ddlinnerworkdiv').show();
    $('#lblworkdiv').show();
}

function LoadInnerItemDetails(ProdPrgid) {
    debugger;
    var ProdPrgDetId = 0;
    var SupplierId = $("#ddlinnerprocess").val();

    $('#txtgatepass').val();

    WorkdivId = $("#ddlinnerworkdiv").val();  
    SupplierId = $("#ddlinnerprocess").val();

    IssueStoreId = $("#ddlinnerstore").val();
    ProcessId = $("#ddlinnerpro").val();
    LoadProcessDetails(ProcessId);

    UnitId = $("#ddlinnerCompunit").val();

    var Supplier = $('select#ddlinnerprocess option:selected').text();
    var WorkDiv = $('select#ddlinnerworkdiv option:selected').text();


    if (SupplierId == 0) {
        $("#txtProcessorId").val(WorkdivId);
        $("#txtProcessor").val(WorkDiv);
    } else {
        $("#txtProcessorId").val(SupplierId);
        $("#txtProcessor").val(Supplier);
    }



    if (IssueStoreId == 0) {
        //alert("Select Store to proceed...");
       // $('#ddlinnerstore').css('border-color', 'red');
        $('#ddlinnerstore').siblings(".select2-container").css('border', '1px solid red');
    }
        //else if (WorkdivId == 0 && $('#optinnerworkdiv').is(':checked')) {
        //    //alert("Select Workdivision to proceed...");
        //    $('#ddlinnerworkdiv').css('border-color', 'red');
        //}

    else if ((WorkdivId == 0) && (SupplierId == 0)) {
        //alert("Check Work Division cannot be empty...");
        var msg = 'Check Work Division cannot be empty...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
    }

        //else if (SupplierId == 0) {
        //    $('#ddlinnerprocess').css('border-color', 'red');
        //    return false;
        //}
    else if (ProcessId == 0) {
        //$('#ddlinnerpro').css('border-color', 'red');
        $('#ddlinnerpro').siblings(".select2-container").css('border', '1px solid red');
        return false;
    }
    else if (UnitId == 0) {
        //$('#ddlinnerCompunit').css('border-color', 'red');
        $('#ddlinnerCompunit').siblings(".select2-container").css('border', '1px solid red');
        return false;
    }
        //else if (DetRowID == 0) {
    else if (ProdPrgid == 0) {
        //alert("Select any one Job No to proceed...");
        var msg = 'Select any one Job Number to proceed...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        $('#tblinnergrid').css('border-color', 'red');
    }
    else {
        $('#myModal1').modal('show');
        $("#ddlComp").val($("#ddlinnerComp").val());
        $("#ddlCompunit").val($("#ddlinnerCompunit").val());
        $("#ddlpro").val($("#ddlinnerpro").val());
        $("#ddlworkdiv").val($("#ddlinnerworkdiv").val());
        $("#ddlstore").val($("#ddlinnerstore").val());
        $("#ddlstyle").val($("#ddlinnerstyle").val());
        $("#ddlstyle").val($("#ddlinnerstyle").val());

        $('#txtissueDate').val(moment(new Date()).format('DD/MM/YYYY'));

        if ($('#optinnerpro').is(':checked')) {
            LoadSupplierDDL("#ddlinnerProcessor");
            var supplierid = $('#ddlinnerpro').val();
            //$('#ddlinnerProcessor').val(supplierid);
        }
        if ($('#optinnerworkdiv').is(':checked')) {
            LoadWorkdivisionDDL("#ddlinnerProcessor");
            var workdivid = $('#ddlinnerworkdiv').val();
            //$('#ddlinnerProcessor').val(workdivid);
        }

        GenerateProductionIssueNumber(table, column, compId, Docum);

        var inputcount = 0;
        $('#tblitemstckadj tr').each(function () {
            inputcount++;
        });

        if (inputcount > 0) {
            //var tableinput = $('#tblinnergrid').DataTable();
            //tableinput.clear().draw();
            $('#tblitemstckadj').DataTable().destroy();
        }

        //myfunc(ProdPrgid);

        $.ajax({
            type: "POST",
            url: '/CommonProductionIssue/GetCommonProdIssueitemstckdet/',
            data: JSON.stringify({ NoofPrgId: DetRowID, InorOut: "I" }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (json) {
                debugger;
                ProductionItemgrid = json;
                LoadProdItemStckgrid(ProductionItemgrid);

                //for (var i in ProductionItemgrid) {
                //    if (ProdPrgDetId == 0) {
                //        ProdPrgDetId = ProductionItemgrid[i].ProdProgDetId;
                //    }
                //    else {
                //        ProdPrgDetId = ProdPrgDetId + "," + ProductionItemgrid[i].ProdProgDetId;
                //    }
                //}

                //Load JobOrder Grid based on first Item
                if (ProductionItemgrid != undefined && ProductionItemgrid.length > 0) {
                    var currowind = ProductionItemgrid.slice(0);
                    //var ProdDetId = currowind[0]['ProductionDetId'];
                    ItemId = currowind[0]['ItemId'];
                    ColorId = currowind[0]['ColorId'];
                    SizeId = currowind[0]['SizeId'];

                    fnLoadJobOrderInfo(ProdPrgid);
                    //fnLoadItemStockInfo(0, 0);
                }
                else {
                    fnLoadJobOrderInfo(0);
                    fnLoadItemStockInfo(0, 0);
                }

                if (WorkdivId > 0) {
                    $("#ddlinnerProcessor").val(WorkdivId);
                }
                else if (SupplierId > 0) {
                    //$('#ddlinnerProcessor').val(SupplierId).attr("selected", "selected");
                    $("#ddlinnerProcessor").val(SupplierId);
                }

                //End
            },
            failure: function (errMsg) {
                alert(errMsg);
            }
        });
    }
}
function fnLoadJobOrderInfoforEdit(ProdIssueid) {
    //var mergeitemcolorsize = [];

    $.ajax({
        type: "POST",
        url: '/CommonProductionIssue/GetCommonProdJobOrddetforEdit/',
        data: JSON.stringify({ ProdIssueId: ProdIssueid }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            ProdItemJobOrdNogrid = json;

            //for (var i in ProdItemJobOrdNogrid) {
            //    for (var j in ProductionItemgrid) {
            //        if (ProdItemJobOrdNogrid[i].ProdDetId == ProductionItemgrid[j].ProductionDetId) {
            //            ProdItemJobOrdNogrid[i].ItemId = ProductionItemgrid[j].ItemId;
            //            ProdItemJobOrdNogrid[i].ColorId = ProductionItemgrid[j].ColorId;
            //            ProdItemJobOrdNogrid[i].SizeId = ProductionItemgrid[j].SizeId;
            //        }
            //    }
            //}            

            var inputcount = 0;
            $('#tbljobordinfo tr').each(function () {
                inputcount++;
            });

            if (inputcount > 0) {
                //var tableinput = $('#tblinnergrid').DataTable();
                //tableinput.clear().draw();
                $('#tbljobordinfo').DataTable().destroy();
            }

            //if (ProductionItemgrid != undefined) {
            //    var currowind = ProductionItemgrid.slice(0);
            //    if (ProdItemJobOrdNogrid != undefined) {
            //        ProdItemJobOrdNogridFilter = $.grep(ProdItemJobOrdNogrid, function (element, index) {
            //            return (element.ProdDetId == currowind[0]['ProdDetId']);
            //        });
            //    }
            //}

            if (ProductionItemgrid != undefined && ProductionItemgrid.length > 0) {
                var currowind = ProductionItemgrid.slice(0);
                if (ProdItemJobOrdNogrid != undefined) {
                    ProdItemJobOrdNogridFilter = $.grep(ProdItemJobOrdNogrid, function (element, index) {
                        return (element.ItemId == currowind[0]['ItemId'] && element.ColorId == currowind[0]['ColorId'] && element.SizeId == currowind[0]['SizeId']);
                    });
                }
            }

            LoadProdItemJobOrdergrid(ProdItemJobOrdNogridFilter);

            fnLoadItemStockInfoforEdit(ProdIssueEditId);
            ////Load JobOrder Grid based on first Item
            //if (ProdItemJobOrdNogridFilter != undefined && ProdItemJobOrdNogridFilter.length > 0) {
            //    var currowind = ProdItemJobOrdNogridFilter.slice(0);
            //    var JobOrdNo = currowind[0]['JobOrdNo'];
            //    var ProdJobDetId = currowind[0]['ProcessJobDetId'];

            //    //fnLoadItemStockInfo(JobOrdNo, ProdJobDetId);
            //}
            //else {
            //    fnLoadItemStockInfo(0);
            //}
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function fnLoadJobOrderInfo(ProductionPrgid) {
    //var mergeitemcolorsize = [];

    $.ajax({
        type: "POST",
        url: '/CommonProductionIssue/GetCommonProdJobOrddet/',
        data: JSON.stringify({ ProdPrgId: ProductionPrgid }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            ProdItemJobOrdNogrid = json;

            //for (var i in ProdItemJobOrdNogrid) {
            //    for (var j in ProductionItemgrid) {
            //        if (ProdItemJobOrdNogrid[i].ProdDetId == ProductionItemgrid[j].ProductionDetId) {
            //            ProdItemJobOrdNogrid[i].ItemId = ProductionItemgrid[j].ItemId;
            //            ProdItemJobOrdNogrid[i].ColorId = ProductionItemgrid[j].ColorId;
            //            ProdItemJobOrdNogrid[i].SizeId = ProductionItemgrid[j].SizeId;
            //        }
            //    }
            //}            

            var inputcount = 0;
            $('#tbljobordinfo tr').each(function () {
                inputcount++;
            });

            if (inputcount > 0) {
                //var tableinput = $('#tblinnergrid').DataTable();
                //tableinput.clear().draw();
                $('#tbljobordinfo').DataTable().destroy();
            }

            if (ProdItemJobOrdNogrid != undefined && ProdItemJobOrdNogrid.length > 0) {
                var currowind = ProdItemJobOrdNogrid.slice(0);
                //var ProdDetId = currowind[0]['ProductionDetId'];
                ItemId = currowind[0]['ItemId'];
                ColorId = currowind[0]['ColorId'];
                SizeId = currowind[0]['SizeId'];

                fnLoadItemStockInfo(0, 0);
            }

            //if (ProductionItemgrid != undefined) {
            //    var currowind = ProductionItemgrid.slice(0);
            //    if (ProdItemJobOrdNogrid != undefined) {
            //        ProdItemJobOrdNogridFilter = $.grep(ProdItemJobOrdNogrid, function (element, index) {
            //            return (element.ProdDetId == currowind[0]['ProdDetId']);
            //        });
            //    }
            //}

            if (ProductionItemgrid != undefined) {
                var currowind = ProductionItemgrid.slice(0);
                if (ProdItemJobOrdNogrid != undefined) {
                    ProdItemJobOrdNogridFilter = $.grep(ProdItemJobOrdNogrid, function (element, index) {
                        return (element.ItemId == currowind[0]['ItemId'] && element.ColorId == currowind[0]['ColorId'] && element.SizeId == currowind[0]['SizeId']);
                    });
                }
            }

            LoadProdItemJobOrdergrid(ProdItemJobOrdNogridFilter);

            //fnLoadItemStockInfo(0, 0);

            ////Load JobOrder Grid based on first Item
            //if (ProdItemJobOrdNogridFilter != undefined && ProdItemJobOrdNogridFilter.length > 0) {
            //    var currowind = ProdItemJobOrdNogridFilter.slice(0);
            //    var JobOrdNo = currowind[0]['JobOrdNo'];
            //    var ProdJobDetId = currowind[0]['ProcessJobDetId'];

            //    //fnLoadItemStockInfo(JobOrdNo, ProdJobDetId);
            //}
            //else {
            //    fnLoadItemStockInfo(0);
            //}
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function fnLoadItemStockInfoforEdit(ProdIssid) {
    debugger;
    $.ajax({
        type: "POST",
        url: '/CommonProductionIssue/GetCommonProdstckdetforEdit/',
        data: JSON.stringify({ CompanyId: companyid, ProdIssueId: ProdIssid }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            ProdItemStckgrid = json;

            var inputcount = 0;
            $('#tbljobordstckinfo tr').each(function () {
                inputcount++;
            });

            if (inputcount > 0) {
                //var tableinput = $('#tblinnergrid').DataTable();
                //tableinput.clear().draw();
                $('#tbljobordstckinfo').DataTable().destroy();
            }

            //for (var i in ProdItemStckgrid) {
            //    for (var j in ProdItemJobOrdNogrid) {
            //        if (ProdItemJobOrdNogrid[j].JobOrdNo == ProdItemStckgrid[i].JobOrdNo) {
            //            ProdItemStckgrid[i].ProdJobDetId = ProdItemJobOrdNogrid[j].ProcessJobDetId;
            //            ProdItemStckgrid[i].ItemId = ProdItemJobOrdNogrid[j].ItemId;
            //            ProdItemStckgrid[i].ColorId = ProdItemJobOrdNogrid[j].ColorId;
            //            ProdItemStckgrid[i].SizeId = ProdItemJobOrdNogrid[j].SizeId;
            //        }
            //    }
            //}

            if (ProdItemJobOrdNogridFilter != undefined && ProdItemJobOrdNogridFilter.length > 0) {
                var currowind = ProdItemJobOrdNogridFilter.slice(0);
                if (ProdItemStckgrid != undefined) {
                    ProdItemStckgridFilter = $.grep(ProdItemStckgrid, function (element, index) {
                        //return (element.JobOrdNo == currowind[0]['JobOrdNo']);
                        return (element.JobOrdNo == currowind[0]['JobOrdNo'] && element.ItemId == currowind[0]['ItemId'] && element.ColorId == currowind[0]['ColorId'] && element.SizeId == currowind[0]['SizeId']);
                    });
                }
            }
            else {

            }

            LoadProdStockgrid(ProdItemStckgridFilter);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function fnLoadItemStockInfo(JobOrdno, ProcessJobDetId) {

    companyid = $('#ddlinnerComp').val();
    var prgid = '';
    prgid = DetRowID;
    var proid = ProcessId;
    var store = $('select#ddlinnerstore option:selected').val();

    $.ajax({
        type: "POST",
        url: '/CommonProductionIssue/GetCommonProdstckdet/',
        data: JSON.stringify({ CompanyId: companyid, JobOrdNo: JobOrdno, Itemid: ItemId, Colorid: ColorId, Sizeid: SizeId, Programid: prgid, storeid: store }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            ProdItemStckgrid = json;

            var inputcount = 0;
            $('#tbljobordstckinfo tr').each(function () {
                inputcount++;
            });

            if (inputcount > 0) {
                //var tableinput = $('#tblinnergrid').DataTable();
                //tableinput.clear().draw();
                $('#tbljobordstckinfo').DataTable().destroy();
            }

            //for (var i in ProdItemStckgrid) {
            //    for (var j in ProdItemJobOrdNogrid) {
            //        if (ProdItemJobOrdNogrid[j].JobOrdNo == ProdItemStckgrid[i].JobOrdNo) {
            //            ProdItemStckgrid[i].ProdJobDetId = ProdItemJobOrdNogrid[j].ProcessJobDetId;
            //            ProdItemStckgrid[i].ItemId = ProdItemJobOrdNogrid[j].ItemId;
            //            ProdItemStckgrid[i].ColorId = ProdItemJobOrdNogrid[j].ColorId;
            //            ProdItemStckgrid[i].SizeId = ProdItemJobOrdNogrid[j].SizeId;
            //        }
            //    }
            //}

            if (ProdItemJobOrdNogridFilter != undefined && ProdItemJobOrdNogridFilter.length > 0) {
                var currowind = ProdItemJobOrdNogridFilter.slice(0);
                ItemId = currowind[0]['ItemId'];
                ColorId = currowind[0]['ColorId'];
                SizeId = currowind[0]['SizeId'];

                if (ProdItemStckgrid != undefined) {
                    ProdItemStckgridFilter = $.grep(ProdItemStckgrid, function (element, index) {
                        return (element.JobOrdNo == currowind[0]['JobOrdNo'] && element.ItemId == ItemId && element.ColorId == ColorId && element.SizeId == SizeId);
                    });
                }
            }

            LoadProdStockgrid(ProdItemStckgridFilter);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

//function fnLoadItemStockInfo(JobOrdno, ProcessJobDetId) {
//    $.ajax({
//        type: "POST",
//        url: '/CommonProductionIssue/GetCommonProdstckdet/',
//        data: JSON.stringify({ CompanyId: companyid, JobOrdNo: JobOrdno, Itemid: ItemId, Colorid: ColorId, Sizeid: SizeId }),
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (json) {
//            debugger;
//            ProdItemStckgrid = json;

//            for (var i in ProdItemStckgrid) {
//                ProdItemStckgrid[i].ProdJobDetId = ProcessJobDetId;
//                ProdItemStckgrid[i].ItemId = ItemId;
//                ProdItemStckgrid[i].ColorId = ColorId;
//                ProdItemStckgrid[i].SizeId = SizeId;
//            }

//            var inputcount = 0;
//            $('#tbljobordstckinfo tr').each(function () {
//                inputcount++;
//            });

//            if (inputcount > 0) {
//                //var tableinput = $('#tblinnergrid').DataTable();
//                //tableinput.clear().draw();
//                $('#tbljobordstckinfo').DataTable().destroy();
//            }

//            LoadProdStockgrid(ProdItemStckgrid);

//        },
//        failure: function (errMsg) {
//            alert(errMsg);
//        }
//    });
//}

function GenerateProductionIssueNumber(table, column, compId, Docum) {
    table = "Prod_iss_mas";
    column = "ProdIssueNo";

    //Get Login Company Id and pass below
    compId = $('#ddlinnerComp').val(),
    Docum = 'GENERAL PRODUCTION ISSUE';

    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $('#txtissueno').val(result.Value);
        }
    });
}

function LoadCommonProductionIssueInnerGrid(companyunitid, processid, processtype, ordertype) {
    debugger;

    var inputcount = 0;
    $('#tblinnergrid tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        //var tableinput = $('#tblinnergrid').DataTable();
        //tableinput.clear().draw();
        $('#tblinnergrid').DataTable().destroy();
    }

    //}
    var ordertype = $('input[name="AOType"]:checked').attr('value');

 
    var ordNo = "";
    var ONo = $('select#ddlinnerOrderNo option:selected').val();

    if (ONo == 0 || ONo == undefined) {
        ordNo == "";
    }
    else {

        ordNo = $('select#ddlinnerOrderNo option:selected').text();
    }


    var RfNo = "";
    var Rn = $('select#ddlinnerjobNo option:selected').val();

    if (Rn == 0 || Rn == undefined) {
        RfNo == "";
    }
    else {

        RfNo = $('select#ddlinnerjobNo option:selected').text();
    }


    var cmpyid = $('select#ddlinnerComp option:selected').val();
    if (cmpyid == null || cmpyid == "0") {
        cmpyid = 0;
    }

    $.ajax({
        type: "POST",
        url: '/CommonProductionIssue/GetCommonProdIssueInfo/',
        data: JSON.stringify({ CompanyId: cmpyid, CompanyUnitId: companyunitid, ProcessId: processid, Ordertype: ordertype, ProcessType: processtype, RNo: RfNo, OdNo: ordNo }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            ProductionMaingrid = json;

            LoadInnergrid(ProductionMaingrid);
        },
        failure: function (errMsg) {
            alert(errMsg);
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

function CalcQty(value) {
    debugger;

}

function LoadProdItemStckgrid(prodItemstckList) {
    var rowCount = $('#tblitemstckadj tr').length;
    if (rowCount > 0) {
        $('#tblitemstckadj').DataTable().destroy();
    }

    $('#tblitemstckadj').DataTable({
        data: prodItemstckList,
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
            { title: "Sno", data: "Sno" },
            { title: "ProductionId", data: "ProductionId", "visible": false },
                    { title: "ItemId", data: "ItemId", "visible": false },
                    { title: "ColorId", data: "ColorId", "visible": false },
                    { title: "SizeId", data: "SizeId", "visible": false },
                    //{ title: "UomId", data: "UomId", "visible": false },
                    { title: "Item", data: "Item" },
                    { title: "Color", data: "Color" },
                    { title: "Size", data: "Size" },
                    { title: "Program Qty", data: "ProdPrgQty" },
                    { title: "Balance", data: "BalanceQty" },
                    {
                        title: "Issue Qty", data: "IssueQty",
                        render: function (data) {
                            return '<input type="text" id="txtitemissueqty" class="form-control txtitemissueqty" style="width: 50px;text-align: center;" value=' + data + ' >';
                        }
                    },
                    { title: "UOM", data: "UOM" },
                    { title: "Output UOM", data: "OutUOM" },
                    { title: "AppRate", data: "AppRate" },
                    { title: "OrderNo", data: "OrderNo", "visible": false },
                    { title: "RefNo", data: "RefNo", "visible": false },
                    //{ title: "ProdPrgNo", data: "ProdPrgNo" },
                    {
                        title: "Rate", data: "Rate",
                        render: function (data) {
                            return '<input type="text" id="txtitemrate" class="form-control txtitemrate" style="width: 50px;text-align: center;" value=' + data + ' >';
                        }
                    },
                    //{
                    //    title: "ACTION", "mDataProp": null,
                    //    "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="View Stock" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnitemjobord btn btn-info btn-round"><i class="fa fa-eye"></i></button>'
                    //}
        ]
    });

    var table = $('#tblitemstckadj').DataTable();
    $("#tblitemstckadj tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblitemstckadj tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}

function LoadProdItemJobOrdergrid(prodItemjoborderList) {
    var rowCount = $('#tbljobordinfo tr').length;
    if (rowCount > 0) {
        $('#tbljobordinfo').DataTable().destroy();
    }

    $('#tbljobordinfo').DataTable({
        data: prodItemjoborderList,
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
            { title: "Sno", data: "Sno", "visible": false },
            { title: "ProdJobDetId", data: "ProcessJobDetId", "visible": false },
            { title: "ProdIssId", data: "ProcessIssId", "visible": false },
            { title: "ItemId", data: "ItemId", "visible": false },
            { title: "ColorId", data: "ColorId", "visible": false },
            { title: "SizeId", data: "SizeId", "visible": false },
                    { title: "Prod.Prg.No", data: "ProdPrgNo" },
                    { title: "Job Order No", data: "JobOrdNo" },
                    { title: "Order No", data: "OrderNo" },
                    { title: "Ref No", data: "RefNo" },
                    { title: "Balance", data: "BalQty" },
                    { title: "Issues", data: "IssQty" },
                    //{
                    //    title: "Sec Qty", data: "SecQty",
                    //    render: function (data) {
                    //        return '<input type="text"  class="form-control txtjobsecqty" style="width: 50px;text-align: center;" value=' + data + ' >';
                    //    }
                    //},
                    //{
                    //    title: "ACTION", "mDataProp": null,
                    //    "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="View Stock" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnitemstck btn btn-info btn-round"><i class="fa fa-eye"></i></button>'
                    //},
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

function LoadProdStockgrid(prodItemstockList) {
    var rowCount = $('#tbljobordstckinfo tr').length;
    if (rowCount > 0) {
        $('#tbljobordstckinfo').DataTable().destroy();
    }

    $('#tbljobordstckinfo').DataTable({
        data: prodItemstockList,
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
            { title: "StockID", data: "StockId", "visible": false },
            { title: "ProdStockDetId", data: "ProdStockDetId", "visible": false },
            { title: "ItemId", data: "ItemId", "visible": false },
            { title: "ColorId", data: "ColorId", "visible": false },
            { title: "SizeId", data: "SizeId", "visible": false },
            { title: "Job Order No", data: "JobOrdNo", "visible": false },

                    { title: "Document No", data: "DocumentNo" },
                    { title: "Stock", data: "Stock" },
                    //{ title: "Issues", data: "Issues" },
                    {
                        title: "Issues", data: "Issues",
                        render: function (data) {
                            return '<input type="text"  class="form-control txtstockissues" id="txtstockissues" style="width: 50px;text-align: center;" value=' + data + ' >';
                        }
                    },
                    { title: "Process", data: "Process" },
                    { title: "Manufacturer", data: "Manufacturer" },
                     {
                         title: "MarkUprate", data: "MarkupRate",
                         render: function (data) {
                             return '<input type="text"  class="form-control txtMarkupRate" id="txtMarkupRate" style="width: 50px;text-align: center;" value=' + data + ' >';
                         }
                     },
        ]
    });
}

function LoadInnergrid(ProductionList) {
    var rowCount = $('#tblinnergrid tr').length;
    if (rowCount > 0) {
        $('#tblinnergrid').DataTable().destroy();
    }

    $('#tblinnergrid').DataTable({
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
                    { title: "ID", data: "ProdPrgId", "visible": false },
                    { title: "Company Unit", data: "CompanyUnit" },
                    { title: "Job No", data: "JobOrdNo" },
                    { title: "Program No", data: "ProdPrgramNo" },
                    {
                        title: "Prog.Date", data: "ProdProgramDate",
                        render: function (data) {
                            return (moment(data).format("DD/MM/YYYY"));
                        }
                    },
                    { title: "Process", data: "Process" },

                    {
                        title: "Include", data: "ProdPrgId",
                        render: function (data) {

                            return '<input type="checkbox" id="chkinnergrid" class="editor-active"  style="width: 50px;text-align: center;"  value=' + data + ' onclick="myfunc(this.value);">';
                        },
                    },
                    //{
                    //    title: "ACTION", "mDataProp": null,
                    //    "sDefaultContent": '<button type="button"  type="button" data-toggle="tooltip" data-placement="top" title="Add" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnordadd btn btn-round btn-success"> <i class="fa fa-plus"></i> </button>'                             
                    //}
        ]
    });
}
function Validate() {
    var lastprocess = $('#ddllastprocess').val();

    if (lastprocess == 0) {
        //alert("Select Store to proceed...");
        $('#ddllastprocess').css('border-color', 'red');
        return false;
    }
    else {
        return true;
    }
}

function Add() {
    debugger;

    var res = validate();
    if (res == false) {
        return false;
    }
    var OrdType = 0;

    if ($('#optinnerwrkord').is(':checked')) {
        OrdType = "W";
    }
    else if ($('#optinnersamord').is(':checked')) {
        OrdType = "S";
    }
    else {
        OrdType = "J";
    }

    var InterExter = 0;

    if ($('#optinnerpro').is(':checked')) {
        InterExter = "E";
    }
    else if ($('#optinnerworkdiv').is(':checked')) {
        InterExter = "I";
    }

    if (ValiCutBudApp == 'Y' && OrderType=='W') {
        $.each(ProductionItemgrid, function (e) {
            if (ProductionItemgrid[e].IssueQty > 0) {
                if (ProductionItemgrid[e].Rate > 0 && ProductionItemgrid[e].Rate <= ProductionItemgrid[e].AppRate) {

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
        $.each(ProductionItemgrid, function (e) {
            if (ProductionItemgrid[e].IssueQty > 0) {
                if (ProductionItemgrid[e].Rate > 0 && ProductionItemgrid[e].Rate <= ProductionItemgrid[e].AppRate) {

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
    var stkvalidate = 0;
    $.each(ProductionItemgrid, function (e) {
        var iqty = parseFloat(ProductionItemgrid[e].IssueQty);
        var stk = 0;
        $.each(ProdItemStckgrid, function (t) {
            if (ProdItemStckgrid[t].ItemId == ProductionItemgrid[e].ItemId && ProdItemStckgrid[t].ColorId == ProductionItemgrid[e].ColorId && ProdItemStckgrid[t].SizeId == ProductionItemgrid[e].SizeId) {
                stk = stk + parseFloat(ProdItemStckgrid[t].Issues);
            }
        });
        if (stk != iqty) {
            stkvalidate = stkvalidate + 1;
        }

    });
    if (stkvalidate > 0) {
        //alert('Please Check Stock quantity and Item quantity..');
        var msg = 'Please Check Stock quantity and Item quantity...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        return false;
    }
    if (ProdItemStckgrid.length == 0) {
        //alert("No more Stocks...");
        var msg = 'No more Stocks...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
    }
    else {
        debugger;
        table = "Prod_iss_mas";
        column = "ProdIssueNo";
        compId = $('#ddlinnerComp').val(),
        Docum = 'GENERAL PRODUCTION ISSUE';

        var oldIssueNo = $('#txtissueno').val();
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
                    //alert('Issue No has been changed...');
                    var msg = 'Issue Number has been changed...';
                    var flg = 4;
                    var mod = 1;
                    var ur = "";
                    AlartMessage(msg, flg, mod, ur);
                    $('#txtissueno').val(result.Value);
                }
                var ComProdObj = {
                    ProdIssueNo: $('#txtissueno').val(),
                    ProdIssueDate: $('#txtissueDate').val(),
                    ProcessorId: $('#txtProcessorId').val(),
                    CompanyUnitId: $('#ddlinnerCompunit').val(),
                    Remarks: $('#txtremark').val(),
                    GatePassVehicle: $('#txtgatepass').val(),
                    IssueStoreId: $('#ddlinnerstore').val(),

                    CreatedBy: Guserid,
                    LastProcessId: $('#ddllastprocess').val(),
                    ProdIssueDet: ProductionItemgrid,
                    ProdIssueJobOrdDet: ProdItemJobOrdNogrid,
                    ProdIssueStck: ProdItemStckgrid,
                    OrderType: OrdType,
                    InterExter: InterExter,
                    ProcessId: $('#ddlinnerpro').val(),
                    CompanyId: $('#ddlinnerComp').val(),
                };
                $("#btnAdd").attr("disabled", true);
                LoadingSymb();
                $.ajax({
                    url: "/CommonProductionIssue/Add",
                    data: JSON.stringify(ComProdObj),
                    type: "POST",
                    contentType: "application/json;charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        AddUserEntryLog('Production', 'Common Issue', 'ADD', $("#txtissueno").val());
                        //alert("Record saved successfully...");
                        var msg = 'Record saved successfully...';
                        var flg = 1;
                        var mod = 0;
                        var ur = "/CommonProductionIssue/CommonProductionIssueIndex";
                        AlartMessage(msg, flg, mod, ur);

                        //window.location.href = "/CommonProductionIssue/CommonProductionIssueIndex";
                        //$('#ddlcutCompany').val(0);
                        //$('#ddlcutunit').val(0);
                        //$('#ddlinnerCompunit').val(0);
                        //$('#ddlinnerpro').val(0);
                        //$('#ddlinnerprocess').val(0);
                        //$('#myModal1').modal('hide');
                        //$('#myModal').modal('hide');
                        ////$('#tblcuttingmaingrid').DataTable().destroy();
                        ////$('#tblcuttingord1').DataTable().destroy();
                        //ListFilter();
                    },
                    error: function (errormessage) {
                        alert(errormessage.responseText);
                    }
                });
            }
        });
    }
    //}
}

function DeleteEntry() {
    debugger;
    //var ans = confirm("Are you sure you want to delete this Record?");
    //if (ans) {
      
    //    LoadingSymb();
    //    $.ajax({
    //        url: "/CommonProductionIssue/Delete/" + ID,
    //        type: "POST",
    //        contentType: "application/json;charset=UTF-8",
    //        dataType: "json",
    //        success: function (result) {
    //            alert("Record deleted successfully...");
    //            //$('#tblcuttingmaingrid').DataTable().destroy();
    //            //ListFilter();
    //            window.location.href = "/CommonProductionIssue/CommonProductionIssueIndex";
    //        },
    //        error: function (errormessage) {
    //            alert(errormessage.responseText);
    //        }
    //    });
    //}
    var res = validate();
    if (res == false) {
        return false;
    }
    var OrdType = 0;

    if ($('#optinnerwrkord').is(':checked')) {
        OrdType = "W";
    }
    else if ($('#optinnersamord').is(':checked')) {
        OrdType = "S";
    }
    else {
        OrdType = "J";
    }

    //if (Validate()) {
    if (ProdItemStckgrid.length == 0) {
        //alert("No more Stocks...");
        var msg = 'No more Stocks...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
    }
    else {
        var ComProdUpdObj = {
            ProductionId: ProdIssueEditId,
            ProdOrder: $('#txtissueno').val(),
            ProcessorDate: $('#txtissueDate').val(),
            ProcessorId: $('#txtProcessorId').val(),
            CompanyUnitId: $('#ddlinnerCompunit').val(),
            Remarks: $('#txtremark').val(),
            GatePassVehicle: $('#txtgatepass').val(),
            IssueStoreId: $('#ddlinnerstore').val(),
            CreatedBy: Guserid,
            LastProcessId: $('#ddllastprocess').val(),
            ProdIssueDet: ProductionItemgrid,
            ProdIssueJobOrdDet: ProdItemJobOrdNogrid,
            ProdIssueStck: ProdItemStckgrid,
            OrderType: GOrdType,
            ProcessId: $('#ddlinnerpro').val(),
            CompanyId: $('#ddlinnerComp').val(),
            InterExter: GInorExtType,
        };
        LoadingSymb();
        $("#btnUpdate").attr("disabled", true);
        $.ajax({
            url: "/CommonProductionIssue/Delete",
            data: JSON.stringify(ComProdUpdObj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {

                if (result.Value == 1) {
                    AddUserEntryLog('Production', 'Common Issue', 'DELETE', $("#txtissueno").val());
                    //alert('Data Deleted Successfully');
                    //window.location.href = "/CommonProductionIssue/CommonProductionIssueIndex";
                    var msg = 'Data Deleted Successfully...';
                    var flg = 2;
                    var mod = 0;
                    var ur = "/CommonProductionIssue/CommonProductionIssueIndex";
                    AlartMessage(msg, flg, mod, ur);
                }
                if (result.Value == 0) {

                    window.location.href = "/Error/Index";

                }


                //alert("Record Deleted successfully...");
                //$('#myModal1').modal('hide');
                //$('#myModal').modal('hide');
                //$('#tblcuttingmaingrid').DataTable().destroy();
                //$('#tblcuttingord1').DataTable().destroy();
                //companyid = $('#ddlcutCompany').val();
                //ListFilter();
                //CuttingOrdMasid = 0;
                //Mode = 0;
                //window.location.href = "/CommonProductionIssue/CommonProductionIssueIndex";
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }

}

function Update() {
    debugger;

    var res = validate();
    if (res == false) {
        return false;
    }

    if (ValiCutBudApp == 'Y' && OrderType == 'W') {
        $.each(ProductionItemgrid, function (e) {
            if (ProductionItemgrid[e].IssueQty > 0) {
                if (ProductionItemgrid[e].Rate > 0 && ProductionItemgrid[e].Rate <= ProductionItemgrid[e].AppRate) {

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
        $.each(ProductionItemgrid, function (e) {
            if (ProductionItemgrid[e].IssueQty > 0) {
                if (ProductionItemgrid[e].Rate > 0 && ProductionItemgrid[e].Rate <= ProductionItemgrid[e].AppRate) {

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
    var OrdType = 0;

    if ($('#optinnerwrkord').is(':checked')) {
        OrdType = "W";
    }
    else if ($('#optinnersamord').is(':checked')) {
        OrdType = "S";
    }
    else {
        OrdType = "J";
    }
    var stkvalidate = 0;
    $.each(ProductionItemgrid, function (e) {
        var iqty = parseFloat(ProductionItemgrid[e].IssueQty);
        var stk = 0;
        $.each(ProdItemStckgrid, function (t) {
            if (ProdItemStckgrid[t].ItemId == ProductionItemgrid[e].ItemId && ProdItemStckgrid[t].ColorId == ProductionItemgrid[e].ColorId && ProdItemStckgrid[t].SizeId == ProductionItemgrid[e].SizeId) {
                stk = stk + parseFloat(ProdItemStckgrid[t].Issues);
            }
        });
        if (stk != iqty) {
            stkvalidate = stkvalidate + 1;
        }
    });
    if (stkvalidate > 0) {
        //alert('Please Check Stock quantity and Item quantity..');
        var msg = 'Please Check Stock quantity and Item quantity...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        return false;
    }
    //if (Validate()) {
    if (ProdItemStckgrid.length == 0) {
        //alert("No more Stocks...");
        var msg = 'No more Stocks...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
    }
    else {
        var ComProdUpdObj = {
            ProductionId: ProdIssueEditId,
            ProdOrder: $('#txtissueno').val(),
            ProcessorDate: $('#txtissueDate').val(),
            ProcessorId: $('#txtProcessorId').val(),
            CompanyUnitId: $('#ddlinnerCompunit').val(),
            Remarks: $('#txtremark').val(),
            GatePassVehicle: $('#txtgatepass').val(),
            IssueStoreId: $('#ddlinnerstore').val(),
            CreatedBy: Guserid,
            LastProcessId: $('#ddllastprocess').val(),
            ProdIssueDet: ProductionItemgrid,
            ProdIssueJobOrdDet: ProdItemJobOrdNogrid,
            ProdIssueStck: ProdItemStckgrid,
            OrderType: GOrdType,
            ProcessId: $('#ddlinnerpro').val(),
            CompanyId: $('#ddlinnerComp').val(),
            InterExter: GInorExtType,
        };
        LoadingSymb();
        $("#btnUpdate").attr("disabled", true);
        $.ajax({
            url: "/CommonProductionIssue/Update",
            data: JSON.stringify(ComProdUpdObj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                AddUserEntryLog('Production', 'Common Issue', 'UPDATE', $("#txtissueno").val());
                //alert("Record updated successfully...");
                var msg = 'Record updated successfully...';
                var flg = 1;
                var mod = 0;
                var ur = "/CommonProductionIssue/CommonProductionIssueIndex";
                AlartMessage(msg, flg, mod, ur);
                //$('#myModal1').modal('hide');
                //$('#myModal').modal('hide');
                //$('#tblcuttingmaingrid').DataTable().destroy();
                //$('#tblcuttingord1').DataTable().destroy();
                //companyid = $('#ddlcutCompany').val();
                //ListFilter();
                //CuttingOrdMasid = 0;
                //Mode = 0;
                //window.location.href = "/CommonProductionIssue/CommonProductionIssueIndex";
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
    //}
}

function clickonlist() {
    debugger;
    $('#tblCommProdmaingrid').DataTable().destroy();
    companyid = $('#ddlMCompany').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    //$('#ddlprocess').empty();
    //$('#ddlMRefno').empty();
    //$('#ddlMWorkNo').empty();
    //$('#ddlMOrderNo').empty();
    //$('#ddlMIssueNo').empty();

    LoadData(companyid, FDate, TDate);
    //LoadDDL(companyid, FDate, TDate);
}

function ListFilter() {
    debugger;
    $('#tblCommProdmaingrid').DataTable().destroy();
    companyid = $('#ddlMCompany').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    ChkRefno = true;
    ChkOrdno = true;
    DtChk = false;
    ChkBuyer = true;
    ChkProcesse = true;
    ChkJobNo = true;
    ChkIsuNo = true;
    ChkComp = false;
    LoadDDL(companyid, FDate, TDate);
    LoadData(companyid, FDate, TDate);
}

function CMainList() {
    debugger;
    $('#tblCommProdmaingrid').DataTable().destroy();
    companyid = $('#ddlMCompany').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    ChkRefno = true;
    ChkOrdno = true;
    DtChk = false;
    ChkBuyer = true;
    ChkProcesse = true;
    ChkJobNo = true;
    ChkIsuNo = true;
    ChkComp = true;
    LoadDDL(companyid, FDate, TDate);
    LoadData(companyid, FDate, TDate);
}
function OMainList() {
    debugger;
    $('#tblCommProdmaingrid').DataTable().destroy();
    companyid = $('#ddlMCompany').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    ChkRefno = false;
    ChkOrdno = false;
    DtChk = false;
    ChkBuyer = true;
    ChkProcesse = true;
    ChkJobNo = true;
    ChkIsuNo = true;
    ChkComp = false;
    LoadDDL(companyid, FDate, TDate);
    LoadData(companyid, FDate, TDate);
}
function PMainList() {
    debugger;
    $('#tblCommProdmaingrid').DataTable().destroy();
    companyid = $('#ddlMCompany').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    ChkRefno = true;
    ChkOrdno = true;
    DtChk = false;
    ChkBuyer = true;
    ChkProcesse = false;
    ChkJobNo = true;
    ChkIsuNo = true;
    ChkComp = false;
    LoadDDL(companyid, FDate, TDate);
    LoadData(companyid, FDate, TDate);
}
function IMainList() {
    debugger;
    $('#tblCommProdmaingrid').DataTable().destroy();
    companyid = $('#ddlMCompany').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    ChkRefno = false;
    ChkOrdno = false;
    DtChk = false;
    ChkBuyer = false;
    ChkProcesse = false;
    ChkJobNo = false;
    ChkIsuNo = false;
    ChkComp = false;
    LoadDDL(companyid, FDate, TDate);
    LoadData(companyid, FDate, TDate);
}
function JMainList() {
    debugger;
    $('#tblCommProdmaingrid').DataTable().destroy();
    companyid = $('#ddlMCompany').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    ChkRefno = false;
    ChkOrdno = false;
    DtChk = false;
    ChkBuyer = true;
    ChkProcesse = true;
    ChkJobNo = false;
    ChkIsuNo = true;
    ChkComp = false;
    LoadDDL(companyid, FDate, TDate);
    LoadData(companyid, FDate, TDate);
}
function BMainList() {
    debugger;
    $('#tblCommProdmaingrid').DataTable().destroy();
    companyid = $('#ddlMCompany').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    ChkRefno = true;
    ChkOrdno = true;
    DtChk = false;
    ChkBuyer = false;
    ChkProcesse = true;
    ChkJobNo = true;
    ChkIsuNo = true;
    ChkComp = false;
    LoadDDL(companyid, FDate, TDate);
    LoadData(companyid, FDate, TDate);
}


function LoadData(companyid, fromdate, todate) {
    debugger;

    //$('#tblcuttingmaingrid').DataTable().destroy();
    var processid = $('#ddlprocess').val();
    if (processid == null) {
        processid = 0;
    }
    var CompUnitId = $('#ddlMunit').val();
    if (CompUnitId == null) {
        CompUnitId = 0;
    }
    var ProdIssueId = $('#ddlMIssueNo').val();
    if (ProdIssueId == null) {
        ProdIssueId = 0;
    }

    var refno = $('#ddlMRefno').val();
    if (refno == "0") {
        refno = '';
    }

    var jobordno = $('#ddlMWorkNo').val();
    if (jobordno == "0") {
        jobordno = '';
    }

    var ordno = $('#ddlMOrderNo').val();
    if (ordno == "0") {
        ordno = '';
    }

    var OrdType = $('#ddlMType').val();
    var ordertype = (OrdType == 'W' ? "WORK" : OrdType == 'J' ? "JOB" : OrdType == 'S' ? "SAMPLE" : "");
    var Prctype = $('input[name="Revert"]:checked').attr('value');
    if (ChkComp) {
        processid = 0;
        CompUnitId = 0;
        ProdIssueId = 0;
        refno = '';
        jobordno = '';
        ordno = '';
    }

    var menufilter = companyid + ',' + fromdate + ',' + todate + ',' + ordertype + ',' + processid + ',' + CompUnitId + ',' + ProdIssueId + ',' + refno + ',' + jobordno + ',' + ordno + ',' + Prctype;
    localStorage.setItem('CommonProductionIssueMainFilter', menufilter);


    $.ajax({
        type: "POST",
        url: '/CommonProductionIssue/GetMaindt/',
        //data: JSON.stringify({ CompanyId: companyid, CompanyUnitId: companyunitid }),
        data: JSON.stringify({ CompanyId: companyid, Fromdate: fromdate, Todate: todate, OrderType: ordertype, ProcessId: processid, UnitId: CompUnitId, IssId: ProdIssueId, Refno: refno, JobOrdNo: jobordno, OrdNo: ordno, ProcessorType: Prctype }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            //$('#tblcuttingord1').DataTable().destroy();

            maintbllist = json;

            //var dataSet = eval("[" + tableload + "]");
            $('#tblCommProdmaingrid').DataTable({
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
                    { title: "ID", data: "ProdIssueId", "visible": false },
            { title: "Issue No", data: "ProdIssueNo" },
            {
                title: "Issue Date", data: "ProdIssueDate",
                render: function (data) {
                    return (moment(data).format("DD/MM/YYYY"));
                }
            },
            { title: "Unit", data: "CompanyUnit" },
            { title: "Process", data: "Process" },
            { title: "Processor", data: "Supplier" },
            { title: "Type", data: "OrderType" },
            {
                title: "ACTION", "mDataProp": null,
                "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" ' + CommProdEditFlg + ' class="btnmaingrdedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button><button type="button" type="button" data-toggle="tooltip" data-placement="top" title="Delete" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" ' + CommProdDeleteFlg + ' class="btnmaingrddelete btn btn-danger btn-round" onClick=""> <i class="fa fa-times"></i> </button> <button type="button" ' + CommProdPrintFlg + '  class="ProdIssPrint btn btn_round btn-success"  data-toggle="tooltip" data-placement="top" title="print" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;" >  <i class="fa fa-print"></i> </button>'
            }
                ]
            });

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}

function LoadDataFromBack(companyid, fromdate, todate) {
    debugger;

    var fill = localStorage.getItem('CommonProductionIssueMainFilter');
    var fillobj = [];
    fillobj = fill.split(",");

    $('#txtFromDate').val(fillobj[1]);
    $('#txtToDate').val(fillobj[2]);

    if (fillobj[10] == 'I') {
        $('#Pending').prop('checked', true);
    } else {
        $('#Closed').prop('checked', true);
    }


    if (fillobj[7] == "undefined") {
        fillobj[7] = '';
    }
    if (fillobj[8] == "undefined") {
        fillobj[8] = '';
    }
    if (fillobj[9] == "undefined") {
        fillobj[9] = '';
    }
    if (fillobj[4] == "undefined") {
        fillobj[4] = 0;
    }
    if (fillobj[5] == "undefined") {
        fillobj[5] = 0;
    }
    if (fillobj[6] == "undefined") {
        fillobj[6] = 0;
    }


    $.ajax({
        type: "POST",
        url: '/CommonProductionIssue/GetMaindt/',
        //data: JSON.stringify({ CompanyId: companyid, CompanyUnitId: companyunitid }),
        data: JSON.stringify({ CompanyId: fillobj[0], Fromdate: fillobj[1], Todate: fillobj[2], OrderType: fillobj[3], ProcessId: fillobj[4], UnitId: fillobj[5], IssId: fillobj[6], Refno: fillobj[7], JobOrdNo: fillobj[8], OrdNo: fillobj[9], ProcessorType: fillobj[10] }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            //$('#tblcuttingord1').DataTable().destroy();

            maintbllist = json;

            //var dataSet = eval("[" + tableload + "]");
            $('#tblCommProdmaingrid').DataTable({
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
                    { title: "ID", data: "ProdIssueId", "visible": false },
            { title: "Issue No", data: "ProdIssueNo" },
            {
                title: "Issue Date", data: "ProdIssueDate",
                render: function (data) {
                    return (moment(data).format("DD/MM/YYYY"));
                }
            },
            { title: "Unit", data: "CompanyUnit" },
            { title: "Process", data: "Process" },
            { title: "Processor", data: "Supplier" },
            { title: "Type", data: "OrderType" },
            {
                title: "ACTION", "mDataProp": null,
                "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" ' + CommProdEditFlg + ' class="btnmaingrdedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button><button type="button" type="button" data-toggle="tooltip" data-placement="top" title="Delete" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" ' + CommProdDeleteFlg + ' class="btnmaingrddelete btn btn-danger btn-round" onClick=""> <i class="fa fa-times"></i> </button> <button type="button" ' + CommProdPrintFlg + '  class="ProdIssPrint btn btn_round btn-success"  data-toggle="tooltip" data-placement="top" title="print" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;" >  <i class="fa fa-print"></i> </button>'
            }
                ]
            });

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}

function LoadDDL(companyid, fromdate, todate) {
    debugger;

    //$('#tblcuttingmaingrid').DataTable().destroy();
    var processid = $('#ddlprocess').val();
    if (processid == null) {
        processid = 0;
    }
    var CompUnitId = $('#ddlMunit').val();
    if (CompUnitId == null) {
        CompUnitId = 0;
    }
    var ProdIssueId = $('#ddlMIssueNo').val();
    if (ProdIssueId == null) {
        ProdIssueId = 0;
    }

    var refno = $('#ddlMRefno').val();
    if (refno == "0") {
        refno = '';
    }

    var jobordno = $('#ddlMWorkNo').val();
    if (jobordno == "0") {
        jobordno = '';
    }

    var ordno = $('#ddlMOrderNo').val();
    if (ordno == "0") {
        ordno = '';
    }

    var OrdType = $('#ddlMType').val();
    var ordertype = (OrdType == 'W' ? "WORK" : OrdType == 'J' ? "JOB" : OrdType == 'S' ? "SAMPLE" : "");
    if (ChkComp || DtChk) {
        processid = 0;
        CompUnitId = 0;
        ProdIssueId = 0;
        refno = '';
        jobordno = '';
        ordno = '';
    }

    $.ajax({
        type: "POST",
        url: '/CommonProductionIssue/GetMaindt/',
        //data: JSON.stringify({ CompanyId: companyid, CompanyUnitId: companyunitid }),
        data: JSON.stringify({ CompanyId: companyid, Fromdate: fromdate, Todate: todate, OrderType: ordertype, ProcessId: processid, UnitId: CompUnitId, IssId: ProdIssueId, Refno: refno, JobOrdNo: jobordno,OrdNo:ordno }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            //$('#tblcuttingord1').DataTable().destroy();

            maintbllist = json;


            var Processdet = {};
            var Proc = [];
            var workdet = {};
            var work = [];
            var Refdet = {};
            var Ref = [];
            var Orddet = {};
            var Ord = [];
            var Isudet = {};
            var Isu = [];
            var Buydet = {};
            var Buy = [];

            $.each(maintbllist, function (i, el) {

                if (!Processdet[el.ProcessId]) {
                    Processdet[el.ProcessId] = true;
                    Proc.push(el);
                }

                if (!workdet[el.JobOrdNo]) {
                    workdet[el.JobOrdNo] = true;
                    work.push(el);
                }

                if (!Refdet[el.RefNo]) {
                    Refdet[el.RefNo] = true;
                    Ref.push(el);
                }

                if (!Orddet[el.OrdNo]) {
                    Orddet[el.OrdNo] = true;
                    Ord.push(el);
                }

                if (!Isudet[el.ProdIssueId]) {
                    Isudet[el.ProdIssueId] = true;
                    Isu.push(el);
                }
                if (!Buydet[el.BuyerId]) {
                    Buydet[el.BuyerId] = true;
                    Buy.push(el);
                }
            });

            if (ChkProcesse || ChkComp || DtChk) {
                $('#ddlprocess').empty();
                $(ddlprocess).append($('<option/>').val('0').text('--Select Process--'));
                $.each(Proc, function () {
                    $(ddlprocess).append($('<option></option>').val(this.ProcessId).text(this.Process));
                });
            }
            if (ChkJobNo || ChkComp || DtChk) {
                $('#ddlMWorkNo').empty();
                $(ddlMWorkNo).append($('<option/>').val('0').text('--Select Work No--'));
                $.each(work, function () {
                    $(ddlMWorkNo).append($('<option></option>').text(this.JobOrdNo));
                });
            }
            if (ChkRefno || ChkComp || DtChk) {
                $('#ddlMRefno').empty();
                $(ddlMRefno).append($('<option/>').val('0').text('--Select Ref No--'));
                $.each(Ref, function () {
                    $(ddlMRefno).append($('<option></option>').text(this.RefNo));
                });
            }
            if (ChkOrdno || ChkComp || DtChk) {
                $('#ddlMOrderNo').empty();
                $(ddlMOrderNo).append($('<option/>').val('0').text('--Select Order No--'));
                $.each(Ord, function () {
                    $(ddlMOrderNo).append($('<option></option>').text(this.OrdNo));
                });
            }
            if (ChkIsuNo || ChkComp || DtChk) {
                $('#ddlMIssueNo').empty();
                $(ddlMIssueNo).append($('<option/>').val('0').text('--Select Issue No--'));
                $.each(Isu, function () {
                    $(ddlMIssueNo).append($('<option></option>').val(this.ProdIssueId).text(this.ProdIssueNo));
                });
            }
            if (ChkBuyer || ChkComp || DtChk) {
                $('#ddlMBuyer').empty();
                $(ddlMBuyer).append($('<option/>').val('0').text('--Select Buyer--'));
                $.each(Buy, function () {
                    $(ddlMBuyer).append($('<option></option>').val(this.BuyerId).text(this.Buyer));
                });
            }
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

//Valdidation using jquery
function validate() {
    var isValid = true;

    //if ($('#txtQty').val().trim() == "") {
    //    $('#txtQty').css('border-color', 'Red');
    //    isValid = false;
    //}
    //else {
    //    $('#txtQty').css('border-color', 'lightgrey');
    //}


    if ($('#ddlinnerProcessor').val() == 0) {
        $('#ddlinnerProcessor').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlinnerProcessor').css('border-color', 'lightgrey');
    }


    return isValid;
}


$(document).on('click', '.ProdIssPrint', function () {
    debugger;
    //rowindex = $(this).closest('tr').index();
    //var currow = maintbllist.slice(rowindex);
    //var ProdIssId = currow[0]['ProdIssueId'];
    var table = $('#tblCommProdmaingrid').DataTable();
    ProdIssId = table.row($(this).parents('tr')).data()["ProdIssueId"];

    Repid = ProdIssId;
    LoadMainOrderDetails(ProdIssId);
    $('#myModal2').modal('show');

    docname = "PRODUCTION ISSUE - EXTERNAL";
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
    window.open("../ReportInline/Production/CommProdIssueReportInline/CommProdIssueReportInline.aspx?ProdIssueId=" + Repid + "&Gatepass=" + p[0] + "&Ins=" + p[1] + "&Bundle=" + p[2] + "&Lotno=" + p[3] + "&Ordrefno=" + p[4] + "&Rate=" + p[5] + "&Companyid=" + compid + "&OrdNo=" + rptordno + "&RefNo=" + rptrefno + "&Style=" + rptsty);


}

function backtomain() {

    window.location.href = "/CommonProductionIssue/CommonProductionIssueIndex";
}


function Delete(ProdIssueId) {
    $.ajax({
    url: "/CommonProductionIssue/GetCommonHeaderInfo/" + ProdIssueId,
    typr: "GET",
    contentType: "application/json;charset=UTF-8",
    dataType: "json",
    success: function (result) {
        debugger;
        var obj = [];
        obj = result;

        $("#txtissueno").val(obj[0].ProdIssueNo);
        $('#txtissueDate').val(moment(obj[0].ProdIssueDate).format('DD/MM/YYYY'));
        $("#txtremark").val(obj[0].Remarks);
        $("#ddllastprocess").val(obj[0].LastProcessId);
        $("#ddlpro").val(obj[0].ProcessId);
        $("#txtProcessor").val(obj[0].Processor);
        $("#ddlCompunit").val(obj[0].CompanyUnitId);
        $("#txtgatepass").val(obj[0].GatePassVehicle);
        $("#txtProcessorId").val(obj[0].ProcessorId);

        GOrdType = obj[0]["OrderType"];
        GInorExtType = obj[0]["InterExter"];
        CheckAlloted();

        $.ajax({
            type: "POST",
            url: '/CommonProductionIssue/GetCommProdIssueitemdetforEdit/',
            data: JSON.stringify({ ProdIssueId: ProdIssueId }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (json) {
                debugger;
                $('#myModal1').modal('show');
                $('#btnDelete').show();
                $('#btnUpdate').hide();
                $('#btnAdd').hide();

                ProductionItemgrid = json;
                LoadProdItemStckgrid(ProductionItemgrid);

                //Load JobOrder Grid based on first Item
                if (ProductionItemgrid != undefined && ProductionItemgrid.length > 0) {
                    var currowind = ProductionItemgrid.slice(0);
                    //var ProdDetId = currowind[0]['ProductionDetId'];
                    ItemId = currowind[0]['ItemId'];
                    ColorId = currowind[0]['ColorId'];
                    SizeId = currowind[0]['SizeId'];

                    fnLoadJobOrderInfoforEdit(ProdIssueId);
                    //fnLoadItemStockInfoforEdit(ProdIssueId);
                }
                else {
                    fnLoadJobOrderInfoforEdit(0);
                    fnLoadItemStockInfoforEdit(0);
                }
                //End
            },
            failure: function (errMsg) {
                alert(errMsg);
            }
        });

        //fnLoadInOutGridOnEditMode(CuttingOrderId, prodprgid);
    },
    error: function (errormessage) {
        alert(errormessage.responseText);
    }
});
return false;
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

            pallown = AllowList[0].PQuantity;
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}

function LoadMainOrderDetails(Pid) {

    debugger;

    $.ajax({
        url: "/ProcessOrder/LoadOrderMaindetailsforProd",
        data: JSON.stringify({ prodid: Pid,type:'G' }),
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
            //$('#txtmainOrdno').val(ord);
            //$('#txtmainrefno').val(ref);
            //$('#txtmainstyle').val(sty);

            rptordno = ord;
            rptrefno = ref;
            rptsty = sty;
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}


function CheckAlloted() {

    var Recpno = $('#txtissueno').val();

    $.ajax({
        url: "/ProcessOrder/LoadProcessCheckItemEditDetails",
        data: JSON.stringify({ RecNo: Recpno }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            AllotedItemList = result;
            if (AllotedItemList.length > 0) {


                for (var x = 0; x < AllotedItemList.length; x++) {

                    //alert("Process Issue is alloted for " + AllotedItemList[x].CTransNo + ",Please Check it....")
                    var msg = "Process Issue is alloted for " + AllotedItemList[x].CTransNo + ",Please Check it...";
                    var flg = 4;
                    var mod = 1;
                    var ur = "";
                    AlartMessage(msg, flg, mod, ur);
                    $("#btnUpdate").attr('disabled', true);
                    $("#btnDelete").attr('disabled', true);
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

function LoadSupplierSetup() {
    debugger;
    var setup = $("#hdnSupplierSetup").data('value');

    if (setup == 'True') {
        var procid = $('select#ddlinnerpro option:selected').val();;
        var typ = 'S';
        $.ajax({
            url: "/Supplier/GetSupplierSetup",
            data: JSON.stringify({ Processid: procid, Type: typ }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                debugger;
                var obj = result;
                if (obj.length > 0) {
                    var data = obj;
                    $(ddlinnerprocess).empty();
                    $(ddlinnerprocess).append($('<option/>').val('0').text('--Select Supplier--'));
                    $.each(data, function () {
                        $(ddlinnerprocess).append($('<option></option>').val(this.SupplierId).text(this.SupplierName));
                    });


                }
            }
        });
    } else {
        LoadSupplierDDL("#ddlinnerprocess");
    }

}