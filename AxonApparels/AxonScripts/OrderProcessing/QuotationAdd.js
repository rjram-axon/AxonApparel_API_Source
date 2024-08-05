var FabDet = [];
var YarnDet = [];
var ProcessDet = [];
var CommDet = [];
var CmtDet = [];
var BomDet = [];
var YanrFabList = [];
var fabid = 0;
var ComponentId = 0;
var fab = "";
var fabwt = 0;
var fabprocid = 0;
var ProcCompoId = 0;
var fabproc = "";
var uom = 0;
var CompanyId = 0;
var Qutid = 0;
var Userid = 0;
var UserName = 0;
var MainFDate = 0;
var Guserid = 0;
var Mode = 0;
var EditYarnId = 0;
var EditYarnSize = 0;
var EditGetEnqId = 0;
//var fabindex = -1;
$(document).ready(function () {
    debugger;
    Guserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    MainFDate = $("#hdMainFromDate").data('value');
    LoadCompanyDDL("#ddlACompany");
    LoadBuyerDDL("#ddlABuyer");
    LoadStyleDDL("#ddlStyle");
    LoadGUomDDL("#ddlordunit");

    LoadComponentDDL("#ddlfabricComponent");
    LoadFabricDDL("#ddlfabType");
    LoadItemDDL('#ddlbomitem');
    LoadYarnDDL("#ddlyarnComponent");
    LoadYSizeDDL("#ddlyarnType");

    LoadProcessDDL("#ddlProComponent");

    //LoadYarnDDL("#ddlbomitem");
    LoadOverhdsDDL("#ddlcommComponent");

    LoadCurrencyDDL("#ddlACurrency");
    var protype = $('input[name="PoType"]:checked').attr('value');
    if (protype == 'O') {
        // $('#enqnum').disabled();
        $("#txtEnquiryNo").prop("disabled", true);
        $("#txtEnquiryRef").prop("disabled", true);
        $("#txtRefStyle").prop("disabled", true);
        $("#txtDate").prop("disabled", true);
        $("#txtDate1").prop("disabled", true);
    } 
    //else {
    //    $("#fromunit").hide();
    //}


    var qrStr = window.location.search;
    var spQrStr = qrStr.substring(1);
    var arrQrStr = new Array();
    var arr = spQrStr.split('?');

    for (var i = 0; i < arr.length; i++) {
        var queryvalue = arr[i].split('=');
    }
    var Id = queryvalue[1];
    Mode = queryvalue[3];
    if (Mode == 0) {
        getDate();


    }
    getprocess();

    if (Mode == 0) {
        CompanyId = Id;
        GenerateNumber();
    }


    getenqno();
    if (Mode == 1 || Mode == 2) {
        Qutid = Id;
        getmasdet();
        getfabric();
        getyarn();
        getprocessdet();
        getbom();
        getcmt();
        getcomm();
    }
    if (Mode == 0) {
        $('#btnupd').hide();
        $('#btnadd').show();
        $('#btndel').hide();
    }

    if (Mode == 1) {
        $('#btnupd').show();
        $('#btnadd').hide();
        $('#btndel').hide();
    }

    if (Mode == 2) {
        $('#btnupd').hide();
        $('#btnadd').hide();
        $('#btndel').show();
    }

    $('#btncomponentupdate').hide();
    $('#btnyarncomponentupdate').hide();
    $('#btnprocomponentupdate').hide();
    $('#btnbomcomponentupdate').hide();

    $('#btncomponentadd').click(function () {
        debugger;
        var isAllValid = true;
        var pur = 0;
        var lengdp = 0;

        if ($('#chklistitem1').is(":checked")) {
            pur = 1;
        }
        else {
            pur = 0;
        }

        if ($('#ddlfabricComponent').val() == "0") {
            isAllValid = false;
            $('#ddlfabricComponent').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#ddlfabricComponent').siblings('span.error').css('visibility', 'hidden');
        }

        if ($('#ddlfabType').val() == "0") {
            isAllValid = false;
            $('#ddlfabType').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#ddlfabType').siblings('span.error').css('visibility', 'hidden');
        }

        if ($('#txtConsumption').val() == "") {
            isAllValid = false;
            $('#txtConsumption').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#txtConsumption').siblings('span.error').css('visibility', 'hidden');
        }
        //if ($('#txtRemarks').val() == "") {
        //    isAllValid = false;
        //    $('#txtRemarks').siblings('span.error').css('visibility', 'visible');
        //}
        //else {
        //    $('#txtRemarks').siblings('span.error').css('visibility', 'hidden');
        //}


        if (FabDet.length == 0) {
            lengdp = 1;
        }
        else {
            lengdp = FabDet.length + 1;
        }

        if (isAllValid) {
            // alert('true');
            var FabDetObj = {
                SNo: lengdp,
                // QuoteId:0,// $("#ddlfabricComponent option:selected").text(),
                DetId: 0,//$('#ddlYarn').val(),
                CompID: $("#ddlfabricComponent option:selected").val(),
                Comp: $("#ddlfabricComponent option:selected").text(),
                FabID: $("#ddlfabType option:selected").val(),
                Fab: $("#ddlfabType option:selected").text(),
                Weight: $("#txtConsumption").val(),
                GSM: $("#txtgsm").val(),
                Remarks: $('#txtRemarks').val(),
                Fab_purchase: pur,//$('#txtPer').val(),
                BaseQty: $("#txtConsumption").val(),// 0,//$('#txtWeight').val(),
                Uomid: uom// $('#txtActualWeight').val(),


                // Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
            };

            FabDet.push(FabDetObj);
            LoadFabrictab(FabDet);
            //if (YanrFabList.length > 0) {
            //    for (var n = 0; n < YanrFabList.length; n++) {
            //        if (YanrFabList[n][FabID] == FabDetObj[0][FabID]) {
            //            YanrFabList[n][Weight] = YanrFabList[n][Weight] + FabDetObj[0][Weight]
            //        } else {
            //            YanrFabList.push(FabDetObj);
            //        }
            //    }
            //} else {

            //    YanrFabList.push(FabDetObj);
            //}
        }
        fnClearfabricDetailsControls();

    });
    $(document).on('click', '.btnfabedit', function () {
        debugger;
        rowindex = $(this).closest('tr').index();

        var cur1 = FabDet.slice(rowindex);

        // if (Mode == 0) {

        $('#ddlfabricComponent').val(cur1[0]['CompID']).trigger('change');
        $('#ddlfabType').val(cur1[0]['FabID']).trigger('change');
        $('#txtConsumption').val(cur1[0]['Weight']);
        $('#txtRemarks').val(cur1[0]['Remarks']);
        $('#txtgsm').val(cur1[0]['GSM']);

        var table = $('#tblfabricdetails').DataTable();
        var FabDetid = table.row($(this).parents('tr')).data()["FabID"];
        for (var i = 0; i < YarnDet.length; i++) {
            if (YarnDet[i].FabID == FabDetid) {
                $('#ddlfabType').attr('disabled', true);
                
            }
        }
        for (var n = 0; n < ProcessDet.length; n++) {
            if (ProcessDet[n].Fabricid == FabDetid) {
                $('#ddlfabType').attr('disabled', true);
               
            }
        }
        if (Mode == 1) {
            
        }
        //}
        var Chk = cur1[0]['Fab_purchase'];

        if (Chk == 0) {
            document.getElementById("chklistitem1").checked = false;
        } else if (Chk == 1) {
            document.getElementById("chklistitem1").checked = true;
        }

        $('#btncomponentadd').hide();
        $('#btncomponentupdate').show();
    });

    $('#btncomponentupdate').click(function () {
        debugger;
        var currentrowsel = FabDet.slice(rowindex);

        currentrowsel[0]['CompID'] = $("#ddlfabricComponent").val();
        currentrowsel[0]['Comp'] = $("#ddlfabricComponent option:selected").text();

        currentrowsel[0]['FabID'] = $("#ddlfabType").val();
        currentrowsel[0]['Fab'] = $("#ddlfabType option:selected").text();

        currentrowsel[0]['Weight'] = $("#txtConsumption").val();
        currentrowsel[0]['Remarks'] = $("#txtRemarks").val();
        currentrowsel[0]['GSM'] = $("#txtgsm").val();
        //currentrowsel[0]['Fab_purchase'] = $("#txtLossPer").val();
        //currentrowsel[0]['SNo'] = $("#txtWeight").val();



        if ($('#chklistitem1').is(":checked")) {
            currentrowsel[0]['Fab_purchase'] = 1;
        }
        else {
            currentrowsel[0]['Fab_purchase'] = 0;
        }


        FabDet[rowindex] = currentrowsel[0];

        LoadFabrictab(FabDet);

        $('#btncomponentupdate').hide();
        $('#btncomponentadd').show();
        fnClearfabricDetailsControls();

        $('#ddlfabType').attr('disabled', false);

    });

    $(document).on('click', '.btnfabremove', function () {
        rowindex = $(this).closest('tr').index();
        var DelMode = 1;
        var table = $('#tblfabricdetails').DataTable();
        var FabDetid = table.row($(this).parents('tr')).data()["FabID"];
        for (var i = 0; i < YarnDet.length; i++) {
            if (YarnDet[i].FabID == FabDetid) {
                DelMode = 0;
                //alert('This Fabric Made for Yarn...')
                var msg = 'This Fabric Made for Yarn...';
                var flg = 4;
                var mod = 1;
                var ur = "";
                AlartMessage(msg, flg, mod, ur);
                return true;
            }
        }
        for (var n = 0; n < ProcessDet.length; n++) {
            if (ProcessDet[n].Fabricid == FabDetid) {
                DelMode = 0;
                //alert('This Fabric Made for Process..')
                var msg = 'This Fabric Made for Process...';
                var flg = 4;
                var mod = 1;
                var ur = "";
                AlartMessage(msg, flg, mod, ur);
                return true;
            }
        }
        if (DelMode == 1) {
            FabDet.splice(rowindex, 1);
            document.getElementById("tblfabricdetails").deleteRow(rowindex + 1);
            Loadyarn1tab(FabDet);
            Loadprocess1tab(FabDet);
        }
    });


    $('#btnyarncomponentadd').click(function () {
        debugger;
        if (fabid == 0) {
            //alert('Please select any fabric...');
            var msg = 'Please select any fabric...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
            fnClearYarnDetailsControls();
            return true;
        }
        var per = $('#txtyarnGsm').val();
        //var totper = [];
        //if (YarnDet.length > 0) {
        //    for (var w = 0; w < YarnDet.length; w++) {
        //        if (YarnDet[w].FabID == fabid) {
        //            totper.push(YarnDet[w].Percentage);
        //        }
        //    }
        //    var total = 0;
        //    for (var e = 0; e < totper.length; e++) {
        //        var amount = totper[e];
        //        total = total + parseFloat(amount);

        //    }
        //    var pt = parseFloat(total) + parseFloat(per)
        //    if (pt > 100) {
        //        alert('Percentage should not exceed 100%');
        //        fnClearYarnDetailsControls();
        //        return true;
        //    }
        //}
        //else {
        //    if (per > 100) {
        //        alert('Percentage should not exceed 100%');
        //        fnClearYarnDetailsControls();
        //        return true;
        //    }
        //}
        var isAllValid = true;

        var lengdp = 0;

        if ($('#ddlyarnComponent').val() == "0") {
            isAllValid = false;
            $('#ddlyarnComponent').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#ddlyarnComponent').siblings('span.error').css('visibility', 'hidden');
        }

        if ($('#ddlyarnType').val() == "0") {
            isAllValid = false;
            $('#ddlyarnType').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#ddlyarnType').siblings('span.error').css('visibility', 'hidden');
        }

        if ($('#txtyarnGsm').val() == "") {
            isAllValid = false;
            $('#txtyarnGsm').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#txtyarnGsm').siblings('span.error').css('visibility', 'hidden');
        }
        if ($('#txtyarnWeight').val() == "") {
            isAllValid = false;
            $('#txtyarnWeight').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#txtyarnWeight').siblings('span.error').css('visibility', 'hidden');
        }

        if ($('#txtyarnCost').val() == "") {
            isAllValid = false;
            $('#txtyarnCost').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#txtyarnCost').siblings('span.error').css('visibility', 'hidden');
        }

        if (YarnDet.length == 0) {
            lengdp = 1;
        }
        else {
            lengdp = YarnDet.length + 1;
        }

        if (isAllValid) {
            // alert('true');
            var YarnDetObj = {
                SNo: lengdp,
                Markquoteyarnid: 0,//$("#ddlfabricComponent option:selected").text(),
                // QuoteId: $('#ddlYarn').val(),
                FabID: fabid,// $("#ddlfabricComponent option:selected").val(),
                Fab: fab,// $("#ddlfabricComponent option:selected").text(),
                ComponentId: ComponentId,
                Itemid: $("#ddlyarnComponent option:selected").val(),
                item: $("#ddlyarnComponent option:selected").text(),
                Sizeid: $("#ddlyarnType option:selected").val(),
                size: $('#ddlyarnType option:selected').text(),
                Percentage: $('#txtyarnGsm').val(),// pur,//$('#txtPer').val(),
                Weight: $('#txtyarnWeight').val(),// 0,//$('#txtWeight').val(),
                CostPerKG: $('#txtyarnCost').val(),
                WtCst: 0
                // GSM: $('#txtConsumption').val(),


                // Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
            };
            YarnDet.push(YarnDetObj);
            LoadYarntab(YarnDet);

            if (YarnDet.length > 0) {
                var totalamnt = 0;
                for (var e = 0; e < YarnDet.length; e++) {
                    var amount = YarnDet[e].Weight;
                    totalamnt = totalamnt + parseFloat(amount);

                }
                $('#txtGrammageTotal').val(totalamnt);
                CalcPrice();
            }
        }
        fnClearYarnDetailsControls();

        EditYarnId = 0;
        EditYarnSize = 0;
    });
    $(document).on('click', '.btnyarnedit', function () {
        debugger;

        rowindex = $(this).closest('tr').index();

        var cur1 = YarnDet.slice(rowindex);

        //if (Mode == 0) {

        $('#ddlyarnComponent').val(cur1[0]['Itemid']).trigger('change');
        $('#ddlyarnType').val(cur1[0]['Sizeid']).trigger('change');
        $('#txtyarnGsm').val(cur1[0]['Percentage']);
        $('#txtyarnWeight').val(cur1[0]['Weight']);
        $('#txtyarnCost').val(cur1[0]['CostPerKG']);

        // }
        EditYarnId = cur1[0]['Itemid'];
        EditYarnSize = cur1[0]['Sizeid'];

        $('#btnyarncomponentadd').hide();
        $('#btnyarncomponentupdate').show();

    });
    $('#btnyarncomponentupdate').click(function () {
        debugger;

        var currentrowsel = YarnDet.slice(rowindex);

        currentrowsel[0]['Itemid'] = $("#ddlyarnComponent").val();
        currentrowsel[0]['item'] = $("#ddlyarnComponent option:selected").text();

        currentrowsel[0]['Sizeid'] = $("#ddlyarnType").val();
        currentrowsel[0]['size'] = $("#ddlyarnType option:selected").text();

        currentrowsel[0]['Percentage'] = $("#txtyarnGsm").val();
        currentrowsel[0]['Weight'] = $("#txtyarnWeight").val();
        currentrowsel[0]['CostPerKG'] = $("#txtyarnCost").val();
        //currentrowsel[0]['SNo'] = $("#txtWeight").val();






        YarnDet[rowindex] = currentrowsel[0];

        LoadYarntab(YarnDet);
        if (YarnDet.length > 0) {
            var totalamnt = 0;
            for (var e = 0; e < YarnDet.length; e++) {
                var amount = YarnDet[e].Weight;
                totalamnt = totalamnt + parseFloat(amount);

            }
            $('#txtGrammageTotal').val(totalamnt);
            CalcPrice();
        }


        $('#btnyarncomponentupdate').hide();
        $('#btnyarncomponentadd').show();
        fnClearYarnDetailsControls();
    });

    $(document).on('click', '.btnyarnremove', function () {
        rowindex = $(this).closest('tr').index();
        YarnDet.splice(rowindex, 1);
        document.getElementById("yarn2tab").deleteRow(rowindex + 1);

        if (YarnDet.length > 0) {
            var totalamnt = 0;
            for (var e = 0; e < YarnDet.length; e++) {
                var amount = YarnDet[e].Weight;
                totalamnt = totalamnt + parseFloat(amount);

            }
            $('#txtGrammageTotal').val(totalamnt);
            CalcPrice();
        }

    });


    $(document).on('click', '.loadyarn', function () {
        debugger;
        rowindex = $(this).closest('tr').index();
        var currentrow = FabDet.slice(rowindex);

        fabid = currentrow[0].FabID;
        fab = currentrow[0].Fab;
        fabwt = currentrow[0].Weight;
        ComponentId = currentrow[0].CompID;
        var sepyarn = [];
        if (YarnDet.length > 0) {
            for (var w = 0; w < YarnDet.length; w++) {
                if (YarnDet[w].FabID == fabid) {
                    sepyarn.push(YarnDet[w]);
                }
            }
        }
        LoadYarntab(sepyarn);

    });

    $(document).on('click', '.loadprocess', function () {
        debugger;
        rowindex = $(this).closest('tr').index();
        var currentrow = FabDet.slice(rowindex);

        fabprocid = currentrow[0].FabID;
        fabproc = currentrow[0].Fab;
        ProcCompoId = currentrow[0].CompID;
        var sepproc = [];
        if (ProcessDet.length > 0) {
            for (var w = 0; w < ProcessDet.length; w++) {
                if (ProcessDet[w].Fabricid == fabprocid) {
                    sepproc.push(ProcessDet[w]);
                }
            }
        }
        LoadProcesstab(sepproc);

    });

    $('#btnprocomponentadd').click(function () {
        debugger;


        if (fabprocid == 0) {
            //alert('Please select any fabric...');
            var msg = 'Please select any fabric...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
            fnClearprocDetailsControls();
            return true;
        }
        var per = $('#txtCost').val();

        //Temparerily commended by PeerMohammed 
        //var totper = [];
        //if (ProcessDet.length > 0) {
        //    for (var w = 0; w < ProcessDet.length; w++) {
        //        if (ProcessDet[w].Fabricid == fabprocid) {
        //            totper.push(ProcessDet[w].Cost);
        //        }
        //    }


        //    var total = 0;
        //    for (var e = 0; e < totper.length; e++) {
        //        var amount = totper[e];
        //        total = total + parseFloat(amount);

        //    }
        //    var pt = parseFloat(total) + parseFloat(per)
        //    if (pt > 100) {
        //        alert('Percentage should not exceed 100%');
        //        fnClearprocDetailsControls();
        //        return true;
        //    }
        //}
        //else {
        //    if (per > 100) {
        //        alert('Percentage should not exceed 100%');
        //        fnClearprocDetailsControls();
        //        return true;
        //    }
        //}

        var isAllValid = true;

        var lengdp = 0;

        if ($('#ddlProComponent').val() == "0") {
            isAllValid = false;
            $('#ddlProComponent').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#ddlProComponent').siblings('span.error').css('visibility', 'hidden');
        }



        if ($('#txtCost').val() == "") {
            isAllValid = false;
            $('#txtCost').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#txtCost').siblings('span.error').css('visibility', 'hidden');
        }

        if (ProcessDet.length == 0) {
            lengdp = 1;
        }
        else {
            lengdp = ProcessDet.length + 1;
        }

        if (isAllValid) {
            // alert('true');
            var ProDetObj = {
                SNo: lengdp,
                ProcessId: $("#ddlProComponent option:selected").val(),
                process: $("#ddlProComponent option:selected").text(),
                Fabricid: fabprocid,// $("#ddlyarnComponent option:selected").val(),
                fabric: fabproc,//$("#ddlyarnComponent option:selected").text(),
                ComponentId: ProcCompoId,
                Cost: $("#txtCost").val(),
                Detid: 0,// $('#ddlyarnType option:selected').text(),

            };
            ProcessDet.push(ProDetObj);
            LoadProcesstab(ProcessDet);

            if (ProcessDet.length > 0) {
                //var totalamnt = 0;
                //for (var e = 0; e < ProcessDet.length; e++) {
                //    var amount = ProcessDet[e].Cost;
                //    totalamnt = totalamnt + parseFloat(amount);

                //}
                //$('#txtporSubTotal').val(totalamnt);
                //$('#txtProcessCost').val(totalamnt);
                //$('#txtProcesssCost').val(totalamnt);

                CalcProcTot();
            }
        }
        fnClearprocDetailsControls();
    });

    $(document).on('click', '.btnprocedit', function () {
        debugger;
        rowindex = $(this).closest('tr').index();

        var cur1 = ProcessDet.slice(rowindex);

        //if (Mode == 0) {

        $('#ddlProComponent').val(cur1[0]['ProcessId']).trigger('change');
        $('#txtCost').val(cur1[0]['Cost']);


        // }

        $('#btnprocomponentadd').hide();
        $('#btnprocomponentupdate').show();
    });

    $('#btnprocomponentupdate').click(function () {
        debugger;
        var currentrowsel = ProcessDet.slice(rowindex);

        currentrowsel[0]['ProcessId'] = $("#ddlProComponent").val();
        currentrowsel[0]['process'] = $("#ddlProComponent option:selected").text();

        currentrowsel[0]['Cost'] = $("#txtCost").val();
        ProcessDet[rowindex] = currentrowsel[0];


        if (ProcessDet.length > 0) {
            var totalamnt = 0;
            for (var e = 0; e < ProcessDet.length; e++) {
                var amount = ProcessDet[e].Cost;
                totalamnt = totalamnt + parseFloat(amount);

            }
            $('#txtporSubTotal').val(totalamnt);
            $('#txtProcessCost').val(totalamnt);
        }
        LoadProcesstab(ProcessDet);

        $('#btnprocomponentupdate').hide();
        $('#btnprocomponentadd').show();
        fnClearprocDetailsControls();
    });

    $(document).on('click', '.btnprocremove', function () {
        debugger;
        rowindex = $(this).closest('tr').index();
        ProcessDet.splice(rowindex, 1);
        document.getElementById("process2tab").deleteRow(rowindex + 1);

        if (ProcessDet.length > 0) {
            var totalamnt = 0;
            for (var e = 0; e < ProcessDet.length; e++) {
                var amount = ProcessDet[e].Cost;
                totalamnt = totalamnt + parseFloat(amount);

            }
            $('#txtporSubTotal').val(totalamnt);
            $('#txtProcessCost').val(totalamnt);
        }
    });

    $('#btncommcomponentadd').click(function () {
        debugger;
        var isAllValid = true;

        var lengdp = 0;



        if ($('#ddlcommComponent').val() == "0") {
            isAllValid = false;
            $('#ddlcommComponent').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#ddlcommComponent').siblings('span.error').css('visibility', 'hidden');
        }



        if ($('#txtValue').val() == "") {
            isAllValid = false;
            $('#txtValue').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#txtValue').siblings('span.error').css('visibility', 'hidden');
        }

        //if ($('#txtcommRemarks').val() == "") {
        //    isAllValid = false;
        //    $('#txtcommRemarks').siblings('span.error').css('visibility', 'visible');
        //}
        //else {
        //    $('#txtcommRemarks').siblings('span.error').css('visibility', 'hidden');
        //}

        if (CommDet.length == 0) {
            lengdp = 1;
        }
        else {
            lengdp = CommDet.length + 1;
        }

        if (isAllValid) {
            // alert('true');
            var CommDetObj = {
                SNo: lengdp,
                //QuoteId:,
                MarkquoteCommercialId: 0,
                ParticularID: $("#ddlcommComponent option:selected").val(),
                particular: $("#ddlcommComponent option:selected").text(),
                Cost: $("#txtValue").val(),
                Remarks: $("#txtcommRemarks").val(),


            };
            CommDet.push(CommDetObj);
            LoadCommtab(CommDet);

            if (CommDet.length > 0) {
                var totalamnt = 0;
                for (var e = 0; e < CommDet.length; e++) {
                    var amount = CommDet[e].Cost;
                    totalamnt = totalamnt + parseFloat(amount);

                }
                $('#txtcommSubTotal').val(totalamnt);
                $('#txtCommercialCost').val(totalamnt);
                $('#txtcommcost').val(totalamnt);
            }
        }
        fnClearCommDetailsControls();
    });

    $(document).on('click', '.btncommedit', function () {
        debugger;
        rowindex = $(this).closest('tr').index();

        var cur1 = CommDet.slice(rowindex);

        // if (Mode == 0) {

        $('#ddlcommComponent').val(cur1[0]['ParticularID']).trigger('change');
        $('#txtValue').val(cur1[0]['Cost']);
        $('#txtcommRemarks').val(cur1[0]['Remarks']);

        // }

        $('#btncommcomponentadd').hide();
        $('#btncommcomponentupdate').show();
    });

    $('#btncommcomponentupdate').click(function () {
        debugger;
        var currentrowsel = CommDet.slice(rowindex);

        currentrowsel[0]['ParticularID'] = $("#ddlcommComponent").val();
        currentrowsel[0]['particular'] = $("#ddlcommComponent option:selected").text();

        currentrowsel[0]['Cost'] = $("#txtValue").val();
        currentrowsel[0]['Remarks'] = $("#txtcommRemarks").val();
        CommDet[rowindex] = currentrowsel[0];

        if (CommDet.length > 0) {
            var totalamnt = 0;
            for (var e = 0; e < CommDet.length; e++) {
                var amount = CommDet[e].Cost;
                totalamnt = totalamnt + parseFloat(amount);

            }
            $('#txtcommSubTotal').val(totalamnt);
            $('#txtcommcost').val(totalamnt);
        }

        LoadCommtab(CommDet);

        $('#btncommcomponentupdate').hide();
        $('#btncommcomponentadd').show();
        fnClearCommDetailsControls();
    });

    $(document).on('click', '.btncommremove', function () {
        rowindex = $(this).closest('tr').index();
        CommDet.splice(rowindex, 1);
        document.getElementById("commercialtab").deleteRow(rowindex + 1);

        if (CommDet.length > 0) {
            var totalamnt = 0;
            for (var e = 0; e < CommDet.length; e++) {
                var amount = CommDet[e].Cost;
                totalamnt = totalamnt + parseFloat(amount);

            }
            $('#txtcommSubTotal').val(totalamnt);
            $('#txtcommcost').val(totalamnt);
        }
    });
    $('#btncmtcomponentadd').click(function () {
        debugger;
        var isAllValid = true;

        var lengdp = 0;



        if ($('#ddlcmtitem').val() == "0") {
            isAllValid = false;
            $('#ddlcmtitem').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#ddlcmtitem').siblings('span.error').css('visibility', 'hidden');
        }



        if ($('#txtcmtValue').val() == "") {
            isAllValid = false;
            $('#txtcmtValue').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#txtcmtValue').siblings('span.error').css('visibility', 'hidden');
        }

        //if ($('#txtcmtRemarks').val() == "") {
        //    isAllValid = false;
        //    $('#txtcmtRemarks').siblings('span.error').css('visibility', 'visible');
        //}
        //else {
        //    $('#txtcmtRemarks').siblings('span.error').css('visibility', 'hidden');
        //}

        if (CmtDet.length == 0) {
            lengdp = 1;
        }
        else {
            lengdp = CmtDet.length + 1;
        }

        if (isAllValid) {
            // alert('true');
            var CmtDetObj = {
                SNo: lengdp,
                //QuoteId:,
                // MarkquoteCommercialId:,
                MarkquoteCmtId: 0,
                ProcessID: $("#ddlcmtitem option:selected").val(),
                process: $("#ddlcmtitem option:selected").text(),
                Cost: $("#txtcmtValue").val(),
                Remarks: $("#txtcmtRemarks").val(),


            };
            CmtDet.push(CmtDetObj);
            LoadCmttab(CmtDet);

            if (CmtDet.length > 0) {
                var totalamnt = 0;
                for (var e = 0; e < CmtDet.length; e++) {
                    var amount = CmtDet[e].Cost;
                    totalamnt = totalamnt + parseFloat(amount);

                }
                $('#txtcmtSubTotal').val(totalamnt);
                $('#txtCMTtotCost').val(totalamnt);
                $('#txtCMTCost').val(totalamnt);
            }
        }
        fnClearcmtDetailsControls();
    });

    $(document).on('click', '.btncmtedit', function () {
        debugger;
        rowindex = $(this).closest('tr').index();

        var cur1 = CmtDet.slice(rowindex);

        // if (Mode == 0) {

        $('#ddlcmtitem').val(cur1[0]['ProcessID']).trigger('change');
        $('#txtcmtValue').val(cur1[0]['Cost']);
        $('#txtcmtRemarks').val(cur1[0]['Remarks']);

        //  }

        $('#btncmtcomponentadd').hide();
        $('#btncmtcomponentupdate').show();
    });
    $('#btncmtcomponentupdate').click(function () {
        debugger;
        var currentrowsel = CmtDet.slice(rowindex);

        currentrowsel[0]['ProcessID'] = $("#ddlcmtitem").val();
        currentrowsel[0]['process'] = $("#ddlcmtitem option:selected").text();

        currentrowsel[0]['Cost'] = $("#txtcmtValue").val();
        currentrowsel[0]['Remarks'] = $("#txtcmtRemarks").val();
        CmtDet[rowindex] = currentrowsel[0];

        if (CmtDet.length > 0) {
            var totalamnt = 0;
            for (var e = 0; e < CmtDet.length; e++) {
                var amount = CmtDet[e].Cost;
                totalamnt = totalamnt + parseFloat(amount);

            }
            $('#txtcmtSubTotal').val(totalamnt);
            $('#txtCMTCost').val(totalamnt);
        }

        LoadCmttab(CmtDet);

        $('#btncmtcomponentupdate').hide();
        $('#btncmtcomponentadd').show();
        fnClearcmtDetailsControls();
    });

    $(document).on('click', '.btncmtremove', function () {
        rowindex = $(this).closest('tr').index();
        CmtDet.splice(rowindex, 1);
        document.getElementById("cmttab").deleteRow(rowindex + 1);

        if (CmtDet.length > 0) {
            var totalamnt = 0;
            for (var e = 0; e < CmtDet.length; e++) {
                var amount = CmtDet[e].Cost;
                totalamnt = totalamnt + parseFloat(amount);

            }
            $('#txtcmtSubTotal').val(totalamnt);
            $('#txtCMTCost').val(totalamnt);
        }
    });

    $('#btnbomcomponentadd').click(function () {
        debugger;
        var isAllValid = true;

        var lengdp = 0;



        if ($('#ddlbomitem').val() == "0") {
            isAllValid = false;
            $('#ddlbomitem').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#ddlbomitem').siblings('span.error').css('visibility', 'hidden');
        }



        if ($('#txtQuantity').val() == "") {
            isAllValid = false;
            $('#txtQuantity').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#txtQuantity').siblings('span.error').css('visibility', 'hidden');
        }
        if ($('#txtUnit').val() == "") {
            isAllValid = false;
            $('#txtUnit').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#txtUnit').siblings('span.error').css('visibility', 'hidden');
        }

        if ($('#txtUnitCost').val() == "") {
            isAllValid = false;
            $('#txtUnitCost').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#txtUnitCost').siblings('span.error').css('visibility', 'hidden');
        }
        if ($('#txtbomValue').val() == "") {
            isAllValid = false;
            $('#txtbomValue').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#txtbomValue').siblings('span.error').css('visibility', 'hidden');
        }

        //if ($('#txtbomRemarks').val() == "") {
        //    isAllValid = false;
        //    $('#txtbomRemarks').siblings('span.error').css('visibility', 'visible');
        //}
        //else {
        //    $('#txtbomRemarks').siblings('span.error').css('visibility', 'hidden');
        //}

        if (BomDet.length == 0) {
            lengdp = 1;
        }
        else {
            lengdp = BomDet.length + 1;
        }

        if (isAllValid) {
            // alert('true');
            var BomDetObj = {
                SNo: lengdp,
                //QuoteId:,
                // MarkquoteCommercialId:,
                MarkquoteaccId: 0,
                ItemID: $("#ddlbomitem option:selected").val(),
                item: $("#ddlbomitem option:selected").text(),
                Uomid: $("#txtUnitid").val(),
                uom: $("#txtUnit").val(),
                Quantity: $("#txtQuantity").val(),
                UnitCost: $("#txtUnitCost").val(),
                value: $("#txtbomValue").val(),
                Remarks: $("#txtbomRemarks").val(),
                ItemType: 'O'

            };
            BomDet.push(BomDetObj);
            LoadBomtab(BomDet);

            if (BomDet.length > 0) {
                var totalamnt = 0;
                for (var e = 0; e < BomDet.length; e++) {
                    var amount = BomDet[e].value;
                    totalamnt = totalamnt + parseFloat(amount);

                }
                $('#txtbomsubtot').val(totalamnt);
                $('#txtBOMCost').val(totalamnt);
                $('#txtAccessoriesCost').val(totalamnt);
            }
        }
        fnClearBomDetailsControls();
    });
    $(document).on('click', '.btnbomedit', function () {
        debugger;
        rowindex = $(this).closest('tr').index();

        var cur1 = BomDet.slice(rowindex);

        // if (Mode == 0) {
        $('#ddlbomitem').val(cur1[0]['ItemID']).trigger('change');
        $('#txtUnitid').val(cur1[0]['Uomid']);
        $('#txtUnit').val(cur1[0]['uom']);
        $('#txtQuantity').val(cur1[0]['Quantity']);
        $('#txtUnitCost').val(cur1[0]['UnitCost']);
        $('#txtbomValue').val(cur1[0]['value']);
        $('#txtbomRemarks').val(cur1[0]['Remarks']);
        //  }

        $('#btnbomcomponentadd').hide();
        $('#btnbomcomponentupdate').show();
    });

    $('#btnbomcomponentupdate').click(function () {
        debugger;
        var currentrowsel = BomDet.slice(rowindex);

        currentrowsel[0]['ItemID'] = $("#ddlbomitem").val();
        currentrowsel[0]['item'] = $("#ddlbomitem option:selected").text();

        currentrowsel[0]['Uomid'] = $("#txtUnitid").val();
        currentrowsel[0]['uom'] = $("#txtUnit").val();
        currentrowsel[0]['Quantity'] = $("#txtQuantity").val();
        currentrowsel[0]['UnitCost'] = $("#txtUnitCost").val();
        currentrowsel[0]['value'] = $("#txtbomValue").val();
        currentrowsel[0]['Remarks'] = $("#txtbomRemarks").val();
        BomDet[rowindex] = currentrowsel[0];

        if (BomDet.length > 0) {
            var totalamnt = 0;
            for (var e = 0; e < BomDet.length; e++) {
                var amount = BomDet[e].value;
                totalamnt = totalamnt + parseFloat(amount);
            }
            $('#txtbomsubtot').val(totalamnt);
            $('#txtAccessoriesCost').val(totalamnt);
        }

        LoadBomtab(BomDet);

        $('#btnbomcomponentupdate').hide();
        $('#btnbomcomponentadd').show();
        fnClearBomDetailsControls();
    });

    $(document).on('click', '.btnbomremove', function () {
        rowindex = $(this).closest('tr').index();
        BomDet.splice(rowindex, 1);
        document.getElementById("bomtab").deleteRow(rowindex + 1);

        if (BomDet.length > 0) {
            var totalamnt = 0;
            for (var e = 0; e < BomDet.length; e++) {
                var amount = BomDet[e].value;
                totalamnt = totalamnt + parseFloat(amount);
            }
            $('#txtbomsubtot').val(totalamnt);
            $('#txtAccessoriesCost').val(totalamnt);
        }
    });
});

//$(document).ready(function () {
//    $("#tblfabricdetails ").dataTable().find("tbody").on('click', 'tr', function () {
//        fabindex = (this.rowIndex) - 1;
//    });
//});

function getenqno() {
    debugger;
    var c = $('#ddlACompany').val();
    if (c == 0) {
        //alert('select company..');
        var msg = 'Please select company...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        return true;
    }
    $.ajax({
        url: "/QuotationAdd/Getenqno",
        data: JSON.stringify({ cid: c }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            
                var data = result.Value;
                $(txtEnquiryNo).empty();
                $(txtEnquiryNo).append($('<option/>').val('0').text('--Select EnquiryNo--'));
                $.each(data, function () {
                    $(txtEnquiryNo).append($('<option></option>').val(this.EnquiryId).text(this.enquiryno));
                });
                if (EditGetEnqId != 0) {
                    $('#txtEnquiryNo').val(EditGetEnqId);
                }
            
        }
    });
}

function CalcPrice() {
    debugger;
    var totalamnt = 0;
    var totalgram = 0;

    for (var e = 0; e < YarnDet.length; e++) {
        var res = YarnDet[e].Weight * YarnDet[e].CostPerKG;
        res = res.toFixed(3);
        YarnDet[e].WtCst = res;
        totalamnt = parseFloat(totalamnt) + parseFloat(res);
        totalgram = parseFloat(totalgram) + parseFloat(YarnDet[e].Weight);
    }

    $('#txtGrammageTotal').val(totalgram.toFixed(3));

    var gram = $('#txtGrammageTotal').val();

    var pr = parseFloat(totalamnt / gram).toFixed(3);
    $('#txtPriceKg').val(pr);
    var sub = parseFloat((pr / 1000) * gram).toFixed(3);
    $('#txtSubTotalyarn').val(sub);
    $('#txtSumYarnCost').val(sub);
}

function CalcProcTot() {
    debugger;
    var totalamnt = 0;
    for (var e = 0; e < ProcessDet.length; e++) {

        var fabid = ProcessDet[e].Fabricid;
        var Fabres = [];
        Fabres = $.grep(FabDet, function (r) {
            return r.FabID == fabid;
        });
        var cn = 0;
        if (Fabres.length > 0) {
            cn = Fabres[0].Weight;
        }

        var res = parseFloat((ProcessDet[e].Cost / 1000) * cn);
        res = res.toFixed(3);
        totalamnt = totalamnt + parseFloat(res);

    }
    totalamnt = totalamnt.toFixed(3);
    $('#txtporSubTotal').val(totalamnt);
    var padd = $('#txtproper').val();
    var getp = (parseFloat(padd) / parseFloat(totalamnt)) * 100
    if (getp != 0 || getp != '') {
        $('#txtproAdd').val(getp);
    }
    var proAdd = $('#txtproAdd').val();
    if (proAdd == '') {
        $('#txtProcessCost').val(totalamnt);
        $('#txtProcesssCost').val(totalamnt);
    } else {

        var w = (parseFloat(proAdd / 100) * parseFloat(totalamnt))
        var c = parseFloat(totalamnt) + parseFloat(w);
        $('#txtProcessCost').val(c);
        $('#txtProcesssCost').val(c);
    }
}
function getenqdet() {
    debugger;
    var id = $("#txtEnquiryNo option:selected").text();

    $.ajax({
        url: "/QuotationAdd/Getenqnodet",
        data: JSON.stringify({ enqno: id }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var data = result.Value;
            $("#txtEnquiryRef").empty();
            //$(txtEnquiryRef).append($('<option/>').val('0').text('--Select EnquiryRef--'));
            //$.each(data, function () {
            //    $(txtEnquiryRef).append($('<option></option>').val(this.EnquiryId).text(this.buyerref));
            //});

            $("#txtRefStyle").empty();
            if (data.length > 0) {
                $('#txtEnquiryRef').val(data[0].buyerref).text(data[0].buyerref);
                $('#txtRefStyle').val(data[0].buyerstyle).text(data[0].buyerstyle);
                $("#ddlStyle").val(data[0].StyleId).trigger('change');
            }
            

            //$(txtRefStyle).append($('<option/>').val('0').text('--Select StyleRef--'));
            //$.each(data, function () {
            //    $(txtRefStyle).append($('<option></option>').val(this.EnquiryId).text(this.buyerstyle));
            //});

            //$(ddlStyle).append($('<option/>').val('0').text('--Select Style--'));
            //$.each(data, function () {
            //    $(ddlStyle).append($('<option></option>').val(this.EnquiryId).text(this.style));

            //});
        }
    });
}

//function RadioPAClick() {
//    debugger;
//    var protype = $('input[name="optPendApproval"]:checked').attr('value');
//    if (protype == 'P') {
//        // $('#enqnum').disabled();

//    }
//    else {

//    }
//}

function RadioMAClick() {
    debugger;
    var protype = $('input[name="PoType"]:checked').attr('value');
    if (protype == 'O') {
        // $('#enqnum').disabled();
        $("#txtEnquiryNo").prop("disabled", true);
        $("#txtEnquiryRef").prop("disabled", true);
        $("#txtRefStyle").prop("disabled", true);
        $("#txtDate").prop("disabled", true);
        $("#txtDate1").prop("disabled", true);
        $("#txtEnquiryNo").val(0);
        $("#txtEnquiryRef").empty();
        $("#txtRefStyle").empty();
    }
    else {
        $("#txtEnquiryNo").prop("disabled", false);
        $("#txtEnquiryRef").prop("disabled", false);
        $("#txtRefStyle").prop("disabled", false);
        $("#txtDate").prop("disabled", false);
        $("#txtDate1").prop("disabled", false);
        
    }
}

function backtomain() {
    window.location.href = "/QuotationMain/QuotationMainIndex";
}

function GenerateNumber(table, column, compId, Docum) {

    table = "MarkQuoteMas",
    column = "QuoteNo",
    compId = CompanyId,
    Docum = 'MARKETING QUOTE - OPEN'

    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        aysnc:false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $('#txtQuoEntryNo').val(result.Value);
        }
    });
}

function getprocess() {
    debugger;
    $.ajax({
        url: "/QuotationAdd/Getprocess",
        data: JSON.stringify({}),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            var obj = json.Value;
            if (json.Status == 'SUCCESS') {

                var data = json.Value;

                $(ddlcmtitem).append($('<option/>').val('0').text('--Select Particular--'));
                $.each(data, function () {
                    $(ddlcmtitem).append($('<option></option>').val(this.ProcessId).text(this.process));

                });
            }
        }
    });
}

function calcprocessper(val) {
    debugger;
    var subtotpro = $('#txtporSubTotal').val();
    var w = (parseFloat(val / 100) * parseFloat(subtotpro));
    $('#txtproper').val(w);
    var c = parseFloat(subtotpro) + parseFloat(w);
    $('#txtProcessCost').val(c);

}

function calccommper(val) {
    debugger;
    var subtotpro = $('#txtcommSubTotal').val();
    var w = (parseFloat(val / 100) * parseFloat(subtotpro));
    $('#txtcommper').val(w);
    var c = parseFloat(subtotpro) + parseFloat(w);
    $('#txtcommcost').val(c);
}

function calccmtper(val) {
    debugger;
    var subtotpro = $('#txtcmtSubTotal').val();
    var w = (parseFloat(val / 100) * parseFloat(subtotpro));
    $('#txtcmtper').val(w);
    var c = parseFloat(subtotpro) + parseFloat(w);
    $('#txtCMTCost').val(c);
}

function calcbomper(val) {
    debugger;
    var subtotpro = $('#txtbomsubtot').val();
    var w = (parseFloat(val / 100) * parseFloat(subtotpro));
    $('#txtbomper').val(w);
    var c = parseFloat(subtotpro) + parseFloat(w);
    $('#txtAccessoriesCost').val(c);
}

function calcwt(val) {
    debugger;

    if (fabid == 0) {
        //alert('Please select any fabric...');
        var msg = 'Please select any fabric....';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        fnClearYarnDetailsControls();
        return true;
    } 
    var totalper = 0;
    $.each(YarnDet, function (r) {
        if (this.FabID == fabid && this.ComponentId == ComponentId) {
            if (this.Itemid != EditYarnId && this.Sizeid != EditYarnSize) {
                totalper = parseFloat(totalper) + parseFloat(this.Percentage);
            }
        }
    });
    var totalP = parseFloat(totalper) + parseFloat(val);
    if (val == "") {
        $('#txtyarnWeight').val(0);
        $('#txtyarnGsm').val('');
    } else {
        if (totalP < 100) {

            var w = (parseFloat(val / 100) * parseFloat(fabwt));
            $('#txtyarnWeight').val(w.toFixed(3));
        } else {
            totalper = 100 - totalper;
            var w = (parseFloat(totalper / 100) * parseFloat(fabwt));
            $('#txtyarnWeight').val(w.toFixed(3));
            $('#txtyarnGsm').val(totalper);
        }
    }
}

function calctot() {
    debugger;
    var yarn = ($('#txtSumYarnCost').val() == "" ? 0 : $('#txtSumYarnCost').val());
    var bom = ($('#txtbomsubtot').val() == "" ? 0 : $('#txtbomsubtot').val());
    var process = ($('#txtporSubTotal').val() == "" ? 0 : $('#txtporSubTotal').val());
    var cmt = ($('#txtcmtSubTotal').val() == "" ? 0 : $('#txtcmtSubTotal').val());
    var comm = ($('#txtcommSubTotal').val() == "" ? 0 : $('#txtcommSubTotal').val());



    var rscost = parseFloat(yarn) + parseFloat(bom) + parseFloat(process) + parseFloat(cmt) + parseFloat(comm);

    $('#txttotCost').val(rscost.toFixed(2));
}

function calctotper(val) {
    debugger;
    var f = $('#txttotCost').val();
    var w = (parseFloat(val / 100) * parseFloat(f));
    $('#txttotperNo').val(w);
}

function calcbom(val) {
    debugger;
    var q = $('#txtQuantity').val();
    var v = $('#txtUnitCost').val();

    var p = parseFloat(q) * parseFloat(v);
    $('#txtbomValue').val(p);

}

function chk() {
    var id = $("#ddlfabType option:selected").val();
    debugger;
    $.ajax({
        url: "/QuotationAdd/Getuom",
        data: JSON.stringify({ itmid: id }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            var obj = json.Value;
            if (obj.length > 0) {
                uom = obj[0].Uomid;
            }
            //$('#txtUnit').val(obj[0].uom);
            //$('#txtUnitid').val(obj[0].Uomid);


        }
    });
}

function getuom(val) {

    var id = $("#ddlbomitem option:selected").val();
    debugger;
    $.ajax({
        url: "/QuotationAdd/Getuom",
        data: JSON.stringify({ itmid: id }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            var obj = json.Value;
            $('#txtUnit').val(obj[0].uom);
            $('#txtUnitid').val(obj[0].Uomid);


        }
    });
}

function getquantity(val) {
    debugger;
    var arr = [];
    if (YarnDet.length > 0) {
        for (var s = 0; s < YarnDet.length; s++) {
            if (YarnDet[s].Itemid == val) {
                arr.push(YarnDet[s].Weight);
            }
        }
        var totalamnt = 0;
        for (var e = 0; e < arr.length; e++) {
            var amount = arr[e];
            totalamnt = totalamnt + parseFloat(amount);

        }
        $('#txtQuantity').val(totalamnt);
    }
    getuom();
}

function getDate() {

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
    // $('#txtFromDate').val(date);
    $('#txtDate').val(Fdatestring);
    $('#txtDate1').val(Fdatestring);
    $('#txtDate2').val(Fdatestring);
}
function removeFabricduplicateValue(TrimsList) {
    debugger;
    var newArray = [];
    $.each(TrimsList, function (key, value) {
        var exists = false;
        var rate = 0;
        $.each(newArray, function (k, val2) {
            if (value.FabID == val2.FabID) {
                exists = true;
            };
        });

        if (exists == false) { newArray.push(value); }
    });
    var DetList = newArray;
    Loadprocess1tab(DetList);
}
function chkfabric() {
    debugger;
    if (FabDet.length > 0) {
        var newlist = [];
        $.each(FabDet, function (key, value) {
            var obj = {
                SNo: value.SNo,
                FabID: value.FabID,
                Fab: value.Fab,
            };
            newlist.push(obj);
        });
        removeFabricduplicateValue(newlist);
        
    }

    if (ProcessDet.length > 0) {
        CalcProcTot();
    }
}

function getmasdet() {
    Qutid;
    debugger;
    $.ajax({
        url: "/QuotationAdd/Getmasdet",
        data: JSON.stringify({ qid: Qutid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            var obj = json.Value;

            $('#ddlACompany').val(obj[0].Companyid);
            $('#ddlABuyer').val(obj[0].BuyerId).trigger('change');
            $('#ddlStyle').val(obj[0].StyleId).trigger('change');
            $('#txtQuoEntryNo').val(obj[0].QuoteNo);
            $('#txtDate2').val((moment(obj[0]["QuoteDate"]).format('DD/MM/YYYY')));
            $('#ddlACurrency').val(obj[0].CurrencyID).trigger('change');
            $('#txtExchange').val(obj[0].ExchangeRate);
            $('#txtdescription').val(obj[0].Remarks);
            $('#txttotCost').val(obj[0].TotalCost);
            $('#txtBOMCost').val(obj[0].AccessoryCost);
            //$('#txtProcesssCost').val(obj[0].TotalCost);
            $('#txtCMTtotCost').val(obj[0].CMTcost);
            $('#txtCommercialCost').val(obj[0].Commercial);
            $('#txtProfit').val(obj[0].ProfitPercent);
            $('#txtordrefno').val(obj[0].RefNo);
            $('#txtordqty').val(obj[0].OrderQty);
            $('#txtwastage').val(obj[0].WastagePer);
            $('#txtbuyercost').val(obj[0].BuyerPrice);
            EditGetEnqId = obj[0].EnquiryId;
            $('#txtEnquiryNo').val(obj[0].EnquiryId).trigger('change');
            //$('#txtEnquiryRef').append($('<option/>').val('0').text(obj[0].EnqRef));
            $('#txtEnquiryRef').val(obj[0].EnqRef);
            //$('#txtRefStyle').append($('<option/>').val('0').text(obj[0].RefStyle));
            $('#txtRefStyle').val(obj[0].RefStyle);
            $('#ddlordunit').val(obj[0].Guomid).trigger('change');
            $('#optAAL').prop('disabled', true);
            $('#optAY').attr('disabled', true);
            $('#txtproper').val(obj[0].ProcessAdd);
            $('#txtbomper').val(obj[0].AccAdd);
            $('#txtcmtper').val(obj[0].CMTadd);
            $('#txtcommper').val(obj[0].CommercialAdd);
            $('#txttotperNo').val(obj[0].SummaryAdd);
            if (obj[0].QuoteType == 'O') {
                $('#optAAL').prop('checked', true);
            } else {
                $('#optAY').prop('checked', true);
                $('#txtEnquiryNo').prop('disabled', false);
                //$('#txtEnquiryRef').prop('disabled', false);
                //$('#txtRefStyle').attr('disabled', false);
                //$('#txtDate').prop('disabled', false);
                //$('#txtDate1').attr('disabled', false);
            }
            //chk();
        }
    });
}


function getfabric() {
    debugger;
    $.ajax({
        url: "/QuotationAdd/Getfabdet",
        data: JSON.stringify({ qid: Qutid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            var obj = json.Value;
            FabDet = obj;
            LoadFabrictab(FabDet);
        }
    });
}

function getyarn() {
    debugger;
    $.ajax({
        url: "/QuotationAdd/Getyarndet",
        data: JSON.stringify({ qid: Qutid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            var obj = json.Value;
            YarnDet = obj;
            LoadYarntab(YarnDet);

            CalcPrice();
        }
    });
}

function getprocessdet() {
    debugger;
    $.ajax({
        url: "/QuotationAdd/Getprocdet",
        data: JSON.stringify({ qid: Qutid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            var obj = json.Value;
            ProcessDet = obj;

            LoadProcesstab(ProcessDet);

            if (ProcessDet.length > 0) {
                CalcProcTot();
                //var totalamnt = 0;
                //for (var e = 0; e < ProcessDet.length; e++) {
                //    var amount = ProcessDet[e].Cost;
                //    totalamnt = totalamnt + parseFloat(amount);

                //}
                //$('#txtporSubTotal').val(totalamnt);
                //$('#txtProcessCost').val(totalamnt);
                //$('#txtProcesssCost').val(totalamnt);
            }
        }
    });
}
function getbom() {
    debugger;
    $.ajax({
        url: "/QuotationAdd/Getbomdet",
        data: JSON.stringify({ qid: Qutid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            var obj = json.Value;
            BomDet = obj;
            LoadBomtab(BomDet);
            if (BomDet.length > 0) {
                var totalamnt = 0;
                for (var e = 0; e < BomDet.length; e++) {
                    var amount = BomDet[e].value;
                    totalamnt = totalamnt + parseFloat(amount);

                }
                $('#txtbomsubtot').val(totalamnt);
                $('#txtBOMCost').val(totalamnt);
                $('#txtAccessoriesCost').val(totalamnt);
            }
        }
    });
}

function getcmt() {
    debugger;
    $.ajax({
        url: "/QuotationAdd/Getcmtdet",
        data: JSON.stringify({ qid: Qutid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            var obj = json.Value;
            CmtDet = obj;
            LoadCmttab(CmtDet);
            if (CmtDet.length > 0) {
                var totalamnt = 0;
                for (var e = 0; e < CmtDet.length; e++) {
                    var amount = CmtDet[e].Cost;
                    totalamnt = totalamnt + parseFloat(amount);

                }
                $('#txtcmtSubTotal').val(totalamnt);
                $('#txtCMTtotCost').val(totalamnt);
                $('#txtCMTCost').val(totalamnt);
            }
        }
    });
}


function getcomm() {
    debugger;
    $.ajax({
        url: "/QuotationAdd/Getcommdet",
        data: JSON.stringify({ qid: Qutid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            var obj = json.Value;
            CommDet = obj;
            LoadCommtab(CommDet);
            if (CommDet.length > 0) {
                var totalamnt = 0;
                for (var e = 0; e < CommDet.length; e++) {
                    var amount = CommDet[e].Cost;
                    totalamnt = totalamnt + parseFloat(amount);

                }
                $('#txtcommSubTotal').val(totalamnt);
                $('#txtCommercialCost').val(totalamnt);
                $('#txtcommcost').val(totalamnt);
            }
        }
    });
}

function LoadFabrictab(list) {

    $('#tblfabricdetails').DataTable().destroy();

    $('#tblfabricdetails').DataTable({
        data: list,
        scrollY: 250,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        "bSort": false,
        columns: [
                   { title: "Sl No", data: "SNo", "visible": false },
                    { title: "DetId", data: "DetId", "visible": false },
                   { title: "ComponentId", data: "CompID", "visible": false },
                    { title: "Component", data: "Comp" },
                   { title: "FabricId", data: "FabID", "visible": false },
                   { title: "Fabric", data: "Fab" },
                    { title: "Uomid", data: "Uomid", "visible": false },
                   { title: "Consumption", data: "Weight" },
                   { title: "GSM", data: "GSM" },
                   { title: "Remarks", data: "Remarks" },
                   { title: "Purchase", data: "Fab_purchase" },
                   //{ title: "BaseQty", data: "Knit_in_ColorID", "visible": false },
                   //{ title: "Color", data: "Color" },
                   //{ title: "%", data: "Knit_In_Per" },
                   //{ title: "Weight(Kgs)", data: "Knit_In_Qty" },


               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnfabedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnfabremove btn btn-danger btn-round"> <i class="fa fa-times"></i> </button>  </div>'
                   //"sDefaultContent": '<button type="button" class="btnYarnedit"> Edit </button> <button type="button" class="btnYarnremove"> Remove </button>  <button type="button" class="btnAddDyeing"> Dyeing </button>'
                   // "sDefaultContent": '<button type="button" class="btnYarnedit"> Edit </button> <button type="button" class="btnYarnremove"> Remove </button>  '
               }
        ]

    });
    var table = $('#tblfabricdetails').DataTable();
    $("#tblfabricdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblfabricdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}

function LoadBomtab(list) {

    $('#bomtab').DataTable().destroy();

    $('#bomtab').DataTable({
        data: list,
        scrollY: 250,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        "bSort": false,
        columns: [
                   { title: "Sl No", data: "SNo", "visible": false },
                   { title: "Detid", data: "MarkquoteaccId", "visible": false },
                   { title: "Itemid", data: "ItemID", "visible": false },
                    { title: "Item", data: "item" },
                   { title: "Quantity", data: "Quantity" },
                   { title: "Unitid", data: "Uomid", "visible": false },
                   { title: "Unit", data: "uom" },
                   { title: "Unit Cost", data: "UnitCost" },
                   { title: "Value", data: "value" },
                   { title: "Remarks", data: "Remarks", "visible": false },
                   //{ title: "Color", data: "Color" },
                   //{ title: "%", data: "Knit_In_Per" },
                   //{ title: "Weight(Kgs)", data: "Knit_In_Qty" },


               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnbomedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnbomremove btn btn-danger btn-round"> <i class="fa fa-times"></i> </button>  </div>'
                   //"sDefaultContent": '<button type="button" class="btnYarnedit"> Edit </button> <button type="button" class="btnYarnremove"> Remove </button>  <button type="button" class="btnAddDyeing"> Dyeing </button>'
                   // "sDefaultContent": '<button type="button" class="btnYarnedit"> Edit </button> <button type="button" class="btnYarnremove"> Remove </button>  '
               }
        ]

    });
    var table = $('#bomtab').DataTable();
    $("#bomtab tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#bomtab tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}

function LoadYarntab(list) {
    $('#yarn2tab').DataTable().destroy();

    $('#yarn2tab').DataTable({
        data: list,
        scrollY: 250,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        "bSort": false,
        columns: [
                   { title: "SlNo", data: "SNo", "visible": false },
                    { title: "Detid", data: "Markquoteyarnid", "visible": false },
                    { title: "FabId", data: "FabID", "visible": false },
                    { title: "Fab", data: "Fab" },
                    { title: "CompoId", data: "ComponentId", "visible": false },
                   { title: "YarnId", data: "Itemid", "visible": false },
                    { title: "Yarn", data: "item"},
                   { title: "SizeId", data: "Sizeid", "visible": false },
                   { title: "Size", data: "size" },
                   { title: "Percentage", data: "Percentage" },
                   { title: "Weight", data: "Weight" },
                   { title: "Cost", data: "CostPerKG" },
                   //{ title: "BaseQty", data: "Knit_in_ColorID", "visible": false },
                   //{ title: "Color", data: "Color" },
                   //{ title: "%", data: "Knit_In_Per" },
                   //{ title: "Weight(Kgs)", data: "Knit_In_Qty" },


               {
                   title: "Action", "mDataProp": null,
                   "sDefaultContent": '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnyarnedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnyarnremove btn btn-danger btn-round"> <i class="fa fa-times"></i> </button>  </div>'
                   //"sDefaultContent": '<button type="button" class="btnYarnedit"> Edit </button> <button type="button" class="btnYarnremove"> Remove </button>  <button type="button" class="btnAddDyeing"> Dyeing </button>'
                   // "sDefaultContent": '<button type="button" class="btnYarnedit"> Edit </button> <button type="button" class="btnYarnremove"> Remove </button>  '
               }
        ]

    });
    var table = $('#yarn2tab').DataTable();
    $("#yarn2tab tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#yarn2tab tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}


function LoadProcesstab(list) {
    $('#process2tab').DataTable().destroy();

    $('#process2tab').DataTable({
        data: list,
        scrollY: 250,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        "bSort": false,
        columns: [
                   { title: "SlNo", data: "SNo", "visible": false },
                   { title: "Detid", data: "Detid", "visible": false },
                   { title: "Fabricid", data: "Fabricid", "visible": false },
                   { title: "Fabric", data: "fabric" },
                   { title: "CompoId", data: "ComponentId", "visible": false },
                   { title: "Processid", data: "ProcessId", "visible": false },
                   { title: "Process", data: "process" },
                   { title: "Cost", data: "Cost" },

               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<div style="display:inline-flex;"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnprocedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnprocremove btn btn-danger btn-round"> <i class="fa fa-times"></i> </button> </div>'
                   //"sDefaultContent": '<button type="button" class="btnYarnedit"> Edit </button> <button type="button" class="btnYarnremove"> Remove </button>  <button type="button" class="btnAddDyeing"> Dyeing </button>'
                   // "sDefaultContent": '<button type="button" class="btnYarnedit"> Edit </button> <button type="button" class="btnYarnremove"> Remove </button>  '
               }
        ]

    });
    var table = $('#process2tab').DataTable();
    $("#process2tab tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#process2tab tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}

function LoadCmttab(list) {
    $('#cmttab').DataTable().destroy();

    $('#cmttab').DataTable({
        data: list,
        scrollY: 250,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        "bSort": false,
        columns: [
                   { title: "Sl No", data: "SNo", "visible": false },
                    { title: "Detid", data: "MarkquoteCmtId", "visible": false },
                    { title: "Processid", data: "ProcessID", "visible": false },
                    { title: "Process", data: "process" },
                   { title: "Value", data: "Cost" },
                   { title: "Remarks", data: "Remarks" },

               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<div style="display:inline-flex;"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btncmtedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btncmtremove btn btn-danger btn-round"> <i class="fa fa-times"></i> </button> </div>'
                   //"sDefaultContent": '<button type="button" class="btnYarnedit"> Edit </button> <button type="button" class="btnYarnremove"> Remove </button>  <button type="button" class="btnAddDyeing"> Dyeing </button>'
                   // "sDefaultContent": '<button type="button" class="btnYarnedit"> Edit </button> <button type="button" class="btnYarnremove"> Remove </button>  '
               }
        ]

    });
    var table = $('#cmttab').DataTable();
    $("#cmttab tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#cmttab tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}


function LoadCommtab(list) {
    $('#commercialtab').DataTable().destroy();

    $('#commercialtab').DataTable({
        data: list, 
        scrollY: 200,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        "bSort": false,
        columns: [
                   { title: "Sl No", data: "SNo", "visible": false },
                    { title: "Detid", data: "MarkquoteCommercialId", "visible": false },
                   { title: "Commercialid", data: "ParticularID", "visible": false },
                    { title: "Commercial", data: "particular" },
                    { title: "Value", data: "Cost" },
                    { title: "Remarks", data: "Remarks" },


               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<div style="display:inline-flex;"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btncommedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btncommremove btn btn-danger btn-round"> <i class="fa fa-times"></i> </button> </div>'
                   //"sDefaultContent": '<button type="button" class="btnYarnedit"> Edit </button> <button type="button" class="btnYarnremove"> Remove </button>  <button type="button" class="btnAddDyeing"> Dyeing </button>'
                   // "sDefaultContent": '<button type="button" class="btnYarnedit"> Edit </button> <button type="button" class="btnYarnremove"> Remove </button>  '
               }
        ]

    });
    var table = $('#commercialtab').DataTable();
    $("#commercialtab tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#commercialtab tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}
function fnClearfabricDetailsControls() {
    debugger;
    $('#ddlfabricComponent').val('0').trigger('change');
    $('#ddlfabType').val('0').trigger('change');
    $('#txtConsumption').val('');
    $('#txtRemarks').val('');
    $('#txtgsm').val('');
    document.getElementById("chklistitem1").checked = false;

}

function fnClearYarnDetailsControls() {
    debugger;
    $('#ddlyarnComponent').val('0').trigger('change');
    $('#ddlyarnType').val('0').trigger('change');
    $('#txtyarnGsm').val('');
    $('#txtyarnWeight').val('');
    $('#txtyarnCost').val('');


}

function fnClearBomDetailsControls() {
    debugger;
    $('#ddlbomitem').val('0').trigger('change');
    $('#txtQuantity').val('');
    $('#txtUnit').val('');
    $('#txtUnitid').val('');
    $('#txtUnitCost').val('');
    $('#txtbomValue').val('');
    $('#txtbomRemarks').val('');


}

function fnClearcmtDetailsControls() {
    debugger;
    $('#ddlcmtitem').val('0').trigger('change');
    $('#txtcmtValue').val('');
    $('#txtcmtRemarks').val('');



}

function fnClearprocDetailsControls() {
    debugger;
    $('#ddlProComponent').val('0').trigger('change');
    $('#txtCost').val('');
}

function fnClearCommDetailsControls() {
    debugger;
    $('#ddlcommComponent').val('0').trigger('change');
    $('#txtValue').val('');
    $('#txtcommRemarks').val('');
}
function removeFabricduplicateValueYarn(TrimsList) {
    debugger;
    var newArray = [];
    $.each(TrimsList, function (key, value) {
        var exists = false;
        var rate = 0;
        $.each(newArray, function (k, val2) {
            if (value.FabID == val2.FabID) {
                exists = true;
            };
        });

        if (exists == false) { newArray.push(value); }
    });
    $.each(newArray, function (key, value) {
        //var exists = false;
        var Weight = 0;
        $.each(TrimsList, function (k, val2) {
            if (value.FabID == val2.FabID) {
                Weight = Weight + val2.Weight;
            };
        });
        value.Weight = Weight;
        //if (exists == false) { newArray.push(value); }
    });
    var DetList = newArray;
    Loadyarn1tab(DetList);
}
function chkfabdet() {
    debugger;
    if (FabDet.length > 0) {
        var newlist = [];
        $.each(FabDet, function (key, value) {
            var obj = {
                SNo: value.SNo,
                FabID: value.FabID,
                Fab: value.Fab,
                Weight: value.Weight,
                GSM: value.GSM,
            };
            newlist.push(obj);
        });
        //newlist.push(FabDet);
        removeFabricduplicateValueYarn(newlist);
        
    }
    if (YarnDet.length > 0) {
        var totalamnt = 0;
        for (var e = 0; e < YarnDet.length; e++) {
            var amount = YarnDet[e].Weight;
            totalamnt = totalamnt + parseFloat(amount);

        }
        $('#txtGrammageTotal').val(totalamnt);
        CalcPrice();
    }
}

function Loadyarn1tab(list) {
    $('#yarn1tab').DataTable().destroy();

    list.sort(function (a, b) {
        return a.SNo - b.SNo;
    });
    $('#yarn1tab').DataTable({
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
                   { title: "SNo", data: "SNo" ,width:'10px'},
                   { title: "FabricId", data: "FabID", "visible": false },
                    { title: "Fabric", data: "Fab", width: '500px' },
                   { title: "Weight", data: "Weight" },
                   { title: "Gsm", data: "GSM" },

                    {
                        title: "Details", "mDataProp": null,


                        "sDefaultContent": '<button type="button" class="loadyarn btn btn-round btn-info" data-toggle="tooltip" data-placement="top" title="Select Fabric" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" > <i class="gg-chevron-right-o"></i> </button>'
                    }

               //{
               //    title: "ACTION", "mDataProp": null,
               //    "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnfabedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnfabremove btn btn-danger btn-round"> <i class="fa fa-times"></i> </button>  <button type="button" data-toggle="tooltip" data-placement="top" style="width:25px;padding:0px;" title="Dyeing" class="btnAddDyeing btn-success btn btn_round"> <img style="width:20px;" src="../images/dyeing.png" </button>'
               //    //"sDefaultContent": '<button type="button" class="btnYarnedit"> Edit </button> <button type="button" class="btnYarnremove"> Remove </button>  <button type="button" class="btnAddDyeing"> Dyeing </button>'
               //    // "sDefaultContent": '<button type="button" class="btnYarnedit"> Edit </button> <button type="button" class="btnYarnremove"> Remove </button>  '
               //}
        ]

    });
    var table = $('#yarn1tab').DataTable();
    $("#yarn1tab tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#yarn1tab tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}


function Loadprocess1tab(list) {
    $('#process1tab').DataTable().destroy();
    list.sort(function (a, b) {
        return a.SNo - b.SNo;
    });


    $('#process1tab').DataTable({
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
                   { title: "SNo", data: "SNo" },
                   { title: "FabricId", data: "FabID", "visible": false },
                    { title: "Fabric", data: "Fab" },

                    {
                        title: "Details", "mDataProp": null,

                        "sDefaultContent": '<button type="button" class="loadprocess btn btn-round btn-info" data-toggle="tooltip" data-placement="top" title="Select Fabric" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" > <i class="gg-chevron-right-o"></i> </button>'
                    }

               //{
               //    title: "ACTION", "mDataProp": null,
               //    "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnfabedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnfabremove btn btn-danger btn-round"> <i class="fa fa-times"></i> </button>  <button type="button" data-toggle="tooltip" data-placement="top" style="width:25px;padding:0px;" title="Dyeing" class="btnAddDyeing btn-success btn btn_round"> <img style="width:20px;" src="../images/dyeing.png" </button>'
               //    //"sDefaultContent": '<button type="button" class="btnYarnedit"> Edit </button> <button type="button" class="btnYarnremove"> Remove </button>  <button type="button" class="btnAddDyeing"> Dyeing </button>'
               //    // "sDefaultContent": '<button type="button" class="btnYarnedit"> Edit </button> <button type="button" class="btnYarnremove"> Remove </button>  '
               //}
        ]

    });
    var table = $('#process1tab').DataTable();
    $("#process1tab tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#process1tab tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}


function Add() {
    debugger;
    // validate();
    var isValid = true;
    var wastageper = 0;

    if ($('#ddlACurrency').val().trim() == "0") {
        $('#ddlACurrency').css('border-color', 'Red').trigger('change');
        var msg = 'Please Select Currency...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        isValid = false;
    }
    else {
        $('#ddlACurrency').css('border-color', 'lightgrey');
    }

    if ($('#ddlACompany').val().trim() == "0") {
        $('#ddlACompany').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlACompany').css('border-color', 'lightgrey');
    }
    if ($('#ddlABuyer').val().trim() == "0") {
        $('#ddlABuyer').css('border-color', 'Red');
        var msg = 'Please Select Buyer...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        isValid = false;
    }
    else {
        $('#ddlABuyer').css('border-color', 'lightgrey');
    }

    if ($('#ddlStyle').val().trim() == "0") {
        $('#ddlStyle').css('border-color', 'Red');
        var msg = 'Please Select Style...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        isValid = false;
    }
    else {
        $('#ddlStyle').css('border-color', 'lightgrey');
    }

    if ($('#txtQuoEntryNo').val().trim() == "") {
        $('#txtQuoEntryNo').css('border-color', 'Red');
        var msg = 'Please Enter Quotation Number...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        isValid = false;
    }
    else {
        $('#txtQuoEntryNo').css('border-color', 'lightgrey');
    }

    if ($('#txtordqty').val().trim() == "") {
        $('#txtordqty').css('border-color', 'Red');
        var msg = 'Please Enter Order Quantity...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        isValid = false;
    }
    else {
        $('#txtordqty').css('border-color', 'lightgrey');
    }

    if ($('#txtwastage').val().trim() == "") {
        $('#txtwastage').val(0);
        wastageper = 0;
    }
    else {
        wastageper = $('#txtwastage').val();
    }

    if (isValid == false) {
        //alert('Fill the dropdown...');
        
        return true;
    }
    else {

        if (FabDet.length == 0 || YarnDet.length == 0 || ProcessDet.length == 0 || BomDet.length == 0 || CmtDet.length == 0) {
            //alert('Details should not be empty..');
            var msg = 'Details should not be empty...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
            return true;
        }

        var protype = $('input[name="PoType"]:checked').attr('value');
        var EnqId = 0;
        if (protype == 'E') {
            EnqId = $("#txtEnquiryNo").val();
        }
        var patype = $('input[name="optPendApproval"]:checked').attr('value');


        var oldordno = $('#txtQuoEntryNo').val();
        GenerateNumber();
        var newordno = $('#txtQuoEntryNo').val();
        if (oldordno != newordno) {
            //alert('QuoteNo has been changed...');
            var msg = 'Quotation Number has been changed...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
        }
        var ProcAdd = 0;
        var BOMadd = 0;
        var CMTadd = 0;
        var CommAdd = 0;
        var SummAdd = 0;

        var ProcAdd = $('#txtproper').val();
        var BOMadd = $('#txtbomper').val();
        var CMTadd = $('#txtcmtper').val();
        var CommAdd = $('#txtcommper').val();
        var SummAdd = $('#txttotperNo').val();
        if (ProcAdd == '') {
            ProcAdd = 0;
        }
        if (BOMadd == '') {
            BOMadd = 0;
        }
        if (CMTadd == '') {
            CMTadd = 0;
        }
        if (CommAdd == '') {
            CommAdd = 0;
        }
        if (SummAdd == '') {
            SummAdd = 0;
        }

        var objConSubmit = {
            //QuoteID: "W",// $('#txtOrderNo').val(),
            QuoteNo: $('#txtQuoEntryNo').val(),//'jkgdf',// $('select#ddljoborder option:selected').text(),
            QuoteDate: $('#txtDate2').val(),//new Date($('#txtDate2').val()),
            QuoteType: protype,//'O',// new Date($('#txtToDate').val()),
            Companyid: $('#ddlACompany option:selected').val(),
            BuyerId: $('#ddlABuyer option:selected').val(),
            EnquiryId: EnqId,//$('#txtEnquiryNo').val(),// 0,// $('#remark').val(),
            StyleId: $('select#ddlStyle option:selected').val(),
            // CategoryId: 1,// $('select#ddlMFromunit option:selected').val(),// 1,//$('select#ddljoborder option:selected').val(),
            // YarnAdd: $('#ddlcmpnyadd option:selected').val(),
            //ProcessAdd: "N",//$('#txtBuyOrdMasId').val(),
            // AccAdd: $('#ddlMForunit option:selected').val(),
            // CMTadd: "R",//$('#txtBuyOrdMasId').val(),
            //CommercialAdd: "U",// $('#txtBuyOrdMasId').val(),
            FabricCost: $('#ddlMProcess').val(),
            AccessoryCost: $('#txtBOMCost').val(),
            CMTcost: $('#txtCMTtotCost').val(),
            Commercial: $('#txtCommercialCost').val(),
            TotalCost: $('#txttotCost').val(),
            ProfitPercent: $('#txtProfit').val(),
            CurrencyID: $('select#ddlACurrency option:selected').val(),
            ExchangeRate: $('#txtExchange').val(),
            Remarks: $('#txtdescription').val(),
            Guomid: $('#ddlordunit').val(),
            //QuotedRate: $('#txtquotedrate').val(),
            //TemplateName: $('#ddlfordivision').val(),
            CreatedBy: Guserid,//$('select#ddlfordivision option:selected').val(),
            OrderQty: $('#txtordqty').val(),
            RefNo: $('#txtordrefno').val(),
            WastagePer: wastageper,
            BuyerPrice: $('#txtbuyercost').val(),
            PA: patype,

            ProcessAdd: ProcAdd,
            AccAdd: BOMadd,
            CMTadd: CMTadd,
            CommercialAdd: CommAdd,
            SummaryAdd: SummAdd,

            AccDetails: BomDet,
            CmtDetails: CmtDet,
            CommDetails: CommDet,
            FabDetails: FabDet,
            ProcessDetails: ProcessDet,
            YarnDetails: YarnDet
        };
    }
    LoadingSymb();
    $.ajax({
        url: "/QuotationAdd/Add",
        data: JSON.stringify(objConSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            //if (result.Value == 1) {
            if (result.Value == true) {
                //alert('Data Saved Successfully');
                var msg = 'Data Saved Successfully...';
                var flg = 1;
                var mod = 0;
                var ur = "/QuotationMain/QuotationMainIndex";
                AlartMessage(msg, flg, mod, ur);
                //window.location.href = "/QuotationMain/QuotationMainIndex?Al=" + "Ad";
            } else {

                //alert('Data Saved Error..');
                var msg = 'Data Saved Unsuccessfully...';
                var flg = 4;
                var mod = 1;
                var ur = "";
                AlartMessage(msg, flg, mod, ur);
            }
            //}
            //if (result.Value == 0) {

            //    alert('Data not saved properly');
            //    // window.location.href = "/PlanningMain/PlanningMainIndex";
            //}

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }

    });
}

function validate() {
    debugger;
    var isValid = true;
    if ($('#ddlACurrency').val().trim() == "0") {
        $('#ddlACurrency').css('border-color', 'Red');
        var msg = 'Please Select Currency...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        isValid = false;
    }
    else {
        $('#ddlACurrency').css('border-color', 'lightgrey');
    }
    return isValid;
}

function Update() {
    debugger;
    var wastageper = 0;

    $.each(FabDet, function () {
        this.QuoteId = Qutid;
    });
    $.each(YarnDet, function () {
        this.QuoteId = Qutid;
    });
    $.each(ProcessDet, function () {
        this.QuoteID = Qutid;
    });
    $.each(BomDet, function () {
        this.QuoteId = Qutid;
    });
    $.each(CmtDet, function () {
        this.QuoteId = Qutid;
    });
    $.each(CommDet, function () {
        this.QuoteId = Qutid;
    });

    var isValid = true;
    var wastageper = 0;

    if ($('#ddlACurrency').val().trim() == "0") {
        $('#ddlACurrency').css('border-color', 'Red');
        var msg = 'Please Select Currency...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        isValid = false;
    }
    else {
        $('#ddlACurrency').css('border-color', 'lightgrey');
    }

    if ($('#ddlACompany').val().trim() == "0") {
        $('#ddlACompany').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlACompany').css('border-color', 'lightgrey');
    }
    if ($('#ddlABuyer').val().trim() == "0") {
        $('#ddlABuyer').css('border-color', 'Red');
        var msg = 'Please Select Buyer...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        isValid = false;
    }
    else {
        $('#ddlABuyer').css('border-color', 'lightgrey');
    }

    if ($('#ddlStyle').val().trim() == "0") {
        $('#ddlStyle').css('border-color', 'Red');
        var msg = 'Please Select Style...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        isValid = false;
    }
    else {
        $('#ddlStyle').css('border-color', 'lightgrey');
    }

    if ($('#txtQuoEntryNo').val().trim() == "") {
        $('#txtQuoEntryNo').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtQuoEntryNo').css('border-color', 'lightgrey');
    }

    if ($('#txtordqty').val().trim() == "") {
        $('#txtordqty').css('border-color', 'Red');
        var msg = 'Please Enter Order Quantity...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        isValid = false;
    }
    else {
        $('#txtordqty').css('border-color', 'lightgrey');
    }

    if ($('#txtwastage').val().trim() == "") {
        $('#txtwastage').val(0);
        wastageper = 0;
    }
    else {
        wastageper = $('#txtwastage').val();
    }

    if (isValid == false) {
        //alert('Fill the dropdown...');
        return true;
    }
    else {

        if (FabDet.length == 0 || YarnDet.length == 0 || ProcessDet.length == 0 || BomDet.length == 0 || CmtDet.length == 0) {
            //alert('Details should not be empty..');
            var msg = 'Details should not be empty...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
            return true;
        }
        var protype = $('input[name="PoType"]:checked').attr('value');
        var EnqId = 0;
        if (protype == 'E') {
            EnqId = $("#txtEnquiryNo").val();
        }
        var patype = $('input[name="optPendApproval"]:checked').attr('value');

        var ProcAdd = 0;
        var BOMadd = 0;
        var CMTadd = 0;
        var CommAdd = 0;
        var SummAdd = 0;

        var ProcAdd = $('#txtproper').val();
        var BOMadd = $('#txtbomper').val();
        var CMTadd = $('#txtcmtper').val();
        var CommAdd = $('#txtcommper').val();
        var SummAdd = $('#txttotperNo').val();
        if (ProcAdd == '') {
            ProcAdd = 0;
        }
        if (BOMadd == '') {
            BOMadd = 0;
        }
        if (CMTadd == '') {
            CMTadd = 0;
        }
        if (CommAdd == '') {
            CommAdd = 0;
        }
        if (SummAdd == '') {
            SummAdd = 0;
        }
        var objConSubmit = {
            QuoteID: Qutid,//"W",// $('#txtOrderNo').val(),
            QuoteNo: $('#txtQuoEntryNo').val(),//'jkgdf',// $('select#ddljoborder option:selected').text(),
            QuoteDate: $('#txtDate2').val(),//new Date($('#txtDate2').val()),
            QuoteType: protype,// new Date($('#txtToDate').val()),
            Companyid: $('#ddlACompany option:selected').val(),
            BuyerId: $('#ddlABuyer option:selected').val(),
            EnquiryId: EnqId,// $('#remark').val(),
            StyleId: $('select#ddlStyle option:selected').val(),
            CategoryId: null,// $('select#ddlMFromunit option:selected').val(),// 1,//$('select#ddljoborder option:selected').val(),
            // YarnAdd: $('#ddlcmpnyadd option:selected').val(),
            //ProcessAdd: "N",//$('#txtBuyOrdMasId').val(),
            // AccAdd: $('#ddlMForunit option:selected').val(),
            // CMTadd: "R",//$('#txtBuyOrdMasId').val(),
            //CommercialAdd: "U",// $('#txtBuyOrdMasId').val(),
            FabricCost: $('#ddlMProcess').val(),
            AccessoryCost: $('#txtBOMCost').val(),
            CMTcost: $('#txtCMTtotCost').val(),
            Commercial: $('#txtCommercialCost').val(),
            TotalCost: $('#txttotCost').val(),
            ProfitPercent: $('#txtProfit').val(),
            CurrencyID: $('select#ddlACurrency option:selected').val(),
            ExchangeRate: $('#txtExchange').val(),
            Remarks: $('#txtdescription').val(),
            Guomid: $('#ddlordunit').val(),
            //QuotedRate: $('#txtquotedrate').val(),
            //TemplateName: $('#ddlfordivision').val(),
            CreatedBy: Guserid,//$('select#ddlfordivision option:selected').val(),
            OrderQty: $('#txtordqty').val(),
            RefNo: $('#txtordrefno').val(),
            WastagePer: wastageper,
            BuyerPrice: $('#txtbuyercost').val(),
            ModifyBy: Guserid,
            PA: patype,

            ProcessAdd: ProcAdd,
            AccAdd: BOMadd,
            CMTadd: CMTadd,
            CommercialAdd: CommAdd,
            SummaryAdd: SummAdd,

            AccDetails: BomDet,
            CmtDetails: CmtDet,
            CommDetails: CommDet,
            FabDetails: FabDet,
            ProcessDetails: ProcessDet,
            YarnDetails: YarnDet
        };
        LoadingSymb();
        $.ajax({
            url: "/QuotationAdd/Update",
            data: JSON.stringify(objConSubmit),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                debugger;
                if (result.Status == "SUCCESS") {

                    //alert('Data Updated Successfully');
                    var msg = 'Data Updated Successfully...';
                    var flg = 1;
                    var mod = 0;
                    var ur = "/QuotationMain/QuotationMainIndex";
                    AlartMessage(msg, flg, mod, ur);
                    //window.location.href = "/QuotationMain/QuotationMainIndex";
                }
                if (result.Status == "ERROR") {
                    //alert('Data Updated Successfully...');
                    var msg = 'Data Updated Unsuccessfully...';
                    var flg = 4;
                    var mod = 1;
                    var ur = "";
                    AlartMessage(msg, flg, mod, ur);
                    // window.location.href = "/PlanningMain/PlanningMainIndex";
                }
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }

        });
    }
}


function getexchagerate() {
    debugger;
    var currID = $('#ddlACurrency').val();

    $.ajax({
        url: "/Currency/GetbyID/" + currID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                $('#txtExchange').val(obj.Exchangerate);
            }
        }

    });
}

function Delete() {
    debugger;
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        LoadingSymb();
        $.ajax({
            url: "/QuotationAdd/Delete/" + Qutid,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                //alert("Data Deleted Sucessfully");
                var msg = 'Data Deleted Successfully...';
                var flg = 2;
                var mod = 0;
                var ur = "/QuotationMain/QuotationMainIndex";
                AlartMessage(msg, flg, mod, ur);

                //window.location.href = "/QuotationMain/QuotationMainIndex";
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}