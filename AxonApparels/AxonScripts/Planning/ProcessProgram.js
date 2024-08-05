var prodproList = [];
var prodplanningList = [];
var prodplanning = [];
var proIOList = [];
var compdetaillist = [];
var CompanyId = 0;
var CompanyUnitId = 0;
var ProcessId = 0;
var Styleid = 0;
var Ordertype = "";
var Programtype = "";
var ItemId = 0;
var pid = 0;
var proname = "";
var proddelid = 0;
var compdelid = 0;
var currentrow = 0;
var arrlist = [];
var comarrlist = [];
var pnum = 0;
var copnum = 0;
var comproc = "";
var prodpro = "";
var prodplanningedelete = [];
var detlist = [];
var compedit = [];
var Userid = 0;
var UserName = 0;
var MOrd = 0;
var MotOrd = 0;
var prodprgid = 0;
var GJobId = 0;
var MainFDate = 0;
var Guserid = 0;
var Progtype = 0;
var Gp = 0;
var PrgEtype = 0;
var OrdEtype = 0;
var prdprgid = 0;
var CEPGItemList = [];
var CEPGOItemList = [];
var Mode = 0;
var Inputeditlist = [];
var Outputeditlist = [];
var lastproslist = [];
var DCompid = 0;
var ChkRefno = true;
var ChkOrdno = true;
var ChkBuyer = true;
var ChkComp = false;
var DtChk = false;
var planamend = 0;
var AccLock = [];
var PlanLock = [];
var comeid = 0;
var closeMode = 0;
var DispatchClosed = "N";
$(document).ready(function () {

    var Prg = "P";
    Gp = Prg;

    MainFDate = $("#hdMainFromDate").data('value');
    getDate();

    Guserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');

    LoadCompanyDDL("#ddlproCompany,#ddlMCompany");
    LoadBuyerDDL("#ddlMBuyer");
    LoadCompanyUnitDDL("#ddlprounit");
    LoadOrderNoDDL("#ddlMOrderNo");
    LoadRefNoDDL("#ddlMRefNo");
    LoadItemDDL("#ddlInpItem,#ddlOPItem");
    LoadColorDDL("#ddlInpColor,#ddlOPColor");
    LoadSizeDDL("#ddlInpSize,#ddlOPSize");

    DCompid = $("#hdnDCompid").data('value');
    //$('#ddlproType').val(1);
    load();

    var fill = localStorage.getItem('ProductionProgramMenuFilter');
    if (fill != "null" && fill != null) {
        loadDataFromBack(Gp);
    } else {
        loadData(Gp);
    }
   // loadData(Gp);
    //CheckRights("ProcessProgram");
    $("#ddlOrderNo").change(function () {
        var OrderId = this.value;
        var OrderNo = $(this).find("option:selected").text();

        $.ajax({
            url: "/StyleEntry/GetbyIDOrder/" + OrderId,
            type: "GET",
            contentType: "application/json;charset=UTF-8",
            success: function (result) {
                var obj = result.Value;

                if (result.Status == 'SUCCESS') {
                    $("#ddlproRefNo option:selected").text(obj.Ref_No);
                }
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    });


    $("#ddlMOrderNo").change(function () {
        var OrderId = this.value;
        var OrderNo = $(this).find("option:selected").text();

        $.ajax({
            url: "/StyleEntry/GetbyIDOrder/" + OrderId,
            type: "GET",
            contentType: "application/json;charset=UTF-8",
            success: function (result) {
                debugger;
                var obj = result.Value;

                if (result.Status == 'SUCCESS') {
                    $("#ddlMRefNo option:selected").text(obj.Ref_No);
                }
            },
            error: function (errormessage) {
                debugger;
                alert(errormessage.responseText);
            }
        });
    });

    $(document).on('keyup', '.txtinpgmqt', function () {
        debugger;
        rowindex = $(this).closest('tr').index();

        var currowind = inputlist.slice(rowindex);

        currowind[0]['Quantity'] = $(this).val();
        inputlist[rowindex] = currowind[0];
        TotalPgmQty();
    });

    $(document).on('keyup', '.txtinpsecqt', function () {
        debugger;
        rowindex = $(this).closest('tr').index();

        var currowind = inputlist.slice(rowindex);

        currowind[0]['SecQty'] = $(this).val();
        inputlist[rowindex] = currowind[0];
    });

    $(document).on('keyup', '.txtprodqty', function () {
        debugger;
        rowindex = $(this).closest('tr').index();
        if (detlist.length > 0) {
            var currowind = detlist.slice(rowindex);
            currowind[0]['prodqty'] = $(this).val();
            //currowind[0]['Prog_Op_Qty'] = $(this).val();
            detlist[rowindex] = currowind[0];
        }
        if (compedit.length > 0) {

            var currowind = compedit.slice(rowindex);
            //currowind[0]['prodqty'] = $(this).val();
            currowind[0]['Prog_Op_Qty'] = $(this).val();
            compedit[rowindex] = currowind[0];
        }

    });

    $(document).on('keyup', '.txtoppgmqt', function () {
        debugger;
        rowindex = $(this).closest('tr').index();

        var currowind = outputlist.slice(rowindex);

        currowind[0]['Quantity'] = $(this).val();
        outputlist[rowindex] = currowind[0];
        TotalPgmQty();

    });

    $(document).on('keyup', '.txtopsecqt', function () {
        debugger;
        rowindex = $(this).closest('tr').index();

        var currowind = outputlist.slice(rowindex);

        currowind[0]['SecQty'] = $(this).val();
        outputlist[rowindex] = currowind[0];

    });

    $(document).on('click', '.btnprodproadd', function () {
        debugger;
        $('#myModal1').modal('hide');
        $('#myModal2').modal('show');
        closeMode = 3;
        var rowindex = $(this).closest('tr').index();
        var currentval = list.slice(rowindex);
        currentrow = rowindex;
        arrlist = currentval;
        fnloadProductionPlanning(currentval);
        fnloadProductionPlanninglist(currentval);

        var checkbox_value = "";
        var ischecked = false;
        $(":checkbox").each(function () {
            ischecked = $('#Openprg').is(":checked");

        });

        if (ischecked == true) {
            $('#ReasonFor').show();
        }
        else {
            $('#ReasonFor').hide();
        }
        //if(ischecked)

    });
    //$(document).on('click', '.btnprodproaddlist', function () {
    //    debugger;
    //    $('#myModal2').show();

    //    var rowindex = $(this).closest('tr').index();
    //    var currentval = list.slice(rowindex);

    //    fnloadProductionPlanning(currentval);
    //    fnloadProductionPlanninglist(currentval);
    //});
    //$("#ddlinputbasepro").change(function () {
    //    debugger;
    //    var inputtype = $("#ddlinputbasepro").val();
    //    var wrkordno = $('#txtjobordno').val();

    //    var OrderNo = wrkordno;
    //    LoadIOTable(OrderNo, inputtype, "Input");

    //});

    //$("#ddloutputbasepro").change(function () {
    //    debugger;
    //    var Outputtype = $("#ddloutputbasepro").val();
    //    var wrkordno = $('#txtjobordno').val();

    //    var OrderNo = wrkordno;
    //    LoadIOTable(OrderNo, Outputtype, "Output");

    //});


    $(document).on('click', '.btnprodplanadd', function () {
        debugger;
        //clearTextBox();


        var checkbox_value = "";
        var ischecked = false;
        $(":checkbox").each(function () {
            ischecked = $('#Openprg').is(":checked");

        });

        if (ischecked == true) {
            var txt = $('#txtRemark').val();
            if (txt == '') {
                //alert('Fill the reason...');
                var msg = 'Fill the reason...';
                var flg = 4;
                var mode = 1;
                var url = "";
                AlartMessage(msg, flg, mode, url);
                return true;
            }
            else {
                $('#myModal3').modal('show');
                $('#myModal3').show();
                $('#btncancel').hide();
                $('#btnupd').hide();
                var tablesize = $('#Itable').DataTable();
                tablesize.clear().draw();

                var tablesize = $('#Otable').DataTable();
                tablesize.clear().draw();
                LoadProcessDDL("#ddloutputlstpro,#ddlinputlstpro");
                $('#ddlinputbasepro').val("IT");
                $('#ddloutputbasepro').val("OT");
                $('#remarksli').val("");

                var rowindex = $(this).closest('tr').index();
                if (prodplanning.length > 0) {
                    var currentval = prodplanning.slice(rowindex);
                }

                var wrkordno = $('#txtjobordno').val();
                var refno = $('#txtrefno').val();
                var compunit = $('#txtcompunit').val();
                var dt = new Date();
                var currentdate = dt.getDate() + '/' + (dt.getMonth() + 1) + '/' + dt.getFullYear();

                $('#txtprocess').val(currentval[0]["Process"]);
                ProcessId = currentval[0]["ProcessId"];

                $('#txtwrkordno').val(wrkordno);
                $('#txtplanrefno').val(refno);
                $('#txtprdprgno').val();
                $('#txtplancompunit').val(compunit);
                $('#txtplanprogdate').val(currentdate);

                var OrderNo = wrkordno;//"AXN-WRK00001";
                GenerateNumber();
                LoadIOTable(OrderNo, "");

            }
        }
        else {
            $('#myModal3').modal('show');
            $('#myModal3').show();
            $('#btncancel').hide();
            $('#btnupd').hide();
            var tablesize = $('#Itable').DataTable();
            tablesize.clear().draw();

            var tablesize = $('#Otable').DataTable();
            tablesize.clear().draw();
            LoadProcessDDL("#ddloutputlstpro,#ddlinputlstpro");
            //$('#ddlinputbasepro').val("IT");
            //$('#ddloutputbasepro').val("OT");
            $('#remarksli').val("");

            var rowindex = $(this).closest('tr').index();
            if (prodplanning.length > 0) {
                var currentval = prodplanning.slice(rowindex);
            }

            var wrkordno = $('#txtjobordno').val();
            var refno = $('#txtrefno').val();
            var compunit = $('#txtcompunit').val();
            var dt = new Date();
            var currentdate = dt.getDate() + '/' + (dt.getMonth() + 1) + '/' + dt.getFullYear();

            $('#txtprocess').val(currentval[0]["Process"]);
            ProcessId = currentval[0]["ProcessId"];

            $('#txtwrkordno').val(wrkordno);
            $('#txtplanrefno').val(refno);
            $('#txtprdprgno').val();
            $('#txtplancompunit').val(compunit);
            $('#txtplanprogdate').val(currentdate);

            var OrderNo = wrkordno;//"AXN-WRK00001";
            GenerateNumber();
            LoadIOTable(OrderNo, "");

        }



    });

    $(document).on('click', '.btnprodplaneditadd', function () {
        debugger;
        $('#myModal3').modal('show');
        $('#btnupd').hide();
        $('#btncancel').hide();
        $('#btnsave').show();
        $("#btnsave").attr("disabled", false);



        var tablesize = $('#Itable').DataTable();
        tablesize.clear().draw();

        var tablesize = $('#Otable').DataTable();
        tablesize.clear().draw();

        //$('#ddlinputbasepro').val("IT");
        //$('#ddloutputbasepro').val("OT");

        //LoadProcessDDL("#ddloutputlstpro,#ddlinputlstpro");
        var rowindex = $(this).closest('tr').index();

        if (prodplanningedit.length > 0) {
            var currentval = prodplanningedit.slice(rowindex);
            arrlist = currentval;

            $.each(loadlist, function (t) {
                if (this.JMasId == eid) {
                    CompanyId = this.CompanyId;
                    CompanyUnitId = this.CompanyUnitId;

                }
            });

            //for (var c = 0; c < prodplanningedit.length; c++) {

            //}
            //var curval = loadlist.slice(rowindex);
            //CompanyId = curval[0].CompanyId;
            //CompanyUnitId = curval[0].CompanyUnitId;

        }
        var wrkordno = $('#txtjobordno').val();
        var refno = $('#txtrefno').val();
        var compunit = $('#txtcompunit').val();
        var dt = new Date();
        var currentdate = dt.getDate() + '/' + (dt.getMonth() + 1) + '/' + dt.getFullYear();

        $('#txtprocess').val(currentval[0]["Process"]);
        ProcessId = currentval[0]["ProcessId"];
        //PrgEtype = currentval[0]["PrgEdittype"];
        OrdEtype = currentval[0]["Ordertype"];
        $('#txtwrkordno').val(wrkordno);
        $('#txtplanrefno').val(refno);
        $('#txtprdprgno').val();
        $('#txtplancompunit').val(compunit);
        $('#txtplanprogdate').val(currentdate);

        var OrderNo = wrkordno;//"AXN-WRK00001";
        GenerateNumber();
        LoadIOTable(OrderNo, "");
        var JobNo = $('#txtjobordno').val();
        LoadlastPrgmDDL(JobNo, prodprgid);

    });

    $(document).on('click', '.btncompplaneditadd', function () {
        debugger;
        $('#myModal4').modal('show');
        $('#btnupdcomp').hide();
        $('#btndelcomp').hide();
        $('#btnsavecomp').show();

        $('#ddlItem').val(0);
        $('#ddlColor').val(0);
        $('#ddlComponent').val(0);
        var tablesize = $('#comptable').DataTable();
        tablesize.clear().draw();

        compdetaillist = [];

        var rowindex = $(this).closest('tr').index();
        var currentval = prodplanningedit.slice(rowindex);
        comarrlist = currentval;
        if (prodplanningedit.length > 0) {
            $.each(loadlist, function (t) {
                if (this.JMasId == eid) {
                    CompanyId = this.CompanyId;
                    CompanyUnitId = this.CompanyUnitId;

                }
            });

            //CompanyId = loadlist[0].CompanyId;
            //CompanyUnitId = loadlist[0].CompanyUnitId;
            // CompanyUnitId = currentval[0].CompanyUnitId;
        }
        var wrkordno = $('#txtjobordno').val();
        var refno = $('#txtrefno').val();
        var compunit = $('#txtcompunit').val();
        var dt = new Date();
        var currentdate = dt.getDate() + '/' + (dt.getMonth() + 1) + '/' + dt.getFullYear();

        $('#txtprocesscomp').val(currentval[0]["Process"]);
        ProcessId = currentval[0]["ProcessId"];
        Styleid = currentval[0]["StyleId"];

        $('#txtwrkordnocomp').val(wrkordno);
        $('#txtplanrefnocomp').val(refno);
        $('#txtprdprgnocomp').val();
        $('#txtplancompunitcomp').val(compunit);
        $('#txtplanprogdatecomp').val(currentdate);

        var OrderNo = wrkordno;//"AXN-WRK00001";
        GenerateNumber();
        LoadItem();

    });


    $(document).on('click', '.btncompplanadd', function () {
        debugger;
        $('#myModal4').modal('show');
        $('#myModal4').show();
        $('#btnupdcomp').hide();
        $('#btndelcomp').hide();
        $('#btnsavecomp').show();
        // LoadProcessDDL("#ddloutputlstpro,#ddlinputlstpro");
        var tablesize = $('#comptable').DataTable();
        tablesize.clear().draw();
        //$('#comptable').DataTable().destroy();

        $('#ddlItem').val(0);
        $('#ddlColor').val(0);
        $('#ddlComponent').val(0);
        $('#compremarks').val("");
        var rowindex = $(this).closest('tr').index();
        var currentval = prodplanning.slice(rowindex);
        var wrkordno = $('#txtjobordno').val();
        var refno = $('#txtrefno').val();
        var compunit = $('#txtcompunit').val();

        var dt = new Date();
        var currentdate = dt.getDate() + '/' + (dt.getMonth() + 1) + '/' + dt.getFullYear();

        $('#txtprocesscomp').val(currentval[0]["Process"]);
        ProcessId = currentval[0]["ProcessId"];
        Styleid = currentval[0]["StyleId"];

        $('#txtwrkordnocomp').val(wrkordno);
        $('#txtplanrefnocomp').val(refno);
        $('#txtprdprgnocomp').val();
        $('#txtplancompunitcomp').val(compunit);
        $('#txtplanprogdatecomp').val(currentdate);

        var OrderNo = wrkordno;//"AXN-WRK00001";
        // LoadIOTable(OrderNo, "");
        GenerateNumber();
        LoadItem();

    });

    $(document).on('click', '.btnprodplanedit', function () {
        debugger;
        if (planamend == 0) {
            $("#btnupd").attr("disabled", false);
            Mode = 1;
            $('#myModal3').modal('show');
            $('#myModal3').show();
            $('#btnsave').hide();
            $('#btncancel').hide();

            var Dispatchchecked = $('#Status').is(":checked");
            if (Dispatchchecked) {
                DispatchClosed = "Y";
            }
            else {
                DispatchClosed = "N";
            }

            if (DispatchClosed == "N") {
                $('#btnupd').show();
            }
            else if (DispatchClosed == "Y") {
                $('#btnupd').hide();
            }           

            var tablesize = $('#Itable').DataTable();
            tablesize.clear().draw();
            var tablesize = $('#Otable').DataTable();
            tablesize.clear().draw();
            var rowindex = $(this).closest('tr').index();
            //$('#ddlinputbasepro').val("IT");
            //$('#ddloutputbasepro').val("OT");
            proIOList = [];
            var currentval = prodplanningedit.slice(rowindex);
            prodprgid = currentval[0]['ProProgId'];
            pid = currentval[0]['ProcessId'];
            pnum = currentval[0]['ProProgNo'];
            proname = currentval[0]['Process'];
            getprodlist(prodprgid);
            var JobNo = $('#txtjobordno').val();
            LoadlastPrgmDDL(JobNo, prodprgid);
        }
    });

    $(document).on('click', '.btnprodplanAppadd', function () {
        debugger;
        Mode = 1;
        $('#myModal3').modal('show');
        $('#myModal3').show();
        $('#btnsave').hide();
        $('#btncancel').hide();
        $('#btnupd').hide();
        $('#btnAppupd').show();
        $('#btnUnAppupd').hide();
        var tablesize = $('#Itable').DataTable();
        tablesize.clear().draw();

        var tablesize = $('#Otable').DataTable();
        tablesize.clear().draw();

        var rowindex = $(this).closest('tr').index();

        //$('#ddlinputbasepro').val("IT");
        //$('#ddloutputbasepro').val("OT");

        proIOList = [];

        var currentval = prodplanningedit.slice(rowindex);
        prodprgid = currentval[0]['ProProgId'];
        pid = currentval[0]['ProcessId'];
        pnum = currentval[0]['ProProgNo'];
        proname = currentval[0]['Process'];

        getprodlist(prodprgid);
        var JobNo = $('#txtjobordno').val();
        LoadlastPrgmDDL(JobNo, prodprgid);
    });

    //$(document).on('click', '.btnprodplanAppadd', function () {
    //    debugger;
    //    Mode = 1;
    //    $('#myModal3').modal('show');
    //    $('#myModal3').show();
    //    $('#btnsave').hide();
    //    $('#btncancel').hide();
    //    $('#btnupd').show();
    //    var tablesize = $('#Itable').DataTable();
    //    tablesize.clear().draw();

    //    var tablesize = $('#Otable').DataTable();
    //    tablesize.clear().draw();

    //    var rowindex = $(this).closest('tr').index();

    //    //$('#ddlinputbasepro').val("IT");
    //    //$('#ddloutputbasepro').val("OT");

    //    proIOList = [];

    //    var currentval = prodplanningedit.slice(rowindex);
    //    prodprgid = currentval[0]['ProProgId'];
    //    pid = currentval[0]['ProcessId'];
    //    pnum = currentval[0]['ProProgNo'];
    //    proname = currentval[0]['Process'];

    //    getprodlist(prodprgid);
    //    var JobNo = $('#txtjobordno').val();
    //    LoadlastPrgmDDL(JobNo, prodprgid);
    //});

    $(document).on('click', '.btncompplaneditaddApp', function () {
        debugger;
        Mode = 1;
        $('#myModal3').modal('show');
        $('#myModal3').show();
        $('#btnsave').hide();
        $('#btncancel').hide();
        //$('#btnupd').show();

        $('#btnAppupd').hide();
        $('#btnUnAppupd').show();

        var tablesize = $('#Itable').DataTable();
        tablesize.clear().draw();

        var tablesize = $('#Otable').DataTable();
        tablesize.clear().draw();

        var rowindex = $(this).closest('tr').index();

        //$('#ddlinputbasepro').val("IT");
        //$('#ddloutputbasepro').val("OT");

        proIOList = [];

        var currentval = prodplanningedit.slice(rowindex);
        prodprgid = currentval[0]['ProProgId'];
        pid = currentval[0]['ProcessId'];
        pnum = currentval[0]['ProProgNo'];
        proname = currentval[0]['Process'];
        var dc = currentval[0]['DcChk'];

        if (dc > 0) {
            //alert('DC made on this Process..')
            var msg = 'DC made on this Process...';
            var flg = 4;
            var mode = 1;
            var url = "";
            AlartMessage(msg, flg, mode, url);
            $("#btnUnAppupd").attr("disabled", true);
        }

        getprodlist(prodprgid);
        var JobNo = $('#txtjobordno').val();
        LoadlastPrgmDDL(JobNo, prodprgid);
    });


    $(document).on('click', '.btncompplanedit', function () {
        debugger;
        $('#myModal4').modal('show');
        $('#myModal4').show();
        $('#btnsavecomp').hide();
        $('#btndelcomp').hide();
        $('#btnupdcomp').show();

        // LoadProcessDDL("#ddloutputlstpro,#ddlinputlstpro");
        var rowindex = $(this).closest('tr').index();
        var currentval = prodplanningedit.slice(rowindex);
        var wrkordno = $('#txtjobordno').val();
        var refno = $('#txtrefno').val();
        var compunit = $('#txtcompunit').val();

        var dt = new Date();
        var currentdate = dt.getDate() + '/' + (dt.getMonth() + 1) + '/' + dt.getFullYear();

        $('#txtprocesscomp').val(currentval[0]["Process"]);
        ProcessId = currentval[0]["ProcessId"];
        Styleid = currentval[0]["StyleId"];

        $('#txtwrkordnocomp').val(wrkordno);
        $('#txtplanrefnocomp').val(refno);
        $('#txtprdprgnocomp').val(currentval[0]["ProProgNo"]);
        $('#txtplancompunitcomp').val(compunit);
        $('#txtplanprogdatecomp').val(currentdate);

        var OrderNo = wrkordno;//"AXN-WRK00001";
        LoadItem();
        var id = currentval[0]["ProProgId"];
        getcomplist(id);
    });



    $(document).on('click', '.btnprodplanaddedit', function () {
        debugger;
        $('#myModal3').modal('show');
        $('#myModal3').show();
        $('#btnsave').hide();
        $('#btncancel').hide();
        $('#btnupd').show();
        var rowindex = $(this).closest('tr').index();

        var currentval = prodplanningedit.slice(rowindex);
        prodprgid = currentval[0]['ProProgId'];
        pid = currentval[0]['ProcessId'];

        getprodlist(prodprgid);

    });


    $(document).on('click', '.btnprodplandelete', function () {
        debugger;

        $('#myModal3').modal('show');
        $('#btnsave').hide();
        $('#btnupd').hide();

        var Dispatchchecked = $('#Status').is(":checked");
        if (Dispatchchecked) {
            DispatchClosed = "Y";
        }
        else {
            DispatchClosed = "N";
        }

        if (DispatchClosed == "N") {
            $('#btncancel').show();
        }
        else if (DispatchClosed == "Y") {
            $('#btncancel').hide();
        }

        $("#btncancel").attr("disabled", false);
        var rowindex = $(this).closest('tr').index();


        var currentval = prodplanningedelete.slice(rowindex);
        proddelid = currentval[0]['ProProgId'];
        ProcessId = currentval[0]['ProcessId'];
        pnum = currentval[0]['ProProgNo'];
        prodpro = currentval[0]['Process'];
        getproddeletelist(proddelid);
        //proddelid;

    });


    $(document).on('click', '.btncompplandelete', function () {
        debugger;

        $('#myModal4').modal('show');
        $('#btnupdcomp').hide();
        $('#btndelcomp').show();
        $('#btnsavecomp').hide();
        var rowindex = $(this).closest('tr').index();


        var currentval = prodplanningedelete.slice(rowindex);
        compdelid = currentval[0]['ProProgId'];
        //pid = currentval[0]['ProcessId'];
        //getproddeletelist(compdelid);
        copnum = currentval[0]['ProProgNo'];
        comproc = currentval[0]['Process'];
        getcomplist(compdelid);
        //proddelid;

    });

    $('#btnInputadd').click(function () {
        debugger;
        var leng = 0;
        var isAllValid = true;

        if ($('#ddlInpItem').val() == "0") {
            //$('#ddlComponent').siblings('span.error').css('visibility', 'visible');
            //$('#ddlInpItem').css('border-color', 'Red');
            $('#ddlInpItem').siblings(".select2-container").css('border', '1px solid red');
            isAllValid = false;
        }
        else {
            //$('#ddlComponent').siblings('span.error').css('visibility', 'hidden');
            //$('#ddlInpItem').css('border-color', 'lightgrey');
            $('#ddlInpItem').siblings(".select2-container").css('border', '1px solid lightgrey');
        }

        if ($('#ddlInpColor').val() == "0") {
            isAllValid = false;
            // $('#ddlInpColor').css('border-color', 'Red');
            $('#ddlInpColor').siblings(".select2-container").css('border', '1px solid red');
        }
        else {
            //$('#ddlInpColor').css('border-color', 'lightgrey');
            $('#ddlInpColor').siblings(".select2-container").css('border', '1px solid lightgrey');

        }

        if ($('#ddlInpSize').val() == "0") {
            isAllValid = false;
            //$('#ddlInpSize').css('border-color', 'Red');
            $('#ddlInpSize').siblings(".select2-container").css('border', '1px solid red');
        }
        else {
            //$('#ddlInpSize').css('border-color', 'lightgrey');
            $('#ddlInpSize').siblings(".select2-container").css('border', '1px solid lightgrey');
        }
        if ($('#txtInpUnit').val() == "") {
            isAllValid = false;
            $('#txtInpUnit').css('border-color', 'Red');
        }
        else {
            $('#txtInpUnit').css('border-color', 'lightgrey');
        }
        if ($('#txtInpPgmQty').val() == "") {
            isAllValid = false;
            $('#txtInpPgmQty').css('border-color', 'Red');
        }
        else {
            $('#txtInpPgmQty').css('border-color', 'lightgrey');
        }


        if (inputlist.length == 0) {
            leng = 1;

        }
        else {
            leng = inputlist.length + 1;
        }
        var sec = 0;

        if ($('#txtInpSec').val() == "") {
            sec = 0;
        }
        else {
            sec = $('#txtInpSec').val();
        }

        if (isAllValid) {


            debugger;
            var compListObj = {
                Item: $("#ddlInpItem option:selected").text(),
                ItemId: $('#ddlInpItem').val(),
                Color: $("#ddlInpColor option:selected").text(),
                ColorId: $('#ddlInpColor').val(),
                Size: $("#ddlInpSize option:selected").text(),
                SizeId: $('#ddlInpSize').val(),
                uom: $('#txtInpUnit').val(),
                Quantity: $('#txtInpPgmQty').val(),
                SecQty: sec,// $('#txtInpSec').val(),
                Sno: leng,
                PSId: 0,
                CatType: $('#ddlInpType').val(),
                Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
            };
            inputlist.push(compListObj);
            loadInputProcess(inputlist);
            fnClearControls();
        }
    });

    $(document).on('click', '.btninedit', function () {
        debugger;
        Mode = 1;
        rowindex = $(this).closest('tr').index();
        var currentro12 = inputlist.slice(rowindex);
        $('#ddlInpItem').val(currentro12[0]['ItemId']).trigger('change');
        $('#ddlInpColor').val(currentro12[0]['ColorId']).trigger('change');
        $('#ddlInpSize').val(currentro12[0]['SizeId']).trigger('change');
        $('#txtInpUnit').val(currentro12[0]['uom']);
        $('#txtInpPgmQty').val(currentro12[0]['Quantity']);
        $('#txtInpSec').val(currentro12[0]['SecQty']);
        $('#ddlInpType').val(currentro12[0]['CatType']).trigger('change');



        var CItemId = currentro12[0]['ItemId'];
        var CSizeId = currentro12[0]['SizeId'];
        var CColorId = currentro12[0]['ColorId'];

        CheckPrgMadeEntry(CItemId, CColorId, CSizeId);

        $('#btnInputadd').hide();
        $('#btnInputupdate').show();
    });

    $('#btnInputupdate').click(function () {
        debugger;
        var currentrowsel = inputlist.slice(rowindex);

        currentrowsel[0]['ItemId'] = $("#ddlInpItem").val();
        currentrowsel[0]['Item'] = $("#ddlInpItem option:selected").text();
        currentrowsel[0]['ColorId'] = $("#ddlInpColor").val();
        currentrowsel[0]['Color'] = $("#ddlInpColor option:selected").text();
        currentrowsel[0]['SizeId'] = $("#ddlInpSize option:selected").val();
        currentrowsel[0]['Size'] = $("#ddlInpSize option:selected").text();
        currentrowsel[0]['uom'] = $("#txtInpUnit").val();

        currentrowsel[0]['Quantity'] = $("#txtInpPgmQty").val();
        currentrowsel[0]['SecQty'] = $("#txtInpSec").val();
        currentrowsel[0]['CatType'] = $("#ddlInpType").val();


        inputlist[rowindex] = currentrowsel[0];

        loadInputProcess(inputlist);
        fnClearControls();
        $('#btnInputupdate').hide();
        $('#btnInputadd').show();
    });

    $(document).on('click', '.btninremove', function () {
        debugger;

        rowindex = $(this).closest('tr').index();
        var currentrowsel = inputlist.slice(rowindex);
        var removegrp = $('input[name="optradioipprod"]:checked').attr('value');

        var CItemId = currentrowsel[0]['ItemId'];
        var CSizeId = currentrowsel[0]['SizeId'];
        var CColorId = currentrowsel[0]['ColorId'];

        var ordchk = 0;

        $.each(inputlist, function (i) {
            if (inputlist[i].Issue_qty > 0) {
                ordchk = 1;
            }
        });


        if (ordchk == 0 && removegrp != 'N') {


            if (ordchk == 0 && removegrp == 'I') {
                inputlist = $.grep(inputlist, function (e) {
                    return e.ItemId != CItemId;
                });

                loadInputProcess(inputlist);
            }

            if (ordchk == 0 && removegrp == 'C') {
                inputlist = $.grep(inputlist, function (e) {
                    return e.ColorId != CColorId;
                });

                loadInputProcess(inputlist);
            }
            if (ordchk == 0 && removegrp == 'S') {
                inputlist = $.grep(inputlist, function (e) {
                    return e.SizeId != CSizeId;
                });

                loadInputProcess(inputlist);
            }
        }
        else {
            CheckPrgMadeEntry(CItemId, CColorId, CSizeId);
            if (CEPGItemList.length == 0) {

                inputlist.splice(rowindex, 1);
                document.getElementById("Itable").deleteRow(rowindex + 1);
            }
        }
    });


    $('#btnOPadd').click(function () {
        debugger;
        var leng = 0;
        var isAllValid = true;

        if ($('#ddlOPItem').val() == "0") {
            //$('#ddlComponent').siblings('span.error').css('visibility', 'visible');

            $('#ddlOPItem').siblings(".select2-container").css('border', '1px solid red');
            isAllValid = false;
        }
        else {
            //$('#ddlComponent').siblings('span.error').css('visibility', 'hidden');

            $('#ddlOPItem').siblings(".select2-container").css('border', '1px solid lightgrey');
        }

        if ($('#ddlOPColor').val() == "0") {
            isAllValid = false;

            $('#ddlOPColor').siblings(".select2-container").css('border', '1px solid red');
        }
        else {

            $('#ddlOPColor').siblings(".select2-container").css('border', '1px solid lightgrey');
        }

        if ($('#ddlOPSize').val() == "0") {
            isAllValid = false;

            $('#ddlOPSize').siblings(".select2-container").css('border', '1px solid red');
        }
        else {

            $('#ddlOPSize').siblings(".select2-container").css('border', '1px solid lightgrey');
        }
        if ($('#txtOPUnt').val() == "") {
            isAllValid = false;

            // $('#txtOPUnt').siblings(".select2-container").css('border', '1px solid red');
            $('#txtOPUnt').css('border-color', 'Red');
        }
        else {

            //$('#txtOPUnt').siblings(".select2-container").css('border', '1px solid lightgrey');
            $('#txtOPUnt').css('border-color', 'lightgrey');
        }
        if ($('#txtOPPgmQty').val() == "") {
            isAllValid = false;

            // $('#txtOPPgmQty').siblings(".select2-container").css('border', '1px solid red');
            $('#txtOPPgmQty').css('border-color', 'Red');
        }
        else {

            //$('#txtOPPgmQty').siblings(".select2-container").css('border', '1px solid lightgrey');
            $('#txtOPPgmQty').css('border-color', 'lightgrey');
        }


        if (outputlist.length == 0) {
            leng = 1;

        }
        else {
            leng = outputlist.length + 1;
        }
        var sec = 0;

        if ($('#txtOPSecqty').val() == "") {
            sec = 0;
        }
        else {
            sec = $('#txtOPSecqty').val();
        }

        if (isAllValid) {


            debugger;
            var compListObj = {
                Item: $("#ddlOPItem option:selected").text(),
                ItemId: $('#ddlOPItem').val(),
                Color: $("#ddlOPColor option:selected").text(),
                ColorId: $('#ddlOPColor').val(),
                Size: $("#ddlOPSize option:selected").text(),
                SizeId: $('#ddlOPSize').val(),
                uom: $('#txtOPUnt').val(),
                Quantity: $('#txtOPPgmQty').val(),
                SecQty: sec,//$('#txtOPSecqty').val(),
                Sno: leng,
                PSId: 0,
                CatType: $('#ddlOPType').val(),
                Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
            };
            outputlist.push(compListObj);
            loadOutputProcess(outputlist);
            fnClearOpControls();
        }
    });

    $(document).on('click', '.btnoutedit', function () {
        debugger;
        Mode = 1;
        rowindex = $(this).closest('tr').index();
        var currentro12 = outputlist.slice(rowindex);
        $('#ddlOPItem').val(currentro12[0]['ItemId']).trigger('change');
        $('#ddlOPColor').val(currentro12[0]['ColorId']).trigger('change');
        $('#ddlOPSize').val(currentro12[0]['SizeId']).trigger('change');
        $('#txtOPUnt').val(currentro12[0]['uom']);
        $('#txtOPPgmQty').val(currentro12[0]['Quantity']);
        $('#txtOPSecqty').val(currentro12[0]['SecQty']);
        $('#ddlOPType').val(currentro12[0]['CatType']).trigger('change');


        var CItemId = currentro12[0]['ItemId'];
        var CSizeId = currentro12[0]['SizeId'];
        var CColorId = currentro12[0]['ColorId'];

        CheckPrgMadeOutEntry(CItemId, CColorId, CSizeId);

        $('#btnOPadd').hide();
        $('#btnOPupdate').show();
    });

    $('#btnOPupdate').click(function () {
        debugger;




        var currentrowsel = outputlist.slice(rowindex);

        currentrowsel[0]['ItemId'] = $("#ddlOPItem").val();
        currentrowsel[0]['Item'] = $("#ddlOPItem option:selected").text();
        currentrowsel[0]['ColorId'] = $("#ddlOPColor").val();
        currentrowsel[0]['Color'] = $("#ddlOPColor option:selected").text();
        currentrowsel[0]['SizeId'] = $("#ddlOPSize option:selected").val();
        currentrowsel[0]['Size'] = $("#ddlOPSize option:selected").text();
        currentrowsel[0]['uom'] = $("#txtOPUnt").val();

        currentrowsel[0]['Quantity'] = $("#txtOPPgmQty").val();

        currentrowsel[0]['SecQty'] = $("#txtOPSecqty").val();
        currentrowsel[0]['CatType'] = $("#ddlOPType").val();


        outputlist[rowindex] = currentrowsel[0];

        loadOutputProcess(outputlist);
        fnClearOpControls();
        $('#btnOPupdate').hide();
        $('#btnOPadd').show();
    });
    $(document).on('click', '.btnoutremove', function () {
        debugger;

        rowindex = $(this).closest('tr').index();
        var currentrowsel = outputlist.slice(rowindex);
        var removegrp = $('input[name="optradioopprod"]:checked').attr('value');

        var CItemId = currentrowsel[0]['ItemId'];
        var CSizeId = currentrowsel[0]['SizeId'];
        var CColorId = currentrowsel[0]['ColorId'];


        var ordchk = 0;

        $.each(outputlist, function (i) {
            if (outputlist[i].order_qty > 0) {
                ordchk = 1;
            }
        });


        if (ordchk == 0 && removegrp != 'N') {


            if (ordchk == 0 && removegrp == 'I') {
                outputlist = $.grep(outputlist, function (e) {
                    return e.ItemId != CItemId;
                });

                loadOutputProcess(outputlist);
            }

            if (ordchk == 0 && removegrp == 'C') {
                outputlist = $.grep(outputlist, function (e) {
                    return e.ColorId != CColorId;
                });

                loadOutputProcess(outputlist);
            }
            if (ordchk == 0 && removegrp == 'S') {
                outputlist = $.grep(outputlist, function (e) {
                    return e.SizeId != CSizeId;
                });

                loadOutputProcess(outputlist);
            }
        }


        else {

            CheckPrgMadeOutEntry(CItemId, CColorId, CSizeId);

            if (CEPGOItemList.length == 0) {
                outputlist.splice(rowindex, 1);
                document.getElementById("Otable").deleteRow(rowindex + 1);
            }
        }
    });

});

function fnClearOpControls() {
    debugger;
    $('#ddlOPItem').val('0').trigger('change');
    $('#ddlOPColor').val('0').trigger('change');
    $('#ddlOPSize').val('0').trigger('change');
    $('#txtOPUnt').val('');
    $('#txtOPPgmQty').val('');
    $('#txtOPSecqty').val('');
    // $('#ddlOPType').val('OT');

}

function fnClearControls() {
    debugger;
    $('#ddlInpItem').val('0').trigger('change');
    $('#ddlInpColor').val('0').trigger('change');
    $('#ddlInpSize').val('0').trigger('change');
    $('#txtInpUnit').val('');
    $('#txtInpPgmQty').val('');
    $('#txtInpSec').val('');
    // $('#ddlInpType').val('IT');

}
function myinpOrder(Val) {
    debugger;
    var foo = [];
    MOrd = 0;


    $('#ddlinputbasepro :selected').each(function (i, selected) {
        foo[i] = $(selected).val();

        MOrd = MOrd + "," + foo[i];


    });
    var wrkordno = $('#txtjobordno').val();

    var OrderNo = wrkordno;
    LoadIOTable(OrderNo, MOrd, "Input");

}

function myoutOrder(Val) {

    var foo = [];
    MOrd = 0;
    $('#ddloutputbasepro :selected').each(function (i, selected) {
        foo[i] = $(selected).val();
        MotOrd = MotOrd + "," + foo[i];
    });

    var wrkordno = $('#txtjobordno').val();
    var OrderNo = wrkordno;
    LoadIOTable(OrderNo, MotOrd, "Output");


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


}

function editaddlist() {
    debugger;
    var cid;//= $('#ddlMCompany').val();
    var byrid;// = $('#ddlMBuyer').val();
    var cunitid;// = $('#ddlprounit').val();
    var ordno;// = $('#ddlMOrderNo').val();
    var refno;// = $('#ddlMRefNo').val();
    var otype;// = $('#ddlproType').val();
    var pgmtype;
    var mode = 1;

    var otype = $("input[name='optionsRadios']:checked").val();


    $.ajax({
        url: "/ProcessProgram/GetProdProgrammingListAdd/",
        data: JSON.stringify({ cmpnyid: cid, buyerid: byrid, cmpnyunitid: cunitid, orderno: ordno, refno: refno, ordertype: otype, prgmtype: pgmtype, mode: mode }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            list = result.Value;

            $('#tblProdPro').DataTable().destroy();
            $('#tblProdPro').DataTable({
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
                    { title: "ID", data: "JMasId", "visible": false },
                    { title: "Company ID", data: "CompanyId", "visible": false },
                    { title: "Company Unit ID", data: "CompanyUnitId", "visible": false },
                    { title: "Work Order No", data: "JobOrderNo" },
                    { title: "Ref No", data: "RefNo" },
                    { title: "Style", data: "Style" },
                    { title: "Comp Unit", data: "CompanyUnit" },
                    { title: "Buyer", data: "Buyer" },
                    { title: "Quantity", data: "Quantity" },
                       {
                           title: "ACTION", "mDataProp": null,
                           "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Add" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" data-toggle="modal" data-target="#myModal2"  class="btnprodproadd btn btn-round btn-success"> <i class="fa fa-plus"></i> </button>'
                       }
                ]
            });


        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}

function loadAddlist() {
    debugger;
    var cid = $('#ddlMCompany').val();
    var byrid = $('#ddlMBuyer').val();
    if (byrid == '0') {
        byrid = null;
    }
    var cunitid = $('#ddlprounit').val();
    if (cunitid == '0') {
        cunitid = null;
    }
    var ordno = $('#ddlMOrderNo').val();
    if (ordno == '0') {
        ordno = null;
    } else {
        ordno = $("#ddlMOrderNo option:selected").text();
    }
    var refno = $('#ddlMRefNo').val();
    if (refno == '0') {
        refno = null;
    } else {
        refno = $("#ddlMRefNo option:selected").text();
    }
    //var otype = $('#ddlproType').val();
    //if (otype == 'P') {
    //    var ordty = 'W';
    //}
    var ordty = $("input[name='optionsRadios']:checked").val();

    var pgmtype = "";
    var mode = 0;

    $.ajax({
        url: "/ProcessProgram/GetProdProgrammingListAdd/",
        data: JSON.stringify({ cmpnyid: cid, buyerid: byrid, cmpnyunitid: cunitid, orderno: ordno, refno: refno, ordertype: ordty, prgmtype: pgmtype, mode: mode }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            list = result.Value;
            //if (list != undefined) {
            //    AddList = list;
            //    loadProdProgramming(AddList);
            //}

            //LoadCompanyDDL("#ddlMCompany");
            //LoadBuyerDDL("#ddlMBuyer");
            //LoadOrderNoDDL("#ddlMOrderNo");
            //LoadRefNoDDL("#ddlMRefNo");

            $('#tblProdPro').DataTable().destroy();
            $('#tblProdPro').DataTable({
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
                    { title: "ID", data: "JMasId", "visible": false },
                    { title: "Company ID", data: "CompanyId", "visible": false },
                    { title: "Company Unit ID", data: "CompanyUnitId", "visible": false },
                    { title: "Work Order No", data: "JobOrderNo" },
                    { title: "Ref No", data: "RefNo" },
                    { title: "Style", data: "Style" },
                    { title: "Comp Unit", data: "CompanyUnit" },
                    { title: "Buyer", data: "Buyer" },
                    { title: "Quantity", data: "Quantity" },
                       {
                           title: "ACTION", "mDataProp": null,
                           "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Add" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" data-toggle="modal" data-target="#myModal2"  class="btnprodproadd btn btn-round btn-success"> <i class="fa fa-plus"></i> </button>'
                       }
                ]
            });
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}



var styid, joborwrk;


function LoadItem() {
    debugger;
    var jobOrderno = $('#txtwrkordnocomp').val();
    styid = Styleid,
    joborwrk = 'W'
    debugger;
    $.ajax({
        url: "/ProcessProgram/GetItemList/",
        data: JSON.stringify({ JobOrderNo: jobOrderno, styleid: styid, JoborWrk: joborwrk }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            $("#ddlItem").empty();
            $("#ddlItem").append($('<option/>').val('0').text('--Select Item--'));
            $.each(obj, function () {
                $("#ddlItem").append($("<option></option>").val(this.itemid).text(this.item));

            });
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}
var itmid;
function getitemid(id) {
    debugger;
    itmid = id;
    var jobOrderno = $('#txtwrkordnocomp').val();
    styid = Styleid,
    joborwrk = 'W'
    debugger;
    $.ajax({
        url: "/ProcessProgram/GetColorList/",
        data: JSON.stringify({ JobOrderNo: jobOrderno, styleid: styid, JoborWrk: joborwrk, itemid: id }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            $("#ddlColor").empty();
            $("#ddlColor").append($('<option/>').val('0').text('--Select Color--'));
            $.each(obj, function () {
                $("#ddlColor").append($("<option></option>").val(this.colorid).text(this.color));

            });
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}
var clrid;
function getcolorid(id) {
    clrid = id;
    debugger;
    itmid
    var jobOrderno = $('#txtwrkordnocomp').val();
    styid = Styleid,
    joborwrk = 'W'
    debugger;
    $.ajax({
        url: "/ProcessProgram/GetComponentList/",
        data: JSON.stringify({ JobOrderNo: jobOrderno, styleid: styid, JoborWrk: joborwrk, itemid: itmid, colorid: id }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            $("#ddlComponent").empty();
            $("#ddlComponent").append($('<option/>').val('0').text('--Select Component--'));
            $.each(obj, function () {
                $("#ddlComponent").append($("<option></option>").val(this.componentid).text(this.component));

            });
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
var table, column, compId, Docum;

function GenerateNumber(table, column, compId, Docum) {

    debugger;
    table = "Prod_Prg_Mas",
    column = "ProdPrgNo",
    compId = CompanyId,
    Docum = 'PRODUCTION PROGRAM'

    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $('#txtprdprgno').val(result.Value);
            $('#txtprdprgnocomp').val(result.Value);
        }
    });
}

function getcomponentid(id) {
    itmid, clrid, id;
    var jobOrderno = $('#txtwrkordnocomp').val();
    styid = Styleid

    debugger;
    $.ajax({
        url: "/ProcessProgram/GetComponentDetList/",
        data: JSON.stringify({ JobOrderNo: jobOrderno, styleid: styid, itemid: itmid, colorid: clrid, componentid: id }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            detlist = json.Value;
            LoadComptable(detlist);


        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadComptable(list) {
    $('#comptable').DataTable().destroy();
    $('#comptable').DataTable({
        data: list,
        columns: [
           { title: "Itemid", data: "itemid", "visible": false },
           { title: "Colorid", data: "colorid", "visible": false },
           { title: "CColorid", data: "CColorid", "visible": false },
           { title: "Sizeid", data: "sizeid", "visible": false },
           { title: "Componentid", data: "componentid", "visible": false },

            { title: "Input Item", data: "item" },
            { title: "Component", data: "nocomps" },
            { title: "Category 1", data: "size" },
            { title: "Category 2", data: "color" },
            {
                title: "Program Qty", data: "prodqty",
                render: function (data) {

                    return '<input type="text" id="txtprodqty" class="txtprodqty"  style="width: 50px;text-align: center;" value=' + data + '  >';

                },
            },
           // { title: "Type" },
            { title: "Required", data: "required" },

        ]
    });
}

var iputlist = new Array();
var oputlist = new Array();
function LoadIOTable(Orderno, MOrd, LgType) {
    debugger;
    $.ajax({
        url: "/ProcessProgram/GetIOProcessList",
        data: JSON.stringify({ OrderNo: Orderno, ioType: MOrd }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;

            if (obj != undefined) {
                proIOList = obj;

                if (LgType == "Input") {
                    if (Mode == 1) {
                        var ilist = [];
                        for (var i = 0; proIOList.length > i; i++) {
                            ilist.push(proIOList[i]);
                        }
                        for (var i = 0; Inputeditlist.length > i; i++) {
                            ilist.push(Inputeditlist[i]);
                        }
                        inputlist = ilist;
                        loadInputProcess(inputlist);
                    }
                    else {
                        loadInputProcess(proIOList);
                        iputlist = proIOList;
                        inputlist = iputlist;
                    }
                }
                else if (LgType == "Output") {

                    if (Mode == 1) {
                        var olist = [];
                        for (var i = 0; proIOList.length > i; i++) {
                            olist.push(proIOList[i]);
                        }
                        for (var i = 0; Outputeditlist.length > i; i++) {
                            olist.push(Outputeditlist[i]);
                        }
                        outputlist = olist;
                        loadOutputProcess(outputlist);
                    }
                    else {

                        loadOutputProcess(proIOList);
                        oputlist = proIOList;
                        outputlist = oputlist;
                    }
                }
            }
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function loadInputProcess(list) {
    $('#Itable').DataTable().destroy();
    debugger;
    list.sort(function (a, b) {
        return a.Sno - b.Sno;
    });
    $('#Itable').DataTable({
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
            if (data.Issue_qty > 0) {
                $('td', row).css('background-color', '#FCF3CF');

            }

        },

        columns: [
             { title: "Sno", data: "Sno", "visible": false },
            { title: "PSId", data: "PSId", "visible": false },
            { title: "ItemId", data: "ItemId", "visible": false },
            { title: "ColorId", data: "ColorId", "visible": false },
              { title: "SizeId", data: "SizeId", "visible": false },
            { title: "Input Item", data: "Item" },
            { title: "Category 1", data: "Color" },
            { title: "Category 2", data: "Size" },
            { title: "Unit", data: "uom" },
            {
                title: "Program Qty", data: "Quantity",
                render: function (data) {
                    return '<input type="text" class="form-control txtinpgmqt"  style="width: 50px;text-align: center;" value=' + data + ' >';

                },
            },
            {
                title: "Sec Qty", data: "SecQty",
                render: function (data) {
                    return '<input type="text" class="form-control txtinpsecqt"  style="width: 50px;text-align: center;" value=' + data + ' >';

                },
            },
            { title: "Type", data: "CatType" },
            {
                title: "Required", data: "Required", "visible": false,
                render: function (data) {
                    return '<input type="checkbox" id="chkbx" checked="checked"/>';
                },
            },
               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<div style="display:inline-flex;"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btninedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btninremove btn btn-danger btn-round"> <i class="fa fa-times"></i> </button></div>'
               }
        ]
    });
    TotalPgmQty();
}

function loadInputProcessEdit(list) {
    debugger;
    $('#Itable').DataTable().destroy();
    debugger;
    list.sort(function (a, b) {
        return a.Sno - b.Sno;
    });
    $('#Itable').DataTable({
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
            if (data.Issue_qty > 0) {
                $('td', row).css('background-color', '#FCF3CF');

            }

        },
        columns: [
             { title: "Sno", data: "Sno", "visible": false },
            { title: "PSId", data: "PSId", "visible": false },
            { title: "ItemId", data: "ItemId", "visible": false },
            { title: "ColorId", data: "ColorId", "visible": false },
              { title: "SizeId", data: "SizeId", "visible": false },
            { title: "Input Item", data: "Item" },
            { title: "Category 1", data: "Color" },
            { title: "Category 2", data: "Size" },
            { title: "Unit", data: "uom" },
            {
                title: "Program Qty", data: "Prog_Op_Qty",
                render: function (data) {
                    return '<input type="text" class="form-control txtinpgmqt"  style="width: 50px;text-align: center;" value=' + data + ' >';

                },
            },
            {
                title: "Sec Qty", data: "SecQty",
                render: function (data) {
                    return '<input type="text" class="form-control txtinpsecqt"  style="width: 50px;text-align: center;" value=' + data + ' >';

                },
            },
            { title: "Type", data: "CatType" },
            {
                title: "Required", data: "Required", "visible": false,
                render: function (data) {
                    return '<input type="checkbox" id="chkbxop" checked="checked"/>';
                },
            },
               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<div style="display:inline-flex;"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btninedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btninremove btn btn-danger btn-round"> <i class="fa fa-times"></i> </button></div>'
               }
        ]
    });
    TotalPgmQty();
}

function loadOutputProcess(list) {
    $('#Otable').DataTable().destroy();
    debugger;
    list.sort(function (a, b) {
        return a.Sno - b.Sno;
    });
    $('#Otable').DataTable({
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
            if (data.order_qty > 0) {
                $('td', row).css('background-color', '#FCF3CF');

            }

        },
        columns: [
             { title: "Sno", data: "Sno", "visible": false },
            { title: "PSId", data: "PSId", "visible": false },
            { title: "ItemId", data: "ItemId", "visible": false },
             { title: "ColorId", data: "ColorId", "visible": false },
              { title: "SizeId", data: "SizeId", "visible": false },
            { title: "Output Item", data: "Item" },
            { title: "Category 1", data: "Color" },
            { title: "Category 2", data: "Size" },
            { title: "Unit", data: "uom" },
            {
                title: "Program Qty", data: "Quantity",
                render: function (data) {
                    return '<input type="text" class="form-control txtoppgmqt"  style="width: 50px;text-align: center;" value=' + data + ' >';

                },
            },
            {
                title: "Sec Qty", data: "SecQty",
                render: function (data) {
                    return '<input type="text" class="form-control txtopsecqt"  style="width: 50px;text-align: center;" value=' + data + ' >';

                },
            },
            { title: "Type", data: "CatType" },
            {
                title: "Required", data: "Required", "visible": false,
                render: function (data) {
                    return '<input type="checkbox" id="chkbxop" checked="checked"/>';
                },
            },
               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<div style="display:inline-flex;"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnoutedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnoutremove btn btn-danger btn-round"> <i class="fa fa-times"></i> </button></div>'
               }
        ]
    });
    TotalPgmQty();
}

function loadOutputProcessedit(List) {
    $('#Otable').DataTable().destroy();
    debugger;
    List.sort(function (a, b) {
        return a.Sno - b.Sno;
    });
    $('#Otable').DataTable({
        data: List,
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
            if (data.order_qty > 0) {
                $('td', row).css('background-color', '#FCF3CF');

            }

        },
        columns: [
             { title: "Sno", data: "Sno", "visible": false },
            { title: "PSId", data: "Prodprgdetid", "visible": false },
            { title: "ItemId", data: "ItemId", "visible": false },
             { title: "ColorId", data: "ColorId", "visible": false },
              { title: "SizeId", data: "SizeId", "visible": false },
            { title: "Output Item", data: "Item" },
            { title: "Category 1", data: "Color" },
            { title: "Category 2", data: "Size" },
            { title: "Unit", data: "uom" },
            {
                title: "Program Qty", data: "Prog_Op_Qty",
                render: function (data) {
                    return '<input type="text" class="form-control txtoppgmqt"  style="width: 50px;text-align: center;" value=' + data + ' >';

                },
            },
            {
                title: "Sec Qty", data: "SecQty",
                render: function (data) {
                    return '<input type="text" class="form-control txtopsecqt"  style="width: 50px;text-align: center;" value=' + data + ' >';

                },
            },
            { title: "Type", data: "CatType" },
            {
                title: "Required", data: "Required", "visible": false,
                render: function (data) {
                    return '<input type="checkbox" id="chkbxop" checked="checked"/>';
                },
            },
               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<div style="display:inline-flex;"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnoutedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnoutremove btn btn-danger btn-round"> <i class="fa fa-times"></i> </button></div>'
               }
        ]
    });
    TotalPgmQty();
}

function getbyAddID(id) {
    debugger;
    eid = id;
    comeid = eid;
    for (var d = 0; d < loadlist.length; d++) {
        if (loadlist[d].JMasId == id && loadlist[d].Programtype == 'G') {
            getbyidOpen(id);
            return true;
        }
    }

    var AppprgType = $('input[name="AppprgType"]:checked').attr('value');

    var AppType = $('input[name="AppType"]:checked').attr('value');

    debugger;
    $("#myModal2").modal('show');
    $('#tblprodprocess').DataTable().destroy();
    $.ajax({
        type: "POST",
        url: '/ProcessProgram/GetProdPlanningEditList/',
        data: JSON.stringify({ Id: id, prgmtype: Gp, AppprgType: AppprgType, AppType: AppType }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            prodplanningEditList = json;


            var tableload = json.data;
            var dataSet = eval("[" + tableload + "]");
            // $('#tPAbody').DataTable({
            $('#tblprodprocess').DataTable().destroy();

            $('#tblprodprocess').DataTable({
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
                         { title: "JobMasID", "visible": false },
                         { title: "ProcessID", "visible": false },
                         { title: "Process" },
                         { title: "Prod Prg No" },
                         {
                             title: "Program Date"
                             //render: function (data) {
                             //    return (moment(data).format("DD/MM/YYYY"));
                             //}
                         },


                          {
                              title: "MaxSeqNo"
                              //render: function (data) {
                              //    return (moment(data).format("DD/MM/YYYY"));
                              //}
                          },

                             {
                                 title: "Program"//, "mDataProp": null,

                                 // "sDefaultContent": '<button type="button" data-toggle="modal" data-target="#myModal3" id="btnprod" class="btnprodplanadd"> Add </button>'
                             },

                ]
            });
            getbyidedit(id);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}


function loaduominp() {
    debugger;
    var itm = $('select#ddlInpItem option:selected').val();

    $.ajax({
        url: "/OpeningStock/GetUom",
        data: JSON.stringify({ itmid: itm }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            var obj = result.Value;
            $('#txtInpUnit').val(obj[0].unit);

        }

    });
}

function loaduomout() {
    debugger;
    var itm = $('select#ddlOPItem option:selected').val();

    $.ajax({
        url: "/OpeningStock/GetUom",
        data: JSON.stringify({ itmid: itm }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            var obj = result.Value;
            $('#txtOPUnt').val(obj[0].unit);

        }

    });
}

function loadprocessvar(val) {
    debugger;

    if (val >= 0) {
        for (var d = 0; d < outputlist.length; d++) {
            var qty = outputlist[d].SecQty;
            var res = 0;
            res = (val * qty) / 100;
            res = res + qty;
            res = res.toFixed(2);
            outputlist[d].Prog_Op_Qty = res;
        }
        loadOutputProcessedit(outputlist);
    }
    else if (val < 0) {
        //val = -(val);
        for (var d = 0; d < outputlist.length; d++) {
            var qty = outputlist[d].SecQty;
            var res = 0;
            res = -((val * qty) / 100);
            res = qty - res;
            res = res.toFixed(2);
            outputlist[d].Prog_Op_Qty = res;
        }
        loadOutputProcessedit(outputlist);
    }
}
function clearTextBox() {
    $('#ddlproCompany').empty();
    $('#ddlproBuyer').empty();
    $('#ddlprounit').empty();
    $('#ddlOrderNo').empty();
    $('#ddlproRefNo').empty();
    $('#ddlproType').empty();

    //$('#ddlinputbasepro').val(0);
    //$('#ddloutputbasepro').val(0);

    $('#Itable').DataTable().destroy();
    $('#Otable').DataTable().destroy();
    //$('#btnUpdate').hide();
    //$('#btnAdd').show();
    //$('#txtorderno').css('border-color', 'lightgrey');
    //$('#txtrefno').css('border-color', 'lightgrey');    

    $('#txtFromDate').val(moment(new Date()).format('DD/MM/YYYY'));
    $('#txtToDate').val(moment(new Date()).format('DD/MM/YYYY'));
}

function loadProductionProgramming() {
    debugger;
    $("#optworkorder").prop('checked', true);
    //$('#ddlMBuyer').empty();
    //$('#ddlMOrderNo').empty();
    //$('#ddlMCompany').empty();

    //LoadCompanyDDL("#ddlMCompany");
    //LoadBuyerDDL("#ddlMBuyer");
    //LoadOrderNoDDL("#ddlMOrderNo");
    //LoadRefNoDDL("#ddlMRefNo");

    debugger;
    var cmpid = $('#ddlproCompany').val();
    var FromDate = $('#txtFromDate').val();
    var ToDate = $('#txtToDate').val();
    debugger;
    $.ajax({
        url: "/ProcessProgram/GetProdProgrammingList",
        data: JSON.stringify({ FromDate: FromDate, ToDate: ToDate, CompanyId: cmpid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;

            if (obj != undefined) {
                prodproList = obj;
                loadProdProgramming(prodproList);
            }
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}

function loadProdProgramming(prodList) {
    $('#tblProdPro').DataTable().destroy();
    debugger;

    $('#tblProdPro').DataTable({
        data: prodList,
        columns: [
            { title: "ID", data: "JMasId", "visible": false },
            { title: "Company ID", data: "CompanyId", "visible": false },
            { title: "Company Unit ID", data: "CompanyUnitId", "visible": false },
            { title: "Work Order No", data: "JobOrderNo" },
            { title: "Ref No", data: "RefNo" },
            { title: "Style", data: "Style" },
            { title: "Comp Unit", data: "CompanyUnit" },
            { title: "Buyer", data: "Buyer" },
            { title: "Quantity", data: "Quantity" },
               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<button type="button" data-toggle="modal" data-target="#myModal2" > Add </button>'
               }
        ]
    });
}

function fnloadProductionPlanning(currentval) {
    debugger;
    $('#tblprodprocess').DataTable().destroy();

    $('#txtjobordno').val(currentval[0]["JobOrderNo"]);
    $('#txtbuyer').val(currentval[0]["Buyer"]);
    $('#txtrefno').val(currentval[0]["RefNo"]);
    $('#txtstyle').val(currentval[0]["Style"]);
    $('#txtcompunit').val(currentval[0]["CompanyUnit"]);
    $('#txtqty').val(currentval[0]["Quantity"]);
    CompanyId = currentval[0]["CompanyId"];
    CompanyUnitId = currentval[0]["CompanyUnitId"];
    Ordertype = currentval[0]["Ordertype"];
    Programtype = currentval[0]["Programtype"];
    LockAcc();
    LockDet();
    $(":checkbox").each(function () {
        ischecked = $('#Openprg').is(":checked");

        if (ischecked) {
            Progtype = "G";
        }
        else {
            Progtype = "P";
        }

    });
    debugger;
    var JobOrderNo = currentval[0]["JobOrderNo"];// "AXO-WRK00001";//$('#');

    Programtype = Progtype;

    //if (prdprgid > 0) {
    //    ordertype = OrdEtype;
    //    Programtype = PrgEtype;
    //}
    $.ajax({
        type: "POST",
        url: '/ProcessProgram/GetProdPlanningList/',
        data: JSON.stringify({ JobOrderNo: JobOrderNo, ordertype: Ordertype, Programtype: Programtype }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            prodplanningList = json.Value;
            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");
            $('#tblprodprocess').DataTable({
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
                         { title: "JobMasID", "visible": false },
                         { title: "ProcessID", "visible": false },
                         { title: "Process" },
                         { title: "Prod Prg No" },
                         {
                             title: "Program Date"
                             //render: function (data) {
                             //    return (moment(data).format("DD/MM/YYYY"));
                             //}
                         },


                          { title: "Max SeqNo" },
                             {
                                 title: "Program"//, "mDataProp": null,

                                 // "sDefaultContent": '<button type="button" data-toggle="modal" data-target="#myModal3" id="btnprod" class="btnprodplanadd"> Add </button>'
                             },

                ]
            });
            // load();


        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function fnloadProductionPlanninglist(currentval) {

    $('#tblprodprocess').DataTable().destroy();

    $('#txtjobordno').val(currentval[0]["JobOrderNo"]);
    $('#txtbuyer').val(currentval[0]["Buyer"]);
    $('#txtrefno').val(currentval[0]["RefNo"]);
    $('#txtstyle').val(currentval[0]["Style"]);
    $('#txtcompunit').val(currentval[0]["CompanyUnit"]);
    $('#txtqty').val(currentval[0]["Quantity"]);
    CompanyId = currentval[0]["CompanyId"];
    CompanyUnitId = currentval[0]["CompanyUnitId"];
    Ordertype = currentval[0]["Ordertype"];
    Programtype = currentval[0]["Programtype"];
    debugger;
    var JobOrderNo = currentval[0]["JobOrderNo"];// "AXO-WRK00001";//$('#');
    $(":checkbox").each(function () {
        ischecked = $('#Openprg').is(":checked");

        if (ischecked) {
            Progtype = "G";
        }
        else {
            Progtype = "P";
        }

    });
    Programtype = Progtype;
    $.ajax({
        type: "POST",
        url: '/ProcessProgram/GetProdPlanning/',
        data: JSON.stringify({ JobOrderNo: JobOrderNo, Ordertype: Ordertype, Programtype: Programtype }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            prodplanning = json.Value;
            prod = json.data;



            //$('#tblprodprocess').DataTable({
            //    data: json,
            //    columns: [
            //             { title: "JobMasID", data: "Id", "visible": false },
            //             { title: "ProcessID", data: "ProcessId", "visible": false },
            //             { title: "Process", data: "Process" },
            //             { title: "Prod Prg No", data: "ProProgNo" },
            //             {
            //                 title: "Program Date", data: "ProProgDate",
            //                 //render: function (data) {
            //                 //    return (moment(data).format("DD/MM/YYYY"));
            //                 //}
            //             },

            //                 {
            //                     title: "Program"//, "mDataProp": null,

            //                     // "sDefaultContent": '<button type="button" data-toggle="modal" data-target="#myModal3" id="btnprod" class="btnprodplanadd"> Add </button>'
            //                 },

            //    ]
            //});



        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}


function fncloseProcessList() {
    $('#myModal2').hide();
}

function AddProd() {
    debugger;

    //if (AccLock.length > 0) {
    //    $.each(AccLock, function (i) {

    //        if (AccLock[i].Processid == ProcessId) {
    //            alert('Process has been Locked,Please Contact Administrator..');
    //            return true;
    //        }
    //    });
    //}
    //if (PlanLock.length > 0) {
    //    if (PlanLock[0].LockPlanning == 'Y') {
    //        alert('Processprogram Add has been Locked,Please Contact Administrator..');
    //        return true;
    //    }
    //}

    iplist = new Array();
    oplist = new Array();
    Datas = new Array();
    iputlist = [];
    iputlist = inputlist;



    for (var c = 0; c < iputlist.length; c++) {
        var list = {
            Prodprgdetid: $('#txtProddetid').val(),
            Prodprgid: $('#txtProdPrgid').val(),
            Prog_Op_Qty: iputlist[c].Quantity,// $(tr).find('td:eq(7)').text(),
            ActualPlan_Qty: iputlist[c].Quantity,//$(tr).find('td:eq(7)').text(),
            AltItem: 'N',
            Amended: 'Y',
            Issue_qty: 0.00,
            order_qty: 0.00,
            Itemid: iputlist[c].ItemId, // $(tr).find('td:eq(0)').text()
            Colorid: iputlist[c].ColorId,//$(tr).find('td:eq(1)').text(),
            Sizeid: iputlist[c].SizeId,// $(tr).find('td:eq(2)').text(),
            InorOut: "I",
            SecQty: iputlist[c].SecQty,//$(tr).find('td:eq(8)').text(),
            CatType: iputlist[c].Type,// $(tr).find('td:eq(9)').text(),
            Required: iputlist[c].Required,//1

        }
        iplist.push(list);
    }
    oputlist = [];
    oputlist = outputlist;
    for (var e = 0; e < oputlist.length; e++) {
        var list = {
            Prodprgdetid: $('#txtProddetid').val(),
            Prodprgid: $('#txtProdPrgid').val(),
            Prog_Op_Qty: oputlist[e].Quantity,// $(tr).find('td:eq(7)').text(),
            ActualPlan_Qty: oputlist[e].Quantity,//$(tr).find('td:eq(7)').text(),
            AltItem: 'N',
            Amended: 'Y',
            Issue_qty: 0.00,
            order_qty: 0.00,
            Itemid: oputlist[e].ItemId, // $(tr).find('td:eq(0)').text()
            Colorid: oputlist[e].ColorId,//$(tr).find('td:eq(1)').text(),
            Sizeid: oputlist[e].SizeId,// $(tr).find('td:eq(2)').text(),
            InorOut: "O",
            SecQty: oputlist[e].SecQty,//$(tr).find('td:eq(8)').text(),
            CatType: oputlist[e].Type,// $(tr).find('td:eq(9)').text(),
            Required: oputlist[e].Required,//1

        }
        oplist.push(list);
    }
    $(":checkbox").each(function () {
        ischecked = $('#Openprg').is(":checked");

    });
    var remarks = [];
    var ProgramType = '';




    if (prdprgid == 0) {
        if (ischecked == true) {

            var rem = {
                ProdPrgId: $('#txtProdPrgid').val(),
                Job_Ord_No: $('#txtwrkordno').val(),
                Prog_Seq_No: 1,
                Remarks: $('#txtRemark').val()
            }
            remarks.push(rem);
            ProgramType = 'G';
        }
        else {
            ProgramType = 'P';
        }
    } else {
        ProgramType = PrgEtype;
    }



    var opchk = [];
    var ipchk = [];
    for (var y = 0; y < oputlist.length; y++) {
        if (oputlist[y].Quantity > 0) {
            opchk.push(oputlist[y]);
        }
    }


    for (var u = 0; u < iputlist.length; u++) {
        if (iputlist[u].Quantity > 0) {
            ipchk.push(iputlist[u]);
        }
    }
    if (opchk.length == 0 || ipchk.length == 0) {
        //alert('Please fill atleast any one qty...');
        var msg = 'Please fill atleast any one Quantity...';
        var flg = 4;
        var mode = 1;
        var url = "";
        AlartMessage(msg, flg, mode, url);
        return true;
    }

    debugger;
    table = "Prod_Prg_Mas",
    column = "ProdPrgNo",
    compId = CompanyId,
    Docum = 'PRODUCTION PROGRAM'

    var oldprdprgno = $('#txtprdprgno').val();
    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var newprdprgno = result.Value;
            if (oldprdprgno != newprdprgno) {
                //alert('PrdPrg No has been changed...');
                var msg = 'Production Program No has been changed...';
                var flg = 4;
                var mode = 1;
                var url = "";
                AlartMessage(msg, flg, mode, url);
                $('#txtprdprgno').val(result.Value);
            }

            var obj = {

                ProdPrgid: $('#txtProdPrgid').val(),
                ProdPrgNo: $('#txtprdprgno').val(),
                ProgDate: $('#txtplanprogdate').val(),
                ProcessId: ProcessId,
                //ProcessId: prodplanningList.ProcessId,
                Job_ord_no: $('#txtwrkordno').val(),
                //companyunitid: CompanyUnitId,
                //companyid: CompanyId,

                companyunitid: loadlist[0].CompanyUnitId,//5,//prodplanningedit[0].CompanyUnit,// CompanyUnitId,
                companyid: loadlist[0].CompanyId,

                OrderType: Ordertype,// Ordertype,//$('#optworkorder').val(),
                ProgramType: Gp,//Programtype,//$('#txtprocess').val()
                ProdListInputDetails: iplist,// Datas[n][k],
                ProdListOutputtDetails: oplist,
                // Closed:'N',
                //IsProportion: 'N',
                Prog_Seq_No: 1,
                remarks: $('#remarksli').val(),
                Amend: 'N',
                Approved: 'N',
                CreatedBy: Guserid,
                ApprovedBy: Guserid,
                FinalizeAutoPost: 'Y',
                ProdRemDetails: remarks
            }
            // detlist.push(obj);
            //  }
            // }
            $("#btnsave").attr("disabled", true);
            LoadingSymb();

            $.ajax({
                url: "/ProcessProgram/AddProdMas",
                data: JSON.stringify(obj),
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {
                    debugger;
                    //$('#myModal').modal('hide');

                    if (result.Value == 1) {

                        //alert('Data Saved Successfully');
                        ////window.location.href = "/ProcessProgram/ProcessProgramIndex";
                        ////loadAddlist();

                        //$('#tblprodprocess').DataTable().destroy();

                        //$('#myModal3').hide();

                        //if (Gp == "P") {

                        //    list;
                        //    //var currentval = list.slice(currentrow);
                        //    //currentrow = rowindex;
                        //    // $('#tblprodprocess').DataTable().destroy();


                        //    OrdEtype = Ordertype;
                        //    PrgEtype = Gp;
                        //    fnloadProductionPlanning(arrlist);
                        //    fnloadProductionPlanninglist(arrlist);
                        //    var t = prodplanning[0].Id;
                        //    // getbyaddID(t);
                        //    if ($('#txtRemark').val() == "") {
                        //        getbyID(t);
                        //    }
                        //    else {
                        //        getbyidOpen(t);
                        //    }
                        //    //$("#ddlinputbasepro").val("IT");
                        //    //$("#ddloutputbasepro").val("OT");
                        //    var tablesize = $('#Itable').DataTable();
                        //    tablesize.clear().draw();

                        //    var tablesize = $('#Otable').DataTable();
                        //    tablesize.clear().draw();

                        //    $('#tblprodprocess').DataTable().destroy();
                        //} else {
                        //    window.location.href = "/ProcessProgram/ProcessProgramIndex";
                        //}
                        AddUserEntryLog('Planning', 'Process Program', 'ADD', $('#txtwrkordno').val());
                        //alert('Data Saved Successfully');
                        var msg = 'Data Saved Successfully...';
                        var flg = 1;
                        var mode = 1;
                        var url = "";
                        AlartMessage(msg, flg, mode, url);
                        if (closeMode == 1) {
                            $('#myModal3').modal('hide');
                            getbyID(comeid, 0);
                        }
                        if (closeMode == 3) {
                            window.location.href = "/ProcessProgram/ProcessProgramIndex";
                        }
                    }
                    else {
                        window.location.href = "/Error/Index";
                    }

                },
                failure: function (errMsg) {
                    alert(errMsg);
                }
            });
        }
    });
}

function AddComp() {
    debugger;
    for (var d = 0; d < detlist.length; d++) {
        var det = {
            Prodprgdetid: $('#txtProddetidcomp').val(),
            Prodprgid: $('#txtProdPrgidcomp').val(),
            ActualPlan_Qty: detlist[d].prodqty,
            Prog_Op_Qty: detlist[d].prodqty,//arr[d],// $("#comptable tr:eq(" + d + ") td:eq(4)").html(),//$(tr).find('td:eq(9)').text(),
            LastProcessid: 3,
            Issue_qty: detlist[d].prodqty,
            MarkupValue: 0.00,
            CColorID: detlist[d].CColorid,// $(tr).find('td:eq(2)').text(),
            Itemid: detlist[d].itemid,//$(tr).find('td:eq(0)').text(),
            Colorid: detlist[d].colorid,// $(tr).find('td:eq(1)').text(),
            Sizeid: detlist[d].sizeid,// $(tr).find('td:eq(3)').text(),
            Componentid: detlist[d].componentid,//$(tr).find('td:eq(4)').text(),
            Rejectedqty: 0.00,
            Receipt_Qty: 0.00,
            Return_Qty: 0.00,
            IP_MarkupRate: 0.00,
            Rejectedqty: 0.00,
            CatType: 'SS',//$(tr).find('td:eq(9)').text(),
            Required: detlist[d].required
        }
        compdetaillist.push(det);
    }
    debugger;
    table = "Prod_Prg_Mas",
    column = "ProdPrgNo",
    compId = CompanyId,
    Docum = 'PRODUCTION PROGRAM'

    var oldprdprgnocomp = $('#txtprdprgnocomp').val();
    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var newprdprgnocomp = result.Value;
            if (oldprdprgnocomp != newprdprgnocomp) {
                //alert('PrdPrgNoComp has been changed...');
                var msg = 'PrdPrgNoComp has been changed...';
                var flg = 4;
                var mode = 1;
                var url = "";
                AlartMessage(msg, flg, mode, url);
                $('#txtprdprgnocomp').val(result.Value);
            }

            var objrst = {
                ProdPrgid: $('#txtProdPrgidcomp').val(),
                Prodprgno: $('#txtprdprgnocomp').val(),
                ProgDate: $('#txtplanprogdatecomp').val(),
                ProcessId: ProcessId,
                Job_ordno: $('#txtwrkordnocomp').val(),
                companyunitid: CompanyUnitId,// $('#txtplancompunitcomp').val(),
                companyid: CompanyId,
                remarks: $('#compremarks').val(),
                OrderType: Ordertype,
                ProgramType: Programtype,
                Prog_Seq_No: 1,
                Closed: 'N',
                Amend: 'N',
                CreatedBy: Guserid,
                Approved: 'N',
                CompListDet: compdetaillist
            };

            debugger;
            LoadingSymb();
            $.ajax({
                url: "/ProcessProgram/AddCompMas",
                data: JSON.stringify(objrst),
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {
                    debugger;

                    //alert('Data Saved Successfully');
                    // if (result.Value == 1) {
                    //alert('Data Saved Successfully');
                    var msg = 'Data Saved Successfully...';
                    var flg = 1;
                    var mode = 1;
                    var url = "";
                    AlartMessage(msg, flg, mode, url);

                    $('#myModal4').hide();


                    fnloadProductionPlanning(comarrlist);
                    fnloadProductionPlanninglist(comarrlist);
                    var t = prodplanning[0].Id;
                    // getbyaddID(t);
                    getbyID(t);
                    $('#ddlItem').val(0);
                    $('#ddlColor').val(0);
                    $('#ddlComponent').val(0);
                    var tablesize = $('#comptable').DataTable();
                    tablesize.clear().draw();
                    $('#tblprodprocess').DataTable().destroy();
                },
                failure: function (errMsg) {
                    alert(errMsg);
                }
            });
        }
    });
}


function loadData(Gp) {
    debugger;
    var ordNo = "";
    var ONo = $('select#ddlOrderNo option:selected').val();

    if (ONo == 0 || ONo == undefined) {
        ordNo == "";
    }
    else {

        ordNo = $('select#ddlOrderNo option:selected').text();
    }


    var RecNo = "";
    var RNo = $('select#ddlproRefNo option:selected').val();

    if (RNo == 0 || RNo == undefined) {
        RecNo == "";
    }
    else {

        RecNo = $('select#ddlproRefNo option:selected').text();
    }

    //var cmpid = $('#ddlproCompany').val();
    //if (cmpid == null) {
    //    cmpid = 0;
    //}

    var cmpid = $('#ddlproCompany').val();

    if (cmpid == null) {
        cmpid = DCompid;
    } else {
        cmpid = $('#ddlproCompany').val();
    }


    var buyerid = $('#ddlproBuyer').val();
    if (buyerid == null) {
        buyerid = 0;
    }




    var unitid = $('#ddlprounit').val();
    if (unitid == null) {
        unitid = 0;
    }
    var type = $('#ddlproType').val();
    if (type == 0) {
        type = "W";
    } else {
        type = $('#ddlproType').val();
    }



    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    var AppprgType = $('input[name="AppprgType"]:checked').attr('value');

    var AppType = $('input[name="AppType"]:checked').attr('value');

    var Dispatchchecked = false;
    var DispatchClosed = "N";
    Dispatchchecked = $('#Status').is(":checked");
    if (Dispatchchecked) {
        DispatchClosed = "Y";
    }
    else {
        DispatchClosed = "N";
    }

    var menufilter = FDate + ',' + TDate + ',' + cmpid + ',' + buyerid + ',' + ordNo + ',' + unitid + ',' + RecNo + ',' + Gp + ',' + type + ',' + AppprgType + ',' + AppType + ',' + DispatchClosed;
    localStorage.setItem('ProductionProgramMenuFilter', menufilter);

    $.ajax({
        type: "POST",
        url: '/ProcessProgram/List',
        data: JSON.stringify({ FromDate: FDate, ToDate: TDate, CompanyId: cmpid, buyerid: buyerid, orderno: ordNo, cmpnyunitid: unitid, refno: RecNo, prgmtype: Gp, Ordertype: type, AppprgType: AppprgType, AppType: AppType, DispatchClosed: DispatchClosed }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            var tableload = json.data
            //joborderno = json.JobOrderNo;
            var dataSet = eval("[" + tableload + "]");

            var inputcount = 0;
            $('#tblprodprgfst tr').each(function () {
                inputcount++;
            });
            if (inputcount > 0) {
                $('#tblprodprgfst').DataTable().destroy();

                //var table = $('#tblprodprgfst').DataTable();
                //var rows = table.clear().draw();
                //$('#tblprodprgfst').DataTable().rows.add(dataSet);
                //$('#tblprodprgfst').DataTable().columns.adjust().draw();
            }
            //  else {

            $('#tblprodprgfst').DataTable({
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
                         { title: "ID", "visible": false },
                          { title: "Order No" },
                         { title: "Ref No" },
                         { title: "Style" },
                         { title: "Company Unit" },
                         { title: "Quantity" },
                             { title: "Seq No", "visible": false },
                         { title: "Action" },
                ]
            });
            //  }
            var dt = $('#tblprodprgfst').DataTable();
            //hide the second and third columns
            dt.columns([0]).visible(false);

            //$('#ddlproCompany').empty();
            //$('#ddlOrderNo').empty();
            //$('#ddlproRefNo').empty();
            //load();
            //CheckRights("ProcessProgram");
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function loadDataFromBack(Gp) {
    debugger;
    var fill = localStorage.getItem('ProductionProgramMenuFilter');
    var fillobj = [];
    fillobj = fill.split(",");

    $('#txtFromDate').val(fillobj[0]);
    $('#txtToDate').val(fillobj[1]);
    if (fillobj[11] == 'Y') {
        $('#Status').prop('checked', true);
    } else {
        $('#Status').prop('checked', false);
    }

    if (fillobj[4] == "undefined") {
        fillobj[4] = '';
    }
    if (fillobj[6] == "undefined") {
        fillobj[6] = '';
    }
    if (fillobj[3] == "undefined") {
        fillobj[3] = 0;
    }
    if (fillobj[5] == "undefined") {
        fillobj[5] = 0;
    }
   

    $.ajax({
        type: "POST",
        url: '/ProcessProgram/List',
        data: JSON.stringify({ FromDate: fillobj[0], ToDate: fillobj[1], CompanyId: fillobj[2], buyerid: fillobj[3], orderno: fillobj[4], cmpnyunitid: fillobj[5], refno: fillobj[6], prgmtype: fillobj[7], Ordertype: fillobj[8], AppprgType: fillobj[9], AppType: fillobj[10], DispatchClosed: fillobj[11] }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            var tableload = json.data
            //joborderno = json.JobOrderNo;
            var dataSet = eval("[" + tableload + "]");

            var inputcount = 0;
            $('#tblprodprgfst tr').each(function () {
                inputcount++;
            });
            if (inputcount > 0) {
                $('#tblprodprgfst').DataTable().destroy();

                //var table = $('#tblprodprgfst').DataTable();
                //var rows = table.clear().draw();
                //$('#tblprodprgfst').DataTable().rows.add(dataSet);
                //$('#tblprodprgfst').DataTable().columns.adjust().draw();
            }
            //  else {

            $('#tblprodprgfst').DataTable({
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
                         { title: "ID", "visible": false },
                          { title: "Order No" },
                         { title: "Ref No" },
                         { title: "Style" },
                         { title: "Company Unit" },
                         { title: "Quantity" },
                             { title: "Seq No", "visible": false },
                         { title: "Action" },
                ]
            });
            //  }
            var dt = $('#tblprodprgfst').DataTable();
            //hide the second and third columns
            dt.columns([0]).visible(false);

          
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function MList() {
    ChkRefno = true;
    ChkOrdno = true;
    ChkBuyer = true;
    ChkComp = true;
    DtChk = false;
    load();
    loadData(Gp);
}

function CMainList() {
    ChkRefno = true;
    ChkOrdno = true;
    ChkBuyer = true;
    ChkComp = true;
    DtChk = false;
    load();
    loadData(Gp);
}

function BMainList() {
    ChkRefno = false;
    ChkOrdno = false;
    ChkBuyer = false;
    ChkComp = false;
    DtChk = false;
    load();
    loadData(Gp);
}
function OMainList() {
    ChkRefno = false;
    ChkOrdno = false;
    ChkBuyer = true;
    ChkComp = false;
    DtChk = false;
    load();
    loadData(Gp);
}

function UMainList() {
    ChkRefno = true;
    ChkOrdno = true;
    ChkBuyer = true;
    ChkComp = false;
    DtChk = false;
    load();
    loadData(Gp);
}


function load() {
    debugger; var ordNo = "";
    var ONo = $('select#ddlOrderNo option:selected').val();

    if (ONo == 0 || ONo == undefined) {
        ordNo = "";
    }
    else {

        ordNo = $('select#ddlOrderNo option:selected').text();
    }


    var RecNo = "";
    var RNo = $('select#ddlproRefNo option:selected').val();

    if (RNo == 0 || RNo == undefined) {
        RecNo = "";
    }
    else {

        RecNo = $('select#ddlproRefNo option:selected').text();
    }

    //var cmpid = $('#ddlproCompany').val();
    //if (cmpid == null) {
    //    cmpid = 0;
    //}

    var cmpid = $('#ddlproCompany option:selected').val();

    if (cmpid == null) {
        cmpid = DCompid;
    } else {
        cmpid = $('#ddlproCompany option:selected').val();
    }

    var buyerid = $('#ddlproBuyer').val();
    if (buyerid == null) {
        buyerid = 0;
    }
    var unitid = $('#ddlprounit').val();
    if (unitid == null) {
        unitid = 0;
    }
    var type = $('#ddlproType').val();
    if (type == null) {
        type = '';
    }
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    if (ChkComp || DtChk) {
        ordNo = "";
        RecNo = "";
        buyerid = 0;
        unitid = 0;
    }

    var protype = $('input[name="AppprgType"]:checked').attr('value');

    var Dispatchchecked = false;
    var DispatchClosed = "N";
    Dispatchchecked = $('#Status').is(":checked");
    if (Dispatchchecked) {
        DispatchClosed = "Y";
    }
    else {
        DispatchClosed = "N";
    }

    $.ajax({
        type: "POST",
        url: '/ProcessProgram/ListEdit',
        data: JSON.stringify({ FromDate: FDate, ToDate: TDate, CompanyId: cmpid, buyerid: buyerid, orderno: ordNo, cmpnyunitid: unitid, refno: RecNo, prgmtype: Gp, Ordertype: type, DispatchClosed: DispatchClosed }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            loadlist = json.Value;

            var obj = json.Value;
            if (json.Status == 'SUCCESS') {
                var data = json.Value;

                var compdet = {};
                var comp = [];

                var orddet = {};
                var ord = [];

                var refdet = {};
                var ref = [];

                var buydet = {};
                var buy = [];

                $.each(obj, function (i, el) {

                    if (!compdet[el.CompanyId]) {
                        compdet[el.CompanyId] = true;
                        comp.push(el);
                    }

                    if (!orddet[el.orderno]) {
                        orddet[el.orderno] = true;
                        ord.push(el);
                    }

                    if (!refdet[el.RefNo]) {
                        refdet[el.RefNo] = true;
                        ref.push(el);
                    }
                    if (!buydet[el.Buyerid]) {
                        buydet[el.Buyerid] = true;
                        buy.push(el);
                    }

                });

                //$('#ddlproCompany').empty();

                //$(ddlproCompany).append($('<option/>').val('0').text('--Select Company--'));
                //$.each(comp, function () {
                //    $(ddlproCompany).append($('<option></option>').val(this.CompanyId).text(this.company));
                //});

                if (ChkOrdno || ChkComp || DtChk) {
                    $('#ddlOrderNo').empty();
                    $(ddlOrderNo).append($('<option/>').val('0').text('--Select OrderNo--'));
                    $.each(ord, function () {
                        $(ddlOrderNo).append($('<option></option>').val(this.Buyordmasid).text(this.orderno));
                    });
                }

                if (ChkRefno || ChkComp || DtChk) {
                    $('#ddlproRefNo').empty();
                    $(ddlproRefNo).append($('<option/>').val('0').text('--Select RefNo--'));
                    $.each(ref, function () {
                        $(ddlproRefNo).append($('<option></option>').val(this.Buyordmasid).text(this.RefNo));
                    });
                }

                if (ChkBuyer || ChkComp || DtChk) {
                    $('#ddlproBuyer').empty();
                    $(ddlproBuyer).append($('<option/>').val('0').text('--Select Buyer--'));
                    $.each(buy, function () {
                        $(ddlproBuyer).append($('<option></option>').val(this.Buyerid).text(this.Buyer));
                    });
                }
            }

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });


}

function DCCheck(id, dc) {
    if (dc > 0) {
        alert('DC made this Process..')
        $("#btnUnAppupd").attr("disabled", true);
    }

}

var prodplanningedit = [];
function getbyidedit(id) {
    //$('#Itable').Datatable().destroy();
    //$('#Otable').Datatable().destroy();

    debugger;
    $.ajax({
        type: "POST",
        url: '/ProcessProgram/GetProdPlanningEdit/',
        data: JSON.stringify({ Id: id, prgmtype: Gp }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            prodplanningedit = json.Value;
            var jobordno = prodplanningedit[0].JobOrderNo;
            var cmpnyunit = prodplanningedit[0].CompanyUnit;
            var refno = prodplanningedit[0].RefNo;
            var style = prodplanningedit[0].Style;
            var buyer = prodplanningedit[0].Buyer;
            var qty = prodplanningedit[0].Quantity;
            Ordertype = prodplanningedit[0].Ordertype;
            CheckPlanAmend(jobordno);
            if (Gp == "G") {
                Programtype = "G";
            }
            else {
                Programtype = "P";
            }
            $('#txtjobordno').val(jobordno);
            $('#txtcompunit').val(cmpnyunit);
            $('#txtrefno').val(refno);
            $('#txtstyle').val(style);
            LockAcc();
            $('#txtbuyer').val(buyer);
            $('#txtqty').val(qty);

            //editaddlist();
            // var prodprgid = prodplanningedit
            //var tableload = json.data
            //var dataSet = eval("[" + tableload + "]");
            // $('#tPAbody').DataTable({


            //$('#tblprodprocess').DataTable({
            //    data: dataSet,
            //    columns: [
            //             { title: "JobMasID", "visible": false },
            //             { title: "ProcessID", "visible": false },
            //             { title: "Process" },
            //             { title: "Prod Prg No" },
            //             {
            //                 title: "Program Date"
            //                 //render: function (data) {
            //                 //    return (moment(data).format("DD/MM/YYYY"));
            //                 //}
            //             },

            //                 {
            //                     title: "Program"//, "mDataProp": null,

            //                     // "sDefaultContent": '<button type="button" data-toggle="modal" data-target="#myModal3" id="btnprod" class="btnprodplanadd"> Add </button>'
            //                 },

            //    ]
            //});
            // load();


        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function getbyideditopen(id) {
    //$('#Itable').Datatable().destroy();
    //$('#Otable').Datatable().destroy();

    debugger;
    $.ajax({
        type: "POST",
        url: '/ProcessProgram/GetProdPlanningEditOpenList/',
        data: JSON.stringify({ Id: id }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            prodplanningedit = json.Value;
            var jobordno = prodplanningedit[0].JobOrderNo;
            var cmpnyunit = prodplanningedit[0].CompanyUnit;
            var refno = prodplanningedit[0].RefNo;
            var style = prodplanningedit[0].Style;
            var buyer = prodplanningedit[0].Buyer;
            var qty = prodplanningedit[0].Quantity;
            OrdEtype = prodplanningedit[0].Ordertype;
            PrgEtype = prodplanningedit[0].PrgEdittype;
            prdprgid = prodplanningedit[0].ProProgId;


            $('#txtjobordno').val(jobordno);
            $('#txtcompunit').val(cmpnyunit);
            $('#txtrefno').val(refno);
            $('#txtstyle').val(style);

            $('#txtbuyer').val(buyer);
            $('#txtqty').val(qty);
            $('#txtRemark').val(prodplanningedit[0].reason);
            //editaddlist();
            // var prodprgid = prodplanningedit
            //var tableload = json.data
            //var dataSet = eval("[" + tableload + "]");
            // $('#tPAbody').DataTable({


            //$('#tblprodprocess').DataTable({
            //    data: dataSet,
            //    columns: [
            //             { title: "JobMasID", "visible": false },
            //             { title: "ProcessID", "visible": false },
            //             { title: "Process" },
            //             { title: "Prod Prg No" },
            //             {
            //                 title: "Program Date"
            //                 //render: function (data) {
            //                 //    return (moment(data).format("DD/MM/YYYY"));
            //                 //}
            //             },

            //                 {
            //                     title: "Program"//, "mDataProp": null,

            //                     // "sDefaultContent": '<button type="button" data-toggle="modal" data-target="#myModal3" id="btnprod" class="btnprodplanadd"> Add </button>'
            //                 },

            //    ]
            //});
            // load();


        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function getbyaddID(id) {
    debugger;
    $.ajax({
        type: "POST",
        url: '/ProcessProgram/GetProdPlanningEdit/',
        data: JSON.stringify({ Id: id }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            prodplanningedit = json.Value;
            var jobordno = prodplanningedit[0].JobOrderNo;
            var cmpnyunit = prodplanningedit[0].CompanyUnit;
            var refno = prodplanningedit[0].RefNo;
            var style = prodplanningedit[0].Style;
            var buyer = prodplanningedit[0].Buyer;
            var qty = prodplanningedit[0].Quantity;

            $('#txtjobordno').val(jobordno);
            $('#txtcompunit').val(cmpnyunit);
            $('#txtrefno').val(refno);
            $('#txtstyle').val(style);

            $('#txtbuyer').val(buyer);
            $('#txtqty').val(qty);


        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}
var inputlist = [];
var outputlist = [];


function getprodlist(id) {
    debugger;
    inputlist = [];
    outputlist = [];

    $.ajax({
        type: "POST",
        url: '/ProcessProgram/GetProdEditList/',
        data: JSON.stringify({ Id: id }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            prodedit = json.Value;
            prodplanningedit;
            var jobordno = prodplanningedit[0].JobOrderNo;
            var cmpnyunit = prodplanningedit[0].CompanyUnit;
            var refno = prodplanningedit[0].RefNo;
            var style = prodplanningedit[0].Style;
            var buyer = prodplanningedit[0].Buyer;
            var qty = prodplanningedit[0].Quantity;
            var process = proname;// prodplanningedit[0].Process;
            var prodpgmnum = pnum;//prodplanningedit[0].ProProgNo;
            var date = prodplanningedit[0].ProProgDate;
            var masid = prodplanningedit[0].ProProgId;
            $('#txtwrkordno').val(jobordno);
            $('#txtplancompunit').val(cmpnyunit);
            $('#txtplanrefno').val(refno);
            $('#txtprocess').val(process);
            $('#txtProdPrgid').val(prodprgid);
            $('#txtprdprgno').val(prodpgmnum);
            $('#txtplanprogdate').val(moment(date).format('DD/MM/YYYY'));
            $('#remarksli').val(prodedit[0].Remarks);
            for (var d = 0; d < prodedit.length; d++) {
                if (prodedit[d].InorOut == 'I') {
                    inputlist.push(prodedit[d]);
                }
                else if (prodedit[d].InorOut == 'O') {
                    outputlist.push(prodedit[d]);
                }
            }
            if (inputlist.length > 0) {
                Inputeditlist = inputlist;
                loadInputProcessEdit(inputlist);
            }
            if (outputlist.length > 0) {
                Outputeditlist = outputlist;
                loadOutputProcessedit(outputlist);
            }

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function getproddeletelist(id) {
    $.ajax({
        type: "POST",
        url: '/ProcessProgram/GetProdEditList/',
        data: JSON.stringify({ Id: id }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            proddelete = json.Value;
            prodplanningedelete;

            var jobordno = prodplanningedelete[0].JobOrderNo;
            var cmpnyunit = prodplanningedelete[0].CompanyUnit;
            var refno = prodplanningedelete[0].RefNo;
            var style = prodplanningedelete[0].Style;
            var buyer = prodplanningedelete[0].Buyer;
            var qty = prodplanningedelete[0].Quantity;
            var process = prodpro;// prodplanningedelete[0].Process;
            var prodpgmnum = pnum;// prodplanningedelete[0].ProProgNo;
            var date = prodplanningedelete[0].ProProgDate;
            var masid = prodplanningedelete[0].ProProgId;
            $('#txtwrkordno').val(jobordno);
            $('#txtplancompunit').val(cmpnyunit);
            $('#txtplanrefno').val(refno);
            $('#txtprocess').val(process);
            $('#txtProdPrgid').val(masid);
            $('#txtprdprgno').val(prodpgmnum);
            $('#txtplanprogdate').val(moment(date).format('DD/MM/YYYY'));


            //txtprocess
            //txtwrkordno
            //txtProdPrgid
            //txtplanrefno
            //txtprdprgno
            //txtProddetid
            //txtplancompunit
            //txtplanprogdate


            var inputlist = [];
            var outputlist = [];

            for (var d = 0; d < proddelete.length; d++) {
                if (proddelete[d].InorOut == 'I') {
                    inputlist.push(proddelete[d]);
                    //loadInputProcess(prodedit[d]);
                }
                else if (proddelete[d].InorOut == 'O') {
                    outputlist.push(proddelete[d]);
                    //loadOutputProcessedit(prodedit[d]);
                }
            }
            if (inputlist.length > 0) {
                loadInputProcessEdit(inputlist);
            }
            if (outputlist.length > 0) {
                loadOutputProcessedit(outputlist);
            }

            ChkProcessOrd(proddelid);



        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function ChkProcessOrd(id) {
    debugger;
    $.ajax({
        type: "POST",
        url: '/ProcessProgram/ChkProcessOrder/',
        data: JSON.stringify({ Id: id }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (json) {
            debugger;
            var obj = json.Value;
            if (obj.length > 0) {
                //alert('Process Order is already made..Cannot delete this program..');
                var msg = 'Process Order is already made..Cannot delete this program...';
                var flg = 4;
                var mode = 1;
                var url = "";
                AlartMessage(msg, flg, mode, url);
                $("#btncancel").attr("disabled", true);

            }
        }
    });
}

function getcomplist(id) {
    debugger;

    LoadItemDDL("#ddlItem");
    LoadColorDDL("#ddlColor");
    LoadComponentDDL("#ddlComponent");
    $.ajax({
        type: "POST",
        url: '/ProcessProgram/GetCompEditList/',

        data: JSON.stringify({ Id: id }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            compedit = json.Value;
            var item = compedit[0].Itemid;
            var color = compedit[0].Colorid;
            var component = compedit[0].Componentid;

            $('#ddlItem').val(item);
            $('#ddlColor').val(color);
            $('#ddlComponent').val(component);

            $('#compremarks').val(compedit[0].remarks);

            if (prodplanningedelete.length > 0) {
                var jobordno = prodplanningedelete[0].JobOrderNo;
                var cmpnyunit = prodplanningedelete[0].CompanyUnit;
                var refno = prodplanningedelete[0].RefNo;
                var style = prodplanningedelete[0].Style;
                var buyer = prodplanningedelete[0].Buyer;
                var qty = prodplanningedelete[0].Quantity;
                var process = comproc;//prodplanningedelete[0].Process;
                var prodpgmnum = copnum;// prodplanningedelete[0].ProProgNo;
                var date = prodplanningedelete[0].ProProgDate;
                var masid = prodplanningedelete[0].ProProgId;

                $('#txtwrkordnocomp').val(jobordno);
                $('#txtplancompunitcomp').val(cmpnyunit);
                $('#txtplanrefnocomp').val(refno);
                $('#txtprocesscomp').val(process);
                $('#txtProdPrgidcomp').val(masid);
                $('#txtprdprgnocomp').val(prodpgmnum);
                $('#txtplanprogdatecomp').val(moment(date).format('DD/MM/YYYY'));
            }
            //LoadComptable(compedit);
            $('#comptable').DataTable().destroy();

            $('#comptable').DataTable({
                data: compedit,
                columns: [
                   { title: "Itemid", data: "Itemid", "visible": false },
                   { title: "Colorid", data: "Colorid", "visible": false },
                   { title: "CColorid", data: "CColorID", "visible": false },
                   { title: "Sizeid", data: "Sizeid", "visible": false },
                   { title: "Componentid", data: "Componentid", "visible": false },

                    { title: "Input Item", data: "item" },
                    { title: "Component", data: "Prog_Op_Qty" },
                    { title: "Category 1", data: "size" },
                    { title: "Category 2", data: "color" },
                    {
                        title: "Program Qty", data: "Prog_Op_Qty",
                        render: function (data) {

                            return '<input type="text" id="txtprodqty" class="txtprodqty"  style="width: 50px;text-align: center;" value=' + data + '  >';

                        },
                    },
                   // { title: "Type" },
                    {
                        title: "Required", data: "Required",
                        render: function (data) {
                            return '<input type="checkbox" id="chkbx" checked="checked"/>';
                        },
                    },

                ]
            });








        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}

function fnCloseseconddiv() {
    debugger;
    //$("#myModal2").modal('hide');
    $("#myModal2").hide();
    // $('#tblprodprgfst').DataTable().destroy();

    var AppprgType = $('input[name="AppprgType"]:checked').attr('value');
    if (AppprgType == 'A' || AppprgType == 'P') {
        loadData(Gp);
        window.location.href = "/ProcessProgramApproval/ProcessProgramApprovalIndex";
    }
    else {
        loadData(Gp);
        window.location.href = "/ProcessProgram/ProcessProgramIndex";
    }
}


var eid;
function getbyID(id, maxseqno) {
    eid = id;
    comeid = id;
    closeMode = 1;
    for (var d = 0; d < loadlist.length; d++) {
        if (loadlist[d].JMasId == id && loadlist[d].Programtype == 'G') {
            getbyidOpen(id);
            return true;
        }
    }

    var AppprgType = $('input[name="AppprgType"]:checked').attr('value');

    var AppType = $('input[name="AppType"]:checked').attr('value');

    debugger;
    $("#myModal2").modal('show');
    $('#tblprodprocess').DataTable().destroy();
    $.ajax({
        type: "POST",
        url: '/ProcessProgram/GetProdPlanningEditList/',
        data: JSON.stringify({ Id: id, prgmtype: Gp, AppprgType: AppprgType, AppType: AppType }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            prodplanningEditList = json;


            var tableload = json.data;
            var dataSet = eval("[" + tableload + "]");
            // $('#tPAbody').DataTable({
            $('#tblprodprocess').DataTable().destroy();

            $('#tblprodprocess').DataTable({
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
                         { title: "JobMasID", "visible": false },
                         { title: "ProcessID", "visible": false },
                         { title: "Process" },
                         { title: "Prod Prg No" },
                         {
                             title: "Program Date"
                             //render: function (data) {
                             //    return (moment(data).format("DD/MM/YYYY"));
                             //}
                         },


                          {
                              title: "MaxNo"
                              //render: function (data) {
                              //    return (moment(data).format("DD/MM/YYYY"));
                              //}
                          },
                             {
                                 title: "Program"//, "mDataProp": null,

                                 // "sDefaultContent": '<button type="button" data-toggle="modal" data-target="#myModal3" id="btnprod" class="btnprodplanadd"> Add </button>'
                             },

                ]
            });
            getbyidedit(id);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}

function getbyidOpen(id) {

    $("#myModal2").modal('show');
    $('#tblprodprocess').DataTable().destroy();
    $.ajax({
        type: "POST",
        url: '/ProcessProgram/GetProdPlanningEditOpen/',
        data: JSON.stringify({ Id: id }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            prodplanningEditList = json;


            var tableload = json.data;
            var dataSet = eval("[" + tableload + "]");
            // $('#tPAbody').DataTable({
            $('#tblprodprocess').DataTable().destroy();

            $('#tblprodprocess').DataTable({
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
                         { title: "JobMasID", "visible": false },
                         { title: "ProcessID", "visible": false },
                         { title: "Process" },
                         { title: "Prod Prg No" },
                         {
                             title: "Program Date"
                             //render: function (data) {
                             //    return (moment(data).format("DD/MM/YYYY"));
                             //}
                         },
                        {
                            title: "MaxSeq"
                            //render: function (data) {
                            //    return (moment(data).format("DD/MM/YYYY"));
                            //}
                        },
                             {
                                 title: "Program"//, "mDataProp": null,

                                 // "sDefaultContent": '<button type="button" data-toggle="modal" data-target="#myModal3" id="btnprod" class="btnprodplanadd"> Add </button>'
                             },

                ]
            });
            getbyideditopen(id);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
var did;
function Delete(id, maxno) {
    did = id;
    comeid = id;
    closeMode = 2;
    debugger;
    $("#myModal2").modal('show');
    $("#myModal2").show();
    for (var d = 0; d < loadlist.length; d++) {
        if (loadlist[d].JMasId == id && loadlist[d].Programtype == 'G') {
            DeleteOpen(id);
            return true;
        }
    }

    $('#tblprodprocess').DataTable().destroy();
    $.ajax({
        type: "POST",
        url: '/ProcessProgram/GetProdPlanningDeleteList/',
        data: JSON.stringify({ Id: id, prgmtype: Gp }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            prodplanningDeleteList = json.Value;

            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");
            // $('#tPAbody').DataTable({


            $('#tblprodprocess').DataTable({
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
                         { title: "JobMasID", "visible": false },
                         { title: "ProcessID", "visible": false },
                         { title: "Process" },
                         { title: "Prod Prg No" },
                         {
                             title: "Program Date"
                             //render: function (data) {
                             //    return (moment(data).format("DD/MM/YYYY"));
                             //}
                         },
                         {
                             title: "maxSeq"

                         },
                             {
                                 title: "Program"//, "mDataProp": null,

                                 // "sDefaultContent": '<button type="button" data-toggle="modal" data-target="#myModal3" id="btnprod" class="btnprodplanadd"> Add </button>'
                             },

                ]
            });
            getbyiddelete(id);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}

function DeleteOpen(id) {
    $('#tblprodprocess').DataTable().destroy();
    $.ajax({
        type: "POST",
        url: '/ProcessProgram/GetProdPlanningDeleteListOpen/',
        data: JSON.stringify({ Id: id }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            prodplanningDeleteList = json.Value;

            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");
            // $('#tPAbody').DataTable({


            $('#tblprodprocess').DataTable({
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
                         { title: "JobMasID", "visible": false },
                         { title: "ProcessID", "visible": false },
                         { title: "Process" },
                         { title: "Prod Prg No" },
                         {
                             title: "Program Date"
                             //render: function (data) {
                             //    return (moment(data).format("DD/MM/YYYY"));
                             //}
                         },
                          { title: "MaxSeq" },
                             {
                                 title: "Program"//, "mDataProp": null,

                                 // "sDefaultContent": '<button type="button" data-toggle="modal" data-target="#myModal3" id="btnprod" class="btnprodplanadd"> Add </button>'
                             },

                ]
            });
            getbyiddeleteopen(id);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function getbyiddelete(id) {
    debugger;
    $.ajax({
        type: "POST",
        url: '/ProcessProgram/GetDeleteList/',
        data: JSON.stringify({ Id: id, prgmtype: Gp }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            prodplanningedelete = json.Value;
            var jobordno = prodplanningedelete[0].JobOrderNo;
            var cmpnyunit = prodplanningedelete[0].CompanyUnit;
            var refno = prodplanningedelete[0].RefNo;
            var style = prodplanningedelete[0].Style;
            var buyer = prodplanningedelete[0].Buyer;
            var qty = prodplanningedelete[0].Quantity;

            $('#txtjobordno').val(jobordno);
            $('#txtcompunit').val(cmpnyunit);
            $('#txtrefno').val(refno);
            $('#txtstyle').val(style);

            $('#txtbuyer').val(buyer);
            $('#txtqty').val(qty);
            LockAcc();

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}

function getbyiddeleteopen(id) {
    debugger;
    $.ajax({
        type: "POST",
        url: '/ProcessProgram/GetDeleteListOpen/',
        data: JSON.stringify({ Id: id }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            prodplanningedelete = json.Value;
            var jobordno = prodplanningedelete[0].JobOrderNo;
            var cmpnyunit = prodplanningedelete[0].CompanyUnit;
            var refno = prodplanningedelete[0].RefNo;
            var style = prodplanningedelete[0].Style;
            var buyer = prodplanningedelete[0].Buyer;
            var qty = prodplanningedelete[0].Quantity;

            $('#txtjobordno').val(jobordno);
            $('#txtcompunit').val(cmpnyunit);
            $('#txtrefno').val(refno);
            $('#txtstyle').val(style);

            $('#txtbuyer').val(buyer);
            $('#txtqty').val(qty);


        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}

function UpdateProdUnApp() {
    debugger;
    iplist = new Array();
    oplist = new Array();
    Datas = new Array();


    var opchk = [];
    var ipchk = [];
    for (var y = 0; y < oputlist.length; y++) {
        if (oputlist[y].Quantity > 0) {
            opchk.push(oputlist[y]);
        }
    }


    for (var u = 0; u < iputlist.length; u++) {
        if (iputlist[u].Quantity > 0) {
            ipchk.push(iputlist[u]);
        }
    }
    if (opchk.length == 0 || ipchk.length == 0) {
        //alert('Please fill atleast any one qty...');
        var msg = 'Please fill atleast any one quantity...';
        var flg = 4;
        var mode = 1;
        var url = "";
        AlartMessage(msg, flg, mode, url);
        return true;
    }


    for (var c = 0; c < inputlist.length; c++) {
        var list = {
            Prodprgdetid: $('#txtProddetid').val(),
            Prodprgid: inputlist[c].Prodprgid,// $('#txtProdPrgid').val(),            
            Prog_Op_Qty: inputlist[c].Quantity,// $(tr).find('td:eq(7)').text(),
            ActualPlan_Qty: inputlist[c].Quantity,//$(tr).find('td:eq(7)').text(),
            AltItem: 'N',
            Amended: 'Y',
            Issue_qty: 0.00,
            order_qty: 0.00,
            Itemid: inputlist[c].ItemId, // $(tr).find('td:eq(0)').text()
            Colorid: inputlist[c].ColorId,//$(tr).find('td:eq(1)').text(),
            Sizeid: inputlist[c].SizeId,// $(tr).find('td:eq(2)').text(),
            InorOut: "I",
            SecQty: inputlist[c].SecQty,//$(tr).find('td:eq(8)').text(),
            CatType: inputlist[c].Type,// $(tr).find('td:eq(9)').text(),
            Required: inputlist[c].Required,//1

        }
        iplist.push(list);

    }

    for (var e = 0; e < outputlist.length; e++) {
        var list = {
            Prodprgdetid: $('#txtProddetid').val(),
            Prodprgid: outputlist[e].Prodprgid,//$('#txtProdPrgid').val(),
            Prog_Op_Qty: outputlist[e].Quantity,// $(tr).find('td:eq(7)').text(),
            ActualPlan_Qty: outputlist[e].Quantity,//$(tr).find('td:eq(7)').text(),
            AltItem: 'N',
            Amended: 'Y',
            Issue_qty: 0.00,
            order_qty: 0.00,
            Itemid: outputlist[e].ItemId, // $(tr).find('td:eq(0)').text()
            Colorid: outputlist[e].ColorId,//$(tr).find('td:eq(1)').text(),
            Sizeid: outputlist[e].SizeId,// $(tr).find('td:eq(2)').text(),
            InorOut: "O",
            SecQty: outputlist[e].SecQty,//$(tr).find('td:eq(8)').text(),
            CatType: outputlist[e].CatType,// $(tr).find('td:eq(9)').text(),
            Required: outputlist[e].Required,//1

        }
        oplist.push(list);
    }

    //$(":checkbox").each(function () {
    //    ischecked = $('#Openprg').is(":checked");

    //});
    var remarks = [];
    var ProgramType = '';
    if ($('#txtRemark').val() != "") {

        var rem = {
            ProdPrgId: $('#txtProdPrgid').val(),
            Job_Ord_No: $('#txtwrkordno').val(),
            Prog_Seq_No: 1,
            Remarks: $('#txtRemark').val()
        }
        remarks.push(rem);
        ProgramType = 'G';
    }
    else {
        ProgramType = 'P';
    }

    //for (var p = 0; p < iplist.length; p++) {
    //    if (iplist[p].ProdPrgid === undefined) {
    //        iplist[p].ProdPrgid = 0;
    //    }
    //}


    //for (var p = 0; p < oplist.length; p++) {
    //    if (oplist[p].ProdPrgid === undefined) {
    //        oplist[p].ProdPrgid = 0;
    //    }
    //}
    var objedit = {

        ProdPrgid: $('#txtProdPrgid').val(),
        ProdPrgNo: $('#txtprdprgno').val(),
        ProgDate: $('#txtplanprogdate').val(),
        ProcessId: pid,// 3,// tableload[0].,// ProcessId,
        //ProcessId: prodplanningList.ProcessId,
        Job_ord_no: $('#txtwrkordno').val(),
        companyunitid: loadlist[0].CompanyUnitId,//5,//prodplanningedit[0].CompanyUnit,// CompanyUnitId,
        companyid: loadlist[0].CompanyId,//1,// CompanyId,
        OrderType: Ordertype,//'W',// Ordertype,//$('#optworkorder').val(),
        ProgramType: Programtype,//$('#txtprocess').val()
        ProdListInputDetails: iplist,// Datas[n][k],
        ProdListOutputtDetails: oplist,
        // Closed:'N',
        //IsProportion: 'N',
        Prog_Seq_No: 1,
        remarks: $('#remarksli').val(),
        Amend: 'N',
        Approved: 'N',
        CreatedBy: Guserid,
        ApprovedBy: Guserid,
        FinalizeAutoPost: 'Y',
        ProdRemDetails: remarks
    }

    LoadingSymb();

    $.ajax({
        url: "/ProcessProgram/UpdateProdApp",
        data: JSON.stringify(objedit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            // $('#myModal').modal('hide');

            if (result.Value == 1) {
                //alert('Data Updated Successfully');
                // window.location.href = "/ProcessProgram/ProcessProgramIndex";
                $('#myModal3').hide();
                if (Gp == "P") {
                    var msg = 'Data Updated Successfully...';
                    var flg = 1;
                    var mode = 1;
                    var url = "";
                    AlartMessage(msg, flg, mode, url);
                    getbyID(eid);
                } else {
                    var msg = 'Data Updated Successfully...';
                    var flg = 1;
                    var mode = 0;
                    var url = "/ProcessProgramApproval/ProcessProgramApprovalIndex";
                    AlartMessage(msg, flg, mode, url);
                    //window.location.href = "/ProcessProgramApproval/ProcessProgramApprovalIndex";
                }
            }
            else {
                window.location.href = "/Error/Index";
            }

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });


}


function UpdateProdApp() {
    debugger;
    iplist = new Array();
    oplist = new Array();
    Datas = new Array();
    for (var c = 0; c < inputlist.length; c++) {
        var list = {
            Prodprgdetid: $('#txtProddetid').val(),
            Prodprgid: inputlist[c].Prodprgid,// $('#txtProdPrgid').val(),            
            Prog_Op_Qty: inputlist[c].Quantity,// $(tr).find('td:eq(7)').text(),
            ActualPlan_Qty: inputlist[c].Quantity,//$(tr).find('td:eq(7)').text(),
            AltItem: 'N',
            Amended: 'Y',
            Issue_qty: 0.00,
            order_qty: 0.00,
            Itemid: inputlist[c].ItemId, // $(tr).find('td:eq(0)').text()
            Colorid: inputlist[c].ColorId,//$(tr).find('td:eq(1)').text(),
            Sizeid: inputlist[c].SizeId,// $(tr).find('td:eq(2)').text(),
            InorOut: "I",
            SecQty: inputlist[c].SecQty,//$(tr).find('td:eq(8)').text(),
            CatType: inputlist[c].Type,// $(tr).find('td:eq(9)').text(),
            Required: inputlist[c].Required,//1

        }
        iplist.push(list);

    }

    for (var e = 0; e < outputlist.length; e++) {
        var list = {
            Prodprgdetid: $('#txtProddetid').val(),
            Prodprgid: outputlist[e].Prodprgid,//$('#txtProdPrgid').val(),
            Prog_Op_Qty: outputlist[e].Quantity,// $(tr).find('td:eq(7)').text(),
            ActualPlan_Qty: outputlist[e].Quantity,//$(tr).find('td:eq(7)').text(),
            AltItem: 'N',
            Amended: 'Y',
            Issue_qty: 0.00,
            order_qty: 0.00,
            Itemid: outputlist[e].ItemId, // $(tr).find('td:eq(0)').text()
            Colorid: outputlist[e].ColorId,//$(tr).find('td:eq(1)').text(),
            Sizeid: outputlist[e].SizeId,// $(tr).find('td:eq(2)').text(),
            InorOut: "O",
            SecQty: outputlist[e].SecQty,//$(tr).find('td:eq(8)').text(),
            CatType: outputlist[e].CatType,// $(tr).find('td:eq(9)').text(),
            Required: outputlist[e].Required,//1

        }
        oplist.push(list);
    }

    //$(":checkbox").each(function () {
    //    ischecked = $('#Openprg').is(":checked");

    //});
    var remarks = [];
    var ProgramType = '';
    if ($('#txtRemark').val() != "") {

        var rem = {
            ProdPrgId: $('#txtProdPrgid').val(),
            Job_Ord_No: $('#txtwrkordno').val(),
            Prog_Seq_No: 1,
            Remarks: $('#txtRemark').val()
        }
        remarks.push(rem);
        ProgramType = 'G';
    }
    else {
        ProgramType = 'P';
    }

    //for (var p = 0; p < iplist.length; p++) {
    //    if (iplist[p].ProdPrgid === undefined) {
    //        iplist[p].ProdPrgid = 0;
    //    }
    //}


    //for (var p = 0; p < oplist.length; p++) {
    //    if (oplist[p].ProdPrgid === undefined) {
    //        oplist[p].ProdPrgid = 0;
    //    }
    //}
    var objedit = {

        ProdPrgid: $('#txtProdPrgid').val(),
        ProdPrgNo: $('#txtprdprgno').val(),
        ProgDate: $('#txtplanprogdate').val(),
        ProcessId: pid,// 3,// tableload[0].,// ProcessId,
        //ProcessId: prodplanningList.ProcessId,
        Job_ord_no: $('#txtwrkordno').val(),
        companyunitid: loadlist[0].CompanyUnitId,//5,//prodplanningedit[0].CompanyUnit,// CompanyUnitId,
        companyid: loadlist[0].CompanyId,//1,// CompanyId,
        OrderType: Ordertype,//'W',// Ordertype,//$('#optworkorder').val(),
        ProgramType: Programtype,//$('#txtprocess').val()
        ProdListInputDetails: iplist,// Datas[n][k],
        ProdListOutputtDetails: oplist,
        // Closed:'N',
        //IsProportion: 'N',
        Prog_Seq_No: 1,
        remarks: $('#remarksli').val(),
        Amend: 'N',
        Approved: 'Y',
        CreatedBy: Guserid,
        ApprovedBy: Guserid,
        FinalizeAutoPost: 'Y',
        ProdRemDetails: remarks
    }

    LoadingSymb();

    $.ajax({
        url: "/ProcessProgram/UpdateProdApp",
        data: JSON.stringify(objedit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            // $('#myModal').modal('hide');

            if (result.Value == 1) {

                AddUserEntryLog('Planning', 'Process Program', 'APPROVED', $('#txtwrkordno').val());
                //alert('Data Updated Successfully');
                // window.location.href = "/ProcessProgram/ProcessProgramIndex";
                $('#myModal3').hide();
                if (Gp == "P") {
                    var msg = 'Data Updated Successfully...';
                    var flg = 1;
                    var mode = 1;
                    var url = "";
                    AlartMessage(msg, flg, mode, url);
                    getbyID(eid);
                } else {
                    var msg = 'Data Updated Successfully...';
                    var flg = 1;
                    var mode = 1;
                    var url = "";
                    AlartMessage(msg, flg, mode, url);
                    //window.location.href = "/ProcessProgramApproval/ProcessProgramApprovalIndex";
                }
            }
            else {
                window.location.href = "/Error/Index";
            }

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });


}

function UpdateProd() {
    debugger;

    var tst = 0;
    if (AccLock.length > 0) {
        $.each(AccLock, function (i) {

            if (AccLock[i].Processid == pid) {
                //alert('Process has been Locked,Please Contact Administrator..');
                var msg = 'Process has been Locked,Please Contact Administrator...';
                var flg = 4;
                var mode = 1;
                var url = "";
                AlartMessage(msg, flg, mode, url);
                //return true;
                tst = 1;
            }
        });
    }

    iplist = new Array();
    oplist = new Array();
    Datas = new Array();

    if (tst == 0) {


        for (var c = 0; c < inputlist.length; c++) {
            var list = {
                Prodprgdetid: $('#txtProddetid').val(),
                Prodprgid: inputlist[c].Prodprgid,// $('#txtProdPrgid').val(),            
                Prog_Op_Qty: inputlist[c].Quantity,// $(tr).find('td:eq(7)').text(),
                ActualPlan_Qty: inputlist[c].Quantity,//$(tr).find('td:eq(7)').text(),
                AltItem: 'N',
                Amended: 'Y',
                Issue_qty: inputlist[c].Issue_qty,
                order_qty: inputlist[c].order_qty,
                Itemid: inputlist[c].ItemId, // $(tr).find('td:eq(0)').text()
                Colorid: inputlist[c].ColorId,//$(tr).find('td:eq(1)').text(),
                Sizeid: inputlist[c].SizeId,// $(tr).find('td:eq(2)').text(),
                InorOut: "I",
                SecQty: inputlist[c].SecQty,//$(tr).find('td:eq(8)').text(),
                CatType: inputlist[c].Type,// $(tr).find('td:eq(9)').text(),
                Required: inputlist[c].Required,//1

            }
            iplist.push(list);

        }

        for (var e = 0; e < outputlist.length; e++) {
            var list = {
                Prodprgdetid: $('#txtProddetid').val(),
                Prodprgid: outputlist[e].Prodprgid,//$('#txtProdPrgid').val(),
                Prog_Op_Qty: outputlist[e].Quantity,// $(tr).find('td:eq(7)').text(),
                ActualPlan_Qty: outputlist[e].Quantity,//$(tr).find('td:eq(7)').text(),
                AltItem: 'N',
                Amended: 'Y',
                Issue_qty: outputlist[e].Issue_qty,
                order_qty: outputlist[e].order_qty,
                Itemid: outputlist[e].ItemId, // $(tr).find('td:eq(0)').text()
                Colorid: outputlist[e].ColorId,//$(tr).find('td:eq(1)').text(),
                Sizeid: outputlist[e].SizeId,// $(tr).find('td:eq(2)').text(),
                InorOut: "O",
                SecQty: outputlist[e].SecQty,//$(tr).find('td:eq(8)').text(),
                CatType: outputlist[e].CatType,// $(tr).find('td:eq(9)').text(),
                Required: outputlist[e].Required,//1

            }
            oplist.push(list);
        }

        //$(":checkbox").each(function () {
        //    ischecked = $('#Openprg').is(":checked");

        //});
        var remarks = [];
        var ProgramType = '';
        if ($('#txtRemark').val() != "") {

            var rem = {
                ProdPrgId: $('#txtProdPrgid').val(),
                Job_Ord_No: $('#txtwrkordno').val(),
                Prog_Seq_No: 1,
                Remarks: $('#txtRemark').val()
            }
            remarks.push(rem);
            ProgramType = 'G';
        }
        else {
            ProgramType = 'P';
        }

        var opchk = [];
        var ipchk = [];
        for (var y = 0; y < outputlist.length; y++) {
            if (outputlist[y].Quantity > 0) {
                opchk.push(outputlist[y]);
            }
        }


        for (var u = 0; u < inputlist.length; u++) {
            if (inputlist[u].Quantity > 0) {
                ipchk.push(inputlist[u]);
            }
        }
        if (opchk.length == 0 || ipchk.length == 0) {
            //alert('Please fill atleast any one qty...');
            var msg = 'Please fill atleast any one quantity...';
            var flg = 4;
            var mode = 1;
            var url = "";
            AlartMessage(msg, flg, mode, url);
            return true;
        }
        var objedit = {

            ProdPrgid: $('#txtProdPrgid').val(),
            ProdPrgNo: $('#txtprdprgno').val(),
            ProgDate: $('#txtplanprogdate').val(),
            ProcessId: pid,// 3,// tableload[0].,// ProcessId,
            //ProcessId: prodplanningList.ProcessId,
            Job_ord_no: $('#txtwrkordno').val(),
            companyunitid: loadlist[0].CompanyUnitId,//5,//prodplanningedit[0].CompanyUnit,// CompanyUnitId,
            companyid: loadlist[0].CompanyId,//1,// CompanyId,
            OrderType: Ordertype,//'W',// Ordertype,//$('#optworkorder').val(),
            ProgramType: Programtype,//$('#txtprocess').val()
            ProdListInputDetails: iplist,// Datas[n][k],
            ProdListOutputtDetails: oplist,
            // Closed:'N',
            //IsProportion: 'N',
            Prog_Seq_No: 1,
            remarks: $('#remarksli').val(),
            Amend: 'N',
            Approved: 'N',
            CreatedBy: Guserid,
            ApprovedBy: Guserid,
            FinalizeAutoPost: 'Y',
            ProdRemDetails: remarks
        }
        $("#btnupd").attr("disabled", true);
        LoadingSymb();

        $.ajax({
            url: "/ProcessProgram/UpdateProd",
            data: JSON.stringify(objedit),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                debugger;
                // $('#myModal').modal('hide');

                if (result.Value == 1) {
                    AddUserEntryLog('Planning', 'Process Program', 'UPDATE', $('#txtwrkordno').val());
                    //alert('Data Updated Successfully');
                    var msg = 'Data Updated Successfully...';
                    var flg = 1;
                    var mod = 1;
                    var url = "";
                    AlartMessage(msg, flg, mod, url);
                    // window.location.href = "/ProcessProgram/ProcessProgramIndex";
                    //$('#myModal3').hide();
                    //if (Gp == "P") {
                    //    getbyID(eid);
                    //} else {
                    //    window.location.href = "/ProcessProgram/ProcessProgramIndex";
                    //}

                    $('#myModal3').modal('hide');
                    getbyID(comeid, 0);

                    // window.location.href = "/ProcessProgram/ProcessProgramIndex";
                }
                else {
                    window.location.href = "/Error/Index";
                }

            },
            failure: function (errMsg) {
                alert(errMsg);
            }
        });

    }

}

function UpdateComp() {
    debugger;

    for (var d = 0; d < compedit.length; d++) {
        var det = {
            Prodprgdetid: compedit[d].Prodprgdetid,//$('#txtProddetidcomp').val(),
            Prodprgid: compedit[d].Prodprgid,//$('#txtProdPrgidcomp').val(),
            ActualPlan_Qty: compedit[d].Prog_Op_Qty,
            Prog_Op_Qty: compedit[d].Prog_Op_Qty,//arr[d],// $("#comptable tr:eq(" + d + ") td:eq(4)").html(),//$(tr).find('td:eq(9)').text(),
            LastProcessid: 3,
            Issue_qty: compedit[d].Prog_Op_Qty,
            MarkupValue: 0.00,
            CColorID: compedit[d].CColorID,// $(tr).find('td:eq(2)').text(),
            Itemid: compedit[d].Itemid,//$(tr).find('td:eq(0)').text(),
            Colorid: compedit[d].Colorid,// $(tr).find('td:eq(1)').text(),
            Sizeid: compedit[d].Sizeid,// $(tr).find('td:eq(3)').text(),
            Componentid: compedit[d].Componentid,//$(tr).find('td:eq(4)').text(),
            Rejectedqty: 0.00,
            Receipt_Qty: 0.00,
            Return_Qty: 0.00,
            IP_MarkupRate: 0.00,
            Rejectedqty: 0.00,
            CatType: 'SS',//$(tr).find('td:eq(9)').text(),
            Required: compedit[d].Required
        }
        compdetaillist.push(det);
    }



    var objrst = {
        ProdPrgid: compedit[0].Prodprgid,// $('#txtProdPrgidcomp').val(),
        Prodprgno: $('#txtprdprgnocomp').val(),
        ProgDate: $('#txtplanprogdatecomp').val(),
        ProcessId: ProcessId,
        Job_ordno: $('#txtwrkordnocomp').val(),
        companyunitid: loadlist[0].CompanyUnitId,// $('#txtplancompunitcomp').val(),
        companyid: loadlist[0].CompanyId,
        remarks: $('#compremarks').val(),
        OrderType: loadlist[0].Ordertype,
        ProgramType: loadlist[0].Programtype,
        Prog_Seq_No: 1,
        Closed: 'N',
        Amend: 'N',
        CreatedBy: Guserid,
        Approved: 'N',
        CompListDet: compdetaillist
    };
    LoadingSymb();
    $.ajax({
        url: "/ProcessProgram/UpdateComp",
        data: JSON.stringify(objrst),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            // $('#myModal').modal('hide');
            if (result.Value == 1) {
                //alert('Data Updated Successfully');
                var msg = 'Data Updated Successfully...';
                var flg = 1;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                $('#myModal4').hide();

                getbyID(eid);
            }
            else {
                //alert('Data not saved properly');
                var msg = 'Data not saved properly...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
            }
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });


}

function Deleteprod() {
    debugger;
    var tst = 0;
    if (AccLock.length > 0) {
        $.each(AccLock, function (i) {

            if (AccLock[i].Processid == ProcessId) {
                //alert('Process has been Locked,Please Contact Administrator..');
                var msg = 'Process has been Locked,Please Contact Administrator...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                //return true;
                tst = 1;
            }
        });
    }
    if (tst == 0) {
        proddelid;
        var ans = confirm("Are you sure you want to delete this Record?");
        if (ans) {
            $("#btncancel").attr("disabled", true);
            LoadingSymb();
            $.ajax({
                url: "/ProcessProgram/Proddelete/" + proddelid,
                type: "POST",
                contentType: "application/json;charset=UTF-8",
                dataType: "json",
                success: function (result) {

                    debugger;
                    if (result.Value == true) {
                        AddUserEntryLog('Planning', 'Process Program', 'DELETE', $('#txtwrkordno').val());
                        //alert("Data Deleted successfully...");
                        var msg = 'Data Deleted successfully...';
                        var flg = 2;
                        var mod = 1;
                        var url = "";
                        AlartMessage(msg, flg, mod, url);

                        $('#myModal3').modal('hide');
                        Delete(comeid, 0);

                        //if (Gp == "P") {

                        //    //$('#myModal3').hide();
                        //    //$('#tblprodprocess').DataTable().destroy();
                        //    //Delete(did);
                        //    window.location.href = "/ProcessProgram/ProcessProgramIndex";

                        //} else {
                        //    window.location.href = "/ProcessProgram/ProcessProgramIndex";
                        //}
                    }
                    else {

                        window.location.href = "/Error/Index";
                    }
                    // $('#tblmain').DataTable().destroy();
                    //loadData();
                },
                error: function (errormessage) {
                    alert(errormessage.responseText);
                }
            });
        }
    }

}

function ShowMain() {
    $("#myModal2").hide();
}

function DeleteComp() {

    debugger;
    compdelid;
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        LoadingSymb();
        $.ajax({
            url: "/ProcessProgram/Compdelete/" + compdelid,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                debugger;
                // if (result.Value == 'true') {
                //alert("Data Deleted successfully...");
                var msg = 'Data Deleted successfully...';
                var flg = 2;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                $('#myModal4').hide();
                Delete(did);
                // }
                // $('#tblmain').DataTable().destroy();
                //loadData();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

function Buy_ord_Print(PJRoId, maxid) {
    debugger;
    GJobId = PJRoId;
    GMaxChk = maxid;

    $('#myModal5').show();
    $('#myModal5').modal('show');


}

function SubReport() {
    debugger;
    var compid = $('#ddlMCompany').val();
    var src = '../ReportInline/Planning/ProcessProg/ProcessProgInline.aspx?';
    src = src + "JobId=" + GJobId;
    var iframe = '<iframe id="reportFrame" align="center" width="100%" height="1000px" background-image="none" frameborder="0" src="' + src + '" allowfullscreen></iframe>';
    $("#divReport").html(iframe);
    window.open("../ReportInline/Planning/ProcessProg/ProcessProgInline.aspx?JobId=" + GJobId + "&Companyid=" + compid + "&Seqno=" + GMaxChk);
}

function backtomain() {
    $('#myModal5').hide();
    $('#myModal5').modal('hide');
}

function ProdProgram() {

    var Prg = "P";

    Gp = Prg;
    // $('#tblprodprgfst').DataTable().destroy();

    loadData(Gp);
    CheckRights("ProcessProgram");
}
function OpenProgram() {

    var Prg = "G";

    Gp = Prg;
    //$('#tblprodprgfst').DataTable().destroy();
    load();
    loadData(Gp);
    CheckRights("ProcessProgram");
}


function CheckPrgMadeEntry(Itmid, Colorid, Sizeid) {
    debugger;
    var WOrdNo = $('#txtwrkordno').val();
    var ProgNo = $('#txtprdprgno').val();


    $.ajax({
        url: "/ProcessProgram/LoadCheckPrgInpMadeEntryDetails",
        data: JSON.stringify({ Job_ord_no: WOrdNo, ProdPrgNo: ProgNo, ProcessId: pid, Itemid: Itmid, Colorid: Colorid, Sizeid: Sizeid }),
        type: "POST",
        async: false,
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            CEPGItemList = result;
            if (CEPGItemList.length > 0) {


                for (var x = 0; x < CEPGItemList.length; x++) {

                    //alert("Process Dc has been made for " + CEPGItemList[x].ProdPrgNo + ",Please Check it....")
                    var msg = "Process Dc has been made for " + CEPGItemList[x].ProdPrgNo + ",Please Check it...";
                    var flg = 4;
                    var mod = 1;
                    var url = "";
                    AlartMessage(msg, flg, mod, url);
                    $("#ddlInpItem").attr('disabled', true);
                    $("#ddlInpColor").attr('disabled', true);
                    $("#ddlInpSize").attr('disabled', true);
                    //$('#btnAdd').hide();
                    return true;
                }



            } else {
                $("#ddlInpItem").attr('disabled', false);
                $("#ddlInpColor").attr('disabled', false);
                $("#ddlInpSize").attr('disabled', false);
            }

        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function CheckPrgMadeOutEntry(Itmid, Colorid, Sizeid) {
    debugger;
    var WOrdNo = $('#txtwrkordno').val();
    var ProgNo = $('#txtprdprgno').val();


    $.ajax({
        url: "/ProcessProgram/LoadCheckPrgOutMadeEntryDetails",
        data: JSON.stringify({ Job_ord_no: WOrdNo, ProdPrgNo: ProgNo, ProcessId: pid, Itemid: Itmid, Colorid: Colorid, Sizeid: Sizeid }),
        type: "POST",
        async: false,
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            CEPGOItemList = result;
            if (CEPGOItemList.length > 0) {


                for (var x = 0; x < CEPGOItemList.length; x++) {

                    //alert("Process Receipt has been made for " + CEPGOItemList[x].ProdPrgNo + ",Please Check it....")
                    var msg = "Process Receipt has been made for " + CEPGOItemList[x].ProdPrgNo + ",Please Check it....";
                    var flg = 4;
                    var mod = 1;
                    var url = "";
                    AlartMessage(msg, flg, mod, url);
                    $("#ddlOPItem").attr('disabled', true);
                    $("#ddlOPColor").attr('disabled', true);
                    $("#ddlOPSize").attr('disabled', true);
                    //$('#btnAdd').hide();
                    return true;
                }



            } else {
                $("#ddlOPItem").attr('disabled', false);
                $("#ddlOPColor").attr('disabled', false);
                $("#ddlOPSize").attr('disabled', false);
            }

        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadlastPrgmDDL(JobNo, Prodpgmno) {
    debugger;
    $.ajax({
        url: "/ProcessProgram/GetLastProcessdllList",
        data: JSON.stringify({ JobOrdNo: JobNo, ProdPgmNo: Prodpgmno }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            lastproslist = obj;
            if (obj.length > 0) {
                $("#ddlinputlstpro").empty();
                $("#ddlinputlstpro").append($('<option/>').val('0').text('--Select Process--'));
                $.each(obj, function () {
                    $("#ddlinputlstpro").append($("<option></option>").val(this.ProcessId).text(this.ProcessName));

                });


                $("#ddloutputlstpro").empty();
                $("#ddloutputlstpro").append($('<option/>').val('0').text('--Select Process--'));
                $.each(obj, function () {
                    $("#ddloutputlstpro").append($("<option></option>").val(this.ProcessId).text(this.ProcessName));

                });
            }

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function myinprocess(id) {
    debugger;
    var pgmid = 0;
    $.each(lastproslist, function (t) {
        if (this.ProcessId == id) {
            pgmid = this.SeqNo;
        }
    });
    LoadlastPrgmdetlist(pgmid, 'I', "Inpros");
}

function myopprocess(id) {
    debugger;
    var pgmid = 0;
    $.each(lastproslist, function (t) {
        if (this.ProcessId == id) {
            pgmid = this.SeqNo;
        }
    });
    LoadlastPrgmdetlist(pgmid, 'O', "Outpros");
}

function LoadlastPrgmdetlist(Prodpgmno, Iotype, prosType) {
    debugger;
    var IOTYPE = 'O';
    $.ajax({
        url: "/ProcessProgram/GetlastProcessPgmList",
        data: JSON.stringify({ ProdPgmNo: Prodpgmno, ioType: IOTYPE }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;

            if (obj != undefined) {
                proIOList = obj;

                if (prosType == "Inpros") {
                    if (Mode == 1) {
                        var ilist = [];
                        for (var i = 0; proIOList.length > i; i++) {
                            ilist.push(proIOList[i]);
                        }
                        for (var i = 0; Inputeditlist.length > i; i++) {
                            ilist.push(Inputeditlist[i]);
                        }
                        inputlist = ilist;
                        loadInputProcess(inputlist);
                    }
                    else {
                        loadInputProcess(proIOList);
                        iputlist = proIOList;
                        inputlist = iputlist;
                    }
                }
                else if (prosType == "Outpros") {

                    if (Mode == 1) {
                        var olist = [];
                        for (var i = 0; proIOList.length > i; i++) {
                            olist.push(proIOList[i]);
                        }
                        for (var i = 0; Outputeditlist.length > i; i++) {
                            olist.push(Outputeditlist[i]);
                        }
                        outputlist = olist;
                        loadOutputProcess(outputlist);
                    }
                    else {

                        loadOutputProcess(proIOList);
                        oputlist = proIOList;
                        outputlist = oputlist;
                    }
                }
            }
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function CloseAddProgramList() {
    debugger;
    //$("#myModal2").hide();
    ////$('#tblprodprgfst').DataTable().destroy();
    //loadData(Gp);
    // window.location.href = "/ProcessProgram/ProcessProgramIndex";
    $('#myModal3').modal('hide');
    if (closeMode == 2) {
        Delete(comeid, 0);
    }
    else if (closeMode == 3) {
        window.location.href = "/ProcessProgram/ProcessProgramIndex";
    }
    else {
        getbyID(comeid, 0);
    }
}


function CheckPlanAmend(jobordno) {
    planamend = 0;
    $.ajax({
        url: "/PlanningConsumption/LoadAmendDetails",
        data: JSON.stringify({ Stylerowid: 0, jmasid: '', Workordno: jobordno }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var amendlist = []
            amendlist = result;
            if (amendlist.length > 0) {
                for (var x = 0; x < amendlist.length; x++) {
                    //alert("Planning amended for " + amendlist[x].Order_No + '-' + amendlist[x].Style + ",Please Check it....")
                    var msg = "Planning amended for " + amendlist[x].Order_No + ' - ' + amendlist[x].Style + ",Please Check it...";
                    var flg = 4;
                    var mod = 1;
                    var url = "";
                    AlartMessage(msg, flg, mod, url);
                    planamend = planamend + 1;
                    return true;
                }
            } else {
                $("#btnAdd").attr("disabled", false);
            }

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LockAcc() {
    var ord = $('#txtjobordno').val();
    var sty = 1;

    $.ajax({
        url: "/BudgetApproval/LoadLockDet",
        data: JSON.stringify({ ordno: ord, styleid: sty, Type: 'R' }),
        type: "POST",
        async: false,
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;

            AccLock = result.Value;

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}

function LockDet() {
    var ord = $('#txtjobordno').val();
    var sty = 1;

    $.ajax({
        url: "/BudgetApproval/LoadLockDet",
        data: JSON.stringify({ ordno: ord, styleid: sty, Type: 'C' }),
        type: "POST",
        async: false,
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            //var obj = result;
            PlanLock = result.Value;

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}

function TotalPgmQty() {
    debugger;
    var totip = 0;
    $.each(inputlist, function (e) {
        totip = totip + parseFloat(inputlist[e].Quantity);
    })

    if (totip > 0) {
        $('#IpTotal').val(totip.toFixed(3));
    } else {
        $('#IpTotal').val('');
    }

    var totop = 0;
    $.each(outputlist, function (e) {
        totop = totop + parseFloat(outputlist[e].Quantity);
    })

    if (totop > 0) {
        $('#OpTotal').val(totop.toFixed(3));
    } else {
        $('#OpTotal').val('');
    }

}