var MOrd = 0;
var entrygriddet = [];
var JOrdID = 0;
var OpItmList = [];
var OpJobDetList = [];
var OpSaveJobDetList = [];
var IpItmList = [];
var IpJobDetList = [];
var IpSaveJobDetList = [];
var IpStkDetList = [];
var IpSaveStkDetList = [];
var AccList = [];
var indexop = -1;
var indopjob = -1;
var indiptitm = -1;
var inditjbdet = -1;
var indipstkdet = -1;
var Itmid = 0;
var Colorid = 0;
var Sizeid = 0;
var opItmid = 0;
var OpClrid = 0;
var OpSizeid = 0;
var OpPSizeid = 0;
var CompanyId = 0;
var Companyunitid = 0;
var Processorid = 0;
var Processid = 0;
var Masid = 0;
var ProductionOrderno = "";
var MainFDate = 0;
var Userid = 0;
var UserName = 0;
var repobj = [];
var Repid = 0;
var Guserid = 0;
var ChkBudProApp = 0;
var AllowList = [];
var AllotedItemList = [];
var subpro = 0;
var superuser = 0;
var processname = "";
var processsetup = '';
var stkrow = [];
var totalstkrow = 0;
var pallown = 0;
var balallow = 0;
var opbalallow = 0;
var opitmbalallow = 0;
var Mloadlist = [];
var rptordno = '';
var rptrefno = '';
var rptsty = '';
var rptbuyer = '';
var IpItmDetList = [];
var ipjobclone = [];
var ipstkclone = [];
var ipitemclone = [];
var opjobdetrowindex = -1;
var DCompid = 0;
var ChkRefno = true;
var ChkOrdno = true;
var DtChk = false;
var ChkSupplier = true;
var ChkStyle = true;
var ChkPONo = true;
var ChkComp = false;
var ChkCUnit = true;
var ChkProcess = true;
var OpenPrgApp = 0;
var LoginUserid = '';
var editmasunitstore = 0;
var ProductionPgmNo = '';
var ValidateProcessStore = "False";
var CostAppSamProCheck = "N";
var OrderType='';
var ValidateProcessInandOutQty = false;
var Processortyp = 'P';
var ViewMode = 0;
var Fromback = 0;
var UserGroup = '';
$(document).ready(function () {
    debugger;
    superuser = $("#hdnusername").data('value');
    Guserid = $("#hdnUserid").data('value');
    DCompid = $("#hdnDCompid").data('value');
    UserName = $("#hdnusername").data('value');
	LoginUserid = $("#hdnLoginUserid").data('value');
	OpenPrgApp = $("#hdnValidateAppForOpenPrg").data('value');
	ValidateProcessStore = $("#hdnValidateProcessStore").data('value');
    LoadCompanyDDL("#ddlMCompany,#ddlCompany");
    // LoadCompanyUnitDDL("#ddlMUnit");
    //LoadBuyerDDL("#ddlBuyer");
    LoadProcessDDL("#ddlProcess");
    LoadStyleDDL("#ddlStyle");
    LoadCompanyUnitDDL("#ddlUnit");
    //LoadOrderNoDDL("#ddlOrderNo");
    //LoadRefNoDDL("#ddlRefNo");
    LoadWorkdivisionDDL("#ddlwrkdiv");
    LoadSupplierSetup();
   // LoadSupplierDDL("#ddlSupplier");
    LoadAddlessDDL("#ddlAcc");
    MainFDate = $("#hdMainFromDate").data('value');
    ChkBudProApp = $("#hdnCostBudProcessAppid").data('value');
    CostAppSamProCheck = $("#hdnCostAppSamProCheck").data('value');
    getDate();
    loadsize();
    Floadsize();
    loadUserGroup();

    var fill = localStorage.getItem('ProcessOrderMainFilter');
    if (fill != "null" && fill != null) {
        LoadMaingridFromBack();
    } else {
        LoadMaingrid();
        CMainlist();
    }

    $('#lblAppChkId').hide();
    $('#Appgridtab').hide();
    $('#ChkAppButId').hide();
    $('#btnRev').hide();

    $("#ddlCompany").change(function () {
        LoadStorefromcompany();

    });


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

    $("#entrygridtab").dataTable().find("tbody").on('click', 'td', function () {
        debugger;
        $('input[id=groupbom]').each(function () {
            var row = $(this).closest('tr');
            if ($(this).is(':checked')) {
                var val = $(this).val();
                for (var d = 0; d < entrygriddet.length; d++) {
                    if (entrygriddet[d].jmasid == val) {
                        entrygriddet[d].CheckLoad = "Y";
                    }
                }

            }
            else {
                var val = $(this).val();
                for (var d = 0; d < entrygriddet.length; d++) {
                    if (entrygriddet[d].jmasid == val) {
                        entrygriddet[d].CheckLoad = "N";
                    }

                }
            }

        });

    });




    var proctype = $('input[name="proctype"]:checked').attr('value');


    if (proctype == 'P') {

        $('#Msupp').show();
        $("#Mwrkdiv").hide();
    }
    else if (proctype == 'W') {
        $('#Msupp').hide();
        $("#Mwrkdiv").show();
    }
    LoadLocation();
    LoadIssLocation();


    //ListOrRefNo();
    //ListPStyle();
  //  ddlmain();
   // CMainlist();


    //$("#tblmaindetails").dataTable().find("tbody").on('click', 'td', function () {
    //    debugger;
    //    $('input[id=groupclo]').each(function () {
    //        var row = $(this).closest('tr');
    //        if ($(this).is(':checked')) {
    //            var val = $(this).val();
    //            for (var d = 0; d < Mloadlist.length; d++) {
    //                if (Mloadlist[d].productionordid == val) {
    //                    Mloadlist[d].CheckClos = "Y";
    //                }
    //            }

    //        }
    //        else {
    //            var val = $(this).val();
    //            for (var d = 0; d < Mloadlist.length; d++) {
    //                if (Mloadlist[d].productionordid == val) {
    //                    Mloadlist[d].CheckClos = "N";
    //                }

    //            }
    //        }

    //    });

    //});


    //LoadMaingrid();
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
            // $('#txtNetAmt').val(totalAccamnt.toFixed(3));

            //var GAmt = $('#txtGrossAmt').val();
            //// var NAmt = $('#txtNetAmt').val();
            //var FNAmt = parseFloat(GAmt) + parseFloat(totalAccamnt);

            //$('#txtNetAmt').val(FNAmt);
            ////$('#txtBTotAmt').val(FNAmt);
          //  LoadGrossNetAmt();

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

        if (Mode == 0) {
            fnClearAccControls();
        }
        else {
            fnClearAccControls();

        }
        Mode = 0;
    });

    $(document).on('click', '.btnaccremove', function () {
        rowindex = $(this).closest('tr').index();
        AccList.splice(rowindex, 1);
        document.getElementById("tblPaydetails").deleteRow(rowindex + 1);

        LoadGrossNetAmt();
    });
    //

    $(document).on('keyup', '.calcrate', function () {
        debugger;
        var table = $('#outputitmtab').DataTable();
        var CSno = table.row($(this).parents('tr')).data()["sno"];
        var apprate = table.row($(this).parents('tr')).data()["apprate"];
        var val = $(this).val();

        var ordtype = $('input[name="type"]:checked').attr('value');

        if (ChkBudProApp == 'Y' && OrderType=="B") {
            if (parseFloat(val) <= parseFloat(apprate)) {
                $.each(OpItmList, function () {
                    if (this.sno == CSno) {
                        this.rate = val;

                    }
                });
                OutputitmTab(OpItmList);
            } else {
                //alert('Should not exceed BudgetRate...');
                var msg = 'Should not exceed BudgetRate...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);

                $.each(OpItmList, function () {
                    if (this.sno == CSno) {
                        this.rate = apprate;

                    }
                });

                OutputitmTab(OpItmList);
                return;
            }
        }
        else if (CostAppSamProCheck == 'Y' && OrderType == "S") {
            if (parseFloat(val) <= parseFloat(apprate)) {
                $.each(OpItmList, function () {
                    if (this.sno == CSno) {
                        this.rate = val;

                    }
                });
                OutputitmTab(OpItmList);
            } else {
                //alert('Should not exceed BudgetRate...');
                var msg = 'Should not exceed BudgetRate...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);


                $.each(OpItmList, function () {
                    if (this.sno == CSno) {
                        this.rate = apprate;

                    }
                });

                OutputitmTab(OpItmList);
                return;
            }

        }
        else {
            $.each(OpItmList, function () {
                if (this.sno == CSno) {
                    this.rate = val;
                }
            });

            OutputitmTab(OpItmList);
        }
        //Datatable textbox focus
        var rows = $("#outputitmtab").dataTable().fnGetNodes();
        var dtTable = $('#outputitmtab').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
            $('input[id=txtOpRQty]').each(function () {
                if (sn == CSno && $(this).val() == val) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtOpRQty').val();
                    row.find('#txtOpRQty').focus().val('').val(num);
                    return true;
                }
            });
        }
    });

    $(document).on('keyup', '.calcjobrate', function () {
        debugger;
        var table = $('#outputjodettab').DataTable();
        var CSno = table.row($(this).parents('tr')).data()["sno"];
        var apprate = table.row($(this).parents('tr')).data()["apprate"];

        var Itemid = table.row($(this).parents('tr')).data()["itmid"];
        var Clrid = table.row($(this).parents('tr')).data()["clrid"];
        var szid = table.row($(this).parents('tr')).data()["sizeid"];
        var pszid = table.row($(this).parents('tr')).data()["plansizeid"];

        var val = $(this).val();
       


        //var val = $(this).val();

        //var table = $('#outputjodettab').DataTable();
        //var row = $(this).closest('tr');
        //var data = $('#outputjodettab').dataTable().fnGetData(row);
        //var Itemid = data.itmid;
        //var Clrid = data.clrid;
        //var szid = data.sizeid;
        //var pszid = data.plansizeid;

        //var fs = '';
        //for (var x = 0; x < SizeL.length; x++) {
        //    if (SizeL[x].SizeId == val) {
        //        fs = SizeL[x].Size;
        //        oldind = x;
        //    }
        //}
        //$.each(OpItmList, function () {
        //    if (this.itmid == Itemid && this.clrid == Clrid && this.sizeid == szid && this.plansizeid == pszid) {
        //        this.rate = val;
               
        //    }
        //});
        //OutputitmTab(OpItmList);

        //$.each(OpSaveJobDetList, function () {
        //    if (this.itmid == Itemid && this.clrid == Clrid && this.plansizeid == pszid) {
        //        this.rate = val;
        //    }
        //});
        //OpJobDetList = $.grep(OpSaveJobDetList, function (v) {
        //    return (v.itmid === Itemid && v.clrid === Clrid && v.plansizeid === pszid);
        //});

        //OutputJobdetTab(OpJobDetList);




        if (ChkBudProApp == 'Y' && OrderType =="W") {
            if (parseFloat(val) <= parseFloat(apprate)) {
                $.each(OpJobDetList, function () {
                    if (this.sno == CSno) {
                        this.rate = val;
                        val = val;
                    }
                });
               // OutputJobdetTab(OpJobDetList);
            } else {
                //alert('Should not exceed BudgetRate...');
                var msg = 'Should not exceed BudgetRate...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);


                $.each(OpJobDetList, function () {
                    if (this.sno == CSno) {
                        this.rate = apprate;
                        val = apprate;
                    }
                });

               // OutputJobdetTab(OpJobDetList);
              
            }

            var otable = $('#outputjodettab').DataTable();
            var odata = otable.rows().data();

            $('input[id=txtJOpRQty]').each(function (ig) {
                if (odata[ig].itmid == Itemid && odata[ig].clrid == Clrid && odata[ig].plansizeid == pszid && odata[ig].sno == CSno) {
                    var row = $(this).closest('tr');
                    // row.find('#txtOpOrdQty').val(totalamnt);
                    row.find('#txtJOpRQty').focus().val('').val(val);
                }
            });


            LoadGrossNetAmt();
          //  return;

        }
        else if (CostAppSamProCheck == 'Y' && OrderType == "S") {
        
            if (parseFloat(val) <= parseFloat(apprate)) {
                $.each(OpJobDetList, function () {
                    if (this.sno == CSno) {
                        this.rate = val;
                        val = val;
                    }
                });




               // OutputJobdetTab(OpJobDetList);
            } else {
                //alert('Should not exceed BudgetRate...');
                var msg = 'Should not exceed BudgetRate...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);


                $.each(OpJobDetList, function () {
                    if (this.sno == CSno) {
                        this.rate = apprate;
                        val = apprate;
                    }
                });

                //OutputJobdetTab(OpJobDetList);
                //return;
            }

            var otable = $('#outputjodettab').DataTable();
            var odata = otable.rows().data();

            $('input[id=txtJOpRQty]').each(function (ig) {
                if (odata[ig].itmid == Itemid && odata[ig].clrid == Clrid && odata[ig].plansizeid == pszid && odata[ig].sno == CSno) {
                    var row = $(this).closest('tr');
                    // row.find('#txtOpOrdQty').val(totalamnt);
                    row.find('#txtJOpRQty').focus().val('').val(val);
                }
            });


            LoadGrossNetAmt();
           // return;

        }

        else {
            $.each(OpJobDetList, function () {
                if (this.sno == CSno) {
                    this.rate = val;
                }
            });

            // OutputJobdetTab(OpJobDetList);

            var otable = $('#outputjodettab').DataTable();
            var odata = otable.rows().data();

            $('input[id=txtJOpRQty]').each(function (ig) {
                if (odata[ig].itmid == Itemid && odata[ig].clrid == Clrid && odata[ig].plansizeid == pszid && odata[ig].sno == CSno) {
                    var row = $(this).closest('tr');
                    // row.find('#txtOpOrdQty').val(totalamnt);
                    row.find('#txtJOpRQty').focus().val('').val(val);
                }
            });


            LoadGrossNetAmt();
            //return;
        }


        $.each(OpItmList, function () {
            if (this.itmid == Itemid && this.clrid == Clrid && this.sizeid == szid && this.plansizeid == pszid) {
                this.rate = val;

            }
        });
       // OutputitmTab(OpItmList);



        ////Datatable textbox focus
        //var rows = $("#outputjodettab").dataTable().fnGetNodes();
        //var dtTable = $('#outputjodettab').DataTable();
        //for (var i = 0; i < rows.length; i++) {
        //    var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
        //    $('input[id=txtJOpRQty]').each(function () {
        //        if (sn == CSno && $(this).val() == val) {
        //            var row = $(this).closest('tr');
        //            var num = row.find('#txtJOpRQty').val();
        //            row.find('#txtJOpRQty').focus().val('').val(num);
        //            return true;
        //        }
        //    });
        //}
    });


    $(document).on('keyup', '.calclooplen', function () {
        debugger;
        var table = $('#outputitmtab').DataTable();

        var CSno = table.row($(this).parents('tr')).data()["sno"];
        var IId = table.row($(this).parents('tr')).data()["itmid"];
        var CId = table.row($(this).parents('tr')).data()["clrid"];
        var SId = table.row($(this).parents('tr')).data()["sizeid"];
        var Balance = table.row($(this).parents('tr')).data()["bal"];


        var Val = $(this).val();
        $.each(OpItmList, function () {
            if (this.sno == CSno) {
                this.Loop_Len = Val;
            }
        });
        // OutputitmTab(OpItmList);


    });

    $(document).on('keyup', '.calcguage', function () {
        debugger;
        var table = $('#outputitmtab').DataTable();

        var CSno = table.row($(this).parents('tr')).data()["sno"];
        var IId = table.row($(this).parents('tr')).data()["itmid"];
        var CId = table.row($(this).parents('tr')).data()["clrid"];
        var SId = table.row($(this).parents('tr')).data()["sizeid"];
        var Balance = table.row($(this).parents('tr')).data()["bal"];


        var Val = $(this).val();
        $.each(OpItmList, function () {
            if (this.sno == CSno) {
                this.Gauge = Val;
            }
        });
        // OutputitmTab(OpItmList);


    });
    $(document).on('keyup', '.calcsecopqty', function () {
        debugger;
        var table = $('#outputitmtab').DataTable();

        var CSno = table.row($(this).parents('tr')).data()["sno"];
        var IId = table.row($(this).parents('tr')).data()["itmid"];
        var CId = table.row($(this).parents('tr')).data()["clrid"];
        var SId = table.row($(this).parents('tr')).data()["sizeid"];
        var Balance = table.row($(this).parents('tr')).data()["allow"];


        var Val = $(this).val();
        $.each(OpItmList, function () {
            if (this.sno == CSno) {
                this.secqty = Val;
            }
        });
    });
    $(document).on('keyup', '.calctaxval', function () {
        debugger;
        var table = $('#outputitmtab').DataTable();

        var CSno = table.row($(this).parents('tr')).data()["sno"];
        var IId = table.row($(this).parents('tr')).data()["itmid"];
        var CId = table.row($(this).parents('tr')).data()["clrid"];
        var SId = table.row($(this).parents('tr')).data()["sizeid"];
        var Balance = table.row($(this).parents('tr')).data()["allow"];


        var Val = $(this).val();
        $.each(OpItmList, function () {
            if (this.sno == CSno) {
                this.TaxAppVal = Val;
            }
        });
    });
    $(document).on('keyup', '.calcfingsm', function () {
        debugger;
        var table = $('#outputitmtab').DataTable();

        var CSno = table.row($(this).parents('tr')).data()["sno"];
        var IId = table.row($(this).parents('tr')).data()["itmid"];
        var CId = table.row($(this).parents('tr')).data()["clrid"];
        var SId = table.row($(this).parents('tr')).data()["sizeid"];
        var Balance = table.row($(this).parents('tr')).data()["allow"];


        var Val = $(this).val();
        $.each(OpItmList, function () {
            if (this.sno == CSno) {
                this.FinGsm = Val;
            }
        });
    });
    $(document).on('change', '.loadipsizelist', function () {
        debugger;
        var table = $('#inputitmtab').DataTable();

        var CSno = table.row($(this).parents('tr')).data()["sno"];
        var IId = table.row($(this).parents('tr')).data()["itmid"];
        var CId = table.row($(this).parents('tr')).data()["clrid"];
        var SId = table.row($(this).parents('tr')).data()["plansizeid"];
        var Balance = table.row($(this).parents('tr')).data()["allow"];
        var Size = table.row($(this).parents('tr')).data()["size"];

        var val = $(this).val();

        var oldind = -1;
        var fs = '';
        for (var x = 0; x < SizeL.length; x++) {
            if (SizeL[x].SizeId == val) {
                fs = SizeL[x].Size;
                oldind = x;
            }
        }

        $.each(IpItmList, function () {
            if (this.sno == CSno) {
                this.size = fs;
                this.sizeid = val;
            }
        });


        //Validate the same item,color and size in two rows
        var ISId = table.row($(this).parents('tr')).data()["sizeid"];
        for (var e = 0; e < IpItmList.length; e++) {
            var itmid = IpItmList[e].itmid;
            var clrid = IpItmList[e].clrid;
            var sizeid = IpItmList[e].sizeid;
            var cno = IpItmList[e].sno;

            if (itmid == IId && clrid == CId && sizeid == ISId && cno != CSno) {


                $.each(IpItmList, function () {
                    if (this.sno == CSno) {
                        this.size = Size;
                        this.sizeid = SId;
                    }
                });
                InputitmTab(IpItmList);
                //alert("Must be a different Size..");
                var msg = 'Must be a different Size...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                return;
            }

        }

        //


        $.each(IpSaveJobDetList, function () {
            if (this.itmid == IId && this.clrid == CId && this.plansizeid == SId) {
                this.sizeid = val;
                this.size = fs;
            }
        });



        IpJobDetList = $.grep(IpSaveJobDetList, function (v) {
            return (v.itmid === IId && v.clrid === CId && v.plansizeid === SId);
        });

        InputJobdetTab(IpJobDetList);

        var ItmId = IpJobDetList[0]['itmid'];
        var ClrId = IpJobDetList[0]['clrid'];
        var SzId = IpJobDetList[0]['sizeid'];
        var jobno = IpJobDetList[0]['jobordno'];


        var Stkempty = [];
        Stkempty = IpSaveStkDetList;

        Stkempty = $.grep(Stkempty, function (v) {
            return (v.itmid == ItmId && v.clrid == ClrId && v.sizeid == SzId && v.jobordno == jobno);
        });

        IpStkDetList = Stkempty;
        InputStkdetTab(IpStkDetList);

    });
    $(document).on('change', '.loadsizelist', function () {
        debugger;
        var table = $('#outputitmtab').DataTable();

        var CSno = table.row($(this).parents('tr')).data()["sno"];
        var IId = table.row($(this).parents('tr')).data()["itmid"];
        var CId = table.row($(this).parents('tr')).data()["clrid"];
        var SId = table.row($(this).parents('tr')).data()["plansizeid"];
        var Balance = table.row($(this).parents('tr')).data()["allow"];
        var OSize = table.row($(this).parents('tr')).data()["size"];

        var val = $(this).val();

        var oldind = -1;
        var fs = '';
        for (var x = 0; x < SizeL.length; x++) {
            if (SizeL[x].SizeId == val) {
                fs = SizeL[x].Size;
                oldind = x;
            }
        }

        $.each(OpItmList, function () {
            if (this.sno == CSno) {
                this.size = fs;
                this.sizeid = val;
            }
        });



        //Validate the same item,color and size in two rows
        var OSId = table.row($(this).parents('tr')).data()["sizeid"];
        for (var e = 0; e < OpItmList.length; e++) {
            var itmid = OpItmList[e].itmid;
            var clrid = OpItmList[e].clrid;
            var sizeid = OpItmList[e].sizeid;
            var cno = OpItmList[e].sno;

            if (itmid == IId && clrid == CId && sizeid == OSId && cno != CSno) {


                $.each(OpItmList, function () {
                    if (this.sno == CSno) {
                        this.size = OSize;
                        this.sizeid = SId;
                    }
                });
                OutputitmTab(OpItmList);
                //alert("Must be a different Size..");
                var msg = 'Must be a different Size...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                return;
            }

        }

        //

        $.each(OpSaveJobDetList, function () {
            if (this.itmid == IId && this.clrid == CId && this.plansizeid == SId) {
                this.sizeid = val;
                this.size = fs;
            }
        });



        OpJobDetList = $.grep(OpSaveJobDetList, function (v) {
            return (v.itmid === IId && v.clrid === CId && v.plansizeid === SId);
        });


    });
    $(document).on('change', '.loadfabsizelist', function () {
        debugger;
        var table = $('#outputitmtab').DataTable();

        var CSno = table.row($(this).parents('tr')).data()["sno"];
        var IId = table.row($(this).parents('tr')).data()["itmid"];
        var CId = table.row($(this).parents('tr')).data()["clrid"];
        var SId = table.row($(this).parents('tr')).data()["plansizeid"];
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

        $.each(OpItmList, function () {
            if (this.sno == CSno) {
                this.FinDia = fs;
                this.FinDiaid = val;
            }
        });




    });
    $(document).on('keyup', '.calcAmt', function () {
        debugger;
        var table = $('#outputitmtab').DataTable();

        var CSno = table.row($(this).parents('tr')).data()["sno"];
        var IId = table.row($(this).parents('tr')).data()["itmid"];
        var CId = table.row($(this).parents('tr')).data()["clrid"];
        var SId = table.row($(this).parents('tr')).data()["sizeid"];
        var Balance = table.row($(this).parents('tr')).data()["allow"];
        var PSId = table.row($(this).parents('tr')).data()["plansizeid"];

        var Val = $(this).val();
        var value = $(this).val();

        for (j = 0; OpItmList.length > j; j++) {
            if (CId == OpItmList[j].clrid && IId == OpItmList[j].itmid && SId == OpItmList[j].sizeid && CSno == OpItmList[j].sno) {
                var bal = OpItmList[j].prgopqty + pallown;
                var prgqty = OpItmList[j].prgopqty;
                var ordqty = OpItmList[j].ordqty;
                if (prgqty < ordqty && value < ordqty) {
                    var balqty = ordqty - prgqty;
                    for (k = 0; OpItmList.length > k; k++) {
                        OpItmList[k].allow = OpItmList[k].allow + balqty;
                    }
                    opitmbalallow = opitmbalallow - balqty;

                    for (k = 0; OpSaveJobDetList.length > k; k++) {
                        OpSaveJobDetList[k].allow = OpSaveJobDetList[k].allow + balqty;
                    }
                    opbalallow = opbalallow - balqty;
                }
            }
        }


        if (Val > Balance) {
            //alert('Should not exceed Bal qty...');
            var msg = 'Should not exceed Balance quantity...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            $.each(OpItmList, function () {
                if (this.sno == CSno) {
                    this.ordqty = 0;
                }
            });
            //OutputitmTab(OpItmList);
            var otable = $('#outputitmtab').DataTable();
            var odata = otable.rows().data();
            $('input[id=txtOpOrdQty]').each(function (ig) {
                if (odata[ig].sno == CSno) {
                    var row = $(this).closest('tr');
                    row.find('#txtOpOrdQty').val(0);
                }
            });
            for (var t = 0; t < OpSaveJobDetList.length; t++) {
                if (OpSaveJobDetList[t].itmid == IId && OpSaveJobDetList[t].clrid == CId && OpSaveJobDetList[t].plansizeid == PSId) {
                    OpSaveJobDetList[t].ordqty = 0;
                }
            }
            colorempty = $.grep(colorempty, function (v) {
                return (v.itmid === IId && v.clrid === CId && v.plansizeid === PSId);
            });
            OutputJobdetTab(colorempty);
            return true;
        }
        $.each(OpItmList, function () {
            if (this.sno == CSno) {
                this.ordqty = Val;
            }
        });
        //OutputitmTab(OpItmList);
        var otable = $('#outputitmtab').DataTable();
        var odata = otable.rows().data();
        $('input[id=txtOpOrdQty]').each(function (ig) {
            if (odata[ig].sno == CSno) {
                var row = $(this).closest('tr');
                row.find('#txtOpOrdQty').val(Val);
            }
        });

        var pid = [];
        var bal = [];
        var qty = [];
        for (var t = 0; t < OpSaveJobDetList.length; t++) {
            if (OpSaveJobDetList[t].itmid == IId && OpSaveJobDetList[t].clrid == CId && OpSaveJobDetList[t].plansizeid == PSId) {
                pid.push(OpSaveJobDetList[t].sno);
                bal.push(OpSaveJobDetList[t].allow);
                qty.push(OpSaveJobDetList[t].ordqty);
            }
        }

        var c = pid.length;
        var t = 0;

        if (Val < bal[0]) {
            qty[0] = Val;
            for (i = 1; i < qty.length; i++) {
                qty[i] = 0;
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

        for (var u = 0; u < OpSaveJobDetList.length; u++) {
            for (var r = 0; r < pid.length; r++) {
                if (OpSaveJobDetList[u].sno == pid[r]) {
                    OpSaveJobDetList[u].ordqty = qty[r];
                }
            }
        }

        //OutputSaveJobdetTab(OpSaveJobDetList);

        for (var u = 0; u < OpJobDetList.length; u++) {
            for (var r = 0; r < pid.length; r++) {
                if (OpJobDetList[u].sno == pid[r]) {
                    OpJobDetList[u].ordqty = qty[r];
                }
            }
        }

        colorempty = OpSaveJobDetList;

        colorempty = $.grep(colorempty, function (v) {
            return (v.itmid === IId && v.clrid === CId && v.plansizeid === PSId);
        });

        OutputJobdetTab(colorempty);

        OpJobDetList = [];
        OpJobDetList = colorempty;

        var totalamnt = 0;
        for (var e = 0; e < OpItmList.length; e++) {
            var amount = OpItmList[e].ordqty;
            totalamnt = totalamnt + parseFloat(amount);

        }
        //$('#txtGrossAmt').val(totalamnt);

        //Datatable textbox focus
        var rows = $("#outputitmtab").dataTable().fnGetNodes();
        var dtTable = $('#outputitmtab').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
            $('input[id=txtOpOrdQty]').each(function () {
                if (sn == CSno && $(this).val() == Val) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtOpOrdQty').val();
                    row.find('#txtOpOrdQty').focus().val('').val(num);
                    return true;
                }
            });
        }

    });
    $(document).on('keyup', '.calcsepsecquan', function () {
        debugger;
        var table = $('#outputjodettab').DataTable();

        var pid = table.row($(this).parents('tr')).data()["sno"];
        var itmid = table.row($(this).parents('tr')).data()["itmid"];
        var colorid = table.row($(this).parents('tr')).data()["clrid"];
        var sizeid = table.row($(this).parents('tr')).data()["sizeid"];
        var balq = table.row($(this).parents('tr')).data()["allow"];
        var jordno = table.row($(this).parents('tr')).data()["jobordno"];
        var value = $(this).val();

        $.each(OpSaveJobDetList, function () {
            if (this.sno == pid) {
                this.secqty = value;
            }
        });
    });
    $(document).on('keyup', '.calcsepquan', function () {
        debugger;
        var table = $('#outputjodettab').DataTable();

        var pid = table.row($(this).parents('tr')).data()["sno"];
        var itmid = table.row($(this).parents('tr')).data()["itmid"];
        var colorid = table.row($(this).parents('tr')).data()["clrid"];
        var sizeid = table.row($(this).parents('tr')).data()["sizeid"];
        var balq = table.row($(this).parents('tr')).data()["allow"];
        var psid = table.row($(this).parents('tr')).data()["plansizeid"];
        var apprate = table.row($(this).parents('tr')).data()["apprate"];
        var rate = table.row($(this).parents('tr')).data()["rate"];

        if (ChkBudProApp == 'Y' && OrderType=="B") {
            if (rate == 0 || rate < 0) {
                //alert('Please Check Rate..');
                var msg = 'Please Check Rate...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);

                var otable = $('#outputjodettab').DataTable();
                var odata = otable.rows().data();

                $('input[id=txtOpjobOrdQty]').each(function (ig) {
                    if (odata[ig].itmid == itmid && odata[ig].clrid == colorid && odata[ig].plansizeid == psid && odata[ig].sno == pid) {
                        var row = $(this).closest('tr');
                        // row.find('#txtOpOrdQty').val(totalamnt);
                        row.find('#txtOpjobOrdQty').focus().val('').val(0);
                    }
                });

                return true;
            }

        }
        else if (CostAppSamProCheck == 'Y' && OrderType == "S") {
            if (rate == 0 || rate < 0) {
                //alert('Please Check Rate..');
                var msg = 'Please Check Rate...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);

                var otable = $('#outputjodettab').DataTable();
                var odata = otable.rows().data();

                $('input[id=txtOpjobOrdQty]').each(function (ig) {
                    if (odata[ig].itmid == itmid && odata[ig].clrid == colorid && odata[ig].plansizeid == psid && odata[ig].sno == pid) {
                        var row = $(this).closest('tr');
                        // row.find('#txtOpOrdQty').val(totalamnt);
                        row.find('#txtOpjobOrdQty').focus().val('').val(0);
                    }
                });

                return true;
            }

        }


        var value = $(this).val();


        var allow = 0;
        var balallow = 0;
        for (j = 0; OpSaveJobDetList.length > j; j++) {
            if (pid != OpSaveJobDetList[j].sno) {
                var bal = OpSaveJobDetList[j].bal; //+pallown
                var prgqty = OpSaveJobDetList[j].prgopqty;
                var ordqty = OpSaveJobDetList[j].ordqty;
                if (OpSaveJobDetList[j].bal < OpSaveJobDetList[j].ordqty) {
                    var curallow = parseFloat(OpSaveJobDetList[j].ordqty) - parseFloat(OpSaveJobDetList[j].bal)
                    allow = allow + parseFloat(curallow);
                }
            }
        }

        balallow = pallown - allow;

        for (j = 0; OpSaveJobDetList.length > j; j++) {
            if (colorid == OpSaveJobDetList[j].clrid && itmid == OpSaveJobDetList[j].itmid && sizeid == OpSaveJobDetList[j].sizeid && pid == OpSaveJobDetList[j].sno) {
                var bal = OpSaveJobDetList[j].bal; //+pallown
                var prgqty = OpSaveJobDetList[j].prgopqty;
                var ordqty = OpSaveJobDetList[j].ordqty;
                var allow = 0;
                if (OpSaveJobDetList[j].bal < value) {

                    var totactval = parseFloat(OpSaveJobDetList[j].bal) + balallow;

                    if (totactval < value) {

                        value = parseFloat(totactval).toFixed(3);

                    }
                }
            }
        }


        $.each(OpSaveJobDetList, function () {
            if (this.sno == pid) {
                this.ordqty = parseFloat(value).toFixed(3);

                //if (balq >= value) {
                //    this.ordqty = value;
                //}
                //else {
                //    //  alert('Should not exceed Bal qty + Allow...');



                //    //var otable = $('#outputitmtab').DataTable();
                //    //var odata = otable.rows().data();
                //    //$('input[id=txtOpOrdQty]').each(function (ig) {
                //    //    if (odata[ig].itmid == itmid && odata[ig].clrid == colorid && odata[ig].plansizeid == psid) {
                //    //        var row = $(this).closest('tr');
                //    //        row.find('#txtOpOrdQty').val(0);
                //    //    }
                //    //});
                //    // return true;
                //    var t = value - balq;
                //    this.ordqty = balq;
                //}

            }
        });

        $.each(OpJobDetList, function () {
            if (this.sno == pid) {
                this.ordqty = parseFloat(value).toFixed(3);

                //if (balq >= value) {
                //    this.ordqty = value;
                //}
                //else {
                //    var t = value - balq;
                //    this.ordqty = balq;
                //}

            }
        });

        var totalamnt = 0;

        for (var e = 0; e < OpJobDetList.length; e++) {
            if (OpJobDetList[e].itmid == itmid && OpJobDetList[e].clrid == colorid && OpJobDetList[e].plansizeid == psid) {
                var amount = OpJobDetList[e].ordqty;
                totalamnt = totalamnt + parseFloat(amount);
            }
        }
        $.each(OpItmList, function () {
            if (this.itmid == itmid && this.clrid == colorid && this.plansizeid == psid) {
                //this.quantity = 0;

                this.ordqty = parseFloat(totalamnt).toFixed(3);
                //}


            }
        });
        // OutputitmTab(OpItmList);
        //OutputSaveJobdetTab(OpSaveJobDetList);
        var otable = $('#outputitmtab').DataTable();
        var odata = otable.rows().data();

        $('input[id=txtOpOrdQty]').each(function (ig) {
            if (odata[ig].itmid == itmid && odata[ig].clrid == colorid && odata[ig].plansizeid == psid) {
                var row = $(this).closest('tr');
                row.find('#txtOpOrdQty').val(parseFloat(totalamnt).toFixed(3));
            }
        });


        //if (balq >= value) {
        //    $('input[id=txtOpOrdQty]').each(function (ig) {
        //        if (odata[ig].itmid == itmid && odata[ig].clrid == colorid && odata[ig].plansizeid == psid) {
        //            var row = $(this).closest('tr');
        //            row.find('#txtOpOrdQty').val(totalamnt);
        //        }
        //    });
        //}
        //else {
        //    $('input[id=txtOpOrdQty]').each(function (ig) {
        //        if (odata[ig].itmid == itmid && odata[ig].clrid == colorid && odata[ig].plansizeid == psid) {
        //            var row = $(this).closest('tr');
        //            row.find('#txtOpOrdQty').val(totalamnt);
        //        }
        //    });

        //}
        //OutputJobdetTab(OpJobDetList);


        //Datatable textbox focus

        var otable = $('#outputjodettab').DataTable();
        var odata = otable.rows().data();

        $('input[id=txtOpjobOrdQty]').each(function (ig) {
            if (odata[ig].itmid == itmid && odata[ig].clrid == colorid && odata[ig].plansizeid == psid && odata[ig].sno == pid) {
                var row = $(this).closest('tr');
                // row.find('#txtOpOrdQty').val(totalamnt);
                row.find('#txtOpjobOrdQty').focus().val('').val(value);
            }
        });



        //var rows = $("#outputjodettab").dataTable().fnGetNodes();
        //var dtTable = $('#outputjodettab').DataTable();
        //for (var i = 0; i < rows.length; i++) {
        //    var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
        //    $('input[id=txtOpjobOrdQty]').each(function () {
        //        if (sn == pid ) {
        //            var row = $(this).closest('tr');
        //            //if (balq >= value) {
        //            //    var num = row.find('#txtOpjobOrdQty').val();
        //            //    row.find('#txtOpjobOrdQty').focus().val('').val(num);
        //            //}
        //            //else {
        //            row.find('#txtOpjobOrdQty').focus().val('').val(value);
        //           // }
        //            return true;
        //        }
        //    });
        //}

        LoadGrossNetAmt();
        CalcTotalQty();

    });
    $(document).on('keyup', '.calcipsec', function () {
        debugger;
        var table = $('#inputitmtab').DataTable();

        var CSno = table.row($(this).parents('tr')).data()["sno"];
        var IId = table.row($(this).parents('tr')).data()["itmid"];
        var CId = table.row($(this).parents('tr')).data()["clrid"];
        var SId = table.row($(this).parents('tr')).data()["sizeid"];
        var BlQ = table.row($(this).parents('tr')).data()["allow"];
        var Val = $(this).val();

        $.each(IpItmList, function () {
            if (this.sno == CSno) {

                this.secqty = Val;
            }
        });
    });
    $(document).on('keyup', '.calcipAmt', function () {
        debugger;
        var table = $('#inputitmtab').DataTable();

        var CSno = table.row($(this).parents('tr')).data()["sno"];
        var IId = table.row($(this).parents('tr')).data()["itmid"];
        var CId = table.row($(this).parents('tr')).data()["clrid"];
        var SId = table.row($(this).parents('tr')).data()["sizeid"];
        var BlQ = table.row($(this).parents('tr')).data()["allow"];
        var Val = $(this).val();

        var IssQty = Val;
        //var BlQ = currentrowoftcpi[0].bal;
        if (Val > BlQ) {
            //alert('Quantity should not exceed Balqty...');
            var msg = 'Quantity should not exceed Balance quantity...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return true;
        }

        $.each(IpItmDetList, function () {
            if (this.sno == CSno && this.itmid == IId && this.clrid == CId && this.sizeid == SId && this.opitmid == opItmid && this.opsizeid == OpSizeid && this.opclrid == OpClrid) {
                this.issqty = IssQty;
                this.ordqty = Val;
            }
        });

        $.each(IpItmList, function () {
            if (this.sno == CSno && this.itmid == IId && this.clrid == CId && this.sizeid == SId && this.opitmid == opItmid && this.opsizeid == OpSizeid && this.opclrid == OpClrid) {
                this.issqty = IssQty;
                this.ordqty = Val;
            }
        });

        // InputitmTab(IpItmList);

        var table = $('#inputitmtab').DataTable();
        var ecdata = table.rows().data();

        $('input[id=txtipRQty]').each(function (ig) {

            var row = $(this).closest('tr');
            for (var h = 0; h < IpItmDetList.length; h++) {

                if (ig == h && ecdata[ig].clrid == IpItmDetList[h].clrid && ecdata[ig].itmid == IpItmDetList[h].itmid && ecdata[ig].sizeid == IpItmDetList[h].sizeid) {
                    var ordqty = IpItmDetList[h].ordqty;
                    var issqty = IpItmDetList[h].issqty;

                    row.find('#txtipRQty').val(ordqty);
                    row.find('#txtipOrdQty').val(issqty);

                }
            }

        });


        if (IpSaveJobDetList.length > 0) {

            var pid = [];
            var bal = [];
            var qty = [];

            for (var t = 0; t < IpSaveJobDetList.length; t++) {
                if (IpSaveJobDetList[t].itmid == IId && IpSaveJobDetList[t].clrid == CId && IpSaveJobDetList[t].sizeid == SId && IpSaveJobDetList[t].opitmid == opItmid
                    && IpSaveJobDetList[t].opsizeid == OpSizeid && IpSaveJobDetList[t].opclrid == OpClrid) {
                    pid.push(IpSaveJobDetList[t].sno);
                    bal.push(IpSaveJobDetList[t].allow);
                    qty.push(IpSaveJobDetList[t].ordqty);

                }
            }

            var c = pid.length;
            var t = 0;

            if (Val < bal[0]) {
                qty[0] = Val;
                for (var l = 1; l < qty.length; l++) {
                    qty[l] = 0;
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
            var son = [];
            var jid = [];
            for (var u = 0; u < IpSaveJobDetList.length; u++) {
                for (var r = 0; r < pid.length; r++) {
                    if (IpSaveJobDetList[u].sno == pid[r]) {
                        IpSaveJobDetList[u].ordqty = qty[r];
                        son.push(IpSaveJobDetList[u].ordqty);
                        jid.push(IpSaveJobDetList[u].jobordno);
                    }
                    //if (OSItemList[u].OItemid == IId && OSItemList[u].OColorid == CId && OSItemList[u].OSizeid == SId && OSItemList[u].OUomid == PUId) {
                    //    OSItemList[u].IssueQty = qty[r];
                    //}
                }
            }

            //InputSaveJobdetTab(IpSaveJobDetList);

            //var table = $('#inputsavejodettab').DataTable();
            //var ecdata = table.rows().data();

            //$('input[id=txtiptsavejobOrdQty]').each(function (ig) {

            //    var row = $(this).closest('tr');
            //    for (var h = 0; h < IpSaveJobDetList.length; h++) {

            //        if (ig == h && ecdata[ig].clrid == IpSaveJobDetList[h].clrid && ecdata[ig].itmid == IpSaveJobDetList[h].itmid && ecdata[ig].sizeid == IpSaveJobDetList[h].sizeid
            //            && opItmid == IpSaveJobDetList[h].opitmid && OpSizeid == IpSaveJobDetList[h].opsizeid && OpClrid == IpSaveJobDetList[h].opclrid) {
            //            var ordqty = IpSaveJobDetList[h].ordqty;


            //            row.find('#txtiptsavejobOrdQty').val(ordqty);

            //        }
            //    }

            //});


            var j = jid[0];
            var colorempty = [];
            colorempty = IpSaveJobDetList;

            colorempty = $.grep(colorempty, function (v) {
                return (v.itmid == IId && v.clrid == CId && v.sizeid == SId && v.opitmid == opItmid && v.opclrid == OpClrid && v.opsizeid == OpSizeid);
            });
            //IpJobDetList = [];
            //IpJobDetList = colorempty;
            InputJobdetTab(colorempty);

            //var table = $('#inputjodettab').DataTable();
            //var ecdata = table.rows().data();

            //$('input[id=txtiptjobOrdQty]').each(function (ig) {

            //    var row = $(this).closest('tr');
            //    for (var h = 0; h < IpJobDetList.length; h++) {

            //        if (ig == h && ecdata[ig].clrid == IpJobDetList[h].clrid && ecdata[ig].itmid == IpJobDetList[h].itmid && ecdata[ig].sizeid == IpJobDetList[h].sizeid) {
            //            var ordqty = IpJobDetList[h].ordqty;

            //            row.find('#txtiptjobOrdQty').val(ordqty);
            //        }
            //    }

            //});
        }

        if (IpSaveStkDetList.length > 0) {



            var sid = [];
            var bal = [];
            var qty = [];
            for (var t = 0; t < IpSaveStkDetList.length; t++) {
                if (IpSaveStkDetList[t].itmid == IId && IpSaveStkDetList[t].clrid == CId && IpSaveStkDetList[t].sizeid == SId && IpSaveStkDetList[t].jobordno == j
                    && IpSaveStkDetList[t].opitmid == opItmid && IpSaveStkDetList[t].opsizeid == OpSizeid && IpSaveStkDetList[t].opclrid == OpClrid) {
                    sid.push(IpSaveStkDetList[t].stockid);
                    bal.push(IpSaveStkDetList[t].allow);
                    qty.push(IpSaveStkDetList[t].issues);
                }
            }

            var c = sid.length;
            var t = 0;

            //if (Val > bal[0]) {
            //qty[0] = Val;
            //}

            if (son[0] < bal[0]) {
                qty[0] = son[0];

                for (var l = 1; l < qty.length; l++) {
                    qty[l] = 0;
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

            var stkempty = [];

            var stkid = [];
            for (var u = 0; u < IpSaveStkDetList.length; u++) {
                for (var r = 0; r < sid.length; r++) {
                    if (IpSaveStkDetList[u].stockid == sid[r] && IpSaveStkDetList[u].opitmid == opItmid && IpSaveStkDetList[u].opsizeid == OpSizeid && IpSaveStkDetList[u].opclrid == OpClrid) {
                        IpSaveStkDetList[u].issues = qty[r];
                        stkid.push(IpSaveStkDetList[u].stockid);
                    }


                }
            }

            //for (var e = 0; e < IpStkDetList.length; e++) {
            //    for (var r = 0; r < sid.length; r++) {
            //        if (IpStkDetList[e].stockid == sid[r]) {
            //            IpStkDetList[e].issues = qty[r];
            //        }
            //    }
            //}

            //InputStkdetTab(IpStkDetList);
            // InputSaveStkdetTab(IpSaveStkDetList);

            //var table = $('#inputsavestkdettab').DataTable();
            //var ecdata = table.rows().data();

            //$('input[id=txtipissueqty]').each(function (ig) {

            //    var row = $(this).closest('tr');
            //    for (var h = 0; h < IpSaveStkDetList.length; h++) {

            //        if (ig == h && ecdata[ig].clrid == IpSaveStkDetList[h].clrid && ecdata[ig].itmid == IpSaveStkDetList[h].itmid && ecdata[ig].sizeid == IpSaveStkDetList[h].sizeid) {

            //            var issues = IpSaveStkDetList[h].issues;

            //            row.find('#txtiptissQty').val(issues);

            //        }
            //    }

            //});
            colorempty = IpSaveStkDetList;

            colorempty = $.grep(colorempty, function (v) {
                return (v.itmid == IId && v.clrid == CId && v.sizeid == SId && v.jobordno == j && v.opitmid == opItmid && v.opclrid == OpClrid && v.opsizeid == OpSizeid);
            });
            //IpStkDetList = [];
            //IpStkDetList = colorempty;
            InputStkdetTab(colorempty);

            //var table = $('#inputstkdettab').DataTable();
            //var ecdata = table.rows().data();

            //$('input[id=txtiptissQty]').each(function (ig) {

            //    var row = $(this).closest('tr');
            //    for (var h = 0; h < IpStkDetList.length; h++) {

            //        if (ig == h && ecdata[ig].clrid == IpStkDetList[h].clrid && ecdata[ig].itmid == IpStkDetList[h].itmid && ecdata[ig].sizeid == IpStkDetList[h].sizeid) {

            //            var issues = IpStkDetList[h].issues;

            //            row.find('#txtiptissQty').val(issues);

            //        }
            //    }

            //});


        }
        //var totalamnt = 0;

        //for (var e = 0; e < IpStkDetList.length; e++) {
        //    var amount = IpStkDetList[e].issues;
        //    totalamnt = totalamnt + parseFloat(amount);
        //}


        //$.each(IpItmList, function () {
        //    if (this.sno == CSno && this.itmid == IId && this.clrid == CId && this.sizeid == SId && this.opitmid == opItmid && this.opsizeid == OpSizeid && this.opclrid == OpClrid) {
        //        this.issqty = totalamnt;
        //        this.ordqty = totalamnt;
        //    }
        //});

        // InputitmTab(IpItmList);

        //var table = $('#inputitmtab').DataTable();
        //var ecdata = table.rows().data();

        //$('input[id=txtipRQty]').each(function (ig) {

        //    var row = $(this).closest('tr');
        //    for (var h = 0; h < IpItmList.length; h++) {

        //        if (ig == h && ecdata[ig].clrid == IpItmList[h].clrid && ecdata[ig].itmid == IpItmList[h].itmid && ecdata[ig].sizeid == IpItmList[h].sizeid) {
        //            var ordqty = IpItmList[h].ordqty;
        //            var issqty = IpItmList[h].issqty;

        //            row.find('#txtipRQty').val(ordqty);
        //            row.find('#txtipOrdQty').val(issqty);

        //        }
        //    }

        //});


        //if (IpSaveJobDetList.length > 0) {

        //    var pid = [];
        //    var bal = [];
        //    var qty = [];

        //    for (var t = 0; t < IpSaveJobDetList.length; t++) {
        //        if (IpSaveJobDetList[t].itmid == IId && IpSaveJobDetList[t].clrid == CId && IpSaveJobDetList[t].sizeid == SId) {
        //            pid.push(IpSaveJobDetList[t].sno);
        //            bal.push(IpSaveJobDetList[t].allow);
        //            qty.push(IpSaveJobDetList[t].ordqty);

        //        }
        //    }

        //    var c = pid.length;
        //    var t = 0;

        //    if (totalamnt < bal[0]) {
        //        qty[0] = totalamnt;
        //        for (var l = 1; l < qty.length; l++) {
        //            qty[l] = 0;
        //        }
        //    }
        //    else {
        //        for (var r = 0; r < c; r++) {
        //            if (r == 0) {
        //                if (bal[r] <= totalamnt) {
        //                    qty[r] = bal[r];
        //                    t = totalamnt - bal[r];
        //                }
        //            }
        //            if (r > 0) {
        //                if (bal[r] >= t) {
        //                    qty[r] = t;
        //                    t = 0;
        //                }
        //                else {
        //                    var y = t - bal[r];
        //                    if (bal[r] < y || bal[r] > y) {
        //                        qty[r] = bal[r];
        //                        t = t - qty[r];
        //                    }
        //                    else {
        //                        qty[r] = y;
        //                        t = t - y;
        //                    }
        //                }

        //            }
        //        }
        //    }
        //    var son = [];
        //    var jid = [];
        //    for (var u = 0; u < IpSaveJobDetList.length; u++) {
        //        for (var r = 0; r < pid.length; r++) {
        //            if (IpSaveJobDetList[u].sno == pid[r]) {
        //                IpSaveJobDetList[u].ordqty = qty[r];
        //                son.push(IpSaveJobDetList[u].ordqty);
        //                jid.push(IpSaveJobDetList[u].jobordno);
        //            }
        //            //if (OSItemList[u].OItemid == IId && OSItemList[u].OColorid == CId && OSItemList[u].OSizeid == SId && OSItemList[u].OUomid == PUId) {
        //            //    OSItemList[u].IssueQty = qty[r];
        //            //}
        //        }
        //    }

        //    // InputSaveJobdetTab(IpSaveJobDetList);

        //    var table = $('#inputsavejodettab').DataTable();
        //    var ecdata = table.rows().data();

        //    $('input[id=txtiptsavejobOrdQty]').each(function (ig) {

        //        var row = $(this).closest('tr');
        //        for (var h = 0; h < IpSaveJobDetList.length; h++) {

        //            if (ig == h && ecdata[ig].clrid == IpSaveJobDetList[h].clrid && ecdata[ig].itmid == IpSaveJobDetList[h].itmid && ecdata[ig].sizeid == IpSaveJobDetList[h].sizeid) {
        //                var ordqty = IpSaveJobDetList[h].ordqty;


        //                row.find('#txtiptsavejobOrdQty').val(ordqty);

        //            }
        //        }

        //    });



        //    var j = jid[0];
        //    var colorempty = [];
        //    colorempty = IpSaveJobDetList;

        //    colorempty = $.grep(colorempty, function (v) {
        //        return (v.itmid == IId && v.clrid == CId && v.sizeid == SId);
        //    });
        //    IpJobDetList = [];
        //    IpJobDetList = colorempty;
        //    // InputJobdetTab(colorempty);

        //    var table = $('#inputjodettab').DataTable();
        //    var ecdata = table.rows().data();

        //    $('input[id=txtiptjobOrdQty]').each(function (ig) {

        //        var row = $(this).closest('tr');
        //        for (var h = 0; h < IpJobDetList.length; h++) {

        //            if (ig == h && ecdata[ig].clrid == IpJobDetList[h].clrid && ecdata[ig].itmid == IpJobDetList[h].itmid && ecdata[ig].sizeid == IpJobDetList[h].sizeid) {
        //                var ordqty = IpJobDetList[h].ordqty;


        //                row.find('#txtiptjobOrdQty').val(ordqty);

        //            }
        //        }

        //    });
        //}

        //Datatable textbox focus
        var rows = $("#inputitmtab").dataTable().fnGetNodes();
        var dtTable = $('#inputitmtab').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
            $('input[id=txtipOrdQty]').each(function () {
                if (sn == CSno && $(this).val() == Val) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtipOrdQty').val();
                    row.find('#txtipOrdQty').focus().val('').val(num);
                    return true;
                }
            });
        }
    });
    $(document).on('keyup', '.calcipsepquansec', function () {
        debugger;

        var table = $('#inputjodettab').DataTable();

        var IId = table.row($(this).parents('tr')).data()["itmid"];
        var CId = table.row($(this).parents('tr')).data()["clrid"];
        var SId = table.row($(this).parents('tr')).data()["sizeid"];
        var pid = table.row($(this).parents('tr')).data()["sno"];
        var balq = table.row($(this).parents('tr')).data()["allow"];
        var jmid = table.row($(this).parents('tr')).data()["jobordno"];
        var value = $(this).val();

        $.each(IpSaveJobDetList, function () {
            if (this.sno == pid) {
                this.secqty = value;
            }
        });
    });
    $(document).on('keyup', '.calcipsepquan', function () {
        debugger;
        var table = $('#inputjodettab').DataTable();

        var IId = table.row($(this).parents('tr')).data()["itmid"];
        var CId = table.row($(this).parents('tr')).data()["clrid"];
        var SId = table.row($(this).parents('tr')).data()["sizeid"];
        var pid = table.row($(this).parents('tr')).data()["sno"];
        var balq = table.row($(this).parents('tr')).data()["allow"];
        var jmid = table.row($(this).parents('tr')).data()["jobordno"];
        var pgmno = table.row($(this).parents('tr')).data()["ProductionPgmNo "];
        var value = $(this).val();
        var val = $(this).val();
        var IssQty = 0;

        //for (j = 0; IpSaveJobDetList.length > j; j++) {
        //    if (CId == IpSaveJobDetList[j].clrid && IId == IpSaveJobDetList[j].itmid && SId == IpSaveJobDetList[j].sizeid && pid == IpSaveJobDetList[j].sno) {
        //        var bal = IpSaveJobDetList[j].prgopqty + pallown;
        //        var prgqty = IpSaveJobDetList[j].prgopqty;
        //        var ordqty = IpSaveJobDetList[j].ordqty;
        //        if (prgqty < ordqty && value < ordqty) {
        //            var balqty = ordqty - prgqty;
        //            for (k = 0; IpSaveJobDetList.length > k; k++) {
        //                IpSaveJobDetList[k].allow = IpSaveJobDetList[k].allow + balqty;
        //            }
        //            balallow = balallow - balqty;
        //        }
        //    }
        //}


        var allow = 0;
        var balallow = 0;
        for (j = 0; IpSaveJobDetList.length > j; j++) {
            if (CId == IpSaveJobDetList[j].clrid && IId == IpSaveJobDetList[j].itmid && SId == IpSaveJobDetList[j].sizeid && IpSaveJobDetList[j].jobordno == jmid
                && IpSaveJobDetList[j].opitmid == opItmid && IpSaveJobDetList[j].opsizeid == OpSizeid && IpSaveJobDetList[j].opclrid == OpClrid && IpSaveJobDetList[j].prodpgmno == ProductionPgmNo) {
            }
            else {
                var bal = IpSaveJobDetList[j].prgopqty; //+pallown
                var prgqty = IpSaveJobDetList[j].prgopqty;
                var ordqty = IpSaveJobDetList[j].ordqty;
                if (IpSaveJobDetList[j].prgopqty < IpSaveJobDetList[j].ordqty) {
                    var curallow = parseFloat(IpSaveJobDetList[j].ordqty) - parseFloat(IpSaveJobDetList[j].prgopqty)
                    allow = allow + parseFloat(curallow);
                }
            }
        }

        balallow = pallown - allow;

        for (j = 0; IpSaveJobDetList.length > j; j++) {
            if (CId == IpSaveJobDetList[j].clrid && IId == IpSaveJobDetList[j].itmid && SId == IpSaveJobDetList[j].sizeid && IpSaveJobDetList[j].jobordno == jmid
                && IpSaveJobDetList[j].opitmid == opItmid && IpSaveJobDetList[j].opsizeid == OpSizeid && IpSaveJobDetList[j].opclrid == OpClrid && IpSaveJobDetList[j].prodpgmno == ProductionPgmNo) {
                var bal = IpSaveJobDetList[j].prgopqty; //+pallown
                var prgqty = IpSaveJobDetList[j].prgopqty;
                var ordqty = IpSaveJobDetList[j].ordqty;
                var allow = 0;
                if (IpSaveJobDetList[j].prgopqty < value) {

                    var totactval = parseFloat(IpSaveJobDetList[j].prgopqty) + balallow;

                    if (totactval < value) {

                        value = parseFloat(totactval).toFixed(3);

                    }
                }
            }
        }

        var totissues = 0;
        for (var t = 0; t < IpStkDetList.length; t++) {
            if (IpStkDetList[t].itmid == IId && IpStkDetList[t].clrid == CId && IpStkDetList[t].sizeid == SId && IpStkDetList[t].jobordno == jmid
                && IpStkDetList[t].opitmid == opItmid && IpStkDetList[t].opsizeid == OpSizeid && IpStkDetList[t].opclrid == OpClrid && IpStkDetList[t].prodpgmno == ProductionPgmNo) {
                totissues = totissues + parseFloat(IpStkDetList[t].bal);
            }
        }

        if (totissues < value) {
            value = parseFloat(totissues).toFixed(3);
        }

        //var totalissues = value;
        //for (var t = 0; t < IpSaveStkDetList.length; t++) {
        //    if (IpSaveStkDetList[t].itmid == IId && IpSaveStkDetList[t].clrid == CId && IpSaveStkDetList[t].sizeid == SId && IpSaveStkDetList[t].jobordno == jmid
        //        && IpSaveStkDetList[t].opitmid == opItmid && IpSaveStkDetList[t].opsizeid == OpSizeid && IpSaveStkDetList[t].opclrid == OpClrid) {

        //        if (IpSaveStkDetList[t].bal < totalissues) {
        //            IpSaveStkDetList[t].issues = IpSaveStkDetList[t].bal;
        //            totalissues = totalissues - parseFloat(IpSaveStkDetList[t].bal);
        //        }
        //        else {
        //            IpSaveStkDetList[t].issues = totalissues;
        //        }
        //    }
        //}


        //var totalissues = value;
        //for (var t = 0; t < IpStkDetList.length; t++) {
        //    if (IpStkDetList[t].itmid == IId && IpStkDetList[t].clrid == CId && IpStkDetList[t].sizeid == SId && IpStkDetList[t].jobordno == jmid
        //        && IpStkDetList[t].opitmid == opItmid && IpStkDetList[t].opsizeid == OpSizeid && IpStkDetList[t].opclrid == OpClrid) {

        //        if (IpStkDetList[t].bal < totalissues) {
        //            IpStkDetList[t].issues = IpStkDetList[t].bal;
        //            totalissues = totalissues - parseFloat(IpStkDetList[t].bal);
        //        }
        //        else {
        //            IpStkDetList[t].issues = totalissues;
        //        }
        //    }
        //}


        //for (var s = 0; s < IpStkDetList.length; s++) {
        //    for (var t = 0; t < IpSaveStkDetList.length; t++) {
        //        if (IpSaveStkDetList[t].itmid == IpStkDetList[s].itmid && IpSaveStkDetList[t].clrid == IpStkDetList[s].clrid && IpSaveStkDetList[t].sizeid == IpStkDetList[s].sizeid && IpSaveStkDetList[t].jobordno == IpStkDetList[s].jobordno
        //            && IpSaveStkDetList[t].opitmid == opItmid && IpSaveStkDetList[t].opsizeid == OpSizeid && IpSaveStkDetList[t].opclrid == OpClrid) {

        //            // if (IpSaveStkDetList[t].bal < totalissues) {
        //            IpSaveStkDetList[t].issues = IpStkDetList[s].issues;
        //            // totalissues = totalissues - parseFloat(IpSaveStkDetList[t].bal);
        //            //}
        //            //else {
        //            //    IpSaveStkDetList[t].issues = totalissues;
        //            //}
        //        }
        //    }
        //}

        $.each(IpSaveJobDetList, function () {

            if (CId == this.clrid && IId == this.itmid && SId == this.sizeid && this.jobordno == jmid
                && this.opitmid == opItmid && this.opsizeid == OpSizeid && this.opclrid == OpClrid && this.prodpgmno == ProductionPgmNo) {
                this.ordqty = value;
                this.issqty = value;

                //if (balq >= value) {
                //    this.ordqty = value;
                //    this.issqty = value;
                //    IssQty = value;

                //}
                //else {
                //    var t = value - balq;
                //    this.ordqty = balq;
                //    this.issqty = balq;
                //    IssQty = balq;
                //}
            }



            //if (this.sno == pid) {

            //    if (balq >= value) {
            //        this.ordqty = value;
            //        this.issqty = value;
            //        IssQty = value;

            //    }
            //    else {
            //        var t = value - balq;
            //        this.ordqty = balq;
            //        this.issqty = balq;
            //        IssQty = balq;
            //    }

            //}
        });
        $.each(IpJobDetList, function () {
            //if (this.sno == pid) {

            //    if (balq >= value) {
            //        this.ordqty = value;
            //        this.issqty = value;
            //    }
            //    else {
            //        var t = value - balq;
            //        this.ordqty = balq;
            //        this.issqty = balq;
            //    }

            //}
            if (CId == this.clrid && IId == this.itmid && SId == this.sizeid && this.jobordno == jmid
               && this.opitmid == opItmid && this.opsizeid == OpSizeid && this.opclrid == OpClrid && this.prodpgmno == ProductionPgmNo) {
                this.ordqty = value;
                //this.issqty = value;
                //if (balq >= value) {
                //    this.ordqty = value;
                //    this.issqty = value;
                //    IssQty = value;

                //}
                //else {
                //    var t = value - balq;
                //    this.ordqty = balq;
                //    this.issqty = balq;
                //    IssQty = balq;
                //}
            }
        });

        //var currentrow = [];
        //var Itmstkid = 0;

        //for (var a = 0; a < IpStkDetList.length; a++) {

        //    if (IpStkDetList[a].jobordno == jmid) {
        //        currentrow.push(IpStkDetList[a]);
        //        var jm = currentrow[a].jobordno;
        //        Itmstkid = currentrow[a].stockid;
        //        var balstk = currentrow[a].allow;
        //        var limitstk = 0;
        //        $.each(IpSaveStkDetList, function () {
        //            if (this.stockid == Itmstkid && this.opitmid == opItmid && this.opsizeid == OpSizeid && this.opclrid == OpClrid) {
        //                if (value >= balstk) {
        //                    if (balstk >= value) {
        //                        this.issues = value;

        //                    }
        //                    else {
        //                        var t = value - balstk;
        //                        this.issues = balstk;
        //                        limitstk = balstk;

        //                        $.each(IpSaveJobDetList, function () {
        //                            if (this.sno == pid) {
        //                                this.ordqty = limitstk;
        //                                this.issqty = limitstk;

        //                            }
        //                        });

        //                        $.each(IpJobDetList, function () {
        //                            if (this.sno == pid) {
        //                                this.ordqty = limitstk;
        //                                this.issqty = limitstk;
        //                            }
        //                        });
        //                    }
        //                }
        //                else {
        //                    if (balstk >= value) {
        //                        this.issues = value;
        //                        value = 0;
        //                    }
        //                    else {
        //                        var t = value - balstk;
        //                        this.issues = balstk;

        //                    }
        //                }
        //            }
        //        });
        //    }
        //}
        //IpStkDetList = [];


        //for (var u = 0; u < IpSaveStkDetList.length; u++) {
        //    if (IpSaveStkDetList[u].itmid == IId && IpSaveStkDetList[u].clrid == CId && IpSaveStkDetList[u].sizeid == SId && IpSaveStkDetList[u].jobordno == jmid
        //        && IpSaveStkDetList[u].opitmid == opItmid && IpSaveStkDetList[u].opsizeid == OpSizeid && IpSaveStkDetList[u].opclrid == OpClrid) {
        //        IpStkDetList.push(IpSaveStkDetList[u]);
        //    }
        //}

        // InputStkdetTab(IpStkDetList);
        //var totalamnt = 0;

        //for (var e = 0; e < IpJobDetList.length; e++) {
        //    var amount = IpJobDetList[e].ordqty;
        //    totalamnt = totalamnt + parseFloat(amount);
        //}


        //if (IpSaveStkDetList.length > 0) {
        //    for (var r = 0; r < IpSaveStkDetList.length; r++) {
        //        if (IpSaveStkDetList[r].issues > 0) {

        //            $.each(IpItmList, function () {
        //                if (this.itmid == IId && this.clrid == CId && this.sizeid == SId && this.opitmid == opItmid && this.opsizeid == OpSizeid && this.opclrid == OpClrid) {
        //                    this.issqty = totalamnt;
        //                    this.ordqty = value;

        //                }
        //            });

        //        }
        //    }
        //}

        //var list = [];

        //if (IpSaveStkDetList.length > 0) {
        //    for (var r = 0; r < IpSaveStkDetList.length; r++) {
        //        if (IpSaveStkDetList[r].issues > 0) {
        //            list.push(IpSaveStkDetList[r]);
        //        }
        //    }
        //    if (list.length == 0) {

        //        $.each(IpItmList, function () {
        //            if (this.itmid == IId && this.clrid == CId && this.sizeid == SId && this.opitmid == opItmid && this.opsizeid == OpSizeid && this.opclrid == OpClrid) {
        //                this.issqty = 0;
        //                this.ordqty = value;

        //            }
        //        });
        //    }
        //}

        //if (IpSaveStkDetList.length == 0) {
        //    $.each(IpItmList, function () {
        //        if (this.itmid == IId && this.clrid == CId && this.sizeid == SId && this.opitmid == opItmid && this.opsizeid == OpSizeid && this.opclrid == OpClrid) {
        //            this.issqty = 0;
        //            this.ordqty = value;

        //        }
        //    });
        //}


        //var total = 0;

        //for (var j = 0; IpSaveJobDetList.length > j; j++) {
        //    if (CId == IpSaveJobDetList[j].clrid && IId == IpSaveJobDetList[j].itmid && SId == IpSaveJobDetList[j].sizeid
        //        && IpSaveJobDetList[j].opitmid == opItmid && IpSaveJobDetList[j].opsizeid == OpSizeid && IpSaveJobDetList[j].opclrid == OpClrid) {
        //        var amount = IpSaveJobDetList[j].ordqty;
        //        total = total + parseFloat(amount);
        //    }
        //}

        //for (var e = 0; e < IpJobDetList.length; e++) {
        //    var amount = IpJobDetList[e].ordqty;
        //    total = total + parseFloat(amount);
        //}


        //$.each(IpItmList, function () {
        //    if (this.itmid == IId && this.clrid == CId && this.sizeid == SId && this.opitmid == opItmid && this.opsizeid == OpSizeid && this.opclrid == OpClrid) {
        //        this.issqty = total;
        //        this.ordqty = total;
        //    }
        //});

        //$.each(IpSaveJobDetList, function () {
        //    if (this.sno == pid) {

        //        if (balq >= total) {
        //            this.ordqty = total;

        //        }
        //        else {
        //            var t = total - balq;
        //            this.ordqty = balq;
        //        }

        //    }
        //});
        //$.each(IpJobDetList, function () {
        //    if (this.sno == pid) {

        //        if (balq >= total) {
        //            this.ordqty = total;
        //        }
        //        else {
        //            var t = total - balq;
        //            this.ordqty = balq;
        //        }

        //    }
        //});


        //InputSaveJobdetTab(IpSaveJobDetList);

        //for (var j = 0; IpSaveJobDetList.length > j; j++) {
        //    if (CId == IpSaveJobDetList[j].clrid && IId == IpSaveJobDetList[j].itmid && SId == IpSaveJobDetList[j].sizeid && pid == IpSaveJobDetList[j].sno) {
        //        var ord = IpSaveJobDetList[j].ordqty;
        //        var bl = IpSaveJobDetList[j].bal;
        //        var prg = parseFloat(bl) - parseFloat(ord);
        //        IpSaveJobDetList[j].prgopqty = prg;

        //    }
        //}

        //for (var j = 0; IpSaveJobDetList.length > j; j++) {
        //    if (CId == IpSaveJobDetList[j].clrid && IId == IpSaveJobDetList[j].itmid && SId == IpSaveJobDetList[j].sizeid && pid == IpSaveJobDetList[j].sno) {
        //        var ord = IpSaveJobDetList[j].ordqty;
        //        var bl = IpSaveJobDetList[j].bal;
        //        var prg = parseFloat(bl) - parseFloat(ord);
        //        IpSaveJobDetList[j].prgopqty = prg;

        //    }
        //}


        //var table = $('#inputjodettab').DataTable();
        //var ecdata = table.rows().data();
        //debugger;
        //$('input[id=txtiptjobOrdQty]').each(function (ig) {

        //    var row = $(this).closest('tr');
        //    for (var h = 0; h < IpJobDetList.length; h++) {
        //        debugger;
        //        if (ig == h && ecdata[ig].clrid == IpJobDetList[h].clrid && ecdata[ig].itmid == IpJobDetList[h].itmid && ecdata[ig].sizeid == IpJobDetList[h].sizeid) {
        //            var prgopqty = IpJobDetList[h].prgopqty;
        //            row.find('#txtipprgopqty').val(prgopqty);

        //        }
        //    }

        //});


        // InputJobdetTab(IpJobDetList);
        //var table = $('#inputjodettab').DataTable();
        //var ecdata = table.rows().data();
        //debugger;
        //$('input[id=txtiptjobOrdQty]').each(function (ig) {

        //    var row = $(this).closest('tr');
        //    for (var h = 0; h < IpJobDetList.length; h++) {
        //        debugger;
        //        if (ig == h && ecdata[ig].clrid == IpJobDetList[h].clrid && ecdata[ig].itmid == IpJobDetList[h].itmid && ecdata[ig].sizeid == IpJobDetList[h].sizeid) {
        //            var ordqty = IpJobDetList[h].ordqty;

        //            row.find('#txtiptjobOrdQty').val(ordqty);
        //            row.find('#txtipprgopqty').val(ordqty);

        //        }
        //    }

        //});

        // InputitmTab(IpItmList);

        //var table = $('#inputitmtab').DataTable();
        //var ecdata = table.rows().data();
        //debugger;
        //$('input[id=txtipRQty]').each(function (ig) {

        //    var row = $(this).closest('tr');
        //    for (var h = 0; h < IpItmList.length; h++) {
        //        debugger;
        //        if (ig == h && ecdata[ig].clrid == IpItmList[h].clrid && ecdata[ig].itmid == IpItmList[h].itmid && ecdata[ig].sizeid == IpItmList[h].sizeid) {
        //            var ordqty = IpItmList[h].ordqty;
        //            var issqty = IpItmList[h].issqty;

        //            row.find('#txtipRQty').val(ordqty);
        //            row.find('#txtipOrdQty').val(issqty);

        //        }
        //    }

        //});

        //InputStkdetTab(IpStkDetList);
        //InputSaveStkdetTab(IpSaveStkDetList);


        // InputStkdetTab(IpStkDetList);

        //var table = $('#inputstkdettab').DataTable();
        //var ecdata = table.rows().data();
        //debugger;
        //$('input[id=txtiptissQty]').each(function (ig) {

        //    var row = $(this).closest('tr');
        //    for (var h = 0; h < IpStkDetList.length; h++) {
        //        debugger;
        //        if (ig == h && ecdata[ig].clrid == IpStkDetList[h].clrid && ecdata[ig].itmid == IpStkDetList[h].itmid && ecdata[ig].sizeid == IpStkDetList[h].sizeid) {

        //            var issues = IpStkDetList[h].issues;

        //            row.find('#txtiptissQty').val(issues);

        //        }
        //    }

        //});


        //  InputSaveStkdetTab(IpSaveStkDetList);

        //var table = $('#inputsavestkdettab').DataTable();
        //var ecdata = table.rows().data();
        //debugger;
        //$('input[id=txtipissueqty]').each(function (ig) {

        //    var row = $(this).closest('tr');
        //    for (var h = 0; h < IpSaveStkDetList.length; h++) {
        //        debugger;
        //        if (ig == h && ecdata[ig].clrid == IpSaveStkDetList[h].clrid && ecdata[ig].itmid == IpSaveStkDetList[h].itmid && ecdata[ig].sizeid == IpSaveStkDetList[h].sizeid) {

        //            var issues = IpSaveStkDetList[h].issues;

        //            row.find('#txtiptissQty').val(issues);

        //        }
        //    }

        //});

        var total = 0;

        for (var e = 0; e < IpSaveJobDetList.length; e++) {
            if (IpSaveJobDetList[e].itmid == IId && IpSaveJobDetList[e].clrid == CId && IpSaveJobDetList[e].sizeid == SId
                 && IpSaveJobDetList[e].opitmid == opItmid && IpSaveJobDetList[e].opsizeid == OpSizeid && IpSaveJobDetList[e].opclrid == OpClrid ) {
                var amount = IpSaveJobDetList[e].ordqty;
                total = total + parseFloat(amount);
            }
        }

        $.each(IpItmList, function () {
            if (this.itmid == IId && this.clrid == CId && this.sizeid == SId && this.opitmid == opItmid && this.opsizeid == OpSizeid && this.opclrid == OpClrid ) {
                //this.issqty = total;
                //this.ordqty = total;
                var qty = this.issqty;
                this.issqty = parseFloat(total);
                this.ordqty = parseFloat(total);
            }
        });
        $.each(IpItmDetList, function () {
            if (this.itmid == IId && this.clrid == CId && this.sizeid == SId && this.opitmid == opItmid && this.opsizeid == OpSizeid && this.opclrid == OpClrid) {
                //this.issqty = total;
                //this.ordqty = total;
                var qty = this.issqty;
                this.issqty = parseFloat(total);
                this.ordqty = parseFloat(total);
            }
        });


        //$.each(IpItmDetList, function () {

        //    if (this.itmid == IId && this.clrid == CId && this.sizeid == SId && this.opitmid == opItmid && this.opsizeid == OpSizeid && this.opclrid == OpClrid) {
        //        var qty = this.issqty;
        //        this.issqty = parseFloat(IssQty) + parseFloat(qty);
        //        this.ordqty = parseFloat(IssQty) + parseFloat(qty);
        //    }
        //});

        //$.each(IpItmList, function () {
        //    if (this.itmid == IId && this.clrid == CId && this.sizeid == SId && this.opitmid == opItmid && this.opsizeid == OpSizeid && this.opclrid == OpClrid) {
        //        var qty = this.issqty;
        //        this.issqty = parseFloat(IssQty) + parseFloat(qty);
        //        this.ordqty = parseFloat(IssQty) + parseFloat(qty);
        //    }
        //});

        // InputitmTab(IpItmList);

        var table = $('#inputitmtab').DataTable();
        var ecdata = table.rows().data();

        $('input[id=txtipRQty]').each(function (ig) {

            var row = $(this).closest('tr');
            for (var h = 0; h < IpItmDetList.length; h++) {

                if (ig == h && ecdata[ig].clrid == IpItmDetList[h].clrid && ecdata[ig].itmid == IpItmDetList[h].itmid && ecdata[ig].sizeid == IpItmDetList[h].sizeid) {
                    var ordqty = IpItmDetList[h].ordqty;
                    var issqty = IpItmDetList[h].issqty;

                    row.find('#txtipRQty').val(ordqty);
                    row.find('#txtipOrdQty').val(issqty);

                }
            }

        });


        colorempty = IpStkDetList;

        colorempty = $.grep(colorempty, function (v) {
            return (v.itmid == IId && v.clrid == CId && v.sizeid == SId && v.jobordno == jmid && v.opitmid == opItmid && v.opclrid == OpClrid && v.opsizeid == OpSizeid && v.prodpgmno == ProductionPgmNo);
        });
        //IpStkDetList = [];
        //IpStkDetList = colorempty;



        InputStkdetTab(colorempty);


        if (IpSaveStkDetList.length > 0) {


            var pid = [];
            var bal = [];
            var qty = [];

            for (var t = 0; t < IpSaveJobDetList.length; t++) {
                if (IpSaveJobDetList[t].itmid == IId && IpSaveJobDetList[t].clrid == CId && IpSaveJobDetList[t].sizeid == SId && IpSaveJobDetList[t].jobordno == jmid
                    && IpSaveJobDetList[t].opitmid == opItmid && IpSaveJobDetList[t].opsizeid == OpSizeid && IpSaveJobDetList[t].opclrid == OpClrid && IpSaveJobDetList[t].prodpgmno == ProductionPgmNo) {
                    pid.push(IpSaveJobDetList[t].sno);
                    bal.push(IpSaveJobDetList[t].allow);
                    qty.push(IpSaveJobDetList[t].ordqty);

                }
            }

            var son = [];
            var jid = [];
            for (var u = 0; u < IpSaveJobDetList.length; u++) {
                for (var r = 0; r < pid.length; r++) {
                    if (IpSaveJobDetList[u].sno == pid[r]) {
                        IpSaveJobDetList[u].ordqty = qty[r];
                        son.push(IpSaveJobDetList[u].ordqty);
                        jid.push(IpSaveJobDetList[u].jobordno);
                    }
                    //if (OSItemList[u].OItemid == IId && OSItemList[u].OColorid == CId && OSItemList[u].OSizeid == SId && OSItemList[u].OUomid == PUId) {
                    //    OSItemList[u].IssueQty = qty[r];
                    //}
                }
            }



            var sid = [];
            var bal = [];
            var qty = [];
            for (var t = 0; t < IpSaveStkDetList.length; t++) {
                if (IpSaveStkDetList[t].itmid == IId && IpSaveStkDetList[t].clrid == CId && IpSaveStkDetList[t].sizeid == SId && IpSaveStkDetList[t].jobordno == jmid
                    && IpSaveStkDetList[t].opitmid == opItmid && IpSaveStkDetList[t].opsizeid == OpSizeid && IpSaveStkDetList[t].opclrid == OpClrid && IpSaveStkDetList[t].prodpgmno == ProductionPgmNo) {
                    sid.push(IpSaveStkDetList[t].stockid);
                    bal.push(IpSaveStkDetList[t].allow);
                    qty.push(IpSaveStkDetList[t].issues);
                }
            }

            var c = sid.length;
            var t = 0;

            //if (Val > bal[0]) {
            //qty[0] = Val;
            //}

            if (son[0] < bal[0]) {
                qty[0] = son[0];

                for (var l = 1; l < qty.length; l++) {
                    qty[l] = 0;
                }
            }
            else {
                for (var r = 0; r < c; r++) {
                    if (r == 0) {
                        if (bal[r] <= value) {
                            qty[r] = bal[r];
                            t = value - bal[r];
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

            var stkempty = [];

            var stkid = [];
            for (var u = 0; u < IpSaveStkDetList.length; u++) {
                for (var r = 0; r < sid.length; r++) {
                    if (IpSaveStkDetList[u].stockid == sid[r] && IpSaveStkDetList[u].opitmid == opItmid && IpSaveStkDetList[u].opsizeid == OpSizeid && IpSaveStkDetList[u].opclrid == OpClrid && IpSaveStkDetList[u].jobordno == jmid && IpSaveStkDetList[u].prodpgmno == ProductionPgmNo) {
                        IpSaveStkDetList[u].issues = qty[r];
                        stkid.push(IpSaveStkDetList[u].stockid);
                    }


                }
            }

            //for (var e = 0; e < IpStkDetList.length; e++) {
            //    for (var r = 0; r < sid.length; r++) {
            //        if (IpStkDetList[e].stockid == sid[r]) {
            //            IpStkDetList[e].issues = qty[r];
            //        }
            //    }
            //}

            //InputStkdetTab(IpStkDetList);
            // InputSaveStkdetTab(IpSaveStkDetList);

            //var table = $('#inputsavestkdettab').DataTable();
            //var ecdata = table.rows().data();

            //$('input[id=txtipissueqty]').each(function (ig) {

            //    var row = $(this).closest('tr');
            //    for (var h = 0; h < IpSaveStkDetList.length; h++) {

            //        if (ig == h && ecdata[ig].clrid == IpSaveStkDetList[h].clrid && ecdata[ig].itmid == IpSaveStkDetList[h].itmid && ecdata[ig].sizeid == IpSaveStkDetList[h].sizeid) {

            //            var issues = IpSaveStkDetList[h].issues;

            //            row.find('#txtiptissQty').val(issues);

            //        }
            //    }

            //});

            var colorempty = [];
            for (var u = 0; u < IpSaveStkDetList.length; u++) {
                for (var r = 0; r < IpStkDetList.length; r++) {
                    if (IpSaveStkDetList[u].stockid == IpStkDetList[r].stockid && IpSaveStkDetList[u].opitmid == opItmid && IpSaveStkDetList[u].opsizeid == OpSizeid && IpSaveStkDetList[u].opclrid == OpClrid && IpSaveStkDetList[u].jobordno == jmid && IpSaveStkDetList[u].prodpgmno == ProductionPgmNo) {
                        IpStkDetList[r].issues = IpSaveStkDetList[u].issues;
                        //stkid.push(IpSaveStkDetList[u].stockid);
                    }


                }
            }

            colorempty = IpStkDetList;

            colorempty = $.grep(colorempty, function (v) {
                return (v.itmid == IId && v.clrid == CId && v.sizeid == SId && v.jobordno == jmid && v.opitmid == opItmid && v.opclrid == OpClrid && v.opsizeid == OpSizeid && v.prodpgmno == ProductionPgmNo);
            });
            //IpStkDetList = [];
            //IpStkDetList = colorempty;



            InputStkdetTab(colorempty);

            //var table = $('#inputstkdettab').DataTable();
            //var ecdata = table.rows().data();

            //$('input[id=txtiptissQty]').each(function (ig) {

            //    var row = $(this).closest('tr');
            //    for (var h = 0; h < IpStkDetList.length; h++) {

            //        if (ig == h && ecdata[ig].clrid == IpStkDetList[h].clrid && ecdata[ig].itmid == IpStkDetList[h].itmid && ecdata[ig].sizeid == IpStkDetList[h].sizeid) {

            //            var issues = IpStkDetList[h].issues;

            //            row.find('#txtiptissQty').val(issues);

            //        }
            //    }

            //});


        }

        //Datatable textbox focus
        var rows = $("#inputjodettab").dataTable().fnGetNodes();
        var dtTable = $('#inputjodettab').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
            $('input[id=txtiptjobOrdQty]').each(function () {
                if (sn == pid && $(this).val() == val) {
                    var row = $(this).closest('tr');
                    //var num = row.find('#txtiptjobOrdQty').val();
                    row.find('#txtiptjobOrdQty').focus().val('').val(value);
                    return true;
                }
            });
        }


    });
    $(document).on('keyup', '.calcStockqty', function () {
        debugger;

        var table = $('#inputstkdettab').DataTable();

        var IId = table.row($(this).parents('tr')).data()["itmid"];
        var CId = table.row($(this).parents('tr')).data()["clrid"];
        var SId = table.row($(this).parents('tr')).data()["sizeid"];
        var CSno = table.row($(this).parents('tr')).data()["sno"];
        var balstk = table.row($(this).parents('tr')).data()["allow"];
        var jm = table.row($(this).parents('tr')).data()["jobordno"];
        var itmstkid = table.row($(this).parents('tr')).data()["stockid"];

        var value = $(this).val();

        //currentrowstk = [];
        //for (var w = 0; w < IpSaveJobDetList.length; w++) {
        //    if (IpSaveJobDetList[w].jobordno == jm && IpSaveJobDetList[w].itmid == IId && IpSaveJobDetList[w].clrid == CId && IpSaveJobDetList[w].sizeid == SId && IpSaveJobDetList[w].jobordno == jm
        //        && IpSaveJobDetList[w].opitmid == opItmid && IpSaveJobDetList[w].opsizeid == OpSizeid && IpSaveJobDetList[w].opclrid == OpClrid) {
        //        currentrowstk.push(IpSaveJobDetList[w]);
        //        var jno = currentrowstk[0].jobordno;
        //        // Itmstkid = currentrow[0].ItemStockId;
        //        var balq = currentrowstk[0].allow;
        //    }
        //}

        //if (value == 0) {
        //    $.each(IpStkDetList, function () {
        //        if (this.stockid == itmstkid && this.opitmid == opItmid && this.opsizeid == OpSizeid && this.opclrid == OpClrid && this.jobordno == jm) {

        //            if (balstk >= value) {
        //                if (balq >= value) {
        //                    this.issues = value;
        //                }
        //                else {
        //                    var t = value - balq;
        //                    this.issues = balq;
        //                }
        //            }
        //            else {
        //                var t = value - balstk;
        //                this.issues = balstk;
        //            }

        //        }
        //    });

        //    $.each(IpSaveStkDetList, function () {
        //        if (this.stockid == itmstkid && this.opitmid == opItmid && this.opsizeid == OpSizeid && this.opclrid == OpClrid && this.jobordno == jm) {

        //            if (balstk >= value) {
        //                if (balq >= value) {
        //                    this.issues = value;
        //                }
        //                else {
        //                    var t = value - balq;
        //                    this.issues = balq;
        //                }
        //            }
        //            else {
        //                var t = value - balstk;
        //                this.issues = balstk;
        //            }

        //        }
        //    });

        //    $.each(IpItmList, function () {
        //        if (this.itmid == IId && this.clrid == CId && this.sizeid == SId && this.opitmid == opItmid && this.opsizeid == OpSizeid && this.opclrid == OpClrid) {
        //            //this.issqty = value;
        //            var qty = this.issqty;
        //            this.issqty = parseFloat(qty) + parseFloat(value);
        //        }
        //    });
        //    $.each(IpItmDetList, function () {
        //        if (this.itmid == IId && this.clrid == CId && this.sizeid == SId && this.opitmid == opItmid && this.opsizeid == OpSizeid && this.opclrid == OpClrid) {
        //            //this.issqty = value;
        //            var qty = this.issqty;
        //            this.issqty = parseFloat(qty) + parseFloat(value);
        //        }
        //    });

        //    var currentrow = [];
        //    for (var a = 0; a < IpSaveJobDetList.length; a++) {


        //        if (IpSaveJobDetList[a].jobordno == jm && IpSaveJobDetList[a].itmid == IId && IpSaveJobDetList[a].clrid == CId && IpSaveJobDetList[a].sizeid == SId && IpSaveJobDetList[a].jobordno == jm
        //             && IpSaveJobDetList[a].opitmid == opItmid && IpSaveJobDetList[a].opsizeid == OpSizeid && IpSaveJobDetList[a].opclrid == OpClrid) {
        //            currentrow.push(IpSaveJobDetList[a]);
        //            var jno = currentrow[0].jobordno;
        //            // Itmstkid = currentrow[0].ItemStockId;
        //            var balq = currentrow[0].allow;

        //            if (balq <= balstk) {

        //            }


        //            $.each(IpSaveJobDetList, function () {
        //                //if (this.JoMasId == jm) {
        //                if (this.jobordno == jm && this.itmid == IId && this.clrid == CId && this.sizeid == SId && this.opitmid == opItmid && this.opsizeid == OpSizeid && this.opclrid == OpClrid) {
        //                    if (value >= balstk) {
        //                        //  if (tot < balq) {
        //                        if (balstk >= value) {
        //                            this.ordqty = value;
        //                        }
        //                        else {
        //                            var t = value - balstk;
        //                            this.ordqty = balstk;
        //                        }
        //                        //}
        //                        //else {
        //                        //    this.IssueQty = value;
        //                        //  }
        //                    }
        //                    else {
        //                        if (balq >= value) {
        //                            this.ordqty = value;
        //                        }
        //                        else {
        //                            var t = value - balq;
        //                            this.ordqty = balq;
        //                        }
        //                    }
        //                    //if (balq <= balstk) {
        //                    //    this.IssueQty = balq;
        //                    //}
        //                }
        //            });

        //            $.each(IpJobDetList, function () {
        //                //if (this.JoMasId == jm) {
        //                if (this.jobordno == jm && this.itmid == IId && this.clrid == CId && this.sizeid == SId && this.opitmid == opItmid && this.opsizeid == OpSizeid && this.opclrid == OpClrid) {
        //                    if (value >= balstk) {
        //                        if (balstk >= value) {
        //                            this.ordqty = value;
        //                        }
        //                        else {
        //                            var t = value - balstk;
        //                            this.ordqty = balstk;
        //                        }
        //                    }
        //                    else {
        //                        if (balq >= value) {
        //                            this.ordqty = value;
        //                        }
        //                        else {
        //                            var t = value - balq;
        //                            this.ordqty = balq;
        //                        }
        //                    }

        //                }
        //            });
        //        }
        //    }




        //    var totalamnt = 0;

        //    for (var e = 0; e < IpStkDetList.length; e++) {
        //        var amount = IpStkDetList[e].issues;
        //        totalamnt = totalamnt + parseFloat(amount);
        //    }


        //    $.each(IpSaveJobDetList, function () {
        //        if (this.itmid == IId && this.clrid == CId && this.sizeid == SId && this.jobordno == jm && this.opitmid == opItmid && this.opsizeid == OpSizeid && this.opclrid == OpClrid) {
        //            //this.ordqty = totalamnt;
        //            var qty = this.ordqty;
        //            this.ordqty = parseFloat(qty) + parseFloat(totalamnt);
        //        }
        //    });
        //    $.each(IpJobDetList, function () {
        //        if (this.itmid == IId && this.clrid == CId && this.sizeid == SId && this.jobordno == jm && this.opitmid == opItmid && this.opsizeid == OpSizeid && this.opclrid == OpClrid) {
        //            //this.ordqty = totalamnt;
        //            var qty = this.ordqty;
        //            this.ordqty = parseFloat(qty) + parseFloat(totalamnt);
        //        }
        //    });


        //    var total = 0;

        //    for (var e = 0; e < IpSaveJobDetList.length; e++) {
        //        if (IpSaveJobDetList[e].itmid == IId && IpSaveJobDetList[e].clrid == CId && IpSaveJobDetList[e].sizeid == SId
        //             && IpSaveJobDetList[e].opitmid == opItmid && IpSaveJobDetList[e].opsizeid == OpSizeid && IpSaveJobDetList[e].opclrid == OpClrid) {
        //            var amount = IpSaveJobDetList[e].ordqty;
        //            total = total + parseFloat(amount);
        //        }
        //    }

        //    $.each(IpItmList, function () {
        //        if (this.itmid == IId && this.clrid == CId && this.sizeid == SId && this.jobordno == jm && this.opitmid == opItmid && this.opsizeid == OpSizeid && this.opclrid == OpClrid) {
        //            //this.issqty = total;
        //            //this.ordqty = total;
        //            var qty = this.issqty;
        //            this.issqty = parseFloat(qty) + parseFloat(total);
        //            this.ordqty = parseFloat(qty) + parseFloat(total);
        //        }
        //    });
        //    $.each(IpItmDetList, function () {
        //        if (this.itmid == IId && this.clrid == CId && this.sizeid == SId && this.jobordno == jm && this.opitmid == opItmid && this.opsizeid == OpSizeid && this.opclrid == OpClrid) {
        //            //this.issqty = total;
        //            //this.ordqty = total;
        //            var qty = this.issqty;
        //            this.issqty = parseFloat(qty) + parseFloat(total);
        //            this.ordqty = parseFloat(qty) + parseFloat(total);
        //        }
        //    });
        //    //loadDelStockTable(SItemList);

        //    //InputSaveJobdetTab(IpSaveJobDetList);

        //    //var table = $('#inputsavejodettab').DataTable();
        //    //var ecdata = table.rows().data();
        //    //debugger;
        //    //$('input[id=txtiptsavejobOrdQty]').each(function (ig) {

        //    //    var row = $(this).closest('tr');
        //    //    for (var h = 0; h < IpSaveJobDetList.length; h++) {
        //    //        debugger;
        //    //        if (ig == h && ecdata[ig].clrid == IpSaveJobDetList[h].clrid && ecdata[ig].itmid == IpSaveJobDetList[h].itmid && ecdata[ig].sizeid == IpSaveJobDetList[h].sizeid) {
        //    //            var ordqty = IpSaveJobDetList[h].ordqty;


        //    //            row.find('#txtiptsavejobOrdQty').val(ordqty);

        //    //        }
        //    //    }

        //    //});



        //    //  InputJobdetTab(IpJobDetList);


        //    var colorempty = [];
        //    colorempty = IpSaveJobDetList;

        //    colorempty = $.grep(colorempty, function (v) {
        //        return (v.itmid == IId && v.clrid == CId && v.sizeid == SId && v.jobordno == jm && v.opitmid == opItmid && v.opclrid == OpClrid && v.opsizeid == OpSizeid);
        //    });
        //    //IpJobDetList = [];
        //    //IpJobDetList = colorempty;
        //    InputJobdetTab(colorempty);


        //    //var table = $('#inputjodettab').DataTable();
        //    //var ecdata = table.rows().data();
        //    //debugger;
        //    //$('input[id=txtiptjobOrdQty]').each(function (ig) {

        //    //    var row = $(this).closest('tr');
        //    //    for (var h = 0; h < IpJobDetList.length; h++) {
        //    //        debugger;
        //    //        if (ig == h && ecdata[ig].clrid == IpJobDetList[h].clrid && ecdata[ig].itmid == IpJobDetList[h].itmid && ecdata[ig].sizeid == IpJobDetList[h].sizeid) {
        //    //            var ordqty = IpJobDetList[h].ordqty;


        //    //            row.find('#txtiptjobOrdQty').val(ordqty);

        //    //        }
        //    //    }

        //    //});

        //    //loadDelStockTable(SItemList);

        //    //InputSaveJobdetTab(IpSaveJobDetList);
        //    //InputJobdetTab(IpJobDetList);
        //    //    InputitmTab(IpItmList);


        //    var table = $('#inputitmtab').DataTable();
        //    var ecdata = table.rows().data();
        //    debugger;
        //    $('input[id=txtipRQty]').each(function (ig) {

        //        var row = $(this).closest('tr');
        //        for (var h = 0; h < IpItmDetList.length; h++) {
        //            debugger;
        //            if (ig == h && ecdata[ig].clrid == IpItmDetList[h].clrid && ecdata[ig].itmid == IpItmDetList[h].itmid && ecdata[ig].sizeid == IpItmDetList[h].sizeid) {
        //                var ordqty = IpItmDetList[h].ordqty;
        //                var issqty = IpItmDetList[h].issqty;

        //                row.find('#txtipRQty').val(ordqty);
        //                row.find('#txtipOrdQty').val(issqty);

        //            }
        //        }

        //    });

        //    // InputStkdetTab(IpStkDetList);

        //    //var table = $('#inputstkdettab').DataTable();
        //    //var ecdata = table.rows().data();
        //    //debugger;
        //    //$('input[id=txtiptissQty]').each(function (ig) {

        //    //    var row = $(this).closest('tr');
        //    //    for (var h = 0; h < IpStkDetList.length; h++) {
        //    //        debugger;
        //    //        if (ig == h && ecdata[ig].clrid == IpStkDetList[h].clrid && ecdata[ig].itmid == IpStkDetList[h].itmid && ecdata[ig].sizeid == IpStkDetList[h].sizeid) {

        //    //            var issues = IpStkDetList[h].issues;

        //    //            row.find('#txtiptissQty').val(issues);

        //    //        }
        //    //    }

        //    //});
        //    var colorempty = [];
        //    colorempty = IpSaveStkDetList;

        //    colorempty = $.grep(colorempty, function (v) {
        //        return (v.itmid == IId && v.clrid == CId && v.sizeid == SId && v.jobordno == jm && v.opitmid == opItmid && v.opclrid == OpClrid && v.opsizeid == OpSizeid);
        //    });
        //    //IpStkDetList = [];
        //    //IpStkDetList = colorempty;
        //    InputStkdetTab(colorempty);

        //    //  InputSaveStkdetTab(IpSaveStkDetList);

        //    //var table = $('#inputsavestkdettab').DataTable();
        //    //var ecdata = table.rows().data();
        //    //debugger;
        //    //$('input[id=txtipissueqty]').each(function (ig) {

        //    //    var row = $(this).closest('tr');
        //    //    for (var h = 0; h < IpSaveStkDetList.length; h++) {
        //    //        debugger;
        //    //        if (ig == h && ecdata[ig].clrid == IpSaveStkDetList[h].clrid && ecdata[ig].itmid == IpSaveStkDetList[h].itmid && ecdata[ig].sizeid == IpSaveStkDetList[h].sizeid) {

        //    //            var issues = IpSaveStkDetList[h].issues;

        //    //            row.find('#txtiptissQty').val(issues);

        //    //        }
        //    //    }

        //    //});



        //    return true;
        //}


        var allow = 0;
        var balallow = 0;
        for (j = 0; IpSaveJobDetList.length > j; j++) {
            if (CId == IpSaveJobDetList[j].clrid && IId == IpSaveJobDetList[j].itmid && SId == IpSaveJobDetList[j].sizeid && IpSaveJobDetList[j].jobordno == jm
                && IpSaveJobDetList[j].opitmid == opItmid && IpSaveJobDetList[j].opsizeid == OpSizeid && IpSaveJobDetList[j].opclrid == OpClrid && IpSaveJobDetList[j].prodpgmno == ProductionPgmNo) {
            }
            else {
                var bal = IpSaveJobDetList[j].prgopqty; //+pallown
                var prgqty = IpSaveJobDetList[j].prgopqty;
                var ordqty = IpSaveJobDetList[j].ordqty;
                if (IpSaveJobDetList[j].prgopqty < IpSaveJobDetList[j].ordqty) {
                    var curallow = parseFloat(IpSaveJobDetList[j].ordqty) - parseFloat(IpSaveJobDetList[j].prgopqty)
                    allow = allow + parseFloat(curallow);
                }
            }
        }

        balallow = pallown - allow;

        for (j = 0; IpSaveJobDetList.length > j; j++) {
            if (CId == IpSaveJobDetList[j].clrid && IId == IpSaveJobDetList[j].itmid && SId == IpSaveJobDetList[j].sizeid && IpSaveJobDetList[j].jobordno == jm
                && IpSaveJobDetList[j].opitmid == opItmid && IpSaveJobDetList[j].opsizeid == OpSizeid && IpSaveJobDetList[j].opclrid == OpClrid && IpSaveJobDetList[j].prodpgmno == ProductionPgmNo) {
                var bal = IpSaveJobDetList[j].prgopqty; //+pallown
                var prgqty = IpSaveJobDetList[j].prgopqty;
                var ordqty = IpSaveJobDetList[j].ordqty;
                var allow = 0;
                if (IpSaveJobDetList[j].prgopqty < value) {

                    var totactval = parseFloat(IpSaveJobDetList[j].prgopqty) + balallow;

                    if (totactval < value) {

                        value = parseFloat(totactval).toFixed(3);

                    }
                }
            }
        }

        var totissues = 0;
        for (var t = 0; t < IpStkDetList.length; t++) {
            if (IpStkDetList[t].itmid == IId && IpStkDetList[t].clrid == CId && IpStkDetList[t].sizeid == SId && IpStkDetList[t].jobordno == jm
                && IpStkDetList[t].opitmid == opItmid && IpStkDetList[t].opsizeid == OpSizeid && IpStkDetList[t].opclrid == OpClrid && IpStkDetList[t].prodpgmno == ProductionPgmNo) {
                totissues = totissues + parseFloat(IpStkDetList[t].bal);
            }
        }

        if (totissues < value) {
            value = parseFloat(totissues).toFixed(3);
        }

        //var totalissues = value;
        //for (var t = 0; t < IpSaveStkDetList.length; t++) {
        //    if (IpSaveStkDetList[t].itmid == IId && IpSaveStkDetList[t].clrid == CId && IpSaveStkDetList[t].sizeid == SId && IpSaveStkDetList[t].jobordno == jm
        //        && IpSaveStkDetList[t].opitmid == opItmid && IpSaveStkDetList[t].opsizeid == OpSizeid && IpSaveStkDetList[t].opclrid == OpClrid) {

        //        if (IpSaveStkDetList[t].bal < totalissues) {
        //            IpSaveStkDetList[t].issues = IpSaveStkDetList[t].bal;
        //            totalissues = totalissues - parseFloat(IpSaveStkDetList[t].bal);
        //        }
        //        else {
        //            IpSaveStkDetList[t].issues = totalissues;
        //        }
        //    }
        //}

        var totalissues = value;
        for (var t = 0; t < IpStkDetList.length; t++) {
            if (IpStkDetList[t].itmid == IId && IpStkDetList[t].clrid == CId && IpStkDetList[t].sizeid == SId && IpStkDetList[t].jobordno == jm
                && IpStkDetList[t].opitmid == opItmid && IpStkDetList[t].opsizeid == OpSizeid && IpStkDetList[t].opclrid == OpClrid && IpStkDetList[t].stockid == itmstkid && IpStkDetList[t].prodpgmno == ProductionPgmNo) {

                if (IpStkDetList[t].bal < totalissues) {
                    IpStkDetList[t].issues = IpStkDetList[t].bal;
                    totalissues = totalissues - parseFloat(IpStkDetList[t].bal);
                }
                else {
                    IpStkDetList[t].issues = totalissues;
                }
            }
        }


        for (var s = 0; s < IpStkDetList.length; s++) {
            for (var t = 0; t < IpSaveStkDetList.length; t++) {
                if (IpSaveStkDetList[t].itmid == IpStkDetList[s].itmid && IpSaveStkDetList[t].clrid == IpStkDetList[s].clrid && IpSaveStkDetList[t].sizeid == IpStkDetList[s].sizeid && IpSaveStkDetList[t].jobordno == IpStkDetList[s].jobordno
                    && IpSaveStkDetList[t].opitmid == opItmid && IpSaveStkDetList[t].opsizeid == OpSizeid && IpSaveStkDetList[t].opclrid == OpClrid && IpSaveStkDetList[t].stockid == IpStkDetList[s].stockid && IpSaveStkDetList[t].prodpgmno == ProductionPgmNo) {

                    // if (IpSaveStkDetList[t].bal < totalissues) {
                    IpSaveStkDetList[t].issues = IpStkDetList[s].issues;
                    // totalissues = totalissues - parseFloat(IpSaveStkDetList[t].bal);
                    //}
                    //else {
                    //    IpSaveStkDetList[t].issues = totalissues;
                    //}
                }
            }
        }



        var totalissuesstkqty = 0;
        for (var t = 0; t < IpStkDetList.length; t++) {
            if (IpStkDetList[t].itmid == IId && IpStkDetList[t].clrid == CId && IpStkDetList[t].sizeid == SId && IpStkDetList[t].jobordno == jm
                && IpStkDetList[t].opitmid == opItmid && IpStkDetList[t].opsizeid == OpSizeid && IpStkDetList[t].opclrid == OpClrid && IpStkDetList[t].prodpgmno == ProductionPgmNo) {
                totalissuesstkqty = totalissuesstkqty + parseFloat(IpStkDetList[t].issues);
            }
        }




        $.each(IpSaveJobDetList, function () {
            if (CId == this.clrid && IId == this.itmid && SId == this.sizeid && this.jobordno == jm
                && this.opitmid == opItmid && this.opsizeid == OpSizeid && this.opclrid == OpClrid && this.prodpgmno == ProductionPgmNo) {
                this.ordqty = totalissuesstkqty;
                this.issqty = totalissuesstkqty;
            }
        });
        $.each(IpJobDetList, function () {
            if (CId == this.clrid && IId == this.itmid && SId == this.sizeid && this.jobordno == jm
               && this.opitmid == opItmid && this.opsizeid == OpSizeid && this.opclrid == OpClrid && this.prodpgmno == ProductionPgmNo) {
                this.ordqty = totalissuesstkqty;
            }
        });


        var total = 0;

        for (var e = 0; e < IpSaveJobDetList.length; e++) {
            if (IpSaveJobDetList[e].itmid == IId && IpSaveJobDetList[e].clrid == CId && IpSaveJobDetList[e].sizeid == SId
                 && IpSaveJobDetList[e].opitmid == opItmid && IpSaveJobDetList[e].opsizeid == OpSizeid && IpSaveJobDetList[e].opclrid == OpClrid ) {
                var amount = IpSaveJobDetList[e].ordqty;
                total = total + parseFloat(amount);
            }
        }

        $.each(IpItmList, function () {
            if (this.itmid == IId && this.clrid == CId && this.sizeid == SId && this.opitmid == opItmid && this.opsizeid == OpSizeid && this.opclrid == OpClrid ) {
                //this.issqty = total;
                //this.ordqty = total;
                var qty = this.issqty;
                this.issqty = parseFloat(total);
                this.ordqty = parseFloat(total);
            }
        });
        $.each(IpItmDetList, function () {
            if (this.itmid == IId && this.clrid == CId && this.sizeid == SId && this.opitmid == opItmid && this.opsizeid == OpSizeid && this.opclrid == OpClrid ) {
                //this.issqty = total;
                //this.ordqty = total;
                var qty = this.issqty;
                this.issqty = parseFloat(total);
                this.ordqty = parseFloat(total);
            }
        });


        var table = $('#inputitmtab').DataTable();
        var ecdata = table.rows().data();

        $('input[id=txtipRQty]').each(function (ig) {

            var row = $(this).closest('tr');
            for (var h = 0; h < IpItmDetList.length; h++) {

                if (ig == h && ecdata[ig].clrid == IpItmDetList[h].clrid && ecdata[ig].itmid == IpItmDetList[h].itmid && ecdata[ig].sizeid == IpItmDetList[h].sizeid) {
                    var ordqty = IpItmDetList[h].ordqty;
                    var issqty = IpItmDetList[h].issqty;

                    row.find('#txtipRQty').val(ordqty);
                    row.find('#txtipOrdQty').val(issqty);

                }
            }

        });






        //$.each(IpStkDetList, function () {
        //    if (this.stockid == itmstkid && this.opitmid == opItmid && this.opsizeid == OpSizeid && this.opclrid == OpClrid && this.jobordno == jm) {

        //        if (balstk >= value) {
        //            if (balq >= value) {
        //                this.issues = value;
        //            }
        //            else {
        //                var t = value - balq;
        //                this.issues = balq;
        //            }
        //        }
        //        else {
        //            var t = value - balstk;
        //            this.issues = balstk;
        //        }

        //    }
        //});

        //$.each(IpSaveStkDetList, function () {
        //    if (this.stockid == itmstkid && this.opitmid == opItmid && this.opsizeid == OpSizeid && this.opclrid == OpClrid && this.jobordno == jm) {

        //        if (balstk >= value) {
        //            if (balq >= value) {
        //                this.issues = value;
        //            }
        //            else {
        //                var t = value - balq;
        //                this.issues = balq;
        //            }
        //        }
        //        else {
        //            var t = value - balstk;
        //            this.issues = balstk;
        //        }

        //    }
        //});

        //var tot = 0;
        //for (var d = 0; d < IpSaveStkDetList.length; d++) {
        //    if (IpSaveStkDetList[d].jobordno == jm && IpSaveStkDetList[d].itmid == IId && IpSaveStkDetList[d].clrid == CId && IpSaveStkDetList[d].sizeid == SId
        //         && IpSaveStkDetList[d].opitmid == opItmid && IpSaveStkDetList[d].opsizeid == OpSizeid && IpSaveStkDetList[d].opclrid == OpClrid) {
        //        var at = IpSaveStkDetList[d].quantity;
        //        tot = tot + parseFloat(at);
        //    }
        //}
        ////var isqty = parseFloat(tot) + value;
        //if (tot > balq) {
        //    alert('Should not exceed Bal Qty in JobOrder table');
        //    return true;
        //}

        //var currentrow = [];
        //for (var a = 0; a < IpSaveJobDetList.length; a++) {


        //    if (IpSaveJobDetList[a].jobordno == jm && IpSaveJobDetList[a].itmid == IId && IpSaveJobDetList[a].clrid == CId && IpSaveJobDetList[a].sizeid == SId
        //         && IpSaveJobDetList[a].opitmid == opItmid && IpSaveJobDetList[a].opsizeid == OpSizeid && IpSaveJobDetList[a].opclrid == OpClrid) {
        //        currentrow.push(IpSaveJobDetList[a]);
        //        var jno = currentrow[0].jobordno;
        //        // Itmstkid = currentrow[0].ItemStockId;
        //        var balq = currentrow[0].allow;

        //        if (balq <= balstk) {

        //        }


        //        $.each(IpSaveJobDetList, function () {
        //            //if (this.JoMasId == jm) {
        //            if (this.jobordno == jm && this.itmid == IId && this.clrid == CId && this.sizeid == SId && this.opitmid == opItmid && this.opsizeid == OpSizeid && this.opclrid == OpClrid) {
        //                if (value >= balstk) {
        //                    //  if (tot < balq) {
        //                    if (balstk >= value) {
        //                        this.ordqty = value;
        //                    }
        //                    else {
        //                        var t = value - balstk;
        //                        this.ordqty = balstk;
        //                    }
        //                    //}
        //                    //else {
        //                    //    this.IssueQty = value;
        //                    //  }
        //                }
        //                else {
        //                    if (balq >= value) {
        //                        this.ordqty = value;
        //                    }
        //                    else {
        //                        var t = value - balq;
        //                        this.ordqty = balq;
        //                    }
        //                }
        //                //if (balq <= balstk) {
        //                //    this.IssueQty = balq;
        //                //}
        //            }
        //        });

        //        $.each(IpJobDetList, function () {
        //            //if (this.JoMasId == jm) {
        //            if (this.jobordno == jm && this.itmid == IId && this.clrid == CId && this.sizeid == SId && this.opitmid == opItmid && this.opsizeid == OpSizeid && this.opclrid == OpClrid) {
        //                if (value >= balstk) {
        //                    if (balstk >= value) {
        //                        this.ordqty = value;
        //                    }
        //                    else {
        //                        var t = value - balstk;
        //                        this.ordqty = balstk;
        //                    }
        //                }
        //                else {
        //                    if (balq >= value) {
        //                        this.ordqty = value;
        //                    }
        //                    else {
        //                        var t = value - balq;
        //                        this.ordqty = balq;
        //                    }
        //                }

        //            }
        //        });
        //    }
        //}




        //var totalamnt = 0;

        //for (var e = 0; e < IpStkDetList.length; e++) {
        //    if (IpStkDetList[e].itmid == IId && IpStkDetList[e].clrid == CId && IpStkDetList[e].sizeid == SId) {
        //        var amount = IpStkDetList[e].issues;
        //        totalamnt = totalamnt + parseFloat(amount);
        //    }
        //    //var amount = IpStkDetList[e].issues;
        //    //totalamnt = totalamnt + parseFloat(amount);
        //}


        //$.each(IpSaveJobDetList, function () {
        //    if (this.itmid == IId && this.clrid == CId && this.sizeid == SId && this.jobordno == jm && this.opitmid == opItmid && this.opsizeid == OpSizeid && this.opclrid == OpClrid) {
        //        //this.ordqty = totalamnt;
        //        var qty = this.ordqty;
        //        this.ordqty = parseFloat(totalamnt);
        //    }
        //});
        //$.each(IpJobDetList, function () {
        //    if (this.itmid == IId && this.clrid == CId && this.sizeid == SId && this.jobordno == jm && this.opitmid == opItmid && this.opsizeid == OpSizeid && this.opclrid == OpClrid) {
        //        //this.ordqty = totalamnt;
        //        var qty = this.ordqty;
        //        this.ordqty = parseFloat(totalamnt);
        //    }
        //});


        //var total = 0;

        //for (var e = 0; e < IpSaveJobDetList.length; e++) {
        //    if (IpSaveJobDetList[e].itmid == IId && IpSaveJobDetList[e].clrid == CId && IpSaveJobDetList[e].sizeid == SId
        //         && IpSaveJobDetList[e].opitmid == opItmid && IpSaveJobDetList[e].opsizeid == OpSizeid && IpSaveJobDetList[e].opclrid == OpClrid) {
        //        var amount = IpSaveJobDetList[e].ordqty;
        //        total = total + parseFloat(amount);
        //    }
        //}

        //$.each(IpItmList, function () {
        //    if (this.itmid == IId && this.clrid == CId && this.sizeid == SId && this.opitmid == opItmid && this.opsizeid == OpSizeid && this.opclrid == OpClrid) {
        //        //this.issqty = total;
        //        //this.ordqty = total;
        //        var qty = this.issqty;
        //        this.issqty = parseFloat(total);
        //        this.ordqty = parseFloat(total);
        //    }
        //});
        //$.each(IpItmDetList, function () {
        //    if (this.itmid == IId && this.clrid == CId && this.sizeid == SId && this.opitmid == opItmid && this.opsizeid == OpSizeid && this.opclrid == OpClrid) {
        //        //this.issqty = total;
        //        //this.ordqty = total;
        //        var qty = this.issqty;
        //        this.issqty = parseFloat(total);
        //        this.ordqty = parseFloat(total);
        //    }
        //});
        //loadDelStockTable(SItemList);

        // InputSaveJobdetTab(IpSaveJobDetList);

        //var table = $('#inputsavejodettab').DataTable();
        //var ecdata = table.rows().data();
        //debugger;
        //$('input[id=txtiptsavejobOrdQty]').each(function (ig) {

        //    var row = $(this).closest('tr');
        //    for (var h = 0; h < IpSaveJobDetList.length; h++) {
        //        debugger;
        //        if (ig == h && ecdata[ig].clrid == IpSaveJobDetList[h].clrid && ecdata[ig].itmid == IpSaveJobDetList[h].itmid && ecdata[ig].sizeid == IpSaveJobDetList[h].sizeid) {
        //            var ordqty = IpSaveJobDetList[h].ordqty;


        //            row.find('#txtiptsavejobOrdQty').val(ordqty);

        //        }
        //    }

        //});


        //var colorempty = [];
        //colorempty = IpSaveJobDetList;

        //colorempty = $.grep(colorempty, function (v) {
        //    return (v.itmid == IId && v.clrid == CId && v.sizeid == SId && v.jobordno == jm && v.opitmid == opItmid && v.opclrid == OpClrid && v.opsizeid == OpSizeid);
        //});
        //IpJobDetList = [];
        //IpJobDetList = colorempty;
        InputJobdetTab(IpJobDetList);


        // InputJobdetTab(IpJobDetList);

        //var table = $('#inputjodettab').DataTable();
        //var ecdata = table.rows().data();
        //debugger;
        //$('input[id=txtiptjobOrdQty]').each(function (ig) {

        //    var row = $(this).closest('tr');
        //    for (var h = 0; h < IpJobDetList.length; h++) {
        //        debugger;
        //        if (ig == h && ecdata[ig].clrid == IpJobDetList[h].clrid && ecdata[ig].itmid == IpJobDetList[h].itmid && ecdata[ig].sizeid == IpJobDetList[h].sizeid) {
        //            var ordqty = IpJobDetList[h].ordqty;


        //            row.find('#txtiptjobOrdQty').val(ordqty);

        //        }
        //    }

        //});


        //InputitmTab(IpItmList);


        //var table = $('#inputitmtab').DataTable();
        //var ecdata = table.rows().data();
        //debugger;
        //$('input[id=txtipRQty]').each(function (ig) {
        //    debugger;

        //    var row = $(this).closest('tr');

        //    for (var h = 0; h < IpItmDetList.length; h++) {
        //        debugger;
        //        if (ig == h && ecdata[ig].clrid == IpItmDetList[h].clrid && ecdata[ig].itmid == IpItmDetList[h].itmid && ecdata[ig].sizeid == IpItmDetList[h].sizeid) {
        //            var ordqty = IpItmDetList[h].ordqty;
        //            var issqty = IpItmDetList[h].issqty;

        //            row.find('#txtipRQty').val(ordqty);
        //            row.find('#txtipOrdQty').val(issqty);
        //        }
        //    }

        //});
        //// InputStkdetTab(IpStkDetList);

        var table = $('#inputstkdettab').DataTable();
        var ecdata = table.rows().data();
        debugger;
        $('input[id=txtiptissQty]').each(function (ig) {

            var row = $(this).closest('tr');
            for (var h = 0; h < IpStkDetList.length; h++) {
                debugger;
                if (ecdata[ig].clrid == IpStkDetList[h].clrid && ecdata[ig].itmid == IpStkDetList[h].itmid && ecdata[ig].sizeid == IpStkDetList[h].sizeid
                    && ecdata[ig].opitmid == opItmid && ecdata[ig].opclrid == OpClrid && ecdata[ig].opsizeid == OpSizeid && ecdata[ig].stockid == itmstkid && IpStkDetList[h].stockid == itmstkid && IpStkDetList[h].prodpgmno == ProductionPgmNo) {

                    var issues = IpStkDetList[h].issues;
                    //row.find('#txtiptissQty').val(issues);
                    //var num = row.find('#txtiptissQty').val();
                    row.find('#txtiptissQty').focus().val('').val(issues);
                    return true;
                }
            }

        });


        //  InputSaveStkdetTab(IpSaveStkDetList);

        //var table = $('#inputsavestkdettab').DataTable();
        //var ecdata = table.rows().data();
        //debugger;
        //$('input[id=txtipissueqty]').each(function (ig) {

        //    var row = $(this).closest('tr');
        //    for (var h = 0; h < IpSaveStkDetList.length; h++) {
        //        debugger;
        //        if (ig == h && ecdata[ig].clrid == IpSaveStkDetList[h].clrid && ecdata[ig].itmid == IpSaveStkDetList[h].itmid && ecdata[ig].sizeid == IpSaveStkDetList[h].sizeid) {

        //            var issues = IpSaveStkDetList[h].issues;

        //            row.find('#txtiptissQty').val(issues);

        //        }
        //    }

        //});

        //Datatable textbox focus
        //var rows = $("#inputstkdettab").dataTable().fnGetNodes();
        //var dtTable = $('#inputstkdettab').DataTable();
        //for (var i = 0; i < rows.length; i++) {
        //    var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
        //    $('input[id=txtiptissQty]').each(function () {
        //        if (sn == itmstkid) {
        //            var row = $(this).closest('tr');
        //            var num = row.find('#txtiptissQty').val();
        //            row.find('#txtiptissQty').focus().val('').val(num);
        //            return true;
        //        }
        //    });
        //}
    });

    $(document).on('change', '#txtJobLooplen', function () {
        debugger;
        var table = $('#outputjodettab').DataTable();

        var pid = table.row($(this).parents('tr')).data()["sno"];
        var itmid = table.row($(this).parents('tr')).data()["itmid"];
        var colorid = table.row($(this).parents('tr')).data()["clrid"];
        var sizeid = table.row($(this).parents('tr')).data()["sizeid"];
        var balq = table.row($(this).parents('tr')).data()["allow"];
        var psid = table.row($(this).parents('tr')).data()["plansizeid"];
        var apprate = table.row($(this).parents('tr')).data()["apprate"];
        var rate = table.row($(this).parents('tr')).data()["rate"];

        var value = $(this).val();

        $.each(OpSaveJobDetList, function () {
            if (this.itmid == itmid && this.clrid == colorid && this.plansizeid == psid) {
                this.Loop_Len = (value);

            }
        });

        $.each(OpJobDetList, function () {
            if (this.itmid == itmid && this.clrid == colorid && this.plansizeid == psid) {
                this.Loop_Len = (value);

            }
        });

        //$.each(OpSaveJobDetList, function () {
        //    if (this.sno == pid) {
        //        this.Loop_Len = parseFloat(value);
        //    }
        //});

        //$.each(OpJobDetList, function () {
        //    if (this.sno == pid) {
        //        this.Loop_Len = parseFloat(value);
        //    }
        //});

     
        $.each(OpItmList, function () {
            if (this.itmid == itmid && this.clrid == colorid && this.plansizeid == psid) {
                this.Loop_Len = (value);
               
            }
        });
     
        var otable = $('#outputitmtab').DataTable();
        var odata = otable.rows().data();

        $('input[id=txtLooplen]').each(function (ig) {
            if (odata[ig].itmid == itmid && odata[ig].clrid == colorid && odata[ig].plansizeid == psid) {
                var row = $(this).closest('tr');
                row.find('#txtLooplen').val((value));
            }
        });

        var otable = $('#outputjodettab').DataTable();
        var odata = otable.rows().data();

        $('input[id=txtJobLooplen]').each(function (ig) {
            if (odata[ig].itmid == itmid && odata[ig].clrid == colorid && odata[ig].plansizeid == psid ) {
                var row = $(this).closest('tr');
                // row.find('#txtOpOrdQty').val(totalamnt);
                row.find('#txtJobLooplen').val('').val(value);
            }
        });

    });

    $(document).on('change', '#txtJobGauge', function () {
        debugger;
        var table = $('#outputjodettab').DataTable();

        var pid = table.row($(this).parents('tr')).data()["sno"];
        var itmid = table.row($(this).parents('tr')).data()["itmid"];
        var colorid = table.row($(this).parents('tr')).data()["clrid"];
        var sizeid = table.row($(this).parents('tr')).data()["sizeid"];
        var balq = table.row($(this).parents('tr')).data()["allow"];
        var psid = table.row($(this).parents('tr')).data()["plansizeid"];
        var apprate = table.row($(this).parents('tr')).data()["apprate"];
        var rate = table.row($(this).parents('tr')).data()["rate"];

        var value = $(this).val();

        $.each(OpSaveJobDetList, function () {
            if (this.itmid == itmid && this.clrid == colorid && this.plansizeid == psid) {
                this.Gauge = value;

            }
        });

        $.each(OpJobDetList, function () {
            if (this.itmid == itmid && this.clrid == colorid && this.plansizeid == psid) {
                this.Gauge = value;

            }
        });

        //$.each(OpSaveJobDetList, function () {
        //    if (this.sno == pid) {
        //        this.Loop_Len = parseFloat(value);
        //    }
        //});

        //$.each(OpJobDetList, function () {
        //    if (this.sno == pid) {
        //        this.Loop_Len = parseFloat(value);
        //    }
        //});


        $.each(OpItmList, function () {
            if (this.itmid == itmid && this.clrid == colorid && this.plansizeid == psid) {
                this.Gauge = value;

            }
        });

        var otable = $('#outputitmtab').DataTable();
        var odata = otable.rows().data();

        $('input[id=txtGauge]').each(function (ig) {
            if (odata[ig].itmid == itmid && odata[ig].clrid == colorid && odata[ig].plansizeid == psid) {
                var row = $(this).closest('tr');
                row.find('#txtGauge').val((value));
            }
        });

        var otable = $('#outputjodettab').DataTable();
        var odata = otable.rows().data();

        $('input[id=txtJobGauge]').each(function (ig) {
            if (odata[ig].itmid == itmid && odata[ig].clrid == colorid && odata[ig].plansizeid == psid ) {
                var row = $(this).closest('tr');
                // row.find('#txtOpOrdQty').val(totalamnt);
                row.find('#txtJobGauge').val('').val(value);
            }
        });

    });

    $('#inputitmtab').on('click', 'tr', function (e) {
        if (balallow < pallown) {
            balallow = 0;
            for (j = 0; IpSaveJobDetList.length > j; j++) {

                if (IpSaveJobDetList[j].ordqty > 0) {
                    var ordqty = IpSaveJobDetList[j].ordqty;
                    var allow = IpSaveJobDetList[j].prgopqty + pallown;
                    var progqty = IpSaveJobDetList[j].prgopqty;
                    if (progqty < ordqty) {
                        var bal = 0;
                        bal = (allow - ordqty);
                        bal = pallown - bal;
                        balallow = balallow + bal;
                    }
                }
            }
            for (k = 0; IpSaveJobDetList.length > k; k++) {
                IpSaveJobDetList[k].allow = (IpSaveJobDetList[k].prgopqty + pallown) - balallow;

            }
        }

        var table = $('#inputitmtab').DataTable();

        //var ItmId = table.row($(this).parents('tr')).data()["itmid"];
        //var ClrId = table.row($(this).parents('tr')).data()["clrid"];
        //var SzId = table.row($(this).parents('tr')).data()["sizeid"];

        var row = $(this).closest('tr');
        var data = $('#inputitmtab').dataTable().fnGetData(row);


        var ItmId = data.itmid;
        var ClrId = data.clrid;
        var SzId = data.sizeid;



        var OQty = $(this).closest('tr').find('#txtRQty').val();


        var colorempty = [];
        colorempty = IpJobDetList;

        colorempty = $.grep(colorempty, function (v) {
            return (v.itmid === ItmId && v.clrid === ClrId && v.sizeid === SzId && v.opitmid == opItmid && v.opclrid == OpClrid && v.opsizeid == OpSizeid);
        });

        //IpJobDetList = colorempty;
        InputJobdetTab(colorempty);


        var ItmId = colorempty[0]['itmid'];
        var ClrId = colorempty[0]['clrid'];
        var SzId = colorempty[0]['sizeid'];
        var jobno = colorempty[0]['jobordno'];
        var Stkempty = [];
        Stkempty = IpStkDetList;

        Stkempty = $.grep(Stkempty, function (v) {
            return (v.itmid == ItmId && v.clrid == ClrId && v.sizeid == SzId && v.opitmid == opItmid && v.opclrid == OpClrid && v.opsizeid == OpSizeid
                && v.jobordno == jobno);
        });

        //IpStkDetList = Stkempty;
        InputStkdetTab(Stkempty);

        var resstk = [];
        stkrow = [];
        // stkrow = IpSaveStkDetList;
        for (i = 0; IpJobDetList.length > i; i++) {

            var ItmId = IpJobDetList[i]['itmid'];
            var ClrId = IpJobDetList[i]['clrid'];
            var SzId = IpJobDetList[i]['sizeid'];
            var jobno = IpJobDetList[i]['jobordno'];


            resstk = $.grep(IpSaveStkDetList, function (v) {
                return (v.itmid == ItmId && v.clrid == ClrId && v.sizeid == SzId && v.jobordno == jobno && v.opitmid == opItmid && v.opclrid == OpClrid && v.opsizeid == OpSizeid);
            });

            stkrow.push(resstk);
        }
        totalstkrow = 0;

        for (j = 0; stkrow.length > j; j++) {

            totalstkrow = totalstkrow + stkrow[j][0].bal;
        }
    });

    $('#outputjodettab').on('click', 'tr', function (e) {

        if (opbalallow < pallown) {
            opbalallow = 0;
            for (j = 0; OpSaveJobDetList.length > j; j++) {

                if (OpSaveJobDetList[j].ordqty > 0) {
                    var ordqty = OpSaveJobDetList[j].ordqty;
                    var allow = OpSaveJobDetList[j].prgopqty + pallown;
                    var progqty = OpSaveJobDetList[j].prgopqty;
                    if (progqty < ordqty) {
                        var bal = 0;
                        bal = (allow - ordqty);
                        bal = pallown - bal;
                        opbalallow = opbalallow + bal;
                    }
                }
            }
            for (k = 0; OpSaveJobDetList.length > k; k++) {
                OpSaveJobDetList[k].allow = (OpSaveJobDetList[k].prgopqty + pallown) - opbalallow;

            }
        }
    })


    $('#tblmaindetails').on('click', 'tr', function (e) {
        debugger;

        var table = $('#tblmaindetails').DataTable();

        var row = $(this).closest('tr');
        var data = $('#tblmaindetails').dataTable().fnGetData(row);


        var ItmId = data[0];
        processname = data[5];
        processsetup = data[10];
        $('input[id=groupclo]').each(function () {
            var row = $(this).closest('tr');
            if ($(this).is(':checked')) {
                var val = $(this).val();
                for (var d = 0; d < Mloadlist.length; d++) {
                    if (Mloadlist[d].productionordid == ItmId && Mloadlist[d].CheckClos == "N") {
                        // Mloadlist[d].CheckClos = "Y";
                        var cl = "Y";
                        CheckClosure(ItmId, cl);
                    }
                }

            }


        });
        $('input[id=groupclo]').each(function () {
            var row = $(this).closest('tr');
            //if ($(this).is(':Unchecked')) {

            if ($(this).prop("checked") == false) {
                var val = $(this).val();
                for (var d = 0; d < Mloadlist.length; d++) {
                    if (Mloadlist[d].productionordid == ItmId && Mloadlist[d].CheckClos == "Y") {

                        var cl = "N";
                        CheckClosureRev(ItmId, cl);
                    }
                }

            }
        });



        LoadMainOrderDetails(ItmId);


    });
    $('#inputjodettab').on('click', 'tr', function (e) {
        //debugger;
        //if (balallow < pallown) {
        //    balallow = 0;
        //    for (j = 0; IpSaveJobDetList.length > j; j++) {

        //        if (IpSaveJobDetList[j].ordqty > 0) {
        //            var ordqty = IpSaveJobDetList[j].ordqty;
        //            var allow = IpSaveJobDetList[j].prgopqty + pallown;
        //            var progqty = IpSaveJobDetList[j].prgopqty;
        //            if (progqty < ordqty) {
        //                var bal = 0;
        //                bal = (allow - ordqty);
        //                bal = pallown - bal;
        //                balallow = balallow + bal;
        //            }
        //        }
        //    }
        //    for (k = 0; IpSaveJobDetList.length > k; k++) {
        //        IpSaveJobDetList[k].allow = (IpSaveJobDetList[k].prgopqty + pallown) - balallow;

        //    }
        //}
        var table = $('#inputjodettab').DataTable();

        //var ItmId = table.row($(this).parents('tr')).data()["itmid"];
        //var ClrId = table.row($(this).parents('tr')).data()["clrid"];
        //var SzId = table.row($(this).parents('tr')).data()["sizeid"];
        //var jobno = table.row($(this).parents('tr')).data()["jobordno"];


        var row = $(this).closest('tr');
        var data = $('#inputjodettab').dataTable().fnGetData(row);


        var ItmId = data.itmid;
        var ClrId = data.clrid;
        var SzId = data.sizeid;
        var jobno = data.jobordno;
        var opItmId = data.opitmid;
        var opClrId = data.opclrid;
        var opSzId = data.opsizeid;

        var Stkempty = [];
        Stkempty = IpStkDetList;

        Stkempty = $.grep(Stkempty, function (v) {
            return (v.itmid == ItmId && v.clrid == ClrId && v.sizeid == SzId && v.opitmid == opItmId && v.opclrid == opClrId && v.opsizeid == opSzId
                && v.jobordno == jobno && v.prodpgmno == ProductionPgmNo);
        });

        //IpStkDetList = [];
        //IpStkDetList = Stkempty;
        //for (var i = 0; Stkempty.length > i; i++) {
        //    var stk = Stkempty[i].bal;
        //    var isu = Stkempty[i].issues;
        //    var stockbal = parseFloat(stk) - parseFloat(isu);

        //    var stkobj = {
        //        FinDia: Stkempty[i].FinDia,
        //        FinDiaid: Stkempty[i].FinDiaid,
        //        FinGsm: Stkempty[i].FinGsm,
        //        Gauge: Stkempty[i].Gauge,
        //        Loop_Len: Stkempty[i].Loop_Len,
        //        TaxAppVal: Stkempty[i].TaxAppVal,
        //        TransNo: Stkempty[i].TransNo,
        //        allow: Stkempty[i].allow,
        //        apprate: Stkempty[i].apprate,
        //        bal: Stkempty[i].bal,
        //        clr: Stkempty[i].clr,
        //        clrid: Stkempty[i].clrid,
        //        disploc: Stkempty[i].disploc,
        //        disptype: Stkempty[i].disptype,
        //        inrout: Stkempty[i].inrout,
        //        isdeci: Stkempty[i].isdeci,
        //        issloc: Stkempty[i].issloc,
        //        issqty: Stkempty[i].issqty,
        //        isstype: Stkempty[i].isstype,
        //        issues: Stkempty[i].issues,
        //        itm: Stkempty[i].itm,
        //        itmid: Stkempty[i].itmid,
        //        jobordno: Stkempty[i].jobordno,
        //        lotno: Stkempty[i].lotno,
        //        opclr: Stkempty[i].opclr,
        //        opclrid: Stkempty[i].opclrid,
        //        opitm: Stkempty[i].opitm,
        //        opitmid: Stkempty[i].opitmid,
        //        opsize: Stkempty[i].opsize,
        //        opsizeid: Stkempty[i].opsizeid,
        //        orderno: Stkempty[i].orderno,
        //        ordqty: Stkempty[i].ordqty,
        //        plansize: Stkempty[i].plansize,
        //        plansizeid: Stkempty[i].plansizeid,
        //        prgdetid: Stkempty[i].prgdetid,
        //        prgopqty: Stkempty[i].prgopqty,
        //        process: Stkempty[i].process,
        //        procissdetid: Stkempty[i].procissdetid,
        //        procissid: Stkempty[i].procissid,
        //        procissjobid: Stkempty[i].procissjobid,
        //        procorddetid: Stkempty[i].procorddetid,
        //        procordjobid: Stkempty[i].procordjobid,
        //        prodpgmno: Stkempty[i].prodpgmno,
        //        prodstkid: Stkempty[i].prodstkid,
        //        rate: Stkempty[i].rate,
        //        refno: Stkempty[i].refno,
        //        secqty: Stkempty[i].secqty,
        //        size: Stkempty[i].size,
        //        sizeid: Stkempty[i].sizeid,
        //        sno: Stkempty[i].sno,
        //        stockid: Stkempty[i].stockid,
        //        style: Stkempty[i].style, 
        //    }
        //    IpStkDetList.push(stkobj);
        //}



        InputStkdetTab(Stkempty);

    });
    $('#outputitmtab').on('click', 'tr', function (e) {

        var table = $('#outputitmtab').DataTable();

        //var ItmId = table.row($(this).parents('tr')).data()["itmid"];
        //var ClrId = table.row($(this).parents('tr')).data()["clrid"];
        //var SzId = table.row($(this).parents('tr')).data()["sizeid"];


        var OQty = $(this).closest('tr').find('#txtRQty').val();


        var row = $(this).closest('tr');
        var data = $('#outputitmtab').dataTable().fnGetData(row);


        var ItmId = data.itmid;
        var ClrId = data.clrid;
        var SzId = data.sizeid;
        var PSzId = data.plansizeid;

        if (opitmbalallow < pallown) {
            opitmbalallow = 0;
            for (j = 0; OpItmList.length > j; j++) {

                if (OpItmList[j].ordqty > 0) {
                    var ordqty = OpItmList[j].ordqty;
                    var allow = OpItmList[j].prgopqty + pallown;
                    var progqty = OpItmList[j].prgopqty;
                    if (progqty < ordqty) {
                        var bal = 0;
                        bal = (allow - ordqty);
                        bal = pallown - bal;
                        opitmbalallow = opitmbalallow + bal;
                    }
                }
            }
            for (k = 0; OpItmList.length > k; k++) {
                OpItmList[k].allow = (OpItmList[k].prgopqty + pallown) - opitmbalallow;

            }
        }

        if (opbalallow < pallown) {
            opbalallow = 0;
            for (j = 0; OpSaveJobDetList.length > j; j++) {

                if (OpSaveJobDetList[j].ordqty > 0) {
                    var ordqty = OpSaveJobDetList[j].ordqty;
                    var allow = OpSaveJobDetList[j].prgopqty + pallown;
                    var progqty = OpSaveJobDetList[j].prgopqty;
                    if (progqty < ordqty) {
                        var bal = 0;
                        bal = (allow - ordqty);
                        bal = pallown - bal;
                        opbalallow = opbalallow + bal;
                    }
                }
            }
            for (k = 0; OpSaveJobDetList.length > k; k++) {
                OpSaveJobDetList[k].allow = (OpSaveJobDetList[k].prgopqty + pallown) - opbalallow;

            }
        }

        //if (Mode == 0) {

        var colorempty = [];
        colorempty = OpSaveJobDetList;

        colorempty = $.grep(colorempty, function (v) {
            return (v.itmid === ItmId && v.clrid === ClrId && v.sizeid === SzId && v.plansizeid == PSzId);
        });

        OpJobDetList = colorempty;
        OutputJobdetTab(OpJobDetList);

    });
});
function LoadNetAmount() {
    debugger;
    var Per = $('#txtPer').val();
    var GrossAmt = $('#txtGrossAmt').val();
    var Amt = (Per * GrossAmt) / 100;
    $('#txtAmount').val(Amt);



}

function LoadGrossNetAmt() {

    var GrossTot = 0;
    var NetAmt = 0;
    $.each(OpSaveJobDetList, function (i) {

        var rate = parseFloat(OpSaveJobDetList[i].rate);
        var adjqty = parseFloat(OpSaveJobDetList[i].ordqty);
        GrossTot = GrossTot + (rate * adjqty);

    })

    $('#txtGrossAmt').val(GrossTot);

    if (AccList.length > 0) {
        var plusamt = 0;
        var minusamt = 0;

        $.each(AccList, function (i) {

            var Percentage = parseFloat(AccList[i].Percentage);
            var PlusOrMinus = parseFloat(AccList[i].PlusOrMinus);

            if (PlusOrMinus == '+') {
                var Amt = parseFloat(AccList[i].Amount);
                plusamt = plusamt + Amt;
            }
            if (PlusOrMinus == '-') {
                var Amt = parseFloat(AccList[i].Amount);
                minusamt = minusamt + Amt;
            }

        })

        NetAmt = GrossTot;
        NetAmt = NetAmt + plusamt;
        NetAmt = NetAmt - minusamt;
        $('#txtNetAmt').val(NetAmt);
    }
    else {

        $('#txtNetAmt').val(GrossTot);
    }


}



function loadAccTable(AcListObj) {
    debugger;
    $('#tblPaydetails').DataTable().destroy();

    $('#tblPaydetails').DataTable({
        data: AccList,

        columns: [

               { title: "AddlessId", data: "Addlessid", "visible": false },
               { title: "AccountsHead", data: "Addless", },
               { title: "+/-", data: "PlusOrMinus", },
               { title: "Percent", data: "Percentage", },
               { title: "Amount", data: "Amount", },

               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<div style="display: inline-flex;"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnaccedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button"data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnaccremove btn btn-round btn-danger"> <i class="fa fa-minus"></i> </button></div> '

               },

        ]
    });

    //var totalamnt = 0;
    //for (var e = 0; e < AccList.length; e++) {
    //    var amount = AccList[e].Amount;
    //    totalamnt = totalamnt + parseFloat(amount);

    //}


    //$('#txtAccAmt').val(totalamnt.toFixed(3));
    //var AccountAmt = $('#txtAccAmt').val();
    //var BAmt = $('#txtBTotAmt').val();
    LoadGrossNetAmt();
}


function fnClearAccControls() {
    $('#ddlAcc').val('0');
    $('#txtPorMins').val('');
    $('#txtPer').val('');
    $('#txtAmount').val('');
}

function ClearTextbox() {
    debugger;
    LoadCompanyUnitDDL("#ddlUnit");
    // $('#ddlCompany').val("0");
    //$('#ddlUnit').val("0");
    $('#ddlRefNo').val("0");
    $('#ddlOrderNo').val("0");
    $('#ddlwrkdiv').val("0");
    $('#ddlBuyer').val("0");
    $('#ddlProcess').val("0");
    $('#ddlSupplier').val("0");
    $('#ddlStyle').val("0");
    entrygriddet = [];
    Loadgridddl();
    $('#txtremarks').val("");
    var protype = $('input[name="optwrkord"]:checked').attr('value');
    if (protype == 'P') {

        $('#supp').show();
        $("#wrkdiv").hide();
    }
    else if (protype == 'W') {
        $('#supp').hide();
        $("#wrkdiv").show();
    }

    LoadStorefromcompany();
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

function RadioMainClick() {
    var protype = $('input[name="proctype"]:checked').attr('value');
    if (protype == 'P') {

        $('#Msupp').show();
        $("#Mwrkdiv").hide();
    }
    else if (protype == 'W') {
        $('#Msupp').hide();
        $("#Mwrkdiv").show();
    }
}

//function LoadrefNo() {
//    debugger;
//    var cmpyid = $('select#ddlCompany option:selected').val();
//    var cunitid = $('select#ddlUnit option:selected').val();
//    if (cmpyid == 0) {
//        alert('Please select Company...');
//        return true;
//    }ddlBuyer
//    if (cunitid == 0) {
//        alert('Please select CompanyUnit...');
//        return true;
//    }
//    $.ajax({
//        url: "/ProcessOrder/Getrefno",
//        data: JSON.stringify({ cmpid: cmpyid, cmpunitid: cunitid }),
//        type: "POST",
//        contentType: "application/json;charset=utf-8",
//        dataType: "json",

//        success: function (result) {
//            debugger;
//            if (result.Status == 'SUCCESS') {

//                // if (Mode == 0) {
//                var data = result.Value;
//                $(ddlRefNo).empty();
//                $(ddlRefNo).append($('<option/>').val('0').text('--Select RefNo--'));
//                $.each(data, function () {
//                    $(ddlRefNo).append($('<option></option>').val(this.bmasid).text(this.refno));
//                });
//                //}


//            }
//            Loadgrid();


//        }

//    });
//}

//function chkloadgridddl() {
//    Loadgridddl();
//}

function Loadgrid() {
    debugger;

    var ordNo = "";
    var ONo = $('select#ddlOrderNo option:selected').val();

    if (ONo == 0 || ONo == undefined) {
        ordNo == "";
    }
    else {

        ordNo = $('select#ddlOrderNo option:selected').val();
    }

    var RecNo = "";
    var RNo = $('select#ddlRefNo option:selected').val();

    if (RNo == 0 || RNo == undefined) {
        RecNo == "";
    }
    else {

        RecNo = $('select#ddlRefNo option:selected').val();
    }

    

    //var Sty = "";
    //var Style = $('select#ddlRefNo option:selected').val();

    //if (Style == 0 || Style == undefined) {
    //    Sty == "";
    //}
    //else {

    //    Sty = $('select#ddlRefNo option:selected').val();
    //}

    var Sty = $('select#ddlStyle option:selected').val();
    if (Sty == null || Sty == "0") {
        Sty = 0;
    }


    var cmpyid = $('select#ddlCompany option:selected').val();
    if (cmpyid == null || cmpyid == "0") {
        cmpyid = 0;
    }


    var buyid = $('select#ddlBuyer option:selected').val();
    if (buyid == null || buyid == "0") {
        buyid = 0;
    }
    var cunitid = $('select#ddlUnit option:selected').val();
    if (cunitid == null || cunitid == "0") {
        cunitid = 0;
    }
    var procid = $('select#ddlProcess option:selected').val();
    if (procid == null || procid == "0") {
        procid = 0;
    }
    var closed = 'N';
    var amen = 'N';
    var protype = $('input[name="type"]:checked').attr('value');
    $.ajax({
        url: "/ProcessOrder/Loadgrid",
        data: JSON.stringify({ cmpid: cmpyid, closed: closed, amend: amen, cmpunitid: cunitid, procid: procid, ordertype: protype, buyerid: buyid, refno: RecNo, stylid: Sty, orderno: ordNo }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            entrygriddet = result.Value;
            LoadEntrytab(entrygriddet);


        }

    });
}

function RadioLoadgrid() {
    LoadSupplierSetup();
    Loadgridddl();
    Loadgrid();
}
function Loadgridddl() {
    debugger;

    var ordNo = "";
    var ONo = $('select#ddlOrderNo option:selected').val();

    if (ONo == 0 || ONo == undefined) {
        ordNo == "";
    }
    else {

        ordNo = $('select#ddlOrderNo option:selected').val();
    }

    var RecNo = "";
    var RNo = $('select#ddlRefNo option:selected').val();

    if (RNo == 0 || RNo == undefined) {
        RecNo == "";
    }
    else {

        RecNo = $('select#ddlRefNo option:selected').val();
    }



    //var Sty = "";
    //var Style = $('select#ddlRefNo option:selected').val();

    //if (Style == 0 || Style == undefined) {
    //    Sty == "";
    //}
    //else {

    //    Sty = $('select#ddlRefNo option:selected').val();
    //}

    var Sty = $('select#ddlStyle option:selected').val();
    if (Sty == null || Sty == "0") {
        Sty = 0;
    }


    var cmpyid = $('select#ddlCompany option:selected').val();
    if (cmpyid == null || cmpyid == "0") {
        cmpyid = 0;
    }


    var buyid = $('select#ddlBuyer option:selected').val();
    if (buyid == null || buyid == "0") {
        buyid = 0;
    }
    var cunitid = $('select#ddlUnit option:selected').val();
    if (cunitid == null || cunitid == "0") {
        cunitid = 0;
    }
    var procid = $('select#ddlProcess option:selected').val();
    if (procid == null || procid == "0") {
        procid = 0;
    }
    var closed = 'N';
    var amen = 'N';
    var protype = $('input[name="type"]:checked').attr('value');
    $.ajax({
        url: "/ProcessOrder/Loadgrid",
        data: JSON.stringify({ cmpid: cmpyid, closed: closed, amend: amen, cmpunitid: cunitid, procid: procid, ordertype: protype, buyerid: buyid, refno: RecNo, stylid: Sty, orderno: ordNo }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            entrygriddet = result.Value;
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
                var udet = {};
                var un = [];
                $.each(data, function (i, el) {

                    if (!compdet[el.cmpid]) {
                        compdet[el.cmpid] = true;
                        comp.push(el);
                    }

                    if (!recptdet[el.refno]) {
                        recptdet[el.refno] = true;
                        recpt.push(el);
                    }

                    if (!dcdet[el.orderno]) {
                        dcdet[el.orderno] = true;
                        dc.push(el);
                    }

                    if (!procdet[el.processid]) {
                        procdet[el.processid] = true;
                        proc.push(el);
                    }
                    if (!unitdet[el.buyerid]) {
                        unitdet[el.buyerid] = true;
                        unit.push(el);
                    }

                    if (!udet[el.cmpunitid]) {
                        udet[el.cmpunitid] = true;
                        un.push(el);
                    }
                });


                $(ddlBuyer).empty();
                $(ddlRefNo).empty();
                // $(ddlCompany).empty();
                //$(ddlUnit).empty();
                $(ddlOrderNo).empty();

                $(ddlBuyer).append($('<option/>').val('0').text('--Select Buyer--'));
                $.each(unit, function () {
                    $(ddlBuyer).append($('<option></option>').val(this.buyerid).text(this.buyer));
                });

                $(ddlRefNo).append($('<option/>').val('0').text('--Select RefNo--'));
                $.each(recpt, function () {
                    $(ddlRefNo).append($('<option></option>').text(this.refno));
                });

                //$(ddlCompany).append($('<option/>').val('0').text('--Select Company--'));
                //$.each(comp, function () {
                //    $(ddlCompany).append($('<option></option>').val(this.cmpid).text(this.company));
                //});

                //$(ddlUnit).append($('<option/>').val('0').text('--Select Unit--'));
                //$.each(un, function () {
                //    $(ddlUnit).append($('<option></option>').val(this.cmpunitid).text(this.cmpnyunit));
                //});

                $(ddlOrderNo).append($('<option/>').val('0').text('--Select OrderNo--'));
                $.each(dc, function () {
                    $(ddlOrderNo).append($('<option></option>').text(this.orderno));
                });

            }

        }

    });
}

function LoadEntrytab(list) {
    $('#entrygridtab').DataTable().destroy();

    $('#entrygridtab').DataTable({
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
                   { title: "Jmasid", data: "jmasid", "visible": false },
                   { title: "Job No", data: "jobordno" },
                   { title: "Style", data: "style" },
                   { title: "Bmasid", data: "bmasid", "visible": false },
                   { title: "Order No", data: "orderno" },
                   { title: "Ref No", data: "refno" },
                   { title: "Buyer", data: "buyer" },


                   //{
                   //    title: "Group", data: "jmasid",
                   //    render: function (data) {

                   //        return '<input type="checkbox" id="group" value=' + data + ' onclick="myfunc(this.value);">';
                   //    }
                   //},
                       {
                           title: "Group", data: "jmasid",
                           render: function (data, type, row) {

                               return '<input type="checkbox" id="groupbom" class="groupbom editor-active" unchecked  value=' + data + ' >';

                           }
                       },
        ]

    });
}

function myfunc(Val) {
    debugger;
    JOrdID = JOrdID + "," + Val;

}
function LoadData() {
    debugger;




    var list = [];

    for (var j = 0; j < entrygriddet.length; j++) {
        if (entrygriddet[j].CheckLoad == "Y") {

            JOrdID = JOrdID + "," + entrygriddet[j].jmasid;

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

    var storeunitid = $('#ddlAStoreUnit').val();
    if (storeunitid == 0 && ValidateProcessStore == "True") {
        //alert('Please select Store..');
        var msg = 'Please select Store...';
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
    if (Processid == 0) {
        $('#ddlProcess').siblings(".select2-container").css('border', '1px solid red');
        return true;
    } else {
        $('#ddlProcess').siblings(".select2-container").css('border', '1px solid lightgrey');
    }
    unit = $('select#ddlUnit option:selected').text();
    Companyunitid = $('select#ddlUnit option:selected').val();
    if (Companyunitid == 0) {
        $('#ddlUnit').siblings(".select2-container").css('border', '1px solid red');
        return true;
    } else {
        $('#ddlUnit').siblings(".select2-container").css('border', '1px solid lightgrey');
    }
    CompanyId = $('select#ddlCompany option:selected').val();
    if (CompanyId == 0) {
        $('#ddlCompany').siblings(".select2-container").css('border', '1px solid red');
        return true;
    } else {
        $('#ddlCompany').siblings(".select2-container").css('border', '1px solid lightgrey');
    }

    OrderType=$('input[name="type"]:checked').attr('value');
    

    CheckPlanAmend(JOrdID);
   
   
        GenerateNumber();
        LoadProcessDetails(Processid);
        GetProcessInOutValidate(Processid);
        GenerateIssueNumber();
        AccList = [];
        loadAccTable(AccList);
        OpItmList = [];
        OpJobDetList = [];
        OpSaveJobDetList = [];
        IpItmList = [];
        IpJobDetList = [];
        IpSaveJobDetList = [];
        IpStkDetList = [];
        IpSaveStkDetList = [];

        $('#myModal').modal('hide');
        $('#myModal1').modal('show');

        //$('#myModal1').show();
        // $('#myModal1').modal('show');
        $('#btnUpdate').hide();
        $('#btnDel').hide();
        $('#btnAdd').show();
        //$('#txtOrderNo').val(ordno);
        $('#txtProcess').val(process);
        $('#txtUnit').val(unit);
        $('#txtProcessor').val(supp);

        $('#txtGrossAmt').val(0);
        $('#txtNetAmt').val(0);
        LoadOutputItm();
        LoadOutputJobdet();
        LoadInputItm();
        LoadInputJobdet();
        //var protype = $('input[name="type"]:checked').attr('value');
        //if (protype == 'W') {
        //    Loadstkdet();
        //}
        //else if (protype == 'S') {
        //    Loadstkdet();
        //}
        LoadLocation();
   
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
        url: "/ProcessOrder/LoadOrderMaindetails",
        data: JSON.stringify({ prodid: Pid }),
        type: "POST",
        async: false,
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;

            var ord = "";
            var ref = "";
            var sty = "";
            var buy = "";
            for (var t = 0; t < obj.length; t++) {
                var od = obj[t].orderno;
                var re = obj[t].refno;
                var st = obj[t].style;
                var by = obj[t].buyer;

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

                if (buy == '') {
                    buy = by;
                }
                else {
                    buy = buy + "," + by;
                }
            }
            $('#txtmainOrdno').val(ord);
            $('#txtmainrefno').val(ref);
            $('#txtmainstyle').val(sty);

            rptordno = ord;
            rptrefno = ref;
            rptsty = sty;
            rptbuyer = buy;
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}



function backtomain() {
    $('#myModal1').hide();
    $('#myModal1').modal('hide');
}
function myItmddl(Val) {

    var foo = [];
    MOrd = 0;
    $('#ddlItemgrp :selected').each(function (i, selected) {
        foo[i] = $(selected).val();

        MOrd = MOrd + "," + foo[i];


    });

    LoadItemddl();

}
function LoadOutputItm() {
    debugger;

    var procid = $('select#ddlProcess option:selected').val();
    var closed = 'N';
    var amen = 'N';

    $.ajax({
        url: "/ProcessOrder/LoadOutputitmsgrid",
        data: JSON.stringify({ closed: closed, jobordno: JOrdID, procid: procid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            OpItmList = result.Value;
            if (AllowList.length > 0) {
                if (AllowList[0].PQuantity > 0) {
                    var qn = AllowList[0].PQuantity;
                    $.each(OpItmList, function () {
                        this.allow = parseFloat(this.bal) + parseFloat(qn);
                    });
                }
                else if (AllowList[0].ProPercentage > 0) {
                    var qn = AllowList[0].ProPercentage;
                    $.each(OpItmList, function () {
                        var bl = (parseFloat(this.bal) * qn) / 100;
                        bl = bl.toFixed(3);
                        this.allow = (parseFloat(this.bal) + parseFloat(bl)).toFixed(3);
                    });
                }
                else if (AllowList[0].PQuantity == 0 && AllowList[0].ProPercentage == 0) {
                    $.each(OpItmList, function () {
                        this.allow = this.bal;
                    });
                }
            }


            OutputitmTab(OpItmList);

            opItmid = OpItmList[0].itmid;
            OpClrid = OpItmList[0].clrid;
            OpSizeid = OpItmList[0].sizeid;
            OpPSizeid = OpItmList[0].plansizeid;
        }

    });
}

function LoadInputItm() {
    debugger;

    var procid = $('select#ddlProcess option:selected').val();
    var closed = 'N';
    var amen = 'N';

    $.ajax({
        url: "/ProcessOrder/LoadInputitmsgrid",
        data: JSON.stringify({ closed: closed, jobordno: JOrdID, procid: procid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            IpItmList = result.Value;
            if (AllowList.length > 0) {
                if (AllowList[0].PQuantity > 0) {
                    var qn = AllowList[0].PQuantity;
                    $.each(IpItmList, function () {
                        this.allow = parseFloat(this.bal) + parseFloat(qn);
                    });
                }
                else if (AllowList[0].ProPercentage > 0) {
                    var qn = AllowList[0].ProPercentage;
                    $.each(IpItmList, function () {
                        var bl = (parseFloat(this.bal) * qn) / 100;
                        bl = bl.toFixed(3);
                        this.allow = (parseFloat(this.bal) + parseFloat(bl)).toFixed(3);
                    });
                }
                else if (AllowList[0].PQuantity == 0 && AllowList[0].ProPercentage == 0) {
                    $.each(IpItmList, function () {
                        this.allow = this.bal;
                    });
                }
            }

            InputitmTab(IpItmList);
            Itmid = IpItmList[0].itmid;
            Colorid = IpItmList[0].clrid;
            Sizeid = IpItmList[0].sizeid;
        }

    });
}


function LoadOutputJobdet() {
    debugger;

    var procid = $('select#ddlProcess option:selected').val();
    var closed = 'N';
    var amen = 'N';
    var OpenPgAp = 0;

    if (OpenPrgApp == "Y") {
        OpenPgAp = "Y";
    } else {
        OpenPgAp = "N";
    }


    $.ajax({
        url: "/ProcessOrder/LoadOutputjobdetgrid",
        data: JSON.stringify({ closed: closed, jobordno: JOrdID, procid: procid, OpenPgAp: OpenPgAp }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            OpSaveJobDetList = result.Value;

            if (AllowList.length > 0) {
                if (AllowList[0].PQuantity > 0) {
                    var qn = AllowList[0].PQuantity;
                    $.each(OpSaveJobDetList, function () {
                        this.allow = parseFloat(this.bal) + parseFloat(qn);
                    });
                }
                else if (AllowList[0].ProPercentage > 0) {
                    var qn = AllowList[0].ProPercentage;
                    $.each(OpSaveJobDetList, function () {
                        var bl = (parseFloat(this.bal) * qn) / 100;
                        bl = bl.toFixed(3);
                        this.allow = (parseFloat(this.bal) + parseFloat(bl)).toFixed(3);
                    });
                }
                else if (AllowList[0].PQuantity == 0 && AllowList[0].ProPercentage == 0) {
                    $.each(OpSaveJobDetList, function () {
                        this.allow = this.bal;
                    });
                }
            }

            OutputSaveJobdetTab(OpSaveJobDetList);

            var colorempty = [];
            colorempty = OpSaveJobDetList;

            //colorempty = $.grep(colorempty, function (v) {
            //    return (v.itmid === opItmid && v.clrid === OpClrid && v.sizeid === OpSizeid && v.plansizeid === OpPSizeid);
            //});
            OpJobDetList = [];
            OpJobDetList = colorempty;
            OutputJobdetTab(OpJobDetList);
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


function LoadInputJobdet() {
    debugger;

    var procid = $('select#ddlProcess option:selected').val();
    var closed = 'N';
    var amen = 'N';

    var OpenPgAp = 0;

    if (OpenPrgApp == "Y") {
        OpenPgAp = "Y";
    } else {
        OpenPgAp = "N";
    }


    $.ajax({
        url: "/ProcessOrder/LoadInputjobdetgrid",
        data: JSON.stringify({ closed: closed, jobordno: JOrdID, procid: procid, OpenPgAp: OpenPgAp }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            IpSaveJobDetList = result.Value;
            if (AllowList.length > 0) {
                if (AllowList[0].PQuantity > 0) {
                    var qn = AllowList[0].PQuantity;
                    $.each(IpSaveJobDetList, function () {
                        this.allow = parseFloat(this.bal) + parseFloat(qn);
                    });
                }
                else if (AllowList[0].ProPercentage > 0) {
                    var qn = AllowList[0].ProPercentage;
                    $.each(IpSaveJobDetList, function () {
                        var bl = (parseFloat(this.bal) * qn) / 100;
                        bl = bl.toFixed(3);
                        this.allow = (parseFloat(this.bal) + parseFloat(bl)).toFixed(3);
                    });
                }
                else if (AllowList[0].PQuantity == 0 && AllowList[0].ProPercentage == 0) {
                    $.each(IpSaveJobDetList, function () {
                        this.allow = this.bal;
                    });
                }
            }

            InputSaveJobdetTab(IpSaveJobDetList);

            //var colorempty = [];
            //colorempty = IpSaveJobDetList;

            //colorempty = $.grep(colorempty, function (v) {
            //    return (v.itmid === Itmid && v.clrid === Colorid && v.sizeid === Sizeid);
            //});
            //IpJobDetList = [];
            //IpJobDetList = colorempty;
            InputJobdetTab(IpSaveJobDetList);

            var protype = $('input[name="type"]:checked').attr('value');
            if (protype == 'W') {
                Loadstkdet();
            }
            else if (protype == 'S') {
                Loadstkdet();
            }
        }

    });
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
    $('#txtDeliDate').val(Fdatestring);
    $('#txtOrderDate').val(Fdatestring);


}
function OutputitmTab(list) {
    //$('#outputitmtab').DataTable().destroy();
    var inputcount = 0;
    $('#outputitmtab tr').each(function () {
        inputcount++;
    });
    if (inputcount > 0) {
        $('#outputitmtab').DataTable().destroy();
    }
    $('#outputitmtab').empty();

    $('#outputitmtab').DataTable({
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
                   { title: "Itemid", data: "itmid", "visible": false },
                   { title: "Op Item", data: "itm" },
                   { title: "Colorid", data: "clrid", "visible": false },
                   { title: "Color", data: "clr" },
                   { title: "Sizeid", data: "sizeid", "visible": false },
                   //{ title: "Category II", data: "size" },
                    {
                        title: "Size", data: "size",

                        render: function (data, type, row) {
                            var $select = $("<select></select>", {
                                "id": "loadstylelist",
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
                   {
                       title: "Rate", data: "rate",
                       render: function (data) {
                           if (ChkBudProApp == "Y" || CostAppSamProCheck =="Y") {
                               return '<input type="text" id="txtOpRQty" class="calcrate form-control"  style="width: 50px;text-align: center;"  value=' + data + ' disabled >';
                           }
                           else {
                               return '<input type="text" id="txtOpRQty" class="calcrate form-control"  style="width: 50px;text-align: center;"  value=' + data + 'disabled >';
                           }
                       },
                   },
                   { title: "Prog Qty", data: "prgopqty" },
                   { title: "Bal Qty", data: "bal" },
                   {
                       title: "Output", data: "ordqty",
                       render: function (data) {

                           return '<input type="text" id="txtOpOrdQty" class="calcAmt form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';

                       },
                   },
                   {
                       title: "Sec Qty", data: "secqty", "visible": false,
                       render: function (data) {

                           return '<input type="text" id="txtOpsecOrdQty" class="calcsecopqty form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';

                       },
                   },
                   {
                       title: "Apply", "visible": false,
                       render: function (data) {

                           return '<input type="checkbox" id="tab"  >';
                       }
                   },
                   {
                       title: "Lp Len", data: "Loop_Len",
                       render: function (data) {

                           return '<input type="text" id="txtLooplen" class="calclooplen form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';

                       },
                   },
                   {
                       title: "Gauge", data: "Gauge",
                       render: function (data) {

                           return '<input type="text" id="txtGauge" class="calcguage form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';

                       },
                   },
                   { title: "Plan Size", data: "plansize" },
                      { title: "FinDiaid", data: "FinDiaid", "visible": false },
                   {
                       title: "Finish Dia", data: "FinDia",

                       render: function (data, type, row) {
                           var $select = $("<select></select>", {
                               "id": "loadfabsizelist",
                               "value": data,
                               "class": "form-control loadfabsizelist",
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
                   {
                       title: "Fin Gsm", data: "FinGsm",
                       render: function (data) {

                           return '<input type="text" id="txtFinGsm" class="calcfingsm form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';

                       },
                   },
                    {
                        title: "TxApp.Val", data: "TaxAppVal",
                        render: function (data) {

                            return '<input type="text" id="txtTxApVal" class="calctaxval form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';

                        },
                    },
                    //{
                    //    title: "View",// data: "jobordno",
                    //    render: function (data) {

                    //        return '<button type="button"  class="btnviewopitem btn btn-info btn-round" style="width:25px;padding:0px;"><i class="fa fa-eye"></i></button>';
                    //    }
                    //},
        ]

    });

    var table = $('#outputitmtab').DataTable();
    $("#outputitmtab tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#outputitmtab tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}

function InputitmTab(list) {
    //$('#inputitmtab').DataTable().destroy();
    var inputcount = 0;
    $('#inputitmtab tr').each(function () {
        inputcount++;
    });
    if (inputcount > 0) {
        $('#inputitmtab').DataTable().destroy();
    }
    $('#inputitmtab').empty();

    $('#inputitmtab').DataTable({
        data: list,
        scrollY: 100,
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
                   { title: "Itemid", data: "itmid", "visible": false },
                   { title: "Ip Item", data: "itm" },
                   { title: "Colorid", data: "clrid", "visible": false },
                   { title: "Color", data: "clr" },
                   { title: "Sizeid", data: "sizeid", "visible": false },
                   {
                       title: "Size", data: "size",
                       render: function (data, type, row) {
                           var $select = $("<select></select>", {
                               "id": "loadsizelist",
                               "value": data,
                               "class": "form-control loadipsizelist col-md-4",
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
                   },
                   {
                       title: "Ord Qty", data: "ordqty",
                       render: function (data) {

                           return '<input type="text" id="txtipRQty" class="calcipAmt form-control"  style="width: 50px;text-align: center;" disabled value=' + data + ' >';

                       },
                   },
                   { title: "Prog Qty", data: "prgopqty" },
                   { title: "Bal Qty", data: "bal" },
                    { title: "Ord Qty", data: "ordqty", "visible": false },
                   {
                       title: "Iss Qty", data: "issqty",
                       render: function (data) {

                           return '<input type="text" id="txtipOrdQty" class="calcipAmt form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';

                       },
                   },
                   {
                       title: "Sec Qty", data: "secqty",
                       render: function (data) {

                           return '<input type="text" id="txtipsecOrdQty" class="calcipsec form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';

                       },
                   },
                   {
                       title: "Apply", "visible": false,
                       render: function (data) {

                           return '<input type="checkbox" id="tab"  >';
                       }
                   },
                    //{
                    //    title: "View",// data: "jobordno",
                    //    render: function (data) {

                    //        return '<button type="button"  class="btnviewiputitem btn btn-round btn-info" style="width:25px;padding:0px;"><i class="fa fa-eye"></i></button>';
                    //    }
                    //},
        ]

    });


    var table = $('#inputitmtab').DataTable();
    $("#inputitmtab tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#inputitmtab tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}

$(document).ready(function () {
    $("#outputitmtab ").dataTable().find("tbody").on('click', 'tr', function () {
        indexop = (this.rowIndex) - 1;
    });
});

$(document).ready(function () {
    $("#outputjodettab ").dataTable().find("tbody").on('click', 'tr', function () {
        indopjob = (this.rowIndex) - 1;
    });
});

$(document).ready(function () {
    $("#inputitmtab ").dataTable().find("tbody").on('click', 'tr', function () {
        indiptitm = (this.rowIndex) - 1;
    });
});

$(document).ready(function () {
    $("#inputjodettab ").dataTable().find("tbody").on('click', 'tr', function () {
        inditjbdet = (this.rowIndex) - 1;
    });
});

$(document).ready(function () {
    $("#inputstkdettab ").dataTable().find("tbody").on('click', 'tr', function () {
        indipstkdet = (this.rowIndex) - 1;
    });
});



function calcipAmt(Val) {
    debugger;
    indiptitm;
    var currentrowoftcpi = IpItmList.slice(indiptitm);

    var CSno = currentrowoftcpi[0].sno;
    var IId = currentrowoftcpi[0].itmid;
    var CId = currentrowoftcpi[0].clrid;
    var SId = currentrowoftcpi[0].sizeid;

    var IssQty = Val;
    var BlQ = currentrowoftcpi[0].bal;
    if (Val > BlQ) {
        //alert('Quantity should not exceed Balqty...');
        var msg = 'Quantity should not exceed Balance quantity...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }
    $.each(IpItmList, function () {
        if (this.sno == CSno && this.itmid == IId && this.clrid == CId && this.sizeid == SId) {
            this.issqty = IssQty;
            this.ordqty = Val;
        }
    });

    InputitmTab(IpItmList);

    if (IpSaveJobDetList.length > 0) {

        var pid = [];
        var bal = [];
        var qty = [];

        for (var t = 0; t < IpSaveJobDetList.length; t++) {
            if (IpSaveJobDetList[t].itmid == IId && IpSaveJobDetList[t].clrid == CId && IpSaveJobDetList[t].sizeid == SId) {
                pid.push(IpSaveJobDetList[t].sno);
                bal.push(IpSaveJobDetList[t].bal);
                qty.push(IpSaveJobDetList[t].ordqty);

            }
        }

        var c = pid.length;
        var t = 0;

        if (Val < bal[0]) {
            qty[0] = Val;
            for (var l = 1; l < qty.length; l++) {
                qty[l] = 0;
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
        var son = [];
        var jid = [];
        for (var u = 0; u < IpSaveJobDetList.length; u++) {
            for (var r = 0; r < pid.length; r++) {
                if (IpSaveJobDetList[u].sno == pid[r]) {
                    IpSaveJobDetList[u].ordqty = qty[r];
                    son.push(IpSaveJobDetList[u].ordqty);
                    jid.push(IpSaveJobDetList[u].jobordno);
                }
                //if (OSItemList[u].OItemid == IId && OSItemList[u].OColorid == CId && OSItemList[u].OSizeid == SId && OSItemList[u].OUomid == PUId) {
                //    OSItemList[u].IssueQty = qty[r];
                //}
            }
        }

        InputSaveJobdetTab(IpSaveJobDetList);

        var j = jid[0];
        var colorempty = [];
        colorempty = IpSaveJobDetList;

        colorempty = $.grep(colorempty, function (v) {
            return (v.itmid === IId && v.clrid === CId && v.sizeid === SId);
        });
        IpJobDetList = [];
        IpJobDetList = colorempty;
        InputJobdetTab(colorempty);
    }

    if (IpSaveStkDetList.length > 0) {



        var sid = [];
        var bal = [];
        var qty = [];
        for (var t = 0; t < IpSaveStkDetList.length; t++) {
            if (IpSaveStkDetList[t].itmid == IId && IpSaveStkDetList[t].clrid == CId && IpSaveStkDetList[t].sizeid == SId && IpSaveStkDetList[t].jobordno == j) {
                sid.push(IpSaveStkDetList[t].stockid);
                bal.push(IpSaveStkDetList[t].bal);
                qty.push(IpSaveStkDetList[t].issues);
            }
        }

        var c = sid.length;
        var t = 0;

        //if (Val > bal[0]) {
        //qty[0] = Val;
        //}

        if (son[0] < bal[0]) {
            qty[0] = son[0];

            for (var l = 1; l < qty.length; l++) {
                qty[l] = 0;
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

        var stkempty = [];

        var stkid = [];
        for (var u = 0; u < IpSaveStkDetList.length; u++) {
            for (var r = 0; r < sid.length; r++) {
                if (IpSaveStkDetList[u].stockid == sid[r]) {
                    IpSaveStkDetList[u].issues = qty[r];
                    stkid.push(IpSaveStkDetList[u].stockid);
                }


            }
        }

        for (var e = 0; e < IpStkDetList.length; e++) {
            for (var r = 0; r < sid.length; r++) {
                if (IpStkDetList[e].stockid == sid[r]) {
                    IpStkDetList[e].issues = qty[r];
                }
            }
        }

        InputStkdetTab(IpStkDetList);
        InputSaveStkdetTab(IpSaveStkDetList);


    }
    var totalamnt = 0;

    for (var e = 0; e < IpStkDetList.length; e++) {
        var amount = IpStkDetList[e].issues;
        totalamnt = totalamnt + parseFloat(amount);
    }


    $.each(IpItmList, function () {
        if (this.sno == CSno && this.itmid == IId && this.clrid == CId && this.sizeid == SId) {
            this.issqty = totalamnt;
            this.ordqty = totalamnt;
        }
    });

    InputitmTab(IpItmList);

    if (IpSaveJobDetList.length > 0) {

        var pid = [];
        var bal = [];
        var qty = [];

        for (var t = 0; t < IpSaveJobDetList.length; t++) {
            if (IpSaveJobDetList[t].itmid == IId && IpSaveJobDetList[t].clrid == CId && IpSaveJobDetList[t].sizeid == SId) {
                pid.push(IpSaveJobDetList[t].sno);
                bal.push(IpSaveJobDetList[t].bal);
                qty.push(IpSaveJobDetList[t].ordqty);

            }
        }

        var c = pid.length;
        var t = 0;

        if (totalamnt < bal[0]) {
            qty[0] = totalamnt;
            for (var l = 1; l < qty.length; l++) {
                qty[l] = 0;
            }
        }
        else {
            for (var r = 0; r < c; r++) {
                if (r == 0) {
                    if (bal[r] <= totalamnt) {
                        qty[r] = bal[r];
                        t = totalamnt - bal[r];
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
        for (var u = 0; u < IpSaveJobDetList.length; u++) {
            for (var r = 0; r < pid.length; r++) {
                if (IpSaveJobDetList[u].sno == pid[r]) {
                    IpSaveJobDetList[u].ordqty = qty[r];
                    son.push(IpSaveJobDetList[u].ordqty);
                    jid.push(IpSaveJobDetList[u].jobordno);
                }
                //if (OSItemList[u].OItemid == IId && OSItemList[u].OColorid == CId && OSItemList[u].OSizeid == SId && OSItemList[u].OUomid == PUId) {
                //    OSItemList[u].IssueQty = qty[r];
                //}
            }
        }

        InputSaveJobdetTab(IpSaveJobDetList);

        var j = jid[0];
        var colorempty = [];
        colorempty = IpSaveJobDetList;

        colorempty = $.grep(colorempty, function (v) {
            return (v.itmid === IId && v.clrid === CId && v.sizeid === SId);
        });
        IpJobDetList = [];
        IpJobDetList = colorempty;
        InputJobdetTab(colorempty);
    }
}



function calcStockqty(value) {
    debugger;

    indipstkdet;

    var currentrowoftcpi = IpStkDetList.slice(indipstkdet);

    var CSno = currentrowoftcpi[0].sno;
    var IId = currentrowoftcpi[0].itmid;
    var CId = currentrowoftcpi[0].clrid;
    var SId = currentrowoftcpi[0].sizeid;
    // var PUId = currentrowoftcpi[0].SUomid;
    //var IssQty = Val;

    var itmstkid = currentrowoftcpi[0].stockid;
    var balstk = currentrowoftcpi[0].bal;
    var jm = currentrowoftcpi[0].jobordno;

    currentrowstk = [];
    for (var w = 0; w < IpSaveJobDetList.length; w++) {
        if (IpSaveJobDetList[w].jobordno == jm && IpSaveJobDetList[w].itmid == IId && IpSaveJobDetList[w].clrid == CId && IpSaveJobDetList[w].sizeid == SId) {
            currentrowstk.push(IpSaveJobDetList[w]);
            var jno = currentrowstk[0].jobordno;
            // Itmstkid = currentrow[0].ItemStockId;
            var balq = currentrowstk[0].bal;
        }
    }

    if (value == 0) {
        $.each(IpStkDetList, function () {
            if (this.stockid == itmstkid) {

                if (balstk >= value) {
                    if (balq >= value) {
                        this.issues = value;
                    }
                    else {
                        var t = value - balq;
                        this.issues = balq;
                    }
                }
                else {
                    var t = value - balstk;
                    this.issues = balstk;
                }

            }
        });

        $.each(IpSaveStkDetList, function () {
            if (this.stockid == itmstkid) {

                if (balstk >= value) {
                    if (balq >= value) {
                        this.issues = value;
                    }
                    else {
                        var t = value - balq;
                        this.issues = balq;
                    }
                }
                else {
                    var t = value - balstk;
                    this.issues = balstk;
                }

            }
        });

        $.each(IpItmList, function () {
            if (this.itmid == IId && this.clrid == CId && this.sizeid == SId) {
                this.issqty = value;

            }
        });
        //loadDelStockTable(SItemList);

        //InputSaveJobdetTab(IpSaveJobDetList);
        //InputJobdetTab(IpJobDetList);
        InputitmTab(IpItmList);
        InputStkdetTab(IpStkDetList);
        InputSaveStkdetTab(IpSaveStkDetList);
        return true;
    }

    $.each(IpStkDetList, function () {
        if (this.stockid == itmstkid) {

            if (balstk >= value) {
                if (balq >= value) {
                    this.issues = value;
                }
                else {
                    var t = value - balq;
                    this.issues = balq;
                }
            }
            else {
                var t = value - balstk;
                this.issues = balstk;
            }

        }
    });

    $.each(IpSaveStkDetList, function () {
        if (this.stockid == itmstkid) {

            if (balstk >= value) {
                if (balq >= value) {
                    this.issues = value;
                }
                else {
                    var t = value - balq;
                    this.issues = balq;
                }
            }
            else {
                var t = value - balstk;
                this.issues = balstk;
            }

        }
    });

    var tot = 0;
    for (var d = 0; d < IpSaveStkDetList.length; d++) {
        if (IpSaveStkDetList[d].jobordno == jm && IpSaveStkDetList[d].itmid == IId && IpSaveStkDetList[d].clrid == CId && IpSaveStkDetList[d].sizeid == SId) {
            var at = IpSaveStkDetList[d].quantity;
            tot = tot + parseFloat(at);
        }
    }
    //var isqty = parseFloat(tot) + value;
    if (tot > balq) {
        //alert('Should not exceed Bal Qty in JobOrder table');
        var msg = 'Should not exceed Balance quantity in JobOrder table...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    var currentrow = [];
    for (var a = 0; a < IpSaveJobDetList.length; a++) {


        if (IpSaveJobDetList[a].jobordno == jm && IpSaveJobDetList[a].itmid == IId && IpSaveJobDetList[a].clrid == CId && IpSaveJobDetList[a].sizeid == SId) {
            currentrow.push(IpSaveJobDetList[a]);
            var jno = currentrow[0].jobordno;
            // Itmstkid = currentrow[0].ItemStockId;
            var balq = currentrow[0].bal;

            if (balq <= balstk) {

            }


            $.each(IpSaveJobDetList, function () {
                //if (this.JoMasId == jm) {
                if (this.jobordno == jm && this.itmid == IId && this.clrid == CId && this.sizeid == SId) {
                    if (value >= balstk) {
                        //  if (tot < balq) {
                        if (balstk >= value) {
                            this.ordqty = value;
                        }
                        else {
                            var t = value - balstk;
                            this.ordqty = balstk;
                        }
                        //}
                        //else {
                        //    this.IssueQty = value;
                        //  }
                    }
                    else {
                        if (balq >= value) {
                            this.ordqty = value;
                        }
                        else {
                            var t = value - balq;
                            this.ordqty = balq;
                        }
                    }
                    //if (balq <= balstk) {
                    //    this.IssueQty = balq;
                    //}
                }
            });

            $.each(IpJobDetList, function () {
                //if (this.JoMasId == jm) {
                if (this.jobordno == jm && this.itmid == IId && this.clrid == CId && this.sizeid == SId) {
                    if (value >= balstk) {
                        if (balstk >= value) {
                            this.ordqty = value;
                        }
                        else {
                            var t = value - balstk;
                            this.ordqty = balstk;
                        }
                    }
                    else {
                        if (balq >= value) {
                            this.ordqty = value;
                        }
                        else {
                            var t = value - balq;
                            this.ordqty = balq;
                        }
                    }

                }
            });
        }
    }




    var totalamnt = 0;

    for (var e = 0; e < IpStkDetList.length; e++) {
        var amount = IpStkDetList[e].issues;
        totalamnt = totalamnt + parseFloat(amount);
    }


    $.each(IpSaveJobDetList, function () {
        if (this.itmid == IId && this.clrid == CId && this.sizeid == SId && this.jobordno == jm) {
            this.ordqty = totalamnt;

        }
    });
    $.each(IpJobDetList, function () {
        if (this.itmid == IId && this.clrid == CId && this.sizeid == SId && this.jobordno == jm) {
            this.ordqty = totalamnt;

        }
    });


    var total = 0;

    for (var e = 0; e < IpSaveJobDetList.length; e++) {
        if (IpSaveJobDetList[e].itmid == IId && IpSaveJobDetList[e].clrid == CId && IpSaveJobDetList[e].sizeid == SId) {
            var amount = IpSaveJobDetList[e].ordqty;
            total = total + parseFloat(amount);
        }
    }

    $.each(IpItmList, function () {
        if (this.itmid == IId && this.clrid == CId && this.sizeid == SId) {
            this.issqty = total;
            this.ordqty = total;
        }
    });
    //loadDelStockTable(SItemList);

    InputSaveJobdetTab(IpSaveJobDetList);
    InputJobdetTab(IpJobDetList);
    InputitmTab(IpItmList);
    InputStkdetTab(IpStkDetList);
    InputSaveStkdetTab(IpSaveStkDetList);

}



function OutputJobdetTab(list) {
    // $('#outputjodettab').DataTable().destroy();
    var inputcount = 0;
    $('#outputjodettab tr').each(function () {
        inputcount++;
    });
    if (inputcount > 0) {
        $('#outputjodettab').DataTable().destroy();
    }
    $('#outputjodettab').empty();

    $('#outputjodettab').DataTable({
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
              { title: "Sno", data: "sno", "visible": false },
                   { title: "Prdprgdetid", data: "prgdetid", "visible": false },
                   { title: "Itmid", data: "itmid", "visible": false },
                   { title: "Clrid", data: "clrid", "visible": false },
                   { title: "Sizeid", data: "sizeid", "visible": false },
                    { title: "PlanSizeid", data: "plansizeid", "visible": false },
                   { title: "Prog No", data: "prodpgmno" },
                   { title: "Job No", data: "jobordno" },
                   { title: "Ref No", data: "refno" },
                                   { title: "Item", data: "itm" },
                                                   { title: "Color", data: "clr" },
                                                                   ///{ title: "Size", data: "size" },

                                                                    {
                                                                        title: "Size", data: "size",

                                                                        render: function (data, type, row) {
                                                                            var $select = $("<select></select>", {
                                                                                "id": "opsizelist",
                                                                                "value": data,
                                                                                "class": "form-control opsizelist",
                                                                                "style":"width:100px"
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


                                                                  //   { title: "Rate", data: "rate" },
                                                                     {
                                                                         title: "Rate", data: "rate",
                                                                         render: function (data) {
                                                                             if (ChkBudProApp == "Y" || CostAppSamProCheck=="Y") {
                                                                                 return '<input type="text" id="txtJOpRQty" class="calcjobrate form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';
                                                                             }
                                                                             else {
                                                                                 return '<input type="text" id="txtJOpRQty" class="calcjobrate form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';
                                                                             }
                                                                         },
                                                                     },
                   {
                       title: "Prog Qty", data: "prgopqty",

                   },
                   { title: "Bal Qty", data: "bal" },
                     { title: "LBalQty", data: "LossBalQty" },
                   {
                       title: "Qty", data: "ordqty",
                       render: function (data) {

                           return '<input type="text" id="txtOpjobOrdQty" class="calcsepquan form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';

                       },
                   },
                   {
                       title: "Sec Qty", data: "SecQty",
                       render: function (data) {

                           return '<input type="text" id="txtOpjobsecOrdQty" class="calcsepsecquan form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';

                       },
                   },
                     {
                         title: "Action", "mDataProp": null,
                         "sDefaultContent": '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="View Item" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnDisInputItemview btn btn-round btn-info"> <i class="fa fa-eye"></i> </button></div>'
                     },
                      {
                          title: "Lp Len", data: "Loop_Len",
                          render: function (data) {

                              return '<input type="text" id="txtJobLooplen" class="calcjoblooplen form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';

                          },
                      },
                   {
                       title: "Gauge", data: "Gauge",
                       render: function (data) {

                           return '<input type="text" id="txtJobGauge" class="calcjobguage form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';

                       },
                   },


        ]

    });
    var table = $('#outputjodettab').DataTable();
    $("#outputjodettab tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#outputjodettab tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });

    CalcTotalQty();

}


function InputSaveJobdetTab(list) {
    $('#inputsavejodettab').DataTable().destroy();

    $('#inputsavejodettab').DataTable({
        data: list,
        columns: [
              { title: "Sno", data: "sno", "visible": false },
                   { title: "Prdprgdetid", data: "prgdetid", "visible": false },
                   { title: "Itmid", data: "itmid", "visible": false },
                   { title: "Clrid", data: "clrid", "visible": false },
                   { title: "Sizeid", data: "sizeid", "visible": false },
                   { title: "ProdProgNo", data: "prodpgmno" },
                   { title: "Job Ord No", data: "jobordno" },
                   {
                       title: "Prog Qty", data: "prgopqty",

                   },
                   //{ title: "Balance", data: "bal" },

                   {
                       title: "Adj Qty", data: "ordqty",
                       render: function (data) {

                           return '<input type="text" id="txtiptsavejobOrdQty" class="editor-active"  style="width: 50px;text-align: center;"  value=' + data + ' onkeyup="calcipsepquan(this.value);">';

                       },
                   },
                   { title: "Sec Qty", data: "isdeci" },


        ]

    });
}

function InputJobdetTab(list) {
    //$('#inputjodettab').DataTable().destroy();
    var inputcount = 0;
    $('#inputjodettab tr').each(function () {
        inputcount++;
    });
    if (inputcount > 0) {
        $('#inputjodettab').DataTable().destroy();
    }
    $('#inputjodettab').empty();

    $('#inputjodettab').DataTable({
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
              { title: "Sno", data: "sno", "visible": false },
                   { title: "Prdprgdetid", data: "prgdetid", "visible": false },
                   { title: "Itmid", data: "itmid", "visible": false },
                   { title: "Clrid", data: "clrid", "visible": false },
                   { title: "Sizeid", data: "sizeid", "visible": false },

                   { title: "Prog No", data: "prodpgmno", "visible": false },
                   { title: "Job No", data: "jobordno", "visible": false },
                    { title: "Order No", data: "orderno" },
                   { title: "Ref No", data: "refno" },
                         { title: "Item", data: "itm" },
                       { title: "Color", data: "clr" },
                         //{ title: "Size", data: "size" },

                         {
                             title: "Size", data: "size",

                             render: function (data, type, row) {
                                 var $select = $("<select></select>", {
                                     "id": "ipsizelist",
                                     "value": data,
                                     "class": "form-control ipsizelist",
                                     "style":"width: 100px",
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
                         },



                   //{
                   //    title: "Prog Qty", data: "prgopqty",

                   //},

                   {
                       title: "Prog Qty", data: "prgopqty",
                       render: function (data) {

                           return '<input type="text" id="txtipprgopqty" class="txtipprgopqty form-control" disabled="disabled" style="width: 50px;text-align: center;"  value=' + data + '>';

                       },
                   },

                     {
                         title: "Bal Qty", data: "bal",

                     },

                   { title: "Per", data: "YarnPer" },

                   {
                       title: "Qty", data: "ordqty",
                       render: function (data) {

                           return '<input type="text" id="txtiptjobOrdQty" class="calcipsepquan form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';

                       },
                   },
                   {
                       title: "Sec Qty", data: "SecQty",
                       render: function (data) {

                           return '<input type="text" id="txtiptsecjobOrdQty" class="calcipsepquansec form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';

                       },
                   },
                   { title: "opItmid", data: "opitmid", "visible": false },
                   { title: "opClrid", data: "opclrid", "visible": false },
                   { title: "opSizeid", data: "opsizeid", "visible": false },
                     { title: "Op Item", data: "opitm" },
                       { title: "Op Color", data: "opclr" },
                         { title: "Op Size", data: "opsize" },

        ]

    });

    var table = $('#inputjodettab').DataTable();
    $("#inputjodettab tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#inputjodettab tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });

    CalcTotalQty();

}
$(document).on('click', '.btnviewopitem', function () {
    debugger;
    var table = $('#outputitmtab').DataTable();

    var ItmId = table.row($(this).parents('tr')).data()["itmid"];
    var ClrId = table.row($(this).parents('tr')).data()["clrid"];
    var SzId = table.row($(this).parents('tr')).data()["sizeid"];


    var OQty = $(this).closest('tr').find('#txtRQty').val();

    //if (Mode == 0) {

    var colorempty = [];
    colorempty = OpSaveJobDetList;

    colorempty = $.grep(colorempty, function (v) {
        return (v.itmid === ItmId && v.clrid === ClrId && v.sizeid === SzId);
    });

    OpJobDetList = colorempty;
    OutputJobdetTab(OpJobDetList);


    // }

    //if (Mode == 1 || Mode == 2) {
    //    // var OQty = 0;
    //    //LoadEditOrderDetails(POMId, ItmId, ClrId, SzId, PUId, OQty)
    //    LoadEditGrnOrderDetails(GrnMasId, ItmId, ClrId, SzId, PUId, OQty, SupplierId, CompId)
    //}


});

$(document).on('click', '.btnviewiputitem', function () {
    debugger;

    var table = $('#inputitmtab').DataTable();

    var ItmId = table.row($(this).parents('tr')).data()["itmid"];
    var ClrId = table.row($(this).parents('tr')).data()["clrid"];
    var SzId = table.row($(this).parents('tr')).data()["sizeid"];

    var OQty = $(this).closest('tr').find('#txtRQty').val();


    var colorempty = [];
    colorempty = IpSaveJobDetList;

    colorempty = $.grep(colorempty, function (v) {
        return (v.itmid === ItmId && v.clrid === ClrId && v.sizeid === SzId);
    });

    IpJobDetList = colorempty;
    InputJobdetTab(IpJobDetList);


    var ItmId = IpJobDetList[0]['itmid'];
    var ClrId = IpJobDetList[0]['clrid'];
    var SzId = IpJobDetList[0]['sizeid'];
    var jobno = IpJobDetList[0]['jobordno'];
    var Stkempty = [];
    Stkempty = IpSaveStkDetList;

    Stkempty = $.grep(Stkempty, function (v) {
        return (v.itmid === ItmId && v.clrid === ClrId && v.sizeid === SzId && v.jobordno === jobno);
    });

    IpStkDetList = Stkempty;
    InputStkdetTab(IpStkDetList);



});



$(document).on('click', '.btnviewiputstk', function () {
    debugger;



    var table = $('#inputjodettab').DataTable();

    var ItmId = table.row($(this).parents('tr')).data()["itmid"];
    var ClrId = table.row($(this).parents('tr')).data()["clrid"];
    var SzId = table.row($(this).parents('tr')).data()["sizeid"];
    var jobno = table.row($(this).parents('tr')).data()["jobordno"];


    var Stkempty = [];
    Stkempty = IpSaveStkDetList;

    Stkempty = $.grep(Stkempty, function (v) {
        return (v.itmid === ItmId && v.clrid === ClrId && v.sizeid === SzId && v.jobordno === jobno);
    });

    IpStkDetList = Stkempty;
    InputStkdetTab(IpStkDetList);



});
function OutputSaveJobdetTab(list) {
    $('#outputsavejodettab').DataTable().destroy();

    $('#outputsavejodettab').DataTable({
        data: list,
        columns: [
              { title: "Sno", data: "sno" },
                   { title: "Prdprgdetid", data: "prgdetid" },
                   { title: "Itmid", data: "itmid" },
                   { title: "Clrid", data: "clrid" },
                   { title: "Sizeid", data: "sizeid" },
                   { title: "ProdProgNo", data: "prodpgmno" },
                   { title: "Job Ord No", data: "jobordno" },
                   {
                       title: "Prog Qty", data: "prgopqty",

                   },
                   { title: "Balance", data: "bal" },
                      { title: "Loss BalQty", data: "LossBalQty" },
                   {
                       title: "Adj Qty", data: "ordqty",
                       //render: function (data) {

                       //    return '<input type="text" id="txtOpjobOrdQty" class="editor-active"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                       //},
                   },
                   { title: "Sec Qty", data: "isdeci" },


        ]

    });
}


function Loadstkdet() {
    debugger;

    var CompId = $('#ddlCompany').val();
    var procid = 0;
    var itct = ''
    var cid = 0;
    var sid = 0;
    var itid = 0;
    var ttypt = '';
    var Storeid = $('#ddlAStoreUnit').val();
    $.ajax({
        url: "/ProcessOrder/LoadInputStkWgrid",
        data: JSON.stringify({ itmcat: itct, itmid: itid, clrid: cid, sizeid: sid, jobordno: JOrdID, transtype: ttypt, cmpid: CompId, procid: procid,Storeid :Storeid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            IpSaveStkDetList = json.Value;
            if (AllowList.length > 0) {
                if (AllowList[0].PQuantity > 0) {
                    var qn = AllowList[0].PQuantity;
                    $.each(IpSaveStkDetList, function () {
                        //this.allow = parseFloat(this.bal) + parseFloat(qn);
                        this.allow = parseFloat(this.bal);
                    });
                }
                else if (AllowList[0].ProPercentage > 0) {
                    var qn = AllowList[0].ProPercentage;
                    $.each(IpSaveStkDetList, function () {
                        var bl = (parseFloat(this.bal) * qn) / 100;
                        bl = bl.toFixed(3);
                        this.allow = (parseFloat(this.bal) + parseFloat(bl)).toFixed(3);
                    });
                }
                else if (AllowList[0].PQuantity == 0 && AllowList[0].ProPercentage == 0) {
                    $.each(IpSaveStkDetList, function () {
                        this.allow = this.bal;
                    });
                }

            }

            //var savestk = [];

            //for (var i = 0; IpSaveJobDetList.length > i; i++) {

            //    for (var j = 0; IpSaveStkDetList.length > j; j++) {

            //        if (IpSaveJobDetList[i].itmid == IpSaveStkDetList[j].itmid && IpSaveJobDetList[i].clrid == IpSaveStkDetList[j].clrid && IpSaveJobDetList[i].sizeid == IpSaveStkDetList[j].sizeid && IpSaveJobDetList[i].jobordno == IpSaveStkDetList[j].jobordno) {
            //            savestk.push(IpSaveStkDetList[j]);
            //        }
            //    }
            //}

            //IpSaveStkDetList = savestk;

            InputSaveStkdetTab(IpSaveStkDetList);



        }

    });
}

function InputSaveStkdetTab(list) {

    $('#inputsavestkdettab').DataTable().destroy();
    list.sort(function (a, b) {
        return a.stockid - b.stockid;
    });
    $('#inputsavestkdettab').DataTable({
        data: list,
        columns: [
              { title: "Stockid", data: "stockid" },

                   { title: "Itmid", data: "itmid" },
                   { title: "Clrid", data: "clrid" },
                   { title: "Sizeid", data: "sizeid" },
                   { title: "JobOrdNo", data: "jobordno" },
                   { title: "Lot No", data: "lotno" },
                   {
                       title: "Stock", data: "bal",

                   },


                   {
                       title: "Issues", data: "issues",
                       render: function (data) {

                           return '<input type="text" id="txtipissueqty" class="editor-active"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                       },
                   },
                   { title: "Process", data: "process" },


        ]

    });
}

function InputStkdetTab(list) {
    //$('#inputstkdettab').DataTable().destroy();
    var inputcount = 0;
    $('#inputstkdettab tr').each(function () {
        inputcount++;
    });
    if (inputcount > 0) {
        $('#inputstkdettab').DataTable().destroy();
    }
    $('#inputstkdettab').empty();

    $('#inputstkdettab').DataTable({
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
              { title: "Stockid", data: "stockid", "visible": false },

                   { title: "Itmid", data: "itmid", "visible": false },
                   { title: "Clrid", data: "clrid", "visible": false },
                   { title: "Sizeid", data: "sizeid", "visible": false },
                    { title: "Document No", data: "TransNo" },
                   { title: "Ord No", data: "orderno" },
                   { title: "Ref No", data: "refno" },
                    { title: "Job No", data: "jobordno", "visible": false },
                     { title: "Lot No", data: "lotno", "visible": false },
                      { title: "Supplier", data: "supplier" },
                       { title: "Item", data: "itm", "visible": false },
                        { title: "Color", data: "clr", "visible": false },
                         { title: "Size", data: "size", "visible": false },
                          { title: "Process", data: "process" },

                    {
                        title: "Stock Qty", data: "bal",
                        render: function (data) {

                            return '<input type="text" id="txtstockval" disabled="disabled" class="calcStockqty form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                        },
                    },

                   {
                       title: "Iss Qty", data: "issues",
                       render: function (data) {

                           return '<input type="text" id="txtiptissQty" class="calcStockqty form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                       },
                   },



        ]

    });

    var table = $('#inputstkdettab').DataTable();
    $("#inputstkdettab tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#inputstkdettab tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}



function GenerateNumber() {
    debugger;

    table = "Process_Ord_Mas",
    column = "ProcessOrder",
    compId = CompanyId,
    Docum = 'Process ORDER'

    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $('#txtOrderNo').val(result.Value);
        }
    });
}


function GenerateIssueNumber() {
    debugger;

    table = "Process_Issue_Mas",
    column = "ProcessIssueNo",
    compId = CompanyId,
    Docum = 'PROCESS ISSUE'

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



function Check() {
    debugger;
    var list = [];
    if (IpSaveStkDetList.length > 0) {
        for (var r = 0; r < IpSaveStkDetList.length; r++) {
            if (IpSaveStkDetList[r].issues > 0) {
                IssueMas();
                return true;
            }
        }
    }
    if (IpSaveStkDetList.length > 0) {
        for (var r = 0; r < IpSaveStkDetList.length; r++) {
            if (IpSaveStkDetList[r].issues > 0) {
                list.push(IpSaveStkDetList[r]);
            }
        }
        if (list.length == 0) {
            Add();
            return true;
        }
    }
    if (IpSaveStkDetList.length == 0) {
        Add();
        return true;
    }
}

function ChkDelete() {
    debugger;
    if (IpSaveStkDetList.length > 0) {
        for (var r = 0; r < IpSaveStkDetList.length; r++) {
            if (IpSaveStkDetList[r].issues > 0) {
                IssueDelete();
                return true;
            }
        }
    }
    if (IpSaveStkDetList.length > 0) {
        for (var r = 0; r < IpSaveStkDetList.length; r++) {
            if (IpSaveStkDetList[r].issues > 0) {
                list.push(IpSaveStkDetList[r]);
            }
        }
        if (list.length == 0) {
            MasDelete();
            return true;
        }
    }
    if (IpSaveStkDetList.length == 0) {
        MasDelete();
        return true;
    }
}

function ChkUpdate() {
    debugger;
    var list = [];
    if (IpSaveStkDetList.length > 0) {
        for (var r = 0; r < IpSaveStkDetList.length; r++) {
            if (IpSaveStkDetList[r].issues > 0) {
                IssueMasUpd();
                return true;
            }
        }
    }
    if (IpSaveStkDetList.length > 0) {
        for (var r = 0; r < IpSaveStkDetList.length; r++) {
            if (IpSaveStkDetList[r].issues > 0) {
                list.push(IpSaveStkDetList[r]);
            }
        }
        if (list.length == 0) {
            Update();
            return true;
        }
    }
    if (IpSaveStkDetList.length == 0) {
        Update();
        return true;
    }
}
function Add() {
    debugger;
    var type = $('input[name="optwrkord"]:checked').attr('value');
    var ordtype = $('input[name="type"]:checked').attr('value');
    var distype = $('input[name="disploc"]:checked').attr('value');
    var desptchtype = $('input[name="DType"]:checked').attr('value');
    var isstype = $('input[name="IssType"]:checked').attr('value');
    var subtype = $('input[name="subproctype"]:checked').attr('value');
    var fintype = $('input[name="finproctype"]:checked').attr('value');
    var iolist = [];
    var jobdetlist = [];
    var stkdetlist = [];



    var opchk = [];
    var ipchk = [];
    for (var y = 0; y < OpItmList.length; y++) {
        if (OpItmList[y].ordqty > 0) {
            opchk.push(OpItmList[y]);
        }
    }


    for (var u = 0; u < IpItmList.length; u++) {
        if (IpItmList[u].ordqty > 0) {
            ipchk.push(IpItmList[u]);
        }
    }
    if (opchk.length == 0 || ipchk.length == 0) {
        //alert('Please fill atleast any one qty...');
        var msg = 'Please fill atleast any one quantity...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }


    if (OpItmList.length > 0) {
        for (var r = 0; r < OpItmList.length; r++) {
            var det = {
                // productionorddetid:
                //  productionordid:
                itemid: OpItmList[r].itmid,
                colorid: OpItmList[r].clrid,
                sizeid: OpItmList[r].sizeid,
                inp_op: OpItmList[r].inrout,
                order_output_qty: OpItmList[r].ordqty,// OpItmList[r].prgopqty,
                issued_qty: 0.00,
                rate: OpItmList[r].rate,
                received_qty: 0.00,
                Return_Qty: 0.00,
                Damage_qty: 0.00,
                Cancel_Qty: 0.00,
                //Returnable_Qty:0.00,
                //Inp_CancelQty:
                //Markup_Rate:
                //Markup_Value:
                PlannedSizeID: OpItmList[r].plansizeid,
                OrdSecQty: OpItmList[r].secqty,
                ItemRemarks: $("#txtremarks").val(),
                Loss_Qty: 0.00,
                //IN_OUT_UOMID:
                //IssueSizeID:
                ReqDate: $("#txtOrderDate").val(),//new Date($('#txtOrderDate').val()),
                Loop_Len: OpItmList[r].Loop_Len,
                Gauge: OpItmList[r].Gauge,
                TaxAppVal: OpItmList[r].TaxAppVal,
                FinGsm: OpItmList[r].FinGsm,
                FinDiaid: OpItmList[r].FinDiaid,
            }
            iolist.push(det);
        }
    }


    if (IpItmList.length > 0) {
        for (var r = 0; r < IpItmList.length; r++) {
            var det = {
                // productionorddetid:
                //  productionordid:
                itemid: IpItmList[r].itmid,
                colorid: IpItmList[r].clrid,
                sizeid: IpItmList[r].sizeid,
                inp_op: IpItmList[r].inrout,
                order_output_qty: IpItmList[r].ordqty,
                issued_qty: 0.00,
                rate: IpItmList[r].rate,
                received_qty: 0.00,
                Return_Qty: 0.00,
                Damage_qty: 0.00,
                Cancel_Qty: 0.00,
                //Returnable_Qty:0.00,
                //Inp_CancelQty:
                //Markup_Rate:
                //Markup_Value:
                PlannedSizeID: IpItmList[r].plansizeid,
                OrdSecQty: IpItmList[r].secqty,
                ItemRemarks: "",
                Loss_Qty: 0.00,
                //IN_OUT_UOMID:
                //IssueSizeID:
                ReqDate: $("#txtOrderDate").val(),//new Date($('#txtOrderDate').val()),
                //Loop_Len:
                //Gauge:

            }
            iolist.push(det);
        }
    }

    if (OpSaveJobDetList.length > 0) {
        for (var s = 0; s < OpSaveJobDetList.length; s++) {
            var objdet = {
                ProgQty: OpSaveJobDetList[s].prgopqty,
                OrderQty: OpSaveJobDetList[s].ordqty,
                issued_qty: 0.00,
                received_qty: 0.00,
                Return_Qty: 0.00,
                Damage_qty: 0.00,
                Cancel_Qty: 0.00,
                Job_ord_no: OpSaveJobDetList[s].jobordno,
                ProdPrgNo: OpSaveJobDetList[s].prodpgmno,
                //Returnable_Qty:
                Closed: 'N',
                //Inp_CancelQty:
                OrdSecQty: OpSaveJobDetList[s].secqty,
                PlannedSizeID: OpSaveJobDetList[s].plansizeid,
                Loss_Qty: 0.00,
                buy_ord_ship: 0,
                itemid: OpSaveJobDetList[s].itmid,
                colorid: OpSaveJobDetList[s].clrid,
                sizeid: OpSaveJobDetList[s].sizeid,
                ipop: OpSaveJobDetList[s].inrout
            }
            jobdetlist.push(objdet);
        }
    }

    if (IpSaveJobDetList.length > 0) {
        for (var s = 0; s < IpSaveJobDetList.length; s++) {
            var objdet = {
                ProgQty: IpSaveJobDetList[s].prgopqty,
                OrderQty: IpSaveJobDetList[s].ordqty,
                issued_qty: 0.00,
                received_qty: 0.00,
                Return_Qty: 0.00,
                Damage_qty: 0.00,
                Cancel_Qty: 0.00,
                Job_ord_no: IpSaveJobDetList[s].jobordno,
                ProdPrgNo: IpSaveJobDetList[s].prodpgmno,
                PlannedSizeID: IpSaveJobDetList[s].plansizeid,
                //Returnable_Qty:
                Closed: 'N',
                //Inp_CancelQty:
                OrdSecQty: IpSaveJobDetList[s].secqty,
                Loss_Qty: 0.00,
                buy_ord_ship: 0,
                itemid: IpSaveJobDetList[s].itmid,
                colorid: IpSaveJobDetList[s].clrid,
                sizeid: IpSaveJobDetList[s].sizeid,
                ipop: IpSaveJobDetList[s].inrout
            }
            jobdetlist.push(objdet);
        }
    }

    //if (IpSaveStkDetList.length > 0) {
    //    for (var j = 0; j < IpSaveStkDetList.length; j++) {
    //        var objstk = {
    //            //ProductionOrdStockId:
    //            //    ProductionOrdJobid:
    //            Productionorder: $("#txtOrderNo").val(),
    //            jobordno: IpSaveStkDetList[j].jobordno,
    //            ItemStockId: IpSaveStkDetList[j].stockid,
    //            IssueQty: IpSaveStkDetList[j].issues,
    //            ReturnQty: 0.00,
    //            LossQty: 0.00,
    //            Returnable_Qty: 0.00,
    //            Markup_Rate: 0.00,
    //            LotNo: '',
    //            Itemid: IpSaveStkDetList[j].itmid,
    //            Colorid: IpSaveStkDetList[j].clrid,
    //            Sizeid: IpSaveStkDetList[j].sizeid
    //        }
    //        stkdetlist.push(objstk);
    //    }
    //}
    //if ($('#ddlLocation').val() == "0") {      
    //    $('#ddlLocation').css('border-color', 'Red');
    //}


    //if ($('#ddlIssueLocation').val() == "0") {       
    //    $('#ddlIssueLocation').css('border-color', 'Red');
    //}



    var Obj = {
        // productionordid:
        processorder: $("#txtOrderNo").val(),
        processordate: $("#txtOrderDate").val(),//new Date($('#txtOrderDate').val()),
        processorid: Processorid,
        processid: Processid,
        remarks: $("#txtremarks").val(),
        companyunitid: Companyunitid,
        companyid: CompanyId,
        ProcessorType: type,
        OrderType: ordtype,
        Closed: 'N',
        // OrderCumIssue:
        DelidateTime: $("#txtDeliDate").val(),//new Date($('#txtDeliDate').val()),
        ComboIds: "",
        DispLocType: desptchtype,
        DispLoc: $("#ddlLocation").val(),
        IssueLocType: isstype,
        IssueLoc: $("#ddlIssueLocation").val(),
        //Teamid:
        //StoreUnitId: 1,
        CreatedBy: Guserid,
        Vehicleno: $("#txtVehicleno").val(),
        //Phoneno:
        //contactperson:
        //amount:
        //taxamount:
        //saccode:
        //CGST:
        //SGST:
        //IGST:
        //TotCGST:
        //TotSGST:
        //TotIGST:
        moduletype: 'P',
        ProdDet: iolist,
        ProdJobDet: jobdetlist,
        ////ProdStkDet: stkdetlist,
        ProdAddLess: AccList,
        YarnLoc: $("#txtyarnloc").val(),
        KnitLoc: $("#txtknitloc").val(),
        subtype: subtype,
        fintype: fintype

    }
    $("#btnAdd").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/ProcessOrder/Add",
        data: JSON.stringify(Obj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            //if (result.Value == 1) {

            //alert('Data Saved Successfully');
            AddUserEntryLog('Process', 'Process Order', 'ADD', $("#txtOrderNo").val());
            //window.location.href = "/ProcessOrder/ProcessOrderIndex";
            var msg = 'Data Saved Successfully...';
            var flg = 1;
            var mod = 0;
            var url = "/ProcessOrder/ProcessOrderIndex";
            AlartMessage(msg, flg, mod, url);
            //}
            //if (result.Value == 0) {

            //    alert('Data not saved properly');
            //    window.location.href = "/StockInwardMain/StockInwardMainIndex";

            //}

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }

    });
}

function IssueDelete() {
    debugger;
    var desptchtype = $('input[name="DType"]:checked').attr('value');
    var isstype = $('input[name="IssType"]:checked').attr('value');
    {
        debugger;
        var type = $('input[name="optwrkord"]:checked').attr('value');
        var ordtype = $('input[name="type"]:checked').attr('value');
        var distype = $('input[name="disploc"]:checked').attr('value');
        var iolist = [];
        var jobdetlist = [];
        var stkdetlist = [];
        if (OpItmList.length > 0) {
            for (var r = 0; r < OpItmList.length; r++) {
                var det = {
                    processorddetid: OpItmList[r].sno,
                    processordid: Masid,
                    itemid: OpItmList[r].itmid,
                    colorid: OpItmList[r].clrid,
                    sizeid: OpItmList[r].plansizeid,
                    inp_op: OpItmList[r].inrout,
                    order_output_qty: 0,// OpItmList[r].prgopqty,
                    issued_qty: 0.00,
                    rate: OpItmList[r].rate,
                    received_qty: OpItmList[r].ordqty,
                    Return_Qty: 0.00,
                    Damage_qty: 0.00,
                    Cancel_Qty: 0.00,
                    //Returnable_Qty:0.00,
                    //Inp_CancelQty:
                    //Markup_Rate:
                    //Markup_Value:
                    PlannedSizeID: OpItmList[r].plansizeid,
                    OrdSecQty: OpItmList[r].secqty,
                    ItemRemarks: $("#txtremarks").val(),
                    Loss_Qty: 0.00,
                    //IN_OUT_UOMID:
                    //IssueSizeID:
                    ReqDate: $("#txtOrderDate").val(),//new Date($('#txtOrderDate').val()),
                    TaxAppVal: OpItmList[r].TaxAppVal,
                    FinGsm: OpItmList[r].FinGsm,
                    FinDiaid: OpItmList[r].FinDiaid,

                    //Loop_Len:
                    //Gauge:

                }
                iolist.push(det);
            }
        }


        if (IpItmList.length > 0) {
            for (var r = 0; r < IpItmList.length; r++) {
                var det = {
                    processorddetid: IpItmList[r].sno,
                    processordid: Masid,
                    itemid: IpItmList[r].itmid,
                    colorid: IpItmList[r].clrid,
                    sizeid: IpItmList[r].sizeid,
                    inp_op: IpItmList[r].inrout,
                    order_output_qty: IpItmList[r].ordqty,
                    issued_qty: IpItmList[r].issqty,
                    rate: IpItmList[r].rate,
                    received_qty: 0.00,
                    Return_Qty: 0.00,
                    Damage_qty: 0.00,
                    Cancel_Qty: 0.00,
                    //Returnable_Qty:0.00,
                    //Inp_CancelQty:
                    //Markup_Rate:
                    //Markup_Value:
                    PlannedSizeID: IpItmList[r].plansizeid,
                    OrdSecQty: IpItmList[r].secqty,
                    ItemRemarks: "",
                    Loss_Qty: 0.00,
                    //IN_OUT_UOMID:
                    //IssueSizeID:
                    ReqDate: $("#txtOrderDate").val(),//new Date($('#txtOrderDate').val()),
                    //Loop_Len:
                    //Gauge:

                }
                iolist.push(det);
            }
        }

        if (OpSaveJobDetList.length > 0) {
            for (var s = 0; s < OpSaveJobDetList.length; s++) {
                var objdet = {
                    ProcessnOrdid: Masid,
                    ProgQty: OpSaveJobDetList[s].prgopqty,
                    OrderQty: OpSaveJobDetList[s].ordqty,
                    issued_qty: 0.00,
                    received_qty: 0.00,
                    Return_Qty: 0.00,
                    Damage_qty: 0.00,
                    Cancel_Qty: 0.00,
                    Job_ord_no: OpSaveJobDetList[s].jobordno,
                    ProdPrgNo: OpSaveJobDetList[s].prodpgmno,
                    //Returnable_Qty:
                    Closed: 'N',
                    //Inp_CancelQty:
                    OrdSecQty: OpSaveJobDetList[s].secqty,
                    PlannedSizeID: OpSaveJobDetList[s].plansizeid,
                    Loss_Qty: 0.00,
                    buy_ord_ship: 0,
                    itemid: OpSaveJobDetList[s].itmid,
                    colorid: OpSaveJobDetList[s].clrid,
                    sizeid: OpSaveJobDetList[s].sizeid,
                    ipop: OpSaveJobDetList[s].inrout
                }
                jobdetlist.push(objdet);
            }
        }

        if (IpSaveJobDetList.length > 0) {
            for (var s = 0; s < IpSaveJobDetList.length; s++) {
                var objdet = {
                    ProcessnOrdid: Masid,
                    ProgQty: IpSaveJobDetList[s].prgopqty,
                    OrderQty: IpSaveJobDetList[s].ordqty,
                    issued_qty: IpSaveJobDetList[s].ordqty,
                    received_qty: 0.00,
                    Return_Qty: 0.00,
                    Damage_qty: 0.00,
                    Cancel_Qty: 0.00,
                    Job_ord_no: IpSaveJobDetList[s].jobordno,
                    ProdPrgNo: IpSaveJobDetList[s].prodpgmno,
                    //Returnable_Qty:
                    Closed: 'N',
                    //Inp_CancelQty:
                    OrdSecQty: IpSaveJobDetList[s].secqty,
                    Loss_Qty: 0.00,
                    buy_ord_ship: 0,
                    itemid: IpSaveJobDetList[s].itmid,
                    colorid: IpSaveJobDetList[s].clrid,
                    sizeid: IpSaveJobDetList[s].sizeid,
                    ipop: IpSaveJobDetList[s].inrout,
                    PlannedSizeID: IpSaveJobDetList[s].plansizeid,

                }
                jobdetlist.push(objdet);
            }
        }

        if (IpSaveStkDetList.length > 0) {
            for (var j = 0; j < IpSaveStkDetList.length; j++) {
                var objstk = {
                    ProcessIssueId: $("#txtIssueId").val(),
                    ProcessIssueNo: $("#txtIssueNo").val(),
                    Job_ord_no: IpSaveStkDetList[j].jobordno,
                    ItemStockId: IpSaveStkDetList[j].stockid,
                    IssueQty: IpSaveStkDetList[j].issues,
                    ReturnQty: 0.00,
                    LossQty: 0.00,
                    Returnable_Qty: 0.00,
                    Markup_Rate: 0.00,
                    LotNo: '',
                    Itemid: IpSaveStkDetList[j].itmid,
                    Colorid: IpSaveStkDetList[j].clrid,
                    Sizeid: IpSaveStkDetList[j].sizeid,
                    ProcessIssStockId: IpSaveStkDetList[j].ProcessIssStockId,
                }
                stkdetlist.push(objstk);
            }
        }

        var issuemaslist = [];
        var issueiolist = [];
        var issuejobdet = [];
        if (OpItmList.length > 0) {
            for (var r = 0; r < OpItmList.length; r++) {
                var det = {
                    // ProcessIssueDetId:
                    ProcessIssueId: $("#txtIssueId").val(),
                    itemid: OpItmList[r].itmid,
                    colorid: OpItmList[r].clrid,
                    sizeid: OpItmList[r].sizeid,
                    IssueQty: OpItmList[r].ordqty,
                    SecQty: 0,// OpItmList[r].prgopqty,
                    OutputUom: 0.00,
                    OutputValue: 0.00,// OpItmList[r].rate,
                    IPMarkup_Rate: 0.00,//OpItmList[r].ordqty,
                    ip_op: OpItmList[r].inrout,

                }
                issueiolist.push(det);
            }
        }

        if (IpItmList.length > 0) {
            for (var r = 0; r < IpItmList.length; r++) {
                var det = {
                    // ProcessIssueDetId:
                    ProcessIssueId: $("#txtIssueId").val(),
                    itemid: IpItmList[r].itmid,
                    colorid: IpItmList[r].clrid,
                    sizeid: IpItmList[r].sizeid,
                    IssueQty: IpItmList[r].ordqty,
                    SecQty: 0,// OpItmList[r].prgopqty,
                    OutputUom: 0.00,
                    OutputValue: 0.00,// OpItmList[r].rate,
                    IPMarkup_Rate: 0.00,//OpItmList[r].ordqty,
                    ip_op: IpItmList[r].inrout,
                    PlannedSizeID: IpItmList[r].plansizeid,

                }
                issueiolist.push(det);
            }
        }

        if (OpSaveJobDetList.length > 0) {
            for (var s = 0; s < OpSaveJobDetList.length; s++) {
                var objdet = {
                    //ProcessIssueJobId
                    ProcessIssueId: $("#txtIssueId").val(),
                    //ProcessIssueDetId
                    Job_ord_no: OpSaveJobDetList[s].jobordno,
                    ProdPrgNo: OpSaveJobDetList[s].prodpgmno,
                    LastProcessid: 0,//IpSaveJobDetList[s].ordqty,
                    IssueQty: OpSaveJobDetList[s].ordqty,
                    ReturnQty: 0.00,
                    LossQty: 0.00,
                    SecQty: 0.00,
                    itemid: OpSaveJobDetList[s].itmid,
                    colorid: OpSaveJobDetList[s].clrid,
                    sizeid: OpSaveJobDetList[s].sizeid,
                    ip_op: OpSaveJobDetList[s].inrout,
                    PlannedSizeID: OpSaveJobDetList[s].plansizeid,
                }
                issuejobdet.push(objdet);
            }
        }


        if (IpSaveJobDetList.length > 0) {
            for (var s = 0; s < IpSaveJobDetList.length; s++) {
                var objdet = {
                    //ProcessIssueJobId
                    ProcessIssueId: $("#txtIssueId").val(),
                    //ProcessIssueDetId
                    Job_ord_no: IpSaveJobDetList[s].jobordno,
                    ProdPrgNo: IpSaveJobDetList[s].prodpgmno,
                    LastProcessid: 0,//IpSaveJobDetList[s].ordqty,
                    IssueQty: IpSaveJobDetList[s].ordqty,
                    ReturnQty: 0.00,
                    LossQty: 0.00,
                    SecQty: 0.00,
                    itemid: IpSaveJobDetList[s].itmid,
                    colorid: IpSaveJobDetList[s].clrid,
                    sizeid: IpSaveJobDetList[s].sizeid,
                    ip_op: IpSaveJobDetList[s].inrout,
                    processorddetid: IpSaveJobDetList[s].procorddetid,
                    processordjobdetid: IpSaveJobDetList[s].procordjobid,
                    ProcessIssueDetId: IpSaveJobDetList[s].procissdetid,
                    ProcessIssueJobId: IpSaveJobDetList[s].procissjobid,
                    PlannedSizeID: IpSaveJobDetList[s].plansizeid,
                }
                issuejobdet.push(objdet);
            }
        }

        var obj = {
            ProcessIssueId: $("#txtIssueId").val(),
            ProcessIssueNo: $("#txtIssueNo").val(),
            ProcessIssueDate: $("#txtOrderDate").val(),//new Date($('#txtOrderDate').val()),
            ProcessOrdId: Masid,
            Remarks: $("#txtremarks").val(),
            GatePassVehicle: "",
            //IssueStoreid:
            CreatedBy: Guserid,
            EWayNo: "",
            EWayDate: $("#txtOrderDate").val(),//new Date($('#txtOrderDate').val()),
            //ProcissDet: iolist,
            //ProcissJobDet: jobdetlist,
            //Procissstk: stkdetlist
        }
        issuemaslist.push(obj);

        var Obj = {
            processordid: Masid,
            processorder: $("#txtOrderNo").val(),
            processordate: $("#txtOrderDate").val(),//new Date($('#txtOrderDate').val()),
            processorid: Processorid,
            processid: Processid,
            remarks: $("#txtremarks").val(),
            companyunitid: Companyunitid,
            companyid: CompanyId,
            ProcessorType: type,
            OrderType: ordtype,
            Closed: 'N',
            // OrderCumIssue:
            DelidateTime: $("#txtDeliDate").val(),//new Date($('#txtDeliDate').val()),
            ComboIds: "",
            DispLocType: desptchtype,
            DispLoc: $("#ddlLocation").val(),
            IssueLocType: isstype,
            IssueLoc: $("#ddlIssueLocation").val(),
            //Teamid:
            StoreUnitId: 1,
            CreatedBy: Guserid,
            moduletype: 'P',
            ProdDet: iolist,
            ProdJobDet: jobdetlist,
            ////ProdStkDet: stkdetlist,
            //ProdAddLess: AccList
            ProcissMas: issuemaslist,
            ProcissDet: issueiolist,
            ProcissJobDet: issuejobdet,
            Procissstk: stkdetlist,
            ProdAddLess: AccList

        }
        $("#btnDel").attr("disabled", true);
        LoadingSymb();
        $.ajax({
            url: "/ProcessOrder/DeleteIss",
            data: JSON.stringify(Obj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                debugger;
                if (result.Value == 1) {
                    AddUserEntryLog('Process', 'Process Order', 'DELETE', $("#txtOrderNo").val());
                    //alert('Data Deleted Successfully');
                    //window.location.href = "/ProcessOrder/ProcessOrderIndex";
                    var msg = 'Data Deleted Successfully...';
                    var flg = 2;
                    var mod = 0;
                    var url = "/ProcessOrder/ProcessOrderIndex";
                    AlartMessage(msg, flg, mod, url);
                }
                if (result.Value == 0) {

                    window.location.href = "/Error/Index";

                }

            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }

        });
    }
}

function IssueMas() {
    debugger;
    debugger;
    var type = $('input[name="optwrkord"]:checked').attr('value');
    var ordtype = $('input[name="type"]:checked').attr('value');
    var distype = $('input[name="disploc"]:checked').attr('value');
    var desptchtype = $('input[name="DType"]:checked').attr('value');
    var isstype = $('input[name="IssType"]:checked').attr('value');
    var iolist = [];
    var jobdetlist = [];
    var stkdetlist = [];

    var opchk = [];
    var ipchk = [];
    for (var y = 0; y < OpItmList.length; y++) {
        if (OpItmList[y].ordqty > 0) {
            opchk.push(OpItmList[y]);
        }
    }


    for (var u = 0; u < IpItmList.length; u++) {
        if (IpItmList[u].ordqty > 0) {
            ipchk.push(IpItmList[u]);
        }
    }
    if (opchk.length == 0 || ipchk.length == 0) {
        //alert('Please fill atleast any one qty...');
        var msg = 'Please fill atleast any one quantity...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    var cnt = 0;
    $.each(OpItmList, function (i) {
        $.each(OpSaveJobDetList, function (j) {
            if (OpSaveJobDetList[j].itmid == OpItmList[i].itmid && OpSaveJobDetList[j].clrid == OpItmList[i].clrid
                && OpSaveJobDetList[j].sizeid == OpItmList[i].sizeid
                && OpSaveJobDetList[j].plansizeid == OpItmList[i].plansizeid && OpItmList[i].ordqty >0) {
                if (OpSaveJobDetList[j].rate != OpItmList[i].rate) {
                    cnt = cnt + 1;
                }
                if (ChkBudProApp == 'Y') {
                    if (OpSaveJobDetList[j].rate == 0) {
                        cnt = cnt + 1;
                    }
                }
            }
        });
    });

    if (cnt > 0) {
        //alert('Please Check Item wise rate..');
        var msg = 'Please Check Item wise rate...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

        var optot = 0;
        var iptot = 0;
        var miscnt = 0;
        $.each(OpItmList, function (i) {
            optot = 0;
            iptot = 0;
            $.each(OpSaveJobDetList, function (j) {
                if (OpSaveJobDetList[j].itmid == OpItmList[i].itmid && OpSaveJobDetList[j].clrid == OpItmList[i].clrid
                    && OpSaveJobDetList[j].sizeid == OpItmList[i].sizeid
                    && OpSaveJobDetList[j].plansizeid == OpItmList[i].plansizeid && OpItmList[i].ordqty > 0) {
                    optot = optot + parseFloat(OpSaveJobDetList[j].ordqty);
                }
            });
            $.each(IpSaveJobDetList, function (j) {
                if (IpSaveJobDetList[j].opitmid == OpItmList[i].itmid && IpSaveJobDetList[j].opclrid == OpItmList[i].clrid
                    && IpSaveJobDetList[j].opsizeid == OpItmList[i].plansizeid
                    && IpSaveJobDetList[j].issqty > 0 ) {
                    iptot = iptot + parseFloat(IpSaveJobDetList[j].issqty);
                }
            });
            if ((optot.toFixed(3)==0) && (iptot.toFixed(3)>0)) {
                miscnt = miscnt + 1;
            }
            if ((optot.toFixed(3) >0) && (iptot.toFixed(3) == 0)) {
                miscnt = miscnt + 1;
            }
        });

        if (miscnt > 0) {
            //alert('Please Check Input and Output Zero Qty..');
            var msg = 'Please Check Input and Output Zero quantity...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return true;
        }
 

    if (ValidateProcessInandOutQty == true) {

        var optot = 0;
        var iptot = 0;
        var miscnt = 0;
        $.each(OpItmList, function (i) {
            optot = 0;
            iptot = 0;
            $.each(OpSaveJobDetList, function (j) {
                if (OpSaveJobDetList[j].itmid == OpItmList[i].itmid && OpSaveJobDetList[j].clrid == OpItmList[i].clrid
                    && OpSaveJobDetList[j].sizeid == OpItmList[i].sizeid
                    && OpSaveJobDetList[j].plansizeid == OpItmList[i].plansizeid && OpItmList[i].ordqty > 0) {
                    optot = optot + parseFloat(OpSaveJobDetList[j].ordqty);
                }
            });
            $.each(IpSaveJobDetList, function (j) {
                if (IpSaveJobDetList[j].opitmid == OpItmList[i].itmid && IpSaveJobDetList[j].opclrid == OpItmList[i].clrid
                    && IpSaveJobDetList[j].opsizeid == OpItmList[i].plansizeid
                    && IpSaveJobDetList[j].issqty > 0 && OpItmList[i].ordqty > 0) {
                    iptot = iptot + parseFloat(IpSaveJobDetList[j].issqty);
                }
            });
            if (optot.toFixed(3) != iptot.toFixed(3)) {
                miscnt = miscnt + 1;
            }
        });

        if (miscnt > 0) {
            //alert('Please Check Input and Output Qty Proportion..');
            var msg = 'Please Check Input and Output quantity Proportion...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return true;
        }
    }


    var oldpono = $('#txtOrderNo').val();
    var table = "Process_Ord_Mas";
    var column = "ProcessOrder";
    var compId = CompanyId;
    var Docum = 'Process ORDER';

    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var newpono = result.Value;
            if (oldpono != newpono) {
                //alert('Process OrderNo has been changed...');
                var msg = 'Process Order Number has been changed...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                $('#txtOrderNo').val(result.Value);
            }

            var oldissuno = $('#txtIssueNo').val();
            var table = "Process_Issue_Mas";
            var column = "ProcessIssueNo";
            var compId = CompanyId;
            var Docum = 'PROCESS ISSUE';

            $.ajax({
                url: "/BulkOrder/GenerateNo",
                data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
                type: "POST",
                contentType: "application/json;charset=UTF-8",
                dataType: "json",
                success: function (result) {
                    debugger;
                    var newissueno = result.Value;
                    if (newissueno != oldissuno) {
                        $('#txtIssueNo').val(result.Value);
                        //alert('Process IssueNo has been changed..');
                        var msg = 'Process Issue Number has been changed...';
                        var flg = 4;
                        var mod = 1;
                        var url = "";
                        AlartMessage(msg, flg, mod, url);
                    }
          
    if (OpItmList.length > 0) {
        for (var r = 0; r < OpItmList.length; r++) {
            var det = {
                // productionorddetid:
                //  productionordid:
                itemid: OpItmList[r].itmid,
                colorid: OpItmList[r].clrid,
                sizeid: OpItmList[r].sizeid,
                inp_op: OpItmList[r].inrout,
                order_output_qty: OpItmList[r].ordqty,
                issued_qty: 0.00,
                rate: OpItmList[r].rate,
                received_qty: 0.00,//OpItmList[r].ordqty,
                Return_Qty: 0.00,
                Damage_qty: 0.00,
                Cancel_Qty: 0.00,
                //Returnable_Qty:0.00,
                //Inp_CancelQty:
                //Markup_Rate:
                //Markup_Value:
                PlannedSizeID: OpItmList[r].plansizeid,
                OrdSecQty: OpItmList[r].secqty,
                ItemRemarks: $("#txtremarks").val(),
                Loss_Qty: 0.00,
                //IN_OUT_UOMID:
                //IssueSizeID:
                ReqDate: $("#txtOrderDate").val(),//new Date($('#txtOrderDate').val()),
                Loop_Len: OpItmList[r].Loop_Len,
                Gauge: OpItmList[r].Gauge,
                TaxAppVal: OpItmList[r].TaxAppVal,
                FinGsm: OpItmList[r].FinGsm,
                FinDiaid: OpItmList[r].FinDiaid,


            }
            iolist.push(det);
        }
    }


    if (IpItmList.length > 0) {
        for (var r = 0; r < IpItmList.length; r++) {
            var det = {
                // productionorddetid:
                //  productionordid:
                itemid: IpItmList[r].itmid,
                colorid: IpItmList[r].clrid,
                sizeid: IpItmList[r].sizeid,
                inp_op: IpItmList[r].inrout,
                order_output_qty: IpItmList[r].ordqty,
                issued_qty: IpItmList[r].issqty,
                rate: IpItmList[r].rate,
                received_qty: 0.00,
                Return_Qty: 0.00,
                Damage_qty: 0.00,
                Cancel_Qty: 0.00,
                //Returnable_Qty:0.00,
                //Inp_CancelQty:
                //Markup_Rate:
                //Markup_Value:
                PlannedSizeID: IpItmList[r].plansizeid,
                OrdSecQty: IpItmList[r].secqty,
                ItemRemarks: "",
                Loss_Qty: 0.00,
                //IN_OUT_UOMID:
                //IssueSizeID:
                ReqDate: $("#txtOrderDate").val(),//new Date($('#txtOrderDate').val()),
                opitemid: IpItmList[r].opitmid,
                opcolorid: IpItmList[r].opclrid,
                opsizeid: IpItmList[r].opsizeid
                //Loop_Len:
                //Gauge:

            }
            iolist.push(det);
        }
    }

    if (OpSaveJobDetList.length > 0) {
        for (var s = 0; s < OpSaveJobDetList.length; s++) {
            var objdet = {
                ProgQty: OpSaveJobDetList[s].prgopqty,
                OrderQty: OpSaveJobDetList[s].ordqty,
                issued_qty: 0.00,
                received_qty: 0.00,
                Return_Qty: 0.00,
                Damage_qty: 0.00,
                Cancel_Qty: 0.00,
                rate: OpSaveJobDetList[s].rate,
                Job_ord_no: OpSaveJobDetList[s].jobordno,
                ProdPrgNo: OpSaveJobDetList[s].prodpgmno,
                PlannedSizeID: OpSaveJobDetList[s].plansizeid,
                //Returnable_Qty:
                Closed: 'N',
                //Inp_CancelQty:
                OrdSecQty: OpSaveJobDetList[s].secqty,
                Loss_Qty: 0.00,
                buy_ord_ship: 0,
                itemid: OpSaveJobDetList[s].itmid,
                colorid: OpSaveJobDetList[s].clrid,
                sizeid: OpSaveJobDetList[s].sizeid,
                ipop: OpSaveJobDetList[s].inrout,


            }
            jobdetlist.push(objdet);
        }
    }

    if (IpSaveJobDetList.length > 0) {
        for (var s = 0; s < IpSaveJobDetList.length; s++) {
            var objdet = {
                ProgQty: IpSaveJobDetList[s].prgopqty,
                OrderQty: IpSaveJobDetList[s].ordqty,
                issued_qty: IpSaveJobDetList[s].ordqty,
                received_qty: 0.00,
                Return_Qty: 0.00,
                Damage_qty: 0.00,
                Cancel_Qty: 0.00,
                Job_ord_no: IpSaveJobDetList[s].jobordno,
                ProdPrgNo: IpSaveJobDetList[s].prodpgmno,
                PlannedSizeID: IpSaveJobDetList[s].plansizeid,
                //Returnable_Qty:
                Closed: 'N',
                //Inp_CancelQty:
                OrdSecQty: IpSaveJobDetList[s].secqty,
                Loss_Qty: 0.00,
                buy_ord_ship: 0,
                itemid: IpSaveJobDetList[s].itmid,
                colorid: IpSaveJobDetList[s].clrid,
                sizeid: IpSaveJobDetList[s].sizeid,
                ipop: IpSaveJobDetList[s].inrout,
                opitemid: IpSaveJobDetList[s].opitmid,
                opcolorid: IpSaveJobDetList[s].opclrid,
                opsizeid: IpSaveJobDetList[s].opsizeid,
            }
            jobdetlist.push(objdet);
        }
    }

    if (IpSaveStkDetList.length > 0) {
        for (var j = 0; j < IpSaveStkDetList.length; j++) {
            var objstk = {
                //ProductionOrdStockId:
                //    ProductionOrdJobid:
                Productionorder: $("#txtOrderNo").val(),
                Job_ord_no: IpSaveStkDetList[j].jobordno,
                ItemStockId: IpSaveStkDetList[j].stockid,
                IssueQty: IpSaveStkDetList[j].issues,
                ReturnQty: 0.00,
                LossQty: 0.00,
                Returnable_Qty: 0.00,
                Markup_Rate: 0.00,
                LotNo: '',
                Itemid: IpSaveStkDetList[j].itmid,
                Colorid: IpSaveStkDetList[j].clrid,
                Sizeid: IpSaveStkDetList[j].sizeid,
                opitemid: IpSaveStkDetList[j].opitmid,
                opcolorid: IpSaveStkDetList[j].opclrid,
                opsizeid: IpSaveStkDetList[j].opsizeid,
                opsizeid: IpSaveStkDetList[j].opsizeid,
                ProdPrgNo: IpSaveStkDetList[j].prodpgmno
            }
            stkdetlist.push(objstk);
        }
    }

    var issuemaslist = [];
    var issueiolist = [];
    var issuejobdet = [];
    if (OpItmList.length > 0) {
        for (var r = 0; r < OpItmList.length; r++) {
            var det = {
                // ProcessIssueDetId:
                //  ProcessIssueId:
                itemid: OpItmList[r].itmid,
                colorid: OpItmList[r].clrid,
                sizeid: OpItmList[r].sizeid,
                IssueQty: OpItmList[r].ordqty,
                SecQty: OpItmList[r].secqty,// OpItmList[r].prgopqty,
                OutputUom: 0.00,
                OutputValue: 0.00,// OpItmList[r].rate,
                IPMarkup_Rate: 0.00,//OpItmList[r].ordqty,
                ip_op: OpItmList[r].inrout,
                PlannedSizeID: OpItmList[r].plansizeid,

            }
            issueiolist.push(det);
        }
    }

    if (IpItmList.length > 0) {
        for (var r = 0; r < IpItmList.length; r++) {
            var det = {
                // ProcessIssueDetId:
                //  ProcessIssueId:
                itemid: IpItmList[r].itmid,
                colorid: IpItmList[r].clrid,
                sizeid: IpItmList[r].sizeid,
                IssueQty: IpItmList[r].ordqty,
                SecQty: IpItmList[r].secqty,// OpItmList[r].prgopqty,
                OutputUom: 0.00,
                OutputValue: 0.00,// OpItmList[r].rate,
                IPMarkup_Rate: 0.00,//OpItmList[r].ordqty,
                ip_op: IpItmList[r].inrout,
                PlannedSizeID: IpItmList[r].plansizeid,
                opitemid: IpItmList[r].opitmid,
                opcolorid: IpItmList[r].opclrid,
                opsizeid: IpItmList[r].opsizeid
            }
            issueiolist.push(det);
        }
    }

    if (OpSaveJobDetList.length > 0) {
        for (var s = 0; s < OpSaveJobDetList.length; s++) {
            var objdet = {
                //ProcessIssueJobId
                //ProcessIssueId
                //ProcessIssueDetId
                Job_ord_no: OpSaveJobDetList[s].jobordno,
                ProdPrgNo: OpSaveJobDetList[s].prodpgmno,
                LastProcessid: 0,//IpSaveJobDetList[s].ordqty,
                IssueQty: OpSaveJobDetList[s].ordqty,
                PlannedSizeID: OpSaveJobDetList[s].plansizeid,
                ReturnQty: 0.00,
                LossQty: 0.00,
                SecQty: OpSaveJobDetList[s].secqty,
                itemid: OpSaveJobDetList[s].itmid,
                colorid: OpSaveJobDetList[s].clrid,
                sizeid: OpSaveJobDetList[s].sizeid,
                ip_op: OpSaveJobDetList[s].inrout,
                rate: OpSaveJobDetList[s].rate,

            }
            issuejobdet.push(objdet);
        }
    }


    if (IpSaveJobDetList.length > 0) {
        for (var s = 0; s < IpSaveJobDetList.length; s++) {
            var objdet = {
                //ProcessIssueJobId
                //ProcessIssueId
                //ProcessIssueDetId
                Job_ord_no: IpSaveJobDetList[s].jobordno,
                ProdPrgNo: IpSaveJobDetList[s].prodpgmno,
                LastProcessid: 0,//IpSaveJobDetList[s].ordqty,
                IssueQty: IpSaveJobDetList[s].ordqty,
                ReturnQty: 0.00,
                LossQty: 0.00,
                SecQty: IpSaveJobDetList[s].secqty,
                itemid: IpSaveJobDetList[s].itmid,
                colorid: IpSaveJobDetList[s].clrid,
                sizeid: IpSaveJobDetList[s].sizeid,
                ip_op: IpSaveJobDetList[s].inrout,
                PlannedSizeID: IpSaveJobDetList[s].plansizeid,
                processorddetid: IpSaveJobDetList[s].procorddetid,
                processordjobdetid: IpSaveJobDetList[s].procordjobid,
                ProcessIssueDetId: IpSaveJobDetList[s].procissdetid,
                ProcessIssueJobId: IpSaveJobDetList[s].procissjobid,
                opitemid: IpSaveJobDetList[s].opitmid,
                opcolorid: IpSaveJobDetList[s].opclrid,
                opsizeid: IpSaveJobDetList[s].opsizeid,
            }
            issuejobdet.push(objdet);
        }
    }

    //if ($('#ddlLocation').val() == "0") {
    //    $('#ddlLocation').css('border-color', 'Red');
    //}


    //if ($('#ddlIssueLocation').val() == "0") {
    //    $('#ddlIssueLocation').css('border-color', 'Red');
    //}
    var obj = {
        //ProcessIssueId:
        ProcessIssueNo: $("#txtIssueNo").val(),
        ProcessIssueDate: $("#txtOrderDate").val(),//new Date($('#txtOrderDate').val()),
        //ProcessOrdId: Processordid,
        Remarks: $("#txtremarks").val(),
        GatePassVehicle: "",
        //IssueStoreid:
        CreatedBy: Guserid,
        EWayNo: "",
        EWayDate: $("#txtOrderDate").val(),//new Date($('#txtOrderDate').val()),
        //ProcissDet: iolist,
        //ProcissJobDet: jobdetlist,
        //Procissstk: stkdetlist
    }
    issuemaslist.push(obj);
    var Obj = {
        // productionordid:
        processorder: $("#txtOrderNo").val(),
        processordate: $("#txtOrderDate").val(),//new Date($('#txtOrderDate').val()),
        processorid: Processorid,
        processid: Processid,
        remarks: $("#txtremarks").val(),
        companyunitid: Companyunitid,
        companyid: CompanyId,
        ProcessorType: type,
        OrderType: ordtype,
        Closed: 'N',
        // OrderCumIssue:
        DelidateTime: $("#txtDeliDate").val(),//new Date($('#txtDeliDate').val()),
        ComboIds: "",
        DispLocType: desptchtype,
        DispLoc: $("#ddlLocation").val(),
        IssueLocType: isstype,
        IssueLoc: $("#ddlIssueLocation").val(),
        //Teamid:
        //StoreUnitId: 1,
        CreatedBy: Guserid,
        Vehicleno: $("#txtVehicleno").val(),
        //Phoneno:
        //contactperson:
        //amount:
        //taxamount:
        //saccode:
        //CGST:
        //SGST:
        //IGST:
        //TotCGST:
        //TotSGST:
        //TotIGST:
        moduletype: 'P',
        ProdDet: iolist,
        ProdJobDet: jobdetlist,
        ////ProdStkDet: stkdetlist,
        //ProdAddLess: AccList
        ProcissMas: issuemaslist,
        ProcissDet: issueiolist,
        ProcissJobDet: issuejobdet,
        Procissstk: stkdetlist,
        ProdAddLess: AccList,
        YarnLoc: $("#txtyarnloc").val(),
        KnitLoc: $("#txtknitloc").val(),

    }
    $("#btnAdd").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/ProcessOrder/IssueAdd",
        data: JSON.stringify(Obj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Value == 1) {
                AddUserEntryLog('Process', 'Process Order', 'ADD', $("#txtOrderNo").val());
                //alert('Data Saved Successfully');
                //window.location.href = "/ProcessOrder/ProcessOrderIndex";
                var msg = 'Data Saved Successfully...';
                var flg = 1;
                var mod = 0;
                var url = "/ProcessOrder/ProcessOrderIndex";
                AlartMessage(msg, flg, mod, url);
            }
            if (result.Value == 0) {

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
    });
}

function IssueMasUpd() {
    debugger;

    if (UserGroup != 'AUDIT') {

        var type = $('input[name="proctype"]:checked').attr('value');
        var ordtype = $('input[name="maintype"]:checked').attr('value');
        var distype = $('input[name="disploc"]:checked').attr('value');
        var desptchtype = $('input[name="DType"]:checked').attr('value');
        var isstype = $('input[name="IssType"]:checked').attr('value');
        var iolist = [];
        var jobdetlist = [];
        var stkdetlist = [];

        var opchk = [];
        var ipchk = [];
        for (var y = 0; y < OpItmList.length; y++) {
            if (OpItmList[y].ordqty > 0) {
                opchk.push(OpItmList[y]);
            }
        }


        for (var u = 0; u < IpItmList.length; u++) {
            if (IpItmList[u].ordqty > 0) {
                ipchk.push(IpItmList[u]);
            }
        }
        if (opchk.length == 0 || ipchk.length == 0) {
            //alert('Please fill atleast any one qty...');
            var msg = 'Please fill atleast any one quantity...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return true;
        }

        var cnt = 0;
        $.each(OpItmList, function (i) {
            $.each(OpSaveJobDetList, function (j) {
                if (OpSaveJobDetList[j].itmid == OpItmList[i].itmid && OpSaveJobDetList[j].clrid == OpItmList[i].clrid
                    && OpSaveJobDetList[j].sizeid == OpItmList[i].sizeid
                    && OpSaveJobDetList[j].plansizeid == OpItmList[i].plansizeid && OpItmList[i].ordqty > 0) {
                    if (OpSaveJobDetList[j].rate != OpItmList[i].rate) {
                        cnt = cnt + 1;
                    }
                }
            });
        });

        if (cnt > 0) {
            //alert('Please Check Item wise rate..');
            var msg = 'Please Check Item wise rate...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return true;
        }


        var optot = 0;
        var iptot = 0;
        var miscnt = 0;
        $.each(OpItmList, function (i) {
            optot = 0;
            iptot = 0;
            $.each(OpSaveJobDetList, function (j) {
                if (OpSaveJobDetList[j].itmid == OpItmList[i].itmid && OpSaveJobDetList[j].clrid == OpItmList[i].clrid
                    && OpSaveJobDetList[j].sizeid == OpItmList[i].sizeid
                    && OpSaveJobDetList[j].plansizeid == OpItmList[i].plansizeid && OpItmList[i].ordqty > 0) {
                    optot = optot + parseFloat(OpSaveJobDetList[j].ordqty);
                }
            });
            $.each(IpSaveJobDetList, function (j) {
                if (IpSaveJobDetList[j].opitmid == OpItmList[i].itmid && IpSaveJobDetList[j].opclrid == OpItmList[i].clrid
                    && IpSaveJobDetList[j].opsizeid == OpItmList[i].plansizeid
                    && IpSaveJobDetList[j].issqty > 0) {
                    iptot = iptot + parseFloat(IpSaveJobDetList[j].issqty);
                }
            });
            if ((optot.toFixed(3) == 0) && (iptot.toFixed(3) > 0)) {
                miscnt = miscnt + 1;
            }
            if ((optot.toFixed(3) > 0) && (iptot.toFixed(3) == 0)) {
                miscnt = miscnt + 1;
            }
        });

        if (miscnt > 0) {
            //alert('Please Check Input and Output Zero Qty..');
            var msg = 'Please Check Input and Output Zero quantity...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return true;
        }



        if (ValidateProcessInandOutQty == true) {
            var optot = 0;
            var iptot = 0;
            var miscnt = 0;
            $.each(OpItmList, function (i) {
                optot = 0;
                iptot = 0;
                $.each(OpSaveJobDetList, function (j) {
                    if (OpSaveJobDetList[j].itmid == OpItmList[i].itmid && OpSaveJobDetList[j].clrid == OpItmList[i].clrid
                        && OpSaveJobDetList[j].sizeid == OpItmList[i].sizeid
                        && OpSaveJobDetList[j].plansizeid == OpItmList[i].plansizeid && OpItmList[i].ordqty > 0) {
                        optot = optot + parseFloat(OpSaveJobDetList[j].ordqty);
                    }
                });
                $.each(IpSaveJobDetList, function (j) {
                    if (IpSaveJobDetList[j].opitmid == OpItmList[i].itmid && IpSaveJobDetList[j].opclrid == OpItmList[i].clrid
                        && IpSaveJobDetList[j].opsizeid == OpItmList[i].plansizeid
                        && IpSaveJobDetList[j].issqty > 0 && OpItmList[i].ordqty > 0) {
                        iptot = iptot + parseFloat(IpSaveJobDetList[j].issqty);
                    }
                });
                if (optot.toFixed(3) != iptot.toFixed(3)) {
                    miscnt = miscnt + 1;
                }
            });

            if (miscnt > 0) {
                //alert('Please Check Input and Output Qty Proportion..');
                var msg = 'Please Check Input and Output quantity Proportion...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                return true;
            }
        }

        if (OpItmList.length > 0) {
            for (var r = 0; r < OpItmList.length; r++) {
                var det = {
                    processorddetid: OpItmList[r].sno,
                    processordid: Masid,
                    itemid: OpItmList[r].itmid,
                    colorid: OpItmList[r].clrid,
                    sizeid: OpItmList[r].sizeid,
                    inp_op: OpItmList[r].inrout,
                    order_output_qty: OpItmList[r].ordqty,
                    issued_qty: 0.00,
                    rate: OpItmList[r].rate,
                    received_qty: 0.00,//OpItmList[r].ordqty,
                    Return_Qty: 0.00,
                    Damage_qty: 0.00,
                    Cancel_Qty: 0.00,
                    //Returnable_Qty:0.00,
                    //Inp_CancelQty:
                    //Markup_Rate:
                    //Markup_Value:
                    PlannedSizeID: OpItmList[r].plansizeid,
                    OrdSecQty: OpItmList[r].secqty,
                    ItemRemarks: $("#txtremarks").val(),
                    Loss_Qty: 0.00,
                    //IN_OUT_UOMID:
                    //IssueSizeID:
                    ReqDate: $("#txtOrderDate").val(),//new Date($('#txtOrderDate').val()),
                    Loop_Len: OpItmList[r].Loop_Len,
                    Gauge: OpItmList[r].Gauge,
                    TaxAppVal: OpItmList[r].TaxAppVal,
                    FinGsm: OpItmList[r].FinGsm,
                    FinDiaid: OpItmList[r].FinDiaid,


                }
                iolist.push(det);
            }
        }


        if (IpItmList.length > 0) {
            for (var r = 0; r < IpItmList.length; r++) {
                var det = {
                    processorddetid: IpItmList[r].sno,
                    processordid: Masid,
                    itemid: IpItmList[r].itmid,
                    colorid: IpItmList[r].clrid,
                    sizeid: IpItmList[r].sizeid,
                    inp_op: IpItmList[r].inrout,
                    order_output_qty: IpItmList[r].ordqty,
                    issued_qty: IpItmList[r].issqty,
                    rate: IpItmList[r].rate,
                    received_qty: 0.00,
                    Return_Qty: 0.00,
                    Damage_qty: 0.00,
                    Cancel_Qty: 0.00,
                    //Returnable_Qty:0.00,
                    //Inp_CancelQty:
                    //Markup_Rate:
                    //Markup_Value:
                    PlannedSizeID: IpItmList[r].plansizeid,
                    OrdSecQty: IpItmList[r].secqty,
                    ItemRemarks: "",
                    Loss_Qty: 0.00,
                    //IN_OUT_UOMID:
                    //IssueSizeID:
                    ReqDate: $("#txtOrderDate").val(),//new Date($('#txtOrderDate').val()),
                    opitemid: IpItmList[r].opitmid,
                    opcolorid: IpItmList[r].opclrid,
                    opsizeid: IpItmList[r].opsizeid
                    //Loop_Len:
                    //Gauge:

                }
                iolist.push(det);
            }
        }

        if (OpSaveJobDetList.length > 0) {
            for (var s = 0; s < OpSaveJobDetList.length; s++) {
                var objdet = {
                    ProcessnOrdid: Masid,
                    ProgQty: OpSaveJobDetList[s].prgopqty,
                    OrderQty: OpSaveJobDetList[s].ordqty,
                    issued_qty: 0.00,
                    received_qty: 0.00,
                    Return_Qty: 0.00,
                    Damage_qty: 0.00,
                    Cancel_Qty: 0.00,
                    Job_ord_no: OpSaveJobDetList[s].jobordno,
                    ProdPrgNo: OpSaveJobDetList[s].prodpgmno,
                    //Returnable_Qty:
                    Closed: 'N',
                    //Inp_CancelQty:
                    OrdSecQty: OpSaveJobDetList[s].secqty,
                    Loss_Qty: 0.00,
                    buy_ord_ship: 0,
                    itemid: OpSaveJobDetList[s].itmid,
                    colorid: OpSaveJobDetList[s].clrid,
                    sizeid: OpSaveJobDetList[s].sizeid,
                    ipop: OpSaveJobDetList[s].inrout,
                    PlannedSizeID: OpSaveJobDetList[s].plansizeid,
                    rate: OpSaveJobDetList[s].rate,
                }
                jobdetlist.push(objdet);
            }
        }

        if (IpSaveJobDetList.length > 0) {
            for (var s = 0; s < IpSaveJobDetList.length; s++) {
                var objdet = {
                    ProcessnOrdid: Masid,
                    ProgQty: IpSaveJobDetList[s].prgopqty,
                    OrderQty: IpSaveJobDetList[s].ordqty,
                    issued_qty: IpSaveJobDetList[s].ordqty,
                    received_qty: 0.00,
                    Return_Qty: 0.00,
                    Damage_qty: 0.00,
                    Cancel_Qty: 0.00,
                    Job_ord_no: IpSaveJobDetList[s].jobordno,
                    ProdPrgNo: IpSaveJobDetList[s].prodpgmno,
                    //Returnable_Qty:
                    Closed: 'N',
                    //Inp_CancelQty:
                    OrdSecQty: IpSaveJobDetList[s].secqty,
                    Loss_Qty: 0.00,
                    buy_ord_ship: 0,
                    itemid: IpSaveJobDetList[s].itmid,
                    colorid: IpSaveJobDetList[s].clrid,
                    sizeid: IpSaveJobDetList[s].sizeid,
                    ipop: IpSaveJobDetList[s].inrout,
                    PlannedSizeID: IpSaveJobDetList[s].plansizeid,
                    opitemid: IpSaveJobDetList[s].opitmid,
                    opcolorid: IpSaveJobDetList[s].opclrid,
                    opsizeid: IpSaveJobDetList[s].opsizeid,
                }
                jobdetlist.push(objdet);
            }
        }

        if (IpSaveStkDetList.length > 0) {
            for (var j = 0; j < IpSaveStkDetList.length; j++) {
                var objstk = {
                    ProcessIssueId: $("#txtIssueId").val(),
                    ProcessIssueNo: $("#txtIssueNo").val(),
                    Job_ord_no: IpSaveStkDetList[j].jobordno,
                    ItemStockId: IpSaveStkDetList[j].stockid,
                    IssueQty: IpSaveStkDetList[j].issues,
                    ReturnQty: 0.00,
                    LossQty: 0.00,
                    Returnable_Qty: 0.00,
                    Markup_Rate: 0.00,
                    LotNo: '',
                    Itemid: IpSaveStkDetList[j].itmid,
                    Colorid: IpSaveStkDetList[j].clrid,
                    Sizeid: IpSaveStkDetList[j].sizeid,
                    opitemid: IpSaveStkDetList[j].opitmid,
                    opcolorid: IpSaveStkDetList[j].opclrid,
                    opsizeid: IpSaveStkDetList[j].opsizeid,
                    prodstkid: IpSaveStkDetList[j].prodstkid,
                    procissjobid: IpSaveStkDetList[j].procissjobid,
                    ProcessIssStockId: IpSaveStkDetList[j].ProcessIssStockId,
                    ProdPrgNo: IpSaveStkDetList[j].prodpgmno
                }
                stkdetlist.push(objstk);
            }
        }

        var issuemaslist = [];
        var issueiolist = [];
        var issuejobdet = [];
        if (OpItmList.length > 0) {
            for (var r = 0; r < OpItmList.length; r++) {
                var det = {
                    // ProcessIssueDetId:
                    ProcessIssueId: $("#txtIssueId").val(),
                    itemid: OpItmList[r].itmid,
                    colorid: OpItmList[r].clrid,
                    sizeid: OpItmList[r].sizeid,
                    IssueQty: OpItmList[r].ordqty,
                    SecQty: OpItmList[r].secqty,// OpItmList[r].prgopqty,
                    OutputUom: 0.00,
                    OutputValue: 0.00,// OpItmList[r].rate,
                    IPMarkup_Rate: 0.00,//OpItmList[r].ordqty,
                    ip_op: OpItmList[r].inrout,
                    PlannedSizeID: OpItmList[r].plansizeid,
                }
                issueiolist.push(det);
            }
        }

        if (IpItmList.length > 0) {
            for (var r = 0; r < IpItmList.length; r++) {
                var det = {
                    // ProcessIssueDetId:
                    ProcessIssueId: $("#txtIssueId").val(),
                    itemid: IpItmList[r].itmid,
                    colorid: IpItmList[r].clrid,
                    sizeid: IpItmList[r].sizeid,
                    IssueQty: IpItmList[r].ordqty,
                    SecQty: IpItmList[r].secqty,// OpItmList[r].prgopqty,
                    OutputUom: 0.00,
                    OutputValue: 0.00,// OpItmList[r].rate,
                    IPMarkup_Rate: 0.00,//OpItmList[r].ordqty,
                    ip_op: IpItmList[r].inrout,
                    PlannedSizeID: IpItmList[r].plansizeid,
                    opitemid: IpItmList[r].opitmid,
                    opcolorid: IpItmList[r].opclrid,
                    opsizeid: IpItmList[r].opsizeid

                }
                issueiolist.push(det);
            }
        }

        if (OpSaveJobDetList.length > 0) {
            for (var s = 0; s < OpSaveJobDetList.length; s++) {
                var objdet = {
                    //ProcessIssueJobId
                    ProcessIssueId: $("#txtIssueId").val(),
                    //ProcessIssueDetId
                    Job_ord_no: OpSaveJobDetList[s].jobordno,
                    ProdPrgNo: OpSaveJobDetList[s].prodpgmno,
                    LastProcessid: 0,//IpSaveJobDetList[s].ordqty,
                    IssueQty: OpSaveJobDetList[s].ordqty,
                    ReturnQty: 0.00,
                    LossQty: 0.00,
                    SecQty: OpSaveJobDetList[s].secqty,
                    itemid: OpSaveJobDetList[s].itmid,
                    colorid: OpSaveJobDetList[s].clrid,
                    sizeid: OpSaveJobDetList[s].sizeid,
                    ip_op: OpSaveJobDetList[s].inrout,
                    processordjobdetid: OpSaveJobDetList[s].procordjobid,
                    PlannedSizeID: OpSaveJobDetList[s].plansizeid,
                    rate: OpSaveJobDetList[s].rate,
                }
                issuejobdet.push(objdet);
            }
        }


        if (IpSaveJobDetList.length > 0) {
            for (var s = 0; s < IpSaveJobDetList.length; s++) {
                var objdet = {
                    //ProcessIssueJobId
                    ProcessIssueId: $("#txtIssueId").val(),
                    //ProcessIssueDetId
                    Job_ord_no: IpSaveJobDetList[s].jobordno,
                    ProdPrgNo: IpSaveJobDetList[s].prodpgmno,
                    LastProcessid: 0,//IpSaveJobDetList[s].ordqty,
                    IssueQty: IpSaveJobDetList[s].ordqty,
                    ReturnQty: 0.00,
                    LossQty: 0.00,
                    SecQty: IpSaveJobDetList[s].secqty,
                    itemid: IpSaveJobDetList[s].itmid,
                    colorid: IpSaveJobDetList[s].clrid,
                    sizeid: IpSaveJobDetList[s].sizeid,
                    ip_op: IpSaveJobDetList[s].inrout,
                    processordjobdetid: IpSaveJobDetList[s].procordjobid,
                    ProcessIssueDetId: IpSaveJobDetList[s].procissdetid,
                    ProcessIssueJobId: IpSaveJobDetList[s].procissjobid,
                    PlannedSizeID: IpSaveJobDetList[s].plansizeid,
                    opitemid: IpSaveJobDetList[s].opitmid,
                    opcolorid: IpSaveJobDetList[s].opclrid,
                    opsizeid: IpSaveJobDetList[s].opsizeid,
                }
                issuejobdet.push(objdet);
            }
        }

        //if ($('#ddlLocation').val() == "0") {
        //    $('#ddlLocation').css('border-color', 'Red');
        //}


        //if ($('#ddlIssueLocation').val() == "0") {
        //    $('#ddlIssueLocation').css('border-color', 'Red');
        //}

        var obj = {
            ProcessIssueId: $("#txtIssueId").val(),
            ProcessIssueNo: $("#txtIssueNo").val(),
            ProcessIssueDate: $("#txtOrderDate").val(),//new Date($('#txtOrderDate').val()),
            ProcessOrdId: Masid,
            Remarks: $("#txtremarks").val(),
            GatePassVehicle: "",
            //IssueStoreid:
            CreatedBy: Guserid,
            EWayNo: "",
            EWayDate: $("#txtOrderDate").val(),//new Date($('#txtOrderDate').val()),
            //ProcissDet: iolist,
            //ProcissJobDet: jobdetlist,
            //Procissstk: stkdetlist
        }
        issuemaslist.push(obj);

        var Obj = {
            processordid: Masid,
            processorder: $("#txtOrderNo").val(),
            processordate: $("#txtOrderDate").val(),//new Date($('#txtOrderDate').val()),
            processorid: Processorid,
            processid: Processid,
            remarks: $("#txtremarks").val(),
            companyunitid: Companyunitid,
            companyid: CompanyId,
            ProcessorType: type,
            OrderType: ordtype,
            Closed: 'N',
            // OrderCumIssue:
            DelidateTime: $("#txtDeliDate").val(),//new Date($('#txtDeliDate').val()),
            ComboIds: "",
            DispLocType: desptchtype,
            DispLoc: $("#ddlLocation").val(),
            IssueLocType: isstype,
            IssueLoc: $("#ddlIssueLocation").val(),
            //Teamid:
            //StoreUnitId: 1,
            CreatedBy: Guserid,
            Vehicleno: $("#txtVehicleno").val(),
            moduletype: 'P',
            ProdDet: iolist,
            ProdJobDet: jobdetlist,
            ////ProdStkDet: stkdetlist,
            //ProdAddLess: AccList
            ProcissMas: issuemaslist,
            ProcissDet: issueiolist,
            ProcissJobDet: issuejobdet,
            Procissstk: stkdetlist,
            ProdAddLess: AccList,
            YarnLoc: $("#txtyarnloc").val(),
            KnitLoc: $("#txtknitloc").val(),

        }
        $("#btnUpdate").attr("disabled", true);
        LoadingSymb();
        $.ajax({
            url: "/ProcessOrder/IssueUpdate",
            data: JSON.stringify(Obj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                debugger;
                if (result.Value == 1) {
                    AddUserEntryLog('Process', 'Process Order', 'UPDATE', $("#txtOrderNo").val());
                    //alert('Data Updated Successfully');
                    //window.location.href = "/ProcessOrder/ProcessOrderIndex";
                    var msg = 'Data Updated Successfully...';
                    var flg = 1;
                    var mod = 0;
                    var url = "/ProcessOrder/ProcessOrderIndex";
                    AlartMessage(msg, flg, mod, url);
                }
                if (result.Value == 0) {

                    window.location.href = "/Error/Index";

                }

            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }

        });
    }
}

//function IssueMas() {
//    debugger;
//    var iolist = [];
//    var jobdetlist = [];
//    var stkdetlist = [];
//    if (OpItmList.length > 0) {
//        for (var r = 0; r < OpItmList.length; r++) {
//            var det = {
//                // ProcessIssueDetId:
//                //  ProcessIssueId:
//                itemid: OpItmList[r].itmid,
//                colorid: OpItmList[r].clrid,
//                sizeid: OpItmList[r].sizeid,
//                IssueQty: OpItmList[r].ordqty,
//                SecQty: 0,// OpItmList[r].prgopqty,
//                OutputUom: 0.00,
//                OutputValue:0.00,// OpItmList[r].rate,
//                IPMarkup_Rate: 0.00,//OpItmList[r].ordqty,
//                ip_op: OpItmList[r].inrout,             

//            }
//            iolist.push(det);
//        }
//    }

//    if (IpItmList.length > 0) {
//        for (var r = 0; r < IpItmList.length; r++) {
//            var det = {
//                // ProcessIssueDetId:
//                //  ProcessIssueId:
//                itemid: IpItmList[r].itmid,
//                colorid: IpItmList[r].clrid,
//                sizeid: IpItmList[r].sizeid,
//                IssueQty: IpItmList[r].ordqty,
//                SecQty: 0,// OpItmList[r].prgopqty,
//                OutputUom: 0.00,
//                OutputValue: 0.00,// OpItmList[r].rate,
//                IPMarkup_Rate: 0.00,//OpItmList[r].ordqty,
//                ip_op: IpItmList[r].inrout,

//            }
//            iolist.push(det);
//        }
//    }


//    if (OpSaveJobDetList.length > 0) {
//        for (var s = 0; s < OpSaveJobDetList.length; s++) {
//            var objdet = {
//                //ProcessIssueJobId
//                //ProcessIssueId
//                //ProcessIssueDetId
//                Job_ord_no: OpSaveJobDetList[s].jobordno,
//                ProdPrgNo: OpSaveJobDetList[s].prodpgmno,
//                LastProcessid: 0,//IpSaveJobDetList[s].ordqty,
//                IssueQty: OpSaveJobDetList[s].ordqty,
//                ReturnQty: 0.00,
//                LossQty: 0.00,
//                SecQty: 0.00,
//                itemid: OpSaveJobDetList[s].itmid,
//                colorid: OpSaveJobDetList[s].clrid,
//                sizeid: OpSaveJobDetList[s].sizeid,
//                ip_op: OpSaveJobDetList[s].inrout
//            }
//            jobdetlist.push(objdet);
//        }
//    }


//    if (IpSaveJobDetList.length > 0) {
//        for (var s = 0; s < IpSaveJobDetList.length; s++) {
//            var objdet = {
//                //ProcessIssueJobId
//                //ProcessIssueId
//                //ProcessIssueDetId
//                Job_ord_no: IpSaveJobDetList[s].jobordno,
//                ProdPrgNo: IpSaveJobDetList[s].prodpgmno,
//                LastProcessid: 0,//IpSaveJobDetList[s].ordqty,
//                IssueQty: IpSaveJobDetList[s].ordqty,
//                ReturnQty: 0.00,
//                LossQty: 0.00,
//                SecQty: 0.00,          
//                itemid: IpSaveJobDetList[s].itmid,
//                colorid: IpSaveJobDetList[s].clrid,
//                sizeid: IpSaveJobDetList[s].sizeid,
//                ip_op: IpSaveJobDetList[s].inrout
//            }
//            jobdetlist.push(objdet);
//        }
//    }


//    if (IpSaveStkDetList.length > 0) {
//        for (var j = 0; j < IpSaveStkDetList.length; j++) {
//            var objstk = {
//                //ProcessIssStockId:
//                //    ProcessIssueId:
//                //ProcessIssueJobid
//                ProcessIssueNo: $("#txtOrderNo").val(),
//                Job_ord_no: IpSaveStkDetList[j].jobordno,
//                ItemStockId: IpSaveStkDetList[j].stockid,
//                IssueQty: IpSaveStkDetList[j].issues,
//                ReturnQty: 0.00,
//                LossQty: 0.00,
//                Returnable_Qty: 0.00,
//                Markup_Rate: 0.00,
//                LotNo: '',
//                Itemid: IpSaveStkDetList[j].itmid,
//                Colorid: IpSaveStkDetList[j].clrid,
//                Sizeid: IpSaveStkDetList[j].sizeid
//            }
//            stkdetlist.push(objstk);
//        }
//    }

//    var obj = {
//        //ProcessIssueId:
//        ProcessIssueNo: $("#txtissueno").val(),
//        ProcessIssueDate: new Date($('#txtissueDate').val()),
//        ProcessOrdId: Processordid,
//        Remarks: $("#txtremark").val(),
//        GatePassVehicle: "",
//        //IssueStoreid:
//        CreatedBy: 3,
//        EWayNo: "",
//        EWayDate: new Date($('#txtissueDate').val()),
//        ProcissDet: iolist,
//        ProcissJobDet: jobdetlist,
//        Procissstk: stkdetlist
//    }
//    $.ajax({
//        url: "/ProcessOrder/IssueAdd",
//        data: JSON.stringify(Obj),
//        type: "POST",
//        contentType: "application/json;charset=utf-8",
//        dataType: "json",
//        success: function (result) {
//            debugger;
//            //if (result.Value == 1) {

//            alert('Data Saved Successfully');
//            window.location.href = "/ProcessOrder/ProcessOrderIndex";

//            //}
//            //if (result.Value == 0) {

//            //    alert('Data not saved properly');
//            //    window.location.href = "/StockInwardMain/StockInwardMainIndex";

//            //}

//        },
//        error: function (errormessage) {
//            alert(errormessage.responseText);
//        }

//    });

//}

function Update() {
    debugger;
    var type = $('input[name="optwrkord"]:checked').attr('value');
    var ordtype = $('input[name="type"]:checked').attr('value');
    var distype = $('input[name="disploc"]:checked').attr('value');
    var desptchtype = $('input[name="DType"]:checked').attr('value');
    var isstype = $('input[name="IssType"]:checked').attr('value');
    var iolist = [];
    var jobdetlist = [];
    var stkdetlist = [];

    var opchk = [];
    var ipchk = [];
    for (var y = 0; y < OpItmList.length; y++) {
        if (OpItmList[y].ordqty > 0) {
            opchk.push(OpItmList[y]);
        }
    }


    for (var u = 0; u < IpItmList.length; u++) {
        if (IpItmList[u].ordqty > 0) {
            ipchk.push(IpItmList[u]);
        }
    }
    if (opchk.length == 0 || ipchk.length == 0) {
        //alert('Please fill atleast any one qty...');
        var msg = 'Please fill atleast any one quantity...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }
    if (OpItmList.length > 0) {
        for (var r = 0; r < OpItmList.length; r++) {
            var det = {
                processorddetid: OpItmList[r].sno,
                processordid: Masid,
                itemid: OpItmList[r].itmid,
                colorid: OpItmList[r].clrid,
                sizeid: OpItmList[r].sizeid,
                inp_op: OpItmList[r].inrout,
                order_output_qty: OpItmList[r].ordqty,
                issued_qty: 0.00,
                rate: OpItmList[r].rate,
                received_qty: 0.00,// OpItmList[r].ordqty,
                Return_Qty: 0.00,
                Damage_qty: 0.00,
                Cancel_Qty: 0.00,
                //Returnable_Qty:0.00,
                //Inp_CancelQty:
                //Markup_Rate:
                //Markup_Value:
                PlannedSizeID: OpItmList[r].plansizeid,
                OrdSecQty: OpItmList[r].secqty,
                ItemRemarks: $("#txtremarks").val(),
                Loss_Qty: 0.00,
                //IN_OUT_UOMID:
                //IssueSizeID:
                ReqDate: $("#txtOrderDate").val(),//new Date($('#txtOrderDate').val()),
                Loop_Len: OpItmList[r].Loop_Len,
                Gauge: OpItmList[r].Gauge,
                TaxAppVal: OpItmList[r].TaxAppVal,
                FinGsm: OpItmList[r].FinGsm,
                FinDiaid: OpItmList[r].FinDiaid,


            }
            iolist.push(det);
        }
    }


    if (IpItmList.length > 0) {
        for (var r = 0; r < IpItmList.length; r++) {
            var det = {
                processorddetid: IpItmList[r].sno,
                processordid: Masid,
                itemid: IpItmList[r].itmid,
                colorid: IpItmList[r].clrid,
                sizeid: IpItmList[r].sizeid,
                inp_op: IpItmList[r].inrout,
                order_output_qty: IpItmList[r].ordqty,
                issued_qty: 0.00,//IpItmList[r].issqty,
                rate: IpItmList[r].rate,
                received_qty: 0.00,
                Return_Qty: 0.00,
                Damage_qty: 0.00,
                Cancel_Qty: 0.00,
                //Returnable_Qty:0.00,
                //Inp_CancelQty:
                //Markup_Rate:
                //Markup_Value:
                PlannedSizeID: IpItmList[r].plansizeid,
                OrdSecQty: IpItmList[r].secqty,
                ItemRemarks: $("#txtremarks").val(),
                Loss_Qty: 0.00,
                //IN_OUT_UOMID:
                //IssueSizeID:
                ReqDate: $("#txtOrderDate").val(),//new Date($('#txtOrderDate').val()),
                //Loop_Len:
                //Gauge:

            }
            iolist.push(det);
        }
    }

    if (OpSaveJobDetList.length > 0) {
        for (var s = 0; s < OpSaveJobDetList.length; s++) {
            var objdet = {
                ProcessnOrdid: Masid,
                ProgQty: OpSaveJobDetList[s].prgopqty,
                OrderQty: OpSaveJobDetList[s].ordqty,
                issued_qty: 0.00,
                received_qty: 0.00,// OpSaveJobDetList[s].ordqty,
                Return_Qty: 0.00,
                Damage_qty: 0.00,
                Cancel_Qty: 0.00,
                Job_ord_no: OpSaveJobDetList[s].jobordno,
                ProdPrgNo: OpSaveJobDetList[s].prodpgmno,
                //Returnable_Qty:
                Closed: 'N',
                //Inp_CancelQty:
                OrdSecQty: OpSaveJobDetList[s].secqty,
                Loss_Qty: 0.00,
                buy_ord_ship: 0,
                itemid: OpSaveJobDetList[s].itmid,
                colorid: OpSaveJobDetList[s].clrid,
                sizeid: OpSaveJobDetList[s].sizeid,
                ipop: OpSaveJobDetList[s].inrout,
                PlannedSizeID: OpSaveJobDetList[s].plansizeid,
            }
            jobdetlist.push(objdet);
        }
    }

    if (IpSaveJobDetList.length > 0) {
        for (var s = 0; s < IpSaveJobDetList.length; s++) {
            var objdet = {
                ProcessnOrdid: Masid,
                ProgQty: IpSaveJobDetList[s].prgopqty,
                OrderQty: IpSaveJobDetList[s].ordqty,
                issued_qty: 0.00,
                received_qty: 0.00,
                Return_Qty: 0.00,
                Damage_qty: 0.00,
                Cancel_Qty: 0.00,
                Job_ord_no: IpSaveJobDetList[s].jobordno,
                ProdPrgNo: IpSaveJobDetList[s].prodpgmno,
                //Returnable_Qty:
                Closed: 'N',
                //Inp_CancelQty:
                OrdSecQty: IpSaveJobDetList[s].secqty,
                Loss_Qty: 0.00,
                buy_ord_ship: 0,
                itemid: IpSaveJobDetList[s].itmid,
                colorid: IpSaveJobDetList[s].clrid,
                sizeid: IpSaveJobDetList[s].sizeid,
                ipop: IpSaveJobDetList[s].inrout,
                PlannedSizeID: IpSaveJobDetList[s].plansizeid,
            }
            jobdetlist.push(objdet);
        }
    }

    //if (IpSaveStkDetList.length > 0) {
    //    for (var j = 0; j < IpSaveStkDetList.length; j++) {
    //        var objstk = {
    //            ProductionOrdStockId: IpSaveStkDetList[j].prodstkid,
    //            //    ProductionOrdJobid:
    //            Productionordid: Masid,
    //            Productionorder: $("#txtOrderNo").val(),
    //            jobordno: IpSaveStkDetList[j].jobordno,
    //            ItemStockId: IpSaveStkDetList[j].stockid,
    //            IssueQty: IpSaveStkDetList[j].issues,
    //            ReturnQty: 0.00,
    //            LossQty: 0.00,
    //            Returnable_Qty: 0.00,
    //            Markup_Rate: 0.00,
    //            LotNo: '',
    //            Itemid: IpSaveStkDetList[j].itmid,
    //            Colorid: IpSaveStkDetList[j].clrid,
    //            Sizeid: IpSaveStkDetList[j].sizeid
    //        }
    //        stkdetlist.push(objstk);
    //    }
    //}


    //if ($('#ddlLocation').val() == "0") {
    //    $('#ddlLocation').css('border-color', 'Red');
    //}


    //if ($('#ddlIssueLocation').val() == "0") {
    //    $('#ddlIssueLocation').css('border-color', 'Red');
    //}
    var Obj = {
        processordid: Masid,
        processorder: $("#txtOrderNo").val(),
        processordate: $("#txtOrderDate").val(),// new Date($('#txtOrderDate').val()),
        processorid: Processorid,
        processid: Processid,
        remarks: $("#txtremarks").val(),
        companyunitid: Companyunitid,
        companyid: CompanyId,
        ProcessorType: type,
        OrderType: ordtype,
        Closed: 'N',
        // OrderCumIssue:
        DelidateTime: $("#txtDeliDate").val(),// new Date($('#txtDeliDate').val()),
        ComboIds: "",

        DispLocType: desptchtype,
        DispLoc: $("#ddlLocation").val(),
        IssueLocType: isstype,
        IssueLoc: $("#ddlIssueLocation").val(),
        //Teamid:
        // StoreUnitId: 1,
        CreatedBy: Guserid,
        Vehicleno: $("#txtVehicleno").val(),
        //Phoneno:
        //contactperson:
        //amount:
        //taxamount:
        //saccode:
        //CGST:
        //SGST:
        //IGST:
        //TotCGST:
        //TotSGST:
        //TotIGST:
        moduletype: 'D',
        ProdDet: iolist,
        ProdJobDet: jobdetlist,
        // ProdStkDet: stkdetlist,
        ProdAddLess: AccList,
        YarnLoc: $("#txtyarnloc").val(),
        KnitLoc: $("#txtknitloc").val(),

    }
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/ProcessOrder/Update",
        data: JSON.stringify(Obj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Value == 1) {

                //alert('Data Updated Successfully');
                AddUserEntryLog('Process', 'Process Order', 'UPDATE', $("#txtOrderNo").val());
                //window.location.href = "/ProcessOrder/ProcessOrderIndex";
                var msg = 'Data Updated Successfully...';
                var flg = 4;
                var mod = 1;
                var url = "/ProcessOrder/ProcessOrderIndex";
                AlartMessage(msg, flg, mod, url);
            }
            if (result.Value == 0) {

                window.location.href = "/Error/Index";

            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }

    });
}
function LoadMain() {
    Fromback = 0;
    CMainlist();
}

function LoadCheckData() {
    //  $('#tblmaindetails').DataTable().destroy();
    // ddlmain();
    CMainlist();
}
function LoadMaingrid() {
    debugger;
    Fromback = 0;
    var type = $('input[name="maintype"]:checked').attr('value');
    var proctype = $('input[name="proctype"]:checked').attr('value');
    var apptype = $('input[name="Apptype"]:checked').attr('value');

    if (proctype == 'P') {
        var sup = $('#ddlMSupplier').val();
        if (sup == null) {
            proid = 0;
        } else {
            proid = $('#ddlMSupplier').val();
        }
    }


    if (proctype == 'P') {

        $('#Msupp').show();
        $("#Mwrkdiv").hide();
    }
    else if (proctype == 'W') {
        $('#Msupp').hide();
        $("#Mwrkdiv").show();
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

    if (StyId == null) {
        StyId = 0;
    } else {
        StyId = $('#ddlMStyle').val();
    }

    var prodid = 0;

    var checkedValue = $('.messageCheckbox:checked').val();

    if (checkedValue == undefined) {

        var clsd = "N";
    }
    else {
        var clsd = "Y";
    }

    var ty = $('#ddlMType').val();


    //var CompId = $('#ddlMCompany').val();
    //if (CompId == null) {
    //    CompId = 0;
    //}

    var CompId = $('#ddlMCompany').val();

    if (CompId == null) {
        CompId = DCompid;
    } else {
        CompId = $('#ddlMCompany').val();
    }


    var prodid = $('#ddlMOrderNo option:selected').val();
    if (prodid == null || prodid == 0) {
        prod = "";
    } else {
        prod = $('#ddlMOrderNo option:selected').text();
    }
    var Unit = $('#ddlMUnit').val();
    if (Unit == null) {
        Unit = 0;
    }
    var prid = proid;
    var process = $('#ddlMProcess').val();
    if (process == null) {
        process = 0;
    }
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();


    if (ChkComp) {
        OrdNo = "";
        RefNo = "";
        prod = "";
        proid = 0;
        StyId = 0;
        Unit = 0;
        process = 0;
        prodid = 0;
    }

    if (DtChk) {

        OrdNo = "";
        RefNo = "";
        prod = "";
        proid = 0;
        StyId = 0;
        Unit = 0;
        process = 0;
        prodid = 0;
    }

    var menufilter = CompId + ',' + clsd + ',' + type + ',' + proctype + ',' + prodid + ',' + prod + ',' + ty + ',' + prid + ',' + Unit + ',' + process + ',' + FDate + ',' + TDate + ',' + OrdNo + ',' + RefNo + ',' + StyId + ',' + apptype;
    localStorage.setItem('ProcessOrderMainFilter', menufilter);

    $.ajax({
        url: "/ProcessOrder/LoadMaingrid",
        data: JSON.stringify({ cmpid: CompId, closed: clsd, buyrsamp: type, processortype: proctype, prodordid: prodid, prodord: prod, type: ty, processorid: prid, unitid: Unit, processid: process, fromDate: FDate, todate: TDate, orderno: OrdNo, refno: RefNo, styleid: StyId, AppType: apptype }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");

            if (DtChk) {

                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Refno: dataSet[i][13]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.Refno]) {
                        revdet[el.Refno] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMRefNo').empty();
                $('#ddlMRefNo').append($('<option/>').val('0').text('--Select Ref No--'));
                $.each(rev, function () {
                    $('#ddlMRefNo').append($('<option></option>').val(this.Refno).text(this.Refno));
                });

                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Ordno: dataSet[i][12]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.Ordno]) {
                        revdet[el.Ordno] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMBuyOrderNo').empty();
                $('#ddlMBuyOrderNo').append($('<option/>').val('0').text('--Select Order No--'));
                $.each(rev, function () {
                    $('#ddlMBuyOrderNo').append($('<option></option>').val(this.Ordno).text(this.Ordno));
                });

                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Suppid: dataSet[i][17],
                        Supp: dataSet[i][6]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.Suppid]) {
                        revdet[el.Suppid] = true;
                        rev.push(el);
                    }
                });

                var proctype = $('input[name="proctype"]:checked').attr('value');

                if (proctype == 'P') {

                    $('#ddlMSupplier').empty();
                    $('#ddlMSupplier').append($('<option/>').val('0').text('--Select Supplier--'));
                    $.each(rev, function () {
                        $('#ddlMSupplier').append($('<option></option>').val(this.Suppid).text(this.Supp));
                    });
                }
                else if (proctype == 'W') {
                    $('#ddlMwrkdiv').empty();
                    $('#ddlMwrkdiv').append($('<option/>').val('0').text('--Select Supplier--'));
                    $.each(rev, function () {
                        $('#ddlMwrkdiv').append($('<option></option>').val(this.Suppid).text(this.Supp));
                    });
                }




                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        styleid: dataSet[i][14],
                        style: dataSet[i][15]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.styleid]) {
                        revdet[el.styleid] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMStyle').empty();
                $('#ddlMStyle').append($('<option/>').val('0').text('--Select Style--'));
                $.each(rev, function () {
                    $('#ddlMStyle').append($('<option></option>').val(this.styleid).text(this.style));
                });

                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Pono: dataSet[i][1],
                        poid: dataSet[i][0]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.poid]) {
                        revdet[el.poid] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMOrderNo').empty();
                $('#ddlMOrderNo').append($('<option/>').val('0').text('--Select ProdOrdNo--'));
                $.each(rev, function () {
                    $('#ddlMOrderNo').append($('<option></option>').val(this.poid).text(this.Pono));
                });

                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Unit: dataSet[i][4],
                        Unitid: dataSet[i][11]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.Unitid]) {
                        revdet[el.Unitid] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMUnit').empty();
                $('#ddlMUnit').append($('<option/>').val('0').text('--Select CompanyUnit--'));
                $.each(rev, function () {
                    $('#ddlMUnit').append($('<option></option>').val(this.Unitid).text(this.Unit));
                });


                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Process: dataSet[i][5],
                        Processid: dataSet[i][16]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.Processid]) {
                        revdet[el.Processid] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMProcess').empty();
                $('#ddlMProcess').append($('<option/>').val('0').text('--Select Process--'));
                $.each(rev, function () {
                    $('#ddlMProcess').append($('<option></option>').val(this.Processid).text(this.Process));
                });

                return true;
            }


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
                    bSort: false,
                    stateSave: true,
                    columns: [
                             { title: "Productionordid", "visible": false },
                             { title: "Order No" },
                             { title: "Order Date" },
                             { title: "Company" },
                             { title: "Unit" },
                             { title: "Process" },
                             { title: "Processor" },
                             { title: "Type", "visible": false },
                             { title: "Approved", "visible": false },
                             {
                                 title: "Closure", data: "Productionordid",
                                 render: function (data, type, row) {
                                     if (row[9] == "Y") {
                                         return '<input type="checkbox" id="groupclo" class="groupclo editor-active"  checked  value=' + data + ' >';
                                     }
                                     else {
                                         return '<input type="checkbox" id="groupclo" class="groupclo editor-active" unchecked  value=' + data + ' >';

                                     }
                                 }
                             },
                              { title: "ProcessSetup", "visible": false },
                                { title: "Compunitid", "visible": false },
                                  { title: "Orderno", "visible": false },
                                    { title: "Refno", "visible": false },
                                      { title: "Styleid", "visible": false },
                                        { title: "Style", "visible": false },
                                      { title: "Processid", "visible": false },
                                       { title: "Processorid", "visible": false },
                              { title: "Action" },


                    ]

                });
            }

            //ddlmain();
            //$('#ddlMOrderNo').empty();
            //$('#ddlMProcess').empty();
            //$('#ddlMUnit').empty();
            //$('#ddlMType').empty();


            var table = $('#tblmaindetails').DataTable();
            $("#tblmaindetails tr").click(function () {
                var selected = $(this).hasClass("selected");
                $("#tblmaindetails tr").removeClass("selected");
                if (!selected)
                    $(this).addClass("selected");
            });

            //if (ChkRefno) {
            //    var refobj = [];
            //    $.each(dataSet, function (i) {
            //        var obj = {
            //            Refno: dataSet[i][13]
            //        }
            //        refobj.push(obj);
            //    });



            //    var revdet = {};
            //    var rev = [];

            //    $.each(refobj, function (i, el) {

            //        if (!revdet[el.Refno]) {
            //            revdet[el.Refno] = true;
            //            rev.push(el);
            //        }
            //    });

            //    $('#ddlMRefNo').empty();
            //    $('#ddlMRefNo').append($('<option/>').val('0').text('--Select Ref No--'));
            //    $.each(rev, function () {
            //        $('#ddlMRefNo').append($('<option></option>').val(this.Refno).text(this.Refno));
            //    });

            //}


            //if (ChkOrdno) {
            //    var refobj = [];
            //    $.each(dataSet, function (i) {
            //        var obj = {
            //            Ordno: dataSet[i][12]
            //        }
            //        refobj.push(obj);
            //    });



            //    var revdet = {};
            //    var rev = [];

            //    $.each(refobj, function (i, el) {

            //        if (!revdet[el.Ordno]) {
            //            revdet[el.Ordno] = true;
            //            rev.push(el);
            //        }
            //    });

            //    $('#ddlMBuyOrderNo').empty();
            //    $('#ddlMBuyOrderNo').append($('<option/>').val('0').text('--Select Order No--'));
            //    $.each(rev, function () {
            //        $('#ddlMBuyOrderNo').append($('<option></option>').val(this.Ordno).text(this.Ordno));
            //    });

            //}


            if (ChkSupplier) {
                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Suppid: dataSet[i][17],
                        Supp: dataSet[i][6]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.Suppid]) {
                        revdet[el.Suppid] = true;
                        rev.push(el);
                    }
                });


                var proctype = $('input[name="proctype"]:checked').attr('value');

                if (proctype == 'P') {

                    $('#ddlMSupplier').empty();
                    $('#ddlMSupplier').append($('<option/>').val('0').text('--Select Supplier--'));
                    $.each(rev, function () {
                        $('#ddlMSupplier').append($('<option></option>').val(this.Suppid).text(this.Supp));
                    });
                }
                else if (proctype == 'W') {
                    $('#ddlMwrkdiv').empty();
                    $('#ddlMwrkdiv').append($('<option/>').val('0').text('--Select WorkDIV--'));
                    $.each(rev, function () {
                        $('#ddlMwrkdiv').append($('<option></option>').val(this.Suppid).text(this.Supp));
                    });
                }

            }

            //if (ChkStyle) {
            //    var refobj = [];
            //    $.each(dataSet, function (i) {
            //        var obj = {
            //            styleid: dataSet[i][14],
            //            style: dataSet[i][15]
            //        }
            //        refobj.push(obj);
            //    });



            //    var revdet = {};
            //    var rev = [];

            //    $.each(refobj, function (i, el) {

            //        if (!revdet[el.styleid]) {
            //            revdet[el.styleid] = true;
            //            rev.push(el);
            //        }
            //    });

            //    $('#ddlMStyle').empty();
            //    $('#ddlMStyle').append($('<option/>').val('0').text('--Select Style--'));
            //    $.each(rev, function () {
            //        $('#ddlMStyle').append($('<option></option>').val(this.styleid).text(this.style));
            //    });

            //}

            if (ChkPONo) {
                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Pono: dataSet[i][1],
                        poid: dataSet[i][0]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.poid]) {
                        revdet[el.poid] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMOrderNo').empty();
                $('#ddlMOrderNo').append($('<option/>').val('0').text('--Select ProdOrdNo--'));
                $.each(rev, function () {
                    $('#ddlMOrderNo').append($('<option></option>').val(this.poid).text(this.Pono));
                });

            }

            if (ChkCUnit) {
                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Unit: dataSet[i][4],
                        Unitid: dataSet[i][11]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.Unitid]) {
                        revdet[el.Unitid] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMUnit').empty();
                $('#ddlMUnit').append($('<option/>').val('0').text('--Select CompanyUnit--'));
                $.each(rev, function () {
                    $('#ddlMUnit').append($('<option></option>').val(this.Unitid).text(this.Unit));
                });

            }

            if (ChkProcess) {
                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Process: dataSet[i][5],
                        Processid: dataSet[i][16]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.Processid]) {
                        revdet[el.Processid] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMProcess').empty();
                $('#ddlMProcess').append($('<option/>').val('0').text('--Select Process--'));
                $.each(rev, function () {
                    $('#ddlMProcess').append($('<option></option>').val(this.Processid).text(this.Process));
                });

            }

          

        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadMaingridFromBack() {
    debugger;

    Fromback = 1;
    var fill = localStorage.getItem('ProcessOrderMainFilter');
    var fillobj = [];
    fillobj = fill.split(",");

    //$('#txtFromDate').val(fillobj[10]);
    //$('#txtToDate').val(fillobj[11]);

    //if (fillobj[3] == 'P') {
    //    $('#MProcessor').prop('checked', true);
    //} else {
    //    $('#MWrkdiv').prop('checked', true);
    //}
    //if (fillobj[2] == 'W') {
    //    $('#rdMbuyer').prop('checked', true);
    //} else {
    //    $('#rdMSam').prop('checked', true);
    //}
    if (fillobj[15] == 'P') {
        $('#rdMpending').prop('checked', true);
    } else {
        $('#rdMapproved').prop('checked', true);
    }

    //if (fillobj[1] == 'Y') {
    //    $('#Closure').prop('checked', true);
    //} else {
    //    $('#Closure').prop('checked', false);
    //}

    if (fillobj[5] == "undefined") {
        fillobj[5] = '';
    }
    if (fillobj[12] == "undefined") {
        fillobj[12] = '';
    }
    if (fillobj[13] == "undefined") {
        fillobj[13] = '';
    }
    if (fillobj[4] == "undefined") {
        fillobj[4] = 0;
    }
    if (fillobj[7] == "undefined") {
        fillobj[7] = 0;
    }
    if (fillobj[8] == "undefined") {
        fillobj[8] = 0;
    }
    if (fillobj[9] == "undefined") {
        fillobj[9] = 0;
    }
    if (fillobj[14] == "undefined") {
        fillobj[14] = 0;
    }

    $.ajax({
        url: "/ProcessOrder/LoadMaingrid",
        data: JSON.stringify({ cmpid: fillobj[0], closed: fillobj[1], buyrsamp: fillobj[2], processortype: fillobj[3], prodordid: fillobj[4], prodord: fillobj[5], type: fillobj[6], processorid: fillobj[7], unitid: fillobj[8], processid: fillobj[9], fromDate: fillobj[10], todate: fillobj[11], orderno: fillobj[12], refno: fillobj[13], styleid: fillobj[14], AppType: fillobj[15] }),
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
                    bSort: false,
                    columns: [
                             { title: "Productionordid", "visible": false },
                             { title: "Order No" },
                             { title: "Order Date" },
                             { title: "Company" },
                             { title: "Unit" },
                             { title: "Process" },
                             { title: "Processor" },
                             { title: "Type", "visible": false },
                             { title: "Approved", "visible": false },
                             {
                                 title: "Closure", data: "Productionordid", "visible": false,
                                 render: function (data, type, row) {
                                     if (row[9] == "Y") {
                                         return '<input type="checkbox" id="groupclo" class="groupclo editor-active"  checked  value=' + data + ' >';
                                     }
                                     else {
                                         return '<input type="checkbox" id="groupclo" class="groupclo editor-active" unchecked  value=' + data + ' >';

                                     }
                                 }
                             },
                              { title: "ProcessSetup", "visible": false },
                                { title: "Compunitid", "visible": false },
                                  { title: "Orderno", "visible": false },
                                    { title: "Refno", "visible": false },
                                      { title: "Styleid", "visible": false },
                                        { title: "Style", "visible": false },
                                      { title: "Processid", "visible": false },
                                       { title: "Processorid", "visible": false },
                              { title: "Action" },


                    ]

                });
            }




            var refobj = [];
            $.each(dataSet, function (i) {
                var obj = {
                    Pono: dataSet[i][1],
                    poid: dataSet[i][0]
                }
                refobj.push(obj);
            });



            var revdet = {};
            var rev = [];

            $.each(refobj, function (i, el) {

                if (!revdet[el.poid]) {
                    revdet[el.poid] = true;
                    rev.push(el);
                }
            });

            $('#ddlMOrderNo').empty();
            $('#ddlMOrderNo').append($('<option/>').val('0').text('--Select ProdOrdNo--'));
            $.each(rev, function () {
                $('#ddlMOrderNo').append($('<option></option>').val(this.poid).text(this.Pono));
            });


            var revdet = {};
            var rev = [];

            $.each(refobj, function (i, el) {

                if (!revdet[el.Suppid]) {
                    revdet[el.Suppid] = true;
                    rev.push(el);
                }
            });

            var proctype = $('input[name="proctype"]:checked').attr('value');

            if (proctype == 'P') {

                $('#ddlMSupplier').empty();
                $('#ddlMSupplier').append($('<option/>').val('0').text('--Select Supplier--'));
                $.each(rev, function () {
                    $('#ddlMSupplier').append($('<option></option>').val(this.Suppid).text(this.Supp));
                });
            }
            else if (proctype == 'W') {
                $('#ddlMwrkdiv').empty();
                $('#ddlMwrkdiv').append($('<option/>').val('0').text('--Select Supplier--'));
                $.each(rev, function () {
                    $('#ddlMwrkdiv').append($('<option></option>').val(this.Suppid).text(this.Supp));
                });
            }

            var revdet = {};
            var rev = [];

            $.each(refobj, function (i, el) {

                if (!revdet[el.Processid]) {
                    revdet[el.Processid] = true;
                    rev.push(el);
                }
            });

            $('#ddlMProcess').empty();
            $('#ddlMProcess').append($('<option/>').val('0').text('--Select Process--'));
            $.each(rev, function () {
                $('#ddlMProcess').append($('<option></option>').val(this.Processid).text(this.Process));
            });



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

    ChkRefno = true;
    ChkOrdno = true;
    DtChk = false;
    ChkSupplier = true;
    ChkStyle = true;
    ChkPONo = true;
    ChkComp = false;
    ChkCUnit = true;
    ChkProcess = true;

    ddlmain();

}


function ddlmain() {
    LoadCompanyUnitDDL("#ddlMUnit");
    var type = $('input[name="maintype"]:checked').attr('value');
    var proctype = $('input[name="proctype"]:checked').attr('value');
    var apptype = $('input[name="Apptype"]:checked').attr('value');
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

    if (StyId == null) {
        StyId = 0;
    } else {
        StyId = $('#ddlMStyle').val();
    }

    if (proctype == 'P') {

        $('#Msupp').show();
        $("#Mwrkdiv").hide();
    }
    else if (proctype == 'W') {
        $('#Msupp').hide();
        $("#Mwrkdiv").show();
    }
    //var GrnNo = "";

    var prodid = 0;
    var checkedValue = $('.messageCheckbox:checked').val();

    if (checkedValue == undefined) {

        var clsd = "N";
    }
    else {
        var clsd = "Y";
    }
    var prid = 0;


    //var CompId = $('#ddlMCompany').val();
    //if (CompId == null) {
    //    CompId = 0;
    //}

    var CompId = $('#ddlMCompany').val();

    if (CompId == null) {
        CompId = DCompid;
    } else {
        CompId = $('#ddlMCompany').val();
    }


    var prod = $('#ddlMOrderNo').val();
    if (prod == null || prod == 0) {
        prod = "";
    }
    var Unit = $('#ddlMUnit').val();
    if (Unit == null) {
        Unit = 0;
    }
    var prid = 0;
    var process = $('#ddlMProcess').val();
    if (process == null) {
        process = 0;
    }
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    $.ajax({
        url: "/ProcessOrder/LoadMaingriddet",
        data: JSON.stringify({ cmpid: CompId, closed: clsd, buyrsamp: type, processortype: proctype, prodordid: prodid, prodord: prod, type: proctype, processorid: prid, unitid: Unit, processid: process, fromDate: FDate, todate: TDate, orderno: OrdNo, refno: RefNo, styleid: StyId, AppType: apptype }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;


            var obj = json.Value;

            Mloadlist = json.Value;

            if (json.Status == 'SUCCESS') {


                var data = json.Value;

                var compdet = {};
                var comp = [];
                var procdet = {};
                var proc = [];
                var unitdet = {};
                var unit = [];

                var suppdet = {};
                var supp = [];
                $.each(obj, function (i, el) {

                    if (!compdet[el.prodnord]) {
                        compdet[el.prodnord] = true;
                        comp.push(el);
                    }
                    if (!procdet[el.processid]) {
                        procdet[el.processid] = true;
                        proc.push(el);
                    }

                    if (!unitdet[el.cmpunitid]) {
                        unitdet[el.cmpunitid] = true;
                        unit.push(el);
                    }

                    if (!suppdet[el.processorid]) {
                        suppdet[el.processorid] = true;
                        supp.push(el);
                    }
                });


                //$(ddlMOrderNo).empty();
                //$(ddlMProcess).empty();
                ////$(ddlMUnit).empty();
                //$(ddlMSupplier).empty();



                //$(ddlMOrderNo).append($('<option/>').val('0').text('--Select ProdOrd--'));
                //$.each(comp, function () {
                //    $(ddlMOrderNo).append($('<option></option>').text(this.prodnord));
                //});

                //$(ddlMProcess).append($('<option/>').val('0').text('--Select Process--'));
                //$.each(proc, function () {
                //    $(ddlMProcess).append($('<option></option>').val(this.processid).text(this.process));
                //});

                ////$(ddlMUnit).append($('<option/>').val('0').text('--Select Unit--'));
                ////$.each(unit, function () {
                ////    $(ddlMUnit).append($('<option></option>').val(this.cmpunitid).text(this.cmpnyunit));
                ////});

                //$(ddlMSupplier).append($('<option/>').val('0').text('--Select Supplier--'));
                //$.each(supp, function () {
                //    $(ddlMSupplier).append($('<option></option>').val(this.processorid).text(this.processor));
                //});


                ////$(ddlMType).append($('<option/>').val('0').text('--Select Type--'));
                ////$.each(data, function () {
                ////    $(ddlMType).append($('<option></option>').text(this.type));
                ////});




                if (ChkRefno) {
                    var refobj = [];
                    $.each(Mloadlist, function (i) {
                        var obj = {
                            Refno: Mloadlist[i].refno
                        }
                        refobj.push(obj);
                    });



                    var revdet = {};
                    var rev = [];

                    $.each(refobj, function (i, el) {

                        if (!revdet[el.Refno]) {
                            revdet[el.Refno] = true;
                            rev.push(el);
                        }
                    });

                    $('#ddlMRefNo').empty();
                    $('#ddlMRefNo').append($('<option/>').val('0').text('--Select Ref No--'));
                    $.each(rev, function () {
                        $('#ddlMRefNo').append($('<option></option>').val(this.Refno).text(this.Refno));
                    });

                }


                if (ChkOrdno) {

                    var refobj = [];
                    $.each(Mloadlist, function (i) {
                        var obj = {
                            Ordno: Mloadlist[i].orderno
                        }
                        refobj.push(obj);
                    });



                    var revdet = {};
                    var rev = [];

                    $.each(refobj, function (i, el) {

                        if (!revdet[el.Ordno]) {
                            revdet[el.Ordno] = true;
                            rev.push(el);
                        }
                    });

                    $('#ddlMBuyOrderNo').empty();
                    $('#ddlMBuyOrderNo').append($('<option/>').val('0').text('--Select Order No--'));
                    $.each(rev, function () {
                        $('#ddlMBuyOrderNo').append($('<option></option>').val(this.Ordno).text(this.Ordno));
                    });

                }


                if (ChkStyle) {
                    var refobj = [];
                    $.each(Mloadlist, function (i) {
                        var obj = {
                            styleid: Mloadlist[i].styleid,
                            style: Mloadlist[i].style
                        }
                        refobj.push(obj);
                    });



                    var revdet = {};
                    var rev = [];

                    $.each(refobj, function (i, el) {

                        if (!revdet[el.styleid]) {
                            revdet[el.styleid] = true;
                            rev.push(el);
                        }
                    });

                    $('#ddlMStyle').empty();
                    $('#ddlMStyle').append($('<option/>').val('0').text('--Select Style--'));
                    $.each(rev, function () {
                        $('#ddlMStyle').append($('<option></option>').val(this.styleid).text(this.style));
                    });

                }


                //LoadMaingrid();
            }


        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}


function MRadioOtype() {
    //  $('#tblmaindetails').DataTable().destroy();
    //ListOrRefNo();
    //ListPStyle();
    //ddlmain();
    CMainlist();
}

function CMainlist() {
    if (Fromback == 0) {
        var apptype = $('input[name="Apptype"]:checked').attr('value');
        if (apptype == 'A') {
            $('#lblAppChkId').hide();
            $('#Appgridtab').hide();
            $('#ChkAppButId').hide();
            $('#btnApp').hide();
            $("#btnRev").show();
        }

        ChkRefno = true;
        ChkOrdno = true;
        DtChk = false;
        ChkSupplier = true;
        ChkStyle = true;
        ChkPONo = true;
        ChkComp = true;
        ChkCUnit = true;
        ChkProcess = true;

        LoadMaingrid();
        ddlmain();
    } else {
        ChkRefno = true;
        ChkOrdno = true;
        DtChk = false;
        ChkSupplier = true;
        ChkStyle = true;
        ChkPONo = true;
        ChkComp = false;
        ChkCUnit = true;
        ChkProcess = true;

        LoadMaingrid();
        ddlmain();
    }
}

function BMainlist() {
    ChkRefno = false;
    ChkOrdno = false;
    DtChk = false;
    ChkSupplier = false;
    ChkStyle = true;
    ChkPONo = true;
    ChkComp = false;
    ChkCUnit = false;
    ChkProcess = true;

    LoadMaingrid();
    ddlmain();

}
function POMainlist() {
    ChkRefno = false;
    ChkOrdno = false;
    DtChk = false;
    ChkSupplier = false;
    ChkStyle = false;
    ChkPONo = false;
    ChkComp = false;
    ChkCUnit = false;
    ChkProcess = false;

    LoadMaingrid();
    ddlmain();
}

function SMainlist() {
    ChkRefno = false;
    ChkOrdno = false;
    DtChk = false;
    ChkSupplier = false;
    ChkStyle = false;
    ChkPONo = true;
    ChkComp = false;
    ChkCUnit = false;
    ChkProcess = true;

    LoadMaingrid();
    ddlmain();
}
function RMainlist() {
    ChkRefno = false;
    ChkOrdno = false;
    DtChk = false;
    ChkSupplier = false;
    ChkStyle = true;
    ChkPONo = true;
    ChkComp = false;
    ChkCUnit = false;
    ChkProcess = true;

    LoadMaingrid();
    ddlmain();
}
function PMainlist() {
    ChkRefno = false;
    ChkOrdno = false;
    DtChk = false;
    ChkSupplier = false;
    ChkStyle = false;
    ChkPONo = true;
    ChkComp = false;
    ChkCUnit = false;
    ChkProcess = false;

    LoadMaingrid();
    ddlmain();
}
function SPMainlist() {
    ChkRefno = true;
    ChkOrdno = true;
    DtChk = false;
    ChkSupplier = false;
    ChkStyle = true;
    ChkPONo = true;
    ChkComp = false;
    ChkCUnit = true;
    ChkProcess = true;
    LoadMaingrid();
    ddlmain();
}



function LoadEditOutputItmDet() {
    debugger;
    Masid;
    $.ajax({
        url: "/ProcessOrder/LoadEditOutputItmgrid",
        data: JSON.stringify({ prodid: Masid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            OpItmList = result.Value;
            if (AllowList.length > 0) {
                if (AllowList[0].PQuantity > 0) {
                    var qn = AllowList[0].PQuantity;
                    $.each(OpItmList, function () {
                        this.allow = parseFloat(this.bal) + parseFloat(qn);
                    });
                }
                else if (AllowList[0].ProPercentage > 0) {
                    var qn = AllowList[0].ProPercentage;
                    $.each(OpItmList, function () {
                        var bl = (parseFloat(this.bal) * qn) / 100;
                        bl = bl.toFixed(3);
                        this.allow = (parseFloat(this.bal) + parseFloat(bl)).toFixed(3);
                    });
                }
                else if (AllowList[0].PQuantity == 0 && AllowList[0].ProPercentage == 0) {
                    $.each(OpItmList, function () {
                        this.allow = this.bal;
                    });
                }
            }

            OutputitmTab(OpItmList);

            opItmid = OpItmList[0].itmid;
            OpClrid = OpItmList[0].clrid;
            OpSizeid = OpItmList[0].sizeid;
            OpPSizeid = OpItmList[0].plansizeid;

            if (OpItmList.length > 0) {
                //Despatch
                if (OpItmList[0].disptype == 'P') {
                    $("#OptSelf").attr('checked', 'checked');
                    $("#ddlLocation").val(OpItmList[0].disploc);
                }
                else if (OpItmList[0].disptype == 'O') {
                    $("#OptUnit").attr('checked', 'checked');
                    $("#ddlLocation").val(OpItmList[0].disploc);
                }
                else if (OpItmList[0].disptype == 'S') {
                    $("#OptStore").attr('checked', 'checked');
                    $("#ddlLocation").val(OpItmList[0].disploc);
                }
                else if (OpItmList[0].disptype == 'C') {
                    $("#OptSup").attr('checked', 'checked');
                    $("#ddlLocation").val(OpItmList[0].disploc);
                }
                //Issue
                if (OpItmList[0].isstype == 'O') {
                    $("#OptIssUnit").attr('checked', 'checked');
                    $("#ddlIssueLocation").val(OpItmList[0].issloc);
                }
                else if (OpItmList[0].isstype == 'C') {
                    $("#OptCmp").attr('checked', 'checked');
                    $("#ddlIssueLocation").val(OpItmList[0].issloc);
                }
                LoadLocalAdd();
                LoadIssLocalAdd();

                var totalamnt = 0;
                for (var e = 0; e < OpItmList.length; e++) {
                    var amount = OpItmList[e].ordqty;
                    totalamnt = totalamnt + parseFloat(amount);

                }
                //$('#txtGrossAmt').val(totalamnt);
            }


        }

    });
}

function LoadEditInputItmDet() {
    debugger;
    Masid;
    $.ajax({
        url: "/ProcessOrder/LoadEditInputItmgrid",
        data: JSON.stringify({ prodid: Masid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            IpItmList = result.Value;
            if (AllowList.length > 0) {
                if (AllowList[0].PQuantity > 0) {
                    var qn = AllowList[0].PQuantity;
                    $.each(IpItmList, function () {
                        this.allow = parseFloat(this.bal) + parseFloat(qn);
                    });
                }
                else if (AllowList[0].ProPercentage > 0) {
                    var qn = AllowList[0].ProPercentage;
                    $.each(IpItmList, function () {
                        var bl = (parseFloat(this.bal) * qn) / 100;
                        bl = bl.toFixed(3);
                        this.allow = (parseFloat(this.bal) + parseFloat(bl)).toFixed(3);
                    });
                }
                else if (AllowList[0].PQuantity == 0 && AllowList[0].ProPercentage == 0) {
                    $.each(IpItmList, function () {
                        this.allow = this.bal;
                    });
                }
            }
            InputitmTab(IpItmList);

            Itmid = IpItmList[0].itmid;
            Colorid = IpItmList[0].clrid;
            Sizeid = IpItmList[0].sizeid;
        }

    });
}


function LoadEditOutputJobDet() {
    debugger;
    Masid;
    $.ajax({
        url: "/ProcessOrder/LoadEditOutputjobdetgrid",
        data: JSON.stringify({ prodid: Masid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            OpSaveJobDetList = result.Value;
            if (AllowList.length > 0) {
                if (AllowList[0].PQuantity > 0) {
                    var qn = AllowList[0].PQuantity;
                    $.each(OpSaveJobDetList, function () {
                        this.allow = parseFloat(this.bal) + parseFloat(qn);
                    });
                }
                else if (AllowList[0].ProPercentage > 0) {
                    var qn = AllowList[0].ProPercentage;
                    $.each(OpSaveJobDetList, function () {
                        var bl = (parseFloat(this.bal) * qn) / 100;
                        bl = bl.toFixed(3);
                        this.allow = (parseFloat(this.bal) + parseFloat(bl)).toFixed(3);
                    });
                }
                else if (AllowList[0].PQuantity == 0 && AllowList[0].ProPercentage == 0) {
                    $.each(OpSaveJobDetList, function () {
                        this.allow = this.bal;
                    });
                }
            }

            OutputSaveJobdetTab(OpSaveJobDetList);
            // OutputJobdetTab(OpSaveJobDetList);

            var colorempty = [];
            colorempty = OpSaveJobDetList;

            //colorempty = $.grep(colorempty, function (v) {
            //    return (v.itmid === opItmid && v.clrid === OpClrid && v.sizeid === OpSizeid && v.plansizeid === OpPSizeid);
            //});
            OpJobDetList = [];
            OpJobDetList = colorempty;
            OutputJobdetTab(colorempty);
            LoadGrossNetAmt();
        }

    });
}

function LoadEditInputJobDet() {
    debugger;
    Masid;
    $.ajax({
        url: "/ProcessOrder/LoadEditInputjobdetgrid",
        data: JSON.stringify({ prodid: Masid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            IpSaveJobDetList = result.Value;
            if (AllowList.length > 0) {
                if (AllowList[0].PQuantity > 0) {
                    var qn = AllowList[0].PQuantity;
                    $.each(IpSaveJobDetList, function () {
                        this.allow = parseFloat(this.bal) + parseFloat(qn);
                    });
                }
                else if (AllowList[0].ProPercentage > 0) {
                    var qn = AllowList[0].ProPercentage;
                    $.each(IpSaveJobDetList, function () {
                        var bl = (parseFloat(this.bal) * qn) / 100;
                        bl = bl.toFixed(3);
                        this.allow = (parseFloat(this.bal) + parseFloat(bl)).toFixed(3);
                    });
                }
                else if (AllowList[0].PQuantity == 0 && AllowList[0].ProPercentage == 0) {
                    $.each(IpSaveJobDetList, function () {
                        this.allow = this.bal;
                    });
                }
            }


            InputSaveJobdetTab(IpSaveJobDetList);
            InputJobdetTab(IpSaveJobDetList);
            //opItmid = OpItmList[0].itmid;
            //OpClrid = OpItmList[0].clrid;
            //OpSizeid = OpItmList[0].sizeid;
            //var colorempty = [];
            //colorempty = IpSaveJobDetList;

            //colorempty = $.grep(colorempty, function (v) {
            //    return (v.itmid === Itmid && v.clrid === Colorid && v.sizeid === Sizeid);
            //});
            //IpJobDetList = [];
            //IpJobDetList = colorempty;
            //InputJobdetTab(colorempty);
        }

    });
}

function LoadEditInputStkdet() {
    debugger;
    Masid;
    $.ajax({
        url: "/ProcessOrder/LoadEditInputStkDet",
        data: JSON.stringify({ cmpid: CompanyId, prodid: Masid, prodordno: ProductionOrderno }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            IpSaveStkDetList = result.Value;
            if (AllowList.length > 0) {
                if (AllowList[0].PQuantity > 0) {
                    var qn = AllowList[0].PQuantity;
                    $.each(IpSaveStkDetList, function () {
                        this.allow = parseFloat(this.bal) + parseFloat(qn);
                    });
                }
                else if (AllowList[0].ProPercentage > 0) {
                    var qn = AllowList[0].ProPercentage;
                    $.each(IpSaveStkDetList, function () {
                        var bl = (parseFloat(this.bal) * qn) / 100;
                        bl = bl.toFixed(3);
                        this.allow = (parseFloat(this.bal) + parseFloat(bl)).toFixed(3);
                    });
                }
                else if (AllowList[0].PQuantity == 0 && AllowList[0].ProPercentage == 0) {
                    $.each(IpSaveStkDetList, function () {
                        this.allow = this.bal;
                    });
                }
            }

            InputSaveStkdetTab(IpSaveStkDetList);



            if (IpSaveStkDetList.length > 0) {
                for (var r = 0; r < IpSaveStkDetList.length; r++) {
                    if (IpSaveStkDetList[r].issues > 0) {
                        LoadIssueNo();
                    }
                }
            }
            //opItmid = OpItmList[0].itmid;
            //OpClrid = OpItmList[0].clrid;
            //OpSizeid = OpItmList[0].sizeid;
        }

    });
}

function LoadEditAddless() {
    debugger;
    Masid;
    $.ajax({
        url: "/ProcessOrder/LoadEditAddlessgrid",
        data: JSON.stringify({ prodid: Masid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            AccList = result.Value;
            loadAccTable(AccList);

            var totalAccamnt = 0;
            for (var e = 0; e < AccList.length; e++) {
                var amount = AccList[e].Amount;
                totalAccamnt = totalAccamnt + parseFloat(amount);

            }


            //    loadItemTable(ItemList);
            // $('#txtNetAmt').val(totalAccamnt.toFixed(3));

            //var GAmt = $('#txtGrossAmt').val();
            //// var NAmt = $('#txtNetAmt').val();
            //var FNAmt = parseFloat(GAmt) + parseFloat(totalAccamnt);

            //$('#txtNetAmt').val(FNAmt);
        }

    });
}

function getbyID(id, Approved) {
    debugger;

    if (superuser != "superuser") {
        if (Approved == 1) {
            //alert("This order has been Approved,Please Contact Administrator..");
            var msg = 'This order has been Approved,Please Contact Administrator...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return true;
        }

    }
    Masid = id;
    var type = $('input[name="maintype"]:checked').attr('value');
    var proctype = $('input[name="proctype"]:checked').attr('value');
    var apptype = $('input[name="Apptype"]:checked').attr('value');

    if (proctype == 'P') {

        $('#Msupp').show();
        $("#Mwrkdiv").hide();
    }
    else if (proctype == 'W') {
        $('#Msupp').hide();
        $("#Mwrkdiv").show();
    }
    //var GrnNo = "";

    var prodid = id;
    var clsd = "N";
    var prid = 0;
    var CompId = $('#ddlMCompany').val();
    if (CompId == null || CompId == "0") {
        CompId = 0;
    }
    var prod = $('#ddlMOrderNo').val();
    if (prod == null || prod == 0) {
        prod = "";
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

    if (StyId == null) {
        StyId = 0;
    } else {
        StyId = $('#ddlMStyle').val();
    }
    OrderType = type;

    $.ajax({
        url: "/ProcessOrder/LoadMaingriddet",
        data: JSON.stringify({ cmpid: CompId, closed: clsd, buyrsamp: type, processortype: proctype, prodordid: prodid, prodord: prod, type: proctype, processorid: prid, unitid: Unit, processid: process, fromDate: FDate, todate: TDate, orderno: OrdNo, refno: RefNo, styleid: StyId, AppType: apptype }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            if (ViewMode == 1) {
                $('#myModal1').show();
                $('#myModal1').modal('show');
                $('#btnUpdate').hide();
                $('#btnDel').hide();
                $('#btnAdd').hide();
                
            } else {
                $('#myModal1').show();
                $('#myModal1').modal('show');
                $('#btnUpdate').show();
                $('#btnDel').hide();
                $('#btnAdd').hide();
            }
            
            var obj = json.Value;
            $('#txtDeliDate').val(moment(obj[0].delidate).format("DD/MM/YYYY"));
            $('#txtOrderDate').val(moment(obj[0].proddate).format("DD/MM/YYYY"));
            $('#txtUnit').val(obj[0].cmpnyunit);
            $('#txtProcess').val(obj[0].process);
            $('#txtProcessor').val(obj[0].processor);
            $('#txtOrderNo').val(obj[0].prodnord);
            $('#txtremarks').val(obj[0].remarks);
            $('#txtyarnloc').val(obj[0].Yarnloc);
            $('#txtknitloc').val(obj[0].Knitloc);
            $('#txtVehicleno').val(obj[0].Vehicleno);
            CompanyId = obj[0].cmpid;
            ProductionOrderno = obj[0].prodnord;
            Companyunitid = obj[0].cmpunitid;
            subpro = obj[0].SuProcess;
            finpro = obj[0].FinProcess;
            if (subpro == "Y") {
                $('input:radio[name="subproctype"][value="Y"]').prop('checked', true);
            } else if (subpro == "N") {
                $('input:radio[name="subproctype"][value="N"]').prop('checked', true);
            }

            if (finpro == "Y") {
                $('input:radio[name="finproctype"][value="Y"]').prop('checked', true);
            } else if (subpro == "N") {
                $('input:radio[name="finproctype"][value="N"]').prop('checked', true);
            }
            Processid = obj[0].processid;
            Processorid = obj[0].processorid;
            LoadProcessDetails(Processid);
            var DType = obj[0].DispatchLocType;
            if (DType == "P") {
                $('#OptSelf').prop('checked', true);
                editmasunitstore = obj[0]["DispatchLocId"];
            } else if (DType == "O") {
                $('#OptUnit').prop('checked', true);
                editmasunitstore = obj[0]["DispatchLocId"];
            } else if (DType == "S") {
            } else if (DType == "C") {
                $('#OptSup').prop('checked', true);
                editmasunitstore = obj[0]["DispatchLocId"];
            }
            if (DType == "S") {
                $('#OptStore').prop('checked', true);
                editmasunitstore = obj[0]["DispatchLocId"];
                LoadEmployeeStoreunit();
            }

            GetProcessInOutValidate(Processid);
            LoadLocationEdit();
			//editmasunitstore = obj[0]["Unit_Supplier"];
            //LoadEmployeeStoreunit();
            //LoadLocation();
            //LoadIssLocation();
            //LoadIssueNo();
            LoadEditOutputItmDet();
            LoadEditInputItmDet();
            LoadEditOutputJobDet();
            LoadEditInputJobDet();
            LoadEditInputStkdet();
            LoadEditAddless();
            CheckAlloted();
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadIssueNo() {
    debugger;
    $.ajax({
        url: "/ProcessOrder/LoadIssueNo",
        data: JSON.stringify({ ordid: Masid }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            $('#txtIssueId').val(obj[0].ProcessIssueId);
            $('#txtIssueNo').val(obj[0].ProcessIssueNo);
        }
    });
}

function getDeleteID(id, Approved) {
    debugger;
    if (superuser != "superuser") {
        if (Approved == 1) {
            //alert("This order has been Approved,Please Contact Administrator..");
            var msg = 'This order has been Approved,Please Contact Administrator...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return true;
        }

    }
    Masid = id;
    var type = $('input[name="maintype"]:checked').attr('value');
    var proctype = $('input[name="proctype"]:checked').attr('value');


    if (proctype == 'P') {

        $('#Msupp').show();
        $("#Mwrkdiv").hide();
    }
    else if (proctype == 'W') {
        $('#Msupp').hide();
        $("#Mwrkdiv").show();
    }
    //var GrnNo = "";

    var prodid = id;
    var clsd = "N";
    var prid = 0;
    var CompId = $('#ddlMCompany').val();
    if (CompId == null) {
        CompId = 0;
    }
    var prod = $('#ddlMOrderNo').val();
    if (prod == null || prod == 0) {
        prod = "";
    }
    var Unit = $('#ddlMUnit').val();
    if (Unit == null) {
        Unit = 0;
    }
    var prid = 0;
    var process = $('#ddlMProcess').val();
    if (process == null) {
        process = 0;
    }
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

    if (StyId == null) {
        StyId = 0;
    } else {
        StyId = $('#ddlMStyle').val();
    }
    $.ajax({
        url: "/ProcessOrder/LoadMaingriddet",
        data: JSON.stringify({ cmpid: CompId, closed: clsd, buyrsamp: type, processortype: proctype, prodordid: prodid, prodord: prod, type: proctype, processorid: prid, unitid: Unit, processid: process, fromDate: FDate, todate: TDate, orderno: OrdNo, refno: RefNo, styleid: StyId }),
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

            $('#txtDeliDate').val(moment(obj[0].delidate).format("DD/MM/YYYY"));
            $('#txtOrderDate').val(moment(obj[0].proddate).format("DD/MM/YYYY"));
            $('#txtUnit').val(obj[0].cmpnyunit);
            $('#txtProcess').val(obj[0].process);
            $('#txtProcessor').val(obj[0].processor);
            $('#txtOrderNo').val(obj[0].prodnord);
            $('#txtremarks').val(obj[0].remarks);
            $('#txtVehicleno').val(obj[0].Vehicleno);
            CompanyId = obj[0].cmpid;
            ProductionOrderno = obj[0].prodnord;
            Companyunitid = obj[0].cmpunitid;

            Processid = obj[0].processid;
            Processorid = obj[0].processorid;
            LoadIssueNo();
            LoadEditOutputItmDet();
            LoadEditInputItmDet();
            LoadEditOutputJobDet();
            LoadEditInputJobDet();
            LoadEditInputStkdet();
            CheckAlloted();
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function MasDelete() {
    var type = $('input[name="optwrkord"]:checked').attr('value');
    var ordtype = $('input[name="type"]:checked').attr('value');
    var distype = $('input[name="disploc"]:checked').attr('value');
    var desptchtype = $('input[name="DType"]:checked').attr('value');
    var isstype = $('input[name="IssType"]:checked').attr('value');
    var iolist = [];
    var jobdetlist = [];
    var stkdetlist = [];
    if (OpItmList.length > 0) {
        for (var r = 0; r < OpItmList.length; r++) {
            var det = {
                processorddetid: OpItmList[r].sno,
                processordid: Masid,
                itemid: OpItmList[r].itmid,
                colorid: OpItmList[r].clrid,
                sizeid: OpItmList[r].sizeid,
                inp_op: OpItmList[r].inrout,
                order_output_qty: OpItmList[r].prgopqty,
                issued_qty: 0.00,
                rate: OpItmList[r].rate,
                received_qty: OpItmList[r].ordqty,
                Return_Qty: 0.00,
                Damage_qty: 0.00,
                Cancel_Qty: 0.00,
                //Returnable_Qty:0.00,
                //Inp_CancelQty:
                //Markup_Rate:
                //Markup_Value:
                PlannedSizeID: OpItmList[r].sizeid,
                OrdSecQty: 0.00,
                ItemRemarks: $("#txtremarks").val(),
                Loss_Qty: 0.00,
                //IN_OUT_UOMID:
                //IssueSizeID:
                ReqDate: $("#txtOrderDate").val(),//new Date($('#txtOrderDate').val()),
                //Loop_Len:
                //Gauge:

            }
            iolist.push(det);
        }
    }


    if (IpItmList.length > 0) {
        for (var r = 0; r < IpItmList.length; r++) {
            var det = {
                processorddetid: IpItmList[r].sno,
                processordid: Masid,
                itemid: IpItmList[r].itmid,
                colorid: IpItmList[r].clrid,
                sizeid: IpItmList[r].sizeid,
                inp_op: IpItmList[r].inrout,
                order_output_qty: IpItmList[r].prgopqty,
                issued_qty: IpItmList[r].issqty,
                rate: IpItmList[r].rate,
                received_qty: 0.00,
                Return_Qty: 0.00,
                Damage_qty: 0.00,
                Cancel_Qty: 0.00,
                //Returnable_Qty:0.00,
                //Inp_CancelQty:
                //Markup_Rate:
                //Markup_Value:
                PlannedSizeID: IpItmList[r].sizeid,
                OrdSecQty: 0.00,
                ItemRemarks: $("#txtremarks").val(),
                Loss_Qty: 0.00,
                //IN_OUT_UOMID:
                //IssueSizeID:
                ReqDate: $("#txtOrderDate").val(),//new Date($('#txtOrderDate').val()),
                opitemid: IpItmList[r].opitmid,
                opcolorid: IpItmList[r].opclrid,
                opsizeid: IpItmList[r].opsizeid
                //Loop_Len:
                //Gauge:

            }
            iolist.push(det);
        }
    }

    if (OpSaveJobDetList.length > 0) {
        for (var s = 0; s < OpSaveJobDetList.length; s++) {
            var objdet = {
                ProcessnOrdid: Masid,
                ProgQty: OpSaveJobDetList[s].prgopqty,
                OrderQty: 0.00,
                issued_qty: 0.00,
                received_qty: OpSaveJobDetList[s].ordqty,
                Return_Qty: 0.00,
                Damage_qty: 0.00,
                Cancel_Qty: 0.00,
                Job_ord_no: OpSaveJobDetList[s].jobordno,
                ProdPrgNo: OpSaveJobDetList[s].prodpgmno,
                //Returnable_Qty:
                Closed: 'N',
                //Inp_CancelQty:
                OrdSecQty: 0.00,
                Loss_Qty: 0.00,
                buy_ord_ship: 0,
                itemid: OpSaveJobDetList[s].itmid,
                colorid: OpSaveJobDetList[s].clrid,
                sizeid: OpSaveJobDetList[s].sizeid,
                ipop: OpSaveJobDetList[s].inrout
            }
            jobdetlist.push(objdet);
        }
    }

    if (IpSaveJobDetList.length > 0) {
        for (var s = 0; s < IpSaveJobDetList.length; s++) {
            var objdet = {
                ProcessnOrdid: Masid,
                ProgQty: IpSaveJobDetList[s].prgopqty,
                OrderQty: 0.00,
                issued_qty: IpSaveJobDetList[s].ordqty,
                received_qty: 0.00,
                Return_Qty: 0.00,
                Damage_qty: 0.00,
                Cancel_Qty: 0.00,
                Job_ord_no: IpSaveJobDetList[s].jobordno,
                ProdPrgNo: IpSaveJobDetList[s].prodpgmno,
                //Returnable_Qty:
                Closed: 'N',
                //Inp_CancelQty:
                OrdSecQty: 0.00,
                Loss_Qty: 0.00,
                buy_ord_ship: 0,
                itemid: IpSaveJobDetList[s].itmid,
                colorid: IpSaveJobDetList[s].clrid,
                sizeid: IpSaveJobDetList[s].sizeid,
                ipop: IpSaveJobDetList[s].inrout,
                opitemid: IpSaveJobDetList[s].opitmid,
                opcolorid: IpSaveJobDetList[s].opclrid,
                opsizeid: IpSaveJobDetList[s].opsizeid,
            }
            jobdetlist.push(objdet);
        }
    }

    //if (IpSaveStkDetList.length > 0) {
    //    for (var j = 0; j < IpSaveStkDetList.length; j++) {
    //        var objstk = {
    //            ProductionOrdStockId: IpSaveStkDetList[j].prodstkid,
    //            //    ProductionOrdJobid:
    //            Productionordid: Masid,
    //            Productionorder: $("#txtOrderNo").val(),
    //            jobordno: IpSaveStkDetList[j].jobordno,
    //            ItemStockId: IpSaveStkDetList[j].stockid,
    //            IssueQty: IpSaveStkDetList[j].issues,
    //            ReturnQty: 0.00,
    //            LossQty: 0.00,
    //            Returnable_Qty: 0.00,
    //            Markup_Rate: 0.00,
    //            LotNo: '',
    //            Itemid: IpSaveStkDetList[j].itmid,
    //            Colorid: IpSaveStkDetList[j].clrid,
    //            Sizeid: IpSaveStkDetList[j].sizeid
    //        }
    //        stkdetlist.push(objstk);
    //    }
    //}
    var Obj = {
        processordid: Masid,
        processorder: $("#txtOrderNo").val(),
        processordate: $("#txtOrderDate").val(),//new Date($('#txtOrderDate').val()),
        processorid: Processorid,
        processid: Processid,
        remarks: $("#txtremarks").val(),
        companyunitid: Companyunitid,
        companyid: CompanyId,
        ProcessorType: type,
        OrderType: ordtype,
        Closed: 'N',
        // OrderCumIssue:
        DelidateTime: $("#txtDeliDate").val(),//new Date($('#txtDeliDate').val()),
        ComboIds: "",
        DispLocType: desptchtype,
        DispLoc: $("#ddlLocation").val(),
        IssueLocType: isstype,
        IssueLoc: $("#ddlIssueLocation").val(),
        //Teamid:
        StoreUnitId: 1,
        CreatedBy: Guserid,
        //Phoneno:
        //contactperson:
        //amount:
        //taxamount:
        //saccode:
        //CGST:
        //SGST:
        //IGST:
        //TotCGST:
        //TotSGST:
        //TotIGST:
        moduletype: 'D',
        ProdDet: iolist,
        ProdJobDet: jobdetlist,
        //ProdStkDet: stkdetlist,
        ProdAddLess: AccList

    }
    LoadingSymb();
    $("#btnDel").attr("disabled", true);
    $.ajax({
        url: "/ProcessOrder/Delete",
        data: JSON.stringify(Obj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == true) {
                //alert("Data Deleted Sucessfully");
                AddUserEntryLog('Process', 'Process Order', 'DELETE', $("#txtOrderNo").val());

                $('#myModal1').modal('hide');
                //window.location.reload();
                var msg = 'Data Deleted Sucessfully...';
                var flg = 2;
                var mod = 0;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                //    $('#tblmaindetails').DataTable().destroy();


                LoadMainGrid();
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


function LoadLocation() {
    var LocalType = $('input[name="DType"]:checked').attr('value');


    $('#txtLocaAdd').val('');

    if (LocalType == "P") {
        LoadCompanyUnitDDL("#ddlLocation");

    } else if (LocalType == "O") {
        LoadCompanyUnitDDL("#ddlLocation");
    } else if (LocalType == "S") {
        // LoadStoreUnitDDL("#ddlLocation");
        LoadEmployeeStoreunit();
    } else if (LocalType == "C") {
        LoadSupplierDDL("#ddlLocation");
    }
}

function LoadLocationEdit() {
    var LocalType = $('input[name="DType"]:checked').attr('value');
    $('#txtLocAdd').val('');

    if (LocalType == "P") {
        LoadCompanyUnitDDL("#ddlLocation");
        if (editmasunitstore > 0) {
            $('#ddlLocation').val(editmasunitstore).trigger('change');
        }

    } else if (LocalType == "O") {
        LoadCompanyUnitDDL("#ddlLocation");
        if (editmasunitstore > 0) {
            $('#ddlLocation').val(editmasunitstore).trigger('change');
        }

    } else if (LocalType == "S") {
        LoadEmployeeStoreunit();
    } else if (LocalType == "C") {
        LoadSupplierDDL("#ddlLocation");
        if (editmasunitstore > 0) {
            $('#ddlLocation').val(editmasunitstore).trigger('change');
        }
    }
}




function LoadLocalAdd() {


    var LocalType = $('input[name="DType"]:checked').attr('value');

    if (LocalType == "P") {
        $('#txtLocaAdd').val("");
        var LocID = $('#ddlLocation').val();

        $.ajax({
            url: "/CompanyUnit/GetbyID/" + LocID,
            typr: "GET",

            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                var obj = result.Value;
                if (result.Status == 'SUCCESS') {

                    $('#txtLocaAdd').val(obj.Address1 + "," + obj.Address2 + "," + obj.Address3);

                }
            }

        });
    } else if (LocalType == "O") {
        $('#txtLocaAdd').val("");
        var LocID = $('#ddlLocation').val();

        $.ajax({
            url: "/CompanyUnit/GetbyID/" + LocID,
            typr: "GET",

            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                var obj = result.Value;
                if (result.Status == 'SUCCESS') {

                    $('#txtLocaAdd').val(obj.Address1 + "," + obj.Address2 + "," + obj.Address3);

                }
            }

        });
    } else if (LocalType == "S") {
        $('#txtLocaAdd').val("");
        var LocID = $('#ddlLocation').val();

        $.ajax({
            url: "/StoreUnit/GetbyId/" + LocID,
            typr: "GET",

            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                var obj = result.Value;
                if (result.Status == 'SUCCESS') {

                    $('#txtLocaAdd').val('');

                }
            }

        });
    } else if (LocalType == "C") {
        $('#txtLocaAdd').val("");
        var LocID = $('#ddlLocation').val();

        $.ajax({
            url: "/Supplier/GetbyId/" + LocID,
            typr: "GET",

            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                var obj = result.Value;
                if (result.Status == 'SUCCESS') {

                    $('#txtLocaAdd').val(obj.Address1 + "," + obj.Address2 + "," + obj.Address3);

                }
            }

        });
    }
}


function LoadIssLocation() {
    var LocalType = $('input[name="IssType"]:checked').attr('value');


    $('#txtIssLocaAdd').val('');

    if (LocalType == "O") {
        LoadCompanyUnitDDL("#ddlIssueLocation");

    } else if (LocalType == "C") {
        LoadCompanyDDL("#ddlIssueLocation");
    }
}




function LoadIssLocalAdd() {


    var LocalType = $('input[name="IssType"]:checked').attr('value');

    if (LocalType == "O") {
        $('#txtIssLocaAdd').val("");
        var LocID = $('#ddlIssueLocation').val();

        $.ajax({
            url: "/CompanyUnit/GetbyID/" + LocID,
            typr: "GET",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                var obj = result.Value;
                if (result.Status == 'SUCCESS') {

                    $('#txtIssLocaAdd').val(obj.Address1 + "," + obj.Address2 + "," + obj.Address3);

                }
            }

        });
    } else if (LocalType == "C") {
        $('#txtIssLocaAdd').val("");
        var LocID = $('#ddlIssueLocation').val();

        $.ajax({
            url: "/Company/GetbyID/" + LocID,
            typr: "GET",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                var obj = result.Value;
                if (result.Status == 'SUCCESS') {

                    $('#txtIssLocaAdd').val(obj.Address1 + "," + obj.Address2 + "," + obj.Address3);

                }
            }

        });
    }
}





function ProcessOrdPrint(Id) {
    debugger;
    Repid = Id;


    var validateProcessOrderApp = $("#hdnvalidateProcessOrderApp").data('value');

    if (validateProcessOrderApp == 'True') {
        var AppTyp = $('input[name="Apptype"]:checked').attr('value');
        if (AppTyp == 'A') {
            LoadMainOrderDetails(Id);
            $('#myModal2').modal('show');
            docname = "PROCESS ORDER";
            GenerateReportItem(docname);
        } else {
            //alert('DC not approved ..');
            var msg = 'DC not approved...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
        }
    } else {
        LoadMainOrderDetails(Id);
        $('#myModal2').modal('show');
        docname = "PROCESS ORDER";
        GenerateReportItem(docname);

    }
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
    var RptTyp = $('input[name="BudPrintPreviewPlanned"]:checked').attr('value');
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

    //var protype = $('input[name="ProcessType"]:checked').attr('value');

    //if (protype == 'C') {

    //    //window.location.href = "../ReportInline/Process/ProcessOrder/ProcessOrderConeWindingInline.aspx?Masid=" + Repid + "&InpDet=" + p[0] + "&Ins=" + p[1] + "&Gatepass=" + p[2] + "&Isssecqty=" + p[3] + "&Lotdet=" + p[4] + "&Ordsecqty=" + p[5] + "&Rem=" + p[6] + "&Disploc=" + p[7] + "&Rate=" + p[8] + "&Amnt=" + p[9] + "&Issloc=" + p[10] + "&Millname=" + p[11] + "&Looplen=" + p[12] + "&Gauge=" + p[13] + "&Outno=" + p[14] + "&Plandet=" + p[15] + "&Opdet=" + p[16] + "&Ewaybill=" + p[17] + "&Ewaydate=" + p[18] + "&Refno=" + p[19];
    //    window.open("../ReportInline/Process/ProcessOrder/ProcessOrderConeWindingInline.aspx?Masid=" + Repid + "&InpDet=" + p[0] + "&Ins=" + p[1] + "&Gatepass=" + p[2] + "&Isssecqty=" + p[3] + "&Lotdet=" + p[4] + "&Ordsecqty=" + p[5] + "&Rem=" + p[6] + "&Disploc=" + p[7] + "&Rate=" + p[8] + "&Amnt=" + p[9] + "&Issloc=" + p[10] + "&Millname=" + p[11] + "&Looplen=" + p[12] + "&Gauge=" + p[13] + "&Outno=" + p[14] + "&Plandet=" + p[15] + "&Opdet=" + p[16] + "&Ewaybill=" + p[17] + "&Ewaydate=" + p[18] + "&Refno=" + p[19]);
    //}
    //else if (protype == 'K') {

    //    window.open("../ReportInline/Process/ProcessOrder/ProcessOrderReportInline.aspx?Masid=" + Repid + "&InpDet=" + p[0] + "&Ins=" + p[1] + "&Gatepass=" + p[2] + "&Isssecqty=" + p[3] + "&Lotdet=" + p[4] + "&Ordsecqty=" + p[5] + "&Rem=" + p[6] + "&Disploc=" + p[7] + "&Rate=" + p[8] + "&Amnt=" + p[9] + "&Issloc=" + p[10] + "&Millname=" + p[11] + "&Looplen=" + p[12] + "&Gauge=" + p[13] + "&Outno=" + p[14] + "&Plandet=" + p[15] + "&Opdet=" + p[16] + "&Ewaybill=" + p[17] + "&Ewaydate=" + p[18] + "&Refno=" + p[19]);
    //}
    //else if (protype == 'D') {

    //    window.open("../ReportInline/Process/ProcessOrder/ProcessOrderDyeingReport.aspx?Masid=" + Repid);
    //}
    //else if (protype == 'Y') {

    //    window.open("../ReportInline/Process/ProcessOrder/ProcessOrderYarnDyedReport.aspx?Masid=" + Repid);
    //}
    var compid = $('#ddlMCompany').val();
    var procname = processname;
    var protype = processsetup;


    var ValidatePrcIssuLoc = $("#hdnValidateProcessIssueLoc").data('value');
    var LoginUnit=0
    if (ValidatePrcIssuLoc == 'True') {
         LoginUnit = $("#hdnLoginUnitId").data('value');
    }


    if (RptTyp == "M") {
        LoadingSymb();

        //var src = '../ReportInline/Purchase/PurchaseOrderTrimsInlineReport/PurchaseOrderTrimsInlineReport.aspx?';
        //src = src + "PurOrdId=" + PurOrdId;
        //var iframe = '<iframe id="reportFrame" align="center" width="100%" height="1000px" background-image="none" frameborder="0" src="' + src + '" allowfullscreen></iframe>';
        //$("#divReport").html(iframe);

        //var arr = [];
        //$('#sbTwo :selected').each(function (i, sel) {
        //    arr.push($(sel).val());
        //});
        //var res = [];
        //var p = [];
        //for (var r = 0; r < repobj.length; r++) {
        //    res.push(repobj[r].optionid);
        //    p.push(0);
        //}
        //for (var y = 0; y < arr.length; y++) {
        //    for (var f = 0; f < res.length; f++) {
        //        if (arr[y] == res[f]) {
        //            p[f] = 1;
        //        }
        //    }
        //}

        $.ajax({
            type: "POST",
            url: "../ReportInline/Process/ProcessOrder/ProcessOrderYarnDyedReport.aspx?Masid=" + Repid + "&ProcessName=" + procname
                + "&OrdNo=" + rptordno + "&RefNo=" + rptrefno + "&Style=" + rptsty + "&InpDet=" + p[0] + "&Ins=" + p[1] + "&Gatepass=" +
                p[2] + "&Isssecqty=" + p[3] + "&Lotdet=" + p[4] + "&Ordsecqty=" + p[5] + "&Rem=" + p[6] + "&Disploc=" + p[7] + "&Rate=" +
                p[8] + "&Amnt=" + p[9] + "&Issloc=" + p[10] + "&Millname=" + p[11] + "&Looplen=" + p[12] + "&Gauge=" + p[13] + "&Outno=" +
                p[14] + "&Plandet=" + p[15] + "&Opdet=" + p[16] + "&Ewaybill=" + p[17] + "&Ewaydate=" + p[18] + "&ShowRefno=" + p[19] + "&RptTyp=" +
                RptTyp + "&Companyid=" + compid + "&Userid=" + LoginUserid + "&LoginUnit=" + LoginUnit + "&Buyer=" + rptbuyer,
            data: "",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                debugger;
                // $("#divResult").html("success");



            },
            error: function (e) {
                // $("#divResult").html("Something Wrong.");
            }
        });

        sentmail(Repid);


    } else {

        window.open("../ReportInline/Process/ProcessOrder/ProcessOrderYarnDyedReport.aspx?Masid=" + Repid + "&ProcessName=" + procname + "&OrdNo=" + rptordno + "&RefNo=" + rptrefno + "&Style=" + rptsty + "&InpDet=" + p[0] + "&Ins=" + p[1] + "&Gatepass=" + p[2] + "&Isssecqty=" + p[3] + "&Lotdet=" + p[4] + "&Ordsecqty=" + p[5] + "&Rem=" + p[6] + "&Disploc=" + p[7] + "&Rate=" + p[8] + "&Amnt=" + p[9] + "&Issloc=" + p[10] + "&Millname=" + p[11] + "&Looplen=" + p[12] + "&Gauge=" + p[13] + "&Outno=" + p[14] + "&Plandet=" + p[15] + "&Opdet=" + p[16] + "&Ewaybill=" + p[17] + "&Ewaydate=" + p[18] + "&ShowRefno=" + p[19] + "&RptTyp=" + RptTyp + "&Companyid=" + compid + "&Userid=" + LoginUserid + "&LoginUnit=" + LoginUnit + "&Buyer=" + rptbuyer);
    }
    //if (protype == 'CONE WINDING' || protype == 'SPACE DYED' || protype == 'Yarn_Dyed') {

    //    //window.location.href = "../ReportInline/Process/ProcessOrder/ProcessOrderConeWindingInline.aspx?Masid=" + Repid + "&InpDet=" + p[0] + "&Ins=" + p[1] + "&Gatepass=" + p[2] + "&Isssecqty=" + p[3] + "&Lotdet=" + p[4] + "&Ordsecqty=" + p[5] + "&Rem=" + p[6] + "&Disploc=" + p[7] + "&Rate=" + p[8] + "&Amnt=" + p[9] + "&Issloc=" + p[10] + "&Millname=" + p[11] + "&Looplen=" + p[12] + "&Gauge=" + p[13] + "&Outno=" + p[14] + "&Plandet=" + p[15] + "&Opdet=" + p[16] + "&Ewaybill=" + p[17] + "&Ewaydate=" + p[18] + "&Refno=" + p[19];
    //    window.open("../ReportInline/Process/ProcessOrder/ProcessOrderConeWindingInline.aspx?Masid=" + Repid + "&InpDet=" + p[0] + "&Ins=" + p[1] + "&Gatepass=" + p[2] + "&Isssecqty=" + p[3] + "&Lotdet=" + p[4] + "&Ordsecqty=" + p[5] + "&Rem=" + p[6] + "&Disploc=" + p[7] + "&Rate=" + p[8] + "&Amnt=" + p[9] + "&Issloc=" + p[10] + "&Millname=" + p[11] + "&Looplen=" + p[12] + "&Gauge=" + p[13] + "&Outno=" + p[14] + "&Plandet=" + p[15] + "&Opdet=" + p[16] + "&Ewaybill=" + p[17] + "&Ewaydate=" + p[18] + "&Refno=" + p[19]);
    //}
    //else if (protype == 'Knitting' || protype == 'AIRTEX' || protype == 'FLAT KNITTING' || protype == 'LOOSE KNITTING'||protype == 'LOOSE KNITTING- WINDING') {

    //    window.open("../ReportInline/Process/ProcessOrder/ProcessOrderReportInline.aspx?Masid=" + Repid + "&InpDet=" + p[0] + "&Ins=" + p[1] + "&Gatepass=" + p[2] + "&Isssecqty=" + p[3] + "&Lotdet=" + p[4] + "&Ordsecqty=" + p[5] + "&Rem=" + p[6] + "&Disploc=" + p[7] + "&Rate=" + p[8] + "&Amnt=" + p[9] + "&Issloc=" + p[10] + "&Millname=" + p[11] + "&Looplen=" + p[12] + "&Gauge=" + p[13] + "&Outno=" + p[14] + "&Plandet=" + p[15] + "&Opdet=" + p[16] + "&Ewaybill=" + p[17] + "&Ewaydate=" + p[18] + "&Refno=" + p[19]);
    //}
    //else if (protype == 'Dyeing' || protype == 'BIO WASH' || protype == 'DOUBLE DYEING AND BIO WASH ') {

    //    window.open("../ReportInline/Process/ProcessOrder/ProcessOrderDyeingReport.aspx?Masid=" + Repid);
    //}
    ////else if (protype == 'Compacting') {

    ////    window.open("../ReportInline/Process/ProcessOrder/ProcessOrderDyeingReport.aspx?Masid=" + Repid);
    ////}
    //else if (protype == 'Compacting' || protype == 'HEAT_SETTING' || protype == 'WASHING' || protype == 'Printing' || protype == 'MERCERIZED' || protype == 'RE PROCESS ') {

    //    window.open("../ReportInline/Process/ProcessOrder/ProcessOrderYarnDyedReport.aspx?Masid=" + Repid + "&ProcessName=" + protype);
    //}






    //if (protype == 'O' || protype == 'Y') {

    //    //window.location.href = "../ReportInline/Process/ProcessOrder/ProcessOrderConeWindingInline.aspx?Masid=" + Repid + "&InpDet=" + p[0] + "&Ins=" + p[1] + "&Gatepass=" + p[2] + "&Isssecqty=" + p[3] + "&Lotdet=" + p[4] + "&Ordsecqty=" + p[5] + "&Rem=" + p[6] + "&Disploc=" + p[7] + "&Rate=" + p[8] + "&Amnt=" + p[9] + "&Issloc=" + p[10] + "&Millname=" + p[11] + "&Looplen=" + p[12] + "&Gauge=" + p[13] + "&Outno=" + p[14] + "&Plandet=" + p[15] + "&Opdet=" + p[16] + "&Ewaybill=" + p[17] + "&Ewaydate=" + p[18] + "&Refno=" + p[19];
    //    window.open("../ReportInline/Process/ProcessOrder/ProcessOrderConeWindingInline.aspx?Masid=" + Repid + "&InpDet=" + p[0] + "&Ins=" + p[1] + "&Gatepass=" + p[2] + "&Isssecqty=" + p[3] + "&Lotdet=" + p[4] + "&Ordsecqty=" + p[5] + "&Rem=" + p[6] + "&Disploc=" + p[7] + "&Rate=" + p[8] + "&Amnt=" + p[9] + "&Issloc=" + p[10] + "&Millname=" + p[11] + "&Looplen=" + p[12] + "&Gauge=" + p[13] + "&Outno=" + p[14] + "&Plandet=" + p[15] + "&Opdet=" + p[16] + "&Ewaybill=" + p[17] + "&Ewaydate=" + p[18] + "&Refno=" + p[19]);
    //}
    //else if (protype == 'K') {

    //    window.open("../ReportInline/Process/ProcessOrder/ProcessOrderReportInline.aspx?Masid=" + Repid + "&InpDet=" + p[0] + "&Ins=" + p[1] + "&Gatepass=" + p[2] + "&Isssecqty=" + p[3] + "&Lotdet=" + p[4] + "&Ordsecqty=" + p[5] + "&Rem=" + p[6] + "&Disploc=" + p[7] + "&Rate=" + p[8] + "&Amnt=" + p[9] + "&Issloc=" + p[10] + "&Millname=" + p[11] + "&Looplen=" + p[12] + "&Gauge=" + p[13] + "&Outno=" + p[14] + "&Plandet=" + p[15] + "&Opdet=" + p[16] + "&Ewaybill=" + p[17] + "&Ewaydate=" + p[18] + "&Refno=" + p[19]);
    //}
    //else if (protype == 'F') {

    //    window.open("../ReportInline/Process/ProcessOrder/ProcessOrderDyeingReport.aspx?Masid=" + Repid);
    //}
    //    //else if (protype == 'Compacting') {

    //    //    window.open("../ReportInline/Process/ProcessOrder/ProcessOrderDyeingReport.aspx?Masid=" + Repid);
    //    //}
    //else if (protype == 'M' || protype == 'T' || protype == 'W' || protype == 'R') {

    //    window.open("../ReportInline/Process/ProcessOrder/ProcessOrderYarnDyedReport.aspx?Masid=" + Repid + "&ProcessName=" + procname);
    //}
}

function addses() {

    $.ajax({
        url: "/PurchaseOrderMain/AddSession",
        data: JSON.stringify(),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            flpath = result;
        },
        error: function (errormessage) {
            // alert(errormessage.responseText);
        }
    });
}
function backtomain() {
    $("#myModal2").hide();
    $("#myModal2").modal('hide');
}

function CheckAlloted() {

    var Recpno = $('#txtOrderNo').val();

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

                    //alert("Process Order is alloted for " + AllotedItemList[x].CTransNo + ",Please Check it....")
                    var msg = "Process Order is alloted for " + AllotedItemList[x].CTransNo + ",Please Check it...";
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


function CheckPlanAmend(jmasid) {
    
    $.ajax({
        url: "/PlanningConsumption/LoadAmendDetails",
        data: JSON.stringify({ Stylerowid: 0, jmasid: jmasid, Workordno: '' }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var amendlist=[]
             amendlist = result;
             if (amendlist.length > 0) {
                 for (var x = 0; x < amendlist.length; x++) {
                     //alert("Planning amended for " + amendlist[x].Order_No + '-' + amendlist[x].Style + ",Please Check it....")      
                     var msg = "Planning amended for " + amendlist[x].Order_No + '-' + amendlist[x].Style + ",Please Check it...";
                     var flg = 4;
                     var mod = 1;
                     var url = "";
                     AlartMessage(msg, flg, mod, url);
                     $("#btnAdd").attr("disabled", true);
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
    var OType = $('input[name="maintype"]:checked').attr('value');
    var POType = $('input[name="proctype"]:checked').attr('value');
    $.ajax({
        url: "/ProcessOrder/GetOrderRefNo",
        data: JSON.stringify({ buyrsamp: OType, processortype: POType, fromDate: FDate, todate: TDate }),
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
    var OType = $('input[name="maintype"]:checked').attr('value');
    var POType = $('input[name="proctype"]:checked').attr('value');
    $.ajax({
        url: "/ProcessOrder/GetOrderStyle",
        data: JSON.stringify({ buyrsamp: OType, processortype: POType, fromDate: FDate, todate: TDate }),
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

function getAppbyID(ProId,App) {
    debugger;
    Masid = ProId;


    //var apptype = $('input[name="Apptype"]:checked').attr('value');
    //if (apptype == 'P') {
    //    $('#Appgridtab').show();
    //    $('#ChkAppButId').show();
    //    $('#lblAppChkId').show();
    //    $('#btnApp').show();
    //    $("#btnRev").hide();
    //} else {
    //    $('#Appgridtab').show();
    //    $('#ChkAppButId').show();
    //    $('#lblAppChkId').show();
    //    $('#btnApp').hide();
    //    $("#btnRev").show();
    //}




    //$.ajax({
    //    url: "/ProcessOrder/LoadEditInputItmgrid",
    //    data: JSON.stringify({ prodid: ProId }),
    //    type: "POST",
    //    contentType: "application/json;charset=utf-8",
    //    dataType: "json",

    //    success: function (result) {
    //        debugger;
    //        IpItmList = result.Value;
    //        if (AllowList.length > 0) {
    //            if (AllowList[0].PQuantity > 0) {
    //                var qn = AllowList[0].PQuantity;
    //                $.each(IpItmList, function () {
    //                    this.allow = parseFloat(this.bal) + parseFloat(qn);
    //                });
    //            }
    //            else if (AllowList[0].ProPercentage > 0) {
    //                var qn = AllowList[0].ProPercentage;
    //                $.each(IpItmList, function () {
    //                    var bl = (parseFloat(this.bal) * qn) / 100;
    //                    bl = bl.toFixed(3);
    //                    this.allow = (parseFloat(this.bal) + parseFloat(bl)).toFixed(3);
    //                });
    //            }
    //            else if (AllowList[0].PQuantity == 0 && AllowList[0].ProPercentage == 0) {
    //                $.each(IpItmList, function () {
    //                    this.allow = this.bal;
    //                });
    //            }
    //        }
    //        InputAppitmTab(IpItmList);

    //        Itmid = IpItmList[0].itmid;
    //        Colorid = IpItmList[0].clrid;
    //        Sizeid = IpItmList[0].sizeid;
    //    }

    //});
    ViewMode = 1;
    getbyID(ProId, App);
}

function LoadCloChkAppData() {
    $('#Appgridtab').hide();
    $('#ChkAppButId').hide();
    $('#lblAppChkId').hide();
}


function InputAppitmTab(list) {
    $('#Appgridtab').DataTable().destroy();

    $('#Appgridtab').DataTable({
        data: list,
        scrollY: 100,
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
                   { title: "Itemid", data: "itmid", "visible": false },
                   { title: "Input Item", data: "itm" },
                   { title: "Colorid", data: "clrid", "visible": false },
                   { title: "Color", data: "clr" },
                   { title: "Sizeid", data: "sizeid", "visible": false },
                   { title: "Size", data: "size" },
                   {
                       title: "Order Qty", data: "ordqty",
                       //render: function (data) {

                       //    return '<input type="text" id="txtOpRQty" class="editor-active"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                       //},
                   },
                   { title: "Prog Qty", data: "prgopqty" },
                   { title: "Balance", data: "bal" },
                    { title: "OrdQty", data: "ordqty", "visible": false },
                   {
                       title: "IssueQty", data: "issqty"
                   },
                   {
                       title: "Sec Qty", data: "SecQty"
                   },
                   {
                       title: "Apply", "visible": false,
                       render: function (data) {

                           return '<input type="checkbox" id="tab"  >';
                       }
                   },
                    //{
                    //    title: "View",// data: "jobordno",
                    //    render: function (data) {

                    //        return '<button type="button"  class="btnviewiputitem btn btn-round btn-info" style="width:25px;padding:0px;"><i class="fa fa-eye"></i></button>';
                    //    }
                    //},
        ]

    });


}


function AppUpdate() {
    debugger;

    var Obj = {
        processordid: Masid,
        CreatedBy: Guserid,

    }
    LoadingSymb();
    $.ajax({
        url: "/ProcessOrder/AppUpdate",
        data: JSON.stringify(Obj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Value == 1) {

                //alert('Data Approved Successfully');
                //window.location.href = "/ProcessOrder/ProcessOrderIndex";
                var msg = 'Data Approved Successfully...';
                var flg = 1;
                var mod = 0;
                var url = "/ProcessOrder/ProcessOrderIndex";
                AlartMessage(msg, flg, mod, url);
            }
            if (result.Value == 0) {

                window.location.href = "/Error/Index";

            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }

    });
}


function AppRevert() {
    debugger;

    var Obj = {
        processordid: Masid,
        CreatedBy: Guserid,

    }
    LoadingSymb();
    $.ajax({
        url: "/ProcessOrder/AppRevert",
        data: JSON.stringify(Obj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Value == 1) {

                //alert('Data Revert Successfully');
                //window.location.href = "/ProcessOrder/ProcessOrderIndex";
                var msg = 'Data Revert Successfully...';
                var flg = 4;
                var mod = 1;
                var url = "/ProcessOrder/ProcessOrderIndex";
                AlartMessage(msg, flg, mod, url);
            }
            if (result.Value == 0) {

                window.location.href = "/Error/Index";

            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }

    });
}

function CheckClosure(prdid, closed) {
    // var ans = confirm("Are you sure you want to Closure this Dc?");
    // if (ans) {
    var Obj = {
        processordid: prdid,
        Closed: closed,

    }
    //LoadingSymb();
    $.ajax({
        url: "/ProcessOrder/CheckClosure",
        data: JSON.stringify(Obj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Value == 1) {
                LoadCheckData();
                //alert('Data Closed Successfully');
                //window.location.href = "/ProcessOrder/ProcessOrderIndex";

            }
            if (result.Value == 0) {

                window.location.href = "/Error/Index";

            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }

    });
    //}
}

function CheckClosureRev(prdid, closed) {
    // var ans = confirm("Are you sure you want to Closure this Dc?");
    // if (ans) {
    var Obj = {
        processordid: prdid,
        Closed: closed,

    }
    //LoadingSymb();
    $.ajax({
        url: "/ProcessOrder/CheckClosure",
        data: JSON.stringify(Obj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Value == 1) {
                LoadCheckData();
                //alert('Data Revert Successfully');
                //window.location.href = "/ProcessOrder/ProcessOrderIndex";

            }
            if (result.Value == 0) {

                window.location.href = "/Error/Index";

            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }

    });
    //}
}



$(document).on('click', '.btnDisInputItemview', function () {
    debugger;



    //var table = $('#outputjodettab').DataTable();
    //var CSno = table.row($(this).parents('tr')).data()["sno"];
    //var apprate = table.row($(this).parents('tr')).data()["apprate"];

    //var pid = table.row($(this).parents('tr')).data()["sno"];
    //var itmid = table.row($(this).parents('tr')).data()["itmid"];
    //var colorid = table.row($(this).parents('tr')).data()["clrid"];
    //var sizeid = table.row($(this).parents('tr')).data()["sizeid"];
    //var balq = table.row($(this).parents('tr')).data()["allow"];
    //var psid = table.row($(this).parents('tr')).data()["plansizeid"];

    //var prodpgmno = table.row($(this).parents('tr')).data()["prodpgmno"];


    var table = $('#outputjodettab').DataTable();
    var row = $(this).closest('tr');
    var data = $('#outputjodettab').dataTable().fnGetData(row);
   // var Itemid = data.itmid;


    var opitmid = data.itmid;
    var opcolorid = data.clrid;
    var opplansizeid = data.plansizeid;
    var opitm = data.itm;
    var opcolor = data.clr;
    var opplansize = data.plansize;
    var jobno = data.jobordno;
    var ordqty = data.ordqty;
    var PgmType = data.ProgramType;
    var Prodprgmno = data.prodpgmno;




    //rowindex = $(this).closest('tr').index();

    //var currcomboinfo = OpJobDetList.slice(rowindex);
    //var currentcolorrow = OpJobDetList.slice(rowindex);

    //var opitmid = currentcolorrow[0].itmid;
    //var opcolorid = currentcolorrow[0].clrid;
    //var opplansizeid = currcomboinfo[0].plansizeid;
    //var opitm = currentcolorrow[0].itm;
    //var opcolor = currentcolorrow[0].clr;
    //var opplansize = currcomboinfo[0].plansize;
    //var jobno = currcomboinfo[0].jobordno;
    //var ordqty = currcomboinfo[0].ordqty;
    //var PgmType = currcomboinfo[0].ProgramType; 
    //var Prodprgmno = currcomboinfo[0].prodpgmno;

    var process = $('#txtProcess').val();

    if (ordqty == 0) {
        //alert("Please Enter the Adj Qty and then Click the View Button...");
        var msg = 'Please Enter the Adjust quantity and then Click the View Button...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }
    else {
        $("#myModal4").modal('show');
    }
    opItmid = opitmid;
    OpSizeid = opplansizeid;
    OpClrid = opcolorid;
    ProductionPgmNo = Prodprgmno;
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //IP JobGrid Load part//

    //////////    KNITTING PROCESS /////////

    //if (process == 'KNITTING') {


    //        /////////// Programm Type == 'P'

    //        var jobempty = [];
    //        jobempty = IpSaveJobDetList;

    //        jobempty = $.grep(jobempty, function (v) {
    //            return (v.opitmid == opitmid && v.opclrid == opcolorid && v.opsizeid == opplansizeid && v.jobordno == jobno && v.Fabric_ColorId == opcolorid && v.ProgramType == PgmType && v.prodpgmno == Prodprgmno);
    //        });
    //        if (jobempty.length > 0) {

    //            var jobempty2 = [];

    //            for (var k = 0; IpSaveJobDetList.length > k; k++) {
    //                if (opitmid == IpSaveJobDetList[k].opitmid && opplansizeid == IpSaveJobDetList[k].opsizeid && opcolorid == IpSaveJobDetList[k].opclrid && jobno == IpSaveJobDetList[k].jobordno && opcolorid == IpSaveJobDetList[k].Fabric_ColorId && Prodprgmno == IpSaveJobDetList[k].prodpgmno) {

    //                }
    //                else {
    //                    jobempty2.push(IpSaveJobDetList[k]);
    //                }
    //            }



    //            IpJobDetList = [];
    //            IpJobDetList = jobempty;
    //            //for (var k = 0; jobempty.length > k; k++) {
    //            //    var prg = 0;
    //            //    for (var j = 0; IpSaveJobDetList.length > j; j++) {
    //            //        if (jobempty[k].clrid == IpSaveJobDetList[j].clrid && jobempty[k].itmid == IpSaveJobDetList[j].itmid && jobempty[k].sizeid == IpSaveJobDetList[j].sizeid && jobempty[k].jobordno == IpSaveJobDetList[j].jobordno
    //            //            && jobempty[k].opitmid == IpSaveJobDetList[j].opitmid && jobempty[k].opsizeid == IpSaveJobDetList[j].opsizeid && jobempty[k].opclrid == IpSaveJobDetList[j].opclrid) {
    //            //            var tot = 0;
    //            //            for (var l = 0; jobempty2.length > l; l++) {
    //            //                if (jobempty2[l].clrid == IpSaveJobDetList[j].clrid && jobempty2[l].itmid == IpSaveJobDetList[j].itmid && jobempty2[l].sizeid == IpSaveJobDetList[j].sizeid && jobempty2[l].jobordno == IpSaveJobDetList[j].jobordno) {

    //            //                    var ppg = jobempty2[l].ordqty;
    //            //                    tot = tot + parseFloat(ppg);
    //            //                }
    //            //            }

    //            //            var bl = IpSaveJobDetList[j].prgopqty;
    //            //            // prg = bl - tot;
    //            //            prg = IpSaveJobDetList[j].prgopqty;
    //            //            var jobobj = {
    //            //                FabricId: jobempty[k].FabricId,
    //            //                FinDia: jobempty[k].FinDia,
    //            //                FinDiaid: jobempty[k].FinDiaid,
    //            //                FinGsm: jobempty[k].FinGsm,
    //            //                Gauge: jobempty[k].Gauge,
    //            //                Loop_Len: jobempty[k].Loop_Len,
    //            //                TaxAppVal: jobempty[k].TaxAppVal,
    //            //                TransNo: jobempty[k].TransNo,
    //            //                allow: jobempty[k].allow,
    //            //                apprate: jobempty[k].apprate,
    //            //                bal: jobempty[k].bal,
    //            //                clr: jobempty[k].clr,
    //            //                clrid: jobempty[k].clrid,
    //            //                disploc: jobempty[k].disploc,
    //            //                disptype: jobempty[k].disptype,
    //            //                inrout: jobempty[k].inrout,
    //            //                isdeci: jobempty[k].isdeci,
    //            //                issloc: jobempty[k].issloc,
    //            //                issqty: jobempty[k].issqty,
    //            //                isstype: jobempty[k].isstype,
    //            //                issues: jobempty[k].issues,
    //            //                itm: jobempty[k].itm,
    //            //                itmid: jobempty[k].itmid,
    //            //                jobordno: jobempty[k].jobordno,
    //            //                lotno: jobempty[k].lotno,
    //            //                opclr: jobempty[k].opclr,
    //            //                opclrid: jobempty[k].opclrid,
    //            //                opitm: jobempty[k].opitm,
    //            //                opitmid: jobempty[k].opitmid,
    //            //                opsize: jobempty[k].opsize,
    //            //                opsizeid: jobempty[k].opsizeid,
    //            //                orderno: jobempty[k].orderno,
    //            //                ordqty: jobempty[k].ordqty,
    //            //                plansize: jobempty[k].plansize,
    //            //                plansizeid: jobempty[k].plansizeid,
    //            //                prgdetid: jobempty[k].prgdetid,
    //            //                prgopqty: prg,
    //            //                process: jobempty[k].process,
    //            //                procissdetid: jobempty[k].procissdetid,
    //            //                procissid: jobempty[k].procissid,
    //            //                procissjobid: jobempty[k].procissjobid,
    //            //                procorddetid: jobempty[k].procorddetid,
    //            //                procordjobid: jobempty[k].procordjobid,
    //            //                prodpgmno: jobempty[k].prodpgmno,
    //            //                prodstkid: jobempty[k].prodstkid,
    //            //                rate: jobempty[k].rate,
    //            //                refno: jobempty[k].refno,
    //            //                SecQty: jobempty[k].SecQty,
    //            //                size: jobempty[k].size,
    //            //                sizeid: jobempty[k].sizeid,
    //            //                sno: jobempty[k].sno,
    //            //                stockid: jobempty[k].stockid,
    //            //                style: jobempty[k].style,
    //            //                YarnPer: jobempty[k].YarnPer,

    //            //            };

    //            //            IpJobDetList.push(jobobj);
    //            //        }
    //            //    }
    //            //}

    //            var jobemptydet = [];

    //            for (var k = 0; IpJobDetList.length > k; k++) {
    //                if (opitmid == IpJobDetList[k].FabricId && opcolorid == IpJobDetList[k].Fabric_ColorId && Prodprgmno == IpJobDetList[k].prodpgmno) {
    //                    jobemptydet.push(IpJobDetList[k]);
    //                }
    //            }

    //            InputJobdetTab(IpJobDetList);
    //        }
    //        else {
    //            var res = $.grep(IpSaveJobDetList, function (e) {
    //                return e.opitmid > 0;
    //            });
    //            if (res.length == 0) {

    //                for (var k = 0; IpSaveJobDetList.length > k; k++) {
    //                    //var sl = IpSaveJobDetList.length + 1;

    //                    var jobobj = {
    //                        FabricId: IpSaveJobDetList[k].FabricId,
    //                        FinDia: IpSaveJobDetList[k].FinDia,
    //                        FinDiaid: IpSaveJobDetList[k].FinDiaid,
    //                        FinGsm: IpSaveJobDetList[k].FinGsm,
    //                        Gauge: IpSaveJobDetList[k].Gauge,
    //                        Loop_Len: IpSaveJobDetList[k].Loop_Len,
    //                        TaxAppVal: IpSaveJobDetList[k].TaxAppVal,
    //                        TransNo: IpSaveJobDetList[k].TransNo,
    //                        allow: IpSaveJobDetList[k].allow,
    //                        apprate: IpSaveJobDetList[k].apprate,
    //                        bal: IpSaveJobDetList[k].bal,
    //                        clr: IpSaveJobDetList[k].clr,
    //                        clrid: IpSaveJobDetList[k].clrid,
    //                        disploc: IpSaveJobDetList[k].disploc,
    //                        disptype: IpSaveJobDetList[k].disptype,
    //                        inrout: IpSaveJobDetList[k].inrout,
    //                        isdeci: IpSaveJobDetList[k].isdeci,
    //                        issloc: IpSaveJobDetList[k].issloc,
    //                        issqty: IpSaveJobDetList[k].issqty,
    //                        isstype: IpSaveJobDetList[k].isstype,
    //                        issues: IpSaveJobDetList[k].issues,
    //                        itm: IpSaveJobDetList[k].itm,
    //                        itmid: IpSaveJobDetList[k].itmid,
    //                        jobordno: IpSaveJobDetList[k].jobordno,
    //                        lotno: IpSaveJobDetList[k].lotno,
    //                        opclr: IpSaveJobDetList[k].opclr,
    //                        opclrid: IpSaveJobDetList[k].opclrid,
    //                        opitm: IpSaveJobDetList[k].opitm,
    //                        opitmid: IpSaveJobDetList[k].opitmid,
    //                        opsize: IpSaveJobDetList[k].opsize,
    //                        opsizeid: IpSaveJobDetList[k].opsizeid,
    //                        orderno: IpSaveJobDetList[k].orderno,
    //                        ordqty: IpSaveJobDetList[k].ordqty,
    //                        plansize: IpSaveJobDetList[k].plansize,
    //                        plansizeid: IpSaveJobDetList[k].plansizeid,
    //                        prgdetid: IpSaveJobDetList[k].prgdetid,
    //                        prgopqty: IpSaveJobDetList[k].prgopqty,
    //                        process: IpSaveJobDetList[k].process,
    //                        procissdetid: IpSaveJobDetList[k].procissdetid,
    //                        procissid: IpSaveJobDetList[k].procissid,
    //                        procissjobid: IpSaveJobDetList[k].procissjobid,
    //                        procorddetid: IpSaveJobDetList[k].procorddetid,
    //                        procordjobid: IpSaveJobDetList[k].procordjobid,
    //                        prodpgmno: IpSaveJobDetList[k].prodpgmno,
    //                        prodstkid: IpSaveJobDetList[k].prodstkid,
    //                        rate: IpSaveJobDetList[k].rate,
    //                        refno: IpSaveJobDetList[k].refno,
    //                        SecQty: IpSaveJobDetList[k].SecQty,
    //                        size: IpSaveJobDetList[k].size,
    //                        sizeid: IpSaveJobDetList[k].sizeid,
    //                        sno: IpSaveJobDetList[k].sno,
    //                        stockid: IpSaveJobDetList[k].stockid,
    //                        style: IpSaveJobDetList[k].style,
    //                        YarnPer: IpSaveJobDetList[k].YarnPer,
    //                        Fabric_ColorId: IpSaveJobDetList[k].Fabric_ColorId,
    //                        ProgramType: IpSaveJobDetList[k].ProgramType,
    //                    };
    //                    ipjobclone.push(jobobj);
    //                }
    //                $.each(IpSaveJobDetList, function () {
    //                    if (this.FabricId == opitmid && this.Fabric_ColorId == opcolorid && this.prodpgmno == Prodprgmno) {
    //                        this.opitm = opitm;
    //                        this.opclr = opcolor;
    //                        this.opsize = opplansize;
    //                        this.opitmid = opitmid;
    //                        this.opclrid = opcolorid;
    //                        this.opsizeid = opplansizeid;
    //                        this.ProgramType = PgmType;
    //                    }
    //                });
    //                //ipjobclone = $.grep(IpSaveJobDetList, function (e) {
    //                //    return e.opitmid == opitmid && e.opclrid == opcolorid && e.opsizeid == opplansizeid;
    //                //})
    //            }
    //            else {
    //                for (var k = 0; ipjobclone.length > k; k++) {
    //                    var sl = IpSaveJobDetList.length + 1;
    //                    if (ipjobclone[k].FabricId == opitmid && ipjobclone[k].Fabric_ColorId == opcolorid && ipjobclone[k].prodpgmno == Prodprgmno) {
    //                        var jobobj = {
    //                            FabricId: ipjobclone[k].FabricId,
    //                            FinDia: ipjobclone[k].FinDia,
    //                            FinDiaid: ipjobclone[k].FinDiaid,
    //                            FinGsm: ipjobclone[k].FinGsm,
    //                            Gauge: ipjobclone[k].Gauge,
    //                            Loop_Len: ipjobclone[k].Loop_Len,
    //                            TaxAppVal: ipjobclone[k].TaxAppVal,
    //                            TransNo: ipjobclone[k].TransNo,
    //                            allow: ipjobclone[k].allow,
    //                            apprate: ipjobclone[k].apprate,
    //                            bal: ipjobclone[k].bal,
    //                            clr: ipjobclone[k].clr,
    //                            clrid: ipjobclone[k].clrid,
    //                            disploc: ipjobclone[k].disploc,
    //                            disptype: ipjobclone[k].disptype,
    //                            inrout: ipjobclone[k].inrout,
    //                            isdeci: ipjobclone[k].isdeci,
    //                            issloc: ipjobclone[k].issloc,
    //                            issqty: ipjobclone[k].issqty,
    //                            isstype: ipjobclone[k].isstype,
    //                            issues: ipjobclone[k].issues,
    //                            itm: ipjobclone[k].itm,
    //                            itmid: ipjobclone[k].itmid,
    //                            jobordno: ipjobclone[k].jobordno,
    //                            lotno: ipjobclone[k].lotno,
    //                            opclr: opcolor,
    //                            opclrid: opcolorid,
    //                            opitm: opitm,
    //                            opitmid: opitmid,
    //                            opsize: opplansize,
    //                            opsizeid: opplansizeid,
    //                            orderno: ipjobclone[k].orderno,
    //                            ordqty: 0,
    //                            plansize: ipjobclone[k].plansize,
    //                            plansizeid: ipjobclone[k].plansizeid,
    //                            prgdetid: ipjobclone[k].prgdetid,
    //                            prgopqty: ipjobclone[k].prgopqty,
    //                            process: ipjobclone[k].process,
    //                            procissdetid: ipjobclone[k].procissdetid,
    //                            procissid: ipjobclone[k].procissid,
    //                            procissjobid: ipjobclone[k].procissjobid,
    //                            procorddetid: ipjobclone[k].procorddetid,
    //                            procordjobid: ipjobclone[k].procordjobid,
    //                            prodpgmno: ipjobclone[k].prodpgmno,
    //                            prodstkid: ipjobclone[k].prodstkid,
    //                            rate: ipjobclone[k].rate,
    //                            refno: ipjobclone[k].refno,
    //                            SecQty: ipjobclone[k].SecQty,
    //                            size: ipjobclone[k].size,
    //                            sizeid: ipjobclone[k].sizeid,
    //                            sno: sl,
    //                            stockid: ipjobclone[k].stockid,
    //                            style: ipjobclone[k].style,
    //                            YarnPer: ipjobclone[k].YarnPer,
    //                            Fabric_ColorId: ipjobclone[k].Fabric_ColorId,
    //                            ProgramType: ipjobclone[k].ProgramType,
    //                        };
    //                        IpSaveJobDetList.push(jobobj);
    //                    }
    //                }
    //            }
    //            var jobempty = [];
    //            jobempty = IpSaveJobDetList;
    //            jobempty = $.grep(jobempty, function (v) {
    //                return (v.opitmid == opitmid && v.opclrid == opcolorid && v.opsizeid == opplansizeid && v.jobordno == jobno && v.Fabric_ColorId == opcolorid && v.prodpgmno == Prodprgmno);
    //            });
    //            if (jobempty.length > 0) {

    //                var jobempty2 = [];

    //                for (var k = 0; IpSaveJobDetList.length > k; k++) {
    //                    if (opitmid == IpSaveJobDetList[k].opitmid && opplansizeid == IpSaveJobDetList[k].opsizeid && opcolorid == IpSaveJobDetList[k].opclrid && jobno == IpSaveJobDetList[k].jobordno) {

    //                    }
    //                    else {
    //                        jobempty2.push(IpSaveJobDetList[k]);
    //                    }
    //                }
    //                IpJobDetList = [];
    //                IpJobDetList = jobempty;
    //                //for (var k = 0; jobempty.length > k; k++) {
    //                //    var prg = 0;
    //                //    for (var j = 0; IpSaveJobDetList.length > j; j++) {
    //                //        if (jobempty[k].clrid == IpSaveJobDetList[j].clrid && jobempty[k].itmid == IpSaveJobDetList[j].itmid && jobempty[k].sizeid == IpSaveJobDetList[j].sizeid && jobempty[k].jobordno == IpSaveJobDetList[j].jobordno
    //                //            && jobempty[k].opitmid == IpSaveJobDetList[j].opitmid && jobempty[k].opsizeid == IpSaveJobDetList[j].opsizeid && jobempty[k].opclrid == IpSaveJobDetList[j].opclrid) {
    //                //            var tot = 0;
    //                //            for (var l = 0; jobempty2.length > l; l++) {
    //                //                if (jobempty2[l].clrid == IpSaveJobDetList[j].clrid && jobempty2[l].itmid == IpSaveJobDetList[j].itmid && jobempty2[l].sizeid == IpSaveJobDetList[j].sizeid && jobempty2[l].jobordno == IpSaveJobDetList[j].jobordno) {

    //                //                    var ppg = jobempty2[l].ordqty;
    //                //                    tot = tot + parseFloat(ppg);
    //                //                }
    //                //            }

    //                //            var bl = IpSaveJobDetList[j].prgopqty;
    //                //            // prg = bl - tot;
    //                //            prg = IpSaveJobDetList[j].prgopqty;
    //                //            var jobobj = {
    //                //                FabricId: jobempty[k].FabricId,
    //                //                FinDia: jobempty[k].FinDia,
    //                //                FinDiaid: jobempty[k].FinDiaid,
    //                //                FinGsm: jobempty[k].FinGsm,
    //                //                Gauge: jobempty[k].Gauge,
    //                //                Loop_Len: jobempty[k].Loop_Len,
    //                //                TaxAppVal: jobempty[k].TaxAppVal,
    //                //                TransNo: jobempty[k].TransNo,
    //                //                allow: jobempty[k].allow,
    //                //                apprate: jobempty[k].apprate,
    //                //                bal: jobempty[k].bal,
    //                //                clr: jobempty[k].clr,
    //                //                clrid: jobempty[k].clrid,
    //                //                disploc: jobempty[k].disploc,
    //                //                disptype: jobempty[k].disptype,
    //                //                inrout: jobempty[k].inrout,
    //                //                isdeci: jobempty[k].isdeci,
    //                //                issloc: jobempty[k].issloc,
    //                //                issqty: jobempty[k].issqty,
    //                //                isstype: jobempty[k].isstype,
    //                //                issues: jobempty[k].issues,
    //                //                itm: jobempty[k].itm,
    //                //                itmid: jobempty[k].itmid,
    //                //                jobordno: jobempty[k].jobordno,
    //                //                lotno: jobempty[k].lotno,
    //                //                opclr: jobempty[k].opclr,
    //                //                opclrid: jobempty[k].opclrid,
    //                //                opitm: jobempty[k].opitm,
    //                //                opitmid: jobempty[k].opitmid,
    //                //                opsize: jobempty[k].opsize,
    //                //                opsizeid: jobempty[k].opsizeid,
    //                //                orderno: jobempty[k].orderno,
    //                //                ordqty: jobempty[k].ordqty,
    //                //                plansize: jobempty[k].plansize,
    //                //                plansizeid: jobempty[k].plansizeid,
    //                //                prgdetid: jobempty[k].prgdetid,
    //                //                prgopqty: prg,
    //                //                process: jobempty[k].process,
    //                //                procissdetid: jobempty[k].procissdetid,
    //                //                procissid: jobempty[k].procissid,
    //                //                procissjobid: jobempty[k].procissjobid,
    //                //                procorddetid: jobempty[k].procorddetid,
    //                //                procordjobid: jobempty[k].procordjobid,
    //                //                prodpgmno: jobempty[k].prodpgmno,
    //                //                prodstkid: jobempty[k].prodstkid,
    //                //                rate: jobempty[k].rate,
    //                //                refno: jobempty[k].refno,
    //                //                SecQty: jobempty[k].SecQty,
    //                //                size: jobempty[k].size,
    //                //                sizeid: jobempty[k].sizeid,
    //                //                sno: jobempty[k].sno,
    //                //                stockid: jobempty[k].stockid,
    //                //                style: jobempty[k].style,
    //                //                YarnPer: jobempty[k].YarnPer,

    //                //            };

    //                //            IpJobDetList.push(jobobj);
    //                //        }
    //                //    }
    //                //}
    //                var jobemptydet = [];

    //                for (var k = 0; IpJobDetList.length > k; k++) {
    //                    if (opitmid == IpJobDetList[k].FabricId && opcolorid == IpJobDetList[k].Fabric_ColorId && Prodprgmno == IpJobDetList[k].prodpgmno) {
    //                        jobemptydet.push(IpJobDetList[k]);
    //                    }
    //                }
    //                InputJobdetTab(IpJobDetList);
    //            }

    //        }
       
    
    //}

////////////--Knitting end -- ////////

  //  else{

    var jobempty = [];
    jobempty = IpSaveJobDetList;

    jobempty = $.grep(jobempty, function (v) {
        return (v.opitmid == opitmid && v.opclrid == opcolorid && v.opsizeid == opplansizeid && v.jobordno == jobno && v.prodpgmno == ProductionPgmNo);
    });
    if (jobempty.length > 0) {

        var jobempty2 = [];

        for (var k = 0; IpSaveJobDetList.length > k; k++) {
            if (opitmid == IpSaveJobDetList[k].opitmid && opplansizeid == IpSaveJobDetList[k].opsizeid && opcolorid == IpSaveJobDetList[k].opclrid && jobno == IpSaveJobDetList[k].jobordno && ProductionPgmNo == IpSaveJobDetList[k].prodpgmno) {

            }
            else {
                jobempty2.push(IpSaveJobDetList[k]);
            }
        }



        IpJobDetList = [];
        IpJobDetList = jobempty;
        //for (var k = 0; jobempty.length > k; k++) {
        //    var prg = 0;
        //    for (var j = 0; IpSaveJobDetList.length > j; j++) {
        //        if (jobempty[k].clrid == IpSaveJobDetList[j].clrid && jobempty[k].itmid == IpSaveJobDetList[j].itmid && jobempty[k].sizeid == IpSaveJobDetList[j].sizeid && jobempty[k].jobordno == IpSaveJobDetList[j].jobordno
        //            && jobempty[k].opitmid == IpSaveJobDetList[j].opitmid && jobempty[k].opsizeid == IpSaveJobDetList[j].opsizeid && jobempty[k].opclrid == IpSaveJobDetList[j].opclrid) {
        //            var tot = 0;
        //            for (var l = 0; jobempty2.length > l; l++) {
        //                if (jobempty2[l].clrid == IpSaveJobDetList[j].clrid && jobempty2[l].itmid == IpSaveJobDetList[j].itmid && jobempty2[l].sizeid == IpSaveJobDetList[j].sizeid && jobempty2[l].jobordno == IpSaveJobDetList[j].jobordno) {

        //                    var ppg = jobempty2[l].ordqty;
        //                    tot = tot + parseFloat(ppg);
        //                }
        //            }

        //            var bl = IpSaveJobDetList[j].prgopqty;
        //            // prg = bl - tot;
        //            prg = IpSaveJobDetList[j].prgopqty;
        //            var jobobj = {
        //                FabricId: jobempty[k].FabricId,
        //                FinDia: jobempty[k].FinDia,
        //                FinDiaid: jobempty[k].FinDiaid,
        //                FinGsm: jobempty[k].FinGsm,
        //                Gauge: jobempty[k].Gauge,
        //                Loop_Len: jobempty[k].Loop_Len,
        //                TaxAppVal: jobempty[k].TaxAppVal,
        //                TransNo: jobempty[k].TransNo,
        //                allow: jobempty[k].allow,
        //                apprate: jobempty[k].apprate,
        //                bal: jobempty[k].bal,
        //                clr: jobempty[k].clr,
        //                clrid: jobempty[k].clrid,
        //                disploc: jobempty[k].disploc,
        //                disptype: jobempty[k].disptype,
        //                inrout: jobempty[k].inrout,
        //                isdeci: jobempty[k].isdeci,
        //                issloc: jobempty[k].issloc,
        //                issqty: jobempty[k].issqty,
        //                isstype: jobempty[k].isstype,
        //                issues: jobempty[k].issues,
        //                itm: jobempty[k].itm,
        //                itmid: jobempty[k].itmid,
        //                jobordno: jobempty[k].jobordno,
        //                lotno: jobempty[k].lotno,
        //                opclr: jobempty[k].opclr,
        //                opclrid: jobempty[k].opclrid,
        //                opitm: jobempty[k].opitm,
        //                opitmid: jobempty[k].opitmid,
        //                opsize: jobempty[k].opsize,
        //                opsizeid: jobempty[k].opsizeid,
        //                orderno: jobempty[k].orderno,
        //                ordqty: jobempty[k].ordqty,
        //                plansize: jobempty[k].plansize,
        //                plansizeid: jobempty[k].plansizeid,
        //                prgdetid: jobempty[k].prgdetid,
        //                prgopqty: prg,
        //                process: jobempty[k].process,
        //                procissdetid: jobempty[k].procissdetid,
        //                procissid: jobempty[k].procissid,
        //                procissjobid: jobempty[k].procissjobid,
        //                procorddetid: jobempty[k].procorddetid,
        //                procordjobid: jobempty[k].procordjobid,
        //                prodpgmno: jobempty[k].prodpgmno,
        //                prodstkid: jobempty[k].prodstkid,
        //                rate: jobempty[k].rate,
        //                refno: jobempty[k].refno,
        //                SecQty: jobempty[k].SecQty,
        //                size: jobempty[k].size,
        //                sizeid: jobempty[k].sizeid,
        //                sno: jobempty[k].sno,
        //                stockid: jobempty[k].stockid,
        //                style: jobempty[k].style,
        //                YarnPer: jobempty[k].YarnPer,

        //            };

        //            IpJobDetList.push(jobobj);
        //        }
        //    }
        //}

        var jobemptydet = [];

        for (var k = 0; IpJobDetList.length > k; k++) {
            if (opitmid == IpJobDetList[k].FabricId) {
                jobemptydet.push(IpJobDetList[k]);
            }
        }

        InputJobdetTab(IpJobDetList);
    }
    else {
        var res = $.grep(IpSaveJobDetList, function (e) {
            return e.opitmid > 0;
        });
        if (res.length == 0) {
            ipjobclone = [];
            for (var k = 0; IpSaveJobDetList.length > k; k++) {
                //var sl = IpSaveJobDetList.length + 1;

                var jobobj = {
                    FabricId: IpSaveJobDetList[k].FabricId,
                    FinDia: IpSaveJobDetList[k].FinDia,
                    FinDiaid: IpSaveJobDetList[k].FinDiaid,
                    FinGsm: IpSaveJobDetList[k].FinGsm,
                    Gauge: IpSaveJobDetList[k].Gauge,
                    Loop_Len: IpSaveJobDetList[k].Loop_Len,
                    TaxAppVal: IpSaveJobDetList[k].TaxAppVal,
                    TransNo: IpSaveJobDetList[k].TransNo,
                    allow: IpSaveJobDetList[k].allow,
                    apprate: IpSaveJobDetList[k].apprate,
                    bal: IpSaveJobDetList[k].bal,
                    clr: IpSaveJobDetList[k].clr,
                    clrid: IpSaveJobDetList[k].clrid,
                    disploc: IpSaveJobDetList[k].disploc,
                    disptype: IpSaveJobDetList[k].disptype,
                    inrout: IpSaveJobDetList[k].inrout,
                    isdeci: IpSaveJobDetList[k].isdeci,
                    issloc: IpSaveJobDetList[k].issloc,
                    issqty: IpSaveJobDetList[k].issqty,
                    isstype: IpSaveJobDetList[k].isstype,
                    issues: IpSaveJobDetList[k].issues,
                    itm: IpSaveJobDetList[k].itm,
                    itmid: IpSaveJobDetList[k].itmid,
                    jobordno: IpSaveJobDetList[k].jobordno,
                    lotno: IpSaveJobDetList[k].lotno,
                    opclr: IpSaveJobDetList[k].opclr,
                    opclrid: IpSaveJobDetList[k].opclrid,
                    opitm: IpSaveJobDetList[k].opitm,
                    opitmid: IpSaveJobDetList[k].opitmid,
                    opsize: IpSaveJobDetList[k].opsize,
                    opsizeid: IpSaveJobDetList[k].opsizeid,
                    orderno: IpSaveJobDetList[k].orderno,
                    ordqty: IpSaveJobDetList[k].ordqty,
                    plansize: IpSaveJobDetList[k].plansize,
                    plansizeid: IpSaveJobDetList[k].plansizeid,
                    prgdetid: IpSaveJobDetList[k].prgdetid,
                    prgopqty: IpSaveJobDetList[k].prgopqty,
                    process: IpSaveJobDetList[k].process,
                    procissdetid: IpSaveJobDetList[k].procissdetid,
                    procissid: IpSaveJobDetList[k].procissid,
                    procissjobid: IpSaveJobDetList[k].procissjobid,
                    procorddetid: IpSaveJobDetList[k].procorddetid,
                    procordjobid: IpSaveJobDetList[k].procordjobid,
                    prodpgmno: IpSaveJobDetList[k].prodpgmno,
                    prodstkid: IpSaveJobDetList[k].prodstkid,
                    rate: IpSaveJobDetList[k].rate,
                    refno: IpSaveJobDetList[k].refno,
                    SecQty: IpSaveJobDetList[k].SecQty,
                    size: IpSaveJobDetList[k].size,
                    sizeid: IpSaveJobDetList[k].sizeid,
                    sno: IpSaveJobDetList[k].sno,
                    stockid: IpSaveJobDetList[k].stockid,
                    style: IpSaveJobDetList[k].style,
                    YarnPer: IpSaveJobDetList[k].YarnPer,
                    Fabric_ColorId: IpSaveJobDetList[k].Fabric_ColorId,
                };
                ipjobclone.push(jobobj);
            }

            var cnt = 0;

            if (cnt ==0){
                $.each(IpSaveJobDetList, function () {

                    if (this.FabricId == opitmid && this.Fabric_ColorId == opcolorid && this.plansizeid == opplansizeid && this.prodpgmno == Prodprgmno) {
                        this.opitm = opitm;
                        this.opclr = opcolor;
                        this.opsize = opplansize;
                        this.opitmid = opitmid;
                        this.opclrid = opcolorid;
                        this.opsizeid = opplansizeid;
                        cnt++;
                    }
                });
            }


            if (cnt ==0){
                $.each(IpSaveJobDetList, function () {

            if (this.FabricId == opitmid && this.Fabric_ColorId == opcolorid && this.prodpgmno == Prodprgmno) {
                this.opitm = opitm;
                this.opclr = opcolor;
                this.opsize = opplansize;
                this.opitmid = opitmid;
                this.opclrid = opcolorid;
                this.opsizeid = opplansizeid;
                cnt++;
            }  
                });
            }

            if (cnt == 0) {
                $.each(IpSaveJobDetList, function () {

                    if (this.FabricId == opitmid && this.plansizeid == opplansizeid && this.prodpgmno == Prodprgmno) {
                        this.opitm = opitm;
                        this.opclr = opcolor;
                        this.opsize = opplansize;
                        this.opitmid = opitmid;
                        this.opclrid = opcolorid;
                        this.opsizeid = opplansizeid;
                        cnt++;
                    }
                });
            }

            if (cnt ==0){
                $.each(IpSaveJobDetList, function () { 
             if (this.FabricId == opitmid && this.prodpgmno == Prodprgmno) {
                this.opitm = opitm;
                this.opclr = opcolor;
                this.opsize = opplansize;
                this.opitmid = opitmid;
                this.opclrid = opcolorid;
                this.opsizeid = opplansizeid;
                cnt++;
             }
                });
            }

            if (cnt == 0) {
                $.each(IpSaveJobDetList, function () {

                    if ( this.Fabric_ColorId == opcolorid && this.plansizeid == opplansizeid && this.prodpgmno == Prodprgmno) {
                        this.opitm = opitm;
                        this.opclr = opcolor;
                        this.opsize = opplansize;
                        this.opitmid = opitmid;
                        this.opclrid = opcolorid;
                        this.opsizeid = opplansizeid;
                        cnt++;
                    }
                });
            }

            if (cnt ==0){
                $.each(IpSaveJobDetList, function () { 
            if(this.prodpgmno == Prodprgmno) {
                this.opitm = opitm;
                this.opclr = opcolor;
                this.opsize = opplansize;
                this.opitmid = opitmid;
                this.opclrid = opcolorid;
                this.opsizeid = opplansizeid;
                cnt++;
            }

                });
            }


           // });
            //ipjobclone = $.grep(IpSaveJobDetList, function (e) {
            //    return e.opitmid == opitmid && e.opclrid == opcolorid && e.opsizeid == opplansizeid;
            //})
        }
        else {

            var cnt = 0;

            if (cnt == 0) {
                for (var k = 0; ipjobclone.length > k; k++) {
                    var sl = IpSaveJobDetList.length + 1;

                    if (ipjobclone[k].FabricId == opitmid && ipjobclone[k].Fabric_ColorId == opcolorid && ipjobclone[k].plansizeid == opplansizeid && ipjobclone[k].prodpgmno == Prodprgmno) {
                        var jobobj = {
                            FabricId: ipjobclone[k].FabricId,
                            FinDia: ipjobclone[k].FinDia,
                            FinDiaid: ipjobclone[k].FinDiaid,
                            FinGsm: ipjobclone[k].FinGsm,
                            Gauge: ipjobclone[k].Gauge,
                            Loop_Len: ipjobclone[k].Loop_Len,
                            TaxAppVal: ipjobclone[k].TaxAppVal,
                            TransNo: ipjobclone[k].TransNo,
                            allow: ipjobclone[k].allow,
                            apprate: ipjobclone[k].apprate,
                            bal: ipjobclone[k].bal,
                            clr: ipjobclone[k].clr,
                            clrid: ipjobclone[k].clrid,
                            disploc: ipjobclone[k].disploc,
                            disptype: ipjobclone[k].disptype,
                            inrout: ipjobclone[k].inrout,
                            isdeci: ipjobclone[k].isdeci,
                            issloc: ipjobclone[k].issloc,
                            issqty: ipjobclone[k].issqty,
                            isstype: ipjobclone[k].isstype,
                            issues: ipjobclone[k].issues,
                            itm: ipjobclone[k].itm,
                            itmid: ipjobclone[k].itmid,
                            jobordno: ipjobclone[k].jobordno,
                            lotno: ipjobclone[k].lotno,
                            opclr: opcolor,
                            opclrid: opcolorid,
                            opitm: opitm,
                            opitmid: opitmid,
                            opsize: opplansize,
                            opsizeid: opplansizeid,
                            orderno: ipjobclone[k].orderno,
                            ordqty: 0,
                            plansize: ipjobclone[k].plansize,
                            plansizeid: ipjobclone[k].plansizeid,
                            prgdetid: ipjobclone[k].prgdetid,
                            prgopqty: ipjobclone[k].prgopqty,
                            process: ipjobclone[k].process,
                            procissdetid: ipjobclone[k].procissdetid,
                            procissid: ipjobclone[k].procissid,
                            procissjobid: ipjobclone[k].procissjobid,
                            procorddetid: ipjobclone[k].procorddetid,
                            procordjobid: ipjobclone[k].procordjobid,
                            prodpgmno: ipjobclone[k].prodpgmno,
                            prodstkid: ipjobclone[k].prodstkid,
                            rate: ipjobclone[k].rate,
                            refno: ipjobclone[k].refno,
                            SecQty: ipjobclone[k].SecQty,
                            size: ipjobclone[k].size,
                            sizeid: ipjobclone[k].sizeid,
                            sno: sl,
                            stockid: ipjobclone[k].stockid,
                            style: ipjobclone[k].style,
                            YarnPer: ipjobclone[k].YarnPer,
                        };
                        IpSaveJobDetList.push(jobobj);
                        cnt++;
                    }

                }

            }

            if (cnt == 0) {
                for (var k = 0; ipjobclone.length > k; k++) {
                    var sl = IpSaveJobDetList.length + 1;

                    if (ipjobclone[k].FabricId == opitmid && ipjobclone[k].Fabric_ColorId == opcolorid && ipjobclone[k].prodpgmno == Prodprgmno) {
                        var jobobj = {
                            FabricId: ipjobclone[k].FabricId,
                            FinDia: ipjobclone[k].FinDia,
                            FinDiaid: ipjobclone[k].FinDiaid,
                            FinGsm: ipjobclone[k].FinGsm,
                            Gauge: ipjobclone[k].Gauge,
                            Loop_Len: ipjobclone[k].Loop_Len,
                            TaxAppVal: ipjobclone[k].TaxAppVal,
                            TransNo: ipjobclone[k].TransNo,
                            allow: ipjobclone[k].allow,
                            apprate: ipjobclone[k].apprate,
                            bal: ipjobclone[k].bal,
                            clr: ipjobclone[k].clr,
                            clrid: ipjobclone[k].clrid,
                            disploc: ipjobclone[k].disploc,
                            disptype: ipjobclone[k].disptype,
                            inrout: ipjobclone[k].inrout,
                            isdeci: ipjobclone[k].isdeci,
                            issloc: ipjobclone[k].issloc,
                            issqty: ipjobclone[k].issqty,
                            isstype: ipjobclone[k].isstype,
                            issues: ipjobclone[k].issues,
                            itm: ipjobclone[k].itm,
                            itmid: ipjobclone[k].itmid,
                            jobordno: ipjobclone[k].jobordno,
                            lotno: ipjobclone[k].lotno,
                            opclr: opcolor,
                            opclrid: opcolorid,
                            opitm: opitm,
                            opitmid: opitmid,
                            opsize: opplansize,
                            opsizeid: opplansizeid,
                            orderno: ipjobclone[k].orderno,
                            ordqty: 0,
                            plansize: ipjobclone[k].plansize,
                            plansizeid: ipjobclone[k].plansizeid,
                            prgdetid: ipjobclone[k].prgdetid,
                            prgopqty: ipjobclone[k].prgopqty,
                            process: ipjobclone[k].process,
                            procissdetid: ipjobclone[k].procissdetid,
                            procissid: ipjobclone[k].procissid,
                            procissjobid: ipjobclone[k].procissjobid,
                            procorddetid: ipjobclone[k].procorddetid,
                            procordjobid: ipjobclone[k].procordjobid,
                            prodpgmno: ipjobclone[k].prodpgmno,
                            prodstkid: ipjobclone[k].prodstkid,
                            rate: ipjobclone[k].rate,
                            refno: ipjobclone[k].refno,
                            SecQty: ipjobclone[k].SecQty,
                            size: ipjobclone[k].size,
                            sizeid: ipjobclone[k].sizeid,
                            sno: sl,
                            stockid: ipjobclone[k].stockid,
                            style: ipjobclone[k].style,
                            YarnPer: ipjobclone[k].YarnPer,
                        };
                        IpSaveJobDetList.push(jobobj);
                        cnt++;
                    }

                }

            }

            if (cnt == 0) {
                for (var k = 0; ipjobclone.length > k; k++) {
                    var sl = IpSaveJobDetList.length + 1;

                    if (ipjobclone[k].FabricId == opitmid && ipjobclone[k].plansizeid == opplansizeid && ipjobclone[k].prodpgmno == Prodprgmno) {
                        var jobobj = {
                            FabricId: ipjobclone[k].FabricId,
                            FinDia: ipjobclone[k].FinDia,
                            FinDiaid: ipjobclone[k].FinDiaid,
                            FinGsm: ipjobclone[k].FinGsm,
                            Gauge: ipjobclone[k].Gauge,
                            Loop_Len: ipjobclone[k].Loop_Len,
                            TaxAppVal: ipjobclone[k].TaxAppVal,
                            TransNo: ipjobclone[k].TransNo,
                            allow: ipjobclone[k].allow,
                            apprate: ipjobclone[k].apprate,
                            bal: ipjobclone[k].bal,
                            clr: ipjobclone[k].clr,
                            clrid: ipjobclone[k].clrid,
                            disploc: ipjobclone[k].disploc,
                            disptype: ipjobclone[k].disptype,
                            inrout: ipjobclone[k].inrout,
                            isdeci: ipjobclone[k].isdeci,
                            issloc: ipjobclone[k].issloc,
                            issqty: ipjobclone[k].issqty,
                            isstype: ipjobclone[k].isstype,
                            issues: ipjobclone[k].issues,
                            itm: ipjobclone[k].itm,
                            itmid: ipjobclone[k].itmid,
                            jobordno: ipjobclone[k].jobordno,
                            lotno: ipjobclone[k].lotno,
                            opclr: opcolor,
                            opclrid: opcolorid,
                            opitm: opitm,
                            opitmid: opitmid,
                            opsize: opplansize,
                            opsizeid: opplansizeid,
                            orderno: ipjobclone[k].orderno,
                            ordqty: 0,
                            plansize: ipjobclone[k].plansize,
                            plansizeid: ipjobclone[k].plansizeid,
                            prgdetid: ipjobclone[k].prgdetid,
                            prgopqty: ipjobclone[k].prgopqty,
                            process: ipjobclone[k].process,
                            procissdetid: ipjobclone[k].procissdetid,
                            procissid: ipjobclone[k].procissid,
                            procissjobid: ipjobclone[k].procissjobid,
                            procorddetid: ipjobclone[k].procorddetid,
                            procordjobid: ipjobclone[k].procordjobid,
                            prodpgmno: ipjobclone[k].prodpgmno,
                            prodstkid: ipjobclone[k].prodstkid,
                            rate: ipjobclone[k].rate,
                            refno: ipjobclone[k].refno,
                            SecQty: ipjobclone[k].SecQty,
                            size: ipjobclone[k].size,
                            sizeid: ipjobclone[k].sizeid,
                            sno: sl,
                            stockid: ipjobclone[k].stockid,
                            style: ipjobclone[k].style,
                            YarnPer: ipjobclone[k].YarnPer,
                        };
                        IpSaveJobDetList.push(jobobj);
                        cnt++;
                    }

                }

            }


            if (cnt == 0) {
                for (var k = 0; ipjobclone.length > k; k++) {
                    var sl = IpSaveJobDetList.length + 1;

                    if (ipjobclone[k].FabricId == opitmid && ipjobclone[k].prodpgmno == Prodprgmno) {
                        var jobobj = {
                            FabricId: ipjobclone[k].FabricId,
                            FinDia: ipjobclone[k].FinDia,
                            FinDiaid: ipjobclone[k].FinDiaid,
                            FinGsm: ipjobclone[k].FinGsm,
                            Gauge: ipjobclone[k].Gauge,
                            Loop_Len: ipjobclone[k].Loop_Len,
                            TaxAppVal: ipjobclone[k].TaxAppVal,
                            TransNo: ipjobclone[k].TransNo,
                            allow: ipjobclone[k].allow,
                            apprate: ipjobclone[k].apprate,
                            bal: ipjobclone[k].bal,
                            clr: ipjobclone[k].clr,
                            clrid: ipjobclone[k].clrid,
                            disploc: ipjobclone[k].disploc,
                            disptype: ipjobclone[k].disptype,
                            inrout: ipjobclone[k].inrout,
                            isdeci: ipjobclone[k].isdeci,
                            issloc: ipjobclone[k].issloc,
                            issqty: ipjobclone[k].issqty,
                            isstype: ipjobclone[k].isstype,
                            issues: ipjobclone[k].issues,
                            itm: ipjobclone[k].itm,
                            itmid: ipjobclone[k].itmid,
                            jobordno: ipjobclone[k].jobordno,
                            lotno: ipjobclone[k].lotno,
                            opclr: opcolor,
                            opclrid: opcolorid,
                            opitm: opitm,
                            opitmid: opitmid,
                            opsize: opplansize,
                            opsizeid: opplansizeid,
                            orderno: ipjobclone[k].orderno,
                            ordqty: 0,
                            plansize: ipjobclone[k].plansize,
                            plansizeid: ipjobclone[k].plansizeid,
                            prgdetid: ipjobclone[k].prgdetid,
                            prgopqty: ipjobclone[k].prgopqty,
                            process: ipjobclone[k].process,
                            procissdetid: ipjobclone[k].procissdetid,
                            procissid: ipjobclone[k].procissid,
                            procissjobid: ipjobclone[k].procissjobid,
                            procorddetid: ipjobclone[k].procorddetid,
                            procordjobid: ipjobclone[k].procordjobid,
                            prodpgmno: ipjobclone[k].prodpgmno,
                            prodstkid: ipjobclone[k].prodstkid,
                            rate: ipjobclone[k].rate,
                            refno: ipjobclone[k].refno,
                            SecQty: ipjobclone[k].SecQty,
                            size: ipjobclone[k].size,
                            sizeid: ipjobclone[k].sizeid,
                            sno: sl,
                            stockid: ipjobclone[k].stockid,
                            style: ipjobclone[k].style,
                            YarnPer: ipjobclone[k].YarnPer,
                        };
                        IpSaveJobDetList.push(jobobj);
                        cnt++;
                    }

                }

            }


            if (cnt == 0) {
                for (var k = 0; ipjobclone.length > k; k++) {
                    var sl = IpSaveJobDetList.length + 1;

                    if ( ipjobclone[k].Fabric_ColorId == opcolorid && ipjobclone[k].plansizeid == opplansizeid && ipjobclone[k].prodpgmno == Prodprgmno) {
                        var jobobj = {
                            FabricId: ipjobclone[k].FabricId,
                            FinDia: ipjobclone[k].FinDia,
                            FinDiaid: ipjobclone[k].FinDiaid,
                            FinGsm: ipjobclone[k].FinGsm,
                            Gauge: ipjobclone[k].Gauge,
                            Loop_Len: ipjobclone[k].Loop_Len,
                            TaxAppVal: ipjobclone[k].TaxAppVal,
                            TransNo: ipjobclone[k].TransNo,
                            allow: ipjobclone[k].allow,
                            apprate: ipjobclone[k].apprate,
                            bal: ipjobclone[k].bal,
                            clr: ipjobclone[k].clr,
                            clrid: ipjobclone[k].clrid,
                            disploc: ipjobclone[k].disploc,
                            disptype: ipjobclone[k].disptype,
                            inrout: ipjobclone[k].inrout,
                            isdeci: ipjobclone[k].isdeci,
                            issloc: ipjobclone[k].issloc,
                            issqty: ipjobclone[k].issqty,
                            isstype: ipjobclone[k].isstype,
                            issues: ipjobclone[k].issues,
                            itm: ipjobclone[k].itm,
                            itmid: ipjobclone[k].itmid,
                            jobordno: ipjobclone[k].jobordno,
                            lotno: ipjobclone[k].lotno,
                            opclr: opcolor,
                            opclrid: opcolorid,
                            opitm: opitm,
                            opitmid: opitmid,
                            opsize: opplansize,
                            opsizeid: opplansizeid,
                            orderno: ipjobclone[k].orderno,
                            ordqty: 0,
                            plansize: ipjobclone[k].plansize,
                            plansizeid: ipjobclone[k].plansizeid,
                            prgdetid: ipjobclone[k].prgdetid,
                            prgopqty: ipjobclone[k].prgopqty,
                            process: ipjobclone[k].process,
                            procissdetid: ipjobclone[k].procissdetid,
                            procissid: ipjobclone[k].procissid,
                            procissjobid: ipjobclone[k].procissjobid,
                            procorddetid: ipjobclone[k].procorddetid,
                            procordjobid: ipjobclone[k].procordjobid,
                            prodpgmno: ipjobclone[k].prodpgmno,
                            prodstkid: ipjobclone[k].prodstkid,
                            rate: ipjobclone[k].rate,
                            refno: ipjobclone[k].refno,
                            SecQty: ipjobclone[k].SecQty,
                            size: ipjobclone[k].size,
                            sizeid: ipjobclone[k].sizeid,
                            sno: sl,
                            stockid: ipjobclone[k].stockid,
                            style: ipjobclone[k].style,
                            YarnPer: ipjobclone[k].YarnPer,
                        };
                        IpSaveJobDetList.push(jobobj);
                        cnt++;
                    }

                }

            }


            if (cnt == 0) {
                for (var k = 0; ipjobclone.length > k; k++) {
                    var sl = IpSaveJobDetList.length + 1;

                    if ( ipjobclone[k].prodpgmno == Prodprgmno) {
                        var jobobj = {
                            FabricId: ipjobclone[k].FabricId,
                            FinDia: ipjobclone[k].FinDia,
                            FinDiaid: ipjobclone[k].FinDiaid,
                            FinGsm: ipjobclone[k].FinGsm,
                            Gauge: ipjobclone[k].Gauge,
                            Loop_Len: ipjobclone[k].Loop_Len,
                            TaxAppVal: ipjobclone[k].TaxAppVal,
                            TransNo: ipjobclone[k].TransNo,
                            allow: ipjobclone[k].allow,
                            apprate: ipjobclone[k].apprate,
                            bal: ipjobclone[k].bal,
                            clr: ipjobclone[k].clr,
                            clrid: ipjobclone[k].clrid,
                            disploc: ipjobclone[k].disploc,
                            disptype: ipjobclone[k].disptype,
                            inrout: ipjobclone[k].inrout,
                            isdeci: ipjobclone[k].isdeci,
                            issloc: ipjobclone[k].issloc,
                            issqty: ipjobclone[k].issqty,
                            isstype: ipjobclone[k].isstype,
                            issues: ipjobclone[k].issues,
                            itm: ipjobclone[k].itm,
                            itmid: ipjobclone[k].itmid,
                            jobordno: ipjobclone[k].jobordno,
                            lotno: ipjobclone[k].lotno,
                            opclr: opcolor,
                            opclrid: opcolorid,
                            opitm: opitm,
                            opitmid: opitmid,
                            opsize: opplansize,
                            opsizeid: opplansizeid,
                            orderno: ipjobclone[k].orderno,
                            ordqty: 0,
                            plansize: ipjobclone[k].plansize,
                            plansizeid: ipjobclone[k].plansizeid,
                            prgdetid: ipjobclone[k].prgdetid,
                            prgopqty: ipjobclone[k].prgopqty,
                            process: ipjobclone[k].process,
                            procissdetid: ipjobclone[k].procissdetid,
                            procissid: ipjobclone[k].procissid,
                            procissjobid: ipjobclone[k].procissjobid,
                            procorddetid: ipjobclone[k].procorddetid,
                            procordjobid: ipjobclone[k].procordjobid,
                            prodpgmno: ipjobclone[k].prodpgmno,
                            prodstkid: ipjobclone[k].prodstkid,
                            rate: ipjobclone[k].rate,
                            refno: ipjobclone[k].refno,
                            SecQty: ipjobclone[k].SecQty,
                            size: ipjobclone[k].size,
                            sizeid: ipjobclone[k].sizeid,
                            sno: sl,
                            stockid: ipjobclone[k].stockid,
                            style: ipjobclone[k].style,
                            YarnPer: ipjobclone[k].YarnPer,
                        };
                        IpSaveJobDetList.push(jobobj);
                        cnt++;
                    }

                }

            }


        }
        var jobempty = [];
        jobempty = IpSaveJobDetList;
        jobempty = $.grep(jobempty, function (v) {
            return (v.opitmid == opitmid && v.opclrid == opcolorid && v.opsizeid == opplansizeid && v.jobordno == jobno && v.prodpgmno == ProductionPgmNo);
        });
        if (jobempty.length > 0) {

            var jobempty2 = [];

            for (var k = 0; IpSaveJobDetList.length > k; k++) {
                if (opitmid == IpSaveJobDetList[k].opitmid && opplansizeid == IpSaveJobDetList[k].opsizeid && opcolorid == IpSaveJobDetList[k].opclrid && jobno == IpSaveJobDetList[k].jobordno && ProductionPgmNo == IpSaveJobDetList[k].prodpgmno) {

                }
                else {
                    jobempty2.push(IpSaveJobDetList[k]);
                }
            }
            IpJobDetList = [];
            IpJobDetList = jobempty;
            //for (var k = 0; jobempty.length > k; k++) {
            //    var prg = 0;
            //    for (var j = 0; IpSaveJobDetList.length > j; j++) {
            //        if (jobempty[k].clrid == IpSaveJobDetList[j].clrid && jobempty[k].itmid == IpSaveJobDetList[j].itmid && jobempty[k].sizeid == IpSaveJobDetList[j].sizeid && jobempty[k].jobordno == IpSaveJobDetList[j].jobordno
            //            && jobempty[k].opitmid == IpSaveJobDetList[j].opitmid && jobempty[k].opsizeid == IpSaveJobDetList[j].opsizeid && jobempty[k].opclrid == IpSaveJobDetList[j].opclrid) {
            //            var tot = 0;
            //            for (var l = 0; jobempty2.length > l; l++) {
            //                if (jobempty2[l].clrid == IpSaveJobDetList[j].clrid && jobempty2[l].itmid == IpSaveJobDetList[j].itmid && jobempty2[l].sizeid == IpSaveJobDetList[j].sizeid && jobempty2[l].jobordno == IpSaveJobDetList[j].jobordno) {

            //                    var ppg = jobempty2[l].ordqty;
            //                    tot = tot + parseFloat(ppg);
            //                }
            //            }

            //            var bl = IpSaveJobDetList[j].prgopqty;
            //            // prg = bl - tot;
            //            prg = IpSaveJobDetList[j].prgopqty;
            //            var jobobj = {
            //                FabricId: jobempty[k].FabricId,
            //                FinDia: jobempty[k].FinDia,
            //                FinDiaid: jobempty[k].FinDiaid,
            //                FinGsm: jobempty[k].FinGsm,
            //                Gauge: jobempty[k].Gauge,
            //                Loop_Len: jobempty[k].Loop_Len,
            //                TaxAppVal: jobempty[k].TaxAppVal,
            //                TransNo: jobempty[k].TransNo,
            //                allow: jobempty[k].allow,
            //                apprate: jobempty[k].apprate,
            //                bal: jobempty[k].bal,
            //                clr: jobempty[k].clr,
            //                clrid: jobempty[k].clrid,
            //                disploc: jobempty[k].disploc,
            //                disptype: jobempty[k].disptype,
            //                inrout: jobempty[k].inrout,
            //                isdeci: jobempty[k].isdeci,
            //                issloc: jobempty[k].issloc,
            //                issqty: jobempty[k].issqty,
            //                isstype: jobempty[k].isstype,
            //                issues: jobempty[k].issues,
            //                itm: jobempty[k].itm,
            //                itmid: jobempty[k].itmid,
            //                jobordno: jobempty[k].jobordno,
            //                lotno: jobempty[k].lotno,
            //                opclr: jobempty[k].opclr,
            //                opclrid: jobempty[k].opclrid,
            //                opitm: jobempty[k].opitm,
            //                opitmid: jobempty[k].opitmid,
            //                opsize: jobempty[k].opsize,
            //                opsizeid: jobempty[k].opsizeid,
            //                orderno: jobempty[k].orderno,
            //                ordqty: jobempty[k].ordqty,
            //                plansize: jobempty[k].plansize,
            //                plansizeid: jobempty[k].plansizeid,
            //                prgdetid: jobempty[k].prgdetid,
            //                prgopqty: prg,
            //                process: jobempty[k].process,
            //                procissdetid: jobempty[k].procissdetid,
            //                procissid: jobempty[k].procissid,
            //                procissjobid: jobempty[k].procissjobid,
            //                procorddetid: jobempty[k].procorddetid,
            //                procordjobid: jobempty[k].procordjobid,
            //                prodpgmno: jobempty[k].prodpgmno,
            //                prodstkid: jobempty[k].prodstkid,
            //                rate: jobempty[k].rate,
            //                refno: jobempty[k].refno,
            //                SecQty: jobempty[k].SecQty,
            //                size: jobempty[k].size,
            //                sizeid: jobempty[k].sizeid,
            //                sno: jobempty[k].sno,
            //                stockid: jobempty[k].stockid,
            //                style: jobempty[k].style,
            //                YarnPer: jobempty[k].YarnPer,

            //            };

            //            IpJobDetList.push(jobobj);
            //        }
            //    }
            //}
            var jobemptydet = [];

            for (var k = 0; IpJobDetList.length > k; k++) {
                if (opitmid == IpJobDetList[k].FabricId) {
                    jobemptydet.push(IpJobDetList[k]);
                }
            }
            InputJobdetTab(IpJobDetList);
        }

    }




//}





    //end
    ///////////////////////////////////////////////////////////////////////////////////////////////////



    ///////////////////////////////////////////////////////////////////////////////////////////////////
    //StockGrid load part

    var jobempty = [];
    jobempty = IpSaveStkDetList;

    jobempty = $.grep(jobempty, function (v) {
        return (v.opitmid == opitmid && v.opclrid == opcolorid && v.opsizeid == opplansizeid && v.jobordno == jobno && v.prodpgmno == ProductionPgmNo);
    });
    if (jobempty.length > 0) {

        var jobempty2 = [];

        for (var k = 0; IpSaveStkDetList.length > k; k++) {
            if (opitmid == IpSaveStkDetList[k].opitmid && opplansizeid == IpSaveStkDetList[k].opsizeid && opcolorid == IpSaveStkDetList[k].opclrid && jobno == IpSaveStkDetList[k].jobordno && ProductionPgmNo == IpSaveStkDetList[k].prodpgmno) {

            }
            else {
                jobempty2.push(IpSaveStkDetList[k]);
            }
        }



        IpStkDetList = [];
       // IpStkDetList = jobempty;

        for (var k = 0; jobempty.length > k; k++) {
            var prg = 0;
            for (var j = 0; IpSaveStkDetList.length > j; j++) {
                if (jobempty[k].clrid == IpSaveStkDetList[j].clrid && jobempty[k].itmid == IpSaveStkDetList[j].itmid && jobempty[k].sizeid == IpSaveStkDetList[j].sizeid && jobempty[k].jobordno == IpSaveStkDetList[j].jobordno && jobempty[k].stockid == IpSaveStkDetList[j].stockid
                    && jobempty[k].opitmid == IpSaveStkDetList[j].opitmid && jobempty[k].opsizeid == IpSaveStkDetList[j].opsizeid && jobempty[k].opclrid == IpSaveStkDetList[j].opclrid && jobempty[k].prodpgmno == IpSaveStkDetList[j].prodpgmno) {
                    var tot = 0;
                    for (var l = 0; jobempty2.length > l; l++) {
                        if (jobempty2[l].clrid == IpSaveStkDetList[j].clrid && jobempty2[l].itmid == IpSaveStkDetList[j].itmid && jobempty2[l].sizeid == IpSaveStkDetList[j].sizeid && jobempty2[l].jobordno == IpSaveStkDetList[j].jobordno && jobempty2[l].stockid == IpSaveStkDetList[j].stockid) {

                            var ppg = jobempty2[l].issues;
                            tot = tot + parseFloat(ppg);
                        }
                    }

                    var bl = IpSaveStkDetList[j].bal;
                    prg = bl - tot;
                    var jobobj = {

                        FinDia: jobempty[k].FinDia,
                        FinDiaid: jobempty[k].FinDiaid,
                        FinGsm: jobempty[k].FinGsm,
                        Gauge: jobempty[k].Gauge,
                        Loop_Len: jobempty[k].Loop_Len,
                        TaxAppVal: jobempty[k].TaxAppVal,
                        TransNo: jobempty[k].TransNo,
                        allow: jobempty[k].allow,
                        apprate: jobempty[k].apprate,
                        bal: prg,
                        clr: jobempty[k].clr,
                        clrid: jobempty[k].clrid,
                        disploc: jobempty[k].disploc,
                        disptype: jobempty[k].disptype,
                        inrout: jobempty[k].inrout,
                        isdeci: jobempty[k].isdeci,
                        issloc: jobempty[k].issloc,
                        issqty: jobempty[k].issqty,
                        isstype: jobempty[k].isstype,
                        issues: jobempty[k].issues,
                        itm: jobempty[k].itm,
                        itmid: jobempty[k].itmid,
                        jobordno: jobempty[k].jobordno,
                        lotno: jobempty[k].lotno,
                        opclr: jobempty[k].opclr,
                        opclrid: jobempty[k].opclrid,
                        opitm: jobempty[k].opitm,
                        opitmid: jobempty[k].opitmid,
                        opsize: jobempty[k].opsize,
                        opsizeid: jobempty[k].opsizeid,
                        orderno: jobempty[k].orderno,
                        ordqty: jobempty[k].ordqty,
                        plansize: jobempty[k].plansize,
                        plansizeid: jobempty[k].plansizeid,
                        prgdetid: jobempty[k].prgdetid,
                        prgopqty: jobempty[k].prgopqty,
                        process: jobempty[k].process,
                        procissdetid: jobempty[k].procissdetid,
                        procissid: jobempty[k].procissid,
                        procissjobid: jobempty[k].procissjobid,
                        procorddetid: jobempty[k].procorddetid,
                        procordjobid: jobempty[k].procordjobid,
                        prodpgmno: jobempty[k].prodpgmno,
                        prodstkid: jobempty[k].prodstkid,
                        rate: jobempty[k].rate,
                        refno: jobempty[k].refno,
                        secqty: jobempty[k].secqty,
                        size: jobempty[k].size,
                        sizeid: jobempty[k].sizeid,
                        sno: jobempty[k].sno,
                        stockid: jobempty[k].stockid,
                        style: jobempty[k].style,
                        supplier: jobempty[k].supplier,
                        ProcessIssStockId: jobempty[k].ProcessIssStockId,
                    };

                    IpStkDetList.push(jobobj);
                }
            }
        }
        InputStkdetTab(IpStkDetList);
    }
    else {
        var res = $.grep(IpSaveStkDetList, function (e) {
            return e.opitmid > 0;
        });
        if (res.length == 0) {
            ipstkclone = [];
            for (var k = 0; IpSaveStkDetList.length > k; k++) {
                //var sl = IpSaveJobDetList.length + 1;

                var jobobj = {

                    FinDia: IpSaveStkDetList[k].FinDia,
                    FinDiaid: IpSaveStkDetList[k].FinDiaid,
                    FinGsm: IpSaveStkDetList[k].FinGsm,
                    Gauge: IpSaveStkDetList[k].Gauge,
                    Loop_Len: IpSaveStkDetList[k].Loop_Len,
                    TaxAppVal: IpSaveStkDetList[k].TaxAppVal,
                    TransNo: IpSaveStkDetList[k].TransNo,
                    allow: IpSaveStkDetList[k].allow,
                    apprate: IpSaveStkDetList[k].apprate,
                    bal: IpSaveStkDetList[k].bal,
                    clr: IpSaveStkDetList[k].clr,
                    clrid: IpSaveStkDetList[k].clrid,
                    disploc: IpSaveStkDetList[k].disploc,
                    disptype: IpSaveStkDetList[k].disptype,
                    inrout: IpSaveStkDetList[k].inrout,
                    isdeci: IpSaveStkDetList[k].isdeci,
                    issloc: IpSaveStkDetList[k].issloc,
                    issqty: IpSaveStkDetList[k].issqty,
                    isstype: IpSaveStkDetList[k].isstype,
                    issues: IpSaveStkDetList[k].issues,
                    itm: IpSaveStkDetList[k].itm,
                    itmid: IpSaveStkDetList[k].itmid,
                    jobordno: IpSaveStkDetList[k].jobordno,
                    lotno: IpSaveStkDetList[k].lotno,
                    opclr: IpSaveStkDetList[k].opclr,
                    opclrid: IpSaveStkDetList[k].opclrid,
                    opitm: IpSaveStkDetList[k].opitm,
                    opitmid: IpSaveStkDetList[k].opitmid,
                    opsize: IpSaveStkDetList[k].opsize,
                    opsizeid: IpSaveStkDetList[k].opsizeid,
                    orderno: IpSaveStkDetList[k].orderno,
                    ordqty: IpSaveStkDetList[k].ordqty,
                    plansize: IpSaveStkDetList[k].plansize,
                    plansizeid: IpSaveStkDetList[k].plansizeid,
                    prgdetid: IpSaveStkDetList[k].prgdetid,
                    prgopqty: IpSaveStkDetList[k].prgopqty,
                    process: IpSaveStkDetList[k].process,
                    procissdetid: IpSaveStkDetList[k].procissdetid,
                    procissid: IpSaveStkDetList[k].procissid,
                    procissjobid: IpSaveStkDetList[k].procissjobid,
                    procorddetid: IpSaveStkDetList[k].procorddetid,
                    procordjobid: IpSaveStkDetList[k].procordjobid,
                    prodpgmno: IpSaveStkDetList[k].prodpgmno,
                    prodstkid: IpSaveStkDetList[k].prodstkid,
                    rate: IpSaveStkDetList[k].rate,
                    refno: IpSaveStkDetList[k].refno,
                    secqty: IpSaveStkDetList[k].secqty,
                    size: IpSaveStkDetList[k].size,
                    sizeid: IpSaveStkDetList[k].sizeid,
                    sno: IpSaveStkDetList[k].sno,
                    stockid: IpSaveStkDetList[k].stockid,
                    style: IpSaveStkDetList[k].style,
                    supplier: IpSaveStkDetList[k].supplier,
                    ProcessIssStockId:IpSaveStkDetList[k].ProcessIssStockId,
                };
                ipstkclone.push(jobobj);
            }

            $.each(IpSaveStkDetList, function () {
                for (var k = 0; IpJobDetList.length > k; k++) {
                    if (this.itmid == IpJobDetList[k].itmid && this.clrid == IpJobDetList[k].clrid && this.sizeid == IpJobDetList[k].sizeid) {
                        this.opitm = opitm;
                        this.opclr = opcolor;
                        this.opsize = opplansize;
                        this.opitmid = opitmid;
                        this.opclrid = opcolorid;
                        this.opsizeid = opplansizeid;
                        this.prodpgmno = ProductionPgmNo;
                    }
                }
            });
            //ipstkclone = $.grep(IpSaveStkDetList, function (e) {
            //    return e.opitmid == opitmid && e.opclrid == opcolorid && e.opsizeid == opplansizeid && e.jobordno == jobno;
            //})
        }
        else {
            for (var k = 0; ipstkclone.length > k; k++) {
                var sl = IpSaveStkDetList.length + 1;
                for (var l = 0; IpJobDetList.length > l; l++) {
                    if (ipstkclone[k].itmid == IpJobDetList[l].itmid && ipstkclone[k].clrid == IpJobDetList[l].clrid && ipstkclone[k].sizeid == IpJobDetList[l].sizeid) {
                        var jobobj = {

                            FinDia: ipstkclone[k].FinDia,
                            FinDiaid: ipstkclone[k].FinDiaid,
                            FinGsm: ipstkclone[k].FinGsm,
                            Gauge: ipstkclone[k].Gauge,
                            Loop_Len: ipstkclone[k].Loop_Len,
                            TaxAppVal: ipstkclone[k].TaxAppVal,
                            TransNo: ipstkclone[k].TransNo,
                            allow: ipstkclone[k].allow,
                            apprate: ipstkclone[k].apprate,
                            bal: ipstkclone[k].bal,
                            clr: ipstkclone[k].clr,
                            clrid: ipstkclone[k].clrid,
                            disploc: ipstkclone[k].disploc,
                            disptype: ipstkclone[k].disptype,
                            inrout: ipstkclone[k].inrout,
                            isdeci: ipstkclone[k].isdeci,
                            issloc: ipstkclone[k].issloc,
                            issqty: ipstkclone[k].issqty,
                            isstype: ipstkclone[k].isstype,
                            issues: 0,
                            itm: ipstkclone[k].itm,
                            itmid: ipstkclone[k].itmid,
                            jobordno: ipstkclone[k].jobordno,
                            lotno: ipstkclone[k].lotno,
                            opclr: opcolor,
                            opclrid: opcolorid,
                            opitm: opitm,
                            opitmid: opitmid,
                            opsize: opplansize,
                            opsizeid: opplansizeid,
                            orderno: ipstkclone[k].orderno,
                            ordqty: ipstkclone[k].ordqty,
                            plansize: ipstkclone[k].plansize,
                            plansizeid: ipstkclone[k].plansizeid,
                            prgdetid: ipstkclone[k].prgdetid,
                            prgopqty: ipstkclone[k].prgopqty,
                            process: ipstkclone[k].process,
                            procissdetid: ipstkclone[k].procissdetid,
                            procissid: ipstkclone[k].procissid,
                            procissjobid: ipstkclone[k].procissjobid,
                            procorddetid: ipstkclone[k].procorddetid,
                            procordjobid: ipstkclone[k].procordjobid,
                            prodpgmno: ProductionPgmNo,//ipstkclone[k].prodpgmno,
                            prodstkid: ipstkclone[k].prodstkid,
                            rate: ipstkclone[k].rate,
                            refno: ipstkclone[k].refno,
                            secqty: ipstkclone[k].secqty,
                            size: ipstkclone[k].size,
                            sizeid: ipstkclone[k].sizeid,
                            sno: sl,
                            stockid: ipstkclone[k].stockid,
                            style: ipstkclone[k].style,
                            supplier: ipstkclone[k].supplier,
                            ProcessIssStockId: ipstkclone[k].ProcessIssStockId,
                        };
                        IpSaveStkDetList.push(jobobj);
                    }
                }
            }
        }
        var jobempty = [];
        jobempty = IpSaveStkDetList;
        jobempty = $.grep(jobempty, function (v) {
            return (v.opitmid == opitmid && v.opclrid == opcolorid && v.opsizeid == opplansizeid && v.jobordno == jobno && v.prodpgmno == ProductionPgmNo);
        });
        if (jobempty.length > 0) {

            var jobempty2 = [];

            for (var k = 0; IpSaveStkDetList.length > k; k++) {
                if (opitmid == IpSaveStkDetList[k].opitmid && opplansizeid == IpSaveStkDetList[k].opsizeid && opcolorid == IpSaveStkDetList[k].opclrid && jobno == IpSaveStkDetList[k].jobordno && ProductionPgmNo == IpSaveStkDetList[k].prodpgmno) {

                }
                else {
                    jobempty2.push(IpSaveStkDetList[k]);
                }
            }
            IpStkDetList = [];
           // IpStkDetList = jobempty;

            for (var k = 0; jobempty.length > k; k++) {
                var prg = 0;
                for (var j = 0; IpSaveStkDetList.length > j; j++) {
                    if (jobempty[k].clrid == IpSaveStkDetList[j].clrid && jobempty[k].itmid == IpSaveStkDetList[j].itmid && jobempty[k].sizeid == IpSaveStkDetList[j].sizeid && jobempty[k].jobordno == IpSaveStkDetList[j].jobordno && jobempty[k].stockid == IpSaveStkDetList[j].stockid
                        && jobempty[k].opitmid == IpSaveStkDetList[j].opitmid && jobempty[k].opsizeid == IpSaveStkDetList[j].opsizeid && jobempty[k].opclrid == IpSaveStkDetList[j].opclrid && jobempty[k].prodpgmno == IpSaveStkDetList[j].prodpgmno) {
                        var tot = 0;
                        for (var l = 0; jobempty2.length > l; l++) {
                            if (jobempty2[l].clrid == IpSaveStkDetList[j].clrid && jobempty2[l].itmid == IpSaveStkDetList[j].itmid && jobempty2[l].sizeid == IpSaveStkDetList[j].sizeid && jobempty2[l].jobordno == IpSaveStkDetList[j].jobordno && jobempty2[l].stockid == IpSaveStkDetList[j].stockid) {

                                var ppg = jobempty2[l].issues;
                                tot = tot + parseFloat(ppg);
                            }
                        }

                        var bl = IpSaveStkDetList[j].bal;
                        prg = bl - tot;
                        var jobobj = {

                            FinDia: jobempty[k].FinDia,
                            FinDiaid: jobempty[k].FinDiaid,
                            FinGsm: jobempty[k].FinGsm,
                            Gauge: jobempty[k].Gauge,
                            Loop_Len: jobempty[k].Loop_Len,
                            TaxAppVal: jobempty[k].TaxAppVal,
                            TransNo: jobempty[k].TransNo,
                            allow: jobempty[k].allow,
                            apprate: jobempty[k].apprate,
                            bal: prg,
                            clr: jobempty[k].clr,
                            clrid: jobempty[k].clrid,
                            disploc: jobempty[k].disploc,
                            disptype: jobempty[k].disptype,
                            inrout: jobempty[k].inrout,
                            isdeci: jobempty[k].isdeci,
                            issloc: jobempty[k].issloc,
                            issqty: jobempty[k].issqty,
                            isstype: jobempty[k].isstype,
                            issues: jobempty[k].issues,
                            itm: jobempty[k].itm,
                            itmid: jobempty[k].itmid,
                            jobordno: jobempty[k].jobordno,
                            lotno: jobempty[k].lotno,
                            opclr: jobempty[k].opclr,
                            opclrid: jobempty[k].opclrid,
                            opitm: jobempty[k].opitm,
                            opitmid: jobempty[k].opitmid,
                            opsize: jobempty[k].opsize,
                            opsizeid: jobempty[k].opsizeid,
                            orderno: jobempty[k].orderno,
                            ordqty: jobempty[k].ordqty,
                            plansize: jobempty[k].plansize,
                            plansizeid: jobempty[k].plansizeid,
                            prgdetid: jobempty[k].prgdetid,
                            prgopqty: jobempty[k].prgopqty,
                            process: jobempty[k].process,
                            procissdetid: jobempty[k].procissdetid,
                            procissid: jobempty[k].procissid,
                            procissjobid: jobempty[k].procissjobid,
                            procorddetid: jobempty[k].procorddetid,
                            procordjobid: jobempty[k].procordjobid,
                            prodpgmno: jobempty[k].prodpgmno,
                            prodstkid: jobempty[k].prodstkid,
                            rate: jobempty[k].rate,
                            refno: jobempty[k].refno,
                            secqty: jobempty[k].secqty,
                            size: jobempty[k].size,
                            sizeid: jobempty[k].sizeid,
                            sno: jobempty[k].sno,
                            stockid: jobempty[k].stockid,
                            style: jobempty[k].style,
                            supplier: jobempty[k].supplier,
                            ProcessIssStockId: jobempty[k].ProcessIssStockId,

                        };

                        IpStkDetList.push(jobobj);
                    }
                }
            }
            InputStkdetTab(IpStkDetList);
        }

    }

    //end

    ////////////////////////////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////////////////////////////

    //IP ItemGrid load part

    var jobempty = [];
    jobempty = IpItmList;

    jobempty = $.grep(jobempty, function (v) {
        return (v.opitmid == opitmid && v.opclrid == opcolorid && v.opsizeid == opplansizeid);
    });
    if (jobempty.length > 0) {

        var jobempty2 = [];

        for (var k = 0; IpItmList.length > k; k++) {
            if (opitmid == IpItmList[k].opitmid && opplansizeid == IpItmList[k].opsizeid && opcolorid == IpItmList[k].opclrid) {

            }
            else {
                jobempty2.push(IpItmList[k]);
            }
        }



        IpItmDetList = [];
        for (var k = 0; jobempty.length > k; k++) {
            var prg = 0;
            for (var j = 0; IpItmList.length > j; j++) {
                if (jobempty[k].clrid == IpItmList[j].clrid && jobempty[k].itmid == IpItmList[j].itmid && jobempty[k].sizeid == IpItmList[j].sizeid
                    && jobempty[k].opitmid == IpItmList[j].opitmid && jobempty[k].opsizeid == IpItmList[j].opsizeid && jobempty[k].opclrid == IpItmList[j].opclrid) {
                    var tot = 0;
                    for (var l = 0; jobempty2.length > l; l++) {
                        if (jobempty2[l].clrid == IpItmList[j].clrid && jobempty2[l].itmid == IpItmList[j].itmid && jobempty2[l].sizeid == IpItmList[j].sizeid) {

                            var ppg = jobempty2[l].issqty;
                            tot = tot + parseFloat(ppg);
                        }
                    }

                    var bl = IpItmList[j].bal;
                    prg = bl - tot;
                    var jobobj = {

                        FinDia: jobempty[k].FinDia,
                        FinDiaid: jobempty[k].FinDiaid,
                        FinGsm: jobempty[k].FinGsm,
                        Gauge: jobempty[k].Gauge,
                        Loop_Len: jobempty[k].Loop_Len,
                        TaxAppVal: jobempty[k].TaxAppVal,
                        TransNo: jobempty[k].TransNo,
                        allow: jobempty[k].allow,
                        apprate: jobempty[k].apprate,
                        bal: prg,
                        clr: jobempty[k].clr,
                        clrid: jobempty[k].clrid,
                        disploc: jobempty[k].disploc,
                        disptype: jobempty[k].disptype,
                        inrout: jobempty[k].inrout,
                        isdeci: jobempty[k].isdeci,
                        issloc: jobempty[k].issloc,
                        issqty: jobempty[k].issqty,
                        isstype: jobempty[k].isstype,
                        issues: jobempty[k].issues,
                        itm: jobempty[k].itm,
                        itmid: jobempty[k].itmid,
                        jobordno: jobempty[k].jobordno,
                        lotno: jobempty[k].lotno,
                        opclr: jobempty[k].opclr,
                        opclrid: jobempty[k].opclrid,
                        opitm: jobempty[k].opitm,
                        opitmid: jobempty[k].opitmid,
                        opsize: jobempty[k].opsize,
                        opsizeid: jobempty[k].opsizeid,
                        orderno: jobempty[k].orderno,
                        ordqty: jobempty[k].ordqty,
                        plansize: jobempty[k].plansize,
                        plansizeid: jobempty[k].plansizeid,
                        prgdetid: jobempty[k].prgdetid,
                        prgopqty: jobempty[k].prgopqty,
                        process: jobempty[k].process,
                        procissdetid: jobempty[k].procissdetid,
                        procissid: jobempty[k].procissid,
                        procissjobid: jobempty[k].procissjobid,
                        procorddetid: jobempty[k].procorddetid,
                        procordjobid: jobempty[k].procordjobid,
                        prodpgmno: jobempty[k].prodpgmno,
                        prodstkid: jobempty[k].prodstkid,
                        rate: jobempty[k].rate,
                        refno: jobempty[k].refno,
                        secqty: jobempty[k].secqty,
                        size: jobempty[k].size,
                        sizeid: jobempty[k].sizeid,
                        sno: jobempty[k].sno,
                        stockid: jobempty[k].stockid,
                        style: jobempty[k].style,

                    };

                    IpItmDetList.push(jobobj);
                }
            }
        }
        InputitmTab(IpItmDetList);
    }
    else {
        var res = $.grep(IpItmList, function (e) {
            return e.opitmid > 0;
        });
        if (res.length == 0) {

            for (var k = 0; IpItmList.length > k; k++) {
                //var sl = IpSaveJobDetList.length + 1;

                var jobobj = {

                    FinDia: IpItmList[k].FinDia,
                    FinDiaid: IpItmList[k].FinDiaid,
                    FinGsm: IpItmList[k].FinGsm,
                    Gauge: IpItmList[k].Gauge,
                    Loop_Len: IpItmList[k].Loop_Len,
                    TaxAppVal: IpItmList[k].TaxAppVal,
                    TransNo: IpItmList[k].TransNo,
                    allow: IpItmList[k].allow,
                    apprate: IpItmList[k].apprate,
                    bal: IpItmList[k].bal,
                    clr: IpItmList[k].clr,
                    clrid: IpItmList[k].clrid,
                    disploc: IpItmList[k].disploc,
                    disptype: IpItmList[k].disptype,
                    inrout: IpItmList[k].inrout,
                    isdeci: IpItmList[k].isdeci,
                    issloc: IpItmList[k].issloc,
                    issqty: IpItmList[k].issqty,
                    isstype: IpItmList[k].isstype,
                    issues: IpItmList[k].issues,
                    itm: IpItmList[k].itm,
                    itmid: IpItmList[k].itmid,
                    jobordno: IpItmList[k].jobordno,
                    lotno: IpItmList[k].lotno,
                    opclr: IpItmList[k].opclr,
                    opclrid: IpItmList[k].opclrid,
                    opitm: IpItmList[k].opitm,
                    opitmid: IpItmList[k].opitmid,
                    opsize: IpItmList[k].opsize,
                    opsizeid: IpItmList[k].opsizeid,
                    orderno: IpItmList[k].orderno,
                    ordqty: IpItmList[k].ordqty,
                    plansize: IpItmList[k].plansize,
                    plansizeid: IpItmList[k].plansizeid,
                    prgdetid: IpItmList[k].prgdetid,
                    prgopqty: IpItmList[k].prgopqty,
                    process: IpItmList[k].process,
                    procissdetid: IpItmList[k].procissdetid,
                    procissid: IpItmList[k].procissid,
                    procissjobid: IpItmList[k].procissjobid,
                    procorddetid: IpItmList[k].procorddetid,
                    procordjobid: IpItmList[k].procordjobid,
                    prodpgmno: IpItmList[k].prodpgmno,
                    prodstkid: IpItmList[k].prodstkid,
                    rate: IpItmList[k].rate,
                    refno: IpItmList[k].refno,
                    secqty: IpItmList[k].secqty,
                    size: IpItmList[k].size,
                    sizeid: IpItmList[k].sizeid,
                    sno: IpItmList[k].sno,
                    stockid: IpItmList[k].stockid,
                    style: IpItmList[k].style,
                };
                ipitemclone.push(jobobj);
            }


            $.each(IpItmList, function () {
                //if (this.CPlanSlNo == sno) {
                this.opitm = opitm;
                this.opclr = opcolor;
                this.opsize = opplansize;
                this.opitmid = opitmid;
                this.opclrid = opcolorid;
                this.opsizeid = opplansizeid;
                this.jobordno = jobno;
                //}
            });
            //IpItmDetList = $.grep(IpItmList, function (e) {
            //    return e.opitmid == opitmid && e.opclrid == opcolorid && e.opsizeid == opplansizeid ;
            //})
        }
        else {
            for (var k = 0; ipitemclone.length > k; k++) {
                var sl = IpItmList.length + 1;

                var jobobj = {
                    FinDia: ipitemclone[k].FinDia,
                    FinDiaid: ipitemclone[k].FinDiaid,
                    FinGsm: ipitemclone[k].FinGsm,
                    Gauge: ipitemclone[k].Gauge,
                    Loop_Len: ipitemclone[k].Loop_Len,
                    TaxAppVal: ipitemclone[k].TaxAppVal,
                    TransNo: ipitemclone[k].TransNo,
                    allow: ipitemclone[k].allow,
                    apprate: ipitemclone[k].apprate,
                    bal: ipitemclone[k].bal,
                    clr: ipitemclone[k].clr,
                    clrid: ipitemclone[k].clrid,
                    disploc: ipitemclone[k].disploc,
                    disptype: ipitemclone[k].disptype,
                    inrout: ipitemclone[k].inrout,
                    isdeci: ipitemclone[k].isdeci,
                    issloc: ipitemclone[k].issloc,
                    issqty: 0,
                    isstype: ipitemclone[k].isstype,
                    issues: ipitemclone[k].issues,
                    itm: ipitemclone[k].itm,
                    itmid: ipitemclone[k].itmid,
                    jobordno: jobno,
                    lotno: ipitemclone[k].lotno,
                    opclr: opcolor,
                    opclrid: opcolorid,
                    opitm: opitm,
                    opitmid: opitmid,
                    opsize: opplansize,
                    opsizeid: opplansizeid,
                    orderno: ipitemclone[k].orderno,
                    ordqty: 0,
                    plansize: ipitemclone[k].plansize,
                    plansizeid: ipitemclone[k].plansizeid,
                    prgdetid: ipitemclone[k].prgdetid,
                    prgopqty: ipitemclone[k].prgopqty,
                    process: ipitemclone[k].process,
                    procissdetid: ipitemclone[k].procissdetid,
                    procissid: ipitemclone[k].procissid,
                    procissjobid: ipitemclone[k].procissjobid,
                    procorddetid: ipitemclone[k].procorddetid,
                    procordjobid: ipitemclone[k].procordjobid,
                    prodpgmno: ipitemclone[k].prodpgmno,
                    prodstkid: ipitemclone[k].prodstkid,
                    rate: ipitemclone[k].rate,
                    refno: ipitemclone[k].refno,
                    secqty: ipitemclone[k].secqty,
                    size: ipitemclone[k].size,
                    sizeid: ipitemclone[k].sizeid,
                    sno: sl,
                    stockid: ipitemclone[k].stockid,
                    style: ipitemclone[k].style,
                };
                IpItmList.push(jobobj);
            }
        }
        var jobempty = [];
        jobempty = IpItmList;
        jobempty = $.grep(jobempty, function (v) {
            return (v.opitmid == opitmid && v.opclrid == opcolorid && v.opsizeid == opplansizeid);
        });
        if (jobempty.length > 0) {

            var jobempty2 = [];

            for (var k = 0; IpItmList.length > k; k++) {
                if (opitmid == IpItmList[k].opitmid && opplansizeid == IpItmList[k].opsizeid && opcolorid == IpItmList[k].opclrid) {

                }
                else {
                    jobempty2.push(IpItmList[k]);
                }
            }
            IpItmDetList = [];
            for (var k = 0; jobempty.length > k; k++) {
                var prg = 0;
                for (var j = 0; IpItmList.length > j; j++) {
                    if (jobempty[k].clrid == IpItmList[j].clrid && jobempty[k].itmid == IpItmList[j].itmid && jobempty[k].sizeid == IpItmList[j].sizeid
                        && jobempty[k].opitmid == IpItmList[j].opitmid && jobempty[k].opsizeid == IpItmList[j].opsizeid && jobempty[k].opclrid == IpItmList[j].opclrid) {
                        var tot = 0;
                        for (var l = 0; jobempty2.length > l; l++) {
                            if (jobempty2[l].clrid == IpItmList[j].clrid && jobempty2[l].itmid == IpItmList[j].itmid && jobempty2[l].sizeid == IpItmList[j].sizeid) {

                                var ppg = jobempty2[l].issqty;
                                tot = tot + parseFloat(ppg);
                            }
                        }

                        var bl = IpItmList[j].bal;
                        prg = bl - tot;
                        var jobobj = {

                            FinDia: jobempty[k].FinDia,
                            FinDiaid: jobempty[k].FinDiaid,
                            FinGsm: jobempty[k].FinGsm,
                            Gauge: jobempty[k].Gauge,
                            Loop_Len: jobempty[k].Loop_Len,
                            TaxAppVal: jobempty[k].TaxAppVal,
                            TransNo: jobempty[k].TransNo,
                            allow: jobempty[k].allow,
                            apprate: jobempty[k].apprate,
                            bal: prg,
                            clr: jobempty[k].clr,
                            clrid: jobempty[k].clrid,
                            disploc: jobempty[k].disploc,
                            disptype: jobempty[k].disptype,
                            inrout: jobempty[k].inrout,
                            isdeci: jobempty[k].isdeci,
                            issloc: jobempty[k].issloc,
                            issqty: jobempty[k].issqty,
                            isstype: jobempty[k].isstype,
                            issues: jobempty[k].issues,
                            itm: jobempty[k].itm,
                            itmid: jobempty[k].itmid,
                            jobordno: jobempty[k].jobordno,
                            lotno: jobempty[k].lotno,
                            opclr: jobempty[k].opclr,
                            opclrid: jobempty[k].opclrid,
                            opitm: jobempty[k].opitm,
                            opitmid: jobempty[k].opitmid,
                            opsize: jobempty[k].opsize,
                            opsizeid: jobempty[k].opsizeid,
                            orderno: jobempty[k].orderno,
                            ordqty: jobempty[k].ordqty,
                            plansize: jobempty[k].plansize,
                            plansizeid: jobempty[k].plansizeid,
                            prgdetid: jobempty[k].prgdetid,
                            prgopqty: jobempty[k].prgopqty,
                            process: jobempty[k].process,
                            procissdetid: jobempty[k].procissdetid,
                            procissid: jobempty[k].procissid,
                            procissjobid: jobempty[k].procissjobid,
                            procorddetid: jobempty[k].procorddetid,
                            procordjobid: jobempty[k].procordjobid,
                            prodpgmno: jobempty[k].prodpgmno,
                            prodstkid: jobempty[k].prodstkid,
                            rate: jobempty[k].rate,
                            refno: jobempty[k].refno,
                            secqty: jobempty[k].secqty,
                            size: jobempty[k].size,
                            sizeid: jobempty[k].sizeid,
                            sno: jobempty[k].sno,
                            stockid: jobempty[k].stockid,
                            style: jobempty[k].style,

                        };

                        IpItmDetList.push(jobobj);
                    }
                }
            }
            InputitmTab(IpItmDetList);
        }

    }

    //end
    ////////////////////////////////////////////////////////////////////////////////////////////////////




});


function InputClose() {
    $("#myModal4").modal('hide');
    CalcTotalQty();
}

function MainModClose() {
        window.location.href = "/ProcessOrder/ProcessOrderIndex";
}

$(document).ready(function () {

    $(document).on('change', '#opsizelist', function () {
        debugger;
        var val = $(this).val();

        var table = $('#outputjodettab').DataTable();
        var row = $(this).closest('tr');
        var data = $('#outputjodettab').dataTable().fnGetData(row);
        var Itemid = data.itmid;
        var Clrid = data.clrid;
        var szid = data.sizeid;
        var pszid = data.plansizeid;
        var prgno = data.prodpgmno;
        var jno = data.jobordno;

        var fs = '';
        for (var x = 0; x < SizeL.length; x++) {
            if (SizeL[x].SizeId == val) {
                fs = SizeL[x].Size;
                oldind = x;
            }
        }
        $.each(OpItmList, function () {
            if (this.itmid == Itemid && this.clrid == Clrid && this.sizeid == szid && this.plansizeid == pszid && this.prodpgmno == prgno && this.jobordno == jno) {
                this.sizeid = val;
                this.size = fs;
            }
        });
        OutputitmTab(OpItmList);

        $.each(OpSaveJobDetList, function () {
            if (this.itmid == Itemid && this.clrid == Clrid && this.plansizeid == pszid && this.prodpgmno == prgno && this.jobordno == jno) {
                this.sizeid = val;
                this.size = fs;
            }
        });
        //OpJobDetList = $.grep(OpSaveJobDetList, function (v) {
        //    return (v.itmid === Itemid && v.clrid === Clrid && v.plansizeid === pszid);
        //});

       // OutputJobdetTab(OpJobDetList);

    });


    $(document).on('change', '#ipsizelist', function () {
        debugger;
        var val = $(this).val();
        //var ipsize = $(this).text();
        var ipsize = $("#ipsizelist option:selected").text()
        var table = $('#inputjodettab').DataTable();
        var row = $(this).closest('tr');
        var data = $('#inputjodettab').dataTable().fnGetData(row);
        var Itemid = data.itmid;
        var Clrid = data.clrid;
        var szid = data.sizeid;
        var pszid = data.plansizeid;



        var opItemid = data.opitmid;
        var opClrid = data.opclrid;
        var opszid = data.opsizeid;

        var jmasno = data.jobordno;
        var pgno = data.prodpgmno;


        var opitmid = opItemid;
        var opcolorid = opClrid;
        var jobno = jmasno;
        var ProductionPgmNo = pgno;

        var opitm = data.opitm;
        var opcolor = data.opclr;
        var opplansize = data.plansize;
        var opplansizeid = data.plansizeid;
        //var jobno = data.jobordno;
        //var ordqty = data.ordqty;
        //var PgmType = data.ProgramType;
        var Prodprgmno = pgno;




        var fs = '';
        for (var x = 0; x < SizeL.length; x++) {
            if (SizeL[x].SizeId == val) {
                fs = SizeL[x].Size;
                oldind = x;
            }
        }





        $.each(IpItmList, function () {
            if (this.itmid == Itemid && this.clrid == Clrid //&& this.sizeid == szid
                && this.plansizeid == pszid 
                && this.opitmid == opItemid && this.opclrid == opClrid && this.opsizeid == opszid ) {
                this.sizeid = val;
                this.size = fs;
            }
        });
        $.each(IpItmDetList, function () {
            if (this.itmid == Itemid && this.clrid == Clrid //&& this.sizeid == szid
                && this.plansizeid == pszid
                && this.opitmid == opItemid && this.opclrid == opClrid && this.opsizeid == opszid ) {
                this.sizeid = val;
                this.size = fs;
            }
        });



        $.each(IpSaveJobDetList, function () {

            if (Clrid == this.clrid && Itemid == this.itmid //&& szid == this.sizeid
                 && this.plansizeid == pszid
                && this.jobordno == jmasno
                && this.opitmid == opItemid && this.opsizeid == opszid && this.opclrid == opClrid && this.prodpgmno == pgno) {
                this.sizeid = val;
                this.size = fs;
            }

        });
        $.each(IpJobDetList, function () {
          
            if (Clrid == this.clrid && Itemid == this.itmid //&& szid == this.sizeid
                 && this.plansizeid == pszid
                && this.jobordno == jmasno
              && this.opitmid == opItemid && this.opsizeid == opszid && this.opclrid == opClrid && this.prodpgmno == pgno) {
                this.sizeid = val;
                this.size = fs;
            }
        });



        var jobempty = [];
        jobempty = IpSaveStkDetList;

        jobempty = $.grep(jobempty, function (v) {
            return (v.opitmid == opitmid && v.opclrid == opcolorid && v.opsizeid == opplansizeid && v.jobordno == jobno && v.prodpgmno == ProductionPgmNo && v.sizeid == val);
        });
        if (jobempty.length > 0) {

            var jobempty2 = [];

            for (var k = 0; IpSaveStkDetList.length > k; k++) {
                if (opitmid == IpSaveStkDetList[k].opitmid && opplansizeid == IpSaveStkDetList[k].opsizeid && opcolorid == IpSaveStkDetList[k].opclrid && jobno == IpSaveStkDetList[k].jobordno && ProductionPgmNo == IpSaveStkDetList[k].prodpgmno) {

                }
                else {
                    jobempty2.push(IpSaveStkDetList[k]);
                }
            }



            IpStkDetList = [];
            // IpStkDetList = jobempty;

            for (var k = 0; jobempty.length > k; k++) {
                var prg = 0;
                for (var j = 0; IpSaveStkDetList.length > j; j++) {
                    if (jobempty[k].clrid == IpSaveStkDetList[j].clrid && jobempty[k].itmid == IpSaveStkDetList[j].itmid && jobempty[k].sizeid == IpSaveStkDetList[j].sizeid && jobempty[k].jobordno == IpSaveStkDetList[j].jobordno && jobempty[k].stockid == IpSaveStkDetList[j].stockid
                        && jobempty[k].opitmid == IpSaveStkDetList[j].opitmid && jobempty[k].opsizeid == IpSaveStkDetList[j].opsizeid && jobempty[k].opclrid == IpSaveStkDetList[j].opclrid && jobempty[k].prodpgmno == IpSaveStkDetList[j].prodpgmno) {
                        var tot = 0;
                        for (var l = 0; jobempty2.length > l; l++) {
                            if (jobempty2[l].clrid == IpSaveStkDetList[j].clrid && jobempty2[l].itmid == IpSaveStkDetList[j].itmid && jobempty2[l].sizeid == IpSaveStkDetList[j].sizeid && jobempty2[l].jobordno == IpSaveStkDetList[j].jobordno && jobempty2[l].stockid == IpSaveStkDetList[j].stockid) {

                                var ppg = jobempty2[l].issues;
                                tot = tot + parseFloat(ppg);
                            }
                        }

                        var bl = IpSaveStkDetList[j].bal;
                        prg = bl - tot;
                        var jobobj = {

                            FinDia: jobempty[k].FinDia,
                            FinDiaid: jobempty[k].FinDiaid,
                            FinGsm: jobempty[k].FinGsm,
                            Gauge: jobempty[k].Gauge,
                            Loop_Len: jobempty[k].Loop_Len,
                            TaxAppVal: jobempty[k].TaxAppVal,
                            TransNo: jobempty[k].TransNo,
                            allow: jobempty[k].allow,
                            apprate: jobempty[k].apprate,
                            bal: prg,
                            clr: jobempty[k].clr,
                            clrid: jobempty[k].clrid,
                            disploc: jobempty[k].disploc,
                            disptype: jobempty[k].disptype,
                            inrout: jobempty[k].inrout,
                            isdeci: jobempty[k].isdeci,
                            issloc: jobempty[k].issloc,
                            issqty: jobempty[k].issqty,
                            isstype: jobempty[k].isstype,
                            issues: jobempty[k].issues,
                            itm: jobempty[k].itm,
                            itmid: jobempty[k].itmid,
                            jobordno: jobempty[k].jobordno,
                            lotno: jobempty[k].lotno,
                            opclr: jobempty[k].opclr,
                            opclrid: jobempty[k].opclrid,
                            opitm: jobempty[k].opitm,
                            opitmid: jobempty[k].opitmid,
                            opsize: jobempty[k].opsize,
                            opsizeid: jobempty[k].opsizeid,
                            orderno: jobempty[k].orderno,
                            ordqty: jobempty[k].ordqty,
                            plansize: jobempty[k].plansize,
                            plansizeid: jobempty[k].plansizeid,
                            prgdetid: jobempty[k].prgdetid,
                            prgopqty: jobempty[k].prgopqty,
                            process: jobempty[k].process,
                            procissdetid: jobempty[k].procissdetid,
                            procissid: jobempty[k].procissid,
                            procissjobid: jobempty[k].procissjobid,
                            procorddetid: jobempty[k].procorddetid,
                            procordjobid: jobempty[k].procordjobid,
                            prodpgmno: jobempty[k].prodpgmno,
                            prodstkid: jobempty[k].prodstkid,
                            rate: jobempty[k].rate,
                            refno: jobempty[k].refno,
                            secqty: jobempty[k].secqty,
                            size: jobempty[k].size,
                            sizeid: jobempty[k].sizeid,
                            sno: jobempty[k].sno,
                            stockid: jobempty[k].stockid,
                            style: jobempty[k].style,
                            supplier: jobempty[k].supplier,
                            ProcessIssStockId: jobempty[k].ProcessIssStockId,
                        };

                        IpStkDetList.push(jobobj);
                    }
                }
            }
            InputStkdetTab(IpStkDetList);
        }
        else {
            var res = $.grep(IpSaveStkDetList, function (e) {
                return e.opitmid > 0;
            });
            if (res.length == 0) {
                ipstkclone = [];
                for (var k = 0; IpSaveStkDetList.length > k; k++) {
                    //var sl = IpSaveJobDetList.length + 1;

                    var jobobj = {

                        FinDia: IpSaveStkDetList[k].FinDia,
                        FinDiaid: IpSaveStkDetList[k].FinDiaid,
                        FinGsm: IpSaveStkDetList[k].FinGsm,
                        Gauge: IpSaveStkDetList[k].Gauge,
                        Loop_Len: IpSaveStkDetList[k].Loop_Len,
                        TaxAppVal: IpSaveStkDetList[k].TaxAppVal,
                        TransNo: IpSaveStkDetList[k].TransNo,
                        allow: IpSaveStkDetList[k].allow,
                        apprate: IpSaveStkDetList[k].apprate,
                        bal: IpSaveStkDetList[k].bal,
                        clr: IpSaveStkDetList[k].clr,
                        clrid: IpSaveStkDetList[k].clrid,
                        disploc: IpSaveStkDetList[k].disploc,
                        disptype: IpSaveStkDetList[k].disptype,
                        inrout: IpSaveStkDetList[k].inrout,
                        isdeci: IpSaveStkDetList[k].isdeci,
                        issloc: IpSaveStkDetList[k].issloc,
                        issqty: IpSaveStkDetList[k].issqty,
                        isstype: IpSaveStkDetList[k].isstype,
                        issues: IpSaveStkDetList[k].issues,
                        itm: IpSaveStkDetList[k].itm,
                        itmid: IpSaveStkDetList[k].itmid,
                        jobordno: IpSaveStkDetList[k].jobordno,
                        lotno: IpSaveStkDetList[k].lotno,
                        opclr: IpSaveStkDetList[k].opclr,
                        opclrid: IpSaveStkDetList[k].opclrid,
                        opitm: IpSaveStkDetList[k].opitm,
                        opitmid: IpSaveStkDetList[k].opitmid,
                        opsize: IpSaveStkDetList[k].opsize,
                        opsizeid: IpSaveStkDetList[k].opsizeid,
                        orderno: IpSaveStkDetList[k].orderno,
                        ordqty: IpSaveStkDetList[k].ordqty,
                        plansize: IpSaveStkDetList[k].plansize,
                        plansizeid: IpSaveStkDetList[k].plansizeid,
                        prgdetid: IpSaveStkDetList[k].prgdetid,
                        prgopqty: IpSaveStkDetList[k].prgopqty,
                        process: IpSaveStkDetList[k].process,
                        procissdetid: IpSaveStkDetList[k].procissdetid,
                        procissid: IpSaveStkDetList[k].procissid,
                        procissjobid: IpSaveStkDetList[k].procissjobid,
                        procorddetid: IpSaveStkDetList[k].procorddetid,
                        procordjobid: IpSaveStkDetList[k].procordjobid,
                        prodpgmno: IpSaveStkDetList[k].prodpgmno,
                        prodstkid: IpSaveStkDetList[k].prodstkid,
                        rate: IpSaveStkDetList[k].rate,
                        refno: IpSaveStkDetList[k].refno,
                        secqty: IpSaveStkDetList[k].secqty,
                        size: IpSaveStkDetList[k].size,
                        sizeid: IpSaveStkDetList[k].sizeid,
                        sno: IpSaveStkDetList[k].sno,
                        stockid: IpSaveStkDetList[k].stockid,
                        style: IpSaveStkDetList[k].style,
                        supplier: IpSaveStkDetList[k].supplier,
                        ProcessIssStockId: IpSaveStkDetList[k].ProcessIssStockId,
                    };
                    ipstkclone.push(jobobj);
                }

                $.each(IpSaveStkDetList, function () {
                    for (var k = 0; IpJobDetList.length > k; k++) {
                        if (this.itmid == IpJobDetList[k].itmid && this.clrid == IpJobDetList[k].clrid && this.sizeid == IpJobDetList[k].sizeid) {
                            this.opitm = opitm;
                            this.opclr = opcolor;
                            this.opsize = opplansize;
                            this.opitmid = opitmid;
                            this.opclrid = opcolorid;
                            this.opsizeid = opplansizeid;
                            this.prodpgmno = ProductionPgmNo;
                        }
                    }
                });
                //ipstkclone = $.grep(IpSaveStkDetList, function (e) {
                //    return e.opitmid == opitmid && e.opclrid == opcolorid && e.opsizeid == opplansizeid && e.jobordno == jobno;
                //})
            }
            else {
                for (var k = 0; ipstkclone.length > k; k++) {
                    var sl = IpSaveStkDetList.length + 1;
                    for (var l = 0; IpJobDetList.length > l; l++) {
                        if (ipstkclone[k].itmid == IpJobDetList[l].itmid && ipstkclone[k].clrid == IpJobDetList[l].clrid && ipstkclone[k].sizeid == IpJobDetList[l].sizeid) {
                            var jobobj = {

                                FinDia: ipstkclone[k].FinDia,
                                FinDiaid: ipstkclone[k].FinDiaid,
                                FinGsm: ipstkclone[k].FinGsm,
                                Gauge: ipstkclone[k].Gauge,
                                Loop_Len: ipstkclone[k].Loop_Len,
                                TaxAppVal: ipstkclone[k].TaxAppVal,
                                TransNo: ipstkclone[k].TransNo,
                                allow: ipstkclone[k].allow,
                                apprate: ipstkclone[k].apprate,
                                bal: ipstkclone[k].bal,
                                clr: ipstkclone[k].clr,
                                clrid: ipstkclone[k].clrid,
                                disploc: ipstkclone[k].disploc,
                                disptype: ipstkclone[k].disptype,
                                inrout: ipstkclone[k].inrout,
                                isdeci: ipstkclone[k].isdeci,
                                issloc: ipstkclone[k].issloc,
                                issqty: ipstkclone[k].issqty,
                                isstype: ipstkclone[k].isstype,
                                issues: 0,
                                itm: ipstkclone[k].itm,
                                itmid: ipstkclone[k].itmid,
                                jobordno: ipstkclone[k].jobordno,
                                lotno: ipstkclone[k].lotno,
                                opclr: opcolor,
                                opclrid: opcolorid,
                                opitm: opitm,
                                opitmid: opitmid,
                                opsize: opplansize,
                                opsizeid: opplansizeid,
                                orderno: ipstkclone[k].orderno,
                                ordqty: ipstkclone[k].ordqty,
                                plansize: ipstkclone[k].plansize,
                                plansizeid: ipstkclone[k].plansizeid,
                                prgdetid: ipstkclone[k].prgdetid,
                                prgopqty: ipstkclone[k].prgopqty,
                                process: ipstkclone[k].process,
                                procissdetid: ipstkclone[k].procissdetid,
                                procissid: ipstkclone[k].procissid,
                                procissjobid: ipstkclone[k].procissjobid,
                                procorddetid: ipstkclone[k].procorddetid,
                                procordjobid: ipstkclone[k].procordjobid,
                                prodpgmno: ProductionPgmNo,//ipstkclone[k].prodpgmno,
                                prodstkid: ipstkclone[k].prodstkid,
                                rate: ipstkclone[k].rate,
                                refno: ipstkclone[k].refno,
                                secqty: ipstkclone[k].secqty,
                                size: ipstkclone[k].size,
                                sizeid: ipstkclone[k].sizeid,
                                sno: sl,
                                stockid: ipstkclone[k].stockid,
                                style: ipstkclone[k].style,
                                supplier: ipstkclone[k].supplier,
                                ProcessIssStockId: ipstkclone[k].ProcessIssStockId,
                            };
                            IpSaveStkDetList.push(jobobj);
                        }
                    }
                }
            }
            var jobempty = [];
            jobempty = IpSaveStkDetList;
            jobempty = $.grep(jobempty, function (v) {
                return (v.opitmid == opitmid && v.opclrid == opcolorid && v.opsizeid == opplansizeid && v.jobordno == jobno && v.prodpgmno == ProductionPgmNo);
            });
            if (jobempty.length > 0) {

                var jobempty2 = [];

                for (var k = 0; IpSaveStkDetList.length > k; k++) {
                    if (opitmid == IpSaveStkDetList[k].opitmid && opplansizeid == IpSaveStkDetList[k].opsizeid && opcolorid == IpSaveStkDetList[k].opclrid && jobno == IpSaveStkDetList[k].jobordno && ProductionPgmNo == IpSaveStkDetList[k].prodpgmno) {

                    }
                    else {
                        jobempty2.push(IpSaveStkDetList[k]);
                    }
                }
                IpStkDetList = [];
                // IpStkDetList = jobempty;

                for (var k = 0; jobempty.length > k; k++) {
                    var prg = 0;
                    for (var j = 0; IpSaveStkDetList.length > j; j++) {
                        if (jobempty[k].clrid == IpSaveStkDetList[j].clrid && jobempty[k].itmid == IpSaveStkDetList[j].itmid && jobempty[k].sizeid == IpSaveStkDetList[j].sizeid && jobempty[k].jobordno == IpSaveStkDetList[j].jobordno && jobempty[k].stockid == IpSaveStkDetList[j].stockid
                            && jobempty[k].opitmid == IpSaveStkDetList[j].opitmid && jobempty[k].opsizeid == IpSaveStkDetList[j].opsizeid && jobempty[k].opclrid == IpSaveStkDetList[j].opclrid && jobempty[k].prodpgmno == IpSaveStkDetList[j].prodpgmno) {
                            var tot = 0;
                            for (var l = 0; jobempty2.length > l; l++) {
                                if (jobempty2[l].clrid == IpSaveStkDetList[j].clrid && jobempty2[l].itmid == IpSaveStkDetList[j].itmid && jobempty2[l].sizeid == IpSaveStkDetList[j].sizeid && jobempty2[l].jobordno == IpSaveStkDetList[j].jobordno && jobempty2[l].stockid == IpSaveStkDetList[j].stockid) {

                                    var ppg = jobempty2[l].issues;
                                    tot = tot + parseFloat(ppg);
                                }
                            }

                            var bl = IpSaveStkDetList[j].bal;
                            prg = bl - tot;
                            var jobobj = {

                                FinDia: jobempty[k].FinDia,
                                FinDiaid: jobempty[k].FinDiaid,
                                FinGsm: jobempty[k].FinGsm,
                                Gauge: jobempty[k].Gauge,
                                Loop_Len: jobempty[k].Loop_Len,
                                TaxAppVal: jobempty[k].TaxAppVal,
                                TransNo: jobempty[k].TransNo,
                                allow: jobempty[k].allow,
                                apprate: jobempty[k].apprate,
                                bal: prg,
                                clr: jobempty[k].clr,
                                clrid: jobempty[k].clrid,
                                disploc: jobempty[k].disploc,
                                disptype: jobempty[k].disptype,
                                inrout: jobempty[k].inrout,
                                isdeci: jobempty[k].isdeci,
                                issloc: jobempty[k].issloc,
                                issqty: jobempty[k].issqty,
                                isstype: jobempty[k].isstype,
                                issues: jobempty[k].issues,
                                itm: jobempty[k].itm,
                                itmid: jobempty[k].itmid,
                                jobordno: jobempty[k].jobordno,
                                lotno: jobempty[k].lotno,
                                opclr: jobempty[k].opclr,
                                opclrid: jobempty[k].opclrid,
                                opitm: jobempty[k].opitm,
                                opitmid: jobempty[k].opitmid,
                                opsize: jobempty[k].opsize,
                                opsizeid: jobempty[k].opsizeid,
                                orderno: jobempty[k].orderno,
                                ordqty: jobempty[k].ordqty,
                                plansize: jobempty[k].plansize,
                                plansizeid: jobempty[k].plansizeid,
                                prgdetid: jobempty[k].prgdetid,
                                prgopqty: jobempty[k].prgopqty,
                                process: jobempty[k].process,
                                procissdetid: jobempty[k].procissdetid,
                                procissid: jobempty[k].procissid,
                                procissjobid: jobempty[k].procissjobid,
                                procorddetid: jobempty[k].procorddetid,
                                procordjobid: jobempty[k].procordjobid,
                                prodpgmno: jobempty[k].prodpgmno,
                                prodstkid: jobempty[k].prodstkid,
                                rate: jobempty[k].rate,
                                refno: jobempty[k].refno,
                                secqty: jobempty[k].secqty,
                                size: jobempty[k].size,
                                sizeid: jobempty[k].sizeid,
                                sno: jobempty[k].sno,
                                stockid: jobempty[k].stockid,
                                style: jobempty[k].style,
                                supplier: jobempty[k].supplier,
                                ProcessIssStockId: jobempty[k].ProcessIssStockId,

                            };

                            IpStkDetList.push(jobobj);
                        }
                    }
                }
                InputStkdetTab(IpStkDetList);
            }

        }






        //var Stkempty = [];
        //Stkempty = IpStkDetList;

        //Stkempty = $.grep(Stkempty, function (v) {
        //    return (v.itmid == Itemid && v.clrid == Clrid && v.sizeid == val && v.opitmid == opItemid && v.opclrid == opClrid && v.opsizeid == opszid
        //        && v.jobordno == jmasno && v.prodpgmno == pgno);
        //});

        //InputStkdetTab(Stkempty);

        //var table = $('#inputitmtab').DataTable();
        //var ecdata = table.rows().data();

        //$('input[id=txtipRQty]').each(function (ig) {

        //    var row = $(this).closest('tr');
        //    for (var h = 0; h < IpItmDetList.length; h++) {

        //        if (ig == h && ecdata[ig].clrid == IpItmDetList[h].clrid && ecdata[ig].itmid == IpItmDetList[h].itmid && ecdata[ig].sizeid == IpItmDetList[h].sizeid) {

        //            $.each(SizeL, function (k, v) {
        //                var id = 0;
        //                if (ipsize === v.Size) {
        //                    id = v.SizeId
        //                    row.find('#loadsizelist').val(id).trigger('change');
        //                }

        //            });

        //        }
        //    }

        //});


        //OutputitmTab(OpItmList);

        //$.each(OpSaveJobDetList, function () {
        //    if (this.itmid == Itemid && this.clrid == Clrid && this.plansizeid == pszid) {
        //        this.sizeid = val;
        //        this.size = fs;
        //    }
        //});
        //OpJobDetList = $.grep(OpSaveJobDetList, function (v) {
        //    return (v.itmid === IId && v.clrid === CId && v.plansizeid === SId);
        //});

        //OutputJobdetTab(OpJobDetList);

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
            $(ddlLocation).empty();
            $(ddlLocation).append($('<option/>').val('0').text('--Select Store--'));
            $.each(data, function () {
                $(ddlLocation).append($('<option></option>').val(this.Storeid).text(this.StoreName));
            });
            $(ddlLocation).trigger("select2:updated");
            if (editmasunitstore > 0) {
                $('#ddlLocation').val(editmasunitstore).trigger('change');
            }
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadStorefromcompany() {
    CompanyId = $('#ddlCompany').val();

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

            $(ddlAStoreUnit).empty();
            $(ddlAStoreUnit).append($('<option/>').val('0').text('--Select Store--'));
            $.each(data, function () {
                $(ddlAStoreUnit).append($('<option></option>').val(this.Storeid).text(this.StoreName));
            });
            $(ddlAStoreUnit).trigger("select2:updated");

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}

function getprocessDetbyid(ProcessID) {
    debugger;
    $('#Name').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Process/getbyID/" + ProcessID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            var selected = obj.Stage_Schedule;
            if (selected == "1") {
                $('input:radio[name="ProcessType"][value="1"]').prop('checked', true);
            } else {
                $('input:radio[name="ProcessType"][value="2"]').prop('checked', true);
            };
            if (result.Status == 'SUCCESS') {
                $('#ProcessID').val(obj.ProcessId);
                $('#Name').val(obj.ProcessName);
                $('#ProcessLoss').val(obj.ProcessLoss);
                if (obj.IsActive == "TRUE") {
                    $('#Status').prop("checked", true);
                } else {
                    $('#Status').prop("checked", false);
                }
                if (obj.AllowLotNumGen == "TRUE") {
                    $('#AllLotNum').prop("checked", true);
                } else {
                    $('#AllLotNum').prop("checked", false);
                }
                if (obj.IsEmblishmentProcess == "TRUE") {
                    $('#IsComponentProcess').prop("checked", true);
                } else {
                    $('#IsComponentProcess').prop("checked", false);
                }
                if (obj.IsValidateProcessOrdQty == "TRUE") {
                    $('#IsProcessValidateOrdQty').prop("checked", true);
                } else {
                    $('#IsProcessValidateOrdQty').prop("checked", false);
                }

                debugger;

                //for (var d = 0; d < Programlist.length; d++) {
                //    if (Programlist[d].programtype == obj.Programinput) {
                //        var typeinp = Programlist[d].program;
                //        $('#ddlinput').val(typeinp);
                //    }
                //}

                //for (var p = 0; p< Programlist.length; p++) {
                //    if (Programlist[p].programtype == obj.Programoutput) {
                //        var typeop = Programlist[p].program;
                //        $('#ddloutput').val(typeop);
                //    }
                //}
                $('#ddlinput').val(obj.Programinput);
                $('#ddloutput').val(obj.Programoutput);
                $('#myModal').modal('show');
                $('#btnUpdate').show();
                $('#btnAdd').hide();
            }
            else {

            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

function GetProcessInOutValidate(ProcessID) {
    debugger;
    $.ajax({
        url: "/Process/getbyID/" + ProcessID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
           
            if (result.Status == 'SUCCESS') {
                if (obj.IsProportion == "TRUE") {
                    ValidateProcessInandOutQty=true;
                } else {
                    ValidateProcessInandOutQty= false;
                }
            }
            else {
            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}


function LoadSupplierSetup() {
    debugger;
    var setup = $("#hdnSupplierSetup").data('value');

    if (setup == 'True') {
        var procid = $('select#ddlProcess option:selected').val();
        var typ = 'R'
      
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
                    $(ddlSupplier).empty();
                    $(ddlSupplier).append($('<option/>').val('0').text('--Select Supplier--'));
                    $.each(data, function () {
                        $(ddlSupplier).append($('<option></option>').val(this.SupplierId).text(this.SupplierName));
                    });
                }
            }
        });
    } else {

        LoadSupplierDDL("#ddlSupplier");
    }

}

function CalcTotalQty () {

    var TotOpQty = 0;

    $.each(OpSaveJobDetList, function (i) {

        TotOpQty = TotOpQty + parseFloat(OpSaveJobDetList[i].ordqty);

    });


    var TotIpQty = 0;

    $.each(IpSaveJobDetList, function (i) {

        TotIpQty = TotIpQty + parseFloat(IpSaveJobDetList[i].ordqty);

    });

    $('#txtIpTotQty').val(TotIpQty);
    $('#txtOpTotQty').val(TotOpQty);


}
