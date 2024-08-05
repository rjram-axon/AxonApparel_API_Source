
var Yarnlist = [];
var Processlist = [];
var yarnrowindex = -1;
var processrowindex = -1;
var Mainlist = [];
var fabricmasid = 0;
var Mode = 0;
var FabricMasEditFlg = "disabled";
var FabricMasDeleteFlg = "disabled";
$(document).ready(function () {

    LoadColorDDL("#ddlColor");
    LoadSizeDDL("#ddlCount");
    LoadFabricDDL("#ddlFablist");
    LoadProcessDDL("#ddlProcess");
    LoadYarnDDL("#ddlYarn");
    LoadMainlist();
    $('#btnyarnadd').click(function () {
        debugger;
        var leng = 0;

        var isAllValid = true;


        if ($('#ddlYarn').val() == "0") {

            $('#ddlYarn').siblings(".select2-container").css('border', '1px solid red');

            isAllValid = false;
        }
        else {

            $('#ddlYarn').siblings(".select2-container").css('border', '1px solid lightgrey');
        }
        if ($('#ddlCount').val() == "0") {
            isAllValid = false;

            $('#ddlCount').siblings(".select2-container").css('border', '1px solid red');

        }
        else {

            $('#ddlCount').siblings(".select2-container").css('border', '1px solid lightgrey');

        }

        if ($('#ddlColor').val() == "0") {

            $('#ddlColor').siblings(".select2-container").css('border', '1px solid red');

            isAllValid = false;
        }
        else {

            $('#ddlColor').siblings(".select2-container").css('border', '1px solid lightgrey');
        }
        if ($('#txtPercentage').val() == "") {
            isAllValid = false;
            $('#txtPercentage').css('border-color', 'Red');
        }
        else {
            $('#txtPercentage').css('border-color', 'lightgrey');
        }

        var yn = $('#ddlYarn').val();
        var sz = $('#ddlCount').val();
        var cl = $('#ddlColor').val();

        $.each(Yarnlist, function () {
            if (this.Yarnid == yn && this.Countid == sz && this.Colorid == cl) {
                //alert("Details already added");
                var msg = 'Details already added...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                isAllValid = false;
            }
        });

        if (isAllValid) {

            var YarnlistObj = {
                Yarn: $("#ddlYarn option:selected").text(),
                Yarnid: $('#ddlYarn').val(),
                Count: $("#ddlCount option:selected").text(),
                Countid: $('#ddlCount').val(),
                Color: $("#ddlColor option:selected").text(),
                Colorid: $('#ddlColor').val(),
                Percentage: $('#txtPercentage').val(),
                Fabricmasid: 0,
                FabricYarnmasid: 0,
                Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
            };

            Yarnlist.push(YarnlistObj);

            loadYarnTable(Yarnlist);
            ClearYarnDll();

        }
    });
    $('#btnprocadd').click(function () {
        debugger;
        var leng = 0;

        var isAllValid = true;


        if ($('#ddlProcess').val() == "0") {

            $('#ddlProcess').siblings(".select2-container").css('border', '1px solid red');

            isAllValid = false;
        }
        else {

            $('#ddlProcess').siblings(".select2-container").css('border', '1px solid lightgrey');
        }
        if ($('#txtLoss').val() == "") {
            isAllValid = false;
            $('#txtLoss').css('border-color', 'Red');
        }
        else {
            $('#txtLoss').css('border-color', 'lightgrey');
        }
        if ($('#txtRate').val() == "") {
            isAllValid = false;
            $('#txtRate').css('border-color', 'Red');
        }
        else {
            $('#txtRate').css('border-color', 'lightgrey');
        }

        var procid = $('#ddlProcess').val();


        $.each(Processlist, function () {
            if (this.Processid == procid) {
                //alert("Details already added");
                var msg = 'Details already added...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                isAllValid = false;
            }
        });

        if (isAllValid) {

            var ProcesslistObj = {
                Process: $("#ddlProcess option:selected").text(),
                Processid: $('#ddlProcess').val(),
                LossPercentage: $('#txtLoss').val(),
                Rate: $('#txtRate').val(),
                Fabricmasid: 0,
                FabricProcessmasid: 0,
                Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
            };

            Processlist.push(ProcesslistObj);

            loadProcessTable(Processlist);
            ClearProcessDll();

        }
    });

    $(document).on('click', '.btnyarnedit', function () {
        debugger;
        yarnrowindex = $(this).closest('tr').index();
        var currentro12 = Yarnlist.slice(yarnrowindex);
        $('#ddlYarn').val(currentro12[0]['Yarnid']).trigger('change');
        $('#ddlCount').val(currentro12[0]['Countid']).trigger('change');
        $('#ddlColor').val(currentro12[0]['Colorid']).trigger('change');
        $('#txtPercentage').val(currentro12[0]['Percentage']);
        $('#btnyarnadd').hide();
        $('#btnyarnupdate').show();
    });

    $('#btnyarnupdate').click(function () {
        debugger;

        var currentrowsel1 = Yarnlist.slice(yarnrowindex);

        var isAllValid = true;

        if ($('#ddlYarn').val() == "0") {

            $('#ddlYarn').siblings(".select2-container").css('border', '1px solid red');

            isAllValid = false;
        }
        else {

            $('#ddlYarn').siblings(".select2-container").css('border', '1px solid lightgrey');
        }
        if ($('#ddlCount').val() == "0") {
            isAllValid = false;

            $('#ddlCount').siblings(".select2-container").css('border', '1px solid red');

        }
        else {

            $('#ddlCount').siblings(".select2-container").css('border', '1px solid lightgrey');

        }

        if ($('#ddlColor').val() == "0") {

            $('#ddlColor').siblings(".select2-container").css('border', '1px solid red');

            isAllValid = false;
        }
        else {

            $('#ddlColor').siblings(".select2-container").css('border', '1px solid lightgrey');
        }
        if ($('#txtPercentage').val() == "") {
            isAllValid = false;
            $('#txtPercentage').css('border-color', 'Red');
        }
        else {
            $('#txtPercentage').css('border-color', 'lightgrey');
        }
        if (isAllValid) {
            var currentrowsel = Yarnlist.slice(yarnrowindex);

            currentrowsel[0]['Yarnid'] = $("#ddlYarn").val();
            currentrowsel[0]['Yarn'] = $("#ddlYarn option:selected").text();
            currentrowsel[0]['Countid'] = $("#ddlCount").val();
            currentrowsel[0]['Count'] = $("#ddlCount option:selected").text();
            currentrowsel[0]['Colorid'] = $("#ddlColor option:selected").val();
            currentrowsel[0]['Color'] = $("#ddlColor option:selected").text();
            currentrowsel[0]['Percentage'] = $("#txtPercentage").val();
            Yarnlist[yarnrowindex] = currentrowsel[0];

            loadYarnTable(Yarnlist);

            $('#btnyarnadd').show();
            $('#btnyarnupdate').hide();
            ClearYarnDll();
        };
    });

    $(document).on('click', '.btnprocessedit', function () {
        debugger;
        processrowindex = $(this).closest('tr').index();
        var currentro12 = Processlist.slice(processrowindex);
        $('#ddlProcess').val(currentro12[0]['Processid']).trigger('change');
        $('#txtLoss').val(currentro12[0]['LossPercentage']);
        $('#txtRate').val(currentro12[0]['Rate']);

        $('#btnprocadd').hide();
        $('#btnprocupdate').show();
    });

    $('#btnprocupdate').click(function () {
        debugger;
        var currentrowsel1 = Processlist.slice(processrowindex);
        var isAllValid = true;
        if ($('#ddlProcess').val() == "0") {

            $('#ddlProcess').siblings(".select2-container").css('border', '1px solid red');

            isAllValid = false;
        }
        else {

            $('#ddlProcess').siblings(".select2-container").css('border', '1px solid lightgrey');
        }
        if ($('#txtLoss').val() == "") {
            isAllValid = false;
            $('#txtLoss').css('border-color', 'Red');
        }
        else {
            $('#txtLoss').css('border-color', 'lightgrey');
        }
        if ($('#txtRate').val() == "") {
            isAllValid = false;
            $('#txtRate').css('border-color', 'Red');
        }
        else {
            $('#txtRate').css('border-color', 'lightgrey');
        }
        if (isAllValid) {
            var currentrowsel = Processlist.slice(processrowindex);
            currentrowsel[0]['Processid'] = $("#ddlProcess").val();
            currentrowsel[0]['Process'] = $("#ddlProcess option:selected").text();
            currentrowsel[0]['LossPercentage'] = $("#txtLoss").val();
            currentrowsel[0]['Rate'] = $("#txtRate").val();
            Processlist[processrowindex] = currentrowsel[0];
            loadProcessTable(Processlist);
            $('#btnprocadd').show();
            $('#btnprocupdate').hide();
            ClearProcessDll();
        };
    });
    $(document).on('click', '.btnyarnremove', function () {
        debugger;
        yarnrowindex = $(this).closest('tr').index();
        var currentrowsel = Yarnlist.slice(yarnrowindex);
        Yarnlist.splice(yarnrowindex, 1);
        document.getElementById("tblYarndetails").deleteRow(yarnrowindex + 1);
    });
    $(document).on('click', '.btnprocessremove', function () {
        debugger;
        processrowindex = $(this).closest('tr').index();
        var currentrowsel = Processlist.slice(processrowindex);
        Yarnlist.splice(processrowindex, 1);
        document.getElementById("tblProcessdetails").deleteRow(processrowindex + 1);
    });
    $(document).on('click', '.btnmainedit', function () {
        debugger;
        Mode = 1;
        var table = $('#tblMaindetails').DataTable();
        var row = $(this).closest('tr');
        var data = $('#tblMaindetails').dataTable().fnGetData(row);
        var fabmasid = data.Fabricmasid;
        fabricmasid = fabmasid;
        LoadEditFabmas(fabmasid);
        LoadEditYarn(fabmasid);
        LoadEditProcess(fabmasid);
        debugger;
        $('#myModal').modal('show');
        $('#btnAdd').hide();
        $('#btnDelete').hide();
        $('#btnUpdate').show();
        $("#ddlFablist").prop("disabled", true);
    });
    $(document).on('click', '.btnmainremove', function () {
        debugger;
        Mode = 2;
        var table = $('#tblMaindetails').DataTable();
        var row = $(this).closest('tr');
        var data = $('#tblMaindetails').dataTable().fnGetData(row);
        var fabmasid = data.Fabricmasid;
        fabricmasid = fabmasid;
        LoadEditFabmas(fabmasid);
        LoadEditYarn(fabmasid);
        LoadEditProcess(fabmasid);
        debugger;
        $('#myModal').modal('show');
        $('#btnAdd').hide();
        $('#btnDelete').show();
        $('#btnUpdate').hide();
        $("#ddlFablist").prop("disabled", true);
    });
    $(document).on('click', '.btnmainview', function () {
        debugger;
        Mode = 1;
        var table = $('#tblMaindetails').DataTable();
        var row = $(this).closest('tr');
        var data = $('#tblMaindetails').dataTable().fnGetData(row);
        var fabmasid = data.Fabricmasid;
        fabricmasid = fabmasid;
        LoadEditFabmas(fabmasid);
        LoadEditYarn(fabmasid);
        LoadEditProcess(fabmasid);
        debugger;
        $('#myModal').modal('show');
        $('#btnAdd').hide();
        $('#btnDelete').hide();
        $('#btnUpdate').hide();
        $("#ddlFablist").prop("disabled", true);
    });
    $(document).on('change', '#ddlFablist', function () {
        debugger;
        var val = $(this).val();
        if (val > 0) {
            if (Mode == 0) {
                $.ajax({
                    url: "/FabricMaster/GetFabricEditDetails",
                    data: JSON.stringify({ Id: val }),
                    type: "POST",
                    contentType: "application/json;charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        debugger;
                        var obj = result.Value;
                        for (var i = 0; obj.length > i; i++) {
                            var fabmasid = obj[i].Fabricmasid;
                            var fgsm = obj[i].FromGSM;
                            var tgsm = obj[i].ToGSM;
                            var fromgsm = $('#txtFrmgsm').val();
                            var togsm = $('#txtTogsm').val();
                            if (fabmasid > 0) {
                                if (fromgsm < fgsm && togsm < fgsm) {
                                } else if (fromgsm > tgsm) {
                                }
                                else {
                                    //alert('This Fabric is already planned..');
                                    var msg = 'This Fabric is already planned...';
                                    var flg = 4;
                                    var mode = 1;
                                    AlartMessage(msg, flg, mode);
                                    $('#ddlFablist').val(0).trigger('change');
                                    return true;
                                }
                            }
                        }
                    }
                });
            }
        }
    });
});
function loadYarnTable(YarnlistObj) {
    debugger;
    var inputcount = 0;
    $('#tblYarndetails tr').each(function () {
        inputcount++;
    });
    if (inputcount > 0) {
        $('#tblYarndetails').DataTable().destroy();
    }
    $('#tblYarndetails').DataTable({
        data: Yarnlist,
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
            { title: "FabricYarnmasid", data: "FabricYarnmasid", "visible": false },
            { title: "Fabricmasid", data: "Fabricmasid", "visible": false },
            { title: "Yarnid", data: "Yarnid", "visible": false },
            { title: "Yarn", data: "Yarn" },
            { title: "Countid", data: "Countid", "visible": false },
            { title: "Count", data: "Count" },
            { title: "Colorid", data: "Colorid", "visible": false },
            { title: "Color", data: "Color" },
            { title: "Percentage", data: "Percentage" },
               {
                   title: "ACTION", "mDataProp": null,
                   "render": function (data, type, row, meta) {
                       return '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" id="btnyarnedit" class="btnyarnedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnyarnremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div>'
                   }
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

function loadProcessTable(ProcesslistObj) {
    debugger;
    var inputcount = 0;
    $('#tblProcessdetails tr').each(function () {
        inputcount++;
    });
    if (inputcount > 0) {
        $('#tblProcessdetails').DataTable().destroy();
    }
    $('#tblProcessdetails').DataTable({
        data: Processlist,
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
            { title: "FabricProcessmasid", data: "FabricProcessmasid", "visible": false },
            { title: "Fabricmasid", data: "Fabricmasid", "visible": false },
            { title: "Processid", data: "Processid", "visible": false },
            { title: "Process", data: "Process" },
            { title: "LossPercentage", data: "LossPercentage" },
            { title: "Rate", data: "Rate" },
               {
                   title: "ACTION", "mDataProp": null,
                   "render": function (data, type, row, meta) {
                       return '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" id="btnprocessedit" class="btnprocessedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnprocessremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div>'
                   }
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

function loadFabricmainTable() {
    debugger;
    var inputcount = 0;
    $('#tblMaindetails tr').each(function () {
        inputcount++;
    });
    if (inputcount > 0) {
        $('#tblMaindetails').DataTable().destroy();
    }
    $('#tblMaindetails').DataTable({
        data: Mainlist,
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
            { title: "Fabricmasid", data: "Fabricmasid", "visible": false },
            { title: "Fabricid", data: "Fabricid", "visible": false },
            { title: "Fabric", data: "Fabric" },
               {
                   title: "ACTION", "mDataProp": null,
                   "render": function (data, type, row, meta) {
                       return '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" id="btnmainedit"  ' + FabricMasEditFlg + '  class="btnmainedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" ' + FabricMasDeleteFlg + ' class="btnmainremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div><div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="view" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" id="btnmainview"   class="btnmainview btn btn-round btn-info"> <i class="fa fa-eye"></i> </button>'
                   }
               }
        ]
    });
    $("#tblMaindetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblMaindetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}

function ClearYarnDll() {
    $('#ddlYarn').val(0).trigger('change');
    $('#ddlCount').val(0).trigger('change');
    $('#ddlColor').val(0).trigger('change');
    $('#txtPercentage').val('');
    $('#btnyarnadd').show();
    $('#btnyarnupdate').hide();
}
function ClearProcessDll() {
    $('#ddlProcess').val(0).trigger('change');
    $('#txtLoss').val('');
    $('#txtRate').val('');
    $('#btnprocadd').show();
    $('#btnprocupdate').hide();
}

function Add() {
    debugger;
    var isvalidate = true;
    //if (TrimsList.length == 0) {

    //    alert("Please Check Trims Details..");
    //    return true;
    //}

    //if (FabricList.length == 0) {

    //    alert("Please Check Fabric Details..");
    //    return true;
    //}
    //if (EmbellishmentList.length == 0) {

    //    alert("Please check Embellishment Details..");
    //    return true;
    //}
    if ($('#ddlFablist').val() == 0) {
        $('#ddlFablist').siblings(".select2-container").css('border', '1px solid red');
        isValid = false;
    }
    else {
        $('#ddlFablist').siblings(".select2-container").css('border', 'lightgrey');
    }

    if ($('#txtFrmgsm').val().trim() == "") {
        $('#txtFrmgsm').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtFrmgsm').css('border-color', 'lightgrey');
    }
    if ($('#txtTogsm').val().trim() == "") {
        $('#txtTogsm').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtTogsm').css('border-color', 'lightgrey');
    }
    var fgsm = parseFloat($('#txtFrmgsm').val());
    var tgsm = parseFloat($('#txtTogsm').val());
    //if (tgsm < fgsm) {
    //    $('#validmsg').show();
    //    isvalidate = false;
    //    return false;
    //}
    //else {
    //    $('#validmsg').hide();
    //}
    $.each(Yarnlist, function () {
        //var sno = this.FabSlno;
        var totper = 0;
        var test = 0;
        $.each(Yarnlist, function () {
            //if (this.FabSlno == sno) {
            test = 1;
            totper = parseFloat(totper) + parseFloat(this.Percentage);
            //}
        });
        if (totper < 100 && test == 1) {
            //alert("Please Yarn percentage should not less than 100..");
            var msg = 'Please Yarn percentage should not less than 100...';
            var flg = 4;
            var mode = 1;
            AlartMessage(msg, flg, mode);
            isvalidate = false;
            return false;
        }
        if (totper > 100 && test == 1) {
            //alert("Please Yarn percentage should not greater than 100..");
            var msg = 'Please Yarn percentage should not greater than 100...';
            var flg = 4;
            var mode = 1;
            AlartMessage(msg, flg, mode);
            isvalidate = false;
            return false;
        }
    });
    var objSubmit = {
        Fabricid: $('#ddlFablist').val(),
        Fabricmasid: 0,
        FromGSM: $('#txtFrmgsm').val(),
        ToGSM: $('#txtTogsm').val(),
        FabricYarn: Yarnlist,
        FabricProcess: Processlist,
    };
    //$("#ConAdd").attr("disabled", true);
    var fabid = $('#ddlFablist').val();
    $.ajax({
        url: "/FabricMaster/GetFabricEditDetails",
        data: JSON.stringify({ Id: fabid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            for (var i = 0; obj.length > i; i++) {
                var fabmasid = obj[i].Fabricmasid;
                var fgsm = obj[i].FromGSM;
                var tgsm = obj[i].ToGSM;
                var fromgsm = parseFloat($('#txtFrmgsm').val());
                var togsm = parseFloat($('#txtTogsm').val());
                if (fabmasid > 0) {
                    if (fromgsm < fgsm && togsm < fgsm) {
                    } else if (fromgsm > tgsm) {
                    }
                    else {
                        //alert('This Fabric and GSM range is already planned..');
                        var msg = 'This Fabric and GSM range is already planned...';
                        var flg = 4;
                        var mode = 1;
                        AlartMessage(msg, flg, mode);
                        $('#ddlFablist').val(0).trigger('change');
                        return true;
                        isvalidate = false;
                    }
                }
            }
            if (isvalidate) {
                $("#btnAdd").attr("disabled", true);
                LoadingSymb();
                $.ajax({
                    url: "/FabricMaster/Add",
                    data: JSON.stringify(objSubmit),
                    type: "POST",
                    contentType: "application/json;charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        if (result.Value == true) {
                            var fabricmaster = $('#ddlFablist').find(":selected").text();
                            AddUserEntryLog('Master', 'Fabric Master', 'ADD', fabricmaster);

                            //alert("FabricMaster Saved Sucessfully");
                            var msg = 'FabricMaster Saved Sucessfully...';
                            var flg = 1;
                            var mode = 0;
                            AlartMessage(msg, flg, mode);
                            $("#btnAdd").attr("disabled", false);
                            //window.location.href = "/FabricMaster/FabricMasterIndex";
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
    });
    //if (isvalidate) {
    //    LoadingSymb();
    //    $.ajax({
    //        url: "/FabricMaster/Add",
    //        data: JSON.stringify(objSubmit),
    //        type: "POST",
    //        contentType: "application/json;charset=utf-8",
    //        dataType: "json",
    //        success: function (result) {

    //            if (result.Value == true) {

    //                alert("FabricMaster Saved Sucessfully");
    //                window.location.href = "/FabricMaster/FabricMasterIndex";
    //            } else {

    //                window.location.href = "/Error/Index";


    //            }

    //        },
    //        error: function (errormessage) {

    //            alert(errormessage.responseText);
    //        }

    //    });
    //}
}
function Update() {
    debugger;
    var isvalidate = true;
    //if (TrimsList.length == 0) {

    //    alert("Please Check Trims Details..");
    //    return true;
    //}

    //if (FabricList.length == 0) {

    //    alert("Please Check Fabric Details..");
    //    return true;
    //}
    //if (EmbellishmentList.length == 0) {

    //    alert("Please check Embellishment Details..");
    //    return true;
    //}
    if ($('#ddlFablist').val() == 0) {
        $('#ddlFablist').siblings(".select2-container").css('border', '1px solid red');
        isValid = false;
    }
    else {
        $('#ddlFablist').siblings(".select2-container").css('border', 'lightgrey');
    }

    if ($('#txtFrmgsm').val().trim() == "") {
        $('#txtFrmgsm').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtFrmgsm').css('border-color', 'lightgrey');
    }
    if ($('#txtTogsm').val().trim() == "") {
        $('#txtTogsm').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtTogsm').css('border-color', 'lightgrey');
    }
    var fgsm = parseFloat($('#txtFrmgsm').val());
    var tgsm = parseFloat($('#txtTogsm').val());
    //if (tgsm < fgsm || tgsm == fgsm) {
    //    $('#validmsg').show();
    //    isvalidate = false;
    //    return false;
    //}
    //else {
    //    $('#validmsg').hide();
    //}
    $.each(Yarnlist, function () {
        //var sno = this.FabSlno;
        var totper = 0;
        var test = 0;
        $.each(Yarnlist, function () {
            //if (this.FabSlno == sno) {
            test = 1;
            totper = parseFloat(totper) + parseFloat(this.Percentage);
            //}
        });
        if (totper < 100 && test == 1) {
            //alert("Please Yarn percentage should not less than 100..");
            var msg = 'Please Yarn percentage should not less than 100...';
            var flg = 4;
            var mode = 1;
            AlartMessage(msg, flg, mode);
            isvalidate = false;
            return false;
        }
        if (totper > 100 && test == 1) {
            //alert("Please Yarn percentage should not greater than 100..");
            var msg = 'Please Yarn percentage should not greater than 100...';
            var flg = 4;
            var mode = 1;
            AlartMessage(msg, flg, mode);
            isvalidate = false;
            return false;
        }
    });
    var objSubmit = {
        Fabricid: $('#ddlFablist').val(),
        FromGSM: $('#txtFrmgsm').val(),
        ToGSM: $('#txtTogsm').val(),
        Fabricmasid: fabricmasid,
        FabricYarn: Yarnlist,
        FabricProcess: Processlist,
    };
    //$("#ConAdd").attr("disabled", true);
    var fabid = $('#ddlFablist').val();
    $.ajax({
        url: "/FabricMaster/GetFabricEditDetails",
        data: JSON.stringify({ Id: fabid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            for (var i = 0; obj.length > i; i++) {
                var fabmasid = obj[i].Fabricmasid;
                var fgsm = obj[i].FromGSM;
                var tgsm = obj[i].ToGSM;
                var fromgsm = parseFloat($('#txtFrmgsm').val());
                var togsm = parseFloat($('#txtTogsm').val());
                if (fabmasid > 0 && fabmasid != fabricmasid) {
                    if (fromgsm < fgsm && togsm < fgsm) {

                    } else if (fromgsm > tgsm) {
                    }
                    else {
                        //alert('This Fabric and GSM range is already planned..');
                        var msg = 'This Fabric and GSM range is already planned...';
                        var flg = 4;
                        var mode = 1;
                        AlartMessage(msg, flg, mode);
                        //$('#ddlFablist').val(0).trigger('change');
                        return true;
                        isvalidate = false;
                    }
                }
            }
            if (isvalidate) {
                $("#btnUpdate").attr("disabled", true)
                LoadingSymb();
                $.ajax({
                    url: "/FabricMaster/Update",
                    data: JSON.stringify(objSubmit),
                    type: "POST",
                    contentType: "application/json;charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        if (result.Value == true) {
                            var fabricmaster = $('#ddlFablist').find(":selected").text();
                            AddUserEntryLog('Master', 'Fabric Master', 'UPDATE', fabricmaster);

                            //alert("FabricMaster Updated Sucessfully");
                            var msg = 'FabricMaster Updated Sucessfully...';
                            var flg = 1;
                            var mode = 0;
                            AlartMessage(msg, flg, mode);
                            $("#btnUpdate").attr("disabled", false)
                            //window.location.href = "/FabricMaster/FabricMasterIndex";
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
    });
}
function Delete() {
    debugger;
    //if (TrimsList.length == 0) {

    //    alert("Please Check Trims Details..");
    //    return true;
    //}

    //if (FabricList.length == 0) {

    //    alert("Please Check Fabric Details..");
    //    return true;
    //}
    //if (EmbellishmentList.length == 0) {

    //    alert("Please check Embellishment Details..");
    //    return true;
    //}
    var objSubmit = {
        Fabricid: $('#ddlFablist').val(),
        Fabricmasid: fabricmasid,
        FromGSM: $('#txtFrmgsm').val(),
        ToGSM: $('#txtTogsm').val(),
        FabricYarn: Yarnlist,
        FabricProcess: Processlist,
    };
    //$("#ConAdd").attr("disabled", true);
    $("#btnDelete").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/FabricMaster/Delete",
        data: JSON.stringify(objSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == true) {
                var fabricmaster = $('#ddlFablist').find(":selected").text();
                AddUserEntryLog('Master', 'Fabric Master', 'DELETE', fabricmaster);

                //alert("FabricMaster Deleted Sucessfully");
                var msg = 'FabricMaster Deleted Sucessfully...';
                var flg = 2;
                var mode = 0;
                AlartMessage(msg, flg, mode);
                $("#btnDelete").attr("disabled", false);
                //window.location.href = "/FabricMaster/FabricMasterIndex";
            } else {
                window.location.href = "/Error/Index";
            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function LoadEditFabmas(ID) {
    debugger;
    $.ajax({
        url: "/FabricMaster/GetFabricmasDetails/" + ID,
        type: "GET",
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            var fabid = obj[0].Fabricid;
            $('#ddlFablist').val(fabid).trigger('change');
            $('#txtFrmgsm').val(obj[0].FromGSM);
            $('#txtTogsm').val(obj[0].ToGSM);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function LoadMainlist() {
    debugger;
    $.ajax({
        url: "/FabricMaster/GetFabricMainDetails/",
        type: "GET",
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            Mainlist = (result.Value);
            loadFabricmainTable();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function LoadEditYarn(ID) {
    debugger;
    $.ajax({
        url: "/FabricMaster/GetFabricyarnEditDetails/" + ID,
        type: "GET",
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            Yarnlist = (result.Value);
            loadYarnTable(Yarnlist);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function LoadEditProcess(ID) {
    debugger;
    $.ajax({
        url: "/FabricMaster/GetFabricprocessEditDetails/" + ID,
        type: "GET",
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            Processlist = (result.Value);
            loadProcessTable(Processlist);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function clearTextBox() {
    Mode = 0;
    ClearYarnDll()
    ClearProcessDll()
    $('#ddlFablist').val(0).trigger('change');
    $('#txtFrmgsm').val('');
    $('#txtTogsm').val('');
    $('#btnAdd').show();
    $('#btnUpdate').hide();
    $("#ddlFablist").prop("disabled", false);
    Yarnlist = [];
    Processlist = [];
    loadYarnTable(Yarnlist);
    loadProcessTable(Processlist);
}