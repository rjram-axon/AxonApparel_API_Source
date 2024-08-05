var id, order, stylId, uomid;
var Umid;
var mode = [];
var ordernum;
var StyleId;
var bomlist = [];
var uomlist = [];
var convlist = [];
var BUnit = 0;
var index = -1;
var StyrowId = 0;
var Bomrowindex = -1;
var Type = 0;
var SamBomList = [];
var MIG = 0;
var DispatchClosed = "N";

$(document).ready(function () {
    var qrStr = window.location.search;
    var spQrStr = qrStr.substring(1);
    var arrQrStr = new Array();
    var arr = spQrStr.split('?');

    for (var i = 0; i < arr.length; i++) {
        var queryvalue = arr[i].split('=');

    }
    var StyleRowId = queryvalue[1];

    StyrowId = StyleRowId;
    loadum();
    LoadPlanDetails(StyleRowId);
    loaddetails();
    loadData();

    LoadItemDDL("#ddlItem");
    LoadSizeDDL("#ddlSize");
    LoadColorDDL("#ddlColor");
    LoadUomDDL("#ddlUom");


    debugger;




    $(document).on('click', '.chkpfj', function () {
        debugger;

        var table = $('#tPAbody').DataTable();
        var rowid = table.row($(this).parents('tr')).data()["Buyordmasdetid"];
        // $('#tPAbody tr:eq(' + rowindex + ')').find('td:eq(1)').text(totalamnt);
        //if ($('#chkpfj').is(':checked')) {
        var val = $(this).is(":checked");
        if (val == true) {
            for (var f = 0; f < bomlist.length; f++) {
                if (bomlist[f].Buyordmasdetid == rowid) {
                    bomlist[f].PurFor_Job = 'Y';
                }
            }
        }
        else {

        }

    });

    $(document).on('click', '.chkcsp', function () {
        debugger;

        var table = $('#tPAbody').DataTable();
        var rowid = table.row($(this).parents('tr')).data()["Buyordmasdetid"];
        var val = $(this).is(":checked");
        if (val == true) {
            for (var h = 0; h < bomlist.length; h++) {
                if (bomlist[h].Buyordmasdetid == rowid) {
                    bomlist[h].CSP = 'Y';
                }
            }
        } else {
            for (var h = 0; h < bomlist.length; h++) {
                if (bomlist[h].Buyordmasdetid == rowid) {
                    bomlist[h].CSP = 'N';
                }
            }
        }

    });

    $(document).on('click', '.chkic', function () {
        debugger;

        var table = $('#tPAbody').DataTable();
        var rowid = table.row($(this).parents('tr')).data()["Buyordmasdetid"];
        var val = $(this).is(":checked");
        if (val == true) {
            for (var f = 0; f < bomlist.length; f++) {
                if (bomlist[f].Buyordmasdetid == rowid) {
                    bomlist[f].ItemClosure = 'Y';
                }
            }
        }


    });
    $(document).on('change', '.ddluc', function () {
        debugger;
        var table = $('#tPAbody').DataTable();
        var Fromid = table.row($(this).parents('tr')).data()["Uomid"];
        var FromUom = table.row($(this).parents('tr')).data()["uom"];
        var sno = table.row($(this).parents('tr')).data()["Buyordmasdetid"];
        var Toid = $(this).val();


        //rowindex = $(this).closest('tr').index();
        //var Fromid = bomlist[rowindex].Uomid;
        //var FromUom = bomlist[rowindex].uom;
        //var Toid = $(this).val();

        var Touom = 0;
        var Convmode = 0;
        var topur = 0;
        var bomqty = 0;
        for (var s = 0; s < convlist.length; s++) {
            if (convlist[s].FromUomid == Fromid && convlist[s].ToUomid == Toid) {
                //Toid = convlist[s].ToUomid;
                Touom = convlist[s].ToUom;
                Convmode = convlist[s].Mode;
                topur = convlist[s].Conversion;
            }
        }



        for (var f = 0; f < bomlist.length; f++) {
            if (bomlist[f].Buyordmasdetid == sno) {
                // bomlist[f].Uomid = Toid;
                pgmq = bomlist[f].pgmqty;
                var bqty = 0;
                if (Convmode == 1) {
                    Convmode = 'D';
                    bqty = pgmq / topur;
                }
                if (Convmode == 2) {
                    Convmode = 'M';
                    bqty = pgmq * topur;
                }

                bomlist[f].puruom = Touom;
                bomlist[f].Pur_UOMid = Toid;
                bomlist[f].Conv_Mode = Convmode;
                bomlist[f].ToPurUOM = topur;
                bomlist[f].BOM_qty = bqty.toFixed(2);
                bomlist[f].Baseunit = Toid;
            }
        }

        var oldind = -1;
        for (var q = 0; q < uomlist.length; q++) {
            if (uomlist[q].Uomid == Fromid) {
                oldind = q;
            }
        }
        array_move(uomlist, oldind, 0)

        if (Touom != "") {
            loadtab(bomlist);

        }

    });
    $(document).on('keyup', '.txtbomqty', function () {
        debugger;
        rowindex = $(this).closest('tr').index();
        var qty = $(this).val();
        var currentrow = bomlist.slice(rowindex);
        var s = currentrow[0].Buyordmasdetid;
        var allqty = currentrow[0].AllowVal;
        if (qty > allqty) {
            //alert('Should not exceed Allowance Qty...');
            var msg = 'Should not exceed Allowance Qty...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            $.each(bomlist, function () {
                if (this.Buyordmasdetid == s) {
                    this.BOM_qty = this.pgmqty;
                }
            });

            var table = $('#tPAbody').DataTable();
            var data = table.rows().data();

            $('input[id=txtbomqty]').each(function (ig) {
                if (data[ig].Buyordmasdetid == s) {
                    var row = $(this).closest('tr');
                    row.find('#txtbomqty').val(data[ig].pgmqty);

                }
            });
            return true;
        }
        $.each(bomlist, function () {
            if (this.Buyordmasdetid == s) {
                this.BOM_qty = qty;
            }
        });
    });

});





function array_move(arr, old_index, new_index) {

    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
};

function LoadPlanDetails(StyleRowId) {
    $.ajax({
        url: "/PlanningAdd/GetPlanDetails",
        data: JSON.stringify({ StyleRowid: StyleRowId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            debugger;
            if (obj != undefined) {
                $('#txtOrderNo').val(obj[0]["Order_No"]);
                $('#txtRefNo').val(obj[0]["Ref_no"]);
                $('#txtCompany').val(obj[0]["Company"]);
                $('#txtStyle').val(obj[0]["Style"]);
                $('#txtProdQty').val(obj[0]["Quantity"]);
                $('#txtBuyer').val(obj[0]["buyer"]);
                $('#txtStyleRowId').val(obj[0]["StyleRowid"]);
                $('#txtPlanId').val(obj[0]["PlanID"]);
                $('#txtWorkOrder').val(obj[0]["Job_Ord_No"]);
                StyleRowId = $("#txtStyleRowId").val();
                ordernum = $('#txtOrderNo').val();
                StyleId = obj[0]["StyleID"];
                Type = obj[0]["Type"];

                DispatchClosed = obj[0]["Despatch_Closed"];

                if (DispatchClosed == "N") {
                    $('#btnUpdate').show();
                }
                else if (DispatchClosed == "Y") {
                    $('#btnUpdate').hide();
                }

            }
            else {

            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function loaddetails() {
    debugger;
    $.ajax({
        url: "/BOM/ItemList",
        data: JSON.stringify({}),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $.each(result, function () {
                $("#sbTwo").append($("<option></option>").val(this.Itemgroupid).html(this.Itemgroup));

            });


        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function loadData() {

    debugger;
    $.ajax({
        type: "GET",
        url: '/BOM/ListItem/',
        data: JSON.stringify({}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            var tableload = json.data
            debugger;
            var dataSet = eval("[" + tableload + "]");
            $('#tPAbody').DataTable({
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
                         { title: "ID", "visible": false },
                          { title: "ItemID", "visible": false },
                         { title: "Item" },
                          { title: "Color" },
                           { title: "Size" },
                              { title: "UnitId", "visible": false },
                             { title: "Unit" },
                            { title: "BOM Qty" },
                         { title: "Pgm Qty" },
                          { title: "Allow Qty" },
                         { title: "Pur Uom" },
                         { title: "Mode" },
                         { title: "ToPur UOM" },
                          { title: "BOM Qty" },
                          { title: "Pur For Job", "visible": false },
                           { title: "CSP" },
                            { title: "Item Closure" },
                         { title: "Action", "visible": false },
                ]


            });

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
var masid;
function loaditemgroup(itemgrpid, orderno, styleid) {

    debugger;
    // itemgrpid = $("#sbTwo option:selected").val();

    orderno = ordernum,
    styleid = StyleId

    if (MIG == "0") {
        var MCOrd = "0";
    }
    else {
        var MCOrd = MIG;
    }
    $(":checkbox").each(function () {
        debugger;
        var ischecked = $('#selectall').is(":checked");
        if (ischecked) {
            // checkbox_value += "on";


            $.ajax({
                url: "/BOM/ListDetails",
                data: JSON.stringify({ order: orderno, stylId: styleid, Type: Type, IGId: MCOrd }),
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {
                    debugger;

                    bomlist = result;

                    uomonbaseunit();
                },
                error: function (errormessage) {
                    debugger;
                    alert(errormessage.responseText);
                }

            });
        }
        else {
            // checkbox_value += "off";
        }
    });


}


function loadChngtab(list) {
    debugger;

    $('#tPAbody').DataTable().destroy();
    $('#tPAbody').DataTable({
        data: list,
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
                 { title: "ID", data: "Buyordmasdetid", "visible": false },
                 { title: "ItemID", data: "Itemid", "visible": false },
                 { title: "Item", data: "item" },
                 { title: "Color", data: "Category1" },
                 { title: "Size", data: "Category2" },
                    { title: "UnitId", data: "Uomid", "visible": false },
                  { title: "Unit", data: "uom" },
                 { title: "BOM Qty", data: "pgmqty" },
                 { title: "Pgm Qty", data: "pgmqty" },
                  { title: "Allow Qty", data: "AllowVal" },

                   {
                       title: "Pur Uom", data: "puruom",
                       render: function (data, type, row) {
                           //var filteruom = [];
                           //for (var c = 0; c < uomlist.length; c++) {
                           //    if (row.Uomid == uomlist[c].Uomid) {
                           //        filteruom.push(uomlist[c]);
                           //uomlist;
                           var $select = $("<select></select>", {
                               "id": "ddluc",
                               "value": data,
                               "class": "form-control ddluc",
                               "style":"width:70px"
                               //onchange: "loadconv(this.value);"
                           });
                           $.each(uomlist, function (k, v) {
                               var $option = $("<option></option>", {
                                   "text": v.uom,
                                   "value": v.Uomid
                               });
                               if (data === v.uom) {
                                   $option.attr("selected", "selected")
                               }
                               $select.append($option);
                           });
                           return $select.prop("outerHTML");
                       }
                   },

                 {
                     title: "Mode", data: "Conv_Mode",
                     render: function (data) {
                         return '<input type="text" id="txtconv" class="form-control"  style="width: 50px;text-align: center;" value=' + data + ' disabled>';
                     }
                 },
                 { title: "ToPur UOM", data: "ToPurUOM" },
                  {
                      title: "BOM Qty", data: "BOM_qty",
                      render: function (data) {

                          return '<input type="text" id="txtbomqty" class="form-control txtbomqty"  style="width: 80px;text-align: center;" value=' + data + '>';

                      }
                  },

                  {

                      title: "Pur For Job", data: "PurFor_Job",
                      render: function (data) {

                          return '<input type="checkbox" id="chkpfj" class="editor-active chkpfj"  style="width: 50px;text-align: center;"  value=' + data + '>';

                      }, "visible": false 
                  },


                 {

                     title: "CSP", data: "CSP",
                     render: function (data) {

                         return '<input type="checkbox" id="chkcsp" class="editor-active chkcsp"  style="width: 50px;text-align: center;"  value=' + data + '>';

                     },
                 },


                  {

                      title: "Item Closure", data: "ItemClosure",
                      render: function (data) {

                          return '<input type="checkbox" id="chkic" class="editor-active chkic"  style="width: 50px;text-align: center;"  value=' + data + '>';

                      },
                  },

        ],


    });


    $('input[id=chkpfj]').each(function () {
        debugger;
        var row = $(this).closest('tr');
        if ($(this).val() == "Y") {
            row.find('#chkpfj').prop('checked', true);
        }
    });

    $('input[id=chkcsp]').each(function () {
        debugger;
        var row = $(this).closest('tr');
        if ($(this).val() == "Y") {
            row.find('#chkcsp').prop('checked', true);
        }
    });

    $('input[id=chkic]').each(function () {
        debugger;
        var row = $(this).closest('tr');
        if ($(this).val() == "Y") {
            row.find('#chkic').prop('checked', true);
        }
    });
}


function loadtab(list) {
    debugger;

    $('#tPAbody').DataTable().destroy();
    $('#tPAbody').DataTable({
        data: list,
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
                 { title: "ID", data: "Buyordmasdetid", "visible": false },
                 { title: "ItemID", data: "Itemid", "visible": false },
                 { title: "Item", data: "item" },
                 { title: "Color", data: "Category1" },
                 { title: "Size", data: "Category2" },
                  { title: "UnitId", data: "Uomid", "visible": false },
                  { title: "Unit", data: "uom" },
                 { title: "BOM Qty", data: "pgmqty" },
                 { title: "Pgm Qty", data: "pgmqty" },
                  { title: "Allow Qty", data: "AllowVal" },
                   {
                       title: "Pur Uom", data: "puruom",
                       render: function (data, type, row) {


                           var $select = $("<select></select>", {
                               "id": "ddluc",
                               "value": data,
                               "class": "form-control ddluc",
                               "style": "width:70px"
                               //onchange: "loadconv(this.value);"
                           });
                           $.each(uomlist, function (k, v) {
                               var $option = $("<option></option>", {
                                   "text": v.uom,
                                   "value": v.Uomid
                               });
                               if (data === v.uom) {
                                   $option.attr("selected", "selected")
                               }
                               $select.append($option);
                           });
                           return $select.prop("outerHTML");
                           //return '<select id="ddlGSize" selected="selected" class="form-control" style="width: 100px;"> </select>';


                       }
                   },

                 {
                     title: "Mode", data: "Conv_Mode",
                     render: function (data) {
                         return '<input type="text" id="txtconv" class="form-control"  style="width: 50px;text-align: center;" value=' + data + ' disabled>';
                     }
                 },
                 { title: "ToPur UOM", data: "ToPurUOM" },
                  {
                      title: "BOM Qty", data: "BOM_qty",
                      render: function (data) {

                          return '<input type="text" id="txtbomqty" class="form-control txtbomqty"  style="width: 80px;text-align: center;" value=' + data + '>';

                      }
                  },

                  {

                      title: "Pur For Job", data: "PurFor_Job",
                      render: function (data) {

                          return '<input type="checkbox" id="chkpfj" class="editor-active chkpfj"  style="width: 50px;text-align: center;"  value=' + data + '>';

                      }, "visible": false 
                  },



                 {

                     title: "CSP", data: "CSP",
                     render: function (data) {

                         return '<input type="checkbox" id="chkcsp" class="editor-active chkcsp"  style="width: 50px;text-align: center;"  value=' + data + '>';

                     },
                 },

                  {

                      title: "Item Closure", data: "ItemClosure",
                      render: function (data) {

                          return '<input type="checkbox" id="chkic" class="editor-active chkic"  style="width: 50px;text-align: center;"  value=' + data + '>';

                      },
                  },
                   {
                       title: "ACTION", "mDataProp": null,
                       "sDefaultContent": '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnBomedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnBomremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div>', "visible": false 
                   }

        ],


    });

    $('input[id=chkpfj]').each(function () {
        debugger;
        var row = $(this).closest('tr');
        if ($(this).val() == "Y") {
            row.find('#chkpfj').prop('checked', true);
        }
    });

    $('input[id=chkcsp]').each(function () {
        debugger;
        var row = $(this).closest('tr');
        if ($(this).val() == "Y") {
            row.find('#chkcsp').prop('checked', true);
        }
    });

    $('input[id=chkic]').each(function () {
        debugger;
        var row = $(this).closest('tr');
        if ($(this).val() == "Y") {
            row.find('#chkic').prop('checked', true);
        }
    });
}


function loadconv(val) {
    debugger;
    index;

    $("#tPAbody ").dataTable().find("tbody").on('click', 'tr', function () {
        index = (this.rowIndex) - 1;
    });
    rowindex = $(this).closest('tr').index();
    for (var s = 0; s < convlist.length; s++) {
        if (convlist[s].FromUomid == val) {

        }
    }
}

function uomonbaseunit() {
    debugger;

    var foo = [];
    BUnit = [];
    for (var d = 0; d < bomlist.length; d++) {
        foo[d] = bomlist[d].Baseunit;
        BUnit = BUnit + "," + foo[d];
    }
    $.ajax({
        url: "/BOM/UomList",
        data: JSON.stringify({ baseunit: BUnit }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            uomlist = result.Value;
            loadtab(bomlist);
        }
    });

}

function loadum() {
    debugger;
    var ID = 0;
    $.ajax({
        url: "/BOM/UnitConvList/" + ID,
        data: JSON.stringify({}),
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            convlist = result.Value;

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function myUomFunction(uomid) {
    debugger;

    Umid = (uomid);
    //       loadum(Umid);
    var bom = 0, res;
    var bomm = 0;
    $("#txtbomqty").empty();
    var finalresult;
    if (mode[0] == '1') {
        bom = $("#txtbomqty").val();
        res = (bom / mode[1]);
        //var res = 2 / 144.00;
        //var res = 6 / 10;

    }
    else if (mode[0] == '2') {
        bomm = $("#txtbomqty").val();
        res = (bomm * mode[1]);
        //var res = 2 / 144;

    }
    finalresult = res.toFixed();
    $('#txtbomqty').val(finalresult);

}
function Update() {
    debugger;

    var array = [];
    var headers = [];

    var IsPurforjob = false;
    var Iscsp = false;
    var Isitemclosure = false;


    var Obj = {

        BomListDet: bomlist
    }

    LoadingSymb();
    $.ajax({
        url: "/BOM/Update",
        data: JSON.stringify({ ObjApp: Obj, StyrowId: StyrowId, Type: Type }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            debugger;
            if (result.Value == true) {

                //alert("Data Updated Sucessfully");
                var msg = 'Data Updated Sucessfully...';
                var flg = 1;
                var mod = 0;
                var url = "/PlanningMain/PlanningMainIndex";
                AlartMessage(msg, flg, mod, url);
                AddUserEntryLog('Planning', 'BOM Entry', 'UPDATE', $('#txtOrderNo').val());
                //window.location.href = "/PlanningMain/PlanningMainIndex";
            } else {

                window.location.href = "/Error/Index";


            }




        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    //}
}

function Multiclose() {
    debugger;
    window.location.href = "/PlanningMain/PlanningMainIndex";
}

//Sample Order Manual Bom add

$(document).ready(function () {


    $('#btnBomadd').click(function () {
        debugger;

        var leng = 0;

        var isAllValid = true;


        debugger;
        if ($('#ddlItem').val() == "0") {


            $('#ddlItem').css('border-color', 'Red');
            isAllValid = false;
        }
        else {

            $('#ddlItem').css('border-color', 'lightgrey');
        }

        if ($('#ddlColor').val() == "0") {


            $('#ddlColor').css('border-color', 'Red');
            isAllValid = false;
        }
        else {

            $('#ddlColor').css('border-color', 'lightgrey');
        }

        if ($('#ddlSize').val() == "0") {


            $('#ddlSize').css('border-color', 'Red');
            isAllValid = false;
        }
        else {

            $('#ddlSize').css('border-color', 'lightgrey');
        }


        if ($('#ddlUom').val() == "0") {


            $('#ddlUom').css('border-color', 'Red');
            isAllValid = false;
        }
        else {

            $('#ddlUom').css('border-color', 'lightgrey');
        }

        if ($('#txtBomQty').val() == "") {
            isAllValid = false;
            $('#txtBomQty').css('border-color', 'Red');
        }
        else {
            $('#txtBomQty').css('border-color', 'lightgrey');
        }



        if (bomlist.length == 0) {
            leng = 1;
            Yarnid = 1;
            FSerNo = leng;
        }
        else {
            leng = bomlist.length + 1;
            Yarnid = bomlist.length + 1;
            FSerNo = leng;
        }




        if (isAllValid) {


            debugger;
            var SamBomListObj = {

                item: $("#ddlItem option:selected").text(),
                Itemid: $('#ddlItem').val(),

                Category1: $("#ddlColor option:selected").text(),
                Colorid: $('#ddlColor').val(),


                Category2: $("#ddlSize option:selected").text(),
                Sizeid: $('#ddlSize').val(),


                uom: $("#ddlUom option:selected").text(),
                Uomid: $('#ddlUom').val(),
                Baseunit: $('#ddlUom').val(),
                BOM_qty: $('#txtBomQty').val(),
                pgmqty: $('#txtBomQty').val(),
                Buyordmasid: 0,
                Buyordmasdetid: 0,
                Conv_Mode: "D",
                ToPurUOM: 1,
                PurFor_Job: "N",
                CSP: "N",
                ItemClosure: "N",



                Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
            };

            bomlist.push(SamBomListObj);
            uomonbaseunit();
            SamBomList.push(SamBomListObj);
            loadtab(bomlist);


            fnClearBomControls();




        }
    });

    $(document).on('click', '.btnBomedit', function () {
        debugger;
        Mode = 1;

        //rowindex = $(this).closest('tr').index();

        //var currentro12 = bomlist.slice(rowindex);

        //$('#ddlItem').val(currentro12[0]['Itemid']);
        //$('#ddlColor').val(currentro12[0]['Colorid']);
        //$('#ddlSize').val(currentro12[0]['SizeID']);
        //$('#ddlUom').val(currentro12[0]['Uomid']);       
        //$('#txtBomQty').val(currentro12[0]['BOM_qty']);


        var table = $('#tPAbody').DataTable();

        var ItmId = table.row($(this).parents('tr')).data()["Itemid"];
        var ClrId = table.row($(this).parents('tr')).data()["Colorid"];
        var SzId = table.row($(this).parents('tr')).data()["Sizeid"];
        var UId = table.row($(this).parents('tr')).data()["Uomid"];
        var BomQty = table.row($(this).parents('tr')).data()["BOM_qty"];


        $('#ddlItem').val(ItmId);
        $('#ddlColor').val(ClrId);
        $('#ddlSize').val(SzId);
        $('#ddlUom').val(UId);
        $('#txtBomQty').val(BomQty);

        $('#btnBomadd').hide();
        $('#btnBomupdate').show();
    });

    $('#btnBomupdate').click(function () {
        debugger;
        var currentrowsel = bomlist.slice(rowindex);

        currentrowsel[0]['Itemid'] = $("#ddlItem").val();
        currentrowsel[0]['item'] = $("#ddlItem option:selected").text();
        currentrowsel[0]['Colorid'] = $("#ddlColor").val();
        currentrowsel[0]['Category1'] = $("#ddlColor option:selected").text();
        currentrowsel[0]['Sizeid'] = $("#ddlSize option:selected").val();
        currentrowsel[0]['Category2'] = $("#ddlSize option:selected").text();
        currentrowsel[0]['Uomid'] = $("#ddlUom option:selected").val();
        currentrowsel[0]['uom'] = $("#ddlUom option:selected").text();

        currentrowsel[0]['BOM_qty'] = $("#txtBomQty").val();



        loadtab(bomlist);
        fnClearBomControls();

        $('#btnBomupdate').hide();
        $('#btnBomadd').show();




    });
    $(document).on('click', '.btnBomremove', function () {
        rowindex = $(this).closest('tr').index();
        bomlist.splice(rowindex, 1);
        document.getElementById("tPAbody").deleteRow(rowindex + 1);
    });

});

function fnClearBomControls() {
    $('#ddlItem').val('0');
    $('#ddlColor').val('0');
    $('#ddlSize').val('0');
    $('#ddlUom').val('0');
    $('#txtBomQty').val('');
}
function myIgroup() {
    debugger;
    var Ig = [];
        var itemgrpid=0;
    $('#sbTwo :selected').each(function (i, selected) {
        Ig[i] = $(selected).val();

        MIG = MIG + "," + Ig[i];


    });
    orderno = ordernum,
    styleid = StyleId,

    loadInvitemgroup(itemgrpid, orderno, styleid)
}
var masid;
function loadInvitemgroup(itemgrpid, orderno, styleid) {

    debugger;
    // itemgrpid = $("#sbTwo option:selected").val();

    orderno = ordernum,
    styleid = StyleId
    if (MIG == "0") {
        var MCOrd = "";
    }
    else {
        var MCOrd = MIG;
    }

            $.ajax({
                url: "/BOM/ListDetails",
                data: JSON.stringify({ order: orderno, stylId: styleid, Type: Type, IGId: MCOrd }),
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {
                    debugger;

                    bomlist = result;

                    uomonbaseunit();
                },
                error: function (errormessage) {
                    debugger;
                    alert(errormessage.responseText);
                }

            });       

}
/////////////////////////////