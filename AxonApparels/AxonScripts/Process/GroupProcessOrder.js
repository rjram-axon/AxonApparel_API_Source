var MOrd = 0;
var IpitemList = [];
var OpitemList = [];
var Ipitemsavelist = [];
var Opitemsavelist = [];
var CompanyId = 0;
var maslist = [];
var mainlist = [];
var Masid = 0;
var ProcSeq = [];
var Mode = 0;
var Groupmasid = 0;
var Prodmasid = 0;
var ddlmode = 0;
var ProcessSeq = [];
var grpprocessid = 0;

var GrpPrcEditFlg = "disabled";
var GrpPrcDeleteFlg = "disabled";

$(document).ready(function () {

    superuser = $("#hdnusername").data('value');
    Guserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    DCompid = $("#hdnDCompid").data('value');
    LoadCompanyDDL("#ddlMCompany,#ddlCompany");
    LoadStyleDDL("#ddlStyle,#ddlMStyle");
    LoadOrderNoDDL("#ddlOrderNo,#ddlMBuyOrderNo");
    LoadRefNoDDL("#ddlrefno,#ddlMRefNo");
    LoadJobNoDDL("#ddlWorkOrderNo");
    LoadProcessDDL("#ddlProcess,#ddlGrpProcess,#ddlmainProcess");
    getDate();
    var fill = localStorage.getItem('GroupProcessOrderMainFilter');
    if (fill != "null" && fill !=null) {
        LoadMainFromBack();
    } else {
        LoadMain();
    }

   


    //$("#tblmaindetails").on("click", ".btngrpedit", function () {
    //    // your code goes here
    //});


    $("#tblmaindetails").on("click", ".btngrpedit", function () {
        debugger;
        Mode = 1;
        var table = $('#tblmaindetails').DataTable();
        var Grpmasid = table.row($(this).parents('tr')).data()["GrpProdPrgid"];
        var chkprc = table.row($(this).parents('tr')).data()["chkprc"];

        Masid = Grpmasid;
        GetEditMas(Masid);
        GetEditIpGrp(Masid);
        GetEditOpGrp(Masid);
        GetEditIpPrgdet(Masid);
        GetEditOpPrgdet(Masid);

        $("#btnAdd").hide();
        $("#btnDelete").hide();
        $("#btnUpdate").show();
        if (chkprc > 0) {
            //alert('Process Order is already made..Cannot Update this program..');
            var msg = 'Process Order is already made..Cannot Update this program...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            $("#btnUpdate").attr("disabled", true);
        }

    });
    $("#tblmaindetails").on("click", ".btngrpremove", function () {
        //$('.btngrpremove').click(function () {
        debugger;
        var table = $('#tblmaindetails').DataTable();
        var Grpmasid = table.row($(this).parents('tr')).data()["GrpProdPrgid"];
        var chkprc = table.row($(this).parents('tr')).data()["chkprc"];
        Masid = Grpmasid;
        GetEditMas(Masid);
        GetEditIpGrp(Masid);
        GetEditOpGrp(Masid);
        GetEditIpPrgdet(Masid);
        GetEditOpPrgdet(Masid);
        Mode = 2;
        $("#btnAdd").hide();
        $("#btnDelete").show();
        $("#btnUpdate").hide();
        if (chkprc > 0) {
            //alert('Process Order is already made..Cannot delete this program..');
            var msg = 'Process Order is already made..Cannot delete this program...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            $("#btnDelete").attr("disabled", true);
        }
    });

    //$("select").select2({
    //    tags: true
    //});

    $("#ddlProcess").on("select2:select", function (evt) {
        debugger;
        var element = evt.params.data.element;
        var $element = $(element);

        $element.detach();
        $(this).append($element);
        $(this).trigger("change");
    });

    $(document).on('keyup', '#txtipGrpqty', function (e) {
        debugger;
        var table = $('#inputitmtab').DataTable();
        var Procid = table.row($(this).parents('tr')).data()["Processid"];
        var Itemid = table.row($(this).parents('tr')).data()["Itemid"];
        var Colorid = table.row($(this).parents('tr')).data()["Colorid"];
        var Sizeid = table.row($(this).parents('tr')).data()["Sizeid"];
        var Balqty = table.row($(this).parents('tr')).data()["BalanceQty"];
        var Val = $(this).val();
        if (Val > Balqty) {
            //alert('Should not exceed Bal qty...');\
            var msg = 'Should not exceed Balance quantity...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            Val = 0;
            $.each(IpitemList, function () {
                if (this.Processid == Procid && this.Itemid == Itemid && this.Colorid == Colorid && this.Sizeid == Sizeid) {
                    this.GrpQty = Val;

                }
            });
            loadInputitemtable(IpitemList);
            return false;
        }
        $.each(IpitemList, function () {
            if (this.Processid == Procid && this.Itemid == Itemid && this.Colorid == Colorid && this.Sizeid == Sizeid) {
                this.GrpQty = Val;

            }
        });
        $.each(OpitemList, function () {
            if (this.Processid == Procid && this.Itemid == Itemid && this.Colorid == Colorid && this.Sizeid == Sizeid) {
                this.GrpQty = Val;

            }
        });
        loadOutputitemtable(OpitemList);
    });

    $(document).on('keyup', '#txtopGrpqty', function (e) {
        debugger;
        var table = $('#outputitmtab').DataTable();
        var Procid = table.row($(this).parents('tr')).data()["Processid"];
        var Itemid = table.row($(this).parents('tr')).data()["Itemid"];
        var Colorid = table.row($(this).parents('tr')).data()["Colorid"];
        var Sizeid = table.row($(this).parents('tr')).data()["Sizeid"];
        var Balqty = table.row($(this).parents('tr')).data()["BalanceQty"];
        var Val = $(this).val();
        if (Val > Balqty) {
            //alert('Should not exceed Bal qty...');
            var msg = 'Should not exceed Balance quantity...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            Val = 0;
            $.each(OpitemList, function () {
                if (this.Processid == Procid && this.Itemid == Itemid && this.Colorid == Colorid && this.Sizeid == Sizeid) {
                    this.GrpQty = Val;

                }
            });
            loadOutputitemtable(OpitemList);
            return false;
        }
        $.each(OpitemList, function () {
            if (this.Processid == Procid && this.Itemid == Itemid && this.Colorid == Colorid && this.Sizeid == Sizeid) {
                this.GrpQty = Val;

            }
        });
        $.each(IpitemList, function () {
            if (this.Processid == Procid && this.Itemid == Itemid && this.Colorid == Colorid && this.Sizeid == Sizeid) {
                this.GrpQty = Val;

            }
        });
        loadInputitemtable(IpitemList);


    });

    $(document).on('keyup', '#txtoprate', function (e) {
        debugger;
        var table = $('#outputsavetab').DataTable();
        var Procid = table.row($(this).parents('tr')).data()["Processid"];
        var Itemid = table.row($(this).parents('tr')).data()["Itemid"];
        var Colorid = table.row($(this).parents('tr')).data()["Colorid"];
        var Sizeid = table.row($(this).parents('tr')).data()["Sizeid"];
        var Val = $(this).val();
        $.each(Opitemsavelist, function () {
            if (this.Processid == Procid && this.Itemid == Itemid && this.Colorid == Colorid && this.Sizeid == Sizeid) {
                this.rate = Val;

            }
        });

    });


});

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
    $('#txtEntrydate').val(Fdatestring);
    //$('#txtOrderDate').val(Fdatestring);


}

function ClearTextbox() {
    GenerateNumber();
    $("#btnUpdate").hide();
    $("#btnDelete").hide();
    $("#btnAdd").show();
    Mode = 0;
    $("#ddlStyle").attr("disabled", false);
    $("#ddlOrderNo").attr("disabled", false);
    $("#ddlrefno").attr("disabled", false);
    $("#ddlGrpProcess").attr("disabled", false);
    $("#ddlWorkOrderNo").attr("disabled", false);
    $("#ddlCompany").attr("disabled", false);
    $("#txtProdpgmno").attr("disabled", false);
    $("#btnloadpgm").attr("disabled", false);
    $("#ddlProcess").attr("disabled", false);

    $("#ddlStyle").val(0).trigger('change');
    $("#ddlOrderNo").val(0).trigger('change');
    $("#ddlrefno").val(0).trigger('change');
    $("#ddlGrpProcess").val(0).trigger('change');
    $("#ddlWorkOrderNo").val(0).trigger('change');
    $("#ddlProcess").val('').trigger('change');
    $('#ddlOrderNo').siblings(".select2-container").css('border', '1px solid lightgrey');
    $('#ddlWorkOrderNo').siblings(".select2-container").css('border', '1px solid lightgrey');
    $('#ddlStyle').siblings(".select2-container").css('border', '1px solid lightgrey');
    $('#txtEntryno').css('border-color', 'lightgrey');
    $('#txtProdpgmno').css('border-color', 'lightgrey');

    IpitemList = [];
    OpitemList = [];
    Ipitemsavelist = [];
    Opitemsavelist = [];
    ProcSeq = [];
    loadInputitemtable(IpitemList);
    loadOutputitemtable(OpitemList);
    loadInputitemsavetable(Ipitemsavelist);
    loadOutputitemsavetable(Opitemsavelist);

}

function LoadPgmProcess() {
    debugger;
    var procid = $('#ddlProcess').val();
    var Bmasid = $('#ddlOrderNo').val();
    var refid = $('#ddlrefno').val();
    var jobid = $('#ddlWorkOrderNo').val();
    var proc = MOrd;
    var closed = 'N';
    CheckPlanAmend($("#ddlWorkOrderNo option:selected").text());

    var foo = [];
    $('#ddlProcess :selected').each(function (i, selected) {
        foo.push($(selected).val());

    });
    var proobj = [];
    $.each(foo, function (i) {

        var obj = {
            Processid: foo[i]

        };
        proobj.push(obj);
    });


    var obj = {
        IpGrpdet: proobj,
    }
    LoadingSymb();
    $.ajax({
        url: "/GroupProcessOrder/AddGrpProc",
        data: JSON.stringify({ Procobj: obj, procid: proc }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            debugger;
             grpprocessid = result.Value;
            ProcessDropdown();
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

    $.ajax({
        url: "/GroupProcessOrder/LoadInputitmsgrid",
        data: JSON.stringify({ closed: closed, jobordno: jobid, procid: proc }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            debugger;
            IpitemList = result.Value;
            var foo = [];
            $('#ddlProcess :selected').each(function (i, selected) {
                foo.push($(selected).val());

            });
            var ipsave = [];
            for (var j = 0; foo.length > j; j++) {
                $.each(IpitemList, function (i) {
                    if (IpitemList[i].Processid == foo[j]) {
                        ipsave.push(IpitemList[i]);

                    }
                });
            }
            IpitemList = ipsave;
            loadInputitemtable(IpitemList);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });


    $.ajax({
        url: "/GroupProcessOrder/LoadOutputitmsgrid",
        data: JSON.stringify({ closed: closed, jobordno: jobid, procid: proc }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            debugger;
            OpitemList = result.Value;
            var foo = [];
            $('#ddlProcess :selected').each(function (i, selected) {
                foo.push($(selected).val());

            });
            var opsave = [];
            for (var j = 0; foo.length > j; j++) {
                $.each(OpitemList, function (i) {
                    if (OpitemList[i].Processid == foo[j]) {
                        opsave.push(OpitemList[i]);

                    }
                });
            }
            OpitemList = opsave;
            loadOutputitemtable(OpitemList);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}

function myProcess(Val) {
    debugger;
    var foo = [];
    MOrd = 0;
    $('#ddlProcess :selected').each(function (i, selected) {
        foo[i] = $(selected).val();

        MOrd = MOrd + "," + foo[i];


    });

}

function CMainlist() {

}

function loadInputitemtable(IpitemList) {
    debugger;
    // $('#tblcompdetails').DataTable().destroy();
    var inputcount = 0;
    $('#inputitmtab tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#inputitmtab').DataTable().destroy();
    }
    $('#inputitmtab').empty();

    $('#inputitmtab').DataTable({
        //'bSortable': false,
        //'aTargets' : [ 7, 8 ],
        data: IpitemList,
        scrollY: 300,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        "bSort": false,
        //"rowCallback": function (row, data, index) {
        //    if (data.Rate > "0") {
        //        $('td', row).css('background-color', '#FCF3CF');
        //        //$('#btntrimsedit').attr('disabled', 'disabled');
        //        $('td', row)[5] = '';
        //    }

        //},
        columns: [
             //{ title: "Trims SlNo", data: "TrimsSlNo", "visible": false },
            { title: "GrpmasID", data: "GrpProdPrgid", "visible": false },
            { title: "ipdetid", data: "GrpProdPgmdetid", "visible": false },
            { title: "ProdPrgid", data: "Prodprgid", "visible": false },
            { title: "prod pgm no", data: "ProdPrgNo" },
            //{ title: "prgdetid", data: "prgdetid", "visible": false },
            { title: "Processid", data: "Processid", "visible": false },
            { title: "Process", data: "Process" },
            { title: "Itemid", data: "Itemid", "visible": false },
            { title: "Ip Item", data: "Item" },
            { title: "Colorid", data: "Colorid", "visible": false },
            { title: "Color", data: "Color" },
            { title: "Sizeid", data: "Sizeid", "visible": false },
            { title: "Size", data: "Size" },
             { title: "Prog Qty", data: "Prog_Op_Qty" },
              { title: "Bal Qty", data: "BalanceQty" },
                  {
                      title: "Grp Qty", data: "GrpQty",
                      render: function (data) {

                          return '<input type="text" id="txtipGrpqty" class="txtipGrpqty form-control"  style="width: 80px;text-align: center;" value=' + data + ' >';

                      },
                  },
               //{
               //    title: "ACTION", "mDataProp": null,

               //    "render": function (data, type, row, meta) {
               //        //if (data.Rate > "0") {
               //        //    return '<div style="display:inline-flex"><button type="button" disabled="disabled" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" id="btntrimsedit" class="btntrimsedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" disabled="disabled" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btntrimsremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div>'
               //    //} else {
               //        return '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" id="btntrimsedit" class="btntrimsedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btntrimsremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div>' }
               //    //}


               //}
        ]
    });


    $("#inputitmtab tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#inputitmtab tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}

function loadOutputitemtable(OpitemList) {
    debugger;
    // $('#tblcompdetails').DataTable().destroy();
    var inputcount = 0;
    $('#outputitmtab tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#outputitmtab').DataTable().destroy();
    }
    $('#outputitmtab').empty();

    $('#outputitmtab').DataTable({
        //'bSortable': false,
        //'aTargets' : [ 7, 8 ],
        data: OpitemList,
        scrollY: 300,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        "bSort": false,
        //"rowCallback": function (row, data, index) {
        //    if (data.Rate > "0") {
        //        $('td', row).css('background-color', '#FCF3CF');
        //        //$('#btntrimsedit').attr('disabled', 'disabled');
        //        $('td', row)[5] = '';
        //    }

        //},
        columns: [
             //{ title: "Trims SlNo", data: "TrimsSlNo", "visible": false },
           { title: "GrpmasID", data: "GrpProdPrgid", "visible": false },
            { title: "ipdetid", data: "GrpProdPgmdetid", "visible": false },
            { title: "ProdPrgid", data: "Prodprgid", "visible": false },
            { title: "prod pgm no", data: "ProdPrgNo" },
            //{ title: "prgdetid", data: "prgdetid", "visible": false },
            { title: "Processid", data: "Processid", "visible": false },
            { title: "Process", data: "Process" },
            { title: "Itemid", data: "Itemid", "visible": false },
            { title: "Ip Item", data: "Item" },
            { title: "Colorid", data: "Colorid", "visible": false },
            { title: "Color", data: "Color" },
            { title: "Sizeid", data: "Sizeid", "visible": false },
            { title: "Size", data: "Size" },
             { title: "Prog Qty", data: "Prog_Op_Qty" },
             
              { title: "Bal Qty", data: "BalanceQty" },
               { title: "Rate", data: "rate" },
                  {
                      title: "Grp Qty", data: "GrpQty",
                      render: function (data) {

                          return '<input type="text" id="txtopGrpqty" class="txtopGrpqty form-control"  style="width: 80px;text-align: center;" value=' + data + ' >';

                      },
                  },
               //{
               //    title: "ACTION", "mDataProp": null,

               //    "render": function (data, type, row, meta) {
               //        //if (data.Rate > "0") {
               //        //    return '<div style="display:inline-flex"><button type="button" disabled="disabled" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" id="btntrimsedit" class="btntrimsedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" disabled="disabled" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btntrimsremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div>'
               //    //} else {
               //        return '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" id="btntrimsedit" class="btntrimsedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btntrimsremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div>' }
               //    //}


               //}
        ]
    });


    $("#outputitmtab tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#outputitmtab tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}

function loadInputitemsavetable(Ipitemsavelist) {
    debugger;
    // $('#tblcompdetails').DataTable().destroy();
    var inputcount = 0;
    $('#inputsavetab tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#inputsavetab').DataTable().destroy();
    }
    $('#inputsavetab').empty();

    $('#inputsavetab').DataTable({
        //'bSortable': false,
        //'aTargets' : [ 7, 8 ],
        data: Ipitemsavelist,
        scrollY: 300,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        "bSort": false,
        //"rowCallback": function (row, data, index) {
        //    if (data.Rate > "0") {
        //        $('td', row).css('background-color', '#FCF3CF');
        //        //$('#btntrimsedit').attr('disabled', 'disabled');
        //        $('td', row)[5] = '';
        //    }

        //},
        columns: [
             //{ title: "Trims SlNo", data: "TrimsSlNo", "visible": false },
         //{ title: "GrpmasID", data: "GrpProdPrgid", "visible": false },
            //{ title: "ipdetid", data: "GrpProdPgmdetid", "visible": false },
            { title: "ProdPrgid", data: "Prodprgid", "visible": false },
            { title: "prod pgm no", data: "ProdPrgNo" },
            { title: "prgdetid", data: "Prodprgdetid", "visible": false },
            { title: "Processid", data: "Processid", "visible": false },
            { title: "Process", data: "Process" },
            { title: "Itemid", data: "Itemid", "visible": false },
            { title: "Ip Item", data: "Item" },
            { title: "Colorid", data: "Colorid", "visible": false },
            { title: "Color", data: "Color" },
            { title: "Sizeid", data: "Sizeid", "visible": false },
            { title: "Size", data: "Size" },
             { title: "Prog Qty", data: "Prog_Op_Qty" },
              { title: "Bal Qty", data: "BalanceQty", "visible": false },
              { title: "Grp Qty", data: "GrpQty" ,"visible": false},
                  {
                      title: "Rate", data: "rate", "visible": false,
                      render: function (data) {

                          return '<input type="text" id="txtiprate" class="txtiprate form-control"  style="width: 80px;text-align: center;" value=' + data + ' >';

                      },
                  },
               //{
               //    title: "ACTION", "mDataProp": null,

               //    "render": function (data, type, row, meta) {
               //        //if (data.Rate > "0") {
               //        //    return '<div style="display:inline-flex"><button type="button" disabled="disabled" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" id="btntrimsedit" class="btntrimsedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" disabled="disabled" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btntrimsremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div>'
               //    //} else {
               //        return '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" id="btntrimsedit" class="btntrimsedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btntrimsremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div>' }
               //    //}


               //}
        ]
    });


    $("#inputsavetab tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#inputsavetab tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}

function loadOutputitemsavetable(Opitemsavelist) {
    debugger;
    // $('#tblcompdetails').DataTable().destroy();
    var inputcount = 0;
    $('#outputsavetab tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#outputsavetab').DataTable().destroy();
    }
    $('#outputsavetab').empty();

    $('#outputsavetab').DataTable({
        //'bSortable': false,
        //'aTargets' : [ 7, 8 ],
        data: Opitemsavelist,
        scrollY: 300,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        "bSort": false,
        //"rowCallback": function (row, data, index) {
        //    if (data.Rate > "0") {
        //        $('td', row).css('background-color', '#FCF3CF');
        //        //$('#btntrimsedit').attr('disabled', 'disabled');
        //        $('td', row)[5] = '';
        //    }

        //},
        columns: [
             //{ title: "Trims SlNo", data: "TrimsSlNo", "visible": false },
           //{ title: "GrpmasID", data: "GrpProdPrgid", "visible": false },
           // { title: "ipdetid", data: "GrpProdPgmdetid", "visible": false },
            { title: "ProdPrgid", data: "Prodprgid", "visible": false },
            { title: "prod pgm no", data: "ProdPrgNo" },
            { title: "prgdetid", data: "Prodprgdetid", "visible": false },
            { title: "Processid", data: "Processid", "visible": false },
            { title: "Process", data: "Process" },
            { title: "Itemid", data: "Itemid", "visible": false },
            { title: "Ip Item", data: "Item" },
            { title: "Colorid", data: "Colorid", "visible": false },
            { title: "Color", data: "Color" },
            { title: "Sizeid", data: "Sizeid", "visible": false },
            { title: "Size", data: "Size" },
             { title: "Prog Qty", data: "Prog_Op_Qty" },
              { title: "Bal Qty", data: "BalanceQty", "visible": false },
               { title: "Grp Qty", data: "GrpQty", "visible": false },
                  {
                      title: "Rate", data: "rate",
                      render: function (data) {

                          return '<input type="text" id="txtoprate" class="txtoprate form-control"  style="width: 80px;text-align: center;" value=' + data + ' >';

                      },
                  },
               //{
               //    title: "ACTION", "mDataProp": null,

               //    "render": function (data, type, row, meta) {
               //        //if (data.Rate > "0") {
               //        //    return '<div style="display:inline-flex"><button type="button" disabled="disabled" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" id="btntrimsedit" class="btntrimsedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" disabled="disabled" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btntrimsremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div>'
               //    //} else {
               //        return '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" id="btntrimsedit" class="btntrimsedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btntrimsremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div>' }
               //    //}


               //}
        ]
    });


    $("#outputsavetab tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#outputsavetab tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}

function LoadGroupProc() {
    debugger;
    if (Mode == 0) {
        var ipproc = 0;
        var opproc = 0;
        var foo = [];

        $('#ddlProcess :selected').each(function (i, selected) {
            foo.push($(selected).val());

        });
        var last = foo.length - 1;
        $.each(foo, function (i) {
            if (i == 0) {
                ipproc = foo[i];

            }
            if (i == last) {
                opproc = foo[i];
            }
        });

        var ipsave = [];
        $.each(IpitemList, function (i) {
            if (IpitemList[i].Processid == ipproc && IpitemList[i].GrpQty >0) {
                ipsave.push(IpitemList[i]);

            }
        });

        var iprate = 0;
        //$.each(OpitemList, function (i) {
        //    if (OpitemList[i].Processid == ipproc) {
        //        iprate = iprate + parseFloat(OpitemList[i].rate);

        //    }
        //});

        $.each(ipsave, function (i) {
            this.rate = iprate;
        });

        var oprate = 0;
        //$.each(OpitemList, function (i) {
        //    var value = (parseFloat(OpitemList[i].rate) * parseFloat(OpitemList[i].GrpQty));
        //    oprate = oprate + parseFloat(value);
        //});

        $.each(OpitemList, function (i) {
            var value = (parseFloat(OpitemList[i].rate) );
            oprate = oprate + parseFloat(value);
        });


        var opsave = [];
        $.each(OpitemList, function (i) {
            if (OpitemList[i].Processid == opproc && OpitemList[i].rate > 0 && OpitemList[i].GrpQty > 0) {
                opsave.push(OpitemList[i]);
            }
        });

        var grpqty = 0;
        $.each(opsave, function (i) {
            grpqty = grpqty + parseFloat(opsave[i].GrpQty);
        });

        //var grprate = 0
        //grprate = parseFloat(oprate) / parseFloat(grpqty);

        var grprate = 0
        grprate = parseFloat(oprate) ;

        //$.each(opsave, function (i) {
        //    this.rate = parseFloat(grprate).toFixed(3);
        //});


        Ipitemsavelist = [];
        Opitemsavelist = [];

        for (var i = 0; ipsave.length > i; i++) {
            var obj = {
                Itemid: ipsave[i].Itemid,
                Item: ipsave[i].Item,
                Colorid: ipsave[i].Colorid,
                Color: ipsave[i].Color,
                Sizeid: ipsave[i].Sizeid,
                Size: ipsave[i].Size,
                BalanceQty: ipsave[i].GrpQty,
                Prog_Op_Qty: ipsave[i].GrpQty,
                InorOut: ipsave[i].InorOut,
                rate: ipsave[i].rate,

                Prodprgdetid: 0,
                Processid: ipsave[i].Processid,
                Process: ipsave[i].Process,
                Prodprgid: ipsave[i].Prodprgid,
                ProdPrgNo: ipsave[i].ProdPrgNo,
                GrpQty: 0,
                GrpProdPrgid: 0,
                GrpProdPgmdetid: 0,
                //Prodprgdetid: ipsave[i].prgdetid,
            }

            Ipitemsavelist.push(obj);
        }

        for (var i = 0; opsave.length > i; i++) {
            var obj = {
                //Itemid: opsave[i].itmid,
                //item: opsave[i].itm,
                //Colorid: opsave[i].clrid,
                //color: opsave[i].clr,
                //Sizeid: opsave[i].sizeid,
                //size: opsave[i].size,
                //sno: opsave[i].sno,
                //BalanceQty: opsave[i].bal,
                //Prog_Op_Qty: opsave[i].prgopqty,
                //inrout: opsave[i].inrout,
                //isdeci: opsave[i].isdeci,
                //rate: opsave[i].rate,
                //issqty: 0,
                //secqty: 0,
                //plansize: opsave[i].plansize,
                //plansizeid: opsave[i].plansizeid,
                //processid: opsave[i].procissid,
                //process: opsave[i].process,
                //Prodprgid: opsave[i].ProdPrgid,
                //prodno: opsave[i].ProdPrgNo,
                //Grpqty: opsave[i].Grpqty,
                //GrpmasID: 0,
                //ipdetid: 0,
                Itemid: opsave[i].Itemid,
                Item: opsave[i].Item,
                Colorid: opsave[i].Colorid,
                Color: opsave[i].Color,
                Sizeid: opsave[i].Sizeid,
                Size: opsave[i].Size,
                BalanceQty: opsave[i].GrpQty,
                Prog_Op_Qty: opsave[i].GrpQty,
                InorOut: opsave[i].InorOut,
                rate: opsave[i].Grprate,

                Prodprgdetid: 0,
                Processid: opsave[i].Processid,
                Process: opsave[i].Process,
                Prodprgid: opsave[i].Prodprgid,
                ProdPrgNo: opsave[i].ProdPrgNo,
                GrpQty: 0,
                GrpProdPrgid: 0,
                GrpProdPgmdetid: 0,
                //Prodprgdetid: opsave[i].prgdetid,
            }

            Opitemsavelist.push(obj);
        }



        //Ipitemsavelist = ipsave;
        //Opitemsavelist = opsave;
        //$.each(Opitemsavelist, function (i) {
        //    this.rate = parseFloat(grprate).toFixed(3);
        //});



        var gprocessid = $("#ddlGrpProcess option:selected").val();
        if (gprocessid == 0) {
            //alert('Please select GroupProcess');
            var msg = 'Please select GroupProcess...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return false;
        }

        var gprocess = $("#ddlGrpProcess option:selected").text();
        var PgmNo = $('#txtProdpgmno').val();


        $.each(Ipitemsavelist, function (i) {
            this.Processid = gprocessid;
            this.Process = gprocess;
            this.ProdPrgNo = PgmNo;
        });
        $.each(Opitemsavelist, function (i) {
            this.Processid = gprocessid;
            this.Process = gprocess;
            this.ProdPrgNo = PgmNo;
        });


        loadInputitemsavetable(Ipitemsavelist);
        loadOutputitemsavetable(Opitemsavelist);
    }
    if (Mode == 1) {

        for (var i = 0; Ipitemsavelist.length > i; i++) {
            for (var j = 0; IpitemList.length > j; j++) {
                if (Ipitemsavelist[i].Itemid == IpitemList[j].Itemid && Ipitemsavelist[i].Colorid == IpitemList[j].Colorid && Ipitemsavelist[i].Sizeid == IpitemList[j].Sizeid) {
                    // Ipitemsavelist[i].BalanceQty = IpitemList[j].BalanceQty;
                    if (IpitemList[j].GrpQty > 0) {
                        Ipitemsavelist[i].GrpQty = 0;
                        Ipitemsavelist[i].BalanceQty = IpitemList[j].GrpQty;
                        Ipitemsavelist[i].Prog_Op_Qty = IpitemList[j].GrpQty;

                    }
                    else {
                        //alert('GrpQty should not equal to or less than 0..')
                        var msg = 'Group quantity should not equal to or less than 0...';
                        var flg = 4;
                        var mod = 1;
                        var url = "";
                        AlartMessage(msg, flg, mod, url);
                        return false;
                    }

                  
                }

            }
        }

        var oprate = 0;
        $.each(OpitemList, function (i) {
            var value = (parseFloat(OpitemList[i].rate) * parseFloat(OpitemList[i].GrpQty));
            oprate = oprate + parseFloat(value);
        });

        for (var i = 0; Opitemsavelist.length > i; i++) {
            for (var j = 0; OpitemList.length > j; j++) {
                if (Opitemsavelist[i].Itemid == OpitemList[j].Itemid && Opitemsavelist[i].Colorid == OpitemList[j].Colorid && Opitemsavelist[i].Sizeid == OpitemList[j].Sizeid) {
                    //Opitemsavelist[i].BalanceQty = OpitemList[j].BalanceQty;
                    if (OpitemList[j].GrpQty > 0) {
                        Opitemsavelist[i].GrpQty = 0;
                        Opitemsavelist[i].BalanceQty = OpitemList[j].GrpQty;
                        Opitemsavelist[i].Prog_Op_Qty = OpitemList[j].GrpQty;
                    } else {
                        //alert('GrpQty should not equal to or less than 0..')
                        var msg = 'Group quantity should not equal to or less than 0...';
                        var flg = 4;
                        var mod = 1;
                        var url = "";
                        AlartMessage(msg, flg, mod, url);
                        return false;
                    }
                }

            }
        }

        //var grpqty = 0;
        //$.each(Opitemsavelist, function (i) {
        //    grpqty = grpqty + parseFloat(Opitemsavelist[i].GrpQty);
        //});

        //var grprate = 0
        //grprate = parseFloat(oprate) / parseFloat(grpqty);
        //$.each(Opitemsavelist, function (i) {
        //    this.rate = parseFloat(grprate).toFixed(3);
        //});

        loadInputitemsavetable(Ipitemsavelist);
        loadOutputitemsavetable(Opitemsavelist);
    }
}

function LoadOrderNo() {
    if (Mode == 0) {
        GenerateNumber();
    }
}

var table, column, compId, Docum;

function GenerateNumber(table, column, compId, Docum) {
    //CompanyId = $('#ddlCompany').val();
    debugger;
    table = "Prod_Prg_Mas",
    column = "ProdPrgNo",
   // compId = CompanyId,
    Docum = 'PRODUCTION PROGRAM',

      compId = $('#ddlCompany').val();

    if (compId == null) {
        compId = DCompid;
    } else {
        compId = $('#ddlCompany').val();
    }


    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $('#txtProdpgmno').val(result.Value);
            // $('#txtprdprgnocomp').val(result.Value);
        }
    });

    table = "Group_Prod_Prg_Mas",
    column = "GrpProdPrgNo",
   // compId = CompanyId,
    Docum = 'MULTIPLE PRODUCTION PROGRAM',
      compId = $('#ddlCompany').val();

    if (compId == null) {
        compId = DCompid;
    } else {
        compId = $('#ddlCompany').val();
    }

    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $('#txtEntryno').val(result.Value);
        }
    });
}

function Save() {
    debugger;
    iplist = new Array();
    oplist = new Array();
    Datas = new Array();
    var validate = true;
    var ipgrpqty = 0;
    $.each(IpitemList, function (i) {
        ipgrpqty = ipgrpqty + parseFloat(IpitemList[i].GrpQty);
    });

    var opgrpqty = 0;
    $.each(OpitemList, function (i) {
        opgrpqty = opgrpqty + parseFloat(OpitemList[i].GrpQty);
    });

    if ($('#ddlStyle').val() == 0) {
        $('#ddlStyle').siblings(".select2-container").css('border', '1px solid red');
        validate = false;
    }
    else {
        $('#ddlStyle').siblings(".select2-container").css('border', '1px solid lightgrey');
    }
    if ($('#ddlOrderNo').val() == 0) {
        $('#ddlOrderNo').siblings(".select2-container").css('border', '1px solid red');
        validate = false;
    }
    else {
        $('#ddlOrderNo').siblings(".select2-container").css('border', '1px solid lightgrey');
    }
    if ($('#ddlWorkOrderNo').val() == 0) {
        $('#ddlWorkOrderNo').siblings(".select2-container").css('border', '1px solid red');
        validate = false;
    }
    else {
        $('#ddlWorkOrderNo').siblings(".select2-container").css('border', '1px solid lightgrey');
    }

    if ($('#txtEntryno').val() == "") {
        validate = false;
        $('#txtEntryno').css('border-color', 'Red');
    }
    else {
        $('#txtEntryno').css('border-color', 'lightgrey');
    }
    if ($('#txtProdpgmno').val() == "") {
        validate = false;
        $('#txtProdpgmno').css('border-color', 'Red');
    }
    else {
        $('#txtProdpgmno').css('border-color', 'lightgrey');
    }

    if (ipgrpqty != opgrpqty) {
        //alert('Input GrpQty and Output GrpQty should be same..');
        var msg = 'Input Group quantity and Output Group quantity should be same...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        validate = false;
    }

    for (var c = 0; c < Ipitemsavelist.length; c++) {
        var list = {
            Prodprgdetid: Ipitemsavelist[c].Prodprgdetid,
            Prodprgid: Ipitemsavelist[c].Prodprgid,
            Prog_Op_Qty: Ipitemsavelist[c].Prog_Op_Qty,
            BalanceQty: Ipitemsavelist[c].BalanceQty,
            //ActualPlan_Qty: iputlist[c].Quantity,//$(tr).find('td:eq(7)').text(),
            AltItem: 'N',
            Amended: 'Y',
            Issue_qty: 0.00,
            order_qty: 0.00,
            Itemid: Ipitemsavelist[c].Itemid, // $(tr).find('td:eq(0)').text()
            Colorid: Ipitemsavelist[c].Colorid,//$(tr).find('td:eq(1)').text(),
            Sizeid: Ipitemsavelist[c].Sizeid,// $(tr).find('td:eq(2)').text(),
            InorOut: "I",
            GrpQty: Ipitemsavelist[c].GrpQty,
            rate: 0,
            //SecQty: iputlist[c].SecQty,//$(tr).find('td:eq(8)').text(),
            // CatType: iputlist[c].Type,// $(tr).find('td:eq(9)').text(),
            //Required: iputlist[c].Required,//1

        }
        iplist.push(list);
    }
    //oputlist = [];
    //oputlist = outputlist;
    for (var c = 0; c < Opitemsavelist.length; c++) {
        var list = {
            Prodprgdetid: Opitemsavelist[c].Prodprgdetid,
            Prodprgid: Opitemsavelist[c].Prodprgid,
            Prog_Op_Qty: Opitemsavelist[c].Prog_Op_Qty,
            BalanceQty: Opitemsavelist[c].BalanceQty,
            //ActualPlan_Qty: iputlist[c].Quantity,//$(tr).find('td:eq(7)').text(),
            AltItem: 'N',
            Amended: 'Y',
            Issue_qty: 0.00,
            order_qty: 0.00,
            Itemid: Opitemsavelist[c].Itemid, // $(tr).find('td:eq(0)').text()
            Colorid: Opitemsavelist[c].Colorid,//$(tr).find('td:eq(1)').text(),
            Sizeid: Opitemsavelist[c].Sizeid,// $(tr).find('td:eq(2)').text(),
            InorOut: "O",
            GrpQty: Opitemsavelist[c].GrpQty,
            rate: Opitemsavelist[c].rate,
            //SecQty: iputlist[c].SecQty,//$(tr).find('td:eq(8)').text(),
            // CatType: iputlist[c].Type,// $(tr).find('td:eq(9)').text(),
            //Required: iputlist[c].Required,//1

        }
        oplist.push(list);
    }


    if (iplist.length == 0) {
        //alert('Please Check Input program');
        var msg = 'Please Check Input program...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        validate = false;
    }
    if (oplist.length == 0) {
        var msg = 'Please Check Output program...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        //alert('Please Check Onput program');
        validate = false;
    }

    IpitemList = $.grep(IpitemList, function (v) {
        return (v.GrpQty >0);
    });
    OpitemList = $.grep(OpitemList, function (v) {
        return (v.GrpQty > 0);
    });

    var oldEntryno = $('#txtEntryno').val();
    debugger;
    var table = "Group_Prod_Prg_Mas";
    var column = "GrpProdPrgNo";
    var compId = $('#ddlCompany').val();
    var Docum = 'MULTIPLE PRODUCTION PROGRAM';
    

    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var newentryno = result.Value;
            if (oldEntryno != newentryno) {
                //alert('Entry No has been changed...');
                var msg = 'Entry Number has been changed...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                $('#txtEntryno').val(result.Value);
            }
            debugger;
            var oldprodprgno = $('#txtProdpgmno').val();

            var table = "Prod_Prg_Mas";
            var column = "ProdPrgNo";
            var compId = $('#ddlCompany').val();
            var Docum = 'PRODUCTION PROGRAM';
             
            $.ajax({
                url: "/BulkOrder/GenerateNo",
                data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
                type: "POST",
                contentType: "application/json;charset=UTF-8",
                dataType: "json",
                success: function (result) {
                    debugger;
                    var newprodprgno = result.Value;
                    if (oldprodprgno != newprodprgno) {
                        //alert('Prod Prg No has been changed...');
                        var msg = 'Production Program Number has been changed...';
                        var flg = 4;
                        var mod = 1;
                        var url = "";
                        AlartMessage(msg, flg, mod, url);
                        $('#txtProdpgmno').val(result.Value);
                    }

                    var obj = {
                        GrpProdPrgid: 0,
                        GrpProdPrgNo: $('#txtEntryno').val(),
                        ProdPrgid: 0,
                        Styleid: $("#ddlStyle option:selected").val(),
                        Buy_Ord_MasId: $("#ddlOrderNo option:selected").val(),
                        ProdPrgNo: $('#txtProdpgmno').val(),
                        GrpProgDate: $('#txtEntrydate').val(),
                        GrpProcessid: $("#ddlGrpProcess option:selected").val(),
                        //ProcessId: prodplanningList.ProcessId,
                        Job_ord_no: $("#ddlWorkOrderNo option:selected").text(),
                        //companyunitid: CompanyUnitId,
                        //companyid: CompanyId,


                        Companyid: $("#ddlCompany option:selected").val(),

                        //OrderType: Ordertype,// Ordertype,//$('#optworkorder').val(),
                        //ProgramType: Gp,//Programtype,//$('#txtprocess').val()
                        IpGrpdet: IpitemList,
                        OpGrpdet: OpitemList,
                        ProdListInputDetails: iplist,
                        ProdListOutputtDetails: oplist,
                        // Closed:'N',
                        //IsProportion: 'N',
                        Prog_Seq_No: 1,
                        //remarks: $('#remarksli').val(),
                        Amend: 'N',
                        Approved: 'N',
                        CreatedBy: Guserid,
                        ApprovedBy: Guserid,
                        FinalizeAutoPost: 'Y',
                        //ProdRemDetails: remarks
                    }

                    if (validate) {
                        $("#btnAdd").attr("disabled", true);
                        LoadingSymb();

                        $.ajax({
                            url: "/GroupProcessOrder/AddProdMas",
                            data: JSON.stringify(obj),
                            type: "POST",
                            contentType: "application/json;charset=utf-8",
                            dataType: "json",
                            success: function (result) {
                                debugger;
                                //$('#myModal').modal('hide');

                                if (result.Value == 1) {
                                    AddUserEntryLog('PROCESS', 'Group Process Order', 'ADD', $("#ddlOrderNo").val());
                                    //alert('Data Saved Successfully');
                                    //window.location.href = "/GroupProcessOrder/GroupProcessOrderIndex";
                                    var msg = 'Data Saved Successfully...';
                                    var flg = 1;
                                    var mod = 0;
                                    var url = "/GroupProcessOrder/GroupProcessOrderIndex";
                                    AlartMessage(msg, flg, mod, url);

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
            });
        }
    });
}

function Update() {
    debugger;
    iplist = new Array();
    oplist = new Array();
    Datas = new Array();

    var validate = true;
    var ipgrpqty = 0;
    $.each(IpitemList, function (i) {
        ipgrpqty = ipgrpqty + parseFloat(IpitemList[i].GrpQty);
    });

    var opgrpqty = 0;
    $.each(OpitemList, function (i) {
        opgrpqty = opgrpqty + parseFloat(OpitemList[i].GrpQty);
    });

    if ($('#ddlStyle').val() == 0) {
        $('#ddlStyle').siblings(".select2-container").css('border', '1px solid red');
        validate = false;
    }
    else {
        $('#ddlStyle').siblings(".select2-container").css('border', '1px solid lightgrey');
    }
    if ($('#ddlOrderNo').val() == 0) {
        $('#ddlOrderNo').siblings(".select2-container").css('border', '1px solid red');
        validate = false;
    }
    else {
        $('#ddlOrderNo').siblings(".select2-container").css('border', '1px solid lightgrey');
    }
    if ($('#ddlWorkOrderNo').val() == 0) {
        $('#ddlWorkOrderNo').siblings(".select2-container").css('border', '1px solid red');
        validate = false;
    }
    else {
        $('#ddlWorkOrderNo').siblings(".select2-container").css('border', '1px solid lightgrey');
    }

    if (ipgrpqty != opgrpqty) {
        var msg = 'Input Group quantity and Output Group quantity should be same...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        //alert('Input GrpQty and Output GrpQty should be same..');
        validate = false;
    }


    for (var c = 0; c < Ipitemsavelist.length; c++) {
        var list = {
            Prodprgdetid: Ipitemsavelist[c].Prodprgdetid,
            Prodprgid: Ipitemsavelist[c].Prodprgid,
            Prog_Op_Qty: Ipitemsavelist[c].Prog_Op_Qty,
            BalanceQty: Ipitemsavelist[c].BalanceQty,
            //ActualPlan_Qty: iputlist[c].Quantity,//$(tr).find('td:eq(7)').text(),
            AltItem: 'N',
            Amended: 'Y',
            Issue_qty: 0.00,
            order_qty: 0.00,
            Itemid: Ipitemsavelist[c].Itemid, // $(tr).find('td:eq(0)').text()
            Colorid: Ipitemsavelist[c].Colorid,//$(tr).find('td:eq(1)').text(),
            Sizeid: Ipitemsavelist[c].Sizeid,// $(tr).find('td:eq(2)').text(),
            InorOut: "I",
            GrpQty: Ipitemsavelist[c].GrpQty,
            //SecQty: iputlist[c].SecQty,//$(tr).find('td:eq(8)').text(),
            // CatType: iputlist[c].Type,// $(tr).find('td:eq(9)').text(),
            //Required: iputlist[c].Required,//1

        }
        iplist.push(list);
    }

    for (var c = 0; c < Opitemsavelist.length; c++) {
        var list = {
            Prodprgdetid: Opitemsavelist[c].Prodprgdetid,
            Prodprgid: Opitemsavelist[c].Prodprgid,
            Prog_Op_Qty: Opitemsavelist[c].Prog_Op_Qty,
            BalanceQty: Opitemsavelist[c].BalanceQty,
            //ActualPlan_Qty: iputlist[c].Quantity,//$(tr).find('td:eq(7)').text(),
            AltItem: 'N',
            Amended: 'Y',
            Issue_qty: 0.00,
            order_qty: 0.00,
            Itemid: Opitemsavelist[c].Itemid, // $(tr).find('td:eq(0)').text()
            Colorid: Opitemsavelist[c].Colorid,//$(tr).find('td:eq(1)').text(),
            Sizeid: Opitemsavelist[c].Sizeid,// $(tr).find('td:eq(2)').text(),
            InorOut: "O",
            GrpQty: Opitemsavelist[c].GrpQty,
            rate: Opitemsavelist[c].rate,
            //SecQty: iputlist[c].SecQty,//$(tr).find('td:eq(8)').text(),
            // CatType: iputlist[c].Type,// $(tr).find('td:eq(9)').text(),
            //Required: iputlist[c].Required,//1

        }
        oplist.push(list);
    }


    var obj = {
        GrpProdPrgid: Groupmasid,
        GrpProdPrgNo: $('#txtEntryno').val(),
        ProdPrgid: Prodmasid,
        Styleid: $("#ddlStyle option:selected").val(),
        Buy_Ord_MasId: $("#ddlOrderNo option:selected").val(),
        ProdPrgNo: $('#txtProdpgmno').val(),
        GrpProgDate: $('#txtEntrydate').val(),
        GrpProcessid: $("#ddlGrpProcess option:selected").val(),
        //ProcessId: prodplanningList.ProcessId,
        Job_ord_no: $("#ddlWorkOrderNo option:selected").text(),
        //companyunitid: CompanyUnitId,
        //companyid: CompanyId,


        Companyid: $("#ddlCompany option:selected").val(),

        //OrderType: Ordertype,// Ordertype,//$('#optworkorder').val(),
        //ProgramType: Gp,//Programtype,//$('#txtprocess').val()
        IpGrpdet: IpitemList,
        OpGrpdet: OpitemList,
        ProdListInputDetails: iplist,
        ProdListOutputtDetails: oplist,
        // Closed:'N',
        //IsProportion: 'N',
        Prog_Seq_No: 1,
        //remarks: $('#remarksli').val(),
        Amend: 'N',
        Approved: 'N',
        CreatedBy: Guserid,
        ApprovedBy: Guserid,
        FinalizeAutoPost: 'Y',
        //ProdRemDetails: remarks
    }

    if (validate) {
        $("#btnUpdate").attr("disabled", true);
        LoadingSymb();

        $.ajax({
            url: "/GroupProcessOrder/UpdateProdMas",
            data: JSON.stringify(obj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                debugger;
                //$('#myModal').modal('hide');

                if (result.Value == 1) {
                    AddUserEntryLog('PROCESS', 'Group Process Order', 'UPDATE', $("#ddlOrderNo").val());
                    //alert('Data Updated Successfully');
                    //window.location.href = "/GroupProcessOrder/GroupProcessOrderIndex";
                    var msg = 'Data Updated Successfully...';
                    var flg = 1;
                    var mod = 0;
                    var url = "/GroupProcessOrder/GroupProcessOrderIndex";
                    AlartMessage(msg, flg, mod, url);

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

function Delete() {
    debugger;
    iplist = new Array();
    oplist = new Array();
    Datas = new Array();

    for (var c = 0; c < Ipitemsavelist.length; c++) {
        var list = {
            Prodprgdetid: Ipitemsavelist[c].Prodprgdetid,
            Prodprgid: Ipitemsavelist[c].Prodprgid,
            Prog_Op_Qty: Ipitemsavelist[c].Prog_Op_Qty,
            //ActualPlan_Qty: iputlist[c].Quantity,//$(tr).find('td:eq(7)').text(),
            AltItem: 'N',
            Amended: 'Y',
            Issue_qty: 0.00,
            order_qty: 0.00,
            Itemid: Ipitemsavelist[c].Itemid, // $(tr).find('td:eq(0)').text()
            Colorid: Ipitemsavelist[c].Colorid,//$(tr).find('td:eq(1)').text(),
            Sizeid: Ipitemsavelist[c].Sizeid,// $(tr).find('td:eq(2)').text(),
            InorOut: "I",
            GrpQty: Ipitemsavelist[c].GrpQty,
            //SecQty: iputlist[c].SecQty,//$(tr).find('td:eq(8)').text(),
            // CatType: iputlist[c].Type,// $(tr).find('td:eq(9)').text(),
            //Required: iputlist[c].Required,//1

        }
        iplist.push(list);
    }

    for (var c = 0; c < Opitemsavelist.length; c++) {
        var list = {
            Prodprgdetid: Opitemsavelist[c].Prodprgdetid,
            Prodprgid: Opitemsavelist[c].Prodprgid,
            Prog_Op_Qty: Opitemsavelist[c].Prog_Op_Qty,
            //ActualPlan_Qty: iputlist[c].Quantity,//$(tr).find('td:eq(7)').text(),
            AltItem: 'N',
            Amended: 'Y',
            Issue_qty: 0.00,
            order_qty: 0.00,
            Itemid: Opitemsavelist[c].Itemid, // $(tr).find('td:eq(0)').text()
            Colorid: Opitemsavelist[c].Colorid,//$(tr).find('td:eq(1)').text(),
            Sizeid: Opitemsavelist[c].Sizeid,// $(tr).find('td:eq(2)').text(),
            InorOut: "O",
            GrpQty: Opitemsavelist[c].GrpQty,
            rate: Opitemsavelist[c].rate,
            //SecQty: iputlist[c].SecQty,//$(tr).find('td:eq(8)').text(),
            // CatType: iputlist[c].Type,// $(tr).find('td:eq(9)').text(),
            //Required: iputlist[c].Required,//1

        }
        oplist.push(list);
    }


    var obj = {
        GrpProdPrgid: Groupmasid,
        GrpProdPrgNo: $('#txtEntryno').val(),
        ProdPrgid: Prodmasid,
        Styleid: $("#ddlStyle option:selected").val(),
        Buy_Ord_MasId: $("#ddlOrderNo option:selected").val(),
        ProdPrgNo: $('#txtProdpgmno').val(),
        GrpProgDate: $('#txtEntrydate').val(),
        GrpProcessid: $("#ddlGrpProcess option:selected").val(),
        //ProcessId: prodplanningList.ProcessId,
        Job_ord_no: $("#ddlWorkOrderNo option:selected").text(),
        //companyunitid: CompanyUnitId,
        //companyid: CompanyId,


        Companyid: $("#ddlCompany option:selected").val(),

        //OrderType: Ordertype,// Ordertype,//$('#optworkorder').val(),
        //ProgramType: Gp,//Programtype,//$('#txtprocess').val()
        IpGrpdet: IpitemList,
        OpGrpdet: OpitemList,
        ProdListInputDetails: iplist,
        ProdListOutputtDetails: oplist,
        // Closed:'N',
        //IsProportion: 'N',
        Prog_Seq_No: 1,
        //remarks: $('#remarksli').val(),
        Amend: 'N',
        Approved: 'N',
        CreatedBy: Guserid,
        ApprovedBy: Guserid,
        FinalizeAutoPost: 'Y',
        //ProdRemDetails: remarks
    }

    $("#btnDelete").attr("disabled", true);
    LoadingSymb();

    $.ajax({
        url: "/GroupProcessOrder/DeleteProdMas",
        data: JSON.stringify(obj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            //$('#myModal').modal('hide');

            if (result.Value == 1) {
                AddUserEntryLog('PROCESS', 'Group Process Order', 'DELETE', $("#ddlOrderNo").val());
                //alert('Data Deleted Successfully');
                //window.location.href = "/GroupProcessOrder/GroupProcessOrderIndex";
                var msg = 'Data Deleted Successfully...';
                var flg = 2;
                var mod = 0;
                var url = "/GroupProcessOrder/GroupProcessOrderIndex";
                AlartMessage(msg, flg, mod, url);

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

function GetEditMas(Masid) {


    $.ajax({
        url: "/GroupProcessOrder/GetGrpProcMas",
        data: JSON.stringify({ masid: Masid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            debugger;
            maslist = result.Value;
            $('#txtEntryno').val(maslist[0].GrpProdPrgNo);
            $("#ddlStyle").val(maslist[0].Styleid).trigger('change');
            $("#ddlOrderNo").val(maslist[0].Buy_Ord_MasId).trigger('change');
            $("#ddlrefno").val(maslist[0].Buy_Ord_MasId).trigger('change');
            $("#ddlGrpProcess").val(maslist[0].GrpProcessid).trigger('change');
            $("#ddlWorkOrderNo").val(maslist[0].Jobid).trigger('change');
            $("#ddlCompany").val(maslist[0].Companyid).trigger('change');
            $('#txtProdpgmno').val(maslist[0].ProdPrgNo);
            $('#txtEntrydate').val(moment(maslist[0].GrpProgDate).format("DD/MM/YYYY"));
            $('#myModal1').modal('show');
            Groupmasid = maslist[0].GrpProdPrgid;
            Prodmasid = maslist[0].ProdPrgid;
            $("#ddlStyle").attr("disabled", true);
            $("#ddlOrderNo").attr("disabled", true);
            $("#ddlrefno").attr("disabled", true);
            $("#ddlGrpProcess").attr("disabled", true);
            $("#ddlWorkOrderNo").attr("disabled", true);
            $("#ddlCompany").attr("disabled", true);
            $("#txtProdpgmno").attr("disabled", true);
            $("#btnloadpgm").attr("disabled", true);
            $("#ddlProcess").attr("disabled", true);
            //$("#btnLoadGrpProc").attr("disabled", true);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });



}

function GetEditIpGrp(Masid) {


    $.ajax({
        url: "/GroupProcessOrder/GetIpGrpProc",
        data: JSON.stringify({ masid: Masid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            debugger;
            IpitemList = result.Value;
            loadInputitemtable(IpitemList);

            removIpitemListduplicateValue(IpitemList);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });



}

function removIpitemListduplicateValue(IpitemList) {
    debugger;
    var newArray = [];
    $.each(IpitemList, function (key, value) {
        var exists = false;
        var rate = 0;
        $.each(newArray, function (k, val2) {
            if (value.Processid == val2.Processid) { exists = true; };

        });

        if (exists == false && value.Processid != "") { newArray.push(value); }
    });

    ProcSeq = [];
    for (var c = 0; c < newArray.length; c++) {
        //var list = {
        //    Processid: newArray[c].Processid,

        //}
        ProcSeq.push(newArray[c].Processid);
    }

    $("#ddlProcess").val(ProcSeq);
}

function GetEditOpGrp(Masid) {


    $.ajax({
        url: "/GroupProcessOrder/GetOpGrpProc",
        data: JSON.stringify({ masid: Masid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            debugger;
            OpitemList = result.Value;
            loadOutputitemtable(OpitemList);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });



}

function GetEditIpPrgdet(Masid) {


    $.ajax({
        url: "/GroupProcessOrder/GetIpPrgdet",
        data: JSON.stringify({ masid: Masid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            debugger;
            Ipitemsavelist = result.Value;
            loadInputitemsavetable(Ipitemsavelist);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });



}

function GetEditOpPrgdet(Masid) {


    $.ajax({
        url: "/GroupProcessOrder/GetOpPrgdet",
        data: JSON.stringify({ masid: Masid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            debugger;
            Opitemsavelist = result.Value;
            loadOutputitemsavetable(Opitemsavelist);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });



}

function LoadMain() {
    debugger;
    var ordid = $("#ddlMBuyOrderNo").val();
    var refid = $("#ddlMRefNo").val();
    var Styid = $("#ddlMStyle").val();
    var procid = $("#ddlmainProcess").val();
    var Grpid = $("#ddlGrpPrgNo").val();
    var Frmdt = $("#txtFromDate").val();
    var Todt = $("#txtToDate").val();

    var menufilter = ordid + ',' + refid + ',' + Styid + ',' + procid + ',' + Grpid + ',' + Frmdt + ',' + Todt;
    localStorage.setItem('GroupProcessOrderMainFilter', menufilter);

    $.ajax({
        url: "/GroupProcessOrder/LoadMain",
        data: JSON.stringify({ Ordid: ordid, Refid: refid, Style: Styid, Process: procid, Groupid: Grpid, FDt: Frmdt, TDt: Todt }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            debugger;
            mainlist = result.Value;
            loadMaintable();

            var data = result.Value;


            $(ddlGrpPrgNo).empty();

            $(ddlGrpPrgNo).append($('<option/>').val('0').text('--Select GrpPrgNo--'));
            $.each(data, function () {
                $(ddlGrpPrgNo).append($('<option></option>').val(this.GrpProdPrgid).text(this.GrpProdPrgNo));
            });

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });



}

function LoadMainFromBack() {
    debugger;
    var fill = localStorage.getItem('GroupProcessOrderMainFilter');
    var fillobj = [];
    fillobj = fill.split(",");

    $('#txtFromDate').val(fillobj[5]);
    $('#txtToDate').val(fillobj[6]);

    if (fillobj[0] == "undefined") {
        fillobj[0] = 0;
    }
    if (fillobj[1] == "undefined") {
        fillobj[1] = 0;
    }
    if (fillobj[2] == "undefined") {
        fillobj[2] = 0;
    }
    if (fillobj[4] == "undefined") {
        fillobj[4] = 0;
    }
    if (fillobj[5] == "undefined") {
        fillobj[5] = 0;
    }

    $.ajax({
        url: "/GroupProcessOrder/LoadMain",
        data: JSON.stringify({ Ordid: fillobj[0], Refid: fillobj[1], Style: fillobj[2], Process: fillobj[3], Groupid: fillobj[4], FDt: fillobj[5], TDt: fillobj[6] }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            debugger;
            mainlist = result.Value;
            loadMaintable();

            var data = result.Value;


            $(ddlGrpPrgNo).empty();

            $(ddlGrpPrgNo).append($('<option/>').val('0').text('--Select GrpPrgNo--'));
            $.each(data, function () {
                $(ddlGrpPrgNo).append($('<option></option>').val(this.GrpProdPrgid).text(this.GrpProdPrgNo));
            });

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });



}

function loadMaintable() {
    debugger;
    // $('#tblcompdetails').DataTable().destroy();
    var inputcount = 0;
    $('#tblmaindetails tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tblmaindetails').DataTable().destroy();
    }
    $('#tblmaindetails').empty();

    $('#tblmaindetails').DataTable({
        //'bSortable': false,
        //'aTargets' : [ 7, 8 ],
        data: mainlist,
        scrollY: 300,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        "bSort": false,
        //"rowCallback": function (row, data, index) {
        //    if (data.Rate > "0") {
        //        $('td', row).css('background-color', '#FCF3CF');
        //        //$('#btntrimsedit').attr('disabled', 'disabled');
        //        $('td', row)[5] = '';
        //    }

        //},
        columns: [

            { title: "GrpProdPrgid", data: "GrpProdPrgid", "visible": false },
            { title: "GrpProdPrgNo", data: "GrpProdPrgNo" },
            {
                title: "GrpProgDate", data: "GrpProgDate",
                "render": function (data, type, row, meta) {

                    return (moment(data).format("DD/MM/YYYY"));
                }

            },
            { title: "ProdPrgid", data: "ProdPrgid", "visible": false },
            { title: "prod pgm no", data: "ProdPrgNo" },
            { title: "Buy_Ord_MasId", data: "Buy_Ord_MasId", "visible": false },
            { title: "Order No", data: "Order_No" },
            { title: "Ref No", data: "Ref_No" },
            { title: "Processid", data: "Processid", "visible": false },
            { title: "Process", data: "Process" },
            { title: "ChkProcess", data: "chkprc", "visible": false },

               {
                   title: "ACTION", "mDataProp": null,

                   "sDefaultContent": '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" ' + GrpPrcEditFlg + ' class="btngrpedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" ' + GrpPrcDeleteFlg + ' class="btngrpremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div>'

                   //"render": function (data, type, row, meta) {
                   //    //if (data.Rate > "0") {
                   //    //    return '<div style="display:inline-flex"><button type="button" disabled="disabled" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" id="btntrimsedit" class="btntrimsedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" disabled="disabled" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btntrimsremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div>'
                   ////} else {
                   //    return '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" id="btngrpedit" class="btngrpedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" id="btngrpremove" class="btngrpremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div>'
                   //}
                   ////}


               }
        ]
    });


    $("#tblmaindetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblmaindetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}

function LoadOrderwise() {
    debugger;
    if (Mode == 0 ) {
        var BMasId = $('#ddlOrderNo').val();
        var JbId = 0;
        var StyId = 0;
        var Refid = 0;
        ddlmode = 1;
        //var RefNo = "";
        //var RNo = $('select#ddlrefno option:selected').val();

        //if (RNo == 0) {
        //    RefNo == "";
        //}
        //else {

        //    RefNo = $('select#ddlrefno option:selected').val();
        //}

        $.ajax({
            url: "/GroupProcessOrder/GetGroupDropdwon",
            data: JSON.stringify({ BMasId: BMasId, JobId: JbId, Styleid: StyId, RefNo: Refid }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",

            success: function (result) {
                var obj = result.Value;
                if (result.Status == 'SUCCESS') {
                    debugger;
                    var data = result.Value;
                    //var bmas = 0;
                    //$.each(data, function () {
                    //    bmas = this.BMasId;
                    //});

                    ////OrdNo
                    //$(ddlOrderNo).empty();
                    //$(ddlOrderNo).append($('<option/>').val('0').text('--Select OrderNo--'));
                    //$.each(data, function () {
                    //    $(ddlOrderNo).append($('<option></option>').val(this.BMasId).text(this.Buy_Ord_no));
                    //});

                    ////RefNo
                    //$(ddlrefno).empty();
                    //$(ddlrefno).append($('<option/>').val('0').text('--Select RefNo--'));
                    //$.each(data, function () {
                    //    $(ddlrefno).append($('<option></option>').val(this.BMasId).text(this.RefNo));
                    //});

                    //JobNo
                    $(ddlWorkOrderNo).empty();
                    $(ddlWorkOrderNo).append($('<option/>').val('0').text('--Select JobNo--'));
                    $.each(data, function () {
                        $(ddlWorkOrderNo).append($('<option></option>').val(this.JobId).text(this.Job_Ord_no));
                    });

                    //Style
                    $(ddlStyle).empty();
                    $(ddlStyle).append($('<option/>').val('0').text('--Select Style--'));
                    $.each(data, function () {
                        $(ddlStyle).append($('<option></option>').val(this.Styleid).text(this.Style));
                    });
                }


            }

        });
    }
}

function LoadRefwise() {
    debugger;
    if (Mode == 0  ) {
        var BMasId = 0;
        var JbId = 0;
        var StyId = 0;
        var Refid = $('select#ddlrefno option:selected').val();
        ddlmode = 2;
        //var RefNo = "";
        //var RNo = $('select#ddlrefno option:selected').val();

        //if (RNo == 0) {
        //    RefNo == "";
        //}
        //else {

        //    RefNo = $('select#ddlrefno option:selected').val();
        //}

        $.ajax({
            url: "/GroupProcessOrder/GetGroupDropdwon",
            data: JSON.stringify({ BMasId: BMasId, JobId: JbId, Styleid: StyId, RefNo: Refid }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",

            success: function (result) {
                var obj = result.Value;
                if (result.Status == 'SUCCESS') {
                    debugger;
                    var data = result.Value;
                    //var bmas = 0;
                    //$.each(data, function () {
                    //    bmas = this.BMasId;
                    //});

                    //OrdNo
                    $(ddlOrderNo).empty();
                    $(ddlOrderNo).append($('<option/>').val('0').text('--Select OrderNo--'));
                    $.each(data, function () {
                        $(ddlOrderNo).append($('<option></option>').val(this.BMasId).text(this.Buy_Ord_no));
                    });

                    ////RefNo
                    //$(ddlrefno).empty();
                    //$(ddlrefno).append($('<option/>').val('0').text('--Select RefNo--'));
                    //$.each(data, function () {
                    //    $(ddlrefno).append($('<option></option>').val(this.BMasId).text(this.RefNo));
                    //});

                    //JobNo
                    $(ddlWorkOrderNo).empty();
                    $(ddlWorkOrderNo).append($('<option/>').val('0').text('--Select JobNo--'));
                    $.each(data, function () {
                        $(ddlWorkOrderNo).append($('<option></option>').val(this.JobId).text(this.Job_Ord_no));
                    });

                    //Style
                    $(ddlStyle).empty();
                    $(ddlStyle).append($('<option/>').val('0').text('--Select Style--'));
                    $.each(data, function () {
                        $(ddlStyle).append($('<option></option>').val(this.Styleid).text(this.Style));
                    });
                }


            }

        });
    }
   
}

function Ipfill() {
    $.each(IpitemList, function () {
            var Val = this.BalanceQty;
            this.GrpQty = Val;
    });
    loadInputitemtable(IpitemList);

    $.each(OpitemList, function () {
        var Val = this.BalanceQty;
        this.GrpQty = Val;
    });
    loadOutputitemtable(OpitemList);
}

function ProcessDropdown() {
   
    httpGet("/Process/GetProcess", onProcessddlSuccess, onProcessddlFailure);
}

function onProcessddlSuccess(result) {
    
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(ddlGrpProcess).empty();
        $(ddlGrpProcess).append($('<option/>').val('0').text('--Select Process--'));
        $.each(data, function () {
            $(ddlGrpProcess).append($('<option></option>').val(this.ProcessId).text(this.ProcessName));
        });
        $("#ddlGrpProcess").val(grpprocessid).trigger('change');
    }
    else {
        var msg = 'Process loading failed...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        //alert('Process loading failed');
    }
}
function onProcessddlFailure(result) {
    //alert('Process loading failed');
    var msg = 'Process loading failed...';
    var flg = 4;
    var mod = 1;
    var url = "";
    AlartMessage(msg, flg, mod, url);
}

function LoadProcess() {
    debugger;
    if (Mode == 0) {
        var JbId = $('select#ddlWorkOrderNo option:selected').val();

        $.ajax({
            url: "/GroupProcessOrder/GetProcessDropdwon",
            data: JSON.stringify({ JobId: JbId}),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                var obj = result.Value;
                if (result.Status == 'SUCCESS') {
                    debugger;
                    var data = result.Value;
                    //DDL MultiProcess
                    $(ddlProcess).empty();
                    $(ddlProcess).append($('<option/>').val('0').text('--Select Process--'));
                    $.each(data, function () {
                        $(ddlProcess).append($('<option></option>').val(this.ProcessId).text(this.Process));
                    });
                }
            }
        });
    }
}

function CheckPlanAmend(wrkordno) {

    $.ajax({
        url: "/PlanningConsumption/LoadAmendDetails",
        data: JSON.stringify({ Stylerowid: 0, jmasid: '', Workordno: wrkordno }),
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
                    var msg = "Planning amended for " + amendlist[x].Order_No + '-' + amendlist[x].Style + ",Please Check it....";
                    var flg = 4;
                    var mod = 1;
                    var url = "";
                    AlartMessage(msg, flg, mod, url);
                    $("#btnAdd").attr("disabled", true);
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