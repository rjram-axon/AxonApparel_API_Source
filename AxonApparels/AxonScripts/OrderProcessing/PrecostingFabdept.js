var precostmasid = 0;
var FabricList = [];
var YarnList = [];
var YarnDetList = [];
var ProcessList = [];
var ProcessDetList = [];
var fabricid = 0;
var fabricmasid = 0;
var yarnrowindex = -1;
var procrowindex = -1;
var Yarnmasid = 0;
var Processmasid = 0;
var yarnid = 0;
var yncountid = 0;
var yncolorid = 0;
var processid = 0;
var fslno = 0;
$(document).ready(function () {
    debugger;

    Guserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    Roleid = $("#hdnRoleid").data('value');
    superuser = $("#hdnusername").data('value');
    var qrStr = window.location.search;
    var spQrStr = qrStr.substring(1);
    var arrQrStr = new Array();
    var arr = spQrStr.split('?');


    for (var i = 0; i < arr.length; i++) {
        var queryvalue = arr[i].split('=');
    }

    StyleRowId = queryvalue[1];
    Mod = queryvalue[3];
    getDate();
   
    LoadColorDDL("#ddlColor");
    LoadYSizeDDL("#ddlCount");
    LoadProcessDDL("#dllProcess");
    LoadYarnDDL("#ddlYarnlist");
    getbyID(StyleRowId);

    $(document).ready(function () {
        $("#tblEntryCompItemdetails ").dataTable().find("tbody").on('click', 'tr', function () {
            index = (this.rowIndex) - 1;
        });
    });

    $(document).on('click', '.Greytype', function () {
        debugger;

        var table = $('#tblFabricdetails').DataTable();
        var slno = table.row($(this).parents('tr')).data()["FabSlno"];
        var PreCostFabDeptFabmasid = table.row($(this).parents('tr')).data()["PreCostFabDeptFabmasid"];
        // $('#tPAbody tr:eq(' + rowindex + ')').find('td:eq(1)').text(totalamnt);
        //if ($('#chkpfj').is(':checked')) {
        var val = $(this).is(":checked");
        if (val == true) {
            for (var f = 0; f < FabricList.length; f++) {
                if (FabricList[f].FabSlno == slno) {
                    FabricList[f].PurchaseType = 'G';
                   
                }
            }
        }
        else {
            for (var f = 0; f < FabricList.length; f++) {
                if (FabricList[f].FabSlno == slno) {
                    FabricList[f].PurchaseType = '';
                  
                }
            }
        }
        //LoadInnerGrid(MenuList);
        var table = $('#tblFabricdetails').DataTable();
        var data = table.rows().data();

        $('input[id=Greytype]').each(function (ig) {
            if (data[ig].FabSlno == slno && data[ig].PurchaseType == 'G') {
                var row = $(this).closest('tr');
                //row.find('#chkadd').val(data[ig].Apprate);
                row.find('#Greytype').prop("checked", true);
                row.find('#Finishtype').prop("checked", false);
                row.find('#Yarntype').prop("checked", false);
            }
        });
    });

    $(document).on('click', '.Finishtype', function () {
        debugger;

        var table = $('#tblFabricdetails').DataTable();
        var slno = table.row($(this).parents('tr')).data()["FabSlno"];
        var PreCostFabDeptFabmasid = table.row($(this).parents('tr')).data()["PreCostFabDeptFabmasid"];
        // $('#tPAbody tr:eq(' + rowindex + ')').find('td:eq(1)').text(totalamnt);
        //if ($('#chkpfj').is(':checked')) {
        var val = $(this).is(":checked");
        if (val == true) {
            for (var f = 0; f < FabricList.length; f++) {
                if (FabricList[f].FabSlno == slno) {
                    FabricList[f].PurchaseType = 'F';

                }
            }
        }
        else {
            for (var f = 0; f < FabricList.length; f++) {
                if (FabricList[f].FabSlno == slno) {
                    FabricList[f].PurchaseType = '';

                }
            }
        }
        //LoadInnerGrid(MenuList);
        var table = $('#tblFabricdetails').DataTable();
        var data = table.rows().data();

        $('input[id=Finishtype]').each(function (ig) {
            if (data[ig].FabSlno == slno && data[ig].PurchaseType == 'F') {
                var row = $(this).closest('tr');
                //row.find('#chkadd').val(data[ig].Apprate);
                row.find('#Greytype').prop("checked", false);
                row.find('#Finishtype').prop("checked", true);
                row.find('#Yarntype').prop("checked", false);
            }
        });
    });

    $(document).on('click', '.Yarntype', function () {
        debugger;

        var table = $('#tblFabricdetails').DataTable();
        var slno = table.row($(this).parents('tr')).data()["FabSlno"];
        var PreCostFabDeptFabmasid = table.row($(this).parents('tr')).data()["PreCostFabDeptFabmasid"];
        // $('#tPAbody tr:eq(' + rowindex + ')').find('td:eq(1)').text(totalamnt);
        //if ($('#chkpfj').is(':checked')) {
        var val = $(this).is(":checked");
        if (val == true) {
            for (var f = 0; f < FabricList.length; f++) {
                if (FabricList[f].FabSlno == slno) {
                    FabricList[f].PurchaseType = 'Y';

                }
            }
        }
        else {
            for (var f = 0; f < FabricList.length; f++) {
                if (FabricList[f].FabSlno == slno) {
                    FabricList[f].PurchaseType = '';
                     var yarnempty = [];
                     yarnempty = YarnList;

                     yarnempty = $.grep(yarnempty, function (v) {
                         return (v.FabSlno != slno);
                     });

                     YarnList = yarnempty;
                     YarnDetList = [];
                     loadYarnTable(YarnDetList);
                }
            }
        }
        //LoadInnerGrid(MenuList);
        var table = $('#tblFabricdetails').DataTable();
        var data = table.rows().data();

        $('input[id=Yarntype]').each(function (ig) {
            if (data[ig].FabSlno == slno && data[ig].PurchaseType == 'Y') {
                var row = $(this).closest('tr');
                //row.find('#chkadd').val(data[ig].Apprate);
                row.find('#Greytype').prop("checked", false);
                row.find('#Finishtype').prop("checked", false);
                row.find('#Yarntype').prop("checked", true);
            }
        });
    });

    $('#tblFabricdetails').on('click', 'tr', function (e) {

        debugger;
        var table = $('#tblFabricdetails').DataTable();
        var row = $(this).closest('tr');
        var data = $('#tblFabricdetails').dataTable().fnGetData(row);

        var table = $('#tblFabricdetails').DataTable();
        //fabricid = table.row($(this).parents('tr')).data()["Fabricid"];
        //fabricmasid = table.row($(this).parents('tr')).data()["PreCostFabDeptFabmasid"];
        //var gsm = table.row($(this).parents('tr')).data()["GSM"];
        //FabricId = table.row($(this).parents('tr')).data()["FabricID"];
        //Fabric = table.row($(this).parents('tr')).data()["FabricName"];
        fslno = data.FabSlno;
        fabricid = data.Fabricid;
        fabricmasid = data.PreCostFabDeptFabmasid;

        //fabricid = data.PrecostFabricmasid
     
        var yarnempty = [];
        yarnempty = YarnList;

        yarnempty = $.grep(yarnempty, function (v) {
            return (v.FabSlno == fslno);
        });

         YarnDetList = yarnempty;
         loadYarnTable(YarnDetList);

        var processempty = [];
        processempty = ProcessList;

        processempty = $.grep(processempty, function (v) {
            return (v.FabSlno == fslno);
        });

        ProcessDetList = processempty;
        loadProcessTable(ProcessDetList);
    });

    $('#btnyarnadd').click(function () {
        debugger;
        var leng = 0;

        var isAllValid = true;


        if ($('#ddlYarnlist').val() == "0") {

            $('#ddlYarnlist').siblings(".select2-container").css('border', '1px solid red');

            isAllValid = false;
        }
        else {

            $('#ddlYarnlist').siblings(".select2-container").css('border', '1px solid lightgrey');
        }



        if ($('#ddlCount').val() == "0") {
            isAllValid = false;

            $('#ddlCount').siblings(".select2-container").css('border', '1px solid red');

        }
        else {

            $('#ddlCount').siblings(".select2-container").css('border', '1px solid lightgrey');

        }
        if ($('#ddlColor').val() == "0") {
            isAllValid = false;

            $('#ddlColor').siblings(".select2-container").css('border', '1px solid red');

        }
        else {

            $('#ddlColor').siblings(".select2-container").css('border', '1px solid lightgrey');
        }

        if ($('#txtLoss').val() == "") {
            isAllValid = false;
            $('#txtLoss').css('border-color', 'Red');
        }
        else {
            $('#txtLoss').css('border-color', 'lightgrey');
        }

        
        var yn = $('#ddlYarnlist').val();
        var cn = $('#ddlCount').val();
        var cl = $('#ddlColor').val();
        
        $.each(YarnDetList, function () {
            if (this.Yarnid == yn && this.Countid == cn && this.Colorid == cl ) {
                alert("Details already added");
                isAllValid = false;
            }
        });

        $.each(FabricList, function () {
            if (this.FabSlno == fslno && this.PurchaseType != 'Y') {
                alert("This is not Yarn PurchaseType");
                isAllValid = false;
            }
        });

        if (isAllValid) {

            var yarnsListObj = {
                Yarn: $("#ddlYarnlist option:selected").text(),
                Yarnid: $('#ddlYarnlist').val(),
                Count: $("#ddlCount option:selected").text(),
                Countid: $('#ddlCount').val(),
                Color: $("#ddlColor option:selected").text(),
                Colorid: $('#ddlColor').val(),
                Percentage: $('#txtLoss').val(),
                PreCostFabDeptFabmasid: fabricmasid,
                Fabricid: fabricid,
                FabSlno:fslno,
                PreCostFabDeptYarnmasid: 0,
                Status: ['<img src="images/first.png" class="btnfabSave"><img src="images/delete.png" class="btnfabDelete"/>']
            };

            YarnList.push(yarnsListObj);
            var yarnempty = [];
            yarnempty = YarnList;

            yarnempty = $.grep(yarnempty, function (v) {
                return (v.FabSlno == fslno);
            });

            YarnDetList = yarnempty;
            loadYarnTable(YarnDetList);

            ClearyarnDll();

        }
    });

    $('#btnProcadd').click(function () {
        debugger;
        var leng = 0;

        var isAllValid = true;


        if ($('#dllProcess').val() == "0") {

            $('#dllProcess').siblings(".select2-container").css('border', '1px solid red');

            isAllValid = false;
        }
        else {

            $('#dllProcess').siblings(".select2-container").css('border', '1px solid lightgrey');
        }

        if ($('#txtprocessLoss').val() == "") {
            isAllValid = false;
            $('#txtprocessLoss').css('border-color', 'Red');
        }
        else {
            $('#txtprocessLoss').css('border-color', 'lightgrey');
        }


        var pr = $('#dllProcess').val();
       

        $.each(ProcessList, function () {
            if (this.Processid == pr && this.FabSlno == fslno) {
                alert("Process already added");
                isAllValid = false;
            }
        });

        if (isAllValid) {

            var procsListObj = {
                Process: $("#dllProcess option:selected").text(),
                Processid: $('#dllProcess').val(),
                LossPercentage: $('#txtprocessLoss').val(),
                PreCostFabDeptFabmasid: fabricmasid,
                Fabricid: fabricid,
                FabSlno:fslno,
                PreCostFabDeptProcmasid: 0,
                Status: ['<img src="images/first.png" class="btnfabSave"><img src="images/delete.png" class="btnfabDelete"/>']
            };

            ProcessList.push(procsListObj);

            var processempty = [];
            processempty = ProcessList;

            processempty = $.grep(processempty, function (v) {
                return (v.FabSlno == fslno);
            });

            ProcessDetList = processempty;
            loadProcessTable(ProcessDetList);
            ClearprocDll();

        }
    });

    $(document).on('click', '.btnyarnedit', function () {
        debugger;
        // Mode = 1;

        yarnrowindex = $(this).closest('tr').index();

        var currentro12 = YarnDetList.slice(yarnrowindex);

        $('#ddlYarnlist').val(currentro12[0]['Yarnid']).trigger('change');
        $('#ddlCount').val(currentro12[0]['Countid']).trigger('change');
        $('#ddlColor').val(currentro12[0]['Colorid']).trigger('change');
        $('#txtLoss').val(currentro12[0]['Percentage']);
        Yarnmasid = currentro12[0]['PreCostFabDeptYarnmasid'];
        yarnid = currentro12[0]['Yarnid'];
        yncountid = currentro12[0]['Countid'];
        yncolorid = currentro12[0]['Colorid'];
        //Itemid = currentro12[0]['Itemid'];
        //Colorid = currentro12[0]['Colorid'];
        //Sizeid = currentro12[0]['Sizeid'];

        $('#btnyarnadd').hide();
        $('#btnyarnupdate').show();
    });

    $('#btnyarnupdate').click(function () {
        debugger;

        var currentrowsel1 = YarnDetList.slice(yarnrowindex);

        var isAllValid = true;


        if ($('#ddlYarnlist').val() == "0") {

            $('#ddlYarnlist').siblings(".select2-container").css('border', '1px solid red');

            isAllValid = false;
        }
        else {

            $('#ddlYarnlist').siblings(".select2-container").css('border', '1px solid lightgrey');
        }



        if ($('#ddlCount').val() == "0") {
            isAllValid = false;

            $('#ddlCount').siblings(".select2-container").css('border', '1px solid red');

        }
        else {

            $('#ddlCount').siblings(".select2-container").css('border', '1px solid lightgrey');

        }
        if ($('#ddlColor').val() == "0") {
            isAllValid = false;

            $('#ddlColor').siblings(".select2-container").css('border', '1px solid red');

        }
        else {

            $('#ddlColor').siblings(".select2-container").css('border', '1px solid lightgrey');
        }

        if ($('#txtLoss').val() == "") {
            isAllValid = false;
            $('#txtLoss').css('border-color', 'Red');
        }
        else {
            $('#txtLoss').css('border-color', 'lightgrey');
        }


        var yn = $('#ddlYarnlist').val();
        var cn = $('#ddlCount').val();
        var cl = $('#ddlColor').val();

        //$.each(YarnDetList, function () {
        //    if (this.Yarnid == yn && this.Countid == cn && this.Colorid == cl) {
        //        alert("Details already added");
        //        isAllValid = false;
        //    }
        //});

        if (isAllValid) {
            var currentrowsel = YarnDetList.slice(yarnrowindex);

            currentrowsel[0]['Yarnid'] = $("#ddlYarnlist").val();
            currentrowsel[0]['Yarn'] = $("#ddlYarnlist option:selected").text();
            currentrowsel[0]['Countid'] = $("#ddlCount").val();
            currentrowsel[0]['Count'] = $("#ddlCount option:selected").text();
            currentrowsel[0]['Colorid'] = $("#ddlColor option:selected").val();
            currentrowsel[0]['Color'] = $("#ddlColor option:selected").text();
            currentrowsel[0]['Percentage'] = $("#txtLoss").val();
            //currentrowsel[0]['PreCostFabDeptYarnmasid'] = Yarnmasid;
            //currentrowsel[0]['PreCostFabDeptFabmasid'] = fabricmasid;
            //currentrowsel[0]['FabricId'] = fabricid; 


            
            //$.each(YarnList, function () {
            //    if (this.Yarnid == yarnid && this.Countid == yncountid && this.Colorid == yncolorid && this.FabricId == fabricid) {
            //        this.Yarnid = currentrowsel[0]['Yarnid'];
            //        this.Yarn = currentrowsel[0]['Yarn'];
            //        this.Countid = currentrowsel[0]['Countid'];
            //        this.Count = currentrowsel[0]['Count'];
            //        this.Colorid = currentrowsel[0]['Colorid'];
            //        this.Color = currentrowsel[0]['Color'];
            //        this.Percentage = parseFloat(currentrowsel[0]['Percentage']);
            //        }
            //});

            YarnDetList[yarnrowindex] = currentrowsel[0];

            loadYarnTable(YarnDetList);

            //YarnList.push(yarnsListObj);
            var yarnempty = [];
            yarnempty = YarnList;

            yarnempty = $.grep(yarnempty, function (v) {
                return (v.FabSlno != fslno);
            });

            YarnList = yarnempty;

            for (i = 0; YarnDetList.length > i; i++) {

                YarnList[YarnList.length] = (YarnDetList[i]);

            }

           // YarnList.push(YarnDetList);
            ClearyarnDll();

        };

    });


    $(document).on('click', '.btnProcedit', function () {
        debugger;
        // Mode = 1;

        procrowindex = $(this).closest('tr').index();

        var currentro12 = ProcessDetList.slice(procrowindex);

        $('#dllProcess').val(currentro12[0]['Processid']).trigger('change');
        $('#txtprocessLoss').val(currentro12[0]['LossPercentage']);
        Processmasid = currentro12[0]['PreCostFabDeptProcmasid'];
        processid = currentro12[0]['Processid'];
    
        $('#btnProcadd').hide();
        $('#btnProcupdate').show();
    });

    $('#btnProcupdate').click(function () {
        debugger;

        var currentrowsel1 = ProcessDetList.slice(procrowindex);

        var isAllValid = true;


        if ($('#dllProcess').val() == "0") {

            $('#dllProcess').siblings(".select2-container").css('border', '1px solid red');

            isAllValid = false;
        }
        else {

            $('#dllProcess').siblings(".select2-container").css('border', '1px solid lightgrey');
        }

        if ($('#txtprocessLoss').val() == "") {
            isAllValid = false;
            $('#txtprocessLoss').css('border-color', 'Red');
        }
        else {
            $('#txtprocessLoss').css('border-color', 'lightgrey');
        }


        var pr = $('#dllProcess').val();


        //$.each(ProcessList, function () {
        //    if (this.Processid == pr) {
        //        alert("Process already added");
        //        isAllValid = false;
        //    }
        //});

        if (isAllValid) {
            var currentrowsel = ProcessDetList.slice(procrowindex);

            currentrowsel[0]['Processid'] = $("#dllProcess").val();
            currentrowsel[0]['Process'] = $("#dllProcess option:selected").text();
            currentrowsel[0]['LossPercentage'] = $("#txtprocessLoss").val();
            //currentrowsel[0]['PreCostFabDeptProcessmasid'] = Processmasid;
            //currentrowsel[0]['Precostfabdeptfabmasid'] = fabricmasid;
            //currentrowsel[0]['FabricId'] = fabricid;

            //$.each(ProcessList, function () {
            //    if (this.Processid == processid && this.FabricId == fabricid) {
            //        this.Processid=currentrowsel[0]['Processid'];
            //        this.Process = currentrowsel[0]['Process'];
            //        this.LossPercentage = parseFloat(currentrowsel[0]['LossPercentage']);
            //    }
            //});

            ProcessDetList[procrowindex] = currentrowsel[0];

            loadProcessTable(ProcessDetList);

           // ProcessList.push(procsListObj);

            var processempty = [];
            processempty = ProcessList;

            processempty = $.grep(processempty, function (v) {
                return (v.FabSlno != fslno);
            });

            ProcessList = processempty;
            for (i = 0; ProcessDetList.length > i; i++) {

                ProcessList[ProcessList.length]=(ProcessDetList[i]);

            }
            ClearprocDll();

        };

    });

    $(document).on('click', '.btnyarnremove', function () {
        debugger;
        yarnrowindex = $(this).closest('tr').index();
        var currentrowsel = YarnDetList.slice(yarnrowindex);
        yarnid = currentrowsel[0]['Yarnid'];
        yncountid = currentrowsel[0]['Countid'];
        yncolorid = currentrowsel[0]['Colorid'];

        YarnDetList.splice(yarnrowindex, 1);
        document.getElementById("tblYarndetails").deleteRow(yarnrowindex + 1);
        var yarnempty = [];
        yarnempty = YarnList;

        yarnempty = $.grep(yarnempty, function (v) {
            return (v.FabSlno == fslno && v.Yarnid != yarnid && v.Countid != yncountid && v.Colorid != yncolorid);
        });

        YarnList = yarnempty;

    });

    $(document).on('click', '.btnProcremove', function () {
        debugger;
        procrowindex = $(this).closest('tr').index();
        var currentrowsel = ProcessDetList.slice(procrowindex);
        processid = currentrowsel[0]['Processid'];

        ProcessDetList.splice(procrowindex, 1);
        document.getElementById("tblProcessdetails").deleteRow(procrowindex + 1);
        var procempty = [];
        procempty = ProcessList;

        procempty = $.grep(procempty, function (v) {
            return (v.FabSlno == fslno && v.Processid != processid);
        });

        ProcessList = procempty;

    });

});
function loadFabricTable(fabricListObj) {
    debugger;
    // $('#tblcompdetails').DataTable().destroy();
    var inputcount = 0;
    $('#tblFabricdetails tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tblFabricdetails').DataTable().destroy();
    }
    $('#tblFabricdetails').empty();
   
    $('#tblFabricdetails').DataTable({
        //'bSortable': false,
        //'aTargets' : [ 7, 8 ],
        data: FabricList,
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
            { title: "PrecostFabDeptFabmasid", data: "PreCostFabDeptFabmasid", "visible": false },
            { title: "FabSlno", data: "FabSlno", "visible": false },
            { title: "FabricId", data: "Fabricid", "visible": false },
            { title: "Fabric", data: "Fabric" },
            { title: "GreyColorid", data: "GreyColorid", "visible": false },
            { title: "GreyColor", data: "GreyColor" },
            { title: "FabricColorid", data: "FabricColorid", "visible": false },
            { title: "FabricColor", data: "FabricColor" },
            { title: "GSM", data: "GSM" },
           // { title: "PurchaseType", data: "PurchaseType" },
             {
                 title: "PurchaseType G/F/Y", data: "PurchaseType",
                 render: function (data) {
                     return '<input type="checkbox" id="Greytype" class="editor-active Greytype"  style="width: 50px;text-align: center;"  value=' + data + '>' + '' + '<input type="checkbox" id="Finishtype" class="editor-active Finishtype"  style="width: 50px;text-align: center;"  value=' + data + '>' + '' + '<input type="checkbox" id="Yarntype" class="editor-active Yarntype"  style="width: 50px;text-align: center;"  value=' + data + '>';
                 },
             }
               //{
               //    title: "ACTION", "mDataProp": null,
               //    "sDefaultContent": '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btntrimsedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btntrimsremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div>'
               //}
        ]
    });


    $("#tblFabricdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblFabricdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });

    $('input[id=Greytype]').each(function () {
        debugger;
        var row = $(this).closest('tr');
        if ($(this).val() == 'G') {
            row.find('#Greytype').prop('checked', true);
        }
    });

    $('input[id=Finishtype]').each(function () {
        debugger;
        var row = $(this).closest('tr');
        if ($(this).val() == 'F') {
            row.find('#Finishtype').prop('checked', true);
        }
    });

    $('input[id=Yarntype]').each(function () {
        debugger;
        var row = $(this).closest('tr');
        if ($(this).val() == 'Y') {
            row.find('#Yarntype').prop('checked', true);
        }
    });
}

function loadYarnTable(YarnListObj) {
    debugger;
    // $('#tblcompdetails').DataTable().destroy();
    var inputcount = 0;
    $('#tblYarndetails tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tblYarndetails').DataTable().destroy();
    }
    $('#tblYarndetails').empty();

    $('#tblYarndetails').DataTable({
        //'bSortable': false,
        //'aTargets' : [ 7, 8 ],
        data: YarnListObj,
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
            { title: "PreCostFabDeptYarnmasid", data: "PreCostFabDeptYarnmasid", "visible": false },
            { title: "Precostfabdeptfabmasid", data: "PreCostFabDeptFabmasid", "visible": false },
            { title: "FabSlno", data: "FabSlno", "visible": false },
            { title: "FabricId", data: "Fabricid", "visible": false },
            { title: "Yarnid", data: "Yarnid", "visible": false },
            { title: "Yarn", data: "Yarn" },
            { title: "Countid", data: "Countid", "visible": false },
            { title: "Count", data: "Count" },
            { title: "Colorid", data: "Colorid", "visible": false },
            { title: "Color", data: "Color" },
            { title: "Percentage", data: "Percentage" },
               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnyarnedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnyarnremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div>'
               }
        ]
    });


    $("#tblYarndetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblYarndetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}

function loadProcessTable(ProcessListObj) {
    debugger;
    // $('#tblcompdetails').DataTable().destroy();
    var inputcount = 0;
    $('#tblProcessdetails tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tblProcessdetails').DataTable().destroy();
    }
    $('#tblProcessdetails').empty();

    $('#tblProcessdetails').DataTable({
        //'bSortable': false,
        //'aTargets' : [ 7, 8 ],
        data: ProcessListObj,
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
            { title: "PreCostFabDeptProcessmasid", data: "PreCostFabDeptProcmasid", "visible": false },
            { title: "Precostfabdeptfabmasid", data: "PreCostFabDeptFabmasid", "visible": false },
            { title: "FabSlno", data: "FabSlno", "visible": false },
            { title: "FabricId", data: "Fabricid", "visible": false },
            { title: "Processid", data: "Processid", "visible": false },
            { title: "Process", data: "Process" },
            { title: "Loss %", data: "LossPercentage" },
               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnProcedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnProcremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div>'
               }
        ]
    });


    $("#tblProcessdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblProcessdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
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
    Reqdate = Fdatestring;
    var day = new Date(),
        year = ((day.getMonth() - 2) < 0) ? (day.getFullYear() - 1) : day.getFullYear(),
        month = ((day.getMonth() - 2) < 0) ? (12 + (day.getMonth() - 2)) : (day.getMonth() + 1),
        date = month + '/' + day.getDate() + '/' + year;


    $('#txtEntryDate').val(Fdatestring);
    $('#txtBReqDate').val(Fdatestring);


}

function getbyID(ID) {
    debugger;

    $.ajax({
        url: "/PreCostingFabricDept/GetPrecostingmasDetails/" + ID,
        type: "GET",
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            if (obj != undefined && obj != null && obj.length > 0) {

                $('#txtOrderNo').val(obj[0]["order_no"]);
                $('#txtBuyer').val(obj[0]["Buyer"]);
                $('#txtRefNo').val(obj[0]["Style"]);
                $('#txtStyle').val(obj[0]["Style"]);
                $('#txtRemark').val(obj[0]["Remarks"]);
                $('#txtBuyerOrderDate').val(moment(obj[0]["Orderdate"]).format('DD/MM/YYYY'));
                $('#txtEntryDate').val(moment(obj[0]["Entrydate"]).format('DD/MM/YYYY'));
                OrdNo = obj[0]["Orderno"];
                BMasId = obj[0]["Bmasid"];
                Buyerid = obj[0]["Buyerid"];
                Styleid = obj[0]["Styleid"];
                precostmasid = obj[0]["PreCostFabDeptmasid"];

                if (Mod == 0) {
                    LoadAddFabricDetails(ID);

                }
                else if (Mod == 1) {
                    $('#btnDelete').hide();
                    $('#btnAdd').hide();
                    $('#btnUpdate').show();
                    LoadEditFabric(precostmasid);
                    LoadEditYarn(precostmasid);
                    LoadEditProcess(precostmasid);
                }
                else {
                    $('#btnDelete').show();
                    $('#btnAdd').hide();
                    $('#btnUpdate').hide();
                    LoadEditFabric(precostmasid);
                    LoadEditYarn(precostmasid);
                    LoadEditProcess(precostmasid);
                }

            }

            $('#myModal1').modal('show');

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function LoadAddFabricDetails(ID) {
    debugger;

    $.ajax({
        url: "/PreCostingFabricDept/GetPrecostingAddfabric/" + ID,
        type: "GET",
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            FabricList = (result.Value);

            loadFabricTable(FabricList);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function Save() {
    debugger;
    var isvalidate = true;
    if (YarnList.length == 0) {

        alert("Please Check Yarn Details..");
        return true;
    }

    if (FabricList.length == 0) {

        alert("Please Check Fabric Details..");
        return true;
    }
    if (ProcessList.length == 0) {

        alert("Please check Proccess Details..");
        return true;
    }

    $.each(YarnList, function () {

        var sno = this.FabSlno;
        var totper = 0;
        var test = 0;
        $.each(YarnList, function () {
            if (this.FabSlno == sno) {
                test = 1;
                totper = parseFloat(totper) + parseFloat(this.Percentage);
            }
        });
        if (totper < 100 && test == 1) {

            alert("Please Yarn percentage should not less than 100..");
            isvalidate = false;
            return false;
        }
        if (totper > 100 && test == 1) {

            alert("Please Yarn percentage should not greater than 100..");
            isvalidate = false;
            return false;
        }
        
    });
    if (isvalidate) {
        var objSubmit = {
            OrderNo: $('#txtOrderNo').val(),
            Bmasid: BMasId,
            Styleid: Styleid,
            Buyerid: Buyerid,
            Entrydate: $('#txtEntryDate').val(),
            Stylerowid: StyleRowId,
            FabDet: FabricList,
            YarnDet: YarnList,
            ProcessDet: ProcessList
        };
        //$("#ConAdd").attr("disabled", true);
        LoadingSymb();
        $.ajax({
            url: "/PreCostingFabricDept/Add",
            data: JSON.stringify(objSubmit),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {

                if (result.Value == true) {

                    alert("Precosting Saved Sucessfully");
                    window.location.href = "/StyleEntry/StyleEntryIndex?BMasId=" + BMasId + "=&Mode=" + 1;
                } else {

                    window.location.href = "/Error/Index";


                }

            },
            error: function (errormessage) {

                alert(errormessage.responseText);
            }
        });
    }
}

function Update() {
    debugger;
    var isvalidate = true;
    if (YarnList.length == 0) {

        alert("Please Check Yarn Details..");
        return true;
    }

    if (FabricList.length == 0) {

        alert("Please Check Fabric Details..");
        return true;
    }
    if (ProcessList.length == 0) {

        alert("Please check Proccess Details..");
        return true;
    }
    $.each(YarnList, function () {

        var sno = this.FabSlno;
        var totper = 0;
        var test = 0;
        $.each(YarnList, function () {
            if (this.FabSlno == sno) {
                test = 1;
                totper = parseFloat(totper) + parseFloat(this.Percentage);
            }
        });
        if (totper < 100 && test == 1) {

            alert("Please Yarn percentage should not less than 100..");
            isvalidate = false;
            return false;
        }
        if (totper > 100 && test == 1) {

            alert("Please Yarn percentage should not greater than 100..");
            isvalidate = false;
            return false;
        }

    });
    if (isvalidate) {
        var objSubmit = {
            OrderNo: $('#txtOrderNo').val(),
            Bmasid: BMasId,
            Styleid: Styleid,
            Buyerid: Buyerid,
            Entrydate: $('#txtEntryDate').val(),
            Stylerowid: StyleRowId,
            FabDet: FabricList,
            YarnDet: YarnList,
            ProcessDet: ProcessList,
            PreCostFabDeptmasid: precostmasid
        };
        //$("#ConAdd").attr("disabled", true);
        LoadingSymb();
        $.ajax({
            url: "/PreCostingFabricDept/Update",
            data: JSON.stringify(objSubmit),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {

                if (result.Value == true) {

                    alert("Precosting Updated Sucessfully");
                    window.location.href = "/StyleEntry/StyleEntryIndex?BMasId=" + BMasId + "=&Mode=" + 1;
                } else {

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

    if (YarnList.length == 0) {

        alert("Please Check Yarn Details..");
        return true;
    }

    if (FabricList.length == 0) {

        alert("Please Check Fabric Details..");
        return true;
    }
    if (ProcessList.length == 0) {

        alert("Please check Proccess Details..");
        return true;
    }

    var objSubmit = {
        OrderNo: $('#txtOrderNo').val(),
        Bmasid: BMasId,
        Styleid: Styleid,
        Buyerid: Buyerid,
        Entrydate: $('#txtEntryDate').val(),
        Stylerowid: StyleRowId,
        FabDet: FabricList,
        YarnDet: YarnList,
        ProcessDet: ProcessList,
        PreCostFabDeptmasid: precostmasid
    };
    //$("#ConAdd").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/PreCostingFabricDept/Delete",
        data: JSON.stringify(objSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.Value == true) {

                alert("Precosting Deleted Sucessfully");
                window.location.href = "/StyleEntry/StyleEntryIndex?BMasId=" + BMasId + "=&Mode=" + 1;
            } else {

                window.location.href = "/Error/Index";


            }

        },
        error: function (errormessage) {

            alert(errormessage.responseText);
        }
    });
}

function ClearyarnDll() {
    $('#ddlYarnlist').val(0).trigger('change');
    $('#ddlCount').val(0).trigger('change');
    $('#ddlColor').val(0).trigger('change');
    $('#txtLoss').val('');
    $('#btnyarnadd').show();
    $('#btnyarnupdate').hide();

}

function ClearprocDll() {
    $('#dllProcess').val(0).trigger('change');
    $('#txtprocessLoss').val('');
    $('#btnProcadd').show();
    $('#btnProcupdate').hide();
}

function LoadEditFabric(ID) {
    debugger;

    $.ajax({
        url: "/PreCostingFabricDept/GetPrecostingEditfabric/" + ID,
        type: "GET",
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            FabricList = (result.Value);
            fslno = result.Value[0].FabSlno;
            loadFabricTable(FabricList);

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function LoadEditYarn(ID) {
    debugger;

    $.ajax({
        url: "/PreCostingFabricDept/GetPrecostingEditYarn/" + ID,
        type: "GET",
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            YarnList = (result.Value);

            var yarnempty = [];
            yarnempty = YarnList;

            yarnempty = $.grep(yarnempty, function (v) {
                return (v.FabSlno == fslno);
            });

            YarnDetList = yarnempty;
            loadYarnTable(YarnDetList);

            //loadFabricTable(FabricList);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function LoadEditProcess(ID) {
    debugger;

    $.ajax({
        url: "/PreCostingFabricDept/GetPrecostingEditprocess/" + ID,
        type: "GET",
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            ProcessList = (result.Value);

            var processempty = [];
            processempty = ProcessList;

            processempty = $.grep(processempty, function (v) {
                return (v.FabSlno == fslno);
            });

            ProcessDetList = processempty;
            loadProcessTable(ProcessDetList);
            //loadFabricTable(FabricList);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function Close() {
    window.location.href = "/StyleEntry/StyleEntryIndex?BMasId=" + BMasId + "=&Mode=" + 1;
}