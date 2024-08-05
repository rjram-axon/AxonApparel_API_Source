var StyleRowId = 0;
var TrimsList = [];
var FabricList = [];
var EmbellishmentList = [];
var FabricYarnList = [];
var ProcessList = [];
var mod = 0;
var BMasId = 0;
var OrdNo = 0;
var Buyerid = 0;
var Styleid = 0;
var precostmasid = 0;
var precostfabmasid = 0;
var trimsrowindex = -1;
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

    //LoadColorDDL("#ddlColor");
    //LoadSizeDDL("#ddlCount");
    //LoadProcessDDL("#dllProcess");
    //LoadYarnDDL("#ddlYarnlist");
    getbyID(StyleRowId);

    $(document).ready(function () {
        $("#tblEntryCompItemdetails ").dataTable().find("tbody").on('click', 'tr', function () {
            index = (this.rowIndex) - 1;
        });
    });
    $(document).on('keyup', '#txtTrimsRate', function (e) {
        debugger;
        var table = $('#tblTrimsdetails').DataTable();
        var Trimmasid = table.row($(this).parents('tr')).data()["PrecostTrimmasid"];
        var Val = $(this).val();
        $.each(TrimsList, function () {
            if (this.PrecostTrimmasid == Trimmasid) {
                this.Rate = Val;

            }
        });

    });
    $(document).on('keyup', '#txtGrammage', function (e) {
        debugger;
        var table = $('#tblFabricdetails').DataTable();
        var fabricmasid = table.row($(this).parents('tr')).data()["PrecostFabricmasid"];
        var Val = $(this).val();
        $.each(FabricList, function () {
            if (this.PrecostFabricmasid == fabricmasid) {
                this.Grammage = Val;

            }
        });

    });
    $(document).on('keyup', '#txtEmblishRate', function (e) {
        debugger;
        var table = $('#tblEmblishmentdetails').DataTable();
        var emblishmasid = table.row($(this).parents('tr')).data()["PrecostEmbellishmentmasid"];
        var Val = $(this).val();
        $.each(EmbellishmentList, function () {
            if (this.PrecostEmbellishmentmasid == emblishmasid) {
                this.Rate = Val;

            }
        });

    });
    $(document).on('keyup', '#txtfabricyarnRate', function (e) {
        debugger;
        var table = $('#tblFabricYarndetails').DataTable();
        var Yarnmasid = table.row($(this).parents('tr')).data()["PreCostFabDeptYarnmasid"];
        var fabmasid = table.row($(this).parents('tr')).data()["PreCostFabDeptFabmasid"];
        var Type = table.row($(this).parents('tr')).data()["Type"];
        var Val = $(this).val();
        $.each(FabricYarnList, function () {
            if (this.Type == 'Yarn' && this.PreCostFabDeptYarnmasid == Yarnmasid) {
                this.Rate = Val;

            }
            else if (this.Type == 'Fabric' && this.PreCostFabDeptFabmasid == fabmasid) {
                this.Rate = Val;
            }
        });

    });
    $(document).on('keyup', '#txtProcessRate', function (e) {
        debugger;
        var table = $('#tblProcessdetails').DataTable();
        var procsmasid = table.row($(this).parents('tr')).data()["PreCostFabDeptProcmasid"];
        var Val = $(this).val();
        $.each(ProcessList, function () {
            if (this.PreCostFabDeptProcmasid == procsmasid) {
                this.Rate = Val;

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
        url: "/Precosting/GetPrecostingDetails/" + ID,
        type: "GET",
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            if (obj != undefined && obj != null && obj.length > 0) {

                $('#txtOrderNo').val(obj[0]["Orderno"]);
                $('#txtBuyer').val(obj[0]["Buyer"]);
                $('#txtRefNo').val(obj[0]["Style"]);
                $('#txtStyle').val(obj[0]["Style"]);
                $('#txtRemark').val(obj[0]["Remarks"]);
                $('#txtBuyerOrderDate').val(moment(obj[0]["Orderdate"]).format('DD/MM/YYYY'));
                $('#txtEntryDate').val(moment(obj[0]["RateEntrydate"]).format('DD/MM/YYYY'));
                OrdNo = obj[0]["Orderno"];
                BMasId = obj[0]["Bmasid"];
                Buyerid = obj[0]["Buyerid"];
                Styleid = obj[0]["Styleid"];
                precostmasid = obj[0]["PrecostFabTrimmasid"];

                if (Mod == 0) {
                    LoadAddTrims(precostmasid)
                    LoadAddFabric(precostmasid);
                    LoadAddEmbellishment(precostmasid);
                }
                else if (Mod == 1) {
                    $('#btnDelete').hide();
                    $('#btnAdd').hide();
                    $('#btnUpdate').show();
                    LoadEditTrims(precostmasid);
                    LoadEditFabric(precostmasid);
                    LoadEditEmbellishment(precostmasid);
                }
                else {
                    $('#btnDelete').show();
                    $('#btnAdd').hide();
                    $('#btnUpdate').hide();
                    LoadEditTrims(precostmasid);
                    LoadEditFabric(precostmasid);
                    LoadEditEmbellishment(precostmasid);
                }

            }

            $('#myModal1').modal('show');

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });

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

                precostfabmasid = obj[0]["PreCostFabDeptmasid"];

                if (Mod == 0) {
                    LoadAddFabricYarn(precostfabmasid);
                    LoadAddProcess(precostfabmasid);
                }
                else if (Mod == 1) {
                    $('#btnDelete').hide();
                    $('#btnAdd').hide();
                    $('#btnUpdate').show();
                    LoadEditFabricYarn(precostfabmasid);
                    LoadEditProcess(precostfabmasid);
                }
                else {
                    $('#btnDelete').show();
                    $('#btnAdd').hide();
                    $('#btnUpdate').hide();
                    LoadEditFabricYarn(precostfabmasid);
                    LoadEditProcess(precostfabmasid);
                }

            }

           // $('#myModal1').modal('show');

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function loadTrimsTable(trimsListObj) {
    debugger;
    // $('#tblcompdetails').DataTable().destroy();
    var inputcount = 0;
    $('#tblTrimsdetails tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tblTrimsdetails').DataTable().destroy();
    }
    $('#tblTrimsdetails').empty();
    TrimsList.sort(function (a, b) {
        return a.TrimsSlNo - b.TrimsSlNo;
    })
    $('#tblTrimsdetails').DataTable({
        //'bSortable': false,
        //'aTargets' : [ 7, 8 ],
        data: TrimsList,
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
            { title: "Trims_MasID", data: "PrecostTrimmasid", "visible": false },
            { title: "Itemid", data: "GItemid", "visible": false },
            { title: "Item", data: "GItem" },
            { title: "Trimsid", data: "Itemid", "visible": false },
            { title: "Trims", data: "Item" },
            { title: "Colorid", data: "Colorid", "visible": false },
            { title: "Color", data: "Color" },
            { title: "Sizeid", data: "Sizeid", "visible": false },
            { title: "Size", data: "Size" },
            { title: "Uomid", data: "UOMid", "visible": false },
            { title: "UOM", data: "UOM" },
            { title: "Consumption", data: "Consumption" },
             {
                 title: "Rate", data: "Rate",
                 render: function (data) {

                     return '<input type="text" id="txtTrimsRate" class="calcgsm form-control"  style="width: 50px;text-align: center;" value=' + data + ' >';

                 },
             },
               //{
               //    title: "ACTION", "mDataProp": null,
               //    "sDefaultContent": '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btntrimsedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btntrimsremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div>'
               //}
        ]
    });


    $("#tblTrimsdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblTrimsdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}

function loadfabricTable(fabricListObj) {
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
    FabricList.sort(function (a, b) {
        return a.FabricSlNo - b.FabricSlNo;
    })
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
            // { title: "FabricSlNo", data: "FabricSlNo", "visible": false },      
            { title: "Fabric_MasID", data: "PrecostFabricmasid", "visible": false },
            { title: "Typeid", data: "GItemid", "visible": false },
            { title: "Type", data: "GItem" },
            { title: "Componentid", data: "Componentid", "visible": false },
            { title: "Component", data: "Component" },
            { title: "Fabricid", data: "Fabricid", "visible": false },
            { title: "Fabric", data: "Fabric" },
            { title: "GreyColorid", data: "Greycolorid", "visible": false },
            { title: "GreyColor", data: "Greycolor" },
            { title: "FinishColorid", data: "Finishcolorid", "visible": false },
            { title: "FinishColor", data: "Finishcolor" },
            { title: "PrintColorid", data: "Printcolorid", "visible": false },
            { title: "PrintColor", data: "Printcolor" },
            { title: "GSM", data: "GSM" },
              {
                  title: "Grammage", data: "Grammage",
                  render: function (data) {

                      return '<input type="text" id="txtGrammage" class="calcgsm form-control"  style="width: 50px;text-align: center;" value=' + data + ' >';

                  },
              },
        ]
    });


    $("#tblFabricdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblFabricdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}

function loadEmbellishmentTable(EmblishListObj) {
    debugger;
    // $('#tblcompdetails').DataTable().destroy();
    var inputcount = 0;
    $('#tblEmblishmentdetails tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tblEmblishmentdetails').DataTable().destroy();
    }
    $('#tblEmblishmentdetails').empty();
    EmbellishmentList.sort(function (a, b) {
        return a.EmblishSlNo - b.EmblishSlNo;
    })
    $('#tblEmblishmentdetails').DataTable({
        //'bSortable': false,
        //'aTargets' : [ 7, 8 ],
        data: EmbellishmentList,
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
            // { title: "EmblishSlNo", data: "EmblishSlNo", "visible": false },
            { title: "Embellishment_MasID", data: "PrecostEmbellishmentmasid", "visible": false },
            { title: "Itemid", data: "GItemid", "visible": false },
            { title: "Item", data: "GItem" },
            { title: "Embellishmentid", data: "Processid", "visible": false },
            { title: "Embellishment", data: "Process" },

               {
                   title: "Rate", data: "Rate",
                   render: function (data) {

                       return '<input type="text" id="txtEmblishRate" class="calcgsm form-control"  style="width: 50px;text-align: center;" value=' + data + ' >';

                   },
               },
        ]
    });


    $("#tblEmblishmentdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblEmblishmentdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}

function loadFabricyarnTable(fabricListObj) {
    debugger;
    // $('#tblcompdetails').DataTable().destroy();
    var inputcount = 0;
    $('#tblFabricYarndetails tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tblFabricYarndetails').DataTable().destroy();
    }
    $('#tblFabricYarndetails').empty();

    $('#tblFabricYarndetails').DataTable({
        //'bSortable': false,
        //'aTargets' : [ 7, 8 ],
        data: FabricYarnList,
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
            { title: "PreCostFabDeptYarnmasid", data: "PreCostFabDeptYarnmasid", "visible": false },
            { title: "PrecostFabDeptFabmasid", data: "PreCostFabDeptFabmasid", "visible": false },
            { title: "Fabric/Yarn", data: "Type" },
            { title: "FabricId", data: "Fabricid", "visible": false },
            { title: "Item", data: "Fabric" },
            { title: "Colorid", data: "FabricColorid", "visible": false },
            { title: "Color", data: "FabricColor" },
            { title: "Sizeid", data: "Sizeid", "visible": false },
            { title: "Size", data: "Size" },
            {
                title: "Rate", data: "Rate",
                render: function (data) {

                    return '<input type="text" id="txtfabricyarnRate" class="calcgsm form-control"  style="width: 50px;text-align: center;" value=' + data + ' >';

                },
            },
        ]
    });


    $("#tblFabricYarndetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblFabricYarndetails tr").removeClass("selected");
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
            { title: "FabricId", data: "Fabricid", "visible": false },
            { title: "Processid", data: "Processid", "visible": false },
            { title: "Process", data: "Process" },
            { title: "Fabric", data: "Fabric" },
            { title: "FabricColor", data: "FabricColor" },
            { title: "Loss %", data: "LossPercentage" },
               {
                   title: "Rate", data: "Rate",
                   render: function (data) {

                       return '<input type="text" id="txtProcessRate" class="calcgsm form-control"  style="width: 50px;text-align: center;" value=' + data + ' >';

                   },
               },
        ]
    });


    $("#tblProcessdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblProcessdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}

function LoadAddTrims(ID) {
    debugger;

    $.ajax({
        url: "/PrecostingRate/GetPrecostTrimsAddDetails/" + ID,
        type: "GET",
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            TrimsList = (result.Value);

            loadTrimsTable(TrimsList);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function LoadAddFabric(ID) {
    debugger;

    $.ajax({
        url: "/PrecostingRate/GetPrecostFabricAddDetails/" + ID,
        type: "GET",
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
           FabricList = (result.Value);

           loadfabricTable(FabricList);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function LoadAddEmbellishment(ID) {
    debugger;

    $.ajax({
        url: "/PrecostingRate/GetPrecostEmblishmentAddDetails/" + ID,
        type: "GET",
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            EmbellishmentList = (result.Value);

            loadEmbellishmentTable(EmbellishmentList);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function LoadAddFabricYarn(ID) {
    debugger;

    $.ajax({
        url: "/PrecostingRate/GetPrecostFabricYarnAddDetails/" + ID,
        type: "GET",
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            FabricYarnList = (result.Value);

            loadFabricyarnTable(FabricYarnList);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function LoadAddProcess(ID) {
    debugger;

    $.ajax({
        url: "/PrecostingRate/GetPrecostprocessAddDetails/" + ID,
        type: "GET",
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            ProcessList = (result.Value);

            loadProcessTable(ProcessList);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function LoadEditTrims(ID) {
    debugger;

    $.ajax({
        url: "/PrecostingRate/GetPrecostTrimsEditDetails/" + ID,
        type: "GET",
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            TrimsList = (result.Value);

            loadTrimsTable(TrimsList);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function LoadEditFabric(ID) {
    debugger;

    $.ajax({
        url: "/PrecostingRate/GetPrecostFabricEditDetails/" + ID,
        type: "GET",
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            FabricList = (result.Value);

            loadfabricTable(FabricList);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function LoadEditEmbellishment(ID) {
    debugger;

    $.ajax({
        url: "/PrecostingRate/GetPrecostEmblishmentEditDetails/" + ID,
        type: "GET",
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            EmbellishmentList = (result.Value);

            loadEmbellishmentTable(EmbellishmentList);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function LoadEditFabricYarn(ID) {
    debugger;

    $.ajax({
        url: "/PrecostingRate/GetPrecostFabricYarnEditDetails/" + ID,
        type: "GET",
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            FabricYarnList = (result.Value);

            loadFabricyarnTable(FabricYarnList);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function LoadEditProcess(ID) {
    debugger;

    $.ajax({
        url: "/PrecostingRate/GetPrecostprocessEditDetails/" + ID,
        type: "GET",
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            ProcessList = (result.Value);

            loadProcessTable(ProcessList);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function Save() {

    var isAllValid = true;
    if (TrimsList.length == 0) {

        alert("Please Check Trims Details..");
        return true;
    }

    if ($('#txtconsumption').val() == "") {
        isAllValid = false;
        $('#txtconsumption').css('border-color', 'Red');
    }
    else {
        $('#txtconsumption').css('border-color', 'lightgrey');
    }
    if (isAllValid) {
        var objSubmit = {
            OrderNo: $('#txtOrderNo').val(),
            Bmasid: BMasId,
            Styleid: Styleid,
            Buyerid: Buyerid,
            RateEntrydate: $('#txtEntryDate').val(),
            Stylerowid: StyleRowId,
            TrimsDet: TrimsList,
            FabricDet: FabricList,
            EmbellishmentDet: EmbellishmentList,
            PrecostFab: FabricYarnList,
            ProcessDet: ProcessList,
            PrecostFabTrimmasid: precostmasid
        };
        //$("#ConAdd").attr("disabled", true);
        LoadingSymb();
        $.ajax({
            url: "/PrecostingRate/Add",
            data: JSON.stringify(objSubmit),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {

                if (result.Value == true) {

                    alert("PrecostingRate Saved Sucessfully");
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

    var isAllValid = true;
    if (TrimsList.length == 0) {

        alert("Please Check Trims Details..");
        return true;
    }

    if ($('#txtconsumption').val() == "") {
        isAllValid = false;
        $('#txtconsumption').css('border-color', 'Red');
    }
    else {
        $('#txtconsumption').css('border-color', 'lightgrey');
    }
    if (isAllValid) {
        var objSubmit = {
            OrderNo: $('#txtOrderNo').val(),
            Bmasid: BMasId,
            Styleid: Styleid,
            Buyerid: Buyerid,
            RateEntrydate: $('#txtEntryDate').val(),
            Stylerowid: StyleRowId,
            TrimsDet: TrimsList,
            FabricDet: FabricList,
            EmbellishmentDet: EmbellishmentList,
            PrecostFab: FabricYarnList,
            ProcessDet: ProcessList,
            PrecostFabTrimmasid: precostmasid
        };
        //$("#ConAdd").attr("disabled", true);
        LoadingSymb();
        $.ajax({
            url: "/PrecostingRate/Add",
            data: JSON.stringify(objSubmit),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {

                if (result.Value == true) {

                    alert("PrecostingRate Updated Sucessfully");
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

    var isAllValid = true;
    if (TrimsList.length == 0) {

        alert("Please Check Trims Details..");
        return true;
    }

    if ($('#txtconsumption').val() == "") {
        isAllValid = false;
        $('#txtconsumption').css('border-color', 'Red');
    }
    else {
        $('#txtconsumption').css('border-color', 'lightgrey');
    }
    if (isAllValid) {
        var objSubmit = {
            OrderNo: $('#txtOrderNo').val(),
            Bmasid: BMasId,
            Styleid: Styleid,
            Buyerid: Buyerid,
            Entrydate: $('#txtEntryDate').val(),
            Stylerowid: StyleRowId,
            TrimsDet: TrimsList,
            FabricDet: FabricList,
            EmbellishmentDet: EmbellishmentList,
            PrecostFab: FabricYarnList,
            ProcessDet: ProcessList,
            PrecostFabTrimmasid: precostmasid
        };
        //$("#ConAdd").attr("disabled", true);
        LoadingSymb();
        $.ajax({
            url: "/PrecostingRate/Delete",
            data: JSON.stringify(objSubmit),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {

                if (result.Value == true) {

                    alert("PrecostingRate Deleted Sucessfully");
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

function Close() {
    window.location.href = "/StyleEntry/StyleEntryIndex?BMasId=" + BMasId + "=&Mode=" + 1;
}