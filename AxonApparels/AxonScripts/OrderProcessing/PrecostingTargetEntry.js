var StyleRowId = 0;
var TrimsList = [];
var FabricList = [];
var EmbellishmentList = [];
var TrimsDetList = [];
var FabricDetList = [];
var EmbellishmentDetList = [];
var FabricYarnList = [];
var ProcessList = [];
var FabricYarnDetList = [];
var ProcessDetList = [];
var mod = 0;
var BMasId = 0;
var OrdNo = 0;
var Buyerid = 0;
var Styleid = 0;
var precostmasid = 0;
var precostfabmasid = 0;
var trimsrowindex = -1;
var ordid = '';
var OrderList = [];
var Companyid = 0;
var type = '';
$(document).ready(function () {
    debugger;

    Guserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    Roleid = $("#hdnRoleid").data('value'); 
    superuser = $("#hdnusername").data('value');
    Companyid = $("#hdnDCompid").data('value');
    var qrStr = window.location.search;
    var spQrStr = qrStr.substring(1);
    var arrQrStr = new Array();
    var arr = spQrStr.split('?');


    for (var i = 0; i < arr.length; i++) {
        var queryvalue = arr[i].split('=');
    }

    ordid = queryvalue[1];
    masid = queryvalue[3];
    Mod = queryvalue[5];
    getDate();

    //LoadColorDDL("#ddlColor");
    //LoadSizeDDL("#ddlCount");
    //LoadProcessDDL("#dllProcess");
    //LoadYarnDDL("#ddlYarnlist");
    getbyID(ordid);

    $(document).ready(function () {
        $("#tblEntryCompItemdetails ").dataTable().find("tbody").on('click', 'tr', function () {
            index = (this.rowIndex) - 1;
        });
    });
    $(document).on('keyup', '#txtTrimsTarget', function (e) {
        debugger;
        var table = $('#tblTrimsdetails').DataTable();
       
        var Itemid = table.row($(this).parents('tr')).data()["Itemid"];
        var Colorid = table.row($(this).parents('tr')).data()["Colorid"];
        var Sizeid = table.row($(this).parents('tr')).data()["Sizeid"];
        var UOMid = table.row($(this).parents('tr')).data()["UOMid"];
        var Val = $(this).val();
        $.each(TrimsList, function () {
            if (this.Itemid == Itemid && this.Colorid == Colorid && this.Sizeid == Sizeid && this.UOMid == UOMid) {
                this.Target = Val;

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
    $(document).on('keyup', '#txtEmblishTarget', function (e) {
        debugger;
        var table = $('#tblEmblishmentdetails').DataTable();
        var Processid = table.row($(this).parents('tr')).data()["Processid"];
        var Val = $(this).val();
        $.each(EmbellishmentList, function () {
            if (this.Processid == Processid) {
                this.Target = Val;

            }
        });

    });
    $(document).on('keyup', '#txtfabricyarnTarget', function (e) {
        debugger;
        var table = $('#tblFabricYarndetails').DataTable();
        var Fabricid = table.row($(this).parents('tr')).data()["Fabricid"];
        var FabricColorid = table.row($(this).parents('tr')).data()["FabricColorid"];
        var Sizeid = table.row($(this).parents('tr')).data()["Sizeid"];
        var Type = table.row($(this).parents('tr')).data()["Type"];
        var Val = $(this).val();
        $.each(FabricYarnList, function () {
            if (this.Type == 'Yarn' && this.Fabricid == Fabricid && this.FabricColorid == FabricColorid && this.Sizeid == Sizeid ) {
                this.Target = Val;

            }
            else if (this.Type == 'Fabric' && this.Fabricid == Fabricid && this.FabricColorid == FabricColorid ) {
                this.Target = Val;
            }
        });

    });
    $(document).on('keyup', '#txtProcessTarget', function (e) {
        debugger;
        var table = $('#tblProcessdetails').DataTable();
        var Processid = table.row($(this).parents('tr')).data()["Processid"];
        var Fabricid = table.row($(this).parents('tr')).data()["Fabricid"];
        var Val = $(this).val();
        $.each(ProcessList, function () {
            if (this.Processid == Processid && this.Fabricid == Fabricid) {
                this.Target = Val;

            }
        });

    });

    $(document).on('keyup', '#txtloss', function (e) {
        debugger;
        var table = $('#tblProcessdetails').DataTable();
        var Processid = table.row($(this).parents('tr')).data()["Processid"];
        var Fabricid = table.row($(this).parents('tr')).data()["Fabricid"];
        var Val = $(this).val();
        $.each(ProcessList, function () {
            if (this.Processid == Processid && this.Fabricid == Fabricid) {
                this.LossPercentage = Val;

            }
        });

    });

    $(document).on('click', '.grouptrims', function () {
        debugger;

        var table = $('#tblTrimsdetails').DataTable();
        var Itemid = table.row($(this).parents('tr')).data()["Itemid"];
        var Colorid = table.row($(this).parents('tr')).data()["Colorid"];
        var Sizeid = table.row($(this).parents('tr')).data()["Sizeid"];
        var UOMid = table.row($(this).parents('tr')).data()["UOMid"];
       
        // $('#tPAbody tr:eq(' + rowindex + ')').find('td:eq(1)').text(totalamnt);
        //if ($('#chkpfj').is(':checked')) {
        var val = $(this).is(":checked");
        if (val == true) {
            for (var f = 0; f < TrimsList.length; f++) {
                if (TrimsList[f].Itemid == Itemid && TrimsList[f].Colorid == Colorid && TrimsList[f].Sizeid == Sizeid && TrimsList[f].UOMid == UOMid) {
                    TrimsList[f].Approved = 'Y';

                }
            }
        }
        else {
            for (var f = 0; f < TrimsList.length; f++) {
                if (TrimsList[f].Itemid == Itemid && TrimsList[f].Colorid == Colorid && TrimsList[f].Sizeid == Sizeid && TrimsList[f].UOMid == UOMid) {
                    TrimsList[f].Approved = 'N';

                }
            }
        }
        //LoadInnerGrid(MenuList);
        //var table = $('#tblFabricdetails').DataTable();
        //var data = table.rows().data();

        //$('input[id=Greytype]').each(function (ig) {
        //    if (data[ig].FabSlno == slno && data[ig].PurchaseType == 'G') {
        //        var row = $(this).closest('tr');
        //        row.find('#chkadd').val(data[ig].Apprate);
        //        row.find('#Greytype').prop("checked", true);
        //        row.find('#Finishtype').prop("checked", false);
        //        row.find('#Yarntype').prop("checked", false);
        //    }
        //});
    });

    $(document).on('click', '.groupEmblish', function () {
        debugger;

        var table = $('#tblEmblishmentdetails').DataTable();
        var Processid = table.row($(this).parents('tr')).data()["Processid"];
        

        // $('#tPAbody tr:eq(' + rowindex + ')').find('td:eq(1)').text(totalamnt);
        //if ($('#chkpfj').is(':checked')) {
        var val = $(this).is(":checked");
        if (val == true) {
            for (var f = 0; f < EmbellishmentList.length; f++) {
                if (EmbellishmentList[f].Processid == Processid) {
                    EmbellishmentList[f].Approved = 'Y';

                }
            }
        }
        else {
            for (var f = 0; f < EmbellishmentList.length; f++) {
                if (EmbellishmentList[f].Processid == Processid) {
                    EmbellishmentList[f].Approved = 'N';

                }
            }
        }
        //LoadInnerGrid(MenuList);
        //var table = $('#tblFabricdetails').DataTable();
        //var data = table.rows().data();

        //$('input[id=Greytype]').each(function (ig) {
        //    if (data[ig].FabSlno == slno && data[ig].PurchaseType == 'G') {
        //        var row = $(this).closest('tr');
        //        row.find('#chkadd').val(data[ig].Apprate);
        //        row.find('#Greytype').prop("checked", true);
        //        row.find('#Finishtype').prop("checked", false);
        //        row.find('#Yarntype').prop("checked", false);
        //    }
        //});
    });

    $(document).on('click', '.groupfabyarn', function () {
        debugger;

        var table = $('#tblFabricYarndetails').DataTable();
        var Type = table.row($(this).parents('tr')).data()["Type"];
        var Fabricid = table.row($(this).parents('tr')).data()["Fabricid"];
        var FabricColorid = table.row($(this).parents('tr')).data()["FabricColorid"];
        var Sizeid = table.row($(this).parents('tr')).data()["Sizeid"];

        // $('#tPAbody tr:eq(' + rowindex + ')').find('td:eq(1)').text(totalamnt);
        //if ($('#chkpfj').is(':checked')) {
        var val = $(this).is(":checked");
        if (val == true) {
            for (var f = 0; f < FabricYarnList.length; f++) {
                if (FabricYarnList[f].Type == Type && FabricYarnList[f].Fabricid == Fabricid && FabricYarnList[f].FabricColorid == FabricColorid && FabricYarnList[f].Sizeid == Sizeid) {
                    FabricYarnList[f].Approved = 'Y';

                }
            }
        }
        else {
            for (var f = 0; f < FabricYarnList.length; f++) {
                if (FabricYarnList[f].Type == Type && FabricYarnList[f].Fabricid == Fabricid && FabricYarnList[f].FabricColorid == FabricColorid && FabricYarnList[f].Sizeid == Sizeid) {
                    FabricYarnList[f].Approved = 'N';

                }
            }
        }
        //LoadInnerGrid(MenuList);
        //var table = $('#tblFabricdetails').DataTable();
        //var data = table.rows().data();

        //$('input[id=Greytype]').each(function (ig) {
        //    if (data[ig].FabSlno == slno && data[ig].PurchaseType == 'G') {
        //        var row = $(this).closest('tr');
        //        row.find('#chkadd').val(data[ig].Apprate);
        //        row.find('#Greytype').prop("checked", true);
        //        row.find('#Finishtype').prop("checked", false);
        //        row.find('#Yarntype').prop("checked", false);
        //    }
        //});
    });

    $(document).on('click', '.groupprocess', function () {
        debugger;

        var table = $('#tblProcessdetails').DataTable();
        var Processid = table.row($(this).parents('tr')).data()["Processid"];
        var Fabricid = table.row($(this).parents('tr')).data()["Fabricid"];

        // $('#tPAbody tr:eq(' + rowindex + ')').find('td:eq(1)').text(totalamnt);
        //if ($('#chkpfj').is(':checked')) {
        var val = $(this).is(":checked");
        if (val == true) {
            for (var f = 0; f < ProcessList.length; f++) {
                if (ProcessList[f].Processid == Processid && ProcessList[f].Fabricid == Fabricid) {
                    ProcessList[f].Approved = 'Y';

                }
            }
        }
        else {
            for (var f = 0; f < ProcessList.length; f++) {
                if (ProcessList[f].Processid == Processid && ProcessList[f].Fabricid == Fabricid) {
                    ProcessList[f].Approved = 'N';

                }
            }
        }
        //LoadInnerGrid(MenuList);
        //var table = $('#tblFabricdetails').DataTable();
        //var data = table.rows().data();

        //$('input[id=Greytype]').each(function (ig) {
        //    if (data[ig].FabSlno == slno && data[ig].PurchaseType == 'G') {
        //        var row = $(this).closest('tr');
        //        row.find('#chkadd').val(data[ig].Apprate);
        //        row.find('#Greytype').prop("checked", true);
        //        row.find('#Finishtype').prop("checked", false);
        //        row.find('#Yarntype').prop("checked", false);
        //    }
        //});
    });

    $(document).on('click', '.groupAll', function () {
        debugger;
        var val = $(this).is(":checked");
        if (val == true) {
            for (var f = 0; f < ProcessList.length; f++) {            
                    ProcessList[f].Approved = 'Y';     
            }
            for (var f = 0; f < EmbellishmentList.length; f++) {            
                    EmbellishmentList[f].Approved = 'Y';           
            }
            for (var f = 0; f < FabricYarnList.length; f++) {       
                    FabricYarnList[f].Approved = 'Y';
            }
            for (var f = 0; f < TrimsList.length; f++) {           
                    TrimsList[f].Approved = 'Y';             
            }
        }
        else {
            for (var f = 0; f < ProcessList.length; f++) {          
                    ProcessList[f].Approved = 'N';       
            }
            for (var f = 0; f < EmbellishmentList.length; f++) {        
                    EmbellishmentList[f].Approved = 'N';              
            }
            for (var f = 0; f < FabricYarnList.length; f++) {
                FabricYarnList[f].Approved = 'N';
            }
            for (var f = 0; f < TrimsList.length; f++) {
                TrimsList[f].Approved = 'N';
            }
        }

        removeTrimsduplicateValue(TrimsList);
        removeEmblishduplicateValue(EmbellishmentList);
        removefabyarnduplicateValue(FabricYarnList);
        removeProcessduplicateValue(ProcessList);
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

function getbyID(ordid) {
    debugger;

    //$.ajax({
    //    url: "/Precosting/GetPrecostingDetails/" + ID,
    //    type: "GET",
    //    async: false,
    //    contentType: "application/json;charset=UTF-8",
    //    dataType: "json",
        //success: function (result) {
          //  var obj = result.Value;
          //  debugger;
            //if (obj != undefined && obj != null && obj.length > 0) {

                //$('#txtOrderNo').val(obj[0]["Orderno"]);
                //$('#txtBuyer').val(obj[0]["Buyer"]);
                //$('#txtRefNo').val(obj[0]["Style"]);
                //$('#txtStyle').val(obj[0]["Style"]);
                //$('#txtRemark').val(obj[0]["Remarks"]);
                //$('#txtBuyerOrderDate').val(moment(obj[0]["Orderdate"]).format('DD/MM/YYYY'));
                //$('#txtEntryDate').val(moment(obj[0]["RateEntrydate"]).format('DD/MM/YYYY'));
                //OrdNo = obj[0]["Orderno"];
                //BMasId = obj[0]["Bmasid"];
                //Buyerid = obj[0]["Buyerid"];
                //Styleid = obj[0]["Styleid"];
                //precostmasid = obj[0]["PrecostFabTrimmasid"];

                if (Mod == 0) {
                    LoadAddTrims(ordid)
                    LoadAddorderdet(ordid);
                    LoadAddEmbellishment(ordid);
                    LoadAddFabricYarn(ordid);
                    LoadAddProcess(ordid);
                    LoadGenerate();
                }
                else if (Mod == 1) {
                    $('#btnDelete').hide();
                    $('#btnAdd').hide();
                    $('#btnUpdate').show();
                    LoadEditTarget(masid);
                    LoadEditTrims(ordid);
                    // LoadEditorderdet(ordid);
                    LoadAddorderdet(ordid);
                    LoadEditEmbellishment(ordid);
                    LoadEditFabricYarn(ordid);
                    LoadEditProcess(ordid);
                }
                else {
                    $('#btnDelete').show();
                    $('#btnAdd').hide();
                    $('#btnUpdate').hide();
                    LoadEditTarget(masid);
                    LoadEditTrims(ordid);
                    LoadAddorderdet(ordid);
                    LoadEditEmbellishment(ordid);
                    LoadEditFabricYarn(ordid);
                    LoadEditProcess(ordid);
                }

           // }

            $('#myModal1').modal('show');

       // },
      //  error: function (errormessage) {
      //      alert(errormessage.responseText);
     //   }
    //});

    //$.ajax({
    //    url: "/PreCostingFabricDept/GetPrecostingmasDetails/" + ID,
    //    type: "GET",
    //    async: false,
    //    contentType: "application/json;charset=UTF-8",
    //    dataType: "json",
    //    success: function (result) {
    //        var obj = result.Value;
    //        debugger;
    //        if (obj != undefined && obj != null && obj.length > 0) {

    //            precostfabmasid = obj[0]["PreCostFabDeptmasid"];

    //            if (Mod == 0) {
    //                LoadAddFabricYarn(precostfabmasid);
    //                LoadAddProcess(precostfabmasid);
    //            }
    //            else if (Mod == 1) {
    //                $('#btnDelete').hide();
    //                $('#btnAdd').hide();
    //                $('#btnUpdate').show();
    //                LoadEditFabricYarn(precostfabmasid);
    //                LoadEditProcess(precostfabmasid);
    //            }
    //            else {
    //                $('#btnDelete').show();
    //                $('#btnAdd').hide();
    //                $('#btnUpdate').hide();
    //                LoadEditFabricYarn(precostfabmasid);
    //                LoadEditProcess(precostfabmasid);
    //            }

    //        }

    //        // $('#myModal1').modal('show');

    //    },
    //    error: function (errormessage) {
    //        alert(errormessage.responseText);
    //    }
    //});
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
        data: TrimsDetList,
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
            { title: "Item", data: "GItem", "visible": false },
            { title: "Trimsid", data: "Itemid", "visible": false },
            { title: "Trims", data: "Item" },
            { title: "Colorid", data: "Colorid", "visible": false },
            { title: "Color", data: "Color" },
            { title: "Sizeid", data: "Sizeid", "visible": false },
            { title: "Size", data: "Size" },
            { title: "Uomid", data: "UOMid", "visible": false },
            { title: "UOM", data: "UOM" },
            { title: "Consumption", data: "Consumption" },
            { title: "Rate", data: "Rate" },
             {
                 title: "Target", data: "Target",
                 render: function (data) {

                     return '<input type="text" id="txtTrimsTarget" class="calcgsm form-control"  style="width: 50px;text-align: center;" value=' + data + ' >';

                 },
             },
             {
                 title: "Approve", data: "Approved",
                 render: function (data, type, row) {

                     return '<input type="checkbox" id="grouptrims" class="grouptrims editor-active" unchecked  value=' + data + ' >';


                 }
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
    $('input[id=grouptrims]').each(function () {
        debugger;
        var row = $(this).closest('tr');
        if ($(this).val() == 'Y') {
            row.find('#grouptrims').prop('checked', true);
        }
    });
}

function loadorderTable(OrderList) {
    debugger;
    // $('#tblcompdetails').DataTable().destroy();
    var inputcount = 0;
    $('#tblOrderdetails tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tblOrderdetails').DataTable().destroy();
    }
    $('#tblOrderdetails').empty();
    FabricList.sort(function (a, b) {
        return a.FabricSlNo - b.FabricSlNo;
    })
    $('#tblOrderdetails').DataTable({
        //'bSortable': false,
        //'aTargets' : [ 7, 8 ],
        data: OrderList,
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
            { title: "Stylerowid", data: "StyleRowid", "visible": false },
            { title: "Order No", data: "order_no"},
            { title: "Style", data: "styleName" },
            { title: "Quantity", data: "StyQty" },
        ]
    });


    $("#tblOrderdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblOrderdetails tr").removeClass("selected");
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
        data: EmbellishmentDetList,
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
            { title: "Item", data: "GItem", "visible": false },
            { title: "Embellishmentid", data: "Processid", "visible": false },
            { title: "Embellishment", data: "Process" },
            { title: "Rate", data: "Rate" },

               {
                   title: "Target", data: "Target",
                   render: function (data) {

                       return '<input type="text" id="txtEmblishTarget" class="calcgsm form-control"  style="width: 50px;text-align: center;" value=' + data + ' >';

                   },
               },
               {
                   title: "Approve", data: "Approved",
                   render: function (data, type, row) {

                       return '<input type="checkbox" id="groupEmblish" class="groupEmblish editor-active" unchecked  value=' + data + ' >';


                   }
               },
        ]
    });


    $("#tblEmblishmentdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblEmblishmentdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
    $('input[id=groupEmblish]').each(function () {
        debugger;
        var row = $(this).closest('tr');
        if ($(this).val() == 'Y') {
            row.find('#groupEmblish').prop('checked', true);
        }
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
        data: FabricYarnDetList,
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
            { title: "Rate", data: "Rate" },
            {
                title: "Target", data: "Target",
                render: function (data) {

                    return '<input type="text" id="txtfabricyarnTarget" class="calcgsm form-control"  style="width: 50px;text-align: center;" value=' + data + ' >';

                },
            },
            {
                title: "Approve", data: "Approved",
                render: function (data, type, row) {

                    return '<input type="checkbox" id="groupfabyarn" class="groupfabyarn editor-active" unchecked  value=' + data + ' >';


                }
            },
        ]
    });


    $("#tblFabricYarndetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblFabricYarndetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
    $('input[id=groupfabyarn]').each(function () {
        debugger;
        var row = $(this).closest('tr');
        if ($(this).val() == 'Y') {
            row.find('#groupfabyarn').prop('checked', true);
        }
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
            //{ title: "Loss %", data: "LossPercentage" },
             {
                 title: "Loss %", data: "LossPercentage",
                 render: function (data) {

                     return '<input type="text" id="txtloss" class="calcgsm form-control"  style="width: 50px;text-align: center;" value=' + data + ' >';

                 },
             },
            { title: "Rate", data: "Rate" },
               {
                   title: "Target", data: "Target",
                   render: function (data) {

                       return '<input type="text" id="txtProcessTarget" class="calcgsm form-control"  style="width: 50px;text-align: center;" value=' + data + ' >';

                   },
               },
               {
                   title: "Approve", data: "Approved",
                   render: function (data, type, row) {

                       return '<input type="checkbox" id="groupprocess" class="groupprocess editor-active" unchecked  value=' + data + ' >';


                   }
               },
        ]
    });


    $("#tblProcessdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblProcessdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
    $('input[id=groupprocess]').each(function () {
        debugger;
        var row = $(this).closest('tr');
        if ($(this).val() == 'Y') {
            row.find('#groupprocess').prop('checked', true);
        }
    });
}

function LoadAddTrims(ID) {
    debugger;

    $.ajax({
        url: "/PrecostingTargetEntry/GetPrecostTrimsAddDetails/" + ID,
        type: "GET",
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            TrimsList = (result.Value);
            
            removeTrimsduplicateValue(TrimsList);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function removeTrimsduplicateValue(TrimsList) {
    debugger;
    var newArray = [];
    $.each(TrimsList, function (key, value) {
        var exists = false;
        var rate = 0;
        $.each(newArray, function (k, val2) {
            if (value.Itemid == val2.Itemid && value.Colorid == val2.Colorid && value.Sizeid == val2.Sizeid && value.UOMid == val2.UOMid && value.Rate == val2.Rate) { exists = true;  };
        });
        
        if (exists == false && value.Itemid != "" && value.Colorid != "" && value.Sizeid != "" && value.UOMid != "") { newArray.push(value); }
    });
        TrimsDetList = newArray;
        loadTrimsTable(TrimsDetList);
}

function LoadAddorderdet(ordid) {
    debugger;

    $.ajax({
        url: "/StyleEntry/PrecostOrdList/",
        data: JSON.stringify({ buyormasid: ordid }),
        async: false,
        type: "POST",  
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            OrderList = (result.Value);

          

            loadorderTable(OrderList);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function LoadAddEmbellishment(ID) {
    debugger;

    $.ajax({
        url: "/PrecostingTargetEntry/GetPrecostEmblishmentAddDetails/" + ID,
        type: "GET",
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            EmbellishmentList = (result.Value);

            removeEmblishduplicateValue(EmbellishmentList);

            //loadEmbellishmentTable(EmbellishmentList);
            
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function removeEmblishduplicateValue(EmbellishmentList) {
    debugger;
    var newArray = [];
    $.each(EmbellishmentList, function (key, value) {
        var exists = false;
        var rate = 0;
        $.each(newArray, function (k, val2) {
            if (value.Processid == val2.Processid && value.Rate == val2.Rate) { exists = true; };
        });

        if (exists == false && value.Processid != "" ) { newArray.push(value); }
    });
    EmbellishmentDetList = newArray;
    loadEmbellishmentTable(EmbellishmentDetList);
}

function LoadAddFabricYarn(ID) {
    debugger;

    $.ajax({
        url: "/PrecostingTargetEntry/GetPrecostFabricYarnAddDetails/" + ID,
        type: "GET",
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            FabricYarnList = (result.Value);

            removefabyarnduplicateValue(FabricYarnList);

            //loadFabricyarnTable(FabricYarnList);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function removefabyarnduplicateValue(FabricYarnList) {
    debugger;
    var newArray = [];
    $.each(FabricYarnList, function (key, value) {
        var exists = false;
        var rate = 0;
        $.each(newArray, function (k, val2) {
            if (value.Type == 'Fabric' && value.Fabricid == val2.Fabricid && value.FabricColorid == val2.FabricColorid && value.Sizeid == val2.Sizeid && value.Rate == val2.Rate) { exists = true; };
            if (value.Type == 'Yarn' && value.Fabricid == val2.Fabricid && value.FabricColorid == val2.FabricColorid && value.Sizeid == val2.Sizeid && value.Rate == val2.Rate) { exists = true;  };
        });

        if (exists == false && value.Type != "" && value.Fabricid != "" && value.FabricColorid != "" ) { newArray.push(value); }
    });
    FabricYarnDetList = newArray;
    loadFabricyarnTable(FabricYarnDetList);
}
function LoadAddProcess(ID) {
    debugger;

    $.ajax({
        url: "/PrecostingTargetEntry/GetPrecostprocessAddDetails/" + ID,
        type: "GET",
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            ProcessList = (result.Value);
            removeProcessduplicateValue(ProcessList);
            //loadProcessTable(ProcessList);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function removeProcessduplicateValue(ProcessList) {
    debugger;
    var newArray = [];
    $.each(ProcessList, function (key, value) {
        var exists = false;
        var rate = 0;
        $.each(newArray, function (k, val2) {
            if (value.Processid == val2.Processid && value.Fabricid == val2.Fabricid && value.Rate == val2.Rate) { exists = true;  };
        });

        if (exists == false && value.Processid != "" && value.Fabricid != "" ) { newArray.push(value); }
    });
    ProcessDetList = newArray;
    loadProcessTable(ProcessDetList);
}

function LoadEditTrims(ID) {
    debugger;

    $.ajax({
        url: "/PrecostingTargetEntry/GetPrecostTrimsEditDetails/" + ID,
        type: "GET",
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            TrimsList = (result.Value);

            removeTrimsduplicateValue(TrimsList);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function LoadEditTarget(masid) {
    debugger;

    $.ajax({
        url: "/PrecostingTarget/GetPrecostTargetDetails/" + masid,
        type: "GET",
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
          
            debugger;
            $('#txtTargetNo').val(obj[0].TargetNo);
            $('#txtEntryDate').val(moment(obj[0].EntryDate).format('DD/MM/YYYY'));
            
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function LoadEditFabric(ID) {
    debugger;

    $.ajax({
        url: "/PrecostingTargetEntry/GetPrecostFabricEditDetails/" + ID,
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
        url: "/PrecostingTargetEntry/GetPrecostEmblishmentEditDetails/" + ID,
        type: "GET",
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            EmbellishmentList = (result.Value);

            removeEmblishduplicateValue(EmbellishmentList);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function LoadEditFabricYarn(ID) {
    debugger;

    $.ajax({
        url: "/PrecostingTargetEntry/GetPrecostFabricYarnEditDetails/" + ID,
        type: "GET",
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            FabricYarnList = (result.Value);

            removefabyarnduplicateValue(FabricYarnList);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function LoadEditProcess(ID) {
    debugger;

    $.ajax({
        url: "/PrecostingTargetEntry/GetPrecostprocessEditDetails/" + ID,
        type: "GET",
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            ProcessList = (result.Value);

            removeProcessduplicateValue(ProcessList);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function Save() {
    debugger;
    var isAllValid = true;
    
    if (isAllValid) {
        var objSubmit = {
            TargetNo: $('#txtTargetNo').val(),
            BMasid: ordid,
            Targetmasid: 0,
            EntryDate: $('#txtEntryDate').val(),          
            TrimsDet: TrimsList,
            FabricDet: FabricList,
            EmbellishmentDet: EmbellishmentList,
            PrecostFab: FabricYarnList,
            ProcessDet: ProcessList
           
        };
        //$("#ConAdd").attr("disabled", true);
        LoadingSymb();
        $.ajax({
            url: "/PrecostingTargetEntry/Add",
            data: JSON.stringify(objSubmit),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {

                if (result.Value == true) {

                    alert("PrecostingTarget Saved Sucessfully");
                    window.location.href = "/PrecostingTarget/PrecostingTargetIndex";
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

    if (isAllValid) {
        var objSubmit = {
            TargetNo: $('#txtTargetNo').val(),
            BMasid: ordid,
            Targetmasid: masid,
            EntryDate: $('#txtEntryDate').val(),
            TrimsDet: TrimsList,
            FabricDet: FabricList,
            EmbellishmentDet: EmbellishmentList,
            PrecostFab: FabricYarnList,
            ProcessDet: ProcessList

        };
        //$("#ConAdd").attr("disabled", true);
        LoadingSymb();
        $.ajax({
            url: "/PrecostingTargetEntry/Add",
            data: JSON.stringify(objSubmit),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {

                if (result.Value == true) {

                    alert("PrecostingTarget Updated Sucessfully");
                    window.location.href = "/PrecostingTarget/PrecostingTargetIndex";
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

    if (isAllValid) {
        var objSubmit = {
            TargetNo: $('#txtTargetNo').val(),
            BMasid: ordid,
            Targetmasid: masid,
            EntryDate: $('#txtEntryDate').val(),
            TrimsDet: TrimsList,
            FabricDet: FabricList,
            EmbellishmentDet: EmbellishmentList,
            PrecostFab: FabricYarnList,
            ProcessDet: ProcessList

        };
        //$("#ConAdd").attr("disabled", true);
        LoadingSymb();
        $.ajax({
            url: "/PrecostingTargetEntry/Delete",
            data: JSON.stringify(objSubmit),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {

                if (result.Value == true) {

                    alert("PrecostingTarget Deleted Sucessfully");
                    window.location.href = "/PrecostingTarget/PrecostingTargetIndex";
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
    window.location.href = "/PrecostingTarget/PrecostingTargetIndex" ;
}

function LoadGenerate() {
    GenerateNumber();
}
var table, column, compId, Docum;
function GenerateNumber() {
    debugger;
       table = "Precosting_Target_mas",
       column = "TargetNo",
       compId = Companyid,
       Docum = 'PRECOSTING APPROVE'
   
    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $('#txtTargetNo').val(result.Value);
        }
    });
}