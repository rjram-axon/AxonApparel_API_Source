var OPlist = [];
var IPlist = [];
var StklistSave = [];
var Stklist = [];
var Iid = 0;
var Cid = 0;
var Sid = 0;
var Iindex = 0;
var Sindex = 0;
var Qty = 0;
var CompanyId = 0;
var Companyunitid = 0;
var Processorid = 0;
var Processid = 0;
var Masid = 0;
var Userid = 0;
var UserName = 0;
var MainFDate = 0;
var repobj = [];
var Repid = 0;
var Guserid = 0;
var iprowindex = -1;
var DCompid = 0;
var ChkProcess = true;
var ChkPOrdno = true;
var DtChk = false;
var ChkSupplier = true;
var ChkUnit = true;
var ChkComp = false;
var LoginUserid = '';
var editmasunitstore = 0;
var processname = '';
$(document).ready(function () {
    debugger;
    Guserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    MainFDate = $("#hdMainFromDate").data('value');
    DCompid = $("#hdnDCompid").data('value');
    LoginUserid = $("#hdnLoginUserid").data('value');
    LoadCompanyDDL("#ddlCompany,#ddlMCompany");
    LoadCompanyUnitDDL("#ddlUnit");
    getDate();
    // LoadProcessDDL("#ddlMProcess");
    LoadProcess();
    LoadWorkdivisionDDL("#ddlwrkdiv");
    LoadStoreUnitDDL("#ddlStore");
    LoadSupplierDDL("#ddlSupplier");
    LoadItemDDL("#ddlItem,#ddlIpItem");
    LoadColorDDL("#ddlColor,#ddlIpColor");
    LoadSizeDDL("#ddlSize,#ddlIpSize,#ddlIssSize,#ddlIpIssSize");
    LoadUomDDL("#ddlOPUOM,#ddlIPUOM");
   // ddlmain();
   
    var fill = localStorage.getItem('GeneralProcessOrderMainFilter');
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

    $('#btnapply').click(function () {
        ApplyOutput();


    });

    $('#btnitmadd').click(function () {
        debugger;
        var leng = 0;

        var isAllValid = true;


        debugger;
        if ($('#ddlItem').val() == "0") {
            isAllValid = false;


            //$('#ddlItem').css('border-color', 'Red');
            $('#ddlItem').siblings(".select2-container").css('border', '1px solid red');
        }
        else {
            //$('#ddlItem').css('border-color', 'lightgrey');
            $('#ddlItem').siblings(".select2-container").css('border', '1px solid lightgrey');
        }

        if ($('#ddlColor').val() == "0") {
            isAllValid = false;
            //$('#ddlColor').css('border-color', 'Red');
            $('#ddlColor').siblings(".select2-container").css('border', '1px solid red');
        }
        else {
            //$('#ddlColor').css('border-color', 'lightgrey');

            $('#ddlColor').siblings(".select2-container").css('border', '1px solid lightgrey');
        }
        if ($('#ddlSize').val() == "0") {
            isAllValid = false;
            //$('#ddlSize').css('border-color', 'Red');
            $('#ddlSize').siblings(".select2-container").css('border', '1px solid red');
        }
        else {
           // $('#ddlSize').css('border-color', 'lightgrey');

            $('#ddlSize').siblings(".select2-container").css('border', '1px solid lightgrey');
        }
       

        if ($('#txtRate').val().trim() == 0) {
            $('#txtRate').css('border-color', 'Red');
            isValid = false;
        }
        else {
            $('#txtRate').css('border-color', 'lightgrey');
        }


        if ($('#txtQty').val().trim() == 0) {
            $('#txtQty').css('border-color', 'Red');
            isValid = false;
        }
        else {
            $('#txtQty').css('border-color', 'lightgrey');
        }

      

        if ($('#ddlOPUOM').val() == "0") {
            isAllValid = false;
            //$('#ddlSize').css('border-color', 'Red');
            $('#ddlOPUOM').siblings(".select2-container").css('border', '1px solid red');
        }
        else {
            // $('#ddlSize').css('border-color', 'lightgrey');

            $('#ddlOPUOM').siblings(".select2-container").css('border', '1px solid lightgrey');
        }


        var OpItemid = $('#ddlItem').val();
        var OpColorid = $('#ddlColor').val();
        var OpSizeid = $('#ddlSize').val();

        var OpIssSizeid = $('#ddlIssSize').val();
        var GIssSizId = 0;
        var GIssSize = 0;

        if (OpIssSizeid == 0) {
            GIssSizId = 0;
            GIssSize = "";
        } else {
            GIssSizId = $('#ddlIssSize').val();
            GIssSize = $("#ddlIssSize option:selected").text();
        }

        var allow = $('#txtAllow').val();

        if (allow == '') {
            allow = 0;
        } else {

            allow = $('#txtAllow').val();
        }


        for (var g = 0; g < OPlist.length; g++) {
            if (OPlist[g].Itemid == OpItemid && OPlist[g].Colorid == OpColorid && OPlist[g].Sizeid == OpSizeid) {
                //alert('Must be a different Item..');
                var msg = 'Must be a different Item...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                fnClearOpControls();
                return true;
            }
        }


        if (OPlist.length == 0) {
            leng = 1;
        }
        else {
            leng = OPlist.length + 1;
        }

        if (isAllValid) {


            debugger;
            var OpListObj = {
                Item: $("#ddlItem option:selected").text(),
                Itemid: $('#ddlItem').val(),
                Color: $("#ddlColor option:selected").text(),
                Colorid: $('#ddlColor').val(),
                Size: $("#ddlSize option:selected").text(),
                Sizeid: $('#ddlSize').val(),
                IssSize: GIssSize,//$("#ddlIssSize option:selected").text(),
                IssSizeid: GIssSizId,//$('#ddlIssSize').val(),
                PlannedSizeID: $('#ddlSize').val(),
                Rate: $('#txtRate').val(),
                Qty: $('#txtQty').val(),
                SecQty: $('#txtSecQty').val(),
                opuom: $("#ddlOPUOM option:selected").text(),
                opuomid: $("#ddlOPUOM option:selected").val(),
                AllowPer: allow,
                QtywithoutAllow: $('#txtwithoutallowQty').val(),
                SlNo: leng,
                detid: 0,
                Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
            };

            OPlist.push(OpListObj);

            loadIpTable(OPlist);

            fnClearOpControls();
        }
    });

    $('#tblinpdetails').on('click', 'tr', function (e) {
        debugger;
        var table = $('#tblinpdetails').DataTable();
        var row = $(this).closest('tr');
        var data = $('#tblinpdetails').dataTable().fnGetData(row);
        var ItmId = data.Itemid;
        var ClrId = data.Colorid;
        var SzId = data.Sizeid;
        var colorempty = [];
        colorempty = StklistSave;
        colorempty = $.grep(colorempty, function (v) {
            return (v.Itemid == ItmId && v.Colorid == ClrId && v.Sizeid == SzId );
        });

      

        var res1 = [];
        $.each(colorempty, function (i) {

            if (colorempty[i].IssueQty > 0) {
                res1.push(colorempty[i]);
            }
        })
        var res2 = [];
        $.each(colorempty, function (i) {
            if (colorempty[i].IssueQty == 0 && colorempty[i].stock > 0) {
                res2.push(colorempty[i]);
            }
        })

        $.each(res2, function (i) {
            res1.push(res2[i]);
        })
        colorempty = res1;
        Stklist = colorempty;
        LoadStktab(Stklist);
        loadyarnwiseFabric(ItmId, ClrId, SzId)

    });

    $(document).on('click', '.btnitmedit', function () {
        debugger;
        //LoadItemDDL("#ddlItem");

        rowindex = $(this).closest('tr').index();

        var currentro12 = OPlist.slice(rowindex);
        $('#ddlItem').val(currentro12[0]['Itemid']).trigger('change');
        $('#ddlColor').val(currentro12[0]['Colorid']).trigger('change');
        $('#ddlSize').val(currentro12[0]['Sizeid']).trigger('change');
        $('#ddlIssSize').val(currentro12[0]['IssSizeid']).trigger('change');
        $('#txtRate').val(currentro12[0]['Rate']);
        $('#txtQty').val(currentro12[0]['Qty']);
        $('#txtSecQty').val(currentro12[0]['SecQty']);
        $('#txtAllow').val(currentro12[0]['AllowPer']);
        //$('#txtInuom').val(currentro12[0]['opuom']);
        $('#ddlOPUOM').val(currentro12[0]['opuom']).trigger('change');
        $('#txtwithoutallowQty').val(currentro12[0]['QtywithoutAllow']);

        $('#btnitmadd').hide();
        $('#btnitmupdate').show();
    });

    $('#btnitmupdate').click(function () {
        debugger;
        var currentrowsel = OPlist.slice(rowindex);

        var OpIssSizeid = $('#ddlIssSize').val();
        var GIssSizId = 0;
        var GIssSize = 0;

        if (OpIssSizeid == 0) {
            GIssSizId = 0;
            GIssSize = "";
        } else {
            GIssSizId = $('#ddlIssSize').val();
            GIssSize = $("#ddlIssSize option:selected").text();
        }

        var allow = $('#txtAllow').val();

        if (allow == '') {
            allow = 0;
        } else {

            allow = $('#txtAllow').val();
        }


        currentrowsel[0]['Itemid'] = $("#ddlItem").val();
        currentrowsel[0]['Item'] = $("#ddlItem option:selected").text();
        currentrowsel[0]['Colorid'] = $("#ddlColor").val();
        currentrowsel[0]['Color'] = $("#ddlColor option:selected").text();
        currentrowsel[0]['Sizeid'] = $("#ddlSize").val();
        currentrowsel[0]['Size'] = $("#ddlSize option:selected").text();
        currentrowsel[0]['IssSizeid'] = GIssSizId;//$("#ddlIssSize").val();
        currentrowsel[0]['IssSize'] = GIssSize;//$("#ddlIssSize option:selected").text();
        currentrowsel[0]['Rate'] = $("#txtRate").val();
        currentrowsel[0]['Qty'] = $("#txtQty").val();
        currentrowsel[0]['SecQty'] = $("#txtSecQty").val();
        currentrowsel[0]['opuom'] = $("#ddlOPUOM option:selected").text();
        currentrowsel[0]['opuomid'] = $("#ddlOPUOM option:selected").val();
        currentrowsel[0]['AllowPer'] = allow;
        currentrowsel[0]['QtywithoutAllow'] = $("#txtwithoutallowQty").val();
        OPlist[rowindex] = currentrowsel[0];




        if ($('#ddlItem').val() == "0") {
            // isAllValid = false;
            //$('#ddlIpColor').css('border-color', 'Red');
            $('#ddlItem').siblings(".select2-container").css('border', '1px solid red');

            return true;
        }
        else {
            //$('#ddlIpColor').css('border-color', 'lightgrey');
            $('#ddlItem').siblings(".select2-container").css('border', '1px solid lightgrey');
        }


        if ($('#ddlColor').val() == "0") {
            // isAllValid = false;
            //$('#ddlIpColor').css('border-color', 'Red');
            $('#ddlColor').siblings(".select2-container").css('border', '1px solid red');

            return true;
        }
        else {
            //$('#ddlIpColor').css('border-color', 'lightgrey');
            $('#ddlColor').siblings(".select2-container").css('border', '1px solid lightgrey');
        }



        if ($('#ddlSize').val() == "0") {
            // isAllValid = false;
            //$('#ddlIpColor').css('border-color', 'Red');
            $('#ddlSize').siblings(".select2-container").css('border', '1px solid red');

            return true;
        }
        else {
            //$('#ddlIpColor').css('border-color', 'lightgrey');
            $('#ddlSize').siblings(".select2-container").css('border', '1px solid lightgrey');
        }


        if ($('#ddlOPUOM').val() == "0") {
            // isAllValid = false;
            //$('#ddlIpColor').css('border-color', 'Red');
            $('#ddlOPUOM').siblings(".select2-container").css('border', '1px solid red');

            return true;
        }
        else {
            //$('#ddlIpColor').css('border-color', 'lightgrey');
            $('#ddlOPUOM').siblings(".select2-container").css('border', '1px solid lightgrey');
        }


        if ($('#txtRate').val().trim() == 0) {
            $('#txtRate').css('border-color', 'Red');
            return true;
        }
        else {
            $('#txtRate').css('border-color', 'lightgrey');
        }


        if ($('#txtQty').val().trim() == 0) {
            $('#txtQty').css('border-color', 'Red');
            return true;
        }
        else {
            $('#txtQty').css('border-color', 'lightgrey');
        }

        loadIpTable(OPlist);

        $('#btnitmupdate').hide();
        $('#btnitmadd').show();

        fnClearOpControls();
    });

    $(document).on('click', '.btnitmremove', function () {
        rowindex = $(this).closest('tr').index();

        OPlist.splice(rowindex, 1);
        document.getElementById("tblopitemdetails").deleteRow(rowindex + 1);
    });

    $('#btnipitmadd').click(function () {
        debugger;
        var leng = 0;

        var isAllValid = true;


        debugger;
        if ($('#ddlIpItem').val() == "0") {
            isAllValid = false;
            //$('#ddlIpItem').css('border-color', 'Red');

            $('#ddlIpItem').siblings(".select2-container").css('border', '1px solid red');
        }
        else {
            //$('#ddlIpItem').css('border-color', 'lightgrey');
            $('#ddlIpItem').siblings(".select2-container").css('border', '1px solid lightgrey');
        }

        if ($('#ddlIpColor').val() == "0") {
            isAllValid = false;
            //$('#ddlIpColor').css('border-color', 'Red');
            $('#ddlIpColor').siblings(".select2-container").css('border', '1px solid red');
        }
        else {
            //$('#ddlIpColor').css('border-color', 'lightgrey');
            $('#ddlIpColor').siblings(".select2-container").css('border', '1px solid lightgrey');
        }
        if ($('#ddlIpSize').val() == "0") {
            isAllValid = false;
            //$('#ddlIpSize').css('border-color', 'Red');
            $('#ddlIpSize').siblings(".select2-container").css('border', '1px solid red');
        }
        else {
            //$('#ddlIpSize').css('border-color', 'lightgrey');
            $('#ddlIpSize').siblings(".select2-container").css('border', '1px solid lightgrey');
        }

        if ($('#ddlIPUOM').val() == "0") {
            isAllValid = false;
            //$('#ddlIpSize').css('border-color', 'Red');
            $('#ddlIPUOM').siblings(".select2-container").css('border', '1px solid red');
        }
        else {
            //$('#ddlIpSize').css('border-color', 'lightgrey');
            $('#ddlIPUOM').siblings(".select2-container").css('border', '1px solid lightgrey');
        }
      

        var IpItemid = $('#ddlIpItem').val();
        var IpColorid = $('#ddlIpColor').val();
        var IpSizeid = $('#ddlIpSize').val();

        var ipqty = $('#txtIpQty').val()
        ipqty = parseFloat(ipqty).toFixed(2);

        for (var g = 0; g < IPlist.length; g++) {
            if (IPlist[g].Itemid == IpItemid && IPlist[g].Colorid == IpColorid && IPlist[g].Sizeid == IpSizeid) {
                //alert('Must be a different Item..');
                var msg = 'Must be a different Item...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                fnClearipControls();
                return true;
            }
        }


        if (IPlist.length == 0) {
            leng = 1;
        }
        else {
            leng = IPlist.length + 1;
        }

        if (isAllValid) {


            debugger;
            var IpListObj = {
                Item: $("#ddlIpItem option:selected").text(),
                Itemid: $('#ddlIpItem').val(),
                Color: $("#ddlIpColor option:selected").text(),
                Colorid: $('#ddlIpColor').val(),
                Size: $("#ddlIpSize option:selected").text(),
                Sizeid: $('#ddlIpSize').val(),
                IssSize: $("#ddlIpSize option:selected").text(),
                IssSizeid: $('#ddlIpSize').val(),
                PlannedSizeID: $('#ddlIpSize').val(),
                Rate: $('#txtIpRate').val(),
                Qty: ipqty,
                SecQty: $('#txtIpSecQty').val(),
                ipuom: $("#ddlIPUOM option:selected").text(),
                ipuomid: $("#ddlIPUOM option:selected").val(),
                SlNo: leng,
                detid: 0,
                Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
            };

            IPlist.push(IpListObj);

            //Qty = $('#txtIpQty').val();
            Qty = ipqty;
            loadoutTable(IPlist);
            Iid = IpListObj.Itemid;
            Cid = IpListObj.Colorid;
            Sid = IpListObj.Sizeid;
            //if (StklistSave.length == 0) {
            LoadStkgrid(Iid, Cid, Sid);
            //}
            //else if (StklistSave.length > 0) {

            //}

            fnClearipControls();
        }
    });


    $(document).on('click', '.btnipitmedit', function () {
        debugger;


        rowindex = $(this).closest('tr').index();

        var currentro12 = IPlist.slice(rowindex);

        $('#ddlIpItem').val(currentro12[0]['Itemid']).trigger('change');
        $('#ddlIpColor').val(currentro12[0]['Colorid']).trigger('change');
        $('#ddlIpSize').val(currentro12[0]['Sizeid']).trigger('change');
        $('#ddlIpIssSize').val(currentro12[0]['IssSizeid']).trigger('change');
        $('#txtIpRate').val(currentro12[0]['Rate']);
        $('#txtIpQty').val(currentro12[0]['Qty']);
        $('#txtIpSecQty').val(currentro12[0]['SecQty']);
        $('#ddlIPUOM').val(currentro12[0]['ipuom']).trigger('change');


        $('#btnipitmadd').hide();
        $('#btnipitmupdate').show();
    });


    $('#btnipitmupdate').click(function () {
        debugger;
        var currentrowsel = IPlist.slice(rowindex);

        currentrowsel[0]['Itemid'] = $("#ddlIpItem").val();
        currentrowsel[0]['Item'] = $("#ddlIpItem option:selected").text();
        currentrowsel[0]['Colorid'] = $("#ddlIpColor").val();
        currentrowsel[0]['Color'] = $("#ddlIpColor option:selected").text();
        currentrowsel[0]['Sizeid'] = $("#ddlIpSize").val();
        currentrowsel[0]['Size'] = $("#ddlIpSize option:selected").text();
        currentrowsel[0]['IssSizeid'] = $("#ddlIpSize").val();
        currentrowsel[0]['IssSize'] = $("#ddlIpSize option:selected").text();
        currentrowsel[0]['Rate'] = $("#txtIpRate").val();

        var ipqty = $('#txtIpQty').val()
        ipqty = parseFloat(ipqty).toFixed(2);


        currentrowsel[0]['Qty'] = ipqty;
        currentrowsel[0]['SecQty'] = $("#txtIpSecQty").val();
        currentrowsel[0]['ipuom'] = $("#ddlIPUOM option:selected").text();
        currentrowsel[0]['ipuomid'] = $("#ddlIPUOM option:selected").val(),
        IPlist[rowindex] = currentrowsel[0];



        if ($('#ddlIpItem').val() == "0") {
           // isAllValid = false;
            //$('#ddlIpColor').css('border-color', 'Red');
            $('#ddlIpItem').siblings(".select2-container").css('border', '1px solid red');

            return true;
        }
        else {
            //$('#ddlIpColor').css('border-color', 'lightgrey');
            $('#ddlIpItem').siblings(".select2-container").css('border', '1px solid lightgrey');
        }


        if ($('#ddlIpColor').val() == "0") {
            // isAllValid = false;
            //$('#ddlIpColor').css('border-color', 'Red');
            $('#ddlIpColor').siblings(".select2-container").css('border', '1px solid red');

            return true;
        }
        else {
            //$('#ddlIpColor').css('border-color', 'lightgrey');
            $('#ddlIpColor').siblings(".select2-container").css('border', '1px solid lightgrey');
        }



        if ($('#ddlIpSize').val() == "0") {
            // isAllValid = false;
            //$('#ddlIpColor').css('border-color', 'Red');
            $('#ddlIpSize').siblings(".select2-container").css('border', '1px solid red');

            return true;
        }
        else {
            //$('#ddlIpColor').css('border-color', 'lightgrey');
            $('#ddlIpSize').siblings(".select2-container").css('border', '1px solid lightgrey');
        }


        if ($('#ddlIPUOM').val() == "0") {
            // isAllValid = false;
            //$('#ddlIpColor').css('border-color', 'Red');
            $('#ddlIPUOM').siblings(".select2-container").css('border', '1px solid red');

            return true;
        }
        else {
            //$('#ddlIpColor').css('border-color', 'lightgrey');
            $('#ddlIPUOM').siblings(".select2-container").css('border', '1px solid lightgrey');
        }

        loadoutTable(IPlist);
        Qty = ipqty;
        //Qty = $('#txtIpQty').val();
        $('#btnipitmupdate').hide();
        $('#btnipitmadd').show();

        fnClearipControls();



        Iid = currentrowsel[0].Itemid;
        Cid = currentrowsel[0].Colorid;
        Sid = currentrowsel[0].Sizeid;

        calcipAmt();

        //for (var e = 0; e < StklistSave.length; e++) {
        //    if (StklistSave[e].Itemid == Iid && StklistSave[e].Colorid == Cid && StklistSave[e].Sizeid == Sid) {
        //        StklistSave[e].;
        //    }
        //}
        //for (var e = 0; e < Stklist.length; e++) {
        //    if (Stklist[e].Itemid == Iid && Stklist[e].Colorid == Cid && Stklist[e].Sizeid == Sid) {
        //        Stklist.pop(Stklist[e]);
        //    }
        //}
        //LoadStktab(Stklist);
        //LoadStkSavetab(StklistSave);
    });

    $(document).on('click', '.btnipdetremove', function () {
        rowindex = $(this).closest('tr').index();

        var currentrowsel = IPlist.slice(rowindex);
        var imid = currentrowsel[0].Itemid;
        var clid = currentrowsel[0].Colorid;
        var Szid = currentrowsel[0].Sizeid;
        IPlist.splice(rowindex, 1);
        document.getElementById("tblinpdetails").deleteRow(rowindex + 1);
        for (var e = 0; e < StklistSave.length; e++) {
            if (StklistSave[e].Itemid == imid && StklistSave[e].Colorid == clid && StklistSave[e].Sizeid == Szid) {
                StklistSave.pop(StklistSave[e]);
            }
        }
        for (var e = 0; e < Stklist.length; e++) {
            if (Stklist[e].Itemid == imid && Stklist[e].Colorid == clid && Stklist[e].Sizeid == Szid) {
                Stklist.pop(Stklist[e]);
            }
        }
        LoadStktab(Stklist);
        LoadStkSavetab(StklistSave);
    });

    $(document).on('click', '.btnipstkview', function () {
        debugger;
        Iindex;


        var table = $('#tblinpdetails').DataTable();

        var ItmId = table.row($(this).parents('tr')).data()["Itemid"];
        var ClrId = table.row($(this).parents('tr')).data()["Colorid"];
        var SzId = table.row($(this).parents('tr')).data()["Sizeid"];

        var colorempty = [];
        colorempty = StklistSave;

        colorempty = $.grep(colorempty, function (v) {
            return (v.Itemid == ItmId && v.Colorid == ClrId && v.Sizeid == SzId);
        });

        Stklist = colorempty;
        LoadStktab(Stklist);
    });


    $(document).on('keyup', '#txtAllow', function () {
        var qty = $("#txtwithoutallowQty").val();
        var per = $("#txtAllow").val();

        if (per < 0) {
            $("#txtQty").val('');
            $("#txtAllow").val(0);
        }
        else if (per == 0) {
            $("#txtQty").val(qty);
        }
        else {
            var Tot = qty * (per / 100);
            Tot = Tot + parseFloat(qty);
            Tot = parseFloat(Tot).toFixed(3);
            $("#txtQty").val(Tot);
        }
    });


    $(document).on('keyup', '#txtwithoutallowQty', function () {
        // $("#txtAllow").val(0);

        var qty = $("#txtwithoutallowQty").val();
        var per = $("#txtAllow").val();

        if ( per < 0) {
            $("#txtQty").val('');
            $("#txtAllow").val(0);
        }
        else if (per == 0) {
            $("#txtQty").val(qty);
        }
        else {
            var Tot = qty * (per / 100);
            Tot = Tot + parseFloat(qty);
            Tot = parseFloat(Tot).toFixed(3);
            $("#txtQty").val(Tot);
        }

    });




    $(document).on('keyup', '.calcsepquan', function () {
        debugger;
        var table = $('#tblstkdet').DataTable();
        var itmid = table.row($(this).parents('tr')).data()["Itemid"];
        var colorid = table.row($(this).parents('tr')).data()["Colorid"];
        var sizeid = table.row($(this).parents('tr')).data()["Sizeid"];
        var balq = table.row($(this).parents('tr')).data()["stock"];
        var stkid = table.row($(this).parents('tr')).data()["ItemStockId"];
        var value = $(this).val();


        $.each(StklistSave, function () {
            if (this.Itemid == itmid && this.Colorid == colorid && this.Sizeid == sizeid && this.ItemStockId == stkid) {
                if (balq >= value) {
                    this.IssueQty = value;
                }
                else {
                    var t = value - balq;
                    this.IssueQty = balq;
                    value = balq;
                }

            }
        });


        var totalamnt = 0;

        for (var e = 0; e < StklistSave.length; e++) {
            if (StklistSave[e].Itemid == itmid && StklistSave[e].Sizeid == sizeid && StklistSave[e].Colorid == colorid) {
                var amount = StklistSave[e].IssueQty;
                totalamnt = totalamnt + parseFloat(amount);
            }
        }
        $.each(IPlist, function () {
            if (this.Itemid == itmid && this.Sizeid == sizeid && this.Colorid == colorid) {
                this.Qty = totalamnt;
            }
        });

        colorempty = StklistSave;
        colorempty = $.grep(colorempty, function (v) {
            return (v.Itemid === itmid && v.Colorid === colorid && v.Sizeid === sizeid);
        });

        LoadStkSavetab(StklistSave);


        var otable = $('#tblstkdet').DataTable();
        var odata = otable.rows().data();

        $('input[id=txtOpRQty]').each(function (ig) {
            if (odata[ig].Itemid == itmid && odata[ig].Colorid == colorid && odata[ig].Sizeid == sizeid && odata[ig].ItemStockId == stkid) {
                var row = $(this).closest('tr');
                // row.find('#txtOpOrdQty').val(totalamnt);
                row.find('#txtOpRQty').focus().val('').val(value);
            }
        });



        //LoadStktab(colorempty);

        Stklist = [];
        Stklist = colorempty;
        loadoutTable(IPlist);

        ////Datatable textbox focus
        //var rows = $("#tblstkdet").dataTable().fnGetNodes();
        //var dtTable = $('#tblstkdet').DataTable();
        //for (var i = 0; i < rows.length; i++) {
        //    var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
        //    $('input[id=txtOpRQty]').each(function () {
        //        if (sn == CSno && $(this).val() == val) {
        //            var row = $(this).closest('tr');
        //            var num = row.find('#txtOpRQty').val();
        //            row.find('#txtOpRQty').focus().val('').val(num);
        //            return true;
        //        }
        //    });
        //}
    });



    $(document).on('keyup', '.calcseprate', function () {
        debugger;
        var table = $('#tblstkdet').DataTable();
        var itmid = table.row($(this).parents('tr')).data()["Itemid"];
        var colorid = table.row($(this).parents('tr')).data()["Colorid"];
        var sizeid = table.row($(this).parents('tr')).data()["Sizeid"];
        var balq = table.row($(this).parents('tr')).data()["stock"];
        var stkid = table.row($(this).parents('tr')).data()["ItemStockId"];
        var value = $(this).val();

        $.each(StklistSave, function () {
            if (this.Itemid == itmid && this.Colorid == colorid && this.Sizeid == sizeid && this.ItemStockId == stkid) {
                this.Markup_Rate = value;
            }
        });

        var otable = $('#tblstkdet').DataTable();
        var odata = otable.rows().data();

        $('input[id=txtrate]').each(function (ig) {
            if (odata[ig].Itemid == itmid && odata[ig].Colorid == colorid && odata[ig].Sizeid == sizeid && odata[ig].ItemStockId == stkid) {
                var row = $(this).closest('tr');
                // row.find('#txtOpOrdQty').val(totalamnt);
                row.find('#txtrate').focus().val('').val(value);
            }
        });


    });


    $('#tblmaindetails').on('click', 'tr', function (e) {
        debugger;

        var table = $('#tblmaindetails').DataTable();

        var row = $(this).closest('tr');
        var data = $('#tblmaindetails').dataTable().fnGetData(row);

        processname = data[5];
        
    });

});

function GenerateNo() {
    debugger;
    CompanyId = $('select#ddlCompany option:selected').val();
    if (CompanyId > 0) {
        GenerateNumber();
        GenerateIssueNumber();
        LoadLocation();
    }
    else {
        //alert('Please select company...');
        var msg = 'Please select company...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }
}


function LoadProcess() {
    debugger;

    $.ajax({
        url: "/GeneralProcessOrder/LoadProcess",
        data: JSON.stringify({}),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {


                var data = result.Value;

                $(ddlProcess).append($('<option/>').val('0').text('--Select Process--'));
                $.each(data, function () {
                    $(ddlProcess).append($('<option></option>').val(this.processid).text(this.process));

                });
            }
        }
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
            $('#txtProcessOrderno').val(result.Value);
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
            $('#txtIssueno').val(result.Value);
        }
    });
}


$(document).ready(function () {
    $("#tblinpdetails ").dataTable().find("tbody").on('click', 'tr', function () {
        Iindex = (this.rowIndex) - 1;
    });
});
$(document).ready(function () {
    $("#tblstkdet ").dataTable().find("tbody").on('click', 'tr', function () {
        Sindex = (this.rowIndex) - 1;
    });
});
function loadIpTable(list) {
    $('#tblopitemdetails').DataTable().destroy();
    debugger;
    list.sort(function (a, b) {
        return a.SlNo - b.SlNo;
    })
    $('#tblopitemdetails').DataTable({
        //'bSortable': false,
        //'aTargets': [7, 8],
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

            { title: "Sno", data: "SlNo" },
            { title: "Detid", data: "detid", "visible": false },
            { title: "Itemid", data: "Itemid", "visible": false },
            { title: "Item", data: "Item" },
            { title: "Colorid", data: "Colorid", "visible": false },
            { title: "Color", data: "Color" },
            { title: "Sizeid", data: "Sizeid", "visible": false },
            { title: "Size", data: "Size" },
             { title: "Iss Sizeid", data: "IssSizeid", "visible": false },
            { title: "Iss Size", data: "IssSize" },
          
            { title: "Qty", data: "Qty" },
             { title: "Allow %", data: "AllowPer" },
             { title: "Qtywithoutallow", data: "QtywithoutAllow", "visible": false },

                  { title: "Rate", data: "Rate" },
            { title: "Sec Qty", data: "SecQty" },
            { title: "Inp Uom", data: "opuom" },
               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding:0px;height: 20px;border-radius: 10px;" class="btnitmedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding:0px;height: 20px;border-radius: 10px;" class="btnitmremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div>'
               }
        ]
    });


    $("#tblopitemdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblopitemdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}



function loadoutTable(list) {

    var inputcount = 0;
    $('#tblinpdetails tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tblinpdetails').DataTable().destroy();
    }
    $('#tblinpdetails').empty();



    //$('#tblinpdetails').DataTable().destroy();
    debugger;
    list.sort(function (a, b) {
        return a.SlNo - b.SlNo;
    })
    $('#tblinpdetails').DataTable({
        //'bSortable': false,
        //'aTargets': [7, 8],
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

            { title: "Sno", data: "SlNo" },
            { title: "Detid", data: "detid", "visible": false },
            { title: "Itemid", data: "Itemid", "visible": false },
            { title: "Item", data: "Item" },
            { title: "Colorid", data: "Colorid", "visible": false },
            { title: "Color", data: "Color" },
            { title: "Sizeid", data: "Sizeid", "visible": false },
            { title: "Size", data: "Size" },
            // { title: "Iss Sizeid", data: "IssSizeid", "visible": false },
            //{ title: "Iss Size", data: "IssSize" },
            { title: "Rate", data: "Rate", "visible": false },
            { title: "Qty", data: "Qty" },
            { title: "Sec Qty", data: "SecQty" },
            { title: "Out Uom", data: "ipuom" },
               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding:0px;height: 20px;border-radius: 10px;" class="btnipitmedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding:0px;height: 20px;border-radius: 10px;" class="btnipdetremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div>'
               }
        ]
    });


    $("#tblinpdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblinpdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}



function fnClearipControls() {
    debugger;
    $('#ddlIpItem').val('0').trigger('change');
    $('#ddlIpColor').val('0').trigger('change');
    $('#txtIpRate').val('');
    $('#txtIpQty').val('');
    $('#txtIpSecQty').val('');
    $('#ddlIPUOM').val('0').trigger('change');
    $('#ddlIpSize').val('0').trigger('change');
    $('#ddlIpIssSize').val('0').trigger('change');

}


function fnClearOpControls() {
    debugger;
    $('#ddlItem').val('0').trigger('change');
    $('#ddlColor').val('0').trigger('change');
    $('#txtRate').val('');
    $('#txtQty').val('');
    $('#txtSecQty').val('');
    $('#ddlOPUOM').val('0').trigger('change');
    $('#ddlSize').val('0').trigger('change');;
    $('#ddlIssSize').val('0').trigger('change');
    $('#txtAllow').val('');
    $('#txtwithoutallowQty').val('');
}


function ClearTextbox() {
    debugger;
   // $('#ddlCompany').val("0").trigger('change');
    //$('#ddlUnit').val("0").trigger('change');
    //$('#ddlColor').val("0");
    $('#ddlProcess').val("0").trigger('change');
    //$('#ddlwrkdiv').val("0");
    //$('#ddlBuyer').val("0");
    $('#ddlStore').val("0").trigger('change');
    $('#ddlSupplier').val("0").trigger('change');
    $('#txtProcessOrderno').val("");
    $('#txtIssueno').val("");
    //$('#ddlRefNo').val("0");
    //$('#ddlinnerbuyer').val("0");
    $('#btnUpdate').hide();
    $('#btnDel').hide();
    $('#btnAdd').show();
    var protype = $('input[name="optwrkord"]:checked').attr('value');
    if (protype == 'P') {
        $('#supp').show();
        $("#wrkdiv").hide();
    }
    else if (protype == 'W') {
        $('#supp').hide();
        $("#wrkdiv").show();
    }

    GenerateNo();


    fnClearipControls();
    fnClearOpControls();

    OPlist = [];
    IPlist = [];
    StklistSave = [];
    Stklist = [];

    loadIpTable(OPlist);
    LoadStktab(Stklist);
    loadoutTable(IPlist);

}
function backtomain() {
    $('#myModal1').hide();
    $('#myModal1').modal('hide');
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
    $('#txtDeliverDate').val(Fdatestring);
    //$('#txtOrderDate').val(Fdatestring);


}

function LoadStkgrid(itmid, clrid, sizeid) {
    debugger;
    var cmpyid = $('select#ddlCompany option:selected').val();
    var strunitid = $('select#ddlStore option:selected').val();

    $.ajax({
        url: "/GeneralProcessOrder/LoadStkDet",
        data: JSON.stringify({ itmid: itmid, clrid: clrid, sizeid: sizeid, cmpid: cmpyid, strunitid: strunitid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            obj = result.Value;
            var dup = [];
            if (StklistSave.length == 0) {
                StklistSave = obj;
                LoadStkSavetab(StklistSave);
            }
            else {

                //for (var d = 0; d < StklistSave.length; d++) {
                //    if (StklistSave[d].Itemid == Iid && StklistSave[d].Colorid == Cid && StklistSave[d].Sizeid == Sid) {

                //        dup.push(StklistSave[d]);
                //    }
                //}
                for (var t = 0; t < obj.length; t++) {
                    for (var d = 0; d < StklistSave.length; d++) {
                        if (StklistSave[d].Itemid == obj[t].Itemid && StklistSave[d].Colorid == obj[t].Colorid && StklistSave[d].Sizeid == obj[t].Sizeid) {

                            dup.push(StklistSave[d]);
                        }
                    }
                }

                if (dup.length > 0) {
                    LoadStkSavetab(StklistSave);
                    return true;
                }
                else {
                    //for (var s = 0; s < StklistSave.length; s++) {
                    //    if (obj[s].Itemid != Iid && obj[s].Colorid != Cid && obj[s].Sizeid != Sid) {
                    for (var d = 0; d < obj.length; d++) {
                        StklistSave.push(obj[d]);
                    }
                    LoadStkSavetab(StklistSave);

                    //    }

                    //}
                }
            }

            calcipAmt();

        }

    });
}
function calcipAmt() {
    debugger;
    Iindex;
    var currentrowoftcpi = IPlist.slice(Iindex);

    //var CSno = currentrowoftcpi[0].sno;
    //var OrdBalQty = currentrowoftcpi[0].orderqty;
    var IId = Iid;// currentrowoftcpi[0].Itemid;
    var CId = Cid;//currentrowoftcpi[0].Colorid;
    var SId = Sid;//currentrowoftcpi[0].Sizeid;
    //var prod = currentrowoftcpi[0].procordid;

    //if (Val > OrdBalQty) {
    //    alert("OrderQty Should Not Greater then OrderBalanceQty..");     
    //    $.each(ItmList, function () {
    //        if (this.sno == CSno) {
    //            this.Received_qty = 0;

    //        }
    //    });

    //    LoaditmTab(ItmList);
    //    return true;
    //}
    //$.each(IPlist, function () {
    //    if (this.sno == CSno) {
    //        this.Received_qty = Val;

    //    }
    //});

    var pid = [];
    var bal = [];
    var qty = [];
    for (var t = 0; t < StklistSave.length; t++) {
        if (StklistSave[t].Itemid == IId && StklistSave[t].Colorid == CId && StklistSave[t].Sizeid == SId) {
            pid.push(StklistSave[t].ItemStockId);
            bal.push(StklistSave[t].stock);
            qty.push(StklistSave[t].IssueQty);
        }
    }
    var c = pid.length;
    var t = 0;
    var Val = Qty;
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
    for (var u = 0; u < StklistSave.length; u++) {
        for (var r = 0; r < pid.length; r++) {
            if (StklistSave[u].ItemStockId == pid[r]) {
                StklistSave[u].IssueQty = qty[r];
            }
        }
    }

    colorempty = StklistSave;

    colorempty = $.grep(colorempty, function (v) {
        return (v.Itemid == IId && v.Colorid == CId && v.Sizeid == SId);
    });

    LoadStkSavetab(StklistSave);
    LoadStktab(colorempty);

    Stklist = [];
    Stklist = colorempty;

    var totisu = 0;
    $.each(colorempty, function (v) {
        totisu = totisu + colorempty[v].IssueQty;
    })

    $.each(IPlist, function (v) {
        if (IPlist[v].Itemid == IId && IPlist[v].Colorid == CId && IPlist[v].Sizeid == SId) {
            IPlist[v].Qty = parseFloat(totisu).toFixed(2);
        }
    })


    loadoutTable(IPlist);

}

function LoadStkSavetab(list) {
    debugger;
    $('#tblSavestkdet').DataTable().destroy();

    $('#tblSavestkdet').DataTable({
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
              { title: "SNo", data: "sno", "visible": false },
                   { title: "Itmid", data: "Itemid" },
                   { title: "Colorid", data: "Colorid" },
                   { title: "Sizeid", data: "Sizeid" },
                   { title: "Document No", data: "transno" },
                   { title: "Lot No", data: "LotNo" },
                   { title: "Stock", data: "stock" },
                      { title: "StockId", data: "ItemStockId", "visible": false },
                   {
                       title: "Issues", data: "IssueQty",
                       //render: function (data) {

                       //    return '<input type="text" id="txtOpRQty" class="editor-active"  style="width: 50px;text-align: center;"  value=' + data + ' onkeyup="calcrate(this.value);">';

                       //},
                   },
                   { title: "Supplier", data: "supplier" },

                   {
                       title: "Markup Rate", data: "Markup_Rate",
                       //render: function (data) {

                       //    return '<input type="text" id="txtOpOrdQty" class="editor-active"  style="width: 50px;text-align: center;"  value=' + data + ' onkeyup="calcAmt(this.value);">';

                       //},
                   },
                   { title: "Sec Qty", data: "secqty" },

        ]

    });
}

function LoadStktab(list) {
    debugger;
    $('#tblstkdet').DataTable().destroy();

    $('#tblstkdet').DataTable({
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
        "bSort": false,
        columns: [
              { title: "SNo", data: "sno", "visible": false },
                   { title: "Itmid", data: "Itemid", "visible": false },
                   { title: "Colorid", data: "Colorid", "visible": false },
                   { title: "Sizeid", data: "Sizeid", "visible": false },
                   { title: "Document No", data: "transno" },
                   { title: "Lot No", data: "LotNo" },
                   { title: "Stock", data: "stock" },
                     { title: "StockId", data: "ItemStockId", "visible": false },
                   {
                       title: "Issues", data: "IssueQty",
                       render: function (data) {

                           return '<input type="text" id="txtOpRQty" class="calcsepquan form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                       },
                   },
                   { title: "Supplier", data: "supplier" },

                   {
                       title: "Markup Rate", data: "Markup_Rate",
                       render: function (data) {

                           return '<input type="text" id="txtrate" class="calcseprate form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';

                       },
                   },
                   { title: "Sec Qty", data: "secqty" },

        ]

    });
}


function chk() {
    debugger;
    var type = $('input[name="optwrkord"]:checked').attr('value');
    if (type == 'P') {
        var sup = $('#ddlSupplier').val();
        var supp = $('select#ddlSupplier option:selected').text();
        Processorid = $('select#ddlSupplier option:selected').val();
        //if (sup == 0) {
        //    alert('Select Supplier');

        //    //$('#myModal1').hide();
        //    //$('#myModal1').modal('hide');
        //    return true;
        //}
    }
    else {
        var sup = $('#ddlwrkdiv').val();
        var supp = $('select#ddlwrkdiv option:selected').text();
        Processorid = $('select#ddlwrkdiv option:selected').val();
        //if (sup == 0) {
        //    alert('Select WorkDivision');
        //    //$('#myModal1').hide();
        //    //$('#myModal1').modal('hide');
        //    return true;
        //}
    }
    Processid = $('select#ddlProcess option:selected').val();
    Companyunitid = $('select#ddlUnit option:selected').val();
    CompanyId = $('select#ddlCompany option:selected').val();
    if (Processid == 0) {
        //alert('Select Process');
        var msg = 'Please select Process...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        $('#LoadingSpinner').hide();
        return true;
    }
    if (Companyunitid == 0) {
        //alert('Select Companyunit');
        var msg = 'Please select Companyunit...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        $('#LoadingSpinner').hide();
        return true;
    }
    if (CompanyId == 0) {
        //alert('Select Company');
        var msg = 'Please select Company...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        $('#LoadingSpinner').hide();
        return true;
    }
}

function IssueMas() {
    debugger;
    $('#LoadingSpinner').show();
    chk();
    var type = $('input[name="optwrkord"]:checked').attr('value');
    // var ordtype = $('input[name="type"]:checked').attr('value');
    var distype = $('input[name="disploc"]:checked').attr('value');
    var iolist = [];
    var jobdetlist = [];
    var stkdetlist = [];

    var res = validate();
    if (res == false) {
        return false;
    }
    var isvalid = true;
    
    if (OPlist.length > 0) { }
    else {
        isvalid = false;
        //alert('Please Check Output Details..');
        var msg = 'Please Check Output Details...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        $('#LoadingSpinner').hide();
        return true;
    }

    if (IPlist.length > 0) { }
    else {
        isvalid = false;
        //alert('Please Check Input Details..');
        var msg = 'Please Check Input Details...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        $('#LoadingSpinner').hide();
        return true;
    }

    if (StklistSave.length > 0) { }
    else {
        isvalid = false;
        //alert('Please Check Stock Details..');
        var msg = 'Please Check Stock Details...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        $('#LoadingSpinner').hide();
        return true;
    }



    var opchk = [];
    var ipchk = [];
    for (var y = 0; y < OPlist.length; y++) {
        if (OPlist[y].Qty > 0) {
            opchk.push(OPlist[y]);
        }
    }


    for (var u = 0; u < IPlist.length; u++) {
        if (IPlist[u].Qty > 0) {
            ipchk.push(IPlist[u]);
        }
    }
    if (opchk.length == 0 || ipchk.length == 0) {
        //alert('Please fill atleast any one qty...');
        var msg = 'Please fill atleast any one quantity...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        $('#LoadingSpinner').hide();
        return true;
    }


    var totopqty = 0;
    $.each(OPlist, function (v) {
        totopqty = totopqty + parseFloat(OPlist[v].Qty);
    })


    var totopAllowper = 0;
    $.each(OPlist, function (v) {
        totopAllowper = totopAllowper + parseFloat(OPlist[v].AllowPer);
    })

    var totipqty = 0;
    $.each(IPlist, function (v) {
        totipqty = totipqty + parseFloat(IPlist[v].Qty);
    })


    var totstkqty = 0;
    $.each(StklistSave, function (v) {
        totstkqty = totstkqty + parseFloat(StklistSave[v].IssueQty);
    })

    if (parseFloat(totipqty).toFixed(3) == parseFloat(totstkqty).toFixed(3)) {

    }
    else {
        isvalid = false;
        //alert('Input Qty and Stock Qty are should be equal..');
        var msg = 'Input quantity and Stock quantity are should be equal...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        $('#LoadingSpinner').hide();
        return true;
    }

    var Process = $('#ddlProcess option:selected').text();
    if ((Process != 'CUTTING') && (Process!='KNITTING')) {
        if (parseFloat(totipqty) == parseFloat(totopqty)) {

        }
        else {

            if (totopAllowper > 0) {

                if (parseFloat(totipqty).toFixed(3) > parseFloat(totopqty).toFixed(3)) {
                    isvalid = false;
                    //alert('Please check Input Qty and Output Qty..');
                    var msg = 'Please check Input quantity and Output quantity...';
                    var flg = 4;
                    var mod = 1;
                    var url = "";
                    AlartMessage(msg, flg, mod, url);
                    $('#LoadingSpinner').hide();
                    return true;
                }
              
            } else {

                isvalid = false;
                //alert('Input Qty and Output Qty are should be equal..');
                var msg = 'Input quantity and Output quantity are should be equal...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                $('#LoadingSpinner').hide();
                return true;
            }
        }
    }


    var storeunitid = $('#ddlStore').val();
    if (storeunitid == 0 && ValidateProcessStore == "True") {
        //alert('Please select Store..');
        var msg = 'Please select Store...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        $('#LoadingSpinner').hide();
        return true;
    }


    var oldpono = $('#txtProcessOrderno').val();

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
            $('#LoadingSpinner').hide();
            //$('#txtProcessOrderno').val(result.Value);
            var newpono = result.Value;
            if (oldpono != newpono) {
                //alert('Process OrderNo has been changed...');
                var msg = 'Process Order Number has been changed...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                $('#txtProcessOrderno').val(result.Value);
            }


            var oldpino = $('#txtIssueno').val();

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
                    //$('#txtIssueno').val(result.Value);
                    var newpino = result.Value;
                    if (oldpino != newpino) {
                        //alert('Process IssueNo has been changed...');
                        var msg = 'Process Issue Number has been changed...';
                        var flg = 4;
                        var mod = 1;
                        var url = "";
                        AlartMessage(msg, flg, mod, url);
                        $('#txtIssueno').val(result.Value);
                    }



                    
                    if (OPlist.length > 0) {
                        for (var r = 0; r < OPlist.length; r++) {
                            var det = {
                                // productionorddetid:
                                //  productionordid:
                                itemid: OPlist[r].Itemid,
                                colorid: OPlist[r].Colorid,
                                sizeid: OPlist[r].Sizeid,
                                inp_op: 'O',
                                order_output_qty: OPlist[r].Qty,
                                issued_qty: 0.00,
                                rate: OPlist[r].Rate,
                                received_qty: 0.00,//OpItmList[r].ordqty,
                                Return_Qty: 0.00,
                                Damage_qty: 0.00,
                                Cancel_Qty: 0.00,
                                IN_OUT_UOMID: OPlist[r].opuomid,
                                //Returnable_Qty:0.00,
                                //Inp_CancelQty:
                                //Markup_Rate:
                                //Markup_Value:
                                PlannedSizeID: OPlist[r].Sizeid,
                                IssSizeid: OPlist[r].IssSizeid,
                                OrdSecQty: OPlist[r].SecQty,
                                ItemRemarks: $("#txtItemRemarks").val(),
                                Loss_Qty: 0.00,
                                AllowPer: OPlist[r].AllowPer,
                                QtywithoutAllow: OPlist[r].QtywithoutAllow,
                                //IN_OUT_UOMID:
                                //IssueSizeID:
                                ReqDate: $("#txtDeliverDate").val(),//new Date($('#txtDeliverDate').val()),
                                //Loop_Len:
                                //Gauge:

                            }
                            iolist.push(det);
                        }
                    }


                    if (IPlist.length > 0) {
                        for (var r = 0; r < IPlist.length; r++) {
                            var det = {
                                // productionorddetid:
                                //  productionordid:
                                itemid: IPlist[r].Itemid,
                                colorid: IPlist[r].Colorid,
                                sizeid: IPlist[r].Sizeid,
                                inp_op: 'I',
                                order_output_qty: IPlist[r].Qty,
                                issued_qty: IPlist[r].Qty,
                                rate: IPlist[r].Rate,
                                received_qty: 0.00,
                                Return_Qty: 0.00,
                                Damage_qty: 0.00,
                                Cancel_Qty: 0.00,
                                IN_OUT_UOMID: IPlist[r].ipuomid,
                                //Returnable_Qty:0.00,
                                //Inp_CancelQty:
                                //Markup_Rate:
                                //Markup_Value:
                                PlannedSizeID: IPlist[r].Sizeid,
                                OrdSecQty: IPlist[r].SecQty,
                                ItemRemarks: "",
                                Loss_Qty: 0.00,
                                //IN_OUT_UOMID:
                                //IssueSizeID:
                                ReqDate: $("#txtDeliverDate").val(),//new Date($('#txtDeliverDate').val()),
                                //Loop_Len:
                                //Gauge:

                            }
                            iolist.push(det);
                        }
                    }

                    if (OPlist.length > 0) {
                        for (var s = 0; s < OPlist.length; s++) {
                            var objdet = {
                                ProgQty: 0.00,
                                OrderQty: OPlist[s].Qty,
                                issued_qty: 0.00,
                                received_qty: 0.00,
                                Return_Qty: 0.00,
                                Damage_qty: 0.00,
                                Cancel_Qty: 0.00,
                                //Job_ord_no: OPlist[s].jobordno,
                                //ProdPrgNo: OPlist[s].prodpgmno,
                                //Returnable_Qty:
                                Closed: 'N',
                                //Inp_CancelQty:
                                OrdSecQty: OPlist[s].SecQty,
                                Loss_Qty: 0.00,
                                buy_ord_ship: 0,
                                itemid: OPlist[s].Itemid,
                                colorid: OPlist[s].Colorid,
                                sizeid: OPlist[s].Sizeid,
                                ipop: 'O'
                            }
                            jobdetlist.push(objdet);
                        }
                    }

                    if (IPlist.length > 0) {
                        for (var s = 0; s < IPlist.length; s++) {
                            var objdet = {
                                ProgQty: 0.00,
                                OrderQty: IPlist[s].Qty,
                                issued_qty: IPlist[s].Qty,
                                received_qty: 0.00,
                                Return_Qty: 0.00,
                                Damage_qty: 0.00,
                                Cancel_Qty: 0.00,
                                // Job_ord_no: IPlist[s].jobordno,
                                //ProdPrgNo: IPlist[s].prodpgmno,
                                //Returnable_Qty:
                                Closed: 'N',
                                //Inp_CancelQty:
                                OrdSecQty: IPlist[s].SecQty,
                                Loss_Qty: 0.00,
                                buy_ord_ship: 0,
                                itemid: IPlist[s].Itemid,
                                colorid: IPlist[s].Colorid,
                                sizeid: IPlist[s].Sizeid,
                                ipop: 'I'
                            }
                            jobdetlist.push(objdet);
                        }
                    }

                    if (StklistSave.length > 0) {
                        for (var j = 0; j < StklistSave.length; j++) {
                            var objstk = {
                                //ProductionOrdStockId:
                                //    ProductionOrdJobid:
                                Productionorder: $("#txtIssueno").val(),
                                // jobordno: StklistSave[j].jobordno,
                                ItemStockId: StklistSave[j].ItemStockId,
                                IssueQty: StklistSave[j].IssueQty,
                                ReturnQty: 0.00,
                                LossQty: 0.00,
                                Returnable_Qty: 0.00,
                                Markup_Rate: 0.00,
                                LotNo: '',
                                Itemid: StklistSave[j].Itemid,
                                Colorid: StklistSave[j].Colorid,
                                Sizeid: StklistSave[j].Sizeid
                            }
                            stkdetlist.push(objstk);
                        }
                    }

                    var issuemaslist = [];
                    var issueiolist = [];
                    var issuejobdet = [];
                    if (OPlist.length > 0) {
                        for (var r = 0; r < OPlist.length; r++) {
                            var det = {
                                // ProcessIssueDetId:
                                //  ProcessIssueId:
                                itemid: OPlist[r].Itemid,
                                colorid: OPlist[r].Colorid,
                                sizeid: OPlist[r].Sizeid,
                                IssueQty: OPlist[r].Qty,
                                SecQty: OPlist[r].SecQty,// OpItmList[r].prgopqty,
                                OutputUom: 0.00,
                                OutputValue: 0.00,// OpItmList[r].rate,
                                IPMarkup_Rate: 0.00,//OpItmList[r].ordqty,
                                ip_op: 'O',

                            }
                            issueiolist.push(det);
                        }
                    }

                    if (IPlist.length > 0) {
                        for (var r = 0; r < IPlist.length; r++) {
                            var det = {
                                // ProcessIssueDetId:
                                //  ProcessIssueId:
                                itemid: IPlist[r].Itemid,
                                colorid: IPlist[r].Colorid,
                                sizeid: IPlist[r].Sizeid,
                                IssueQty: IPlist[r].Qty,
                                SecQty: IPlist[r].SecQty,// OpItmList[r].prgopqty,
                                OutputUom: 0.00,
                                OutputValue: 0.00,// OpItmList[r].rate,
                                IPMarkup_Rate: 0.00,//OpItmList[r].ordqty,
                                ip_op: 'I',

                            }
                            issueiolist.push(det);
                        }
                    }

                    if (OPlist.length > 0) {
                        for (var s = 0; s < OPlist.length; s++) {
                            var objdet = {
                                //ProcessIssueJobId
                                //ProcessIssueId
                                //ProcessIssueDetId
                                //Job_ord_no: OPlist[s].jobordno,
                                // ProdPrgNo: OPlist[s].prodpgmno,
                                LastProcessid: 0,//IpSaveJobDetList[s].ordqty,
                                IssueQty: OPlist[s].Qty,
                                ReturnQty: 0.00,
                                LossQty: 0.00,
                                SecQty: OPlist[s].SecQty,
                                itemid: OPlist[s].Itemid,
                                colorid: OPlist[s].Colorid,
                                sizeid: OPlist[s].Sizeid,
                                ip_op: 'O'
                            }
                            issuejobdet.push(objdet);
                        }
                    }


                    if (IPlist.length > 0) {
                        for (var s = 0; s < IPlist.length; s++) {
                            var objdet = {
                                //ProcessIssueJobId
                                //ProcessIssueId
                                //ProcessIssueDetId
                                //Job_ord_no: IPlist[s].jobordno,
                                // ProdPrgNo: IPlist[s].prodpgmno,
                                LastProcessid: 0,//IpSaveJobDetList[s].ordqty,
                                IssueQty: IPlist[s].Qty,
                                ReturnQty: 0.00,
                                LossQty: 0.00,
                                SecQty: IPlist[s].SecQty,
                                itemid: IPlist[s].Itemid,
                                colorid: IPlist[s].Colorid,
                                sizeid: IPlist[s].Sizeid,
                                ip_op: 'I'
                            }
                            issuejobdet.push(objdet);
                        }
                    }

                    var obj = {
                        //ProcessIssueId:
                        ProcessIssueNo: $("#txtIssueno").val(),
                        ProcessIssueDate: $("#txtDeliverDate").val(),// new Date($('#txtDeliverDate').val()),
                        //ProcessOrdId: Processordid,
                        Remarks: $("#txtdescription").val(),
                        GatePassVehicle: "",
                        //IssueStoreid:
                        CreatedBy: Guserid,
                        EWayNo: "",
                        EWayDate: $("#txtDeliverDate").val(),//new Date($('#txtDeliverDate').val()),
                        //ProcissDet: iolist,
                        //ProcissJobDet: jobdetlist,
                        //Procissstk: stkdetlist
                    }
                    issuemaslist.push(obj);
                    var Obj = {
                        // productionordid:
                        processorder: $("#txtProcessOrderno").val(),
                        processordate: $("#txtDeliverDate").val(),//new Date($('#txtDeliverDate').val()),
                        processorid: Processorid,
                        processid: Processid,
                        remarks: $("#txtdescription").val(),
                        companyunitid: Companyunitid,
                        companyid: CompanyId,
                        ProcessorType: type,
                        OrderType: 'G',
                        Closed: 'N',
                        //OrderCumIssue: $("#txtIssueno").val(),
                        DelidateTime: $("#txtDeliverDate").val(),//new Date($('#txtDeliverDate').val()),
                        ComboIds: "",
                        DispLocType: 'S',
                        DispLoc: $('#ddlLocation').val(),
                        IssueLocType: 'O',
                        IssueLoc: $('#ddlProductionUnit').val(),
                        //Teamid:
                        StoreUnitId: $('#ddlStore').val(),
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
                        //moduletype: 'P',
                        ProdDet: iolist,
                        ProdJobDet: jobdetlist,
                        ////ProdStkDet: stkdetlist,
                        //ProdAddLess: AccList
                        ProcissMas: issuemaslist,
                        ProcissDet: issueiolist,
                        ProcissJobDet: issuejobdet,
                        Procissstk: stkdetlist

                    }
                    $("#btnAdd").attr("disabled", true);
                    LoadingSymb();
                    if (isvalid) {
                        $.ajax({
                            url: "/GeneralProcessOrder/IssueAdd",
                            data: JSON.stringify(Obj),
                            type: "POST",
                            contentType: "application/json;charset=utf-8",
                            dataType: "json",
                            success: function (result) {
                                debugger;
                                if (result.Value == true) {
                                    AddUserEntryLog('Process', 'General Process Order', 'ADD', $("#txtProcessOrderno").val());
                                    //alert('Data Saved Successfully');
                                    //window.location.href = "/GeneralProcessOrder/GeneralProcessOrderIndex";
                                    var msg = 'Data Saved Successfully...';
                                    var flg = 1;
                                    var mod = 0;
                                    var url = "/GeneralProcessOrder/GeneralProcessOrderIndex";
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


            });



        }
    });







    //if (OPlist.length > 0) {
    //    for (var r = 0; r < OPlist.length; r++) {
    //        var det = {
    //            // productionorddetid:
    //            //  productionordid:
    //            itemid: OPlist[r].Itemid,
    //            colorid: OPlist[r].Colorid,
    //            sizeid: OPlist[r].Sizeid,
    //            inp_op: 'O',
    //            order_output_qty: OPlist[r].Qty,
    //            issued_qty: 0.00,
    //            rate: OPlist[r].Rate,
    //            received_qty: 0.00,//OpItmList[r].ordqty,
    //            Return_Qty: 0.00,
    //            Damage_qty: 0.00,
    //            Cancel_Qty: 0.00,
    //            IN_OUT_UOMID: OPlist[r].opuomid,
    //            //Returnable_Qty:0.00,
    //            //Inp_CancelQty:
    //            //Markup_Rate:
    //            //Markup_Value:
    //            PlannedSizeID: OPlist[r].Sizeid,
    //            IssSizeid: OPlist[r].IssSizeid,
    //            OrdSecQty: OPlist[r].SecQty,
    //            ItemRemarks: $("#txtItemRemarks").val(),
    //            Loss_Qty: 0.00,
    //            //IN_OUT_UOMID:
    //            //IssueSizeID:
    //            ReqDate: $("#txtDeliverDate").val(),//new Date($('#txtDeliverDate').val()),
    //            //Loop_Len:
    //            //Gauge:

    //        }
    //        iolist.push(det);
    //    }
    //}


    //if (IPlist.length > 0) {
    //    for (var r = 0; r < IPlist.length; r++) {
    //        var det = {
    //            // productionorddetid:
    //            //  productionordid:
    //            itemid: IPlist[r].Itemid,
    //            colorid: IPlist[r].Colorid,
    //            sizeid: IPlist[r].Sizeid,
    //            inp_op: 'I',
    //            order_output_qty: IPlist[r].Qty,
    //            issued_qty: IPlist[r].Qty,
    //            rate: IPlist[r].Rate,
    //            received_qty: 0.00,
    //            Return_Qty: 0.00,
    //            Damage_qty: 0.00,
    //            Cancel_Qty: 0.00,
    //            IN_OUT_UOMID: IPlist[r].ipuomid,
    //            //Returnable_Qty:0.00,
    //            //Inp_CancelQty:
    //            //Markup_Rate:
    //            //Markup_Value:
    //            PlannedSizeID: IPlist[r].Sizeid,
    //            OrdSecQty: IPlist[r].SecQty,
    //            ItemRemarks: "",
    //            Loss_Qty: 0.00,
    //            //IN_OUT_UOMID:
    //            //IssueSizeID:
    //            ReqDate: $("#txtDeliverDate").val(),//new Date($('#txtDeliverDate').val()),
    //            //Loop_Len:
    //            //Gauge:

    //        }
    //        iolist.push(det);
    //    }
    //}

    //if (OPlist.length > 0) {
    //    for (var s = 0; s < OPlist.length; s++) {
    //        var objdet = {
    //            ProgQty: 0.00,
    //            OrderQty: OPlist[s].Qty,
    //            issued_qty: 0.00,
    //            received_qty: 0.00,
    //            Return_Qty: 0.00,
    //            Damage_qty: 0.00,
    //            Cancel_Qty: 0.00,
    //            //Job_ord_no: OPlist[s].jobordno,
    //            //ProdPrgNo: OPlist[s].prodpgmno,
    //            //Returnable_Qty:
    //            Closed: 'N',
    //            //Inp_CancelQty:
    //            OrdSecQty: OPlist[s].SecQty,
    //            Loss_Qty: 0.00,
    //            buy_ord_ship: 0,
    //            itemid: OPlist[s].Itemid,
    //            colorid: OPlist[s].Colorid,
    //            sizeid: OPlist[s].Sizeid,
    //            ipop: 'O'
    //        }
    //        jobdetlist.push(objdet);
    //    }
    //}

    //if (IPlist.length > 0) {
    //    for (var s = 0; s < IPlist.length; s++) {
    //        var objdet = {
    //            ProgQty: 0.00,
    //            OrderQty: IPlist[s].Qty,
    //            issued_qty: IPlist[s].Qty,
    //            received_qty: 0.00,
    //            Return_Qty: 0.00,
    //            Damage_qty: 0.00,
    //            Cancel_Qty: 0.00,
    //            // Job_ord_no: IPlist[s].jobordno,
    //            //ProdPrgNo: IPlist[s].prodpgmno,
    //            //Returnable_Qty:
    //            Closed: 'N',
    //            //Inp_CancelQty:
    //            OrdSecQty: IPlist[s].SecQty,
    //            Loss_Qty: 0.00,
    //            buy_ord_ship: 0,
    //            itemid: IPlist[s].Itemid,
    //            colorid: IPlist[s].Colorid,
    //            sizeid: IPlist[s].Sizeid,
    //            ipop: 'I'
    //        }
    //        jobdetlist.push(objdet);
    //    }
    //}

    //if (StklistSave.length > 0) {
    //    for (var j = 0; j < StklistSave.length; j++) {
    //        var objstk = {
    //            //ProductionOrdStockId:
    //            //    ProductionOrdJobid:
    //            Productionorder: $("#txtIssueno").val(),
    //            // jobordno: StklistSave[j].jobordno,
    //            ItemStockId: StklistSave[j].ItemStockId,
    //            IssueQty: StklistSave[j].IssueQty,
    //            ReturnQty: 0.00,
    //            LossQty: 0.00,
    //            Returnable_Qty: 0.00,
    //            Markup_Rate: 0.00,
    //            LotNo: '',
    //            Itemid: StklistSave[j].Itemid,
    //            Colorid: StklistSave[j].Colorid,
    //            Sizeid: StklistSave[j].Sizeid
    //        }
    //        stkdetlist.push(objstk);
    //    }
    //}

    //var issuemaslist = [];
    //var issueiolist = [];
    //var issuejobdet = [];
    //if (OPlist.length > 0) {
    //    for (var r = 0; r < OPlist.length; r++) {
    //        var det = {
    //            // ProcessIssueDetId:
    //            //  ProcessIssueId:
    //            itemid: OPlist[r].Itemid,
    //            colorid: OPlist[r].Colorid,
    //            sizeid: OPlist[r].Sizeid,
    //            IssueQty: OPlist[r].Qty,
    //            SecQty: OPlist[r].SecQty,// OpItmList[r].prgopqty,
    //            OutputUom: 0.00,
    //            OutputValue: 0.00,// OpItmList[r].rate,
    //            IPMarkup_Rate: 0.00,//OpItmList[r].ordqty,
    //            ip_op: 'O',

    //        }
    //        issueiolist.push(det);
    //    }
    //}

    //if (IPlist.length > 0) {
    //    for (var r = 0; r < IPlist.length; r++) {
    //        var det = {
    //            // ProcessIssueDetId:
    //            //  ProcessIssueId:
    //            itemid: IPlist[r].Itemid,
    //            colorid: IPlist[r].Colorid,
    //            sizeid: IPlist[r].Sizeid,
    //            IssueQty: IPlist[r].Qty,
    //            SecQty: IPlist[r].SecQty,// OpItmList[r].prgopqty,
    //            OutputUom: 0.00,
    //            OutputValue: 0.00,// OpItmList[r].rate,
    //            IPMarkup_Rate: 0.00,//OpItmList[r].ordqty,
    //            ip_op: 'I',

    //        }
    //        issueiolist.push(det);
    //    }
    //}

    //if (OPlist.length > 0) {
    //    for (var s = 0; s < OPlist.length; s++) {
    //        var objdet = {
    //            //ProcessIssueJobId
    //            //ProcessIssueId
    //            //ProcessIssueDetId
    //            //Job_ord_no: OPlist[s].jobordno,
    //            // ProdPrgNo: OPlist[s].prodpgmno,
    //            LastProcessid: 0,//IpSaveJobDetList[s].ordqty,
    //            IssueQty: OPlist[s].Qty,
    //            ReturnQty: 0.00,
    //            LossQty: 0.00,
    //            SecQty: OPlist[s].SecQty,
    //            itemid: OPlist[s].Itemid,
    //            colorid: OPlist[s].Colorid,
    //            sizeid: OPlist[s].Sizeid,
    //            ip_op: 'O'
    //        }
    //        issuejobdet.push(objdet);
    //    }
    //}


    //if (IPlist.length > 0) {
    //    for (var s = 0; s < IPlist.length; s++) {
    //        var objdet = {
    //            //ProcessIssueJobId
    //            //ProcessIssueId
    //            //ProcessIssueDetId
    //            //Job_ord_no: IPlist[s].jobordno,
    //            // ProdPrgNo: IPlist[s].prodpgmno,
    //            LastProcessid: 0,//IpSaveJobDetList[s].ordqty,
    //            IssueQty: IPlist[s].Qty,
    //            ReturnQty: 0.00,
    //            LossQty: 0.00,
    //            SecQty: IPlist[s].SecQty,
    //            itemid: IPlist[s].Itemid,
    //            colorid: IPlist[s].Colorid,
    //            sizeid: IPlist[s].Sizeid,
    //            ip_op: 'I'
    //        }
    //        issuejobdet.push(objdet);
    //    }
    //}

    //var obj = {
    //    //ProcessIssueId:
    //    ProcessIssueNo: $("#txtIssueno").val(),
    //    ProcessIssueDate: $("#txtDeliverDate").val(),// new Date($('#txtDeliverDate').val()),
    //    //ProcessOrdId: Processordid,
    //    Remarks: $("#txtdescription").val(),
    //    GatePassVehicle: "",
    //    //IssueStoreid:
    //    CreatedBy: Guserid,
    //    EWayNo: "",
    //    EWayDate: $("#txtDeliverDate").val(),//new Date($('#txtDeliverDate').val()),
    //    //ProcissDet: iolist,
    //    //ProcissJobDet: jobdetlist,
    //    //Procissstk: stkdetlist
    //}
    //issuemaslist.push(obj);
    //var Obj = {
    //    // productionordid:
    //    processorder: $("#txtProcessOrderno").val(),
    //    processordate: $("#txtDeliverDate").val(),//new Date($('#txtDeliverDate').val()),
    //    processorid: Processorid,
    //    processid: Processid,
    //    remarks: $("#txtdescription").val(),
    //    companyunitid: Companyunitid,
    //    companyid: CompanyId,
    //    ProcessorType: type,
    //    OrderType: 'G',
    //    Closed: 'N',
    //    //OrderCumIssue: $("#txtIssueno").val(),
    //    DelidateTime: $("#txtDeliverDate").val(),//new Date($('#txtDeliverDate').val()),
    //    ComboIds: "",
    //    DispLocType: 'S',
    //    DispLoc: $('#ddlLocation').val(),
    //    IssueLocType: 'O',
    //    IssueLoc: $('#ddlProductionUnit').val(),
    //    //Teamid:
    //    StoreUnitId: $('#ddlStore').val(),
    //    CreatedBy: Guserid,
    //    Vehicleno: $("#txtVehicleno").val(),
    //    //Phoneno:
    //    //contactperson:
    //    //amount:
    //    //taxamount:
    //    //saccode:
    //    //CGST:
    //    //SGST:
    //    //IGST:
    //    //TotCGST:
    //    //TotSGST:
    //    //TotIGST:
    //    //moduletype: 'P',
    //    ProdDet: iolist,
    //    ProdJobDet: jobdetlist,
    //    ////ProdStkDet: stkdetlist,
    //    //ProdAddLess: AccList
    //    ProcissMas: issuemaslist,
    //    ProcissDet: issueiolist,
    //    ProcissJobDet: issuejobdet,
    //    Procissstk: stkdetlist

    //}
    //$("#btnAdd").attr("disabled", true);
    //LoadingSymb();
    //if (isvalid) {
    //    $.ajax({
    //        url: "/GeneralProcessOrder/IssueAdd",
    //        data: JSON.stringify(Obj),
    //        type: "POST",
    //        contentType: "application/json;charset=utf-8",
    //        dataType: "json",
    //        success: function (result) {
    //            debugger;
    //            if (result.Value == true) {

    //                alert('Data Saved Successfully');
    //                window.location.href = "/GeneralProcessOrder/GeneralProcessOrderIndex";

    //            }
    //            else {

    //                window.location.href = "/Error/Index";

    //            }

    //        },
    //        error: function (errormessage) {
    //            alert(errormessage.responseText);
    //        }

    //    });













   // }
}


function Update() {
    debugger;
    $('#LoadingSpinner').show();
    chk();
    var type = $('input[name="optwrkord"]:checked').attr('value');
    // var ordtype = $('input[name="type"]:checked').attr('value');
    var distype = $('input[name="disploc"]:checked').attr('value');
    var iolist = [];
    var jobdetlist = [];
    var stkdetlist = [];

    var res = validate();
    if (res == false) {
        return false;
    }

    var isvalid = true;

    if (OPlist.length > 0) { }
    else {
        isvalid = false;
        //alert('Please Check Output Details..');
        var msg = 'Please Check Output Details...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        $('#LoadingSpinner').hide();
        return true;
    }

    if (IPlist.length > 0) { }
    else {
        isvalid = false;
        //alert('Please Check Input Details..');
        var msg = 'Please Check Input Details...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        $('#LoadingSpinner').hide();
        return true;
    }

    if (StklistSave.length > 0) { }
    else {
        isvalid = false;
        //alert('Please Check Stock Details..');
        var msg = 'Please Check Stock Details...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        $('#LoadingSpinner').hide();
        return true;
    }

    var storeunitid = $('#ddlStore').val();
    if (storeunitid == 0 && ValidateProcessStore == "True") {
        //alert('Please select Store..');
        var msg = 'Please select Store...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        $('#LoadingSpinner').hide();
        return true;
    }


    var totopqty = 0;
    $.each(OPlist, function (v) {
        totopqty = totopqty + parseFloat(OPlist[v].Qty);
    })


    var totopAllowper = 0;
    $.each(OPlist, function (v) {
        totopAllowper = totopAllowper + parseFloat(OPlist[v].AllowPer);
    })


    var totipqty = 0;
    $.each(IPlist, function (v) {
        totipqty = totipqty + parseFloat(IPlist[v].Qty);
    })


    var totstkqty = 0;
    $.each(StklistSave, function (v) {
        totstkqty = totstkqty + parseFloat(StklistSave[v].IssueQty);
    })

    if (parseFloat(totipqty).toFixed(3) == parseFloat(totstkqty).toFixed(3)) {

    }
    else {
        isvalid = false;
        //alert('Inpout Qty and Stock Qty are should be equal..');
        var msg = 'Inpout quantity and Stock quantity are should be equal...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        $('#LoadingSpinner').hide();
        return true;
    }

    var Process = $('#ddlProcess option:selected').text();
    if ((Process != 'CUTTING') && (Process != 'KNITTING')) {
        if (parseFloat(totipqty) == parseFloat(totopqty)) {

        }
        else {

            if (totopAllowper > 0) {

                if (parseFloat(totipqty).toFixed(3) > parseFloat(totopqty).toFixed(3)) {
                    isvalid = false;
                    //alert('Please check Input Qty and Output Qty..');
                    var msg = 'Please check Input quantity and Output quantity...';
                    var flg = 4;
                    var mod = 1;
                    var url = "";
                    AlartMessage(msg, flg, mod, url);
                    $('#LoadingSpinner').hide();
                    return true;
                }

            } else {

                isvalid = false;
                //alert('Input Qty and Output Qty are should be equal..');
                var msg = 'Input quantity and Output quantity are should be equal...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                $('#LoadingSpinner').hide();
                return true;
            }
        }
    }

    if (OPlist.length > 0) {
        for (var r = 0; r < OPlist.length; r++) {
            var det = {
                // productionorddetid:
                processordid: Masid,
                itemid: OPlist[r].Itemid,
                colorid: OPlist[r].Colorid,
                sizeid: OPlist[r].Sizeid,
                inp_op: 'O',
                order_output_qty: OPlist[r].Qty,
                issued_qty: 0.00,
                rate: OPlist[r].Rate,
                received_qty: 0.00,//OpItmList[r].ordqty,
                Return_Qty: 0.00,
                Damage_qty: 0.00,
                Cancel_Qty: 0.00,
                //Returnable_Qty:0.00,
                //Inp_CancelQty:
                //Markup_Rate:
                //Markup_Value:
                PlannedSizeID: OPlist[r].Sizeid,
                IssSizeid: OPlist[r].IssSizeid,
                OrdSecQty: OPlist[r].SecQty,
                ItemRemarks: $("#txtItemRemarks").val(),
                IN_OUT_UOMID: OPlist[r].opuomid,
                Loss_Qty: 0.00,
                AllowPer: OPlist[r].AllowPer,
                QtywithoutAllow: OPlist[r].QtywithoutAllow,
                //IN_OUT_UOMID:
                //IssueSizeID:
                ReqDate: $("#txtDeliverDate").val(),//new Date($('#txtDeliverDate').val()),
                //Loop_Len:
                //Gauge:

            }
            iolist.push(det);
        }
    }


    if (IPlist.length > 0) {
        for (var r = 0; r < IPlist.length; r++) {
            var det = {
                // productionorddetid:
                processordid: Masid,
                itemid: IPlist[r].Itemid,
                colorid: IPlist[r].Colorid,
                sizeid: IPlist[r].Sizeid,
                inp_op: 'I',
                order_output_qty: IPlist[r].Qty,
                issued_qty: IPlist[r].Qty,
                rate: IPlist[r].Rate,
                received_qty: 0.00,
                Return_Qty: 0.00,
                Damage_qty: 0.00,
                Cancel_Qty: 0.00,
                //Returnable_Qty:0.00,
                //Inp_CancelQty:
                //Markup_Rate:
                //Markup_Value:
                PlannedSizeID: IPlist[r].Sizeid,
                IN_OUT_UOMID: IPlist[r].ipuomid,
                OrdSecQty: IPlist[r].SecQty,
                ItemRemarks: "",
                Loss_Qty: 0.00,
                //IN_OUT_UOMID:
                //IssueSizeID:
                ReqDate: $("#txtDeliverDate").val(),//new Date($('#txtDeliverDate').val()),
                //Loop_Len:
                //Gauge:

            }
            iolist.push(det);
        }
    }

    if (OPlist.length > 0) {
        for (var s = 0; s < OPlist.length; s++) {
            var objdet = {
                ProcessnOrdid: Masid,
                ProgQty: 0.00,
                OrderQty: OPlist[s].Qty,
                issued_qty: 0.00,
                received_qty: 0.00,
                Return_Qty: 0.00,
                Damage_qty: 0.00,
                Cancel_Qty: 0.00,
                //Job_ord_no: OPlist[s].jobordno,
                //ProdPrgNo: OPlist[s].prodpgmno,
                //Returnable_Qty:
                Closed: 'N',
                //Inp_CancelQty:
                OrdSecQty: OPlist[s].SecQty,
                Loss_Qty: 0.00,
                buy_ord_ship: 0,
                itemid: OPlist[s].Itemid,
                colorid: OPlist[s].Colorid,
                sizeid: OPlist[s].Sizeid,
                ipop: 'O'
            }
            jobdetlist.push(objdet);
        }
    }

    if (IPlist.length > 0) {
        for (var s = 0; s < IPlist.length; s++) {
            var objdet = {
                ProcessnOrdid: Masid,
                ProgQty: 0.00,
                OrderQty: IPlist[s].Qty,
                issued_qty: IPlist[s].Qty,
                received_qty: 0.00,
                Return_Qty: 0.00,
                Damage_qty: 0.00,
                Cancel_Qty: 0.00,
                // Job_ord_no: IPlist[s].jobordno,
                //ProdPrgNo: IPlist[s].prodpgmno,
                //Returnable_Qty:
                Closed: 'N',
                //Inp_CancelQty:
                OrdSecQty: IPlist[s].SecQty,
                Loss_Qty: 0.00,
                buy_ord_ship: 0,
                itemid: IPlist[s].Itemid,
                colorid: IPlist[s].Colorid,
                sizeid: IPlist[s].Sizeid,
                ipop: 'I'
            }
            jobdetlist.push(objdet);
        }
    }

    if (StklistSave.length > 0) {
        for (var j = 0; j < StklistSave.length; j++) {
            var objstk = {
                ProcessIssueId: $("#txtIssueId").val(),
                ProcessIssueNo: $("#txtIssueNo").val(),
                // jobordno: StklistSave[j].jobordno,
                ItemStockId: StklistSave[j].ItemStockId,
                IssueQty: StklistSave[j].IssueQty,
                ReturnQty: 0.00,
                LossQty: 0.00,
                Returnable_Qty: 0.00,
                Markup_Rate: 0.00,
                LotNo: '',
                Itemid: StklistSave[j].Itemid,
                Colorid: StklistSave[j].Colorid,
                Sizeid: StklistSave[j].Sizeid
            }
            stkdetlist.push(objstk);
        }
    }

    var issuemaslist = [];
    var issueiolist = [];
    var issuejobdet = [];
    if (OPlist.length > 0) {
        for (var r = 0; r < OPlist.length; r++) {
            var det = {
                // ProcessIssueDetId:
                ProcessIssueId: $("#txtIssueId").val(),
                itemid: OPlist[r].Itemid,
                colorid: OPlist[r].Colorid,
                sizeid: OPlist[r].Sizeid,
                IssueQty: OPlist[r].Qty,
                SecQty: OPlist[r].SecQty,
                OutputUom: 0.00,
                OutputValue: 0.00,// OpItmList[r].rate,
                IPMarkup_Rate: 0.00,//OpItmList[r].ordqty,
                ip_op: 'O',

            }
            issueiolist.push(det);
        }
    }

    if (IPlist.length > 0) {
        for (var r = 0; r < IPlist.length; r++) {
            var det = {
                // ProcessIssueDetId:
                ProcessIssueId: $("#txtIssueId").val(),
                itemid: IPlist[r].Itemid,
                colorid: IPlist[r].Colorid,
                sizeid: IPlist[r].Sizeid,
                IssueQty: IPlist[r].Qty,
                SecQty: IPlist[r].SecQty,
                OutputUom: 0.00,
                OutputValue: 0.00,// OpItmList[r].rate,
                IPMarkup_Rate: 0.00,//OpItmList[r].ordqty,
                ip_op: 'I',

            }
            issueiolist.push(det);
        }
    }

    if (OPlist.length > 0) {
        for (var s = 0; s < OPlist.length; s++) {
            var objdet = {
                //ProcessIssueJobId
                ProcessIssueId: $("#txtIssueId").val(),
                //ProcessIssueDetId
                //Job_ord_no: OPlist[s].jobordno,
                // ProdPrgNo: OPlist[s].prodpgmno,
                LastProcessid: 0,//IpSaveJobDetList[s].ordqty,
                IssueQty: OPlist[s].Qty,
                ReturnQty: 0.00,
                LossQty: 0.00,
                SecQty: OPlist[s].SecQty,
                itemid: OPlist[s].Itemid,
                colorid: OPlist[s].Colorid,
                sizeid: OPlist[s].Sizeid,
                ip_op: 'O'
            }
            issuejobdet.push(objdet);
        }
    }


    if (IPlist.length > 0) {
        for (var s = 0; s < IPlist.length; s++) {
            var objdet = {
                //ProcessIssueJobId
                ProcessIssueId: $("#txtIssueId").val(),
                //ProcessIssueDetId
                //Job_ord_no: IPlist[s].jobordno,
                // ProdPrgNo: IPlist[s].prodpgmno,
                LastProcessid: 0,//IpSaveJobDetList[s].ordqty,
                IssueQty: IPlist[s].Qty,
                ReturnQty: 0.00,
                LossQty: 0.00,
                SecQty: IPlist[s].SecQty,
                itemid: IPlist[s].Itemid,
                colorid: IPlist[s].Colorid,
                sizeid: IPlist[s].Sizeid,
                ip_op: 'I'
            }
            issuejobdet.push(objdet);
        }
    }

    var obj = {
        ProcessIssueId: $("#txtIssueId").val(),
        ProcessIssueNo: $("#txtIssueno").val(),
        ProcessIssueDate: $("#txtDeliverDate").val(),//new Date($('#txtDeliverDate').val()),
        ProcessOrdId: Masid,
        Remarks: $("#txtdescription").val(),
        GatePassVehicle: "",
        //IssueStoreid:
        CreatedBy: Guserid,
        EWayNo: "",
        EWayDate: $("#txtDeliverDate").val(),// new Date($('#txtDeliverDate').val()),
        //ProcissDet: iolist,
        //ProcissJobDet: jobdetlist,
        //Procissstk: stkdetlist
    }
    issuemaslist.push(obj);
    var Obj = {
        processordid: Masid,
        processorder: $("#txtProcessOrderno").val(),
        processordate: $("#txtDeliverDate").val(),//new Date($('#txtDeliverDate').val()),
        processorid: Processorid,
        processid: Processid,
        remarks: $("#txtdescription").val(),
        companyunitid: Companyunitid,
        companyid: CompanyId,
        ProcessorType: type,
        OrderType: 'G',
        Closed: 'N',
        //OrderCumIssue: $("#txtIssueno").val(),
        DelidateTime: $("#txtDeliverDate").val(),//new Date($('#txtDeliverDate').val()),
        ComboIds: "",
        DispLocType: 'S',
        DispLoc: $('#ddlLocation').val(),
        IssueLocType: 'O',
        IssueLoc: $('#ddlProductionUnit').val(),
        //Teamid:
        StoreUnitId: $('#ddlStore').val(),
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
        //moduletype: 'P',
        ProdDet: iolist,
        ProdJobDet: jobdetlist,
        ////ProdStkDet: stkdetlist,
        //ProdAddLess: AccList
        ProcissMas: issuemaslist,
        ProcissDet: issueiolist,
        ProcissJobDet: issuejobdet,
        Procissstk: stkdetlist

    }

    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();

    if (isvalid) {
        $.ajax({
            url: "/GeneralProcessOrder/IssueUpdate",
            data: JSON.stringify(Obj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                debugger;
                $('#LoadingSpinner').hide();
                if (result.Value == true) {
                    AddUserEntryLog('Process', 'General Process Order', 'UPDATE', $("#txtProcessOrderno").val());
                    //alert('Data Updated Successfully');
                    //window.location.href = "/GeneralProcessOrder/GeneralProcessOrderIndex";
                    var msg = 'Data Updated Successfully...';
                    var flg = 1;
                    var mod = 0;
                    var url = "/GeneralProcessOrder/GeneralProcessOrderIndex";
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



function Delete() {
    debugger;
    $('#LoadingSpinner').show();
    chk();
    var type = $('input[name="optwrkord"]:checked').attr('value');
    // var ordtype = $('input[name="type"]:checked').attr('value');
    var distype = $('input[name="disploc"]:checked').attr('value');
    var iolist = [];
    var jobdetlist = [];
    var stkdetlist = [];
    if (OPlist.length > 0) {
        for (var r = 0; r < OPlist.length; r++) {
            var det = {
                // productionorddetid:
                processordid: Masid,
                itemid: OPlist[r].Itemid,
                colorid: OPlist[r].Colorid,
                sizeid: OPlist[r].Sizeid,
                inp_op: 'O',
                order_output_qty: OPlist[r].Qty,
                issued_qty: 0.00,
                rate: OPlist[r].Rate,
                received_qty: 0.00,//OpItmList[r].ordqty,
                Return_Qty: 0.00,
                Damage_qty: 0.00,
                Cancel_Qty: 0.00,
                //Returnable_Qty:0.00,
                //Inp_CancelQty:
                //Markup_Rate:
                //Markup_Value:
                PlannedSizeID: OPlist[r].IssSizeid,
                OrdSecQty: 0.00,
                ItemRemarks: $("#txtItemRemarks").val(),
                Loss_Qty: 0.00,
                AllowPer: OPlist[r].AllowPer,
                QtywithoutAllow: OPlist[r].QtywithoutAllow,
                //IN_OUT_UOMID:
                //IssueSizeID:
                ReqDate: $("#txtDeliverDate").val(),//new Date($('#txtDeliverDate').val()),
                //Loop_Len:
                //Gauge:

            }
            iolist.push(det);
        }
    }


    if (IPlist.length > 0) {
        for (var r = 0; r < IPlist.length; r++) {
            var det = {
                // productionorddetid:
                processordid: Masid,
                itemid: IPlist[r].Itemid,
                colorid: IPlist[r].Colorid,
                sizeid: IPlist[r].Sizeid,
                inp_op: 'I',
                order_output_qty: IPlist[r].Qty,
                issued_qty: IPlist[r].Qty,
                rate: IPlist[r].Rate,
                received_qty: 0.00,
                Return_Qty: 0.00,
                Damage_qty: 0.00,
                Cancel_Qty: 0.00,
                //Returnable_Qty:0.00,
                //Inp_CancelQty:
                //Markup_Rate:
                //Markup_Value:
                PlannedSizeID: IPlist[r].IssSizeid,
                OrdSecQty: 0.00,
                ItemRemarks: "",
                Loss_Qty: 0.00,
                //IN_OUT_UOMID:
                //IssueSizeID:
                ReqDate: $("#txtDeliverDate").val(),//new Date($('#txtDeliverDate').val()),
                //Loop_Len:
                //Gauge:

            }
            iolist.push(det);
        }
    }

    if (OPlist.length > 0) {
        for (var s = 0; s < OPlist.length; s++) {
            var objdet = {
                ProcessnOrdid: Masid,
                ProgQty: 0.00,
                OrderQty: OPlist[s].Qty,
                issued_qty: 0.00,
                received_qty: 0.00,
                Return_Qty: 0.00,
                Damage_qty: 0.00,
                Cancel_Qty: 0.00,
                //Job_ord_no: OPlist[s].jobordno,
                //ProdPrgNo: OPlist[s].prodpgmno,
                //Returnable_Qty:
                Closed: 'N',
                //Inp_CancelQty:
                OrdSecQty: 0.00,
                Loss_Qty: 0.00,
                buy_ord_ship: 0,
                itemid: OPlist[s].Itemid,
                colorid: OPlist[s].Colorid,
                sizeid: OPlist[s].Sizeid,
                ipop: 'O'
            }
            jobdetlist.push(objdet);
        }
    }

    if (IPlist.length > 0) {
        for (var s = 0; s < IPlist.length; s++) {
            var objdet = {
                ProcessnOrdid: Masid,
                ProgQty: 0.00,
                OrderQty: IPlist[s].Qty,
                issued_qty: IPlist[s].Qty,
                received_qty: 0.00,
                Return_Qty: 0.00,
                Damage_qty: 0.00,
                Cancel_Qty: 0.00,
                // Job_ord_no: IPlist[s].jobordno,
                //ProdPrgNo: IPlist[s].prodpgmno,
                //Returnable_Qty:
                Closed: 'N',
                //Inp_CancelQty:
                OrdSecQty: 0.00,
                Loss_Qty: 0.00,
                buy_ord_ship: 0,
                itemid: IPlist[s].Itemid,
                colorid: IPlist[s].Colorid,
                sizeid: IPlist[s].Sizeid,
                ipop: 'I'
            }
            jobdetlist.push(objdet);
        }
    }

    if (StklistSave.length > 0) {
        for (var j = 0; j < StklistSave.length; j++) {
            var objstk = {
                ProcessIssueId: $("#txtIssueId").val(),
                ProcessIssueNo: $("#txtIssueNo").val(),
                // jobordno: StklistSave[j].jobordno,
                ItemStockId: StklistSave[j].ItemStockId,
                IssueQty: StklistSave[j].IssueQty,
                ReturnQty: 0.00,
                LossQty: 0.00,
                Returnable_Qty: 0.00,
                Markup_Rate: 0.00,
                LotNo: '',
                Itemid: StklistSave[j].Itemid,
                Colorid: StklistSave[j].Colorid,
                Sizeid: StklistSave[j].Sizeid
            }
            stkdetlist.push(objstk);
        }
    }

    var issuemaslist = [];
    var issueiolist = [];
    var issuejobdet = [];
    if (OPlist.length > 0) {
        for (var r = 0; r < OPlist.length; r++) {
            var det = {
                // ProcessIssueDetId:
                ProcessIssueId: $("#txtIssueId").val(),
                itemid: OPlist[r].Itemid,
                colorid: OPlist[r].Colorid,
                sizeid: OPlist[r].Sizeid,
                IssueQty: OPlist[r].Qty,
                SecQty: 0,// OpItmList[r].prgopqty,
                OutputUom: 0.00,
                OutputValue: 0.00,// OpItmList[r].rate,
                IPMarkup_Rate: 0.00,//OpItmList[r].ordqty,
                ip_op: 'O',

            }
            issueiolist.push(det);
        }
    }

    if (IPlist.length > 0) {
        for (var r = 0; r < IPlist.length; r++) {
            var det = {
                // ProcessIssueDetId:
                ProcessIssueId: $("#txtIssueId").val(),
                itemid: IPlist[r].Itemid,
                colorid: IPlist[r].Colorid,
                sizeid: IPlist[r].Sizeid,
                IssueQty: IPlist[r].Qty,
                SecQty: 0,// OpItmList[r].prgopqty,
                OutputUom: 0.00,
                OutputValue: 0.00,// OpItmList[r].rate,
                IPMarkup_Rate: 0.00,//OpItmList[r].ordqty,
                ip_op: 'I',

            }
            issueiolist.push(det);
        }
    }

    if (OPlist.length > 0) {
        for (var s = 0; s < OPlist.length; s++) {
            var objdet = {
                //ProcessIssueJobId
                ProcessIssueId: $("#txtIssueId").val(),
                //ProcessIssueDetId
                //Job_ord_no: OPlist[s].jobordno,
                // ProdPrgNo: OPlist[s].prodpgmno,
                LastProcessid: 0,//IpSaveJobDetList[s].ordqty,
                IssueQty: OPlist[s].Qty,
                ReturnQty: 0.00,
                LossQty: 0.00,
                SecQty: 0.00,
                itemid: OPlist[s].Itemid,
                colorid: OPlist[s].Colorid,
                sizeid: OPlist[s].Sizeid,
                ip_op: 'O'
            }
            issuejobdet.push(objdet);
        }
    }


    if (IPlist.length > 0) {
        for (var s = 0; s < IPlist.length; s++) {
            var objdet = {
                //ProcessIssueJobId
                ProcessIssueId: $("#txtIssueId").val(),
                //ProcessIssueDetId
                //Job_ord_no: IPlist[s].jobordno,
                // ProdPrgNo: IPlist[s].prodpgmno,
                LastProcessid: 0,//IpSaveJobDetList[s].ordqty,
                IssueQty: IPlist[s].Qty,
                ReturnQty: 0.00,
                LossQty: 0.00,
                SecQty: 0.00,
                itemid: IPlist[s].Itemid,
                colorid: IPlist[s].Colorid,
                sizeid: IPlist[s].Sizeid,
                ip_op: 'I'
            }
            issuejobdet.push(objdet);
        }
    }

    var obj = {
        ProcessIssueId: $("#txtIssueId").val(),
        ProcessIssueNo: $("#txtIssueno").val(),
        ProcessIssueDate: $("#txtDeliverDate").val(),//new Date($('#txtDeliverDate').val()),
        //ProcessOrdId: Processordid,
        Remarks: $("#txtdescription").val(),
        GatePassVehicle: "",
        //IssueStoreid:
        CreatedBy: Guserid,
        EWayNo: "",
        EWayDate: $("#txtDeliverDate").val(),//new Date($('#txtDeliverDate').val()),
        //ProcissDet: iolist,
        //ProcissJobDet: jobdetlist,
        //Procissstk: stkdetlist
    }
    issuemaslist.push(obj);
    var Obj = {
        processordid: Masid,
        processorder: $("#txtProcessOrderno").val(),
        processordate: $("#txtDeliverDate").val(),//new Date($('#txtDeliverDate').val()),
        processorid: Processorid,
        processid: Processid,
        remarks: $("#txtdescription").val(),
        companyunitid: Companyunitid,
        companyid: CompanyId,
        ProcessorType: type,
        OrderType: 'G',
        Closed: 'N',
        //OrderCumIssue: $("#txtIssueno").val(),
        DelidateTime: $("#txtDeliverDate").val(),//new Date($('#txtDeliverDate').val()),
        ComboIds: "",
        DispLocType: 'S',
        DispLoc: 1,
        IssueLocType: 'O',
        IssueLoc: 1,
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
        //moduletype: 'P',
        ProdDet: iolist,
        ProdJobDet: jobdetlist,
        ////ProdStkDet: stkdetlist,
        //ProdAddLess: AccList
        ProcissMas: issuemaslist,
        ProcissDet: issueiolist,
        ProcissJobDet: issuejobdet,
        Procissstk: stkdetlist

    }

    $("#btnDel").attr("disabled", true);
    LoadingSymb();
    
    $.ajax({
        url: "/GeneralProcessOrder/DeleteIss",
        data: JSON.stringify(Obj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $('#LoadingSpinner').hide();
            if (result.Value == true) {
                AddUserEntryLog('Process', 'General Process Order', 'DELETE', $("#txtProcessOrderno").val());
                //alert('Data Deleted Successfully');
                //window.location.href = "/GeneralProcessOrder/GeneralProcessOrderIndex";
                var msg = 'Data Deleted Successfully...';
                var flg = 2;
                var mod = 0;
                var url = "/GeneralProcessOrder/GeneralProcessOrderIndex";
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

function LoadMaingrid() {
    debugger;

    var type = "";
    var proctype = $('input[name="proctype"]:checked').attr('value');



    if (proctype == 'P') {

        $('#Msupp').show();
        $("#Mwrkdiv").hide();
    }
    else if (proctype == 'W') {
        $('#Msupp').hide();
        $("#Mwrkdiv").show();
    }
  

    var prodid = 0;
    var clsd = "N";
    var ty = "G";// $('#ddlMType').val();
    var CompId = $('#ddlMCompany').val();

    if (CompId == null) {
        CompId = DCompid;
    } else {
        CompId = $('#ddlMCompany').val();
    }
   

    var prod = "";
    var pr = $('select#ddlMProcessOrderNo option:selected').val();

    if (pr == 0) {
        prod = "";
    }
    else {

        prod = $('select#ddlMProcessOrderNo option:selected').val();
    }
    var Unit = $('#ddlMUnit').val();
    if (Unit == null) {
        Unit = 0;
    }
    var prid = $('#ddlMSupplier').val();
    var process = $('#ddlMProcess').val();
    if (process == null) {
        process = 0;
    }
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    if (ChkComp) {
        prod = "";
        Unit = 0;
        process = 0;
    }

    var menufilter = CompId + ',' + clsd + ',' + type + ',' + proctype + ',' + prodid + ',' + prod + ',' + ty + ',' + prid + ',' + Unit + ',' + process + ',' + FDate + ',' + TDate ;
    localStorage.setItem('GeneralProcessOrderMainFilter', menufilter);


    $.ajax({
        url: "/GeneralProcessOrder/LoadMaingrid",
        data: JSON.stringify({ cmpid: CompId, closed: clsd, buyrsamp: type, processortype: proctype, prodordid: prodid, prodord: prod, type: ty, processorid: prid, unitid: Unit, processid: process, fromDate: FDate, todate: TDate }),
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
                         { title: "Productionordid", "visible": false },
                         { title: "Order No" },
                         { title: "Order Date" },
                         { title: "Company" },
                         { title: "Unit" },
                         { title: "Process" },
                         { title: "Processor" },
                         { title: "Type", "visible": false },
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


    var fill = localStorage.getItem('GeneralProcessOrderMainFilter');
    var fillobj = [];
    fillobj = fill.split(",");

    $('#txtFromDate').val(fillobj[10]);
    $('#txtToDate').val(fillobj[11]);

    if (fillobj[3] == 'P') {
        $('#MP').prop('checked', true);
    } else {
        $('#MW').prop('checked', true);
    }

    var proctype = $('input[name="proctype"]:checked').attr('value');

    if (proctype == 'P') {

        $('#Msupp').show();
        $("#Mwrkdiv").hide();
    }
    else if (proctype == 'W') {
        $('#Msupp').hide();
        $("#Mwrkdiv").show();
    }

    if (fillobj[5] == "undefined") {
        fillobj[5] = '';
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

    $.ajax({
        url: "/GeneralProcessOrder/LoadMaingrid",
        data: JSON.stringify({ cmpid: fillobj[0], closed: fillobj[1], buyrsamp: fillobj[2], processortype: fillobj[3], prodordid: fillobj[4], prodord: fillobj[5], type: fillobj[6], processorid: fillobj[7], unitid: fillobj[8], processid: fillobj[9], fromDate: fillobj[10], todate: fillobj[11] }),
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
                         { title: "Productionordid", "visible": false },
                         { title: "Order No" },
                         { title: "Order Date" },
                         { title: "Company" },
                         { title: "Unit" },
                         { title: "Process" },
                         { title: "Processor" },
                         { title: "Type", "visible": false },
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
    var type = "";
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
    //var ONo = $('select#ddlgrn option:selected').val();

    //if (ONo == 0) {
    //    GrnNo == "";
    //}
    //else {

    //    GrnNo = $('select#ddlgrn option:selected').val();
    //}

    var prod = "";
    var pr = $('select#ddlMProcessOrderNo option:selected').val();

    if (pr == 0) {
        prod = "";
    }
    else {

        prod = $('select#ddlMProcessOrderNo option:selected').val();
    }

    var prodid = 0;
    var clsd = "N";
    var ty = "G";// $('#ddlMType').val();
    //var CompId = $('#ddlMCompany').val();
    //if (CompId == null) {
    //    CompId = 0;
    //}
    //var prod = $('#ddlMProcessOrderNo').text();
    //if (prod == null || prod == 0) {
    //    prod = "";
    //}

    var CompId = $('#ddlMCompany').val();

    if (CompId == null) {
        CompId = DCompid;
    } else {
        CompId = $('#ddlMCompany').val();
    }

    var Unit = $('#ddlMUnit').val();
    if (Unit == null) {
        Unit = 0;
    }
    var prid = 0;
    var process = $('#ddlMProcess').val();
    if (process == null ||process ==undefined) {
        process = 0;
    }
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    $.ajax({
        url: "/GeneralProcessOrder/LoadMaingriddet",
        data: JSON.stringify({ cmpid: CompId, closed: clsd, buyrsamp: type, processortype: proctype, prodordid: prodid, prodord: prod, type: ty, processorid: prid, unitid: Unit, processid: process, fromDate: FDate, todate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;


            var obj = json.Value;
            if (json.Status == 'SUCCESS') {


                var data = json.Value;

                var procdet = {};
                var proc = [];

                var process = {};
                var procs = [];

                var Unit = {};
                var uni = [];

                var Supplier = {};
                var Supp = [];

                $.each(obj, function (i, el) {

                    if (!procdet[el.prodnord]) {
                        procdet[el.prodnord] = true;
                        proc.push(el);
                    }
                });

                $.each(obj, function (i, el) {

                    if (!process[el.processid]) {
                        process[el.processid] = true;
                        procs.push(el);
                    }
                });

                $.each(obj, function (i, el) {

                    if (!Unit[el.cmpunitid]) {
                        Unit[el.cmpunitid] = true;
                        uni.push(el);
                    }
                });

                $.each(obj, function (i, el) {

                    if (!Supplier[el.processorid]) {
                        Supplier[el.processorid] = true;
                        Supp.push(el);
                    }
                });


                if (ChkPOrdno || ChkComp || DtChk) {
                    $('#ddlMProcessOrderNo').empty();
                    $(ddlMProcessOrderNo).append($('<option/>').val('0').text('--Select ProdOrd--'));
                    $.each(proc, function () {
                        $(ddlMProcessOrderNo).append($('<option></option>').text(this.prodnord));
                    });
                }
                if (ChkProcess || ChkComp || DtChk) {
                    $('#ddlMProcess').empty();
                    $(ddlMProcess).append($('<option/>').val('0').text('--Select Process--'));
                    $.each(procs, function () {
                        $(ddlMProcess).append($('<option></option>').val(this.processid).text(this.process));
                    });
                }
                if (ChkUnit || ChkComp || DtChk) {
                    $('#ddlMUnit').empty();
                    $(ddlMUnit).append($('<option/>').val('0').text('--Select Unit--'));
                    $.each(data, function () {
                        $(ddlMUnit).append($('<option></option>').val(this.cmpunitid).text(this.cmpnyunit));
                    });
                }

                if (ChkSupplier || ChkComp || DtChk) {
                    var proctype = $('input[name="proctype"]:checked').attr('value');

                    if (proctype == 'P') {

                        $('#ddlMSupplier').empty();
                        $(ddlMSupplier).append($('<option/>').val('0').text('--Select Supplier--'));
                        $.each(data, function () {
                            $(ddlMSupplier).append($('<option></option>').val(this.processorid).text(this.processor));
                        });
                    }
                    else if (proctype == 'W') {
                        $('#ddlMwrkdiv').empty();
                        $(ddlMwrkdiv).append($('<option/>').val('0').text('--Select WorkDiv--'));
                        $.each(data, function () {
                            $(ddlMwrkdiv).append($('<option></option>').val(this.processorid).text(this.processor));
                        });
                    }
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

     ChkProcess = true;
     ChkPOrdno = true;
     DtChk = false;
     ChkSupplier = true;
     ChkUnit = true;
     ChkComp = true;

    LoadMaingrid();
}

function PMainlist() {
    $('#tblmaindetails').DataTable().destroy();

    ChkProcess = false;
    ChkPOrdno = true;
    DtChk = false;
    ChkSupplier = false;
    ChkUnit = false;
    ChkComp = false;

    LoadMaingrid();
}

function OMainlist() {
    $('#tblmaindetails').DataTable().destroy();

    ChkProcess = true;
    ChkPOrdno = false;
    DtChk = false;
    ChkSupplier = false;
    ChkUnit = false;
    ChkComp = false;

    LoadMaingrid();
}

function UMainlist() {
    $('#tblmaindetails').DataTable().destroy();

    ChkProcess = true;
    ChkPOrdno = true;
    DtChk = false;
    ChkSupplier = true;
    ChkUnit = false;
    ChkComp = false;

    LoadMaingrid();
}
function SPMainlist() {
    $('#tblmaindetails').DataTable().destroy();

    ChkProcess = true;
    ChkPOrdno = true;
    DtChk = false;
    ChkSupplier = false;
    ChkUnit = true;
    ChkComp = false;

    LoadMaingrid();
}




function getbyID(id) {
    debugger;
    Masid = id;
    var type = "";
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
    //var ONo = $('select#ddlgrn option:selected').val();

    //if (ONo == 0) {
    //    GrnNo == "";
    //}
    //else {

    //    GrnNo = $('select#ddlgrn option:selected').val();
    //}

    //var JobNo = "";
    //var RNo = $('select#ddljobno option:selected').val();

    //if (RNo == 0) {
    //    JobNo == "";
    //}
    //else {

    //    JobNo = $('select#ddljobno option:selected').val();
    //}

    var prodid = id;
    var clsd = "N";
    var ty = "G";// $('#ddlMType').val();
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
    //var strunit = 1;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    $.ajax({
        url: "/GeneralProcessOrder/LoadMaingriddet",
        data: JSON.stringify({ cmpid: CompId, closed: clsd, buyrsamp: type, processortype: proctype, prodordid: prodid, prodord: prod, type: ty, processorid: prid, unitid: Unit, processid: process, fromDate: FDate, todate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            $('#myModal').show();
            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnDel').hide();
            $('#btnAdd').hide();
            var obj = json.Value;

            $('#txtDeliDate').val(moment(obj[0].delidate).format("DD/MM/YYYY"));
            $('#txtOrderDate').val(moment(obj[0].proddate).format("DD/MM/YYYY"));
            $('#ddlUnit').val(obj[0].cmpunitid);
            $('#ddlProcess').val(obj[0].processid);
            $('#ddlCompany').val(obj[0].cmpid);
            $('#ddlStore').val(obj[0].StoreUnitId);
            var protype = $('input[name="proctype"]:checked').attr('value');
            if (protype == 'P') {

                $('#supp').show();
                $("#wrkdiv").hide();
                $('#rdproc').prop('checked', true);
                $('#ddlSupplier').val(obj[0].processorid);
            }
            else if (protype == 'W') {
                $('#supp').hide();
                $("#wrkdiv").show();
                $('#rdwrk').prop('checked', true);
                $('#ddlwrkdiv').val(obj[0].processorid);
            }
            
            $('#txtProcessOrderno').val(obj[0].prodnord);
            $('#txtdescription').val(obj[0].remarks);

            $('#txtVehicleno').val(obj[0].Vehicleno);
            $("#ddlStore").attr("disabled", true);

            CompanyId = obj[0].cmpid;
            ProductionOrderno = obj[0].prodnord;
            Companyunitid = obj[0].cmpunitid;
            var processordid = obj[0].productionordid;
            Processid = obj[0].processid;
            Processorid = obj[0].processorid;
            LoadIssueNo();
            LoadEditOutputItmDet();
            LoadEditInputItmDet();
            //LoadEditOutputJobDet();
            //LoadEditInputJobDet();
            LoadEditInputStkdet(processordid);

            var DType = obj[0].DispatchLocType;

            if (DType == "F") {
                $('#OptSelf').prop('checked', true);
                editmasunitstore = obj[0]["DispatchLocId"];
            } else if (DType == "U") {
                $('#OptUnit').prop('checked', true);
                editmasunitstore = obj[0]["DispatchLocId"];
            } else if (DType == "S") {
            } else if (DType == "T") {
                $('#OptSup').prop('checked', true);
                editmasunitstore = obj[0]["DispatchLocId"];
            }
            if (DType == "S") {
                $('#OptStore').prop('checked', true);
                editmasunitstore = obj[0]["DispatchLocId"];
                LoadEmployeeStoreunit();
            }

            LoadLocationEdit();
            CheckAlloted();

            //editmasunitstore = obj[0]["StoreUnitId"];
            //LoadEmployeeStoreunit();

        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}



function getDeleteID(id) {
    debugger;
    Masid = id;
    var type = "";
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
    //var ONo = $('select#ddlgrn option:selected').val();

    //if (ONo == 0) {
    //    GrnNo == "";
    //}
    //else {

    //    GrnNo = $('select#ddlgrn option:selected').val();
    //}

    //var JobNo = "";
    //var RNo = $('select#ddljobno option:selected').val();

    //if (RNo == 0) {
    //    JobNo == "";
    //}
    //else {

    //    JobNo = $('select#ddljobno option:selected').val();
    //}

    var prodid = id;
    var clsd = "N";
    var ty = "G";// $('#ddlMType').val();
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
    var strunit = 1;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    $.ajax({
        url: "/GeneralProcessOrder/LoadMaingriddet",
        data: JSON.stringify({ cmpid: CompId, closed: clsd, buyrsamp: type, processortype: proctype, prodordid: prodid, prodord: prod, type: ty, processorid: prid, unitid: Unit, processid: process, fromDate: FDate, todate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            $('#myModal').show();
            $('#myModal').modal('show');
            $('#btnUpdate').hide();
            $('#btnDel').show();
            $('#btnAdd').hide();
            var obj = json.Value;

            $('#txtDeliDate').val(moment(obj[0].delidate).format("DD/MM/YYYY"));
            $('#txtOrderDate').val(moment(obj[0].proddate).format("DD/MM/YYYY"));
            $('#ddlUnit').val(obj[0].cmpunitid);
            $('#ddlProcess').val(obj[0].processid);
            $('#ddlCompany').val(obj[0].cmpid);
            $('#ddlStore').val(obj[0].StoreUnitId);
            var protype = $('input[name="optwrkord"]:checked').attr('value');
            if (protype == 'P') {

                $('#supp').show();
                $("#wrkdiv").hide();
            }
            else if (protype == 'W') {
                $('#supp').hide();
                $("#wrkdiv").show();
            }
            $('#ddlSupplier').val(obj[0].processorid);
            $('#txtProcessOrderno').val(obj[0].prodnord);
            $('#txtdescription').val(obj[0].remarks);
            CompanyId = obj[0].cmpid;
            ProductionOrderno = obj[0].prodnord;
            Companyunitid = obj[0].cmpunitid;
            var processordid = obj[0].productionordid;
            Processid = obj[0].processid;
            Processorid = obj[0].processorid;
            LoadIssueNo();
            LoadEditOutputItmDet();
            LoadEditInputItmDet();
            //LoadEditOutputJobDet();
            //LoadEditInputJobDet();
            LoadEditInputStkdet(processordid);
            CheckAlloted();


        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadEditOutputItmDet() {
    debugger;
    Masid;
    $.ajax({
        url: "/GeneralProcessOrder/LoadEditOutputItmgrid",
        data: JSON.stringify({ prodid: Masid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            Olist = result.Value;


            //opItmid = OpItmList[0].itmid;
            //OpClrid = OpItmList[0].clrid;
            //OpSizeid = OpItmList[0].sizeid;

            for (var t = 0; t < Olist.length; t++) {
                var obj = {
                    Item: Olist[t].itm,// $("#ddlItem option:selected").text(),
                    Itemid: Olist[t].itmid,// $('#ddlItem').val(),
                    Color: Olist[t].clr,//$("#ddlColor option:selected").text(),
                    Colorid: Olist[t].clrid,// $('#ddlColor').val(),
                    Size: Olist[t].size,// $("#ddlSize option:selected").text(),
                    Sizeid: Olist[t].sizeid,//$('#ddlSize').val(),
                    IssSize: Olist[t].IssSize,// $("#ddlIssSize option:selected").text(),
                    IssSizeid: Olist[t].IssSizeid,//$('#ddlIssSize').val(),
                    Rate: Olist[t].rate,//$('#txtRate').val(),
                    Qty: Olist[t].prgopqty,// $('#txtQty').val(),
                    SecQty: Olist[t].SecQty,//Olist[t].itm,// $('#txtSecQty').val(),
                    opuom: Olist[t].opuom,// Olist[t].itm,// $('#txtInuom').val(),
                    SlNo: Olist[t].SlNo,
                    plansizeid: Olist[t].plansizeid,
                    //opuom: Olist[t].opuom,

                    opuom: Olist[t].opuom,
                    opuomid: Olist[t].opuomid,
                    AllowPer: Olist[t].AllowPer,
                    QtywithoutAllow: Olist[t].QtywithoutAllow,
                    detid: 0,
                }
                OPlist.push(obj);
            }
            loadIpTable(OPlist);
        }

    });
}

function LoadEditInputItmDet() {
    debugger;
    Masid;
    $.ajax({
        url: "/GeneralProcessOrder/LoadEditInputItmgrid",
        data: JSON.stringify({ prodid: Masid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            Ilist = result.Value;


            //Itmid = IpItmList[0].itmid;
            //Colorid = IpItmList[0].clrid;
            //Sizeid = IpItmList[0].sizeid;
            for (var t = 0; t < Ilist.length; t++) {
                var obj = {
                    Item: Ilist[t].itm,// $("#ddlItem option:selected").text(),
                    Itemid: Ilist[t].itmid,// $('#ddlItem').val(),
                    Color: Ilist[t].clr,//$("#ddlColor option:selected").text(),
                    Colorid: Ilist[t].clrid,// $('#ddlColor').val(),
                    Size: Ilist[t].size,// $("#ddlSize option:selected").text(),
                    Sizeid: Ilist[t].sizeid,//$('#ddlSize').val(),
                    IssSize: Ilist[t].size,// $("#ddlIssSize option:selected").text(),
                    IssSizeid: Ilist[t].sizeid,//$('#ddlIssSize').val(),
                    Rate: Ilist[t].rate,//$('#txtRate').val(),
                    Qty: Ilist[t].issqty,// $('#txtQty').val(),
                    SecQty: Ilist[t].SecQty,//Olist[t].itm,// $('#txtSecQty').val(),
                    ipuom: Ilist[t].ipuom,// Olist[t].itm,// $('#txtInuom').val(),
                    ipuomid: Ilist[t].ipuomid,
                    SlNo: Ilist[t].SlNo,
                    detid: 0,
                }
                IPlist.push(obj);
            }
            loadoutTable(IPlist);
        }

    });
}


function LoadEditInputStkdet(ordid) {
    debugger;
    $.ajax({
        url: "/GeneralProcessOrder/LoadStkDetEdit",
        data: JSON.stringify({ processordid: ordid }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            StklistSave = result.Value;
            LoadStkSavetab(StklistSave);
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
            $('#txtIssueno').val(obj[0].ProcessIssueNo);
        }
    });
}
function backtomain() {
    $('#myModal').hide();
    $('#myModal').modal('hide');
}

function LoadBillComp() {

    var BillType = $('input[name="optBill"]:checked').attr('value');
    if (BillType == "B") {
        LoadBuyerDDL("#ddlBCompany");
    } else if (BillType == "U") {
        LoadCompanyUnitDDL("#ddlBCompany");
    } else if (BillType == "C") {
        LoadCompanyDDL("#ddlBCompany");
    } else if (BillType == "S") {
        LoadSupplierDDL("#ddlBCompany");
    }
}

function LoadLocation() {
    debugger;
    var LocalType = $('input[name="DType"]:checked').attr('value');


    $('#txtLocaAdd').val('');

    if (LocalType == "U") {
        LoadCompanyUnitDDL("#ddlLocation");

    } else if (LocalType == "F") {
        LoadCompanyUnitDDL("#ddlLocation");
    } else if (LocalType == "T") {
        LoadSupplierDDL("#ddlLocation");
    } else if (LocalType == "S") {
       // LoadSupplierDDL("#ddlLocation");

        // LoadStoreUnitDDL("#ddlLocation");
        LoadEmployeeStoreunit();
    }
}

function LoadLocationEdit() {
    var LocalType = $('input[name="DType"]:checked').attr('value');
    $('#txtLocAdd').val('');

    if (LocalType == "U") {
        LoadCompanyUnitDDL("#ddlLocation");
        if (editmasunitstore > 0) {
            $('#ddlLocation').val(editmasunitstore).trigger('change');
        }

    } else if (LocalType == "F") {
        LoadCompanyUnitDDL("#ddlLocation");
        if (editmasunitstore > 0) {
            $('#ddlLocation').val(editmasunitstore).trigger('change');
        }

    } else if (LocalType == "S") {
        LoadEmployeeStoreunit();
    } else if (LocalType == "T") {
        LoadSupplierDDL("#ddlLocation");
        if (editmasunitstore > 0) {
            $('#ddlLocation').val(editmasunitstore).trigger('change');
        }
    }
}

function LoadLocAdd() {
    debugger;

    var LocalType = $('input[name="DType"]:checked').attr('value');

    if (LocalType == "F") {
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
    } else if (LocalType == "U") {
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
    } else if (LocalType == "T") {
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
    } else if (LocalType == "S") {
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


function GenProcOrdPrint(Id) {
    debugger;

    Repid = Id;
    $('#myModal2').modal('show');

    docname = "PROCESS ORDER";
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

    var ValidatePrcIssuLoc = $("#hdnValidateProcessIssueLoc").data('value');
    var LoginUnit = 0
    if (ValidatePrcIssuLoc == 'True') {
        LoginUnit = $("#hdnLoginUnitId").data('value');
    }

    window.open("../ReportInline/Process/GeneralProcessOrder/GeneralProcessOrderInlineReport.aspx?Masid=" + Repid + "&InpDet=" + p[0] + "&Ins=" + p[1] + "&Gatepass=" + p[2] + "&Isssecqty=" + p[3] + "&Lotdet=" + p[4] + "&Ordsecqty=" + p[5] + "&Rem=" + p[6] + "&Disploc=" + p[7] + "&Rate=" + p[8] + "&Amnt=" + p[9] + "&Issloc=" + p[10] + "&Millname=" + p[11] + "&Looplen=" + p[12] + "&Gauge=" + p[13] + "&Outno=" + p[14] + "&Plandet=" + p[15] + "&Opdet=" + p[16] + "&Ewaybill=" + p[17] + "&Ewaydate=" + p[18] + "&Refno=" + p[19] + "&Companyid=" + compid + "&Process=" + processname + "&LoginUnit=" + LoginUnit);

}
function backtomain() {
    $("#myModal2").hide();
    $("#myModal2").modal('hide');
}

function LoadrefNo() {

}

function Loadgrid() { }

function loaduom() {
    debugger;
    var itm = $('select#ddlIpItem option:selected').val();

    $.ajax({
        url: "/OpeningStock/GetUom",
        data: JSON.stringify({ itmid: itm }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            var obj = result.Value;
            if (obj.length > 0)
                $('#ddlIPUOM').val(obj[0].UnitId).trigger('change');
            //uomid = obj[0].UnitId;
        }

    });
}

function loadopUOM() {
    debugger;
    var itm = $('select#ddlItem option:selected').val();

    $.ajax({
        url: "/OpeningStock/GetUom",
        data: JSON.stringify({ itmid: itm }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            var obj = result.Value;
            if (obj.length > 0)
                $('#ddlOPUOM').val(obj[0].UnitId).trigger('change');
            //uomid = obj[0].UnitId;
        }

    });
}



function loadyarnwiseFabric(itmid, clid, szid) {
    debugger;
    $.ajax({
        url: "/FabricMaster/GetFabricdetfromyarn/",
        data: JSON.stringify({ itemid: itmid, colorid: clid, sizeid: szid }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;

            if (obj.length > 0) {

                var compdet = {};
                var comp = [];
                $.each(obj, function (i, el) {

                    if (!compdet[el.Fabricid]) {
                        compdet[el.Fabricid] = true;
                        comp.push(el);
                    }
                });
                $('#ddlItem').empty();
                $('#ddlItem').append($('<option/>').val('0').text('--Select Item--'));
                $.each(comp, function () {
                    $('#ddlItem').append($('<option></option>').val(this.Fabricid).text(this.Fabric));
                });
            }
            else {

                LoadItemDDL("#ddlItem");
            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}


function ApplyOutput() {
    debugger;

    if (IPlist.length > 0) {
        OPlist = [];
        for (var i = 0; IPlist.length > i; i++) {


            var OpListObj = {
                Item: IPlist[i].Item,
                Itemid: IPlist[i].Itemid,
                Color: IPlist[i].Color,
                Colorid: IPlist[i].Colorid,
                Size: IPlist[i].Size,
                Sizeid: IPlist[i].Sizeid,
                IssSize: IPlist[i].Size,
                IssSizeid: IPlist[i].Sizeid,
                Rate: IPlist[i].Rate,
                Qty: IPlist[i].Qty,
                SecQty: IPlist[i].SecQty,
                opuom: IPlist[i].ipuom,
                opuomid: IPlist[i].ipuomid,
                PlannedSizeID: IPlist[i].PlannedSizeID,
                SlNo: i + 1,
                detid: 0,
                Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
            };

            OPlist.push(OpListObj);
        }

        loadIpTable(OPlist);

        fnClearOpControls();
    }




}

function MainModClose() {
    window.location.href = "/GeneralProcessOrder/GeneralProcessOrderIndex";
}


//Valdidation using jquery
function validate() {
    var isValid = true;

    if ($('#ddlProcess').val() == 0) {
        $('#ddlProcess').siblings(".select2-container").css('border', '1px solid red');
        $('#LoadingSpinner').hide();
        isValid = false;
    }
    else {
        $('#ddlProcess').siblings(".select2-container").css('border', '1px solid lightgrey');
    }

    //if ($('#ddlStore').val() == 0) {
    //    $('#ddlStore').siblings(".select2-container").css('border', '1px solid red');
    //    isValid = false;
    //}
    //else {
    //    $('#ddlStore').siblings(".select2-container").css('border', '1px solid lightgrey');
    //}

    if ($('#ddlUnit').val() == 0) {
        $('#ddlUnit').siblings(".select2-container").css('border', '1px solid red');
        $('#LoadingSpinner').hide();

        isValid = false;
    }
    else {
        $('#ddlUnit').siblings(".select2-container").css('border', '1px solid lightgrey');
    }

    var protype = $('input[name="optwrkord"]:checked').attr('value');
    if (protype == 'P') {

        if ($('#ddlSupplier').val() == 0) {
            $('#ddlSupplier').siblings(".select2-container").css('border', '1px solid red');
            $('#LoadingSpinner').hide();

            isValid = false;
        }
        else {
            $('#ddlSupplier').siblings(".select2-container").css('border', '1px solid lightgrey');
        }
    }
    else if (protype == 'W') {

        if ($('#ddlwrkdiv').val() == 0) {
            $('#ddlwrkdiv').siblings(".select2-container").css('border', '1px solid red');
            $('#LoadingSpinner').hide();

            isValid = false;
        }
        else {
            $('#ddlwrkdiv').siblings(".select2-container").css('border', '1px solid lightgrey');
        }
    }

    return isValid;
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

function CheckAlloted() {

    var Recpno = $('#txtProcessOrderno').val();

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